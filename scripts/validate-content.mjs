import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync(new URL('../src/data/content.json', import.meta.url), 'utf8'));
const pages = [...data.pages, ...data.trustPages];
const hubPaths = Object.keys(data.hubs).map((key) => `/${key}`);
const validPaths = new Set(['/', ...hubPaths, ...pages.map((p) => p.path)]);
let errors = 0;
let warnings = 0;
const fail = (msg) => { console.error(`ERROR: ${msg}`); errors++; };
const warn = (msg) => { console.warn(`WARN: ${msg}`); warnings++; };

const seen = new Set();
for (const page of pages) {
  if (seen.has(page.path)) fail(`Duplicate path: ${page.path}`);
  seen.add(page.path);
  for (const field of ['title','seoTitle','description','intro','lastReviewed']) {
    if (!page[field]) fail(`${page.path} missing ${field}`);
  }
  if (!Array.isArray(page.sections) || page.sections.length < 3) fail(`${page.path} has too little structured content`);
  if (page.seoTitle.length > 68) warn(`${page.path} SEO title is ${page.seoTitle.length} chars`);
  if (page.description.length > 170) warn(`${page.path} meta description is ${page.description.length} chars`);
  for (const rel of page.related || []) {
    if (!validPaths.has(rel)) fail(`${page.path} has broken related link: ${rel}`);
  }
  for (const source of page.sources || []) {
    if (!/^https:\/\//.test(source.url)) fail(`${page.path} source is not HTTPS: ${source.url}`);
  }
}

for (const [key, hub] of Object.entries(data.hubs)) {
  const childSlugs = new Set(data.pages.filter((p) => p.section === key).map((p) => p.slug));
  if (!childSlugs.size) fail(`Hub /${key} has no child pages`);
  for (const slug of hub.featured || []) {
    if (!childSlugs.has(slug)) fail(`Hub /${key} features missing child: ${slug}`);
  }
}

console.log(`Validated ${pages.length} resource/trust pages + ${hubPaths.length} hubs + homepage.`);
console.log(`${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
