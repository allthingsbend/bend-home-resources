import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resourcesRoot = path.join(root, 'src', 'content', 'resources');
const hubsRoot = path.join(root, 'src', 'content', 'hubs');

let errors = 0;
let warnings = 0;
const fail = (msg) => { console.error(`ERROR: ${msg}`); errors++; };
const warn = (msg) => { console.warn(`WARN: ${msg}`); warnings++; };

function walk(dir, ext) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, ext);
    return entry.name.endsWith(ext) ? [full] : [];
  });
}

function parseFrontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  if (!raw.startsWith('---\n')) throw new Error(`${file} is missing opening frontmatter`);
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) throw new Error(`${file} is missing closing frontmatter`);
  const block = raw.slice(4, end);
  const data = {};
  for (const line of block.split('\n')) {
    if (!line.trim()) continue;
    const colon = line.indexOf(':');
    if (colon === -1) throw new Error(`${file} has invalid frontmatter line: ${line}`);
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    try {
      data[key] = JSON.parse(value);
    } catch {
      throw new Error(`${file} has invalid JSON-valued YAML for ${key}`);
    }
  }
  return { data, body: raw.slice(end + 5) };
}

const resourceFiles = walk(resourcesRoot, '.md');
const resources = [];
for (const file of resourceFiles) {
  try {
    const parsed = parseFrontmatter(file);
    resources.push({ file, ...parsed });
  } catch (error) {
    fail(error.message);
  }
}

const hubFiles = walk(hubsRoot, '.json');
const hubs = {};
for (const file of hubFiles) {
  const id = path.basename(file, '.json');
  try {
    hubs[id] = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${file} contains invalid JSON: ${error.message}`);
  }
}

const pages = resources.filter(({ data }) => Boolean(data.section));
const trustPages = resources.filter(({ data }) => !data.section);
const hubPaths = Object.keys(hubs).map((key) => `/${key}`);
const validPaths = new Set(['/', ...hubPaths, ...resources.map(({ data }) => data.path)]);

const seen = new Set();
for (const { file, data, body } of resources) {
  const label = data.path || path.relative(root, file);
  if (!data.path) fail(`${label} missing path`);
  if (seen.has(data.path)) fail(`Duplicate path: ${data.path}`);
  seen.add(data.path);

  for (const field of ['slug', 'title', 'seoTitle', 'description', 'intro', 'lastReviewed']) {
    if (!data[field]) fail(`${label} missing ${field}`);
  }

  if (data.section) {
    const expectedPath = `/${data.section}/${data.slug}`;
    if (data.path !== expectedPath) fail(`${label} path does not match section/slug (${expectedPath})`);
  } else if (data.slug && data.path !== `/${data.slug}`) {
    fail(`${label} trust page path does not match slug`);
  }

  const h2Count = (body.match(/^##\s+/gm) || []).length;
  if (h2Count < 3) fail(`${label} has too little body content (${h2Count} H2 sections)`);
  if (data.seoTitle?.length > 68) warn(`${label} SEO title is ${data.seoTitle.length} chars`);
  if (data.description?.length > 170) warn(`${label} meta description is ${data.description.length} chars`);

  for (const rel of data.related || []) {
    if (!validPaths.has(rel)) fail(`${label} has broken related link: ${rel}`);
  }
  for (const source of data.sources || []) {
    if (!/^https:\/\//.test(source.url)) fail(`${label} source is not HTTPS: ${source.url}`);
  }
}

for (const [key, hub] of Object.entries(hubs)) {
  for (const field of ['title', 'seoTitle', 'description', 'intro', 'eyebrow']) {
    if (!hub[field]) fail(`Hub /${key} missing ${field}`);
  }
  const childSlugs = new Set(pages.filter(({ data }) => data.section === key).map(({ data }) => data.slug));
  if (!childSlugs.size) fail(`Hub /${key} has no child pages`);
  for (const slug of hub.featured || []) {
    if (!childSlugs.has(slug)) fail(`Hub /${key} features missing child: ${slug}`);
  }
}

console.log(`Validated ${pages.length} resource pages + ${trustPages.length} trust pages + ${hubPaths.length} hubs + homepage.`);
console.log(`${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
