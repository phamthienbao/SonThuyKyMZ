/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/plugincommands/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds plugin commands meant to complement event commands
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: Adds some plugin commands that are meant to make some things
 * with the default editor easier, such as turning a switch on/off if an event
 * is within certain xy coordinates or controlling self switches for any event
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following plugin commands:
 * Control Switch Random: This command will set the provided switch to either
 * 						  ON or OFF randomly.
 *
 * @command controlSwitchRandom
 * @text Control Switch: Random
 * @desc Sets the provided switch ID ON/OFF randomly
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be randomly set ON/OFF
 * @default 1
 *
 * @command controlSwitchRegion
 * @text Control Switch: Region ID
 * @desc Sets the provided switch ID ON/OFF based on if the event is in the region
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF
 * @default 1
 *
 * @arg regionId
 * @type number
 * @text Region ID
 * @desc The regionId to check for
 * @default 1
 * @min 0
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The event to check for. Special values: -1 = player, 0 = this event.
 * @default -1
 * @min -1
 *
 * @command controlSwitchTerrain
 * @text Control Switch: Terrain Tag
 * @desc Sets the provided switch ID ON/OFF based on if the event is in the terrain tag
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF
 * @default 1
 *
 * @arg tagId
 * @type number
 * @text Terrain Tag ID
 * @desc The terrain tag to check for
 * @default 1
 * @min 0
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The event to check for. Special values: -1 = player, 0 = this event.
 * @default -1
 * @min -1
 *
 * @command controlSwitchXy
 * @text Control Switch: Coordinates
 * @desc Sets the provided switch ID ON/OFF based on if the event is at x, y coordinates
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF
 * @default 1
 *
 * @arg x
 * @type number
 * @text X Coordinate
 * @desc The x coordinate to check for
 * @default 0
 * @min 0
 *
 * @arg y
 * @type number
 * @text Y Coordinate
 * @desc The y coordinate to check for
 * @default 0
 * @min 0
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The event to check for. Special values: -1 = player, 0 = this event.
 * @default -1
 * @min -1
 *
 * @command controlSwitchMenu
 * @text Control Switch: Menu Access
 * @desc Sets the provided switch ID ON/OFF based on if the player has access to the menu
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF based on if the player has access to the menu
 * @default 1
 *
 * @command controlSwitchSave
 * @text Control Switch: Save Access
 * @desc Sets the provided switch ID ON/OFF based on if the player has access to saving
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF based on if the player has access to saving
 * @default 1
 *
 * @command controlSwitchFormation
 * @text Control Switch: Formation Access
 * @desc Sets the provided switch ID ON/OFF based on if the player can change formation
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF based on if the player can change formation
 * @default 1
 *
 * @command controlSwitchEncounters
 * @text Control Switch: Encounters
 * @desc Sets the provided switch ID ON/OFF based on if encounters are enabled/disabled
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF based on if encounters are enabled/disabled
 * @default 1
 *
 * @command controlSwitchSelfSwitch
 * @text Control Switch: Self Switch
 * @desc Sets the provided switch ON/OFF based on the provided Self Switch value
 *
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc The switch ID to be set ON/OFF based on the provided self switch
 * @default 1
 *
 * @arg switchName
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text Self Switch
 * @desc The self switch to be set ON/OFF
 * @default A
 *
 * @arg mapId
 * @type number
 * @text Map ID
 * @desc The map ID of the event
 * @default 1
 * @min 1
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The event with the self switch
 * @default 1
 * @min 1
 *
 * @command controlSelfSwitch
 * @text Control Self Switch
 * @desc Sets the provided self switch ON/OFF
 *
 * @arg switchName
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @text Self Switch
 * @desc The self switch to be set ON/OFF
 * @default A
 *
 * @arg value
 * @type boolean
 * @text Value
 * @desc Whether to set the self switch ON or OFF
 * @default true
 *
 * @arg mapId
 * @type number
 * @text Map ID
 * @desc The map ID of the event
 * @default 1
 * @min 1
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The event to check for.
 * @default 1
 * @min 1
 *
 * @command controlTimerAdd
 * @text Control Timer: Add Seconds
 * @desc Add seconds to the timer
 *
 * @arg seconds
 * @type number
 * @text Seconds
 * @desc Amount of seconds to add to the timer
 * @default 1
 * @min 0
 *
 * @command controlTimerSubtract
 * @text Control Timer: Subtract Seconds
 * @desc Subtract seconds from the timer
 *
 * @arg seconds
 * @type number
 * @text Seconds
 * @desc Amount of seconds to subtract from the timer
 * @default 1
 * @min 0
 *
 * @command callScene
 * @text Call Scene
 * @desc Go to a specific game scene
 *
 * @arg scene
 * @type text
 * @text Scene
 * @desc The scene to call
 * @default Scene_Item
 *
 * @command autosave
 * @text Autosave
 * @desc Requests an autosave (may still fail)
 *
 * @arg autosave
 * @type boolean
 * @text Autosave
 * @desc Tries to autosave if true. No functionality if false
 * @default true
*/
var Imported = Imported || {};
Imported.CGMZ_PluginCommands = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Plugin Commands"] = "1.0.0";
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Registration and processing for new plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_PluginCommands_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_PluginCommands_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchRandom", this.pluginCommandPluginCommandsControlSwitchRandom);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchRegion", this.pluginCommandPluginCommandsControlSwitchRegion);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchTerrain", this.pluginCommandPluginCommandsControlSwitchTerrain);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchXy", this.pluginCommandPluginCommandsControlSwitchXy);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchMenu", this.pluginCommandPluginCommandsControlSwitchMenu);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchSave", this.pluginCommandPluginCommandsControlSwitchSave);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchFormation", this.pluginCommandPluginCommandsControlSwitchFormation);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchEncounters", this.pluginCommandPluginCommandsControlSwitchEncounters);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSwitchSelfSwitch", this.pluginCommandPluginCommandsControlSwitchSelfSwitch);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlSelfSwitch", this.pluginCommandPluginCommandsControlSelfSwitch);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlTimerAdd", this.pluginCommandPluginCommandsControlTimerAdd);
	PluginManager.registerCommand("CGMZ_PluginCommands", "controlTimerSubtract", this.pluginCommandPluginCommandsControlTimerSubtract);
	PluginManager.registerCommand("CGMZ_PluginCommands", "callScene", this.pluginCommandPluginCommandsCallScene);
	PluginManager.registerCommand("CGMZ_PluginCommands", "autosave", this.pluginCommandPluginCommandsAutosave);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF at random
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchRandom = function(args) {
	const switchId = Number(args.switchId);
	const value = (Math.randomInt(2) === 1);
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF by menu access
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchMenu = function(args) {
	const switchId = Number(args.switchId);
	const value = $gameSystem.isMenuEnabled();
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF by save access
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchSave = function(args) {
	const switchId = Number(args.switchId);
	const value = $gameSystem.isSaveEnabled();
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF by formation access
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchFormation = function(args) {
	const switchId = Number(args.switchId);
	const value = $gameSystem.isFormationEnabled();
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF by encounters active
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchEncounters = function(args) {
	const switchId = Number(args.switchId);
	const value = $gameSystem.isEncounterEnabled();
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Add seconds to the timer
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlTimerAdd = function(args) {
	const seconds = Number(args.seconds) * 60;
	const currentSeconds = ($gameTimer.seconds() + 1) * 60;
	$gameTimer.start(seconds + currentSeconds);
};
//-----------------------------------------------------------------------------
// Subtract seconds from the timer
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlTimerSubtract = function(args) {
	const seconds = Number(args.seconds) * 60;
	const currentSeconds = ($gameTimer.seconds() + 1) * 60;
	let setSeconds = currentSeconds - seconds;
	if(setSeconds >= 0) {
		$gameTimer.start(currentSeconds - seconds);
	} else {
		$gameTimer.start(1);
	}
};
//-----------------------------------------------------------------------------
// Call provided scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsCallScene = function(args) {
	try {
		eval("SceneManager.push(" + args.scene + ");");
	} catch(e) {
		console.warn("Caught error in Call Scene plugin command: " + e.name + ": " + e.message);
	}
};
//-----------------------------------------------------------------------------
// Request an autosave
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsAutosave = function(args) {
	try {
		if(args.autosave === "true") {
			SceneManager._scene.requestAutosave();
		}
	} catch(e) {
		console.warn("Autosave failed: " + e.name + ": " + e.message);
	}
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF based on the event ID's
// region ID
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchRegion = function(args) {
	const switchId = Number(args.switchId);
	const regionId = Number(args.regionId);
	const eventId = Number(args.eventId);
    const character = this.character(eventId);
	const characterRegion = $gameMap.regionId(character.x, character.y);
	const value = characterRegion === regionId;
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF based on the event ID's
// terrain tag ID
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchTerrain = function(args) {
	const switchId = Number(args.switchId);
	const tagId = Number(args.tagId);
	const eventId = Number(args.eventId);
    const character = this.character(eventId);
	const characterTag = $gameMap.terrainTag(character.x, character.y);
	const value = characterTag === tagId;
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the provided switch to either be ON or OFF based on the event ID's
// x, y coordinates
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchXy = function(args) {
	const switchId = Number(args.switchId);
	const x = Number(args.x);
	const y = Number(args.y);
	const eventId = Number(args.eventId);
    const character = this.character(eventId);
	const value = (character.x === x && character.y === y);
	$gameSwitches.setValue(switchId, value);
};
//-----------------------------------------------------------------------------
// Sets the given event's self switch to ON or OFF
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSelfSwitch = function(args) {
	const switchName = args.switchName;
	const eventId = Number(args.eventId);
    const mapId = Number(args.mapId);
	const key = [mapId, eventId, switchName];
	const value = (args.value === "true");
	$gameSelfSwitches.setValue(key, value);
};
//-----------------------------------------------------------------------------
// Sets the given event's self switch to ON or OFF
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPluginCommandsControlSwitchSelfSwitch = function(args) {
	const switchId = Number(args.switchId);
	const switchName = args.switchName;
	const eventId = Number(args.eventId);
    const mapId = Number(args.mapId);
	const key = [mapId, eventId, switchName];
	const value = $gameSelfSwitches.value(key);
	$gameSwitches.setValue(switchId, value);
};