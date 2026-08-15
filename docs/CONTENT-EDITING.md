# Editing Bend Home Resources Content

The site uses one content file per page so individual guides stay easy to find and edit as they grow.

## Update an existing guide

1. Open `src/content/resources/`.
2. Open the section folder, such as `buying/` or `costs/`.
3. Open the Markdown file that matches the page slug.
4. Update SEO/page fields between the two `---` lines at the top when needed.
5. Update the article copy below the frontmatter using normal Markdown headings, paragraphs and lists.
6. Commit the change. Cloudflare Pages will rebuild the same URL with the updated content.

Example:

```text
src/content/resources/buying/home-inspections.md
→ https://bendhomeresources.com/buying/home-inspections
```

## Add a new guide

1. Copy an existing `.md` file from the section where the new guide belongs.
2. Rename the file to the new slug.
3. Update `slug`, `path`, `title`, `seoTitle`, `description`, `intro`, `related`, `sources`, `lastReviewed` and `order`.
4. Replace the Markdown body with the new page content.
5. Keep the path in the format `/{section}/{slug}`.
6. Run `npm run build` before publishing when working locally.
7. Commit the new file. The existing dynamic Astro route creates the static page automatically.

Example:

```text
src/content/resources/buying/buying-a-home-with-an-hoa.md
```

with:

```text
section: "buying"
slug: "buying-a-home-with-an-hoa"
path: "/buying/buying-a-home-with-an-hoa"
```

creates:

```text
https://bendhomeresources.com/buying/buying-a-home-with-an-hoa
```

## Hub pages

Each main hub has its own file in `src/content/hubs/`, for example:

```text
src/content/hubs/buying.json
src/content/hubs/professionals.json
```

Edit those files when you want to change a hub's title, SEO title, description, intro, eyebrow text or featured guide list.

## What not to edit for normal content changes

You normally do not need to touch:

- `src/pages/[section]/[slug].astro`
- `src/components/ResourcePage.astro`
- `src/layouts/BaseLayout.astro`

Those are shared templates. Changing them affects many or all pages.

## URL rule

Keep existing `path` and `slug` values unchanged when updating a live page. Changing them changes the URL and can require a redirect.
