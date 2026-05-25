//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.29;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.29] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
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
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills with top-down priority as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Priority starts from top of skill list and goes to bottom of skill list.
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
 * 
 * ---
 *
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 *
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 *
 * - Replace 'x' and 'y' with any of the following:
 *
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 * 
 * - When no keyword matches are found, the comparison value will be
 *   interpreted as JavaScript code. If the JavaScript code fails, it will
 *   default to a 0 value.
 * 
 *   *NOTE* JavaScript cannot be used without comparison operators to reduce
 *   error. This means if you want to check if a switch is on or not, don't
 *   simply use "$gameSwitches.value(42)" as it does not have any comparison
 *   operators. Instead, use "$gameSwitches.value(42) === true" to check.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI PDR Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the PDR rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI PDR Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in PDR rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MDR Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MDR rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MDR Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MDR rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 * 
 * === Specific A.I. Targeting Notetags ===
 * 
 * Specific A.I. targeting means the user will ignore any TGR influences when
 * it comes to pick out of a group of valid candidates to come down to one
 * target. This only affects skills where the user must select a specific
 * target, meaning it will ignore the effects of random and AoE scopes.
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - Bypasses TGR influence in favor of picking a specific target out of a
 *   group of valid targets (does not pick from outside the valid target group)
 *   for a skill target.
 * - Replace 'type' with any of the following:
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           Always picks the user if available
 *   First                          Always picks the first valid candidate
 *   Last                           Always picks the last valid candidate
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  Picks candidate with highest level
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  Picks candidate with highest MaxHP
 *   Highest HP                     Picks candidate with highest current HP
 *   Highest HP%                    Picks candidate with highest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  Picks candidate with highest MaxMP
 *   Highest MP                     Picks candidate with highest current MP
 *   Highest MP%                    Picks candidate with highest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  Picks candidate with highest MaxTP
 *   Highest TP                     Picks candidate with highest current TP
 *   Highest TP%                    Picks candidate with highest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    Picks candidate with highest ATK parameter
 *   Highest DEF                    Picks candidate with highest DEF parameter
 *   Highest MAT                    Picks candidate with highest MAT parameter
 *   Highest MDF                    Picks candidate with highest MDF parameter
 *   Highest AGI                    Picks candidate with highest AGI parameter
 *   Highest LUK                    Picks candidate with highest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    Picks candidate with highest HIT parameter
 *   Highest EVA                    Picks candidate with highest EVA parameter
 *   Highest CRI                    Picks candidate with highest CRI parameter
 *   Highest CEV                    Picks candidate with highest CEV parameter
 *   Highest MEV                    Picks candidate with highest MEV parameter
 *   Highest MRF                    Picks candidate with highest MRF parameter
 *   Highest CNT                    Picks candidate with highest CNT parameter
 *   Highest HRG                    Picks candidate with highest HRG parameter
 *   Highest MRG                    Picks candidate with highest MRG parameter
 *   Highest TRG                    Picks candidate with highest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    Picks candidate with highest TGR parameter
 *   Highest GRD                    Picks candidate with highest GRD parameter
 *   Highest REC                    Picks candidate with highest REC parameter
 *   Highest PHA                    Picks candidate with highest PHA parameter
 *   Highest MCR                    Picks candidate with highest MCR parameter
 *   Highest TCR                    Picks candidate with highest TCR parameter
 *   Highest PDR                    Picks candidate with highest PDR parameter
 *   Highest MDR                    Picks candidate with highest MDR parameter
 *   Highest FDR                    Picks candidate with highest FDR parameter
 *   Highest EXR                    Picks candidate with highest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            Picks candidate with most states (any)
 *   Highest Positive State Count   Picks candidate with most positive states
 *   Highest Negative State Count   Picks candidate with most negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   Picks candidate with lowest level
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   Picks candidate with lowest MaxHP
 *   Lowest HP                      Picks candidate with lowest current HP
 *   Lowest HP%                     Picks candidate with lowest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   Picks candidate with lowest MaxMP
 *   Lowest MP                      Picks candidate with lowest current MP
 *   Lowest MP%                     Picks candidate with lowest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   Picks candidate with lowest MaxTP
 *   Lowest TP                      Picks candidate with lowest current TP
 *   Lowest TP%                     Picks candidate with lowest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     Picks candidate with lowest ATK parameter
 *   Lowest DEF                     Picks candidate with lowest DEF parameter
 *   Lowest MAT                     Picks candidate with lowest MAT parameter
 *   Lowest MDF                     Picks candidate with lowest MDF parameter
 *   Lowest AGI                     Picks candidate with lowest AGI parameter
 *   Lowest LUK                     Picks candidate with lowest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     Picks candidate with lowest HIT parameter
 *   Lowest EVA                     Picks candidate with lowest EVA parameter
 *   Lowest CRI                     Picks candidate with lowest CRI parameter
 *   Lowest CEV                     Picks candidate with lowest CEV parameter
 *   Lowest MEV                     Picks candidate with lowest MEV parameter
 *   Lowest MRF                     Picks candidate with lowest MRF parameter
 *   Lowest CNT                     Picks candidate with lowest CNT parameter
 *   Lowest HRG                     Picks candidate with lowest HRG parameter
 *   Lowest MRG                     Picks candidate with lowest MRG parameter
 *   Lowest TRG                     Picks candidate with lowest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     Picks candidate with lowest TGR parameter
 *   Lowest GRD                     Picks candidate with lowest GRD parameter
 *   Lowest REC                     Picks candidate with lowest REC parameter
 *   Lowest PHA                     Picks candidate with lowest PHA parameter
 *   Lowest MCR                     Picks candidate with lowest MCR parameter
 *   Lowest TCR                     Picks candidate with lowest TCR parameter
 *   Lowest PDR                     Picks candidate with lowest PDR parameter
 *   Lowest MDR                     Picks candidate with lowest MDR parameter
 *   Lowest FDR                     Picks candidate with lowest FDR parameter
 *   Lowest EXR                     Picks candidate with lowest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             Picks candidate with least states (any)
 *   Lowest Positive State Count    Picks candidate with least positive states
 *   Lowest Negative State Count    Picks candidate with least negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * 
 * ---
 *
 * ============================================================================
 * Regarding $gameTroop.turnCount() for A.I. Conditions
 * ============================================================================
 * 
 * ---
 * 
 * Short Answer:
 *
 * Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
 * or user.turnCount() or target.turnCount() for A.I. Conditions.
 * 
 * Instead, use RPG Maker MZ's built-in action editor's turn requirement to
 * make do with the same effect.
 *
 * ---
 * 
 * Long Answer:
 * 
 * The turnCount() functions are not valid for A.I. Conditions and disabled due
 * to all the problems they cause. The reason being is because actions are
 * determined before the turn count increases. This is how RPG Maker MZ handles
 * it by default.
 * 
 * The reason why this does not work is due to the following code found in
 * RPG Maker MZ's core scripts:
 * 
 *   Game_Battler.prototype.turnCount = function() {
 *       if (BattleManager.isTpb()) {
 *           return this._tpbTurnCount;
 *       } else {
 *           return $gameTroop.turnCount() + 1;
 *       }
 *   };
 * 
 * What that means the turn count will always be off by 1. So upon determining
 * the action initially, the match would come off as correct. However, as the
 * turn actually starts and reaches the enemy or actor's turn, the turn count
 * check would read differently and return incorrect information, causing the
 * battler to forfeit their actions.
 * 
 * This facet of RPG Maker MZ can be updated and changed, but it is better that
 * it doesn't in order to maintain compatibility with the rest of the plugins
 * available that utilize the turn counter.
 * 
 * The work around to this problem is, instead, to use the enemy database tab's
 * action editor and apply a Turn Condition to match the required turn instead.
 * You know, the thing with Skill and Rating, where you select which skill for
 * the enemy to use instead.
 * 
 * HOWEVER!
 * 
 * If you are willing to use an "Experimental" feature, aka one that is not
 * heavily tested and may potentially result in unintended side effects, go to:
 * 
 *  Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.
 * 
 * And set that to "true" without the quotes. This will forcefully remove the
 * +1 towards the count and forcefully make enemies re-evaluate actions upon
 * the start of the string of their actions. This comes with some side effects
 * that will potentially give A.I. advantages or disadvantages depending on the
 * battle system type. Action Speed becomes something that can be abused as it
 * is normally something that is determined based on the queued actions. A.I.
 * can pick a high speed weak action and then switch it for a slow speed strong
 * action. There is no proper fix to this due to how on-the-spot A.I. works as
 * it is ill-fitted for speed-relative battle systems. You have been warned.
 * 
 * In the event that this Plugin Parameter IS enabled, then using the turnCount
 * JavaScript code should work again due to the normalization of how the turn
 * property is calculated.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 * 
 * Experimental
 * 
 *   On-The-Spot A.I.:
 *   - A.I. enemies/actors determine actions on the spot when it's their turn.
 * 
 *     No Idle Chant:
 *     - Requires On-The-Spot A.I. enabled.
 *     - For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence MEV rates have on
 *       TGR weight.
 * 
 *   PDR Rate => TGR:
 *   - Makes all A.I. consider PDR rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence PDR rates have on
 *       TGR weight.
 * 
 *   MDR Rate => TGR:
 *   - Makes all A.I. consider MDR rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence MDR rates have on
 *       TGR weight.
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
 * Version 1.29: March 20, 2025
 * * Bug Fixes!
 * ** Fixed a problem with TPB actions causing conflicts in AI registration of
 *    certain abilities. This would lead to crashes. Should be no more. Fix
 *    made by Olivia.
 *
 * Version 1.28: Version 1.10: January 16, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Battle Grid System regarding scopes.
 * 
 * Version 1.27: November 14, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Skill Cooldowns' <Once Per Turn> notetag.
 * 
 * Version 1.26: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <AI PDR Influence: x.x>
 * *** <AI MDR Influence: x.x>
 * **** Sets how much TGR weight influence is given based on the PDR/MDR rate.
 * *** <Bypass AI PDR Influence>
 * *** <Bypass AI MDR Influence>
 * **** Makes the actor/enemy not factor in PDR/MDR rates when calculating TGR
 *      weights to determine action targets.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Weights > PDR Rate => TGR
 * *** Parameters > Weights > PDR Rate => TGR > Influence Rate
 * *** Parameters > Weights > MDR Rate => TGR
 * *** Parameters > Weights > MDR Rate => TGR > Influence Rate
 * **** Alters the default PDR/MDR Influence rate.
 * 
 * Version 1.25: June 13, 2024
 * * Feature Updates!
 * ** Reduced AI thinking times. Update made by Olivia.
 * 
 * Version 1.24: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause an infinite loop with certain battle systems
 *    under on the spot AI setting. Fix made by Olivia.
 * 
 * Version 1.23: January 18, 2024
 * * Compatibility Update!
 * ** Updated better compatibility with Battle System - STB and Auto Skill
 *    Triggers to prevent infinite loops. Update made by Olivia.
 * 
 * Version 1.22: December 14, 2023
 * * Compatibility Update!
 * ** Updated better compatibility for the new Battle System FTB, ETB, and PTB
 *    updates. Update made by Olivia.
 * 
 * Version 1.21: April 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented enemies from using skills that had the
 *    <Target: x Random Any> notetag. Fix made by Irina.
 * 
 * Version 1.20: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.74
 *    new features.
 * 
 * Version 1.19: January 20, 2023
 * * Bug Fixes!
 * ** On-The-Spot A.I. no longer overwrites Forced Actions. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.18: May 19, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** General Settings > Experimental > On-The-Spot A.I. > No Idle Chant
 * **** Requires On-The-Spot A.I. enabled.
 * **** For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * Version 1.17: May 12, 2022
 * * Feature Update!
 * ** Better RNG calculation when using the x% Chance conditional. Update made
 *    by Arisu.
 * 
 * Version 1.16: February 24, 2022
 * * Feature Update!
 * ** Randomization between zero variance A.I. is now better.
 * ** A.I. will no longer keep unusable skills in a skill queue and replace
 *    them with new ones.
 * 
 * Version 1.15: December 2, 2021
 * * Compatibility Update!
 * ** AI for skills and items should now work if their scope is
 *    <Target: All Allies But User>. Update made by Irina.
 * 
 * Version 1.14: October 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Notetag section "Condition List" updated with the following:
 * *** *NOTE* JavaScript cannot be used without comparison operators to reduce
 *     error. This means if you want to check if a switch is on or not, don't
 *     simply use "$gameSwitches.value(42)" as it does not have any comparison
 *     operators. Instead, use "$gameSwitches.value(42) === true" to check.
 * ** Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"
 * * New Experimental Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** A.I. General Settings > Experimental > On-The-Spot A.I.
 * **** A.I. enemies/actors determine actions on the spot when it's their turn.
 * **** Functions akin to YEP's Battle A.I. Core where enemies determine new
 *      actions on the spot. Doing so will forcefully change the way the Turn
 *      Count is handled for Game_Battler to not utilize the +1.
 * **** This will forcefully remove the +1 towards the count and forcefully
 *      make enemies re-evaluate actions upon the start of the string of their
 *      actions. This comes with some side effects that will potentially give
 *      A.I. advantages or disadvantages depending on the battle system type.
 *      Action Speed becomes something that can be abused as it is normally
 *      something that is determined based on the queued actions. A.I. can pick
 *      a high speed weak action and then switch it for a slow speed strong
 *      action. There is no proper fix to this due to how on-the-spot A.I.
 *      works as it is ill-fitted for speed-relative battle systems. You have
 *      been warned.
 * **** In the event that this Plugin Parameter IS enabled, then using the
 *      turnCount JavaScript code should work again due to the normalization of
 *      how the turn property is calculated.
 * * Optimization Update!
 * ** Updated last version's newest change to be more optimized and occur upon
 *    each iteration of a new subject being determined to account for better
 *    check timing. Update made by Yanfly.
 * 
 * Version 1.13: October 13, 2021
 * * Feature Update!
 * ** A.I. Battlers with no currently determined actions, upon the start of the
 *    time frame for what would be their action, will have one more chance of
 *    determining a new action to use as to not waste their turns.
 * ** This does NOT mean that the A.I. Battlers will adjust their actions for
 *    one with a higher rating. The readjustment will only occur if there are
 *    no actions determined for that instance and only a one time window upon
 *    the start of the time frame for what would be their action.
 * ** Update made by Arisu.
 * 
 * Version 1.12: October 7, 2021
 * * Documentation Update!
 * ** Added section "Regarding $gameTroop.turnCount() for A.I. Conditions".
 * * Feature Update!
 * ** Any A.I. Conditions found with "turnCount()" will be automatically
 *    disabled in order to reduce confusion. This is due to how turnCount()
 *    functions do not accurately depict the current Turn Count depending on
 *    when the function runs. Update made by Olivia.
 * 
 * Version 1.11: September 30, 2021
 * * Bug Fixes!
 * ** Patched up a rare occurance of predetermined actions still having
 *    priority despite having no valid targets. Fix made by Olivia.
 * 
 * Version 1.10: September 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Olivia.
 * 
 * Version 1.09: July 9, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Arisu.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
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
 * @param BattleAI
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
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 * 
 * @param Experimental
 * 
 * @param OnSpotAI:eval
 * @text On-The-Spot A.I.
 * @parent Experimental
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc A.I. enemies/actors determine actions on the
 * spot when it's their turn.
 * @default false
 * 
 * @param SpotRemoveMotions:eval
 * @text No Idle Chant
 * @parent OnSpotAI:eval
 * @type boolean
 * @on Remove Idle Chanting
 * @off Allow Idle Chanting
 * @desc Requires On-The-Spot A.I. enabled. For A.I. Battlers,
 * disables idle chant motions due to inconsistency.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 * @param PdrTgr:eval
 * @text PDR Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider PDR rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param PdrTgrRate:num
 * @text Influence Rate
 * @parent PdrTgr:eval
 * @desc This determines the default level of influence PDR
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param MdrTgr:eval
 * @text MDR Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MDR rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MdrTgrRate:num
 * @text Influence Rate
 * @parent MdrTgr:eval
 * @desc This determines the default level of influence MDR
 * rates have on TGR weight.
 * @default 1.50
 *
 */
//=============================================================================

const _0x26cdfb=_0x5f05;function _0x5f05(_0x4cce9f,_0x2d4db5){const _0x142a5c=_0x142a();return _0x5f05=function(_0x5f0576,_0xb82795){_0x5f0576=_0x5f0576-0x6d;let _0x5951b0=_0x142a5c[_0x5f0576];return _0x5951b0;},_0x5f05(_0x4cce9f,_0x2d4db5);}(function(_0x3eed2c,_0x48e7c1){const _0x349df8=_0x5f05,_0x5b9eca=_0x3eed2c();while(!![]){try{const _0x4eac41=-parseInt(_0x349df8(0xdd))/0x1*(parseInt(_0x349df8(0x12e))/0x2)+-parseInt(_0x349df8(0x151))/0x3*(parseInt(_0x349df8(0x83))/0x4)+parseInt(_0x349df8(0xf0))/0x5+-parseInt(_0x349df8(0x153))/0x6*(parseInt(_0x349df8(0x1a3))/0x7)+parseInt(_0x349df8(0x1dc))/0x8+-parseInt(_0x349df8(0x12f))/0x9+parseInt(_0x349df8(0x174))/0xa;if(_0x4eac41===_0x48e7c1)break;else _0x5b9eca['push'](_0x5b9eca['shift']());}catch(_0x1a2660){_0x5b9eca['push'](_0x5b9eca['shift']());}}}(_0x142a,0xbc684));var label=_0x26cdfb(0x15f),tier=tier||0x0,dependencies=[_0x26cdfb(0x175)],pluginData=$plugins['filter'](function(_0x30d31f){const _0x5acfde=_0x26cdfb;return _0x30d31f[_0x5acfde(0xdf)]&&_0x30d31f['description'][_0x5acfde(0x1d6)]('['+label+']');})[0x0];VisuMZ[label][_0x26cdfb(0x1cd)]=VisuMZ[label][_0x26cdfb(0x1cd)]||{},VisuMZ['ConvertParams']=function(_0x3250a8,_0x39d82b){const _0x16d664=_0x26cdfb;for(const _0x4fcd37 in _0x39d82b){if(_0x4fcd37['match'](/(.*):(.*)/i)){const _0x5150d4=String(RegExp['$1']),_0x462389=String(RegExp['$2'])['toUpperCase']()[_0x16d664(0x16a)]();let _0x2a9045,_0x4414de,_0x159ba3;switch(_0x462389){case _0x16d664(0x70):_0x2a9045=_0x39d82b[_0x4fcd37]!==''?Number(_0x39d82b[_0x4fcd37]):0x0;break;case _0x16d664(0x84):_0x4414de=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):[],_0x2a9045=_0x4414de['map'](_0x44ab09=>Number(_0x44ab09));break;case'EVAL':_0x2a9045=_0x39d82b[_0x4fcd37]!==''?eval(_0x39d82b[_0x4fcd37]):null;break;case _0x16d664(0x137):_0x4414de=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):[],_0x2a9045=_0x4414de[_0x16d664(0x17f)](_0x76d091=>eval(_0x76d091));break;case'JSON':_0x2a9045=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):'';break;case'ARRAYJSON':_0x4414de=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):[],_0x2a9045=_0x4414de['map'](_0x2d6ac6=>JSON['parse'](_0x2d6ac6));break;case _0x16d664(0x124):_0x2a9045=_0x39d82b[_0x4fcd37]!==''?new Function(JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37])):new Function('return\x200');break;case _0x16d664(0x1de):_0x4414de=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):[],_0x2a9045=_0x4414de[_0x16d664(0x17f)](_0x20bcc8=>new Function(JSON[_0x16d664(0x149)](_0x20bcc8)));break;case _0x16d664(0x113):_0x2a9045=_0x39d82b[_0x4fcd37]!==''?String(_0x39d82b[_0x4fcd37]):'';break;case _0x16d664(0x1b9):_0x4414de=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):[],_0x2a9045=_0x4414de[_0x16d664(0x17f)](_0x535b34=>String(_0x535b34));break;case _0x16d664(0x74):_0x159ba3=_0x39d82b[_0x4fcd37]!==''?JSON[_0x16d664(0x149)](_0x39d82b[_0x4fcd37]):{},_0x2a9045=VisuMZ[_0x16d664(0x12b)]({},_0x159ba3);break;case'ARRAYSTRUCT':_0x4414de=_0x39d82b[_0x4fcd37]!==''?JSON['parse'](_0x39d82b[_0x4fcd37]):[],_0x2a9045=_0x4414de[_0x16d664(0x17f)](_0x8d95f=>VisuMZ['ConvertParams']({},JSON[_0x16d664(0x149)](_0x8d95f)));break;default:continue;}_0x3250a8[_0x5150d4]=_0x2a9045;}}return _0x3250a8;},(_0xa2afb2=>{const _0x205481=_0x26cdfb,_0xd17d2f=_0xa2afb2[_0x205481(0xbd)];for(const _0x42d7b0 of dependencies){if(!Imported[_0x42d7b0]){alert(_0x205481(0x17b)[_0x205481(0x11f)](_0xd17d2f,_0x42d7b0)),SceneManager[_0x205481(0xcd)]();break;}}const _0x13041c=_0xa2afb2[_0x205481(0x17a)];if(_0x13041c[_0x205481(0xf7)](/\[Version[ ](.*?)\]/i)){const _0x2a9092=Number(RegExp['$1']);_0x2a9092!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x205481(0x11f)](_0xd17d2f,_0x2a9092)),SceneManager['exit']());}if(_0x13041c[_0x205481(0xf7)](/\[Tier[ ](\d+)\]/i)){const _0x1441c7=Number(RegExp['$1']);_0x1441c7<tier?(alert(_0x205481(0xd0)[_0x205481(0x11f)](_0xd17d2f,_0x1441c7,tier)),SceneManager['exit']()):tier=Math[_0x205481(0xfe)](_0x1441c7,tier);}VisuMZ[_0x205481(0x12b)](VisuMZ[label][_0x205481(0x1cd)],_0xa2afb2[_0x205481(0xc0)]);})(pluginData);function _0x142a(){const _0x2d33e5=['getDefaultAnyConditions','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','isDamage','makeActions','initBattleAI','addElementAIKnowledge','onBattleEnd','HpRecover%1','bypassElementTgr','hasXParamAIKnowledge','_stateTurns','4826740bnXlmS','skillId','endAction','_applyAIForcedTargetFilters','EXR','selectAction','AGI','match','Weight','BattleManager_endAction','Game_Battler_onBattleEnd','MDF','startAction','charAt','max','actions','meetsCondition','usableSkills','meetsTurnCondition','addAIKnowledge','LAST','_regexp','mevRates','VisuMZ_2_BattleSystemETB','hpRate','determineActionByAIisStillValid','referenceEnemyForAI','VisuMZ_2_AggroControlSystem','isForNotUser','getAllConditions','VisuMZ_1_ElementStatusCore','MpDamage%1','subject','isEnemy','TCR','STR','isAggroAffected','VisuMZ_2_BattleSystemSTB','MP%','isBuffAffected','isForAnyoneFocusFriends','MEV','This\x20is\x20a\x20static\x20class','meetsHpCondition','code','doesTargetMeetAnyConditions','mevInfluenceRate','format','aiApplyEvaTgrInfluenceRate','onAllActionsEnd','elementRates','Game_Action_isForOpponentBattleCore','FUNC','doesAIApplyPdrTgrInfluence','replace','die','doesAIApplyElementalTgrInfluence','split','Game_Battler_isChanting','ConvertParams','AddBuff%1','hasValidTargets','6XdpXwj','10686609aqmbrg','HRG','aiTgrInfluence','VisuMZ_2_BattleSystemETB\x20needs\x20to\x20be\x20updated\x20','maxTp','GRD','isForAnyoneFocusOpponents','HP%','ARRAYEVAL','isForDeadFriend','mhp','RemoveState%1','selectAllActionsRandom','Game_Battler_turnCount','clearAiTgrInfluence','itemTargetCandidates','aiLevel','makeDefaultConditions','doesTargetMeetCondition','remove','in\x20order\x20for\x20VisuMZ_3_BattleAI\x20to\x20work.','EFFECT_ADD_BUFF','reduce','opponentsUnit','doesAIApplyMdrTgrInfluence','pdr','parse','doesAIApplyEvaTgrInfluence','Game_Unit_initialize','aiApplyMevTgrInfluenceRate','Game_Action_makeTargets','_subject','MDR','CEV','1523715mShGtT','_stateIDs','126eeFloZ','EFFECT_ADD_STATE','Game_Battler_onBattleStart','FIRST','determineLineValue','attackElements','Game_Battler_onAllActionsEnd','setEnemyAction','indexOf','NEGATIVE\x20STATE\x20COUNT','mev','MAT','BattleAI','evaRates','elementIds','aiApplyElementalTgrInfluenceRate','VisuMZ_1_SkillsStatesCore','TP%','call','anyCondition','setup','pdrInfluenceRate','isForEveryone','trim','isForFriend','Game_Action_itemTargetCandidates','DEF','General','filterForcedTargeting','rating','turnCount','TRG','checkTeamBasedTurnCountAI','32594630fBcAyY','VisuMZ_1_BattleCore','OnSpotAI','aiTarget','aiRatingVariance','ActorRatingVariance','description','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_buffTurns','isSkill','aiKnowledge','map','BattleManager_startAction','HpDrain%1','value2','bypassPdrTgr','elementRate','isConfused','getAnyConditions','VisuMZ_4_AggroControl','level','param','USER','meetsPartyLevelCondition','Game_Enemy_isActionValid','For\x20more\x20information,\x20view\x20the\x20help\x20file.','AddDebuff%1','apply','MRF','meetsMpCondition','CRI','EFFECT_ADD_DEBUFF','determineTargetActionByAIisStillValid','NEGATIVE','log','user','clamp','damage','casual','MpRecover%1','selectAllActionsGambit','makeDeepCopy','Game_Unit_randomTarget','actorId','effects','EFFECT_REMOVE_DEBUFF','Game_Temp_initialize','240856JNnhjA','eva','isAutoBattle','isPhysical','aiStyle','FDR','hasElementAIKnowledge','passesAILevel','note','canAttack','VisuMZ_2_BattleSystemPTB\x20needs\x20to\x20be\x20updated\x20','aiMevTgr','bypassEvaTgr','meetsStateCondition','makeValidTargets','removeOncePerTurnAction','canGuard','All','meetsSwitchCondition','Game_BattlerBase_die','initialize','makeAutoBattleActionsWithEnemyAI','ARRAYSTR','HIGHEST','is%1Affected','SpotRemoveMotions','getElementIdWithName','action','MAX_SAFE_INTEGER','bypassMdrTgr','prototype','BattleSystemPTB','_rngChance','highestTgrMember','MdrTgr','isPlaytest','ATK','canUse','_aiTgrInfluence','currentClass','tpRate','Game_Troop_setup','Settings','isChanting','type','_onSpotMadeActionsDeterminedByAI','mmp','isTpb','hasForcedTargets','concat','doesTargetMeetAIConditions','includes','value1','Game_Unit_aliveMembers','autoRemovalTiming','MAXTP','createFilterTarget','7276720SxgHhN','applyBattleAI','ARRAYFUNC','_bypassAiValidCheck','toUpperCase','applyBattleAiTgrInfluences','isMagical','isForOpponent','ActorStyleAI','NUM','currentAction','MevTgr','Default','STRUCT','enemy','needsSelection','isMax%1Affected','item','scope','Game_BattlerBase_sparam','enemyId','ElementTgrRate','aiElementTgr','isConditionalAI','selectAllActions','isForAnyone','forcedTargets','BattleManager_getNextSubject','12lVGfTT','ARRAYNUM','doesTargetMeetAllConditions','aiEvaTgr','ShuffleArray','Game_Action_apply','friendsUnit','%1\x20%2\x20%3','aiPdrTgr','attackSkillId','HpDamage%1','elementInfluenceRate','randomInt','_alertTurnCount','gambit','EvaTgrRate','isActor','determineNewValidAIAction','dataId','EFFECT_REMOVE_STATE','setSkill','CNT','VisuMZ_2_BattleSystemFTB','isActionValid','numActions','MAXMP','revive','LearnKnowledge','POSITIVE','EnableAnyCon','MAXHP','doesAIApplyMevTgrInfluence','addXParamAIKnowledge','makeTargets','mpRate','filter','version','_forceValidTargets','length','elementId','RemoveDebuff%1','aiApplyMdrTgrInfluenceRate','REC','LUK','isDetermineActionByAI','allCondition','randomTarget','isSTB','Game_Actor_makeAutoBattleActions','Game_Battler_makeActions','elementKnowledgeRate','xparam','makeAutoBattleActions','getEnemyIdWithName','random','ALWAYS','deadMembers','aiApplyPdrTgrInfluenceRate','name','isDebuffAffected','isForOpponentBattleCore','parameters','VisuMZ_2_BattleSystemFTB\x20needs\x20to\x20be\x20updated\x20','slice','EnemyAILevel','buff','states','MCR','EnemyRatingVariance','value','onBattleStart','getStateIdWithName','clearForcedTargets','sparam','exit','Any','elements','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','classic','checkSkillTargets','isForBattleGrid','setAiTgrInfluences','clearAIKnowledge','push','actor','statesByCategory','AddState%1','guardSkillId','aliveMembers','evaInfluenceRate','309667FkTxTr','ActorAILevel','status','_elementIDs','isFTB','toLowerCase','VisuMZ_2_BattleSystemPTB','aiMdrTgr'];_0x142a=function(){return _0x2d33e5;};return _0x142a();}function AIManager(){const _0x5e9db9=_0x26cdfb;throw new Error(_0x5e9db9(0x11a));}AIManager[_0x26cdfb(0x105)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'bypassPdrTgr':/<(?:NO|BYPASS) AI (?:PDR|PHYSICAL DAMAGE RATE) INFLUENCE>/i,'bypassMdrTgr':/<(?:NO|BYPASS) AI (?:MDR|MAGICAL DAMAGE RATE) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiPdrTgr':/<AI (?:PDR|PHYSICAL DAMAGE RATE) INFLUENCE: (.*)>/i,'aiMdrTgr':/<AI (?:MDR|MAGICAL DAMAGE RATE) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x26cdfb(0x7e)]=function(_0x49e446){const _0x1bbcfe=_0x26cdfb;if(!_0x49e446)return![];return this[_0x1bbcfe(0x10d)](_0x49e446)[_0x1bbcfe(0xa9)]>0x0||this[_0x1bbcfe(0x186)](_0x49e446)[_0x1bbcfe(0xa9)]>0x0;},AIManager[_0x26cdfb(0x10d)]=function(_0x3c0a60){const _0x473574=_0x26cdfb;if(_0x3c0a60[_0x473574(0x1ab)][_0x473574(0xf7)](AIManager[_0x473574(0x105)]['noCondition']))return[];else return _0x3c0a60['note'][_0x473574(0xf7)](AIManager[_0x473574(0x105)][_0x473574(0xb0)])?String(RegExp['$1'])['split'](/[\r\n]+/)[_0x473574(0x142)](''):this['getDefaultAllConditions'](_0x3c0a60);},AIManager[_0x26cdfb(0x186)]=function(_0x4428d7){const _0x3a5a69=_0x26cdfb;if(_0x4428d7[_0x3a5a69(0x1ab)][_0x3a5a69(0xf7)](AIManager['_regexp']['noCondition']))return[];else return _0x4428d7[_0x3a5a69(0x1ab)][_0x3a5a69(0xf7)](AIManager[_0x3a5a69(0x105)]['anyCondition'])?String(RegExp['$1'])[_0x3a5a69(0x129)](/[\r\n]+/)[_0x3a5a69(0x142)](''):this[_0x3a5a69(0xe5)](_0x4428d7);},AIManager['getDefaultAllConditions']=function(_0x5d82c0){const _0x16716b=_0x26cdfb;if(!VisuMZ[_0x16716b(0x15f)]['Settings']['Default']['EnableAllCon'])return[];if(_0x5d82c0[_0x16716b(0x1ab)]['match'](AIManager['_regexp'][_0x16716b(0x166)]))return[];return this[_0x16716b(0x140)](_0x5d82c0,_0x16716b(0x1b4));},AIManager[_0x26cdfb(0xe5)]=function(_0x53fc21){const _0x374653=_0x26cdfb;if(!VisuMZ['BattleAI'][_0x374653(0x1cd)][_0x374653(0x73)][_0x374653(0xa0)])return[];if(_0x53fc21[_0x374653(0x1ab)][_0x374653(0xf7)](AIManager[_0x374653(0x105)][_0x374653(0xb0)]))return[];return this[_0x374653(0x140)](_0x53fc21,_0x374653(0xce));},AIManager[_0x26cdfb(0x140)]=function(_0x293a99,_0x1fa245){const _0x1cdc22=_0x26cdfb;if(!_0x293a99)return[];const _0x32e558=VisuMZ[_0x1cdc22(0x15f)][_0x1cdc22(0x1cd)][_0x1cdc22(0x73)],_0xd74914=[_0x1cdc22(0xa1),_0x1cdc22(0x9c),_0x1cdc22(0x1c7),_0x1cdc22(0x16d),'MAT',_0x1cdc22(0xfb),_0x1cdc22(0xf6),_0x1cdc22(0xae)],_0x92d8ec=_0x293a99[_0x1cdc22(0x199)][_0x1cdc22(0x1cf)],_0x5d6064=_0x293a99[_0x1cdc22(0x1a0)];let _0x29047a=[],_0x35e303='',_0x5efcdd='';switch(_0x92d8ec){case 0x1:_0x35e303=_0x1cdc22(0x8d)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case 0x2:_0x35e303=_0x1cdc22(0x10f)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)['remove'](''));break;case 0x3:_0x35e303='HpRecover%1'[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)['remove'](''));break;case 0x4:_0x35e303=_0x1cdc22(0x19b)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case 0x5:_0x35e303=_0x1cdc22(0x181)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case 0x6:_0x35e303='MpDrain%1'['format'](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;}for(const _0x52d994 of _0x5d6064){if(!_0x52d994)continue;switch(_0x52d994[_0x1cdc22(0x11c)]){case Game_Action['EFFECT_RECOVER_HP']:if(_0x52d994[_0x1cdc22(0x1d7)]>0x0||_0x52d994[_0x1cdc22(0x182)]>0x0)_0x35e303=_0x1cdc22(0xec)['format'](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a['concat'](_0x5efcdd['split'](/[\r\n]+/)['remove'](''));else(_0x52d994[_0x1cdc22(0x1d7)]<0x0||_0x52d994[_0x1cdc22(0x182)]<0x0)&&(_0x35e303=_0x1cdc22(0x8d)['format'](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)]('')));break;case Game_Action['EFFECT_RECOVER_MP']:if(_0x52d994[_0x1cdc22(0x1d7)]>0x0||_0x52d994[_0x1cdc22(0x182)]>0x0)_0x35e303=_0x1cdc22(0x19b)['format'](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)['remove'](''));else(_0x52d994['value1']<0x0||_0x52d994[_0x1cdc22(0x182)]<0x0)&&(_0x35e303=_0x1cdc22(0x10f)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303],_0x29047a=_0x29047a['concat'](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)]('')));break;case Game_Action[_0x1cdc22(0x154)]:if(_0x52d994[_0x1cdc22(0x95)]===0x0)continue;_0x35e303=_0x1cdc22(0xd9)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303][_0x1cdc22(0x11f)](_0x52d994[_0x1cdc22(0x95)]),_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case Game_Action[_0x1cdc22(0x96)]:_0x35e303=_0x1cdc22(0x13a)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303][_0x1cdc22(0x11f)](_0x52d994['dataId']),_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case Game_Action[_0x1cdc22(0x144)]:_0x35e303=_0x1cdc22(0x12c)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303][_0x1cdc22(0x11f)](_0xd74914[_0x52d994[_0x1cdc22(0x95)]]),_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd['split'](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case Game_Action[_0x1cdc22(0x193)]:_0x35e303=_0x1cdc22(0x18e)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303][_0x1cdc22(0x11f)](_0xd74914[_0x52d994['dataId']]),_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case Game_Action['EFFECT_REMOVE_BUFF']:_0x35e303='RemoveBuff%1'[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303]['format'](_0xd74914[_0x52d994['dataId']]),_0x29047a=_0x29047a[_0x1cdc22(0x1d4)](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;case Game_Action[_0x1cdc22(0x1a1)]:_0x35e303=_0x1cdc22(0xab)[_0x1cdc22(0x11f)](_0x1fa245),_0x5efcdd=_0x32e558[_0x35e303]['format'](_0xd74914[_0x52d994[_0x1cdc22(0x95)]]),_0x29047a=_0x29047a['concat'](_0x5efcdd[_0x1cdc22(0x129)](/[\r\n]+/)[_0x1cdc22(0x142)](''));break;}}return _0x29047a;},AIManager['forceValidTargets']=function(_0x31c7b1,_0x2339c3){const _0xd0394=_0x26cdfb;this[_0xd0394(0xa8)]=this['makeValidTargets'](_0x31c7b1,_0x2339c3);},AIManager['clearForcedTargets']=function(){const _0xbff576=_0x26cdfb;this[_0xbff576(0xa8)]=[];},AIManager[_0x26cdfb(0x81)]=function(){const _0x2b4d5=_0x26cdfb;return this[_0x2b4d5(0xa8)]=this[_0x2b4d5(0xa8)]||[],this['_forceValidTargets'];},AIManager[_0x26cdfb(0x1d3)]=function(){return this['forcedTargets']()['length']>0x0;},AIManager['hasValidTargets']=function(_0x38adf8,_0x437dab){const _0x444ead=_0x26cdfb;if(!_0x38adf8)return![];if(!_0x437dab)return![];if(!DataManager['isSkill'](_0x437dab))return;return this[_0x444ead(0x7e)](_0x437dab)?this[_0x444ead(0x1b1)](_0x38adf8,_0x437dab)[_0x444ead(0xa9)]>=0x1:!![];},AIManager[_0x26cdfb(0x1b1)]=function(_0x2d3afe,_0x5f55d6){const _0x2a4cca=_0x26cdfb;let _0xc43dd0=[];if(this[_0x2a4cca(0x7e)](_0x5f55d6)){const _0xef3135=this[_0x2a4cca(0x10d)](_0x5f55d6),_0x59a1d6=this[_0x2a4cca(0x186)](_0x5f55d6),_0x3193c6=new Game_Action(_0x2d3afe);_0x3193c6[_0x2a4cca(0x97)](_0x5f55d6['id']);let _0x5a1a0f=AIManager[_0x2a4cca(0xd2)](_0x2d3afe,_0x3193c6);this[_0x2a4cca(0x1c3)]=Math['random'](),_0xc43dd0=_0x5a1a0f[_0x2a4cca(0xa6)](_0xadb0d7=>this['doesTargetMeetAIConditions'](_0x2d3afe,_0xadb0d7,_0x5f55d6,_0xef3135,_0x59a1d6));}return _0xc43dd0;},AIManager['checkSkillTargets']=function(_0x3963d7,_0x418fcc){const _0x47e578=_0x26cdfb;let _0x9f0837=[];if(Imported[_0x47e578(0x10b)]&&_0x418fcc[_0x47e578(0x114)]()){const _0x27e06a=_0x418fcc[_0x47e578(0x6e)]()?_0x3963d7[_0x47e578(0x146)]():_0x3963d7[_0x47e578(0x89)]();_0x9f0837=[_0x27e06a[_0x47e578(0x1c4)]()];}else{if(_0x418fcc[_0x47e578(0x169)]())_0x9f0837=$gameParty[_0x47e578(0xdb)]()[_0x47e578(0x1d4)]($gameTroop[_0x47e578(0xdb)]());else{if(_0x418fcc['isForAnyone']&&_0x418fcc[_0x47e578(0x80)]()){const _0x15cf67=_0x418fcc[_0x47e578(0x78)]()[_0x47e578(0x79)];if(_0x418fcc[_0x47e578(0x135)]())_0x9f0837=_0x3963d7['opponentsUnit']()[_0x47e578(0xdb)]();else _0x418fcc[_0x47e578(0x118)]()&&(_0x9f0837=_0x3963d7[_0x47e578(0x89)]()[_0x47e578(0xdb)]());}else{if(_0x418fcc[_0x47e578(0x6e)]())_0x9f0837=_0x3963d7[_0x47e578(0x146)]()[_0x47e578(0xdb)]();else{if(_0x418fcc[_0x47e578(0x138)]())_0x9f0837=_0x3963d7['friendsUnit']()[_0x47e578(0xbb)]();else _0x418fcc[_0x47e578(0x16b)]()&&!_0x418fcc[_0x47e578(0x138)]()&&(_0x9f0837=_0x3963d7[_0x47e578(0x89)]()[_0x47e578(0xdb)]());}}}}return _0x418fcc[_0x47e578(0x10c)]&&_0x418fcc['isForNotUser']()&&_0x9f0837[_0x47e578(0x142)](_0x3963d7),_0x9f0837;},AIManager[_0x26cdfb(0x1d5)]=function(_0x19407e,_0x2dafd1,_0x1aefdc,_0x12fd86,_0xc847b7){const _0x146649=_0x26cdfb;return this['doesTargetMeetAllConditions'](_0x19407e,_0x2dafd1,_0x1aefdc,_0x12fd86)&&this[_0x146649(0x11d)](_0x19407e,_0x2dafd1,_0x1aefdc,_0xc847b7);},AIManager[_0x26cdfb(0x85)]=function(_0x43292f,_0x42c0f4,_0x320f70,_0x405572){const _0x432a34=_0x26cdfb;if(_0x405572[_0x432a34(0xa9)]<=0x0)return!![];for(const _0x3ddad0 of _0x405572){if(!_0x3ddad0)continue;if(_0x3ddad0[_0x432a34(0xa9)]<=0x0)continue;if(!this[_0x432a34(0x1aa)](_0x43292f))return!![];if(!this['doesTargetMeetCondition'](_0x43292f,_0x42c0f4,_0x320f70,_0x3ddad0))return![];}return!![];},AIManager['doesTargetMeetAnyConditions']=function(_0x466a50,_0x17c0b3,_0x5c7531,_0x259648){const _0x5d8f05=_0x26cdfb;if(_0x259648['length']<=0x0)return!![];for(const _0x437b3d of _0x259648){if(!_0x437b3d)continue;if(_0x437b3d[_0x5d8f05(0xa9)]<=0x0)continue;if(!this[_0x5d8f05(0x1aa)](_0x466a50))return!![];if(this[_0x5d8f05(0x141)](_0x466a50,_0x17c0b3,_0x5c7531,_0x437b3d))return!![];}return![];},AIManager[_0x26cdfb(0x1aa)]=function(_0x48c47f){const _0x1b97bf=_0x26cdfb,_0x6fbe20=_0x48c47f[_0x1b97bf(0x13f)]();return Math[_0x1b97bf(0x8f)](0x64)<_0x6fbe20;},AIManager[_0x26cdfb(0x141)]=function(_0x3ceffe,_0x5f10b9,_0x4302f5,_0x59970f){const _0x49938f=_0x26cdfb,_0x36a235=[_0x49938f(0xa1),'MAXMP',_0x49938f(0x1c7),'DEF',_0x49938f(0x15e),_0x49938f(0xfb),_0x49938f(0xf6),'LUK'];if(_0x59970f['toUpperCase']()['trim']()===_0x49938f(0xba))return!![];const _0x270c29=_0x3ceffe;if(!VisuMZ[_0x49938f(0x15f)][_0x49938f(0x1cd)][_0x49938f(0x16e)][_0x49938f(0x176)]){if(_0x59970f[_0x49938f(0xf7)](/turnCount\(\)/i)){if($gameTemp[_0x49938f(0x1c6)]()&&!this['_alertTurnCount']){let _0x2e0a95='The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a';_0x2e0a95+=_0x59970f+'\x0a\x0a',_0x2e0a95+='The\x20reason\x20is\x20due\x20to\x20the\x20turnCount()\x20function.\x0a',_0x2e0a95+=_0x49938f(0x18d),alert(_0x2e0a95),this[_0x49938f(0x90)]=!![];}return![];}}if(_0x59970f[_0x49938f(0xf7)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x111f14=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x354d9f=this[_0x49938f(0x157)](_0x3ceffe,_0x5f10b9,_0x4302f5,_0x111f14[0x0]),_0x5c748f=_0x111f14[0x1],_0x38f266=this['determineLineValue'](_0x3ceffe,_0x5f10b9,_0x4302f5,_0x111f14[0x2]);window[_0x49938f(0x197)]=window['a']=window['b']=undefined;const _0x55c265=_0x49938f(0x8a)['format'](_0x354d9f,_0x5c748f,_0x38f266);try{return eval(_0x55c265);}catch(_0x19bab9){return $gameTemp['isPlaytest']()&&(console['log'](_0x49938f(0xe6)[_0x49938f(0x11f)](_0x59970f)),console[_0x49938f(0x196)](_0x19bab9)),!![];}}else{if(_0x59970f[_0x49938f(0xf7)](/(\d+\.?\d*)([%％]) CHANCE/i)){const _0x1eeb59=Number(RegExp['$1'])*0.01;return this[_0x49938f(0x1c3)]<_0x1eeb59;}else{if(_0x59970f[_0x49938f(0xf7)](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){const _0x33728=Number(RegExp['$1']),_0x3ff98f=String(RegExp['$2'])[_0x49938f(0xe2)](),_0x40c38b=_0x3ff98f['match'](/ON|TRUE/i);return $gameSwitches[_0x49938f(0xc8)](_0x33728)===_0x40c38b;}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) IS ACTOR/i)){const _0x1a5771=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9;return _0x1a5771[_0x49938f(0x93)]();}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) IS ENEMY/i)){const _0x3a91fb=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9;return _0x3a91fb[_0x49938f(0x111)]();}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) HAS STATE (\d+)/i)){const _0x13be0b=$dataStates[Number(RegExp['$2'])],_0xd2de92=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9;return _0xd2de92['states']()[_0x49938f(0x1d6)](_0x13be0b);}else{if(_0x59970f['match'](/(.*) HAS STATE (.*)/i)){const _0x5c4289=$dataStates[DataManager[_0x49938f(0xca)](RegExp['$2'])],_0x316874=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9;return _0x316874[_0x49938f(0xc5)]()[_0x49938f(0x1d6)](_0x5c4289);}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) NOT STATE (\d+)/i)){const _0x4853ae=$dataStates[Number(RegExp['$2'])],_0x309648=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9;return!_0x309648['states']()[_0x49938f(0x1d6)](_0x4853ae);}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) NOT STATE (.*)/i)){const _0x14560f=$dataStates[DataManager[_0x49938f(0xca)](RegExp['$2'])],_0x34e085=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9;return!_0x34e085[_0x49938f(0xc5)]()[_0x49938f(0x1d6)](_0x14560f);}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0xeab475=_0x36a235[_0x49938f(0x15b)](String(RegExp['$2'])[_0x49938f(0x1e0)]()[_0x49938f(0x16a)]()),_0x99fafa=String(RegExp['$3'])[_0x49938f(0xe2)]()[_0x49938f(0x16a)](),_0x8f8450=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9,_0x347519=_0x49938f(0x1bb)['format'](_0x99fafa[_0x49938f(0xfd)](0x0)[_0x49938f(0x1e0)]()+_0x99fafa[_0x49938f(0xc2)](0x1));return _0x8f8450[_0x347519](_0xeab475);}else{if(_0x59970f['match'](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x2cb7d0=_0x36a235['indexOf'](String(RegExp['$2'])[_0x49938f(0x1e0)]()[_0x49938f(0x16a)]()),_0x18e24f=String(RegExp['$3'])[_0x49938f(0xe2)]()[_0x49938f(0x16a)](),_0x460efb=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9,_0x27cd36=_0x49938f(0x77)[_0x49938f(0x11f)](_0x18e24f[_0x49938f(0xfd)](0x0)[_0x49938f(0x1e0)]()+_0x18e24f[_0x49938f(0xc2)](0x1));return _0x460efb[_0x27cd36](_0x2cb7d0);}else{if(_0x59970f['match'](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x351432=_0x36a235[_0x49938f(0x15b)](String(RegExp['$2'])['toUpperCase']()['trim']()),_0xb86ad8=String(RegExp['$3'])[_0x49938f(0xe2)]()[_0x49938f(0x16a)](),_0x44f4d9=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9,_0x2b097a=_0x49938f(0x1bb)['format'](_0xb86ad8['charAt'](0x0)[_0x49938f(0x1e0)]()+_0xb86ad8[_0x49938f(0xc2)](0x1));return!_0x44f4d9[_0x2b097a](_0x351432);}else{if(_0x59970f[_0x49938f(0xf7)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x4c7115=_0x36a235[_0x49938f(0x15b)](String(RegExp['$2'])[_0x49938f(0x1e0)]()[_0x49938f(0x16a)]()),_0x29a23c=String(RegExp['$3'])[_0x49938f(0xe2)]()['trim'](),_0x8e9fe3=String(RegExp['$1'])[_0x49938f(0xf7)](/(?:USER|SUBJECT)/i)?_0x270c29:_0x5f10b9,_0x20ed05=_0x49938f(0x77)[_0x49938f(0x11f)](_0x29a23c[_0x49938f(0xfd)](0x0)['toUpperCase']()+_0x29a23c['slice'](0x1));return!_0x8e9fe3[_0x20ed05](_0x4c7115);}}}}}}}}}}}}}return!![];},AIManager['determineLineValue']=function(_0x483501,_0x4acbbf,_0x415d66,_0x54cbb4){const _0x18d98c=_0x26cdfb,_0x5247ee=['MAXHP',_0x18d98c(0x9c),_0x18d98c(0x1c7),_0x18d98c(0x16d),_0x18d98c(0x15e),'MDF',_0x18d98c(0xf6),_0x18d98c(0xae)];window[_0x18d98c(0x197)]=_0x483501,window['a']=user,window['b']=_0x4acbbf;const _0x52d1b6=_0x54cbb4,_0x5bd0c0=user['opponentsUnit']();let _0xac5d83=_0x54cbb4[_0x18d98c(0xf7)](/(?:USER|SUBJECT)/i)?user:_0x4acbbf;_0x54cbb4=_0x54cbb4[_0x18d98c(0x126)](/\b(\d+)([%％])/gi,(_0x43c02d,_0x166054)=>Number(_0x166054)*0.01);if(_0x54cbb4[_0x18d98c(0xf7)](/(?:VAR|VARIABLE) (\d+)/i))return $gameVariables[_0x18d98c(0xc8)](Number(RegExp['$1']));if(_0x54cbb4[_0x18d98c(0xf7)](/TEAM ALIVE MEMBERS/i))return _0xac5d83[_0x18d98c(0x89)]()['aliveMembers']()['length'];if(_0x54cbb4[_0x18d98c(0xf7)](/TEAM DEAD MEMBERS/i))return _0xac5d83[_0x18d98c(0x89)]()['deadMembers']()[_0x18d98c(0xa9)];if(_0x54cbb4['match'](/ELEMENT (\d+) RATE/i)){const _0x499fe3=Number(RegExp['$1']);return this[_0x18d98c(0xb5)](_0x483501,_0x4acbbf,_0xac5d83,_0x499fe3);}else{if(_0x54cbb4['match'](/ELEMENT (.*) RATE/i)){const _0x2b035e=DataManager['getElementIdWithName'](String(RegExp['$1']));return this[_0x18d98c(0xb5)](_0x483501,_0x4acbbf,_0xac5d83,_0x2b035e);}else{if(_0x54cbb4[_0x18d98c(0xf7)](/(.*) ELEMENT RATE/i)){const _0x5dceb9=DataManager['getElementIdWithName'](String(RegExp['$1']));return this['elementKnowledgeRate'](_0x483501,_0x4acbbf,_0xac5d83,_0x5dceb9);}}}if(_0x54cbb4['match'](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){const _0x8f85fb=_0x5247ee['indexOf'](String(RegExp['$1'])[_0x18d98c(0x1e0)]()[_0x18d98c(0x16a)]()),_0x4ad756=String(RegExp['$2'])[_0x18d98c(0xe2)]()[_0x18d98c(0x16a)]();return _0xac5d83[_0x18d98c(0xc4)](_0x8f85fb)*(_0x4ad756===_0x18d98c(0xc4)?0x1:-0x1);}if(_0x54cbb4[_0x18d98c(0xf7)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){const _0x45b57b=_0x5247ee[_0x18d98c(0x15b)](String(RegExp['$1'])['toUpperCase']()['trim']()),_0x2c51ce=String(RegExp['$2'])[_0x18d98c(0xe2)]()[_0x18d98c(0x16a)]();if(_0x2c51ce===_0x18d98c(0xc4)&&_0xac5d83[_0x18d98c(0x117)](_0x45b57b))return _0xac5d83[_0x18d98c(0x17c)][_0x45b57b];else{if(_0x2c51ce==='debuff'&&_0xac5d83[_0x18d98c(0xbe)](_0x45b57b))return _0xac5d83[_0x18d98c(0x17c)][_0x45b57b];}return 0x0;}if(_0x54cbb4[_0x18d98c(0xf7)](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x4fcd02=Number(RegExp['$1']);if(_0xac5d83['isStateAffected'](_0x4fcd02)){const _0x3b69ad=$dataStates[_0x4fcd02];return _0x3b69ad&&_0x3b69ad['autoRemovalTiming']===0x0?Number[_0x18d98c(0x1bf)]:_0xac5d83[_0x18d98c(0xef)][_0x4fcd02]||0x0;}else return _0xac5d83['states']()[_0x18d98c(0x1d6)]($dataStates[_0x4fcd02])?Number['MAX_SAFE_INTEGER']:0x0;}else{if(_0x54cbb4[_0x18d98c(0xf7)](/STATE (.*) (?:TURN|TURNS)/i)){const _0x258602=DataManager[_0x18d98c(0xca)](RegExp['$1']);if(_0xac5d83['isStateAffected'](_0x258602)){const _0x467aa9=$dataStates[_0x258602];return _0x467aa9&&_0x467aa9[_0x18d98c(0x1d9)]===0x0?Number['MAX_SAFE_INTEGER']:_0xac5d83[_0x18d98c(0xef)][_0x258602]||0x0;}else return _0xac5d83[_0x18d98c(0xc5)]()[_0x18d98c(0x1d6)]($dataStates[_0x258602])?Number[_0x18d98c(0x1bf)]:0x0;}}if(_0x54cbb4[_0x18d98c(0xf7)](/\bHP([%％])/i))return _0xac5d83['hpRate']();else{if(_0x54cbb4[_0x18d98c(0xf7)](/\bMP([%％])/i))return _0xac5d83[_0x18d98c(0xa5)]();else{if(_0x54cbb4[_0x18d98c(0xf7)](/\bTP([%％])/i))return _0xac5d83[_0x18d98c(0x1cb)]();else{if(_0x54cbb4[_0x18d98c(0xf7)](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0xac5d83[_0x18d98c(0x139)];else{if(_0x54cbb4['match'](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0xac5d83[_0x18d98c(0x1d1)];else{if(_0x54cbb4[_0x18d98c(0xf7)](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0xac5d83[_0x18d98c(0x133)]();}}}}}if(_0x54cbb4[_0x18d98c(0xf7)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0xac5d83[String(RegExp['$1'])[_0x18d98c(0xe2)]()[_0x18d98c(0x16a)]()];try{return eval(_0x54cbb4);}catch(_0x493254){return $gameTemp[_0x18d98c(0x1c6)]()&&(console[_0x18d98c(0x196)]('AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1'[_0x18d98c(0x11f)](_0x52d1b6)),console[_0x18d98c(0x196)](_0x493254)),0x0;}},AIManager[_0x26cdfb(0xb5)]=function(_0x5b9b3e,_0x1bed01,_0x4196f1,_0x303b17){const _0x1a97dd=_0x26cdfb;if(_0x5b9b3e[_0x1a97dd(0x93)]()===_0x4196f1[_0x1a97dd(0x93)]())return _0x4196f1['elementRate'](_0x303b17);else return _0x4196f1['opponentsUnit']()[_0x1a97dd(0x1a9)](_0x303b17,_0x4196f1)?_0x4196f1[_0x1a97dd(0x184)](_0x303b17):VisuMZ[_0x1a97dd(0x15f)][_0x1a97dd(0x1cd)]['General']['UnknownElementRate'];},AIManager[_0x26cdfb(0x16f)]=function(_0x177a3c,_0x596b09){const _0x2bada7=_0x26cdfb;if(!_0x596b09)return;if(!_0x596b09[_0x2bada7(0x1ab)][_0x2bada7(0xf7)](AIManager['_regexp'][_0x2bada7(0x177)]))return;const _0x46b60e=String(RegExp['$1'])['toUpperCase']()['trim']();let _0x53da68=this[_0x2bada7(0x1db)](_0x177a3c,_0x46b60e);_0x53da68&&(this['_forceValidTargets']=[_0x53da68]);},AIManager['createFilterTarget']=function(_0x44692a,_0xdfb791){const _0x28aae2=_0x26cdfb,_0x429f8e=[_0x28aae2(0xa1),'MAXMP',_0x28aae2(0x1c7),_0x28aae2(0x16d),_0x28aae2(0x15e),_0x28aae2(0xfb),_0x28aae2(0xf6),_0x28aae2(0xae)],_0xbed643=['HIT','EVA',_0x28aae2(0x192),_0x28aae2(0x150),_0x28aae2(0x119),_0x28aae2(0x190),_0x28aae2(0x98),_0x28aae2(0x130),'MRG',_0x28aae2(0x172)],_0x12a8b5=['TGR',_0x28aae2(0x134),_0x28aae2(0xad),'PHA',_0x28aae2(0xc6),_0x28aae2(0x112),'PDR',_0x28aae2(0x14f),_0x28aae2(0x1a8),_0x28aae2(0xf4)];let _0x2c158c=null;if(_0xdfb791===_0x28aae2(0x18a)){if(this['_forceValidTargets'][_0x28aae2(0x1d6)](_0x44692a))return _0x44692a;}else{if(_0xdfb791===_0x28aae2(0x156))return this[_0x28aae2(0xa8)][0x0];else{if(_0xdfb791===_0x28aae2(0x104))return this[_0x28aae2(0xa8)][this[_0x28aae2(0xa8)][_0x28aae2(0xa9)]-0x1];else{if(_0xdfb791[_0x28aae2(0xf7)](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x3dc2ff=String(RegExp['$1'])[_0x28aae2(0x1e0)]()['trim']()===_0x28aae2(0x1ba),_0x5bf3df=!_0x3dc2ff,_0x121a48=String(RegExp['$2'])[_0x28aae2(0x1e0)]()[_0x28aae2(0x16a)]();if(_0x429f8e['includes'](_0x121a48)){const _0x136165=_0x429f8e[_0x28aae2(0x15b)](_0x121a48);_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x4b80c6 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x4b80c6[_0x28aae2(0x189)](_0x136165)>_0x2c158c[_0x28aae2(0x189)](_0x136165))_0x2c158c=_0x4b80c6;if(_0x5bf3df&&_0x4b80c6[_0x28aae2(0x189)](_0x136165)<_0x2c158c['param'](_0x136165))_0x2c158c=_0x4b80c6;}return _0x2c158c;}if(_0xbed643[_0x28aae2(0x1d6)](_0x121a48)){const _0x58c925=_0xbed643[_0x28aae2(0x15b)](_0x121a48);_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x4f9503 of this['_forceValidTargets']){if(_0x3dc2ff&&_0x4f9503[_0x28aae2(0xb6)](_0x58c925)>_0x2c158c[_0x28aae2(0xb6)](_0x58c925))_0x2c158c=_0x4f9503;if(_0x5bf3df&&_0x4f9503[_0x28aae2(0xb6)](_0x58c925)<_0x2c158c[_0x28aae2(0xb6)](_0x58c925))_0x2c158c=_0x4f9503;}return _0x2c158c;}if(_0x12a8b5[_0x28aae2(0x1d6)](_0x121a48)){const _0x4441d0=_0x12a8b5['indexOf'](_0x121a48);_0x2c158c=this['_forceValidTargets'][0x0];for(const _0x3a3c8a of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x3a3c8a[_0x28aae2(0xcc)](_0x4441d0)>_0x2c158c[_0x28aae2(0xcc)](_0x4441d0))_0x2c158c=_0x3a3c8a;if(_0x5bf3df&&_0x3a3c8a[_0x28aae2(0xcc)](_0x4441d0)<_0x2c158c[_0x28aae2(0xcc)](_0x4441d0))_0x2c158c=_0x3a3c8a;}return _0x2c158c;}if(_0x121a48==='HP'){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x49d392 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x49d392['hp']>_0x2c158c['hp'])_0x2c158c=_0x49d392;if(_0x5bf3df&&_0x49d392['hp']<_0x2c158c['hp'])_0x2c158c=_0x49d392;}return _0x2c158c;}if(_0x121a48===_0x28aae2(0x136)){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x5b373e of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x5b373e[_0x28aae2(0x108)]()>_0x2c158c[_0x28aae2(0x108)]())_0x2c158c=_0x5b373e;if(_0x5bf3df&&_0x5b373e[_0x28aae2(0x108)]()<_0x2c158c[_0x28aae2(0x108)]())_0x2c158c=_0x5b373e;}return _0x2c158c;}if(_0x121a48==='MP'){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x5dd162 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x5dd162['mp']>_0x2c158c['mp'])_0x2c158c=_0x5dd162;if(_0x5bf3df&&_0x5dd162['mp']<_0x2c158c['mp'])_0x2c158c=_0x5dd162;}return _0x2c158c;}if(_0x121a48===_0x28aae2(0x116)){_0x2c158c=this['_forceValidTargets'][0x0];for(const _0x135841 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x135841[_0x28aae2(0xa5)]()>_0x2c158c['mpRate']())_0x2c158c=_0x135841;if(_0x5bf3df&&_0x135841[_0x28aae2(0xa5)]()<_0x2c158c[_0x28aae2(0xa5)]())_0x2c158c=_0x135841;}return _0x2c158c;}if(_0x121a48==='TP'){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x36e9f3 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x36e9f3['tp']>_0x2c158c['tp'])_0x2c158c=_0x36e9f3;if(_0x5bf3df&&_0x36e9f3['tp']<_0x2c158c['tp'])_0x2c158c=_0x36e9f3;}return _0x2c158c;}if(_0x121a48===_0x28aae2(0x164)){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x1f79d0 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x1f79d0['tpRate']()>_0x2c158c['tpRate']())_0x2c158c=_0x1f79d0;if(_0x5bf3df&&_0x1f79d0[_0x28aae2(0x1cb)]()<_0x2c158c[_0x28aae2(0x1cb)]())_0x2c158c=_0x1f79d0;}return _0x2c158c;}if(_0x121a48===_0x28aae2(0x1da)){_0x2c158c=this['_forceValidTargets'][0x0];for(const _0x10e670 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x10e670[_0x28aae2(0x133)]()>_0x2c158c['maxTp']())_0x2c158c=_0x10e670;if(_0x5bf3df&&_0x10e670[_0x28aae2(0x133)]()<_0x2c158c[_0x28aae2(0x133)]())_0x2c158c=_0x10e670;}return _0x2c158c;}if(_0x121a48==='LEVEL'){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x8d62e9 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&(_0x8d62e9[_0x28aae2(0x188)]||0x0)>(_0x2c158c['level']||0x0))_0x2c158c=_0x8d62e9;if(_0x5bf3df&&(_0x8d62e9[_0x28aae2(0x188)]||0x0)<(_0x2c158c['level']||0x0))_0x2c158c=_0x8d62e9;}return _0x2c158c;}if(_0x121a48==='STATE\x20COUNT'&&Imported[_0x28aae2(0x163)]){_0x2c158c=this[_0x28aae2(0xa8)][0x0];for(const _0x5d0b28 of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x5d0b28[_0x28aae2(0xc5)]()[_0x28aae2(0xa9)]>_0x2c158c[_0x28aae2(0xc5)]()[_0x28aae2(0xa9)])_0x2c158c=_0x5d0b28;if(_0x5bf3df&&_0x5d0b28[_0x28aae2(0xc5)]()[_0x28aae2(0xa9)]<_0x2c158c[_0x28aae2(0xc5)]()[_0x28aae2(0xa9)])_0x2c158c=_0x5d0b28;}return _0x2c158c;}if(_0x121a48==='POSITIVE\x20STATE\x20COUNT'&&Imported[_0x28aae2(0x163)]){_0x2c158c=this[_0x28aae2(0xa8)][0x0];const _0x195733=_0x28aae2(0x9f);for(const _0x408abc of this['_forceValidTargets']){if(_0x3dc2ff&&_0x408abc['statesByCategory'](_0x195733)['length']>_0x2c158c['statesByCategory'](_0x195733)[_0x28aae2(0xa9)])_0x2c158c=_0x408abc;if(_0x5bf3df&&_0x408abc[_0x28aae2(0xd8)](_0x195733)['length']<_0x2c158c[_0x28aae2(0xd8)](_0x195733)[_0x28aae2(0xa9)])_0x2c158c=_0x408abc;}return _0x2c158c;}if(_0x121a48===_0x28aae2(0x15c)&&Imported[_0x28aae2(0x163)]){_0x2c158c=this[_0x28aae2(0xa8)][0x0];const _0x3745ef=_0x28aae2(0x195);for(const _0x4fda7f of this[_0x28aae2(0xa8)]){if(_0x3dc2ff&&_0x4fda7f[_0x28aae2(0xd8)](_0x3745ef)[_0x28aae2(0xa9)]>_0x2c158c[_0x28aae2(0xd8)](_0x3745ef)['length'])_0x2c158c=_0x4fda7f;if(_0x5bf3df&&_0x4fda7f[_0x28aae2(0xd8)](_0x3745ef)[_0x28aae2(0xa9)]<_0x2c158c[_0x28aae2(0xd8)](_0x3745ef)[_0x28aae2(0xa9)])_0x2c158c=_0x4fda7f;}return _0x2c158c;}}}}}return null;},DataManager[_0x26cdfb(0x1bd)]=function(_0x4d2995){const _0x53adc6=_0x26cdfb;_0x4d2995=_0x4d2995[_0x53adc6(0x1e0)]()[_0x53adc6(0x16a)](),this[_0x53adc6(0xe0)]=this[_0x53adc6(0xe0)]||{};if(this[_0x53adc6(0xe0)][_0x4d2995])return this[_0x53adc6(0xe0)][_0x4d2995];let _0x161f92=0x1;for(const _0x1eee50 of $dataSystem['elements']){if(!_0x1eee50)continue;let _0x311af7=_0x1eee50[_0x53adc6(0x1e0)]();_0x311af7=_0x311af7[_0x53adc6(0x126)](/\x1I\[(\d+)\]/gi,''),_0x311af7=_0x311af7['replace'](/\\I\[(\d+)\]/gi,''),this[_0x53adc6(0xe0)][_0x311af7]=_0x161f92,_0x161f92++;}return this[_0x53adc6(0xe0)][_0x4d2995]||0x0;},DataManager[_0x26cdfb(0xca)]=function(_0xbe3e94){const _0x210759=_0x26cdfb;_0xbe3e94=_0xbe3e94[_0x210759(0x1e0)]()[_0x210759(0x16a)](),this[_0x210759(0x152)]=this[_0x210759(0x152)]||{};if(this[_0x210759(0x152)][_0xbe3e94])return this[_0x210759(0x152)][_0xbe3e94];for(const _0x13b740 of $dataStates){if(!_0x13b740)continue;this['_stateIDs'][_0x13b740[_0x210759(0xbd)]['toUpperCase']()[_0x210759(0x16a)]()]=_0x13b740['id'];}return this['_stateIDs'][_0xbe3e94]||0x0;},VisuMZ[_0x26cdfb(0x15f)]['BattleManager_getNextSubject']=BattleManager['getNextSubject'],BattleManager['getNextSubject']=function(){const _0x464dd5=_0x26cdfb,_0x18dd98=VisuMZ['BattleAI'][_0x464dd5(0x82)][_0x464dd5(0x165)](this);if(_0x18dd98&&_0x18dd98[_0x464dd5(0xaf)]()){const _0x343f58=_0x18dd98[_0x464dd5(0x71)]();if(!_0x343f58||_0x343f58&&!_0x343f58['item']())_0x18dd98[_0x464dd5(0xe8)]();else{if(VisuMZ[_0x464dd5(0x15f)][_0x464dd5(0x1cd)][_0x464dd5(0x16e)][_0x464dd5(0x176)]){if(_0x343f58&&_0x343f58['_forceAction'])return _0x18dd98;_0x18dd98[_0x464dd5(0xe8)](),Imported[_0x464dd5(0x115)]&&this[_0x464dd5(0xb2)]()&&(_0x18dd98['_onSpotMadeActionsDeterminedByAI']=!![]);}}}return _0x18dd98;},VisuMZ['BattleAI'][_0x26cdfb(0x180)]=BattleManager[_0x26cdfb(0xfc)],BattleManager[_0x26cdfb(0xfc)]=function(){const _0x526c1e=_0x26cdfb;this[_0x526c1e(0x109)](),this[_0x526c1e(0x14e)]['currentAction']()?VisuMZ[_0x526c1e(0x15f)]['BattleManager_startAction']['call'](this):this[_0x526c1e(0xf2)]();},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0xf9)]=BattleManager['endAction'],BattleManager[_0x26cdfb(0xf2)]=function(){const _0x52fe8a=_0x26cdfb;this[_0x52fe8a(0x109)](),VisuMZ[_0x52fe8a(0x15f)][_0x52fe8a(0xf9)]['call'](this);},BattleManager[_0x26cdfb(0x109)]=function(){const _0x2d9b86=_0x26cdfb;this[_0x2d9b86(0x194)](this['_subject']);},BattleManager['determineTargetActionByAIisStillValid']=function(_0x4b99a8){const _0x37be07=_0x26cdfb;if(!_0x4b99a8)return;if(_0x4b99a8[_0x37be07(0x1a7)]()===_0x37be07(0xb9))return;if(!_0x4b99a8[_0x37be07(0xaf)]())return;const _0x12af01=_0x4b99a8[_0x37be07(0x71)]();if(!_0x12af01)return;if(_0x12af01['_forceAction'])return;const _0x16689c=_0x12af01['item']();if(_0x4b99a8[_0x37be07(0x1df)])return;if(AIManager[_0x37be07(0x12d)](_0x4b99a8,_0x16689c)&&_0x4b99a8[_0x37be07(0x1c8)](_0x16689c))return;_0x4b99a8[_0x37be07(0x94)]();},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x1a2)]=Game_Temp[_0x26cdfb(0x1c1)]['initialize'],Game_Temp[_0x26cdfb(0x1c1)]['initialize']=function(){const _0x2f2d98=_0x26cdfb;VisuMZ[_0x2f2d98(0x15f)][_0x2f2d98(0x1a2)]['call'](this),this[_0x2f2d98(0x13d)]();},Game_Temp[_0x26cdfb(0x1c1)][_0x26cdfb(0x13d)]=function(){this['_aiTgrInfluence']={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0,'pdrInfluenceRate':0x0,'mdrInfluenceRate':0x0};},Game_Temp[_0x26cdfb(0x1c1)]['aiTgrInfluence']=function(){const _0x42dd76=_0x26cdfb;if(this[_0x42dd76(0x1c9)]===undefined)this[_0x42dd76(0x13d)]();return this[_0x42dd76(0x1c9)];},Game_Temp[_0x26cdfb(0x1c1)][_0x26cdfb(0xd4)]=function(_0x60f1b7,_0x2ecadc){const _0x17c932=_0x26cdfb;this['clearAiTgrInfluence']();const _0x4396db=this['aiTgrInfluence']();_0x4396db[_0x17c932(0x1be)]=_0x2ecadc;if(!_0x2ecadc)return;if(!_0x2ecadc['item']())return;if(_0x60f1b7[_0x17c932(0x128)]()){_0x4396db['elementInfluence']=!![],_0x4396db[_0x17c932(0x8e)]=_0x60f1b7[_0x17c932(0x162)](),_0x4396db[_0x17c932(0x161)]=[];if(Imported[_0x17c932(0x10e)])_0x4396db[_0x17c932(0x161)]=_0x4396db['elementIds'][_0x17c932(0x1d4)](_0x2ecadc['elements']());else _0x2ecadc[_0x17c932(0x78)]()[_0x17c932(0x199)][_0x17c932(0xaa)]<0x0?_0x4396db['elementIds']=_0x4396db['elementIds']['concat'](_0x60f1b7[_0x17c932(0x158)]()):_0x4396db[_0x17c932(0x161)][_0x17c932(0xd6)](_0x2ecadc[_0x17c932(0x78)]()[_0x17c932(0x199)][_0x17c932(0xaa)]);}_0x2ecadc[_0x17c932(0x1a6)]()&&_0x60f1b7[_0x17c932(0x14a)]()&&(_0x4396db['evaInfluenceRate']=_0x60f1b7['aiApplyEvaTgrInfluenceRate']()),_0x2ecadc[_0x17c932(0x1a6)]()&&_0x2ecadc['isDamage']()&&_0x60f1b7[_0x17c932(0x125)]()&&(_0x4396db[_0x17c932(0x168)]=_0x60f1b7[_0x17c932(0xbc)]()),_0x2ecadc[_0x17c932(0x6d)]()&&_0x60f1b7[_0x17c932(0xa2)]()&&(_0x4396db[_0x17c932(0x11e)]=_0x60f1b7[_0x17c932(0x14c)]()),_0x2ecadc['isMagical']()&&_0x2ecadc[_0x17c932(0xe7)]()&&_0x60f1b7[_0x17c932(0x147)]()&&(_0x4396db['mdrInfluenceRate']=_0x60f1b7[_0x17c932(0xac)]());},VisuMZ['BattleAI'][_0x26cdfb(0x14d)]=Game_Action['prototype'][_0x26cdfb(0xa4)],Game_Action[_0x26cdfb(0x1c1)]['makeTargets']=function(){const _0x2416b7=_0x26cdfb;this[_0x2416b7(0x17d)]()&&this['subject']()[_0x2416b7(0xaf)]()&&(AIManager['forceValidTargets'](this[_0x2416b7(0x110)](),this[_0x2416b7(0x78)]()),this[_0x2416b7(0x76)]()&&AIManager['filterForcedTargeting'](this[_0x2416b7(0x110)](),this[_0x2416b7(0x78)]()));$gameTemp[_0x2416b7(0xd4)](this[_0x2416b7(0x110)](),this);const _0x326363=VisuMZ[_0x2416b7(0x15f)][_0x2416b7(0x14d)][_0x2416b7(0x165)](this);return $gameTemp['clearAiTgrInfluence'](),AIManager[_0x2416b7(0xcb)](),_0x326363;},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x16c)]=Game_Action[_0x26cdfb(0x1c1)][_0x26cdfb(0x13e)],Game_Action[_0x26cdfb(0x1c1)][_0x26cdfb(0x13e)]=function(){const _0x4889ec=_0x26cdfb,_0xdd195e=this['subject'](),_0x33e913=this[_0x4889ec(0x78)]();let _0x450386=VisuMZ[_0x4889ec(0x15f)][_0x4889ec(0x16c)]['call'](this);if(_0xdd195e[_0x4889ec(0xaf)]()&&AIManager[_0x4889ec(0x12d)](_0xdd195e,_0x33e913)){let _0x420dce=AIManager[_0x4889ec(0x1b1)](_0xdd195e,_0x33e913);_0x450386=_0x450386['filter'](_0x4c08df=>_0x420dce[_0x4889ec(0x1d6)](_0x4c08df));}return _0x450386;},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x88)]=Game_Action[_0x26cdfb(0x1c1)][_0x26cdfb(0x18f)],Game_Action[_0x26cdfb(0x1c1)][_0x26cdfb(0x18f)]=function(_0x5bc717){const _0x52dec8=_0x26cdfb;VisuMZ['BattleAI'][_0x52dec8(0x88)][_0x52dec8(0x165)](this,_0x5bc717),this[_0x52dec8(0x1dd)](_0x5bc717);},Game_Action[_0x26cdfb(0x1c1)]['applyBattleAI']=function(_0x3e003b){const _0x3e68bc=_0x26cdfb;if(!_0x3e003b)return;if(this[_0x3e68bc(0x110)]()[_0x3e68bc(0x93)]()===_0x3e003b[_0x3e68bc(0x93)]())return;if(!this[_0x3e68bc(0x78)]())return;let _0x59614f=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x59614f=this[_0x3e68bc(0xcf)]();else this[_0x3e68bc(0x78)]()[_0x3e68bc(0x199)][_0x3e68bc(0xaa)]<0x0?_0x59614f=this[_0x3e68bc(0x110)]()[_0x3e68bc(0x158)]():_0x59614f=[this['item']()['damage'][_0x3e68bc(0xaa)]];_0x3e003b[_0x3e68bc(0x103)](_0x59614f,this['isPhysical'](),this['isMagical']());},VisuMZ['BattleAI'][_0x26cdfb(0x123)]=Game_Action['prototype'][_0x26cdfb(0xbf)],Game_Action[_0x26cdfb(0x1c1)][_0x26cdfb(0xbf)]=function(){const _0x8d01e6=_0x26cdfb,_0x2e2bd4=this[_0x8d01e6(0x78)]()[_0x8d01e6(0x79)];if(_0x2e2bd4[_0x8d01e6(0xf7)](/ANY/i)){if(Imported['VisuMZ_2_BattleGridSystem']&&this[_0x8d01e6(0xd3)]()){}else return!![];}return VisuMZ['BattleAI'][_0x8d01e6(0x123)][_0x8d01e6(0x165)](this);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x7a)]=Game_BattlerBase[_0x26cdfb(0x1c1)]['sparam'],Game_BattlerBase[_0x26cdfb(0x1c1)][_0x26cdfb(0xcc)]=function(_0x2d851f){const _0x551dec=_0x26cdfb;let _0x32619a=VisuMZ[_0x551dec(0x15f)][_0x551dec(0x7a)][_0x551dec(0x165)](this,_0x2d851f);return _0x2d851f===0x0&&(_0x32619a*=this[_0x551dec(0x1e1)]()),_0x32619a;},Game_BattlerBase['prototype'][_0x26cdfb(0x1e1)]=function(){const _0x530bed=_0x26cdfb,_0x5345ab=$gameTemp[_0x530bed(0x131)](),_0x47b64b=this[_0x530bed(0x146)]();if(!_0x5345ab[_0x530bed(0x1be)])return 0x1;if(Imported[_0x530bed(0x187)]){if(_0x5345ab[_0x530bed(0x1be)]&&_0x5345ab['action'][_0x530bed(0x114)]())return 0x1;}let _0x1c6947=0x1;if(_0x5345ab['elementInfluence'])for(const _0x4ff56f of _0x5345ab[_0x530bed(0x161)]){_0x47b64b['hasElementAIKnowledge'](_0x4ff56f,this)&&(_0x1c6947*=this['elementRate'](_0x4ff56f)*_0x5345ab['elementInfluenceRate']);}_0x47b64b[_0x530bed(0xee)](_0x530bed(0x1a4),this)&&(_0x1c6947*=0x1-this[_0x530bed(0x1a4)]*_0x5345ab[_0x530bed(0xdc)]);_0x47b64b[_0x530bed(0xee)](_0x530bed(0x15d),this)&&(_0x1c6947*=0x1-this[_0x530bed(0x15d)]*_0x5345ab[_0x530bed(0x11e)]);{_0x1c6947*=0x1+((this[_0x530bed(0x148)]-0x1)*_0x5345ab[_0x530bed(0x168)]??0x0),_0x1c6947*=0x1+((this['mdr']-0x1)*_0x5345ab['mdrInfluenceRate']??0x0);}return _0x1c6947[_0x530bed(0x198)](0.001,0x3e8);},Game_BattlerBase[_0x26cdfb(0x1c1)]['aiStyle']=function(){const _0x4192a6=_0x26cdfb;return _0x4192a6(0xd1);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x1b6)]=Game_BattlerBase[_0x26cdfb(0x1c1)][_0x26cdfb(0x127)],Game_BattlerBase[_0x26cdfb(0x1c1)][_0x26cdfb(0x127)]=function(){const _0x715bab=_0x26cdfb;this[_0x715bab(0x1d0)]=![],VisuMZ['BattleAI'][_0x715bab(0x1b6)][_0x715bab(0x165)](this);},VisuMZ[_0x26cdfb(0x15f)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x26cdfb(0x1c1)]['revive'],Game_BattlerBase[_0x26cdfb(0x1c1)][_0x26cdfb(0x9d)]=function(){const _0x412366=_0x26cdfb;this['_onSpotMadeActionsDeterminedByAI']=![],VisuMZ[_0x412366(0x15f)]['Game_BattlerBase_revive'][_0x412366(0x165)](this);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x155)]=Game_Battler['prototype'][_0x26cdfb(0xc9)],Game_Battler[_0x26cdfb(0x1c1)]['onBattleStart']=function(_0x95b5b9){const _0x33b3d7=_0x26cdfb;this[_0x33b3d7(0x1d0)]=![],VisuMZ[_0x33b3d7(0x15f)][_0x33b3d7(0x155)][_0x33b3d7(0x165)](this,_0x95b5b9);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0xfa)]=Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0xeb)],Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0xeb)]=function(){const _0x5f2be3=_0x26cdfb;this[_0x5f2be3(0x1d0)]=![],VisuMZ[_0x5f2be3(0x15f)][_0x5f2be3(0xfa)][_0x5f2be3(0x165)](this);},VisuMZ['BattleAI'][_0x26cdfb(0x159)]=Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x121)],Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x121)]=function(){const _0x2db274=_0x26cdfb;this['_onSpotMadeActionsDeterminedByAI']=![],VisuMZ[_0x2db274(0x15f)][_0x2db274(0x159)][_0x2db274(0x165)](this);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0xb4)]=Game_Battler['prototype'][_0x26cdfb(0xe8)],Game_Battler['prototype'][_0x26cdfb(0xe8)]=function(){const _0x40caa3=_0x26cdfb;if(this[_0x40caa3(0x1d0)])return;VisuMZ[_0x40caa3(0x15f)]['Game_Battler_makeActions'][_0x40caa3(0x165)](this);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x12a)]=Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x1ce)],Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x1ce)]=function(){const _0x415b70=_0x26cdfb;if(this[_0x415b70(0xaf)]()){const _0x56b80c=VisuMZ[_0x415b70(0x15f)][_0x415b70(0x1cd)]['General'];if(_0x56b80c[_0x415b70(0x176)]&&_0x56b80c[_0x415b70(0x1bc)])return![];}return VisuMZ[_0x415b70(0x15f)]['Game_Battler_isChanting']['call'](this);},Game_Battler['prototype'][_0x26cdfb(0xaf)]=function(){const _0x56f758=_0x26cdfb;if(this[_0x56f758(0x185)]())return![];return!![];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x94)]=function(){},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x128)]=function(){const _0x487110=_0x26cdfb;if(this[_0x487110(0x93)]()||this[_0x487110(0x111)]()){const _0x5b921a=this[_0x487110(0x93)]()?this[_0x487110(0xd7)]()['note']:this['enemy']()[_0x487110(0x1ab)];if(_0x5b921a['match'](AIManager[_0x487110(0x105)][_0x487110(0xed)]))return![];else{if(_0x5b921a[_0x487110(0xf7)](AIManager[_0x487110(0x105)][_0x487110(0x7d)]))return this[_0x487110(0x162)]()>0x0;}}return VisuMZ[_0x487110(0x15f)][_0x487110(0x1cd)][_0x487110(0xf8)]['ElementTgr'];},Game_Battler['prototype'][_0x26cdfb(0x162)]=function(){const _0x476ee5=_0x26cdfb;if(this[_0x476ee5(0x93)]()||this[_0x476ee5(0x111)]()){const _0x3e352c=this['isActor']()?this[_0x476ee5(0xd7)]()['note']:this[_0x476ee5(0x75)]()[_0x476ee5(0x1ab)];if(_0x3e352c[_0x476ee5(0xf7)](AIManager['_regexp']['aiElementTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x476ee5(0x15f)][_0x476ee5(0x1cd)][_0x476ee5(0xf8)][_0x476ee5(0x7c)];},Game_Battler['prototype'][_0x26cdfb(0x14a)]=function(){const _0x3fb562=_0x26cdfb;if(this[_0x3fb562(0x93)]()||this[_0x3fb562(0x111)]()){const _0x528d6d=this[_0x3fb562(0x93)]()?this['actor']()[_0x3fb562(0x1ab)]:this[_0x3fb562(0x75)]()[_0x3fb562(0x1ab)];if(_0x528d6d['match'](AIManager[_0x3fb562(0x105)][_0x3fb562(0x1af)]))return![];else{if(_0x528d6d[_0x3fb562(0xf7)](AIManager[_0x3fb562(0x105)]['aiEvaTgr']))return this[_0x3fb562(0x120)]()>0x0;}}return VisuMZ[_0x3fb562(0x15f)][_0x3fb562(0x1cd)][_0x3fb562(0xf8)]['EvaTgr'];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x120)]=function(){const _0x3e3a09=_0x26cdfb;if(this[_0x3e3a09(0x93)]()||this[_0x3e3a09(0x111)]()){const _0x2e314e=this[_0x3e3a09(0x93)]()?this[_0x3e3a09(0xd7)]()['note']:this[_0x3e3a09(0x75)]()[_0x3e3a09(0x1ab)];if(_0x2e314e[_0x3e3a09(0xf7)](AIManager[_0x3e3a09(0x105)][_0x3e3a09(0x86)]))return eval(RegExp['$1']);}return VisuMZ['BattleAI'][_0x3e3a09(0x1cd)]['Weight'][_0x3e3a09(0x92)];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0xa2)]=function(){const _0xad7565=_0x26cdfb;if(this[_0xad7565(0x93)]()||this['isEnemy']()){const _0x5687bb=this[_0xad7565(0x93)]()?this[_0xad7565(0xd7)]()[_0xad7565(0x1ab)]:this['enemy']()[_0xad7565(0x1ab)];if(_0x5687bb[_0xad7565(0xf7)](AIManager[_0xad7565(0x105)]['bypassMevTgr']))return![];else{if(_0x5687bb['match'](AIManager[_0xad7565(0x105)][_0xad7565(0x1ae)]))return this[_0xad7565(0x14c)]()>0x0;}}return VisuMZ[_0xad7565(0x15f)][_0xad7565(0x1cd)][_0xad7565(0xf8)][_0xad7565(0x72)];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x14c)]=function(){const _0x485425=_0x26cdfb;if(this[_0x485425(0x93)]()||this[_0x485425(0x111)]()){const _0x360c5f=this[_0x485425(0x93)]()?this[_0x485425(0xd7)]()[_0x485425(0x1ab)]:this[_0x485425(0x75)]()[_0x485425(0x1ab)];if(_0x360c5f[_0x485425(0xf7)](AIManager['_regexp'][_0x485425(0x1ae)]))return eval(RegExp['$1']);}return VisuMZ[_0x485425(0x15f)][_0x485425(0x1cd)][_0x485425(0xf8)]['MevTgrRate'];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x125)]=function(){const _0x455070=_0x26cdfb;if(this[_0x455070(0x93)]()||this[_0x455070(0x111)]()){const _0x1c6164=this[_0x455070(0x93)]()?this[_0x455070(0xd7)]()['note']:this[_0x455070(0x75)]()[_0x455070(0x1ab)];if(_0x1c6164[_0x455070(0xf7)](AIManager['_regexp'][_0x455070(0x183)]))return![];else{if(_0x1c6164[_0x455070(0xf7)](AIManager[_0x455070(0x105)][_0x455070(0x8b)]))return this[_0x455070(0xbc)]()>0x0;}}return VisuMZ['BattleAI'][_0x455070(0x1cd)][_0x455070(0xf8)]['PdrTgr']??!![];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0xbc)]=function(){const _0x380c40=_0x26cdfb;if(this[_0x380c40(0x93)]()||this[_0x380c40(0x111)]()){const _0x153d35=this[_0x380c40(0x93)]()?this[_0x380c40(0xd7)]()[_0x380c40(0x1ab)]:this[_0x380c40(0x75)]()[_0x380c40(0x1ab)];if(_0x153d35['match'](AIManager[_0x380c40(0x105)][_0x380c40(0x8b)]))return eval(RegExp['$1']);}return VisuMZ[_0x380c40(0x15f)][_0x380c40(0x1cd)]['Weight']['PdrTgrRate']??1.25;},Game_Battler[_0x26cdfb(0x1c1)]['doesAIApplyMdrTgrInfluence']=function(){const _0x540088=_0x26cdfb;if(this[_0x540088(0x93)]()||this[_0x540088(0x111)]()){const _0x3b0480=this[_0x540088(0x93)]()?this[_0x540088(0xd7)]()[_0x540088(0x1ab)]:this[_0x540088(0x75)]()[_0x540088(0x1ab)];if(_0x3b0480[_0x540088(0xf7)](AIManager[_0x540088(0x105)][_0x540088(0x1c0)]))return![];else{if(_0x3b0480['match'](AIManager[_0x540088(0x105)][_0x540088(0xe4)]))return this[_0x540088(0xac)]()>0x0;}}return VisuMZ[_0x540088(0x15f)][_0x540088(0x1cd)]['Weight'][_0x540088(0x1c5)]??!![];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0xac)]=function(){const _0x4962c6=_0x26cdfb;if(this['isActor']()||this[_0x4962c6(0x111)]()){const _0x588ada=this[_0x4962c6(0x93)]()?this['actor']()[_0x4962c6(0x1ab)]:this[_0x4962c6(0x75)]()[_0x4962c6(0x1ab)];if(_0x588ada[_0x4962c6(0xf7)](AIManager['_regexp']['aiMdrTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x4962c6(0x15f)]['Settings'][_0x4962c6(0xf8)]['MdrTgrRate']??1.5;},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x13f)]=function(){const _0x2360d0=_0x26cdfb,_0x53553b=VisuMZ['BattleAI']['Settings'][_0x2360d0(0x16e)];if(this[_0x2360d0(0x93)]()||this[_0x2360d0(0x111)]()){const _0xd93e6d=this[_0x2360d0(0x93)]()?this[_0x2360d0(0xd7)]()[_0x2360d0(0x1ab)]:this[_0x2360d0(0x75)]()[_0x2360d0(0x1ab)];if(_0xd93e6d[_0x2360d0(0xf7)](AIManager[_0x2360d0(0x105)]['aiLevel']))return Number(RegExp['$1'])[_0x2360d0(0x198)](0x0,0x64);else{if(this[_0x2360d0(0x93)]())return _0x53553b[_0x2360d0(0xde)];else{if(this[_0x2360d0(0x111)]())return _0x53553b[_0x2360d0(0xc3)];}}}return _0x53553b[_0x2360d0(0xc3)];},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x103)]=function(_0x4fe42d,_0x5679eb,_0xa02b86){const _0x14efc3=_0x26cdfb,_0x26fa1c=this[_0x14efc3(0x146)]();if(_0x4fe42d&&_0x4fe42d[_0x14efc3(0xa9)]>0x0)for(const _0x761290 of _0x4fe42d){_0x26fa1c[_0x14efc3(0xea)](_0x761290,this);}_0x5679eb&&_0x26fa1c[_0x14efc3(0xa3)]('evaRates',this),_0xa02b86&&_0x26fa1c[_0x14efc3(0xa3)](_0x14efc3(0x106),this);},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0xee)]=function(_0x5b11fc){const _0x24186a=_0x26cdfb,_0x2d57b3=this[_0x24186a(0x146)]();return _0x2d57b3[_0x24186a(0xee)](_0x5b11fc,this);},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x178)]=function(){const _0x566317=_0x26cdfb,_0x505f66=VisuMZ[_0x566317(0x15f)][_0x566317(0x1cd)][_0x566317(0x16e)];if(this[_0x566317(0x93)]()||this['isEnemy']()){const _0x584442=this[_0x566317(0x93)]()?this['actor']()[_0x566317(0x1ab)]:this[_0x566317(0x75)]()[_0x566317(0x1ab)];if(_0x584442[_0x566317(0xf7)](AIManager[_0x566317(0x105)][_0x566317(0x178)]))return Number(RegExp['$1'])[_0x566317(0x198)](0x0,0x9);else{if(this[_0x566317(0x93)]())return _0x505f66[_0x566317(0x179)][_0x566317(0x198)](0x0,0x9);else{if(this[_0x566317(0x111)]())return _0x505f66['EnemyRatingVariance'][_0x566317(0x198)](0x0,0x9);}}}return _0x505f66[_0x566317(0xc7)][_0x566317(0x198)](0x0,0x9);},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x13c)]=Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x171)],Game_Battler['prototype']['turnCount']=function(){const _0x43db04=_0x26cdfb;if(BattleManager[_0x43db04(0x1d2)]())return VisuMZ['BattleAI']['Game_Battler_turnCount'][_0x43db04(0x165)](this);if(VisuMZ[_0x43db04(0x15f)][_0x43db04(0x1cd)][_0x43db04(0x16e)][_0x43db04(0x176)]){if(this[_0x43db04(0x173)]())return VisuMZ[_0x43db04(0x15f)][_0x43db04(0x13c)][_0x43db04(0x165)](this);return $gameTroop[_0x43db04(0x171)]();}else return VisuMZ['BattleAI'][_0x43db04(0x13c)]['call'](this);},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x173)]=function(){const _0x181ead=_0x26cdfb;if(Imported[_0x181ead(0x99)]&&BattleManager[_0x181ead(0xe1)]()){if(VisuMZ['BattleSystemFTB'][_0x181ead(0xa7)]<1.11){let _0x405f68='';_0x405f68+=_0x181ead(0xc1),_0x405f68+=_0x181ead(0x143),alert(_0x405f68),SceneManager[_0x181ead(0xcd)]();}return!![];}else{if(Imported[_0x181ead(0x107)]&&BattleManager[_0x181ead(0xe1)]()){if(VisuMZ['BattleSystemETB']['version']<1.08){let _0x45065c='';_0x45065c+=_0x181ead(0x132),_0x45065c+=_0x181ead(0x143),alert(_0x45065c),SceneManager['exit']();}return!![];}else{if(Imported[_0x181ead(0xe3)]&&BattleManager[_0x181ead(0xe1)]()){if(VisuMZ[_0x181ead(0x1c2)]['version']<1.08){let _0x4c964c='';_0x4c964c+=_0x181ead(0x1ad),_0x4c964c+=_0x181ead(0x143),alert(_0x4c964c),SceneManager[_0x181ead(0xcd)]();}return!![];}}}return![];},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0xaf)]=function(){const _0x39b12b=_0x26cdfb;if(this['isConfused']())return![];return this[_0x39b12b(0x1a5)]()&&this['referenceEnemyForAI']();},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x10a)]=function(){const _0xb95ad3=_0x26cdfb,_0x30c8b5=this['currentClass']()[_0xb95ad3(0x1ab)];if(_0x30c8b5[_0xb95ad3(0xf7)](/<NO REFERENCE AI>/i))return null;else{if(_0x30c8b5[_0xb95ad3(0xf7)](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x30c8b5[_0xb95ad3(0xf7)](/<REFERENCE AI: (.*)>/i))return $dataEnemies[DataManager[_0xb95ad3(0xb8)](String(RegExp['$1']))];}}return $dataEnemies[VisuMZ[_0xb95ad3(0x15f)][_0xb95ad3(0x1cd)]['General']['ActorAIReference']];},Game_Actor[_0x26cdfb(0x1c1)]['aiStyle']=function(){const _0x390936=_0x26cdfb,_0x4ab8ac=this[_0x390936(0x1ca)]()['note'];if(_0x4ab8ac['match'](AIManager[_0x390936(0x105)][_0x390936(0x1a7)]))return String(RegExp['$1'])[_0x390936(0xe2)]()['trim']();return VisuMZ['BattleAI'][_0x390936(0x1cd)][_0x390936(0x16e)][_0x390936(0x6f)];},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x94)]=function(){const _0x2df283=_0x26cdfb;Game_Battler[_0x2df283(0x1c1)]['determineNewValidAIAction'][_0x2df283(0x165)](this),this[_0x2df283(0xb7)]();},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0xb3)]=Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0xb7)],Game_Actor['prototype'][_0x26cdfb(0xb7)]=function(){const _0x56e9da=_0x26cdfb;this[_0x56e9da(0xaf)]()?this[_0x56e9da(0x1b8)]():VisuMZ['BattleAI'][_0x56e9da(0xb3)][_0x56e9da(0x165)](this);},Game_Actor[_0x26cdfb(0x1c1)]['makeAutoBattleActionsWithEnemyAI']=function(){const _0x2648b6=_0x26cdfb;if(this[_0x2648b6(0x9b)]()>0x0){const _0x261f41=this[_0x2648b6(0x101)]();if(this[_0x2648b6(0x1ac)]())_0x261f41[_0x2648b6(0xd6)]($dataSkills[this['attackSkillId']()]);if(this[_0x2648b6(0x1b3)]())_0x261f41['push']($dataSkills[this[_0x2648b6(0xda)]()]);const _0x45013f=this[_0x2648b6(0x10a)](),_0x2eeedd=JsonEx[_0x2648b6(0x19d)](_0x45013f[_0x2648b6(0xff)]);for(const _0x2705cf of _0x2eeedd){if(_0x2705cf['skillId']===0x1)_0x2705cf['skillId']=this[_0x2648b6(0x8c)]();if(_0x2705cf[_0x2648b6(0xf1)]===0x2)_0x2705cf[_0x2648b6(0xf1)]=this['guardSkillId']();}const _0x18e420=_0x2eeedd[_0x2648b6(0xa6)](_0x11877f=>this['isActionValid'](_0x11877f)&&_0x261f41['includes']($dataSkills[_0x11877f[_0x2648b6(0xf1)]]));if(_0x18e420[_0x2648b6(0xa9)]>0x0){this['selectAllActions'](_0x18e420);return;}}VisuMZ[_0x2648b6(0x15f)][_0x2648b6(0xb3)][_0x2648b6(0x165)](this);},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x100)]=function(_0xaa0342){const _0x1ab292=_0x26cdfb;return Game_Enemy['prototype'][_0x1ab292(0x100)][_0x1ab292(0x165)](this,_0xaa0342);},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x102)]=function(_0x198524,_0x3ac724){const _0x30112d=_0x26cdfb;return Game_Enemy['prototype'][_0x30112d(0x102)][_0x30112d(0x165)](this,_0x198524,_0x3ac724);},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x11b)]=function(_0x46b7ac,_0x52ca03){const _0x3b1cda=_0x26cdfb;return Game_Enemy['prototype']['meetsHpCondition'][_0x3b1cda(0x165)](this,_0x46b7ac,_0x52ca03);},Game_Actor['prototype'][_0x26cdfb(0x191)]=function(_0x4d6631,_0x5751ac){const _0x383a32=_0x26cdfb;return Game_Enemy[_0x383a32(0x1c1)][_0x383a32(0x191)][_0x383a32(0x165)](this,_0x4d6631,_0x5751ac);},Game_Actor[_0x26cdfb(0x1c1)]['meetsStateCondition']=function(_0x1411d7){const _0x187015=_0x26cdfb;return Game_Enemy[_0x187015(0x1c1)][_0x187015(0x1b0)]['call'](this,_0x1411d7);},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x18b)]=function(_0x34570a){const _0x40147c=_0x26cdfb;return Game_Enemy[_0x40147c(0x1c1)][_0x40147c(0x18b)][_0x40147c(0x165)](this,_0x34570a);},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x1b5)]=function(_0x251243){const _0x319325=_0x26cdfb;return Game_Enemy[_0x319325(0x1c1)][_0x319325(0x1b5)][_0x319325(0x165)](this,_0x251243);},Game_Enemy[_0x26cdfb(0x1c1)][_0x26cdfb(0x1a7)]=function(){const _0x461ff2=_0x26cdfb,_0x51d0da=this['enemy']()[_0x461ff2(0x1ab)];if(_0x51d0da[_0x461ff2(0xf7)](AIManager[_0x461ff2(0x105)][_0x461ff2(0x1a7)]))return String(RegExp['$1'])[_0x461ff2(0xe2)]()[_0x461ff2(0x16a)]();return VisuMZ[_0x461ff2(0x15f)][_0x461ff2(0x1cd)][_0x461ff2(0x16e)]['EnemyStyleAI'];},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x18c)]=Game_Enemy[_0x26cdfb(0x1c1)]['isActionValid'],Game_Enemy[_0x26cdfb(0x1c1)][_0x26cdfb(0x9a)]=function(_0x35bb39){const _0xc1ae59=_0x26cdfb;if(!VisuMZ['BattleAI']['Game_Enemy_isActionValid'][_0xc1ae59(0x165)](this,_0x35bb39))return![];if(this[_0xc1ae59(0x1a7)]()==='random')return!![];return AIManager['hasValidTargets'](this,$dataSkills[_0x35bb39[_0xc1ae59(0xf1)]]);},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0x9a)]=function(_0x4860d5){const _0x2e8d91=_0x26cdfb;return Game_Enemy[_0x2e8d91(0x1c1)][_0x2e8d91(0x9a)]['call'](this,_0x4860d5);},Game_Enemy[_0x26cdfb(0x1c1)][_0x26cdfb(0xf5)]=function(_0x5ab3f1,_0x7f5797){const _0x4fb0aa=_0x26cdfb,_0x1ed243=_0x5ab3f1[_0x4fb0aa(0x145)]((_0x138881,_0x34dd70)=>_0x138881+_0x34dd70[_0x4fb0aa(0x170)]-_0x7f5797,0x0);if(_0x1ed243>=0x0){let _0xb046c8=Math['randomInt'](_0x1ed243);for(const _0x2aa95c of _0x5ab3f1){_0xb046c8-=_0x2aa95c[_0x4fb0aa(0x170)]-_0x7f5797;if(_0xb046c8<=0x0)return this[_0x4fb0aa(0x1b2)]&&this[_0x4fb0aa(0x1b2)](_0x2aa95c),_0x2aa95c;}}else return null;},Game_Actor[_0x26cdfb(0x1c1)][_0x26cdfb(0xf5)]=function(_0x4c8f00,_0x1f4e47){const _0xe5138=_0x26cdfb;return Game_Enemy['prototype']['selectAction'][_0xe5138(0x165)](this,_0x4c8f00,_0x1f4e47);},Game_Enemy['prototype'][_0x26cdfb(0x7f)]=function(_0x22c2ec){const _0x2d3705=_0x26cdfb,_0x36b1fb=String(this[_0x2d3705(0x1a7)]())[_0x2d3705(0xe2)]()['trim']();if(['random',_0x2d3705(0x19a)]['includes'](_0x36b1fb))this[_0x2d3705(0x13b)](_0x22c2ec);else _0x36b1fb===_0x2d3705(0x91)?this['selectAllActionsGambit'](_0x22c2ec):this['selectAllActionsClassic'](_0x22c2ec);},Game_Actor['prototype'][_0x26cdfb(0x7f)]=function(_0x442a86){const _0x854e25=_0x26cdfb;Game_Enemy[_0x854e25(0x1c1)][_0x854e25(0x7f)]['call'](this,_0x442a86);},Game_Battler['prototype']['selectAllActionsClassic']=function(_0x3d5890){const _0x479db6=_0x26cdfb,_0x392b06=Math[_0x479db6(0xfe)](..._0x3d5890[_0x479db6(0x17f)](_0x211c30=>_0x211c30[_0x479db6(0x170)])),_0x485bb8=_0x392b06-this[_0x479db6(0x178)](),_0x2856c5=this[_0x479db6(0x9b)]();_0x3d5890=_0x3d5890[_0x479db6(0xa6)](_0xf7bd59=>_0xf7bd59[_0x479db6(0x170)]>=_0x485bb8);for(let _0x367ead=0x0;_0x367ead<_0x2856c5;_0x367ead++){_0x3d5890=VisuMZ[_0x479db6(0x15f)][_0x479db6(0x87)](_0x3d5890);const _0x5ae62f=this[_0x479db6(0xf5)](_0x3d5890,_0x485bb8);this[_0x479db6(0x1be)](_0x367ead)[_0x479db6(0x15a)](_0x5ae62f);}},VisuMZ[_0x26cdfb(0x15f)]['ShuffleArray']=function(_0x18714d){const _0x40bc7c=_0x26cdfb;var _0x353bcf,_0x118308,_0x17670a;for(_0x17670a=_0x18714d[_0x40bc7c(0xa9)]-0x1;_0x17670a>0x0;_0x17670a--){_0x353bcf=Math['floor'](Math['random']()*(_0x17670a+0x1)),_0x118308=_0x18714d[_0x17670a],_0x18714d[_0x17670a]=_0x18714d[_0x353bcf],_0x18714d[_0x353bcf]=_0x118308;}return _0x18714d;},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x19c)]=function(_0x174b8b){const _0x326f74=_0x26cdfb;for(let _0x41ba59=0x0;_0x41ba59<this[_0x326f74(0x9b)]();_0x41ba59++){const _0x3c3764=_0x174b8b[0x0];this[_0x326f74(0x1be)](_0x41ba59)[_0x326f74(0x15a)](_0x3c3764);}},Game_Battler[_0x26cdfb(0x1c1)][_0x26cdfb(0x13b)]=function(_0x1c542d){const _0x471130=_0x26cdfb;for(let _0x5748b0=0x0;_0x5748b0<this[_0x471130(0x9b)]();_0x5748b0++){const _0xf5e9c9=_0x1c542d[Math['randomInt'](_0x1c542d[_0x471130(0xa9)])];this[_0x471130(0x1be)](_0x5748b0)[_0x471130(0x15a)](_0xf5e9c9);}},Game_Enemy[_0x26cdfb(0x1c1)][_0x26cdfb(0x94)]=function(){const _0x301bcc=_0x26cdfb;Game_Battler[_0x301bcc(0x1c1)][_0x301bcc(0x94)][_0x301bcc(0x165)](this);if(this[_0x301bcc(0x9b)]()>0x0){const _0x5c57a1=this[_0x301bcc(0x75)]()['actions'][_0x301bcc(0xa6)](_0x3dbbef=>this['isActionValid'](_0x3dbbef));_0x5c57a1['length']>0x0?this[_0x301bcc(0x7f)](_0x5c57a1):this['clearActions']();}},VisuMZ[_0x26cdfb(0x15f)]['Game_Unit_initialize']=Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0x1b7)],Game_Unit['prototype'][_0x26cdfb(0x1b7)]=function(){const _0x4ba7f1=_0x26cdfb;VisuMZ[_0x4ba7f1(0x15f)][_0x4ba7f1(0x14b)][_0x4ba7f1(0x165)](this),this['initBattleAI']();},Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0xe9)]=function(){const _0xf645e0=_0x26cdfb;this[_0xf645e0(0xf3)]=![],this[_0xf645e0(0xd5)]();},VisuMZ[_0x26cdfb(0x15f)][_0x26cdfb(0x1d8)]=Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0xdb)],Game_Unit['prototype'][_0x26cdfb(0xdb)]=function(){const _0x27b0bf=_0x26cdfb;let _0x1b2af2=VisuMZ[_0x27b0bf(0x15f)][_0x27b0bf(0x1d8)][_0x27b0bf(0x165)](this);if(this[_0x27b0bf(0xf3)]){const _0x21fec5=AIManager[_0x27b0bf(0x81)]();_0x1b2af2=_0x1b2af2['filter'](_0x150fc6=>_0x21fec5[_0x27b0bf(0x1d6)](_0x150fc6));}return _0x1b2af2;},VisuMZ[_0x26cdfb(0x15f)]['Game_Unit_randomTarget']=Game_Unit['prototype']['randomTarget'],Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0xb1)]=function(){const _0x1858f1=_0x26cdfb;AIManager[_0x1858f1(0x1d3)]()&&(this[_0x1858f1(0xf3)]=!![]);const _0x1b4acc=VisuMZ['BattleAI'][_0x1858f1(0x19e)]['call'](this);return this[_0x1858f1(0xf3)]=![],_0x1b4acc;},Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0xd5)]=function(){this['_aiKnowledge']={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit['prototype']['aiKnowledge']=function(){const _0xf71f2a=_0x26cdfb;if(this['_aiKnowledge']===undefined)this[_0xf71f2a(0xd5)]();return this['_aiKnowledge'];},Game_Unit[_0x26cdfb(0x1c1)]['addXParamAIKnowledge']=function(_0x7022f0,_0x174c68){const _0x540a9a=_0x26cdfb;this[_0x540a9a(0x17e)]()[_0x7022f0]=this[_0x540a9a(0x17e)]()[_0x7022f0]||[];const _0xb3d7e6=_0x174c68['isActor']()?_0x174c68[_0x540a9a(0x19f)]():_0x174c68['enemyId']();!this['aiKnowledge']()[_0x7022f0]['includes'](_0xb3d7e6)&&this[_0x540a9a(0x17e)]()[_0x7022f0][_0x540a9a(0xd6)](_0xb3d7e6);},Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0xee)]=function(_0x8254d0,_0x200605){const _0x38b23b=_0x26cdfb;if(!VisuMZ[_0x38b23b(0x15f)][_0x38b23b(0x1cd)][_0x38b23b(0x16e)][_0x38b23b(0x9e)])return!![];const _0x3a35d7=_0x8254d0['match'](/EVA/i)?_0x38b23b(0x160):'mevRates';this[_0x38b23b(0x17e)]()[_0x3a35d7]=this['aiKnowledge']()[_0x3a35d7]||[];const _0x15616e=_0x200605[_0x38b23b(0x93)]()?_0x200605['actorId']():_0x200605[_0x38b23b(0x7b)]();return this[_0x38b23b(0x17e)]()[_0x3a35d7]['includes'](_0x15616e);},Game_Unit[_0x26cdfb(0x1c1)]['addElementAIKnowledge']=function(_0x131866,_0x57e437){const _0x11722a=_0x26cdfb;this[_0x11722a(0x17e)]()[_0x11722a(0x122)]=this[_0x11722a(0x17e)]()[_0x11722a(0x122)]||{};const _0x5116be=this[_0x11722a(0x17e)]()[_0x11722a(0x122)];_0x5116be[_0x131866]=_0x5116be[_0x131866]||[];const _0x1aefad=_0x57e437[_0x11722a(0x93)]()?_0x57e437[_0x11722a(0x19f)]():_0x57e437[_0x11722a(0x7b)]();!_0x5116be[_0x131866][_0x11722a(0x1d6)](_0x1aefad)&&_0x5116be[_0x131866][_0x11722a(0xd6)](_0x1aefad);},Game_Unit[_0x26cdfb(0x1c1)][_0x26cdfb(0x1a9)]=function(_0x2b6c95,_0x3313cd){const _0x22171d=_0x26cdfb;if(!VisuMZ['BattleAI'][_0x22171d(0x1cd)]['General'][_0x22171d(0x9e)])return!![];this[_0x22171d(0x17e)]()[_0x22171d(0x122)]=this[_0x22171d(0x17e)]()['elementRates']||{};const _0x32724f=this['aiKnowledge']()['elementRates'];_0x32724f[_0x2b6c95]=_0x32724f[_0x2b6c95]||[];const _0x305fd8=_0x3313cd[_0x22171d(0x93)]()?_0x3313cd[_0x22171d(0x19f)]():_0x3313cd[_0x22171d(0x7b)]();return _0x32724f[_0x2b6c95][_0x22171d(0x1d6)](_0x305fd8);},VisuMZ['BattleAI'][_0x26cdfb(0x1cc)]=Game_Troop[_0x26cdfb(0x1c1)]['setup'],Game_Troop[_0x26cdfb(0x1c1)][_0x26cdfb(0x167)]=function(_0x2bbe96){const _0x22d384=_0x26cdfb;VisuMZ['BattleAI'][_0x22d384(0x1cc)][_0x22d384(0x165)](this,_0x2bbe96),this[_0x22d384(0xd5)]();};