---
title: Style Guide
description: Writing conventions for playZE content — tone, formatting, and frontmatter.
sidebar:
  order: 2
---

Consistent style makes the site easier to read and easier to contribute to. This guide covers tone, formatting, and frontmatter conventions for playZE content.

## Tone

- **Direct and practical.** Readers are trying to get better at ZE, not read an essay. Lead with what they need to do.
- **Second person.** "You hold here" not "Players hold here."
- **Present tense.** "The door opens after 20 seconds" not "The door will open."
- **Skip filler phrases.** Don't start sentences with "It's worth noting that" or "One thing to keep in mind is."

## Headings

Use `##` (H2) for major sections and `###` (H3) for subsections. Avoid skipping levels.

Heading text should be descriptive, not clever. "Stage 2 — Generator Room" is better than "The Gauntlet."

### Map stage headings

In map guides, `###` (H3) is reserved for **stages** — each `###` is auto-numbered with a stage badge. Sections *within* a stage must use `####` (H4) or deeper, never `###`. This keeps the automatic stage numbering correct.

For long guides converted to MDX, use the `<Stage n={1} title="..." />` component instead of a `###` heading. It renders the same badge with explicit numbering.

## Map guide sections

Follow the template exactly — all eight sections, in order. Don't add extra top-level sections or remove required ones. If a section genuinely doesn't apply (e.g. no items on this map), write a brief sentence saying so rather than deleting the section.

## Callout asides

Use Starlight's `:::note`, `:::tip`, `:::caution`, and `:::danger` asides sparingly:
- `:::note` — supplemental information, things worth knowing but not critical.
- `:::tip` — a practical technique or optimization.
- `:::caution` — something players commonly do wrong.
- `:::danger` — a mistake that reliably wipes the round.

Don't put every paragraph in a callout — use them for genuinely elevated information.

## Tables

Use Markdown tables for item lists, command references, and comparison data. Keep columns narrow — don't pad with empty cells.

## Code blocks

Use fenced code blocks (triple backticks) for:
- Console commands
- Config file contents
- Binds

Always add a language tag where applicable:
- ` ```bash ` for shell commands
- No language tag needed for CS2 console commands (they don't map to a standard language)

## Links

Use relative Markdown links to other site pages:
- ✅ `[Movement](/skills/movement/)`
- ❌ `[Movement](https://playze.gg/skills/movement/)`

For external links, use the full URL.

## Frontmatter fields

### All pages
| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Sentence case. Keep under 60 characters. |
| `description` | Yes | One sentence. Used in search results and social previews. Under 160 characters. |

### Map pages (additional)
| Field | Required | Notes |
|---|---|---|
| `difficulty` | Yes | One of: `Easy`, `Medium`, `Hard`, `Insane` |
| `mapVersion` | Yes | The version or Workshop ID the guide was written against |
| `lastTested` | Yes | ISO date: `YYYY-MM-DD` |
| `stages` | Recommended | Integer number of stages |
| `tags` | Optional | Array of strings |

## Freshness stamps

Every map guide must have a `lastTested` date and `mapVersion` in its frontmatter. Update these when you verify the guide against a newer map version — even if the strategies didn't change. The date is a signal to readers about how current the guide is.

## Images

- Optimize images before committing (use a tool like Squoosh or ImageOptim).
- Preferred format: ~~WebP. Fallback: PNG for screenshots, JPEG for photos.~~ **This is no longer required, as our deployment process with automatically handle image transforms to the WebP format.**
- Keep image filenames descriptive: `ze_best_korea_stage2_hold.webp` not `screenshot.webp`.
- Place images in `src/assets/maps/<mapname>/` for map-specific images.
- Add `alt` text to every image.

## What not to include

- **Personal opinions framed as fact.** "This map is bad" doesn't help a player.
- **Server-specific drama, names of specific players, or community conflicts.**
- **Strategies you haven't personally verified.** Mark unverified information with a `:::note` aside.
- **Content from other guides without attribution** — CC-BY-SA requires attribution.
