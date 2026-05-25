//=============================================================================
// VisuStella MZ - Menu Cursor
// VisuMZ_4_MenuCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MenuCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MenuCursor = VisuMZ.MenuCursor || {};
VisuMZ.MenuCursor.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.09] [MenuCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Menu_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add a menu cursor that uses an icon or an image from the pictures or system
 * folder to help the player find out which windows are active quicker. The
 * subtle movements of a waving cursor can do wonders to grabbing the player's
 * attention to speed up the process of directing player focus.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as the menu cursor.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Alter the menu cursor mid-game through Plugin Commands, too!
 * * Automatically pad in-game windows to accommodate for cursor oscillation.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Animated Menu Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated menu cursor.
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
 * === Menu Cursor Plugin Commands ===
 * 
 * ---
 *
 * Menu Cursor: Change Settings
 * - Changes the settings for the menu cursor's appearance.
 *
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Cursor Settings
 * ============================================================================
 *
 * This is where you can change the settings for the menu cursor.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Tiling
 * ============================================================================
 *
 * For added visual clarity, you can add a tiling background to the menu cursor
 * that can scroll, hue shift, and has a color tone.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable background tiling?
 * 
 *   Filename:
 *   - Filename of the parallax used for the tiling effect.
 *   - Leave empty to not use a background tile.
 *
 * ---
 *
 * Appearance
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the tiling?
 * 
 *   Buffer:
 *   - How many pixels should be used to buffer the tiling?
 * 
 *   Color Tone:
 *   - What tone do you want for the tiling?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Hue:
 *   - Do you wish to adjust this tiling's hue?
 * 
 *   Hue Shift:
 *   - How much do you want the hue to shift each frame?
 * 
 *   Opacity:
 *   - What is the opacity of the tiling effect?
 * 
 *   Scroll X Speed:
 *   Scroll Y Speed:
 *   - How fast should the tile effect scroll horizontally/vertically?
 *   - 0 for no scroll.
 *   - Negative values scroll the other way.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Blacklist Settings
 * ============================================================================
 * 
 * The menu cursor will not appear in these windows.
 * 
 * ---
 * 
 * Settings
 * 
 *   Window Blacklist:
 *   - Insert the names of the windows' constructors here
 *   - Example: Window_ItemCategory
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Padding Settings
 * ============================================================================
 *
 * Make some windows more padded to accommodate for the menu cursor's
 * oscillation. Because of the oscillation, the cursor would sometimes go over
 * the displayed text. These settings help pad the individual entries and shift
 * over the text to make room for the cursor to move back and forth at.
 *
 * ---
 *
 * Window Padding Settings
 * 
 *   All Windows:
 *   - How much extra item padding do you want for all windows?
 * 
 *   Window_MenuCommand:
 *   Window_MenuStatus:
 *   Window_MenuActor:
 *   Window_ItemCategory:
 *   Window_ItemList:
 *   Window_SkillType:
 *   Window_SkillList:
 *   Window_EquipCommand:
 *   Window_EquipSlot:
 *   Window_EquipItem:
 *   Window_Options:
 *   Window_SavefileList:
 *   Window_ShopCommand:
 *   Window_ShopBuy:
 *   Window_ShopSell:
 *   Window_NameInput:
 *   Window_ChoiceList:
 *   Window_EventItem:
 *   Window_PartyCommand:
 *   Window_ActorCommand:
 *   Window_BattleStatus:
 *   Window_BattleActor:
 *   Window_BattleEnemy:
 *   Window_BattleSkill:
 *   Window_BattleItem:
 *   Window_TitleCommand:
 *   Window_GameEnd:
 *   Window_DebugRange:
 *   Window_DebugEdit:
 *   Window_CommonEventMenuList:
 *   Window_QuestCommand:
 *   Window_QuestList:
 *   Window_TutorialList
 *   - How much extra item padding do you want for this window?
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
 * * Harmless
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: May 18, 2023
 * * Bug Fixes!
 * ** Removed visual glitch when used together with Sideview Battle UI when
 *    selecting a target actor. Fix made by Irina.
 * 
 * Version 1.08: October 27, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.07: July 9, 2021
 * * Compatibility Update!
 * ** Added Item Crafting System's number window to the default list.
 * 
 * Version 1.06: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** "Background Tiling" series has been added for more visual clarity.
 * 
 * Version 1.05: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for removed feature.
 * * Feature Update!
 * ** "Window_NumberInput" for Window Padding Settings Plugin Parameter is now
 *    removed. This is due to numerous "bug reports" despite the issue of no
 *    numbers being shown having been fixed since v1.01. Since many users did
 *    not do a fresh reinstall of the plugin to fix the problem and continued
 *    to submit it as bug reports, we have decided it would be better to just
 *    hardcode the padding values for this window instead. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * ** Added "Window_ShopNumber" to the default black list.
 * 
 * Version 1.03: January 8, 2021
 * * Bug Fixes!
 * ** Menu Cursor will no longer show if there is no index selected. Fix made
 *    by Irina.
 * 
 * Version 1.02: January 1, 2021
 * * Feature Update!
 * ** Added "Window_Status" to the default black list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Changed the default value of the Window_NumberInput padding amount to 0
 *    from 16 so that numbers don't disappear. Fix made by Yanfly.
 *
 * Version 1.00: January 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCursorChangeSettings
 * @text Menu Cursor: Change Settings
 * @desc Changes the settings for the menu cursor's appearance.
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the menu cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default center
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default top
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param MenuCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MenuCursor:struct
 * @text Menu Cursor
 * @type struct<MenuCursor>
 * @desc Default settings for the menu cursor's appearance.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"center","anchorY:str":"top","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param Tiling:struct
 * @text Background Tiling
 * @parent MenuCursor:struct
 * @type struct<Tiling>
 * @desc Background tiling settings for the menu cursor.
 * @default {"General":"","Enable:eval":"false","Filename:str":"StarlitSky","Appearance":"","BlendMode:num":"0","Buffer:num":"2","ColorTone:eval":"[0, 0, 0, 0]","Hue:num":"0","HueShift:num":"+0","Opacity:num":"255","ScrollX:num":"-1.25","ScrollY:num":"+0.5"}
 * 
 * @param CursorBlacklist:arraystr
 * @text Window Blacklist
 * @parent MenuCursor:struct
 * @type string[]
 * @desc The menu cursor will not appear in these windows.
 * @default ["Window_ItemCategory","Window_OptionsCategory","Window_Status","Window_ShopNumber","Window_ItemCraftingNumber"]
 *
 * @param WindowPadding:struct
 * @text Window Padding
 * @type struct<WindowPadding>
 * @desc Make some windows more padded to accommodate for the menu cursor's oscillation.
 * @default {"AllWindows_Padding:num":"0","Window_MenuCommand_Padding:num":"0","Window_MenuStatus_Padding:num":"0","Window_MenuActor_Padding:num":"0","Window_ItemCategory_Padding:num":"0","Window_ItemList_Padding:num":"0","Window_SkillType_Padding:num":"0","Window_SkillList_Padding:num":"0","Window_EquipCommand_Padding:num":"0","Window_EquipSlot_Padding:num":"16","Window_EquipItem_Padding:num":"0","Window_Options_Padding:num":"16","Window_SavefileList_Padding:num":"0","Window_ShopCommand_Padding:num":"0","Window_ShopBuy_Padding:num":"0","Window_ShopSell_Padding:num":"0","Window_NameInput_Padding:num":"0","Window_ChoiceList_Padding:num":"16","Window_EventItem_Padding:num":"0","Window_PartyCommand_Padding:num":"0","Window_ActorCommand_Padding:num":"0","Window_BattleStatus_Padding:num":"0","Window_BattleActor_Padding:num":"0","Window_BattleEnemy_Padding:num":"0","Window_BattleSkill_Padding:num":"0","Window_BattleItem_Padding:num":"0","Window_TitleCommand_Padding:num":"0","Window_GameEnd_Padding:num":"0","Window_DebugRange_Padding:num":"16","Window_DebugEdit_Padding:num":"16","Window_CommonEventMenuList_Padding:num":"0","Window_QuestCommand_Padding:num":"0","Window_QuestList_Padding:num":"16","Window_TutorialList_Padding:num":"16"}
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
 * MenuCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the menu cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default center
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default top
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
/* ----------------------------------------------------------------------------
 * Tiling Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tiling:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable background tiling?
 * @default false
 * 
 * @param Filename:str
 * @text Filename
 * @parent General
 * @type file
 * @dir img/parallaxes/
 * @desc Filename of the parallax used for the tiling effect.
 * Leave empty to not use a background tile.
 * @default StarlitSky
 * 
 * @param Appearance
 *
 * @param BlendMode:num
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
 * @desc What kind of blend mode do you wish to apply to the tiling?
 * @default 0
 *
 * @param Buffer:num
 * @text Buffer
 * @parent Appearance
 * @type number
 * @desc How many pixels should be used to buffer the tiling?
 * @default 2
 *
 * @param ColorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the tiling?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Hue:num
 * @text Hue
 * @parent Appearance
 * @type number
 * @min 0
 * @max 360
 * @desc Do you wish to adjust this tiling's hue?
 * @default 0
 *
 * @param HueShift:num
 * @text Hue Shift
 * @parent Hue:num
 * @desc How much do you want the hue to shift each frame?
 * @default +0
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity of the tiling effect?
 * @default 255
 *
 * @param ScrollX:num
 * @text Scroll X Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll horizontally?
 * 0 for no scroll. Negative values scroll the other way.
 * @default -1.25
 *
 * @param ScrollY:num
 * @text Scroll Y Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll vertically?
 * 0 for no scroll. Negative values scroll the other way.
 * @default +0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Window Padding Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WindowPadding:
 *
 * @param AllWindows_Padding:num
 * @text All Windows
 * @type number
 * @desc How much extra item padding do you want for all windows?
 * @default 0
 *
 * @param Window_MenuCommand_Padding:num
 * @text Window_MenuCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuStatus_Padding:num
 * @text Window_MenuStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuActor_Padding:num
 * @text Window_MenuActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemCategory_Padding:num
 * @text Window_ItemCategory
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemList_Padding:num
 * @text Window_ItemList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillType_Padding:num
 * @text Window_SkillType
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillList_Padding:num
 * @text Window_SkillList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipCommand_Padding:num
 * @text Window_EquipCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipSlot_Padding:num
 * @text Window_EquipSlot
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EquipItem_Padding:num
 * @text Window_EquipItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_Options_Padding:num
 * @text Window_Options
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_SavefileList_Padding:num
 * @text Window_SavefileList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopCommand_Padding:num
 * @text Window_ShopCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopBuy_Padding:num
 * @text Window_ShopBuy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopSell_Padding:num
 * @text Window_ShopSell
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_NameInput_Padding:num
 * @text Window_NameInput
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ChoiceList_Padding:num
 * @text Window_ChoiceList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EventItem_Padding:num
 * @text Window_EventItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_PartyCommand_Padding:num
 * @text Window_PartyCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ActorCommand_Padding:num
 * @text Window_ActorCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleStatus_Padding:num
 * @text Window_BattleStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleActor_Padding:num
 * @text Window_BattleActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleEnemy_Padding:num
 * @text Window_BattleEnemy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleSkill_Padding:num
 * @text Window_BattleSkill
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleItem_Padding:num
 * @text Window_BattleItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_TitleCommand_Padding:num
 * @text Window_TitleCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_GameEnd_Padding:num
 * @text Window_GameEnd
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_DebugRange_Padding:num
 * @text Window_DebugRange
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_DebugEdit_Padding:num
 * @text Window_DebugEdit
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_CommonEventMenuList_Padding:num
 * @text Window_CommonEventMenuList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestCommand_Padding:num
 * @text Window_QuestCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestList_Padding:num
 * @text Window_QuestList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_TutorialList_Padding:num
 * @text Window_TutorialList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 */
//=============================================================================

const _0x169659=_0xa059;(function(_0x3b9aac,_0x137e4a){const _0x358c7f=_0xa059,_0x32599e=_0x3b9aac();while(!![]){try{const _0x248674=-parseInt(_0x358c7f(0x2e3))/(-0x12c4+0x1*0x16d+-0x456*-0x4)*(parseInt(_0x358c7f(0x2d3))/(-0x1693+-0xec+0xb*0x223))+parseInt(_0x358c7f(0x2e9))/(0x397*-0x8+0x215*0xd+0x8e*0x3)*(-parseInt(_0x358c7f(0x2ca))/(-0x1*-0x13f3+-0x1b09+0x71a))+-parseInt(_0x358c7f(0x21d))/(-0x4f*0x1f+0x2643+0x3*-0x98f)+-parseInt(_0x358c7f(0x1de))/(0x102c*0x1+-0x1101*0x1+-0x3*-0x49)*(parseInt(_0x358c7f(0x1c4))/(0x28+0xe19+0x3*-0x4be))+-parseInt(_0x358c7f(0x21f))/(0x2207+0x1b53+-0x5e*0xa7)+-parseInt(_0x358c7f(0x230))/(0x29*-0x1f+0x2*-0xae6+-0x2ae*-0xa)+parseInt(_0x358c7f(0x215))/(-0x787*-0x4+0x94d*0x1+-0x275f);if(_0x248674===_0x137e4a)break;else _0x32599e['push'](_0x32599e['shift']());}catch(_0x5d082b){_0x32599e['push'](_0x32599e['shift']());}}}(_0x545c,-0x91cf7+-0x5ff*-0x2be+-0x2f*-0x126a));var label=_0x169659(0x210),tier=tier||0x1b31*-0x1+-0x1350+0x2e81,dependencies=[],pluginData=$plugins[_0x169659(0x2a0)](function(_0x45427b){const _0x3af1e1=_0x169659,_0x2b6c05={'zTEhY':function(_0x5809d6,_0x29c873){return _0x5809d6+_0x29c873;},'VUSoN':function(_0x41225e,_0x17d9d6){return _0x41225e+_0x17d9d6;}};return _0x45427b[_0x3af1e1(0x239)]&&_0x45427b[_0x3af1e1(0x1f2)+'n'][_0x3af1e1(0x1f3)](_0x2b6c05[_0x3af1e1(0x253)](_0x2b6c05[_0x3af1e1(0x1d0)]('[',label),']'));})[-0xb0+-0x246d*0x1+0x251d];function _0x545c(){const _0x36c6b6=['Count','aszID','setHue','_frameInde','jeMNi','xCTFY','updatePare','dLEgZ','fxDQI','iconWidth','itialize','LSNJv','RkcOz','ing','itemPaddin','%1\x20is\x20inco','\x20%3\x20plugin','ams','active','JEkQy','UgeYx','ier\x20number','split','\x20into\x20the\x20','URkoo','yNzkS','4BCXEpC','trim','push','lNAWj','YntAB','mallest\x20to','fxUML','move','updateAnch','30gaGiBJ','ArbuD','HGVes','pUmbn','AuGOu','ARRAYNUM','bitmap','ARRAYEVAL','anager.','GVHAq','positionX','sXMrH','on\x20does\x20no','_cache','_menuCurso','right','80363vgrXFr','loadBitmap','IconSet','ZtWaN','ChangeSett','none','1396233orHDTM','IIdfE','6|7|3|5|4|','JSON','scale','_cursorBgT','mztEq','createMenu','idaYq','1|2|0|4|3','picture','xCEfF','sor','ScrollY','systemFile','rData','Settings','bWcLS','anchor','tion','jxlNi','exit','7nIPvPN','_frameMax','rameColsRo','FYbZh','ings','fkonu','KeKuS','frameCount','isVisible','ateCursor','Window_Sel','Window_upd','VUSoN','_ItemPaddi','_lastMenuC','loadSystem','BlendMode','rrectly\x20pl','tleActor','aERgY','ingDimensi','ing\x20a\x20requ','Hue','isMenuCurs','ztBeE','mDtkC','5292654gTkkZc','top','iling','tionCount','return\x200','vFBbj','iconHeight','eIcon','map','%1_Padding','menuCursor','Opacity','iconIndex','NUM','create','2|0|1','makeDeepCo','XyBJx','tener','call','descriptio','includes','updateFram','ARRAYSTR','nTfNO','ity','setColorTo','OCFmg','Game_Syste','BIiXZ','_parentWin','origin','e\x20Plugin\x20M','_frameCols','HueShift','VPLzB','RFefy','blendMode','n.\x0aPlease\x20','ist\x20from\x20s','_colorFilt','clamp','IAPOp','clRlg','Window_Bas','determineF','updateOpac','center','setFrame','addChild','MenuCursor','pBdlv','icon','sLiEM','ZtCGm','56903050rxIvqB','anchorY','children','gbjSz','ihaup','ARRAYSTRUC','ScrollX','floor','3582845rhqYxa','Tiling','6348360xfilmo','migEB','kgroundTil','Filename','ekiQo','_clientAre','Enable','updatePosi','parent','_createBac','waveSpeed','ectable_in','parameters','initMenuCu','ingHueShif','_settings','fhSYE','8328033JHmHLL','e\x20it\x20in\x20th','prite','GjSAc','horz','round','QVcKe','sorSprite','SNxPF','status','setParentW','aced\x20on\x20th','indow','ntWindow','ldren','dTJpX','bottom','VkPMZ','_animation','CursorBlac','ideviewBat','klist','WindowPadd','rsorSettin','3|4|2|5|0|','middle','bind','ConvertPar','mmand','ursorAnima','EVAL','PJSOu','filters','ARRAYJSON','frameDelay','zTEhY','toUpperCas','Window_cre','removeChil','RRyHb','e_itemPadd','Hauqj','4|6|3|1|5|','format','left','positionY','m_initiali','ease\x20updat','reorder\x20th','oOPUV','RkKKT','ingScroll','mSZre','match','Cursor','update','parse','ons','maDJj','ZpDfi','pRQqS','ejgJo','AITNr','waveDistan','name','updateScal','_frameRows','_cursorSpr','ted','_createCur','ateCursorS','\x20a\x20Tier\x20%2','initMember','STR','refreshMen','opjVH','tgAMP','height','prototype','\x20largest\x20t','orBlacklis','Window_Bat','_scene','isUsingSid','1|0|2|3|4','opacity','max','tleUI','JHxNG','DTZvY','initialize','WEGIH','BTLSS','system','rmeGu','FUNC','width','updateWave','ColorTone','type','0|5','QPrkN','_updateBac','_updateCur','install\x20%2','ename','eviewUiLay','DMEVI','dow','hhAkw','vert','constructo','filter','IRhxH','_hue','jjfXj','gIeYq','WbmOz','%1\x27s\x20versi','anchorX','ite','WRETU','e\x20plugin\x20l','YPaTU','6|2|1|3|4|','rSprite','ist.\x0aIt\x20is','ymByp'];_0x545c=function(){return _0x36c6b6;};return _0x545c();}function _0xa059(_0x2f4b60,_0x57621b){const _0x3276c4=_0x545c();return _0xa059=function(_0x46200c,_0x51b53e){_0x46200c=_0x46200c-(-0xb8f*0x2+0x1*0x17b9+0x129);let _0x290760=_0x3276c4[_0x46200c];return _0x290760;},_0xa059(_0x2f4b60,_0x57621b);}VisuMZ[label]['Settings']=VisuMZ[label][_0x169659(0x2f9)]||{},VisuMZ[_0x169659(0x24b)+'ams']=function(_0x2d9e7b,_0x1d8b4a){const _0x180879=_0x169659,_0x3be51b={'maDJj':function(_0x5ed2b3,_0x1613cb){return _0x5ed2b3(_0x1613cb);},'ymByp':_0x180879(0x1eb),'pUmbn':function(_0x38d969,_0x61e640){return _0x38d969!==_0x61e640;},'RRyHb':_0x180879(0x2d8),'saMhL':_0x180879(0x24e),'VPLzB':function(_0x239945,_0x4f6a78){return _0x239945!==_0x4f6a78;},'FVAnO':function(_0x42abfe,_0x20ad87){return _0x42abfe(_0x20ad87);},'CaLLd':_0x180879(0x2da),'xCTFY':_0x180879(0x2ec),'rmeGu':function(_0x4ca51b,_0x19c000){return _0x4ca51b!==_0x19c000;},'aszID':_0x180879(0x251),'nTfNO':_0x180879(0x28f),'dLEgZ':function(_0x4a00ff,_0x36a1a1){return _0x4a00ff!==_0x36a1a1;},'ZpDfi':_0x180879(0x1e2),'DMEVI':'ARRAYFUNC','IRhxH':function(_0x5e6a70,_0x5d24fb){return _0x5e6a70!==_0x5d24fb;},'WKcDr':_0x180879(0x279),'XyBJx':function(_0x21811b,_0x313e30){return _0x21811b!==_0x313e30;},'dTJpX':function(_0x3335d9,_0x18969e){return _0x3335d9(_0x18969e);},'GVHAq':_0x180879(0x1f5),'ArbuD':'STRUCT','PDTCW':_0x180879(0x21a)+'T','FYbZh':function(_0x3c8ab8,_0x491d59){return _0x3c8ab8!==_0x491d59;}};for(const _0x536804 in _0x1d8b4a){if(_0x536804[_0x180879(0x265)](/(.*):(.*)/i)){const _0x2a0679=_0x3be51b[_0x180879(0x26a)](String,RegExp['$1']),_0x4a0b6b=_0x3be51b[_0x180879(0x26a)](String,RegExp['$2'])[_0x180879(0x254)+'e']()[_0x180879(0x2cb)]();let _0x415c6f,_0x2bdd85,_0x28ab14;switch(_0x4a0b6b){case _0x3be51b[_0x180879(0x2af)]:_0x415c6f=_0x3be51b[_0x180879(0x2d6)](_0x1d8b4a[_0x536804],'')?_0x3be51b[_0x180879(0x26a)](Number,_0x1d8b4a[_0x536804]):-0xb9b*-0x2+0x17f*0xe+0x12*-0x274;break;case _0x3be51b[_0x180879(0x257)]:_0x2bdd85=_0x3be51b[_0x180879(0x2d6)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):[],_0x415c6f=_0x2bdd85[_0x180879(0x1e6)](_0x256474=>Number(_0x256474));break;case _0x3be51b['saMhL']:_0x415c6f=_0x3be51b[_0x180879(0x201)](_0x1d8b4a[_0x536804],'')?_0x3be51b['FVAnO'](eval,_0x1d8b4a[_0x536804]):null;break;case _0x3be51b['CaLLd']:_0x2bdd85=_0x3be51b[_0x180879(0x201)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):[],_0x415c6f=_0x2bdd85[_0x180879(0x1e6)](_0x356339=>eval(_0x356339));break;case _0x3be51b[_0x180879(0x2b5)]:_0x415c6f=_0x3be51b[_0x180879(0x28e)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):'';break;case _0x3be51b[_0x180879(0x2b1)]:_0x2bdd85=_0x3be51b[_0x180879(0x28e)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):[],_0x415c6f=_0x2bdd85[_0x180879(0x1e6)](_0x57dcca=>JSON[_0x180879(0x268)](_0x57dcca));break;case _0x3be51b[_0x180879(0x1f6)]:_0x415c6f=_0x3be51b[_0x180879(0x2b7)](_0x1d8b4a[_0x536804],'')?new Function(JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804])):new Function(_0x3be51b[_0x180879(0x26b)]);break;case _0x3be51b[_0x180879(0x29b)]:_0x2bdd85=_0x3be51b[_0x180879(0x2a1)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):[],_0x415c6f=_0x2bdd85['map'](_0x14b256=>new Function(JSON['parse'](_0x14b256)));break;case _0x3be51b['WKcDr']:_0x415c6f=_0x3be51b[_0x180879(0x1ef)](_0x1d8b4a[_0x536804],'')?_0x3be51b[_0x180879(0x23f)](String,_0x1d8b4a[_0x536804]):'';break;case _0x3be51b[_0x180879(0x2dc)]:_0x2bdd85=_0x3be51b['XyBJx'](_0x1d8b4a[_0x536804],'')?JSON['parse'](_0x1d8b4a[_0x536804]):[],_0x415c6f=_0x2bdd85[_0x180879(0x1e6)](_0x995812=>String(_0x995812));break;case _0x3be51b[_0x180879(0x2d4)]:_0x28ab14=_0x3be51b[_0x180879(0x2b7)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):{},_0x415c6f=VisuMZ['ConvertPar'+_0x180879(0x2c1)]({},_0x28ab14);break;case _0x3be51b['PDTCW']:_0x2bdd85=_0x3be51b[_0x180879(0x1c7)](_0x1d8b4a[_0x536804],'')?JSON[_0x180879(0x268)](_0x1d8b4a[_0x536804]):[],_0x415c6f=_0x2bdd85[_0x180879(0x1e6)](_0x23d0d3=>VisuMZ['ConvertPar'+_0x180879(0x2c1)]({},JSON['parse'](_0x23d0d3)));break;default:continue;}_0x2d9e7b[_0x2a0679]=_0x415c6f;}}return _0x2d9e7b;},(_0x23e9be=>{const _0xd03331=_0x169659,_0x4c9485={'yNzkS':function(_0x18ad00,_0x3270dc){return _0x18ad00(_0x3270dc);},'bWcLS':'%1\x20is\x20miss'+_0xd03331(0x1d9)+'ired\x20plugi'+_0xd03331(0x204)+_0xd03331(0x298)+_0xd03331(0x2c7)+'Plugin\x20Man'+'ager.','fhSYE':function(_0x76ced5,_0x2ce197){return _0x76ced5(_0x2ce197);},'oUIpf':function(_0x30f068,_0x3eea7f){return _0x30f068!==_0x3eea7f;},'PJSOu':_0xd03331(0x2a6)+_0xd03331(0x2df)+'t\x20match\x20pl'+'ugin\x27s.\x20Pl'+_0xd03331(0x25f)+_0xd03331(0x231)+_0xd03331(0x1fe)+_0xd03331(0x2db),'oOPUV':function(_0x1b3947,_0x33d3d2){return _0x1b3947(_0x33d3d2);},'RFefy':function(_0x2a5a4c,_0x10896c){return _0x2a5a4c<_0x10896c;},'KeKuS':function(_0xf95869,_0x2eafbf){return _0xf95869(_0x2eafbf);},'pRQqS':_0xd03331(0x2bf)+_0xd03331(0x1d5)+_0xd03331(0x23b)+_0xd03331(0x2aa)+_0xd03331(0x2ae)+_0xd03331(0x277)+'\x20plugin\x20pl'+'aced\x20over\x20'+'other\x20Tier'+_0xd03331(0x2c0)+'s.\x0aPlease\x20'+_0xd03331(0x260)+_0xd03331(0x2aa)+_0xd03331(0x205)+_0xd03331(0x2cf)+_0xd03331(0x27f)+_0xd03331(0x2c5)+'s.'},_0x3a6229=_0x23e9be[_0xd03331(0x270)];for(const _0x29c330 of dependencies){if(!Imported[_0x29c330]){_0x4c9485[_0xd03331(0x2c9)](alert,_0x4c9485[_0xd03331(0x2fa)][_0xd03331(0x25b)](_0x3a6229,_0x29c330)),SceneManager[_0xd03331(0x2fe)]();break;}}const _0x49d3ec=_0x23e9be[_0xd03331(0x1f2)+'n'];if(_0x49d3ec['match'](/\[Version[ ](.*?)\]/i)){const _0x276fb0=_0x4c9485[_0xd03331(0x22f)](Number,RegExp['$1']);_0x4c9485['oUIpf'](_0x276fb0,VisuMZ[label]['version'])&&(_0x4c9485[_0xd03331(0x2c9)](alert,_0x4c9485[_0xd03331(0x24f)][_0xd03331(0x25b)](_0x3a6229,_0x276fb0)),SceneManager[_0xd03331(0x2fe)]());}if(_0x49d3ec[_0xd03331(0x265)](/\[Tier[ ](\d+)\]/i)){const _0x16fd04=_0x4c9485[_0xd03331(0x261)](Number,RegExp['$1']);_0x4c9485[_0xd03331(0x202)](_0x16fd04,tier)?(_0x4c9485[_0xd03331(0x1ca)](alert,_0x4c9485[_0xd03331(0x26c)][_0xd03331(0x25b)](_0x3a6229,_0x16fd04,tier)),SceneManager[_0xd03331(0x2fe)]()):tier=Math[_0xd03331(0x286)](_0x16fd04,tier);}VisuMZ['ConvertPar'+_0xd03331(0x2c1)](VisuMZ[label][_0xd03331(0x2f9)],_0x23e9be[_0xd03331(0x22b)]);})(pluginData),PluginManager['registerCo'+_0x169659(0x24c)](pluginData[_0x169659(0x270)],_0x169659(0x210)+_0x169659(0x2e7)+_0x169659(0x1c8),_0x1060f0=>{const _0x4d5368=_0x169659;VisuMZ[_0x4d5368(0x24b)+'ams'](_0x1060f0,_0x1060f0);const _0x4da013=JsonEx[_0x4d5368(0x1ee)+'py'](_0x1060f0);$gameSystem['setMenuCur'+_0x4d5368(0x2f5)](_0x4da013);}),VisuMZ[_0x169659(0x210)][_0x169659(0x1fa)+_0x169659(0x25e)+'ze']=Game_System[_0x169659(0x27e)]['initialize'],Game_System[_0x169659(0x27e)][_0x169659(0x28a)]=function(){const _0x3d0856=_0x169659;VisuMZ[_0x3d0856(0x210)][_0x3d0856(0x1fa)+_0x3d0856(0x25e)+'ze'][_0x3d0856(0x1f1)](this),this['initMenuCu'+_0x3d0856(0x247)+'gs']();},Game_System[_0x169659(0x27e)][_0x169659(0x22c)+_0x169659(0x247)+'gs']=function(){const _0x3a9c81=_0x169659;this[_0x3a9c81(0x2e1)+'rData']=JsonEx[_0x3a9c81(0x1ee)+'py'](VisuMZ[_0x3a9c81(0x210)][_0x3a9c81(0x2f9)][_0x3a9c81(0x210)]);},Game_System[_0x169659(0x27e)][_0x169659(0x1e8)]=function(){const _0x59281e=_0x169659,_0x99bacf={'FYJTG':function(_0xe0e8f6,_0x39f1d5){return _0xe0e8f6===_0x39f1d5;}};if(_0x99bacf['FYJTG'](this['_menuCurso'+_0x59281e(0x2f8)],undefined))this['initMenuCu'+_0x59281e(0x247)+'gs']();return this[_0x59281e(0x2e1)+'rData'];},Game_System[_0x169659(0x27e)]['setMenuCur'+_0x169659(0x2f5)]=function(_0x51d1f5){const _0x28741d=_0x169659;this['_menuCurso'+_0x28741d(0x2f8)]=_0x51d1f5,this[_0x28741d(0x27a)+'uCursorChi'+_0x28741d(0x23e)](SceneManager[_0x28741d(0x282)]);},Game_System[_0x169659(0x27e)][_0x169659(0x27a)+'uCursorChi'+_0x169659(0x23e)]=function(_0x5626e3){const _0x3d2916=_0x169659;if(!_0x5626e3)return;_0x5626e3[_0x3d2916(0x2f0)+_0x3d2916(0x266)]&&_0x5626e3['createMenu'+_0x3d2916(0x266)]();if(_0x5626e3[_0x3d2916(0x217)])for(const _0x131dc9 of _0x5626e3[_0x3d2916(0x217)]){$gameSystem[_0x3d2916(0x27a)+'uCursorChi'+_0x3d2916(0x23e)](_0x131dc9);}};function Sprite_MenuCursor(){const _0x30ff64=_0x169659;this[_0x30ff64(0x28a)](...arguments);}Sprite_MenuCursor['prototype']=Object[_0x169659(0x1ec)](Sprite[_0x169659(0x27e)]),Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x29f)+'r']=Sprite_MenuCursor,Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x28a)]=function(){const _0x2105b9=_0x169659;Sprite[_0x2105b9(0x27e)][_0x2105b9(0x28a)][_0x2105b9(0x1f1)](this),this[_0x2105b9(0x278)+'s']();},Sprite_MenuCursor['prototype'][_0x169659(0x278)+'s']=function(){const _0x18010d=_0x169659,_0x13ecac={'sXMrH':_0x18010d(0x2eb)+_0x18010d(0x1ed)},_0x68d86c=_0x13ecac[_0x18010d(0x2de)][_0x18010d(0x2c6)]('|');let _0x178d33=-0x18*-0x4+-0xb6*-0x26+0x6d9*-0x4;while(!![]){switch(_0x68d86c[_0x178d33++]){case'0':this[_0x18010d(0x2e0)]={'scale':{'x':0x1,'y':0x1}};continue;case'1':this['opacity']=-0x1*-0xcc9+-0x234f+-0x1f*-0xba;continue;case'2':this['_frameMax']=0x526+-0x23*-0x10a+0x2983*-0x1;continue;case'3':this[_0x18010d(0x2b3)+'x']=-0x39*0x21+-0x1839+0x1f92;continue;case'4':this[_0x18010d(0x272)]=0x40a+0x49*0x7b+-0x1*0x271c;continue;case'5':this[_0x18010d(0x1ff)]=-0x555+-0x1572+0x1ac8;continue;case'6':this['_parentWin'+_0x18010d(0x29c)]=null;continue;case'7':this[_0x18010d(0x22e)]=null;continue;}break;}},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x23a)+_0x169659(0x23c)]=function(_0x266a53){const _0x5367bd=_0x169659,_0xd04702={'migEB':function(_0x34c120,_0x490e28){return _0x34c120===_0x490e28;}};if(_0xd04702[_0x5367bd(0x220)](this[_0x5367bd(0x1fc)+'dow'],_0x266a53))return;this[_0x5367bd(0x1fc)+'dow']=_0x266a53,this[_0x5367bd(0x1fc)+_0x5367bd(0x29c)]?this[_0x5367bd(0x2b6)+'ntWindow']():this['_settings']=null;},Sprite_MenuCursor['prototype'][_0x169659(0x2b6)+_0x169659(0x23d)]=function(){const _0x13b7e7=_0x169659;this['_settings']=$gameSystem[_0x13b7e7(0x1e8)](),this[_0x13b7e7(0x2d2)+'or'](),this[_0x13b7e7(0x2e4)]();},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x2d2)+'or']=function(){const _0xbac16d=_0x169659,_0x501fd4={'vFBbj':_0xbac16d(0x25c),'ekiQo':'center','ZtWaN':_0xbac16d(0x2e2),'GjSAc':_0xbac16d(0x1df),'DTZvY':'middle','SlTyB':_0xbac16d(0x240)};switch(this[_0xbac16d(0x22e)][_0xbac16d(0x2a7)]){case _0x501fd4[_0xbac16d(0x1e3)]:this[_0xbac16d(0x2fb)]['x']=0xf02+-0x1*0x79b+-0x767;break;case _0x501fd4[_0xbac16d(0x223)]:this['anchor']['x']=0x6*0x52c+-0x1c76+-0x292+0.5;break;case _0x501fd4[_0xbac16d(0x2e6)]:this[_0xbac16d(0x2fb)]['x']=0xf1*0x14+0x2*0x5e7+0x1ea1*-0x1;break;}switch(this[_0xbac16d(0x22e)][_0xbac16d(0x216)]){case _0x501fd4[_0xbac16d(0x233)]:this[_0xbac16d(0x2fb)]['y']=0x1*-0x913+0xcf+0x844;break;case _0x501fd4[_0xbac16d(0x289)]:this['anchor']['y']=-0x4*0x577+-0x1*-0x859+0xd83+0.5;break;case _0x501fd4['SlTyB']:this['anchor']['y']=-0xb*-0x1e1+-0xe43+-0xb*0x95;break;}},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x2e4)]=function(){const _0x26fa5a=_0x169659,_0xebce38={'RkcOz':_0x26fa5a(0x212),'YPaTU':_0x26fa5a(0x2e5),'UgeYx':'picture','jxlNi':_0x26fa5a(0x28d)};if(!this[_0x26fa5a(0x22e)])return;switch(this[_0x26fa5a(0x22e)]['type']){case _0xebce38[_0x26fa5a(0x2bc)]:this[_0x26fa5a(0x2d9)]=ImageManager[_0x26fa5a(0x1d3)](_0xebce38[_0x26fa5a(0x2ab)]);break;case _0xebce38[_0x26fa5a(0x2c4)]:this[_0x26fa5a(0x2d9)]=ImageManager['loadPictur'+'e'](this['_settings']['pictureFil'+_0x26fa5a(0x299)]),this[_0x26fa5a(0x20b)+_0x26fa5a(0x1c6)+'ws'](this['_settings']['pictureFil'+_0x26fa5a(0x299)]);break;case _0xebce38[_0x26fa5a(0x2fd)]:this[_0x26fa5a(0x2d9)]=ImageManager[_0x26fa5a(0x1d3)](this[_0x26fa5a(0x22e)][_0x26fa5a(0x2f7)+_0x26fa5a(0x270)]),this[_0x26fa5a(0x20b)+_0x26fa5a(0x1c6)+'ws'](this[_0x26fa5a(0x22e)][_0x26fa5a(0x2f7)+_0x26fa5a(0x270)]);break;}this[_0x26fa5a(0x2b3)+'x']=-0x55d*-0x7+-0x926+0x977*-0x3,this[_0x26fa5a(0x2d9)]['addLoadLis'+_0x26fa5a(0x1f0)](this[_0x26fa5a(0x1f4)+'e'][_0x26fa5a(0x24a)](this,!![]));},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x20b)+'rameColsRo'+'ws']=function(_0x36ebad){const _0x283268=_0x169659,_0x2e86f6={'RkKKT':function(_0x3cb825,_0x1684d6){return _0x3cb825(_0x1684d6);},'URkoo':function(_0x2a2a61,_0x4230e3){return _0x2a2a61(_0x4230e3);},'AITNr':function(_0x3fd909,_0x3047da){return _0x3fd909*_0x3047da;}};_0x36ebad[_0x283268(0x265)](/\[(\d+)x(\d+)\]/i)?(this['_frameCols']=Math['max'](0x1d5*-0x3+-0xe3*-0x7+0xb5*-0x1,_0x2e86f6[_0x283268(0x262)](Number,RegExp['$1'])),this['_frameRows']=Math[_0x283268(0x286)](-0x2159+-0x5*-0x2ef+0x12af,_0x2e86f6[_0x283268(0x2c8)](Number,RegExp['$2']))):(this['_frameCols']=-0x16ba+-0x2*-0xba0+-0x85,this[_0x283268(0x272)]=0x1062+-0x5f+-0x1002),this[_0x283268(0x1c5)]=_0x2e86f6[_0x283268(0x26e)](this[_0x283268(0x1ff)],this[_0x283268(0x272)]);},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x267)]=function(){const _0x5b4520=_0x169659,_0x5c8d75={'idaYq':function(_0x1752c9,_0x32531f){return _0x1752c9>_0x32531f;},'xCEfF':_0x5b4520(0x284)};Sprite[_0x5b4520(0x27e)][_0x5b4520(0x267)][_0x5b4520(0x1f1)](this);if(this['_parentWin'+_0x5b4520(0x29c)]&&this['bitmap']&&_0x5c8d75[_0x5b4520(0x2f1)](this[_0x5b4520(0x2d9)][_0x5b4520(0x290)],0x218b+-0x35*0x13+0x17b*-0x14)){const _0x51c831=_0x5c8d75[_0x5b4520(0x2f4)][_0x5b4520(0x2c6)]('|');let _0x1a10a6=0x7*0x229+0x21f3*0x1+-0x3112;while(!![]){switch(_0x51c831[_0x1a10a6++]){case'0':this[_0x5b4520(0x271)+'e']();continue;case'1':this[_0x5b4520(0x20c)+'ity']();continue;case'2':this['updateFram'+'e']();continue;case'3':this[_0x5b4520(0x226)+_0x5b4520(0x2fc)]();continue;case'4':this['updateWave']();continue;}break;}}else this['opacity']=0x1f*-0x13f+0x19*0x103+0xd56;},Sprite_MenuCursor['prototype'][_0x169659(0x20c)+_0x169659(0x1f7)]=function(){const _0x187e0f=_0x169659;this['opacity']=this[_0x187e0f(0x1cc)]()?0x1c3d+0x176c+0x32aa*-0x1:0x455+0x1672+0x55b*-0x5;},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x1cc)]=function(){const _0x308c54=_0x169659,_0x5d5aa6={'jeMNi':function(_0x85f2f7,_0x47ee73){return _0x85f2f7<_0x47ee73;}},_0x272d59=this['_parentWin'+_0x308c54(0x29c)];if(!_0x272d59)return![];if(!_0x272d59['active'])return![];if(_0x5d5aa6[_0x308c54(0x2b4)](_0x272d59['index'](),-0x8d1+0x1*0x1693+-0x6*0x24b))return![];return!![];},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x271)+'e']=function(){const _0x135949=_0x169659,_0x3379e8={'sLiEM':_0x135949(0x25a)+'2|0','fxDQI':function(_0x530742,_0x269fcb){return _0x530742/_0x269fcb;},'HGVes':function(_0x49675e,_0x4bd314){return _0x49675e===_0x4bd314;},'QVcKe':function(_0x1d4b6b,_0x35cea5){return _0x1d4b6b/_0x35cea5;},'lNAWj':function(_0x5d4797,_0x592077){return _0x5d4797<=_0x592077;}},_0x456b32=_0x3379e8[_0x135949(0x213)][_0x135949(0x2c6)]('|');let _0x4954bc=0x494+0x722+-0xbb6;while(!![]){switch(_0x456b32[_0x4954bc++]){case'0':this[_0x135949(0x2e0)][_0x135949(0x2ed)]['y']=this[_0x135949(0x227)][_0x135949(0x2ed)]['y'];continue;case'1':this['scale']['x']=_0x3379e8[_0x135949(0x2b8)](0x216f+0x1c0a+-0x3d78,this[_0x135949(0x227)][_0x135949(0x2ed)]['x']);continue;case'2':this[_0x135949(0x2e0)][_0x135949(0x2ed)]['x']=this['parent']['scale']['x'];continue;case'3':if(_0x3379e8[_0x135949(0x2d5)](this[_0x135949(0x2e0)]['scale']['x'],this[_0x135949(0x227)][_0x135949(0x2ed)]['x'])&&_0x3379e8[_0x135949(0x2d5)](this[_0x135949(0x2e0)][_0x135949(0x2ed)]['y'],this['parent'][_0x135949(0x2ed)]['y']))return;continue;case'4':if(!this[_0x135949(0x227)])return;continue;case'5':this[_0x135949(0x2ed)]['y']=_0x3379e8[_0x135949(0x236)](-0x3*0xc9a+0xc7*0x15+0x157c,this[_0x135949(0x227)][_0x135949(0x2ed)]['y']);continue;case'6':if(_0x3379e8[_0x135949(0x2cd)](this[_0x135949(0x285)],-0x3*-0xb8a+-0x2646+-0x1a*-0x24))return;continue;}break;}},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x1f4)+'e']=function(_0x254783){const _0x3c0b3b=_0x169659,_0x2304ad={'WEGIH':function(_0x42e6d7,_0x2bd714){return _0x42e6d7>_0x2bd714;},'QPrkN':function(_0x2d8cfa,_0x4353f0){return _0x2d8cfa%_0x4353f0;},'OCFmg':_0x3c0b3b(0x212),'ORNLg':_0x3c0b3b(0x2f3),'pBdlv':'system'};if(!_0x254783){if(_0x2304ad[_0x3c0b3b(0x28b)](_0x2304ad[_0x3c0b3b(0x295)](Graphics[_0x3c0b3b(0x1cb)],this[_0x3c0b3b(0x22e)][_0x3c0b3b(0x252)]),-0x1566+0x913*-0x3+-0x1*-0x309f))return;}switch(this[_0x3c0b3b(0x22e)][_0x3c0b3b(0x293)]){case _0x2304ad[_0x3c0b3b(0x1f9)]:this[_0x3c0b3b(0x1f4)+_0x3c0b3b(0x1e5)]();break;case _0x2304ad['ORNLg']:case _0x2304ad[_0x3c0b3b(0x211)]:this[_0x3c0b3b(0x1f4)+'eColsRows']();break;};},Sprite_MenuCursor['prototype'][_0x169659(0x1f4)+_0x169659(0x1e5)]=function(){const _0x557e87=_0x169659,_0x2a553f={'SNxPF':function(_0x30f761,_0x59e082){return _0x30f761*_0x59e082;},'clRlg':function(_0x372dc6,_0x4d0c06){return _0x372dc6%_0x4d0c06;},'aERgY':function(_0xc8bb2e,_0x3c3ff7){return _0xc8bb2e/_0x3c3ff7;}},_0x1d2241=this[_0x557e87(0x22e)][_0x557e87(0x1ea)],_0x1d1d87=ImageManager[_0x557e87(0x2b9)],_0x303617=ImageManager[_0x557e87(0x1e4)],_0x328e37=_0x2a553f['SNxPF'](_0x2a553f[_0x557e87(0x209)](_0x1d2241,0x21*0x7e+0x16f*-0x3+-0xbe1),_0x1d1d87),_0x51e1c6=_0x2a553f[_0x557e87(0x238)](Math[_0x557e87(0x21c)](_0x2a553f[_0x557e87(0x1d7)](_0x1d2241,-0x1be*0x1+0x1cd*0x1+-0x1*-0x1)),_0x303617);this[_0x557e87(0x20e)](_0x328e37,_0x51e1c6,_0x1d1d87,_0x303617);},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x1f4)+'eColsRows']=function(){const _0x15d968=_0x169659,_0x4cdbbf={'JHxNG':_0x15d968(0x2ac)+_0x15d968(0x294),'WbmOz':function(_0x2e1b2f,_0x54b084){return _0x2e1b2f*_0x54b084;},'mztEq':function(_0x3eb713,_0x294588){return _0x3eb713/_0x294588;},'jjfXj':function(_0x46cd84,_0x4d63c5){return _0x46cd84>=_0x4d63c5;},'atwPP':function(_0x3ba9c9,_0x7e89a4){return _0x3ba9c9*_0x7e89a4;},'gIeYq':function(_0x1e5a6f,_0x1ecb1f){return _0x1e5a6f%_0x1ecb1f;}},_0x47ed2d=_0x4cdbbf[_0x15d968(0x288)][_0x15d968(0x2c6)]('|');let _0x5ca8fa=-0x110*-0x1+0x91*0x3f+0x17*-0x199;while(!![]){switch(_0x47ed2d[_0x5ca8fa++]){case'0':var _0x4923c5=_0x4cdbbf[_0x15d968(0x2a5)](Math[_0x15d968(0x21c)](_0x4cdbbf[_0x15d968(0x2ef)](this[_0x15d968(0x2b3)+'x'],this['_frameCols'])),_0x4a2138);continue;case'1':var _0x1c7a17=_0x4cdbbf['mztEq'](this['bitmap']['width'],this['_frameCols']);continue;case'2':if(_0x4cdbbf[_0x15d968(0x2a3)](this[_0x15d968(0x2b3)+'x'],this['_frameMax']))this[_0x15d968(0x2b3)+'x']=-0x3*-0x22a+-0x1cd*0xb+0xd51*0x1;continue;case'3':var _0x4a2138=_0x4cdbbf[_0x15d968(0x2ef)](this[_0x15d968(0x2d9)]['height'],this[_0x15d968(0x272)]);continue;case'4':var _0x1d1f6d=_0x4cdbbf['atwPP'](_0x4cdbbf[_0x15d968(0x2a4)](this[_0x15d968(0x2b3)+'x'],this['_frameCols']),_0x1c7a17);continue;case'5':this[_0x15d968(0x20e)](_0x1d1f6d,_0x4923c5,_0x1c7a17,_0x4a2138);continue;case'6':this[_0x15d968(0x2b3)+'x']++;continue;}break;}},Sprite_MenuCursor[_0x169659(0x27e)][_0x169659(0x226)+_0x169659(0x2fc)]=function(){const _0x2942b7=_0x169659,_0x23e7e2={'mDtkC':_0x2942b7(0x25c),'UvDzA':_0x2942b7(0x20d),'opjVH':function(_0x112e7a,_0xf69196){return _0x112e7a+_0xf69196;},'AuGOu':function(_0x5e8406,_0x2fa27c){return _0x5e8406/_0x2fa27c;},'PPDuS':_0x2942b7(0x2e2),'fkonu':function(_0x5c0579,_0x1dfebf){return _0x5c0579+_0x1dfebf;},'demxh':_0x2942b7(0x1df),'ihaup':_0x2942b7(0x249),'YntAB':function(_0x118cf6,_0x261125){return _0x118cf6/_0x261125;},'ZtCGm':_0x2942b7(0x240),'JEkQy':function(_0x2f95cd,_0x4eb107){return _0x2f95cd+_0x4eb107;},'BIiXZ':function(_0x4e9efe,_0xa5750e){return _0x4e9efe-_0xa5750e;}};if(!this[_0x2942b7(0x227)])return;if(!this[_0x2942b7(0x1fc)+_0x2942b7(0x29c)])return;const _0x135595=this['_parentWin'+_0x2942b7(0x29c)][_0x2942b7(0x273)+_0x2942b7(0x2a8)];if(!_0x135595){this[_0x2942b7(0x285)]=-0x475*-0x1+0x1*0x846+-0xcbb;return;}const _0xab8209=_0x135595[_0x2942b7(0x290)],_0x5956fb=_0x135595[_0x2942b7(0x27d)],_0x452bb3=this[_0x2942b7(0x1fc)+_0x2942b7(0x29c)][_0x2942b7(0x224)+'a'],_0xd9454e=this['_parentWin'+_0x2942b7(0x29c)]['_padding'];switch(this[_0x2942b7(0x22e)][_0x2942b7(0x2dd)]){case _0x23e7e2[_0x2942b7(0x1dd)]:this['x']=_0x135595['x'];break;case _0x23e7e2['UvDzA']:this['x']=_0x23e7e2[_0x2942b7(0x27b)](_0x135595['x'],Math[_0x2942b7(0x235)](_0x23e7e2[_0x2942b7(0x2d7)](_0xab8209,0x18cd+0x2091+-0x395c)));break;case _0x23e7e2['PPDuS']:this['x']=_0x23e7e2['fkonu'](_0x135595['x'],_0xab8209);break;}switch(this[_0x2942b7(0x22e)][_0x2942b7(0x25d)]){case _0x23e7e2['demxh']:this['y']=_0x135595['y'];break;case _0x23e7e2[_0x2942b7(0x219)]:this['y']=_0x23e7e2[_0x2942b7(0x1c9)](_0x135595['y'],Math[_0x2942b7(0x235)](_0x23e7e2[_0x2942b7(0x2ce)](_0x5956fb,0x1*-0x1269+-0x3*0xc7a+0x11*0x349)));break;case _0x23e7e2[_0x2942b7(0x214)]:this['y']=_0x23e7e2[_0x2942b7(0x2c3)](_0x135595['y'],_0x5956fb);break;}this['x']+=_0x452bb3['x'],this['y']+=_0x452bb3['y'],this['x']+=this[_0x2942b7(0x22e)]['offsetX'],this['y']+=this[_0x2942b7(0x22e)]['offsetY'],this['x']=this['x'][_0x2942b7(0x207)](_0xd9454e,_0x23e7e2[_0x2942b7(0x1fb)](this['_parentWin'+_0x2942b7(0x29c)]['width'],_0xd9454e)),this['y']=this['y'][_0x2942b7(0x207)](_0xd9454e,_0x23e7e2[_0x2942b7(0x1fb)](this[_0x2942b7(0x1fc)+'dow'][_0x2942b7(0x27d)],_0xd9454e));},Sprite_MenuCursor['prototype'][_0x169659(0x291)]=function(){const _0x3bd9a8=_0x169659,_0x39ccf8={'fxUML':function(_0x3a3396,_0x350b0e){return _0x3a3396===_0x350b0e;},'qbUuL':_0x3bd9a8(0x2e8),'IAPOp':function(_0x302c3d,_0x2d5d98){return _0x302c3d<=_0x2d5d98;},'hhAkw':function(_0x55c33e,_0x5e7944){return _0x55c33e*_0x5e7944;},'BTLSS':function(_0x3b1ad2,_0x44cbeb){return _0x3b1ad2===_0x44cbeb;},'tEGnb':_0x3bd9a8(0x234),'LSNJv':_0x3bd9a8(0x29e)},_0x3a8965=this['_settings']['waveType'];if(_0x39ccf8['fxUML'](_0x3a8965,_0x39ccf8['qbUuL']))return;if(_0x39ccf8[_0x3bd9a8(0x208)](this['_settings'][_0x3bd9a8(0x26f)+'ce'],0x1*-0x4b1+-0x1052*-0x2+-0x1bf3))return;const _0x5cda4d=this[_0x3bd9a8(0x22e)][_0x3bd9a8(0x26f)+'ce'],_0x567609=this[_0x3bd9a8(0x22e)][_0x3bd9a8(0x229)],_0x277b2b=Math[_0x3bd9a8(0x235)](_0x39ccf8[_0x3bd9a8(0x29d)](Math['cos'](_0x39ccf8[_0x3bd9a8(0x29d)](Graphics[_0x3bd9a8(0x1cb)],_0x567609)),_0x5cda4d));if(_0x39ccf8[_0x3bd9a8(0x28c)](_0x3a8965,_0x39ccf8['tEGnb']))this['x']+=_0x277b2b;else _0x39ccf8[_0x3bd9a8(0x2d0)](_0x3a8965,_0x39ccf8[_0x3bd9a8(0x2bb)])&&(this['y']+=_0x277b2b);},VisuMZ[_0x169659(0x210)][_0x169659(0x20a)+_0x169659(0x258)+'ing']=Window_Base[_0x169659(0x27e)][_0x169659(0x2be)+'g'],Window_Base['prototype'][_0x169659(0x2be)+'g']=function(){const _0x2ffc84=_0x169659,_0x312c35={'IIdfE':_0x2ffc84(0x1e7),'kBxnp':function(_0x514f04,_0x1c24ef){return _0x514f04+_0x1c24ef;}},_0x59162d=VisuMZ[_0x2ffc84(0x210)][_0x2ffc84(0x2f9)][_0x2ffc84(0x246)+'ing'];let _0x595d90=_0x59162d['AllWindows'+_0x2ffc84(0x1d1)+'ng']||-0x1dcf+-0x1*-0x230b+-0x53c;return _0x595d90+=_0x59162d[_0x312c35[_0x2ffc84(0x2ea)][_0x2ffc84(0x25b)](this[_0x2ffc84(0x29f)+'r']['name'])]||-0x1*-0x1565+-0x266f+0x110a,_0x312c35['kBxnp'](VisuMZ['MenuCursor'][_0x2ffc84(0x20a)+_0x2ffc84(0x258)+'ing']['call'](this),_0x595d90);},VisuMZ['MenuCursor'][_0x169659(0x255)+_0x169659(0x276)+_0x169659(0x232)]=Window[_0x169659(0x27e)][_0x169659(0x275)+_0x169659(0x237)],Window[_0x169659(0x27e)][_0x169659(0x275)+'sorSprite']=function(){const _0x26250e=_0x169659;VisuMZ[_0x26250e(0x210)][_0x26250e(0x255)+_0x26250e(0x276)+_0x26250e(0x232)][_0x26250e(0x1f1)](this),this[_0x26250e(0x228)+_0x26250e(0x221)+_0x26250e(0x2bd)]();},Window['prototype']['_createBac'+_0x169659(0x221)+'ing']=function(){const _0x3d5065=_0x169659,_0x191dd0={'zYvZo':function(_0x3fb964,_0x22c475){return _0x3fb964===_0x22c475;}},_0x54c8b6=VisuMZ[_0x3d5065(0x210)][_0x3d5065(0x2f9)][_0x3d5065(0x21e)];if(!_0x54c8b6)return;if(!_0x54c8b6[_0x3d5065(0x225)])return;if(_0x191dd0['zYvZo'](_0x54c8b6['Filename'],''))return;this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)]=new TilingSprite(),this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)][_0x3d5065(0x2d9)]=ImageManager['loadParall'+'ax'](_0x54c8b6[_0x3d5065(0x222)]),this[_0x3d5065(0x224)+'a'][_0x3d5065(0x20f)](this[_0x3d5065(0x2ee)+'iling']),this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)]['filters']=this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)][_0x3d5065(0x250)]||[],this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)][_0x3d5065(0x206)+'er']=new ColorFilter(),this['_cursorBgT'+_0x3d5065(0x1e0)][_0x3d5065(0x250)][_0x3d5065(0x2cc)](this['_cursorBgT'+'iling'][_0x3d5065(0x206)+'er']),this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)][_0x3d5065(0x203)]=_0x54c8b6[_0x3d5065(0x1d4)],this[_0x3d5065(0x2ee)+'iling'][_0x3d5065(0x285)]=_0x54c8b6[_0x3d5065(0x1e9)],this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)][_0x3d5065(0x206)+'er']['_hue']=_0x54c8b6[_0x3d5065(0x1da)]||0x2435*-0x1+-0x7*0x42c+-0x3d9*-0x11,this[_0x3d5065(0x2ee)+_0x3d5065(0x1e0)]['_colorFilt'+'er'][_0x3d5065(0x2b2)](_0x54c8b6[_0x3d5065(0x1da)]||-0x12ef+0x11a1+0x14e),this['_cursorBgT'+_0x3d5065(0x1e0)][_0x3d5065(0x206)+'er'][_0x3d5065(0x1f8)+'ne'](_0x54c8b6[_0x3d5065(0x292)]||[0x2*0xc2d+-0xd94+-0xac6,0x3*0x20+0x1c13*-0x1+0x1bb3,-0x1c04+0x2396+-0x792,-0x9cf+0x1472+-0xaa3]);},VisuMZ[_0x169659(0x210)][_0x169659(0x1cf)+'ateCursor']=Window[_0x169659(0x27e)]['_updateCur'+_0x169659(0x2f5)],Window[_0x169659(0x27e)][_0x169659(0x297)+'sor']=function(){const _0x119261=_0x169659;VisuMZ[_0x119261(0x210)][_0x119261(0x1cf)+_0x119261(0x1cd)][_0x119261(0x1f1)](this),this[_0x119261(0x296)+_0x119261(0x221)+_0x119261(0x2bd)]();},Window[_0x169659(0x27e)][_0x169659(0x296)+_0x169659(0x221)+'ing']=function(){const _0x1e1f98=_0x169659,_0x3216fe={'ejgJo':_0x1e1f98(0x248)+'1','gbjSz':function(_0x21cf63,_0x4f819a){return _0x21cf63===_0x4f819a;}},_0x1f2526=_0x3216fe[_0x1e1f98(0x26d)][_0x1e1f98(0x2c6)]('|');let _0x115b82=-0x1cf9+-0x1bef+-0x97c*-0x6;while(!![]){switch(_0x1f2526[_0x115b82++]){case'0':this[_0x1e1f98(0x296)+_0x1e1f98(0x221)+_0x1e1f98(0x263)]();continue;case'1':this[_0x1e1f98(0x296)+'kgroundTil'+_0x1e1f98(0x22d)+'t']();continue;case'2':this['_lastMenuC'+_0x1e1f98(0x24d)+_0x1e1f98(0x1e1)]=this[_0x1e1f98(0x242)+_0x1e1f98(0x2b0)];continue;case'3':if(!this['_cursorBgT'+_0x1e1f98(0x1e0)])return;continue;case'4':if(_0x3216fe[_0x1e1f98(0x218)](this[_0x1e1f98(0x1d2)+_0x1e1f98(0x24d)+'tionCount'],this[_0x1e1f98(0x242)+_0x1e1f98(0x2b0)]))return;continue;case'5':this[_0x1e1f98(0x296)+_0x1e1f98(0x221)+'ingDimensi'+'ons']();continue;}break;}},Window[_0x169659(0x27e)][_0x169659(0x296)+'kgroundTil'+_0x169659(0x1d8)+_0x169659(0x269)]=function(){const _0xb99724=_0x169659,_0x26da16={'Hauqj':function(_0x4c5187,_0x2dfba6){return _0x4c5187+_0x2dfba6;},'pncmD':function(_0x71422a,_0x582d10){return _0x71422a+_0x582d10;},'VvQDh':function(_0xf843fe,_0x27bbaf){return _0xf843fe-_0x27bbaf;},'ztBeE':function(_0x37cdd4,_0x1c8e04){return _0x37cdd4*_0x1c8e04;},'Nymxo':function(_0x5e757f,_0x44c059){return _0x5e757f-_0x44c059;},'mSZre':function(_0x19a62d,_0x494eb0){return _0x19a62d*_0x494eb0;}},_0x4a6554=VisuMZ[_0xb99724(0x210)][_0xb99724(0x2f9)][_0xb99724(0x21e)];if(!_0x4a6554)return;const _0x3f4c25=this[_0xb99724(0x273)+_0xb99724(0x2a8)],_0x2b43d3=this[_0xb99724(0x2ee)+_0xb99724(0x1e0)],_0x50b2d4=_0x4a6554['Buffer'];_0x2b43d3[_0xb99724(0x2d1)](_0x26da16[_0xb99724(0x259)](_0x3f4c25['x'],_0x50b2d4),_0x26da16['pncmD'](_0x3f4c25['y'],_0x50b2d4),Math[_0xb99724(0x286)](_0x26da16['VvQDh'](_0x3f4c25[_0xb99724(0x290)],_0x26da16[_0xb99724(0x1dc)](_0x50b2d4,0x15*-0x86+0x1*-0xc9a+-0x39*-0x6a)),-0xbe4*0x1+0x2b*0xc5+-0x1533),Math[_0xb99724(0x286)](_0x26da16['Nymxo'](_0x3f4c25['height'],_0x26da16[_0xb99724(0x264)](_0x50b2d4,0x1717+0x1997*0x1+-0x30ac)),-0xbf9+-0x2546+0x709*0x7));},Window['prototype'][_0x169659(0x296)+_0x169659(0x221)+'ingScroll']=function(){const _0x5ab138=_0x169659;if(!this[_0x5ab138(0x2c2)])return;const _0x1d81db=VisuMZ[_0x5ab138(0x210)][_0x5ab138(0x2f9)][_0x5ab138(0x21e)];if(!_0x1d81db)return;const _0x210cb6=this[_0x5ab138(0x2ee)+_0x5ab138(0x1e0)];_0x210cb6['origin']['x']+=_0x1d81db[_0x5ab138(0x21b)],_0x210cb6[_0x5ab138(0x1fd)]['y']+=_0x1d81db[_0x5ab138(0x2f6)];},Window[_0x169659(0x27e)][_0x169659(0x296)+_0x169659(0x221)+'ingHueShif'+'t']=function(){const _0x2bcefc=_0x169659;if(!this[_0x2bcefc(0x2c2)])return;const _0x59c436=VisuMZ[_0x2bcefc(0x210)][_0x2bcefc(0x2f9)][_0x2bcefc(0x21e)];if(!_0x59c436)return;this['_cursorBgT'+'iling'][_0x2bcefc(0x206)+'er'][_0x2bcefc(0x2a2)]+=_0x59c436[_0x2bcefc(0x200)],this[_0x2bcefc(0x2ee)+_0x2bcefc(0x1e0)]['_colorFilt'+'er'][_0x2bcefc(0x2b2)](this[_0x2bcefc(0x2ee)+_0x2bcefc(0x1e0)]['_colorFilt'+'er'][_0x2bcefc(0x2a2)]);},VisuMZ['MenuCursor'][_0x169659(0x1ce)+_0x169659(0x22a)+_0x169659(0x2ba)]=Window_Selectable[_0x169659(0x27e)]['initialize'],Window_Selectable[_0x169659(0x27e)][_0x169659(0x28a)]=function(_0x3ed36e){const _0x272d34=_0x169659;VisuMZ['MenuCursor'][_0x272d34(0x1ce)+_0x272d34(0x22a)+_0x272d34(0x2ba)]['call'](this,_0x3ed36e),this['createMenu'+_0x272d34(0x266)]();},Window_Selectable[_0x169659(0x27e)][_0x169659(0x2f0)+_0x169659(0x266)]=function(){const _0x2f96f7=_0x169659,_0x5e609a={'WRETU':_0x2f96f7(0x2f2)},_0x33d652=_0x5e609a[_0x2f96f7(0x2a9)][_0x2f96f7(0x2c6)]('|');let _0x17a1c4=-0x1ace+-0xe26+-0x28f4*-0x1;while(!![]){switch(_0x33d652[_0x17a1c4++]){case'0':this['_menuCurso'+_0x2f96f7(0x2ad)]=new Sprite_MenuCursor();continue;case'1':if(this['isMenuCurs'+_0x2f96f7(0x280)+_0x2f96f7(0x274)]())return;continue;case'2':this[_0x2f96f7(0x2e1)+'rSprite']&&(this[_0x2f96f7(0x256)+'d'](this[_0x2f96f7(0x2e1)+'rSprite']),delete this[_0x2f96f7(0x2e1)+_0x2f96f7(0x2ad)]);continue;case'3':this['_menuCurso'+_0x2f96f7(0x2ad)][_0x2f96f7(0x23a)+_0x2f96f7(0x23c)](this);continue;case'4':this[_0x2f96f7(0x20f)](this[_0x2f96f7(0x2e1)+_0x2f96f7(0x2ad)]);continue;}break;}},Window_Selectable[_0x169659(0x27e)][_0x169659(0x1db)+_0x169659(0x280)+'ted']=function(){const _0xdd74e=_0x169659,_0x44e471={'tgAMP':function(_0x25ee24,_0xdab736){return _0x25ee24===_0xdab736;},'VkPMZ':_0xdd74e(0x281)+_0xdd74e(0x1d6)};if(Imported['VisuMZ_3_S'+_0xdd74e(0x244)+_0xdd74e(0x287)]&&BattleManager[_0xdd74e(0x283)+_0xdd74e(0x29a)+'out']()){if(_0x44e471[_0xdd74e(0x27c)](this[_0xdd74e(0x29f)+'r']['name'],_0x44e471[_0xdd74e(0x241)]))return!![];}const _0x305b1b=VisuMZ[_0xdd74e(0x210)][_0xdd74e(0x2f9)][_0xdd74e(0x243)+_0xdd74e(0x245)]||[];return _0x305b1b[_0xdd74e(0x1f3)](this[_0xdd74e(0x29f)+'r'][_0xdd74e(0x270)]);},Window_NumberInput[_0x169659(0x27e)][_0x169659(0x2be)+'g']=function(){const _0x40d1e4=_0x169659;try{return VisuMZ['MenuCursor'][_0x40d1e4(0x20a)+_0x40d1e4(0x258)+_0x40d1e4(0x2bd)][_0x40d1e4(0x1f1)](this);}catch(_0x31bad5){return-0x8b*0x3+-0x1*0x26e9+0x2892;}};