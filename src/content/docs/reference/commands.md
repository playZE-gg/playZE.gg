---
title: Console Commands & Binds
description: CS2 console commands and recommended key binds for Zombie Escape.
sidebar:
  order: 2
---

Useful console commands and binds for CS2 ZE. Enable the developer console in CS2 settings before using these.

## Essential Commands

| Command | Description |
|---|---|
| `volume <0–1>` | Master game volume. `volume 0.5` = 50%. |
| `voice_enable <0/1>` | `0` = mute all voice chat. `1` = enable. |
| `cl_showpos 1` | Show your current position and velocity in the top-left. Useful for bhop practice. |
| `cl_showpos 0` | Disable the above. |
| `bind <key> <command>` | Bind a key. `bind "mouse4" "+jump"` binds your side mouse button to jump. |

## Useful Binds

### Scroll wheel jump (bhop aid)

```
bind "mwheeldown" "+jump"
bind "mwheelup" "+jump"
```

Scroll-wheel jumping makes timing bhops easier. Both directions jump for maximum flexibility.

### Walk toggle

```
bind "alt" "+speed"
```

Hold Alt to walk silently. Useful on maps where footsteps matter.

## Common Server Commands

These are chat commands typed directly into the in-game chat (`/` or `!` prefix, depending on the server). Exact availability varies by server plugin configuration.

| Command | Description |
|---|---|
| `!rtv` | Rock the Vote — start a vote to change the map. |
| `!nom <mapname>` | Nominate a map for the next vote. |
| `!ztele` | Teleport to spawn (zombie only, if stuck). |
| `!zmenu` | Open zombie menu (server-dependent). |
| `!leader` | Become a leader or open the leader menu (server-dependent). |

## EntWatch Commands

EntWatch commands let you see item status and (if authorized) manage items.

| Command | Description |
|---|---|
| `!ew` or `!entwatch` | Show the EntWatch HUD / item list. |
| `!ewgive <player>` | Transfer your item to another player (requires permission). |

:::note[Server-specific commands]
Commands and their exact syntax vary by server plugin version. Verify these against the specific servers listed in [Getting Started](/start/getting-started/).
:::

## Config File

Persist your settings across sessions using an `autoexec.cfg` file.

**Location (Windows):** `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg\autoexec.cfg`

Create the file if it doesn't exist. Example:

```
// playZE recommended settings
volume 0.6
voice_enable 1
bind "mwheeldown" "+jump"
bind "mwheelup" "+jump"
```

CS2 runs `autoexec.cfg` on game launch automatically.
