# Bóng Tối Gauge System (KB_BongToiGauge v1.5)

## Overview

**KB_BongToiGauge (v1.5)** implements Hải's signature mechanic: a "Bóng Tối" (Darkness) gauge, labeled **DP (Dark Point)**, that fills during combat and overflows when Hải loses control. The gauge is rendered either **inside the VisuMZ Sideview status panel** (panel mode, default) or as a **scene-level overlay sprite** (overlay mode, legacy fallback).

- **File:** `js/plugins/KB_BongToiGauge.js`
- **Dependencies:** KB_CoreEngine
- **Optional compatibility:** VisuMZ_1_BattleCore, VisuMZ_3_SideviewBattleUI
- **Status:** v1.5, active
- **Changes from v1.4:** Panel-mode rendering (default), label "DP", configurable sprite subclasses per mode

## Mechanics

### Gauge Fill

The DP gauge (0–100, configurable max) increases under three conditions:

1. **Skill usage:** Hải casts a skill with notetag `<bongtoi: +N>` (e.g., Long Vương Chi Nộ +30)
2. **Low HP auto-fill:** When Hải's HP < 30% (configurable), gauge fills +10 (configurable) per turn
3. **State application:** Hải receives a state with notetag `<bongtoi: +N>` (e.g., self-buff buffs Bóng Tối)

**Decay:** Optional −value per turn (default 0, disabled).

### Overflow & Loss of Control

When gauge ≥ 100:

1. Automatically applies **State 28** (Bóng Tối Bùng Phát — "Darkness Outburst") to Hải
2. Resets gauge to 0
3. **Effect:** State restricts Hải to random attacks (attacks anyone, including allies) for 1 turn, with +20% ATK bonus
4. **Overflow switch:** Switch 32 toggles on during overflow (for event checks)

### Gauge Reset

The skill **Tĩnh Tâm** (Skill 491) has notetag `<bongtoi: reset>`, instantly resetting the gauge to 0.

## Rendering Modes (v1.5)

### Panel Mode (default: drawMode = "panel")

**Visual:** Gauge renders **inside Hải's VisuMZ Sideview status panel**, on the same row structure as HP/MP/TP.

**Details:**
- Positioned one `gaugeLineHeight` below the TP gauge
- Inherits panel theme: colors, fonts, opacity, scale
- Gauge width: **96px** (configurable via `panelGaugeWidth` param)
- Sprite class: `Sprite_KBBongToiGaugePanel` (optimized for panel rendering at 96px)
- Label reads **"DP"** (configurable via `label` param, v1.5+)
- Fully visible inside the window (no clipping)

**When to use:** Standard VisuMZ setups with Sideview Battle UI. This is the **default since v1.5**.

**Technical:** Hooked on `Window_StatusBase.prototype.placeGauge`. When VisuMZ calls `placeGauge(haiActor, "tp", ...)`, the KB_BongToiGauge hook intercepts and chains a `placeGauge(haiActor, "kb_bongtoi", ...)` call one line below.

### Overlay Mode (legacy: drawMode = "overlay")

**Visual:** Gauge renders as a **scene-level sprite overlay**, positioned relative to Hải's status window (usually below).

**Details:**
- Positioned via `gaugeOffsetX` and `gaugeOffsetY` (from window left/bottom)
- Gauge width: **160px** (configurable via `gaugeWidth` param)
- Sprite class: `Sprite_KBBongToiGaugeOverlay` (optimized for overlay rendering at 160px)
- Label reads **"DP"** (same as panel mode)
- Repositioned each frame in `Scene_Battle.update` to track Hải's window

**When to use:** Non-VisuMZ battle layouts, or when panel integration is not desired.

**Technical:** Scene-level sprite added as `_kbBongToiOverlay` child of the scene. `Scene_Battle.update` calls `_updateBongToiOverlay()` each frame to sync position with Hải's window.

## Gauge Display Details

### Appearance

- **Label:** "DP" (default, configurable)
- **Colors:** Standard gauge gradient (purple → orange → red as fill approaches max)
- **Font:** Inherits from KB_SideViewBattleUI params (Header Font, Body Font)
- **Opacity:** Inherits from panel opacity or overlay config

### Persistence

- Stored in **$gameVariables[22]** (`bongtoi_gauge` variable, configurable)
- Auto-saved / loaded with game saves
- Can be manipulated via plugin commands or script calls

## Plugin Parameters (v1.5)

| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| **Actor ID** | actor | 3 | Which actor (Hải) the gauge applies to |
| **Variable ID** | variable | 22 | $gameVariables slot holding gauge value (0–max) |
| **Overflow Switch ID** | switch | 32 | Toggles ON during overflow (for event checks) |
| **Max Value** | number | 100 | Threshold for overflow trigger |
| **Overflow State ID** | state | 28 | State applied when gauge ≥ max (Bóng Tối Bùng Phát) |
| **Low HP Threshold (%)** | number | 30 | HP % below which auto-fill triggers |
| **Low HP Fill Per Turn** | number | 10 | Gauge increase when HP < threshold |
| **Decay Per Turn** | number | 0 | Gauge decrease each turn (0 = no decay) |
| **Show In Battle** | boolean | true | Enable gauge rendering in battle |
| **Draw Mode** | select | "panel" | "panel" (inside status panel) or "overlay" (scene-level sprite) |
| **Label** | string | "DP" | Text label (e.g., "DP" for English, "BT" for Vietnamese) |
| **Panel Gauge Width** | number | 96 | Width when rendering inside panel (panel mode) |
| **Panel Gauge Offset X** | number | 0 | Horizontal offset from TP gauge (panel mode) |
| **Panel Gauge Offset Y** | number | 0 | Vertical offset from TP gauge (panel mode, default = 1 row) |
| **Gauge Width (Overlay)** | number | 160 | Width when rendering as overlay sprite (overlay mode) |
| **Gauge Offset X (Overlay)** | number | 0 | Horizontal offset from window left (overlay mode) |
| **Gauge Offset Y (Overlay)** | number | 4 | Vertical offset from window bottom (overlay mode) |
| **Debug Mode** | boolean | false | Log all gauge changes to console |

## Plugin Commands

| Command | Arg | Effect |
|---------|-----|--------|
| SetGauge | value (0–max) | Set gauge to exact value |
| AddGauge | delta (±N) | Add/subtract from current gauge |
| ResetGauge | — | Reset gauge to 0, clear overflow switch |
| TriggerOverflow | — | Immediately force overflow (apply state, reset gauge) |

## Notetags

### Skill / Item / State

```
<bongtoi: +N>     — Increase gauge by N (can be negative)
<bongtoi: reset>  — Reset gauge to 0
```

Example usage:
- **Long Vương Chi Nộ (Skill 490):** `<bongtoi: +30>` — Hải's signature attack that feeds the darkness
- **Tĩnh Tâm (Skill 491):** `<bongtoi: reset>` — Hải's cleansing skill that resets the darkness

## Public API

```javascript
KB.BongToi.get()            // Current gauge value (0–max)
KB.BongToi.set(v)           // Set gauge to v (clamped 0–max)
KB.BongToi.add(delta)       // Add delta to current
KB.BongToi.reset()          // Reset to 0, clear overflow switch
KB.BongToi.max()            // Return max value (from param)
KB.BongToi.triggerOverflow() // Force overflow immediately
KB.BongToi.haiActor()       // Get Hải actor object
KB.BongToi.params           // Access all plugin params
```

All methods include try-catch with debug logging (per project safety rules).

## Integration with KB_SideViewBattleUI

### Panel Mode (v1.5 default)

When `drawMode: "panel"`:
1. KB_BongToiGauge's `placeGauge` hook chains after VisuMZ's TP gauge placement
2. Gauge renders **inside** the VisuMZ Sideview panel (one row below TP)
3. **No separate card attachment** — KB_ActorCard does NOT add BongToi as child sprite
4. Gauge inherits panel styling (colors, fonts, opacity)

### Overlay Mode (legacy)

When `drawMode: "overlay"`:
1. Gauge renders as a **separate scene-level sprite**
2. KB_ActorCard does NOT attach gauge (same as panel mode)
3. Positioning configured via `gaugeOffsetX`, `gaugeOffsetY` params (relative to Hải's status window)

### Show BT Inline Param (KB_SideViewBattleUI v3.0+)

- **If KB_BongToiGauge is active:** The "Show BT Inline" param is **ignored** (no effect)
- **Panel mode takes precedence:** v1.5 always uses panel rendering when active
- **Old card-attachment behavior (v3.0):** Removed; gauge is now exclusively in the panel or overlay

## Backward Compatibility

### v1.4 → v1.5 Migration

- **Old "BT" label → "DP" label:** Configurable via `label` param. Change to "BT" in Plugin Manager if needed.
- **Old overlay rendering → Panel mode (default):** Change `drawMode` to "overlay" if you prefer scene-level rendering.
- **Old card-attachment (v3.0):** Removed. Gauge now integrates via `placeGauge` hook (panel mode) or as scene overlay (overlay mode).
- **All v1.0–v1.4 APIs preserved:** No breaking changes to KB.BongToi.* methods, plugin commands, or notetags.

### v1.3 → v1.4 Migration

- `placeGauge` hook simplified (v1.4 fixed visibility issues)
- Window tracking via `_kbHaiWindow` (set by placeGauge hook)

### v1.2 → v1.3 Migration

- Switched from in-window placement (clipped) to scene-level overlay (visible)
- `gaugeWidth`, `gaugeOffsetX`, `gaugeOffsetY` params replaced window-based positioning

### v1.1 → v1.2 Migration

- Replaced text-suffix hook (never visible in VisuMZ Sideview) with sprite gauge
- `Sprite_KBBongToiGauge` introduced (v1.1)

### v1.0 → v1.1 Migration

- Gauge went from text suffix `[BT:X/100]` to visual sprite bar
- Full rewrite of rendering architecture

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Gauge not visible in battle | `showInBattle: false` | Enable "Show In Battle" param |
| Gauge not filling on skills | Skills missing `<bongtoi: +N>` notetag | Add notetag to skill data |
| Gauge overlapping other UI (overlay mode) | Wrong offset params | Adjust `gaugeOffsetX`, `gaugeOffsetY` |
| State not applying on overflow | Wrong `overflowStateId` param | Ensure State 28 exists in database |
| Label shows "BT" instead of "DP" | Old label param | Change `label` param from "BT" to "DP" |
| Console errors when Hải not in party | Missing actor check | Plugin safely handles missing actors (logged) |

## Files & References

- **Implementation:** `js/plugins/KB_BongToiGauge.js`
- **Overflow state:** `data/States.json` id=28 (Bóng Tối Bùng Phát)
- **Skills with notetags:**
  - `data/Skills.json` id=490 (Long Vương Chi Nộ) → `<bongtoi: +30>`
  - `data/Skills.json` id=491 (Tĩnh Tâm) → `<bongtoi: reset>`
- **Class learnings:** `data/Classes.json` id=12 (Thuỷ Thần) — both skills taught
- **Battle UI integration:** See `docs/spec/battle-ui.md` → "Bóng Tối Gauge Integration"
- **Changelog:** See `docs/changelog.md` for v1.5 release notes

## Testing Checklist

- [x] Gauge visible in VisuMZ Sideview panel (panel mode, v1.5 default)
- [x] Gauge label reads "DP" (configurable)
- [x] Long Vương Chi Nộ (+30) increases gauge
- [x] Tĩnh Tâm resets gauge to 0
- [x] Low HP auto-fill triggers at < 30%
- [x] Gauge ≥ 100 applies State 28 (Bóng Tối Bùng Phát)
- [x] State 28 restricts Hải to random attacks (+20% ATK)
- [x] Overflow switch (32) toggles on during overflow
- [x] Gauge persists across save/load
- [x] Plugin commands SetGauge, AddGauge, ResetGauge, TriggerOverflow all work
- [x] Overlay mode renders as scene sprite when `drawMode: "overlay"`
- [x] Proportional scaling: gauge width adjusts to different resolutions (panel mode uses VisuMZ scaling)
- [x] No console errors when Hải not in party (safe error handling)
- [x] No conflicts with KB_SideViewBattleUI or VisuMZ_1_BattleCore
