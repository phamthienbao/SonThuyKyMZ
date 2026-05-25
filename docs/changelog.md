# Changelog

Append-only. Newest entries on top. Format: `YYYY-MM-DD — short summary`.

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
