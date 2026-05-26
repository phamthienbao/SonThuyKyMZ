# Changelog

Append-only. Newest entries on top. Format: `YYYY-MM-DD — short summary`.

## 2026-05-26 — KB_MainMenuVisual v0.6.15: runtime-patch ElementStatusCore General-tab DrawJS for DP fit

User asked to move the HP/MP/TP/DP gauge stack up so DP isn't pressed against the bottom edge of the panel. The General tab's layout comes from `VisuMZ_1_ElementStatusCore`'s user-configurable `DrawJS` callback, which reserves `basicDataHeight = lineHeight * 6.5` for the actor info block (name + level + class + icons + HP/MP/TP = ~6.5 rows). When KB_BongToiGauge's chain hook adds DP as a 4th gauge, it lands outside that reserved area.

- **At plugin load** (`ENABLE_PARTY` branch), if `VisuMZ.ElementStatusCore.Settings.StatusMenuList` exists and contains the General entry, replace its `DrawJS` function with a near-identical reimplementation that sets `basicDataHeight = lineHeight * 7.5` (was 6.5). Everything else preserved verbatim — actor graphic, name/level/class/icons drawing, gauge stack, EXP + Biography panel on the right half.
- Net effect: the whole actor info block shifts ~36 px up; the 4-gauge stack now sits cleanly inside the panel.
- The class-subtitle hook from v0.6.13/14 still fires inside the patched DrawJS (it still calls `drawTextEx(className, …)`).
- Wrapped in try/catch with debug-safe `console.error` — silently no-ops if ElementStatusCore isn't installed.

## 2026-05-26 — KB_MainMenuVisual v0.6.14: resolve KB_Localization in class subtitle

v0.6.13's `drawTextEx` hook fired correctly — class rendered at subtitle font/color in Scene_Status. But the text showed as the raw localization key `{classStudent}` instead of the resolved Vietnamese name "Sinh Viên".

Cause: classes 11/12/13 store their `name` in `data/Classes.json` as a KB_Localization placeholder string (e.g., `{classStudent}`). VisuMZ's `drawTextEx` would have routed through `convertEscapeCharacters` → which calls `KBLocalization.process()` → resolves the key. My direct `contents.drawText` skipped that chain.

Fix: in the class-detection branch, run `KBLocalization.process(text)` on the raw class name before drawing. Guarded so it falls through to the raw text if KBLocalization isn't loaded.

DP gauge status: visible at the bottom edge of the actor info window with partial clipping ("DP 0" readable). User implicitly accepted this state in v0.6.13. Cleaner fix via DrawJS patching still available on request.

## 2026-05-26 — KB_MainMenuVisual v0.6.13: drawTextEx class hook + DP restored

Inspected the actual obfuscated DrawJS callback that ElementStatusCore's General tab uses, and found two things:
1. Class is drawn via `this.drawTextEx(className, sx, sy, sw)` — **not** `drawText`. v0.6.12's drawText interception missed it.
2. The tab's gauge area reserves `basicDataHeight = lineHeight * 6.5` total, of which ~4.5 rows go to name/level/class/icons and ~2 rows for HP/MP/TP. KB_BongToiGauge's DP gauge is the 4th — falls outside the reserved area.

Changes from v0.6.12:
- **Class hook moved to `drawTextEx`**. Just swapping `this.contents.fontSize` before delegating doesn't work because `drawTextEx` calls `resetFontSettings()` internally, undoing our pre-set. New approach: when the text equals `actor.currentClass().name`, bypass the escape-processing path entirely and call `this.contents.drawText(text, ...)` directly with subtitle font/color. Class names are plain strings, no text codes — safe to skip drawTextEx's processing.
- **DP suppression reverted** (user prefers a partly clipped DP gauge over a missing one). The `placeGauge` filter added in v0.6.12 was removed.

Known caveat (documented, not fixed): DP gauge will sit at the very bottom edge of the actor info window and may be partly clipped, because the General tab's `DrawJS` reserves only ~3 gauge rows. A clean fix requires rewriting the DrawJS layout — feasible by patching `VisuMZ.ElementStatusCore.Settings.StatusMenuList` at runtime, but invasive enough to warrant explicit user opt-in.

## 2026-05-26 — KB_MainMenuVisual v0.6.12: target Window_StatusData directly

v0.6.11 still no visible change. Investigation reveals the Scene_Status General tab is rendered by **`VisuMZ_1_ElementStatusCore.Window_StatusData`** (a separate plugin from MainMenuCore) — and that window:
- Uses obfuscated method names like `_0x2e4721(0x158)` so we can't reliably target specific methods.
- Never calls `drawActorClass` or `drawActorSimpleStatus` — it draws actor info via direct `drawText` calls in obfuscated functions.
- Calls `placeGauge` individually for HP/MP/TP, which triggers KB_BongToiGauge's chain hook → DP appended → clips.

Two targeted hacks for ENABLE_PARTY mode:
- **DP suppression in Scene_Status only.** Aliased `Window_StatusBase.prototype.placeGauge`: when `type === 'kb_bongtoi'` and the active scene is `Scene_Status`, skip. DP stays visible everywhere else (main menu party column, Scene_Skill, battle). Trade-off: in Scene_Status the player loses DP visibility, but they have other places to see it.
- **Class subtitle via drawText interception.** Aliased `Window_StatusData.prototype.drawText`: if the text equals `this._actor.currentClass().name`, swap to `SUBTITLE_FONT` + `SUBTITLE_COLOR` for the duration of that one call. Restores font/color afterward. Works regardless of which obfuscated method draws class — as long as it eventually routes through `drawText`. Fragile only if VisuMZ draws another string that happens to equal the class name (unlikely).

Both `typeof X !== 'undefined'` guarded so a setup without ElementStatusCore still loads cleanly.

## 2026-05-26 — KB_MainMenuVisual v0.6.11: Scene_Status class subtitle + window shrink (iteration)

v0.6.10's `mainAreaHeight` cap fixed most scenes but VisuMZ's Scene_Status General-tab window uses absolute rects that ignore mainAreaHeight, so the DP gauge still clipped. Also v0.6.9's `Window_StatusBase.drawActorClass` override didn't reach this layout — VisuMZ likely overrides drawActorClass directly on `Window_Status` (the subclass) which takes precedence.

- **`Window_Status.prototype.drawActorClass` override added** (separate from the existing Window_StatusBase one). Uses `SUBTITLE_FONT` + `SUBTITLE_COLOR`. Same body, attached at the subclass level so VisuMZ's override doesn't shadow it.
- **`Scene_Status.statusWindowRect` aliased** to cap `rect.y + rect.height` at `Graphics.boxHeight - sy(HINT_H) - sy(20)` (20-px breathing room above the hint). Only shrinks; never grows.
- Both gated on `ENABLE_PARTY`, both guarded with `typeof X !== 'undefined'` so a stripped-down setup without VisuMZ still works.
- **Caveat**: if VisuMZ's Window_Status draws gauges at absolute pixel positions instead of respecting `innerHeight`, the window-rect cap will clip them instead of moving them up. Iteration #1 — user to confirm in-game whether the gauges are now visible above the hint or just chopped at the new boundary.

## 2026-05-26 — KB_MainMenuVisual v0.6.10: reserve bottom hint space so gauges don't clip

User-reported screenshot: in `Scene_Status` (General tab), the actor's HP/MP/TP/DP gauge stack at the bottom-left was being overlapped by the v0.6.7 centered hint bar — `DP 0` clipped behind `[Q/W] Đổi Người [Z] Chọn [X] Hồi`.

Root cause: stock MZ's `Scene_MenuBase.mainAreaHeight` reserves bottom space assuming VisuMZ's button-assist window will sit there (~60–80 px). Since we hide that and add our own centered hint, scenes naturally extend their content into the space we now occupy.

- **`Scene_MenuBase.prototype.mainAreaHeight` aliased**, gated on `USE_CUSTOM_HINT`. Returns `Math.min(base, hintTop - mainAreaTop())` — caps at min(stock height, available-above-hint), so we never INCREASE the area, only tighten it when stock leaves more room than the hint needs.
- Universal fix: applies to all Scene_MenuBase subclasses (Scene_Status, Scene_Skill, Scene_Equip, Scene_Item, Scene_Save, Scene_KBJournal, etc.). Whatever the scene's window layout, content stops above the hint.
- Pairs naturally with v0.6.9's `Scene_Skill.statusWindowHeight` + `Window_SkillStatus.refresh` overrides — those concentrate the DP row up; this prevents the bottom of any scene from sliding under the hint.

## 2026-05-26 — KB_MainMenuVisual v0.6.9: class subtitle + DP gauge fit on Scene_Skill

User-reported screenshot: on Scene_Skill, the actor class (`Sinh Viên`) rendered at the same big font as the actor name, and the DP gauge (KB_BongToiGauge's 4th row on Hải) was truncated — only the top edge of "DP 0" peeked above the window bottom.

Two fixes, both gated on `ENABLE_PARTY`:

- **`Window_StatusBase.prototype.drawActorClass` override** — mirrors the subtitle treatment from `KB_ActorCardMenu`: uses `SUBTITLE_FONT` (18-px default) and `SUBTITLE_COLOR` (warm gray ink). fontSize + textColor saved + restored around the draw so it doesn't leak into subsequent drawing. Applies everywhere class is drawn — Scene_Skill / Equip / Status header rows AND the full-page Scene_Status. Name now dominates, class reads as meta.
- **Scene_Skill height + layout** — `Scene_Skill.statusWindowHeight` overridden to `calcWindowHeight(5, true)` (stock was 3 rows, ~132 px → bumped to ~204 px). `Window_SkillStatus.refresh` overridden to draw the actor block top-aligned (`y=0`) instead of stock's vertical-center (`h/2 - 1.5*lineHeight`) — top-aligned packs the 5 rows of right-column content (class, HP, MP, TP, DP) without needing a 7-row-tall window.
- Scene_Equip's `Window_EquipStatus` doesn't call `placeBasicGauges` (it shows param diffs on equip), so no DP fix needed there. Scene_Status's `Window_Status` is full-page — class shrinks via the global override; gauges have plenty of room.

## 2026-05-26 — KB_MainMenuVisual v0.6.8: scene-aware hint entries

v0.6.7 made the hint universal but stripped the scene-specific context (Q/W actor switch, Q/W category switch). User asked for those back. Now the hint introspects the scene at paint time and prepends one extra entry when appropriate:

- **Actor cycling** (`Q/W: Đổi Người` / `Switch Ally`) — shown when scene is `Scene_Skill` / `Scene_Equip` / `Scene_Status` / `Scene_ClassChange` (if loaded) AND `$gameParty.size() >= 2`. The party-size guard prevents a misleading hint when there's only one ally.
- **Category cycling** (`Q/W: Đổi Loại` / `Switch Tab`) — shown when scene is `Scene_Item` / `Scene_Shop`.
- Other scenes (Journal, Save, Options, Quest, Encyclopedia, FastTravel, etc.) keep the plain two-entry hint.

Implementation:
- `_paint()` now joins an entries array (`map(e => [${key}] ${label}).join(sep)`) rather than hardcoding two strings.
- New `_getEntries()` builds `[ optional scene entry, OK, Cancel ]`.
- New `_sceneEntry()` does the instanceof checks with `typeof X !== 'undefined'` guards so missing classes don't throw.
- Two new locale keys — `menu_hint_switch_actor` (vi `Đổi Người` / en `Switch Ally`) and `menu_hint_switch_category` (vi `Đổi Loại` / en `Switch Tab`). Resolved via the existing `_t()` helper with sensible Vietnamese fallbacks.
- Scene_Quest / CGMZ_Scene_Encyclopedia / Scene_FastTravel deliberately NOT in the actor or category list — their Q/W bindings aren't verified against our specific plugin stack. Easy to add when confirmed.

## 2026-05-26 — KB_MainMenuVisual v0.6.7: centered `[Z] Chọn  [X] Hồi` hint on all menu scenes

Previously the custom centered hint only showed on Scene_Menu — Skill / Equip / Status / Quest / Journal / etc. all still rendered VisuMZ's right-aligned button-assist bar (with `< >`:Switch Ally, bottle:Select, bottle:Back). User asked to use the clean centered hint everywhere for consistency.

- **New `Scene_MenuBase.create` alias** — gated on `USE_CUSTOM_HINT`. After the parent create finishes: hide `_buttonAssistWindow` if present, then add a `KB_MenuButtonHint` sprite (guarded by `!this._kbHint` so we don't double-add). Wrapped in try/catch with debug-safe `console.error`.
- **Scene_Menu.create alias trimmed** — the hint-creation + assist-hide block moved up to Scene_MenuBase (which Scene_Menu inherits via `super.create()`). The `HEADER_MOVE_ASSIST` fallback (relocate VisuMZ's bar when our hint is off but the header is on) stays in Scene_Menu since it's header-specific.
- Sprite Z-order unchanged — hint still renders above the window layer on every scene.
- Hint shows `[Z] Chọn   [X] Hồi` everywhere. Scene-specific hints (Page Up/Down, Switch Ally) are dropped for visual cleanliness; if any scene grows to need a richer hint, we can extend `KB_MenuButtonHint` to read per-scene context.

## 2026-05-26 — KB_MainMenuVisual v0.6.6: header right padding clears the cancel button

User-reported screenshot: in the header band, `0 Lượng` (gold display) was rendering underneath the top-right cancel/back button. The right cluster used a fixed `padX = sx(24)` from the right edge, but Scene_MenuBase's `_cancelButton` (created when touch UI is on) takes up ~48-60px of the corner — well inside that padding.

- **`KB_MenuHeader._paint`** now derives the right padding dynamically from `SceneManager._scene._cancelButton.x`. If the button exists and is visible, `padR = max(padX, w - btn.x + sx(12))` — i.e., push the right edge of our text past the button's left edge with a 12-px gap. Falls back to the existing `padX` when there's no cancel button (touch UI off, non-menu scenes, etc.).
- Same fix protects gold, playtime, and location strings (they all align to the same `cursor` start position).

## 2026-05-26 — KB_MainMenuVisual v0.6.5: dedupe party display during actor selection

v0.6.3 unhid the stock status window during `commandPersonal` to make actor selection visible — but the party column stayed visible too, so both rendered the same info simultaneously (full-width horizontal grid on the bottom + vertical card stack on the right). Cluttered and confusing — visible in user-reported screenshot.

- **`commandPersonal` alias** now also hides `this._kbPartyColumn` (sets `visible = false`).
- **`onPersonalCancel` alias** restores `_kbPartyColumn.visible = true` alongside hiding the status window.
- **`onPersonalOk` alias** restores `_kbPartyColumn.visible = true` *before* delegating to the original (which calls `SceneManager.push(Scene_Skill / Equip / ...)`). When we resume back to Scene_Menu after the player exits the pushed scene, the party column is already visible.
- Each alias guards with `if (this._kbPartyColumn)` so this is a no-op when `Enable Party Column` is off.

Result: during actor selection, the stock status window is the sole actor-display. After cancel or after returning from the pushed scene, the party column comes back. No more double-render.

Longer-term polish (deferred — file under Step 14): replace this "swap the visible widget" approach with one where the party column itself is the input-driven selector — sync its highlight to the hidden status window's `_index`. That eliminates the stock status grid from the user's eye entirely. Not worth the carry now.

## 2026-05-26 — KB_MainMenuVisual v0.6.4: always-wire Journal/Map handlers (real Journal freeze fix)

v0.6.3 disabled the journal *sub-commands* but didn't address the actual freeze: clicking **Journal in the main menu** still locked up the UI because `Wire Journal Handler` defaulted to false. Root cause:

1. MainMenuCore registers a no-op CallHandlerJS for the `journal` symbol: `() => { const ext = arguments[0]; }`.
2. `Window_Selectable.processOk()` calls `deactivate()` *before* invoking the OK handler.
3. The no-op handler doesn't push a scene and doesn't reactivate the window.
4. → command window stays deactivated forever → main menu hard-freezes.

Our `setHandler('journal', commandJournal)` override would have fixed this, but it was gated on `WIRE_JOURNAL`, defaulting to false. Most setups never flipped the param.

- **Removed `WIRE_JOURNAL` and `WIRE_MAP` const + @param blocks entirely.** Both handlers now wire unconditionally in the `createCommandWindow` alias. `commandJournal` always pushes `Scene_KBJournal`; `commandMap` still has its `typeof Scene_FastTravel !== 'undefined'` guard with a `_commandWindow.activate()` graceful-degrade fallback.
- **Added comment block** explaining the MainMenuCore + processOk interaction so the next person doesn't reintroduce the gate.
- Same root cause would have hit the Map command identically; preemptively fixed both.

## 2026-05-26 — KB_MainMenuVisual v0.6.3: fix Skill / Journal freeze regressions

Two "freeze" bugs reported after v0.6.2 — neither is actually a freeze (the engine kept running), but the player couldn't see anything happen.

**Skill / Equip / Status / Formation / ClassChange freeze.** All five commands route through `Scene_Menu.commandPersonal()`, which activates `this._statusWindow` so the player can pick an actor. Since v0.4 we hide that window (`visible=false`, `setBackgroundType(2)`) because the party column visually replaces it. The window still captured input, so pressing arrows / Z worked — but with no visible cursor, the player saw nothing change.

- **Three new aliases** on `Scene_Menu`: `commandPersonal` shows the stock status window before delegating; `onPersonalCancel` re-hides it; `onPersonalOk` re-hides before the next scene pushes (so when that scene pops back to the menu, the status window is hidden again). All three gated on `ENABLE_PARTY && HIDE_STOCK_STATUS`.
- The status window keeps `backgroundType=2`, so during actor selection only its content (faces + stats) draws — no jarring windowskin frame pop-in.

**Journal "freeze" on Hành Trình / Yêu Phổ / Truyền Thuyết clicks.** These three sub-commands are stubs until Step 12 wires them to CGMZ_Encyclopedia. The stubs called `dlog()` + `activate()` — visually identical to a freeze when the player clicked them.

- **Disabled the 3 stub commands** in `Window_KBJournalCommand.makeCommandList` by passing `false` instead of `encyclopediaOK`. They render grayed out — clear "not yet available" signal. Quest stays enabled (works today). Step 12 will flip the flags back.

## 2026-05-26 — KB_MainMenuVisual v0.6.2: final journal labels — Hành Trình / Truyền Thuyết

User-driven label refinement on the 4-command journal hub:

| Symbol     | Was (v0.6.1)         | Now (v0.6.2)                |
|------------|----------------------|-----------------------------|
| `story`    | Hồi Ký / Story Summary | **Hành Trình** / **Journey**    |
| `bestiary` | Yêu Phổ / Monster Book | (unchanged)                 |
| `quest`    | Nhiệm Vụ / Quest Logs  | (unchanged)                 |
| `lore`     | Truyền Kỳ / Lore       | **Truyền Thuyết** / **Legends** |

- **`journal_cmd_story`**: vi `Hồi Ký` → `Hành Trình` (行程 — "journey / itinerary"), en `Story Summary` → `Journey`. Reframes the first tab as a player's *path through the world* rather than a recap of plot beats — fits a wuxia/xianxia tone better.
- **`journal_cmd_lore`**: vi `Truyền Kỳ` → `Truyền Thuyết` (傳説 — "legend(s)"), en `Lore` → `Legends`. `Truyền Thuyết` is the more common Vietnamese term for the legendary-tales register (vs. `Truyền Kỳ` which leans toward the Tang-dynasty short-fiction genre).
- Plugin JS fallback strings updated to match (only ever fires if the CSV is missing). No code-symbol or key-string renames — `story`/`lore` symbols and `journal_cmd_*` keys preserved.

## 2026-05-26 — KB_MainMenuVisual v0.6.1: 4-command journal hub (+ Lore / Truyền Kỳ)

Refinement of Step 10. User asked for a 4-tab journal: **Story Summary / Monster Book / Quest Logs / Lore**. Going with 4-button hub (each pushes a dedicated sub-scene) instead of a true tab bar — three of the four sub-scenes can share CGMZ_Encyclopedia as the backend (Story Summary + Monster Book + Lore as three categories), only Quest Logs uses VisuMZ_2_QuestSystem. Tab bar deferred until playtest shows it's needed.

- **New 4th command `lore`** in `Window_KBJournalCommand.makeCommandList`. Gated on `typeof CGMZ_Scene_Encyclopedia !== 'undefined'` like the other Encyclopedia categories.
- **Locale: `journal_cmd_lore`** added — vi `Truyền Kỳ` (傳奇, the wuxia term for tales-of-the-strange / legends), en `Lore`. English labels for the existing 3 keys also touched up for the v1 tab semantics: `Story Log` → `Story Summary`, `Bestiary` → `Monster Book`, `Quest Log` → `Quest Logs`. Vietnamese labels unchanged (already correct).
- **Command window resized** to `calcWindowHeight(4, true)` to fit the new row.
- **Title sprite repositioned** — was hardcoded at `boxHeight/2 - sy(120)` which caused a 14-px overlap between the brushstroke hairline and the command window's top edge (latent v0.6.0 bug, hidden because the text itself didn't reach that low). Now anchors off `_journalCommandWindow._kbHomeY` (the resting Y, not the slide-start Y) with a 12-px gap, so it scales correctly with any future row-count change.
- **`commandLore` stub handler** added; routes to CGMZ_Encyclopedia in Step 12 like Story Summary + Monster Book.

## 2026-05-26 — KB_MainMenuVisual v0.6.0: journal hub wiring + sumi-e polish (Step 10)

Step 10 of the main-menu plan: make selecting `Nhật Ký` push `Scene_KBJournal` and have the hub look like it belongs to the rest of the menu, not a stock command window.

- **Journal hub wiring is in place** (was already coded, gated by `Wire Journal Handler`). `Scene_Menu.commandJournal` aliased onto the menu's command window via `setHandler('journal', ...)` so it overrides MainMenuCore's no-op CallHandlerJS stub.
- **`Scene_KBJournal` polished to sumi-e**:
  - Centered scene title "Nhật Ký" (28-px parchment-cream text, ink-outline, brushstroke hairline underneath). Title sprite added directly to the scene so it sits above the window layer.
  - Command window goes transparent (`setBackgroundType(2)`) — no competing windowskin frame.
  - Cinnabar brushstroke underline selection + hidden default cursor (mirrors `Window_MenuCommand` styling from Step 5).
  - Cubic-out slide-in from below on scene open (60-px slide over 20 frames) so the hub doesn't pop in cold.
  - Command window widened to 360 design-px and centered.
- **New locale key `journal_scene_title`** added to `locales/vi/Menu.csv` ("Nhật Ký") and `locales/en/Menu.csv` ("Journal"). 14 total Menu keys now.
- **Sub-handler stubs preserved.** `commandStory` / `commandBestiary` still log-only (CGMZ_Encyclopedia wiring is Step 12). `commandQuest` already pushes `Scene_Quest` when VisuMZ_2_QuestSystem is loaded (Step 11 will author a sample quest). All three sub-commands auto-disable if their target plugin isn't loaded — graceful degrade.
- **User action**: flip `Wire Journal Handler` to true in Plugin Manager and select "Nhật Ký" in the main menu.

## 2026-05-26 — KB_MainMenuVisual v0.5.6: custom centered bottom hint replaces VisuMZ button assist

User asked for `:Select :Back` to be centered at the bottom. VisuMZ's `Window_ButtonAssist` lays out its segments at fixed pixel offsets calculated from full screen width, so any resize/shift hack either crops or stays right-anchored. Cleaner to drop a custom hint sprite on Scene_Menu only.

- **New `KB_MenuButtonHint` sprite** — full-width 56-px bottom band, gradient ink-wash bg (mirrors the header but with darker bottom edge), brushstroke hairline at the top. Draws `[Z] Chọn     [X] Hồi` centered horizontally. Localization-aware (each label runs through `KBLocalization.process`).
- **VisuMZ's Button Assist hidden on Scene_Menu** when `Use Custom Bottom Hint` is on (`visible = false` + `deactivate()`). Other scenes still use VisuMZ's default bar — this only swaps in our hint on the menu.
- **Six new plugin params** with sticky defaults: `Use Custom Bottom Hint` (true), `Hint Height` (56), `Hint OK Key` (Z), `Hint OK Label` (Chọn), `Hint Cancel Key` (X), `Hint Cancel Label` (Hồi). All inherit defaults via the `bool/num/str` helpers, so the fix activates on reload without a Plugin Manager save.
- **`_kbBottomReserve` updated** to subtract `HINT_H` when the custom hint is on (instead of VisuMZ assist height), so command/status windows still leave the right amount of room.
- Fallback path kept: `Use Custom Bottom Hint=false` → previous behaviour (relocate VisuMZ assist to bottom edge).

## 2026-05-26 — KB_MainMenuVisual v0.5.5: atmosphere panel z-order + revert assist resize

v0.5.4 broke two things:
1. **Command column went invisible** — the atmosphere panel, added via `addChild()` after `super.create()`, became the highest-z sibling of the scene root and rendered ON TOP of the window layer. Command icons + text were buried under the ink-wash.
2. **Button Assist text got cropped** — `move()`ing the window to a narrower width doesn't reflow VisuMZ's internal segment layout. The icons + text are drawn at fixed pixel offsets calculated for the original 1280-wide bar, so narrowing just clips them.

- **Atmosphere panel now inserted via `addChildAt(panel, indexOf(_windowLayer))`** so it sits behind the window layer instead of on top. Command/status windows now render above the ink-wash. The unified backdrop intent from v0.5.4 stays intact.
- **Button Assist resize reverted.** The window keeps its original full width; only `y` is adjusted to the bottom edge. Labels render correctly (no crop). Centering is deferred — it needs an override of VisuMZ's segment-layout method, not a window-resize hack.

## 2026-05-26 — KB_MainMenuVisual v0.5.4: unified ink-wash backdrop + framed windows go transparent

Two issues reported via screenshots:
1. Right border of the command column looked truncated where it met the atmosphere panel (a visible windowskin seam).
2. The bottom of the menu had a ghost "empty rectangle" above the Button Assist bar (a residual VisuMZ window frame), and `:Select :Back` sat marooned on the far right of a full-width assist bar.

- **Atmosphere panel now spans the full screen width** when `Enable Party Column` OR `Enable Command Style` is on — `x=0`, `width=Graphics.boxWidth`. The whole menu shares one ink-wash backdrop; command column, cards, and middle viewport all sit on top.
- **Command window goes transparent** (`setBackgroundType(2)`) when `Enable Command Style` is on. No more windowskin frame fighting with the atmosphere panel; only icons + text + brushstroke underline render (contentsBack is unaffected by the type change).
- **Status window: `setBackgroundType(2)` in addition to `hide()`** — defensive against VisuMZ builds where `.hide()` doesn't fully suppress the frame sprite. Kills the empty-rectangle ghost.
- **Button Assist narrowed and centered.** Was a full-width bar with two items pinned right; now `move()`s to a 560-design-px wide window centered horizontally at the bottom edge. `:Select :Back` now sit visually centered.

## 2026-05-26 — KB_MainMenuVisual v0.5.3: layout polish — bleed, centering, bottom seam

Reported via in-game screenshot: with header on, party of 1, the right side of the menu still showed colourful blurred map under the single card, and the bottom of the screen had visible window-frame seams between the command column and the relocated Button Assist.

- **Atmosphere panel extends behind party column.** When `Enable Party Column` is on, `KB_MenuAtmosphereLayer` now stretches its width to `Graphics.boxWidth - panelX` instead of using `ATMOS_W`. The ink-wash treatment now spans everything between the command column and the right edge; cards render on top of it. Eliminates the colourful bleed-through.
- **Party cards now vertically centered.** `KB_MenuPartyColumn.refresh` computes a `startY` offset so a 1- or 2-actor party stack is centered in the available column height rather than top-anchored — no more big gap below the lone card during early-prologue play.
- **Command + status windows leave room for the Button Assist.** Added `_kbBottomReserve()` helper — when `Header Relocates Button Assist` is on, both `commandWindowRect` and `statusWindowRect` subtract the button-assist height from their bottom edge. Removes the double-border seam where the command column used to extend past the relocated assist bar.
- All three changes are no-ops when the related layer (`Enable Party Column` / `Header Relocates Button Assist`) is off.

## 2026-05-26 — KB_MainMenuVisual v0.5.2: bool param helper now respects defaults

- **Bug:** v0.5.1 fix shipped but had no effect — bars/button assist still overlapped on user playtest. Root cause: RPG Maker MZ only writes plugin params into `plugins.js` when the user re-opens Plugin Manager and saves; until then `PluginManager.parameters('KB_MainMenuVisual')` returns the old param dict and the two new keys (`Header Hides VisuMZ Bars`, `Header Relocates Button Assist`) come back `undefined`. The local `bool(k)` helper had no default arg, so undefined → `String(undefined) === "true"` → `false`, and the fix branch was skipped.
- **Fix:** `bool(k, d=false)` now accepts a default that takes effect when the key is missing from `plugins.js`. The two new header params pass `true` as the default. The fix now activates immediately, without requiring the user to refresh Plugin Manager.
- This is a general lesson — any future new boolean param should pass its documented default to `bool()` so existing installs pick it up on first reload.

## 2026-05-26 — KB_MainMenuVisual v0.5.1: header no longer collides with VisuMZ bars

- **Bug** (reported via in-game screenshot): with `Enable Header` on, the header text overlapped VisuMZ's Button Assist window (the `:Select` / `:Back` keyboard-hint bar) at the top, garbling the right-side cluster. The bottom of the screen still showed VisuMZ's `Time` and `Vàng` bars from MainMenuCore — now redundant with the header.
- **Fix:** when `Enable Header` is on, Scene_Menu.create now:
  1. Hides VisuMZ's `_playtimeWindow`, `_variableWindow`, and `_goldWindow` (the bottom Time/Variable/Gold bars).
  2. Moves VisuMZ's `_buttonAssistWindow` to `Graphics.boxHeight - height` (bottom of screen) so it stops overlapping the header.
- Both behaviors are gated by new plugin params (defaults `true`):
  - `Header Hides VisuMZ Bars` — toggles bottom bar suppression.
  - `Header Relocates Button Assist` — toggles button assist relocation.
- No code path is reached unless `Enable Header` is also on; the plugin remains a no-op for installs that haven't enabled the header.

## 2026-05-26 — KB_MainMenuVisual v0.5.0: header band (Step 9)

- **`KB_MenuHeader.refresh`** implemented (replaces the v0.1 stub):
  - Full-width band, height configurable via plugin param `Header Height` (default 64 — matches `Command Top Offset` and `Atmosphere Top Margin`).
  - **Left:** game title from `$dataSystem.gameTitle` (override with the `Header Title` param if a chapter title is preferred). Localization-aware (`KBLocalization.process`) so `{key}` placeholders resolve.
  - **Right cluster** (right-aligned, right-to-left): gold + `Lượng` · Thời Gian hh:mm:ss · location (`$gameMap.displayName()`).
  - **Ink-wash background:** vertical gradient (`HEADER_BG_ALPHA` → `0.55 * HEADER_BG_ALPHA`); brushstroke hairline divider at the bottom edge.
- **Live clock:** repaints whenever `$gameSystem.playtime()` ticks (delta check each frame; cheap), so the seconds advance in real time while the menu is open.
- **New plugin params:** Header Height (64), Header Title (`""`), Header Title Font Size (26), Header Info Font Size (18), Header Title Color (`#e8dcc4`), Header Info Color (`#b8a888`), Header Background Alpha (0.45), Header Separator Color (`#8a7866`).
- **New localization keys:** `menu_label_playtime` → `Thời Gian` (vi) / `Playtime` (en) in `locales/vi/Menu.csv` + `locales/en/Menu.csv`.
- **Try/catch** around `_paint` with full error + stack trace via `console.error` (debug-safe — only fires when paint actually throws; never silenced).
- **Pending user:** flip `Enable Header` → true in Plugin Manager. The other layer params (atmosphere, party column, command style) are independent — header can ship alone or alongside them.
- **Next:** Step 10 — wire `menu_cmd_journal` handler (flip `Wire Journal Handler` param) and verify Scene_KBJournal pushes the 3-option hub.

## 2026-05-26 — KB_MainMenuVisual v0.4.4: class name as visual subtitle, not 2nd name

- **UX feedback:** Class name was rendering at the same size/weight as character name, reading like a two-line name field.
- **Change:** Class name + level now share one **subtitle row** beneath the character name. Subtitle uses smaller font (18 px default, plugin param) and dim warm-gray ink color (`#b8a888` default, plugin param). Class on left, "Lv N" packed compact on right.
- **New plugin params:** `Class Subtitle Font Size` (18), `Class Subtitle Color` (#b8a888)
- Result: card reads as **Name** (prominent) → *class · Lv N* (subtitle) → gauges, instead of two equally-weighted name lines.

## 2026-05-26 — KB_MainMenuVisual v0.4.3: Lv number now visible on cards

- **Bug:** "Lv" label rendered but level number was missing on every card. Cause: `Window_StatusBase.drawActorLevel` spans 120 px (label width 48 + gap to x+84 + number width 36) but I only reserved 60 px, so the number drew off the right edge and was clipped.
- **Fix:** New `_drawActorLevelCompact` helper packs "Lv" (24 px) + number (36 px, right-aligned) into 60 px total. Replaces the call to `drawActorLevel`.

## 2026-05-26 — KB_MainMenuVisual v0.4.2: face graphics now render correctly

- **Bug 1:** Faces invisible on actor cards despite being assigned in Database. Cause: `Window_Base.prototype.drawFace` crops the source 144×144 to the target rect rather than scaling — calling with width=79 just blits the top-left 79×79 fragment.
- **Bug 2:** Even when faces are set, the PNG loads async; first-open after fresh boot draws nothing because `bitmap.isReady()` is false.
- **Fix:** New `KB_ActorCardMenu._drawFaceScaled` helper does explicit scaled blt (source pw×ph → dest width×height) and attaches a `bitmap.addLoadListener` retry that triggers `refresh()` once the PNG is loaded. Self-heals on every menu open.
- **Preload:** `KB_MenuPartyColumn.refresh` now calls `ImageManager.loadFace(m.faceName())` for each battle member before constructing cards — kicks the PNG load earlier so first-draw usually hits the cache.

## 2026-05-26 — KB_MainMenuVisual v0.4.1: DP gauge visible on Hải's menu card (Step 8 free)

- **Bug:** DP gauge wasn't appearing on Hải's actor card in the menu even though `KB_BongToiGauge`'s `placeGauge` hook fires on the chain. Cause: my card was 180px tall and gauges started at y=88, putting DP at y=160 — past the window's clipped content area.
- **Fix:** Tightened identity layout — Name at y=0, Class+Level on the same row at y=24 (Level pinned to the right edge); gauges now start at y=56 instead of y=88. DP lands at y=128 inside the card.
- **Card height bumped:** 180 → 190 (default param); gap reduced 8 → 4 to keep 3 cards within the 592px available column height (3×190 + 2×4 = 578).
- Step 8 (Bóng Tối / Ngọc Hồn integration) is **largely free** thanks to the existing `placeGauge` chain hook — no extra wiring needed for DP gauge. Ngọc Hồn state indicator pending (different mechanism).
- **Pending user:** bump `Party Card Height` from 180 → 190 and `Party Card Gap` from 8 → 4 in Plugin Manager (the new code defaults apply only to fresh installs; existing values stick).

## 2026-05-26 — KB_MainMenuVisual v0.4: party column (Step 7)

- **`KB_ActorCardMenu`** implemented (extends `Window_StatusBase`):
  - Face graphic (55% scale) on left
  - Name + Class + Level on right
  - HP / MP / TP gauges via `placeBasicGauges` — this **automatically picks up the KB_BongToiGauge panel-mode hook**, so DP gauge will appear on Hải's card with no extra wiring in step 8
  - Window frame hidden (`setBackgroundType(2)`); contentsBack paints a subtle dark wash + 1px hairline border
- **`KB_MenuPartyColumn.refresh`** implemented: vertical stack of cards at the right edge of screen, one card per `$gameParty.battleMembers()`
- **Stock status hidden** via `Scene_Menu.createStatusWindow` alias when `Enable Party Column` + `Hide Stock Status Window` are both true (defaults: party off, hide stock on)
- **Try/catch** around card rendering with full error + stack trace
- **New plugin params:** Party Column X (880), Party Card Width (380), Height (180), Gap (8), Hide Stock Status Window (true)
- **Pending user:** flip `Enable Party Column` → true; boot test with party sizes 1, 2, 3 — verify cards stack cleanly and don't overlap atmosphere panel or bottom bar
- **Next:** Step 8 — Bóng Tối / Ngọc Hồn integration (much of this is already free via placeBasicGauges hook)

## 2026-05-26 — KB_MainMenuVisual v0.3: atmosphere panel (Step 6)

- **`KB_MenuAtmosphereLayer.renderAtmosphere`** implemented:
  - Source: `SceneManager.backgroundBitmap()` — the auto-captured snapshot of the map taken when the player opens the menu (no per-mapId cache needed; fresh per open)
  - **Cover-fit scaling:** snapshot scales to fill the panel without letterbox; centered
  - **Ink-wash filter chain:** PIXI ColorMatrixFilter desaturate → brightness pull-down (`ATMOS_BRIGHTNESS` param, default 0.80)
  - **Mask:** PIXI.Graphics rect crops the cover-fit overflow
  - **Vignette overlay:** radial-gradient Bitmap on top, `ATMOS_VIGNETTE` strength param (default 0.55)
- **Graceful degradation:** fallback solid wash bitmap if `SceneManager.backgroundBitmap` returns null; logs warning if `PIXI.filters.ColorMatrixFilter` is unavailable (filters skipped, no crash)
- **Try/catch around `renderAtmosphere`** with full error + stack trace logging
- **New plugin params:** Atmosphere Panel X (280), Width (600), Top Margin (64), Bottom Margin (64), Brightness (0.80), Vignette Strength (0.55)
- **Pending user:** flip `Enable Atmosphere Panel` to true; boot test on at least 2-3 different maps; tweak Brightness/Vignette to taste

## 2026-05-26 — KB_MainMenuVisual v0.2.1: selection visibility fix

- **Bug:** Brushstroke underline never painted; cursor moved invisibly between commands. Cause: `drawItemBackground` only fires during `redrawItem`/`drawAllItems`, but `select()` doesn't trigger either — so when the cursor moved, no redraw happened.
- **Fix:** Override `Window_MenuCommand.select` to call `redrawItem(prev)` + `redrawItem(new)`, forcing the underline to repaint at the new position and clear from the old one. Also override `activate`/`deactivate` so the underline appears/disappears when the window gains/loses focus (e.g. when a submenu pushes on top).
- Also tightened `drawItemBackground` guard to check `this.contentsBack` exists before drawing (avoids null-deref during early init).

## 2026-05-26 — KB_MainMenuVisual v0.2: command column polish (Step 5)

- **New plugin params:** `Enable Command Style`, `Command Column Width` (280), `Command Top Offset` (64), `Command Slide Distance` (60), `Command Slide Frames` (20), `Selection Color` (#a52a2a cinnabar)
- **Layout:** `Scene_Menu.commandWindowRect` overridden to a vertical left column (0..280 px wide, full height); `statusWindowRect` shifted to start at sx(280) so VisuMZ's stock status doesn't overlap (will be replaced in step 7)
- **Vertical commands:** `Window_MenuCommand.maxCols` patched to return 1 — every command on its own row
- **Brushstroke selection:** `drawItemBackground` paints a 3px cinnabar bar on `contentsBack` at the bottom of the selected item; default rectangular cursor hidden via `refreshCursor` / `_refreshCursor` patches (same pattern as KB_SideViewBattleUI)
- **Slide-in animation:** window starts off-screen left by `SLIDE_DIST` px, eases in over `SLIDE_FRAMES` frames with cubic-out easing
- **Ink-blot icons deferred:** spec mentioned them, but no PNG assets exist yet — keeping VisuMZ IconSet placeholders; swap in step 5.5 when assets are authored
- **Pending user:** Plugin Manager → KB_MainMenuVisual → set `Enable Command Style: true` → boot test
- **Known risk:** VisuMZ may re-apply its own `Main Menu List Style: portrait` positioning. If column doesn't render in the left third, fallback is changing VisuMZ List Style to `default` or `mobile`

## 2026-05-26 — KB_MainMenuVisual v0.1 skeleton created (Main Menu impl Step 4)

- **New plugin:** `js/plugins/KB_MainMenuVisual.js` (v0.1, skeleton stage)
- **Classes defined:** `KB_MenuHeader`, `KB_MenuAtmosphereLayer`, `KB_ActorCardMenu`, `KB_MenuPartyColumn`, `Scene_KBJournal`, `Window_KBJournalCommand`
- **Behavior:** No visual change by default — all layers gated behind plugin params (`Enable Header`, `Enable Atmosphere Panel`, `Enable Party Column`, `Wire Journal Handler`, `Wire Map Handler`) which default OFF. Skeleton is safe-to-boot.
- **Scene_Menu aliased:** `create` adds enabled layers as children; `createCommandWindow` adds handlers for `journal` + `map` symbols when wired
- **Graceful degradation:** Scene_KBJournal disables Story Log / Monster Book entries if `CGMZ_Encyclopedia` is missing; disables Quest Log if `VisuMZ_2_QuestSystem` is missing. Never crashes.
- **Try/catch around layer init** with full error + stack trace logging per project safety rules
- **Pending user:** register in Plugin Manager (load order: after VisuMZ_1_MainMenuCore, after KB_SaveCore, near end of KB plugins block)
- **Next:** Step 5 — command column polish (ink-blot icons, brushstroke selection, slide-in animation)

## 2026-05-26 — Main Menu Step 3 boot-tested; Formation added, Load removed

- **Boot test passed:** Step 3 (VisuMZ Command Window List + Status Graphic: none) successful. KB_Localization `{key}` codes resolve correctly inside VisuMZ command windows — no additional plugin hook needed.
- **Added command:** Formation → Đội Hình (隊形). Useful party-reorder command in menu.
- **Removed command:** Load (was an unintended extra). KB_SaveCore already unifies save AND load in one scene; redundant top-level Load command removed. Mobile-friendly choice.
- **Final menu count:** 10 commands (was 9): Vật Phẩm, Kỹ Năng, Trang Bị, Trạng Thái, Đội Hình, Nhật Ký, Bản Đồ, Thiết Đặt, Save, Rời Đi.
- **Deferred polish:** "Vàng" → "Lượng" gold unit override and "Time" → "Thời Gian" playtime label deferred to later polish pass (per user direction).
- **Memory updated:** `{key}` ↔ VisuMZ MainMenuCore param compatibility confirmed.

## 2026-05-26 — Menu localization CSVs created (Main Menu impl Step 2)

- **Added:** `locales/vi/Menu.csv` (13 keys, Hán Việt)
- **Added:** `locales/en/Menu.csv` (13 keys, English)
- Keys: `menu_cmd_*` (9 main menu commands), `menu_unit_gold`, `journal_cmd_*` (3 journal hub commands)
- Pending user action: register `Menu` in KB_Localization plugin params; disable CGMZ_QuestSystem, Galv_QuestLog, DKTools_Localization, DKTools in Plugin Manager (impl Step 1)

## 2026-05-26 — Main Menu spec: open questions resolved; Journal hub design added

- **Skill label:** "Kỹ Năng" (user pick over more literary "Pháp Thuật"/"Thần Thuật" — prefers Hán Việt that stays everyday-legible)
- **Quit label:** "Rời Đi" (kept; "Hồi Gia" 回家 alternative declined)
- **Journal structure:** Nhật Ký is now a **hub scene**, not a direct push. Contains three sub-entries: Hồi Ký 回記 (Story Log → CGMZ_Encyclopedia Lore category), Yêu Phổ 妖譜 (Monster Book → CGMZ_Encyclopedia Bestiary category), Nhiệm Vụ 任務 (Quest Log → VisuMZ_2_QuestSystem)
- **Location names:** sourced from existing `Map*_*.csv` files; no new locations CSV
- **Spec updates:** Added Journal hub section + `Scene_KBJournal` + `Window_KBJournalCommand` classes to `docs/spec/main-menu.md`; bumped implementation plan from 12 to 14 steps
- **Glossary updates:** Added Hồi Ký / Yêu Phổ entries; corrected Skill term to Kỹ Năng

## 2026-05-26 — Main Menu spec drafted; quest plugin decision; Hán Việt UI vocabulary

- **New spec:** `docs/spec/main-menu.md` — full design for in-game pause menu redesign as `KB_MainMenuVisual.js`. Sumi-e ink-wash aesthetic, 3-column layout (commands / atmospheric map panel / party cards with HP/MP/Bóng Tối/Ngọc Hồn gauges).
- **Quest plugin decision:** Picked **VisuMZ_2_QuestSystem**. Will disable `CGMZ_QuestSystem` and `Galv_QuestLog`. Rationale: same suite as MainMenuCore, KB_Localization-compatible text codes for translation flow.
- **Localization plugin decision:** Confirmed `KB_Localization` is the sole i18n system. `DKTools_Localization` to be disabled.
- **UI vocabulary policy:** All in-game UI text uses Hán Việt (Sino-Vietnamese) vocabulary. Exceptions: `HP`, `MP`, `TP`, `Save` remain English (user preference). Vocabulary added to `docs/glossary.md`.
- **No Chinese characters in UI:** All Hán/汉字 removed from menu mockups; atmosphere comes from Hán Việt romanization + ink-wash visuals only.
- **Tasks added:** 12-step implementation plan tracked under "Custom systems — KB plugins to build" in `docs/tasks.md`. Quest plugin pick task marked done.

## 2026-05-25 — KB_BongToiGauge v1.5: panel-mode rendering + label refinement

- **New feature — panel-mode rendering (default):** `drawMode: "panel"` renders DP gauge INSIDE Hải's VisuMZ Sideview panel, directly below TP gauge at the same X-position. Gauge inherits the panel's theme (colors, scale, font). Panel gauge is 96px wide (configurable via `panelGaugeWidth` param).
- **Legacy overlay mode retained:** `drawMode: "overlay"` kept as fallback for non-VisuMZ setups or custom layouts. Scene-level overlay renders as before (160px wide, configurable via params). Two width-specialized sprite subclasses: `Sprite_KBBongToiGaugePanel` (96px) and `Sprite_KBBongToiGaugeOverlay` (160px).
- **Hook on Window_StatusBase.prototype.placeGauge:** 
  - (a) Routes `type="kb_bongtoi"` to the correct custom sprite class (Panel or Overlay) instead of default Sprite_Gauge.
  - (b) **Panel mode:** Chains a kb_bongtoi placement whenever VisuMZ places a "tp" gauge for Hải (one gaugeLineHeight below at the same X).
  - (c) **Overlay mode:** Tracks Hải's window position for repositioning the overlay sprite each frame in Scene_Battle.update.
- **Label changed from "BT" to "DP":** More intuitive label for "Dark Point" gauge. Configurable via new `label` param (default "DP").
- **New params:** `drawMode` (select: "panel" | "overlay", default "panel"), `label` (string, default "DP"), `panelGaugeWidth` (number, default 96), `panelGaugeOffsetX` (number, default 0), `panelGaugeOffsetY` (number, default 0).
- **Removed:** Dead `Game_System.initialize` alias (was inert in v1.4).
- **Public API unchanged:** KB.BongToi.get/set/add/reset/triggerOverflow, plugin commands (SetGauge/AddGauge/ResetGauge/TriggerOverflow), notetags (`<bongtoi: +N>`, `<bongtoi: reset>`).
- **Status:** v1.5, active. Compatible with VisuMZ_1_BattleCore and KB_SideViewBattleUI v3.1+. See `docs/spec/battle-ui.md` for integration details.

## 2026-05-25 — KB_SideViewBattleUI v3.1: audit-fix release — correctness + polish

- **Cursor method fix:** v3.0 used `_refreshCursor` (underscore prefix) which is not a real MZ method; cursor override never ran. v3.1 uses the correct `refreshCursor` and calls `setCursorRect(0, 0, 0, 0)` to actually hide the default cursor sprite.
- **Selection layer fix:** Selection band now drawn on `contentsBack` (MZ standard per-item background layer) instead of `contents`. Matches MZ convention; band no longer fights with the text layer.
- **Clear both layers:** `paint()` now clears both `contents` and `contentsBack` to prevent selection-band trails during rapid cursor movement.
- **Command slide animation rewritten:** Animates `this.x` (window root) with cubic-out easing instead of shifting `_clientArea.y`. The previous approach desynced the PIXI mask aligned to `_clientArea`. New "Command Slide Distance" param (default 32 px) makes the slide path configurable.
- **Frame base scale cached on load:** Previously recomputed every frame in `update()` including Math.max over bitmap dimensions. Now stored as `_frameBaseScale` once and multiplied by the per-frame pulse factor.
- **Bitmap dirty flag refactor:** All `bmp._baseTexture.update()` calls replaced with `bmp._setDirty()` — MZ-idiomatic, batched via the engine's update loop.
- **Easing functions:** Added cubic-out helper; applied to command window slide-in and fade-in for smooth "elegant, slow" motion per the reference spec. Linear stepping replaced.
- **BT gauge card-width clamp:** When KB_BongToiGauge sprite attaches inside Hải's card, its `bitmapWidth` is overridden to `cardW - portrait - 16` so the gauge no longer overflows the card boundary.
- **Silent overlay loader:** HEAD-checks each URL via fetch() before calling ImageManager.loadBitmap. Missing files cause no console 404. Result cached in module-level Map; pending loads coalesced via overlayPending Map.
- **HUD X re-centered:** 430 → 392 (for 4 cards × 120 spacing + 135 card width = 495 px total, (1280 − 495) / 2 = 392).
- **Default value refinements:**
  - Body Font Size: 22 → 14 (was wrong in v3.0 — body should be smaller than header 16px)
  - Command Font Size: 22 → 20 (refined for 24-px item height)
  - Panel Opacity: 220 → 180 (more transparent, closer to reference)
  - Panel Color alpha: 0.78 → 0.72
  - Selection Color: rgba(180,145,100,0.9) → rgba(212,180,100,0.9) (more golden)
- **New param:** Command Slide Distance (default 32 px)
- **Status:** v3.1, active. See `docs/spec/battle-ui.md` for updated behavior.

## 2026-05-25 — KB_SideViewBattleUI v3.0: reference-matched proportional scaling refinement

- **Design target — 1280x720 with proportional scaling:** All UI positions now reference a 1280×720 design canvas (via ResolutionWidth/ResolutionHeight params). New `sx()` and `sy()` helpers scale all coordinates proportionally to the actual Graphics.boxWidth/Height, enabling pixel-perfect layouts on any resolution without hardcoding screen dimensions.
- **Actor formation presets:** New "Actor Formation Preset" param (Classic | Vertical | ReferenceLayout, default ReferenceLayout). Each preset defines positioning:
  - **Classic:** Uses original setActorHome (v1.0 behavior).
  - **Vertical:** Stacks actors at x=900 with y stepping by 90px.
  - **ReferenceLayout:** Per-actor X/Y params (Actor1 900/320, Actor2 960/390, Actor3 1010/470, Actor4 1060/540). Recommended for cinematic layouts.
- **HUD repositioning — bottom-center anchor:** HUD X=430, HUD Y=615, Spacing=120 (new defaults). Cards now sit prominently at the bottom-center of the screen with tighter spacing.
- **Card refinement — 135×90 with diamond portrait:** Card dimensions reduced to 135×90. Portrait diamond shrunk to 64px. New HUD Hover Amplitude param (default 1.5px) — KB_BattleHUD bobs vertically via sine wave on Graphics.frameCount in update().
- **Low HP state — portrait tint:** New KB_ActorCard.update() detects hp/mhp ≤ 0.25 and tweens a red tint (rgba(220,50,50,0.35)) over the diamond portrait with 12% lerp per frame. New "Low HP Tint" param.
- **Color separation — HP white, MP light blue:** Separate HP Color (white) and MP Color (light blue, default #A0D8F0) params. Cards display both stats side-by-side with proper contrast.
- **Diamond frame asset — graceful fallback:** New "Diamond Frame Asset" param. Plugin loads img/system/battleui/<asset>.png; if present, renders as frame overlay scaled to portrait+8. If missing, falls back to programmatic diamond outline. Same for "Description Brush Asset" (soft_brush.png) — if missing, renders horizontal gradient.
- **Command window refinement — slide+fade entrance with gold selection:** New position params: Command X (930), Command Y (565), Width (170), Height (130). Item height reduced to 24. Slide entrance over "Command Slide Frames" frames (default 15); _clientArea.y shifts contents upward as ContentsOpacity tweens 0→255. Selection band paints gold text outline (rgba(255,200,120,0.85), width 3). Soft shadow halo inside contents via radial gradient (Panel Shadow Color rgba(0,0,0,0.35)).
- **Description window — bottom-left, uppercase header, soft fade:** Position: X=0, Y=590, 420×130. Header renders uppercase in gold-beige (#D4B57A, new "Header Color" param). Body text white via drawTextEx (multi-line). Soft fade on text changes via Description Fade Frames (default 12) — setText() resets _fadeTarget so text fades out, refreshes, fades back in.
- **Decoration layer defaults — circle + shadow:** KB_BattleDecorationLayer default Overlay Images now ["circle_overlay,1080,520,200","corner_shadow,0,560,220"]. Assets render only if files exist; missing files silently skipped and cached in module-level overlayCache Map.
- **Animation speed multiplier — global timing control:** New "Animation Speed" param (default 1.0, range 0.1–4.0). Influences pulse phase (0.06 × ANIM_SPEED / frame), hover timing, slide/fade durations via the dur(frames) helper. Active actor: scale 1→1.05, glow opacity 140→230. Inactive actor: glow fades −10/frame, scale lerps −0.015/frame, portrait dims 255→240.
- **Class renames (ES6 consistency):** Sprite_ActorCard, Sprite_BattleHUD, Sprite_BattleOverlay → KB_ActorCard, KB_BattleHUD, KB_BattleDecorationLayer. Window_ModernActorCommand, Window_ModernPartyCommand, Window_ModernDescription → KB_WindowActorCommand, KB_WindowPartyCommand, KB_WindowDescription.
- **Parameter schema — 65 entries (40 functional):** Grouped: Resolution (2) | Actor Formation (9) | HUD (6) | Command Window (6) | Description Window (5) | Typography (5) | Colors (13) | Animation (1) | Overlay/Decoration (4) | Bóng Tối (2). See JS file for canonical list.
- **Status:** v3.0, active. Fully compatible with VisuMZ_1_BattleCore. Spec rewritten to reflect v3.0 architecture. See `docs/spec/battle-ui.md` for full details.

## 2026-05-25 — KB_SideViewBattleUI v2.0: complete architectural rewrite — sprite-based HUD

- **Major rewrite:** Replaced Window_BattleStatus (now hidden with opacity 0, kept for BattleManager compatibility) with a new sprite-based HUD system.
- **New architecture — ES6 classes:**
  - **Sprite_ActorCard** — One card per party member. Renders diamond-shaped portrait (clipped face image), actor name, HP/MP text, active-actor glow (pulse scale + glow alpha), and optional BT gauge as child sprite.
  - **Sprite_BattleHUD** — Container sprite; anchored at HUD X/Y; spawns one card per battle member, spaced by HUD Spacing param. Refreshes on BattleManager.startBattle().
  - **Sprite_BattleOverlay** — Decorative PNG layer. Loads images from Overlay Folder, positioned per image-entry config (filename,x,y,opacity).
  - **Window_ModernActorCommand / Window_ModernPartyCommand** — Replaces standard command windows. Parchment background + border; selection band instead of cursor sprite; slide-in animation on open.
  - **Window_ModernDescription** — Extends Window_Help; parchment background; "DESCRIPTION" label (localized via {battle_description}) above body text.
- **Actor positioning override:** Sprite_Actor.setActorHome uses "Actor Positions" param (string array "x,y" pairs, index-based). Falls back to slanted vertical right-side stack if index out of bounds.
- **Card animation:** Active actor's card pulses glow opacity (120–210) and portrait scale (1.0–1.04) smoothly. Glow fades when actor stops being BattleManager.actor(). Slide-in animation on command window open (80px offset, −8px/frame).
- **BT gauge integration:** Sprite_ActorCard.attachBongToi() attaches KB.BongToi.Sprite as child if actor ID matches Hai Actor ID. KB_BongToiGauge scene overlay is suppressed (via _kbSuppressedByUI flag) when Show BT Inline = true.
- **Text re-render optimization:** Card text (HP/MP) is only redrawn when hp/mp values change, not every frame (guarded by _lastHp/_lastMp cache).
- **Parameters:** Expanded from 30 → 39 params. New groups: Actor Positioning (1), HUD (6), Typography (4, reorganized). Renamed/consolidating param sections for clarity.
  - **New params:** Actor Positions, HUD X/Y/Spacing, Card Width/Height, Portrait Size, Description X/Y/Width/Height/Label, UI Font, Title/Body/Command Font Size, all Colors, Overlay Folder/Images, Hai Actor ID, Show BT Inline.
  - **Deprecated params (v1.x StatusPanel-based):** Status Panel Height/Width/YOffset/FaceSize/GaugeWidth/GaugeHeight — no longer used; HUD system is fully configurable.
- **Compatibility:** VisuMZ_1_BattleCore remains fully compatible. VisuMZ_3_SideviewBattleUI must be disabled (both override same windows).
- **Performance:** Bitmaps created once per sprite; re-painted in place (no per-frame allocation). Overlay loading resilient (missing images log warning, don't crash).
- **Status:** v2.0, active. See `docs/spec/battle-ui.md` for full architecture diagram, class responsibilities, animation timings, and 39-param table.

## 2026-05-25 — KB_SideViewBattleUI v1.2: parchment command panel styling

- **Feature — parchment panel background:** Command windows (PartyCommand, ActorCommand) now render with a light cream parchment aesthetic instead of the standard windowskin frame. Default panel color: rgba(245, 235, 210, 0.82).
- **Feature — selection highlight band:** Replaces the standard cursor sprite with a custom tan/brown background band (default rgba(180, 145, 100, 0.92)) drawn only behind the currently selected item. Unselected items have no background.
- **Visual refinement — text styling:** Commands now render centered (configurable alignment), bold by default, with font size bumped from 22 → 28 for readability on the parchment. Selected text color set to white for contrast; unselected text uses dark brown (#2A1A0A).
- **Styling consistency:** New shared helper `applyKBCommandStyling()` eliminates code duplication between PartyCommand and ActorCommand — both apply the same parchment paint pipeline and text rendering.
- **Technical:** Parchment is painted via overridden `paint()` method (fills parchment rectangle on window contents), then `drawAllItems()` draws command labels, then per-item `drawItemBackground()` paints selection band behind currently focused item. Standard cursor sprite is hidden via `_refreshCursor` override.
- **New params:** `Command Bold` (boolean, default true), `Command Align` (select left|center|right, default center), `Command Panel Color` (rgba string), `Command Selection Color` (rgba string), `Command Selection Text Color` (hex).
- **Changed defaults:** `Command Font Size` 22 → 28, `Command Background` 1 → 2 (transparent + parchment paint), `Command Item Height` 32 → 40.
- **Status:** v1.2, active.

## 2026-05-25 — KB_SideViewBattleUI v1.1: override BattleCore icon-style, fix command window sizing

- **Bug fix — VisuMZ_1_BattleCore's icon-style override:** BattleCore forces `Window_PartyCommand` and `Window_ActorCommand` into "iconText" style (appending icons next to each command label). v1.1 overrides both `.commandStyle()` and `.commandStyleCheck()` to return `'text'`, forcing text-only rendering.
- **Bug fix — command window font too large for panel:** Default `itemHeight` of 36 px and default font size made text crowd together. Reduced `itemHeight` to 32 px; added new "Command Font Size" param (default 22).
- **Bug fix — command window height clipped entries:** v1.0 sized ActorCommand to PANEL_H (144 px) which fit only 4 commands before clipping "Attack". Now sized to fit 6 rows so all commands are visible.
- **Custom drawItem:** Shared implementation between PartyCommand and ActorCommand. Renders label only, right-aligned, using configured font size. Bypasses BattleCore's iconText rendering pipeline entirely.
- **Window positioning:** PartyCommand Y-position adjusted so it sits above the status panel (using Y Offset param).
- **Bug fix — command window background:** Added "Command Background" param (select 0 | 1 | 2, default 1): 0 = full frame, 1 = dimmer (closer to reference screenshots), 2 = transparent. Applied via `setBackgroundType()` in window initialize hook.
- **Localization:** Help Label param updated from "DESCRIPTION" to `{battle_description}` so the localization key is used (already defined in v1.0).
- **New params:** `Command Font Size` (number, default 22), `Command Background` (select 0|1|2, default 1).
- **Status:** v1.1, active.

## 2026-05-25 — KB_SideViewBattleUI v1.0: custom battle layout with inline BT gauge

- **Feature — custom sideview battle layout:** Created `js/plugins/KB_SideViewBattleUI.js` to replace VisuMZ_3_SideviewBattleUI.
- **Layout:** Status panel (horizontal row at bottom-center, face + name + HP/MP/TP gauges) | Command windows (vertical list at bottom-right) | Help/Description (bottom-left with "DESCRIPTION" label) | Item/Skill panels (floating 2-col grid above status row) | Enemy target window (slim header at top-center).
- **BT gauge integration:** For Hải (Actor ID 3, configurable), a 4th gauge (Bóng Tối / BT) appears inline below HP/MP/TP in the status panel, visually consistent with other gauges. Requires KB_BongToiGauge. Other actors show HP/MP/TP only — visual asymmetry is intentional, reinforcing Hải's narrative burden.
- **Technical:** BT gauge is a child of Window_BattleStatus instead of a scene-level overlay. Sprite gauge sizing is guarded by `_kbBattleStatusContext` flag, preventing menu/UI gauge distortion. KB_BongToiGauge's scene overlay is suppressed when inline display is enabled (`_kbSuppressedByUI` flag on overlay sprite).
- **Plugin params:** 21 total, grouped: Status Panel (height, width, Y offset, face size, gauge width/height) | Command Window (width, item height) | Help/Description (width, height, label) | Item/Skill Panel (cols, rows, width) | Bóng Tối (Hải Actor ID, Show BT Inline).
- **Localization:** New key `battle_description` (en: DESCRIPTION, vi: MÔ TẢ) added to `locales/main.csv`.
- **Deferred for v2:** Action header at top (current actor + queued action), decorative corner emblem.
- **Status:** v1.0, active. Fully compatible with VisuMZ_1_BattleCore (loads after).

## 2026-05-25 — KB_SaveCore v1.3: gameplay-snapshot cache hook, empty-slot styling

- **Bug fix — snapshot captured menu instead of gameplay:** v1.2's `captureSnapshotDataUrl()` called `SceneManager.snap()` inside Scene_Save, which captured the menu canvas instead of the active gameplay screen. Root cause: snap() returns the scene's current canvas, not a guaranteed gameplay snapshot.
  - New hook on `SceneManager.snapForBackground` (fires when engine snaps for menu backgrounds) to cache a gameplay snapshot. When the outgoing scene is Scene_Map or Scene_Battle, the snapshot is downscaled + JPEG-encoded and stored in module-level `_kbCachedGameSnapshot`.
  - `captureSnapshotDataUrl()` now prefers a live snap when the current scene IS gameplay (autosave from map/battle) and falls back to the cached snapshot otherwise (manual save from Scene_Save).
  - Extracted shared encoder into `encodeBitmapToJpeg()` (downscale + JPEG + size-cap logic, used by both hook and live-snap path).
  - **Migration note:** Saves created on v1.1/v1.2 have the wrong snapshot (menu image) embedded in `info.snapshot`. They won't auto-correct — re-save to update.
- **Feature — empty save slot styling:** Empty slots now ignore per-type image config and use "Empty Slot Image Type" param (default "title"), so both empty Autosave and empty Manual slots show the title image consistently.
  - New param "Empty Overlay Alpha" (float 0–1, default 0.35) renders a translucent white overlay on empty slots, giving a "unused slot" appearance.
- **New params:** `Empty Slot Image Type` (select: title | icon | custom, default "title"), `Empty Overlay Alpha` (float, default 0.35, range 0–1).
- **Status:** v1.3, active.

## 2026-05-25 — KB_SaveCore v1.2: infinite-refresh hang fix, bitmap caching, snapshot downscaling

- **Bug fix — manual save infinite refresh hang:** v1.1's `drawKBSlotImage` called `Bitmap.load(url)` on every redraw, which creates a fresh bitmap each time (no internal cache). For icon and snapshot types, each new bitmap would trigger `addLoadListener(refresh)` on load, which called refresh → redraw → new bitmap, forming an infinite loop. v1.2 adds a module-level bitmapCache Map (keyed by URL) so the same Bitmap is returned on subsequent calls. The cache applies to 'icon' and 'snapshot' types; 'title' and 'custom' already used ImageManager which caches.
- **Performance fix:** Added `_kbRefreshHooked` flag on each bitmap so `addLoadListener(refresh)` is attached once per bitmap instance, not once per redraw cycle. Prevents listener duplication.
- **Feature — snapshot downscaling:** Snapshot data URLs are now captured onto an offscreen canvas, downscaled to a configurable max width (default 320 px, aspect ratio preserved) before `toDataURL`. This reduces file size and prevents overly large image data.
- **Feature — snapshot size cap:** If the final snapshot data URL exceeds the Snapshot Max DataURL KB limit (default 64 KB), the snapshot is dropped and fallback chain is triggered. This prevents `global.rmmzsave` bloat when storing multiple large snapshots.
- **New params:** `Snapshot Max Width` (default 320), `Snapshot Max DataURL KB` (default 64).
- **Logging:** Added detailed `[KB_SaveCore]` console logs for snapshot capture (final size + capture time ms) and all failure paths (for debugging fallback behavior).
- **Status:** v1.2, active. Resolves the "manual save waiting forever" hang reported in earlier sessions.

## 2026-05-25 — KB_SaveCore v1.1: per-slot image types, snapshot capture, VisuMZ Digit Grouping fix

- **Bug fix:** Timestamp was rendering with thousands separator ("2,026") due to VisuMZ_0_CoreEngine hooking `Window_Base.drawText`. KB_SaveCore now renders timestamps via `Bitmap.drawText` (raw method) which bypasses VisuMZ's Digit Grouping feature.
- **Feature:** Per-slot-type image source. Autosave and Manual Save can now each independently choose image type: `title`, `icon`, `face`, `custom`, or `snapshot`.
- **Feature:** Snapshot capture. If enabled, KB_SaveCore calls `SceneManager.snap()` at save time and stores JPEG data URL in `info.snapshot` with configurable quality (1-100, default 70).
- **Feature:** Fallback chain. If chosen image type is unavailable, plugin auto-falls back: snapshot (if no data) → face (if no face) → title (if no title) → icon. Prevents blank slots.
- **Feature:** Non-face images use centre-crop to square then scale to `Image Size`. Snapshot bitmaps are cached in a module-level Map to avoid redundant reloading.
- **Plugin params:** Replaced `Face Size` with `Image Size` (applies to all image types). Added `AutoSave Image Type`, `AutoSave Custom Image`, `Manual Image Type`, `Manual Custom Image`, `Capture Snapshot`, `Snapshot Quality`.
- **Status:** v1.1, active — VisuMZ_1_SaveCore remains disabled. See `docs/spec/save-system.md` for full params table and fallback logic.

## 2026-05-25 — KB_SaveCore: lightweight save UI replacement (v1.0)

- Created `js/plugins/KB_SaveCore.js` (~250 lines) as a drop-in replacement for VisuMZ_1_SaveCore and CGMZ_SaveFile.
- Layout: face portrait (left) + slot title / map name / playtime / timestamp (right).
- Slot 0 displays as "Autosave" (via `{save_autosave}` key); other slots as "File N" (via `{save_file}` key).
- Timestamp formatted directly with tokens (YYYY/MM/DD HH:mm:ss) — no VisuMZ `{{...}}` wrapper, avoiding conflicts with KB_Localization.
- Map name auto-translated via KBLocalization.process() if locale-specific.
- On load: restores the locale stored in the save file (info.locale).
- Plugin params: Max Save Files, Enable Autosave, Show Map Name/Playtime/Timestamp, Timestamp Format, Autosave/Save labels, Slot Rows/Cols, Face Size.
- Added 2 localization keys to `locales/main.csv`: `save_autosave` (Autosave / Tự Động Lưu), `save_file` (File / Tệp).
- Registered in `js/plugins.js` (enabled); disabled VisuMZ_1_SaveCore to prevent conflicts.

## 2026-05-25 — Locales refactor: unified structure for KB_Localization

- **Root cause of CSV confusion**: previous setup had shared files scattered across `locales/Map/`, locale-specific files in `locales/vi/` and `locales/en/`, and stale JSON files left over from an older plugin (Iavra-style KB_Localization v1, no longer in use).
- **Unified structure**: moved 3 map CSVs from `locales/Map/` → `locales/` root as shared multi-column files (`tag;en;vi` format). These hold map dialogue and object names referenced across the game.
  - `Map001_Message.csv` (shared, en column mostly empty — see Known Issues below)
  - `Map003_MountainGodShrine.csv` (shared, en column mostly empty)
  - `Map005_SonTinhHome.csv` (shared, en column mostly empty)
- **Deleted broken per-locale copies** in `locales/vi/` and `locales/en/` for those Maps (wrong header format `tag;message` instead of `tag;en;vi`; missing English).
- **Rewrote Quest CSVs**: `locales/vi/Quest.csv` and `locales/en/Quest.csv` now use semicolon delimiter (was comma) and removed duplicate rows from General.csv that had slipped in.
- **Deleted stale files**:
  - `locales/vi/SideQuest.csv` and `locales/en/SideQuest.csv` (never declared in plugin config; contained junk).
  - 12 JSON files from `locales/vi/` and `locales/en/` (leftover from old v1 Iavra-style plugin; KB_Localization now runs CSV-only).
  - `locales/Map/` folder (now empty).
  - All `.DS_Store` files in `locales/`.
- **Cleaned shared files**: removed "USE UTF-8 encoding!!!;;" placeholder rows from `locales/title.csv`, `locales/charactor.csv`, `locales/Map001_Message.csv`. Removed empty trailing rows from `locales/charactor.csv`.
- **Updated `js/plugins.js` KB_Localization params**:
  - `Data Files`: removed `Map005_SonTinhHome` (now in Shared Files instead).
  - `Shared Files`: added `Map001_Message, Map003_MountainGodShrine, Map005_SonTinhHome`.
- **Final structure** (see `docs/spec/localization.md` for detail):
  - **Shared files** (root): `main.csv`, `title.csv`, `charactor.csv`, `Map001_Message.csv`, `Map003_MountainGodShrine.csv`, `Map005_SonTinhHome.csv`
  - **Locale-specific** (vi/en folders): `General.csv`, `Quest.csv`
- **Known issue — English columns in map CSVs**: `Map001_Message.csv`, `Map003_MountainGodShrine.csv`, `Map005_SonTinhHome.csv` all have empty or placeholder-text English columns (e.g., "a", "A", "{micha}"). Real English translations are needed. Flagged for future localization pass.

## 2026-05-25 — Bóng Tối Gauge: identify Hải's window via placeGauge (v1.4)

- Live diagnostics revealed VisuMZ_3_SideviewBattleUI does NOT store the actor on `Window_SideviewUiBattleStatus._actor` (all 4 instances report `_actor: undefined`). v1.3's finder relied on that field and matched nothing, leaving the overlay invisible.
- v1.4 reintroduces a tiny `placeGauge` hook whose sole job is to remember which window VisuMZ called `placeGauge(haiActor, ...)` on. The overlay's position-tracking in `Scene_Battle.update` now reads `scene._kbHaiWindow` (set by the hook) instead of probing window fields.
- The gauge is still rendered as a scene-level overlay (not added inside the window) so the v1.2 clipping issue does not return.

## 2026-05-25 — KB_Localization v2.7: path fix + shared CSVs

- **Root cause of the missing-CSV warnings and unresolved `{thuytinh}` etc.**: line 165 of KB_Localization built URLs as `data/${dataRootFolder}/${locale}/${fileName}`, hardcoding a `data/` prefix on top of the configured root. The user's `Data Root Folder: locales` therefore resolved to `data/locales/`, but the actual CSV files live at project-root `locales/` (matching CLAUDE.md's spec).
- Dropped the `data/` prefix. The plugin now respects `Data Root Folder` verbatim — `locales` means `locales/`.
- Added new param `Shared Files` (default `main, title, charactor`) for top-level multi-column CSVs (`tag;en;vi;…` format). One XHR per locale fires for each shared file; `parseCSV()` already picks the matching column. This is what makes `{thuytinh}` → "Giang Hải" resolve, since the mapping lives in `locales/charactor.csv` at the root, not in any per-locale folder.
- Updated help block to reflect the actual layout (project-root `locales/`, not `data/locales/`).
- File migration: copied `Quest.csv` (vi+en) and `General.csv` (en) from `data/locales/` into `locales/` since they were missing there. `data/locales/` left intact for now; can be deleted once the user confirms the new path works.
- Known leftover: `Exported_Text.csv` is in the user's `Data Files` param but doesn't exist anywhere — plugin will keep logging a warning until removed from Plugin Manager.

## 2026-05-25 — Bóng Tối Gauge: scene-level overlay (v1.3)

- v1.2 confirmed via live diagnostics: gauge sprite WAS created (attached to `Window_SideviewUiBattleStatus` for Hải, visible=true, x=78, y=100), but the host window's height is 105 and contains a mask — so the gauge at y=100 with height=32 was clipped out of view.
- v1.3 abandons in-window placement entirely. The gauge is now a `Scene_Battle` child sprite (no window mask), repositioned each frame to track Hải's `Window_SideviewUiBattleStatus` via the new `_kbFindHaiStatusWindow` helper. Opacity follows the panel's opacity so fade-in/out animations stay in sync.
- New params: `gaugeWidth` (default 160), `gaugeOffsetX` (relative to Hải's window left), `gaugeOffsetY` (relative to Hải's window bottom; positive = below).
- Bitmap width now comes from `P.gaugeWidth` via `bitmapWidth()` override — overlay is no longer bound to the 105px window.

## 2026-05-25 — Bóng Tối Gauge: hook on placeGauge (v1.2)

- v1.1's placeBasicGauges hook never fired in actual battles — confirmed VisuMZ_3_SideviewBattleUI bypasses placeBasicGauges entirely (0 references in the plugin) and calls the lower-level `placeGauge` directly per gauge type.
- Switched the hook to `Window_StatusBase.prototype.placeGauge`. Fires once per hp/mp/tp call; we track the deepest y seen for the actor and append the BT gauge one `gaugeLineHeight` below it after the "last" type ("tp" if optDisplayTp, else "mp").
- Catches both default `Window_BattleStatus` (which still goes through placeGauge under the hood) and VisuMZ Sideview Battle UI.

## 2026-05-25 — KB_TitleCommands v2.8 (safe fixes)

Functional bugs only — structure untouched, behavior preserved.

- Fixed `@base KB_Core` annotation + `Imported.KB_Core` check → `KB_CoreEngine` (real plugin name). Removes the spurious "base plugin missing" warning on every boot.
- Fixed three `for (i = 0; …)` loops that were leaking `window.i` every frame in title-screen update paths (`createTitlePictureCommands`, `checkTPicCom`, `updateTComMouseIsOnPic`). Would collide with any other script using a bare `i`.
- Guarded `TpictureCom.getData()` against null `_orgXY` — happens when a title menu has 7+ entries but only 6 `Command Pos N` params are defined. Now warns + hides instead of crashing the title.
- Null-checked `_backSprite1/_backSprite2` before assigning bitmaps in `changeBackgroundsToPhase2` (defensive — if another plugin removes the back sprites, we no-op instead of throwing).
- Not addressed (deferred): KB namespace pollution, missing IIFE, stringly-typed booleans, dead `z` assignments — flagged but kept for a future pass.

## 2026-05-25 — Bóng Tối Gauge UI: real gauge sprite (v1.1)

- `KB_BongToiGauge` bumped to v1.1. The v1.0 implementation hooked `Window_StatusBase.prototype.drawActorName` to append `[BT:X/100]` to Hải's name — but `VisuMZ_3_SideviewBattleUI` replaces the default battle status window with sprite-based name rendering, so the suffix never appeared in actual battles.
- Replaced the text-suffix hook with `Sprite_KBBongToiGauge`, a `Sprite_Gauge` subclass whose `currentValue()` / `currentMaxValue()` read from `KB.BongToi`. Gauge colors shift from purple → orange → red as fill approaches max.
- The gauge is placed via `Window_StatusBase.prototype.placeBasicGauges` (core RMMZ, not affected by VisuMZ's minification). It sits one `gaugeLineHeight` below TP for Hải only, in `Scene_Battle` only.
- This works for both the default `Window_BattleStatus` and VisuMZ's `Window_SideviewUiBattleStatus` since both extend `Window_StatusBase`.
- `plugins.js` retains a cached "(v1.0)" description string — will refresh next time the user saves Plugin Manager; not load-blocking.

## 2026-05-25 — Ngọc Hồn convergence system

- Built `js/plugins/KB_NgocHonState.js` (v1.0). Custom plugin that:
  - Watches the 3 shard switches (`ngochon_son`/`thuy`/`phong` = ids 29/30/31)
  - Keeps `ngochon_count` (var 23) synced with the number of switches ON (0..3)
  - On all-3-ON convergence: removes a configured key item, adds a configured accessory armor, auto-equips on a configured actor/slot, plays optional SE, reserves an optional Common Event
  - Idempotent — runs the convergence chain once, gated by an optional "done" switch
  - Catch-up check on `Scene_Map.start` (handles savefiles where switches were flipped before the plugin was active)
  - Plugin commands: CollectShard, SetShard, ForceConvergence, ResetAll (debug), CheckNow
  - Pure `$gameSwitches` + `$gameVariables` state — save/load is automatic
- **Wiring still TODO**: create the Ngọc Hồn key item (Items.json) and Ngọc Hồn accessory (Armors.json), then set `keyItemId` / `accessoryArmorId` / `autoEquipActorId` / `convergenceCommonEventId` params in the Plugin Manager. Plugin no-ops on unconfigured IDs so it's safe to enable now and wire later.

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
