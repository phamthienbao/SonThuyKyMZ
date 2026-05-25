//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.12] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Count
 * 
 * Each team will have an allotted number of actions available for usage. This
 * amount is determined by the number of alive members they have available by
 * default multiplied by their action count base.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Base.
 * 
 * The action count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further action counts can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
 * 
 * ---
 * 
 * Turn Count for Enemies
 * 
 * Because the turn structure is changed, enemies will now have a different
 * turn count structure. Their turn count only raises when the enemy troops
 * have a turn instead of every battle turn. This means if an enemy skill page
 * has a Turn Count condition of 3, it'll mean when the enemy team has gotten
 * 3 turns, which will usually be around turn 6 for the whole battle.
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <FTB Show Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *     Maintain Same Actor?:
 *     - Requires Free Switching.
 *     - Maintain the same actor after an action or move onto the next
 *       available actor?
 * 
 *   Reset Index New Turns:
 *   - Resets the selected actor whenever a new turn starts?
 *   - Needs "Free Switching" to be off.
 * 
 *   Current Turn Revival Act?:
 *   - Allow revived actors to act the current turn they're revived?
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.12: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Mechanics > Current Turn Revival Act?:
 * **** Allow revived actors to act the current turn they're revived?
 * 
 * Version 1.11: December 14, 2023
 * * Bug Fixes!
 * ** Enemy skills with Turn Count conditions will now apply a local turn count
 *    instead of the battle turn count. Fix made by Olivia.
 * * Documentation Update!
 * ** Updated "Major Changes" section:
 * *** Turn Count for Enemies
 * **** Because the turn structure is changed, enemies will now have a
 *      different turn count structure. Their turn count only raises when the
 *      enemy troops have a turn instead of every battle turn. This means if an
 *      enemy skill page has a Turn Count condition of 3, it'll mean when the
 *      enemy team has gotten 3 turns, which will usually be around turn 6 for
 *      the whole battle.
 * 
 * Version 1.10: October 20, 2022
 * * Bug Fixes!
 * ** Fixed problem with the Action Count Display's Actor Offset Y not working
 *    properly. Fix made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where Force Actions do not work when there's only one action
 *    left for the turn. Fix made by Olivia.
 * 
 * Version 1.08: April 21, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevents the battle system from shifting back to the
 *    default battle system after an enemy counter attack. Fix made by Olivia.
 * 
 * Version 1.07: April 14, 2022
 * * Compatibility Update!
 * ** Now works more compatible with counters. Update made by Olivia.
 * 
 * Verison 1.06: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.05: August 13, 2021
 * * Bug Fixes!
 * ** Fixed some Plugin Parameters that did not work properly when
 *    showing/hiding action costs. Fix made by Irina.
 * 
 * Version 1.04: June 18, 2021
 * * Documentation Update!
 * ** Added "Action Count" section to Major Changes for extra clarity on how
 *    action counts are determined.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Olivia:
 * *** <FTB Show Action Cost>
 * **** Makes the FTB action cost for this skill/item visible regardless of
 *      Plugin Parameter settings.
 * 
 * Version 1.03: May 28, 2021
 * * Documentation Update!
 * ** Updated the text for Plugin Parameter "Maintain Same Actor?"
 * *** Requires Free Switching. Maintain the same actor after an action or move
 *     onto the next available actor?
 * * Feature Update!
 * ** When there are more actions available than the number of actions that can
 *    be shown at a time, the visible icons displayed will be trimmed to fit
 *    the number of maximum visible icons displayed. Update by Olivia.
 * 
 * Version 1.02: April 2, 2021
 * * Bug Fixes!
 * ** Action costs for FTP will now only take effect if inside battle only.
 *    Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
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
 * @param BattleSystemFTB
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
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent FreeChange:eval
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Requires Free Switching. Maintain the same actor after
 * an action or move onto the next available actor?
 * @default true
 *
 * @param NewTurnResetIndex:eval
 * @text Reset Index New Turns
 * @parent Main
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Resets the selected actor whenever a new turn starts?
 * Needs "Free Switching" to be off.
 * @default false
 *
 * @param RevivalAct:eval
 * @text Current Revival Act?
 * @parent Main
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow revived actors to act the current turn they're revived?
 * @default false
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
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
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x3f08b3=_0x1467;function _0x41e1(){const _0x30feab=['_buffs','speed','isActor','performCollapse','isPartyCommandWindowDisabled','Game_BattlerBase_updateBuffTurns','cwgqo','11493090JMIMiR','BattleManager_startBattle','PhvBZ','10377Avryne','drawTextEx','BattleManager_endAllBattlersTurn','makeActions','removeActionBattlersFTB','Show_1_Action_Cost','canInput','IkBlr','highest\x20agi','skillCostSeparator','Mechanics','_FTB_ACTION_OVERFLOW','GainDiff','selectNextCommand','ftbHighestAgility','processTouch','ActorActionsIcon','updateVisibility','getBattleSystem','EnemyOffsetX','ActionCountCostFmt','_unit','BattleManager_battleSys','1884ADjPvV','isPassingTurnFTB','xnurq','lVLTo','getChildIndex','_FTB_KEEP_PREV_ACTOR','allMembers','commandFight','updateTurn','ftbCostFormat','drawItemNumberFTB','performTurnEndFTB','TeamShiftWait','call','ARRAYJSON','BattleManager_finishActorInput','_maxActions','VisuMZ_3_BattleAI\x20needs\x20to\x20be\x20updated\x20','VLuLv','gMmlr','setTarget','repositionLogWindowFTB','BattleManager_makeActionOrders','pop','updateStateTurns','_FTB_NEUTRAL_TURN_ADVANTAGE','cursorPagedown','_FTB_RECALC_SUB_DIFF','NBvSt','gfaSy','DrawActionsRemaining','clearPassTurnFTB','EmptyActionsIcon','keepPrevSubjectFTB','Scene_Battle_commandCancel','changeEquipById','parse','_currentActions','width','BattleManager_forceAction','filter','textSizeEx','qUyMv','startBattle','_currentActor','RkJkr','total\x20agi','checkNeedsUpdate','onTurnEnd','ftbActionPointsFull','ftbFreeRangeSwitch','iconWidth','ShowCostForGuard','_FTB_MAX_ACTIONS','setBattleSystem','RepositionTopForHelp','_context','_turnCountFTB','clamp','JlXEn','create','drawImage','visible','ActionCountAbbr','_ftbPartyActionCountWindow','innerWidth','currentAction','Ezejo','onBattleStart','increaseTurn','length','_partyCommandWindow','agi','setItem','transform','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','canActorBeSelectedFTB','KcFuE','zraxb','enemies','RmNTd','ScreenBufferX','reduce','Game_Battler_addState','2268912WOXmTa','Scene_Battle_createActorCommandWindow','isBattleSystemFTBActionCountVisible','ftbAliveMembers','_FTB_COST_SHOW_GUARD','floor','EnemyActionsIcon','select','getMaxActionsFTB','Game_Battler_useItem','startInput','drawBigIcon','initMembersFTB','match','ftbActionPointsAbbr','DHhOF','removeStatesAuto','NeutralAdvantage','isActiveTpb','player','screenX','return\x200','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ActionsRemainingOffsetY','ActorActionPicture','vzxkt','Game_Actor_discardEquip','unshift','usvLI','EnemyActionPicture','MinActions','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','playCursorSound','getActionCostFTB','setMaxActionsFTB','in\x20order\x20for\x20VisuMZ_2_BattleSystemFTB\x20to\x20work.','isSideView','Window_Selectable_cursorRight','discardEquip','passTurnFTB','TizJs','resetFontSettings','_inBattle','rtvHm','_FTB_ACTION_AGI_DEBUFF','Current','Game_Actor_changeEquipById','_FTB_COST_SHOW_ATTACK','innerHeight','toLowerCase','setBackgroundType','TgLsn','blt','ftbActorActionsIcon','Window_Selectable_cursorLeft','bind','processTurnFTB','name','parameters','commandCancelFTB','oloiD','xTBbo','Game_BattlerBase_hide','selectNextActor','bjIlX','BattleManager_startInput','getCurrentActionsFTB','startDamagePopup','cursorPageup','iKhmr','startTurnFTB','axphM','makeDeepCopy','Visible','processTouchFTB','Game_Battler_onBattleStart','canMove','BattleManager_isActiveTpb','PictureSmoothing','KeepPrevActor','update','zbuqT','description','isDead','drawText','addBuff','MaxActions','Game_Battler_performCollapse','_forcedBattlers','imageSmoothingEnabled','rxUok','_forceAction','selectNextActorFTB','push','Game_Actor_changeClass','mibAC','prototype','createActorCommandWindow','iTppt','addDebuff','_ftbTeamEven','index','loseCurrentActionsFTB','addText','updateBuffTurns','status','ImageGapDistance','_ftbCurrentUnit','Game_Battler_forceAction','Actor','_storedBitmaps','ItemScene','4989943wPXBFZ','_FTB_MIN_ACTIONS','numItems','OPgcX','clearStates','EEGrd','_lastTargetIndex','_FTB_COST_SHOW_0','STR','changeEquip','FTB','enemy','endAllBattlersTurn','Window_Selectable_cursorPagedown','AgiDebuff','cursorLeft','BattleManager_startTurn','Settings','Game_System_initialize','ItemsEquipsCore','LogWindowTopOffsetY','PartyTeamShiftFmt','contents','createContentsArray','_passedTurnFTB','battler','_FTB_RECALC_ADD_DIFF','BattleSystemFTB','_FTB_COST_SHOW_1','createActionCountWindowsFTB','startInputFTB','_ftbActionsCur','drawItemNumber','11365Bpffzw','cancel','refresh','invokeCounterAttack','opacity','BattleManager_isTurnBased','makeActionOrdersFTB','ARRAYSTR','clear','hmiMr','Game_BattlerBase_updateStateTurns','isSceneBattle','GTAnc','fontSize','appear','isTeamBased','setCurrentActionsFTB','3omkglu','windowRect','_ftbTeamOdd','QUnZR','makeActionOrders','_scene','applyGlobalFTB','concat','Game_BattlerBase_appear','GQHGj','some','ShowActionPointCost','guardSkillId','inBattle','drawActionsRemaining','AkUjM','Game_Battler_onTurnEnd','Game_BattlerBase_canUse','isDrawItemNumber','isTpb','endAction','trim','hide','_actionBattlers','NewTurnResetIndex','createActorCommandWindowFTB','payActionCostFTB','Scene_Battle_createAllWindows','Game_Actor_forceChangeEquip','DrawHorz','mrHKM','startActorCommandSelection','_bypassStateTurnUpdatesFTB','DLyUQ','KLaBv','1722720hzBnrU','LEnxL','format','ftbSwitchActorDirection','yMYBx','createActionsFTB','ShowCostForAttack','nYYbO','_surprise','max','_FTB_ACTION_BASE','addState','releaseUnequippableItems','ftbLowestAgility','setUnit','setup','zccIC','processTurn','forceActionFTB','ROEnD','setLastFtbIndex','Game_Battler_removeState','MaxVisible','startTurn','version','canUse','AllowOverflow','nzppC','height','hitIndex','ARRAYFUNC','onTouchSelectFTB','removeState','Show_0_Action_Cost','_doubleTouch','isTurnBased','endTurnFTB','note','ftbEmptyActionsIcon','weHnx','BattleManager_invokeCounterAttack','rEcLB','%1ActionPicture','textWidth','battleMembers','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','subject','pKOYm','reduceActionsFTB','_actorCommandWindow','Game_Actor_releaseUnequippableItems','_action','BattleManager_setup','battleSys','Scene_Battle_commandFight','SNdIG','BattleManager_isTpb','RepositionTopHelpX','pxSle','forceChangeEquip','applyGlobal','ftbPartyTeamShift','random','UtPYU','PassTurn','RegExp','rUQCw','_FTB_ACTION_AGI_BUFF','SBBas','GktFU','turnCount','makeAdditionalCostTextFTB','attackSkillId','ftbEnemyActionsIcon','wTGNq','HideActionPointCost','initMembers','DmNlF','changeClass','DefaultCostSkill','stepForward','ARRAYEVAL','members','Game_Battler_addBuff','_ftbActionsMax','loadPicture','isTriggered','toUpperCase','ScreenBufferY','_ftbLastIndex','traitObjects','processSwitchActors','_FTB_FREE_CHANGE','_FTB_GUARD_PASS','Nothing','updatePosition','AgiBuff','recalculateActionsFTB','Window_Help_setItem','FreeChange','ImageSize','map','TroopTeamShiftFmt','IjzHP','useItem','_preemptive','ItemQuantityFmt','NUM','VisuMZ_3_BattleAI','jXoaV','Game_Troop_increaseTurn','BattleManager_processTurn','commandCancel','shift','General','Game_Battler_addDebuff','Game_BattlerBase_clearStates','_subject','initialize','NixrP','Game_Actor_selectNextCommand','BottomPosition','loadSystem','ActorOffsetX','aliveMembers','Window_Base_drawItemNumber','RevivalAct','waitCount','TRPjd','ActionCountDisplay','_FTB_BETWEEN_TEAMS_WAIT','BattleManager_endAction','IBije','GuardPass','includes','resetTurnCountFTB','Game_Action_applyGlobal','Game_Actor_changeEquip','ftbTotalAgility','uwAso','setBattleSystemFTBActionCountVisible','DDPZN','ItemQuantityFontSize','EYWBX','isFTB','isItem','BattleManager_endTurn','Window_Selectable_processTouch','Game_Battler_turnCount','endActionFTB','Game_Action_speed','min','ftbActionCount','_ftbActionCountVisible','QiDCz','ftbTroopTeamShift','mjZkW','Enemy','drawPicture','Game_Enemy_transform','registerCommand','canActFTB','BattleManager_isTeamBased','constructor','_FTB_COST_POSITION','decideRandomTarget','GenerateBase','_logWindow','maxCols','mnqAx','cursorRight','_actions','_ftbTurnAdvantageUnit','addLoadListener','friendsUnit','finishActorInput','indexOf','BattleManager_selectNextActor','stepBack','canDrawActionsRemaining','DefaultCostItem','updateStateTurnsFTB','304ysarQu','bzxRZ','DTB','fciNN','round','cKdyV','ActionPointTraitPlus','Window_Base_makeAdditionalSkillCostText','createStartingCoordinates','startActorInput','isSkill','OwJTB','ConvertParams','sort','Game_Battler_removeBuff','updatePadding','386963gxMLjj','forceAction','_windowLayer','actors','OKKua','coBoT','EnemyOffsetY','Window_Selectable_cursorPageup','_helpWindow','_ftbTroopActionCountWindow','Game_Unit_onBattleStart','initBattleSystemFTB','isAlive','fTYTl','exit','lowest\x20agi'];_0x41e1=function(){return _0x30feab;};return _0x41e1();}(function(_0x21488c,_0x53345f){const _0x5a392c=_0x1467,_0x4310a8=_0x21488c();while(!![]){try{const _0x335a0f=parseInt(_0x5a392c(0x169))/0x1+parseInt(_0x5a392c(0x1ee))/0x2*(parseInt(_0x5a392c(0x290))/0x3)+-parseInt(_0x5a392c(0x19a))/0x4*(parseInt(_0x5a392c(0x27f))/0x5)+-parseInt(_0x5a392c(0xa3))/0x6+-parseInt(_0x5a392c(0x25e))/0x7+parseInt(_0x5a392c(0x159))/0x8*(parseInt(_0x5a392c(0x183))/0x9)+parseInt(_0x5a392c(0x180))/0xa;if(_0x335a0f===_0x53345f)break;else _0x4310a8['push'](_0x4310a8['shift']());}catch(_0x5db43a){_0x4310a8['push'](_0x4310a8['shift']());}}}(_0x41e1,0x9d396));var label=_0x3f08b3(0x279),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3f08b3(0x1c2)](function(_0x456d13){const _0x1383c8=_0x3f08b3;return _0x456d13[_0x1383c8(0x257)]&&_0x456d13['description'][_0x1383c8(0x129)]('['+label+']');})[0x0];function _0x1467(_0x4c1407,_0x46ff88){const _0x41e1f3=_0x41e1();return _0x1467=function(_0x146745,_0x53f191){_0x146745=_0x146745-0x9d;let _0xa9d28=_0x41e1f3[_0x146745];return _0xa9d28;},_0x1467(_0x4c1407,_0x46ff88);}VisuMZ[label][_0x3f08b3(0x26f)]=VisuMZ[label][_0x3f08b3(0x26f)]||{},VisuMZ['ConvertParams']=function(_0x49e5ec,_0x5549cf){const _0x32158f=_0x3f08b3;for(const _0x54aa56 in _0x5549cf){if(_0x54aa56[_0x32158f(0x1fb)](/(.*):(.*)/i)){if(_0x32158f(0xdd)===_0x32158f(0xdd)){const _0xd5a67d=String(RegExp['$1']),_0x17f756=String(RegExp['$2'])[_0x32158f(0xfa)]()[_0x32158f(0x2a5)]();let _0x71cf07,_0x12a82e,_0x15a917;switch(_0x17f756){case _0x32158f(0x10e):_0x71cf07=_0x5549cf[_0x54aa56]!==''?Number(_0x5549cf[_0x54aa56]):0x0;break;case'ARRAYNUM':_0x12a82e=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):[],_0x71cf07=_0x12a82e[_0x32158f(0x108)](_0x2f1a81=>Number(_0x2f1a81));break;case'EVAL':_0x71cf07=_0x5549cf[_0x54aa56]!==''?eval(_0x5549cf[_0x54aa56]):null;break;case _0x32158f(0xf4):_0x12a82e=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):[],_0x71cf07=_0x12a82e[_0x32158f(0x108)](_0x13aa69=>eval(_0x13aa69));break;case'JSON':_0x71cf07=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):'';break;case _0x32158f(0x1a8):_0x12a82e=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):[],_0x71cf07=_0x12a82e['map'](_0x3960d2=>JSON[_0x32158f(0x1be)](_0x3960d2));break;case'FUNC':_0x71cf07=_0x5549cf[_0x54aa56]!==''?new Function(JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56])):new Function(_0x32158f(0x203));break;case _0x32158f(0xc1):_0x12a82e=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):[],_0x71cf07=_0x12a82e[_0x32158f(0x108)](_0x213719=>new Function(JSON[_0x32158f(0x1be)](_0x213719)));break;case _0x32158f(0x266):_0x71cf07=_0x5549cf[_0x54aa56]!==''?String(_0x5549cf[_0x54aa56]):'';break;case _0x32158f(0x286):_0x12a82e=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):[],_0x71cf07=_0x12a82e[_0x32158f(0x108)](_0x3401d5=>String(_0x3401d5));break;case'STRUCT':_0x15a917=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):{},_0x71cf07=VisuMZ[_0x32158f(0x165)]({},_0x15a917);break;case'ARRAYSTRUCT':_0x12a82e=_0x5549cf[_0x54aa56]!==''?JSON[_0x32158f(0x1be)](_0x5549cf[_0x54aa56]):[],_0x71cf07=_0x12a82e[_0x32158f(0x108)](_0x539d05=>VisuMZ[_0x32158f(0x165)]({},JSON[_0x32158f(0x1be)](_0x539d05)));break;default:continue;}_0x49e5ec[_0xd5a67d]=_0x71cf07;}else _0x5f0f3c=_0x468008['members']();}}return _0x49e5ec;},(_0x180f2c=>{const _0x7a506d=_0x3f08b3,_0x252e03=_0x180f2c['name'];for(const _0x15d99d of dependencies){if(_0x7a506d(0xca)!==_0x7a506d(0x182)){if(!Imported[_0x15d99d]){alert(_0x7a506d(0xd0)['format'](_0x252e03,_0x15d99d)),SceneManager['exit']();break;}}else this[_0x7a506d(0x27d)]=_0x5602e2[_0x7a506d(0x15d)](_0x57c483)[_0x7a506d(0x1d4)](0x0,_0x1f9ce9[_0x7a506d(0x1cf)]),!_0x22e389[_0x7a506d(0x18e)]&&(this[_0x7a506d(0x27d)]=_0x538eb6[_0x7a506d(0x13a)](this[_0x7a506d(0x27d)],this[_0x7a506d(0x1f6)]()));}const _0x1b6b42=_0x180f2c[_0x7a506d(0x240)];if(_0x1b6b42['match'](/\[Version[ ](.*?)\]/i)){const _0x33c661=Number(RegExp['$1']);_0x33c661!==VisuMZ[label][_0x7a506d(0xbb)]&&(_0x7a506d(0x1fd)===_0x7a506d(0x1b6)?(this[_0x7a506d(0x13c)]===_0x4da8eb&&this[_0x7a506d(0x174)](),this[_0x7a506d(0x13c)]=_0x2e2b2d):(alert(_0x7a506d(0x204)[_0x7a506d(0xa5)](_0x252e03,_0x33c661)),SceneManager[_0x7a506d(0x177)]()));}if(_0x1b6b42['match'](/\[Tier[ ](\d+)\]/i)){if(_0x7a506d(0x12e)!=='psJqj'){const _0x4cab5b=Number(RegExp['$1']);_0x4cab5b<tier?_0x7a506d(0x164)!==_0x7a506d(0x164)?this[_0x7a506d(0xa6)](![]):(alert(_0x7a506d(0x20d)[_0x7a506d(0xa5)](_0x252e03,_0x4cab5b,tier)),SceneManager[_0x7a506d(0x177)]()):tier=Math[_0x7a506d(0xac)](_0x4cab5b,tier);}else _0x399379[_0x7a506d(0x24b)](_0x3984b3);}VisuMZ[_0x7a506d(0x165)](VisuMZ[label][_0x7a506d(0x26f)],_0x180f2c[_0x7a506d(0x228)]);})(pluginData),PluginManager[_0x3f08b3(0x143)](pluginData[_0x3f08b3(0x227)],'SystemActionCountVisibility',_0x1bf660=>{VisuMZ['ConvertParams'](_0x1bf660,_0x1bf660);const _0x2064b6=_0x1bf660['Visible'];$gameSystem['setBattleSystemFTBActionCountVisible'](_0x2064b6);}),VisuMZ['BattleSystemFTB'][_0x3f08b3(0xe4)]={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'ShowActionPointCost':/<FTB SHOW (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0x3f08b3(0x20f)]=function(_0x5f5432){const _0x34cd7f=_0x3f08b3;if(!_0x5f5432)return 0x0;const _0x5a1cee=VisuMZ[_0x34cd7f(0x279)]['Settings'][_0x34cd7f(0x18d)],_0x4ab4b9=VisuMZ['BattleSystemFTB']['RegExp'],_0xaa13e6=_0x5f5432[_0x34cd7f(0xc8)];if(_0xaa13e6[_0x34cd7f(0x1fb)](_0x4ab4b9['ActionPointCost']))return Number(RegExp['$1']);else{if(DataManager[_0x34cd7f(0x163)](_0x5f5432)){if(_0x34cd7f(0x216)==='TizJs')return _0x5a1cee[_0x34cd7f(0xf2)];else this['_unit']=_0x1ff524,this[_0x34cd7f(0x23e)]();}else{if(DataManager[_0x34cd7f(0x134)](_0x5f5432))return _0x5a1cee[_0x34cd7f(0x157)];else{if(_0x34cd7f(0x235)!==_0x34cd7f(0x235)){const _0x3236c4=_0x5af593[_0x34cd7f(0x295)][_0x34cd7f(0xd4)];if(!_0x3236c4)return;if(!_0x3236c4['active'])return;this[_0x34cd7f(0xc5)]=![];const _0x2f63e1=this['index'](),_0x43654d=this['hitIndex']();if(_0x43654d>=0x0){const _0x58f2e2=_0x1d0d74[_0x34cd7f(0xcf)]()[_0x2f63e1],_0x1a61c8=_0x4276fc['battleMembers']()[_0x43654d];this[_0x34cd7f(0x1e6)](_0x1a61c8)&&(_0x43654d===this['index']()&&(this[_0x34cd7f(0xc5)]=!![]),this['select'](_0x43654d),_0x3236c4[_0x34cd7f(0xfe)](_0x58f2e2,_0x1a61c8));}}else return 0x0;}}}},ImageManager[_0x3f08b3(0x223)]=VisuMZ[_0x3f08b3(0x279)]['Settings'][_0x3f08b3(0x115)][_0x3f08b3(0x193)],ImageManager[_0x3f08b3(0xec)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)]['General'][_0x3f08b3(0x1f4)],ImageManager[_0x3f08b3(0xc9)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x115)][_0x3f08b3(0x1ba)],TextManager[_0x3f08b3(0x1cb)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x115)]['ActionCountFull'],TextManager[_0x3f08b3(0x1fc)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)]['General'][_0x3f08b3(0x1d9)],TextManager[_0x3f08b3(0x1a3)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)]['General'][_0x3f08b3(0x197)],TextManager['ftbPartyTeamShift']=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x115)][_0x3f08b3(0x273)],TextManager[_0x3f08b3(0x13e)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x115)][_0x3f08b3(0x109)],SceneManager[_0x3f08b3(0x28a)]=function(){const _0x2e07c7=_0x3f08b3;return this[_0x2e07c7(0x295)]&&this[_0x2e07c7(0x295)][_0x2e07c7(0x146)]===Scene_Battle;},BattleManager[_0x3f08b3(0xff)]=VisuMZ['BattleSystemFTB'][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)][_0x3f08b3(0x106)],BattleManager[_0x3f08b3(0x19f)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)]['Mechanics'][_0x3f08b3(0x23d)],BattleManager['_FTB_RESET_INDEX']=VisuMZ['BattleSystemFTB']['Settings'][_0x3f08b3(0x18d)][_0x3f08b3(0x2a8)]??![],BattleManager[_0x3f08b3(0x100)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)][_0x3f08b3(0x128)],BattleManager[_0x3f08b3(0x278)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)][_0x3f08b3(0x18f)],BattleManager[_0x3f08b3(0x1b5)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)]['LoseDiff'],BattleManager[_0x3f08b3(0x1b3)]=VisuMZ[_0x3f08b3(0x279)]['Settings'][_0x3f08b3(0x18d)][_0x3f08b3(0x1ff)],BattleManager['_FTB_BETWEEN_TEAMS_WAIT']=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)]['General'][_0x3f08b3(0x1a6)],BattleManager[_0x3f08b3(0x1e5)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)]['StateBuffUpdate'],VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x199)]=BattleManager[_0x3f08b3(0xd8)],BattleManager[_0x3f08b3(0xd8)]=function(){const _0x47dd6b=_0x3f08b3;if(this[_0x47dd6b(0x133)]())return _0x47dd6b(0x268);return VisuMZ['BattleSystemFTB'][_0x47dd6b(0x199)][_0x47dd6b(0x1a7)](this);},BattleManager[_0x3f08b3(0x133)]=function(){const _0x4090be=_0x3f08b3;return $gameSystem[_0x4090be(0x195)]()===_0x4090be(0x268);},VisuMZ[_0x3f08b3(0x279)]['BattleManager_isTpb']=BattleManager[_0x3f08b3(0x2a3)],BattleManager[_0x3f08b3(0x2a3)]=function(){const _0x285770=_0x3f08b3;if(this[_0x285770(0x133)]())return![];return VisuMZ[_0x285770(0x279)][_0x285770(0xdb)][_0x285770(0x1a7)](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x23b)]=BattleManager[_0x3f08b3(0x200)],BattleManager['isActiveTpb']=function(){const _0x75c7b1=_0x3f08b3;if(this[_0x75c7b1(0x133)]())return![];return VisuMZ['BattleSystemFTB'][_0x75c7b1(0x23b)][_0x75c7b1(0x1a7)](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x284)]=BattleManager[_0x3f08b3(0xc6)],BattleManager['isTurnBased']=function(){const _0x4ca62d=_0x3f08b3;if(this[_0x4ca62d(0x133)]())return!![];return VisuMZ['BattleSystemFTB'][_0x4ca62d(0x284)]['call'](this);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x145)]=BattleManager[_0x3f08b3(0x28e)],BattleManager['isTeamBased']=function(){const _0x5600dd=_0x3f08b3;if(this[_0x5600dd(0x133)]())return!![];return VisuMZ[_0x5600dd(0x279)][_0x5600dd(0x145)]['call'](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x22f)]=BattleManager[_0x3f08b3(0x1f8)],BattleManager[_0x3f08b3(0x1f8)]=function(){const _0x5845d2=_0x3f08b3;if(this[_0x5845d2(0x133)]())this[_0x5845d2(0xab)]=![];VisuMZ[_0x5845d2(0x279)][_0x5845d2(0x22f)]['call'](this);if(this[_0x5845d2(0x133)]()&&$gameParty[_0x5845d2(0x189)]())this['startInputFTB']();},BattleManager[_0x3f08b3(0x27c)]=function(){const _0x1fe4c9=_0x3f08b3;this[_0x1fe4c9(0xba)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x112)]=BattleManager[_0x3f08b3(0xb4)],BattleManager['processTurn']=function(){const _0x240a40=_0x3f08b3;this[_0x240a40(0x133)]()?this['processTurnFTB']():_0x240a40(0x28b)!==_0x240a40(0x28b)?this[_0x240a40(0x2a9)]():VisuMZ['BattleSystemFTB'][_0x240a40(0x112)][_0x240a40(0x1a7)](this);},BattleManager[_0x3f08b3(0x226)]=function(){const _0x2c4ad2=_0x3f08b3,_0x974ac8=this[_0x2c4ad2(0x118)];if(_0x974ac8&&!_0x974ac8[_0x2c4ad2(0x151)]()[_0x2c4ad2(0x144)]())_0x2c4ad2(0x293)==='bWaQd'?(this['_passedTurnFTB']=!![],_0x182773['removeActionBattlersFTB']()):(this[_0x2c4ad2(0x2a4)](),this['_subject']=null,this[_0x2c4ad2(0x1a2)](![]));else{if(_0x974ac8&&_0x974ac8[_0x2c4ad2(0x17b)]()&&_0x974ac8['canInput']()){const _0x2dc6fd=_0x974ac8[_0x2c4ad2(0x1dc)]();if(!_0x2dc6fd)VisuMZ[_0x2c4ad2(0x279)][_0x2c4ad2(0x112)]['call'](this);else{if(_0x2dc6fd[_0x2c4ad2(0x249)]){if(_0x2c4ad2(0x14c)==='mnqAx')VisuMZ[_0x2c4ad2(0x279)]['BattleManager_processTurn'][_0x2c4ad2(0x1a7)](this);else return this[_0x2c4ad2(0x27d)]||0x0;}else this[_0x2c4ad2(0x1c6)]=_0x974ac8,this[_0x2c4ad2(0x162)]();}}else VisuMZ[_0x2c4ad2(0x279)][_0x2c4ad2(0x112)][_0x2c4ad2(0x1a7)](this);}},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x1a9)]=BattleManager[_0x3f08b3(0x152)],BattleManager[_0x3f08b3(0x152)]=function(){const _0x81bcb8=_0x3f08b3;this['isFTB']()?VisuMZ[_0x81bcb8(0x279)][_0x81bcb8(0x112)][_0x81bcb8(0x1a7)](this):VisuMZ['BattleSystemFTB'][_0x81bcb8(0x1a9)][_0x81bcb8(0x1a7)](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x154)]=BattleManager[_0x3f08b3(0x22d)],BattleManager[_0x3f08b3(0x22d)]=function(){const _0x58e12d=_0x3f08b3;this[_0x58e12d(0x133)]()?'Dvgsn'!==_0x58e12d(0x263)?this['selectNextActorFTB']():_0xacbda[_0x58e12d(0x279)][_0x58e12d(0x26b)]['call'](this):VisuMZ['BattleSystemFTB'][_0x58e12d(0x154)]['call'](this);},BattleManager[_0x3f08b3(0x24a)]=function(){const _0x27c23d=_0x3f08b3;this[_0x27c23d(0x1c6)]=null,this['_inputting']=![];},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x126)]=BattleManager[_0x3f08b3(0x2a4)],BattleManager['endAction']=function(){const _0x272211=_0x3f08b3,_0x2e8242=this[_0x272211(0x118)];VisuMZ[_0x272211(0x279)][_0x272211(0x126)][_0x272211(0x1a7)](this),this[_0x272211(0x138)](_0x2e8242);},BattleManager[_0x3f08b3(0x138)]=function(_0x2ef641){const _0x4ef9d2=_0x3f08b3;if(!this[_0x4ef9d2(0x133)]())return;if(_0x2ef641){const _0xb4e062=_0x2ef641[_0x4ef9d2(0x14e)][_0x4ef9d2(0x1c2)](_0x220f79=>_0x220f79[_0x4ef9d2(0x249)]);_0x2ef641[_0x4ef9d2(0x186)]();if(_0xb4e062){if(_0x4ef9d2(0x19d)==='qsWJm'){const _0x26a400=_0x3fa7f4(_0x4c75e6['$1']);_0x26a400!==_0x46b568[_0x1a7457][_0x4ef9d2(0xbb)]&&(_0x3d8d39(_0x4ef9d2(0x204)[_0x4ef9d2(0xa5)](_0x2b4d3d,_0x26a400)),_0x49601c['exit']());}else{let _0x1372d1=_0xb4e062[_0x4ef9d2(0x1e0)];while(_0x1372d1--){_0x4ef9d2(0x123)==='tfsls'?_0x8544f-=_0x17fefb:_0x2ef641[_0x4ef9d2(0x14e)]['pop']();}_0x2ef641[_0x4ef9d2(0x14e)]=_0xb4e062[_0x4ef9d2(0x297)](_0x2ef641[_0x4ef9d2(0x14e)]);}}}if(this[_0x4ef9d2(0x246)]['length']>0x0){if(this[_0x4ef9d2(0x118)]){if(_0x4ef9d2(0x299)===_0x4ef9d2(0x10a))return _0x1f63e4['getBattleSystem']()===_0x4ef9d2(0x268);else!this['_actionBattlers'][_0x4ef9d2(0x129)](this[_0x4ef9d2(0x118)])&&('TgLsn'===_0x4ef9d2(0x221)?this[_0x4ef9d2(0x2a7)][_0x4ef9d2(0x209)](this['_subject']):_0x2fedbf[_0x4ef9d2(0x24b)](_0x2d059c));}this[_0x4ef9d2(0x118)]=this['getNextSubject']();}else this[_0x4ef9d2(0x1bb)](_0x2ef641)&&(this[_0x4ef9d2(0x118)]=_0x2ef641);_0x2ef641['friendsUnit']()[_0x4ef9d2(0xb7)](_0x2ef641);},BattleManager['keepPrevSubjectFTB']=function(_0x55d9b4){const _0x4cc68=_0x3f08b3;if(!_0x55d9b4)return![];if(!_0x55d9b4[_0x4cc68(0x17b)]())return![];if(!_0x55d9b4[_0x4cc68(0x23a)]())return![];if(!_0x55d9b4[_0x4cc68(0x189)]())return![];if(_0x55d9b4[_0x4cc68(0x19b)]())return![];return BattleManager[_0x4cc68(0xff)]&&BattleManager[_0x4cc68(0x19f)];},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x181)]=BattleManager[_0x3f08b3(0x1c5)],BattleManager[_0x3f08b3(0x1c5)]=function(){const _0xa118ad=_0x3f08b3;VisuMZ[_0xa118ad(0x279)][_0xa118ad(0x181)][_0xa118ad(0x1a7)](this),this['startBattleFTB']();},BattleManager['startBattleFTB']=function(){const _0x52e090=_0x3f08b3;if(!this['isFTB']())return;if(this[_0x52e090(0x10c)])this[_0x52e090(0x14f)]='actors';else this[_0x52e090(0xab)]?this[_0x52e090(0x14f)]='enemies':this[_0x52e090(0x14f)]=BattleManager[_0x52e090(0x1b3)];this['_ftbTurnAdvantageUnit']=this[_0x52e090(0x14f)]||_0x52e090(0xe1);let _0x3d4e50=0x0,_0xb782ae=0x0;switch(this[_0x52e090(0x14f)][_0x52e090(0x21f)]()[_0x52e090(0x2a5)]()){case _0x52e090(0xe1):let _0x34358e=['actors','enemies'];this[_0x52e090(0x14f)]=_0x34358e[Math['randomInt'](_0x34358e[_0x52e090(0x1e0)])];break;case _0x52e090(0x201):this[_0x52e090(0x14f)]='actors';break;case _0x52e090(0x269):this[_0x52e090(0x14f)]='enemies';break;case _0x52e090(0x178):_0x3d4e50=$gameParty['ftbLowestAgility'](),_0xb782ae=$gameTroop[_0x52e090(0xb0)](),this['_ftbTurnAdvantageUnit']=_0x3d4e50>=_0xb782ae?'actors':_0x52e090(0x1e9);break;case'average\x20agi':_0x3d4e50=$gameParty['agility'](),_0xb782ae=$gameTroop['agility'](),this['_ftbTurnAdvantageUnit']=_0x3d4e50>=_0xb782ae?_0x52e090(0x16c):'enemies';break;case _0x52e090(0x18b):_0x3d4e50=$gameParty[_0x52e090(0x191)](),_0xb782ae=$gameTroop[_0x52e090(0x191)](),this['_ftbTurnAdvantageUnit']=_0x3d4e50>=_0xb782ae?'actors':_0x52e090(0x1e9);break;case _0x52e090(0x1c8):_0x3d4e50=$gameParty['ftbTotalAgility'](),_0xb782ae=$gameTroop['ftbTotalAgility'](),this[_0x52e090(0x14f)]=_0x3d4e50>=_0xb782ae?'actors':_0x52e090(0x1e9);break;}this['_ftbTeamOdd']=this[_0x52e090(0x14f)]===_0x52e090(0x16c)?$gameParty:$gameTroop,this['_ftbTeamEven']=this['_ftbTurnAdvantageUnit']===_0x52e090(0x16c)?$gameTroop:$gameParty;},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x1b0)]=BattleManager[_0x3f08b3(0x294)],BattleManager[_0x3f08b3(0x294)]=function(){const _0x3dcb33=_0x3f08b3;this[_0x3dcb33(0x133)]()?_0x3dcb33(0xcc)===_0x3dcb33(0xcc)?this['makeActionOrdersFTB']():(_0x2402f3['prototype']['update']['call'](this),this[_0x3dcb33(0x1c9)](),this['updatePosition'](),this[_0x3dcb33(0x194)]()):VisuMZ[_0x3dcb33(0x279)][_0x3dcb33(0x1b0)][_0x3dcb33(0x1a7)](this);},BattleManager[_0x3f08b3(0x285)]=function(){const _0x842a1a=_0x3f08b3;let _0xa18be5=[],_0x24d2b6=[],_0x49643a=0x0;const _0x51789e=$gameTroop[_0x842a1a(0xe9)]();let _0x2acd6d=_0x51789e%0x2===0x0?this[_0x842a1a(0x252)]:this['_ftbTeamOdd'];this[_0x842a1a(0x259)]=_0x2acd6d;const _0x1b288c=VisuMZ[_0x842a1a(0x279)]['Settings'][_0x842a1a(0x18d)];if(_0x2acd6d===$gameParty){const _0x18387f=_0x1b288c[_0x842a1a(0x121)]?$gameParty['battleMembers']():$gameParty[_0x842a1a(0x1f1)]();let _0x87284d=_0x18387f['filter'](_0x9db4e3=>_0x9db4e3[_0x842a1a(0x23a)]()&&!_0x9db4e3[_0x842a1a(0x189)]()),_0x2a9716=_0x18387f['filter'](_0x1323b5=>_0x1323b5[_0x842a1a(0x23a)]()&&_0x1323b5[_0x842a1a(0x189)]());_0xa18be5=_0xa18be5[_0x842a1a(0x297)](_0x87284d),_0x49643a=Game_Unit[_0x842a1a(0x1cf)];while(_0x49643a--){_0xa18be5=_0xa18be5[_0x842a1a(0x297)](_0x2a9716);}_0x49643a=Game_Unit[_0x842a1a(0x1cf)]-0x1;while(_0x49643a--){if(_0x842a1a(0x23f)===_0x842a1a(0xaa)){const _0xec83a7=_0x1aa63c[_0x842a1a(0x14e)]['filter'](_0x14e246=>_0x14e246[_0x842a1a(0x249)]);_0x3925d1[_0x842a1a(0x186)]();if(_0xec83a7){let _0x2ac40f=_0xec83a7['length'];while(_0x2ac40f--){_0x43cc88[_0x842a1a(0x14e)][_0x842a1a(0x1b1)]();}_0x114238[_0x842a1a(0x14e)]=_0xec83a7[_0x842a1a(0x297)](_0x282f30[_0x842a1a(0x14e)]);}}else _0xa18be5=_0xa18be5['concat'](_0x87284d);}}if(_0x2acd6d===$gameTroop){if(_0x842a1a(0xb3)===_0x842a1a(0xa2)){if(!_0x4bb563['isFTB']())return;this[_0x842a1a(0x1d3)]=0x0;}else{const _0x20b2b2=_0x1b288c[_0x842a1a(0x121)]?$gameTroop[_0x842a1a(0xf5)]():$gameTroop['ftbAliveMembers']();let _0x489c49=_0x20b2b2['filter'](_0x37bcd8=>_0x37bcd8[_0x842a1a(0x23a)]());if($gameSystem[_0x842a1a(0x212)]()){if(_0x842a1a(0x20a)===_0x842a1a(0x22a)){if(_0x502a4b[_0x842a1a(0x133)]()){if(this['battler']())this['battler']()['stepForward']();return![];}return _0x30b9d2['BattleSystemFTB'][_0x842a1a(0x11b)][_0x842a1a(0x1a7)](this);}else _0x489c49[_0x842a1a(0x166)]((_0x3a0464,_0x47a72b)=>_0x47a72b[_0x842a1a(0x202)]()-_0x3a0464['screenX']());}else'OPjKP'!=='BbamA'?_0x489c49[_0x842a1a(0x166)]((_0x207612,_0x1fcbab)=>_0x207612[_0x842a1a(0x202)]()-_0x1fcbab[_0x842a1a(0x202)]()):this[_0x842a1a(0xa6)](!![]);_0x49643a=Game_Unit[_0x842a1a(0x1cf)];while(_0x49643a--){_0x24d2b6=_0x24d2b6['concat'](_0x489c49);}$gameTroop[_0x842a1a(0x186)]();}}this[_0x842a1a(0x2a7)]=_0xa18be5[_0x842a1a(0x297)](_0x24d2b6);},BattleManager[_0x3f08b3(0x187)]=function(){const _0x1e447b=_0x3f08b3;if(!this[_0x1e447b(0x133)]())return;this[_0x1e447b(0x2a7)]=this[_0x1e447b(0x2a7)]||[],this['_actionBattlers']=this['_actionBattlers'][_0x1e447b(0x1c2)](_0x787158=>_0x787158[_0x1e447b(0x23a)]()&&!_0x787158[_0x1e447b(0x19b)]());},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0xd7)]=BattleManager['setup'],BattleManager['setup']=function(_0x4adfe8,_0x386f1d,_0x34ffda){const _0x23b6ac=_0x3f08b3;VisuMZ[_0x23b6ac(0x279)][_0x23b6ac(0xd7)][_0x23b6ac(0x1a7)](this,_0x4adfe8,_0x386f1d,_0x34ffda),this[_0x23b6ac(0x1fa)]();},BattleManager[_0x3f08b3(0x1fa)]=function(){const _0x10bd6c=_0x3f08b3;if(!BattleManager[_0x10bd6c(0x133)]())return;this[_0x10bd6c(0x259)]=undefined,$gameParty['startTurnFTB'](),$gameTroop[_0x10bd6c(0x234)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26e)]=BattleManager[_0x3f08b3(0xba)],BattleManager['startTurn']=function(){const _0x2db83b=_0x3f08b3;this[_0x2db83b(0x234)](),VisuMZ[_0x2db83b(0x279)][_0x2db83b(0x26e)][_0x2db83b(0x1a7)](this),this['ftbCreateTeamSwitchText']();},BattleManager['startTurnFTB']=function(){const _0xefe30b=_0x3f08b3;if(!BattleManager[_0xefe30b(0x133)]())return;$gameParty[_0xefe30b(0x1b9)](),$gameTroop['clearPassTurnFTB']();const _0x1d6102=$gameTroop[_0xefe30b(0xe9)]()+0x1;let _0x2fd6ac=_0x1d6102%0x2===0x0?this['_ftbTeamEven']:this[_0xefe30b(0x292)],_0x104f76=_0x1d6102%0x2===0x0?this[_0xefe30b(0x292)]:this[_0xefe30b(0x252)];if(_0x1d6102>0x1){if(_0xefe30b(0xbe)===_0xefe30b(0xbe))_0x104f76['performTurnEndFTB']();else{const _0x49b9bc=_0x4836c2[_0xefe30b(0xcf)]()[_0x4dd9ab],_0x482964=_0x460b04[_0xefe30b(0xcf)]()[_0x56193c];this[_0xefe30b(0x1e6)](_0x482964)&&(_0x7f26a2===this[_0xefe30b(0x253)]()&&(this[_0xefe30b(0xc5)]=!![]),this[_0xefe30b(0x1f5)](_0x12806a),_0x3284e2[_0xefe30b(0xfe)](_0x49b9bc,_0x482964));}}_0x2fd6ac['updateStateTurnsFTB'](),_0x2fd6ac[_0xefe30b(0x234)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x135)]=BattleManager['endTurn'],BattleManager['endTurn']=function(){const _0x3836e1=_0x3f08b3;VisuMZ[_0x3836e1(0x279)][_0x3836e1(0x135)][_0x3836e1(0x1a7)](this),this[_0x3836e1(0xc7)]();},BattleManager[_0x3f08b3(0xc7)]=function(){const _0x194ee1=_0x3f08b3;if(!BattleManager[_0x194ee1(0x133)]())return;},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x185)]=BattleManager[_0x3f08b3(0x26a)],BattleManager[_0x3f08b3(0x26a)]=function(){const _0x2e3704=_0x3f08b3;if(this[_0x2e3704(0x133)]())return;VisuMZ['BattleSystemFTB'][_0x2e3704(0x185)][_0x2e3704(0x1a7)](this);},BattleManager['ftbCreateTeamSwitchText']=function(){const _0x24a01f=_0x3f08b3;if(!BattleManager[_0x24a01f(0x133)]())return;let _0x299364='';if(this[_0x24a01f(0x259)]===$gameParty){if(_0x24a01f(0xe2)===_0x24a01f(0x1d5)){this[_0x24a01f(0x217)]();const _0x3de60f=_0x33925c['ItemsEquipsCore'][_0x24a01f(0x26f)][_0x24a01f(0x25d)];this[_0x24a01f(0x274)][_0x24a01f(0x28c)]=_0x3de60f[_0x24a01f(0x131)];if(_0x419346){const _0x5837c6=_0x3de60f[_0x24a01f(0x10d)],_0x40bd1a=_0x5837c6[_0x24a01f(0xa5)](_0x20d03e[_0x24a01f(0x260)](_0x253388)),_0x5679e1=this[_0x24a01f(0xce)](_0x40bd1a+this[_0x24a01f(0x18c)]());_0x57320c-=_0x5679e1;}else _0x3baf3c-=this[_0x24a01f(0xce)](this[_0x24a01f(0x18c)]())+_0x3b52df;_0x303d9e['BattleSystemFTB'][_0x24a01f(0x120)][_0x24a01f(0x1a7)](this,_0x394a00,_0x23cb1f,_0x4d22a1,_0xeafb80);}else{let _0x17d93c=$gameParty['name']();_0x299364=TextManager[_0x24a01f(0xe0)][_0x24a01f(0xa5)](_0x17d93c);}}else'RMREY'!==_0x24a01f(0x15a)?_0x299364=TextManager[_0x24a01f(0x13e)]:_0xa37f4e+=_0xf53b91;if(_0x299364!==''){if('itrGU'==='FMsgB')_0x9eb824=_0x13a1a2[_0x24a01f(0x297)](_0x4a77f8);else{this['_logWindow']['push'](_0x24a01f(0x255),_0x299364);const _0x3d2bbf=BattleManager[_0x24a01f(0x125)];this['_logWindow'][_0x24a01f(0x24b)](_0x24a01f(0x122),_0x3d2bbf),this['_logWindow'][_0x24a01f(0x24b)](_0x24a01f(0x287));}}},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x239)]=Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x1de)],Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x1de)]=function(_0x2fc9ab){const _0x5f4440=_0x3f08b3;VisuMZ[_0x5f4440(0x279)][_0x5f4440(0x239)]['call'](this,_0x2fc9ab),this[_0x5f4440(0x12a)]();},Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x12a)]=function(){const _0x38e699=_0x3f08b3;if(!BattleManager['isFTB']())return;this[_0x38e699(0x1d3)]=0x0;},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x137)]=Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0xe9)],Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0xe9)]=function(){const _0xcce8e8=_0x3f08b3;return BattleManager[_0xcce8e8(0x133)]()?this[_0xcce8e8(0x1d3)]||0x0:VisuMZ[_0xcce8e8(0x279)][_0xcce8e8(0x137)][_0xcce8e8(0x1a7)](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x111)]=Game_Troop['prototype'][_0x3f08b3(0x1df)],Game_Troop[_0x3f08b3(0x24e)][_0x3f08b3(0x1df)]=function(){const _0x41d510=_0x3f08b3;VisuMZ['BattleSystemFTB'][_0x41d510(0x111)][_0x41d510(0x1a7)](this),this['increaseTurnFTB']();},Game_Troop[_0x3f08b3(0x24e)]['increaseTurnFTB']=function(){const _0x56a5fb=_0x3f08b3;if(!BattleManager[_0x56a5fb(0x133)]())return;if(Imported[_0x56a5fb(0x10f)]&&VisuMZ['BattleAI'][_0x56a5fb(0xbb)]<1.22){let _0x3f8e97='';_0x3f8e97+=_0x56a5fb(0x1ab),_0x3f8e97+=_0x56a5fb(0x211),alert(_0x3f8e97),SceneManager[_0x56a5fb(0x177)]();}let _0x2c0ad8=[];BattleManager[_0x56a5fb(0x259)]===$gameParty?'yMYBx'===_0x56a5fb(0xa7)?_0x2c0ad8=$gameParty[_0x56a5fb(0x1a0)]():(_0x5d70ab[_0x56a5fb(0x279)][_0x56a5fb(0xd7)]['call'](this,_0x21e71e,_0x45b561,_0x3d74d5),this[_0x56a5fb(0x1fa)]()):_0x2c0ad8=$gameTroop[_0x56a5fb(0xf5)]();for(const _0x2b19f of _0x2c0ad8){_0x2b19f['_turnCountFTB']=_0x2b19f[_0x56a5fb(0x1d3)]||0x0,_0x2b19f[_0x56a5fb(0x1d3)]++;}},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0xcb)]=BattleManager[_0x3f08b3(0x282)],BattleManager[_0x3f08b3(0x282)]=function(_0x423ad6,_0xa1af14){const _0x12adec=_0x3f08b3,_0x1588d5=BattleManager[_0x12adec(0x133)]();if(_0x1588d5)$gameSystem[_0x12adec(0x1d0)](_0x12adec(0x15b));VisuMZ[_0x12adec(0x279)][_0x12adec(0xcb)][_0x12adec(0x1a7)](this,_0x423ad6,_0xa1af14);if(_0x1588d5)$gameSystem[_0x12adec(0x1d0)](_0x12adec(0x268));},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x270)]=Game_System[_0x3f08b3(0x24e)][_0x3f08b3(0x119)],Game_System[_0x3f08b3(0x24e)][_0x3f08b3(0x119)]=function(){const _0x586283=_0x3f08b3;VisuMZ['BattleSystemFTB'][_0x586283(0x270)][_0x586283(0x1a7)](this),this[_0x586283(0x174)]();},Game_System[_0x3f08b3(0x24e)][_0x3f08b3(0x174)]=function(){const _0x56c095=_0x3f08b3;this[_0x56c095(0x13c)]=!![];},Game_System['prototype'][_0x3f08b3(0x1f0)]=function(){const _0x4ec5c9=_0x3f08b3;if(BattleManager['_phase']==='battleEnd')return![];return this[_0x4ec5c9(0x13c)]===undefined&&this[_0x4ec5c9(0x174)](),this['_ftbActionCountVisible'];},Game_System[_0x3f08b3(0x24e)][_0x3f08b3(0x12f)]=function(_0x3f288c){const _0x4e4262=_0x3f08b3;this[_0x4e4262(0x13c)]===undefined&&this[_0x4e4262(0x174)](),this[_0x4e4262(0x13c)]=_0x3f288c;},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x139)]=Game_Action[_0x3f08b3(0x24e)][_0x3f08b3(0x17a)],Game_Action['prototype'][_0x3f08b3(0x17a)]=function(){const _0x5c39db=_0x3f08b3;if(BattleManager['isFTB']()){if(_0x5c39db(0x22b)!==_0x5c39db(0x13d))return 0x0;else _0x5eb5fd===this[_0x5c39db(0x253)]()&&(this[_0x5c39db(0xc5)]=!![]),this[_0x5c39db(0x1f5)](_0x2e14b5),_0x24bc9f['processSwitchActors'](_0x56a5a5,_0x48f835);}else{if(_0x5c39db(0x11a)!==_0x5c39db(0xe7))return VisuMZ['BattleSystemFTB'][_0x5c39db(0x139)][_0x5c39db(0x1a7)](this);else _0x53f789['BattleSystemFTB']['Scene_Battle_commandFight']['call'](this);}},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x12b)]=Game_Action[_0x3f08b3(0x24e)][_0x3f08b3(0xdf)],Game_Action['prototype'][_0x3f08b3(0xdf)]=function(){const _0x2e2cd0=_0x3f08b3;VisuMZ[_0x2e2cd0(0x279)][_0x2e2cd0(0x12b)][_0x2e2cd0(0x1a7)](this),this[_0x2e2cd0(0x296)]();},Game_Action[_0x3f08b3(0x24e)]['applyGlobalFTB']=function(){const _0x177e0f=_0x3f08b3;if(!BattleManager['isFTB']())return;if(!this[_0x177e0f(0xd1)]())return;if(!this['item']())return;this[_0x177e0f(0x163)]()&&this['item']()['id']===this[_0x177e0f(0xd1)]()[_0x177e0f(0x29c)]()&&(BattleManager[_0x177e0f(0x100)]&&this['subject']()[_0x177e0f(0x215)]());const _0x363ae5=VisuMZ[_0x177e0f(0x279)][_0x177e0f(0xe4)],_0x3bd1b9=this['item']()['note'];_0x3bd1b9['match'](_0x363ae5[_0x177e0f(0xe3)])&&this[_0x177e0f(0xd1)]()[_0x177e0f(0x215)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x22c)]=Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x2a6)],Game_BattlerBase['prototype'][_0x3f08b3(0x2a6)]=function(){const _0x5d6d17=_0x3f08b3;VisuMZ[_0x5d6d17(0x279)]['Game_BattlerBase_hide'][_0x5d6d17(0x1a7)](this),BattleManager['removeActionBattlersFTB'](),this[_0x5d6d17(0x151)]()[_0x5d6d17(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x298)]=Game_BattlerBase[_0x3f08b3(0x24e)]['appear'],Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x28d)]=function(){const _0x2a7f4b=_0x3f08b3;VisuMZ['BattleSystemFTB']['Game_BattlerBase_appear'][_0x2a7f4b(0x1a7)](this),BattleManager['removeActionBattlersFTB'](),this[_0x2a7f4b(0x151)]()['recalculateActionsFTB']();},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x245)]=Game_Battler[_0x3f08b3(0x24e)]['performCollapse'],Game_Battler['prototype']['performCollapse']=function(){const _0x288aa0=_0x3f08b3;VisuMZ[_0x288aa0(0x279)][_0x288aa0(0x245)]['call'](this),BattleManager[_0x288aa0(0x187)](),this[_0x288aa0(0x151)]()[_0x288aa0(0x104)]();},Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x215)]=function(){const _0x5b5609=_0x3f08b3;this[_0x5b5609(0x276)]=!![],BattleManager['removeActionBattlersFTB']();},Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x19b)]=function(){return!!this['_passedTurnFTB'];},Game_BattlerBase['_FTB_ACTION_BASE']=VisuMZ['BattleSystemFTB'][_0x3f08b3(0x26f)]['Mechanics'][_0x3f08b3(0x149)],Game_BattlerBase[_0x3f08b3(0xe6)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)][_0x3f08b3(0x103)],Game_BattlerBase[_0x3f08b3(0x21a)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)][_0x3f08b3(0x26c)],Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x13b)]=function(){const _0xc92a45=_0x3f08b3;let _0x42939c=Game_BattlerBase[_0xc92a45(0xad)];if(this[_0xc92a45(0x179)]===undefined)this['clearBuffs']();const _0xa5c49a=this[_0xc92a45(0x179)][0x6]||0x0;if(_0xa5c49a>0x0&&Game_BattlerBase[_0xc92a45(0xe6)]){if('Cicek'!==_0xc92a45(0x18a))_0x42939c+=_0xa5c49a;else{const _0x360efa=this[_0xc92a45(0x291)]();_0x5357b8[_0xc92a45(0x24e)]['initialize'][_0xc92a45(0x1a7)](this,_0x360efa),this['setBackgroundType'](0x0),this[_0xc92a45(0xef)](),this[_0xc92a45(0x283)]=0x0;}}else _0xa5c49a<0x0&&Game_BattlerBase['_FTB_ACTION_AGI_DEBUFF']&&(_0x42939c+=_0xa5c49a);const _0x5deb7b=VisuMZ[_0xc92a45(0x279)][_0xc92a45(0xe4)],_0x3baec0=this[_0xc92a45(0xfd)]();for(const _0x2700f5 of _0x3baec0){if(!_0x2700f5)continue;const _0x19733d=_0x2700f5[_0xc92a45(0xc8)];_0x19733d[_0xc92a45(0x1fb)](_0x5deb7b[_0xc92a45(0x15f)])&&(_0x42939c+=Number(RegExp['$1']));}return Math[_0xc92a45(0xac)](0x0,_0x42939c);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x117)]=Game_BattlerBase['prototype'][_0x3f08b3(0x262)],Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x262)]=function(){const _0x1998af=_0x3f08b3;VisuMZ[_0x1998af(0x279)][_0x1998af(0x117)][_0x1998af(0x1a7)](this),this[_0x1998af(0x151)]()[_0x1998af(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x2a1)]=Game_BattlerBase['prototype'][_0x3f08b3(0xbc)],Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0xbc)]=function(_0x1505c6){const _0x5e5d2f=_0x3f08b3;if(SceneManager[_0x5e5d2f(0x28a)]()&&BattleManager[_0x5e5d2f(0x133)]()){if(_0x5e5d2f(0x17f)!==_0x5e5d2f(0x16e)){const _0x1f282c=DataManager[_0x5e5d2f(0x20f)](_0x1505c6);if(_0x1f282c>this[_0x5e5d2f(0x151)]()[_0x5e5d2f(0x230)]())return![];}else _0xec2aef['BattleSystemFTB'][_0x5e5d2f(0x173)][_0x5e5d2f(0x1a7)](this,_0x2cf823),_0x304442[_0x5e5d2f(0x133)]()&&(this[_0x5e5d2f(0xfc)]=0x0);}return VisuMZ[_0x5e5d2f(0x279)][_0x5e5d2f(0x2a1)][_0x5e5d2f(0x1a7)](this,_0x1505c6);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x1f7)]=Game_Battler[_0x3f08b3(0x24e)]['useItem'],Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x10b)]=function(_0x28f88d){const _0x11bd03=_0x3f08b3;VisuMZ[_0x11bd03(0x279)]['Game_Battler_useItem'][_0x11bd03(0x1a7)](this,_0x28f88d),this[_0x11bd03(0x2aa)](_0x28f88d);},Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x2aa)]=function(_0x41255c){const _0x35d0e5=_0x3f08b3;if(!_0x41255c)return;if(!SceneManager[_0x35d0e5(0x28a)]())return;if(!BattleManager[_0x35d0e5(0x133)]())return;const _0x4bd9d5=BattleManager[_0x35d0e5(0xd6)];if(_0x4bd9d5&&_0x4bd9d5['_forceAction'])return;const _0x4dcce4=DataManager[_0x35d0e5(0x20f)](_0x41255c);this[_0x35d0e5(0x151)]()[_0x35d0e5(0xd3)](_0x4dcce4);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x2a0)]=Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x1ca)],Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x1ca)]=function(){const _0x57c672=_0x3f08b3;this[_0x57c672(0xa0)]=BattleManager[_0x57c672(0x133)]()&&BattleManager[_0x57c672(0x1e5)],VisuMZ['BattleSystemFTB'][_0x57c672(0x2a0)][_0x57c672(0x1a7)](this),delete this[_0x57c672(0xa0)];},VisuMZ[_0x3f08b3(0x279)]['Game_BattlerBase_updateStateTurns']=Game_BattlerBase[_0x3f08b3(0x24e)]['updateStateTurns'],Game_BattlerBase[_0x3f08b3(0x24e)]['updateStateTurns']=function(){const _0x47f959=_0x3f08b3;if(this[_0x47f959(0xa0)])return;VisuMZ[_0x47f959(0x279)][_0x47f959(0x289)][_0x47f959(0x1a7)](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x17e)]=Game_BattlerBase['prototype'][_0x3f08b3(0x256)],Game_BattlerBase[_0x3f08b3(0x24e)][_0x3f08b3(0x256)]=function(){const _0x5b8223=_0x3f08b3;if(this[_0x5b8223(0xa0)])return;VisuMZ[_0x5b8223(0x279)][_0x5b8223(0x17e)][_0x5b8223(0x1a7)](this);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x1ed)]=Game_Battler['prototype'][_0x3f08b3(0xae)],Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0xae)]=function(_0xfff78b){const _0x269c72=_0x3f08b3;VisuMZ[_0x269c72(0x279)][_0x269c72(0x1ed)][_0x269c72(0x1a7)](this,_0xfff78b),this['friendsUnit']()[_0x269c72(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0xb8)]=Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0xc3)],Game_Battler[_0x3f08b3(0x24e)]['removeState']=function(_0x527058){const _0x428377=_0x3f08b3;VisuMZ[_0x428377(0x279)][_0x428377(0xb8)][_0x428377(0x1a7)](this,_0x527058),this['friendsUnit']()[_0x428377(0x104)]();},VisuMZ[_0x3f08b3(0x279)]['Game_Battler_addBuff']=Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x243)],Game_Battler['prototype'][_0x3f08b3(0x243)]=function(_0x24681b,_0x564722){const _0x35b8e9=_0x3f08b3;VisuMZ[_0x35b8e9(0x279)][_0x35b8e9(0xf6)]['call'](this,_0x24681b,_0x564722),this[_0x35b8e9(0x151)]()[_0x35b8e9(0x104)]();},VisuMZ['BattleSystemFTB']['Game_Battler_addDebuff']=Game_Battler['prototype'][_0x3f08b3(0x251)],Game_Battler[_0x3f08b3(0x24e)]['addDebuff']=function(_0x1ee231,_0x26cf59){const _0x44c2e5=_0x3f08b3;VisuMZ[_0x44c2e5(0x279)][_0x44c2e5(0x116)][_0x44c2e5(0x1a7)](this,_0x1ee231,_0x26cf59),this[_0x44c2e5(0x151)]()[_0x44c2e5(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x167)]=Game_Battler[_0x3f08b3(0x24e)]['removeBuff'],Game_Battler[_0x3f08b3(0x24e)]['removeBuff']=function(_0x33241a){const _0x376e5b=_0x3f08b3;VisuMZ[_0x376e5b(0x279)]['Game_Battler_removeBuff'][_0x376e5b(0x1a7)](this,_0x33241a),this['friendsUnit']()[_0x376e5b(0x104)]();},VisuMZ[_0x3f08b3(0x279)]['Game_Battler_forceAction']=Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0x16a)],Game_Battler[_0x3f08b3(0x24e)]['forceAction']=function(_0x48d08c,_0x548e87){const _0x19e9a9=_0x3f08b3;BattleManager[_0x19e9a9(0x133)]()?this[_0x19e9a9(0xb5)](_0x48d08c,_0x548e87):VisuMZ[_0x19e9a9(0x279)][_0x19e9a9(0x25a)][_0x19e9a9(0x1a7)](this,_0x48d08c,_0x548e87);},Game_Battler[_0x3f08b3(0x24e)][_0x3f08b3(0xb5)]=function(_0x510aab,_0x1cfd5d){const _0x2412d7=_0x3f08b3,_0x4ad312=new Game_Action(this,!![]);_0x4ad312['setSkill'](_0x510aab),_0x4ad312[_0x2412d7(0x249)]=!![];if(_0x1cfd5d===-0x2)_0x2412d7(0x15e)!=='cKdyV'?(_0xd4d020[_0x2412d7(0x279)]['Scene_Battle_createActorCommandWindow']['call'](this),_0x195554[_0x2412d7(0x133)]()&&this[_0x2412d7(0x2a9)]()):_0x4ad312[_0x2412d7(0x1ae)](this[_0x2412d7(0x264)]);else _0x1cfd5d===-0x1?_0x4ad312[_0x2412d7(0x148)]():_0x4ad312[_0x2412d7(0x1ae)](_0x1cfd5d);this[_0x2412d7(0x14e)][_0x2412d7(0x209)](_0x4ad312);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x1c1)]=BattleManager[_0x3f08b3(0x16a)],BattleManager['forceAction']=function(_0x65f2b5){const _0x2a7af0=_0x3f08b3;BattleManager[_0x2a7af0(0x133)]()?_0x2a7af0(0x24d)!==_0x2a7af0(0x24d)?_0x2f4b32[_0x2a7af0(0x14e)][_0x2a7af0(0x1b1)]():this[_0x2a7af0(0xb5)](_0x65f2b5):_0x2a7af0(0x176)===_0x2a7af0(0xa4)?_0x19034f=_0x22693f[_0x2a7af0(0xac)](_0x73c9fe,_0x47d3a6):VisuMZ[_0x2a7af0(0x279)]['BattleManager_forceAction'][_0x2a7af0(0x1a7)](this,_0x65f2b5);},BattleManager[_0x3f08b3(0xb5)]=function(_0x436b9d){const _0x26603e=_0x3f08b3,_0x279a75=JsonEx[_0x26603e(0x236)](_0x436b9d[_0x26603e(0x1dc)]());this[_0x26603e(0x246)][_0x26603e(0x24b)]([_0x436b9d,_0x279a75]);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x11b)]=Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0x190)],Game_Actor[_0x3f08b3(0x24e)]['selectNextCommand']=function(){const _0x5a1b79=_0x3f08b3;if(BattleManager[_0x5a1b79(0x133)]()){if(this[_0x5a1b79(0x277)]())this['battler']()[_0x5a1b79(0xf3)]();return![];}return VisuMZ[_0x5a1b79(0x279)][_0x5a1b79(0x11b)]['call'](this);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x12c)]=Game_Actor[_0x3f08b3(0x24e)]['changeEquip'],Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0x267)]=function(_0x3a4f2a,_0x2b5e91){const _0x27ee69=_0x3f08b3;VisuMZ[_0x27ee69(0x279)][_0x27ee69(0x12c)]['call'](this,_0x3a4f2a,_0x2b5e91),this[_0x27ee69(0x151)]()[_0x27ee69(0x104)]();},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x2ac)]=Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0xde)],Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0xde)]=function(_0x40f3ae,_0x483df6){const _0x2dce99=_0x3f08b3;VisuMZ['BattleSystemFTB'][_0x2dce99(0x2ac)][_0x2dce99(0x1a7)](this,_0x40f3ae,_0x483df6),this[_0x2dce99(0x151)]()[_0x2dce99(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x21c)]=Game_Actor[_0x3f08b3(0x24e)]['changeEquipById'],Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0x1bd)]=function(_0x2a4e28,_0x12e187){const _0x365eed=_0x3f08b3;VisuMZ[_0x365eed(0x279)]['Game_Actor_changeEquipById']['call'](this,_0x2a4e28,_0x12e187),this['friendsUnit']()[_0x365eed(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x208)]=Game_Actor['prototype'][_0x3f08b3(0x214)],Game_Actor[_0x3f08b3(0x24e)]['discardEquip']=function(_0x25233f){const _0x352706=_0x3f08b3;VisuMZ[_0x352706(0x279)][_0x352706(0x208)][_0x352706(0x1a7)](this,_0x25233f),this[_0x352706(0x151)]()[_0x352706(0x104)]();},VisuMZ[_0x3f08b3(0x279)]['Game_Actor_releaseUnequippableItems']=Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0xaf)],Game_Actor[_0x3f08b3(0x24e)][_0x3f08b3(0xaf)]=function(_0x55a44c){const _0x4b990b=_0x3f08b3;VisuMZ[_0x4b990b(0x279)][_0x4b990b(0xd5)]['call'](this,_0x55a44c),this[_0x4b990b(0x151)]()[_0x4b990b(0x104)]();},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x24c)]=Game_Actor[_0x3f08b3(0x24e)]['changeClass'],Game_Actor['prototype'][_0x3f08b3(0xf1)]=function(_0x3b9b28,_0x311e56){const _0x28d045=_0x3f08b3;VisuMZ['BattleSystemFTB'][_0x28d045(0x24c)][_0x28d045(0x1a7)](this,_0x3b9b28,_0x311e56),this[_0x28d045(0x151)]()[_0x28d045(0x104)]();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x142)]=Game_Enemy['prototype'][_0x3f08b3(0x1e4)],Game_Enemy[_0x3f08b3(0x24e)][_0x3f08b3(0x1e4)]=function(_0x2d2693){const _0x56f51c=_0x3f08b3;VisuMZ['BattleSystemFTB'][_0x56f51c(0x142)][_0x56f51c(0x1a7)](this,_0x2d2693),this['friendsUnit']()[_0x56f51c(0x104)]();},Game_Unit['_FTB_MAX_ACTIONS']=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x18d)][_0x3f08b3(0x244)],Game_Unit[_0x3f08b3(0x25f)]=VisuMZ[_0x3f08b3(0x279)]['Settings']['Mechanics'][_0x3f08b3(0x20c)],Game_Unit[_0x3f08b3(0x18e)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)]['Mechanics'][_0x3f08b3(0xbd)],Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x234)]=function(){const _0xa91795=_0x3f08b3;this[_0xa91795(0xa8)](),this[_0xa91795(0x28f)](this[_0xa91795(0x1f6)]());},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0xa8)]=function(){const _0x12b01c=_0x3f08b3;this[_0x12b01c(0x218)]=!![];let _0x2f12bb=0x0,_0x34e387=this[_0x12b01c(0x11f)]()['filter'](_0x599093=>_0x599093[_0x12b01c(0x23a)]());_0x2f12bb=_0x34e387[_0x12b01c(0x1ec)]((_0x588698,_0x52a0ae)=>_0x588698+_0x52a0ae[_0x12b01c(0x13b)](),_0x2f12bb),_0x2f12bb=_0x2f12bb['clamp'](Game_Unit[_0x12b01c(0x25f)],Game_Unit[_0x12b01c(0x1cf)]),this[_0x12b01c(0xf7)]=_0x2f12bb;},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x104)]=function(){const _0x5dc706=_0x3f08b3;if(!BattleManager['isFTB']())return;if(!$gameParty[_0x5dc706(0x29d)]())return;const _0x5e126d=this[_0x5dc706(0x1f6)]();this[_0x5dc706(0xa8)]();let _0x35d8a3=this[_0x5dc706(0x230)]();const _0x269823=this[_0x5dc706(0x1f6)]()-_0x5e126d;if(BattleManager[_0x5dc706(0x278)]&&_0x269823>0x0)_0x35d8a3+=_0x269823;if(BattleManager[_0x5dc706(0x1b5)]&&_0x269823<0x0)_0x35d8a3+=_0x269823;_0x35d8a3=Math[_0x5dc706(0x13a)](_0x35d8a3,Game_Unit[_0x5dc706(0x1cf)]),this[_0x5dc706(0x28f)](_0x35d8a3);},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x230)]=function(){const _0x4fe9cb=_0x3f08b3;return this[_0x4fe9cb(0x27d)]||0x0;},Game_Unit['prototype'][_0x3f08b3(0x28f)]=function(_0x490e44){const _0x3c7bd8=_0x3f08b3;this[_0x3c7bd8(0x27d)]=Math['round'](_0x490e44)[_0x3c7bd8(0x1d4)](0x0,Game_Unit[_0x3c7bd8(0x1cf)]),!Game_Unit['_FTB_ACTION_OVERFLOW']&&(this[_0x3c7bd8(0x27d)]=Math['min'](this[_0x3c7bd8(0x27d)],this[_0x3c7bd8(0x1f6)]()));},Game_Unit['prototype']['gainCurrentActionsFTB']=function(_0xacc97d){const _0xaa7089=_0x3f08b3;this[_0xaa7089(0x28f)](this[_0xaa7089(0x230)]()+_0xacc97d);},Game_Unit[_0x3f08b3(0x24e)]['loseCurrentActionsFTB']=function(_0x287bdf){this['gainCurrentActionsFTB'](-_0x287bdf);},Game_Unit[_0x3f08b3(0x24e)]['getMaxActionsFTB']=function(){const _0x476132=_0x3f08b3;return this[_0x476132(0xf7)]||0x0;},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x210)]=function(_0x34bedb){const _0x4da0b0=_0x3f08b3;this[_0x4da0b0(0xf7)]=_0x34bedb[_0x4da0b0(0x1d4)](Game_Unit[_0x4da0b0(0x25f)],Game_Unit[_0x4da0b0(0x1cf)]);},Game_Unit[_0x3f08b3(0x24e)]['reduceActionsFTB']=function(_0x432644){const _0xe1f04=_0x3f08b3;this[_0xe1f04(0x254)](_0x432644);},Game_Unit[_0x3f08b3(0x24e)]['canActFTB']=function(){const _0x798f2e=_0x3f08b3;if(BattleManager[_0x798f2e(0x118)]){if(this[_0x798f2e(0xf5)]()[_0x798f2e(0x129)](BattleManager[_0x798f2e(0x118)])){const _0x30d804=BattleManager[_0x798f2e(0x118)]['currentAction']();if(_0x30d804&&_0x30d804['_forceAction'])return!![];}}return this['_ftbActionsCur']=this[_0x798f2e(0x27d)]||0x0,this[_0x798f2e(0x27d)]>0x0;},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x1a5)]=function(){const _0x35f2d8=_0x3f08b3;for(const _0x3c9d32 of this['members']()){if(!_0x3c9d32)continue;const _0xaa80bd=_0x3c9d32[_0x35f2d8(0x175)]();_0x3c9d32[_0x35f2d8(0x1ca)](),_0x3c9d32['startDamagePopup'](),_0xaa80bd&&_0x3c9d32[_0x35f2d8(0x241)]()&&_0x3c9d32[_0x35f2d8(0x17c)]();}},Game_Unit[_0x3f08b3(0x24e)]['meetEndTurnConditionsFTB']=function(){const _0x4760eb=_0x3f08b3;if(this[_0x4760eb(0x230)]()<=0x0)return!![];if(!this['aliveMembers']()[_0x4760eb(0x29a)](_0x3d2214=>_0x3d2214['canMove']()))return!![];return![];},Game_Unit['prototype'][_0x3f08b3(0x158)]=function(){const _0x36c474=_0x3f08b3;for(const _0x519769 of this[_0x36c474(0xf5)]()){if(_0x36c474(0x288)===_0x36c474(0x288)){if(!_0x519769)continue;_0x519769[_0x36c474(0x1b2)](),_0x519769[_0x36c474(0x1fe)](0x2),_0x519769['updateBuffTurns'](),_0x519769[_0x36c474(0x231)]();}else{let _0xd89afc=_0x375b61['length'];while(_0xd89afc--){_0x232060[_0x36c474(0x14e)][_0x36c474(0x1b1)]();}_0x46edf8[_0x36c474(0x14e)]=_0x39940c[_0x36c474(0x297)](_0x28b071['_actions']);}}},Game_Unit['prototype']['clearPassTurnFTB']=function(){const _0x4dfe3b=_0x3f08b3;for(const _0x1095ce of this[_0x4dfe3b(0xf5)]()){if(_0x4dfe3b(0xf0)===_0x4dfe3b(0xf0)){if(!_0x1095ce)continue;_0x1095ce[_0x4dfe3b(0x276)]=![];}else _0x41ab9d['BattleSystemFTB'][_0x4dfe3b(0x112)][_0x4dfe3b(0x1a7)](this);}},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0xb0)]=function(){const _0x60cf1c=_0x3f08b3,_0x5f3778=this[_0x60cf1c(0xf5)]();return Math['min'](..._0x5f3778['map'](_0x36dec2=>_0x36dec2['agi']));},Game_Unit[_0x3f08b3(0x24e)]['ftbHighestAgility']=function(){const _0x294ddc=_0x3f08b3,_0x572317=this[_0x294ddc(0xf5)]();return Math[_0x294ddc(0xac)](..._0x572317['map'](_0x2de327=>_0x2de327[_0x294ddc(0x1e2)]));},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x12d)]=function(){const _0x417043=_0x3f08b3,_0x148113=this[_0x417043(0xf5)]();return _0x148113[_0x417043(0x1ec)]((_0x5ca2d1,_0x2a2b93)=>_0x5ca2d1+_0x2a2b93[_0x417043(0x1e2)],0x0);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x173)]=Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x1de)],Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x1de)]=function(_0x4b05c4){const _0x114c61=_0x3f08b3;VisuMZ[_0x114c61(0x279)][_0x114c61(0x173)]['call'](this,_0x4b05c4),BattleManager[_0x114c61(0x133)]()&&(_0x114c61(0x233)===_0x114c61(0x233)?this[_0x114c61(0xfc)]=0x0:_0x2d28b0['isTriggered']()&&this[_0x114c61(0xc2)](!![]));},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0x1f1)]=function(){const _0x4f3f1d=_0x3f08b3,_0xf7e500=this['aliveMembers']();if(BattleManager['_FTB_RESET_INDEX'])return _0xf7e500;if(BattleManager[_0x4f3f1d(0xff)])return _0xf7e500;this[_0x4f3f1d(0xfc)]=this[_0x4f3f1d(0xfc)]||0x0;while(!_0xf7e500[_0x4f3f1d(0x29a)](_0xb00a89=>_0xb00a89[_0x4f3f1d(0x253)]()===this[_0x4f3f1d(0xfc)])){const _0x3891bf=this[_0x4f3f1d(0xf5)](),_0x5b25f0=_0x3891bf[this['_ftbLastIndex']];let _0x13720e=_0x3891bf['indexOf'](_0x5b25f0)+0x1;if(_0x13720e>=_0x3891bf[_0x4f3f1d(0x1e0)])_0x13720e=0x0;this[_0x4f3f1d(0xfc)]=_0x13720e;}for(;;){const _0x492c22=_0xf7e500[0x0][_0x4f3f1d(0x253)]();if(_0x492c22===this[_0x4f3f1d(0xfc)])break;_0xf7e500['push'](_0xf7e500[_0x4f3f1d(0x114)]());}return _0xf7e500;},Game_Unit[_0x3f08b3(0x24e)][_0x3f08b3(0xb7)]=function(_0x429ee0){const _0x4e6c58=_0x3f08b3;this['_ftbLastIndex']=_0x429ee0?_0x429ee0['index']():0x0,this[_0x4e6c58(0xfc)]++;},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x1ef)]=Scene_Battle[_0x3f08b3(0x24e)][_0x3f08b3(0x24f)],Scene_Battle[_0x3f08b3(0x24e)][_0x3f08b3(0x24f)]=function(){const _0x44019d=_0x3f08b3;VisuMZ[_0x44019d(0x279)][_0x44019d(0x1ef)][_0x44019d(0x1a7)](this),BattleManager['isFTB']()&&(_0x44019d(0x1ad)===_0x44019d(0x1c7)?_0xc971e3[_0x44019d(0x279)]['BattleManager_forceAction'][_0x44019d(0x1a7)](this,_0x543d61):this['createActorCommandWindowFTB']());},Scene_Battle['prototype'][_0x3f08b3(0x2a9)]=function(){const _0x425809=_0x3f08b3,_0x5dfe92=this[_0x425809(0xd4)];this[_0x425809(0x17d)]()&&delete _0x5dfe92['_handlers'][_0x425809(0x280)];},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x1bc)]=Scene_Battle[_0x3f08b3(0x24e)]['commandCancel'],Scene_Battle[_0x3f08b3(0x24e)][_0x3f08b3(0x113)]=function(){const _0x203ebc=_0x3f08b3;if(BattleManager[_0x203ebc(0x133)]()){if(_0x203ebc(0x248)!==_0x203ebc(0x110))this[_0x203ebc(0x229)]();else{_0x7369fd=this[_0x203ebc(0x21e)]-_0xd209d4-_0x3a0b4b[_0x203ebc(0xfb)]-_0x4a54d4,_0xf6c4f5=_0xa4ada?this[_0x203ebc(0x1db)]-_0x2f4fa5[_0x203ebc(0x1eb)]-_0x581f81:_0x2d6754[_0x203ebc(0x1eb)];if(_0x4c1b41&&_0xdc5c6a)_0x55d81d-=_0x1dc9a6;else!_0x450650&&(_0x33bff9-=_0x10ddc8);}}else VisuMZ[_0x203ebc(0x279)][_0x203ebc(0x1bc)][_0x203ebc(0x1a7)](this);},Scene_Battle[_0x3f08b3(0x24e)][_0x3f08b3(0x229)]=function(){const _0x517e7e=_0x3f08b3;this[_0x517e7e(0x1e1)][_0x517e7e(0xb2)](),this['_actorCommandWindow']['close']();},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0xd9)]=Scene_Battle[_0x3f08b3(0x24e)]['commandFight'],Scene_Battle[_0x3f08b3(0x24e)][_0x3f08b3(0x1a1)]=function(){const _0x17a9e9=_0x3f08b3;BattleManager[_0x17a9e9(0x133)]()?this['startActorCommandSelection']():_0x17a9e9(0xed)!==_0x17a9e9(0xed)?(_0x2aa131[_0x17a9e9(0x279)]['Game_Battler_removeBuff'][_0x17a9e9(0x1a7)](this,_0x21365a),this[_0x17a9e9(0x151)]()[_0x17a9e9(0x104)]()):VisuMZ[_0x17a9e9(0x279)][_0x17a9e9(0xd9)][_0x17a9e9(0x1a7)](this);},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x2ab)]=Scene_Battle[_0x3f08b3(0x24e)]['createAllWindows'],Scene_Battle[_0x3f08b3(0x24e)]['createAllWindows']=function(){const _0x29bc73=_0x3f08b3;VisuMZ[_0x29bc73(0x279)][_0x29bc73(0x2ab)][_0x29bc73(0x1a7)](this),this[_0x29bc73(0x27b)]();},Scene_Battle[_0x3f08b3(0x24e)]['createActionCountWindowsFTB']=function(){const _0x452560=_0x3f08b3;if(!BattleManager[_0x452560(0x133)]())return;const _0x1887df=this[_0x452560(0x19e)](this[_0x452560(0x16b)]);this[_0x452560(0x172)]=new Window_FTB_ActionCount(),this['_ftbTroopActionCountWindow']['setUnit']($gameTroop),this['addChildAt'](this[_0x452560(0x172)],_0x1887df),this[_0x452560(0x1da)]=new Window_FTB_ActionCount(),this[_0x452560(0x1da)][_0x452560(0xb1)]($gameParty),this['addChildAt'](this[_0x452560(0x1da)],_0x1887df),this['repositionLogWindowFTB']();},Scene_Battle['prototype'][_0x3f08b3(0x1af)]=function(){const _0x2aa932=_0x3f08b3;if(!BattleManager['isFTB']())return;if(!this[_0x2aa932(0x14a)])return;const _0x5307e6=Window_FTB_ActionCount[_0x2aa932(0x26f)];if(_0x5307e6[_0x2aa932(0x11c)])return;this[_0x2aa932(0x14a)]['y']+=_0x5307e6[_0x2aa932(0x272)];},Window_Base['_FTB_COST_POSITION']=VisuMZ['BattleSystemFTB'][_0x3f08b3(0x26f)][_0x3f08b3(0x115)]['CostPosition'],Window_Base[_0x3f08b3(0x21d)]=VisuMZ[_0x3f08b3(0x279)]['Settings']['General'][_0x3f08b3(0xa9)],Window_Base['_FTB_COST_SHOW_GUARD']=VisuMZ[_0x3f08b3(0x279)]['Settings'][_0x3f08b3(0x115)][_0x3f08b3(0x1ce)],Window_Base[_0x3f08b3(0x265)]=VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x26f)][_0x3f08b3(0x115)][_0x3f08b3(0xc4)],Window_Base[_0x3f08b3(0x27a)]=VisuMZ[_0x3f08b3(0x279)]['Settings']['General'][_0x3f08b3(0x188)],VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x160)]=Window_Base['prototype']['makeAdditionalSkillCostText'],Window_Base[_0x3f08b3(0x24e)]['makeAdditionalSkillCostText']=function(_0x22512b,_0x1902f0,_0x2ed950){const _0x3eeb4d=_0x3f08b3;return _0x2ed950=VisuMZ[_0x3eeb4d(0x279)][_0x3eeb4d(0x160)][_0x3eeb4d(0x1a7)](this,_0x22512b,_0x1902f0,_0x2ed950),_0x2ed950=this[_0x3eeb4d(0xea)](_0x22512b,_0x1902f0,_0x2ed950),_0x2ed950;},VisuMZ[_0x3f08b3(0x279)][_0x3f08b3(0x120)]=Window_Base[_0x3f08b3(0x24e)][_0x3f08b3(0x27e)],Window_Base[_0x3f08b3(0x24e)][_0x3f08b3(0x27e)]=function(_0x201629,_0x2d5897,_0x42d077,_0x28a818){const _0x349333=_0x3f08b3;BattleManager[_0x349333(0x133)]()&&this['constructor']===Window_BattleItem?this[_0x349333(0x1a4)](_0x201629,_0x2d5897,_0x42d077,_0x28a818):VisuMZ[_0x349333(0x279)][_0x349333(0x120)][_0x349333(0x1a7)](this,_0x201629,_0x2d5897,_0x42d077,_0x28a818),this['resetFontSettings']();},Window_Base[_0x3f08b3(0x24e)][_0x3f08b3(0x1a4)]=function(_0x2ac185,_0x55e851,_0x4ecb45,_0x309fa1){const _0x11b641=_0x3f08b3,_0x3749f4=BattleManager['_actor']||$gameParty[_0x11b641(0xf5)]()[0x0],_0x264a2f=this[_0x11b641(0xea)](_0x3749f4,_0x2ac185,''),_0x4a7c3a=this[_0x11b641(0x1c3)](_0x264a2f)['width'],_0x1187f0=Window_Base[_0x11b641(0x147)];let _0x351a7c=_0x55e851+_0x309fa1-_0x4a7c3a;if(_0x264a2f==='')VisuMZ[_0x11b641(0x279)]['Window_Base_drawItemNumber'][_0x11b641(0x1a7)](this,_0x2ac185,_0x55e851,_0x4ecb45,_0x309fa1);else{if(this[_0x11b641(0x2a2)](_0x2ac185)){this[_0x11b641(0x217)]();const _0x16f7ee=VisuMZ[_0x11b641(0x271)]['Settings']['ItemScene'];this[_0x11b641(0x274)][_0x11b641(0x28c)]=_0x16f7ee[_0x11b641(0x131)];if(_0x1187f0){if(_0x11b641(0xe5)!==_0x11b641(0x219)){const _0x2454e5=_0x16f7ee[_0x11b641(0x10d)],_0x5508d8=_0x2454e5['format']($gameParty[_0x11b641(0x260)](_0x2ac185)),_0x56ea02=this[_0x11b641(0xce)](_0x5508d8+this[_0x11b641(0x18c)]());_0x351a7c-=_0x56ea02;}else _0x19b753[_0x11b641(0x279)][_0x11b641(0xd5)]['call'](this,_0x339212),this['friendsUnit']()['recalculateActionsFTB']();}else _0x309fa1-=this['textWidth'](this[_0x11b641(0x18c)]())+_0x4a7c3a;VisuMZ['BattleSystemFTB'][_0x11b641(0x120)][_0x11b641(0x1a7)](this,_0x2ac185,_0x55e851,_0x4ecb45,_0x309fa1);}}this[_0x11b641(0x184)](_0x264a2f,_0x351a7c,_0x4ecb45);},Window_Base[_0x3f08b3(0x24e)]['makeAdditionalCostTextFTB']=function(_0x333a15,_0x369993,_0x1be983){const _0xcd7a93=_0x3f08b3;if(!BattleManager[_0xcd7a93(0x133)]())return _0x1be983;if(!_0x333a15)return _0x1be983;if(!_0x369993)return _0x1be983;if(_0x369993[_0xcd7a93(0xc8)][_0xcd7a93(0x1fb)](VisuMZ[_0xcd7a93(0x279)]['RegExp'][_0xcd7a93(0xee)]))return _0x1be983;let _0x14e325=DataManager['getActionCostFTB'](_0x369993);const _0x1df0bd=Window_Base[_0xcd7a93(0x147)],_0x3ca2e1=Window_Base[_0xcd7a93(0x21d)],_0x1c2365=Window_Base[_0xcd7a93(0x1f2)],_0x2d3a7d=Window_Base[_0xcd7a93(0x265)],_0x51a7a2=Window_Base[_0xcd7a93(0x27a)];if(_0x369993[_0xcd7a93(0xc8)][_0xcd7a93(0x1fb)](VisuMZ[_0xcd7a93(0x279)][_0xcd7a93(0xe4)][_0xcd7a93(0x29b)])){if(_0x14e325<0x0)return _0x1be983;}else{if(_0xcd7a93(0x250)===_0xcd7a93(0x13f)){if(_0x15ca68===_0x4700e8)return;if(_0x1cc116['battler']())_0x8f6d3f[_0xcd7a93(0x277)]()[_0xcd7a93(0x155)]();this['playCursorSound'](),_0x1744e1['_subject']=_0x5c4827,_0x35a08c[_0xcd7a93(0x1c6)]=_0x30cba2,_0x230ff8[_0xcd7a93(0x162)](),_0x45276f[_0xcd7a93(0x295)][_0xcd7a93(0x9f)]();}else{if(DataManager['isSkill'](_0x369993)&&this[_0xcd7a93(0x146)]===Window_ActorCommand){if(_0xcd7a93(0x1ea)==='XPSJG')this[_0xcd7a93(0xd1)]()[_0xcd7a93(0x215)]();else{if(!_0x3ca2e1&&_0x369993['id']===_0x333a15[_0xcd7a93(0xeb)]())return _0x1be983;if(!_0x1c2365&&_0x369993['id']===_0x333a15[_0xcd7a93(0x29c)]())return _0x1be983;}}if(_0x14e325<0x0)return _0x1be983;if(!_0x2d3a7d&&_0x14e325===0x0)return _0x1be983;if(!_0x51a7a2&&_0x14e325===0x1)return _0x1be983;}}const _0x377e1d='\x5cI[%1]'['format'](ImageManager[_0xcd7a93(0x223)]),_0x4ddcba=TextManager[_0xcd7a93(0x1fc)];let _0x4d6995=TextManager[_0xcd7a93(0x1a3)]['format'](_0x14e325,_0x4ddcba,_0x377e1d);if(_0x1be983===''){if('fciNN'!==_0xcd7a93(0x15c)){if(_0x13ee36[_0xcd7a93(0x28a)]()&&_0x17d631[_0xcd7a93(0x133)]()){const _0x5818e0=_0x1ee75a['getActionCostFTB'](_0x472e06);if(_0x5818e0>this[_0xcd7a93(0x151)]()[_0xcd7a93(0x230)]())return![];}return _0x4fbdd6['BattleSystemFTB'][_0xcd7a93(0x2a1)][_0xcd7a93(0x1a7)](this,_0x23a58);}else _0x1be983+=_0x4d6995;}else _0x1df0bd?_0x1be983=_0x4d6995+this[_0xcd7a93(0x18c)]()+_0x1be983:_0x1be983=_0x1be983+this[_0xcd7a93(0x18c)]()+_0x4d6995;return _0x1be983;},VisuMZ[_0x3f08b3(0x279)]['Window_Help_setItem']=Window_Help[_0x3f08b3(0x24e)]['setItem'],Window_Help['prototype'][_0x3f08b3(0x1e3)]=function(_0x4ecd78){const _0x4f4c66=_0x3f08b3;BattleManager[_0x4f4c66(0x133)]()&&_0x4ecd78&&_0x4ecd78[_0x4f4c66(0xc8)]&&_0x4ecd78[_0x4f4c66(0xc8)]['match'](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?_0x4f4c66(0x22e)!==_0x4f4c66(0xb6)?this['setText'](String(RegExp['$1'])):_0x3a5166['_FTB_GUARD_PASS']&&this[_0x4f4c66(0xd1)]()['passTurnFTB']():VisuMZ[_0x4f4c66(0x279)][_0x4f4c66(0x105)]['call'](this,_0x4ecd78);},Window_Selectable['prototype'][_0x3f08b3(0x1cc)]=function(){const _0x5dbcbe=_0x3f08b3;return this[_0x5dbcbe(0x146)]===Window_ActorCommand&&BattleManager['isFTB']()&&BattleManager[_0x5dbcbe(0xff)];},VisuMZ[_0x3f08b3(0x279)]['Window_Selectable_cursorRight']=Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x14d)],Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x14d)]=function(_0x4989c4){const _0x31e47f=_0x3f08b3;this[_0x31e47f(0x1cc)]()&&this['maxCols']()===0x1?this[_0x31e47f(0xa6)](!![]):VisuMZ[_0x31e47f(0x279)][_0x31e47f(0x213)][_0x31e47f(0x1a7)](this,_0x4989c4);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x224)]=Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x26d)],Window_Selectable['prototype'][_0x3f08b3(0x26d)]=function(_0x2519ba){const _0x34de0c=_0x3f08b3;this[_0x34de0c(0x1cc)]()&&this[_0x34de0c(0x14b)]()===0x1?this[_0x34de0c(0xa6)](![]):VisuMZ['BattleSystemFTB'][_0x34de0c(0x224)]['call'](this,_0x2519ba);},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x26b)]=Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x1b4)],Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x1b4)]=function(){const _0x1b7083=_0x3f08b3;if(this[_0x1b7083(0x1cc)]())this[_0x1b7083(0xa6)](!![]);else{if(_0x1b7083(0x16d)!==_0x1b7083(0x16d))return _0x5ec9bf['DefaultCostSkill'];else VisuMZ[_0x1b7083(0x279)]['Window_Selectable_cursorPagedown'][_0x1b7083(0x1a7)](this);}},VisuMZ['BattleSystemFTB'][_0x3f08b3(0x170)]=Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x232)],Window_Selectable['prototype'][_0x3f08b3(0x232)]=function(){const _0x6078c1=_0x3f08b3;if(this[_0x6078c1(0x1cc)]())this[_0x6078c1(0xa6)](![]);else{if(_0x6078c1(0x207)===_0x6078c1(0x207))VisuMZ[_0x6078c1(0x279)][_0x6078c1(0x170)][_0x6078c1(0x1a7)](this);else{const _0x5c8c62=_0x59a75a[_0x6078c1(0x20f)](_0x39266c);if(_0x5c8c62>this['friendsUnit']()[_0x6078c1(0x230)]())return![];}}},Window_ActorCommand[_0x3f08b3(0x24e)][_0x3f08b3(0xa6)]=function(_0x55ff56){const _0x21db4a=_0x3f08b3,_0x3d82e6=BattleManager[_0x21db4a(0x1c6)];let _0x5a6a3e=$gameParty[_0x21db4a(0xcf)]()[_0x21db4a(0x153)](_0x3d82e6);const _0x1dfedf=$gameParty[_0x21db4a(0xcf)]()[_0x21db4a(0x1e0)]-0x1;let _0x54c5fb=$gameParty['battleMembers']()[_0x5a6a3e];for(;;){_0x5a6a3e+=_0x55ff56?0x1:-0x1;if(_0x5a6a3e<0x0)_0x5a6a3e=_0x1dfedf;if(_0x5a6a3e>_0x1dfedf)_0x5a6a3e=0x0;_0x54c5fb=$gameParty[_0x21db4a(0xcf)]()[_0x5a6a3e];if(_0x54c5fb&&_0x54c5fb[_0x21db4a(0x189)]()&&!_0x54c5fb[_0x21db4a(0x19b)]())break;if(_0x54c5fb===_0x3d82e6)break;}this[_0x21db4a(0xfe)](_0x3d82e6,_0x54c5fb);},Window_ActorCommand[_0x3f08b3(0x24e)][_0x3f08b3(0xfe)]=function(_0x436b93,_0x59c762){const _0x21b3ac=_0x3f08b3;if(_0x436b93===_0x59c762)return;if(_0x436b93['battler']())_0x436b93[_0x21b3ac(0x277)]()[_0x21b3ac(0x155)]();this[_0x21b3ac(0x20e)](),BattleManager[_0x21b3ac(0x118)]=_0x59c762,BattleManager['_currentActor']=_0x59c762,BattleManager['startActorInput'](),SceneManager[_0x21b3ac(0x295)][_0x21b3ac(0x9f)]();},VisuMZ[_0x3f08b3(0x279)]['Window_Selectable_processTouch']=Window_Selectable[_0x3f08b3(0x24e)][_0x3f08b3(0x192)],Window_Selectable[_0x3f08b3(0x24e)]['processTouch']=function(){const _0x1fff1c=_0x3f08b3;BattleManager[_0x1fff1c(0x133)]()&&BattleManager['_FTB_FREE_CHANGE']&&this[_0x1fff1c(0x146)]===Window_BattleStatus?_0x1fff1c(0x19c)===_0x1fff1c(0x1e7)?this[_0x1fff1c(0x119)](...arguments):this[_0x1fff1c(0x238)]():VisuMZ[_0x1fff1c(0x279)][_0x1fff1c(0x136)][_0x1fff1c(0x1a7)](this);},Window_BattleStatus[_0x3f08b3(0x24e)][_0x3f08b3(0x238)]=function(){const _0x2c67ba=_0x3f08b3;this['isOpen']()&&(TouchInput[_0x2c67ba(0xf9)]()&&this['onTouchSelectFTB'](!![]));},Window_BattleStatus[_0x3f08b3(0x24e)][_0x3f08b3(0xc2)]=function(_0x5dd917){const _0x90bf82=_0x3f08b3,_0x50c307=SceneManager['_scene'][_0x90bf82(0xd4)];if(!_0x50c307)return;if(!_0x50c307['active'])return;this['_doubleTouch']=![];const _0x32336e=this[_0x90bf82(0x253)](),_0x190395=this[_0x90bf82(0xc0)]();if(_0x190395>=0x0){const _0x28cc5f=$gameParty['battleMembers']()[_0x32336e],_0x2af509=$gameParty['battleMembers']()[_0x190395];if(this['canActorBeSelectedFTB'](_0x2af509)){if(_0x90bf82(0xd2)===_0x90bf82(0xd2)){if(_0x190395===this[_0x90bf82(0x253)]()){if('SNdIG'===_0x90bf82(0xda))this[_0x90bf82(0xc5)]=!![];else return this[_0x90bf82(0x295)]&&this[_0x90bf82(0x295)][_0x90bf82(0x146)]===_0x34b6d4;}this[_0x90bf82(0x1f5)](_0x190395),_0x50c307[_0x90bf82(0xfe)](_0x28cc5f,_0x2af509);}else _0x1877a3['performTurnEndFTB']();}}},Window_BattleStatus['prototype'][_0x3f08b3(0x1e6)]=function(_0x3a4fe5){const _0xf55731=_0x3f08b3;if(!_0x3a4fe5)return![];if(!_0x3a4fe5[_0xf55731(0x23a)]())return![];if(!_0x3a4fe5['canInput']())return![];if(_0x3a4fe5['isPassingTurnFTB']())return![];return!![];};function Window_FTB_ActionCount(){this['initialize'](...arguments);}Window_FTB_ActionCount['prototype']=Object[_0x3f08b3(0x1d6)](Window_Base[_0x3f08b3(0x24e)]),Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0x146)]=Window_FTB_ActionCount,Window_FTB_ActionCount[_0x3f08b3(0x26f)]=VisuMZ[_0x3f08b3(0x279)]['Settings'][_0x3f08b3(0x124)],Window_FTB_ActionCount['prototype'][_0x3f08b3(0x119)]=function(){const _0x28b34f=_0x3f08b3,_0x10ebc0=this[_0x28b34f(0x291)]();Window_Base['prototype'][_0x28b34f(0x119)][_0x28b34f(0x1a7)](this,_0x10ebc0),this[_0x28b34f(0x220)](0x0),this[_0x28b34f(0xef)](),this['opacity']=0x0;},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0x291)]=function(){const _0x2bef2d=_0x3f08b3;return new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x2bef2d(0xbf)]);},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0xef)]=function(){const _0x4604cf=_0x3f08b3;this[_0x4604cf(0x198)]=null,this[_0x4604cf(0x1bf)]=0x0,this[_0x4604cf(0x1aa)]=0x0;const _0x17f4fa=Window_FTB_ActionCount['Settings'];this[_0x4604cf(0x25c)]={'ActorPicture':_0x17f4fa[_0x4604cf(0x206)]?ImageManager[_0x4604cf(0xf8)](_0x17f4fa[_0x4604cf(0x206)]):'','EnemyPicture':_0x17f4fa[_0x4604cf(0x20b)]?ImageManager[_0x4604cf(0xf8)](_0x17f4fa['EnemyActionPicture']):'','EmptyPicture':_0x17f4fa['EmptyActionPicture']?ImageManager[_0x4604cf(0xf8)](_0x17f4fa['EmptyActionPicture']):''};},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0x168)]=function(){this['padding']=0x0;},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0xb1)]=function(_0xa55c02){const _0x4a436f=_0x3f08b3;this[_0x4a436f(0x198)]=_0xa55c02,this['update']();},Window_FTB_ActionCount['prototype'][_0x3f08b3(0x23e)]=function(){const _0x1442d5=_0x3f08b3;Window_Base['prototype'][_0x1442d5(0x23e)][_0x1442d5(0x1a7)](this),this[_0x1442d5(0x1c9)](),this['updatePosition'](),this[_0x1442d5(0x194)]();},Window_FTB_ActionCount['prototype'][_0x3f08b3(0x1c9)]=function(){const _0x57ebfe=_0x3f08b3;if(!this[_0x57ebfe(0x198)])return;(this[_0x57ebfe(0x1bf)]!==this['_unit']['getCurrentActionsFTB']()||this['_maxActions']!==this[_0x57ebfe(0x198)][_0x57ebfe(0x1f6)]())&&(this[_0x57ebfe(0x1bf)]=this[_0x57ebfe(0x198)][_0x57ebfe(0x230)](),this[_0x57ebfe(0x1aa)]=this[_0x57ebfe(0x198)][_0x57ebfe(0x1f6)](),this[_0x57ebfe(0x281)]());},Window_FTB_ActionCount[_0x3f08b3(0x24e)]['updateVisibility']=function(){const _0x4b0409=_0x3f08b3;this[_0x4b0409(0x1d8)]=$gameSystem[_0x4b0409(0x1f0)]();},Window_FTB_ActionCount[_0x3f08b3(0x24e)]['refresh']=function(){const _0x4e35e3=_0x3f08b3;this['contents'][_0x4e35e3(0x287)]();if(!this['_unit'])return;const _0x478776=Window_FTB_ActionCount[_0x4e35e3(0x26f)];if(!_0x478776)return;const _0x20f2fd=this['createStartingCoordinates'](),_0x52f11e=this[_0x4e35e3(0x275)](),_0x3d84a8=_0x478776['ImageSize']+_0x478776['ImageGapDistance'],_0x31f99d=_0x478776[_0x4e35e3(0x9d)];let _0x199a9b=_0x20f2fd['x'],_0x91c040=_0x20f2fd['y'];while(_0x52f11e[_0x4e35e3(0x1e0)]>_0x478776[_0x4e35e3(0xb9)]){_0x4e35e3(0x1e8)!=='zraxb'?(_0xaae20[_0x4e35e3(0x279)][_0x4e35e3(0x142)][_0x4e35e3(0x1a7)](this,_0x2fa246),this[_0x4e35e3(0x151)]()['recalculateActionsFTB']()):_0x52f11e[_0x4e35e3(0x114)]();}while(_0x52f11e['length']>0x0){const _0x49252b=_0x52f11e[_0x4e35e3(0x114)]();this[_0x4e35e3(0x1d7)](_0x49252b,_0x199a9b,_0x91c040,_0x52f11e[_0x4e35e3(0x1e0)]);if(_0x31f99d)_0x199a9b+=_0x3d84a8;else{if(_0x4e35e3(0xe8)!=='GktFU')return _0xf3ec06['isFTB']()?this[_0x4e35e3(0x1d3)]||0x0:_0x4afc6b['BattleSystemFTB'][_0x4e35e3(0x137)][_0x4e35e3(0x1a7)](this);else _0x91c040+=_0x3d84a8;}}},Window_FTB_ActionCount['prototype'][_0x3f08b3(0x161)]=function(){const _0xef793=_0x3f08b3,_0x596b6d=Window_FTB_ActionCount['Settings'],_0x4dcb27=this[_0xef793(0x198)]===$gameParty,_0x47008a=_0x596b6d['ImageSize'],_0x489d40=_0x47008a*(_0x596b6d[_0xef793(0xb9)]-0x1)+_0x596b6d[_0xef793(0x258)]*(_0x596b6d['MaxVisible']-0x2),_0x1895c3=_0x596b6d[_0xef793(0x9d)],_0x333824=SceneManager['_scene']['_statusWindow'][_0xef793(0xbf)];let _0x4bdd6f=0x0,_0x10dbd4=0x0;const _0x3b929c=_0x596b6d[_0xef793(0x11c)];if(_0x3b929c){_0x10dbd4=this[_0xef793(0x21e)]-_0x333824-_0x596b6d[_0xef793(0xfb)]-_0x47008a,_0x4bdd6f=_0x4dcb27?this['innerWidth']-_0x596b6d[_0xef793(0x1eb)]-_0x47008a:_0x596b6d['ScreenBufferX'];if(_0x1895c3&&_0x4dcb27)_0x4bdd6f-=_0x489d40;else!_0x1895c3&&(_0xef793(0x9e)!==_0xef793(0xa1)?_0x10dbd4-=_0x489d40:(_0x160484[_0xef793(0x279)]['Game_Actor_discardEquip'][_0xef793(0x1a7)](this,_0x1b1512),this['friendsUnit']()['recalculateActionsFTB']()));}else _0x10dbd4=_0x596b6d['ScreenBufferY'],_0x4bdd6f=_0x4dcb27?this[_0xef793(0x1db)]-_0x596b6d[_0xef793(0x1eb)]-_0x47008a:_0x596b6d[_0xef793(0x1eb)],_0x1895c3&&_0x4dcb27&&(_0x4bdd6f-=_0x489d40);return _0x4bdd6f+=_0x4dcb27?_0x596b6d[_0xef793(0x11e)]:_0x596b6d[_0xef793(0x196)],_0x10dbd4+=_0x4dcb27?_0x596b6d['ActorOffsetY']:_0x596b6d[_0xef793(0x16f)],new Point(Math[_0xef793(0x15d)](_0x4bdd6f),Math[_0xef793(0x15d)](_0x10dbd4));},Window_FTB_ActionCount['prototype']['createContentsArray']=function(){const _0x4bb506=_0x3f08b3,_0x5eb603=Window_FTB_ActionCount[_0x4bb506(0x26f)];let _0x41a69a=!![];if(_0x5eb603[_0x4bb506(0x9d)]){if(this['_unit']===$gameParty)_0x41a69a=!_0x41a69a;}else{if(_0x4bb506(0x130)!==_0x4bb506(0x1b7))_0x41a69a=!_0x5eb603[_0x4bb506(0x11c)];else return _0x1d569e?_0x1298c9===0x0:_0x908ff6===_0x37f547[_0x4bb506(0xb9)]-0x1;}let _0x45d390=this[_0x4bb506(0x198)][_0x4bb506(0x230)](),_0x29393c=Math['max'](0x0,this[_0x4bb506(0x198)]['getMaxActionsFTB']()-_0x45d390);const _0x536193=[];while(_0x45d390--){if(_0x4bb506(0x261)==='OPgcX'){const _0x370c11=_0x4bb506(0x21b);_0x536193[_0x4bb506(0x24b)](_0x370c11);}else this['ftbFreeRangeSwitch']()?this[_0x4bb506(0xa6)](!![]):_0x54fe87['BattleSystemFTB']['Window_Selectable_cursorPagedown'][_0x4bb506(0x1a7)](this);}while(_0x29393c--){const _0x173219='Empty';if(_0x41a69a)_0x536193[_0x4bb506(0x24b)](_0x173219);else{if(_0x4bb506(0x132)==='WZmMj'){if(!_0x6ab23a[_0x4bb506(0x133)]())return;}else _0x536193['unshift'](_0x173219);}}while(_0x536193[_0x4bb506(0x1e0)]<0xa){if(_0x4bb506(0x29f)===_0x4bb506(0x29f)){const _0x3c0517=_0x4bb506(0x101);_0x41a69a?_0x536193['push'](_0x3c0517):_0x536193['unshift'](_0x3c0517);}else{_0x1e9561[_0x4bb506(0x165)](_0x17ac8d,_0x448b7a);const _0x1f8f58=_0x4814e8[_0x4bb506(0x237)];_0x3968c1[_0x4bb506(0x12f)](_0x1f8f58);}}return _0x536193;},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0x1d7)]=function(_0x2c4b19,_0xcf83d5,_0x52e236,_0x26d587){const _0x4f9043=_0x3f08b3;if(_0x2c4b19===_0x4f9043(0x101))return;if(_0x2c4b19==='Current')_0x2c4b19=this[_0x4f9043(0x198)]===$gameParty?_0x4f9043(0x25b):_0x4f9043(0x140);const _0x37fa12=Window_FTB_ActionCount[_0x4f9043(0x26f)];if(_0x37fa12[_0x4f9043(0xcd)[_0x4f9043(0xa5)](_0x2c4b19)]){const _0x370eff=_0x37fa12[_0x4f9043(0xcd)[_0x4f9043(0xa5)](_0x2c4b19)],_0x45527a=ImageManager[_0x4f9043(0xf8)](_0x370eff);_0x45527a[_0x4f9043(0x150)](this[_0x4f9043(0x141)][_0x4f9043(0x225)](this,_0x45527a,_0xcf83d5,_0x52e236,_0x26d587));}else{const _0x45a21d=ImageManager['ftb%1ActionsIcon'['format'](_0x2c4b19)];this[_0x4f9043(0x1f9)](_0x45a21d,_0xcf83d5,_0x52e236);if(this[_0x4f9043(0x156)](_0x26d587)){if(_0x4f9043(0x127)===_0x4f9043(0x1dd)){if(this[_0x4f9043(0x133)]())return;_0x204f0f[_0x4f9043(0x279)][_0x4f9043(0x185)][_0x4f9043(0x1a7)](this);}else this['drawActionsRemaining'](_0xcf83d5,_0x52e236);}}},Window_FTB_ActionCount['prototype']['drawPicture']=function(_0x21131d,_0x11b1bf,_0x755378,_0x484596){const _0x2ff7f2=_0x3f08b3;if(!_0x21131d)return;const _0x2414d1=Window_FTB_ActionCount[_0x2ff7f2(0x26f)],_0x5a263c=_0x2414d1['ImageSize'],_0x1742a6=_0x5a263c/_0x21131d['width'],_0x3524b6=_0x5a263c/_0x21131d[_0x2ff7f2(0xbf)],_0xa630e7=Math[_0x2ff7f2(0x13a)](_0x1742a6,_0x3524b6,0x1),_0x5c561f=_0x21131d['height'],_0x3cc7cb=_0x21131d['height'],_0x40f17e=Math[_0x2ff7f2(0x15d)](_0x5c561f*_0xa630e7),_0x4eb2a1=Math[_0x2ff7f2(0x15d)](_0x3cc7cb*_0xa630e7),_0x426c31=Math[_0x2ff7f2(0x15d)](_0x11b1bf+(_0x5a263c-_0x40f17e)/0x2),_0x179ad0=Math[_0x2ff7f2(0x15d)](_0x755378+(_0x5a263c-_0x4eb2a1)/0x2);this[_0x2ff7f2(0x274)][_0x2ff7f2(0x1d2)][_0x2ff7f2(0x247)]=_0x2414d1[_0x2ff7f2(0x23c)],this['contents'][_0x2ff7f2(0x222)](_0x21131d,0x0,0x0,_0x5c561f,_0x3cc7cb,_0x426c31,_0x179ad0,_0x40f17e,_0x4eb2a1),this['contents'][_0x2ff7f2(0x1d2)][_0x2ff7f2(0x247)]=!![];if(this['canDrawActionsRemaining'](_0x484596)){if(_0x2ff7f2(0x1ac)!=='fCNUQ')this[_0x2ff7f2(0x29e)](_0x11b1bf,_0x755378);else{if(!_0xc79b3a)return;if(!_0x403a96[_0x2ff7f2(0x28a)]())return;if(!_0x208227[_0x2ff7f2(0x133)]())return;const _0x317e58=_0x378db9[_0x2ff7f2(0xd6)];if(_0x317e58&&_0x317e58[_0x2ff7f2(0x249)])return;const _0x4a96ab=_0x5bbf04[_0x2ff7f2(0x20f)](_0x2fdd32);this[_0x2ff7f2(0x151)]()[_0x2ff7f2(0xd3)](_0x4a96ab);}}},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0x1f9)]=function(_0x28f4d0,_0x1cf8e6,_0x12f8e0){const _0x40333e=_0x3f08b3,_0x41d3d7=Window_FTB_ActionCount[_0x40333e(0x26f)];let _0xfcded3=_0x41d3d7[_0x40333e(0x107)];const _0x5e69a4=ImageManager[_0x40333e(0x11d)]('IconSet'),_0x87fd00=ImageManager[_0x40333e(0x1cd)],_0x964a5f=ImageManager['iconHeight'],_0x2955ed=_0x28f4d0%0x10*_0x87fd00,_0x3026c5=Math[_0x40333e(0x1f3)](_0x28f4d0/0x10)*_0x964a5f;this[_0x40333e(0x274)][_0x40333e(0x1d2)]['imageSmoothingEnabled']=_0x41d3d7['IconSmoothing'],this[_0x40333e(0x274)][_0x40333e(0x222)](_0x5e69a4,_0x2955ed,_0x3026c5,_0x87fd00,_0x964a5f,_0x1cf8e6,_0x12f8e0,_0xfcded3,_0xfcded3),this[_0x40333e(0x274)]['_context'][_0x40333e(0x247)]=!![];},Window_FTB_ActionCount['prototype'][_0x3f08b3(0x102)]=function(){const _0xba8ba5=_0x3f08b3,_0x29d6b2=Window_FTB_ActionCount[_0xba8ba5(0x26f)];if(_0x29d6b2['BottomPosition'])return;if(!_0x29d6b2[_0xba8ba5(0x1d1)])return;const _0x5719a5=SceneManager[_0xba8ba5(0x295)][_0xba8ba5(0x171)];if(!_0x5719a5)return;if(_0x5719a5['visible']){if('qUyMv'===_0xba8ba5(0x1c4))this['x']=_0x29d6b2[_0xba8ba5(0xdc)]||0x0,this['y']=_0x29d6b2['RepositionTopHelpY']||0x0;else{if(!_0x974967[_0xba8ba5(0x133)]())return;this[_0xba8ba5(0x259)]=_0x3a9319,_0xeb034[_0xba8ba5(0x234)](),_0x1201a5['startTurnFTB']();}}else this['x']=0x0,this['y']=0x0;},Window_FTB_ActionCount['prototype']['canDrawActionsRemaining']=function(_0x3bcabe){const _0x3c1bc8=_0x3f08b3,_0x59de6c=Window_FTB_ActionCount[_0x3c1bc8(0x26f)];if(!_0x59de6c[_0x3c1bc8(0x1b8)])return![];const _0x4f4ba6=_0x59de6c[_0x3c1bc8(0x11c)],_0x50641a=_0x59de6c['DrawHorz'],_0x5158f2=this[_0x3c1bc8(0x198)]===$gameParty;if(_0x50641a)return _0x5158f2?_0x3bcabe===0x0:_0x3bcabe===_0x59de6c[_0x3c1bc8(0xb9)]-0x1;else return _0x4f4ba6?_0x3bcabe===0x0:_0x3bcabe===_0x59de6c['MaxVisible']-0x1;},Window_FTB_ActionCount[_0x3f08b3(0x24e)][_0x3f08b3(0x29e)]=function(_0x12f78d,_0x137858){const _0x4a1d88=_0x3f08b3;this[_0x4a1d88(0x217)]();const _0x3362e8=Window_FTB_ActionCount[_0x4a1d88(0x26f)],_0x243040=new Rectangle(_0x12f78d,_0x137858,_0x3362e8['ImageSize'],_0x3362e8[_0x4a1d88(0x107)]);_0x243040['x']+=_0x3362e8['ActionsRemainingOffsetX'],_0x243040['y']+=_0x3362e8[_0x4a1d88(0x205)];const _0x5ea0b8=this[_0x4a1d88(0x198)][_0x4a1d88(0x230)]();this['contents'][_0x4a1d88(0x28c)]=_0x3362e8['ActionsRemainingFontSize'],this[_0x4a1d88(0x274)][_0x4a1d88(0x242)](_0x5ea0b8,_0x243040['x'],_0x243040['y'],_0x243040[_0x4a1d88(0x1c0)],_0x243040[_0x4a1d88(0xbf)],'center'),this[_0x4a1d88(0x217)]();};