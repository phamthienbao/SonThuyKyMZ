//=============================================================================
// VisuStella MZ - New Game +
// VisuMZ_3_NewGamePlus.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_NewGamePlus = true;

var VisuMZ = VisuMZ || {};
VisuMZ.NewGamePlus = VisuMZ.NewGamePlus || {};
VisuMZ.NewGamePlus.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [NewGamePlus]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/New_Game_Plus_VisuStella_MZ
 * @base VisuMZ_1_SaveCore
 * @orderAfter VisuMZ_1_SaveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * New Game+ is a great way to provide replay value for your game. It lets the
 * player re-experience the game in a different way with either carried over
 * items, to carried over party members, to carried over skills, switches, and
 * variables even. There exists many options to change how New Game+ will work
 * for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select which switches, variables, actor data, party data, and system data
 *   is carried over into a New Game+.
 * * Use notetags to prevent specific items, weapons, armors, or actors from
 *   carrying over their data.
 * * Two different ways of starting a New Game+.
 * * One way is by saving a New Game+ save file and loading upon it.
 * * The second way is by immediately using the current game's save data and
 *   starting a New Game+ with it.
 * * Run a dedicated Common Event after a New Game+ has started.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_SaveCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * So how do you start a New Game+? There are two ways to do it:
 * 
 * ---
 * 
 * Method 1: Save File with New Game+
 * 
 * Use the Plugin Command from this plugin for "Save: New Game+" from the map
 * scene. The save menu will open and prompt the player where to make a save
 * file for the New Game+ file to be at.
 * 
 * When the player loads up that file, a new game will start instead with all
 * of the carry over effects listed in the Plugin Parameters.
 * 
 * ---
 * 
 * Method 2: Transition into New Game+
 * 
 * Use the Plugin Command from this plugin for "Transition: New Game+" from the
 * map scene. The game will immediately fade out and start a new game with all
 * of the carry over effects listed in the Plugin Parameters.
 * 
 * This is useful for the games who have decided to make one save file games.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * VisuMZ_2_SkillLearnSystem
 *
 * This plugin allows the functionality of carrying over AP, CP, JP, SP if you
 * so wish. You can change the settings in this plugin's Plugin Parameters.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === New Game+-Related Notetags ===
 * 
 * ---
 *
 * <No New Game+ Carry Over>
 *
 * - Used for: Actor, Item, Weapon, Armor Notetags
 * - This will prevent the item, weapon, or armor from being carried over to
 *   New Game+. If this is used on an actor, the actor will be in its default
 *   state as if a new game started.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: New Game+
 * - Opens up the Save menu for the player to save a New Game+ file.
 * - Only works from map scene.
 *
 * ---
 * 
 * === Transition Plugin Commands ===
 * 
 * ---
 *
 * Transition: New Game+
 * - Transitions the current game directly into a New Game+.
 * - Only works from map scene.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Data Settings
 * ============================================================================
 *
 * This contains actor data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * General
 * 
 *   Copy Actor?:
 *   - Carry over all of each actor's settings when starting a New Game+?
 * 
 *   EXP:
 *   - Carry over each actor's EXP data when starting a New Game+?
 * 
 *   Skills:
 *   - Carry over each actor's skills data when starting a New Game+?
 *
 * ---
 *
 * Compatibility
 * 
 *   Ability Points:
 *   - Carry over each actor's AP when starting a New Game+?
 *   - Requires VisuMZ_2_SkillLearnSystem
 * 
 *   Class Points:
 *   - Carry over each actor's CP when starting a New Game+?
 *   - Requires VisuMZ_2_ClassChangeSystem
 * 
 *   Job Points:
 *   - Carry over each actor's JP when starting a New Game+?
 *   - Requires VisuMZ_2_ClassChangeSystem
 * 
 *   Skill Points:
 *   - Carry over each actor's SP when starting a New Game+?
 *   - Requires VisuMZ_2_SkillLearnSystem
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Data Settings
 * ============================================================================
 *
 * This contains party data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Gold:
 *   - Carry over gold data when starting a New Game+?
 * 
 *   Items:
 *   - Carry over item data when starting a New Game+?
 * 
 *   Weapons:
 *   - Carry over weapon data when starting a New Game+?
 * 
 *   Armors:
 *   - Carry over armor data when starting a New Game+?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: System Data Settings
 * ============================================================================
 *
 * This contains system data that will be carried over when starting a
 * New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Playtime:
 *   - Carry over playtime data when starting a New Game+?
 * 
 *   Save Count:
 *   - Carry over save count data when starting a New Game+?
 * 
 *   Step Count:
 *   - Carry over step count data when starting a New Game+?
 * 
 *   Battle Count:
 *   - Carry over battle count data when starting a New Game+?
 * 
 *   Victory Count:
 *   - Carry over victory count data when starting a New Game+?
 * 
 *   Escape Count:
 *   - Carry over escape count data when starting a New Game+?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Carry Over Switches and Variables
 * ============================================================================
 *
 * When starting a New Game+, usually all of the data found in Switches and
 * Variables will be cleared out to an OFF flag and 0 value respectively. These
 * settings allow you to set exceptions for certain Switches and Variables to
 * retain their data when going into a New Game+.
 *
 * ---
 *
 * Settings
 * 
 *   Switches:
 *   - A list of switches to be carried over when starting a New Game+.
 * 
 *   Variables:
 *   - A list of variables to be carried over when starting a New Game+.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Scene_Save Settings
 * ============================================================================
 *
 * The settings for the Save Menu for New Game+ related entities.
 *
 * ---
 *
 * Settings
 * 
 *   Title Format:
 *   - Title format for a New Game+ file.
 *   - %1 - Save File ID
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Save New Game+ Help:
 *   - Text to display in the help file when saving for a New Game+ target.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: New Game+ Common Event Settings
 * ============================================================================
 *
 * When a New Game+ occurs, you can set the game to run a Common Event once
 * loaded into the map.
 *
 * ---
 *
 * Settings
 * 
 *   Common Event:
 *   - Select a Common Event to run after starting a New Game+.
 *   - Use 0 for no Common Event.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where New Game+ data did not carry over if the starting party
 *    did not have any actors in it. Fix made by Irina.
 * 
 * Version 1.04: May 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: April 2, 2021
 * * Bug Fixes!
 * ** Carrying over variables for a New Game+ should no longer cause crashes
 *    during the transition phase. Fix made by Arisu.
 * 
 * Version 1.02: February 12, 2021
 * * Bug Fixes!
 * ** Carry-Over Variables Plugin Parameter should now display Variables
 *    instead of Switches. Fix made by Irina.
 * ** Save files will no longer corrupt when carrying over uninitialized
 *    actors. Fix made by Irina.
 * 
 * Version 1.01: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00: January 20, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveNewGamePlus
 * @text Save: New Game+
 * @desc Opens up the Save menu for the player to save a New Game+ file.
 * Only works from map scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TransitionNewGamePlus
 * @text Transition: New Game+
 * @desc Transitions the current game directly into a New Game+.
 * Only works from map scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param NewGamePlus
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param CarryOver
 * @text Carry Over
 *
 * @param Actor:struct
 * @text Actor Data
 * @parent CarryOver
 * @type struct<Actor>
 * @desc This contains actor data that will be carried over when starting a New Game+.
 * @default {"General":"","CopyActor:eval":"true","EXP:eval":"true","Skills:eval":"true","Compatibility":"","AbilityPoints:eval":"true","ClassPoints:eval":"true","JobPoints:eval":"true","SkillPoints:eval":"true"}
 *
 * @param Party:struct
 * @text Party Data
 * @parent CarryOver
 * @type struct<Party>
 * @desc This contains party data that will be carried over when starting a New Game+.
 * @default {"Gold:eval":"true","Items:eval":"true","Weapons:eval":"true","Armors:eval":"true"}
 *
 * @param System:struct
 * @text System Data
 * @parent CarryOver
 * @type struct<System>
 * @desc This contains system data that will be carried over when starting a New Game+.
 * @default {"Playtime:eval":"true","SaveCount:eval":"true","StepCount:eval":"true","BattleCount:eval":"true","VictoryCount:eval":"true","EscapeCount:eval":"true"}
 * 
 * @param Switches:arraynum
 * @text Switches
 * @parent CarryOver
 * @type switch[]
 * @desc A list of switches to be carried over when starting a New Game+.
 * @default []
 * 
 * @param Variables:arraynum
 * @text Variables
 * @parent CarryOver
 * @type variable[]
 * @desc A list of variables to be carried over when starting a New Game+.
 * @default []
 *
 * @param SceneSave:struct
 * @text Scene_Save
 * @type struct<SceneSave>
 * @desc The settings for the Save Menu for New Game+ related entities.
 * @default {"TitleFmt:str":"File %1: NEW GAME+","TextColor:str":"6","SaveNewGamePlusHelp:str":"Which file would you like to save New Game+ to?"}
 * 
 * @param CommonEvent:num
 * @text New Game+ Common Event
 * @type common_event
 * @desc Select a Common Event to run after starting a New Game+.
 * Use 0 for no Common Event.
 * @default 0
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param General
 *
 * @param CopyActor:eval
 * @text Copy Actor?
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over all of each actor's settings when starting a New Game+?
 * @default true
 *
 * @param EXP:eval
 * @text EXP
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's EXP data when starting a New Game+?
 * @default true
 *
 * @param Skills:eval
 * @text Skills
 * @parent General
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's skills data when starting a New Game+?
 * @default true
 * 
 * @param Compatibility
 *
 * @param AbilityPoints:eval
 * @text Ability Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's AP when starting a New Game+?
 * Requires VisuMZ_2_SkillLearnSystem
 * @default true
 *
 * @param ClassPoints:eval
 * @text Class Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's CP when starting a New Game+?
 * Requires VisuMZ_2_ClassChangeSystem
 * @default true
 *
 * @param JobPoints:eval
 * @text Job Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's JP when starting a New Game+?
 * Requires VisuMZ_2_ClassChangeSystem
 * @default true
 *
 * @param SkillPoints:eval
 * @text Skill Points
 * @parent Compatibility
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over each actor's SP when starting a New Game+?
 * Requires VisuMZ_2_SkillLearnSystem
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Party Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Party:
 *
 * @param Gold:eval
 * @text Gold
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over gold data when starting a New Game+?
 * @default true
 *
 * @param Items:eval
 * @text Items
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over item data when starting a New Game+?
 * @default true
 *
 * @param Weapons:eval
 * @text Weapons
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over weapon data when starting a New Game+?
 * @default true
 *
 * @param Armors:eval
 * @text Armors
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over armor data when starting a New Game+?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * System Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~System:
 *
 * @param Playtime:eval
 * @text Playtime
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over playtime data when starting a New Game+?
 * @default true
 *
 * @param SaveCount:eval
 * @text Save Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over save count data when starting a New Game+?
 * @default true
 *
 * @param StepCount:eval
 * @text Step Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over step count data when starting a New Game+?
 * @default true
 *
 * @param BattleCount:eval
 * @text Battle Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over battle count data when starting a New Game+?
 * @default true
 *
 * @param VictoryCount:eval
 * @text Victory Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over victory count data when starting a New Game+?
 * @default true
 *
 * @param EscapeCount:eval
 * @text Escape Count
 * @type boolean
 * @on Carry Over
 * @off Ignore
 * @desc Carry over escape count data when starting a New Game+?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * SceneSave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SceneSave:
 *
 * @param TitleFmt:str
 * @text Title Format
 * @parent NewGamePlus
 * @desc Title format for a New Game+ file.
 * %1 - Save File ID
 * @default File %1: NEW GAME+
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent NewGamePlus
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param SaveNewGamePlusHelp:str
 * @text Save New Game+ Help
 * @parent NewGamePlus
 * @desc Text to display in the help file when saving for a New Game+ target.
 * @default Which file would you like to save New Game+ to?
 *
 */
//=============================================================================

const _0x36514e=_0x4657;(function(_0x33380b,_0x18b1c6){const _0x179e75=_0x4657,_0x2f4176=_0x33380b();while(!![]){try{const _0x4ef995=parseInt(_0x179e75(0x1b4))/0x1+parseInt(_0x179e75(0x1cd))/0x2+-parseInt(_0x179e75(0x1b1))/0x3+-parseInt(_0x179e75(0x1ca))/0x4+parseInt(_0x179e75(0x1b3))/0x5+parseInt(_0x179e75(0x178))/0x6+-parseInt(_0x179e75(0x20f))/0x7*(parseInt(_0x179e75(0x208))/0x8);if(_0x4ef995===_0x18b1c6)break;else _0x2f4176['push'](_0x2f4176['shift']());}catch(_0x4db257){_0x2f4176['push'](_0x2f4176['shift']());}}}(_0x451e,0x27aba));var label=_0x36514e(0x1df),tier=tier||0x0,dependencies=[_0x36514e(0x192)],pluginData=$plugins[_0x36514e(0x1fc)](function(_0x57c81e){const _0x1a39cc=_0x36514e;return _0x57c81e[_0x1a39cc(0x1d9)]&&_0x57c81e[_0x1a39cc(0x21f)][_0x1a39cc(0x187)]('['+label+']');})[0x0];VisuMZ[label][_0x36514e(0x1f8)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x36514e(0x202)]=function(_0x352771,_0x1ce967){const _0x53c3bd=_0x36514e;for(const _0x4aaabb in _0x1ce967){if(_0x4aaabb[_0x53c3bd(0x213)](/(.*):(.*)/i)){const _0x45838f=String(RegExp['$1']),_0x27cfa0=String(RegExp['$2'])[_0x53c3bd(0x223)]()[_0x53c3bd(0x199)]();let _0x41681a,_0x4d77e0,_0x3a2831;switch(_0x27cfa0){case _0x53c3bd(0x1ec):_0x41681a=_0x1ce967[_0x4aaabb]!==''?Number(_0x1ce967[_0x4aaabb]):0x0;break;case _0x53c3bd(0x20d):_0x4d77e0=_0x1ce967[_0x4aaabb]!==''?JSON['parse'](_0x1ce967[_0x4aaabb]):[],_0x41681a=_0x4d77e0[_0x53c3bd(0x176)](_0xcfe3d1=>Number(_0xcfe3d1));break;case _0x53c3bd(0x1b7):_0x41681a=_0x1ce967[_0x4aaabb]!==''?eval(_0x1ce967[_0x4aaabb]):null;break;case'ARRAYEVAL':_0x4d77e0=_0x1ce967[_0x4aaabb]!==''?JSON['parse'](_0x1ce967[_0x4aaabb]):[],_0x41681a=_0x4d77e0['map'](_0x3d3d14=>eval(_0x3d3d14));break;case'JSON':_0x41681a=_0x1ce967[_0x4aaabb]!==''?JSON[_0x53c3bd(0x17f)](_0x1ce967[_0x4aaabb]):'';break;case _0x53c3bd(0x1b8):_0x4d77e0=_0x1ce967[_0x4aaabb]!==''?JSON[_0x53c3bd(0x17f)](_0x1ce967[_0x4aaabb]):[],_0x41681a=_0x4d77e0[_0x53c3bd(0x176)](_0x3b6a6d=>JSON['parse'](_0x3b6a6d));break;case _0x53c3bd(0x1f5):_0x41681a=_0x1ce967[_0x4aaabb]!==''?new Function(JSON[_0x53c3bd(0x17f)](_0x1ce967[_0x4aaabb])):new Function('return\x200');break;case _0x53c3bd(0x1ba):_0x4d77e0=_0x1ce967[_0x4aaabb]!==''?JSON['parse'](_0x1ce967[_0x4aaabb]):[],_0x41681a=_0x4d77e0[_0x53c3bd(0x176)](_0x565f9d=>new Function(JSON[_0x53c3bd(0x17f)](_0x565f9d)));break;case _0x53c3bd(0x1c0):_0x41681a=_0x1ce967[_0x4aaabb]!==''?String(_0x1ce967[_0x4aaabb]):'';break;case _0x53c3bd(0x195):_0x4d77e0=_0x1ce967[_0x4aaabb]!==''?JSON['parse'](_0x1ce967[_0x4aaabb]):[],_0x41681a=_0x4d77e0[_0x53c3bd(0x176)](_0x28c0e1=>String(_0x28c0e1));break;case'STRUCT':_0x3a2831=_0x1ce967[_0x4aaabb]!==''?JSON[_0x53c3bd(0x17f)](_0x1ce967[_0x4aaabb]):{},_0x41681a=VisuMZ[_0x53c3bd(0x202)]({},_0x3a2831);break;case _0x53c3bd(0x1f3):_0x4d77e0=_0x1ce967[_0x4aaabb]!==''?JSON['parse'](_0x1ce967[_0x4aaabb]):[],_0x41681a=_0x4d77e0[_0x53c3bd(0x176)](_0x584ec2=>VisuMZ['ConvertParams']({},JSON[_0x53c3bd(0x17f)](_0x584ec2)));break;default:continue;}_0x352771[_0x45838f]=_0x41681a;}}return _0x352771;},(_0x305d67=>{const _0xb72ddd=_0x36514e,_0x1d7e8c=_0x305d67[_0xb72ddd(0x1f2)];for(const _0xdadbc8 of dependencies){if(!Imported[_0xdadbc8]){alert(_0xb72ddd(0x204)[_0xb72ddd(0x1e4)](_0x1d7e8c,_0xdadbc8)),SceneManager['exit']();break;}}const _0x3bb381=_0x305d67[_0xb72ddd(0x21f)];if(_0x3bb381['match'](/\[Version[ ](.*?)\]/i)){const _0x4bdb4a=Number(RegExp['$1']);_0x4bdb4a!==VisuMZ[label][_0xb72ddd(0x21b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x1d7e8c,_0x4bdb4a)),SceneManager[_0xb72ddd(0x183)]());}if(_0x3bb381[_0xb72ddd(0x213)](/\[Tier[ ](\d+)\]/i)){const _0x4155d8=Number(RegExp['$1']);_0x4155d8<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xb72ddd(0x1e4)](_0x1d7e8c,_0x4155d8,tier)),SceneManager[_0xb72ddd(0x183)]()):tier=Math[_0xb72ddd(0x18b)](_0x4155d8,tier);}VisuMZ[_0xb72ddd(0x202)](VisuMZ[label]['Settings'],_0x305d67[_0xb72ddd(0x1d4)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x36514e(0x18a),_0x3fdb27=>{const _0x598d9d=_0x36514e;if(!SceneManager[_0x598d9d(0x1a2)]())return;SceneManager[_0x598d9d(0x1e8)](Scene_SaveNewGamePlus);}),PluginManager['registerCommand'](pluginData[_0x36514e(0x1f2)],_0x36514e(0x212),_0x2620df=>{const _0x37c41f=_0x36514e;if(!SceneManager['isSceneMap']())return;SceneManager[_0x37c41f(0x1e8)](Scene_NewGamePlusTransition);}),DataManager['canNewGamePlusCarryOver']=function(_0x36ee6b){const _0x2e83ad=_0x36514e;if(!_0x36ee6b)return![];if(_0x36ee6b[_0x2e83ad(0x1ac)][_0x2e83ad(0x213)](/<NO NEW GAME\+ CARRY OVER>/i))return![];return!![];},VisuMZ[_0x36514e(0x1df)]['DataManager_makeSavefileInfo']=DataManager[_0x36514e(0x1d6)],DataManager[_0x36514e(0x1d6)]=function(){const _0x5906af=_0x36514e;var _0x47c9bb=VisuMZ[_0x5906af(0x1df)][_0x5906af(0x191)]['call'](this);return _0x47c9bb[_0x5906af(0x1ab)]=$gameSystem[_0x5906af(0x188)](),_0x47c9bb;},DataManager[_0x36514e(0x1f7)]=function(){const _0x421486=_0x36514e;this[_0x421486(0x1db)](),this[_0x421486(0x225)](),this['carryOverNewGamePlusData'](),this[_0x421486(0x190)]();},DataManager[_0x36514e(0x1db)]=function(){const _0x113506=_0x36514e;var _0x4d7539=$gameActors['_data'][_0x113506(0x173)];for(var _0x48ecd9=0x0;_0x48ecd9<_0x4d7539;++_0x48ecd9){var _0x907ed3=$gameActors[_0x113506(0x19b)][_0x48ecd9];if(_0x907ed3)_0x907ed3[_0x113506(0x194)]();}this[_0x113506(0x1bb)]={'switches':JsonEx['makeDeepCopy']($gameSwitches['_data']),'variables':JsonEx['makeDeepCopy']($gameVariables['_data']),'loops':$gameSystem[_0x113506(0x219)](),'playtime':$gameSystem['_framesOnSave'],'savecount':$gameSystem[_0x113506(0x218)](),'stepcount':$gameParty['steps'](),'battlecount':$gameSystem[_0x113506(0x1a8)],'victorycount':$gameSystem[_0x113506(0x1ff)],'escapecount':$gameSystem['_escapeCount'],'actors':JsonEx[_0x113506(0x20b)]($gameActors[_0x113506(0x19b)]),'gold':$gameParty['_gold'],'items':JsonEx[_0x113506(0x20b)]($gameParty[_0x113506(0x21a)]),'weapons':JsonEx[_0x113506(0x20b)]($gameParty[_0x113506(0x1c7)]),'armors':JsonEx['makeDeepCopy']($gameParty[_0x113506(0x1ea)])};},DataManager[_0x36514e(0x1c9)]=function(){const _0x3967e3=_0x36514e;this[_0x3967e3(0x1e1)](),this[_0x3967e3(0x1a1)](),this['carryOverNewGamePlusSystemData'](),this[_0x3967e3(0x17d)](),this[_0x3967e3(0x186)]();},DataManager[_0x36514e(0x1e1)]=function(){const _0x3880b1=_0x36514e;for(const _0x507a7e of VisuMZ[_0x3880b1(0x1df)][_0x3880b1(0x1f8)][_0x3880b1(0x1b5)]){if(_0x507a7e<=0x0)continue;$gameSwitches[_0x3880b1(0x1a0)](_0x507a7e,this['_ngpData'][_0x3880b1(0x174)][_0x507a7e]);}},DataManager['carryOverNewGamePlusVariables']=function(){const _0x3d1fd3=_0x36514e;for(const _0x4e1685 of VisuMZ['NewGamePlus'][_0x3d1fd3(0x1f8)][_0x3d1fd3(0x1a5)]){if(_0x4e1685<=0x0)continue;$gameVariables[_0x3d1fd3(0x1a0)](_0x4e1685,this[_0x3d1fd3(0x1bb)][_0x3d1fd3(0x1c6)][_0x4e1685]);}},DataManager[_0x36514e(0x1c1)]=function(){const _0x23cff4=_0x36514e,_0x4d14e8=VisuMZ['NewGamePlus'][_0x23cff4(0x1f8)][_0x23cff4(0x1be)];$gameSystem[_0x23cff4(0x1dc)](this[_0x23cff4(0x1bb)][_0x23cff4(0x221)]+0x1),$gameSystem[_0x23cff4(0x205)](!![]),_0x4d14e8[_0x23cff4(0x1e3)]&&($gameSystem['_framesOnSave']=this[_0x23cff4(0x1bb)]['playtime'],Graphics[_0x23cff4(0x1d2)]=this[_0x23cff4(0x1bb)][_0x23cff4(0x181)]),_0x4d14e8['SaveCount']&&($gameSystem[_0x23cff4(0x1ad)]=this['_ngpData']['savecount']),_0x4d14e8['StepCount']&&($gameParty['_steps']=this[_0x23cff4(0x1bb)][_0x23cff4(0x1aa)]),_0x4d14e8['BattleCount']&&($gameSystem[_0x23cff4(0x1a8)]=this[_0x23cff4(0x1bb)][_0x23cff4(0x21d)]),_0x4d14e8[_0x23cff4(0x1a6)]&&($gameSystem[_0x23cff4(0x1ff)]=this[_0x23cff4(0x1bb)]['victorycount']),_0x4d14e8[_0x23cff4(0x1fe)]&&($gameSystem[_0x23cff4(0x198)]=this[_0x23cff4(0x1bb)][_0x23cff4(0x1b0)]);},DataManager[_0x36514e(0x17d)]=function(){const _0x13b6fb=_0x36514e;var _0x4d35e4=this[_0x13b6fb(0x1bb)][_0x13b6fb(0x209)][_0x13b6fb(0x173)];for(var _0x477043=0x0;_0x477043<_0x4d35e4;++_0x477043){var _0x5b6fd6=$gameActors[_0x13b6fb(0x222)](_0x477043);_0x5b6fd6&&(_0x5b6fd6=this[_0x13b6fb(0x1f0)](_0x5b6fd6,_0x477043),_0x5b6fd6[_0x13b6fb(0x20c)]());}},DataManager[_0x36514e(0x1f0)]=function(_0x55ce42,_0x161b5f){const _0xdd6908=_0x36514e;if(!DataManager[_0xdd6908(0x1f9)](_0x55ce42[_0xdd6908(0x222)]()))return _0x55ce42;if(!this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f])return _0x55ce42;const _0x592f90=VisuMZ[_0xdd6908(0x1df)][_0xdd6908(0x1f8)][_0xdd6908(0x20e)];return _0x592f90['CopyActor']&&this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]&&($gameActors[_0xdd6908(0x19b)][_0x161b5f]=JsonEx['makeDeepCopy'](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]),_0x55ce42=$gameActors[_0xdd6908(0x19b)][_0x161b5f]),_0x592f90['EXP']&&this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]['_exp']?(_0x55ce42[_0xdd6908(0x1d1)]=JsonEx['makeDeepCopy'](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f][_0xdd6908(0x1d1)]),_0x55ce42['newGamePlusAdjustLevel']()):(_0x55ce42[_0xdd6908(0x1e6)]=_0x55ce42[_0xdd6908(0x222)]()['initialLevel'],_0x55ce42[_0xdd6908(0x1d1)]={},_0x55ce42['initExp']()),_0x592f90[_0xdd6908(0x203)]&&this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f][_0xdd6908(0x19f)]?_0x55ce42[_0xdd6908(0x19f)]=JsonEx['makeDeepCopy'](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]['_skills']):_0x55ce42[_0xdd6908(0x180)](),Imported['VisuMZ_2_SkillLearnSystem']&&(_0x592f90['AbilityPoints']&&this['_ngpData']['actors'][_0x161b5f][_0xdd6908(0x1c4)]?_0x55ce42[_0xdd6908(0x1c4)]=JsonEx[_0xdd6908(0x20b)](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]['_abilityPoints']):(_0x55ce42[_0xdd6908(0x1da)](),_0x55ce42[_0xdd6908(0x1bd)]()),_0x592f90[_0xdd6908(0x214)]&&this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f][_0xdd6908(0x17e)]?_0x55ce42[_0xdd6908(0x17e)]=JsonEx[_0xdd6908(0x20b)](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f][_0xdd6908(0x17e)]):(_0x55ce42[_0xdd6908(0x201)](),_0x55ce42[_0xdd6908(0x1b6)]())),Imported[_0xdd6908(0x1f4)]&&(_0x592f90[_0xdd6908(0x1d0)]&&this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]['_classPoints']?_0x55ce42[_0xdd6908(0x216)]=JsonEx['makeDeepCopy'](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f][_0xdd6908(0x216)]):(_0x55ce42[_0xdd6908(0x1a7)](),_0x55ce42[_0xdd6908(0x1c5)]()),_0x592f90[_0xdd6908(0x1ae)]&&this[_0xdd6908(0x1bb)]['actors'][_0x161b5f]['_jobPoints']?_0x55ce42[_0xdd6908(0x207)]=JsonEx[_0xdd6908(0x20b)](this[_0xdd6908(0x1bb)][_0xdd6908(0x209)][_0x161b5f]['_jobPoints']):(_0x55ce42[_0xdd6908(0x210)](),_0x55ce42[_0xdd6908(0x21e)]())),_0x55ce42;},DataManager[_0x36514e(0x186)]=function(){const _0x4d6cf3=_0x36514e,_0x443591=VisuMZ[_0x4d6cf3(0x1df)][_0x4d6cf3(0x1f8)][_0x4d6cf3(0x206)];_0x443591[_0x4d6cf3(0x1ce)]&&($gameParty['_gold']=this[_0x4d6cf3(0x1bb)][_0x4d6cf3(0x1d5)]),_0x443591[_0x4d6cf3(0x197)]&&($gameParty[_0x4d6cf3(0x21a)]=this[_0x4d6cf3(0x1bb)][_0x4d6cf3(0x1a4)]),_0x443591[_0x4d6cf3(0x184)]&&($gameParty[_0x4d6cf3(0x1c7)]=this[_0x4d6cf3(0x1bb)]['weapons']),_0x443591[_0x4d6cf3(0x1cf)]&&($gameParty[_0x4d6cf3(0x1ea)]=this[_0x4d6cf3(0x1bb)][_0x4d6cf3(0x1bc)]),$gameParty[_0x4d6cf3(0x1d8)]();},DataManager[_0x36514e(0x190)]=function(){const _0x52a2fe=_0x36514e,_0x4925fc=VisuMZ[_0x52a2fe(0x1df)]['Settings'],_0x365b37=_0x4925fc[_0x52a2fe(0x193)];if(_0x365b37<=0x0)return;$gameTemp[_0x52a2fe(0x18d)](_0x365b37);},TextManager[_0x36514e(0x1fa)]=VisuMZ[_0x36514e(0x1df)][_0x36514e(0x1f8)][_0x36514e(0x1b9)][_0x36514e(0x1e0)],TextManager[_0x36514e(0x185)]=VisuMZ[_0x36514e(0x1df)]['Settings']['SceneSave']['SaveNewGamePlusHelp'],ColorManager[_0x36514e(0x19c)]=function(_0x31e1e3){const _0x22514b=_0x36514e;return _0x31e1e3=String(_0x31e1e3),_0x31e1e3[_0x22514b(0x213)](/#(.*)/i)?'#%1'[_0x22514b(0x1e4)](String(RegExp['$1'])):this[_0x22514b(0x1ed)](Number(_0x31e1e3));},ColorManager['newGamePlusTitle']=function(){const _0x5d8be2=_0x36514e;return ColorManager[_0x5d8be2(0x19c)](VisuMZ['NewGamePlus'][_0x5d8be2(0x1f8)][_0x5d8be2(0x1b9)][_0x5d8be2(0x17b)]);},SceneManager[_0x36514e(0x1a2)]=function(){const _0x1d425a=_0x36514e;return this[_0x1d425a(0x179)]&&this[_0x1d425a(0x179)][_0x1d425a(0x19a)]===Scene_Map;},SceneManager[_0x36514e(0x19d)]=function(){const _0xd58951=_0x36514e;return this[_0xd58951(0x179)]&&this[_0xd58951(0x179)][_0xd58951(0x19a)]===Scene_SaveNewGamePlus;},VisuMZ['NewGamePlus'][_0x36514e(0x21c)]=Game_System[_0x36514e(0x1a3)][_0x36514e(0x19e)],Game_System['prototype'][_0x36514e(0x19e)]=function(){const _0x33cdbb=_0x36514e;VisuMZ[_0x33cdbb(0x1df)][_0x33cdbb(0x21c)][_0x33cdbb(0x1ee)](this),this[_0x33cdbb(0x1b2)]();},Game_System['prototype'][_0x36514e(0x1b2)]=function(){const _0x1f31d9=_0x36514e;this[_0x1f31d9(0x1e9)]=![],this[_0x1f31d9(0x1f1)]=0x0,this[_0x1f31d9(0x1fb)]=![];},Game_System['prototype']['isNewGamePlusEnabled']=function(){return SceneManager['isSceneNewGamePlus']();},Game_System[_0x36514e(0x1a3)][_0x36514e(0x219)]=function(){const _0x55ebae=_0x36514e;if(this[_0x55ebae(0x1f1)]===undefined)this['initNewGamePlusSettings']();return this[_0x55ebae(0x1f1)];},Game_System['prototype']['setNewGamePlusLoops']=function(_0x44e6ec){const _0x4e4b60=_0x36514e;if(this['_newGamePlusLoops']===undefined)this[_0x4e4b60(0x1b2)]();this[_0x4e4b60(0x1f1)]=_0x44e6ec;},Game_System[_0x36514e(0x1a3)][_0x36514e(0x18f)]=function(){const _0x4339fb=_0x36514e;if(this[_0x4339fb(0x1fb)]===undefined)this[_0x4339fb(0x1b2)]();return this['_newGamePlusLoaded'];},Game_System[_0x36514e(0x1a3)][_0x36514e(0x205)]=function(_0x5f717b){const _0x405dce=_0x36514e;if(this[_0x405dce(0x1fb)]===undefined)this[_0x405dce(0x1b2)]();this['_newGamePlusLoaded']=_0x5f717b;},Game_Actor[_0x36514e(0x1a3)][_0x36514e(0x1f6)]=function(){const _0x1fa6a3=_0x36514e;while(!this[_0x1fa6a3(0x17c)]()&&this['currentExp']()>=this[_0x1fa6a3(0x200)]()){this[_0x1fa6a3(0x20a)]();}while(this[_0x1fa6a3(0x17a)]()<this[_0x1fa6a3(0x217)]()){this[_0x1fa6a3(0x189)]();}},Game_Actor[_0x36514e(0x1a3)][_0x36514e(0x20c)]=function(){const _0x391919=_0x36514e,_0x25919b=this['actor']();this[_0x391919(0x1e7)]=_0x25919b[_0x391919(0x18e)],this[_0x391919(0x1fd)](_0x25919b['equips']),this[_0x391919(0x1de)](),this[_0x391919(0x1d7)]();},Game_Party[_0x36514e(0x1a3)][_0x36514e(0x1d8)]=function(){const _0x1aa0ed=_0x36514e;var _0x3a1c71=$gameParty[_0x1aa0ed(0x1d3)](),_0x4d3556=_0x3a1c71['length'];for(var _0x463948=0x0;_0x463948<_0x4d3556;++_0x463948){var _0x1aa5f2=_0x3a1c71[_0x463948];if(!_0x1aa5f2)continue;if(DataManager[_0x1aa0ed(0x1f9)](_0x1aa5f2))continue;var _0x50a0e3=$gameParty[_0x1aa0ed(0x224)](_0x1aa5f2);$gameParty[_0x1aa0ed(0x220)](_0x1aa5f2,_0x50a0e3);}},VisuMZ[_0x36514e(0x1df)][_0x36514e(0x211)]=Scene_Map['prototype'][_0x36514e(0x1c3)],Scene_Map[_0x36514e(0x1a3)]['needsSlowFadeOut']=function(){const _0x1438ad=_0x36514e;if(SceneManager[_0x1438ad(0x177)](Scene_NewGamePlusTransition))return!![];return VisuMZ['NewGamePlus']['Scene_Map_needsSlowFadeOut'][_0x1438ad(0x1ee)](this);},VisuMZ[_0x36514e(0x1df)][_0x36514e(0x1eb)]=Scene_Load[_0x36514e(0x1a3)][_0x36514e(0x1cb)],Scene_Load[_0x36514e(0x1a3)][_0x36514e(0x1cb)]=function(){const _0x464140=_0x36514e;this['_listWindow']&&this['_listWindow'][_0x464140(0x18c)](this[_0x464140(0x215)][_0x464140(0x1c8)]())?this['startNewGamePlus']():VisuMZ[_0x464140(0x1df)]['Scene_Load_onLoadSuccess'][_0x464140(0x1ee)](this);},Scene_Load[_0x36514e(0x1a3)][_0x36514e(0x1f7)]=function(){const _0x36ade2=_0x36514e;SoundManager['playLoad'](),DataManager[_0x36ade2(0x1f7)](),this[_0x36ade2(0x175)](),SceneManager[_0x36ade2(0x1c2)](Scene_Map);};function Scene_SaveNewGamePlus(){const _0x467366=_0x36514e;this[_0x467366(0x19e)](...arguments);}Scene_SaveNewGamePlus['prototype']=Object[_0x36514e(0x1a9)](Scene_Save[_0x36514e(0x1a3)]),Scene_SaveNewGamePlus[_0x36514e(0x1a3)][_0x36514e(0x19a)]=Scene_SaveNewGamePlus,Scene_SaveNewGamePlus[_0x36514e(0x1a3)][_0x36514e(0x1e2)]=function(){const _0x22903b=_0x36514e;return TextManager[_0x22903b(0x185)];};function Scene_NewGamePlusTransition(){const _0x56f834=_0x36514e;this[_0x56f834(0x19e)](...arguments);}function _0x4657(_0x113056,_0x436842){const _0x451e85=_0x451e();return _0x4657=function(_0x4657d9,_0x738895){_0x4657d9=_0x4657d9-0x173;let _0x402c20=_0x451e85[_0x4657d9];return _0x402c20;},_0x4657(_0x113056,_0x436842);}function _0x451e(){const _0x24758a=['newGamePlus','note','_saveCount','JobPoints','start','escapecount','829386vXQGub','initNewGamePlusSettings','1521530CmMtGj','193167phKFSm','Switches','gainStartingSkillPoints','EVAL','ARRAYJSON','SceneSave','ARRAYFUNC','_ngpData','armors','gainStartingAbilityPoints','System','drawNewGamePlusMarker','STR','carryOverNewGamePlusSystemData','goto','needsSlowFadeOut','_abilityPoints','gainStartingClassPoints','variables','_weapons','savefileId','carryOverNewGamePlusData','101716KShLNc','onLoadSuccess','newGamePlusTitle','277358XULrfF','Gold','Armors','ClassPoints','_exp','frameCount','allItems','parameters','gold','makeSavefileInfo','recoverAll','removeNewGamePlusNoCarryOverItems','status','initAbilityPoints','prepareNewGamePlusData','setNewGamePlusLoops','drawTitle','refresh','NewGamePlus','TitleFmt','carryOverNewGamePlusSwitches','helpWindowText','Playtime','format','changeTextColor','_level','_classId','push','_newGamePlusEnabled','_armors','Scene_Load_onLoadSuccess','NUM','textColor','call','width','copyNewGamePlusActorData','_newGamePlusLoops','name','ARRAYSTRUCT','VisuMZ_2_ClassChangeSystem','FUNC','newGamePlusAdjustLevel','startNewGamePlus','Settings','canNewGamePlusCarryOver','fileNewGamePlus','_newGamePlusLoaded','filter','initEquips','EscapeCount','_winCount','nextLevelExp','initSkillPoints','ConvertParams','Skills','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setNewGamePlusLoaded','Party','_jobPoints','1278968KgwQUs','actors','levelUp','makeDeepCopy','newGamePlusRefresh','ARRAYNUM','Actor','14FPpEFw','initJobPoints','Scene_Map_needsSlowFadeOut','TransitionNewGamePlus','match','SkillPoints','_listWindow','_classPoints','currentLevelExp','saveCount','getNewGamePlusLoops','_items','version','Game_System_initialize','battlecount','gainStartingJobPoints','description','loseItem','loops','actor','toUpperCase','numItems','setupNewGame','length','switches','fadeOutAll','map','isNextScene','887826LMdPfT','_scene','currentExp','TextColor','isMaxLevel','carryOverNewGamePlusActors','_skillPoints','parse','initSkills','playtime','drawText','exit','Weapons','helpNewGamePlus','carryOverNewGamePlusPartyData','includes','isNewGamePlusEnabled','levelDown','SaveNewGamePlus','max','isNewGamePlus','reserveCommonEvent','classId','isNewGamePlusLoaded','runNewGamePlusCommonEvent','DataManager_makeSavefileInfo','VisuMZ_1_SaveCore','CommonEvent','clearEquipments','ARRAYSTR','savefileInfo','Items','_escapeCount','trim','constructor','_data','getColor','isSceneNewGamePlus','initialize','_skills','setValue','carryOverNewGamePlusVariables','isSceneMap','prototype','items','Variables','VictoryCount','initClassPoints','_battleCount','create','stepcount'];_0x451e=function(){return _0x24758a;};return _0x451e();}Scene_NewGamePlusTransition[_0x36514e(0x1a3)]=Object[_0x36514e(0x1a9)](Scene_Base[_0x36514e(0x1a3)]),Scene_NewGamePlusTransition[_0x36514e(0x1a3)]['constructor']=Scene_NewGamePlusTransition,Scene_NewGamePlusTransition[_0x36514e(0x1a3)]['initialize']=function(){const _0x447076=_0x36514e;Scene_Base[_0x447076(0x1a3)][_0x447076(0x19e)]['call'](this);},Scene_NewGamePlusTransition[_0x36514e(0x1a3)][_0x36514e(0x1af)]=function(){const _0x17ed8e=_0x36514e;DataManager[_0x17ed8e(0x1f7)](),SceneManager[_0x17ed8e(0x1c2)](Scene_Map);},Window_SavefileList['prototype']['isNewGamePlus']=function(_0x5af52e){const _0x5c5e5f=_0x36514e;if(_0x5af52e===0x0)return![];const _0x1450e4=DataManager[_0x5c5e5f(0x196)](_0x5af52e);return _0x1450e4&&_0x1450e4['newGamePlus'];},VisuMZ[_0x36514e(0x1df)]['Window_SavefileList_drawTitle']=Window_SavefileList[_0x36514e(0x1a3)][_0x36514e(0x1dd)],Window_SavefileList[_0x36514e(0x1a3)][_0x36514e(0x1dd)]=function(_0x2b89b7,_0x2fb3d0,_0x934db3){const _0x2afefb=_0x36514e;this['isNewGamePlus'](_0x2b89b7)?this[_0x2afefb(0x1bf)](_0x2b89b7,_0x2fb3d0,_0x934db3):VisuMZ[_0x2afefb(0x1df)]['Window_SavefileList_drawTitle'][_0x2afefb(0x1ee)](this,_0x2b89b7,_0x2fb3d0,_0x934db3);},Window_SavefileList[_0x36514e(0x1a3)][_0x36514e(0x1bf)]=function(_0x5ea4c7,_0x14351f,_0x540252){const _0x279a2a=_0x36514e;if(_0x5ea4c7===0x0)return;const _0x4e96e9=this['itemRectWithPadding'](_0x5ea4c7),_0x367e1f=TextManager[_0x279a2a(0x1fa)][_0x279a2a(0x1e4)](_0x5ea4c7);this[_0x279a2a(0x1e5)](ColorManager[_0x279a2a(0x1cc)]()),this[_0x279a2a(0x182)](_0x367e1f,_0x14351f,_0x540252,Math[_0x279a2a(0x18b)](0xb4,_0x4e96e9[_0x279a2a(0x1ef)]-0xb4));};