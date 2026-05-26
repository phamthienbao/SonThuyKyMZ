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

## v0.6.17 Follow-Up: Button-assist ghost frame killed

**Date:** 2026-05-26  
**Issue:** User-reported screenshot showed a thin empty rectangle visible above the centered `[Z] Chọn  [X] Hồi` hint band on every menu scene.

**Root cause:** When we hide VisuMZ's button-assist window in v0.6.7's `Scene_MenuBase.create` alias, we only set `visible = false` + `deactivate()`. The windowskin frame sprite kept rendering as a hairline outline, leaking through above our hint.

**Fix (v0.6.17):** Added `setBackgroundType(2)` to the hide block. Same trick we use on the stock status window in v0.5.5 — `setBackgroundType(2)` drops the windowskin frame entirely. Combined with `visible = false` the assist is fully suppressed.

**Verification checklist**
- [ ] Open menu → no thin empty rectangle above the centered hint band on any menu scene
- [ ] Open menu → Scene_Status (Trạng Thái) → no ghost frame visible above hint
- [ ] Open menu → Scene_Skill (Kỹ Năng) → hint clean, no seams

---

## v0.6.16 Follow-Up: Formation (Đội Hình) freeze fix — missed-sibling regression

**Date:** 2026-05-26  
**Issue:** User reported a second freeze when selecting the Formation (Đội Hình) command from the main menu. After clicking it, the UI appeared frozen and unresponsive.

**Root cause:** Same pattern as the v0.6.3 Skill/Equip/Status freeze, but **missed because Formation uses a separate entry point**. All five commands activate the stock status window for actor selection:
- Skill / Equip / Status / ClassChange route through `Scene_Menu.commandPersonal()`
- **Formation routes through a separate `Scene_Menu.commandFormation()`** (a distinct method in the MZ engine)

v0.6.3–v0.6.5 aliased `commandPersonal()` to show the status window and hide the party column, but did **not** alias `commandFormation()`. When the player clicked Formation, the status window activated invisibly (we still hid it), and input was captured with no visual feedback — identical to the v0.6.3 freeze.

**Fix (v0.6.16):**
- **`Scene_Menu.prototype.commandFormation` aliased** — shows the stock status window and hides the party column (identical to the `commandPersonal` alias).
- **`Scene_Menu.prototype.onFormationCancel` aliased** — detects the exit-formation branch by checking `!this._statusWindow.active` *after* the original runs. When exiting:
  1. Re-hides the status window.
  2. Restores party column visibility (`visible = true`).
  3. Calls `this._kbPartyColumn.refresh()` so the column reflects any party reorder that occurred during the formation-swap session.
- **`onFormationOk` NOT aliased** — status window stays active in both branches (clear-pending and do-swap), so no special handling needed on OK.
- All three guarded by `ENABLE_PARTY && HIDE_STOCK_STATUS` with defensive guards on `_kbPartyColumn` and `refresh` presence.
- **Window** still uses `backgroundType=2` (frames suppressed) for smooth UX.

**Result:** Formation now behaves identically to Skill/Equip/Status — stock status window visible for actor selection, party column hidden; on cancel/return, party column restored with correct party order.

**Verification checklist**
- [ ] Open menu → Đội Hình → cursor visible, can move between actors
- [ ] Select an actor to reorder → swap happens, selection highlights another actor
- [ ] Cancel from actor selection → status window hides, menu returns to command list, party column reappears in new order
- [ ] Test with 2-actor and 3-actor party to confirm reorder persists

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

## v0.6.19 Follow-Up: Ghost frame fix continued — timing miss + refresh leak hypotheses addressed

**Date:** 2026-05-26  
**Issue:** Rectangle still visible above the centered hint band after v0.6.17 + v0.6.18. Both previous fixes applied `setBackgroundType(2)` to suppress windowskin frames, but the ghost rectangle persisted.

**New hypotheses:**
1. **Timing:** VisuMZ_0_CoreEngine likely creates the button-assist window mid-`Scene_MenuBase.create()` AFTER our Scene_MenuBase.create alias has already run. Our hide call (`setBackgroundType(2)`) fires before the window even exists, so it never reaches the actual window instance.
2. **Refresh leak:** Even when `setBackgroundType(2)` is called *after* the window is created, VisuMZ's `update()` loop may re-invoke `_refreshBack()` each frame, re-applying the frame sprite even though we disabled it.

**Fix (v0.6.19 — belt-and-suspenders approach):**
- Factored the assist-hide logic into a new `_kbNukeAssist(scene)` helper function. The helper does four things in sequence: `visible=false` + `deactivate()` + `setBackgroundType(2)` + `move(x, y, 0, 0)` (0×0 dimensions). Even if one approach fails, the 0×0 window has no pixels to render.
- Helper is called from TWO places now:
  1. **`Scene_MenuBase.create` alias (existing)** — catches the window if it exists early.
  2. **NEW `Scene_MenuBase.start` alias** — fires once after the *entire* create chain has finished, guaranteeing the assist window is fully initialized by then (even if VisuMZ_0_CoreEngine creates it mid-chain).
- Since `start()` runs after all child-class `create()` methods complete, the timing miss is eliminated. The 0×0 move() ensures refresh leak doesn't matter — nothing renders from a zero-dimension window.

**Verification checklist**
- [ ] Open menu on any map → centered hint band clean, no thin rectangle above it
- [ ] Open menu → close → open again → no frame artifacts
- [ ] Test across multiple scenes (Skill, Equip, Status, Item, Save, Journal, Quest, etc.)
- [ ] Test on multiple maps with different backgrounds

---

## v0.6.18 Follow-Up: Ghost frame continued — Playtime/Variable/Gold windows

**Date:** 2026-05-26  
**Issue:** Rectangle still visible above the centered hint band after v0.6.17's fix. v0.6.17 added `setBackgroundType(2)` to the button-assist hide block, but the leaking frame persisted.

**Root cause:** The real culprit was not the button-assist window — it was the three VisuMZ MainMenuCore windows suppressed in the `HEADER_HIDE_BARS` block:
1. `_playtimeWindow` (displays playtime)
2. `_variableWindow` (displays the tracked variable)
3. `_goldWindow` (displays gold amount)

These three are hidden on `Scene_Menu` via the existing `HEADER_HIDE_BARS` condition (v0.5.1), which calls `hide()` + `deactivate()` on each, but did **not** call `setBackgroundType(2)`. The windowskin frames persisted as hairline outlines, leaking through above the hint band.

**Fix (v0.6.18):** Inside the `HEADER_HIDE_BARS` loop (within `Scene_Menu.create` alias), added `w.setBackgroundType(2)` alongside the existing `hide()` + `deactivate()`. All three windows' frame sprites are now suppressed; the rectangle is gone.

**Scoping:** Only applied in Scene_Menu. These three windows only exist in MainMenuCore's setup and only on Scene_Menu, so the fix is narrow and safe.

**Verification checklist**
- [ ] Open menu on any map → centered hint band clean, no thin rectangle above it
- [ ] Open menu → close menu → open again → no frame artifacts
- [ ] Test on multiple maps with different backgrounds

---

## v0.6.20 Follow-Up: Ghost frame iteration #4 — dimension nuke + debug dump

**Date:** 2026-05-26  
**Issue:** Rectangle still visible above the centered hint band after v0.6.17–v0.6.19. Previous attempts using `setBackgroundType(2)` and dimension zeroing on button assist did not fully eliminate the frame.

**Two more things this round:**
1. **Extended dimension-nuke to Playtime/Variable/Gold windows:** v0.6.18 had added `setBackgroundType(2)` to the three VisuMZ MainMenuCore windows hidden in the `HEADER_HIDE_BARS` block, but did not apply `move(x, y, 0, 0)` to nuke their dimensions. Now both fixes are applied: the trio gets `setBackgroundType(2)` + `move(x, y, 0, 0)` (matching the v0.6.19 treatment on button assist). 0×0 dimensions guarantee no pixels render, regardless of frame sprite state.

2. **Debug instrumentation (gated on Debug Logging plugin param):** Added a one-shot debug dump on `Scene_MenuBase.start` that walks `this._windowLayer.children` and warns every child whose bottom edge sits within 100px of the hint top. For each suspect, logs: class name, x/y/w/h, visible state, and _backgroundType value. If the rectangle persists after the dimension-nuke, the user can flip Debug Logging on in Plugin Manager, open the menu, and check the console to identify the exact culprit by name.

**Verification checklist**
- [ ] Open menu on any map → centered hint band clean, no thin rectangle above it
- [ ] Test across multiple scenes and maps as before
- [ ] If rectangle still visible: enable `Debug Logging: true` in KB_MainMenuVisual params, open menu, check console for window names/dimensions to identify culprit

---

## v0.6.21 RESOLUTION: Ghost frame root cause identified and suppressed

**Date:** 2026-05-26  
**Status:** RESOLVED  
**Journey summary:** 5 iterations spanning v0.6.17 → v0.6.21

**The culprit:** v0.6.20's debug dump output revealed the actual ghost-frame source — a raw `Window_Base` instance (not a named subclass) positioned at (x=240, y=641, w=536, h=60), visible=true, with no backgroundType set. This is a leftover popup window — likely from CGMZ_MapNameWindow, IgnisItemGoldPopup, or a similar map-side plugin that doesn't tear down properly on scene transition.

**Why previous fixes missed it:**
- v0.6.17–v0.6.19 targeted the button-assist window and three MainMenuCore windows by name — but the real culprit was an *unnamed* bare `Window_Base` instance created somewhere else in the plugin stack.
- The debug dump's class-name logging exposed the difference: the assist and Playtime/Var/Gold windows have distinct names (`Window_ButtonAssist`, `Window_Gold`, etc.), but this one was `Window_Base` directly.

**Fix (v0.6.21):** After `_kbNukeAssist` runs (which suppresses the assist + trio), walk the remaining children in `this._windowLayer.children` and apply the same nuke (visible=false + setBackgroundType(2) + move(0,0,0,0)) to any child whose constructor.name equals exactly 'Window_Base' AND whose bottom edge sits within 200px above the hint top.

**Why it's safe:** KB_MainMenuVisual never instantiates raw `Window_Base` directly — all our windows are named subclasses (`KB_ActorCardMenu`, `Window_KBJournalCommand`, etc.). The bare Window_Base can only come from a third-party plugin, so suppressing it won't break our own UI.

**The v0.6.20 debug-dump code remains:** gated on Debug Logging param, useful for future diagnostic sessions if another third-party popup leaks a frame.

**Test plan:**
- [ ] Open menu on any map → centered `[Z] Chọn  [X] Hồi` hint band is clean, no thin rectangle above it
- [ ] Test Scene_Status (Trạng Thái), Scene_Skill (Kỹ Năng), Scene_Item (Vật Phẩm), Scene_Quest, Scene_Journal (Nhật Ký) — no ghost frame on any subscene
- [ ] Test on multiple maps with different plugins active (to verify the suppression doesn't break other popups)
- [ ] Confirm no other map-side popups break or disappear (IgnisItemGoldPopup, CGMZ_MapNameWindow should continue working)

---

## Changelog entries

See `docs/changelog.md`:
- **v0.6.20** — Iteration #4: apply `move(x,y,0,0)` to Playtime/Var/Gold trio; add debug-dump tool (gated on Debug Logging param)
- **v0.6.19** — Ghost frame fix continued — nuke assist dimensions + hook start()
- **v0.6.18** — Ghost frame fix continued — Playtime/Variable/Gold windows
- **v0.6.17** — Button-assist ghost frame killed
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
