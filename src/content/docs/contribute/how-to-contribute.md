---
title: How to Contribute
description: How to add map guides, fix outdated content, and contribute to playZE.
sidebar:
  order: 1
---

playZE is open source and community-maintained. All content is written in Markdown and lives in this GitHub repository. Contributing is done via pull request — no special access required.

## Licensing

Everything in this repository, code and content alike, is licensed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html). Contributions are accepted under the same license (inbound = outbound). No CLA is required.

## What you can contribute

- **New map guides**: document a map using the [map template](https://github.com/playZE-gg/playZE.gg/blob/main/src/content/docs/maps/_map-template.md).
- **Updates to existing guides**: fix outdated strats, update item info after a map rework, add a missing stage.
- **Translation**: translate a page to another language (see the [Lunaria dashboard](/lunaria/) for what needs translating).
- **Corrections**: fix factual errors, broken links, or spelling.
- **Content pages**: add sections to skills pages, improve the glossary, expand reference material.

## Quickstart: editing an existing page

Every page has an **"Edit this page"** link in the footer (on GitHub). Click it to open the file in GitHub's web editor:
1. Edit the Markdown.
2. Click **"Commit changes"** at the top right.
3. Select **"Create a new branch"** and submit a pull request.

## Adding a new map guide

1. Fork the repository on GitHub.
2. Copy [`src/content/docs/maps/_map-template.md`](https://github.com/playZE-gg/playZE.gg/blob/main/src/content/docs/maps/_map-template.md).
3. Rename the copy to the map's filename (e.g. `ze_best_korea.md`). Preserve underscores exactly as they appear in the map name.
4. Fill in every section of the template. Remove the template comments.
5. Commit to your fork and open a pull request against the `main` branch.
6. A maintainer will review and merge.

See the [map template](https://github.com/playZE-gg/playZE.gg/blob/main/src/content/docs/maps/_map-template.md) and [ze_example](/maps/ze_example/) for reference.

## Adding a `_p` variant

CS2 `_p` port maps get their own separate file. Create `ze_mapname_p.md` as a new independent guide — don't modify the base map's page. Mention in the overview that this guide covers the CS2 `_p` port.

## For all ports or minor map versions

If a minor update version of a map is similar enough to the major version prior, or if a map was ported and there were little to no changes, it is acceptable to simple state that in the minor version/port guide doc and link to the existing doc for the original map.
<br>
**Example**: `ze_best_korea_p` is basically the same as `ze_best_korea`, so just back-linking from `ze_best_korea_p` to `ze_best_korea` would suffice.

## Local development

To run the site locally:

```bash
git clone https://github.com/playZE-gg/playZE.gg.git
cd playZE.gg
npm install
npm run dev
```

The site runs at `http://localhost:4321`. Edit Markdown files and the browser updates live.

**Prerequisites:** Node.js 18+.

## Pull request checklist

Before submitting a PR:
- [ ] Spell-checked the content
- [ ] Verified that any internal links work
- [ ] Filled in all template sections (for map guides — no empty template sections left)
- [ ] Set `lastTested` and `mapVersion` frontmatter (for map guides)
- [ ] Ran `npm run build` locally — no errors

## Getting help

Join the [Discord](https://discord.gg/E8YXDtJhhm) to ask questions, propose new map guides, or discuss the project.
