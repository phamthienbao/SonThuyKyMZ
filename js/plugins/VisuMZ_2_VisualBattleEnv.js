//=============================================================================
// VisuStella MZ - Visual Battle Environment
// VisuMZ_2_VisualBattleEnv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_VisualBattleEnv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualBattleEnv = VisuMZ.VisualBattleEnv || {};
VisuMZ.VisualBattleEnv.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.08] [VisualBattleEnv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Battle_Environment_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add extra layers of images to your battle system for background purposes or
 * foreground purposes. These images can be battlebacks, pictures, parallaxes,
 * whatever you need them to be. Add extra settings to them, such as scrolling,
 * blend modes, different opacity levels, hues, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create battle environment images located behind battlers to function as a
 *   part of the background.
 * * Create battle environment images located in front of battlers to function
 *   as a part of the foreground.
 * * Apply custom settings to them, such as changing their blend modes, their
 *   scrolling speeds, and opacity levels.
 * * Customize their hue and if they have a hue shift at all.
 * * Apply color tones if needed to give more color control.
 * * Alter their opacity levels midway during battle.
 * * An unlimited amounts of back environments and front environments to add to
 *   the battle scene.
 * * Environment images are layered based on their ID's. Lower ID's appear
 *   below while higher ID's appear above.
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
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Back Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Back Environment: Add/Change
 * - Adds/changes the target back environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Back Environment: Fade Opacity
 * - Fades the target back environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which back environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Back Environment: Remove
 * - Removes target back environment(s).
 *
 *   ID(s):
 *   - Remove which back environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Front Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Front Environment: Add/Change
 * - Adds/changes the target front environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Front Environment: Fade Opacity
 * - Fades the target front environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which front environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Front Environment: Remove
 * - Removes target front environment(s).
 *
 *   ID(s):
 *   - Remove which front environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Extra-Settings ===
 * 
 * ---
 *
 * Extra Settings
 * - These settings are used for both the "Back Environment: Add/Change" and
 *   "Front Environment: Add/Change" Plugin Commands.
 * 
 *   Appearance:
 *
 *     Scale Style:
 *     - The scaling style used for this environment image.
 *       - Battle Core Setting
 *       - MZ (MZ's default style)
 *       - 1:1 (No Scaling)
 *       - Scale To Fit (Scale to screen size)
 *       - Scale Down (Scale Downward if Larger than Screen)
 *       - Scale Up (Scale Upward if Smaller than Screen)
 *
 *     Opacity:
 *     - What is the opacity level for this image?
 *     - You may use JavaScript code.
 *
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the image?
 *     - You may use JavaScript code.
 *       - Normal
 *       - Additive
 *       - Multiply
 *       - Screen
 * 
 *     Hue: 
 *     - Do you wish to adjust this image's hue?
 *     - You may use JavaScript code.
 * 
 *     Hue Shift:
 *     - How much do you want the hue to shift each frame?
 *     - You may use JavaScript code.
 * 
 *     Color Tone:
 *     - What tone do you want for the background?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Scrolling:
 *
 *     Horizontal Scroll:
 *     - What is the horizontal scroll speed?
 *     - Use a negative value to invert the direction.
 *
 *     Vertical Scroll:
 *     - What is the vertical scroll speed?
 *     - Use a negative value to invert the direction.
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
 * Version 1.08: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a crash. Fix made by Olivia.
 * 
 * Version 1.07: January 27, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.06: December 16, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ's new subfolders. Update by Irina.
 * 
 * Version 1.05: August 6, 2021
 * * Bug Fixes!
 * ** Environments no longer visibly vanish when changing to the Options or
 *    Party management scenes. Fix made by Irina.
 * 
 * Version 1.04: July 16, 2021
 * * Bug Fixes!
 * ** Games with UI dimensions that are different from screen dimensions should
 *    no longer be affected by the distance difference. Fix made by Irina.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 30, 2021
 * * Bug Fixes!
 * ** Added a fail safe for changing color tones in case the value fails to be
 *    an array (it will default to zero tone). Fix made by Arisu.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Crashes should no longer occur when performing a troop transition from
 *    the map. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentAddChange
 * @text Back Environment: Add/Change
 * @desc Adds/changes the target back environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentFade
 * @text Back Environment: Fade Opacity
 * @desc Fades the target back environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which back environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentRemove
 * @text Back Environment: Remove
 * @desc Removes target back environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which back environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentAddChange
 * @text Front Environment: Add/Change
 * @desc Adds/changes the target front environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentFade
 * @text Front Environment: Fade Opacity
 * @desc Fades the target front environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which front environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentRemove
 * @text Front Environment: Remove
 * @desc Removes target front environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which front environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
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
 * @param VisualBattleEnv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Appearance
 *
 * @param ScaleStyle:str
 * @text Scale Style
 * @parent Appearance
 * @type select
 * @option Battle Core Setting
 * @value BattleCore
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The scaling style used for this environment image.
 * @default BattleCore
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this image?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the image?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this image's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the background?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Scrolling
 *
 * @param ScrollHorz:eval
 * @text Horizontal Scroll
 * @parent Scrolling
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 * @param ScrollVert:eval
 * @text Vertical Scroll
 * @parent Scrolling
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 */
//=============================================================================

function _0x114f(){const _0x5aaa4a=['createFrontEnvironmentContainer','QJsNT','prototype','VisuMZ_1_BattleCore','4216513phVXcH','setupVisualBattleEnvironment','_updateColorFilter','find','trim','initialize','_filename','ClgoO','_colorFilter','createBackEnvironmentContainer','FrontEnvironmentAddChange','ScaleStyle','Game_Troop_setup','description','match','Spriteset_Battle_update','Battleback','_front','ConvertParams','FUNC','WZGBf','split','version','76qyqwIz','filters','opacity','sxWWr','duration','_backEnvironmentContainer','blendMode','updateBattleEnvironmentSprite','IKXZJ','Spriteset_Battle_createWeather','aqXGO','ScaleToFit','WjYiR','770106tOJjMW','processBitmap','fkJyx','_battleField','restoreVisualBattleEnv','FrontEnvironmentFade','bexHe','update','uNArt','updateScrolling','bbjlF','33326420bPKFjG','ARRAYFUNC','LZTux','OcTLv','updateBlendMode','_backEnvironmentSettings','ylowV','includes','FrontEnvironmentRemove','name','VisualBattleEnv','3YWgWaW','registerCommand','bitmap','createBattleEnvironmentSprite','1:1','3254232pRVqmt','Extra','createSpriteset','adjustPosition_ScaleDown','setup','removeBattleEnvironmentSprite','ARRAYJSON','BattleCore','BattlebackScale','ScrollHorz','2468144atWtDK','getBackEnvironmentSettings','hfxav','_folder','loadBitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','VisuMZ_2_WeatherEffects','BackEnvironmentFade','Folder','Zkzyh','adjustPosition','eJNEW','updateOpacity','kKZrw','return\x200','_scene','createWeather','Sprite_Battleback_adjustPosition','sort','makeDeepCopy','CPwif','DefaultStyle','VnhLA','STRUCT','addChild','origin','31774xdNpBR','create','call','format','getBattleEnvironmentContainer','tpbKO','push','hue','tUaTg','list','cafqb','adjustPosition_1for1','createBattleback','settings','35cZyvsO','children','join','STR','IvFhP','jWmxY','pop','getBattleEnvironmentSprite','iWprq','JRBYu','ARRAYEVAL','isSceneBattle','status','battleback1Bitmap','_frontEnvironmentSettings','FolderFilename','max','parse','_frontEnvironmentContainer','11712762YijEbh','NUM','getFrontEnvironmentSettings','_spriteset','Filename','setBackEnvironmentSettings','hueShift','_baseSprite','SoZAa','Settings','map','setFrontEnvironmentSettings','ScrollVert','WRmsV','_id','AdjustSettings','BackEnvironmentAddChange','removeChild','updateBitmap','adjustPosition_ScaleUp','_createColorFilter','isPreviousSceneBattleTransitionable','ELcMl','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ScaleDown','ARRAYSTR','obGBP','exit','BXprV','setColorTone'];_0x114f=function(){return _0x5aaa4a;};return _0x114f();}const _0x27a872=_0x3128;(function(_0x2a1db0,_0x5abacb){const _0x45b0cf=_0x3128,_0x49450c=_0x2a1db0();while(!![]){try{const _0x173c5f=-parseInt(_0x45b0cf(0x230))/0x1*(parseInt(_0x45b0cf(0x1d6))/0x2)+-parseInt(_0x45b0cf(0x1ad))/0x3*(-parseInt(_0x45b0cf(0x1bc))/0x4)+-parseInt(_0x45b0cf(0x1e4))/0x5*(parseInt(_0x45b0cf(0x23d))/0x6)+parseInt(_0x45b0cf(0x219))/0x7+-parseInt(_0x45b0cf(0x1b2))/0x8+-parseInt(_0x45b0cf(0x1f7))/0x9+parseInt(_0x45b0cf(0x248))/0xa;if(_0x173c5f===_0x5abacb)break;else _0x49450c['push'](_0x49450c['shift']());}catch(_0x17819b){_0x49450c['push'](_0x49450c['shift']());}}}(_0x114f,0xb42b3));var label=_0x27a872(0x1ac),tier=tier||0x0,dependencies=[_0x27a872(0x218)],pluginData=$plugins['filter'](function(_0x5845e8){const _0x306e20=_0x27a872;return _0x5845e8[_0x306e20(0x1f0)]&&_0x5845e8['description'][_0x306e20(0x24f)]('['+label+']');})[0x0];VisuMZ[label][_0x27a872(0x200)]=VisuMZ[label][_0x27a872(0x200)]||{},VisuMZ[_0x27a872(0x22b)]=function(_0x38b04d,_0x4ee3f0){const _0x321a20=_0x27a872;for(const _0x1f3149 in _0x4ee3f0){if(_0x321a20(0x20d)===_0x321a20(0x1c9))this[_0x321a20(0x21e)](...arguments);else{if(_0x1f3149[_0x321a20(0x227)](/(.*):(.*)/i)){if(_0x321a20(0x1de)!==_0x321a20(0x24b)){const _0x435891=String(RegExp['$1']),_0x382965=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x5a5fcc,_0x33b64e,_0x4808eb;switch(_0x382965){case _0x321a20(0x1f8):_0x5a5fcc=_0x4ee3f0[_0x1f3149]!==''?Number(_0x4ee3f0[_0x1f3149]):0x0;break;case'ARRAYNUM':_0x33b64e=_0x4ee3f0[_0x1f3149]!==''?JSON['parse'](_0x4ee3f0[_0x1f3149]):[],_0x5a5fcc=_0x33b64e[_0x321a20(0x201)](_0x17c57f=>Number(_0x17c57f));break;case'EVAL':_0x5a5fcc=_0x4ee3f0[_0x1f3149]!==''?eval(_0x4ee3f0[_0x1f3149]):null;break;case _0x321a20(0x1ee):_0x33b64e=_0x4ee3f0[_0x1f3149]!==''?JSON[_0x321a20(0x1f5)](_0x4ee3f0[_0x1f3149]):[],_0x5a5fcc=_0x33b64e[_0x321a20(0x201)](_0x5c77f2=>eval(_0x5c77f2));break;case'JSON':_0x5a5fcc=_0x4ee3f0[_0x1f3149]!==''?JSON[_0x321a20(0x1f5)](_0x4ee3f0[_0x1f3149]):'';break;case _0x321a20(0x1b8):_0x33b64e=_0x4ee3f0[_0x1f3149]!==''?JSON['parse'](_0x4ee3f0[_0x1f3149]):[],_0x5a5fcc=_0x33b64e[_0x321a20(0x201)](_0x5978f2=>JSON[_0x321a20(0x1f5)](_0x5978f2));break;case _0x321a20(0x22c):_0x5a5fcc=_0x4ee3f0[_0x1f3149]!==''?new Function(JSON['parse'](_0x4ee3f0[_0x1f3149])):new Function(_0x321a20(0x1ca));break;case _0x321a20(0x249):_0x33b64e=_0x4ee3f0[_0x1f3149]!==''?JSON[_0x321a20(0x1f5)](_0x4ee3f0[_0x1f3149]):[],_0x5a5fcc=_0x33b64e[_0x321a20(0x201)](_0xed921e=>new Function(JSON['parse'](_0xed921e)));break;case _0x321a20(0x1e7):_0x5a5fcc=_0x4ee3f0[_0x1f3149]!==''?String(_0x4ee3f0[_0x1f3149]):'';break;case _0x321a20(0x210):_0x33b64e=_0x4ee3f0[_0x1f3149]!==''?JSON[_0x321a20(0x1f5)](_0x4ee3f0[_0x1f3149]):[],_0x5a5fcc=_0x33b64e[_0x321a20(0x201)](_0x2a99f7=>String(_0x2a99f7));break;case _0x321a20(0x1d3):_0x4808eb=_0x4ee3f0[_0x1f3149]!==''?JSON[_0x321a20(0x1f5)](_0x4ee3f0[_0x1f3149]):{},_0x5a5fcc=VisuMZ[_0x321a20(0x22b)]({},_0x4808eb);break;case'ARRAYSTRUCT':_0x33b64e=_0x4ee3f0[_0x1f3149]!==''?JSON[_0x321a20(0x1f5)](_0x4ee3f0[_0x1f3149]):[],_0x5a5fcc=_0x33b64e[_0x321a20(0x201)](_0x105337=>VisuMZ[_0x321a20(0x22b)]({},JSON[_0x321a20(0x1f5)](_0x105337)));break;default:continue;}_0x38b04d[_0x435891]=_0x5a5fcc;}else{if(this['_frontEnvironmentContainer']){}}}}}return _0x38b04d;},(_0x4f2294=>{const _0x5e9a86=_0x27a872,_0x84d41=_0x4f2294[_0x5e9a86(0x1ab)];for(const _0x341664 of dependencies){if(!Imported[_0x341664]){if(_0x5e9a86(0x220)!=='ClgoO')_0x583a4b[_0x5e9a86(0x1ac)][_0x5e9a86(0x225)][_0x5e9a86(0x1d8)](this,_0x40cf61),this[_0x5e9a86(0x21a)]();else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5e9a86(0x1d9)](_0x84d41,_0x341664)),SceneManager[_0x5e9a86(0x212)]();break;}}}const _0x3ca5e2=_0x4f2294[_0x5e9a86(0x226)];if(_0x3ca5e2[_0x5e9a86(0x227)](/\[Version[ ](.*?)\]/i)){if(_0x5e9a86(0x238)!==_0x5e9a86(0x1ed)){const _0x149a41=Number(RegExp['$1']);if(_0x149a41!==VisuMZ[label][_0x5e9a86(0x22f)]){if(_0x5e9a86(0x213)!==_0x5e9a86(0x213))return _0x22f6f2[_0x5e9a86(0x1f0)]&&_0x3ff32b['description'][_0x5e9a86(0x24f)]('['+_0x1ec88a+']');else alert(_0x5e9a86(0x1c1)[_0x5e9a86(0x1d9)](_0x84d41,_0x149a41)),SceneManager['exit']();}}else{const _0x252257=new _0x24ec7a(_0x2f3380,_0x5e3518);_0x50887d[_0x5e9a86(0x1d4)](_0x252257),_0x5c0225['children'][_0x5e9a86(0x1ce)]((_0x15f339,_0x5b1aa6)=>_0x15f339['_id']-_0x5b1aa6[_0x5e9a86(0x205)]);}}if(_0x3ca5e2[_0x5e9a86(0x227)](/\[Tier[ ](\d+)\]/i)){const _0x1039dc=Number(RegExp['$1']);_0x1039dc<tier?(alert(_0x5e9a86(0x20e)['format'](_0x84d41,_0x1039dc,tier)),SceneManager[_0x5e9a86(0x212)]()):'EwfXc'!==_0x5e9a86(0x1c5)?tier=Math[_0x5e9a86(0x1f4)](_0x1039dc,tier):(this[_0x5e9a86(0x205)]=_0x5cc066,this[_0x5e9a86(0x22a)]=_0x28ceae,_0xed1dc0[_0x5e9a86(0x217)][_0x5e9a86(0x21e)][_0x5e9a86(0x1d8)](this,0x0),this[_0x5e9a86(0x20b)](),this[_0x5e9a86(0x232)]=0x0);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5e9a86(0x200)],_0x4f2294['parameters']);})(pluginData),VisuMZ[_0x27a872(0x1ac)][_0x27a872(0x206)]=function(_0x2e9ad2){const _0x5ac402=_0x27a872;_0x2e9ad2=JsonEx[_0x5ac402(0x1cf)](_0x2e9ad2);if(_0x2e9ad2[_0x5ac402(0x1f3)]){if(_0x5ac402(0x245)!==_0x5ac402(0x1ff)){const _0x2d79b8=_0x2e9ad2['FolderFilename'][_0x5ac402(0x22e)]('/');_0x2e9ad2[_0x5ac402(0x1fb)]=_0x2d79b8[_0x5ac402(0x1ea)](),_0x2e9ad2[_0x5ac402(0x1c4)]=_0x2d79b8[_0x5ac402(0x1e6)]('/');}else this[_0x5ac402(0x1f6)]=new _0x7bab9f(),this[_0x5ac402(0x240)]['addChild'](this['_frontEnvironmentContainer']),this['_frontEnvironmentContainer']['x']=-this[_0x5ac402(0x240)]['x'],this['_frontEnvironmentContainer']['y']=-this[_0x5ac402(0x240)]['y'];}else _0x2e9ad2['Folder']='',_0x2e9ad2[_0x5ac402(0x1fb)]='';return _0x2e9ad2[_0x5ac402(0x1b3)]=_0x2e9ad2[_0x5ac402(0x1b3)]||{},_0x2e9ad2[_0x5ac402(0x1b3)]['ScaleStyle']=_0x2e9ad2[_0x5ac402(0x1b3)][_0x5ac402(0x224)]??_0x5ac402(0x1b9),_0x2e9ad2[_0x5ac402(0x1b3)][_0x5ac402(0x236)]=_0x2e9ad2[_0x5ac402(0x1b3)]['blendMode']??0x0,_0x2e9ad2[_0x5ac402(0x1b3)][_0x5ac402(0x232)]=_0x2e9ad2[_0x5ac402(0x1b3)][_0x5ac402(0x232)]??0xff,_0x2e9ad2['Extra'][_0x5ac402(0x1bb)]=_0x2e9ad2[_0x5ac402(0x1b3)]['ScrollHorz']??0x0,_0x2e9ad2[_0x5ac402(0x1b3)]['ScrollVert']=_0x2e9ad2[_0x5ac402(0x1b3)]['ScrollVert']??0x0,_0x2e9ad2;},PluginManager[_0x27a872(0x1ae)](pluginData[_0x27a872(0x1ab)],_0x27a872(0x207),_0xe0245d=>{const _0x3621a0=_0x27a872;if(!SceneManager[_0x3621a0(0x1ef)]())return;VisuMZ[_0x3621a0(0x22b)](_0xe0245d,_0xe0245d);const _0x30573a=VisuMZ[_0x3621a0(0x1ac)]['AdjustSettings'](_0xe0245d);if(_0x30573a[_0x3621a0(0x1c4)][_0x3621a0(0x21d)]()===''||_0x30573a[_0x3621a0(0x1fb)]==='')return;const _0x10d748=_0x30573a['ID']||0x0;$gameTroop[_0x3621a0(0x1fc)](_0x10d748,_0x30573a);}),PluginManager[_0x27a872(0x1ae)](pluginData[_0x27a872(0x1ab)],_0x27a872(0x1c3),_0x1d40b4=>{const _0x17deaa=_0x27a872;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x17deaa(0x22b)](_0x1d40b4,_0x1d40b4);const _0x11cba6=_0x1d40b4['opacity'],_0x419241=_0x1d40b4[_0x17deaa(0x234)];for(const _0x37a766 of _0x1d40b4[_0x17deaa(0x1df)]){if(_0x17deaa(0x211)===_0x17deaa(0x1e8))_0x210efc(_0x17deaa(0x1c1)[_0x17deaa(0x1d9)](_0x304684,_0x4baa00)),_0x20bd6b[_0x17deaa(0x212)]();else{const _0x16f197=$gameTroop[_0x17deaa(0x1bd)](_0x37a766);_0x16f197['Extra'][_0x17deaa(0x232)]=_0x11cba6,_0x16f197['duration']=_0x419241;}}}),PluginManager[_0x27a872(0x1ae)](pluginData[_0x27a872(0x1ab)],'BackEnvironmentRemove',_0x52167f=>{const _0x49745a=_0x27a872;if(!SceneManager[_0x49745a(0x1ef)]())return;VisuMZ[_0x49745a(0x22b)](_0x52167f,_0x52167f);const _0x331617=SceneManager[_0x49745a(0x1cb)][_0x49745a(0x1fa)],_0xb7bca5=![];for(const _0x5c865f of _0x52167f[_0x49745a(0x1df)]){_0x331617[_0x49745a(0x1b7)](_0x5c865f,_0xb7bca5);}}),PluginManager[_0x27a872(0x1ae)](pluginData[_0x27a872(0x1ab)],_0x27a872(0x223),_0x3e4c14=>{const _0x1e399e=_0x27a872;if(!SceneManager[_0x1e399e(0x1ef)]())return;VisuMZ[_0x1e399e(0x22b)](_0x3e4c14,_0x3e4c14);const _0xb458c9=VisuMZ[_0x1e399e(0x1ac)][_0x1e399e(0x206)](_0x3e4c14);if(_0xb458c9[_0x1e399e(0x1c4)]['trim']()===''||_0xb458c9[_0x1e399e(0x1fb)]==='')return;const _0x147644=_0xb458c9['ID']||0x0;$gameTroop['setFrontEnvironmentSettings'](_0x147644,_0xb458c9);}),PluginManager['registerCommand'](pluginData[_0x27a872(0x1ab)],_0x27a872(0x242),_0x394b09=>{const _0x56c9e0=_0x27a872;if(!SceneManager[_0x56c9e0(0x1ef)]())return;VisuMZ[_0x56c9e0(0x22b)](_0x394b09,_0x394b09);const _0x12d18b=_0x394b09['opacity'],_0x17dfa2=_0x394b09[_0x56c9e0(0x234)];for(const _0x1c1c56 of _0x394b09[_0x56c9e0(0x1df)]){const _0x415076=$gameTroop[_0x56c9e0(0x1f9)](_0x1c1c56);_0x415076[_0x56c9e0(0x1b3)][_0x56c9e0(0x232)]=_0x12d18b,_0x415076[_0x56c9e0(0x234)]=_0x17dfa2;}}),PluginManager[_0x27a872(0x1ae)](pluginData['name'],_0x27a872(0x1aa),_0x5f1a9b=>{const _0x3f62df=_0x27a872;if(!SceneManager[_0x3f62df(0x1ef)]())return;VisuMZ['ConvertParams'](_0x5f1a9b,_0x5f1a9b);const _0x346a73=SceneManager[_0x3f62df(0x1cb)][_0x3f62df(0x1fa)],_0x32f207=!![];for(const _0x4c0d2d of _0x5f1a9b[_0x3f62df(0x1df)]){_0x3f62df(0x204)==='oIOfU'?_0x36733d['VisualBattleEnv'][_0x3f62df(0x228)][_0x3f62df(0x1d8)](this):_0x346a73[_0x3f62df(0x1b7)](_0x4c0d2d,_0x32f207);}}),VisuMZ[_0x27a872(0x1ac)]['RegExp']={'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},VisuMZ[_0x27a872(0x1ac)]['Game_Troop_setup']=Game_Troop[_0x27a872(0x217)]['setup'],Game_Troop['prototype'][_0x27a872(0x1b6)]=function(_0x3891bb){const _0x2a4b66=_0x27a872;VisuMZ[_0x2a4b66(0x1ac)][_0x2a4b66(0x225)]['call'](this,_0x3891bb),this[_0x2a4b66(0x21a)]();},Game_Troop[_0x27a872(0x217)][_0x27a872(0x21a)]=function(){const _0x41d9cc=_0x27a872;this[_0x41d9cc(0x24d)]=[],this[_0x41d9cc(0x1f2)]=[];},Game_Troop[_0x27a872(0x217)][_0x27a872(0x1bd)]=function(_0x3946b1){const _0x569f00=_0x27a872;return this[_0x569f00(0x24d)]===undefined&&this[_0x569f00(0x21a)](),this[_0x569f00(0x24d)][_0x3946b1]=this[_0x569f00(0x24d)][_0x3946b1]||{},this[_0x569f00(0x24d)][_0x3946b1];},Game_Troop[_0x27a872(0x217)][_0x27a872(0x1fc)]=function(_0x4768f1,_0x29e370){const _0x2b83a7=_0x27a872;this[_0x2b83a7(0x24d)]===undefined&&(_0x2b83a7(0x23a)==='SNjdK'?this[_0x2b83a7(0x221)]=new _0x5a02f6():this[_0x2b83a7(0x21a)]());this[_0x2b83a7(0x24d)][_0x4768f1]=JsonEx[_0x2b83a7(0x1cf)](_0x29e370);if(SceneManager[_0x2b83a7(0x1ef)]()){const _0x2cd819=SceneManager['_scene']['_spriteset'];_0x2cd819[_0x2b83a7(0x237)](_0x4768f1,![]);}},Game_Troop[_0x27a872(0x217)][_0x27a872(0x1f9)]=function(_0x2f403e){const _0x5ef5fd=_0x27a872;return this[_0x5ef5fd(0x1f2)]===undefined&&this[_0x5ef5fd(0x21a)](),this[_0x5ef5fd(0x1f2)][_0x2f403e]=this[_0x5ef5fd(0x1f2)][_0x2f403e]||{},this[_0x5ef5fd(0x1f2)][_0x2f403e];},Game_Troop[_0x27a872(0x217)]['setFrontEnvironmentSettings']=function(_0x24d415,_0x2e3ecd){const _0x42ac1d=_0x27a872;this['_frontEnvironmentSettings']===undefined&&this[_0x42ac1d(0x21a)]();this[_0x42ac1d(0x1f2)][_0x24d415]=JsonEx[_0x42ac1d(0x1cf)](_0x2e3ecd);if(SceneManager['isSceneBattle']()){if(_0x42ac1d(0x1db)==='tpbKO'){const _0x567b10=SceneManager[_0x42ac1d(0x1cb)][_0x42ac1d(0x1fa)];_0x567b10[_0x42ac1d(0x237)](_0x24d415,!![]);}else _0x5375df[_0x42ac1d(0x1b7)](_0x5dc8db,_0x3478e5);}},VisuMZ[_0x27a872(0x1ac)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x27a872(0x217)][_0x27a872(0x1b4)],Scene_Battle['prototype'][_0x27a872(0x1b4)]=function(){const _0x5c8c8c=_0x27a872;VisuMZ[_0x5c8c8c(0x1ac)]['Scene_Battle_createSpriteset'][_0x5c8c8c(0x1d8)](this),this['restoreVisualBattleEnv']();},Scene_Battle[_0x27a872(0x217)][_0x27a872(0x241)]=function(){const _0xdc4544=_0x27a872;if(!SceneManager[_0xdc4544(0x20c)]())return;const _0x56220a=$gameTroop[_0xdc4544(0x24d)]||[];for(const _0x1cb0a4 of _0x56220a){if(!_0x1cb0a4)continue;const _0x355e77=_0x1cb0a4['ID'];_0x1cb0a4['duration']=0x1,$gameTroop[_0xdc4544(0x1fc)](_0x355e77,_0x1cb0a4);}const _0x5f20af=$gameTroop[_0xdc4544(0x1f2)]||[];for(const _0x1ba60e of _0x5f20af){if(_0xdc4544(0x1d2)!=='VnhLA'){const _0x4c0e6d=_0x1e8dfa[_0xdc4544(0x1f9)](_0x4fa4d5);_0x4c0e6d[_0xdc4544(0x1b3)][_0xdc4544(0x232)]=_0x5bc817,_0x4c0e6d[_0xdc4544(0x234)]=_0x4891cc;}else{if(!_0x1ba60e)continue;const _0x4bb89c=_0x1ba60e['ID'];_0x1ba60e[_0xdc4544(0x234)]=0x1,$gameTroop[_0xdc4544(0x202)](_0x4bb89c,_0x1ba60e);}}};function _0x3128(_0x56c600,_0x5ab5a5){const _0x114f3c=_0x114f();return _0x3128=function(_0x312875,_0x422e0e){_0x312875=_0x312875-0x1aa;let _0x404273=_0x114f3c[_0x312875];return _0x404273;},_0x3128(_0x56c600,_0x5ab5a5);}function Sprite_BattleEnvironment(){const _0x1359a2=_0x27a872;this[_0x1359a2(0x21e)](...arguments);}Sprite_BattleEnvironment['prototype']=Object[_0x27a872(0x1d7)](Sprite_Battleback['prototype']),Sprite_BattleEnvironment[_0x27a872(0x217)]['constructor']=Sprite_BattleEnvironment,Sprite_BattleEnvironment[_0x27a872(0x217)][_0x27a872(0x21e)]=function(_0x2702c9,_0x272f1f){const _0x39f052=_0x27a872;this[_0x39f052(0x205)]=_0x2702c9,this['_front']=_0x272f1f,Sprite_Battleback[_0x39f052(0x217)][_0x39f052(0x21e)]['call'](this,0x0),this['_createColorFilter'](),this[_0x39f052(0x232)]=0x0;},Sprite_BattleEnvironment[_0x27a872(0x217)][_0x27a872(0x1f1)]=function(){},Sprite_BattleEnvironment[_0x27a872(0x217)][_0x27a872(0x20b)]=function(){const _0x394b53=_0x27a872;if(!this[_0x394b53(0x221)]){if(_0x394b53(0x22d)!==_0x394b53(0x216))this[_0x394b53(0x221)]=new ColorFilter();else{if(!_0x1f1a8d[_0x394b53(0x1ef)]())return;_0x262333[_0x394b53(0x22b)](_0x357d4d,_0x3c6611);const _0x105cbb=_0x17a292['_scene']['_spriteset'],_0x3aa26c=!![];for(const _0x3d7885 of _0x5377d2[_0x394b53(0x1df)]){_0x105cbb[_0x394b53(0x1b7)](_0x3d7885,_0x3aa26c);}}}!this[_0x394b53(0x231)]&&(this[_0x394b53(0x231)]=[]),this['filters'][_0x394b53(0x1dc)](this[_0x394b53(0x221)]);},Sprite_BattleEnvironment[_0x27a872(0x217)]['settings']=function(){const _0x58a7e1=_0x27a872;return this[_0x58a7e1(0x22a)]?$gameTroop[_0x58a7e1(0x1f9)](this['_id']):$gameTroop[_0x58a7e1(0x1bd)](this[_0x58a7e1(0x205)]);},Sprite_BattleEnvironment['prototype']['update']=function(){const _0x336af2=_0x27a872;Sprite_Battleback[_0x336af2(0x217)][_0x336af2(0x244)]['call'](this),this[_0x336af2(0x209)](),this[_0x336af2(0x24c)](),this[_0x336af2(0x1c8)](),this[_0x336af2(0x246)](),this['_updateColorFilter']();},Sprite_BattleEnvironment['prototype'][_0x27a872(0x209)]=function(){const _0x363df3=_0x27a872,_0x2fa061=this['settings']();if(!_0x2fa061)return;if(this[_0x363df3(0x1bf)]===_0x2fa061[_0x363df3(0x1c4)]&&this[_0x363df3(0x21f)]===_0x2fa061[_0x363df3(0x1fb)]){if('hfxav'===_0x363df3(0x1be))return;else this[_0x363df3(0x1af)]=_0x38e37d,this[_0x363df3(0x1c6)](),this[_0x363df3(0x1d5)]['x']=0x0,this[_0x363df3(0x1d5)]['y']=0x0;}this['_folder']=_0x2fa061[_0x363df3(0x1c4)],this['_filename']=_0x2fa061['Filename'];const _0x473012='img/%1/'[_0x363df3(0x1d9)](this[_0x363df3(0x1bf)]['trim']()),_0x5b3f59=ImageManager[_0x363df3(0x1c0)](_0x473012,this['_filename'][_0x363df3(0x21d)]());_0x5b3f59['addLoadListener'](this['processBitmap']['bind'](this,_0x5b3f59));},Sprite_BattleEnvironment[_0x27a872(0x217)][_0x27a872(0x23e)]=function(_0x253cb5){const _0x4b77a6=_0x27a872;this[_0x4b77a6(0x1af)]=_0x253cb5,this[_0x4b77a6(0x1c6)](),this['origin']['x']=0x0,this['origin']['y']=0x0;},Sprite_BattleEnvironment[_0x27a872(0x217)][_0x27a872(0x1c6)]=function(){const _0x36dbac=_0x27a872,_0x4d88b0=this[_0x36dbac(0x1e3)]();if(!_0x4d88b0)return;let _0x1af825=_0x4d88b0[_0x36dbac(0x1b3)][_0x36dbac(0x224)]||_0x36dbac(0x1b9);if(_0x1af825===_0x36dbac(0x1b9)){if(_0x36dbac(0x233)!==_0x36dbac(0x24a)){if(VisuMZ['BattleCore'][_0x36dbac(0x200)][_0x36dbac(0x1ba)])_0x1af825=VisuMZ[_0x36dbac(0x1b9)][_0x36dbac(0x200)]['BattlebackScale'][_0x36dbac(0x1d1)]||'MZ';else VisuMZ[_0x36dbac(0x1b9)][_0x36dbac(0x200)]['Battleback']&&(_0x1af825=VisuMZ[_0x36dbac(0x1b9)][_0x36dbac(0x200)]['Battleback'][_0x36dbac(0x1d1)]||'MZ');}else return this[_0x36dbac(0x235)];}switch(_0x1af825){case'MZ':VisuMZ[_0x36dbac(0x1b9)][_0x36dbac(0x1cd)][_0x36dbac(0x1d8)](this);break;case _0x36dbac(0x1b1):this[_0x36dbac(0x1e1)]();break;case _0x36dbac(0x23b):this['adjustPosition_ScaleToFit']();break;case _0x36dbac(0x20f):this[_0x36dbac(0x1b5)]();break;case'ScaleUp':this[_0x36dbac(0x20a)]();break;}},Sprite_BattleEnvironment['prototype']['updateBlendMode']=function(){const _0x38e37b=_0x27a872,_0xc18f36=this[_0x38e37b(0x1e3)]();if(!_0xc18f36)return;if(this[_0x38e37b(0x236)]!==_0xc18f36['Extra'][_0x38e37b(0x236)]){if(_0x38e37b(0x24e)!=='ylowV'){_0x5a2d36=_0x11e47a['makeDeepCopy'](_0x41c069);if(_0x3af040[_0x38e37b(0x1f3)]){const _0x518478=_0x4815f9[_0x38e37b(0x1f3)][_0x38e37b(0x22e)]('/');_0x2549c8[_0x38e37b(0x1fb)]=_0x518478['pop'](),_0x1480a3[_0x38e37b(0x1c4)]=_0x518478[_0x38e37b(0x1e6)]('/');}else _0x333454['Folder']='',_0x416b99[_0x38e37b(0x1fb)]='';return _0x2195da['Extra']=_0x2399d1[_0x38e37b(0x1b3)]||{},_0x5b3834[_0x38e37b(0x1b3)][_0x38e37b(0x224)]=_0x407b52[_0x38e37b(0x1b3)][_0x38e37b(0x224)]??_0x38e37b(0x1b9),_0x198092[_0x38e37b(0x1b3)][_0x38e37b(0x236)]=_0x3eccc7['Extra'][_0x38e37b(0x236)]??0x0,_0x49c4f6[_0x38e37b(0x1b3)]['opacity']=_0x2fe064['Extra'][_0x38e37b(0x232)]??0xff,_0x22d053[_0x38e37b(0x1b3)][_0x38e37b(0x1bb)]=_0x430f97[_0x38e37b(0x1b3)][_0x38e37b(0x1bb)]??0x0,_0x2e9d33[_0x38e37b(0x1b3)][_0x38e37b(0x203)]=_0x4f629c[_0x38e37b(0x1b3)][_0x38e37b(0x203)]??0x0,_0x3a1d6d;}else this[_0x38e37b(0x236)]=_0xc18f36[_0x38e37b(0x1b3)][_0x38e37b(0x236)];}},Sprite_BattleEnvironment[_0x27a872(0x217)]['updateOpacity']=function(){const _0x1a33e0=_0x27a872,_0x46bfd3=this[_0x1a33e0(0x1e3)]();if(!_0x46bfd3)return;if(_0x46bfd3[_0x1a33e0(0x234)]>0x0){if(_0x1a33e0(0x1e9)==='jWmxY'){const _0x5a765f=_0x46bfd3['duration'],_0x583539=_0x46bfd3[_0x1a33e0(0x1b3)][_0x1a33e0(0x232)];this['opacity']=(this[_0x1a33e0(0x232)]*(_0x5a765f-0x1)+_0x583539)/_0x5a765f,_0x46bfd3['duration']--;}else{const _0xeb9594=_0x4269b3(_0x26d584['$1']);_0xeb9594!==_0x122f03[_0x5a6a1e][_0x1a33e0(0x22f)]&&(_0x24dcf1(_0x1a33e0(0x1c1)[_0x1a33e0(0x1d9)](_0x1cab14,_0xeb9594)),_0x39a056[_0x1a33e0(0x212)]());}}},Sprite_BattleEnvironment[_0x27a872(0x217)]['updateScrolling']=function(){const _0x3532d4=_0x27a872,_0x47aac9=this[_0x3532d4(0x1e3)]();if(!_0x47aac9)return;this[_0x3532d4(0x1d5)]['x']+=_0x47aac9[_0x3532d4(0x1b3)]['ScrollHorz'],this[_0x3532d4(0x1d5)]['y']+=_0x47aac9[_0x3532d4(0x1b3)][_0x3532d4(0x203)];},Sprite_BattleEnvironment[_0x27a872(0x217)]['_updateColorFilter']=function(){const _0x20ee14=_0x27a872,_0x2dca38=this['settings']();if(!_0x2dca38)return;!this['_colorFilter']&&(_0x20ee14(0x243)!=='CqrZo'?this[_0x20ee14(0x20b)]():this[_0x20ee14(0x1b0)](_0x3621e9,_0x37f136));this[_0x20ee14(0x221)]['setHue'](_0x2dca38['Extra'][_0x20ee14(0x1dd)]);try{if(_0x20ee14(0x247)!==_0x20ee14(0x1ec))this[_0x20ee14(0x221)][_0x20ee14(0x214)](_0x2dca38['Extra']['colorTone']||[0x0,0x0,0x0,0x0]);else{if(_0x384c0a['BattleCore'][_0x20ee14(0x200)][_0x20ee14(0x1ba)])_0x315979=_0x2125dd['BattleCore'][_0x20ee14(0x200)][_0x20ee14(0x1ba)]['DefaultStyle']||'MZ';else _0x9f44a5['BattleCore'][_0x20ee14(0x200)][_0x20ee14(0x229)]&&(_0x29be0b=_0x58615e['BattleCore'][_0x20ee14(0x200)]['Battleback']['DefaultStyle']||'MZ');}}catch(_0x4491f6){this[_0x20ee14(0x221)]['setColorTone']([0x0,0x0,0x0,0x0]);}_0x2dca38[_0x20ee14(0x1b3)][_0x20ee14(0x1dd)]+=_0x2dca38[_0x20ee14(0x1b3)][_0x20ee14(0x1fd)];},VisuMZ[_0x27a872(0x1ac)]['Spriteset_Battle_createBattleback']=Spriteset_Battle['prototype'][_0x27a872(0x1e2)],Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x1e2)]=function(){const _0x52db3f=_0x27a872;VisuMZ[_0x52db3f(0x1ac)]['Spriteset_Battle_createBattleback'][_0x52db3f(0x1d8)](this),this[_0x52db3f(0x222)]();},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x222)]=function(){const _0x5852ac=_0x27a872;this[_0x5852ac(0x235)]=new Sprite(),this[_0x5852ac(0x1fe)][_0x5852ac(0x1d4)](this[_0x5852ac(0x235)]);},VisuMZ[_0x27a872(0x1ac)][_0x27a872(0x239)]=Spriteset_Battle[_0x27a872(0x217)]['createWeather'],Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x1cc)]=function(){const _0x2c6c09=_0x27a872;if(!Imported[_0x2c6c09(0x1c2)])this['createFrontEnvironmentContainer']();VisuMZ[_0x2c6c09(0x1ac)][_0x2c6c09(0x239)][_0x2c6c09(0x1d8)](this);},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x215)]=function(){const _0x56ee27=_0x27a872;this[_0x56ee27(0x1f6)]=new Sprite(),this[_0x56ee27(0x240)]['addChild'](this[_0x56ee27(0x1f6)]),this[_0x56ee27(0x1f6)]['x']=-this[_0x56ee27(0x240)]['x'],this[_0x56ee27(0x1f6)]['y']=-this[_0x56ee27(0x240)]['y'];},VisuMZ[_0x27a872(0x1ac)][_0x27a872(0x228)]=Spriteset_Battle['prototype']['update'],Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x244)]=function(){const _0x5d0a28=_0x27a872;VisuMZ[_0x5d0a28(0x1ac)]['Spriteset_Battle_update'][_0x5d0a28(0x1d8)](this);},Spriteset_Battle[_0x27a872(0x217)]['updateBattleEnvironmentContainers']=function(){const _0x4a420a=_0x27a872;if(this[_0x4a420a(0x1f6)]){}},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x1da)]=function(_0x304986){const _0x114fce=_0x27a872;if(_0x304986){if(_0x114fce(0x1d0)===_0x114fce(0x1c7)){this['_backEnvironmentSettings']===_0x2b09fb&&this['setupVisualBattleEnvironment']();this['_backEnvironmentSettings'][_0x4552c2]=_0xe41d84[_0x114fce(0x1cf)](_0x14eeaf);if(_0x430fe3[_0x114fce(0x1ef)]()){const _0x2ac1ab=_0x4eb3f4[_0x114fce(0x1cb)][_0x114fce(0x1fa)];_0x2ac1ab['updateBattleEnvironmentSprite'](_0x3125c8,![]);}}else return this['_frontEnvironmentContainer'];}else return this[_0x114fce(0x235)];},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x1eb)]=function(_0x24c62f,_0x23dbb6){const _0x18b217=_0x27a872,_0x4454c7=this[_0x18b217(0x1da)](_0x23dbb6);return _0x4454c7[_0x18b217(0x1e5)][_0x18b217(0x21c)](_0x5b1cde=>_0x5b1cde[_0x18b217(0x205)]===_0x24c62f);},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x237)]=function(_0x25af5c,_0x20f476){const _0x38ce62=_0x27a872,_0x5a18b8=this[_0x38ce62(0x1da)](_0x20f476);if(!_0x5a18b8)return;!this[_0x38ce62(0x1eb)](_0x25af5c,_0x20f476)&&(_0x38ce62(0x23f)===_0x38ce62(0x23f)?this[_0x38ce62(0x1b0)](_0x25af5c,_0x20f476):this[_0x38ce62(0x221)][_0x38ce62(0x214)]([0x0,0x0,0x0,0x0]));},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x1b0)]=function(_0x31c92b,_0x2d3cd7){const _0x22e252=_0x27a872,_0x33ba93=this[_0x22e252(0x1da)](_0x2d3cd7);if(!_0x33ba93)return;if(!this[_0x22e252(0x1eb)](_0x31c92b,_0x2d3cd7)){const _0x2b6f4b=new Sprite_BattleEnvironment(_0x31c92b,_0x2d3cd7);_0x33ba93[_0x22e252(0x1d4)](_0x2b6f4b),_0x33ba93[_0x22e252(0x1e5)][_0x22e252(0x1ce)]((_0x2f157d,_0x11536e)=>_0x2f157d[_0x22e252(0x205)]-_0x11536e[_0x22e252(0x205)]);}},Spriteset_Battle[_0x27a872(0x217)][_0x27a872(0x1b7)]=function(_0xddcde3,_0x391d84){const _0x234ffc=_0x27a872,_0x2c89dd=this[_0x234ffc(0x1da)](_0x391d84);if(!_0x2c89dd)return;const _0x2a3695=this['getBattleEnvironmentSprite'](_0xddcde3,_0x391d84);_0x2a3695&&(_0x234ffc(0x1e0)===_0x234ffc(0x23c)?(_0x45894b[_0x234ffc(0x217)]['update'][_0x234ffc(0x1d8)](this),this['updateBitmap'](),this[_0x234ffc(0x24c)](),this['updateOpacity'](),this[_0x234ffc(0x246)](),this[_0x234ffc(0x21b)]()):(_0x2c89dd[_0x234ffc(0x208)](_0x2a3695),_0x2c89dd[_0x234ffc(0x1e5)][_0x234ffc(0x1ce)]((_0x4cf1f7,_0xb23575)=>_0x4cf1f7[_0x234ffc(0x205)]-_0xb23575['_id'])));};