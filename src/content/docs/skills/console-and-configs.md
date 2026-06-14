---
title: Console & Configs
description: Recommended console settings, binds, and configs for CS2 Zombie Escape.
localizable: true
sidebar:
  order: 7
---

A few settings and binds make ZE significantly more comfortable to play. None of these are mandatory, but they're widely used by experienced players.

## Enabling the console

In CS2: Settings → Game → Enable Developer Console → Yes

Open with `~` (tilde) by default.

## Useful binds

#### Mute voice chat selectively
Type `voice_enable 0` to mute all voice. Use the scoreboard to mute individual players (tab → right-click name).

#### Scoreboard
Keep the scoreboard bound somewhere accessible, you'll use it to check who has items, who is zombie, and to mute players.

## Volume settings

ZE relies on audio cues heavily. Recommended:
- Master volume: to taste, but not muted
- Music: some players mute in-game music to hear callouts more clearly

## Common console commands

| Command | Effect |
|---|---|
| `volume <0-1>` | Master game volume |
| `voice_enable <0/1>` | Toggle voice chat |
| `cl_showpos 1` | Show position/velocity (useful for bhop practice) |
| `bind <key> <command>` | Bind a key to a command |

:::note[DOCS UPDATE: ZE-specific commands]
Add any server-specific commands (EntWatch item pickup, special plugin commands) once confirmed for the main servers.
:::

## Config file

Create an `autoexec.cfg` in your CS2 config directory to persist settings across sessions:

```
// playZE recommended autoexec
voice_enable 1
volume 0.5
// Add your binds below
bind mouse5 "say !negev"
```

:::note[Config file location]
Open Steam, Right-click on CS2, Click Manage → Browse local files, then navigate to `game\csgo\cfg` and place any config files you need there.
:::

## Launch options

:::note[DOCS UPDATE: ZE-relevant launch options]
Document any launch options that affect ZE gameplay (e.g., `-tickrate` is not applicable in CS2, note what is and isn't relevant).
:::
