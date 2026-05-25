//=============================================================================
// KB_TouchPad_InteractIcon.js
// ----------------------------------------------------------------------------
// (C)2023 KB
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.4.0 2025/12/04 Feature Update: Displays the interaction icon directly over
//                  the head of the interactable event (Dynamic Positioning).
// 2.3.3 2025/12/04 Final Fix Attempt: Fixed Sprite_Base ReferenceError with Prototype inheritance.
// ... (omitted previous versions)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Relative Touch Pad and Contextual Interaction Icon (Dynamic Position)
 * @author KB
 * @url https://github.com/triacontane/
 *
 * @param ---Touch Pad---
 * @default
 *
 * @param TouchableRect
 * @parent ---Touch Pad---
 * @text Touch Enabled Area
 * @desc Specifies the touch-enabled area for movement in pixels (X, Y, Width, Height). Default is 0,0,816,624 (screen size).
 * @default 0,0,816,624
 *
 * @param ImageNamePad
 * @parent ---Touch Pad---
 * @text Pad Image File
 * @desc The file name of the pad image (extension unnecessary). Save the image in "img/pictures/".
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ImageNameArrow
 * @parent ---Touch Pad---
 * @text Arrow Image File
 * @desc The file name of the arrow image (extension unnecessary). Save the image in "img/pictures/".
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param PadOpacity
 * @parent ---Touch Pad---
 * @text Pad Image Opacity
 * @desc The opacity of the pad image (0...255).
 * @default 255
 * @type number
 * @min 0
 * @max 255
 *
 * @param ---Interaction Icon---
 * @default
 *
 * @param DefaultIconIndex
 * @parent ---Interaction Icon---
 * @text Default Icon Index
 * @desc The default index in the IconSet (img/system/IconSet.png) to display if the Note Tag doesn't specify one.
 * @default 160 // Index for an Exclamation mark in the default IconSet
 * @type number
 * @min 0
 *
 * @param IconTouchRange
 * @parent ---Interaction Icon---
 * @text Icon Touch Range (Tiles)
 * @desc Max tile distance for events to be triggered by tapping the icon. Set to 1 (adjacent) for standard action.
 * @default 1
 * @type number
 * @min 0
 *
 * @param IconYOffset
 * @parent ---Interaction Icon---
 * @text Icon Vertical Offset (Pixels)
 * @desc Extra vertical offset (pixels) to lift the icon further above the event's head (e.g., 8 or 16).
 * @default 8
 * @type number
 *
 * @help This plugin provides two main features optimized for mobile:
 *
 * 1. Relative Touch Pad: Allows directional player movement using a touch drag area.
 * 2. Contextual Interaction Icon: Displays an icon when an event can be activated.
 *
 * **Dynamic Icon Positioning:**
 * The interaction icon is now displayed **directly above the head of the interactable event**,
 * making it clear which object the player is about to interact with.
 * Tapping the icon still triggers the event.
 *
 * **Contextual Interaction Icon Feature:**
 * This feature displays an icon (from your IconSet.png) when the player is capable
 * of triggering an Event using the **Action Button** (Trigger 0).
 *
 * **Note Tag Usage:**
 * To make an Event display the icon, use the following Note Tag in the
 * **Note** section of the Event page:
 *
 * `<InteractIcon:X>`
 *
 * Replace **X** with the desired index number from your IconSet.
 * If the index is omitted (e.g., `<InteractIcon>`), the **Default Icon Index**
 * parameter will be used.
 *
 * Example (using icon index 162 for a speech bubble):
 * `<InteractIcon:162>`
 *
 * Terms of Use:
 * Modification and redistribution are possible without permission from the author,
 * and there are no restrictions on usage (commercial, 18+ content, etc.).
 * This plugin is now yours.
 */

function Game_Relative_Pad() {
    this.initialize.apply(this, arguments);
}

/* Configuration Settings (Touch Pad) */
Game_Relative_Pad.disable              = false;
Game_Relative_Pad.mapTouchDisable      = true;
Game_Relative_Pad.distanceNear         = 24;
Game_Relative_Pad.distanceFar          = 144;

(function () {
    'use strict';
    const pluginName = 'KB_TouchPad_InteractIcon';

    // --- Helper Functions (Omitted for brevity) ---
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

    // --- Plugin Parameters ---
    const paramTouchableRect = getParamArrayNumber(['TouchableRect'], 0);
    const paramDefaultIconIndex = getParamNumber(['DefaultIconIndex'], 0);
    const paramIconTouchRange = getParamNumber(['IconTouchRange'], 1);
    const paramIconYOffset = getParamNumber(['IconYOffset'], 8); // NEW: Vertical Offset

    //=============================================================================
    // Game_Player (Interaction Icon Logic)
    //=============================================================================

    // Store the last found event for processing touch input via the icon
    Game_Player.prototype._lastInteractEventInfo = null;


    Game_Player.prototype.getInteractEventInfo = function() {
        if ($gameMap.isEventRunning() || this.isMoving()) {
            this._lastInteractEventInfo = null;
            return null;
        }

        const events = $gameMap.events();
        const x = this.x;
        const y = this.y;
        const d = this.direction();
        const x2 = $gameMap.xWithDirection(x, d);
        const y2 = $gameMap.yWithDirection(y, d);
        let nearestEventInfo = null;
        let minDistance = Infinity;

        for (const event of events) {
            if (!event || !event.page()) {
                continue;
            }

            const note = event.event().note;
            const trigger = event.page().trigger;
            const match = note.match(/<InteractIcon:(\d+)>/i);
            const hasTag = note.includes('<InteractIcon');
            let iconIndex = null;

            if (match) {
                iconIndex = parseInt(match[1]);
            } else if (hasTag) {
                iconIndex = paramDefaultIconIndex;
            }

            if (iconIndex === null) {
                continue;
            }
            
            const dx = Math.abs($gameMap.deltaX(event.x, this.x));
            const dy = Math.abs($gameMap.deltaY(event.y, this.y));
            const distance = dx + dy;

            let isInteractable = false;

            if (trigger === 0) {
                if (event.x === x && event.y === y) {
                    isInteractable = true;
                } else if (event.x === x2 && event.y === y2) {
                    isInteractable = true;
                }
            } else if ((trigger === 1 || trigger === 2) && distance <= paramIconTouchRange) { 
                isInteractable = true;
            }

            if (isInteractable && distance < minDistance) {
                minDistance = distance;
                nearestEventInfo = {
                    index: iconIndex,
                    event: event
                };
            }
        }
        this._lastInteractEventInfo = nearestEventInfo;
        return nearestEventInfo;
    };

    //=============================================================================
    // Sprite Definitions (Using Prototype Inheritance for safety)
    //=============================================================================

    // --- Sprite_InteractIcon ---
    function Sprite_InteractIcon() {
        this.initialize.apply(this, arguments);
    }
    
    // Kế thừa từ Sprite_Base
    if (typeof Sprite_Base !== 'undefined') {
        Sprite_InteractIcon.prototype = Object.create(Sprite_Base.prototype);
        Sprite_InteractIcon.prototype.constructor = Sprite_InteractIcon;
    } else {
        Sprite_InteractIcon.prototype = Object.create(Sprite.prototype);
        Sprite_InteractIcon.prototype.constructor = Sprite_InteractIcon;
    }
    

    Sprite_InteractIcon.prototype.initialize = function() {
        const superConstructor = (typeof Sprite_Base !== 'undefined') ? Sprite_Base : Sprite;
        superConstructor.prototype.initialize.call(this);

        this.anchor.x = 0.5;
        this.anchor.y = 1.0;
        this.opacity = 0;
        this.iconIndex = -1;
        this.updatePosition();
        this.z = 9;
        this.hitArea = new Rectangle(0, 0, 48, 48);
        this._targetEvent = null; // Store the target event for dynamic position
    };

    Sprite_InteractIcon.prototype.updatePosition = function() {
        if (!this._targetEvent) {
            // If no target, move it off-screen
            this.x = -100;
            this.y = -100;
            return;
        }

        const event = this._targetEvent;
        // Calculate the icon position above the event
        const tileWidth = $gameMap.tileWidth();
        
        // screenX/Y returns the center of the event's tile
        this.x = event.screenX();
        // screenY returns the bottom of the event's tile, so subtract
        // tileHeight (to get to the top of the event) and the offset.
        this.y = event.screenY() - $gameMap.tileHeight() - paramIconYOffset;
    };

    Sprite_InteractIcon.prototype.update = function() {
        const superPrototype = (typeof Sprite_Base !== 'undefined') ? Sprite_Base.prototype : Sprite.prototype;
        superPrototype.update.call(this);

        const eventInfo = $gamePlayer.getInteractEventInfo();
        this._targetEvent = eventInfo ? eventInfo.event : null; // Update target event
        this.updatePosition(); // Update position based on the target

        this.processTouch();
        this.updateIcon(eventInfo); // Pass eventInfo to updateIcon
        this.updateVisibility();
        this.updateAnimation();
    };

    Sprite_InteractIcon.prototype.processTouch = function() {
        if (this.opacity < 255 || !$gamePlayer.canMove() || !this._targetEvent) {
            return;
        }

        if (TouchInput.isTriggered() && this.isTouched()) {
            const event = this._targetEvent;
            $gamePlayer.startMapEvent(event.x, event.y, [event.id]);
            TouchInput.clear();
        }
    };

    Sprite_InteractIcon.prototype.isTouched = function() {
        const x = this.x + this.hitArea.x - this.hitArea.width * this.anchor.x;
        const y = this.y + this.hitArea.y - this.hitArea.height * this.anchor.y;
        const width = this.hitArea.width;
        const height = this.hitArea.height;
        return TouchInput.x >= x && TouchInput.x < x + width &&
               TouchInput.y >= y && TouchInput.y < y + height;
    };

    Sprite_InteractIcon.prototype.updateIcon = function(eventInfo) {
        const newIndex = eventInfo ? eventInfo.index : null;

        if (newIndex !== this.iconIndex) {
            this.iconIndex = newIndex;
            this.refreshBitmap();
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            // HitArea for touching the dynamically positioned icon
            this.hitArea.x = -pw / 2;
            this.hitArea.y = -ph;
            this.hitArea.width = pw;
            this.hitArea.height = ph;
        }
    };

    Sprite_InteractIcon.prototype.refreshBitmap = function() {
        if (this.iconIndex !== null && this.iconIndex >= 0) {
            this.bitmap = ImageManager.loadSystem('IconSet');
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (this.iconIndex % 16) * pw;
            const sy = Math.floor(this.iconIndex / 16) * ph;

            const iconBitmap = new Bitmap(pw, ph);
            iconBitmap.blt(this.bitmap, sx, sy, pw, ph, 0, 0, pw, ph);
            this.bitmap = iconBitmap;

        } else {
            this.bitmap = new Bitmap(1, 1);
        }
    };
    
    Sprite_InteractIcon.prototype.updateVisibility = function() {
        // Icon is visible only if there is a target event
        const targetOpacity = (this._targetEvent && this.iconIndex !== null && this.iconIndex >= 0) ? 255 : 0;
        if (this.opacity < targetOpacity) {
            this.opacity = Math.min(this.opacity + 32, targetOpacity);
        } else if (this.opacity > targetOpacity) {
            this.opacity = Math.max(this.opacity - 32, targetOpacity);
        }
    };

    Sprite_InteractIcon.prototype.updateAnimation = function() {
        if (this.opacity > 0) {
            // Simple sine wave bobbing animation, relative to its calculated position (this.y)
            const sineWave = Math.sin(Graphics.frameCount * 0.08);
            this.y += sineWave * 2; // Subtle vertical movement
        } 
        // Note: updatePosition() will correct Y every frame, so we adjust Y *after* calculation.
    };
    
    // --- Sprite_Relative_Pad ---
    // (Definition remains the same as 2.3.3)
    function Sprite_Relative_Pad() {
        this.initialize.apply(this, arguments);
    }
    
    Sprite_Relative_Pad.prototype = Object.create(Sprite.prototype);
    Sprite_Relative_Pad.prototype.constructor = Sprite_Relative_Pad;
    
    Sprite_Relative_Pad.padImage   = null;
    Sprite_Relative_Pad.arrorImage = null;

    Sprite_Relative_Pad.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.anchor.x   = 0.5;
        this.anchor.y   = 0.5;
        this.opacity    = 0;
        const fileName    = getParamString(['ImageNamePad', 'パッド画像ファイル']);
        this.bitmap     = this.loadPictureOrEmpty(fileName, this.makeImagePad.bind(this));
        this._padActive = false;
        this._arrowDiagonal = 0;
        this.createTouchArrowSprite();
        this.update();
    };

    // ... (rest of Sprite_Relative_Pad methods omitted for brevity)

    Sprite_Relative_Pad.prototype.createTouchArrowSprite = function() {
        const fileName      = getParamString(['ImageNameArrow', 'アロー画像ファイル']);
        const sprite = new Sprite();
        sprite.anchor.x   = 0.5;
        sprite.anchor.y   = 0.5;
        sprite.bitmap     = this.loadPictureOrEmpty(fileName, this.makeArrowPad.bind(this));
        this._arrowSprite = sprite;
        this.addChild(this._arrowSprite);
    };

    Sprite_Relative_Pad.prototype.loadPictureOrEmpty = function(fileName, makeImageHandler) {
        return fileName ? ImageManager.loadPicture(fileName) : makeImageHandler();
    };

    Sprite_Relative_Pad.prototype.makeImagePad = function() {
        if (!Sprite_Relative_Pad.padImage) {
            const bitmap = new Bitmap(96, 96);
            const size = bitmap.width / 2;
            bitmap.drawCircle(size, size, size, 'rgba(255,255,255,0.5)');
            Sprite_Relative_Pad.padImage = bitmap;
        }
        return Sprite_Relative_Pad.padImage;
    };

    Sprite_Relative_Pad.prototype.makeArrowPad = function() {
        if (!Sprite_Relative_Pad.arrorImage) {
            const bitmap = new Bitmap(96, 96);
            const width = 24;
            const size = bitmap.width / 2;
            bitmap.drawCircle(size, width / 2, width / 2, 'rgba(128,128,128,1.0)');
            Sprite_Relative_Pad.arrorImage = bitmap;
        }
        return Sprite_Relative_Pad.arrorImage;
    };

    Sprite_Relative_Pad.prototype.refresh = function() {
        this._arrowDiagonal = getDiagonalInt(this._arrowSprite.width / 4, this._arrowSprite.height / 4);
        const paramOpacity = getParamNumber(['PadOpacity', 'パッド画像不透明度'], 0, 255);
        this.opacity = paramOpacity;
        this.scale.x = 1.0;
        this.scale.y = 1.0;
        this.visible = true;
        this._padActive = true;
    };

    Sprite_Relative_Pad.prototype.update = function() {
        Sprite.prototype.update.call(this);
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
    };

    Sprite_Relative_Pad.prototype.updatePlacement = function() {
        this.x = this.getMovePad().getNeutralX();
        this.y = this.getMovePad().getNeutralY();
    };

    Sprite_Relative_Pad.prototype.updateArrowSprite = function() {
        if (this.getMovePad().isDistanceZero()) {
            this._arrowSprite.visible  = false;
        } else {
            this._arrowSprite.visible  = true;
            this._arrowSprite.rotation = this.getMovePad().getRotation();
            const scale = this.getMovePad().getDistance() / this._arrowDiagonal;
            this._arrowSprite.scale.x = scale;
            this._arrowSprite.scale.y = scale;
            this._arrowSprite.opacity = Math.min(255, 255 / (scale / 1.5));
        }
    };

    Sprite_Relative_Pad.prototype.updateFadeout = function() {
        this.opacity -= 36;
        this.scale.x += 0.02;
        this.scale.y += 0.02;
    };

    Sprite_Relative_Pad.prototype.getMovePad = function() {
        return $gameTemp.getRelativeTouchPad();
    };

    // [The rest of the logic (Game_Relative_Pad, Game_Player, Input Overrides, etc.)]
    // ... (All other methods from 2.3.3 are included here)
    
    // [Touch Pad Logic - Input]
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
        this._date = 0;
    };

    Input._suppressSubmit = function() {
        iterate(this._submitState, function (keyName, frameCount) {
            if (frameCount + 1 < Graphics.frameCount) {
                this._currentState[keyName] = false;
                delete this._submitState[keyName];
            }
        }.bind(this));
    };

    // [Touch Pad Logic - Game_Temp & Game_Player Overrides]
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._relativeTouchPad = new Game_Relative_Pad();
    };

    Game_Temp.prototype.getRelativeTouchPad = function() {
        return this._relativeTouchPad;
    };

    Game_Relative_Pad.prototype.initialize = function() {
        this.initMember();
    };
    Game_Relative_Pad.prototype.initMember = function() {
        this._x            = 0; this._y            = 0; this._radian       = 0;
        this._dir4         = 0; this._dir8         = 0; this._diagonalMove = true;
        this.resetNeutral();
    };
    Game_Relative_Pad.prototype.update = function() {
        this._x = TouchInput.x; this._y = TouchInput.y;
        if(!this.isActive()) this.updateNonActive();
        if(this.isActive()) this.updateActive();
    };
    Game_Relative_Pad.prototype.updateNonActive = function() {
        if (!Game_Relative_Pad.disable && $gamePlayer.canMove() &&
            TouchInput.isTriggered() && this._inTouchableRect()) {
            this.setNeutral();
        }
    };
    Game_Relative_Pad.prototype.updateActive = function() {
        if (!$gamePlayer.canMove() || !TouchInput.isPressed() || !this._inTouchableRect()) {
            this.initMember();
            if ($gamePlayer.canMove()) this.submitOk();
        } else {
            this._radian = Math.atan2(this.getDeltaY(), this.getDeltaX()) * -1 + Math.PI;
            this._dir4   = this._calculateDir4();
            this._dir8   = this._calculateDir8();
        }
    };
    Game_Relative_Pad.prototype.submitOk = function() {
        Input.submitKey('ok');
    };
    Game_Relative_Pad.prototype.setNeutral = function() {
        this._neutralX = this._x; this._neutralY = this._y;
    };
    Game_Relative_Pad.prototype.resetNeutral = function() {
        this._neutralX = null; this._neutralY = null;
    };
    Game_Relative_Pad.prototype.isActive = function() {
        return this._neutralX !== null && this._neutralY !== null;
    };
    Game_Relative_Pad.prototype.getRotation = function() {
        return -this._radian + Math.PI / 2;
    };
    Game_Relative_Pad.prototype.getDir = function() {
        return this._diagonalMove ? this._dir8 : this._dir4;
    };
    Game_Relative_Pad.prototype.getDir4 = function() {
        return this._dir4;
    };
    Game_Relative_Pad.prototype._calculateDir4 = function() {
        const pi4d = Math.PI / 4;
        if (this.isDistanceZero()) return 0;
        if (this._radian < pi4d || this._radian >= pi4d * 7) return 6;
        if (this._radian >= pi4d && this._radian < pi4d * 3) return 8;
        if (this._radian >= pi4d * 3 && this._radian < pi4d * 5) return 4;
        if (this._radian >= pi4d * 5 && this._radian < pi4d * 7) return 2;
        return 0;
    };
    Game_Relative_Pad.prototype._calculateDir8 = function() {
        const pi8d = Math.PI / 8;
        if (this.isDistanceZero()) return 0;
        if (this._radian < pi8d || this._radian >= pi8d * 15) return 6;
        if (this._radian >= pi8d && this._radian < pi8d * 3) return 9;
        if (this._radian >= pi8d * 3 && this._radian < pi8d * 5) return 8;
        if (this._radian >= pi8d * 5 && this._radian < pi8d * 7) return 7;
        if (this._radian >= pi8d * 7 && this._radian < pi8d * 9) return 4;
        if (this._radian >= pi8d * 9 && this._radian < pi8d * 11) return 1;
        if (this._radian >= pi8d * 11 && this._radian < pi8d * 13) return 2;
        if (this._radian >= pi8d * 13 && this._radian < pi8d * 15) return 3;
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
    Game_Relative_Pad.prototype._inTouchableRect = function() {
        return this._x >= paramTouchableRect[0] && this._x <= paramTouchableRect[2] &&
            this._y >= paramTouchableRect[1] && this._y <= paramTouchableRect[3];
    };

    const _Game_Player_update_original = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        this.getMovePad().update();
        _Game_Player_update_original.apply(this, arguments);
    };

    const _Game_Player_getInputDirection = Game_Player.prototype.getInputDirection;
    Game_Player.prototype.getInputDirection = function() {
        return _Game_Player_getInputDirection.apply(this, arguments) || this.getMovePad().getDir();
    };

    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        const movePad = this.getMovePad();
        if (movePad.isActive() && movePad.isDistanceNear()) {
            const turnDir = movePad.getDir4();
            if (turnDir !== 0) this.setDirection(turnDir);
        } else {
            if (direction % 2 === 0) {
                _Game_Player_executeMove.apply(this, arguments);
            } else if (direction !== 5) {
                this.executeDiagonalMove(direction);
            }
        }
    };

    Game_Player.prototype.executeDiagonalMove = function(d) {
        const horizon  = (d / 3 <= 1) ? d + 3 : d - 3;
        const vertical = (d % 3 === 0) ? d - 1 : d + 1;
        const x2 = $gameMap.roundXWithDirection(this.x, horizon);
        const y2 = $gameMap.roundYWithDirection(this.y, vertical);
        if (this.isCollidedWithCharacters(x2, this.y) || this.isCollidedWithCharacters(this.x, y2)) {
            return;
        }
        this.moveDiagonally(horizon, vertical);
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
        if (this.getMovePad().isActive() && !$gameMap.isDashDisabled() && !this.isInVehicle()) {
            this._dashing = this.getMovePad().isDistanceFar() || ConfigManager.alwaysDash;
        }
    };

    Game_Player.prototype.getMovePad = function() {
        return $gameTemp.getRelativeTouchPad();
    };

    const _Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function() {
        _Spriteset_Map_createUpperLayer.apply(this, arguments);
        this.createRelativePad();
        this.createInteractionIcon();
    };

    Spriteset_Map.prototype.createRelativePad = function() {
        this._relativePadSprite = new Sprite_Relative_Pad();
        this.addChild(this._relativePadSprite);
    };

    Spriteset_Map.prototype.createInteractionIcon = function() {
        this._interactionIconSprite = new Sprite_InteractIcon();
        this.addChild(this._interactionIconSprite);
    };

    const _Scene_Map_isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
    Scene_Map.prototype.isMapTouchOk = function() {
        return _Scene_Map_isMapTouchOk.apply(this, arguments) && !Game_Relative_Pad.mapTouchDisable;
    };
})();