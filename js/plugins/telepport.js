/*:
* @target MZ
* @plugindesc Teleport
* @author Marrend
*
* @help teleport.js
*
* This plugin includes methods to allow for a fast-travel system where locations are unlocked as players visit them.
*
* The script has been sub-divided into parts for easy reference/searching.
*
* Part 1: Locale, data class for locations.
* Part 2: Locales, the wrapper class for a 'Locale' array.
* Part 3: Window_Teleport, displaying the list of places to telport to.
* Part 4: Scene_Teleport, where it all comes together.
* Part 5: Game_Party, attaching a 'Locales' array to it.
*
* Paramater default data reference is below.
*
* Alpha Island
* MapId = 1; Positon = (8, 5); enabled (default); facing down (default)
* Beta Dungeon
* MapId = 2; Position = (8, 5); enabled (default); facing down (default)
* Delta Desert
* MapId = 3; Position = (8, 5); enabled (default); facing down (default)
*
* @param locales
* @text Locale array
* @desc Customize the teleport array via parameters! Some Examples below.
* @default [[1, 8, 5], [2, 8, 5], [3, 8, 5]]
* @type array
*/

/**
* Part 1: Locale, data class for locations.
**/
function Locale () {
	this.initialize(...arguments);
};

// Start-up process for 'Locale' class.
Locale.prototype.initialize = function() {
	this.mapId = 0;
	this.xpos = 0;
	this.ypos = 0;
	this.face = 0;
	this.name = "Undefined";
};

// Sets multiple member variables.
Locale.prototype.setLocale = function(mapId, xpos, ypos, enabled=true, face=2) {
	this.mapId = mapId;
	this.xpos = xpos;
	this.ypos = ypos;
	this.face = face;
	this.enabled = enabled;
	this.name = this.get_name();
};

// Gets map name information from the appropriate map file.
Locale.prototype.get_name = function() {
	if (this.enabled === true) {
		map = this.readMapData(this.mapId);
		return map.displayName;
	} else {
		return "Not yet discovered!"
	};
};

// Reads map info. Useful to get the display name, and to ensure events, tilesets, and
// what-have you, are copied over correctly!
Locale.prototype.readMapData = function(mapId) {
	filename = "Map%1.json".format(mapId.padZero(3));
	url = "data/" + filename;
	data = new XMLHttpRequest();
	data.open("GET", url, false);
	data.send(null);
	return JSON.parse(data.responseText);
};

// Performs teleportation, as per variable indicators.
Locale.prototype.teleport = function() {
	$gamePlayer.reserveTransfer(this.mapId, this.xpos, this.ypos, this.face, 1);
	$gamePlayer.performTransfer();
	map = this.readMapData(this.mapId);
	$dataMap = map
	$gameMap.setup(this.mapId);
};

/**
* Part 2: Locales, the wrapper class for a 'Locale' array.
**/
function Locales() {
	this.initialize(...arguments);
};

// Start-up process for 'Locales' wrapper-class.
Locales.prototype.initialize = function() {
	this.data = [];
};

// Adds a location to the array, with all data points defined.
Locales.prototype.add = function(mapId, xpos, ypos, enabled=true, face=2) {
	this.data.push(new Locale());
	size = this.data.length - 1;
	this.data[size].setLocale(mapId, xpos, ypos, enabled, face);
};

// Sets a location as enabled/disabled for teleportation.
Locales.prototype.setEnable = function(index, enable) {
	this.data[index].enable = enable;
	this.data[index].get_name();
};

// Initial list of  list of places that can be teleported to.
Locales.prototype.setup = function() {
	raw_params = PluginManager.parameters('teleport');
	obj = JSON.parse(raw_params.locales);
	if (obj.length > 0)
		for(let i=0; i < obj.length; i++) {
			switch (obj[i].length) {
				case 3: // Minimim information provided.
					this.add(obj[i][0], obj[i][1], obj[i][2]);
					break;
				case 4: // Includes map availability.
					this.add(obj[i][0], obj[i][1], obj[i][2], obj[i][3]);
					break;
				case 5: // Includes map avaiability and facing information.
					this.add(obj[i][0], obj[i][1], obj[i][2], obj[i][3], obj[i][4]);
					break;
			};
		};
};

// Sets a location as enabled/disabled.
Game_Party.prototype.setEnable = function(index, enable) {
	this.locales.setEnable(index, enable);
};

/**
* Part 3: Window_Teleport, displaying the list of places to telport to.
**/
function Window_Teleport() {
	this.initialize(...arguments);
};

// Process to be an extension/child of Window_Command.
Window_Teleport.prototype = Object.create(Window_Command.prototype);
Window_Teleport.prototype.constuctor = Window_Teleport;

// Start-up process.
Window_Teleport.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this.refresh();
};

// Makes command list.
Window_Teleport.prototype.makeCommandList = function() {
	let i = 0
	while (i < $gameParty.locales.data.length) {
		name = $gameParty.locales.data[i].name;
		enabled = $gameParty.locales.data[i].enabled;
		this.addCommand(name, "loc", enabled);
		i ++;
	}
};

/**
* Part 4: Scene_Teleport, where it all comes together.
**/
function Scene_Teleport() {
	this.initialize(...arguments);
};

// Process to be an extension/child of Scene_MenuBase
Scene_Teleport.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Teleport.prototype.constructor = Scene_Teleport;

// Start-up process.
Scene_Teleport.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};

// No help area here!
Scene_Teleport.prototype.helpAreaHeight = function() {
	return 0;
};

// Creates the scene.
Scene_Teleport.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createCommandWindow();
};

// Start function.
Scene_Teleport.prototype.start = function() {
	Scene_MenuBase.prototype.start.call(this);
	this._commandWindow.refresh();
};

// Sets y-position of the window.
Scene_Teleport.prototype.ypos = function() {
	return (Graphics.height - this.height) / 2
};

// Creates the bounds of the command window.
Scene_Teleport.prototype.commandWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = this.calcWindowHeight(8, true);
	const wx = 0;
	const wy = (Graphics.boxHeight - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};

// Creates the command window.
Scene_Teleport.prototype.createCommandWindow = function() {
	const rect = this.commandWindowRect();
	commandWindow = new Window_Teleport(rect);
	let i = 0
	while (i < commandWindow._list.length) {
		commandWindow.setHandler(commandWindow.commandSymbol(i), this.commandTeleport.bind(this));
		i ++;
	};
	commandWindow.setHandler("cancel", this.popScene.bind(this));
	this._commandWindow = commandWindow;
	this.addWindow(commandWindow);
};

// Process on selecting an item.
Scene_Teleport.prototype.commandTeleport = function() {
	if (this._commandWindow.isCurrentItemEnabled()) {
		obj = $gameParty.locales.data[this._commandWindow._index];
		obj.teleport();
		this.popScene();
	};
};

/**
* Part 5: Game_Party, attaching a 'Locales' array to it.
**/
const game_party_init = Game_Party.prototype.initialize;
// Aliased function.
Game_Party.prototype.initialize = function() {
	game_party_init.apply(this);
	this.locales = new Locales();
	this.locales.setup();
};