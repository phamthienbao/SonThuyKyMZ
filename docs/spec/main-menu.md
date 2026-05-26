# Main Menu (KB_MainMenuVisual v0.6.15 shipped)

## Overview

In-game pause menu redesign for Sơn Thuỷ Ký. Replaces the default RPG Maker MZ menu with a sumi-e (山水 ink-wash) aesthetic that matches the game's mythological Văn Lang setting. Surfaces the project's custom systems (Bóng Tối Gauge, Ngọc Hồn) and ships with a full Hán Việt command vocabulary.

- **File:** `js/plugins/KB_MainMenuVisual.js` (to be created)
- **Dependencies:** KB_CoreEngine, KB_Localization, VisuMZ_0_CoreEngine, VisuMZ_1_MainMenuCore, VisuMZ_1_ElementStatusCore
- **Optional integrations:** KB_BongToiGauge, KB_NgocHonState, VisuMZ_2_QuestSystem, CGMZ_FastTravel
- **Status:** v0.6.15 shipped (final ElementStatusCore workaround — runtime patch). v0.6.14's class subtitle now resolves localization keys (`{classStudent}` → "Sinh Viên"). v0.6.13 discovered ElementStatusCore's `Window_StatusData` renders via `drawTextEx`, not `drawText` (and drawTextEx resets font settings). Workaround: bypass drawTextEx and call `contents.drawText()` directly with subtitle styling. DP gauge now visible at Scene_Status bottom edge (clipping caveat documented in v0.6.13). v0.6.15's cleaner fix: at plugin load, patch `VisuMZ.ElementStatusCore.Settings.StatusMenuList[generalIdx].DrawJS` to expand `basicDataHeight` from `6.5*lineHeight` to `7.5*lineHeight`, shifting the actor info block up ~36px so DP fits inside the panel. No longer deferred — now active. v0.6.11 had attempted subclass-level overrides but were shadowed by VisuMZ's own overrides. v0.6.10 capped `Scene_MenuBase.mainAreaHeight` at available space above hint (prevents most scenes' content from overlapping the centered bottom hint). v0.6.9 added class subtitle styling and DP gauge height on Scene_Skill. (`Window_StatusBase.drawActorClass` override uses `SUBTITLE_FONT` + `SUBTITLE_COLOR` so class reads as a small dim subtitle on Scene_Skill/Equip/Status headers; `Scene_Skill.statusWindowHeight` bumped to 5 rows + `Window_SkillStatus.refresh` switched to top-aligned drawing so KB_BongToiGauge's DP row fits without clipping)
- **Design canvas:** 1280×720 (matches battle UI canvas; uses same `sx()` / `sy()` scaling helpers from KB_CoreEngine)

## Goals

1. Replace stock MZ menu chrome with an ink-wash visual identity that reinforces 山水 atmosphere on every pause.
2. Surface **Bóng Tối** and **Ngọc Hồn** per-actor, always visible — never buried in a sub-menu.
3. Provide a full Hán Việt Vietnamese command vocabulary while leaving `HP`, `MP`, `TP`, and `Save` as English (user preference).
4. Integrate cleanly with VisuMZ_1_MainMenuCore via documented hooks — zero core method overrides, conflict-safe.
5. Route every player-facing string through KB_Localization (CSV-driven), no hardcoded text.

## Non-goals

- Title screen redesign (already handled by KB_Title / KB_TitleCommands).
- Inventory / equipment / status sub-screens. This spec defines the **command hub layout only**; sub-screens stay on their respective plugins (`VisuMZ_1_ItemsEquipsCore`, `VisuMZ_1_SkillsStatesCore`, etc.) for v1.0.
- Mobile/touch input. v1.0 targets PC; mobile-aware tweaks tracked separately under task D3.

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Sơn Thuỷ Ký · Dương Châu ngoại thành    ☯ 03:42 · 1,250 Lượng │  ← header band
├──────────────┬──────────────────────────┬───────────────────┤
│  ⬢ Vật Phẩm  │                          │  ┌─────────────┐  │
│  ⬢ Kỹ Năng│                          │  │  [Sơn Tinh] │  │
│  ⬢ Trang Bị  │      ink-wash painting   │  │  HP ████░░  │  │
│  ⬢ Trạng Thái│     of current location  │  │  MP ████░░  │  │
│  ⬢ Nhật Ký   │     (desaturated map     │  │  Bóng Tối ▓ │  │
│  ⬢ Bản Đồ    │      screenshot, ink     │  │  Ngọc Hồn ◆│  │
│  ⬢ Thiết Đặt │      filtered)           │  └─────────────┘  │
│  ⬢ Save      │                          │  ┌─────────────┐  │
│  ⬢ Rời Đi    │                          │  │  [Mỵ Nương] │  │
│              │                          │  │  …          │  │
│   ▢ seal     │                          │  └─────────────┘  │
└──────────────┴──────────────────────────┴───────────────────┘
   command          atmospheric panel        party + gauges
   (sx 0–280)       (sx 280–880)             (sx 880–1280)
```

### Header band and menu button hint (Step 9 — shipped v0.5.0–v0.6.11)

**Status:** Fully implemented with Sprite-based rendering. Custom centered button hint extends to all Scene_MenuBase subclasses in v0.6.7. Scene layout respects hint space in v0.6.10. Scene_Status window rect height capped in v0.6.11 to prevent DP gauge clipping (iteration #1 targeting VisuMZ subclass overrides + absolute pixel drawing).

**Button hint (v0.5.6+, extended v0.6.7, scene-aware v0.6.8, layout-safe v0.6.10, Status-refined v0.6.11):**
- Custom `KB_MenuButtonHint` sprite replaces VisuMZ's right-aligned button-assist bar
- Base display: `[Z] Chọn   [X] Hồi` centered at the bottom of the screen, 56px high
- **v0.6.7 extension:** Previously only on `Scene_Menu`; now added via `Scene_MenuBase.create` alias so all menu subscenes show the same clean centered hint
- **v0.6.10 extension:** `Scene_MenuBase.mainAreaHeight` capped at available space above hint so scene content (gauges, windows) never overlaps the hint band
- **v0.6.11 iteration:** `Scene_Status.statusWindowRect` aliased to cap `rect.y + rect.height` at `Graphics.boxHeight - sy(HINT_H) - sy(20)` (20-px breathing room above the hint). VisuMZ's `Window_Status` uses absolute rects that ignore `mainAreaHeight`, so v0.6.10's cap alone didn't help Scene_Status's DP gauge. Also: `Window_Status.prototype.drawActorClass` override added (separate from existing Window_StatusBase one) so VisuMZ's subclass-level override doesn't shadow it — uses `SUBTITLE_FONT` + `SUBTITLE_COLOR`. **Known caveat:** if VisuMZ's Window_Status draws gauges at absolute pixel positions instead of respecting `innerHeight`, the window-rect cap will clip the gauges instead of moving them up. User to confirm in-game whether the DP gauge is now visible above the hint or just chopped at the new boundary.
- **v0.6.8 extension:** Scene-aware entries prepended before OK/Cancel:
  - `Scene_Skill`, `Scene_Equip`, `Scene_Status`, `Scene_ClassChange` (when party ≥ 2): prepends `[Q/W] Đổi Người` / `[Q/W] Switch Ally`
  - `Scene_Item`, `Scene_Shop`: prepends `[Q/W] Đổi Loại` / `[Q/W] Switch Tab`
  - All other `Scene_MenuBase` subclasses: plain `[Z] Chọn   [X] Hồi` only
  - Not yet wired: `Scene_Quest`, `CGMZ_Encyclopedia`, `Scene_FastTravel` (Q/W bindings not yet verified)
- Implementation: `_paint()` refactored to join an entries array; `_getEntries()` returns `[ optional scene entry, OK, Cancel ]`; `_sceneEntry()` does `instanceof` checks wrapped in `typeof X !== 'undefined'` for safety
- Params: `Use Custom Bottom Hint` (true), `Hint Height` (56), `Hint OK Key` (Z), `Hint OK Label` (Chọn), `Hint Cancel Key` (X), `Hint Cancel Label` (Hồi)
- Localization: hint labels route through `KBLocalization.process`, so they respect the active language setting; two new keys added: `menu_hint_switch_actor` (vi `Đổi Người` / en `Switch Ally`), `menu_hint_switch_category` (vi `Đổi Loại` / en `Switch Tab`)
- **v0.6.6 safeguard:** When `Use Custom Hint` is off but `Header Relocates Button Assist` is on, Scene_Menu still has a fallback path to relocate VisuMZ's default assist bar to the bottom edge (legacy behavior)

### Header band details (Step 9 — v0.5.0+)

**Status:** Fully implemented with Sprite-based rendering.

- Height: 64px
- Left: game title (from `$dataSystem.gameTitle`, processed through KB_Localization) + current location name (from `$gameMap.displayName()`)
- Right: right-aligned cluster: gold amount + "Lượng" unit label, playtime (hh:mm:ss format), map location
- Rendering: Full-width Sprite (KB_MenuHeader) paints dynamically each frame with playtime delta check to minimize redraws
- Style: ink-wash parchment background (alpha 0.45), cinnabar/taupe ink separator divider below, no solid box — paper texture shows through
- **v0.6.6 fix:** Right cluster padding now derives dynamically from `SceneManager._scene._cancelButton.x` when touch UI is enabled. Falls back to fixed `padX` when cancel button is absent. Prevents overlap of gold/playtime/location text underneath the top-right back button.
- Params (8 total):
  - Header Height: 64
  - Header Title Font Size: 26
  - Header Title Color: #e8dcc4 (cream)
  - Header Info Font Size: 18
  - Header Info Color: #b8a888 (taupe)
  - Header Background Alpha: 0.45
  - Header Separator Color: #8a7866 (dark brown ink)
  - Header Title (blank = auto-load from $dataSystem.gameTitle)
- Error handling: try/catch around `_paint()` with `console.error()` + full stack trace logging
- Localization integration: `menu_label_playtime` key added to `locales/*/Menu.csv`

### Command column (left)

- Width: `sx(280)`
- 9 commands, vertical list with one row each at `sy(56)` row height
- Each row: small ink-blot icon (image asset, **no Chinese characters**) + Hán Việt label
- Selection: cinnabar (`#a52a2a`) brushstroke underline, no rectangular cursor
- Hover/focus: row text shifts right `sx(8)` with cubic-out easing (matches battle UI animation language)

### Atmospheric panel (center)

- Width: `sx(600)`
- Content: current map's tilemap rendered to a `Bitmap`, then desaturated + ink-filtered (PIXI filter chain) at menu open
- Cached for the active map; invalidated on map transfer
- Soft vignette + paper grain overlay
- This is **the** visual hook — it changes every map, so the menu always feels site-specific

### Party / gauges column (right)

- Width: `sx(400)`
- One **actor card** per battle member, vertically stacked
- Each card displays:
  - Face graphic (top-left of card)
  - Actor name (Hán Việt — uses `$dataActors[id].name` which already routes through KB_Localization)
  - Class + level as dim subtitle row (18px font, warm gray color, matching personal-scene header treatment)
  - HP gauge + numeric (label: `HP`, English)
  - MP gauge + numeric (label: `MP`, English)
  - **Bóng Tối** gauge (when KB_BongToiGauge is enabled)
  - **Ngọc Hồn** state indicator (when KB_NgocHonState is enabled)
- Card style: parchment background (reuse `img/system/parchment_*.png` from battle UI for consistency)
- **v0.6.9 note:** `Window_StatusBase.prototype.drawActorClass` is overridden to use `SUBTITLE_FONT` (18px default) + `SUBTITLE_COLOR` (warm gray), matching the card's subtitle styling. This applies to all actor-class rendering — Scene_Skill / Equip / Status header rows AND full-page Scene_Status. Scene_Skill's status window height bumped to 5 rows (~204px) with top-aligned content drawing (`y=0`) instead of stock vertical-center, accommodating the DP gauge row without truncation.

## Command list

| Order | Localization key | Vietnamese (Hán Việt) | Action / scene |
|-------|------------------|------------------------|----------------|
| 1 | `menu_cmd_item` | Vật Phẩm | Scene_Item |
| 2 | `menu_cmd_skill` | Kỹ Năng | Scene_Skill |
| 3 | `menu_cmd_equip` | Trang Bị | Scene_Equip |
| 4 | `menu_cmd_status` | Trạng Thái | Scene_Status |
| 5 | `menu_cmd_formation` | Đội Hình | Scene_Menu formation handler |
| 6 | `menu_cmd_journal` | Nhật Ký | Scene_KBJournal (hub — see Journal hub section) |
| 7 | `menu_cmd_map` | Bản Đồ | CGMZ_FastTravel scene |
| 8 | `menu_cmd_options` | Thiết Đặt | Scene_Options |
| 9 | `menu_cmd_save` | Save | KB_SaveCore scene (handles both save AND load) |
| 10 | `menu_cmd_quit` | Rời Đi | Scene_GameEnd |

**No separate Load command** — KB_SaveCore unifies save/load in one scene. Mobile-friendly (fewer top-level commands = better thumb reach).

Order rationale: action verbs (inventory, magic, gear) → character (status) → exploration (journal, map) → meta (settings, save, quit). The meta cluster sits at the bottom so the player's eye lands on the gameplay verbs first.

## Hán Việt glossary

Authoritative source: `docs/glossary.md`. The menu adds these entries:

| Key | Vietnamese | Etymology / note |
|-----|------------|-------------------|
| Items | Vật Phẩm | 物品 |
| Skills | Kỹ Năng | 技能 — user pick 2026-05-26; preferred for everyday legibility over the more literary "Pháp Thuật" 法術 or "Thần Thuật" 神術 |
| Equipment | Trang Bị | 裝備 |
| Weapon | Binh Khí | 兵器 |
| Armor | Phòng Cụ | 防具 |
| Status | Trạng Thái | 狀態 |
| Formation | Đội Hình | 隊形 — party reorder command |
| Journal / Quest | Nhật Ký / Nhiệm Vụ | 日記 / 任務 — menu label uses "Nhật Ký" |
| Map | Bản Đồ | 版圖 |
| Options | Thiết Đặt | 設定 |
| Quit | Rời Đi | plain Vietnamese; "Hồi Gia" 回家 is the Hán Việt alternative — pending user pick |
| Gold unit | Lượng | 兩 (taels) |
| HP / MP / TP | (untranslated) | User opted to keep English |
| Save | (untranslated) | User opted to keep English |

## Journal hub (Nhật Ký)

The Nhật Ký command opens a **hub scene**, not a single sub-screen. The hub shows four options that route to existing plugin scenes. This keeps narrative content (Journey), bestiary (Monster Book), legendary lore (Legends), and active goals (Quest Logs) under one mental category for the player while letting each subsystem stay on its specialist plugin.

```
        Main Menu
            │
       [Nhật Ký]
            ▼
   ┌────────────────────────────────────┐
   │   Nhật Ký                          │
   ├────────────────────────────────────┤
   │  ⬢ Hành Trình      (Journey)       │ ──► CGMZ_Encyclopedia (Story category) [Step 12]
   │  ⬢ Quái Phổ      (Monster Book)    │ ──► CGMZ_Encyclopedia (Bestiary category) [Step 12]
   │  ⬢ Nhiệm Vụ      (Quest Logs)      │ ──► VisuMZ_2_QuestSystem (Scene_Quest) [Step 11]
   │  ⬢ Truyền Thuyết     (Legends)     │ ──► CGMZ_Encyclopedia (Lore category) [Step 12]
   └────────────────────────────────────┘
```

### Hub commands

| Order | Localization key | Vietnamese (Hán Việt) | Etymology | Action |
|-------|------------------|------------------------|-----------|--------|
| 1 | `journal_cmd_story` | Hành Trình | 行程 — "journey / itinerary" | Open CGMZ_Encyclopedia, jump to Story category (Step 12) |
| 2 | `journal_cmd_bestiary` | Quái Phổ | 怪譜 — "register of demons / monsters" | Open CGMZ_Encyclopedia, jump to Bestiary category (Step 12) |
| 3 | `journal_cmd_quest` | Nhiệm Vụ | 任務 | Open VisuMZ_2_QuestSystem Scene_Quest (Step 11) |
| 4 | `journal_cmd_lore` | Truyền Thuyết | 傳説 — "legend(s)" | Open CGMZ_Encyclopedia, jump to Lore category (Step 12) |

### Hub scene architecture

- New class: **`Scene_KBJournal`** (subclass of `Scene_MenuBase`)
- Window: **`Window_KBJournalCommand`** — 4 vertical commands, parchment background, brushstroke selection underline (same visual language as main menu command column). Window resized via `calcWindowHeight(4, true)`.
- Handlers push to the respective specialist scene via `SceneManager.push(...)`; on return, pop back to `Scene_KBJournal` (so the player can switch between sub-views without going through the main menu)
- Cancel returns to `Scene_Menu`
- Scene title sprite ("Nhật Ký") anchors off the command window's resting Y position (`_journalCommandWindow._kbHomeY`) with a 12px gap, ensuring correct centering regardless of row count
- **Command enable/disable state (v0.6.2–v0.6.4):** Hành Trình (story), Quái Phổ (bestiary), and Truyền Thuyết (lore) are disabled (grayed out) until Step 12 wires them to CGMZ_Encyclopedia. Quest (Nhiệm Vụ) stays enabled in Step 11 onward, allowing immediate testing. The disable flag is controlled by the `makeCommandList` condition check (passes `false` for the three stub commands).

### CGMZ_Encyclopedia integration

CGMZ_Encyclopedia supports multiple categories (Bestiary, Items, Lore, Story, etc.). For the journal hub, three categories are used:

- Use the plugin's existing `SceneManager.push(CGMZ_Scene_Encyclopedia)` with a pre-selected category. If direct category-jump isn't supported, wrap with a small alias that sets the initial category index before the scene paints.
- Configure three categories in CGMZ_Encyclopedia plugin params:
  - **Story Summary** (for Hồi Ký) — written-up story beats unlocked by switch flips on chapter completion (`chapter_p_clear`, `chapter_1_clear`, etc.). Each entry has a localization key for title + body.
  - **Bestiary** (for Yêu Phổ) — monsters auto-register on first kill (CGMZ default behavior).
  - **Lore** (for Truyền Kỳ) — legendary chronicles, NPC bios, item histories, world-building content. Unlocked via story gates or discovered through exploration.
- All three categories use CGMZ_Encyclopedia as the backend; only Quest Logs use VisuMZ_2_QuestSystem.

**This is a follow-up build** — KB_Journal scene is part of the main menu build, but category data authoring + Bestiary configuration are tracked separately.

## Localization integration

The `locales/vi/Menu.csv` (and `locales/en/Menu.csv`) contain the 14 main-menu keys. **Registered in KB_Localization plugin params** (v0.6.0 onward).

**User note (2026-05-26):** Line 15 in `locales/vi/Menu.csv` was manually changed from `Yêu Phổ` to **`Quái Phổ`** (user preferred the demonic term). English label `Monster Book` unchanged in `locales/en/Menu.csv`.

In `KB_MainMenuVisual.js`, fetch labels via `KB_Localization.getText('menu_cmd_item')` etc. when building Window_MenuCommand.

## Architecture

### Core classes

| Class | Purpose | Status |
|-------|---------|--------|
| **KB_MenuHeader** | Top band: title + location + playtime + gold. Sprite-based dynamic rendering with playtime delta check per frame. | **v0.5.0 shipped** |
| **KB_MenuAtmosphereLayer** | Renders desaturated ink-wash of current map tilemap into a cached `Bitmap`; PIXI filter chain (Desaturate → Grain → Vignette). Cache key = `$gameMap.mapId()`. | Planned |
| **KB_MenuCommandWindow** | Extends `Window_MenuCommand`; ink-blot icons via `drawIcon` overrides; cinnabar brushstroke selection underline replaces default cursor; slide-in animation on `open()`. | Planned |
| **KB_ActorCardMenu** | Same parchment card style as battle UI's `KB_ActorCard`, adapted for taller vertical layout; HP/MP/BT/Ngọc Hồn drawing delegated to existing helpers in KB_BongToiGauge / KB_NgocHonState. | Planned |
| **KB_MenuPartyColumn** | Container; spawns one `KB_ActorCardMenu` per `$gameParty.battleMembers()`, vertical stack. | Planned |
| **Scene_KBJournal** | Hub scene for the Nhật Ký command. Hosts `Window_KBJournalCommand` with 3 entries (Hồi Ký, Yêu Phổ, Nhiệm Vụ); handlers push to CGMZ_Encyclopedia or VisuMZ_2_QuestSystem scenes. Cancel returns to Scene_Menu. | Planned |
| **Window_KBJournalCommand** | 3-item vertical command window inside Scene_KBJournal. Same parchment + brushstroke selection styling as the main command column. | Planned |

### VisuMZ_1_ElementStatusCore interception (v0.6.13–v0.6.15 workarounds)

**Background:** The Scene_Status **General tab** is rendered by `VisuMZ_1_ElementStatusCore.Window_StatusData`, not MainMenuCore. That window:
- Uses obfuscated method names (`_0x2e4721(0x158)`, etc.), making reliable method targeting impossible
- Never calls `drawActorClass` or `drawActorSimpleStatus` — it draws actor info via direct calls inside obfuscated functions
- Renders class name via `this.drawTextEx(className, ...)` — NOT `drawText` (v0.6.12 misidentified the call path)
- `drawTextEx` internally resets font settings after the call, so pre-setting `contents.fontSize` doesn't persist to the drawn text
- Calls `placeGauge` individually for HP/MP/TP, triggering KB_BongToiGauge's chain hook → DP gauge appended below TP
- ElementStatusCore's General tab's `DrawJS` reserves `basicDataHeight = lineHeight * 6.5` (4 lines for actor info + 3 rows for gauges), fitting HP/MP/TP only. DP as a 4th gauge falls outside this reserved area, sitting at the window's bottom edge and partly clipping behind the hint band.

**Workarounds (in ENABLE_PARTY mode, v0.6.13–v0.6.15):**

1. **Class subtitle via drawTextEx bypass with KB_Localization resolution (v0.6.14)**: Aliased `Window_StatusData.prototype.drawTextEx`. When the text argument equals `this._actor.currentClass().name`, bypass drawTextEx entirely and call `this.contents.drawText(text, x, y, width, lineHeight, 'left')` directly with `SUBTITLE_FONT` + `SUBTITLE_COLOR` pre-set, skipping the escape-sequence processing that drawTextEx does. This ensures subtitle styling persists because we skip the fontSize reset. **NEW in v0.6.14:** The raw class text is piped through `KBLocalization.process(text)` before drawing, so placeholder keys like `{classStudent}` resolve to their Vietnamese labels ("Sinh Viên"). Falls through to raw text if KBLocalization isn't loaded. Works reliably because class names are plain strings without escape sequences.

2. **DP fully visible via runtime DrawJS patch (v0.6.15)**: **ACTIVE.** At plugin load (inside the ENABLE_PARTY branch), if `VisuMZ.ElementStatusCore.Settings.StatusMenuList` exists and contains the General entry, replace its `DrawJS` function with a near-identical reimplementation that sets `basicDataHeight = lineHeight * 7.5` (was 6.5). Everything else preserved verbatim — actor graphic, name/level/class/icons drawing, gauge stack, EXP + Biography panel on the right half. Net effect: the actor info block shifts up ~36 px; the 4-gauge stack now sits cleanly inside the panel. The class-subtitle hook (v0.6.14) still fires inside the patched DrawJS because it still calls `drawTextEx(className, …)`. Wrapped in try/catch with debug-safe `console.error` — silently no-ops if ElementStatusCore isn't installed. **This was the "cleaner future fix" deferred in v0.6.13, now active.**

Both fixes are guarded with `typeof X !== 'undefined'` so a setup without ElementStatusCore still loads cleanly.

### VisuMZ_1_MainMenuCore integration

Use these MainMenuCore hooks (no core overrides):

- **Command order / list:** plugin param `Main Menu Categories` → set to the 10 commands above with their localization-keyed labels.
- **Custom command handlers:** Journal and Map handlers are **unconditionally wired** in `createCommandWindow` — no gate param needed. `commandJournal` always pushes `Scene_KBJournal`; `commandMap` checks for `Scene_FastTravel` and falls back to `activate()` if unavailable (graceful degrade).
- **Layout override:** plugin param `Status Graphic` → `none` (we draw our own); plugin param `Status Window JS > Window Width/Height` → 0 (hide stock status window).
- **Background:** plugin param `Background Settings > Snapshot` → false; we render our own background via `Scene_Menu.prototype.createBackground` extended in our plugin.
- **Inject custom layers:** Currently aliasing `Scene_Menu.prototype.create` to add `KB_MenuHeader` (v0.5.0–v0.5.6 shipped). Custom layers (`KB_MenuAtmosphereLayer`, `KB_MenuPartyColumn`) are children of `this._windowLayer`'s parent so they layer correctly (behind command/status windows).
- **Actor selection flow:** Commands Skill / Equip / Status / Formation / ClassChange all route through `Scene_Menu.commandPersonal()`, which activates the stock status window (`this._statusWindow`) for actor selection. Three aliases manage visibility:
  - `commandPersonal`: shows the stock status window **and hides the party column** (`this._kbPartyColumn.visible = false`) to prevent double-render of actor info.
  - `onPersonalCancel`: re-hides the status window and restores party column visibility (`visible = true`).
  - `onPersonalOk`: re-hides the status window and restores party column visibility **before** delegating to the original (so when the pushed scene pops back to the menu, the column is already visible).
  - All guarded by `if (this._kbPartyColumn)` — no-op when `Enable Party Column` is off.
  - Window stays at `backgroundType=2` (frames only, content visible) to avoid jarring pop-in. 
  - Fix applied in v0.6.3 (initial actor-selection visibility); v0.6.5 (double-render dedup via party column toggle).

### Plugin load order

```
VisuMZ_0_CoreEngine
KB_CoreEngine
KB_Localization
VisuMZ_1_MainMenuCore
VisuMZ_1_ItemsEquipsCore
VisuMZ_1_SkillsStatesCore
VisuMZ_2_QuestSystem
CGMZ_FastTravel              ← keep for map scene
KB_BongToiGauge
KB_NgocHonState
KB_SaveCore
KB_MainMenuVisual            ← new, load LAST among menu plugins
```

## Quest system decision

**Pick VisuMZ_2_QuestSystem.** Disable `CGMZ_QuestSystem` and `Galv_QuestLog` in Plugin Manager.

Rationale:
- Same suite as MainMenuCore → designed to interoperate, zero conflict surface.
- Supports text codes — quest names/descriptions can be authored as `{quest_001_name}` and resolve through KB_Localization at render.
- Categories + objectives + rewards + variables: enough for both main story and side quests.
- Quest authoring template will be added to `docs/spec/quest-authoring.md` (separate spec, follow-up task).

Translation flow:
```
Plugin param (quest title): {quest_001_name}
        ↓
KB_Localization resolves at render
        ↓
locales/vi/Quest.csv:  quest_001_name;Sứ Mệnh Khởi Đầu
locales/en/Quest.csv:  quest_001_name;The Calling
```

## Asset checklist

Created under `img/system/` (or reuse from battle UI where indicated):

- `menu_ink_icon_item.png` … `menu_ink_icon_quit.png` — 9 ink-blot command icons, ~48×48 px each
- `menu_seal.png` — small bottom-left corner stamp, ~64×64 px
- `menu_paper_bg.png` — paper texture, full-screen, low-contrast
- `menu_card_parchment.png` — actor card background (reuse from battle UI)
- `menu_underline_brush.png` — selection brushstroke, ~280×16 px

The atmospheric panel uses no asset — generated at runtime from the current map.

## Risk register

| Risk | Likelihood | Status |
|------|------------|--------|
| VisuMZ MainMenuCore param schema changes between versions | Low | ✓ Mitigated (v0.6.0+) |
| Ink filter on the atmospheric panel costs frame budget | Medium | ✓ Mitigated (cached, rendered once on open) |
| KB_BongToiGauge / KB_NgocHonState API not stable | Low | ✓ Mitigated (v0.4.1+ uses placeGauge chain hook) |
| `{key}` localization codes not parsed inside VisuMZ plugin params | Medium | ✓ Confirmed working (v0.6.2+) |
| Three quest plugins active simultaneously cause unhandled scene push | Low | ✓ Resolved (CGMZ_QuestSystem + Galv_QuestLog disabled) |
| MainMenuCore no-op handler gate causes Journal freeze | Resolved | ✓ Fixed in v0.6.4 (handlers now unconditional) |

## Implementation plan

Sequenced for safe rollout. Each step ends in a runnable state.

1. **Plugin cleanup** — Disable `CGMZ_QuestSystem`, `Galv_QuestLog`, `DKTools`, `DKTools_Localization` in Plugin Manager. Boot game, verify title screen still works. ✅ Done 2026-05-26
2. **Localization CSV** — Create `locales/vi/Menu.csv` and `locales/en/Menu.csv` with the 9 menu keys. Register `Menu` in KB_Localization params. ✅ Done 2026-05-26
3. **VisuMZ MainMenuCore config** — Set command list, hide stock status window, disable snapshot background. Boot menu, verify command labels render from CSV. ✅ Done 2026-05-26
4. **KB_MainMenuVisual skeleton** — Create the plugin file with empty `KB_MenuHeader`, `KB_MenuAtmosphereLayer`, `KB_MenuCommandWindow`, `KB_MenuPartyColumn`. Wire `Scene_Menu.create` alias. Boot, verify no crashes. ✅ Done 2026-05-26 (v0.1)
5. **Command column polish** — Ink-blot icons, brushstroke selection, slide-in animation. ✅ Done 2026-05-26 (v0.2)
6. **Atmospheric panel** — Map tilemap snapshot + PIXI filter chain + caching. Verify on 3 different maps. ✅ Done 2026-05-26 (v0.3)
7. **Party column** — Actor cards with HP/MP. Verify with single-actor party and full 3-actor party. ✅ Done 2026-05-26 (v0.4)
8. **Gauge integration** — Hook KB_BongToiGauge + KB_NgocHonState into actor cards. Verify gauges update when values change. ✅ Done 2026-05-26 (v0.4.1–v0.4.4)
9. **Header band + menu button hint** — Location name, playtime, gold + Lượng unit. Centered bottom hint (`[Z] Chọn  [X] Hồi`). ✅ Done 2026-05-26 (v0.5.0–v0.6.14). **v0.6.6**: header right padding clears the top-right cancel button dynamically. **v0.6.7**: hint extended from Scene_Menu to all Scene_MenuBase subclasses. **v0.6.8**: scene-aware hint entries — prepends `Q/W: Đổi Người` on Scene_Skill/Equip/Status/ClassChange (party ≥ 2), `Q/W: Đổi Loại` on Scene_Item/Shop. Two new locale keys: `menu_hint_switch_actor`, `menu_hint_switch_category`. **v0.6.10**: `Scene_MenuBase.mainAreaHeight` capped to prevent content overlapping hint. **v0.6.11**: iteration on Scene_Status DP-clipping — `Scene_Status.statusWindowRect` height cap + `Window_Status.drawActorClass` subclass override (attempted but was shadowed by VisuMZ_1_ElementStatusCore). **v0.6.12**: discovered ElementStatusCore's Window_StatusData renders the General tab; drawText interception for class styling. **v0.6.13**: class hook corrected from drawText → drawTextEx (ElementStatusCore calls drawTextEx, which resets fontSize; bypassed by calling drawText directly on contents). DP suppression reverted per user preference; DP now visible at Scene_Status bottom edge with partial clipping caveat. Future cleaner fix (DrawJS patch) deferred pending user opt-in. **v0.6.14**: class subtitle bypass now pipes text through `KBLocalization.process()` to resolve placeholder keys (e.g., `{classStudent}` → "Sinh Viên"), restoring proper Vietnamese labels in Scene_Status General tab.
10. **Journal hub scene** — Create `Scene_KBJournal` + `Window_KBJournalCommand` (4 commands: **Hành Trình** / **Quái Phổ** / **Nhiệm Vụ** / **Truyền Thuyết**). Wire `menu_cmd_journal` to push this scene. Locale keys `journal_scene_title`, `journal_cmd_story`, `journal_cmd_bestiary`, `journal_cmd_quest`, `journal_cmd_lore`. Window sized to `calcWindowHeight(4)`. Title sprite anchored off command window resting Y. ✅ Done 2026-05-26 (v0.6.0 → v0.6.5).
11. **Quest authoring** — Wire `journal_cmd_quest` → VisuMZ_2_QuestSystem. Author one sample quest using `{quest_*}` keys to validate the translation flow end-to-end.
12. **Encyclopedia wiring** — Wire `journal_cmd_story` (Hành Trình), `journal_cmd_bestiary` (Quái Phổ), and `journal_cmd_lore` (Truyền Thuyết) → CGMZ_Encyclopedia (category pre-select). Add Journey, Monster Book, and Legends category configs in CGMZ_Encyclopedia plugin params (3 categories total). Author one sample entry in each category and confirm auto-registered bestiary kill.
13. **Fast travel wiring** — Wire `menu_cmd_map` to CGMZ_FastTravel scene.
14. **QA pass** — Test menu open/close across maps, in/out of battle preludes, with party size 1/2/3. Log any regressions to `docs/qc/`.

Each step is independent enough to commit on its own.

## Decisions log

All four prior open questions resolved 2026-05-26:

| Question | Decision |
|----------|----------|
| Quit label | **Rời Đi** (plain Vietnamese kept over "Hồi Gia" 回家) |
| Skill label | **Kỹ Năng** (user picked everyday-legible Hán Việt over more literary "Pháp Thuật"/"Thần Thuật") |
| Journal structure | **Hub model**: Nhật Ký is a parent scene containing Hồi Ký (Story Log), Yêu Phổ (Monster Book), Nhiệm Vụ (Quest Log) |
| Location names source | Reuse existing `Map*_*.csv` files (current pattern); no new locations CSV |

## Future open questions

- Lore (Hồi Ký) entry data model: written-up beats per chapter, unlocked by chapter-clear switches, or finer-grained event-driven unlocks? Resolve when authoring first Lore entry (step 12).
- Bestiary (Yêu Phổ) entry richness: name + sprite + flavor text, or full stat block + drops + weaknesses? Resolve when first monster is added (step 12).
