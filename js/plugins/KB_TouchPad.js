//=============================================================================
// KB_TouchPad.js
// ----------------------------------------------------------------------------
// (C)2023 KB
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.0.0 2023/12/04 Updated for RPG Maker MZ, localized to English, and changed authorship.
// 1.1.3 2018/08/14 Renamed and republished due to circumstances.
// 1.1.2 2017/05/27 Refactored potentially conflicting code (adding properties to Object class).
// 1.1.1 2017/05/10 Fixed an issue where dashing was enabled while in a vehicle.
// 1.1.0 2017/03/01 Changed to always display buttons in the number input window.
//                  Disabled dashing when dashing is prohibited.
// 1.0.3 2016/04/29 Conflict resolution using createUpperLayer.
// 1.0.2 2016/03/04 Compatible with the core version 1.1.0's feature to remove unused resources.
// 1.0.1 2016/02/21 Added settings for public release.
// 1.0.0 2016/02/19 First edition.
// ----------------------------------------------------------------------------
// [Original Author: Triacontane]
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Relative Touch Pad
 * @author KB
 * @url https://github.com/triacontane/
 *
 * @param TouchableRect
 * @text Touch Enabled Area
 * @desc Specifies the touch-enabled area for movement in pixels (X, Y, Width, Height). Default is 0,0,816,624 (screen size).
 * @default 0,0,816,624
 *
 * @param ImageNamePad
 * @text Pad Image File
 * @desc The file name of the pad image (extension unnecessary). Save the image in "img/pictures/".
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ImageNameArrow
 * @text Arrow Image File
 * @desc The file name of the arrow image (extension unnecessary). Save the image in "img/pictures/".
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param PadOpacity
 * @text Pad Image Opacity
 * @desc The opacity of the pad image (0...255).
 * @default 255
 * @type number
 * @min 0
 * @max 255
 *
 * @help Instead of map touch movement, this plugin moves the player based on
 * the relative coordinates from the position where the touch started.
 *
 * Depending on the magnitude of the slope (distance from the center),
 * the movement changes to "Turn in place," "Walking," or "Dashing."
 * If the "Always Dash" option is enabled, "Walking" will not occur.
 *
 * You can specify any pictures for the Pad Image File and Arrow Image File.
 * If not specified, dynamically created images will be used.
 *
 * Image specifications are as follows:
 * - Pad: Any size square image (circular is recommended)
 * - Arrow: An image of the same size as the pad, which clearly points upwards.
 *
 * This plugin does not have any plugin commands.
 *
 * Terms of Use:
 * Modification and redistribution are possible without permission from the author,
 * and there are no restrictions on usage (commercial, 18+ content, etc.).
 * This plugin is now yours.
 */

// Global definition of the class (for save data compatibility)
function Game_Relative_Pad() {
    this.initialize.apply(this, arguments);
}

/* Configuration Settings */
/* Prohibits relative touch movement. */
Game_Relative_Pad.disable              = false;
/* Prohibits normal map touch movement. */
Game_Relative_Pad.mapTouchDisable      = true;
/* Radius for turning in place without walking. */
Game_Relative_Pad.distanceNear         = 24;
/* Radius for walking without dashing. */
Game_Relative_Pad.distanceFar          = 144;

(function () {
    'use strict';
    const pluginName = 'KB_TouchPad';

    // Helper functions for parameter retrieval (copied from original author's style)
    const getParamString = function(paramNames) {
        const parameters = PluginManager.parameters(pluginName);
        for (const name of paramNames) {
            const value = parameters[name];
            if (value) return String(value);
        }
        return '';
    };

    const getParamNumber = function(paramNames, min = -Infinity, max = Infinity) {
        const parameters = PluginManager.parameters(pluginName);
        for (const name of paramNames) {
            const value = parameters[name];
            if (value) return (parseInt(value, 10) || 0).clamp(min, max);
        }
        return 0;
    };

    const getParamArrayString = function (paramNames) {
        const value = getParamString(paramNames);
        return value ? value.split(',').map(s => s.trim()) : [];
    };

    const getParamArrayNumber = function (paramNames, min = -Infinity, max = Infinity) {
        const values = getParamArrayString(paramNames);
        return values.map(v => (parseInt(v, 10) || 0).clamp(min, max));
    };

    const getDiagonalInt = function(x, y) {
        return Math.floor(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    };

    const iterate = function(that, handler) {
        Object.keys(that).forEach(function(key, index) {
            handler.call(that, key, that[key], index);
        });
    };

    //=============================================================================
    // Input
    //  Defines processing to submit key input information.
    //=============================================================================
    Input.submitKey = function(keyName) {
        this._currentState[keyName] = true;
        this._submitState[keyName] = Graphics.frameCount;
    };

    const _Input_clear = Input.clear;
    Input.clear = function() {
        _Input_clear.apply(this, arguments);
        this._submitState = {};
    };

    const _Input_update = Input.update;
    Input.update = function() {
        this._suppressSubmit();
        _Input_update.apply(this, arguments);
        this._date = 0; // The original used this for a key suppression date, but it seems unused in the original code's logic flow.
    };

    Input._suppressSubmit = function() {
        iterate(this._submitState, function (keyName, frameCount) {
            if (frameCount + 1 < Graphics.frameCount) {
                this._currentState[keyName] = false;
                delete this._submitState[keyName];
            }
        }.bind(this));
    };

    //=============================================================================
    // Game_Temp
    //  Creates an instance of Game_Relative_Pad.
    //=============================================================================
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._relativeTouchPad = new Game_Relative_Pad();
    };

    Game_Temp.prototype.getRelativeTouchPad = function() {
        return this._relativeTouchPad;
    };

    //=============================================================================
    // Game_Player
    //  Defines movement based on Game_Relative_Pad.
    //=============================================================================
    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        this.getMovePad().update();
        _Game_Player_update.apply(this, arguments);
    };

    const _Game_Player_getInputDirection = Game_Player.prototype.getInputDirection;
    Game_Player.prototype.getInputDirection = function() {
        // Returns the move pad direction if input direction is 0, allowing touch pad to override manual input.
        // It should be `|| this.getMovePad().getDir();` as in the original code, but note that this prioritizes
        // standard input over the pad if both are active.
        return _Game_Player_getInputDirection.apply(this, arguments) || this.getMovePad().getDir();
    };

    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        const movePad = this.getMovePad();
        if (movePad.isActive() && movePad.isDistanceNear()) {
            const turnDir = movePad.getDir4();
            if (turnDir !== 0) this.setDirection(turnDir);
        } else {
            // Original code has complex diagonal movement logic for touch pad input (directions 1, 3, 7, 9).
            // This logic is preserved for the touch pad input.
            if (direction % 2 === 0) {
                _Game_Player_executeMove.apply(this, arguments);
            } else if (direction !== 5) {
                this.executeDiagonalMove(direction);
            }
        }
    };

    Game_Player.prototype.executeDiagonalMove = function(d) {
        // Maps 7, 9, 1, 3 (diagonal directions) to horizontal and vertical components.
        const horizon  = (d / 3 <= 1) ? d + 3 : d - 3;
        const vertical = (d % 3 === 0) ? d - 1 : d + 1;

        const x2 = $gameMap.roundXWithDirection(this.x, horizon);
        const y2 = $gameMap.roundYWithDirection(this.y, vertical);

        // Collision check: if the character is blocked by a character in either the horizontal or vertical direction, movement is prevented.
        if (this.isCollidedWithCharacters(x2, this.y) || this.isCollidedWithCharacters(this.x, y2)) {
            return;
        }

        // Attempt diagonal move first
        this.moveDiagonally(horizon, vertical);

        // If diagonal movement fails (e.g., due to terrain collision or events), try moving straight horizontally, then vertically.
        if (!this.isMovementSucceeded()) {
            this.moveStraight(horizon);
        }
        if (!this.isMovementSucceeded()) {
            this.moveStraight(vertical);
        }
    };

    const _Game_Player_updateDashing = Game_Player.prototype.updateDashing;
    Game_Player.prototype.updateDashing = function() {
        _Game_Player_updateDashing.apply(this, arguments);
        // Only modify dashing state if the touch pad is active and dashing is not disabled
        if (this.getMovePad().isActive() && !$gameMap.isDashDisabled() && !this.isInVehicle()) {
            // Dash if distance is 'far' (Game_Relative_Pad.distanceFar) or if 'Always Dash' is on.
            this._dashing = this.getMovePad().isDistanceFar() || ConfigManager.alwaysDash;
        }
    };

    Game_Player.prototype.getMovePad = function() {
        return $gameTemp.getRelativeTouchPad();
    };

    //=============================================================================
    // Scene_Map
    //  Prohibits map touch movement if mapTouchDisable is true.
    //=============================================================================
    const _Scene_Map_isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
    Scene_Map.prototype.isMapTouchOk = function() {
        return _Scene_Map_isMapTouchOk.apply(this, arguments) && !Game_Relative_Pad.mapTouchDisable;
    };

    const paramTouchableRect = getParamArrayNumber(['TouchableRect', 'タッチ有効領域'], 0);

    //=============================================================================
    // Game_Relative_Pad
    //  Defines the relative touch pad logic.
    //  Created in $gameTemp, not saved in save data.
    //=============================================================================
    // Game_Relative_Pad already defined globally above.

    Game_Relative_Pad.prototype.initialize = function() {
        this.initMember();
    };

    Game_Relative_Pad.prototype.initMember = function() {
        this._x            = 0;
        this._y            = 0;
        this._radian       = 0;
        this._dir4         = 0;
        this._dir8         = 0;
        this._diagonalMove = true;
        this.resetNeutral();
    };

    Game_Relative_Pad.prototype.update = function() {
        this._x = TouchInput.x;
        this._y = TouchInput.y;
        if(!this.isActive()) this.updateNonActive();
        if(this.isActive()) this.updateActive();
    };

    Game_Relative_Pad.prototype.updateNonActive = function() {
        // Activates the pad if movement is allowed, the touch is triggered (initial press),
        // and the touch is within the enabled rectangle.
        if (!Game_Relative_Pad.disable && $gamePlayer.canMove() &&
            TouchInput.isTriggered() && this._inTouchableRect()) {
            this.setNeutral();
        }
    };

    Game_Relative_Pad.prototype.updateActive = function() {
        // Deactivates the pad if player cannot move, touch is released, or touch moves out of rect.
        if (!$gamePlayer.canMove() || !TouchInput.isPressed() || !this._inTouchableRect()) {
            this.initMember();
            if ($gamePlayer.canMove()) this.submitOk();
        } else {
            // Calculate angle (radian) and 4-way/8-way directions.
            // Math.atan2(deltaY, deltaX) * -1 + Math.PI transforms the coordinate system
            // to match RPG Maker's direction system (6=Right, 8=Up, 4=Left, 2=Down).
            // It calculates angle counter-clockwise from the negative X-axis (left) and then shifts it.
            this._radian = Math.atan2(this.getDeltaY(), this.getDeltaX()) * -1 + Math.PI;
            this._dir4   = this._calculateDir4();
            this._dir8   = this._calculateDir8();
        }
    };

    Game_Relative_Pad.prototype.submitOk = function() {
        Input.submitKey('ok');
    };

    Game_Relative_Pad.prototype.setNeutral = function() {
        this._neutralX = this._x;
        this._neutralY = this._y;
    };

    Game_Relative_Pad.prototype.resetNeutral = function() {
        this._neutralX = null;
        this._neutralY = null;
    };

    Game_Relative_Pad.prototype.isActive = function() {
        return this._neutralX !== null && this._neutralY !== null;
    };

    Game_Relative_Pad.prototype.getRotation = function() {
        // Rotation for the sprite. Converts the movement radian to sprite rotation.
        return -this._radian + Math.PI / 2;
    };

    Game_Relative_Pad.prototype.getDir = function() {
        return this._diagonalMove ? this._dir8 : this._dir4;
    };

    Game_Relative_Pad.prototype.getDir4 = function() {
        return this._dir4;
    };

    /** @private */
    Game_Relative_Pad.prototype._calculateDir4 = function() {
        const pi4d = Math.PI / 4;
        if (this.isDistanceZero())                                  return 0;
        // 6 (Right)
        if (this._radian <   pi4d     || this._radian >=  pi4d * 7) return 6;
        // 8 (Up)
        if (this._radian >=  pi4d     && this._radian <   pi4d * 3) return 8;
        // 4 (Left)
        if (this._radian >=  pi4d * 3 && this._radian <   pi4d * 5) return 4;
        // 2 (Down)
        if (this._radian >=  pi4d * 5 && this._radian <   pi4d * 7) return 2;
        return 0;
    };

    /** @private */
    Game_Relative_Pad.prototype._calculateDir8 = function() {
        const pi8d = Math.PI / 8;
        if (this.isDistanceZero())                                    return 0;
        // 6 (Right)
        if (this._radian <   pi8d      || this._radian >=  pi8d * 15) return 6;
        // 9 (Up-Right)
        if (this._radian >=  pi8d      && this._radian <   pi8d * 3)  return 9;
        // 8 (Up)
        if (this._radian >=  pi8d * 3  && this._radian <   pi8d * 5)  return 8;
        // 7 (Up-Left)
        if (this._radian >=  pi8d * 5  && this._radian <   pi8d * 7)  return 7;
        // 4 (Left)
        if (this._radian >=  pi8d * 7  && this._radian <   pi8d * 9)  return 4;
        // 1 (Down-Left)
        if (this._radian >=  pi8d * 9  && this._radian <   pi8d * 11) return 1;
        // 2 (Down)
        if (this._radian >=  pi8d * 11 && this._radian <   pi8d * 13) return 2;
        // 3 (Down-Right)
        if (this._radian >=  pi8d * 13 && this._radian <   pi8d * 15) return 3;
        return 0;
    };

    Game_Relative_Pad.prototype.getDeltaX = function() {
        return this._neutralX - this._x;
    };

    Game_Relative_Pad.prototype.getDeltaY = function() {
        return this._neutralY - this._y;
    };

    Game_Relative_Pad.prototype.getDistanceX = function() {
        return Math.abs(this.getDeltaX());
    };

    Game_Relative_Pad.prototype.getDistanceY = function() {
        return Math.abs(this.getDeltaY());
    };

    Game_Relative_Pad.prototype.getNeutralX = function() {
        return this._neutralX;
    };

    Game_Relative_Pad.prototype.getNeutralY = function() {
        return this._neutralY;
    };

    Game_Relative_Pad.prototype.getDistance = function() {
        return getDiagonalInt(this.getDistanceX(), this.getDistanceY());
    };

    Game_Relative_Pad.prototype.isDistanceZero = function() {
        return this.getDistance() === 0;
    };

    Game_Relative_Pad.prototype.isDistanceNear = function() {
        return this.getDistance() < Game_Relative_Pad.distanceNear;
    };

    Game_Relative_Pad.prototype.isDistanceFar = function() {
        return this.getDistance() > Game_Relative_Pad.distanceFar;
    };

    /** @private */
    Game_Relative_Pad.prototype._inTouchableRect = function() {
        return this._x >= paramTouchableRect[0] && this._x <= paramTouchableRect[2] &&
            this._y >= paramTouchableRect[1] && this._y <= paramTouchableRect[3];
    };

    //=============================================================================
    // Spriteset_Map
    //  Defines the relative touch pad sprite.
    //=============================================================================
    // In MZ, Spriteset_Map inherits from Spriteset_Base, but the createUpperLayer method
    // is often overridden or modified. We check for Spriteset_Map explicitly.
    const _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function() {
        _Spriteset_Base_createUpperLayer.apply(this, arguments);
        if (this instanceof Spriteset_Map) this.createRelativePad();
    };

    Spriteset_Map.prototype.createRelativePad = function() {
        this._relativePadSprite = new Sprite_Relative_Pad();
        this.addChild(this._relativePadSprite);
    };

    //=============================================================================
    // Sprite_Relative_Pad
    //  The relative touch pad sprite.
    //  Updated to use ES6 Class syntax for MZ compatibility.
    //=============================================================================
    class Sprite_Relative_Pad extends Sprite {
        constructor() {
            super();
            this.anchor.x   = 0.5;
            this.anchor.y   = 0.5;
            this.opacity    = 0;
            const fileName    = getParamString(['ImageNamePad', 'パッド画像ファイル']);
            this.bitmap     = this.loadPictureOrEmpty(fileName, this.makeImagePad.bind(this));
            this._padActive = false;
            this._arrowDiagonal = 0;
            this.createTouchArrowSprite();
            this.update();
        }

        static get padImage() {
            if (!this._padImage) {
                const bitmap = new Bitmap(96, 96);
                const size = bitmap.width / 2;
                bitmap.drawCircle(size, size, size, 'rgba(255,255,255,0.5)');
                this._padImage = bitmap;
            }
            return this._padImage;
        }

        static get arrorImage() {
            if (!this._arrorImage) {
                const bitmap = new Bitmap(96, 96);
                const width = 24;
                const size = bitmap.width / 2;
                bitmap.drawCircle(size, width / 2, width / 2, 'rgba(128,128,128,1.0)');
                this._arrorImage = bitmap;
            }
            return this._arrorImage;
        }

        createTouchArrowSprite() {
            const fileName      = getParamString(['ImageNameArrow', 'アロー画像ファイル']);
            const sprite = new Sprite();
            sprite.anchor.x   = 0.5;
            sprite.anchor.y   = 0.5;
            sprite.bitmap     = this.loadPictureOrEmpty(fileName, this.makeArrowPad.bind(this));
            this._arrowSprite = sprite;
            this.addChild(this._arrowSprite);
        }

        loadPictureOrEmpty(fileName, makeImageHandler) {
            return fileName ? ImageManager.loadPicture(fileName) : makeImageHandler();
        }

        makeImagePad() {
            return Sprite_Relative_Pad.padImage;
        }

        makeArrowPad() {
            return Sprite_Relative_Pad.arrorImage;
        }

        refresh() {
            // Recalculates diagonal length of arrow sprite for scaling
            this._arrowDiagonal = getDiagonalInt(this._arrowSprite.width / 4, this._arrowSprite.height / 4);
            this.opacity = getParamNumber(['PadOpacity', 'パッド画像不透明度'], 0, 255);
            this.scale.x = 1.0;
            this.scale.y = 1.0;
            this.visible = true;
            this._padActive = true;
        }

        update() {
            super.update();
            if (!this.getMovePad().isActive()) {
                if (this.opacity > 0) {
                    this.updateFadeout();
                    this._padActive = false;
                } else {
                    this.visible = false;
                }
            } else {
                if (!this._padActive) this.refresh();
                this.updatePlacement();
                this.updateArrowSprite();
            }
        }

        updatePlacement() {
            this.x = this.getMovePad().getNeutralX();
            this.y = this.getMovePad().getNeutralY();
        }

        updateArrowSprite() {
            if (this.getMovePad().isDistanceZero()) {
                this._arrowSprite.visible  = false;
            } else {
                this._arrowSprite.visible  = true;
                this._arrowSprite.rotation = this.getMovePad().getRotation();
                // Scale the arrow based on the distance from the neutral point.
                const scale = this.getMovePad().getDistance() / this._arrowDiagonal;
                this._arrowSprite.scale.x = scale;
                this._arrowSprite.scale.y = scale;
                // Fade opacity out as the scale increases, making it slightly transparent when dragged far.
                this._arrowSprite.opacity = Math.min(255, 255 / (scale / 1.5));
            }
        }

        updateFadeout() {
            this.opacity -= 36;
            this.scale.x += 0.02;
            this.scale.y += 0.02;
        }

        getMovePad() {
            return $gameTemp.getRelativeTouchPad();
        }
    }
    // Static properties need to be defined outside the class in this style or using static fields (not supported in all target environments).
    // Using static getters above is a cleaner approach.
    // Clear the original static properties for clean MZ class usage:
    Sprite_Relative_Pad._padImage = null;
    Sprite_Relative_Pad._arrorImage = null;


    // Backwards compatibility for the original initialization if needed, but not strictly required with modern class syntax.
    // However, the original code overwrote the prototype directly, so we need to ensure the class definition works.
    // Removing the redundant prototype assignment.
    // Sprite_Relative_Pad.prototype = Object.create(Sprite.prototype);
    // Sprite_Relative_Pad.prototype.constructor = Sprite_Relative_Pad;

})();