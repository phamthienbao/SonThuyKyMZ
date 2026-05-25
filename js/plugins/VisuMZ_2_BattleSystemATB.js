//=============================================================================
// VisuStella MZ - Battle System - ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.35] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
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
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
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
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
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
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
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
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
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
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 *     - Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
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
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
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
 * Marker Sprites
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
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
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
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
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
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * Version 1.36: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.35: October 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if an actor dies in battle and is revived post-battle
 *    using "Recover All", that actor no longer gets stuck after their first
 *    action in following battles. Fix made by Olivia.
 * 
 * Version 1.34: March 20, 2025
 * * Bug Fixes!
 * ** Field ATB Gauge no longer stays visible during victory sequence. Fix
 *    made by Olivia.
 * 
 * Version 1.33: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an actor softlock issue where if charm, berserk, and confusion can
 *    lock a 100% charged actor for Active ATB.
 * * Documentation Update!
 * ** Added extra clarification for Plugin Parameter "Stuns Reset Gauge?":
 * *** Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 * 
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a few features that bled over into CTB if the game project used
 *    both ATB and CTB battle systems simultaneously. Fix made by Olivia.
 * * Feature Update!
 * ** "Stuns Reset Gauge" set to "Don't Reset" should now work as expected for
 *    both actors and enemies, instead of just actors, while they are in the
 *    casting state. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.31: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where sideview battlers would have misplaced ATB gauge
 *    positions. Fix made by Olivia.
 * 
 * Version 1.30: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause multi-actions under restrictions to
 *    desynchronize skill speeds and result in softlocks. Fix made by Olivia.
 * ** Fixed an error that would cause slow speeds to all equal one another.
 *    Fix made by Olivia.
 * 
 * Version 1.29: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an error with casting times for battlers not working properly when
 *    the numeric values are too small. Fix made by Olivia.
 * 
 * Version 1.28: June 15, 2023
 * * Bug Fixes!
 * ** Crash should no longer occur for the end of ATB actions. Fix made
 *    by Olivia.
 * 
 * Version 1.27: May 18, 2023
 * * Bug Fixes!
 * ** Enemies no longer soft-lock themselves if they get stunned via a counter
 *    attack with an attack-state that applies stun. Fix made by Olivia.
 * 
 * Version 1.26: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused a clash when loaded together with certain
 *    combinations of plugins. Fix made by Olivia.
 * 
 * Version 1.25: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented initial ATB Gauge settings and features from
 *    working properly. Fix made by Irina.
 * 
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
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
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
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
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
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
 * @param BattleSystemATB
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
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"true","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default true
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
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
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
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
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
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
 * @text Marker Sprites
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
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
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
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
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
 * @default 1
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
 * @default 10
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
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x3fafb1=_0x3de7;(function(_0x331f27,_0x25593a){const _0xb2279a=_0x3de7,_0x2aa992=_0x331f27();while(!![]){try{const _0x4e2e7b=-parseInt(_0xb2279a(0x161))/0x1+-parseInt(_0xb2279a(0x92))/0x2*(parseInt(_0xb2279a(0x23a))/0x3)+parseInt(_0xb2279a(0x228))/0x4+-parseInt(_0xb2279a(0x13c))/0x5+parseInt(_0xb2279a(0x95))/0x6*(parseInt(_0xb2279a(0x246))/0x7)+parseInt(_0xb2279a(0x1ef))/0x8+parseInt(_0xb2279a(0xaa))/0x9;if(_0x4e2e7b===_0x25593a)break;else _0x2aa992['push'](_0x2aa992['shift']());}catch(_0x2451eb){_0x2aa992['push'](_0x2aa992['shift']());}}}(_0x2e1f,0x53b6b));var label='BattleSystemATB',tier=tier||0x0,dependencies=[_0x3fafb1(0xc7)],pluginData=$plugins[_0x3fafb1(0x193)](function(_0x34676b){const _0x5dd95f=_0x3fafb1;return _0x34676b['status']&&_0x34676b[_0x5dd95f(0x1f8)][_0x5dd95f(0x16a)]('['+label+']');})[0x0];VisuMZ[label][_0x3fafb1(0x9a)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3fafb1(0x1a9)]=function(_0x112ebe,_0x27f516){const _0x402697=_0x3fafb1;for(const _0x399640 in _0x27f516){if(_0x399640[_0x402697(0x1cc)](/(.*):(.*)/i)){const _0x1df6aa=String(RegExp['$1']),_0x433678=String(RegExp['$2'])[_0x402697(0x7d)]()[_0x402697(0x166)]();let _0x149d40,_0x2f41fc,_0x7d9309;switch(_0x433678){case _0x402697(0xa7):_0x149d40=_0x27f516[_0x399640]!==''?Number(_0x27f516[_0x399640]):0x0;break;case'ARRAYNUM':_0x2f41fc=_0x27f516[_0x399640]!==''?JSON[_0x402697(0x22d)](_0x27f516[_0x399640]):[],_0x149d40=_0x2f41fc['map'](_0x4e638c=>Number(_0x4e638c));break;case _0x402697(0x10f):_0x149d40=_0x27f516[_0x399640]!==''?eval(_0x27f516[_0x399640]):null;break;case _0x402697(0x163):_0x2f41fc=_0x27f516[_0x399640]!==''?JSON[_0x402697(0x22d)](_0x27f516[_0x399640]):[],_0x149d40=_0x2f41fc[_0x402697(0xb1)](_0x27fb0d=>eval(_0x27fb0d));break;case _0x402697(0x8c):_0x149d40=_0x27f516[_0x399640]!==''?JSON[_0x402697(0x22d)](_0x27f516[_0x399640]):'';break;case'ARRAYJSON':_0x2f41fc=_0x27f516[_0x399640]!==''?JSON['parse'](_0x27f516[_0x399640]):[],_0x149d40=_0x2f41fc[_0x402697(0xb1)](_0x112321=>JSON[_0x402697(0x22d)](_0x112321));break;case _0x402697(0xf7):_0x149d40=_0x27f516[_0x399640]!==''?new Function(JSON['parse'](_0x27f516[_0x399640])):new Function(_0x402697(0x242));break;case _0x402697(0x205):_0x2f41fc=_0x27f516[_0x399640]!==''?JSON[_0x402697(0x22d)](_0x27f516[_0x399640]):[],_0x149d40=_0x2f41fc[_0x402697(0xb1)](_0x463b67=>new Function(JSON[_0x402697(0x22d)](_0x463b67)));break;case _0x402697(0xa0):_0x149d40=_0x27f516[_0x399640]!==''?String(_0x27f516[_0x399640]):'';break;case _0x402697(0x116):_0x2f41fc=_0x27f516[_0x399640]!==''?JSON[_0x402697(0x22d)](_0x27f516[_0x399640]):[],_0x149d40=_0x2f41fc[_0x402697(0xb1)](_0x3eb87a=>String(_0x3eb87a));break;case _0x402697(0xe0):_0x7d9309=_0x27f516[_0x399640]!==''?JSON[_0x402697(0x22d)](_0x27f516[_0x399640]):{},_0x149d40=VisuMZ[_0x402697(0x1a9)]({},_0x7d9309);break;case _0x402697(0x10e):_0x2f41fc=_0x27f516[_0x399640]!==''?JSON['parse'](_0x27f516[_0x399640]):[],_0x149d40=_0x2f41fc['map'](_0x3b392b=>VisuMZ['ConvertParams']({},JSON[_0x402697(0x22d)](_0x3b392b)));break;default:continue;}_0x112ebe[_0x1df6aa]=_0x149d40;}}return _0x112ebe;},(_0x139307=>{const _0x9c5079=_0x3fafb1,_0x176bc6=_0x139307[_0x9c5079(0x197)];for(const _0x3e34e9 of dependencies){if(!Imported[_0x3e34e9]){alert(_0x9c5079(0x21b)['format'](_0x176bc6,_0x3e34e9)),SceneManager['exit']();break;}}const _0x24e473=_0x139307['description'];if(_0x24e473[_0x9c5079(0x1cc)](/\[Version[ ](.*?)\]/i)){const _0x550fa6=Number(RegExp['$1']);_0x550fa6!==VisuMZ[label][_0x9c5079(0x23e)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x9c5079(0xf4)](_0x176bc6,_0x550fa6)),SceneManager[_0x9c5079(0x15b)]());}if(_0x24e473['match'](/\[Tier[ ](\d+)\]/i)){const _0xe70697=Number(RegExp['$1']);_0xe70697<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x9c5079(0xf4)](_0x176bc6,_0xe70697,tier)),SceneManager['exit']()):tier=Math['max'](_0xe70697,tier);}VisuMZ[_0x9c5079(0x1a9)](VisuMZ[label]['Settings'],_0x139307[_0x9c5079(0x1ed)]);})(pluginData),PluginManager[_0x3fafb1(0x1ad)](pluginData[_0x3fafb1(0x197)],'FieldGaugeActorIcon',_0x2b3d43=>{const _0xd9567d=_0x3fafb1;VisuMZ[_0xd9567d(0x1a9)](_0x2b3d43,_0x2b3d43);const _0x30aca2=_0x2b3d43[_0xd9567d(0x8d)],_0x4894eb=_0x2b3d43[_0xd9567d(0x8a)];for(const _0x3ef9d4 of _0x30aca2){const _0x527ee2=$gameActors['actor'](_0x3ef9d4);if(!_0x527ee2)continue;_0x527ee2[_0xd9567d(0x17d)]=_0xd9567d(0x18a),_0x527ee2['_fieldAtbGaugeIconIndex']=_0x4894eb;}}),PluginManager[_0x3fafb1(0x1ad)](pluginData[_0x3fafb1(0x197)],_0x3fafb1(0x122),_0x235589=>{const _0x1c6475=_0x3fafb1;VisuMZ[_0x1c6475(0x1a9)](_0x235589,_0x235589);const _0x118839=_0x235589[_0x1c6475(0x8d)],_0x44ad53=_0x235589[_0x1c6475(0x1d7)],_0x4719e7=_0x235589[_0x1c6475(0x1ce)];for(const _0x54d83a of _0x118839){const _0x846c42=$gameActors[_0x1c6475(0xb4)](_0x54d83a);if(!_0x846c42)continue;_0x846c42[_0x1c6475(0x17d)]='face',_0x846c42[_0x1c6475(0xd4)]=_0x44ad53,_0x846c42[_0x1c6475(0x1f6)]=_0x4719e7;}}),PluginManager['registerCommand'](pluginData['name'],_0x3fafb1(0x7f),_0x1f7e74=>{const _0x1a7818=_0x3fafb1;VisuMZ[_0x1a7818(0x1a9)](_0x1f7e74,_0x1f7e74);const _0x4de21a=_0x1f7e74['Actors'];for(const _0x5af6cf of _0x4de21a){const _0x52c102=$gameActors[_0x1a7818(0xb4)](_0x5af6cf);if(!_0x52c102)continue;_0x52c102[_0x1a7818(0xbf)]();}}),PluginManager['registerCommand'](pluginData[_0x3fafb1(0x197)],_0x3fafb1(0x107),_0x481c6d=>{const _0x302057=_0x3fafb1;VisuMZ['ConvertParams'](_0x481c6d,_0x481c6d);const _0x31e3b6=_0x481c6d[_0x302057(0xbb)],_0x17a8fa=_0x481c6d[_0x302057(0x8a)];for(const _0x792067 of _0x31e3b6){const _0x558256=$gameTroop[_0x302057(0xbd)]()[_0x792067];if(!_0x558256)continue;_0x558256[_0x302057(0x17d)]=_0x302057(0x18a),_0x558256[_0x302057(0x221)]=_0x17a8fa;}}),PluginManager['registerCommand'](pluginData[_0x3fafb1(0x197)],_0x3fafb1(0x19a),_0x217ae6=>{const _0x2765b3=_0x3fafb1;VisuMZ['ConvertParams'](_0x217ae6,_0x217ae6);const _0x4501b6=_0x217ae6[_0x2765b3(0xbb)],_0x3d47af=_0x217ae6[_0x2765b3(0x1d7)],_0x25db93=_0x217ae6[_0x2765b3(0x1ce)];for(const _0x2bda1a of _0x4501b6){const _0x561a90=$gameTroop['members']()[_0x2bda1a];if(!_0x561a90)continue;_0x561a90[_0x2765b3(0x17d)]=_0x2765b3(0x17a),_0x561a90[_0x2765b3(0xd4)]=_0x3d47af,_0x561a90[_0x2765b3(0x1f6)]=_0x25db93;}}),PluginManager['registerCommand'](pluginData[_0x3fafb1(0x197)],_0x3fafb1(0x20a),_0x54367b=>{const _0x43f368=_0x3fafb1;VisuMZ[_0x43f368(0x1a9)](_0x54367b,_0x54367b);const _0x2c09d3=_0x54367b['Enemies'];for(const _0x2d02e9 of _0x2c09d3){const _0x4e20a8=$gameTroop['members']()[_0x2d02e9];if(!_0x4e20a8)continue;_0x4e20a8['clearFieldAtbGraphics']();}}),PluginManager[_0x3fafb1(0x1ad)](pluginData['name'],_0x3fafb1(0x15d),_0x3d5ac1=>{const _0x16db7b=_0x3fafb1;VisuMZ[_0x16db7b(0x1a9)](_0x3d5ac1,_0x3d5ac1);const _0x11b524=_0x3d5ac1['Visible'];$gameSystem['setBattleSystemATBFieldGaugeVisible'](_0x11b524);}),VisuMZ[_0x3fafb1(0x96)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x3fafb1(0x160)][_0x3fafb1(0x136)],Scene_Boot['prototype'][_0x3fafb1(0x136)]=function(){const _0x32a572=_0x3fafb1;this[_0x32a572(0x7b)](),VisuMZ[_0x32a572(0x96)][_0x32a572(0x148)][_0x32a572(0x195)](this),this[_0x32a572(0x186)]();},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x18f)]={},Scene_Boot['prototype'][_0x3fafb1(0x7b)]=function(){const _0x103391=_0x3fafb1,_0xbc810d=VisuMZ[_0x103391(0x18d)][_0x103391(0x18f)],_0x106ac3=_0x103391(0x1b5),_0xb7856d=[_0x103391(0x1d8),_0x103391(0x1d2),_0x103391(0x203)];for(const _0x35c3a7 of _0xb7856d){const _0x36181c=_0x106ac3[_0x103391(0xf4)](_0x35c3a7[_0x103391(0x7d)]()['trim'](),_0x103391(0x11c),'(?:GAUGE|TIME|SPEED)'),_0x2cbeee=new RegExp(_0x36181c,'i');VisuMZ[_0x103391(0x96)][_0x103391(0x18f)][_0x35c3a7]=_0x2cbeee;}},Scene_Boot[_0x3fafb1(0x160)]['process_VisuMZ_BattleSystemATB_JS_Notetags']=function(){const _0x21dfbf=_0x3fafb1;if(VisuMZ[_0x21dfbf(0xad)])return;const _0x244108=$dataSkills[_0x21dfbf(0x138)]($dataItems);for(const _0x1ce1fe of _0x244108){if(!_0x1ce1fe)continue;VisuMZ['BattleSystemATB'][_0x21dfbf(0x9c)](_0x1ce1fe);}},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x1a7)]=VisuMZ[_0x3fafb1(0x1a7)],VisuMZ[_0x3fafb1(0x1a7)]=function(_0x3e990f){const _0x315b2b=_0x3fafb1;VisuMZ['BattleSystemATB']['ParseSkillNotetags'][_0x315b2b(0x195)](this,_0x3e990f),VisuMZ[_0x315b2b(0x96)]['Parse_Notetags_CreateJS'](_0x3e990f);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x9f)]=VisuMZ[_0x3fafb1(0x9f)],VisuMZ[_0x3fafb1(0x9f)]=function(_0x2ee41c){const _0x2768d0=_0x3fafb1;VisuMZ[_0x2768d0(0x96)][_0x2768d0(0x9f)][_0x2768d0(0x195)](this,_0x2ee41c),VisuMZ[_0x2768d0(0x96)][_0x2768d0(0x9c)](_0x2ee41c);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x9c)]=function(_0x169e00){const _0x26e5d2=_0x3fafb1,_0xa17c30=[_0x26e5d2(0x1d8),_0x26e5d2(0x1d2),_0x26e5d2(0x203)];for(const _0x2f8d5e of _0xa17c30){VisuMZ['BattleSystemATB'][_0x26e5d2(0x77)](_0x169e00,_0x2f8d5e);}},VisuMZ[_0x3fafb1(0x96)]['JS']={},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x77)]=function(_0x373384,_0x56ef32){const _0x2a1dab=_0x3fafb1,_0x451ef3=_0x373384[_0x2a1dab(0x1c2)];if(_0x451ef3[_0x2a1dab(0x1cc)](VisuMZ['BattleSystemATB'][_0x2a1dab(0x18f)][_0x56ef32])){const _0x1b5c28=String(RegExp['$1']),_0x5b05a7=_0x2a1dab(0x1d1)[_0x2a1dab(0xf4)](_0x1b5c28,_0x56ef32),_0x1087e2=VisuMZ['BattleSystemATB']['createKeyJS'](_0x373384,_0x56ef32);VisuMZ['BattleSystemATB']['JS'][_0x1087e2]=new Function(_0x5b05a7);}},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x153)]=function(_0x48d2db,_0x534e74){const _0xfcd6f3=_0x3fafb1;if(VisuMZ[_0xfcd6f3(0x153)])return VisuMZ[_0xfcd6f3(0x153)](_0x48d2db,_0x534e74);let _0x51f0d2='';if($dataActors[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2=_0xfcd6f3(0x211)[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);if($dataClasses[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2=_0xfcd6f3(0xf9)[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);if($dataSkills[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2='Skill-%1-%2'[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);if($dataItems['includes'](_0x48d2db))_0x51f0d2=_0xfcd6f3(0xf8)[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);if($dataWeapons[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2=_0xfcd6f3(0x139)[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);if($dataArmors[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2=_0xfcd6f3(0xd6)['format'](_0x48d2db['id'],_0x534e74);if($dataEnemies[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2=_0xfcd6f3(0x1be)[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);if($dataStates[_0xfcd6f3(0x16a)](_0x48d2db))_0x51f0d2=_0xfcd6f3(0x93)[_0xfcd6f3(0xf4)](_0x48d2db['id'],_0x534e74);return _0x51f0d2;},ConfigManager[_0x3fafb1(0xb5)]=!![],VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x175)]=ConfigManager[_0x3fafb1(0x212)],ConfigManager[_0x3fafb1(0x212)]=function(){const _0x36afac=_0x3fafb1,_0x17e580=VisuMZ['BattleSystemATB'][_0x36afac(0x175)][_0x36afac(0x195)](this);return _0x17e580[_0x36afac(0xb5)]=this['visualAtbGauge'],_0x17e580;},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x179)]=ConfigManager[_0x3fafb1(0xef)],ConfigManager[_0x3fafb1(0xef)]=function(_0xa61175){const _0x598aa7=_0x3fafb1;VisuMZ[_0x598aa7(0x96)][_0x598aa7(0x179)][_0x598aa7(0x195)](this,_0xa61175),_0x598aa7(0xb5)in _0xa61175?this[_0x598aa7(0xb5)]=_0xa61175[_0x598aa7(0xb5)]:this[_0x598aa7(0xb5)]=!![];},ImageManager[_0x3fafb1(0x90)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x3fafb1(0x182)]=ImageManager[_0x3fafb1(0x182)]||0x6,TextManager[_0x3fafb1(0xb5)]=VisuMZ['BattleSystemATB'][_0x3fafb1(0x9a)]['Options'][_0x3fafb1(0x21a)],VisuMZ[_0x3fafb1(0x96)]['ColorManager_loadWindowskin']=ColorManager[_0x3fafb1(0x234)],ColorManager[_0x3fafb1(0x234)]=function(){const _0x35aba0=_0x3fafb1;VisuMZ['BattleSystemATB'][_0x35aba0(0x17e)]['call'](this),this[_0x35aba0(0x1aa)][_0x35aba0(0x1f5)](this[_0x35aba0(0x169)][_0x35aba0(0x20e)](this));},ColorManager[_0x3fafb1(0x1b0)]=function(_0x495525){const _0x43333a=_0x3fafb1;return _0x495525=String(_0x495525),_0x495525[_0x43333a(0x1cc)](/#(.*)/i)?_0x43333a(0xbe)[_0x43333a(0xf4)](String(RegExp['$1'])):this[_0x43333a(0xd9)](Number(_0x495525));},ColorManager[_0x3fafb1(0x169)]=function(){const _0x539b76=_0x3fafb1,_0xaf4acd=[_0x539b76(0x102),_0x539b76(0x11e),_0x539b76(0x1f9),_0x539b76(0x190),'slow',_0x539b76(0x17c)],_0x3c7fbd=VisuMZ['BattleSystemATB'][_0x539b76(0x9a)][_0x539b76(0xd5)];this['_atbColors']={};for(const _0x303794 of _0xaf4acd){for(let _0x50042b=0x1;_0x50042b<=0x2;_0x50042b++){const _0xddab91=_0x303794+_0x50042b;this[_0x539b76(0x208)][_0xddab91]=this[_0x539b76(0x1b0)](_0x3c7fbd[_0xddab91]);}}},ColorManager[_0x3fafb1(0x85)]=function(_0x177c3b){const _0x1ace03=_0x3fafb1;if(this[_0x1ace03(0x208)]===undefined)this[_0x1ace03(0x169)]();return this[_0x1ace03(0x208)][_0x177c3b]||'#000000';},SceneManager[_0x3fafb1(0x97)]=function(){const _0x204e08=_0x3fafb1;return this['_scene']&&this[_0x204e08(0x10b)]['constructor']===Scene_Battle;},BattleManager[_0x3fafb1(0x74)]=function(){const _0x470a42=_0x3fafb1;if(Imported[_0x470a42(0xdb)]&&this[_0x470a42(0x1e9)]())return![];return this[_0x470a42(0x162)]();},VisuMZ[_0x3fafb1(0x96)]['BattleManager_isActiveTpb']=BattleManager['isActiveTpb'],BattleManager['isActiveTpb']=function(){const _0x5bd10a=_0x3fafb1;if(!this[_0x5bd10a(0x162)]())return![];else return ConfigManager&&ConfigManager[_0x5bd10a(0xe1)]!==undefined?ConfigManager[_0x5bd10a(0xe1)]:VisuMZ['BattleSystemATB'][_0x5bd10a(0x1d3)][_0x5bd10a(0x195)](this);},VisuMZ['BattleSystemATB']['Game_System_initialize']=Game_System[_0x3fafb1(0x160)][_0x3fafb1(0x13a)],Game_System[_0x3fafb1(0x160)][_0x3fafb1(0x13a)]=function(){const _0x2280a5=_0x3fafb1;VisuMZ[_0x2280a5(0x96)][_0x2280a5(0xd2)][_0x2280a5(0x195)](this),this['initBattleSystemATB']();},Game_System[_0x3fafb1(0x160)][_0x3fafb1(0x1f1)]=function(){const _0x489aee=_0x3fafb1;this[_0x489aee(0xdd)]=!![];},Game_System[_0x3fafb1(0x160)][_0x3fafb1(0x7e)]=function(){const _0x4cbda1=_0x3fafb1;return this['_atbFieldGaugeVisible']===undefined&&this[_0x4cbda1(0x1f1)](),this[_0x4cbda1(0xdd)];},Game_System[_0x3fafb1(0x160)][_0x3fafb1(0x22e)]=function(_0x5dd81f){const _0x394912=_0x3fafb1;this[_0x394912(0xdd)]===undefined&&this[_0x394912(0x1f1)](),this['_atbFieldGaugeVisible']=_0x5dd81f;},VisuMZ['BattleSystemATB']['Game_Action_applyItemUserEffect']=Game_Action[_0x3fafb1(0x160)][_0x3fafb1(0xba)],Game_Action['prototype'][_0x3fafb1(0xba)]=function(_0x2ccfca){const _0x542154=_0x3fafb1;VisuMZ[_0x542154(0x96)][_0x542154(0x94)][_0x542154(0x195)](this,_0x2ccfca),this[_0x542154(0x120)](_0x2ccfca);},Game_Action[_0x3fafb1(0x160)][_0x3fafb1(0x120)]=function(_0x46f96e){const _0x2ab22d=_0x3fafb1;if(!SceneManager[_0x2ab22d(0x97)]())return;if(!BattleManager[_0x2ab22d(0x74)]())return;if(this['item']())this[_0x2ab22d(0x12e)](_0x46f96e);},Game_Action[_0x3fafb1(0x160)][_0x3fafb1(0x12e)]=function(_0x4e3ceb){const _0x567e7d=_0x3fafb1,_0x29135a=this[_0x567e7d(0x15a)]()['note'];if(_0x4e3ceb['isAtbChargingState']()){const _0x321f8d=VisuMZ['BattleSystemATB']['createKeyJS'](this['item'](),_0x567e7d(0x1d8));if(VisuMZ[_0x567e7d(0x96)]['JS'][_0x321f8d]){const _0x3d57bb=VisuMZ[_0x567e7d(0x96)]['JS'][_0x321f8d][_0x567e7d(0x195)](this,this[_0x567e7d(0x1e6)](),_0x4e3ceb);_0x4e3ceb[_0x567e7d(0x11b)](_0x3d57bb);}_0x29135a[_0x567e7d(0x1cc)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x4e3ceb['setAtbChargeTime'](Number(RegExp['$1'])*0.01),_0x29135a[_0x567e7d(0x1cc)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x4e3ceb['changeAtbChargeTime'](Number(RegExp['$1'])*0.01);}else{if(_0x4e3ceb['isAtbCastingState']()){const _0x3dff8d=VisuMZ[_0x567e7d(0x96)]['createKeyJS'](this[_0x567e7d(0x15a)](),_0x567e7d(0x1d2));if(VisuMZ['BattleSystemATB']['JS'][_0x3dff8d]){const _0x473356=VisuMZ[_0x567e7d(0x96)]['JS'][_0x3dff8d]['call'](this,this[_0x567e7d(0x1e6)](),_0x4e3ceb);_0x4e3ceb[_0x567e7d(0x9b)](_0x473356);}_0x29135a[_0x567e7d(0x1cc)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x4e3ceb[_0x567e7d(0x9b)](Number(RegExp['$1'])*0.01),_0x29135a[_0x567e7d(0x1cc)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x4e3ceb[_0x567e7d(0x241)](Number(RegExp['$1'])*0.01),_0x29135a[_0x567e7d(0x1cc)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x4e3ceb[_0x567e7d(0x229)]();}}},VisuMZ[_0x3fafb1(0x96)]['Game_Action_applyGlobal']=Game_Action[_0x3fafb1(0x160)][_0x3fafb1(0x1fc)],Game_Action[_0x3fafb1(0x160)][_0x3fafb1(0x1fc)]=function(){const _0x3e8de5=_0x3fafb1;VisuMZ[_0x3e8de5(0x96)][_0x3e8de5(0xe9)][_0x3e8de5(0x195)](this),this[_0x3e8de5(0x12c)]();},Game_Action[_0x3fafb1(0x160)]['applyGlobalBattleSystemATBEffects']=function(){const _0x11c69a=_0x3fafb1;if(!this[_0x11c69a(0x15a)]())return;if(!BattleManager[_0x11c69a(0x74)]())return;const _0x7fb80c=this[_0x11c69a(0x15a)]()[_0x11c69a(0x1c2)];let _0x3edca1=0x0;this[_0x11c69a(0x126)]&&(_0x3edca1=this[_0x11c69a(0x1e6)]()[_0x11c69a(0x20c)]);const _0x4a9fdb=VisuMZ[_0x11c69a(0x96)][_0x11c69a(0x153)](this[_0x11c69a(0x15a)](),_0x11c69a(0x203));VisuMZ[_0x11c69a(0x96)]['JS'][_0x4a9fdb]&&(_0x3edca1=VisuMZ[_0x11c69a(0x96)]['JS'][_0x4a9fdb][_0x11c69a(0x195)](this,this[_0x11c69a(0x1e6)](),this['subject']()));let _0xd12aa=this[_0x11c69a(0x15a)]()[_0x11c69a(0x1b2)]>0x0?this['item']()[_0x11c69a(0x1b2)]:0x0;if(this[_0x11c69a(0xb8)]())_0xd12aa+=this[_0x11c69a(0x1e6)]()[_0x11c69a(0xd8)]();_0x3edca1+=(_0xd12aa/0xfa0)['clamp'](0x0,0x1);this[_0x11c69a(0x15a)]()[_0x11c69a(0x1c2)]['match'](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x3edca1=Number(RegExp['$1'])*0.01);const _0xb516e2=this[_0x11c69a(0x1e6)]()[_0x11c69a(0x194)]()['concat'](this[_0x11c69a(0x1e6)]()[_0x11c69a(0x226)]()),_0x54f3d8=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x432aa7=_0xb516e2['map'](_0x16ba51=>_0x16ba51&&_0x16ba51[_0x11c69a(0x1c2)]['match'](_0x54f3d8)?Number(RegExp['$1'])*0.01:0x0);_0x3edca1=_0x432aa7[_0x11c69a(0x117)]((_0x18b4b0,_0x14ad7f)=>_0x18b4b0+_0x14ad7f,_0x3edca1),this[_0x11c69a(0x15a)]()[_0x11c69a(0x1c2)][_0x11c69a(0x1cc)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x3edca1=0xa),this[_0x11c69a(0x1e6)]()['setAtbAfterSpeed'](_0x3edca1);},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x11b)]=function(_0x3df94f){const _0x46bf3d=_0x3fafb1;this[_0x46bf3d(0x20c)]=_0x3df94f[_0x46bf3d(0x1ca)](0x0,0x1);},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x15c)]=function(_0x5e5354){const _0x99857a=_0x3fafb1;this[_0x99857a(0x11b)](this[_0x99857a(0x20c)]+_0x5e5354);},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x9b)]=function(_0x208aad){const _0x536896=_0x3fafb1,_0x2218bc=this[_0x536896(0xc3)]();this[_0x536896(0x206)]=(_0x2218bc*_0x208aad)[_0x536896(0x1ca)](0x0,_0x2218bc);},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x241)]=function(_0x214aee){const _0x518395=_0x3fafb1,_0x240f4b=this['tpbRequiredCastTime'](),_0x798ff7=_0x240f4b*_0x214aee;this[_0x518395(0x206)]=(this[_0x518395(0x206)]+_0x798ff7)[_0x518395(0x1ca)](0x0,_0x240f4b);},VisuMZ['BattleSystemATB'][_0x3fafb1(0x16f)]=Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x20d)],Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x20d)]=function(){const _0x4f6a27=_0x3fafb1;VisuMZ[_0x4f6a27(0x96)][_0x4f6a27(0x16f)][_0x4f6a27(0x195)](this),BattleManager[_0x4f6a27(0x74)]()&&this['clearTpbChargeTime']();},VisuMZ['BattleSystemATB']['Game_BattlerBase_revive']=Game_BattlerBase['prototype'][_0x3fafb1(0x111)],Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x111)]=function(){const _0x27d5b1=_0x3fafb1;VisuMZ[_0x27d5b1(0x96)][_0x27d5b1(0x1a8)]['call'](this),BattleManager[_0x27d5b1(0x74)]()&&this['clearTpbChargeTime']();},VisuMZ['BattleSystemATB'][_0x3fafb1(0x14c)]=Game_BattlerBase['prototype'][_0x3fafb1(0x6e)],Game_BattlerBase['prototype'][_0x3fafb1(0x6e)]=function(){const _0x2c3207=_0x3fafb1,_0x223023=this[_0x2c3207(0xb2)]();VisuMZ[_0x2c3207(0x96)]['Game_BattlerBase_recoverAll']['call'](this),_0x223023&&!this['isDead']()&&(this[_0x2c3207(0x237)](),this[_0x2c3207(0xaf)]=undefined);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x1ae)]=Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x1b6)],Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x1b6)]=function(){const _0x97b75b=_0x3fafb1,_0x5aac43=this[_0x97b75b(0x1d9)]&&this[_0x97b75b(0xb2)]();VisuMZ[_0x97b75b(0x96)][_0x97b75b(0x1ae)]['call'](this),_0x5aac43&&!this[_0x97b75b(0xb2)]()&&(this[_0x97b75b(0x237)](),this['_onRestrictBypassAtbReset']=undefined);},VisuMZ[_0x3fafb1(0x96)]['Game_Battler_initTpbChargeTime']=Game_Battler['prototype']['initTpbChargeTime'],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x110)]=function(_0x4f1430){const _0x3dfa21=_0x3fafb1;BattleManager[_0x3dfa21(0x74)]()?(this['initTpbChargeTimeATB'](_0x4f1430),isNaN(this[_0x3dfa21(0x20c)])&&(this['initTpbChargeTimeATB'](_0x4f1430),isNaN(this[_0x3dfa21(0x20c)])&&(this[_0x3dfa21(0x20c)]=0x0)),this['_onRestrictBypassAtbReset']=undefined):VisuMZ[_0x3dfa21(0x96)][_0x3dfa21(0x151)][_0x3dfa21(0x195)](this,_0x4f1430);},Game_Battler['prototype'][_0x3fafb1(0x99)]=function(_0x4bd1dc){const _0x422601=_0x3fafb1,_0x4c45cc=VisuMZ['BattleSystemATB'][_0x422601(0x9a)][_0x422601(0x1c5)];let _0x3b6185=this[_0x422601(0x1d6)]()*eval(_0x4c45cc['InitialGaugeJS']);const _0x5975cf=this[_0x422601(0x194)]()[_0x422601(0x138)](this[_0x422601(0x226)]()),_0x53df48=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x21124f=_0x5975cf[_0x422601(0xb1)](_0xc8e5b3=>_0xc8e5b3&&_0xc8e5b3[_0x422601(0x1c2)][_0x422601(0x1cc)](_0x53df48)?Number(RegExp['$1'])*0.01:0x0);_0x3b6185=_0x21124f[_0x422601(0x117)]((_0x10a41c,_0xcfb7c2)=>_0x10a41c+_0xcfb7c2,_0x3b6185),this[_0x422601(0xde)]=_0x422601(0x156),this[_0x422601(0x20c)]=(_0x4bd1dc?0x1:_0x3b6185)[_0x422601(0x1ca)](0x0,0x1),this['isRestricted']()&&(this[_0x422601(0x20c)]=0x0);},Game_Battler[_0x3fafb1(0x160)]['isAtbChargingState']=function(){const _0x407686=_0x3fafb1;return this[_0x407686(0xde)]==='charging';},Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x201)]=function(){const _0x184d27=_0x3fafb1;return this[_0x184d27(0xde)]===_0x184d27(0x1f0)&&this[_0x184d27(0xd3)]()&&this[_0x184d27(0xd3)]()[_0x184d27(0x15a)]()&&this['currentAction']()[_0x184d27(0x15a)]()['speed']<0x0;},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0xc1)]=function(){const _0x309b70=_0x3fafb1;return this[_0x309b70(0x201)]()?this[_0x309b70(0x206)]/this[_0x309b70(0xc3)]():0x0;},Game_Battler['prototype'][_0x3fafb1(0x1c9)]=function(){return!this['canMove']();},Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x130)]=function(_0x644314){const _0x2a3753=_0x3fafb1;this[_0x2a3753(0x232)]=_0x644314;},VisuMZ['BattleSystemATB'][_0x3fafb1(0x134)]=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x224)],Game_Battler[_0x3fafb1(0x160)]['updateTpbChargeTime']=function(){const _0x25e737=_0x3fafb1;VisuMZ[_0x25e737(0x96)]['Game_Battler_updateTpbChargeTime'][_0x25e737(0x195)](this),BattleManager['isATB']()&&this[_0x25e737(0xde)]==='charging'&&(isNaN(this[_0x25e737(0x20c)])&&(this['_tpbChargeTime']=this[_0x25e737(0x154)](),isNaN(this[_0x25e737(0x20c)])&&(this[_0x25e737(0x20c)]=0x0)));},VisuMZ[_0x3fafb1(0x96)]['BattleManager_endBattlerActions']=BattleManager[_0x3fafb1(0x1e2)],BattleManager['endBattlerActions']=function(_0x1ee659){const _0x2c64e7=_0x3fafb1;this[_0x2c64e7(0x74)]()&&!_0x1ee659[_0x2c64e7(0x18c)]()&&(_0x1ee659[_0x2c64e7(0xaf)]=!![]),VisuMZ[_0x2c64e7(0x96)]['BattleManager_endBattlerActions'][_0x2c64e7(0x195)](this,_0x1ee659),_0x1ee659[_0x2c64e7(0x137)]()&&this['isATB']()&&!_0x1ee659[_0x2c64e7(0x18c)]()&&(_0x1ee659[_0x2c64e7(0xaf)]=![]);},VisuMZ[_0x3fafb1(0x96)]['Game_Battler_clearTpbChargeTime']=Game_Battler['prototype'][_0x3fafb1(0x237)],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x237)]=function(){const _0x1820a0=_0x3fafb1;if(this['_onRestrictBypassAtbReset'])return;VisuMZ['BattleSystemATB'][_0x1820a0(0xf5)][_0x1820a0(0x195)](this),this['_tpbChargeTime']+=this[_0x1820a0(0x232)]||0x0;},Game_Battler['prototype']['atbInterrupt']=function(){const _0x46b99f=_0x3fafb1;if(!this[_0x46b99f(0x201)]())return;if(!this[_0x46b99f(0xd3)]())return;if(!this['currentAction']()[_0x46b99f(0x15a)]())return;if(this[_0x46b99f(0xd3)]()[_0x46b99f(0x15a)]()[_0x46b99f(0x1c2)][_0x46b99f(0x1cc)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x46b99f(0x167)](),this[_0x46b99f(0x237)](),this[_0x46b99f(0x206)]=0x0,this['onAtbInterrupt']();},Game_Battler['prototype'][_0x3fafb1(0x10d)]=function(){const _0x4e4190=_0x3fafb1,_0x31b984=VisuMZ[_0x4e4190(0x96)][_0x4e4190(0x9a)][_0x4e4190(0x1a0)];if(Imported[_0x4e4190(0x225)]){const _0x1e5918=_0x31b984['InterruptAnimationID'],_0x1a1813=_0x31b984[_0x4e4190(0x129)],_0x179a45=_0x31b984['InterruptMute'];$gameTemp[_0x4e4190(0xa2)]([this],_0x1e5918,_0x1a1813,_0x179a45);}if(this['battler']()&&_0x31b984['InterruptText'][_0x4e4190(0xc9)]>0x0){const _0x58946e=_0x31b984['InterruptText'],_0x1a3869={'textColor':ColorManager[_0x4e4190(0x1b0)](_0x31b984[_0x4e4190(0xb3)]),'flashColor':_0x31b984['InterruptFlashColor'],'flashDuration':_0x31b984['InterruptFlashDuration']};this[_0x4e4190(0x11f)](_0x58946e,_0x1a3869);}},VisuMZ['BattleSystemATB']['Game_Battler_startTpbCasting']=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x75)],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x75)]=function(){const _0x22b1ae=_0x3fafb1;VisuMZ[_0x22b1ae(0x96)][_0x22b1ae(0xee)][_0x22b1ae(0x195)](this),BattleManager[_0x22b1ae(0x74)]()&&(this[_0x22b1ae(0x206)]>=this[_0x22b1ae(0xc3)]()&&(this[_0x22b1ae(0xde)]=_0x22b1ae(0x1c4)));},VisuMZ['BattleSystemATB'][_0x3fafb1(0x1dc)]=Game_Unit[_0x3fafb1(0x160)][_0x3fafb1(0x172)],Game_Unit['prototype']['updateTpb']=function(){const _0x39babe=_0x3fafb1;if(BattleManager[_0x39babe(0x74)]()){if(BattleManager[_0x39babe(0x216)]()[_0x39babe(0x14a)](_0x485f6e=>_0x485f6e&&_0x485f6e[_0x39babe(0xa6)]()&&_0x485f6e[_0x39babe(0x219)]()&&_0x485f6e[_0x39babe(0xde)]===_0x39babe(0x1c4)))return;}VisuMZ[_0x39babe(0x96)][_0x39babe(0x1dc)][_0x39babe(0x195)](this);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x1d0)]=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0xdc)],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0xdc)]=function(){const _0x46f696=_0x3fafb1,_0x3fe70c=VisuMZ[_0x46f696(0x96)][_0x46f696(0x9a)][_0x46f696(0x1c5)],_0x2350a0=this[_0x46f696(0x1f7)]();!_0x3fe70c[_0x46f696(0x243)]&&_0x2350a0>=0x4&&(this[_0x46f696(0xaf)]=BattleManager[_0x46f696(0x74)]()),VisuMZ['BattleSystemATB']['Game_Battler_onRestrict'][_0x46f696(0x195)](this),BattleManager['isATB']()&&this[_0x46f696(0xde)]===_0x46f696(0x14f)&&this[_0x46f696(0x137)]()&&(this[_0x46f696(0x68)]=!![]),this[_0x46f696(0xaf)]=undefined;},VisuMZ[_0x3fafb1(0x96)]['Game_Battler_clearActions']=Game_Battler['prototype'][_0x3fafb1(0x167)],Game_Battler['prototype'][_0x3fafb1(0x167)]=function(){const _0x2b444c=_0x3fafb1;if(this['_onRestrictBypassAtbReset']&&BattleManager['isATB']())return;VisuMZ[_0x2b444c(0x96)][_0x2b444c(0x1a3)][_0x2b444c(0x195)](this);},VisuMZ['BattleSystemATB']['Game_Battler_removeState']=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0xd0)],Game_Battler[_0x3fafb1(0x160)]['removeState']=function(_0x2b1b2b){const _0x3a69b6=_0x3fafb1,_0x18d8cc=!this[_0x3a69b6(0x18c)]()&&BattleManager[_0x3a69b6(0x74)](),_0x4aa5ee=this[_0x3a69b6(0x209)](_0x2b1b2b);VisuMZ['BattleSystemATB'][_0x3a69b6(0xc5)][_0x3a69b6(0x195)](this,_0x2b1b2b);if(!BattleManager[_0x3a69b6(0x74)]())return;if(this[_0x3a69b6(0x137)]()&&_0x4aa5ee&&!this[_0x3a69b6(0x209)](_0x2b1b2b))_0x18d8cc&&this[_0x3a69b6(0x18c)]()&&this[_0x3a69b6(0x68)]&&(this[_0x3a69b6(0x237)](),this['clearActions'](),this[_0x3a69b6(0x206)]=0x0),this[_0x3a69b6(0x12f)](_0x3a69b6(0xfc));else _0x18d8cc&&this[_0x3a69b6(0x18c)]()&&this[_0x3a69b6(0xc0)]()<=0x0&&(this[_0x3a69b6(0x213)](),this[_0x3a69b6(0xde)]=_0x3a69b6(0x156),this[_0x3a69b6(0xaf)]=undefined);},Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x192)]=function(){const _0x4a4de1=_0x3fafb1;this['processBattleCoreJS'](_0x4a4de1(0xd1)),this[_0x4a4de1(0x19e)]=![],this['_tpbTurnCount']++,this[_0x4a4de1(0xa3)]=0x0,this[_0x4a4de1(0x240)]()&&this[_0x4a4de1(0x124)](),this['processBattleCoreJS'](_0x4a4de1(0x142));},Game_Battler[_0x3fafb1(0x160)]['canMakeTpbActionsAtStartTpbTurn']=function(){const _0x17ccc3=_0x3fafb1;if(this[_0x17ccc3(0xc0)]()!==0x0)return![];if(BattleManager[_0x17ccc3(0x74)]()){if(this[_0x17ccc3(0x137)]()){if(!this[_0x17ccc3(0x1a2)]())return![];}}return!![];},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x1c3)]=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0xab)],Game_Battler[_0x3fafb1(0x160)]['applyTpbPenalty']=function(){const _0x408353=_0x3fafb1;BattleManager[_0x408353(0x74)]()?this[_0x408353(0x1c0)]():VisuMZ['BattleSystemATB'][_0x408353(0x1c3)][_0x408353(0x195)](this);},Game_Battler[_0x3fafb1(0x160)]['applyATBPenalty']=function(){const _0x4fbee3=_0x3fafb1;this['_tpbState']=_0x4fbee3(0x156),this[_0x4fbee3(0x20c)]+=VisuMZ[_0x4fbee3(0x96)][_0x4fbee3(0x9a)][_0x4fbee3(0x1c5)]['EscapeFailPenalty']||0x0;},VisuMZ['BattleSystemATB'][_0x3fafb1(0x16c)]=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x1cb)],Game_Battler[_0x3fafb1(0x160)]['tpbSpeed']=function(){const _0x1286e4=_0x3fafb1;return BattleManager['isATB']()?VisuMZ[_0x1286e4(0x96)][_0x1286e4(0x9a)][_0x1286e4(0x1c5)]['TpbSpeedCalcJS'][_0x1286e4(0x195)](this,this):VisuMZ[_0x1286e4(0x96)][_0x1286e4(0x16c)]['call'](this);},VisuMZ['BattleSystemATB']['Game_Battler_tpbBaseSpeed']=Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x105)],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x105)]=function(){const _0x522067=_0x3fafb1;return BattleManager[_0x522067(0x74)]()?VisuMZ[_0x522067(0x96)][_0x522067(0x9a)]['Mechanics'][_0x522067(0x19c)][_0x522067(0x195)](this,this):VisuMZ[_0x522067(0x96)][_0x522067(0x223)][_0x522067(0x195)](this);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0xdf)]=Game_Battler[_0x3fafb1(0x160)]['tpbRelativeSpeed'],Game_Battler['prototype']['tpbRelativeSpeed']=function(){const _0x31e323=_0x3fafb1;return BattleManager[_0x31e323(0x74)]()?VisuMZ[_0x31e323(0x96)]['Settings'][_0x31e323(0x1c5)][_0x31e323(0xfd)]['call'](this,this):VisuMZ[_0x31e323(0x96)]['Game_Battler_tpbRelativeSpeed'][_0x31e323(0x195)](this);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0xb9)]=Game_Battler[_0x3fafb1(0x160)]['tpbAcceleration'],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x154)]=function(){const _0x29a126=_0x3fafb1;return BattleManager['isATB']()?this[_0x29a126(0x181)]():VisuMZ[_0x29a126(0x96)]['Game_Battler_tpbAcceleration'][_0x29a126(0x195)](this);},Game_Battler[_0x3fafb1(0x160)]['atbAcceleration']=function(){const _0x1db6f5=_0x3fafb1;let _0x5ef48d=VisuMZ[_0x1db6f5(0x96)][_0x1db6f5(0x9a)]['Mechanics'][_0x1db6f5(0x1c1)]['call'](this,this);if(ConfigManager&&ConfigManager[_0x1db6f5(0x215)]!==undefined){const _0x57409e=ConfigManager[_0x1db6f5(0x215)]-0x3;if(_0x57409e>0x0)return _0x5ef48d*(_0x57409e*0x2);else{if(_0x57409e<0x0)return _0x5ef48d*(0x1/(_0x57409e*-0x2));}}return _0x5ef48d;},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x13f)]=Game_Battler['prototype'][_0x3fafb1(0xc3)],Game_Battler[_0x3fafb1(0x160)][_0x3fafb1(0xc3)]=function(){const _0x2f61b3=_0x3fafb1;if(BattleManager[_0x2f61b3(0x74)]()){const _0x43a3e4=this[_0x2f61b3(0x230)][_0x2f61b3(0xb1)](_0x24a82a=>_0x24a82a[_0x2f61b3(0x15a)]());for(const _0x18141d of _0x43a3e4){if(!_0x18141d)continue;_0x18141d[_0x2f61b3(0x222)]=_0x18141d[_0x2f61b3(0x222)]??_0x18141d[_0x2f61b3(0x1b2)];}let _0x1370dc=VisuMZ[_0x2f61b3(0x96)][_0x2f61b3(0x9a)][_0x2f61b3(0x1c5)][_0x2f61b3(0x20f)]['call'](this,this);for(const _0x3d3a30 of _0x43a3e4){if(!_0x3d3a30)continue;_0x3d3a30[_0x2f61b3(0x1b2)]=_0x3d3a30[_0x2f61b3(0x222)];}return _0x1370dc;}else return VisuMZ[_0x2f61b3(0x96)][_0x2f61b3(0x13f)]['call'](this);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x185)]=Scene_Options[_0x3fafb1(0x160)][_0x3fafb1(0x202)],Scene_Options[_0x3fafb1(0x160)][_0x3fafb1(0x202)]=function(){const _0x39952e=_0x3fafb1;let _0x1a11a6=VisuMZ[_0x39952e(0x96)][_0x39952e(0x185)]['call'](this);const _0x71ee49=VisuMZ['BattleSystemATB'][_0x39952e(0x9a)];if(_0x71ee49[_0x39952e(0x1b4)][_0x39952e(0x1a5)]&&_0x71ee49[_0x39952e(0x1b4)][_0x39952e(0x21f)]&&BattleManager[_0x39952e(0x74)]())_0x1a11a6++;return _0x1a11a6;},Sprite_Battler[_0x3fafb1(0x160)]['createAtbGaugeSprite']=function(){const _0x78ec3d=_0x3fafb1;if(!BattleManager[_0x78ec3d(0x74)]())return;if(!ConfigManager[_0x78ec3d(0xb5)])return;const _0x4b419e=VisuMZ[_0x78ec3d(0x96)][_0x78ec3d(0x9a)][_0x78ec3d(0x79)],_0x3f7f41=new Sprite_Gauge();_0x3f7f41[_0x78ec3d(0x1ac)]['x']=_0x4b419e['AnchorX'],_0x3f7f41[_0x78ec3d(0x1ac)]['y']=_0x4b419e[_0x78ec3d(0x21e)],_0x3f7f41[_0x78ec3d(0x11d)]['x']=_0x3f7f41['scale']['y']=_0x4b419e[_0x78ec3d(0x18b)],this['_atbGaugeSprite']=_0x3f7f41,this[_0x78ec3d(0x217)](this['_atbGaugeSprite']);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x200)]=Sprite_Battler['prototype'][_0x3fafb1(0x15e)],Sprite_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x15e)]=function(_0x342044){const _0xd12ac3=_0x3fafb1;VisuMZ[_0xd12ac3(0x96)]['Sprite_Battler_setBattler']['call'](this,_0x342044),this['setupAtbGaugeSprite'](_0x342044),this[_0xd12ac3(0x236)]();},Sprite_Battler[_0x3fafb1(0x160)]['setupAtbGaugeSprite']=function(_0x3167ae){const _0x1dba90=_0x3fafb1;if(!_0x3167ae)return;if(!this[_0x1dba90(0x78)])return;if(_0x3167ae[_0x1dba90(0x1f3)]()){}else{if(_0x3167ae['isEnemy']()){if(this[_0x1dba90(0x70)]===Sprite_Enemy&&_0x3167ae[_0x1dba90(0xc2)]())return;if(this[_0x1dba90(0x70)]===Sprite_SvEnemy&&!_0x3167ae['hasSvBattler']())return;}}this[_0x1dba90(0x78)]['setup'](_0x3167ae,_0x1dba90(0x198));},Sprite_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x236)]=function(){const _0x5622ff=_0x3fafb1;if(!this[_0x5622ff(0x78)])return;const _0x5cd028=this[_0x5622ff(0x1de)]&&this['_battler']['isAppeared']()&&!this[_0x5622ff(0x1de)][_0x5622ff(0x1fd)]();this[_0x5622ff(0x78)][_0x5622ff(0x23f)]=_0x5cd028,this['_svBattlerSprite']&&this[_0x5622ff(0x1b8)][_0x5622ff(0x78)]&&(this[_0x5622ff(0x1b8)][_0x5622ff(0x78)]['visible']=_0x5cd028);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x9d)]=Sprite_Battler['prototype']['updateMain'],Sprite_Battler['prototype']['updateMain']=function(){const _0x166ef9=_0x3fafb1;VisuMZ['BattleSystemATB'][_0x166ef9(0x9d)]['call'](this),this[_0x166ef9(0x104)]();},Sprite_Battler['prototype'][_0x3fafb1(0x104)]=function(){const _0x310f14=_0x3fafb1;if(!this[_0x310f14(0x1de)])return;if(!this[_0x310f14(0x78)])return;if(this[_0x310f14(0x1de)]&&this[_0x310f14(0x1de)][_0x310f14(0x137)]()&&this[_0x310f14(0x1de)][_0x310f14(0xc2)]()){if(this['constructor']===Sprite_Enemy)return;}const _0x2a7ed7=VisuMZ['BattleSystemATB']['Settings'][_0x310f14(0x79)],_0x2618bb=this[_0x310f14(0x78)];let _0x155740=_0x2a7ed7['OffsetX'];this[_0x310f14(0x1de)][_0x310f14(0x159)]&&(_0x155740+=this[_0x310f14(0x1de)][_0x310f14(0x159)]());let _0x2f5de9=_0x2a7ed7['OffsetY'];this['_battler']['battleUIOffsetY']&&(_0x2f5de9+=this[_0x310f14(0x1de)]['battleUIOffsetY']());_0x2618bb['x']=_0x155740;let _0x4054e3=this['height'];this[_0x310f14(0x1de)]&&this['_battler'][_0x310f14(0x137)]()&&this[_0x310f14(0x1de)][_0x310f14(0xc2)]()&&(_0x4054e3=this['_battler']['svBattlerData']()[_0x310f14(0x81)]||0x1),_0x2618bb['y']=-_0x4054e3+_0x2f5de9,this[_0x310f14(0x1de)][_0x310f14(0x137)]()&&(this[_0x310f14(0x1de)][_0x310f14(0x20b)]()[_0x310f14(0x1c2)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x2618bb[_0x310f14(0x23f)]=![])),this[_0x310f14(0x141)]()&&(_0x2618bb['y']+=_0x2618bb['gaugeHeight']()*_0x2a7ed7[_0x310f14(0x18b)]-0x1),this['scale']['x']<0x0&&(_0x2618bb[_0x310f14(0x11d)]['x']=-Math[_0x310f14(0x1ba)](_0x2618bb['scale']['x']));},Sprite_Battler[_0x3fafb1(0x160)]['checkAggroControlSystemOffsetYAdjustment']=function(){const _0x221a15=_0x3fafb1;if(!Imported[_0x221a15(0xb7)])return![];if(this['_battler']&&this[_0x221a15(0x1de)][_0x221a15(0x137)]())return![];const _0x4dbf45=VisuMZ['AggroControlSystem'][_0x221a15(0x9a)][_0x221a15(0x168)];if(!_0x4dbf45[_0x221a15(0x1e4)])return![];if(!ConfigManager['aggroGauge'])return![];const _0x59344a=VisuMZ[_0x221a15(0x96)][_0x221a15(0x9a)]['Gauge'];return _0x4dbf45['Scale']===_0x59344a['Scale']&&_0x4dbf45['AnchorX']===_0x59344a['AnchorX']&&_0x4dbf45['AnchorY']===_0x59344a[_0x221a15(0x21e)]&&_0x4dbf45[_0x221a15(0xc6)]===_0x59344a['OffsetX']&&_0x4dbf45[_0x221a15(0xcc)]===_0x59344a['OffsetY']&&!![];},VisuMZ[_0x3fafb1(0x96)]['Sprite_Battler_update']=Sprite_Battler[_0x3fafb1(0x160)]['update'],Sprite_Battler[_0x3fafb1(0x160)][_0x3fafb1(0x235)]=function(){const _0x176474=_0x3fafb1;VisuMZ['BattleSystemATB']['Sprite_Battler_update'][_0x176474(0x195)](this),!this['_battler']&&this[_0x176474(0x78)]&&(this['_atbGaugeSprite']['visible']=![],this['_svBattlerSprite']&&(this['_svBattlerSprite'][_0x176474(0x78)]['visible']=![]));},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x184)]=Sprite_Actor[_0x3fafb1(0x160)][_0x3fafb1(0xff)],Sprite_Actor['prototype'][_0x3fafb1(0xff)]=function(){const _0x3b4aec=_0x3fafb1;VisuMZ[_0x3b4aec(0x96)][_0x3b4aec(0x184)][_0x3b4aec(0x195)](this),this[_0x3b4aec(0x16b)]()&&this[_0x3b4aec(0x15f)]();},Sprite_Actor[_0x3fafb1(0x160)][_0x3fafb1(0x16b)]=function(){const _0x57f58d=_0x3fafb1;return VisuMZ[_0x57f58d(0x96)][_0x57f58d(0x9a)][_0x57f58d(0x79)][_0x57f58d(0xc4)];},Sprite_SvEnemy['prototype'][_0x3fafb1(0x16b)]=function(){const _0x34690e=_0x3fafb1;return VisuMZ[_0x34690e(0x96)][_0x34690e(0x9a)]['Gauge']['ShowEnemyGauge'];},VisuMZ[_0x3fafb1(0x96)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x3fafb1(0x160)][_0x3fafb1(0x131)],Sprite_Enemy['prototype'][_0x3fafb1(0x131)]=function(){const _0x137ff4=_0x3fafb1;VisuMZ[_0x137ff4(0x96)][_0x137ff4(0x9a)][_0x137ff4(0x79)][_0x137ff4(0x1e1)]&&this[_0x137ff4(0x15f)](),VisuMZ[_0x137ff4(0x96)][_0x137ff4(0xfa)][_0x137ff4(0x195)](this);},VisuMZ[_0x3fafb1(0x96)]['Sprite_Enemy_startEffect']=Sprite_Enemy[_0x3fafb1(0x160)][_0x3fafb1(0x108)],Sprite_Enemy[_0x3fafb1(0x160)][_0x3fafb1(0x108)]=function(_0x536e29){const _0x150d7f=_0x3fafb1;VisuMZ[_0x150d7f(0x96)]['Sprite_Enemy_startEffect'][_0x150d7f(0x195)](this,_0x536e29),(_0x536e29===_0x150d7f(0x1cd)||_0x150d7f(0xda))&&this[_0x150d7f(0x236)]();},VisuMZ[_0x3fafb1(0x96)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x3fafb1(0x160)]['appear'],Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x1cd)]=function(){const _0x598c64=_0x3fafb1;VisuMZ[_0x598c64(0x96)][_0x598c64(0xf2)][_0x598c64(0x195)](this),this[_0x598c64(0x137)]()&&BattleManager[_0x598c64(0x74)]()&&this[_0x598c64(0x7c)]()&&this[_0x598c64(0x7c)]()['updateAtbGaugeSpriteVisibility']();},VisuMZ[_0x3fafb1(0x96)]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge['prototype'][_0x3fafb1(0xea)],Sprite_Gauge['prototype'][_0x3fafb1(0xea)]=function(){const _0x1adca0=_0x3fafb1;if(this[_0x1adca0(0x87)]===_0x1adca0(0x198))return this['atbGaugeColor'](0x1);return VisuMZ['BattleSystemATB'][_0x1adca0(0x1bf)][_0x1adca0(0x195)](this);},VisuMZ['BattleSystemATB'][_0x3fafb1(0x76)]=Sprite_Gauge[_0x3fafb1(0x160)][_0x3fafb1(0xa1)],Sprite_Gauge['prototype'][_0x3fafb1(0xa1)]=function(){const _0x2ca990=_0x3fafb1;if(this[_0x2ca990(0x87)]===_0x2ca990(0x198))return this['atbGaugeColor'](0x2);return VisuMZ[_0x2ca990(0x96)][_0x2ca990(0x76)]['call'](this);},Sprite_Gauge[_0x3fafb1(0x160)][_0x3fafb1(0x174)]=function(_0x5a591d){const _0x5a1924=_0x3fafb1;if(!this[_0x5a1924(0x1de)])return ColorManager['atbColor']('default%1'[_0x5a1924(0xf4)](_0x5a591d));if(this['_battler'][_0x5a1924(0x1c9)]())return ColorManager[_0x5a1924(0x85)](_0x5a1924(0x23b)[_0x5a1924(0xf4)](_0x5a591d));if(this[_0x5a1924(0x1de)][_0x5a1924(0x201)]())return ColorManager[_0x5a1924(0x85)]('cast%1'['format'](_0x5a591d));if(this[_0x5a1924(0x11a)]()>=0x1)return ColorManager[_0x5a1924(0x85)](_0x5a1924(0xcd)[_0x5a1924(0xf4)](_0x5a591d));const _0x4c2148=VisuMZ[_0x5a1924(0x96)][_0x5a1924(0x9a)][_0x5a1924(0x79)],_0x377744=this['_battler']['paramRate'](0x6)*this['_battler'][_0x5a1924(0x6c)](0x6);if(_0x377744<=_0x4c2148[_0x5a1924(0x199)])return ColorManager[_0x5a1924(0x85)]('slow%1'[_0x5a1924(0xf4)](_0x5a591d));if(_0x377744>=_0x4c2148[_0x5a1924(0x1ff)])return ColorManager['atbColor'](_0x5a1924(0x13b)[_0x5a1924(0xf4)](_0x5a591d));return ColorManager[_0x5a1924(0x85)]('default%1'[_0x5a1924(0xf4)](_0x5a591d));},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x1a1)]=Sprite_Gauge[_0x3fafb1(0x160)][_0x3fafb1(0xf1)],Sprite_Gauge[_0x3fafb1(0x160)]['currentValue']=function(){const _0x44d95f=_0x3fafb1;if(this[_0x44d95f(0x1de)]&&this[_0x44d95f(0x87)]===_0x44d95f(0x198))return this[_0x44d95f(0xfb)]();return VisuMZ[_0x44d95f(0x96)][_0x44d95f(0x1a1)][_0x44d95f(0x195)](this);},Sprite_Gauge[_0x3fafb1(0x160)]['atbCurrentValue']=function(){const _0x393a7e=_0x3fafb1;return this[_0x393a7e(0x1de)][_0x393a7e(0x201)]()?Math[_0x393a7e(0x8b)](this[_0x393a7e(0x1de)]['_tpbCastTime'],0x0):VisuMZ[_0x393a7e(0x96)][_0x393a7e(0x1a1)][_0x393a7e(0x195)](this);},VisuMZ[_0x3fafb1(0x96)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x3fafb1(0x160)][_0x3fafb1(0x21d)],Sprite_Gauge[_0x3fafb1(0x160)][_0x3fafb1(0x21d)]=function(){const _0x38afcf=_0x3fafb1;if(this[_0x38afcf(0x1de)]&&this[_0x38afcf(0x87)]==='time')return this[_0x38afcf(0x135)]();return VisuMZ['BattleSystemATB'][_0x38afcf(0x80)]['call'](this);},Sprite_Gauge['prototype'][_0x3fafb1(0x135)]=function(){const _0x3b1a05=_0x3fafb1;return this[_0x3b1a05(0x1de)][_0x3b1a05(0x201)]()?Math['max'](this['_battler'][_0x3b1a05(0xc3)](),1e-9):VisuMZ[_0x3b1a05(0x96)][_0x3b1a05(0x80)]['call'](this);},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x103)]=Window_Help[_0x3fafb1(0x160)]['setItem'],Window_Help[_0x3fafb1(0x160)][_0x3fafb1(0xf0)]=function(_0x1de0fb){const _0x135375=_0x3fafb1;BattleManager[_0x135375(0x74)]()&&_0x1de0fb&&_0x1de0fb['note']&&_0x1de0fb[_0x135375(0x1c2)][_0x135375(0x1cc)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x135375(0x173)](String(RegExp['$1'])):VisuMZ['BattleSystemATB'][_0x135375(0x103)][_0x135375(0x195)](this,_0x1de0fb);},VisuMZ['BattleSystemATB'][_0x3fafb1(0x1bd)]=Window_StatusBase[_0x3fafb1(0x160)][_0x3fafb1(0x170)],Window_StatusBase[_0x3fafb1(0x160)][_0x3fafb1(0x170)]=function(_0x479aa2,_0x3316b0,_0x433719,_0x150876){const _0x237a9f=_0x3fafb1;if(!this['showVisualAtbGauge'](_0x3316b0))return;VisuMZ['BattleSystemATB'][_0x237a9f(0x1bd)][_0x237a9f(0x195)](this,_0x479aa2,_0x3316b0,_0x433719,_0x150876);},Window_StatusBase['prototype']['showVisualAtbGauge']=function(_0x420993){const _0x604ecc=_0x3fafb1;if(_0x420993!==_0x604ecc(0x198))return!![];if(!['Window_BattleStatus',_0x604ecc(0x196)][_0x604ecc(0x16a)](this[_0x604ecc(0x70)][_0x604ecc(0x197)]))return![];if(!BattleManager['isATB']())return![];if(!ConfigManager[_0x604ecc(0xb5)])return![];return VisuMZ[_0x604ecc(0x96)][_0x604ecc(0x9a)][_0x604ecc(0x79)]['ShowStatusGauge'];},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x6d)]=Window_Options[_0x3fafb1(0x160)][_0x3fafb1(0x13e)],Window_Options[_0x3fafb1(0x160)][_0x3fafb1(0x13e)]=function(){const _0x290efd=_0x3fafb1;VisuMZ['BattleSystemATB'][_0x290efd(0x6d)][_0x290efd(0x195)](this),this[_0x290efd(0x158)]();},Window_Options[_0x3fafb1(0x160)][_0x3fafb1(0x158)]=function(){const _0x5e7297=_0x3fafb1;if(!BattleManager[_0x5e7297(0x74)]())return;VisuMZ[_0x5e7297(0x96)][_0x5e7297(0x9a)]['Options'][_0x5e7297(0x1a5)]&&this[_0x5e7297(0x1d4)]();},Window_Options[_0x3fafb1(0x160)]['addBattleSystemATBShowGaugeCommand']=function(){const _0x16c607=_0x3fafb1,_0x5db0ae=TextManager[_0x16c607(0xb5)],_0x5dd25=_0x16c607(0xb5);this[_0x16c607(0x1ea)](_0x5db0ae,_0x5dd25);},Game_BattlerBase['prototype'][_0x3fafb1(0xbf)]=function(){const _0x3704a2=_0x3fafb1;delete this['_fieldAtbGaugeGraphicType'],delete this[_0x3704a2(0xd4)],delete this['_fieldAtbGaugeFaceIndex'],delete this[_0x3704a2(0x221)];},Game_BattlerBase['prototype'][_0x3fafb1(0x19d)]=function(){const _0x268d95=_0x3fafb1;return this['_fieldAtbGaugeGraphicType']===undefined&&(this['_fieldAtbGaugeGraphicType']=this[_0x268d95(0x227)]()),this[_0x268d95(0x17d)];},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x227)]=function(){const _0x3bdf7c=_0x3fafb1;return Sprite_FieldGaugeATB[_0x3bdf7c(0x9a)][_0x3bdf7c(0x140)];},Game_BattlerBase['prototype'][_0x3fafb1(0x12a)]=function(){const _0x17c96a=_0x3fafb1;return this[_0x17c96a(0xd4)]===undefined&&(this[_0x17c96a(0xd4)]=this[_0x17c96a(0xe4)]()),this[_0x17c96a(0xd4)];},Game_BattlerBase['prototype']['createFieldAtbGraphicFaceName']=function(){const _0x3e3c9d=_0x3fafb1;return Sprite_FieldGaugeATB[_0x3e3c9d(0x9a)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x82)]=function(){const _0x526784=_0x3fafb1;return this[_0x526784(0x1f6)]===undefined&&(this['_fieldAtbGaugeFaceIndex']=this[_0x526784(0x1cf)]()),this[_0x526784(0x1f6)];},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x1cf)]=function(){const _0x2ceedc=_0x3fafb1;return Sprite_FieldGaugeATB[_0x2ceedc(0x9a)][_0x2ceedc(0xcb)];},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x233)]=function(){const _0x56139e=_0x3fafb1;return this[_0x56139e(0x221)]===undefined&&(this[_0x56139e(0x221)]=this[_0x56139e(0x8e)]()),this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x8e)]=function(){const _0xda10cf=_0x3fafb1;return Sprite_FieldGaugeATB[_0xda10cf(0x9a)][_0xda10cf(0x1a6)];},Game_BattlerBase[_0x3fafb1(0x160)][_0x3fafb1(0x231)]=function(_0x397927){const _0x5da56f=_0x3fafb1;this[_0x5da56f(0x221)]=_0x397927;},Game_Actor[_0x3fafb1(0x160)][_0x3fafb1(0x227)]=function(){const _0x3ca5a3=_0x3fafb1,_0x8419f9=this[_0x3ca5a3(0xb4)]()[_0x3ca5a3(0x1c2)];if(_0x8419f9[_0x3ca5a3(0x1cc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x3ca5a3(0x17a);else{if(_0x8419f9['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x3ca5a3(0x18a);}return Sprite_FieldGaugeATB['Settings'][_0x3ca5a3(0x1ab)];},Game_Actor[_0x3fafb1(0x160)][_0x3fafb1(0xe4)]=function(){const _0x11287b=_0x3fafb1,_0x4b1aa6=this[_0x11287b(0xb4)]()['note'];if(_0x4b1aa6[_0x11287b(0x1cc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x11287b(0xc8)]();},Game_Actor[_0x3fafb1(0x160)][_0x3fafb1(0x1cf)]=function(){const _0x24a6b9=_0x3fafb1,_0x20a8e3=this[_0x24a6b9(0xb4)]()['note'];if(_0x20a8e3[_0x24a6b9(0x1cc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x24a6b9(0x1c6)]();},Game_Actor[_0x3fafb1(0x160)][_0x3fafb1(0x8e)]=function(){const _0x45e328=_0x3fafb1,_0x120f36=this['actor']()[_0x45e328(0x1c2)];if(_0x120f36['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x45e328(0x9a)]['ActorBattlerIcon'];},Game_Enemy[_0x3fafb1(0x160)]['createFieldAtbGraphicType']=function(){const _0xf28c70=_0x3fafb1,_0x56d7c7=this['enemy']()[_0xf28c70(0x1c2)];if(_0x56d7c7[_0xf28c70(0x1cc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x56d7c7['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB['Settings'][_0xf28c70(0x140)];},Game_Enemy['prototype'][_0x3fafb1(0xe4)]=function(){const _0x517c3d=_0x3fafb1,_0x58b98c=this[_0x517c3d(0x20b)]()[_0x517c3d(0x1c2)];if(_0x58b98c[_0x517c3d(0x1cc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x517c3d(0x9a)][_0x517c3d(0x19f)];},Game_Enemy[_0x3fafb1(0x160)][_0x3fafb1(0x1cf)]=function(){const _0x5ee062=_0x3fafb1,_0x5ed1d6=this[_0x5ee062(0x20b)]()[_0x5ee062(0x1c2)];if(_0x5ed1d6[_0x5ee062(0x1cc)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB['Settings'][_0x5ee062(0xcb)];},Game_Enemy['prototype'][_0x3fafb1(0x8e)]=function(){const _0x24b7df=_0x3fafb1,_0x4218ea=this['enemy']()[_0x24b7df(0x1c2)];if(_0x4218ea['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x24b7df(0x9a)][_0x24b7df(0x1a6)];},VisuMZ[_0x3fafb1(0x96)][_0x3fafb1(0x22a)]=Scene_Battle[_0x3fafb1(0x160)][_0x3fafb1(0x22f)],Scene_Battle[_0x3fafb1(0x160)]['createAllWindows']=function(){const _0xfb7532=_0x3fafb1;this[_0xfb7532(0x16e)](),VisuMZ['BattleSystemATB'][_0xfb7532(0x22a)]['call'](this),this[_0xfb7532(0x244)]();},Scene_Battle[_0x3fafb1(0x160)][_0x3fafb1(0x16e)]=function(){const _0x4de41f=_0x3fafb1;if(!BattleManager[_0x4de41f(0x74)]())return;if(!Sprite_FieldGaugeATB['Settings']['UseFieldGauge'])return;if(!ConfigManager['visualAtbGauge'])return;this['_fieldGaugeATB_Container']=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x4575b7=this[_0x4de41f(0x1e5)](this[_0x4de41f(0xe7)]);this[_0x4de41f(0x101)](this[_0x4de41f(0x7a)],_0x4575b7);},Scene_Battle['prototype']['createFieldGaugeSpriteATB']=function(){const _0x533731=_0x3fafb1;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x533731(0x9a)]['UseFieldGauge'])return;if(!ConfigManager[_0x533731(0xb5)])return;this['_fieldGaugeATB']=new Sprite_FieldGaugeATB(),this[_0x533731(0x7a)][_0x533731(0x217)](this['_fieldGaugeATB']);};function Sprite_FieldGaugeATB(){const _0x5ba8d8=_0x3fafb1;this[_0x5ba8d8(0x13a)](...arguments);}function _0x3de7(_0x47f10a,_0x5abc66){const _0x2e1fa8=_0x2e1f();return _0x3de7=function(_0x3de765,_0x58a30d){_0x3de765=_0x3de765-0x67;let _0x2fb98a=_0x2e1fa8[_0x3de765];return _0x2fb98a;},_0x3de7(_0x47f10a,_0x5abc66);}Sprite_FieldGaugeATB[_0x3fafb1(0x160)]=Object[_0x3fafb1(0x1ee)](Sprite[_0x3fafb1(0x160)]),Sprite_FieldGaugeATB['prototype'][_0x3fafb1(0x70)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x3fafb1(0x9a)]=JsonEx[_0x3fafb1(0x144)](VisuMZ[_0x3fafb1(0x96)]['Settings'][_0x3fafb1(0x176)]),Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x13a)]=function(){const _0x1e07ed=_0x3fafb1;Sprite['prototype']['initialize']['call'](this),this[_0x1e07ed(0xe5)](),this['setHomeLocation'](),this[_0x1e07ed(0x164)]();},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0xe5)]=function(){const _0x853b1c=_0x3fafb1;this['anchor']['x']=0.5,this[_0x853b1c(0x1ac)]['y']=0.5;},Sprite_FieldGaugeATB['prototype'][_0x3fafb1(0x1bb)]=function(){const _0x3d894f=_0x3fafb1;if(this[_0x3d894f(0x218)]!==undefined)return this[_0x3d894f(0x218)];const _0x2e4192=Sprite_FieldGaugeATB[_0x3d894f(0x9a)]['DisplayPosition'];return this[_0x3d894f(0x218)]=[_0x3d894f(0x14b),_0x3d894f(0x1af)][_0x3d894f(0x16a)](_0x2e4192),this[_0x3d894f(0x218)];},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x91)]=function(){const _0x2e9baa=_0x3fafb1,_0x25fc55=Sprite_FieldGaugeATB[_0x2e9baa(0x9a)][_0x2e9baa(0x188)]['toLowerCase']()[_0x2e9baa(0x166)](),_0x404891=Window_Base[_0x2e9baa(0x160)]['lineHeight'](),_0x290579=SceneManager[_0x2e9baa(0x10b)][_0x2e9baa(0x125)][_0x2e9baa(0x81)]+Math[_0x2e9baa(0x177)](_0x404891*0.5);this[_0x2e9baa(0x133)]=0x0,this[_0x2e9baa(0x1b3)]=0x0;switch(_0x25fc55){case'top':this['_homeX']=Math[_0x2e9baa(0x177)](Graphics['boxWidth']*0.5),this[_0x2e9baa(0x1b3)]=0x60;break;case _0x2e9baa(0x1af):this[_0x2e9baa(0x133)]=Math['round'](Graphics[_0x2e9baa(0x17b)]*0.5),this['_homeY']=Graphics[_0x2e9baa(0x128)]-_0x290579;break;case _0x2e9baa(0xf6):this['_homeX']=0x50,this[_0x2e9baa(0x1b3)]=Math[_0x2e9baa(0x177)]((Graphics[_0x2e9baa(0x128)]-_0x290579)/0x2);break;case'right':this['_homeX']=Graphics[_0x2e9baa(0x17b)]-0x50,this['_homeY']=Math[_0x2e9baa(0x177)]((Graphics['boxHeight']-_0x290579)/0x2);break;}this['_homeX']+=Sprite_FieldGaugeATB[_0x2e9baa(0x9a)][_0x2e9baa(0xd7)]||0x0,this[_0x2e9baa(0x1b3)]+=Sprite_FieldGaugeATB[_0x2e9baa(0x9a)]['DisplayOffsetY']||0x0,this['x']=this['_homeX'],this['y']=this[_0x2e9baa(0x1b3)];},Sprite_FieldGaugeATB['prototype']['createChildren']=function(){const _0x22c60a=_0x3fafb1;this['createFieldGaugeSkin'](),this[_0x22c60a(0x1da)](),this[_0x22c60a(0x1f2)]();},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x16d)]=function(){const _0x3aad89=_0x3fafb1;this[_0x3aad89(0x214)]=new Sprite(),this[_0x3aad89(0x214)]['anchor']['x']=0.5,this[_0x3aad89(0x214)]['anchor']['y']=0.5,this[_0x3aad89(0x217)](this[_0x3aad89(0x214)]);const _0x528d02=Sprite_FieldGaugeATB[_0x3aad89(0x9a)]['GaugeSystemSkin'];if(_0x528d02)this['_skinSprite'][_0x3aad89(0x8f)]=ImageManager[_0x3aad89(0x100)](_0x528d02);},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x1da)]=function(){const _0x543e88=_0x3fafb1;this['_gaugeSprite']=new Sprite(),this[_0x543e88(0x217)](this['_gaugeSprite']),this[_0x543e88(0x152)]();},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x152)]=function(){const _0x27e9db=_0x3fafb1,_0x552a7f=Sprite_FieldGaugeATB[_0x27e9db(0x9a)],_0x322ede=this[_0x27e9db(0x1bb)](),_0x20eae0=_0x322ede?_0x552a7f[_0x27e9db(0x171)]:_0x552a7f[_0x27e9db(0xe8)],_0x5db163=_0x322ede?_0x552a7f['GaugeThick']:_0x552a7f[_0x27e9db(0x22c)];this['_gaugeSprite'][_0x27e9db(0x8f)]=new Bitmap(_0x20eae0,_0x5db163),this['drawGaugeBitmap'](),this[_0x27e9db(0xae)]['x']=Math[_0x27e9db(0xca)](_0x20eae0/-0x2),this[_0x27e9db(0xae)]['y']=Math[_0x27e9db(0xca)](_0x5db163/-0x2);},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x10c)]=function(){const _0x380cd3=_0x3fafb1;if(!Sprite_FieldGaugeATB[_0x380cd3(0x9a)][_0x380cd3(0x119)])return;const _0x1d747a=Sprite_FieldGaugeATB[_0x380cd3(0x9a)],_0x2260bf=this[_0x380cd3(0xae)]['bitmap'],_0x3c70b8=_0x2260bf[_0x380cd3(0x14d)],_0x261234=_0x2260bf[_0x380cd3(0x81)],_0x1b8016=ColorManager[_0x380cd3(0x98)](),_0x51fa8a=ColorManager[_0x380cd3(0x1c8)](),_0x4d952a=ColorManager['ctGaugeColor2'](),_0x3c9435=ColorManager['atbColor'](_0x380cd3(0x1fe)),_0x4f27a5=ColorManager['atbColor'](_0x380cd3(0x1ec)),_0x5819f5=this[_0x380cd3(0x1bb)](),_0x17f004=_0x1d747a[_0x380cd3(0x106)],_0x2f2ebc=_0x1d747a[_0x380cd3(0xac)][_0x380cd3(0x1ca)](0x0,0x1),_0x529f44=Math[_0x380cd3(0xca)](((_0x5819f5?_0x3c70b8:_0x261234)-0x2)*_0x2f2ebc);_0x2260bf['fillRect'](0x0,0x0,_0x3c70b8,_0x261234,_0x1b8016);let _0x3ed4ce=0x0,_0x464bb4=0x0,_0x49c9ee=0x0,_0x525722=0x0;if(_0x5819f5&&_0x17f004)_0x3ed4ce=_0x529f44-0x1,_0x49c9ee=_0x3c70b8-0x3-_0x3ed4ce,_0x2260bf[_0x380cd3(0x114)](0x1,0x1,_0x3ed4ce,_0x261234-0x2,_0x51fa8a,_0x4d952a,![]),_0x2260bf[_0x380cd3(0x114)](0x2+_0x3ed4ce,0x1,_0x49c9ee,_0x261234-0x2,_0x3c9435,_0x4f27a5,![]);else{if(_0x5819f5&&!_0x17f004)_0x3ed4ce=_0x529f44-0x1,_0x49c9ee=_0x3c70b8-0x3-_0x3ed4ce,_0x2260bf[_0x380cd3(0x114)](0x2+_0x49c9ee,0x1,_0x3ed4ce,_0x261234-0x2,_0x51fa8a,_0x4d952a,![]),_0x2260bf[_0x380cd3(0x114)](0x1,0x1,_0x49c9ee,_0x261234-0x2,_0x3c9435,_0x4f27a5,![]);else{if(!_0x5819f5&&_0x17f004)_0x464bb4=_0x529f44-0x1,_0x525722=_0x261234-0x3-_0x464bb4,_0x2260bf['gradientFillRect'](0x1,0x1,_0x3c70b8-0x2,_0x464bb4,_0x51fa8a,_0x4d952a,!![]),_0x2260bf[_0x380cd3(0x114)](0x1,0x2+_0x464bb4,_0x3c70b8-0x2,_0x525722,_0x3c9435,_0x4f27a5,!![]);else!_0x5819f5&&!_0x17f004&&(_0x464bb4=_0x529f44-0x1,_0x525722=_0x261234-0x3-_0x464bb4,_0x2260bf['gradientFillRect'](0x1,0x2+_0x525722,_0x3c70b8-0x2,_0x464bb4,_0x51fa8a,_0x4d952a,!![]),_0x2260bf['gradientFillRect'](0x1,0x1,_0x3c70b8-0x2,_0x525722,_0x3c9435,_0x4f27a5,!![]));}}},Sprite_FieldGaugeATB['prototype'][_0x3fafb1(0x1f2)]=function(){const _0x37ac17=_0x3fafb1;this[_0x37ac17(0xa8)]&&this[_0x37ac17(0xae)][_0x37ac17(0x245)](this[_0x37ac17(0xa8)]),this[_0x37ac17(0xa8)]=new Sprite(),this[_0x37ac17(0xae)]['addChild'](this[_0x37ac17(0xa8)]),this[_0x37ac17(0x12b)]();},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x12b)]=function(){this['createEnemySprites'](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x3fafb1(0x160)]['createEnemySprites']=function(){const _0xed5726=_0x3fafb1,_0x4a3303=$gameTroop[_0xed5726(0xbd)](),_0x4c8c7e=_0x4a3303[_0xed5726(0xc9)];for(let _0x3f12c8=0x0;_0x3f12c8<_0x4c8c7e;_0x3f12c8++){this['createBattlerSprite'](_0x3f12c8,$gameTroop);}},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x145)]=function(){const _0x3292d0=_0x3fafb1,_0x235de1=$gameParty[_0x3292d0(0x165)]();for(let _0x367afe=0x0;_0x367afe<_0x235de1;_0x367afe++){this['createBattlerSprite'](_0x367afe,$gameParty);}},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0xa5)]=function(_0x42c6fd,_0x585e14){const _0x576f50=_0x3fafb1,_0x24f80b=new Sprite_FieldMarkerATB(_0x42c6fd,_0x585e14,this['_gaugeSprite']);this['_battlerContainer'][_0x576f50(0x217)](_0x24f80b);},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x235)]=function(){const _0x4ae14b=_0x3fafb1;Sprite[_0x4ae14b(0x160)][_0x4ae14b(0x235)]['call'](this),this[_0x4ae14b(0xa4)](),this[_0x4ae14b(0x1c7)](),this[_0x4ae14b(0xb0)]();},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0xa4)]=function(){const _0xc8011c=_0x3fafb1,_0x28bd70=Sprite_FieldGaugeATB[_0xc8011c(0x9a)];if(_0x28bd70[_0xc8011c(0x188)]!==_0xc8011c(0x14b))return;if(!_0x28bd70['RepositionTopForHelp'])return;const _0x292aae=SceneManager[_0xc8011c(0x10b)][_0xc8011c(0x115)];if(!_0x292aae)return;_0x292aae[_0xc8011c(0x23f)]?(this['x']=this['_homeX']+(_0x28bd70[_0xc8011c(0x204)]||0x0),this['y']=this[_0xc8011c(0x1b3)]+(_0x28bd70[_0xc8011c(0x146)]||0x0)):(this['x']=this[_0xc8011c(0x133)],this['y']=this['_homeY']);const _0x4be59a=SceneManager[_0xc8011c(0x10b)]['_windowLayer'];this['x']+=_0x4be59a['x'],this['y']+=_0x4be59a['y'];},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0x1c7)]=function(){const _0x324762=_0x3fafb1;if(!this[_0x324762(0xa8)])return;const _0x366542=this[_0x324762(0xa8)][_0x324762(0x88)];if(!_0x366542)return;_0x366542[_0x324762(0xe2)](this['compareBattlerSprites'][_0x324762(0x20e)](this));},Sprite_FieldGaugeATB[_0x3fafb1(0x160)]['compareBattlerSprites']=function(_0x31d08f,_0x4903a9){const _0x4dd20f=_0x3fafb1,_0x423022=this[_0x4dd20f(0x1bb)](),_0x468b2d=Sprite_FieldGaugeATB[_0x4dd20f(0x9a)][_0x4dd20f(0x106)];if(_0x423022&&_0x468b2d)return _0x31d08f['x']-_0x4903a9['x'];else{if(_0x423022&&!_0x468b2d)return _0x4903a9['x']-_0x31d08f['x'];else{if(!_0x423022&&_0x468b2d)return _0x31d08f['y']-_0x4903a9['y'];else{if(!_0x423022&&!_0x468b2d)return _0x4903a9['y']-_0x31d08f['y'];}}}},Sprite_FieldGaugeATB[_0x3fafb1(0x160)][_0x3fafb1(0xb0)]=function(){const _0x24ce91=_0x3fafb1;BattleManager['_endingBattle']?this[_0x24ce91(0x23f)]=![]:this['visible']=$gameSystem[_0x24ce91(0x7e)]();};function Sprite_FieldMarkerATB(){const _0x53c01d=_0x3fafb1;this[_0x53c01d(0x13a)](...arguments);}function _0x2e1f(){const _0x44ec42=['clearStates','ShowMarkerBorder','_svBattlerSprite','Actor','abs','isGaugeHorizontal','%1BorderColor','Window_StatusBase_placeGauge','Enemy-%1-%2','Sprite_Gauge_gaugeColor1','applyATBPenalty','TpbAccelerationJS','note','Game_Battler_applyTpbPenalty','ready','Mechanics','faceIndex','updateBattleContainerOrder','ctGaugeColor1','atbStopped','clamp','tpbSpeed','match','appear','FaceIndex','createFieldAtbGraphicFaceIndex','Game_Battler_onRestrict','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Cast','BattleManager_isActiveTpb','addBattleSystemATBShowGaugeCommand','min','tpbRelativeSpeed','FaceName','Charge','_states','createGaugeSprite','_graphicEnemy','Game_Unit_updateTpb','fillRect','_battler','faceHeight','EnemyBattlerDrawLetter','ShowEnemyGauge','endBattlerActions','createBackgroundSprite','VisibleGauge','getChildIndex','subject','createArrowSprite','MarkerSpeed','isCTB','addCommand','changeEnemyGraphicBitmap','cast2','parameters','create','4185296jrWjkY','casting','initBattleSystemATB','createBattlerContainer','isActor','MarkerSize','addLoadListener','_fieldAtbGaugeFaceIndex','restriction','description','cast','_graphicFaceIndex','getStateTooltipBattler','applyGlobal','isHidden','cast1','FastRate','Sprite_Battler_setBattler','isAtbCastingState','maxCommands','After','RepositionTopHelpX','ARRAYFUNC','_tpbCastTime','Enemy','_atbColors','isStateAffected','FieldGaugeClearEnemyGraphic','enemy','_tpbChargeTime','die','bind','TpbCastTimeJS','floor','Actor-%1-%2','makeData','makeActions','_skinSprite','atbSpeed','allBattleMembers','addChild','_horz','isAppeared','Name','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','loadSvEnemy','currentMaxValue','AnchorY','AdjustRect','loadEnemy','_fieldAtbGaugeIconIndex','_originalSpeed','Game_Battler_tpbBaseSpeed','updateTpbChargeTime','VisuMZ_0_CoreEngine','skills','createFieldAtbGraphicType','2279648OLnDWT','atbInterrupt','Scene_Battle_createAllWindows','faceWidth','GaugeLengthVert','parse','setBattleSystemATBFieldGaugeVisible','createAllWindows','_actions','setAtbGraphicIconIndex','_atbAfterSpeed','fieldAtbGraphicIconIndex','loadWindowskin','update','updateAtbGaugeSpriteVisibility','clearTpbChargeTime','_backgroundSprite','changeSvActorGraphicBitmap','29583ZqAUaC','stop%1','%1BgColor2','processUpdateGraphic','version','visible','canMakeTpbActionsAtStartTpbTurn','changeAtbCastTime','return\x200','StunsResetGauge','createFieldGaugeSpriteATB','removeChild','154MAwAJY','battlerHue','_blendColor','_needsAtbClear','createGraphicSprite','blt','mainFontFace','paramBuffRate','Window_Options_addGeneralOptions','recoverAll','MarkerArrowWindowSkin','constructor','clear','_letterSprite','setFrame','isATB','startTpbCasting','Sprite_Gauge_gaugeColor2','createJS','_atbGaugeSprite','Gauge','_fieldGaugeATB_Container','process_VisuMZ_BattleSystemATB_CreateRegExp','battler','toUpperCase','isBattleSystemATBFieldGaugeVisible','FieldGaugeClearActorGraphic','Sprite_Gauge_currentMaxValue','height','fieldAtbGraphicFaceIndex','setBlendColor','setupArrowSprite','atbColor','tpbChargeTime','_statusType','children','updateGraphic','IconIndex','max','JSON','Actors','createFieldAtbGraphicIconIndex','bitmap','svActorHorzCells','setHomeLocation','94dHYOeO','State-%1-%2','Game_Action_applyItemUserEffect','81138DdNYer','BattleSystemATB','isSceneBattle','gaugeBackColor','initTpbChargeTimeATB','Settings','setAtbCastTime','Parse_Notetags_CreateJS','Sprite_Battler_updateMain','_plural','ParseItemNotetags','STR','gaugeColor2','requestFauxAnimation','_tpbIdleTime','updatePosition','createBattlerSprite','isAlive','NUM','_battlerContainer','MarkerOffset','455229Lolaxq','applyTpbPenalty','GaugeSplit','ParseAllNotetags','_gaugeSprite','_onRestrictBypassAtbReset','updateVisibility','map','isDead','InterruptTextColor','actor','visualAtbGauge','loadFace','VisuMZ_2_AggroControlSystem','isAttack','Game_Battler_tpbAcceleration','applyItemUserEffect','Enemies','iconWidth','members','#%1','clearFieldAtbGraphics','numActions','getAtbCastTimeRate','hasSvBattler','tpbRequiredCastTime','ShowActorGauge','Game_Battler_removeState','OffsetX','VisuMZ_1_BattleCore','faceName','length','ceil','EnemyBattlerFaceIndex','OffsetY','full%1','IconSet','_graphicSprite','removeState','PreStartTurnJS','Game_System_initialize','currentAction','_fieldAtbGaugeFaceName','Color','Armor-%1-%2','DisplayOffsetX','attackSpeed','textColor','disappear','VisuMZ_2_BattleSystemCTB','onRestrict','_atbFieldGaugeVisible','_tpbState','Game_Battler_tpbRelativeSpeed','STRUCT','atbActive','sort','BorderThickness','createFieldAtbGraphicFaceName','initMembers','mainSprite','_windowLayer','GaugeThick','Game_Action_applyGlobal','gaugeColor1','targetPositionOnGauge','updateGraphicHue','battleMembers','Game_Battler_startTpbCasting','applyData','setItem','currentValue','Game_BattlerBase_appear','%1Side','format','Game_Battler_clearTpbChargeTime','left','FUNC','Item-%1-%2','Class-%1-%2','Sprite_Enemy_createStateIconSprite','atbCurrentValue','undecided','BattlerRelativeSpeedJS','%1SystemBorder','createStateSprite','loadSystem','addChildAt','default','Window_Help_setItem','updateAtbGaugeSpritePosition','tpbBaseSpeed','GaugeDirection','FieldGaugeEnemyIcon','startEffect','updateSelectionEffect','createLetterSprite','_scene','drawGaugeBitmap','onAtbInterrupt','ARRAYSTRUCT','EVAL','initTpbChargeTime','revive','svactor','opacity','gradientFillRect','_helpWindow','ARRAYSTR','reduce','#000000','DrawGauge','gaugeRate','setAtbChargeTime','(?:ATB|TPB)','scale','full','setupTextPopup','applyBattleSystemATBUserEffect','changeIconGraphicBitmap','FieldGaugeActorFace','targetOpacity','makeTpbActions','_statusWindow','_forcing','_index','boxHeight','InterruptMirror','fieldAtbGraphicFaceName','createBattlerSprites','applyGlobalBattleSystemATBEffects','fontFace','applyItemBattleSystemATBUserEffect','setActionState','setAtbAfterSpeed','createStateIconSprite','_graphicHue','_homeX','Game_Battler_updateTpbChargeTime','atbCurrentMaxValue','onDatabaseLoaded','isEnemy','concat','Weapon-%1-%2','initialize','fast%1','2547985SjYszo','_graphicIconIndex','addGeneralOptions','Game_Battler_tpbRequiredCastTime','EnemyBattlerType','checkAggroControlSystemOffsetYAdjustment','PostStartTurnJS','createBorderSprite','makeDeepCopy','createActorSprites','RepositionTopHelpY','_letter','Scene_Boot_onDatabaseLoaded','changeFaceGraphicBitmap','some','top','Game_BattlerBase_recoverAll','width','EnemyBattlerFontFace','acting','iconHeight','Game_Battler_initTpbChargeTime','createGaugeBitmap','createKeyJS','tpbAcceleration','battlerName','charging','_graphicSv','addBattleSystemATBCommands','battleUIOffsetX','item','exit','changeAtbChargeTime','SystemFieldGaugeVisibility','setBattler','createAtbGaugeSprite','prototype','125206qecZvi','isTpb','ARRAYEVAL','createChildren','maxBattleMembers','trim','clearActions','Aggro','setupBattleSystemATBColors','includes','isShowAtbGauge','Game_Battler_tpbSpeed','createFieldGaugeSkin','createFieldGaugeContainerATB','Game_BattlerBase_die','placeGauge','GaugeLengthHorz','updateTpb','setText','atbGaugeColor','ConfigManager_makeData','FieldGauge','round','isSideView','ConfigManager_applyData','face','boxWidth','stop','_fieldAtbGaugeGraphicType','ColorManager_loadWindowskin','_unit','updatePositionOnGauge','atbAcceleration','svActorVertCells','ShowMarkerBg','Sprite_Actor_createStateSprite','Scene_Options_maxCommands','process_VisuMZ_BattleSystemATB_JS_Notetags','_arrowSprite','DisplayPosition','setHue','icon','Scale','canMove','BattleCore','svBattlerName','RegExp','fast','updatePositionOffset','startTpbTurn','filter','traitObjects','call','Window_SideviewUiBattleStatus','name','time','SlowRate','FieldGaugeEnemyFace','%1BgColor1','TpbBaseSpeedCalcJS','fieldAtbGraphicType','_tpbTurnEnd','EnemyBattlerFaceName','Interrupt','Sprite_Gauge_currentValue','isTpbCharged','Game_Battler_clearActions','_graphicFaceName','AddOption','EnemyBattlerIcon','ParseSkillNotetags','Game_BattlerBase_revive','ConvertParams','_windowskin','ActorBattlerType','anchor','registerCommand','Game_BattlerBase_clearStates','bottom','getColor','_graphicType','speed','_homeY','Options','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>'];_0x2e1f=function(){return _0x44ec42;};return _0x2e1f();}Sprite_FieldMarkerATB[_0x3fafb1(0x160)]=Object[_0x3fafb1(0x1ee)](Sprite_Clickable['prototype']),Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x70)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x13a)]=function(_0x486ffb,_0x5393aa,_0x5df0bf){const _0x54aefc=_0x3fafb1;this['_index']=_0x486ffb,this[_0x54aefc(0x17f)]=_0x5393aa,this[_0x54aefc(0xae)]=_0x5df0bf,Sprite_Clickable['prototype'][_0x54aefc(0x13a)]['call'](this),this['initMembers'](),this[_0x54aefc(0x164)](),this[_0x54aefc(0x113)]=this[_0x54aefc(0x123)]();},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0xe5)]=function(){const _0x36c126=_0x3fafb1;this[_0x36c126(0x1ac)]['x']=0.5,this[_0x36c126(0x1ac)]['y']=0.5;},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x164)]=function(){const _0x1edbf3=_0x3fafb1;this[_0x1edbf3(0x1e3)](),this[_0x1edbf3(0x69)](),this[_0x1edbf3(0x143)](),this[_0x1edbf3(0x10a)](),this[_0x1edbf3(0x1e7)](),this[_0x1edbf3(0x180)](!![]);},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x1e3)]=function(){const _0x15fedf=_0x3fafb1;if(!Sprite_FieldGaugeATB[_0x15fedf(0x9a)][_0x15fedf(0x183)])return;const _0x51dbae=Sprite_FieldGaugeATB[_0x15fedf(0x9a)],_0x4f333f=this[_0x15fedf(0x17f)]===$gameParty?_0x15fedf(0x1b9):_0x15fedf(0x207),_0x46c053='%1SystemBg'[_0x15fedf(0xf4)](_0x4f333f),_0xe97214=new Sprite();_0xe97214[_0x15fedf(0x1ac)]['x']=this[_0x15fedf(0x1ac)]['x'],_0xe97214[_0x15fedf(0x1ac)]['y']=this[_0x15fedf(0x1ac)]['y'];if(_0x51dbae[_0x46c053])_0xe97214[_0x15fedf(0x8f)]=ImageManager[_0x15fedf(0x100)](_0x51dbae[_0x46c053]);else{const _0xc84e96=_0x51dbae[_0x15fedf(0x1f4)];_0xe97214['bitmap']=new Bitmap(_0xc84e96,_0xc84e96);const _0x2fee41=ColorManager[_0x15fedf(0x1b0)](_0x51dbae[_0x15fedf(0x19b)[_0x15fedf(0xf4)](_0x4f333f)]),_0x29414b=ColorManager[_0x15fedf(0x1b0)](_0x51dbae[_0x15fedf(0x23c)[_0x15fedf(0xf4)](_0x4f333f)]);_0xe97214[_0x15fedf(0x8f)][_0x15fedf(0x114)](0x0,0x0,_0xc84e96,_0xc84e96,_0x2fee41,_0x29414b,!![]);}this['_backgroundSprite']=_0xe97214,this[_0x15fedf(0x217)](this[_0x15fedf(0x238)]),this[_0x15fedf(0x14d)]=this[_0x15fedf(0x238)][_0x15fedf(0x14d)],this['height']=this[_0x15fedf(0x238)][_0x15fedf(0x81)];},Sprite_FieldMarkerATB[_0x3fafb1(0x160)]['createGraphicSprite']=function(){const _0x24571d=_0x3fafb1,_0x26b06b=new Sprite();_0x26b06b[_0x24571d(0x1ac)]['x']=this['anchor']['x'],_0x26b06b['anchor']['y']=this[_0x24571d(0x1ac)]['y'],this[_0x24571d(0xcf)]=_0x26b06b,this[_0x24571d(0x217)](this['_graphicSprite']),this[_0x24571d(0x23d)]();},Sprite_FieldMarkerATB[_0x3fafb1(0x160)]['createBorderSprite']=function(){const _0x1207d7=_0x3fafb1;if(!Sprite_FieldGaugeATB[_0x1207d7(0x9a)][_0x1207d7(0x1b7)])return;const _0x4f2171=Sprite_FieldGaugeATB['Settings'],_0xaeb00a=this['_unit']===$gameParty?_0x1207d7(0x1b9):_0x1207d7(0x207),_0x4dfbd9=_0x1207d7(0xfe)[_0x1207d7(0xf4)](_0xaeb00a),_0xd4a8c9=new Sprite();_0xd4a8c9['anchor']['x']=this[_0x1207d7(0x1ac)]['x'],_0xd4a8c9['anchor']['y']=this[_0x1207d7(0x1ac)]['y'];if(_0x4f2171[_0x4dfbd9])_0xd4a8c9[_0x1207d7(0x8f)]=ImageManager[_0x1207d7(0x100)](_0x4f2171[_0x4dfbd9]);else{let _0xeb31c9=_0x4f2171[_0x1207d7(0x1f4)],_0x552bd7=_0x4f2171[_0x1207d7(0xe3)];_0xd4a8c9[_0x1207d7(0x8f)]=new Bitmap(_0xeb31c9,_0xeb31c9);const _0x5262ed=_0x1207d7(0x118),_0x36dfeb=ColorManager[_0x1207d7(0x1b0)](_0x4f2171[_0x1207d7(0x1bc)[_0x1207d7(0xf4)](_0xaeb00a)]);_0xd4a8c9[_0x1207d7(0x8f)][_0x1207d7(0x1dd)](0x0,0x0,_0xeb31c9,_0xeb31c9,_0x5262ed),_0xeb31c9-=0x2,_0xd4a8c9[_0x1207d7(0x8f)][_0x1207d7(0x1dd)](0x1,0x1,_0xeb31c9,_0xeb31c9,_0x36dfeb),_0xeb31c9-=_0x552bd7*0x2,_0xd4a8c9[_0x1207d7(0x8f)][_0x1207d7(0x1dd)](0x1+_0x552bd7,0x1+_0x552bd7,_0xeb31c9,_0xeb31c9,_0x5262ed),_0xeb31c9-=0x2,_0x552bd7+=0x1,_0xd4a8c9[_0x1207d7(0x8f)]['clearRect'](0x1+_0x552bd7,0x1+_0x552bd7,_0xeb31c9,_0xeb31c9);}this[_0x1207d7(0x238)]=_0xd4a8c9,this['addChild'](this[_0x1207d7(0x238)]);},Sprite_FieldMarkerATB['prototype']['createLetterSprite']=function(){const _0xe997b4=_0x3fafb1,_0x110554=Sprite_FieldGaugeATB[_0xe997b4(0x9a)];if(!_0x110554[_0xe997b4(0x1e0)])return;if(this[_0xe997b4(0x17f)]===$gameParty)return;const _0xfb9c10=_0x110554[_0xe997b4(0x1f4)],_0x20f768=new Sprite();_0x20f768[_0xe997b4(0x1ac)]['x']=this[_0xe997b4(0x1ac)]['x'],_0x20f768[_0xe997b4(0x1ac)]['y']=this[_0xe997b4(0x1ac)]['y'],_0x20f768[_0xe997b4(0x8f)]=new Bitmap(_0xfb9c10,_0xfb9c10),this[_0xe997b4(0x72)]=_0x20f768,this['addChild'](this['_letterSprite']);},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x1e7)]=function(){const _0x27107c=_0x3fafb1,_0x53415c=Sprite_FieldGaugeATB[_0x27107c(0x9a)];if(!_0x53415c['ShowMarkerArrow'])return;const _0x3f499e=new Sprite();_0x3f499e[_0x27107c(0x1ac)]['x']=this[_0x27107c(0x1ac)]['x'],_0x3f499e[_0x27107c(0x1ac)]['y']=this['anchor']['y'],this[_0x27107c(0x84)](_0x3f499e),this[_0x27107c(0x187)]=_0x3f499e,this[_0x27107c(0x217)](this[_0x27107c(0x187)]);},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x84)]=function(_0x15787b){const _0x56a09b=_0x3fafb1,_0x51a401=Sprite_FieldGaugeATB['Settings'],_0x57e0b5=_0x51a401[_0x56a09b(0x1f4)],_0x255f45=Math[_0x56a09b(0x177)](_0x57e0b5/0x2),_0x3b334f=this[_0x56a09b(0x1bb)](),_0x5efe3f=this['_unit']===$gameParty?'Actor':'Enemy',_0x4a7831=_0x51a401[_0x56a09b(0xf3)[_0x56a09b(0xf4)](_0x5efe3f)];_0x15787b[_0x56a09b(0x8f)]=ImageManager[_0x56a09b(0x100)](_0x51a401[_0x56a09b(0x6f)]);const _0x3884d0=0x18,_0x43f7e6=_0x3884d0/0x2,_0x5e5fb0=0x60+_0x3884d0,_0x3a41f7=0x0+_0x3884d0;if(_0x3b334f&&_0x4a7831)_0x15787b[_0x56a09b(0x73)](_0x5e5fb0+_0x43f7e6,_0x3a41f7+_0x43f7e6+_0x3884d0,_0x3884d0,_0x43f7e6),_0x15787b['y']+=_0x255f45,_0x15787b['anchor']['y']=0x0;else{if(_0x3b334f&&!_0x4a7831)_0x15787b[_0x56a09b(0x73)](_0x5e5fb0+_0x43f7e6,_0x3a41f7,_0x3884d0,_0x43f7e6),_0x15787b['y']-=_0x255f45,_0x15787b[_0x56a09b(0x1ac)]['y']=0x1;else{if(!_0x3b334f&&_0x4a7831)_0x15787b['setFrame'](_0x5e5fb0,_0x3a41f7+_0x43f7e6,_0x43f7e6,_0x3884d0),_0x15787b['x']-=Math[_0x56a09b(0xca)](_0x255f45*1.75),_0x15787b[_0x56a09b(0x1ac)]['x']=0x0;else!_0x3b334f&&!_0x4a7831&&(_0x15787b[_0x56a09b(0x73)](_0x5e5fb0+_0x3884d0+_0x43f7e6,_0x3a41f7+_0x43f7e6,_0x43f7e6,_0x3884d0),_0x15787b['x']+=Math[_0x56a09b(0xca)](_0x255f45*1.75),_0x15787b[_0x56a09b(0x1ac)]['x']=0x1);}}},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x7c)]=function(){const _0x51ac40=_0x3fafb1;return this[_0x51ac40(0x17f)]===$gameParty?$gameParty[_0x51ac40(0xed)]()[this[_0x51ac40(0x127)]]:$gameTroop[_0x51ac40(0xbd)]()[this[_0x51ac40(0x127)]];},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x235)]=function(){const _0x6be9a1=_0x3fafb1;Sprite_Clickable['prototype'][_0x6be9a1(0x235)][_0x6be9a1(0x195)](this),this['updateOpacity'](),this[_0x6be9a1(0x191)](),this[_0x6be9a1(0x180)](),this[_0x6be9a1(0x89)](),this[_0x6be9a1(0xec)](),this['updateLetter'](),this[_0x6be9a1(0x109)]();},Sprite_FieldMarkerATB['prototype']['updateOpacity']=function(){const _0x15e61f=_0x3fafb1,_0x202396=this[_0x15e61f(0x123)](),_0x51b2fa=Sprite_FieldGaugeATB[_0x15e61f(0x9a)]['OpacityRate'];if(this['opacity']>_0x202396)this[_0x15e61f(0x113)]=Math[_0x15e61f(0x8b)](_0x202396,this[_0x15e61f(0x113)]-_0x51b2fa);else this['opacity']<_0x202396&&(this[_0x15e61f(0x113)]=Math['min'](_0x202396,this[_0x15e61f(0x113)]+_0x51b2fa));},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x123)]=function(){const _0x4bf900=_0x3fafb1,_0x118712=this[_0x4bf900(0x7c)]();if(!_0x118712)return 0x0;if(_0x118712['isHidden']())return 0x0;if(_0x118712[_0x4bf900(0xb2)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x1bb)]=function(){const _0x51a938=_0x3fafb1;if(this[_0x51a938(0x218)]!==undefined)return this['_horz'];const _0x87921e=Sprite_FieldGaugeATB['Settings'][_0x51a938(0x188)];return this['_horz']=[_0x51a938(0x14b),_0x51a938(0x1af)]['includes'](_0x87921e),this['_horz'];},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x191)]=function(){const _0x40e3bf=_0x3fafb1,_0x4040ab=Sprite_FieldGaugeATB[_0x40e3bf(0x9a)],_0x368006=this['isGaugeHorizontal'](),_0x1b4c5c=this['_unit']===$gameParty?'Actor':'Enemy',_0x3ce6c3=_0x4040ab[_0x40e3bf(0xa9)],_0x142ce5=_0x4040ab[_0x40e3bf(0xf3)[_0x40e3bf(0xf4)](_0x1b4c5c)];_0x368006?(this['y']=_0x4040ab['GaugeThick']/0x2,this['y']+=_0x142ce5?-_0x3ce6c3:_0x3ce6c3):(this['x']=_0x4040ab[_0x40e3bf(0xe8)]/0x2,this['x']+=_0x142ce5?_0x3ce6c3:-_0x3ce6c3);},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x180)]=function(_0x40f0a5){const _0x220f11=_0x3fafb1,_0x235b16=this[_0x220f11(0x7c)]();if(!_0x235b16)return;const _0x1086bd=_0x235b16[_0x220f11(0xc1)]();if(_0x1086bd>=Infinity)return;const _0x9e2848=Sprite_FieldGaugeATB[_0x220f11(0x9a)],_0x39c230=this[_0x220f11(0x1bb)](),_0x448164=this[_0x220f11(0xeb)](),_0x446be4=_0x40f0a5?Infinity:_0x9e2848[_0x220f11(0x1e8)];if(_0x39c230&&this['x']!==_0x448164){if(this['x']>_0x448164)this['x']=Math['max'](_0x448164,this['x']-_0x446be4);if(this['x']<_0x448164)this['x']=Math[_0x220f11(0x1d5)](_0x448164,this['x']+_0x446be4);}else{if(!_0x39c230&&this['x']!==_0x448164){if(this['y']>_0x448164)this['y']=Math[_0x220f11(0x8b)](_0x448164,this['y']-_0x446be4);if(this['y']<_0x448164)this['y']=Math[_0x220f11(0x1d5)](_0x448164,this['y']+_0x446be4);}}},Sprite_FieldMarkerATB[_0x3fafb1(0x160)]['targetPositionOnGauge']=function(){const _0x192004=_0x3fafb1,_0x41cda2=Sprite_FieldGaugeATB[_0x192004(0x9a)],_0x2c7ecc=this['battler'](),_0x24b17c=this[_0x192004(0x1bb)](),_0x54079f=this[_0x192004(0xae)][_0x192004(0x8f)][_0x192004(0x14d)],_0x20d142=this[_0x192004(0xae)][_0x192004(0x8f)]['height'],_0x2f6097=_0x41cda2[_0x192004(0xac)][_0x192004(0x1ca)](0x0,0x1),_0x27a248=_0x41cda2['GaugeDirection'];let _0x561158=_0x2c7ecc[_0x192004(0x86)]()*_0x2f6097;_0x561158+=(0x1-_0x2f6097)*_0x2c7ecc[_0x192004(0xc1)]();if(_0x2c7ecc===BattleManager['_subject'])_0x561158=0x1;if(!_0x27a248)_0x561158=0x1-_0x561158;let _0x778898=0x0;if(_0x24b17c)_0x778898=_0x561158*_0x54079f;else!_0x24b17c&&(_0x778898=_0x561158*_0x20d142);return Math[_0x192004(0x177)](_0x778898);},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x89)]=function(){const _0xeb7740=_0x3fafb1,_0x4d148e=this[_0xeb7740(0x7c)]();if(!_0x4d148e)return;const _0x58db27=Sprite_FieldGaugeATB[_0xeb7740(0x9a)],_0x34d638=this[_0xeb7740(0x17f)]===$gameParty?'Actor':'Enemy';let _0x361aaf=_0x4d148e[_0xeb7740(0x19d)]();if(_0x4d148e[_0xeb7740(0x1f3)]()&&_0x361aaf===_0xeb7740(0x20b))_0x361aaf=_0xeb7740(0x17a);else _0x4d148e[_0xeb7740(0x137)]()&&_0x361aaf===_0xeb7740(0x112)&&(_0x361aaf='enemy');if(this[_0xeb7740(0x1b1)]!==_0x361aaf)return this[_0xeb7740(0x23d)]();switch(this[_0xeb7740(0x1b1)]){case _0xeb7740(0x17a):if(this[_0xeb7740(0x1a4)]!==_0x4d148e[_0xeb7740(0x12a)]())return this[_0xeb7740(0x23d)]();if(this[_0xeb7740(0x1fa)]!==_0x4d148e['fieldAtbGraphicFaceIndex']())return this[_0xeb7740(0x23d)]();break;case _0xeb7740(0x18a):if(this[_0xeb7740(0x13d)]!==_0x4d148e['fieldAtbGraphicIconIndex']())return this[_0xeb7740(0x23d)]();break;case _0xeb7740(0x20b):if(_0x4d148e[_0xeb7740(0xc2)]()){if(this[_0xeb7740(0x157)]!==_0x4d148e[_0xeb7740(0x18e)]())return this['processUpdateGraphic']();}else{if(this[_0xeb7740(0x1db)]!==_0x4d148e[_0xeb7740(0x155)]())return this[_0xeb7740(0x23d)]();}break;case _0xeb7740(0x112):if(_0x4d148e[_0xeb7740(0x1f3)]()){if(this['_graphicSv']!==_0x4d148e[_0xeb7740(0x155)]())return this[_0xeb7740(0x23d)]();}else{if(this[_0xeb7740(0x1db)]!==_0x4d148e[_0xeb7740(0x155)]())return this[_0xeb7740(0x23d)]();}break;}},Sprite_FieldMarkerATB['prototype']['processUpdateGraphic']=function(){const _0x3e2b66=_0x3fafb1,_0x171a8d=this['battler']();if(!_0x171a8d)return;this[_0x3e2b66(0x1b1)]=_0x171a8d[_0x3e2b66(0x19d)]();if(_0x171a8d['isActor']()&&this[_0x3e2b66(0x1b1)]==='enemy')this[_0x3e2b66(0x1b1)]=_0x3e2b66(0x17a);else _0x171a8d[_0x3e2b66(0x137)]()&&this[_0x3e2b66(0x1b1)]===_0x3e2b66(0x112)&&(this[_0x3e2b66(0x1b1)]=_0x3e2b66(0x20b));let _0x2bcaf7;switch(this[_0x3e2b66(0x1b1)]){case'face':this[_0x3e2b66(0x1a4)]=_0x171a8d[_0x3e2b66(0x12a)](),this[_0x3e2b66(0x1fa)]=_0x171a8d[_0x3e2b66(0x82)](),_0x2bcaf7=ImageManager[_0x3e2b66(0xb6)](this[_0x3e2b66(0x1a4)]),_0x2bcaf7[_0x3e2b66(0x1f5)](this[_0x3e2b66(0x149)][_0x3e2b66(0x20e)](this,_0x2bcaf7));break;case _0x3e2b66(0x18a):this[_0x3e2b66(0x13d)]=_0x171a8d[_0x3e2b66(0x233)](),_0x2bcaf7=ImageManager['loadSystem'](_0x3e2b66(0xce)),_0x2bcaf7[_0x3e2b66(0x1f5)](this[_0x3e2b66(0x121)]['bind'](this,_0x2bcaf7));break;case _0x3e2b66(0x20b):if(_0x171a8d[_0x3e2b66(0xc2)]())this[_0x3e2b66(0x157)]=_0x171a8d['svBattlerName'](),_0x2bcaf7=ImageManager['loadSvActor'](this[_0x3e2b66(0x157)]),_0x2bcaf7[_0x3e2b66(0x1f5)](this[_0x3e2b66(0x239)][_0x3e2b66(0x20e)](this,_0x2bcaf7));else $gameSystem[_0x3e2b66(0x178)]()?(this['_graphicEnemy']=_0x171a8d[_0x3e2b66(0x155)](),_0x2bcaf7=ImageManager[_0x3e2b66(0x21c)](this['_graphicEnemy']),_0x2bcaf7['addLoadListener'](this[_0x3e2b66(0x1eb)][_0x3e2b66(0x20e)](this,_0x2bcaf7))):(this[_0x3e2b66(0x1db)]=_0x171a8d[_0x3e2b66(0x155)](),_0x2bcaf7=ImageManager[_0x3e2b66(0x220)](this[_0x3e2b66(0x1db)]),_0x2bcaf7[_0x3e2b66(0x1f5)](this[_0x3e2b66(0x1eb)][_0x3e2b66(0x20e)](this,_0x2bcaf7)));break;case _0x3e2b66(0x112):this[_0x3e2b66(0x157)]=_0x171a8d[_0x3e2b66(0x155)](),_0x2bcaf7=ImageManager['loadSvActor'](this['_graphicSv']),_0x2bcaf7[_0x3e2b66(0x1f5)](this[_0x3e2b66(0x239)][_0x3e2b66(0x20e)](this,_0x2bcaf7));break;}},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x149)]=function(_0x16e44e){const _0x37b1c9=_0x3fafb1,_0x1f5185=Sprite_FieldGaugeATB['Settings'],_0x2d3e20=_0x1f5185[_0x37b1c9(0x1f4)],_0x5c9d60=this[_0x37b1c9(0x1fa)];this[_0x37b1c9(0xcf)][_0x37b1c9(0x8f)]=new Bitmap(_0x2d3e20,_0x2d3e20);const _0x5e15ce=this[_0x37b1c9(0xcf)]['bitmap'],_0x1f9527=ImageManager['faceWidth'],_0x274c63=ImageManager[_0x37b1c9(0x1df)],_0x555731=ImageManager[_0x37b1c9(0x22b)],_0x55ebaa=ImageManager['faceHeight'],_0x54a91c=_0x5c9d60%0x4*_0x1f9527+(_0x1f9527-_0x555731)/0x2,_0x25e07a=Math[_0x37b1c9(0x210)](_0x5c9d60/0x4)*_0x274c63+(_0x274c63-_0x55ebaa)/0x2;_0x5e15ce[_0x37b1c9(0x6a)](_0x16e44e,_0x54a91c,_0x25e07a,_0x555731,_0x55ebaa,0x0,0x0,_0x2d3e20,_0x2d3e20);},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x121)]=function(_0x69d1f0){const _0x378ae2=_0x3fafb1,_0x5ef4c3=Sprite_FieldGaugeATB['Settings'],_0x2032de=_0x5ef4c3[_0x378ae2(0x1f4)],_0x4c98a1=this[_0x378ae2(0x13d)];this[_0x378ae2(0xcf)][_0x378ae2(0x8f)]=new Bitmap(_0x2032de,_0x2032de);const _0x40cce6=this['_graphicSprite'][_0x378ae2(0x8f)],_0x3f5ec5=ImageManager[_0x378ae2(0xbc)],_0x2628e8=ImageManager[_0x378ae2(0x150)],_0x3ed622=_0x4c98a1%0x10*_0x3f5ec5,_0x15b334=Math['floor'](_0x4c98a1/0x10)*_0x2628e8;_0x40cce6[_0x378ae2(0x6a)](_0x69d1f0,_0x3ed622,_0x15b334,_0x3f5ec5,_0x2628e8,0x0,0x0,_0x2032de,_0x2032de);},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0x239)]=function(_0x433d3a){const _0x3c9ce8=_0x3fafb1,_0x2fb0fa=Sprite_FieldGaugeATB[_0x3c9ce8(0x9a)],_0x492c61=_0x2fb0fa[_0x3c9ce8(0x1f4)];this['_graphicSprite'][_0x3c9ce8(0x8f)]=new Bitmap(_0x492c61,_0x492c61);const _0x70d638=this[_0x3c9ce8(0xcf)]['bitmap'],_0x321ff0=this[_0x3c9ce8(0x157)][_0x3c9ce8(0x1cc)](/\$/i),_0x5e7972=_0x321ff0?0x1:ImageManager[_0x3c9ce8(0x90)],_0x179da1=_0x321ff0?0x1:ImageManager[_0x3c9ce8(0x182)],_0x4b7eb4=_0x433d3a[_0x3c9ce8(0x14d)]/_0x5e7972,_0x49a404=_0x433d3a[_0x3c9ce8(0x81)]/_0x179da1,_0x4ead46=Math[_0x3c9ce8(0x1d5)](0x1,_0x492c61/_0x4b7eb4,_0x492c61/_0x49a404),_0x58440f=_0x4b7eb4*_0x4ead46,_0x174fc0=_0x49a404*_0x4ead46,_0x296132=Math['round']((_0x492c61-_0x58440f)/0x2),_0x539b70=Math['round']((_0x492c61-_0x174fc0)/0x2);_0x70d638[_0x3c9ce8(0x6a)](_0x433d3a,0x0,0x0,_0x4b7eb4,_0x49a404,_0x296132,_0x539b70,_0x58440f,_0x174fc0);},Sprite_FieldMarkerATB[_0x3fafb1(0x160)]['changeEnemyGraphicBitmap']=function(_0x313088){const _0xc8489c=_0x3fafb1,_0x24527c=Sprite_FieldGaugeATB[_0xc8489c(0x9a)],_0x238107=_0x24527c[_0xc8489c(0x1f4)];this['_graphicSprite'][_0xc8489c(0x8f)]=new Bitmap(_0x238107,_0x238107);const _0x3d1a1d=this[_0xc8489c(0xcf)]['bitmap'],_0x47669b=Math[_0xc8489c(0x1d5)](0x1,_0x238107/_0x313088['width'],_0x238107/_0x313088[_0xc8489c(0x81)]),_0x14a6d3=_0x313088[_0xc8489c(0x14d)]*_0x47669b,_0x1109fd=_0x313088[_0xc8489c(0x81)]*_0x47669b,_0xf50eeb=Math[_0xc8489c(0x177)]((_0x238107-_0x14a6d3)/0x2),_0x132c59=Math[_0xc8489c(0x177)]((_0x238107-_0x1109fd)/0x2);_0x3d1a1d['blt'](_0x313088,0x0,0x0,_0x313088[_0xc8489c(0x14d)],_0x313088[_0xc8489c(0x81)],_0xf50eeb,_0x132c59,_0x14a6d3,_0x1109fd);},Sprite_FieldMarkerATB['prototype'][_0x3fafb1(0xec)]=function(){const _0x1e37cd=_0x3fafb1,_0x45f748=this[_0x1e37cd(0x7c)]();if(!_0x45f748)return;if(!_0x45f748[_0x1e37cd(0x137)]())return;if(this[_0x1e37cd(0x132)]===_0x45f748[_0x1e37cd(0x247)]())return;this[_0x1e37cd(0x132)]=_0x45f748[_0x1e37cd(0x247)](),this[_0x1e37cd(0xcf)][_0x1e37cd(0x189)](_0x45f748['hasSvBattler']()?0x0:this[_0x1e37cd(0x132)]);},Sprite_FieldMarkerATB['prototype']['updateLetter']=function(){const _0x376d20=_0x3fafb1;if(!this[_0x376d20(0x72)])return;const _0x2e1d65=this[_0x376d20(0x7c)]();if(!_0x2e1d65)return;if(this['_letter']===_0x2e1d65[_0x376d20(0x147)]&&this[_0x376d20(0x9e)]===_0x2e1d65[_0x376d20(0x9e)])return;this[_0x376d20(0x147)]=_0x2e1d65[_0x376d20(0x147)],this[_0x376d20(0x9e)]=_0x2e1d65[_0x376d20(0x9e)];const _0x13f155=Sprite_FieldGaugeATB[_0x376d20(0x9a)],_0x22f2ad=_0x13f155[_0x376d20(0x1f4)],_0x16b5e4=Math[_0x376d20(0x210)](_0x22f2ad/0x2),_0x5f2393=this[_0x376d20(0x72)][_0x376d20(0x8f)];_0x5f2393[_0x376d20(0x71)]();if(!this[_0x376d20(0x9e)])return;_0x5f2393[_0x376d20(0x12d)]=_0x13f155[_0x376d20(0x14e)]||$gameSystem[_0x376d20(0x6b)](),_0x5f2393['fontSize']=_0x13f155['EnemyBattlerFontSize']||0x10,_0x5f2393['drawText'](this['_letter'],0x2,_0x16b5e4,_0x22f2ad-0x4,_0x16b5e4-0x2,'right');},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x109)]=function(){const _0x1ed44b=_0x3fafb1,_0x4463da=this[_0x1ed44b(0x7c)]();if(!_0x4463da)return;const _0x13eda3=_0x4463da['battler']();if(!_0x13eda3)return;const _0x3daeca=_0x13eda3[_0x1ed44b(0xe6)]();if(!_0x3daeca)return;this[_0x1ed44b(0x83)](_0x3daeca[_0x1ed44b(0x67)]);},Sprite_FieldMarkerATB[_0x3fafb1(0x160)][_0x3fafb1(0x1fb)]=function(){return this['battler']();};