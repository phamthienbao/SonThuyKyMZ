//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
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
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 * 
 * <AP Plus: +x%>
 * <AP Plus: -x%>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 * - AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * 
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 * - AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * <AP Flat: +x%>
 * <AP Flat: -x%>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 * - AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * 
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Plus: +x%>
 * <SP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 * - SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 * - SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <SP Flat: +x%>
 * <SP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 * - SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * </Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   Separate Skill Type?:
 *   - Separate learnable skills by skill type?
 * 
 *   Hide Learned Skills
 *   - Hide skills after they are learned?
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * 
 *   Separation:
 * 
 *     Indent Skills:
 *     - When separated, indent skills by this many pixels.
 * 
 *     Category Format:
 *     - Skill type category name format
 *     - %1 - Name
 * 
 *     Collapse Format:
 *     - Format for command to collapse skill type.
 *     - %1 - Name
 * 
 *     Expand Format:
 *     - Format for command to expand skill type.
 *     - %1 - Name
 * 
 *     Font Color:
 *     - When separated, indent skills by this many pixels.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 *   - For extra clarity:
 *     - Shows up if there is enough room on the screen. Make sure your game's
 *       screen resolution is large enough (ie. 1280x720).
 *     - Shows up in the Skill menu if 'Learn' is selected.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 *   - For extra clarity:
 *     - Shows up if there is enough room on the screen. Make sure your game's
 *       screen resolution is large enough (ie. 1280x720).
 *     - Shows up in the Skill menu if 'Learn' is selected.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.18: December 15, 2025
 * * Documentation Update!
 * ** Added extra notes for clarity for the "Show in Menus?" plugin parameter
 *    for AP and SP.
 * *** For extra clarity:
 * **** Shows up if there is enough room on the screen. Make sure your game's
 *      screen resolution is large enough (ie. 1280x720).
 * **** Shows up in the Skill menu if 'Learn' is selected.
 * 
 * Version 1.17: June 12, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new line for <AP Rate: x%>
 * *** AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * ** Added new line for <SP Rate: x%>
 * *** SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <AP Plus: +x%>
 * *** <AP Plus: -x%>
 * *** <AP Flat: +x%>
 * *** <AP Flat: -x%>
 * *** <SP Plus: +x%>
 * *** <SP Plus: -x%>
 * *** <SP Flat: +x%>
 * *** <SP Flat: -x%>
 * **** These are the additive versions of <AP Rate: x%> and <SP Rate: x%>
 * **** See help file for more information.
 * 
 * Version 1.16: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a compatibility bug that would cause the last skill of a list to be
 *    removed from learning. Fix made by Irina.
 * 
 * Version 1.15: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Skills and States Core features!
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Added new Plugin Parameter by Irina:
 * *** Parameters > General Settings > Hide Learned Skills
 * **** Hide skills after they are learned?
 * 
 * Version 1.14: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where skill ID's could clash with state ID's from Equip
 *    Passive System and preventing states from being learned. Fixed by Irina.
 * 
 * Version 1.13: March 14, 2024
 * * Compatibility Update!
 * ** Fixed a problem where the learn passive notetags from the Equip Passive
 *    System plugin could be blocked by other plugins. Fix made by Irina.
 * 
 * Version 1.12: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.11: May 18, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a visual listing bug effect when 'CP' and 'JP' are listed under
 *    costs but the VisuMZ Class Change System plugin isn't present. Fix made
 *    by Olivia.
 * 
 * Version 1.09: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: March 24, 2022
 * * Documentation Update!
 * ** Fixed a typo for missing a "/" in the <Learn Skills> group notetag.
 * 
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param SeparateByStypeID:eval
 * @text Separate Skill Type?
 * @parent Visual
 * @type boolean
 * @on Separate
 * @off Don't
 * @desc Separate learnable skills by skill type?
 * @default false
 *
 * @param HideLearned:eval
 * @text Hide Learned Skills
 * @parent Visual
 * @type boolean
 * @on Hide
 * @off Show
 * @desc Hide skills after they are learned?
 * @default false
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 * @param Separation
 * @parent Vocabulary
 *
 * @param SeparateIndent:num
 * @text Indent Skills
 * @parent Separation
 * @desc When separated, indent skills by this many pixels.
 * @default 16
 *
 * @param SeparateCategoryFmt:str
 * @text Category Format
 * @parent Separation
 * @desc Skill type category name format
 * %1 - Name
 * @default %1
 *
 * @param SeparateCollapseFmt:str
 * @text Collapse Format
 * @parent Separation
 * @desc Format for command to collapse skill type.
 * %1 - Name
 * @default %1 [-]
 *
 * @param SeparateExpandFmt:str
 * @text Expand Format
 * @parent Separation
 * @desc Format for command to expand skill type.
 * %1 - Name
 * @default %1 [+]
 *
 * @param StypeCategoryColor:str
 * @text Font Color
 * @parent Separation
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x17690b=_0x5149;(function(_0x5274e6,_0xa4691d){const _0x34f4fe=_0x5149,_0x50443c=_0x5274e6();while(!![]){try{const _0x15e738=-parseInt(_0x34f4fe(0x38f))/0x1+parseInt(_0x34f4fe(0x1b5))/0x2+-parseInt(_0x34f4fe(0x243))/0x3+parseInt(_0x34f4fe(0x23e))/0x4*(parseInt(_0x34f4fe(0x26b))/0x5)+parseInt(_0x34f4fe(0x398))/0x6+-parseInt(_0x34f4fe(0x1be))/0x7*(-parseInt(_0x34f4fe(0x1fc))/0x8)+parseInt(_0x34f4fe(0x290))/0x9;if(_0x15e738===_0xa4691d)break;else _0x50443c['push'](_0x50443c['shift']());}catch(_0x47e315){_0x50443c['push'](_0x50443c['shift']());}}}(_0x224f,0xd8b6f));var label=_0x17690b(0x1e4),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1fe571){const _0x154612=_0x17690b;return _0x1fe571[_0x154612(0x298)]&&_0x1fe571[_0x154612(0x1a7)]['includes']('['+label+']');})[0x0];function _0x224f(){const _0x497223=['drawIngredients','createKeyJS','ConfirmWindow_BgType','alterSkillName','playStaticSe','bind','switches','floor','setSkillLearnSkillSpriteBitmap','onSkillLearnItemOk','StartingSkillPoints','setSkillLearnSkillSpritePosition','processPayForSkillLearnSystem','addChild','FullText','LearnReqSkillsAny','_scene','format','drawTextEx','jsOnLearn','itemWindowRect','iconHeight','_skillLearnAnimationWait','MaxResource','skillLearnIncludes','processFinishSkillLearnAnimation','LearnJpCost','earnedSkillPoints','opacitySpeed','gainRewardsAbilityPoints','index','drawSkillLearnCost','startSkillLearnAnimation','Classes','drawActorClassPoints','SkillPoints','StypeCategoryColor','LearnShowSkillsAny','PerAction','Scale','Icon','skillLearningName','EVAL','gainStartingAbilityPoints','itemLineRect','Skill','makeDeepCopy','Actors','Game_Actor_changeClass','_skillPoints','skillLearnWeaponFmt','Class-%1-%2','classPointsFull','SkillPointsLose','SkillPointsPlus','skillPointsRate','VisuMZ_2_EquipPassiveSys','displayRewardsAbilityPoints','skillLearnStypeCategoryCollapse','drawClassPoints','makeRewards','jsLearnSpCost','getSkillLearnJobPointCost','getSkillLearnArmorCost','MAX_SAFE_INTEGER','onDatabaseLoaded','createConditionJS','resetTextColor','finishSkillLearnAnimation','center','SKILLS','skillLearnReqSkillFmt','skillLearnCmd','anchor','add','getEquipPassiveIcon','max','applyItemUserEffect','NUM','skillTypes','commandName','push','skillPointsIcon','_itemIDs','item','TargetGainSkillPoints','jsLearnShowListTxt','abilityPointsVisible','skillLearnIcon','SkillPointsSet','refresh','1574818CczZjq','PerEnemy','Window_SkillList_isEnabled','destroy','createSkillLearnCostText','LearnShowSkillsAll','Animation','skillLearnReqListSkill','levelUpGainAbilityPoints','6136344JFQRvb','_skillLearnSystem_drawItemMode','autoRemovalTiming','skillPoints','gold','jsLearnReqListTxt','Show','allMembers','skillLearnCancelCmd','JSON','inBattle','classPointsIcon','skill','ConvertParams','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','round','skillLearnReqListSwitch','drawActorFace','Window_SkillList_makeItemList','skillLearnStypeCategory','createSkillLearnIngredientsWindow','createActionJS','innerHeight','SeparateByStypeID','getSkillLearnClassPointCost','length','activate','addCommand','ARRAYSTR','skillLearnStypeCategoryExpand','faceWidth','Settings','getSkillLearnWeaponCost','update','getSkillLearnItemCost','skillLearnIngredientsWindowRect','getSkillLearnDisplayedCosts','_stypeId','learnSkill','jsLearnCpCost','create','iconWidth','reduce','innerWidth','sort','SkillPointsAdd','RegExp','loseJobPoints','skillLearnReqSwitchFmt','gainSkillPointsForMulticlasses','right','GoldIcon','magicSkills','loseClassPoints','updateSkillLearnAnimationSprite','filter','WEAPON','members','onSkillLearnConfirmOk','resetFontSettings','Game_Actor_setup','VictoryText','ShowVictory','description','jobPointsAbbr','skillLearningTitle','LearnWeaponCost','Scene_Skill_onItemOk','addSkillLearnSystemCommand','skillLearnReqHeaderFmt','ReqSkillFmt','skillLearnAlreadyLearned','FadeSpeed','IngredientOwned','jobPointsFull','jobPointsFmt','Window_SkillList_setStypeId','1520260BpCsvT','Game_System_initialize','ItemFmt','setSkillLearnSkillSpriteFrame','_SkillLearnSystem_preventLevelUpGain','drawItemName','textSizeEx','jsLearnReqDetailTxt','applySkillPoints','8267497pCjpbP','abilityPointsFmt','shouldDrawRequirements','getArmorIdWithName','exit','skillLearnConfirmCmd','LearnGoldCost','colSpacing','drawSkillPoints','LearnArmorCost','FUNC','drawTextExRightAlign','GOLD','RequirementTitle','StartClassAbilityPoints','loseSkillPoints','SWITCHES','applyItemSkillLearnSystemUserEffect','%1\x20[+]','LearnReqSwitchesAny','value','Custom','isFinishedSkillLearnAnimating','VisuMZ_1_SkillsStatesCore','Animations','LearnCpCost','addAbilityPoints','ARRAYNUM','currentClass','Window_SkillList_drawSkillCost','ARRAYEVAL','Game_Actor_levelUp','LearnSkillB','drawItem','cancel','makeRewardsAbilityPoints','LearnItemCost','AbilityPointsGain','SkillLearnSystem','Name','skillPointsFull','select','changeClass','isLearnedEquippedPassive','return\x200','numItems','skillLearningCost','StartClassSkillPoints','setFrame','setSkillLearnSystemMenuAccess','min','AbilityPointsAdd','jsLearnJpCost','deadMembers','VisuMZ_0_CoreEngine','_armorIDs','trim','_skillLearnAnimationSprite','_skillLearnIconSpriteOpacitySpeed','createSkillLearnAnimationIDs','onLoadBattleTestSkillLearnSystem','maxCols','8jhAaWM','process_VisuMZ_SkillLearnSystem_Notetags','IngredientName','map','show','playOkSound','%1%2','getItemIdWithName','smooth','ReqSwitchFmt','shift','Skill-%1-%2','SharedResource','Window_SkillList_itemLineRect','ITEM','process_VisuMZ_SkillLearnSystem_JS','prototype','<Color:\x20%1>','log','initSkillLearnSystemMenuAccess','drawActorJobPoints','PerLevelUp','match','drawRequirements','contents','skillLearnItemFmt','SeparationFmt','_rewards','skillPointsFmt','SkillPointsGain','_weaponIDs','getSkillLearnPassiveSkillsFromClass','createSkillLearnAnimation','_skillLearnIngredientsWindow','ARMOR','setupBattleTestMembersSkillLearnSystem','shouldDrawSkillLearnRequirements','getSkillIdWithName','ArmorFmt','loseAbilityPoints','lineHeight','jsLearnShow','ReqMetFmt','isTriggered','learnPicture','remove','Window_SkillList_drawItem','CoreEngine','height','showVisualGoldDisplay','toggleSkillLearnStypeCollapse','AliveActors','abilityPointsIcon','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','HideLearned','setSkillPoints','traitObjects','isLearnedSkill','initAbilityPoints','left','isSkillLearnEnabled','skillLearnStypeColor','Skills','stypeCategory','abilityPoints','createSkillLearnSkillSprite','8gkRjdd','getAbilityPoints','SkillsStatesCore','bitmap','onBattleStart','4278660HmoyJi','LearnSpCost','setActor','gainAbilityPointsForMulticlasses','isSkillLearnSystemMenuAccess','ARRAYSTRUCT','makeSkillLearnPassivesList','levelUp','getSkillLearnGoldCost','call','skillLearnSystemCommandName','_skillLearnBitmapSprite','loadPicture','Scene_Skill_create','AbilityPointsLose','updateSkillLearnAnimation','TargetGainAbilityPoints','_actor','drawActorSkillPoints','_learnPicture','icon','parse','General','SystemShowSkillLearnSystemMenu','addWindow','STR','note','_abilityPoints','isAlive','_collapsedStypeIDs','Item','LearnSkillA','State-%1-%2','Game_Battler_onBattleStart','Scene_Skill_update','isActor','constructor','jsLearnReq','clear','createTextJS','1072040xdIPRN','initialize','newPage','CancelCmd','_skillLearnIconSprite','playSkillLearn','drawAbilityPoints','MenuAccess','destroySkillLearnAnimationSprite','LEVEL','ceil','getWeaponIdWithName','makeSeparatedSkillLearnList','name','StatusWindowDrawJS','VisuMZ_2_ClassChangeSystem','displayRewardsSkillPoints','LearnReqLevel','\x5cI[%1]%2','loseGold','opacity','setAbilityPoints','Gold','updateSkillLearnSpriteOpacity','ARRAYJSON','_classIDs','SeparateIndent','DetailWindow_BgType','gainSkillPoints','drawActorSimpleStatus','separateSkillLearnByStypeID','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_skillLearnAnimationPlaying','SkillPointsRate','onSkillLearnConfirmCancel','jsLearnShowDetailTxt','setup','4463640vyuDIU','skillLearnReqTitle','test','ShowAnimations','skillPointsTotal','setStypeId','makeSkillLearnList','ClassPoints','status','isReleased','DefaultCost','Sound','Window_SkillList_setActor','isSkillLearnMode','skillLearnConfirmWindow','passives','skillLearningOwned','applyAbilityPoints','%1\x20[-]','TextFmt','RequireFmt','skillLearn','quantity','visible','_skillIDs','initSkillPoints','optExtraExp','makeItemList','CUSTOM','DetailWindow_RectJS','pop','animationIDs','addSkillPoints','itemPadding','skillLearnSeparationFmt','width','getSkillPoints','setHandler','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','currencyUnit','user','Window_SkillList_initialize','_earnedAbilityPoints','skillLearnArmorFmt','classPointsFmt','LearnReqSwitchesAll','displayRewards','includes','split','getSkillLearnAbilityPointCost','_skillLearnConfirmWindow','gainStartingSkillPoints','createCostJS','gainMulticlassRewardPoints','Ability','separateSkillLearnStypeIndent','getSkillLearnCostText','StartingAbilityPoints','levelA','getSkillLearnSkillsFromClass','clamp','drawJobPoints','makeCommandList','ClassChangeSystem','learnEquippedPassive','LearnCostBatch','ShowWindows','_indentSkillLearnRect','canPayForSkillLearnSystem','createVisibleJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','scale','earnedAbilityPoints','drawCurrencyValue','createSkillLearnSystemWindows','applySkillLearnSystemUserEffect','Points','concat','EQUIP_PASSIVE_SYS','isMVAnimation','parameters','Armor-%1-%2','Parse_Notetags_CreateJS','Game_Party_setupBattleTestMembers','setSkillLearnSkillSpriteOpacity','LearnReqSkillsAll','jsLearnApCost','SeparateExpandFmt','\x5cI[%1]','drawTextExCenterAlign','makeSkillLearnStypeCategory','stypeId','_earnedSkillPoints','SeparateCollapseFmt','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','calcWindowHeight','isState','ReqLevelFmt','Window_SkillList_alterSkillName','Game_Actor_learnSkill','ConfirmCmd','makeRewardsSkillPoints','isBattleMember','skillLearnReqListLevel','actor','AbilityPointsPlus','level','refreshSkillLearnSystem','removeChild','registerCommand','IngredientCost','AbilityPointsSet','_skillLearnAnimationIDs','destroySkillLearnSprite','gainRewardsSkillPoints','_data','_SkillLearnSystem_MenuAccess','Learned','Window_SkillType_makeCommandList','skillPointsVisible','gainAbilityPoints','getClassPoints','command','isPlaytest','toUpperCase','subject','_itemWindow','Window_SkillList_includes','skillLearnReqMet','BattleManager_makeRewards','meetRequirementsForSkillLearnSystem','getClassIdWithName','Window_SkillStatus_refresh','drawActorAbilityPoints','ParseSkillNotetags','AbilityPoints','hide','skillLearnReqNotMet','_statusWindow','iconIndex','IconStypeMagic','AbbrText','DisplayedCosts','abilityPointsRate','skillLearnReqLevelFmt','isSkill','abilityPointsFull','enemy','replace','ParseAllNotetags','Scene_Boot_onDatabaseLoaded','Actor-%1-%2','skillPointsAbbr','Window','indexOf','onItemOk','onSkillLearnCollapseStypeID','maxTurns','getSkillLearnSkillPointCost','ConfirmWindow_RectJS','skillLearnReqSeparatorFmt','Armor','setupBattleTestMembers','abilityPointsAbbr'];_0x224f=function(){return _0x497223;};return _0x224f();}function _0x5149(_0x4a9b79,_0x546029){const _0x224f5a=_0x224f();return _0x5149=function(_0x514981,_0x2d059d){_0x514981=_0x514981-0x187;let _0x10b540=_0x224f5a[_0x514981];return _0x10b540;},_0x5149(_0x4a9b79,_0x546029);}VisuMZ[label][_0x17690b(0x187)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x17690b(0x3a5)]=function(_0x578f8c,_0x5b8e70){const _0x55034a=_0x17690b;for(const _0x2a2a2d in _0x5b8e70){if(_0x2a2a2d[_0x55034a(0x212)](/(.*):(.*)/i)){const _0x2f388c=String(RegExp['$1']),_0xd524e=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x49be3e,_0x3cc50f,_0x2fc410;switch(_0xd524e){case _0x55034a(0x382):_0x49be3e=_0x5b8e70[_0x2a2a2d]!==''?Number(_0x5b8e70[_0x2a2a2d]):0x0;break;case _0x55034a(0x1d9):_0x3cc50f=_0x5b8e70[_0x2a2a2d]!==''?JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d]):[],_0x49be3e=_0x3cc50f[_0x55034a(0x1ff)](_0x3c783c=>Number(_0x3c783c));break;case _0x55034a(0x35e):_0x49be3e=_0x5b8e70[_0x2a2a2d]!==''?eval(_0x5b8e70[_0x2a2a2d]):null;break;case _0x55034a(0x1dc):_0x3cc50f=_0x5b8e70[_0x2a2a2d]!==''?JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d]):[],_0x49be3e=_0x3cc50f[_0x55034a(0x1ff)](_0xe483ee=>eval(_0xe483ee));break;case _0x55034a(0x3a1):_0x49be3e=_0x5b8e70[_0x2a2a2d]!==''?JSON['parse'](_0x5b8e70[_0x2a2a2d]):'';break;case _0x55034a(0x283):_0x3cc50f=_0x5b8e70[_0x2a2a2d]!==''?JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d]):[],_0x49be3e=_0x3cc50f['map'](_0x20d13c=>JSON[_0x55034a(0x258)](_0x20d13c));break;case _0x55034a(0x1c8):_0x49be3e=_0x5b8e70[_0x2a2a2d]!==''?new Function(JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d])):new Function(_0x55034a(0x1ea));break;case'ARRAYFUNC':_0x3cc50f=_0x5b8e70[_0x2a2a2d]!==''?JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d]):[],_0x49be3e=_0x3cc50f['map'](_0x5ac9e0=>new Function(JSON['parse'](_0x5ac9e0)));break;case _0x55034a(0x25c):_0x49be3e=_0x5b8e70[_0x2a2a2d]!==''?String(_0x5b8e70[_0x2a2a2d]):'';break;case _0x55034a(0x3b4):_0x3cc50f=_0x5b8e70[_0x2a2a2d]!==''?JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d]):[],_0x49be3e=_0x3cc50f[_0x55034a(0x1ff)](_0x6009e7=>String(_0x6009e7));break;case'STRUCT':_0x2fc410=_0x5b8e70[_0x2a2a2d]!==''?JSON[_0x55034a(0x258)](_0x5b8e70[_0x2a2a2d]):{},_0x49be3e=VisuMZ[_0x55034a(0x3a5)]({},_0x2fc410);break;case _0x55034a(0x248):_0x3cc50f=_0x5b8e70[_0x2a2a2d]!==''?JSON['parse'](_0x5b8e70[_0x2a2a2d]):[],_0x49be3e=_0x3cc50f['map'](_0x254c82=>VisuMZ[_0x55034a(0x3a5)]({},JSON[_0x55034a(0x258)](_0x254c82)));break;default:continue;}_0x578f8c[_0x2f388c]=_0x49be3e;}}return _0x578f8c;},(_0x517ac4=>{const _0x59672c=_0x17690b,_0xeb0bf0=_0x517ac4[_0x59672c(0x278)];for(const _0x2ef0a0 of dependencies){if(!Imported[_0x2ef0a0]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x59672c(0x345)](_0xeb0bf0,_0x2ef0a0)),SceneManager['exit']();break;}}const _0x13f761=_0x517ac4['description'];if(_0x13f761[_0x59672c(0x212)](/\[Version[ ](.*?)\]/i)){const _0x17dbd9=Number(RegExp['$1']);_0x17dbd9!==VisuMZ[label]['version']&&(alert(_0x59672c(0x3a6)[_0x59672c(0x345)](_0xeb0bf0,_0x17dbd9)),SceneManager[_0x59672c(0x1c2)]());}if(_0x13f761[_0x59672c(0x212)](/\[Tier[ ](\d+)\]/i)){const _0x7c290d=Number(RegExp['$1']);_0x7c290d<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x59672c(0x345)](_0xeb0bf0,_0x7c290d,tier)),SceneManager['exit']()):tier=Math[_0x59672c(0x380)](_0x7c290d,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x59672c(0x187)],_0x517ac4[_0x59672c(0x2e0)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x17690b(0x278)],_0x17690b(0x1e3),_0x5b0d64=>{const _0x135b72=_0x17690b;VisuMZ['ConvertParams'](_0x5b0d64,_0x5b0d64);const _0x559a8c=_0x5b0d64['Actors'][_0x135b72(0x1ff)](_0x159613=>$gameActors['actor'](_0x159613)),_0x34c86b=_0x5b0d64[_0x135b72(0x355)],_0x8158b3=_0x5b0d64['Points'];for(const _0x26e7e2 of _0x559a8c){if(!_0x26e7e2)continue;for(const _0x4b9c1a of _0x34c86b){_0x26e7e2[_0x135b72(0x308)](_0x8158b3,_0x4b9c1a);}}}),PluginManager[_0x17690b(0x2fd)](pluginData['name'],_0x17690b(0x1f1),_0x403336=>{const _0x52ca40=_0x17690b;VisuMZ[_0x52ca40(0x3a5)](_0x403336,_0x403336);const _0x5c22ca=_0x403336[_0x52ca40(0x363)][_0x52ca40(0x1ff)](_0x599285=>$gameActors[_0x52ca40(0x2f8)](_0x599285)),_0x2cf350=_0x403336[_0x52ca40(0x355)],_0x55ecfb=_0x403336[_0x52ca40(0x2dc)];for(const _0x2989db of _0x5c22ca){if(!_0x2989db)continue;for(const _0x22eef9 of _0x2cf350){_0x2989db[_0x52ca40(0x1d8)](_0x55ecfb,_0x22eef9);}}}),PluginManager[_0x17690b(0x2fd)](pluginData[_0x17690b(0x278)],_0x17690b(0x251),_0x588106=>{const _0x2d7267=_0x17690b;VisuMZ[_0x2d7267(0x3a5)](_0x588106,_0x588106);const _0x1d8025=_0x588106[_0x2d7267(0x363)][_0x2d7267(0x1ff)](_0x55219b=>$gameActors[_0x2d7267(0x2f8)](_0x55219b)),_0x2afd08=_0x588106[_0x2d7267(0x355)],_0x5b8320=_0x588106[_0x2d7267(0x2dc)];for(const _0x14c281 of _0x1d8025){if(!_0x14c281)continue;for(const _0xbb5fc3 of _0x2afd08){_0x14c281['loseAbilityPoints'](_0x5b8320,_0xbb5fc3);}}}),PluginManager[_0x17690b(0x2fd)](pluginData['name'],_0x17690b(0x2ff),_0x2540a3=>{const _0x4ad002=_0x17690b;VisuMZ[_0x4ad002(0x3a5)](_0x2540a3,_0x2540a3);const _0x454495=_0x2540a3[_0x4ad002(0x363)][_0x4ad002(0x1ff)](_0x35292b=>$gameActors[_0x4ad002(0x2f8)](_0x35292b)),_0x19599e=_0x2540a3[_0x4ad002(0x355)],_0x8eb30c=_0x2540a3[_0x4ad002(0x2dc)];for(const _0x3ad99c of _0x454495){if(!_0x3ad99c)continue;for(const _0x57aa6f of _0x19599e){_0x3ad99c[_0x4ad002(0x280)](_0x8eb30c,_0x57aa6f);}}}),PluginManager[_0x17690b(0x2fd)](pluginData[_0x17690b(0x278)],_0x17690b(0x219),_0x2c9041=>{const _0x2114e9=_0x17690b;VisuMZ['ConvertParams'](_0x2c9041,_0x2c9041);const _0x57ecb9=_0x2c9041[_0x2114e9(0x363)][_0x2114e9(0x1ff)](_0x4a855b=>$gameActors['actor'](_0x4a855b)),_0x549dc2=_0x2c9041[_0x2114e9(0x355)],_0xdf5177=_0x2c9041[_0x2114e9(0x2dc)];for(const _0x278e27 of _0x57ecb9){if(!_0x278e27)continue;for(const _0x8ddb41 of _0x549dc2){_0x278e27[_0x2114e9(0x287)](_0xdf5177,_0x8ddb41);}}}),PluginManager[_0x17690b(0x2fd)](pluginData[_0x17690b(0x278)],_0x17690b(0x195),_0x5e591c=>{const _0x56755e=_0x17690b;VisuMZ[_0x56755e(0x3a5)](_0x5e591c,_0x5e591c);const _0x208daa=_0x5e591c['Actors'][_0x56755e(0x1ff)](_0x44005f=>$gameActors['actor'](_0x44005f)),_0x1ad6ec=_0x5e591c[_0x56755e(0x355)],_0x45dbcd=_0x5e591c['Points'];for(const _0x2eddfa of _0x208daa){if(!_0x2eddfa)continue;for(const _0x58c1f0 of _0x1ad6ec){_0x2eddfa['addSkillPoints'](_0x45dbcd,_0x58c1f0);}}}),PluginManager[_0x17690b(0x2fd)](pluginData[_0x17690b(0x278)],_0x17690b(0x369),_0x2a82ac=>{const _0x1d8761=_0x17690b;VisuMZ[_0x1d8761(0x3a5)](_0x2a82ac,_0x2a82ac);const _0x4e6da4=_0x2a82ac[_0x1d8761(0x363)][_0x1d8761(0x1ff)](_0x1ab9c4=>$gameActors['actor'](_0x1ab9c4)),_0x15f0b9=_0x2a82ac['Classes'],_0x3753fb=_0x2a82ac['Points'];for(const _0x32d142 of _0x4e6da4){if(!_0x32d142)continue;for(const _0x4d031d of _0x15f0b9){_0x32d142[_0x1d8761(0x1cd)](_0x3753fb,_0x4d031d);}}}),PluginManager[_0x17690b(0x2fd)](pluginData[_0x17690b(0x278)],_0x17690b(0x38d),_0x2d30d3=>{const _0x198afb=_0x17690b;VisuMZ[_0x198afb(0x3a5)](_0x2d30d3,_0x2d30d3);const _0x5a3903=_0x2d30d3[_0x198afb(0x363)]['map'](_0x52e6b2=>$gameActors[_0x198afb(0x2f8)](_0x52e6b2)),_0x4637f2=_0x2d30d3[_0x198afb(0x355)],_0x4847df=_0x2d30d3[_0x198afb(0x2dc)];for(const _0x4a72d9 of _0x5a3903){if(!_0x4a72d9)continue;for(const _0x5cc81f of _0x4637f2){_0x4a72d9[_0x198afb(0x233)](_0x4847df,_0x5cc81f);}}}),PluginManager[_0x17690b(0x2fd)](pluginData['name'],_0x17690b(0x25a),_0x4b1cbe=>{const _0x79fc7d=_0x17690b;VisuMZ['ConvertParams'](_0x4b1cbe,_0x4b1cbe),$gameSystem[_0x79fc7d(0x1ef)](_0x4b1cbe[_0x79fc7d(0x39e)]);}),VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x196)]={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsPlus':/<(?:ABILITY POINTS|AP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'AbilityPointsFlat':/<(?:ABILITY POINTS|AP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsPlus':/<(?:SKILL POINTS|SP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'SkillPointsFlat':/<(?:SKILL POINTS|SP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'LearnSkillA':/<LEARN SKILL(?:|S):[ ](.*)>/gi,'LearnSkillB':/<LEARN SKILL(?:|S)>\s*([\s\S]*)\s*<\/LEARN SKILL(?:|S)>/i,'LearnSkillPassiveA':/<LEARN (?:SKILL |)PASSIVE(?:|S):[ ](.*)>/gi,'LearnSkillPassiveB':/<LEARN (?:SKILL |)PASSIVE(?:|S)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL |)PASSIVE(?:|S)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x326)]=Scene_Boot['prototype'][_0x17690b(0x375)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x3bf8ab=_0x17690b;VisuMZ['SkillLearnSystem'][_0x3bf8ab(0x326)][_0x3bf8ab(0x24c)](this),this[_0x3bf8ab(0x1fd)]();},Scene_Boot[_0x17690b(0x20c)]['process_VisuMZ_SkillLearnSystem_Notetags']=function(){const _0x400fff=_0x17690b;if(VisuMZ[_0x400fff(0x325)])return;this[_0x400fff(0x20b)]();},VisuMZ[_0x17690b(0x1e4)]['JS']={},Scene_Boot[_0x17690b(0x20c)][_0x17690b(0x20b)]=function(){const _0x3683dc=_0x17690b,_0x4d0479=$dataActors[_0x3683dc(0x2dd)]($dataSkills);for(const _0x34df22 of _0x4d0479){if(!_0x34df22)continue;VisuMZ[_0x3683dc(0x1e4)][_0x3683dc(0x2e2)](_0x34df22);}},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x316)]=VisuMZ[_0x17690b(0x316)],VisuMZ[_0x17690b(0x316)]=function(_0xb99e60){const _0xe340c6=_0x17690b;VisuMZ[_0xe340c6(0x1e4)]['ParseSkillNotetags'][_0xe340c6(0x24c)](this,_0xb99e60),VisuMZ[_0xe340c6(0x1e4)][_0xe340c6(0x2e2)](_0xb99e60);},VisuMZ['SkillLearnSystem'][_0x17690b(0x2e2)]=function(_0x4b45b2){const _0x1e2a5d=_0x17690b,_0xeb99e3=VisuMZ['SkillLearnSystem'][_0x1e2a5d(0x196)];VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x2c4)](_0x4b45b2,_0x1e2a5d(0x2e6),_0xeb99e3['jsLearnApCost']),VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x2c4)](_0x4b45b2,_0x1e2a5d(0x18f),_0xeb99e3[_0x1e2a5d(0x18f)]),VisuMZ[_0x1e2a5d(0x1e4)]['createCostJS'](_0x4b45b2,'jsLearnJpCost',_0xeb99e3[_0x1e2a5d(0x1f2)]),VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x2c4)](_0x4b45b2,_0x1e2a5d(0x371),_0xeb99e3['jsLearnSpCost']),VisuMZ[_0x1e2a5d(0x1e4)]['createVisibleJS'](_0x4b45b2,'jsLearnShow',_0xeb99e3[_0x1e2a5d(0x225)]),VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x376)](_0x4b45b2,_0x1e2a5d(0x268),_0xeb99e3[_0x1e2a5d(0x268)]),VisuMZ['SkillLearnSystem'][_0x1e2a5d(0x26a)](_0x4b45b2,_0x1e2a5d(0x38a),_0xeb99e3[_0x1e2a5d(0x38a)]),VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x26a)](_0x4b45b2,'jsLearnShowDetailTxt',_0xeb99e3['jsLearnShowDetailTxt']),VisuMZ[_0x1e2a5d(0x1e4)]['createTextJS'](_0x4b45b2,'jsLearnReqListTxt',_0xeb99e3[_0x1e2a5d(0x39d)]),VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x26a)](_0x4b45b2,_0x1e2a5d(0x1bc),_0xeb99e3[_0x1e2a5d(0x1bc)]),VisuMZ[_0x1e2a5d(0x1e4)][_0x1e2a5d(0x3ad)](_0x4b45b2,'jsOnLearn',_0xeb99e3['jsOnLearn']);},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x2c4)]=function(_0xaa644a,_0x5ddbf6,_0x472766){const _0x4cc986=_0x17690b,_0x37c439=_0xaa644a[_0x4cc986(0x25d)];if(_0x37c439[_0x4cc986(0x212)](_0x472766)){const _0x5b79ad=String(RegExp['$1']),_0x146442=_0x4cc986(0x28a)[_0x4cc986(0x345)](_0x5b79ad),_0x4c9dac=VisuMZ[_0x4cc986(0x1e4)][_0x4cc986(0x335)](_0xaa644a,_0x5ddbf6);VisuMZ[_0x4cc986(0x1e4)]['JS'][_0x4c9dac]=new Function(_0x146442);}},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x2d5)]=function(_0x3a62fe,_0x4e44bc,_0xf565d4){const _0x298d9d=_0x17690b,_0xec7ee3=_0x3a62fe[_0x298d9d(0x25d)];if(_0xec7ee3[_0x298d9d(0x212)](_0xf565d4)){const _0x1a5b56=String(RegExp['$1']),_0x1db9df=_0x298d9d(0x2d6)['format'](_0x1a5b56),_0x3c564=VisuMZ[_0x298d9d(0x1e4)][_0x298d9d(0x335)](_0x3a62fe,_0x4e44bc);VisuMZ['SkillLearnSystem']['JS'][_0x3c564]=new Function(_0x1db9df);}},VisuMZ[_0x17690b(0x1e4)]['createConditionJS']=function(_0x235578,_0x22a20f,_0xd3104a){const _0x149167=_0x17690b,_0x674528=_0x235578['note'];if(_0x674528[_0x149167(0x212)](_0xd3104a)){const _0x4a7403=String(RegExp['$1']),_0x32dad3=_0x149167(0x231)[_0x149167(0x345)](_0x4a7403),_0x3702f0=VisuMZ[_0x149167(0x1e4)][_0x149167(0x335)](_0x235578,_0x22a20f);VisuMZ[_0x149167(0x1e4)]['JS'][_0x3702f0]=new Function(_0x32dad3);}},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x26a)]=function(_0x3a7b97,_0x13b94f,_0x1b4883){const _0x4b8e02=_0x17690b,_0x2c521c=_0x3a7b97['note'];if(_0x2c521c[_0x4b8e02(0x212)](_0x1b4883)){const _0x293da2=String(RegExp['$1']),_0x4ef11b=_0x4b8e02(0x2ee)[_0x4b8e02(0x345)](_0x293da2),_0x19d27b=VisuMZ[_0x4b8e02(0x1e4)][_0x4b8e02(0x335)](_0x3a7b97,_0x13b94f);VisuMZ[_0x4b8e02(0x1e4)]['JS'][_0x19d27b]=new Function(_0x4ef11b);}},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x3ad)]=function(_0x18e401,_0x5e44fe,_0x27b841){const _0x2a3396=_0x17690b,_0x4ca30b=_0x18e401[_0x2a3396(0x25d)];if(_0x4ca30b[_0x2a3396(0x212)](_0x27b841)){const _0x4b8df4=String(RegExp['$1']),_0x1bb374=_0x2a3396(0x2b6)['format'](_0x4b8df4),_0x2d13d6=VisuMZ[_0x2a3396(0x1e4)]['createKeyJS'](_0x18e401,_0x5e44fe);VisuMZ[_0x2a3396(0x1e4)]['JS'][_0x2d13d6]=new Function(_0x1bb374);}},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x335)]=function(_0x2234c1,_0x4097ff){const _0x2a9000=_0x17690b;if(VisuMZ['createKeyJS'])return VisuMZ[_0x2a9000(0x335)](_0x2234c1,_0x4097ff);let _0x619bb1='';if($dataActors['includes'](_0x2234c1))_0x619bb1=_0x2a9000(0x327)['format'](_0x2234c1['id'],_0x4097ff);if($dataClasses[_0x2a9000(0x2bf)](_0x2234c1))_0x619bb1=_0x2a9000(0x367)['format'](_0x2234c1['id'],_0x4097ff);if($dataSkills['includes'](_0x2234c1))_0x619bb1=_0x2a9000(0x207)['format'](_0x2234c1['id'],_0x4097ff);if($dataItems['includes'](_0x2234c1))_0x619bb1='Item-%1-%2'[_0x2a9000(0x345)](_0x2234c1['id'],_0x4097ff);if($dataWeapons[_0x2a9000(0x2bf)](_0x2234c1))_0x619bb1='Weapon-%1-%2'[_0x2a9000(0x345)](_0x2234c1['id'],_0x4097ff);if($dataArmors[_0x2a9000(0x2bf)](_0x2234c1))_0x619bb1=_0x2a9000(0x2e1)['format'](_0x2234c1['id'],_0x4097ff);if($dataEnemies[_0x2a9000(0x2bf)](_0x2234c1))_0x619bb1='Enemy-%1-%2'[_0x2a9000(0x345)](_0x2234c1['id'],_0x4097ff);if($dataStates['includes'](_0x2234c1))_0x619bb1=_0x2a9000(0x263)[_0x2a9000(0x345)](_0x2234c1['id'],_0x4097ff);return _0x619bb1;},DataManager[_0x17690b(0x2f0)]=function(_0x308f5f){const _0x7eaaa6=_0x17690b;if(!_0x308f5f)return![];return _0x308f5f[_0x7eaaa6(0x39a)]!==undefined&&_0x308f5f[_0x7eaaa6(0x32d)]!==undefined;},DataManager[_0x17690b(0x313)]=function(_0x14b00b){const _0xd61aa3=_0x17690b;_0x14b00b=_0x14b00b[_0xd61aa3(0x30c)]()[_0xd61aa3(0x1f6)](),this[_0xd61aa3(0x284)]=this['_classIDs']||{};if(this[_0xd61aa3(0x284)][_0x14b00b])return this[_0xd61aa3(0x284)][_0x14b00b];for(const _0x5e1b2a of $dataClasses){if(!_0x5e1b2a)continue;let _0x3bb2dc=_0x5e1b2a[_0xd61aa3(0x278)];_0x3bb2dc=_0x3bb2dc[_0xd61aa3(0x324)](/\x1I\[(\d+)\]/gi,''),_0x3bb2dc=_0x3bb2dc[_0xd61aa3(0x324)](/\\I\[(\d+)\]/gi,''),this[_0xd61aa3(0x284)][_0x3bb2dc[_0xd61aa3(0x30c)]()['trim']()]=_0x5e1b2a['id'];}return this['_classIDs'][_0x14b00b]||0x0;},DataManager[_0x17690b(0x221)]=function(_0xb81230){const _0x46ae3d=_0x17690b;_0xb81230=_0xb81230[_0x46ae3d(0x30c)]()[_0x46ae3d(0x1f6)](),this[_0x46ae3d(0x2a8)]=this[_0x46ae3d(0x2a8)]||{};if(this[_0x46ae3d(0x2a8)][_0xb81230])return this['_skillIDs'][_0xb81230];for(const _0x4c392a of $dataSkills){if(!_0x4c392a)continue;this[_0x46ae3d(0x2a8)][_0x4c392a[_0x46ae3d(0x278)]['toUpperCase']()[_0x46ae3d(0x1f6)]()]=_0x4c392a['id'];}return this[_0x46ae3d(0x2a8)][_0xb81230]||0x0;},DataManager[_0x17690b(0x203)]=function(_0x41c7f8){const _0xebb162=_0x17690b;_0x41c7f8=_0x41c7f8[_0xebb162(0x30c)]()[_0xebb162(0x1f6)](),this[_0xebb162(0x387)]=this[_0xebb162(0x387)]||{};if(this['_itemIDs'][_0x41c7f8])return this['_itemIDs'][_0x41c7f8];for(const _0x4e4108 of $dataItems){if(!_0x4e4108)continue;this[_0xebb162(0x387)][_0x4e4108[_0xebb162(0x278)][_0xebb162(0x30c)]()[_0xebb162(0x1f6)]()]=_0x4e4108['id'];}return this[_0xebb162(0x387)][_0x41c7f8]||0x0;},DataManager['getWeaponIdWithName']=function(_0x3172db){const _0x515139=_0x17690b;_0x3172db=_0x3172db['toUpperCase']()[_0x515139(0x1f6)](),this['_weaponIDs']=this[_0x515139(0x21a)]||{};if(this[_0x515139(0x21a)][_0x3172db])return this[_0x515139(0x21a)][_0x3172db];for(const _0x2eac75 of $dataWeapons){if(!_0x2eac75)continue;this[_0x515139(0x21a)][_0x2eac75[_0x515139(0x278)]['toUpperCase']()[_0x515139(0x1f6)]()]=_0x2eac75['id'];}return this[_0x515139(0x21a)][_0x3172db]||0x0;},DataManager[_0x17690b(0x1c1)]=function(_0x37f8a3){const _0x30fa1e=_0x17690b;_0x37f8a3=_0x37f8a3[_0x30fa1e(0x30c)]()['trim'](),this[_0x30fa1e(0x1f5)]=this[_0x30fa1e(0x1f5)]||{};if(this[_0x30fa1e(0x1f5)][_0x37f8a3])return this[_0x30fa1e(0x1f5)][_0x37f8a3];for(const _0x9d3358 of $dataArmors){if(!_0x9d3358)continue;this[_0x30fa1e(0x1f5)][_0x9d3358['name'][_0x30fa1e(0x30c)]()[_0x30fa1e(0x1f6)]()]=_0x9d3358['id'];}return this['_armorIDs'][_0x37f8a3]||0x0;},DataManager[_0x17690b(0x2cb)]=function(_0x227b0f){const _0x5085d0=_0x17690b;if(!$dataClasses[_0x227b0f])return[];const _0x446604=[],_0x21a63d=$dataClasses[_0x227b0f]['note'],_0x4bdc73=VisuMZ[_0x5085d0(0x1e4)]['RegExp'],_0x780140=_0x21a63d[_0x5085d0(0x212)](_0x4bdc73[_0x5085d0(0x262)]);if(_0x780140)for(const _0x33c33d of _0x780140){if(!_0x33c33d)continue;_0x33c33d['match'](_0x4bdc73[_0x5085d0(0x262)]);const _0x52bd55=String(RegExp['$1'])[_0x5085d0(0x2c0)](',')[_0x5085d0(0x1ff)](_0xdf4336=>_0xdf4336[_0x5085d0(0x1f6)]());;for(let _0x146b43 of _0x52bd55){_0x146b43=(String(_0x146b43)||'')[_0x5085d0(0x1f6)]();if(_0x146b43[_0x5085d0(0x212)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x47750e=Math['min'](Number(RegExp['$1']),Number(RegExp['$2'])),_0x3fff7f=Math[_0x5085d0(0x380)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x45b58a=_0x47750e;_0x45b58a<=_0x3fff7f;_0x45b58a++)_0x446604[_0x5085d0(0x385)](_0x45b58a);continue;}_0x146b43=(String(_0x146b43)||'')[_0x5085d0(0x1f6)]();const _0x2c828b=/^\d+$/[_0x5085d0(0x292)](_0x146b43);_0x2c828b?_0x446604[_0x5085d0(0x385)](Number(_0x146b43)):_0x446604[_0x5085d0(0x385)](DataManager[_0x5085d0(0x221)](_0x146b43));}}const _0x265148=_0x21a63d[_0x5085d0(0x212)](_0x4bdc73[_0x5085d0(0x1de)]);if(_0x265148)for(const _0x28a649 of _0x265148){if(!_0x28a649)continue;_0x28a649[_0x5085d0(0x212)](_0x4bdc73[_0x5085d0(0x1de)]);const _0xbcf3ff=String(RegExp['$1'])[_0x5085d0(0x2c0)](/[\r\n]+/);for(let _0x116658 of _0xbcf3ff){_0x116658=(String(_0x116658)||'')['trim']();if(_0x116658[_0x5085d0(0x212)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x13eefa=Math[_0x5085d0(0x1f0)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x1c5453=Math[_0x5085d0(0x380)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x22077c=_0x13eefa;_0x22077c<=_0x1c5453;_0x22077c++)_0x446604[_0x5085d0(0x385)](_0x22077c);continue;}const _0x2ae629=/^\d+$/[_0x5085d0(0x292)](_0x116658);_0x2ae629?_0x446604['push'](Number(_0x116658)):_0x446604['push'](DataManager['getSkillIdWithName'](_0x116658));}}return VisuMZ[_0x5085d0(0x240)]&&(_0x446604['sort']((_0x2f339d,_0x599e97)=>_0x2f339d-_0x599e97),VisuMZ[_0x5085d0(0x240)]['SortByIDandPriorityUsingIDs']&&VisuMZ[_0x5085d0(0x240)]['SortByIDandPriorityUsingIDs'](_0x446604)),_0x446604['filter'](_0x1fb69c=>$dataSkills[_0x1fb69c]&&$dataSkills[_0x1fb69c][_0x5085d0(0x278)]['trim']()!=='')[_0x5085d0(0x19f)]((_0x50490f,_0x29dcda,_0x4eba5e)=>_0x4eba5e[_0x5085d0(0x32a)](_0x50490f)===_0x29dcda);},DataManager[_0x17690b(0x2c1)]=function(_0x567db2){const _0x4f7ad5=_0x17690b;if(!_0x567db2)return 0x0;if(!DataManager['isSkill'](_0x567db2)&&!DataManager[_0x4f7ad5(0x2f0)](_0x567db2))return 0x0;const _0x37fc47=VisuMZ['SkillLearnSystem']['RegExp'],_0x4cd074=_0x567db2[_0x4f7ad5(0x25d)];if(_0x4cd074['match'](_0x37fc47['LearnApCost']))return Number(RegExp['$1']);if(_0x4cd074[_0x4f7ad5(0x212)](_0x37fc47[_0x4f7ad5(0x2d1)])){const _0x3b5447=String(RegExp['$1'])[_0x4f7ad5(0x2c0)](/[\r\n]+/);for(const _0x2c65aa of _0x3b5447){if(_0x2c65aa[_0x4f7ad5(0x212)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x381191=VisuMZ['SkillLearnSystem'][_0x4f7ad5(0x335)](_0x567db2,_0x4f7ad5(0x2e6));if(VisuMZ[_0x4f7ad5(0x1e4)]['JS'][_0x381191]){const _0x1e8d17=SceneManager[_0x4f7ad5(0x344)][_0x4f7ad5(0x2b8)]();return VisuMZ['SkillLearnSystem']['JS'][_0x381191][_0x4f7ad5(0x24c)](this,_0x1e8d17,_0x567db2);}return VisuMZ[_0x4f7ad5(0x1e4)][_0x4f7ad5(0x187)][_0x4f7ad5(0x317)]['DefaultCost']||0x0;},DataManager['getSkillLearnClassPointCost']=function(_0x19316b){const _0x4fd970=_0x17690b;if(!_0x19316b)return 0x0;if(!DataManager[_0x4fd970(0x321)](_0x19316b)&&!DataManager[_0x4fd970(0x2f0)](_0x19316b))return 0x0;const _0x3b69d8=VisuMZ[_0x4fd970(0x1e4)]['RegExp'],_0x2e87fc=_0x19316b['note'];if(_0x2e87fc[_0x4fd970(0x212)](_0x3b69d8[_0x4fd970(0x1d7)]))return Number(RegExp['$1']);if(_0x2e87fc['match'](_0x3b69d8[_0x4fd970(0x2d1)])){const _0x4922c1=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x467db7 of _0x4922c1){if(_0x467db7['match'](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x50f9f4=VisuMZ['SkillLearnSystem'][_0x4fd970(0x335)](_0x19316b,_0x4fd970(0x18f));if(VisuMZ[_0x4fd970(0x1e4)]['JS'][_0x50f9f4]){const _0x5dc142=SceneManager[_0x4fd970(0x344)][_0x4fd970(0x2b8)]();return VisuMZ['SkillLearnSystem']['JS'][_0x50f9f4][_0x4fd970(0x24c)](this,_0x5dc142,_0x19316b)||0x0;}return VisuMZ[_0x4fd970(0x2cf)][_0x4fd970(0x187)][_0x4fd970(0x297)][_0x4fd970(0x29a)]||0x0;},DataManager['getSkillLearnJobPointCost']=function(_0x6eef3b){const _0x2be413=_0x17690b;if(!_0x6eef3b)return 0x0;if(!DataManager[_0x2be413(0x321)](_0x6eef3b)&&!DataManager[_0x2be413(0x2f0)](_0x6eef3b))return 0x0;const _0x4361c3=VisuMZ[_0x2be413(0x1e4)][_0x2be413(0x196)],_0x1352c7=_0x6eef3b[_0x2be413(0x25d)];if(_0x1352c7[_0x2be413(0x212)](_0x4361c3[_0x2be413(0x34e)]))return Number(RegExp['$1']);if(_0x1352c7[_0x2be413(0x212)](_0x4361c3[_0x2be413(0x2d1)])){const _0x598485=String(RegExp['$1'])[_0x2be413(0x2c0)](/[\r\n]+/);for(const _0x93efce of _0x598485){if(_0x93efce[_0x2be413(0x212)](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x4f82bf=VisuMZ[_0x2be413(0x1e4)][_0x2be413(0x335)](_0x6eef3b,'jsLearnJpCost');if(VisuMZ[_0x2be413(0x1e4)]['JS'][_0x4f82bf]){const _0x830c9f=SceneManager[_0x2be413(0x344)][_0x2be413(0x2b8)]();return VisuMZ['SkillLearnSystem']['JS'][_0x4f82bf]['call'](this,_0x830c9f,_0x6eef3b);}return VisuMZ[_0x2be413(0x2cf)][_0x2be413(0x187)]['JobPoints'][_0x2be413(0x29a)]||0x0;},DataManager[_0x17690b(0x32e)]=function(_0x3e081f){const _0x518594=_0x17690b;if(!_0x3e081f)return 0x0;if(!DataManager[_0x518594(0x321)](_0x3e081f)&&!DataManager[_0x518594(0x2f0)](_0x3e081f))return 0x0;const _0x329af9=VisuMZ[_0x518594(0x1e4)][_0x518594(0x196)],_0x2998f8=_0x3e081f['note'];if(_0x2998f8[_0x518594(0x212)](_0x329af9[_0x518594(0x244)]))return Number(RegExp['$1']);if(_0x2998f8[_0x518594(0x212)](_0x329af9['LearnCostBatch'])){const _0x1eee99=String(RegExp['$1'])[_0x518594(0x2c0)](/[\r\n]+/);for(const _0x56d34e of _0x1eee99){if(_0x56d34e[_0x518594(0x212)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x5d6d8f=VisuMZ[_0x518594(0x1e4)][_0x518594(0x335)](_0x3e081f,_0x518594(0x371));if(VisuMZ[_0x518594(0x1e4)]['JS'][_0x5d6d8f]){const _0x4c40c9=SceneManager[_0x518594(0x344)]['user']();return VisuMZ['SkillLearnSystem']['JS'][_0x5d6d8f][_0x518594(0x24c)](this,_0x4c40c9,_0x3e081f);}return VisuMZ[_0x518594(0x1e4)]['Settings'][_0x518594(0x357)][_0x518594(0x29a)]||0x0;},DataManager[_0x17690b(0x18a)]=function(_0x52914f){const _0x467f6e=_0x17690b;if(!_0x52914f)return[];if(!DataManager[_0x467f6e(0x321)](_0x52914f)&&!DataManager['isState'](_0x52914f))return[];const _0x2b539d=VisuMZ[_0x467f6e(0x1e4)][_0x467f6e(0x196)],_0x2a6a4a=_0x52914f[_0x467f6e(0x25d)],_0x2e4aba=[],_0x17ec71=_0x2a6a4a[_0x467f6e(0x212)](_0x2b539d[_0x467f6e(0x1e2)]);if(_0x17ec71)for(const _0x3253fb of _0x17ec71){if(!_0x3253fb)continue;_0x3253fb[_0x467f6e(0x212)](_0x2b539d[_0x467f6e(0x1e2)]);const _0x2a76db=String(RegExp['$1']),_0x5a7d96={'id':0x0,'quantity':Number(RegExp['$2'])},_0x4206ba=/^\d+$/[_0x467f6e(0x292)](_0x2a76db);_0x4206ba?_0x5a7d96['id']=Number(_0x2a76db):_0x5a7d96['id']=DataManager[_0x467f6e(0x203)](_0x2a76db),_0x5a7d96['id']>0x0&&_0x2e4aba[_0x467f6e(0x385)](_0x5a7d96);}if(_0x2a6a4a[_0x467f6e(0x212)](_0x2b539d['LearnCostBatch'])){const _0x268d45=String(RegExp['$1'])[_0x467f6e(0x2c0)](/[\r\n]+/);for(const _0x4dc28b of _0x268d45){if(_0x4dc28b['match'](/ITEM[ ](.*):[ ](\d+)/gi)){const _0x1a00dd=String(RegExp['$1']),_0x255708={'id':0x0,'quantity':Number(RegExp['$2'])},_0x1a3ede=/^\d+$/[_0x467f6e(0x292)](_0x1a00dd);_0x1a3ede?_0x255708['id']=Number(_0x1a00dd):_0x255708['id']=DataManager['getItemIdWithName'](_0x1a00dd),_0x255708['id']>0x0&&_0x2e4aba[_0x467f6e(0x385)](_0x255708);}}}return _0x2e4aba;},DataManager[_0x17690b(0x188)]=function(_0x2ab9af){const _0x267d42=_0x17690b;if(!_0x2ab9af)return[];if(!DataManager['isSkill'](_0x2ab9af)&&!DataManager['isState'](_0x2ab9af))return[];const _0x4f0894=VisuMZ[_0x267d42(0x1e4)]['RegExp'],_0x2898c7=_0x2ab9af[_0x267d42(0x25d)],_0x28b83a=[],_0x4e9415=_0x2898c7[_0x267d42(0x212)](_0x4f0894[_0x267d42(0x1aa)]);if(_0x4e9415)for(const _0xe7cb24 of _0x4e9415){if(!_0xe7cb24)continue;_0xe7cb24[_0x267d42(0x212)](_0x4f0894[_0x267d42(0x1aa)]);const _0x30ea95=String(RegExp['$1']),_0x28a523={'id':0x0,'quantity':Number(RegExp['$2'])},_0x247ec2=/^\d+$/[_0x267d42(0x292)](_0x30ea95);_0x247ec2?_0x28a523['id']=Number(_0x30ea95):_0x28a523['id']=DataManager['getWeaponIdWithName'](_0x30ea95),_0x28a523['id']>0x0&&_0x28b83a['push'](_0x28a523);}if(_0x2898c7[_0x267d42(0x212)](_0x4f0894[_0x267d42(0x2d1)])){const _0x3b8b41=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x5333e7 of _0x3b8b41){if(_0x5333e7['match'](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x5a77cd=String(RegExp['$1']),_0x26e86a={'id':0x0,'quantity':Number(RegExp['$2'])},_0x2ff034=/^\d+$/[_0x267d42(0x292)](_0x5a77cd);_0x2ff034?_0x26e86a['id']=Number(_0x5a77cd):_0x26e86a['id']=DataManager[_0x267d42(0x276)](_0x5a77cd),_0x26e86a['id']>0x0&&_0x28b83a[_0x267d42(0x385)](_0x26e86a);}}}return _0x28b83a;},DataManager[_0x17690b(0x373)]=function(_0x504915){const _0xeaba06=_0x17690b;if(!_0x504915)return[];if(!DataManager[_0xeaba06(0x321)](_0x504915)&&!DataManager['isState'](_0x504915))return[];const _0x2412cb=VisuMZ[_0xeaba06(0x1e4)][_0xeaba06(0x196)],_0x29f88c=_0x504915[_0xeaba06(0x25d)],_0x1ca186=[],_0x397ab3=_0x29f88c[_0xeaba06(0x212)](_0x2412cb[_0xeaba06(0x1c7)]);if(_0x397ab3)for(const _0xc95edf of _0x397ab3){if(!_0xc95edf)continue;_0xc95edf[_0xeaba06(0x212)](_0x2412cb[_0xeaba06(0x1c7)]);const _0x3f5565=String(RegExp['$1']),_0xe9e6f0={'id':0x0,'quantity':Number(RegExp['$2'])},_0x51697e=/^\d+$/[_0xeaba06(0x292)](_0x3f5565);_0x51697e?_0xe9e6f0['id']=Number(_0x3f5565):_0xe9e6f0['id']=DataManager[_0xeaba06(0x1c1)](_0x3f5565),_0xe9e6f0['id']>0x0&&_0x1ca186[_0xeaba06(0x385)](_0xe9e6f0);}if(_0x29f88c[_0xeaba06(0x212)](_0x2412cb[_0xeaba06(0x2d1)])){const _0x3b4dfd=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x55f641 of _0x3b4dfd){if(_0x55f641[_0xeaba06(0x212)](/ARMOR[ ](.*):[ ](\d+)/gi)){const _0x377c3c=String(RegExp['$1']),_0x6d186a={'id':0x0,'quantity':Number(RegExp['$2'])},_0x5ea43a=/^\d+$/[_0xeaba06(0x292)](_0x377c3c);_0x5ea43a?_0x6d186a['id']=Number(_0x377c3c):_0x6d186a['id']=DataManager[_0xeaba06(0x1c1)](_0x377c3c),_0x6d186a['id']>0x0&&_0x1ca186[_0xeaba06(0x385)](_0x6d186a);}}}return _0x1ca186;},DataManager[_0x17690b(0x24b)]=function(_0xcfeeb7){const _0xce65e3=_0x17690b;if(!_0xcfeeb7)return 0x0;if(!DataManager[_0xce65e3(0x321)](_0xcfeeb7)&&!DataManager[_0xce65e3(0x2f0)](_0xcfeeb7))return 0x0;const _0xc48674=VisuMZ['SkillLearnSystem'][_0xce65e3(0x196)],_0x7ec6d7=_0xcfeeb7['note'];if(_0x7ec6d7[_0xce65e3(0x212)](_0xc48674[_0xce65e3(0x1c4)]))return Number(RegExp['$1']);if(_0x7ec6d7[_0xce65e3(0x212)](_0xc48674[_0xce65e3(0x2d1)])){const _0x56b131=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x2f6cc8 of _0x56b131){if(_0x2f6cc8[_0xce65e3(0x212)](/GOLD:[ ](\d+)/gi))return Number(RegExp['$1']);}}return 0x0;},TextManager[_0x17690b(0x38c)]=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x272)]['Icon'],ImageManager['abilityPointsIcon']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x317)]['Icon'],ImageManager['skillPointsIcon']=VisuMZ['SkillLearnSystem']['Settings'][_0x17690b(0x357)][_0x17690b(0x35c)],SoundManager['playSkillLearn']=function(){const _0x64c84b=_0x17690b;AudioManager[_0x64c84b(0x338)](VisuMZ[_0x64c84b(0x1e4)][_0x64c84b(0x187)][_0x64c84b(0x29b)]);},TextManager[_0x17690b(0x1af)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x259)][_0x17690b(0x305)],TextManager['skillLearnReqHeaderFmt']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x259)][_0x17690b(0x2a4)],TextManager[_0x17690b(0x330)]=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x259)]['ReqSeparateFmt'],TextManager['skillLearnReqLevelFmt']=VisuMZ['SkillLearnSystem'][_0x17690b(0x187)][_0x17690b(0x259)][_0x17690b(0x2f1)],TextManager[_0x17690b(0x37b)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['General'][_0x17690b(0x1ae)],TextManager['skillLearnReqSwitchFmt']=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x259)][_0x17690b(0x205)],TextManager['skillLearnSeparationFmt']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x259)][_0x17690b(0x216)],TextManager['skillLearnItemFmt']=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x259)][_0x17690b(0x1b7)],TextManager['skillLearnWeaponFmt']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x259)]['WeaponFmt'],TextManager[_0x17690b(0x2bb)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['General'][_0x17690b(0x222)],TextManager['skillLearnGoldFmt']=VisuMZ['SkillLearnSystem'][_0x17690b(0x187)][_0x17690b(0x259)]['GoldFmt'],TextManager[_0x17690b(0x37c)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x272)][_0x17690b(0x1e5)],TextManager[_0x17690b(0x291)]=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x329)][_0x17690b(0x1cb)],TextManager[_0x17690b(0x310)]=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x329)][_0x17690b(0x226)],TextManager[_0x17690b(0x319)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x329)]['ReqNotMetFmt'],TextManager[_0x17690b(0x2f7)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['Window'][_0x17690b(0x2f1)],TextManager['skillLearnReqListSkill']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['Window'][_0x17690b(0x1ae)],TextManager[_0x17690b(0x3a8)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['Window']['ReqSwitchFmt'],TextManager[_0x17690b(0x1a9)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x329)]['LearningTitle'],TextManager['skillLearningName']=VisuMZ['SkillLearnSystem'][_0x17690b(0x187)]['Window'][_0x17690b(0x1fe)],TextManager[_0x17690b(0x1ec)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x329)][_0x17690b(0x2fe)],TextManager['skillLearningOwned']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x329)][_0x17690b(0x1b1)],TextManager[_0x17690b(0x1c3)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['Window'][_0x17690b(0x2f4)],TextManager[_0x17690b(0x3a0)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x329)][_0x17690b(0x26e)],TextManager['abilityPointsFull']=VisuMZ['SkillLearnSystem'][_0x17690b(0x187)]['AbilityPoints'][_0x17690b(0x342)],TextManager[_0x17690b(0x333)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['AbilityPoints'][_0x17690b(0x31d)],TextManager[_0x17690b(0x1bf)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x317)][_0x17690b(0x2a3)],TextManager['skillPointsFull']=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)]['SkillPoints'][_0x17690b(0x342)],TextManager[_0x17690b(0x328)]=VisuMZ['SkillLearnSystem'][_0x17690b(0x187)][_0x17690b(0x357)][_0x17690b(0x31d)],TextManager[_0x17690b(0x218)]=VisuMZ[_0x17690b(0x1e4)]['Settings'][_0x17690b(0x357)]['TextFmt'],TextManager['skillLearnStypeCategory']=VisuMZ['SkillLearnSystem'][_0x17690b(0x187)][_0x17690b(0x357)]['SeparateCategoryFmt']??'%1',TextManager[_0x17690b(0x36e)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x357)][_0x17690b(0x2ed)]??_0x17690b(0x2a2),TextManager[_0x17690b(0x3b5)]=VisuMZ['SkillLearnSystem']['Settings'][_0x17690b(0x357)][_0x17690b(0x2e7)]??_0x17690b(0x1d0),TextManager[_0x17690b(0x239)]=VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x187)][_0x17690b(0x357)][_0x17690b(0x358)]??'16',VisuMZ['SkillLearnSystem'][_0x17690b(0x311)]=BattleManager[_0x17690b(0x370)],BattleManager[_0x17690b(0x370)]=function(){const _0x562a42=_0x17690b;VisuMZ[_0x562a42(0x1e4)][_0x562a42(0x311)][_0x562a42(0x24c)](this),this[_0x562a42(0x1e1)](),this[_0x562a42(0x351)](),this[_0x562a42(0x2f5)](),this[_0x562a42(0x302)]();},VisuMZ[_0x17690b(0x1e4)]['BattleManager_displayRewards']=BattleManager[_0x17690b(0x2be)],BattleManager[_0x17690b(0x2be)]=function(){const _0x5cecba=_0x17690b;VisuMZ[_0x5cecba(0x1e4)]['BattleManager_displayRewards'][_0x5cecba(0x24c)](this),this[_0x5cecba(0x36d)](),this[_0x5cecba(0x27b)]();},BattleManager['makeRewardsAbilityPoints']=function(){const _0x46654a=_0x17690b;this[_0x46654a(0x217)]['abilityPoints']=$gameTroop['abilityPointsTotal']();},BattleManager[_0x17690b(0x36d)]=function(){const _0x3339a6=_0x17690b;if(!this[_0x3339a6(0x38b)]())return;$gameMessage[_0x3339a6(0x26d)]();const _0x399bd6=$gameParty[_0x3339a6(0x1a1)](),_0x27dec6=VisuMZ[_0x3339a6(0x1e4)][_0x3339a6(0x187)][_0x3339a6(0x317)],_0x27e0c8=_0x27dec6[_0x3339a6(0x1a5)];for(const _0x3f6b8f of _0x399bd6){if(!_0x3f6b8f)continue;const _0x3b3600=_0x27e0c8[_0x3339a6(0x345)](_0x3f6b8f[_0x3339a6(0x278)](),_0x3f6b8f[_0x3339a6(0x2d8)](),TextManager[_0x3339a6(0x333)],TextManager[_0x3339a6(0x1bf)]);$gameMessage[_0x3339a6(0x37e)]('\x5c.'+_0x3b3600);}},BattleManager[_0x17690b(0x351)]=function(){const _0xd648cd=_0x17690b;this['_rewards'][_0xd648cd(0x23c)]=this['_rewards'][_0xd648cd(0x23c)]||0x0;let _0x4d9a63=$gameParty[_0xd648cd(0x39f)]();VisuMZ[_0xd648cd(0x1e4)][_0xd648cd(0x187)][_0xd648cd(0x317)][_0xd648cd(0x22f)]&&(_0x4d9a63=_0x4d9a63['filter'](_0x196e58=>_0x196e58[_0xd648cd(0x25f)]()));for(const _0x5a3f01 of _0x4d9a63){if(!_0x5a3f01)continue;if(!$dataSystem[_0xd648cd(0x2aa)]&&!_0x5a3f01[_0xd648cd(0x2f6)]())continue;_0x5a3f01['gainAbilityPoints'](this[_0xd648cd(0x217)][_0xd648cd(0x23c)]),_0x5a3f01['gainAbilityPointsForMulticlasses'](this[_0xd648cd(0x217)][_0xd648cd(0x23c)]);}},BattleManager[_0x17690b(0x38b)]=function(){const _0x16924e=_0x17690b;return VisuMZ[_0x16924e(0x1e4)]['Settings'][_0x16924e(0x317)][_0x16924e(0x1a6)];},BattleManager[_0x17690b(0x2f5)]=function(){const _0x292391=_0x17690b;this[_0x292391(0x217)]['skillPoints']=$gameTroop[_0x292391(0x294)]();},BattleManager[_0x17690b(0x27b)]=function(){const _0x5c60a4=_0x17690b;if(!this[_0x5c60a4(0x307)]())return;$gameMessage[_0x5c60a4(0x26d)]();const _0x99f320=$gameParty[_0x5c60a4(0x1a1)](),_0x48c5ad=VisuMZ['SkillLearnSystem'][_0x5c60a4(0x187)][_0x5c60a4(0x357)],_0x25bdc8=_0x48c5ad[_0x5c60a4(0x1a5)];for(const _0x30e380 of _0x99f320){if(!_0x30e380)continue;const _0x467bfc=_0x25bdc8[_0x5c60a4(0x345)](_0x30e380[_0x5c60a4(0x278)](),_0x30e380[_0x5c60a4(0x34f)](),TextManager[_0x5c60a4(0x328)],TextManager[_0x5c60a4(0x218)]);$gameMessage[_0x5c60a4(0x37e)]('\x5c.'+_0x467bfc);}},BattleManager[_0x17690b(0x302)]=function(){const _0x21df7e=_0x17690b;this[_0x21df7e(0x217)][_0x21df7e(0x39b)]=this['_rewards'][_0x21df7e(0x39b)]||0x0;let _0x9a42e8=$gameParty['allMembers']();VisuMZ[_0x21df7e(0x1e4)][_0x21df7e(0x187)][_0x21df7e(0x357)][_0x21df7e(0x22f)]&&(_0x9a42e8=_0x9a42e8[_0x21df7e(0x19f)](_0x2ee712=>_0x2ee712[_0x21df7e(0x25f)]()));for(const _0x4be8b5 of _0x9a42e8){if(!_0x4be8b5)continue;if(!$dataSystem[_0x21df7e(0x2aa)]&&!_0x4be8b5[_0x21df7e(0x2f6)]())continue;_0x4be8b5[_0x21df7e(0x287)](this['_rewards'][_0x21df7e(0x39b)]),_0x4be8b5[_0x21df7e(0x199)](this[_0x21df7e(0x217)]['skillPoints']);}},BattleManager[_0x17690b(0x307)]=function(){const _0x5bde39=_0x17690b;return VisuMZ[_0x5bde39(0x1e4)][_0x5bde39(0x187)]['SkillPoints'][_0x5bde39(0x1a6)];},VisuMZ[_0x17690b(0x1e4)]['Game_System_initialize']=Game_System[_0x17690b(0x20c)]['initialize'],Game_System[_0x17690b(0x20c)][_0x17690b(0x26c)]=function(){const _0x4e11c8=_0x17690b;VisuMZ[_0x4e11c8(0x1e4)][_0x4e11c8(0x1b6)][_0x4e11c8(0x24c)](this),this[_0x4e11c8(0x20f)]();},Game_System[_0x17690b(0x20c)]['initSkillLearnSystemMenuAccess']=function(){const _0x57f172=_0x17690b;this['_SkillLearnSystem_MenuAccess']=VisuMZ['SkillLearnSystem'][_0x57f172(0x187)][_0x57f172(0x272)]['ShowMenu'];},Game_System[_0x17690b(0x20c)][_0x17690b(0x247)]=function(){const _0xd75d0a=_0x17690b;return this[_0xd75d0a(0x304)]===undefined&&this[_0xd75d0a(0x20f)](),this[_0xd75d0a(0x304)];},Game_System[_0x17690b(0x20c)][_0x17690b(0x1ef)]=function(_0x26536c){const _0x57a81c=_0x17690b;this[_0x57a81c(0x304)]===undefined&&this['initSkillLearnSystemMenuAccess'](),this[_0x57a81c(0x304)]=_0x26536c;},VisuMZ[_0x17690b(0x1e4)]['Game_Action_applyItemUserEffect']=Game_Action[_0x17690b(0x20c)][_0x17690b(0x381)],Game_Action[_0x17690b(0x20c)]['applyItemUserEffect']=function(_0x59ff7b){const _0x2fa0bf=_0x17690b;VisuMZ[_0x2fa0bf(0x1e4)]['Game_Action_applyItemUserEffect']['call'](this,_0x59ff7b),this[_0x2fa0bf(0x2db)](_0x59ff7b);},Game_Action[_0x17690b(0x20c)][_0x17690b(0x2db)]=function(_0x3b7a5e){const _0x3910ac=_0x17690b;if(this[_0x3910ac(0x388)]())this[_0x3910ac(0x1cf)](_0x3b7a5e);},Game_Action[_0x17690b(0x20c)][_0x17690b(0x1cf)]=function(_0xe8b616){const _0x319987=_0x17690b,_0xaa158a=VisuMZ['SkillLearnSystem'][_0x319987(0x196)],_0x4d98a9=this[_0x319987(0x388)]()[_0x319987(0x25d)];if($gameParty[_0x319987(0x3a2)]()){if(this[_0x319987(0x30d)]()['isActor']()&&_0x4d98a9['match'](_0xaa158a['UserGainAbilityPoints'])){const _0x310eff=eval(RegExp['$1']);this[_0x319987(0x30d)]()[_0x319987(0x308)](_0x310eff);}else this[_0x319987(0x2a1)]();if(_0xe8b616[_0x319987(0x266)]()&&_0x4d98a9[_0x319987(0x212)](_0xaa158a[_0x319987(0x253)])){const _0x1e268d=eval(RegExp['$1']);_0xe8b616[_0x319987(0x308)](_0x1e268d);}}if($gameParty[_0x319987(0x3a2)]()){if(this[_0x319987(0x30d)]()['isActor']()&&_0x4d98a9['match'](_0xaa158a['UserGainSkillPoints'])){const _0x5b00b7=eval(RegExp['$1']);this[_0x319987(0x30d)]()['gainSkillPoints'](_0x5b00b7);}else this[_0x319987(0x1bd)]();if(_0xe8b616[_0x319987(0x266)]()&&_0x4d98a9[_0x319987(0x212)](_0xaa158a[_0x319987(0x389)])){const _0x355fbe=eval(RegExp['$1']);_0xe8b616['gainSkillPoints'](_0x355fbe);}}if(_0x4d98a9[_0x319987(0x212)](/<NOTETAG>/i)){}},Game_Action[_0x17690b(0x20c)][_0x17690b(0x2a1)]=function(){const _0x29075e=_0x17690b;if(!$gameParty[_0x29075e(0x3a2)]())return;if(!this[_0x29075e(0x30d)]()[_0x29075e(0x266)]())return;const _0x29f639=VisuMZ[_0x29075e(0x1e4)]['Settings'][_0x29075e(0x317)];let _0x408e8=0x0;try{_0x408e8=eval(_0x29f639[_0x29075e(0x35a)]);}catch(_0x43ac7b){if($gameTemp[_0x29075e(0x30b)]())console[_0x29075e(0x20e)](_0x43ac7b);}this[_0x29075e(0x30d)]()[_0x29075e(0x308)](_0x408e8);},Game_Action['prototype'][_0x17690b(0x1bd)]=function(){const _0x2c1a9a=_0x17690b;if(!$gameParty['inBattle']())return;if(!this[_0x2c1a9a(0x30d)]()[_0x2c1a9a(0x266)]())return;const _0x5ee6aa=VisuMZ['SkillLearnSystem']['Settings']['SkillPoints'];let _0x3ec04e=0x0;try{_0x3ec04e=eval(_0x5ee6aa['PerAction']);}catch(_0x49398b){if($gameTemp[_0x2c1a9a(0x30b)]())console[_0x2c1a9a(0x20e)](_0x49398b);}this[_0x2c1a9a(0x30d)]()['gainSkillPoints'](_0x3ec04e);},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x264)]=Game_Battler[_0x17690b(0x20c)][_0x17690b(0x242)],Game_Battler[_0x17690b(0x20c)][_0x17690b(0x242)]=function(_0x3cbace){const _0x5854ad=_0x17690b;VisuMZ[_0x5854ad(0x1e4)][_0x5854ad(0x264)]['call'](this,_0x3cbace),this[_0x5854ad(0x266)]()&&(this[_0x5854ad(0x2ba)]=this['getAbilityPoints'](),this[_0x5854ad(0x2ec)]=this[_0x5854ad(0x2b4)]());},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x1a4)]=Game_Actor['prototype'][_0x17690b(0x28f)],Game_Actor['prototype'][_0x17690b(0x28f)]=function(_0x59c90a){const _0x38cc1f=_0x17690b;VisuMZ[_0x38cc1f(0x1e4)][_0x38cc1f(0x1a4)][_0x38cc1f(0x24c)](this,_0x59c90a),this[_0x38cc1f(0x236)](),this[_0x38cc1f(0x35f)](),this[_0x38cc1f(0x2a9)](),this['gainStartingSkillPoints']();},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x364)]=Game_Actor[_0x17690b(0x20c)][_0x17690b(0x1e8)],Game_Actor[_0x17690b(0x20c)][_0x17690b(0x1e8)]=function(_0x523f1c,_0x1165c9){const _0x1cbee1=_0x17690b;this['_SkillLearnSystem_preventLevelUpGain']=!![],VisuMZ[_0x1cbee1(0x1e4)][_0x1cbee1(0x364)]['call'](this,_0x523f1c,_0x1165c9),this['_SkillLearnSystem_preventLevelUpGain']=undefined;},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x1dd)]=Game_Actor[_0x17690b(0x20c)][_0x17690b(0x24a)],Game_Actor['prototype']['levelUp']=function(){const _0x2f358e=_0x17690b;VisuMZ[_0x2f358e(0x1e4)][_0x2f358e(0x1dd)]['call'](this),this[_0x2f358e(0x397)](this[_0x2f358e(0x1da)]()['id']),this['levelUpGainSkillPoints'](this['currentClass']()['id']);},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x236)]=function(){const _0x240417=_0x17690b;this[_0x240417(0x25e)]={};},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x35f)]=function(){const _0x49df4f=_0x17690b,_0x291e7f=VisuMZ[_0x49df4f(0x1e4)][_0x49df4f(0x196)],_0xde5b0=this[_0x49df4f(0x2f8)]()[_0x49df4f(0x25d)];if(_0xde5b0[_0x49df4f(0x212)](_0x291e7f[_0x49df4f(0x2c9)])){const _0x55a346=eval(RegExp['$1']);this[_0x49df4f(0x308)](_0x55a346);}const _0x12bd1e=VisuMZ['SkillLearnSystem'][_0x49df4f(0x187)][_0x49df4f(0x317)];if(!_0x12bd1e['SharedResource'])return;const _0x4a322b=_0xde5b0[_0x49df4f(0x212)](_0x291e7f[_0x49df4f(0x1cc)]);if(_0x4a322b)for(const _0x23b9e0 of _0x4a322b){if(!_0x23b9e0)continue;_0x23b9e0['match'](_0x291e7f[_0x49df4f(0x1cc)]);const _0x105de9=String(RegExp['$1']),_0x376ba1=eval(RegExp['$2']),_0x2efcbe=/^\d+$/['test'](_0x105de9);let _0x382946=0x0;_0x2efcbe?_0x382946=Number(_0x105de9):_0x382946=DataManager[_0x49df4f(0x313)](_0x105de9),this['gainAbilityPoints'](_0x376ba1,_0x382946);}},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x23f)]=function(_0x13e20b){const _0x38b59c=_0x17690b;this[_0x38b59c(0x25e)]===undefined&&this['initAbilityPoints']();const _0x223242=VisuMZ[_0x38b59c(0x1e4)][_0x38b59c(0x187)][_0x38b59c(0x317)];return _0x223242[_0x38b59c(0x208)]?_0x13e20b=0x0:_0x13e20b=_0x13e20b||this[_0x38b59c(0x1da)]()['id'],this[_0x38b59c(0x25e)][_0x13e20b]=this[_0x38b59c(0x25e)][_0x13e20b]||0x0,Math[_0x38b59c(0x3a7)](this[_0x38b59c(0x25e)][_0x13e20b]);},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x280)]=function(_0x43ec62,_0x3d06e0){const _0x347ab1=_0x17690b;this['_abilityPoints']===undefined&&this[_0x347ab1(0x236)]();const _0x68f125=VisuMZ[_0x347ab1(0x1e4)][_0x347ab1(0x187)]['AbilityPoints'];_0x68f125[_0x347ab1(0x208)]?_0x3d06e0=0x0:_0x3d06e0=_0x3d06e0||this[_0x347ab1(0x1da)]()['id'];this[_0x347ab1(0x25e)][_0x3d06e0]=this['_abilityPoints'][_0x3d06e0]||0x0,this[_0x347ab1(0x25e)][_0x3d06e0]=Math[_0x347ab1(0x3a7)](_0x43ec62||0x0);const _0x189de5=_0x68f125[_0x347ab1(0x34b)]||Number['MAX_SAFE_INTEGER'];this[_0x347ab1(0x25e)][_0x3d06e0]=this['_abilityPoints'][_0x3d06e0][_0x347ab1(0x2cc)](0x0,_0x189de5);},Game_Actor['prototype'][_0x17690b(0x308)]=function(_0x459cf5,_0x5b87ef){const _0x4597fe=_0x17690b;_0x459cf5>0x0&&(_0x459cf5*=this[_0x4597fe(0x31f)]()),this[_0x4597fe(0x1d8)](_0x459cf5,_0x5b87ef);},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x246)]=function(_0x2b581d){const _0x336077=_0x17690b;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x2b581d>0x0&&(_0x2b581d*=this[_0x336077(0x31f)]()),this[_0x336077(0x2c5)](_0x2b581d,_0x336077(0x2c6));},Game_Actor[_0x17690b(0x20c)]['addAbilityPoints']=function(_0x4c55e9,_0x44288e){const _0x284336=_0x17690b,_0x46250b=VisuMZ[_0x284336(0x1e4)]['Settings'][_0x284336(0x317)];_0x46250b['SharedResource']?_0x44288e=0x0:_0x44288e=_0x44288e||this[_0x284336(0x1da)]()['id'],_0x4c55e9+=this[_0x284336(0x23f)](_0x44288e),this[_0x284336(0x280)](_0x4c55e9,_0x44288e);},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x223)]=function(_0x193cb6,_0x186c2d){const _0x39861a=_0x17690b;this[_0x39861a(0x1d8)](-_0x193cb6,_0x186c2d);},Game_Actor[_0x17690b(0x20c)]['abilityPointsRate']=function(){const _0x3fe23a=_0x17690b,_0x36123d=VisuMZ['SkillLearnSystem'][_0x3fe23a(0x196)],_0x27f4c6=this[_0x3fe23a(0x234)]()[_0x3fe23a(0x229)](null)[_0x3fe23a(0x229)](undefined);let _0x3ca567=0x1;return _0x3ca567=_0x27f4c6[_0x3fe23a(0x192)]((_0x4f99d5,_0x1df695)=>{const _0x2063a8=_0x3fe23a;return _0x1df695&&_0x1df695[_0x2063a8(0x25d)][_0x2063a8(0x212)](_0x36123d[_0x2063a8(0x2f9)])?_0x4f99d5+Number(RegExp['$1'])*0.01:_0x4f99d5;},_0x3ca567),_0x3ca567=_0x27f4c6[_0x3fe23a(0x192)]((_0x104702,_0x3c679a)=>{const _0x4bf21a=_0x3fe23a;return _0x3c679a&&_0x3c679a[_0x4bf21a(0x25d)][_0x4bf21a(0x212)](_0x36123d['AbilityPointsRate'])?_0x104702*(Number(RegExp['$1'])*0.01):_0x104702;},_0x3ca567),_0x3ca567=_0x27f4c6[_0x3fe23a(0x192)]((_0x2ed282,_0x31c4f9)=>{return _0x31c4f9&&_0x31c4f9['note']['match'](_0x36123d['AbilityPointsFlat'])?_0x2ed282+Number(RegExp['$1'])*0.01:_0x2ed282;},_0x3ca567),_0x3ca567;},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x397)]=function(_0x5421d1){const _0xbd0a4f=_0x17690b;if(this[_0xbd0a4f(0x1b9)])return;const _0x5bcb92=VisuMZ[_0xbd0a4f(0x1e4)][_0xbd0a4f(0x187)][_0xbd0a4f(0x317)];let _0x308841=0x0;try{_0x308841=eval(_0x5bcb92['PerLevelUp']);}catch(_0x3fe325){if($gameTemp[_0xbd0a4f(0x30b)]())console['log'](_0x3fe325);}this[_0xbd0a4f(0x308)](_0x308841,_0x5421d1);},Game_Actor['prototype'][_0x17690b(0x2d8)]=function(){const _0x2a24d9=_0x17690b;return this[_0x2a24d9(0x2ba)]=this[_0x2a24d9(0x2ba)]||0x0,this[_0x2a24d9(0x23f)]()-this[_0x2a24d9(0x2ba)];},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x2a9)]=function(){this['_skillPoints']={};},Game_Actor['prototype'][_0x17690b(0x2c3)]=function(){const _0xdb3ea1=_0x17690b,_0x54705c=VisuMZ[_0xdb3ea1(0x1e4)][_0xdb3ea1(0x196)],_0x293d36=this[_0xdb3ea1(0x2f8)]()['note'];if(_0x293d36['match'](_0x54705c[_0xdb3ea1(0x33e)])){const _0x26d335=eval(RegExp['$1']);this[_0xdb3ea1(0x287)](_0x26d335);}const _0x50524c=VisuMZ[_0xdb3ea1(0x1e4)][_0xdb3ea1(0x187)][_0xdb3ea1(0x357)];if(!_0x50524c['SharedResource'])return;const _0x586307=_0x293d36['match'](_0x54705c['StartClassSkillPoints']);if(_0x586307)for(const _0x319a3b of _0x586307){if(!_0x319a3b)continue;_0x319a3b[_0xdb3ea1(0x212)](_0x54705c[_0xdb3ea1(0x1ed)]);const _0x3a4599=String(RegExp['$1']),_0x469720=eval(RegExp['$2']),_0x3a4a26=/^\d+$/['test'](_0x3a4599);let _0x2b9785=0x0;_0x3a4a26?_0x2b9785=Number(_0x3a4599):_0x2b9785=DataManager[_0xdb3ea1(0x313)](_0x3a4599),this[_0xdb3ea1(0x287)](_0x469720,_0x2b9785);}},Game_Actor[_0x17690b(0x20c)]['getSkillPoints']=function(_0x160f66){const _0x5d2e58=_0x17690b;this[_0x5d2e58(0x365)]===undefined&&this[_0x5d2e58(0x2a9)]();const _0x43fa03=VisuMZ[_0x5d2e58(0x1e4)][_0x5d2e58(0x187)][_0x5d2e58(0x357)];return _0x43fa03[_0x5d2e58(0x208)]?_0x160f66=0x0:_0x160f66=_0x160f66||this[_0x5d2e58(0x1da)]()['id'],this['_skillPoints'][_0x160f66]=this[_0x5d2e58(0x365)][_0x160f66]||0x0,Math[_0x5d2e58(0x3a7)](this[_0x5d2e58(0x365)][_0x160f66]);},Game_Actor[_0x17690b(0x20c)]['setSkillPoints']=function(_0x20c832,_0x11ef7b){const _0x4e42c1=_0x17690b;this['_skillPoints']===undefined&&this[_0x4e42c1(0x2a9)]();const _0x1b8ad0=VisuMZ[_0x4e42c1(0x1e4)][_0x4e42c1(0x187)][_0x4e42c1(0x357)];_0x1b8ad0[_0x4e42c1(0x208)]?_0x11ef7b=0x0:_0x11ef7b=_0x11ef7b||this[_0x4e42c1(0x1da)]()['id'];this[_0x4e42c1(0x365)][_0x11ef7b]=this[_0x4e42c1(0x365)][_0x11ef7b]||0x0,this[_0x4e42c1(0x365)][_0x11ef7b]=Math['round'](_0x20c832||0x0);const _0x5728d1=_0x1b8ad0[_0x4e42c1(0x34b)]||Number[_0x4e42c1(0x374)];this[_0x4e42c1(0x365)][_0x11ef7b]=this['_skillPoints'][_0x11ef7b][_0x4e42c1(0x2cc)](0x0,_0x5728d1);},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x287)]=function(_0x364335,_0x344e5b){const _0x1ca525=_0x17690b;_0x364335>0x0&&(_0x364335*=this[_0x1ca525(0x36b)]()),this[_0x1ca525(0x2b0)](_0x364335,_0x344e5b);},Game_Actor['prototype'][_0x17690b(0x199)]=function(_0x352f89){const _0x522ddf=_0x17690b;if(!Imported[_0x522ddf(0x27a)])return;_0x352f89>0x0&&(_0x352f89*=this[_0x522ddf(0x36b)]()),this['gainMulticlassRewardPoints'](_0x352f89,_0x522ddf(0x361));},Game_Actor['prototype']['addSkillPoints']=function(_0x183b45,_0xd62090){const _0x2a8af4=_0x17690b,_0x4242a0=VisuMZ[_0x2a8af4(0x1e4)]['Settings'][_0x2a8af4(0x357)];_0x4242a0[_0x2a8af4(0x208)]?_0xd62090=0x0:_0xd62090=_0xd62090||this[_0x2a8af4(0x1da)]()['id'],_0x183b45+=this[_0x2a8af4(0x2b4)](_0xd62090),this[_0x2a8af4(0x233)](_0x183b45,_0xd62090);},Game_Actor[_0x17690b(0x20c)]['loseSkillPoints']=function(_0x48da75,_0x2eff81){const _0x1c54cf=_0x17690b;this[_0x1c54cf(0x2b0)](-_0x48da75,_0x2eff81);},Game_Actor[_0x17690b(0x20c)]['skillPointsRate']=function(){const _0x33376b=_0x17690b,_0x4567ea=VisuMZ[_0x33376b(0x1e4)][_0x33376b(0x196)],_0x32b12c=this['traitObjects']()[_0x33376b(0x229)](null)['remove'](undefined);let _0x5e6866=0x1;return _0x5e6866=_0x32b12c[_0x33376b(0x192)]((_0x2ac85,_0x5356e6)=>{const _0x152ad1=_0x33376b;return _0x5356e6&&_0x5356e6[_0x152ad1(0x25d)][_0x152ad1(0x212)](_0x4567ea[_0x152ad1(0x36a)])?_0x2ac85+Number(RegExp['$1'])*0.01:_0x2ac85;},_0x5e6866),_0x5e6866=_0x32b12c[_0x33376b(0x192)]((_0x4986ac,_0x4aea5c)=>{const _0x243d42=_0x33376b;return _0x4aea5c&&_0x4aea5c[_0x243d42(0x25d)][_0x243d42(0x212)](_0x4567ea[_0x243d42(0x28c)])?_0x4986ac*(Number(RegExp['$1'])*0.01):_0x4986ac;},_0x5e6866),_0x5e6866=_0x32b12c[_0x33376b(0x192)]((_0x5bc0a3,_0xd382ec)=>{const _0x34cdab=_0x33376b;return _0xd382ec&&_0xd382ec[_0x34cdab(0x25d)][_0x34cdab(0x212)](_0x4567ea['SkillPointsFlat'])?_0x5bc0a3+Number(RegExp['$1'])*0.01:_0x5bc0a3;},_0x5e6866),_0x5e6866;},Game_Actor['prototype']['levelUpGainSkillPoints']=function(_0x1dd044){const _0x3c1180=_0x17690b;if(this['_SkillLearnSystem_preventLevelUpGain'])return;const _0x4820e5=VisuMZ[_0x3c1180(0x1e4)][_0x3c1180(0x187)][_0x3c1180(0x357)];let _0x428ffc=0x0;try{_0x428ffc=eval(_0x4820e5[_0x3c1180(0x211)]);}catch(_0x41a48f){if($gameTemp['isPlaytest']())console['log'](_0x41a48f);}this[_0x3c1180(0x287)](_0x428ffc,_0x1dd044);},Game_Actor['prototype'][_0x17690b(0x34f)]=function(){const _0x3ccf63=_0x17690b;return this[_0x3ccf63(0x2ec)]=this[_0x3ccf63(0x2ec)]||0x0,this[_0x3ccf63(0x2b4)]()-this[_0x3ccf63(0x2ec)];},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x312)]=function(_0x2f563b){const _0xea072d=_0x17690b;if(!_0x2f563b)return![];const _0x283ea2=VisuMZ[_0xea072d(0x1e4)][_0xea072d(0x335)](_0x2f563b,_0xea072d(0x268));if(VisuMZ[_0xea072d(0x1e4)]['JS'][_0x283ea2]){if(!VisuMZ[_0xea072d(0x1e4)]['JS'][_0x283ea2]['call'](this,this,_0x2f563b))return![];}const _0x1d2b02=VisuMZ[_0xea072d(0x1e4)]['RegExp'],_0x1b8433=_0x2f563b[_0xea072d(0x25d)];if(_0x1b8433['match'](_0x1d2b02['LearnReqLevel'])){const _0x315148=Number(RegExp['$1']);if(_0x315148>this['level'])return![];}if(_0x1b8433[_0xea072d(0x212)](_0x1d2b02[_0xea072d(0x2e5)])){const _0x37890d=String(RegExp['$1'])[_0xea072d(0x2c0)](',')[_0xea072d(0x1ff)](_0x328cd5=>_0x328cd5['trim']());for(const _0x163daa of _0x37890d){let _0xf7a56a=0x0;const _0x2a99ad=/^\d+$/['test'](_0x163daa);_0x2a99ad?_0xf7a56a=Number(_0x163daa):_0xf7a56a=DataManager['getSkillIdWithName'](_0x163daa);if(!this[_0xea072d(0x235)](_0xf7a56a))return![];}}if(_0x1b8433[_0xea072d(0x212)](_0x1d2b02[_0xea072d(0x343)])){const _0x4f893c=String(RegExp['$1'])['split'](',')[_0xea072d(0x1ff)](_0x232e92=>_0x232e92['trim']());let _0x5df8ca=![];for(const _0x4160a4 of _0x4f893c){let _0x514a5a=0x0;const _0x32ce69=/^\d+$/['test'](_0x4160a4);_0x32ce69?_0x514a5a=Number(_0x4160a4):_0x514a5a=DataManager[_0xea072d(0x221)](_0x4160a4);if(this[_0xea072d(0x235)](_0x514a5a)){_0x5df8ca=!![];break;}}if(!_0x5df8ca)return![];}if(_0x1b8433[_0xea072d(0x212)](_0x1d2b02[_0xea072d(0x2bd)])){const _0x31e940=String(RegExp['$1'])['split'](',')[_0xea072d(0x1ff)](_0x290aa2=>Number(_0x290aa2));for(const _0x363bf7 of _0x31e940){if(!$gameSwitches[_0xea072d(0x1d2)](_0x363bf7))return![];}}if(_0x1b8433[_0xea072d(0x212)](_0x1d2b02['LearnReqSwitchesAny'])){const _0x850103=String(RegExp['$1'])[_0xea072d(0x2c0)](',')[_0xea072d(0x1ff)](_0x1d7696=>Number(_0x1d7696));let _0x580af9=![];for(const _0x8ac54c of _0x850103){if($gameSwitches[_0xea072d(0x1d2)](_0x8ac54c)){_0x580af9=!![];break;}}if(!_0x580af9)return![];}return!![];},Game_Actor['prototype'][_0x17690b(0x2d4)]=function(_0x759736){const _0x3e8a61=_0x17690b;if(!_0x759736)return![];const _0x56b7b4=DataManager[_0x3e8a61(0x2c1)](_0x759736);if(_0x56b7b4>this['getAbilityPoints']())return![];const _0x2aac27=DataManager['getSkillLearnSkillPointCost'](_0x759736);if(_0x2aac27>this['getSkillPoints']())return![];const _0x44f95f=DataManager[_0x3e8a61(0x24b)](_0x759736);if(_0x44f95f>$gameParty[_0x3e8a61(0x39c)]())return![];if(Imported[_0x3e8a61(0x27a)]){const _0x26eea7=DataManager[_0x3e8a61(0x3b0)](_0x759736);if(_0x26eea7>this[_0x3e8a61(0x309)]())return![];const _0x1e7bd2=DataManager['getSkillLearnJobPointCost'](_0x759736);if(_0x1e7bd2>this['getJobPoints']())return![];}const _0x4b432e=DataManager[_0x3e8a61(0x18a)](_0x759736);for(const _0x61af91 of _0x4b432e){if(!_0x61af91)continue;const _0x4db6f9=$dataItems[_0x61af91['id']];if(_0x4db6f9&&_0x61af91[_0x3e8a61(0x2a6)]>$gameParty['numItems'](_0x4db6f9))return![];}const _0x955581=DataManager[_0x3e8a61(0x188)](_0x759736);for(const _0x555da2 of _0x955581){if(!_0x555da2)continue;const _0x11cb06=$dataWeapons[_0x555da2['id']];if(_0x11cb06&&_0x555da2['quantity']>$gameParty[_0x3e8a61(0x1eb)](_0x11cb06))return![];}const _0x223913=DataManager[_0x3e8a61(0x373)](_0x759736);for(const _0x46178b of _0x223913){if(!_0x46178b)continue;const _0x279cc3=$dataArmors[_0x46178b['id']];if(_0x279cc3&&_0x46178b[_0x3e8a61(0x2a6)]>$gameParty[_0x3e8a61(0x1eb)](_0x279cc3))return![];}return!![];},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x340)]=function(_0xf06e03){const _0x590f28=_0x17690b;if(!_0xf06e03)return;const _0x215c87=DataManager[_0x590f28(0x2c1)](_0xf06e03);this['loseAbilityPoints'](_0x215c87);const _0x510c83=DataManager[_0x590f28(0x32e)](_0xf06e03);this[_0x590f28(0x1cd)](_0x510c83);const _0x3624b4=DataManager[_0x590f28(0x24b)](_0xf06e03);$gameParty[_0x590f28(0x27e)](_0x3624b4);if(Imported[_0x590f28(0x27a)]){const _0x2def00=DataManager[_0x590f28(0x3b0)](_0xf06e03);this[_0x590f28(0x19d)](_0x2def00);const _0x35809f=DataManager[_0x590f28(0x372)](_0xf06e03);this[_0x590f28(0x197)](_0x35809f);}const _0x5f1180=DataManager[_0x590f28(0x18a)](_0xf06e03);for(const _0xbe3b5b of _0x5f1180){if(!_0xbe3b5b)continue;const _0x260259=$dataItems[_0xbe3b5b['id']],_0x44c8b9=_0xbe3b5b['quantity'];$gameParty['loseItem'](_0x260259,_0x44c8b9);}const _0x49ad20=DataManager[_0x590f28(0x188)](_0xf06e03);for(const _0x4d24c9 of _0x49ad20){if(!_0x4d24c9)continue;const _0x23b658=$dataWeapons[_0x4d24c9['id']],_0x2cdf35=_0x4d24c9[_0x590f28(0x2a6)];$gameParty['loseItem'](_0x23b658,_0x2cdf35);}const _0x83bbab=DataManager[_0x590f28(0x373)](_0xf06e03);for(const _0x50183b of _0x83bbab){if(!_0x50183b)continue;const _0x5a18e8=$dataArmors[_0x50183b['id']],_0x4f80a4=_0x50183b[_0x590f28(0x2a6)];$gameParty['loseItem'](_0x5a18e8,_0x4f80a4);}if(DataManager[_0x590f28(0x321)](_0xf06e03))this[_0x590f28(0x18e)](_0xf06e03['id']);else DataManager['isState'](_0xf06e03)&&Imported[_0x590f28(0x36c)]&&this[_0x590f28(0x2d0)](_0xf06e03,!![]);this[_0x590f28(0x38e)]();},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x2f3)]=Game_Actor[_0x17690b(0x20c)]['learnSkill'],Game_Actor[_0x17690b(0x20c)][_0x17690b(0x18e)]=function(_0x5e016f){const _0x1bf167=_0x17690b,_0x3af504=!this[_0x1bf167(0x235)](_0x5e016f);VisuMZ[_0x1bf167(0x1e4)][_0x1bf167(0x2f3)][_0x1bf167(0x24c)](this,_0x5e016f);if(_0x3af504&&this[_0x1bf167(0x235)](_0x5e016f)){const _0x50a7ee=$dataSkills[_0x5e016f],_0x1574fb=VisuMZ[_0x1bf167(0x1e4)][_0x1bf167(0x335)](_0x50a7ee,_0x1bf167(0x347));VisuMZ['SkillLearnSystem']['JS'][_0x1574fb]&&VisuMZ[_0x1bf167(0x1e4)]['JS'][_0x1574fb][_0x1bf167(0x24c)](this,this,_0x50a7ee);}},Game_Actor[_0x17690b(0x20c)][_0x17690b(0x1fa)]=function(){const _0x929b5e=_0x17690b,_0x562b44=DataManager['getSkillLearnSkillsFromClass'](this['currentClass']()['id']);for(const _0x10138c of _0x562b44){const _0x359595=$dataSkills[_0x10138c];if(!_0x359595)continue;if(_0x359595[_0x929b5e(0x278)][_0x929b5e(0x1f6)]()==='')continue;if(_0x359595['name'][_0x929b5e(0x212)](/-----/i))continue;this[_0x929b5e(0x18e)](_0x10138c);}},Game_Enemy['prototype']['abilityPoints']=function(){const _0x5d52e0=_0x17690b,_0x27dc22=VisuMZ[_0x5d52e0(0x1e4)]['Settings'][_0x5d52e0(0x317)],_0x28f0ca=VisuMZ[_0x5d52e0(0x1e4)][_0x5d52e0(0x196)],_0x1ce420=this[_0x5d52e0(0x323)]()['note'];if(_0x1ce420[_0x5d52e0(0x212)](_0x28f0ca['EnemyAbilityPoints']))try{return eval(RegExp['$1']);}catch(_0x8e2b7f){if($gameTemp[_0x5d52e0(0x30b)]())console[_0x5d52e0(0x20e)](_0x8e2b7f);return 0x0;}try{return eval(_0x27dc22[_0x5d52e0(0x390)]);}catch(_0x410c54){if($gameTemp[_0x5d52e0(0x30b)]())console[_0x5d52e0(0x20e)](_0x410c54);return 0x0;}},Game_Enemy[_0x17690b(0x20c)][_0x17690b(0x39b)]=function(){const _0x1d31d4=_0x17690b,_0x156e88=VisuMZ[_0x1d31d4(0x1e4)]['Settings']['SkillPoints'],_0x6b0a8=VisuMZ[_0x1d31d4(0x1e4)][_0x1d31d4(0x196)],_0x5c7785=this[_0x1d31d4(0x323)]()[_0x1d31d4(0x25d)];if(_0x5c7785[_0x1d31d4(0x212)](_0x6b0a8['EnemySkillPoints']))try{return eval(RegExp['$1']);}catch(_0x33e66e){if($gameTemp[_0x1d31d4(0x30b)]())console[_0x1d31d4(0x20e)](_0x33e66e);return 0x0;}try{return eval(_0x156e88[_0x1d31d4(0x390)]);}catch(_0x56125c){if($gameTemp['isPlaytest']())console['log'](_0x56125c);return 0x0;}},VisuMZ[_0x17690b(0x1e4)]['Game_Party_setupBattleTestMembers']=Game_Party[_0x17690b(0x20c)]['setupBattleTestMembers'],Game_Party[_0x17690b(0x20c)][_0x17690b(0x332)]=function(){const _0x2cda59=_0x17690b;VisuMZ[_0x2cda59(0x1e4)][_0x2cda59(0x2e3)]['call'](this),this[_0x2cda59(0x21f)]();},Game_Party['prototype'][_0x17690b(0x21f)]=function(){const _0x49f718=_0x17690b;for(const _0x271959 of this[_0x49f718(0x39f)]()){if(!_0x271959)continue;_0x271959[_0x49f718(0x1fa)]();}},Game_Troop[_0x17690b(0x20c)]['abilityPointsTotal']=function(){const _0x4ed2bb=_0x17690b;return this[_0x4ed2bb(0x1f3)]()['reduce']((_0x92007c,_0x54b9de)=>_0x92007c+_0x54b9de[_0x4ed2bb(0x23c)](),0x0);},Game_Troop[_0x17690b(0x20c)][_0x17690b(0x294)]=function(){const _0x5bdc9e=_0x17690b;return this[_0x5bdc9e(0x1f3)]()['reduce']((_0x23ff61,_0x3eb5a8)=>_0x23ff61+_0x3eb5a8[_0x5bdc9e(0x39b)](),0x0);},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x250)]=Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x190)],Scene_Skill[_0x17690b(0x20c)]['create']=function(){const _0x1658b6=_0x17690b;VisuMZ['SkillLearnSystem']['Scene_Skill_create']['call'](this),this[_0x1658b6(0x2da)]();},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x2da)]=function(){const _0x2672ca=_0x17690b;this[_0x2672ca(0x3ac)](),this['createSkillLearnConfirmWindow']();},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x3ac)]=function(){const _0x5d66a3=_0x17690b,_0x4f2a8f=this['skillLearnIngredientsWindowRect']();this[_0x5d66a3(0x21d)]=new Window_SkillLearnIngredients(_0x4f2a8f),this[_0x5d66a3(0x25b)](this['_skillLearnIngredientsWindow']),this[_0x5d66a3(0x21d)][_0x5d66a3(0x318)]();const _0x22fb19=VisuMZ[_0x5d66a3(0x1e4)][_0x5d66a3(0x187)][_0x5d66a3(0x329)][_0x5d66a3(0x286)];this[_0x5d66a3(0x21d)]['setBackgroundType'](_0x22fb19);},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x18b)]=function(){const _0x307e16=_0x17690b;if(VisuMZ[_0x307e16(0x1e4)][_0x307e16(0x187)][_0x307e16(0x329)][_0x307e16(0x2ad)])return VisuMZ['SkillLearnSystem'][_0x307e16(0x187)][_0x307e16(0x329)][_0x307e16(0x2ad)]['call'](this);const _0x2c7188=this[_0x307e16(0x348)](),_0xc5618e=_0x2c7188['x'],_0xcd7aeb=_0x2c7188['y'],_0x11662b=_0x2c7188[_0x307e16(0x2b3)],_0x338d5a=_0x2c7188[_0x307e16(0x22c)]-this['calcWindowHeight'](0x2,![]);return new Rectangle(_0xc5618e,_0xcd7aeb,_0x11662b,_0x338d5a);},Scene_Skill[_0x17690b(0x20c)]['createSkillLearnConfirmWindow']=function(){const _0x26f648=_0x17690b,_0x5bfe47=this[_0x26f648(0x29e)]();this['_skillLearnConfirmWindow']=new Window_SkillLearnConfirm(_0x5bfe47),this[_0x26f648(0x25b)](this['_skillLearnConfirmWindow']),this[_0x26f648(0x2c2)][_0x26f648(0x2b5)]('ok',this[_0x26f648(0x1a2)]['bind'](this)),this['_skillLearnConfirmWindow'][_0x26f648(0x2b5)](_0x26f648(0x1e0),this['onSkillLearnConfirmCancel'][_0x26f648(0x339)](this)),this[_0x26f648(0x2c2)][_0x26f648(0x318)]();const _0x367d2e=VisuMZ[_0x26f648(0x1e4)][_0x26f648(0x187)]['Window'][_0x26f648(0x336)];this['_skillLearnConfirmWindow']['setBackgroundType'](_0x367d2e);},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x29e)]=function(){const _0x4e723c=_0x17690b;if(VisuMZ[_0x4e723c(0x1e4)][_0x4e723c(0x187)][_0x4e723c(0x329)]['ConfirmWindow_RectJS'])return VisuMZ[_0x4e723c(0x1e4)][_0x4e723c(0x187)][_0x4e723c(0x329)][_0x4e723c(0x32f)]['call'](this);const _0x342b7f=this['itemWindowRect'](),_0x28d4b3=_0x342b7f[_0x4e723c(0x2b3)],_0x110d31=this[_0x4e723c(0x2ef)](0x2,![]),_0x20b4a6=_0x342b7f['x'],_0x4b408e=_0x342b7f['y']+_0x342b7f['height']-_0x110d31;return new Rectangle(_0x20b4a6,_0x4b408e,_0x28d4b3,_0x110d31);},VisuMZ['SkillLearnSystem'][_0x17690b(0x1ab)]=Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x32b)],Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x32b)]=function(){const _0x59182b=_0x17690b;this[_0x59182b(0x30e)][_0x59182b(0x29d)]()?this[_0x59182b(0x30e)][_0x59182b(0x388)]()&&this[_0x59182b(0x30e)][_0x59182b(0x388)]()[_0x59182b(0x23b)]?this['onSkillLearnCollapseStypeID']():this[_0x59182b(0x33d)]():VisuMZ[_0x59182b(0x1e4)][_0x59182b(0x1ab)]['call'](this);},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x32c)]=function(){const _0x53a7a2=_0x17690b;this[_0x53a7a2(0x30e)][_0x53a7a2(0x22e)](),this[_0x53a7a2(0x30e)]['activate']();},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x33d)]=function(){const _0x390135=_0x17690b;this[_0x390135(0x30e)][_0x390135(0x318)](),this[_0x390135(0x21d)][_0x390135(0x200)](),this['_skillLearnIngredientsWindow'][_0x390135(0x38e)](),this[_0x390135(0x2c2)][_0x390135(0x200)](),this[_0x390135(0x2c2)][_0x390135(0x38e)](),this['_skillLearnConfirmWindow']['activate'](),this[_0x390135(0x2c2)][_0x390135(0x1e7)](0x0);},Scene_Skill[_0x17690b(0x20c)]['onSkillLearnConfirmOk']=function(){const _0x28b153=_0x17690b;VisuMZ['SkillLearnSystem']['Settings'][_0x28b153(0x395)][_0x28b153(0x293)]?this[_0x28b153(0x354)]():this[_0x28b153(0x378)]();},Scene_Skill['prototype'][_0x17690b(0x28d)]=function(){const _0x295cbd=_0x17690b;this[_0x295cbd(0x30e)][_0x295cbd(0x200)](),this[_0x295cbd(0x30e)][_0x295cbd(0x3b2)](),this['_skillLearnIngredientsWindow'][_0x295cbd(0x318)](),this[_0x295cbd(0x2c2)][_0x295cbd(0x318)]();},Scene_Skill[_0x17690b(0x20c)]['finishSkillLearnAnimation']=function(){const _0x485e35=_0x17690b;this['_windowLayer'][_0x485e35(0x2a7)]=!![],this[_0x485e35(0x28b)]=![],SoundManager[_0x485e35(0x270)](),this['user']()[_0x485e35(0x340)](this[_0x485e35(0x388)]()),this[_0x485e35(0x28d)](),this[_0x485e35(0x30e)]['refresh'](),this[_0x485e35(0x31a)][_0x485e35(0x38e)]();for(;;){if(this[_0x485e35(0x30e)][_0x485e35(0x352)]()<=0x0)break;if(this[_0x485e35(0x30e)][_0x485e35(0x388)]())break;this['_itemWindow']['smoothSelect'](Math['max'](this['_itemWindow'][_0x485e35(0x352)]()-0x1,0x0));}},VisuMZ['SkillLearnSystem'][_0x17690b(0x265)]=Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x189)],Scene_Skill[_0x17690b(0x20c)]['update']=function(){const _0x5dd3e7=_0x17690b;VisuMZ['SkillLearnSystem'][_0x5dd3e7(0x265)][_0x5dd3e7(0x24c)](this),this[_0x5dd3e7(0x252)]();},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x354)]=function(){const _0x593bd3=_0x17690b;this[_0x593bd3(0x28b)]=!![],this['_skillLearnAnimationWait']=0x14,this['_windowLayer'][_0x593bd3(0x2a7)]=VisuMZ[_0x593bd3(0x1e4)][_0x593bd3(0x187)][_0x593bd3(0x395)][_0x593bd3(0x2d2)]||![],this[_0x593bd3(0x23d)]();},Scene_Skill['prototype'][_0x17690b(0x23d)]=function(){const _0x217daa=_0x17690b;this[_0x217daa(0x26f)]=new Sprite(),this['addChild'](this[_0x217daa(0x26f)]),this[_0x217daa(0x33c)](),this[_0x217daa(0x1b8)](),this['setSkillLearnSkillSpritePosition'](),this[_0x217daa(0x2e4)](),this[_0x217daa(0x1f9)](),this[_0x217daa(0x21c)](this[_0x217daa(0x300)][_0x217daa(0x206)]());},Scene_Skill['prototype']['setSkillLearnSkillSpriteBitmap']=function(){const _0x9c611d=_0x17690b,_0x1cf507=VisuMZ[_0x9c611d(0x1e4)][_0x9c611d(0x196)],_0x7f165c=this['item']()['note'];this['_learnPicture']='';if(_0x7f165c['match'](_0x1cf507[_0x9c611d(0x228)]))this[_0x9c611d(0x256)]=String(RegExp['$1']);else _0x7f165c[_0x9c611d(0x212)](_0x1cf507['bigPicture'])&&(this['_learnPicture']=String(RegExp['$1']));this[_0x9c611d(0x24e)]=new Sprite();this[_0x9c611d(0x256)]?this[_0x9c611d(0x24e)][_0x9c611d(0x241)]=ImageManager[_0x9c611d(0x24f)](this['_learnPicture']):(this['_skillLearnBitmapSprite'][_0x9c611d(0x241)]=ImageManager['loadSystem']('IconSet'),this[_0x9c611d(0x24e)][_0x9c611d(0x241)][_0x9c611d(0x204)]=![]);this['_skillLearnBitmapSprite'][_0x9c611d(0x37d)]['x']=0.5,this[_0x9c611d(0x24e)]['anchor']['y']=0.5;if(!this[_0x9c611d(0x256)]){const _0x1e05a1=VisuMZ[_0x9c611d(0x1e4)]['Settings'][_0x9c611d(0x395)][_0x9c611d(0x35b)]||0x8;this['_skillLearnBitmapSprite'][_0x9c611d(0x2d7)]['x']=_0x1e05a1,this[_0x9c611d(0x24e)]['scale']['y']=_0x1e05a1;}this[_0x9c611d(0x26f)][_0x9c611d(0x341)](this[_0x9c611d(0x24e)]);},Scene_Skill['prototype'][_0x17690b(0x1b8)]=function(){const _0x334d40=_0x17690b;if(this['_learnPicture'])return;const _0x3f4e05=this[_0x334d40(0x388)](),_0x3b029a=_0x3f4e05[_0x334d40(0x31b)],_0x366eec=ImageManager[_0x334d40(0x191)],_0x2b5f6b=ImageManager[_0x334d40(0x349)],_0x47b85b=_0x3b029a%0x10*_0x366eec,_0x4bbde5=Math[_0x334d40(0x33b)](_0x3b029a/0x10)*_0x2b5f6b;this[_0x334d40(0x24e)][_0x334d40(0x1ee)](_0x47b85b,_0x4bbde5,_0x366eec,_0x2b5f6b);},Scene_Skill['prototype'][_0x17690b(0x33f)]=function(){const _0x391650=_0x17690b;this[_0x391650(0x26f)]['x']=Math['round'](Graphics[_0x391650(0x2b3)]/0x2);const _0x463721=Math[_0x391650(0x3a7)](ImageManager['iconHeight']*this[_0x391650(0x26f)]['scale']['y']);this[_0x391650(0x26f)]['y']=Math[_0x391650(0x3a7)]((Graphics['height']+_0x463721)/0x2);},Scene_Skill['prototype'][_0x17690b(0x2e4)]=function(){const _0x361779=_0x17690b;this[_0x361779(0x1f8)]=VisuMZ['SkillLearnSystem'][_0x361779(0x187)][_0x361779(0x395)][_0x361779(0x1b0)]||0x1,this[_0x361779(0x388)]()['note'][_0x361779(0x212)](VisuMZ[_0x361779(0x1e4)][_0x361779(0x196)][_0x361779(0x350)])&&(this[_0x361779(0x1f8)]=Math[_0x361779(0x380)](Number(RegExp['$1']),0x1)),this['_skillLearnIconSprite'][_0x361779(0x27f)]=0x0;},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x1f9)]=function(){const _0x5a6709=_0x17690b;this['_skillLearnAnimationIDs']=[],this[_0x5a6709(0x388)]()[_0x5a6709(0x25d)][_0x5a6709(0x212)](VisuMZ[_0x5a6709(0x1e4)][_0x5a6709(0x196)][_0x5a6709(0x2af)])?this[_0x5a6709(0x300)]=RegExp['$1']['split'](',')[_0x5a6709(0x1ff)](_0x22fc78=>Number(_0x22fc78)):this['_skillLearnAnimationIDs']=this[_0x5a6709(0x300)][_0x5a6709(0x2dd)](VisuMZ[_0x5a6709(0x1e4)][_0x5a6709(0x187)][_0x5a6709(0x395)][_0x5a6709(0x1d6)]);},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x21c)]=function(_0x156079){const _0x1d7fd4=_0x17690b,_0x333874=$dataAnimations[_0x156079];if(!_0x333874)return;const _0x47dafb=this[_0x1d7fd4(0x2df)](_0x333874);this[_0x1d7fd4(0x1f7)]=new(_0x47dafb?Sprite_AnimationMV:Sprite_Animation)();const _0x5c3c2f=[this[_0x1d7fd4(0x26f)]],_0x295571=0x0;this[_0x1d7fd4(0x1f7)][_0x1d7fd4(0x28f)](_0x5c3c2f,_0x333874,![],_0x295571,null),this[_0x1d7fd4(0x341)](this[_0x1d7fd4(0x1f7)]);},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x2df)]=function(_0x475954){return!!_0x475954['frames'];},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x252)]=function(){const _0x2f7e93=_0x17690b;if(!this[_0x2f7e93(0x28b)])return;this[_0x2f7e93(0x282)](),this[_0x2f7e93(0x19e)](),this[_0x2f7e93(0x1d4)]()&&this['processFinishSkillLearnAnimation']();},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x282)]=function(){const _0x7f447=_0x17690b;this[_0x7f447(0x26f)]['opacity']+=this[_0x7f447(0x1f8)];},Scene_Skill[_0x17690b(0x20c)]['updateSkillLearnAnimationSprite']=function(){const _0x2fc914=_0x17690b;if(!this[_0x2fc914(0x1f7)])return;if(this['_skillLearnAnimationSprite']['isPlaying']())return;this[_0x2fc914(0x273)](),this[_0x2fc914(0x21c)](this['_skillLearnAnimationIDs'][_0x2fc914(0x206)]());},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x273)]=function(){const _0x26b6fb=_0x17690b;if(!this[_0x26b6fb(0x1f7)])return;this['removeChild'](this[_0x26b6fb(0x1f7)]),this[_0x26b6fb(0x1f7)][_0x26b6fb(0x392)](),this[_0x26b6fb(0x1f7)]=undefined;},Scene_Skill[_0x17690b(0x20c)]['destroySkillLearnSprite']=function(){const _0x124dff=_0x17690b;if(!this['_skillLearnIconSprite'])return;this[_0x124dff(0x2fc)](this['_skillLearnIconSprite']),this['_skillLearnIconSprite'][_0x124dff(0x392)](),this[_0x124dff(0x26f)]=undefined;},Scene_Skill[_0x17690b(0x20c)]['isFinishedSkillLearnAnimating']=function(){const _0x169ab9=_0x17690b;if(TouchInput[_0x169ab9(0x299)]())return!![];if(Input[_0x169ab9(0x227)]('ok'))return!![];if(Input['isTriggered'](_0x169ab9(0x1e0)))return!![];if(this[_0x169ab9(0x26f)][_0x169ab9(0x27f)]<0xff)return![];if(this['_skillLearnAnimationSprite'])return![];return this[_0x169ab9(0x34a)]--<=0x0;},Scene_Skill[_0x17690b(0x20c)][_0x17690b(0x34d)]=function(){const _0x3e02d4=_0x17690b;this['destroySkillLearnAnimationSprite'](),this[_0x3e02d4(0x301)](),this[_0x3e02d4(0x378)](),TouchInput[_0x3e02d4(0x269)](),Input[_0x3e02d4(0x269)]();},Window_Base[_0x17690b(0x20c)][_0x17690b(0x271)]=function(_0x49b1d0,_0x12641b,_0x34f48e,_0x34c1aa,_0x37e876){const _0x3f60af=_0x17690b;_0x37e876=_0x37e876||_0x3f60af(0x237);const _0x56ca44=_0x3f60af(0x2e8)[_0x3f60af(0x345)](ImageManager['abilityPointsIcon']),_0x25853f=TextManager[_0x3f60af(0x1bf)],_0x317010=_0x25853f[_0x3f60af(0x345)](_0x49b1d0,TextManager['abilityPointsAbbr'],_0x56ca44,TextManager[_0x3f60af(0x322)]),_0x69dbdc=this[_0x3f60af(0x1bb)](_0x317010)['width'];if(_0x37e876===_0x3f60af(0x237))_0x12641b+=0x0;else _0x37e876===_0x3f60af(0x379)?_0x12641b+=Math[_0x3f60af(0x3a7)]((_0x34c1aa-_0x69dbdc)/0x2):_0x12641b+=_0x34c1aa-_0x69dbdc;this[_0x3f60af(0x346)](_0x317010,_0x12641b,_0x34f48e);},Window_Base[_0x17690b(0x20c)][_0x17690b(0x315)]=function(_0xdce502,_0x1a7690,_0x553dbf,_0x347b66,_0x175b69,_0x2dfe5){const _0x50e1fc=_0x17690b,_0x4bc4bc=_0xdce502['getAbilityPoints'](_0x1a7690);this[_0x50e1fc(0x271)](_0x4bc4bc,_0x553dbf,_0x347b66,_0x175b69,_0x2dfe5);},Window_Base[_0x17690b(0x20c)]['drawSkillPoints']=function(_0x232262,_0x455c92,_0x24accd,_0x1fbc49,_0xdf9d6f){const _0x448296=_0x17690b;_0xdf9d6f=_0xdf9d6f||'left';const _0x5a2528=_0x448296(0x2e8)[_0x448296(0x345)](ImageManager[_0x448296(0x386)]),_0x5f4aae=TextManager['skillPointsFmt'],_0x4ecba3=_0x5f4aae[_0x448296(0x345)](_0x232262,TextManager[_0x448296(0x328)],_0x5a2528,TextManager[_0x448296(0x1e6)]),_0x137534=this[_0x448296(0x1bb)](_0x4ecba3)[_0x448296(0x2b3)];if(_0xdf9d6f===_0x448296(0x237))_0x455c92+=0x0;else _0xdf9d6f==='center'?_0x455c92+=Math[_0x448296(0x3a7)]((_0x1fbc49-_0x137534)/0x2):_0x455c92+=_0x1fbc49-_0x137534;this['drawTextEx'](_0x4ecba3,_0x455c92,_0x24accd);},Window_Base[_0x17690b(0x20c)][_0x17690b(0x255)]=function(_0x592972,_0xbbcfbe,_0x4dc29c,_0x5ca3b6,_0x10a328,_0x1b7130){const _0x4202f6=_0x17690b,_0x4292a4=_0x592972[_0x4202f6(0x2b4)](_0xbbcfbe);this[_0x4202f6(0x1c6)](_0x4292a4,_0x4dc29c,_0x5ca3b6,_0x10a328,_0x1b7130);},VisuMZ[_0x17690b(0x1e4)]['Window_SkillType_makeCommandList']=Window_SkillType['prototype']['makeCommandList'],Window_SkillType[_0x17690b(0x20c)][_0x17690b(0x2ce)]=function(){const _0x367735=_0x17690b;VisuMZ['SkillLearnSystem'][_0x367735(0x306)]['call'](this),this[_0x367735(0x1ac)]();},Window_SkillType['prototype'][_0x17690b(0x1ac)]=function(){const _0x591774=_0x17690b;if(!$gameSystem[_0x591774(0x247)]())return;if(!this[_0x591774(0x254)])return;let _0x25ffbc=this[_0x591774(0x24d)]();const _0x92af61=this[_0x591774(0x254)]['skillTypes']()[0x0];this['addCommand'](_0x25ffbc,_0x591774(0x3a4),!![],'skillLearn');},Window_SkillType[_0x17690b(0x20c)][_0x17690b(0x24d)]=function(){const _0x629dac=_0x17690b;let _0x39fe91=TextManager[_0x629dac(0x37c)];if(_0x39fe91[_0x629dac(0x212)](/\\I\[(\d+)\]/i))return _0x39fe91;if(!Imported['VisuMZ_1_SkillsStatesCore'])return _0x39fe91;if(this['commandStyle']()==='text')return _0x39fe91;const _0x51aff7=TextManager[_0x629dac(0x38c)];return'\x5cI[%1]%2'[_0x629dac(0x345)](_0x51aff7,_0x39fe91);},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x314)]=Window_SkillStatus[_0x17690b(0x20c)][_0x17690b(0x38e)],Window_SkillStatus[_0x17690b(0x20c)][_0x17690b(0x38e)]=function(){const _0x323e49=_0x17690b;this[_0x323e49(0x1a3)](),this[_0x323e49(0x29d)]()?this[_0x323e49(0x2fb)]():VisuMZ[_0x323e49(0x1e4)]['Window_SkillStatus_refresh'][_0x323e49(0x24c)](this);},Window_SkillStatus[_0x17690b(0x20c)][_0x17690b(0x29d)]=function(){const _0x204135=_0x17690b,_0x465f06=SceneManager['_scene'];if(!_0x465f06)return![];const _0x3ee6dd=_0x465f06[_0x204135(0x30e)];if(!_0x3ee6dd)return![];return _0x3ee6dd[_0x204135(0x29d)]&&_0x3ee6dd[_0x204135(0x29d)]();},Window_SkillStatus['prototype'][_0x17690b(0x2fb)]=function(){const _0x49d97b=_0x17690b;if(!this[_0x49d97b(0x254)])return;Window_StatusBase[_0x49d97b(0x20c)][_0x49d97b(0x38e)][_0x49d97b(0x24c)](this);if(VisuMZ[_0x49d97b(0x1e4)][_0x49d97b(0x187)]['General'][_0x49d97b(0x279)]){VisuMZ[_0x49d97b(0x1e4)][_0x49d97b(0x187)][_0x49d97b(0x259)][_0x49d97b(0x279)]['call'](this);return;}const _0x1656ee=this[_0x49d97b(0x1c5)]()/0x2,_0x1954c3=this[_0x49d97b(0x3ae)],_0x12196e=_0x1954c3/0x2-this[_0x49d97b(0x224)]()*1.5;this[_0x49d97b(0x3a9)](this[_0x49d97b(0x254)],_0x1656ee+0x1,0x0,0x90,_0x1954c3),this[_0x49d97b(0x288)](this[_0x49d97b(0x254)],_0x1656ee+0xb4,_0x12196e);let _0x380cab=this[_0x49d97b(0x1c5)]()/0x2+0xb4+0xb4+0xb4,_0x918750=this['innerWidth']-_0x380cab-0x2;if(_0x918750<0x12c)return;const _0xc91148=this['getSkillLearnDisplayedCosts'](),_0x3ccc45=Math['floor'](this['innerHeight']/this['lineHeight']()),_0x1069ba=Math['ceil'](_0xc91148[_0x49d97b(0x3b1)]/_0x3ccc45);let _0x595b74=_0x380cab,_0x3a880e=Math[_0x49d97b(0x380)](Math[_0x49d97b(0x3a7)]((this['innerHeight']-this['lineHeight']()*Math[_0x49d97b(0x275)](_0xc91148[_0x49d97b(0x3b1)]/_0x1069ba))/0x2),0x0);const _0x1b0834=_0x3a880e;let _0x423ee9=(this[_0x49d97b(0x193)]-_0x595b74-this[_0x49d97b(0x2b1)]()*0x2*_0x1069ba)/_0x1069ba;_0x1069ba===0x1&&(_0x423ee9=Math['min'](ImageManager[_0x49d97b(0x3b6)],_0x423ee9),_0x595b74+=Math[_0x49d97b(0x3a7)]((this[_0x49d97b(0x193)]-_0x595b74-this[_0x49d97b(0x2b1)]()*0x2-_0x423ee9)/0x2));for(const _0x3352d3 of _0xc91148){switch(_0x3352d3){case'AP':this[_0x49d97b(0x315)](this['_actor'],this[_0x49d97b(0x254)][_0x49d97b(0x1da)]()['id'],_0x595b74,_0x3a880e,_0x423ee9,_0x49d97b(0x19a));break;case'CP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x49d97b(0x356)](this[_0x49d97b(0x254)],this['_actor']['currentClass']()['id'],_0x595b74,_0x3a880e,_0x423ee9,_0x49d97b(0x19a));break;case'JP':Imported[_0x49d97b(0x27a)]&&this[_0x49d97b(0x210)](this[_0x49d97b(0x254)],this[_0x49d97b(0x254)]['currentClass']()['id'],_0x595b74,_0x3a880e,_0x423ee9,'right');break;case'SP':this[_0x49d97b(0x255)](this[_0x49d97b(0x254)],this[_0x49d97b(0x254)][_0x49d97b(0x1da)]()['id'],_0x595b74,_0x3a880e,_0x423ee9,_0x49d97b(0x19a));break;case _0x49d97b(0x281):this[_0x49d97b(0x2d9)]($gameParty[_0x49d97b(0x39c)](),TextManager[_0x49d97b(0x2b7)],_0x595b74,_0x3a880e,_0x423ee9);break;default:continue;}_0x3a880e+=this[_0x49d97b(0x224)](),_0x3a880e+this[_0x49d97b(0x224)]()>this[_0x49d97b(0x3ae)]&&(_0x3a880e=_0x1b0834,_0x595b74+=_0x423ee9+this[_0x49d97b(0x2b1)]()*0x2);}},Window_SkillStatus['prototype'][_0x17690b(0x18c)]=function(){const _0x3c99f9=_0x17690b,_0x2c6bbb=JsonEx[_0x3c99f9(0x362)](VisuMZ[_0x3c99f9(0x1e4)]['Settings']['General'][_0x3c99f9(0x31e)]);return!Imported[_0x3c99f9(0x27a)]&&(_0x2c6bbb['remove']('CP'),_0x2c6bbb[_0x3c99f9(0x229)]('JP')),_0x2c6bbb[_0x3c99f9(0x229)](_0x3c99f9(0x261))[_0x3c99f9(0x229)]('Weapon')[_0x3c99f9(0x229)](_0x3c99f9(0x331));},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x2b9)]=Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x26c)],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x26c)]=function(_0x54599d){const _0x3c8fb3=_0x17690b;this[_0x3c8fb3(0x260)]=[],VisuMZ[_0x3c8fb3(0x1e4)]['Window_SkillList_initialize'][_0x3c8fb3(0x24c)](this,_0x54599d);},Window_SkillList['prototype']['isSkillLearnMode']=function(){const _0x133d88=_0x17690b;return this[_0x133d88(0x18d)]===_0x133d88(0x2a5);},Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x289)]=function(){const _0x58a65c=_0x17690b;return VisuMZ['SkillLearnSystem'][_0x58a65c(0x187)][_0x58a65c(0x259)][_0x58a65c(0x3af)]??![];},Window_SkillList['prototype']['separateSkillLearnStypeIndent']=function(){const _0x39b519=_0x17690b;return VisuMZ[_0x39b519(0x1e4)][_0x39b519(0x187)]['General'][_0x39b519(0x285)]??0x10;},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x29c)]=Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x245)],Window_SkillList['prototype'][_0x17690b(0x245)]=function(_0x5af1dc){const _0x1d50ed=_0x17690b;this[_0x1d50ed(0x254)]!==_0x5af1dc&&(this['_collapsedStypeIDs']=[]),VisuMZ[_0x1d50ed(0x1e4)][_0x1d50ed(0x29c)]['call'](this,_0x5af1dc);},VisuMZ['SkillLearnSystem']['Window_SkillList_setStypeId']=Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x295)],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x295)]=function(_0x11f8a1){const _0x3f2ef3=_0x17690b,_0x17c012=this[_0x3f2ef3(0x29d)]();VisuMZ[_0x3f2ef3(0x1e4)][_0x3f2ef3(0x1b4)][_0x3f2ef3(0x24c)](this,_0x11f8a1);if(_0x17c012!==this[_0x3f2ef3(0x29d)]()){const _0x5f52ec=SceneManager[_0x3f2ef3(0x344)];if(!_0x5f52ec)return;const _0xf3290c=_0x5f52ec[_0x3f2ef3(0x31a)];if(_0xf3290c)_0xf3290c[_0x3f2ef3(0x38e)]();}},VisuMZ[_0x17690b(0x1e4)]['Window_SkillList_maxCols']=Window_SkillList['prototype'][_0x17690b(0x1fb)],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x1fb)]=function(){const _0x20dac4=_0x17690b;return this['isSkillLearnMode']()?0x1:VisuMZ[_0x20dac4(0x1e4)]['Window_SkillList_maxCols'][_0x20dac4(0x24c)](this);},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x3aa)]=Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x2ab)],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x2ab)]=function(){const _0x3c5431=_0x17690b;this['_actor']&&this[_0x3c5431(0x29d)]()?this[_0x3c5431(0x296)]():VisuMZ['SkillLearnSystem'][_0x3c5431(0x3aa)][_0x3c5431(0x24c)](this);},Window_SkillList['prototype']['makeSkillLearnList']=function(){const _0x531a88=_0x17690b,_0x5a8521=this[_0x531a88(0x289)](),_0x2f19e7=DataManager[_0x531a88(0x2cb)](this[_0x531a88(0x254)][_0x531a88(0x1da)]()['id']);_0x5a8521?this[_0x531a88(0x277)](_0x2f19e7):this[_0x531a88(0x303)]=_0x2f19e7[_0x531a88(0x1ff)](_0x257bbc=>$dataSkills[_0x257bbc])[_0x531a88(0x19f)](_0x398a00=>this[_0x531a88(0x2bf)](_0x398a00));if(Imported[_0x531a88(0x36c)]){let _0xf54ebf=!![];if(this[_0x531a88(0x289)]()){this[_0x531a88(0x2ea)]('passives');if(this['_collapsedStypeIDs'][_0x531a88(0x2bf)]('passives'))_0xf54ebf=![];}const _0x280955=DataManager[_0x531a88(0x21b)](this[_0x531a88(0x254)]['currentClass']()['id']),_0x5789c1=_0x280955[_0x531a88(0x1ff)](_0x4b10de=>$dataStates[_0x4b10de])[_0x531a88(0x19f)](_0x4c2f9b=>this[_0x531a88(0x2bf)](_0x4c2f9b));if(_0x5789c1[_0x531a88(0x3b1)]>0x0&&_0xf54ebf)this[_0x531a88(0x249)]();else this['separateSkillLearnByStypeID']()&&_0x5789c1[_0x531a88(0x3b1)]<=0x0&&this[_0x531a88(0x303)][_0x531a88(0x2ae)]();}},Window_SkillList['prototype'][_0x17690b(0x277)]=function(_0x1a8790){const _0xd6abe=_0x17690b;this[_0xd6abe(0x303)]=[];const _0x5f104e=_0x1a8790[_0xd6abe(0x1ff)](_0x209066=>$dataSkills[_0x209066]?$dataSkills[_0x209066][_0xd6abe(0x2eb)]:0x0)[_0xd6abe(0x229)](0x0)[_0xd6abe(0x19f)]((_0x4d23d4,_0x31c1a1,_0x497823)=>_0x497823[_0xd6abe(0x32a)](_0x4d23d4)===_0x31c1a1)[_0xd6abe(0x194)]((_0x5bbff7,_0x5cc4d7)=>_0x5bbff7-_0x5cc4d7);for(const _0x350cec of _0x5f104e){this[_0xd6abe(0x2ea)](_0x350cec);const _0x4c403e=_0x1a8790[_0xd6abe(0x1ff)](_0x15d6a8=>$dataSkills[_0x15d6a8])['filter'](_0x4c7bff=>this['includes'](_0x4c7bff)&&_0x4c7bff[_0xd6abe(0x2eb)]===_0x350cec);_0x4c403e[_0xd6abe(0x3b1)]<=0x0&&this['_data'][_0xd6abe(0x2ae)]();if(this[_0xd6abe(0x260)][_0xd6abe(0x2bf)](_0x350cec))continue;this['_data']=this[_0xd6abe(0x303)][_0xd6abe(0x2dd)](_0x4c403e);}},Window_SkillList['prototype'][_0x17690b(0x2ea)]=function(_0x43ff4b){const _0x285a35=_0x17690b,_0xd88ad4=Imported[_0x285a35(0x1d5)]?VisuMZ['SkillsStatesCore'][_0x285a35(0x187)][_0x285a35(0x23a)]:{},_0xf094ef=$dataSystem[_0x285a35(0x19c)]['includes'](_0x43ff4b);let _0x512d12=_0xf094ef?_0xd88ad4[_0x285a35(0x31c)]:_0xd88ad4['IconStypeNorm'];_0x43ff4b===_0x285a35(0x29f)&&(_0x512d12=ImageManager[_0x285a35(0x2de)][_0x285a35(0x257)]);let _0x401b09=$dataSystem[_0x285a35(0x383)][_0x43ff4b];_0x43ff4b===_0x285a35(0x29f)&&(_0x401b09=TextManager[_0x285a35(0x2de)][_0x285a35(0x30a)]),_0x401b09[_0x285a35(0x212)](/\\I\[(\d+)\]/i)&&(_0x512d12=Number(RegExp['$1']),_0x401b09=_0x401b09[_0x285a35(0x324)](/\\I\[(\d+)\]/gi,'')[_0x285a35(0x1f6)]()),_0x43ff4b!==_0x285a35(0x29f)&&(_0x401b09=TextManager[_0x285a35(0x3ab)][_0x285a35(0x345)](_0x401b09)),this['_data'][_0x285a35(0x385)]({'id':-0x1,'name':_0x401b09,'iconIndex':_0x512d12||0x0,'description':'','disabled':!![],'stypeCategory':!![],'stypeId':_0x43ff4b,'note':_0x285a35(0x20d)['format'](TextManager['skillLearnStypeColor'])});},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x2f2)]=Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x337)],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x337)]=function(_0x592215){const _0x4d0f89=_0x17690b;VisuMZ['SkillLearnSystem'][_0x4d0f89(0x2f2)]['call'](this,_0x592215);if(!_0x592215)return;if(!_0x592215['stypeCategory'])return;let _0x1a3019=_0x592215[_0x4d0f89(0x278)];const _0x270893=this[_0x4d0f89(0x260)][_0x4d0f89(0x2bf)](_0x592215['stypeId']);_0x270893?_0x1a3019=TextManager[_0x4d0f89(0x3b5)][_0x4d0f89(0x345)](_0x1a3019):_0x1a3019=TextManager[_0x4d0f89(0x36e)][_0x4d0f89(0x345)](_0x1a3019),_0x592215[_0x4d0f89(0x278)]=_0x1a3019;},Window_SkillList[_0x17690b(0x20c)]['toggleSkillLearnStypeCollapse']=function(){const _0x5e11c3=_0x17690b,_0x2dcdad=this['item'](),_0x46f9c6=_0x2dcdad['stypeId'];this['_collapsedStypeIDs'][_0x5e11c3(0x2bf)](_0x46f9c6)?this[_0x5e11c3(0x260)][_0x5e11c3(0x229)](_0x46f9c6):this[_0x5e11c3(0x260)][_0x5e11c3(0x385)](_0x46f9c6),this[_0x5e11c3(0x38e)]();},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x30f)]=Window_SkillList['prototype'][_0x17690b(0x2bf)],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x2bf)]=function(_0x1a0219){const _0x52c5af=_0x17690b;return this[_0x52c5af(0x29d)]()?this[_0x52c5af(0x34c)](_0x1a0219):VisuMZ[_0x52c5af(0x1e4)][_0x52c5af(0x30f)][_0x52c5af(0x24c)](this,_0x1a0219);},Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x34c)]=function(_0x583589){const _0x3229a9=_0x17690b;if(!_0x583589)return![];if(_0x583589[_0x3229a9(0x278)][_0x3229a9(0x3b1)]<=0x0)return![];if(_0x583589[_0x3229a9(0x278)][_0x3229a9(0x212)](/-----/i))return![];if(VisuMZ[_0x3229a9(0x1e4)][_0x3229a9(0x187)]['General'][_0x3229a9(0x232)]){if(DataManager[_0x3229a9(0x321)](_0x583589)){if(this['_actor']['isLearnedSkill'](_0x583589['id']))return![];}if(_0x583589&&_0x583589['autoRemovalTiming']!==undefined&&Imported[_0x3229a9(0x36c)]){if(this[_0x3229a9(0x254)][_0x3229a9(0x1e9)](_0x583589))return![];}}const _0x4b0ede=VisuMZ[_0x3229a9(0x1e4)][_0x3229a9(0x335)](_0x583589,_0x3229a9(0x225));if(VisuMZ['SkillLearnSystem']['JS'][_0x4b0ede]){if(!VisuMZ[_0x3229a9(0x1e4)]['JS'][_0x4b0ede][_0x3229a9(0x24c)](this,this[_0x3229a9(0x254)],_0x583589))return![];}const _0x129ecd=VisuMZ[_0x3229a9(0x1e4)][_0x3229a9(0x196)],_0x99dae2=_0x583589[_0x3229a9(0x25d)];if(_0x99dae2[_0x3229a9(0x212)](_0x129ecd['LearnShowLevel'])){const _0x193863=Number(RegExp['$1']);if(_0x193863>this[_0x3229a9(0x254)][_0x3229a9(0x2fa)])return![];}if(_0x99dae2['match'](_0x129ecd[_0x3229a9(0x394)])){const _0x994cb9=String(RegExp['$1'])[_0x3229a9(0x2c0)](',')[_0x3229a9(0x1ff)](_0x5592fe=>_0x5592fe[_0x3229a9(0x1f6)]());;for(const _0x1ef585 of _0x994cb9){let _0x3cfffa=0x0;const _0x3e6e64=/^\d+$/[_0x3229a9(0x292)](_0x1ef585);_0x3e6e64?_0x3cfffa=Number(_0x1ef585):_0x3cfffa=DataManager[_0x3229a9(0x221)](_0x1ef585);if(!this[_0x3229a9(0x254)][_0x3229a9(0x235)](_0x3cfffa))return![];}}if(_0x99dae2[_0x3229a9(0x212)](_0x129ecd[_0x3229a9(0x359)])){const _0x55f51f=String(RegExp['$1'])['split'](',')[_0x3229a9(0x1ff)](_0x2b030d=>_0x2b030d[_0x3229a9(0x1f6)]());;let _0x3fd5da=![];for(const _0x3c6b2c of _0x55f51f){let _0x152c8e=0x0;const _0x162342=/^\d+$/['test'](_0x3c6b2c);_0x162342?_0x152c8e=Number(_0x3c6b2c):_0x152c8e=DataManager['getSkillIdWithName'](_0x3c6b2c);if(this['_actor'][_0x3229a9(0x235)](_0x152c8e)){_0x3fd5da=!![];break;}}if(!_0x3fd5da)return![];}if(_0x99dae2['match'](_0x129ecd['LearnShowSwitchesAll'])){const _0x21c064=String(RegExp['$1'])[_0x3229a9(0x2c0)](',')[_0x3229a9(0x1ff)](_0x1188e4=>Number(_0x1188e4));for(const _0x4f0eb8 of _0x21c064){if(!$gameSwitches[_0x3229a9(0x1d2)](_0x4f0eb8))return![];}}if(_0x99dae2[_0x3229a9(0x212)](_0x129ecd['LearnShowSwitchesAny'])){const _0x2c6e43=String(RegExp['$1'])['split'](',')['map'](_0x353dd4=>Number(_0x353dd4));let _0x511c88=![];for(const _0x36df19 of _0x2c6e43){if($gameSwitches['value'](_0x36df19)){_0x511c88=!![];break;}}if(!_0x511c88)return![];}return _0x583589;},VisuMZ[_0x17690b(0x1e4)]['Window_SkillList_isEnabled']=Window_SkillList[_0x17690b(0x20c)]['isEnabled'],Window_SkillList['prototype']['isEnabled']=function(_0x325176){const _0x5193cc=_0x17690b;return this[_0x5193cc(0x254)]&&this[_0x5193cc(0x29d)]()?this[_0x5193cc(0x238)](_0x325176):VisuMZ['SkillLearnSystem'][_0x5193cc(0x391)]['call'](this,_0x325176);},VisuMZ['SkillLearnSystem'][_0x17690b(0x22a)]=Window_SkillList[_0x17690b(0x20c)]['drawItem'],Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x1df)]=function(_0x1c25d7){const _0x3c7a5d=_0x17690b;this[_0x3c7a5d(0x399)]=this[_0x3c7a5d(0x29d)]();if(this[_0x3c7a5d(0x29d)]()&&this[_0x3c7a5d(0x289)]()){const _0x23223c=this['_data'][_0x1c25d7];this[_0x3c7a5d(0x2d3)]=!_0x23223c[_0x3c7a5d(0x23b)];}VisuMZ[_0x3c7a5d(0x1e4)][_0x3c7a5d(0x22a)]['call'](this,_0x1c25d7),this['_skillLearnSystem_drawItemMode']=![],this[_0x3c7a5d(0x29d)]()&&this[_0x3c7a5d(0x289)]()&&(this[_0x3c7a5d(0x2d3)]=undefined);},VisuMZ[_0x17690b(0x1e4)][_0x17690b(0x209)]=Window_SkillList[_0x17690b(0x20c)]['itemLineRect'],Window_SkillList['prototype'][_0x17690b(0x360)]=function(_0x40856a){const _0x2dc623=_0x17690b,_0x171e05=VisuMZ[_0x2dc623(0x1e4)][_0x2dc623(0x209)][_0x2dc623(0x24c)](this,_0x40856a);if(this[_0x2dc623(0x2d3)]){const _0xf79e71=this[_0x2dc623(0x2c7)]();_0x171e05['x']+=_0xf79e71,_0x171e05['width']-=_0xf79e71;}return _0x171e05;},Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x238)]=function(_0x1a8517){const _0x3d4280=_0x17690b;if(!_0x1a8517)return![];if(_0x1a8517[_0x3d4280(0x278)][_0x3d4280(0x3b1)]<=0x0)return![];if(_0x1a8517[_0x3d4280(0x278)][_0x3d4280(0x212)](/-----/i))return![];if(DataManager[_0x3d4280(0x321)](_0x1a8517)){if(this[_0x3d4280(0x254)][_0x3d4280(0x235)](_0x1a8517['id']))return![];}if(Imported[_0x3d4280(0x36c)]&&DataManager[_0x3d4280(0x2f0)](_0x1a8517)){if(this[_0x3d4280(0x254)]['isLearnedEquippedPassive'](_0x1a8517))return![];}if(this[_0x3d4280(0x399)]){if(!this[_0x3d4280(0x254)]['meetRequirementsForSkillLearnSystem'](_0x1a8517))return![];return this[_0x3d4280(0x254)][_0x3d4280(0x2d4)](_0x1a8517);}return!![];},VisuMZ['SkillLearnSystem'][_0x17690b(0x1db)]=Window_SkillList[_0x17690b(0x20c)]['drawSkillCost'],Window_SkillList['prototype']['drawSkillCost']=function(_0x385f56,_0x237d1d,_0x261560,_0x359811){const _0x571af5=_0x17690b;this[_0x571af5(0x29d)]()?this['shouldDrawSkillLearnRequirements'](_0x385f56)?this['drawSkillLearnRequirements'](_0x385f56,_0x237d1d,_0x261560,_0x359811):this[_0x571af5(0x353)](_0x385f56,_0x237d1d,_0x261560,_0x359811):VisuMZ[_0x571af5(0x1e4)]['Window_SkillList_drawSkillCost'][_0x571af5(0x24c)](this,_0x385f56,_0x237d1d,_0x261560,_0x359811);},Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x220)]=function(_0x5bdab8){const _0x52baa0=_0x17690b;return this[_0x52baa0(0x254)]&&!this[_0x52baa0(0x254)][_0x52baa0(0x312)](_0x5bdab8);},Window_SkillList['prototype']['drawSkillLearnRequirements']=function(_0x1cae6b,_0x4b9fc5,_0x132e24,_0x577760){const _0x5aece1=_0x17690b,_0x20d552=this['getSkillLearnRequirementText'](_0x1cae6b),_0x44c2c4=this[_0x5aece1(0x1bb)](_0x20d552)['width'];_0x4b9fc5+=_0x577760-_0x44c2c4,this[_0x5aece1(0x346)](_0x20d552,_0x4b9fc5,_0x132e24);},Window_SkillList['prototype']['getSkillLearnRequirementText']=function(_0xfd98dd){const _0x2a270e=_0x17690b,_0x34505c=VisuMZ[_0x2a270e(0x1e4)][_0x2a270e(0x187)][_0x2a270e(0x259)],_0x5d6310=TextManager[_0x2a270e(0x330)],_0x22000c=VisuMZ['SkillLearnSystem'][_0x2a270e(0x196)],_0x142c14=_0xfd98dd[_0x2a270e(0x25d)];let _0x39d834='',_0x531d6b='';const _0x2619ef=[_0x2a270e(0x274),_0x2a270e(0x37a),'SWITCHES',_0x2a270e(0x2ac)];for(const _0x34cd3a of _0x2619ef){switch(_0x34cd3a){case _0x2a270e(0x274):if(_0x142c14[_0x2a270e(0x212)](_0x22000c[_0x2a270e(0x27c)])){const _0x150c23=Number(RegExp['$1']);_0x531d6b=TextManager[_0x2a270e(0x320)][_0x2a270e(0x345)](_0x150c23,TextManager[_0x2a270e(0x2fa)],TextManager[_0x2a270e(0x2ca)]),_0x531d6b[_0x2a270e(0x3b1)]>0x0&&(_0x39d834!==''?_0x39d834=_0x5d6310[_0x2a270e(0x345)](_0x39d834,_0x531d6b):_0x39d834=_0x531d6b);}break;case _0x2a270e(0x37a):if(_0x142c14[_0x2a270e(0x212)](_0x22000c[_0x2a270e(0x2e5)])){const _0x3628df=String(RegExp['$1'])[_0x2a270e(0x2c0)](',')['map'](_0x386010=>_0x386010[_0x2a270e(0x1f6)]());;for(const _0x25aad5 of _0x3628df){let _0x85cefa=0x0;const _0x51e32e=/^\d+$/['test'](_0x25aad5);_0x51e32e?_0x85cefa=Number(_0x25aad5):_0x85cefa=DataManager[_0x2a270e(0x221)](_0x25aad5);if($dataSkills[_0x85cefa]){const _0x436cfa=$dataSkills[_0x85cefa];_0x531d6b=TextManager[_0x2a270e(0x37b)]['format'](_0x2a270e(0x2e8)[_0x2a270e(0x345)](_0x436cfa[_0x2a270e(0x31b)]),_0x436cfa[_0x2a270e(0x278)]),_0x531d6b[_0x2a270e(0x3b1)]>0x0&&(_0x39d834!==''?_0x39d834=_0x5d6310[_0x2a270e(0x345)](_0x39d834,_0x531d6b):_0x39d834=_0x531d6b);}}}if(_0x142c14[_0x2a270e(0x212)](_0x22000c[_0x2a270e(0x343)])){const _0x4a6a9a=String(RegExp['$1'])[_0x2a270e(0x2c0)](',')[_0x2a270e(0x1ff)](_0x4acb82=>_0x4acb82[_0x2a270e(0x1f6)]());;for(const _0x2b5d4e of _0x4a6a9a){let _0x2d4c0d=0x0;const _0x245d88=/^\d+$/['test'](_0x2b5d4e);_0x245d88?_0x2d4c0d=Number(_0x2b5d4e):_0x2d4c0d=DataManager[_0x2a270e(0x221)](_0x2b5d4e);if($dataSkills[_0x2d4c0d]){const _0x40e6db=$dataSkills[_0x2d4c0d];_0x531d6b=TextManager['skillLearnReqSkillFmt'][_0x2a270e(0x345)](_0x2a270e(0x2e8)[_0x2a270e(0x345)](_0x40e6db[_0x2a270e(0x31b)]),_0x40e6db['name']),_0x531d6b[_0x2a270e(0x3b1)]>0x0&&(_0x39d834!==''?_0x39d834=_0x5d6310[_0x2a270e(0x345)](_0x39d834,_0x531d6b):_0x39d834=_0x531d6b);}}}break;case _0x2a270e(0x1ce):if(_0x142c14[_0x2a270e(0x212)](_0x22000c[_0x2a270e(0x2bd)])){const _0x53ed52=String(RegExp['$1'])['split'](',')[_0x2a270e(0x1ff)](_0x867226=>_0x867226[_0x2a270e(0x1f6)]());;for(const _0x1a54c1 of _0x53ed52){$dataSystem[_0x2a270e(0x33a)][_0x1a54c1]&&(_0x531d6b=TextManager[_0x2a270e(0x198)][_0x2a270e(0x345)]($dataSystem[_0x2a270e(0x33a)][_0x1a54c1]||''),_0x531d6b[_0x2a270e(0x3b1)]>0x0&&(_0x39d834!==''?_0x39d834=_0x5d6310[_0x2a270e(0x345)](_0x39d834,_0x531d6b):_0x39d834=_0x531d6b));}}if(_0x142c14['match'](_0x22000c[_0x2a270e(0x1d1)])){const _0x1d5630=String(RegExp['$1'])[_0x2a270e(0x2c0)](',')['map'](_0x25e1c1=>_0x25e1c1[_0x2a270e(0x1f6)]());;for(const _0x4096ce of _0x1d5630){$dataSystem[_0x2a270e(0x33a)][_0x4096ce]&&(_0x531d6b=TextManager[_0x2a270e(0x198)][_0x2a270e(0x345)]($dataSystem[_0x2a270e(0x33a)][_0x4096ce]||''),_0x531d6b['length']>0x0&&(_0x39d834!==''?_0x39d834=_0x5d6310['format'](_0x39d834,_0x531d6b):_0x39d834=_0x531d6b));}}break;case'CUSTOM':const _0x32daf2=VisuMZ[_0x2a270e(0x1e4)]['createKeyJS'](_0xfd98dd,_0x2a270e(0x39d));VisuMZ[_0x2a270e(0x1e4)]['JS'][_0x32daf2]&&(_0x531d6b=VisuMZ[_0x2a270e(0x1e4)]['JS'][_0x32daf2]['call'](this,this[_0x2a270e(0x254)],_0xfd98dd),_0x531d6b[_0x2a270e(0x3b1)]>0x0&&(_0x39d834!==''?_0x39d834=_0x5d6310[_0x2a270e(0x345)](_0x39d834,_0x531d6b):_0x39d834=_0x531d6b));break;}}return _0x39d834=TextManager[_0x2a270e(0x1ad)]['format'](_0x39d834),_0x39d834[_0x2a270e(0x1f6)]();},Window_SkillList['prototype'][_0x17690b(0x353)]=function(_0x172b20,_0x332bac,_0x45c0a3,_0x46393c){const _0x10d607=_0x17690b,_0x37284f=this[_0x10d607(0x2c8)](_0x172b20),_0x5ee269=this[_0x10d607(0x1bb)](_0x37284f)[_0x10d607(0x2b3)];_0x332bac+=_0x46393c-_0x5ee269,this['drawTextEx'](_0x37284f,_0x332bac,_0x45c0a3);},Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x2c8)]=function(_0x3dd000){const _0x41d426=_0x17690b;if(this['_actor']){if(DataManager['isSkill'](_0x3dd000)&&this[_0x41d426(0x254)][_0x41d426(0x235)](_0x3dd000['id']))return TextManager['skillLearnAlreadyLearned'];if(DataManager[_0x41d426(0x2f0)](_0x3dd000)&&this[_0x41d426(0x254)][_0x41d426(0x1e9)](_0x3dd000))return TextManager['skillLearnAlreadyLearned'];}const _0x231a24=VisuMZ[_0x41d426(0x1e4)][_0x41d426(0x187)][_0x41d426(0x259)],_0x4a29b1=TextManager[_0x41d426(0x2b2)];let _0x4182a7='';const _0xee8576=JsonEx[_0x41d426(0x362)](_0x231a24[_0x41d426(0x31e)]);_0xee8576[_0x41d426(0x385)](_0x41d426(0x1d3));for(const _0x426a94 of _0xee8576){if(!_0x426a94)continue;const _0x5db4e0=this[_0x41d426(0x393)](_0x3dd000,_0x426a94)[_0x41d426(0x1f6)]();_0x5db4e0[_0x41d426(0x3b1)]>0x0&&(_0x4182a7!==''?_0x4182a7=_0x4a29b1[_0x41d426(0x345)](_0x4182a7,_0x5db4e0):_0x4182a7=_0x5db4e0);}return _0x4182a7[_0x41d426(0x1f6)]();},Window_SkillList[_0x17690b(0x20c)][_0x17690b(0x393)]=function(_0x5aed79,_0x297dbf){const _0x4560ae=_0x17690b;let _0x111c66=0x0,_0x3dee96='',_0x40dc77='';switch(_0x297dbf[_0x4560ae(0x30c)]()['trim']()){case'AP':_0x111c66=DataManager[_0x4560ae(0x2c1)](_0x5aed79);if(_0x111c66>0x0)return _0x3dee96=TextManager[_0x4560ae(0x1bf)],_0x3dee96[_0x4560ae(0x345)](_0x111c66,TextManager['abilityPointsAbbr'],_0x4560ae(0x2e8)[_0x4560ae(0x345)](ImageManager[_0x4560ae(0x230)]),TextManager[_0x4560ae(0x322)]);break;case'SP':_0x111c66=DataManager['getSkillLearnSkillPointCost'](_0x5aed79);if(_0x111c66>0x0)return _0x3dee96=TextManager[_0x4560ae(0x218)],_0x3dee96[_0x4560ae(0x345)](_0x111c66,TextManager[_0x4560ae(0x328)],_0x4560ae(0x2e8)[_0x4560ae(0x345)](ImageManager[_0x4560ae(0x386)]),TextManager['skillPointsFull']);break;case'ITEM':_0x111c66=DataManager[_0x4560ae(0x18a)](_0x5aed79),_0x3dee96=TextManager[_0x4560ae(0x215)];for(const _0x589ee4 of _0x111c66){if(!_0x589ee4)continue;const _0x23e8fd=$dataItems[_0x589ee4['id']];if(!_0x23e8fd)continue;const _0xffbf69=_0x3dee96['format'](_0x589ee4[_0x4560ae(0x2a6)],'\x5cI[%1]'[_0x4560ae(0x345)](_0x23e8fd[_0x4560ae(0x31b)]),_0x23e8fd[_0x4560ae(0x278)]);_0x40dc77!==''?_0x40dc77=TextManager[_0x4560ae(0x2b2)][_0x4560ae(0x345)](_0x40dc77,_0xffbf69):_0x40dc77=_0xffbf69;}return _0x40dc77;case _0x4560ae(0x1a0):_0x111c66=DataManager[_0x4560ae(0x188)](_0x5aed79),_0x3dee96=TextManager[_0x4560ae(0x366)];for(const _0x55aec3 of _0x111c66){if(!_0x55aec3)continue;const _0x43f89f=$dataWeapons[_0x55aec3['id']];if(!_0x43f89f)continue;const _0x2b4dd7=_0x3dee96[_0x4560ae(0x345)](_0x55aec3['quantity'],'\x5cI[%1]'[_0x4560ae(0x345)](_0x43f89f[_0x4560ae(0x31b)]),_0x43f89f[_0x4560ae(0x278)]);_0x40dc77!==''?_0x40dc77=TextManager[_0x4560ae(0x2b2)][_0x4560ae(0x345)](_0x40dc77,_0x2b4dd7):_0x40dc77=_0x2b4dd7;}return _0x40dc77;case _0x4560ae(0x21e):_0x111c66=DataManager[_0x4560ae(0x373)](_0x5aed79),_0x3dee96=TextManager['skillLearnArmorFmt'];for(const _0x113fd2 of _0x111c66){if(!_0x113fd2)continue;const _0x18f64f=$dataArmors[_0x113fd2['id']];if(!_0x18f64f)continue;const _0x221c94=_0x3dee96['format'](_0x113fd2[_0x4560ae(0x2a6)],_0x4560ae(0x2e8)[_0x4560ae(0x345)](_0x18f64f[_0x4560ae(0x31b)]),_0x18f64f[_0x4560ae(0x278)]);_0x40dc77!==''?_0x40dc77=TextManager[_0x4560ae(0x2b2)][_0x4560ae(0x345)](_0x40dc77,_0x221c94):_0x40dc77=_0x221c94;}return _0x40dc77;case _0x4560ae(0x1ca):_0x111c66=DataManager[_0x4560ae(0x24b)](_0x5aed79);if(_0x111c66>0x0)return _0x3dee96=TextManager['skillLearnGoldFmt'],_0x3dee96[_0x4560ae(0x345)](_0x111c66,Imported[_0x4560ae(0x1f4)]?'\x5cI[%1]'[_0x4560ae(0x345)](VisuMZ[_0x4560ae(0x22b)][_0x4560ae(0x187)][_0x4560ae(0x281)][_0x4560ae(0x19b)]):TextManager['currencyUnit'],TextManager[_0x4560ae(0x2b7)]);break;case _0x4560ae(0x2ac):const _0x520a7=VisuMZ[_0x4560ae(0x1e4)][_0x4560ae(0x335)](_0x5aed79,'jsLearnShowListTxt');if(VisuMZ[_0x4560ae(0x1e4)]['JS'][_0x520a7])return VisuMZ[_0x4560ae(0x1e4)]['JS'][_0x520a7][_0x4560ae(0x24c)](this,this[_0x4560ae(0x254)],_0x5aed79);break;case'CP':if(Imported[_0x4560ae(0x27a)]){_0x111c66=DataManager[_0x4560ae(0x3b0)](_0x5aed79);if(_0x111c66>0x0)return _0x3dee96=TextManager[_0x4560ae(0x2bc)],_0x3dee96[_0x4560ae(0x345)](_0x111c66,TextManager['classPointsAbbr'],'\x5cI[%1]'['format'](ImageManager['classPointsIcon']),TextManager[_0x4560ae(0x368)]);break;}case'JP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x111c66=DataManager[_0x4560ae(0x372)](_0x5aed79);if(_0x111c66>0x0)return _0x3dee96=TextManager[_0x4560ae(0x1b3)],_0x3dee96['format'](_0x111c66,TextManager[_0x4560ae(0x1a8)],_0x4560ae(0x2e8)[_0x4560ae(0x345)](ImageManager['jobPointsIcon']),TextManager['jobPointsFull']);break;}}return'';},Window_ActorCommand[_0x17690b(0x20c)][_0x17690b(0x29d)]=function(){return![];};function Window_SkillLearnIngredients(){this['initialize'](...arguments);}Window_SkillLearnIngredients[_0x17690b(0x20c)]=Object[_0x17690b(0x190)](Window_Base[_0x17690b(0x20c)]),Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x267)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x26c)]=function(_0x2f3a60){const _0xd2f71f=_0x17690b;Window_Base[_0xd2f71f(0x20c)][_0xd2f71f(0x26c)][_0xd2f71f(0x24c)](this,_0x2f3a60);},Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x38e)]=function(){const _0x1bed73=_0x17690b;this[_0x1bed73(0x214)]['clear'](),this[_0x1bed73(0x1a3)](),this[_0x1bed73(0x1c0)]()?this[_0x1bed73(0x213)]():this[_0x1bed73(0x334)]();},Window_SkillLearnIngredients['prototype'][_0x17690b(0x2e9)]=function(_0x5d7005,_0x163d13,_0x341334,_0x3e7fec){const _0x2e8549=_0x17690b,_0x3be529=this[_0x2e8549(0x1bb)](_0x5d7005)['width'],_0x513a57=_0x163d13+Math[_0x2e8549(0x3a7)]((_0x3e7fec-_0x3be529)/0x2);this[_0x2e8549(0x346)](_0x5d7005,_0x513a57,_0x341334);},Window_SkillLearnIngredients['prototype'][_0x17690b(0x1c9)]=function(_0x215ebf,_0x5b692c,_0x10f6fd,_0x393386){const _0x2ef40c=_0x17690b,_0x43ea68=this['textSizeEx'](_0x215ebf)[_0x2ef40c(0x2b3)],_0x6bcab7=_0x5b692c+Math[_0x2ef40c(0x3a7)](_0x393386-_0x43ea68);this[_0x2ef40c(0x346)](_0x215ebf,_0x6bcab7,_0x10f6fd);},Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x1c0)]=function(){const _0x32c9a3=_0x17690b,_0x287900=SceneManager[_0x32c9a3(0x344)][_0x32c9a3(0x388)](),_0xcde7e6=SceneManager[_0x32c9a3(0x344)][_0x32c9a3(0x2b8)]();return _0xcde7e6&&!_0xcde7e6[_0x32c9a3(0x312)](_0x287900);},Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x213)]=function(){const _0x434c85=_0x17690b,_0x447b9d=SceneManager['_scene']['item'](),_0x127c2e=VisuMZ['SkillLearnSystem'][_0x434c85(0x196)],_0x77a1a7=_0x447b9d[_0x434c85(0x25d)],_0x30a0a3=SceneManager[_0x434c85(0x344)][_0x434c85(0x2b8)](),_0x30bf98=this['lineHeight'](),_0x2c3aa6=TextManager[_0x434c85(0x310)],_0x56d126=TextManager[_0x434c85(0x319)];let _0x2a5a83=0x0,_0x3fe69d=0x0;const _0x17f99f=_0x434c85(0x2e8)[_0x434c85(0x345)](_0x447b9d[_0x434c85(0x31b)]),_0x132b1e=TextManager[_0x434c85(0x291)][_0x434c85(0x345)](_0x17f99f,_0x447b9d[_0x434c85(0x278)]);this['drawTextExCenterAlign'](_0x132b1e,_0x2a5a83,_0x3fe69d,this[_0x434c85(0x193)]),_0x3fe69d+=Math[_0x434c85(0x3a7)](_0x30bf98*1.5);let _0x60aa18='';if(_0x77a1a7['match'](_0x127c2e[_0x434c85(0x27c)])){const _0x6195=Number(RegExp['$1']),_0x2ec55b=TextManager[_0x434c85(0x2f7)]['format'](_0x6195,TextManager[_0x434c85(0x2fa)],TextManager[_0x434c85(0x2ca)]),_0x3b57d5=_0x30a0a3[_0x434c85(0x2fa)]>=_0x6195?_0x2c3aa6:_0x56d126;_0x60aa18+=_0x3b57d5[_0x434c85(0x345)](_0x2ec55b)+'\x0a';}if(_0x77a1a7[_0x434c85(0x212)](_0x127c2e['LearnReqSkillsAll'])){const _0x245ab3=String(RegExp['$1'])[_0x434c85(0x2c0)](',')[_0x434c85(0x1ff)](_0x457643=>_0x457643[_0x434c85(0x1f6)]());;for(const _0x36e1ed of _0x245ab3){let _0x1cbfad=0x0;const _0x5ba785=/^\d+$/[_0x434c85(0x292)](_0x36e1ed);_0x5ba785?_0x1cbfad=Number(_0x36e1ed):_0x1cbfad=DataManager[_0x434c85(0x221)](_0x36e1ed);const _0x280c7f=$dataSkills[_0x1cbfad];if(_0x280c7f){const _0x2938a9=TextManager[_0x434c85(0x396)]['format']('\x5cI[%1]'['format'](_0x280c7f[_0x434c85(0x31b)]),_0x280c7f['name']),_0x78c71b=_0x30a0a3['isLearnedSkill'](_0x1cbfad)?_0x2c3aa6:_0x56d126;_0x60aa18+=_0x78c71b[_0x434c85(0x345)](_0x2938a9)+'\x0a';}}}if(_0x77a1a7['match'](_0x127c2e[_0x434c85(0x343)])){const _0x113a03=String(RegExp['$1'])[_0x434c85(0x2c0)](',')[_0x434c85(0x1ff)](_0x16e1b9=>_0x16e1b9[_0x434c85(0x1f6)]());;for(const _0x378e2c of _0x113a03){let _0x55e8b3=0x0;const _0x355d46=/^\d+$/[_0x434c85(0x292)](_0x378e2c);_0x355d46?_0x55e8b3=Number(_0x378e2c):_0x55e8b3=DataManager['getSkillIdWithName'](_0x378e2c);const _0x4902f5=$dataSkills[_0x55e8b3];if(_0x4902f5){const _0x16966e=TextManager[_0x434c85(0x396)][_0x434c85(0x345)](_0x434c85(0x2e8)['format'](_0x4902f5[_0x434c85(0x31b)]),_0x4902f5['name']),_0x485807=_0x30a0a3[_0x434c85(0x235)](_0x55e8b3)?_0x2c3aa6:_0x56d126;_0x60aa18+=_0x485807[_0x434c85(0x345)](_0x16966e)+'\x0a';}}}if(_0x77a1a7[_0x434c85(0x212)](_0x127c2e['LearnReqSwitchesAll'])){const _0xc1e72b=String(RegExp['$1'])[_0x434c85(0x2c0)](',')[_0x434c85(0x1ff)](_0x4b1a67=>Number(_0x4b1a67));for(const _0x18d2f3 of _0xc1e72b){const _0x5b0739=$dataSystem[_0x434c85(0x33a)][_0x18d2f3],_0x59e24e=$gameSwitches[_0x434c85(0x1d2)](_0x18d2f3)?_0x2c3aa6:_0x56d126;_0x60aa18+=_0x59e24e['format'](_0x5b0739)+'\x0a';}}if(_0x77a1a7[_0x434c85(0x212)](_0x127c2e['LearnReqSwitchesAny'])){const _0x2a51a5=String(RegExp['$1'])[_0x434c85(0x2c0)](',')[_0x434c85(0x1ff)](_0x1349fe=>Number(_0x1349fe));for(const _0x5da911 of _0x2a51a5){const _0x66ece8=$dataSystem[_0x434c85(0x33a)][_0x5da911],_0x142195=$gameSwitches[_0x434c85(0x1d2)](_0x5da911)?_0x2c3aa6:_0x56d126;_0x60aa18+=_0x142195['format'](_0x66ece8)+'\x0a';}}const _0x503225=VisuMZ[_0x434c85(0x1e4)][_0x434c85(0x335)](_0x447b9d,_0x434c85(0x1bc));if(VisuMZ[_0x434c85(0x1e4)]['JS'][_0x503225]){const _0x5bc951=VisuMZ[_0x434c85(0x1e4)]['JS'][_0x503225][_0x434c85(0x24c)](this,_0x30a0a3,_0x447b9d);_0x60aa18+=_0x5bc951+'\x0a';}this['drawTextExCenterAlign'](_0x60aa18,_0x2a5a83,_0x3fe69d,this[_0x434c85(0x193)]);},Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x334)]=function(){const _0xe91d3a=_0x17690b,_0x501d3a=SceneManager['_scene']['item'](),_0x209562=SceneManager['_scene']['user'](),_0x20f236=this['getSkillLearnDisplayedCosts']();let _0x5054b6=0x0,_0x593410=0x0;const _0x551bff=this[_0xe91d3a(0x224)](),_0x4c2712=Math['round'](this['innerWidth']/0x2),_0x8c31b7=Math['round'](this[_0xe91d3a(0x193)]/0x4),_0x579909=0x0,_0x44d89a=_0x4c2712,_0x490fd5=_0x4c2712+_0x8c31b7;let _0x1ced7d='\x5cI[%1]'[_0xe91d3a(0x345)](_0x501d3a[_0xe91d3a(0x31b)]),_0x5c3986=_0x501d3a['name'];Imported[_0xe91d3a(0x36c)]&&DataManager[_0xe91d3a(0x2f0)](_0x501d3a)&&(_0x1ced7d=_0xe91d3a(0x2e8)[_0xe91d3a(0x345)](DataManager[_0xe91d3a(0x37f)](_0x501d3a)),_0x5c3986=DataManager['getEquipPassiveName'](_0x501d3a));let _0x1844b8=TextManager[_0xe91d3a(0x1a9)][_0xe91d3a(0x345)](_0x1ced7d,_0x5c3986);this['drawTextExCenterAlign'](_0x1844b8,_0x5054b6,_0x593410,this[_0xe91d3a(0x193)]),_0x593410+=_0x551bff,this[_0xe91d3a(0x2e9)](TextManager[_0xe91d3a(0x35d)],_0x579909,_0x593410,_0x4c2712),this[_0xe91d3a(0x2e9)](TextManager[_0xe91d3a(0x1ec)],_0x44d89a,_0x593410,_0x8c31b7),this[_0xe91d3a(0x2e9)](TextManager[_0xe91d3a(0x2a0)],_0x490fd5,_0x593410,_0x8c31b7),_0x593410+=_0x551bff;const _0x26a7f6=_0x579909+this[_0xe91d3a(0x2b1)]();for(const _0x2c9be5 of _0x20f236){this['resetFontSettings']();let _0x14c947='',_0x5caaa0=0x0,_0x321f7b=0x0,_0x3f445c='';switch(_0x2c9be5['toUpperCase']()[_0xe91d3a(0x1f6)]()){case'AP':_0x5caaa0=DataManager[_0xe91d3a(0x2c1)](_0x501d3a);if(_0x5caaa0<=0x0)continue;this[_0xe91d3a(0x271)](_0x5caaa0,_0x44d89a,_0x593410,_0x8c31b7,'right'),_0x14c947=_0xe91d3a(0x27d)['format'](ImageManager[_0xe91d3a(0x230)],TextManager[_0xe91d3a(0x322)]),this['drawTextEx'](_0x14c947,_0x26a7f6,_0x593410),_0x321f7b=_0x209562['getAbilityPoints'](),this[_0xe91d3a(0x271)](_0x321f7b,_0x490fd5,_0x593410,_0x8c31b7-this['itemPadding'](),'right');break;case'SP':_0x5caaa0=DataManager[_0xe91d3a(0x32e)](_0x501d3a);if(_0x5caaa0<=0x0)continue;this[_0xe91d3a(0x1c6)](_0x5caaa0,_0x44d89a,_0x593410,_0x8c31b7,_0xe91d3a(0x19a)),_0x14c947=_0xe91d3a(0x27d)['format'](ImageManager[_0xe91d3a(0x386)],TextManager[_0xe91d3a(0x1e6)]),this[_0xe91d3a(0x346)](_0x14c947,_0x26a7f6,_0x593410),_0x321f7b=_0x209562[_0xe91d3a(0x2b4)](),this[_0xe91d3a(0x1c6)](_0x321f7b,_0x490fd5,_0x593410,_0x8c31b7-this[_0xe91d3a(0x2b1)](),_0xe91d3a(0x19a));break;case'GOLD':_0x5caaa0=DataManager[_0xe91d3a(0x24b)](_0x501d3a);if(_0x5caaa0<=0x0)continue;this['drawCurrencyValue'](_0x5caaa0,TextManager['currencyUnit'],_0x44d89a,_0x593410,_0x8c31b7);const _0x4f25d1=Imported[_0xe91d3a(0x1f4)]?_0xe91d3a(0x2e8)[_0xe91d3a(0x345)](VisuMZ[_0xe91d3a(0x22b)][_0xe91d3a(0x187)][_0xe91d3a(0x281)][_0xe91d3a(0x19b)]):TextManager[_0xe91d3a(0x2b7)];_0x14c947=_0xe91d3a(0x202)[_0xe91d3a(0x345)](_0x4f25d1,TextManager[_0xe91d3a(0x2b7)]),this[_0xe91d3a(0x346)](_0x14c947,_0x26a7f6,_0x593410),_0x321f7b=$gameParty['gold'](),this[_0xe91d3a(0x2d9)](_0x321f7b,TextManager[_0xe91d3a(0x2b7)],_0x490fd5,_0x593410,_0x8c31b7-this[_0xe91d3a(0x2b1)]());break;case _0xe91d3a(0x20a):const _0x26083e=DataManager[_0xe91d3a(0x18a)](_0x501d3a);if(_0x26083e[_0xe91d3a(0x3b1)]<=0x0)continue;for(const _0x28a4f8 of _0x26083e){if(!_0x28a4f8)continue;const _0x480e76=$dataItems[_0x28a4f8['id']];_0x3f445c=TextManager['skillLearnItemFmt'],this[_0xe91d3a(0x1ba)](_0x480e76,_0x26a7f6,_0x593410,_0x4c2712-_0x26a7f6),_0x14c947=_0x3f445c['format'](_0x28a4f8['quantity'],'\x5cI[%1]'['format'](_0x480e76[_0xe91d3a(0x31b)]),_0x480e76[_0xe91d3a(0x278)]),this[_0xe91d3a(0x1c9)](_0x14c947,_0x44d89a,_0x593410,_0x8c31b7),_0x14c947=_0x3f445c[_0xe91d3a(0x345)]($gameParty[_0xe91d3a(0x1eb)](_0x480e76),_0xe91d3a(0x2e8)[_0xe91d3a(0x345)](_0x480e76[_0xe91d3a(0x31b)]),_0x480e76[_0xe91d3a(0x278)]),this[_0xe91d3a(0x1c9)](_0x14c947,_0x490fd5,_0x593410,_0x8c31b7-this['itemPadding']()),_0x593410+=_0x551bff;if(_0x593410+_0x551bff>this[_0xe91d3a(0x3ae)])return;}continue;break;case _0xe91d3a(0x1a0):const _0x1633aa=DataManager[_0xe91d3a(0x188)](_0x501d3a);if(_0x1633aa[_0xe91d3a(0x3b1)]<=0x0)continue;for(const _0x444b26 of _0x1633aa){if(!_0x444b26)continue;const _0x114721=$dataWeapons[_0x444b26['id']];_0x3f445c=TextManager['skillLearnWeaponFmt'],this[_0xe91d3a(0x1ba)](_0x114721,_0x26a7f6,_0x593410,_0x4c2712-_0x26a7f6),_0x14c947=_0x3f445c[_0xe91d3a(0x345)](_0x444b26[_0xe91d3a(0x2a6)],_0xe91d3a(0x2e8)[_0xe91d3a(0x345)](_0x114721['iconIndex']),_0x114721[_0xe91d3a(0x278)]),this[_0xe91d3a(0x1c9)](_0x14c947,_0x44d89a,_0x593410,_0x8c31b7),_0x14c947=_0x3f445c[_0xe91d3a(0x345)]($gameParty[_0xe91d3a(0x1eb)](_0x114721),'\x5cI[%1]'[_0xe91d3a(0x345)](_0x114721[_0xe91d3a(0x31b)]),_0x114721[_0xe91d3a(0x278)]),this[_0xe91d3a(0x1c9)](_0x14c947,_0x490fd5,_0x593410,_0x8c31b7-this[_0xe91d3a(0x2b1)]()),_0x593410+=_0x551bff;if(_0x593410+_0x551bff>this['innerHeight'])return;}continue;break;case _0xe91d3a(0x21e):const _0x2e14f2=DataManager[_0xe91d3a(0x373)](_0x501d3a);if(_0x2e14f2[_0xe91d3a(0x3b1)]<=0x0)continue;for(const _0x194c17 of _0x2e14f2){if(!_0x194c17)continue;const _0x4f3aed=$dataArmors[_0x194c17['id']];_0x3f445c=TextManager[_0xe91d3a(0x2bb)],this[_0xe91d3a(0x1ba)](_0x4f3aed,_0x26a7f6,_0x593410,_0x4c2712-_0x26a7f6),_0x14c947=_0x3f445c[_0xe91d3a(0x345)](_0x194c17[_0xe91d3a(0x2a6)],'\x5cI[%1]'[_0xe91d3a(0x345)](_0x4f3aed[_0xe91d3a(0x31b)]),_0x4f3aed['name']),this[_0xe91d3a(0x1c9)](_0x14c947,_0x44d89a,_0x593410,_0x8c31b7),_0x14c947=_0x3f445c['format']($gameParty['numItems'](_0x4f3aed),_0xe91d3a(0x2e8)[_0xe91d3a(0x345)](_0x4f3aed[_0xe91d3a(0x31b)]),_0x4f3aed[_0xe91d3a(0x278)]),this[_0xe91d3a(0x1c9)](_0x14c947,_0x490fd5,_0x593410,_0x8c31b7-this['itemPadding']()),_0x593410+=_0x551bff;if(_0x593410+_0x551bff>this[_0xe91d3a(0x3ae)])return;}continue;break;case _0xe91d3a(0x2ac):const _0x2dd15c=VisuMZ[_0xe91d3a(0x1e4)]['createKeyJS'](_0x501d3a,_0xe91d3a(0x28e));if(VisuMZ['SkillLearnSystem']['JS'][_0x2dd15c])_0x14c947=VisuMZ[_0xe91d3a(0x1e4)]['JS'][_0x2dd15c][_0xe91d3a(0x24c)](this,_0x209562,_0x501d3a),this[_0xe91d3a(0x346)](_0x14c947,_0x26a7f6,_0x593410);else continue;break;case'CP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x5caaa0=DataManager['getSkillLearnClassPointCost'](_0x501d3a)||0x0;if(_0x5caaa0<=0x0)continue;this[_0xe91d3a(0x36f)](_0x5caaa0,_0x44d89a,_0x593410,_0x8c31b7,_0xe91d3a(0x19a)),_0x14c947=_0xe91d3a(0x27d)[_0xe91d3a(0x345)](ImageManager[_0xe91d3a(0x3a3)],TextManager[_0xe91d3a(0x368)]),this[_0xe91d3a(0x346)](_0x14c947,_0x26a7f6,_0x593410),_0x321f7b=_0x209562[_0xe91d3a(0x309)](),this[_0xe91d3a(0x36f)](_0x321f7b,_0x490fd5,_0x593410,_0x8c31b7-this['itemPadding'](),'right');}else continue;break;case'JP':if(Imported[_0xe91d3a(0x27a)]){_0x5caaa0=DataManager[_0xe91d3a(0x372)](_0x501d3a)||0x0;if(_0x5caaa0<=0x0)continue;this[_0xe91d3a(0x2cd)](_0x5caaa0,_0x44d89a,_0x593410,_0x8c31b7,_0xe91d3a(0x19a)),_0x14c947=_0xe91d3a(0x27d)[_0xe91d3a(0x345)](ImageManager['jobPointsIcon'],TextManager[_0xe91d3a(0x1b2)]),this[_0xe91d3a(0x346)](_0x14c947,_0x26a7f6,_0x593410),_0x321f7b=_0x209562['getJobPoints'](),this[_0xe91d3a(0x2cd)](_0x321f7b,_0x490fd5,_0x593410,_0x8c31b7-this[_0xe91d3a(0x2b1)](),_0xe91d3a(0x19a));}else continue;break;default:continue;}_0x593410+=_0x551bff;if(_0x593410+_0x551bff>this['innerHeight'])return;}},Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x18c)]=function(){const _0x3610c1=_0x17690b,_0x340181=JsonEx[_0x3610c1(0x362)](VisuMZ[_0x3610c1(0x1e4)][_0x3610c1(0x187)][_0x3610c1(0x259)][_0x3610c1(0x31e)]);return _0x340181[_0x3610c1(0x385)]('Custom'),_0x340181;},Window_SkillLearnIngredients[_0x17690b(0x20c)][_0x17690b(0x22d)]=function(){return![];};function Window_SkillLearnConfirm(){const _0x5c4c7d=_0x17690b;this[_0x5c4c7d(0x26c)](...arguments);}Window_SkillLearnConfirm['prototype']=Object['create'](Window_HorzCommand[_0x17690b(0x20c)]),Window_SkillLearnConfirm['prototype']['constructor']=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x17690b(0x20c)]['initialize']=function(_0x613a49){const _0x160b2b=_0x17690b;Window_HorzCommand['prototype'][_0x160b2b(0x26c)][_0x160b2b(0x24c)](this,_0x613a49);},Window_SkillLearnConfirm[_0x17690b(0x20c)][_0x17690b(0x1fb)]=function(){return 0x2;},Window_SkillLearnConfirm[_0x17690b(0x20c)]['itemHeight']=function(){return this['innerHeight'];},Window_SkillLearnConfirm[_0x17690b(0x20c)][_0x17690b(0x2ce)]=function(){const _0x4c80cb=_0x17690b;this[_0x4c80cb(0x3b3)](TextManager[_0x4c80cb(0x1c3)],'ok',this['isConfirmEnabled']()),this['addCommand'](TextManager[_0x4c80cb(0x3a0)],'cancel');},Window_SkillLearnConfirm[_0x17690b(0x20c)]['isConfirmEnabled']=function(){const _0x336d8c=_0x17690b,_0x246178=SceneManager[_0x336d8c(0x344)];if(!_0x246178)return![];const _0x16bdad=_0x246178[_0x336d8c(0x2b8)]();if(!_0x16bdad)return![];const _0x167847=_0x246178[_0x336d8c(0x388)]();if(!_0x167847)return![];if(!_0x16bdad[_0x336d8c(0x312)](_0x167847))return![];return _0x16bdad['canPayForSkillLearnSystem'](_0x167847);},Window_SkillLearnConfirm[_0x17690b(0x20c)][_0x17690b(0x1df)]=function(_0x557135){const _0x12022e=_0x17690b,_0x34bbea=this[_0x12022e(0x360)](_0x557135);this[_0x12022e(0x377)](),this['changePaintOpacity'](this['isCommandEnabled'](_0x557135));const _0xf20091=this[_0x12022e(0x384)](_0x557135),_0x32f93c=this[_0x12022e(0x1bb)](_0xf20091)[_0x12022e(0x2b3)];_0x34bbea['x']+=Math['round']((_0x34bbea[_0x12022e(0x2b3)]-_0x32f93c)/0x2),this['drawTextEx'](_0xf20091,_0x34bbea['x'],_0x34bbea['y'],_0x32f93c);},Window_SkillLearnConfirm[_0x17690b(0x20c)][_0x17690b(0x201)]=function(){const _0x581c24=_0x17690b;if(this['currentSymbol']()==='ok'){}else Window_HorzCommand['prototype'][_0x581c24(0x201)]['call'](this);};