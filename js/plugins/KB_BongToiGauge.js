//=============================================================================
// KB_BongToiGauge.js
// (C) 2026 KB
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.5) Bóng Tối / DP Gauge — Hải's signature gauge. Renders next to HP/MP/TP in VisuMZ Sideview UI.
 * @author KB
 * @base KB_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_3_SideviewBattleUI
 *
 * @help
 * ============================================================================
 * KB Bóng Tối Gauge (v1.5)
 * ============================================================================
 *
 * YÊU CẦU:
 * - KB_CoreEngine phải nằm phía trên plugin này.
 * - Nên đặt sau VisuMZ_1_BattleCore và VisuMZ_3_SideviewBattleUI.
 *
 * CƠ CHẾ:
 * Hải có một thanh "Bóng Tối" (DP — Dark Point) 0..Max. Thanh tăng khi:
 *   1. Hải dùng skill có notetag `<bongtoi: +N>`.
 *   2. HP của Hải xuống dưới % ngưỡng (mặc định 30%).
 *   3. Hải nhận state có notetag `<bongtoi: +N>` (ví dụ tự buff Long Vương).
 *
 * Khi thanh đầy:
 *   - Tự động áp dụng "Overflow State" (Bóng Tối Bùng Phát) lên Hải.
 *   - Reset thanh về 0.
 *   - State khiến Hải mất kiểm soát 1 turn (restriction: 2 — tấn công random).
 *
 * Skill "Tĩnh Tâm" (notetag `<bongtoi: reset>`) reset thanh ngay lập tức.
 *
 * NOTETAGS:
 *   Skill / Item / State:
 *     <bongtoi: +N>     — Tăng N (N có thể âm).
 *     <bongtoi: reset>  — Reset về 0.
 *
 * GAUGE PERSISTENCE:
 *   Thanh được lưu trong $gameVariables — save/load tự động.
 *
 * UI MODES (v1.5):
 *   - "panel"   : Vẽ DP gauge BÊN TRONG panel sideview của Hải, ngay dưới TP.
 *                 Đi cùng HP/MP/TP, tự nhận theme/scale của VisuMZ sideview UI.
 *   - "overlay" : Vẽ overlay sprite ở scene level (cách cũ của v1.3/v1.4).
 *                 Fallback cho trường hợp không dùng VisuMZ_3_SideviewBattleUI
 *                 hoặc panel không có chỗ.
 *
 *   Đổi qua tham số "drawMode". Mặc định: panel.
 *
 * COMMANDS (plugin command):
 *   - SetGauge value, AddGauge value, ResetGauge, TriggerOverflow.
 *
 * ============================================================================
 *
 * @param actorId
 * @text Actor ID của Hải
 * @desc ID nhân vật áp dụng Bóng Tối Gauge.
 * @type actor
 * @default 3
 *
 * @param gaugeVarId
 * @text Variable ID lưu gauge
 * @desc $gameVariables ID giữ giá trị 0..max. Mặc định 22 = "bongtoi_gauge".
 * @type variable
 * @default 22
 *
 * @param overflowSwitchId
 * @text Switch ID overflow
 * @desc Switch bật khi gauge tràn (cho event check). Mặc định 32 = "bongtoi_overflow".
 * @type switch
 * @default 32
 *
 * @param maxValue
 * @text Giá trị Max
 * @desc Khi gauge ≥ giá trị này → overflow.
 * @type number
 * @min 1
 * @default 100
 *
 * @param overflowStateId
 * @text State ID khi overflow
 * @desc ID state áp dụng (Bóng Tối Bùng Phát).
 * @type state
 * @default 28
 *
 * @param lowHpThreshold
 * @text Ngưỡng HP thấp (%)
 * @desc HP của Hải dưới % này → fill mỗi turn.
 * @type number
 * @min 0
 * @max 100
 * @default 30
 *
 * @param lowHpFillPerTurn
 * @text Lượng fill khi HP thấp
 * @desc Cộng vào gauge mỗi turn khi HP < ngưỡng.
 * @type number
 * @min 0
 * @default 10
 *
 * @param decayPerTurn
 * @text Decay mỗi turn
 * @desc Trừ gauge mỗi turn (0 = không decay).
 * @type number
 * @min 0
 * @default 0
 *
 * @param showInBattle
 * @text Hiện gauge trong battle
 * @desc Hiện DP gauge cho Hải trong battle scene.
 * @type boolean
 * @default true
 *
 * @param drawMode
 * @text Chế độ vẽ
 * @desc "panel" = cùng panel HP/MP/TP (VisuMZ Sideview UI). "overlay" = sprite riêng dưới panel.
 * @type select
 * @option panel
 * @option overlay
 * @default panel
 *
 * @param label
 * @text Nhãn gauge
 * @desc Text hiển thị bên trái gauge. Dùng "DP" cho English, "BT" cho Việt.
 * @default DP
 *
 * @param panelGaugeWidth
 * @text Width (panel mode)
 * @desc Bề rộng DP gauge khi vẽ trong panel sideview. Nên fit với HP/MP/TP của VisuMZ.
 * @type number
 * @min 16
 * @default 96
 *
 * @param panelGaugeOffsetX
 * @text Offset X (panel mode)
 * @desc Lệch ngang khỏi vị trí TP gauge. 0 = thẳng cột TP.
 * @type number
 * @min -2000
 * @default 0
 *
 * @param panelGaugeOffsetY
 * @text Offset Y (panel mode)
 * @desc Lệch dọc khỏi vị trí TP gauge. Mặc định = 1 row dưới TP.
 * @type number
 * @min -2000
 * @default 0
 *
 * @param gaugeWidth
 * @text Width (overlay mode)
 * @desc Bề rộng overlay sprite (scene-level).
 * @type number
 * @min 32
 * @default 160
 *
 * @param gaugeOffsetX
 * @text Offset X (overlay mode)
 * @desc Lệch ngang so với góc trái panel của Hải khi overlay.
 * @type number
 * @min -2000
 * @default 0
 *
 * @param gaugeOffsetY
 * @text Offset Y (overlay mode)
 * @desc Lệch dọc dưới mép panel khi overlay.
 * @type number
 * @min -2000
 * @default 4
 *
 * @param debugMode
 * @text Debug Mode
 * @desc Bật để console.log mỗi thay đổi (chỉ dùng khi test).
 * @type boolean
 * @default false
 *
 * @command SetGauge
 * @text Set Bóng Tối Gauge
 * @desc Đặt giá trị gauge.
 * @arg value
 * @type number
 * @min 0
 * @default 0
 *
 * @command AddGauge
 * @text Cộng/Trừ Bóng Tối Gauge
 * @arg value
 * @type number
 * @default 10
 *
 * @command ResetGauge
 * @text Reset Bóng Tối Gauge
 *
 * @command TriggerOverflow
 * @text Ép Overflow ngay
 */

var Imported = Imported || {};
Imported.KB_BongToiGauge = true;

var KB = KB || {};
KB.BongToi = KB.BongToi || {};
KB.Versions = KB.Versions || {};
KB.Versions.BongToi = "1.5.0";

(() => {
    "use strict";

    const PLUGIN_NAME = "KB_BongToiGauge";
    const TAG = `[${PLUGIN_NAME}]`;
    const GAUGE_TYPE = "kb_bongtoi";

    // --- Parse params (defensive) ----------------------------------------
    const _raw = PluginManager.parameters(PLUGIN_NAME);
    const _num = (k, d) => {
        const n = Number(_raw[k]);
        return Number.isFinite(n) ? n : d;
    };
    const _bool = (k, d) => {
        if (_raw[k] === "true") return true;
        if (_raw[k] === "false") return false;
        return d;
    };
    const _str = (k, d) => {
        const v = _raw[k];
        return (typeof v === "string" && v.length > 0) ? v : d;
    };

    const P = {
        actorId:           _num("actorId", 3),
        gaugeVarId:        _num("gaugeVarId", 22),
        overflowSwitchId:  _num("overflowSwitchId", 32),
        maxValue:          _num("maxValue", 100),
        overflowStateId:   _num("overflowStateId", 28),
        lowHpThreshold:    _num("lowHpThreshold", 30),
        lowHpFillPerTurn:  _num("lowHpFillPerTurn", 10),
        decayPerTurn:      _num("decayPerTurn", 0),
        showInBattle:      _bool("showInBattle", true),
        drawMode:          _str("drawMode", "panel"),
        label:             _str("label", "DP"),
        panelGaugeWidth:   _num("panelGaugeWidth", 96),
        panelGaugeOffsetX: _num("panelGaugeOffsetX", 0),
        panelGaugeOffsetY: _num("panelGaugeOffsetY", 0),
        gaugeWidth:        _num("gaugeWidth", 160),
        gaugeOffsetX:      _num("gaugeOffsetX", 0),
        gaugeOffsetY:      _num("gaugeOffsetY", 4),
        debugMode:         _bool("debugMode", false),
    };

    KB.BongToi.params = P;

    const dbg = (...args) => { if (P.debugMode) console.log(TAG, ...args); };
    const errLog = (where, err) => {
        // Per project safety rule: log full context, never swallow.
        console.error(`${TAG} [${where}] error:`, err && err.message, err && err.stack);
    };

    // --- Public API ------------------------------------------------------

    KB.BongToi.get = function() {
        return $gameVariables ? Number($gameVariables.value(P.gaugeVarId)) || 0 : 0;
    };

    KB.BongToi.max = function() { return P.maxValue; };

    KB.BongToi.set = function(v) {
        try {
            const clamped = Math.max(0, Math.min(P.maxValue, Math.floor(v)));
            $gameVariables.setValue(P.gaugeVarId, clamped);
            dbg("set →", clamped);
            this._maybeOverflow();
        } catch (e) { errLog("set", e); }
    };

    KB.BongToi.add = function(delta) {
        try {
            const cur = this.get();
            this.set(cur + delta);
        } catch (e) { errLog("add", e); }
    };

    KB.BongToi.reset = function() {
        try {
            $gameVariables.setValue(P.gaugeVarId, 0);
            $gameSwitches.setValue(P.overflowSwitchId, false);
            dbg("reset");
        } catch (e) { errLog("reset", e); }
    };

    KB.BongToi.haiActor = function() {
        return $gameActors ? $gameActors.actor(P.actorId) : null;
    };

    KB.BongToi.triggerOverflow = function() {
        try {
            const hai = this.haiActor();
            if (!hai) { dbg("triggerOverflow: Hải actor missing"); return; }
            $gameSwitches.setValue(P.overflowSwitchId, true);
            if ($gameParty.inBattle()) {
                hai.addState(P.overflowStateId);
                dbg("triggerOverflow: applied state", P.overflowStateId, "to Hải");
            }
            $gameVariables.setValue(P.gaugeVarId, 0);
        } catch (e) { errLog("triggerOverflow", e); }
    };

    KB.BongToi._maybeOverflow = function() {
        try {
            if (this.get() >= P.maxValue) this.triggerOverflow();
        } catch (e) { errLog("_maybeOverflow", e); }
    };

    // --- Notetag parsing -------------------------------------------------
    const RE_BONGTOI = /<\s*bongtoi\s*:\s*([+-]?\d+|reset)\s*>/i;

    function readNote(obj) {
        if (!obj || !obj.note) return null;
        const m = obj.note.match(RE_BONGTOI);
        if (!m) return null;
        const v = m[1].toLowerCase();
        return (v === "reset") ? { reset: true } : { delta: parseInt(v, 10) };
    }

    KB.BongToi._applyNote = function(obj, isHai) {
        try {
            if (!isHai) return;
            const note = readNote(obj);
            if (!note) return;
            if (note.reset) {
                this.reset();
            } else if (typeof note.delta === "number") {
                this.add(note.delta);
            }
        } catch (e) { errLog("_applyNote", e); }
    };

    // --- Hooks: skill / item use -----------------------------------------

    const _GameAction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _GameAction_applyItemUserEffect.call(this, target);
        try {
            const subject = this.subject();
            if (!subject || !subject.isActor()) return;
            if (subject.actorId() !== P.actorId) return;
            if (this._kbBongToiApplied) return;
            this._kbBongToiApplied = true;
            KB.BongToi._applyNote(this.item(), true);
        } catch (e) { errLog("applyItemUserEffect", e); }
    };

    // --- Hooks: state add ------------------------------------------------

    const _GameBattler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        _GameBattler_addState.call(this, stateId);
        try {
            if (!this.isActor()) return;
            if (this.actorId() !== P.actorId) return;
            const stateData = $dataStates[stateId];
            KB.BongToi._applyNote(stateData, true);
        } catch (e) { errLog("addState", e); }
    };

    // --- Turn-end hooks: low-HP fill + decay ------------------------------

    const _BattleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
        try {
            const hai = KB.BongToi.haiActor();
            if (hai && hai.isAlive && hai.isAlive()) {
                const hpPercent = (hai.hp / hai.mhp) * 100;
                if (hpPercent < P.lowHpThreshold && P.lowHpFillPerTurn > 0) {
                    KB.BongToi.add(P.lowHpFillPerTurn);
                    dbg(`low-HP fill: HP=${hpPercent.toFixed(1)}%, +${P.lowHpFillPerTurn}`);
                }
                if (P.decayPerTurn > 0) {
                    KB.BongToi.add(-P.decayPerTurn);
                }
            }
        } catch (e) { errLog("BattleManager.endTurn", e); }
        _BattleManager_endTurn.call(this);
    };

    // --- Reset overflow switch on battle end ------------------------------

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        try {
            $gameSwitches.setValue(P.overflowSwitchId, false);
        } catch (e) { errLog("endBattle", e); }
        _BattleManager_endBattle.call(this, result);
    };

    // --- Sprite class -----------------------------------------------------
    // Single base class; two width subclasses to suit "panel" vs "overlay"
    // contexts. createInnerSprite calls `new C()` with no args, so bitmap
    // dimensions must be class-level — we can't pass a width per-instance.

    function Sprite_KBBongToiGaugeBase() { this.initialize(...arguments); }
    Sprite_KBBongToiGaugeBase.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_KBBongToiGaugeBase.prototype.constructor = Sprite_KBBongToiGaugeBase;

    Sprite_KBBongToiGaugeBase.prototype.label = function() { return P.label; };
    Sprite_KBBongToiGaugeBase.prototype.currentValue = function() {
        return KB.BongToi.get();
    };
    Sprite_KBBongToiGaugeBase.prototype.currentMaxValue = function() {
        return P.maxValue;
    };
    Sprite_KBBongToiGaugeBase.prototype.gaugeColor1 = function() {
        const v = this.currentValue(), max = this.currentMaxValue();
        if (v >= max) return "#FF3355";
        if (v >= max * 0.8) return "#C04A00";
        return "#3A1A5C";
    };
    Sprite_KBBongToiGaugeBase.prototype.gaugeColor2 = function() {
        const v = this.currentValue(), max = this.currentMaxValue();
        if (v >= max) return "#FFAA88";
        if (v >= max * 0.8) return "#E18800";
        return "#A48EE1";
    };
    Sprite_KBBongToiGaugeBase.prototype.labelColor = function() {
        return ColorManager.systemColor();
    };

    function Sprite_KBBongToiGaugePanel() { this.initialize(...arguments); }
    Sprite_KBBongToiGaugePanel.prototype = Object.create(Sprite_KBBongToiGaugeBase.prototype);
    Sprite_KBBongToiGaugePanel.prototype.constructor = Sprite_KBBongToiGaugePanel;
    Sprite_KBBongToiGaugePanel.prototype.bitmapWidth = function() {
        return P.panelGaugeWidth;
    };

    function Sprite_KBBongToiGaugeOverlay() { this.initialize(...arguments); }
    Sprite_KBBongToiGaugeOverlay.prototype = Object.create(Sprite_KBBongToiGaugeBase.prototype);
    Sprite_KBBongToiGaugeOverlay.prototype.constructor = Sprite_KBBongToiGaugeOverlay;
    Sprite_KBBongToiGaugeOverlay.prototype.bitmapWidth = function() {
        return P.gaugeWidth;
    };

    KB.BongToi.Sprite = Sprite_KBBongToiGaugeBase;
    KB.BongToi.SpritePanel = Sprite_KBBongToiGaugePanel;
    KB.BongToi.SpriteOverlay = Sprite_KBBongToiGaugeOverlay;

    // --- Window_StatusBase.placeGauge hook --------------------------------
    // Intercept the core gauge-placement so:
    //   (a) type === "kb_bongtoi" routes to our custom sprite class instead
    //       of the default Sprite_Gauge (which has no notion of our value).
    //   (b) Whenever VisuMZ sideview UI places a "tp" gauge for Hải, we
    //       chain a DP placement one gaugeLineHeight() below at the same X.
    //       This puts DP visually next to HP/MP/TP, sharing the same panel
    //       theming and scale.
    //   (c) Track Hải's status window for overlay mode (legacy path).

    // --- Window_SideviewUiBattleStatus height + position patch ------------
    // VisuMZ auto-sizes each Sideview status panel for exactly HP+MP+TP rows
    // (HEIGHT_BASE = "auto") and stacks them top-to-bottom in party order.
    // Our DP row needs a 4th gauge slot inside Hải's panel, so we:
    //   (1) Grow Hải's window height by one gauge row when updateBattler()
    //       binds Hải — opens room inside the contents mask for DP.
    //   (2) Each frame in updateSideviewUiPosition, shift panels for any
    //       party member positioned AFTER Hải by the same extra height so
    //       they don't overlap Hải's now-taller panel.
    //
    // VisuMZ stores the bound battler at `_battler` (not `_actor`).

    function _kbExtraRowHeight(window) {
        return window.gaugeLineHeight() + Math.max(0, P.panelGaugeOffsetY);
    }

    function _kbHaiPartyIndex() {
        if (!$gameParty || !$gameParty.battleMembers) return -1;
        const members = $gameParty.battleMembers();
        for (let i = 0; i < members.length; i++) {
            const m = members[i];
            if (m && m.actorId && m.actorId() === P.actorId) return i;
        }
        return -1;
    }

    if (P.showInBattle && P.drawMode === "panel" &&
        typeof Window_SideviewUiBattleStatus !== "undefined") {

        const _updateBattler = Window_SideviewUiBattleStatus.prototype.updateBattler;
        Window_SideviewUiBattleStatus.prototype.updateBattler = function() {
            _updateBattler.call(this);
            try {
                const b = this._battler;
                if (!b || !b.isActor || !b.isActor()) return;
                if (b.actorId() !== P.actorId) return;
                if (this._kbHeightExpanded) return;
                const extra = _kbExtraRowHeight(this);
                this.height += extra;
                this._kbHeightExpanded = true;
                this._kbExtraHeight = extra;
                this.createContents();
                this.refresh();
                dbg(`expanded Hải panel by ${extra}px to fit DP gauge`);
            } catch (e) { errLog("Window_SideviewUiBattleStatus.updateBattler", e); }
        };

        const _updateSideviewUiPosition = Window_SideviewUiBattleStatus.prototype.updateSideviewUiPosition;
        if (typeof _updateSideviewUiPosition === "function") {
            Window_SideviewUiBattleStatus.prototype.updateSideviewUiPosition = function() {
                _updateSideviewUiPosition.call(this);
                try {
                    const b = this._battler;
                    if (!b || !b.isActor || !b.isActor()) return;
                    if (b.actorId() === P.actorId) return;
                    const haiIdx = _kbHaiPartyIndex();
                    if (haiIdx < 0) return;
                    const myIdx = $gameParty.battleMembers().indexOf(b);
                    if (myIdx <= haiIdx) return;
                    this.y += _kbExtraRowHeight(this);
                } catch (e) { errLog("updateSideviewUiPosition", e); }
            };
        }
    }

    const _placeGauge = Window_StatusBase.prototype.placeGauge;
    Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
        if (type === GAUGE_TYPE) {
            try {
                const key = "actor%1-gauge-%2".format(actor.actorId(), type);
                const sprite = this.createInnerSprite(key, Sprite_KBBongToiGaugePanel);
                sprite.setup(actor, type);
                sprite.move(x, y);
                sprite.show();
            } catch (e) { errLog("placeGauge:kb_bongtoi", e); }
            return;
        }

        _placeGauge.call(this, actor, type, x, y);

        try {
            if (!actor || !actor.actorId) return;
            const isHai = actor.actorId() === P.actorId;
            if (!isHai) return;

            if (P.showInBattle && P.drawMode === "panel" && type === "tp") {
                const dy = y + this.gaugeLineHeight() + P.panelGaugeOffsetY;
                const dx = x + P.panelGaugeOffsetX;
                this.placeGauge(actor, GAUGE_TYPE, dx, dy);
            }

            if (P.drawMode === "overlay") {
                const scene = SceneManager._scene;
                if (scene instanceof Scene_Battle) scene._kbHaiWindow = this;
            }
        } catch (e) { errLog("placeGauge:hook", e); }
    };

    // --- Scene_Battle overlay (legacy fallback) ---------------------------
    // Only active when drawMode === "overlay". The placeGauge hook above
    // populates scene._kbHaiWindow so the overlay can track Hải's panel.

    if (P.showInBattle && P.drawMode === "overlay") {
        const _SceneBattle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
        Scene_Battle.prototype.createDisplayObjects = function() {
            _SceneBattle_createDisplayObjects.call(this);
            try {
                this._kbBongToiOverlay = new Sprite_KBBongToiGaugeOverlay();
                const hai = KB.BongToi.haiActor();
                if (hai) this._kbBongToiOverlay.setup(hai, GAUGE_TYPE);
                this._kbBongToiOverlay.visible = false;
                this.addChild(this._kbBongToiOverlay);
            } catch (e) { errLog("createDisplayObjects", e); }
        };

        const _SceneBattle_update = Scene_Battle.prototype.update;
        Scene_Battle.prototype.update = function() {
            _SceneBattle_update.call(this);
            try {
                if (!this._kbBongToiOverlay) return;
                const haiWindow = this._kbFindHaiStatusWindow();
                if (!haiWindow) { this._kbBongToiOverlay.visible = false; return; }
                this._kbBongToiOverlay.x = haiWindow.x + P.gaugeOffsetX;
                this._kbBongToiOverlay.y = haiWindow.y + haiWindow.height + P.gaugeOffsetY;
                this._kbBongToiOverlay.opacity = haiWindow.contentsOpacity || haiWindow.opacity || 255;
                this._kbBongToiOverlay.visible = haiWindow.visible;
            } catch (e) { errLog("Scene_Battle.update", e); }
        };

        Scene_Battle.prototype._kbFindHaiStatusWindow = function() {
            const w = this._kbHaiWindow;
            if (w && w.visible && w.width && w.height) return w;
            return null;
        };
    }

    // --- Plugin commands -------------------------------------------------

    PluginManager.registerCommand(PLUGIN_NAME, "SetGauge", args => {
        const v = Number(args.value);
        if (Number.isFinite(v)) KB.BongToi.set(v);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "AddGauge", args => {
        const v = Number(args.value);
        if (Number.isFinite(v)) KB.BongToi.add(v);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "ResetGauge", () => {
        KB.BongToi.reset();
    });
    PluginManager.registerCommand(PLUGIN_NAME, "TriggerOverflow", () => {
        KB.BongToi.triggerOverflow();
    });

})();
