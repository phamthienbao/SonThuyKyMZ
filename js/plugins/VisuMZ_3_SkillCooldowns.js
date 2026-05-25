//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Actor-Related Script Calls ===
 * 
 * ---
 *
 * $actorGetSkillCooldown(actorID, skillID)
 * 
 * - Gets the target actor's cooldown turns for a specific skill.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $actorGetSkillCooldown(1, 172)
 *   $actorGetSkillCooldown(7, 52)
 *
 * ---
 *
 * $actorSetSkillCooldown(actorID, skillID, turns)
 * 
 * - Sets the target actor's cooldown turns for a specific skill to a value.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' with a number representing the number of turns to set the
 *   target skill's cooldown to.
 * 
 *   Example:
 * 
 *   $actorSetSkillCooldown(1, 172, 5)
 *   $actorSetSkillCooldown(7, 52, 10)
 *
 * ---
 *
 * $actorGetSkillWarmup(actorID, skillID)
 * 
 * - Gets the target actor's warmup turns for a specific skill.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $actorGetSkillWarmup(1, 172)
 *   $actorGetSkillWarmup(7, 52)
 *
 * ---
 *
 * $actorSetSkillWarmup(actorID, skillID, turns)
 * 
 * - Sets the target actor's warmup turns for a specific skill to a value.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' warmup a number representing the number of turns to set
 *   the target skill's warmup to.
 * 
 *   Example:
 * 
 *   $actorSetSkillWarmup(1, 172, 5)
 *   $actorSetSkillWarmup(7, 52, 10)
 *
 * ---
 * 
 * === Enemy-Related Script Calls ===
 * 
 * ---
 *
 * $enemyGetSkillCooldown(enemyIndex, skillID)
 * 
 * - Gets the target enemy's cooldown turns for a specific skill.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $enemyGetSkillCooldown(0, 172)
 *   $enemyGetSkillCooldown(7, 52)
 *
 * ---
 *
 * $enemySetSkillCooldown(enemyIndex, skillID, turns)
 * 
 * - Sets the target enemy's cooldown turns for a specific skill to a value.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' with a number representing the number of turns to set the
 *   target skill's cooldown to.
 * 
 *   Example:
 * 
 *   $enemySetSkillCooldown(0, 172, 5)
 *   $enemySetSkillCooldown(7, 52, 10)
 *
 * ---
 *
 * $enemyGetSkillWarmup(enemyIndex, skillID)
 * 
 * - Gets the target enemy's warmup turns for a specific skill.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $enemyGetSkillWarmup(0, 172)
 *   $enemyGetSkillWarmup(7, 52)
 *
 * ---
 *
 * $enemySetSkillWarmup(enemyIndex, skillID, turns)
 * 
 * - Sets the target enemy's warmup turns for a specific skill to a value.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' warmup a number representing the number of turns to set
 *   the target skill's warmup to.
 * 
 *   Example:
 * 
 *   $enemySetSkillWarmup(0, 172, 5)
 *   $enemySetSkillWarmup(7, 52, 10)
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
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.06: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where Battle System - OTB causes consistency issues with
 *    warmup turns. Fixed by Olivia.
 * 
 * Version 1.05: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the warmup turns do not properly reflect for certain
 *    types of battle systems. Fixed by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New script calls added by Arisu:
 * *** $actorGetSkillCooldown
 * *** $actorSetSkillCooldown
 * *** $actorGetSkillWarmup
 * *** $actorSetSkillWarmup
 * *** $enemyGetSkillCooldown
 * *** $enemySetSkillCooldown
 * *** $enemyGetSkillWarmup
 * *** $enemySetSkillWarmup
 * **** Please refer to the help file on how to use these script calls.
 * 
 * Version 1.04: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Cooldowns> should now be working properly.
 * 
 * Version 1.02: November 8, 2020
 * * Feature Update!
 * ** Cooldown updating has been changed from the start of an action to the
 *    start of a new turn processing for battlers to ensure accuracy.
 *    Update by Arisu.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x165650=_0x22fc;(function(_0x25cde3,_0xb67d9c){const _0x3f1e24=_0x22fc,_0x173f7f=_0x25cde3();while(!![]){try{const _0x40d9e3=parseInt(_0x3f1e24(0x1e4))/0x1*(-parseInt(_0x3f1e24(0x219))/0x2)+parseInt(_0x3f1e24(0x1bc))/0x3+parseInt(_0x3f1e24(0x220))/0x4+parseInt(_0x3f1e24(0x21c))/0x5*(parseInt(_0x3f1e24(0x1fe))/0x6)+-parseInt(_0x3f1e24(0x19e))/0x7+-parseInt(_0x3f1e24(0x1ee))/0x8*(-parseInt(_0x3f1e24(0x204))/0x9)+-parseInt(_0x3f1e24(0x1d0))/0xa;if(_0x40d9e3===_0xb67d9c)break;else _0x173f7f['push'](_0x173f7f['shift']());}catch(_0x441fc6){_0x173f7f['push'](_0x173f7f['shift']());}}}(_0x4169,0x19dfa));function _0x4169(){const _0x49bcea=['Warmup','paySkillCooldown','addWarmup','applyCooldown','fGgoc','resetFontSettings','getSkillTypes','aiHGy','102375tyMmVJ','parameters','aHdZV','RegExp','pQlkR','SaZiZ','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','match','AoxRh','description','StKwL','Cooldown','<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','Step3','onCooldownUpdate','inBattle','Fwblb','applyChangeWarmupEffects','EnemyStypeCooldown','tVOzq','svQtf','TextFmt','applyCDWUnotetagsRate','OnUpdateJS','_skillCooldowns','applyChangeStypeCooldownEffects','CNibO','applyChangeGlobalCooldownEffects','trim','clearCooldowns','471915eBPpZn','STRUCT','WAIT','onWarmupReadyJS','QrpbI','ZJTus','EeHLZ','getSkillIdWithName','EnemySkillCooldown','addCooldown','onWarmupReady','applyStypeCooldowns','Game_Battler_onBattleEnd','applyItemUserEffect','wyIRM','Game_BattlerBase_initMembers','COOLDOWN','initMembers','name','VisuMZ_1_MessageCore','3201220pjASMI','traitObjects','LzOvP','soPjV','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','onCooldownUpdateJS','omxCd','Nkudy','ActorSkillCooldown','Game_Battler_onBattleStart','replace','XOsyf','areSkillCooldownsReady','ARRAYFUNC','Parse_Notetags_Skill_JS','iVpeB','filter','notetag4','vRwAj','skills','1YFkMJV','UJUQT','Stype_%1_%2_%3','ARRAYNUM','Show','BQWfa','getChainBattleSettings','_instantCast','xFjOD','GxbCy','1567824qrPuPP','parse','\x5cFS[%1]','PiSjY','(\x5cd+)([%％])','guardSkillId','note','cooldown','onCooldownReady','skillTypes','Game_BattlerBase_paySkillCost','iWrNK','PXMch','notetag2','applyGlobalCooldowns','FJFbB','750666TTpGlg','return\x200','drawSkillCost','applyCDWUmodifiers','wmaZF','cooldownJS','9yFWfZe','toUpperCase','reduce','version','includes','status','item','FUinb','isBypassWarmups','UkqsJ','SkillsStatesCore','max','iwWsd','onBattleStart','Game_Action_applyItemUserEffect','\x5cI[%1]','ActorGlobalCooldown','zPEhd','rawWarmup','_subject','STR','383884IlErhX','Rdztd','Step4','5dndFRZ','format','gjzSV','onWarmupUpdate','617092DGTKTP','\x5cHexColor<%1>','drawSkillCooldown','_skillWarmups','CrpFR','JaqYk','drawTextEx','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','updateWarmups','AKNBH','prepareUpdateSkillCooldowns','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Step2','<SKILL\x20%1\x20%2\x20%3:[\x20]%4>','setWarmup','jVNMa','applyCDWUnotetagsFlat','FontColor','isBypassCooldowns','applyClearCooldownEffects','applyChangeGlobalWarmupEffects','actor','VisuMZ_2_BattleSystemOTB','ceil','initSkillCooldowns','onTurnEnd','SkillCooldowns','ConvertParams','pVJPr','notetag3','ZtGUV','iRGog','<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>','MaxTurns','notetag1','warmup','ARRAYEVAL','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getStypeIdWithName','KzkvF','ARRAYJSON','fbEZh','cSkko','Step1','areSkillWarmupsReady','iUhYi','VisuMZ_SkillsStatesCore_Parse_Notetags_Skill_JS','applyChangeStypeWarmupEffects','FUNC','prototype','LKWRi','clamp','clearWarmups','EVAL','onCooldownReadyJS','onBattleEnd','subject','Settings','drawSkillWarmup','turnCount','meetsSkillConditions','registerCommand','wBNxD','orlHI','(\x5cd+\x5c.?\x5cd+)','tMxLy','width','Game_BattlerBase_meetsSkillConditions','applyChangeCooldownEffects','BattleManager_processTurn','mdaZz','map','vBLpv','OperateValues','JSON','applyWarmup','rxxQR','mveXI','applySkillCooldownEffects','VxSLs','Yxwoz','setCooldown','vKjNR','updateCooldowns','BbakU','textSizeEx','call','prepareSkillWarmups','applyMasteryEffectCooldownTurns','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','BEEGg','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_previousBattleChain','qviDD','alterPaySkillCooldownModifier','SEkyT','EoiCE','SvhqY','warmupJS','<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','ActorStypeCooldown','Game_Battler_onTurnEnd','ADgQx','WUWkJ','isOTB','onWarmupUpdateJS','exit','JCQgV','Icon','Window_Base_drawSkillCost','vNnsB','\x5cC[%1]','FontSize','_updatedSkillCooldowns','VisuMZ_3_SkillMastery','rAHGj','members','Preemptive','OnReadyJS'];_0x4169=function(){return _0x49bcea;};return _0x4169();}var label=_0x165650(0x23a),tier=tier||0x0,dependencies=['VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x165650(0x1e0)](function(_0x30d72b){const _0x166db5=_0x165650;return _0x30d72b[_0x166db5(0x209)]&&_0x30d72b['description'][_0x166db5(0x208)]('['+label+']');})[0x0];VisuMZ[label][_0x165650(0x259)]=VisuMZ[label][_0x165650(0x259)]||{},VisuMZ[_0x165650(0x23b)]=function(_0x27cc4e,_0x19555f){const _0x318086=_0x165650;for(const _0x25793c in _0x19555f){if(_0x25793c['match'](/(.*):(.*)/i)){const _0x15234a=String(RegExp['$1']),_0x4c479c=String(RegExp['$2'])[_0x318086(0x205)]()[_0x318086(0x1ba)]();let _0x261f78,_0x25af12,_0x52c640;switch(_0x4c479c){case'NUM':_0x261f78=_0x19555f[_0x25793c]!==''?Number(_0x19555f[_0x25793c]):0x0;break;case _0x318086(0x1e7):_0x25af12=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):[],_0x261f78=_0x25af12['map'](_0x3bef7c=>Number(_0x3bef7c));break;case _0x318086(0x255):_0x261f78=_0x19555f[_0x25793c]!==''?eval(_0x19555f[_0x25793c]):null;break;case _0x318086(0x244):_0x25af12=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):[],_0x261f78=_0x25af12[_0x318086(0x166)](_0x6c8e78=>eval(_0x6c8e78));break;case _0x318086(0x169):_0x261f78=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):'';break;case _0x318086(0x248):_0x25af12=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):[],_0x261f78=_0x25af12[_0x318086(0x166)](_0x422bfa=>JSON['parse'](_0x422bfa));break;case _0x318086(0x250):_0x261f78=_0x19555f[_0x25793c]!==''?new Function(JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c])):new Function(_0x318086(0x1ff));break;case _0x318086(0x1dd):_0x25af12=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):[],_0x261f78=_0x25af12[_0x318086(0x166)](_0x57ca30=>new Function(JSON['parse'](_0x57ca30)));break;case _0x318086(0x218):_0x261f78=_0x19555f[_0x25793c]!==''?String(_0x19555f[_0x25793c]):'';break;case'ARRAYSTR':_0x25af12=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):[],_0x261f78=_0x25af12[_0x318086(0x166)](_0x40d50e=>String(_0x40d50e));break;case _0x318086(0x1bd):_0x52c640=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):{},_0x261f78=VisuMZ[_0x318086(0x23b)]({},_0x52c640);break;case'ARRAYSTRUCT':_0x25af12=_0x19555f[_0x25793c]!==''?JSON[_0x318086(0x1ef)](_0x19555f[_0x25793c]):[],_0x261f78=_0x25af12[_0x318086(0x166)](_0x28269e=>VisuMZ[_0x318086(0x23b)]({},JSON[_0x318086(0x1ef)](_0x28269e)));break;default:continue;}_0x27cc4e[_0x15234a]=_0x261f78;}}return _0x27cc4e;},(_0x518bdd=>{const _0x258577=_0x165650,_0x1961ba=_0x518bdd[_0x258577(0x1ce)];for(const _0x2957b3 of dependencies){if(_0x258577(0x18d)===_0x258577(0x1e2)){const _0x441888=_0x579c28[_0x258577(0x23a)][_0x258577(0x259)][_0x258577(0x1a9)];let _0x5b43d3='';_0x5b43d3+=_0x258577(0x1f0)['format'](_0x441888[_0x258577(0x18f)]);const _0x2598ec=_0x441888[_0x258577(0x231)];_0x2598ec[_0x258577(0x1a5)](/#(.*)/i)&&_0x10ad3b[_0x258577(0x1cf)]?_0x5b43d3+=_0x258577(0x221)[_0x258577(0x21d)](_0x1f5003(_0x1bda95['$1'])):_0x5b43d3+='\x5cC[%1]'['format'](_0x2598ec);const _0x2d1b9d=_0x1cfe26[_0x258577(0x1f5)](_0x2cd98d['id']),_0xeecede=_0x441888[_0x258577(0x18b)]>0x0?_0x258577(0x213)['format'](_0x441888[_0x258577(0x18b)]):'';_0x5b43d3+=_0x441888[_0x258577(0x1b3)][_0x258577(0x21d)](_0x2d1b9d,_0xeecede);const _0x16ee55=this['textSizeEx'](_0x5b43d3,_0x2f766f,_0x19f640,_0xdc45ac),_0x458f2e=_0xa7b5b3+_0x407f14-_0x16ee55[_0x258577(0x161)];this['drawTextEx'](_0x5b43d3,_0x458f2e,_0x474f92,_0x482192),this[_0x258577(0x19b)]();}else{if(!Imported[_0x2957b3]){if(_0x258577(0x21a)===_0x258577(0x21a)){alert(_0x258577(0x22b)[_0x258577(0x21d)](_0x1961ba,_0x2957b3)),SceneManager[_0x258577(0x189)]();break;}else _0x346728[_0x258577(0x23a)][_0x258577(0x256)][_0x45f1c7]['call'](this,_0x41b70f);}}}const _0x5a4fcf=_0x518bdd[_0x258577(0x1a7)];if(_0x5a4fcf[_0x258577(0x1a5)](/\[Version[ ](.*?)\]/i)){const _0x243b93=Number(RegExp['$1']);_0x243b93!==VisuMZ[label][_0x258577(0x207)]&&(alert(_0x258577(0x245)[_0x258577(0x21d)](_0x1961ba,_0x243b93)),SceneManager[_0x258577(0x189)]());}if(_0x5a4fcf['match'](/\[Tier[ ](\d+)\]/i)){const _0x4d365f=Number(RegExp['$1']);_0x4d365f<tier?(alert(_0x258577(0x17a)[_0x258577(0x21d)](_0x1961ba,_0x4d365f,tier)),SceneManager[_0x258577(0x189)]()):tier=Math[_0x258577(0x20f)](_0x4d365f,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x518bdd[_0x258577(0x19f)]);})(pluginData),VisuMZ['OperateValues']=function(_0x2a6bcb,_0x31c1f6,_0x42ccf4){switch(_0x42ccf4){case'=':return _0x31c1f6;break;case'+':return _0x2a6bcb+_0x31c1f6;break;case'-':return _0x2a6bcb-_0x31c1f6;break;case'*':return _0x2a6bcb*_0x31c1f6;break;case'/':return _0x2a6bcb/_0x31c1f6;break;case'%':return _0x2a6bcb%_0x31c1f6;break;}return _0x2a6bcb;},PluginManager[_0x165650(0x25d)](pluginData['name'],_0x165650(0x1d8),_0x20e0a5=>{const _0x379f46=_0x165650;if(!$gameParty[_0x379f46(0x1ad)]())return;VisuMZ['ConvertParams'](_0x20e0a5,_0x20e0a5);const _0x556017=_0x20e0a5[_0x379f46(0x24b)],_0x435842=_0x20e0a5[_0x379f46(0x22c)],_0x2bc3a4=_0x20e0a5[_0x379f46(0x1ab)],_0x37cd16=_0x20e0a5[_0x379f46(0x21b)];for(const _0x17507b of _0x556017){const _0x58e945=$gameActors[_0x379f46(0x235)](_0x17507b);if(!_0x58e945)continue;for(const _0x5a8801 of _0x435842){let _0x2b6cf6=_0x58e945[_0x379f46(0x1f5)](_0x5a8801);_0x2b6cf6=VisuMZ[_0x379f46(0x168)](_0x2b6cf6,_0x37cd16,_0x2bc3a4),_0x58e945['setCooldown'](_0x5a8801,_0x2b6cf6);}}}),PluginManager[_0x165650(0x25d)](pluginData['name'],_0x165650(0x183),_0x256fd4=>{const _0x4d1538=_0x165650;if(!$gameParty[_0x4d1538(0x1ad)]())return;VisuMZ[_0x4d1538(0x23b)](_0x256fd4,_0x256fd4);const _0x413231=_0x256fd4[_0x4d1538(0x24b)],_0x406cd3=_0x256fd4['Step2'],_0x4c5b01=_0x256fd4[_0x4d1538(0x1ab)],_0x203b5=_0x256fd4[_0x4d1538(0x21b)];for(const _0x3056ef of _0x413231){if(_0x4d1538(0x18a)!=='JCQgV'){if(this[_0x4d1538(0x25b)]()<=0x1)return;_0x56e093=_0x225cbb||0x1;for(const _0x34b2e2 in this['_skillWarmups']){const _0x2c5f12=this[_0x4d1538(0x223)][_0x34b2e2]||0x0;this[_0x4d1538(0x223)][_0x34b2e2]-=_0x36e004;if(this[_0x4d1538(0x223)][_0x34b2e2]<=0x0){if(_0x2c5f12>0x0)this[_0x4d1538(0x1c6)](_0x34b2e2);delete this[_0x4d1538(0x223)][_0x34b2e2];}}}else{const _0xa00908=$gameActors[_0x4d1538(0x235)](_0x3056ef);if(!_0xa00908)continue;for(const _0x4dafc6 of _0x406cd3){for(const _0xac31b0 of _0xa00908[_0x4d1538(0x1e3)]()){if(_0x4d1538(0x16c)===_0x4d1538(0x16c)){if(!_0xac31b0)continue;if(!DataManager[_0x4d1538(0x19c)](_0xac31b0)['includes'](_0x4dafc6))continue;const _0x10afc3=_0xac31b0['id'];let _0x5a9cb2=_0xa00908[_0x4d1538(0x1f5)](_0x10afc3);_0x5a9cb2=VisuMZ[_0x4d1538(0x168)](_0x5a9cb2,_0x203b5,_0x4c5b01),_0xa00908[_0x4d1538(0x170)](_0x10afc3,_0x5a9cb2);}else _0x2caf2b[_0x4d1538(0x23a)]['Game_Action_applyItemUserEffect'][_0x4d1538(0x175)](this,_0x3a34c9),this[_0x4d1538(0x16d)](_0x42b128);}}}}}),PluginManager['registerCommand'](pluginData[_0x165650(0x1ce)],_0x165650(0x214),_0x30226b=>{const _0x28d8d6=_0x165650;if(!$gameParty[_0x28d8d6(0x1ad)]())return;VisuMZ['ConvertParams'](_0x30226b,_0x30226b);const _0x315815=_0x30226b[_0x28d8d6(0x24b)],_0x52c031=_0x30226b['Step2'],_0x5e4705=_0x30226b[_0x28d8d6(0x1ab)];for(const _0x50cf47 of _0x315815){const _0x7f2c4=$gameActors['actor'](_0x50cf47);if(!_0x7f2c4)continue;for(const _0x3a82d4 of _0x7f2c4[_0x28d8d6(0x1e3)]()){if(!_0x3a82d4)continue;const _0x195e87=_0x3a82d4['id'];let _0x325155=_0x7f2c4[_0x28d8d6(0x1f5)](_0x195e87);_0x325155=VisuMZ[_0x28d8d6(0x168)](_0x325155,_0x5e4705,_0x52c031),_0x7f2c4[_0x28d8d6(0x170)](_0x195e87,_0x325155);}}}),PluginManager[_0x165650(0x25d)](pluginData[_0x165650(0x1ce)],_0x165650(0x1c4),_0x3b6e05=>{const _0x348db5=_0x165650;if(!$gameParty[_0x348db5(0x1ad)]())return;VisuMZ[_0x348db5(0x23b)](_0x3b6e05,_0x3b6e05);const _0x40c3b3=_0x3b6e05[_0x348db5(0x24b)],_0x5141ba=_0x3b6e05[_0x348db5(0x22c)],_0x4d7a7c=_0x3b6e05['Step3'],_0x1b9fa7=_0x3b6e05[_0x348db5(0x21b)];for(const _0x5c840c of _0x40c3b3){const _0x4b4f67=$gameTroop[_0x348db5(0x193)]()[_0x5c840c];if(!_0x4b4f67)continue;for(const _0x4c6114 of _0x5141ba){let _0x3d67cb=_0x4b4f67['cooldown'](_0x4c6114);_0x3d67cb=VisuMZ['OperateValues'](_0x3d67cb,_0x1b9fa7,_0x4d7a7c),_0x4b4f67['setCooldown'](_0x4c6114,_0x3d67cb);}}}),PluginManager['registerCommand'](pluginData[_0x165650(0x1ce)],_0x165650(0x1b0),_0x2dd003=>{const _0x3d33ea=_0x165650;if(!$gameParty[_0x3d33ea(0x1ad)]())return;VisuMZ[_0x3d33ea(0x23b)](_0x2dd003,_0x2dd003);const _0x178824=_0x2dd003[_0x3d33ea(0x24b)],_0x3c1478=_0x2dd003[_0x3d33ea(0x22c)],_0x409a28=_0x2dd003[_0x3d33ea(0x1ab)],_0x3faed5=_0x2dd003[_0x3d33ea(0x21b)];for(const _0x5d486c of _0x178824){const _0x175dd9=$gameTroop['members']()[_0x5d486c];if(!_0x175dd9)continue;for(const _0x5f0e3c of _0x3c1478){for(const _0x3f49f9 of _0x175dd9[_0x3d33ea(0x1e3)]()){if(!_0x3f49f9)continue;if(!DataManager[_0x3d33ea(0x19c)](_0x3f49f9)['includes'](_0x5f0e3c))continue;const _0x548f1c=_0x3f49f9['id'];let _0x51c37e=_0x175dd9[_0x3d33ea(0x1f5)](_0x548f1c);_0x51c37e=VisuMZ[_0x3d33ea(0x168)](_0x51c37e,_0x3faed5,_0x409a28),_0x175dd9[_0x3d33ea(0x170)](_0x548f1c,_0x51c37e);}}}}),PluginManager['registerCommand'](pluginData[_0x165650(0x1ce)],'EnemyGlobalCooldown',_0x301454=>{const _0x3c791e=_0x165650;if(!$gameParty[_0x3c791e(0x1ad)]())return;VisuMZ[_0x3c791e(0x23b)](_0x301454,_0x301454);const _0x111e20=_0x301454[_0x3c791e(0x24b)],_0x13279f=_0x301454[_0x3c791e(0x22c)],_0x2b2eac=_0x301454['Step3'];for(const _0x35fe1f of _0x111e20){if(_0x3c791e(0x1d3)==='DlRTL'){if(_0x59df6c){const _0x2a60bc=_0x2b8aac[_0x3c791e(0x19c)](_0x3f5a3c);_0x2a60bc[_0x3c791e(0x208)](_0x323c03)&&this['subject']()[_0x3c791e(0x198)](_0x368d69['id'],_0x1b54f5);}}else{const _0xf45822=$gameTroop['members']()[_0x35fe1f];if(!_0xf45822)continue;for(const _0x1fd03b of _0xf45822[_0x3c791e(0x1e3)]()){if(!_0x1fd03b)continue;const _0x9b7bb0=_0x1fd03b['id'];let _0x280d6c=_0xf45822[_0x3c791e(0x1f5)](_0x9b7bb0);_0x280d6c=VisuMZ[_0x3c791e(0x168)](_0x280d6c,_0x2b2eac,_0x13279f),_0xf45822[_0x3c791e(0x170)](_0x9b7bb0,_0x280d6c);}}}}),VisuMZ[_0x165650(0x23a)][_0x165650(0x203)]={},VisuMZ[_0x165650(0x23a)]['warmupJS']={},VisuMZ[_0x165650(0x23a)][_0x165650(0x1d5)]={},VisuMZ[_0x165650(0x23a)][_0x165650(0x188)]={},VisuMZ[_0x165650(0x23a)][_0x165650(0x256)]={},VisuMZ['SkillCooldowns']['onWarmupReadyJS']={},VisuMZ['SkillCooldowns'][_0x165650(0x24e)]=VisuMZ[_0x165650(0x20e)][_0x165650(0x1de)],VisuMZ[_0x165650(0x20e)][_0x165650(0x1de)]=function(_0x3e5e35){const _0x15d7bf=_0x165650;VisuMZ['SkillCooldowns'][_0x15d7bf(0x24e)][_0x15d7bf(0x175)](this,_0x3e5e35);const _0x4958bb=_0x3e5e35[_0x15d7bf(0x1f4)],_0x561895=_0x15d7bf(0x1a4),_0x428ada=_0x15d7bf(0x1d4);if(_0x4958bb['match'](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){const _0x22e191=String(RegExp['$1']),_0xdd6e6d=_0x15d7bf(0x227)[_0x15d7bf(0x21d)](_0x22e191);VisuMZ['SkillCooldowns']['cooldownJS'][_0x3e5e35['id']]=new Function(_0xdd6e6d);}if(_0x4958bb[_0x15d7bf(0x1a5)](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){const _0x59ef63=String(RegExp['$1']),_0x1eb71c=_0x15d7bf(0x178)[_0x15d7bf(0x21d)](_0x59ef63);VisuMZ[_0x15d7bf(0x23a)]['warmupJS'][_0x3e5e35['id']]=new Function(_0x1eb71c);}if(_0x4958bb[_0x15d7bf(0x1a5)](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){const _0x359600=String(RegExp['$1']),_0x325f6f=_0x561895[_0x15d7bf(0x21d)](_0x359600);VisuMZ[_0x15d7bf(0x23a)][_0x15d7bf(0x1d5)][_0x3e5e35['id']]=new Function(_0x325f6f);}if(_0x4958bb[_0x15d7bf(0x1a5)](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){const _0x40d036=String(RegExp['$1']),_0x4a76d6=_0x428ada[_0x15d7bf(0x21d)](_0x40d036);VisuMZ[_0x15d7bf(0x23a)][_0x15d7bf(0x188)][_0x3e5e35['id']]=new Function(_0x4a76d6);}if(_0x4958bb[_0x15d7bf(0x1a5)](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){const _0x4e6b97=String(RegExp['$1']),_0x144ae0=_0x561895[_0x15d7bf(0x21d)](_0x4e6b97);VisuMZ[_0x15d7bf(0x23a)][_0x15d7bf(0x256)][_0x3e5e35['id']]=new Function(_0x144ae0);}if(_0x4958bb[_0x15d7bf(0x1a5)](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){if(_0x15d7bf(0x1e5)!=='UJUQT')_0x50e61a+=_0x15d7bf(0x18e)[_0x15d7bf(0x21d)](_0x831ceb);else{const _0x5ca433=String(RegExp['$1']),_0x32ad16=_0x428ada['format'](_0x5ca433);VisuMZ['SkillCooldowns'][_0x15d7bf(0x1bf)][_0x3e5e35['id']]=new Function(_0x32ad16);}}},VisuMZ['SkillCooldowns'][_0x165650(0x164)]=BattleManager['processTurn'],BattleManager['processTurn']=function(){const _0x48b1d9=_0x165650;if(this[_0x48b1d9(0x217)])this[_0x48b1d9(0x217)][_0x48b1d9(0x22a)]();VisuMZ[_0x48b1d9(0x23a)][_0x48b1d9(0x164)][_0x48b1d9(0x175)](this);},VisuMZ[_0x165650(0x23a)][_0x165650(0x212)]=Game_Action[_0x165650(0x251)][_0x165650(0x1c9)],Game_Action[_0x165650(0x251)][_0x165650(0x1c9)]=function(_0x273904){const _0x1f2931=_0x165650;VisuMZ[_0x1f2931(0x23a)][_0x1f2931(0x212)][_0x1f2931(0x175)](this,_0x273904),this[_0x1f2931(0x16d)](_0x273904);},Game_Action['prototype']['applySkillCooldownEffects']=function(_0x3f4ab8){const _0xc522cb=_0x165650;this[_0xc522cb(0x233)](_0x3f4ab8),this[_0xc522cb(0x163)](_0x3f4ab8),this[_0xc522cb(0x1b7)](_0x3f4ab8),this[_0xc522cb(0x1b9)](_0x3f4ab8),this[_0xc522cb(0x1af)](_0x3f4ab8),this['applyChangeStypeWarmupEffects'](_0x3f4ab8),this['applyChangeGlobalWarmupEffects'](_0x3f4ab8);},Game_Action[_0x165650(0x251)][_0x165650(0x233)]=function(_0x3af8ce){const _0x4f216e=_0x165650,_0x23d97f=this[_0x4f216e(0x20a)]()[_0x4f216e(0x1f4)];if(_0x23d97f[_0x4f216e(0x1a5)](/<CLEAR USER COOLDOWNS>/i)){if(_0x4f216e(0x1d6)===_0x4f216e(0x229)){var _0x34b66c=_0x48670f(_0x19004d['$1']);_0x8945ae*=_0x34b66c;}else this['subject']()[_0x4f216e(0x1bb)]();}_0x23d97f[_0x4f216e(0x1a5)](/<CLEAR TARGET COOLDOWNS>/i)&&_0x3af8ce['clearCooldowns']();if(_0x23d97f[_0x4f216e(0x1a5)](/<CLEAR USER WARMUPS>/i)){if(_0x4f216e(0x160)===_0x4f216e(0x20d)){if(!_0x26a69e['SkillCooldowns'][_0x4f216e(0x162)][_0x4f216e(0x175)](this,_0x553a4f))return![];if(!this[_0x4f216e(0x24c)](_0xda4ac6))return![];if(!this[_0x4f216e(0x1dc)](_0x4a6569))return![];return!![];}else this[_0x4f216e(0x258)]()[_0x4f216e(0x254)]();}_0x23d97f[_0x4f216e(0x1a5)](/<CLEAR TARGET WARMUPS>/i)&&_0x3af8ce[_0x4f216e(0x254)]();},Game_Action[_0x165650(0x251)][_0x165650(0x163)]=function(_0x21b596){const _0x251468=_0x165650,_0x379244=this[_0x251468(0x20a)]()['note'],_0x52af41=_0x379244['match'](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x52af41)for(const _0x3b66da of _0x52af41){if(_0x251468(0x247)!=='aCgGv'){let _0x547fd8=0x0,_0xe0024c=0x0;if(_0x3b66da['match'](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x251468(0x1fd)===_0x251468(0x1a2)?_0x260b4d&&this[_0x251468(0x199)](_0x4feb4e['id'],_0x3ad2db):(_0x547fd8=Number(RegExp['$1']),_0xe0024c=Number(RegExp['$2']));else{if(_0x3b66da[_0x251468(0x1a5)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x251468(0x186)!==_0x251468(0x186))return this['cooldown'](_0x36fbe7['id'])<=0x0;else _0x547fd8=DataManager['getSkillIdWithName'](RegExp['$1']),_0xe0024c=Number(RegExp['$2']);}}this[_0x251468(0x258)]()[_0x251468(0x1c5)](_0x547fd8,_0xe0024c);}else this[_0x251468(0x199)](_0x49ceeb['id'],_0x3d854d);}const _0x99b9b4=_0x379244['match'](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x99b9b4)for(const _0x5312c5 of _0x99b9b4){let _0x4cbc83=0x0,_0x21da43=0x0;if(_0x5312c5[_0x251468(0x1a5)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if('tVOzq'!==_0x251468(0x1b1)){if(this[_0x251468(0x217)])this['_subject'][_0x251468(0x22a)]();_0x359e89[_0x251468(0x23a)]['BattleManager_processTurn'][_0x251468(0x175)](this);}else _0x4cbc83=Number(RegExp['$1']),_0x21da43=Number(RegExp['$2']);}else{if(_0x5312c5[_0x251468(0x1a5)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if('qHZBA'===_0x251468(0x19a)){if(_0x7aff8){const _0x27951d=_0x47c03c[_0x251468(0x19c)](_0x1dcb2c);_0x27951d[_0x251468(0x208)](_0x439afd)&&this['subject']()[_0x251468(0x1c5)](_0x4cac7d['id'],_0xc3c11d);}}else _0x4cbc83=DataManager['getSkillIdWithName'](RegExp['$1']),_0x21da43=Number(RegExp['$2']);}}_0x21b596['addCooldown'](_0x4cbc83,_0x21da43);}},Game_Action[_0x165650(0x251)][_0x165650(0x1b7)]=function(_0xe3fe9d){const _0x5e7e9a=_0x165650,_0x4d4b5d=this[_0x5e7e9a(0x20a)]()[_0x5e7e9a(0x1f4)],_0x4981e1=_0x4d4b5d[_0x5e7e9a(0x1a5)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x4981e1)for(const _0x2a91a6 of _0x4981e1){if('VcHcB'==='VcHcB'){let _0x596abd=0x0,_0x1d7aed=0x0;if(_0x2a91a6['match'](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x596abd=Number(RegExp['$1']),_0x1d7aed=Number(RegExp['$2']);else{if(_0x2a91a6[_0x5e7e9a(0x1a5)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if('SNcoR'!==_0x5e7e9a(0x1b2))_0x596abd=DataManager['getSkillIdWithName'](RegExp['$1']),_0x1d7aed=Number(RegExp['$2']);else{var _0x5214a3=_0x274617(_0x24c5e6['$1']);_0x37dc42+=_0x5214a3;}}}for(const _0x2ce7a9 of this[_0x5e7e9a(0x258)]()['skills']()){if(_0x2ce7a9){if(_0x5e7e9a(0x17e)===_0x5e7e9a(0x15e)){const _0x2d435c=_0xac2005(_0x1db5ba['$1']),_0x16ec3b=_0x5bd7e6[_0x5e7e9a(0x21d)](_0x2d435c);_0x4ecfc7[_0x5e7e9a(0x23a)][_0x5e7e9a(0x1bf)][_0x471288['id']]=new _0x5a5df3(_0x16ec3b);}else{const _0x3c4e55=DataManager[_0x5e7e9a(0x19c)](_0x2ce7a9);if(_0x3c4e55[_0x5e7e9a(0x208)](_0x596abd)){if(_0x5e7e9a(0x1d7)!==_0x5e7e9a(0x1d7)){if(!_0x265d39['inBattle']())return;const _0x234678=_0x165704[_0x5e7e9a(0x23a)][_0x5e7e9a(0x259)][_0x5e7e9a(0x1a9)];if(_0x234678[_0x5e7e9a(0x1b5)])_0x234678[_0x5e7e9a(0x1b5)][_0x5e7e9a(0x175)](this,_0x228bd6);_0x33f628[_0x5e7e9a(0x23a)]['onCooldownUpdateJS'][_0x4285db]&&_0xecc794[_0x5e7e9a(0x23a)][_0x5e7e9a(0x1d5)][_0x2f849f]['call'](this,_0x50bb8e);}else this[_0x5e7e9a(0x258)]()[_0x5e7e9a(0x1c5)](_0x2ce7a9['id'],_0x1d7aed);}}}}}else{if(!_0x127664[_0x5e7e9a(0x1ad)]())return;const _0x33b3d9=_0x1c4404[_0x5e7e9a(0x23a)][_0x5e7e9a(0x259)][_0x5e7e9a(0x196)];if(_0x33b3d9[_0x5e7e9a(0x195)])_0x33b3d9[_0x5e7e9a(0x195)][_0x5e7e9a(0x175)](this,_0x346e4e);}}const _0x25bf3c=_0x4d4b5d[_0x5e7e9a(0x1a5)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x25bf3c){if('iwWsd'===_0x5e7e9a(0x210))for(const _0x220408 of _0x25bf3c){if(_0x5e7e9a(0x192)===_0x5e7e9a(0x192)){let _0x482b62=0x0,_0x2bbddc=0x0;if(_0x220408[_0x5e7e9a(0x1a5)](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5e7e9a(0x23f)!==_0x5e7e9a(0x1a0))_0x482b62=Number(RegExp['$1']),_0x2bbddc=Number(RegExp['$2']);else{let _0x498a74=0x0,_0x116d20=0x0;if(_0x41d15f[_0x5e7e9a(0x1a5)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x498a74=_0xc5dbe5(_0x19ba25['$1']),_0x116d20=_0x3a5b9d(_0x1820e6['$2']);else _0x116b10['match'](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x498a74=_0x16abdf[_0x5e7e9a(0x246)](_0x353e29['$1']),_0x116d20=_0xd713a(_0x1da8be['$2']));_0x116d20=this[_0x5e7e9a(0x17d)](_0x1a0389,_0x116d20),this[_0x5e7e9a(0x1c7)](_0x498a74,_0x116d20);}}else _0x220408[_0x5e7e9a(0x1a5)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x482b62=DataManager['getSkillIdWithName'](RegExp['$1']),_0x2bbddc=Number(RegExp['$2']));for(const _0x491b70 of _0xe3fe9d[_0x5e7e9a(0x1e3)]()){if(_0x491b70){const _0x5733d2=DataManager[_0x5e7e9a(0x19c)](_0x491b70);_0x5733d2[_0x5e7e9a(0x208)](_0x482b62)&&_0xe3fe9d[_0x5e7e9a(0x1c5)](_0x491b70['id'],_0x2bbddc);}}}else _0x38d98a[_0x5e7e9a(0x23a)]['Game_BattlerBase_initMembers'][_0x5e7e9a(0x175)](this),this[_0x5e7e9a(0x238)]();}else _0x28c790=_0x33b07b['getSkillIdWithName'](_0x3df9d2['$1']),_0x418aa7=_0x53c9a2(_0x178df2['$2']);}},Game_Action[_0x165650(0x251)][_0x165650(0x1b9)]=function(_0xeeedbe){const _0x5af248=_0x165650,_0xa26487=this[_0x5af248(0x20a)]()[_0x5af248(0x1f4)];if(_0xa26487['match'](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x5d2489=Number(RegExp['$1']);for(const _0x194b36 of this['subject']()[_0x5af248(0x1e3)]()){if(_0x5af248(0x1c2)===_0x5af248(0x249))_0xf2ffb2=this['applyCDWUmodifiers'](_0x9f2b3e,_0x5b1340,'WARMUP'),this[_0x5af248(0x22e)](_0x20f631,_0x3650cb[_0x5af248(0x20f)](_0x315454,this[_0x5af248(0x243)](_0x2cab58)));else{if(_0x194b36){if('fluEr'!=='WTyBM')this['subject']()[_0x5af248(0x1c5)](_0x194b36['id'],_0x5d2489);else{const _0x5ea380=_0x5f01c4[_0x5af248(0x19c)](_0x5aa324);_0x5ea380[_0x5af248(0x208)](_0x2ad2bc)&&this['subject']()[_0x5af248(0x198)](_0x28c9b8['id'],_0x45449c);}}}}}if(_0xa26487[_0x5af248(0x1a5)](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5af248(0x225)!==_0x5af248(0x20b)){const _0x1538ca=Number(RegExp['$1']);for(const _0x2a7c32 of _0xeeedbe[_0x5af248(0x1e3)]()){if(_0x5af248(0x1c0)!==_0x5af248(0x23e))_0x2a7c32&&_0xeeedbe[_0x5af248(0x1c5)](_0x2a7c32['id'],_0x1538ca);else{const _0x153855=_0x3657fe(_0xc20678['$1']);for(const _0x2e0510 of this[_0x5af248(0x258)]()['skills']()){_0x2e0510&&this[_0x5af248(0x258)]()[_0x5af248(0x198)](_0x2e0510['id'],_0x153855);}}}}else{let _0x56b8cf=_0x29eb8(_0x30662c['$1']);_0x56b8cf=this[_0x5af248(0x17d)](_0x3db321,_0x56b8cf),this['applyGlobalCooldowns'](_0x56b8cf);}}},Game_Action[_0x165650(0x251)][_0x165650(0x1af)]=function(_0x443394){const _0x5eb025=_0x165650,_0x466737=this[_0x5eb025(0x20a)]()[_0x5eb025(0x1f4)],_0x414800=_0x466737[_0x5eb025(0x1a5)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x414800)for(const _0x49938a of _0x414800){let _0x3a38df=0x0,_0x59bf06=0x0;if(_0x49938a[_0x5eb025(0x1a5)](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x3a38df=Number(RegExp['$1']),_0x59bf06=Number(RegExp['$2']);else _0x49938a[_0x5eb025(0x1a5)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&('yBrxx'!==_0x5eb025(0x1b8)?(_0x3a38df=DataManager[_0x5eb025(0x1c3)](RegExp['$1']),_0x59bf06=Number(RegExp['$2'])):this[_0x5eb025(0x228)]());this[_0x5eb025(0x258)]()[_0x5eb025(0x198)](_0x3a38df,_0x59bf06);}const _0x59a940=_0x466737[_0x5eb025(0x1a5)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x59a940)for(const _0x100fbe of _0x59a940){let _0x4187eb=0x0,_0x56f3ba=0x0;if(_0x100fbe[_0x5eb025(0x1a5)](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x4187eb=Number(RegExp['$1']),_0x56f3ba=Number(RegExp['$2']);else{if(_0x100fbe[_0x5eb025(0x1a5)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5eb025(0x23c)!==_0x5eb025(0x24d))_0x4187eb=DataManager['getSkillIdWithName'](RegExp['$1']),_0x56f3ba=Number(RegExp['$2']);else{const _0x2a1813=_0x1427f9[_0x5eb025(0x19c)](_0x4f49d7);_0x2a1813[_0x5eb025(0x208)](_0x27879f)&&_0xc3c3af[_0x5eb025(0x1c5)](_0x4aa990['id'],_0x2d03dd);}}}_0x443394['addWarmup'](_0x4187eb,_0x56f3ba);}},Game_Action[_0x165650(0x251)][_0x165650(0x24f)]=function(_0x1b928d){const _0x4a48fb=_0x165650,_0x2f63e1=this[_0x4a48fb(0x20a)]()[_0x4a48fb(0x1f4)],_0x1a7d94=_0x2f63e1[_0x4a48fb(0x1a5)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x1a7d94){if(_0x4a48fb(0x165)===_0x4a48fb(0x179)){var _0x36d70e=_0x52948f(_0x4228f1['$1']);_0x534645*=_0x36d70e;}else for(const _0x1aa500 of _0x1a7d94){let _0x232859=0x0,_0x12e125=0x0;if(_0x1aa500['match'](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x232859=Number(RegExp['$1']),_0x12e125=Number(RegExp['$2']);else _0x1aa500[_0x4a48fb(0x1a5)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x232859=DataManager[_0x4a48fb(0x1c3)](RegExp['$1']),_0x12e125=Number(RegExp['$2']));for(const _0x280614 of this['subject']()[_0x4a48fb(0x1e3)]()){if(_0x280614){const _0x20baf2=DataManager[_0x4a48fb(0x19c)](_0x280614);_0x20baf2[_0x4a48fb(0x208)](_0x232859)&&this['subject']()[_0x4a48fb(0x198)](_0x280614['id'],_0x12e125);}}}}const _0x46e57c=_0x2f63e1[_0x4a48fb(0x1a5)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x46e57c)for(const _0x18c07c of _0x46e57c){let _0xdbfd94=0x0,_0x1a2da7=0x0;if(_0x18c07c[_0x4a48fb(0x1a5)](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0xdbfd94=Number(RegExp['$1']),_0x1a2da7=Number(RegExp['$2']);else{if(_0x18c07c[_0x4a48fb(0x1a5)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x4a48fb(0x16f)!==_0x4a48fb(0x16f)){if(_0x36b1f4){const _0x3ce8fd=_0x58a908[_0x4a48fb(0x19c)](_0x1b26f9);_0x3ce8fd[_0x4a48fb(0x208)](_0x342854)&&this[_0x4a48fb(0x199)](_0x266132['id'],_0x3b8faf);}}else _0xdbfd94=DataManager[_0x4a48fb(0x1c3)](RegExp['$1']),_0x1a2da7=Number(RegExp['$2']);}}for(const _0x3f1312 of _0x1b928d[_0x4a48fb(0x1e3)]()){if(_0x4a48fb(0x252)===_0x4a48fb(0x252)){if(_0x3f1312){const _0x2e4c7c=DataManager['getSkillTypes'](_0x3f1312);_0x2e4c7c['includes'](_0xdbfd94)&&_0x1b928d[_0x4a48fb(0x198)](_0x3f1312['id'],_0x1a2da7);}}else this['clearCooldowns'](),this[_0x4a48fb(0x254)]();}}},Game_Action['prototype'][_0x165650(0x234)]=function(_0x498f76){const _0x416a36=_0x165650,_0x44d8b1=this['item']()[_0x416a36(0x1f4)];if(_0x44d8b1[_0x416a36(0x1a5)](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x862ee9=Number(RegExp['$1']);for(const _0x1fd46c of this[_0x416a36(0x258)]()[_0x416a36(0x1e3)]()){_0x1fd46c&&this['subject']()['addWarmup'](_0x1fd46c['id'],_0x862ee9);}}if(_0x44d8b1[_0x416a36(0x1a5)](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x34b68d=Number(RegExp['$1']);for(const _0x117766 of _0x498f76[_0x416a36(0x1e3)]()){if(_0x416a36(0x1db)===_0x416a36(0x1f9)){const _0xc076c8=_0x15276b(_0x23f9af['$1']);for(const _0x3f1b68 of _0x4bce60['skills']()){_0x3f1b68&&_0x349557[_0x416a36(0x198)](_0x3f1b68['id'],_0xc076c8);}}else _0x117766&&_0x498f76[_0x416a36(0x198)](_0x117766['id'],_0x34b68d);}}},VisuMZ[_0x165650(0x23a)]['Game_BattlerBase_initMembers']=Game_BattlerBase['prototype'][_0x165650(0x1cd)],Game_BattlerBase[_0x165650(0x251)]['initMembers']=function(){const _0x3bfe0d=_0x165650;VisuMZ[_0x3bfe0d(0x23a)][_0x3bfe0d(0x1cb)][_0x3bfe0d(0x175)](this),this[_0x3bfe0d(0x238)]();},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x238)]=function(){const _0x3b10e9=_0x165650;this[_0x3b10e9(0x1bb)](),this[_0x3b10e9(0x254)]();},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1bb)]=function(){this['_skillCooldowns']={};},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1f5)]=function(_0x1428a9){const _0x1dbfb6=_0x165650;if(this[_0x1dbfb6(0x1b6)]===undefined)this[_0x1dbfb6(0x238)]();if(this[_0x1dbfb6(0x232)]())return 0x0;return this['_skillCooldowns'][_0x1428a9]||0x0;},Game_BattlerBase[_0x165650(0x251)]['isBypassCooldowns']=function(_0x1d06e3){const _0x3601cd=_0x165650;if(!$gameParty[_0x3601cd(0x1ad)]())return!![];if(this['attackSkillId']()===_0x1d06e3)return!![];if(this[_0x3601cd(0x1f3)]()===_0x1d06e3)return!![];const _0x56bc80=$dataSkills[_0x1d06e3];if(_0x56bc80&&_0x56bc80[_0x3601cd(0x1f4)][_0x3601cd(0x1a5)](/<BYPASS COOLDOWNS>/i))return!![];if(_0x56bc80&&_0x56bc80[_0x3601cd(0x1ce)]['toUpperCase']()===_0x3601cd(0x1be))return!![];return![];},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1ac)]=function(_0xcf604b){const _0x1c75ef=_0x165650;if(!$gameParty[_0x1c75ef(0x1ad)]())return;const _0x1bbd69=VisuMZ['SkillCooldowns'][_0x1c75ef(0x259)][_0x1c75ef(0x1a9)];if(_0x1bbd69['OnUpdateJS'])_0x1bbd69[_0x1c75ef(0x1b5)][_0x1c75ef(0x175)](this,_0xcf604b);VisuMZ[_0x1c75ef(0x23a)][_0x1c75ef(0x1d5)][_0xcf604b]&&VisuMZ[_0x1c75ef(0x23a)][_0x1c75ef(0x1d5)][_0xcf604b]['call'](this,_0xcf604b);},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1f6)]=function(_0x56a4ea){const _0x59bfac=_0x165650;if(!$gameParty[_0x59bfac(0x1ad)]())return;const _0xdaa44d=VisuMZ[_0x59bfac(0x23a)][_0x59bfac(0x259)][_0x59bfac(0x1a9)];if(_0xdaa44d[_0x59bfac(0x195)])_0xdaa44d['OnReadyJS']['call'](this,_0x56a4ea);VisuMZ[_0x59bfac(0x23a)][_0x59bfac(0x256)][_0x56a4ea]&&VisuMZ[_0x59bfac(0x23a)][_0x59bfac(0x256)][_0x56a4ea][_0x59bfac(0x175)](this,_0x56a4ea);},Game_BattlerBase[_0x165650(0x251)]['setCooldown']=function(_0x4bd8ac,_0x49f7ab){const _0x4befdb=_0x165650;if(this[_0x4befdb(0x1b6)]===undefined)this[_0x4befdb(0x238)]();if(this[_0x4befdb(0x232)](_0x4bd8ac))return;_0x49f7ab=Math[_0x4befdb(0x237)](_0x49f7ab),_0x49f7ab=_0x49f7ab[_0x4befdb(0x253)](0x0,VisuMZ['SkillCooldowns'][_0x4befdb(0x259)]['Cooldown'][_0x4befdb(0x241)]);const _0x343a4b=this[_0x4befdb(0x1f5)](_0x4bd8ac);;this[_0x4befdb(0x1b6)][_0x4bd8ac]=_0x49f7ab;if(this[_0x4befdb(0x1b6)][_0x4bd8ac]<=0x0){if(_0x343a4b>0x0)this[_0x4befdb(0x1f6)](_0x4bd8ac);delete this[_0x4befdb(0x1b6)][_0x4bd8ac];}},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1c5)]=function(_0x5b4360,_0x154a5c){const _0x5b1576=_0x165650;if(this[_0x5b1576(0x1b6)]===undefined)this[_0x5b1576(0x238)]();this[_0x5b1576(0x1b6)][_0x5b4360]=this[_0x5b1576(0x1b6)][_0x5b4360]||0x0,this[_0x5b1576(0x170)](_0x5b4360,this[_0x5b1576(0x1b6)][_0x5b4360]+_0x154a5c);},Game_BattlerBase[_0x165650(0x251)]['applyCooldown']=function(_0x273fbe,_0x4e41b8){const _0x2400e2=_0x165650;_0x4e41b8=this[_0x2400e2(0x201)](_0x273fbe,_0x4e41b8,_0x2400e2(0x1cc)),this[_0x2400e2(0x170)](_0x273fbe,Math['max'](_0x4e41b8,this[_0x2400e2(0x1f5)](_0x273fbe)));},Game_BattlerBase[_0x165650(0x251)]['applyStypeCooldowns']=function(_0xfa0467,_0x1d0416){const _0x42c82d=_0x165650;for(const _0xd0ee3d of this[_0x42c82d(0x1e3)]()){if(_0x42c82d(0x1ed)===_0x42c82d(0x185)){if(this['attackSkillId']()===_0x49f44f)return!![];if(this['guardSkillId']()===_0x1e4cb5)return!![];const _0x580e63=_0x6b2466[_0x2922cc];if(_0x580e63&&_0x580e63[_0x42c82d(0x1f4)][_0x42c82d(0x1a5)](/<BYPASS WARMUPS>/i))return!![];if(_0x580e63&&_0x580e63[_0x42c82d(0x1ce)][_0x42c82d(0x205)]()==='WAIT')return!![];return![];}else{if(_0xd0ee3d){const _0x52d550=DataManager[_0x42c82d(0x19c)](_0xd0ee3d);_0x52d550[_0x42c82d(0x208)](_0xfa0467)&&this[_0x42c82d(0x199)](_0xd0ee3d['id'],_0x1d0416);}}}},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1fc)]=function(_0x5d6050){const _0x82832e=_0x165650;for(const _0x5bbae5 of this[_0x82832e(0x1e3)]()){if(_0x82832e(0x19d)!==_0x82832e(0x1df))_0x5bbae5&&this[_0x82832e(0x199)](_0x5bbae5['id'],_0x5d6050);else{let _0x2246ba=_0x4d2681[_0x82832e(0x1f5)](_0x2b2da2);_0x2246ba=_0x7a62b1[_0x82832e(0x168)](_0x2246ba,_0x4b93ce,_0x38f61c),_0x39a929[_0x82832e(0x170)](_0x50ac25,_0x2246ba);}}},Game_BattlerBase['prototype']['updateCooldowns']=function(_0x1070e8){const _0x203e93=_0x165650;_0x1070e8=_0x1070e8||0x1;for(const _0x3b97e7 in this[_0x203e93(0x1b6)]){const _0x13371f=this[_0x203e93(0x1b6)][_0x3b97e7]||0x0;this[_0x203e93(0x1b6)][_0x3b97e7]-=_0x1070e8,this['onCooldownUpdate'](_0x3b97e7);if(this[_0x203e93(0x1b6)][_0x3b97e7]<=0x0){if(_0x203e93(0x1d2)===_0x203e93(0x1d2)){if(_0x13371f>0x0)this[_0x203e93(0x1f6)](_0x3b97e7);delete this[_0x203e93(0x1b6)][_0x3b97e7];}else _0x2bb340[_0x203e93(0x23a)][_0x203e93(0x1f8)][_0x203e93(0x175)](this,_0x47e57a),this['paySkillCooldown'](_0x2090f4);}}},Game_BattlerBase[_0x165650(0x251)]['clearWarmups']=function(){const _0x33449c=_0x165650;this[_0x33449c(0x223)]={};},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x243)]=function(_0x564294){const _0x92399e=_0x165650;return this[_0x92399e(0x216)](_0x564294)+this[_0x92399e(0x1f5)](_0x564294);},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x216)]=function(_0x22b98e){const _0xf20378=_0x165650;if(this[_0xf20378(0x223)]===undefined)this[_0xf20378(0x238)]();if(this[_0xf20378(0x20c)]())return 0x0;return this['_skillWarmups'][_0x22b98e]||0x0;},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x20c)]=function(_0x4521cd){const _0x520406=_0x165650;if(this['attackSkillId']()===_0x4521cd)return!![];if(this[_0x520406(0x1f3)]()===_0x4521cd)return!![];const _0x116800=$dataSkills[_0x4521cd];if(_0x116800&&_0x116800['note'][_0x520406(0x1a5)](/<BYPASS WARMUPS>/i))return!![];if(_0x116800&&_0x116800[_0x520406(0x1ce)][_0x520406(0x205)]()==='WAIT')return!![];return![];},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x21f)]=function(_0x380772){const _0x2aa2f5=_0x165650;if(!$gameParty[_0x2aa2f5(0x1ad)]())return;const _0x1355b6=VisuMZ[_0x2aa2f5(0x23a)][_0x2aa2f5(0x259)][_0x2aa2f5(0x196)];if(_0x1355b6[_0x2aa2f5(0x1b5)])_0x1355b6[_0x2aa2f5(0x1b5)][_0x2aa2f5(0x175)](this,_0x380772);if(VisuMZ['SkillCooldowns'][_0x2aa2f5(0x188)][_0x380772]){if(_0x2aa2f5(0x25e)===_0x2aa2f5(0x1a8)){const _0x4be2cb=_0x20af09[_0x2aa2f5(0x19c)](_0x260203);_0x4be2cb[_0x2aa2f5(0x208)](_0x1a430c)&&this[_0x2aa2f5(0x258)]()[_0x2aa2f5(0x1c5)](_0x521b03['id'],_0x305623);}else VisuMZ['SkillCooldowns'][_0x2aa2f5(0x188)][_0x380772][_0x2aa2f5(0x175)](this,_0x380772);}},Game_BattlerBase['prototype'][_0x165650(0x1c6)]=function(_0x4a3ca2){const _0x2f3779=_0x165650;if(!$gameParty[_0x2f3779(0x1ad)]())return;const _0x1c5483=VisuMZ['SkillCooldowns'][_0x2f3779(0x259)][_0x2f3779(0x196)];if(_0x1c5483[_0x2f3779(0x195)])_0x1c5483['OnReadyJS'][_0x2f3779(0x175)](this,_0x4a3ca2);},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x22e)]=function(_0x3e1559,_0x2c2ab9){const _0x5789fb=_0x165650;if(this[_0x5789fb(0x223)]===undefined)this[_0x5789fb(0x238)]();if(this[_0x5789fb(0x20c)](_0x3e1559))return;_0x2c2ab9=Math[_0x5789fb(0x237)](_0x2c2ab9),_0x2c2ab9=_0x2c2ab9[_0x5789fb(0x253)](0x0,VisuMZ[_0x5789fb(0x23a)][_0x5789fb(0x259)][_0x5789fb(0x196)][_0x5789fb(0x241)]);const _0xd47069=this[_0x5789fb(0x216)](_0x3e1559);;this['_skillWarmups'][_0x3e1559]=_0x2c2ab9;if(this['_skillWarmups'][_0x3e1559]<=0x0){if(_0x5789fb(0x16b)!=='rxxQR')_0x33eecc[_0x5789fb(0x1c5)](_0x51fd0e['id'],_0x548047);else{if(_0xd47069>0x0)this[_0x5789fb(0x1c6)](_0x3e1559);delete this['_skillWarmups'][_0x3e1559];}}},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x198)]=function(_0x1f1f55,_0x3aab9b){const _0x1fb9ea=_0x165650;if(this[_0x1fb9ea(0x223)]===undefined)this[_0x1fb9ea(0x238)]();this[_0x1fb9ea(0x223)][_0x1f1f55]=this[_0x1fb9ea(0x223)][_0x1f1f55]||0x0;if(this[_0x1fb9ea(0x243)](_0x1f1f55)<=0x0)return;this['setWarmup'](_0x1f1f55,this[_0x1fb9ea(0x223)][_0x1f1f55]+_0x3aab9b);},Game_BattlerBase['prototype'][_0x165650(0x16a)]=function(_0x4dbd84,_0x55452a){const _0x53ab21=_0x165650;_0x55452a=this[_0x53ab21(0x201)](_0x4dbd84,_0x55452a,'WARMUP'),this[_0x53ab21(0x22e)](_0x4dbd84,Math[_0x53ab21(0x20f)](_0x55452a,this[_0x53ab21(0x243)](_0x4dbd84)));},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x228)]=function(_0xb66fc){const _0x44b153=_0x165650;if(this[_0x44b153(0x25b)]()<=0x1)return;_0xb66fc=_0xb66fc||0x1;for(const _0x16e85d in this['_skillWarmups']){const _0x355205=this[_0x44b153(0x223)][_0x16e85d]||0x0;this[_0x44b153(0x223)][_0x16e85d]-=_0xb66fc;if(this[_0x44b153(0x223)][_0x16e85d]<=0x0){if(_0x44b153(0x17f)==='EoiCE'){if(_0x355205>0x0)this['onWarmupReady'](_0x16e85d);delete this[_0x44b153(0x223)][_0x16e85d];}else this['subject']()[_0x44b153(0x254)]();}}},VisuMZ[_0x165650(0x23a)][_0x165650(0x162)]=Game_BattlerBase[_0x165650(0x251)]['meetsSkillConditions'],Game_BattlerBase[_0x165650(0x251)][_0x165650(0x25c)]=function(_0x1b632a){const _0x1361e3=_0x165650;if(!VisuMZ[_0x1361e3(0x23a)][_0x1361e3(0x162)][_0x1361e3(0x175)](this,_0x1b632a))return![];if(!this[_0x1361e3(0x24c)](_0x1b632a))return![];if(!this[_0x1361e3(0x1dc)](_0x1b632a))return![];return!![];},Game_BattlerBase['prototype'][_0x165650(0x24c)]=function(_0x538362){const _0x43c1da=_0x165650;return this[_0x43c1da(0x216)](_0x538362['id'])<=0x0;},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1dc)]=function(_0x69f716){const _0x541ccb=_0x165650;return this[_0x541ccb(0x1f5)](_0x69f716['id'])<=0x0;},VisuMZ[_0x165650(0x23a)][_0x165650(0x1f8)]=Game_BattlerBase[_0x165650(0x251)]['paySkillCost'],Game_BattlerBase[_0x165650(0x251)]['paySkillCost']=function(_0x3ed65d){const _0x14588c=_0x165650;VisuMZ[_0x14588c(0x23a)][_0x14588c(0x1f8)]['call'](this,_0x3ed65d),this[_0x14588c(0x197)](_0x3ed65d);},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x17d)]=function(_0x4a4532,_0x11814f){const _0x17f891=_0x165650;return Imported['VisuMZ_3_SkillMastery']&&(_0x17f891(0x1f1)===_0x17f891(0x1f1)?_0x11814f=this['applyMasteryEffectCooldownTurns'](_0x4a4532,_0x11814f):(_0x2d6e5f=_0x32484f[_0x17f891(0x1c3)](_0x4bab6f['$1']),_0x7a22fb=_0x21bec5(_0x1f3102['$2']))),_0x11814f;},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x197)]=function(_0x37ff46){const _0x67e1f=_0x165650;if(!$gameParty[_0x67e1f(0x1ad)]())return;const _0x4a35c8=_0x37ff46[_0x67e1f(0x1f4)];if(_0x4a35c8['match'](/<COOLDOWN:[ ](\d+)>/i)){if('VxSLs'!==_0x67e1f(0x16e)){const _0x1e794d=_0x383930[_0x67e1f(0x193)]()[_0x571b13];if(!_0x1e794d)return 0x0;return _0x1e794d[_0x67e1f(0x1f5)](_0x36eaa9)||0x0;}else{let _0xfff1c3=Number(RegExp['$1']);_0xfff1c3=this['alterPaySkillCooldownModifier'](_0x37ff46,_0xfff1c3),this[_0x67e1f(0x199)](_0x37ff46['id'],_0xfff1c3);}}VisuMZ[_0x67e1f(0x23a)]['cooldownJS'][_0x37ff46['id']]&&VisuMZ['SkillCooldowns'][_0x67e1f(0x203)][_0x37ff46['id']][_0x67e1f(0x175)](this,_0x37ff46);const _0x291cfe=_0x4a35c8['match'](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x291cfe){if(_0x67e1f(0x1ae)==='Fwblb')for(const _0x21b2fd of _0x291cfe){if(_0x67e1f(0x173)===_0x67e1f(0x173)){let _0x37528a=0x0,_0x161536=0x0;if(_0x21b2fd[_0x67e1f(0x1a5)](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x37528a=Number(RegExp['$1']),_0x161536=Number(RegExp['$2']);else _0x21b2fd[_0x67e1f(0x1a5)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x37528a=DataManager[_0x67e1f(0x1c3)](RegExp['$1']),_0x161536=Number(RegExp['$2']));const _0x2f15e6=$dataSkills[_0x37528a];_0x2f15e6&&('BQWfa'===_0x67e1f(0x1e9)?(_0x161536=this[_0x67e1f(0x17d)](_0x37ff46,_0x161536),this[_0x67e1f(0x199)](_0x2f15e6['id'],_0x161536)):(_0x13d904=_0x303931[_0x67e1f(0x246)](_0x5d12fb['$1']),_0x1796fb=_0xa5bb3f(_0x15c2e0['$2'])));}else _0x4ae400=_0x255e61[_0x67e1f(0x1c3)](_0x4c654f['$1']),_0xd69e83=_0x1856d3(_0x55e90e['$2']);}else{const _0x363fd7=_0x52ea42[_0x67e1f(0x23a)][_0x67e1f(0x259)][_0x67e1f(0x196)][_0x67e1f(0x194)]||0x0;this[_0x67e1f(0x228)](_0x363fd7);}}const _0x3b8e42=_0x4a35c8['match'](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x3b8e42)for(const _0x25aaa2 of _0x3b8e42){if('TObPM'!==_0x67e1f(0x202)){let _0x288715=0x0,_0x981a7f=0x0;if(_0x25aaa2[_0x67e1f(0x1a5)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x288715=Number(RegExp['$1']),_0x981a7f=Number(RegExp['$2']);else{if(_0x25aaa2['match'](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)){if('rzqnZ'!==_0x67e1f(0x21e))_0x288715=DataManager[_0x67e1f(0x246)](RegExp['$1']),_0x981a7f=Number(RegExp['$2']);else{let _0x43f260=0x0,_0x350c8b=0x0;if(_0x4a9bab[_0x67e1f(0x1a5)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x43f260=_0x2d25c6(_0x10eb8c['$1']),_0x350c8b=_0x2d064e(_0x443197['$2']);else _0x215e90[_0x67e1f(0x1a5)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x43f260=_0xb54b9['getSkillIdWithName'](_0x285d59['$1']),_0x350c8b=_0x487df6(_0x1ff2a2['$2']));_0x161d5b[_0x67e1f(0x1c5)](_0x43f260,_0x350c8b);}}}_0x981a7f=this['alterPaySkillCooldownModifier'](_0x37ff46,_0x981a7f),this[_0x67e1f(0x1c7)](_0x288715,_0x981a7f);}else this[_0x67e1f(0x190)]=![],_0x30c7b6[_0x67e1f(0x23a)][_0x67e1f(0x184)][_0x67e1f(0x175)](this),_0x248c78[_0x67e1f(0x236)]&&_0x59d453[_0x67e1f(0x187)]()&&this[_0x67e1f(0x228)]();}if(_0x4a35c8[_0x67e1f(0x1a5)](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){let _0x177ae4=Number(RegExp['$1']);_0x177ae4=this[_0x67e1f(0x17d)](_0x37ff46,_0x177ae4),this[_0x67e1f(0x1fc)](_0x177ae4);}},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x201)]=function(_0x2f9cbf,_0x55650f,_0x458b71){const _0x2c7465=_0x165650,_0x1de22d=$dataSkills[_0x2f9cbf];if(!_0x1de22d)return _0x55650f;const _0x3979d6=this[_0x2c7465(0x230)](_0x1de22d,_0x458b71,'PLUS'),_0x57ad59=this[_0x2c7465(0x1b4)](_0x1de22d,_0x458b71,'RATE'),_0x4dec4f=this['applyCDWUnotetagsFlat'](_0x1de22d,_0x458b71,'FLAT');return Math['ceil']((_0x55650f+_0x3979d6)*_0x57ad59+_0x4dec4f);},VisuMZ[_0x165650(0x23a)]['RegExp']={},Game_BattlerBase['prototype'][_0x165650(0x230)]=function(_0x2351f4,_0x1d7c99,_0x4a52bd){const _0x405823=_0x165650,_0x1f550d=_0x2351f4['id'],_0x2088c2=_0x2351f4[_0x405823(0x1ce)][_0x405823(0x1ba)](),_0xeddbbc=VisuMZ['SkillCooldowns']['RegExp'],_0x4ef822='Skill_%1_%2_%3'[_0x405823(0x21d)](_0x1f550d,_0x1d7c99,_0x4a52bd);_0xeddbbc[_0x4ef822]=_0xeddbbc[_0x4ef822]||{};const _0x100fd0=_0x405823(0x182);_0xeddbbc[_0x4ef822]['notetag1']=_0xeddbbc[_0x4ef822][_0x405823(0x242)]||new RegExp(_0x100fd0[_0x405823(0x21d)](_0x1f550d,_0x1d7c99,_0x4a52bd),'i'),_0xeddbbc[_0x4ef822][_0x405823(0x1fb)]=_0xeddbbc[_0x4ef822][_0x405823(0x1fb)]||new RegExp(_0x100fd0[_0x405823(0x21d)](_0x2088c2,_0x1d7c99,_0x4a52bd),'i');const _0x1e320e=DataManager[_0x405823(0x19c)](_0x2351f4);for(const _0x5851a1 of _0x1e320e){if(_0x405823(0x1a3)!==_0x405823(0x1a3))_0x557b80[_0x405823(0x23a)][_0x405823(0x181)][_0x34f29a['id']][_0x405823(0x175)](this,_0x3143c4);else{const _0x455dc9='Stype_%1_%2_%3'[_0x405823(0x21d)](_0x5851a1,_0x1d7c99,_0x4a52bd);let _0x11e4ca=$dataSystem[_0x405823(0x1f7)][Number(_0x5851a1)][_0x405823(0x205)]()[_0x405823(0x1ba)]();_0x11e4ca=_0x11e4ca[_0x405823(0x1da)](/\x1I\[(\d+)\]/gi,''),_0x11e4ca=_0x11e4ca[_0x405823(0x1da)](/\\I\[(\d+)\]/gi,''),_0xeddbbc[_0x455dc9]=_0xeddbbc[_0x455dc9]||{};const _0x5408a3=_0x405823(0x1aa);_0xeddbbc[_0x455dc9][_0x405823(0x242)]=_0xeddbbc[_0x455dc9][_0x405823(0x242)]||new RegExp(_0x5408a3['format'](_0x5851a1,_0x1d7c99,_0x4a52bd),'i'),_0xeddbbc[_0x455dc9][_0x405823(0x1fb)]=_0xeddbbc[_0x455dc9][_0x405823(0x1fb)]||new RegExp(_0x5408a3[_0x405823(0x21d)](_0x11e4ca,_0x1d7c99,_0x4a52bd),'i');}}const _0x545cc6=_0x405823(0x240),_0x243eb6='Global_%1_%2'[_0x405823(0x21d)](_0x1d7c99,_0x4a52bd);_0xeddbbc[_0x243eb6]=_0xeddbbc[_0x243eb6]||new RegExp(_0x545cc6[_0x405823(0x21d)](_0x1d7c99,_0x4a52bd),'i');const _0x148884=(_0x3bfe23,_0x4a5e72)=>{const _0x51853d=_0x405823;if(_0x51853d(0x24a)!==_0x51853d(0x24a)){_0x16fb8f[_0x51853d(0x23a)][_0x51853d(0x1d9)][_0x51853d(0x175)](this,_0x1bee7c);if(this[_0x51853d(0x17b)]){this['_previousBattleChain']=_0x15ce12;return;}this[_0x51853d(0x1bb)](),this['clearWarmups'](),this[_0x51853d(0x176)](_0x92172f);}else{if(!_0x4a5e72)return _0x3bfe23;const _0x4152c8=_0x4a5e72[_0x51853d(0x1f4)];if(_0x4152c8['match'](_0xeddbbc[_0x4ef822][_0x51853d(0x242)])){var _0xb0f797=Number(RegExp['$1']);_0x3bfe23+=_0xb0f797;}if(_0x4152c8[_0x51853d(0x1a5)](_0xeddbbc[_0x4ef822][_0x51853d(0x1fb)])){var _0xb0f797=Number(RegExp['$1']);_0x3bfe23+=_0xb0f797;}for(const _0x390dce of _0x1e320e){if(_0x51853d(0x224)==='XDAku')_0x20cefd=this[_0x51853d(0x17d)](_0x503e81,_0x38a1ad),this[_0x51853d(0x199)](_0xfb53cd['id'],_0x114de8);else{const _0x461182='Stype_%1_%2_%3'['format'](_0x390dce,_0x1d7c99,_0x4a52bd);if(_0x4152c8[_0x51853d(0x1a5)](_0xeddbbc[_0x461182][_0x51853d(0x242)])){var _0xb0f797=Number(RegExp['$1']);_0x3bfe23+=_0xb0f797;}if(_0x4152c8['match'](_0xeddbbc[_0x461182][_0x51853d(0x1fb)])){var _0xb0f797=Number(RegExp['$1']);_0x3bfe23+=_0xb0f797;}}}if(_0x4152c8['match'](_0xeddbbc[_0x243eb6])){var _0xb0f797=Number(RegExp['$1']);_0x3bfe23+=_0xb0f797;}return _0x3bfe23;}};return this[_0x405823(0x1d1)]()[_0x405823(0x206)](_0x148884,0x0);},Game_BattlerBase[_0x165650(0x251)][_0x165650(0x1b4)]=function(_0x58212b,_0x44a1b2,_0x2d60c5){const _0x5a25d1=_0x165650,_0x3aff66=_0x58212b['id'],_0x7c6276=_0x58212b[_0x5a25d1(0x1ce)][_0x5a25d1(0x1ba)](),_0x37d9a3=VisuMZ[_0x5a25d1(0x23a)][_0x5a25d1(0x1a1)],_0xfdc2b6=_0x5a25d1(0x1f2),_0xb70e52=_0x5a25d1(0x15f),_0x5a3198='Skill_%1_%2_%3'[_0x5a25d1(0x21d)](_0x3aff66,_0x44a1b2,_0x2d60c5);_0x37d9a3[_0x5a3198]=_0x37d9a3[_0x5a3198]||{};const _0x2277e6=_0x5a25d1(0x22d);_0x37d9a3[_0x5a3198][_0x5a25d1(0x242)]=_0x37d9a3[_0x5a3198]['notetag1']||new RegExp(_0x2277e6[_0x5a25d1(0x21d)](_0x3aff66,_0x44a1b2,_0x2d60c5,_0xfdc2b6),'i'),_0x37d9a3[_0x5a3198][_0x5a25d1(0x1fb)]=_0x37d9a3[_0x5a3198][_0x5a25d1(0x1fb)]||new RegExp(_0x2277e6['format'](_0x7c6276,_0x44a1b2,_0x2d60c5,_0xfdc2b6),'i'),_0x37d9a3[_0x5a3198][_0x5a25d1(0x23d)]=_0x37d9a3[_0x5a3198][_0x5a25d1(0x23d)]||new RegExp(_0x2277e6[_0x5a25d1(0x21d)](_0x3aff66,_0x44a1b2,_0x2d60c5,_0xb70e52),'i'),_0x37d9a3[_0x5a3198][_0x5a25d1(0x1e1)]=_0x37d9a3[_0x5a3198][_0x5a25d1(0x1e1)]||new RegExp(_0x2277e6[_0x5a25d1(0x21d)](_0x7c6276,_0x44a1b2,_0x2d60c5,_0xb70e52),'i');const _0x4c9957=DataManager[_0x5a25d1(0x19c)](_0x58212b);for(const _0x42f37a of _0x4c9957){if('npnfA'==='npnfA'){const _0x5accd6='Stype_%1_%2_%3'[_0x5a25d1(0x21d)](_0x42f37a,_0x44a1b2,_0x2d60c5);let _0x6b60bd=$dataSystem[_0x5a25d1(0x1f7)][Number(_0x42f37a)][_0x5a25d1(0x205)]()[_0x5a25d1(0x1ba)]();_0x6b60bd=_0x6b60bd[_0x5a25d1(0x1da)](/\x1I\[(\d+)\]/gi,''),_0x6b60bd=_0x6b60bd[_0x5a25d1(0x1da)](/\\I\[(\d+)\]/gi,''),_0x37d9a3[_0x5accd6]=_0x37d9a3[_0x5accd6]||{};const _0x2d6413='<STYPE\x20%1\x20%2\x20%3:[\x20]%4>';_0x37d9a3[_0x5accd6][_0x5a25d1(0x242)]=_0x37d9a3[_0x5accd6][_0x5a25d1(0x242)]||new RegExp(_0x2d6413[_0x5a25d1(0x21d)](_0x42f37a,_0x44a1b2,_0x2d60c5,_0xfdc2b6),'i'),_0x37d9a3[_0x5accd6][_0x5a25d1(0x1fb)]=_0x37d9a3[_0x5accd6][_0x5a25d1(0x1fb)]||new RegExp(_0x2d6413[_0x5a25d1(0x21d)](_0x6b60bd,_0x44a1b2,_0x2d60c5,_0xfdc2b6),'i'),_0x37d9a3[_0x5accd6]['notetag3']=_0x37d9a3[_0x5accd6][_0x5a25d1(0x23d)]||new RegExp(_0x2d6413[_0x5a25d1(0x21d)](_0x42f37a,_0x44a1b2,_0x2d60c5,_0xb70e52),'i'),_0x37d9a3[_0x5accd6]['notetag4']=_0x37d9a3[_0x5accd6]['notetag4']||new RegExp(_0x2d6413[_0x5a25d1(0x21d)](_0x6b60bd,_0x44a1b2,_0x2d60c5,_0xb70e52),'i');}else{const _0x58a4ec=_0x41f234[_0x5a25d1(0x235)](_0x29a13a);if(!_0x58a4ec)return 0x0;return _0x58a4ec[_0x5a25d1(0x243)](_0x5ddae4)||0x0;}}const _0x507542='<GLOBAL\x20%1\x20%2:[\x20]%3>',_0x5618aa='Global_%1_%2'[_0x5a25d1(0x21d)](_0x44a1b2,_0x2d60c5);_0x37d9a3[_0x5618aa]=_0x37d9a3[_0x5618aa]||{},_0x37d9a3[_0x5618aa][_0x5a25d1(0x242)]=_0x37d9a3[_0x5618aa][_0x5a25d1(0x242)]||new RegExp(_0x507542[_0x5a25d1(0x21d)](_0x44a1b2,_0x2d60c5,_0xfdc2b6),'i'),_0x37d9a3[_0x5618aa]['notetag2']=_0x37d9a3[_0x5618aa][_0x5a25d1(0x1fb)]||new RegExp(_0x507542[_0x5a25d1(0x21d)](_0x44a1b2,_0x2d60c5,_0xb70e52),'i');const _0x1cd431=(_0x5ecfb9,_0x1bfd60)=>{const _0x3fd06f=_0x5a25d1;if(_0x3fd06f(0x17c)!=='qviDD')return _0x57792a[_0x3fd06f(0x191)]&&(_0x2310e5=this['applyMasteryEffectCooldownTurns'](_0x2b0bef,_0x2563b4)),_0xcdab19;else{if(!_0x1bfd60)return _0x5ecfb9;const _0x4af2a6=_0x1bfd60['note'];if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x5a3198][_0x3fd06f(0x242)])){if(_0x3fd06f(0x1ec)!=='xFjOD')_0x433a94=this[_0x3fd06f(0x177)](_0x64e779,_0xd1207f);else{var _0xae9806=Number(RegExp['$1'])/0x64;_0x5ecfb9*=_0xae9806;}}if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x5a3198][_0x3fd06f(0x1fb)])){var _0xae9806=Number(RegExp['$1'])/0x64;_0x5ecfb9*=_0xae9806;}if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x5a3198][_0x3fd06f(0x23d)])){var _0xae9806=Number(RegExp['$1']);_0x5ecfb9*=_0xae9806;}if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x5a3198][_0x3fd06f(0x1e1)])){if(_0x3fd06f(0x171)!==_0x3fd06f(0x171))_0x30c62b=_0x34162a[_0x3fd06f(0x1c3)](_0x191df9['$1']),_0x190900=_0x548b93(_0x8cb578['$2']);else{var _0xae9806=Number(RegExp['$1']);_0x5ecfb9*=_0xae9806;}}for(const _0x47928d of _0x4c9957){const _0x241e72=_0x3fd06f(0x1e6)[_0x3fd06f(0x21d)](_0x47928d,_0x44a1b2,_0x2d60c5);if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x241e72][_0x3fd06f(0x242)])){var _0xae9806=Number(RegExp['$1'])/0x64;_0x5ecfb9*=_0xae9806;}if(_0x4af2a6['match'](_0x37d9a3[_0x241e72][_0x3fd06f(0x1fb)])){if(_0x3fd06f(0x1a6)!==_0x3fd06f(0x1a6)){const _0x1ffac4=_0x301a0f[_0x3fd06f(0x23a)][_0x3fd06f(0x259)];if(_0x1ffac4[_0x3fd06f(0x196)][_0x3fd06f(0x1e8)]&&_0x1d4964[_0x3fd06f(0x216)](_0x33f4c6['id'])>0x0)this[_0x3fd06f(0x25a)](_0x238daf,_0x2b9676,_0x5ef55f,_0xd84a62,_0x5b32b1);else _0x1ffac4[_0x3fd06f(0x1a9)][_0x3fd06f(0x1e8)]&&_0x41cdaf[_0x3fd06f(0x1f5)](_0x5b5225['id'])>0x0?this['drawSkillCooldown'](_0x3d21f9,_0xb189e3,_0x408288,_0x1c00a8,_0x160887):_0x3aa642['SkillCooldowns'][_0x3fd06f(0x18c)]['call'](this,_0x17f511,_0x29f501,_0x3831d0,_0x4fa636,_0x3d3589);}else{var _0xae9806=Number(RegExp['$1'])/0x64;_0x5ecfb9*=_0xae9806;}}if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x241e72][_0x3fd06f(0x23d)])){var _0xae9806=Number(RegExp['$1']);_0x5ecfb9*=_0xae9806;}if(_0x4af2a6['match'](_0x37d9a3[_0x241e72][_0x3fd06f(0x1e1)])){if('SvhqY'!==_0x3fd06f(0x180))_0x3c30ac=_0x4855be[_0x3fd06f(0x1c3)](_0x377163['$1']),_0x4ab3e4=_0x176c8b(_0x475dd1['$2']);else{var _0xae9806=Number(RegExp['$1']);_0x5ecfb9*=_0xae9806;}}}if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x5618aa][_0x3fd06f(0x242)])){var _0xae9806=Number(RegExp['$1'])/0x64;_0x5ecfb9*=_0xae9806;}if(_0x4af2a6[_0x3fd06f(0x1a5)](_0x37d9a3[_0x5618aa][_0x3fd06f(0x1fb)])){var _0xae9806=Number(RegExp['$1']);_0x5ecfb9*=_0xae9806;}return _0x5ecfb9;}};return this[_0x5a25d1(0x1d1)]()['reduce'](_0x1cd431,0x1);},VisuMZ[_0x165650(0x23a)]['Game_Battler_onBattleStart']=Game_Battler[_0x165650(0x251)]['onBattleStart'],Game_Battler[_0x165650(0x251)][_0x165650(0x211)]=function(_0x1f5c48){const _0x275867=_0x165650;VisuMZ[_0x275867(0x23a)][_0x275867(0x1d9)][_0x275867(0x175)](this,_0x1f5c48);if(this['_previousBattleChain']){if(_0x275867(0x167)!==_0x275867(0x215)){this['_previousBattleChain']=undefined;return;}else{const _0xdd7a0=_0x17437e['members']()[_0xa7b178];if(!_0xdd7a0)return;_0xdd7a0[_0x275867(0x170)](_0x4fa7a0,_0x1840c5);}}this['clearCooldowns'](),this['clearWarmups'](),this['prepareSkillWarmups'](_0x1f5c48);},Game_Battler[_0x165650(0x251)]['prepareSkillWarmups']=function(_0x385735){const _0x4e0058=_0x165650;for(const _0x24c556 of this[_0x4e0058(0x1e3)]()){if(!_0x24c556)continue;const _0x145402=_0x24c556['id'],_0x3c91fb=_0x24c556[_0x4e0058(0x1f4)];_0x3c91fb[_0x4e0058(0x1a5)](/<WARMUP:[ ](\d+)>/i)&&this['applyWarmup'](_0x145402,Number(RegExp['$1']));if(VisuMZ[_0x4e0058(0x23a)]['warmupJS'][_0x24c556['id']]){if(_0x4e0058(0x1c1)==='gQlMs'){const _0x14dea7=_0x4dfe5b[_0x4e0058(0x235)](_0x17ecbc);if(!_0x14dea7)return;_0x14dea7[_0x4e0058(0x22e)](_0x1392bb,_0x44d3be);}else VisuMZ['SkillCooldowns'][_0x4e0058(0x181)][_0x24c556['id']][_0x4e0058(0x175)](this,_0x24c556);}}if(_0x385735){if(_0x4e0058(0x22f)===_0x4e0058(0x22f)){const _0x3c24fc=VisuMZ[_0x4e0058(0x23a)][_0x4e0058(0x259)][_0x4e0058(0x196)][_0x4e0058(0x194)]||0x0;this[_0x4e0058(0x228)](_0x3c24fc);}else for(const _0x15a0d1 of this[_0x4e0058(0x1e3)]()){_0x15a0d1&&this[_0x4e0058(0x199)](_0x15a0d1['id'],_0x45eca0);}}},Game_Battler[_0x165650(0x251)]['prepareUpdateSkillCooldowns']=function(){const _0x59ff69=_0x165650;if(this[_0x59ff69(0x190)])return;if(this[_0x59ff69(0x1eb)])return;this['_updatedSkillCooldowns']=!![],this[_0x59ff69(0x172)]();if(Imported[_0x59ff69(0x236)]&&BattleManager[_0x59ff69(0x187)]())return;this[_0x59ff69(0x228)]();},VisuMZ[_0x165650(0x23a)]['Game_Battler_onTurnEnd']=Game_Battler[_0x165650(0x251)][_0x165650(0x239)],Game_Battler[_0x165650(0x251)]['onTurnEnd']=function(){const _0x47e18e=_0x165650;this[_0x47e18e(0x190)]=![],VisuMZ['SkillCooldowns'][_0x47e18e(0x184)]['call'](this),Imported[_0x47e18e(0x236)]&&BattleManager['isOTB']()&&this[_0x47e18e(0x228)]();},VisuMZ['SkillCooldowns']['Game_Battler_onBattleEnd']=Game_Battler[_0x165650(0x251)][_0x165650(0x257)],Game_Battler[_0x165650(0x251)][_0x165650(0x257)]=function(){const _0x29a52f=_0x165650;VisuMZ[_0x29a52f(0x23a)][_0x29a52f(0x1c8)][_0x29a52f(0x175)](this);if(Imported['VisuMZ_3_ChainBattles']&&$gameTemp[_0x29a52f(0x1ea)]()){this['_previousBattleChain']=!![];return;}this[_0x29a52f(0x1bb)](),this[_0x29a52f(0x254)]();};function _0x22fc(_0x4b1c22,_0x4a8073){const _0x4169f3=_0x4169();return _0x22fc=function(_0x22fcdb,_0x1a8c5a){_0x22fcdb=_0x22fcdb-0x15e;let _0x219b0f=_0x4169f3[_0x22fcdb];return _0x219b0f;},_0x22fc(_0x4b1c22,_0x4a8073);}var $actorGetSkillCooldown=function(_0x1cd494,_0x5c53de){const _0x461eab=_0x165650,_0xc83fea=$gameActors[_0x461eab(0x235)](_0x1cd494);if(!_0xc83fea)return 0x0;return _0xc83fea[_0x461eab(0x1f5)](_0x5c53de)||0x0;},$actorSetSkillCooldown=function(_0x200b3e,_0x1fd491,_0x42217c){const _0x566df1=_0x165650,_0x1e13bb=$gameActors[_0x566df1(0x235)](_0x200b3e);if(!_0x1e13bb)return;_0x1e13bb['setCooldown'](_0x1fd491,_0x42217c);},$actorGetSkillWarmup=function(_0x2116df,_0x4098c3){const _0x3babc5=_0x165650,_0x39af27=$gameActors[_0x3babc5(0x235)](_0x2116df);if(!_0x39af27)return 0x0;return _0x39af27[_0x3babc5(0x243)](_0x4098c3)||0x0;},$actorSetSkillWarmup=function(_0x1f1774,_0x20c776,_0x498f30){const _0x21124a=_0x165650,_0x28c3d5=$gameActors['actor'](_0x1f1774);if(!_0x28c3d5)return;_0x28c3d5[_0x21124a(0x22e)](_0x20c776,_0x498f30);},$enemyGetSkillCooldown=function(_0x339f7f,_0x53947b){const _0x2d0347=_0x165650,_0x499b61=$gameTroop['members']()[_0x339f7f];if(!_0x499b61)return 0x0;return _0x499b61[_0x2d0347(0x1f5)](_0x53947b)||0x0;},$enemySetSkillCooldown=function(_0x31e95f,_0x4cd690,_0x315957){const _0x126514=_0x165650,_0x476abe=$gameTroop['members']()[_0x31e95f];if(!_0x476abe)return;_0x476abe[_0x126514(0x170)](_0x4cd690,_0x315957);},$enemyGetSkillWarmup=function(_0x284a89,_0x9659c8){const _0x1da911=_0x165650,_0x5b1310=$gameTroop['members']()[_0x284a89];if(!_0x5b1310)return 0x0;return _0x5b1310[_0x1da911(0x243)](_0x9659c8)||0x0;},$enemySetSkillWarmup=function(_0x3341d9,_0x231fbb,_0x29b67b){const _0x12e4b2=_0x165650,_0xf08c9f=$gameTroop['members']()[_0x3341d9];if(!_0xf08c9f)return;_0xf08c9f[_0x12e4b2(0x22e)](_0x231fbb,_0x29b67b);};VisuMZ['SkillCooldowns'][_0x165650(0x18c)]=Window_Base[_0x165650(0x251)][_0x165650(0x200)],Window_Base['prototype'][_0x165650(0x200)]=function(_0x417dfd,_0x4cb358,_0x1b4af2,_0x51cb51,_0x5d7cdc){const _0x108643=_0x165650,_0x2f2eef=VisuMZ[_0x108643(0x23a)][_0x108643(0x259)];if(_0x2f2eef[_0x108643(0x196)][_0x108643(0x1e8)]&&_0x417dfd[_0x108643(0x216)](_0x4cb358['id'])>0x0)this[_0x108643(0x25a)](_0x417dfd,_0x4cb358,_0x1b4af2,_0x51cb51,_0x5d7cdc);else _0x2f2eef['Cooldown'][_0x108643(0x1e8)]&&_0x417dfd['cooldown'](_0x4cb358['id'])>0x0?this['drawSkillCooldown'](_0x417dfd,_0x4cb358,_0x1b4af2,_0x51cb51,_0x5d7cdc):VisuMZ[_0x108643(0x23a)]['Window_Base_drawSkillCost'][_0x108643(0x175)](this,_0x417dfd,_0x4cb358,_0x1b4af2,_0x51cb51,_0x5d7cdc);},Window_Base[_0x165650(0x251)][_0x165650(0x25a)]=function(_0x39eb01,_0x3b798a,_0x350757,_0x3879f9,_0x5bcfb6){const _0x41ad4d=_0x165650,_0x4efe49=VisuMZ[_0x41ad4d(0x23a)][_0x41ad4d(0x259)][_0x41ad4d(0x196)];let _0x4e7d2f='';_0x4e7d2f+=_0x41ad4d(0x1f0)[_0x41ad4d(0x21d)](_0x4efe49[_0x41ad4d(0x18f)]);const _0x54686c=_0x4efe49[_0x41ad4d(0x231)];_0x54686c['match'](/#(.*)/i)&&Imported[_0x41ad4d(0x1cf)]?_0x41ad4d(0x1ca)===_0x41ad4d(0x1fa)?_0x30ca90[_0x41ad4d(0x23a)][_0x41ad4d(0x203)][_0x25e5d1['id']][_0x41ad4d(0x175)](this,_0x306d87):_0x4e7d2f+='\x5cHexColor<%1>'[_0x41ad4d(0x21d)](String(RegExp['$1'])):_0x4e7d2f+=_0x41ad4d(0x18e)['format'](_0x54686c);const _0x2ad73e=_0x39eb01[_0x41ad4d(0x243)](_0x3b798a['id']),_0x5e7902=_0x4efe49[_0x41ad4d(0x18b)]>0x0?_0x41ad4d(0x213)[_0x41ad4d(0x21d)](_0x4efe49[_0x41ad4d(0x18b)]):'';_0x4e7d2f+=_0x4efe49[_0x41ad4d(0x1b3)][_0x41ad4d(0x21d)](_0x2ad73e,_0x5e7902);const _0x2f77a8=this[_0x41ad4d(0x174)](_0x4e7d2f,_0x350757,_0x3879f9,_0x5bcfb6),_0x34905e=_0x350757+_0x5bcfb6-_0x2f77a8[_0x41ad4d(0x161)];this[_0x41ad4d(0x226)](_0x4e7d2f,_0x34905e,_0x3879f9,_0x5bcfb6),this['resetFontSettings']();},Window_Base[_0x165650(0x251)][_0x165650(0x222)]=function(_0x20b21c,_0x4e9941,_0x1edd4e,_0x6bebb8,_0x6f2fda){const _0x258dea=_0x165650,_0x486454=VisuMZ[_0x258dea(0x23a)]['Settings'][_0x258dea(0x1a9)];let _0x26999c='';_0x26999c+='\x5cFS[%1]'['format'](_0x486454[_0x258dea(0x18f)]);const _0x2ac2c1=_0x486454[_0x258dea(0x231)];_0x2ac2c1[_0x258dea(0x1a5)](/#(.*)/i)&&Imported['VisuMZ_1_MessageCore']?_0x26999c+=_0x258dea(0x221)[_0x258dea(0x21d)](String(RegExp['$1'])):_0x26999c+='\x5cC[%1]'[_0x258dea(0x21d)](_0x2ac2c1);const _0x24aa37=_0x20b21c[_0x258dea(0x1f5)](_0x4e9941['id']),_0x202da9=_0x486454[_0x258dea(0x18b)]>0x0?_0x258dea(0x213)[_0x258dea(0x21d)](_0x486454[_0x258dea(0x18b)]):'';_0x26999c+=_0x486454['TextFmt'][_0x258dea(0x21d)](_0x24aa37,_0x202da9);const _0x343db9=this[_0x258dea(0x174)](_0x26999c,_0x1edd4e,_0x6bebb8,_0x6f2fda),_0x8c9fd7=_0x1edd4e+_0x6f2fda-_0x343db9[_0x258dea(0x161)];this['drawTextEx'](_0x26999c,_0x8c9fd7,_0x6bebb8,_0x6f2fda),this[_0x258dea(0x19b)]();};