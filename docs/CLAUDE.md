# Sơn Thuỷ Ký 山水記 — Project Guide

> Read this first. Single source of truth for project context.

## What this is

A turn-based JRPG built on **RPG Maker MZ**, set in legendary Văn Lang (Vua Hùng thứ 18 era).
Story: three modern Vietnamese students are pulled into the past, each empowered by a god, and must stop Cao Biền from sealing the Thần Thú and draining the kingdom's linh khí.

- **Genre:** JRPG / Isekai / Vietnamese mythology
- **Combat:** Turn-based party-of-three (planned ATB, currently STB)
- **Camera:** Top-down 2D pixel art
- **Length target:** ~20–28 hours (Prologue + 5 chapters + Epilogue)
- **Languages:** Vietnamese (primary), English (secondary). i18n via KB_Localization in `locales/`.
- **Target:** PC first; mobile port later.

## Documents

- **`docs/CLAUDE.md`** — this file. Read first.
- **`docs/tasks.md`** — current backlog. Read before starting work.
- **`docs/design.md`** — architecture, systems, current → GDD v3 deltas
- **`docs/proposal.md`** — open decisions needing user input
- **`docs/glossary.md`** — Vietnamese ↔ English design terms
- **`docs/spec/`** — feature specs:
  - `audit-v1.md` — initial audit (2026-05-25)
  - `localization.md` — i18n system (KB_Localization)
  - `save-system.md` — save/load UI (KB_SaveCore)
- **`docs/changelog.md`** — append-only project history
- **`docs/qc/`** — bug reports, QA findings

## Project layout

```
SonThuyKyMZ/                       ← single repo (game + docs)
├── docs/                          ← project documentation (this folder)
├── game.rmmzproject               ← open this with RPG Maker MZ editor
├── data/                          ← Maps, Actors, Skills, Items, etc. (JSON)
├── js/
│   ├── plugins/                   ← 174 plugin files (42 enabled)
│   ├── plugins.js                 ← plugin manifest (do NOT hand-edit; use MZ editor)
│   └── rmmz_*.js                  ← core engine (DO NOT MODIFY)
├── img/, audio/, fonts/, effects/, css/, icon/
├── locales/                       ← KB_Localization CSVs (see docs/spec/localization.md)
│   ├── shared: main.csv, title.csv, charactor.csv, Map*.csv
│   ├── vi/: General.csv, Quest.csv
│   └── en/: General.csv, Quest.csv
├── save/                          ← test save files (gitignored)
├── Char Generation Template/      ← MZ character generator presets
└── TN_SpriteExtenderEx/           ← sprite extension assets
```

## Source of truth

- **Story / design:** `~/Downloads/SonThuuyKy_GDD_v3.docx` (the GDD)
- **Implementation state:** the JSON files under `data/` and `js/plugins/`
- **When they disagree:** the audit (`docs/spec/audit-v1.md`) lists the deltas; resolve before coding
- **Remote:** `github.com/phamthienbao/SonThuyKyMZ` (old `phamthienbao/SonTinhMZ` is archived backup)

## Engine choice

**Stay on RPG Maker MZ.** Migration to RPG Maker Unite (Unity) was considered and rejected — see `docs/proposal.md` for the analysis.

## Workflow

1. Read `docs/tasks.md` to find the active task
2. Pick a task or ask user
3. Implement
4. Update `docs/changelog.md` and any affected spec
5. Run doc-keeper at end of session

## Hard rules

- **NEVER modify** files in `js/rmmz_*.js` (engine core)
- **NEVER hand-edit** `js/plugins.js` — use the MZ editor's Plugin Manager
- **NEVER commit** save files or test artifacts to git
- **NEVER mutate** data JSON live during a play session (use editor or scripts)
- Vietnamese text goes in `locales/vi/*.csv`, not hardcoded in events
- Localization keys look like `{sontinh}`, `{mynuong}`, `{classStudent}` — preserve them

## Plugin stack (enabled, abbreviated)

- **VisuMZ:** CoreEngine, BattleCore, BattleSystemSTB, ElementStatusCore, EventsMoveCore, ItemsEquipsCore, MainMenuCore, MessageCore, SkillsStatesCore, QuestSystem, VisualBattleEnv, WeaponAnimation, VictoryAftermath, VisualStateEffects, ActSeqCamera/Impact, BattleAI, WeaknessPopups, EncounterEffects, GabWindow, PictureCmnEvts
- **CGMZ:** Core, Encyclopedia, GameOver, MapNameWindow, ToastManager, FastTravel
- **GabeMZ:** FollowersControl, EventFloatingInfo
- **KB (custom, ours):** KB_CoreEngine, KB_Optimized, KB_TitleCommands, KB_Localization, KB_Dev_Extractor, KB_SaveCore (save UI), KB_MainMenuVisual (menu UI), KB_SideViewBattleUI (battle layout), KB_BongToiGauge, KB_NgocHonState
- **Misc:** DragonSmoothCamera, MOG_TitleParticles, IgnisItemGoldPopup, schach-parsing/pathfinding, Public_0_PixiJsFilters

**Note:** 
- VisuMZ_1_SaveCore is disabled (replaced by KB_SaveCore). See `docs/spec/save-system.md` for details.
- VisuMZ_3_SideviewBattleUI is disabled (replaced by KB_SideViewBattleUI). See `docs/spec/battle-ui.md` for details.
