//=============================================================================
// KB_BongToiGauge.js
// (C) 2026 KB
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.0) Bóng Tối Gauge — cơ chế đặc trưng của Hải. Đầy bình → mất kiểm soát 1 turn.
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
 * @desc Hiện "[BT: X/Max]" sau tên Hải trong Battle Status Window.
 * @type boolean
 * @default true
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
KB.Versions.BongToi = "1.0.0";

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

    // --- UI: append "[BT: X/Max]" to Hải's name in Battle Status ----------

    if (P.showInBattle && typeof Window_BattleStatus !== "undefined") {
        const _drawActorName = Window_StatusBase.prototype.drawActorName;
        Window_StatusBase.prototype.drawActorName = function(actor, x, y, width) {
            try {
                if (actor && actor.actorId && actor.actorId() === P.actorId) {
                    const v = KB.BongToi.get();
                    const max = P.maxValue;
                    // Color hint: red-ish if over 80%.
                    const overflowing = v >= max;
                    const nearMax = v >= max * 0.8;
                    const suffix = ` [BT:${v}/${max}]`;
                    const origColor = this.changeTextColor.bind(this);
                    _drawActorName.call(this, actor, x, y, width);
                    // Draw suffix beside the name.
                    const nameWidth = this.textWidth(actor.name());
                    this.changeTextColor(overflowing ? "#FF3355" : (nearMax ? "#E18800" : "#A48EE1"));
                    this.drawText(suffix, x + nameWidth, y, width - nameWidth);
                    this.resetTextColor();
                    return; // we already drew, skip default
                }
            } catch (e) { errLog("drawActorName", e); }
            _drawActorName.call(this, actor, x, y, width);
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
