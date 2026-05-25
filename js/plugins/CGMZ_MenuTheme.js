/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/menutheme/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Add a BGM to the menu
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
 * Description: Adds a BGM to the menu. It will autoplay the previous BGM
 * when exiting menu. The menu theme will persist through all different menus
 * within the main menu (such as item, status, or save).
 * ----------------------------------------------------------------------------
 * Documentation:
 *
 * @param Menu Theme
 * @type file
 * @dir audio/bgm/
 * @desc The menu theme BGM to play
*/
var Imported = Imported || {};
Imported.CGMZ_MenuTheme = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Menu Theme"] = "1.0.0";
CGMZ.MenuTheme = CGMZ.MenuTheme || {};
CGMZ.MenuTheme.parameters = PluginManager.parameters('CGMZ_MenuTheme');
CGMZ.MenuTheme.Theme = CGMZ.MenuTheme.parameters["Menu Theme"];
//=============================================================================
// Game System
//-----------------------------------------------------------------------------
// Do not save menu BGM (instead save previous BGM)
//=============================================================================
//-----------------------------------------------------------------------------
// Save the correct BGM (not Menu Theme)
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuTheme_GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
    alias_CGMZ_MenuTheme_GameSystem_onBeforeSave.call(this);
	if($cgmzTemp.isPlayingMenuTheme()) {
		this._bgmOnSave = $cgmzTemp.getSavedBgmForMenuTheme();
	}
};
//=============================================================================
// Scene Menu
//-----------------------------------------------------------------------------
// Handling for playing menu theme
//=============================================================================
//-----------------------------------------------------------------------------
// Play menu theme if player came from map
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuTheme_SceneMenu_start = Scene_Menu.prototype.start;
Scene_Menu.prototype.start = function() {
    alias_CGMZ_MenuTheme_SceneMenu_start.call(this);
    if(SceneManager.isPreviousScene(Scene_Map)) {
		$cgmzTemp.playMenuTheme();
	}
};
//-----------------------------------------------------------------------------
// Replay map music if returning to map
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuTheme_SceneMenu_terminate = Scene_Menu.prototype.terminate;
Scene_Menu.prototype.terminate = function() {
	alias_CGMZ_MenuTheme_SceneMenu_terminate.call(this);
    if(SceneManager.isNextScene(Scene_Map)) {
		$cgmzTemp.replayPreviousMenuThemeBgm();
	}
};
//=============================================================================
// CGMZ Temp
//-----------------------------------------------------------------------------
// Handles saving past BGM and switching which BGM is playing
//=============================================================================
//-----------------------------------------------------------------------------
// Initialize the previous BGM for menu theme to empty sound file
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuTheme_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_MenuTheme_CGMZTemp_createPluginData.call(this);
	this._previousBGMForMenuTheme = null;
	this._isPlayingMenuTheme = false;
	this._menuThemeBgm = {name: CGMZ.MenuTheme.Theme, volume: 100, pitch: 100, pan: 0, pos: 0};
};
//-----------------------------------------------------------------------------
// Play menu theme, save previous bgm
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.playMenuTheme = function() {
	this._isPlayingMenuTheme = true;
    this._previousBGMForMenuTheme = AudioManager.saveBgm();
	if(this._menuThemeBgm.pos !== 0) {
		AudioManager.replayBgm(this._menuThemeBgm);
	} else {
		AudioManager.playBgm(this._menuThemeBgm);
	}
};
//-----------------------------------------------------------------------------
// Replay saved bgm for menu theme
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.replayPreviousMenuThemeBgm = function() {
	this._isPlayingMenuTheme = false;
    if (this._previousBGMForMenuTheme) {
		this._menuThemeBgm = AudioManager.saveBgm();
        AudioManager.replayBgm(this._previousBGMForMenuTheme);
    }
};
//-----------------------------------------------------------------------------
// Determine if currently playing menu theme
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isPlayingMenuTheme = function() {
	return this._isPlayingMenuTheme;
};
//-----------------------------------------------------------------------------
// Get the saved BGM if menu theme is playing
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getSavedBgmForMenuTheme = function() {
	if(this._previousBGMForMenuTheme) {
		return this._previousBGMForMenuTheme;
	}
	return AudioManager.makeEmptyAudioObject();
};