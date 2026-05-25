/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/gameendwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ExitToDesktop
 * @plugindesc Manage the game end command window
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Beta
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: Use this plugin to easily manage the command window in the
 * game end scene. It allows you to re-arrange commands or use JavaScript to 
 * add custom commands which are capable of calling custom plugin scenes or
 * functions.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin will overwrite the default game end window if keep originals is
 * off. It is best to place this below any other plugins that add commands to
 * the game end window if this option is used.
 *
 * The command symbol should be unique and not blank for every command. This
 * symbol is how the plugin knows internally which JS code to run.
 *
 * Some Command Symbols can have special meanings, mainly when they represent
 * the original commands.
 * The following symbols represent the original commands (case sensitive):
 * toTitle - Will handle like the original to title command
 * cancel - Will handle like the original cancel command
 * 
 * It is important that you do not use these strings as the Command Symbol
 * property unless you mean to refer to the original commands.
 *
 * To Title command:
 * {"Command Name":"To Title","Command Symbol":"toTitle","JS Command":"\"\""}
 *
 * Cancel command:
 * {"Command Name":"Cancel","Command Symbol":"cancel","JS Command":"\"\""}
 *
 * Exit to Desktop (if using CGMZ Exit To Desktop):
 * {"Command Name":"Exit To Desktop","Command Symbol":"CGMZ_exitToDesktop","JS Command":"\"if(Utils.isNwjs() || !CGMZ.ExitToDesktop.HideInBrowser) {\\nSceneManager.exit();\\n}\""}
 *
 * @param Visible Commands
 * @type number
 * @min 0
 * @default 3
 * @desc This is the number of commands that will be visible in the window without scrolling
 *
 * @param Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc The alignment of the command text in the window
 *
 * @param Keep Original Commands
 * @type boolean
 * @default true
 * @desc Determine whether to show the original commands in their original order.
 *
 * @param Commands
 * @type struct<Handler>[]
 * @desc Command Name and associated js commands
 * @default []
*/
/*~struct~Handler:
 * @param Command Name
 * @type text
 * @desc Name of the command to display in the command window.
 *
 * @param Command Symbol
 * @type text
 * @desc This symbol is used internally to recognize the command.
 * Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @type note
 * @desc JavaScript to run when command is selected.
 * @default ""
*/
var Imported = Imported || {};
Imported.CGMZ_GameEndWindow = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Game End Window"] = "Beta";
CGMZ.GameEnd_CommandWindow = CGMZ.GameEnd_CommandWindow || {};
CGMZ.GameEnd_CommandWindow.parameters = PluginManager.parameters('CGMZ_GameEndWindow');
CGMZ.GameEnd_CommandWindow.CommandsText = CGMZ.GameEnd_CommandWindow.parameters["Commands"] || "[]";
CGMZ.GameEnd_CommandWindow.Alignment = CGMZ.GameEnd_CommandWindow.parameters["Alignment"] || "center";
CGMZ.GameEnd_CommandWindow.VisibleCommands = Number(CGMZ.GameEnd_CommandWindow.parameters["Visible Commands"]);
CGMZ.GameEnd_CommandWindow.KeepOriginals = (CGMZ.GameEnd_CommandWindow.parameters["Keep Original Commands"] === "true") ? true : false;
CGMZ.GameEnd_CommandWindow.CommandsArray = JSON.parse(CGMZ.GameEnd_CommandWindow.CommandsText);
CGMZ.GameEnd_CommandWindow.Commands = [];
for(let i = 0; i < CGMZ.GameEnd_CommandWindow.CommandsArray.length; i++) {
	CGMZ.GameEnd_CommandWindow.Commands.push(JSON.parse(CGMZ.GameEnd_CommandWindow.CommandsArray[i]));
}
//=============================================================================
// Scene Game End
//-----------------------------------------------------------------------------
// Handling for command window entries
//=============================================================================
//-----------------------------------------------------------------------------
// Handling for custom Commands added through the plugin
//-----------------------------------------------------------------------------
Scene_GameEnd.prototype.CGMZ_GameEndWindow_commandCustom = function() {
	for(let i = 0; i < CGMZ.GameEnd_CommandWindow.Commands.length; i++) {
		if(this._commandWindow.currentSymbol() === CGMZ.GameEnd_CommandWindow.Commands[i]["Command Symbol"]) {
			try {
				eval(JSON.parse(CGMZ.GameEnd_CommandWindow.Commands[i]["JS Command"]));
			}
			catch (e) {
				const origin = "CGMZ Game End Window";
				const suggestion = "Check your JavaScript command";
				$cgmzTemp.reportError(e.message, origin, suggestion);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Add additional commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_GameEndWindow_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
Scene_GameEnd.prototype.createCommandWindow = function() {
	alias_CGMZ_GameEndWindow_createCommandWindow.call(this);
	for(let i = 0; i < CGMZ.GameEnd_CommandWindow.Commands.length; i++) {
		if(this.CGMZ_GameEndWindow_isCustomCommand(CGMZ.GameEnd_CommandWindow.Commands[i]["Command Symbol"])) {
			this._commandWindow.setHandler(CGMZ.GameEnd_CommandWindow.Commands[i]["Command Symbol"], this.CGMZ_GameEndWindow_commandCustom.bind(this));
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if command is a custom command in need of custom handler
//-----------------------------------------------------------------------------
Scene_GameEnd.prototype.CGMZ_GameEndWindow_isCustomCommand = function(symbol) {
	return (symbol !== 'cancel' && symbol !== 'toTitle');
};
//-----------------------------------------------------------------------------
// Alias. Change the rectangle height based on number of visible commands
//-----------------------------------------------------------------------------
const alias_CGMZ_GameEndWindow_commandWindowRect = Scene_GameEnd.prototype.commandWindowRect;
Scene_GameEnd.prototype.commandWindowRect = function() {
    let rect = alias_CGMZ_GameEndWindow_commandWindowRect.call(this);
	rect.height = this.calcWindowHeight(CGMZ.GameEnd_CommandWindow.VisibleCommands, true);
	return rect;
};
//=============================================================================
// Window Game End
//-----------------------------------------------------------------------------
// Change commands in the command window
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Add original commands in original order if user wishes
//-----------------------------------------------------------------------------
const alias_CGMZ_GameEndWindow_makeCommandList = Window_GameEnd.prototype.makeCommandList;
Window_GameEnd.prototype.makeCommandList = function() {
	if(CGMZ.GameEnd_CommandWindow.KeepOriginals) {
		alias_CGMZ_GameEndWindow_makeCommandList.call(this);
	}
	for(let i = 0; i < CGMZ.GameEnd_CommandWindow.Commands.length; i++) {
		let cmd = CGMZ.GameEnd_CommandWindow.Commands[i];
		this.addCommand(cmd["Command Name"], cmd["Command Symbol"], this.CGMZ_GameEndWindow_isCommandEnabled(cmd));
	}
};
//-----------------------------------------------------------------------------
// Check if command should be enabled
//-----------------------------------------------------------------------------
Window_GameEnd.prototype.CGMZ_GameEndWindow_isCommandEnabled = function(command) {
	return true;
};
//-----------------------------------------------------------------------------
// Change alignment of command text
//-----------------------------------------------------------------------------
Window_GameEnd.prototype.itemTextAlign = function() {
    return CGMZ.GameEnd_CommandWindow.Alignment;
};