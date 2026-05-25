//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
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
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
 * 
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
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
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
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
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
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
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
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
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
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
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
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
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 * Version 1.14: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused turn order glitches with Action Times+ that
 *    aren't at 100% value. Fix made by Olivia.
 * ** Fixed a bug that caused added Action Times+ to not trigger on actors that
 *    have already exhausted their current turns if raised due to a state.
 *    Fix made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the Forced Action of a battler is not used properly.
 *    Fix made by Arisu.
 * 
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
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
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
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
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
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
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
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
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
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
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
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
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
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
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
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
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
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
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
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
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
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
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
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
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

function _0x5f55(){const _0x14e79c=['Game_Action_applyItemUserEffect','_positionTargetX','_contentsBackSprite','LKEgu','Game_Battler_makeSpeed','Enemy','RepositionTopHelpX','addBattlerToTurnOrderAtStart','createActorCommandWindow','EFFECT_ADD_BUFF','max','_previewContainer','initBattleSystemOTB','HeFkb','onTurnEnd','makeActions','cancel','loadEnemy','refreshTurnOrder','prototype','constructor','QxYeR','TargetNextOrder','2681262MILLvN','makeActionTimesOTB','TurnOrderOTBGraphicType','setText','Game_BattlerBase_recoverAll','KoqNx','getUnitSideSide','BattleManager_getNextSubject','_otbTurnOrderGraphicType','_ogWindowLayerY','isUsingSideviewUiLayout','faceHeight','kqJUk','UiSubjectOffsetX','Game_Actor_selectNextCommand','LhJSa','isInfinitySpeedOTB','_blendColor','battlerHue','item','updateTurnOrders','right','makeNextActionOrdersOTB','30kSVMcK','_otbTimesActedThisTurn','isNextOtbSubject','DisplayOffsetY','%1BgColor2','PreviewScale','loadSystem','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ActorBattlerIcon','updatePadding','shift','RegExp','clamp','fLmDw','isSideView','_otbTurnOrderFaceName','changeSourceArray','UiSubjectText','SideviewBattleUI','createBorderSprite','EnemyBattlerFaceIndex','_spriteGroupWidth','NFEvv','windowRect','wsueR','RepositionTopHelpY','applyGlobalBattleSystemOTB','adjustForPreview','allBattleMembers','Game_BattlerBase_hide','addLoadListener','_hidden','finishActorInput','zAVck','otbAddForceActionBattler','Game_Battler_removeState','OTB','otbUnshiftBattlerToTurnOrders','gsvKV','hpSKV','_nextTurn','TrjeU','ShowMarkerBorder','InfinityClamp','onBattleEndOTB','Scene_Battle_createActorCommandWindow','mLaND','version','bitmapHeight','OtbTurnOrderEnemyFace','Instant','remove','otbCreateNewTurnOrderSprites','jqeWI','image','_index','STR','Game_Action_applyGlobal','removeUnableTurnOrderSprites','loadSvEnemy','305QpCOAE','currentAction','YeZXG','_subject','_graphicType','_otbTurnOrderWindow','ehzve','drawUiText','initialize','findIndex','battlerName','otbShiftTurnOrderForSubject','MHKCU','cFktl','xWqvW','qPQTf','opacity','qwkyu','createOTBTurnOrderWindow','drawBgImage','UpdateFrames','Game_Battler_forceAction','_instance','format','speed','Scene_Battle_createAllWindows','onSkillCancel','parameters','addChildAt','FaceName','_otbTurnOrderFaceIndex','commandGuard','wFxBL','_actions','boxHeight','removeStatesAuto','allowRandomSpeed','otbAddBattlerToTurnOrderAtEnd','TargetFollOrder','_nextX','createNewTurnOrderSprites','ConvertSpeedJS','VisuMZ_3_SideviewBattleUI','_targetHomeX','otbCalcTargetCurrentOrderChange','clearRect','FMveo','changeEnemyGraphicBitmap','makeActionOrdersOTB','faceIndex','_actorCommandWindow','startInputOTB','otbPreviewOrderClear','sYquG','BattleManager_finishActorInput','index','actorCommandSingleSkill','SpriteLength','_currentX','attack','_currentTurn','forceAction','VdgTK','_forceAction','QqACa','concat','SpriteThin','bDCyA','FhnPD','BattleManager_forceAction','yJVWz','OdSDW','lAeDg','EnemyBattlerType','updateOpacity','_homeX','TargetCurrOrder','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','push','selectNextCommand','xQKON','BattleManager_startInput','Pgksj','isActiveTpb','372570LlBYNq','OVKwl','BattleManager_isTurnBased','Mechanics','AscCe','battleMembers','blt','onBattleEnd','Scene_Battle_actorCommandSingleSkill','slNco','Scene_Battle_onEnemyCancel','BorderThickness','needsSelection','canChangeOtbTurnOrder','selectNextActorOTB','_previewCurrent','Thfyx','BattleManager_setup','EnemyBattlerDrawLetter','loadSvActor','close','makeActionOrders','icon','EesWf','Scene_Battle_onActorCancel','Scene_Battle_commandAttack','BLduF','TurnOrderOTBGraphicFaceName','registerCommand','updateLetter','height','randomInt','%1SystemBorder','otbRemoveCurrentSubject','FrSng','qVmWO','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','min','ActionBattlersNextFilter','getBorderThickness','GetAllIndicies','BattleManager_processTurn','UiCurrentText','UxOVJ','OecwW','DisplayOffsetX','Scene_Battle_onItemCancel','kCCAW','round','svActorVertCells','processTurn','_actionBattlers','UserFollOrder','createTurnOrderOTBGraphicFaceIndex','_tempActor','ceil','Scene_Battle_onItemOk','UOjXH','mainFontFace','createSpriteContainers','PreviewOffsetX','eRlQs','startActorInput','setHue','SystemTurnOrderVisibility','otbGainInstant','_letter','_last_otb_actionPlusSetLength','createOrderPreview','OwaaP','effects','resetFontSettings','%1BgColor1','includes','otbCalcUserNextOrderChange','_scene','_graphicFaceName','map','%1SystemBg','Darmi','startActorCommandSelection','_graphicSv','BgDimStyle','createTurnOrderOTBGraphicType','OTB_ADDED_ACTION_TIMES','XiVji','svActorHorzCells','createTurnOrderOTBGraphicIconIndex','czSdA','makeSpeed','makeDeepCopy','MoveDistance','iconWidth','_homeY','return\x200','initHomePositions','otbPreviewOrderChange','Scene_Battle_commandCancel','FaceIndex','center','MlNKg','smgqk','hasSvBattler','tRFMP','lineHeight','clearMakeActionTimesCacheOTB','isHorz','preEndActionOTB','isAppeared','resumeTurnOrderSprites','TkpoW','createGraphicSprite','ZHIdR','Game_Battler_addState','endBattlerActions','Game_Party_addActor','362CrAjSn','aiARI','oOPrV','additionalTargetXAdjustments','4602mFIAXu','Game_Battler_performCollapse','reduce','applyItemTargetEffectOTB','width','subject','_logWindow','EKnpQ','removeSprite','ARRAYFUNC','zHSeo','_positionTargetY','visible','children','onBattleStartOTB','ConvertAgiBuffCurrent','UfYCD','_fadeTarget','dQWMU','faceName','_helpWindow','clearOrderPreview','Scene_Battle_onSkillCancel','changeFaceGraphicBitmap','auto','isPreviousSceneBattleTransitionable','onItemCancel','TurnOrderOTBGraphicFaceIndex','updateSelectionEffect','_phase','_tempBattler','previewOrderByAction','Fidia','isBattleMember','code','bitmapWidth','TurnOrderOTBGraphicIconIndex','WidthBase','_cache_makeActionTimesOTB','otbReturnBattlerToTurnOrders','Conversion','vxFsh','battleEnd','Qcupp','performCollapse','commandAttack','%1BorderColor','WbsuO','containerWindow','_graphicFaceIndex','isEnemy','_actorWindow','numActions','#000000','canMove','PreviewActor','EFFECT_ADD_DEBUFF','fillRect','startInput','eEZCx','lJMRr','isOTB','clearTurnOrderOTBGraphics','BattleManager_selectNextActor','hide','KooNr','Game_Battler_onTurnEnd','Settings','Game_BattlerBase_appear','sortContainer','commandCancel','ShowMarkerBg','OtbTurnOrderClearActorGraphic','active','update','iLoWG','anchor','isActor','oQznx','dataId','OtbTurnOrderClearEnemyGraphic','create','_graphicEnemy','TfATg','_spriteContainer','createTurnOrderOTBGraphicFaceName','shiftTurnOrderForSubject','_windowLayer','contentsOpacity','performActionEndOTB','NbpTq','FMfuC','isSceneBattle','RGieV','bottom','RepositionLogWindow','EnemyBattlerFontFace','checkOpacity','_lastTargetIndex','lAsRq','requestUpdateTurnOrders','ezDUX','Gsdud','ActionBattlersFilter','currentExt','selectNextActor','ConvertAgiDebuffCurrent','splice','_otb_createdFirstTurnOrders','OTB_CONVERT_AGI_BUFF_NEXT_TURN','createLetterSprite','IconIndex','UserAddActionCurrent','postEndActionOTB','VbhiQ','coYlS','DUUkV','onBattleStart','UserAddActionNext','ARRAYSTRUCT','note','qJoPx','toUpperCase','NaHDu','_homeDuration','setSkill','otbCalcUserCurrentOrderChange','Actors','BattleManager_battleSys','setAttack','_fadeSpeed','eemjh','defaultPosition','LXcTI','left','otbShiftNextTurnSpritesToCurrentTurn','_positionDuration','_statusWindow','processUpdateGraphic','call','getChildIndex','_ogWindowLayerX','addChildToBack','TargetAddActionNext','STRUCT','kgUCa','qUHmJ','floor','JXogG','IconSet','_containerWidth','addForceActionBattler','BattleManager_endAction','Jrubm','OtbTurnOrderActorIcon','pop','Game_Action_speed','UiNextOffsetY','EnemyBattlerFaceName','repositionLogWindowOTB','_requestTurnOrderUpdate','appear','aRBrR','SgMvt','otbRemoveUnableTurnOrderSprites','PreviewOffsetY','ScAhp','drawDimmedArea','endTurn','BgImageOffsetY','getColor','mnqxe','members','StatusWindow','_graphicSprite','onActorOk','changeIconGraphicBitmap','aPhmd','containerPosition','_graphicIconIndex','enemy','ioaVJ','isTurnBased','SDoeL','commandFight','_partyCommandWindow','setOTBGraphicIconIndex','Enemies','4168WgCfpV','actor','UiSubjectOffsetY','Scene_Battle_commandFight','Scene_Battle_commandGuard','Game_Action_allowRandomSpeed','parse','battler','UvGjy','413633nLcZaV','_backgroundSprite','addState','bind','removeActionBattlersOTB','UiFontSize','Game_Party_removeActor','removeChild','sbBaP','processTurnOTB','removeState','sOBVs','OrderDirection','_bgImageSprite','bitmap','filter','_unit','calculateTargetPositions','applyItemAddedActionOTB','OtbTurnOrderEnemyIcon','canInput','HvrnX','updateGraphicHue','mmNww','qEaPa','_isAlive','scale','contents','recoverAll','updateStateTurns','HLRrU','InXST','gradientFillRect','NgHtD','svactor','MtzyN','startFade','getBattleSystem','Game_System_initialize','BattleManager_endTurn','_isBattleOver','nTDpd','isTpb','applyGlobal','onSkillOk','removeActor','Window_Selectable_select','ConvertParams','boxWidth','decideRandomTarget','DpHtO','ActorBattlerType','_inputting','clear','RepositionTopForHelp','makeActionTimes','UneNy','initMembersOTB','calculateTargetIndex','padding','SbmSm','EnableActionTimes','HZgwF','name','oolcX','face','LogWindowOffsetY','endAction','setItem','BmdOX','Scene_Battle_onActorOk','Game_Battler_onBattleStart','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','moveToPosition','isBattleItemWindowOTB','sort','indexOf','setTarget','cSatM','937KwxlQI','_subjectX','Game_Battler_onBattleEnd','createInitialPositions','ScreenBuffer','getInfinityClamp','BosOy','_targetHomeY','addChild','iconHeight','cJiUY','createOrderPreviewSprite','_otbTurnOrderVisible','_containerHeight','mainSprite','actionPlusSet','BattleManager_isActiveTpb','_graphicHue','fontSize','DisplayPosition','TargetAddActionCurrent','Visible','updatePosition','IJZyP','zOhKK','changeSvActorGraphicBitmap','onActorCancel','forceActionOTB','nYomF','_stateIDs','battleSys','_isAppeared','_previewNext','select','hpmUt','mCBDy','createAllWindows','_forcedBattlers','drawText','faceWidth','otbProcessActionCheck','tdyEc','MuXhV','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isBattleSystemOTBTurnOrderVisible','processSpriteRemoval','inputtingAction','loadFace','setup','applyBattleItemWindowOTB','BattleSystemOTB','initMembers','top','BgImageOffsetX','createTurnOrderSprites','shiftNextTurnSpritesToCurrentTurn','updateVisibility','otbAddActions','InitialSpeedJS','otbApplyActionTimes','SubjectDistance','8KgWuBk','_sourceArray','_preemptive','length','14967336NGpFIj','Game_Battler_makeActionTimes','PreviewEnemy','applyItemUserEffect','vaDJp','match','3787kzKuHc','_plural','EVAL','trim','AllowRandomSpeed','exit','status','hBaqs','otbAddBattlerToTurnOrderAtStart','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','setBlendColor','refresh','PWkXA','BattleManager_isTpb','createActorCommandWindowOTB','dNPaj','BgImageFilename','YHGNf','YAUTT','Scene_Battle_onEnemyOk','random','removeCurrentSubject','bUPFy','QeSqv','createChildren','otbCalcTargetNextOrderChange','gMvfm','_currentActor','getNextSubject','onTurnEndOTB','_speed','getStateIdWithName','EnemyBattlerIcon','dVDZg','onEnemyOk','_letterSprite','Actor','isAlive','svBattlerName','bBNCJ','_otbTurnOrderIconIndex','makeOTBSpeed','_offset','ThucT','vRIsU','UiNextOffsetX','OTB_STUN_INFINITY_CLAMP','Window_Help_setItem','SnFwN','createBackgroundSprite','description','updateGraphic','EnemyBattlerFontSize','addActor','turnOrderChangeOTB','_fadeDuration','_otb_actionBattlersNext','stepForward'];_0x5f55=function(){return _0x14e79c;};return _0x5f55();}const _0x3f8e58=_0xe4fd;(function(_0x4093e0,_0x2223d4){const _0xaa7f0=_0xe4fd,_0x3e46c1=_0x4093e0();while(!![]){try{const _0x3ffa80=parseInt(_0xaa7f0(0x336))/0x1*(-parseInt(_0xaa7f0(0x21e))/0x2)+parseInt(_0xaa7f0(0x475))/0x3*(-parseInt(_0xaa7f0(0x373))/0x4)+parseInt(_0xaa7f0(0x421))/0x5*(parseInt(_0xaa7f0(0x222))/0x6)+-parseInt(_0xaa7f0(0x37d))/0x7*(parseInt(_0xaa7f0(0x2de))/0x8)+-parseInt(_0xaa7f0(0x3ce))/0x9+parseInt(_0xaa7f0(0x3e5))/0xa*(-parseInt(_0xaa7f0(0x2e7))/0xb)+parseInt(_0xaa7f0(0x377))/0xc;if(_0x3ffa80===_0x2223d4)break;else _0x3e46c1['push'](_0x3e46c1['shift']());}catch(_0x5c7775){_0x3e46c1['push'](_0x3e46c1['shift']());}}}(_0x5f55,0x2cccc));var label=_0x3f8e58(0x368),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3f8e58(0x2f6)](function(_0x232614){const _0x1cac10=_0x3f8e58;return _0x232614['status']&&_0x232614['description'][_0x1cac10(0x1f3)]('['+label+']');})[0x0];VisuMZ[label][_0x3f8e58(0x265)]=VisuMZ[label][_0x3f8e58(0x265)]||{},VisuMZ[_0x3f8e58(0x316)]=function(_0x4bc90a,_0x2aa81f){const _0x5e01c3=_0x3f8e58;for(const _0x5c3ed9 in _0x2aa81f){if(_0x5c3ed9[_0x5e01c3(0x37c)](/(.*):(.*)/i)){const _0x3ddf4b=String(RegExp['$1']),_0x305934=String(RegExp['$2'])[_0x5e01c3(0x29c)]()[_0x5e01c3(0x380)]();let _0x1c1ae5,_0x24530f,_0x1ec626;switch(_0x305934){case'NUM':_0x1c1ae5=_0x2aa81f[_0x5c3ed9]!==''?Number(_0x2aa81f[_0x5c3ed9]):0x0;break;case'ARRAYNUM':_0x24530f=_0x2aa81f[_0x5c3ed9]!==''?JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9]):[],_0x1c1ae5=_0x24530f['map'](_0x4387df=>Number(_0x4387df));break;case _0x5e01c3(0x37f):_0x1c1ae5=_0x2aa81f[_0x5c3ed9]!==''?eval(_0x2aa81f[_0x5c3ed9]):null;break;case'ARRAYEVAL':_0x24530f=_0x2aa81f[_0x5c3ed9]!==''?JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9]):[],_0x1c1ae5=_0x24530f[_0x5e01c3(0x1f7)](_0x22c7b7=>eval(_0x22c7b7));break;case'JSON':_0x1c1ae5=_0x2aa81f[_0x5c3ed9]!==''?JSON['parse'](_0x2aa81f[_0x5c3ed9]):'';break;case'ARRAYJSON':_0x24530f=_0x2aa81f[_0x5c3ed9]!==''?JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9]):[],_0x1c1ae5=_0x24530f[_0x5e01c3(0x1f7)](_0x4520f7=>JSON[_0x5e01c3(0x2e4)](_0x4520f7));break;case'FUNC':_0x1c1ae5=_0x2aa81f[_0x5c3ed9]!==''?new Function(JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9])):new Function(_0x5e01c3(0x208));break;case _0x5e01c3(0x22b):_0x24530f=_0x2aa81f[_0x5c3ed9]!==''?JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9]):[],_0x1c1ae5=_0x24530f['map'](_0x212b2b=>new Function(JSON['parse'](_0x212b2b)));break;case _0x5e01c3(0x41d):_0x1c1ae5=_0x2aa81f[_0x5c3ed9]!==''?String(_0x2aa81f[_0x5c3ed9]):'';break;case'ARRAYSTR':_0x24530f=_0x2aa81f[_0x5c3ed9]!==''?JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9]):[],_0x1c1ae5=_0x24530f[_0x5e01c3(0x1f7)](_0x39efc4=>String(_0x39efc4));break;case _0x5e01c3(0x2b2):_0x1ec626=_0x2aa81f[_0x5c3ed9]!==''?JSON[_0x5e01c3(0x2e4)](_0x2aa81f[_0x5c3ed9]):{},_0x1c1ae5=VisuMZ[_0x5e01c3(0x316)]({},_0x1ec626);break;case _0x5e01c3(0x299):_0x24530f=_0x2aa81f[_0x5c3ed9]!==''?JSON['parse'](_0x2aa81f[_0x5c3ed9]):[],_0x1c1ae5=_0x24530f[_0x5e01c3(0x1f7)](_0x40eefd=>VisuMZ[_0x5e01c3(0x316)]({},JSON['parse'](_0x40eefd)));break;default:continue;}_0x4bc90a[_0x3ddf4b]=_0x1c1ae5;}}return _0x4bc90a;},(_0x59f439=>{const _0x5153d4=_0x3f8e58,_0x2117b7=_0x59f439[_0x5153d4(0x326)];for(const _0x532d12 of dependencies){if('Hppar'==='Hppar'){if(!Imported[_0x532d12]){if(_0x5153d4(0x3c4)===_0x5153d4(0x3c4)){alert(_0x5153d4(0x361)[_0x5153d4(0x438)](_0x2117b7,_0x532d12)),SceneManager['exit']();break;}else{if(!_0x1c6dcf[_0x5153d4(0x265)][_0x5153d4(0x269)])return;const _0x4b881a=_0x5afd7c[_0x5153d4(0x265)],_0x510621=this[_0x5153d4(0x3d4)](),_0x6cfed8=_0x5153d4(0x1f8)[_0x5153d4(0x438)](_0x510621),_0x39dbfe=new _0x62d6be();_0x39dbfe[_0x5153d4(0x26e)]['x']=this['anchor']['x'],_0x39dbfe[_0x5153d4(0x26e)]['y']=this[_0x5153d4(0x26e)]['y'];if(_0x4b881a[_0x6cfed8])_0x39dbfe['bitmap']=_0x9ff9b4[_0x5153d4(0x3eb)](_0x4b881a[_0x6cfed8]);else{const _0x242093=this[_0x5153d4(0x245)](),_0x31bf7d=this[_0x5153d4(0x415)]();_0x39dbfe[_0x5153d4(0x2f5)]=new _0x5cfb29(_0x242093,_0x31bf7d);const _0xb38525=_0x348019[_0x5153d4(0x2cc)](_0x4b881a['%1BgColor1'[_0x5153d4(0x438)](_0x510621)]),_0x136c58=_0x2462fe[_0x5153d4(0x2cc)](_0x4b881a['%1BgColor2'['format'](_0x510621)]);_0x39dbfe['bitmap'][_0x5153d4(0x307)](0x0,0x0,_0x242093,_0x31bf7d,_0xb38525,_0x136c58,!![]);}this[_0x5153d4(0x2e8)]=_0x39dbfe,this[_0x5153d4(0x33e)](this[_0x5153d4(0x2e8)]),this[_0x5153d4(0x226)]=this[_0x5153d4(0x2e8)][_0x5153d4(0x226)],this[_0x5153d4(0x493)]=this[_0x5153d4(0x2e8)][_0x5153d4(0x493)];}}}else return _0x3d369f(_0x28b252['$1']);}const _0xe44c9=_0x59f439[_0x5153d4(0x3af)];if(_0xe44c9['match'](/\[Version[ ](.*?)\]/i)){const _0x469d36=Number(RegExp['$1']);_0x469d36!==VisuMZ[label][_0x5153d4(0x414)]&&(_0x5153d4(0x24b)!=='vxFsh'?_0x157e55['_cache_makeActionTimesOTB']=_0x10c233:(alert(_0x5153d4(0x3ec)[_0x5153d4(0x438)](_0x2117b7,_0x469d36)),SceneManager[_0x5153d4(0x382)]()));}if(_0xe44c9[_0x5153d4(0x37c)](/\[Tier[ ](\d+)\]/i)){if(_0x5153d4(0x3fd)!==_0x5153d4(0x27d)){const _0x10ea2f=Number(RegExp['$1']);_0x10ea2f<tier?_0x5153d4(0x44f)==='FMveo'?(alert(_0x5153d4(0x32f)['format'](_0x2117b7,_0x10ea2f,tier)),SceneManager[_0x5153d4(0x382)]()):(_0x580196[_0x5153d4(0x455)](),_0x3475c0['BattleSystemOTB'][_0x5153d4(0x4a3)][_0x5153d4(0x2ad)](this)):tier=Math[_0x5153d4(0x3c1)](_0x10ea2f,tier);}else return 0x0;}VisuMZ['ConvertParams'](VisuMZ[label][_0x5153d4(0x265)],_0x59f439[_0x5153d4(0x43c)]);})(pluginData),PluginManager[_0x3f8e58(0x491)](pluginData[_0x3f8e58(0x326)],_0x3f8e58(0x2bc),_0x13d800=>{const _0x74bafb=_0x3f8e58;VisuMZ[_0x74bafb(0x316)](_0x13d800,_0x13d800);const _0x4c857c=_0x13d800[_0x74bafb(0x2a1)],_0x2c11a1=_0x13d800[_0x74bafb(0x291)];for(const _0x45d4b4 of _0x4c857c){if(_0x74bafb(0x2d3)!==_0x74bafb(0x202)){const _0x285f60=$gameActors['actor'](_0x45d4b4);if(!_0x285f60)continue;_0x285f60[_0x74bafb(0x3d6)]=_0x74bafb(0x48b),_0x285f60['_otbTurnOrderIconIndex']=_0x2c11a1;}else return _0x30796a[_0x74bafb(0x25f)]();}}),PluginManager[_0x3f8e58(0x491)](pluginData[_0x3f8e58(0x326)],'OtbTurnOrderActorFace',_0x248ae8=>{const _0x21c29a=_0x3f8e58;VisuMZ['ConvertParams'](_0x248ae8,_0x248ae8);const _0x512ddb=_0x248ae8[_0x21c29a(0x2a1)],_0xcd85d3=_0x248ae8[_0x21c29a(0x43e)],_0x171dd5=_0x248ae8['FaceIndex'];for(const _0x26bb0e of _0x512ddb){if(_0x21c29a(0x3a9)===_0x21c29a(0x3a9)){const _0x5c0c5e=$gameActors[_0x21c29a(0x2df)](_0x26bb0e);if(!_0x5c0c5e)continue;_0x5c0c5e[_0x21c29a(0x3d6)]=_0x21c29a(0x328),_0x5c0c5e['_otbTurnOrderFaceName']=_0xcd85d3,_0x5c0c5e['_otbTurnOrderFaceIndex']=_0x171dd5;}else _0x11c753['BattleSystemOTB'][_0x21c29a(0x2e1)][_0x21c29a(0x2ad)](this);}}),PluginManager[_0x3f8e58(0x491)](pluginData[_0x3f8e58(0x326)],_0x3f8e58(0x26a),_0x4fca50=>{const _0x27a886=_0x3f8e58;VisuMZ[_0x27a886(0x316)](_0x4fca50,_0x4fca50);const _0x27daad=_0x4fca50[_0x27a886(0x2a1)];for(const _0x28cc74 of _0x27daad){if(_0x27a886(0x1e7)!==_0x27a886(0x1e7)){const _0x45f120=new _0x42e806();_0x45f120['anchor']['x']=this[_0x27a886(0x26e)]['x'],_0x45f120[_0x27a886(0x26e)]['y']=this['anchor']['y'],this[_0x27a886(0x2d0)]=_0x45f120,this[_0x27a886(0x33e)](this['_graphicSprite']),this[_0x27a886(0x2ac)]();}else{const _0x211f36=$gameActors[_0x27a886(0x2df)](_0x28cc74);if(!_0x211f36)continue;_0x211f36[_0x27a886(0x260)]();}}}),PluginManager[_0x3f8e58(0x491)](pluginData['name'],_0x3f8e58(0x2fa),_0x42726d=>{const _0x2183f7=_0x3f8e58;VisuMZ[_0x2183f7(0x316)](_0x42726d,_0x42726d);const _0x1b5165=_0x42726d[_0x2183f7(0x2dd)],_0xbb55c4=_0x42726d[_0x2183f7(0x291)];for(const _0x20fd72 of _0x1b5165){const _0x4e01bc=$gameTroop[_0x2183f7(0x2ce)]()[_0x20fd72];if(!_0x4e01bc)continue;_0x4e01bc[_0x2183f7(0x3d6)]=_0x2183f7(0x48b),_0x4e01bc[_0x2183f7(0x3a5)]=_0xbb55c4;}}),PluginManager['registerCommand'](pluginData[_0x3f8e58(0x326)],_0x3f8e58(0x416),_0x4bba1f=>{const _0x444c2e=_0x3f8e58;VisuMZ[_0x444c2e(0x316)](_0x4bba1f,_0x4bba1f);const _0x1c74e0=_0x4bba1f[_0x444c2e(0x2dd)],_0x4b106d=_0x4bba1f[_0x444c2e(0x43e)],_0x3e4ae2=_0x4bba1f[_0x444c2e(0x20c)];for(const _0x31b443 of _0x1c74e0){const _0x5e5e36=$gameTroop[_0x444c2e(0x2ce)]()[_0x31b443];if(!_0x5e5e36)continue;_0x5e5e36[_0x444c2e(0x3d6)]=_0x444c2e(0x328),_0x5e5e36[_0x444c2e(0x3f4)]=_0x4b106d,_0x5e5e36[_0x444c2e(0x43f)]=_0x3e4ae2;}}),PluginManager[_0x3f8e58(0x491)](pluginData[_0x3f8e58(0x326)],_0x3f8e58(0x272),_0x4e71e3=>{const _0x382a99=_0x3f8e58;VisuMZ[_0x382a99(0x316)](_0x4e71e3,_0x4e71e3);const _0x3bdbf5=_0x4e71e3['Enemies'];for(const _0x4b5321 of _0x3bdbf5){if('MXsCr'==='EkOsl'){if(!this[_0x382a99(0x25f)]())return;const _0x39a1ef=_0x2732c5[_0x382a99(0x1f5)]['_otbTurnOrderWindow'];if(!_0x39a1ef)return;_0x39a1ef['removeCurrentSubject']();}else{const _0x4b1bf8=$gameTroop['members']()[_0x4b5321];if(!_0x4b1bf8)continue;_0x4b1bf8[_0x382a99(0x260)]();}}}),PluginManager[_0x3f8e58(0x491)](pluginData[_0x3f8e58(0x326)],_0x3f8e58(0x1ea),_0x256675=>{const _0xff3a10=_0x3f8e58;VisuMZ[_0xff3a10(0x316)](_0x256675,_0x256675);const _0x5f3c6f=_0x256675[_0xff3a10(0x34b)];$gameSystem['setBattleSystemOTBTurnOrderVisible'](_0x5f3c6f);}),VisuMZ['BattleSystemOTB']['RegExp']={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager[_0x3f8e58(0x39c)]=function(_0x11a9a5){const _0x49bc80=_0x3f8e58;_0x11a9a5=_0x11a9a5[_0x49bc80(0x29c)]()[_0x49bc80(0x380)](),this[_0x49bc80(0x353)]=this[_0x49bc80(0x353)]||{};if(this['_stateIDs'][_0x11a9a5])return this[_0x49bc80(0x353)][_0x11a9a5];for(const _0x4049a3 of $dataStates){if(_0x49bc80(0x1e3)!==_0x49bc80(0x211)){if(!_0x4049a3)continue;this['_stateIDs'][_0x4049a3[_0x49bc80(0x326)][_0x49bc80(0x29c)]()[_0x49bc80(0x380)]()]=_0x4049a3['id'];}else this[_0x49bc80(0x437)]=-0x1;}return this[_0x49bc80(0x353)][_0x11a9a5]||0x0;},ImageManager[_0x3f8e58(0x200)]=ImageManager[_0x3f8e58(0x200)]||0x9,ImageManager[_0x3f8e58(0x4a6)]=ImageManager[_0x3f8e58(0x4a6)]||0x6,SceneManager[_0x3f8e58(0x27e)]=function(){const _0x2c8c67=_0x3f8e58;return this[_0x2c8c67(0x1f5)]&&this[_0x2c8c67(0x1f5)][_0x2c8c67(0x3cb)]===Scene_Battle;},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x486)]=BattleManager[_0x3f8e58(0x366)],BattleManager[_0x3f8e58(0x366)]=function(_0xd9c6b3,_0xd5bbbf,_0x579eb5){const _0x172bc8=_0x3f8e58;VisuMZ['BattleSystemOTB']['BattleManager_setup']['call'](this,_0xd9c6b3,_0xd5bbbf,_0x579eb5),this[_0x172bc8(0x320)]();},BattleManager['initMembersOTB']=function(){const _0x139cf2=_0x3f8e58;if(!this[_0x139cf2(0x25f)]())return;this['_otb_actionBattlersNext']=[],this[_0x139cf2(0x28e)]=![];},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x2a2)]=BattleManager[_0x3f8e58(0x354)],BattleManager[_0x3f8e58(0x354)]=function(){const _0x258b0f=_0x3f8e58;if(this[_0x258b0f(0x25f)]())return _0x258b0f(0x409);return VisuMZ[_0x258b0f(0x368)]['BattleManager_battleSys']['call'](this);},BattleManager[_0x3f8e58(0x25f)]=function(){const _0x1ae910=_0x3f8e58;return $gameSystem[_0x1ae910(0x30c)]()===_0x1ae910(0x409);},VisuMZ['BattleSystemOTB']['BattleManager_isTpb']=BattleManager[_0x3f8e58(0x311)],BattleManager['isTpb']=function(){const _0x47d774=_0x3f8e58;if(this[_0x47d774(0x25f)]())return![];return VisuMZ[_0x47d774(0x368)][_0x47d774(0x38a)]['call'](this);},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x346)]=BattleManager[_0x3f8e58(0x474)],BattleManager[_0x3f8e58(0x474)]=function(){const _0x2619e6=_0x3f8e58;if(this[_0x2619e6(0x25f)]())return![];return VisuMZ[_0x2619e6(0x368)][_0x2619e6(0x346)]['call'](this);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x477)]=BattleManager['isTurnBased'],BattleManager[_0x3f8e58(0x2d8)]=function(){const _0x5a9938=_0x3f8e58;if(this[_0x5a9938(0x25f)]())return!![];return VisuMZ[_0x5a9938(0x368)][_0x5a9938(0x477)]['call'](this);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x472)]=BattleManager[_0x3f8e58(0x25c)],BattleManager[_0x3f8e58(0x25c)]=function(){const _0x55b6ee=_0x3f8e58;VisuMZ['BattleSystemOTB'][_0x55b6ee(0x472)][_0x55b6ee(0x2ad)](this),this[_0x55b6ee(0x25f)]()&&$gameParty[_0x55b6ee(0x2fb)]()&&!this['_surprise']&&(_0x55b6ee(0x47e)!==_0x55b6ee(0x47e)?this['makeOTBSpeed']():this['startInputOTB']());},BattleManager[_0x3f8e58(0x454)]=function(){this['startTurn']();},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x49e)]=BattleManager[_0x3f8e58(0x4a7)],BattleManager['processTurn']=function(){const _0x46ade4=_0x3f8e58;this[_0x46ade4(0x25f)]()?this['processTurnOTB']():VisuMZ[_0x46ade4(0x368)]['BattleManager_processTurn'][_0x46ade4(0x2ad)](this);},BattleManager[_0x3f8e58(0x2f0)]=function(){const _0x208ac3=_0x3f8e58,_0x2a6c18=this['_subject'];if(_0x2a6c18[_0x208ac3(0x26f)]()&&_0x2a6c18['canInput']()){const _0xee211e=_0x2a6c18[_0x208ac3(0x422)]();if(!_0xee211e)VisuMZ[_0x208ac3(0x368)][_0x208ac3(0x49e)][_0x208ac3(0x2ad)](this);else{if(_0xee211e[_0x208ac3(0x460)])VisuMZ[_0x208ac3(0x368)][_0x208ac3(0x49e)][_0x208ac3(0x2ad)](this);else{if(_0x208ac3(0x498)==='ApaiE'){let _0x4db8e6=this[_0x208ac3(0x245)](),_0x9360b0=this[_0x208ac3(0x415)](),_0x26249e=this['getBorderThickness']();_0x26481d[_0x208ac3(0x2f5)]=new _0x124ed3(_0x4db8e6,_0x9360b0);const _0x2cc36e='#000000',_0x3753f9=_0x477f6f[_0x208ac3(0x2cc)](_0x3c52ac['%1BorderColor'['format'](_0xb6a624)]);_0x51abe8[_0x208ac3(0x2f5)][_0x208ac3(0x25b)](0x0,0x0,_0x4db8e6,_0x9360b0,_0x2cc36e),_0x4db8e6-=0x2,_0x9360b0-=0x2,_0x24031b['bitmap'][_0x208ac3(0x25b)](0x1,0x1,_0x4db8e6,_0x9360b0,_0x3753f9),_0x4db8e6-=_0x26249e*0x2,_0x9360b0-=_0x26249e*0x2,_0x591ad7[_0x208ac3(0x2f5)][_0x208ac3(0x25b)](0x1+_0x26249e,0x1+_0x26249e,_0x4db8e6,_0x9360b0,_0x2cc36e),_0x4db8e6-=0x2,_0x9360b0-=0x2,_0x26249e+=0x1,_0x545e72[_0x208ac3(0x2f5)][_0x208ac3(0x44e)](0x1+_0x26249e,0x1+_0x26249e,_0x4db8e6,_0x9360b0);}else this[_0x208ac3(0x398)]=_0x2a6c18,this[_0x208ac3(0x1e8)]();}}}else _0x208ac3(0x2b3)===_0x208ac3(0x464)?(_0x19f64f[_0x208ac3(0x368)][_0x208ac3(0x315)]['call'](this,_0x12034e),this['isBattleItemWindowOTB']()&&this[_0x208ac3(0x26b)]&&this[_0x208ac3(0x367)]()):VisuMZ[_0x208ac3(0x368)][_0x208ac3(0x49e)]['call'](this);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x457)]=BattleManager[_0x3f8e58(0x405)],BattleManager[_0x3f8e58(0x405)]=function(){const _0x4b2276=_0x3f8e58;this['isOTB']()?_0x4b2276(0x389)!==_0x4b2276(0x389)?_0x53b1ba[_0x4b2276(0x368)][_0x4b2276(0x457)][_0x4b2276(0x2ad)](this):VisuMZ['BattleSystemOTB'][_0x4b2276(0x49e)]['call'](this):VisuMZ['BattleSystemOTB'][_0x4b2276(0x457)]['call'](this);},VisuMZ[_0x3f8e58(0x368)]['BattleManager_selectNextActor']=BattleManager[_0x3f8e58(0x28b)],BattleManager[_0x3f8e58(0x28b)]=function(){const _0x4ddfd4=_0x3f8e58;if(this[_0x4ddfd4(0x25f)]()){if('FrSng'===_0x4ddfd4(0x497))this[_0x4ddfd4(0x483)]();else return _0x4d95c7[_0x4ddfd4(0x383)]&&_0x155f5f['description'][_0x4ddfd4(0x1f3)]('['+_0x52b054+']');}else VisuMZ['BattleSystemOTB'][_0x4ddfd4(0x261)][_0x4ddfd4(0x2ad)](this);},BattleManager['selectNextActorOTB']=function(){const _0x15e4ec=_0x3f8e58;this[_0x15e4ec(0x398)]=null,this[_0x15e4ec(0x31b)]=![];},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x2ba)]=BattleManager[_0x3f8e58(0x32a)],BattleManager[_0x3f8e58(0x32a)]=function(){const _0x277bfe=_0x3f8e58;this[_0x277bfe(0x215)](),VisuMZ[_0x277bfe(0x368)][_0x277bfe(0x2ba)][_0x277bfe(0x2ad)](this),this[_0x277bfe(0x293)]();},BattleManager[_0x3f8e58(0x215)]=function(){const _0x376d03=_0x3f8e58;if(!this[_0x376d03(0x25f)]())return;this[_0x376d03(0x2eb)]();this[_0x376d03(0x424)]&&this[_0x376d03(0x424)][_0x376d03(0x27b)]();if(this[_0x376d03(0x424)]&&this[_0x376d03(0x424)][_0x376d03(0x258)]()&&this[_0x376d03(0x1dd)][_0x376d03(0x1f3)](this['_subject'])){if(_0x376d03(0x232)===_0x376d03(0x232)){const _0x577c49=this['_subject'][_0x376d03(0x442)][_0x376d03(0x2f6)](_0xf8658b=>_0xf8658b[_0x376d03(0x460)]);this[_0x376d03(0x424)][_0x376d03(0x3c6)]();if(_0x577c49){if('LhJSa'===_0x376d03(0x3dd)){let _0x5c4767=_0x577c49[_0x376d03(0x376)];while(_0x5c4767--){if(_0x376d03(0x3cc)===_0x376d03(0x4a0)){if(!this['isOTB']())return;const _0x19a6f6=_0x3d6c12[_0x376d03(0x1f5)][_0x376d03(0x426)];if(!_0x19a6f6)return;_0x19a6f6[_0x376d03(0x41f)]();}else this[_0x376d03(0x424)]['_actions'][_0x376d03(0x2bd)]();}this[_0x376d03(0x424)][_0x376d03(0x442)]=_0x577c49[_0x376d03(0x462)](this[_0x376d03(0x424)]['_actions']);}else{const _0x10aec5=_0xdf5fdf[_0x376d03(0x265)];this[_0x376d03(0x276)]=new _0xd0410(),this['addChild'](this[_0x376d03(0x276)]),this[_0x376d03(0x424)]=null,this['_currentTurn']=[],this[_0x376d03(0x40d)]=[],this[_0x376d03(0x3c2)]=new _0x54e8c9(),this[_0x376d03(0x3c2)]['x']=_0x10aec5[_0x376d03(0x1e6)],this['_previewContainer']['y']=_0x10aec5[_0x376d03(0x2c7)],this[_0x376d03(0x3c2)]['x']-=_0x47e446[_0x376d03(0x1e1)](_0x10aec5['SpriteThin']*0.5*_0x10aec5[_0x376d03(0x3ea)]),_0x10aec5['OrderDirection']&&(this[_0x376d03(0x3c2)]['x']+=_0x10aec5['SpriteThin']),this[_0x376d03(0x3c2)]['y']-=_0x2f1139[_0x376d03(0x1e1)](_0x10aec5[_0x376d03(0x45a)]*0.5*_0x10aec5[_0x376d03(0x3ea)]),this[_0x376d03(0x33e)](this[_0x376d03(0x3c2)]),this[_0x376d03(0x484)]=[],this[_0x376d03(0x356)]=[];}}}else this[_0x376d03(0x351)](_0x171370,_0x53d4fb);}},BattleManager[_0x3f8e58(0x293)]=function(){const _0x21bd73=_0x3f8e58;if(!this[_0x21bd73(0x25f)]())return;this[_0x21bd73(0x2eb)]();if(this['_subject']){if(_0x21bd73(0x38f)!==_0x21bd73(0x38f)){this[_0x21bd73(0x44c)]=this['_homeX']=_0xb1714b['x'],this[_0x21bd73(0x33d)]=this['_homeY']=_0x535eb6['y'],this[_0x21bd73(0x29e)]=0x0;const _0x1231b9=_0x1d9fcb['Settings'];this[_0x21bd73(0x3fa)]=_0x2ed3be[_0x21bd73(0x1e1)]((_0x242ea5[_0x21bd73(0x226)]-_0x1231b9[_0x21bd73(0x463)]-_0x1231b9[_0x21bd73(0x372)]*0x2)/0x2),_0x1231b9['OrderDirection']?(this[_0x21bd73(0x337)]=_0x42ecd3[_0x21bd73(0x226)]-_0x1231b9['SpriteThin'],this[_0x21bd73(0x45b)]=this['_spriteGroupWidth']+_0x1231b9['SubjectDistance'],this[_0x21bd73(0x448)]=0x0):(this[_0x21bd73(0x337)]=0x0,this['_currentX']=_0x1231b9[_0x21bd73(0x463)]+_0x1231b9['SubjectDistance'],this[_0x21bd73(0x448)]=this[_0x21bd73(0x45b)]+_0x1231b9['SubjectDistance']+this[_0x21bd73(0x3fa)]);}else this[_0x21bd73(0x21c)](this['_subject']),this[_0x21bd73(0x424)]=null;}if(this['_forcedBattlers']['length']>0x0){if(_0x21bd73(0x40e)!=='TrjeU')return _0x4e4d09(_0x16c217['$2']);else this[_0x21bd73(0x424)]=this[_0x21bd73(0x399)]();};},BattleManager['OTB_ADDED_ACTION_TIMES']=VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x265)]['Mechanics'][_0x3f8e58(0x324)],BattleManager[_0x3f8e58(0x46e)]=VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x265)][_0x3f8e58(0x478)]['RandomizeActionTimesOrder'],BattleManager[_0x3f8e58(0x3ab)]=VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x265)][_0x3f8e58(0x478)][_0x3f8e58(0x410)],VisuMZ['BattleSystemOTB']['BattleManager_makeActionOrders']=BattleManager[_0x3f8e58(0x48a)],BattleManager[_0x3f8e58(0x48a)]=function(){const _0x251b56=_0x3f8e58;if(this[_0x251b56(0x25f)]())this[_0x251b56(0x451)]();else{if('RGieV'!==_0x251b56(0x27f)){const _0x266d58=this[_0x251b56(0x2e5)]();if(!_0x266d58)return;const _0x2f5ba9=_0x266d58[_0x251b56(0x2e5)]();if(!_0x2f5ba9)return;const _0x3f64da=_0x2f5ba9['mainSprite']();if(!_0x3f64da)return;this[_0x251b56(0x387)](_0x3f64da[_0x251b56(0x3df)]);}else VisuMZ['BattleSystemOTB']['BattleManager_makeActionOrders']['call'](this);}},BattleManager['makeActionOrdersOTB']=function(){const _0x4a132c=_0x3f8e58;let _0x52b0c1=this[_0x4a132c(0x28e)]?0x1:0x2;while(_0x52b0c1--){if(_0x4a132c(0x2bb)!==_0x4a132c(0x2c8))this['makeNextActionOrdersOTB']();else{const _0x6f2143=this[_0x4a132c(0x2df)]()[_0x4a132c(0x29a)];if(_0x6f2143[_0x4a132c(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5947c7(_0x4d2e3f['$2']);return this[_0x4a132c(0x452)]();}}const _0xd9d8e6=!this[_0x4a132c(0x28e)];this[_0x4a132c(0x28e)]=!![];},BattleManager[_0x3f8e58(0x3e4)]=function(){const _0x454433=_0x3f8e58;this['_actionBattlers']=this[_0x454433(0x3b5)],this[_0x454433(0x2a9)]();const _0x3b1a3f=[];_0x3b1a3f[_0x454433(0x46f)](...$gameParty[_0x454433(0x47a)]()),_0x3b1a3f[_0x454433(0x46f)](...$gameTroop['members']());for(const _0x4d67d4 of _0x3b1a3f){_0x4d67d4['makeSpeed']();}_0x3b1a3f[_0x454433(0x332)]((_0x4326c5,_0x396c01)=>_0x396c01[_0x454433(0x439)]()-_0x4326c5[_0x454433(0x439)]()),this[_0x454433(0x3b5)]=_0x3b1a3f,this['otbApplyActionTimes'](),this[_0x454433(0x2eb)](),this[_0x454433(0x419)]();},BattleManager[_0x3f8e58(0x371)]=function(){const _0x463aac=_0x3f8e58;if(!BattleManager[_0x463aac(0x1fe)])return;const _0x24ef61=this[_0x463aac(0x3b5)],_0x217895=this[_0x463aac(0x401)]();for(const _0x100852 of _0x217895){if(!_0x100852)continue;if(!_0x100852[_0x463aac(0x216)]())continue;if(!_0x100852[_0x463aac(0x3a2)]())continue;if(!_0x24ef61[_0x463aac(0x1f3)](_0x100852))continue;const _0x4ba770=_0x24ef61[_0x463aac(0x333)](_0x100852);let _0x3eb16a=_0x100852[_0x463aac(0x31e)]()-0x1;while(_0x3eb16a--){if(_0x463aac(0x340)===_0x463aac(0x340)){let _0x3b2ab1=_0x4ba770;BattleManager['OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER']&&(_0x3b2ab1=Math[_0x463aac(0x494)](_0x24ef61[_0x463aac(0x376)]-_0x4ba770)+_0x4ba770),_0x24ef61[_0x463aac(0x28d)](_0x3b2ab1,0x0,_0x100852);}else{const _0x28a1b2=_0xccb213;this[_0x463aac(0x3be)](_0x2d2490,_0x28a1b2,this[_0x463aac(0x3b5)]);}}}},BattleManager[_0x3f8e58(0x2eb)]=function(){const _0x133361=_0x3f8e58;if(!this[_0x133361(0x25f)]())return;this['_actionBattlers']=this[_0x133361(0x1dd)]||[],this[_0x133361(0x1dd)][_0x133361(0x418)](null),this[_0x133361(0x1dd)]['remove'](undefined),this[_0x133361(0x1dd)]=this[_0x133361(0x1dd)][_0x133361(0x2f6)](_0xabbb64=>_0xabbb64['isBattleMember']()),this[_0x133361(0x1dd)]=this['_actionBattlers']['filter'](_0x414cd0=>VisuMZ['BattleSystemOTB'][_0x133361(0x289)](_0x414cd0)),this['_surprise']&&(_0x133361(0x21f)==='lRmeh'?_0x2b896a['removeActionBattlersOTB']():this[_0x133361(0x1dd)]=this[_0x133361(0x1dd)]['filter'](_0x26195c=>!_0x26195c['isActor']())),this[_0x133361(0x375)]&&(_0x133361(0x352)!==_0x133361(0x352)?_0x3f4505[_0x133361(0x1f3)](this[_0x133361(0x227)]())&&(_0x12da08+=_0x3c53e3(_0x633ae2['$1'])):this['_actionBattlers']=this['_actionBattlers'][_0x133361(0x2f6)](_0xef2e5c=>!_0xef2e5c[_0x133361(0x254)]())),this[_0x133361(0x3b5)]=this[_0x133361(0x3b5)]||[],this['_otb_actionBattlersNext'][_0x133361(0x418)](null),this[_0x133361(0x3b5)][_0x133361(0x418)](undefined),this[_0x133361(0x3b5)]=this[_0x133361(0x3b5)][_0x133361(0x2f6)](_0x43ad13=>_0x43ad13[_0x133361(0x243)]()),this[_0x133361(0x3b5)]=this[_0x133361(0x3b5)][_0x133361(0x2f6)](_0xaecd89=>VisuMZ[_0x133361(0x368)][_0x133361(0x49b)](_0xaecd89)),this[_0x133361(0x2c6)](),this[_0x133361(0x3c9)]();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x289)]=function(_0x39e682){const _0x8a1c5e=_0x3f8e58;if(!_0x39e682)return![];if(!_0x39e682['isAlive']())return![];if(!_0x39e682[_0x8a1c5e(0x216)]())return![];return _0x39e682['canMove']();},VisuMZ[_0x3f8e58(0x368)]['ActionBattlersNextFilter']=function(_0x29e36c){const _0x17538f=_0x3f8e58;if(!_0x29e36c)return![];const _0x440713=JsonEx[_0x17538f(0x204)](_0x29e36c);return _0x440713[_0x17538f(0x1e0)]=!![],_0x440713[_0x17538f(0x240)]=!![],_0x440713[_0x17538f(0x304)](),_0x440713[_0x17538f(0x444)](0x1),_0x440713['removeStatesAuto'](0x2),_0x440713['refresh'](),VisuMZ[_0x17538f(0x368)]['ActionBattlersFilter'](_0x440713);},BattleManager[_0x3f8e58(0x3b3)]=function(_0x48f5c0,_0x258d11,_0x2a3bcf){const _0x585865=_0x3f8e58;if(!_0x258d11)return;const _0x4dbedc=_0x2a3bcf?this['_otb_actionBattlersNext']:this[_0x585865(0x1dd)];if(!_0x4dbedc)return;if(!_0x4dbedc['includes'](_0x48f5c0))return;const _0x502c9f=VisuMZ['BattleSystemOTB'][_0x585865(0x49d)](_0x48f5c0,_0x4dbedc),_0x1c4f72=_0x2a3bcf?VisuMZ[_0x585865(0x368)][_0x585865(0x33b)](_0x4dbedc):0x0,_0x58bc21=_0x502c9f[_0x585865(0x376)]-0x1;for(let _0xe3dbf1=_0x58bc21;_0xe3dbf1>=0x0;_0xe3dbf1--){_0x4dbedc['splice'](_0x502c9f[_0xe3dbf1],0x1);}for(var _0x3873bd=0x0;_0x3873bd<_0x502c9f['length'];_0x3873bd++){var _0x4bf6f7=(_0x502c9f[_0x3873bd]-_0x258d11)[_0x585865(0x3f1)](_0x1c4f72,_0x4dbedc[_0x585865(0x376)]);_0x4dbedc[_0x585865(0x28d)](_0x4bf6f7,0x0,_0x48f5c0);}this['removeActionBattlersOTB'](),this[_0x585865(0x3c9)]();},VisuMZ[_0x3f8e58(0x368)]['GetAllIndicies']=function(_0x44a46d,_0x418676){const _0x22d84c=_0x3f8e58,_0x47ee34=[],_0x300cbc=_0x418676[_0x22d84c(0x376)];for(let _0x23b5ed=0x0;_0x23b5ed<_0x300cbc;_0x23b5ed++){if(_0x418676[_0x23b5ed]===_0x44a46d)_0x47ee34[_0x22d84c(0x46f)](_0x23b5ed);}return _0x47ee34;},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x33b)]=function(_0x1b1afa){const _0x1dad64=_0x3f8e58;if(!BattleManager[_0x1dad64(0x3ab)])return 0x0;if(!_0x1b1afa)return 0x0;let _0x3f0b92=0x0;const _0x1f0a6c=_0x1b1afa['length'];for(let _0x4c1e71=0x0;_0x4c1e71<_0x1f0a6c;_0x4c1e71++){const _0x416de1=_0x1b1afa[_0x4c1e71];if(!_0x416de1)continue;if(_0x416de1['speed']()!==Infinity)return _0x4c1e71;else _0x3f0b92++;}return _0x3f0b92;},BattleManager[_0x3f8e58(0x2a9)]=function(){const _0x3cd9c2=_0x3f8e58;if(!this['isOTB']())return;const _0x395829=SceneManager['_scene'][_0x3cd9c2(0x426)];if(!_0x395829)return;_0x395829['shiftNextTurnSpritesToCurrentTurn']();},BattleManager[_0x3f8e58(0x419)]=function(){const _0x468855=_0x3f8e58;if(!this[_0x468855(0x25f)]())return;const _0x536091=SceneManager[_0x468855(0x1f5)][_0x468855(0x426)];if(!_0x536091)return;_0x536091['createNewTurnOrderSprites']();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x3d5)]=BattleManager[_0x3f8e58(0x399)],BattleManager[_0x3f8e58(0x399)]=function(){const _0xe8955b=_0x3f8e58;return this[_0xe8955b(0x424)]=VisuMZ[_0xe8955b(0x368)]['BattleManager_getNextSubject'][_0xe8955b(0x2ad)](this),this['isOTB']()&&this[_0xe8955b(0x424)]&&this[_0xe8955b(0x42c)](this['_subject']),this[_0xe8955b(0x424)];},BattleManager[_0x3f8e58(0x42c)]=function(_0x1fba18){const _0x2a326e=_0x3f8e58;if(!this[_0x2a326e(0x25f)]())return;const _0x3ef045=SceneManager[_0x2a326e(0x1f5)][_0x2a326e(0x426)];if(!_0x3ef045)return;if(!_0x1fba18)return;_0x3ef045['shiftTurnOrderForSubject'](_0x1fba18);},BattleManager[_0x3f8e58(0x3c9)]=function(){const _0x1068d4=_0x3f8e58;if(!this['isOTB']())return;const _0x1a3bbf=SceneManager[_0x1068d4(0x1f5)][_0x1068d4(0x426)];if(!_0x1a3bbf)return;_0x1a3bbf['requestUpdateTurnOrders']();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x30e)]=BattleManager[_0x3f8e58(0x2ca)],BattleManager[_0x3f8e58(0x2ca)]=function(){const _0x3cdb61=_0x3f8e58;VisuMZ[_0x3cdb61(0x368)][_0x3cdb61(0x30e)][_0x3cdb61(0x2ad)](this),this[_0x3cdb61(0x25f)]()&&(this[_0x3cdb61(0x496)](),$gameParty[_0x3cdb61(0x213)](),$gameTroop[_0x3cdb61(0x213)]());},BattleManager[_0x3f8e58(0x496)]=function(){const _0x5b73f2=_0x3f8e58;if(!this[_0x5b73f2(0x25f)]())return;const _0x37e817=SceneManager[_0x5b73f2(0x1f5)][_0x5b73f2(0x426)];if(!_0x37e817)return;_0x37e817['removeCurrentSubject']();},BattleManager[_0x3f8e58(0x2c6)]=function(){const _0x9447a0=_0x3f8e58;if(!this[_0x9447a0(0x25f)]())return;const _0x336d74=SceneManager[_0x9447a0(0x1f5)][_0x9447a0(0x426)];if(!_0x336d74)return;_0x336d74['removeUnableTurnOrderSprites']();},BattleManager[_0x3f8e58(0x249)]=function(_0x4f6013){const _0x52b3da=_0x3f8e58;if(!_0x4f6013)return;const _0x346786=_0x4f6013['makeActionTimes']();_0x4f6013['makeActions']();if(!this[_0x52b3da(0x1dd)][_0x52b3da(0x1f3)](_0x4f6013)){const _0x274bfc=Math['max'](0x0,_0x346786-(_0x4f6013[_0x52b3da(0x3e6)]||0x0));this[_0x52b3da(0x446)](_0x4f6013,_0x274bfc,this[_0x52b3da(0x1dd)]);}if(!this[_0x52b3da(0x3b5)][_0x52b3da(0x1f3)](_0x4f6013)){const _0x16e342=_0x346786;this[_0x52b3da(0x446)](_0x4f6013,_0x16e342,this[_0x52b3da(0x3b5)]);}},BattleManager[_0x3f8e58(0x446)]=function(_0x214b94,_0x27ae1e,_0x4e593c){const _0x38d519=_0x3f8e58;if(!this[_0x38d519(0x25f)]())return;const _0x19e217=SceneManager[_0x38d519(0x1f5)][_0x38d519(0x426)];_0x214b94[_0x38d519(0x3c6)]();while(_0x27ae1e--){_0x4e593c[_0x38d519(0x46f)](_0x214b94),_0x19e217&&_0x19e217['addBattlerToTurnOrderAtEnd'](_0x214b94,_0x4e593c);}},BattleManager[_0x3f8e58(0x40a)]=function(_0x2c6cf5){const _0x41a96a=_0x3f8e58;if(!_0x2c6cf5)return;const _0xcdee00=_0x2c6cf5[_0x41a96a(0x31e)]();_0x2c6cf5['makeActions']();if(!this[_0x41a96a(0x1dd)]['includes'](_0x2c6cf5)){if('xQokX'!==_0x41a96a(0x20e)){const _0x587b7e=Math[_0x41a96a(0x3c1)](0x0,_0xcdee00-(_0x2c6cf5[_0x41a96a(0x3e6)]||0x0));this['addBattlerToTurnOrderAtStart'](_0x2c6cf5,_0x587b7e,this[_0x41a96a(0x1dd)]);}else this[_0x41a96a(0x3b4)]/=0x2,this[_0x41a96a(0x3b4)]=_0x26ed56[_0x41a96a(0x2b5)](this[_0x41a96a(0x3b4)]);}if(!this['_otb_actionBattlersNext']['includes'](_0x2c6cf5)){if(_0x41a96a(0x306)==='Cqivi'){const _0x4655a3=this[_0x41a96a(0x2e5)]();if(!_0x4655a3)return;if(!_0x4655a3['isEnemy']())return;if(this['_graphicHue']===_0x4655a3[_0x41a96a(0x3e0)]())return;this[_0x41a96a(0x347)]=_0x4655a3[_0x41a96a(0x3e0)](),this[_0x41a96a(0x2d0)][_0x41a96a(0x1e9)](_0x4655a3[_0x41a96a(0x210)]()?0x0:this[_0x41a96a(0x347)]);}else{const _0x5614cc=_0xcdee00;this[_0x41a96a(0x3be)](_0x2c6cf5,_0x5614cc,this[_0x41a96a(0x3b5)]);}}},BattleManager[_0x3f8e58(0x385)]=function(_0x29a27d,_0x5b72bd,_0x51fdb0){const _0x4ed79d=_0x3f8e58;if(!this[_0x4ed79d(0x25f)]())return;const _0x5a1ca2=SceneManager[_0x4ed79d(0x1f5)][_0x4ed79d(0x426)];while(_0x5b72bd--){_0x51fdb0['unshift'](_0x29a27d),_0x5a1ca2&&_0x5a1ca2['addBattlerToTurnOrderAtStart'](_0x29a27d,_0x51fdb0);}},BattleManager[_0x3f8e58(0x407)]=function(_0x374f86){const _0xe65db8=_0x3f8e58;if(!this[_0xe65db8(0x25f)]())return;const _0x4d32ff=this[_0xe65db8(0x1dd)],_0xf72145=_0x374f86===this[_0xe65db8(0x424)]?0x0:0x1;let _0x475248=0x0;for(let _0x1332f3=0x0;_0x1332f3<_0x4d32ff['length'];_0x1332f3++){if(_0xe65db8(0x45f)!==_0xe65db8(0x2fc)){const _0x8073f8=_0x4d32ff[_0x1332f3];if(!_0x8073f8)continue;if(!_0x8073f8['_actions'])continue;if(!_0x8073f8[_0xe65db8(0x442)][_0xf72145])continue;if(!_0x8073f8[_0xe65db8(0x442)][_0xf72145]['_forceAction'])continue;_0x475248=_0x1332f3;}else{if(this[_0xe65db8(0x1fb)]!==_0x521e0e['battlerName']())return this[_0xe65db8(0x2ac)]();}}this[_0xe65db8(0x1dd)][_0xe65db8(0x28d)](_0x475248,0x0,_0x374f86);const _0x5489ae=SceneManager[_0xe65db8(0x1f5)]['_otbTurnOrderWindow'];_0x5489ae&&_0x5489ae[_0xe65db8(0x2b9)](_0x374f86,_0x475248);},BattleManager[_0x3f8e58(0x455)]=function(){const _0x28e057=_0x3f8e58;if(!this[_0x28e057(0x25f)]())return;const _0x123269=SceneManager[_0x28e057(0x1f5)][_0x28e057(0x426)];if(!_0x123269)return;_0x123269[_0x28e057(0x241)](null);},BattleManager['otbPreviewOrderChange']=function(){const _0x1e79db=_0x3f8e58;if(!this[_0x1e79db(0x25f)]())return;const _0x4eea4f=SceneManager['_scene'][_0x1e79db(0x426)];if(!_0x4eea4f)return;_0x4eea4f['previewOrderByAction'](this[_0x1e79db(0x364)]());},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x30d)]=Game_System[_0x3f8e58(0x3ca)][_0x3f8e58(0x429)],Game_System[_0x3f8e58(0x3ca)][_0x3f8e58(0x429)]=function(){const _0x4e1f36=_0x3f8e58;VisuMZ['BattleSystemOTB'][_0x4e1f36(0x30d)][_0x4e1f36(0x2ad)](this),this[_0x4e1f36(0x3c3)]();},Game_System[_0x3f8e58(0x3ca)][_0x3f8e58(0x3c3)]=function(){const _0xe51441=_0x3f8e58;this[_0xe51441(0x342)]=!![];},Game_System['prototype'][_0x3f8e58(0x362)]=function(){const _0x3524d3=_0x3f8e58;return this[_0x3524d3(0x342)]===undefined&&(_0x3524d3(0x38e)===_0x3524d3(0x38e)?this[_0x3524d3(0x3c3)]():_0xec3982[_0x3524d3(0x203)]()),this[_0x3524d3(0x342)];},Game_System[_0x3f8e58(0x3ca)]['setBattleSystemOTBTurnOrderVisible']=function(_0x397fc9){const _0x393d18=_0x3f8e58;this['_otbTurnOrderVisible']===undefined&&this[_0x393d18(0x3c3)](),this[_0x393d18(0x342)]=_0x397fc9;},Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN']=VisuMZ['BattleSystemOTB'][_0x3f8e58(0x265)][_0x3f8e58(0x24a)][_0x3f8e58(0x231)],Game_Action['OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN']=VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x265)][_0x3f8e58(0x24a)][_0x3f8e58(0x28c)],Game_Action['OTB_CONVERT_AGI_BUFF_NEXT_TURN']=VisuMZ['BattleSystemOTB']['Settings'][_0x3f8e58(0x24a)]['ConvertAgiBuffNext'],Game_Action[_0x3f8e58(0x386)]=VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x265)][_0x3f8e58(0x24a)]['ConvertAgiDebuffNext'],VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x2be)]=Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x439)],Game_Action['prototype'][_0x3f8e58(0x439)]=function(){const _0x5ed3ed=_0x3f8e58;if(BattleManager[_0x5ed3ed(0x25f)]()){if(_0x5ed3ed(0x218)===_0x5ed3ed(0x242)){const _0x174cc7=new _0x47e87a(_0xafd55,_0x1f96b1,_0xe3510e,_0x47b636);this[_0x5ed3ed(0x3c2)][_0x5ed3ed(0x33e)](_0x174cc7),_0x50b352[_0x5ed3ed(0x46f)](_0x174cc7),_0x174cc7[_0x5ed3ed(0x2f8)](),_0x174cc7['startFade'](0xff);}else return 0x0;}else{if('YHsxn'!==_0x5ed3ed(0x285))return VisuMZ[_0x5ed3ed(0x368)][_0x5ed3ed(0x2be)][_0x5ed3ed(0x2ad)](this);else _0x11556a[_0x5ed3ed(0x455)](),_0x4b68d4[_0x5ed3ed(0x368)]['Scene_Battle_onSkillOk'][_0x5ed3ed(0x2ad)](this);}},VisuMZ[_0x3f8e58(0x368)]['Game_Action_applyGlobal']=Game_Action['prototype']['applyGlobal'],Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x312)]=function(){const _0x1462c3=_0x3f8e58;VisuMZ[_0x1462c3(0x368)][_0x1462c3(0x41e)]['call'](this),this[_0x1462c3(0x3ff)]();},Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x3ff)]=function(){const _0x58d41d=_0x3f8e58;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isOTB']())return;if(!this[_0x58d41d(0x3e1)]())return;if(!this['subject']())return;const _0x1572da=VisuMZ[_0x58d41d(0x368)][_0x58d41d(0x3f0)],_0x152d60=this[_0x58d41d(0x3e1)]()[_0x58d41d(0x29a)];if(_0x152d60[_0x58d41d(0x37c)](_0x1572da[_0x58d41d(0x417)])){if(_0x58d41d(0x29b)===_0x58d41d(0x2c4))return this['_otbTurnOrderFaceIndex']===_0x180acb&&(this[_0x58d41d(0x43f)]=this['createTurnOrderOTBGraphicFaceIndex']()),this['_otbTurnOrderFaceIndex'];else this[_0x58d41d(0x227)]()['otbGainInstant'](0x1);}let _0x3dcdcf=this[_0x58d41d(0x2a0)](),_0x12ff9c=this[_0x58d41d(0x1f4)]();_0x3dcdcf!==0x0&&BattleManager[_0x58d41d(0x3b3)](this[_0x58d41d(0x227)](),-_0x3dcdcf,![]),_0x12ff9c!==0x0&&BattleManager[_0x58d41d(0x3b3)](this[_0x58d41d(0x227)](),-_0x12ff9c,!![]);},Game_Action[_0x3f8e58(0x3ca)]['otbCalcUserCurrentOrderChange']=function(){const _0x5bf35f=_0x3f8e58;if(!SceneManager[_0x5bf35f(0x27e)]())return 0x0;if(!BattleManager[_0x5bf35f(0x25f)]())return 0x0;if(!this[_0x5bf35f(0x3e1)]())return 0x0;if(!this[_0x5bf35f(0x227)]())return 0x0;if(!this[_0x5bf35f(0x227)]()[_0x5bf35f(0x482)]())return 0x0;const _0x5e2b44=VisuMZ[_0x5bf35f(0x368)][_0x5bf35f(0x3f0)],_0x81460c=this[_0x5bf35f(0x3e1)]()['note'],_0x3f5aef=BattleManager[_0x5bf35f(0x1dd)]||[];let _0x3b9841=0x0;return _0x81460c[_0x5bf35f(0x37c)](_0x5e2b44[_0x5bf35f(0x1de)])&&(_0x3f5aef[_0x5bf35f(0x1f3)](this[_0x5bf35f(0x227)]())&&(_0x3b9841+=Number(RegExp['$1']))),_0x81460c[_0x5bf35f(0x37c)](_0x5e2b44['UserCurrOrder'])&&(_0x3b9841+=Number(RegExp['$1'])),_0x3b9841;},Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x1f4)]=function(){const _0xf61737=_0x3f8e58;if(!SceneManager[_0xf61737(0x27e)]())return 0x0;if(!BattleManager[_0xf61737(0x25f)]())return 0x0;if(!this[_0xf61737(0x3e1)]())return 0x0;if(!this[_0xf61737(0x227)]())return 0x0;if(!this[_0xf61737(0x227)]()['canChangeOtbTurnOrder']())return 0x0;const _0x131479=VisuMZ[_0xf61737(0x368)][_0xf61737(0x265)][_0xf61737(0x478)],_0x29119c=VisuMZ['BattleSystemOTB'][_0xf61737(0x3f0)],_0xe26377=this[_0xf61737(0x3e1)]()['note'],_0x37f0ca=BattleManager['_otb_actionBattlersNext']||[];let _0x101877=0x0;return _0x131479[_0xf61737(0x44a)]&&(_0x101877+=_0x131479['ConvertSpeedJS'][_0xf61737(0x2ad)](this)),_0xe26377[_0xf61737(0x37c)](_0x29119c['UserFollOrder'])&&(_0x37f0ca[_0xf61737(0x1f3)](this[_0xf61737(0x227)]())&&(_0x101877+=Number(RegExp['$1']))),_0xe26377[_0xf61737(0x37c)](_0x29119c['UserNextOrder'])&&(_0x101877+=Number(RegExp['$1'])),_0x101877;},VisuMZ[_0x3f8e58(0x368)]['Game_Action_applyItemUserEffect']=Game_Action['prototype'][_0x3f8e58(0x37a)],Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x37a)]=function(_0xa30d4e){const _0x34ca6f=_0x3f8e58;VisuMZ['BattleSystemOTB'][_0x34ca6f(0x3b7)][_0x34ca6f(0x2ad)](this,_0xa30d4e),this[_0x34ca6f(0x2f9)](_0xa30d4e),this[_0x34ca6f(0x225)](_0xa30d4e);},Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x2f9)]=function(_0x365f82){const _0x35deda=_0x3f8e58;if(!SceneManager[_0x35deda(0x27e)]())return;if(!BattleManager['isOTB']())return;if(!this[_0x35deda(0x3e1)]())return;if(!_0x365f82)return;const _0x57c0fc=VisuMZ['BattleSystemOTB'][_0x35deda(0x3f0)],_0x40f1be=this[_0x35deda(0x3e1)]()['note'];if(_0x40f1be[_0x35deda(0x37c)](_0x57c0fc[_0x35deda(0x292)])){if(_0x35deda(0x37b)==='vaDJp'){const _0x28861a=!![],_0x29ad85=Number(RegExp['$1'])||0x0;this[_0x35deda(0x227)]()[_0x35deda(0x36f)](_0x29ad85,_0x28861a);}else{const _0x4816a7=this[_0x35deda(0x337)]+_0x3a4398['UiSubjectOffsetX'],_0x5a2621=_0x3c4b99+_0x419d4a[_0x35deda(0x2e0)],_0x3231aa=_0x143f8b[_0x35deda(0x463)];this[_0x35deda(0x35c)](_0x4ba73c[_0x35deda(0x3f6)],_0x4816a7,_0x5a2621,_0x3231aa,_0x35deda(0x20d));}}if(_0x40f1be['match'](_0x57c0fc[_0x35deda(0x298)])){const _0x2f6a9e=![],_0x1eb39c=Number(RegExp['$1'])||0x0;this[_0x35deda(0x227)]()[_0x35deda(0x36f)](_0x1eb39c,_0x2f6a9e);}if(_0x40f1be[_0x35deda(0x37c)](_0x57c0fc[_0x35deda(0x34a)])){const _0x26a196=!![],_0x2b388e=Number(RegExp['$1'])||0x0;_0x365f82['otbAddActions'](_0x2b388e,_0x26a196);}if(_0x40f1be[_0x35deda(0x37c)](_0x57c0fc[_0x35deda(0x2b1)])){if(_0x35deda(0x34e)!==_0x35deda(0x34e)){if(this['_graphicSv']!==_0x4883b6[_0x35deda(0x3a3)]())return this[_0x35deda(0x2ac)]();}else{const _0x5ccaa2=![],_0x1bdc8d=Number(RegExp['$1'])||0x0;_0x365f82[_0x35deda(0x36f)](_0x1bdc8d,_0x5ccaa2);}}},Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x225)]=function(_0x3a7842){const _0x4dda4c=_0x3f8e58;if(!SceneManager[_0x4dda4c(0x27e)]())return;if(!BattleManager[_0x4dda4c(0x25f)]())return;if(!this['item']())return;if(!_0x3a7842)return;if(!_0x3a7842['canChangeOtbTurnOrder']())return 0x0;let _0x4b8d28=this[_0x4dda4c(0x44d)](_0x3a7842),_0x44e88c=this[_0x4dda4c(0x396)](_0x3a7842);_0x4b8d28!==0x0&&BattleManager[_0x4dda4c(0x3b3)](_0x3a7842,-_0x4b8d28,![]),_0x44e88c!==0x0&&BattleManager[_0x4dda4c(0x3b3)](_0x3a7842,-_0x44e88c,!![]);},Game_Action['prototype'][_0x3f8e58(0x44d)]=function(_0x1f0fc7){const _0x2f3ef9=_0x3f8e58;if(!SceneManager[_0x2f3ef9(0x27e)]())return 0x0;if(!BattleManager['isOTB']())return 0x0;if(!this['item']())return 0x0;if(!_0x1f0fc7)return 0x0;if(!_0x1f0fc7['canChangeOtbTurnOrder']())return 0x0;const _0x4cc0d5=VisuMZ[_0x2f3ef9(0x368)]['RegExp'],_0x4a48da=this[_0x2f3ef9(0x3e1)]()['note'],_0x4827e3=BattleManager[_0x2f3ef9(0x1dd)]||[];let _0x5d0ddc=0x0;if(_0x4a48da[_0x2f3ef9(0x37c)](_0x4cc0d5[_0x2f3ef9(0x447)])){if(_0x2f3ef9(0x2a7)===_0x2f3ef9(0x423)){const _0x1f731e=_0x516dcb['Settings'];this['scale']['x']=this['scale']['y']=_0x1f731e[_0x2f3ef9(0x3ea)];}else _0x4827e3[_0x2f3ef9(0x1f3)](_0x1f0fc7)&&(_0x5d0ddc+=Number(RegExp['$1']));}_0x4a48da[_0x2f3ef9(0x37c)](_0x4cc0d5[_0x2f3ef9(0x46d)])&&(_0x5d0ddc+=Number(RegExp['$1']));const _0x3e63a7=this['item']()[_0x2f3ef9(0x1f0)];for(const _0x13a723 of _0x3e63a7){if(!_0x13a723)continue;if(_0x13a723[_0x2f3ef9(0x244)]===Game_Action[_0x2f3ef9(0x3c0)]&&_0x13a723[_0x2f3ef9(0x271)]===0x6){if('Darmi'!==_0x2f3ef9(0x1f9))_0xb12a03+=_0x4753ea(_0x4222d9['$1']);else{if(Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN'])_0x5d0ddc-=0x1;}}if(_0x13a723[_0x2f3ef9(0x244)]===Game_Action[_0x2f3ef9(0x25a)]&&_0x13a723[_0x2f3ef9(0x271)]===0x6){if(Game_Action[_0x2f3ef9(0x499)])_0x5d0ddc+=0x1;}}return _0x5d0ddc;},Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x396)]=function(_0x3c6523){const _0x5e6567=_0x3f8e58;if(!SceneManager[_0x5e6567(0x27e)]())return 0x0;if(!BattleManager[_0x5e6567(0x25f)]())return 0x0;if(!this['item']())return 0x0;if(!_0x3c6523)return 0x0;if(!_0x3c6523[_0x5e6567(0x482)]())return 0x0;const _0x149fea=VisuMZ[_0x5e6567(0x368)][_0x5e6567(0x3f0)],_0x3ae8a5=this['item']()[_0x5e6567(0x29a)],_0x53a477=BattleManager[_0x5e6567(0x3b5)]||[];let _0x3fa9cd=0x0;if(_0x3ae8a5['match'](_0x149fea[_0x5e6567(0x447)])){if(_0x5e6567(0x35f)===_0x5e6567(0x35f))_0x53a477[_0x5e6567(0x1f3)](_0x3c6523)&&(_0x3fa9cd+=Number(RegExp['$1']));else return![];}_0x3ae8a5[_0x5e6567(0x37c)](_0x149fea[_0x5e6567(0x3cd)])&&(_0x3fa9cd+=Number(RegExp['$1']));const _0x164093=this[_0x5e6567(0x3e1)]()[_0x5e6567(0x1f0)];for(const _0x3420cb of _0x164093){if(!_0x3420cb)continue;if(_0x3420cb[_0x5e6567(0x244)]===Game_Action[_0x5e6567(0x3c0)]&&_0x3420cb[_0x5e6567(0x271)]===0x6){if(Game_Action[_0x5e6567(0x28f)])_0x3fa9cd-=0x1;}if(_0x3420cb['code']===Game_Action[_0x5e6567(0x25a)]&&_0x3420cb[_0x5e6567(0x271)]===0x6){if(Game_Action[_0x5e6567(0x386)])_0x3fa9cd+=0x1;}}return _0x3fa9cd;},Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x260)]=function(){const _0x4953e6=_0x3f8e58;delete this[_0x4953e6(0x3d6)],delete this[_0x4953e6(0x3f4)],delete this[_0x4953e6(0x43f)],delete this[_0x4953e6(0x3a5)];},Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x3d0)]=function(){const _0x4e97c1=_0x3f8e58;return this[_0x4e97c1(0x3d6)]===undefined&&(this[_0x4e97c1(0x3d6)]=this[_0x4e97c1(0x1fd)]()),this[_0x4e97c1(0x3d6)];},Game_BattlerBase[_0x3f8e58(0x3ca)]['createTurnOrderOTBGraphicType']=function(){const _0x6511e8=_0x3f8e58;return Window_OTB_TurnOrder[_0x6511e8(0x265)]['EnemyBattlerType'];},Game_BattlerBase[_0x3f8e58(0x3ca)]['TurnOrderOTBGraphicFaceName']=function(){const _0x3a0acd=_0x3f8e58;return this[_0x3a0acd(0x3f4)]===undefined&&(this[_0x3a0acd(0x3f4)]=this['createTurnOrderOTBGraphicFaceName']()),this['_otbTurnOrderFaceName'];},Game_BattlerBase[_0x3f8e58(0x3ca)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x5c59f4=_0x3f8e58;return Window_OTB_TurnOrder['Settings'][_0x5c59f4(0x2c0)];},Game_BattlerBase[_0x3f8e58(0x3ca)]['TurnOrderOTBGraphicFaceIndex']=function(){const _0x15a91a=_0x3f8e58;return this['_otbTurnOrderFaceIndex']===undefined&&(this[_0x15a91a(0x43f)]=this[_0x15a91a(0x1df)]()),this[_0x15a91a(0x43f)];},Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x1df)]=function(){const _0x3a2b6e=_0x3f8e58;return Window_OTB_TurnOrder[_0x3a2b6e(0x265)][_0x3a2b6e(0x3f9)];},Game_BattlerBase['prototype'][_0x3f8e58(0x246)]=function(){const _0x18a680=_0x3f8e58;return this[_0x18a680(0x3a5)]===undefined&&('jqeWI'!==_0x18a680(0x41a)?this[_0x18a680(0x322)]=0x0:this[_0x18a680(0x3a5)]=this[_0x18a680(0x201)]()),this[_0x18a680(0x3a5)];},Game_BattlerBase[_0x3f8e58(0x3ca)]['createTurnOrderOTBGraphicIconIndex']=function(){return Window_OTB_TurnOrder['Settings']['EnemyBattlerIcon'];},Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x2dc)]=function(_0x3b3779){const _0x23703e=_0x3f8e58;this[_0x23703e(0x3a5)]=_0x3b3779;},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x402)]=Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x262)],Game_BattlerBase['prototype'][_0x3f8e58(0x262)]=function(){const _0x1759b3=_0x3f8e58;VisuMZ['BattleSystemOTB']['Game_BattlerBase_hide'][_0x1759b3(0x2ad)](this),BattleManager[_0x1759b3(0x2eb)]();},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x266)]=Game_BattlerBase[_0x3f8e58(0x3ca)]['appear'],Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x2c3)]=function(){const _0x1bb13c=_0x3f8e58,_0x2821ea=this[_0x1bb13c(0x404)];VisuMZ[_0x1bb13c(0x368)]['Game_BattlerBase_appear']['call'](this);if(BattleManager['isOTB']()&&SceneManager[_0x1bb13c(0x27e)]()&&_0x2821ea&&!this[_0x1bb13c(0x404)]){if('lJMRr'===_0x1bb13c(0x25e))BattleManager[_0x1bb13c(0x249)](this);else return 0x0;}},VisuMZ['BattleSystemOTB']['Game_Battler_performCollapse']=Game_Battler['prototype'][_0x3f8e58(0x24e)],Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x24e)]=function(){const _0x5e26d5=_0x3f8e58;VisuMZ[_0x5e26d5(0x368)][_0x5e26d5(0x223)][_0x5e26d5(0x2ad)](this),BattleManager[_0x5e26d5(0x2eb)]();},Game_Battler['OTB_STUN_INFINITY_SPEED']=VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x265)][_0x3f8e58(0x478)]['PostStunInfinitySpeed'],VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x32e)]=Game_Battler[_0x3f8e58(0x3ca)]['onBattleStart'],Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x297)]=function(_0x4baae8){const _0x34bed3=_0x3f8e58;VisuMZ[_0x34bed3(0x368)][_0x34bed3(0x32e)]['call'](this,_0x4baae8),this[_0x34bed3(0x230)](_0x4baae8);},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x230)]=function(_0x457bb2){const _0x4ee7b6=_0x3f8e58;if(!BattleManager[_0x4ee7b6(0x25f)]())return;this[_0x4ee7b6(0x3e6)]=0x0,this[_0x4ee7b6(0x248)]=undefined;},VisuMZ['BattleSystemOTB']['Game_Battler_onBattleEnd']=Game_Battler['prototype'][_0x3f8e58(0x47c)],Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x47c)]=function(){const _0x5d1e96=_0x3f8e58;VisuMZ[_0x5d1e96(0x368)][_0x5d1e96(0x338)]['call'](this),this['onBattleEndOTB']();},Game_Battler[_0x3f8e58(0x3ca)]['onBattleEndOTB']=function(){const _0x79cb30=_0x3f8e58;if(!BattleManager[_0x79cb30(0x25f)]())return;this['_otbTimesActedThisTurn']=0x0;},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x27b)]=function(){const _0x2cd736=_0x3f8e58;if(!BattleManager[_0x2cd736(0x25f)]())return;this[_0x2cd736(0x3e6)]=this[_0x2cd736(0x3e6)]||0x0,this[_0x2cd736(0x3e6)]++;if(this[_0x2cd736(0x256)]()>0x0&&this===BattleManager['_subject']){if('EKnpQ'!==_0x2cd736(0x229)){_0x5d7aa7['BattleSystemOTB'][_0x2cd736(0x21d)][_0x2cd736(0x2ad)](this,_0x3dca0e);if(_0x4e6c39['VisuMZ_2_PartySystem'])return;_0x30f7aa[_0x2cd736(0x27e)]()&&_0x42f971[_0x2cd736(0x25f)]()&&(_0x59e082[_0x2cd736(0x2eb)](),_0xcff677[_0x2cd736(0x249)](_0x50de03['actor'](_0x2f5253)));}else{const _0x31331f=BattleManager[_0x2cd736(0x35b)];if(_0x31331f['length']>0x0&&_0x31331f[0x0]!==this)return;const _0x87d7f5=this[_0x2cd736(0x2e5)]();if(_0x87d7f5&&BattleManager[_0x2cd736(0x3e7)](this))_0x87d7f5[_0x2cd736(0x3b6)]();}}},BattleManager['isNextOtbSubject']=function(_0x13103e){const _0x24021a=_0x3f8e58;if(!_0x13103e)return![];return this[_0x24021a(0x1dd)][0x0]===_0x13103e;},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x264)]=Game_Battler[_0x3f8e58(0x3ca)]['onTurnEnd'],Game_Battler['prototype'][_0x3f8e58(0x3c5)]=function(){const _0x4ede63=_0x3f8e58;VisuMZ[_0x4ede63(0x368)][_0x4ede63(0x264)][_0x4ede63(0x2ad)](this),this[_0x4ede63(0x39a)]();},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x39a)]=function(){const _0x4e8931=_0x3f8e58;if(!BattleManager[_0x4e8931(0x25f)]())return;this[_0x4e8931(0x3e6)]=0x0;},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x3bb)]=Game_Battler['prototype']['makeSpeed'],Game_Battler['prototype'][_0x3f8e58(0x203)]=function(){const _0x677641=_0x3f8e58;BattleManager[_0x677641(0x25f)]()?this[_0x677641(0x3a6)]():VisuMZ[_0x677641(0x368)][_0x677641(0x3bb)][_0x677641(0x2ad)](this);},Game_Battler['prototype']['makeOTBSpeed']=function(){const _0x3e1f1c=_0x3f8e58;if(this[_0x3e1f1c(0x3de)]())this[_0x3e1f1c(0x39b)]=Infinity;else{const _0x39e046=this[_0x3e1f1c(0x422)]()||new Game_Action(this);this[_0x3e1f1c(0x39b)]=VisuMZ[_0x3e1f1c(0x368)][_0x3e1f1c(0x265)][_0x3e1f1c(0x478)][_0x3e1f1c(0x370)][_0x3e1f1c(0x2ad)](_0x39e046);}},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x3de)]=function(){const _0x5e602c=_0x3f8e58;if(!Game_Battler['OTB_STUN_INFINITY_SPEED'])return![];if(!this[_0x5e602c(0x3a2)]())return![];if(!this['isAppeared']())return![];if(this['canMove']())return![];const _0xcc9387=JsonEx[_0x5e602c(0x204)](this);return _0xcc9387[_0x5e602c(0x1e0)]=!![],_0xcc9387[_0x5e602c(0x240)]=!![],_0xcc9387[_0x5e602c(0x304)](),_0xcc9387[_0x5e602c(0x444)](0x1),_0xcc9387[_0x5e602c(0x444)](0x2),_0xcc9387[_0x5e602c(0x388)](),_0xcc9387[_0x5e602c(0x258)]();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x2e3)]=Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x445)],Game_Action[_0x3f8e58(0x3ca)][_0x3f8e58(0x445)]=function(){const _0x2af254=_0x3f8e58;return BattleManager[_0x2af254(0x25f)]()?VisuMZ['BattleSystemOTB']['Settings'][_0x2af254(0x478)]['AllowRandomSpeed']:VisuMZ[_0x2af254(0x368)][_0x2af254(0x2e3)][_0x2af254(0x2ad)](this);},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x1eb)]=function(_0x5023b2){const _0x4d9c70=_0x3f8e58;if(!this[_0x4d9c70(0x258)]())return;this['_otbTimesActedThisTurn']=this[_0x4d9c70(0x3e6)]||0x0,this['_otbTimesActedThisTurn']--,BattleManager[_0x4d9c70(0x385)](this,_0x5023b2,BattleManager[_0x4d9c70(0x1dd)]);},Game_Battler['prototype'][_0x3f8e58(0x36f)]=function(_0x108494,_0x26cb97){const _0x2789fd=_0x3f8e58;if(!this[_0x2789fd(0x258)]())return;_0x26cb97?BattleManager[_0x2789fd(0x446)](this,_0x108494,BattleManager[_0x2789fd(0x1dd)]):BattleManager[_0x2789fd(0x446)](this,_0x108494,BattleManager[_0x2789fd(0x3b5)]);},VisuMZ[_0x3f8e58(0x368)]['Game_Battler_makeActionTimes']=Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x31e)],Game_Battler['prototype']['makeActionTimes']=function(){const _0x3959dd=_0x3f8e58;return BattleManager['isOTB']()?'QXfxb'===_0x3959dd(0x384)?_0x2e15dd['Settings'][_0x3959dd(0x2c0)]:this[_0x3959dd(0x3cf)]():VisuMZ[_0x3959dd(0x368)][_0x3959dd(0x378)][_0x3959dd(0x2ad)](this);},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x3cf)]=function(){const _0x1c8f7f=_0x3f8e58;if(this[_0x1c8f7f(0x248)]!==undefined){if(_0x1c8f7f(0x42d)!==_0x1c8f7f(0x31f))return this[_0x1c8f7f(0x248)];else _0x55d14b['BattleSystemOTB'][_0x1c8f7f(0x338)][_0x1c8f7f(0x2ad)](this),this[_0x1c8f7f(0x411)]();}this[_0x1c8f7f(0x1ed)]=this[_0x1c8f7f(0x345)]()['length'];const _0x3eb29d=this['actionPlusSet'](),_0x4987ed=_0x3eb29d['reduce']((_0x5f3671,_0x26c639)=>Math[_0x1c8f7f(0x391)]()<_0x26c639?_0x5f3671+0x1:_0x5f3671,0x1);return this[_0x1c8f7f(0x248)]=_0x4987ed,this[_0x1c8f7f(0x248)];},Game_Unit[_0x3f8e58(0x3ca)][_0x3f8e58(0x213)]=function(){const _0x5e5e92=_0x3f8e58;for(const _0x86b2fe of this[_0x5e5e92(0x2ce)]()){_0x5e5e92(0x2d7)===_0x5e5e92(0x34d)?this[_0x5e5e92(0x2f0)]():_0x86b2fe&&(_0x86b2fe['_cache_makeActionTimesOTB']=undefined);}},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x482)]=function(){const _0x402467=_0x3f8e58;if(this[_0x402467(0x439)]()===Infinity)return![];return!![];},Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x35e)]=function(_0x47ccb3,_0x5567c6){const _0x1249ac=_0x3f8e58;if(this[_0x1249ac(0x240)]||this[_0x1249ac(0x1e0)])return;if(!SceneManager[_0x1249ac(0x27e)]())return;if(!BattleManager['isOTB']())return;if(this[_0x1249ac(0x1ed)]!==this[_0x1249ac(0x345)]()[_0x1249ac(0x376)])this['_last_otb_actionPlusSetLength']=this[_0x1249ac(0x345)]()[_0x1249ac(0x376)],this[_0x1249ac(0x248)]=undefined;else{if(_0x1249ac(0x465)===_0x1249ac(0x393))_0x24c0b3[_0x1249ac(0x455)](),_0x4ca7df[_0x1249ac(0x368)][_0x1249ac(0x238)][_0x1249ac(0x2ad)](this);else return;}if(_0x47ccb3&&!this[_0x1249ac(0x258)]())BattleManager[_0x1249ac(0x2eb)]();else!_0x47ccb3&&this['canMove']()&&BattleManager[_0x1249ac(0x249)](this);if(this[_0x1249ac(0x258)]()){const _0x47ca77=this['makeActionTimes']()-_0x5567c6;_0x47ca77>0x0&&(_0x1249ac(0x27c)!==_0x1249ac(0x27c)?(this['x']=this[_0x1249ac(0x46c)],this['y']=this['_homeY']):(BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x47ca77,BattleManager[_0x1249ac(0x1dd)]),BattleManager[_0x1249ac(0x446)](this,_0x47ca77,BattleManager[_0x1249ac(0x3b5)])));}},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x21b)]=Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2e9)],Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2e9)]=function(_0x443d4f){const _0xfc3317=_0x3f8e58,_0x5ac906=this[_0xfc3317(0x258)](),_0xd6946f=this[_0xfc3317(0x31e)]();VisuMZ[_0xfc3317(0x368)]['Game_Battler_addState'][_0xfc3317(0x2ad)](this,_0x443d4f),this[_0xfc3317(0x35e)](_0x5ac906,_0xd6946f);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x408)]=Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2f1)],Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2f1)]=function(_0x5ad318){const _0x2cc601=_0x3f8e58,_0x9257eb=this['canMove'](),_0x14a6eb=this[_0x2cc601(0x31e)]();VisuMZ[_0x2cc601(0x368)][_0x2cc601(0x408)]['call'](this,_0x5ad318),this[_0x2cc601(0x35e)](_0x9257eb,_0x14a6eb);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x3d2)]=Game_BattlerBase[_0x3f8e58(0x3ca)][_0x3f8e58(0x303)],Game_BattlerBase['prototype'][_0x3f8e58(0x303)]=function(){const _0x4a2e1c=_0x3f8e58;if(BattleManager['isOTB']())this[_0x4a2e1c(0x2f1)](this['deathStateId']());VisuMZ[_0x4a2e1c(0x368)][_0x4a2e1c(0x3d2)][_0x4a2e1c(0x2ad)](this);if(BattleManager[_0x4a2e1c(0x25f)]())this[_0x4a2e1c(0x388)]();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x436)]=Game_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x45e)],Game_Battler['prototype']['forceAction']=function(_0x3613ad,_0x4e6e5c){const _0x1dd53b=_0x3f8e58;BattleManager[_0x1dd53b(0x25f)]()?this[_0x1dd53b(0x351)](_0x3613ad,_0x4e6e5c):VisuMZ['BattleSystemOTB'][_0x1dd53b(0x436)]['call'](this,_0x3613ad,_0x4e6e5c);},Game_Battler[_0x3f8e58(0x3ca)]['forceActionOTB']=function(_0x2b6af8,_0x44ed8d){const _0x364ed6=_0x3f8e58,_0x2c2adc=new Game_Action(this,!![]);_0x2c2adc[_0x364ed6(0x29f)](_0x2b6af8),_0x2c2adc[_0x364ed6(0x460)]=!![];if(_0x44ed8d===-0x2)_0x2c2adc[_0x364ed6(0x334)](this[_0x364ed6(0x284)]);else{if(_0x44ed8d===-0x1){if(_0x364ed6(0x3da)===_0x364ed6(0x220))for(const _0x2b26c5 of this[_0x364ed6(0x2ce)]()){_0x2b26c5&&(_0x2b26c5[_0x364ed6(0x248)]=_0x3e4a11);}else _0x2c2adc[_0x364ed6(0x318)]();}else _0x2c2adc[_0x364ed6(0x334)](_0x44ed8d);}const _0x2531f6=this[_0x364ed6(0x442)][_0x364ed6(0x42a)](_0x37fb3e=>_0x37fb3e[_0x364ed6(0x460)])+0x1;this[_0x364ed6(0x442)]['splice'](_0x2531f6,0x0,_0x2c2adc);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x466)]=BattleManager[_0x3f8e58(0x45e)],BattleManager[_0x3f8e58(0x45e)]=function(_0x3232b6){const _0x42ad23=_0x3f8e58;BattleManager[_0x42ad23(0x25f)]()?this[_0x42ad23(0x351)](_0x3232b6):VisuMZ[_0x42ad23(0x368)][_0x42ad23(0x466)][_0x42ad23(0x2ad)](this,_0x3232b6);},BattleManager['forceActionOTB']=function(_0xde83c7){const _0x4be95a=_0x3f8e58;BattleManager[_0x4be95a(0x407)](_0xde83c7);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x3dc)]=Game_Actor[_0x3f8e58(0x3ca)][_0x3f8e58(0x470)],Game_Actor[_0x3f8e58(0x3ca)]['selectNextCommand']=function(){const _0x5a4a91=_0x3f8e58;if(BattleManager['isOTB']()){if(_0x5a4a91(0x2a5)!=='KGEve'){if(this['battler']())this[_0x5a4a91(0x2e5)]()[_0x5a4a91(0x3b6)]();return![];}else{if(!this['canMove']())return;this[_0x5a4a91(0x3e6)]=this[_0x5a4a91(0x3e6)]||0x0,this[_0x5a4a91(0x3e6)]--,_0x1bf72b[_0x5a4a91(0x385)](this,_0x175034,_0x4bb987['_actionBattlers']);}}return VisuMZ['BattleSystemOTB'][_0x5a4a91(0x3dc)]['call'](this);},Game_Actor[_0x3f8e58(0x3ca)][_0x3f8e58(0x1fd)]=function(){const _0xe46a2e=_0x3f8e58,_0x4c652a=this['actor']()['note'];if(_0x4c652a[_0xe46a2e(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0xe46a2e(0x328);else{if(_0x4c652a[_0xe46a2e(0x37c)](/<OTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0xe46a2e(0x406)!==_0xe46a2e(0x406)){const _0x1f751d=[],_0x4d3221=_0x17cd5e[_0xe46a2e(0x376)];for(let _0x5a77ab=0x0;_0x5a77ab<_0x4d3221;_0x5a77ab++){if(_0x1f0bcd[_0x5a77ab]===_0x577286)_0x1f751d['push'](_0x5a77ab);}return _0x1f751d;}else return'icon';}}return Window_OTB_TurnOrder['Settings'][_0xe46a2e(0x31a)];},Game_Actor['prototype']['createTurnOrderOTBGraphicFaceName']=function(){const _0x583f24=_0x3f8e58,_0x41f885=this[_0x583f24(0x2df)]()[_0x583f24(0x29a)];if(_0x41f885[_0x583f24(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x583f24(0x235)]();},Game_Actor['prototype'][_0x3f8e58(0x1df)]=function(){const _0x17693f=_0x3f8e58,_0x5a8479=this[_0x17693f(0x2df)]()[_0x17693f(0x29a)];if(_0x5a8479[_0x17693f(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x17693f(0x2f2)===_0x17693f(0x2f2))return Number(RegExp['$2']);else{const _0x38dc48=this[_0x17693f(0x252)](),_0x4dc64f=this[_0x17693f(0x374)]===_0x38dc48[_0x17693f(0x40d)]?!![]:![],_0x5cf551=_0x4dc64f?_0x491c13['_otb_actionBattlersNext']:_0x4e3249[_0x17693f(0x1dd)];let _0x14eb26=0x0,_0x1a7fcc=_0x5cf551[_0x17693f(0x376)]-0x1;_0x4dc64f&&(_0x14eb26=_0xb7a438['max'](0x0,_0x419796[_0x17693f(0x368)]['getInfinityClamp'](_0x5cf551)));let _0x50bf30=_0x2e8aaf[_0x17693f(0x3ca)][_0x17693f(0x321)]['call'](this);return _0x50bf30+=this[_0x17693f(0x3a7)],_0x50bf30[_0x17693f(0x3f1)](_0x14eb26,_0x1a7fcc);}}return this[_0x17693f(0x452)]();},Game_Actor[_0x3f8e58(0x3ca)][_0x3f8e58(0x201)]=function(){const _0x175e24=_0x3f8e58,_0x4b68cf=this[_0x175e24(0x2df)]()['note'];if(_0x4b68cf['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x175e24(0x265)][_0x175e24(0x3ed)];},Game_Enemy[_0x3f8e58(0x3ca)][_0x3f8e58(0x1fd)]=function(){const _0x26451f=_0x3f8e58,_0x4638bf=this['enemy']()[_0x26451f(0x29a)];if(_0x4638bf[_0x26451f(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x26451f(0x471)!==_0x26451f(0x1ff))return _0x26451f(0x328);else _0x114bb6['_sourceArray'][_0x26451f(0x418)](_0x1b8697);}else{if(_0x4638bf['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_OTB_TurnOrder['Settings'][_0x26451f(0x46a)];},Game_Enemy[_0x3f8e58(0x3ca)][_0x3f8e58(0x277)]=function(){const _0xb190fd=_0x3f8e58,_0x1dcf96=this['enemy']()[_0xb190fd(0x29a)];if(_0x1dcf96[_0xb190fd(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_Enemy[_0x3f8e58(0x3ca)][_0x3f8e58(0x1df)]=function(){const _0x5577da=_0x3f8e58,_0x1e6c0e=this['enemy']()[_0x5577da(0x29a)];if(_0x1e6c0e[_0x5577da(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x5577da(0x265)][_0x5577da(0x3f9)];},Game_Enemy[_0x3f8e58(0x3ca)]['createTurnOrderOTBGraphicIconIndex']=function(){const _0x463ed0=_0x3f8e58,_0xe259ea=this['enemy']()['note'];if(_0xe259ea[_0x463ed0(0x37c)](/<OTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x463ed0(0x295)===_0x463ed0(0x1ef))this[_0x463ed0(0x341)](_0x215ece,!![],_0x5f4db3);else return Number(RegExp['$1']);}return Window_OTB_TurnOrder[_0x463ed0(0x265)][_0x463ed0(0x39d)];},VisuMZ[_0x3f8e58(0x368)]['Game_Party_addActor']=Game_Party[_0x3f8e58(0x3ca)]['addActor'],Game_Party['prototype'][_0x3f8e58(0x3b2)]=function(_0xa47926){const _0x4ab740=_0x3f8e58;VisuMZ['BattleSystemOTB'][_0x4ab740(0x21d)]['call'](this,_0xa47926);if(Imported['VisuMZ_2_PartySystem'])return;if(SceneManager[_0x4ab740(0x27e)]()&&BattleManager[_0x4ab740(0x25f)]()){if(_0x4ab740(0x3f2)==='fLmDw')BattleManager['removeActionBattlersOTB'](),BattleManager[_0x4ab740(0x249)]($gameActors[_0x4ab740(0x2df)](_0xa47926));else return _0x572bce[_0x4ab740(0x25f)]();}},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x2ed)]=Game_Party[_0x3f8e58(0x3ca)]['removeActor'],Game_Party['prototype'][_0x3f8e58(0x314)]=function(_0xc0ab5f){const _0xb7a16b=_0x3f8e58;VisuMZ[_0xb7a16b(0x368)][_0xb7a16b(0x2ed)][_0xb7a16b(0x2ad)](this,_0xc0ab5f),SceneManager[_0xb7a16b(0x27e)]()&&BattleManager[_0xb7a16b(0x25f)]()&&BattleManager['removeActionBattlersOTB']();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x412)]=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x3bf)],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x3bf)]=function(){const _0xf98013=_0x3f8e58;VisuMZ[_0xf98013(0x368)][_0xf98013(0x412)]['call'](this);if(BattleManager[_0xf98013(0x25f)]()){if(_0xf98013(0x3a4)===_0xf98013(0x3a4))this[_0xf98013(0x38b)]();else{if(!this[_0xf98013(0x25f)]())return;this[_0xf98013(0x3b5)]=[],this[_0xf98013(0x28e)]=![];}}},Scene_Battle['prototype'][_0x3f8e58(0x38b)]=function(){const _0x570d86=_0x3f8e58,_0x480387=this['_actorCommandWindow'];this['isPartyCommandWindowDisabled']()&&delete _0x480387['_handlers'][_0x570d86(0x3c7)];},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x20b)]=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x268)],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x268)]=function(){const _0x1235be=_0x3f8e58;BattleManager[_0x1235be(0x25f)]()?this['commandCancelOTB']():_0x1235be(0x2ef)!==_0x1235be(0x2ef)?_0x438aa5=_0x1235be(0x2d6):VisuMZ['BattleSystemOTB']['Scene_Battle_commandCancel'][_0x1235be(0x2ad)](this);},Scene_Battle[_0x3f8e58(0x3ca)]['commandCancelOTB']=function(){const _0x2dcd0a=_0x3f8e58;BattleManager[_0x2dcd0a(0x455)](),this[_0x2dcd0a(0x2db)][_0x2dcd0a(0x366)](),this[_0x2dcd0a(0x453)][_0x2dcd0a(0x489)]();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x2e1)]=Scene_Battle['prototype']['commandFight'],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x2da)]=function(){const _0x2ecae=_0x3f8e58;if(BattleManager[_0x2ecae(0x25f)]())_0x2ecae(0x48f)===_0x2ecae(0x394)?_0x2b4d64++:this[_0x2ecae(0x1fa)]();else{if('IUveZ'!=='IUveZ'){const _0xb4a0ad=_0x4173f4[_0x2ecae(0x3eb)](_0x6e9fff['BgImageFilename']);_0xb4a0ad[_0x2ecae(0x403)](this[_0x2ecae(0x434)]['bind'](this,_0xb4a0ad));return;}else VisuMZ[_0x2ecae(0x368)][_0x2ecae(0x2e1)]['call'](this);}},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x43a)]=Scene_Battle[_0x3f8e58(0x3ca)]['createAllWindows'],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x35a)]=function(){const _0x3e462e=_0x3f8e58;VisuMZ['BattleSystemOTB']['Scene_Battle_createAllWindows'][_0x3e462e(0x2ad)](this),this[_0x3e462e(0x433)]();},Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x433)]=function(){const _0x486f31=_0x3f8e58;if(!BattleManager[_0x486f31(0x25f)]())return;this[_0x486f31(0x426)]=new Window_OTB_TurnOrder();const _0x3c9b06=this[_0x486f31(0x2ae)](this['_windowLayer']);this[_0x486f31(0x43d)](this[_0x486f31(0x426)],_0x3c9b06),this[_0x486f31(0x2c1)](),SceneManager[_0x486f31(0x23b)]()&&this[_0x486f31(0x426)][_0x486f31(0x217)]();},Scene_Battle[_0x3f8e58(0x3ca)]['repositionLogWindowOTB']=function(){const _0x1ec59c=_0x3f8e58,_0x474dfb=Window_OTB_TurnOrder[_0x1ec59c(0x265)];if(_0x474dfb[_0x1ec59c(0x349)]!==_0x1ec59c(0x36a))return;if(!_0x474dfb[_0x1ec59c(0x281)])return;if(!this[_0x1ec59c(0x228)])return;const _0x4476ae=this[_0x1ec59c(0x426)]['y']-Math[_0x1ec59c(0x4a5)]((Graphics['height']-Graphics[_0x1ec59c(0x443)])/0x2),_0x4aa8df=_0x4476ae+this[_0x1ec59c(0x426)][_0x1ec59c(0x493)];this[_0x1ec59c(0x228)]['y']=_0x4aa8df+(_0x474dfb[_0x1ec59c(0x329)]||0x0);},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x48e)]=Scene_Battle[_0x3f8e58(0x3ca)]['commandAttack'],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x24f)]=function(){const _0x3a1c34=_0x3f8e58;BattleManager[_0x3a1c34(0x455)](),VisuMZ[_0x3a1c34(0x368)][_0x3a1c34(0x48e)][_0x3a1c34(0x2ad)](this);},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x2e2)]=Scene_Battle['prototype'][_0x3f8e58(0x440)],Scene_Battle['prototype'][_0x3f8e58(0x440)]=function(){const _0x5e11da=_0x3f8e58;BattleManager[_0x5e11da(0x455)](),VisuMZ['BattleSystemOTB'][_0x5e11da(0x2e2)]['call'](this);},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x32d)]=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x2d1)],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x2d1)]=function(){const _0x4ab1e6=_0x3f8e58;BattleManager[_0x4ab1e6(0x455)](),VisuMZ[_0x4ab1e6(0x368)][_0x4ab1e6(0x32d)]['call'](this);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x48d)]=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x350)],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x350)]=function(){const _0x2ccadc=_0x3f8e58;BattleManager[_0x2ccadc(0x455)](),VisuMZ['BattleSystemOTB'][_0x2ccadc(0x48d)][_0x2ccadc(0x2ad)](this);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x390)]=Scene_Battle['prototype']['onEnemyOk'],Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x39f)]=function(){const _0x57c47f=_0x3f8e58;BattleManager[_0x57c47f(0x455)](),VisuMZ[_0x57c47f(0x368)][_0x57c47f(0x390)][_0x57c47f(0x2ad)](this);},VisuMZ[_0x3f8e58(0x368)]['Scene_Battle_onEnemyCancel']=Scene_Battle[_0x3f8e58(0x3ca)]['onEnemyCancel'],Scene_Battle[_0x3f8e58(0x3ca)]['onEnemyCancel']=function(){const _0x4b3822=_0x3f8e58;BattleManager[_0x4b3822(0x455)](),VisuMZ['BattleSystemOTB'][_0x4b3822(0x47f)]['call'](this);},VisuMZ[_0x3f8e58(0x368)]['Scene_Battle_onSkillOk']=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x313)],Scene_Battle[_0x3f8e58(0x3ca)]['onSkillOk']=function(){const _0x32a78f=_0x3f8e58;BattleManager[_0x32a78f(0x455)](),VisuMZ[_0x32a78f(0x368)]['Scene_Battle_onSkillOk'][_0x32a78f(0x2ad)](this);},VisuMZ[_0x3f8e58(0x368)]['Scene_Battle_onSkillCancel']=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x43b)],Scene_Battle['prototype'][_0x3f8e58(0x43b)]=function(){const _0x57e6e0=_0x3f8e58;BattleManager[_0x57e6e0(0x455)](),VisuMZ['BattleSystemOTB']['Scene_Battle_onSkillCancel']['call'](this);},VisuMZ['BattleSystemOTB'][_0x3f8e58(0x1e2)]=Scene_Battle['prototype']['onItemOk'],Scene_Battle['prototype']['onItemOk']=function(){const _0x2f091b=_0x3f8e58;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x2f091b(0x368)][_0x2f091b(0x1e2)]['call'](this);},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x4a3)]=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x23c)],Scene_Battle['prototype']['onItemCancel']=function(){const _0x441e86=_0x3f8e58;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x441e86(0x368)][_0x441e86(0x4a3)][_0x441e86(0x2ad)](this);},VisuMZ[_0x3f8e58(0x368)]['Scene_Battle_actorCommandSingleSkill']=Scene_Battle[_0x3f8e58(0x3ca)][_0x3f8e58(0x459)],Scene_Battle['prototype'][_0x3f8e58(0x459)]=function(){const _0x28d367=_0x3f8e58;BattleManager[_0x28d367(0x455)](),VisuMZ[_0x28d367(0x368)][_0x28d367(0x47d)]['call'](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x559f39=_0x3f8e58;this[_0x559f39(0x429)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]=Object[_0x3f8e58(0x273)](Sprite_Clickable[_0x3f8e58(0x3ca)]),Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x3cb)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['initialize']=function(_0x530e04,_0x316a81,_0x4c1427){const _0x323fd1=_0x3f8e58;this[_0x323fd1(0x369)](_0x530e04,_0x316a81,_0x4c1427),Sprite_Clickable[_0x323fd1(0x3ca)]['initialize']['call'](this),this[_0x323fd1(0x431)]=0x0,this[_0x323fd1(0x395)](),this[_0x323fd1(0x283)]();},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x369)]=function(_0x3c9268,_0x13c249,_0xf6fe2a){const _0x383922=_0x3f8e58;this[_0x383922(0x2f7)]=_0x3c9268[_0x383922(0x26f)]()?$gameParty:$gameTroop,this[_0x383922(0x41c)]=_0x3c9268[_0x383922(0x458)](),this[_0x383922(0x437)]=_0x13c249,this[_0x383922(0x374)]=_0xf6fe2a;const _0x1e0ee6=Window_OTB_TurnOrder['Settings'],_0x2bea8f=this[_0x383922(0x214)]();this[_0x383922(0x2aa)]=0x0,this[_0x383922(0x3b8)]=_0x1e0ee6['OrderDirection']?-_0x1e0ee6['SpriteThin']:this[_0x383922(0x252)]()['width'],this[_0x383922(0x22d)]=0x0,this[_0x383922(0x3b4)]=0x0,this[_0x383922(0x233)]=0xff,this['_isAlive']=![],this[_0x383922(0x355)]=![],this[_0x383922(0x2b8)]=0x0,this[_0x383922(0x343)]=0x0;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x395)]=function(){const _0x548ba7=_0x3f8e58;this[_0x548ba7(0x339)](),this['createBackgroundSprite'](),this[_0x548ba7(0x219)](),this['createBorderSprite'](),this[_0x548ba7(0x290)]();},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x339)]=function(){const _0x2b2dcb=_0x3f8e58;this['x']=this['_positionTargetX'],this['y']=this[_0x2b2dcb(0x22d)];},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x214)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x245)]=function(){const _0x1a522c=_0x3f8e58,_0xacf005=Window_OTB_TurnOrder[_0x1a522c(0x265)];return _0xacf005['SpriteThin'];},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['bitmapHeight']=function(){const _0x4c7def=Window_OTB_TurnOrder['Settings'];return _0x4c7def['SpriteLength'];},Sprite_OTB_TurnOrder_Battler['prototype']['getUnitSideSide']=function(){const _0x2c0a8f=_0x3f8e58;return this['_unit']===$gameParty?_0x2c0a8f(0x3a1):_0x2c0a8f(0x3bc);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x3ae)]=function(){const _0x49f154=_0x3f8e58;if(!Window_OTB_TurnOrder[_0x49f154(0x265)]['ShowMarkerBg'])return;const _0x187f5a=Window_OTB_TurnOrder[_0x49f154(0x265)],_0x341faf=this[_0x49f154(0x3d4)](),_0xa069f8=_0x49f154(0x1f8)[_0x49f154(0x438)](_0x341faf),_0x2d2e85=new Sprite();_0x2d2e85['anchor']['x']=this[_0x49f154(0x26e)]['x'],_0x2d2e85[_0x49f154(0x26e)]['y']=this[_0x49f154(0x26e)]['y'];if(_0x187f5a[_0xa069f8])_0x49f154(0x2b6)==='aEdMR'?_0x355944+=_0x1432b7(_0x53c74d['$1']):_0x2d2e85['bitmap']=ImageManager[_0x49f154(0x3eb)](_0x187f5a[_0xa069f8]);else{const _0x569e7a=this['bitmapWidth'](),_0x2ab09e=this[_0x49f154(0x415)]();_0x2d2e85[_0x49f154(0x2f5)]=new Bitmap(_0x569e7a,_0x2ab09e);const _0x4f96b3=ColorManager[_0x49f154(0x2cc)](_0x187f5a[_0x49f154(0x1f2)[_0x49f154(0x438)](_0x341faf)]),_0x2030d0=ColorManager[_0x49f154(0x2cc)](_0x187f5a[_0x49f154(0x3e9)[_0x49f154(0x438)](_0x341faf)]);_0x2d2e85['bitmap']['gradientFillRect'](0x0,0x0,_0x569e7a,_0x2ab09e,_0x4f96b3,_0x2030d0,!![]);}this['_backgroundSprite']=_0x2d2e85,this[_0x49f154(0x33e)](this[_0x49f154(0x2e8)]),this[_0x49f154(0x226)]=this[_0x49f154(0x2e8)]['width'],this[_0x49f154(0x493)]=this[_0x49f154(0x2e8)][_0x49f154(0x493)];},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['createGraphicSprite']=function(){const _0x5ef733=_0x3f8e58,_0x42bd41=new Sprite();_0x42bd41[_0x5ef733(0x26e)]['x']=this[_0x5ef733(0x26e)]['x'],_0x42bd41[_0x5ef733(0x26e)]['y']=this['anchor']['y'],this['_graphicSprite']=_0x42bd41,this['addChild'](this['_graphicSprite']),this['processUpdateGraphic']();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x3f8)]=function(){const _0x446b5a=_0x3f8e58;if(!Window_OTB_TurnOrder[_0x446b5a(0x265)]['ShowMarkerBorder'])return;const _0x227280=Window_OTB_TurnOrder[_0x446b5a(0x265)],_0x3710fa=this[_0x446b5a(0x3d4)](),_0x8b1f5a=_0x446b5a(0x495)[_0x446b5a(0x438)](_0x3710fa),_0x303c98=new Sprite();_0x303c98[_0x446b5a(0x26e)]['x']=this[_0x446b5a(0x26e)]['x'],_0x303c98[_0x446b5a(0x26e)]['y']=this[_0x446b5a(0x26e)]['y'];if(_0x227280[_0x8b1f5a])_0x303c98[_0x446b5a(0x2f5)]=ImageManager['loadSystem'](_0x227280[_0x8b1f5a]);else{if(_0x446b5a(0x24d)!==_0x446b5a(0x296)){let _0x506b1c=this['bitmapWidth'](),_0x4f66bd=this[_0x446b5a(0x415)](),_0x542c94=this[_0x446b5a(0x49c)]();_0x303c98[_0x446b5a(0x2f5)]=new Bitmap(_0x506b1c,_0x4f66bd);const _0x24baa1=_0x446b5a(0x257),_0x4393a9=ColorManager[_0x446b5a(0x2cc)](_0x227280[_0x446b5a(0x250)['format'](_0x3710fa)]);_0x303c98['bitmap'][_0x446b5a(0x25b)](0x0,0x0,_0x506b1c,_0x4f66bd,_0x24baa1),_0x506b1c-=0x2,_0x4f66bd-=0x2,_0x303c98[_0x446b5a(0x2f5)][_0x446b5a(0x25b)](0x1,0x1,_0x506b1c,_0x4f66bd,_0x4393a9),_0x506b1c-=_0x542c94*0x2,_0x4f66bd-=_0x542c94*0x2,_0x303c98[_0x446b5a(0x2f5)][_0x446b5a(0x25b)](0x1+_0x542c94,0x1+_0x542c94,_0x506b1c,_0x4f66bd,_0x24baa1),_0x506b1c-=0x2,_0x4f66bd-=0x2,_0x542c94+=0x1,_0x303c98[_0x446b5a(0x2f5)][_0x446b5a(0x44e)](0x1+_0x542c94,0x1+_0x542c94,_0x506b1c,_0x4f66bd);}else{if(!_0xbaf45a[_0x446b5a(0x25f)]())return;this[_0x446b5a(0x3e6)]=0x0;}}this[_0x446b5a(0x2e8)]=_0x303c98,this[_0x446b5a(0x33e)](this[_0x446b5a(0x2e8)]);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x49c)]=function(){const _0x2ccff3=_0x3f8e58,_0x3c348e=Window_OTB_TurnOrder[_0x2ccff3(0x265)];return _0x3c348e[_0x2ccff3(0x480)];},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x290)]=function(){const _0x4f5538=_0x3f8e58,_0x8e8acb=Window_OTB_TurnOrder[_0x4f5538(0x265)];if(!_0x8e8acb[_0x4f5538(0x487)])return;if(this[_0x4f5538(0x2f7)]===$gameParty)return;const _0x429d37=this[_0x4f5538(0x245)](),_0x1a7af0=this[_0x4f5538(0x415)](),_0x442700=new Sprite();_0x442700[_0x4f5538(0x26e)]['x']=this[_0x4f5538(0x26e)]['x'],_0x442700['anchor']['y']=this[_0x4f5538(0x26e)]['y'],_0x442700[_0x4f5538(0x2f5)]=new Bitmap(_0x429d37,_0x1a7af0),this['_letterSprite']=_0x442700,this[_0x4f5538(0x33e)](this[_0x4f5538(0x3a0)]);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2e5)]=function(){const _0x5ca81b=_0x3f8e58;return this[_0x5ca81b(0x2f7)]?this[_0x5ca81b(0x2f7)][_0x5ca81b(0x2ce)]()[this[_0x5ca81b(0x41c)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['update']=function(){const _0x534a37=_0x3f8e58;Sprite_Clickable['prototype']['update'][_0x534a37(0x2ad)](this),this[_0x534a37(0x34c)](),this['checkOpacity'](),this[_0x534a37(0x46b)](),this['updateGraphic'](),this[_0x534a37(0x2fd)](),this[_0x534a37(0x492)](),this[_0x534a37(0x23e)]();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x330)]=function(_0x5c2e10,_0x576504){const _0xb76029=_0x3f8e58,_0x50473=Window_OTB_TurnOrder[_0xb76029(0x265)];this[_0xb76029(0x2aa)]=_0x50473[_0xb76029(0x435)],this[_0xb76029(0x3b8)]=_0x5c2e10,this[_0xb76029(0x22d)]=_0x576504;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x34c)]=function(){const _0x45085b=_0x3f8e58;if(this['_positionDuration']>0x0){if(_0x45085b(0x270)===_0x45085b(0x270)){const _0x1b1e8b=this[_0x45085b(0x2aa)];this['x']=(this['x']*(_0x1b1e8b-0x1)+this[_0x45085b(0x3b8)])/_0x1b1e8b,this['y']=(this['y']*(_0x1b1e8b-0x1)+this[_0x45085b(0x22d)])/_0x1b1e8b,this['_positionDuration']--;}else return this[_0x45085b(0x2f7)]===_0x2f98e2?_0x45085b(0x3a1):_0x45085b(0x3bc);}if(this[_0x45085b(0x2aa)]<=0x0){if(_0x45085b(0x288)!=='Gsdud')_0x1dd7ab=_0x5873cd[_0x45085b(0x494)](_0x22b978[_0x45085b(0x376)]-_0x20c7da)+_0x334971;else{this['x']=this[_0x45085b(0x3b8)],this['y']=this['_positionTargetY'];if(this['opacity']<0xff&&!this[_0x45085b(0x30f)]&&this[_0x45085b(0x3b4)]<=0x0){const _0x273f14=this[_0x45085b(0x2e5)]();_0x273f14&&(this[_0x45085b(0x233)]=_0x273f14[_0x45085b(0x3a2)]()&&_0x273f14[_0x45085b(0x216)]()?0xff:0x0);}}}},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x2a6)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x252)]=function(){const _0x585537=_0x3f8e58;return SceneManager['_scene'][_0x585537(0x426)];},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2d4)]=function(){const _0x4c323f=_0x3f8e58,_0x2991da=this[_0x4c323f(0x2e5)]();if(!_0x2991da)return this[_0x4c323f(0x2a6)]();if(_0x2991da===BattleManager[_0x4c323f(0x424)])return 0x0;if(BattleManager[_0x4c323f(0x1dd)][_0x4c323f(0x1f3)](_0x2991da)){if(_0x4c323f(0x430)===_0x4c323f(0x430)){const _0x5b8d6e=BattleManager[_0x4c323f(0x1dd)]['indexOf'](_0x2991da)+0x1;return _0x5b8d6e;}else _0x1a10dc[_0x4c323f(0x2b9)](_0x385a32,_0x21aab7);}return this[_0x4c323f(0x2a6)]();},Sprite_OTB_TurnOrder_Battler['prototype']['startFade']=function(_0x2e25bf){const _0x30f882=_0x3f8e58,_0x12a72e=Window_OTB_TurnOrder['Settings'];this[_0x30f882(0x3b4)]=_0x12a72e['UpdateFrames'],this[_0x30f882(0x233)]=_0x2e25bf;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x283)]=function(){const _0x32e8b1=_0x3f8e58,_0xbbf1af=this['battler']();if(!_0xbbf1af)return;if(this[_0x32e8b1(0x300)]===_0xbbf1af[_0x32e8b1(0x3a2)]()&&this[_0x32e8b1(0x355)]===_0xbbf1af['isAppeared']())return;this[_0x32e8b1(0x300)]=_0xbbf1af[_0x32e8b1(0x3a2)](),this[_0x32e8b1(0x355)]=_0xbbf1af[_0x32e8b1(0x216)]();let _0x408dbe=this['_isAlive']&&this[_0x32e8b1(0x355)]?0xff:0x0;this['startFade'](_0x408dbe);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['updateOpacity']=function(){const _0x3cc4a9=_0x3f8e58;if(this[_0x3cc4a9(0x3b4)]>0x0){const _0x28650e=this[_0x3cc4a9(0x3b4)];this['opacity']=(this[_0x3cc4a9(0x431)]*(_0x28650e-0x1)+this[_0x3cc4a9(0x233)])/_0x28650e,this[_0x3cc4a9(0x3b4)]--;if(this['_fadeDuration']<=0x0){if('eEZCx'===_0x3cc4a9(0x25d))this[_0x3cc4a9(0x431)]=this['_fadeTarget'];else return _0x1c687f[_0x3cc4a9(0x368)][_0x3cc4a9(0x265)][_0x3cc4a9(0x478)][_0x3cc4a9(0x381)];}}if(this[_0x3cc4a9(0x30f)])return;if(BattleManager[_0x3cc4a9(0x23f)]===_0x3cc4a9(0x24c)){if(_0x3cc4a9(0x310)!=='nTDpd'){if(!this[_0x3cc4a9(0x25f)]())return;const _0x45abc7=_0x4f757e[_0x3cc4a9(0x1f5)][_0x3cc4a9(0x426)];if(!_0x45abc7)return;_0x45abc7[_0x3cc4a9(0x241)](null);}else this[_0x3cc4a9(0x30f)]=!![],this[_0x3cc4a9(0x30b)](0x0);}},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['updateGraphic']=function(){const _0x41266a=_0x3f8e58,_0x4c9673=this['battler']();if(!_0x4c9673)return;const _0x1458d5=Window_OTB_TurnOrder[_0x41266a(0x265)],_0xba92f2=this['_unit']===$gameParty?_0x41266a(0x3a1):_0x41266a(0x3bc);let _0x1ff654=_0x4c9673[_0x41266a(0x3d0)]();if(_0x4c9673[_0x41266a(0x26f)]()&&_0x1ff654==='enemy'){if('lAeDg'!==_0x41266a(0x469))return _0x18f0e4[_0x41266a(0x2f3)]?-_0x1c17a1[_0x41266a(0x463)]:_0x5e6fbc['SpriteThin'];else _0x1ff654=_0x41266a(0x328);}else _0x4c9673[_0x41266a(0x254)]()&&_0x1ff654==='svactor'&&(_0x1ff654=_0x41266a(0x2d6));if(this[_0x41266a(0x425)]!==_0x1ff654){if(_0x41266a(0x305)!==_0x41266a(0x305)){if(!_0x494f37['isOTB']())return;this[_0x41266a(0x3e6)]=0x0,this[_0x41266a(0x248)]=_0x4437bf;}else return this[_0x41266a(0x2ac)]();}switch(this[_0x41266a(0x425)]){case _0x41266a(0x328):if(this[_0x41266a(0x1f6)]!==_0x4c9673[_0x41266a(0x490)]())return _0x41266a(0x42f)!==_0x41266a(0x22c)?this[_0x41266a(0x2ac)]():this[_0x41266a(0x2ac)]();if(this[_0x41266a(0x253)]!==_0x4c9673[_0x41266a(0x23d)]())return this[_0x41266a(0x2ac)]();break;case _0x41266a(0x48b):if(this[_0x41266a(0x2d5)]!==_0x4c9673[_0x41266a(0x246)]())return this[_0x41266a(0x2ac)]();break;case _0x41266a(0x2d6):if(_0x4c9673['hasSvBattler']()){if(this[_0x41266a(0x1fb)]!==_0x4c9673[_0x41266a(0x3a3)]()){if(_0x41266a(0x467)!==_0x41266a(0x32c))return this[_0x41266a(0x2ac)]();else _0x23ed62+=_0x21b0ed[_0x41266a(0x44a)]['call'](this);}}else{if(this[_0x41266a(0x274)]!==_0x4c9673[_0x41266a(0x42b)]())return this[_0x41266a(0x2ac)]();}break;case'svactor':if(_0x4c9673['isActor']()){if(_0x41266a(0x3ba)!==_0x41266a(0x3ba)){this[_0x41266a(0x2f4)]=new _0x546455(),this['_bgImageSprite']['bitmap']=_0x3e0d8a,this['addChildToBack'](this[_0x41266a(0x2f4)]);const _0xa8a0b8=_0x1b721e[_0x41266a(0x265)];this['_bgImageSprite']['x']=_0xa8a0b8[_0x41266a(0x36b)],this[_0x41266a(0x2f4)]['y']=_0xa8a0b8[_0x41266a(0x2cb)];}else{if(this[_0x41266a(0x1fb)]!==_0x4c9673[_0x41266a(0x42b)]())return _0x41266a(0x319)===_0x41266a(0x319)?this[_0x41266a(0x2ac)]():(this[_0x41266a(0x424)]=_0x3f2c71[_0x41266a(0x368)]['BattleManager_getNextSubject']['call'](this),this['isOTB']()&&this[_0x41266a(0x424)]&&this[_0x41266a(0x42c)](this[_0x41266a(0x424)]),this['_subject']);}}else{if(this['_graphicEnemy']!==_0x4c9673['battlerName']()){if('EesWf'===_0x41266a(0x48c))return this['processUpdateGraphic']();else{if(!this[_0x41266a(0x25f)]())return;const _0x55bb90=_0x52fa9c[_0x41266a(0x1f5)]['_otbTurnOrderWindow'];if(!_0x55bb90)return;_0x55bb90[_0x41266a(0x241)](this[_0x41266a(0x364)]());}}}break;}},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2ac)]=function(){const _0x357c1e=_0x3f8e58,_0x5c1062=this[_0x357c1e(0x2e5)]();if(!_0x5c1062)return;this['_graphicType']=_0x5c1062[_0x357c1e(0x3d0)]();if(_0x5c1062[_0x357c1e(0x26f)]()&&this[_0x357c1e(0x425)]==='enemy'){if(_0x357c1e(0x42e)===_0x357c1e(0x42e))this[_0x357c1e(0x425)]='face';else{if(_0x213117[_0x27181b]===_0x1d6bde)_0x5d05c8[_0x357c1e(0x46f)](_0x5ddc0a);}}else _0x5c1062['isEnemy']()&&this[_0x357c1e(0x425)]===_0x357c1e(0x309)&&('trKyZ'==='HvLVr'?(_0x1d797f[_0x357c1e(0x455)](),_0x156c34[_0x357c1e(0x368)][_0x357c1e(0x390)][_0x357c1e(0x2ad)](this)):this['_graphicType']=_0x357c1e(0x2d6));let _0x4888ff;switch(this['_graphicType']){case _0x357c1e(0x328):this['_graphicFaceName']=_0x5c1062[_0x357c1e(0x490)](),this[_0x357c1e(0x253)]=_0x5c1062[_0x357c1e(0x23d)](),_0x4888ff=ImageManager[_0x357c1e(0x365)](this[_0x357c1e(0x1f6)]),_0x4888ff[_0x357c1e(0x403)](this[_0x357c1e(0x239)][_0x357c1e(0x2ea)](this,_0x4888ff));break;case _0x357c1e(0x48b):this['_graphicIconIndex']=_0x5c1062[_0x357c1e(0x201)](),_0x4888ff=ImageManager['loadSystem'](_0x357c1e(0x2b7)),_0x4888ff[_0x357c1e(0x403)](this[_0x357c1e(0x2d2)][_0x357c1e(0x2ea)](this,_0x4888ff));break;case'enemy':if(_0x5c1062[_0x357c1e(0x210)]())_0x357c1e(0x479)!=='AscCe'?(this[_0x357c1e(0x339)](),this[_0x357c1e(0x3ae)](),this[_0x357c1e(0x219)](),this[_0x357c1e(0x3f8)](),this['createLetterSprite']()):(this[_0x357c1e(0x1fb)]=_0x5c1062['svBattlerName'](),_0x4888ff=ImageManager[_0x357c1e(0x488)](this[_0x357c1e(0x1fb)]),_0x4888ff[_0x357c1e(0x403)](this[_0x357c1e(0x34f)]['bind'](this,_0x4888ff)));else $gameSystem[_0x357c1e(0x3f3)]()?(this[_0x357c1e(0x274)]=_0x5c1062[_0x357c1e(0x42b)](),_0x4888ff=ImageManager[_0x357c1e(0x420)](this[_0x357c1e(0x274)]),_0x4888ff[_0x357c1e(0x403)](this[_0x357c1e(0x450)][_0x357c1e(0x2ea)](this,_0x4888ff))):(this['_graphicEnemy']=_0x5c1062['battlerName'](),_0x4888ff=ImageManager[_0x357c1e(0x3c8)](this[_0x357c1e(0x274)]),_0x4888ff[_0x357c1e(0x403)](this['changeEnemyGraphicBitmap'][_0x357c1e(0x2ea)](this,_0x4888ff)));break;case _0x357c1e(0x309):this[_0x357c1e(0x1fb)]=_0x5c1062[_0x357c1e(0x42b)](),_0x4888ff=ImageManager[_0x357c1e(0x488)](this[_0x357c1e(0x1fb)]),_0x4888ff[_0x357c1e(0x403)](this[_0x357c1e(0x34f)][_0x357c1e(0x2ea)](this,_0x4888ff));break;}},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x239)]=function(_0x5aeeab){const _0x522b61=_0x3f8e58,_0x4588b4=this['_graphicFaceIndex'],_0xc61697=this['bitmapWidth'](),_0x577c70=this[_0x522b61(0x415)](),_0x560dbd=Math[_0x522b61(0x3c1)](_0xc61697,_0x577c70);this[_0x522b61(0x2d0)][_0x522b61(0x2f5)]=new Bitmap(_0xc61697,_0x577c70);const _0x4edb06=this[_0x522b61(0x2d0)][_0x522b61(0x2f5)],_0x4a098b=ImageManager[_0x522b61(0x35d)],_0x1ef476=ImageManager[_0x522b61(0x3d9)],_0x3e31ef=_0x560dbd/Math[_0x522b61(0x3c1)](_0x4a098b,_0x1ef476),_0x41a66c=ImageManager['faceWidth'],_0x307f7e=ImageManager['faceHeight'],_0x1242f5=_0x4588b4%0x4*_0x4a098b+(_0x4a098b-_0x41a66c)/0x2,_0x1d16d8=Math[_0x522b61(0x2b5)](_0x4588b4/0x4)*_0x1ef476+(_0x1ef476-_0x307f7e)/0x2,_0x4d223b=(_0xc61697-_0x4a098b*_0x3e31ef)/0x2,_0xd7ca8e=(_0x577c70-_0x1ef476*_0x3e31ef)/0x2;_0x4edb06[_0x522b61(0x47b)](_0x5aeeab,_0x1242f5,_0x1d16d8,_0x41a66c,_0x307f7e,_0x4d223b,_0xd7ca8e,_0x560dbd,_0x560dbd);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['changeIconGraphicBitmap']=function(_0x5bfa0b){const _0x3912aa=_0x3f8e58,_0x2465bb=this[_0x3912aa(0x2d5)],_0x449c1e=this[_0x3912aa(0x245)](),_0x2a96bc=this[_0x3912aa(0x415)]();this[_0x3912aa(0x2d0)]['bitmap']=new Bitmap(_0x449c1e,_0x2a96bc);const _0x3bdaf7=this[_0x3912aa(0x2d0)]['bitmap'],_0x5557a8=ImageManager[_0x3912aa(0x206)],_0x2b50b8=ImageManager[_0x3912aa(0x33f)],_0x49fe95=Math[_0x3912aa(0x49a)](_0x5557a8,_0x2b50b8,_0x449c1e,_0x2a96bc),_0x47f743=_0x2465bb%0x10*_0x5557a8,_0x5f37e0=Math[_0x3912aa(0x2b5)](_0x2465bb/0x10)*_0x2b50b8,_0x21e0cc=Math['floor'](Math['max'](_0x449c1e-_0x49fe95,0x0)/0x2),_0x1769d6=Math[_0x3912aa(0x2b5)](Math[_0x3912aa(0x3c1)](_0x2a96bc-_0x49fe95,0x0)/0x2);_0x3bdaf7['blt'](_0x5bfa0b,_0x47f743,_0x5f37e0,_0x5557a8,_0x2b50b8,_0x21e0cc,_0x1769d6,_0x49fe95,_0x49fe95);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['changeSvActorGraphicBitmap']=function(_0x49edb6){const _0x545c30=_0x3f8e58,_0x1100d2=this['bitmapWidth'](),_0x1eeeda=this[_0x545c30(0x415)](),_0x1f0fbf=Math['min'](_0x1100d2,_0x1eeeda);this[_0x545c30(0x2d0)]['bitmap']=new Bitmap(_0x1100d2,_0x1eeeda);const _0x11dad7=this[_0x545c30(0x2d0)]['bitmap'],_0x58e248=this['_graphicSv'][_0x545c30(0x37c)](/\$/i),_0x406c51=_0x58e248?0x1:ImageManager[_0x545c30(0x200)],_0x4e39fa=_0x58e248?0x1:ImageManager[_0x545c30(0x4a6)],_0x1b3030=_0x49edb6[_0x545c30(0x226)]/_0x406c51,_0x2943de=_0x49edb6[_0x545c30(0x493)]/_0x4e39fa,_0x435cba=Math[_0x545c30(0x49a)](0x1,_0x1f0fbf/_0x1b3030,_0x1f0fbf/_0x2943de),_0x3451df=_0x1b3030*_0x435cba,_0x115727=_0x2943de*_0x435cba,_0x68c213=Math[_0x545c30(0x4a5)]((_0x1100d2-_0x3451df)/0x2),_0x161ed4=Math[_0x545c30(0x4a5)]((_0x1eeeda-_0x115727)/0x2);_0x11dad7[_0x545c30(0x47b)](_0x49edb6,0x0,0x0,_0x1b3030,_0x2943de,_0x68c213,_0x161ed4,_0x3451df,_0x115727);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x450)]=function(_0x53ffe0){const _0x264e7d=_0x3f8e58,_0x54bbd9=Window_OTB_TurnOrder['Settings'],_0xa9c152=this[_0x264e7d(0x245)](),_0x1495af=this[_0x264e7d(0x415)](),_0x5b66b8=Math[_0x264e7d(0x49a)](_0xa9c152,_0x1495af);this[_0x264e7d(0x2d0)][_0x264e7d(0x2f5)]=new Bitmap(_0xa9c152,_0x1495af);const _0x1c7c15=this[_0x264e7d(0x2d0)][_0x264e7d(0x2f5)],_0x56604c=Math[_0x264e7d(0x49a)](0x1,_0x5b66b8/_0x53ffe0[_0x264e7d(0x226)],_0x5b66b8/_0x53ffe0['height']),_0x13f3fb=_0x53ffe0[_0x264e7d(0x226)]*_0x56604c,_0x5ca57e=_0x53ffe0['height']*_0x56604c,_0x5428c3=Math[_0x264e7d(0x4a5)]((_0xa9c152-_0x13f3fb)/0x2),_0x4eff23=Math['round']((_0x1495af-_0x5ca57e)/0x2);_0x1c7c15[_0x264e7d(0x47b)](_0x53ffe0,0x0,0x0,_0x53ffe0[_0x264e7d(0x226)],_0x53ffe0['height'],_0x5428c3,_0x4eff23,_0x13f3fb,_0x5ca57e);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x2fd)]=function(){const _0x3869b7=_0x3f8e58,_0x36f555=this[_0x3869b7(0x2e5)]();if(!_0x36f555)return;if(!_0x36f555[_0x3869b7(0x254)]())return;if(this['_graphicHue']===_0x36f555[_0x3869b7(0x3e0)]())return;this[_0x3869b7(0x347)]=_0x36f555[_0x3869b7(0x3e0)](),this[_0x3869b7(0x2d0)][_0x3869b7(0x1e9)](_0x36f555[_0x3869b7(0x210)]()?0x0:this[_0x3869b7(0x347)]);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x492)]=function(){const _0x5732af=_0x3f8e58;if(!this[_0x5732af(0x3a0)])return;const _0x236b6a=this[_0x5732af(0x2e5)]();if(!_0x236b6a)return;if(this[_0x5732af(0x1ec)]===_0x236b6a[_0x5732af(0x1ec)]&&this[_0x5732af(0x37e)]===_0x236b6a['_plural'])return;this[_0x5732af(0x1ec)]=_0x236b6a[_0x5732af(0x1ec)],this[_0x5732af(0x37e)]=_0x236b6a[_0x5732af(0x37e)];const _0x2ef9b3=Window_OTB_TurnOrder['Settings'],_0x5a3bc3=this[_0x5732af(0x245)](),_0x283095=this[_0x5732af(0x415)](),_0x57bc17=this['_letterSprite'][_0x5732af(0x2f5)];_0x57bc17['clear']();if(!this[_0x5732af(0x37e)])return;_0x57bc17['fontFace']=_0x2ef9b3[_0x5732af(0x282)]||$gameSystem[_0x5732af(0x1e4)](),_0x57bc17[_0x5732af(0x348)]=_0x2ef9b3[_0x5732af(0x3b1)]||0x10;if(_0x2ef9b3[_0x5732af(0x2f3)])_0x57bc17[_0x5732af(0x35c)](this[_0x5732af(0x1ec)][_0x5732af(0x380)](),_0x5a3bc3*0x1/0x8,_0x283095/0x2,_0x5a3bc3,_0x283095/0x2,_0x5732af(0x2a8));else{if('hcIhd'!=='RQdde')_0x57bc17['drawText'](this[_0x5732af(0x1ec)][_0x5732af(0x380)](),0x0,_0x283095/0x2,_0x5a3bc3*0x7/0x8,_0x283095/0x2,_0x5732af(0x3e3));else{const _0x49d447=this[_0x5732af(0x258)](),_0x3334e9=this['makeActionTimes']();_0x5ed930[_0x5732af(0x368)][_0x5732af(0x408)]['call'](this,_0x46d6df),this[_0x5732af(0x35e)](_0x49d447,_0x3334e9);}}},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x23e)]=function(){const _0x3537f6=_0x3f8e58,_0x28d100=this[_0x3537f6(0x2e5)]();if(!_0x28d100)return;const _0x1c6f0a=_0x28d100[_0x3537f6(0x2e5)]();if(!_0x1c6f0a)return;const _0x215403=_0x1c6f0a[_0x3537f6(0x344)]();if(!_0x215403)return;this[_0x3537f6(0x387)](_0x215403[_0x3537f6(0x3df)]);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)]['getStateTooltipBattler']=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x3f5)]=function(_0x45e0bd){const _0x53ff62=_0x3f8e58;this['_sourceArray']=_0x45e0bd,this[_0x53ff62(0x2f8)](),this[_0x53ff62(0x374)]===null&&(this[_0x53ff62(0x437)]=-0x1);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x3f8e58(0x2f8)]=function(){const _0x1cec17=_0x3f8e58,_0x469ac4=this[_0x1cec17(0x252)]();if(!_0x469ac4)return;const _0x4c79c6=Window_OTB_TurnOrder[_0x1cec17(0x265)],_0x4f9567=_0x4c79c6['OrderDirection'],_0x11213d=this[_0x1cec17(0x374)]===_0x469ac4[_0x1cec17(0x40d)]?!![]:![],_0x52b3d8=this[_0x1cec17(0x437)]===-0x1&&BattleManager[_0x1cec17(0x424)]===this[_0x1cec17(0x2e5)](),_0x17caef=_0x469ac4[_0x1cec17(0x3fa)]-_0x4c79c6[_0x1cec17(0x463)];let _0x2c3146=Math[_0x1cec17(0x1e1)](_0x17caef/(this[_0x1cec17(0x374)]['length']-0x1||0x1));_0x2c3146=Math[_0x1cec17(0x49a)](_0x4c79c6[_0x1cec17(0x463)],_0x2c3146);let _0x443a46=0x0,_0x1d8c68=0x0,_0x411898=_0x52b3d8?-0x1:this['_sourceArray']['indexOf'](this);!_0x52b3d8&&(_0x411898=this['calculateTargetIndex']());if(_0x52b3d8)_0x443a46=_0x469ac4['_subjectX'];else _0x4f9567?(_0x443a46=(_0x11213d?_0x469ac4['_nextX']:_0x469ac4[_0x1cec17(0x45b)])+_0x17caef,_0x443a46-=_0x411898*_0x2c3146):(_0x443a46=_0x11213d?_0x469ac4[_0x1cec17(0x448)]:_0x469ac4[_0x1cec17(0x45b)],_0x443a46+=_0x411898*_0x2c3146);_0x443a46+=this[_0x1cec17(0x221)](_0x411898,_0x4c79c6[_0x1cec17(0x463)]-_0x2c3146),!_0x52b3d8&&_0x411898<0x0&&(_0x1cec17(0x323)===_0x1cec17(0x21a)?(_0x51d747[_0x1cec17(0x455)](),_0x531a14[_0x1cec17(0x368)]['Scene_Battle_onItemOk'][_0x1cec17(0x2ad)](this)):(_0x443a46=this['x'],_0x1d8c68=this['y'],this[_0x1cec17(0x30b)](0x0))),this[_0x1cec17(0x330)](_0x443a46,_0x1d8c68);},Sprite_OTB_TurnOrder_Battler[_0x3f8e58(0x3ca)][_0x3f8e58(0x221)]=function(_0x2fb874,_0x2e0695){return 0x0;},Sprite_OTB_TurnOrder_Battler['prototype']['calculateTargetIndex']=function(){const _0x327491=_0x3f8e58,_0x1813f2=this['containerWindow']();if(!_0x1813f2)return 0x0;const _0x387cd4=this['_sourceArray']===_0x1813f2[_0x327491(0x40d)]?!![]:![],_0x5e1cd0=_0x387cd4?BattleManager[_0x327491(0x3b5)]:BattleManager['_actionBattlers'],_0x5d74fb=this[_0x327491(0x2e5)](),_0x242816=VisuMZ[_0x327491(0x368)][_0x327491(0x49d)](_0x5d74fb,_0x5e1cd0);return _0x242816[this[_0x327491(0x437)]]??_0x242816[_0x242816[_0x327491(0x376)]-0x1]??-0x1;};function _0xe4fd(_0x2a25d2,_0x4ae7e8){const _0x5f55c5=_0x5f55();return _0xe4fd=function(_0xe4fd67,_0x6422ae){_0xe4fd67=_0xe4fd67-0x1dd;let _0x25393b=_0x5f55c5[_0xe4fd67];return _0x25393b;},_0xe4fd(_0x2a25d2,_0x4ae7e8);}function Sprite_OTB_TurnOrder_Preview(){const _0x2d019d=_0x3f8e58;this[_0x2d019d(0x429)](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)]=Object[_0x3f8e58(0x273)](Sprite_OTB_TurnOrder_Battler['prototype']),Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)][_0x3f8e58(0x3cb)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)][_0x3f8e58(0x429)]=function(_0x4c7e74,_0x171d46,_0x1d96d2,_0x254b05){const _0x11f1ff=_0x3f8e58;this[_0x11f1ff(0x3a7)]=_0x254b05,Sprite_OTB_TurnOrder_Battler[_0x11f1ff(0x3ca)]['initialize'][_0x11f1ff(0x2ad)](this,_0x4c7e74,_0x171d46,_0x1d96d2),this[_0x11f1ff(0x400)]();},Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)]['adjustForPreview']=function(){const _0x3872b2=_0x3f8e58,_0x93ce2f=Window_OTB_TurnOrder['Settings'];this[_0x3872b2(0x301)]['x']=this[_0x3872b2(0x301)]['y']=_0x93ce2f[_0x3872b2(0x3ea)];},Sprite_OTB_TurnOrder_Preview['prototype'][_0x3f8e58(0x3d4)]=function(){const _0x2027c9=_0x3f8e58;return this[_0x2027c9(0x2f7)]===$gameParty?'PreviewActor':_0x2027c9(0x379);},Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)][_0x3f8e58(0x49c)]=function(){const _0x280131=_0x3f8e58,_0x5e29b1=Window_OTB_TurnOrder['Settings'];return Math['ceil'](_0x5e29b1[_0x280131(0x480)]/(_0x5e29b1['PreviewScale']||0.01));},Sprite_OTB_TurnOrder_Preview['prototype'][_0x3f8e58(0x330)]=function(_0x245760,_0x4e72f5){const _0x4486f5=_0x3f8e58;Sprite_OTB_TurnOrder_Battler['prototype'][_0x4486f5(0x330)][_0x4486f5(0x2ad)](this,_0x245760,_0x4e72f5),this['x']=this[_0x4486f5(0x3b8)],this['y']=this[_0x4486f5(0x22d)];},Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)][_0x3f8e58(0x30b)]=function(_0xcb8d51){const _0x27a871=_0x3f8e58;Sprite_OTB_TurnOrder_Battler[_0x27a871(0x3ca)][_0x27a871(0x30b)]['call'](this,_0xcb8d51);if(_0xcb8d51>0x0){if(_0x27a871(0x3ad)===_0x27a871(0x3ad))this[_0x27a871(0x3b4)]=0x1;else{const _0x19aa68=this[_0x27a871(0x2d6)]()['note'];if(_0x19aa68[_0x27a871(0x37c)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x27a871(0x328);else{if(_0x19aa68[_0x27a871(0x37c)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x27a871(0x48b);}return _0x3bb879['Settings']['EnemyBattlerType'];}}else this['_fadeDuration']/=0x2,this[_0x27a871(0x3b4)]=Math[_0x27a871(0x2b5)](this[_0x27a871(0x3b4)]);},Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)][_0x3f8e58(0x221)]=function(_0x5d747c,_0x3085b4){const _0x17e103=_0x3f8e58,_0x283951=Window_OTB_TurnOrder['Settings'];if(_0x5d747c>0x0){if(this[_0x17e103(0x3a7)]>0x0){if(_0x17e103(0x476)===_0x17e103(0x29d))this[_0x17e103(0x496)](),_0x313fbd[_0x17e103(0x213)](),_0x20b0f7[_0x17e103(0x213)]();else{if(_0x283951['OrderDirection'])return-_0x283951[_0x17e103(0x463)];else{if('XzlAW'==='XzlAW')return _0x283951[_0x17e103(0x463)];else this[_0x17e103(0x237)](),_0x59e6f8&&_0x15e01f[_0x17e103(0x3e1)]()!==null&&this[_0x17e103(0x1ee)](_0x5000b8);}}}else{if(this[_0x17e103(0x3a7)]<0x0){if(_0x283951[_0x17e103(0x2f3)])return-_0x3085b4;else{if(_0x17e103(0x468)===_0x17e103(0x2e6))_0x324b38[_0x17e103(0x3ca)][_0x17e103(0x26c)][_0x17e103(0x2ad)](this),this[_0x17e103(0x3e2)](),this[_0x17e103(0x34c)](),this['updateVisibility'](),this[_0x17e103(0x267)]();else return _0x3085b4;}}}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)][_0x3f8e58(0x321)]=function(){const _0xb34ea5=_0x3f8e58,_0x5758c1=this['containerWindow'](),_0x306e50=this[_0xb34ea5(0x374)]===_0x5758c1['_nextTurn']?!![]:![],_0x53df73=_0x306e50?BattleManager[_0xb34ea5(0x3b5)]:BattleManager['_actionBattlers'];let _0x29c131=0x0,_0x4bc1d9=_0x53df73[_0xb34ea5(0x376)]-0x1;_0x306e50&&(_0xb34ea5(0x473)!==_0xb34ea5(0x325)?_0x29c131=Math[_0xb34ea5(0x3c1)](0x0,VisuMZ[_0xb34ea5(0x368)][_0xb34ea5(0x33b)](_0x53df73)):this['createOrderPreviewSprite'](_0x18a66b,![],_0x371c52));let _0x40f6da=Sprite_OTB_TurnOrder_Battler[_0xb34ea5(0x3ca)][_0xb34ea5(0x321)]['call'](this);return _0x40f6da+=this[_0xb34ea5(0x3a7)],_0x40f6da[_0xb34ea5(0x3f1)](_0x29c131,_0x4bc1d9);},Sprite_OTB_TurnOrder_Preview[_0x3f8e58(0x3ca)]['updateSelectionEffect']=function(){},Window_Selectable[_0x3f8e58(0x3ca)]['isBattleItemWindowOTB']=function(){return![];},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x315)]=Window_Selectable['prototype'][_0x3f8e58(0x357)],Window_Selectable[_0x3f8e58(0x3ca)][_0x3f8e58(0x357)]=function(_0x4d7a89){const _0x2b471b=_0x3f8e58;VisuMZ['BattleSystemOTB'][_0x2b471b(0x315)][_0x2b471b(0x2ad)](this,_0x4d7a89);if(this[_0x2b471b(0x331)]()&&this['active']){if(_0x2b471b(0x4a4)!==_0x2b471b(0x3fb))this[_0x2b471b(0x367)]();else{if(this[_0x2b471b(0x248)]!==_0x1dc0d7)return this[_0x2b471b(0x248)];this[_0x2b471b(0x1ed)]=this[_0x2b471b(0x345)]()['length'];const _0x5e4e8a=this[_0x2b471b(0x345)](),_0x160668=_0x5e4e8a[_0x2b471b(0x224)]((_0x49ed34,_0x5cd9fe)=>_0x4966fd[_0x2b471b(0x391)]()<_0x5cd9fe?_0x49ed34+0x1:_0x49ed34,0x1);return this[_0x2b471b(0x248)]=_0x160668,this['_cache_makeActionTimesOTB'];}}},Window_Selectable[_0x3f8e58(0x3ca)][_0x3f8e58(0x367)]=function(){const _0x4c53e1=_0x3f8e58;BattleManager[_0x4c53e1(0x20a)]();},VisuMZ[_0x3f8e58(0x368)][_0x3f8e58(0x3ac)]=Window_Help[_0x3f8e58(0x3ca)][_0x3f8e58(0x32b)],Window_Help[_0x3f8e58(0x3ca)][_0x3f8e58(0x32b)]=function(_0x2aa434){const _0x3f9e86=_0x3f8e58;if(BattleManager[_0x3f9e86(0x25f)]()&&_0x2aa434&&_0x2aa434['note']&&_0x2aa434[_0x3f9e86(0x29a)][_0x3f9e86(0x37c)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)){if(_0x3f9e86(0x485)===_0x3f9e86(0x485))this[_0x3f9e86(0x3d1)](String(RegExp['$1']));else{if(!_0x1f9d2c)return;const _0x302f75=_0x268cdf['makeActionTimes']();_0x293d12['makeActions']();if(!this[_0x3f9e86(0x1dd)][_0x3f9e86(0x1f3)](_0xc30f59)){const _0x3c3a93=_0x164685[_0x3f9e86(0x3c1)](0x0,_0x302f75-(_0x5456c5[_0x3f9e86(0x3e6)]||0x0));this[_0x3f9e86(0x446)](_0x105bc1,_0x3c3a93,this[_0x3f9e86(0x1dd)]);}if(!this['_otb_actionBattlersNext'][_0x3f9e86(0x1f3)](_0x590def)){const _0x201674=_0x302f75;this['otbAddBattlerToTurnOrderAtEnd'](_0x5bdec5,_0x201674,this['_otb_actionBattlersNext']);}}}else VisuMZ[_0x3f9e86(0x368)][_0x3f9e86(0x3ac)][_0x3f9e86(0x2ad)](this,_0x2aa434);},Window_ActorCommand[_0x3f8e58(0x3ca)][_0x3f8e58(0x331)]=function(){const _0x10515a=_0x3f8e58;return BattleManager[_0x10515a(0x25f)]();},Window_ActorCommand[_0x3f8e58(0x3ca)][_0x3f8e58(0x367)]=function(){const _0x54369d=_0x3f8e58,_0x26c4ec=BattleManager[_0x54369d(0x364)]();if(_0x26c4ec){if(_0x54369d(0x40b)!==_0x54369d(0x2ff)){const _0x4257d3=this['currentSymbol']();switch(_0x4257d3){case _0x54369d(0x45c):_0x26c4ec[_0x54369d(0x2a3)]();break;case'guard':_0x26c4ec['setGuard']();break;case'singleSkill':_0x26c4ec[_0x54369d(0x29f)](this[_0x54369d(0x28a)]());break;default:_0x26c4ec[_0x54369d(0x29f)](null);break;}}else this[_0x54369d(0x369)](_0x5d76c3,_0x1c3ba2,_0x4f7d89),_0x2dc8c1[_0x54369d(0x3ca)][_0x54369d(0x429)][_0x54369d(0x2ad)](this),this[_0x54369d(0x431)]=0x0,this['createChildren'](),this['checkOpacity']();}Window_Command[_0x54369d(0x3ca)]['applyBattleItemWindowOTB'][_0x54369d(0x2ad)](this);},Window_BattleSkill['prototype']['isBattleItemWindowOTB']=function(){const _0xa2870d=_0x3f8e58;return BattleManager[_0xa2870d(0x25f)]();},Window_BattleSkill[_0x3f8e58(0x3ca)]['applyBattleItemWindowOTB']=function(){const _0x412201=_0x3f8e58,_0x1440db=this[_0x412201(0x3e1)](),_0x166b95=BattleManager[_0x412201(0x364)]();if(_0x166b95)_0x166b95['setSkill'](_0x1440db?_0x1440db['id']:null);Window_SkillList[_0x412201(0x3ca)][_0x412201(0x367)][_0x412201(0x2ad)](this);},Window_BattleItem['prototype']['isBattleItemWindowOTB']=function(){return BattleManager['isOTB']();},Window_BattleItem[_0x3f8e58(0x3ca)][_0x3f8e58(0x367)]=function(){const _0xce00ce=_0x3f8e58,_0x355cd5=this[_0xce00ce(0x3e1)](),_0x269d74=BattleManager['inputtingAction']();if(_0x269d74)_0x269d74[_0xce00ce(0x32b)](_0x355cd5?_0x355cd5['id']:null);Window_ItemList[_0xce00ce(0x3ca)][_0xce00ce(0x367)]['call'](this);},Window_BattleActor[_0x3f8e58(0x3ca)][_0x3f8e58(0x331)]=function(){const _0x9e84c6=_0x3f8e58;return BattleManager[_0x9e84c6(0x25f)]();},Window_BattleEnemy[_0x3f8e58(0x3ca)][_0x3f8e58(0x331)]=function(){const _0x1f27eb=_0x3f8e58;return BattleManager[_0x1f27eb(0x25f)]();};function Window_OTB_TurnOrder(){const _0x4870fc=_0x3f8e58;this[_0x4870fc(0x429)](...arguments);}Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]=Object[_0x3f8e58(0x273)](Window_Base['prototype']),Window_OTB_TurnOrder['prototype'][_0x3f8e58(0x3cb)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder['Settings']=VisuMZ['BattleSystemOTB'][_0x3f8e58(0x265)]['TurnOrder'],Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['initialize']=function(){const _0xf96ec4=_0x3f8e58,_0x55ad7f=this[_0xf96ec4(0x3fc)]();this['initHomePositions'](_0x55ad7f),Window_Base[_0xf96ec4(0x3ca)][_0xf96ec4(0x429)]['call'](this,_0x55ad7f),this['opacity']=0x0,this[_0xf96ec4(0x2c9)](),this[_0xf96ec4(0x428)](),this[_0xf96ec4(0x1e5)](),this[_0xf96ec4(0x36e)]();},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x3fc)]=function(){const _0x3c55f5=_0x3f8e58,_0x45307f=Window_OTB_TurnOrder[_0x3c55f5(0x265)],_0xcd7fca=SceneManager[_0x3c55f5(0x1f5)][_0x3c55f5(0x2ab)][_0x3c55f5(0x493)];let _0x580d9a=Graphics['width']-_0x45307f[_0x3c55f5(0x33a)]*0x2,_0x29fc38=_0x45307f[_0x3c55f5(0x45a)]+this[_0x3c55f5(0x212)](),_0x1b74e7=_0x45307f[_0x3c55f5(0x33a)],_0x560d9c=0x0;switch(_0x45307f[_0x3c55f5(0x349)]){case _0x3c55f5(0x280):_0x560d9c=Graphics['height']-_0xcd7fca-_0x45307f['ScreenBuffer']-_0x29fc38;break;default:_0x560d9c=_0x45307f[_0x3c55f5(0x33a)];break;}if(Imported[_0x3c55f5(0x44b)]&&BattleManager[_0x3c55f5(0x3d8)]()){if(_0x3c55f5(0x287)===_0x3c55f5(0x287)){const _0x96abc4=VisuMZ[_0x3c55f5(0x3f7)]['Settings'][_0x3c55f5(0x2cf)];_0x580d9a-=_0x96abc4[_0x3c55f5(0x247)]+_0x96abc4[_0x3c55f5(0x205)],_0x580d9a-=_0x45307f['ScreenBuffer'];}else{if(!this['_subject'])return;this[_0x3c55f5(0x22a)](this[_0x3c55f5(0x424)]);}}return _0x1b74e7+=_0x45307f[_0x3c55f5(0x4a2)]||0x0,_0x560d9c+=_0x45307f[_0x3c55f5(0x3e8)]||0x0,new Rectangle(_0x1b74e7,_0x560d9c,_0x580d9a,_0x29fc38);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x209)]=function(_0x27111e){const _0x24dbca=_0x3f8e58;this[_0x24dbca(0x44c)]=this['_homeX']=_0x27111e['x'],this[_0x24dbca(0x33d)]=this[_0x24dbca(0x207)]=_0x27111e['y'],this[_0x24dbca(0x29e)]=0x0;const _0x4a6951=Window_OTB_TurnOrder['Settings'];this[_0x24dbca(0x3fa)]=Math[_0x24dbca(0x1e1)]((_0x27111e['width']-_0x4a6951[_0x24dbca(0x463)]-_0x4a6951[_0x24dbca(0x372)]*0x2)/0x2),_0x4a6951['OrderDirection']?(this['_subjectX']=_0x27111e['width']-_0x4a6951[_0x24dbca(0x463)],this[_0x24dbca(0x45b)]=this[_0x24dbca(0x3fa)]+_0x4a6951[_0x24dbca(0x372)],this['_nextX']=0x0):_0x24dbca(0x2fe)===_0x24dbca(0x275)?_0x1b081e['BattleSystemOTB'][_0x24dbca(0x49e)][_0x24dbca(0x2ad)](this):(this[_0x24dbca(0x337)]=0x0,this[_0x24dbca(0x45b)]=_0x4a6951[_0x24dbca(0x463)]+_0x4a6951['SubjectDistance'],this[_0x24dbca(0x448)]=this[_0x24dbca(0x45b)]+_0x4a6951['SubjectDistance']+this[_0x24dbca(0x3fa)]);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x3ee)]=function(){const _0xc0ad8c=_0x3f8e58;this[_0xc0ad8c(0x322)]=0x0;},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x2c9)]=function(){const _0x16c292=_0x3f8e58,_0x4516c5=Window_OTB_TurnOrder[_0x16c292(0x265)];if(_0x4516c5['BgDimStyle']==='transparent')return;if(_0x4516c5[_0x16c292(0x1fc)]===_0x16c292(0x41b)&&_0x4516c5[_0x16c292(0x38d)]!==''){if(_0x16c292(0x461)==='YVJuh')return _0x12d52e[_0x16c292(0x368)][_0x16c292(0x2be)][_0x16c292(0x2ad)](this);else{const _0x1061a7=ImageManager['loadSystem'](_0x4516c5[_0x16c292(0x38d)]);_0x1061a7[_0x16c292(0x403)](this[_0x16c292(0x434)][_0x16c292(0x2ea)](this,_0x1061a7));return;}};const _0x4a2837=this['contentsBack'],_0x57fcd4=ColorManager['dimColor1'](),_0x615292=ColorManager['dimColor2'](),_0x4fe2e8=this[_0x16c292(0x337)],_0x568fd4=_0x4516c5[_0x16c292(0x463)],_0x44684d=0x0,_0x38cd71=_0x4516c5[_0x16c292(0x45a)],_0x450c71=this[_0x16c292(0x45b)],_0x46da80=this[_0x16c292(0x448)],_0x199608=this[_0x16c292(0x3fa)];switch(_0x4516c5['BgDimStyle']){case'gradient':if(_0x4516c5['OrderDirection']){if(_0x16c292(0x234)===_0x16c292(0x234))_0x4a2837[_0x16c292(0x307)](_0x4fe2e8,_0x44684d,_0x568fd4/0x2,_0x38cd71,_0x615292,_0x57fcd4,![]),_0x4a2837[_0x16c292(0x25b)](_0x4fe2e8+_0x568fd4/0x2,_0x44684d,_0x568fd4/0x2,_0x38cd71,_0x57fcd4),_0x4a2837[_0x16c292(0x307)](_0x450c71,_0x44684d,_0x199608/0x2,_0x38cd71,_0x615292,_0x57fcd4,![]),_0x4a2837[_0x16c292(0x25b)](_0x450c71+_0x199608/0x2,_0x44684d,_0x199608/0x2,_0x38cd71,_0x57fcd4),_0x4a2837[_0x16c292(0x307)](_0x46da80,_0x44684d,_0x199608/0x2,_0x38cd71,_0x615292,_0x57fcd4,![]),_0x4a2837[_0x16c292(0x25b)](_0x46da80+_0x199608/0x2,_0x44684d,_0x199608/0x2,_0x38cd71,_0x57fcd4);else{if(!_0xbff00)return![];const _0x383a9a=_0x29ccda['makeDeepCopy'](_0x25e357);return _0x383a9a[_0x16c292(0x1e0)]=!![],_0x383a9a[_0x16c292(0x240)]=!![],_0x383a9a['updateStateTurns'](),_0x383a9a[_0x16c292(0x444)](0x1),_0x383a9a[_0x16c292(0x444)](0x2),_0x383a9a[_0x16c292(0x388)](),_0x158e32[_0x16c292(0x368)]['ActionBattlersFilter'](_0x383a9a);}}else _0x4a2837[_0x16c292(0x25b)](_0x4fe2e8,_0x44684d,_0x568fd4/0x2,_0x38cd71,_0x57fcd4),_0x4a2837[_0x16c292(0x307)](_0x4fe2e8+_0x568fd4/0x2,_0x44684d,_0x568fd4/0x2,_0x38cd71,_0x57fcd4,_0x615292,![]),_0x4a2837[_0x16c292(0x25b)](_0x450c71,_0x44684d,_0x199608/0x2,_0x38cd71,_0x57fcd4),_0x4a2837['gradientFillRect'](_0x450c71+_0x199608/0x2,_0x44684d,_0x199608/0x2,_0x38cd71,_0x57fcd4,_0x615292,![]),_0x4a2837[_0x16c292(0x25b)](_0x46da80,_0x44684d,_0x199608/0x2,_0x38cd71,_0x57fcd4),_0x4a2837[_0x16c292(0x307)](_0x46da80+_0x199608/0x2,_0x44684d,_0x199608/0x2,_0x38cd71,_0x57fcd4,_0x615292,![]);break;default:_0x4a2837[_0x16c292(0x25b)](_0x4fe2e8,_0x44684d,_0x568fd4,_0x38cd71,_0x57fcd4),_0x4a2837[_0x16c292(0x25b)](_0x450c71,_0x44684d,_0x199608,_0x38cd71,_0x57fcd4),_0x4a2837[_0x16c292(0x25b)](_0x46da80,_0x44684d,_0x199608,_0x38cd71,_0x57fcd4);break;}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x434)]=function(_0x14891a){const _0x2ad549=_0x3f8e58;this[_0x2ad549(0x2f4)]=new Sprite(),this[_0x2ad549(0x2f4)]['bitmap']=_0x14891a,this[_0x2ad549(0x2b0)](this[_0x2ad549(0x2f4)]);const _0x9ab0d2=Window_OTB_TurnOrder[_0x2ad549(0x265)];this['_bgImageSprite']['x']=_0x9ab0d2[_0x2ad549(0x36b)],this[_0x2ad549(0x2f4)]['y']=_0x9ab0d2[_0x2ad549(0x2cb)];},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x428)]=function(){const _0x56b2e7=_0x3f8e58;this[_0x56b2e7(0x302)][_0x56b2e7(0x31c)](),this[_0x56b2e7(0x1f1)]();const _0x275321=Window_OTB_TurnOrder[_0x56b2e7(0x265)];this['contents'][_0x56b2e7(0x348)]=_0x275321[_0x56b2e7(0x2ec)];let _0x54c6cb=_0x275321['UiAlignment'];if(_0x54c6cb===_0x56b2e7(0x23a)){if(_0x56b2e7(0x263)!==_0x56b2e7(0x263))return 0x0;else _0x54c6cb=_0x275321['OrderDirection']?_0x56b2e7(0x3e3):_0x56b2e7(0x2a8);}let _0x376692=_0x275321[_0x56b2e7(0x45a)];if(_0x275321[_0x56b2e7(0x3f6)]!==''){if(_0x56b2e7(0x3d3)!==_0x56b2e7(0x359)){const _0x21f6ef=this[_0x56b2e7(0x337)]+_0x275321[_0x56b2e7(0x3db)],_0x4767bf=_0x376692+_0x275321[_0x56b2e7(0x2e0)],_0x19ec36=_0x275321[_0x56b2e7(0x463)];this[_0x56b2e7(0x35c)](_0x275321[_0x56b2e7(0x3f6)],_0x21f6ef,_0x4767bf,_0x19ec36,_0x56b2e7(0x20d));}else this['_otbTurnOrderWindow']['resumeTurnOrderSprites']();}if(_0x275321[_0x56b2e7(0x49f)]!==''){if('LtsRE'===_0x56b2e7(0x3a8))_0x45d73a['addBattlerToTurnOrderAtStart'](_0x4960f0,_0x54ec77);else{const _0x236553=this[_0x56b2e7(0x45b)]+_0x275321['UiCurrentOffsetX'],_0x4eb97d=_0x376692+_0x275321['UiCurrentOffsetY'],_0x6e2eae=this['_spriteGroupWidth'];this[_0x56b2e7(0x35c)](_0x275321['UiCurrentText'],_0x236553,_0x4eb97d,_0x6e2eae,_0x54c6cb);}}if(_0x275321['UiNextText']!==''){if(_0x56b2e7(0x358)===_0x56b2e7(0x358)){const _0x553b3e=this[_0x56b2e7(0x448)]+_0x275321[_0x56b2e7(0x3aa)],_0x824910=_0x376692+_0x275321[_0x56b2e7(0x2bf)],_0x31e329=this[_0x56b2e7(0x3fa)];this[_0x56b2e7(0x35c)](_0x275321['UiNextText'],_0x553b3e,_0x824910,_0x31e329,_0x54c6cb);}else _0x869190['BattleSystemOTB'][_0x56b2e7(0x30d)][_0x56b2e7(0x2ad)](this),this[_0x56b2e7(0x3c3)]();}},Window_OTB_TurnOrder['prototype'][_0x3f8e58(0x1e5)]=function(){const _0x5efe87=_0x3f8e58,_0x325293=Window_OTB_TurnOrder[_0x5efe87(0x265)];this['_spriteContainer']=new Sprite(),this['addChild'](this[_0x5efe87(0x276)]),this[_0x5efe87(0x424)]=null,this[_0x5efe87(0x45d)]=[],this['_nextTurn']=[],this[_0x5efe87(0x3c2)]=new Sprite(),this[_0x5efe87(0x3c2)]['x']=_0x325293[_0x5efe87(0x1e6)],this[_0x5efe87(0x3c2)]['y']=_0x325293['PreviewOffsetY'],this['_previewContainer']['x']-=Math[_0x5efe87(0x1e1)](_0x325293[_0x5efe87(0x463)]*0.5*_0x325293[_0x5efe87(0x3ea)]),_0x325293[_0x5efe87(0x2f3)]&&(this[_0x5efe87(0x3c2)]['x']+=_0x325293[_0x5efe87(0x463)]),this[_0x5efe87(0x3c2)]['y']-=Math[_0x5efe87(0x1e1)](_0x325293[_0x5efe87(0x45a)]*0.5*_0x325293[_0x5efe87(0x3ea)]),this[_0x5efe87(0x33e)](this[_0x5efe87(0x3c2)]),this[_0x5efe87(0x484)]=[],this[_0x5efe87(0x356)]=[];},Window_OTB_TurnOrder['prototype']['update']=function(){const _0x200e6f=_0x3f8e58;Window_Base['prototype'][_0x200e6f(0x26c)]['call'](this),this[_0x200e6f(0x3e2)](),this[_0x200e6f(0x34c)](),this[_0x200e6f(0x36e)](),this[_0x200e6f(0x267)]();},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x286)]=function(){this['_requestTurnOrderUpdate']=!![];},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x3e2)]=function(){const _0x1295f4=_0x3f8e58;if(!this['_requestTurnOrderUpdate'])return;this[_0x1295f4(0x2c2)]=![];for(const _0x43ecad of this[_0x1295f4(0x45d)]){if(_0x1295f4(0x432)!=='LVagT'){if(!_0x43ecad)continue;_0x43ecad[_0x1295f4(0x2f8)]();}else return _0x1295f4(0x328);}for(const _0x20d2df of this[_0x1295f4(0x40d)]){if(!_0x20d2df)continue;_0x20d2df[_0x1295f4(0x2f8)]();}},Window_OTB_TurnOrder['prototype']['updatePosition']=function(){const _0x1f9604=_0x3f8e58,_0x1c27bf=Window_OTB_TurnOrder[_0x1f9604(0x265)];if(_0x1c27bf[_0x1f9604(0x349)]!=='top')return;if(!_0x1c27bf[_0x1f9604(0x31d)])return;const _0x44b890=SceneManager[_0x1f9604(0x1f5)][_0x1f9604(0x236)];if(!_0x44b890)return;_0x44b890[_0x1f9604(0x22e)]?_0x1f9604(0x2cd)==='mnqxe'?(this['x']=this['_homeX']+(_0x1c27bf[_0x1f9604(0x3bd)]||0x0),this['y']=this[_0x1f9604(0x207)]+(_0x1c27bf[_0x1f9604(0x3fe)]||0x0)):this[_0x1f9604(0x3f4)]=this[_0x1f9604(0x277)]():(this['x']=this[_0x1f9604(0x46c)],this['y']=this[_0x1f9604(0x207)]);const _0x2c9bc5=SceneManager[_0x1f9604(0x1f5)][_0x1f9604(0x279)];Window_OTB_TurnOrder[_0x1f9604(0x2af)]===undefined&&(_0x1f9604(0x413)!=='dnAfs'?Window_OTB_TurnOrder[_0x1f9604(0x2af)]=Math[_0x1f9604(0x4a5)]((Graphics['width']-Math[_0x1f9604(0x49a)](Graphics[_0x1f9604(0x317)],_0x2c9bc5[_0x1f9604(0x226)]))/0x2):(this[_0x1f9604(0x424)]=this[_0x1f9604(0x45d)][_0x5afbdd],this[_0x1f9604(0x45d)][_0x341a8e][_0x1f9604(0x2f8)](),this['_currentTurn'][_0x1f9604(0x28d)](_0x21a78a,0x1)));Window_OTB_TurnOrder['_ogWindowLayerY']===undefined&&(Window_OTB_TurnOrder[_0x1f9604(0x3d7)]=Math[_0x1f9604(0x4a5)]((Graphics[_0x1f9604(0x493)]-Math[_0x1f9604(0x49a)](Graphics['boxHeight'],_0x2c9bc5['height']))/0x2));;this['x']+=_0x2c9bc5['x']-Window_OTB_TurnOrder[_0x1f9604(0x2af)],this['y']+=_0x2c9bc5['y']-Window_OTB_TurnOrder[_0x1f9604(0x3d7)];},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['updateVisibility']=function(){const _0x5dbaf5=_0x3f8e58;this[_0x5dbaf5(0x22e)]=$gameSystem[_0x5dbaf5(0x362)]();if(BattleManager['_phase']===_0x5dbaf5(0x24c)){if(_0x5dbaf5(0x40c)!==_0x5dbaf5(0x427)){if(!this[_0x5dbaf5(0x2a4)]){if(_0x5dbaf5(0x456)!==_0x5dbaf5(0x2c5)){const _0x3f65f1=Window_OTB_TurnOrder[_0x5dbaf5(0x265)];this['_fadeSpeed']=Math[_0x5dbaf5(0x1e1)](0xff/(_0x3f65f1['UpdateFrames']||0x1));}else{let _0x2c1fc7=_0x33dcb8['length'];while(_0x2c1fc7--){this[_0x5dbaf5(0x424)][_0x5dbaf5(0x442)][_0x5dbaf5(0x2bd)]();}this[_0x5dbaf5(0x424)][_0x5dbaf5(0x442)]=_0x266060[_0x5dbaf5(0x462)](this[_0x5dbaf5(0x424)]['_actions']);}}this[_0x5dbaf5(0x431)]-=this['_fadeSpeed'],this[_0x5dbaf5(0x27a)]-=this[_0x5dbaf5(0x2a4)],this[_0x5dbaf5(0x3b9)][_0x5dbaf5(0x431)]-=this[_0x5dbaf5(0x2a4)];}else{if(!_0x485463[_0x5dbaf5(0x265)][_0x5dbaf5(0x40f)])return;const _0x2fe2df=_0x3913ad[_0x5dbaf5(0x265)],_0x51894f=this[_0x5dbaf5(0x3d4)](),_0x51ddbe=_0x5dbaf5(0x495)[_0x5dbaf5(0x438)](_0x51894f),_0x4d783e=new _0x4ca6ba();_0x4d783e[_0x5dbaf5(0x26e)]['x']=this[_0x5dbaf5(0x26e)]['x'],_0x4d783e[_0x5dbaf5(0x26e)]['y']=this['anchor']['y'];if(_0x2fe2df[_0x51ddbe])_0x4d783e['bitmap']=_0x278b47[_0x5dbaf5(0x3eb)](_0x2fe2df[_0x51ddbe]);else{let _0x3e5a47=this['bitmapWidth'](),_0x31eb21=this['bitmapHeight'](),_0x308409=this['getBorderThickness']();_0x4d783e[_0x5dbaf5(0x2f5)]=new _0xd8f851(_0x3e5a47,_0x31eb21);const _0x57b01e=_0x5dbaf5(0x257),_0x14b72f=_0x5bebb1['getColor'](_0x2fe2df[_0x5dbaf5(0x250)['format'](_0x51894f)]);_0x4d783e[_0x5dbaf5(0x2f5)]['fillRect'](0x0,0x0,_0x3e5a47,_0x31eb21,_0x57b01e),_0x3e5a47-=0x2,_0x31eb21-=0x2,_0x4d783e[_0x5dbaf5(0x2f5)][_0x5dbaf5(0x25b)](0x1,0x1,_0x3e5a47,_0x31eb21,_0x14b72f),_0x3e5a47-=_0x308409*0x2,_0x31eb21-=_0x308409*0x2,_0x4d783e[_0x5dbaf5(0x2f5)]['fillRect'](0x1+_0x308409,0x1+_0x308409,_0x3e5a47,_0x31eb21,_0x57b01e),_0x3e5a47-=0x2,_0x31eb21-=0x2,_0x308409+=0x1,_0x4d783e[_0x5dbaf5(0x2f5)][_0x5dbaf5(0x44e)](0x1+_0x308409,0x1+_0x308409,_0x3e5a47,_0x31eb21);}this[_0x5dbaf5(0x2e8)]=_0x4d783e,this[_0x5dbaf5(0x33e)](this[_0x5dbaf5(0x2e8)]);}}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x267)]=function(){const _0x40ecd2=_0x3f8e58;if(!this[_0x40ecd2(0x276)])return;const _0x5a583c=Window_OTB_TurnOrder[_0x40ecd2(0x265)],_0xda0888=_0x5a583c[_0x40ecd2(0x2f3)];_0xda0888?this[_0x40ecd2(0x276)][_0x40ecd2(0x22f)][_0x40ecd2(0x332)]((_0x4f1f76,_0x1356cb)=>_0x4f1f76['x']-_0x1356cb['x']):this['_spriteContainer'][_0x40ecd2(0x22f)][_0x40ecd2(0x332)]((_0x286651,_0x22588e)=>_0x22588e['x']-_0x286651['x']);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['removeSprite']=function(_0x4c4dc2){const _0x61760f=_0x3f8e58;if(!_0x4c4dc2)return;_0x4c4dc2['_sourceArray']&&_0x4c4dc2[_0x61760f(0x374)][_0x61760f(0x418)](_0x4c4dc2);const _0x3649b7=Window_OTB_TurnOrder[_0x61760f(0x265)],_0x5b5fe0=0x3e8/0x3c*_0x3649b7[_0x61760f(0x435)]+0x1f4;_0x4c4dc2['startFade'](0x0),setTimeout(this[_0x61760f(0x363)][_0x61760f(0x2ea)](this,_0x4c4dc2),_0x5b5fe0);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x363)]=function(_0x6b6fc6){const _0x2a5b37=_0x3f8e58;_0x6b6fc6[_0x2a5b37(0x374)]&&_0x6b6fc6[_0x2a5b37(0x374)][_0x2a5b37(0x418)](_0x6b6fc6),this[_0x2a5b37(0x276)][_0x2a5b37(0x2ee)](_0x6b6fc6),this[_0x2a5b37(0x3c2)][_0x2a5b37(0x2ee)](_0x6b6fc6);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['removeCurrentSubject']=function(){const _0x18ad6b=_0x3f8e58;if(!this['_subject'])return;this[_0x18ad6b(0x22a)](this[_0x18ad6b(0x424)]);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x36d)]=function(){const _0x4908e7=_0x3f8e58;while(this['_currentTurn'][_0x4908e7(0x376)]){const _0xdb4f0=this[_0x4908e7(0x45d)][_0x4908e7(0x3ef)]();_0xdb4f0[_0x4908e7(0x30b)](0x0);}while(this['_nextTurn'][_0x4908e7(0x376)]){if(_0x4908e7(0x2d9)!=='SDoeL'){const _0x2c83ba=this[_0x4908e7(0x2d5)],_0x7aff77=this[_0x4908e7(0x245)](),_0x4a91dd=this[_0x4908e7(0x415)]();this[_0x4908e7(0x2d0)][_0x4908e7(0x2f5)]=new _0x272a34(_0x7aff77,_0x4a91dd);const _0x26c4f4=this[_0x4908e7(0x2d0)][_0x4908e7(0x2f5)],_0x28648c=_0x39ecf0[_0x4908e7(0x206)],_0x572cb0=_0x5277b8[_0x4908e7(0x33f)],_0x380ec2=_0x1a3fe4[_0x4908e7(0x49a)](_0x28648c,_0x572cb0,_0x7aff77,_0x4a91dd),_0x402417=_0x2c83ba%0x10*_0x28648c,_0x38f212=_0x108ab5[_0x4908e7(0x2b5)](_0x2c83ba/0x10)*_0x572cb0,_0x40fefc=_0x1ce4c6[_0x4908e7(0x2b5)](_0x3fa3b5[_0x4908e7(0x3c1)](_0x7aff77-_0x380ec2,0x0)/0x2),_0x2b87fa=_0x52cd88[_0x4908e7(0x2b5)](_0x3803fb['max'](_0x4a91dd-_0x380ec2,0x0)/0x2);_0x26c4f4[_0x4908e7(0x47b)](_0x431892,_0x402417,_0x38f212,_0x28648c,_0x572cb0,_0x40fefc,_0x2b87fa,_0x380ec2,_0x380ec2);}else{const _0x1c70f3=this['_nextTurn'][_0x4908e7(0x3ef)]();if(!_0x1c70f3)continue;this[_0x4908e7(0x45d)][_0x4908e7(0x46f)](_0x1c70f3);}}for(const _0x5cede3 of this[_0x4908e7(0x45d)]){if(!_0x5cede3)continue;_0x5cede3[_0x4908e7(0x3f5)](this['_currentTurn']);}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x36c)]=function(_0xc5bc7b,_0x4af9f8){const _0x22f775=_0x3f8e58,_0x4a6316=_0xc5bc7b===BattleManager['_actionBattlers']?this[_0x22f775(0x45d)]:this[_0x22f775(0x40d)],_0x25a165={};for(const _0x5cf6b2 of _0xc5bc7b){if('qKseE'===_0x22f775(0x26d))return this[_0x22f775(0x3cf)]();else{const _0x2a3f8f='%1-%2'[_0x22f775(0x438)](_0x5cf6b2[_0x22f775(0x26f)]()?_0x22f775(0x2df):'enemy',_0x5cf6b2['index']());_0x25a165[_0x2a3f8f]=_0x25a165[_0x2a3f8f]||0x0;const _0x1b070c=_0x25a165[_0x2a3f8f]++,_0x1f141c=new Sprite_OTB_TurnOrder_Battler(_0x5cf6b2,_0x1b070c,_0x4a6316);this['_spriteContainer'][_0x22f775(0x33e)](_0x1f141c),_0x4a6316[_0x22f775(0x46f)](_0x1f141c);}}for(const _0x5dbb21 of _0x4a6316){if(_0x22f775(0x30a)!==_0x22f775(0x30a)){const _0x5700f4=![],_0x4b7212=_0x50ce8d(_0xa06166['$1'])||0x0;this[_0x22f775(0x227)]()[_0x22f775(0x36f)](_0x4b7212,_0x5700f4);}else{if(!_0x5dbb21)continue;_0x5dbb21[_0x22f775(0x30b)](0xff),_0x5dbb21[_0x22f775(0x2f8)](),_0x4af9f8&&(_0x5dbb21[_0x22f775(0x431)]=0xff,_0x5dbb21['x']=_0x5dbb21['_positionTargetX'],_0x5dbb21[_0x22f775(0x2aa)]=0x0);}}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x449)]=function(){const _0x56ade2=_0x3f8e58,_0x35d83b=BattleManager[_0x56ade2(0x3b5)];this[_0x56ade2(0x36c)](_0x35d83b);},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x278)]=function(_0x3543dc,_0x51a6f5){const _0x2236e8=_0x3f8e58;this[_0x2236e8(0x392)]();for(const _0xf8e2dc of this[_0x2236e8(0x45d)]){if(_0x2236e8(0x2b4)===_0x2236e8(0x39e)){if(!this[_0x2236e8(0x25f)]())return;this[_0x2236e8(0x2eb)]();this['_subject']&&(this[_0x2236e8(0x21c)](this[_0x2236e8(0x424)]),this[_0x2236e8(0x424)]=null);this['_forcedBattlers'][_0x2236e8(0x376)]>0x0&&(this[_0x2236e8(0x424)]=this[_0x2236e8(0x399)]());;}else{if(!_0xf8e2dc)continue;_0xf8e2dc[_0x2236e8(0x2e5)]()===_0x3543dc&&(_0xf8e2dc[_0x2236e8(0x437)]=_0xf8e2dc[_0x2236e8(0x437)]||0x0,_0xf8e2dc['_instance']--);}}const _0x2cfab9=this[_0x2236e8(0x45d)][_0x2236e8(0x42a)](_0x35d4dd=>_0x35d4dd['battler']()===_0x3543dc);if(this[_0x2236e8(0x45d)][_0x2cfab9])'ahluO'!==_0x2236e8(0x251)?(this[_0x2236e8(0x424)]=this[_0x2236e8(0x45d)][_0x2cfab9],this[_0x2236e8(0x45d)][_0x2cfab9][_0x2236e8(0x2f8)](),this[_0x2236e8(0x45d)][_0x2236e8(0x28d)](_0x2cfab9,0x1)):_0x3771f7[_0x2236e8(0x249)](this);else{if(_0x3543dc){const _0xc56761=new Sprite_OTB_TurnOrder_Battler(_0x3543dc,-0x1,null);this['_spriteContainer'][_0x2236e8(0x33e)](_0xc56761),this['_subject']=_0xc56761,_0xc56761['startFade'](0xff),_0xc56761[_0x2236e8(0x2aa)]=0x258,_0xc56761['x']=this['_subjectX'],_0xc56761[_0x2236e8(0x3b8)]=this['_subjectX'],_0x51a6f5&&(_0xc56761['opacity']=0xff);}}for(const _0x57c910 of this['_currentTurn']){if(_0x2236e8(0x33c)!==_0x2236e8(0x441)){if(!_0x57c910)continue;_0x57c910[_0x2236e8(0x2f8)]();}else this[_0x2236e8(0x1dd)]=this['_actionBattlers'][_0x2236e8(0x2f6)](_0x1b0610=>!_0x1b0610[_0x2236e8(0x26f)]());}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x41f)]=function(){const _0x3d2d98=_0x3f8e58;for(const _0x3c5cf5 of this[_0x3d2d98(0x45d)]){if(!_0x3c5cf5)continue;const _0x4f0b8b=_0x3c5cf5[_0x3d2d98(0x2e5)]();if(BattleManager[_0x3d2d98(0x1dd)][_0x3d2d98(0x1f3)](_0x4f0b8b))continue;this['removeSprite'](_0x3c5cf5);}for(const _0x16be94 of this['_nextTurn']){if(!_0x16be94)continue;const _0x609d33=_0x16be94[_0x3d2d98(0x2e5)]();if(BattleManager[_0x3d2d98(0x3b5)][_0x3d2d98(0x1f3)](_0x609d33))continue;this[_0x3d2d98(0x22a)](_0x16be94);}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['addBattlerToTurnOrderAtEnd']=function(_0x3e35fe,_0x422243){const _0x1e65bc=_0x3f8e58,_0xaadee=_0x422243===BattleManager[_0x1e65bc(0x1dd)]?this[_0x1e65bc(0x45d)]:this[_0x1e65bc(0x40d)];if(!_0xaadee)return;const _0x2d6cde=VisuMZ[_0x1e65bc(0x368)]['GetAllIndicies'](_0x3e35fe,_0x422243),_0x4564dd=_0x2d6cde[_0x1e65bc(0x376)]-0x1,_0x52471f=new Sprite_OTB_TurnOrder_Battler(_0x3e35fe,_0x4564dd,_0xaadee);this[_0x1e65bc(0x276)][_0x1e65bc(0x33e)](_0x52471f),_0xaadee[_0x1e65bc(0x46f)](_0x52471f),_0x52471f[_0x1e65bc(0x30b)](0xff),this[_0x1e65bc(0x286)]();},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['addBattlerToTurnOrderAtStart']=function(_0x16571a,_0x8700f6){const _0x41e836=_0x3f8e58,_0x291d72=_0x8700f6===BattleManager['_actionBattlers']?this[_0x41e836(0x45d)]:this[_0x41e836(0x40d)];if(!_0x291d72)return;for(const _0x3d5c55 of _0x291d72){if(!_0x3d5c55)continue;if(_0x3d5c55[_0x41e836(0x2e5)]()===_0x16571a){if(_0x41e836(0x20f)===_0x41e836(0x20f))_0x3d5c55[_0x41e836(0x437)]=_0x3d5c55['_instance']||0x0,_0x3d5c55[_0x41e836(0x437)]++;else{this['x']=this[_0x41e836(0x3b8)],this['y']=this[_0x41e836(0x22d)];if(this[_0x41e836(0x431)]<0xff&&!this[_0x41e836(0x30f)]&&this[_0x41e836(0x3b4)]<=0x0){const _0x40cece=this[_0x41e836(0x2e5)]();_0x40cece&&(this[_0x41e836(0x233)]=_0x40cece[_0x41e836(0x3a2)]()&&_0x40cece['isAppeared']()?0xff:0x0);}}}}const _0x1a3555=0x0,_0x36ddb4=new Sprite_OTB_TurnOrder_Battler(_0x16571a,_0x1a3555,_0x291d72);this[_0x41e836(0x276)]['addChild'](_0x36ddb4),_0x291d72['unshift'](_0x36ddb4),_0x36ddb4[_0x41e836(0x30b)](0xff),_0x36ddb4[_0x41e836(0x2aa)]=0x258,_0x36ddb4['x']=this['_subjectX'],this[_0x41e836(0x286)]();},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x2b9)]=function(_0x10d766,_0x25275e){const _0x33b17a=_0x3f8e58,_0x541155=this[_0x33b17a(0x45d)];if(!_0x541155)return;let _0x4246fd=0x0;for(let _0x3c0bf5=0x0;_0x3c0bf5<_0x25275e;_0x3c0bf5++){if('vusqx'===_0x33b17a(0x308))_0x4e27fa['_instance']=_0x28dee9[_0x33b17a(0x437)]||0x0,_0x456fd3[_0x33b17a(0x437)]++;else{const _0x529763=_0x541155[_0x3c0bf5];if(!_0x529763)continue;if(_0x529763[_0x33b17a(0x2e5)]()!==_0x10d766)continue;_0x4246fd=_0x529763['_instance']+0x1;}}for(let _0x4bb624=_0x25275e;_0x4bb624<_0x541155[_0x33b17a(0x376)];_0x4bb624++){const _0x11c23=_0x541155[_0x4bb624];if(!_0x11c23)continue;if(_0x11c23[_0x33b17a(0x2e5)]()!==_0x10d766)continue;_0x11c23[_0x33b17a(0x437)]=_0x11c23['_instance']||0x0,_0x11c23[_0x33b17a(0x437)]++;}const _0x3617a5=new Sprite_OTB_TurnOrder_Battler(_0x10d766,_0x4246fd,_0x541155);this[_0x33b17a(0x276)][_0x33b17a(0x33e)](_0x3617a5),_0x541155[_0x33b17a(0x28d)](_0x25275e,0x0,_0x3617a5),_0x3617a5[_0x33b17a(0x30b)](0xff),_0x3617a5[_0x33b17a(0x2aa)]=0x258,_0x3617a5['x']=this['_subjectX'],this['requestUpdateTurnOrders']();},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)]['resumeTurnOrderSprites']=function(){const _0x3b9066=_0x3f8e58;this[_0x3b9066(0x36c)](BattleManager[_0x3b9066(0x1dd)],!![]),this[_0x3b9066(0x36c)](BattleManager['_otb_actionBattlersNext'],!![]),this[_0x3b9066(0x278)](BattleManager['_subject'],!![]),this[_0x3b9066(0x267)]();},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x241)]=function(_0x5e5df4){const _0x5f46b0=_0x3f8e58;this['clearOrderPreview'](),_0x5e5df4&&_0x5e5df4[_0x5f46b0(0x3e1)]()!==null&&this['createOrderPreview'](_0x5e5df4);},Window_OTB_TurnOrder['prototype'][_0x3f8e58(0x237)]=function(){const _0x1ada9f=_0x3f8e58;for(const _0x2f59db of this[_0x1ada9f(0x3c2)][_0x1ada9f(0x22f)]){if(_0x1ada9f(0x327)===_0x1ada9f(0x327)){if(!_0x2f59db)continue;this[_0x1ada9f(0x22a)](_0x2f59db);}else this['createOrderPreviewSprite'](_0xba8b42,![],_0x1131ad);}},Window_OTB_TurnOrder[_0x3f8e58(0x3ca)][_0x3f8e58(0x1ee)]=function(_0x149a2a){const _0x77ce60=_0x3f8e58,_0x5b865d=_0x149a2a[_0x77ce60(0x227)](),_0x53242b=_0x149a2a['otbCalcUserCurrentOrderChange'](),_0x1c9d98=_0x149a2a[_0x77ce60(0x1f4)]();_0x53242b!==0x0&&('imyvI'!==_0x77ce60(0x294)?this[_0x77ce60(0x341)](_0x5b865d,![],_0x53242b):(_0x2cd482=this['x'],_0x1695a3=this['y'],this[_0x77ce60(0x30b)](0x0)));_0x1c9d98!==0x0&&this[_0x77ce60(0x341)](_0x5b865d,!![],_0x1c9d98);if(!_0x149a2a[_0x77ce60(0x481)]())return;const _0x1a1549=SceneManager['_scene'][_0x77ce60(0x255)],_0xe32ddb=SceneManager[_0x77ce60(0x1f5)]['_enemyWindow'];let _0x865415=null;if(_0x1a1549&&_0x1a1549[_0x77ce60(0x26b)])_0x77ce60(0x38c)!==_0x77ce60(0x397)?_0x865415=_0x1a1549[_0x77ce60(0x2df)](_0x1a1549['index']()):(this[_0x77ce60(0x30f)]=!![],this[_0x77ce60(0x30b)](0x0));else{if(_0xe32ddb&&_0xe32ddb['active']){if(_0x77ce60(0x360)===_0x77ce60(0x360))_0x865415=_0xe32ddb[_0x77ce60(0x2d6)]();else return this['_unit']===_0x2823a8?_0x77ce60(0x259):_0x77ce60(0x379);}}if(!_0x865415)return;const _0x527d5a=_0x149a2a[_0x77ce60(0x44d)](_0x865415),_0x430a3b=_0x149a2a[_0x77ce60(0x396)](_0x865415);_0x527d5a!==0x0&&(_0x77ce60(0x335)!==_0x77ce60(0x335)?(_0x2abe39['prototype'][_0x77ce60(0x26c)][_0x77ce60(0x2ad)](this),this['updatePosition'](),this[_0x77ce60(0x283)](),this[_0x77ce60(0x46b)](),this[_0x77ce60(0x3b0)](),this['updateGraphicHue'](),this[_0x77ce60(0x492)](),this[_0x77ce60(0x23e)]()):this[_0x77ce60(0x341)](_0x865415,![],_0x527d5a)),_0x430a3b!==0x0&&(_0x77ce60(0x4a1)==='HPgyK'?_0x3e326e+=_0x46ab34(_0x46a920['$1']):this[_0x77ce60(0x341)](_0x865415,!![],_0x430a3b));},Window_OTB_TurnOrder['prototype'][_0x3f8e58(0x341)]=function(_0x11134b,_0x46479a,_0x3a0d11){const _0x4445d0=_0x3f8e58;if(!_0x11134b)return;if(_0x3a0d11===0x0)return;const _0x41814d=_0x46479a?BattleManager[_0x4445d0(0x3b5)]:BattleManager[_0x4445d0(0x1dd)],_0x1c4343=VisuMZ[_0x4445d0(0x368)][_0x4445d0(0x49d)](_0x11134b,_0x41814d),_0x1f9cc4=_0x46479a?this['_nextTurn']:this[_0x4445d0(0x45d)],_0x53a1bb=_0x46479a?this['_previewNext']:this[_0x4445d0(0x484)];if(_0x1c4343['length']<=0x0)return;for(let _0x350e98=0x0;_0x350e98<_0x1c4343[_0x4445d0(0x376)];_0x350e98++){if('GZfvQ'!=='GZfvQ'){const _0x120aa8=_0x5e0889(_0x108356['$1']);_0x120aa8!==_0x17d21f[_0x2c3be7][_0x4445d0(0x414)]&&(_0x24851b('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4445d0(0x438)](_0x248440,_0x120aa8)),_0x48ab3f[_0x4445d0(0x382)]());}else{const _0x56969a=new Sprite_OTB_TurnOrder_Preview(_0x11134b,_0x350e98,_0x1f9cc4,_0x3a0d11);this[_0x4445d0(0x3c2)][_0x4445d0(0x33e)](_0x56969a),_0x53a1bb[_0x4445d0(0x46f)](_0x56969a),_0x56969a['calculateTargetPositions'](),_0x56969a[_0x4445d0(0x30b)](0xff);}}};