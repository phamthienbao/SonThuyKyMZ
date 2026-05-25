//=============================================================================
// KB_BongToiGauge.js
// (C) 2026 KB
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.4) Bóng Tối Gauge — cơ chế đặc trưng của Hải. Đầy bình → mất kiểm soát 1 turn.
 * @author KB
 * @base KB_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * KB Bóng Tối Gauge (v1.0)
 * ============================================================================
 *
 * YÊU CẦU:
 * - KB_CoreEngine phải nằm phía trên plugin này.
 * - Nên đặt sau VisuMZ_1_BattleCore.
 *
 * CƠ CHẾ:
 * Hải có một thanh "Bóng Tối" (0–Max). Thanh tăng khi:
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
 * UI:
 *   Hiển thị "[BT: X/Max]" sau tên Hải trong Battle Status Window.
 *   (Có thể tắt qua param "Hiện gauge trong battle".)
 *
 * COMMANDS (plugin command):
 *   - SetGauge value: đặt giá trị thanh.
 *   - AddGauge value: cộng/trừ.
 *   - ResetGauge:     reset.
 *   - TriggerOverflow: ép overflow ngay.
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
 * @desc Hiện gauge Bóng Tối overlay dưới panel của Hải.
 * @type boolean
 * @default true
 *
 * @param gaugeWidth
 * @text Bề rộng gauge (px)
 * @desc Bề rộng của thanh gauge overlay.
 * @type number
 * @min 32
 * @default 160
 *
 * @param gaugeOffsetX
 * @text Offset X so với panel Hải
 * @desc Dịch ngang so với góc trái của Window_SideviewUiBattleStatus của Hải.
 * @type number
 * @min -2000
 * @default 0
 *
 * @param gaugeOffsetY
 * @text Offset Y so với panel Hải
 * @desc Dịch dọc so với mép dưới panel của Hải (số dương = bên dưới).
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
KB.Versions.BongToi = "1.4.0";

(() => {
    "use strict";

    const PLUGIN_NAME = "KB_BongToiGauge";
    const TAG = `[${PLUGIN_NAME}]`;

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

    const P = {
        actorId:          _num("actorId", 3),
        gaugeVarId:       _num("gaugeVarId", 22),
        overflowSwitchId: _num("overflowSwitchId", 32),
        maxValue:         _num("maxValue", 100),
        overflowStateId:  _num("overflowStateId", 28),
        lowHpThreshold:   _num("lowHpThreshold", 30),
        lowHpFillPerTurn: _num("lowHpFillPerTurn", 10),
        decayPerTurn:     _num("decayPerTurn", 0),
        showInBattle:     _bool("showInBattle", true),
        gaugeWidth:       _num("gaugeWidth", 160),
        gaugeOffsetX:     _num("gaugeOffsetX", 0),
        gaugeOffsetY:     _num("gaugeOffsetY", 4),
        debugMode:        _bool("debugMode", false),
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
            // Apply state only during battle; out of battle we just flip the switch.
            if ($gameParty.inBattle()) {
                hai.addState(P.overflowStateId);
                dbg("triggerOverflow: applied state", P.overflowStateId, "to Hải");
            }
            // Reset gauge after triggering.
            $gameVariables.setValue(P.gaugeVarId, 0);
        } catch (e) { errLog("triggerOverflow", e); }
    };

    KB.BongToi._maybeOverflow = function() {
        try {
            if (this.get() >= P.maxValue) this.triggerOverflow();
        } catch (e) { errLog("_maybeOverflow", e); }
    };

    // --- Notetag parsing -------------------------------------------------
    // Accepts: <bongtoi: +10>, <bongtoi: -5>, <bongtoi: reset>
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
            // Only fire once per action — applyItemUserEffect runs for each target.
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

    // --- UI: custom Bóng Tối gauge sprite ---------------------------------
    // Drawn below HP/MP/TP in any Window_StatusBase that hosts Hải. Works with
    // both the default Window_BattleStatus AND VisuMZ_3_SideviewBattleUI's
    // Window_SideviewUiBattleStatus (both extend Window_StatusBase and call
    // placeBasicGauges, which is core RMMZ and not minified by VisuMZ).

    function Sprite_KBBongToiGauge() {
        this.initialize(...arguments);
    }
    Sprite_KBBongToiGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_KBBongToiGauge.prototype.constructor = Sprite_KBBongToiGauge;

    Sprite_KBBongToiGauge.prototype.label = function() { return "BT"; };
    Sprite_KBBongToiGauge.prototype.currentValue = function() {
        return KB.BongToi.get();
    };
    Sprite_KBBongToiGauge.prototype.currentMaxValue = function() {
        return P.maxValue;
    };
    Sprite_KBBongToiGauge.prototype.gaugeColor1 = function() {
        const v = this.currentValue(), max = this.currentMaxValue();
        if (v >= max) return "#FF3355";
        if (v >= max * 0.8) return "#C04A00";
        return "#3A1A5C";
    };
    Sprite_KBBongToiGauge.prototype.gaugeColor2 = function() {
        const v = this.currentValue(), max = this.currentMaxValue();
        if (v >= max) return "#FFAA88";
        if (v >= max * 0.8) return "#E18800";
        return "#A48EE1";
    };
    Sprite_KBBongToiGauge.prototype.labelColor = function() {
        return ColorManager.systemColor();
    };
    // Width comes from plugin param — VisuMZ's status panels are narrow, but
    // because we render OUTSIDE the panel (as a scene overlay) we're not
    // bound by their dimensions.
    Sprite_KBBongToiGauge.prototype.bitmapWidth = function() {
        return P.gaugeWidth;
    };

    KB.BongToi.Sprite = Sprite_KBBongToiGauge;

    // --- Scene_Battle overlay ---------------------------------------------
    // Earlier attempts (v1.1 hooked placeBasicGauges, v1.2 hooked placeGauge)
    // both placed the gauge as a child of Window_SideviewUiBattleStatus.
    // That window is sized for HP/MP/TP only (~105px tall) and masks anything
    // drawn below — so the gauge was created with visible:true but clipped
    // off-screen. v1.3 creates the gauge as a child of the Scene_Battle root,
    // outside any window mask, and repositions it each frame to track Hải's
    // status panel.

    if (P.showInBattle) {
        const _SceneBattle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
        Scene_Battle.prototype.createDisplayObjects = function() {
            _SceneBattle_createDisplayObjects.call(this);
            try {
                this._kbBongToiOverlay = new Sprite_KBBongToiGauge();
                const hai = KB.BongToi.haiActor();
                if (hai) this._kbBongToiOverlay.setup(hai, "kb_bongtoi");
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
            // VisuMZ_3_SideviewBattleUI doesn't store the actor on the window
            // under the standard `_actor` field — every Window_SideviewUiBattle
            // Status reports _actor: undefined. We rely instead on a stashed
            // reference set by the placeGauge hook below: whichever window
            // VisuMZ calls placeGauge(haiActor, …) on is Hải's panel.
            const w = this._kbHaiWindow;
            if (w && w.visible && w.width && w.height) return w;
            return null;
        };

        // Lightweight placeGauge hook used ONLY to discover which window
        // belongs to Hải. We do NOT draw the gauge in-window (that gets
        // clipped — see v1.2/v1.3 changelog). The overlay sprite lives at
        // the scene level and is repositioned each frame in Scene_Battle.update.
        const _placeGauge = Window_StatusBase.prototype.placeGauge;
        Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
            _placeGauge.call(this, actor, type, x, y);
            try {
                if (!actor || !actor.actorId) return;
                if (actor.actorId() !== P.actorId) return;
                const scene = SceneManager._scene;
                if (scene instanceof Scene_Battle) scene._kbHaiWindow = this;
            } catch (e) { errLog("placeGauge:track", e); }
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

    // --- Reset on new game / between battles (defensive) ------------------

    const _GameSystem_init = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _GameSystem_init.call(this);
        // Don't touch the gauge here — it's stored in $gameVariables which is
        // initialized separately. New-game variables default to 0 anyway.
    };

    // --- Reset _kbBongToiApplied flag on each new action -----------------
    // (handled implicitly since Game_Action instances are short-lived)

})();
