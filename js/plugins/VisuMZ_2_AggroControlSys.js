//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.22] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
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
 * Version 1.22: December 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where battlers can become immune to provoke effects. Fix made
 *    by Olivia.
 * 
 * Version 1.21: October 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where auto-battle would bypass Taunt and Provoke effects.
 *    Fix made by Olivia.
 * 
 * Version 1.20: July 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if a party member who provoked an enemy decided to
 *    switch out, the provoke effect would be retained and cause the enemy to
 *    bug out and crash the game. Fix made by Arisu.
 * 
 * Version 1.19: April 18, 2024
 * * Feature Update!
 * ** Altered TGR and Aggro-related stats so that they cannot dip too deep into
 *    the negatives and prevent randomized targeting altogether. Update made
 *    by Olivia.
 * 
 * Version 1.18: March 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for other plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 17, 2023
 * * Compatibility Update!
 * ** When enemies use skills with VisuStella MZ Battle A.I. installed, aggro
 *    settings will no longer automatically target "highest aggro targets" if
 *    there are <AI Targets: x> notetags.
 * 
 * Version 1.16: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an issue with non-weighted aggro selected actions that will cause
 *    actors (instead of just enemies) to also target highest TGR enemies.
 *    Fix made by Irina.
 * 
 * Version 1.15: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused <All Taunt> to not work properly.
 *    Fix made by Irina.
 * 
 * Version 1.14: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause cached battlers from a previous save file to
 *    not load up properly when actions are used for highest aggro actors.
 *    Fix made by Irina.
 * 
 * Version 1.13: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a problem that would cause a crash when exiting the Options menu in
 *    battle when used with specific battle systems. Fix made by Irina.
 * 
 * Version 1.12: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
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
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

function _0x1bf1(_0x19d92c,_0x32188e){const _0x3f16b9=_0x3f16();return _0x1bf1=function(_0x1bf1c1,_0x41d12d){_0x1bf1c1=_0x1bf1c1-0x109;let _0x3bae9c=_0x3f16b9[_0x1bf1c1];return _0x3bae9c;},_0x1bf1(_0x19d92c,_0x32188e);}const _0x51f16e=_0x1bf1;(function(_0x4d4ece,_0x20f924){const _0x32d7e4=_0x1bf1,_0x34320e=_0x4d4ece();while(!![]){try{const _0x5a4529=-parseInt(_0x32d7e4(0x21f))/0x1+-parseInt(_0x32d7e4(0x1da))/0x2*(-parseInt(_0x32d7e4(0x242))/0x3)+-parseInt(_0x32d7e4(0x117))/0x4+-parseInt(_0x32d7e4(0x198))/0x5*(parseInt(_0x32d7e4(0x1b6))/0x6)+parseInt(_0x32d7e4(0x221))/0x7+parseInt(_0x32d7e4(0x142))/0x8*(-parseInt(_0x32d7e4(0x24d))/0x9)+parseInt(_0x32d7e4(0x13e))/0xa*(parseInt(_0x32d7e4(0x1d7))/0xb);if(_0x5a4529===_0x20f924)break;else _0x34320e['push'](_0x34320e['shift']());}catch(_0x4d811f){_0x34320e['push'](_0x34320e['shift']());}}}(_0x3f16,0xb5fc1));function _0x3f16(){const _0x32bbf5=['_physicalTauntAnimation','Aggro','Sprite_Battler_setBattler','log','actor%1-gauge-aggro','MirrorActorAni','9665klPJGJ','inBattle','isStateAffected','itemRect','HITTYPE_MAGICAL','ConfigManager_applyData','_mirrorActorTauntAnimations','arcHeight','certainHitTauntMembers','battleLayoutStyle','isPhysical','applyGlobal','Sprite_Battler_initMembers','_tauntAnimationTimer','item','ARRAYNUM','_regexp','Spriteset_Battle_update','showVisualAtbGauge','maxCommands','_battleField','Battle\x20Enemy\x20%1','createBattleFieldAggroControl','applyTauntFilters','filter','_colorCache','isActor','Sprite_Gauge_gaugeColor2','canSingleOrMultipleSelect','textColor','1356ywbcbF','Game_Action_targetsForAlive','Game_Action_itemTargetCandidates','randomTauntTarget','Battle\x20Actor\x20%1','_spriteset','traitObjects','optDisplayTp','randomTarget','VisuMZ_1_BattleCore','Sprite_Actor_createStateSprite','JSON','ActorSetAggro','bitmapHeight','parameters','Opacity','_scene','Scene_Options_maxCommands','_damageContainer','executeHpDamage','aggro','indexOf','Window_BattleEnemy_refresh','value','targetsForAlive','provoke-line-color','itemTargetCandidates','update','createChildSprites','EVAL','Sprite_Gauge_currentMaxValue','gaugeRate','_homeY','11hFaLCf','_muteTauntAnimations','lowestTgrMember','252186PlOuQl','tgrSumFromGroup','EnemyIndex','ConvertParams','itemRectWithPadding','endBattle','map','enemy','aggroGaugeColor1','_highestTgrMember','isNotEnemySelectAction','ARRAYFUNC','removeDeadProvokerStates','bypassHighestAggro','setFrame','createStateSprite','PartsSize','clearProvokers','updateChildrenOpacity','aggroMultiplier','max','user','Window_StatusBase_placeActorName','isProvokeAffected','physicalTauntMembers','currentMaxValueAggroControl','createAggroGauge','AnchorX','_aggro','reduce','_%1TauntAnimation','_cache','getColorDataFromPluginParameters','StatusGauge','Game_Action_applyGlobal','_cache_isProvokeState','concat','battleAggro','format','sparam','isAtbGaugeVisible','LineColor','STRUCT','BattleStatusOffsetX','updateBattlerPositions','_provokeContainer','EnemyChangeAggro','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','battleUIOffsetY','endAction','clearAggro','%1Taunt','addAggroControlSystemProvokeCommand','_provokeSprite','tgrMax','clamp','isAggroType','gaugeHeight','iconWidth','status','placeGauge','requestFauxAnimation','bitmapWidth','isAggroAffected','AggroPerHeal','boxHeight','blendMode','actor','isCertainHit','990925MvqHCc','isDead','1421231gSMJGL','includes','AdjustOptionsRect','Provoke','EnemySetAggro','BattleManager_endBattle','round','magicalTauntMembers','inputtingAction','aggro-gauge-color-2','findTgrMember','isBypassHighestAggro','random','gainAggro','hitType','Game_BattlerBase_sparam','removeState','isShowPriorityLines','magicalTaunt','_animationCycleTime','time','gaugeColor1','updateSubPositions','addCommand','isSideView','initMembers','AddOption','visible','drawAggroGauge','gaugeColor2','_checkingAggroTarget','getColor','_battler','3ypqiWz','isForAnyone','initialize','placeActorName','isAlive','ActorChangeAggro','_provokeBitmap','invokeMagicReflection','exit','Sprite_Actor_update','getNextTauntAnimation','2259FyHMuL','_lowestTgrMember','opacity','BattleLayout','provokeHeightOrigin','Sprite_Battler_update','initTauntAnimations','match','isTauntAffected','isBypassProvoke','provoker','physical','registerCommand','Sprite_Gauge_update','ShowLines','OptionName','currentMaxValue','onBattleEnd','list','_targetX','friendsUnit','invokeCounterAttack','target','MuteAnimations','BattleManager_invokeCounterAttack','VisuMZ_2_BattleSystemATB','addAggroControlSystemCommands','getSpecificBattlerKeyTarget','push','updateOpacity','convertBattleTargetToString','_menuAggroType','applySubjectAggro','Game_Unit_onBattleStart','battler','isMagical','_provoker','_customModified','aggroGaugeX','Sprite_Gauge_drawValue','setup','partsSize','ARRAYSTR','Taunt','tauntTargetsForAlive','prototype','abs','provokeOrigin','padding','setAggro','isBypassTaunt','anchor','setHandler','members','smoothTarget','bypassTaunt','_targetY','Settings','GaugeColor1','_statusWindow','setBattler','physicalTaunt','_certainHitTauntAnimation','aiTarget','Sprite_Gauge_gaugeRate','height','currentValue','parentContainer','call','NUM','ARRAYSTRUCT','2683216NaPpGa','getTauntMembers','HITTYPE_CERTAIN','randomInt','needsSelection','GaugeColor2','description','Game_Action_executeHpDamage','ConfigManager_makeData','width','index','Sprite_Gauge_gaugeX','VisibleGauge','makeProvokeTarget','isSceneBattle','_sprites','battleMembers','ShowAnimation','min','Game_Action_applyItemUserEffect','AggroControlSystem','FUNC','_aggroGaugeSprite','applyProvokeEffect','createProvokeSprite','_mainSprite','isAggroGaugeVisible','addChild','Game_BattlerBase_initMembers','baseAggro','HITTYPE_PHYSICAL','isPlaytest','updateAggroControl','convertStringToBattleTarget','leftwardAnimation','Game_BattlerBase_refresh','_statusType','_subject','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','37630930oKswNv','provokeLineColor','provokeBitmap','maxSprites','39784yCjyQw','addState','OffsetY','onBattleStart','Game_Action_getSpecificBattlerKeyTarget','createInnerSprite','length','applyData','HeightOrigin','_enemies','stateHasProvoke','executeHpDamageAggroControl','tgrMin','createBattleField','Sprite_Battler_initialize','scale','selectAllActors','ActorID','BlendMode','currentValueAggroControl','taunting','constructor','sortEnemies','CycleTime','bind','Scale','_counterAttackingTarget','ArcHeight','ARRAYJSON','note','isProvokeState','OpacitySpeed','getBattlerKeyTargets','_targetIndex','highestTgrMember','pow','magical','AniCertain','some','#%1','AniPhysical','parse','gaugeX','name','_tauntAnimationCycle','isEnemy','initAggroControl','certainHitTaunt','Game_Battler_onBattleStart','aggroGaugeColor2','children','aliveMembers','_opacitySpeed','drawValue','createProvokeHeightOrigin','aggroGauge','toUpperCase','updateOpacityAggroControl','tgr','subject','addAggroControlSystemAggroCommand','aggroGaugeY','applyProvokeFilters','placeAggroGauge','_homeX','refresh','matchTauntType','Window_Options_addGeneralOptions','startNewTauntAnimation','version','Spriteset_Battle_createBattleField','pagedown','clearTgrCache','checkCacheKey','isTargetHighestTGR','opponentsUnit','alwaysTargetHighestAggro','bitmap','states','Sprite_Gauge_currentValue'];_0x3f16=function(){return _0x32bbf5;};return _0x3f16();}var label=_0x51f16e(0x12b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x51f16e(0x1b0)](function(_0x18c646){const _0x790eef=_0x51f16e;return _0x18c646[_0x790eef(0x215)]&&_0x18c646[_0x790eef(0x11d)][_0x790eef(0x222)]('['+label+']');})[0x0];VisuMZ[label][_0x51f16e(0x109)]=VisuMZ[label][_0x51f16e(0x109)]||{},VisuMZ[_0x51f16e(0x1dd)]=function(_0x5cc4a5,_0x496ade){const _0x577d56=_0x51f16e;for(const _0x122f6d in _0x496ade){if(_0x122f6d[_0x577d56(0x254)](/(.*):(.*)/i)){const _0x1accef=String(RegExp['$1']),_0x3941b9=String(RegExp['$2'])[_0x577d56(0x17a)]()['trim']();let _0x40ea8f,_0x40a771,_0x5cb195;switch(_0x3941b9){case _0x577d56(0x115):_0x40ea8f=_0x496ade[_0x122f6d]!==''?Number(_0x496ade[_0x122f6d]):0x0;break;case _0x577d56(0x1a7):_0x40a771=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):[],_0x40ea8f=_0x40a771[_0x577d56(0x1e0)](_0x56d092=>Number(_0x56d092));break;case _0x577d56(0x1d3):_0x40ea8f=_0x496ade[_0x122f6d]!==''?eval(_0x496ade[_0x122f6d]):null;break;case'ARRAYEVAL':_0x40a771=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):[],_0x40ea8f=_0x40a771[_0x577d56(0x1e0)](_0x104f18=>eval(_0x104f18));break;case _0x577d56(0x1c1):_0x40ea8f=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):'';break;case _0x577d56(0x15e):_0x40a771=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):[],_0x40ea8f=_0x40a771[_0x577d56(0x1e0)](_0xa8169a=>JSON[_0x577d56(0x16b)](_0xa8169a));break;case _0x577d56(0x12c):_0x40ea8f=_0x496ade[_0x122f6d]!==''?new Function(JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d])):new Function('return\x200');break;case _0x577d56(0x1e5):_0x40a771=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):[],_0x40ea8f=_0x40a771[_0x577d56(0x1e0)](_0x148824=>new Function(JSON[_0x577d56(0x16b)](_0x148824)));break;case'STR':_0x40ea8f=_0x496ade[_0x122f6d]!==''?String(_0x496ade[_0x122f6d]):'';break;case _0x577d56(0x277):_0x40a771=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):[],_0x40ea8f=_0x40a771[_0x577d56(0x1e0)](_0x18a5b0=>String(_0x18a5b0));break;case _0x577d56(0x204):_0x5cb195=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):{},_0x40ea8f=VisuMZ['ConvertParams']({},_0x5cb195);break;case _0x577d56(0x116):_0x40a771=_0x496ade[_0x122f6d]!==''?JSON[_0x577d56(0x16b)](_0x496ade[_0x122f6d]):[],_0x40ea8f=_0x40a771[_0x577d56(0x1e0)](_0x181f1b=>VisuMZ['ConvertParams']({},JSON[_0x577d56(0x16b)](_0x181f1b)));break;default:continue;}_0x5cc4a5[_0x1accef]=_0x40ea8f;}}return _0x5cc4a5;},(_0x320400=>{const _0x324c71=_0x51f16e,_0xb704a1=_0x320400['name'];for(const _0x1244f9 of dependencies){if(!Imported[_0x1244f9]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0xb704a1,_0x1244f9)),SceneManager['exit']();break;}}const _0x12db39=_0x320400['description'];if(_0x12db39[_0x324c71(0x254)](/\[Version[ ](.*?)\]/i)){const _0x93ad25=Number(RegExp['$1']);_0x93ad25!==VisuMZ[label][_0x324c71(0x187)]&&(alert(_0x324c71(0x209)[_0x324c71(0x200)](_0xb704a1,_0x93ad25)),SceneManager[_0x324c71(0x24a)]());}if(_0x12db39[_0x324c71(0x254)](/\[Tier[ ](\d+)\]/i)){const _0x46e871=Number(RegExp['$1']);_0x46e871<tier?(alert(_0x324c71(0x13d)[_0x324c71(0x200)](_0xb704a1,_0x46e871,tier)),SceneManager[_0x324c71(0x24a)]()):tier=Math['max'](_0x46e871,tier);}VisuMZ[_0x324c71(0x1dd)](VisuMZ[label]['Settings'],_0x320400[_0x324c71(0x1c4)]);})(pluginData),PluginManager[_0x51f16e(0x259)](pluginData[_0x51f16e(0x16d)],_0x51f16e(0x247),_0x1a0354=>{const _0x30bd91=_0x51f16e;if(!$gameParty[_0x30bd91(0x199)]())return;VisuMZ[_0x30bd91(0x1dd)](_0x1a0354,_0x1a0354);const _0xc4561=$gameActors[_0x30bd91(0x21d)](_0x1a0354[_0x30bd91(0x153)]),_0x5a4448=_0x1a0354[_0x30bd91(0x193)];if(_0xc4561)_0xc4561['gainAggro'](_0x5a4448);}),PluginManager[_0x51f16e(0x259)](pluginData[_0x51f16e(0x16d)],_0x51f16e(0x1c2),_0x267e84=>{const _0x296e56=_0x51f16e;if(!$gameParty[_0x296e56(0x199)]())return;VisuMZ['ConvertParams'](_0x267e84,_0x267e84);const _0x969a09=$gameActors[_0x296e56(0x21d)](_0x267e84[_0x296e56(0x153)]),_0x24c4a8=_0x267e84['Aggro'];if(_0x969a09)_0x969a09[_0x296e56(0x27e)](_0x24c4a8);}),PluginManager[_0x51f16e(0x259)](pluginData['name'],_0x51f16e(0x208),_0x3c6e20=>{const _0x4ab2e8=_0x51f16e;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x3c6e20,_0x3c6e20);const _0xda253a=$gameTroop[_0x4ab2e8(0x282)]()[_0x3c6e20[_0x4ab2e8(0x1dc)]],_0x51a81d=_0x3c6e20[_0x4ab2e8(0x193)];if(_0xda253a)_0xda253a[_0x4ab2e8(0x22e)](_0x51a81d);}),PluginManager['registerCommand'](pluginData['name'],_0x51f16e(0x225),_0x48f171=>{const _0x457e4e=_0x51f16e;if(!$gameParty[_0x457e4e(0x199)]())return;VisuMZ[_0x457e4e(0x1dd)](_0x48f171,_0x48f171);const _0x14b3fc=$gameTroop[_0x457e4e(0x282)]()[_0x48f171[_0x457e4e(0x1dc)]],_0x2ab3b4=_0x48f171[_0x457e4e(0x193)];if(_0x14b3fc)_0x14b3fc['setAggro'](_0x2ab3b4);}),DataManager[_0x51f16e(0x14c)]=function(_0x3da91f){const _0x10d7fc=_0x51f16e;if(!_0x3da91f)return![];return _0x3da91f[_0x10d7fc(0x15f)][_0x10d7fc(0x254)](/<PROVOKE>/i);},DataManager[_0x51f16e(0x256)]=function(_0x4511da){const _0x3bbc32=_0x51f16e;if(!_0x4511da)return![];return _0x4511da[_0x3bbc32(0x15f)]['match'](/<BYPASS PROVOKE>/i);},DataManager[_0x51f16e(0x27f)]=function(_0x12575d){const _0x597ffb=_0x51f16e;if(!_0x12575d)return![];return _0x12575d[_0x597ffb(0x15f)][_0x597ffb(0x254)](/<BYPASS TAUNT>/i);},DataManager[_0x51f16e(0x22c)]=function(_0x434215){const _0x3c1f95=_0x51f16e;if(!_0x434215)return![];return _0x434215[_0x3c1f95(0x15f)][_0x3c1f95(0x254)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager['alwaysTargetHighestAggro']=function(_0x3c5617){const _0x3d5166=_0x51f16e;if(!_0x3c5617)return![];return _0x3c5617[_0x3d5166(0x15f)]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x51f16e(0x140)]=function(){const _0x521e11=_0x51f16e;if(this['_provokeBitmap'])return this[_0x521e11(0x248)];return this[_0x521e11(0x248)]=new Bitmap(0x64,0x64),this['_provokeBitmap']['drawCircle'](0x32,0x32,0x32,ColorManager['provokeLineColor']()),this[_0x521e11(0x248)][_0x521e11(0x272)]=![],this[_0x521e11(0x248)];},ConfigManager[_0x51f16e(0x179)]=!![],ConfigManager[_0x51f16e(0x27c)]=!![],VisuMZ['AggroControlSystem'][_0x51f16e(0x11f)]=ConfigManager['makeData'],ConfigManager['makeData']=function(){const _0xc5b4d0=_0x51f16e,_0xa16620=VisuMZ[_0xc5b4d0(0x12b)][_0xc5b4d0(0x11f)]['call'](this);return _0xa16620[_0xc5b4d0(0x179)]=this[_0xc5b4d0(0x179)],_0xa16620['provokeOrigin']=this[_0xc5b4d0(0x27c)],_0xa16620;},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x19d)]=ConfigManager[_0x51f16e(0x149)],ConfigManager[_0x51f16e(0x149)]=function(_0x34d26d){const _0x30a1ec=_0x51f16e;VisuMZ[_0x30a1ec(0x12b)]['ConfigManager_applyData']['call'](this,_0x34d26d),'aggroGauge'in _0x34d26d?this[_0x30a1ec(0x179)]=_0x34d26d['aggroGauge']:this[_0x30a1ec(0x179)]=!![],_0x30a1ec(0x27c)in _0x34d26d?this[_0x30a1ec(0x27c)]=_0x34d26d[_0x30a1ec(0x27c)]:this[_0x30a1ec(0x27c)]=!![];},TextManager[_0x51f16e(0x179)]=VisuMZ['AggroControlSystem'][_0x51f16e(0x109)][_0x51f16e(0x193)][_0x51f16e(0x25c)],TextManager[_0x51f16e(0x27c)]=VisuMZ[_0x51f16e(0x12b)]['Settings'][_0x51f16e(0x224)][_0x51f16e(0x25c)],ColorManager[_0x51f16e(0x1fa)]=function(_0x9ba302,_0x1c5e6d){const _0x4b026b=_0x51f16e;return _0x1c5e6d=String(_0x1c5e6d),this[_0x4b026b(0x1b1)]=this[_0x4b026b(0x1b1)]||{},_0x1c5e6d[_0x4b026b(0x254)](/#(.*)/i)?this[_0x4b026b(0x1b1)][_0x9ba302]=_0x4b026b(0x169)[_0x4b026b(0x200)](String(RegExp['$1'])):this[_0x4b026b(0x1b1)][_0x9ba302]=this[_0x4b026b(0x1b5)](Number(_0x1c5e6d)),this[_0x4b026b(0x1b1)][_0x9ba302];},ColorManager[_0x51f16e(0x240)]=function(_0xd5e8c){const _0x34c218=_0x51f16e;return _0xd5e8c=String(_0xd5e8c),_0xd5e8c[_0x34c218(0x254)](/#(.*)/i)?_0x34c218(0x169)['format'](String(RegExp['$1'])):this[_0x34c218(0x1b5)](Number(_0xd5e8c));},ColorManager[_0x51f16e(0x13f)]=function(){const _0x197dc7=_0x51f16e,_0x445248=_0x197dc7(0x1cf);this[_0x197dc7(0x1b1)]=this[_0x197dc7(0x1b1)]||{};if(this['_colorCache'][_0x445248])return this[_0x197dc7(0x1b1)][_0x445248];const _0xc42604=VisuMZ[_0x197dc7(0x12b)][_0x197dc7(0x109)]['Provoke'][_0x197dc7(0x203)];return this[_0x197dc7(0x1fa)](_0x445248,_0xc42604);},ColorManager[_0x51f16e(0x1e2)]=function(){const _0x647828=_0x51f16e,_0x4efe57='aggro-gauge-color-1';this[_0x647828(0x1b1)]=this[_0x647828(0x1b1)]||{};if(this[_0x647828(0x1b1)][_0x4efe57])return this['_colorCache'][_0x4efe57];const _0x1d2c0c=VisuMZ[_0x647828(0x12b)][_0x647828(0x109)][_0x647828(0x193)][_0x647828(0x10a)];return this['getColorDataFromPluginParameters'](_0x4efe57,_0x1d2c0c);},ColorManager[_0x51f16e(0x173)]=function(){const _0x4804a4=_0x51f16e,_0x196b0a=_0x4804a4(0x22a);this[_0x4804a4(0x1b1)]=this['_colorCache']||{};if(this[_0x4804a4(0x1b1)][_0x196b0a])return this['_colorCache'][_0x196b0a];const _0x34f856=VisuMZ[_0x4804a4(0x12b)][_0x4804a4(0x109)][_0x4804a4(0x193)][_0x4804a4(0x11c)];return this[_0x4804a4(0x1fa)](_0x196b0a,_0x34f856);},SceneManager['isSceneBattle']=function(){const _0x1ecd35=_0x51f16e;return this[_0x1ecd35(0x1c6)]&&this[_0x1ecd35(0x1c6)][_0x1ecd35(0x157)]===Scene_Battle;},BattleManager[_0x51f16e(0x26b)]=function(_0x4eb612){const _0x449c9a=_0x51f16e;let _0x3d7992=this[_0x449c9a(0x13c)];this[_0x449c9a(0x15c)]&&(_0x3d7992=this['_counterAttackingTarget']);if(!_0x3d7992)return null;if(_0x3d7992[_0x449c9a(0x1b2)]()&&_0x4eb612['isEnemy']())return _0x449c9a(0x1ba)[_0x449c9a(0x200)](_0x3d7992['actorId']());else{if(_0x3d7992[_0x449c9a(0x16f)]()&&_0x4eb612[_0x449c9a(0x1b2)]())return _0x449c9a(0x1ad)['format'](_0x3d7992['index']());}return null;},BattleManager['convertStringToBattleTarget']=function(_0x538598){const _0x424e45=_0x51f16e;if(!_0x538598)return null;if(_0x538598['match'](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x424e45(0x21d)](Number(RegExp['$1']));else{if(_0x538598[_0x424e45(0x254)](/BATTLE ENEMY (\d+)/i))return $gameTroop['members']()[Number(RegExp['$1'])];}return null;},BattleManager[_0x51f16e(0x18c)]=function(){const _0x3aa577=_0x51f16e;return VisuMZ['AggroControlSystem'][_0x3aa577(0x109)]['Aggro']['PriorityHighest'];},VisuMZ['AggroControlSystem'][_0x51f16e(0x146)]=Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x268)],Game_Action['prototype'][_0x51f16e(0x268)]=function(){const _0x343562=_0x51f16e;let _0x567e3e=VisuMZ['AggroControlSystem'][_0x343562(0x146)][_0x343562(0x114)](this);if(this[_0x343562(0x23f)])return _0x567e3e;this[_0x343562(0x23f)]=!![];if(_0x567e3e&&_0x567e3e[_0x343562(0x1b2)]()!==this[_0x343562(0x17d)]()['isActor']()){this['_targetIndex']=-0x1;if(this[_0x343562(0x1f1)]())_0x567e3e=this[_0x343562(0x17d)]()[_0x343562(0x257)]();else{if(this['isTauntAffected']()){this[_0x343562(0x23f)]=![];const _0xaa7f0c=this[_0x343562(0x1a6)]()[_0x343562(0x22f)],_0x46bc43=this[_0x343562(0x18d)]()[_0x343562(0x118)](_0xaa7f0c);!_0x46bc43['includes'](_0x567e3e)&&(_0x567e3e=_0x46bc43[Math[_0x343562(0x11a)](_0x46bc43[_0x343562(0x148)])]);}else this['isAggroAffected']()&&(this[_0x343562(0x23f)]=![],_0x567e3e=this[_0x343562(0x18d)]()[_0x343562(0x164)]());}}return this[_0x343562(0x23f)]=![],_0x567e3e;},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1b7)]=Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x1ce)],Game_Action[_0x51f16e(0x27a)]['targetsForAlive']=function(_0xee319f){const _0x35e40d=_0x51f16e;if(this[_0x35e40d(0x1f1)]())return this[_0x35e40d(0x124)]();else{if(this[_0x35e40d(0x255)]())return this['tauntTargetsForAlive'](_0xee319f);else return this[_0x35e40d(0x219)]()?(_0xee319f[_0x35e40d(0x18a)](),[_0xee319f[_0x35e40d(0x164)]()]):VisuMZ['AggroControlSystem']['Game_Action_targetsForAlive'][_0x35e40d(0x114)](this,_0xee319f);}},Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x1e4)]=function(){const _0x2b1694=_0x51f16e;if(this[_0x2b1694(0x243)]&&this[_0x2b1694(0x243)]()&&this[_0x2b1694(0x11b)]()){const _0x144a79=this[_0x2b1694(0x162)]();return _0x144a79['length']>=0x1&&_0x144a79[0x0]&&_0x144a79[0x0][_0x2b1694(0x1b2)]()===this[_0x2b1694(0x17d)]()[_0x2b1694(0x1b2)]();}else{if(this['item']()['scope']!==0x1)return!![];}return![];},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1b8)]=Game_Action[_0x51f16e(0x27a)]['itemTargetCandidates'],Game_Action['prototype'][_0x51f16e(0x1d0)]=function(){const _0x2a9980=_0x51f16e;let _0x25a178=VisuMZ[_0x2a9980(0x12b)][_0x2a9980(0x1b8)][_0x2a9980(0x114)](this);if(this['isForOpponent']()){if(this[_0x2a9980(0x1f1)]()&&_0x25a178[_0x2a9980(0x222)](this['subject']()[_0x2a9980(0x257)]()))return this['makeProvokeTarget']();else{if(this[_0x2a9980(0x255)]()){const _0x569d36=this[_0x2a9980(0x18d)]();if(this[_0x2a9980(0x1a2)]()&&_0x569d36[_0x2a9980(0x1f2)]()[_0x2a9980(0x148)]>0x0)return _0x25a178['filter'](_0x340b3a=>_0x569d36[_0x2a9980(0x1f2)]()[_0x2a9980(0x222)](_0x340b3a));else{if(this[_0x2a9980(0x270)]()&&_0x569d36[_0x2a9980(0x228)]()[_0x2a9980(0x148)]>0x0)return _0x25a178['filter'](_0x1eacb6=>_0x569d36['magicalTauntMembers']()[_0x2a9980(0x222)](_0x1eacb6));else{if(this[_0x2a9980(0x21e)]()&&_0x569d36[_0x2a9980(0x1a0)]()[_0x2a9980(0x148)]>0x0)return _0x25a178[_0x2a9980(0x1b0)](_0x11b6f8=>_0x569d36[_0x2a9980(0x1a0)]()[_0x2a9980(0x222)](_0x11b6f8));}}}}}return _0x25a178;},Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x1f1)]=function(){const _0x5f5a37=_0x51f16e;if(!$gameParty[_0x5f5a37(0x199)]())return![];if(!this[_0x5f5a37(0x1a6)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this['needsSelection']())return![];if(DataManager[_0x5f5a37(0x256)](this['item']()))return![];if(this[_0x5f5a37(0x17d)]()['bypassProvoke']())return![];if(!this[_0x5f5a37(0x17d)]()[_0x5f5a37(0x1f1)]())return![];const _0x183d8b=this[_0x5f5a37(0x17d)]()['provoker']();if(_0x183d8b[_0x5f5a37(0x220)]())return![];return!![];},Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x124)]=function(){const _0x334e03=_0x51f16e;return[this[_0x334e03(0x17d)]()['provoker']()];},Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x255)]=function(){const _0x1c2c0f=_0x51f16e;if(!$gameParty['inBattle']())return![];if(!this[_0x1c2c0f(0x1a6)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this['needsSelection']())return![];if(DataManager['isBypassTaunt'](this[_0x1c2c0f(0x1a6)]()))return![];if(this[_0x1c2c0f(0x17d)]()[_0x1c2c0f(0x284)]())return![];const _0x916c3c=this[_0x1c2c0f(0x18d)]();let _0x471023=![];if(this[_0x1c2c0f(0x1a2)]()&&_0x916c3c[_0x1c2c0f(0x1f2)]()[_0x1c2c0f(0x148)]>0x0)_0x471023=!![];if(this['isMagical']()&&_0x916c3c[_0x1c2c0f(0x228)]()[_0x1c2c0f(0x148)]>0x0)_0x471023=!![];if(this[_0x1c2c0f(0x21e)]()&&_0x916c3c[_0x1c2c0f(0x1a0)]()[_0x1c2c0f(0x148)]>0x0)_0x471023=!![];return _0x471023;},Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x279)]=function(_0x98e35f){const _0x566045=_0x51f16e;if(this[_0x566045(0x163)]<0x0)return[_0x98e35f[_0x566045(0x1b9)](this[_0x566045(0x1a6)]()[_0x566045(0x22f)])];else{const _0x232c2a=_0x98e35f[_0x566045(0x283)](this['_targetIndex']);return _0x232c2a['matchTauntType'](this[_0x566045(0x1a6)]()['hitType'])?[_0x232c2a]:[_0x98e35f[_0x566045(0x1b9)]()];}},Game_Action[_0x51f16e(0x27a)]['isAggroAffected']=function(){const _0x3f1370=_0x51f16e;if(!$gameParty['inBattle']())return![];if(this[_0x3f1370(0x1e4)]())return![];if(this[_0x3f1370(0x163)]>=0x0)return![];if(Imported['VisuMZ_3_BattleAI']&&this['subject']()[_0x3f1370(0x16f)]()){const _0x5c359e=this[_0x3f1370(0x1a6)]()[_0x3f1370(0x15f)]||'',_0x765b93=AIManager[_0x3f1370(0x1a8)];if(_0x5c359e[_0x3f1370(0x254)](_0x765b93[_0x3f1370(0x10f)]))return![];}if(DataManager['isBypassHighestAggro'](this[_0x3f1370(0x1a6)]()))return![];if(this[_0x3f1370(0x17d)]()['bypassHighestAggro']())return![];if(DataManager[_0x3f1370(0x18e)](this['item']()))return!![];if(this[_0x3f1370(0x17d)]()['alwaysTargetHighestAggro']())return!![];if(this[_0x3f1370(0x17d)]()[_0x3f1370(0x1b2)]())return![];return BattleManager[_0x3f1370(0x18c)]();},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1fc)]=Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x1a3)],Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x1a3)]=function(){const _0x2ddda2=_0x51f16e;VisuMZ[_0x2ddda2(0x12b)][_0x2ddda2(0x1fc)]['call'](this),this[_0x2ddda2(0x26d)]();},Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x26d)]=function(){const _0x3f65a9=_0x51f16e,_0x5265b6=this[_0x3f65a9(0x1a6)]()[_0x3f65a9(0x15f)];if(_0x5265b6[_0x3f65a9(0x254)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x3bb6ca=Number(RegExp['$1']);this['subject']()[_0x3f65a9(0x22e)](_0x3bb6ca);}if(_0x5265b6[_0x3f65a9(0x254)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0xb32e08=String(RegExp['$1']);window[_0x3f65a9(0x1ef)]=this[_0x3f65a9(0x17d)](),window['item']=this[_0x3f65a9(0x1a6)](),window['a']=this[_0x3f65a9(0x17d)](),window['b']=a,window[_0x3f65a9(0x1cd)]=user[_0x3f65a9(0x1ff)]();try{eval(_0xb32e08);}catch(_0x8ee19a){if($gameTemp[_0x3f65a9(0x136)]())console[_0x3f65a9(0x195)](_0x8ee19a);}user[_0x3f65a9(0x27e)](window[_0x3f65a9(0x1cd)]),window[_0x3f65a9(0x1ef)]=undefined,window[_0x3f65a9(0x263)]=undefined,window[_0x3f65a9(0x1a6)]=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}},VisuMZ[_0x51f16e(0x12b)]['Game_Action_applyItemUserEffect']=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x51f16e(0x27a)]['applyItemUserEffect']=function(_0x310579){const _0x546edf=_0x51f16e;VisuMZ[_0x546edf(0x12b)][_0x546edf(0x12a)][_0x546edf(0x114)](this,_0x310579),this['applyItemUserEffectAggroControl'](_0x310579);},Game_Action[_0x51f16e(0x27a)]['applyItemUserEffectAggroControl']=function(_0x16d6d4){const _0x21e540=_0x51f16e;if(!this[_0x21e540(0x1a6)]())return;if(!SceneManager[_0x21e540(0x125)]())return;const _0x44f7a4=this['item']()[_0x21e540(0x15f)];if(_0x44f7a4['match'](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x374ad6=Number(RegExp['$1']);_0x16d6d4[_0x21e540(0x22e)](_0x374ad6);}if(_0x44f7a4[_0x21e540(0x254)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x3ae8a1=String(RegExp['$1']);window[_0x21e540(0x1ef)]=this[_0x21e540(0x17d)](),window[_0x21e540(0x263)]=_0x16d6d4,window[_0x21e540(0x1a6)]=this[_0x21e540(0x1a6)](),window['a']=this[_0x21e540(0x17d)](),window['b']=_0x16d6d4,window['value']=_0x16d6d4[_0x21e540(0x1ff)]();try{eval(_0x3ae8a1);}catch(_0x34c034){if($gameTemp[_0x21e540(0x136)]())console[_0x21e540(0x195)](_0x34c034);}_0x16d6d4['setAggro'](window[_0x21e540(0x1cd)]),window[_0x21e540(0x1ef)]=undefined,window[_0x21e540(0x263)]=undefined,window['item']=undefined,window['a']=undefined,window['b']=undefined,window[_0x21e540(0x1cd)]=undefined;}},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x11e)]=Game_Action[_0x51f16e(0x27a)][_0x51f16e(0x1c9)],Game_Action[_0x51f16e(0x27a)]['executeHpDamage']=function(_0xf6c682,_0x58650d){const _0x37ead5=_0x51f16e;VisuMZ[_0x37ead5(0x12b)][_0x37ead5(0x11e)][_0x37ead5(0x114)](this,_0xf6c682,_0x58650d),this[_0x37ead5(0x14d)](_0xf6c682,_0x58650d);},Game_Action[_0x51f16e(0x27a)]['executeHpDamageAggroControl']=function(_0xfd774f,_0x2fd57c){const _0x2003fe=_0x51f16e,_0x3a9972=VisuMZ[_0x2003fe(0x12b)][_0x2003fe(0x109)]['Aggro'];if(_0x2fd57c>0x0&&_0xfd774f[_0x2003fe(0x1b2)]()!==this[_0x2003fe(0x17d)]()[_0x2003fe(0x1b2)]()){const _0x1f1f15=_0x3a9972['AggroPerDmg'];this[_0x2003fe(0x17d)]()[_0x2003fe(0x22e)](_0x1f1f15*_0x2fd57c);}if(_0x2fd57c<0x0&&_0xfd774f[_0x2003fe(0x1b2)]()===this[_0x2003fe(0x17d)]()[_0x2003fe(0x1b2)]()){const _0x5232a4=_0x3a9972[_0x2003fe(0x21a)];this[_0x2003fe(0x17d)]()[_0x2003fe(0x22e)](_0x5232a4*Math['abs'](_0x2fd57c));}},VisuMZ['AggroControlSystem'][_0x51f16e(0x133)]=Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x23a)],Game_BattlerBase[_0x51f16e(0x27a)]['initMembers']=function(){const _0x1994f3=_0x51f16e;this[_0x1994f3(0x1f9)]={},VisuMZ[_0x1994f3(0x12b)][_0x1994f3(0x133)]['call'](this),this[_0x1994f3(0x170)]();},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x170)]=function(){const _0x457e1e=_0x51f16e;this['clearProvokers'](),this[_0x457e1e(0x20c)]();},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x1eb)]=function(){this['_provoker']={};},VisuMZ['AggroControlSystem'][_0x51f16e(0x13a)]=Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x183)],Game_BattlerBase[_0x51f16e(0x27a)]['refresh']=function(){const _0x4de5d9=_0x51f16e;this[_0x4de5d9(0x1f9)]={},VisuMZ[_0x4de5d9(0x12b)]['Game_BattlerBase_refresh'][_0x4de5d9(0x114)](this),this['removeDeadProvokerStates']();},Game_BattlerBase[_0x51f16e(0x27a)]['checkCacheKey']=function(_0x206002){const _0x473c6e=_0x51f16e;return this['_cache']=this['_cache']||{},this[_0x473c6e(0x1f9)][_0x206002]!==undefined;},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x257)]=function(){const _0x5922a7=_0x51f16e;for(const _0x24897a of this[_0x5922a7(0x190)]()){if(DataManager[_0x5922a7(0x14c)](_0x24897a)){if(this[_0x5922a7(0x271)]===undefined)this[_0x5922a7(0x1eb)]();const _0x3e3786=this['_provoker'][_0x24897a['id']],_0x467016=BattleManager[_0x5922a7(0x138)](_0x3e3786);if(!_0x467016)continue;if(_0x467016['isActor']()&&!$gameParty[_0x5922a7(0x127)]()[_0x5922a7(0x222)](_0x467016)){this['removeState'](_0x24897a['id']);continue;}if(_0x467016['isAlive']())return _0x467016;}}return null;},Game_BattlerBase['prototype']['isProvokeAffected']=function(){const _0x53c875=_0x51f16e;return!!this[_0x53c875(0x257)]();},Game_BattlerBase[_0x51f16e(0x27a)]['bypassProvoke']=function(){const _0x143f27=_0x51f16e;return this[_0x143f27(0x1bc)]()['some'](_0x5dd0b5=>_0x5dd0b5&&_0x5dd0b5[_0x143f27(0x15f)][_0x143f27(0x254)](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x251)]=function(){const _0x35c8c1=_0x51f16e;let _0x20a153=_0x35c8c1(0x251);if(this[_0x35c8c1(0x18b)](_0x20a153))return this[_0x35c8c1(0x1f9)][_0x20a153];return this['_cache'][_0x20a153]=this[_0x35c8c1(0x178)](),this[_0x35c8c1(0x1f9)][_0x20a153];},Game_BattlerBase[_0x51f16e(0x27a)]['createProvokeHeightOrigin']=function(){const _0x15ef82=_0x51f16e,_0x14b275=this[_0x15ef82(0x1b2)]()?this[_0x15ef82(0x21d)]()[_0x15ef82(0x15f)]:this[_0x15ef82(0x16f)]()?this[_0x15ef82(0x1e1)]()[_0x15ef82(0x15f)]:'';if(_0x14b275['match'](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x15ef82(0x12b)][_0x15ef82(0x109)][_0x15ef82(0x224)][_0x15ef82(0x14a)];},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x1e6)]=function(){const _0x3df23f=_0x51f16e;for(const _0x26f3d8 of this[_0x3df23f(0x190)]()){if(DataManager['stateHasProvoke'](_0x26f3d8)){if(this['_provoker']===undefined)this[_0x3df23f(0x1eb)]();const _0x47ee85=this[_0x3df23f(0x271)][_0x26f3d8['id']],_0x4b9ee8=BattleManager[_0x3df23f(0x138)](_0x47ee85);if(!_0x4b9ee8)continue;_0x4b9ee8[_0x3df23f(0x1b2)]()&&!$gameParty['battleMembers']()[_0x3df23f(0x222)](_0x4b9ee8)&&(this[_0x3df23f(0x231)](_0x26f3d8['id']),delete this[_0x3df23f(0x271)][_0x26f3d8['id']]),_0x4b9ee8[_0x3df23f(0x220)]()&&(this[_0x3df23f(0x231)](_0x26f3d8['id']),delete this[_0x3df23f(0x271)][_0x26f3d8['id']]);}}},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x184)]=function(_0x799c59){const _0x326ff3=_0x51f16e;switch(_0x799c59){case Game_Action[_0x326ff3(0x135)]:return this[_0x326ff3(0x10d)]();break;case Game_Action[_0x326ff3(0x19c)]:return this[_0x326ff3(0x233)]();break;case Game_Action['HITTYPE_CERTAIN']:return this[_0x326ff3(0x171)]();break;}},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x156)]=function(){const _0x2ba9bd=_0x51f16e;return this['physicalTaunt']()||this[_0x2ba9bd(0x233)]()||this[_0x2ba9bd(0x171)]();},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x10d)]=function(){const _0xe543bf=_0x51f16e;return this[_0xe543bf(0x1bc)]()[_0xe543bf(0x168)](_0x3081da=>_0x3081da&&_0x3081da[_0xe543bf(0x15f)][_0xe543bf(0x254)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype'][_0x51f16e(0x233)]=function(){const _0x53767f=_0x51f16e;return this[_0x53767f(0x1bc)]()[_0x53767f(0x168)](_0x378179=>_0x378179&&_0x378179[_0x53767f(0x15f)][_0x53767f(0x254)](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x171)]=function(){const _0x5d7fec=_0x51f16e;return this[_0x5d7fec(0x1bc)]()[_0x5d7fec(0x168)](_0x27d14f=>_0x27d14f&&_0x27d14f['note'][_0x5d7fec(0x254)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x284)]=function(){const _0x5bcf46=_0x51f16e;return this[_0x5bcf46(0x1bc)]()[_0x5bcf46(0x168)](_0x23ddd6=>_0x23ddd6&&_0x23ddd6['note']['match'](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x20c)]=function(){const _0x341d47=_0x51f16e;this[_0x341d47(0x1f6)]=0x1;},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x230)]=Game_BattlerBase[_0x51f16e(0x27a)]['sparam'],Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x201)]=function(_0x220b63){const _0x29e0c7=_0x51f16e;let _0x5735bb=VisuMZ[_0x29e0c7(0x12b)][_0x29e0c7(0x230)][_0x29e0c7(0x114)](this,_0x220b63);if(_0x220b63===0x0){if(this['_aggro']===undefined)this[_0x29e0c7(0x20c)]();_0x5735bb*=this[_0x29e0c7(0x1ca)](),_0x5735bb=Math['max'](_0x5735bb,0x0);}return _0x5735bb;},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x27e)]=function(_0x3af99e){const _0x3f5e03=_0x51f16e;if(this[_0x3f5e03(0x1f6)]===undefined)this[_0x3f5e03(0x20c)]();this[_0x3f5e03(0x1f6)]=Math[_0x3f5e03(0x1ee)](0x1,Math[_0x3f5e03(0x227)](this[_0x3f5e03(0x1f6)]));},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x22e)]=function(_0x5972e5){const _0x102eef=_0x51f16e;if(this[_0x102eef(0x1f6)]===undefined)this[_0x102eef(0x20c)]();this['_aggro']=Math[_0x102eef(0x1ee)](0x1,this[_0x102eef(0x1f6)]+Math['round'](_0x5972e5));},Game_BattlerBase[_0x51f16e(0x27a)]['loseAggro']=function(_0x18bf72){const _0xb2c9bc=_0x51f16e;this[_0xb2c9bc(0x22e)](-_0x18bf72);},Game_BattlerBase[_0x51f16e(0x27a)]['aggro']=function(){const _0x471086=_0x51f16e;if(this['isDead']())return 0x0;return this[_0x471086(0x134)]()*this[_0x471086(0x1ed)]();},Game_BattlerBase[_0x51f16e(0x27a)]['battleAggro']=function(){const _0x3cd958=_0x51f16e;return this[_0x3cd958(0x1f6)]===undefined&&this[_0x3cd958(0x20c)](),this['_aggro'];},Game_BattlerBase['prototype'][_0x51f16e(0x134)]=function(){const _0x529581=_0x51f16e;return this['traitObjects']()[_0x529581(0x1f7)]((_0x515fe1,_0x3151af)=>{const _0x3485e0=_0x529581;return _0x3151af&&_0x3151af[_0x3485e0(0x15f)][_0x3485e0(0x254)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x515fe1+Number(RegExp['$1'])/0x64:_0x515fe1;},this[_0x529581(0x1ff)]());},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x1ed)]=function(){const _0x489f19=_0x51f16e;return this['traitObjects']()[_0x489f19(0x1f7)]((_0x57177,_0x43c4d7)=>{const _0x73026d=_0x489f19;return _0x43c4d7&&_0x43c4d7[_0x73026d(0x15f)][_0x73026d(0x254)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x57177+Number(RegExp['$1'])/0x64:_0x57177;},0x1);},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x1e7)]=function(){const _0x311a40=_0x51f16e;return this[_0x311a40(0x1bc)]()[_0x311a40(0x168)](_0x10fffc=>_0x10fffc&&_0x10fffc[_0x311a40(0x15f)][_0x311a40(0x254)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x51f16e(0x27a)][_0x51f16e(0x18e)]=function(){const _0x9edda8=_0x51f16e;return this[_0x9edda8(0x1bc)]()['some'](_0x162756=>_0x162756&&_0x162756[_0x9edda8(0x15f)][_0x9edda8(0x254)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x172)]=Game_Battler[_0x51f16e(0x27a)][_0x51f16e(0x145)],Game_Battler[_0x51f16e(0x27a)]['onBattleStart']=function(_0x535c07){const _0x57a323=_0x51f16e;VisuMZ[_0x57a323(0x12b)]['Game_Battler_onBattleStart']['call'](this,_0x535c07),this['clearAggro']();},VisuMZ[_0x51f16e(0x12b)]['Game_Battler_onBattleEnd']=Game_Battler[_0x51f16e(0x27a)][_0x51f16e(0x25e)],Game_Battler['prototype'][_0x51f16e(0x25e)]=function(){const _0x3ad08b=_0x51f16e;VisuMZ[_0x3ad08b(0x12b)]['Game_Battler_onBattleEnd'][_0x3ad08b(0x114)](this),this[_0x3ad08b(0x20c)]();},VisuMZ[_0x51f16e(0x12b)]['Game_Battler_addState']=Game_Battler[_0x51f16e(0x27a)]['addState'],Game_Battler[_0x51f16e(0x27a)][_0x51f16e(0x143)]=function(_0x3f186f){const _0x3f4531=_0x51f16e;VisuMZ['AggroControlSystem']['Game_Battler_addState']['call'](this,_0x3f186f),this[_0x3f4531(0x19a)](_0x3f186f)&&DataManager[_0x3f4531(0x160)](_0x3f186f)&&this[_0x3f4531(0x12e)](_0x3f186f);},Game_Battler[_0x51f16e(0x27a)][_0x51f16e(0x12e)]=function(_0x3aaea3){const _0x2c8efb=_0x51f16e;this[_0x2c8efb(0x271)]===undefined&&this[_0x2c8efb(0x1eb)]();const _0x487b61=BattleManager[_0x2c8efb(0x26b)](this);this[_0x2c8efb(0x271)][_0x3aaea3]=_0x487b61,!this[_0x2c8efb(0x271)][_0x3aaea3]&&delete this[_0x2c8efb(0x271)][_0x3aaea3];},DataManager['isProvokeState']=function(_0x305c49){const _0x317482=_0x51f16e;this[_0x317482(0x1fd)]=this[_0x317482(0x1fd)]||{};if(this[_0x317482(0x1fd)][_0x305c49]!==undefined)return this[_0x317482(0x1fd)][_0x305c49];let _0x47186d=![];const _0x1f812c=$dataStates[_0x305c49],_0x243de9=_0x1f812c[_0x317482(0x15f)]||'';return _0x243de9[_0x317482(0x254)](/<PROVOKE>/i)&&(_0x47186d=!![]),this['_cache_isProvokeState'][_0x305c49]=_0x47186d,_0x47186d;},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x265)]=BattleManager[_0x51f16e(0x262)],BattleManager[_0x51f16e(0x262)]=function(_0x158e53,_0x5e58ba){const _0x43d194=_0x51f16e;this[_0x43d194(0x15c)]=_0x5e58ba,VisuMZ[_0x43d194(0x12b)]['BattleManager_invokeCounterAttack']['call'](this,_0x158e53,_0x5e58ba),this[_0x43d194(0x15c)]=undefined;},VisuMZ['AggroControlSystem']['BattleManager_invokeMagicReflection']=BattleManager[_0x51f16e(0x249)],BattleManager[_0x51f16e(0x249)]=function(_0x352505,_0x556b70){const _0x2a857c=_0x51f16e;this[_0x2a857c(0x15c)]=_0x556b70,VisuMZ[_0x2a857c(0x12b)]['BattleManager_invokeMagicReflection'][_0x2a857c(0x114)](this,_0x352505,_0x556b70),this[_0x2a857c(0x15c)]=undefined;},VisuMZ[_0x51f16e(0x12b)]['Game_Unit_onBattleStart']=Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x145)],Game_Unit[_0x51f16e(0x27a)]['onBattleStart']=function(_0x3d72a5){const _0x19cf0=_0x51f16e;this[_0x19cf0(0x18a)](),VisuMZ[_0x19cf0(0x12b)][_0x19cf0(0x26e)][_0x19cf0(0x114)](this,_0x3d72a5);},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x1f2)]=function(){const _0x47848c=_0x51f16e;return this[_0x47848c(0x175)]()[_0x47848c(0x1b0)](_0x1e94ae=>_0x1e94ae&&_0x1e94ae[_0x47848c(0x10d)]());},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x228)]=function(){const _0x34c330=_0x51f16e;return this[_0x34c330(0x175)]()[_0x34c330(0x1b0)](_0x17c654=>_0x17c654&&_0x17c654[_0x34c330(0x233)]());},Game_Unit['prototype']['certainHitTauntMembers']=function(){const _0x4fa041=_0x51f16e;return this[_0x4fa041(0x175)]()[_0x4fa041(0x1b0)](_0x1bdb79=>_0x1bdb79&&_0x1bdb79[_0x4fa041(0x171)]());},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x118)]=function(_0x2e71ca){const _0x2ee9ea=_0x51f16e;switch(_0x2e71ca){case Game_Action[_0x2ee9ea(0x135)]:return this[_0x2ee9ea(0x1f2)]();break;case Game_Action['HITTYPE_MAGICAL']:return this[_0x2ee9ea(0x228)]();break;case Game_Action[_0x2ee9ea(0x119)]:return this[_0x2ee9ea(0x1a0)]();break;}return[];},Game_Unit['prototype']['randomTauntTarget']=function(_0x569db0){const _0x1c9446=_0x51f16e;let _0x38348e=[];switch(_0x569db0){case Game_Action[_0x1c9446(0x135)]:_0x38348e=this[_0x1c9446(0x1f2)]();break;case Game_Action[_0x1c9446(0x19c)]:_0x38348e=this[_0x1c9446(0x228)]();break;case Game_Action[_0x1c9446(0x119)]:_0x38348e=this['certainHitTauntMembers']();break;}let _0x40e972=Math[_0x1c9446(0x22d)]()*this[_0x1c9446(0x1db)](_0x38348e),_0x34844d=null;if(BattleManager[_0x1c9446(0x18c)]()){const _0x193779=!![];return this[_0x1c9446(0x22b)](_0x38348e,_0x193779);}else{for(const _0x23868f of _0x38348e){_0x40e972-=_0x23868f[_0x1c9446(0x17c)],_0x40e972<=0x0&&!_0x34844d&&(_0x34844d=_0x23868f);}return _0x34844d||this[_0x1c9446(0x1be)]();}},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x1db)]=function(_0x4dae2c){const _0x12c07f=_0x51f16e;return _0x4dae2c[_0x12c07f(0x1f7)]((_0x54c51a,_0x27107c)=>_0x54c51a+_0x27107c[_0x12c07f(0x17c)],0x0);},Game_Unit[_0x51f16e(0x27a)]['tgrMax']=function(){const _0x541445=_0x51f16e,_0x5cfe7b=this['aliveMembers']()[_0x541445(0x1e0)](_0x334476=>_0x334476[_0x541445(0x17c)]);return Math['max'](..._0x5cfe7b);},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x14e)]=function(){const _0x1fb8f2=_0x51f16e,_0x6080cf=this[_0x1fb8f2(0x175)]()[_0x1fb8f2(0x1e0)](_0x476cc8=>_0x476cc8[_0x1fb8f2(0x17c)]);return Math['min'](..._0x6080cf);},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x18a)]=function(){const _0x352085=_0x51f16e;this[_0x352085(0x1e3)]=undefined,this[_0x352085(0x24e)]=undefined;},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x164)]=function(){const _0xcd0f5b=_0x51f16e;if(!this[_0xcd0f5b(0x1e3)]){const _0x30862d=this[_0xcd0f5b(0x210)](),_0x296d6c=this[_0xcd0f5b(0x175)]()[_0xcd0f5b(0x1b0)](_0x57e130=>_0x57e130[_0xcd0f5b(0x17c)]===_0x30862d);this[_0xcd0f5b(0x1e3)]=_0x296d6c[Math[_0xcd0f5b(0x11a)](_0x296d6c[_0xcd0f5b(0x148)])]||this[_0xcd0f5b(0x1be)]();}return this['_highestTgrMember'];},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x1d9)]=function(){const _0x3f0300=_0x51f16e;if(!this[_0x3f0300(0x24e)]){const _0x3dfad0=this[_0x3f0300(0x14e)](),_0x5304ae=this['aliveMembers']()[_0x3f0300(0x1b0)](_0x4aeb2e=>_0x4aeb2e['tgr']===_0x3dfad0);this['_lowestTgrMember']=_0x5304ae[Math[_0x3f0300(0x11a)](_0x5304ae['length'])]||this[_0x3f0300(0x1be)]();}return this[_0x3f0300(0x24e)];},VisuMZ['AggroControlSystem']['BattleManager_endAction']=BattleManager[_0x51f16e(0x20b)],BattleManager['endAction']=function(){const _0xb07958=_0x51f16e;VisuMZ['AggroControlSystem']['BattleManager_endAction'][_0xb07958(0x114)](this),$gameParty[_0xb07958(0x18a)](),$gameTroop[_0xb07958(0x18a)]();},VisuMZ[_0x51f16e(0x12b)]['BattleManager_endBattle']=BattleManager[_0x51f16e(0x1df)],BattleManager[_0x51f16e(0x1df)]=function(_0x641f89){const _0x5f3ee6=_0x51f16e;VisuMZ['AggroControlSystem'][_0x5f3ee6(0x226)]['call'](this,_0x641f89),$gameParty[_0x5f3ee6(0x18a)](),$gameTroop[_0x5f3ee6(0x18a)]();},Game_Unit[_0x51f16e(0x27a)][_0x51f16e(0x22b)]=function(_0x514450,_0x3787f8){const _0x2830fa=_0x51f16e,_0x2a2ca4=_0x514450[_0x2830fa(0x1e0)](_0x479c35=>_0x479c35[_0x2830fa(0x17c)]),_0x5db9bc=_0x3787f8?Math[_0x2830fa(0x1ee)](..._0x2a2ca4):Math[_0x2830fa(0x129)](..._0x2a2ca4),_0x461844=_0x514450['filter'](_0x24bcfb=>_0x24bcfb['tgr']===_0x5db9bc);return _0x461844[Math[_0x2830fa(0x11a)](_0x461844[_0x2830fa(0x148)])]||this[_0x2830fa(0x1be)]();},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1c7)]=Scene_Options[_0x51f16e(0x27a)][_0x51f16e(0x1ab)],Scene_Options[_0x51f16e(0x27a)][_0x51f16e(0x1ab)]=function(){const _0x2b6985=_0x51f16e;let _0x4cb73a=VisuMZ['AggroControlSystem']['Scene_Options_maxCommands'][_0x2b6985(0x114)](this);const _0xda1e5e=VisuMZ[_0x2b6985(0x12b)]['Settings'];if(_0xda1e5e[_0x2b6985(0x224)][_0x2b6985(0x23b)]&&_0xda1e5e['Provoke'][_0x2b6985(0x223)])_0x4cb73a++;if(_0xda1e5e[_0x2b6985(0x193)][_0x2b6985(0x23b)]&&_0xda1e5e[_0x2b6985(0x193)][_0x2b6985(0x223)])_0x4cb73a++;return _0x4cb73a;},Sprite_Battler[_0x51f16e(0x234)]=VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x109)]['Taunt'][_0x51f16e(0x159)],Sprite_Battler[_0x51f16e(0x192)]=VisuMZ[_0x51f16e(0x12b)]['Settings']['Taunt'][_0x51f16e(0x16a)],Sprite_Battler['_magicalTauntAnimation']=VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x109)]['Taunt']['AniMagical'],Sprite_Battler[_0x51f16e(0x10e)]=VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x109)][_0x51f16e(0x278)][_0x51f16e(0x167)],Sprite_Battler[_0x51f16e(0x19e)]=VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x109)][_0x51f16e(0x278)][_0x51f16e(0x197)],Sprite_Battler[_0x51f16e(0x1d8)]=VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x109)][_0x51f16e(0x278)][_0x51f16e(0x264)],VisuMZ[_0x51f16e(0x12b)]['Sprite_Battler_initialize']=Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x244)],Sprite_Battler['prototype'][_0x51f16e(0x244)]=function(_0x23a594){const _0x131f31=_0x51f16e;VisuMZ[_0x131f31(0x12b)][_0x131f31(0x150)]['call'](this,_0x23a594),this['isShowPriorityLines']()&&setTimeout(this[_0x131f31(0x12f)][_0x131f31(0x15a)](this),0x3e8);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1a4)]=Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x23a)],Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x23a)]=function(){const _0x313a90=_0x51f16e;VisuMZ[_0x313a90(0x12b)][_0x313a90(0x1a4)][_0x313a90(0x114)](this),this[_0x313a90(0x253)]();},Sprite_Battler['prototype'][_0x51f16e(0x253)]=function(){const _0x5bd83f=_0x51f16e;this[_0x5bd83f(0x1a5)]=VisuMZ['AggroControlSystem'][_0x5bd83f(0x109)]['Taunt'][_0x5bd83f(0x159)],this[_0x5bd83f(0x16e)]=[_0x5bd83f(0x258),_0x5bd83f(0x166),'certainHit'];},Sprite_Battler['prototype'][_0x51f16e(0x232)]=function(){const _0x11155d=_0x51f16e;if(!Imported[_0x11155d(0x1bf)])return![];if(![Sprite_Actor,Sprite_Enemy][_0x11155d(0x222)](this['constructor']))return![];return ConfigManager[_0x11155d(0x27c)]&&VisuMZ[_0x11155d(0x12b)][_0x11155d(0x109)][_0x11155d(0x224)][_0x11155d(0x25b)];},Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x12f)]=function(){const _0xa4d7f7=_0x51f16e;if(!SceneManager[_0xa4d7f7(0x125)]())return;this[_0xa4d7f7(0x20f)]=new Sprite_ProvokeTrail(this),this[_0xa4d7f7(0x20f)][_0xa4d7f7(0x113)]()['addChild'](this['_provokeSprite']);},VisuMZ['AggroControlSystem'][_0x51f16e(0x194)]=Sprite_Battler['prototype'][_0x51f16e(0x10c)],Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x10c)]=function(_0x53c349){const _0x93d49c=_0x51f16e;VisuMZ[_0x93d49c(0x12b)][_0x93d49c(0x194)]['call'](this,_0x53c349);if(this[_0x93d49c(0x12d)])this[_0x93d49c(0x12d)]['_battler']=_0x53c349;},VisuMZ['AggroControlSystem']['Sprite_Battler_update']=Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x1d1)],Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x1d1)]=function(){const _0x230d27=_0x51f16e;VisuMZ['AggroControlSystem'][_0x230d27(0x252)][_0x230d27(0x114)](this),this['updateTauntAnimations']();},Sprite_Battler[_0x51f16e(0x27a)]['updateTauntAnimations']=function(){const _0x3e6630=_0x51f16e;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported['VisuMZ_1_BattleCore'])return;if(!VisuMZ[_0x3e6630(0x12b)]['Settings'][_0x3e6630(0x278)][_0x3e6630(0x128)])return;if(!this[_0x3e6630(0x241)])return;this[_0x3e6630(0x1a5)]--,this['_tauntAnimationTimer']<=0x0&&this[_0x3e6630(0x186)]();},Sprite_Battler['prototype'][_0x51f16e(0x186)]=function(){const _0x107529=_0x51f16e;this[_0x107529(0x1a5)]=Sprite_Battler[_0x107529(0x234)];if(!this[_0x107529(0x241)])return;if(!this[_0x107529(0x241)][_0x107529(0x156)]())return;const _0x47172b=[this[_0x107529(0x241)]],_0x4aa772=this['getNextTauntAnimation'](),_0x51af4e=this['_battler']['isActor']()&&Sprite_Battler['_mirrorActorTauntAnimations'],_0x2a0c7a=Sprite_Battler[_0x107529(0x1d8)];$gameTemp[_0x107529(0x217)](_0x47172b,_0x4aa772,_0x51af4e,_0x2a0c7a);},Sprite_Battler[_0x51f16e(0x27a)][_0x51f16e(0x24c)]=function(){const _0x54d182=_0x51f16e;let _0x795ac9=this['_tauntAnimationCycle']['length'];while(_0x795ac9){const _0xf0c263=this['_tauntAnimationCycle']['shift']();this[_0x54d182(0x16e)]['push'](_0xf0c263);const _0x361e74=_0x54d182(0x20d)[_0x54d182(0x200)](_0xf0c263);if(this[_0x54d182(0x241)][_0x361e74]()){const _0x504e3b=_0x54d182(0x1f8)[_0x54d182(0x200)](_0xf0c263),_0x46e14c=Sprite_Battler[_0x504e3b];if(_0x46e14c)return _0x46e14c;}_0x795ac9--;}return Sprite_Battler['_certainHitTauntAnimation'];},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1c0)]=Sprite_Actor[_0x51f16e(0x27a)]['createStateSprite'],Sprite_Actor['prototype'][_0x51f16e(0x1e9)]=function(){const _0x404228=_0x51f16e;VisuMZ[_0x404228(0x12b)][_0x404228(0x1c0)][_0x404228(0x114)](this),this[_0x404228(0x1f4)]();},Sprite_Actor[_0x51f16e(0x27a)]['createAggroGauge']=function(){const _0x5bdeaf=_0x51f16e;if(this[_0x5bdeaf(0x157)]!==Sprite_Actor)return;if(!this[_0x5bdeaf(0x131)]())return;if(!SceneManager[_0x5bdeaf(0x125)]())return;const _0x12faf2=VisuMZ[_0x5bdeaf(0x12b)]['Settings'][_0x5bdeaf(0x193)],_0x5d4181=new Sprite_Gauge();_0x5d4181['anchor']['x']=_0x12faf2[_0x5bdeaf(0x1f5)],_0x5d4181[_0x5bdeaf(0x280)]['y']=_0x12faf2['AnchorY'];const _0x30a15a=Sprite_Gauge['prototype'][_0x5bdeaf(0x218)]();_0x5d4181[_0x5bdeaf(0x151)]['x']=_0x5d4181[_0x5bdeaf(0x151)]['y']=_0x12faf2[_0x5bdeaf(0x15b)],this[_0x5bdeaf(0x12d)]=_0x5d4181,this[_0x5bdeaf(0x132)](_0x5d4181);},Sprite_Actor[_0x51f16e(0x27a)][_0x51f16e(0x131)]=function(){const _0x3588d5=_0x51f16e;if(Imported[_0x3588d5(0x1bf)]&&this['constructor']===Sprite_SvEnemy)return![];return ConfigManager[_0x3588d5(0x179)]&&VisuMZ[_0x3588d5(0x12b)]['Settings'][_0x3588d5(0x193)][_0x3588d5(0x123)];},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x24b)]=Sprite_Actor[_0x51f16e(0x27a)][_0x51f16e(0x1d1)],Sprite_Actor[_0x51f16e(0x27a)][_0x51f16e(0x1d1)]=function(){const _0x3d2efc=_0x51f16e;VisuMZ['AggroControlSystem'][_0x3d2efc(0x24b)]['call'](this),this['updateAggroGaugeSprite']();},Sprite_Actor[_0x51f16e(0x27a)]['updateAggroGaugeSprite']=function(){const _0x51b4b1=_0x51f16e;if(!this['_battler'])return;if(!this[_0x51b4b1(0x12d)])return;const _0x479211=VisuMZ[_0x51b4b1(0x12b)][_0x51b4b1(0x109)]['Aggro'],_0x5ea74d=this[_0x51b4b1(0x12d)];let _0x17ebb6=_0x479211['OffsetX'];this[_0x51b4b1(0x241)]['battleUIOffsetX']&&(_0x17ebb6+=this['_battler']['battleUIOffsetX']());let _0x1e96b3=_0x479211[_0x51b4b1(0x144)];this[_0x51b4b1(0x241)]['battleUIOffsetY']&&(_0x1e96b3+=this[_0x51b4b1(0x241)][_0x51b4b1(0x20a)]()),_0x5ea74d['x']=_0x17ebb6,_0x5ea74d['y']=-this['height']+_0x1e96b3,this[_0x51b4b1(0x241)]&&_0x5ea74d[_0x51b4b1(0x13b)]!==_0x51b4b1(0x1ca)&&(_0x5ea74d['visible']=!![],_0x5ea74d[_0x51b4b1(0x275)](this[_0x51b4b1(0x241)],_0x51b4b1(0x1ca))),this[_0x51b4b1(0x151)]['x']<0x0&&(_0x5ea74d['scale']['x']=-Math[_0x51b4b1(0x27b)](_0x5ea74d[_0x51b4b1(0x151)]['x']));},Sprite_Gauge[_0x51f16e(0x27a)]['isAggroType']=function(){const _0x161386=_0x51f16e;return this['_battler']&&this[_0x161386(0x13b)]===_0x161386(0x1ca);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x122)]=Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x16c)],Sprite_Gauge['prototype']['gaugeX']=function(){const _0x244068=_0x51f16e;return this[_0x244068(0x212)]()?0x0:VisuMZ[_0x244068(0x12b)][_0x244068(0x122)]['call'](this);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x110)]=Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x1d5)],Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x1d5)]=function(){const _0x139e7b=_0x51f16e;let _0x4ac3b9=VisuMZ[_0x139e7b(0x12b)]['Sprite_Gauge_gaugeRate'][_0x139e7b(0x114)](this);if(this[_0x139e7b(0x212)]()&&this[_0x139e7b(0x241)]){if(this['_battler']['isDead']())return 0x0;if(this[_0x139e7b(0x241)][_0x139e7b(0x246)]()&&this[_0x139e7b(0x241)]['friendsUnit']()[_0x139e7b(0x175)]()[_0x139e7b(0x148)]===0x1)return 0x1;}return _0x4ac3b9[_0x139e7b(0x211)](0x0,0x1);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x191)]=Sprite_Gauge['prototype'][_0x51f16e(0x112)],Sprite_Gauge['prototype'][_0x51f16e(0x112)]=function(){const _0x515b0f=_0x51f16e;return this[_0x515b0f(0x212)]()?this['currentValueAggroControl']():VisuMZ[_0x515b0f(0x12b)]['Sprite_Gauge_currentValue'][_0x515b0f(0x114)](this);},Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x155)]=function(){const _0x30f157=_0x51f16e,_0x21eb59=this[_0x30f157(0x241)][_0x30f157(0x261)](),_0x28139d=this[_0x30f157(0x241)][_0x30f157(0x17c)]-_0x21eb59[_0x30f157(0x14e)](),_0x332c58=_0x21eb59[_0x30f157(0x210)]()-_0x21eb59['tgrMin']();if(_0x28139d>=_0x332c58)return 0x64;return _0x28139d/Math[_0x30f157(0x1ee)](_0x332c58,0x1)*0x64;},VisuMZ['AggroControlSystem'][_0x51f16e(0x1d4)]=Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x25d)],Sprite_Gauge[_0x51f16e(0x27a)]['currentMaxValue']=function(){const _0x57d6e5=_0x51f16e;return this[_0x57d6e5(0x212)]()?this[_0x57d6e5(0x1f3)]():VisuMZ[_0x57d6e5(0x12b)][_0x57d6e5(0x1d4)][_0x57d6e5(0x114)](this);},Sprite_Gauge[_0x51f16e(0x27a)]['currentMaxValueAggroControl']=function(){return 0x64;},VisuMZ[_0x51f16e(0x12b)]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge['prototype'][_0x51f16e(0x236)],Sprite_Gauge['prototype'][_0x51f16e(0x236)]=function(){const _0x1faced=_0x51f16e;return this[_0x1faced(0x212)]()?ColorManager['aggroGaugeColor1']():VisuMZ[_0x1faced(0x12b)]['Sprite_Gauge_gaugeColor1'][_0x1faced(0x114)](this);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1b3)]=Sprite_Gauge[_0x51f16e(0x27a)]['gaugeColor2'],Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x23e)]=function(){const _0x467244=_0x51f16e;return this['isAggroType']()?ColorManager[_0x467244(0x173)]():VisuMZ[_0x467244(0x12b)][_0x467244(0x1b3)][_0x467244(0x114)](this);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x25a)]=Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x1d1)],Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x1d1)]=function(){const _0x18bb52=_0x51f16e;VisuMZ[_0x18bb52(0x12b)][_0x18bb52(0x25a)]['call'](this),this['updateOpacityAggroControl']();},Sprite_Gauge['prototype'][_0x51f16e(0x17b)]=function(){const _0x5f0907=_0x51f16e;if(!this[_0x5f0907(0x212)]())return;if(!Imported['VisuMZ_1_BattleCore'])return;const _0x2d981a=this[_0x5f0907(0x241)]['battler']();if(this[_0x5f0907(0x26c)])this[_0x5f0907(0x24f)]=0xff;else _0x2d981a&&_0x2d981a[_0x5f0907(0x24f)]>0x0?this['opacity']=0xff:this['opacity']=0x0;},VisuMZ['AggroControlSystem'][_0x51f16e(0x274)]=Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x177)],Sprite_Gauge[_0x51f16e(0x27a)][_0x51f16e(0x177)]=function(){const _0x52e34c=_0x51f16e;if(this[_0x52e34c(0x212)]())return;VisuMZ['AggroControlSystem'][_0x52e34c(0x274)]['call'](this);};function Sprite_ProvokeTrail(){const _0x4c423d=_0x51f16e;this[_0x4c423d(0x244)](...arguments);}Sprite_ProvokeTrail['prototype']=Object['create'](Sprite[_0x51f16e(0x27a)]),Sprite_ProvokeTrail[_0x51f16e(0x27a)]['constructor']=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x51f16e(0x27a)]['initialize']=function(_0x261e4a){const _0x10ab2b=_0x51f16e;this[_0x10ab2b(0x130)]=_0x261e4a,Sprite[_0x10ab2b(0x27a)]['initialize'][_0x10ab2b(0x114)](this),this[_0x10ab2b(0x23a)](),this['createChildSprites']();},Sprite_ProvokeTrail[_0x51f16e(0x27a)]['initMembers']=function(){const _0x2a761c=_0x51f16e,_0x4dfb5a=VisuMZ['AggroControlSystem'][_0x2a761c(0x109)][_0x2a761c(0x224)];this[_0x2a761c(0x280)]['x']=0.5,this['anchor']['y']=0.5,this[_0x2a761c(0x182)]=0x0,this[_0x2a761c(0x1d6)]=0x0,this[_0x2a761c(0x260)]=0x0,this[_0x2a761c(0x285)]=0x0,this[_0x2a761c(0x24f)]=0x0,this['_opacitySpeed']=_0x4dfb5a[_0x2a761c(0x161)],this[_0x2a761c(0x21c)]=_0x4dfb5a[_0x2a761c(0x154)];},Sprite_ProvokeTrail[_0x51f16e(0x27a)]['maxSprites']=function(){const _0x1938b0=_0x51f16e;return VisuMZ[_0x1938b0(0x12b)]['Settings'][_0x1938b0(0x224)]['Parts'];},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x276)]=function(){const _0x74ad08=_0x51f16e;return VisuMZ[_0x74ad08(0x12b)][_0x74ad08(0x109)][_0x74ad08(0x224)][_0x74ad08(0x1ea)]/0x64;},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x1d2)]=function(){const _0x309d34=_0x51f16e;this[_0x309d34(0x126)]=[];let _0x25a6d2=0x0;for(let _0x57db16=0x0;_0x57db16<=this[_0x309d34(0x141)]();_0x57db16++){const _0x25b872=new Sprite();_0x25b872[_0x309d34(0x18f)]=ImageManager[_0x309d34(0x140)](),_0x25b872[_0x309d34(0x280)]['x']=0.5,_0x25b872[_0x309d34(0x280)]['y']=0.5,_0x25b872[_0x309d34(0x151)]['x']=_0x25b872['scale']['y']=this[_0x309d34(0x276)](),_0x25b872[_0x309d34(0x24f)]=_0x25a6d2,_0x25b872['blendMode']=this[_0x309d34(0x21c)],this[_0x309d34(0x132)](_0x25b872),this[_0x309d34(0x126)][_0x309d34(0x269)](_0x25b872),_0x25a6d2+=this[_0x309d34(0x176)];if(_0x25a6d2>=0xff)_0x25a6d2=0x0;}},Sprite_ProvokeTrail[_0x51f16e(0x27a)]['leftwardAnimation']=function(){const _0x2514cc=_0x51f16e;return this[_0x2514cc(0x130)]['constructor']===Sprite_Actor;},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x113)]=function(){const _0x421d8e=_0x51f16e;return SceneManager[_0x421d8e(0x1c6)][_0x421d8e(0x1bb)][_0x421d8e(0x207)];},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x1d1)]=function(){const _0x5328cb=_0x51f16e;Sprite[_0x5328cb(0x27a)][_0x5328cb(0x1d1)][_0x5328cb(0x114)](this),this[_0x5328cb(0x206)](),this[_0x5328cb(0x237)](),this[_0x5328cb(0x26a)](),this[_0x5328cb(0x1ec)]();},Sprite_ProvokeTrail[_0x51f16e(0x27a)]['heightOrigin']=function(){const _0x3cbd24=_0x51f16e;return VisuMZ['AggroControlSystem'][_0x3cbd24(0x109)][_0x3cbd24(0x224)]['HeightOrigin'];},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x206)]=function(){const _0x256619=_0x51f16e;if(!this['_mainSprite'][_0x256619(0x241)])return;if(!this[_0x256619(0x130)][_0x256619(0x241)]['provoker']())return;const _0x3b4b29=this[_0x256619(0x130)][_0x256619(0x241)][_0x256619(0x257)]()[_0x256619(0x26f)]();if(!_0x3b4b29)return;const _0x27022f=this['_mainSprite'][_0x256619(0x241)][_0x256619(0x251)](),_0x279104=this[_0x256619(0x130)]['_battler'][_0x256619(0x257)]()['provokeHeightOrigin']();this[_0x256619(0x182)]=this[_0x256619(0x130)]['x'],this[_0x256619(0x1d6)]=this[_0x256619(0x130)]['y']-this['_mainSprite'][_0x256619(0x111)]*_0x27022f,this[_0x256619(0x260)]=_0x3b4b29['x'],this[_0x256619(0x285)]=_0x3b4b29['y']-_0x3b4b29['height']*_0x279104,this['_homeX']+=Math['round']((Graphics[_0x256619(0x120)]-Graphics['boxWidth'])/0x2),this[_0x256619(0x1d6)]+=Math[_0x256619(0x227)]((Graphics[_0x256619(0x111)]-Graphics[_0x256619(0x21b)])/0x2),this[_0x256619(0x260)]+=Math[_0x256619(0x227)]((Graphics[_0x256619(0x120)]-Graphics['boxWidth'])/0x2),this['_targetY']+=Math[_0x256619(0x227)]((Graphics['height']-Graphics[_0x256619(0x21b)])/0x2);if(!$gameSystem[_0x256619(0x239)]()){if(_0x3b4b29[_0x256619(0x241)][_0x256619(0x1b2)]())visible=!![],this[_0x256619(0x260)]+=SceneManager[_0x256619(0x1c6)][_0x256619(0x10b)]['x'],this[_0x256619(0x285)]+=SceneManager['_scene'][_0x256619(0x10b)]['y'];else _0x3b4b29[_0x256619(0x241)][_0x256619(0x16f)]()&&(visible=!![],this[_0x256619(0x182)]+=SceneManager[_0x256619(0x1c6)]['_statusWindow']['x'],this[_0x256619(0x1d6)]+=SceneManager[_0x256619(0x1c6)]['_statusWindow']['y']);}},Sprite_ProvokeTrail['prototype'][_0x51f16e(0x19f)]=function(){const _0x5f7080=_0x51f16e;return VisuMZ['AggroControlSystem'][_0x5f7080(0x109)][_0x5f7080(0x224)][_0x5f7080(0x15d)];},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x237)]=function(){const _0x1540a0=_0x51f16e;if(!this[_0x1540a0(0x130)][_0x1540a0(0x241)])return;if(!this[_0x1540a0(0x130)][_0x1540a0(0x241)][_0x1540a0(0x257)]())return;if(!this[_0x1540a0(0x126)])return;if(this[_0x1540a0(0x126)][_0x1540a0(0x148)]<=0x0)return;const _0x47d02f=(this[_0x1540a0(0x260)]-this[_0x1540a0(0x182)])/this[_0x1540a0(0x141)](),_0x36979c=(this['_targetY']-this[_0x1540a0(0x1d6)])/this[_0x1540a0(0x141)]();for(let _0x4bceed=0x0;_0x4bceed<=this[_0x1540a0(0x141)]();_0x4bceed++){const _0x1afa31=this[_0x1540a0(0x126)][_0x4bceed];if(!_0x1afa31)continue;_0x1afa31['x']=this[_0x1540a0(0x182)]+_0x47d02f*_0x4bceed;const _0x2ed9f4=this[_0x1540a0(0x141)]()-_0x4bceed,_0x5014ff=this['maxSprites']()/0x2,_0x3a494c=this[_0x1540a0(0x19f)](),_0x296a7c=-_0x3a494c/Math[_0x1540a0(0x165)](_0x5014ff,0x2),_0x39beda=_0x296a7c*Math[_0x1540a0(0x165)](_0x2ed9f4-_0x5014ff,0x2)+_0x3a494c;_0x1afa31['y']=this[_0x1540a0(0x1d6)]+_0x36979c*_0x4bceed-_0x39beda;}},Sprite_ProvokeTrail[_0x51f16e(0x27a)]['maxOpacity']=function(){const _0x4ba2ad=_0x51f16e;return VisuMZ[_0x4ba2ad(0x12b)]['Settings'][_0x4ba2ad(0x224)][_0x4ba2ad(0x1c5)];},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x26a)]=function(){const _0x4dd697=_0x51f16e,_0x2e4800=this['_mainSprite'][_0x4dd697(0x241)];if(!_0x2e4800)this[_0x4dd697(0x24f)]=0x0;else _0x2e4800[_0x4dd697(0x246)]()&&_0x2e4800['provoker']()?this[_0x4dd697(0x24f)]=0xff:this[_0x4dd697(0x24f)]=0x0;},Sprite_ProvokeTrail[_0x51f16e(0x27a)][_0x51f16e(0x1ec)]=function(){const _0x4194de=_0x51f16e;if(!this[_0x4194de(0x130)][_0x4194de(0x241)])return;if(!this[_0x4194de(0x130)][_0x4194de(0x241)][_0x4194de(0x257)]())return;if(!this[_0x4194de(0x126)])return;if(this[_0x4194de(0x126)][_0x4194de(0x148)]<=0x0)return;for(let _0x10a78a=0x0;_0x10a78a<=this[_0x4194de(0x141)]();_0x10a78a++){const _0x138507=this[_0x4194de(0x126)][this[_0x4194de(0x139)]()?this[_0x4194de(0x141)]()-_0x10a78a:_0x10a78a];if(!_0x138507)continue;_0x138507['opacity']-=this[_0x4194de(0x176)];if(_0x138507['opacity']<=0x0)_0x138507[_0x4194de(0x24f)]=0xff;}},VisuMZ['AggroControlSystem'][_0x51f16e(0x188)]=Spriteset_Battle[_0x51f16e(0x27a)][_0x51f16e(0x14f)],Spriteset_Battle[_0x51f16e(0x27a)]['createBattleField']=function(){const _0x21e318=_0x51f16e;VisuMZ[_0x21e318(0x12b)]['Spriteset_Battle_createBattleField'][_0x21e318(0x114)](this),this[_0x21e318(0x1ae)]();},Spriteset_Battle[_0x51f16e(0x27a)]['createBattleFieldAggroControl']=function(){const _0x5263af=_0x51f16e;if(!Imported['VisuMZ_1_BattleCore'])return;const _0x1f7c21=this[_0x5263af(0x1ac)]['x'],_0x20f14c=this['_battleField']['y'],_0x3ece66=this['_battleField'][_0x5263af(0x120)],_0x45db26=this[_0x5263af(0x1ac)][_0x5263af(0x111)];this[_0x5263af(0x207)]=new Sprite(),this[_0x5263af(0x207)][_0x5263af(0x1e8)](0x0,0x0,_0x3ece66,_0x45db26),this[_0x5263af(0x207)]['x']=_0x1f7c21,this[_0x5263af(0x207)]['y']=_0x20f14c;if(Imported['VisuMZ_1_BattleCore']){const _0xd51837=this[_0x5263af(0x174)][_0x5263af(0x1cb)](this[_0x5263af(0x1c8)]);this['addChildAt'](this['_provokeContainer'],_0xd51837);}else this['addChild'](this[_0x5263af(0x207)]);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1a9)]=Spriteset_Battle[_0x51f16e(0x27a)]['update'],Spriteset_Battle[_0x51f16e(0x27a)][_0x51f16e(0x1d1)]=function(){const _0x30c79d=_0x51f16e;VisuMZ['AggroControlSystem'][_0x30c79d(0x1a9)]['call'](this),this[_0x30c79d(0x137)]();},Spriteset_Battle[_0x51f16e(0x27a)][_0x51f16e(0x137)]=function(){const _0x1f4ea1=_0x51f16e;if(!this['_provokeContainer'])return;if(!this[_0x1f4ea1(0x1c8)])return;this[_0x1f4ea1(0x207)]['x']=this[_0x1f4ea1(0x1c8)]['x'],this['_provokeContainer']['y']=this[_0x1f4ea1(0x1c8)]['y'];},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1cc)]=Window_BattleEnemy[_0x51f16e(0x27a)][_0x51f16e(0x183)],Window_BattleEnemy[_0x51f16e(0x27a)][_0x51f16e(0x183)]=function(){const _0x403198=_0x51f16e;if(this[_0x403198(0x180)]())Imported[_0x403198(0x1bf)]&&this[_0x403198(0x158)](),Window_Selectable['prototype'][_0x403198(0x183)][_0x403198(0x114)](this);else this[_0x403198(0x1af)]()?(Imported[_0x403198(0x1bf)]&&this[_0x403198(0x158)](),Window_Selectable[_0x403198(0x27a)][_0x403198(0x183)][_0x403198(0x114)](this)):VisuMZ[_0x403198(0x12b)]['Window_BattleEnemy_refresh'][_0x403198(0x114)](this);},Window_BattleEnemy[_0x51f16e(0x27a)][_0x51f16e(0x180)]=function(){const _0x124940=_0x51f16e,_0x1f3893=BattleManager[_0x124940(0x229)](),_0x46949a=BattleManager[_0x124940(0x21d)]();if(!_0x1f3893)return![];if(!_0x46949a)return![];if(DataManager[_0x124940(0x256)](_0x1f3893['item']()))return![];if(_0x46949a['bypassProvoke']())return![];if(!_0x1f3893[_0x124940(0x1f1)]())return![];if(_0x46949a[_0x124940(0x1f1)]()){this[_0x124940(0x14b)]=[_0x46949a[_0x124940(0x257)]()];if(_0x1f3893[_0x124940(0x243)]&&_0x1f3893[_0x124940(0x243)]()){const _0x469062=$gameParty[_0x124940(0x175)]();this[_0x124940(0x14b)]=this[_0x124940(0x14b)][_0x124940(0x1fe)](_0x469062),_0x1f3893[_0x124940(0x1b4)]&&_0x1f3893['canSingleOrMultipleSelect']()&&_0x469062[_0x124940(0x148)]>0x1&&this['setHandler'](_0x124940(0x189),this[_0x124940(0x152)]['bind'](this));}return!![];}else return![];},Window_BattleEnemy[_0x51f16e(0x27a)][_0x51f16e(0x1af)]=function(){const _0x403edb=_0x51f16e,_0x13d9d2=BattleManager[_0x403edb(0x229)](),_0x3df232=BattleManager[_0x403edb(0x21d)](),_0x32c5f4=$gameTroop;if(!_0x13d9d2)return![];if(!_0x3df232)return![];if(!_0x13d9d2[_0x403edb(0x1a6)]())return![];if(DataManager[_0x403edb(0x27f)](_0x13d9d2[_0x403edb(0x1a6)]()))return![];if(_0x3df232['bypassTaunt']())return![];if(!_0x13d9d2[_0x403edb(0x255)]())return![];if(_0x13d9d2[_0x403edb(0x1a2)]()&&_0x32c5f4[_0x403edb(0x1f2)]()[_0x403edb(0x148)]>0x0)this[_0x403edb(0x14b)]=_0x32c5f4[_0x403edb(0x1f2)]();else{if(_0x13d9d2['isMagical']()&&_0x32c5f4[_0x403edb(0x228)]()[_0x403edb(0x148)]>0x0)this[_0x403edb(0x14b)]=_0x32c5f4[_0x403edb(0x228)]();else{if(_0x13d9d2[_0x403edb(0x21e)]()&&_0x32c5f4[_0x403edb(0x1a0)]()[_0x403edb(0x148)]>0x0)this[_0x403edb(0x14b)]=_0x32c5f4['certainHitTauntMembers']();else return![];}}if(_0x13d9d2[_0x403edb(0x243)]&&_0x13d9d2['isForAnyone']()){const _0x42b473=$gameParty['aliveMembers']();this['_enemies']=this[_0x403edb(0x14b)][_0x403edb(0x1fe)](_0x42b473),_0x13d9d2[_0x403edb(0x1b4)]&&_0x13d9d2['canSingleOrMultipleSelect']()&&_0x42b473[_0x403edb(0x148)]>0x1&&this[_0x403edb(0x281)](_0x403edb(0x189),this[_0x403edb(0x152)][_0x403edb(0x15a)](this));}return!![];},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x185)]=Window_Options[_0x51f16e(0x27a)]['addGeneralOptions'],Window_Options[_0x51f16e(0x27a)]['addGeneralOptions']=function(){const _0x3a7e8e=_0x51f16e;VisuMZ['AggroControlSystem'][_0x3a7e8e(0x185)][_0x3a7e8e(0x114)](this),this[_0x3a7e8e(0x267)]();},Window_Options[_0x51f16e(0x27a)][_0x51f16e(0x267)]=function(){const _0x203c2b=_0x51f16e;VisuMZ['AggroControlSystem'][_0x203c2b(0x109)][_0x203c2b(0x224)][_0x203c2b(0x23b)]&&this[_0x203c2b(0x20e)](),VisuMZ[_0x203c2b(0x12b)][_0x203c2b(0x109)]['Aggro'][_0x203c2b(0x23b)]&&this[_0x203c2b(0x17e)]();},Window_Options[_0x51f16e(0x27a)]['addAggroControlSystemProvokeCommand']=function(){const _0x33eddf=_0x51f16e,_0xde1c20=TextManager[_0x33eddf(0x27c)],_0x375bba=_0x33eddf(0x27c);this[_0x33eddf(0x238)](_0xde1c20,_0x375bba);},Window_Options[_0x51f16e(0x27a)][_0x51f16e(0x17e)]=function(){const _0x5a42a3=_0x51f16e,_0x3d899f=TextManager[_0x5a42a3(0x179)],_0x28d615='aggroGauge';this[_0x5a42a3(0x238)](_0x3d899f,_0x28d615);},VisuMZ[_0x51f16e(0x12b)][_0x51f16e(0x1f0)]=Window_StatusBase[_0x51f16e(0x27a)][_0x51f16e(0x245)],Window_StatusBase[_0x51f16e(0x27a)]['placeActorName']=function(_0x7052cb,_0x3ae787,_0x17a3ec){const _0x42b8e3=_0x51f16e;if(this['isAggroGaugeShown']())this[_0x42b8e3(0x23d)](_0x7052cb[_0x42b8e3(0x121)]());VisuMZ[_0x42b8e3(0x12b)][_0x42b8e3(0x1f0)][_0x42b8e3(0x114)](this,_0x7052cb,_0x3ae787,_0x17a3ec);},Window_StatusBase['prototype']['isAggroGaugeShown']=function(){const _0x32ab4c=_0x51f16e;if(![Window_BattleActor,Window_BattleStatus][_0x32ab4c(0x222)](this[_0x32ab4c(0x157)]))return![];if(!SceneManager[_0x32ab4c(0x125)]())return![];return ConfigManager[_0x32ab4c(0x179)]&&VisuMZ[_0x32ab4c(0x12b)]['Settings'][_0x32ab4c(0x193)][_0x32ab4c(0x1fb)];},Window_StatusBase[_0x51f16e(0x27a)][_0x51f16e(0x181)]=function(_0x4ead94,_0x1f10d7,_0x1d74af){const _0x4631a2=_0x51f16e;this[_0x4631a2(0x216)](_0x4ead94,_0x4631a2(0x1ca),_0x1f10d7,_0x1d74af);},Window_BattleStatus[_0x51f16e(0x27a)][_0x51f16e(0x23d)]=function(_0x33d2fc){const _0x46d44d=_0x51f16e,_0x4b5ef4=this[_0x46d44d(0x21d)](_0x33d2fc),_0x5c4c07=this['aggroGaugeX'](_0x33d2fc),_0x123d34=this[_0x46d44d(0x17f)](_0x33d2fc),_0x588239=_0x46d44d(0x196)[_0x46d44d(0x200)](_0x4b5ef4['actorId']()),_0x4b4450=this[_0x46d44d(0x147)](_0x588239,Sprite_Gauge),_0x3dd970=VisuMZ[_0x46d44d(0x12b)][_0x46d44d(0x109)][_0x46d44d(0x193)];_0x4b4450['x']=_0x5c4c07+(_0x3dd970[_0x46d44d(0x205)]||0x0),_0x4b4450['y']=_0x123d34+(_0x3dd970['BattleStatusOffsetY']||0x0),_0x4b4450[_0x46d44d(0x26c)]=!![],_0x4b4450['setup'](_0x4b5ef4,_0x46d44d(0x1ca)),_0x4b4450[_0x46d44d(0x23c)]=!![];},Window_BattleStatus[_0x51f16e(0x27a)][_0x51f16e(0x273)]=function(_0x1e576d){const _0x202b0c=_0x51f16e;let _0x261630=this[_0x202b0c(0x1de)](_0x1e576d),_0x355c61=this['nameX'](_0x261630);if(Imported[_0x202b0c(0x1bf)]){let _0x1c6eed=this[_0x202b0c(0x19b)](_0x1e576d);if(this[_0x202b0c(0x1a1)]()==='list'){const _0x4b4c32=$dataSystem[_0x202b0c(0x1bd)]?0x4:0x3,_0x5607ff=_0x4b4c32*0x80+(_0x4b4c32-0x1)*0x8+0x4,_0x167c5d=this['actor'](_0x1e576d);let _0x5e850b=_0x1c6eed['x']+this[_0x202b0c(0x27d)];VisuMZ['BattleCore']['Settings'][_0x202b0c(0x250)]['ShowFacesListStyle']?_0x5e850b=_0x1c6eed['x']+ImageManager['faceWidth']+0x8:_0x5e850b+=ImageManager[_0x202b0c(0x214)],_0x355c61=Math['round'](Math['min'](_0x1c6eed['x']+_0x1c6eed[_0x202b0c(0x120)]-_0x5607ff,_0x5e850b)),_0x355c61-=0x4;}else _0x355c61=Math['round'](_0x1c6eed['x']+(_0x1c6eed[_0x202b0c(0x120)]-0x80)/0x2);}return _0x355c61;},Window_BattleStatus[_0x51f16e(0x27a)][_0x51f16e(0x17f)]=function(_0x25a01f){const _0x342278=_0x51f16e,_0x140aee=this[_0x342278(0x19b)](_0x25a01f);let _0x21825c=this['nameY'](_0x140aee);if(Imported['VisuMZ_1_BattleCore']){if(this['battleLayoutStyle']()===_0x342278(0x25f)){let _0x32e26d=this[_0x342278(0x19b)](_0x25a01f);_0x21825c=Math['round'](_0x32e26d['y']+(_0x32e26d['height']-Sprite_Name[_0x342278(0x27a)][_0x342278(0x1c3)]())/0x2);}}if(this[_0x342278(0x202)]())_0x21825c-=Sprite_Gauge[_0x342278(0x27a)][_0x342278(0x213)]()-0x1;return _0x21825c;},Window_BattleStatus['prototype'][_0x51f16e(0x202)]=function(){const _0x3c486e=_0x51f16e;if(!BattleManager['isTpb']())return![];if(Imported[_0x3c486e(0x266)])return this[_0x3c486e(0x1aa)](_0x3c486e(0x235));return!![];};