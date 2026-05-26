# Main Menu (KB_MainMenuVisual v1.0 — planned)

## Overview

In-game pause menu redesign for Sơn Thuỷ Ký. Replaces the default RPG Maker MZ menu with a sumi-e (山水 ink-wash) aesthetic that matches the game's mythological Văn Lang setting. Surfaces the project's custom systems (Bóng Tối Gauge, Ngọc Hồn) and ships with a full Hán Việt command vocabulary.

- **File:** `js/plugins/KB_MainMenuVisual.js` (to be created)
- **Dependencies:** KB_CoreEngine, KB_Localization, VisuMZ_0_CoreEngine, VisuMZ_1_MainMenuCore
- **Optional integrations:** KB_BongToiGauge, KB_NgocHonState, VisuMZ_2_QuestSystem, CGMZ_FastTravel
- **Status:** Spec, not yet implemented
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

### Header band

- Height: `sy(64)`
- Left: game title + current location name (from `$gameMap.displayName()` or per-map override via localization)
- Right: playtime (`$gameSystem.playtimeText()`) + gold with `Lượng` unit
- Style: thin ink-painted divider line below, no solid background — paper texture shows through

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
  - HP gauge + numeric (label: `HP`, English)
  - MP gauge + numeric (label: `MP`, English)
  - **Bóng Tối** gauge (when KB_BongToiGauge is enabled)
  - **Ngọc Hồn** state indicator (when KB_NgocHonState is enabled)
- Card style: parchment background (reuse `img/system/parchment_*.png` from battle UI for consistency)

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

The Nhật Ký command opens a **hub scene**, not a single sub-screen. The hub shows three options that route to existing plugin scenes. This keeps narrative content (Story Log), bestiary (Monster Book), and active goals (Quest Log) under one mental category for the player while letting each subsystem stay on its specialist plugin.

```
        Main Menu
            │
       [Nhật Ký]
            ▼
   ┌────────────────────────────────────┐
   │   Nhật Ký                          │
   ├────────────────────────────────────┤
   │  ⬢ Hồi Ký        (Story Log)       │ ──► CGMZ_Encyclopedia (Lore category)
   │  ⬢ Yêu Phổ       (Monster Book)    │ ──► CGMZ_Encyclopedia (Bestiary category)
   │  ⬢ Nhiệm Vụ      (Quest Log)       │ ──► VisuMZ_2_QuestSystem (Scene_Quest)
   └────────────────────────────────────┘
```

### Hub commands

| Order | Localization key | Vietnamese (Hán Việt) | Etymology | Action |
|-------|------------------|------------------------|-----------|--------|
| 1 | `journal_cmd_story` | Hồi Ký | 回記 — "memoir / recollection" | Open CGMZ_Encyclopedia, jump to Lore/Story category |
| 2 | `journal_cmd_bestiary` | Yêu Phổ | 妖譜 — "register of monsters / yokai" | Open CGMZ_Encyclopedia, jump to Bestiary category |
| 3 | `journal_cmd_quest` | Nhiệm Vụ | 任務 | Open VisuMZ_2_QuestSystem Scene_Quest |

### Hub scene architecture

- New class: **`Scene_KBJournal`** (subclass of `Scene_MenuBase`)
- Window: **`Window_KBJournalCommand`** — 3 vertical commands, parchment background, brushstroke selection underline (same visual language as main menu command column)
- Handlers push to the respective specialist scene via `SceneManager.push(...)`; on return, pop back to `Scene_KBJournal` (so the player can switch between sub-views without going through the main menu)
- Cancel returns to `Scene_Menu`

### CGMZ_Encyclopedia integration

CGMZ_Encyclopedia supports multiple categories (Bestiary, Items, Lore, etc.). For the journal hub:

- Use the plugin's existing `SceneManager.push(CGMZ_Scene_Encyclopedia)` with a pre-selected category. If direct category-jump isn't supported, wrap with a small alias that sets the initial category index before the scene paints.
- Configure two categories in CGMZ_Encyclopedia plugin params: `Bestiary` (for Yêu Phổ) and `Lore` (for Hồi Ký).
- Lore category data: written-up story beats unlocked by switch flips on chapter completion (`chapter_p_clear`, `chapter_1_clear`, etc.). Each lore entry has a localization key for title + body.
- Bestiary category data: monsters auto-register on first kill (CGMZ default behavior).

**This is a follow-up build** — KB_Journal scene is part of the main menu build, but Lore data authoring + Bestiary configuration are tracked separately.

## Localization integration

Create `locales/vi/Menu.csv` (and `locales/en/Menu.csv`) with:

```csv
Key;vi
menu_cmd_item;Vật Phẩm
menu_cmd_skill;Kỹ Năng
menu_cmd_equip;Trang Bị
menu_cmd_status;Trạng Thái
menu_cmd_formation;Đội Hình
menu_cmd_journal;Nhật Ký
menu_cmd_map;Bản Đồ
menu_cmd_options;Thiết Đặt
menu_cmd_save;Save
menu_cmd_quit;Rời Đi
menu_unit_gold;Lượng
journal_cmd_story;Hồi Ký
journal_cmd_bestiary;Yêu Phổ
journal_cmd_quest;Nhiệm Vụ
```

Register `Menu` in KB_Localization plugin params (`Data Files`).

In `KB_MainMenuVisual.js`, fetch labels via `KB_Localization.getText('menu_cmd_item')` etc. when building Window_MenuCommand.

## Architecture (planned)

### Core classes

| Class | Purpose |
|-------|---------|
| **KB_MenuHeader** | Top band: title + location + playtime + gold. Refreshes on open. |
| **KB_MenuAtmosphereLayer** | Renders desaturated ink-wash of current map tilemap into a cached `Bitmap`; PIXI filter chain (Desaturate → Grain → Vignette). Cache key = `$gameMap.mapId()`. |
| **KB_MenuCommandWindow** | Extends `Window_MenuCommand`; ink-blot icons via `drawIcon` overrides; cinnabar brushstroke selection underline replaces default cursor; slide-in animation on `open()`. |
| **KB_ActorCardMenu** | Same parchment card style as battle UI's `KB_ActorCard`, adapted for taller vertical layout; HP/MP/BT/Ngọc Hồn drawing delegated to existing helpers in KB_BongToiGauge / KB_NgocHonState. |
| **KB_MenuPartyColumn** | Container; spawns one `KB_ActorCardMenu` per `$gameParty.battleMembers()`, vertical stack. |
| **Scene_KBJournal** | Hub scene for the Nhật Ký command. Hosts `Window_KBJournalCommand` with 3 entries (Hồi Ký, Yêu Phổ, Nhiệm Vụ); handlers push to CGMZ_Encyclopedia or VisuMZ_2_QuestSystem scenes. Cancel returns to Scene_Menu. |
| **Window_KBJournalCommand** | 3-item vertical command window inside Scene_KBJournal. Same parchment + brushstroke selection styling as the main command column. |

### VisuMZ_1_MainMenuCore integration

Use these MainMenuCore hooks (no core overrides):

- **Command order / list:** plugin param `Main Menu Categories` → set to the 9 commands above with their localization-keyed labels.
- **Custom command handlers:** plugin params `Custom Cmd 1..N` → wire entries 5 (Journal), 6 (Map), 8 (Save) to their respective scenes via JS code blocks calling `SceneManager.push(...)`.
- **Layout override:** plugin param `Status Graphic` → `none` (we draw our own); plugin param `Status Window JS > Window Width/Height` → 0 (hide stock status window).
- **Background:** plugin param `Background Settings > Snapshot` → false; we render our own background via `Scene_Menu.prototype.createBackground` extended in our plugin.
- **Inject custom layers:** override `Scene_Menu.prototype.create` via `Window_MenuCommand` is too aggressive — instead use `VisuMZ.MainMenuCore.Settings` and add an aliased `Scene_Menu.create` that calls the original then adds `KB_MenuHeader`, `KB_MenuAtmosphereLayer`, `KB_MenuPartyColumn`. All additions are children of `this._windowLayer`'s parent so they layer correctly.

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

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| VisuMZ MainMenuCore param schema changes between versions | Low | Pin to current VisuMZ version in `docs/spec/main-menu.md`; track in changelog |
| Ink filter on the atmospheric panel costs frame budget | Medium | Render once on menu open, cache to Bitmap, dispose on close — never re-filter per frame |
| KB_BongToiGauge / KB_NgocHonState API not stable | Low | Lift gauge draw into KB_MainMenuVisual via the same helpers used in battle UI; if helpers absent, gauges degrade gracefully (omit, don't crash) |
| `{key}` localization codes not parsed inside VisuMZ plugin params | Medium | Verify with one test quest before wiring all quests; fallback: pre-resolve in JS code block on plugin init |
| Three quest plugins active simultaneously cause unhandled scene push | High if not addressed | First implementation step: disable CGMZ_QuestSystem + Galv_QuestLog in Plugin Manager and verify boot |

## Implementation plan

Sequenced for safe rollout. Each step ends in a runnable state.

1. **Plugin cleanup** — Disable `CGMZ_QuestSystem`, `Galv_QuestLog`, `DKTools`, `DKTools_Localization` in Plugin Manager. Boot game, verify title screen still works.
2. **Localization CSV** — Create `locales/vi/Menu.csv` and `locales/en/Menu.csv` with the 9 menu keys. Register `Menu` in KB_Localization params.
3. **VisuMZ MainMenuCore config** — Set command list, hide stock status window, disable snapshot background. Boot menu, verify command labels render from CSV.
4. **KB_MainMenuVisual skeleton** — Create the plugin file with empty `KB_MenuHeader`, `KB_MenuAtmosphereLayer`, `KB_MenuCommandWindow`, `KB_MenuPartyColumn`. Wire `Scene_Menu.create` alias. Boot, verify no crashes.
5. **Command column polish** — Ink-blot icons, brushstroke selection, slide-in animation.
6. **Atmospheric panel** — Map tilemap snapshot + PIXI filter chain + caching. Verify on 3 different maps.
7. **Party column** — Actor cards with HP/MP. Verify with single-actor party and full 3-actor party.
8. **Gauge integration** — Hook KB_BongToiGauge + KB_NgocHonState into actor cards. Verify gauges update when values change.
9. **Header band** — Location name, playtime, gold + Lượng unit.
10. **Journal hub scene** — Create `Scene_KBJournal` + `Window_KBJournalCommand` (3 commands: Hồi Ký / Yêu Phổ / Nhiệm Vụ). Wire `menu_cmd_journal` to push this scene.
11. **Quest authoring** — Wire `journal_cmd_quest` → VisuMZ_2_QuestSystem. Author one sample quest using `{quest_*}` keys to validate the translation flow end-to-end.
12. **Encyclopedia wiring** — Wire `journal_cmd_story` and `journal_cmd_bestiary` → CGMZ_Encyclopedia (category pre-select). Add Lore and Bestiary category configs in CGMZ_Encyclopedia plugin params. Author one sample Lore entry and confirm one auto-registered bestiary kill.
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
