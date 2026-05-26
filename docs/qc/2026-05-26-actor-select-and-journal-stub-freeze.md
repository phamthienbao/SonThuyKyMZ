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

## Changelog entries

See `docs/changelog.md`:
- **v0.6.6** — Header right-cluster padding clears cancel button (touch UI safe)
- **v0.6.5** — Party column visibility toggle during actor selection (dedup double-render)
- **v0.6.4** — Main menu Journal freeze root-cause fix (unconditional handler wiring)
- **v0.6.3** — Regression fixes for actor selection visibility + journal sub-command stubs
