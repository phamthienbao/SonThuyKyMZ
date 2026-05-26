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
- [x] (P2) (S) Pick one quest system: **VisuMZ_2_QuestSystem** chosen — disable CGMZ_QuestSystem + Galv_QuestLog. Decision: same suite as MainMenuCore, KB_Localization-compatible text codes. See `docs/spec/main-menu.md`.

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

- [x] (P1) (L) Build `KB_BongToiGauge.js` plugin (Hải's darkness meter) — v1.1 shipped 2026-05-25
  - Notetags `<bongtoi: +N>` / `<bongtoi: reset>` on skills/items/states
  - Low-HP fill threshold (configurable)
  - Auto-applies overflow state when gauge ≥ max
  - Battle UI: Sprite_KBBongToiGauge (MZ gauge sprite) positioned below TP in status window
  - Plugin commands for event-driven control
  - v1.1 fix: replaced v1.0 drawActorName text-suffix hook with sprite gauge (text-suffix never fired with VisuMZ_3_SideviewBattleUI enabled)
- [ ] (P1) (S) Ch.5 trigger for `tinh_tam_doubled` switch (Tĩnh Tâm 2x effectiveness late-game)
- [x] (P1) (L) Build `KB_NgocHonState.js` (3-switch convergence → accessory equip) — v1.0 shipped 2026-05-25
  - Watches `ngochon_son/thuy/phong` switches (29/30/31)
  - Syncs `ngochon_count` var (0..3); auto-fires convergence at 3
  - Configurable: key item to remove, accessory armor to add, actor + slot for auto-equip, fanfare SE, common event
  - Idempotent via `convergenceDoneSwitchId`; catch-up check on `Scene_Map.start`
  - Plugin commands: CollectShard, SetShard, ForceConvergence, ResetAll, CheckNow
  - Pending: enable in Plugin Manager + create Ngọc Hồn key item + accessory armor entries in data, then wire IDs into plugin params
- [ ] (P1) (L) Build `KB_SummonSystem.js` (Thần Thú once-per-battle skills)
- [ ] (P2) (M) Build `KB_Reputation.js` (NPC rep tracking, shop discounts, dialogue gating)
- [ ] (P3) (M) Build `KB_MoralChoice.js` (central tracker for ending paths)
- [x] (P1) (L) Build `KB_MainMenuVisual.js` (in-game pause menu, sumi-e ink-wash) — spec at `docs/spec/main-menu.md` ✅ **v0.6.21 shipped 2026-05-26**
  - [x] Step 1: Disable CGMZ_QuestSystem, Galv_QuestLog, DKTools, DKTools_Localization in Plugin Manager ✅ done 2026-05-26
  - [x] Step 2: Create `locales/vi/Menu.csv` + `locales/en/Menu.csv` (13 keys: 9 menu + 1 unit + 3 journal hub) ✅ done 2026-05-26; `Menu` registered in KB_Localization params
  - [x] Step 3: Configure VisuMZ_1_MainMenuCore ✅ done 2026-05-26 — KB_Localization `{key}` resolves in command labels; 10 commands (Formation added, Load removed)
  - [ ] Step 3.5 (deferred polish): override `TextManager.currencyUnit` → "Lượng"; translate Playtime Window label → "Thời Gian"
  - [x] Step 4: Skeleton plugin ✅ shipped 2026-05-26 (v0.1) — KB_MenuHeader, KB_MenuAtmosphereLayer, KB_ActorCardMenu, KB_MenuPartyColumn, Scene_KBJournal, Window_KBJournalCommand defined; registered in Plugin Manager; boots clean
  - [x] Step 5: Command column polish ✅ shipped 2026-05-26 (v0.2 + v0.2.1) — vertical left column, brushstroke cinnabar underline selection, cubic-out slide-in animation, default cursor hidden. Ink-blot icon assets still pending (using IconSet placeholders for now)
  - [x] Step 6: Atmospheric panel ✅ shipped 2026-05-26 (v0.3) — SceneManager.backgroundBitmap source, cover-fit scaling, PIXI ColorMatrixFilter chain (desaturate + brightness 0.80), mask, radial vignette overlay 0.55. Verified across 3 maps
  - [x] Step 7: Party column ✅ shipped 2026-05-26 (v0.4 + v0.4.1–v0.4.4) — KB_ActorCardMenu (Window_StatusBase); scaled face graphics with async load-listener self-heal; name prominent + class/level as dim subtitle row; HP/MP/TP gauges via placeBasicGauges; transparent window frame; subtle dark card wash + hairline border; hides VisuMZ stock status. Verified with 3-actor party
  - [x] Step 8a: Bóng Tối DP gauge integration ✅ free via KB_BongToiGauge `placeGauge` panel-mode chain hook — appears automatically on Hải's card below TP. Card height bumped to 190 to fit the DP row. **v0.6.9**: same DP row was clipping on Scene_Skill's status header — fixed by bumping `Scene_Skill.statusWindowHeight` to 5 rows and switching `Window_SkillStatus.refresh` to top-aligned drawing (`y=0`) instead of stock vertical-center.
  - [x] Step 8c: Class subtitle treatment on personal-scene status windows ✅ shipped 2026-05-26 (v0.6.9) — `Window_StatusBase.drawActorClass` overridden to use `SUBTITLE_FONT` + `SUBTITLE_COLOR`, matching the party column's name-dominant / class-as-subtitle visual on Scene_Skill / Equip / Status.
  - [ ] Step 8b: Ngọc Hồn state indicator on actor cards (different mechanism — state icon, not gauge)
  - [x] Step 9: Header band + hint + actor-selection flow + 5-iteration ghost-frame saga ✅ shipped 2026-05-26 (v0.5.0 → v0.6.21 **RESOLVED**) — full-width 64px band, gameTitle (left); location + Thời Gian + gold/Lượng (right-aligned, repaints every second). Vertical ink-wash gradient + brushstroke hairline. New locale key `menu_label_playtime` added to vi/en. **v0.5.1**: hides VisuMZ's bottom Time/Gold/Variable bars + moves Button Assist to bottom. **v0.6.6**: right cluster padding derives from `_cancelButton.x` dynamically. **v0.6.7**: custom centered hint (`[Z] Chọn   [X] Hồi`) on all Scene_MenuBase subclasses. **v0.6.8**: scene-aware hint entries (Q/W actor/category switches). **v0.6.10**: mainAreaHeight capped above hint. **v0.6.9**: class subtitle styling. **v0.6.11–v0.6.15**: DP-gauge clipping 5-iteration journey (v0.9 class subtitle + Scene_Skill height → v0.6.10 mainAreaHeight cap → v0.6.11 Scene_Status rect cap → v0.6.12–v0.6.13 ElementStatusCore discovery → v0.6.15 DrawJS patch **RESOLVED**). **v0.6.3–v0.6.5**: actor-selection flow (status window visibility + party column toggle). **v0.6.16**: Formation (Đội Hình) freeze fix via separate commandFormation alias. **v0.6.17–v0.6.21**: ghost-frame 5-iteration journey (v0.6.17 button-assist setBackgroundType → v0.6.18 Playtime/Var/Gold frame fix → v0.6.19 timing + refresh-leak hypotheses → v0.6.20 debug instrumentation → v0.6.21 root-cause fix: suppress stray bare Window_Base at (240, 641) **RESOLVED**).
  - [x] Step 10: Journal hub scene ✅ shipped 2026-05-26 (v0.6.0 → v0.6.5) — `Scene_KBJournal` polished: centered scene title ("Nhật Ký") with brushstroke hairline anchored above the command window, transparent command window, cinnabar underline selection, hidden cursor, cubic-out slide-in from bottom. **v0.6.1**: hub expanded from 3 → 4 commands. **v0.6.2**: final labels — Hành Trình / Quái Phổ / Nhiệm Vụ / Truyền Thuyết. **v0.6.3–v0.6.5**: two regressions fixed (Skill/Equip/Status/Formation/ClassChange freeze via status-window + party-column visibility toggle; Journal sub-command stubs disabled until Step 12). **v0.6.4**: Journal command freeze root-cause (handlers unconditional now). **v0.6.5**: actor-info double-render dedup.
  - [ ] Step 11: Wire Nhiệm Vụ → VisuMZ_2_QuestSystem; author one sample quest using `{quest_*}` keys
  - [ ] Step 12: Wire Hành Trình + Quái Phổ + Truyền Thuyết → CGMZ_Encyclopedia (Journey + Monster Book + Legends categories — 3 categories, all CGMZ-backed); author one sample entry in each; verify bestiary auto-registers
  - [ ] Step 13: Wire Bản Đồ → CGMZ_FastTravel (verify `Scene_FastTravel` class name; `commandMap` already pushes it when defined — v0.6.4 made the handler unconditional)
  - [ ] Step 14: QA pass, log regressions to `docs/qc/`
  - [ ] Authoring (parallel): assets for ink-blot command icons (9 PNGs at ~48×48); replace IconSet placeholders

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
