//=============================================================================
// KB_NgocHonState.js
// (C) 2026 KB
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.0) Ngọc Hồn — 3 mảnh hội tụ (Sơn/Thuỷ/Phong) → key item biến thành phụ kiện.
 * @author KB
 * @base KB_CoreEngine
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * KB Ngọc Hồn State (v1.0)
 * ============================================================================
 *
 * YÊU CẦU:
 * - KB_CoreEngine phải nằm phía trên plugin này.
 * - Nên đặt sau VisuMZ_1_ItemsEquipsCore (nếu auto-equip vào slot Accessory).
 *
 * CƠ CHẾ:
 * Ngọc Hồn được nhặt ở Ch.2 dưới dạng KEY ITEM (mảnh vỡ). Trong Ch.3-4 đội
 * hình thu thập 3 mảnh năng lượng (Sơn / Thuỷ / Phong), được đại diện bởi
 * 3 switch trong dữ liệu game:
 *
 *   - `ngochon_son`   (mảnh Đất / Voi Chín Ngà)
 *   - `ngochon_thuy`  (mảnh Nước / Hải)
 *   - `ngochon_phong` (mảnh Gió / Ngựa Chín Hồng Mao)
 *
 * Khi event/quest bật ON cả 3 switch → plugin tự động:
 *   1. Xoá KEY ITEM Ngọc Hồn khỏi túi (nếu được cấu hình).
 *   2. Thêm ARMOR Ngọc Hồn (phụ kiện) vào túi.
 *   3. (Tuỳ chọn) Auto-equip lên một actor được cấu hình.
 *   4. (Tuỳ chọn) Chạy Common Event hội tụ (cutscene, fanfare, v.v.).
 *   5. Bật một switch "convergence done" để các event sau check.
 *
 * Plugin chỉ chạy chuỗi convergence MỘT LẦN — sau khi đã chạy, switch
 * `convergenceDoneSwitch` được bật và mọi save/load sau sẽ không re-trigger.
 *
 * Biến `ngochon_count` luôn được đồng bộ với số switch ON (0..3).
 *
 * PLUGIN COMMANDS:
 *   - CollectShard <son|thuy|phong>  — bật switch tương ứng.
 *   - SetShard <son|thuy|phong> <on|off> — đặt switch cụ thể.
 *   - ForceConvergence — bật cả 3 switch ngay.
 *   - ResetAll — tắt 3 switch + reset count + reset converged flag (DEBUG ONLY).
 *   - CheckNow — chạy convergence check ngay (dùng khi cần tự sync sau khi
 *                edit switch bằng tay trong Editor lúc test).
 *
 * SAVE/LOAD:
 *   Tất cả state nằm trong $gameSwitches + $gameVariables — save tự động.
 *
 * ============================================================================
 *
 * @param sonSwitchId
 * @text Switch ID — mảnh Sơn (Earth)
 * @desc Switch bật khi nhặt được mảnh Đất. Mặc định 29 = "ngochon_son".
 * @type switch
 * @default 29
 *
 * @param thuySwitchId
 * @text Switch ID — mảnh Thuỷ (Water)
 * @desc Switch bật khi nhặt được mảnh Nước. Mặc định 30 = "ngochon_thuy".
 * @type switch
 * @default 30
 *
 * @param phongSwitchId
 * @text Switch ID — mảnh Phong (Wind)
 * @desc Switch bật khi nhặt được mảnh Gió. Mặc định 31 = "ngochon_phong".
 * @type switch
 * @default 31
 *
 * @param countVarId
 * @text Variable ID — đếm số mảnh
 * @desc Biến lưu số mảnh đã thu thập (0..3). Mặc định 23 = "ngochon_count".
 * @type variable
 * @default 23
 *
 * @param convergenceDoneSwitchId
 * @text Switch ID — đã hội tụ
 * @desc Switch bật sau khi chuỗi convergence chạy xong (chống re-trigger). 0 = không dùng.
 * @type switch
 * @default 0
 *
 * @param keyItemId
 * @text Item ID — Ngọc Hồn (key item, mảnh vỡ)
 * @desc Key item bị xoá khi hội tụ. 0 = không xoá gì.
 * @type item
 * @default 0
 *
 * @param accessoryArmorId
 * @text Armor ID — Ngọc Hồn (phụ kiện)
 * @desc Armor được thêm vào túi khi hội tụ. 0 = không thêm.
 * @type armor
 * @default 0
 *
 * @param autoEquipActorId
 * @text Actor auto-equip
 * @desc Actor được tự động trang bị phụ kiện. 0 = chỉ thêm vào túi, không equip.
 * @type actor
 * @default 0
 *
 * @param equipSlotIndex
 * @text Equip slot index
 * @desc Slot index để equip (0=Weapon, 1=Shield, 2=Head, 3=Body, 4=Accessory).
 * @type number
 * @min 0
 * @max 7
 * @default 4
 *
 * @param convergenceCommonEventId
 * @text Common Event hội tụ
 * @desc Common Event được gọi khi đủ 3 mảnh (cutscene/fanfare). 0 = không gọi.
 * @type common_event
 * @default 0
 *
 * @param convergenceSe
 * @text SE khi hội tụ
 * @desc Sound effect phát khi convergence chạy. Để trống = không phát.
 * @type file
 * @dir audio/se/
 * @default
 *
 * @param convergenceSeVolume
 * @text SE volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param debugMode
 * @text Debug Mode
 * @desc Bật để console.log mỗi thay đổi (chỉ dùng khi test).
 * @type boolean
 * @default false
 *
 * @command CollectShard
 * @text Thu thập mảnh
 * @desc Bật switch của một mảnh.
 * @arg shard
 * @type select
 * @option son
 * @option thuy
 * @option phong
 * @default son
 *
 * @command SetShard
 * @text Đặt trạng thái mảnh
 * @arg shard
 * @type select
 * @option son
 * @option thuy
 * @option phong
 * @default son
 * @arg value
 * @type boolean
 * @default true
 *
 * @command ForceConvergence
 * @text Ép hội tụ ngay
 *
 * @command ResetAll
 * @text Reset toàn bộ (DEBUG)
 *
 * @command CheckNow
 * @text Kiểm tra hội tụ ngay
 */

var Imported = Imported || {};
Imported.KB_NgocHonState = true;

var KB = KB || {};
KB.NgocHon = KB.NgocHon || {};
KB.Versions = KB.Versions || {};
KB.Versions.NgocHon = "1.0.0";

(() => {
    "use strict";

    const PLUGIN_NAME = "KB_NgocHonState";
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
    const _str = (k, d) => (typeof _raw[k] === "string" && _raw[k].length > 0) ? _raw[k] : d;

    const P = {
        sonSwitchId:               _num("sonSwitchId", 29),
        thuySwitchId:              _num("thuySwitchId", 30),
        phongSwitchId:             _num("phongSwitchId", 31),
        countVarId:                _num("countVarId", 23),
        convergenceDoneSwitchId:   _num("convergenceDoneSwitchId", 0),
        keyItemId:                 _num("keyItemId", 0),
        accessoryArmorId:          _num("accessoryArmorId", 0),
        autoEquipActorId:          _num("autoEquipActorId", 0),
        equipSlotIndex:            _num("equipSlotIndex", 4),
        convergenceCommonEventId:  _num("convergenceCommonEventId", 0),
        convergenceSe:             _str("convergenceSe", ""),
        convergenceSeVolume:       _num("convergenceSeVolume", 90),
        debugMode:                 _bool("debugMode", false),
    };

    KB.NgocHon.params = P;

    const dbg = (...args) => { if (P.debugMode) console.log(TAG, ...args); };
    const errLog = (where, err) => {
        // Per project safety rule: log full context, never swallow.
        console.error(`${TAG} [${where}] error:`, err && err.message, err && err.stack);
    };

    const SHARD_IDS = () => ({
        son:   P.sonSwitchId,
        thuy:  P.thuySwitchId,
        phong: P.phongSwitchId,
    });

    // --- Public API ------------------------------------------------------

    KB.NgocHon.has = function(shard) {
        if (!$gameSwitches) return false;
        const id = SHARD_IDS()[shard];
        return id ? $gameSwitches.value(id) : false;
    };

    KB.NgocHon.count = function() {
        if (!$gameSwitches) return 0;
        const ids = SHARD_IDS();
        return ["son", "thuy", "phong"].reduce(
            (n, k) => n + ($gameSwitches.value(ids[k]) ? 1 : 0), 0
        );
    };

    KB.NgocHon.syncCount = function() {
        try {
            if (!$gameVariables) return;
            if (P.countVarId > 0) $gameVariables.setValue(P.countVarId, this.count());
        } catch (e) { errLog("syncCount", e); }
    };

    KB.NgocHon.isConverged = function() {
        if (P.convergenceDoneSwitchId <= 0) return false;
        return $gameSwitches ? !!$gameSwitches.value(P.convergenceDoneSwitchId) : false;
    };

    KB.NgocHon.setShard = function(shard, value) {
        try {
            const id = SHARD_IDS()[shard];
            if (!id) { dbg("setShard: unknown shard", shard); return; }
            $gameSwitches.setValue(id, !!value);
            // Game_Switches.setValue hook below handles syncCount + maybeConverge.
        } catch (e) { errLog("setShard", e); }
    };

    KB.NgocHon.forceConvergence = function() {
        try {
            const ids = SHARD_IDS();
            $gameSwitches.setValue(ids.son, true);
            $gameSwitches.setValue(ids.thuy, true);
            $gameSwitches.setValue(ids.phong, true);
        } catch (e) { errLog("forceConvergence", e); }
    };

    KB.NgocHon.resetAll = function() {
        try {
            const ids = SHARD_IDS();
            $gameSwitches.setValue(ids.son, false);
            $gameSwitches.setValue(ids.thuy, false);
            $gameSwitches.setValue(ids.phong, false);
            if (P.countVarId > 0) $gameVariables.setValue(P.countVarId, 0);
            if (P.convergenceDoneSwitchId > 0) $gameSwitches.setValue(P.convergenceDoneSwitchId, false);
            dbg("resetAll");
        } catch (e) { errLog("resetAll", e); }
    };

    KB.NgocHon._maybeConverge = function() {
        try {
            if (this.isConverged()) return;
            if (this.count() < 3) return;
            this._runConvergence();
        } catch (e) { errLog("_maybeConverge", e); }
    };

    KB.NgocHon._runConvergence = function() {
        dbg("convergence triggered");

        // 1. Swap key item → accessory (only act on IDs that are configured).
        try {
            if (P.keyItemId > 0 && $dataItems && $dataItems[P.keyItemId]) {
                const keyItem = $dataItems[P.keyItemId];
                const owned = $gameParty.numItems(keyItem);
                if (owned > 0) $gameParty.loseItem(keyItem, owned, false);
                dbg(`removed ${owned} key item(s) id=${P.keyItemId}`);
            }
        } catch (e) { errLog("_runConvergence:keyItem", e); }

        try {
            if (P.accessoryArmorId > 0 && $dataArmors && $dataArmors[P.accessoryArmorId]) {
                const armor = $dataArmors[P.accessoryArmorId];
                $gameParty.gainItem(armor, 1, false);
                dbg(`added armor id=${P.accessoryArmorId}`);

                // 2. Auto-equip on configured actor.
                if (P.autoEquipActorId > 0) {
                    const actor = $gameActors.actor(P.autoEquipActorId);
                    if (actor) {
                        const slots = actor.equipSlots();
                        if (P.equipSlotIndex >= 0 && P.equipSlotIndex < slots.length) {
                            actor.changeEquip(P.equipSlotIndex, armor);
                            dbg(`equipped on actor=${P.autoEquipActorId} slot=${P.equipSlotIndex}`);
                        } else {
                            dbg(`equipSlotIndex ${P.equipSlotIndex} out of range for actor ${P.autoEquipActorId}`);
                        }
                    }
                }
            }
        } catch (e) { errLog("_runConvergence:armor", e); }

        // 3. Mark converged BEFORE common event so the event doesn't re-trigger
        //    if it itself toggles a shard switch.
        try {
            if (P.convergenceDoneSwitchId > 0) {
                $gameSwitches.setValue(P.convergenceDoneSwitchId, true);
            }
        } catch (e) { errLog("_runConvergence:doneSwitch", e); }

        // 4. SE.
        try {
            if (P.convergenceSe) {
                AudioManager.playSe({
                    name: P.convergenceSe,
                    volume: P.convergenceSeVolume,
                    pitch: 100,
                    pan: 0,
                });
            }
        } catch (e) { errLog("_runConvergence:se", e); }

        // 5. Common event.
        try {
            if (P.convergenceCommonEventId > 0) {
                $gameTemp.reserveCommonEvent(P.convergenceCommonEventId);
                dbg(`reserved common event ${P.convergenceCommonEventId}`);
            }
        } catch (e) { errLog("_runConvergence:commonEvent", e); }
    };

    // --- Hook: Game_Switches.setValue ------------------------------------
    // The 3 shard switches are normally flipped via event editor; we listen
    // here to sync the count variable and auto-trigger convergence.

    const _GameSwitches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(switchId, value) {
        _GameSwitches_setValue.call(this, switchId, value);
        try {
            const ids = SHARD_IDS();
            if (switchId === ids.son || switchId === ids.thuy || switchId === ids.phong) {
                KB.NgocHon.syncCount();
                KB.NgocHon._maybeConverge();
            }
        } catch (e) { errLog("Game_Switches.setValue", e); }
    };

    // --- Scene_Map.start: catch-up check on load --------------------------
    // If a savefile has all 3 switches ON but conversion never ran (e.g. plugin
    // added mid-playthrough), this ensures convergence eventually fires.

    const _SceneMap_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _SceneMap_start.call(this);
        try {
            KB.NgocHon.syncCount();
            KB.NgocHon._maybeConverge();
        } catch (e) { errLog("Scene_Map.start", e); }
    };

    // --- Plugin commands -------------------------------------------------

    PluginManager.registerCommand(PLUGIN_NAME, "CollectShard", args => {
        const shard = String(args.shard || "").toLowerCase();
        KB.NgocHon.setShard(shard, true);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "SetShard", args => {
        const shard = String(args.shard || "").toLowerCase();
        const value = args.value === "true" || args.value === true;
        KB.NgocHon.setShard(shard, value);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "ForceConvergence", () => {
        KB.NgocHon.forceConvergence();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "ResetAll", () => {
        KB.NgocHon.resetAll();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "CheckNow", () => {
        KB.NgocHon.syncCount();
        KB.NgocHon._maybeConverge();
    });

})();
