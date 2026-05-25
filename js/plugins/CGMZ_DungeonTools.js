/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/dungeontools/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds dungeon tools (arrow, bomb, hookshot, etc) to your game
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
 * Made for RPG Maker MZ 1.3.2
 * ----------------------------------------------------------------------------
 * Description: This plugin adds some common RPG dungeon tools such as the
 * bomb, arrow, hookshot, and more. Each tool is configurable and can be
 * unlocked separately. Tools will interact with events they touch by turning
 * self switches ON/OFF.
 * ----------------------------------------------------------------------------
 * Documentation:
 * --------------------------------Tools---------------------------------------
 * General: You can have multiple different tools of the same type if desired.
 * This might make it so you can have fire arrows which interact with ice
 * events but not fire events, and ice arrows that interact with fire events
 * but not ice events.
 *
 * Reset tool: This tool will "reset" the current map the player is in. It
 * accomplishes this by 1) saving the coordinates the player entered the map
 * and teleporting them to those coordinates when the tool is used, and 2)
 * manipulating the self-switches of events set up to interact with the tool.
 *
 * Arrow tool: This tool will shoot an arrow in the direction the player is
 * currently facing which will travel for the configurable range number of
 * tiles, or until it collides with either an impassable part of the map or
 * an event. If it collides with an event, it will check and see if that event
 * is interactable with the arrow, and if so, it will manipulate the
 * self-switches of that event. It can move through otherwise impassable map
 * tiles if they are painted with the passable region ID.
 *
 * Bomb tool: This tool will set a bomb down at the player's current location
 * which will explode after a certain amount of steps taken by the player.
 * Events nearby that are hit by the explosion will be checked to determine if
 * any of their self-switches should be manipulated.
 *
 * Boomerang tool: This tool will shoot a boomerang in the direction the player
 * is currently facing which will travel for the configurable range number of
 * tiles, or until it collides with either an impassable part of the map or
 * an event where it will then return to the player. It can move through
 * otherwise impassable map tiles if they are painted with the passable region
 * ID. When passing over an event, it will check if the event can be
 * "picked up" by the boomerang as well as if the event should have its
 * self-switches manipulated by the boomerang. The boomerang can pick up an
 * unlimited number of events. Since the boomerang returns to the player, the
 * player cannot move while this tool is active.
 *
 * Hookshot tool: Coming soon.
 * -----------------------------Tagging Events---------------------------------
 * Events are tagged with a comment event command somewhere on the event page.
 * Only the active event page will be considered.
 * 
 * To tag an event for self-switch manipulation by a tool, use the following:
 * CGMZDT [symbol]
 * 
 * For example, if you wanted something to interact with your bomb tool, and
 * you set the bomb tool to have the symbol "mybomb", you would comment:
 * CGMZDT mybomb
 *
 * The boomerang tool has a special comment for "pickup" in the format of:
 * CGMZDT PICKUP [item|weapon|armor|gold] [amount] [id]
 * 
 * For example, if you wanted the pickup to be a 2x weapons of ID 5, you'd do:
 * CGMZDT PICKUP weapon 2 5
 *
 * Gold pickups omit the id, so if you wanted the pickup to be 500G, you'd do:
 * CGMZDT PICKUP gold 500
 *
 * Comments are CASE-SENSITIVE. Example of incorrect comment:
 * CGMZdt pickup GOLD 500
 * ----------------------------Resource Specs----------------------------------
 * The images used for the tool sprites will be 4x pixels high (if using tools
 * which are 48 pixels tall, make the height 48x4 = 192px). Each row will be
 * one direction, which follows the same pattern as normal character sprites.
 *
 * You can specify the frame-width of each column. If you want 10 frames of
 * animation at 48px wide each, you would make 48x10 = 480px wide. Tools can
 * use an unlimited* amount of frames. The frame width can be unique per tool.
 * * unlimited in this case means the plugin does not add any limit. There are
 * WebGL limitations to how large a single PIXI Sprite can be, which is usually
 * 16384px on computer but could be as small as 4096px on some mobile devices.
 * 
 * The bomb tool uses 1 row of graphics since the bomb tool does not have a
 * direction, so if you wanted your bomb tool to be 48px tall, you'd make the
 * sprite sheet height 48px.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following plugin commands:
 * - Call Scene: This forcibly calls the select tool scene
 * - Discover Tool: This discovers the tool for use on the select tool scene
 * - Change Tool Access: This enables/disables tools from being used
 * ----------------------------Version History---------------------------------
 * Version 1.0.0 - Initial Release
 *
 * @command Call Scene
 * @desc Calls the dungeon tool select scene
 *
 * @command Discover Tool
 * @desc Discovers a tool for selection later
 *
 * @arg Symbol
 * @desc The symbol of the tool to discover. Case sensitive.
 *
 * @command Change Tool Access
 * @desc Change whether the player can use tools
 *
 * @arg Access
 * @type boolean
 * @default true
 * @desc Turn access to tools ON/OFF.
 *
 * @param Dungeon Tools
 *
 * @param Reset Tools
 * @parent Dungeon Tools
 * @type struct<ResetTool>[]
 * @default []
 * @desc Set up reset tools here
 *
 * @param Arrow Tools
 * @parent Dungeon Tools
 * @type struct<ArrowTool>[]
 * @default []
 * @desc Set up arrow tools here
 *
 * @param Bomb Tools
 * @parent Dungeon Tools
 * @type struct<BombTool>[]
 * @default []
 * @desc Set up bomb tools here
 *
 * @param Boomerang Tools
 * @parent Dungeon Tools
 * @type struct<BoomerangTool>[]
 * @default []
 * @desc Set up boomerang tools here
 *
 * @param Hookshot Tools
 * @parent Dungeon Tools
 * @type struct<HookshotTool>[]
 * @default []
 * @desc Set up hookshot tools here
 *
 * @param Tool Select Key
 * @desc Key that when pressed will open the dungeon tool select scene (if on map)
 * @default d
 *
 * @param Tool Key
 * @desc Key that when pressed will attempt to use the dungeon tool (case sensitive - capital means shift+key)
 * @default q
 *
 * @param Scene Background Image
 * @type file
 * @dir img
 * @desc The image to show as the scene background while the player is selecting dungeon tools
 *
 * @param Transparent Windows
 * @type boolean
 * @desc Whether the dungeon tool windows are transparent or not
 * @default false
 *
 * @param Equipped Text
 * @desc Text to show at the top of the currently equipped tool window
 * @default \c[1]Equipped:\c[0]
 *
 * @param Show Boomerang Message
 * @type boolean
 * @desc Whether to show a message when the boomerang returns with items
 * @default true
 *
 * @param Boomerang Message Pretext
 * @desc Text to show before each item name / amount
 * @default You received \c[3]
 *
 * @param Boomerang Message Posttext
 * @desc Text to show after each item name / amount
 * @default \c[0]!
*/
/*~struct~CommonToolProperties:
 * @param Name
 * @desc Name of the tool which will be displayed in the tool select menu.
 *
 * @param Symbol
 * @desc This symbol is used internally to recognize the tool. Must be UNIQUE (case sensitive)
 *
 * @param Icon
 * @type number
 * @min -1
 * @default -1
 * @desc Icon Index of the icon to use for the tool
 *
 * @param Sound Effect Options
 *
 * @param Use SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when using the tool
*/
/*~struct~ResetTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"-1","Sound Effect Options":"","Use SE":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default ["A", "B", "C", "D"]
 * @desc The self switches of events to turn OFF when used.
*/
/*~struct~ArrowTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"-1","Sound Effect Options":"","Use SE":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON when coming in contact with an event
 * 
 * @param Range
 * @type number
 * @default 6
 * @desc The amount of tiles the arrow goes before disappearing
 * 
 * @param Speed
 * @type number
 * @default 6
 * @desc The speed at which the arrow flies
 * 
 * @param Passable Region
 * @type number
 * @default 1
 * @desc The region ID through which an arrow can always move into from an adjacent tile
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the arrow
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the arrow image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frame
*/
/*~struct~BombTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"-1","Sound Effect Options":"","Use SE":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON after nearby explosion
 * 
 * @param Steps
 * @type number
 * @default 6
 * @desc The number of steps the player must take before the bomb explodes. Set to 0 to not use.
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the bomb
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the bomb image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frame
 *
 * @param Explosion Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the bomb explosion
 *
 * @param Explosion Frame Width
 * @parent Image Settings
 * @type number
 * @default 144
 * @min 1
 * @desc The width of one frame of the bomb explosion image
 *
 * @param Explosion Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frames
 *
 * @param Sound Effect Options
 *
 * @param Explode SE
 * @parent Sound Effect Options
 * @type struct<SE>
 * @desc Sound Effect to play when the bomb explodes
*/
/*~struct~BoomerangTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"-1","Sound Effect Options":"","Use SE":""}
 * @description Set up common tool properties here.
 * 
 * @param Switches
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * @desc The self switches of events to turn ON when coming in contact with an event
 * 
 * @param Range
 * @type number
 * @default 6
 * @desc The amount of tiles the tool goes before returning to the user
 * 
 * @param Speed
 * @type number
 * @default 5
 * @desc The speed at which the boomerang flies
 * 
 * @param Passable Region
 * @type number
 * @default 1
 * @desc The region ID through which the tool can always move into from an adjacent tile
 * 
 * @param Image Settings
 *
 * @param Image
 * @parent Image Settings
 * @type file
 * @dir img
 * @desc The image of the boomerang
 *
 * @param Frame Width
 * @parent Image Settings
 * @type number
 * @default 48
 * @min 1
 * @desc The width of one frame of the boomerang image
 *
 * @param Animation Speed
 * @parent Image Settings
 * @type number
 * @default 15
 * @min 0
 * @desc The amount of frames before switching animation frames
*/
/*~struct~HookshotTool:
 * @param Properties
 * @type struct<CommonToolProperties>
 * @default {"Name":"","Symbol":"","Icon":"-1","Sound Effect Options":"","Use SE":""}
 * @description Set up common tool properties here.
 * 
 * @param Range
 * @type number
 * @default 6
 * @desc The amount of tiles the tool goes before returning to the  (if no hook)
*/
/*~struct~SE:
 * @param File
 * @type file
 * @dir audio/se
 * @desc Sound Effect file to play
 *
 * @param Volume
 * @type number
 * @default 90
 * @min 0
 * @max 100
 * @desc Volume of the sound effect
 *
 * @param Pitch
 * @type number
 * @default 100
 * @min 50
 * @max 150
 * @desc Pitch of the sound effect
 *
 * @param Pan
 * @type number
 * @default 0
 * @min -100
 * @max 100
 * @desc Pan of the sound effect
*/
var Imported = Imported || {};
Imported.CGMZ_DungeonTools = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Dungeon Tools"] = "Alpha";
CGMZ.DungeonTools = CGMZ.DungeonTools || {};
CGMZ.DungeonTools.parameters = PluginManager.parameters('CGMZ_DungeonTools');
CGMZ.DungeonTools.ResetTools = JSON.parse(CGMZ.DungeonTools.parameters["Reset Tools"]);
CGMZ.DungeonTools.ArrowTools = JSON.parse(CGMZ.DungeonTools.parameters["Arrow Tools"]);
CGMZ.DungeonTools.BombTools = JSON.parse(CGMZ.DungeonTools.parameters["Bomb Tools"]);
CGMZ.DungeonTools.BoomerangTools = JSON.parse(CGMZ.DungeonTools.parameters["Boomerang Tools"]);
CGMZ.DungeonTools.HookshotTools = JSON.parse(CGMZ.DungeonTools.parameters["Hookshot Tools"]);
CGMZ.DungeonTools.SceneBackground = CGMZ.DungeonTools.parameters["Scene Background Image"];
CGMZ.DungeonTools.EquippedText = CGMZ.DungeonTools.parameters["Equipped Text"];
CGMZ.DungeonTools.ToolKey = CGMZ.DungeonTools.parameters["Tool Key"];
CGMZ.DungeonTools.ToolSelectKey = CGMZ.DungeonTools.parameters["Tool Select Key"];
CGMZ.DungeonTools.BoomerangPretext = CGMZ.DungeonTools.parameters["Boomerang Message Pretext"];
CGMZ.DungeonTools.BoomerangPosttext = CGMZ.DungeonTools.parameters["Boomerang Message Posttext"];
CGMZ.DungeonTools.TransparentWindows = (CGMZ.DungeonTools.parameters["Transparent Windows"] === "true");
CGMZ.DungeonTools.ShowBoomerangMessage = (CGMZ.DungeonTools.parameters["Show Boomerang Message"] === "true");
//=============================================================================
// CGMZ_DungeonTool
//-----------------------------------------------------------------------------
// Data class used to store common dungeon tool properties
//=============================================================================
function CGMZ_DungeonTool() {
    this.initialize(...arguments);
}
CGMZ_DungeonTool.prototype.constructor = CGMZ_DungeonTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.initialize = function(properties) {
	this._isDiscovered = false;
	this._useCount = 0;
	this._symbol = properties.Symbol;
	this._name = properties.Name;
	this._icon = Number(properties.Icon);
	if(properties["Use SE"]) {
		const useSe = JSON.parse(properties["Use SE"]);
		this._se = {name: useSe.File, pan: Number(useSe.Pan), pitch: Number(useSe.Pitch), volume: Number(useSe.Volume)};
	}
};
//-----------------------------------------------------------------------------
// Discover tool
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.discover = function() {
	this._isDiscovered = true;
};
//-----------------------------------------------------------------------------
// Use tool
//-----------------------------------------------------------------------------
CGMZ_DungeonTool.prototype.use = function() {
	this._useCount++;
	if(this._se) AudioManager.playSe(this._se);
};
//=============================================================================
// CGMZ_DT_ResetTool
//-----------------------------------------------------------------------------
// Data class used to store reset tool properties
//=============================================================================
function CGMZ_DT_ResetTool() {
    this.initialize(...arguments);
}
CGMZ_DT_ResetTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_ResetTool.prototype.constructor = CGMZ_DT_ResetTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_ResetTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._switches = JSON.parse(properties.Switches);
	this._type = "reset";
};
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------
CGMZ_DT_ResetTool.prototype.use = function() {
	CGMZ_DungeonTool.prototype.use.call(this);
	$gameMap.CGMZ_resetMap();
};
//=============================================================================
// CGMZ_DT_ArrowTool
//-----------------------------------------------------------------------------
// Data class used to store arrow tool properties
//=============================================================================
function CGMZ_DT_ArrowTool() {
    this.initialize(...arguments);
}
CGMZ_DT_ArrowTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_ArrowTool.prototype.constructor = CGMZ_DT_ArrowTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_ArrowTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._switches = JSON.parse(properties.Switches);
	this._range = Number(properties.Range);
	this._speed = Number(properties.Speed);
	this._passableRegionId = Number(properties["Passable Region"]);
	this._type = "arrow";
	this._animationSpeed = Number(properties["Animation Speed"]);
	const splitPath = properties["Image"].split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	this._imageData = {folder: "img/" + path + "/", filename: file};
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_ArrowTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height / 4;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//=============================================================================
// CGMZ_DT_BombTool
//-----------------------------------------------------------------------------
// Data class used to store bomb tool properties
//=============================================================================
function CGMZ_DT_BombTool() {
    this.initialize(...arguments);
}
CGMZ_DT_BombTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_BombTool.prototype.constructor = CGMZ_DT_BombTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_BombTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._type = "bomb";
	this._switches = JSON.parse(properties.Switches);
	this._steps = Number(properties.Steps);
	this._animationSpeed = Number(properties["Animation Speed"]);
	this._explosionAnimationSpeed = Number(properties["Explosion Animation Speed"]);
	if(properties["Explode SE"]) {
		const explodeSe = JSON.parse(properties["Explode SE"]);
		this._explodeSe = {name: explodeSe.File, pan: Number(explodeSe.Pan), pitch: Number(explodeSe.Pitch), volume: Number(explodeSe.Volume)};
	}
	const splitPath = properties["Image"].split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	this._imageData = {folder: "img/" + path + "/", filename: file};
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
	const splitPath2 = properties["Explosion Image"].split("/");
	const file2 = splitPath2.pop();
	const path2 = splitPath2.join("/");
	this._explosionImageData = {folder: "img/" + path2 + "/", filename: file2};
	this._explosionFrameInfo = {frameWidth: Number(properties["Explosion Frame Width"])};
	const bitmap2 = ImageManager.loadBitmap(this._explosionImageData.folder, this._explosionImageData.filename);
	bitmap2.addLoadListener(this.initExplosionImageProperties.bind(this, bitmap2));
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_BombTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//-----------------------------------------------------------------------------
// Initialize explosion image properties
//-----------------------------------------------------------------------------
CGMZ_DT_BombTool.prototype.initExplosionImageProperties = function(bitmap) {
	this._explosionFrameInfo.frameHeight = bitmap.height;
};
//=============================================================================
// CGMZ_DT_BoomerangTool
//-----------------------------------------------------------------------------
// Data class used to store boomerang tool properties
//=============================================================================
function CGMZ_DT_BoomerangTool() {
    this.initialize(...arguments);
}
CGMZ_DT_BoomerangTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_BoomerangTool.prototype.constructor = CGMZ_DT_BoomerangTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._range = Number(properties.Range);
	this._type = "boomerang";
	this._rewards = [];
	this._switches = JSON.parse(properties.Switches);
	this._speed = Number(properties.Speed);
	this._passableRegionId = Number(properties["Passable Region"]);
	this._animationSpeed = Number(properties["Animation Speed"]);
	const splitPath = properties["Image"].split("/");
	const file = splitPath.pop();
	const path = splitPath.join("/");
	this._imageData = {folder: "img/" + path + "/", filename: file};
	this._frameInfo = {frameWidth: Number(properties["Frame Width"])};
	const bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
	bitmap.addLoadListener(this.initImageProperties.bind(this, bitmap));
};
//-----------------------------------------------------------------------------
// Initialize image properties
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.initImageProperties = function(bitmap) {
	this._frameInfo.frameHeight = bitmap.height / 4;
	this._frameInfo.maxFrames = Number(bitmap.width / this._frameInfo.frameWidth);
};
//-----------------------------------------------------------------------------
// Add rewards
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.addRewards = function(rewards) {
	this._rewards = rewards;
};
//-----------------------------------------------------------------------------
// Process rewards
// Rewards in format: {type: [item|weapon|armor|gold], amount: x, id: y}
//-----------------------------------------------------------------------------
CGMZ_DT_BoomerangTool.prototype.processAllRewards = function() {
	while(this._rewards.length > 0) {
		const reward = this._rewards.pop();
		switch(reward.type) {
			case 'item':
			case 'weapon':
			case 'armor':
				const item = $cgmzTemp.lookupItem(reward.type, Number(reward.id));
				$gameParty.gainItem(item, Number(reward.amount), false);
				if(CGMZ.DungeonTools.ShowBoomerangMessage) {
					const text = CGMZ.DungeonTools.BoomerangPretext + reward.amount + " " + item.name + CGMZ.DungeonTools.BoomerangPosttext;
					$gameMessage.newPage();
					$gameMessage.add(text);
				}
				break;
			case 'gold':
				$gameParty.gainGold(Number(reward.amount));
				if(CGMZ.DungeonTools.ShowBoomerangMessage) {
					const text = CGMZ.DungeonTools.BoomerangPretext + reward.amount + TextManager.currencyUnit + CGMZ.DungeonTools.BoomerangPosttext;
					$gameMessage.newPage();
					$gameMessage.add(text);
				}
		}
	}
};
//=============================================================================
// CGMZ_DT_HookshotTool
//-----------------------------------------------------------------------------
// Data class used to store hookshot tool properties
//=============================================================================
function CGMZ_DT_HookshotTool() {
    this.initialize(...arguments);
}
CGMZ_DT_HookshotTool.prototype = Object.create(CGMZ_DungeonTool.prototype);
CGMZ_DT_HookshotTool.prototype.constructor = CGMZ_DT_HookshotTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_DT_HookshotTool.prototype.initialize = function(properties, commonProperties) {
	CGMZ_DungeonTool.prototype.initialize.call(this, commonProperties);
	this._range = Number(properties.Range);
	this._type = "hookshot";
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Add dungeon tool data to save data
//=============================================================================
//-----------------------------------------------------------------------------
// Method used by CGMZ for creating plugin data
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_DungeonTools_createPluginData.call(this);
	this.initializeDungeonTools();
};
//-----------------------------------------------------------------------------
// Load new dungeon tools with saved game
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_DungeonTools_onAfterLoad.call(this);
	this.initializeDungeonTools();
};
//-----------------------------------------------------------------------------
// Initialize dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeDungeonTools = function() {
	if(!this._dungeonTools) {
		this._dungeonTools = {};
		this._currentDungeonTool = "";
		this._areDungeonToolsEnabled = false;
	}
	this.createResetTools();
	this.createArrowTools();
	this.createBombTools();
	this.createBoomerangTools();
	this.createHookshotTools();
	console.log(this._dungeonTools);
};
//-----------------------------------------------------------------------------
// Create reset tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createResetTools = function() {
	for(const toolJSON of CGMZ.DungeonTools.ResetTools) {
		const tool = JSON.parse(toolJSON);
		const toolProperties = JSON.parse(tool.Properties);
		if(!this._dungeonTools.hasOwnProperty(toolProperties.Symbol)) {
			this._dungeonTools[toolProperties.Symbol] = new CGMZ_DT_ResetTool(tool, toolProperties);
		}
	}
};
//-----------------------------------------------------------------------------
// Create arrow tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createArrowTools = function() {
	for(const toolJSON of CGMZ.DungeonTools.ArrowTools) {
		const tool = JSON.parse(toolJSON);
		const toolProperties = JSON.parse(tool.Properties);
		if(!this._dungeonTools.hasOwnProperty(toolProperties.Symbol)) {
			this._dungeonTools[toolProperties.Symbol] = new CGMZ_DT_ArrowTool(tool, toolProperties);
		}
	}
};
//-----------------------------------------------------------------------------
// Create bomb tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createBombTools = function() {
	for(const toolJSON of CGMZ.DungeonTools.BombTools) {
		const tool = JSON.parse(toolJSON);
		const toolProperties = JSON.parse(tool.Properties);
		if(!this._dungeonTools.hasOwnProperty(toolProperties.Symbol)) {
			this._dungeonTools[toolProperties.Symbol] = new CGMZ_DT_BombTool(tool, toolProperties);
		}
	}
};
//-----------------------------------------------------------------------------
// Create boomerang tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createBoomerangTools = function() {
	for(const toolJSON of CGMZ.DungeonTools.BoomerangTools) {
		const tool = JSON.parse(toolJSON);
		const toolProperties = JSON.parse(tool.Properties);
		if(!this._dungeonTools.hasOwnProperty(toolProperties.Symbol)) {
			this._dungeonTools[toolProperties.Symbol] = new CGMZ_DT_BoomerangTool(tool, toolProperties);
		}
	}
};
//-----------------------------------------------------------------------------
// Create boomerang tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.createHookshotTools = function() {
	for(const toolJSON of CGMZ.DungeonTools.HookshotTools) {
		const tool = JSON.parse(toolJSON);
		const toolProperties = JSON.parse(tool.Properties);
		if(!this._dungeonTools.hasOwnProperty(toolProperties.Symbol)) {
			this._dungeonTools[toolProperties.Symbol] = new CGMZ_DT_HookshotTool(tool, toolProperties);
		}
	}
};
//-----------------------------------------------------------------------------
// Returns the dungeon tool with matching symbol
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.equipDungeonTool = function(symbol) {
	this._currentDungeonTool = symbol;
};
//-----------------------------------------------------------------------------
// Returns the dungeon tool with matching symbol
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDungeonTool = function(symbol) {
	return this._dungeonTools[symbol];
};
//-----------------------------------------------------------------------------
// Returns the symbols of all dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDungeonTools = function() {
	return Object.keys(this._dungeonTools);
};
//-----------------------------------------------------------------------------
// Returns the symbols of all discovered dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredDungeonTools = function() {
	return this.getAllDungeonTools().filter(symbol => this._dungeonTools[symbol]._isDiscovered);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle dungeon tool plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_DungeonTools_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Call Scene", this.pluginCommandDungeonToolsCallScene);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Discover Tool", this.pluginCommandDungeonToolsDiscoverTool);
	PluginManager.registerCommand("CGMZ_DungeonTools", "Change Tool Access", this.pluginCommandDungeonToolsChangeToolAccess);
};
//-----------------------------------------------------------------------------
// Call Dungeon Tool Select Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsCallScene = function() {
	SceneManager.push(CGMZ_Scene_DungeonTool);
};
//-----------------------------------------------------------------------------
// Call Dungeon Tool Select Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsDiscoverTool = function(args) {
	const tool = $cgmz.getDungeonTool(args.Symbol);
	if(tool) {
		tool.discover();
	}
};
//-----------------------------------------------------------------------------
// Change access to dungeon tools
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandDungeonToolsChangeToolAccess = function(args) {
	$cgmz._areDungeonToolsEnabled = (args.Access === "true");
};
//-----------------------------------------------------------------------------
// Initialize dungeon tool variables
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_DungeonTools_CGMZ_Temp_createPluginData.call(this);
	this._dungeonToolInUse = null;
	this._bombToolInUse = null;
};
//-----------------------------------------------------------------------------
// Set a tool to be in use
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startUsingDungeonTool = function(tool) {
	if(this.canUseDungeonTool(tool)) {
		tool.use();
		(tool._type === "bomb") ? this._bombToolInUse = tool : this._dungeonToolInUse = tool;
		$gameMap.CGMZ_useDungeonTool(tool);
	}
};
//-----------------------------------------------------------------------------
// Start bomb explosion
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.startBombExplosion = function(tool, explodeLocation) {
	const imageData = tool._explosionImageData;
	const x = explodeLocation.x;
	const y = explodeLocation.y;
	const frameWidth = tool._explosionFrameInfo.frameWidth;
	const frameHeight = tool._explosionFrameInfo.frameHeight;
	const animationSpeed = tool._explosionAnimationSpeed;
	$cgmzTemp.requestMapAnimation(imageData, x, y, frameWidth, frameHeight, animationSpeed);
	this.stopUsingBombTool();
};
//-----------------------------------------------------------------------------
// Set a tool to no longer be in use and clear any effects it had
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopUsingDungeonTool = function() {
	if(this._dungeonToolInUse && this._dungeonToolInUse._type === "boomerang") {
		this._dungeonToolInUse.processAllRewards();
	}
	this._dungeonToolInUse = null;
	$gameMap._cgmzDungeonToolRestrictMovement = false;
};
//-----------------------------------------------------------------------------
// Set the bomb tool to no longer be in use
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.stopUsingBombTool = function() {
	this._bombToolInUse = null;
};
//-----------------------------------------------------------------------------
// Check if can use the tool
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.canUseDungeonTool = function(tool) {
	if(!$cgmz._areDungeonToolsEnabled) return false;
	if(tool._type === "bomb" && this._bombToolInUse) return false;
	if(tool._type !== "bomb" && this._dungeonToolInUse) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Open dungeon tool select menu on proper key down
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Temp_onKeyDown = CGMZ_Temp.prototype.onKeyDown;
CGMZ_Temp.prototype.onKeyDown = function(event) {
	alias_CGMZ_DungeonTools_Temp_onKeyDown.call(this, event);
	const key = event.key;
	if(key === CGMZ.DungeonTools.ToolSelectKey && SceneManager._scene.constructor === Scene_Map) {
		SceneManager.push(CGMZ_Scene_DungeonTool);
	} else if(key === CGMZ.DungeonTools.ToolKey && SceneManager._scene.constructor === Scene_Map) {
		const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
		if(tool) {
			this.startUsingDungeonTool(tool);
		}
	}
};
//=============================================================================
// CGMZ_Scene_DungeonTool
//-----------------------------------------------------------------------------
// Handle the dungeon tool select scene
//=============================================================================
function CGMZ_Scene_DungeonTool() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_DungeonTool.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_DungeonTool.prototype.constructor = CGMZ_Scene_DungeonTool;
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCurrentEquipWindow();
	this.createSelectWindow();
};
//-----------------------------------------------------------------------------
// Create current tool equipped window
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.createCurrentEquipWindow = function() {
	const rect = this.currentEquipWindowRect();
    this._currentEquipWindow = new CGMZ_Window_DungeonToolCurrentEquipped(rect);
    this.addWindow(this._currentEquipWindow);
};
//-----------------------------------------------------------------------------
// Get current tool equipped window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.currentEquipWindowRect = function() {
	const width = Graphics.boxWidth * 0.6;
	const height = this.calcWindowHeight(2, false);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = this.buttonAreaHeight();
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create select window
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.createSelectWindow = function() {
	const rect = this.selectWindowRect();
    this._selectWindow = new CGMZ_Window_DungeonToolSelect(rect);
	this._selectWindow.setHandler('ok', this.onSelect.bind(this));
	this._selectWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._selectWindow);
};
//-----------------------------------------------------------------------------
// Get select window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.selectWindowRect = function() {
	const width = this._currentEquipWindow.width;
	const height = this.calcWindowHeight(5, true);
	const x = this._currentEquipWindow.x;
	const y = this._currentEquipWindow.y + this._currentEquipWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On tool select
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.onSelect = function() {
	$cgmz.equipDungeonTool(this._selectWindow.item());
	this._currentEquipWindow.refresh();
	this._selectWindow.activate();
};
//-----------------------------------------------------------------------------
// Add custom background image
//-----------------------------------------------------------------------------
CGMZ_Scene_DungeonTool.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.DungeonTools.SceneBackground) {
		const imageData = $cgmzTemp.getImageData(CGMZ.DungeonTools.SceneBackground);
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_DungeonToolCurrentEquipped
//-----------------------------------------------------------------------------
// Window displaying quest information during accept / decline scene
//=============================================================================
function CGMZ_Window_DungeonToolCurrentEquipped() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_DungeonToolCurrentEquipped.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_DungeonToolCurrentEquipped.prototype.constructor = CGMZ_Window_DungeonToolCurrentEquipped;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolCurrentEquipped.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.DungeonTools.TransparentWindows));
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolCurrentEquipped.prototype.refresh = function() {
	this.contents.clear();
	this.contents.fontBold = true;
	this.CGMZ_drawTextLine(CGMZ.DungeonTools.EquippedText, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
	const toolName = this.createEquippedDungeonToolName();
	this.CGMZ_drawTextLine(toolName, 0, this.lineHeight(), this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolCurrentEquipped.prototype.createEquippedDungeonToolName = function() {
	const tool = $cgmz.getDungeonTool($cgmz._currentDungeonTool);
	return (tool) ? (tool._icon >= 0) ? '\\i[' + tool._icon + '] ' + tool._name : tool._name : "None";
};
//=============================================================================
// CGMZ_Window_DungeonToolSelect
//-----------------------------------------------------------------------------
// Selectable window for choosing which dungeon tool to equip
//=============================================================================
function CGMZ_Window_DungeonToolSelect(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_DungeonToolSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_DungeonToolSelect.prototype.constructor = CGMZ_Window_DungeonToolSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.DungeonTools.TransparentWindows));
	this.refresh();
	this.selectEquippedTool();
	this.activate();
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.refresh = function() {
    this.makeItemList();
	this.changePaintOpacity($cgmz._areDungeonToolsEnabled);
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.makeItemList = function() {
	this._data = $cgmz.getDiscoveredDungeonTools();
};
//-----------------------------------------------------------------------------
// Check if current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.isCurrentItemEnabled = function() {
	return this._data.length > 0;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const tool = $cgmz.getDungeonTool(item);
	const toolText = (tool._icon >= 0) ? '\\i[' + tool._icon + '] ' + tool._name : tool._name;
	this.CGMZ_drawTextLine(toolText, rect.x, rect.y, rect.width, 'center');
};
//-----------------------------------------------------------------------------
// Select the currently equipped dungeon tool (or first tool in list if unequipped)
//-----------------------------------------------------------------------------
CGMZ_Window_DungeonToolSelect.prototype.selectEquippedTool = function() {
	if(!$cgmz._currentDungeonTool) {
		this.select(0);
	} else {
		for(let i = 0; i < this.maxItems(); i++) {
			if(this._data[i] === $cgmz._currentDungeonTool) {
				this.select(i);
				break;
			}
		}
	}
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Handle the dungeon tools on the map
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also setup dungeon tools
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameMap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    alias_CGMZ_DungeonTools_GameMap_setup.call(this, mapId);
	this.CGMZ_setupDungeonTools();
};
//-----------------------------------------------------------------------------
// Setup dungeon tools
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_setupDungeonTools = function() {
	this._cgmzBombTool = new Game_CGMZ_BombTool();
	this._cgmzArrowTool = new Game_CGMZ_ArrowTool();
	this._cgmzBoomerangTool = new Game_CGMZ_BoomerangTool();
	//this._cgmzHookshotTool = new Game_CGMZ_ArrowTool();
	this._cgmzBombSteps = 0;
	this._cgmzDungeonToolRestrictMovement = false;
};
//-----------------------------------------------------------------------------
// Get the map tool from type of tool requested, returns null if not found
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_getDungeonToolObj = function(type) {
	switch(type) {
		case "bomb": return this._cgmzBombTool;
		case "arrow": return this._cgmzArrowTool;
		case "boomerang": return this._cgmzBoomerangTool;
		case "hookshot": return this._cgmzHookshotTool;
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alias. Also update dungeon tools
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameMap_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    alias_CGMZ_DungeonTools_GameMap_update.call(this, sceneActive);
	this.CGMZ_updateDungeonTools();
};
//-----------------------------------------------------------------------------
// Update dungeon tools
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_updateDungeonTools = function() {
	this._cgmzArrowTool.update();
	this._cgmzBoomerangTool.update();
};
//-----------------------------------------------------------------------------
// Check if dungeon tool restricts player movement
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_holdPlayerForDungeonTool = function() {
	return this._cgmzDungeonToolRestrictMovement;
};
//-----------------------------------------------------------------------------
// Reset the map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_resetMap = function() {
	if($gamePlayer._cgmzdt_xferInfo) {
		for(eventObj of this._events) {
			if(!eventObj) continue;
			eventObj.CGMZ_processDungeonTool($cgmz._currentDungeonTool, this._mapId);
		}
		$gamePlayer.requestMapReload();
		$gamePlayer.reserveTransfer(...$gamePlayer._cgmzdt_xferInfo);
	}
};
//-----------------------------------------------------------------------------
// Use the dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useDungeonTool = function(tool) {
	switch(tool._type) {
		case "arrow": this.CGMZ_useArrowTool(tool); break;
		case "bomb": this.CGMZ_useBombTool(tool); break;
		case "boomerang": this.CGMZ_useBoomerangTool(tool); break;
		case "hookshot": this.CGMZ_useHookshotTool(tool);
	}
};
//-----------------------------------------------------------------------------
// Use the arrow dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useArrowTool = function(tool) {
	this._cgmzArrowTool.copyPosition($gamePlayer);
	this._cgmzArrowTool.setupTool(tool);
};
//-----------------------------------------------------------------------------
// Use the bomb dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useBombTool = function(tool) {
	this._cgmzBombTool.copyPosition($gamePlayer);
	this._cgmzBombTool._realX = this._cgmzBombTool._x;
	this._cgmzBombTool._realY = this._cgmzBombTool._y;
	this._cgmzBombSteps = $gameParty.steps() + tool._steps;
};
//-----------------------------------------------------------------------------
// Use the boomerang dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useBoomerangTool = function(tool) {
	this._cgmzBoomerangTool.copyPosition($gamePlayer);
	this._cgmzBoomerangTool.setupTool(tool);
	this._cgmzDungeonToolRestrictMovement = true;
};
//-----------------------------------------------------------------------------
// Use the hookshot dungeon tool on map
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_useHookshotTool = function(tool) {
	this._cgmzHookshotTool.copyPosition($gamePlayer);
	this._cgmzHookshotTool.setupTool(tool);
};
//-----------------------------------------------------------------------------
// Check for and process bomb explosion if needed
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_checkBombExplosion = function() {
	if($cgmzTemp._bombToolInUse && this._cgmzBombSteps <= $gameParty.steps()) {
		const tool = $cgmzTemp._bombToolInUse;
		if(tool._explodeSe) AudioManager.playSe(tool._explodeSe);
		$gameScreen.startFlash([255, 255, 255, 170], 60);
		const hitEvents = [];
		const origin = {x: this._cgmzBombTool._x, y: this._cgmzBombTool._y};
		const array = this.CGMZ_makeBombHitArray(origin);
		for(const pos of array) {
			for(const event of this.eventsXy(pos.x, pos.y)) {
				hitEvents.push(event);
			}
		}
		for(const event of hitEvents) {
			event.CGMZ_processDungeonTool($cgmzTemp._bombToolInUse._symbol, this._mapId);
		}
		$cgmzTemp.startBombExplosion(tool, origin);
	}
};
//-----------------------------------------------------------------------------
// Get the positions of every tile hit by the bomb
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_makeBombHitArray = function(origin) {
	const hits = [];
	hits.push(origin);
	for(let i = origin.x - 1; i <= origin.x + 1; i++) {
		if(i === origin.x) continue;
		hits.push({x: i, y: origin.y});
	}
	for(let i = origin.y - 1; i <= origin.y + 1; i++) {
		if(i === origin.y) continue;
		hits.push({x: origin.x, y: i});
	}
	return hits;
};
//-----------------------------------------------------------------------------
// Handling when arrow tool collides with event
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_arrowDungeonToolCollided = function() {
	const x = this.roundXWithDirection(this._cgmzArrowTool._x, this._cgmzArrowTool._direction);
	const y = this.roundYWithDirection(this._cgmzArrowTool._y, this._cgmzArrowTool._direction);
	for(const event of this.eventsXy(x, y)) {
		event.CGMZ_processDungeonTool($cgmzTemp._dungeonToolInUse._symbol, this._mapId);
	}
};
//-----------------------------------------------------------------------------
// Handling when boomerang tool collides with event
// Returns whether to turn around or not based on priority
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_boomerangDungeonToolCollided = function() {
	const x = this.roundXWithDirection(this._cgmzBoomerangTool._x, this._cgmzBoomerangTool._direction);
	const y = this.roundYWithDirection(this._cgmzBoomerangTool._y, this._cgmzBoomerangTool._direction);
	let needsReverse = false;
	for(const event of this.eventsXy(x, y)) {
		event.CGMZ_processDungeonTool($cgmzTemp._dungeonToolInUse._symbol, this._mapId);
		if(event.isNormalPriority()) needsReverse = true;
	}
	return needsReverse;
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// When increasing steps, check for bomb explosion
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Check if bomb tool should explode
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
    alias_CGMZ_DungeonTools_GameParty_increaseSteps.call(this);
	$gameMap.CGMZ_checkBombExplosion();
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Store transfer info for reset tool
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Save transfer info for reset tool
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    alias_CGMZ_DungeonTools_GamePlayer_reserveTransfer.call(this, mapId, x, y, d, fadeType);
	this._cgmzdt_xferInfo = [mapId,x,y,d,fadeType];
};
//-----------------------------------------------------------------------------
// Alias. Clear use of dungeon tool after transfer
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    alias_CGMZ_DungeonTools_GamePlayer_performTransfer.call(this);
	$cgmzTemp.stopUsingDungeonTool();
	$cgmzTemp.stopUsingBombTool();
};
//-----------------------------------------------------------------------------
// Alias. Do not let player move if using tool that returns to them
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	if($gameMap.CGMZ_holdPlayerForDungeonTool()) {
		return false;
	}
	return alias_CGMZ_DungeonTools_GamePlayer_canMove.call(this);
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Processing for event interaction with a tool
//=============================================================================
//-----------------------------------------------------------------------------
// Process the tool's interaction with the event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_processDungeonTool = function(toolId, mapId) {
	const tool = $cgmz.getDungeonTool(toolId);
	if(!tool || !this.CGMZ_isAffectedByDungeonTool(toolId)) return;
	switch(tool._type) {
		case "reset":
			for(const switchId of tool._switches) {
				const key = [mapId, this._eventId, switchId];
				$gameSelfSwitches.setValue(key, false);
			}
			break;
		case "bomb":
			for(const switchId of tool._switches) {
				const key = [mapId, this._eventId, switchId];
				$gameSelfSwitches.setValue(key, true);
			}
			break;
		case "arrow":
			for(const switchId of tool._switches) {
				const key = [mapId, this._eventId, switchId];
				$gameSelfSwitches.setValue(key, true);
			}
			break;
		case "boomerang":
			this.CGMZ_makeBoomerangRewards(tool);
			for(const switchId of tool._switches) {
				const key = [mapId, this._eventId, switchId];
				$gameSelfSwitches.setValue(key, true);
			}
			break;
	}
};
//-----------------------------------------------------------------------------
// Check if event is affected by tool
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_isAffectedByDungeonTool = function(toolId) {
	const page = this.page();
	for(const command of page.list) {
		if(command.code === 108 && command.parameters[0].trim() === "CGMZDT " + toolId) return true;
	}
	return false;
};
//-----------------------------------------------------------------------------
// Check if event is affected by tool
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_makeBoomerangRewards = function(tool) {
	const rewards = [];
	const page = this.page();
	for(const command of page.list) {
		if(command.code === 108 && command.parameters[0].trim().includes("CGMZDT PICKUP")) {
			const params = command.parameters[0].split(" ");
			const reward = {type: params[2], amount: params[3], id: params[4]};
			rewards.push(reward);
		}
	}
	tool.addRewards(rewards);
};
//=============================================================================
// Game_CharacterBase
//-----------------------------------------------------------------------------
// Do not allow walking over bomb tool
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Prevent movement if bomb tool is in way
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_GameCharacterBase_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const oldReturn = alias_CGMZ_DungeonTools_GameCharacterBase_canPass.call(this, x, y, d);
	return oldReturn && (!this.CGMZ_isCollidedWithBomb(x2, y2) || this.isThrough());
};
//-----------------------------------------------------------------------------
// Check if collided with bomb
//-----------------------------------------------------------------------------
Game_CharacterBase.prototype.CGMZ_isCollidedWithBomb = function(x, y) {
	if(!$cgmzTemp._bombToolInUse) return false;
    return $gameMap._cgmzBombTool._x === x && $gameMap._cgmzBombTool._y === y;
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add sprites of dungeon tools
//=============================================================================
//-----------------------------------------------------------------------------
// Create dungeon tool sprites when characters are created
//-----------------------------------------------------------------------------
const alias_CGMZ_DungeonTools_Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    alias_CGMZ_DungeonTools_Spriteset_Map_createCharacters.call(this);
	const bombSprite = new Sprite_DungeonTool("bomb");
	const arrowSprite = new Sprite_DungeonTool("arrow");
	const boomerangSprite = new Sprite_DungeonTool("boomerang");
	const hookshotSprite = new Sprite_DungeonTool("hookshot");
	this._tilemap.addChild(bombSprite);
	this._tilemap.addChild(arrowSprite);
	this._tilemap.addChild(boomerangSprite);
	this._tilemap.addChild(hookshotSprite);
};
//=============================================================================
// Sprite_DungeonTool
//-----------------------------------------------------------------------------
// Sprite class for dungeon tools
//=============================================================================
function Sprite_DungeonTool() {
    this.initialize(...arguments);
}
Sprite_DungeonTool.prototype = Object.create(Sprite.prototype);
Sprite_DungeonTool.prototype.constructor = Sprite_DungeonTool;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.initialize = function(type) {
    Sprite.prototype.initialize.call(this);
	this._type = type;
    this.initMembers();
};
//-----------------------------------------------------------------------------
// Initialize data
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.initMembers = function() {
	this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._tool = null;
	this._mapTool = $gameMap.CGMZ_getDungeonToolObj(this._type);
	this.setEmptyTool();
};
//-----------------------------------------------------------------------------
// Set default properties for no animation/image
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.setEmptyTool = function() {
	this._needsUpdate = false;
	this._bitmap = null;
	this._imageData = null;
	this._frameInfo = null;
	this._currentFrame = 0;
	this._animationSpeed = 0;
	this._waitCounter = 0;
	this._direction = 0;
};
//-----------------------------------------------------------------------------
// Setup tool properties
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.setupToolProperties = function() {
	const tool = (this._type === "bomb") ? $cgmzTemp._bombToolInUse : $cgmzTemp._dungeonToolInUse;
	if(!tool || tool._type === "reset") {
		this.setEmptyTool();
	} else {
		this._needsUpdate = false;
		this._frameInfo = tool._frameInfo;
		this._animationSpeed = tool._animationSpeed;
		this._currentFrame = 0;
		this._waitCounter = 0;
		this._imageData = tool._imageData;
		this._direction = (this._type !== "bomb") ? this._mapTool._direction / 2 - 1 : 0;
		this._bitmap = ImageManager.loadBitmap(this._imageData.folder, this._imageData.filename);
		this._bitmap.addLoadListener(this.onImageLoaded.bind(this));
	}
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.onImageLoaded = function() {
	this._needsUpdate = true;
	const pw = this._frameInfo.frameWidth;
	const ph = this._frameInfo.frameHeight;
	const sx = this._currentFrame * pw;
	const sy = this._direction * this._frameInfo.frameHeight;
    this.setFrame(sx, sy, pw, ph);
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.updateTool();
	if(this._needsUpdate) {
		this.updateFrame();
		this.updatePosition();
	}
};
//-----------------------------------------------------------------------------
// Update sprite tool
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.updateTool = function() {
	if(this.needsToolUpdate()) {
		this._tool = (this._type === "bomb") ? $cgmzTemp._bombToolInUse : $cgmzTemp._dungeonToolInUse;
		this.visible = !!this._tool;
		this.setupToolProperties();
	}
};
//-----------------------------------------------------------------------------
// Check if tool update needed
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.needsToolUpdate = function() {
	if(this._type === "bomb") {
		return this._tool !== $cgmzTemp._bombToolInUse;
	} else if($cgmzTemp._dungeonToolInUse) {
		return this._type === $cgmzTemp._dungeonToolInUse._type && this._tool !== $cgmzTemp._dungeonToolInUse;
	}
	return this._tool !== $cgmzTemp._dungeonToolInUse;
};
//-----------------------------------------------------------------------------
// Update frame of tool
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.updateFrame = function() {
	this._waitCounter++;
	if(this._waitCounter > this._animationSpeed) {
		this._waitCounter = 0;
		this._currentFrame = (this._currentFrame + 1) % this._frameInfo.maxFrames;
		const pw = this._frameInfo.frameWidth;
		const ph = this._frameInfo.frameHeight;
		const sx = this._currentFrame * pw;
		const sy = this._direction * this._frameInfo.frameHeight;
        this.setFrame(sx, sy, pw, ph);
	}
};
//-----------------------------------------------------------------------------
// Update position and direction of tool
//-----------------------------------------------------------------------------
Sprite_DungeonTool.prototype.updatePosition = function() {
	this.x = this._mapTool.screenX();
    this.y = this._mapTool.screenY();
    this.z = this._mapTool.screenZ();
	this._direction = (this._type !== "bomb") ? this._mapTool._direction / 2 - 1 : 0;
};
//=============================================================================
// Game_CGMZ_BombTool
//-----------------------------------------------------------------------------
// Data class for bomb tool appearing on the map
//=============================================================================
function Game_CGMZ_BombTool() {
    this.initialize(...arguments);
}
Game_CGMZ_BombTool.prototype = Object.create(Game_CharacterBase.prototype);
Game_CGMZ_BombTool.prototype.constructor = Game_CGMZ_BombTool;
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
Game_CGMZ_BombTool.prototype.update = function() {
};
//-----------------------------------------------------------------------------
// Get screen Z
//-----------------------------------------------------------------------------
Game_CGMZ_BombTool.prototype.screenZ = function() {
    return $gamePlayer.screenZ() - 1;
};
//=============================================================================
// Game_CGMZ_MapTool
//-----------------------------------------------------------------------------
// Super class for map tools appearing on the map
//=============================================================================
function Game_CGMZ_MapTool() {
    this.initialize(...arguments);
}
Game_CGMZ_MapTool.prototype = Object.create(Game_CharacterBase.prototype);
Game_CGMZ_MapTool.prototype.constructor = Game_CGMZ_MapTool;
//-----------------------------------------------------------------------------
// Init Members
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.initMembers = function() {
	Game_CharacterBase.prototype.initMembers.call(this);
	this._tool = null;
};
//-----------------------------------------------------------------------------
// Setup the tool
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.setupTool = function(tool) {
	this._tool = tool;
	this._moveSpeed = tool._speed;
	this._range = tool._range;
	this._totalMoves = 0;
	this._active = true;
	this._passableRegion = tool._passableRegionId;
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.update = function() {
	if(this.isActive()) {
		this.updatePremove();
		if(!this.isMoving() && this.shouldMove()) {
			this.updateCollision();
			this._totalMoves++;
			this.moveStraight(this.direction());
		}
		this.updateMove();
		this.updatePostmove();
	}
};
//-----------------------------------------------------------------------------
// Determine if should move
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.isActive = function() {
	return this._active;
};
//-----------------------------------------------------------------------------
// Determine if should move
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.shouldMove = function() {
	return true;
};
//-----------------------------------------------------------------------------
// Update before moving
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.updatePremove = function() {
	// Implemented by children
};
//-----------------------------------------------------------------------------
// Update after moving
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.updatePostmove = function() {
	// Implemented by children
};
//-----------------------------------------------------------------------------
// Update for colliding with something
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.updateCollision = function() {
	// Implemented by children
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.isMapPassable = function(x, y, d) {
	return true;
};
//-----------------------------------------------------------------------------
// Get screen Z
//-----------------------------------------------------------------------------
Game_CGMZ_MapTool.prototype.screenZ = function() {
    return $gamePlayer.screenZ();
};
//=============================================================================
// Game_CGMZ_ArrowTool
//-----------------------------------------------------------------------------
// Data class for arrow tools appearing on the map
//=============================================================================
function Game_CGMZ_ArrowTool() {
    this.initialize(...arguments);
}
Game_CGMZ_ArrowTool.prototype = Object.create(Game_CGMZ_MapTool.prototype);
Game_CGMZ_ArrowTool.prototype.constructor = Game_CGMZ_ArrowTool;
//-----------------------------------------------------------------------------
// Determine if arrow should move
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.shouldMove = function() {
	return (this._totalMoves < this._range) && this.isActive();
};
//-----------------------------------------------------------------------------
// Check if hit max range, handle this case for tool end
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.updatePremove = function() {
	this._active = (this._totalMoves < this._range);
	if(!this._active) $cgmzTemp.stopUsingDungeonTool();
};
//-----------------------------------------------------------------------------
// Check if collided with something and stop using tool
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.updateCollision = function() {
	const d = this._direction;
	const x = this._x;
	const y = this._y;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    if(!$gameMap.isValid(x2, y2) || !this.isMapPassable(x, y, d)) {
		$cgmzTemp.stopUsingDungeonTool();
        this._active = false;
    } else if(this.isCollidedWithCharacters(x2, y2)) {
		$gameMap.CGMZ_arrowDungeonToolCollided();
		$cgmzTemp.stopUsingDungeonTool();
        this._active = false;
    }
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_ArrowTool.prototype.isMapPassable = function(x, y, d) {
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const d2 = this.reverseDir(d);
    if($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) return true
	return $gameMap.regionId(x2, y2) === this._passableRegion;
};
//=============================================================================
// Game_CGMZ_BoomerangTool
//-----------------------------------------------------------------------------
// Data class for boomerang tools appearing on the map
//=============================================================================
function Game_CGMZ_BoomerangTool() {
    this.initialize(...arguments);
}
Game_CGMZ_BoomerangTool.prototype = Object.create(Game_CGMZ_MapTool.prototype);
Game_CGMZ_BoomerangTool.prototype.constructor = Game_CGMZ_BoomerangTool;
//-----------------------------------------------------------------------------
// Setup the tool
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.setupTool = function(tool) {
	Game_CGMZ_MapTool.prototype.setupTool.call(this, tool);
	this._isReversing = false;
};
//-----------------------------------------------------------------------------
// Reverse direction of tool
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.reverse = function() {
	this._isReversing = true;
	this.setDirection(this.reverseDir(this._direction));
};
//-----------------------------------------------------------------------------
// Check if hit max range, handle this case for tool end
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.updatePremove = function() {
	if(!this._isReversing) {
		if(this._totalMoves >= this._range) this.reverse();
	}
	this._active = !(this._isReversing && this._x === $gamePlayer._x && this._y === $gamePlayer._y);
	if(!this._active) $cgmzTemp.stopUsingDungeonTool();
};
//-----------------------------------------------------------------------------
// Check if collided with something and handle collision
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.updateCollision = function() {
	const d = this._direction;
	const x = this._x;
	const y = this._y;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    if(!$gameMap.isValid(x2, y2) || !this.isMapPassable(x, y, d)) {
		if(this._isReversing) {
			$cgmzTemp.stopUsingDungeonTool();
			this._active = false;
		} else {
			this.reverse();
		}
    } else if($gameMap.eventsXyNt(x2, y2).length > 0) {
		const shouldReverse = $gameMap.CGMZ_boomerangDungeonToolCollided();
		if(shouldReverse && !this._isReversing) this.reverse();
    }
	if(this._totalMoves === 0 && this._isReversing) {
		$cgmzTemp.stopUsingDungeonTool();
		this._active = false;
	}
};
//-----------------------------------------------------------------------------
// Check if map is passable for tool
//-----------------------------------------------------------------------------
Game_CGMZ_BoomerangTool.prototype.isMapPassable = function(x, y, d) {
	if(this._isReversing) return true;
	const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const d2 = this.reverseDir(d);
    if($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) return true;
	return $gameMap.regionId(x2, y2) === this._passableRegion;
};