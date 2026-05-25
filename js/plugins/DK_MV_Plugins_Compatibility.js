/*
Title: MV Plugins Compatibility
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.0.6
Release: 10.11.2020
First release: 29.10.2020
*/

/*ru
Название: Совместимость Плагинов MV
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.0.6
Релиз: 10.11.2020
Первый релиз: 29.10.2020
*/

/*:
 * @plugindesc v.1.0.6 Compatibility of RPG Maker MV plugins with RPG Maker MZ.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @orderBefore VisuMZ_1_SkillsStatesCore
 * @help

 ### Info about plugin ###
 Title: DK_MV_Plugins_Compatibility
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.0.6
 Release: 10.11.2020
 First release: 29.10.2020

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 # Installation #
 1. Install the plugin DK_MV_Plugins_Compatibility
 2. Install RPG Maker MV plugins
 3. Install special fixes for RPG Maker MV plugins (if any)

 ###=========================================================================
 ## How to use plugin commands from MV plugins
 ###=========================================================================
 To use plugin commands from MV plugins,
 it is necessary to select the event command "Script..." and enter the following:
 this.pluginCommand ('command', 'parameters'.split (' '))
 Replace the command and parameters with the command name and its parameters accordingly,
 be sure to write in quotes.

 Usage on the example of the plugin MUR_NPC_Go:
 this.pluginCommand('npc_go', '1 10 10 false false'.split(' '))

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

*/

/*:ru
 * @plugindesc v.1.0.6 Совместимость плагинов RPG Maker MV с RPG Maker MZ.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_MV_Plugins_Compatibility
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.0.6
 Релиз: 10.11.2020
 Первый релиз: 29.10.2020

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 # Установка #
 1. Установите плагин DK_MV_Plugins_Compatibility
 2. Установите плагины RPG Maker MV
 3. Установите специальные фиксы для плагинов RPG Maker MV (если они есть)

 ###=========================================================================
 ## Как использовать команды плагина от плагинов MV
 ###=========================================================================
 Чтобы использовать команды плагинов от плагинов MV,
 необходимо выбрать команду события "Скрипт..." (Script...) и ввести следующее:
 this.pluginCommand('команда', 'параметры'.split(' '))
 Замените команда и параметры на название команды и ее параметры соответственно,
 обязательно писать в кавычках.

 Использование на примере плагина MUR_NPC_Go:
 this.pluginCommand('npc_go', '1 10 10 false false'.split(' '))

 ###===========================================================================
 ## Лицензия и правила использования плагина
 ###===========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

*/

'use strict';

var Imported = Imported || {};
Imported['DK_MV_Plugins_Compatibility'] = '1.0.6';

//===========================================================================
// LZString
//===========================================================================

class LZString {

    static compressToBase64(data) {
        return pako.deflate(data, { to: 'string', level: 1 });
    }

    static decompressFromBase64(data) {
        return pako.inflate(data, { to: 'string' });
    }

}

//===========================================================================
// Utils
//===========================================================================

Utils._id = 0;
Utils.generateRuntimeId = function() {
    return Utils._id++;
};

//===========================================================================
// Graphics
//===========================================================================

// properties

Object.defineProperties(Graphics, {

    _renderer: {
        get: function() {
            return this.app.renderer;
        },
        configurable: true
    }

});

// methods

Graphics.hasWebGL = function() {
    return Utils.canUseWebGL();
};

Graphics.loadFont = function(name, url) {
    if (name === 'GameFont') {
        return;
    }

    if (url.startsWith('fonts/')) {
        url = url.substring(6);
    }

    FontManager.load(name, url);
};

Graphics.isFontLoaded = function(name) {
    return FontManager._states[name] === 'loaded';
};

Graphics.playVideo = function(src) {
    Video.play(src);
};

Graphics.updateLoading = function() {};

//===========================================================================
// Bitmap
//===========================================================================

const MVPluginsCompatibility_Bitmap_drawText =
    Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function() {
    if (this.fontFace === 'GameFont') {
        this.fontFace = $gameSystem.mainFontFace();
    }

    MVPluginsCompatibility_Bitmap_drawText.apply(this, arguments);
};

//===========================================================================
// Game_CharacterBase
//===========================================================================

Game_CharacterBase.prototype.requestAnimation = function(animationId) {
    $gameTemp.requestAnimation([this], animationId);
};

Game_CharacterBase.prototype.requestBalloon = function(balloonId) {
    $gameTemp.requestBalloon(this, balloonId);
};

//===========================================================================
// Game_BattlerBase
//===========================================================================

const MVPluginsCompatibility_Game_BattlerBase_attackSkillId =
    Game_BattlerBase.prototype.attackSkillId;
Game_BattlerBase.prototype.attackSkillId = function() {
    try {
        return MVPluginsCompatibility_Game_BattlerBase_attackSkillId.apply(this, arguments);
    } catch (e) {
        return 1;
    }
};

//===========================================================================
// Game_Battler
//===========================================================================

Game_Battler.prototype.isAnimationRequested = function() {
    return $gameTemp._animationQueue.some(request => request.targets.includes(this));
};

Game_Battler.prototype.shiftAnimation = function() {
    const queue = $gameTemp._animationQueue;
    const index = queue.findIndex(request => request.targets.includes(this));
    const animation = queue[index];

    if (animation) {
        queue.splice(index, 1);
    }

    return animation || null;
};

Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
    const length = $gameTemp._animationQueue.length;

    $gameTemp.requestAnimation([this], animationId, mirror);

    const newLength = $gameTemp._animationQueue.length;

    if (length + 1 === newLength) {
        const request = $gameTemp._animationQueue[length];

        request.delay = delay;
    }
};

//===========================================================================
// Game_Interpreter
//===========================================================================

const MVPluginsCompatibility_Game_Interpreter_executeCommand =
    Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    const command = this.currentCommand();

    if (command) {
        this._params = command.parameters;
    }

    return MVPluginsCompatibility_Game_Interpreter_executeCommand.apply(this, arguments);
};

//===========================================================================
// Window
//===========================================================================

Object.defineProperties(Window.prototype, {

    _windowSpriteContainer: {
        get: function() {
            return this._container;
        },
        configurable: true
    },

    _windowContentsSprite: {
       get: function() {
           return this._contentsSprite;
       },
        configurable: true
    },

    _windowBackSprite: {
        get: function() {
            return this._backSprite;
        },
        configurable: true
    },

    _windowCursorSprite: {
        get: function() {
            return this._cursorSprite;
        },
        configurable: true
    },

    _windowFrameSprite: {
        get: function() {
            return this._contentsSprite;
        },
        configurable: true
    },

    _windowPauseSignSprite: {
        get: function() {
            return this._pauseSignSprite;
        },
        configurable: true
    }

});

//===========================================================================
// Window_Base
//===========================================================================

// properties

Object.defineProperties(Window_Base, {

    _iconWidth: {
        get: function() {
            return ImageManager.iconWidth;
        },
        configurable: true
    },

    _iconHeight: {
        get: function() {
            return ImageManager.iconHeight;
        },
        configurable: true
    },

    _faceWidth: {
        get: function() {
            return ImageManager.faceWidth;
        },
        configurable: true
    },

    _faceHeight: {
        get: function() {
            return ImageManager.faceHeight;
        },
        configurable: true
    }

});

// methods

const MVPluginsCompatibility_Window_Base_initialize =
    Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function() {
    const rect = this.__argumentsToRect.apply(this, arguments);
    MVPluginsCompatibility_Window_Base_initialize.call(this, rect);
};

Window_Base.prototype.__argumentsToRect = function() {
    let rect;

    if (arguments[0] instanceof Rectangle) {
        rect = arguments[0];
    } else {
        let x = 0, y = 0, width, height;

        if (Number.isFinite(arguments[0])) {
            x = arguments[0];
        }

        if (Number.isFinite(arguments[1])) {
            y = arguments[1];
        }

        if (Number.isFinite(arguments[2])) {
            width = arguments[2];
        } else if (typeof this.windowWidth === 'function') {
            width = this.windowWidth();
        }

        if (Number.isFinite(arguments[3])) {
            height = arguments[3];
        } else if (typeof this.windowHeight === 'function') {
            height = this.windowHeight();
        }

        rect = new Rectangle(x, y, width, height);
    }

    return rect || null;
};

Window_Base.prototype.standardPadding = function() {
    return $gameSystem.windowPadding();
};

Window_Base.prototype.standardFontFace = function() {
    return $gameSystem.mainFontFace();
};

Window_Base.prototype.standardFontSize = function() {
    return $gameSystem.mainFontSize();
};

Window_Base.prototype.standardBackOpacity = function() {
    return this._backSprite.opacity;
};

Window_Base.prototype.textPadding = function() {
    return 6;
};

Window_Base.prototype.textColor = function(n) {
    return ColorManager.textColor(n);
};

Window_Base.prototype.normalColor = function() {
    return ColorManager.normalColor();
};

Window_Base.prototype.crisisColor = function() {
    return ColorManager.crisisColor();
};

Window_Base.prototype.gaugeBackColor = function() {
    return ColorManager.gaugeBackColor();
};

Window_Base.prototype.deathColor = function() {
    return ColorManager.deathColor();
};

Window_Base.prototype.hpGaugeColor1 = function() {
    return ColorManager.hpGaugeColor1();
};

Window_Base.prototype.hpGaugeColor2 = function() {
    return ColorManager.hpGaugeColor2();
};

Window_Base.prototype.mpGaugeColor1 = function() {
    return ColorManager.mpGaugeColor1();
};

Window_Base.prototype.mpGaugeColor2 = function() {
    return ColorManager.mpGaugeColor2();
};

Window_Base.prototype.mpCostColor = function() {
    return ColorManager.mpCostColor();
};

Window_Base.prototype.powerUpColor = function() {
    return ColorManager.powerUpColor();
};

Window_Base.prototype.powerDownColor = function() {
    return ColorManager.powerDownColor();
};

Window_Base.prototype.tpGaugeColor1 = function() {
    return ColorManager.tpGaugeColor1();
};

Window_Base.prototype.tpGaugeColor2 = function() {
    return ColorManager.tpGaugeColor2();
};

Window_Base.prototype.tpCostColor = function() {
    return ColorManager.tpCostColor();
};

Window_Base.prototype.pendingColor = function() {
    return ColorManager.pendingColor();
};

Window_Base.prototype.hpColor = function(actor) {
    return ColorManager.hpColor(actor);
};

Window_Base.prototype.mpColor = function(actor) {
    return ColorManager.mpColor(actor);
};

Window_Base.prototype.tpColor = function(actor) {
    return ColorManager.tpColor(actor);
};

Window_Base.prototype.updatePadding = function() {};

Window_Base.prototype.updateBackOpacity = function() {};

Window_Base.prototype.drawActorCharacter = Window_StatusBase.prototype.drawActorCharacter;
Window_Base.prototype.drawActorFace = Window_StatusBase.prototype.drawActorFace;
Window_Base.prototype.drawActorName = Window_StatusBase.prototype.drawActorName;
Window_Base.prototype.drawActorClass = Window_StatusBase.prototype.drawActorClass;
Window_Base.prototype.drawActorNickname = Window_StatusBase.prototype.drawActorNickname;
Window_Base.prototype.drawActorLevel = Window_StatusBase.prototype.drawActorLevel;
Window_Base.prototype.drawActorIcons = Window_StatusBase.prototype.drawActorIcons;
Window_Base.prototype.drawActorSimpleStatus = Window_StatusBase.prototype.drawActorSimpleStatus;

Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y, width, color1, color2) {
    const labelWidth = this.textWidth('HP');
    const valueWidth = this.textWidth('0000');
    const slashWidth = this.textWidth('/');
    const x1 = x + width - valueWidth;
    const x2 = x1 - slashWidth;
    const x3 = x2 - valueWidth;

    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(current, x3, y, valueWidth, 'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(current, x1, y, valueWidth, 'right');
    }
};

Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;

    this.drawGauge(x, y, width, actor.hpRate(), this.hpGaugeColor1(), this.hpGaugeColor2());
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
        this.hpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;

    this.drawGauge(x, y, width, actor.mpRate(), this.mpGaugeColor1(), this.mpGaugeColor2());
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
        this.mpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;

    this.drawGauge(x, y, width, actor.tpRate(), this.tpGaugeColor1(), this.tpGaugeColor2());
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};

Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    const fillW = Math.floor(width * rate);
    const gaugeY = y + this.lineHeight() - 8;

    this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

Window_Base.prototype.updatePadding = function() {
    this.padding = this.standardPadding();
};

Window_Base.prototype.updateBackOpacity = function() {
    this._backSprite.opacity = this.standardBackOpacity();
};

//===========================================================================
// Window_Selectable
//===========================================================================

const MVPluginsCompatibility_Window_Selectable_initialize =
    Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function() {
    const rect = this.__argumentsToRect.apply(this, arguments);
    MVPluginsCompatibility_Window_Selectable_initialize.call(this, rect);
};

const MVPluginsCompatibility_Window_Selectable_fittingHeight =
    Window_Selectable.prototype.fittingHeight;
Window_Selectable.prototype.fittingHeight = function(numLines) {
    const height = MVPluginsCompatibility_Window_Selectable_fittingHeight.apply(this, arguments);
    return Number.isFinite(height) ?
        height : numLines * this.lineHeight() + $gameSystem.windowPadding() * 2;
};

Window_Selectable.prototype.itemRectForText = function(index) {
    return this.itemLineRect(index);
};

Window_Selectable.prototype.resetScroll = function() {
    this.forceSelect(0);
};

Window_Selectable.prototype.spacing = function() {
    return this.colSpacing();
};

//===========================================================================
// Window_Command
//===========================================================================

Window_Command.prototype.windowWidth = function() {
    return 240;
};

Window_Command.prototype.windowHeight = function() {
    if (!this._list) {
        this.clearCommandList();
        this.makeCommandList();
    }

    return this.fittingHeight(this.numVisibleRows());
};

Window_Command.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_Command.prototype.maxItems = function() {
    return (this._list ?
        this._list.length : 0);
}

//===========================================================================
// Window_HorzCommand
//===========================================================================

const MVPluginsCompatibility_Window_HorzCommand_initialize =
    Window_HorzCommand.prototype.initialize;
Window_HorzCommand.prototype.initialize = function() {
    const rect = this.__argumentsToRect.apply(this, arguments);
    MVPluginsCompatibility_Window_HorzCommand_initialize.call(this, rect);
};

//===========================================================================
// Window_Help
//===========================================================================

const MVPluginsCompatibility_Window_Help_initialize =
    Window_Help.prototype.initialize;
Window_Help.prototype.initialize = function() {
    let rect = this.__argumentsToRect.apply(this, arguments);

    if (Number.isFinite(arguments[0]) && arguments.length === 1) {
        rect = new Rectangle(0, 0, Graphics.boxWidth, this.fittingHeight(arguments[0]));
    }

    MVPluginsCompatibility_Window_Help_initialize.call(this, rect);
};

//===========================================================================
// Window_ItemList
//===========================================================================

const MVPluginsCompatibility_Window_ItemList_initialize =
    Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function() {
    const rect = this.__argumentsToRect.apply(this, arguments);
    MVPluginsCompatibility_Window_ItemList_initialize.call(this, rect);
};

//===========================================================================
// Window_Message
//===========================================================================

const MVPluginsCompatibility_Window_Message_initialize =
    Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
    MVPluginsCompatibility_Window_Message_initialize.apply(this, arguments);
    this.createSubWindows();
};

Window_Message.prototype.createSubWindows = function() {};

Window_Message.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

//===========================================================================
// Window_SavefileList
//===========================================================================

const MVPluginsCompatibility_Window_SavefileList_initialize =
    Window_SavefileList.prototype.initialize;
Window_SavefileList.prototype.initialize = function() {
    const rect = this.__argumentsToRect.apply(this, arguments);
    MVPluginsCompatibility_Window_SavefileList_initialize.call(this, rect);
};

Window_SavefileList.prototype.drawFileId = function(id, x, y) {
    this.drawText(TextManager.file + ' ' + id, x, y, 180);
};

//===========================================================================
// DataManager
//===========================================================================

DataManager.isThisGameFile = function(savefileId) {
    return this.savefileExists(savefileId);
};

DataManager.loadSavefileInfo = function(savefileId) {
    const saveName = this.makeSavename(savefileId);
    return this.isThisGameFile(savefileId) ?
        StorageManager.loadObject(saveName) : Promise.resolve(null);
};

//===========================================================================
// StorageManager
//===========================================================================

StorageManager.save = function(savefileId, json) {
    this.jsonToZip(json)
         .then(zip => this.saveZip(
             DataManager.makeSavename(savefileId), zip));
};

StorageManager.load = function(savefileId) {
    const saveName = DataManager.makeSavename(savefileId);

    if (this.exists(saveName)) {
        return this.loadZip(saveName)
                    .then(zip => this.zipToJson(zip))
                    .then(json => this.jsonToObject(json));
    }

    return Promise.resolve(null);
};

StorageManager.backup = function(savefileId) {};

StorageManager.backupExists = function(savefileId) {
    return false;
};

StorageManager.cleanBackup = function() {};

StorageManager.restoreBackup = function(savefileId) {};

//===========================================================================
// ImageManager
//===========================================================================

['Animation', 'Battleback1', 'Battleback2', 'Enemy', 'Character',
'Face', 'Parallax', 'Picture', 'SvActor', 'SvEnemy', 'System',
'Tileset', 'Title1', 'Title2', 'Bitmap'].forEach((part) => {
    ImageManager[`reserve${part}`] = ImageManager[`load${part}`].bind(ImageManager);
    ImageManager[`request${part}`] = ImageManager[`load${part}`].bind(ImageManager);
});

ImageManager.releaseReservation = function(reservationId) {};

//===========================================================================
// BattleManager
//===========================================================================

BattleManager.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
};

BattleManager.refreshStatus = function() {
    this._statusWindow && this._statusWindow.refresh();
};

//===========================================================================
// Sprite_Base
//===========================================================================

class Sprite_Base extends Sprite {

    initialize() {
        super.initialize();
        this._animationSprites = [];
        this._effectTarget = this;
        this._hidden = false;
    }

    isAnimationPlaying() {
        return this._animationSprites.length > 0;
    }

    _addAnimation(sprite) {
        SceneManager._scene._spriteset._effectsContainer.addChild(sprite);
        SceneManager._scene._spriteset._animationSprites.push(sprite);
    }

    startAnimation(animation, mirror, delay) {
        const sprite = new Sprite_AnimationMV();
        const args = [this._target || this._effectTarget, ...arguments];

        sprite.setup(...args);
        sprite.targetObjects = [];

        this._addAnimation(sprite);
        this._animationSprites.push(sprite);
    }

    updateAnimationSprites() {
        if (this._animationSprites.length > 0) {
            const sprites = this._animationSprites.clone();

            this._animationSprites = [];

            sprites.forEach((sprite) => {
                if (sprite.isPlaying()) {
                    this._animationSprites.push(sprite);
                } else {
                    sprite.remove();
                }
            });
        }
    }

    update() {
        super.update();
        this.updateAnimationSprites();
    }

}

//===========================================================================
// Sprite_Character
//===========================================================================

Sprite_Character.prototype.endBalloon = function() {
    debugger;

    const spriteset = SceneManager._scene._spriteset;
    const sprite = spriteset.findTargetSprite(this._character);

    sprite && spriteset.removeBalloon(sprite);

    this._character.endBalloon();
};

Sprite_Character.prototype.endAnimation = function() {
    const spriteset = SceneManager._scene._spriteset;

    debugger;

    spriteset._animationSprites.forEach((animation) => {
        const index = animation.targetObjects.indexOf(this._character);

        if (index >= 0) {
            debugger;

            animation.targetObjects.splice(index, 1);

            if (animation.targetObjects.length === 0) {
                spriteset.removeAnimation(animation);
            }
        }
    });
};

//===========================================================================
// Sprite_Animation
//===========================================================================

Object.defineProperties(Sprite_Animation.prototype, {

    _target: {
        get: function() {
            return this._targets[0] || null;
        },
        set: function(value) {
            this._targets = [value];
        },
        configurable: true
    }

});

// methods

Sprite_Animation.prototype.remove = function() {
    SceneManager._scene._spriteset._animationSprites.remove(this);

    this.parent && this.parent.removeChild(this);

    for (const target of this.targetObjects) {
        if (target.endAnimation) {
            target.endAnimation();
        }
    }
};

//===========================================================================
// Sprite_AnimationMV
//===========================================================================

// properties

Object.defineProperties(Sprite_AnimationMV.prototype, {

    _target: {
        get: function() {
            return this._targets[0] || null;
        },
        set: function(value) {
            this._targets = [value];
        },
        configurable: true
    }

});

// methods

const MVPluginsCompatibility_Sprite_AnimationMV_setup =
    Sprite_AnimationMV.prototype.setup;
Sprite_AnimationMV.prototype.setup = function(targets, animation, mirror, delay) {
    if (!Array.isArray(targets) && targets instanceof Object) {
        targets = [targets];
    }

    MVPluginsCompatibility_Sprite_AnimationMV_setup.call(
        this, targets, animation, mirror, delay);
};

Sprite_AnimationMV.prototype.createSprites = function() {};

Sprite_AnimationMV.prototype.remove = function() {
    Sprite_Animation.prototype.remove.apply(this, arguments);
    this.onEnd();
};

//===========================================================================
// Sprite_Damage
//===========================================================================

Sprite_Damage.prototype.digitWidth = function() {
    return this.fontSize() * 0.75;
};

Sprite_Damage.prototype.digitHeight = function() {
    return this.fontSize();
};

//===========================================================================
// Scene_File
//===========================================================================

Scene_File.prototype.firstSavefileIndex = function() {
    return 0;
};

//===========================================================================
// Scene_Save
//===========================================================================

Scene_Save.prototype.firstSavefileIndex = function() {
    return $gameSystem.savefileId();
};

//===========================================================================
// Scene_Load
//===========================================================================

Scene_Load.prototype.firstSavefileIndex = function() {
    return DataManager.latestSavefileId() - 1;
};

//===========================================================================
// Scene_Battle
//===========================================================================

const MVPluginsCompatibility_Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    MVPluginsCompatibility_Scene_Battle_createDisplayObjects.apply(this, arguments);
    BattleManager.setStatusWindow(this._statusWindow);
};

Scene_Battle.prototype.refreshStatus = function() {
    this._statusWindow && this._statusWindow.refresh();
};
