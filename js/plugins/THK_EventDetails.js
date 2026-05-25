/*:
 * @plugindesc [THK] v1.0 Displays Names and Icons above Events.
 * @author THK (Assisted by Gemini)
 *
 * @param NameSettings
 * @text Name Display Settings
 *
 * @param Name_FontName
 * @parent NameSettings
 * @text Font Name
 * @type text
 * @desc The font face to use (e.g., GameFont).
 * @default GameFont
 *
 * @param Name_FontSize
 * @parent NameSettings
 * @text Font Size
 * @type number
 * @desc Font size for the event name display.
 * @default 28
 *
 * @param Name_TextColor
 * @parent NameSettings
 * @text Text Color
 * @type text
 * @desc CSS color code for the text (e.g., #FFFFFF).
 * @default #FFFFFF
 *
 * @param Name_OutlineColor
 * @parent NameSettings
 * @text Outline Color
 * @type text
 * @desc CSS color code for the text outline (e.g., rgba(0, 0, 0, 0.6)).
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param Name_OutlineWidth
 * @parent NameSettings
 * @text Outline Width
 * @type number
 * @desc Thickness of the text outline.
 * @default 4
 *
 * @param Name_YOffset
 * @parent NameSettings
 * @text Name Y Offset
 * @type number
 * @min -999
 * @desc Adjusts the vertical position (Y) of the Name relative to the Event Sprite. (Negative moves up)
 * @default -10
 *
 * @param Icon_YOffset
 * @parent NameSettings
 * @text Icon Y Offset
 * @type number
 * @min -999
 * @desc Adjusts the vertical position (Y) of the Icon relative to the Event Sprite.
 * @default -50
 *
 * @param ProximitySettings
 * @text Proximity Settings
 *
 * @param Prox_Enabled
 * @parent ProximitySettings
 * @text Enable Proximity
 * @type boolean
 * @desc If true, names/icons only show when the player is nearby.
 * @default true
 *
 * @param Prox_Range
 * @parent ProximitySettings
 * @text Range (Tiles)
 * @type number
 * @min 1
 * @desc The maximum number of tiles for the player to activate the display.
 * @default 3
 *
 * @command SetName
 * @text Set Event Display Name
 * @desc Changes the display name for a specific event on the current map.
 *
 * @arg EventId
 * @type number
 * @default 0
 * @text Event ID
 * @desc The ID of the event (0 for the event running this command).
 *
 * @arg NewName
 * @type text
 * @default
 * @text New Name
 * @desc The new name to display (e.g., "Open Chest").
 *
 * @command SetIcon
 * @text Set Event Display Icon
 * @desc Changes the display icon for a specific event on the current map.
 *
 * @arg EventId
 * @type number
 * @default 0
 * @text Event ID
 * @desc The ID of the event (0 for the event running this command).
 *
 * @arg IconIndex
 * @type number
 * @default 0
 * @text Icon Index
 * @desc The index number of the icon (0 to disable the icon).
 *
 * @help
 * ===========================================================================
 * Plugin Commands
 * ===========================================================================
 *
 * Use the Plugin Command menu and select "THK_EventDetails" to access:
 * 1. Set Event Display Name (SetName)
 * 2. Set Event Display Icon (SetIcon)
 *
 * ===========================================================================
 * Event Note Tags
 * ===========================================================================
 * - <Name:Default Name> : Sets the initial display name.
 * - <Icon:Icon Index>   : Sets the initial icon index (e.g., <Icon:160>).
 *
 * ===========================================================================
 */

(() => { 

    const PLUGIN_NAME = 'THK_EventDetails'; 
    const THK_PARAMS = PluginManager.parameters(PLUGIN_NAME);

    // --- CONFIGURATION LOADING ---
    const THK_NAME_SETTINGS = {
        fontName: THK_PARAMS.Name_FontName || 'GameFont',
        fontSize: Number(THK_PARAMS.Name_FontSize || 28),
        textColor: THK_PARAMS.Name_TextColor || '#FFFFFF',
        outlineColor: THK_PARAMS.Name_OutlineColor || 'rgba(0, 0, 0, 0.6)',
        outlineWidth: Number(THK_PARAMS.Name_OutlineWidth || 4),
        yOffset: Number(THK_PARAMS.Name_YOffset || -10)
    };
    const THK_ICON_SETTINGS = {
        yOffset: Number(THK_PARAMS.Icon_YOffset || -50)
    };
    const THK_PROX_SETTINGS = {
        enabled: THK_PARAMS.Prox_Enabled === 'true',
        range: Number(THK_PARAMS.Prox_Range || 3)
    };

    // --- PART 1: GAME_EVENT EXTENSIONS ---

    const _THK_Game_Event_init = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _THK_Game_Event_init.call(this, mapId, eventId);
        this.setupDisplayDetails();
    };

    Game_Event.prototype.setupDisplayDetails = function() {
        const note = this.event().note;
        const nameMatch = note.match(/<Name:(.*)>/i);
        this._displayName = nameMatch ? nameMatch[1].trim() : this.event().name; 
        
        const iconMatch = note.match(/<Icon:(\d+)>/i);
        this._displayIconIndex = iconMatch ? Number(iconMatch[1]) : 0;
    };

    Game_Event.prototype.shouldDisplayDetails = function() {
        if (!THK_PROX_SETTINGS.enabled) {
            return true;
        }

        const range = THK_PROX_SETTINGS.range;
        const dx = $gameMap.deltaX(this.x, $gamePlayer.x);
        const dy = $gameMap.deltaY(this.y, $gamePlayer.y);
        const distance = Math.max(Math.abs(dx), Math.abs(dy));

        return distance <= range;
    };

    // --- PART 2: SPRITE_NAME CLASS ---

    function Sprite_EventName() {
        this.initialize(...arguments);
    }

    Sprite_EventName.prototype = Object.create(Sprite.prototype);
    Sprite_EventName.prototype.constructor = Sprite_EventName;

    Sprite_EventName.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(200, 32); 
        this._text = "";
        this.anchor.x = 0.5;
        this.anchor.y = 1.0; 

        this.updateStyle();
    };

    Sprite_EventName.prototype.updateStyle = function() {
        const b = this.bitmap;
        b.fontFace = THK_NAME_SETTINGS.fontName;
        b.fontSize = THK_NAME_SETTINGS.fontSize;
        b.textColor = THK_NAME_SETTINGS.textColor;
        b.outlineColor = THK_NAME_SETTINGS.outlineColor;
        b.outlineWidth = THK_NAME_SETTINGS.outlineWidth;
    };

    Sprite_EventName.prototype.setText = function(text) {
        if (this._text !== text) {
            this._text = text;
            this.redraw();
        }
    };

    Sprite_EventName.prototype.redraw = function() {
        const b = this.bitmap;
        b.clear();

        if (this._text) {
            const textWidth = b.measureTextWidth(this._text);
            const padding = THK_NAME_SETTINGS.outlineWidth * 2 + 10;
            b.resize(textWidth + padding, THK_NAME_SETTINGS.fontSize + padding / 2);

            this.updateStyle();
            b.drawText(this._text, 0, 0, b.width, b.height, 'center');
        }
    };

    // --- PART 3: SPRITE_ICON CLASS ---

    function Sprite_EventIcon() {
        this.initialize(...arguments);
    }

    Sprite_EventIcon.prototype = Object.create(Sprite.prototype);
    Sprite_EventIcon.prototype.constructor = Sprite_EventIcon;

    Sprite_EventIcon.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this); 
        this._iconIndex = 0;
    };

    Sprite_EventIcon.prototype.setIconIndex = function(iconIndex) {
        if (this._iconIndex !== iconIndex) {
            this._iconIndex = iconIndex;
            this.loadBitmap();
        }
    };

    Sprite_EventIcon.prototype.loadBitmap = function() {
        const iconIndex = this._iconIndex;
        if (iconIndex > 0) {
            const iconBitmap = ImageManager.loadSystem("IconSet");
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            
            this.bitmap = new Bitmap(pw, ph);

            iconBitmap.addLoadListener(() => {
                if (this._iconIndex === iconIndex) { 
                    this.bitmap.clear();
                    this.bitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, pw, ph);
                }
            });
        } else {
            this.bitmap = new Bitmap(1, 1);
        }
    };

    // --- PART 4: SPRITE_CHARACTER EXTENSIONS ---

    const _THK_Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _THK_Sprite_Character_update.call(this);
        if (this._character instanceof Game_Event) {
            this.updateEventDetails();
        }
    };

    Sprite_Character.prototype.updateEventDetails = function() {
        const event = this._character;

        // --- Name Update ---
        if (!this._nameSprite) {
            this._nameSprite = new Sprite_EventName();
            this.addChild(this._nameSprite);
        }
        const nameVisible = event.shouldDisplayDetails() && event._displayName;
        this._nameSprite.visible = nameVisible;
        if (nameVisible) {
            this._nameSprite.setText(event._displayName);
            this._nameSprite.x = 0;
            this._nameSprite.y = -this.height + THK_NAME_SETTINGS.yOffset;
        }

        // --- Icon Update ---
        if (!this._iconSprite) {
            this._iconSprite = new Sprite_EventIcon();
            this.addChild(this._iconSprite);
        }
        const iconVisible = event.shouldDisplayDetails() && event._displayIconIndex > 0;
        this._iconSprite.visible = iconVisible;
        if (iconVisible) {
            this._iconSprite.setIconIndex(event._displayIconIndex);
            this._iconSprite.x = 0;
            this._iconSprite.y = -this.height + THK_ICON_SETTINGS.yOffset; 
            this._iconSprite.anchor.x = 0.5;
            this._iconSprite.anchor.y = 1.0;
        }
    };

    // --- PART 5: PLUGIN COMMANDS ---

    // Helper to get the correct Event ID (0 means the running event)
    const getEventId = (argsEventId) => {
        let eventId = Number(argsEventId);
        if (eventId === 0) {
            // SỬA LỖI: Sử dụng cách lấy Event ID chính xác trong MZ
            const interpreter = $gameMap._interpreter;
            if (interpreter && $gameParty.inBattle() === false) { 
                // Kiểm tra xem có Event đang chạy trên Map không (không phải trong chiến đấu)
                return interpreter.eventId();
            } else {
                return 0; 
            }
        }
        return eventId;
    };

    // 1. Set Name Command
    PluginManager.registerCommand(PLUGIN_NAME, 'SetName', args => {
        const eventId = getEventId(args.EventId);
        const newName = args.NewName;

        if (eventId > 0) {
            const event = $gameMap.event(eventId);
            if (event) {
                event._displayName = newName;
                
                // --- FIX: Force Update Sprite Name Directly ---
                const spriteset = SceneManager._scene._spriteset;
                if (spriteset) {
                    const sprite = spriteset._characterSprites.find(s => s._character === event);
                    if (sprite && sprite._nameSprite) {
                        sprite._nameSprite.setText(newName);
                    }
                }
                
                // Official Refresh (As fallback)
                $gameMap.requestRefresh(); 
            }
        }
    });
    
    // 2. Set Icon Command
    PluginManager.registerCommand(PLUGIN_NAME, 'SetIcon', args => {
        const eventId = getEventId(args.EventId);
        const iconIndex = Number(args.IconIndex);

        if (eventId > 0) {
            const event = $gameMap.event(eventId);
            if (event) {
                event._displayIconIndex = iconIndex;
                $gameMap.requestRefresh(); 
            }
        }
    });

})(); // End of IIFE