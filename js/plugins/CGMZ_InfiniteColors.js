/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/infinitecolors/
 * @target MZ
 * @plugindesc Define your own colors for use in messages
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to define your own colors for use in
 * messages or anywhere else they are supported. It uses the same color escape
 * code \c[x] where x is the id of the color you want to access.
 * ----------------------------------------------------------------------------
 * Documentation:
 * The name attribute has no function in the plugin. It is simply there to
 * help you remember what the color is.
 *
 * Colors support hex format. You can google any hex color picker and it will
 * be the code shown with a # before it. For example, #ffffff is white.
 *
 * Colors support rgb format. Most color pickers provide red, blue, green
 * values which you will put in the form rgb(x, y, z) where x, y, and z are
 * the amounts of red, blue, and green the color has.
 *
 * The color ID provided is what number you type in the \c[x] code to switch
 * color. It begins at 32 since there are 31 colors available by default.
 * This plugin preserves the original 31 colors.
 *
 * Update History:
 * Version 1.0 - Initial Release
 *
 * @param Color Options
 *
 * @param Colors
 * @parent Color Options
 * @type struct<Color>[]
 * @desc Set up additional colors here
 * @default []
*/
/*~struct~Color:
 * @param Name
 * @type text
 * @default 
 * @desc Give a name to your color to more easily remember it.
 *
 * @param Color Value
 * @type text
 * @default #ffffff
 * @desc The color value of the color you want. Supports Hex and rgb. Hex format: #ffffff, RGB format: rgb(255, 255, 255)
 *
 * @param ID
 * @type number
 * @min 32
 * @default 32
 * @desc the ID of the color. This will be what you type for x when typing \c[x] into a message
 */
var Imported = Imported || {};
Imported.CGMZ_InfiniteColors = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Infinite Colors"] = "1.0.0";
CGMZ.InfiniteColors = CGMZ.InfiniteColors || {};
CGMZ.InfiniteColors.parameters = PluginManager.parameters('CGMZ_InfiniteColors');
CGMZ.InfiniteColors.Colors = JSON.parse(CGMZ.InfiniteColors.parameters["Colors"]);
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Manage Color Data. Use temp class since this info doesn't need to be saved.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize color data
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteColors_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_InfiniteColors_createPluginData.call(this);
	this.initializeInfiniteColorsData();
};
//-----------------------------------------------------------------------------
// Initialize color data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeInfiniteColorsData = function() {
	this._infiniteColors = {};
	for(let i = 0; i < CGMZ.InfiniteColors.Colors.length; i++) {
		let colorParse = JSON.parse(CGMZ.InfiniteColors.Colors[i])
		let colorValue = colorParse["Color Value"];
		this._infiniteColors[Number(colorParse.ID)] = colorValue;
	}
};
//-----------------------------------------------------------------------------
// Get Infinite Color
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getInfiniteColor = function(id) {
	return this._infiniteColors[id];
};
//=============================================================================
// Color Manager
//-----------------------------------------------------------------------------
// Load additional text colors
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Return CGMZ color data if n > 31
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteColors_textColor = ColorManager.textColor;
ColorManager.textColor = function(n) {
	if(n > 31) {
		return $cgmzTemp.getInfiniteColor(n);
	}
	return alias_CGMZ_InfiniteColors_textColor.call(this, n);
};