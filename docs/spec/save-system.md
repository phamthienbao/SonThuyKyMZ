# Save System (KB_SaveCore v1.3)

## Overview

**KB_SaveCore** is a lightweight, maintainable save UI plugin that replaces VisuMZ_1_SaveCore and CGMZ_SaveFile. It provides a clean, customizable save/load interface with automatic locale restoration, integrated localization support, per-slot-type image sources, and gameplay snapshot caching.

- **Plugin location:** `js/plugins/KB_SaveCore.js` (~600 lines)
- **Required dependency:** KB_CoreEngine.js (must be listed above KB_SaveCore)
- **Optional dependency:** KB_Localization.js (for multilingual labels and map names)
- **Status:** v1.3, active — VisuMZ_1_SaveCore is disabled

## File Structure

Each save file slot displays as:

```
┌─────────────────────────────┐
│ [Face] │ Autosave            │  ← Slot title
│        │ Map Name (Vĩ Đại)   │  ← Map location (auto-translated)
│  (96px)│ 02:15:30            │  ← Playtime
│        │  2026/05/25 15:39:53│  ← Timestamp (right-aligned)
└─────────────────────────────┘
```

- **Face portrait** (left) — from first actor in save data, drawn at configurable size (default 96px)
- **Title** (top right) — "Autosave" (slot 0) or "File N" (slots 1+)
- **Map Name** (optional) — auto-translated if it matches a localization key (e.g., `{vĩ_đại}`)
- **Playtime** (optional) — in HH:MM:SS format (standard RPG Maker format)
- **Timestamp** (optional) — formatted via configurable token template (default: `YYYY/MM/DD HH:mm:ss`), rendered via raw `Bitmap.drawText` to bypass VisuMZ Digit Grouping

## Image Sources

Each slot can display an image from one of five sources:

| Source | Description | When to use |
|--------|-------------|------------|
| **snapshot** | JPEG screenshot captured at save time, stored in `info.snapshot` | Default for manual saves (captures the current game state) |
| **face** | First actor's face portrait from `Faces.png` | When you want actor representation (e.g., party leader) |
| **title** | Game's title screen image (`$dataSystem.title1Name`) | Consistent branding, always available |
| **icon** | Single game icon from `icon/icon.png` | Minimal file size, game-wide thumbnail |
| **custom** | User-specified image file from `img/pictures/` (no extension) | Custom slot artwork |

**Autosave** defaults to `icon` (lightweight, fast); **Manual saves** default to `snapshot` (most informative).

### Image Rendering

- **Face images** use `Window_SavefileList.drawFace()` (standard face sprite dimensions)
- **Non-face images** (snapshot, title, icon, custom) are centre-cropped to a square, then scaled to `Image Size` × `Image Size` pixels

### Caching & Lifecycle

To avoid infinite-refresh hangs, KB_SaveCore v1.2 maintains a module-level bitmapCache Map (keyed by URL/data URL) for 'icon' and 'snapshot' types. This ensures the same Bitmap instance is returned on every redraw, preventing `Bitmap.load(url)` from creating fresh bitmaps each frame. The cache keys on the original URL, not the final data URL, so redirects/rewrites bypass the cache as needed.

Additionally, each cached bitmap tracks a `_kbRefreshHooked` flag so `addLoadListener(refresh)` is attached only once, preventing listener duplication across redraw cycles.

### Snapshot

When **Capture Snapshot** is enabled, KB_SaveCore captures the screen as a JPEG data URL. v1.3 uses a gameplay snapshot cache hook to avoid capturing the menu:

**Cache Hook (`SceneManager.snapForBackground`):**
- Fires when the engine snaps for menu backgrounds (title, menu, pause, etc.)
- If the outgoing scene is `Scene_Map` or `Scene_Battle`, the snapshot is downscaled + JPEG-encoded and stored in module-level `_kbCachedGameSnapshot`
- Shared encoder `encodeBitmapToJpeg()` applies downscale (to max width 320px) + JPEG quality (default 70) + size cap (64 KB)

**Snapshot Capture Path:**
1. If the **current** scene is gameplay (Scene_Map or Scene_Battle), a live snap is taken immediately
2. Otherwise (manual save from Scene_Save), the cached gameplay snapshot is used
3. If neither is available, the fallback chain is triggered

**Size Optimization:**
- The captured canvas is downscaled to a maximum width (default 320 px). Aspect ratio is preserved.
- The downscaled canvas is converted to a data URL via `toDataURL('image/jpeg', quality)`.
- If the resulting data URL exceeds the **Snapshot Max DataURL KB** limit (default 64 KB), the snapshot is dropped and the fallback chain is triggered instead.

**Migration Note:** Saves created on v1.1/v1.2 have the wrong snapshot (menu image) embedded in `info.snapshot`. They will not auto-correct on load — re-save to update.

### Fallback Chain

If the chosen image type is unavailable (e.g., snapshot disabled, face data missing), KB_SaveCore automatically falls back:

```
Requested Type → Fallback Priority
snapshot       → (no snapshot data?)  → face
face           → (no face data?)      → title
custom         → (no custom file?)    → title
title          → (no title image?)    → icon
```

This ensures slots never display blank — there's always a fallback image. Check the plugin logs if a slot shows the wrong image type.

### Empty Slot Rendering

Empty slots (no save data) ignore the per-type image configuration and instead use **Empty Slot Image Type** (default "title") so both empty Autosave and empty Manual slots display a consistent image.

A translucent white overlay (opacity controlled by **Empty Overlay Alpha**, default 0.35) is rendered on top of the empty-slot image, giving a "unused slot" appearance similar to other games' save UIs.

| Parameter | Effect |
|-----------|--------|
| **Empty Slot Image Type** | Image source for empty slots: `title`, `icon`, `custom`. Ignores per-type config (`AutoSave Image Type` / `Manual Image Type`) |
| **Empty Overlay Alpha** | Overlay opacity (0–1, default 0.35). Higher = more opaque white overlay |

### VisuMZ Digit Grouping Bypass

Prior to v1.1, timestamps would render as "2,026" instead of "2026" because VisuMZ_0_CoreEngine hooks `Window_Base.drawText` to insert thousands separators. v1.1 now renders timestamps via `this.contents.drawText` (raw Bitmap method), which bypasses VisuMZ's hook entirely. This is a critical fix for non-English locale display.

## Plugin Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| **Max Save Files** | number | 20 | Total save slots available (slot 0 = autosave, 1..N = manual saves) |
| **Enable Autosave** | boolean | true | If false, autosave is disabled and slot 0 is hidden |
| **Show Map Name** | boolean | true | Display the map name on each save slot |
| **Show Playtime** | boolean | true | Display total playtime in HH:MM:SS format |
| **Show Timestamp** | boolean | true | Display the save date/time with custom formatting |
| **Timestamp Format** | string | YYYY/MM/DD HH:mm:ss | Token-based format for save date. Tokens: YYYY, MM, DD, HH, mm, ss |
| **Autosave Label** | string | {save_autosave} | Text for slot 0. Can include a localization key like `{save_autosave}` or plain text like "Auto" |
| **Save Label** | string | {save_file} | Text prefix for manual slots. Slot N displays as "[label] N". E.g., "File 1", "Fichier 1" |
| **Slot Rows** | number | 4 | Number of visible save slots per page |
| **Slot Cols** | number | 1 | Number of columns (typically 1 for vertical list) |
| **Image Size** | number | 96 | Width/height of slot image in pixels (applies to all types except face). Minimum 48 |
| **AutoSave Image Type** | select | icon | Image source for autosave slot. Options: `title`, `icon`, `face`, `custom`, `snapshot` |
| **AutoSave Custom Image** | string | — | Filename in `img/pictures/` (no extension). Used only when AutoSave Image Type = `custom` |
| **Manual Image Type** | select | snapshot | Image source for manual save slots. Options: `title`, `icon`, `face`, `custom`, `snapshot` |
| **Manual Custom Image** | string | — | Filename in `img/pictures/` (no extension). Used only when Manual Image Type = `custom` |
| **Capture Snapshot** | boolean | true | If true, captures screen via `SceneManager.snap()` at save time and stores as JPEG data URL |
| **Snapshot Quality** | number | 70 | JPEG quality (1-100). Lower = smaller file, lower quality. Only used if Capture Snapshot = true |
| **Snapshot Max Width** | number | 320 | Maximum width in pixels for downscaled snapshot. Aspect ratio is preserved. Reduces file size and memory usage |
| **Snapshot Max DataURL KB** | number | 64 | Maximum size in KB for snapshot data URL. If exceeded, snapshot is dropped and fallback chain is triggered |
| **Empty Slot Image Type** | select | title | Image source for empty save slots. Options: `title`, `icon`, `custom`. Overrides per-type config for empty slots only |
| **Empty Overlay Alpha** | number | 0.35 | Translucent white overlay opacity on empty slots (range 0–1). Higher = more opaque. Creates "unused slot" appearance |

## Hooks and Modifications

### DataManager

- **`maxSavefiles()`** — returns `Max Save Files` param (replaces engine default)
- **`makeSavefileInfo()`** — extended to store:
  - `info.mapName` — display name of current map (auto-filled from `$gameMap.displayName()` or `$dataMapInfos`)
  - `info.locale` — current player locale (e.g., `"vi"`, `"en"`) for restoration on load
- **`loadGame(savefileId)`** — after loading save data, checks `info.locale` and restores the language via `KBLocalization.setLanguage()` if KB_Localization is active

### Window_SavefileList

- **`maxCols()`** — returns `Slot Cols` param
- **`numVisibleRows()`** — returns `Slot Rows` param
- **`itemHeight()`** — computed as `innerHeight / Slot Rows`
- **`drawItem(index)`** — calls `drawKBSlot()` to render custom layout
- **`drawKBSlot(savefileId, info, rect)`** — renders the custom save slot:
  - Draws face portrait at size (`faceSize` × `faceSize`)
  - Draws slot title (via `kbSlotTitle()`)
  - Draws map name, playtime, timestamp (each on a new line, if enabled)
  - Timestamps are right-aligned
- **`kbSlotTitle(savefileId)`** — returns localized label:
  - Slot 0 → `tr(autosaveLabel)` (e.g., "Autosave" or "Tự Động Lưu")
  - Slot N → `tr(saveLabel) + " " + N` (e.g., "File 1")

### Autosave Disabling

If **Enable Autosave** is false:
- `Scene_Base.prototype.executeAutosave()` is overridden to no-op
- `Scene_Base.prototype.requestAutosave()` is overridden to no-op
- Slot 0 is never written to, though the UI may still render it as empty

## Localization Integration

KB_SaveCore integrates with KB_Localization for:

1. **Slot labels** — `{save_autosave}` and `{save_file}` keys are looked up at runtime
2. **Map names** — if a map display name matches a localization key (e.g., `{vĩ_đại}`), it is auto-translated via `KBLocalization.process()`
3. **Locale restoration** — when loading a save, the stored `info.locale` restores the player's language preference

**Required locale keys** (add to `locales/main.csv`):
```
tag;en;vi
save_autosave;Autosave;Tự Động Lưu
save_file;File;Tệp
```

## Extending KB_SaveCore

To customize the save layout further:

1. **Custom slot rendering** — override `Window_SavefileList.prototype.drawKBSlot()`
2. **Additional info** — extend `DataManager.makeSavefileInfo()` to store extra fields (e.g., chapter name, party portraits)
3. **Custom labels** — pass plain text or keys to **Autosave Label** / **Save Label** params; they are processed by KB_Localization if available

## Why KB_SaveCore Over VisuMZ_1_SaveCore?

| Feature | KB_SaveCore | VisuMZ_1_SaveCore |
|---------|-------------|-------------------|
| Lines of code | ~250 | ~3000+ |
| Maintainability | High (readable, minimal dependencies) | Medium (complex state management) |
| Localization support | Native (via KB_Localization.process()) | Via VisuMZ escape wrapper `{{...}}` (conflicts with KB_Localization) |
| Customization | Params + hook overrides | Extensive but verbose |
| Bundle size | Minimal | Large |
| Custom timestamp format | Yes | Yes (via TextManager) |
| Autosave toggling | Yes | Yes |

## Debugging & Logging

KB_SaveCore v1.2 logs all snapshot operations to the console under the `[KB_SaveCore]` tag:

- `[KB_SaveCore] Snapshot capture: NNN KiB (MMM ms)` — successful capture with size and duration
- `[KB_SaveCore] Snapshot exceeded max data URL size...` — snapshot dropped due to size cap
- `[KB_SaveCore] Failed to load snapshot: ...` — snapshot data corrupted or unavailable

Check the browser console (F12 → Console) if save slots display unexpected image types or if manual saves hang during capture.

## Testing Checklist (v1.2)

**Core (v1.0 — pre-existing):**
- [x] Save game displays face, title, map name, playtime, timestamp correctly
- [x] Autosave slot (0) shows "Autosave" label when enabled
- [x] Manual slots show "File N" label
- [x] Load game restores the locale stored in save file
- [x] Map names are auto-translated if they match localization keys
- [x] Disable Autosave prevents slot 0 writes
- [x] Slot Rows/Cols pagination works
- [x] No conflicts with KB_Localization regex parsing

**v1.1 additions:**
- [x] Timestamp renders correctly without thousands separator ("2026" not "2,026") — test with non-English locales
- [x] Image Size param scales non-face images correctly
- [x] AutoSave Image Type = `icon` displays game icon
- [x] AutoSave Image Type = `snapshot` (if enabled) captures and displays screenshot
- [x] Manual Image Type = `snapshot` captures and displays screenshot
- [x] Custom image type displays file from `img/pictures/` when specified
- [x] Snapshot Quality param affects JPEG file size / quality
- [x] Fallback chain: snapshot (missing data) → face (missing face) → title (missing title) → icon
- [x] Snapshot bitmap cache prevents duplicate memory usage
- [x] Disable Capture Snapshot prevents screenshot recording

**v1.2 additions:**
- [x] Manual save completes without hang (no infinite refresh loop on icon or snapshot types)
- [x] Snapshot is downscaled to max width and aspect ratio is preserved
- [x] Snapshot Max Width param controls downscaling (smaller value = smaller file)
- [x] Snapshot is dropped if data URL exceeds Snapshot Max DataURL KB limit
- [x] Fallback chain is triggered when snapshot size is exceeded
- [x] Console logs appear for snapshot capture (`[KB_SaveCore] Snapshot capture: NNN KiB (MMM ms)`)
- [x] Console logs appear on snapshot size exceed or load failure
- [x] Same bitmap instance is reused across multiple redraws (bitmap cache working)

**v1.3 additions:**
- [ ] Autosave from map/battle captures a gameplay snapshot (no menu image)
- [ ] Manual save from Scene_Save menu uses cached gameplay snapshot
- [ ] Empty save slots display "Empty Slot Image Type" image (overrides per-type config)
- [ ] Empty slot white overlay appears with opacity matching "Empty Overlay Alpha" param
- [ ] Old v1.1/v1.2 saves still load, but have menu snapshot cached (re-save to update)
- [ ] Snapshot cache is populated when opening menu/save scenes
- [ ] encodeBitmapToJpeg() shared encoder applies downscale + JPEG + size-cap consistently

## Migration from VisuMZ_1_SaveCore

1. Disable **VisuMZ_1_SaveCore** in Plugin Manager (set status to false)
2. Enable **KB_SaveCore** in Plugin Manager (set status to true)
3. Review save slot layout — KB_SaveCore uses a simpler 2-column design (face left, info right)
4. Ensure `locales/main.csv` contains `save_autosave` and `save_file` keys
5. Test load/save to verify locale is restored and map names translate correctly
