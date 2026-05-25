# Open Proposals & Decisions

Open architectural / scope decisions awaiting user input. When a decision is made, move it to `docs/changelog.md` and update `docs/design.md`.

---

## RESOLVED — Engine choice: RPG Maker MZ (not Unite)

**Date:** 2026-05-25
**Decision:** Stay on MZ.
**Why:**
- GDD v3 is MZ-shaped (names VisuStella/Yanfly plugins, common events, switches/variables)
- 437MB of existing work + 174 plugins in place
- No migration path — Unite is Unity-based, full rewrite required
- Unite has thin plugin ecosystem and rough reception since 2024 launch
- 2D top-down ATB JRPG is MZ's sweet spot

---

## RECOMMENDED — Decision 1: Battle System — STB vs ATB

**Date proposed:** 2026-05-25
**Recommendation:** **C — CTB (`VisuMZ_2_BattleSystemCTB`)**
**Reasoning:** Honors GDD §7 SPD-driven intent without ATB's real-time balancing headaches. FFX-style.

**Action needed (user, via MZ editor Plugin Manager):**
1. Open Plugin Manager
2. Disable `VisuMZ_2_BattleSystemSTB`
3. Find `VisuMZ_2_BattleSystemCTB` (in `js/plugins/`) and enable it
4. Save

Until done, combat will use STB.

---

## RESOLVED — Decision 2: Actor architecture

**Date:** 2026-05-25
**Decision:** **B (revised) — repurpose existing actor slots, not add new IDs.**

**Why the change:** Initial recommendation was to add new actors 4/5/6 to preserve existing references. After auditing `locales/charactor.csv` and `Map003_MountainGodShrine.csv` dialogue, we discovered:
- The i18n key `{sontinh}` already displays as "Nguyễn Tuấn" — Actor 1 IS Tuấn, named after his power source.
- Prologue dialogue (`\N[1]`, `\N[2]`, `\N[3]`) on Map 3 already has three students entering the shrine.
- Actor 3 `{thuytinh}` displayed as "Tùng Long" (old name for Hải in earlier draft).

**Implemented:**
- Actor 1 (Tuấn, `{sontinh}`) reclassed Swordsman (1) → Sơn Thần (11)
- Actor 3 (Hải, `{thuytinh}`) reclassed Student (10) → Thuỷ Thần (12); locale name "Tùng Long" → "Giang Hải"
- Actor 4 (was "tesst") → Ngọc Hoa, classId Tiên (13); locale key `{hoa}`
- Actor 2 (Mỵ Nương) preserved as-is for existing prologue events
- `partyMembers: [1, 3, 4]`

**Note:** Actor 2 (Mỵ Nương) remains as a prologue character (modern friend who gets isekai'd along with the others). GDD v3 needs Mỵ Nương as the princess in the past arc — this can be reconciled by treating modern Mỵ Nương and past-princess Mỵ Nương as the same soul / reincarnation. Narrative resolution TBD.

---

## OPEN — Decision 3: Mobile port timeline

**Current state:** GDD §1 lists "Mobile port tùy chỉnh sau" (mobile port — later).
**Question:** Do we need to design map sizes, UI scale, and controls with mobile in mind now, or strictly PC-first?

**Recommendation:** PC-first; design with **scalable UI** (use VisuMZ_0_CoreEngine resolution scaling) so a later port is feasible without re-doing maps.

**Needs:** Confirmation.

---

## OPEN — Decision 4: Map naming & repurposing

**Current state:** Maps named "SonTinhHome", "SonTinh's Town", "Hero's Hometown", "Peaceful Farm" reflect older Sơn-Tinh-as-hero design.

**Options:**
- **A. Rename in-place** — "SonTinh's Town" → e.g. "Tản Viên Village" / "Phong Châu Outskirts"
- **B. Keep names** — Sơn Tinh DOES live in his own home in GDD v3; some names may still fit
- **C. Build new + archive old** — fresh Văn Lang maps, keep old as reference

**Recommendation:** **A** for towns Tuấn visits in Ch.1–2; **B** for Sơn-Tinh-specific (his shrine, his home). Defer detailed plan until story flow is finalized in `docs/design.md`.

**Needs:** Confirmation before any rename.

---

## OPEN — Decision 5: Plugin cleanup

**Current state:** 174 plugin files in `js/plugins/`, only 42 enabled.

**Question:** Delete the dormant 132? Some are likely experiments, some FOSSIL-compatibility MV ports, some duplicates (`EventSensorMZ.js copy`).

**Recommendation:** Move dormant plugins to `js/plugins/_archive/` (don't delete yet) — preserves the option to re-enable while keeping the active set obvious. Delete obvious duplicates and the `--- separator ---` placeholder.

**Needs:** Confirmation before any move.
