//=============================================================================
// VisuStella MZ - Weakness Display
// VisuMZ_3_WeaknessDisplay.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaknessDisplay = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessDisplay = VisuMZ.WeaknessDisplay || {};
VisuMZ.WeaknessDisplay.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [WeaknessDisplay]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Display_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ElementStatusCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ElementStatusCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a display in battle to show enemy elemental weaknesses.
 * These weaknesses will start off hidden and will be slowly revealed whenever
 * the respective enemies receive elemental damage of the correct type. This
 * way, your players no longer have to jot down mental notes on what enemies
 * are weak to which elements, and instead, have access to their pool of
 * discovered knowledge right at the screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * The Weakness Display is a new UI element added below each enemy.
 * * The display will reveal each of the elemental weaknesses an enemy has.
 * * The elements will be hidden at first but will be slowly revealed as the
 *   player hits the enemies with the correct element type.
 * * Players can use Analyze Weakness effects to reveal weaknesses without
 *   needing to hit them directly.
 * * Adjust the positions, icons, and elements for the Weakness Display to fit
 *   your game.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ElementStatusCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_BoostAction
 *
 * The VisuStella MZ Boost Action plugin contains a notetag that allows the
 * Weakness Display's Analyze effect to trigger multiple times. This notetag
 * is <Boost Analyze> and its potency is dependent on the Plugin Parameter
 * settings found in the Boost Action plugin.
 *
 * ---
 * 
 * VisuMZ_4_BreakShields
 * 
 * The VisuStella MZ Break Shields plugin has a game mechanic to protect one's
 * elemental weaknesses. The protected elements will show up in the Weakness
 * Display and have a special icon on top of them.
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
 * === Analyze-Related Notetags ===
 * 
 * ---
 *
 * <Analyze Weakness: x>
 * <Analyze Weaknesses: x>
 *
 * - Used for: Skill, Item Notetags
 * - Reveals 'x' amount of elemental weaknesses the target enemy may have
 *   without needing to hit the enemy with the said elemental weakness first.
 * - Replace 'x' with a number representing the number of weaknesses to reveal
 *   through this action.
 * - This has no effect on actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings regarding the Weakness Display plugin. They
 * allow you to adjust which elements appear and which icons to assign to them.
 * They also let you control which icons to use for the various display parts.
 *
 * ---
 *
 * Elements
 * 
 *   Shown Elements:
 *   - This is a list of the Element ID's you wish to display.
 *   - If this is empty, this will show all database elements.
 * 
 *   Element Icons:
 *   - Icon ID's used for each Element ID in order.
 *   - Priority will be given to elements with \I[x] in their names.
 * 
 *     Auto-Assign Icons:
 *     - Automatically assign icons if they do not show up in the
 *       Plugin Parameter settings based on their English names?
 *     - Icons will be automatically assigned based on the default icon sheet
 *       for the following elements if their names are detected:
 *       - Air, Aqua, Axe, Blade, Bow, Claw, Crossbow, Cure, Dagger, Dark,
 *         Earth, Energy, Evil, Fire, Flame, Frost, Glove, Ground, Gun, Heal,
 *         Holy, Ice, Knife, Light, Lightning, Mace, Magic, Mana, Melee,
 *         Polearm, Power, Physical, Sacred, Spear, Staff, Sword, Thunder,
 *         Wand, Water, Whip, Wind
 *       - Unlisted element names will default to icon index 160.
 *
 * ---
 *
 * Icons
 * 
 *   Background Icon:
 *   - Which icon index do you wish to use to assign as the background for the
 *     Weakness Display icons?
 * 
 *   Unknown Icon:
 *   - Which icon index do you wish to use to assign as the unknown marker for
 *     the Weakness Display icons?
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Display Settings
 * ============================================================================
 *
 * These are the settings regarding how the Weakness Display UI elements behave
 * in-game. Adjust them to make them fit the visuals for your battle system.
 *
 * ---
 *
 * Display UI
 * 
 *   Icon Scale:
 *   - Scale up or down the display UI.
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Always Visible?:
 *   - Do you wish to make the Weakness Display always visible?
 * 
 *   Temporary Duration:
 *   - If not always visible, how many frames will the Weakness Display be
 *     temporarily visible?
 *   - 60 frames = 1 second.
 * 
 *   Temporary Selection?:
 *   - Determines the conditions for Weakness Display visibility.
 *     - Visible when Selected
 *     - Visible when Targeting
 *
 * ---
 *
 * Positioning
 * 
 *   Offset X/Y:
 *   - How much to offset the Weakness Display X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.02: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a problem with Plugin Parameter "Temporary Selection?" not working
 *    properly with specific layouts. Fix made by Olivia.
 * 
 * Version 1.01: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia and sponsored by NSG:
 * *** Display Settings > Always Visible? > Temporary Selection?
 * **** Determines the conditions for Weakness Display visibility.
 * 
 * Version 1.00 Official Release Date: April 28, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableWeaknessDisplayMenu
 * @text System: Enable WeaknessDisplay in Menu?
 * @desc Enables/disables WeaknessDisplay menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables WeaknessDisplay menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowWeaknessDisplayMenu
 * @text System: Show WeaknessDisplay in Menu?
 * @desc Shows/hides WeaknessDisplay menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides WeaknessDisplay menu inside the main menu.
 * @default true
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
 * @param WeaknessDisplay
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc These are the general settings regarding the Weakness Display.
 * @default {"Elements":"","ShownElements:arraynum":"[]","ElementIcons:arraynum":"[]","AutoIcon:eval":"true","Icons":"","BackgroundIcon:num":"16","UnknownIcon:num":"188","SmoothIcons:eval":"true"}
 *
 * @param Display:struct
 * @text Display Settings
 * @type struct<Display>
 * @desc These are the display settings regarding the Weakness Display UI.
 * @default {"DisplayUI":"","IconScale:num":"0.75","AlwaysVisible:eval":"false","TempDuration:num":"90","Positioning":"","DisplayOffsetX:num":"+0","DisplayOffsetY:num":"+0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Elements
 *
 * @param ShownElements:arraynum
 * @text Shown Elements
 * @parent Elements
 * @type number[]
 * @desc This is a list of the Element ID's you wish to display.
 * If this is empty, this will show all elements.
 * @default []
 *
 * @param ElementIcons:arraynum
 * @text Element Icons
 * @parent Elements
 * @type number[]
 * @desc Icon ID's used for each Element ID in order. Priority will
 * be given to elements with \I[x] in their names.
 * @default []
 *
 * @param AutoIcon:eval
 * @text Auto-Assign Icons
 * @parent ElementIcons:arraynum
 * @type boolean
 * @on Auto-Assign
 * @off Nothing
 * @desc Automatically assign icons if they do not show up in the
 * Plugin Parameter settings based on their English names?
 * @default true
 *
 * @param Icons
 *
 * @param BackgroundIcon:num
 * @text Background Icon
 * @parent Icons
 * @desc Which icon index do you wish to use to assign as the
 * background for the Weakness Display icons?
 * @default 16
 *
 * @param UnknownIcon:num
 * @text Unknown Icon
 * @parent Icons
 * @desc Which icon index do you wish to use to assign as the
 * unknown marker for the Weakness Display icons?
 * @default 188
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Display:
 *
 * @param DisplayUI
 * @text Display UI
 *
 * @param IconScale:num
 * @text Icon Scale
 * @parent DisplayUI
 * @desc Scale up or down the display UI.
 * Use a number between 0 and 1 for the best results.
 * @default 0.75
 *
 * @param AlwaysVisible:eval
 * @text Always Visible?
 * @parent DisplayUI
 * @type boolean
 * @on Always Visible
 * @off Temporarily
 * @desc Do you wish to make the Weakness Display always visible?
 * @default false
 *
 * @param TempDuration:num
 * @text Temporary Duration
 * @parent AlwaysVisible:eval
 * @type number
 * @desc If not always visible, how many frames will the Weakness
 * Display be temporarily visible? 60 frames = 1 second.
 * @default 90
 *
 * @param TempSelect:eval
 * @text Temporary Selection?
 * @parent AlwaysVisible:eval
 * @type boolean
 * @on Visible when Selected
 * @off Visible when Targeting
 * @desc Determines the conditions for Weakness Display visibility.
 * @default false
 *
 * @param Positioning
 *
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent Positioning
 * @desc How much to offset the Weakness Display X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent Positioning
 * @desc How much to offset the Weakness Display Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

const _0x490c62=_0x58f8;(function(_0x550891,_0x243382){const _0x47577e=_0x58f8,_0x4776cb=_0x550891();while(!![]){try{const _0x105b37=parseInt(_0x47577e(0x14c))/0x1*(-parseInt(_0x47577e(0x1ad))/0x2)+parseInt(_0x47577e(0x21c))/0x3*(-parseInt(_0x47577e(0x162))/0x4)+-parseInt(_0x47577e(0x196))/0x5*(-parseInt(_0x47577e(0x166))/0x6)+parseInt(_0x47577e(0x222))/0x7*(parseInt(_0x47577e(0x1f5))/0x8)+-parseInt(_0x47577e(0x1e7))/0x9*(-parseInt(_0x47577e(0x22b))/0xa)+parseInt(_0x47577e(0x180))/0xb+parseInt(_0x47577e(0x1bf))/0xc*(parseInt(_0x47577e(0x189))/0xd);if(_0x105b37===_0x243382)break;else _0x4776cb['push'](_0x4776cb['shift']());}catch(_0x6be746){_0x4776cb['push'](_0x4776cb['shift']());}}}(_0xe774,0x595db));var label=_0x490c62(0x1a6),tier=tier||0x0,dependencies=[_0x490c62(0x153),_0x490c62(0x1fb)],pluginData=$plugins[_0x490c62(0x15d)](function(_0x49024c){const _0x24508b=_0x490c62;return _0x49024c['status']&&_0x49024c[_0x24508b(0x167)][_0x24508b(0x209)]('['+label+']');})[0x0];VisuMZ[label][_0x490c62(0x1a2)]=VisuMZ[label][_0x490c62(0x1a2)]||{},VisuMZ['ConvertParams']=function(_0x431861,_0x3f4e53){const _0x56a09e=_0x490c62;for(const _0x4fe5a3 in _0x3f4e53){if(_0x56a09e(0x1df)!==_0x56a09e(0x1df))this[_0x56a09e(0x16a)]=_0xaac623,_0x381410[_0x56a09e(0x1d8)]['initialize'][_0x56a09e(0x1fc)](this),this[_0x56a09e(0x1a1)](),this[_0x56a09e(0x147)]();else{if(_0x4fe5a3[_0x56a09e(0x19c)](/(.*):(.*)/i)){const _0x152aa0=String(RegExp['$1']),_0x61311f=String(RegExp['$2'])[_0x56a09e(0x1be)]()[_0x56a09e(0x182)]();let _0xe42229,_0x553c2b,_0x216b20;switch(_0x61311f){case'NUM':_0xe42229=_0x3f4e53[_0x4fe5a3]!==''?Number(_0x3f4e53[_0x4fe5a3]):0x0;break;case'ARRAYNUM':_0x553c2b=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):[],_0xe42229=_0x553c2b[_0x56a09e(0x208)](_0x35dd98=>Number(_0x35dd98));break;case _0x56a09e(0x193):_0xe42229=_0x3f4e53[_0x4fe5a3]!==''?eval(_0x3f4e53[_0x4fe5a3]):null;break;case _0x56a09e(0x1c2):_0x553c2b=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):[],_0xe42229=_0x553c2b['map'](_0x5893c5=>eval(_0x5893c5));break;case _0x56a09e(0x19b):_0xe42229=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):'';break;case _0x56a09e(0x1dd):_0x553c2b=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):[],_0xe42229=_0x553c2b[_0x56a09e(0x208)](_0x229097=>JSON[_0x56a09e(0x1c4)](_0x229097));break;case'FUNC':_0xe42229=_0x3f4e53[_0x4fe5a3]!==''?new Function(JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3])):new Function('return\x200');break;case _0x56a09e(0x18c):_0x553c2b=_0x3f4e53[_0x4fe5a3]!==''?JSON['parse'](_0x3f4e53[_0x4fe5a3]):[],_0xe42229=_0x553c2b[_0x56a09e(0x208)](_0x2d8f72=>new Function(JSON[_0x56a09e(0x1c4)](_0x2d8f72)));break;case _0x56a09e(0x1c7):_0xe42229=_0x3f4e53[_0x4fe5a3]!==''?String(_0x3f4e53[_0x4fe5a3]):'';break;case _0x56a09e(0x20e):_0x553c2b=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):[],_0xe42229=_0x553c2b[_0x56a09e(0x208)](_0x4d072=>String(_0x4d072));break;case _0x56a09e(0x1d3):_0x216b20=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):{},_0xe42229=VisuMZ[_0x56a09e(0x191)]({},_0x216b20);break;case'ARRAYSTRUCT':_0x553c2b=_0x3f4e53[_0x4fe5a3]!==''?JSON[_0x56a09e(0x1c4)](_0x3f4e53[_0x4fe5a3]):[],_0xe42229=_0x553c2b['map'](_0x54fa48=>VisuMZ[_0x56a09e(0x191)]({},JSON[_0x56a09e(0x1c4)](_0x54fa48)));break;default:continue;}_0x431861[_0x152aa0]=_0xe42229;}}}return _0x431861;},(_0x2f71ba=>{const _0x2f763a=_0x490c62,_0x57d7e5=_0x2f71ba[_0x2f763a(0x1b3)];for(const _0x4586a3 of dependencies){if(!Imported[_0x4586a3]){alert(_0x2f763a(0x19d)[_0x2f763a(0x16e)](_0x57d7e5,_0x4586a3)),SceneManager['exit']();break;}}const _0x54b39c=_0x2f71ba['description'];if(_0x54b39c['match'](/\[Version[ ](.*?)\]/i)){const _0x5ac768=Number(RegExp['$1']);if(_0x5ac768!==VisuMZ[label][_0x2f763a(0x1de)]){if(_0x2f763a(0x19f)!==_0x2f763a(0x19f))return 0x45;else alert(_0x2f763a(0x159)['format'](_0x57d7e5,_0x5ac768)),SceneManager[_0x2f763a(0x1f3)]();}}if(_0x54b39c[_0x2f763a(0x19c)](/\[Tier[ ](\d+)\]/i)){if(_0x2f763a(0x20c)===_0x2f763a(0x176))return _0x37e2d9[_0x2f763a(0x143)][_0x2f763a(0x1a2)][_0x2f763a(0x151)][_0x2f763a(0x21d)]?this[_0x2f763a(0x160)][_0x2f763a(0x20d)]():_0xa5914b[_0x2f763a(0x174)][_0x2f763a(0x144)]&&_0x3e809b['_scene'][_0x2f763a(0x144)][_0x2f763a(0x1fd)]&&_0x18e1d9['_scene'][_0x2f763a(0x144)][_0x2f763a(0x18a)][_0x2f763a(0x209)](this[_0x2f763a(0x160)]);else{const _0x4344e5=Number(RegExp['$1']);_0x4344e5<tier?_0x2f763a(0x187)===_0x2f763a(0x221)?this['opacity']=0x0:(alert(_0x2f763a(0x17e)['format'](_0x57d7e5,_0x4344e5,tier)),SceneManager[_0x2f763a(0x1f3)]()):tier=Math[_0x2f763a(0x1d0)](_0x4344e5,tier);}}VisuMZ[_0x2f763a(0x191)](VisuMZ[label]['Settings'],_0x2f71ba[_0x2f763a(0x226)]);})(pluginData),VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x169)]={'AnalyzeEffect':/<ANALYZE (?:WEAKNESS|WEAKNESSES): (\d+)>/i},DataManager['WEAKNESS_DISPLAY_SHOWN_ELEMENTS']=VisuMZ['WeaknessDisplay']['Settings'][_0x490c62(0x1a8)][_0x490c62(0x1f8)],DataManager[_0x490c62(0x199)]=function(){const _0x5ebc4f=_0x490c62;if(this[_0x5ebc4f(0x1ef)]!==undefined)return _0x5ebc4f(0x1f4)===_0x5ebc4f(0x1e0)?this[_0x5ebc4f(0x160)][_0x5ebc4f(0x20d)]():this[_0x5ebc4f(0x1ef)];let _0x34da4d=DataManager[_0x5ebc4f(0x1ee)];const _0x3dbf02=_0x34da4d['length']>0x0?_0x34da4d:[...Array($dataSystem[_0x5ebc4f(0x1bd)][_0x5ebc4f(0x1cd)]-0x1)[_0x5ebc4f(0x1af)]()]['map'](_0xca35bf=>_0xca35bf+0x1);return this[_0x5ebc4f(0x1ef)]=_0x3dbf02[_0x5ebc4f(0x15d)](_0x444fb6=>ImageManager[_0x5ebc4f(0x171)](_0x444fb6)>0x0),this[_0x5ebc4f(0x1ef)];},ImageManager[_0x490c62(0x145)]=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)]['General']['ElementIcons'],ImageManager[_0x490c62(0x155)]=VisuMZ[_0x490c62(0x1a6)]['Settings'][_0x490c62(0x1a8)][_0x490c62(0x177)],ImageManager['WEAKNESS_DISPLAY_BACKGROUND_ICON']=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)][_0x490c62(0x1a8)][_0x490c62(0x1bc)],ImageManager[_0x490c62(0x152)]=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)]['General']['UnknownIcon'],ImageManager[_0x490c62(0x1eb)]=VisuMZ[_0x490c62(0x1a6)]['Settings']['General'][_0x490c62(0x210)],ImageManager[_0x490c62(0x171)]=function(_0x282847){const _0x3b67ce=_0x490c62;!this[_0x3b67ce(0x220)]&&(this['_weaknessDisplayUnshiftedElementIcons']=!![],ImageManager[_0x3b67ce(0x145)][_0x3b67ce(0x1d2)](0x0));const _0x8ff671=$dataSystem[_0x3b67ce(0x1bd)][_0x282847];if(_0x8ff671['match'](/\\I\[(\d+)\]/i))return'nJUTL'==='nJUTL'?Number(RegExp['$1']):![];else{if(ImageManager['WEAKNESS_DISPLAY_ELEMENT_ICONS'][_0x282847]){if('SyxdI'===_0x3b67ce(0x195))this[_0x3b67ce(0x158)]=0x0;else return ImageManager[_0x3b67ce(0x145)][_0x282847];}else{if(ImageManager[_0x3b67ce(0x155)]){if(_0x8ff671['match'](/(?:FIRE|FLAME)/i)){if(_0x3b67ce(0x173)!==_0x3b67ce(0x1f7))return 0x40;else this['_uiContainer'][_0x3b67ce(0x1f6)](this[_0x3b67ce(0x1e6)]);}else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:ICE|FROST)/i))return 0x41;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:THUNDER|LIGHTNING)/i)){if(_0x3b67ce(0x1d7)!=='Dtzxt')return 0x42;else _0x26b8fe?this[_0x3b67ce(0x1b1)]=_0x4ca33e['getWeaknessDisplayElementIcon'](this[_0x3b67ce(0x16a)]):this[_0x3b67ce(0x1b1)]=_0xf182d1[_0x3b67ce(0x152)];}else{if(_0x8ff671['match'](/(?:WATER|AQUA)/i))return 0x43;else{if(_0x8ff671['match'](/(?:EARTH|GROUND)/i))return 0x44;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:WIND|AIR)/i))return'ExjMi'!==_0x3b67ce(0x157)?0x40:0x45;else{if(_0x8ff671['match'](/(?:HOLY|LIGHT|SACRED)/i))return 0x46;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:DARK|EVIL)/i))return 0x47;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:HEAL|CURE)/i))return 0x48;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:PHYS|MELEE)/i))return 0x4d;else{if(_0x8ff671['match'](/(?:ENERGY|POWER)/i))return 0x4e;else{if(_0x8ff671['match'](/(?:MAGIC|MANA)/i))return 0x4f;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:DAGGER|KNIFE)/i))return 0x60;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:SWORD|BLADE)/i))return 0x61;else{if(_0x8ff671['match'](/(?:MACE|MORNING)/i))return'CYaOC'===_0x3b67ce(0x1e4)?0x47:0x62;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:AXE)/i))return'CVmMu'!==_0x3b67ce(0x214)?0x63:0x62;else{if(_0x8ff671['match'](/(?:WHIP)/i)){if(_0x3b67ce(0x188)===_0x3b67ce(0x215))_0x391516<0x0?this[_0x3b67ce(0x1d1)]=0x0:(this[_0x3b67ce(0x1d1)]=0xff,this['x']=_0x118cd3[_0x3b67ce(0x1e9)]*_0x1e41a8);else return 0x64;}else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:WAND|STAFF)/i))return _0x3b67ce(0x1ab)!==_0x3b67ce(0x207)?0x65:0x68;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:CROSSBOW)/i)){if('iRwJa'===_0x3b67ce(0x17d))for(const _0x3fcb46 of this[_0x3b67ce(0x1bd)]()){_0x3fcb46>0x0&&_0x472e9a[_0x3b67ce(0x203)](_0x58ad2d['enemyId'](),_0x3fcb46);}else return 0x67;}else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:BOW)/i))return 0x66;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:GUN)/i))return 0x68;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:CLAW)/i))return 0x69;else{if(_0x8ff671[_0x3b67ce(0x19c)](/(?:GLOVE)/i))return _0x3b67ce(0x14e)==='TyxDA'?0x48:0x6a;else return _0x8ff671[_0x3b67ce(0x19c)](/(?:SPEAR|POLE)/i)?_0x3b67ce(0x1ff)!==_0x3b67ce(0x15e)?0x6b:this[_0x3b67ce(0x186)]():_0x3b67ce(0x1e1)!==_0x3b67ce(0x1c1)?0xa0:0x4f;}}}}}}}}}}}}}}}}}}}}}}}else return 0x0;}}},ImageManager[_0x490c62(0x190)]=function(){const _0xcffb56=_0x490c62;if(!this[_0xcffb56(0x14a)]){this[_0xcffb56(0x14a)]=new Bitmap();const _0x57881=ImageManager[_0xcffb56(0x179)](_0xcffb56(0x18e));_0x57881[_0xcffb56(0x1c3)](this[_0xcffb56(0x1e8)][_0xcffb56(0x21f)](this,_0x57881));}return this[_0xcffb56(0x14a)];},ImageManager[_0x490c62(0x1e8)]=function(_0xf8c7e6){const _0x371a47=_0x490c62;this[_0x371a47(0x14a)][_0x371a47(0x1a4)](_0xf8c7e6[_0x371a47(0x21a)],_0xf8c7e6[_0x371a47(0x1e5)]),this['_weaknessDisplayIconSheet'][_0x371a47(0x1ca)](_0xf8c7e6,0x0,0x0,_0xf8c7e6[_0x371a47(0x21a)],_0xf8c7e6[_0x371a47(0x1e5)],0x0,0x0),this[_0x371a47(0x14a)][_0x371a47(0x184)]=ImageManager['WEAKNESS_DISPLAY_SMOOTHING'],this[_0x371a47(0x14a)][_0x371a47(0x206)]=![];},BattleManager['revealWeakness']=function(_0x4f0ceb){const _0x1d4cad=_0x490c62;var _0xac8c4e=$gameTroop[_0x1d4cad(0x17c)](),_0x30a839=[];for(var _0x44553c=0x0;_0x44553c<_0xac8c4e['length'];_0x44553c++){var _0x2a9124=_0xac8c4e[_0x44553c];!!_0x2a9124&&!_0x30a839['contains'](_0x2a9124[_0x1d4cad(0x1c9)]())&&(_0x2a9124[_0x1d4cad(0x1ac)](_0x4f0ceb),_0x30a839[_0x1d4cad(0x146)](_0x2a9124[_0x1d4cad(0x1c9)]()));}},VisuMZ['WeaknessDisplay'][_0x490c62(0x14d)]=Game_Temp[_0x490c62(0x1d8)]['requestAnimation'],Game_Temp['prototype']['requestAnimation']=function(_0x55632d,_0xc4c1e4,_0x48590b=![]){const _0x1de7cf=_0x490c62;VisuMZ[_0x1de7cf(0x1a6)][_0x1de7cf(0x14d)]['call'](this,_0x55632d,_0xc4c1e4,_0x48590b);if(!SceneManager[_0x1de7cf(0x175)]())return;for(const _0x5ab1f7 of _0x55632d){if(_0x1de7cf(0x1d4)==='CmaxB')_0x5a6c01[_0x1de7cf(0x141)](-0x1);else{if(!_0x5ab1f7)continue;_0x5ab1f7[_0x1de7cf(0x202)]()&&_0x5ab1f7['revealWeaknessDisplay']();}}},VisuMZ['WeaknessDisplay'][_0x490c62(0x1b2)]=Game_System[_0x490c62(0x1d8)][_0x490c62(0x20a)],Game_System[_0x490c62(0x1d8)]['initialize']=function(){const _0x4a7598=_0x490c62;VisuMZ[_0x4a7598(0x1a6)]['Game_System_initialize'][_0x4a7598(0x1fc)](this),this[_0x4a7598(0x18f)]();},Game_System[_0x490c62(0x1d8)]['initializeRevealedEnemyWeaknesses']=function(){const _0x7abbf8=_0x490c62;this[_0x7abbf8(0x1c5)]=this[_0x7abbf8(0x1c5)]||{};},Game_System[_0x490c62(0x1d8)][_0x490c62(0x203)]=function(_0x1fea74,_0x58d396){const _0x180078=_0x490c62;this['_revealedEnemyWeaknesses']===undefined&&this['initializeRevealedEnemyWeaknesses'](),this[_0x180078(0x1c5)][_0x1fea74]=this[_0x180078(0x1c5)][_0x1fea74]||[],!this['_revealedEnemyWeaknesses'][_0x1fea74][_0x180078(0x149)](_0x58d396)&&this[_0x180078(0x1c5)][_0x1fea74]['push'](_0x58d396),this[_0x180078(0x1c5)][_0x1fea74][_0x180078(0x229)](function(_0x494aed,_0x1e5150){return _0x494aed-_0x1e5150;});},Game_System[_0x490c62(0x1d8)][_0x490c62(0x1c8)]=function(_0x11b309){const _0x46a2a9=_0x490c62;return this[_0x46a2a9(0x1c5)]===undefined&&this[_0x46a2a9(0x18f)](),this[_0x46a2a9(0x1c5)][_0x11b309]=this[_0x46a2a9(0x1c5)][_0x11b309]||[],this['_revealedEnemyWeaknesses'][_0x11b309];},VisuMZ['WeaknessDisplay'][_0x490c62(0x1a3)]=Game_Action[_0x490c62(0x1d8)]['apply'],Game_Action[_0x490c62(0x1d8)][_0x490c62(0x1c0)]=function(_0x3e05e1){const _0x2ecf84=_0x490c62;VisuMZ['WeaknessDisplay'][_0x2ecf84(0x1a3)][_0x2ecf84(0x1fc)](this,_0x3e05e1),_0x3e05e1[_0x2ecf84(0x1b4)]();},VisuMZ['WeaknessDisplay'][_0x490c62(0x1ae)]=Game_Action['prototype'][_0x490c62(0x213)],Game_Action[_0x490c62(0x1d8)][_0x490c62(0x213)]=function(_0x1547b3,_0x1a81fc){const _0x4658f6=_0x490c62;VisuMZ[_0x4658f6(0x1a6)][_0x4658f6(0x1ae)][_0x4658f6(0x1fc)](this,_0x1547b3,_0x1a81fc),!!_0x1547b3&&_0x1547b3[_0x4658f6(0x202)]()&&(this['isDamage']()||this[_0x4658f6(0x1e2)]()||this[_0x4658f6(0x148)]())&&(_0x4658f6(0x165)===_0x4658f6(0x165)?this[_0x4658f6(0x203)](_0x1547b3):(this[_0x4658f6(0x160)]=_0x499f0b,this[_0x4658f6(0x1ce)]()));},Game_Action['prototype'][_0x490c62(0x203)]=function(_0x1c0a9f){const _0x41bf0c=_0x490c62;for(const _0x3261a3 of this[_0x41bf0c(0x1bd)]()){_0x3261a3>0x0&&$gameSystem[_0x41bf0c(0x203)](_0x1c0a9f[_0x41bf0c(0x1c9)](),_0x3261a3);}},VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x21b)]=Game_Action['prototype'][_0x490c62(0x183)],Game_Action['prototype'][_0x490c62(0x183)]=function(_0x3aaae8){const _0x3af657=_0x490c62;VisuMZ[_0x3af657(0x1a6)][_0x3af657(0x21b)]['call'](this,_0x3aaae8),_0x3aaae8[_0x3af657(0x202)]()&&this['applyWeaknessAnalyze'](_0x3aaae8);},Game_Action['prototype'][_0x490c62(0x219)]=function(_0x5bfec6){const _0x59713a=_0x490c62,_0x3657a6=VisuMZ[_0x59713a(0x1a6)][_0x59713a(0x169)];if(this[_0x59713a(0x154)]()[_0x59713a(0x1a0)][_0x59713a(0x19c)](_0x3657a6['AnalyzeEffect'])){var _0x346ab1=parseInt(RegExp['$1']);if(Imported[_0x59713a(0x164)]&&this[_0x59713a(0x154)]()[_0x59713a(0x1a0)][_0x59713a(0x19c)](VisuMZ['BoostAction'][_0x59713a(0x169)][_0x59713a(0x200)])){if('cEFqV'===_0x59713a(0x194))return 0x44;else{var _0x53f539=this[_0x59713a(0x1b5)]()[_0x59713a(0x17a)]('Analyze');_0x346ab1=Math[_0x59713a(0x1ba)](_0x53f539*_0x346ab1),_0x346ab1+=this[_0x59713a(0x1b5)]()[_0x59713a(0x218)](_0x59713a(0x17b));}}_0x5bfec6[_0x59713a(0x1ac)](_0x346ab1);}},VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x224)]=Game_BattlerBase['prototype'][_0x490c62(0x217)],Game_BattlerBase[_0x490c62(0x1d8)][_0x490c62(0x217)]=function(){const _0x12aebd=_0x490c62;VisuMZ['WeaknessDisplay'][_0x12aebd(0x224)]['call'](this),this[_0x12aebd(0x202)]()&&($gameTemp[_0x12aebd(0x14f)]=!![]);},Game_Battler[_0x490c62(0x1d8)][_0x490c62(0x1b4)]=function(){},Game_Enemy['WEAKNESS_DISPLAY_DURATION']=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)][_0x490c62(0x1e3)]['TempDuration'],Game_Enemy['prototype'][_0x490c62(0x20b)]=function(){const _0x2249b8=_0x490c62;var _0x2b4135=[];for(const _0x4d4253 of DataManager[_0x2249b8(0x199)]()){const _0x3e5d7e=Imported['VisuMZ_4_BreakShields']?this[_0x2249b8(0x1f9)](_0x4d4253):this[_0x2249b8(0x227)](_0x4d4253),_0x48bb94=Imported['VisuMZ_4_BreakShields']?Game_Action[_0x2249b8(0x156)]:1.05;_0x3e5d7e>=_0x48bb94&&_0x2b4135[_0x2249b8(0x146)](_0x4d4253);}return _0x2b4135;},Game_Enemy[_0x490c62(0x1d8)][_0x490c62(0x1db)]=function(){const _0x6610fe=_0x490c62;return $gameSystem[_0x6610fe(0x1c8)](this[_0x6610fe(0x1c9)]());},Game_Enemy[_0x490c62(0x1d8)][_0x490c62(0x1ac)]=function(_0x27ca20){const _0xf16198=_0x490c62;var _0xdf6fc9=this[_0xf16198(0x20b)](),_0x39e7d7=$gameSystem[_0xf16198(0x1c8)](this[_0xf16198(0x1c9)]()),_0x26d8f0=[];for(var _0x7e301c=0x0;_0x7e301c<_0xdf6fc9[_0xf16198(0x1cd)];_0x7e301c++){if(_0xf16198(0x1dc)===_0xf16198(0x18b)){const _0x4a6a0f=new _0x175e64(_0x39df6a);this['_childSpriteContainer'][_0xf16198(0x1f6)](_0x4a6a0f);}else{var _0xecd9fa=_0xdf6fc9[_0x7e301c];!_0x39e7d7['contains'](_0xecd9fa)&&_0x26d8f0[_0xf16198(0x146)](_0xecd9fa);}}while(_0x27ca20>0x0){if(_0x26d8f0[_0xf16198(0x1cd)]<=0x0)break;_0x27ca20-=0x1;var _0x425440=Math[_0xf16198(0x201)](Math['random']()*_0x26d8f0[_0xf16198(0x1cd)]),_0x492360=_0x26d8f0[_0x425440];$gameSystem[_0xf16198(0x203)](this[_0xf16198(0x1c9)](),_0x492360),_0x26d8f0[_0xf16198(0x1b8)](_0x425440,0x1);}this[_0xf16198(0x1b4)](),$gameTemp[_0xf16198(0x14f)]=!![];},Game_Enemy[_0x490c62(0x1d8)][_0x490c62(0x1b4)]=function(){const _0x36360a=_0x490c62;this[_0x36360a(0x163)]=Game_Enemy[_0x36360a(0x228)];};function Sprite_WeaknessContainer(){const _0x2a80ed=_0x490c62;this[_0x2a80ed(0x20a)](...arguments);}Sprite_WeaknessContainer[_0x490c62(0x1d8)]=Object[_0x490c62(0x16c)](Sprite[_0x490c62(0x1d8)]),Sprite_WeaknessContainer[_0x490c62(0x1d8)]['constructor']=Sprite_WeaknessContainer,Sprite_WeaknessContainer[_0x490c62(0x19a)]=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)]['Display'][_0x490c62(0x1b0)],Sprite_WeaknessContainer[_0x490c62(0x1a5)]=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)]['Display'][_0x490c62(0x1a9)],Sprite_WeaknessContainer['TEMP_SELECT_ONLY']=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)][_0x490c62(0x1e3)]['TempSelect'],Sprite_WeaknessContainer[_0x490c62(0x1a7)]=VisuMZ['WeaknessDisplay'][_0x490c62(0x1a2)]['Display'][_0x490c62(0x192)],Sprite_WeaknessContainer[_0x490c62(0x1aa)]=VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x1a2)][_0x490c62(0x1e3)][_0x490c62(0x198)],Sprite_WeaknessContainer[_0x490c62(0x1d8)]['initialize']=function(){const _0x59cb8a=_0x490c62;Sprite[_0x59cb8a(0x1d8)][_0x59cb8a(0x20a)][_0x59cb8a(0x1fc)](this),this[_0x59cb8a(0x1a1)](),this[_0x59cb8a(0x1f2)]();},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x1a1)]=function(){const _0x9e2cbb=_0x490c62;this[_0x9e2cbb(0x1d1)]=0x0,this[_0x9e2cbb(0x212)]=null,this[_0x9e2cbb(0x160)]=null,this['scale']['x']=this[_0x9e2cbb(0x1cf)]['y']=Sprite_WeaknessContainer[_0x9e2cbb(0x19a)],this['_visibleElements']=0x0;},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x1f2)]=function(){const _0x908a01=_0x490c62;this['_childSpriteContainer']=new Sprite(),this[_0x908a01(0x1f6)](this[_0x908a01(0x178)]);for(const _0x5a9647 of DataManager[_0x908a01(0x199)]()){if(_0x908a01(0x1d9)!==_0x908a01(0x1d9))_0x3b0871[_0x908a01(0x1a6)][_0x908a01(0x181)][_0x908a01(0x1fc)](this),this[_0x908a01(0x1b6)]();else{const _0x34257b=new Sprite_WeaknessIcon(_0x5a9647);this[_0x908a01(0x178)][_0x908a01(0x1f6)](_0x34257b);}}},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x1fa)]=function(_0x2cb71b){const _0xf3ee0b=_0x490c62;this[_0xf3ee0b(0x212)]=_0x2cb71b;},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x15a)]=function(_0x4e100d){const _0x125438=_0x490c62;this[_0x125438(0x160)]=_0x4e100d,this[_0x125438(0x1ce)]();},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x225)]=function(){const _0x5e7a93=_0x490c62;Sprite['prototype'][_0x5e7a93(0x225)][_0x5e7a93(0x1fc)](this),this[_0x5e7a93(0x142)](),this[_0x5e7a93(0x150)](),this[_0x5e7a93(0x14b)]();},Sprite_WeaknessContainer['prototype']['updateLink']=function(){const _0x3f72c1=_0x490c62;if(!this[_0x3f72c1(0x212)])return;this[_0x3f72c1(0x160)]!==this['_linkedSprite']['_battler']&&(_0x3f72c1(0x16d)==='SroJC'?this[_0x3f72c1(0x15a)](this['_linkedSprite'][_0x3f72c1(0x160)]):(_0x3315dc[_0x3f72c1(0x1d8)][_0x3f72c1(0x225)][_0x3f72c1(0x1fc)](this),this['updateIconFrame'](this[_0x3f72c1(0x172)],this[_0x3f72c1(0x1cb)]),this[_0x3f72c1(0x1cc)](this[_0x3f72c1(0x16f)],this[_0x3f72c1(0x1b1)]),this['updateIconFrame'](this[_0x3f72c1(0x216)],this['_protectIcon'])));},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x150)]=function(){const _0x2e7c22=_0x490c62;if(!this[_0x2e7c22(0x212)])return;this['_lineHeight']=this[_0x2e7c22(0x1f0)]||Window_Base['prototype'][_0x2e7c22(0x1b7)](),this['x']=this[_0x2e7c22(0x212)][_0x2e7c22(0x168)],this['y']=this['_linkedSprite']['_baseY']+this[_0x2e7c22(0x1f0)]*0.5,this['x']+=Sprite_WeaknessContainer['OFFSET_X']||0x0,this['y']+=Sprite_WeaknessContainer['OFFSET_Y']||0x0;const _0x548f8a=this[_0x2e7c22(0x1d5)]*ImageManager[_0x2e7c22(0x1e9)];this[_0x2e7c22(0x178)]['x']=Math[_0x2e7c22(0x1ba)](-_0x548f8a/0x2);},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x1ce)]=function(){const _0x22598c=_0x490c62;if(this[_0x22598c(0x160)]&&this[_0x22598c(0x178)]){const _0x9bf5a7=this['_battler'][_0x22598c(0x20b)](),_0x576dc0=this[_0x22598c(0x160)][_0x22598c(0x1db)](),_0x4f6372=Imported[_0x22598c(0x22a)]?this[_0x22598c(0x160)][_0x22598c(0x1ec)]():[];this[_0x22598c(0x1d5)]=0x0;let _0x3a8400=0x0;for(const _0x58e668 of DataManager[_0x22598c(0x199)]()){const _0x5bab17=this[_0x22598c(0x178)]['children'][_0x3a8400];_0x3a8400++;if(_0x9bf5a7['includes'](_0x58e668)){if(_0x22598c(0x1c6)!==_0x22598c(0x22d))_0x5bab17[_0x22598c(0x141)](this[_0x22598c(0x1d5)]),_0x5bab17['setRevealed'](_0x576dc0['includes'](_0x58e668)),_0x5bab17[_0x22598c(0x21e)](_0x4f6372[_0x22598c(0x209)](_0x58e668)),this[_0x22598c(0x1d5)]++;else return 0x6a;}else _0x5bab17[_0x22598c(0x141)](-0x1);}}else this[_0x22598c(0x1d1)]=0x0;},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x14b)]=function(){const _0x59148f=_0x490c62,_0x34c177=this[_0x59148f(0x19e)]();if(_0x34c177&&this[_0x59148f(0x1d1)]<0xff)this['opacity']+=0x10;else!_0x34c177&&this[_0x59148f(0x1d1)]>0x0&&(this[_0x59148f(0x1d1)]-=0x10);},Sprite_WeaknessContainer[_0x490c62(0x1d8)]['visibilityState']=function(){const _0xbb0dd3=_0x490c62;if(!this[_0xbb0dd3(0x160)])return![];else{if(this[_0xbb0dd3(0x160)]['isDead']())return![];else{if(!this[_0xbb0dd3(0x160)]['isAppeared']())return![];else{if(this[_0xbb0dd3(0x1ed)]()){if(_0xbb0dd3(0x1da)!=='bPYUT')return!![];else this[_0xbb0dd3(0x18f)]();}else{if(this[_0xbb0dd3(0x160)][_0xbb0dd3(0x163)])return this[_0xbb0dd3(0x160)][_0xbb0dd3(0x163)]--,!![];else{if(Sprite_WeaknessContainer['TEMP_SELECT_ONLY'])return this[_0xbb0dd3(0x160)]['isSelected']();else{if(!Sprite_WeaknessContainer[_0xbb0dd3(0x211)])return this[_0xbb0dd3(0x186)]();else{if(this[_0xbb0dd3(0x1d1)]>0x0)return![];}}}}}}}},Sprite_WeaknessContainer['prototype'][_0x490c62(0x1ed)]=function(){return Sprite_WeaknessContainer['ALWAYS_VISIBLE'];},Sprite_WeaknessContainer[_0x490c62(0x1d8)][_0x490c62(0x186)]=function(){const _0xce2384=_0x490c62;return VisuMZ['BattleCore'][_0xce2384(0x1a2)][_0xce2384(0x151)][_0xce2384(0x21d)]?_0xce2384(0x1ea)!==_0xce2384(0x1ea)?0x46:this[_0xce2384(0x160)][_0xce2384(0x20d)]():SceneManager[_0xce2384(0x174)][_0xce2384(0x144)]&&SceneManager['_scene'][_0xce2384(0x144)][_0xce2384(0x1fd)]&&SceneManager[_0xce2384(0x174)][_0xce2384(0x144)][_0xce2384(0x18a)][_0xce2384(0x209)](this[_0xce2384(0x160)]);};function _0xe774(){const _0x470b9f=['jsUtG','_needRefreshAllEnemyWeaknessWindows','updatePosition','Enemy','WEAKNESS_DISPLAY_UNKNOWN_ICON','VisuMZ_1_BattleCore','item','WEAKNESS_DISPLAY_AUTO_ICONS','BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE','ExjMi','_protectIcon','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setup','idlxb','hqWZE','filter','ZUHBx','_uiContainer','_battler','Spriteset_Battle_createLowerLayer','4dBItGd','_showWeaknessDisplayDuration','VisuMZ_3_BoostAction','iDOAc','30UzfwYL','description','_baseX','RegExp','_elementID','TCfQw','create','SroJC','format','_iconIndexSprite','createLowerLayer','getWeaknessDisplayElementIcon','_backgroundSprite','LPvOo','_scene','isSceneBattle','HMEXg','AutoIcon','_childSpriteContainer','loadSystem','boostMultiplier','Analyze','members','TTxHO','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','jFQvP','3981472qBUnIY','Spriteset_Battle_update','trim','applyItemUserEffect','smooth','ShXDC','isIncludedInEnemyWindow','YrrPo','IVhue','4229849CubCsV','_enemies','TIYJA','ARRAYFUNC','_iconSheet','IconSet','initializeRevealedEnemyWeaknesses','weaknessDisplayIconsheetBitmap','ConvertParams','DisplayOffsetX','EVAL','IBTRU','iNrtd','348935YHKWin','createWeaknessContainerSprites','DisplayOffsetY','weaknessDisplayShownElements','SCALE_RATE','JSON','match','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','visibilityState','zCvQE','note','initMembers','Settings','Game_Action_apply','resize','ALWAYS_VISIBLE','WeaknessDisplay','OFFSET_X','General','AlwaysVisible','OFFSET_Y','bcQrH','revealNewWeaknesses','702332isplpK','Game_Action_executeDamage','keys','IconScale','_iconIndex','Game_System_initialize','name','revealWeaknessDisplay','subject','updateAllWeaknessDisplaySprites','lineHeight','splice','refreshAllWeaknessDisplaySprites','round','setRevealed','BackgroundIcon','elements','toUpperCase','12WbuaTe','apply','vRSyv','ARRAYEVAL','addLoadListener','parse','_revealedEnemyWeaknesses','iYNfz','STR','getRevealedEnemyWeaknesses','enemyId','blt','_backgroundIndex','updateIconFrame','length','updateChildSprites','scale','max','opacity','unshift','STRUCT','JtUHj','_visibleElements','bitmap','MCofA','prototype','oyQjF','EdXCH','getRevealedElements','yEdLt','ARRAYJSON','version','PMdrW','jrVKV','lNOeR','isRecover','Display','ZSDJL','height','_weaknessContainer','88119Mpfqvx','weaknessDisplayTransferBitmap','iconWidth','JxKvB','WEAKNESS_DISPLAY_SMOOTHING','getProtectedWeaknessElements','isAlwaysVisible','WEAKNESS_DISPLAY_SHOWN_ELEMENTS','_weaknessDisplayShownElements','_lineHeight','iconHeight','createChildSpriteContainer','exit','Kntcj','20056QcdbFV','addChild','lZWBq','ShownElements','originalElementRate','linkSprite','VisuMZ_1_ElementStatusCore','call','active','children','yryQE','BoostAnalyze','floor','isEnemy','addEnemyWeaknessElement','constructor','WEAKNESS_DISPLAY_BACKGROUND_ICON','_customModified','LZxHe','map','includes','initialize','getWeaknessElements','tqqqm','isSelected','ARRAYSTR','upNII','SmoothIcons','TEMP_SELECT_ONLY','_linkedSprite','executeDamage','SrIrz','LvnVY','_protectionSprite','refresh','boostAddition','applyWeaknessAnalyze','width','Game_Action_applyItemUserEffect','2103042KIEodA','NameAlwaysSelectOnly','setProtected','bind','_weaknessDisplayUnshiftedElementIcons','ywBxy','1883JgAyXa','transferBitmap','Game_BattlerBase_refresh','update','parameters','elementRate','WEAKNESS_DISPLAY_DURATION','sort','VisuMZ_4_BreakShields','60khoJWE','qiRTB','vwSii','setPosition','updateLink','BattleCore','_enemyWindow','WEAKNESS_DISPLAY_ELEMENT_ICONS','push','createChildrenSprite','isDrain','contains','_weaknessDisplayIconSheet','updateOpacity','2gZTQYC','Game_Temp_requestAnimation'];_0xe774=function(){return _0x470b9f;};return _0xe774();}function Sprite_WeaknessIcon(){const _0x4f9bba=_0x490c62;this[_0x4f9bba(0x20a)](...arguments);}function _0x58f8(_0x5f47e4,_0x5f31ad){const _0xe7748f=_0xe774();return _0x58f8=function(_0x58f822,_0x19af0e){_0x58f822=_0x58f822-0x141;let _0x5d9358=_0xe7748f[_0x58f822];return _0x5d9358;},_0x58f8(_0x5f47e4,_0x5f31ad);}Sprite_WeaknessIcon[_0x490c62(0x1d8)]=Object[_0x490c62(0x16c)](Sprite['prototype']),Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x204)]=Sprite_WeaknessIcon,Sprite_WeaknessIcon['prototype'][_0x490c62(0x20a)]=function(_0x2abbb0){const _0x33cae8=_0x490c62;this[_0x33cae8(0x16a)]=_0x2abbb0,Sprite[_0x33cae8(0x1d8)]['initialize']['call'](this),this[_0x33cae8(0x1a1)](),this[_0x33cae8(0x147)]();},Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x1a1)]=function(){const _0x5caacf=_0x490c62;this[_0x5caacf(0x1cb)]=ImageManager[_0x5caacf(0x205)],this[_0x5caacf(0x1b1)]=ImageManager[_0x5caacf(0x152)],this[_0x5caacf(0x158)]=0x0;},Sprite_WeaknessIcon['prototype']['createChildrenSprite']=function(){const _0x108bd3=_0x490c62;this[_0x108bd3(0x18d)]=ImageManager[_0x108bd3(0x190)](),this[_0x108bd3(0x172)]=new Sprite(),this['_backgroundSprite'][_0x108bd3(0x1d6)]=this[_0x108bd3(0x18d)],this[_0x108bd3(0x1f6)](this[_0x108bd3(0x172)]),this[_0x108bd3(0x16f)]=new Sprite(),this[_0x108bd3(0x16f)]['bitmap']=this[_0x108bd3(0x18d)],this[_0x108bd3(0x1f6)](this[_0x108bd3(0x16f)]),this[_0x108bd3(0x216)]=new Sprite(),this[_0x108bd3(0x216)][_0x108bd3(0x1d6)]=this['_iconSheet'],this[_0x108bd3(0x1f6)](this[_0x108bd3(0x216)]);},Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x223)]=function(_0x4c6cb0){const _0x4b4895=_0x490c62;this[_0x4b4895(0x18d)][_0x4b4895(0x1a4)](_0x4c6cb0[_0x4b4895(0x21a)],_0x4c6cb0[_0x4b4895(0x1e5)]),this[_0x4b4895(0x18d)][_0x4b4895(0x1ca)](_0x4c6cb0,0x0,0x0,_0x4c6cb0['width'],_0x4c6cb0['height'],0x0,0x0);},Sprite_WeaknessIcon[_0x490c62(0x1d8)]['update']=function(){const _0x3dfb4d=_0x490c62;Sprite[_0x3dfb4d(0x1d8)][_0x3dfb4d(0x225)]['call'](this),this['updateIconFrame'](this[_0x3dfb4d(0x172)],this[_0x3dfb4d(0x1cb)]),this['updateIconFrame'](this[_0x3dfb4d(0x16f)],this[_0x3dfb4d(0x1b1)]),this[_0x3dfb4d(0x1cc)](this[_0x3dfb4d(0x216)],this[_0x3dfb4d(0x158)]);},Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x1cc)]=function(_0x3c6c57,_0x17b41c){const _0x3a41ac=_0x490c62;if(!_0x3c6c57)return;const _0x6c1c6c=ImageManager[_0x3a41ac(0x1e9)],_0x5d21b3=ImageManager[_0x3a41ac(0x1f1)],_0x4c8f44=_0x17b41c%0x10*_0x6c1c6c,_0x13d56c=Math['floor'](_0x17b41c/0x10)*_0x5d21b3;_0x3c6c57['setFrame'](_0x4c8f44,_0x13d56c,_0x6c1c6c,_0x5d21b3);},Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x141)]=function(_0xc7fccd){const _0x468852=_0x490c62;if(_0xc7fccd<0x0)this['opacity']=0x0;else{if('jLRkQ'===_0x468852(0x22c))return 0x64;else this[_0x468852(0x1d1)]=0xff,this['x']=ImageManager[_0x468852(0x1e9)]*_0xc7fccd;}},Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x1bb)]=function(_0x518d0b){const _0x5e1fd2=_0x490c62;if(_0x518d0b){if('ShXDC'!==_0x5e1fd2(0x185)){if(this[_0x5e1fd2(0x1ef)]!==_0x16794d)return this[_0x5e1fd2(0x1ef)];let _0x1110b6=_0x293eb1['WEAKNESS_DISPLAY_SHOWN_ELEMENTS'];const _0x4a9276=_0x1110b6[_0x5e1fd2(0x1cd)]>0x0?_0x1110b6:[..._0x3d2676(_0x5cf2e6[_0x5e1fd2(0x1bd)][_0x5e1fd2(0x1cd)]-0x1)[_0x5e1fd2(0x1af)]()][_0x5e1fd2(0x208)](_0x279b3a=>_0x279b3a+0x1);return this['_weaknessDisplayShownElements']=_0x4a9276['filter'](_0xf67d21=>_0x226466[_0x5e1fd2(0x171)](_0xf67d21)>0x0),this[_0x5e1fd2(0x1ef)];}else this[_0x5e1fd2(0x1b1)]=ImageManager['getWeaknessDisplayElementIcon'](this[_0x5e1fd2(0x16a)]);}else this[_0x5e1fd2(0x1b1)]=ImageManager['WEAKNESS_DISPLAY_UNKNOWN_ICON'];},Sprite_WeaknessIcon[_0x490c62(0x1d8)][_0x490c62(0x21e)]=function(_0x5ab936){const _0x5f4734=_0x490c62;if(_0x5ab936&&Imported['VisuMZ_4_BreakShields']){if(_0x5f4734(0x17f)!==_0x5f4734(0x17f))return 0x63;else this[_0x5f4734(0x158)]=ImageManager['breakShield_ProtectIcon'];}else'GJmsd'!==_0x5f4734(0x16b)?this[_0x5f4734(0x158)]=0x0:(this[_0x5f4734(0x14a)]['resize'](_0x48d1d3['width'],_0x5bc156[_0x5f4734(0x1e5)]),this[_0x5f4734(0x14a)][_0x5f4734(0x1ca)](_0x5b552a,0x0,0x0,_0x2ddcd5['width'],_0x3a7f2c[_0x5f4734(0x1e5)],0x0,0x0),this[_0x5f4734(0x14a)][_0x5f4734(0x184)]=_0xb3087a[_0x5f4734(0x1eb)],this[_0x5f4734(0x14a)][_0x5f4734(0x206)]=![]);},VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x161)]=Spriteset_Battle['prototype'][_0x490c62(0x170)],Spriteset_Battle[_0x490c62(0x1d8)][_0x490c62(0x170)]=function(){const _0x3dd908=_0x490c62;VisuMZ[_0x3dd908(0x1a6)]['Spriteset_Battle_createLowerLayer'][_0x3dd908(0x1fc)](this),this[_0x3dd908(0x197)]();},Spriteset_Battle[_0x490c62(0x1d8)][_0x490c62(0x197)]=function(){const _0x3b83d5=_0x490c62;this[_0x3b83d5(0x1e6)]=new Sprite();this[_0x3b83d5(0x15f)]?'upNII'!==_0x3b83d5(0x20f)?(this['_weaknessDisplayUnshiftedElementIcons']=!![],_0xf4517a[_0x3b83d5(0x145)]['unshift'](0x0)):this['_uiContainer'][_0x3b83d5(0x1f6)](this[_0x3b83d5(0x1e6)]):this['_battleField'][_0x3b83d5(0x1f6)](this[_0x3b83d5(0x1e6)]);for(const _0x304bd5 of this['_enemySprites']){if(_0x3b83d5(0x15b)===_0x3b83d5(0x15b)){const _0x2e910e=new Sprite_WeaknessContainer();this['_weaknessContainer']['addChild'](_0x2e910e),_0x2e910e[_0x3b83d5(0x1fa)](_0x304bd5);}else{const _0x4c1c02=this[_0x3b83d5(0x19e)]();if(_0x4c1c02&&this[_0x3b83d5(0x1d1)]<0xff)this[_0x3b83d5(0x1d1)]+=0x10;else!_0x4c1c02&&this[_0x3b83d5(0x1d1)]>0x0&&(this[_0x3b83d5(0x1d1)]-=0x10);}}},VisuMZ[_0x490c62(0x1a6)][_0x490c62(0x181)]=Spriteset_Battle['prototype'][_0x490c62(0x225)],Spriteset_Battle[_0x490c62(0x1d8)][_0x490c62(0x225)]=function(){const _0x262af5=_0x490c62;VisuMZ[_0x262af5(0x1a6)][_0x262af5(0x181)][_0x262af5(0x1fc)](this),this[_0x262af5(0x1b6)]();},Spriteset_Battle[_0x490c62(0x1d8)][_0x490c62(0x1b6)]=function(){const _0x4126c8=_0x490c62;$gameTemp['_needRefreshAllEnemyWeaknessWindows']&&($gameTemp[_0x4126c8(0x14f)]=![],this[_0x4126c8(0x1b9)]());},Spriteset_Battle['prototype'][_0x490c62(0x1b9)]=function(){const _0x258460=_0x490c62;for(const _0x1918c7 of this[_0x258460(0x1e6)][_0x258460(0x1fe)]){if(_0x258460(0x15c)!==_0x258460(0x15c))this['_showWeaknessDisplayDuration']=_0x5b14eb[_0x258460(0x228)];else{if(!_0x1918c7)continue;_0x1918c7[_0x258460(0x1ce)]();}}};