/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/mapnamewindow/
 * @target MZ
 * @plugindesc Allows further customization of the map name window
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
 * Made for RPG Maker MZ 1.2.1
 * ----------------------------------------------------------------------------
 * Description: This plugin allows more customization of the map name window.
 * It lets you create preset options to use, or default settings to fallback to
 * if not using a preset. Each map can use a different preset.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To use a preset, in the map note box use the following note tag:
 * <cgmzmapnamepreset:YourPresetIdHere>
 *
 * Update History:
 * Version 1.0.0 - Initial Release
 *
 * @param Presets
 * @type struct<MapNamePreset>[]
 * @desc Set up map window presets here
 * @default []
 *
 * @param Default Options
 *
 * @param Show Count
 * @parent Default Options
 * @type number
 * @desc The amount of frames to display the window for
 * @min 0
 * @default 150
 *
 * @param Fade Speed
 * @parent Default Options
 * @type number
 * @desc The amount of opacity to change per frame during fade
 * @min 1
 * @default 16
 *
 * @param Show Windowskin
 * @parent Default Options
 * @type boolean
 * @desc Whether to paint the windowskin or not
 * @default false
 *
 * @param Background Gradient Style
 * @parent Default Options
 * @type select
 * @option Default
 * @option Fade Left
 * @option Fade Right
 * @option None
 * @desc The style of gradient to show
 * @default Default
 *
 * @param Text Alignment
 * @parent Default Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the window
 * @default center
 *
 * @param Window Alignment
 * @parent Default Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the window
 * @default left
 *
 * @param Window Vertical Alignment
 * @parent Default Options
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc The vertical alignment of the window
 * @default top
 *
 * @param X
 * @parent Default Options
 * @type number
 * @desc The x coordinate of the window, ignored if window is center aligned, right offset if right aligned
 * @default 0
 *
 * @param Y
 * @parent Default Options
 * @type number
 * @desc The y coordinate of the window, ignored if window is center aligned
 * @default 0
 *
 * @param Width
 * @parent Default Options
 * @type number
 * @desc The width of the window
 * @min 0
 * @default 360
 *
 * @param Line Count
 * @parent Default Options
 * @type number
 * @desc The height of the window (in number of lines).
 * @min 0
 * @default 1
*/
/*~struct~MapNamePreset:
 * @param id
 * @desc Enter anything to use for an id (must be unique).
 *
 * @param Show Count
 * @type number
 * @desc The amount of frames to display the window for
 * @min 0
 * @default 150
 *
 * @param Fade Speed
 * @type number
 * @desc The amount of opacity to change per frame during fade
 * @min 1
 * @default 16
 *
 * @param Show Windowskin
 * @type boolean
 * @desc Whether to paint the windowskin or not
 * @default false
 *
 * @param Background Gradient Style
 * @type select
 * @option Default
 * @option Fade Left
 * @option Fade Right
 * @option None
 * @desc The style of gradient to show
 * @default Default
 *
 * @param Text Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the window
 * @default center
 *
 * @param Window Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the window
 * @default left
 *
 * @param Window Vertical Alignment
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc The vertical alignment of the window
 * @default top
 *
 * @param X
 * @type number
 * @desc The x coordinate of the window, ignored if window is center aligned, right offset if right aligned
 * @default 0
 *
 * @param Y
 * @type number
 * @desc The y coordinate of the window, ignored if window is center aligned
 * @default 0
 *
 * @param Width
 * @type number
 * @desc The width of the window
 * @min 0
 * @default 360
 *
 * @param Line Count
 * @type number
 * @desc The height of the window (in number of lines).
 * @min 0
 * @default 1
*/
var Imported = Imported || {};
Imported.CGMZ_Changelog = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Map Name Window"] = "Alpha";
CGMZ.MapNameWindow = CGMZ.MapNameWindow || {};
CGMZ.MapNameWindow.parameters = PluginManager.parameters('CGMZ_MapNameWindow');
CGMZ.MapNameWindow.DefaultShowCount = Number(CGMZ.MapNameWindow.parameters["Show Count"]);
CGMZ.MapNameWindow.DefaultFadeSpeed = Number(CGMZ.MapNameWindow.parameters["Fade Speed"]);
CGMZ.MapNameWindow.DefaultX = Number(CGMZ.MapNameWindow.parameters["X"]);
CGMZ.MapNameWindow.DefaultY = Number(CGMZ.MapNameWindow.parameters["Y"]);
CGMZ.MapNameWindow.DefaultWidth = Number(CGMZ.MapNameWindow.parameters["Width"]);
CGMZ.MapNameWindow.DefaultLineCount = Number(CGMZ.MapNameWindow.parameters["Line Count"]);
CGMZ.MapNameWindow.DefaultShowWindowskin = (CGMZ.MapNameWindow.parameters["Show Windowskin"] === "true");
CGMZ.MapNameWindow.DefaultGradientStyle = CGMZ.MapNameWindow.parameters["Background Gradient Style"];
CGMZ.MapNameWindow.DefaultTextAlignment = CGMZ.MapNameWindow.parameters["Text Alignment"];
CGMZ.MapNameWindow.DefaultWindowAlignment = CGMZ.MapNameWindow.parameters["Window Alignment"];
CGMZ.MapNameWindow.DefaultWindowVerticalAlignment = CGMZ.MapNameWindow.parameters["Window Vertical Alignment"];
CGMZ.MapNameWindow.Presets = JSON.parse(CGMZ.MapNameWindow.parameters["Presets"]);
//=============================================================================
// CGMZ_MapNameWindowOptions
//-----------------------------------------------------------------------------
// Stores map name window options
//=============================================================================
function CGMZ_MapNameWindowOptions() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Options
//-----------------------------------------------------------------------------
CGMZ_MapNameWindowOptions.prototype.initialize = function(preset = "") {
	(preset) ? this.loadCustomSettings(preset) : this.loadDefaultSettings();
};
//-----------------------------------------------------------------------------
// Set Default Options
//-----------------------------------------------------------------------------
CGMZ_MapNameWindowOptions.prototype.loadDefaultSettings = function() {
	this._showCount = CGMZ.MapNameWindow.DefaultShowCount;
	this._fadeSpeed = CGMZ.MapNameWindow.DefaultFadeSpeed;
	this._showWindowskin = CGMZ.MapNameWindow.DefaultShowWindowskin;
	this._gradientStyle = CGMZ.MapNameWindow.DefaultGradientStyle;
	this._textAlignment = CGMZ.MapNameWindow.DefaultTextAlignment;
	this._windowAlignment = CGMZ.MapNameWindow.DefaultWindowAlignment;
	this._verticalAlignment = CGMZ.MapNameWindow.DefaultWindowVerticalAlignment;
	this._x = CGMZ.MapNameWindow.DefaultX;
	this._y = CGMZ.MapNameWindow.DefaultY;
	this._width = CGMZ.MapNameWindow.DefaultWidth;
	this._lineCount = CGMZ.MapNameWindow.DefaultLineCount;
};
//-----------------------------------------------------------------------------
// Set Preset Options
//-----------------------------------------------------------------------------
CGMZ_MapNameWindowOptions.prototype.loadCustomSettings = function(preset) {
	this._showCount = Number(preset["Show Count"]);
	this._fadeSpeed = Number(preset["Fade Speed"]);
	this._showWindowskin = (preset["Show Windowskin"] === "true");
	this._gradientStyle = preset["Background Gradient Style"];
	this._textAlignment = preset["Text Alignment"];
	this._windowAlignment = preset["Window Alignment"];
	this._verticalAlignment = preset["Window Vertical Alignment"];
	this._x = Number(preset["X"]);
	this._y = Number(preset["Y"]);
	this._width = Number(preset["Width"]);
	this._lineCount = Number(preset["Line Count"]);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Store map name options. Use temp class since this info doesn't need to be
// saved.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize map name option data
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_MapNameWindow_createPluginData.call(this);
	this.initializeMapNameOptions();
};
//-----------------------------------------------------------------------------
// Initialize map name window options
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeMapNameOptions = function() {
	this._mapNameOptions = new CGMZ_MapNameWindowOptions();
	this._mapNamePresets = {};
	for(const presetJSON of CGMZ.MapNameWindow.Presets) {
		const preset = JSON.parse(presetJSON);
		this._mapNamePresets[preset.id] = new CGMZ_MapNameWindowOptions(preset);
	}
};
//-----------------------------------------------------------------------------
// Get default options
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getDefaultMapNameWindowOptions = function() {
	return this._mapNameOptions;
};
//-----------------------------------------------------------------------------
// Get preset options
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getPresetMapNameWindowOptions = function(presetId) {
	return this._mapNamePresets[presetId];
};
//=============================================================================
// Window_MapName
//-----------------------------------------------------------------------------
// Change display based on settings
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize display settings
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_WindowMapName_initialize = Window_MapName.prototype.initialize;
Window_MapName.prototype.initialize = function(rect) {
    alias_CGMZ_MapNameWindow_WindowMapName_initialize.call(this, rect);
	this.CGMZ_createSettings();
};
//-----------------------------------------------------------------------------
// Get the window height based on settings
//-----------------------------------------------------------------------------
Window_MapName.prototype.CGMZ_getWindowHeight = function() {
	return (this._settings) ? this._settings._lineCount * this.lineHeight() : this.lineHeight();
};
//-----------------------------------------------------------------------------
// Create the settings to use for the window
//-----------------------------------------------------------------------------
Window_MapName.prototype.CGMZ_createSettings = function() {
	if($dataMap && $dataMap.meta && $dataMap.meta.cgmzmapnamepreset) {
		this._settings = $cgmzTemp.getPresetMapNameWindowOptions($dataMap.meta.cgmzmapnamepreset);
	} else {
		this._settings = $cgmzTemp.getDefaultMapNameWindowOptions();
	}
};
//-----------------------------------------------------------------------------
// Alias. Open the window with new show count
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_WindowMapName_open = Window_MapName.prototype.open;
Window_MapName.prototype.open = function() {
	this.CGMZ_updatePosition();
	alias_CGMZ_MapNameWindow_WindowMapName_open.call(this);
	if(this._settings) {
		this._showCount = this._settings._showCount;
	}
};
//-----------------------------------------------------------------------------
// Update the window position if necessary
//-----------------------------------------------------------------------------
Window_MapName.prototype.CGMZ_updatePosition = function() {
	if(!this._settings) return;
	this.width = this._settings._width;
	this.height = this.fittingHeight(this._settings._lineCount);
	switch(this._settings._windowAlignment) {
		case "left": this.x = this._settings._x; break;
		case "center": this.x = (Graphics.boxWidth / 2) - (this.width / 2); break;
		case "right": this.x = Graphics.boxWidth - this.width - (this._settings._x * ConfigManager.touchUI);
	}
	switch(this._settings._verticalAlignment) {
		case "top": this.y = this._settings._y; break;
		case "middle": this.y = (Graphics.boxHeight / 2) - (this.height / 2); break;
		case "bottom": this.y = Graphics.boxHeight - this.height - this._settings._y;
	}
	this.createContents();
};
//-----------------------------------------------------------------------------
// Alias. Fade in with custom fade speed, fall back to default function if no settings
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_WindowMapName_updateFadeIn = Window_MapName.prototype.updateFadeIn;
Window_MapName.prototype.updateFadeIn = function() {
    if(this._settings) {
		this.contentsOpacity += this._settings._fadeSpeed;
		this.opacity += this._settings._fadeSpeed * this._settings._showWindowskin;
	} else {
		alias_CGMZ_MapNameWindow_WindowMapName_updateFadeIn.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Fade out with custom fade speed, fall back to default function if no settings
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_WindowMapName_updateFadeOut = Window_MapName.prototype.updateFadeOut;
Window_MapName.prototype.updateFadeOut = function() {
    if(this._settings) {
		this.contentsOpacity -= this._settings._fadeSpeed;
		this.opacity -= this._settings._fadeSpeed * this._settings._showWindowskin;
	} else {
		alias_CGMZ_MapNameWindow_WindowMapName_updateFadeOut.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Change background fade style (if desired)
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_WindowMapName_drawBackground = Window_MapName.prototype.drawBackground;
Window_MapName.prototype.drawBackground = function(x, y, width, height) {
    if(!this._settings) {
		alias_CGMZ_MapNameWindow_WindowMapName_drawBackground.call(this, x, y, width, height);
		return;
	}
	height = this.CGMZ_getWindowHeight();
	const color1 = ColorManager.dimColor1();
    const color2 = ColorManager.dimColor2();
	switch(this._settings._gradientStyle) {
		case "Default": alias_CGMZ_MapNameWindow_WindowMapName_drawBackground.call(this, x, y, width, height); break;
		case "None": break;
		case "Fade Left": this.contents.gradientFillRect(x, y, width, height, color1, color2); break;
		case "Fade Right": this.contents.gradientFillRect(x, y, width, height, color2, color1); break;
		default: alias_CGMZ_MapNameWindow_WindowMapName_drawBackground.call(this, x, y, width, height);
	}
};
//-----------------------------------------------------------------------------
// Alias. Do original function only if no settings
//-----------------------------------------------------------------------------
const alias_CGMZ_MapNameWindow_WindowMapName_refresh = Window_MapName.prototype.refresh;
Window_MapName.prototype.refresh = function() {
	if(!this._settings) {
		alias_CGMZ_MapNameWindow_WindowMapName_refresh.call(this);
		return;
	}
    this.contents.clear();
    if ($gameMap.displayName()) {
        const width = this.innerWidth;
        this.drawBackground(0, 0, width, this.lineHeight());
        this.CGMZ_drawText($gameMap.displayName(), 0, 0, 0, width, this._settings._textAlignment);
    }
};