# Design Overview — Sơn Thuỷ Ký

> High-level architecture and how GDD v3 systems map onto RPG Maker MZ.
> Detailed audit lives in `docs/spec/audit-v1.md`.

## Story shape

Prologue → Ch.1 (split path Tuấn/Hải) → Ch.2 (party of 2) → Ch.3 (party of 3 forms) → Ch.4 (non-linear 3 arcs) → Ch.5 (final dungeon + 3-phase boss) → Epilogue.

| Chapter | Party | Key gate | New mechanic introduced |
|---|---|---|---|
| Prologue | Tuấn solo | Bản đồ cổ + activate seal | Modern → Văn Lang transition |
| Ch.1 | 1A Tuấn + Sơn Tinh / 1B Hải solo | 4/5 village quests, Mãng Xà defeated | ATB combat tutorial, Reputation |
| Ch.2 | Tuấn + Hải | Kén rể won, bẫy rượu witnessed | Bóng Tối Gauge, Sách Ước |
| Ch.3 | Tuấn + Hải + Hoa | Flashback complete, Vua Hùng meeting | Party-of-3, World Map open |
| Ch.4 | 3 (non-linear) | All 3 Thần Thú rescued + Ngọc Hồn full | Summon system, weapon upgrades |
| Ch.5 | 3 | Cao Biền defeated, Mỵ Nương alive | Final boss mechanics |
| Epilogue | 3 | Return cutscene | — |

## Systems map (GDD §7 → MZ implementation)

| GDD System | MZ Implementation Strategy | Status |
|---|---|---|
| **ATB Gauge** | Swap STB → `VisuMZ_2_BattleSystemATB` (or CTB as middle ground). SPD stat drives fill. | **Pending D1** |
| **Element Triangle** | Use System.json elements 5/6/2/7/8/9. Skill `damage.elementId` + enemy weakness traits. ×1.5 weakness via VisuMZ default. | Engine ready, content TBD |
| **Party (fixed 3)** | `partyMembers: [tuanId, haiId, hoaId]`. Disable formation menu via `optExtraExp`/VisuMZ_3_PartySystem (or just hide). | Pending D2 |
| **Bóng Tối Gauge** | Custom KB_BongToiGauge plugin. Variable `bongtoi_gauge` 0–100. State 28 (Bóng Tối Bùng Phát) triggers overflow; Long Vương Chi Nộ (skill 490) fills, Tĩnh Tâm (skill 491) decrements. Rendered as `Sprite_KBBongToiGauge` (MZ gauge sprite) placed below TP in battle status (works with both default and VisuMZ SideviewBattleUI). | **v1.1 shipped** (v1.0 text-suffix approach replaced by sprite gauge) |
| **Ngọc Hồn** | Key item (Ch.2) → accessory (Ch.4-END). Track collection via 3 switches: `ngochon_son`, `ngochon_thuy`, `ngochon_phong`. Plugin auto-converts when all three on. | **v1.0 built** (item/armor IDs TBD) |
| **Sách Ước** | Out-of-combat key item. Per-chapter use counter (variable). Three modes: party heal, item summon, gate open. Menu integration via VisuMZ_1_MainMenuCore. | **Not built** |
| **Summon System** | Each Thần Thú = a skill (single-use per battle). Implement via Skill `Effect: Common Event` calling AoE damage + buff. Track availability per-battle via state. | **Not built** |
| **Reputation** | Per-NPC variable `rep_<id>`. Branching dialogue checks rep. Shop discounts via item price modifiers. | **Not built** |
| **Học Sách Cổ** | 12 hidden books as key items. Each unlocks a skill via common event on pickup. | **Not built** |

## Character architecture (GDD §6 → MZ data)

### Actors (implemented 2026-05-25)

| ID | Display name | i18n key | Class ID | Element |
|---|---|---|---|---|
| 1 | Nguyễn Tuấn | `{sontinh}` (power source key — display via locale) | 11 Sơn Thần | Earth |
| 2 | Mỵ Nương | `{mynuong}` | 10 Student (NPC use) | — |
| 3 | Giang Hải | `{thuytinh}` (power source key — display via locale) | 12 Thuỷ Thần | Water |
| 4 | Ngọc Hoa | `{hoa}` | 13 Tiên | Light |

**Notes:**
- The i18n keys for actors 1/3 use the power-source name (`sontinh`/`thuytinh`), not the character name. This is historical from an earlier draft. The display name comes from `locales/charactor.csv`. Don't rename these keys without auditing all event references.
- Sơn Tinh and Thuỷ Tinh as gods are NPCs only — they appear in events but aren't separate actor entries.
- `partyMembers: [1, 3, 4]`. Hoa is hidden from the party UI via `hoa_in_party` switch until Ch.3.

### Stat curves (target)

| Actor | HP | MP | ATK | MAG | DEF | MDF | SPD |
|---|---|---|---|---|---|---|---|
| Tuấn | High (1.2x) | Mid | Mid | Low | High | Mid | Low |
| Hải | Mid | High | High | High | Mid | Mid | High (1.3x) |
| Hoa | Mid | High | Low | High (1.2x heal) | Mid | High | Mid |

> Exact curves to be tuned during Ch.1 balancing. Use VisuMZ_1_SkillsStatesCore notetags for class scaling.

## Plugin architecture

### Layer 0 — Engine core (do not modify)
- `js/rmmz_*.js` — RPG Maker MZ engine
- `js/main.js`, `js/libs/`
- `VisuMZ_0_CoreEngine`, `KB_CoreEngine`, `KB_Optimized`

### Layer 1 — Combat
- `VisuMZ_1_BattleCore` + ActSeqCamera + ActSeqImpact + WeaponAnimation
- `VisuMZ_2_BattleSystemSTB` → planned swap to **ATB or CTB**
- `VisuMZ_3_SideviewBattleUI`, `WeaknessPopups`, `VictoryAftermath`, `BattleAI`

### Layer 2 — World
- `VisuMZ_1_EventsMoveCore`, `EncounterEffects`, `VisualBattleEnv`
- `GabeMZ_FollowersControl`, `EventFloatingInfo`
- `schach-pathfinding`, `DragonSmoothCamera`

### Layer 3 — UI / UX
- `VisuMZ_1_MainMenuCore`, `MessageCore`, `SkillsStatesCore`, `ItemsEquipsCore`
- `CGMZ_MapNameWindow`, `CGMZ_ToastManager`, `CGMZ_GameOver`, `CGMZ_FastTravel`
- `KB_TitleCommands`, `KB_MainMenuVisual`, `MOG_TitleParticles`

### Layer 4 — Game systems
- `VisuMZ_2_QuestSystem` (active — pick one over CGMZ_QuestSystem)
- `CGMZ_Encyclopedia`
- `KB_Localization` (vi/en CSV-driven)

### Layer 5 — Custom (to be built)
- **`KB_BongToiGauge.js`** — ✓ Hải's darkness meter (v1.0 shipped)
- **`KB_NgocHonState.js`** — ✓ Soul Jade tracking + 3-shard convergence (v1.0 shipped)
- **`KB_SummonSystem.js`** — Thần Thú once-per-battle
- **`KB_Reputation.js`** — NPC rep tracking + shop modifiers
- (Optionally) `KB_MoralChoice.js` — central tracker for ending paths

> Naming convention: all our custom plugins use `KB_` prefix. Follow VisuMZ parameter style for consistency.

## Save data shape (target)

Beyond default RMMZ save fields, our save must persist:
- `current_chapter` (variable)
- All `chapter_clear_*` switches
- `bongtoi_gauge` (variable)
- `ngochon_*` switches
- All `rep_*` variables
- All `sq_*_state` variables
- All `moral_*` choice variables

RMMZ persists switches/variables by default — no custom save logic needed if we stick to native primitives.

## Open questions

See `docs/proposal.md` for active decisions. Update `docs/changelog.md` when resolved.
