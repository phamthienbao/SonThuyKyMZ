# Audit v1 — Current State vs GDD v3

**Date:** 2026-05-25
**GDD reference:** `~/Downloads/SonThuuyKy_GDD_v3.docx`
**Project root:** `SonThuyKyMZ/SonTinhMZ/`

## TL;DR

> The current MZ project is at ~15–20% design maturity. The **engine layer is mature** (42 plugins, VisuMZ stack, custom KB plugins, i18n). The **content layer is sparse** and was built around an **older Sơn-Tinh-as-hero design** that GDD v3 has superseded with three modern students (Tuấn/Hải/Hoa). All custom systems from GDD §7 (Bóng Tối, Ngọc Hồn, Sách Ước, Summon, Reputation, ATB) are **not yet implemented**.

### Implementation maturity by layer

| Layer | Maturity | Note |
|---|---|---|
| Plugin stack | ~85% | VisuMZ + CGMZ + GabeMZ + custom KB_ stack loaded and configured |
| i18n / localization | ~70% | KB_Localization with `en/`, `vi/`, `Map/` CSVs |
| Combat action sequences | ~70% | 46 action common events (Jump/Flip/Dash/Teleport variants) |
| World map structure | ~30% | 23 maps exist, but only 4 have substantive events |
| Database (skills/items/etc.) | ~25% | RPG Maker MZ defaults populated; little Vietnamese-themed content |
| Story / quest scripting | ~5% | Only test sandbox quests built (LongLong demo on Map 1–2) |
| Custom GDD systems | ~0% | None of Bóng Tối / Ngọc Hồn / Summon / Sách Ước / Reputation / ATB exist |

---

## 1. Engine & Configuration (`data/System.json`)

| Setting | Current | GDD v3 expectation | Action |
|---|---|---|---|
| `gameTitle` | *(empty string)* | "Sơn Thuỷ Ký 山水記" | **Fix** — set to localized title |
| `locale` | `en_US` | `vi_VN` primary (with en fallback via KB_Localization) | **Fix** |
| Resolution | 1024×768 | OK for 2D pixel art | Keep |
| `battleSystem` | 0 (default) + STB plugin | ATB per GDD §7 | **Decide** — see `proposal.md` D1 |
| `optSideView` | true | Implied (battler positions enabled) | Keep |
| `currencyUnit` | "Vàng" | "Vàng" | OK |
| Elements | Physical/Fire/Ice/Thunder/Water/Earth/Wind/Light/Darkness | Matches GDD triangle | OK |
| `partyMembers` | `[1]` (Sơn Tinh) | `[Tuấn, Hải, Hoa]` (3 fixed) | **Fix** — depends on D2 |
| `startMapId` | 22 (Major House 1F — looks like a test save start) | Should be Prologue / Map 4 (Road to Shrine) | **Fix** |
| `editMapId` | 9 (House 1) | n/a | OK |
| Switches | 21 defined (mostly basic) | Many missing — see §4 | **Expand** |
| Variables | 7 defined | Many missing | **Expand** |

---

## 2. Actors & Classes (`data/Actors.json`, `Classes.json`)

### Critical mismatch
The current Actors.json is built around the **older Sơn-Tinh-as-protagonist design**, not GDD v3.

| Actor ID | Name | Class | Role (current) | Role (GDD v3) |
|---|---|---|---|---|
| 1 | `{sontinh}` (Sơn Tinh) | 1 Swordsman | Playable protagonist | **NPC mentor** (god) |
| 2 | `{mynuong}` (Mỵ Nương) | 10 Student | Playable (used as test) | **Quest target / kidnapped princess** |
| 3 | `{thuytinh}` (Thuỷ Tinh) | 10 Student | Playable | **NPC mentor** (god) |
| 4 | "tesst" | 10 Student | Test data | **DELETE** |
| 5–50 | (empty) | 1 | — | — |
| — | — | — | — | **MISSING: Tuấn (Sơn Thần)** |
| — | — | — | — | **MISSING: Hải (Thủy Thần)** |
| — | — | — | — | **MISSING: Ngọc Hoa (Tiên)** |

### Classes

8 default RMMZ classes exist (Swordsman, Sorcerer, Priest, Knight, Martial Artist, Magic Swordsman, Hunter, Bandit) — **none used by the protagonist trio**.
Class 10 = `{classStudent}` — generic student placeholder, currently used by Mỵ Nương and Thuỷ Tinh (confusingly).

**Recommended class mapping (GDD v3):**

| Actor | Class | Element | Stat profile |
|---|---|---|---|
| Tuấn | Sơn Thần (new class) | Earth / Sơn | High HP, mid ATK, low SPD |
| Hải | Thủy Thần (new class) | Water / Thủy | Mid HP, high ATK/MAG, high SPD |
| Ngọc Hoa | Tiên (new class) | Light / Healer | Low ATK, high MAG/Heal, mid SPD |

→ See `docs/proposal.md` D2 for decision.

---

## 3. Plugins (`js/plugins/`, `js/plugins.js`)

### Counts
- **Total plugin files:** 174
- **Enabled in manifest:** 42
- **Disabled (but in manifest):** 18
- **Dormant (file exists, not in manifest):** ~114

### Enabled stack (full list)
**VisuMZ:**
CoreEngine, BattleCore, BattleSystemSTB, ElementStatusCore, EventsMoveCore, ItemsEquipsCore, MainMenuCore, MessageCore, SaveCore, SkillsStatesCore, QuestSystem, VisualBattleEnv, WeaponAnimation, VictoryAftermath, VisualStateEffects, SideviewBattleUI, ActSeqCamera, ActSeqImpact, BattleAI, WeaknessPopups, EncounterEffects, GabWindow, PictureCmnEvts

**CGMZ:**
Core, Encyclopedia, GameOver, MapNameWindow, ToastManager, FastTravel

**Custom (KB):**
KB_CoreEngine, KB_Optimized, KB_TitleCommands, KB_Localization, KB_Dev_Extractor

**Misc:**
GabeMZ_FollowersControl, GabeMZ_EventFloatingInfo, IgnisItemGoldPopup, MOG_TitleParticles, Public_0_PixiJsFilters, DragonSmoothCamera, schach-parsing, schach-pathfinding

### Issues
1. **Battle system mismatch:** STB enabled; GDD wants ATB. See `proposal.md` D1.
2. **No plugin** for: Bóng Tối gauge, Ngọc Hồn tracking, Summon system, Reputation system. These need either VisuMZ extensions or custom KB_ plugins.
3. **Duplicate file:** `EventSensorMZ.js  copy` (stray copy with double space).
4. **`--------------------------.js`** — a separator placeholder in the manifest.
5. **`FOSSIL.js`** — MV→MZ compatibility shim. Means some plugins originated from MV. Audit which ones still need it.
6. **Cleanup opportunity:** ~114 dormant plugins should be archived. See `proposal.md` D5.

### Plugins that may be useful but unused
- VisuMZ_2_BattleSystemATB (would resolve D1)
- VisuMZ_2_BattleSystemCTB (alternative)
- VisuMZ_3_PartySystem (party formation — but GDD says fixed party of 3, so maybe not)
- CGMZ_QuestSystem (currently using VisuMZ_2_QuestSystem; pick one)

---

## 4. Database state (`data/*.json`)

### Skills (`Skills.json`, 211 KB)
Large and populated — likely inherited from the older design. **Needs full audit** to determine which skills:
- Belong to Tuấn (Sơn Thần powers per GDD §6)
- Belong to Hải (Thủy Thần powers, Long Vương Chi Nộ, Tĩnh Tâm)
- Belong to Hoa (Healer skills, Thiên Tiên Hộ Mệnh)
- Are legacy from older Sơn Tinh design
- Are placeholder

### Items (`Items.json`, 17 KB) — 25 named items
Mostly RMMZ defaults: Potion, Super Potion, Full Potion, Magic Water, Stimulant, Dispel Herb.
**Missing all GDD §8 items:** Sách Ước, Ngọc Hồn, Hộ Mệnh Amulet, Trống Đồng Đông Sơn, etc.

### Weapons (`Weapons.json`, 14 KB) — 40 named
Default fantasy set (Short Sword, Long Sword, Mithril Sword, Dragon Blade, Wooden Staff, Magic Wand).
**Missing all GDD §8 weapons:** Búa Sơn Thần, Gậy Thần Sinh Tử, Thủy Xà Kiếm, Đồ Long Đao, Gậy Phép Mị Nương.

### Armors (`Armors.json`, 24 KB) — 86 named
RMMZ default armors. Includes a separator entry `-----Armors`. **Missing all GDD legendary accessories.**

### Enemies (`Enemies.json`, 5.8 KB) — 9 named
Goblin, Gnome, Crow, Treant, Hi_monster, Test, **Ga** (placeholder for Gà Chín Cựa?), **Voi** (placeholder for Voi Chín Ngà?), +1.
**Critical gap:** GDD wants Cao Biền (3-phase final boss), Mãng Xà (Ch.1B mini-boss), Thần Thú (3 summonable allies), zone monsters across 5 chapters.

### Troops (`Troops.json`, 5.4 KB) — 8 named
Goblin*2, Gnome*2, Crow*2, Treant, Hi_monster, Goblin x Crow, Test, Dramatic. **All placeholder.**

### States (`States.json`, 14 KB) — 27 named
Standard: Dead, Guard, Immortal, Poison, Blind, Silence, Rage, Confusion + 19 more. Could repurpose Confusion/Rage for Bóng Tối loss-of-control, but a custom state is cleaner.

### Common Events (`CommonEvents.json`, 398 KB) — 50 named of 100 slots

**Real game logic (4 events):**
- id=1 Call Button
- id=2 MenuSetting_Off (autorun)
- id=3 MenuSetting_On (autorun)
- id=4 QuestEnable

**VisuMZ battle action sequences (46 events):**
Weapon Attacks (6–21): Jump Attack, Flip Attack, Dash Through, High Jump, Teleport variants, Animation Sneak Attack
Unarmed (22–31): Tackle, Flip Bounce variants, Penalty Kick, Dash Flip
Magic (35–39): Float Cast, Dash Cast, Flip Cast
Ranged (45–47): Flip Shot, Dive Shot
Projectiles (55–59): Projectile, Flip/MGC variants
Mechanics (65–74): Elemental Slash, Crisis Attack, Random Slash, Nightmare, Flare Sword, Critical Smash

**Not present:** Any custom logic for Bóng Tối, Ngọc Hồn, Reputation, Moral choice, Summon, Sách Ước, chapter gating, or party-of-three management.

---

## 5. Maps (`data/Map*.json`)

| Map ID | Name | Events | Populated | Status |
|---|---|---|---|---|
| 1 | TanVien Mountain | 20 | 10 | **Test sandbox** — quest demo, toast notifications, LongLong NPC test |
| 2 | MAP002 | 14 | 14 | **Test sandbox** — full quest demo, follower recruitment test |
| 3 | Mountain God's Shrine | 11 | 9 | Prologue area, displayName still `{Map003_MapName}` placeholder |
| 4 | Road To The Shrine | 34 | 6 | Heavy WIP — most events are stubs |
| 5 | SonTinhHome | 0 | 0 | Dressing only, no events. BGM "Scene1_New" set |
| 6 | MAP006 | 0 | 0 | Empty placeholder |
| 7 | Prologue (parent map) | 0 | 0 | Empty placeholder |
| 8 | Chapter 1 (parent map) | 9 | 4 | Sparse |
| 9 | House 1 | 13 | 3 | Mostly stubs |
| 10 | House on the Hill | 2 | 0 | Tile-only |
| 11 | Peaceful Farm | 3 | 0 | Stubs |
| 12 | Hero's Hometown | 24 | 1 | Heavy placeholder |
| 13 | SonTinh's Town | 3 | 0 | Tile-only |
| 14 | Item Shop | 13 | 1 | Shop not wired |
| 15 | Weapon Shop | 10 | 6 | Partial — some logic |
| 16 | Inn 2F (id=16 has name "Inn 2F", parentId 19) | — | — | (cross-ref) |
| 17 | Dark Wood | 3 | 0 | Empty — encounters database-driven only |
| 18 | Major House Floor 2 | 15 | 0 | Tile-only |
| 19 | Inn 1F | 0 | 0 | Empty |
| 20 | MAP020 | 9 | 3 | Light pop |
| 21 | Resident House 1 | 0 | 0 | Empty |
| 22 | Major House Floor 1 | 0 | 0 | Empty (but System.json starts here!) |
| 23 | Resident House 1 (dupe) | 0 | 0 | Duplicate name |

**Totals:** ~167 event slots, ~68 with real logic (~40%).

### Missing locations (per GDD v3)
- Động Đình Hồ (Ch.1B Hải's solo area — Mãng Xà boss)
- Phong Châu (Ch.2 capital — kén rể event)
- Làng Ma Xá (Ch.2 — Rắn Thần / Sách Ước)
- Hậu Cung (Ch.3 — Ngọc Hoa flashback)
- Voi Chín Ngà sanctuary (Ch.4A)
- Gà Chín Cựa sanctuary (Ch.4B)
- Ngựa Chín Hồng Mao sanctuary (Ch.4C)
- Cao Biền's hideout (Ch.5 Final Dungeon, 5 floors)
- Tản Viên summit (Final boss arena)
- Modern setting maps (Prologue intro at school / mountain field trip)

---

## 6. Locales (`locales/`)

```
locales/
├── Map/        ← per-map translation CSVs
├── en/
├── vi/
├── charactor.csv   (sic — "character" misspelled in folder; unifies across locales?)
├── main.csv
└── title.csv
```

KB_Localization plugin is enabled — looks healthy. Will need new keys for:
- Three protagonist names (`{tuan}`, `{hai}`, `{hoa}`)
- New skill names, item names, location names
- All Chapter 1–5 dialogue

---

## 7. Switches & Variables (current)

**Switches defined (21):**
`Quest 1, LongQuest, findLong, Michau_onmap, EV004_autoevent, gather_party_horizon, Minimap, tailieu_hienthi, interest_point, bando_on, MenuSetting_off, MenuSetting_On, firerock, thuytinh_fall, mynuong_fall, sontinh_fall, shining_start, add loc`

Mix of legacy test switches (`LongQuest`, `findLong`, `Michau_onmap`) and meaningful flags (`thuytinh_fall`, `mynuong_fall`, `sontinh_fall`, `firerock`, `shining_start`).

**Variables defined (7):**
`Gold, Quest 1, Objective 1, findLong, takeLong, Menu, filter`

Mostly test/legacy.

### Missing per GDD
- Chapter progression: `current_chapter`, `chapter_clear_<n>`
- Bóng Tối gauge: `bongtoi_gauge` (0–100)
- Ngọc Hồn: `ngochon_son`, `ngochon_thuy`, `ngochon_phong` (booleans or counts)
- Reputation: per-NPC `rep_<npc>`
- Moral choice: `moral_sq04`, `moral_sq07`, etc.
- Side quest state: `sq_<id>_state`

---

## 8. Test / debug artifacts to clean up

- Actor 4 "tesst" — placeholder, should be deleted or repurposed
- Enemy "Test", "Hi_monster" — placeholders
- Troop "Test", "Dramatic" — placeholders
- Switches: `LongQuest`, `findLong` — test artifacts
- Variables: `findLong`, `takeLong`, `Menu`, `filter` — test artifacts
- Plugin file: `EventSensorMZ.js  copy` — duplicate
- Plugin file: `--------------------------.js` — separator
- Map 2 "MAP002" — heavy test content (LongLong demo)
- Map 23 — duplicate name with Map 21
- `startMapId: 22` (Major House 1F) — was probably set during testing

---

## 9. Items needing user decisions

These block real work and are tracked in `docs/proposal.md`:

1. **D1 — Battle system:** STB / ATB / CTB?
2. **D2 — Actor architecture:** Add Tuấn/Hải/Hoa as IDs 4/5/6, demote Sơn Tinh to NPC?
3. **D3 — Mobile design constraints:** PC-first vs mobile-aware?
4. **D4 — Map renaming:** Repurpose "SonTinhHome"/"Hero's Hometown" etc.?
5. **D5 — Plugin cleanup:** Archive 114 dormant plugins?

---

## 10. Recommended next steps

In order:
1. Resolve **D1** and **D2** (blockers for any combat/actor work)
2. Configure `System.json`: title, locale, partyMembers, startMapId
3. Build new actor entries Tuấn / Hải / Hoa + three new classes (Sơn Thần / Thủy Thần / Tiên)
4. Build Sơn Thần / Thủy Thần / Tiên skill sets (per GDD §6 stat profiles)
5. Build Bóng Tối Gauge system as custom KB_ plugin
6. Build Ngọc Hồn state-tracking common events
7. Begin Prologue content (modern intro + xuyên không cutscene)

Beyond next-steps, the bigger backlog lives in `docs/tasks.md`.
