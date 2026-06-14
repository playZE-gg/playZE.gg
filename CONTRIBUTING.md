# Contributing to playZE

playZE is a community-maintained Zombie Escape documentation site. All content is written in Markdown and lives in this repository. No special access required, just a GitHub account and a PR.

## Licensing

Everything in this repository, content, code, and configuration, is licensed under [GPL-3.0](LICENSE). Inbound = outbound. Your contribution is automatically licensed under the same terms. No CLA required.

## How to contribute

See the full guide at **[playze.gg/contribute/how-to-contribute](https://playze.gg/contribute/how-to-contribute)**.

The short version: fork the repo, make your changes in a branch, open a PR against `main`. A maintainer will review and merge.

## Local dev quickstart

```bash
git clone https://github.com/playZE-gg/playZE.gg.git
npm install
npm run dev
```

Site runs at `http://localhost:4321`. Requires Node.js 22+.

## Adding a map guide

1. Copy [`src/content/docs/maps/_map-template.md`](https://github.com/playZE-gg/playZE.gg/blob/main/src/content/docs/maps/_map-template.md).
2. Rename it to `ze_mapname.md` (keep underscores exactly as they appear in the map name).
3. Fill in every section and open a PR.

See the [style guide](https://playze.gg/contribute/style-guide/) for formatting and frontmatter conventions.

## Getting help

Join the Discord: **[discord.gg/E8YXDtJhhm](https://discord.gg/E8YXDtJhhm)**
