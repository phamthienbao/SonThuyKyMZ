//=============================================================================
// VisuStella MZ - Battle System - CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.25] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 * 
 * Update Settings
 * 
 *   Adjust Similar AGI:
 *   - v1.22 update. Adjust turn order calculations for battlers with very
 *     similar AGI.
 * 
 *   Force Active Slot:
 *   - v1.24 update. Force active battler to the active slot.
 *   - This can be used to offset calculations that are too miniscule.
 * 
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * Version 1.25: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.24: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Parameters > Turn Order Settings > Updates > Adjust Similar AGI
 * **** v1.22 update. Adjust turn order calculations for battlers with very
 *      similar AGI.
 * *** Parameters > Turn Order Settings > Updates > Force Active Slot
 * **** v1.24 update. Force active battler to the active slot. This can be used
 *      to offset calculations that are too miniscule.
 * 
 * Version 1.23: July 18, 2024
 * * Bug Fixes!
 * ** Fixed a softlock that is caused from surprise attacks involving 100% CTB
 *    After Speed. Fix made by Olivia.
 * 
 * Version 1.22: July 13, 2023
 * * Bug Fixes!
 * ** Fixed turn order gauge sprite swapping bug for battlers with similar AGI
 *    values. Fix made by Olivia.
 * 
 * Version 1.21: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the CTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <CTB After Speed: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS CTB After Speed> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: May 2, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Updates
 * @text Update Settings
 *
 * @param SimilarAgi:eval
 * @text Adjust Similar AGI
 * @parent Updates
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc v1.22 update. Adjust turn order calculations for battlers
 * with very similar AGI.
 * @default true
 *
 * @param ForceSubject:eval
 * @text Force Active Slot
 * @parent Updates
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc v1.24 update. Force active battler to the active slot.
 * This can be used to offset calculations that are too miniscule.
 * @default true
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x1d4352=_0xfd03;(function(_0x2d7e8a,_0x451980){const _0x1319cd=_0xfd03,_0x43595a=_0x2d7e8a();while(!![]){try{const _0x4709a3=parseInt(_0x1319cd(0x266))/0x1+parseInt(_0x1319cd(0x251))/0x2*(-parseInt(_0x1319cd(0x339))/0x3)+-parseInt(_0x1319cd(0x24f))/0x4+parseInt(_0x1319cd(0x304))/0x5+parseInt(_0x1319cd(0x29b))/0x6+-parseInt(_0x1319cd(0x26d))/0x7*(-parseInt(_0x1319cd(0x349))/0x8)+-parseInt(_0x1319cd(0x35b))/0x9;if(_0x4709a3===_0x451980)break;else _0x43595a['push'](_0x43595a['shift']());}catch(_0x1dbdc9){_0x43595a['push'](_0x43595a['shift']());}}}(_0x2ec2,0x5227b));var label=_0x1d4352(0x24e),tier=tier||0x0,dependencies=[_0x1d4352(0x1ef),_0x1d4352(0x30b)],pluginData=$plugins['filter'](function(_0x5386d5){const _0x4a5640=_0x1d4352;return _0x5386d5[_0x4a5640(0x1fe)]&&_0x5386d5[_0x4a5640(0x2fb)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1d4352(0x2c6)]=VisuMZ[label][_0x1d4352(0x2c6)]||{},VisuMZ['ConvertParams']=function(_0x40c023,_0x1af9b9){const _0x752854=_0x1d4352;for(const _0x91aa1c in _0x1af9b9){if(_0x91aa1c[_0x752854(0x206)](/(.*):(.*)/i)){const _0x50155c=String(RegExp['$1']),_0x3aa6a9=String(RegExp['$2'])['toUpperCase']()[_0x752854(0x33e)]();let _0x1009a7,_0x34ed7b,_0xfc9870;switch(_0x3aa6a9){case'NUM':_0x1009a7=_0x1af9b9[_0x91aa1c]!==''?Number(_0x1af9b9[_0x91aa1c]):0x0;break;case'ARRAYNUM':_0x34ed7b=_0x1af9b9[_0x91aa1c]!==''?JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c]):[],_0x1009a7=_0x34ed7b[_0x752854(0x2fd)](_0x398179=>Number(_0x398179));break;case'EVAL':_0x1009a7=_0x1af9b9[_0x91aa1c]!==''?eval(_0x1af9b9[_0x91aa1c]):null;break;case'ARRAYEVAL':_0x34ed7b=_0x1af9b9[_0x91aa1c]!==''?JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c]):[],_0x1009a7=_0x34ed7b['map'](_0x4f70b4=>eval(_0x4f70b4));break;case _0x752854(0x244):_0x1009a7=_0x1af9b9[_0x91aa1c]!==''?JSON['parse'](_0x1af9b9[_0x91aa1c]):'';break;case'ARRAYJSON':_0x34ed7b=_0x1af9b9[_0x91aa1c]!==''?JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c]):[],_0x1009a7=_0x34ed7b[_0x752854(0x2fd)](_0x366c45=>JSON[_0x752854(0x267)](_0x366c45));break;case _0x752854(0x300):_0x1009a7=_0x1af9b9[_0x91aa1c]!==''?new Function(JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c])):new Function(_0x752854(0x341));break;case _0x752854(0x22f):_0x34ed7b=_0x1af9b9[_0x91aa1c]!==''?JSON['parse'](_0x1af9b9[_0x91aa1c]):[],_0x1009a7=_0x34ed7b[_0x752854(0x2fd)](_0x7b00f1=>new Function(JSON[_0x752854(0x267)](_0x7b00f1)));break;case _0x752854(0x2ab):_0x1009a7=_0x1af9b9[_0x91aa1c]!==''?String(_0x1af9b9[_0x91aa1c]):'';break;case'ARRAYSTR':_0x34ed7b=_0x1af9b9[_0x91aa1c]!==''?JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c]):[],_0x1009a7=_0x34ed7b[_0x752854(0x2fd)](_0x452f26=>String(_0x452f26));break;case'STRUCT':_0xfc9870=_0x1af9b9[_0x91aa1c]!==''?JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c]):{},_0x1009a7=VisuMZ[_0x752854(0x21c)]({},_0xfc9870);break;case _0x752854(0x39f):_0x34ed7b=_0x1af9b9[_0x91aa1c]!==''?JSON[_0x752854(0x267)](_0x1af9b9[_0x91aa1c]):[],_0x1009a7=_0x34ed7b['map'](_0x26d0d5=>VisuMZ['ConvertParams']({},JSON[_0x752854(0x267)](_0x26d0d5)));break;default:continue;}_0x40c023[_0x50155c]=_0x1009a7;}}return _0x40c023;},(_0x433983=>{const _0x15f289=_0x1d4352,_0x5c9bfc=_0x433983[_0x15f289(0x239)];for(const _0x201606 of dependencies){if(!Imported[_0x201606]){alert(_0x15f289(0x330)[_0x15f289(0x2f8)](_0x5c9bfc,_0x201606)),SceneManager[_0x15f289(0x208)]();break;}}const _0x26b247=_0x433983[_0x15f289(0x2fb)];if(_0x26b247['match'](/\[Version[ ](.*?)\]/i)){const _0x5c8e55=Number(RegExp['$1']);_0x5c8e55!==VisuMZ[label][_0x15f289(0x2c7)]&&(alert(_0x15f289(0x32d)[_0x15f289(0x2f8)](_0x5c9bfc,_0x5c8e55)),SceneManager[_0x15f289(0x208)]());}if(_0x26b247[_0x15f289(0x206)](/\[Tier[ ](\d+)\]/i)){const _0x1c369b=Number(RegExp['$1']);_0x1c369b<tier?(alert(_0x15f289(0x276)['format'](_0x5c9bfc,_0x1c369b,tier)),SceneManager[_0x15f289(0x208)]()):tier=Math[_0x15f289(0x242)](_0x1c369b,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x15f289(0x2c6)],_0x433983['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1d4352(0x239)],_0x1d4352(0x1f4),_0x17d1f6=>{const _0x8b06ab=_0x1d4352;VisuMZ[_0x8b06ab(0x21c)](_0x17d1f6,_0x17d1f6);const _0x379d7d=_0x17d1f6[_0x8b06ab(0x367)],_0x103308=_0x17d1f6[_0x8b06ab(0x2bd)];for(const _0x5c9323 of _0x379d7d){const _0x4d83b8=$gameActors[_0x8b06ab(0x240)](_0x5c9323);if(!_0x4d83b8)continue;_0x4d83b8['_ctbTurnOrderGraphicType']=_0x8b06ab(0x1fc),_0x4d83b8[_0x8b06ab(0x28d)]=_0x103308;}}),PluginManager[_0x1d4352(0x1f1)](pluginData['name'],_0x1d4352(0x29f),_0x404b67=>{const _0x171fb0=_0x1d4352;VisuMZ[_0x171fb0(0x21c)](_0x404b67,_0x404b67);const _0x57bc03=_0x404b67['Actors'],_0x468be7=_0x404b67[_0x171fb0(0x358)],_0x39b19c=_0x404b67[_0x171fb0(0x2f9)];for(const _0x1efb68 of _0x57bc03){const _0x33b4c0=$gameActors[_0x171fb0(0x240)](_0x1efb68);if(!_0x33b4c0)continue;_0x33b4c0['_ctbTurnOrderGraphicType']='face',_0x33b4c0[_0x171fb0(0x268)]=_0x468be7,_0x33b4c0[_0x171fb0(0x2b9)]=_0x39b19c;}}),PluginManager[_0x1d4352(0x1f1)](pluginData[_0x1d4352(0x239)],'CtbTurnOrderClearActorGraphic',_0x4f13e6=>{const _0x50c713=_0x1d4352;VisuMZ[_0x50c713(0x21c)](_0x4f13e6,_0x4f13e6);const _0x531778=_0x4f13e6['Actors'];for(const _0x58a5cf of _0x531778){const _0x10935d=$gameActors[_0x50c713(0x240)](_0x58a5cf);if(!_0x10935d)continue;_0x10935d[_0x50c713(0x230)]();}}),PluginManager[_0x1d4352(0x1f1)](pluginData['name'],_0x1d4352(0x249),_0x323d3c=>{const _0x9ce975=_0x1d4352;VisuMZ[_0x9ce975(0x21c)](_0x323d3c,_0x323d3c);const _0x1a23a2=_0x323d3c['Enemies'],_0x3ebd4e=_0x323d3c[_0x9ce975(0x2bd)];for(const _0x249087 of _0x1a23a2){const _0x36417a=$gameTroop[_0x9ce975(0x260)]()[_0x249087];if(!_0x36417a)continue;_0x36417a[_0x9ce975(0x359)]=_0x9ce975(0x1fc),_0x36417a[_0x9ce975(0x28d)]=_0x3ebd4e;}}),PluginManager[_0x1d4352(0x1f1)](pluginData['name'],'CtbTurnOrderEnemyFace',_0x519f3f=>{const _0x11fafc=_0x1d4352;VisuMZ['ConvertParams'](_0x519f3f,_0x519f3f);const _0x511d86=_0x519f3f['Enemies'],_0x36b533=_0x519f3f[_0x11fafc(0x358)],_0x3d5832=_0x519f3f[_0x11fafc(0x2f9)];for(const _0x2b089c of _0x511d86){const _0x17ccc5=$gameTroop[_0x11fafc(0x260)]()[_0x2b089c];if(!_0x17ccc5)continue;_0x17ccc5[_0x11fafc(0x359)]=_0x11fafc(0x26e),_0x17ccc5['_ctbTurnOrderFaceName']=_0x36b533,_0x17ccc5['_ctbTurnOrderFaceIndex']=_0x3d5832;}}),PluginManager[_0x1d4352(0x1f1)](pluginData[_0x1d4352(0x239)],_0x1d4352(0x215),_0x5f1e86=>{const _0x2de5b3=_0x1d4352;VisuMZ[_0x2de5b3(0x21c)](_0x5f1e86,_0x5f1e86);const _0x175c93=_0x5f1e86[_0x2de5b3(0x342)];for(const _0xee6e46 of _0x175c93){const _0x5a07d1=$gameTroop[_0x2de5b3(0x260)]()[_0xee6e46];if(!_0x5a07d1)continue;_0x5a07d1[_0x2de5b3(0x230)]();}}),PluginManager[_0x1d4352(0x1f1)](pluginData['name'],'SystemTurnOrderVisibility',_0x3be69c=>{const _0xf9f5d7=_0x1d4352;VisuMZ['ConvertParams'](_0x3be69c,_0x3be69c);const _0x1d1aa2=_0x3be69c[_0xf9f5d7(0x2ee)];$gameSystem[_0xf9f5d7(0x2b1)](_0x1d1aa2);}),VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x1f8)]=Scene_Boot[_0x1d4352(0x369)]['onDatabaseLoaded'],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x2e5ade=_0x1d4352;this[_0x2e5ade(0x34f)](),VisuMZ[_0x2e5ade(0x24e)][_0x2e5ade(0x1f8)][_0x2e5ade(0x2b8)](this),this[_0x2e5ade(0x2a1)]();},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x38d)]={},Scene_Boot['prototype']['process_VisuMZ_BattleSystemCTB_CreateRegExp']=function(){const _0x4dd060=_0x1d4352,_0x259800=VisuMZ['BattleSystemCTB'][_0x4dd060(0x38d)],_0x247636=_0x4dd060(0x370),_0x3eb8bf=[_0x4dd060(0x334),_0x4dd060(0x2b6),_0x4dd060(0x279)];for(const _0x35beb4 of _0x3eb8bf){const _0x360e2f=_0x247636[_0x4dd060(0x2f8)](_0x35beb4[_0x4dd060(0x333)]()[_0x4dd060(0x33e)](),'(?:CTB)','(?:GAUGE|TIME|SPEED)'),_0x50b667=new RegExp(_0x360e2f,'i');VisuMZ['BattleSystemCTB'][_0x4dd060(0x38d)][_0x35beb4]=_0x50b667;}VisuMZ[_0x4dd060(0x24e)]['RegExp'][_0x4dd060(0x2e0)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x1d4352(0x369)][_0x1d4352(0x2a1)]=function(){const _0x5b3b34=_0x1d4352;if(VisuMZ[_0x5b3b34(0x262)])return;const _0x4dd35d=$dataSkills[_0x5b3b34(0x25d)]($dataItems);for(const _0x243bac of _0x4dd35d){if(!_0x243bac)continue;VisuMZ['BattleSystemCTB']['Parse_Notetags_CreateJS'](_0x243bac);}},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x353)]=VisuMZ[_0x1d4352(0x353)],VisuMZ[_0x1d4352(0x353)]=function(_0x22f57f){const _0x38620f=_0x1d4352;VisuMZ['BattleSystemCTB']['ParseSkillNotetags']['call'](this,_0x22f57f),VisuMZ[_0x38620f(0x24e)][_0x38620f(0x378)](_0x22f57f);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x2bb)]=VisuMZ[_0x1d4352(0x2bb)],VisuMZ[_0x1d4352(0x2bb)]=function(_0x1fac61){const _0x44c5a5=_0x1d4352;VisuMZ[_0x44c5a5(0x24e)][_0x44c5a5(0x2bb)][_0x44c5a5(0x2b8)](this,_0x1fac61),VisuMZ['BattleSystemCTB'][_0x44c5a5(0x378)](_0x1fac61);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x378)]=function(_0x4230ae){const _0x7d53e6=_0x1d4352,_0x1debe8=[_0x7d53e6(0x334),_0x7d53e6(0x2b6),_0x7d53e6(0x279)];for(const _0x4c8978 of _0x1debe8){VisuMZ[_0x7d53e6(0x24e)][_0x7d53e6(0x28c)](_0x4230ae,_0x4c8978);}VisuMZ['BattleSystemCTB'][_0x7d53e6(0x36d)](_0x4230ae,_0x7d53e6(0x29c));},VisuMZ[_0x1d4352(0x24e)]['JS']={},VisuMZ[_0x1d4352(0x24e)]['createRateJS']=function(_0x2bc8fb,_0x4ab4da){const _0x487313=_0x1d4352,_0x277913=_0x2bc8fb['note'];if(_0x277913[_0x487313(0x206)](VisuMZ[_0x487313(0x24e)][_0x487313(0x38d)][_0x4ab4da])){const _0x44cc0e=String(RegExp['$1']),_0xbdf822=_0x487313(0x2d3)[_0x487313(0x2f8)](_0x44cc0e,_0x4ab4da),_0x1ed7ce=VisuMZ['BattleSystemCTB'][_0x487313(0x301)](_0x2bc8fb,_0x4ab4da);VisuMZ[_0x487313(0x24e)]['JS'][_0x1ed7ce]=new Function(_0xbdf822);}},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x36d)]=function(_0x4b3c01,_0x3498ba){const _0x300fc6=_0x1d4352,_0x108dfd=_0x4b3c01['note'];if(_0x108dfd[_0x300fc6(0x206)](VisuMZ[_0x300fc6(0x24e)]['RegExp'][_0x300fc6(0x2e0)])){const _0x84cd50=String(RegExp['$1']),_0x4875cb=_0x300fc6(0x372)[_0x300fc6(0x2f8)](_0x84cd50,_0x3498ba),_0x3c9122=VisuMZ[_0x300fc6(0x24e)]['createKeyJS'](_0x4b3c01,_0x3498ba);VisuMZ[_0x300fc6(0x24e)]['JS'][_0x3c9122]=new Function(_0x4875cb);}},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x301)]=function(_0x3e39fc,_0x455645){const _0x3b8e0e=_0x1d4352;if(VisuMZ[_0x3b8e0e(0x301)])return VisuMZ[_0x3b8e0e(0x301)](_0x3e39fc,_0x455645);let _0x13c870='';if($dataActors[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870='Actor-%1-%2'[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);if($dataClasses[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870=_0x3b8e0e(0x286)[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);if($dataSkills[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870=_0x3b8e0e(0x380)['format'](_0x3e39fc['id'],_0x455645);if($dataItems[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870=_0x3b8e0e(0x28a)[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);if($dataWeapons[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870=_0x3b8e0e(0x232)[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);if($dataArmors['includes'](_0x3e39fc))_0x13c870='Armor-%1-%2'[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);if($dataEnemies[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870=_0x3b8e0e(0x32a)[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);if($dataStates[_0x3b8e0e(0x2b3)](_0x3e39fc))_0x13c870=_0x3b8e0e(0x37f)[_0x3b8e0e(0x2f8)](_0x3e39fc['id'],_0x455645);return _0x13c870;},ImageManager[_0x1d4352(0x21f)]=ImageManager[_0x1d4352(0x21f)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x1d4352(0x2ce)]||0x6,VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x275)]=BattleManager[_0x1d4352(0x2a5)],BattleManager[_0x1d4352(0x2a5)]=function(){const _0x434401=_0x1d4352;if(this['isCTB']())return _0x434401(0x2cb);return VisuMZ['BattleSystemCTB'][_0x434401(0x275)][_0x434401(0x2b8)](this);},BattleManager[_0x1d4352(0x2e9)]=function(){const _0x3493d2=_0x1d4352;return $gameSystem[_0x3493d2(0x2d4)]()===_0x3493d2(0x2cb);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x1fa)]=BattleManager[_0x1d4352(0x24c)],BattleManager[_0x1d4352(0x24c)]=function(){const _0x29c29a=_0x1d4352;if(this[_0x29c29a(0x2e9)]())return!![];return VisuMZ['BattleSystemCTB']['BattleManager_isTpb'][_0x29c29a(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x24d)]=BattleManager['isActiveTpb'],BattleManager[_0x1d4352(0x270)]=function(){const _0x592137=_0x1d4352;if(this[_0x592137(0x2e9)]())return![];return VisuMZ[_0x592137(0x24e)]['BattleManager_isActiveTpb'][_0x592137(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x2be)]=BattleManager[_0x1d4352(0x2f1)],BattleManager[_0x1d4352(0x2f1)]=function(_0x1c7622){const _0x3fa115=_0x1d4352;this[_0x3fa115(0x2e9)]()?this[_0x3fa115(0x213)](_0x1c7622):VisuMZ['BattleSystemCTB']['BattleManager_updateTurn'][_0x3fa115(0x2b8)](this,_0x1c7622);},BattleManager[_0x1d4352(0x213)]=function(_0x57027f){const _0x5035c1=_0x1d4352;return VisuMZ['BattleSystemCTB'][_0x5035c1(0x2be)]['call'](this,_0x57027f);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x27c)]=BattleManager[_0x1d4352(0x2dc)],BattleManager[_0x1d4352(0x2dc)]=function(){const _0x46fc70=_0x1d4352;this[_0x46fc70(0x2e9)]()?this['processTurnCTB']():VisuMZ[_0x46fc70(0x24e)]['BattleManager_processTurn'][_0x46fc70(0x2b8)](this);},BattleManager[_0x1d4352(0x28f)]=function(){const _0x5cf169=_0x1d4352;this[_0x5cf169(0x376)]();const _0x10137d=this[_0x5cf169(0x200)],_0x1f1ad5=_0x10137d[_0x5cf169(0x3aa)]();_0x1f1ad5?(_0x1f1ad5['prepare'](),_0x1f1ad5[_0x5cf169(0x2f6)]()&&this[_0x5cf169(0x338)](),_0x10137d[_0x5cf169(0x211)]()):(_0x10137d[_0x5cf169(0x217)](0x0),this[_0x5cf169(0x3a9)](),this[_0x5cf169(0x200)]=null);},BattleManager[_0x1d4352(0x235)]=function(){const _0x2ed262=_0x1d4352;if(this[_0x2ed262(0x200)])return!![];if(this['_phase']!==_0x2ed262(0x2ed))return!![];if(this[_0x2ed262(0x384)])return![];const _0x1daa26=this['allBattleMembers']()['filter'](_0x26f930=>_0x26f930&&_0x26f930[_0x2ed262(0x2aa)]());return _0x1daa26['some'](_0x41f3ca=>_0x41f3ca[_0x2ed262(0x3a5)]());},Game_Battler['prototype'][_0x1d4352(0x3a5)]=function(){const _0x154669=_0x1d4352;if(this[_0x154669(0x2c3)]())return!![];if(this['isTpbReady']())return!![];if(this[_0x154669(0x284)]())return!![];return![];},BattleManager['checkCtbAntiSoftlock']=function(){const _0x4caceb=_0x1d4352;let _0x214c48=VisuMZ[_0x4caceb(0x24e)]['Settings']['Mechanics'][_0x4caceb(0x243)]?0x1e:0xa;this[_0x4caceb(0x235)]()&&this[_0x4caceb(0x29a)]()?(this[_0x4caceb(0x2fa)]=this['_anti_CTB_SoftlockCount']||0x0,this[_0x4caceb(0x2fa)]++,this[_0x4caceb(0x2fa)]>=_0x214c48&&this[_0x4caceb(0x282)]()):this[_0x4caceb(0x2fa)]=0x0;},BattleManager[_0x1d4352(0x29a)]=function(){const _0x153473=_0x1d4352;if(this[_0x153473(0x200)])return![];if(this['_phase']!==_0x153473(0x2ed))return![];if(this[_0x153473(0x2ef)]())return![];return!![];},BattleManager[_0x1d4352(0x282)]=function(){const _0x509373=_0x1d4352;$gameTemp[_0x509373(0x360)]()&&this['_anti_CTB_SoftlockCount']>=0x14&&console[_0x509373(0x32c)]('Anti-CTB\x20Softlock\x20Count:',this['_anti_CTB_SoftlockCount']);this[_0x509373(0x200)]=null,this[_0x509373(0x2d8)]=_0x509373(0x2ed),this[_0x509373(0x261)]=![],this['_debutCTB']=!![];for(const _0x1c4abd of this[_0x509373(0x23d)]()){if(!_0x1c4abd)continue;if(_0x1c4abd[_0x509373(0x32f)]()){_0x1c4abd[_0x509373(0x35f)](_0x509373(0x299)),_0x1c4abd[_0x509373(0x310)]='charging';const _0x6f61d2=_0x1c4abd[_0x509373(0x259)],_0x3e3ea7=_0x1c4abd[_0x509373(0x309)]||0x0;_0x1c4abd[_0x509373(0x31f)](![]),_0x1c4abd[_0x509373(0x259)]=_0x6f61d2,_0x1c4abd[_0x509373(0x309)]=Math[_0x509373(0x37c)](_0x3e3ea7,0.99),_0x1c4abd[_0x509373(0x395)]();}}this[_0x509373(0x2fa)]===0xb4&&($gameParty[_0x509373(0x3ac)](),$gameParty[_0x509373(0x3ac)][_0x509373(0x2b8)]($gameTroop));if(this[_0x509373(0x2fa)]===0x12c)for(const _0x1a778e of this['allBattleMembers']()){if(!_0x1a778e)continue;if(_0x1a778e['isDead']())continue;_0x1a778e['clearStates']();}this[_0x509373(0x2fa)]>=0x258&&(BattleManager[_0x509373(0x27a)](),$gameTemp[_0x509373(0x360)]()&&console[_0x509373(0x32c)](_0x509373(0x23f)));},VisuMZ['BattleSystemCTB']['BattleManager_updateAllTpbBattlers']=BattleManager[_0x1d4352(0x2c5)],BattleManager[_0x1d4352(0x2c5)]=function(){const _0x2f2e40=_0x1d4352;this[_0x2f2e40(0x2e9)]()?this[_0x2f2e40(0x332)]():VisuMZ[_0x2f2e40(0x24e)][_0x2f2e40(0x20a)][_0x2f2e40(0x2b8)](this);},BattleManager[_0x1d4352(0x332)]=function(){const _0x156a0d=_0x1d4352;if(this[_0x156a0d(0x2a9)][_0x156a0d(0x24b)]>0x0)return;const _0x51fdb3=this[_0x156a0d(0x23d)]();_0x51fdb3['sort']((_0x3e6383,_0x2321ef)=>{const _0xbfbac6=_0x156a0d;return _0x3e6383['ctbTicksToGoal'](0x1)-_0x2321ef[_0xbfbac6(0x236)](0x1);});for(const _0x302e12 of _0x51fdb3){if(this[_0x156a0d(0x2a9)]['length']>0x0)return;this[_0x156a0d(0x2fc)](_0x302e12);}},VisuMZ['BattleSystemCTB'][_0x1d4352(0x2d5)]=BattleManager[_0x1d4352(0x2ca)],BattleManager[_0x1d4352(0x2ca)]=function(){const _0x214575=_0x1d4352;VisuMZ[_0x214575(0x24e)][_0x214575(0x2d5)]['call'](this),this[_0x214575(0x30a)](!![]);},VisuMZ['BattleSystemCTB']['BattleManager_endAction']=BattleManager['endAction'],BattleManager[_0x1d4352(0x3a9)]=function(){const _0x735e39=_0x1d4352;this[_0x735e39(0x212)](),VisuMZ[_0x735e39(0x24e)]['BattleManager_endAction'][_0x735e39(0x2b8)](this),this['postEndActionCTB']();},BattleManager[_0x1d4352(0x212)]=function(){const _0x23ec1e=_0x1d4352;if(!this[_0x23ec1e(0x2e9)]())return;this[_0x23ec1e(0x200)]&&this[_0x23ec1e(0x200)]['numActions']()<=0x0&&(this[_0x23ec1e(0x2a4)](),this[_0x23ec1e(0x200)][_0x23ec1e(0x35f)]('undecided')),BattleManager[_0x23ec1e(0x33b)]=0x0;},BattleManager['postEndActionCTB']=function(){const _0x4e6f77=_0x1d4352;if(!this[_0x4e6f77(0x2e9)]())return;if(this[_0x4e6f77(0x200)]&&$gameTemp['isCommonEventReserved']()){this[_0x4e6f77(0x200)][_0x4e6f77(0x310)]=_0x4e6f77(0x35c),this['_subject'][_0x4e6f77(0x2a3)]=_0x4e6f77(0x36b);return;}this[_0x4e6f77(0x30a)](),this[_0x4e6f77(0x200)]&&this[_0x4e6f77(0x2dc)]();},VisuMZ[_0x1d4352(0x24e)]['BattleManager_startActorInput']=BattleManager[_0x1d4352(0x24a)],BattleManager['startActorInput']=function(){const _0x5b487b=_0x1d4352;this[_0x5b487b(0x30a)](),VisuMZ[_0x5b487b(0x24e)]['BattleManager_startActorInput']['call'](this);},BattleManager[_0x1d4352(0x30a)]=function(_0x3420c1){const _0x105441=_0x1d4352;if(!this[_0x105441(0x2e9)]())return;const _0x28c893=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x28c893)return;_0x28c893[_0x105441(0x397)](_0x3420c1);},BattleManager[_0x1d4352(0x376)]=function(_0x1273d9){const _0x3afca3=_0x1d4352;if(!(VisuMZ['BattleSystemCTB'][_0x3afca3(0x2c6)][_0x3afca3(0x20f)][_0x3afca3(0x231)]??!![]))return;if(!this[_0x3afca3(0x2e9)]())return;const _0x1d9a2a=SceneManager['_scene'][_0x3afca3(0x371)];if(!_0x1d9a2a)return;_0x1d9a2a[_0x3afca3(0x25e)](_0x1273d9);},BattleManager[_0x1d4352(0x2a4)]=function(){const _0x181888=_0x1d4352;if(!this[_0x181888(0x2e9)]())return;const _0x18b302=SceneManager[_0x181888(0x27d)][_0x181888(0x371)];if(!_0x18b302)return;_0x18b302[_0x181888(0x28b)](this[_0x181888(0x200)]);},BattleManager[_0x1d4352(0x3a4)]=function(){const _0x3772a7=_0x1d4352,_0x249b26=this[_0x3772a7(0x23d)]()['map'](_0x3316a6=>String([_0x3316a6[_0x3772a7(0x239)](),_0x3772a7(0x327)+_0x3316a6['ctbTicksToGoal'](0x1)]));console[_0x3772a7(0x32c)](_0x249b26);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x27b)]=BattleManager[_0x1d4352(0x395)],BattleManager[_0x1d4352(0x395)]=function(){const _0x4cec6d=_0x1d4352;this[_0x4cec6d(0x2e9)]()?this[_0x4cec6d(0x3a3)]():VisuMZ['BattleSystemCTB'][_0x4cec6d(0x27b)][_0x4cec6d(0x2b8)](this);},BattleManager[_0x1d4352(0x3a3)]=function(){const _0x565f12=_0x1d4352,_0x32ae4e=this[_0x565f12(0x23d)]();_0x32ae4e[_0x565f12(0x377)]((_0x3ad206,_0x4ebcb5)=>{const _0x2b3e0b=_0x565f12;return _0x3ad206[_0x2b3e0b(0x236)](0x1)-_0x4ebcb5[_0x2b3e0b(0x236)](0x1);});for(const _0x17f4b8 of _0x32ae4e){_0x17f4b8[_0x565f12(0x395)]();}this[_0x565f12(0x2c5)](),this[_0x565f12(0x2d0)]();},VisuMZ['BattleSystemCTB'][_0x1d4352(0x328)]=BattleManager[_0x1d4352(0x355)],BattleManager['updateTpbInput']=function(){const _0x26ec81=_0x1d4352;if(this[_0x26ec81(0x2e9)]()){const _0x21b9d8=this['allBattleMembers']()[_0x26ec81(0x348)](_0x37cfd9=>_0x37cfd9['isTpbCharged']());_0x21b9d8[_0x26ec81(0x377)]((_0x2d684a,_0x5ebe45)=>{const _0x34740b=_0x26ec81;return _0x2d684a['ctbTicksToGoal'](0x1)-_0x5ebe45[_0x34740b(0x236)](0x1);});if(_0x21b9d8[_0x26ec81(0x24b)]>0x0&&!_0x21b9d8[0x0]['isActor']())return;}VisuMZ[_0x26ec81(0x24e)][_0x26ec81(0x328)][_0x26ec81(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x285)]=Game_System[_0x1d4352(0x369)][_0x1d4352(0x3ad)],Game_System['prototype'][_0x1d4352(0x3ad)]=function(){const _0x2d09e3=_0x1d4352;VisuMZ[_0x2d09e3(0x24e)][_0x2d09e3(0x285)][_0x2d09e3(0x2b8)](this),this[_0x2d09e3(0x27f)]();},Game_System[_0x1d4352(0x369)][_0x1d4352(0x27f)]=function(){const _0xe5c8a2=_0x1d4352;this[_0xe5c8a2(0x35a)]=!![];},Game_System[_0x1d4352(0x369)][_0x1d4352(0x228)]=function(){const _0x60b28d=_0x1d4352;return this[_0x60b28d(0x35a)]===undefined&&this[_0x60b28d(0x27f)](),this['_ctbTurnOrderVisible'];},Game_System['prototype']['setBattleSystemCTBTurnOrderVisible']=function(_0x433fd5){const _0xe64cf3=_0x1d4352;this[_0xe64cf3(0x35a)]===undefined&&this[_0xe64cf3(0x27f)](),this['_ctbTurnOrderVisible']=_0x433fd5;},VisuMZ['BattleSystemCTB'][_0x1d4352(0x30e)]=Game_Action[_0x1d4352(0x369)][_0x1d4352(0x246)],Game_Action[_0x1d4352(0x369)][_0x1d4352(0x246)]=function(_0x42e7ef){const _0x3c2dec=_0x1d4352;VisuMZ[_0x3c2dec(0x24e)][_0x3c2dec(0x30e)][_0x3c2dec(0x2b8)](this,_0x42e7ef),this[_0x3c2dec(0x390)](_0x42e7ef);},Game_Action['prototype'][_0x1d4352(0x390)]=function(_0x448d02){const _0x448566=_0x1d4352;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x448566(0x2e9)]())return;if(this[_0x448566(0x2ad)]())this[_0x448566(0x297)](_0x448d02);},Game_Action['prototype'][_0x1d4352(0x297)]=function(_0x36418a){const _0x5b0d2e=_0x1d4352,_0x217400=this[_0x5b0d2e(0x2ad)]()[_0x5b0d2e(0x340)];if(_0x36418a[_0x5b0d2e(0x329)]()){const _0x330843=VisuMZ['BattleSystemCTB'][_0x5b0d2e(0x301)](this['item'](),_0x5b0d2e(0x334));if(VisuMZ[_0x5b0d2e(0x24e)]['JS'][_0x330843]){const _0x3446d7=VisuMZ[_0x5b0d2e(0x24e)]['JS'][_0x330843][_0x5b0d2e(0x2b8)](this,this[_0x5b0d2e(0x2e1)](),_0x36418a);_0x36418a[_0x5b0d2e(0x387)](_0x3446d7);}_0x217400['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x36418a[_0x5b0d2e(0x387)](Number(RegExp['$1'])*0.01),_0x217400[_0x5b0d2e(0x206)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x36418a[_0x5b0d2e(0x280)](Number(RegExp['$1'])*0.01);}else{if(_0x36418a[_0x5b0d2e(0x32b)]()){const _0xf0d3bd=VisuMZ[_0x5b0d2e(0x24e)][_0x5b0d2e(0x301)](this['item'](),_0x5b0d2e(0x2b6));if(VisuMZ[_0x5b0d2e(0x24e)]['JS'][_0xf0d3bd]){const _0x3a30af=VisuMZ['BattleSystemCTB']['JS'][_0xf0d3bd][_0x5b0d2e(0x2b8)](this,this[_0x5b0d2e(0x2e1)](),_0x36418a);_0x36418a[_0x5b0d2e(0x366)](_0x3a30af);}_0x217400[_0x5b0d2e(0x206)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x36418a[_0x5b0d2e(0x366)](Number(RegExp['$1'])*0.01),_0x217400[_0x5b0d2e(0x206)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x36418a[_0x5b0d2e(0x23e)](Number(RegExp['$1'])*0.01);}}const _0x3a18b3=VisuMZ[_0x5b0d2e(0x24e)][_0x5b0d2e(0x301)](this[_0x5b0d2e(0x2ad)](),_0x5b0d2e(0x29c));if(VisuMZ[_0x5b0d2e(0x24e)]['JS'][_0x3a18b3]){const _0x126d30=VisuMZ['BattleSystemCTB']['JS'][_0x3a18b3][_0x5b0d2e(0x2b8)](this,this[_0x5b0d2e(0x2e1)](),_0x36418a);_0x36418a[_0x5b0d2e(0x221)](_0x126d30);}_0x217400[_0x5b0d2e(0x206)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x36418a[_0x5b0d2e(0x221)](Number(RegExp['$1'])),_0x217400[_0x5b0d2e(0x206)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x36418a[_0x5b0d2e(0x2f5)](Number(RegExp['$1']));},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x25b)]=Game_Action[_0x1d4352(0x369)][_0x1d4352(0x281)],Game_Action[_0x1d4352(0x369)][_0x1d4352(0x281)]=function(){const _0x600cd3=_0x1d4352;VisuMZ[_0x600cd3(0x24e)][_0x600cd3(0x25b)]['call'](this),this['applyGlobalBattleSystemCTBEffects']();},Game_Action['prototype'][_0x1d4352(0x2b4)]=function(){const _0x50e5fc=_0x1d4352;if(!this[_0x50e5fc(0x2ad)]())return;if(!BattleManager[_0x50e5fc(0x2e9)]())return;const _0x5e83c1=this['item']()['note'];let _0x300125=0x0;this['_forcing']&&(_0x300125=this[_0x50e5fc(0x2e1)]()['_tpbChargeTime']);const _0x2b3f5a=VisuMZ[_0x50e5fc(0x24e)][_0x50e5fc(0x301)](this[_0x50e5fc(0x2ad)](),_0x50e5fc(0x279));VisuMZ[_0x50e5fc(0x24e)]['JS'][_0x2b3f5a]&&(_0x300125=VisuMZ[_0x50e5fc(0x24e)]['JS'][_0x2b3f5a]['call'](this,this[_0x50e5fc(0x2e1)](),this[_0x50e5fc(0x2e1)]()));let _0x56c989=this[_0x50e5fc(0x2ad)]()['speed']>0x0?this[_0x50e5fc(0x2ad)]()[_0x50e5fc(0x2e5)]:0x0;if(this[_0x50e5fc(0x265)]())_0x56c989+=this[_0x50e5fc(0x2e1)]()[_0x50e5fc(0x20d)]();_0x300125+=(_0x56c989/0xfa0)['clamp'](0x0,0x1);_0x5e83c1[_0x50e5fc(0x206)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x300125=Number(RegExp['$1'])*0.01);const _0x4d27ca=this[_0x50e5fc(0x2e1)]()[_0x50e5fc(0x271)]()[_0x50e5fc(0x25d)](this['subject']()[_0x50e5fc(0x26b)]()),_0x5f1559=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0xc4ddd8=_0x4d27ca[_0x50e5fc(0x2fd)](_0x29cc5b=>_0x29cc5b&&_0x29cc5b[_0x50e5fc(0x340)][_0x50e5fc(0x206)](_0x5f1559)?Number(RegExp['$1'])*0.01:0x0);_0x300125=_0xc4ddd8['reduce']((_0x3e6723,_0x3500d3)=>_0x3e6723+_0x3500d3,_0x300125),this['subject']()[_0x50e5fc(0x217)](_0x300125);},Game_BattlerBase[_0x1d4352(0x369)]['setCtbChargeTime']=function(_0xcb36a1){const _0x3e077c=_0x1d4352;this[_0x3e077c(0x309)]=_0xcb36a1;},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x280)]=function(_0x91b3fa){const _0x363fb6=_0x1d4352;this['setCtbChargeTime'](this[_0x363fb6(0x309)]+_0x91b3fa);},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x366)]=function(_0x23707f){const _0x59f866=_0x1d4352,_0x1fb5bb=this[_0x59f866(0x1f3)]();this[_0x59f866(0x20e)]=_0x1fb5bb*_0x23707f;},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x23e)]=function(_0x41a54c){const _0x20122b=_0x1d4352,_0x2eaeff=this[_0x20122b(0x1f3)](),_0x50fa35=_0x2eaeff*_0x41a54c;this[_0x20122b(0x20e)]=this['_tpbCastTime']+_0x50fa35;},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x306)]=Game_BattlerBase['prototype']['appear'],Game_BattlerBase[_0x1d4352(0x369)]['appear']=function(){const _0x11c5d3=_0x1d4352;VisuMZ[_0x11c5d3(0x24e)][_0x11c5d3(0x306)][_0x11c5d3(0x2b8)](this),BattleManager['updateTurnOrderCTB']();},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x21e)]=Game_BattlerBase['prototype']['hide'],Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x255)]=function(){const _0x5ef334=_0x1d4352;VisuMZ[_0x5ef334(0x24e)]['Game_BattlerBase_hide'][_0x5ef334(0x2b8)](this),BattleManager[_0x5ef334(0x30a)]();},Game_BattlerBase[_0x1d4352(0x369)]['clearTurnOrderCTBGraphics']=function(){const _0x480bd6=_0x1d4352;delete this[_0x480bd6(0x359)],delete this[_0x480bd6(0x268)],delete this[_0x480bd6(0x2b9)],delete this[_0x480bd6(0x28d)];},Game_BattlerBase['prototype'][_0x1d4352(0x222)]=function(){const _0x1c89bb=_0x1d4352;return this['_ctbTurnOrderGraphicType']===undefined&&(this['_ctbTurnOrderGraphicType']=this[_0x1c89bb(0x316)]()),this['_ctbTurnOrderGraphicType'];},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x316)]=function(){const _0x2bc21e=_0x1d4352;return Window_CTB_TurnOrder[_0x2bc21e(0x2c6)][_0x2bc21e(0x22a)];},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x28e)]=function(){const _0x2f3b33=_0x1d4352;return this['_ctbTurnOrderFaceName']===undefined&&(this[_0x2f3b33(0x268)]=this['createTurnOrderCTBGraphicFaceName']()),this[_0x2f3b33(0x268)];},Game_BattlerBase['prototype']['createTurnOrderCTBGraphicFaceName']=function(){const _0x3d7375=_0x1d4352;return Window_CTB_TurnOrder[_0x3d7375(0x2c6)][_0x3d7375(0x218)];},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x2f4)]=function(){const _0x1d35ec=_0x1d4352;return this['_ctbTurnOrderFaceIndex']===undefined&&(this[_0x1d35ec(0x2b9)]=this[_0x1d35ec(0x23b)]()),this[_0x1d35ec(0x2b9)];},Game_BattlerBase['prototype'][_0x1d4352(0x23b)]=function(){const _0x5bccb3=_0x1d4352;return Window_CTB_TurnOrder[_0x5bccb3(0x2c6)][_0x5bccb3(0x39d)];},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x2ea)]=function(){const _0x2d18bd=_0x1d4352;return this[_0x2d18bd(0x28d)]===undefined&&(this[_0x2d18bd(0x28d)]=this[_0x2d18bd(0x34c)]()),this['_ctbTurnOrderIconIndex'];},Game_BattlerBase['prototype'][_0x1d4352(0x34c)]=function(){const _0x591a64=_0x1d4352;return Window_CTB_TurnOrder['Settings'][_0x591a64(0x307)];},Game_BattlerBase['prototype']['setCTBGraphicIconIndex']=function(_0x3f1ec3){const _0x5e373c=_0x1d4352;this[_0x5e373c(0x28d)]=_0x3f1ec3;},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x236)]=function(_0x573f0c,_0x1b24b8){const _0x3f5a24=_0x1d4352;if(this['isDead']())return Number[_0x3f5a24(0x2d7)];if(!this[_0x3f5a24(0x2aa)]())return Number[_0x3f5a24(0x2d7)];const _0x5af650=VisuMZ[_0x3f5a24(0x24e)][_0x3f5a24(0x2c6)][_0x3f5a24(0x20f)][_0x3f5a24(0x274)]??!![],_0x2cc13a=0x1;_0x573f0c*=_0x2cc13a;if(_0x573f0c===_0x2cc13a&&!_0x1b24b8){if(this===BattleManager['_subject'])return Number[_0x3f5a24(0x3a8)]/0xa;if(this===BattleManager[_0x3f5a24(0x240)]())return Number[_0x3f5a24(0x3a8)]/0xa;if(BattleManager[_0x3f5a24(0x2a9)]&&BattleManager[_0x3f5a24(0x2a9)][_0x3f5a24(0x2b3)](this)){let _0x50b838=Number['MIN_SAFE_INTEGER']/0x1388;return _0x50b838+=BattleManager[_0x3f5a24(0x2a9)]['indexOf'](this)*0x5,_0x50b838;}if(this['_tpbState']==='casting'&&this[_0x3f5a24(0x3aa)]()&&this['currentAction']()['item']()&&this[_0x3f5a24(0x3aa)]()[_0x3f5a24(0x2ad)]()[_0x3f5a24(0x2e5)]<0x0){if(_0x5af650)return(this['tpbRequiredCastTime']()*_0x2cc13a-this[_0x3f5a24(0x20e)])/this['tpbAcceleration']();}}_0x573f0c-=this[_0x3f5a24(0x229)]()*_0x2cc13a;if(this['_tpbState']===_0x3f5a24(0x210)&&this[_0x3f5a24(0x3aa)]()&&this[_0x3f5a24(0x3aa)]()['item']()&&this[_0x3f5a24(0x3aa)]()[_0x3f5a24(0x2ad)]()[_0x3f5a24(0x2e5)]<0x0){if(_0x5af650)_0x573f0c+=this[_0x3f5a24(0x1f3)]()*_0x2cc13a-this[_0x3f5a24(0x20e)];}return _0x573f0c/=this['tpbAcceleration']()*_0x2cc13a,_0x573f0c||0x0;},Game_BattlerBase['prototype'][_0x1d4352(0x382)]=function(){const _0x3b280b=_0x1d4352;return this[_0x3b280b(0x310)]===_0x3b280b(0x210)?(this[_0x3b280b(0x1f3)]()-this['_tpbCastTime'])/this[_0x3b280b(0x2b2)]():0x0;},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x1fb)]=Game_Battler['prototype'][_0x1d4352(0x26f)],Game_Battler['prototype'][_0x1d4352(0x26f)]=function(_0x1eb33f){const _0x10cf9f=_0x1d4352;BattleManager[_0x10cf9f(0x2e9)]()?(this[_0x10cf9f(0x248)](_0x1eb33f),isNaN(this[_0x10cf9f(0x309)])&&(this[_0x10cf9f(0x248)](_0x1eb33f),isNaN(this['_tpbChargeTime'])&&(this[_0x10cf9f(0x309)]=0x0))):VisuMZ['BattleSystemCTB'][_0x10cf9f(0x1fb)][_0x10cf9f(0x2b8)](this,_0x1eb33f);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x248)]=function(_0x4acb71){const _0x199b7c=_0x1d4352,_0x17c43f=VisuMZ[_0x199b7c(0x24e)]['Settings'][_0x199b7c(0x2f3)];let _0x345224=this[_0x199b7c(0x2e4)]()*eval(_0x17c43f['InitialGaugeJS']);const _0x36f04b=this[_0x199b7c(0x271)]()[_0x199b7c(0x25d)](this['skills']()),_0x5a9d35=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x369ef6=_0x36f04b['map'](_0xfca666=>_0xfca666&&_0xfca666[_0x199b7c(0x340)][_0x199b7c(0x206)](_0x5a9d35)?Number(RegExp['$1'])*0.01:0x0);_0x345224=_0x369ef6['reduce']((_0x23ace2,_0x547efb)=>_0x23ace2+_0x547efb,_0x345224),this[_0x199b7c(0x310)]=_0x199b7c(0x389),this[_0x199b7c(0x309)]=(_0x4acb71?0x1:_0x345224)['clamp'](0x0,0x1),this[_0x199b7c(0x296)]()&&(this[_0x199b7c(0x309)]=0x0);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x329)]=function(){const _0x483af2=_0x1d4352;return this[_0x483af2(0x310)]===_0x483af2(0x389);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x32b)]=function(){const _0xb855ad=_0x1d4352;return this[_0xb855ad(0x310)]===_0xb855ad(0x210)&&this['currentAction']()&&this['currentAction']()[_0xb855ad(0x2ad)]()&&this[_0xb855ad(0x3aa)]()[_0xb855ad(0x2ad)]()[_0xb855ad(0x2e5)]<0x0;},Game_BattlerBase[_0x1d4352(0x369)][_0x1d4352(0x287)]=function(){const _0x348b89=_0x1d4352;return this[_0x348b89(0x32b)]()?this[_0x348b89(0x20e)]/this[_0x348b89(0x1f3)]():0x0;},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x269)]=function(){const _0xebb55=_0x1d4352;return!this[_0xebb55(0x20b)]();},Game_Battler['prototype']['setCtbAfterSpeed']=function(_0x245140){const _0x4f845f=_0x1d4352;this[_0x4f845f(0x314)]=_0x245140,_0x245140>=0x1&&(BattleManager[_0x4f845f(0x2a9)]=[]);},VisuMZ[_0x1d4352(0x24e)]['Game_Battler_updateTpbIdleTime']=Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x374)],Game_Battler['prototype'][_0x1d4352(0x374)]=function(){const _0x508b36=_0x1d4352;BattleManager[_0x508b36(0x2e9)]()?this[_0x508b36(0x34d)]():VisuMZ[_0x508b36(0x24e)]['Game_Battler_updateTpbIdleTime'][_0x508b36(0x2b8)](this);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x34d)]=function(){const _0x4825b8=_0x1d4352;!this['canMove']()&&(this[_0x4825b8(0x318)]+=this[_0x4825b8(0x2b2)]());},VisuMZ['BattleSystemCTB'][_0x1d4352(0x2c0)]=Game_Battler[_0x1d4352(0x369)]['isTpbReady'],Game_Battler[_0x1d4352(0x369)]['isTpbReady']=function(){const _0x4a64ec=_0x1d4352;if(!VisuMZ['BattleSystemCTB'][_0x4a64ec(0x2c0)][_0x4a64ec(0x2b8)](this))return![];if(BattleManager['isCTB']()){if(BattleManager[_0x4a64ec(0x2a9)][_0x4a64ec(0x2b3)](this))return!![];return BattleManager[_0x4a64ec(0x2a9)][_0x4a64ec(0x24b)]<=0x0;}else return!![];},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x2fe)]=Game_Battler[_0x1d4352(0x369)]['onRestrict'],Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x23c)]=function(){const _0x1cb8bf=_0x1d4352;this[_0x1cb8bf(0x39e)]=BattleManager[_0x1cb8bf(0x2e9)](),VisuMZ['BattleSystemCTB'][_0x1cb8bf(0x2fe)][_0x1cb8bf(0x2b8)](this),this['_onRestrictBypassCtbReset']=undefined;},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x219)]=Game_Battler[_0x1d4352(0x369)]['clearTpbChargeTime'],Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x220)]=function(){const _0x1e0530=_0x1d4352;BattleManager[_0x1e0530(0x2e9)]()?this['clearTpbChargeTimeCTB']():VisuMZ[_0x1e0530(0x24e)]['Game_Battler_clearTpbChargeTime'][_0x1e0530(0x2b8)](this);},Game_Battler[_0x1d4352(0x369)]['clearTpbChargeTimeCTB']=function(){const _0x89b5e3=_0x1d4352;if(this['_onRestrictBypassCtbReset'])return;this[_0x89b5e3(0x310)]=_0x89b5e3(0x389),this[_0x89b5e3(0x309)]-=0x1,this[_0x89b5e3(0x309)]+=this[_0x89b5e3(0x314)]||0x0;},VisuMZ[_0x1d4352(0x24e)]['Game_Battler_applyTpbPenalty']=Game_Battler['prototype']['applyTpbPenalty'],Game_Battler[_0x1d4352(0x369)]['applyTpbPenalty']=function(){const _0x55d109=_0x1d4352;BattleManager[_0x55d109(0x2e9)]()?this[_0x55d109(0x364)]():VisuMZ[_0x55d109(0x24e)][_0x55d109(0x368)][_0x55d109(0x2b8)](this);},Game_Battler[_0x1d4352(0x369)]['applyCTBPenalty']=function(){const _0x2fa1c9=_0x1d4352;this[_0x2fa1c9(0x310)]='charging',this[_0x2fa1c9(0x309)]+=VisuMZ[_0x2fa1c9(0x24e)][_0x2fa1c9(0x2c6)][_0x2fa1c9(0x2f3)][_0x2fa1c9(0x336)]||0x0;},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x361)]=Game_Battler['prototype'][_0x1d4352(0x273)],Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x273)]=function(){const _0x37922c=_0x1d4352;return BattleManager[_0x37922c(0x2e9)]()?VisuMZ['BattleSystemCTB'][_0x37922c(0x2c6)]['Mechanics']['TpbSpeedCalcJS'][_0x37922c(0x2b8)](this,this):VisuMZ['BattleSystemCTB']['Game_Battler_tpbSpeed'][_0x37922c(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x398)]=Game_Battler[_0x1d4352(0x369)]['tpbBaseSpeed'],Game_Battler[_0x1d4352(0x369)]['tpbBaseSpeed']=function(){const _0x4989cc=_0x1d4352;return BattleManager[_0x4989cc(0x2e9)]()?VisuMZ[_0x4989cc(0x24e)]['Settings'][_0x4989cc(0x2f3)][_0x4989cc(0x365)]['call'](this,this):VisuMZ['BattleSystemCTB'][_0x4989cc(0x398)][_0x4989cc(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x252)]=Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x2e4)],Game_Battler['prototype'][_0x1d4352(0x2e4)]=function(){const _0x1e55a0=_0x1d4352;return BattleManager['isCTB']()?VisuMZ[_0x1e55a0(0x24e)]['Settings']['Mechanics'][_0x1e55a0(0x298)][_0x1e55a0(0x2b8)](this,this):VisuMZ[_0x1e55a0(0x24e)]['Game_Battler_tpbRelativeSpeed'][_0x1e55a0(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x2d2)]=Game_Battler['prototype'][_0x1d4352(0x2b2)],Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x2b2)]=function(){const _0x105849=_0x1d4352;if(BattleManager[_0x105849(0x2e9)]()){let _0x8406e2=VisuMZ[_0x105849(0x24e)]['Settings'][_0x105849(0x2f3)][_0x105849(0x238)][_0x105849(0x2b8)](this,this);const _0x53268d=0x0;return _0x8406e2+_0x53268d;}else return VisuMZ[_0x105849(0x24e)][_0x105849(0x2d2)][_0x105849(0x2b8)](this);},VisuMZ[_0x1d4352(0x24e)]['Game_Battler_tpbRequiredCastTime']=Game_Battler['prototype'][_0x1d4352(0x1f3)],Game_Battler[_0x1d4352(0x369)]['tpbRequiredCastTime']=function(){const _0x4c93a7=_0x1d4352;return BattleManager[_0x4c93a7(0x2e9)]()?VisuMZ['BattleSystemCTB'][_0x4c93a7(0x2c6)][_0x4c93a7(0x2f3)][_0x4c93a7(0x34e)]['call'](this,this):VisuMZ[_0x4c93a7(0x24e)][_0x4c93a7(0x30c)][_0x4c93a7(0x2b8)](this);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x386)]=function(){const _0x11b721=_0x1d4352,_0x30706f=SceneManager[_0x11b721(0x27d)][_0x11b721(0x371)];if(!_0x30706f)return-0x1;const _0x1b72d9=_0x30706f[_0x11b721(0x322)];if(!_0x1b72d9)return-0x1;const _0x201ec9=_0x1b72d9[_0x11b721(0x2ae)](_0x401c51=>_0x401c51[_0x11b721(0x204)]()===this);return _0x1b72d9['indexOf'](_0x201ec9);},Game_Battler[_0x1d4352(0x369)]['changeTurnOrderByCTB']=function(_0x54cdfa){const _0x5e7d51=_0x1d4352;if(!BattleManager[_0x5e7d51(0x2e9)]())return;if(!SceneManager[_0x5e7d51(0x2e2)]())return;if(this===BattleManager[_0x5e7d51(0x240)]())return;if(this===BattleManager[_0x5e7d51(0x200)])return;const _0x4a03c5=this[_0x5e7d51(0x386)]();if(_0x4a03c5<0x0)return;this['setTurnOrderCTB'](_0x4a03c5+_0x54cdfa);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x221)]=function(_0x275497){const _0xcb9167=_0x1d4352;if(!BattleManager[_0xcb9167(0x2e9)]())return;if(!SceneManager[_0xcb9167(0x2e2)]())return;if(this===BattleManager[_0xcb9167(0x240)]())return;if(this===BattleManager[_0xcb9167(0x200)])return;_0x275497=Math[_0xcb9167(0x242)](_0x275497,0x1),this['processTurnOrderChangeCTB'](_0x275497);},Game_Battler['prototype']['processTurnOrderChangeCTB']=function(_0x5aa76c){const _0x1a793d=_0x1d4352;if(!BattleManager[_0x1a793d(0x2e9)]())return;if(!SceneManager[_0x1a793d(0x2e2)]())return;if(this===BattleManager[_0x1a793d(0x240)]())return;if(this===BattleManager['_subject'])return;const _0x1248b2=SceneManager['_scene'][_0x1a793d(0x371)];if(!_0x1248b2)return;const _0x380b81=_0x1248b2['_turnOrderContainer'];if(!_0x380b81)return;const _0x11d686=this[_0x1a793d(0x386)]();_0x11d686!==_0x5aa76c&&this['onCtbOrderChange'](_0x5aa76c-_0x11d686);let _0x59c096=_0x5aa76c,_0x1767f6=_0x5aa76c;_0x11d686>_0x5aa76c?_0x59c096-=0x1:_0x1767f6+=0x1;const _0x255999=_0x380b81[_0x59c096][_0x1a793d(0x2af)](!![]),_0x515746=_0x380b81[_0x1767f6][_0x1a793d(0x2af)](!![]),_0x4068f3=(_0x255999+_0x515746)/0x2;let _0x3e2c35=_0x4068f3*this[_0x1a793d(0x2b2)]();if(this['_tpbState']===_0x1a793d(0x389))this[_0x1a793d(0x309)]=0x1-_0x3e2c35;else this[_0x1a793d(0x310)]==='casting'&&(this[_0x1a793d(0x20e)]=this['tpbRequiredCastTime']()-_0x3e2c35);BattleManager[_0x1a793d(0x2a9)]=[],BattleManager[_0x1a793d(0x30a)]();},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x33d)]=function(_0xdaeabb){const _0x25b07a=_0x1d4352,_0x12c312=VisuMZ[_0x25b07a(0x24e)]['Settings']['Effect'],_0x3ce5c1=_0xdaeabb>0x0?_0x25b07a(0x25a):_0x25b07a(0x317);if(_0x12c312[_0x25b07a(0x31a)[_0x25b07a(0x2f8)](_0x3ce5c1)]){const _0x28de9b=_0x12c312[_0x25b07a(0x31a)[_0x25b07a(0x2f8)](_0x3ce5c1)],_0x1fb8ae=_0x12c312[_0x25b07a(0x2cf)[_0x25b07a(0x2f8)](_0x3ce5c1)],_0x4dc836=_0x12c312[_0x25b07a(0x37a)[_0x25b07a(0x2f8)](_0x3ce5c1)];$gameTemp['requestFauxAnimation']([this],_0x28de9b,_0x1fb8ae,_0x4dc836);}if(this[_0x25b07a(0x204)]()&&_0x12c312['%1PopupText'[_0x25b07a(0x2f8)](_0x3ce5c1)][_0x25b07a(0x24b)]>0x0){const _0x1df357=_0x12c312[_0x25b07a(0x347)[_0x25b07a(0x2f8)](_0x3ce5c1)],_0x34a3d2={'textColor':ColorManager['getColor'](_0x12c312['%1TextColor'[_0x25b07a(0x2f8)](_0x3ce5c1)]),'flashColor':_0x12c312[_0x25b07a(0x2e7)[_0x25b07a(0x2f8)](_0x3ce5c1)],'flashDuration':_0x12c312[_0x25b07a(0x26c)[_0x25b07a(0x2f8)](_0x3ce5c1)]};this['setupTextPopup'](_0x1df357,_0x34a3d2);}},VisuMZ[_0x1d4352(0x24e)]['Game_Battler_updateTpb']=Game_Battler['prototype']['updateTpb'],Game_Battler[_0x1d4352(0x369)]['updateTpb']=function(){const _0x1f47ee=_0x1d4352;if(BattleManager['ctbHasInstantActionAfter'](this)){BattleManager[_0x1f47ee(0x33b)]=BattleManager[_0x1f47ee(0x33b)]||0x0,BattleManager[_0x1f47ee(0x33b)]++;if(BattleManager['_antiCtbSoftlockInstantActionAfter']<0x3c)return;}VisuMZ['BattleSystemCTB'][_0x1f47ee(0x363)]['call'](this);},BattleManager['ctbHasInstantActionAfter']=function(_0x326700){const _0x9dca6a=_0x1d4352;return BattleManager[_0x9dca6a(0x23d)]()[_0x9dca6a(0x348)](_0x4fb881=>_0x4fb881!==_0x326700)[_0x9dca6a(0x315)](_0x5285f9=>_0x5285f9[_0x9dca6a(0x32f)]()&&_0x5285f9[_0x9dca6a(0x20b)]()&&_0x5285f9['_ctbAfterSpeed']>=0x1);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x2f2)]=Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x30f)],Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x30f)]=function(){const _0x53ba23=_0x1d4352;BattleManager[_0x53ba23(0x2e9)]()?this['updateTpbChargeTimeCTB']():VisuMZ[_0x53ba23(0x24e)][_0x53ba23(0x2f2)]['call'](this);},Game_Battler['prototype'][_0x1d4352(0x293)]=function(){const _0x108c05=_0x1d4352;this[_0x108c05(0x310)]===_0x108c05(0x389)&&(this[_0x108c05(0x309)]+=this[_0x108c05(0x2b2)](),isNaN(this['_tpbChargeTime'])&&(this['_tpbChargeTime']=this[_0x108c05(0x2b2)](),isNaN(this[_0x108c05(0x309)])&&(this[_0x108c05(0x309)]=0x0)),this[_0x108c05(0x309)]>=0x1&&this[_0x108c05(0x33c)]());},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x2c1)]=Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x391)],Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x391)]=function(){const _0x10159f=_0x1d4352;BattleManager[_0x10159f(0x2e9)]()?this['updateTpbCastTimeCTB']():VisuMZ['BattleSystemCTB'][_0x10159f(0x2c1)][_0x10159f(0x2b8)](this);},Game_Battler[_0x1d4352(0x369)][_0x1d4352(0x225)]=function(){const _0x5250ce=_0x1d4352;this[_0x5250ce(0x310)]===_0x5250ce(0x210)&&(this[_0x5250ce(0x20e)]+=this['tpbAcceleration'](),this[_0x5250ce(0x20e)]>=this[_0x5250ce(0x1f3)]()&&(this['_tpbState']=_0x5250ce(0x35c)));},Game_Actor[_0x1d4352(0x369)][_0x1d4352(0x316)]=function(){const _0x1dd9f7=_0x1d4352,_0x5ef9c0=this[_0x1dd9f7(0x240)]()['note'];if(_0x5ef9c0['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x1dd9f7(0x26e);else{if(_0x5ef9c0[_0x1dd9f7(0x206)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1dd9f7(0x1fc);}return Window_CTB_TurnOrder[_0x1dd9f7(0x2c6)][_0x1dd9f7(0x245)];},Game_Actor[_0x1d4352(0x369)]['createTurnOrderCTBGraphicFaceName']=function(){const _0x5375a7=_0x1d4352,_0x455c63=this['actor']()['note'];if(_0x455c63[_0x5375a7(0x206)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x5375a7(0x2d1)]();},Game_Actor[_0x1d4352(0x369)][_0x1d4352(0x23b)]=function(){const _0xeee711=_0x1d4352,_0x5cd73c=this[_0xeee711(0x240)]()['note'];if(_0x5cd73c[_0xeee711(0x206)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0xeee711(0x264)]();},Game_Actor['prototype']['createTurnOrderCTBGraphicIconIndex']=function(){const _0x5952d0=_0x1d4352,_0x4a503a=this[_0x5952d0(0x240)]()[_0x5952d0(0x340)];if(_0x4a503a[_0x5952d0(0x206)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x5952d0(0x2c6)][_0x5952d0(0x313)];},Game_Enemy['prototype']['createTurnOrderCTBGraphicType']=function(){const _0x4d46fb=_0x1d4352,_0x3f68b7=this[_0x4d46fb(0x226)]()[_0x4d46fb(0x340)];if(_0x3f68b7[_0x4d46fb(0x206)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x4d46fb(0x26e);else{if(_0x3f68b7[_0x4d46fb(0x206)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x4d46fb(0x1fc);}return Window_CTB_TurnOrder[_0x4d46fb(0x2c6)][_0x4d46fb(0x22a)];},Game_Enemy['prototype'][_0x1d4352(0x2d6)]=function(){const _0x4d4a5d=_0x1d4352,_0x334cc7=this['enemy']()[_0x4d4a5d(0x340)];if(_0x334cc7[_0x4d4a5d(0x206)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x4d4a5d(0x2c6)][_0x4d4a5d(0x218)];},Game_Enemy[_0x1d4352(0x369)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x1ef32f=_0x1d4352,_0x239301=this[_0x1ef32f(0x226)]()[_0x1ef32f(0x340)];if(_0x239301[_0x1ef32f(0x206)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder['Settings'][_0x1ef32f(0x39d)];},Game_Enemy[_0x1d4352(0x369)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x3bcc36=_0x1d4352,_0x447d53=this['enemy']()['note'];if(_0x447d53[_0x3bcc36(0x206)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x3bcc36(0x307)];},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x35e)]=Scene_Battle[_0x1d4352(0x369)][_0x1d4352(0x385)],Scene_Battle['prototype'][_0x1d4352(0x385)]=function(){const _0x126bd0=_0x1d4352;VisuMZ[_0x126bd0(0x24e)]['Scene_Battle_createAllWindows'][_0x126bd0(0x2b8)](this),this['createCTBTurnOrderWindow']();},Scene_Battle[_0x1d4352(0x369)][_0x1d4352(0x202)]=function(){const _0x12cb6d=_0x1d4352;if(!BattleManager[_0x12cb6d(0x2e9)]())return;this[_0x12cb6d(0x371)]=new Window_CTB_TurnOrder();const _0x5b6bf3=this[_0x12cb6d(0x32e)](this['_windowLayer']);this[_0x12cb6d(0x223)](this[_0x12cb6d(0x371)],_0x5b6bf3),this['repositionLogWindowCTB'](),BattleManager[_0x12cb6d(0x30a)](!![]);},Scene_Battle[_0x1d4352(0x369)][_0x1d4352(0x2ac)]=function(){const _0x3e505f=_0x1d4352,_0x552c52=Window_CTB_TurnOrder[_0x3e505f(0x2c6)];if(_0x552c52[_0x3e505f(0x350)]!==_0x3e505f(0x38a))return;if(!_0x552c52[_0x3e505f(0x2f7)])return;if(!this[_0x3e505f(0x344)])return;const _0x34130b=this[_0x3e505f(0x371)]['y']-Math[_0x3e505f(0x351)]((Graphics[_0x3e505f(0x31b)]-Graphics[_0x3e505f(0x216)])/0x2),_0x57f441=_0x34130b+this[_0x3e505f(0x371)][_0x3e505f(0x31b)];this[_0x3e505f(0x344)]['y']=_0x57f441+_0x552c52['ScreenBuffer'];};function Sprite_CTB_TurnOrder_Battler(){const _0x31f1b8=_0x1d4352;this[_0x31f1b8(0x3ad)](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)]=Object[_0x1d4352(0x388)](Sprite_Clickable[_0x1d4352(0x369)]),Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x21b)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x3ad)]=function(_0x3554ff,_0x45318c,_0x30f66c){const _0xe1bcf5=_0x1d4352;this['initMembers'](_0x3554ff,_0x45318c,_0x30f66c),Sprite_Clickable[_0xe1bcf5(0x369)][_0xe1bcf5(0x3ad)]['call'](this),this[_0xe1bcf5(0x399)]();},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x33a)]=function(_0x42c8ff,_0x3b1c19,_0x6c0916){const _0x246ad1=_0x1d4352;this['_unit']=_0x42c8ff,this[_0x246ad1(0x346)]=_0x3b1c19,this['_dupe']=_0x6c0916;const _0x155115=Window_CTB_TurnOrder['Settings'],_0x432e68=this['isHorz'](),_0x7fa01c=this[_0x246ad1(0x1f0)]();this[_0x246ad1(0x2a8)]=0x0,this['_positionTargetX']=_0x432e68?_0x155115[_0x246ad1(0x2eb)]*_0x7fa01c:0x0,this['_positionTargetY']=_0x432e68?0x0:_0x155115[_0x246ad1(0x2eb)]*_0x7fa01c,this[_0x246ad1(0x354)]=0x0,this[_0x246ad1(0x1fd)]=0xff,this[_0x246ad1(0x241)]=!![],this[_0x246ad1(0x1f2)]=!![];},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x399)]=function(){const _0x44a4f3=_0x1d4352;this['createInitialPositions'](),this[_0x44a4f3(0x20c)](),this[_0x44a4f3(0x381)](),this['createBorderSprite'](),this[_0x44a4f3(0x258)]();},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x321)]=function(){const _0x1ed9d2=_0x1d4352;this['x']=this[_0x1ed9d2(0x2df)],this['y']=this[_0x1ed9d2(0x209)];},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x214)]=function(){const _0x3c407e=_0x1d4352,_0x430264=Window_CTB_TurnOrder['Settings'],_0x46ba1c=[_0x3c407e(0x38a),'bottom']['includes'](_0x430264[_0x3c407e(0x350)]);return _0x46ba1c;},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x34b)]=function(){const _0x35da15=_0x1d4352,_0x35e125=Window_CTB_TurnOrder[_0x35da15(0x2c6)];return this['isHorz']()?_0x35e125[_0x35da15(0x2eb)]:_0x35e125[_0x35da15(0x331)];},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)]['bitmapHeight']=function(){const _0x3f2fdf=_0x1d4352,_0x4a8eb0=Window_CTB_TurnOrder[_0x3f2fdf(0x2c6)];return this[_0x3f2fdf(0x214)]()?_0x4a8eb0[_0x3f2fdf(0x331)]:_0x4a8eb0[_0x3f2fdf(0x2eb)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d4352(0x325)]=function(){const _0x3a24b5=_0x1d4352;this[_0x3a24b5(0x37b)]=new Bitmap(0x48,0x24);const _0xe69df=this[_0x3a24b5(0x204)]()?this[_0x3a24b5(0x204)]()[_0x3a24b5(0x239)]():_0x3a24b5(0x2c8)[_0x3a24b5(0x2f8)](this[_0x3a24b5(0x2c2)],this[_0x3a24b5(0x346)],this[_0x3a24b5(0x31d)]);this[_0x3a24b5(0x37b)][_0x3a24b5(0x2dd)](_0xe69df,0x0,0x0,0x48,0x24,_0x3a24b5(0x3a2));},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x20c)]=function(){const _0x508a0d=_0x1d4352;if(!Window_CTB_TurnOrder[_0x508a0d(0x2c6)][_0x508a0d(0x352)])return;const _0x255bda=Window_CTB_TurnOrder[_0x508a0d(0x2c6)],_0x522523=this['_unit']===$gameParty?'Actor':_0x508a0d(0x2cc),_0x2c8063=_0x508a0d(0x29e)[_0x508a0d(0x2f8)](_0x522523),_0x5203a2=new Sprite();_0x5203a2[_0x508a0d(0x393)]['x']=this[_0x508a0d(0x393)]['x'],_0x5203a2['anchor']['y']=this[_0x508a0d(0x393)]['y'];if(_0x255bda[_0x2c8063])_0x5203a2[_0x508a0d(0x37b)]=ImageManager[_0x508a0d(0x2f0)](_0x255bda[_0x2c8063]);else{const _0x479fcd=this[_0x508a0d(0x34b)](),_0x3a3de7=this[_0x508a0d(0x1f9)]();_0x5203a2['bitmap']=new Bitmap(_0x479fcd,_0x3a3de7);const _0x2e510a=ColorManager[_0x508a0d(0x392)](_0x255bda[_0x508a0d(0x337)[_0x508a0d(0x2f8)](_0x522523)]),_0x5e24db=ColorManager['getColor'](_0x255bda[_0x508a0d(0x291)[_0x508a0d(0x2f8)](_0x522523)]);_0x5203a2[_0x508a0d(0x37b)][_0x508a0d(0x272)](0x0,0x0,_0x479fcd,_0x3a3de7,_0x2e510a,_0x5e24db,!![]);}this['_backgroundSprite']=_0x5203a2,this[_0x508a0d(0x35d)](this[_0x508a0d(0x23a)]),this[_0x508a0d(0x39b)]=this[_0x508a0d(0x23a)][_0x508a0d(0x39b)],this[_0x508a0d(0x31b)]=this[_0x508a0d(0x23a)]['height'];},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x381)]=function(){const _0x102a00=_0x1d4352,_0x20d11e=new Sprite();_0x20d11e[_0x102a00(0x393)]['x']=this[_0x102a00(0x393)]['x'],_0x20d11e[_0x102a00(0x393)]['y']=this[_0x102a00(0x393)]['y'],this['_graphicSprite']=_0x20d11e,this[_0x102a00(0x35d)](this[_0x102a00(0x357)]),this['processUpdateGraphic']();},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x320)]=function(){const _0x34c00=_0x1d4352;if(!Window_CTB_TurnOrder[_0x34c00(0x2c6)][_0x34c00(0x2e6)])return;const _0x31eb66=Window_CTB_TurnOrder[_0x34c00(0x2c6)],_0x45e9b3=this[_0x34c00(0x2c2)]===$gameParty?_0x34c00(0x263):'Enemy',_0x5c1ae6=_0x34c00(0x283)[_0x34c00(0x2f8)](_0x45e9b3),_0x308488=new Sprite();_0x308488[_0x34c00(0x393)]['x']=this['anchor']['x'],_0x308488[_0x34c00(0x393)]['y']=this[_0x34c00(0x393)]['y'];if(_0x31eb66[_0x5c1ae6])_0x308488[_0x34c00(0x37b)]=ImageManager['loadSystem'](_0x31eb66[_0x5c1ae6]);else{let _0x3c1b09=this[_0x34c00(0x34b)](),_0x4ddc3e=this['bitmapHeight'](),_0x4d86c1=_0x31eb66[_0x34c00(0x247)];_0x308488[_0x34c00(0x37b)]=new Bitmap(_0x3c1b09,_0x4ddc3e);const _0x4eafac=_0x34c00(0x257),_0x550dfa=ColorManager[_0x34c00(0x392)](_0x31eb66[_0x34c00(0x3a0)[_0x34c00(0x2f8)](_0x45e9b3)]);_0x308488[_0x34c00(0x37b)][_0x34c00(0x2cd)](0x0,0x0,_0x3c1b09,_0x4ddc3e,_0x4eafac),_0x3c1b09-=0x2,_0x4ddc3e-=0x2,_0x308488[_0x34c00(0x37b)][_0x34c00(0x2cd)](0x1,0x1,_0x3c1b09,_0x4ddc3e,_0x550dfa),_0x3c1b09-=_0x4d86c1*0x2,_0x4ddc3e-=_0x4d86c1*0x2,_0x308488['bitmap'][_0x34c00(0x2cd)](0x1+_0x4d86c1,0x1+_0x4d86c1,_0x3c1b09,_0x4ddc3e,_0x4eafac),_0x3c1b09-=0x2,_0x4ddc3e-=0x2,_0x4d86c1+=0x1,_0x308488[_0x34c00(0x37b)]['clearRect'](0x1+_0x4d86c1,0x1+_0x4d86c1,_0x3c1b09,_0x4ddc3e);}this['_backgroundSprite']=_0x308488,this[_0x34c00(0x35d)](this[_0x34c00(0x23a)]);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x258)]=function(){const _0x31003b=_0x1d4352,_0x1ad97f=Window_CTB_TurnOrder[_0x31003b(0x2c6)];if(!_0x1ad97f[_0x31003b(0x233)])return;if(this[_0x31003b(0x2c2)]===$gameParty)return;const _0x6d8d0f=this['bitmapWidth'](),_0x4f816f=this[_0x31003b(0x1f9)](),_0x168f91=new Sprite();_0x168f91[_0x31003b(0x393)]['x']=this[_0x31003b(0x393)]['x'],_0x168f91[_0x31003b(0x393)]['y']=this[_0x31003b(0x393)]['y'],_0x168f91[_0x31003b(0x37b)]=new Bitmap(_0x6d8d0f,_0x4f816f),this[_0x31003b(0x2db)]=_0x168f91,this[_0x31003b(0x35d)](this[_0x31003b(0x2db)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d4352(0x204)]=function(){const _0x2f0797=_0x1d4352;return this[_0x2f0797(0x2c2)]?this[_0x2f0797(0x2c2)][_0x2f0797(0x260)]()[this['_index']]:null;},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d4352(0x2af)]=function(_0x2e18f3){const _0x490fc4=_0x1d4352,_0x72d926=this['battler']();if(!_0x72d926)return Number[_0x490fc4(0x2d7)];const _0x534edd=0x1*(this[_0x490fc4(0x31d)]+0x1);return _0x72d926[_0x490fc4(0x236)](_0x534edd,_0x2e18f3);},Sprite_CTB_TurnOrder_Battler['prototype']['isSubject']=function(){const _0x396ff5=_0x1d4352;return this[_0x396ff5(0x204)]()&&this[_0x396ff5(0x204)]()===BattleManager[_0x396ff5(0x200)]&&this[_0x396ff5(0x31d)]<=0x0;},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x2d9)]=function(){const _0xe0bb85=_0x1d4352;Sprite_Clickable[_0xe0bb85(0x369)][_0xe0bb85(0x2d9)][_0xe0bb85(0x2b8)](this),this['checkPosition'](),this[_0xe0bb85(0x3a7)](),this[_0xe0bb85(0x25f)](),this[_0xe0bb85(0x22d)](),this[_0xe0bb85(0x289)](),this[_0xe0bb85(0x201)](),this[_0xe0bb85(0x379)](),this[_0xe0bb85(0x36a)]();},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x2b5)]=function(){const _0x2a89e3=_0x1d4352,_0xf22c21=this[_0x2a89e3(0x288)]();if(this[_0x2a89e3(0x36f)]===_0xf22c21)return;this['_position']=_0xf22c21;const _0xf35769=Window_CTB_TurnOrder[_0x2a89e3(0x2c6)],_0x33762c=this['isHorz'](),_0x5d38a2=_0xf35769['OrderDirection'],_0x38368b=_0xf35769[_0x2a89e3(0x2c4)],_0x366613=SceneManager[_0x2a89e3(0x27d)][_0x2a89e3(0x371)];if(!_0x366613)return;this['_positionDuration']=_0xf35769[_0x2a89e3(0x21d)],this[_0x2a89e3(0x2df)]=_0x33762c?_0xf35769[_0x2a89e3(0x2eb)]*_0xf22c21:0x0,this[_0x2a89e3(0x209)]=_0x33762c?0x0:_0xf35769['SpriteThin']*_0xf22c21,_0xf22c21>0x0&&(this[_0x2a89e3(0x2df)]+=_0x33762c?_0x38368b:0x0,this[_0x2a89e3(0x209)]+=_0x33762c?0x0:_0x38368b),_0x5d38a2?this[_0x2a89e3(0x2df)]=_0x33762c?_0x366613[_0x2a89e3(0x39b)]-this[_0x2a89e3(0x2df)]-_0xf35769[_0x2a89e3(0x2eb)]:0x0:this[_0x2a89e3(0x209)]=_0x33762c?0x0:_0x366613[_0x2a89e3(0x31b)]-this[_0x2a89e3(0x209)]-_0xf35769['SpriteThin'];},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)]['updatePosition']=function(){const _0x43749b=_0x1d4352;if(this[_0x43749b(0x354)]>0x0)return;if(this['_positionDuration']>0x0){const _0x3b7e24=this[_0x43749b(0x2a8)];this['x']=(this['x']*(_0x3b7e24-0x1)+this[_0x43749b(0x2df)])/_0x3b7e24,this['y']=(this['y']*(_0x3b7e24-0x1)+this[_0x43749b(0x209)])/_0x3b7e24,this[_0x43749b(0x2a8)]--;}this[_0x43749b(0x2a8)]<=0x0&&this[_0x43749b(0x241)]&&(this['x']=this[_0x43749b(0x2df)],this['y']=this[_0x43749b(0x209)],this[_0x43749b(0x319)]<=0x0&&!this[_0x43749b(0x373)]&&this[_0x43749b(0x2ff)](0xff));},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x1f0)]=function(){const _0x155643=_0x1d4352;return Window_CTB_TurnOrder[_0x155643(0x2c6)][_0x155643(0x36c)]*0x14;},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x2ba)]=function(){const _0x41138d=_0x1d4352;return SceneManager[_0x41138d(0x27d)]['_ctbTurnOrderWindow'];},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x288)]=function(){const _0x57863e=_0x1d4352;if(!this[_0x57863e(0x2ba)]())return this[_0x57863e(0x1f0)]();const _0x5172f2=this[_0x57863e(0x2ba)]()[_0x57863e(0x322)];return _0x5172f2['indexOf'](this);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)]['rotateDupeNumber']=function(){const _0x3c10df=_0x1d4352,_0x530208=Window_CTB_TurnOrder[_0x3c10df(0x2c6)],_0x1752f1=this[_0x3c10df(0x214)](),_0x15d609=_0x1752f1?_0x530208[_0x3c10df(0x36c)]:_0x530208['TotalVertSprites'];this['_dupe']-=0x1,this['_dupe']<0x0&&(this['_dupe']=_0x15d609-0x1,this[_0x3c10df(0x2ff)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x2ff)]=function(_0x3902af){const _0x599f42=_0x1d4352,_0x272908=Window_CTB_TurnOrder[_0x599f42(0x2c6)];this['_fadeDuration']=_0x272908[_0x599f42(0x21d)],this[_0x599f42(0x1fd)]=_0x3902af;},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x25f)]=function(){const _0x2b99d1=_0x1d4352,_0x3f801c=this['battler']();if(!_0x3f801c)return;if(this['_isAlive']===_0x3f801c['isAlive']()&&this[_0x2b99d1(0x1f2)]===_0x3f801c[_0x2b99d1(0x2aa)]())return;this['_isAlive']=_0x3f801c[_0x2b99d1(0x32f)](),this['_isAppeared']=_0x3f801c[_0x2b99d1(0x2aa)]();let _0x261d27=this[_0x2b99d1(0x241)]&&this['_isAppeared']?0xff:0x0;this[_0x2b99d1(0x2ff)](_0x261d27);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d4352(0x22d)]=function(){const _0x177801=_0x1d4352;if(this[_0x177801(0x354)]>0x0){const _0x3b21f6=this[_0x177801(0x354)];this[_0x177801(0x319)]=(this[_0x177801(0x319)]*(_0x3b21f6-0x1)+this[_0x177801(0x1fd)])/_0x3b21f6,this[_0x177801(0x354)]--,this['_fadeDuration']<=0x0&&(this[_0x177801(0x2b5)](),this[_0x177801(0x2a8)]=0x0,this['updatePosition'](),this[_0x177801(0x319)]=this[_0x177801(0x1fd)]);}if(this[_0x177801(0x373)])return;BattleManager[_0x177801(0x2d8)]===_0x177801(0x2de)&&(this['_isBattleOver']=!![],this[_0x177801(0x2ff)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x289)]=function(){const _0x1bc0f5=_0x1d4352,_0x9dc64=this[_0x1bc0f5(0x204)]();if(!_0x9dc64)return;const _0x2a64a4=Window_CTB_TurnOrder['Settings'],_0x19ce16=this['_unit']===$gameParty?'Actor':_0x1bc0f5(0x2cc);let _0x2d3be1=_0x9dc64[_0x1bc0f5(0x222)]();if(_0x9dc64[_0x1bc0f5(0x37e)]()&&_0x2d3be1===_0x1bc0f5(0x226))_0x2d3be1=_0x1bc0f5(0x26e);else _0x9dc64[_0x1bc0f5(0x3ab)]()&&_0x2d3be1===_0x1bc0f5(0x2a0)&&(_0x2d3be1=_0x1bc0f5(0x226));if(this[_0x1bc0f5(0x31e)]!==_0x2d3be1)return this[_0x1bc0f5(0x26a)]();switch(this['_graphicType']){case _0x1bc0f5(0x26e):if(this[_0x1bc0f5(0x1f6)]!==_0x9dc64[_0x1bc0f5(0x28e)]())return this[_0x1bc0f5(0x26a)]();if(this['_graphicFaceIndex']!==_0x9dc64['TurnOrderCTBGraphicFaceIndex']())return this[_0x1bc0f5(0x26a)]();break;case _0x1bc0f5(0x1fc):if(this['_graphicIconIndex']!==_0x9dc64['TurnOrderCTBGraphicIconIndex']())return this[_0x1bc0f5(0x26a)]();break;case _0x1bc0f5(0x226):if(_0x9dc64['hasSvBattler']()){if(this[_0x1bc0f5(0x2ec)]!==_0x9dc64[_0x1bc0f5(0x38f)]())return this[_0x1bc0f5(0x26a)]();}else{if(this[_0x1bc0f5(0x311)]!==_0x9dc64[_0x1bc0f5(0x34a)]())return this['processUpdateGraphic']();}break;case _0x1bc0f5(0x2a0):if(_0x9dc64[_0x1bc0f5(0x37e)]()){if(this['_graphicSv']!==_0x9dc64[_0x1bc0f5(0x34a)]())return this[_0x1bc0f5(0x26a)]();}else{if(this[_0x1bc0f5(0x311)]!==_0x9dc64[_0x1bc0f5(0x34a)]())return this['processUpdateGraphic']();}break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d4352(0x26a)]=function(){const _0x129dd0=_0x1d4352,_0x41d703=this[_0x129dd0(0x204)]();if(!_0x41d703)return;this[_0x129dd0(0x31e)]=_0x41d703[_0x129dd0(0x222)]();if(_0x41d703[_0x129dd0(0x37e)]()&&this[_0x129dd0(0x31e)]===_0x129dd0(0x226))this[_0x129dd0(0x31e)]=_0x129dd0(0x26e);else _0x41d703['isEnemy']()&&this[_0x129dd0(0x31e)]==='svactor'&&(this[_0x129dd0(0x31e)]=_0x129dd0(0x226));let _0x3e71c5;switch(this[_0x129dd0(0x31e)]){case _0x129dd0(0x26e):this[_0x129dd0(0x1f6)]=_0x41d703[_0x129dd0(0x28e)](),this[_0x129dd0(0x38e)]=_0x41d703['TurnOrderCTBGraphicFaceIndex'](),_0x3e71c5=ImageManager[_0x129dd0(0x224)](this['_graphicFaceName']),_0x3e71c5['addLoadListener'](this['changeFaceGraphicBitmap'][_0x129dd0(0x375)](this,_0x3e71c5));break;case _0x129dd0(0x1fc):this[_0x129dd0(0x3a1)]=_0x41d703[_0x129dd0(0x34c)](),_0x3e71c5=ImageManager['loadSystem'](_0x129dd0(0x302)),_0x3e71c5['addLoadListener'](this[_0x129dd0(0x2e3)][_0x129dd0(0x375)](this,_0x3e71c5));break;case'enemy':if(_0x41d703[_0x129dd0(0x396)]())this[_0x129dd0(0x2ec)]=_0x41d703['svBattlerName'](),_0x3e71c5=ImageManager['loadSvActor'](this[_0x129dd0(0x2ec)]),_0x3e71c5['addLoadListener'](this[_0x129dd0(0x394)][_0x129dd0(0x375)](this,_0x3e71c5));else $gameSystem['isSideView']()?(this['_graphicEnemy']=_0x41d703[_0x129dd0(0x34a)](),_0x3e71c5=ImageManager[_0x129dd0(0x25c)](this['_graphicEnemy']),_0x3e71c5[_0x129dd0(0x362)](this[_0x129dd0(0x345)][_0x129dd0(0x375)](this,_0x3e71c5))):(this[_0x129dd0(0x311)]=_0x41d703[_0x129dd0(0x34a)](),_0x3e71c5=ImageManager[_0x129dd0(0x29d)](this['_graphicEnemy']),_0x3e71c5['addLoadListener'](this['changeEnemyGraphicBitmap'][_0x129dd0(0x375)](this,_0x3e71c5)));break;case _0x129dd0(0x2a0):this[_0x129dd0(0x2ec)]=_0x41d703['battlerName'](),_0x3e71c5=ImageManager['loadSvActor'](this[_0x129dd0(0x2ec)]),_0x3e71c5[_0x129dd0(0x362)](this[_0x129dd0(0x394)]['bind'](this,_0x3e71c5));break;}},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)]['changeFaceGraphicBitmap']=function(_0x5d975c){const _0x38ff69=_0x1d4352,_0xb0b6b1=this[_0x38ff69(0x38e)],_0x17a34b=this['bitmapWidth'](),_0x7ccd41=this[_0x38ff69(0x1f9)](),_0x3ee085=Math[_0x38ff69(0x242)](_0x17a34b,_0x7ccd41);this[_0x38ff69(0x357)][_0x38ff69(0x37b)]=new Bitmap(_0x17a34b,_0x7ccd41);const _0x52f2b7=this[_0x38ff69(0x357)][_0x38ff69(0x37b)],_0x52a9ce=ImageManager[_0x38ff69(0x2c9)],_0x23216b=ImageManager[_0x38ff69(0x292)],_0x15faf3=_0x3ee085/Math['max'](_0x52a9ce,_0x23216b),_0x4c99b2=ImageManager[_0x38ff69(0x2c9)],_0x39c5ba=ImageManager[_0x38ff69(0x292)],_0x341d0c=_0xb0b6b1%0x4*_0x52a9ce+(_0x52a9ce-_0x4c99b2)/0x2,_0x34d399=Math[_0x38ff69(0x256)](_0xb0b6b1/0x4)*_0x23216b+(_0x23216b-_0x39c5ba)/0x2,_0x4c611a=(_0x17a34b-_0x52a9ce*_0x15faf3)/0x2,_0x16a251=(_0x7ccd41-_0x23216b*_0x15faf3)/0x2;_0x52f2b7[_0x38ff69(0x1f7)](_0x5d975c,_0x341d0c,_0x34d399,_0x4c99b2,_0x39c5ba,_0x4c611a,_0x16a251,_0x3ee085,_0x3ee085);},Sprite_CTB_TurnOrder_Battler['prototype']['changeIconGraphicBitmap']=function(_0x49e354){const _0x324c3c=_0x1d4352,_0x4a2bb8=this[_0x324c3c(0x3a1)],_0x10f627=this[_0x324c3c(0x34b)](),_0x11dcf6=this[_0x324c3c(0x1f9)]();this[_0x324c3c(0x357)][_0x324c3c(0x37b)]=new Bitmap(_0x10f627,_0x11dcf6);const _0x2656e8=this['_graphicSprite'][_0x324c3c(0x37b)],_0x2bd7f=ImageManager[_0x324c3c(0x2e8)],_0x3c3cb9=ImageManager['iconHeight'],_0x286d72=Math[_0x324c3c(0x37c)](_0x2bd7f,_0x3c3cb9,_0x10f627,_0x11dcf6),_0x4a1faf=_0x4a2bb8%0x10*_0x2bd7f,_0x13bfd5=Math[_0x324c3c(0x256)](_0x4a2bb8/0x10)*_0x3c3cb9,_0x4c3ea0=Math['floor'](Math[_0x324c3c(0x242)](_0x10f627-_0x286d72,0x0)/0x2),_0x4b5d43=Math[_0x324c3c(0x256)](Math[_0x324c3c(0x242)](_0x11dcf6-_0x286d72,0x0)/0x2);_0x2656e8[_0x324c3c(0x1f7)](_0x49e354,_0x4a1faf,_0x13bfd5,_0x2bd7f,_0x3c3cb9,_0x4c3ea0,_0x4b5d43,_0x286d72,_0x286d72);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x394)]=function(_0xa14c53){const _0x44525e=_0x1d4352,_0x14939a=this[_0x44525e(0x34b)](),_0x175d0d=this[_0x44525e(0x1f9)](),_0x5e6697=Math[_0x44525e(0x37c)](_0x14939a,_0x175d0d);this['_graphicSprite'][_0x44525e(0x37b)]=new Bitmap(_0x14939a,_0x175d0d);const _0x2c2973=this['_graphicSprite'][_0x44525e(0x37b)],_0x4c7964=this[_0x44525e(0x2ec)]['match'](/\$/i),_0x278533=_0x4c7964?0x1:ImageManager['svActorHorzCells'],_0x12bfe9=_0x4c7964?0x1:ImageManager[_0x44525e(0x2ce)],_0x5d07b5=_0xa14c53[_0x44525e(0x39b)]/_0x278533,_0x24eb9f=_0xa14c53['height']/_0x12bfe9,_0xfef517=Math['min'](0x1,_0x5e6697/_0x5d07b5,_0x5e6697/_0x24eb9f),_0x26d99e=_0x5d07b5*_0xfef517,_0x15cfce=_0x24eb9f*_0xfef517,_0x413506=Math[_0x44525e(0x351)]((_0x14939a-_0x26d99e)/0x2),_0x203d7d=Math['round']((_0x175d0d-_0x15cfce)/0x2);_0x2c2973[_0x44525e(0x1f7)](_0xa14c53,0x0,0x0,_0x5d07b5,_0x24eb9f,_0x413506,_0x203d7d,_0x26d99e,_0x15cfce);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x345)]=function(_0x66e91e){const _0x3dc2e0=_0x1d4352,_0x2b3545=Window_CTB_TurnOrder[_0x3dc2e0(0x2c6)],_0x2077ff=this['bitmapWidth'](),_0x3b4b5d=this[_0x3dc2e0(0x1f9)](),_0x4e1bdb=Math['min'](_0x2077ff,_0x3b4b5d);this[_0x3dc2e0(0x357)][_0x3dc2e0(0x37b)]=new Bitmap(_0x2077ff,_0x3b4b5d);const _0x491e95=this[_0x3dc2e0(0x357)][_0x3dc2e0(0x37b)],_0x422c14=Math[_0x3dc2e0(0x37c)](0x1,_0x4e1bdb/_0x66e91e[_0x3dc2e0(0x39b)],_0x4e1bdb/_0x66e91e[_0x3dc2e0(0x31b)]),_0xb06d5d=_0x66e91e[_0x3dc2e0(0x39b)]*_0x422c14,_0xa7070e=_0x66e91e[_0x3dc2e0(0x31b)]*_0x422c14,_0x327a96=Math[_0x3dc2e0(0x351)]((_0x2077ff-_0xb06d5d)/0x2),_0x4d16a5=Math[_0x3dc2e0(0x351)]((_0x3b4b5d-_0xa7070e)/0x2);_0x491e95[_0x3dc2e0(0x1f7)](_0x66e91e,0x0,0x0,_0x66e91e[_0x3dc2e0(0x39b)],_0x66e91e[_0x3dc2e0(0x31b)],_0x327a96,_0x4d16a5,_0xb06d5d,_0xa7070e);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x201)]=function(){const _0x4379e0=_0x1d4352,_0x4238dd=this[_0x4379e0(0x204)]();if(!_0x4238dd)return;if(!_0x4238dd[_0x4379e0(0x3ab)]())return;if(this[_0x4379e0(0x356)]===_0x4238dd['battlerHue']())return;this[_0x4379e0(0x356)]=_0x4238dd[_0x4379e0(0x294)](),this[_0x4379e0(0x357)][_0x4379e0(0x250)](_0x4238dd['hasSvBattler']()?0x0:this['_graphicHue']);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x379)]=function(){const _0x22fe8c=_0x1d4352;if(!this[_0x22fe8c(0x2db)])return;const _0x420c41=this[_0x22fe8c(0x204)]();if(!_0x420c41)return;if(this[_0x22fe8c(0x343)]===_0x420c41[_0x22fe8c(0x343)]&&this[_0x22fe8c(0x2a6)]===_0x420c41[_0x22fe8c(0x2a6)])return;this[_0x22fe8c(0x343)]=_0x420c41['_letter'],this['_plural']=_0x420c41[_0x22fe8c(0x2a6)];const _0x19ac7f=Window_CTB_TurnOrder['Settings'],_0x11feea=this['isHorz'](),_0x4300c7=this[_0x22fe8c(0x34b)](),_0x1318b6=this[_0x22fe8c(0x1f9)](),_0x2cbab9=this[_0x22fe8c(0x2db)][_0x22fe8c(0x37b)];_0x2cbab9[_0x22fe8c(0x2da)]();if(!this[_0x22fe8c(0x2a6)])return;_0x2cbab9['fontFace']=_0x19ac7f['EnemyBattlerFontFace']||$gameSystem['mainFontFace'](),_0x2cbab9['fontSize']=_0x19ac7f[_0x22fe8c(0x303)]||0x10,_0x11feea?_0x2cbab9[_0x22fe8c(0x2dd)](this[_0x22fe8c(0x343)][_0x22fe8c(0x33e)](),0x0,_0x1318b6/0x2,_0x4300c7,_0x1318b6/0x2,'center'):_0x2cbab9['drawText'](this[_0x22fe8c(0x343)][_0x22fe8c(0x33e)](),0x0,0x2,_0x4300c7-0x8,_0x1318b6-0x4,_0x22fe8c(0x2b7));},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)][_0x1d4352(0x36a)]=function(){const _0x15f2e4=_0x1d4352,_0x4fcba6=this[_0x15f2e4(0x204)]();if(!_0x4fcba6)return;const _0x2cf6c1=_0x4fcba6[_0x15f2e4(0x204)]();if(!_0x2cf6c1)return;const _0x407f7e=_0x2cf6c1[_0x15f2e4(0x39c)]();if(!_0x407f7e)return;this[_0x15f2e4(0x234)](_0x407f7e[_0x15f2e4(0x38b)]);},Sprite_CTB_TurnOrder_Battler[_0x1d4352(0x369)]['getStateTooltipBattler']=function(){return this['battler']();},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x33f)]=Window_Help[_0x1d4352(0x369)][_0x1d4352(0x30d)],Window_Help['prototype'][_0x1d4352(0x30d)]=function(_0x479902){const _0x34983=_0x1d4352;BattleManager[_0x34983(0x2e9)]()&&_0x479902&&_0x479902[_0x34983(0x340)]&&_0x479902[_0x34983(0x340)][_0x34983(0x206)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x34983(0x2bf)](String(RegExp['$1'])):VisuMZ[_0x34983(0x24e)][_0x34983(0x33f)][_0x34983(0x2b8)](this,_0x479902);},VisuMZ[_0x1d4352(0x24e)][_0x1d4352(0x227)]=Window_StatusBase[_0x1d4352(0x369)]['placeGauge'],Window_StatusBase[_0x1d4352(0x369)][_0x1d4352(0x21a)]=function(_0x66faf2,_0x5cf465,_0x1c7c8d,_0x127cd6){const _0x55f761=_0x1d4352;if(BattleManager['isCTB']()&&_0x5cf465===_0x55f761(0x312))return;VisuMZ['BattleSystemCTB'][_0x55f761(0x227)]['call'](this,_0x66faf2,_0x5cf465,_0x1c7c8d,_0x127cd6);};function _0xfd03(_0xfd47a,_0x25ef90){const _0x2ec239=_0x2ec2();return _0xfd03=function(_0xfd0337,_0x208ff1){_0xfd0337=_0xfd0337-0x1ef;let _0x296d5b=_0x2ec239[_0xfd0337];return _0x296d5b;},_0xfd03(_0xfd47a,_0x25ef90);}function Window_CTB_TurnOrder(){const _0x3cee76=_0x1d4352;this[_0x3cee76(0x3ad)](...arguments);}Window_CTB_TurnOrder[_0x1d4352(0x369)]=Object[_0x1d4352(0x388)](Window_Base[_0x1d4352(0x369)]),Window_CTB_TurnOrder['prototype'][_0x1d4352(0x21b)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder['Settings']=VisuMZ[_0x1d4352(0x24e)]['Settings'][_0x1d4352(0x20f)],Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x3ad)]=function(){const _0x29efb3=_0x1d4352,_0x520440=this['windowRect']();this[_0x29efb3(0x205)]=_0x520440['x'],this[_0x29efb3(0x2a2)]=_0x520440['y'],Window_Base['prototype'][_0x29efb3(0x3ad)][_0x29efb3(0x2b8)](this,_0x520440),this[_0x29efb3(0x324)](),this[_0x29efb3(0x37d)](),this[_0x29efb3(0x319)]=0x0;},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x31c)]=function(){const _0x52e8c8=_0x1d4352,_0x5c7340=Window_CTB_TurnOrder[_0x52e8c8(0x2c6)],_0xff4b34=SceneManager['_scene'][_0x52e8c8(0x305)]['height'],_0x5c25d3=SceneManager[_0x52e8c8(0x27d)][_0x52e8c8(0x39a)][_0x52e8c8(0x31b)],_0x387839=_0x5c7340[_0x52e8c8(0x2c4)];let _0x172e25=0x0,_0xcf236c=0x0,_0xc889ea=0x0,_0x537899=0x0;switch(_0x5c7340[_0x52e8c8(0x350)]){case _0x52e8c8(0x38a):_0x172e25=_0x5c7340['SpriteThin']*_0x5c7340[_0x52e8c8(0x36c)]+_0x387839,_0xcf236c=_0x5c7340[_0x52e8c8(0x331)],_0xc889ea=Math[_0x52e8c8(0x290)]((Graphics['width']-_0x172e25)/0x2),_0x537899=_0x5c7340[_0x52e8c8(0x38c)];break;case'bottom':_0x172e25=_0x5c7340['SpriteThin']*_0x5c7340[_0x52e8c8(0x36c)]+_0x387839,_0xcf236c=_0x5c7340[_0x52e8c8(0x331)],_0xc889ea=Math[_0x52e8c8(0x290)]((Graphics['width']-_0x172e25)/0x2),_0x537899=Graphics[_0x52e8c8(0x31b)]-_0xff4b34-_0xcf236c-_0x5c7340[_0x52e8c8(0x38c)];break;case _0x52e8c8(0x295):_0x172e25=_0x5c7340[_0x52e8c8(0x331)],_0xcf236c=_0x5c7340[_0x52e8c8(0x2eb)]*_0x5c7340[_0x52e8c8(0x383)]+_0x387839,_0xc889ea=_0x5c7340[_0x52e8c8(0x38c)],_0x537899=Math[_0x52e8c8(0x290)]((Graphics[_0x52e8c8(0x31b)]-_0xff4b34+_0x5c25d3-_0xcf236c)/0x2);break;case _0x52e8c8(0x2b7):_0x172e25=_0x5c7340['SpriteLength'],_0xcf236c=_0x5c7340[_0x52e8c8(0x2eb)]*_0x5c7340[_0x52e8c8(0x383)]+_0x387839,_0xc889ea=Graphics[_0x52e8c8(0x39b)]-_0x172e25-_0x5c7340[_0x52e8c8(0x38c)],_0x537899=Math[_0x52e8c8(0x290)]((Graphics[_0x52e8c8(0x31b)]-_0xff4b34+_0x5c25d3-_0xcf236c)/0x2);break;}return _0xc889ea+=_0x5c7340['DisplayOffsetX'],_0x537899+=_0x5c7340[_0x52e8c8(0x2bc)],new Rectangle(_0xc889ea,_0x537899,_0x172e25,_0xcf236c);},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x1f5)]=function(){const _0x54090a=_0x1d4352;this[_0x54090a(0x254)]=0x0;},Window_CTB_TurnOrder[_0x1d4352(0x369)]['isHorz']=function(){const _0x40d6ed=_0x1d4352,_0x24ef3c=Window_CTB_TurnOrder[_0x40d6ed(0x2c6)],_0x223dae=['top',_0x40d6ed(0x22e)][_0x40d6ed(0x2b3)](_0x24ef3c[_0x40d6ed(0x350)]);return _0x223dae;},Window_CTB_TurnOrder['prototype'][_0x1d4352(0x324)]=function(){const _0xe95515=_0x1d4352,_0xb1ab1=Window_CTB_TurnOrder[_0xe95515(0x2c6)],_0x5a29e0=this[_0xe95515(0x214)](),_0x3ca69c=_0x5a29e0?_0xb1ab1['TotalHorzSprites']:_0xb1ab1[_0xe95515(0x383)];this[_0xe95515(0x1ff)]=new Sprite(),this[_0xe95515(0x22c)](this[_0xe95515(0x1ff)]),this[_0xe95515(0x322)]=[];for(let _0x5b19bd=0x0;_0x5b19bd<$gameParty[_0xe95515(0x3ae)]();_0x5b19bd++){for(let _0x2bda83=0x0;_0x2bda83<_0x3ca69c;_0x2bda83++){const _0x3e827e=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x5b19bd,_0x2bda83);this[_0xe95515(0x1ff)]['addChild'](_0x3e827e),this[_0xe95515(0x322)][_0xe95515(0x326)](_0x3e827e);}}for(let _0x6d621f=0x0;_0x6d621f<$gameTroop[_0xe95515(0x260)]()[_0xe95515(0x24b)];_0x6d621f++){for(let _0x4e0bd0=0x0;_0x4e0bd0<_0x3ca69c;_0x4e0bd0++){const _0x562801=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x6d621f,_0x4e0bd0);this[_0xe95515(0x1ff)]['addChild'](_0x562801),this[_0xe95515(0x322)]['push'](_0x562801);}}},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x2d9)]=function(){const _0x24ef0d=_0x1d4352;Window_Base['prototype'][_0x24ef0d(0x2d9)][_0x24ef0d(0x2b8)](this),this[_0x24ef0d(0x3a7)](),this[_0x24ef0d(0x37d)]();},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x3a7)]=function(){const _0x2cfeaa=_0x1d4352,_0x583d20=Window_CTB_TurnOrder['Settings'];if(_0x583d20[_0x2cfeaa(0x350)]!==_0x2cfeaa(0x38a))return;if(!_0x583d20[_0x2cfeaa(0x335)])return;const _0x2b8995=SceneManager[_0x2cfeaa(0x27d)][_0x2cfeaa(0x39a)];if(!_0x2b8995)return;_0x2b8995['visible']?(this['x']=this[_0x2cfeaa(0x205)]+(_0x583d20[_0x2cfeaa(0x207)]||0x0),this['y']=this[_0x2cfeaa(0x2a2)]+(_0x583d20[_0x2cfeaa(0x22b)]||0x0)):(this['x']=this[_0x2cfeaa(0x205)],this['y']=this[_0x2cfeaa(0x2a2)]);const _0x59c648=SceneManager[_0x2cfeaa(0x27d)][_0x2cfeaa(0x308)];Window_CTB_TurnOrder[_0x2cfeaa(0x323)]===undefined&&(Window_CTB_TurnOrder[_0x2cfeaa(0x323)]=Math[_0x2cfeaa(0x351)]((Graphics[_0x2cfeaa(0x39b)]-Math['min'](Graphics[_0x2cfeaa(0x3a6)],_0x59c648[_0x2cfeaa(0x39b)]))/0x2),Window_CTB_TurnOrder[_0x2cfeaa(0x203)]=Math[_0x2cfeaa(0x351)]((Graphics[_0x2cfeaa(0x31b)]-Math[_0x2cfeaa(0x37c)](Graphics[_0x2cfeaa(0x216)],_0x59c648[_0x2cfeaa(0x31b)]))/0x2)),this['x']+=_0x59c648['x']-Window_CTB_TurnOrder[_0x2cfeaa(0x323)],this['y']+=_0x59c648['y']-Window_CTB_TurnOrder[_0x2cfeaa(0x203)];},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x2b0)]=function(){const _0x1768b1=_0x1d4352;if(!this[_0x1768b1(0x1ff)])return;const _0x1769e9=this[_0x1768b1(0x1ff)][_0x1768b1(0x253)];if(!_0x1769e9)return;_0x1769e9['sort'](this[_0x1768b1(0x27e)][_0x1768b1(0x375)](this));},Window_CTB_TurnOrder[_0x1d4352(0x369)]['compareBattlerSprites']=function(_0x1cb3e2,_0x5e498b){const _0x251ab1=_0x1d4352,_0x4ef728=this['isHorz'](),_0xc81a24=Window_CTB_TurnOrder[_0x251ab1(0x2c6)][_0x251ab1(0x237)];if(_0x4ef728&&!_0xc81a24)return _0x1cb3e2['x']-_0x5e498b['x'];else{if(_0x4ef728&&_0xc81a24)return _0x5e498b['x']-_0x1cb3e2['x'];else{if(!_0x4ef728&&_0xc81a24)return _0x1cb3e2['y']-_0x5e498b['y'];else{if(!_0x4ef728&&!_0xc81a24)return _0x5e498b['y']-_0x1cb3e2['y'];}}}},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x37d)]=function(){const _0xe4a716=_0x1d4352;this[_0xe4a716(0x2a7)]=$gameSystem[_0xe4a716(0x228)]();},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x397)]=function(_0x173c40){const _0x5f28d3=_0x1d4352;this['updateBattleContainerOrder'](),this['_turnOrderContainer'][_0x5f28d3(0x377)]((_0x4c11fa,_0x321850)=>{const _0x563af0=_0x5f28d3;return _0x4c11fa[_0x563af0(0x2af)]()-_0x321850[_0x563af0(0x2af)]();});![]&&console[_0x5f28d3(0x32c)](this[_0x5f28d3(0x322)][_0x5f28d3(0x348)](_0x3252f4=>_0x3252f4[_0x5f28d3(0x204)]())['map'](_0x59c6e4=>_0x59c6e4[_0x5f28d3(0x204)]()[_0x5f28d3(0x239)]()+':\x20'+_0x59c6e4[_0x5f28d3(0x2af)]()));if(!_0x173c40)return;for(const _0x4267d6 of this[_0x5f28d3(0x322)]){if(!_0x4267d6)continue;_0x4267d6[_0x5f28d3(0x2d9)](),_0x4267d6[_0x5f28d3(0x2a8)]=0x0;}},Window_CTB_TurnOrder[_0x1d4352(0x369)]['updateTurnOrderForSubject']=function(_0x506a71){const _0x5064a4=_0x1d4352;this[_0x5064a4(0x2b0)](),this[_0x5064a4(0x322)][_0x5064a4(0x377)]((_0xfd6583,_0x52b123)=>{const _0xa8a8f=_0x5064a4;if(_0xfd6583[_0xa8a8f(0x278)]())return-0x1;return 0x0;});if(!_0x506a71)return;for(const _0x2cf586 of this[_0x5064a4(0x322)]){if(!_0x2cf586)continue;_0x2cf586['update'](),_0x2cf586[_0x5064a4(0x2a8)]=0x0;}},VisuMZ['BattleSystemCTB'][_0x1d4352(0x277)]=Scene_Battle[_0x1d4352(0x369)][_0x1d4352(0x36e)],Scene_Battle[_0x1d4352(0x369)][_0x1d4352(0x36e)]=function(){const _0x5dee19=_0x1d4352;VisuMZ[_0x5dee19(0x24e)][_0x5dee19(0x277)]['call'](this),BattleManager[_0x5dee19(0x30a)]();},Window_CTB_TurnOrder[_0x1d4352(0x369)][_0x1d4352(0x28b)]=function(_0x415ef3){const _0x382d80=_0x1d4352;for(const _0x42dc08 of this['_turnOrderContainer']){if(!_0x42dc08)continue;if(_0x42dc08[_0x382d80(0x204)]()!==_0x415ef3)continue;_0x42dc08['rotateDupeNumber']();}};function _0x2ec2(){const _0x523e02=['createTurnOrderCTBGraphicType','Rush','_tpbIdleTime','opacity','%1AnimationID','height','windowRect','_dupe','_graphicType','onBattleStart','createBorderSprite','createInitialPositions','_turnOrderContainer','_ogWindowLayerX','createBattlerSprites','createTestBitmap','push','Ticks\x20to\x20Goal:\x20','BattleManager_updateTpbInput','isCtbChargingState','Enemy-%1-%2','isCtbCastingState','log','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getChildIndex','isAlive','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SpriteLength','updateAllTpbBattlersCTB','toUpperCase','Charge','RepositionTopForHelp','EscapeFailPenalty','%1BgColor1','startAction','231tRirIu','initMembers','_antiCtbSoftlockInstantActionAfter','onTpbCharged','onCtbOrderChange','trim','Window_Help_setItem','note','return\x200','Enemies','_letter','_logWindow','changeEnemyGraphicBitmap','_index','%1PopupText','filter','192bmcwiI','battlerName','bitmapWidth','createTurnOrderCTBGraphicIconIndex','updateTpbIdleTimeCTB','TpbCastTimeJS','process_VisuMZ_BattleSystemCTB_CreateRegExp','DisplayPosition','round','ShowMarkerBg','ParseSkillNotetags','_fadeDuration','updateTpbInput','_graphicHue','_graphicSprite','FaceName','_ctbTurnOrderGraphicType','_ctbTurnOrderVisible','6650388gfOiWY','ready','addChild','Scene_Battle_createAllWindows','setActionState','isPlaytest','Game_Battler_tpbSpeed','addLoadListener','Game_Battler_updateTpb','applyCTBPenalty','TpbBaseSpeedCalcJS','setCtbCastTime','Actors','Game_Battler_applyTpbPenalty','prototype','updateSelectionEffect','acting','TotalHorzSprites','createOrderJS','selectNextCommand','_position','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','_ctbTurnOrderWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_isBattleOver','updateTpbIdleTime','bind','updateTurnOrderCTBforSubject','sort','Parse_Notetags_CreateJS','updateLetter','%1Mute','bitmap','min','updateVisibility','isActor','State-%1-%2','Skill-%1-%2','createGraphicSprite','ctbTicksToGoalAddedCastTime','TotalVertSprites','_autoBattle','createAllWindows','getCurrentTurnOrderPositionCTB','setCtbChargeTime','create','charging','top','_blendColor','ScreenBuffer','RegExp','_graphicFaceIndex','svBattlerName','applyBattleSystemCTBUserEffect','updateTpbCastTime','getColor','anchor','changeSvActorGraphicBitmap','updateTpb','hasSvBattler','updateTurnOrder','Game_Battler_tpbBaseSpeed','createChildren','_helpWindow','width','mainSprite','EnemyBattlerFaceIndex','_onRestrictBypassCtbReset','ARRAYSTRUCT','%1BorderColor','_graphicIconIndex','center','updateTpbCtb','logCtbData','isPassCTB','boxWidth','updatePosition','MIN_SAFE_INTEGER','endAction','currentAction','isEnemy','removeBattleStates','initialize','maxBattleMembers','VisuMZ_0_CoreEngine','defaultPosition','registerCommand','_isAppeared','tpbRequiredCastTime','CtbTurnOrderActorIcon','updatePadding','_graphicFaceName','blt','Scene_Boot_onDatabaseLoaded','bitmapHeight','BattleManager_isTpb','Game_Battler_initTpbChargeTime','icon','_fadeTarget','status','_turnOrderInnerSprite','_subject','updateGraphicHue','createCTBTurnOrderWindow','_ogWindowLayerY','battler','_homeX','match','RepositionTopHelpX','exit','_positionTargetY','BattleManager_updateAllTpbBattlers','canMove','createBackgroundSprite','attackSpeed','_tpbCastTime','TurnOrder','casting','removeCurrentAction','preEndActionCTB','updateTurnCTB','isHorz','CtbTurnOrderClearEnemyGraphic','boxHeight','setCtbAfterSpeed','EnemyBattlerFaceName','Game_Battler_clearTpbChargeTime','placeGauge','constructor','ConvertParams','UpdateFrames','Game_BattlerBase_hide','svActorHorzCells','clearTpbChargeTime','setTurnOrderCTB','TurnOrderCTBGraphicType','addChildAt','loadFace','updateTpbCastTimeCTB','enemy','Window_StatusBase_placeGauge','isBattleSystemCTBTurnOrderVisible','tpbChargeTime','EnemyBattlerType','RepositionTopHelpY','addInnerChild','updateOpacity','bottom','ARRAYFUNC','clearTurnOrderCTBGraphics','ForceSubject','Weapon-%1-%2','EnemyBattlerDrawLetter','setBlendColor','isAnyBattlerReadyCTB','ctbTicksToGoal','OrderDirection','TpbAccelerationJS','name','_backgroundSprite','createTurnOrderCTBGraphicFaceIndex','onRestrict','allBattleMembers','changeCtbCastTime','Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.','actor','_isAlive','max','DeviceFriendly','JSON','ActorBattlerType','applyItemUserEffect','BorderThickness','initTpbChargeTimeCTB','CtbTurnOrderEnemyIcon','startActorInput','length','isTpb','BattleManager_isActiveTpb','BattleSystemCTB','1546860CGcxSI','setHue','528mCLzZu','Game_Battler_tpbRelativeSpeed','children','padding','hide','floor','#000000','createLetterSprite','_tpbTurnCount','Delay','Game_Action_applyGlobal','loadSvEnemy','concat','updateTurnOrderForSubject','checkOpacity','members','_inputting','ParseAllNotetags','Actor','faceIndex','isAttack','485496WMwMPX','parse','_ctbTurnOrderFaceName','ctbStopped','processUpdateGraphic','skills','%1FlashDuration','186508HZTHZd','face','initTpbChargeTime','isActiveTpb','traitObjects','gradientFillRect','tpbSpeed','SimilarAgi','BattleManager_battleSys','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Scene_Battle_selectNextCommand','isSubject','After','processAbort','BattleManager_updateTpb','BattleManager_processTurn','_scene','compareBattlerSprites','initBattleSystemCTB','changeCtbChargeTime','applyGlobal','processCtbAntiSoftlock','%1SystemBorder','isActing','Game_System_initialize','Class-%1-%2','getCtbCastTimeRate','containerPosition','updateGraphic','Item-%1-%2','rotateCTBSprite','createRateJS','_ctbTurnOrderIconIndex','TurnOrderCTBGraphicFaceName','processTurnCTB','ceil','%1BgColor2','faceHeight','updateTpbChargeTimeCTB','battlerHue','left','isRestricted','applyItemBattleSystemCTBUserEffect','BattlerRelativeSpeedJS','undecided','otherCtbChecksPassed','1984494fJCYTC','Order','loadEnemy','%1SystemBg','CtbTurnOrderActorFace','svactor','process_VisuMZ_BattleSystemCTB_JS_Notetags','_homeY','_actionState','rotateCTBSprites','battleSys','_plural','visible','_positionDuration','_actionBattlers','isAppeared','STR','repositionLogWindowCTB','item','find','ticksLeft','updateBattleContainerOrder','setBattleSystemCTBTurnOrderVisible','tpbAcceleration','includes','applyGlobalBattleSystemCTBEffects','checkPosition','Cast','right','call','_ctbTurnOrderFaceIndex','containerWindow','ParseItemNotetags','DisplayOffsetY','IconIndex','BattleManager_updateTurn','setText','Game_Battler_isTpbReady','Game_Battler_updateTpbCastTime','_unit','isTpbCharged','SubjectDistance','updateAllTpbBattlers','Settings','version','%1\x20%2\x20%3','faceWidth','startBattle','CTB','Enemy','fillRect','svActorVertCells','%1Mirror','checkTpbTurnEnd','faceName','Game_Battler_tpbAcceleration','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getBattleSystem','BattleManager_startBattle','createTurnOrderCTBGraphicFaceName','MAX_SAFE_INTEGER','_phase','update','clear','_letterSprite','processTurn','drawText','battleEnd','_positionTargetX','OrderJS','subject','isSceneBattle','changeIconGraphicBitmap','tpbRelativeSpeed','speed','ShowMarkerBorder','%1FlashColor','iconWidth','isCTB','TurnOrderCTBGraphicIconIndex','SpriteThin','_graphicSv','turn','Visible','isInputting','loadSystem','updateTurn','Game_Battler_updateTpbChargeTime','Mechanics','TurnOrderCTBGraphicFaceIndex','changeTurnOrderByCTB','isValid','RepositionLogWindow','format','FaceIndex','_anti_CTB_SoftlockCount','description','updateTpbBattler','map','Game_Battler_onRestrict','startFade','FUNC','createKeyJS','IconSet','EnemyBattlerFontSize','133905oksPKL','_statusWindow','Game_BattlerBase_appear','EnemyBattlerIcon','_windowLayer','_tpbChargeTime','updateTurnOrderCTB','VisuMZ_1_BattleCore','Game_Battler_tpbRequiredCastTime','setItem','Game_Action_applyItemUserEffect','updateTpbChargeTime','_tpbState','_graphicEnemy','time','ActorBattlerIcon','_ctbAfterSpeed','some'];_0x2ec2=function(){return _0x523e02;};return _0x2ec2();}