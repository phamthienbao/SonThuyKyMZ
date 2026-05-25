# Changelog

Append-only. Newest entries on top. Format: `YYYY-MM-DD — short summary`.

## 2026-05-25 — KB_BongToiGauge v1.5: panel-mode rendering + label refinement

- **New feature — panel-mode rendering (default):** `drawMode: "panel"` renders DP gauge INSIDE Hải's VisuMZ Sideview panel, directly below TP gauge at the same X-position. Gauge inherits the panel's theme (colors, scale, font). Panel gauge is 96px wide (configurable via `panelGaugeWidth` param).
- **Legacy overlay mode retained:** `drawMode: "overlay"` kept as fallback for non-VisuMZ setups or custom layouts. Scene-level overlay renders as before (160px wide, configurable via params). Two width-specialized sprite subclasses: `Sprite_KBBongToiGaugePanel` (96px) and `Sprite_KBBongToiGaugeOverlay` (160px).
- **Hook on Window_StatusBase.prototype.placeGauge:** 
  - (a) Routes `type="kb_bongtoi"` to the correct custom sprite class (Panel or Overlay) instead of default Sprite_Gauge.
  - (b) **Panel mode:** Chains a kb_bongtoi placement whenever VisuMZ places a "tp" gauge for Hải (one gaugeLineHeight below at the same X).
  - (c) **Overlay mode:** Tracks Hải's window position for repositioning the overlay sprite each frame in Scene_Battle.update.
- **Label changed from "BT" to "DP":** More intuitive label for "Dark Point" gauge. Configurable via new `label` param (default "DP").
- **New params:** `drawMode` (select: "panel" | "overlay", default "panel"), `label` (string, default "DP"), `panelGaugeWidth` (number, default 96), `panelGaugeOffsetX` (number, default 0), `panelGaugeOffsetY` (number, default 0).
- **Removed:** Dead `Game_System.initialize` alias (was inert in v1.4).
- **Public API unchanged:** KB.BongToi.get/set/add/reset/triggerOverflow, plugin commands (SetGauge/AddGauge/ResetGauge/TriggerOverflow), notetags (`<bongtoi: +N>`, `<bongtoi: reset>`).
- **Status:** v1.5, active. Compatible with VisuMZ_1_BattleCore and KB_SideViewBattleUI v3.1+. See `docs/spec/battle-ui.md` for integration details.

## 2026-05-25 — KB_SideViewBattleUI v3.1: audit-fix release — correctness + polish

- **Cursor method fix:** v3.0 used `_refreshCursor` (underscore prefix) which is not a real MZ method; cursor override never ran. v3.1 uses the correct `refreshCursor` and calls `setCursorRect(0, 0, 0, 0)` to actually hide the default cursor sprite.
- **Selection layer fix:** Selection band now drawn on `contentsBack` (MZ standard per-item background layer) instead of `contents`. Matches MZ convention; band no longer fights with the text layer.
- **Clear both layers:** `paint()` now clears both `contents` and `contentsBack` to prevent selection-band trails during rapid cursor movement.
- **Command slide animation rewritten:** Animates `this.x` (window root) with cubic-out easing instead of shifting `_clientArea.y`. The previous approach desynced the PIXI mask aligned to `_clientArea`. New "Command Slide Distance" param (default 32 px) makes the slide path configurable.
- **Frame base scale cached on load:** Previously recomputed every frame in `update()` including Math.max over bitmap dimensions. Now stored as `_frameBaseScale` once and multiplied by the per-frame pulse factor.
- **Bitmap dirty flag refactor:** All `bmp._baseTexture.update()` calls replaced with `bmp._setDirty()` — MZ-idiomatic, batched via the engine's update loop.
- **Easing functions:** Added cubic-out helper; applied to command window slide-in and fade-in for smooth "elegant, slow" motion per the reference spec. Linear stepping replaced.
- **BT gauge card-width clamp:** When KB_BongToiGauge sprite attaches inside Hải's card, its `bitmapWidth` is overridden to `cardW - portrait - 16` so the gauge no longer overflows the card boundary.
- **Silent overlay loader:** HEAD-checks each URL via fetch() before calling ImageManager.loadBitmap. Missing files cause no console 404. Result cached in module-level Map; pending loads coalesced via overlayPending Map.
- **HUD X re-centered:** 430 → 392 (for 4 cards × 120 spacing + 135 card width = 495 px total, (1280 − 495) / 2 = 392).
- **Default value refinements:**
  - Body Font Size: 22 → 14 (was wrong in v3.0 — body should be smaller than header 16px)
  - Command Font Size: 22 → 20 (refined for 24-px item height)
  - Panel Opacity: 220 → 180 (more transparent, closer to reference)
  - Panel Color alpha: 0.78 → 0.72
  - Selection Color: rgba(180,145,100,0.9) → rgba(212,180,100,0.9) (more golden)
- **New param:** Command Slide Distance (default 32 px)
- **Status:** v3.1, active. See `docs/spec/battle-ui.md` for updated behavior.

## 2026-05-25 — KB_SideViewBattleUI v3.0: reference-matched proportional scaling refinement

- **Design target — 1280x720 with proportional scaling:** All UI positions now reference a 1280×720 design canvas (via ResolutionWidth/ResolutionHeight params). New `sx()` and `sy()` helpers scale all coordinates proportionally to the actual Graphics.boxWidth/Height, enabling pixel-perfect layouts on any resolution without hardcoding screen dimensions.
- **Actor formation presets:** New "Actor Formation Preset" param (Classic | Vertical | ReferenceLayout, default ReferenceLayout). Each preset defines positioning:
  - **Classic:** Uses original setActorHome (v1.0 behavior).
  - **Vertical:** Stacks actors at x=900 with y stepping by 90px.
  - **ReferenceLayout:** Per-actor X/Y params (Actor1 900/320, Actor2 960/390, Actor3 1010/470, Actor4 1060/540). Recommended for cinematic layouts.
- **HUD repositioning — bottom-center anchor:** HUD X=430, HUD Y=615, Spacing=120 (new defaults). Cards now sit prominently at the bottom-center of the screen with tighter spacing.
- **Card refinement — 135×90 with diamond portrait:** Card dimensions reduced to 135×90. Portrait diamond shrunk to 64px. New HUD Hover Amplitude param (default 1.5px) — KB_BattleHUD bobs vertically via sine wave on Graphics.frameCount in update().
- **Low HP state — portrait tint:** New KB_ActorCard.update() detects hp/mhp ≤ 0.25 and tweens a red tint (rgba(220,50,50,0.35)) over the diamond portrait with 12% lerp per frame. New "Low HP Tint" param.
- **Color separation — HP white, MP light blue:** Separate HP Color (white) and MP Color (light blue, default #A0D8F0) params. Cards display both stats side-by-side with proper contrast.
- **Diamond frame asset — graceful fallback:** New "Diamond Frame Asset" param. Plugin loads img/system/battleui/<asset>.png; if present, renders as frame overlay scaled to portrait+8. If missing, falls back to programmatic diamond outline. Same for "Description Brush Asset" (soft_brush.png) — if missing, renders horizontal gradient.
- **Command window refinement — slide+fade entrance with gold selection:** New position params: Command X (930), Command Y (565), Width (170), Height (130). Item height reduced to 24. Slide entrance over "Command Slide Frames" frames (default 15); _clientArea.y shifts contents upward as ContentsOpacity tweens 0→255. Selection band paints gold text outline (rgba(255,200,120,0.85), width 3). Soft shadow halo inside contents via radial gradient (Panel Shadow Color rgba(0,0,0,0.35)).
- **Description window — bottom-left, uppercase header, soft fade:** Position: X=0, Y=590, 420×130. Header renders uppercase in gold-beige (#D4B57A, new "Header Color" param). Body text white via drawTextEx (multi-line). Soft fade on text changes via Description Fade Frames (default 12) — setText() resets _fadeTarget so text fades out, refreshes, fades back in.
- **Decoration layer defaults — circle + shadow:** KB_BattleDecorationLayer default Overlay Images now ["circle_overlay,1080,520,200","corner_shadow,0,560,220"]. Assets render only if files exist; missing files silently skipped and cached in module-level overlayCache Map.
- **Animation speed multiplier — global timing control:** New "Animation Speed" param (default 1.0, range 0.1–4.0). Influences pulse phase (0.06 × ANIM_SPEED / frame), hover timing, slide/fade durations via the dur(frames) helper. Active actor: scale 1→1.05, glow opacity 140→230. Inactive actor: glow fades −10/frame, scale lerps −0.015/frame, portrait dims 255→240.
- **Class renames (ES6 consistency):** Sprite_ActorCard, Sprite_BattleHUD, Sprite_BattleOverlay → KB_ActorCard, KB_BattleHUD, KB_BattleDecorationLayer. Window_ModernActorCommand, Window_ModernPartyCommand, Window_ModernDescription → KB_WindowActorCommand, KB_WindowPartyCommand, KB_WindowDescription.
- **Parameter schema — 65 entries (40 functional):** Grouped: Resolution (2) | Actor Formation (9) | HUD (6) | Command Window (6) | Description Window (5) | Typography (5) | Colors (13) | Animation (1) | Overlay/Decoration (4) | Bóng Tối (2). See JS file for canonical list.
- **Status:** v3.0, active. Fully compatible with VisuMZ_1_BattleCore. Spec rewritten to reflect v3.0 architecture. See `docs/spec/battle-ui.md` for full details.

## 2026-05-25 — KB_SideViewBattleUI v2.0: complete architectural rewrite — sprite-based HUD

- **Major rewrite:** Replaced Window_BattleStatus (now hidden with opacity 0, kept for BattleManager compatibility) with a new sprite-based HUD system.
- **New architecture — ES6 classes:**
  - **Sprite_ActorCard** — One card per party member. Renders diamond-shaped portrait (clipped face image), actor name, HP/MP text, active-actor glow (pulse scale + glow alpha), and optional BT gauge as child sprite.
  - **Sprite_BattleHUD** — Container sprite; anchored at HUD X/Y; spawns one card per battle member, spaced by HUD Spacing param. Refreshes on BattleManager.startBattle().
  - **Sprite_BattleOverlay** — Decorative PNG layer. Loads images from Overlay Folder, positioned per image-entry config (filename,x,y,opacity).
  - **Window_ModernActorCommand / Window_ModernPartyCommand** — Replaces standard command windows. Parchment background + border; selection band instead of cursor sprite; slide-in animation on open.
  - **Window_ModernDescription** — Extends Window_Help; parchment background; "DESCRIPTION" label (localized via {battle_description}) above body text.
- **Actor positioning override:** Sprite_Actor.setActorHome uses "Actor Positions" param (string array "x,y" pairs, index-based). Falls back to slanted vertical right-side stack if index out of bounds.
- **Card animation:** Active actor's card pulses glow opacity (120–210) and portrait scale (1.0–1.04) smoothly. Glow fades when actor stops being BattleManager.actor(). Slide-in animation on command window open (80px offset, −8px/frame).
- **BT gauge integration:** Sprite_ActorCard.attachBongToi() attaches KB.BongToi.Sprite as child if actor ID matches Hai Actor ID. KB_BongToiGauge scene overlay is suppressed (via _kbSuppressedByUI flag) when Show BT Inline = true.
- **Text re-render optimization:** Card text (HP/MP) is only redrawn when hp/mp values change, not every frame (guarded by _lastHp/_lastMp cache).
- **Parameters:** Expanded from 30 → 39 params. New groups: Actor Positioning (1), HUD (6), Typography (4, reorganized). Renamed/consolidating param sections for clarity.
  - **New params:** Actor Positions, HUD X/Y/Spacing, Card Width/Height, Portrait Size, Description X/Y/Width/Height/Label, UI Font, Title/Body/Command Font Size, all Colors, Overlay Folder/Images, Hai Actor ID, Show BT Inline.
  - **Deprecated params (v1.x StatusPanel-based):** Status Panel Height/Width/YOffset/FaceSize/GaugeWidth/GaugeHeight — no longer used; HUD system is fully configurable.
- **Compatibility:** VisuMZ_1_BattleCore remains fully compatible. VisuMZ_3_SideviewBattleUI must be disabled (both override same windows).
- **Performance:** Bitmaps created once per sprite; re-painted in place (no per-frame allocation). Overlay loading resilient (missing images log warning, don't crash).
- **Status:** v2.0, active. See `docs/spec/battle-ui.md` for full architecture diagram, class responsibilities, animation timings, and 39-param table.

## 2026-05-25 — KB_SideViewBattleUI v1.2: parchment command panel styling

- **Feature — parchment panel background:** Command windows (PartyCommand, ActorCommand) now render with a light cream parchment aesthetic instead of the standard windowskin frame. Default panel color: rgba(245, 235, 210, 0.82).
- **Feature — selection highlight band:** Replaces the standard cursor sprite with a custom tan/brown background band (default rgba(180, 145, 100, 0.92)) drawn only behind the currently selected item. Unselected items have no background.
- **Visual refinement — text styling:** Commands now render centered (configurable alignment), bold by default, with font size bumped from 22 → 28 for readability on the parchment. Selected text color set to white for contrast; unselected text uses dark brown (#2A1A0A).
- **Styling consistency:** New shared helper `applyKBCommandStyling()` eliminates code duplication between PartyCommand and ActorCommand — both apply the same parchment paint pipeline and text rendering.
- **Technical:** Parchment is painted via overridden `paint()` method (fills parchment rectangle on window contents), then `drawAllItems()` draws command labels, then per-item `drawItemBackground()` paints selection band behind currently focused item. Standard cursor sprite is hidden via `_refreshCursor` override.
- **New params:** `Command Bold` (boolean, default true), `Command Align` (select left|center|right, default center), `Command Panel Color` (rgba string), `Command Selection Color` (rgba string), `Command Selection Text Color` (hex).
- **Changed defaults:** `Command Font Size` 22 → 28, `Command Background` 1 → 2 (transparent + parchment paint), `Command Item Height` 32 → 40.
- **Status:** v1.2, active.

## 2026-05-25 — KB_SideViewBattleUI v1.1: override BattleCore icon-style, fix command window sizing

- **Bug fix — VisuMZ_1_BattleCore's icon-style override:** BattleCore forces `Window_PartyCommand` and `Window_ActorCommand` into "iconText" style (appending icons next to each command label). v1.1 overrides both `.commandStyle()` and `.commandStyleCheck()` to return `'text'`, forcing text-only rendering.
- **Bug fix — command window font too large for panel:** Default `itemHeight` of 36 px and default font size made text crowd together. Reduced `itemHeight` to 32 px; added new "Command Font Size" param (default 22).
- **Bug fix — command window height clipped entries:** v1.0 sized ActorCommand to PANEL_H (144 px) which fit only 4 commands before clipping "Attack". Now sized to fit 6 rows so all commands are visible.
- **Custom drawItem:** Shared implementation between PartyCommand and ActorCommand. Renders label only, right-aligned, using configured font size. Bypasses BattleCore's iconText rendering pipeline entirely.
- **Window positioning:** PartyCommand Y-position adjusted so it sits above the status panel (using Y Offset param).
- **Bug fix — command window background:** Added "Command Background" param (select 0 | 1 | 2, default 1): 0 = full frame, 1 = dimmer (closer to reference screenshots), 2 = transparent. Applied via `setBackgroundType()` in window initialize hook.
- **Localization:** Help Label param updated from "DESCRIPTION" to `{battle_description}` so the localization key is used (already defined in v1.0).
- **New params:** `Command Font Size` (number, default 22), `Command Background` (select 0|1|2, default 1).
- **Status:** v1.1, active.

## 2026-05-25 — KB_SideViewBattleUI v1.0: custom battle layout with inline BT gauge

- **Feature — custom sideview battle layout:** Created `js/plugins/KB_SideViewBattleUI.js` to replace VisuMZ_3_SideviewBattleUI.
- **Layout:** Status panel (horizontal row at bottom-center, face + name + HP/MP/TP gauges) | Command windows (vertical list at bottom-right) | Help/Description (bottom-left with "DESCRIPTION" label) | Item/Skill panels (floating 2-col grid above status row) | Enemy target window (slim header at top-center).
- **BT gauge integration:** For Hải (Actor ID 3, configurable), a 4th gauge (Bóng Tối / BT) appears inline below HP/MP/TP in the status panel, visually consistent with other gauges. Requires KB_BongToiGauge. Other actors show HP/MP/TP only — visual asymmetry is intentional, reinforcing Hải's narrative burden.
- **Technical:** BT gauge is a child of Window_BattleStatus instead of a scene-level overlay. Sprite gauge sizing is guarded by `_kbBattleStatusContext` flag, preventing menu/UI gauge distortion. KB_BongToiGauge's scene overlay is suppressed when inline display is enabled (`_kbSuppressedByUI` flag on overlay sprite).
- **Plugin params:** 21 total, grouped: Status Panel (height, width, Y offset, face size, gauge width/height) | Command Window (width, item height) | Help/Description (width, height, label) | Item/Skill Panel (cols, rows, width) | Bóng Tối (Hải Actor ID, Show BT Inline).
- **Localization:** New key `battle_description` (en: DESCRIPTION, vi: MÔ TẢ) added to `locales/main.csv`.
- **Deferred for v2:** Action header at top (current actor + queued action), decorative corner emblem.
- **Status:** v1.0, active. Fully compatible with VisuMZ_1_BattleCore (loads after).

## 2026-05-25 — KB_SaveCore v1.3: gameplay-snapshot cache hook, empty-slot styling

- **Bug fix — snapshot captured menu instead of gameplay:** v1.2's `captureSnapshotDataUrl()` called `SceneManager.snap()` inside Scene_Save, which captured the menu canvas instead of the active gameplay screen. Root cause: snap() returns the scene's current canvas, not a guaranteed gameplay snapshot.
  - New hook on `SceneManager.snapForBackground` (fires when engine snaps for menu backgrounds) to cache a gameplay snapshot. When the outgoing scene is Scene_Map or Scene_Battle, the snapshot is downscaled + JPEG-encoded and stored in module-level `_kbCachedGameSnapshot`.
  - `captureSnapshotDataUrl()` now prefers a live snap when the current scene IS gameplay (autosave from map/battle) and falls back to the cached snapshot otherwise (manual save from Scene_Save).
  - Extracted shared encoder into `encodeBitmapToJpeg()` (downscale + JPEG + size-cap logic, used by both hook and live-snap path).
  - **Migration note:** Saves created on v1.1/v1.2 have the wrong snapshot (menu image) embedded in `info.snapshot`. They won't auto-correct — re-save to update.
- **Feature — empty save slot styling:** Empty slots now ignore per-type image config and use "Empty Slot Image Type" param (default "title"), so both empty Autosave and empty Manual slots show the title image consistently.
  - New param "Empty Overlay Alpha" (float 0–1, default 0.35) renders a translucent white overlay on empty slots, giving a "unused slot" appearance.
- **New params:** `Empty Slot Image Type` (select: title | icon | custom, default "title"), `Empty Overlay Alpha` (float, default 0.35, range 0–1).
- **Status:** v1.3, active.

## 2026-05-25 — KB_SaveCore v1.2: infinite-refresh hang fix, bitmap caching, snapshot downscaling

- **Bug fix — manual save infinite refresh hang:** v1.1's `drawKBSlotImage` called `Bitmap.load(url)` on every redraw, which creates a fresh bitmap each time (no internal cache). For icon and snapshot types, each new bitmap would trigger `addLoadListener(refresh)` on load, which called refresh → redraw → new bitmap, forming an infinite loop. v1.2 adds a module-level bitmapCache Map (keyed by URL) so the same Bitmap is returned on subsequent calls. The cache applies to 'icon' and 'snapshot' types; 'title' and 'custom' already used ImageManager which caches.
- **Performance fix:** Added `_kbRefreshHooked` flag on each bitmap so `addLoadListener(refresh)` is attached once per bitmap instance, not once per redraw cycle. Prevents listener duplication.
- **Feature — snapshot downscaling:** Snapshot data URLs are now captured onto an offscreen canvas, downscaled to a configurable max width (default 320 px, aspect ratio preserved) before `toDataURL`. This reduces file size and prevents overly large image data.
- **Feature — snapshot size cap:** If the final snapshot data URL exceeds the Snapshot Max DataURL KB limit (default 64 KB), the snapshot is dropped and fallback chain is triggered. This prevents `global.rmmzsave` bloat when storing multiple large snapshots.
- **New params:** `Snapshot Max Width` (default 320), `Snapshot Max DataURL KB` (default 64).
- **Logging:** Added detailed `[KB_SaveCore]` console logs for snapshot capture (final size + capture time ms) and all failure paths (for debugging fallback behavior).
- **Status:** v1.2, active. Resolves the "manual save waiting forever" hang reported in earlier sessions.

## 2026-05-25 — KB_SaveCore v1.1: per-slot image types, snapshot capture, VisuMZ Digit Grouping fix

- **Bug fix:** Timestamp was rendering with thousands separator ("2,026") due to VisuMZ_0_CoreEngine hooking `Window_Base.drawText`. KB_SaveCore now renders timestamps via `Bitmap.drawText` (raw method) which bypasses VisuMZ's Digit Grouping feature.
- **Feature:** Per-slot-type image source. Autosave and Manual Save can now each independently choose image type: `title`, `icon`, `face`, `custom`, or `snapshot`.
- **Feature:** Snapshot capture. If enabled, KB_SaveCore calls `SceneManager.snap()` at save time and stores JPEG data URL in `info.snapshot` with configurable quality (1-100, default 70).
- **Feature:** Fallback chain. If chosen image type is unavailable, plugin auto-falls back: snapshot (if no data) → face (if no face) → title (if no title) → icon. Prevents blank slots.
- **Feature:** Non-face images use centre-crop to square then scale to `Image Size`. Snapshot bitmaps are cached in a module-level Map to avoid redundant reloading.
- **Plugin params:** Replaced `Face Size` with `Image Size` (applies to all image types). Added `AutoSave Image Type`, `AutoSave Custom Image`, `Manual Image Type`, `Manual Custom Image`, `Capture Snapshot`, `Snapshot Quality`.
- **Status:** v1.1, active — VisuMZ_1_SaveCore remains disabled. See `docs/spec/save-system.md` for full params table and fallback logic.

## 2026-05-25 — KB_SaveCore: lightweight save UI replacement (v1.0)

- Created `js/plugins/KB_SaveCore.js` (~250 lines) as a drop-in replacement for VisuMZ_1_SaveCore and CGMZ_SaveFile.
- Layout: face portrait (left) + slot title / map name / playtime / timestamp (right).
- Slot 0 displays as "Autosave" (via `{save_autosave}` key); other slots as "File N" (via `{save_file}` key).
- Timestamp formatted directly with tokens (YYYY/MM/DD HH:mm:ss) — no VisuMZ `{{...}}` wrapper, avoiding conflicts with KB_Localization.
- Map name auto-translated via KBLocalization.process() if locale-specific.
- On load: restores the locale stored in the save file (info.locale).
- Plugin params: Max Save Files, Enable Autosave, Show Map Name/Playtime/Timestamp, Timestamp Format, Autosave/Save labels, Slot Rows/Cols, Face Size.
- Added 2 localization keys to `locales/main.csv`: `save_autosave` (Autosave / Tự Động Lưu), `save_file` (File / Tệp).
- Registered in `js/plugins.js` (enabled); disabled VisuMZ_1_SaveCore to prevent conflicts.

## 2026-05-25 — Locales refactor: unified structure for KB_Localization

- **Root cause of CSV confusion**: previous setup had shared files scattered across `locales/Map/`, locale-specific files in `locales/vi/` and `locales/en/`, and stale JSON files left over from an older plugin (Iavra-style KB_Localization v1, no longer in use).
- **Unified structure**: moved 3 map CSVs from `locales/Map/` → `locales/` root as shared multi-column files (`tag;en;vi` format). These hold map dialogue and object names referenced across the game.
  - `Map001_Message.csv` (shared, en column mostly empty — see Known Issues below)
  - `Map003_MountainGodShrine.csv` (shared, en column mostly empty)
  - `Map005_SonTinhHome.csv` (shared, en column mostly empty)
- **Deleted broken per-locale copies** in `locales/vi/` and `locales/en/` for those Maps (wrong header format `tag;message` instead of `tag;en;vi`; missing English).
- **Rewrote Quest CSVs**: `locales/vi/Quest.csv` and `locales/en/Quest.csv` now use semicolon delimiter (was comma) and removed duplicate rows from General.csv that had slipped in.
- **Deleted stale files**:
  - `locales/vi/SideQuest.csv` and `locales/en/SideQuest.csv` (never declared in plugin config; contained junk).
  - 12 JSON files from `locales/vi/` and `locales/en/` (leftover from old v1 Iavra-style plugin; KB_Localization now runs CSV-only).
  - `locales/Map/` folder (now empty).
  - All `.DS_Store` files in `locales/`.
- **Cleaned shared files**: removed "USE UTF-8 encoding!!!;;" placeholder rows from `locales/title.csv`, `locales/charactor.csv`, `locales/Map001_Message.csv`. Removed empty trailing rows from `locales/charactor.csv`.
- **Updated `js/plugins.js` KB_Localization params**:
  - `Data Files`: removed `Map005_SonTinhHome` (now in Shared Files instead).
  - `Shared Files`: added `Map001_Message, Map003_MountainGodShrine, Map005_SonTinhHome`.
- **Final structure** (see `docs/spec/localization.md` for detail):
  - **Shared files** (root): `main.csv`, `title.csv`, `charactor.csv`, `Map001_Message.csv`, `Map003_MountainGodShrine.csv`, `Map005_SonTinhHome.csv`
  - **Locale-specific** (vi/en folders): `General.csv`, `Quest.csv`
- **Known issue — English columns in map CSVs**: `Map001_Message.csv`, `Map003_MountainGodShrine.csv`, `Map005_SonTinhHome.csv` all have empty or placeholder-text English columns (e.g., "a", "A", "{micha}"). Real English translations are needed. Flagged for future localization pass.

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
