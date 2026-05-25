//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_1_SkillsStatesCore
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
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
 *
 * ---
 * 
 * VisuMZ_3_ActiveChainSkills
 * 
 * Boosts now carry over across the entire chain and granting bonuses to all
 * chained skills instead of just the first skill of the chain. The bonus
 * effects of the boosts will end when the chains end.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Sealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost[text]         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0[text]        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x[text]      The text inside the brackets will only appear if at
 *                      least x Boosts are used.
 * 
 * \boost>x[text]       The text inside the brackets will only appear if more
 *                      than x Boosts are used.
 * 
 * \boost=x[text]       The text inside the brackets will only appear if
 *                      exactly x Boosts are used.
 * 
 * \boost<x[text]       The text inside the brackets will only appear if less
 *                      than x Boosts are used.
 * 
 * \boost<=x[text]      The text inside the brackets will only appear if at
 *                      most x Boosts are used.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
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
 * Version 1.09: March 14, 2024
 * * Feature Update!
 * ** Removed VisuMZ_1_MessageCore dependency.
 * 
 * Version 1.08: October 12, 2023
 * * Documentation Update!
 * ** Fixed a typo found within a notetag:
 * *** <Boost Stealed> should be <Boost Sealed>.
 * **** That is some massive Engrish there, Olivia.
 * ***** Don't sneak these kinds of comments in. They're not funny.
 * 
 * Version 1.07: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles. Update made by Olivia.
 * 
 * Version 1.06: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a crash that would occur with <Seal Attack> notetag on any actor
 *    that focuses on auto-battle. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added better compatibility with Active Chain Skills. Boosts now carry
 *    over across the entire chain and granting bonuses to all chained skills
 *    instead of just the first skill of the chain. The bonus effects of the
 *    boosts will end when the chains end.
 * * Documentation Update!
 * ** Added section to "VisuStella MZ Compatibility"
 * *** VisuMZ_3_ActiveChainSkills
 * **** Boosts now carry over across the entire chain and granting bonuses to
 *      all chained skills instead of just the first skill of the chain. The
 *      bonus effects of the boosts will end when the chains end.
 * 
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
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
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
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
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

//=============================================================================
// Setup Plugin Parameters
//=============================================================================

var label = 'BoostAction';
var tier = tier || 0;
var dependencies = ['VisuMZ_0_CoreEngine','VisuMZ_1_BattleCore','VisuMZ_1_SkillsStatesCore'];
var pluginData = $plugins.filter(function(p) { return p.status && p.description.includes('['+label+']') })[0];
VisuMZ[label].Settings = VisuMZ[label].Settings || {};

VisuMZ.ConvertParams = function(obj, data) {
    for (const key in data) {
        if (key.match(/(.*):(.*)/i)) {
            // Key and Type
            const objKey = String(RegExp.$1);
            const objType = String(RegExp.$2).toUpperCase().trim();

            // Parse Data
            let value; let arr; let newData;
            switch (objType) {
                case 'NUM':
                    value = data[key] !== '' ? Number(data[key]) : 0;
                    break;
                case 'ARRAYNUM':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => Number(i));
                    break;
                case 'EVAL':
                    value = data[key] !== '' ? eval(data[key]) : null;
                    break;
                case 'ARRAYEVAL':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => eval(i));
                    break;
                case 'JSON':
                    value = data[key] !== '' ? JSON.parse(data[key]) : '';
                    break;
                case 'ARRAYJSON':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => JSON.parse(i));
                    break;
                case 'FUNC':
                    value = data[key] !== '' ? new Function(JSON.parse(data[key])) : new Function('return 0');
                    break;
                case 'ARRAYFUNC':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => new Function(JSON.parse(i)));
                    break;
                case 'STR':
                    value = data[key] !== '' ? String(data[key]) : '';
                    break;
                case 'ARRAYSTR':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => String(i));
                    break;
                case 'STRUCT':
                    newData = data[key] !== '' ? JSON.parse(data[key]) : {};
                    value = VisuMZ.ConvertParams({}, newData);
                    break;
                case 'ARRAYSTRUCT':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => VisuMZ.ConvertParams({}, JSON.parse(i)));
                    break;
                default:
                    continue;
            }

            // Set Value
            obj[objKey] = value;
        }
    }
    return obj;
};

((pluginData) => {
    const name = pluginData.name;
    // Dependency Check
    for (const dependency of dependencies) {
        if (!Imported[dependency]) {
            alert('%1 is missing a required plugin.\nPlease install %2 into the Plugin Manager.'.format(name, dependency));
            SceneManager.exit();
            break;
        }
    }
    // Description Check
    const desc = pluginData.description;
    // Version Check
    if (desc.match(/\[Version[ ](.*?)\]/i)) {
        const descVersion = Number(RegExp.$1);
        if (descVersion !== VisuMZ[label].version) {
            alert('%1\'s version does not match plugin\'s. Please update it in the Plugin Manager.'.format(name, descVersion));
            SceneManager.exit();
        }
    }
    // Tier Order Check
    if (desc.match(/\[Tier[ ](\d+)\]/i)) {
        const descTier = Number(RegExp.$1);
        if (descTier < tier) {
            alert('%1 is incorrectly placed on the plugin list.\nIt is a Tier %2 plugin placed over other Tier %3 plugins.\nPlease reorder the plugin list from smallest to largest tier numbers.'.format(name, descTier, tier));
            SceneManager.exit();
        } else {
            tier = Math.max(descTier, tier);
        }
    }
    // Convert Plugin Parameters
    VisuMZ.ConvertParams(VisuMZ[label].Settings, pluginData.parameters);

})(pluginData);

//-----------------------------------------------------------------------------
// Scene_Boot
//
// The scene class for initializing the entire game.

VisuMZ.BoostAction.RegExp = {
    // Item and Skills
    BoostDamage: /<(?:BP|BOOST) (?:DMG|DAMAGE)>/i, // Documented
    BoostTurns: /<(?:BP|BOOST) (?:TURN|TURNS)>/i, // Documented
    BoostRepeat: /<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i, // Documented
    BoostAnalyze: /<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i, // Documented
    TargetBoostPoints: /<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i, // Documented
    UserBoostPoints: /<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i, // Documented
    BoostGainPoints: /<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i, // Documented
    Require: {
        Amount: /<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i, // Documented
        GreaterEqual: /<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i, // Documented
        Greater: /<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i, // Documented
        Equal: /<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i, // Documented
        Less: /<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i, // Documented
        LessEqual: /<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i, // Documented
    },

    // Trait Objects
    BoostSealed: /<(?:BP|BOOST) (?:SEAL|SEALED)>/i, // Documented
    BoostBattleStartRate: /<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i, // Documented
    BoostBattleStartFlat: /<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i, // Documented
    BoostPointsRegenRate: /<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i, // Documented
    BoostPointsRegenFlat: /<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i, // Documented

    // Enemy Only
    EnemyBoostSkillID: /<BOOST SKILL (\d+):[ ](.*)>/i, // Documented
    EnemyBoostSkillName: /<BOOST (.*):[ ](.*)>/i, // Documented
};

//-----------------------------------------------------------------------------
// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.

ImageManager.boostIcon = VisuMZ.BoostAction.Settings.UI.BoostIcon;
ImageManager.unboostIcon = VisuMZ.BoostAction.Settings.UI.EmptyIcon;
ImageManager.boostSmooth = VisuMZ.BoostAction.Settings.UI.SmoothIcons;

ImageManager.boostIconsheetBitmap = function() {
    if (!this._boostIconSheet) {
        this._boostIconSheet = new Bitmap();
        const bitmap = ImageManager.loadSystem('IconSet');
        bitmap.addLoadListener(this.boostTransferBitmap.bind(this, bitmap));
        
    }
    return this._boostIconSheet;
};

ImageManager.boostTransferBitmap = function(bitmap) {
    this._boostIconSheet.resize(bitmap.width, bitmap.height);
    this._boostIconSheet.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    this._boostIconSheet.smooth = ImageManager.boostSmooth;
    this._boostIconSheet._customModified = false; // v1.02 added by Olivia
};

//-----------------------------------------------------------------------------
// TextManager
//
// The static class that handles terms and messages.

TextManager.boostCommandName = VisuMZ.BoostAction.Settings.UI.BoostCmd;
TextManager.unboostCommandName = VisuMZ.BoostAction.Settings.UI.UnboostCmd;

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

VisuMZ.BoostAction.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    VisuMZ.BoostAction.BattleManager_setup.call(this, troopId, canEscape, canLose);
    $gameParty.setupBattleBoostPoints();
    $gameTroop.setupBattleBoostPoints();
};

VisuMZ.BoostAction.BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
    this.processEnemyUseBoost();
    VisuMZ.BoostAction.BattleManager_processTurn.call(this);
};

BattleManager.processEnemyUseBoost = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    if (!!subject && subject.isEnemy() && !!action && action.isSkill() && subject.storedBoostPoints() > 0 && !subject.isBoostSealed()) {
        subject.processtoUseBoostPoints(action.item());
    }
};

BattleManager.allowBoostAction = function() {
    if (Imported.VisuMZ_2_BattleSystemBTB && this.isBTB()) {
        return false;
    }
    return true;
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

VisuMZ.BoostAction.Game_Action_numRepeats = Game_Action.prototype.numRepeats;
Game_Action.prototype.numRepeats = function() {
    var repeats = VisuMZ.BoostAction.Game_Action_numRepeats.call(this);
    repeats = this.applyBoostPointRepeats(repeats);
    return Math.round(repeats);;
};

Game_Action.prototype.applyBoostPointRepeats = function(repeats) {
    const regexp = VisuMZ.BoostAction.RegExp;

    // v1.06 fixed by Olivia
    if (!!this.subject() && !!this.item() && this.item().note.match(regexp.BoostRepeat)) {
        var rate = this.subject().boostMultiplier('Repeat');
        repeats = Math.round(repeats * rate);
        repeats += this.subject().boostAddition('Repeat');
    }

    return repeats
};

VisuMZ.BoostAction.Game_Action_applyGuard = Game_Action.prototype.applyGuard;
Game_Action.prototype.applyGuard = function(damage, target) {
    damage = this.applyBoostPointDamage(damage);
    return VisuMZ.BoostAction.Game_Action_applyGuard.call(this, damage, target);
};

Game_Action.prototype.applyBoostPointDamage = function(damage) {
    const regexp = VisuMZ.BoostAction.RegExp;
    if (!!this.subject() && this.item().note.match(regexp.BoostDamage)) {
        var rate = this.subject().boostMultiplier('Damage');
        damage = Math.round(damage * rate);
        damage += this.subject().boostAddition('Damage');
    }
    return damage;
};

VisuMZ.BoostAction.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this.applyBoostPointTurns(false);
    VisuMZ.BoostAction.Game_Action_apply.call(this, target);
    this.applyBoostPointTurns(true);
};

Game_Action.prototype.applyBoostPointTurns = function(reset) {
    const regexp = VisuMZ.BoostAction.RegExp;
    if (!!this.subject() && this.item().note.match(regexp.BoostTurns)) {
        var rate = this.subject().boostMultiplier('Turn');
        $gameTemp._bpTurnRate = rate;
        $gameTemp._bpTurnFlat = this.subject().boostAddition('Turn');
    }
    if (reset) {
        $gameTemp._bpTurnRate = undefined;
        $gameTemp._bpTurnFlat = undefined;
    }
};

VisuMZ.BoostAction.__Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    VisuMZ.BoostAction.__Game_Action_applyItemUserEffect.call(this, target);
    this.applyBPEffects(target);
};

Game_Action.prototype.applyBPEffects = function(target) {
    const regexp = VisuMZ.BoostAction.RegExp;
    if (!!target && this.item().note.match(regexp.TargetBoostPoints)) {
        var bp = parseInt(RegExp.$1);
        if (this.item().note.match(regexp.BoostGainPoints)) {
            bp = Math.round(this.subject().boostMultiplier('BP Effect') * bp);
            bp += this.subject().boostAddition('BP Effect');
        }
        target.gainStoredBoostPoints(bp);
    }
    if (!!this.subject() && this.item().note.match(regexp.UserBoostPoints)) {
        var bp = parseInt(RegExp.$1);
        if (this.item().note.match(regexp.BoostGainPoints)) {
            bp = Math.round(this.subject().boostMultiplier('BP Effect') * bp);
            bp += this.subject().boostAddition('BP Effect');
        }
        this.subject().gainStoredBoostPoints(bp);
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Game_BattlerBase.BOOST_POINTS_MAX_STORED = VisuMZ.BoostAction.Settings.Mechanics.MaxStored;
Game_BattlerBase.BOOST_POINTS_MAX_TOUSE = VisuMZ.BoostAction.Settings.Mechanics.Usable;

Game_BattlerBase.BOOST_POINTS_DEATH_REGEN = VisuMZ.BoostAction.Settings.Mechanics.DeathRegen;
Game_BattlerBase.BOOST_POINTS_DEATH_REMOVE = VisuMZ.BoostAction.Settings.Mechanics.DeathRemoval;
Game_BattlerBase.BOOST_POINTS_REGEN_ALWAYS = VisuMZ.BoostAction.Settings.Mechanics.AlwaysRegen;
Game_BattlerBase.BOOST_POINTS_TURN_REGEN = VisuMZ.BoostAction.Settings.Mechanics.Regen;

Game_BattlerBase.BOOST_POINTS_START_BATTLE = VisuMZ.BoostAction.Settings.Mechanics.StartBattle;

VisuMZ.BoostAction.Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize;
Game_BattlerBase.prototype.initialize = function() {
    VisuMZ.BoostAction.Game_BattlerBase_initialize.call(this);
    this.initBoostAction();
};

Game_BattlerBase.prototype.initBoostAction = function() {
    this._storedBoostPoints = this._storedBoostPoints || 0;
    this._toUseBoostPoints = this._toUseBoostPoints || 0;
    this._turnUsedBoostPoints = this._turnUsedBoostPoints || 0;
};

Game_BattlerBase.prototype.storedBoostPoints = function() {
    if (this._storedBoostPoints === undefined) {
        this.initBoostAction();
    }
    return this._storedBoostPoints;
};

Game_BattlerBase.prototype.setStoredBoostPoints = function(bp) {
    if (this._storedBoostPoints === undefined) {
        this.initBoostAction();
    }
    bp = Math.round(bp);
    this._storedBoostPoints = bp.clamp(0, Game_BattlerBase.BOOST_POINTS_MAX_STORED);
    this.refresh();
};

Game_BattlerBase.prototype.toUseBoostPoints = function() {
    if (this._toUseBoostPoints === undefined) {
        this.initBoostAction();
    }
    return this._toUseBoostPoints;
};

Game_BattlerBase.prototype.setToUseBoostPoints = function(bp) {
    if (this._toUseBoostPoints === undefined) {
        this.initBoostAction();
    }
    bp = Math.round(bp);
    this._toUseBoostPoints = bp.clamp(0, Game_BattlerBase.BOOST_POINTS_MAX_TOUSE);
    this.refresh();
};

Game_BattlerBase.prototype.boostPointsRegenValue = function() {
    if (!Game_BattlerBase.BOOST_POINTS_DEATH_REGEN && (this.isDead() || this.isHidden())) {
        return 0;
    } else {
        var bp = Game_BattlerBase.BOOST_POINTS_TURN_REGEN;
        bp = this.bpRegenMultipliers(bp);
        bp = this.bpRegenAdded(bp);
        return bp;
    }
};

Game_BattlerBase.prototype.isBoostSealed = function() {
    const objects = this.traitObjects();
    const regexp = VisuMZ.BoostAction.RegExp;
    return objects.some(obj => obj && obj.note.match(regexp.BoostSealed));
};

VisuMZ.BoostAction.Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    var currentTurnCount = this._stateTurns[stateId] || 0;

    VisuMZ.BoostAction.Game_BattlerBase_resetStateCounts.call(this, stateId);

    if (!!$gameTemp._bpTurnRate) {
        $gameTemp._bpTurnFlat = $gameTemp._bpTurnFlat || 0;
        var state = $dataStates[stateId];
        var maxTurns = Math.round(state.maxTurns * $gameTemp._bpTurnRate) + $gameTemp._bpTurnFlat;
        var minTurns = Math.round(state.minTurns * $gameTemp._bpTurnRate) + $gameTemp._bpTurnFlat;
        var variance = 1 + Math.max(maxTurns - minTurns, 0);

        const rulings = this.getStateReapplyRulings(state).toLowerCase().trim();
        switch (rulings) {
            case 'reset':
                this._stateTurns[stateId] = minTurns + Math.randomInt(variance);
                break;
            case 'greater':
                const current = this._stateTurns[stateId];
                const newValue = minTurns + Math.randomInt(variance);
                this._stateTurns[stateId] = Math.max(current, newValue);
                break;
            case 'add':
                this._stateTurns[stateId] = minTurns + Math.randomInt(variance) + currentTurnCount;
                break;
        }
    }
};

VisuMZ.BoostAction.Game_BattlerBase_meetsUsableItemConditions = Game_BattlerBase.prototype.meetsUsableItemConditions;
Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
    if (VisuMZ.BoostAction.Game_BattlerBase_meetsUsableItemConditions.call(this, item)) {
        return this.meetstoUseBoostPointsRequirement(item);
    } else {
        return false;
    }
};

Game_BattlerBase.prototype.meetstoUseBoostPointsRequirement = function(item) {
    const regexp = VisuMZ.BoostAction.RegExp;
    var note = item.note;
    if (note.match(regexp.Require.Amount) || note.match(regexp.Require.GreaterEqual)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.toUseBoostPoints() >= bp;
        } else {
            return this.storedBoostPoints() >= bp;
        }
    } else if (item.note.match(regexp.Require.GreaterEqual)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.toUseBoostPoints() > bp;
        } else {
            return this.storedBoostPoints() > bp;
        }
    } else if (item.note.match(regexp.Require.Equal)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.toUseBoostPoints() === bp;
        } else {
            return this.storedBoostPoints() === bp;
        }
    } else if (item.note.match(regexp.Require.Less)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.toUseBoostPoints() < bp;
        } else {
            return this.storedBoostPoints() < bp;
        }
    } else if (item.note.match(regexp.Require.LessEqual)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.toUseBoostPoints() <= bp;
        } else {
            return this.storedBoostPoints() <= bp;
        }
    } else {
        return true;
    }
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Game_Battler.BOOST_POINTS_MULTIPLIERS = {
    Damage:   VisuMZ.BoostAction.Settings.Mechanics.DmgMultiply,
    Turn:     VisuMZ.BoostAction.Settings.Mechanics.TurnMultiply,
    Repeat:   VisuMZ.BoostAction.Settings.Mechanics.RepeatMultiply,
    BpEffect: VisuMZ.BoostAction.Settings.Mechanics.EffectMultiply,
    Analyze:  VisuMZ.BoostAction.Settings.Mechanics.AnalyzeMultiply,
};
Game_Battler.BOOST_POINTS_ADDITION = {
    Damage:   VisuMZ.BoostAction.Settings.Mechanics.DmgAddition,
    Turn:     VisuMZ.BoostAction.Settings.Mechanics.TurnAddition,
    Repeat:   VisuMZ.BoostAction.Settings.Mechanics.RepeatAddition,
    BpEffect: VisuMZ.BoostAction.Settings.Mechanics.EffectAddition,
    Analyze:  VisuMZ.BoostAction.Settings.Mechanics.AnalyzeAddition,
};
Game_Battler.BOOST_POINTS_ANIMATIONS = VisuMZ.BoostAction.Settings.Mechanics.Animations;

Game_Battler.prototype.gainStoredBoostPoints = function(value) {
    this.setStoredBoostPoints(this.storedBoostPoints() + value);
};

Game_Battler.prototype.gainToUseBoostPoints = function(value) {
    this.setToUseBoostPoints(this.toUseBoostPoints() + value);
};

Game_Battler.prototype.boostMultiplier = function(type) {
    const container = Game_Battler.BOOST_POINTS_MULTIPLIERS;
    if (type.match(/Damage/i)) {
        var list = container.Damage;
    } else if (type.match(/Turn/i)) {
        var list = container.Turn;
    } else if (type.match(/Repeat/i)) {
        var list = container.Repeat;
    } else if (type.match(/BP Effect/i)) {
        var list = container.BpEffect;
    } else if (type.match(/Analyze/i)) {
        var list = container.Analyze;
    } else {
        return this.toUseBoostPoints();
    }
    var index = this.toUseBoostPoints();
    return list[index] || list[0];
};

Game_Battler.prototype.boostAddition = function(type) {
    const container = Game_Battler.BOOST_POINTS_ADDITION;
    if (type.match(/Damage/i)) {
        var list = container.Damage;
    } else if (type.match(/Turn/i)) {
        var list = container.Turn;
    } else if (type.match(/Repeat/i)) {
        var list = container.Repeat;
    } else if (type.match(/BP Effect/i)) {
        var list = container.BpEffect;
    } else if (type.match(/Analyze/i)) {
        var list = container.Analyze;
    } else {
        return this.toUseBoostPoints();
    }
    var index = this.toUseBoostPoints();
    return parseInt(list[index] || list[0]);
};

Game_Battler.prototype.setupBattleBoostPoints = function() {
    // v1.07 added by Olivia
    if (this._previousBattleChainBoostActions) {
        this._previousBattleChainBoostActions = undefined;
        return;
    }

    // Original
    var bp = Game_BattlerBase.BOOST_POINTS_START_BATTLE;
    bp = this.setupBattleBoostPointsMultiplier(bp);
    bp = this.setupBattleBoostPointsAdded(bp);
    bp = Math.round(bp);
    this.setStoredBoostPoints(bp);
};

Game_Battler.prototype.setupBattleBoostPointsMultiplier = function(bp) {
    const objects = this.traitObjects();
    const regexp = VisuMZ.BoostAction.RegExp;
    for (const obj of objects) {
        if (!obj) continue;
        if (obj.note.match(regexp.BoostBattleStartRate)) {
            bp *= Number(RegExp.$1) * 0.01;
        }
    }
    return bp;
};

Game_Battler.prototype.setupBattleBoostPointsAdded = function(bp) {
    const objects = this.traitObjects();
    const regexp = VisuMZ.BoostAction.RegExp;
    for (const obj of objects) {
        if (!obj) continue;
        if (obj.note.match(regexp.BoostBattleStartFlat)) {
            bp += Number(RegExp.$1);
        }
    }
    return bp;
};

Game_Battler.prototype.startChangeBoostPointsAnimation = function() {
    var index = this.toUseBoostPoints().clamp(0, Game_BattlerBase.BOOST_POINTS_MAX_TOUSE);
    const animations = Game_Battler.BOOST_POINTS_ANIMATIONS;
    var animationId = Number(animations[index] || animations[0]);
    if (animationId > 0) {
        $gameTemp.requestFauxAnimation([this], animationId, false, false);
    }
};

Game_Battler.prototype.canUseBoostPoints = function() {
    if (this.isBoostSealed()) {
        return false;
    }
    return this.toUseBoostPoints() < Game_BattlerBase.BOOST_POINTS_MAX_TOUSE && this.storedBoostPoints() > 0;
};

Game_Battler.prototype.canUndoBoostPoints = function() {
    return this.toUseBoostPoints() > 0;
};

VisuMZ.BoostAction.Game_Battler_removeBattleStates = Game_Battler.prototype.removeBattleStates;
Game_Battler.prototype.removeBattleStates = function() {
    VisuMZ.BoostAction.Game_Battler_removeBattleStates.call(this);
    this._storedBoostPoints = 0;
    this._toUseBoostPoints = 0;
};

VisuMZ.BoostAction.Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    VisuMZ.BoostAction.Game_Battler_regenerateTp.call(this);
    this.regenerateBoostPoints();
};

VisuMZ.BoostAction.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    VisuMZ.BoostAction.Game_Battler_regenerateAll.call(this);
    if (Game_BattlerBase.BOOST_POINTS_DEATH_REGEN && this.isDead() && $gameParty.inBattle()) { // v1.05 updated by Olivia
        this.regenerateBoostPoints();
    }
};

Game_Battler.prototype.regenerateBoostPoints = function() {
    if (Game_BattlerBase.BOOST_POINTS_REGEN_ALWAYS || this._turnUsedBoostPoints <= 0) {
        this.gainStoredBoostPoints(this.boostPointsRegenValue());
    }
    this._turnUsedBoostPoints = 0;
};

// v1.03 disabled by Olivia
/*
VisuMZ.BoostAction.Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    VisuMZ.BoostAction.Game_Battler_performActionEnd.call(this);

    this.endActionBoostPoints();
};
*/

// v1.03 added by Olivia
VisuMZ.BoostAction.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this._subject) {
        this._subject.endActionBoostPoints();
    }
    VisuMZ.BoostAction.BattleManager_endAction.call(this);
};

// v1.03 added by Olivia
Game_Battler.prototype.endActionBoostPoints = function() {
    // v1.06 added by Olivia
    if (Imported.VisuMZ_3_ActiveChainSkills && $gameTemp.getActiveChainSkillSelected()) {
        return;
    }

    // Original
    this._turnUsedBoostPoints += this.toUseBoostPoints();
    this.setToUseBoostPoints(0);
};

Game_Battler.prototype.bpRegenMultipliers = function(bp) {
    const objects = this.traitObjects();
    const regexp = VisuMZ.BoostAction.RegExp;
    for (const obj of objects) {
        if (!obj) continue;
        if (obj.note.match(regexp.BoostPointsRegenRate)) {
            bp *= Number(RegExp.$1) * 0.01;
        }
    }
    return bp;
};

Game_Battler.prototype.bpRegenAdded = function(bp) {
    const objects = this.traitObjects();
    const regexp = VisuMZ.BoostAction.RegExp;
    for (const obj of objects) {
        if (!obj) continue;
        if (obj.note.match(regexp.BoostPointsRegenFlat)) {
            bp += Number(RegExp.$1);
        }
    }
    return bp;
};

VisuMZ.BoostAction.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    var isDead = this.isDead();
    VisuMZ.BoostAction.Game_Battler_addState.call(this, stateId);
    if (Game_BattlerBase.BOOST_POINTS_DEATH_REMOVE && !isDead && this.isDead()) {
        this.setStoredBoostPoints(0);
    }
};

VisuMZ.BoostAction.Game_Battler_addBuff = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns) {
    if (!!$gameTemp._bpTurnRate) {
        $gameTemp._bpTurnFlat = $gameTemp._bpTurnFlat || 0;
        turns = Math.round($gameTemp._bpTurnRate * turns) + $gameTemp._bpTurnFlat;
    }
    VisuMZ.BoostAction.Game_Battler_addBuff.call(this, paramId, turns);
};

VisuMZ.BoostAction.Game_Battler_addDebuff = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns) {
    if (!!$gameTemp._bpTurnRate) {
        $gameTemp._bpTurnFlat = $gameTemp._bpTurnFlat || 0;
        turns = Math.round($gameTemp._bpTurnRate * turns) + $gameTemp._bpTurnFlat;
    }
    VisuMZ.BoostAction.Game_Battler_addDebuff.call(this, paramId, turns);
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
// The game object class for an enemy.

Game_Enemy.BOOST_POINTS_ANIMATION_DELAY = VisuMZ.BoostAction.Settings.Mechanics.AnimationDelay;

VisuMZ.BoostAction.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    VisuMZ.BoostAction.Game_Enemy_setup.call(this, enemyId, x, y);
    this.setupBoostAI();
};

Game_Enemy.prototype.setupBoostAI = function() {
    const regexp = VisuMZ.BoostAction.RegExp;
    if (this.enemy()._boostAI === undefined) {
        this.enemy()._boostAI = {};
        var notedata = this.enemy().note.split(/[\r\n]+/);
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(regexp.EnemyBoostSkillID)) {
                var skillId = 'Skill ' + parseInt(RegExp.$1);
                var aiData = String(RegExp.$2).toLowerCase();
                this.enemy()._boostAI[skillId] = aiData;
            } else if (line.match(regexp.EnemyBoostSkillName)) {
                var skillName = String(RegExp.$1);
                var aiData = String(RegExp.$2).toLowerCase();
                this.enemy()._boostAI[skillName] = aiData;
            }
        }
    }
};

Game_Enemy.prototype.processtoUseBoostPoints = function(skill) {
    this.setupBoostAI();
    var bp = this.calculateBPtoUse(skill);
    if (bp > 0) {
        this.processEnemyBPUsage(bp);
        this.startChangeBoostPointsAnimation();
    }
};

Game_Enemy.prototype.calculateBPtoUse = function(skill) {
    if (this.storedBoostPoints() <= 0) {
        return 0;
    }
    var skillName = skill.name;
    var skillId = 'Skill ' + skill.id;
    var bp = 0;
    if (this.enemy()._boostAI[skillName] || this.enemy()._boostAI[skillId]) {
        var aiData = this.enemy()._boostAI[skillName] || this.enemy()._boostAI[skillId];
        if (aiData.match(/(?:ALL|FULL)/i)) {
            bp = this.storedBoostPoints();
        } else if (aiData.match(/AT LEAST (\d+)/i)) {
            var value = parseInt(RegExp.$1);
            if (this.storedBoostPoints() >= value) {
                bp = this.storedBoostPoints();
            }
        } else if (aiData.match(/AT MOST (\d+)/i)) {
            var value = parseInt(RegExp.$1);
            if (this.storedBoostPoints() <= value) {
                bp = this.storedBoostPoints();
            }
        } else if (aiData.match(/EXACTLY (\d+)/i)) {
            var value = parseInt(RegExp.$1);
            if (this.storedBoostPoints() === value) {
                bp = value;
            }
        }
    }
    return bp.clamp(0, Game_BattlerBase.BOOST_POINTS_MAX_TOUSE);
};

Game_Enemy.prototype.processEnemyBPUsage = function(bp) {
    bp = bp.clamp(0, this.storedBoostPoints());
    bp = bp.clamp(0, Game_BattlerBase.BOOST_POINTS_MAX_TOUSE);
    this.gainStoredBoostPoints(-bp);
    this.gainToUseBoostPoints(bp);
};

Game_Enemy.prototype.startChangeBoostPointsAnimation = function() {
    var wait = 0;
    var bp = this.toUseBoostPoints().clamp(0, Game_BattlerBase.BOOST_POINTS_MAX_TOUSE);
    const animations = Game_Battler.BOOST_POINTS_ANIMATIONS;
    const delayTimeMS = Game_Enemy.BOOST_POINTS_ANIMATION_DELAY;
    const delayPerSec = 1000 / 60;
    for (var i = 1; i <= bp; i++) {
        var animationId = animations[i] || animations[0];
        if (animationId > 0) {
            let delay = delayTimeMS * (i - 1);
            setTimeout($gameTemp.requestFauxAnimation.bind($gameTemp, [this], animationId, false, false), delay);
            //$gameTemp.requestFauxAnimation([this], animationId, false, false);
        }
        wait += delayTimeMS / delayPerSec;
    }
    wait = Math.ceil(wait);
    SceneManager._scene._logWindow._waitCount = wait;
};

//-----------------------------------------------------------------------------
// Game_Unit
//
// The superclass of Game_Party and Game_Troop.

Game_Unit.prototype.setupBattleBoostPoints = function() {
    var inBattle = this._inBattle;
    this._inBattle = false;

    for (const member of this.members()) {
        if (!member) continue;
        member.setupBattleBoostPoints();
    }

    this._inBattle = inBattle;
};

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

// v1.04 added by Olivia
VisuMZ.BoostAction.Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    VisuMZ.BoostAction.Game_Party_addActor.call(this, actorId);
    setTimeout(VisuMZ.BoostAction.RefreshHelpWindowInBattle.bind(this), 50);
};

// v1.04 added by Olivia
VisuMZ.BoostAction.Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    VisuMZ.BoostAction.Game_Party_removeActor.call(this, actorId);
    setTimeout(VisuMZ.BoostAction.RefreshHelpWindowInBattle.bind(this), 50);
};

// v1.04 added by Olivia
VisuMZ.BoostAction.Game_Party_partyChangeRefresh = Game_Party.prototype.partyChangeRefresh;
Game_Party.prototype.partyChangeRefresh = function() {
    VisuMZ.BoostAction.Game_Party_partyChangeRefresh.call(this);
    setTimeout(VisuMZ.BoostAction.RefreshHelpWindowInBattle.bind(this), 50);
};

// v1.04 added by Olivia
VisuMZ.BoostAction.RefreshHelpWindowInBattle = function() {
    if (!SceneManager.isSceneBattle()) return;
    const targetWindow = SceneManager._scene._helpWindow;
    if (!targetWindow) return;
    targetWindow.setBoostSubject(BattleManager.actor());
    targetWindow.refresh();
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

VisuMZ.BoostAction.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    VisuMZ.BoostAction.Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('boost', this.commandBoost.bind(this));
    this._actorCommandWindow.setHandler('unboost', this.commandUnboost.bind(this));
};

Scene_Battle.prototype.commandBoost = function(bypass) {
    BattleManager.actor().gainStoredBoostPoints(-1);
    BattleManager.actor().gainToUseBoostPoints(1);
    BattleManager.actor().startChangeBoostPointsAnimation();
    this._helpWindow.refresh();
    if (!bypass) {
        this._actorCommandWindow.activate();
    }
    this._actorCommandWindow.refresh();
};

Scene_Battle.prototype.commandUnboost = function(bypass) {
    BattleManager.actor().gainToUseBoostPoints(-1);
    BattleManager.actor().gainStoredBoostPoints(1);
    BattleManager.actor().startChangeBoostPointsAnimation();
    this._helpWindow.refresh();
    if (!bypass) {
        this._actorCommandWindow.activate();
    }
    this._actorCommandWindow.refresh();
};

VisuMZ.BoostAction.Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    if (this._helpWindow) {
        this._helpWindow.clearBoostSubject();
    }
    VisuMZ.BoostAction.Scene_Battle_selectNextCommand.call(this);
};

VisuMZ.BoostAction.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    VisuMZ.BoostAction.Scene_Battle_startActorCommandSelection.call(this);
    if (this._helpWindow) {
        this._helpWindow.setBoostSubject(BattleManager.actor());
    }
};

//-----------------------------------------------------------------------------
// Sprite_BoostContainer
//
// The sprite for displaying the Boost Points a battler has.

function Sprite_BoostContainer() {
    this.initialize(...arguments);
}

Sprite_BoostContainer.prototype = Object.create(Sprite.prototype);
Sprite_BoostContainer.prototype.constructor = Sprite_BoostContainer;

Sprite_BoostContainer.ICON_SIZE_RATE = VisuMZ.BoostAction.Settings.UI.IconSizeRate;

Sprite_BoostContainer.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.createChildSprites();
};

Sprite_BoostContainer.prototype.initMembers = function() {
    this.scale.x = Sprite_BoostContainer.ICON_SIZE_RATE;
    this.scale.y = Sprite_BoostContainer.ICON_SIZE_RATE;
};

Sprite_BoostContainer.prototype.createChildSprites = function() {
    this._icons = [];
    for (let i = 1; i <= Game_BattlerBase.BOOST_POINTS_MAX_STORED; i++) {
        const sprite = new Sprite_BoostIcon(i);
        this.addChild(sprite);
        this._icons.push(sprite);
    }
};

Sprite_BoostContainer.prototype.setup = function(battler) {
    if (!this._icons) return;
    for (const sprite of this._icons) {
        sprite.setup(battler);
    }
};

//-----------------------------------------------------------------------------
// Sprite_BoostIcon
//
// The sprite for displaying the boost icon a battler has.

function Sprite_BoostIcon() {
    this.initialize(...arguments);
}

Sprite_BoostIcon.prototype = Object.create(Sprite.prototype);
Sprite_BoostIcon.prototype.constructor = Sprite_BoostIcon;

Sprite_BoostIcon.prototype.initialize = function(slot) {
    this._slot = slot;
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
};

Sprite_BoostIcon.prototype.initMembers = function() {
    this._iconIndex = ImageManager.unboostIcon;
    this.x = ImageManager.iconWidth * (this._slot - 1);
};

Sprite_BoostIcon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.boostIconsheetBitmap();
    this.setFrame(0, 0, 0, 0);
};

Sprite_BoostIcon.prototype.setup = function(battler) {
    if (this._battler !== battler) {
        this._battler = battler;
    }
};

Sprite_BoostIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateIcon();
    this.updateFrame();
};

Sprite_BoostIcon.prototype.updateIcon = function() {
    if (this._battler) {
        let points = this._battler.storedBoostPoints();
        if (points >= this._slot) {
            this._iconIndex = ImageManager.boostIcon;
        } else {
            this._iconIndex = ImageManager.unboostIcon;
        }
    } else {
        this._iconIndex = 0;
    }
};

Sprite_BoostIcon.prototype.updateFrame = function() {
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (this._iconIndex % 16) * pw;
    const sy = Math.floor(this._iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
};

//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.

VisuMZ.BoostAction.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = VisuMZ.BoostAction.Window_Base_convertEscapeCharacters.call(this, text);
    text = this.convertBoostEscapeCharacters(text);
    return text;
};

Window_Base.prototype.convertBoostEscapeCharacters = function(text) {
    // Damage
    text = text.replace(/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi, function() {
        return this.convertBoostDamageEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi, function() {
        return this.convertBoostDamageEscape(parseInt(arguments[1]));
    }.bind(this));
    // Turns
    text = text.replace(/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi, function() {
        return this.convertBoostTurnEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi, function() {
        return this.convertBoostTurnEscape(parseInt(arguments[1]));
    }.bind(this));
    // Repeats
    text = text.replace(/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi, function() {
        return this.convertBoostRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi, function() {
        return this.convertBoostRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi, function() {
        return this.convertBoostRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi, function() {
        return this.convertBoostRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    // Analyze
    text = text.replace(/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi, function() {
        return this.convertBoostAnalyzeEscape(parseInt(arguments[1]));
    }.bind(this));
    // Effect
    text = text.replace(/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi, function() {
        return this.convertBoostEffectEscape(parseInt(arguments[1]));
    }.bind(this));
    // Boost Times Requirements Text
    text = text.replace(/\x1b(?:BP|BOOST)\[(.*?)\]/gi, function() {
        return this.convertBoostUpEscape(String(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)0\[(.*?)\]/gi, function() {
        return this.convertBoost0Escape(String(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBoostEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBoostEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBoostLessEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi, function() {
        return this.convertBoostLessEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBoostGreaterEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi, function() {
        return this.convertBoostGreaterEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    return text;
};

Window_Base.prototype.convertBoostDamageEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.boostMultiplier('Damage');
        value = Math.round(value * rate);
        value += this._bpSubject.boostAddition('Damage');
    }
    return value;
};

Window_Base.prototype.convertBoostTurnEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.boostMultiplier('Turn');
        value = Math.round(value * rate);
        value += this._bpSubject.boostAddition('Turn');
    }
    return value;
};

Window_Base.prototype.convertBoostRepeatEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.boostMultiplier('Repeat');
        value = Math.round(value * rate);
        value += this._bpSubject.boostAddition('Repeat');
    }
    return value;
};

Window_Base.prototype.convertBoostAnalyzeEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.boostMultiplier('Analyze');
        value = Math.round(value * rate);
        value += this._bpSubject.boostAddition('Analyze');
    }
    return value;
};

Window_Base.prototype.convertBoostEffectEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.boostMultiplier('BP Effect');
        value = Math.round(value * rate);
        value += this._bpSubject.boostAddition('BP Effect');
    }
    return value;
};

Window_Base.prototype.convertBoostUpEscape = function(str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() > 0) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoost0Escape = function(str) {
    if (!this._bpSubject || this._bpSubject.toUseBoostPoints() <= 0) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoostEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() === bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoostEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() === bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoostLessEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() <= bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoostLessEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() < bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoostGreaterEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() >= bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBoostGreaterEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.toUseBoostPoints() > bp) {
        return str;
    } else {
        return '';
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window class with cursor movement functions.

Window_Selectable.BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN = VisuMZ.BoostAction.Settings.UI.PgUpDnShortcuts;
Window_Selectable.BOOST_ACTION_BYPASS_CONSTRUCTORS = VisuMZ.BoostAction.Settings.UI.BypassConstructors;

Window_Selectable.prototype.canUseBoostShortcut = function() {
    const name = this.constructor.name;
    if (Window_Selectable.BOOST_ACTION_BYPASS_CONSTRUCTORS.includes(name)) {
        return false;
    } else {
        return true;
    }
};

Window_Selectable.prototype.meetsBoostShortcutRequirements = function() {
    if (!SceneManager.isSceneBattle()) return false;
    if (!Window_Selectable.BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN) return false;
    if (!BattleManager.allowBoostAction()) return false;
    return this.canUseBoostShortcut();
};

VisuMZ.BoostAction.Window_Selectable_cursorPagedown = Window_Selectable.prototype.cursorPagedown;
Window_Selectable.prototype.cursorPagedown = function() {
    if (this.meetsBoostShortcutRequirements()) {
        const actor = BattleManager.actor();
        if (actor && actor.canUseBoostPoints()) {
            SceneManager._scene.commandBoost(true);
            this.refresh();
            this.callUpdateHelp();
        }
        Input.clear();
    } else {
        VisuMZ.BoostAction.Window_Selectable_cursorPagedown.call(this);
    }
};

VisuMZ.BoostAction.Window_Selectable_cursorPageup = Window_Selectable.prototype.cursorPageup;
Window_Selectable.prototype.cursorPageup = function() {
    if (this.meetsBoostShortcutRequirements()) {
        const actor = BattleManager.actor();
        if (actor && actor.canUndoBoostPoints()) {
            SceneManager._scene.commandUnboost(true);
            this.refresh();
            this.callUpdateHelp();
        }
        Input.clear();
    } else {
        VisuMZ.BoostAction.Window_Selectable_cursorPageup.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.

Window_Help.prototype.setBoostSubject = function(battler) {
    this._bpSubject = battler;
};

Window_Help.prototype.clearBoostSubject = function() {
    this._bpSubject = undefined;
};

//-----------------------------------------------------------------------------
// Window_StatusBase
//
// The superclass of windows for displaying actor status.

Window_StatusBase.prototype.shouldDrawBoostIcons = function() {
    return BattleManager.allowBoostAction();
};

Window_StatusBase.prototype.placeBoostPoints = function(actor, x, y) {
    if (!this.shouldDrawBoostIcons()) return;
    const key = "actor%1-boostPoints".format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_BoostContainer);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Window_ActorCommand.BOOST_ACTION_SHOW = VisuMZ.BoostAction.Settings.UI.ShowBoostCmd;
Window_ActorCommand.UNBOOST_ACTION_SHOW = VisuMZ.BoostAction.Settings.UI.ShowUnboostCmd;

VisuMZ.BoostAction.Window_ActorCommand_addGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
Window_ActorCommand.prototype.addGuardCommand = function() {
    if (BattleManager.allowBoostAction()) {
        this.addBoostCommand();
        this.addUnboostCommand();
    }
    VisuMZ.BoostAction.Window_ActorCommand_addGuardCommand.call(this);
};

Window_ActorCommand.prototype.addBoostCommand = function() {
    if (!Window_ActorCommand.BOOST_ACTION_SHOW) return;

    const style = this.commandStyle();
    const name = TextManager.boostCommandName;
    const icon = ImageManager.boostIcon;
    const text = style === 'text' ? name : '\\I[%1]%2'.format(icon, name);

    var enabled = this._actor.canUseBoostPoints();
    this.addCommand(text, 'boost', enabled);
};

Window_ActorCommand.prototype.addUnboostCommand = function() {
    if (!Window_ActorCommand.UNBOOST_ACTION_SHOW) return;

    const style = this.commandStyle();
    const name = TextManager.unboostCommandName;
    const icon = ImageManager.unboostIcon;
    const text = style === 'text' ? name : '\\I[%1]%2'.format(icon, name);

    var enabled = this._actor.canUndoBoostPoints();
    this.addCommand(text, 'unboost', enabled);
};

Window_ActorCommand.prototype.playOkSound = function() {
    if (this.currentSymbol() !== 'boost' && this.currentSymbol() !== 'unboost') {
        Window_Selectable.prototype.playOkSound.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

Window_BattleStatus.BOOST_POINTS_DISPLAY_BATTLE_STATUS = VisuMZ.BoostAction.Settings.UI.BattleStatusShow;
Window_BattleStatus.BOOST_POINTS_DISPLAY_AUTO_POS = VisuMZ.BoostAction.Settings.UI.BattleStatusAutoPosition;
Window_BattleStatus.BOOST_POINTS_DISPLAY_OFFSET_X = VisuMZ.BoostAction.Settings.UI.BattleStatusOffsetX;
Window_BattleStatus.BOOST_POINTS_DISPLAY_OFFSET_Y = VisuMZ.BoostAction.Settings.UI.BattleStatusOffsetY;

VisuMZ.BoostAction.Window_BattleStatus_drawItemStatus = Window_BattleStatus.prototype.drawItemStatus;
Window_BattleStatus.prototype.drawItemStatus = function(index) {
    VisuMZ.BoostAction.Window_BattleStatus_drawItemStatus.call(this, index);
    this.drawItemStatusBoostPoints(index);
};

Window_BattleStatus.prototype.drawItemStatusBoostPoints = function(index) {
    // Return Checks
    if (!Window_BattleStatus.BOOST_POINTS_DISPLAY_BATTLE_STATUS) return;
    const actor = this.actor(index);
    if (!actor) return;

    // Display Positions
    if (!Window_BattleStatus.BOOST_POINTS_DISPLAY_AUTO_POS) {
        this.drawItemStatusBoostPointsDefault(index);
    } else {
        this.drawItemStatusBoostPointsAuto(index);
    }
};

Window_BattleStatus.prototype.drawItemStatusBoostPointsDefault = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    let x = rect.x - 4 + Window_BattleStatus.BOOST_POINTS_DISPLAY_OFFSET_X;
    let y = rect.y + 4 + Window_BattleStatus.BOOST_POINTS_DISPLAY_OFFSET_Y;
    this.placeBoostPoints(actor, x, y);
};

Window_BattleStatus.prototype.drawItemStatusBoostPointsAuto = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const boostWidth = Math.ceil(ImageManager.iconWidth * Game_BattlerBase.BOOST_POINTS_MAX_STORED * Sprite_BoostContainer.ICON_SIZE_RATE);
    const boostHeight = Math.ceil(ImageManager.iconHeight * Sprite_BoostContainer.ICON_SIZE_RATE);

    let x = rect.x + 4;
    let y = rect.y + 4;

    const style = this.battleLayoutStyle();
    switch (style) {
        case 'list':
            if (VisuMZ.BattleCore.Settings.BattleLayout.ShowFacesListStyle) {
                x += ImageManager.faceWidth + 8;
            } else {
                x += ImageManager.iconWidth + 8;
            }
            x += 136; // Name
            x += 136 * 2; // HP + MP
            if ($dataSystem.optDisplayTp) {
                x += 136; // TP
            }
            y += Math.max(0, Math.round((this.lineHeight() - boostHeight) / 2));
            break;
        case 'xp':
        case 'default':
        case 'border':
            x = Math.round(rect.x + (rect.width - boostWidth) / 2);
            break;
        case 'portrait':
            x = Math.round(rect.x + (rect.width - boostWidth) / 2);
            const lines = $dataSystem.optDisplayTp ? 4 : 3;
            y = Math.round(rect.y + rect.height - 4 - this.lineHeight() * lines);
            break;
    }

    x += Window_BattleStatus.BOOST_POINTS_DISPLAY_OFFSET_X;
    y += Window_BattleStatus.BOOST_POINTS_DISPLAY_OFFSET_Y;

    this.placeBoostPoints(actor, x, y);
};

//=============================================================================
// End of File
//=============================================================================