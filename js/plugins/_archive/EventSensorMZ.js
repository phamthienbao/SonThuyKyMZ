//=============================================================================
// NearEventSensorMZ.js
// ----------------------------------------------------------------------------
// (C) 2015-2023 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 4.0.0 2023/08/06 Adapted for RPG Maker MZ
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Near Event Sensor Plugin
 * @author Triacontane
 *
 * @param DefaultFlash
 * @text Default Flash
 * @desc Flash the event with the specified color when detected. (ON/OFF)
 * @default true
 * @type boolean
 *
 * @param DefaultBalloon
 * @text Default Balloon
 * @desc Automatically display a balloon icon on the event when detected.
 * (1: Surprised 2: Question 3: Music Note 4: Heart 5: Angry....)
 * @default 0
 * @type select
 * @option None
 * @value 0
 * @option Surprised
 * @value 1
 * @option Question
 * @value 2
 * @option Music Note
 * @value 3
 * @option Heart
 * @value 4
 * @option Angry
 * @value 5
 * @option Sweat
 * @value 6
 * @option Frustration
 * @value 7
 * @option Silence
 * @value 8
 * @option Light Bulb
 * @value 9
 * @option Zzz
 * @value 10
 * @option User Defined 1
 * @value 11
 * @option User Defined 2
 * @value 12
 * @option User Defined 3
 * @value 13
 * @option User Defined 4
 * @value 14
 * @option User Defined 5
 * @value 15
 *
 * @param DisableEmpty
 * @text Disable Empty Events
 * @desc Do not detect events with empty contents. (ON/OFF)
 * @default true
 * @type boolean
 *
 * @param SensorDistance
 * @text Sensor Distance
 * @desc The distance at which events are detected.
 * @default 2
 * @type number
 *
 * @param FlashColor
 * @text Flash Color
 * @desc The flash color when detected. Specify in the order of R (Red), G (Green), B (Blue), A (Alpha).
 * @default {"Red":"255","Green":"255","Blue":"255","Alpha":"255"}
 * @type struct<Color>
 *
 * @param FlashDuration
 * @text Flash Duration
 * @desc The number of frames for the flash.
 * @default 60
 * @type number
 *
 * @param BalloonInterval
 * @text Balloon Interval
 * @desc The interval of frames to display the balloon.
 * @default 15
 * @type number
 *
 * @param WaitForBalloon
 * @text Wait for Balloon Completion
 * @desc In continuous balloon display, wait for the balloon display to complete before displaying the next one.
 * @default true
 * @type boolean
 *
 * @param ConsiderationDir
 * @text Consider Direction
 * @desc Enable effects only when the player is facing the event. (ON/OFF)
 * @default false
 * @type boolean
 *
 * @param ApplyPlayer
 * @text Apply to Player
 * @desc Apply the detection effect to the player instead of the target event.
 * @default false
 * @type boolean
 *
 * @param EraseWhenAway
 * @text Erase When Away
 * @desc Erase the effect when away from the event.
 * @default false
 * @type boolean
 *
 * @param ConditionReverse
 * @text Reverse Condition
 * @desc Reverse the condition to display the effect when the switch or self-switch is OFF.
 * @default false
 * @type boolean
 *
 * @help This plugin generates effects for events that are near the player, improving usability by notifying which events are actionable. Effects available are flash and balloon icons (or both).
 *
 * You can enable or disable effects through plugin parameters or individual event note tags, with individual settings taking priority.
 *
 * To use flash as the detection effect, specify the following in the event's note tag:
 * <NESFlashEvent:ON>  # Enable flash for the target event.
 * <NESFlashEvent:OFF> # Disable flash for the target event.
 *
 * To use balloon icons as the detection effect, specify the following in the event's note tag:
 * <NESBalloonEvent:1> # Set the target event's balloon to (1: Surprised).
 * <NESBalloonEvent:0> # Disable balloon for the target event.
 *
 * To display the detection effect only when a specific switch or self-switch is ON, specify the following in the event's note tag:
 * <NESSwitch:1>       # Display the effect only when switch [1] is ON.
 * <NESSelfSwitch:A>   # Display the effect only when self-switch [A] is ON.
 *
 * This plugin does not have any plugin commands.
 *
 * Terms of Use:
 * You can modify and redistribute without permission from the author. There are no restrictions on usage (commercial, 18+ use, etc.).
 * This plugin is now yours.
 */

/*~struct~Color:
 * @param Red
 * @desc The red value (0-255).
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Green
 * @desc The green value (0-255).
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Blue
 * @desc The blue value (0-255).
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param Alpha
 * @desc The alpha value (0-255).
 * @type number
 * @min 0
 * @max 255
 * @default 255
 */

(() => {
    'use strict';
    const metaTagPrefix = 'NES';

    const getArgNumber = (arg, min = -Infinity, max = Infinity) => {
        return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };

    const getArgBoolean = (arg) => {
        return arg === true ? true : (arg || '').toUpperCase() === 'ON' || (arg || '').toUpperCase() === 'TRUE';
    };

    const getMetaValue = (object, name) => {
        const metaTagName = metaTagPrefix + (name ? name : '');
        return object.meta.hasOwnProperty(metaTagName) ? object.meta[metaTagName] : undefined;
    };

    const getMetaValues = (object, names) => {
        if (!Array.isArray(names)) return getMetaValue(object, names);
        for (const name of names) {
            const value = getMetaValue(object, name);
            if (value !== undefined) return value;
        }
        return undefined;
    };

    const convertEscapeCharacters = (text) => {
        if (text == null) text = '';
        const windowLayer = SceneManager._scene._windowLayer;
        return windowLayer ? windowLayer.children[0].convertEscapeCharacters(text) : text;
    };

    //=============================================================================
    // Retrieve and format plugin parameters
    //=============================================================================
    const createPluginParameter = (pluginName) => {
        const paramReplacer = (key, value) => {
            if (value === 'null') {
                return value;
            }
            if (value[0] === '"' && value[value.length - 1] === '"') {
                return value;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        };
        const parameter = JSON.parse(JSON.stringify(PluginManager.parameters(pluginName), paramReplacer));
        PluginManager.setParameters(pluginName, parameter);
        return parameter;
    };
    const param = createPluginParameter('NearEventSensorMZ');
    param.FlashColorArray = [param.FlashColor.Red, param.FlashColor.Green, param.FlashColor.Blue, param.FlashColor.Alpha];

    //=============================================================================
    // Sprite_Character
    // Add flash functionality to characters.
    //=============================================================================
    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.call(this);
        this.updateFlash();
    };

    Sprite_Character.prototype.updateFlash = function() {
        if (this._character.isFlash()) {
            this.setBlendColor(this._character._flashColor);
        }
    };

    const _Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon;
    Sprite_Character.prototype.updateBalloon = function() {
        if (this._character.isBalloonCancel()) {
            this.endBalloon();
        }
        _Sprite_Character_updateBalloon.apply(this, arguments);
    };

    //=============================================================================
    // Game_CharacterBase
    // Flash and balloon functionality added to character base class.
    //=============================================================================
    const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._balloonCancel = false;
    };

    Game_CharacterBase.prototype.startFlash = function(flashColor, duration) {
        this._flashColor = flashColor.clone();
        this._flashDuration = duration;
    };

    Game_CharacterBase.prototype.isFlash = function() {
        if (this._flashDuration > 0) {
            this._flashDuration--;
            if (this._flashDuration === 0) {
                this._flashColor = [0, 0, 0, 0];
            }
        }
        return this._flashColor[3] > 0;
    };

    Game_CharacterBase.prototype.setBalloonCancel = function(value) {
        this._balloonCancel = value;
    };

    Game_CharacterBase.prototype.isBalloonCancel = function() {
        return this._balloonCancel;
    };

    //=============================================================================
    // Game_Character
    // Enhanced event and character functionality.
    //=============================================================================
    Game_Character.prototype.isNearThePlayer = function() {
        const sx = Math.abs(this.deltaXFrom($gamePlayer.x));
        const sy = Math.abs(this.deltaYFrom($gamePlayer.y));
        const dist = Math.sqrt(sx * sx + sy * sy);
        return dist <= param.SensorDistance;
    };

    Game_Character.prototype.isTriggeredSensor = function() {
        if (!this.isNearThePlayer()) return false;
        if (param.DisableEmpty && !this.hasContents()) return false;
        if (param.ConsiderationDir && !$gamePlayer.isDirection(this.direction())) return false;
        return this.meetsSensorConditions();
    };

    Game_Character.prototype.hasContents = function() {
        return true;
    };

    Game_Character.prototype.meetsSensorConditions = function() {
        const selfSwitchKey = this.selfSwitchKey();
        const condition = this.meetsSwitchCondition(selfSwitchKey);
        return param.ConditionReverse ? !condition : condition;
    };

    Game_Character.prototype.selfSwitchKey = function() {
        const metaSwitch = getMetaValues(this.event(), ['Switch', 'SelfSwitch']);
        if (!metaSwitch) return null;
        if (metaSwitch.match(/^([A-D])$/i)) {
            return [$gameMap.mapId(), this.eventId(), metaSwitch.toUpperCase()];
        } else if (metaSwitch.match(/^\d+$/)) {
            return parseInt(metaSwitch, 10);
        }
        return null;
    };

    Game_Character.prototype.meetsSwitchCondition = function(selfSwitchKey) {
        if (selfSwitchKey) {
            if (Array.isArray(selfSwitchKey)) {
                return $gameSelfSwitches.value(selfSwitchKey);
            } else if (typeof selfSwitchKey === 'number') {
                return $gameSwitches.value(selfSwitchKey);
            }
        }
        return true;
    };

    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        this.updateNearEventSensor();
    };

    Game_Event.prototype.updateNearEventSensor = function() {
        if (this.isTriggeredSensor()) {
            this.startNearEventSensor();
        } else if (param.EraseWhenAway) {
            this.eraseNearEventSensor();
        }
    };

    Game_Event.prototype.startNearEventSensor = function() {
        if (param.DefaultFlash) {
            this.startFlash(param.FlashColorArray, param.FlashDuration);
        }
        if (param.DefaultBalloon > 0) {
            this.setBalloonCancel(false);
            if (this._balloonInterval > 0) {
                this._balloonInterval--;
            } else {
                this.requestBalloon(param.DefaultBalloon);
                this._balloonInterval = param.BalloonInterval;
            }
        }
    };

    Game_Event.prototype.eraseNearEventSensor = function() {
        this.startFlash([0, 0, 0, 0], 0);
        this.setBalloonCancel(true);
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        this.updateNearEventSensor();
    };

    Game_Player.prototype.updateNearEventSensor = function() {
        $gameMap.events().forEach(event => {
            if (event.isTriggeredSensor()) {
                if (param.ApplyPlayer) {
                    this.startNearEventSensor();
                } else {
                    event.startNearEventSensor();
                }
            } else if (param.EraseWhenAway) {
                if (param.ApplyPlayer) {
                    this.eraseNearEventSensor();
                } else {
                    event.eraseNearEventSensor();
                }
            }
        });
    };

    Game_Player.prototype.startNearEventSensor = function() {
        if (param.DefaultFlash) {
            this.startFlash(param.FlashColorArray, param.FlashDuration);
        }
        if (param.DefaultBalloon > 0) {
            this.setBalloonCancel(false);
            if (this._balloonInterval > 0) {
                this._balloonInterval--;
            } else {
                this.requestBalloon(param.DefaultBalloon);
                this._balloonInterval = param.BalloonInterval;
            }
        }
    };

    Game_Player.prototype.eraseNearEventSensor = function() {
        this.startFlash([0, 0, 0, 0], 0);
        this.setBalloonCancel(true);
    };
})();
