/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/globaldata/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to have data which is available across all savefiles
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
 * Description: This plugin allows you to have global data that will be
 * available across all save files.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Keys are case sensitive.
 *
 * You can only store one piece of data per key. For example, you cannot store
 * both a number and a piece of text under the same key. The last piece of
 * data assigned to that key will overwrite whatever was stored previously.
 *
 * @command addDataString
 * @text Add Text Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg string
 * @text Text
 * @desc The text to store under this key
 *
 * @command addDataNumber
 * @text Add Number Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg number
 * @text Number
 * @type Number
 * @default 0
 * @desc The number to store under this key
 *
 * @command addDataVariable
 * @text Add Variable Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg id
 * @text Variable
 * @type variable
 * @default 0
 * @desc The variable to store under this key
 *
 * @command addDataSwitch
 * @text Add Switch Data
 * @desc Stores a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string required to access the data later
 *
 * @arg id
 * @text Switch
 * @type switch
 * @default 0
 * @desc The switch to store under this key
 *
 * @command getData
 * @text Get Data
 * @desc Retrieves a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @desc The variable to store the data in
 *
 * @command Get Switch Data
 * @desc Retrieves a piece of data and stores it in a switch
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
 *
 * @arg switchId
 * @text Switch
 * @type switch
 * @desc The switch to store the data in
 *
 * @command clearData
 * @text Clear Data
 * @desc Removes a piece of data
 *
 * @arg key
 * @text Key
 * @desc The string set when stored to access the data
*/
var Imported = Imported || {};
Imported.CGMZ_Core = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Global Data"] = "Beta";
CGMZ.GlobalData = CGMZ.GlobalData || {};
CGMZ.GlobalData.parameters = PluginManager.parameters('CGMZ_GlobalData');
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin commands for global data
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_GlobalData_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_GlobalData", "addDataString", this.pluginCommandGlobalDataAddDataString);
	PluginManager.registerCommand("CGMZ_GlobalData", "addDataNumber", this.pluginCommandGlobalDataAddDataNumber);
	PluginManager.registerCommand("CGMZ_GlobalData", "addDataVariable", this.pluginCommandGlobalDataAddDataVariable);
	PluginManager.registerCommand("CGMZ_GlobalData", "addDataSwitch", this.pluginCommandGlobalDataAddDataSwitch);
	PluginManager.registerCommand("CGMZ_GlobalData", "getData", this.pluginCommandGlobalDataGetData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Get Switch Data", this.pluginCommandGlobalDataGetSwitchData);
	PluginManager.registerCommand("CGMZ_GlobalData", "clearData", this.pluginCommandGlobalDataClearData);
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataString = function(args) {
	$cgmzGlobal.addData(args.key, args.string);
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataNumber = function(args) {
	$cgmzGlobal.addData(args.key, Number(args.number));
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataVariable = function(args) {
	$cgmzGlobal.addData(args.key, $gameVariables.value(Number(args.id)));
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataSwitch = function(args) {
	$cgmzGlobal.addData(args.key, $gameSwitches.value(Number(args.id)));
};
//-----------------------------------------------------------------------------
// Plugin command for retrieving data into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataGetData = function(args) {
	$gameVariables.setValue(Number(args.variable), $cgmzGlobal.getData(args.key));
};
//-----------------------------------------------------------------------------
// Plugin command for retrieving data into a switch
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataGetSwitchData = function(args) {
	$gameSwitches.setValue(Number(args.switchId), $cgmzGlobal.getData(args.key));
};
//-----------------------------------------------------------------------------
// Plugin command for clearing a single piece of data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataClearData = function(args) {
	$cgmzGlobal.clearData(args.key);
};
//=============================================================================
// CGMZ_GlobalData
//-----------------------------------------------------------------------------
// This class stores data that is available to all save files
//=============================================================================
function CGMZ_GlobalData() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.initialize = function() {
	this._data = {};
};
//-----------------------------------------------------------------------------
// Add Data, does not check if data exists
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.addData = function(key, contents) {
	this._data[key] = contents;
};
//-----------------------------------------------------------------------------
// Get Data, returns 0 if data does not exist
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.getData = function(key) {
	if(this._data) {
		return this._data[key];
	}
};
//-----------------------------------------------------------------------------
// Get Data, returns undefined if data does not exist
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.clearData = function(key) {
	if(this._data) {
		delete this._data[key];
	}
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMZ global data.
// modified functions: createGameObjects, makeSaveContents, extractSaveContents
// 					   setupNewGame
//=============================================================================
$cgmzGlobal = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmz variable
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    alias_CGMZ_GlobalData_createGameObjects.call(this);
	if(!$cgmzGlobal) {
		$cgmzGlobal = new CGMZ_GlobalData();
	}
};
//-----------------------------------------------------------------------------
// Save cgmz global info
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_saveGlobalInfo = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function() {
	alias_CGMZ_GlobalData_saveGlobalInfo.call(this);
	contents = this.CGMZ_GlobalData_createGlobalSaveContents();
    StorageManager.saveObject("cgmz", contents);
};
//-----------------------------------------------------------------------------
// Make global save file info
//-----------------------------------------------------------------------------
DataManager.CGMZ_GlobalData_createGlobalSaveContents = function() {
	contents = {};
	contents.cgmz = $cgmzGlobal;
    return contents;
};
//-----------------------------------------------------------------------------
// Load global CGMZ data
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_loadGlobalInfo = DataManager.loadGlobalInfo;
DataManager.loadGlobalInfo = function() {
	alias_CGMZ_GlobalData_loadGlobalInfo.call(this);
    StorageManager.loadObject("cgmz").then(cgmzInfo => {
			this.CGMZ_GlobalData_loadCGMZGlobalData(cgmzInfo);
            return 0;
        })
        .catch(() => {
            console.warn("Could not load CGMZ global data!");
        });
};
//-----------------------------------------------------------------------------
// Load global CGMZ data
//-----------------------------------------------------------------------------
DataManager.CGMZ_GlobalData_loadCGMZGlobalData = function(contents) {
	$cgmzGlobal = contents.cgmz;
};