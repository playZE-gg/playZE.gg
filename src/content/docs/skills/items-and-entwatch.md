---
title: Items & EntWatch
description: How special items work in CS2 ZE — picking them up, using them, and item management.
localizable: true
sidebar:
  order: 6
---

Most ZE maps feature special **items**, which are weapons, abilities, or tools that can dramatically shift the outcome of a hold. These are managed by the **EntWatch** plugin.

## What EntWatch is

EntWatch is a server plugin that tracks which players are holding map items, displays item names and cooldowns in the HUD, and prevents items from being dropped accidentally. It also lets admins and leaders transfer items between players.

## How items work

Items are map-specific. Common types:
- **Damage amplifiers**: boost the team's total damage for a period
- **Freeze / slow items**: temporarily stop or slow zombies
- **Barrier / wall items**: place obstacles zombies must overcome
- **Healing items**: restore human HP
- **Nuke / wipe items**: clear all zombies from a zone (powerful, rare)

Each item has:
- An **activation trigger** (usually the USE key, E by default, or a bind)
- A **cooldown** before it can be used again
- Sometimes **charges** (limited uses per round)

## If you're a new player: don't touch items

Items in the wrong hands waste limited uses. Until you understand a map's item economy, leave items for experienced players who know when and where to activate them. 
:::caution[Item Missuse]
In many cases, constant or even single instance egregious missuse of an item can lead to you being banned from using items on a server. Doing this is considered trolling.
:::

## For item holders

- Communicate to the leader that you have the item
- Wait for the activation call, don't use items independently unless you know exactly the right moment
- If you die or get infected, the item drops; call this out immediately

## Transferring items

If you're holding an item and need to pass it:
- Use the 'drop' keybind to drop the weapon bound to the item. This is bound to 'g' by default.
- Ask an admin or leader to transfer it if the server you are on supports this feature.

:::note[DOCS UPDATE: Server-specific item commands]
Add the EntWatch command list to this page in the docs. e.g. `!ew`, `!ewgive`, item transfer syntax
:::

## Reading the EntWatch HUD

The HUD shows active items, their holder's name, cooldown timer, and charge count. Learn to read it; knowing when a key item is on cooldown affects your strategy as a human and as a zombie.
