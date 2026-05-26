//=============================================================================
// KB_MainMenuVisual.js  v0.5.6
//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v0.5.6] Sumi-e ink-wash main menu — custom centered bottom hint.
 * @author KB
 *
 * @help
 * ============================================================================
 *  KB_MainMenuVisual v0.1 — Skeleton (no visual change by default)
 * ============================================================================
 *
 *  Spec: docs/spec/main-menu.md
 *  Stage: 4 of 14 (skeleton — classes defined, all layers gated OFF)
 *
 *  Designed for 1280x720. Positions scale proportionally via sx/sy helpers.
 *
 *  REQUIREMENTS:
 *   - KB_CoreEngine.js (load above)
 *   - KB_Localization.js (load above; menu CSV registered as "Menu")
 *   - VisuMZ_0_CoreEngine
 *   - VisuMZ_1_MainMenuCore (load BEFORE this plugin)
 *
 *  OPTIONAL INTEGRATIONS:
 *   - KB_BongToiGauge.js  — Bóng Tối gauge on actor cards
 *   - KB_NgocHonState.js  — Ngọc Hồn state indicator on actor cards
 *   - VisuMZ_2_QuestSystem — Scene_KBJournal → Quest Log
 *   - CGMZ_Encyclopedia    — Scene_KBJournal → Story Log + Monster Book
 *   - CGMZ_FastTravel      — menu_cmd_map handler
 *
 *  CLASSES (defined; layers added by Scene_Menu alias only when toggled on):
 *   - KB_MenuHeader            — top band: title + location + playtime + gold
 *   - KB_MenuAtmosphereLayer   — center: desaturated ink-wash of current map
 *   - KB_ActorCardMenu         — single party card: face + HP/MP + BT/Ngọc
 *   - KB_MenuPartyColumn       — right side: vertical stack of actor cards
 *   - Scene_KBJournal          — journal hub (Hồi Ký / Yêu Phổ / Nhiệm Vụ)
 *   - Window_KBJournalCommand  — 3-command window inside Scene_KBJournal
 *
 *  ENABLEMENT:
 *   All visual layers default OFF. Toggle them on incrementally via plugin
 *   params as their implementation lands (steps 5-14 of the spec).
 *
 *  COMMAND HANDLERS (auto-wired):
 *   - menu_cmd_journal (symbol "journal") → Scene_KBJournal
 *   - menu_cmd_map     (symbol "map")     → Scene_FastTravel (if loaded)
 *
 *  Scene_KBJournal will gracefully degrade if VisuMZ_2_QuestSystem or
 *  CGMZ_Encyclopedia are not loaded — the relevant sub-command becomes
 *  disabled rather than crashing.
 *
 * ============================================================================
 *
 * @param --- Resolution ---
 * @default
 *
 * @param Resolution Width
 * @type number
 * @default 1280
 *
 * @param Resolution Height
 * @type number
 * @default 720
 *
 * @param --- Layer Toggles ---
 * @default
 *
 * @param Enable Header
 * @desc Top band (title + location + playtime + gold). Step 9.
 * @type boolean
 * @default false
 *
 * @param Enable Atmosphere Panel
 * @desc Center desaturated ink-wash of current map. Step 6.
 * @type boolean
 * @default false
 *
 * @param Enable Party Column
 * @desc Right-side vertical stack of actor cards. Steps 7-8.
 * @type boolean
 * @default false
 *
 * @param --- Handler Wiring ---
 * @default
 *
 * @param Wire Journal Handler
 * @desc Push Scene_KBJournal when "journal" command is selected. Step 10.
 * @type boolean
 * @default false
 *
 * @param Wire Map Handler
 * @desc Push Scene_FastTravel when "map" command is selected. Step 13.
 * @type boolean
 * @default false
 *
 * @param --- Command Column Style (Step 5) ---
 * @default
 *
 * @param Enable Command Style
 * @desc Vertical left-column command list with brushstroke selection + slide-in animation. Step 5.
 * @type boolean
 * @default false
 *
 * @param Command Column Width
 * @desc Width of the vertical command column at 1280 design width.
 * @type number
 * @default 280
 *
 * @param Command Top Offset
 * @desc Y offset from the top to leave room for the header band.
 * @type number
 * @default 64
 *
 * @param Command Slide Distance
 * @desc Pixels the command column slides in from the left on menu open.
 * @type number
 * @default 60
 *
 * @param Command Slide Frames
 * @desc Frames the slide-in animation takes (60 = 1 second at 60fps).
 * @type number
 * @default 20
 *
 * @param Selection Color
 * @desc Brushstroke underline color for the selected command. Cinnabar 朱 by default.
 * @type string
 * @default #a52a2a
 *
 * @param Class Subtitle Font Size
 * @desc Font size for the class/level subtitle on actor cards. Smaller than the name.
 * @type number
 * @default 18
 *
 * @param Class Subtitle Color
 * @desc CSS color for the dimmed class/level subtitle. Warm gray ink by default.
 * @type string
 * @default #b8a888
 *
 * @param --- Header Band (Step 9) ---
 * @default
 *
 * @param Header Height
 * @desc Header band height at 720 design height. Should match Command Top Offset.
 * @type number
 * @default 64
 *
 * @param Header Title
 * @desc Title shown on the left. Leave blank to use $dataSystem.gameTitle.
 * @type string
 * @default
 *
 * @param Header Title Font Size
 * @desc Pixel font size for the header title.
 * @type number
 * @default 26
 *
 * @param Header Info Font Size
 * @desc Pixel font size for the right-side info (location, playtime, gold).
 * @type number
 * @default 18
 *
 * @param Header Title Color
 * @desc CSS color for the header title. Parchment cream by default.
 * @type string
 * @default #e8dcc4
 *
 * @param Header Info Color
 * @desc CSS color for the right-side info text. Dim warm gray by default.
 * @type string
 * @default #b8a888
 *
 * @param Header Background Alpha
 * @desc Opacity of the header ink-wash band (0 = transparent, 1 = solid black).
 * @type number
 * @decimals 2
 * @default 0.45
 *
 * @param Header Separator Color
 * @desc CSS color for the brushstroke hairline below the header.
 * @type string
 * @default #8a7866
 *
 * @param Header Hides VisuMZ Bars
 * @desc When the header is on, hide VisuMZ's bottom Playtime/Variable/Gold bars (header replaces them).
 * @type boolean
 * @default true
 *
 * @param Header Relocates Button Assist
 * @desc When the header is on, move VisuMZ's Button Assist window to the bottom so it stops overlapping the header.
 * @type boolean
 * @default true
 *
 * @param Use Custom Bottom Hint
 * @desc Replace VisuMZ's right-aligned Button Assist with a custom centered bottom hint bar on Scene_Menu only.
 * @type boolean
 * @default true
 *
 * @param Hint Height
 * @desc Hint bar height at 720 design height.
 * @type number
 * @default 56
 *
 * @param Hint OK Key
 * @desc Key indicator drawn before the OK label (e.g. "Z", or any short string).
 * @type string
 * @default Z
 *
 * @param Hint OK Label
 * @desc Action label for the OK key.
 * @type string
 * @default Chọn
 *
 * @param Hint Cancel Key
 * @desc Key indicator drawn before the Cancel label.
 * @type string
 * @default X
 *
 * @param Hint Cancel Label
 * @desc Action label for the Cancel key.
 * @type string
 * @default Hồi
 *
 * @param --- Atmosphere Panel (Step 6) ---
 * @default
 *
 * @param Atmosphere Panel X
 * @desc Left edge of atmosphere panel at 1280 design width (= where command column ends).
 * @type number
 * @default 280
 *
 * @param Atmosphere Panel Width
 * @desc Width of atmosphere panel at 1280 design width.
 * @type number
 * @default 600
 *
 * @param Atmosphere Top Margin
 * @desc Pixels from top of screen (matches Command Top Offset).
 * @type number
 * @default 64
 *
 * @param Atmosphere Bottom Margin
 * @desc Pixels reserved at the bottom for the time/gold bar.
 * @type number
 * @default 64
 *
 * @param Atmosphere Brightness
 * @desc Brightness multiplier after desaturation (1.0 = unchanged, lower = inkier).
 * @type number
 * @decimals 2
 * @default 0.80
 *
 * @param Atmosphere Vignette Strength
 * @desc Opacity of edge-darkening vignette (0 = none, 1 = strong).
 * @type number
 * @decimals 2
 * @default 0.55
 *
 * @param --- Party Column (Step 7) ---
 * @default
 *
 * @param Party Column X
 * @desc Left edge of party column at 1280 design width.
 * @type number
 * @default 880
 *
 * @param Party Card Width
 * @desc Width of each actor card at 1280 design width.
 * @type number
 * @default 380
 *
 * @param Party Card Height
 * @desc Height of each actor card at 720 design height. Needs to fit HP+MP+TP+DP rows for Hải.
 * @type number
 * @default 190
 *
 * @param Party Card Gap
 * @desc Vertical gap between actor cards in design pixels.
 * @type number
 * @default 4
 *
 * @param Hide Stock Status Window
 * @desc Hide VisuMZ's stock status window when Party Column is on.
 * @type boolean
 * @default true
 *
 * @param --- Debug ---
 * @default
 *
 * @param Debug Logging
 * @desc Print debug info to console (debug builds only).
 * @type boolean
 * @default false
 */

if (!Imported.KB_Core) {
    throw new Error("KB_MainMenuVisual yêu cầu KB_CoreEngine.js. Đặt nó phía trên.");
}
if (typeof KB_Localization === 'undefined' && typeof KBLocalization === 'undefined') {
    console.warn("[KB_MainMenuVisual] KB_Localization not detected — {key} substitution will not work.");
}

Imported.KB_MainMenuVisual = true;

(() => {
    'use strict';

    //==========================================================
    // PLUGIN PARAMETERS
    //==========================================================
    const P    = PluginManager.parameters("KB_MainMenuVisual");
    const num  = (k, d) => Number(P[k] ?? d);
    const str  = (k, d) => String(P[k] ?? d);
    // Default arg lets new params behave as documented even when the user
    // hasn't re-opened Plugin Manager (which is what regenerates plugins.js
    // with new param keys). Without it, every newly added param silently
    // becomes false on existing installs.
    const bool = (k, d = false) => KB.Utils.isTrue(P[k] ?? String(d));

    const RES_W = num('Resolution Width',  1280);
    const RES_H = num('Resolution Height', 720);

    const ENABLE_HEADER     = bool('Enable Header');
    const ENABLE_ATMOSPHERE = bool('Enable Atmosphere Panel');
    const ENABLE_PARTY      = bool('Enable Party Column');
    const WIRE_JOURNAL      = bool('Wire Journal Handler');
    const WIRE_MAP          = bool('Wire Map Handler');
    const DEBUG             = bool('Debug Logging');

    const ENABLE_CMD_STYLE  = bool('Enable Command Style');
    const CMD_COL_W         = num('Command Column Width',   280);
    const CMD_TOP_OFFSET    = num('Command Top Offset',      64);
    const SLIDE_DIST        = num('Command Slide Distance',  60);
    const SLIDE_FRAMES      = num('Command Slide Frames',    20);
    const SEL_COLOR         = str('Selection Color',     '#a52a2a');
    const SUBTITLE_FONT     = num('Class Subtitle Font Size',     18);
    const SUBTITLE_COLOR    = str('Class Subtitle Color',  '#b8a888');

    const HEADER_H          = num('Header Height',                64);
    const HEADER_TITLE_RAW  = str('Header Title',                  '');
    const HEADER_TITLE_FONT = num('Header Title Font Size',        26);
    const HEADER_INFO_FONT  = num('Header Info Font Size',         18);
    const HEADER_TITLE_COL  = str('Header Title Color',     '#e8dcc4');
    const HEADER_INFO_COL   = str('Header Info Color',      '#b8a888');
    const HEADER_BG_ALPHA   = num('Header Background Alpha',     0.45);
    const HEADER_SEP_COLOR  = str('Header Separator Color', '#8a7866');
    const HEADER_HIDE_BARS  = bool('Header Hides VisuMZ Bars',      true);
    const HEADER_MOVE_ASSIST = bool('Header Relocates Button Assist', true);
    const USE_CUSTOM_HINT   = bool('Use Custom Bottom Hint',        true);
    const HINT_H            = num('Hint Height',                      56);
    const HINT_OK_KEY       = str('Hint OK Key',                    'Z');
    const HINT_OK_LABEL     = str('Hint OK Label',                'Chọn');
    const HINT_CANCEL_KEY   = str('Hint Cancel Key',                'X');
    const HINT_CANCEL_LABEL = str('Hint Cancel Label',            'Hồi');

    const ATMOS_X           = num('Atmosphere Panel X',         280);
    const ATMOS_W           = num('Atmosphere Panel Width',     600);
    const ATMOS_TOP         = num('Atmosphere Top Margin',       64);
    const ATMOS_BOTTOM      = num('Atmosphere Bottom Margin',    64);
    const ATMOS_BRIGHTNESS  = num('Atmosphere Brightness',     0.80);
    const ATMOS_VIGNETTE    = num('Atmosphere Vignette Strength', 0.55);

    const PARTY_X           = num('Party Column X',             880);
    const CARD_W            = num('Party Card Width',           380);
    const CARD_H            = num('Party Card Height',          190);
    const CARD_GAP          = num('Party Card Gap',               4);
    const HIDE_STOCK_STATUS = bool('Hide Stock Status Window');

    const sx = (x) => Math.round(x * (Graphics.boxWidth  / RES_W));
    const sy = (y) => Math.round(y * (Graphics.boxHeight / RES_H));

    const dlog = (...args) => { if (DEBUG) console.warn('[KB_MainMenuVisual]', ...args); };

    dlog('Loaded. Toggles:', {
        header: ENABLE_HEADER,
        atmosphere: ENABLE_ATMOSPHERE,
        party: ENABLE_PARTY,
        journal: WIRE_JOURNAL,
        map: WIRE_MAP,
        cmdStyle: ENABLE_CMD_STYLE,
    });

    //==========================================================
    // STEP 5: Command column polish (ink-wash vertical column)
    //==========================================================
    if (ENABLE_CMD_STYLE) {
        // Reposition command window to vertical left column.
        // Patched as a method aliases (not a fresh class) so VisuMZ's
        // command-list logic (custom commands, show/enable JS) keeps working.
        // Leave room at the bottom for whatever hint bar we end up using
        // (custom centered hint OR relocated VisuMZ button assist), so the
        // command/status column doesn't render behind it.
        const _kbBottomReserve = function(scene) {
            if (ENABLE_HEADER && USE_CUSTOM_HINT) {
                return sy(HINT_H);
            }
            if (ENABLE_HEADER && HEADER_MOVE_ASSIST
                && scene && scene._buttonAssistWindow) {
                return scene._buttonAssistWindow.height;
            }
            return 0;
        };

        const _SceneMenu_commandWindowRect = Scene_Menu.prototype.commandWindowRect;
        Scene_Menu.prototype.commandWindowRect = function() {
            const top = sy(CMD_TOP_OFFSET);
            const h = Graphics.boxHeight - top - _kbBottomReserve(this);
            return new Rectangle(0, top, sx(CMD_COL_W), h);
        };

        // Shift VisuMZ's status window to the right of our command column.
        // Step 7 will replace this with KB_MenuPartyColumn; for now we just
        // get it out of the way so the column doesn't overlap.
        const _SceneMenu_statusWindowRect = Scene_Menu.prototype.statusWindowRect;
        Scene_Menu.prototype.statusWindowRect = function() {
            const top = sy(CMD_TOP_OFFSET);
            const h = Graphics.boxHeight - top - _kbBottomReserve(this);
            return new Rectangle(
                sx(CMD_COL_W), top,
                Graphics.boxWidth - sx(CMD_COL_W), h
            );
        };

        // Force single-column vertical command list.
        Window_MenuCommand.prototype.maxCols = function() { return 1; };

        // Brushstroke underline selection — drawn on contentsBack so it
        // sits behind text (matches battle UI pattern).
        Window_MenuCommand.prototype.drawItemBackground = function(index) {
            if (this.active && index === this._index && this.contentsBack) {
                const rect = this.itemLineRect(index);
                this.contentsBack.fillRect(
                    rect.x + 4,
                    rect.y + rect.height - 4,
                    rect.width - 8,
                    3,
                    SEL_COLOR
                );
            }
        };

        // Force redraw of old + new items on selection change so the
        // underline follows the cursor (drawItemBackground only fires
        // during redrawItem/drawAllItems, not on select).
        const _WMC_select = Window_MenuCommand.prototype.select;
        Window_MenuCommand.prototype.select = function(index) {
            const prev = this._index;
            _WMC_select.call(this, index);
            if (this.contents && this.contentsBack) {
                if (prev !== this._index && prev >= 0 && prev < this.maxItems()) {
                    this.redrawItem(prev);
                }
                if (this._index >= 0) this.redrawItem(this._index);
            }
        };

        // Repaint selection state when window gains/loses focus.
        const _WMC_activate = Window_MenuCommand.prototype.activate;
        Window_MenuCommand.prototype.activate = function() {
            _WMC_activate.call(this);
            if (this.contents && this._index >= 0) this.redrawItem(this._index);
        };
        const _WMC_deactivate = Window_MenuCommand.prototype.deactivate;
        Window_MenuCommand.prototype.deactivate = function() {
            _WMC_deactivate.call(this);
            if (this.contents && this._index >= 0) this.redrawItem(this._index);
        };

        // Hide default rectangular cursor — brushstroke replaces it.
        Window_MenuCommand.prototype.refreshCursor = function() {
            this.setCursorRect(0, 0, 0, 0);
        };
        Window_MenuCommand.prototype._refreshCursor = function() {
            this.setCursorRect(0, 0, 0, 0);
        };

        // Slide-in animation with cubic-out easing on window.x.
        const _WMC_initialize = Window_MenuCommand.prototype.initialize;
        Window_MenuCommand.prototype.initialize = function(rect) {
            _WMC_initialize.call(this, rect);
            this._kbHomeX     = this.x;
            this._kbSlideT    = 0;
            this._kbSlideMax  = SLIDE_FRAMES;
            this.x            = this._kbHomeX - sx(SLIDE_DIST);
        };

        const _WMC_update = Window_MenuCommand.prototype.update;
        Window_MenuCommand.prototype.update = function() {
            _WMC_update.call(this);
            if (this._kbSlideT < this._kbSlideMax) {
                this._kbSlideT++;
                const t = this._kbSlideT / this._kbSlideMax;
                const eased = 1 - Math.pow(1 - t, 3);
                this.x = (this._kbHomeX - sx(SLIDE_DIST)) + sx(SLIDE_DIST) * eased;
            }
        };

        dlog('Command column style enabled.');
    }

    //==========================================================
    // KB_MenuHeader — top band (step 9)
    //==========================================================
    // Single full-width Bitmap so background, hairline, and text all live on
    // one texture (no nested Sprites). Repaints when $gameSystem.playtime()
    // ticks so the clock advances smoothly while the menu is open.
    class KB_MenuHeader extends Sprite {
        constructor() {
            super();
            this.bitmap = new Bitmap(Graphics.boxWidth, sy(HEADER_H));
            this.x = 0;
            this.y = 0;
            this._lastPlaytime = -1;
            this._refreshScheduled = true;
        }

        update() {
            super.update();
            if (this._refreshScheduled) {
                this._refreshScheduled = false;
                this._lastPlaytime = $gameSystem.playtime();
                this.refresh();
                return;
            }
            const pt = $gameSystem.playtime();
            if (pt !== this._lastPlaytime) {
                this._lastPlaytime = pt;
                this.refresh();
            }
        }

        refresh() {
            if (!this.bitmap) return;
            try {
                this._paint();
            } catch (error) {
                console.error('[KB_MainMenuVisual] KB_MenuHeader.refresh failed:',
                    error, error && error.stack);
            }
        }

        _paint() {
            const bmp = this.bitmap;
            const w = bmp.width;
            const h = bmp.height;
            bmp.clear();

            // Ink-wash background: darker top, fading downward
            const ctx = bmp.context;
            if (ctx) {
                const grad = ctx.createLinearGradient(0, 0, 0, h);
                grad.addColorStop(0, `rgba(0,0,0,${HEADER_BG_ALPHA})`);
                grad.addColorStop(1, `rgba(0,0,0,${HEADER_BG_ALPHA * 0.55})`);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                bmp._baseTexture.update();
            }

            // Brushstroke hairline at the bottom edge
            bmp.fillRect(sx(24), h - 2, w - sx(48), 1, HEADER_SEP_COLOR);

            const padX = sx(24);
            const titleY = Math.floor((h - HEADER_TITLE_FONT) / 2) - 2;
            const infoY  = Math.floor((h - HEADER_INFO_FONT)  / 2);

            bmp.fontFace = $gameSystem.mainFontFace();

            // Title (left)
            bmp.fontSize = HEADER_TITLE_FONT;
            bmp.textColor = HEADER_TITLE_COL;
            const titleSrc = HEADER_TITLE_RAW && HEADER_TITLE_RAW.trim()
                ? HEADER_TITLE_RAW
                : (($dataSystem && $dataSystem.gameTitle) || '');
            const titleStr = this._localize(String(titleSrc));
            const titleMaxW = Math.floor(w * 0.42);
            const titleW = Math.min(bmp.measureTextWidth(titleStr), titleMaxW);
            if (titleStr) {
                bmp.drawText(titleStr, padX, titleY,
                    titleW || titleMaxW, HEADER_TITLE_FONT + 4, 'left');
            }

            // Right cluster: gold | playtime | location, right-aligned
            bmp.fontSize = HEADER_INFO_FONT;
            bmp.textColor = HEADER_INFO_COL;
            const gap = sx(20);
            let cursor = w - padX;

            const goldUnit = this._t('menu_unit_gold',
                TextManager.currencyUnit || 'Gold');
            const goldStr = String($gameParty.gold()) + ' ' + goldUnit;
            cursor = this._drawRight(bmp, goldStr, cursor, infoY) - gap;

            const ptLabel = this._t('menu_label_playtime', 'Playtime');
            const ptStr   = ptLabel + ' ' + $gameSystem.playtimeText();
            cursor = this._drawRight(bmp, ptStr, cursor, infoY) - gap;

            const locSrc = ($gameMap && $gameMap.displayName
                && $gameMap.displayName()) || '';
            const locStr = this._localize(String(locSrc).trim());
            if (locStr) {
                const leftLimit = padX + (titleStr ? titleW + sx(20) : 0);
                const maxLocW = Math.max(0, cursor - leftLimit);
                if (maxLocW > 0) {
                    const locW = Math.min(bmp.measureTextWidth(locStr), maxLocW);
                    bmp.drawText(locStr, cursor - locW, infoY,
                        locW, HEADER_INFO_FONT + 4, 'left');
                }
            }
        }

        _drawRight(bmp, text, rightEdge, y) {
            const tw = bmp.measureTextWidth(text);
            bmp.drawText(text, rightEdge - tw, y, tw, HEADER_INFO_FONT + 4, 'left');
            return rightEdge - tw;
        }

        _t(key, fallback) {
            if (typeof KB_Localization !== 'undefined' && KB_Localization.getText) {
                return KB_Localization.getText(key) || fallback;
            }
            if (typeof KBLocalization !== 'undefined' && KBLocalization.getText) {
                return KBLocalization.getText(key) || fallback;
            }
            return fallback;
        }

        // KB_Localization resolves {key} substitutions on demand for arbitrary
        // strings (map display names may contain them).
        _localize(text) {
            if (!text) return text;
            if (typeof KBLocalization !== 'undefined' && KBLocalization.process) {
                return KBLocalization.process(text);
            }
            return text;
        }
    }

    //==========================================================
    // KB_MenuButtonHint — centered bottom key-hint bar (step 9 polish)
    //==========================================================
    // VisuMZ's Window_ButtonAssist lays its segments out at fixed pixel
    // offsets calculated from full screen width — resize/shift hacks crop
    // or off-center it. Easier to draw our own centered hint and hide
    // VisuMZ's bar on Scene_Menu.
    class KB_MenuButtonHint extends Sprite {
        constructor() {
            super();
            this.bitmap = new Bitmap(Graphics.boxWidth, sy(HINT_H));
            this.x = 0;
            this.y = Graphics.boxHeight - sy(HINT_H);
            this._refreshScheduled = true;
        }
        update() {
            super.update();
            if (this._refreshScheduled) {
                this._refreshScheduled = false;
                this.refresh();
            }
        }
        refresh() {
            if (!this.bitmap) return;
            try {
                this._paint();
            } catch (error) {
                console.error('[KB_MainMenuVisual] KB_MenuButtonHint.refresh failed:',
                    error, error && error.stack);
            }
        }
        _paint() {
            const bmp = this.bitmap;
            const w = bmp.width;
            const h = bmp.height;
            bmp.clear();

            // Ink-wash bg matching the header (bottom darker than top so the
            // bar reads as a footer rather than a separate window).
            const ctx = bmp.context;
            if (ctx) {
                const grad = ctx.createLinearGradient(0, 0, 0, h);
                grad.addColorStop(0, `rgba(0,0,0,${HEADER_BG_ALPHA * 0.55})`);
                grad.addColorStop(1, `rgba(0,0,0,${HEADER_BG_ALPHA})`);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                bmp._baseTexture.update();
            }

            // Brushstroke hairline along the top edge (mirrors header's bottom)
            bmp.fillRect(sx(24), 1, w - sx(48), 1, HEADER_SEP_COLOR);

            bmp.fontFace = $gameSystem.mainFontFace();
            bmp.fontSize = HEADER_INFO_FONT;
            bmp.textColor = HEADER_INFO_COL;

            const okKey     = this._localize(HINT_OK_KEY);
            const okLabel   = this._localize(HINT_OK_LABEL);
            const cancelKey = this._localize(HINT_CANCEL_KEY);
            const cancelLab = this._localize(HINT_CANCEL_LABEL);

            const ok     = `[${okKey}] ${okLabel}`;
            const cancel = `[${cancelKey}] ${cancelLab}`;
            const sep    = '     ';
            const line   = ok + sep + cancel;

            const tw = bmp.measureTextWidth(line);
            const tx = Math.max(0, Math.floor((w - tw) / 2));
            const ty = Math.floor((h - HEADER_INFO_FONT) / 2);
            bmp.drawText(line, tx, ty, tw + 4, HEADER_INFO_FONT + 4, 'left');
        }
        _localize(text) {
            if (!text) return text;
            if (typeof KBLocalization !== 'undefined' && KBLocalization.process) {
                return KBLocalization.process(text);
            }
            return text;
        }
    }

    //==========================================================
    // KB_MenuAtmosphereLayer — center ink-wash panel (step 6)
    //==========================================================
    class KB_MenuAtmosphereLayer extends Sprite {
        constructor() {
            super();
            // When party or command column is on, span the full screen width
            // (under the command column too) so the entire menu has one
            // unified ink-wash backdrop. Otherwise honor the configured panel
            // X/W params for a more focused "viewport" frame.
            const spanFull = ENABLE_PARTY || ENABLE_CMD_STYLE;
            this.x = spanFull ? 0 : sx(ATMOS_X);
            this.y = sy(ATMOS_TOP);
            this._panelW = spanFull
                ? Graphics.boxWidth
                : sx(ATMOS_W);
            this._panelH = Graphics.boxHeight - sy(ATMOS_TOP) - sy(ATMOS_BOTTOM);
            this._built = false;
        }

        renderAtmosphere() {
            if (this._built) return;
            this._built = true;
            try {
                this._buildMapLayer();
                this._buildVignette();
                dlog('Atmosphere layer built;', this._panelW, 'x', this._panelH);
            } catch (error) {
                console.error('[KB_MainMenuVisual] Atmosphere build failed:',
                    error, error && error.stack);
            }
        }

        _buildMapLayer() {
            // Use the menu's background snapshot — captured automatically by
            // SceneManager when transitioning into a menu scene. Reflects the
            // current map at the moment the player opened the menu.
            const bg = (SceneManager.backgroundBitmap && SceneManager.backgroundBitmap()) || null;
            if (!bg || !bg.width || !bg.height) {
                this._buildFallbackWash();
                return;
            }

            this._mapSprite = new Sprite(bg);
            // Cover-fit: scale so the snapshot fills the panel without letterbox
            const scale = Math.max(this._panelW / bg.width, this._panelH / bg.height);
            this._mapSprite.scale.x = scale;
            this._mapSprite.scale.y = scale;
            this._mapSprite.x = (this._panelW - bg.width  * scale) / 2;
            this._mapSprite.y = (this._panelH - bg.height * scale) / 2;

            // Ink-wash filter chain: desaturate → brightness pull-down
            const filters = [];
            if (PIXI && PIXI.filters && PIXI.filters.ColorMatrixFilter) {
                const desat = new PIXI.filters.ColorMatrixFilter();
                desat.desaturate();
                filters.push(desat);

                const dim = new PIXI.filters.ColorMatrixFilter();
                dim.brightness(ATMOS_BRIGHTNESS, false);
                filters.push(dim);
            } else {
                dlog('PIXI.filters.ColorMatrixFilter unavailable — atmosphere will be unfiltered');
            }
            if (filters.length) this._mapSprite.filters = filters;

            // Mask the map sprite to the panel rect (clip the cover-fit overflow)
            const mask = new PIXI.Graphics();
            mask.beginFill(0xffffff);
            mask.drawRect(0, 0, this._panelW, this._panelH);
            mask.endFill();
            this._mapSprite.mask = mask;
            this.addChild(mask);
            this.addChild(this._mapSprite);
        }

        _buildFallbackWash() {
            // Used when SceneManager.backgroundBitmap is unavailable (rare).
            this.bitmap = new Bitmap(this._panelW, this._panelH);
            this.bitmap.fillRect(0, 0, this._panelW, this._panelH, '#2a2a2a');
        }

        _buildVignette() {
            const bmp = new Bitmap(this._panelW, this._panelH);
            const ctx = bmp.context;
            if (!ctx) return;
            const cx = this._panelW / 2;
            const cy = this._panelH / 2;
            const innerR = Math.min(this._panelW, this._panelH) * 0.30;
            const outerR = Math.max(this._panelW, this._panelH) * 0.72;
            const grad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, `rgba(0,0,0,${ATMOS_VIGNETTE})`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, this._panelW, this._panelH);
            bmp._baseTexture.update();

            const vig = new Sprite(bmp);
            this.addChild(vig);
        }
    }

    //==========================================================
    // KB_ActorCardMenu — single party member card (steps 7-8)
    //==========================================================
    // Extends Window_StatusBase so we inherit drawFace, drawActorName,
    // drawActorLevel, drawActorClass, drawActorHp/Mp/Tp helpers. The
    // window frame is hidden via setBackgroundType(2); only contents render.
    class KB_ActorCardMenu extends Window_StatusBase {
        constructor(actor, rect) {
            super(rect);
            this._actor = actor;
            this.setBackgroundType(2);  // transparent frame
            this.refresh();
        }

        refresh() {
            if (!this.contents) return;
            this.contents.clear();
            this.contentsBack.clear();
            if (!this._actor) return;
            try {
                this._drawCardBackground();
                this._drawIdentity();
                this._drawGauges();
            } catch (error) {
                console.error('[KB_MainMenuVisual] KB_ActorCardMenu.refresh failed:',
                    error, error && error.stack);
            }
        }

        _drawCardBackground() {
            // Subtle parchment-like background painted on contentsBack
            const w = this.contentsWidth();
            const h = this.contentsHeight();
            this.contentsBack.fillRect(0, 0, w, h, 'rgba(0,0,0,0.35)');
            // Hairline border at the bottom — matches the brushstroke language
            this.contentsBack.fillRect(0, h - 2, w, 1, '#8a7866');
        }

        _drawIdentity() {
            const fw = Math.floor(ImageManager.faceWidth  * 0.55);
            const fh = Math.floor(ImageManager.faceHeight * 0.55);
            this._drawFaceScaled(
                this._actor.faceName(),
                this._actor.faceIndex(),
                4, 4, fw, fh
            );

            const tx = fw + 16;
            const tw = this.contentsWidth() - tx - 4;
            const levelW = 50;
            this.drawActorName(this._actor, tx, 0, tw);
            this._drawSubtitleRow(this._actor, tx, 28, tw, levelW);
        }

        // Class name + level packed into one subtitle row beneath the name.
        // Smaller font + dim ink color so it reads as metadata, not a 2nd name.
        _drawSubtitleRow(actor, x, y, w, levelW) {
            const oldSize = this.contents.fontSize;
            this.contents.fontSize = SUBTITLE_FONT;

            // Class name (left, dim)
            this.changeTextColor(SUBTITLE_COLOR);
            this.drawText(actor.currentClass().name, x, y, w - levelW);

            // Level (right, same row)
            this.drawText('Lv', x + w - levelW, y, 22);
            this.drawText(actor.level, x + w - levelW + 18, y, 32, 'right');

            this.resetTextColor();
            this.contents.fontSize = oldSize;
        }

        // Replacement for Window_Base.drawFace that SCALES the source face
        // (144x144) into the target rect instead of cropping the top-left.
        // Also attaches a load listener for the bitmap so the first-time-open
        // race (PNG not yet loaded when refresh runs) self-heals.
        _drawFaceScaled(faceName, faceIndex, x, y, width, height) {
            if (!faceName) return;
            const bitmap = ImageManager.loadFace(faceName);
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(() => {
                    if (!this.destroyed) this.refresh();
                });
                return;
            }
            const pw = ImageManager.faceWidth;
            const ph = ImageManager.faceHeight;
            const sx = (faceIndex % 4) * pw;
            const sy = Math.floor(faceIndex / 4) * ph;
            this.contents.blt(bitmap, sx, sy, pw, ph, x, y, width, height);
        }

        _drawGauges() {
            const fw = ImageManager.faceWidth * 0.55;
            const x  = Math.floor(fw) + 16;
            const y  = 56;
            // placeBasicGauges places HP/MP/TP. KB_BongToiGauge's hook on
            // Window_StatusBase.placeGauge chains a DP gauge one row below
            // TP automatically for Hải (actor 3) — no extra wiring needed.
            this.placeBasicGauges(this._actor, x, y);
        }
    }

    //==========================================================
    // KB_MenuPartyColumn — right-side party column (step 7)
    //==========================================================
    class KB_MenuPartyColumn extends Sprite {
        constructor() {
            super();
            this.x = sx(PARTY_X);
            this.y = sy(CMD_TOP_OFFSET);
            this._cards = [];
        }

        refresh() {
            // Tear down any existing cards before respawning
            for (const c of this._cards) {
                this.removeChild(c);
                if (c.destroy) c.destroy({ children: true });
            }
            this._cards = [];

            const members = $gameParty.battleMembers();
            // Kick off face PNG loads as early as possible so the cards have
            // a chance of getting them on first draw.
            for (const m of members) {
                if (m && m.faceName && m.faceName()) {
                    ImageManager.loadFace(m.faceName());
                }
            }
            // Vertically center the stack within the available column height
            // so a 1- or 2-actor party doesn't leave a big empty gap below.
            const cardH = sy(CARD_H);
            const gap   = sy(CARD_GAP);
            const stackH = members.length * cardH
                + Math.max(0, members.length - 1) * gap;
            const colH = Graphics.boxHeight - this.y - sy(ATMOS_BOTTOM);
            const startY = Math.max(0, Math.floor((colH - stackH) / 2));
            for (let i = 0; i < members.length; i++) {
                const rect = new Rectangle(
                    0,
                    startY + (cardH + gap) * i,
                    sx(CARD_W),
                    cardH
                );
                const card = new KB_ActorCardMenu(members[i], rect);
                this.addChild(card);
                this._cards.push(card);
            }
            dlog('Party column refreshed:', this._cards.length, 'cards');
        }
    }

    //==========================================================
    // Window_KBJournalCommand — 3 commands inside journal hub (step 10)
    //==========================================================
    class Window_KBJournalCommand extends Window_Command {
        constructor(rect) {
            super(rect);
        }
        makeCommandList() {
            const t = (k, fallback) => {
                if (typeof KB_Localization !== 'undefined' && KB_Localization.getText) {
                    return KB_Localization.getText(k) || fallback;
                }
                if (typeof KBLocalization !== 'undefined' && KBLocalization.getText) {
                    return KBLocalization.getText(k) || fallback;
                }
                return fallback;
            };
            const questEnabled     = typeof Scene_Quest !== 'undefined';
            const encyclopediaOK   = typeof CGMZ_Scene_Encyclopedia !== 'undefined';
            this.addCommand(t('journal_cmd_story',     'Story Log'),    'story',    encyclopediaOK);
            this.addCommand(t('journal_cmd_bestiary',  'Monster Book'), 'bestiary', encyclopediaOK);
            this.addCommand(t('journal_cmd_quest',     'Quest Log'),    'quest',    questEnabled);
        }
    }

    //==========================================================
    // Scene_KBJournal — journal hub scene (step 10)
    //==========================================================
    class Scene_KBJournal extends Scene_MenuBase {
        create() {
            super.create();
            this.createJournalCommandWindow();
        }
        createJournalCommandWindow() {
            const rect = this.journalCommandRect();
            this._journalCommandWindow = new Window_KBJournalCommand(rect);
            this._journalCommandWindow.setHandler('story',    this.commandStory.bind(this));
            this._journalCommandWindow.setHandler('bestiary', this.commandBestiary.bind(this));
            this._journalCommandWindow.setHandler('quest',    this.commandQuest.bind(this));
            this._journalCommandWindow.setHandler('cancel',   this.popScene.bind(this));
            this.addWindow(this._journalCommandWindow);
        }
        journalCommandRect() {
            const w = sx(320);
            const h = this.calcWindowHeight(3, true);
            const x = Math.floor((Graphics.boxWidth - w) / 2);
            const y = Math.floor((Graphics.boxHeight - h) / 2);
            return new Rectangle(x, y, w, h);
        }
        commandStory() {
            // step 12: push CGMZ_Encyclopedia, jump to Lore category
            dlog('Scene_KBJournal.commandStory — stub (step 12)');
            this._journalCommandWindow.activate();
        }
        commandBestiary() {
            // step 12: push CGMZ_Encyclopedia, jump to Bestiary category
            dlog('Scene_KBJournal.commandBestiary — stub (step 12)');
            this._journalCommandWindow.activate();
        }
        commandQuest() {
            // step 11: push VisuMZ Scene_Quest
            if (typeof Scene_Quest !== 'undefined') {
                SceneManager.push(Scene_Quest);
            } else {
                dlog('Scene_KBJournal.commandQuest — Scene_Quest not loaded; staying put');
                this._journalCommandWindow.activate();
            }
        }
    }
    window.Scene_KBJournal = Scene_KBJournal;

    //==========================================================
    // Scene_Menu alias — instantiate enabled layers
    //==========================================================
    const _SceneMenu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _SceneMenu_create.call(this);
        try {
            if (ENABLE_HEADER) {
                this._kbHeader = new KB_MenuHeader();
                this.addChild(this._kbHeader);
                // The header band now carries playtime + gold + location, so
                // VisuMZ's bottom Playtime/Variable/Gold windows duplicate it.
                if (HEADER_HIDE_BARS) {
                    for (const key of ['_playtimeWindow', '_variableWindow', '_goldWindow']) {
                        const w = this[key];
                        if (w) { w.hide(); w.deactivate(); }
                    }
                }
                if (USE_CUSTOM_HINT) {
                    // Drop VisuMZ's button assist entirely; our hint replaces
                    // it on this scene only (other scenes keep VisuMZ's bar).
                    if (this._buttonAssistWindow) {
                        this._buttonAssistWindow.visible = false;
                        this._buttonAssistWindow.deactivate();
                    }
                    this._kbHint = new KB_MenuButtonHint();
                    this.addChild(this._kbHint);
                } else if (HEADER_MOVE_ASSIST && this._buttonAssistWindow) {
                    // Fallback: keep VisuMZ's bar but drop it to the bottom
                    // edge so it stops overlapping the header band.
                    const baw = this._buttonAssistWindow;
                    baw.y = Graphics.boxHeight - baw.height;
                }
            }
            if (ENABLE_ATMOSPHERE) {
                this._kbAtmosphere = new KB_MenuAtmosphereLayer();
                // Insert BEFORE the window layer so the ink-wash sits behind
                // the command/status windows, not on top of them. Adding via
                // addChild() (the previous default) puts the panel above the
                // window layer and the command icons disappear.
                const wlIdx = this._windowLayer
                    ? this.getChildIndex(this._windowLayer)
                    : this.children.length;
                this.addChildAt(this._kbAtmosphere, wlIdx);
                this._kbAtmosphere.renderAtmosphere();
            }
            if (ENABLE_PARTY) {
                this._kbPartyColumn = new KB_MenuPartyColumn();
                this.addChild(this._kbPartyColumn);
                this._kbPartyColumn.refresh();
            }
        } catch (error) {
            console.error('[KB_MainMenuVisual] Scene_Menu.create layer init failed:', error, error && error.stack);
        }
    };

    //==========================================================
    // Scene_Menu status window — hide when party column is enabled
    //==========================================================
    const _SceneMenu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _SceneMenu_createStatusWindow.call(this);
        if (ENABLE_PARTY && HIDE_STOCK_STATUS && this._statusWindow) {
            this._statusWindow.hide();
            this._statusWindow.deactivate();
            // Some VisuMZ builds keep the frame sprite around even when
            // visible=false. setBackgroundType(2) drops the windowskin frame
            // entirely so no ghost rectangle leaks through.
            this._statusWindow.setBackgroundType(2);
            dlog('Stock status window hidden.');
        }
    };

    // Make the command column transparent when our ink-wash style is on, so
    // its windowskin frame doesn't compete with the atmosphere panel that
    // now spans full-width beneath it.
    if (ENABLE_CMD_STYLE) {
        const _SceneMenu_createCommandWindow_kbStyle = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _SceneMenu_createCommandWindow_kbStyle.call(this);
            if (this._commandWindow) {
                this._commandWindow.setBackgroundType(2);
            }
        };
    }

    //==========================================================
    // Scene_Menu command handlers — journal + map symbol wiring
    //==========================================================
    const _SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _SceneMenu_createCommandWindow.call(this);
        if (WIRE_JOURNAL && this._commandWindow) {
            this._commandWindow.setHandler('journal', this.commandJournal.bind(this));
        }
        if (WIRE_MAP && this._commandWindow) {
            this._commandWindow.setHandler('map', this.commandMap.bind(this));
        }
    };
    Scene_Menu.prototype.commandJournal = function() {
        SceneManager.push(Scene_KBJournal);
    };
    Scene_Menu.prototype.commandMap = function() {
        if (typeof Scene_FastTravel !== 'undefined') {
            SceneManager.push(Scene_FastTravel);
        } else {
            dlog('commandMap — Scene_FastTravel not loaded; ignoring');
            this._commandWindow.activate();
        }
    };

})();
