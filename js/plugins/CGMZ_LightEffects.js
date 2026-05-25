/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/lighteffects/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds simple light effects to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.3.3
 * ----------------------------------------------------------------------------
 * Description: This plugin adds some basic light effects to your game. You
 * can use it to set up preset light effects which can include different
 * images, flicker, x/y offsets, opacity, range, and more. It is not an
 * advanced light effect system.
 * ----------------------------------------------------------------------------
 * Documentation:
 * --------------------------------Lights--------------------------------------
 * To make a light effect appear on an event, use a comment somewhere in the
 * event page that says:
 * CGMZ LE id
 * For example, if your light effect had an id of "fire" you would do:
 * CGMZ LE fire
 * 
 * To turn off a light, you can turn off all lights globally or all lights of
 * a specific id with plugin commands. To turn off a light individually, you
 * can change event pages to one without the comment.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following plugin commands:
 * - Change Visibility: Disables or enables light effects globally.
 * - Disable Light: Disables/enables light effects by id
 * ----------------------------Version History---------------------------------
 * Version 1.0.0 - Initial Release
 *
 * @command Change Visibility
 * @desc Disable/enable light effects on the map globally.
 *
 * @arg visible
 * @type boolean
 * @default true
 * @desc Whether light effects should be visible or not.
 *
 * @command Disable Light
 * @desc Disable/enable specific light effects by id
 *
 * @arg id
 * @desc The id of the light effect
 *
 * @arg disabled
 * @type boolean
 * @default false
 * @desc Whether light effects should be disabled or not
 * 
 * @param Light Effects
 * @type struct<LightEffect>[]
 * @default []
 * @desc Set up light effects here
*/
/*~struct~LightEffect:
 * @param Id
 * @desc The unique id of the light effect. Does not have to be a number, just unique.
 *
 * @param Image
 * @type file
 * @dir img
 * @desc The image of the light effect
 *
 * @param Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 100
 * @desc The base opacity of the image
 *
 * @param Flicker
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * @desc The amount to change the opacity of the image by when flickering. Set to 0 for no flicker.
 *
 * @param X Offset
 * @type number
 * @min 0
 * @default 0
 * @desc The x-offset of the light sprite
 *
 * @param Y Offset
 * @type number
 * @min 0
 * @default 0
 * @desc The y-offset of the light sprite
 *
 * @param X Scale
 * @type number
 * @min 0
 * @default 1
 * @desc The x scale of the sprite
 *
 * @param Y Scale
 * @type number
 * @min 0
 * @default 1
 * @desc The y scale of the sprite
 *
 * @param Hue
 * @type number
 * @min -360
 * @max 360
 * @default 0
 * @desc The hue rotation from -360 to 360
 * 
 * @param Color Tone
 * @type struct<Tone>
 * @default {"Red":"255","Green":"255","Blue":"255","Gray":"255"}
 * @desc The color tone of the light
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc The red value of the tone
 *
 * @param Green
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc The green value of the tone
 *
 * @param Blue
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc The blue value of the tone
 *
 * @param Gray
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc The gray value of the tone
*/
var Imported = Imported || {};
Imported.CGMZ_LightEffects = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Light Effects"] = "Alpha";
CGMZ.LightEffects = CGMZ.LightEffects || {};
CGMZ.LightEffects.parameters = PluginManager.parameters('CGMZ_LightEffects');
CGMZ.LightEffects.LightEffects = JSON.parse(CGMZ.LightEffects.parameters["Light Effects"]);
//=============================================================================
// CGMZ_SimpleLightEffect
//-----------------------------------------------------------------------------
// Data class used to store light effect properties
//=============================================================================
function CGMZ_SimpleLightEffect() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_SimpleLightEffect.prototype.initialize = function(properties) {
	this._id = properties.Id;
	this._image = properties.Image;
	this._opacity = Number(properties.Opacity);
	this._flicker = Number(properties.Flicker);
	this._hue = Number(properties.Hue);
	this._offset = new Point(Number(properties["X Offset"]), Number(properties["Y Offset"]));
	this._scale = new Point(Number(properties["X Scale"]), Number(properties["Y Scale"]));
	this._colorTone = this.setupColorTone(JSON.parse(properties["Color Tone"]));
};
//-----------------------------------------------------------------------------
// Create color tone array
//-----------------------------------------------------------------------------
CGMZ_SimpleLightEffect.prototype.setupColorTone = function(tone) {
	return [Number(tone.Red), Number(tone.Green), Number(tone.Blue), Number(tone.Gray)];
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Add light effect data to save data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create saved light effect data
//-----------------------------------------------------------------------------
const alias_CGMZ_LightEffects_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_LightEffects_createPluginData.call(this);
	this.initializeLightEffects();
};
//-----------------------------------------------------------------------------
// Initialize light effect save data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeLightEffects = function() {
	this._lightEffectsVisibility = true;
	this._disabledLightTypes = {};
};
//-----------------------------------------------------------------------------
// Check for unknown light types after load
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.onAfterLoad = function() {
	for(const le of Object.keys($cgmzTemp._lightEffects)) {
		if(typeof this._disabledLightTypes[le] === "undefined") {
			this._disabledLightTypes[le] = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Check if light effects are visible
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.areLightEffectsVisible = function() {
	return this._lightEffectsVisibility;
};
//-----------------------------------------------------------------------------
// Check if light effects are visible
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setLightEffectVisibility = function(visibility) {
	this._lightEffectsVisibility = visibility;
};
//-----------------------------------------------------------------------------
// Check if specific light effect is visible
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.isLightEffectDisabled = function(id) {
	return !this._disabledLightTypes[id];
};
//-----------------------------------------------------------------------------
// Change visibility of specific light effect
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.disableLightEffectType = function(id, disabled) {
	this._disabledLightTypes[id] = disabled;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle light effect temp data and plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_LightEffects_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_LightEffects_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_LightEffects", "Change Visibility", this.pluginCommandLightEffectsChangeVisibility);
	PluginManager.registerCommand("CGMZ_LightEffects", "Disable Light", this.pluginCommandLightEffectsDisableLight);
};
//-----------------------------------------------------------------------------
// Set the light effect visibility
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandLightEffectsChangeVisibility = function(args) {
	$cgmz.setLightEffectVisibility((args.visible === 'true'));
};
//-----------------------------------------------------------------------------
// Set the individual light effect visibility
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandLightEffectsDisableLight = function(args) {
	$cgmz.disableLightEffectType(args.id, (args.disabled === 'true'));
};
//-----------------------------------------------------------------------------
// Initialize light effects
//-----------------------------------------------------------------------------
const alias_CGMZ_LightEffects_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_LightEffects_CGMZ_Temp_createPluginData.call(this);
	this._lightEffects = {};
	for(const leJSON of CGMZ.LightEffects.LightEffects) {
		const le = new CGMZ_SimpleLightEffect(JSON.parse(leJSON));
		this._lightEffects[le._id] = le;
		$cgmz.disableLightEffectType(le._id, false);
	}
};
//-----------------------------------------------------------------------------
// Get a light effect
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getLightEffect = function(id) {
	return this._lightEffects[id];
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Processing for event interaction with a tool
//=============================================================================
const alias_CGMZ_LightEffects_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    alias_CGMZ_LightEffects_Game_Event_setupPageSettings.call(this);
	this._CGMZ_light = null;
	const page = this.page();
	for(const command of page.list) {
		if(command.code === 108 && command.parameters[0].trim().includes("CGMZ LE")) {
			this._CGMZ_light = command.parameters[0].split(" ")[2];
			break;
		}
	}
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add sprites of light effects
//=============================================================================
//-----------------------------------------------------------------------------
// Also create light effects (after other sprites have been created)
//-----------------------------------------------------------------------------
const alias_CGMZ_LightEffects_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
	alias_CGMZ_LightEffects_Spriteset_Map_createLowerLayer.call(this);
	this.CGMZ_createLightEffects();
};
//-----------------------------------------------------------------------------
// Create light effect sprites for each event
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.CGMZ_createLightEffects = function() {
	const lightSprites = [];
	for (const event of $gameMap.events()) {
		lightSprites.push(new CGMZ_Sprite_SimpleLightEffect(event));
	}
	for (const sprite of lightSprites) {
		this._tilemap.addChild(sprite);
	}
};
//=============================================================================
// CGMZ_Sprite_SimpleLightEffect
//-----------------------------------------------------------------------------
// Sprite class for light effect images
//=============================================================================
function CGMZ_Sprite_SimpleLightEffect() {
    this.initialize(...arguments);
}
CGMZ_Sprite_SimpleLightEffect.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_SimpleLightEffect.prototype.constructor = CGMZ_Sprite_SimpleLightEffect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.initialize = function(event) {
    Sprite.prototype.initialize.call(this);
	this._event = event;
	this.visible = false;
    this.initMembers();
};
//-----------------------------------------------------------------------------
// Initialize data
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.initMembers = function() {
	this.anchor.x = 0.5;
    this.anchor.y = 0.5;
	this._light = null;
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.onImageLoaded = function() {
	this.visible = true;
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.updateLightSettings();
	if(this._needsUpdate) {
		this.updateLightVisibility();
		if(this.visible) {
			this.updatePosition();
			this.updateFlicker();
		}
	}
};
//-----------------------------------------------------------------------------
// Update settings of light
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.updateLightSettings = function() {
	if(this._light !== this._event._CGMZ_light) {
		this._light = this._event._CGMZ_light;
		this.visible = false;
		if(this._light) this.setupLight();
		this._needsUpdate = !!this._light;
	}
};
//-----------------------------------------------------------------------------
// Set up light effect
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.setupLight = function() {
	const light = $cgmzTemp.getLightEffect(this._light);
	this._baseOpacity = light._opacity;
	this.opacity = light._opacity;
	this.setHue(light._hue);
	this.setColorTone(light._colorTone);
	this._offset = light._offset;
	this._flicker = light._flicker;
	this.scale = light._scale;
	const imageData = $cgmzTemp.getImageData(light._image);
	this.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
	this.bitmap.addLoadListener(this.onImageLoaded.bind(this));
};
//-----------------------------------------------------------------------------
// Update position of light
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.updatePosition = function() {
	this.x = this._event.screenX() + this._offset.x;
    this.y = this._event.screenY() + this._offset.y;
    this.z = this._event.screenZ() + 3;
};
//-----------------------------------------------------------------------------
// Update light flicker
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.updateFlicker = function() {
	const sign = Math.random() < 0.5 ? 1 : -1;
	this.opacity = this._baseOpacity + sign * Math.floor(Math.random() * this._flicker);
};
//-----------------------------------------------------------------------------
// Update light visibility
//-----------------------------------------------------------------------------
CGMZ_Sprite_SimpleLightEffect.prototype.updateLightVisibility = function() {
	this.visible = ($cgmz.areLightEffectsVisible() && $cgmz.isLightEffectDisabled(this._light));
};