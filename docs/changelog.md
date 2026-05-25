# Changelog

Append-only. Newest entries on top. Format: `YYYY-MM-DD — short summary`.

## 2026-05-25 — Bóng Tối Gauge: identify Hải's window via placeGauge (v1.4)

- Live diagnostics revealed VisuMZ_3_SideviewBattleUI does NOT store the actor on `Window_SideviewUiBattleStatus._actor` (all 4 instances report `_actor: undefined`). v1.3's finder relied on that field and matched nothing, leaving the overlay invisible.
- v1.4 reintroduces a tiny `placeGauge` hook whose sole job is to remember which window VisuMZ called `placeGauge(haiActor, ...)` on. The overlay's position-tracking in `Scene_Battle.update` now reads `scene._kbHaiWindow` (set by the hook) instead of probing window fields.
- The gauge is still rendered as a scene-level overlay (not added inside the window) so the v1.2 clipping issue does not return.

## 2026-05-25 — KB_Localization v2.7: path fix + shared CSVs

- **Root cause of the missing-CSV warnings and unresolved `{thuytinh}` etc.**: line 165 of KB_Localization built URLs as `data/${dataRootFolder}/${locale}/${fileName}`, hardcoding a `data/` prefix on top of the configured root. The user's `Data Root Folder: locales` therefore resolved to `data/locales/`, but the actual CSV files live at project-root `locales/` (matching CLAUDE.md's spec).
- Dropped the `data/` prefix. The plugin now respects `Data Root Folder` verbatim — `locales` means `locales/`.
- Added new param `Shared Files` (default `main, title, charactor`) for top-level multi-column CSVs (`tag;en;vi;…` format). One XHR per locale fires for each shared file; `parseCSV()` already picks the matching column. This is what makes `{thuytinh}` → "Giang Hải" resolve, since the mapping lives in `locales/charactor.csv` at the root, not in any per-locale folder.
- Updated help block to reflect the actual layout (project-root `locales/`, not `data/locales/`).
- File migration: copied `Quest.csv` (vi+en) and `General.csv` (en) from `data/locales/` into `locales/` since they were missing there. `data/locales/` left intact for now; can be deleted once the user confirms the new path works.
- Known leftover: `Exported_Text.csv` is in the user's `Data Files` param but doesn't exist anywhere — plugin will keep logging a warning until removed from Plugin Manager.

## 2026-05-25 — Bóng Tối Gauge: scene-level overlay (v1.3)

- v1.2 confirmed via live diagnostics: gauge sprite WAS created (attached to `Window_SideviewUiBattleStatus` for Hải, visible=true, x=78, y=100), but the host window's height is 105 and contains a mask — so the gauge at y=100 with height=32 was clipped out of view.
- v1.3 abandons in-window placement entirely. The gauge is now a `Scene_Battle` child sprite (no window mask), repositioned each frame to track Hải's `Window_SideviewUiBattleStatus` via the new `_kbFindHaiStatusWindow` helper. Opacity follows the panel's opacity so fade-in/out animations stay in sync.
- New params: `gaugeWidth` (default 160), `gaugeOffsetX` (relative to Hải's window left), `gaugeOffsetY` (relative to Hải's window bottom; positive = below).
- Bitmap width now comes from `P.gaugeWidth` via `bitmapWidth()` override — overlay is no longer bound to the 105px window.

## 2026-05-25 — Bóng Tối Gauge: hook on placeGauge (v1.2)

- v1.1's placeBasicGauges hook never fired in actual battles — confirmed VisuMZ_3_SideviewBattleUI bypasses placeBasicGauges entirely (0 references in the plugin) and calls the lower-level `placeGauge` directly per gauge type.
- Switched the hook to `Window_StatusBase.prototype.placeGauge`. Fires once per hp/mp/tp call; we track the deepest y seen for the actor and append the BT gauge one `gaugeLineHeight` below it after the "last" type ("tp" if optDisplayTp, else "mp").
- Catches both default `Window_BattleStatus` (which still goes through placeGauge under the hood) and VisuMZ Sideview Battle UI.

## 2026-05-25 — KB_TitleCommands v2.8 (safe fixes)

Functional bugs only — structure untouched, behavior preserved.

- Fixed `@base KB_Core` annotation + `Imported.KB_Core` check → `KB_CoreEngine` (real plugin name). Removes the spurious "base plugin missing" warning on every boot.
- Fixed three `for (i = 0; …)` loops that were leaking `window.i` every frame in title-screen update paths (`createTitlePictureCommands`, `checkTPicCom`, `updateTComMouseIsOnPic`). Would collide with any other script using a bare `i`.
- Guarded `TpictureCom.getData()` against null `_orgXY` — happens when a title menu has 7+ entries but only 6 `Command Pos N` params are defined. Now warns + hides instead of crashing the title.
- Null-checked `_backSprite1/_backSprite2` before assigning bitmaps in `changeBackgroundsToPhase2` (defensive — if another plugin removes the back sprites, we no-op instead of throwing).
- Not addressed (deferred): KB namespace pollution, missing IIFE, stringly-typed booleans, dead `z` assignments — flagged but kept for a future pass.

## 2026-05-25 — Bóng Tối Gauge UI: real gauge sprite (v1.1)

- `KB_BongToiGauge` bumped to v1.1. The v1.0 implementation hooked `Window_StatusBase.prototype.drawActorName` to append `[BT:X/100]` to Hải's name — but `VisuMZ_3_SideviewBattleUI` replaces the default battle status window with sprite-based name rendering, so the suffix never appeared in actual battles.
- Replaced the text-suffix hook with `Sprite_KBBongToiGauge`, a `Sprite_Gauge` subclass whose `currentValue()` / `currentMaxValue()` read from `KB.BongToi`. Gauge colors shift from purple → orange → red as fill approaches max.
- The gauge is placed via `Window_StatusBase.prototype.placeBasicGauges` (core RMMZ, not affected by VisuMZ's minification). It sits one `gaugeLineHeight` below TP for Hải only, in `Scene_Battle` only.
- This works for both the default `Window_BattleStatus` and VisuMZ's `Window_SideviewUiBattleStatus` since both extend `Window_StatusBase`.
- `plugins.js` retains a cached "(v1.0)" description string — will refresh next time the user saves Plugin Manager; not load-blocking.

## 2026-05-25 — Ngọc Hồn convergence system

- Built `js/plugins/KB_NgocHonState.js` (v1.0). Custom plugin that:
  - Watches the 3 shard switches (`ngochon_son`/`thuy`/`phong` = ids 29/30/31)
  - Keeps `ngochon_count` (var 23) synced with the number of switches ON (0..3)
  - On all-3-ON convergence: removes a configured key item, adds a configured accessory armor, auto-equips on a configured actor/slot, plays optional SE, reserves an optional Common Event
  - Idempotent — runs the convergence chain once, gated by an optional "done" switch
  - Catch-up check on `Scene_Map.start` (handles savefiles where switches were flipped before the plugin was active)
  - Plugin commands: CollectShard, SetShard, ForceConvergence, ResetAll (debug), CheckNow
  - Pure `$gameSwitches` + `$gameVariables` state — save/load is automatic
- **Wiring still TODO**: create the Ngọc Hồn key item (Items.json) and Ngọc Hồn accessory (Armors.json), then set `keyItemId` / `accessoryArmorId` / `autoEquipActorId` / `convergenceCommonEventId` params in the Plugin Manager. Plugin no-ops on unconfigured IDs so it's safe to enable now and wire later.

## 2026-05-25 — Bóng Tối Gauge system (Hải's signature mechanic)

- Built `js/plugins/KB_BongToiGauge.js` (v1.0). Custom plugin that:
  - Reads `<bongtoi: +N>` / `<bongtoi: reset>` notetags from skills, items, states
  - Auto-fills when Hải's HP < 30% (configurable)
  - Applies overflow state when gauge ≥ 100, then resets
  - Renders `[BT:X/100]` next to Hải's name in Battle Status (color-shifts near max)
  - Plugin commands: SetGauge, AddGauge, ResetGauge, TriggerOverflow
  - Save/load via standard `$gameVariables` (no custom save logic needed)
- Added 2 skills (data/Skills.json):
  - `id=490` Long Vương Chi Nộ — Water-element single-enemy attack, 300+2.5×MAT, MP 15. Notetag `<bongtoi: +30>`. Hải's signature damage skill that nourishes the darkness.
  - `id=491` Tĩnh Tâm — Self-heal (HP recover formula + 30 MP), MP 10, scope=self. Notetag `<bongtoi: reset>`. Hải's cleansing skill.
- Added 1 state (data/States.json):
  - `id=28` Bóng Tối Bùng Phát — 1 turn, restriction=2 (attacks anyone including allies), +20% ATK while raging.
- Updated class 12 (Thuỷ Thần) learnings: Long Vương Chi Nộ at level 5, Tĩnh Tâm at level 8.
- Added locale keys (`locales/main.csv`): `skill_LongVuongChiNo`, `skill_TinhTam`, `state_BongToiOverflow`.
- Backups: `data/{Skills,States,Classes}.json.bak-bongtoi`.

## 2026-05-25 — Foundation pass

- Discovered that the existing project's i18n keys `{sontinh}` and `{thuytinh}` refer to the **students** (Tuấn / "Tùng Long"), not the gods. The prologue dialogue on Map 3 already has 3 students entering the shrine — Actor 1 (Tuấn), Actor 2 (Mỵ Nương), Actor 3 (Hải).
- **D2 resolved (revised approach)**: instead of adding new actor IDs 4/5/6, *reclassed* the existing slots. This preserves all map / locale / switch references.
  - Actor 1 (Tuấn) classId 1 (Swordsman) → 11 (Sơn Thần, new class)
  - Actor 3 (Hải) classId 10 (Student) → 12 (Thủy Thần, new class)
  - Actor 4 ("tesst" placeholder) → Ngọc Hoa, classId 13 (Tiên, new class)
- Added 3 new classes (Sơn Thần / Thủy Thần / Tiên) based on Swordsman / Sorcerer / Priest templates with element-appropriate stat scaling. Skill learnings inherited from templates as starter pool — to be customized per GDD §6.
- Updated `System.json`:
  - `gameTitle` → "Sơn Thuỷ Ký" (was empty)
  - `locale` → `vi_VN` (was `en_US`)
  - `partyMembers` → `[1, 3, 4]` (was `[1]`)
  - Added 13 game-state switches: `chapter_p_clear` through `chapter_5_clear`, `hoa_in_party`, `ngochon_son/thuy/phong`, `bongtoi_overflow`, `tinh_tam_doubled`
  - Added 6 game-state variables: `current_chapter`, `bongtoi_gauge`, `ngochon_count`, `reputation_total`, `sach_uoc_uses_chapter`, `moral_total`
- Updated `locales/charactor.csv`:
  - `thuytinh` display name "Tùng Long" → "Giang Hải" (per GDD v3 — Hải, not Tùng Long)
  - Added new keys: `hoa` → "Ngọc Hoa", `caobien` → "Cao Biền"
  - `tieumi` kept (older character, may still be referenced elsewhere)
- Updated `locales/main.csv`:
  - Added class name keys: `classSonThan`, `classThuyThan`, `classTien`
  - Set `classStudent` English text to "Student" (was placeholder)
- Cleanup: moved orphan `EventSensorMZ.js  copy` (no matching twin, not in manifest) to `js/plugins/_archive/EventSensorMZ.js`.
- Backups created: `data/Classes.json.bak-foundation`, `data/Actors.json.bak-foundation`, `data/System.json.bak-foundation`.

## 2026-05-25 — Project bootstrap

- Bootstrapped `docs/` folder: CLAUDE.md, tasks.md, design.md, glossary.md, proposal.md, changelog.md, spec/audit-v1.md, qc/.
- Completed initial audit of project state vs. GDD v3 (see `docs/spec/audit-v1.md`).
- Decision: stay on RPG Maker MZ; RPG Maker Unite considered and rejected (see `docs/proposal.md`).
