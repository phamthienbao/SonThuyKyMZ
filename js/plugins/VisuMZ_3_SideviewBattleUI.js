//=============================================================================
// VisuStella MZ - Sideview Battle UI
// VisuMZ_3_SideviewBattleUI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SideviewBattleUI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SideviewBattleUI = VisuMZ.SideviewBattleUI || {};
VisuMZ.SideviewBattleUI.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [SideviewBattleUI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Sideview_Battle_UI_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ Battle UI for Sideview Battle Systems
 * into something more minimalistic. The menus are placed towards the player's
 * party to let the player focus their attention to the center of the screen
 * instead of to the lower ledges of the screen. The input command windows show
 * up near the inputting actor to give the player a clear understanding of who
 * is performing what action.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * Features include all (but not limited to) the following:
 * 
 * * This plugin changes the UI for the RPG Maker MZ Sideview Battle System.
 * * Status windows appear on the side of the screen for each actor in battle.
 * * The appearance is more compact for both the status windows and input
 *   command windows.
 * * More of the battlefield can be seen with this kind of layout.
 * * Lots of customization options to adjust the status windows.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sideview Only
 * 
 * This plugin only works for the sideview battle system. If this layout is
 * selected in the Battle Core, the battle system will automatically shift to
 * sideview regardless of the settings.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * ---
 * 
 * Window Properties
 * 
 * With how the battle layout works, many of the command windows used in the
 * battle system will have preset and hardcoded properties to them in order to
 * maintain a specific aesthetic. These include columns, padding, and scaling
 * types to name a few.
 * 
 * Therefore, any plugins that may alter these effects may not have any effect
 * at all provided that this plugin is in a higher tier than those modifying
 * it. This is an intended change to maintain the aesthetic and is not a bug.
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
 * VisuMZ_2_AggroControlSystem
 * VisuMZ_2_BattleSystemBTB
 * VisuMZ_3_BoostAction
 * VisuMZ_3_StateTooltips
 * VisuMZ_4_BreakShields
 *
 * There are features provided in this plugin for the above plugins. Their UI
 * elements can be shown with this plugin's status windows.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Offset Settings
 * ============================================================================
 *
 * Settings for battler sprite offsets when using the Sideview Battle UI.
 * Since there's more room on the screen, placing them lower will help adjust
 * for the player's visual comfort.
 *
 * ---
 *
 * Settings
 * 
 *   Perform Offset?:
 *   - Offsets the battler sprite positions when using Sideview Battle UI.
 * 
 *   Offset X:
 *   - How much to offset the sprite positions by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the sprite positions by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Window Settings
 * ============================================================================
 *
 * Settings for general windows when using the Sideview Battle UI. These
 * settings are made for the windows that aren't the status windows but are
 * affected by this plugin.
 *
 * ---
 *
 * Global
 * 
 *   UI Scale:
 *   - What is the scaling rate for battle windows?
 *   - Use a number between 0 and 1 for the best results.
 *
 * ---
 *
 * Help Window
 * 
 *   Fade BG Style?:
 *   - Fade the Help Window background with this UI?
 *
 * ---
 *
 * Actor Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the actor command window with
 *     this UI?
 *
 * ---
 *
 * Party Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the party command window with
 *     this UI?
 *
 * ---
 *
 * Item Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the item window with this UI?
 * 
 *   Width:
 *   - What is the width item window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Skill Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the skill window with this UI?
 * 
 *   Width:
 *   - What is the width skill window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Window Settings
 * ============================================================================
 *
 * Settings for the status window when using the Sideview Battle UI. Each of
 * these plugin parameters allow you to adjust many of the various elements
 * found inside of this window.
 *
 * ---
 *
 * Dimensions
 * 
 *   Width Base:
 *   - How width is each actor's status window?
 *   - This is the width AFTER scaling.
 * 
 *   Height Base:
 *   - How tall do you want the status window to be?
 *   - 'auto' for automatic calculations.
 *   - This is the height BEFORE scaling.
 * 
 *     Height Buffer:
 *     - How much space do you want there to be vertically from window
 *       to window?
 *     - This is the height BEFORE scaling.
 * 
 *   Move Distance:
 *   - How far will the status window move when the actor is selected
 *     or active?
 * 
 *     Move Speed:
 *     - How many pixels with the status window move per frame?
 *
 * ---
 * 
 * Standard UI > BG
 * 
 *   Background Dim?:
 *   - Show the dimmed background?
 * 
 * ---
 *
 * Standard UI > Name
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Sprite?:
 *   - Use a sprite or bitmap to draw this element?
 *   - This is added for font sizes that do not work well with name sprites.
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > States
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TPB/ATB Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > HP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > MP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Aggro Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_AggroControlSystem!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Boost Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_BoostAction!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Brave Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Break Shield
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > State Tooltips
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_StateTooltips!
 *
 * ---
 * 
 * JS
 * 
 *   JS: Custom UI:
 *   - JavaScript used to add custom elements to each status window.
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
 * Version 1.09: May 16, 2024
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: April 18, 2024
 * * Feature Update!
 * ** Added failsafes for in odd cases where sprites do not reregister after
 *    changing party members through the full party menu in-battle. Update made
 *    by Olivia.
 * 
 * Version 1.07: April 13, 2023
 * * Bug Fixes!
 * ** If the UI scale is over 1.0, the UI will automatically scale back any
 *    windows that extend past screen boundaries. Update made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Status Window > Standard UI > Name > Sprite?
 * **** Use a sprite or bitmap to draw this element?
 * **** This is added for font sizes that do not work well with name sprites.
 * 
 * Version 1.06: January 20, 2023
 * * Bug Fixes!
 * ** Skill and Item Windows should no longer disappear completely when used
 *    together with the Battle Core's "Middle Layout" for skill and item
 *    windows. Instead the intended setting will be set with the Sideview UI
 *    layout as if it's "false". Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: June 9, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused some windows to not appear correctly when cancel
 *    is pressed upon certain conditions. Fix made by Olivia.
 * 
 * Version 1.04: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Status Window Settings > Background Dim?
 * **** Show the dimmed background?
 * 
 * Version 1.03: July 30, 2021
 * * Bug Fixes!
 * ** Plugin Parameters for adjusting row quantity should now work properly.
 *    Fix made by Olivia.
 * 
 * Version 1.02: June 18, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: April 23, 2021
 * * Bug Fixes!
 * ** Item window during battle should now align properly. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SideviewBattleUI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Battler:struct
 * @text Battler Offset Settings
 * @type struct<Battler>
 * @desc Settings for battler sprite offsets when using the Sideview Battle UI.
 * @default {"Enable:eval":"true","OffsetX:num":"+0","OffsetY:num":"+128"}
 *
 * @param GeneralWindow:struct
 * @text General Window Settings
 * @type struct<GeneralWindow>
 * @desc Settings for general windows when using the Sideview Battle UI.
 * @default {"Global":"","UiScale:num":"0.80","HelpWindow":"","HelpFadeStyle:eval":"true","ActorCommandWindow":"","ActorCommandWindowMaxRows:num":"8","PartyCommandWindow":"","PartyCommandWindowMaxRows:num":"8","ItemWindow":"","ItemWindowMaxRows:num":"8","ItemWindowWidth:num":"400","ItemWindowOffsetX:num":"+16","ItemWindowOffsetY:num":"+16","SkillWindow":"","SkillWindowMaxRows:num":"8","SkillWindowWidth:num":"400","SkillWindowOffsetX:num":"+16","SkillWindowOffsetY:num":"+16"}
 *
 * @param StatusWindow:struct
 * @text Status Window Settings
 * @type struct<StatusWindow>
 * @desc Settings for the status window when using the Sideview Battle UI.
 * @default {"Dimensions":"","WidthBase:num":"200","HeightBase:str":"auto","HeightBuffer:num":"4","MoveDistance:num":"48","MoveSpeed:num":"4","Standard":"","Name":"","NameShow:eval":"true","NameOffsetX:num":"+48","NameOffsetY:num":"+0","States":"","StatesShow:eval":"true","StatesIgnoreScale:eval":"true","StatesOffsetX:num":"+20","StatesOffsetY:num":"+20","Tpb":"","TpbShow:eval":"true","TpbOffsetX:num":"+44","TpbOffsetY:num":"+0","Hp":"","HpShow:eval":"true","HpOffsetX:num":"+60","HpOffsetY:num":"+0","Mp":"","MpShow:eval":"true","MpOffsetX:num":"+68","MpOffsetY:num":"+0","Tp":"","TpShow:eval":"true","TpOffsetX:num":"+74","TpOffsetY:num":"+0","Compatibility":"","Aggro":"","AggroShow:eval":"true","AggroOffsetX:num":"+44","AggroOffsetY:num":"+0","Boost":"","BoostShow:eval":"true","BoostOffsetX:num":"+52","BoostOffsetY:num":"+2","Brave":"","BraveShow:eval":"true","BraveOffsetX:num":"+52","BraveOffsetY:num":"-6","BreakShield":"","BreakShieldShow:eval":"true","BreakShieldIgnoreScale:eval":"true","BreakShieldOffsetX:num":"+20","BreakShieldOffsetY:num":"+20","StateTooltips":"","StateTooltipsShow:eval":"true","JS":"","CustomUi:func":"\"// Declare Variables\\nconst actor = arguments[0];\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\n\\n// Draw Custom Elements\\n// Put in code you want here used for windows classes\""}
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
 * Battler Offset Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Enable:eval
 * @text Perform Offset?
 * @type boolean
 * @on Do Offset
 * @off Don't Offset
 * @desc Offsets the battler sprite positions when using Sideview Battle UI.
 * @default true
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the sprite positions by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the sprite positions by?
 * Negative goes up. Positive goes down.
 * @default +128
 *
 */
/* ----------------------------------------------------------------------------
 * GeneralWindow Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GeneralWindow:
 *
 * @param Global
 *
 * @param UiScale:num
 * @text UI Scale
 * @parent Global
 * @desc What is the scaling rate for battle windows?
 * Use a number between 0 and 1 for the best results.
 * @default 0.80
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFadeStyle:eval
 * @text Fade BG Style?
 * @parent HelpWindow
 * @type boolean
 * @on Fade Background
 * @off Default Background
 * @desc Fade the Help Window background with this UI?
 * @default true
 *
 * @param ActorCommandWindow
 * @text Actor Command Window
 *
 * @param ActorCommandWindowMaxRows:num
 * @text Max Rows
 * @parent ActorCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the actor command window with this UI?
 * @default 8
 *
 * @param PartyCommandWindow
 * @text Party Command Window
 *
 * @param PartyCommandWindowMaxRows:num
 * @text Max Rows
 * @parent PartyCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the party command window with this UI?
 * @default 8
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemWindowMaxRows:num
 * @text Max Rows
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the item window with this UI?
 * @default 8
 *
 * @param ItemWindowWidth:num
 * @text Width
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the width item window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param ItemWindowOffsetX:num
 * @text Offset X
 * @parent ItemWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param ItemWindowOffsetY:num
 * @text Offset Y
 * @parent ItemWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 * @param SkillWindow
 * @text Skill Window
 *
 * @param SkillWindowMaxRows:num
 * @text Max Rows
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the skill window with this UI?
 * @default 8
 *
 * @param SkillWindowWidth:num
 * @text Width
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the width skill window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param SkillWindowOffsetX:num
 * @text Offset X
 * @parent SkillWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param SkillWindowOffsetY:num
 * @text Offset Y
 * @parent SkillWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 */
/* ----------------------------------------------------------------------------
 * Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param Dimensions
 *
 * @param WidthBase:num
 * @text Width Base
 * @parent Dimensions
 * @type number
 * @desc How width is each actor's status window?
 * This is the width AFTER scaling.
 * @default 200
 *
 * @param HeightBase:str
 * @text Height Base
 * @parent Dimensions
 * @type number
 * @desc How tall do you want the status window to be?
 * 'auto' for automatic calculations. Value is BEFORE scaling.
 * @default auto
 *
 * @param HeightBuffer:num
 * @text Height Buffer
 * @parent HeightBase:str
 * @type number
 * @desc How much space do you want there to be vertically from window to window?
 * @default 4
 *
 * @param MoveDistance:num
 * @text Move Distance
 * @parent Dimensions
 * @type number
 * @desc How far will the status window move when
 * the actor is selected or active?
 * @default 48
 *
 * @param MoveSpeed:num
 * @text Move Speed
 * @parent MoveDistance:num
 * @type number
 * @desc How many pixels with the status window move per frame?
 * @default 4
 *
 * @param Standard
 * @text Standard UI
 *
 * @param BgShow:eval
 * @text Background Dim?
 * @parent Standard
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the dimmed background?
 * @default true
 * 
 * @param Name
 * @parent Standard
 *
 * @param NameShow:eval
 * @text Show?
 * @parent Name
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param NameSprite:eval
 * @text Sprite?
 * @parent Name
 * @type boolean
 * @on Sprite
 * @off Bitmap
 * @desc Use a sprite or bitmap to draw this element?
 * @default true
 *
 * @param NameOffsetX:num
 * @text Offset X
 * @parent Name
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +48
 *
 * @param NameOffsetY:num
 * @text Offset Y
 * @parent Name
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param States
 * @parent Standard
 *
 * @param StatesShow:eval
 * @text Show?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param StatesIgnoreScale:eval
 * @text Ignore Scale?
 * @parent States
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param StatesOffsetX:num
 * @text Offset X
 * @parent States
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param StatesOffsetY:num
 * @text Offset Y
 * @parent States
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param Tpb
 * @text TPB/ATB Gauge
 * @parent Standard
 *
 * @param TpbShow:eval
 * @text Show?
 * @parent Tpb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpbOffsetX:num
 * @text Offset X
 * @parent Tpb
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param TpbOffsetY:num
 * @text Offset Y
 * @parent Tpb
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Hp
 * @text HP Gauge
 * @parent Standard
 *
 * @param HpShow:eval
 * @text Show?
 * @parent Hp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param HpOffsetX:num
 * @text Offset X
 * @parent Hp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +60
 *
 * @param HpOffsetY:num
 * @text Offset Y
 * @parent Hp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Mp
 * @text MP Gauge
 * @parent Standard
 *
 * @param MpShow:eval
 * @text Show?
 * @parent Mp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param MpOffsetX:num
 * @text Offset X
 * @parent Mp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +68
 *
 * @param MpOffsetY:num
 * @text Offset Y
 * @parent Mp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Tp
 * @text TP Gauge
 * @parent Standard
 *
 * @param TpShow:eval
 * @text Show?
 * @parent Tp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpOffsetX:num
 * @text Offset X
 * @parent Tp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +74
 *
 * @param TpOffsetY:num
 * @text Offset Y
 * @parent Tp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Compatibility
 * @text Compatibility UI
 * 
 * @param Aggro
 * @text Aggro Gauge
 * @parent Compatibility
 * @default VisuMZ_2_AggroControlSystem
 *
 * @param AggroShow:eval
 * @text Show?
 * @parent Aggro
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_AggroControlSystem!
 * @default true
 *
 * @param AggroOffsetX:num
 * @text Offset X
 * @parent Aggro
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param AggroOffsetY:num
 * @text Offset Y
 * @parent Aggro
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Boost
 * @text Boost Points
 * @parent Compatibility
 * @default VisuMZ_3_BoostAction
 *
 * @param BoostShow:eval
 * @text Show?
 * @parent Boost
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_BoostAction!
 * @default true
 *
 * @param BoostOffsetX:num
 * @text Offset X
 * @parent Boost
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BoostOffsetY:num
 * @text Offset Y
 * @parent Boost
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param Brave
 * @text Brave Points
 * @parent Compatibility
 * @default VisuMZ_2_BattleSystemBTB
 *
 * @param BraveShow:eval
 * @text Show?
 * @parent Brave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_BattleSystemBTB!
 * @default true
 *
 * @param BraveOffsetX:num
 * @text Offset X
 * @parent Brave
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BraveOffsetY:num
 * @text Offset Y
 * @parent Brave
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default -6
 * 
 * @param BreakShield
 * @text Break Shield
 * @parent Compatibility
 * @default VisuMZ_4_BreakShields
 *
 * @param BreakShieldShow:eval
 * @text Show?
 * @parent BreakShield
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param BreakShieldIgnoreScale:eval
 * @text Ignore Scale?
 * @parent BreakShield
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param BreakShieldOffsetX:num
 * @text Offset X
 * @parent BreakShield
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param BreakShieldOffsetY:num
 * @text Offset Y
 * @parent BreakShield
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param StateTooltips
 * @text State Tooltips
 * @parent Compatibility
 * @default VisuMZ_3_StateTooltips
 *
 * @param StateTooltipsShow:eval
 * @text Show?
 * @parent StateTooltips
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param JS
 *
 * @param CustomUi:func
 * @text JS: Custom UI
 * @parent JS
 * @type note
 * @desc JavaScript used to add custom elements to each status window.
 * @default "// Declare Variables\nconst actor = arguments[0];\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\n\n// Draw Custom Elements\n// Put in code you want here used for windows classes"
 *
 */
//=============================================================================

const _0x2aaebd=_0x52ac;function _0x12de(){const _0x55ad25=['305856UzjROq','show','STR','push','visible','applyInverse','Scene_Battle_onActorCancel','sideviewUiWidth','maxSideviewUiRows','MpOffsetY','AGGRO_OFFSET_Y','_skillWindow','VisuMZ_4_BreakShields','prototype','clamp','isSideView','left','StatesShow','TPB_OFFSET_X','SjWDH','isSkillItemWindowsMiddle','createWindowRect','SIDEVIEW_BATTLE_UI_FADE_STYLE','JUciQ','initialize','Battler','Scene_Battle_actorWindowRect','BattleCore','HeightBase','SIDEVIEW_BATTLE_UI_MOVE_BATTLERS','filter','_dimmerSprite','Window_ActorCommand_initialize','ydqHI','placeTimeGauge','clampSideviewUiScaledDimensions','NAME_SPRITE','RVgBt','status','BreakShieldShow','opacity','BREAK_SHIELD_SHOWN','HRVLV','VisuMZ_0_CoreEngine','wyFaa','jXpdU','TpbOffsetY','GHflU','actor','WkMpB','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_Y','_data','Window_SkillList_makeItemList','adjustSideviewUiWidth','NameSprite','isSelected','BoostShow','BreakShieldOffsetX','isShowAggro','gradientFillRect','addWindow','STATES_SHOWN','Window_PartyCommand_initialize','PzWzn','updateSideviewBattleUIPositions','HeightBuffer','length','maxBattleMembers','MoveDistance','fillRect','updateBattler','sideviewUiPositionOffsetY','ebnBu','createCancelButton','actor%1-stateIcon','WIaqj','VisuMZ_2_BattleGridSystem','isWindowMaskingEnabled','9jFitoO','TpOffsetX','BattleLayout','StatusGauge','skill','VisuMZ_3_FrontviewBattleUI','qEvDp','BgShow','round','Game_System_isSideView','STATE_TOOLTIPS_SHOWN','SideviewBattleUI','AiWbd','boxHeight','VisuMZ_3_BoostAction','Scene_Battle_statusWindowRect','isShowTpbGauge','BXVaB','dataSideviewUiLength','iconHeight','HelpFadeStyle','_enemyWindow','allowBoostAction','Scene_Battle_createCancelButton','_homeX','kgTbY','BoostOffsetX','gaugeLineHeight','drawBasicStatus','onEnemyCancel','NameOffsetY','TP_GAUGE_OFFSET_Y','MP_GAUGE_SHOWN','isUsingFrontviewUiLayout','onActorCancel','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X','GeneralWindow','updateSideviewUiFadeIn','initMembersSideviewUi','BreakShieldOffsetY','ANMwn','map','UiScale','BG_SHOW','updateRefresh','Scene_Battle_updateStatusWindowPosition','Window_ItemList_maxCols','2000870OcttEm','isSceneBattle','AGGRO_SHOWN','TP_GAUGE_SHOWN','Enable','MpShow','BreakShieldIgnoreScale','Window_ItemList_initialize','yLhVl','VisuMZ_2_AggroControlSystem','padding','AmvOm','activate','colSpacing','actor%1-breakShieldIcon','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y','call','TPB_SHOWN','resize','name','CommandWidth','_partyCommandWindow','SIDEVIEW_BATTLE_UI_WINDOW_WIDTH','isStateTooltipTouched','sideviewUiPositionOffsetX','version','autoRowCount','isUsingSideviewUiLayout','_currentActor','placeAggroGauge','kpAFy','_targetX','clearBattleRefreshRequest','HpShow','placeBreakShieldIcon','Window_SkillList_colSpacing','updateSideviewUiFadeOut','isActivePosition','ICON_SIZE_RATE','_list','TCBIU','lineHeight','msSyn','Window_SkillList_maxCols','actorWindowRect','isBattleRefreshRequested','drawActorBravePoints','battler','StatesOffsetY','TpbOffsetX','dimColor1','statusWindowRect','3896BcjRPK','_actorCommandWindow','includes','Window_BattleStatus_updateRefresh','Window_ItemList_colSpacing','aliveMembers','AGGRO_OFFSET_X','updateRefreshSideviewUi','SIDEVIEW_BATTLE_UI_SCALE','floor','isStateTooltipEnabled','auzXB','qvYSM','Window_SkillList_initialize','description','ARRAYEVAL','SkillWindowOffsetY','Sprite_Battler_setHome','return\x200','drawCustomJS','_battler','3550996hIHppv','cQJEA','createContents','refreshDimmerBitmap','Window_PartyCommand_makeCommandList','StatusWindow','format','MP_GAUGE_OFFSET_X','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X','_partyIndex','ARRAYSTR','ceil','Window_ItemList_makeItemList','Window_Help_initialize','create','BOOST_OFFSET_X','ZhBaI','dMBdn','Scene_Battle_onEnemyCancel','createSideviewUiBattleStatusWindows','VisuMZ_2_BattleSystemBTB','2781TBqQhu','constructor','Window_ActorCommand_makeCommandList','isUsingGridSystem','worldTransform','XdtQX','boxWidth','fittingHeight','AggroControlSystem','SkillWindowWidth','createStatusWindow','sideviewUiTargetActor','hide','open','setBackgroundType','PartyCommandWindowMaxRows','clampSideviewUiPlacementPosition','kaJHg','ZCmSh','active','_requestRefresh','_activeX','HEIGHT_BASE','exit','gaugeHeight','OffsetX','SkillItemMiddleLayout','adjustSideviewUiHeight','Window_Base_show','dimColor2','STATES_OFFSET_X','makeItemList','HP_GAUGE_OFFSET_Y','setHome','match','NAME_OFFSET_Y','WIDTH_BASE','HP_GAUGE_SHOWN','NUM','MpOffsetX','ARRAYSTRUCT','SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS','qAAmu','NameOffsetX','JSON','hideAdditionalSprites','_additionalSprites','WhJGr','Window_Base_open','MOVE_SPEED','1310uxCOXD','placeGauge','BRAVE_SHOWN','SkillWindowMaxRows','MP_GAUGE_OFFSET_Y','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NameShow','isAdjustBoostPoints','shouldAdjustForSideviewUiLayout','refreshSideviewUiBattleStatusWindows','AggroOffsetX','toUpperCase','BREAK_SHIELD_OFFSET_Y','parse','placeActorName','mRWFt','maxCols','refresh','TpbShow','BREAK_SHIELD_REVERSE_SCALE','width','kNgEa','update','ARRAYJSON','scale','BraveOffsetY','max','makeCommandList','WIDTH_MOVE','bitmap','_sideviewUiBattleStatusWindows','STATES_REVERSE_SCALE','VisuMZ_2_BattleSystemCTB','IeHTj','zZbyj','StatesOffsetX','isAdjustBravePoints','6035060kbiYzw','battleLayoutStyle','MBadj','drawActorName','isBTB','_actor','BoostOffsetY','CustomUi','DEXVs','battleMembers','BRAVE_OFFSET_X','qnvwT','height','183698EuzhTw','TP_GAUGE_OFFSET_X','BREAK_SHIELD_OFFSET_X','addChildToBack','BRAVE_OFFSET_Y','BOOST_OFFSET_Y','HP_GAUGE_OFFSET_X','currentSymbol','11802lmQwDF','min','BOOST_SHOWN','ItemWindowOffsetX','updateStatusWindowPosition','sideview_ui','riOzJ','drawAllItems','placeStateIcon','placeBoostPoints','SkillWindowOffsetX','returnSideviewCommandWindows','TpShow','TPB_OFFSET_Y','caBLX','MoveSpeed','aggroGauge','Settings','isInputting','OffsetY','rLxhY','AggroShow','actorId','njusp','NAME_SHOWN','ZVjSJ','_scene','_itemWindow','Scene_Battle_createStatusWindow','ConvertParams','XFyHc','updateSideviewUiPosition','STRUCT','HEIGHT_BUFFER','NAME_OFFSET_X'];_0x12de=function(){return _0x55ad25;};return _0x12de();}(function(_0x26edad,_0x4a3b15){const _0x47eb90=_0x52ac,_0x304431=_0x26edad();while(!![]){try{const _0xf537b3=parseInt(_0x47eb90(0x1fb))/0x1+parseInt(_0x47eb90(0x1c9))/0x2*(-parseInt(_0x47eb90(0x197))/0x3)+-parseInt(_0x47eb90(0x182))/0x4+parseInt(_0x47eb90(0x139))/0x5+-parseInt(_0x47eb90(0xbc))/0x6+parseInt(_0x47eb90(0x99))/0x7*(parseInt(_0x47eb90(0x16d))/0x8)+-parseInt(_0x47eb90(0x10a))/0x9*(-parseInt(_0x47eb90(0x1ee))/0xa);if(_0xf537b3===_0x4a3b15)break;else _0x304431['push'](_0x304431['shift']());}catch(_0x499eb3){_0x304431['push'](_0x304431['shift']());}}}(_0x12de,0x70ed6));function _0x52ac(_0x4bee6f,_0x3a71bf){const _0x12de5e=_0x12de();return _0x52ac=function(_0x52ac72,_0x148c3f){_0x52ac72=_0x52ac72-0x95;let _0x3aed23=_0x12de5e[_0x52ac72];return _0x3aed23;},_0x52ac(_0x4bee6f,_0x3a71bf);}var label=_0x2aaebd(0x115),tier=tier||0x0,dependencies=[_0x2aaebd(0xe7),'VisuMZ_1_BattleCore'],pluginData=$plugins[_0x2aaebd(0xda)](function(_0x388f96){const _0x42822c=_0x2aaebd;return _0x388f96[_0x42822c(0xe2)]&&_0x388f96[_0x42822c(0x17b)][_0x42822c(0x16f)]('['+label+']');})[0x0];VisuMZ[label][_0x2aaebd(0xaa)]=VisuMZ[label][_0x2aaebd(0xaa)]||{},VisuMZ[_0x2aaebd(0xb6)]=function(_0x36e6ad,_0x6d2fe7){const _0x517a27=_0x2aaebd;for(const _0x419195 in _0x6d2fe7){if('tewvW'===_0x517a27(0x1d8))return this[_0x517a27(0x154)]()?0x1:_0x3f9e97['SideviewBattleUI'][_0x517a27(0x138)][_0x517a27(0x149)](this);else{if(_0x419195[_0x517a27(0x1b9)](/(.*):(.*)/i)){if('wvQGs'===_0x517a27(0xe9))_0x3bfbf8['SideviewBattleUI'][_0x517a27(0xf0)][_0x517a27(0x149)](this),this[_0x517a27(0xf1)](),this[_0x517a27(0x1b2)](),this[_0x517a27(0xb8)]();else{const _0x10fe55=String(RegExp['$1']),_0x592298=String(RegExp['$2'])[_0x517a27(0x1d4)]()['trim']();let _0x496dfd,_0x219745,_0x5aa3b3;switch(_0x592298){case _0x517a27(0x1bd):_0x496dfd=_0x6d2fe7[_0x419195]!==''?Number(_0x6d2fe7[_0x419195]):0x0;break;case'ARRAYNUM':_0x219745=_0x6d2fe7[_0x419195]!==''?JSON['parse'](_0x6d2fe7[_0x419195]):[],_0x496dfd=_0x219745['map'](_0x3a9af2=>Number(_0x3a9af2));break;case'EVAL':_0x496dfd=_0x6d2fe7[_0x419195]!==''?eval(_0x6d2fe7[_0x419195]):null;break;case _0x517a27(0x17c):_0x219745=_0x6d2fe7[_0x419195]!==''?JSON['parse'](_0x6d2fe7[_0x419195]):[],_0x496dfd=_0x219745[_0x517a27(0x133)](_0x4c541f=>eval(_0x4c541f));break;case _0x517a27(0x1c3):_0x496dfd=_0x6d2fe7[_0x419195]!==''?JSON[_0x517a27(0x1d6)](_0x6d2fe7[_0x419195]):'';break;case _0x517a27(0x1e0):_0x219745=_0x6d2fe7[_0x419195]!==''?JSON[_0x517a27(0x1d6)](_0x6d2fe7[_0x419195]):[],_0x496dfd=_0x219745[_0x517a27(0x133)](_0x4f97cd=>JSON[_0x517a27(0x1d6)](_0x4f97cd));break;case'FUNC':_0x496dfd=_0x6d2fe7[_0x419195]!==''?new Function(JSON[_0x517a27(0x1d6)](_0x6d2fe7[_0x419195])):new Function(_0x517a27(0x17f));break;case'ARRAYFUNC':_0x219745=_0x6d2fe7[_0x419195]!==''?JSON['parse'](_0x6d2fe7[_0x419195]):[],_0x496dfd=_0x219745[_0x517a27(0x133)](_0x42a0c3=>new Function(JSON[_0x517a27(0x1d6)](_0x42a0c3)));break;case _0x517a27(0xbe):_0x496dfd=_0x6d2fe7[_0x419195]!==''?String(_0x6d2fe7[_0x419195]):'';break;case _0x517a27(0x18c):_0x219745=_0x6d2fe7[_0x419195]!==''?JSON[_0x517a27(0x1d6)](_0x6d2fe7[_0x419195]):[],_0x496dfd=_0x219745[_0x517a27(0x133)](_0x19d4c1=>String(_0x19d4c1));break;case _0x517a27(0xb9):_0x5aa3b3=_0x6d2fe7[_0x419195]!==''?JSON[_0x517a27(0x1d6)](_0x6d2fe7[_0x419195]):{},_0x496dfd=VisuMZ[_0x517a27(0xb6)]({},_0x5aa3b3);break;case _0x517a27(0x1bf):_0x219745=_0x6d2fe7[_0x419195]!==''?JSON[_0x517a27(0x1d6)](_0x6d2fe7[_0x419195]):[],_0x496dfd=_0x219745['map'](_0x1b8a63=>VisuMZ['ConvertParams']({},JSON['parse'](_0x1b8a63)));break;default:continue;}_0x36e6ad[_0x10fe55]=_0x496dfd;}}}}return _0x36e6ad;},(_0x39da0c=>{const _0x2bffa7=_0x2aaebd,_0x42a2df=_0x39da0c[_0x2bffa7(0x14c)];for(const _0x4a5463 of dependencies){if(_0x2bffa7(0x144)!==_0x2bffa7(0x144))_0x5aa777+=_0x22befe['SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X'],_0x21f5ac+=_0xa272dd[_0x2bffa7(0xee)];else{if(!Imported[_0x4a5463]){if(_0x2bffa7(0x1f0)!==_0x2bffa7(0x1f0)){if(_0x37594c[_0x2bffa7(0x166)]())this[_0x2bffa7(0x1ab)]=![],_0x15e3a8[_0x2bffa7(0x159)](),_0x5e93cb['_scene']['refreshSideviewUiBattleStatusWindows']();else this[_0x2bffa7(0x1ab)]&&(this[_0x2bffa7(0x1ab)]=![],_0x5b067e[_0x2bffa7(0xb3)][_0x2bffa7(0x1d2)]());}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x42a2df,_0x4a5463)),SceneManager['exit']();break;}}}}const _0x291a04=_0x39da0c[_0x2bffa7(0x17b)];if(_0x291a04[_0x2bffa7(0x1b9)](/\[Version[ ](.*?)\]/i)){const _0x4dade2=Number(RegExp['$1']);if(_0x4dade2!==VisuMZ[label][_0x2bffa7(0x152)]){if(_0x2bffa7(0x183)!==_0x2bffa7(0x104))alert(_0x2bffa7(0x1ce)[_0x2bffa7(0x188)](_0x42a2df,_0x4dade2)),SceneManager[_0x2bffa7(0x1ae)]();else{let _0x12a246=_0xfd55af+_0x341266[_0x2bffa7(0x1fc)],_0xdef13f=_0x328bf0+_0x2a2a86[_0x2bffa7(0x129)];this[_0x2bffa7(0x1ca)](_0x233949,'tp',_0x12a246,_0xdef13f),_0x27b519+=this['gaugeLineHeight']();}}}if(_0x291a04['match'](/\[Tier[ ](\d+)\]/i)){const _0x14a9df=Number(RegExp['$1']);_0x14a9df<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2bffa7(0x188)](_0x42a2df,_0x14a9df,tier)),SceneManager[_0x2bffa7(0x1ae)]()):tier=Math['max'](_0x14a9df,tier);}VisuMZ[_0x2bffa7(0xb6)](VisuMZ[label][_0x2bffa7(0xaa)],_0x39da0c['parameters']);})(pluginData),BattleManager[_0x2aaebd(0x154)]=function(){const _0x48f7d6=_0x2aaebd;return SceneManager[_0x48f7d6(0x13a)]()&&SceneManager[_0x48f7d6(0xb3)][_0x48f7d6(0x1ef)]()===_0x48f7d6(0x9e);},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x113)]=Game_System[_0x2aaebd(0xc9)][_0x2aaebd(0xcb)],Game_System[_0x2aaebd(0xc9)][_0x2aaebd(0xcb)]=function(){const _0x2227c6=_0x2aaebd;if(BattleManager[_0x2227c6(0x154)]())return!![];return VisuMZ['SideviewBattleUI'][_0x2227c6(0x113)][_0x2227c6(0x149)](this);},VisuMZ[_0x2aaebd(0x115)]['Scene_Base_isWindowMaskingEnabled']=Scene_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x109)],Scene_Base[_0x2aaebd(0xc9)]['isWindowMaskingEnabled']=function(){const _0x23aab1=_0x2aaebd;if(BattleManager[_0x23aab1(0x154)]())return![];else{if(_0x23aab1(0xcf)===_0x23aab1(0xcf))return VisuMZ[_0x23aab1(0x115)]['Scene_Base_isWindowMaskingEnabled'][_0x23aab1(0x149)](this);else _0x1fa120[_0x23aab1(0x1dc)]?_0xd796a2+=_0x34013a[_0x23aab1(0x18d)](_0x317a40[_0x23aab1(0x11d)]/this['scale']['y']):_0x55aad5+=_0x354263[_0x23aab1(0x11d)],_0x5cd848+=0x4;}},VisuMZ[_0x2aaebd(0x115)]['Scene_Battle_statusWindowRect']=Scene_Battle['prototype'][_0x2aaebd(0x16c)],Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0x16c)]=function(){const _0x91f77a=_0x2aaebd,_0x6f5462=VisuMZ[_0x91f77a(0x115)][_0x91f77a(0x119)][_0x91f77a(0x149)](this);if(BattleManager[_0x91f77a(0x154)]()){if(_0x91f77a(0x161)===_0x91f77a(0x161))_0x6f5462['y']=Graphics[_0x91f77a(0x1fa)]*0xa,_0x6f5462['height']=0x0;else return this[_0x91f77a(0x154)]()?0x1:_0x43ad28['SideviewBattleUI'][_0x91f77a(0x164)][_0x91f77a(0x149)](this);}return _0x6f5462;},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xd6)]=Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0x165)],Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0x165)]=function(){const _0x2e30e1=_0x2aaebd,_0x4e2e2f=VisuMZ[_0x2e30e1(0x115)]['Scene_Battle_actorWindowRect'][_0x2e30e1(0x149)](this);if(BattleManager[_0x2e30e1(0x154)]()){if(_0x2e30e1(0x1c6)===_0x2e30e1(0x1c6))_0x4e2e2f['y']=Graphics[_0x2e30e1(0x1fa)]*0xa,_0x4e2e2f[_0x2e30e1(0x1fa)]=0x0;else{let _0x285ff2=_0x5eea5b+_0x158cd4[_0x2e30e1(0xce)],_0x1f97a2=_0x553afb+_0x2b1e0b[_0x2e30e1(0xa6)];this[_0x2e30e1(0xde)](_0x9cc90e,_0x285ff2,_0x1f97a2);}}return _0x4e2e2f;},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x137)]=Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0x9d)],Scene_Battle['prototype'][_0x2aaebd(0x9d)]=function(){const _0x524caf=_0x2aaebd;VisuMZ[_0x524caf(0x115)]['Scene_Battle_updateStatusWindowPosition']['call'](this),this['updateSideviewBattleUIPositions']();},Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0xfc)]=function(){const _0x2edb23=_0x2aaebd;if(!BattleManager[_0x2edb23(0xab)]())return;if(!BattleManager[_0x2edb23(0x154)]())return;if(this[_0x2edb23(0x14e)][_0x2edb23(0x1aa)]){if(_0x2edb23(0x1de)==='kNgEa')this[_0x2edb23(0x14e)][_0x2edb23(0xb8)]();else return _0xfe3266[_0x2edb23(0x1c0)];}if(this[_0x2edb23(0x16e)][_0x2edb23(0x1aa)]){if(_0x2edb23(0xed)==='WkMpB')this[_0x2edb23(0x16e)][_0x2edb23(0xb8)]();else return _0x161d6b[_0x2edb23(0x14f)]||0xc0;}this['_skillWindow'][_0x2edb23(0x1aa)]&&(this[_0x2edb23(0x16e)][_0x2edb23(0xb8)](),this[_0x2edb23(0xc7)][_0x2edb23(0xb8)]());if(this[_0x2edb23(0xb4)][_0x2edb23(0x1aa)]){if(_0x2edb23(0xb2)!==_0x2edb23(0xd3))this['_actorCommandWindow'][_0x2edb23(0xb8)](),this[_0x2edb23(0xb4)]['updateSideviewUiPosition']();else{const _0x44f825=new _0x597e18(_0x285964);this[_0x2edb23(0xf8)](_0x44f825),this[_0x2edb23(0x1e7)][_0x2edb23(0xbf)](_0x44f825);}}if(this['_actorWindow']['active']){if(_0x2edb23(0xe8)==='wyFaa')this[_0x2edb23(0x16e)]['updateSideviewUiFadeOut'](),this[_0x2edb23(0xc7)][_0x2edb23(0x15d)](),this[_0x2edb23(0xb4)][_0x2edb23(0x15d)]();else return![];}this['_enemyWindow'][_0x2edb23(0x1aa)]&&(this[_0x2edb23(0x16e)]['updateSideviewUiFadeOut'](),this[_0x2edb23(0xc7)][_0x2edb23(0x15d)](),this[_0x2edb23(0xb4)][_0x2edb23(0x15d)]());},Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0xd0)]=function(){const _0x207438=_0x2aaebd;if(BattleManager[_0x207438(0x154)]())return![];return VisuMZ[_0x207438(0xd7)][_0x207438(0xaa)][_0x207438(0x10c)][_0x207438(0x1b1)];},VisuMZ['SideviewBattleUI'][_0x2aaebd(0xb5)]=Scene_Battle[_0x2aaebd(0xc9)]['createStatusWindow'],Scene_Battle['prototype'][_0x2aaebd(0x1a1)]=function(){const _0x4ad8f3=_0x2aaebd;VisuMZ['SideviewBattleUI'][_0x4ad8f3(0xb5)][_0x4ad8f3(0x149)](this),this[_0x4ad8f3(0x195)]();},Scene_Battle['prototype'][_0x2aaebd(0x195)]=function(){const _0x4b8f27=_0x2aaebd;if(!BattleManager['isUsingSideviewUiLayout']())return;this['_sideviewUiBattleStatusWindows']=[];const _0x3d73a6=$gameParty[_0x4b8f27(0xff)]();for(let _0x4d90f0=0x0;_0x4d90f0<_0x3d73a6;_0x4d90f0++){if(_0x4b8f27(0x1f6)===_0x4b8f27(0x1f6)){const _0x58c226=new Window_SideviewUiBattleStatus(_0x4d90f0);this[_0x4b8f27(0xf8)](_0x58c226),this['_sideviewUiBattleStatusWindows'][_0x4b8f27(0xbf)](_0x58c226);}else this[_0x4b8f27(0x16e)]['updateSideviewUiPosition']();}},Scene_Battle[_0x2aaebd(0xc9)]['refreshSideviewUiBattleStatusWindows']=function(){const _0x20b82f=_0x2aaebd;if(!this[_0x20b82f(0x1e7)])return;for(const _0x5e5faf of this[_0x20b82f(0x1e7)]){if('icWgZ'==='icWgZ'){if(!_0x5e5faf)continue;_0x5e5faf['refresh']();}else return this['_battler'];}},VisuMZ['SideviewBattleUI'][_0x2aaebd(0x121)]=Scene_Battle['prototype']['createCancelButton'],Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0x105)]=function(){const _0x4b991e=_0x2aaebd;if(BattleManager['isUsingSideviewUiLayout']())return;VisuMZ[_0x4b991e(0x115)][_0x4b991e(0x121)][_0x4b991e(0x149)](this);},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xc2)]=Scene_Battle['prototype']['onActorCancel'],Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0x12c)]=function(){const _0xd6ec54=_0x2aaebd;BattleManager[_0xd6ec54(0x154)]()?(this['_actorWindow'][_0xd6ec54(0x1a3)](),this[_0xd6ec54(0xa4)]()):VisuMZ[_0xd6ec54(0x115)][_0xd6ec54(0xc2)][_0xd6ec54(0x149)](this);},VisuMZ['SideviewBattleUI'][_0x2aaebd(0x194)]=Scene_Battle[_0x2aaebd(0xc9)]['onEnemyCancel'],Scene_Battle['prototype'][_0x2aaebd(0x127)]=function(){const _0x373b79=_0x2aaebd;if(BattleManager[_0x373b79(0x154)]()){if(_0x373b79(0xe6)!==_0x373b79(0xe1))this[_0x373b79(0x11f)][_0x373b79(0x1a3)](),this['returnSideviewCommandWindows']();else{if(!this[_0x373b79(0x154)]())return;const _0x380288=this[_0x373b79(0x1fa)],_0x58c4ca=this[_0x373b79(0x11c)](),_0x299d8b=this[_0x373b79(0x19e)](_0x58c4ca),_0x5776ca=this[_0x373b79(0x19e)](this['maxSideviewUiRows']());this[_0x373b79(0x1fa)]=_0x278618[_0x373b79(0x9a)](_0x299d8b,_0x5776ca),this['clampSideviewUiScaledDimensions'](),_0x380288!==this[_0x373b79(0x1fa)]&&this['createContents']();}}else'WOwtC'==='WOwtC'?VisuMZ[_0x373b79(0x115)]['Scene_Battle_onEnemyCancel']['call'](this):this[_0x373b79(0x1d7)](_0xe3c73a,_0x251858,_0x42962d);},Scene_Battle[_0x2aaebd(0xc9)][_0x2aaebd(0xa4)]=function(){const _0x210b40=_0x2aaebd;this[_0x210b40(0x16e)]['show']();switch(this[_0x210b40(0x16e)][_0x210b40(0x98)]()){case _0x210b40(0x10e):this['_skillWindow'][_0x210b40(0xbd)](),this[_0x210b40(0xc7)][_0x210b40(0x145)]();break;case'item':this['_itemWindow']['show'](),this[_0x210b40(0xb4)][_0x210b40(0x145)]();break;}},Sprite_Battler[_0x2aaebd(0xd9)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0xd5)][_0x2aaebd(0x13d)]??!![],Sprite_Battler[_0x2aaebd(0x12d)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0xd5)][_0x2aaebd(0x1b0)]??0x0,Sprite_Battler[_0x2aaebd(0xee)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['Battler'][_0x2aaebd(0xac)]??0x80,VisuMZ[_0x2aaebd(0x115)]['Sprite_Battler_setHome']=Sprite_Battler['prototype'][_0x2aaebd(0x1b8)],Sprite_Battler['prototype'][_0x2aaebd(0x1b8)]=function(_0x31b14b,_0x55958d){const _0x264d97=_0x2aaebd;this[_0x264d97(0x1d1)]()&&(_0x31b14b+=Sprite_Battler['SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X'],_0x55958d+=Sprite_Battler[_0x264d97(0xee)]),VisuMZ[_0x264d97(0x115)][_0x264d97(0x17e)]['call'](this,_0x31b14b,_0x55958d);},Sprite_Battler[_0x2aaebd(0xc9)][_0x2aaebd(0x1d1)]=function(){const _0x103349=_0x2aaebd;if(!BattleManager[_0x103349(0x154)]())return![];if(Imported[_0x103349(0x108)]&&BattleManager['isUsingGridSystem']()){if(_0x103349(0x1ea)===_0x103349(0xeb)){const _0x484d42=_0x103349(0x106)[_0x103349(0x188)](_0x29f3b3[_0x103349(0xaf)]()),_0x32e0ed=this[_0x103349(0x1c5)];if(_0x32e0ed[_0x484d42]){const _0x518dec=_0x32e0ed[_0x484d42];_0x518dec[_0x103349(0x1e1)]['x']=_0x518dec['scale']['y']=0x1/this[_0x103349(0x1e1)]['y'];};}else return![];}if(Imported['VisuMZ_3_FrontviewBattleUI']&&BattleManager[_0x103349(0x12b)]()&&!$gameSystem[_0x103349(0xcb)]())return![];return Sprite_Battler[_0x103349(0xd9)];},Window_Base[_0x2aaebd(0x175)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2aaebd(0x12e)][_0x2aaebd(0x134)]??0.8,Window_Base['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X']=0x0,Window_Base[_0x2aaebd(0x148)]=0x0,Window_Base['prototype'][_0x2aaebd(0x130)]=function(){const _0x372688=_0x2aaebd;if(!this[_0x372688(0x154)]())return;const _0xeb88b9=Window_Base[_0x372688(0x175)];this[_0x372688(0x1e1)]['x']=this[_0x372688(0x1e1)]['y']=_0xeb88b9,this[_0x372688(0xdf)]();},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x154)]=function(){const _0x44ce9e=_0x2aaebd;return BattleManager[_0x44ce9e(0x154)]();},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x1a7)]=function(){const _0x3a3a0e=_0x2aaebd;if(!this['isUsingSideviewUiLayout']())return;const _0x362d77=this[_0x3a3a0e(0x1e1)]['x'],_0x58bc1e=-(Math[_0x3a3a0e(0x176)](Graphics[_0x3a3a0e(0x1dd)]-Graphics[_0x3a3a0e(0x19d)])/0x2),_0x261442=_0x58bc1e+Graphics[_0x3a3a0e(0x1dd)]-Math['ceil'](this['width']*_0x362d77),_0x4b6d81=-(Math[_0x3a3a0e(0x176)](Graphics[_0x3a3a0e(0x1fa)]-Graphics[_0x3a3a0e(0x117)])/0x2),_0xe7f147=_0x4b6d81+Graphics[_0x3a3a0e(0x1fa)]-Math[_0x3a3a0e(0x18d)](this[_0x3a3a0e(0x1fa)]*_0x362d77);this['x']=this['x'][_0x3a3a0e(0xca)](_0x58bc1e,_0x261442),this['y']=this['y'][_0x3a3a0e(0xca)](_0x4b6d81,_0xe7f147);},Window_Base['prototype']['clampSideviewUiScaledDimensions']=function(){const _0xf844a9=_0x2aaebd;let _0x3f64ec=![];this[_0xf844a9(0x1dd)]*this[_0xf844a9(0x1e1)]['x']>Graphics[_0xf844a9(0x19d)]&&(this[_0xf844a9(0x1dd)]=Graphics[_0xf844a9(0x19d)]/this[_0xf844a9(0x1e1)]['x'],_0x3f64ec=!![]),this[_0xf844a9(0x1fa)]*this[_0xf844a9(0x1e1)]['y']>Graphics['boxHeight']&&(this[_0xf844a9(0x1fa)]=Graphics[_0xf844a9(0x117)]/this[_0xf844a9(0x1e1)]['y'],_0x3f64ec=!![]),_0x3f64ec&&(_0xf844a9(0x1c1)!=='qAAmu'?(this['_actorWindow'][_0xf844a9(0x1a3)](),this[_0xf844a9(0xa4)]()):this[_0xf844a9(0x184)]());},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x1a2)]=function(){const _0x128016=_0x2aaebd;return BattleManager[_0x128016(0x155)]||$gameParty[_0x128016(0x172)]()[0x0];},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0xb8)]=function(){const _0x5d6fb8=_0x2aaebd;if(!this[_0x5d6fb8(0x154)]())return;const _0x1207b4=this[_0x5d6fb8(0x1a2)]();if(!_0x1207b4)return;const _0x2c341d=_0x1207b4['battler']();if(!_0x2c341d)return;const _0x3de9bb=SceneManager[_0x5d6fb8(0xb3)]['_spriteset']['_battleField'];if(!_0x3de9bb)return;this['x']=_0x2c341d['x']+Math[_0x5d6fb8(0x112)](_0x2c341d['width']/0x2),this['x']-=Math[_0x5d6fb8(0x112)]((Graphics[_0x5d6fb8(0x1dd)]-Graphics['boxWidth'])/0x2),this['x']+=_0x3de9bb['x'],this['x']+=this['sideviewUiPositionOffsetX'](),this['y']=_0x2c341d['y']-_0x2c341d[_0x5d6fb8(0x1fa)],this['y']-=Math[_0x5d6fb8(0x112)]((Graphics['height']-Graphics[_0x5d6fb8(0x117)])/0x2),this['y']+=_0x3de9bb['y'],this['y']+=this[_0x5d6fb8(0x103)](),this[_0x5d6fb8(0x1a7)](),this[_0x5d6fb8(0x12f)]();},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x151)]=function(){const _0x5a8e7a=_0x2aaebd;return Window_Base[_0x5a8e7a(0x18a)];},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x103)]=function(){const _0x182000=_0x2aaebd;return Window_Base[_0x182000(0x148)];},Window_Base['prototype'][_0x2aaebd(0xf1)]=function(){const _0x381c20=_0x2aaebd;if(!this[_0x381c20(0x154)]())return;const _0x38c7c8=this[_0x381c20(0x1dd)];this[_0x381c20(0x1dd)]=this['sideviewUiWidth'](),_0x38c7c8!==this['width']&&(_0x381c20(0x1f9)!==_0x381c20(0x123)?this[_0x381c20(0x184)]():_0x1272d1+=_0x1ef751['iconHeight']);},Window_Base['prototype'][_0x2aaebd(0xc3)]=function(){const _0x4aaf0c=_0x2aaebd;return VisuMZ[_0x4aaf0c(0xd7)][_0x4aaf0c(0xaa)]['BattleLayout'][_0x4aaf0c(0x14d)]||0xc0;},Window_Base['prototype'][_0x2aaebd(0x1b2)]=function(){const _0x1b0da1=_0x2aaebd;if(!this[_0x1b0da1(0x154)]())return;const _0x2d1709=this[_0x1b0da1(0x1fa)],_0x307e18=this[_0x1b0da1(0x11c)](),_0x55c335=this[_0x1b0da1(0x19e)](_0x307e18),_0x240ded=this['fittingHeight'](this['maxSideviewUiRows']());this['height']=Math[_0x1b0da1(0x9a)](_0x55c335,_0x240ded),this[_0x1b0da1(0xdf)]();if(_0x2d1709!==this[_0x1b0da1(0x1fa)]){if(_0x1b0da1(0x19c)==='XdtQX')this['createContents']();else return _0x17276e[_0x1b0da1(0x114)];}},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x11c)]=function(){const _0x45372c=_0x2aaebd;if(this[_0x45372c(0xef)])return this[_0x45372c(0xef)]['length'];if(this['_list'])return this[_0x45372c(0x160)][_0x45372c(0xfe)];return 0x4;},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0xc4)]=function(){return 0x8;},Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x12f)]=function(){const _0x23bc51=_0x2aaebd;if(this[_0x23bc51(0x145)]&&!this[_0x23bc51(0x1aa)])return;this[_0x23bc51(0xc0)]=!![];},Window_Base['prototype'][_0x2aaebd(0x15d)]=function(){this['visible']=![];},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x1b3)]=Window_Base[_0x2aaebd(0xc9)]['show'],Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0xbd)]=function(){const _0x3bb1ee=_0x2aaebd;this[_0x3bb1ee(0x1a7)](),VisuMZ[_0x3bb1ee(0x115)][_0x3bb1ee(0x1b3)]['call'](this);},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x1c7)]=Window_Base['prototype'][_0x2aaebd(0x1a4)],Window_Base[_0x2aaebd(0xc9)][_0x2aaebd(0x1a4)]=function(){const _0x444dd4=_0x2aaebd;this[_0x444dd4(0x1a7)](),VisuMZ[_0x444dd4(0x115)][_0x444dd4(0x1c7)][_0x444dd4(0x149)](this);},Window_Help[_0x2aaebd(0xd2)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['GeneralWindow'][_0x2aaebd(0x11e)]??!![],VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x18f)]=Window_Help[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)],Window_Help[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)]=function(_0xf8e896){const _0x57fbc2=_0x2aaebd;VisuMZ[_0x57fbc2(0x115)][_0x57fbc2(0x18f)]['call'](this,_0xf8e896),this['createSideviewUiDimmerSprite']();},Window_Help[_0x2aaebd(0xc9)]['createSideviewUiDimmerSprite']=function(){const _0x577296=_0x2aaebd;if(!this[_0x577296(0x154)]())return;if(!Window_Help['SIDEVIEW_BATTLE_UI_FADE_STYLE'])return;this[_0x577296(0xe4)]=0x0;!this[_0x577296(0xdb)]&&(this['_dimmerSprite']=new Sprite(),this[_0x577296(0x1fe)](this[_0x577296(0xdb)]));const _0x5aee64=this[_0x577296(0x1dd)]-Window_SideviewUiBattleStatus[_0x577296(0x1bb)],_0x17ff35=this[_0x577296(0x162)]()*0x2;this[_0x577296(0xdb)][_0x577296(0x1e6)]=new Bitmap(_0x5aee64,_0x17ff35),this[_0x577296(0xdb)]['x']=-0x4,this['_dimmerSprite']['y']=this[_0x577296(0x143)];const _0x207186=this[_0x577296(0xdb)]['bitmap'],_0x2512c9=ColorManager[_0x577296(0x16b)](),_0x1d8dd2=ColorManager[_0x577296(0x1b4)]();_0x207186['fillRect'](0x0,0x0,Math[_0x577296(0x112)](_0x5aee64/0x2),_0x17ff35,_0x2512c9),_0x207186['gradientFillRect'](Math['round'](_0x5aee64/0x2),0x0,Math[_0x577296(0x112)](_0x5aee64/0x2),_0x17ff35,_0x2512c9,_0x1d8dd2);},Window_ItemList[_0x2aaebd(0x1c0)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['GeneralWindow']['ItemWindowMaxRows']??0x8,Window_ItemList[_0x2aaebd(0x14f)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['GeneralWindow']['ItemWindowWidth']??0x190,Window_ItemList[_0x2aaebd(0x18a)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['GeneralWindow'][_0x2aaebd(0x9c)]??0x10,Window_ItemList[_0x2aaebd(0x148)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2aaebd(0x12e)]['ItemWindowOffsetY']??0x10,VisuMZ[_0x2aaebd(0x115)]['Window_ItemList_initialize']=Window_ItemList[_0x2aaebd(0xc9)]['initialize'],Window_ItemList['prototype'][_0x2aaebd(0xd4)]=function(_0x5638c4){const _0xc7f4d9=_0x2aaebd;VisuMZ['SideviewBattleUI'][_0xc7f4d9(0x140)]['call'](this,_0x5638c4),this['initMembersSideviewUi']();},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x138)]=Window_ItemList[_0x2aaebd(0xc9)][_0x2aaebd(0x1d9)],Window_ItemList[_0x2aaebd(0xc9)][_0x2aaebd(0x1d9)]=function(){const _0x54c5d9=_0x2aaebd;if(this[_0x54c5d9(0x154)]()){if('lFKpJ'!==_0x54c5d9(0x1a8))return 0x1;else{let _0x3db710=_0x43fd09+_0x1c856d[_0x54c5d9(0x173)],_0xdad41c=_0x1caba8+_0x7948aa[_0x54c5d9(0xc6)];this[_0x54c5d9(0x11a)]()&&(_0xdad41c-=_0x239aca[_0x54c5d9(0xc9)][_0x54c5d9(0x1af)]()-0x1),this[_0x54c5d9(0x156)](_0x4af3ef,_0x3db710,_0xdad41c);}}else return VisuMZ['SideviewBattleUI'][_0x54c5d9(0x138)]['call'](this);},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x171)]=Window_ItemList['prototype'][_0x2aaebd(0x146)],Window_ItemList[_0x2aaebd(0xc9)]['colSpacing']=function(){const _0x154789=_0x2aaebd;return this['isUsingSideviewUiLayout']()?0x0:VisuMZ[_0x154789(0x115)][_0x154789(0x171)]['call'](this);},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x18e)]=Window_ItemList['prototype'][_0x2aaebd(0x1b6)],Window_ItemList[_0x2aaebd(0xc9)][_0x2aaebd(0x1b6)]=function(){const _0x4397b1=_0x2aaebd;VisuMZ[_0x4397b1(0x115)][_0x4397b1(0x18e)][_0x4397b1(0x149)](this),this['adjustSideviewUiWidth'](),this['adjustSideviewUiHeight'](),this[_0x4397b1(0xb8)]();},Window_ItemList[_0x2aaebd(0xc9)][_0x2aaebd(0x1a2)]=function(){const _0x36d3c8=_0x2aaebd;return this[_0x36d3c8(0x1f3)]||Window_Base['prototype']['sideviewUiTargetActor'][_0x36d3c8(0x149)](this);},Window_ItemList[_0x2aaebd(0xc9)]['sideviewUiWidth']=function(){const _0x1ece07=_0x2aaebd;return Window_ItemList[_0x1ece07(0x14f)]||0xc0;},Window_ItemList[_0x2aaebd(0xc9)][_0x2aaebd(0x151)]=function(){const _0x12fa51=_0x2aaebd;let _0x39dd0a=Window_Selectable[_0x12fa51(0xc9)][_0x12fa51(0x151)][_0x12fa51(0x149)](this);return _0x39dd0a+Window_ItemList[_0x12fa51(0x18a)];},Window_ItemList[_0x2aaebd(0xc9)][_0x2aaebd(0x103)]=function(){const _0x5e1c96=_0x2aaebd;let _0x2ff85d=Window_Selectable[_0x5e1c96(0xc9)]['sideviewUiPositionOffsetY'][_0x5e1c96(0x149)](this);return _0x2ff85d+Window_ItemList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y'];},Window_SkillList[_0x2aaebd(0x1c0)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2aaebd(0x12e)][_0x2aaebd(0x1cc)]??0x8,Window_SkillList[_0x2aaebd(0x14f)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['GeneralWindow'][_0x2aaebd(0x1a0)]??0x190,Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X']=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)]['GeneralWindow'][_0x2aaebd(0xa3)]??0x10,Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y']=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x12e)][_0x2aaebd(0x17d)]??0x10,VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x17a)]=Window_SkillList[_0x2aaebd(0xc9)]['initialize'],Window_SkillList[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)]=function(_0x3a6353){const _0x1c6dc6=_0x2aaebd;VisuMZ['SideviewBattleUI'][_0x1c6dc6(0x17a)][_0x1c6dc6(0x149)](this,_0x3a6353),this[_0x1c6dc6(0x130)]();},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x164)]=Window_SkillList[_0x2aaebd(0xc9)]['maxCols'],Window_SkillList[_0x2aaebd(0xc9)]['maxCols']=function(){const _0x38e144=_0x2aaebd;if(this[_0x38e144(0x154)]())return 0x1;else{if(_0x38e144(0x179)!==_0x38e144(0x193))return VisuMZ[_0x38e144(0x115)][_0x38e144(0x164)]['call'](this);else _0x5d2146['y']=_0x41bb6a[_0x38e144(0x1fa)]*0xa,_0x354cc3[_0x38e144(0x1fa)]=0x0;}},VisuMZ['SideviewBattleUI'][_0x2aaebd(0x15c)]=Window_SkillList['prototype'][_0x2aaebd(0x146)],Window_SkillList[_0x2aaebd(0xc9)][_0x2aaebd(0x146)]=function(){const _0x49356d=_0x2aaebd;return this['isUsingSideviewUiLayout']()?0x0:_0x49356d(0xb7)!=='FuulL'?VisuMZ[_0x49356d(0x115)]['Window_SkillList_colSpacing'][_0x49356d(0x149)](this):_0x2aee63['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS'];},VisuMZ[_0x2aaebd(0x115)]['Window_SkillList_makeItemList']=Window_SkillList[_0x2aaebd(0xc9)][_0x2aaebd(0x1b6)],Window_SkillList[_0x2aaebd(0xc9)][_0x2aaebd(0x1b6)]=function(){const _0x27c60e=_0x2aaebd;VisuMZ[_0x27c60e(0x115)][_0x27c60e(0xf0)]['call'](this),this[_0x27c60e(0xf1)](),this['adjustSideviewUiHeight'](),this['updateSideviewUiPosition']();},Window_SkillList[_0x2aaebd(0xc9)]['sideviewUiTargetActor']=function(){const _0x1b769d=_0x2aaebd;return this['_actor']||Window_Base[_0x1b769d(0xc9)][_0x1b769d(0x1a2)][_0x1b769d(0x149)](this);},Window_SkillList[_0x2aaebd(0xc9)]['sideviewUiWidth']=function(){const _0x338631=_0x2aaebd;return Window_SkillList[_0x338631(0x14f)]||0xc0;},Window_SkillList[_0x2aaebd(0xc9)][_0x2aaebd(0x151)]=function(){const _0x64fc0a=_0x2aaebd;let _0x1097b5=Window_Selectable[_0x64fc0a(0xc9)][_0x64fc0a(0x151)]['call'](this);return _0x1097b5+Window_SkillList[_0x64fc0a(0x18a)];},Window_SkillList[_0x2aaebd(0xc9)]['sideviewUiPositionOffsetY']=function(){const _0x16454f=_0x2aaebd;let _0x4baaa2=Window_Selectable[_0x16454f(0xc9)][_0x16454f(0x103)][_0x16454f(0x149)](this);return _0x4baaa2+Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y'];},Window_BattleSkill[_0x2aaebd(0xc9)][_0x2aaebd(0xc4)]=function(){return Window_SkillList['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS'];},Window_BattleItem[_0x2aaebd(0xc9)][_0x2aaebd(0xc4)]=function(){const _0x3232c8=_0x2aaebd;return Window_ItemList[_0x3232c8(0x1c0)];},Window_PartyCommand['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS']=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x12e)][_0x2aaebd(0x1a6)]??0x8,VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xfa)]=Window_PartyCommand[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)],Window_PartyCommand[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)]=function(_0x5eb830){const _0xf57985=_0x2aaebd;VisuMZ[_0xf57985(0x115)]['Window_PartyCommand_initialize'][_0xf57985(0x149)](this,_0x5eb830),this['initMembersSideviewUi']();},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x186)]=Window_PartyCommand[_0x2aaebd(0xc9)]['makeCommandList'],Window_PartyCommand[_0x2aaebd(0xc9)]['makeCommandList']=function(){const _0x36084a=_0x2aaebd;VisuMZ[_0x36084a(0x115)][_0x36084a(0x186)][_0x36084a(0x149)](this),this[_0x36084a(0xf1)](),this['adjustSideviewUiHeight']();},Window_PartyCommand['prototype'][_0x2aaebd(0x1a2)]=function(){const _0x201aca=_0x2aaebd;return $gameParty[_0x201aca(0x172)]()[0x0];},Window_PartyCommand[_0x2aaebd(0xc9)][_0x2aaebd(0xc4)]=function(){return Window_PartyCommand['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS'];},Window_ActorCommand[_0x2aaebd(0x1c0)]=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x12e)]['ActorCommandWindowMaxRows']??0x8,VisuMZ[_0x2aaebd(0x115)]['Window_ActorCommand_initialize']=Window_ActorCommand['prototype'][_0x2aaebd(0xd4)],Window_ActorCommand[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)]=function(_0x26dd4e){const _0x5bf909=_0x2aaebd;VisuMZ[_0x5bf909(0x115)][_0x5bf909(0xdc)][_0x5bf909(0x149)](this,_0x26dd4e),this[_0x5bf909(0x130)]();},VisuMZ[_0x2aaebd(0x115)]['Window_ActorCommand_makeCommandList']=Window_ActorCommand[_0x2aaebd(0xc9)][_0x2aaebd(0x1e4)],Window_ActorCommand[_0x2aaebd(0xc9)][_0x2aaebd(0x1e4)]=function(){const _0x374a3b=_0x2aaebd;VisuMZ[_0x374a3b(0x115)][_0x374a3b(0x199)][_0x374a3b(0x149)](this),this['adjustSideviewUiWidth'](),this[_0x374a3b(0x1b2)](),this[_0x374a3b(0xb8)]();},Window_ActorCommand[_0x2aaebd(0xc9)][_0x2aaebd(0x1a2)]=function(){const _0x5621b0=_0x2aaebd;return this[_0x5621b0(0x1f3)]||Window_Base[_0x5621b0(0xc9)][_0x5621b0(0x1a2)][_0x5621b0(0x149)](this);},Window_ActorCommand['prototype']['maxSideviewUiRows']=function(){const _0x59ff69=_0x2aaebd;return Window_ActorCommand[_0x59ff69(0x1c0)];},VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0x170)]=Window_BattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x136)],Window_BattleStatus[_0x2aaebd(0xc9)]['updateRefresh']=function(){const _0x1fc38d=_0x2aaebd;if(this['isUsingSideviewUiLayout']()){if(_0x1fc38d(0xad)!==_0x1fc38d(0xad)){const _0x5d4bab=_0x2e17f5[_0xba3903];_0x5d4bab['scale']['x']=_0x5d4bab[_0x1fc38d(0x1e1)]['y']=0x1/this['scale']['y'];}else this[_0x1fc38d(0x174)]();}else VisuMZ[_0x1fc38d(0x115)]['Window_BattleStatus_updateRefresh'][_0x1fc38d(0x149)](this);},Window_BattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x174)]=function(){const _0x2da70b=_0x2aaebd;if($gameTemp[_0x2da70b(0x166)]())this['_requestRefresh']=![],$gameTemp[_0x2da70b(0x159)](),SceneManager['_scene']['refreshSideviewUiBattleStatusWindows']();else this['_requestRefresh']&&(this['_requestRefresh']=![],SceneManager['_scene'][_0x2da70b(0x1d2)]());};function Window_SideviewUiBattleStatus(){const _0x280ec2=_0x2aaebd;this[_0x280ec2(0xd4)](...arguments);}Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)]=Object[_0x2aaebd(0x190)](Window_StatusBase['prototype']),Window_SideviewUiBattleStatus['prototype'][_0x2aaebd(0x198)]=Window_SideviewUiBattleStatus,Window_SideviewUiBattleStatus[_0x2aaebd(0x1bb)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['WidthBase']??0xc8,Window_SideviewUiBattleStatus['HEIGHT_BASE']=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x187)][_0x2aaebd(0xd8)]??'auto',Window_SideviewUiBattleStatus['HEIGHT_BUFFER']=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0xfd)]??0x4,Window_SideviewUiBattleStatus[_0x2aaebd(0x1e5)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0x100)]??0x30,Window_SideviewUiBattleStatus[_0x2aaebd(0x1c8)]=VisuMZ['SideviewBattleUI']['Settings'][_0x2aaebd(0x187)][_0x2aaebd(0xa8)]??0x4,Window_SideviewUiBattleStatus[_0x2aaebd(0x135)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x111)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0xb1)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x1cf)]??!![],Window_SideviewUiBattleStatus['NAME_SPRITE']=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0xf2)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0xbb)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0x1c2)]??0x30,Window_SideviewUiBattleStatus[_0x2aaebd(0x1ba)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0x128)]??0x0,Window_SideviewUiBattleStatus[_0x2aaebd(0xf9)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0xcd)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x1e8)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['StatesIgnoreScale']??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x1b5)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x1ec)]??0x14,Window_SideviewUiBattleStatus['STATES_OFFSET_Y']=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x187)][_0x2aaebd(0x169)]??0x14,Window_SideviewUiBattleStatus[_0x2aaebd(0x14a)]=VisuMZ[_0x2aaebd(0x115)]['Settings']['StatusWindow'][_0x2aaebd(0x1db)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0xce)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x16a)]??0x2c,Window_SideviewUiBattleStatus['TPB_OFFSET_Y']=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0xea)]??0x0,Window_SideviewUiBattleStatus['HP_GAUGE_SHOWN']=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x187)][_0x2aaebd(0x15a)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x97)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['HpOffsetX']??0x3c,Window_SideviewUiBattleStatus[_0x2aaebd(0x1b7)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow']['HpOffsetY']??0x0,Window_SideviewUiBattleStatus[_0x2aaebd(0x12a)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x13e)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x189)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0x1be)]??0x44,Window_SideviewUiBattleStatus[_0x2aaebd(0x1cd)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0xc5)]??0x0,Window_SideviewUiBattleStatus[_0x2aaebd(0x13c)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0xa5)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x1fc)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x10b)]??0x4a,Window_SideviewUiBattleStatus[_0x2aaebd(0x129)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['TpOffsetY']??0x0,Window_SideviewUiBattleStatus[_0x2aaebd(0x13b)]=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x187)][_0x2aaebd(0xae)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x173)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x1d3)]??0x2c,Window_SideviewUiBattleStatus['AGGRO_OFFSET_Y']=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['AggroOffsetY']??0x0,Window_SideviewUiBattleStatus[_0x2aaebd(0x9b)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0xf4)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x191)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x124)]??0x34,Window_SideviewUiBattleStatus[_0x2aaebd(0x96)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x1f4)]??0x2,Window_SideviewUiBattleStatus[_0x2aaebd(0x1cb)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['BraveShow']??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x1f8)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['BraveOffsetX']??0x34,Window_SideviewUiBattleStatus[_0x2aaebd(0x95)]=VisuMZ[_0x2aaebd(0x115)]['Settings'][_0x2aaebd(0x187)][_0x2aaebd(0x1e2)]??-0x6,Window_SideviewUiBattleStatus[_0x2aaebd(0xe5)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0xe3)]??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0x1dc)]=VisuMZ['SideviewBattleUI'][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0x13f)]??!![],Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_X']=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)][_0x2aaebd(0xf5)]??0x14,Window_SideviewUiBattleStatus[_0x2aaebd(0x1d5)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)]['StatusWindow'][_0x2aaebd(0x131)]??0x14,Window_SideviewUiBattleStatus[_0x2aaebd(0x114)]=VisuMZ[_0x2aaebd(0x115)][_0x2aaebd(0xaa)][_0x2aaebd(0x187)]['StateTooltipsShow']??!![],Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0xd4)]=function(_0x245d50){const _0x424519=_0x2aaebd;this['_partyIndex']=_0x245d50;const _0x5738fb=this['createWindowRect']();Window_StatusBase[_0x424519(0xc9)][_0x424519(0xd4)][_0x424519(0x149)](this,_0x5738fb),this[_0x424519(0x130)](),this[_0x424519(0x1a5)](0x2);},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0xd1)]=function(){const _0x16fe84=_0x2aaebd,_0x1cadbd=Window_Base[_0x16fe84(0x175)];let _0x52cf38=Window_SideviewUiBattleStatus['WIDTH_BASE'],_0x5eada1=Graphics[_0x16fe84(0x19d)]-_0x52cf38;_0x5eada1+=Math[_0x16fe84(0x18d)]((Graphics[_0x16fe84(0x1dd)]-Graphics['boxWidth'])/0x2),_0x52cf38/=_0x1cadbd,_0x52cf38=Math[_0x16fe84(0x18d)](_0x52cf38),_0x52cf38+=Math[_0x16fe84(0x18d)](Window_SideviewUiBattleStatus[_0x16fe84(0x1e5)]*0x4/_0x1cadbd);let _0xd65c84=Window_SideviewUiBattleStatus[_0x16fe84(0x1ad)];if(_0xd65c84==='auto'){if(_0x16fe84(0x1eb)===_0x16fe84(0x1eb))_0xd65c84=Window_SideviewUiBattleStatus[_0x16fe84(0xba)]*0x2,_0xd65c84+=this[_0x16fe84(0x125)]()*this['autoRowCount'](),_0xd65c84=Math['ceil'](_0xd65c84*_0x1cadbd),_0xd65c84/=_0x1cadbd;else return this['_actor']||_0x4d6b3d['prototype'][_0x16fe84(0x1a2)]['call'](this);}else _0xd65c84=eval(_0xd65c84)||0x0;let _0xcb39aa=Math['ceil'](_0xd65c84*_0x1cadbd)*this[_0x16fe84(0x18b)];return _0xcb39aa-=Math[_0x16fe84(0x18d)]((Graphics['height']-Graphics[_0x16fe84(0x117)])/0x2),this[_0x16fe84(0x122)]=_0x5eada1,this['_activeX']=this[_0x16fe84(0x122)]-Math['ceil'](Window_SideviewUiBattleStatus[_0x16fe84(0x1e5)]/_0x1cadbd),this[_0x16fe84(0x158)]=this['_homeX'],new Rectangle(_0x5eada1,_0xcb39aa,_0x52cf38,_0xd65c84);},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x153)]=function(){const _0x405bac=_0x2aaebd;let _0x4d967b=0x0;if(Window_SideviewUiBattleStatus[_0x405bac(0xb1)])_0x4d967b+=0x1;if(Window_SideviewUiBattleStatus[_0x405bac(0x1bc)])_0x4d967b+=0x1;if(Window_SideviewUiBattleStatus[_0x405bac(0x12a)])_0x4d967b+=0x1;if(Window_SideviewUiBattleStatus[_0x405bac(0x13c)])_0x4d967b+=0x1;if(this['isAdjustBoostPoints']())_0x4d967b+=0x1;if(this['isAdjustBravePoints']())_0x4d967b+=0x1;return _0x4d967b||0x1;},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)]['updatePadding']=function(){const _0x5683f7=_0x2aaebd;this[_0x5683f7(0x143)]=0x0;},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x185)]=function(){const _0x1e6853=_0x2aaebd;if(!this[_0x1e6853(0xdb)])return;if(!Window_SideviewUiBattleStatus[_0x1e6853(0x135)])return;const _0x2f9b93=this['_dimmerSprite'][_0x1e6853(0x1e6)];var _0x300667=ColorManager['dimColor1'](),_0x5448eb=ColorManager[_0x1e6853(0x1b4)](),_0x293355=Math[_0x1e6853(0x18d)](this['width']/0x4),_0x2a6ee4=this['width']-_0x293355,_0x50d56b=this[_0x1e6853(0x1fa)];_0x2f9b93[_0x1e6853(0x14b)](this[_0x1e6853(0x1dd)],_0x50d56b),_0x2f9b93[_0x1e6853(0xf7)](0x0,0x0,_0x293355,_0x50d56b,_0x5448eb,_0x300667),_0x2f9b93[_0x1e6853(0x101)](_0x293355,0x0,_0x2a6ee4,_0x50d56b,_0x300667),this[_0x1e6853(0xdb)]['setFrame'](0x0,0x0,_0x2a6ee4,_0x50d56b);},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x1df)]=function(){const _0xbf47f7=_0x2aaebd;Window_StatusBase['prototype'][_0xbf47f7(0x1df)][_0xbf47f7(0x149)](this),this[_0xbf47f7(0x102)](),this['updatePosition']();},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x168)]=function(){const _0x5c15d8=_0x2aaebd;return $gameParty[_0x5c15d8(0x1f7)]()[this[_0x5c15d8(0x18b)]];},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x102)]=function(){const _0x502cee=_0x2aaebd;if(this[_0x502cee(0x181)]===this[_0x502cee(0x168)]())return;this[_0x502cee(0x181)]=this[_0x502cee(0x168)](),this[_0x502cee(0x1da)]();if(this[_0x502cee(0x181)]){if(_0x502cee(0x192)===_0x502cee(0x192))this[_0x502cee(0x1a5)](0x1);else return![];}else this['setBackgroundType'](0x2);},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)]['updatePosition']=function(){const _0x204cec=_0x2aaebd;if(!this[_0x204cec(0x181)])return;this[_0x204cec(0x158)]=this[_0x204cec(0x15e)]()?this[_0x204cec(0x1ac)]:this[_0x204cec(0x122)];const _0x3696d2=Window_SideviewUiBattleStatus[_0x204cec(0x1c8)];if(this[_0x204cec(0x158)]>this['x'])this['x']=Math[_0x204cec(0x9a)](this['x']+_0x3696d2,this[_0x204cec(0x158)]);else{if(this[_0x204cec(0x158)]<this['x']){if('IusqU'!=='IusqU')return _0x58ff53['NAME_SHOWN']&&_0x381751[_0x204cec(0x13b)]&&_0x3c1544[_0x204cec(0x142)]&&_0x5a0b1c[_0x204cec(0xa9)]&&_0x50b604[_0x204cec(0x19f)][_0x204cec(0xaa)]['Aggro'][_0x204cec(0x10d)];else this['x']=Math['max'](this['x']-_0x3696d2,this[_0x204cec(0x158)]);}}},Window_SideviewUiBattleStatus['prototype'][_0x2aaebd(0x15e)]=function(){const _0x5ca225=_0x2aaebd;if(this[_0x5ca225(0x181)]===BattleManager[_0x5ca225(0xec)]())return!![];if(this[_0x5ca225(0x181)]===BattleManager['_subject'])return!![];if(this['_battler'][_0x5ca225(0xf3)]())return!![];return![];},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x177)]=function(){const _0x16366c=_0x2aaebd;return Window_SideviewUiBattleStatus[_0x16366c(0x114)];},Window_SideviewUiBattleStatus['prototype']['getStateTooltipBattler']=function(){const _0x5a4e9e=_0x2aaebd;return this[_0x5a4e9e(0x181)];},Window_SideviewUiBattleStatus['prototype'][_0x2aaebd(0x150)]=function(){const _0x1b665c=_0x2aaebd,_0x528708=new Point(TouchInput['x'],TouchInput['y']),_0x5abb0b=this[_0x1b665c(0x19b)][_0x1b665c(0xc1)](_0x528708);return this['innerRect']['contains'](_0x5abb0b['x'],_0x5abb0b['y']);},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0xa0)]=function(){const _0x3aa147=_0x2aaebd;this[_0x3aa147(0x1c4)]();if(!this[_0x3aa147(0x181)])return;this[_0x3aa147(0x126)](),this[_0x3aa147(0x180)]();},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0x126)]=function(){const _0x4b52e9=_0x2aaebd,_0xd6d6bb=this['_battler'];let _0x4c4aff=0x4,_0x32d903=Window_SideviewUiBattleStatus[_0x4b52e9(0xba)];if(Imported[_0x4b52e9(0xc8)]&&Window_SideviewUiBattleStatus['BREAK_SHIELD_SHOWN']){if('njusp'!==_0x4b52e9(0xb0)){const _0x2942dc=_0x42a17a['SideviewBattleUI']['Scene_Battle_statusWindowRect'][_0x4b52e9(0x149)](this);return _0x2b24db['isUsingSideviewUiLayout']()&&(_0x2942dc['y']=_0x3af619[_0x4b52e9(0x1fa)]*0xa,_0x2942dc[_0x4b52e9(0x1fa)]=0x0),_0x2942dc;}else{let _0x5bd7c0=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x1fd)],_0x496ef0=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x1d5)];this[_0x4b52e9(0x15b)](_0xd6d6bb,_0x5bd7c0,_0x496ef0);if(Window_SideviewUiBattleStatus[_0x4b52e9(0x1e8)]){if(_0x4b52e9(0x1a9)!=='ZCmSh')this[_0x4b52e9(0xdb)]=new _0xd46a98(),this[_0x4b52e9(0x1fe)](this[_0x4b52e9(0xdb)]);else{const _0x1341cd=_0x4b52e9(0x147)[_0x4b52e9(0x188)](_0xd6d6bb[_0x4b52e9(0xaf)]()),_0x89bfeb=this[_0x4b52e9(0x1c5)];if(_0x89bfeb[_0x1341cd]){const _0x2ec8a1=_0x89bfeb[_0x1341cd];_0x2ec8a1[_0x4b52e9(0x1e1)]['x']=_0x2ec8a1[_0x4b52e9(0x1e1)]['y']=0x1/this[_0x4b52e9(0x1e1)]['y'];};}}}}if(Window_SideviewUiBattleStatus['STATES_SHOWN']){let _0xd647e5=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x1b5)],_0x40dac4=_0x32d903+Window_SideviewUiBattleStatus['STATES_OFFSET_Y'];if(Imported['VisuMZ_4_BreakShields']&&Window_SideviewUiBattleStatus[_0x4b52e9(0xe5)]){if(_0x4b52e9(0x163)!==_0x4b52e9(0x163)){let _0x3334d9=0x0;if(_0x3ee23a[_0x4b52e9(0xb1)])_0x3334d9+=0x1;if(_0x2b67f5[_0x4b52e9(0x1bc)])_0x3334d9+=0x1;if(_0x2e49dd[_0x4b52e9(0x12a)])_0x3334d9+=0x1;if(_0xcd8aa[_0x4b52e9(0x13c)])_0x3334d9+=0x1;if(this[_0x4b52e9(0x1d0)]())_0x3334d9+=0x1;if(this[_0x4b52e9(0x1ed)]())_0x3334d9+=0x1;return _0x3334d9||0x1;}else{if(Window_SideviewUiBattleStatus[_0x4b52e9(0x1dc)]){if(_0x4b52e9(0x107)===_0x4b52e9(0x107))_0x40dac4+=Math[_0x4b52e9(0x18d)](ImageManager[_0x4b52e9(0x11d)]/this[_0x4b52e9(0x1e1)]['y']);else return _0x3a255a[_0x4b52e9(0x115)][_0x4b52e9(0x164)][_0x4b52e9(0x149)](this);}else _0x40dac4+=ImageManager['iconHeight'];_0x40dac4+=0x4;}}this[_0x4b52e9(0xa1)](_0xd6d6bb,_0xd647e5,_0x40dac4);if(Window_SideviewUiBattleStatus[_0x4b52e9(0x1e8)]){const _0x26615b=_0x4b52e9(0x106)[_0x4b52e9(0x188)](_0xd6d6bb[_0x4b52e9(0xaf)]()),_0x2becb6=this['_additionalSprites'];if(_0x2becb6[_0x26615b]){if(_0x4b52e9(0xa7)===_0x4b52e9(0xa7)){const _0x3612bb=_0x2becb6[_0x26615b];_0x3612bb[_0x4b52e9(0x1e1)]['x']=_0x3612bb['scale']['y']=0x1/this[_0x4b52e9(0x1e1)]['y'];}else this['clampSideviewUiPlacementPosition'](),_0x5b2ba8[_0x4b52e9(0x115)][_0x4b52e9(0x1c7)]['call'](this);};}}if(this[_0x4b52e9(0x11a)]()){let _0x150d6a=_0x4c4aff+Window_SideviewUiBattleStatus['TPB_OFFSET_X'],_0x28cdd1=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0xa6)];this[_0x4b52e9(0xde)](_0xd6d6bb,_0x150d6a,_0x28cdd1);}if(this[_0x4b52e9(0xf6)]()){if(_0x4b52e9(0x110)!==_0x4b52e9(0x11b)){let _0x10cb46=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x173)],_0x2c4b48=_0x32d903+Window_SideviewUiBattleStatus['AGGRO_OFFSET_Y'];this[_0x4b52e9(0x11a)]()&&(_0x2c4b48-=Sprite_Gauge['prototype'][_0x4b52e9(0x1af)]()-0x1),this[_0x4b52e9(0x156)](_0xd6d6bb,_0x10cb46,_0x2c4b48);}else{if(!_0x10c8dc[_0x4b52e9(0x154)]())return![];if(_0x1a39da[_0x4b52e9(0x108)]&&_0x7dd676[_0x4b52e9(0x19a)]())return![];if(_0x5dd71a[_0x4b52e9(0x10f)]&&_0x5d2623[_0x4b52e9(0x12b)]()&&!_0x13e5d3['isSideView']())return![];return _0x25735b[_0x4b52e9(0xd9)];}}if(Window_SideviewUiBattleStatus[_0x4b52e9(0xb1)]){if('ydqHI'===_0x4b52e9(0xdd)){let _0x4c40fe=_0x4c4aff+Window_SideviewUiBattleStatus['NAME_OFFSET_X'],_0x56c2db=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x1ba)];if(Window_SideviewUiBattleStatus[_0x4b52e9(0xe0)]){if(_0x4b52e9(0x141)===_0x4b52e9(0x132)){if(!this[_0x4b52e9(0x154)]())return;const _0x5afae5=_0x14f702[_0x4b52e9(0x175)];this[_0x4b52e9(0x1e1)]['x']=this['scale']['y']=_0x5afae5,this[_0x4b52e9(0xdf)]();}else this['placeActorName'](_0xd6d6bb,_0x4c40fe,_0x56c2db);}else'PzWzn'!==_0x4b52e9(0xfb)?this['createContents']():this[_0x4b52e9(0x1f1)](_0xd6d6bb,_0x4c40fe+0x4,_0x56c2db-0x6);}else _0x2d05c9[_0x4b52e9(0x115)][_0x4b52e9(0x194)][_0x4b52e9(0x149)](this);}(Window_SideviewUiBattleStatus[_0x4b52e9(0xb1)]||this[_0x4b52e9(0x11a)]()||this[_0x4b52e9(0xf6)]())&&(_0x32d903+=this[_0x4b52e9(0x125)]());if(this[_0x4b52e9(0x1d0)]()){if('AiWbd'!==_0x4b52e9(0x116))return _0x3ab39f[_0x4b52e9(0x18a)];else{const _0x59686a=Math[_0x4b52e9(0x18d)](ImageManager[_0x4b52e9(0x11d)]*Sprite_BoostContainer[_0x4b52e9(0x15f)]);let _0x4a66c3=_0x4c4aff+Window_SideviewUiBattleStatus['BOOST_OFFSET_X'],_0x38178b=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x96)];_0x38178b+=Math[_0x4b52e9(0x1e3)](0x0,Math[_0x4b52e9(0x112)]((this['gaugeLineHeight']()-_0x59686a)/0x2)),this[_0x4b52e9(0xa2)](_0xd6d6bb,_0x4a66c3,_0x38178b),_0x32d903+=this[_0x4b52e9(0x125)]();}}if(this[_0x4b52e9(0x1ed)]()){let _0x26a539=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x1f8)],_0xe4ecd6=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x95)],_0x4a1d7c=Math['ceil'](Window_SideviewUiBattleStatus[_0x4b52e9(0x1bb)]/this[_0x4b52e9(0x1e1)]['x']);this[_0x4b52e9(0x167)](_0xd6d6bb,_0x26a539,_0xe4ecd6,_0x4a1d7c,_0x4b52e9(0xcc)),_0x32d903+=this[_0x4b52e9(0x125)]();}if(Window_SideviewUiBattleStatus[_0x4b52e9(0x1bc)]){if(_0x4b52e9(0x178)!==_0x4b52e9(0x178))this[_0x4b52e9(0x1dd)]=_0xb89e87[_0x4b52e9(0x19d)]/this[_0x4b52e9(0x1e1)]['x'],_0x293d01=!![];else{let _0x4ece25=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x97)],_0x589185=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x1b7)];this[_0x4b52e9(0x1ca)](_0xd6d6bb,'hp',_0x4ece25,_0x589185),_0x32d903+=this[_0x4b52e9(0x125)]();}}if(Window_SideviewUiBattleStatus[_0x4b52e9(0x12a)]){if(_0x4b52e9(0x157)==='kpAFy'){let _0x494817=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x189)],_0x5bd302=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x1cd)];this[_0x4b52e9(0x1ca)](_0xd6d6bb,'mp',_0x494817,_0x5bd302),_0x32d903+=this['gaugeLineHeight']();}else this[_0x4b52e9(0x1a5)](0x2);}if(Window_SideviewUiBattleStatus[_0x4b52e9(0x13c)]){let _0x5ef39b=_0x4c4aff+Window_SideviewUiBattleStatus[_0x4b52e9(0x1fc)],_0xec89a2=_0x32d903+Window_SideviewUiBattleStatus[_0x4b52e9(0x129)];this[_0x4b52e9(0x1ca)](_0xd6d6bb,'tp',_0x5ef39b,_0xec89a2),_0x32d903+=this[_0x4b52e9(0x125)]();}},Window_SideviewUiBattleStatus['prototype'][_0x2aaebd(0x11a)]=function(){const _0x568a0a=_0x2aaebd;if(Imported[_0x568a0a(0x1e9)]&&BattleManager['isCTB']())return![];return BattleManager['isTpb']()&&Window_SideviewUiBattleStatus[_0x568a0a(0xb1)]&&Window_SideviewUiBattleStatus[_0x568a0a(0x14a)];},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)][_0x2aaebd(0xf6)]=function(){const _0x232c27=_0x2aaebd;return Window_SideviewUiBattleStatus[_0x232c27(0xb1)]&&Window_SideviewUiBattleStatus[_0x232c27(0x13b)]&&Imported['VisuMZ_2_AggroControlSystem']&&ConfigManager['aggroGauge']&&VisuMZ[_0x232c27(0x19f)]['Settings']['Aggro']['StatusGauge'];},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)]['isAdjustBoostPoints']=function(){const _0x4bd0a3=_0x2aaebd;return Imported[_0x4bd0a3(0x118)]&&Window_SideviewUiBattleStatus['BOOST_SHOWN']&&BattleManager[_0x4bd0a3(0x120)]();},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)]['isAdjustBravePoints']=function(){const _0x2518e5=_0x2aaebd;return Imported[_0x2518e5(0x196)]&&Window_SideviewUiBattleStatus[_0x2518e5(0x1cb)]&&BattleManager[_0x2518e5(0x1f2)]();},Window_SideviewUiBattleStatus[_0x2aaebd(0xc9)]['drawCustomJS']=function(){const _0x2e6ece=_0x2aaebd;if(VisuMZ['SideviewBattleUI'][_0x2e6ece(0xaa)][_0x2e6ece(0x187)]['CustomUi']){if('riOzJ'===_0x2e6ece(0x9f))VisuMZ[_0x2e6ece(0x115)]['Settings'][_0x2e6ece(0x187)][_0x2e6ece(0x1f5)][_0x2e6ece(0x149)](this,this['_battler']);else return 0x1;}};