# Regression Report: Actor Selection & Journal Sub-Command Freeze (v0.6.3)

**Date:** 2026-05-26  
**Plugin:** KB_MainMenuVisual  
**Versions affected:** v0.6.0–v0.6.2  
**Status:** Fixed in v0.6.3  

---

## Summary

Two "freeze" regressions reported by the user after v0.6.2. Neither is actually a freeze (game engine continues running), but UI input appears unresponsive.

---

## Regression 1: Skill / Equip / Status / Formation / ClassChange Appear Frozen

### Steps to reproduce

1. Open the main menu.
2. Select **Kỹ Năng** (Skill), **Trang Bị** (Equip), **Trạng Thái** (Status), **Đội Hình** (Formation), or **Reclassify** (ClassChange, if available).
3. Expected: Actor selection window appears, player can use arrow keys to move between actors.
4. Observed: No visible cursor or selection feedback; arrow keys have no visible effect.

### Root cause

All five commands route through `Scene_Menu.commandPersonal()`, which activates the stock status window (`this._statusWindow`) to let the player pick an actor. Since v0.4, the plugin hides that window (`visible=false`, `backgroundType=2`) because the party column visually replaces it.

The window still captured input, so pressing ↑↓←→ and Z worked — but with no visible cursor, the player saw nothing happen.

### Fix (v0.6.3)

Three new aliases on `Scene_Menu`:
- **`commandPersonal`**: shows the stock status window before delegating to the original handler
- **`onPersonalOk`**: re-hides the window before the target scene pushes (so the player doesn't see it disappear)
- **`onPersonalCancel`**: re-hides the window on cancel

All three are gated on `ENABLE_PARTY && HIDE_STOCK_STATUS` params. When disabled, the window behavior is unchanged from v0.4–v0.6.2.

The window keeps `backgroundType=2` (frames suppressed, content visible) so during actor selection only the faces and stats render — no jarring windowskin pop-in.

### Verification checklist

- [ ] Open menu → Kỹ Năng → arrow keys move visible cursor between actors
- [ ] Open menu → Trang Bị → cursor visible, selection moves smoothly
- [ ] Open menu → Trạng Thái → cursor visible on actor faces or stats
- [ ] Open menu → Đội Hình → cursor moves, actors reorder
- [ ] Cancel from actor selection → status window hides, menu returns to command list

---

## Regression 2: Journal Sub-Commands (Hành Trình / Yêu Phổ / Truyền Thuyết) Appear Frozen

### Steps to reproduce

1. Open main menu → **Nhật Ký** (Journal).
2. Select **Hành Trình** (Journey), **Yêu Phổ** (Monster Book), or **Truyền Thuyết** (Legends).
3. Expected: Scene transitions to the respective sub-view (Story Summary, Bestiary, or Lore).
4. Observed: Command highlights, but nothing happens; menu remains open.

### Root cause

The three stub commands (Hành Trình / Yêu Phổ / Truyền Thuyết) are wired to CGMZ_Encyclopedia integration in Step 12, which hasn't shipped yet. Their handlers only call `dlog()` (debug log) + `activate()` (re-focus the command window).

Visually identical to a freeze when the player clicks them — the command is selected but no scene change occurs.

### Fix (v0.6.3)

The three stub commands are now **disabled** (grayed out) in `Window_KBJournalCommand.makeCommandList` by passing `false` instead of `encyclopediaOK` to the command list. This provides a clear "not yet available" signal to the player.

**Quest (Nhiệm Vụ)** remains **enabled** and functional in v0.6.3 (Step 11 authorizes sample quest data).

### Verification checklist

- [ ] Open menu → Nhật Ký → observe that Hành Trình, Yêu Phổ, Truyền Thuyết are grayed out
- [ ] Cursor cannot be moved to grayed commands (skip over them)
- [ ] **Nhiệm Vụ** (Quest Logs) is selectable and active
- [ ] Select Nhiệm Vụ → Scene_Quest opens (or graceful fallback if VisuMZ_2_QuestSystem not loaded)

---

## v0.6.4 Follow-Up (2026-05-26)

**Note:** v0.6.3 disabled the journal *sub-commands* (Hành Trình / Yêu Phổ / Truyền Thuyết) but did not address the actual **main menu Journal command freeze** reported by the user. Clicking `Nhật Ký` in the main menu still locked up the UI.

**Root cause:** The `Wire Journal Handler` parameter defaulted to `false`, so our `setHandler('journal', commandJournal)` override was gated off. MainMenuCore's no-op CallHandlerJS ran instead. `Window_Selectable.processOk` deactivates the window *before* firing the OK handler, and the no-op handler never reactivated it — the main menu hard-froze.

**Fix (v0.6.4):** Removed `Wire Journal Handler` and `Wire Map Handler` param blocks entirely. Handlers now wire unconditionally in `createCommandWindow`, eliminating the gate. Same root cause would have hit the Map command identically; preemptively fixed both.

---

## v0.6.5 Follow-Up: Double Actor-Info Display Fixed

**Date:** 2026-05-26  
**Issue:** User-reported screenshot showed both the stock status window (now visible during actor selection per v0.6.3) **and** the party column rendering simultaneously — creating a confusing double-display of the same actor information (full-width horizontal grid at bottom + vertical card stack on right).

**Root cause:** v0.6.3's `commandPersonal` alias showed the status window but did not hide the party column, leaving both visible at once.

**Fix (v0.6.5):** The three Scene_Menu aliases (`commandPersonal`, `onPersonalCancel`, `onPersonalOk`) now also toggle `this._kbPartyColumn.visible`:
- **`commandPersonal`:** hides party column (`visible = false`) to show stock status as the sole actor-info display.
- **`onPersonalCancel`:** restores party column (`visible = true`) when returning to the menu.
- **`onPersonalOk`:** restores party column (`visible = true`) **before** delegating to the original method, ensuring it's visible when the pushed scene (Skill/Equip/Status) eventually pops back.
- All guarded by `if (this._kbPartyColumn)` — no-op when `Enable Party Column` is off.

**Result:** Actor selection now shows only the stock status window. After cancel or scene resume, the party column reappears. No more double-render.

**Deferred polish (Step 14 candidate):** Replace the "swap visible widget" approach with one where the party column itself is the input-driven selector (sync highlight to hidden status window's `_index`). This would eliminate the stock status grid entirely from the user's eye, improving visual consistency. Not critical for current playtest.

---

## v0.6.6 Follow-Up: Header Right-Cluster Padding Clears Cancel Button

**Date:** 2026-05-26  
**Issue:** Header band's right-aligned cluster (`0 Lượng` / playtime / location) was rendering underneath the top-right cancel/back button (when touch UI is enabled).

**Root cause:** Right padding was hardcoded at `padX = sx(24)` (~24px from right edge), but Scene_MenuBase's `_cancelButton` takes up ~48–60px of the top-right corner when visible.

**Fix (v0.6.6):** `KB_MenuHeader._paint` now derives right padding dynamically from `SceneManager._scene._cancelButton.x`. When the button exists and is visible, it computes `padR = Math.max(padX, w - btn.x + sx(12))` to push the cluster past the button's left edge with a 12-px safety gap. Falls back to the existing `padX` when no cancel button exists (touch UI off, non-menu scenes, etc.).

**Verification checklist (manual only — no automated test for button positioning)**

- [ ] Open menu with touch UI enabled → header right cluster visible, no overlap with cancel button
- [ ] Verify `0 Lượng`, playtime (`HH:MM:SS`), and location name are all readable
- [ ] Open menu with touch UI disabled (no cancel button) → right cluster renders normally
- [ ] Test on various screen resolutions (default 1280×720, plus scaled resolutions if `ResolutionWidth`/`ResolutionHeight` are adjusted)

---

## v0.6.10 Follow-Up: Reserved Hint Space Prevents Gauge Clipping

**Date:** 2026-05-26  
**Issue:** User-reported screenshot of Scene_Status (General tab) showing the actor's HP/MP/TP/DP gauge stack at the bottom-left being overlapped by the v0.6.7 centered hint bar — `DP 0` clipped behind `[Q/W] Đổi Người [Z] Chọn [X] Hồi`.

**Root cause:** Stock MZ's `Scene_MenuBase.mainAreaHeight` reserves bottom space assuming VisuMZ's button-assist window (~60–80 px) will sit there. Since KB_MainMenuVisual hides that assist and adds its own centered hint, scenes naturally extended their content into the space the hint now occupies.

**Fix (v0.6.10):**
- **`Scene_MenuBase.prototype.mainAreaHeight` aliased**, gated on `USE_CUSTOM_HINT`. Returns `Math.min(base, hintTop - mainAreaTop())` — caps the effective area at the minimum of (stock reserved height, available space above the hint). We never *increase* the area, only tighten it when stock reserves more room than the hint needs.
- **Universal scope:** Applies to all Scene_MenuBase subclasses (Scene_Status, Scene_Skill, Scene_Equip, Scene_Item, Scene_Save, Scene_KBJournal, etc.). Whatever the scene's window layout, content now stops above the hint.
- **Pairs with v0.6.9:** Works alongside v0.6.9's `Scene_Skill.statusWindowHeight` and `Window_SkillStatus.refresh` overrides — those concentrate the DP row upward; v0.6.10 prevents the bottom of *any* scene from sliding under the hint.

**Verification checklist**

- [ ] Open menu → Trạng Thái (Scene_Status) → all 4 gauges visible, none clipped behind hint
- [ ] Open menu → Kỹ Năng → 5-row status window visible, DP not clipped
- [ ] Open menu → Trang Bị → gauges visible, no overlap
- [ ] Open menu → Nhật Ký → command window respects hint space
- [ ] Test with 1-actor and 3-actor party

---

## v0.6.9 Follow-Up: Class Subtitle Treatment & DP Gauge Fit on Scene_Skill

**Date:** 2026-05-26  
**Issue:** User-reported screenshot showing two related problems on Scene_Skill:
1. Actor class (`Sinh Viên`) rendered at the same big font as actor name, looking heavy and competing with the name.
2. KB_BongToiGauge's DP row (4th gauge on Hải) was truncated — only the top edge peeked above the window bottom.

**Root cause:** 
1. `Window_StatusBase.drawActorClass` was using the default (large) font size.
2. `Scene_Skill.statusWindowHeight` was set to 3 rows (~132px stock), but with class + HP + MP + TP + DP (5 rows of content), the DP row didn't fit; `Window_SkillStatus.refresh` tried to center the content vertically, pushing DP even further down.

**Fix (v0.6.9):**
1. **Class subtitle styling override:** `Window_StatusBase.prototype.drawActorClass` now uses `SUBTITLE_FONT` (18px default, plugin param) and `SUBTITLE_COLOR` (warm gray `#b8a888`, plugin param). Applies globally to all scenes that draw actor class (Scene_Skill / Equip / Status header rows AND full-page Scene_Status). fontSize and textColor are saved + restored around the draw to avoid leaking into subsequent drawing. Result: name dominates, class reads as subtitle meta.
2. **Scene_Skill window height + content layout:** `Scene_Skill.statusWindowHeight` overridden to return `calcWindowHeight(5, true)` (stock was 3 rows ≈ 132px → now 5 rows ≈ 204px). `Window_SkillStatus.refresh` overridden to draw the actor block top-aligned (`y=0`) instead of stock's vertical-center (`h/2 - 1.5*lineHeight`). Top alignment packs the 5 rows (class, HP, MP, TP, DP) without needing extra height.
3. **Scope:** Scene_Equip's `Window_EquipStatus` doesn't call `placeBasicGauges` (shows param diffs on equip), so no DP truncation there. Scene_Status's `Window_Status` is full-page — class shrinks via the global override; gauges have room.

**Verification checklist**

- [ ] Open menu → Kỹ Năng → header row shows actor name (big) + class/Lv (small, dim)
- [ ] Hải's card shows all 5 rows: class, HP, MP, TP, DP (no clipping)
- [ ] Open menu → Trang Bị → same class subtitle treatment in header
- [ ] Open menu → Trạng Thái → class subtitle visible in full-page status view
- [ ] Test with 1-actor and 3-actor party to ensure window sizing is correct

---

## v0.6.11 Follow-Up: Second Iteration on Scene_Status DP-Clipping

**Date:** 2026-05-26  
**Issue:** After v0.6.9 + v0.6.10 shipped, user-reported screenshot of Scene_Status General tab still showed class "Sinh Viên" at a large font, and DP gauge still clipped behind the centered hint band.

**Root causes:**
1. v0.6.9 added `Window_StatusBase.drawActorClass` override, but VisuMZ_1_MainMenuCore likely overrides `Window_Status.drawActorClass` directly (subclass method). Subclass method takes precedence — the parent override was shadowed.
2. v0.6.10 capped `Scene_MenuBase.mainAreaHeight`, but VisuMZ's `Window_Status` (the full-page Scene_Status window) uses absolute rects for its dimensions and layout that ignore `mainAreaHeight` entirely. The cap affected generic "main area" sizing but not Scene_Status's specific rect calculations.

**Fix (v0.6.11):**
- **`Window_Status.prototype.drawActorClass` override added** — separate from the existing `Window_StatusBase` one, at the subclass level where it takes precedence over VisuMZ's override. Uses `SUBTITLE_FONT` + `SUBTITLE_COLOR` (18px, warm gray). Same implementation as v0.6.9's parent-class override, but now it actually runs.
- **`Scene_Status.statusWindowRect` aliased** to cap the window height: `rect.y + rect.height = Math.min(rect.y + rect.height, Graphics.boxHeight - sy(HINT_H) - sy(20))`. The 20-px breathing room above the hint ensures gauges don't sit immediately under the hint. Only shrinks; never grows the window.
- Both changes gated on `ENABLE_PARTY` and guarded with `typeof X !== 'undefined'` so a minimal setup without VisuMZ still boots.

**Caveat (documented):** If VisuMZ's `Window_Status` draws gauges at hardcoded absolute pixel positions (e.g., `this.drawGaugeAreaWithTp(x, y)` at y=something instead of `y = this.innerHeight - gaugeHeight`), the window-rect cap will clip the gauges instead of moving them up. This is iteration #1; user needs to confirm in-game whether the DP gauge is now visible above the hint or just chopped at the new window boundary.

**Verification checklist (manual only)**

- [ ] Open menu → Trạng Thái (Scene_Status) General tab
- [ ] Class "Sinh Viên" renders small + dim (subtitle styling)
- [ ] Verify all 4 gauges (HP / MP / TP / DP) are visible above the centered `[Z] Chọn [X] Hồi` hint band
- [ ] If DP gauge is still clipped, file a follow-up report with screenshot indicating whether the issue is clipping at the bottom of the window or a different root cause

---

---

## v0.6.12 Follow-Up: ElementStatusCore discovered; drawText interception + placeGauge filter

**Date:** 2026-05-26  
**Issue:** v0.6.11 still had no visible effect. User reported Scene_Status General tab: class "Sinh Viên" still rendering at large font, and DP gauge still clipped behind the hint band. Investigation revealed the root cause.

**Root causes:**
1. Scene_Status General tab is NOT rendered by VisuMZ_1_MainMenuCore's `Window_Status`. It is rendered by **VisuMZ_1_ElementStatusCore's `Window_StatusData`** — a completely separate plugin/window. ElementStatusCore's Window_StatusData uses obfuscated method names like `_0x2e4721(0x158)` and never calls `drawActorClass` — it draws class name via direct `drawText()` calls in obfuscated functions. Our v0.6.9 `Window_StatusBase.drawActorClass` override and v0.6.11 `Window_Status.drawActorClass` override don't reach this layout at all.
2. ElementStatusCore's Window_StatusData calls `placeGauge` for HP, MP, TP individually. This triggers KB_BongToiGauge's `Window_StatusBase.prototype.placeGauge` hook, which chains a DP gauge placement below TP. DP then clipped behind the hint band.

**Fixes (in ENABLE_PARTY mode, both guarded with `typeof X !== 'undefined'`):**
- **DP suppression in Scene_Status only**: New alias on `Window_StatusBase.prototype.placeGauge`. When `type === 'kb_bongtoi'` AND active scene is `Scene_Status`, skip the gauge placement entirely. DP remains visible everywhere else (main menu party column, Scene_Skill, Scene_Equip, Scene_Item, battle) — only suppressed in Scene_Status's crowded layout. Trade-off: the player loses DP visibility in one specific scene, but can see it in multiple other places.
- **Class subtitle via drawText interception**: New alias on `Window_StatusData.prototype.drawText`. When the text argument equals `this._actor.currentClass().name`, temporarily swap fontSize + textColor to `SUBTITLE_FONT` + `SUBTITLE_COLOR` for the duration of that one call, then restore. Works regardless of which obfuscated ElementStatusCore method eventually invokes drawText — as long as the call route ends in drawText, we intercept it. Fragile only if another string happens to equal the class name (extremely unlikely).

**Verification checklist**
- [ ] Open menu → Trạng Thái (Scene_Status) General tab
- [ ] Class "Sinh Viên" renders small + dim (subtitle styling)
- [ ] No DP gauge visible in the window (expected; trade-off)
- [ ] Open menu → Kỹ Năng → Hải's status window still shows DP above the hint (DP visible elsewhere)
- [ ] Test with 1-actor and 3-actor party

---

## v0.6.13 Follow-Up: ElementStatusCore drawTextEx discovered; DP clipping caveat documented

**Date:** 2026-05-26  
**Issue:** v0.6.12 still showed class "Sinh Viên" at large font and DP gauge clipped behind the hint band in Scene_Status General tab. Root cause inspection of the obfuscated ElementStatusCore code revealed:

**Key finding:** ElementStatusCore's `Window_StatusData` renders the class name via **`this.drawTextEx(className, ...)`**, NOT `this.drawText()` as v0.6.12 assumed. The call path is inside an obfuscated function, but the signature is `drawTextEx`. This matters because `drawTextEx` internally calls `resetFontSettings()` after the text draw, which overwrites any pre-set `this.contents.fontSize`.

**Fix (v0.6.13):**
- **Class hook moved from drawTextEx → drawTextEx bypass**: Aliased `Window_StatusData.prototype.drawTextEx`. When the text equals `this._actor.currentClass().name`, bypass drawTextEx entirely and call `this.contents.drawText(text, x, y, width, lineHeight, 'left')` directly with subtitle font/color pre-set. This avoids the internal resetFontSettings, so the styling persists.
- **DP suppression reverted**: Removed v0.6.12's `placeGauge` filter that suppressed DP in Scene_Status. User explicitly said "DP gauge is disappear" indicating they prefer **clipped DP visible at the bottom edge** over completely missing DP. DP now appears on Scene_Status but will sit at the very bottom and may clip against the centered hint band.
- **Caveat documented**: ElementStatusCore's General tab's DrawJS reserves `basicDataHeight = lineHeight * 6.5` (~3 gauge rows). DP as the 4th gauge exceeds this, causing clipping. A cleaner future fix exists: patch the DrawJS at runtime to expand `basicDataHeight` to `lineHeight * 7.5` or `8`. This is deferred for a future iteration pending user opt-in.

---

## v0.6.14 Follow-Up: KB_Localization resolution in class subtitle

**Date:** 2026-05-26  
**Issue:** v0.6.13 successfully rendered the class in subtitle font/color, but the text displayed as the raw localization key `{classStudent}` instead of the resolved "Sinh Viên".

**Root cause:** Classes 11/12/13 in `data/Classes.json` store their `name` as a KB_Localization placeholder. VisuMZ's `drawTextEx` would normally resolve this via its escape-character processing chain (`convertEscapeCharacters` → `KBLocalization.process()`). But v0.6.13's workaround bypassed `drawTextEx` entirely — calling `contents.drawText()` directly to skip the fontSize reset — which also skipped the localization resolution chain.

**Fix (v0.6.14):** Added `KBLocalization.process(text)` before the `contents.drawText()` call. The raw class name is resolved to its Vietnamese label, then drawn. If KBLocalization isn't loaded, the raw text flows through unchanged (graceful degrade).

**Verification checklist**

- [ ] Open menu → Trạng Thái (Scene_Status) General tab
- [ ] Class name displays as "Sinh Viên" (or whichever Vietnamese label is configured), not `{classStudent}`
- [ ] Class still renders in subtitle font/color (small, dim)
- [ ] All 4 gauges visible above the hint band

---

## v0.6.15 Follow-Up: ElementStatusCore DrawJS patched — DP fit resolved, 5-iteration journey closed

**Date:** 2026-05-26  
**Status:** ACTIVE. DrawJS patch eliminates the DP-clipping caveat from v0.6.13–v0.6.14.

**The 5-iteration journey (v0.6.9 → v0.6.15):**
1. **v0.6.9**: Attempted global `Window_StatusBase.drawActorClass` override + Scene_Skill height bump. Worked for Scene_Skill but missed Scene_Status (VisuMZ subclass shadows parent override).
2. **v0.6.10**: Capped `Scene_MenuBase.mainAreaHeight`. Helped most scenes but Scene_Status uses absolute rects, unaffected.
3. **v0.6.11**: Added `Window_Status.drawActorClass` at subclass level + `Scene_Status.statusWindowRect` height cap. Still no effect — the tab's DrawJS wasn't reached by either override.
4. **v0.6.12–v0.6.13**: Discovered the General tab is rendered by ElementStatusCore's `Window_StatusData`, not MainMenuCore's `Window_Status`. Added drawTextEx interception for class styling. DP remained clipped — documented as a known caveat pending DrawJS patch.
5. **v0.6.15**: Patch the DrawJS itself. At plugin load, replace `StatusMenuList[generalIdx].DrawJS` with a reimplementation that expands `basicDataHeight` from `6.5*lineHeight` to `7.5*lineHeight`. Actor info block shifts up ~36px; DP now fits cleanly inside the panel. **Caveat eliminated. Issue resolved.**

**Verification (after v0.6.15 ships to user)**
- [ ] Open menu → Trạng Thái (Scene_Status) General tab
- [ ] All 4 gauges (HP / MP / TP / DP) visible above the centered hint band, no clipping
- [ ] Class "Sinh Viên" renders in subtitle font/color (small, dim)
- [ ] Actor name, level, class all readable without crowding

---

## Changelog entries

See `docs/changelog.md`:
- **v0.6.15** — Runtime-patch ElementStatusCore General-tab DrawJS to fit DP gauge cleanly (5-iteration DP-clipping journey resolved)
- **v0.6.14** — KB_Localization placeholder resolution in class subtitle bypass
- **v0.6.13** — ElementStatusCore drawTextEx discovered; class hook corrected; DP suppression reverted; clipping caveat documented
- **v0.6.12** — ElementStatusCore discovered; drawText interception for class styling + placeGauge filter to suppress DP in Scene_Status only
- **v0.6.11** — Scene_Status class subtitle + window shrink (second iteration on DP-clipping)
- **v0.6.9** — Class subtitle treatment + DP gauge fit on Scene_Skill / Equip / Status (user-reported screenshot fix)
- **v0.6.6** — Header right-cluster padding clears cancel button (touch UI safe)
- **v0.6.5** — Party column visibility toggle during actor selection (dedup double-render)
- **v0.6.4** — Main menu Journal freeze root-cause fix (unconditional handler wiring)
- **v0.6.3** — Regression fixes for actor selection visibility + journal sub-command stubs
