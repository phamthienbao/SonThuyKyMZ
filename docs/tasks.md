# Tasks & Backlog

> Single source of truth for what's next. Pull from here; update status as you go.
> **Statuses:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked
> Format: `[status] (priority) (size) Task — note`

---

## Blockers — resolve first

See `docs/proposal.md` for full context.

- [~] (P0) (S) **D1 — Battle system: recommended CTB.** User to action via Plugin Manager (disable STB, enable CTB).
- [x] (P0) (S) D2 — Actor architecture: RESOLVED (reclass existing slots 1/3/4 instead of new IDs)
- [ ] (P1) (S) D3 — Decide mobile-aware design constraints
- [ ] (P2) (S) D4 — Decide map renaming strategy
- [ ] (P3) (S) D5 — Decide plugin cleanup approach

---

## Foundation — configuration & cleanup

- [x] (P0) (XS) Set `System.json.gameTitle` → "Sơn Thuỷ Ký"
- [x] (P0) (XS) Set `System.json.locale` → `vi_VN`
- [ ] (P0) (XS) Set proper `startMapId` (currently 22 — testing leftover). **User action**: pick start position in MZ editor; for dev, Map 3 (Mountain God's Shrine) has the prologue cutscene.
- [x] (P0) (XS) Repurpose actor "tesst" (id 4) → Ngọc Hoa
- [x] (P1) (XS) Archive orphan plugin `EventSensorMZ.js  copy` → `_archive/`
- [ ] (P1) (XS) Plugin separator file `--------------------------.js`: **keep** — referenced as 4 manifest entries (all disabled) used as visual separators
- [ ] (P1) (S) Audit and remove test switches (`LongQuest`, `findLong`, `Michau_onmap`)
- [ ] (P1) (S) Audit and remove test variables (`findLong`, `takeLong`, `Menu`, `filter`)
- [ ] (P2) (M) Archive ~113 dormant plugins to `js/plugins/_archive/` (pending D5)
- [ ] (P2) (S) Pick one quest system: VisuMZ_2_QuestSystem vs CGMZ_QuestSystem; disable the other

---

## Foundation — actors, classes, party

- [x] (P0) (S) Create class "Sơn Thần" (id 11)
- [x] (P0) (S) Create class "Thủy Thần" (id 12)
- [x] (P0) (S) Create class "Tiên" (id 13)
- [x] (P0) (S) Configure actor Tuấn (id 1, `{sontinh}` → "Nguyễn Tuấn", classId 11)
- [x] (P0) (S) Configure actor Hải (id 3, `{thuytinh}` → "Giang Hải", classId 12)
- [x] (P0) (S) Configure actor Hoa (id 4, `{hoa}` → "Ngọc Hoa", classId 13)
- [x] (P0) (XS) Update `partyMembers` to `[1, 3, 4]`
- [ ] (P1) (S) Sprites for Hoa: walking, face, sideview battler. **User action** — see `Char Generation Template/` for placeholders.

---

## Foundation — variables & switches

- [x] (P0) (S) Define chapter switches (`chapter_p_clear` ... `chapter_5_clear`)
- [x] (P0) (S) Define variable `current_chapter`
- [x] (P0) (S) Define variable `bongtoi_gauge` (0–100)
- [x] (P0) (S) Define switches `ngochon_son`, `ngochon_thuy`, `ngochon_phong`
- [x] (P0) (S) Define variable `ngochon_count`
- [x] (P0) (S) Define `bongtoi_overflow` switch
- [x] (P0) (S) Define `hoa_in_party` switch (gate Hoa's UI visibility until Ch.3)
- [ ] (P1) (S) Define `rep_<npc>` variables (allocate ranges per chapter)
- [ ] (P1) (S) Define `sq_<id>_state` variables (allocate ranges per chapter)
- [ ] (P1) (S) Define `moral_*` choice variables (5 moral checkpoints per GDD §3)

---

## Custom systems — KB plugins to build

- [x] (P1) (L) Build `KB_BongToiGauge.js` plugin (Hải's darkness meter) — v1.0 shipped 2026-05-25
  - Notetags `<bongtoi: +N>` / `<bongtoi: reset>` on skills/items/states
  - Low-HP fill threshold (configurable)
  - Auto-applies overflow state when gauge ≥ max
  - Battle UI: `[BT:X/Max]` suffix on Hải's name
  - Plugin commands for event-driven control
  - Pending: enable in Plugin Manager + first playtest
- [ ] (P1) (S) Ch.5 trigger for `tinh_tam_doubled` switch (Tĩnh Tâm 2x effectiveness late-game)
- [ ] (P1) (L) Build `KB_NgocHonState.js` (3-switch convergence → accessory equip)
- [ ] (P1) (L) Build `KB_SummonSystem.js` (Thần Thú once-per-battle skills)
- [ ] (P2) (M) Build `KB_Reputation.js` (NPC rep tracking, shop discounts, dialogue gating)
- [ ] (P3) (M) Build `KB_MoralChoice.js` (central tracker for ending paths)

---

## Database — Vietnamese-themed content

- [ ] (P1) (M) Add weapons: Búa Sơn Thần, Gậy Thần Sinh Tử, Thủy Xà Kiếm, Đồ Long Đao, Gậy Phép Mị Nương
- [ ] (P1) (M) Add legendary accessories: Ngọc Hồn (key→accessory), Trống Đồng Đông Sơn, Hộ Mệnh Amulet, Long Châu, Long Châu Hắc Ngọc, Lạc Hầu Hộ Phù, Ghost Lantern, Linh Vật Cáo
- [ ] (P1) (M) Add key items: Sách Ước, Bản Đồ Cổ, Sách Cổ An Nam (+ ~11 lore books)
- [ ] (P0) (L) Build Sơn Thần skill tree (Tuấn — Earth/Nature)
- [ ] (P0) (L) Build Thủy Thần skill tree (Hải — Water/Storm + Long Vương Chi Nộ + Tĩnh Tâm)
- [ ] (P0) (L) Build Tiên skill tree (Hoa — Light/Healing + Thiên Tiên Hộ Mệnh ULT)
- [ ] (P1) (M) Add Bóng Tối state (custom; not just Confusion)
- [ ] (P1) (L) Add enemies for Ch.1: village pests, Mãng Xà (boss)
- [ ] (P2) (L) Add enemies for Ch.2: bandits, river spirits
- [ ] (P2) (L) Add enemies for Ch.3–4: zone-specific (Voi/Gà/Ngựa sanctuaries)
- [ ] (P2) (XL) Add Cao Biền boss troop (3 phases)

---

## Maps — content authoring

### Prologue
- [ ] (P0) (M) Build modern setting intro (school / mountain field trip)
- [ ] (P0) (M) Build "Thư viện" with Bản Đồ Cổ pickup (P-01)
- [ ] (P0) (M) Wire Miếu Sơn Tinh seal-activation event (P-02)
- [ ] (P0) (M) Set Map 3 (Mountain God's Shrine) displayName (currently placeholder)

### Chapter 1
- [ ] (P0) (L) Build Tuấn tutorial combat with Sơn Tinh (1-01, 1-02)
- [ ] (P0) (XL) Build 5 village quests (1-03 to 1-07) — needs NPCs, dialogue, branches
- [ ] (P0) (L) Build Động Đình Hồ map (Hải's 1B area) — currently doesn't exist
- [ ] (P0) (L) Build Mãng Xà boss fight (1-08, 1-09)
- [ ] (P1) (M) Wire perspective-switch from Hải back to Tuấn → Ch.2 unlock

### Chapter 2
- [ ] (P1) (XL) Build Phong Châu (capital city) — doesn't exist
- [ ] (P1) (L) Build Làng Ma Xá + Rắn Thần / Sách Ước event (2-02)
- [ ] (P1) (L) Build 3 mini-game sính lễ challenges (2-03)
- [ ] (P1) (L) Build Kén Rể event (2-04) — Sơn Tinh wins
- [ ] (P1) (L) Build Bẫy Rượu cutscene (2-05) — Cao Biền reveal, KB appears, Ngọc Hồn obtained

### Chapter 3
- [ ] (P2) (L) Build Hậu Cung (palace inner court)
- [ ] (P2) (L) Build Ngọc Hoa flashback (3-01, 3-02)
- [ ] (P2) (M) Wire Vua Hùng quest-giver scene + Hoa joins party (3-04)
- [ ] (P2) (M) Open World Map with 3 destination markers (non-linear Ch.4)

### Chapter 4 (non-linear — three parallel arcs)
- [ ] (P2) (XL) Arc 4A: Voi Chín Ngà sanctuary + Sơn Lực
- [ ] (P2) (XL) Arc 4B: Gà Chín Cựa sanctuary + Hỏa Lực
- [ ] (P2) (XL) Arc 4C: Ngựa Chín Hồng Mao sanctuary + Phong Lực
- [ ] (P2) (M) Implement scaling logic: 3rd arc completed is hardest

### Chapter 5
- [ ] (P3) (XL) Build 5-floor Final Dungeon
- [ ] (P3) (XL) Build Cao Biền 3-phase fight + Mỵ Nương protection mechanic
- [ ] (P3) (M) Build Thánh Tản Giáng Thế cutscene

### Epilogue
- [ ] (P3) (M) Build return-to-modern cutscene + 3 endings (based on moral path)

---

## Side quests (27 per GDD §3)

- [ ] (P3) (L) Define SQ-01 to SQ-27 spec (one row per quest in `docs/spec/`)
- [ ] (P3) (XL) Implement chain quests: SQ-05, SQ-08, SQ-16
- [ ] (P3) (M) Implement post-game: SQ-21, SQ-22, SQ-23
- [ ] (P3) (M) Implement Trống Đồng collection: SQ-15 (7 pieces)

---

## Polish & release

- [ ] (P3) (M) New Game+ mode
- [ ] (P3) (L) Encyclopedia content (CGMZ_Encyclopedia) — bestiary, item lore, character bios
- [ ] (P3) (L) Localization sweep — extract all hardcoded strings to `locales/`
- [ ] (P4) (XL) Mobile port build

---

## Notes

- **Sizes:** XS = <30 min, S = 1–2 hrs, M = half-day, L = 1–3 days, XL = a week+.
- **Priorities:** P0 = blockers, P1 = core loop (Ch.1–2), P2 = main arc, P3 = polish/late, P4 = future.
- Update this file as work progresses. Move done items to `docs/changelog.md`.
