# Localization (KB_Localization v2.7+)

## Overview

Game text is managed by **KB_Localization**, a custom RPG Maker MZ plugin that loads CSV files from `locales/` and replaces `{key}` tags in dialogue, item names, skill descriptions, etc. with the appropriate language version.

- **Primary language:** Vietnamese (`vi`)
- **Secondary language:** English (`en`)
- **Plugin location:** `js/plugins/KB_Localization.js`
- **Config location:** `js/plugins.js` (Plugin Manager — do NOT hand-edit)

## File Structure

```
locales/
├── main.csv                        ← shared UI text (skills, classes, buttons)
├── title.csv                       ← shared title screen & menus
├── charactor.csv                   ← shared character & NPC names
├── Map001_Message.csv              ← shared Map1 dialogue/objects
├── Map003_MountainGodShrine.csv   ← shared Map3 dialogue/objects
├── Map005_SonTinhHome.csv         ← shared Map5 dialogue/objects
├── vi/
│   ├── General.csv                 ← Vi-specific common terms
│   └── Quest.csv                   ← Vi-specific quest text
└── en/
    ├── General.csv                 ← En-specific common terms
    └── Quest.csv                   ← En-specific quest text
```

## File Types

| File | Scope | Column Format | Purpose |
|------|-------|---------------|---------|
| **Shared** (root) | All locales | `tag;en;vi` | Multi-column CSVs with both languages side-by-side. One XHR per file + locale (e.g., `main.csv` → loaded 2x, once for `vi` column, once for `en`). |
| **Locale-specific** (vi/, en/) | Single language | `tag;text` | Language-exclusive content (quests, dialog variations, region-specific UI). |

## Plugin Config

**Data Root Folder:** `locales` (relative to game root; points to `locales/` directory)

**Data Files** (per-locale CSVs):
- General
- Quest

**Shared Files** (multi-column root-level CSVs):
- main
- title
- charactor
- Map001_Message
- Map003_MountainGodShrine
- Map005_SonTinhHome

## Parsing Rules

1. **Shared file load**: Plugin issues ONE XHR for each shared file. If player locale = `vi`, it requests `locales/main.csv` and extracts the `vi` column. If locale = `en`, it extracts the `en` column.
2. **Locale-file load**: Plugin issues ONE XHR per data file. If locale = `vi`, it requests `locales/vi/General.csv`; if `en`, it requests `locales/en/General.csv`.
3. **Tag resolution**: When an event displays `{sontinh}`, the parser searches shared files first (in parse order: main → title → charactor → Map CSVs), then locale-specific files (General → Quest). First match wins.
4. **Fallback**: If a tag is not found, it displays literally as `{tag}` (visible warning).
5. **Regex pattern** (v2.7+): `/\{([A-Za-z_][\w]*)\}/g` — matches `{key}` where key starts with a letter or underscore. This prevents date strings like `{2026.5.25 15:39:53}` and VisuMZ escape sequences like `{{%1}}` from being destructively parsed. Unknown keys retain their original `{brackets}` instead of being unwrapped.

## CSV Format

### Shared Files (`tag;en;vi`)

```
tag;en;vi
skill_LongVuongChiNo;Long Vương Chi Nộ;Long Vương Chi Nộ
state_BongToiOverflow;Bóng Tối Bùng Phát;Bóng Tối Bùng Phát
save_autosave;Autosave;Tự Động Lưu
save_file;File;Tệp
```

- **Column 1 (`tag`):** identifier (alphanumeric + underscore, case-insensitive in some contexts)
- **Column 2 (`en`):** English text
- **Column 3 (`vi`):** Vietnamese text
- Empty cells are allowed; a missing English translation shows as blank in English locale.

**Common keys** (in `main.csv`):
- `save_autosave` — label for autosave slot (used by KB_SaveCore)
- `save_file` — label prefix for regular save slots (used by KB_SaveCore)
- `battle_description` — label for help/description window in battle (used by KB_SideViewBattleUI)

### Locale-Specific Files (`tag;text`)

```
tag;text
general_greeting;Xin chào bạn
general_farewell;Tạm biệt
```

- **Column 1 (`tag`):** identifier
- **Column 2 (`text`):** translated text for that locale

## Known Issues

### Map CSVs — Missing English Translations

The three map dialogue CSVs have incomplete English columns:

| File | Issue |
|------|-------|
| `Map001_Message.csv` | English column is mostly empty or contains single-letter placeholders ("a", "A"). Needs full translation. |
| `Map003_MountainGodShrine.csv` | English column is mostly empty or placeholder. Needs full translation. |
| `Map005_SonTinhHome.csv` | English column mostly empty or placeholder. Needs full translation. |

**Action required:** During a future localization pass, translate these columns into proper English dialogue.

## How to Add a New Localized String

1. **Shared content** (character names, skill descriptions):
   - Open the matching `.csv` in `locales/` (e.g., `main.csv`)
   - Add a new row: `tag;en_text;vi_text`
   - Reload the game (or use Plugin Manager reload if available)

2. **Locale-specific content** (region-specific dialogue):
   - Open `locales/vi/Quest.csv` and/or `locales/en/Quest.csv`
   - Add a new row: `tag;text_for_that_language`
   - Reload the game

3. **In events:**
   - Use `{tag}` to reference the key
   - Plugin resolves `{tag}` to the text at runtime based on player locale

## Debugging

- **Missing CSV file:** Plugin logs `KB_Localization: Failed to load locales/path/to/file.csv` to console
- **Unresolved tag:** Shows `{tag_name}` literally in game (visible red flag)
- **Wrong delimiter:** If semicolons are missing or commas used instead, parser will treat the line as one cell
- **Encoding issue:** CSVs must be UTF-8. macOS Excel exports as UTF-16 by default — re-save as UTF-8 CSV

## Migration History

See `docs/changelog.md` entry "2026-05-25 — Locales refactor" for details on the cleanup that consolidated this structure from a previous scattered state (Map/ folder, wrong headers, stale JSON files).
