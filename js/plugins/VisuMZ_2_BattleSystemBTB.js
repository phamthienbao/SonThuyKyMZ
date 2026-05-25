//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
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
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
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
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
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
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
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
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
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
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
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
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
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
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
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
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
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
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.16: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where strict action fusion combinations would not register.
 *    Fix made by Olivia.
 * 
 * Version 1.15: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where action fusions would consume double the amount of items
 *    if the skills were to cost items. Fix made by Olivia.
 * 
 * Version 1.14: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
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
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
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
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
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
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
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
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
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
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
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
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
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
 * @param BattleSystemBTB
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
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
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
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
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
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
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
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
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
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x4b87bd=_0x227a;function _0x235d(){const _0x51a26a=['isSceneBattle','pop','containerWindow','initHomePositions','QjLHC','_fullWidth','zeiEJ','BattleManager_isTpb','registerCommand','EnemyBattlerDrawLetter','fOMsU','EPpVj','contents','EnemyBattlerFontFace','Window_BattleStatus_drawItemStatusListStyle','resetFontSettings','updatePadding','qCsNo','createLetterSprite','Class-%1-%2','STRUCT','faceHeight','destroyBTBActionCounters','ScreenBuffer','_btbSkillFlexFusion','btbBravePointsIcon','gRLXy','BraveAnimationID','removeActor','MinBravePointsHardCap','length','kJRFm','braveAnimationTimes','onBattleStart','ParseItemNotetags','Game_Action_allowRandomSpeed','item','needsSelection','numItems','NpxWc','RepositionTopHelpX','boxHeight','index','brave','CkcvI','XjfJO','createBackgroundSprite','updateTurnOrderBTB','FSKxB','OrderDirection','members','PVDvr','_graphicFaceIndex','battlerName','qubMb','ParseAllNotetags','makeDeepCopy','zPAog','HEcFU','max','isDrawItemNumber','_actionInputIndex','isBattleSystemBTBTurnOrderVisible','canActionFusionWithBTB','Cancel','142183lJBmpA','_weapons','getItemIdWithName','EnemyActionFusions','NwrBg','BravePointCostFmt','isInputting','qlzFv','checkActionsBTB','aAthB','DisplayPosition','getSkillIdWithName','predictedBravePointCost','getColor','MaxVertSprites','bAsrF','_graphicType','modifyBTBActionCounterSprite','_isAlive','concat','setAttack','right','_scrollX','_positionTargetY','ItemScene','RISvg','%1_offsetY','kkyLd','btbCostFormat','refreshStatusBTB','BravePointsIcon','LITmF','showBravePoints','setBTBGraphicIconIndex','optDisplayTp','regenerateBravePoints','createBorderSprite','commandCancelBTB','_containerHeight','createTurnOrderBTBGraphicIconIndex','currentSymbol','process_VisuMZ_BattleSystemBTB_Notetags','updateBattleContainerOrder','getTotalActionFusionRecipes','status','maxBattleMembers','%1_offsetX','slice','BtbTurnOrderActorIcon','lMmfT','SubjectDistance','Enemies','FUNC','BravePointRegenBase','Skill-%1-%2','BattleManager_startInput','CalcActionSpeedJS','BtbTurnOrderActorFace','MaxActionsDefault','getOffsetX_BTB','isSkill','numActions','left','canInput','performCollapse','4265300TSETpl','_turnOrderInnerSprite','minBravePoints','test','process_VisuMZ_BattleSystemBTB','_actorCommandWindow','btbPaySkillFusionCosts','setBattleSystemBTBTurnOrderVisible','setBravePoints','drawTextEx','maxBravePoints','ShowMarkerBorder','_phase','_skillIDs','MvtJh','map','_letterSprite','Window_Help_setItem','Show_0_BP_Cost','BattleManager_isActiveTpb','KNHfC','STR','checkPosition','_graphicSv','version','setActionFusionBTB','Game_Battler_makeActionTimes','TbVRq','windowRect','ItemQuantityFontSize','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ActionSlot','DrawActionCountersJS','ActionCurrent','itemLineRect','wQPns','attack','Game_Battler_performCollapse','BravePointRegen','_windowLayer','updateGraphicHue','qlWJA','EnemyMultiAction','AllowRandomSpeed','BattleManager_startTurn','%1_align','RepositionTopForHelp','BravePointCost','Parse_Notetags_BravePointsUserJS','canGuard','process_VisuMZ_BattleSystemBTB_JS','subject','SpriteThin','rsMax','some','gradientFillRect','isItem','Window_ActorCommand_makeCommandList','setText','_homeX','selectNextCommand','QCRDl','height','TurnOrderBTBGraphicFaceName','loadSystem','MinBravePoints','fJcKP','drawItemStatusXPStyle','gainBravePoints','addBraveCommand','TYhFk','_graphicHue','modifyBTBActionCounterSprite_Fallback','createInitialPositions','JaCCB','gzEvt','oCiXN','padding','checkOpacity','aiWCl','ZWWtP','FusionStrict','BorderThickness','mfNiE','TurnOrderBTBGraphicFaceIndex','setup','_graphicFaceName','_guardUnleash','_isBattleOver','nacQj','loadFace','faceIndex','_itemIDs','onTurnEnd','Window_Selectable_select','useItem','includes','ItemQuantityFmt','_positionTargetX','vYEXE','Game_Enemy_makeActions','JsBravePointsUser','_btbTurnOrderFaceName','fontSize','setBlendColor','IconIndex','BtbTurnOrderEnemyFace','_homeDuration','faceWidth','setSkill','NHEeu','_btbItemFlexFusion','skillCostSeparator','LpYPA','Brave','onTurnEndBTB','mainSprite','MaxActions','_logWindow','startAction','getBattleSystem','btbActionCurrent','predictedBravePoints','Phohi','_btbTurnOrderWindow','removeChild','commandStyle','sQCPY','note','bitmapWidth','ceil','BTB','setHandler','substring','performBrave','getOffsetY_BTB','Window_BattleStatus_drawItemStatusXPStyle','ARRAYSTRUCT','BattleManager_makeActionOrders','tstqm','sortActionOrdersBTB','calculateTargetPositions','makeCommandList','loadSvActor','MaxBravePointsDefault','Game_BattlerBase_canGuard','drawItemStatusListStyle','getAlignmentBTB','_targetHomeX','_subject','createActorCommandWindowBTB','Window_Base_drawItemNumber','RegExp','EWutV','btbMatchesCurrentFusionAction','_targetHomeY','Actor','NfZMO','updateHomePosition','6VOaxkQ','EnemyBattlerFaceName','_braveStartupAnimation','Window_Selectable_cursorPageup','updateSelectionEffect','center','ConvertParams','hide','cursorPagedown','ARRAYJSON','blt','BattleLayout','_backgroundSprite','CannotBrave','createTurnOrderBTBGraphicType','BravePointStartFavor','SBJdh','Visible','nhlDk','width','floor','Gdfhq','%1BgColor2','FNBtx','Item-%1-%2','onDisabledPartyCommandSelection','setItem','wgMDh','EnableFusion','lineHeight','btbBraveCommand','compareBattlerSprites','_unit','WaitFrames','createAllWindows','jTqzz','_positionDuration','SystemTurnOrderVisibility','guardSkillId','SpriteLength','getActionFusionCombinationsBTB','remove','maxBraveActions','Kefsy','format','MniAf','_surprise','_actor','formFlexCombo','Window','iconWidth','BattleManager_startAction','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','exit','singleSkill','CannotFusion','_graphicEnemy','icon','_btbActionSprite','BraveShortcuts','isActiveTpb','%1AnimationID','applyItemUserEffect','Xtmft','#000000','startActionBTB','repositionLogWindowBTB','Window_Selectable_cursorPagedown','6061038xapXKb','BravePointItemCost','Game_Actor_makeActions','ActorActionFusions','isActor','match','currentAction','enemy','speed','_graphicIconIndex','svActorHorzCells','%1BorderColor','setHue','_position','BTB_MAX_BRAVEPOINTS_DEFAULT','changeIconGraphicBitmap','repeat','makeAdditionalCostTextBTB','ptBHK','%1\x20%2\x20%3','DisplayOffsetY','_btbTurnOrderGraphicType','Show_1_BP_Cost','makeActionTimes','useItemBTB','clear','_scene','Scene_Battle_onDisabledPartyCommandSelection','Game_BattlerBase_appear','Window_BattleLog_startAction','makeActions','ParseSkillNotetags','indexOf','\x5cC[%1]%2\x5cC[0]','BtbTurnOrderClearEnemyGraphic','push','isEnemy','btbRegisterFusions','toUpperCase','2460312JONiDZ','startTurn','return\x200','_helpWindow','sqqnc','NpDpD','name','cursorPageup','isHorz','TurnOrderBTBGraphicIconIndex','isTurnBased','isBTB','2950776YJGOyP','hEipo','_graphicSprite','RepositionLogWindow','constructor','iconHeight','10956088jGSceS','IlMIA','currentExt','Game_Action_speed','onBattleStartBTB','btbActionSlot','BTB_MIN_BRAVEPOINTS_HARD_CAP','createBattlerRect','ShowCostForAttack','getActionFusionRecipeSkills','updatePosition','Rnqgs','_btbTurnOrderVisible','requestRefresh','_btbTurnOrderIconIndex','createTestBitmap','isAppeared','addGuardCommand','canUse','Enemy-%1-%2','gmNRb','_actions','CsWAA','makeAdditionalSkillCostText','IconSet','actor','Settings','isSideView','MaxBravePointsHardCap','_letter','parse','top','BattleManager_isTurnBased','defaultPosition','%1SystemBorder','isTpb','_actionFusionRecipe','Mechanics','JsBravePointsTarget','attackSkillId','ActorBattlerType','splice','NegativeColor','canAddBraveCommand','commandCancel','_btbSkillStrictFusion','calcRegenBravePoints','BTB_MIN_BRAVEPOINTS_DEFAULT','ReduceShownBPCost','initBattleSystemBTB','btbParseFusionData','initMembers','createTurnOrderBTBGraphicFaceName','inputtingAction','updateVisibility','textSizeEx','vxcKt','getActionFusionRecipeItems','pHMCd','BravePointAlterTarget','processActionFusionsBTB','updateLetter','bind','battleSys','createTurnOrderBTBGraphicFaceIndex','canBrave','_ogWindowLayerX','BtbTurnOrderEnemyIcon','TurnOrderBTBGraphicType','applyBattleSystemBTBUserEffect','Game_Battler_onTurnEnd','min','RTaKI','MinBravePointsDefault','bravePointsCost','split','NUM','prototype','requestFauxAnimation','onDatabaseLoaded','face','guard','huCrY','allBattleMembers','startFade','makeSpeed','StatusDisplayFmt','_tempBattler','_plural','fontFace','round','bitmap','createGraphicSprite','Game_BattlerBase_canUse','%1Mute','description','drawItemNumber','addCommand','BtbTurnOrderClearActorGraphic','Game_Party_removeActor','Armor-%1-%2','Game_Battler_useItem','ksuzE','allowRandomSpeed','drawText','_items','aQVgC','sort','_bravePoints','queueBraveAnimationsBTB','_btbItemStrictFusion','_isAppeared','join','visible','boxWidth','cannotFusionNotetagBTB','_fullHeight','FusionFlex','isAlive','svActorVertCells','_turnOrderContainer','BravePointBattleStart','BTB_Help','isForFriend','active','hideBraveTrait','itemRect','\x5cI[%1]','BravePointSetTarget','AJyqQ','addChild','kWhNQ','bravePoints','3197404CJjUKu','_index','yAbMt','reduceBrave','LNGLv','%1BgColor1','EnemyBattlerIcon','%1_display','battler','svactor','EnemyBattlerFaceIndex','_armors','itemRectPortraitBTB','imaEI','xpWwQ','IBcat','battlerHue','_btbTurnOrderFaceIndex','uyEdm','MaxHorzSprites','btbPayItemFusionCosts','payBravePointsCost','createKeyJS','trim','Window_ActorCommand_addGuardCommand','Scene_Battle_createAllWindows','ARRAYSTR','UpdateFrames','BattleSystemBTB','makeActionOrders','hasSvBattler','children','FaceIndex','showBraveAnimationBTB','btbBravePointsFull','ledQg','fillRect','updateTurnOrder','recalculateHome','Weapon-%1-%2','TYbzy','RkQLO','_targetIndex','bottom','FSmXx','State-%1-%2','MaxActionsHardCap','%1-%2','clearRect','parameters','General','opacity','HwFed','BravePointSkillCost','startInput','inBattle','Game_BattlerBase_canInput','_actionBattlers','commandBrave','updateOpacity','CostPosition','FaceName','bitmapHeight','createBTBActionCounters','containerPosition','\x5cI[%1]%2','HideBravePointCost','Scene_Battle_createActorCommandWindow','mainFontFace','yZwkE','Game_System_initialize','select','Window_Base_close','PositiveColor','sWDer','RPQkD','addInnerChild','update','updateGraphic','_homeY','changeSvActorGraphicBitmap','isBattleItemWindowBTB','isSkipPartyCommandWindow','Window_Base_makeAdditionalSkillCostText','vPRQw','ShowEnemyBrave','Actors','tPtoU','battleLayoutStyle','Game_Battler_onBattleStart','shift','DkUNh','BTB_MAX_BRAVEPOINTS_HARD_CAP','addLoadListener','anchor','battleEnd','clearActions','clamp','applyItemBattleSystemBTBUserEffect','WIrMR','Game_Action_applyItemUserEffect','RzHlb','loseBravePoints','DisplayOffsetX','waitCount','_statusWindow','cannotBraveTrait','AXJdl','Scene_Boot_onDatabaseLoaded','%1Mirror','BattleManager_battleSys','jFzEi','create','_fadeDuration','Btqha','BraveAnimation','BravePointStartNeutral','iomXb','initialize','HpLyr','close','ItemsEquipsCore','NYtVj','mQQxD','createBattlerSprites','ARRAYFUNC','Game_BattlerBase_hide','_scrollY','drawActorBravePoints','loadEnemy','call','processUpdateGraphic','makeMultiActionsBTB','traitObjects','svBattlerName','applyBattleItemWindowBTB','btbBravePointsAbbr','_containerWidth','checkTargetPositions','laFPN','removeActionBattlersBTB','_bypassAiValidCheck','textWidth','_fadeTarget','cancelBrave','BravePointsFull','filter','canProcessActionFusionsBTB','CancelAnimationID','removeActionFusionIngredients','WsgJi','createBTBTurnOrderWindow','EnemyBattlerType','Enemy','changeEnemyGraphicBitmap','BTB_MAX_ACTIONS_DEFAULT'];_0x235d=function(){return _0x51a26a;};return _0x235d();}(function(_0x5e047b,_0x4920ba){const _0x62ec7=_0x227a,_0x53ee9d=_0x5e047b();while(!![]){try{const _0x5ab1e8=-parseInt(_0x62ec7(0x2df))/0x1*(parseInt(_0x62ec7(0x100))/0x2)+-parseInt(_0x62ec7(0x16b))/0x3+parseInt(_0x62ec7(0x177))/0x4+-parseInt(_0x62ec7(0x320))/0x5+parseInt(_0x62ec7(0x144))/0x6+-parseInt(_0x62ec7(0x202))/0x7+parseInt(_0x62ec7(0x17d))/0x8;if(_0x5ab1e8===_0x4920ba)break;else _0x53ee9d['push'](_0x53ee9d['shift']());}catch(_0x3a86bc){_0x53ee9d['push'](_0x53ee9d['shift']());}}}(_0x235d,0x88efd));var label=_0x4b87bd(0x21e),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4b87bd(0x294)](function(_0x1f533b){const _0x4e74e5=_0x4b87bd;return _0x1f533b[_0x4e74e5(0x30b)]&&_0x1f533b[_0x4e74e5(0x1dc)][_0x4e74e5(0x380)]('['+label+']');})[0x0];VisuMZ[label][_0x4b87bd(0x197)]=VisuMZ[label][_0x4b87bd(0x197)]||{},VisuMZ[_0x4b87bd(0x106)]=function(_0x16ea9d,_0x4cf3ed){const _0xafe581=_0x4b87bd;for(const _0x42d0a8 in _0x4cf3ed){if(_0x42d0a8[_0xafe581(0x149)](/(.*):(.*)/i)){if(_0xafe581(0xcf)!==_0xafe581(0xcf))this[_0xafe581(0x18b)]=this[_0xafe581(0x306)]();else{const _0x42da85=String(RegExp['$1']),_0x951a6f=String(RegExp['$2'])[_0xafe581(0x16a)]()['trim']();let _0x5bb5ef,_0x5e5e39,_0x43f2c9;switch(_0x951a6f){case _0xafe581(0x1c9):_0x5bb5ef=_0x4cf3ed[_0x42d0a8]!==''?Number(_0x4cf3ed[_0x42d0a8]):0x0;break;case'ARRAYNUM':_0x5e5e39=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):[],_0x5bb5ef=_0x5e5e39[_0xafe581(0x32f)](_0x7180d1=>Number(_0x7180d1));break;case'EVAL':_0x5bb5ef=_0x4cf3ed[_0x42d0a8]!==''?eval(_0x4cf3ed[_0x42d0a8]):null;break;case'ARRAYEVAL':_0x5e5e39=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):[],_0x5bb5ef=_0x5e5e39['map'](_0x2ee324=>eval(_0x2ee324));break;case'JSON':_0x5bb5ef=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):'';break;case _0xafe581(0x109):_0x5e5e39=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):[],_0x5bb5ef=_0x5e5e39[_0xafe581(0x32f)](_0x4b1747=>JSON[_0xafe581(0x19b)](_0x4b1747));break;case _0xafe581(0x313):_0x5bb5ef=_0x4cf3ed[_0x42d0a8]!==''?new Function(JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8])):new Function(_0xafe581(0x16d));break;case _0xafe581(0x27f):_0x5e5e39=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):[],_0x5bb5ef=_0x5e5e39[_0xafe581(0x32f)](_0x40c18=>new Function(JSON[_0xafe581(0x19b)](_0x40c18)));break;case _0xafe581(0x335):_0x5bb5ef=_0x4cf3ed[_0x42d0a8]!==''?String(_0x4cf3ed[_0x42d0a8]):'';break;case _0xafe581(0x21c):_0x5e5e39=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):[],_0x5bb5ef=_0x5e5e39[_0xafe581(0x32f)](_0x217079=>String(_0x217079));break;case _0xafe581(0x2b2):_0x43f2c9=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):{},_0x5bb5ef=VisuMZ[_0xafe581(0x106)]({},_0x43f2c9);break;case _0xafe581(0xea):_0x5e5e39=_0x4cf3ed[_0x42d0a8]!==''?JSON[_0xafe581(0x19b)](_0x4cf3ed[_0x42d0a8]):[],_0x5bb5ef=_0x5e5e39['map'](_0x1da1c7=>VisuMZ[_0xafe581(0x106)]({},JSON['parse'](_0x1da1c7)));break;default:continue;}_0x16ea9d[_0x42da85]=_0x5bb5ef;}}}return _0x16ea9d;},(_0x33b9ef=>{const _0x49827a=_0x4b87bd,_0x18c6aa=_0x33b9ef[_0x49827a(0x171)];for(const _0x4a77f9 of dependencies){if(!Imported[_0x4a77f9]){if('bPWYj'==='QDiDs')_0x460915[_0x49827a(0x23b)][_0x49827a(0x129)](_0x27c7ca[_0x49827a(0x196)](_0x39be90));else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x18c6aa,_0x4a77f9)),SceneManager[_0x49827a(0x135)]();break;}}}const _0x268047=_0x33b9ef[_0x49827a(0x1dc)];if(_0x268047[_0x49827a(0x149)](/\[Version[ ](.*?)\]/i)){const _0x14f47c=Number(RegExp['$1']);if(_0x14f47c!==VisuMZ[label][_0x49827a(0x338)]){if('FSmXx'===_0x49827a(0x22e))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x49827a(0x12c)](_0x18c6aa,_0x14f47c)),SceneManager[_0x49827a(0x135)]();else return _0x315ae2[_0x49827a(0x176)]()?_0x5a27b0['BattleSystemBTB'][_0x49827a(0x197)][_0x49827a(0x1a2)][_0x49827a(0x34b)]:_0x5b7270['BattleSystemBTB']['Game_Action_allowRandomSpeed'][_0x49827a(0x284)](this);}}if(_0x268047[_0x49827a(0x149)](/\[Tier[ ](\d+)\]/i)){if(_0x49827a(0x349)!==_0x49827a(0x349))return this[_0x49827a(0x285)]();else{const _0x296e65=Number(RegExp['$1']);if(_0x296e65<tier)alert(_0x49827a(0x134)[_0x49827a(0x12c)](_0x18c6aa,_0x296e65,tier)),SceneManager['exit']();else{if(_0x49827a(0x191)==='TOAlG'){const _0x52b9a6=arguments[0x0],_0x299c91=arguments[0x1],_0x52be5d=arguments[0x2];_0x52b9a6['x']=_0x530354[_0x49827a(0x1d7)](_0x299c91['width']/0x2),_0x52b9a6['y']=0x0,_0x52b9a6['anchor']['x']=0.5,_0x52b9a6[_0x49827a(0x260)]['y']=0.5;const _0x15675c=_0xaf4dd3[_0x49827a(0x182)],_0x304b5c=_0x49b573[_0x49827a(0xda)];let _0x2afe3a=_0x15675c[_0x49827a(0x154)](_0x52be5d['numActions']());const _0x3fe0ae=_0x52be5d[_0x49827a(0x2db)];_0x2afe3a=_0x2afe3a[_0x49827a(0xe6)](0x0,_0x3fe0ae)+_0x304b5c+_0x2afe3a['substring'](_0x3fe0ae+0x1);const _0x51b806=new _0x43cdd(_0x299c91['width'],_0x299c91[_0x49827a(0x11d)]());_0x51b806[_0x49827a(0xc8)]=0x24,_0x51b806[_0x49827a(0x1e5)](_0x2afe3a,0x0,0x0,_0x51b806[_0x49827a(0x113)],_0x51b806[_0x49827a(0x35e)],_0x49827a(0x105)),_0x52b9a6[_0x49827a(0x1d8)]=_0x51b806;}else tier=Math[_0x49827a(0x2d9)](_0x296e65,tier);}}}VisuMZ[_0x49827a(0x106)](VisuMZ[label][_0x49827a(0x197)],_0x33b9ef[_0x49827a(0x233)]);})(pluginData),PluginManager[_0x4b87bd(0x2a6)](pluginData['name'],_0x4b87bd(0x30f),_0x3a8df2=>{const _0x3231d3=_0x4b87bd;VisuMZ[_0x3231d3(0x106)](_0x3a8df2,_0x3a8df2);const _0xf25df0=_0x3a8df2[_0x3231d3(0x258)],_0x461ce0=_0x3a8df2[_0x3231d3(0xca)];for(const _0x5dc5ff of _0xf25df0){const _0x803805=$gameActors['actor'](_0x5dc5ff);if(!_0x803805)continue;_0x803805[_0x3231d3(0x159)]='icon',_0x803805[_0x3231d3(0x18b)]=_0x461ce0;}}),PluginManager[_0x4b87bd(0x2a6)](pluginData[_0x4b87bd(0x171)],_0x4b87bd(0x318),_0x73e360=>{const _0x116011=_0x4b87bd;VisuMZ[_0x116011(0x106)](_0x73e360,_0x73e360);const _0x123aca=_0x73e360[_0x116011(0x258)],_0x25bd90=_0x73e360[_0x116011(0x23f)],_0x5c04bf=_0x73e360[_0x116011(0x222)];for(const _0x53794e of _0x123aca){const _0x216e96=$gameActors['actor'](_0x53794e);if(!_0x216e96)continue;_0x216e96[_0x116011(0x159)]='face',_0x216e96[_0x116011(0xc7)]=_0x25bd90,_0x216e96[_0x116011(0x213)]=_0x5c04bf;}}),PluginManager['registerCommand'](pluginData[_0x4b87bd(0x171)],_0x4b87bd(0x1df),_0x3900f7=>{const _0xdb0dd9=_0x4b87bd;VisuMZ[_0xdb0dd9(0x106)](_0x3900f7,_0x3900f7);const _0x508c4a=_0x3900f7[_0xdb0dd9(0x258)];for(const _0x80c496 of _0x508c4a){const _0xd750c0=$gameActors[_0xdb0dd9(0x196)](_0x80c496);if(!_0xd750c0)continue;_0xd750c0['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x4b87bd(0x2a6)](pluginData[_0x4b87bd(0x171)],_0x4b87bd(0x1c0),_0x492c9a=>{const _0x2b965f=_0x4b87bd;VisuMZ[_0x2b965f(0x106)](_0x492c9a,_0x492c9a);const _0x4f04d4=_0x492c9a[_0x2b965f(0x312)],_0xad3bb9=_0x492c9a[_0x2b965f(0xca)];for(const _0x4048f0 of _0x4f04d4){const _0x5419ac=$gameTroop[_0x2b965f(0x2d0)]()[_0x4048f0];if(!_0x5419ac)continue;_0x5419ac[_0x2b965f(0x159)]=_0x2b965f(0x139),_0x5419ac['_btbTurnOrderIconIndex']=_0xad3bb9;}}),PluginManager[_0x4b87bd(0x2a6)](pluginData['name'],_0x4b87bd(0xcb),_0x5e46ef=>{const _0xa9307f=_0x4b87bd;VisuMZ['ConvertParams'](_0x5e46ef,_0x5e46ef);const _0x39e077=_0x5e46ef[_0xa9307f(0x312)],_0x54f1e2=_0x5e46ef['FaceName'],_0x55fb50=_0x5e46ef['FaceIndex'];for(const _0x2e4724 of _0x39e077){if(_0xa9307f(0x267)!==_0xa9307f(0x256)){const _0x4c3b55=$gameTroop[_0xa9307f(0x2d0)]()[_0x2e4724];if(!_0x4c3b55)continue;_0x4c3b55[_0xa9307f(0x159)]=_0xa9307f(0x1cd),_0x4c3b55[_0xa9307f(0xc7)]=_0x54f1e2,_0x4c3b55[_0xa9307f(0x213)]=_0x55fb50;}else{const _0x500128=new _0x11b273(_0x3a8203,_0x4d52fb);this[_0xa9307f(0x321)][_0xa9307f(0x1ff)](_0x500128),this[_0xa9307f(0x1f5)][_0xa9307f(0x167)](_0x500128);}}}),PluginManager['registerCommand'](pluginData[_0x4b87bd(0x171)],_0x4b87bd(0x166),_0x103470=>{const _0x28332d=_0x4b87bd;VisuMZ[_0x28332d(0x106)](_0x103470,_0x103470);const _0x7815a3=_0x103470['Enemies'];for(const _0x4f4b21 of _0x7815a3){const _0x46a0b9=$gameTroop[_0x28332d(0x2d0)]()[_0x4f4b21];if(!_0x46a0b9)continue;_0x46a0b9['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x4b87bd(0x2a6)](pluginData[_0x4b87bd(0x171)],_0x4b87bd(0x125),_0x173a47=>{const _0x50af2f=_0x4b87bd;VisuMZ[_0x50af2f(0x106)](_0x173a47,_0x173a47);const _0x52cabe=_0x173a47[_0x50af2f(0x111)];$gameSystem[_0x50af2f(0x327)](_0x52cabe);}),VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0xf9)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x26e)]=Scene_Boot[_0x4b87bd(0x1ca)][_0x4b87bd(0x1cc)],Scene_Boot[_0x4b87bd(0x1ca)][_0x4b87bd(0x1cc)]=function(){const _0x3a8adf=_0x4b87bd;VisuMZ[_0x3a8adf(0x21e)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x3a8adf(0x324)]();},Scene_Boot['prototype']['process_VisuMZ_BattleSystemBTB']=function(){const _0x5598e0=_0x4b87bd;this[_0x5598e0(0x308)](),this[_0x5598e0(0x352)]();},Scene_Boot['prototype']['process_VisuMZ_BattleSystemBTB_Notetags']=function(){const _0x3b5f9e=_0x4b87bd;if(VisuMZ[_0x3b5f9e(0x2d5)])return;const _0x25fd83=$dataSkills[_0x3b5f9e(0x2f2)]($dataItems);for(const _0x4b7b48 of _0x25fd83){if(!_0x4b7b48)continue;DataManager[_0x3b5f9e(0x169)](_0x4b7b48);}},VisuMZ[_0x4b87bd(0x21e)]['JS']={},Scene_Boot[_0x4b87bd(0x1ca)][_0x4b87bd(0x352)]=function(){const _0x4953d9=_0x4b87bd;if(VisuMZ[_0x4953d9(0x2d5)])return;const _0x10b6b=VisuMZ[_0x4953d9(0x21e)][_0x4953d9(0xf9)],_0x15db1e=$dataSkills['concat'](dataItems);for(const _0x107039 of _0x15db1e){if(!_0x107039)continue;VisuMZ[_0x4953d9(0x21e)][_0x4953d9(0x350)](_0x107039,_0x4953d9(0xc6)),VisuMZ[_0x4953d9(0x21e)][_0x4953d9(0x350)](_0x107039,_0x4953d9(0x1a3));}},VisuMZ[_0x4b87bd(0x21e)]['Parse_Notetags_BravePointsUserJS']=function(_0x1249cd,_0x1b2a20){const _0x191355=_0x4b87bd,_0x548874=VisuMZ[_0x191355(0x21e)][_0x191355(0xf9)][_0x1b2a20],_0x52812a=_0x1249cd['note'];if(_0x52812a[_0x191355(0x149)](_0x548874)){const _0x548b84=String(RegExp['$1']),_0x476421=_0x191355(0x33e)['format'](_0x548b84),_0x5d7d04=VisuMZ[_0x191355(0x21e)][_0x191355(0x218)](_0x1249cd,_0x1b2a20);VisuMZ[_0x191355(0x21e)]['JS'][_0x5d7d04]=new Function(_0x476421);}},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x218)]=function(_0x269155,_0x19ba39){const _0x2566be=_0x4b87bd;if(VisuMZ[_0x2566be(0x218)])return VisuMZ[_0x2566be(0x218)](_0x269155,_0x19ba39);let _0xea7c0='';if($dataActors[_0x2566be(0x380)](_0x269155))_0xea7c0='Actor-%1-%2'[_0x2566be(0x12c)](_0x269155['id'],_0x19ba39);if($dataClasses['includes'](_0x269155))_0xea7c0='Class-%1-%2'[_0x2566be(0x12c)](_0x269155['id'],_0x19ba39);if($dataSkills[_0x2566be(0x380)](_0x269155))_0xea7c0='Skill-%1-%2'[_0x2566be(0x12c)](_0x269155['id'],_0x19ba39);if($dataItems[_0x2566be(0x380)](_0x269155))_0xea7c0='Item-%1-%2'[_0x2566be(0x12c)](_0x269155['id'],_0x19ba39);if($dataWeapons[_0x2566be(0x380)](_0x269155))_0xea7c0=_0x2566be(0x229)['format'](_0x269155['id'],_0x19ba39);if($dataArmors[_0x2566be(0x380)](_0x269155))_0xea7c0=_0x2566be(0x1e1)[_0x2566be(0x12c)](_0x269155['id'],_0x19ba39);if($dataEnemies[_0x2566be(0x380)](_0x269155))_0xea7c0=_0x2566be(0x190)['format'](_0x269155['id'],_0x19ba39);if($dataStates['includes'](_0x269155))_0xea7c0=_0x2566be(0x22f)[_0x2566be(0x12c)](_0x269155['id'],_0x19ba39);return _0xea7c0;},VisuMZ[_0x4b87bd(0x21e)]['ParseSkillNotetags']=VisuMZ[_0x4b87bd(0x163)],VisuMZ[_0x4b87bd(0x163)]=function(_0x475ed4){const _0x891b29=_0x4b87bd;VisuMZ[_0x891b29(0x21e)]['ParseSkillNotetags'][_0x891b29(0x284)](this,_0x475ed4),DataManager[_0x891b29(0x169)](_0x475ed4),VisuMZ[_0x891b29(0x21e)][_0x891b29(0x350)](_0x475ed4,_0x891b29(0xc6)),VisuMZ[_0x891b29(0x21e)][_0x891b29(0x350)](_0x475ed4,_0x891b29(0x1a3));},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x2c0)]=VisuMZ[_0x4b87bd(0x2c0)],VisuMZ[_0x4b87bd(0x2c0)]=function(_0x2dae14){const _0x9c9468=_0x4b87bd;VisuMZ[_0x9c9468(0x21e)][_0x9c9468(0x2c0)][_0x9c9468(0x284)](this,_0x2dae14),DataManager[_0x9c9468(0x169)](_0x2dae14),VisuMZ[_0x9c9468(0x21e)][_0x9c9468(0x350)](_0x2dae14,_0x9c9468(0xc6)),VisuMZ[_0x9c9468(0x21e)][_0x9c9468(0x350)](_0x2dae14,'JsBravePointsTarget');},DataManager[_0x4b87bd(0x2ea)]=function(_0x48a54c){const _0x24c0f9=_0x4b87bd;_0x48a54c=_0x48a54c[_0x24c0f9(0x16a)]()[_0x24c0f9(0x219)](),this['_skillIDs']=this['_skillIDs']||{};if(this[_0x24c0f9(0x32d)][_0x48a54c])return this[_0x24c0f9(0x32d)][_0x48a54c];for(const _0x3fdc86 of $dataSkills){if(_0x24c0f9(0x170)!==_0x24c0f9(0x2a4)){if(!_0x3fdc86)continue;this[_0x24c0f9(0x32d)][_0x3fdc86[_0x24c0f9(0x171)][_0x24c0f9(0x16a)]()[_0x24c0f9(0x219)]()]=_0x3fdc86['id'];}else return'icon';}return this[_0x24c0f9(0x32d)][_0x48a54c]||0x0;},DataManager['getItemIdWithName']=function(_0x2e3d1d){const _0x394bc1=_0x4b87bd;_0x2e3d1d=_0x2e3d1d['toUpperCase']()[_0x394bc1(0x219)](),this[_0x394bc1(0x37c)]=this[_0x394bc1(0x37c)]||{};if(this[_0x394bc1(0x37c)][_0x2e3d1d])return this['_itemIDs'][_0x2e3d1d];for(const _0x29e6bc of $dataItems){if(!_0x29e6bc)continue;this[_0x394bc1(0x37c)][_0x29e6bc[_0x394bc1(0x171)][_0x394bc1(0x16a)]()['trim']()]=_0x29e6bc['id'];}return this[_0x394bc1(0x37c)][_0x2e3d1d]||0x0;},DataManager['_btbSkillFlexFusion']={},DataManager[_0x4b87bd(0x1aa)]={},DataManager['_btbItemFlexFusion']={},DataManager[_0x4b87bd(0x1eb)]={},DataManager[_0x4b87bd(0x169)]=function(_0x4ff3da){const _0x343746=_0x4b87bd;if(!_0x4ff3da)return;const _0x61102a=VisuMZ[_0x343746(0x21e)][_0x343746(0xf9)],_0x19ef74=_0x4ff3da['note'],_0x23ad1a=DataManager[_0x343746(0x31b)](_0x4ff3da),_0x294ae=_0x19ef74[_0x343746(0x149)](_0x61102a[_0x343746(0x1f2)]);if(_0x294ae){if(_0x343746(0xec)===_0x343746(0xec))for(const _0x453b76 of _0x294ae){if(!_0x453b76)continue;_0x453b76[_0x343746(0x149)](_0x61102a['FusionFlex']);const _0x38a1fa=String(RegExp['$1'])[_0x343746(0x1c8)](','),_0x17029d=this[_0x343746(0x1af)](_0x38a1fa,_0x23ad1a)['sort']((_0x445295,_0x318385)=>_0x445295-_0x318385);if(_0x17029d[_0x343746(0x2bc)]<=0x1)continue;const _0x8db8ff=_0x17029d[_0x343746(0x1ed)]('-'),_0x1eb4ef=_0x23ad1a?DataManager[_0x343746(0x2b6)]:DataManager['_btbItemFlexFusion'];_0x1eb4ef[_0x8db8ff]=_0x4ff3da['id'];}else return _0xf8c352[_0x343746(0x176)]();}const _0x3b8ea6=_0x19ef74[_0x343746(0x149)](_0x61102a[_0x343746(0x371)]);if(_0x3b8ea6)for(const _0x16160a of _0x3b8ea6){if(!_0x16160a)continue;_0x16160a[_0x343746(0x149)](_0x61102a[_0x343746(0x371)]);const _0x3dd95d=String(RegExp['$1'])[_0x343746(0x1c8)](','),_0x4ae0c8=this[_0x343746(0x1af)](_0x3dd95d,_0x23ad1a);if(_0x4ae0c8[_0x343746(0x2bc)]<=0x1)continue;const _0x5d27cc=_0x4ae0c8[_0x343746(0x1ed)]('-'),_0x4c5094=_0x23ad1a?DataManager['_btbSkillFlexFusion']:DataManager[_0x343746(0xd0)];_0x4c5094[_0x5d27cc]=_0x4ff3da['id'];}},DataManager[_0x4b87bd(0x1af)]=function(_0x2d25a1,_0x499f68){const _0x3eb03b=_0x4b87bd,_0xddf19c=[];for(let _0x52a1f1 of _0x2d25a1){_0x52a1f1=(String(_0x52a1f1)||'')['trim']();const _0x4d5ad4=/^\d+$/[_0x3eb03b(0x323)](_0x52a1f1);if(_0x4d5ad4)_0x3eb03b(0x2a2)!=='YFDLF'?_0xddf19c[_0x3eb03b(0x167)](Number(_0x52a1f1)):_0xf0e335=_0x3eb03b(0x14b);else _0x499f68?_0x3eb03b(0x36a)!==_0x3eb03b(0x2e6)?_0xddf19c[_0x3eb03b(0x167)](DataManager[_0x3eb03b(0x2ea)](_0x52a1f1)):_0x2396f1=_0x3eb03b(0x1cd):_0xddf19c[_0x3eb03b(0x167)](DataManager['getItemIdWithName'](_0x52a1f1));}return _0xddf19c;},ImageManager[_0x4b87bd(0x2b7)]=VisuMZ[_0x4b87bd(0x21e)]['Settings'][_0x4b87bd(0x234)][_0x4b87bd(0x2fd)],ImageManager['svActorHorzCells']=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x4b87bd(0x1f4)]=ImageManager['svActorVertCells']||0x6,TextManager[_0x4b87bd(0x224)]=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)][_0x4b87bd(0x234)][_0x4b87bd(0x293)],TextManager[_0x4b87bd(0x28a)]=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)][_0x4b87bd(0x234)]['BravePointsAbbr'],TextManager[_0x4b87bd(0x2fb)]=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)][_0x4b87bd(0x234)][_0x4b87bd(0x2e4)],TextManager[_0x4b87bd(0x11e)]=VisuMZ[_0x4b87bd(0x21e)]['Settings'][_0x4b87bd(0x131)]['CommandName'],TextManager['btbActionSlot']=VisuMZ['BattleSystemBTB'][_0x4b87bd(0x197)][_0x4b87bd(0x131)][_0x4b87bd(0x33f)],TextManager[_0x4b87bd(0xda)]=VisuMZ['BattleSystemBTB'][_0x4b87bd(0x197)]['Window'][_0x4b87bd(0x341)],SceneManager['isSceneBattle']=function(){const _0x6c0320=_0x4b87bd;return this[_0x6c0320(0x15e)]&&this['_scene'][_0x6c0320(0x17b)]===Scene_Battle;},VisuMZ[_0x4b87bd(0x21e)]['BattleManager_battleSys']=BattleManager['battleSys'],BattleManager[_0x4b87bd(0x1bc)]=function(){const _0xe95528=_0x4b87bd;if(this[_0xe95528(0x176)]())return _0xe95528(0xe4);return VisuMZ[_0xe95528(0x21e)]['BattleManager_battleSys'][_0xe95528(0x284)](this);},BattleManager[_0x4b87bd(0x176)]=function(){const _0x18eda7=_0x4b87bd;return $gameSystem['getBattleSystem']()===_0x18eda7(0xe4);},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x2a5)]=BattleManager['isTpb'],BattleManager[_0x4b87bd(0x1a0)]=function(){const _0x2458e3=_0x4b87bd;if(this[_0x2458e3(0x176)]())return![];return VisuMZ[_0x2458e3(0x21e)]['BattleManager_isTpb'][_0x2458e3(0x284)](this);},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x333)]=BattleManager[_0x4b87bd(0x13c)],BattleManager[_0x4b87bd(0x13c)]=function(){const _0x269304=_0x4b87bd;if(this['isBTB']())return![];return VisuMZ[_0x269304(0x21e)]['BattleManager_isActiveTpb'][_0x269304(0x284)](this);},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x19d)]=BattleManager[_0x4b87bd(0x175)],BattleManager[_0x4b87bd(0x175)]=function(){const _0x105ad7=_0x4b87bd;if(this[_0x105ad7(0x176)]())return!![];return VisuMZ[_0x105ad7(0x21e)][_0x105ad7(0x19d)][_0x105ad7(0x284)](this);},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x316)]=BattleManager[_0x4b87bd(0x238)],BattleManager[_0x4b87bd(0x238)]=function(){const _0x2c00a4=_0x4b87bd;VisuMZ[_0x2c00a4(0x21e)][_0x2c00a4(0x316)][_0x2c00a4(0x284)](this),this[_0x2c00a4(0x176)]()&&this[_0x2c00a4(0x254)]()&&!this[_0x2c00a4(0x12e)]&&$gameParty[_0x2c00a4(0x31e)]()&&this[_0x2c00a4(0x35c)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x34c)]=BattleManager['startTurn'],BattleManager[_0x4b87bd(0x16c)]=function(){const _0x4bedd0=_0x4b87bd;VisuMZ[_0x4bedd0(0x21e)]['BattleManager_startTurn']['call'](this),this[_0x4bedd0(0x2fc)]();},BattleManager[_0x4b87bd(0x2fc)]=function(){const _0x15fd33=_0x4b87bd;if(!SceneManager['isSceneBattle']())return;if(!this[_0x15fd33(0x176)]())return;const _0x26339e=SceneManager[_0x15fd33(0x15e)];if(!_0x26339e)return;const _0x471612=_0x26339e[_0x15fd33(0x26b)];if(!_0x471612)return;_0x471612[_0x15fd33(0x18a)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0xeb)]=BattleManager[_0x4b87bd(0x21f)],BattleManager['makeActionOrders']=function(){const _0x8d42ca=_0x4b87bd;VisuMZ[_0x8d42ca(0x21e)][_0x8d42ca(0xeb)]['call'](this);if(this[_0x8d42ca(0x176)]()){if('WBEHv'!==_0x8d42ca(0x12b))this['_actionBattlers']=this[_0x8d42ca(0x23b)][_0x8d42ca(0x294)](_0x2a8312=>_0x2a8312&&_0x2a8312[_0x8d42ca(0x192)][_0x8d42ca(0x2bc)]>0x0),this[_0x8d42ca(0x2cd)]();else{if(!_0x4647c8[_0x8d42ca(0x176)]())return![];if(!_0x487196[_0x8d42ca(0x21e)][_0x8d42ca(0x197)][_0x8d42ca(0x131)]['ShowCommand'])return![];if(this[_0x8d42ca(0x12f)]&&this['_actor'][_0x8d42ca(0x1fa)]())return![];return!![];}}},BattleManager[_0x4b87bd(0xed)]=function(){const _0xa14425=_0x4b87bd;if(!this[_0xa14425(0x176)]())return;if(!SceneManager[_0xa14425(0x29e)]())return;const _0x37384f=this[_0xa14425(0x23b)];for(const _0x58e63b of _0x37384f){if(_0xa14425(0x214)===_0xa14425(0x214))_0x58e63b[_0xa14425(0x1d2)]();else{const _0x16d3ac=this[_0xa14425(0x242)]();if(this['_position']===_0x16d3ac)return;this[_0xa14425(0x151)]=_0x16d3ac;this[_0xa14425(0x235)]<0xff&&this[_0xa14425(0x20a)]()&&_0x16d3ac!==this[_0xa14425(0x19e)]()&&this['startFade'](0xff);if(_0x16d3ac===this[_0xa14425(0x19e)]()&&this[_0xa14425(0x273)]<=0x0&&this[_0xa14425(0x235)]>0x0)this['startFade'](0x0);else this[_0xa14425(0x273)]<=0x0&&this[_0xa14425(0x235)]<0xff&&this[_0xa14425(0x36e)]();this[_0xa14425(0xee)]();}}_0x37384f['sort']((_0x56332f,_0x4f4053)=>_0x4f4053[_0xa14425(0x14c)]()-_0x56332f[_0xa14425(0x14c)]()),this[_0xa14425(0x176)]()&&this['updateTurnOrderBTB']();},BattleManager[_0x4b87bd(0x28e)]=function(){const _0x2a8e6f=_0x4b87bd;if(!this[_0x2a8e6f(0x176)]())return;this[_0x2a8e6f(0x23b)]=this[_0x2a8e6f(0x23b)]||[],this[_0x2a8e6f(0x23b)]=this[_0x2a8e6f(0x23b)]['filter'](_0x19f6a9=>_0x19f6a9&&_0x19f6a9[_0x2a8e6f(0x18d)]()&&_0x19f6a9[_0x2a8e6f(0x1f3)]()),this[_0x2a8e6f(0x2cd)]();},BattleManager[_0x4b87bd(0x2cd)]=function(_0x543781){const _0x146fc5=_0x4b87bd;if(!this[_0x146fc5(0x176)]())return;const _0x2c41eb=SceneManager[_0x146fc5(0x15e)][_0x146fc5(0xdd)];if(!_0x2c41eb)return;_0x2c41eb[_0x146fc5(0x227)](_0x543781);},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x133)]=BattleManager['startAction'],BattleManager['startAction']=function(){const _0x40ad52=_0x4b87bd;BattleManager[_0x40ad52(0x176)]()&&this[_0x40ad52(0xf6)]&&(_0x40ad52(0x24c)==='KSXdM'?this['_fadeTarget']=_0x129008[_0x40ad52(0x1f3)]()&&_0xdbfcf[_0x40ad52(0x18d)]()?0xff:0x0:this['_subject']['processActionFusionsBTB']()),VisuMZ[_0x40ad52(0x21e)][_0x40ad52(0x133)][_0x40ad52(0x284)](this);},VisuMZ[_0x4b87bd(0x21e)]['Game_System_initialize']=Game_System[_0x4b87bd(0x1ca)][_0x4b87bd(0x278)],Game_System[_0x4b87bd(0x1ca)][_0x4b87bd(0x278)]=function(){const _0x5c5051=_0x4b87bd;VisuMZ['BattleSystemBTB'][_0x5c5051(0x248)][_0x5c5051(0x284)](this),this[_0x5c5051(0x1ae)]();},Game_System[_0x4b87bd(0x1ca)][_0x4b87bd(0x1ae)]=function(){const _0x4a61e4=_0x4b87bd;this[_0x4a61e4(0x189)]=!![];},Game_System[_0x4b87bd(0x1ca)]['isBattleSystemBTBTurnOrderVisible']=function(){const _0x59a38d=_0x4b87bd;if(this['_btbTurnOrderVisible']===undefined){if(_0x59a38d(0x1c5)!==_0x59a38d(0x1c5)){const _0x224bea=this[_0x59a38d(0x20a)]();if(!_0x224bea)return;if(!_0x224bea[_0x59a38d(0x168)]())return;if(this[_0x59a38d(0x367)]===_0x224bea['battlerHue']())return;this[_0x59a38d(0x367)]=_0x224bea[_0x59a38d(0x212)](),this['_graphicSprite'][_0x59a38d(0x150)](_0x224bea[_0x59a38d(0x220)]()?0x0:this[_0x59a38d(0x367)]);}else this[_0x59a38d(0x1ae)]();}return this['_btbTurnOrderVisible'];},Game_System[_0x4b87bd(0x1ca)][_0x4b87bd(0x327)]=function(_0x4ab630){const _0x4927d0=_0x4b87bd;if(this[_0x4927d0(0x189)]===undefined){if(_0x4927d0(0x2af)===_0x4927d0(0x2af))this['initBattleSystemBTB']();else{if(this[_0x4927d0(0x176)]())return _0x4927d0(0xe4);return _0x5b9957['BattleSystemBTB'][_0x4927d0(0x270)]['call'](this);}}this['_btbTurnOrderVisible']=_0x4ab630;},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x266)]=Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x13e)],Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x13e)]=function(_0x50474c){const _0x1bf02b=_0x4b87bd;VisuMZ[_0x1bf02b(0x21e)][_0x1bf02b(0x266)]['call'](this,_0x50474c),this[_0x1bf02b(0x1c2)](_0x50474c);},Game_Action[_0x4b87bd(0x1ca)]['applyBattleSystemBTBUserEffect']=function(_0x10011d){const _0xe50adc=_0x4b87bd;if(!BattleManager[_0xe50adc(0x176)]())return;if(this[_0xe50adc(0x2c2)]())this['applyItemBattleSystemBTBUserEffect'](_0x10011d);},Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x264)]=function(_0x55f643){const _0xc191db=_0x4b87bd,_0x209280=VisuMZ[_0xc191db(0x21e)][_0xc191db(0xf9)],_0x41b3c6=this['item']()[_0xc191db(0xe1)],_0x254bad=this[_0xc191db(0x2c2)]();if(this[_0xc191db(0x353)]()){if(_0xc191db(0x298)!=='WsgJi')this['_subject'][_0xc191db(0x1b9)]();else{if(_0x41b3c6[_0xc191db(0x149)](_0x209280['BravePointSetUser'])){if(_0xc191db(0x277)===_0xc191db(0x277)){const _0x2efe19=Number(RegExp['$1']);this[_0xc191db(0x353)]()['setBravePoints'](_0x2efe19);}else{const _0x1b787c=_0x27f896[_0xc191db(0x197)];this[_0xc191db(0x273)]=_0x1b787c[_0xc191db(0x21d)],this['_fadeTarget']=_0x1aacd7;}}if(_0x41b3c6['match'](_0x209280['BravePointAlterUser'])){const _0x47871d=Number(RegExp['$1']);this[_0xc191db(0x353)]()[_0xc191db(0x364)](_0x47871d);}const _0x35617f=_0xc191db(0xc6),_0xf8e7f5=VisuMZ['BattleSystemBTB'][_0xc191db(0x218)](_0x254bad,_0x35617f);if(VisuMZ[_0xc191db(0x21e)]['JS'][_0xf8e7f5]){if(_0xc191db(0x279)!==_0xc191db(0x17e)){const _0x42a5e5=VisuMZ[_0xc191db(0x21e)]['JS'][_0xf8e7f5]['call'](this,this[_0xc191db(0x353)](),_0x55f643,this[_0xc191db(0x353)]()[_0xc191db(0x201)]());this[_0xc191db(0x353)]()['setBravePoints'](_0x42a5e5);}else _0x39109d+=_0x115dc0(_0x5aa63d['$1']);}}}if(_0x55f643){if(_0x41b3c6[_0xc191db(0x149)](_0x209280[_0xc191db(0x1fd)])){const _0xa5ab29=Number(RegExp['$1']);_0x55f643['setBravePoints'](_0xa5ab29);}if(_0x41b3c6[_0xc191db(0x149)](_0x209280[_0xc191db(0x1b8)])){const _0x1e3b1a=Number(RegExp['$1']);_0x55f643[_0xc191db(0x364)](_0x1e3b1a);}const _0x2a4165=_0xc191db(0x1a3),_0x4fbe0d=VisuMZ[_0xc191db(0x21e)]['createKeyJS'](_0x254bad,_0x2a4165);if(VisuMZ[_0xc191db(0x21e)]['JS'][_0x4fbe0d]){if(_0xc191db(0x2a9)!==_0xc191db(0x2e3)){const _0x457760=VisuMZ[_0xc191db(0x21e)]['JS'][_0x4fbe0d][_0xc191db(0x284)](this,this[_0xc191db(0x353)](),_0x55f643,_0x55f643[_0xc191db(0x201)]());_0x55f643[_0xc191db(0x328)](_0x457760);}else return![];}}},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x180)]=Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x14c)],Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x14c)]=function(){const _0x557b35=_0x4b87bd;return BattleManager[_0x557b35(0x176)]()?VisuMZ['BattleSystemBTB'][_0x557b35(0x197)][_0x557b35(0x1a2)][_0x557b35(0x317)][_0x557b35(0x284)](this):VisuMZ[_0x557b35(0x21e)][_0x557b35(0x180)][_0x557b35(0x284)](this);},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x2c1)]=Game_Action[_0x4b87bd(0x1ca)]['allowRandomSpeed'],Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x1e4)]=function(){const _0x1e96f6=_0x4b87bd;if(BattleManager['isBTB']()){if('uSdRh'!=='HUesL')return VisuMZ[_0x1e96f6(0x21e)][_0x1e96f6(0x197)][_0x1e96f6(0x1a2)][_0x1e96f6(0x34b)];else _0x328356+=_0x106962[_0x1e96f6(0x132)];}else return VisuMZ[_0x1e96f6(0x21e)][_0x1e96f6(0x2c1)][_0x1e96f6(0x284)](this);},VisuMZ[_0x4b87bd(0x21e)]['Game_Action_setSkill']=Game_Action[_0x4b87bd(0x1ca)]['setSkill'],Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0xce)]=function(_0x5f266c){const _0x9780f5=_0x4b87bd;VisuMZ[_0x9780f5(0x21e)]['Game_Action_setSkill'][_0x9780f5(0x284)](this,_0x5f266c),BattleManager['sortActionOrdersBTB']();},VisuMZ[_0x4b87bd(0x21e)]['Game_Action_setItem']=Game_Action['prototype'][_0x4b87bd(0x11a)],Game_Action['prototype'][_0x4b87bd(0x11a)]=function(_0x1a0276){const _0x5b1b2a=_0x4b87bd;VisuMZ[_0x5b1b2a(0x21e)]['Game_Action_setItem'][_0x5b1b2a(0x284)](this,_0x1a0276),BattleManager[_0x5b1b2a(0xed)]();},Game_Action[_0x4b87bd(0x1ca)]['setActionFusionBTB']=function(_0x2e8b14){this['_actionFusionRecipe']=_0x2e8b14;},Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x30a)]=function(){const _0x1ca2f1=_0x4b87bd;if(this[_0x1ca2f1(0x1a1)]===undefined)return 0x0;return this[_0x1ca2f1(0x1a1)]['split']('-')[_0x1ca2f1(0x2bc)]-0x1;},Game_Action['prototype'][_0x4b87bd(0x186)]=function(){const _0x786bce=_0x4b87bd;if(this[_0x786bce(0x1a1)]===undefined)return[];return this[_0x786bce(0x1a1)][_0x786bce(0x1c8)]('-')[_0x786bce(0x32f)](_0x4df0ae=>$dataSkills[Number(_0x4df0ae)]);},Game_Action[_0x4b87bd(0x1ca)][_0x4b87bd(0x1b6)]=function(){const _0x51f06b=_0x4b87bd;if(this[_0x51f06b(0x1a1)]===undefined)return[];return this[_0x51f06b(0x1a1)][_0x51f06b(0x1c8)]('-')[_0x51f06b(0x32f)](_0x34dd31=>$dataItems[Number(_0x34dd31)]);},Game_BattlerBase['prototype']['bravePoints']=function(){const _0x166b84=_0x4b87bd;return this[_0x166b84(0x1e9)]||0x0;},Game_BattlerBase[_0x4b87bd(0x29d)]=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)]['Mechanics'][_0x4b87bd(0x319)],Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)][_0x4b87bd(0x1a2)][_0x4b87bd(0x230)],Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x12a)]=function(){const _0x1888cb=_0x4b87bd;if(this[_0x1888cb(0x26c)]())return 0x1;if(this[_0x1888cb(0x1fa)]())return 0x1;const _0x59c03b=VisuMZ[_0x1888cb(0x21e)][_0x1888cb(0xf9)],_0x4eec73=_0x59c03b[_0x1888cb(0xd6)];let _0x57286b=Game_BattlerBase[_0x1888cb(0x29d)];const _0x498f71=this['traitObjects']();for(const _0xb63171 of _0x498f71){if(!_0xb63171)continue;const _0x406f34=_0xb63171[_0x1888cb(0xe1)];if(_0x406f34[_0x1888cb(0x149)](_0x4eec73)){if(_0x1888cb(0xfa)!==_0x1888cb(0xfa)){if(this['_graphicSv']!==_0x13ead7[_0x1888cb(0x288)]())return this[_0x1888cb(0x285)]();}else _0x57286b+=Number(RegExp['$1']);}}return _0x57286b[_0x1888cb(0x263)](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase[_0x4b87bd(0x152)]=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)]['Mechanics'][_0x4b87bd(0xf1)],Game_BattlerBase[_0x4b87bd(0x1ac)]=VisuMZ['BattleSystemBTB'][_0x4b87bd(0x197)]['Mechanics'][_0x4b87bd(0x1c6)],Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']=VisuMZ['BattleSystemBTB'][_0x4b87bd(0x197)][_0x4b87bd(0x1a2)][_0x4b87bd(0x199)],Game_BattlerBase[_0x4b87bd(0x183)]=VisuMZ[_0x4b87bd(0x21e)]['Settings'][_0x4b87bd(0x1a2)][_0x4b87bd(0x2bb)],Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x32a)]=function(){const _0x2c413f=_0x4b87bd,_0x26288c=VisuMZ[_0x2c413f(0x21e)]['RegExp'],_0x424fb2=_0x26288c['MaxBravePoints'];let _0x351f66=Game_BattlerBase['BTB_MAX_BRAVEPOINTS_DEFAULT'];const _0x4e3018=this[_0x2c413f(0x287)]();for(const _0x14eb76 of _0x4e3018){if(!_0x14eb76)continue;const _0x2e3ab4=_0x14eb76['note'];_0x2e3ab4[_0x2c413f(0x149)](_0x424fb2)&&(_0x351f66+=Number(RegExp['$1']));}return Math[_0x2c413f(0x1c4)](_0x351f66,Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x322)]=function(){const _0x2a34c2=_0x4b87bd,_0x3ab889=VisuMZ[_0x2a34c2(0x21e)][_0x2a34c2(0xf9)],_0x441fe8=_0x3ab889[_0x2a34c2(0x361)];let _0x5a9526=Game_BattlerBase[_0x2a34c2(0x1ac)];const _0x4f5578=this[_0x2a34c2(0x287)]();for(const _0x2040cc of _0x4f5578){if('xrObW'===_0x2a34c2(0x2d4))return _0x174ded[_0x2a34c2(0x21e)]['Game_Action_speed'][_0x2a34c2(0x284)](this);else{if(!_0x2040cc)continue;const _0x2a8aa1=_0x2040cc[_0x2a34c2(0xe1)];if(_0x2a8aa1[_0x2a34c2(0x149)](_0x441fe8)){if(_0x2a34c2(0x2d1)==='PVDvr')_0x5a9526+=Number(RegExp['$1']);else{if(!this['canAddBraveCommand']())return;const _0x30b0ce=this[_0x2a34c2(0xdf)](),_0x191f99=_0x1550bd[_0x2a34c2(0x11e)],_0xdfacd7=_0x25de67[_0x2a34c2(0x2b7)],_0xf56933=_0x30b0ce==='text'?_0x191f99:_0x2a34c2(0x243)[_0x2a34c2(0x12c)](_0xdfacd7,_0x191f99);this[_0x2a34c2(0x1de)](_0xf56933,_0x2a34c2(0x2c9),this[_0x2a34c2(0x12f)]['canBrave']()),_0x5b0286['refreshStatusBTB']();}}}}return Math[_0x2a34c2(0x2d9)](_0x5a9526,Game_BattlerBase[_0x2a34c2(0x183)]);},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x328)]=function(_0x385281){const _0x47276d=_0x4b87bd;this[_0x47276d(0x1e9)]=Math['min'](_0x385281,this[_0x47276d(0x32a)]()),this['refresh']();},Game_BattlerBase['prototype'][_0x4b87bd(0x364)]=function(_0x487cda){_0x487cda+=this['_bravePoints']||0x0,this['setBravePoints'](_0x487cda);},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x268)]=function(_0x4ea2b5){const _0x2db5df=_0x4b87bd;this[_0x2db5df(0x364)](-_0x4ea2b5);},Game_BattlerBase['prototype']['bravePointsCost']=function(_0x13c69c){const _0x4efba6=_0x4b87bd,_0x1901de=VisuMZ['BattleSystemBTB'][_0x4efba6(0x197)]['Mechanics'];if(!_0x13c69c)return _0x1901de['BravePointPredictedCost'];if(DataManager['isSkill'](_0x13c69c)){if(_0x13c69c['id']===this[_0x4efba6(0x126)]())return 0x0;if(this[_0x4efba6(0x14a)]()&&this['currentAction']()['item']()===_0x13c69c&&this[_0x4efba6(0x14a)]()[_0x4efba6(0x377)])return 0x0;}const _0x129271=VisuMZ[_0x4efba6(0x21e)][_0x4efba6(0xf9)],_0x5173bd=_0x13c69c[_0x4efba6(0xe1)];if(_0x5173bd[_0x4efba6(0x149)](_0x129271[_0x4efba6(0x34f)]))return Number(RegExp['$1']);let _0x569ab8=0x0;if(DataManager[_0x4efba6(0x31b)](_0x13c69c))_0x569ab8=_0x1901de[_0x4efba6(0x237)];else{if(DataManager[_0x4efba6(0x358)](_0x13c69c)){if('gRLXy'!==_0x4efba6(0x2b8)){const _0x174491=this[_0x4efba6(0x14b)]()[_0x4efba6(0xe1)];if(_0x174491['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x53adde(_0x39994a['$1']);return _0x8a9366[_0x4efba6(0x197)]['EnemyBattlerIcon'];}else _0x569ab8=_0x1901de[_0x4efba6(0x145)];}}return _0x569ab8[_0x4efba6(0x263)](0x0,Game_BattlerBase[_0x4efba6(0x25e)]);},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x1da)]=Game_BattlerBase['prototype'][_0x4b87bd(0x18f)],Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x18f)]=function(_0x59c0e9){const _0x105697=_0x4b87bd;if(_0x59c0e9&&SceneManager['isSceneBattle']()&&BattleManager[_0x105697(0x176)]()){const _0x3a90ac=this[_0x105697(0x1c7)](_0x59c0e9);if(this[_0x105697(0x201)]()-_0x3a90ac<this[_0x105697(0x322)]())return![];}return VisuMZ['BattleSystemBTB'][_0x105697(0x1da)][_0x105697(0x284)](this,_0x59c0e9);},Game_BattlerBase['prototype']['payBravePointsCost']=function(_0x32dcde){const _0x2acc99=_0x4b87bd;if(!BattleManager['isBTB']())return;const _0x18f071=this[_0x2acc99(0x1c7)](_0x32dcde);this[_0x2acc99(0x268)](_0x18f071);},VisuMZ[_0x4b87bd(0x21e)]['Game_Battler_useItem']=Game_Battler['prototype'][_0x4b87bd(0x37f)],Game_Battler[_0x4b87bd(0x1ca)]['useItem']=function(_0x1831d5){const _0x512fb0=_0x4b87bd;if(this[_0x512fb0(0xfb)](_0x1831d5)){this[_0x512fb0(0x15c)](_0x1831d5);return;}VisuMZ[_0x512fb0(0x21e)][_0x512fb0(0x1e2)]['call'](this,_0x1831d5),this[_0x512fb0(0x217)](_0x1831d5);},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0xfb)]=function(_0x368440){const _0x1a0571=_0x4b87bd;if(!BattleManager[_0x1a0571(0x176)]())return![];if(!SceneManager[_0x1a0571(0x29e)]())return![];if(!this[_0x1a0571(0x148)]())return![];if(this!==BattleManager[_0x1a0571(0xf6)])return![];if(!this[_0x1a0571(0x14a)]())return![];if(!this['currentAction']()['item']())return![];if(this[_0x1a0571(0x14a)]()['item']()!==_0x368440)return![];if(this[_0x1a0571(0x14a)]()[_0x1a0571(0x31b)]())return this['currentAction']()[_0x1a0571(0x186)]()[_0x1a0571(0x2bc)]>0x0;else return this[_0x1a0571(0x14a)]()[_0x1a0571(0x358)]()?this[_0x1a0571(0x14a)]()[_0x1a0571(0x1b6)]()[_0x1a0571(0x2bc)]>0x0:![];},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x15c)]=function(_0x153e1a){const _0x57fb2c=_0x4b87bd;if(!SceneManager[_0x57fb2c(0x29e)]())return;if(DataManager[_0x57fb2c(0x31b)](_0x153e1a))this[_0x57fb2c(0x326)]();else{if(_0x57fb2c(0x27d)===_0x57fb2c(0x27d))this['btbPayItemFusionCosts']();else for(var _0x16447b=0x0;_0x16447b<_0x587902[_0x57fb2c(0x2bc)];_0x16447b++){_0x33d005['push'](_0x46ff08+'-'+_0x14c0c3[_0x16447b]),_0x40bc4b(_0x5dd728+'-'+_0x9ef0b4[_0x16447b],_0x2df6bb[_0x57fb2c(0x30e)](_0x16447b+0x1));}}},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x326)]=function(){const _0x227877=_0x4b87bd,_0x156ac3=this[_0x227877(0x14a)]()[_0x227877(0x186)]();if(!_0x156ac3)return;for(const _0x2fc536 of _0x156ac3){if(!_0x2fc536)continue;if(!this['canUse'](_0x2fc536))return![];VisuMZ[_0x227877(0x21e)]['Game_Battler_useItem'][_0x227877(0x284)](this,_0x2fc536),this[_0x227877(0x217)](_0x2fc536);}return!![];},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x216)]=function(){const _0x5df5ac=_0x4b87bd,_0x338e7b=this[_0x5df5ac(0x14a)]()[_0x5df5ac(0x1b6)]();if(!_0x338e7b)return;for(const _0x2762ff of _0x338e7b){if(_0x5df5ac(0x259)===_0x5df5ac(0x193))this['initialize'](...arguments);else{if(!_0x2762ff)continue;if(!this[_0x5df5ac(0x18f)](_0x2762ff))return![];this[_0x5df5ac(0x217)](_0x2762ff);}}return!![];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0xdb)]=function(){const _0x32a26e=_0x4b87bd,_0x2be293=this[_0x32a26e(0x201)]()-this[_0x32a26e(0x2eb)]()+this[_0x32a26e(0x1ab)]();return _0x2be293[_0x32a26e(0x263)](Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP'],this['maxBravePoints']());},Game_BattlerBase['prototype'][_0x4b87bd(0x2eb)]=function(){const _0x55ad0b=_0x4b87bd;let _0x8db26f=0x0;for(const _0x5458bc of this['_actions']){if(_0x55ad0b(0x36c)==='YYtpt'){const _0x1f829e=this['bravePointsCost'](_0x12861b);if(this[_0x55ad0b(0x201)]()-_0x1f829e<this[_0x55ad0b(0x322)]())return![];}else{if(!_0x5458bc)continue;const _0x10b9d0=_0x5458bc[_0x55ad0b(0x2c2)]();_0x8db26f+=this['bravePointsCost'](_0x10b9d0);}}return _0x8db26f;},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x23a)]=Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x31e)],Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x31e)]=function(){const _0x4ce36c=_0x4b87bd;if(BattleManager[_0x4ce36c(0x176)]()&&this[_0x4ce36c(0x201)]()<0x0){if(_0x4ce36c(0x2d8)!==_0x4ce36c(0x1e7))return![];else this['_bravePoints']=_0x279d67['min'](_0xae6c51,this[_0x4ce36c(0x32a)]()),this['refresh']();}else{if(_0x4ce36c(0x271)===_0x4ce36c(0x271))return VisuMZ[_0x4ce36c(0x21e)][_0x4ce36c(0x23a)][_0x4ce36c(0x284)](this);else this[_0x4ce36c(0x378)]=!![],this[_0x4ce36c(0x1d1)](0x0);}},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0xf2)]=Game_BattlerBase['prototype']['canGuard'],Game_BattlerBase['prototype'][_0x4b87bd(0x351)]=function(){const _0x20c830=_0x4b87bd;if(BattleManager['isBTB']()&&this[_0x20c830(0x31c)]()>0x1)return![];else{if('Fqqsk'!=='Fqqsk'){this[_0x20c830(0x120)]=_0x285b5d,this[_0x20c830(0x203)]=_0x12832a;const _0x468752=_0x414c4e[_0x20c830(0x197)],_0x236038=this[_0x20c830(0x173)](),_0x2cc87f=this[_0x20c830(0x19e)]();this[_0x20c830(0x124)]=0x0,this[_0x20c830(0xc3)]=_0x236038?_0x468752['SpriteThin']*_0x2cc87f:0x0,this[_0x20c830(0x2f6)]=_0x236038?0x0:_0x468752[_0x20c830(0x354)]*_0x2cc87f,this[_0x20c830(0x273)]=0x0,this['_fadeTarget']=0xff,this[_0x20c830(0x2f1)]=![],this[_0x20c830(0x1ec)]=![],this['_containerWidth']=0x0,this[_0x20c830(0x305)]=0x0;}else return VisuMZ[_0x20c830(0x21e)][_0x20c830(0xf2)]['call'](this);}},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x1be)]=function(){const _0x22d3e9=_0x4b87bd;if(this[_0x22d3e9(0x26c)]())return![];return this[_0x22d3e9(0x31c)]()<this[_0x22d3e9(0x12a)]()&&this[_0x22d3e9(0x1e9)]>this[_0x22d3e9(0x322)]();},Game_BattlerBase['prototype'][_0x4b87bd(0x26c)]=function(){const _0x466d2c=_0x4b87bd,_0x435a7e=VisuMZ[_0x466d2c(0x21e)][_0x466d2c(0xf9)],_0x5ef605=_0x435a7e[_0x466d2c(0x10d)];return this[_0x466d2c(0x287)]()[_0x466d2c(0x356)](_0x5d0ec3=>_0x5d0ec3&&_0x5d0ec3[_0x466d2c(0xe1)][_0x466d2c(0x149)](_0x5ef605));},Game_BattlerBase['prototype'][_0x4b87bd(0x1fa)]=function(){const _0x4bf285=_0x4b87bd,_0x370af3=VisuMZ[_0x4bf285(0x21e)][_0x4bf285(0xf9)],_0x590fc9=_0x370af3['HideBrave'];return this[_0x4bf285(0x287)]()[_0x4bf285(0x356)](_0xbdfba8=>_0xbdfba8&&_0xbdfba8[_0x4bf285(0xe1)][_0x4bf285(0x149)](_0x590fc9));},Game_BattlerBase['prototype']['clearTurnOrderBTBGraphics']=function(){const _0x345bba=_0x4b87bd;delete this[_0x345bba(0x159)],delete this[_0x345bba(0xc7)],delete this['_btbTurnOrderFaceIndex'],delete this[_0x345bba(0x18b)];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x1c1)]=function(){const _0x52a35c=_0x4b87bd;return this['_btbTurnOrderGraphicType']===undefined&&(this[_0x52a35c(0x159)]=this[_0x52a35c(0x10e)]()),this['_btbTurnOrderGraphicType'];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x10e)]=function(){const _0xd91e45=_0x4b87bd;return Window_BTB_TurnOrder[_0xd91e45(0x197)][_0xd91e45(0x29a)];},Game_BattlerBase[_0x4b87bd(0x1ca)]['TurnOrderBTBGraphicFaceName']=function(){const _0x127d12=_0x4b87bd;return this['_btbTurnOrderFaceName']===undefined&&(this['_btbTurnOrderFaceName']=this[_0x127d12(0x1b1)]()),this['_btbTurnOrderFaceName'];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x1b1)]=function(){const _0x417146=_0x4b87bd;return Window_BTB_TurnOrder['Settings'][_0x417146(0x101)];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x374)]=function(){const _0x59ba56=_0x4b87bd;if(this[_0x59ba56(0x213)]===undefined){if('TbVRq'!==_0x59ba56(0x33b)){const _0x2be221=_0x59ba56(0xd3),_0x246650=_0x25c461['%1AnimationID'[_0x59ba56(0x12c)](_0x2be221)],_0x135b5f=_0x28fc21['%1Mirror'[_0x59ba56(0x12c)](_0x2be221)],_0x2ef7af=_0x2060b9['%1Mute'[_0x59ba56(0x12c)](_0x2be221)];_0x1969bd['requestFauxAnimation']([this],_0x246650,_0x135b5f,_0x2ef7af);}else this['_btbTurnOrderFaceIndex']=this[_0x59ba56(0x1bd)]();}return this[_0x59ba56(0x213)];},Game_BattlerBase[_0x4b87bd(0x1ca)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x1ae0a5=_0x4b87bd;return Window_BTB_TurnOrder[_0x1ae0a5(0x197)][_0x1ae0a5(0x20c)];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x174)]=function(){const _0x45b8e1=_0x4b87bd;return this[_0x45b8e1(0x18b)]===undefined&&(this[_0x45b8e1(0x18b)]=this[_0x45b8e1(0x306)]()),this[_0x45b8e1(0x18b)];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x306)]=function(){const _0x3506ab=_0x4b87bd;return Window_BTB_TurnOrder[_0x3506ab(0x197)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x300)]=function(_0x5682bb){const _0x83de2f=_0x4b87bd;this[_0x83de2f(0x18b)]=_0x5682bb;},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x280)]=Game_BattlerBase[_0x4b87bd(0x1ca)]['hide'],Game_BattlerBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x107)]=function(){const _0xe46cfd=_0x4b87bd;VisuMZ[_0xe46cfd(0x21e)][_0xe46cfd(0x280)]['call'](this),BattleManager[_0xe46cfd(0x28e)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x160)]=Game_BattlerBase[_0x4b87bd(0x1ca)]['appear'],Game_BattlerBase['prototype']['appear']=function(){const _0x5437db=_0x4b87bd;VisuMZ[_0x5437db(0x21e)][_0x5437db(0x160)][_0x5437db(0x284)](this),BattleManager[_0x5437db(0x28e)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x345)]=Game_Battler['prototype'][_0x4b87bd(0x31f)],Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x31f)]=function(){const _0x488340=_0x4b87bd;VisuMZ[_0x488340(0x21e)][_0x488340(0x345)]['call'](this),BattleManager['removeActionBattlersBTB']();},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x33a)]=Game_Battler['prototype'][_0x4b87bd(0x15b)],Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x15b)]=function(){const _0x14b6ae=_0x4b87bd;if(BattleManager[_0x14b6ae(0x176)]())return 0x1;else{if(_0x14b6ae(0x2c5)===_0x14b6ae(0x35d))_0x334163=_0x1b0a37['BravePointSkillCost'];else return VisuMZ[_0x14b6ae(0x21e)][_0x14b6ae(0x33a)][_0x14b6ae(0x284)](this);}},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x25b)]=Game_Battler[_0x4b87bd(0x1ca)]['onBattleStart'],Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x2bf)]=function(_0x360b8d){const _0x40dd73=_0x4b87bd;VisuMZ[_0x40dd73(0x21e)]['Game_Battler_onBattleStart'][_0x40dd73(0x284)](this,_0x360b8d),this[_0x40dd73(0x181)](_0x360b8d);},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x181)]=function(_0x25429b){const _0x582a68=_0x4b87bd;if(!BattleManager[_0x582a68(0x176)]())return;const _0x22c7e1=VisuMZ['BattleSystemBTB'][_0x582a68(0x197)][_0x582a68(0x1a2)],_0x29c83c=VisuMZ['BattleSystemBTB'][_0x582a68(0xf9)];let _0x4c49d5=_0x25429b?_0x22c7e1[_0x582a68(0x10f)]:_0x22c7e1[_0x582a68(0x276)];const _0x1e828d=this[_0x582a68(0x287)]();for(const _0x4e4d26 of _0x1e828d){if(_0x582a68(0x211)===_0x582a68(0x211)){if(!_0x4e4d26)continue;const _0x5cffc8=_0x4e4d26[_0x582a68(0xe1)];_0x5cffc8[_0x582a68(0x149)](_0x29c83c[_0x582a68(0x1f6)])&&(_0x4c49d5+=Number(RegExp['$1']));}else return![];}this[_0x582a68(0x328)](_0x4c49d5);},Game_Battler[_0x4b87bd(0x1ca)]['performBrave']=function(){const _0x1b42d1=_0x4b87bd;this[_0x1b42d1(0x192)][_0x1b42d1(0x167)](new Game_Action(this));const _0x31f99f=VisuMZ[_0x1b42d1(0x21e)][_0x1b42d1(0x197)]['BraveAnimation'];if(_0x31f99f['BraveAnimationID']){if(_0x1b42d1(0x12d)!==_0x1b42d1(0x25d)){const _0x3f70c7=_0x1b42d1(0xd3),_0x511c70=_0x31f99f[_0x1b42d1(0x13d)[_0x1b42d1(0x12c)](_0x3f70c7)],_0x5010c6=_0x31f99f[_0x1b42d1(0x26f)[_0x1b42d1(0x12c)](_0x3f70c7)],_0xc03b30=_0x31f99f['%1Mute'[_0x1b42d1(0x12c)](_0x3f70c7)];$gameTemp[_0x1b42d1(0x1cb)]([this],_0x511c70,_0x5010c6,_0xc03b30);}else{const _0x1beb8b=this['battler']();if(!_0x1beb8b)return;if(this[_0x1b42d1(0x2f1)]===_0x1beb8b['isAlive']()&&this['_isAppeared']===_0x1beb8b['isAppeared']())return;this[_0x1b42d1(0x2f1)]=_0x1beb8b['isAlive'](),this[_0x1b42d1(0x1ec)]=_0x1beb8b[_0x1b42d1(0x18d)]();let _0x1e0001=this[_0x1b42d1(0x2f1)]&&this[_0x1b42d1(0x1ec)]?0xff:0x0;this[_0x1b42d1(0x1d1)](_0x1e0001);}}},Game_Battler['prototype'][_0x4b87bd(0x292)]=function(){const _0x55d60e=_0x4b87bd;if(this['_actions']['length']<=0x1)return;this['_actions'][_0x55d60e(0x29f)]();const _0x24231a=VisuMZ[_0x55d60e(0x21e)][_0x55d60e(0x197)][_0x55d60e(0x275)];if(_0x24231a[_0x55d60e(0x296)]){if('YHpmk'==='YHpmk'){const _0x13e75b=_0x55d60e(0x2de),_0x166530=_0x24231a[_0x55d60e(0x13d)[_0x55d60e(0x12c)](_0x13e75b)],_0x386a9c=_0x24231a[_0x55d60e(0x26f)[_0x55d60e(0x12c)](_0x13e75b)],_0x493d68=_0x24231a[_0x55d60e(0x1db)['format'](_0x13e75b)];$gameTemp['requestFauxAnimation']([this],_0x166530,_0x386a9c,_0x493d68);}else return _0x16c9a[_0x55d60e(0x242)]()-_0xc77547['containerPosition']();}},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x1c3)]=Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x37d)],Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x37d)]=function(){const _0x528fb6=_0x4b87bd;VisuMZ[_0x528fb6(0x21e)][_0x528fb6(0x1c3)][_0x528fb6(0x284)](this),this['onTurnEndBTB']();},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0xd4)]=function(){const _0x2c8fbb=_0x4b87bd;if(!BattleManager[_0x2c8fbb(0x176)]())return;if(!$gameParty[_0x2c8fbb(0x239)]())return;this[_0x2c8fbb(0x302)]();},Game_Battler[_0x4b87bd(0x1ca)]['regenerateBravePoints']=function(){const _0x3c969f=_0x4b87bd,_0x679d7=VisuMZ[_0x3c969f(0x21e)]['Settings'][_0x3c969f(0x1a2)],_0x327f9c=_0x679d7['BravePointsRegenAlive'];if(_0x327f9c&&!this[_0x3c969f(0x1f3)]())return;const _0x214958=this[_0x3c969f(0x1ab)]();this[_0x3c969f(0x364)](_0x214958);},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x1ab)]=function(){const _0x4b1385=_0x4b87bd,_0x366734=VisuMZ[_0x4b1385(0x21e)][_0x4b1385(0xf9)],_0x2bb7a2=VisuMZ['BattleSystemBTB'][_0x4b1385(0x197)][_0x4b1385(0x1a2)];let _0x47b2a9=_0x2bb7a2[_0x4b1385(0x314)]||0x0;const _0x494d3d=this[_0x4b1385(0x287)]();for(const _0x4fad29 of _0x494d3d){if(!_0x4fad29)continue;const _0x43ac75=_0x4fad29[_0x4b1385(0xe1)];_0x43ac75[_0x4b1385(0x149)](_0x366734[_0x4b1385(0x346)])&&(_0x47b2a9+=Number(RegExp['$1']));}return _0x47b2a9;},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x1b9)]=function(){const _0x3f0260=_0x4b87bd;if(!this[_0x3f0260(0x295)]())return;if(this[_0x3f0260(0x31c)]()<=0x1)return;if(!this['currentAction']())return;if(!this[_0x3f0260(0x14a)]()['item']())return;const _0x5024f9=this[_0x3f0260(0x128)]();if(_0x5024f9[_0x3f0260(0x2bc)]<=0x0)return;let _0x2b02e7='',_0x5a1a7f=0x0;const _0x570b7b=this[_0x3f0260(0x14a)]()[_0x3f0260(0x31b)](),_0x2cb232=_0x570b7b?DataManager[_0x3f0260(0x2b6)]:DataManager[_0x3f0260(0xd0)],_0x3d8af2=_0x570b7b?DataManager[_0x3f0260(0x1aa)]:DataManager[_0x3f0260(0x1eb)];for(const _0x4e14bf of _0x5024f9){if(!_0x4e14bf)continue;if(_0x2cb232[_0x4e14bf]&&_0x2cb232[_0x4e14bf]>=_0x5a1a7f){if(_0x3f0260(0x206)===_0x3f0260(0x206))this['canPayActionFusionCombination'](_0x4e14bf)&&(_0x2b02e7=_0x4e14bf,_0x5a1a7f=_0x2cb232[_0x4e14bf]);else{if(this[_0x3f0260(0x17b)]!==_0x1aa995)return![];if(!_0x21e321[_0x3f0260(0x29e)]())return![];if(!_0x3818ab[_0x3f0260(0x176)]())return![];return _0x579e72[_0x3f0260(0x21e)][_0x3f0260(0x197)][_0x3f0260(0x131)][_0x3f0260(0x13b)];}}if(_0x3d8af2[_0x4e14bf]&&_0x3d8af2[_0x4e14bf]>=_0x5a1a7f){if(this['canPayActionFusionCombination'](_0x4e14bf)){if(_0x3f0260(0x32e)!==_0x3f0260(0x32e))return this[_0x3f0260(0x213)]===_0x23597c&&(this['_btbTurnOrderFaceIndex']=this[_0x3f0260(0x1bd)]()),this[_0x3f0260(0x213)];else _0x2b02e7=_0x4e14bf,_0x5a1a7f=_0x2cb232[_0x4e14bf];}}}if(_0x5a1a7f<=0x0)return;this['removeActionFusionIngredients'](_0x2b02e7),this['currentAction']()[_0x3f0260(0x339)](_0x2b02e7),_0x570b7b?this[_0x3f0260(0x14a)]()[_0x3f0260(0xce)](_0x5a1a7f):this[_0x3f0260(0x14a)]()[_0x3f0260(0x11a)](_0x5a1a7f);},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x295)]=function(){const _0x399861=_0x4b87bd;if(this[_0x399861(0x1f0)]())return![];const _0x561cdf=VisuMZ[_0x399861(0x21e)][_0x399861(0x197)][_0x399861(0x1a2)];if(this[_0x399861(0x148)]()){if('yWeMU'===_0x399861(0x379))this['push']('waitForAnimation');else{if(_0x561cdf[_0x399861(0x147)]===undefined)return!![];return _0x561cdf['ActorActionFusions'];}}else{if(_0x399861(0x2d7)===_0x399861(0x2d7)){if(_0x561cdf[_0x399861(0x2e2)]===undefined)return!![];return _0x561cdf['EnemyActionFusions'];}else this['padding']=0x0;}},Game_BattlerBase[_0x4b87bd(0x1ca)]['cannotFusionNotetagBTB']=function(){const _0x545d5b=_0x4b87bd,_0xf025f8=VisuMZ[_0x545d5b(0x21e)][_0x545d5b(0xf9)],_0x4be132=this[_0x545d5b(0x287)]();for(const _0x10556d of _0x4be132){if(!_0x10556d)continue;const _0x3c6aaa=_0x10556d['note'];if(_0x3c6aaa[_0x545d5b(0x149)](_0xf025f8[_0x545d5b(0x137)]))return!![];if(_0x3c6aaa[_0x545d5b(0x149)](_0xf025f8[_0x545d5b(0x11c)]))return![];}return![];},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x128)]=function(){const _0x21862e=_0x4b87bd,_0x5e082c=this[_0x21862e(0x14a)](),_0x2fca56=this[_0x21862e(0x192)],_0x2af487=_0x2fca56[_0x21862e(0x294)](_0x5ab943=>this[_0x21862e(0x2dd)](_0x5e082c,_0x5ab943)),_0x2a6222=_0x2af487[_0x21862e(0x32f)](_0x58d800=>_0x58d800[_0x21862e(0x2c2)]()['id']),_0x4c1842=VisuMZ[_0x21862e(0x21e)][_0x21862e(0x130)](_0x5e082c['item']()['id'],_0x2a6222);let _0x555e81=String(_0x5e082c[_0x21862e(0x2c2)]()['id']);for(let _0x4b78ae=0x1;_0x4b78ae<_0x2fca56[_0x21862e(0x2bc)];_0x4b78ae++){if('LITmF'===_0x21862e(0x2fe)){const _0x1b342c=_0x2fca56[_0x4b78ae];if(this['canActionFusionWithBTB'](_0x5e082c,_0x1b342c))_0x555e81=_0x21862e(0x231)[_0x21862e(0x12c)](_0x555e81,_0x1b342c[_0x21862e(0x2c2)]()['id']),_0x4c1842['push'](_0x555e81);else{if(_0x21862e(0x210)!==_0x21862e(0x117))break;else _0x4f8ad7=_0x16721f['x']+_0x1de673[_0x21862e(0xcd)]+0x8;}}else{if(_0x33614f[_0x21862e(0x218)])return _0x1a661c[_0x21862e(0x218)](_0x3b7843,_0x2341eb);let _0x3a385f='';if(_0x280958[_0x21862e(0x380)](_0x2b17ed))_0x3a385f='Actor-%1-%2'['format'](_0x205845['id'],_0x4153ee);if(_0xe8e5cc[_0x21862e(0x380)](_0x54bf04))_0x3a385f=_0x21862e(0x2b1)[_0x21862e(0x12c)](_0x26698a['id'],_0x5c8477);if(_0x277cfd['includes'](_0x13c5dd))_0x3a385f=_0x21862e(0x315)[_0x21862e(0x12c)](_0x43b686['id'],_0x188796);if(_0x39616d[_0x21862e(0x380)](_0x3cc063))_0x3a385f=_0x21862e(0x118)[_0x21862e(0x12c)](_0x36fbe6['id'],_0x1f1926);if(_0x50b6cc[_0x21862e(0x380)](_0x452164))_0x3a385f='Weapon-%1-%2'[_0x21862e(0x12c)](_0x200f73['id'],_0x836566);if(_0x1265f2[_0x21862e(0x380)](_0x45e132))_0x3a385f=_0x21862e(0x1e1)[_0x21862e(0x12c)](_0x1f8940['id'],_0x1b6381);if(_0x3335e0[_0x21862e(0x380)](_0xdf47a7))_0x3a385f=_0x21862e(0x190)[_0x21862e(0x12c)](_0x1cd64a['id'],_0x4b1e79);if(_0x46ca09[_0x21862e(0x380)](_0x353a82))_0x3a385f=_0x21862e(0x22f)[_0x21862e(0x12c)](_0x4b4998['id'],_0x2155be);return _0x3a385f;}}return _0x4c1842['filter']((_0xf51673,_0x330348,_0x97d9de)=>_0x97d9de['indexOf'](_0xf51673)===_0x330348);},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x130)]=function(_0x1b2366,_0x207267){const _0x2979a3=[],_0x4ebfbf=function(_0x44e677,_0x84131f){const _0x300991=_0x227a;for(var _0x43010e=0x0;_0x43010e<_0x84131f[_0x300991(0x2bc)];_0x43010e++){_0x300991(0x2e8)==='nsvgd'?_0xa6ba0b['makeSpeed']():(_0x2979a3[_0x300991(0x167)](_0x44e677+'-'+_0x84131f[_0x43010e]),_0x4ebfbf(_0x44e677+'-'+_0x84131f[_0x43010e],_0x84131f[_0x300991(0x30e)](_0x43010e+0x1)));}};return _0x4ebfbf(_0x1b2366,_0x207267),_0x2979a3;},Game_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x2dd)]=function(_0xc98371,_0x1cc4c3){const _0x493c7d=_0x4b87bd;if(!_0xc98371||!_0x1cc4c3)return![];if(_0xc98371===_0x1cc4c3)return![];if(!_0xc98371[_0x493c7d(0x2c2)]()||!_0x1cc4c3[_0x493c7d(0x2c2)]())return![];if(_0xc98371['isSkill']()!==_0x1cc4c3[_0x493c7d(0x31b)]())return![];return!![];},Game_Battler[_0x4b87bd(0x1ca)]['canPayActionFusionCombination']=function(_0x5bc7c3){const _0x4572dd=_0x4b87bd,_0x4d633e=this[_0x4572dd(0x14a)]()[_0x4572dd(0x31b)](),_0x3e08de=JsonEx[_0x4572dd(0x2d6)](this);_0x3e08de[_0x4572dd(0x1d4)]=!![],_0x3e08de['currentAction']()['setActionFusionBTB'](_0x5bc7c3);const _0x4901a1=JsonEx[_0x4572dd(0x2d6)]($gameParty[_0x4572dd(0x1e6)]),_0x10ca7f=JsonEx[_0x4572dd(0x2d6)]($gameParty[_0x4572dd(0x2e0)]),_0x16cc06=JsonEx[_0x4572dd(0x2d6)]($gameParty[_0x4572dd(0x20d)]);let _0x31d358=_0x4d633e?_0x3e08de[_0x4572dd(0x326)]():_0x3e08de[_0x4572dd(0x216)]();return $gameParty['_items']=_0x4901a1,$gameParty[_0x4572dd(0x2e0)]=_0x10ca7f,$gameParty[_0x4572dd(0x20d)]=_0x16cc06,_0x31d358;},Game_Battler['prototype'][_0x4b87bd(0x297)]=function(_0x5e3308){const _0xb23e2=_0x4b87bd,_0x56b0a9=this[_0xb23e2(0x14a)](),_0x2f56f1=_0x5e3308[_0xb23e2(0x1c8)]('-')[_0xb23e2(0x32f)](_0x7793ff=>Number(_0x7793ff));_0x2f56f1[_0xb23e2(0x25c)]();const _0x50afa4=this[_0xb23e2(0x192)],_0x2b915a=[];for(const _0x18939d of _0x50afa4){if(this[_0xb23e2(0x2dd)](_0x56b0a9,_0x18939d)){if(_0xb23e2(0x343)!==_0xb23e2(0x36f)){if(_0x2f56f1[_0xb23e2(0x380)](_0x18939d[_0xb23e2(0x2c2)]()['id'])){if(_0xb23e2(0x2f8)===_0xb23e2(0x2ca)){const _0x428f81=_0x66a762(_0x21d7d8['$1']);this['subject']()[_0xb23e2(0x328)](_0x428f81);}else _0x2b915a[_0xb23e2(0x167)](_0x18939d),_0x2f56f1[_0xb23e2(0x1a6)](_0x2f56f1[_0xb23e2(0x164)](_0x18939d[_0xb23e2(0x2c2)]()['id']),0x1);}}else this['_btbTurnOrderVisible']=!![];}}for(const _0x53d201 of _0x2b915a){_0xb23e2(0x1b7)===_0xb23e2(0x274)?_0x42e516['includes'](_0x4a8189[_0xb23e2(0x2c2)]()['id'])&&(_0x11a265['push'](_0x14f094),_0x59412d[_0xb23e2(0x1a6)](_0x50277e['indexOf'](_0x2a7cbc['item']()['id']),0x1)):_0x50afa4[_0xb23e2(0x129)](_0x53d201);}},Game_Actor[_0x4b87bd(0x1ca)][_0x4b87bd(0x328)]=function(_0xfbeb2){const _0x38fdf0=_0x4b87bd;Game_Battler[_0x38fdf0(0x1ca)][_0x38fdf0(0x328)][_0x38fdf0(0x284)](this,_0xfbeb2);if(!SceneManager[_0x38fdf0(0x29e)]())return;if(!BattleManager[_0x38fdf0(0x1d0)]()[_0x38fdf0(0x380)](this))return;BattleManager[_0x38fdf0(0x2fc)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x146)]=Game_Actor[_0x4b87bd(0x1ca)]['makeActions'],Game_Actor['prototype']['makeActions']=function(){const _0x5d9a66=_0x4b87bd;VisuMZ[_0x5d9a66(0x21e)][_0x5d9a66(0x146)][_0x5d9a66(0x284)](this),BattleManager[_0x5d9a66(0x176)]()&&this[_0x5d9a66(0x201)]()<0x0&&this[_0x5d9a66(0x262)]();},Game_Actor[_0x4b87bd(0x1ca)][_0x4b87bd(0x10e)]=function(){const _0x4f78be=_0x4b87bd,_0x246e6b=this['actor']()[_0x4f78be(0xe1)];if(_0x246e6b[_0x4f78be(0x149)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x4f78be(0x1cd);else{if(_0x246e6b[_0x4f78be(0x149)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_BTB_TurnOrder[_0x4f78be(0x197)][_0x4f78be(0x1a5)];},Game_Actor['prototype'][_0x4b87bd(0x1b1)]=function(){const _0x3339f2=_0x4b87bd,_0x3e645a=this[_0x3339f2(0x196)]()['note'];if(_0x3e645a[_0x3339f2(0x149)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x4b87bd(0x1ca)][_0x4b87bd(0x1bd)]=function(){const _0x1f3600=_0x4b87bd,_0x198901=this[_0x1f3600(0x196)]()[_0x1f3600(0xe1)];if(_0x198901['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x1f3600(0x37b)]();},Game_Actor[_0x4b87bd(0x1ca)][_0x4b87bd(0x306)]=function(){const _0x22b238=_0x4b87bd,_0x50d438=this['actor']()[_0x22b238(0xe1)];if(_0x50d438[_0x22b238(0x149)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x22b238(0x197)]['ActorBattlerIcon'];},Game_Actor['prototype'][_0x4b87bd(0x2dd)]=function(_0x46271f,_0xf1e2bc){const _0x29c150=_0x4b87bd;if(!Game_Battler[_0x29c150(0x1ca)][_0x29c150(0x2dd)][_0x29c150(0x284)](this,_0x46271f,_0xf1e2bc))return![];if(_0x46271f[_0x29c150(0x2c3)]()&&_0xf1e2bc['needsSelection']()){if(_0x46271f['isForFriend']()!==_0xf1e2bc[_0x29c150(0x1f8)]())return![];if(_0x46271f[_0x29c150(0x22c)]!==_0xf1e2bc[_0x29c150(0x22c)])return![];}return!![];},Game_Enemy['prototype'][_0x4b87bd(0x10e)]=function(){const _0x5b08c2=_0x4b87bd,_0xf62912=this['enemy']()[_0x5b08c2(0xe1)];if(_0xf62912[_0x5b08c2(0x149)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'vYEXE'===_0x5b08c2(0xc4)?'face':_0x5b08c2(0x1cd);else{if(_0xf62912[_0x5b08c2(0x149)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_BTB_TurnOrder[_0x5b08c2(0x197)]['EnemyBattlerType'];},Game_Enemy[_0x4b87bd(0x1ca)][_0x4b87bd(0x1b1)]=function(){const _0x1f0b6c=_0x4b87bd,_0x3944ae=this['enemy']()['note'];if(_0x3944ae['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x1f0b6c(0x197)]['EnemyBattlerFaceName'];},Game_Enemy[_0x4b87bd(0x1ca)]['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x95089f=_0x4b87bd,_0x4eecc1=this[_0x95089f(0x14b)]()['note'];if(_0x4eecc1[_0x95089f(0x149)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder[_0x95089f(0x197)]['EnemyBattlerFaceIndex'];},Game_Enemy[_0x4b87bd(0x1ca)][_0x4b87bd(0x306)]=function(){const _0xc93fdb=_0x4b87bd,_0x491167=this[_0xc93fdb(0x14b)]()[_0xc93fdb(0xe1)];if(_0x491167['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0xc93fdb(0x362)==='fJcKP'?Number(RegExp['$1']):_0x51f7de(_0x546f58['$1']);return Window_BTB_TurnOrder[_0xc93fdb(0x197)][_0xc93fdb(0x208)];},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0xc5)]=Game_Enemy[_0x4b87bd(0x1ca)]['makeActions'],Game_Enemy['prototype']['makeActions']=function(){const _0x3b5121=_0x4b87bd;VisuMZ[_0x3b5121(0x21e)][_0x3b5121(0xc5)]['call'](this),this[_0x3b5121(0x2e7)](),this[_0x3b5121(0x286)]();},Game_Enemy['prototype'][_0x4b87bd(0x2e7)]=function(){const _0x4898f0=_0x4b87bd;if(!BattleManager[_0x4898f0(0x176)]())return;if(this['numActions']()<=0x0)return;this[_0x4898f0(0x102)]=![];if(this[_0x4898f0(0x201)]()<0x0){if(_0x4898f0(0xdc)==='Phohi')this[_0x4898f0(0x262)]();else{const _0x4fa713=this['_graphicIconIndex'],_0x1266c2=this[_0x4898f0(0xe2)](),_0x510151=this['bitmapHeight']();this[_0x4898f0(0x179)][_0x4898f0(0x1d8)]=new _0x50ca3f(_0x1266c2,_0x510151);const _0xdfbd59=this[_0x4898f0(0x179)][_0x4898f0(0x1d8)],_0x264432=_0x327ae5[_0x4898f0(0x132)],_0x57caff=_0x36b65d[_0x4898f0(0x17c)],_0x14665f=_0x2ed7cd[_0x4898f0(0x1c4)](_0x264432,_0x57caff,_0x1266c2,_0x510151),_0x2a94e5=_0x4fa713%0x10*_0x264432,_0xade54e=_0x305145[_0x4898f0(0x114)](_0x4fa713/0x10)*_0x57caff,_0x26fced=_0xe9ab93[_0x4898f0(0x114)](_0x2bcf3e[_0x4898f0(0x2d9)](_0x1266c2-_0x14665f,0x0)/0x2),_0x5093ea=_0x321064[_0x4898f0(0x114)](_0x5957cd[_0x4898f0(0x2d9)](_0x510151-_0x14665f,0x0)/0x2);_0xdfbd59['blt'](_0x413bef,_0x2a94e5,_0xade54e,_0x264432,_0x57caff,_0x26fced,_0x5093ea,_0x14665f,_0x14665f);}}},Game_Enemy[_0x4b87bd(0x1ca)][_0x4b87bd(0x286)]=function(){const _0x3c4dc8=_0x4b87bd;if(!BattleManager[_0x3c4dc8(0x176)]())return;if(this[_0x3c4dc8(0x31c)]()<=0x0)return;const _0x552bc5=this[_0x3c4dc8(0x192)][0x0];if(!_0x552bc5)return;const _0x526d5f=_0x552bc5[_0x3c4dc8(0x2c2)]();if(!_0x526d5f)return;const _0x3c2f8a=VisuMZ[_0x3c4dc8(0x21e)][_0x3c4dc8(0xf9)],_0x4af927=_0x526d5f['note'];let _0x50ec9a=[];if(_0x4af927[_0x3c4dc8(0x149)](_0x3c2f8a[_0x3c4dc8(0x34a)])){const _0x5c2f0a=String(RegExp['$1'])[_0x3c4dc8(0x1c8)](',');for(let _0x68a207 of _0x5c2f0a){_0x68a207=(String(_0x68a207)||'')['trim']();const _0x1534b6=/^\d+$/[_0x3c4dc8(0x323)](_0x68a207);_0x1534b6?_0x50ec9a[_0x3c4dc8(0x167)](Number(_0x68a207)):_0x3c4dc8(0x2cb)==='XjfJO'?_0x50ec9a[_0x3c4dc8(0x167)](DataManager[_0x3c4dc8(0x2ea)](_0x68a207)):this[_0x3c4dc8(0x167)]('waitCount',_0x46e2ad);}}if(_0x50ec9a[_0x3c4dc8(0x2bc)]<=0x0)return;while(_0x50ec9a[_0x3c4dc8(0x2bc)]>this[_0x3c4dc8(0x12a)]()){_0x3c4dc8(0x310)!=='lMmfT'?_0x344077[_0x3c4dc8(0x21e)][_0x3c4dc8(0x143)]['call'](this):_0x50ec9a['pop']();}if(_0x50ec9a['length']<=0x0)return;this[_0x3c4dc8(0x262)]();for(const _0x56484a of _0x50ec9a){const _0x50ce6f=new Game_Action(this);_0x50ce6f['setSkill'](_0x56484a),_0x50ce6f[_0x3c4dc8(0x28f)]=!![],this['_actions'][_0x3c4dc8(0x167)](_0x50ce6f);}},Game_Enemy[_0x4b87bd(0x1ca)][_0x4b87bd(0x2be)]=function(){const _0x5166f6=_0x4b87bd;let _0x19f5d4=this[_0x5166f6(0x31c)]();for(const _0x13c910 of this[_0x5166f6(0x192)]){if(!_0x13c910)continue;_0x19f5d4+=_0x13c910['getTotalActionFusionRecipes']();}return _0x19f5d4-0x1;},VisuMZ[_0x4b87bd(0x21e)]['Game_Unit_makeActions']=Game_Unit[_0x4b87bd(0x1ca)][_0x4b87bd(0x162)],Game_Unit[_0x4b87bd(0x1ca)][_0x4b87bd(0x162)]=function(){const _0x443bbb=_0x4b87bd;VisuMZ[_0x443bbb(0x21e)]['Game_Unit_makeActions'][_0x443bbb(0x284)](this),BattleManager[_0x443bbb(0x176)]()&&this===$gameTroop&&SceneManager[_0x443bbb(0x29e)]()&&BattleManager[_0x443bbb(0x21f)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x1e0)]=Game_Party[_0x4b87bd(0x1ca)][_0x4b87bd(0x2ba)],Game_Party[_0x4b87bd(0x1ca)]['removeActor']=function(_0x2ede9b){const _0x3064b1=_0x4b87bd;VisuMZ['BattleSystemBTB'][_0x3064b1(0x1e0)]['call'](this,_0x2ede9b),SceneManager[_0x3064b1(0x29e)]()&&BattleManager[_0x3064b1(0x176)]()&&BattleManager[_0x3064b1(0x23b)][_0x3064b1(0x129)]($gameActors[_0x3064b1(0x196)](_0x2ede9b));},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x15f)]=Scene_Battle['prototype']['onDisabledPartyCommandSelection'],Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0x119)]=function(){const _0xafe70f=_0x4b87bd;if(BattleManager[_0xafe70f(0x176)]()){if(_0xafe70f(0x1cf)!==_0xafe70f(0x1cf)){if(!_0x42c2a5['Settings']['ShowMarkerBorder'])return;const _0x3473bf=_0x15d8b5[_0xafe70f(0x197)],_0x20952f=this[_0xafe70f(0x120)]===_0x4beff2?_0xafe70f(0xfd):_0xafe70f(0x29b),_0x3d5a86=_0xafe70f(0x19f)['format'](_0x20952f),_0xba4601=new _0x3edbc2();_0xba4601[_0xafe70f(0x260)]['x']=this[_0xafe70f(0x260)]['x'],_0xba4601[_0xafe70f(0x260)]['y']=this[_0xafe70f(0x260)]['y'];if(_0x3473bf[_0x3d5a86])_0xba4601[_0xafe70f(0x1d8)]=_0x12b368[_0xafe70f(0x360)](_0x3473bf[_0x3d5a86]);else{let _0x395d46=this[_0xafe70f(0xe2)](),_0x41f156=this['bitmapHeight'](),_0x45e934=_0x3473bf['BorderThickness'];_0xba4601[_0xafe70f(0x1d8)]=new _0x12ae1e(_0x395d46,_0x41f156);const _0x502e2b=_0xafe70f(0x140),_0x47554=_0x1e51ef['getColor'](_0x3473bf['%1BorderColor'[_0xafe70f(0x12c)](_0x20952f)]);_0xba4601[_0xafe70f(0x1d8)]['fillRect'](0x0,0x0,_0x395d46,_0x41f156,_0x502e2b),_0x395d46-=0x2,_0x41f156-=0x2,_0xba4601['bitmap'][_0xafe70f(0x226)](0x1,0x1,_0x395d46,_0x41f156,_0x47554),_0x395d46-=_0x45e934*0x2,_0x41f156-=_0x45e934*0x2,_0xba4601[_0xafe70f(0x1d8)][_0xafe70f(0x226)](0x1+_0x45e934,0x1+_0x45e934,_0x395d46,_0x41f156,_0x502e2b),_0x395d46-=0x2,_0x41f156-=0x2,_0x45e934+=0x1,_0xba4601[_0xafe70f(0x1d8)][_0xafe70f(0x232)](0x1+_0x45e934,0x1+_0x45e934,_0x395d46,_0x41f156);}this[_0xafe70f(0x10c)]=_0xba4601,this[_0xafe70f(0x1ff)](this[_0xafe70f(0x10c)]),this[_0xafe70f(0x113)]=this[_0xafe70f(0x10c)][_0xafe70f(0x113)],this[_0xafe70f(0x35e)]=this['_backgroundSprite'][_0xafe70f(0x35e)];}else this['selectNextCommand']();}else'yRMen'!=='ICBPk'?VisuMZ[_0xafe70f(0x21e)][_0xafe70f(0x15f)][_0xafe70f(0x284)](this):_0x4a6c63[_0xafe70f(0x167)](_0xb2e3e1[_0xafe70f(0x2e1)](_0x2b792d));},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x245)]=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle[_0x4b87bd(0x1ca)]['createActorCommandWindow']=function(){const _0x2fe835=_0x4b87bd;VisuMZ[_0x2fe835(0x21e)][_0x2fe835(0x245)][_0x2fe835(0x284)](this),this[_0x2fe835(0xf7)]();},Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0xf7)]=function(){const _0x406047=_0x4b87bd;if(!BattleManager[_0x406047(0x176)]())return;const _0x3b8d69=this[_0x406047(0x325)];if(!_0x3b8d69)return;_0x3b8d69[_0x406047(0xe5)](_0x406047(0x2c9),this[_0x406047(0x23c)]['bind'](this)),_0x3b8d69[_0x406047(0xe5)]('cancel',this[_0x406047(0x304)][_0x406047(0x1bb)](this));},Scene_Battle['prototype'][_0x4b87bd(0x23c)]=function(){const _0x52ca90=_0x4b87bd;this[_0x52ca90(0xe7)]();},Scene_Battle['prototype'][_0x4b87bd(0x304)]=function(){const _0x205008=_0x4b87bd,_0x102889=BattleManager['actor']();if(!_0x102889)this[_0x205008(0x1a9)]();else{if(_0x102889[_0x205008(0x31c)]()<=0x1)this['commandCancel']();else _0x102889['_actionInputIndex']>0x0?this[_0x205008(0x1a9)]():this[_0x205008(0x205)]();}},Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0xe7)]=function(){const _0x4fd1a0=_0x4b87bd,_0xce492d=BattleManager[_0x4fd1a0(0x196)]();if(!_0xce492d)return;_0xce492d[_0x4fd1a0(0xe7)]();const _0x4e427a=this[_0x4fd1a0(0x325)][_0x4fd1a0(0x2f5)],_0x4778af=this[_0x4fd1a0(0x325)][_0x4fd1a0(0x281)],_0x228c96=this['_actorCommandWindow'][_0x4fd1a0(0x2c8)]();this[_0x4fd1a0(0x325)][_0x4fd1a0(0x375)](_0xce492d),this[_0x4fd1a0(0x325)][_0x4fd1a0(0x249)](_0x228c96),this[_0x4fd1a0(0x325)][_0x4fd1a0(0x2f5)]=_0x4e427a,this['_actorCommandWindow'][_0x4fd1a0(0x281)]=_0x4778af;},Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0x205)]=function(){const _0x599c46=_0x4b87bd,_0x12002c=BattleManager[_0x599c46(0x196)]();if(!_0x12002c)return;_0x12002c[_0x599c46(0x292)]();const _0x9f4687=this[_0x599c46(0x325)]['_scrollX'],_0x2ef516=this['_actorCommandWindow']['_scrollY'],_0x484563=this['_actorCommandWindow']['index']();this[_0x599c46(0x325)][_0x599c46(0x375)](_0x12002c),this[_0x599c46(0x325)]['select'](_0x484563),this['_actorCommandWindow']['_scrollX']=_0x9f4687,this[_0x599c46(0x325)][_0x599c46(0x281)]=_0x2ef516;},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x21b)]=Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0x122)],Scene_Battle[_0x4b87bd(0x1ca)]['createAllWindows']=function(){const _0x412021=_0x4b87bd;VisuMZ['BattleSystemBTB'][_0x412021(0x21b)][_0x412021(0x284)](this),this[_0x412021(0x299)]();},Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0x299)]=function(){const _0x236408=_0x4b87bd;if(!BattleManager['isBTB']())return;this['_btbTurnOrderWindow']=new Window_BTB_TurnOrder();const _0x40e4e5=this['getChildIndex'](this[_0x236408(0x347)]);this['addChildAt'](this['_btbTurnOrderWindow'],_0x40e4e5),this[_0x236408(0x142)](),BattleManager[_0x236408(0x2cd)](!![]);},Scene_Battle[_0x4b87bd(0x1ca)][_0x4b87bd(0x142)]=function(){const _0x305732=_0x4b87bd,_0x18c8f7=Window_BTB_TurnOrder['Settings'];if(_0x18c8f7[_0x305732(0x2e9)]!=='top')return;if(!_0x18c8f7[_0x305732(0x17a)])return;if(!this['_logWindow'])return;const _0x1a5886=this[_0x305732(0xdd)]['y']-Math[_0x305732(0x1d7)]((Graphics[_0x305732(0x35e)]-Graphics['boxHeight'])/0x2),_0x16e050=_0x1a5886+this[_0x305732(0xdd)][_0x305732(0x35e)];this[_0x305732(0xd7)]['y']=_0x16e050+_0x18c8f7[_0x305732(0x2b5)];};function Sprite_BTB_TurnOrder_Battler(){const _0x34a975=_0x4b87bd;this[_0x34a975(0x278)](...arguments);}function _0x227a(_0x1f10ff,_0x5e2d46){const _0x235d3f=_0x235d();return _0x227a=function(_0x227a9e,_0x1e160b){_0x227a9e=_0x227a9e-0xc2;let _0x19fe9f=_0x235d3f[_0x227a9e];return _0x19fe9f;},_0x227a(_0x1f10ff,_0x5e2d46);}Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]=Object[_0x4b87bd(0x272)](Sprite_Clickable['prototype']),Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['constructor']=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['initialize']=function(_0x2f4f75,_0x5f0608){const _0x3018e8=_0x4b87bd;this[_0x3018e8(0x1b0)](_0x2f4f75,_0x5f0608),Sprite_Clickable[_0x3018e8(0x1ca)]['initialize'][_0x3018e8(0x284)](this),this['opacity']=0x0,this['createChildren'](),this[_0x3018e8(0x36e)]();},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x1b0)]=function(_0x2e6ae9,_0x2c1011){const _0x29b2e2=_0x4b87bd;this[_0x29b2e2(0x120)]=_0x2e6ae9,this[_0x29b2e2(0x203)]=_0x2c1011;const _0x29a9be=Window_BTB_TurnOrder['Settings'],_0x160915=this[_0x29b2e2(0x173)](),_0x10443f=this['defaultPosition']();this[_0x29b2e2(0x124)]=0x0,this['_positionTargetX']=_0x160915?_0x29a9be['SpriteThin']*_0x10443f:0x0,this[_0x29b2e2(0x2f6)]=_0x160915?0x0:_0x29a9be[_0x29b2e2(0x354)]*_0x10443f,this[_0x29b2e2(0x273)]=0x0,this[_0x29b2e2(0x291)]=0xff,this[_0x29b2e2(0x2f1)]=![],this[_0x29b2e2(0x1ec)]=![],this[_0x29b2e2(0x28b)]=0x0,this[_0x29b2e2(0x305)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['createChildren']=function(){const _0x40cde9=_0x4b87bd;this[_0x40cde9(0x369)](),this[_0x40cde9(0x2cc)](),this[_0x40cde9(0x1d9)](),this[_0x40cde9(0x303)](),this[_0x40cde9(0x2b0)]();},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x369)]=function(){const _0x201cac=_0x4b87bd;this['x']=this[_0x201cac(0xc3)],this['y']=this[_0x201cac(0x2f6)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4b87bd(0x173)]=function(){const _0x325264=_0x4b87bd,_0x30f435=Window_BTB_TurnOrder['Settings'],_0x50ec39=[_0x325264(0x19c),'bottom'][_0x325264(0x380)](_0x30f435[_0x325264(0x2e9)]);return _0x50ec39;},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0xe2)]=function(){const _0x4b0766=_0x4b87bd,_0xa7cfa1=Window_BTB_TurnOrder[_0x4b0766(0x197)];return this[_0x4b0766(0x173)]()?_0xa7cfa1[_0x4b0766(0x354)]:_0xa7cfa1['SpriteLength'];},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x240)]=function(){const _0x18c4d5=_0x4b87bd,_0x58b0b8=Window_BTB_TurnOrder[_0x18c4d5(0x197)];return this[_0x18c4d5(0x173)]()?_0x58b0b8['SpriteLength']:_0x58b0b8[_0x18c4d5(0x354)];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4b87bd(0x18c)]=function(){const _0x383555=_0x4b87bd;this[_0x383555(0x1d8)]=new Bitmap(0x48,0x24);const _0xb10b83=this[_0x383555(0x20a)]()?this[_0x383555(0x20a)]()[_0x383555(0x171)]():_0x383555(0x157)[_0x383555(0x12c)](this[_0x383555(0x120)],this[_0x383555(0x203)]);this[_0x383555(0x1d8)][_0x383555(0x1e5)](_0xb10b83,0x0,0x0,0x48,0x24,_0x383555(0x105));},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x2cc)]=function(){const _0x1d166a=_0x4b87bd;if(!Window_BTB_TurnOrder['Settings']['ShowMarkerBg'])return;const _0x34ecb5=Window_BTB_TurnOrder['Settings'],_0x42bc5e=this[_0x1d166a(0x120)]===$gameParty?_0x1d166a(0xfd):'Enemy',_0x110250='%1SystemBg'['format'](_0x42bc5e),_0x2ce3ff=new Sprite();_0x2ce3ff[_0x1d166a(0x260)]['x']=this[_0x1d166a(0x260)]['x'],_0x2ce3ff[_0x1d166a(0x260)]['y']=this[_0x1d166a(0x260)]['y'];if(_0x34ecb5[_0x110250]){if('LpYPA'===_0x1d166a(0xd2))_0x2ce3ff[_0x1d166a(0x1d8)]=ImageManager[_0x1d166a(0x360)](_0x34ecb5[_0x110250]);else{if(!this['isBTB']())return;this[_0x1d166a(0x23b)]=this[_0x1d166a(0x23b)]||[],this[_0x1d166a(0x23b)]=this[_0x1d166a(0x23b)][_0x1d166a(0x294)](_0x1ae452=>_0x1ae452&&_0x1ae452['isAppeared']()&&_0x1ae452[_0x1d166a(0x1f3)]()),this[_0x1d166a(0x2cd)]();}}else{const _0x55dcdc=this['bitmapWidth'](),_0x14f2ce=this[_0x1d166a(0x240)]();_0x2ce3ff['bitmap']=new Bitmap(_0x55dcdc,_0x14f2ce);const _0x36d8ac=ColorManager[_0x1d166a(0x2ec)](_0x34ecb5[_0x1d166a(0x207)[_0x1d166a(0x12c)](_0x42bc5e)]),_0x5aef92=ColorManager[_0x1d166a(0x2ec)](_0x34ecb5[_0x1d166a(0x116)[_0x1d166a(0x12c)](_0x42bc5e)]);_0x2ce3ff['bitmap'][_0x1d166a(0x357)](0x0,0x0,_0x55dcdc,_0x14f2ce,_0x36d8ac,_0x5aef92,!![]);}this[_0x1d166a(0x10c)]=_0x2ce3ff,this['addChild'](this[_0x1d166a(0x10c)]);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x1d9)]=function(){const _0x2b5b59=_0x4b87bd,_0x22178d=new Sprite();_0x22178d[_0x2b5b59(0x260)]['x']=this[_0x2b5b59(0x260)]['x'],_0x22178d[_0x2b5b59(0x260)]['y']=this['anchor']['y'],this[_0x2b5b59(0x179)]=_0x22178d,this['addChild'](this[_0x2b5b59(0x179)]),this[_0x2b5b59(0x285)]();},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x303)]=function(){const _0x2514ca=_0x4b87bd;if(!Window_BTB_TurnOrder['Settings'][_0x2514ca(0x32b)])return;const _0x52841a=Window_BTB_TurnOrder[_0x2514ca(0x197)],_0x1b12fa=this['_unit']===$gameParty?_0x2514ca(0xfd):_0x2514ca(0x29b),_0x16eead='%1SystemBorder'['format'](_0x1b12fa),_0x118a6a=new Sprite();_0x118a6a[_0x2514ca(0x260)]['x']=this[_0x2514ca(0x260)]['x'],_0x118a6a[_0x2514ca(0x260)]['y']=this[_0x2514ca(0x260)]['y'];if(_0x52841a[_0x16eead]){if(_0x2514ca(0x2fa)===_0x2514ca(0x2fa))_0x118a6a[_0x2514ca(0x1d8)]=ImageManager[_0x2514ca(0x360)](_0x52841a[_0x16eead]);else{const _0x52272a=_0x5aad73[_0x2514ca(0x197)];if([_0x2514ca(0x19c)][_0x2514ca(0x380)](_0x52272a['DisplayPosition']))return;this['x']=this[_0x2514ca(0x35b)],this['y']=this[_0x2514ca(0x251)];const _0x55261d=_0x27173a[_0x2514ca(0x15e)][_0x2514ca(0x347)];this['x']+=_0x55261d['x'],this['y']+=_0x55261d['y'];}}else{if(_0x2514ca(0x225)!==_0x2514ca(0x204)){let _0x1c4999=this['bitmapWidth'](),_0x37d40f=this[_0x2514ca(0x240)](),_0xafdcb3=_0x52841a[_0x2514ca(0x372)];_0x118a6a[_0x2514ca(0x1d8)]=new Bitmap(_0x1c4999,_0x37d40f);const _0x144612='#000000',_0x17448c=ColorManager[_0x2514ca(0x2ec)](_0x52841a[_0x2514ca(0x14f)[_0x2514ca(0x12c)](_0x1b12fa)]);_0x118a6a[_0x2514ca(0x1d8)][_0x2514ca(0x226)](0x0,0x0,_0x1c4999,_0x37d40f,_0x144612),_0x1c4999-=0x2,_0x37d40f-=0x2,_0x118a6a[_0x2514ca(0x1d8)][_0x2514ca(0x226)](0x1,0x1,_0x1c4999,_0x37d40f,_0x17448c),_0x1c4999-=_0xafdcb3*0x2,_0x37d40f-=_0xafdcb3*0x2,_0x118a6a[_0x2514ca(0x1d8)][_0x2514ca(0x226)](0x1+_0xafdcb3,0x1+_0xafdcb3,_0x1c4999,_0x37d40f,_0x144612),_0x1c4999-=0x2,_0x37d40f-=0x2,_0xafdcb3+=0x1,_0x118a6a['bitmap'][_0x2514ca(0x232)](0x1+_0xafdcb3,0x1+_0xafdcb3,_0x1c4999,_0x37d40f);}else return this['_btbTurnOrderIconIndex']===_0x4c0042&&(this['_btbTurnOrderIconIndex']=this[_0x2514ca(0x306)]()),this[_0x2514ca(0x18b)];}this['_backgroundSprite']=_0x118a6a,this['addChild'](this[_0x2514ca(0x10c)]),this['width']=this[_0x2514ca(0x10c)][_0x2514ca(0x113)],this[_0x2514ca(0x35e)]=this[_0x2514ca(0x10c)][_0x2514ca(0x35e)];},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x2b0)]=function(){const _0x270748=_0x4b87bd,_0x319cc6=Window_BTB_TurnOrder[_0x270748(0x197)];if(!_0x319cc6[_0x270748(0x2a7)])return;if(this[_0x270748(0x120)]===$gameParty)return;const _0x46198b=this[_0x270748(0xe2)](),_0x7a33ab=this[_0x270748(0x240)](),_0x33c615=new Sprite();_0x33c615[_0x270748(0x260)]['x']=this['anchor']['x'],_0x33c615[_0x270748(0x260)]['y']=this['anchor']['y'],_0x33c615[_0x270748(0x1d8)]=new Bitmap(_0x46198b,_0x7a33ab),this[_0x270748(0x330)]=_0x33c615,this[_0x270748(0x1ff)](this['_letterSprite']);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['battler']=function(){const _0x44b8fe=_0x4b87bd;return this[_0x44b8fe(0x120)]?this[_0x44b8fe(0x120)][_0x44b8fe(0x2d0)]()[this[_0x44b8fe(0x203)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x24f)]=function(){const _0x56a444=_0x4b87bd;Sprite_Clickable[_0x56a444(0x1ca)][_0x56a444(0x24f)][_0x56a444(0x284)](this),this[_0x56a444(0x336)](),this[_0x56a444(0x187)](),this['checkOpacity'](),this[_0x56a444(0x23d)](),this[_0x56a444(0x250)](),this[_0x56a444(0x348)](),this[_0x56a444(0x1ba)](),this[_0x56a444(0x104)]();},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x336)]=function(){const _0x4317fe=_0x4b87bd,_0x4f2eab=this[_0x4317fe(0x242)]();if(this[_0x4317fe(0x151)]===_0x4f2eab)return;this[_0x4317fe(0x151)]=_0x4f2eab;this[_0x4317fe(0x235)]<0xff&&this['battler']()&&_0x4f2eab!==this[_0x4317fe(0x19e)]()&&this[_0x4317fe(0x1d1)](0xff);if(_0x4f2eab===this[_0x4317fe(0x19e)]()&&this[_0x4317fe(0x273)]<=0x0&&this[_0x4317fe(0x235)]>0x0)_0x4317fe(0x16f)==='sqqnc'?this[_0x4317fe(0x1d1)](0x0):this[_0x4317fe(0x1ee)]=_0x1c432['isBattleSystemBTBTurnOrderVisible']();else this[_0x4317fe(0x273)]<=0x0&&this[_0x4317fe(0x235)]<0xff&&(_0x4317fe(0x156)===_0x4317fe(0x355)?(_0x18500d['BattleSystemBTB'][_0x4317fe(0x21b)][_0x4317fe(0x284)](this),this['createBTBTurnOrderWindow']()):this[_0x4317fe(0x36e)]());this[_0x4317fe(0xee)]();},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x28c)]=function(){const _0x324c3f=_0x4b87bd,_0x51a740=this[_0x324c3f(0x2a0)]();if(!_0x51a740)return;let _0x429a8c=![];if(this['_containerWidth']!==_0x51a740[_0x324c3f(0x113)])_0x429a8c=!![];else this[_0x324c3f(0x305)]!==_0x51a740[_0x324c3f(0x35e)]&&(_0x429a8c=!![]);_0x429a8c&&(_0x324c3f(0x2ce)!=='FSKxB'?(this[_0x324c3f(0x337)]=_0x38fd0f[_0x324c3f(0x288)](),_0x4ee653=_0x401ee1[_0x324c3f(0xf0)](this[_0x324c3f(0x337)]),_0x101fe5[_0x324c3f(0x25f)](this[_0x324c3f(0x252)][_0x324c3f(0x1bb)](this,_0x19d243))):this[_0x324c3f(0xee)]());},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0xee)]=function(){const _0x4cd137=_0x4b87bd,_0x23a80f=Window_BTB_TurnOrder[_0x4cd137(0x197)],_0x2a22e5=this[_0x4cd137(0x173)](),_0x1a1106=_0x23a80f[_0x4cd137(0x2cf)],_0x4b4dfb=_0x23a80f[_0x4cd137(0x311)],_0x19c89a=SceneManager[_0x4cd137(0x15e)]['_btbTurnOrderWindow'];if(!_0x19c89a)return;const _0x5f432b=this[_0x4cd137(0x242)]();this[_0x4cd137(0x124)]=_0x23a80f['UpdateFrames'],this[_0x4cd137(0xc3)]=_0x2a22e5?_0x23a80f[_0x4cd137(0x354)]*_0x5f432b:0x0,this[_0x4cd137(0x2f6)]=_0x2a22e5?0x0:_0x23a80f['SpriteThin']*_0x5f432b,_0x5f432b>0x0&&(this[_0x4cd137(0xc3)]+=_0x2a22e5?_0x4b4dfb:0x0,this[_0x4cd137(0x2f6)]+=_0x2a22e5?0x0:_0x4b4dfb),_0x1a1106?this[_0x4cd137(0xc3)]=_0x2a22e5?_0x19c89a[_0x4cd137(0x113)]-this[_0x4cd137(0xc3)]-_0x23a80f[_0x4cd137(0x354)]:0x0:this['_positionTargetY']=_0x2a22e5?0x0:_0x19c89a[_0x4cd137(0x35e)]-this[_0x4cd137(0x2f6)]-_0x23a80f['SpriteThin'];},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x187)]=function(){const _0x2e0d80=_0x4b87bd;if(this[_0x2e0d80(0x273)]>0x0)return;if(this['_positionDuration']>0x0){if(_0x2e0d80(0x334)!=='KNHfC')this['canPayActionFusionCombination'](_0x275845)&&(_0x5a2203=_0x29d46d,_0xb6a6ad=_0x4d3492[_0x109ddc]);else{const _0xeec484=this[_0x2e0d80(0x124)];this['x']=(this['x']*(_0xeec484-0x1)+this[_0x2e0d80(0xc3)])/_0xeec484,this['y']=(this['y']*(_0xeec484-0x1)+this[_0x2e0d80(0x2f6)])/_0xeec484,this['_positionDuration']--;}}if(this[_0x2e0d80(0x124)]<=0x0){this['x']=this[_0x2e0d80(0xc3)],this['y']=this['_positionTargetY'];if(this['opacity']<0xff&&!this['_isBattleOver']&&this[_0x2e0d80(0x273)]<=0x0){const _0x3dfbb9=this['battler']();_0x3dfbb9&&(_0x2e0d80(0x2a8)!==_0x2e0d80(0xe0)?this[_0x2e0d80(0x291)]=_0x3dfbb9[_0x2e0d80(0x1f3)]()&&_0x3dfbb9['isAppeared']()?0xff:0x0:(this['_graphicEnemy']=_0x72a8a1[_0x2e0d80(0x2d3)](),_0xfc5144=_0x373b53[_0x2e0d80(0x283)](this[_0x2e0d80(0x138)]),_0x3642b2[_0x2e0d80(0x25f)](this['changeEnemyGraphicBitmap'][_0x2e0d80(0x1bb)](this,_0x3e04a0))));}}},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x19e)]=function(){const _0x33355e=_0x4b87bd,_0x531198=Window_BTB_TurnOrder[_0x33355e(0x197)],_0x226af9=this[_0x33355e(0x173)]()?_0x531198[_0x33355e(0x215)]:_0x531198[_0x33355e(0x2ed)];return _0x226af9+0x1;},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['containerWindow']=function(){const _0x3d39f2=_0x4b87bd;return SceneManager[_0x3d39f2(0x15e)]['_btbTurnOrderWindow'];},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x242)]=function(){const _0x2b2ab1=_0x4b87bd,_0x5b2bbb=this['battler']();if(!_0x5b2bbb)return this[_0x2b2ab1(0x19e)]();if(_0x5b2bbb===BattleManager[_0x2b2ab1(0xf6)])return 0x0;if(BattleManager['_actionBattlers'][_0x2b2ab1(0x380)](_0x5b2bbb)){const _0xc25891=BattleManager[_0x2b2ab1(0x23b)][_0x2b2ab1(0x164)](_0x5b2bbb)+0x1;return _0xc25891;}return this[_0x2b2ab1(0x19e)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4b87bd(0x1d1)]=function(_0x49614a){const _0x336e09=_0x4b87bd,_0x49fc20=Window_BTB_TurnOrder[_0x336e09(0x197)];this[_0x336e09(0x273)]=_0x49fc20[_0x336e09(0x21d)],this[_0x336e09(0x291)]=_0x49614a;},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x36e)]=function(){const _0x2436b6=_0x4b87bd,_0x95a1ea=this[_0x2436b6(0x20a)]();if(!_0x95a1ea)return;if(this[_0x2436b6(0x2f1)]===_0x95a1ea[_0x2436b6(0x1f3)]()&&this[_0x2436b6(0x1ec)]===_0x95a1ea[_0x2436b6(0x18d)]())return;this['_isAlive']=_0x95a1ea[_0x2436b6(0x1f3)](),this[_0x2436b6(0x1ec)]=_0x95a1ea[_0x2436b6(0x18d)]();let _0x1c3b59=this[_0x2436b6(0x2f1)]&&this[_0x2436b6(0x1ec)]?0xff:0x0;this[_0x2436b6(0x1d1)](_0x1c3b59);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['updateOpacity']=function(){const _0x731ec5=_0x4b87bd;if(this[_0x731ec5(0x273)]>0x0){if(_0x731ec5(0x1b5)!==_0x731ec5(0x1b5))return this[_0x731ec5(0x285)]();else{const _0x33bcc4=this[_0x731ec5(0x273)];this[_0x731ec5(0x235)]=(this[_0x731ec5(0x235)]*(_0x33bcc4-0x1)+this[_0x731ec5(0x291)])/_0x33bcc4,this['_fadeDuration']--;if(this['_fadeDuration']<=0x0){if('XdZGE'!==_0x731ec5(0x22a))this['checkPosition'](),this['_positionDuration']=0x0,this[_0x731ec5(0x187)](),this[_0x731ec5(0x235)]=this[_0x731ec5(0x291)];else{_0x1176a7['BattleSystemBTB'][_0x731ec5(0xe9)]['call'](this,_0x2cd5f4);const _0x146f6b=this[_0x731ec5(0x196)](_0x10077f);if(this[_0x731ec5(0x2ff)](_0x146f6b)){const _0x47eaea=this[_0x731ec5(0x20e)](_0x1e4bb7);let _0x1a8960=_0x47eaea['x'],_0x1009cc=_0x47eaea['y'];_0x1a8960+=this['getOffsetX_BTB'](),_0x1009cc+=this[_0x731ec5(0xe8)]();const _0x283972=this[_0x731ec5(0xf4)]();this[_0x731ec5(0x282)](_0x146f6b,_0x1a8960,_0x1009cc,_0x47eaea[_0x731ec5(0x113)],_0x283972);}}}}}if(this[_0x731ec5(0x378)])return;BattleManager[_0x731ec5(0x32c)]===_0x731ec5(0x261)&&(this['_isBattleOver']=!![],this['startFade'](0x0));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4b87bd(0x250)]=function(){const _0x19776b=_0x4b87bd,_0x58e157=this[_0x19776b(0x20a)]();if(!_0x58e157)return;const _0x565b98=Window_BTB_TurnOrder[_0x19776b(0x197)],_0x11ea63=this['_unit']===$gameParty?_0x19776b(0xfd):_0x19776b(0x29b);let _0x36b7e6=_0x58e157[_0x19776b(0x1c1)]();if(_0x58e157['isActor']()&&_0x36b7e6===_0x19776b(0x14b)){if(_0x19776b(0x188)===_0x19776b(0x22b)){if(this[_0x19776b(0x1f0)]())return![];const _0xe00183=_0x4aa055[_0x19776b(0x21e)][_0x19776b(0x197)][_0x19776b(0x1a2)];if(this[_0x19776b(0x148)]()){if(_0xe00183[_0x19776b(0x147)]===_0x292937)return!![];return _0xe00183['ActorActionFusions'];}else{if(_0xe00183['EnemyActionFusions']===_0x5be544)return!![];return _0xe00183[_0x19776b(0x2e2)];}}else _0x36b7e6=_0x19776b(0x1cd);}else _0x58e157[_0x19776b(0x168)]()&&_0x36b7e6===_0x19776b(0x20b)&&(_0x36b7e6=_0x19776b(0x14b));if(this[_0x19776b(0x2ef)]!==_0x36b7e6){if(_0x19776b(0x236)==='HwFed')return this[_0x19776b(0x285)]();else{if(!this[_0x19776b(0x330)])return;const _0x28d4a7=this[_0x19776b(0x20a)]();if(!_0x28d4a7)return;if(this[_0x19776b(0x19a)]===_0x28d4a7[_0x19776b(0x19a)]&&this[_0x19776b(0x1d5)]===_0x28d4a7[_0x19776b(0x1d5)])return;this[_0x19776b(0x19a)]=_0x28d4a7['_letter'],this['_plural']=_0x28d4a7['_plural'];const _0x5e119c=_0x1d3d31['Settings'],_0x264ce9=this['isHorz'](),_0x328608=this['bitmapWidth'](),_0x2a3eef=this[_0x19776b(0x240)](),_0x574b63=this[_0x19776b(0x330)]['bitmap'];_0x574b63[_0x19776b(0x15d)]();if(!this['_plural'])return;_0x574b63[_0x19776b(0x1d6)]=_0x5e119c[_0x19776b(0x2ab)]||_0x4606bd[_0x19776b(0x246)](),_0x574b63[_0x19776b(0xc8)]=_0x5e119c['EnemyBattlerFontSize']||0x10,_0x264ce9?_0x574b63['drawText'](this[_0x19776b(0x19a)][_0x19776b(0x219)](),0x0,_0x2a3eef/0x2,_0x328608,_0x2a3eef/0x2,_0x19776b(0x105)):_0x574b63[_0x19776b(0x1e5)](this['_letter']['trim'](),0x0,0x2,_0x328608-0x8,_0x2a3eef-0x4,_0x19776b(0x2f4));}}switch(this[_0x19776b(0x2ef)]){case _0x19776b(0x1cd):if(this[_0x19776b(0x376)]!==_0x58e157[_0x19776b(0x35f)]())return this[_0x19776b(0x285)]();if(this[_0x19776b(0x2d2)]!==_0x58e157[_0x19776b(0x374)]())return this[_0x19776b(0x285)]();break;case _0x19776b(0x139):if(this[_0x19776b(0x14d)]!==_0x58e157[_0x19776b(0x174)]())return this[_0x19776b(0x285)]();break;case _0x19776b(0x14b):if(_0x58e157['hasSvBattler']()){if('NPCUy'!==_0x19776b(0x2bd)){if(this[_0x19776b(0x337)]!==_0x58e157[_0x19776b(0x288)]())return this[_0x19776b(0x285)]();}else _0x532d83[_0x19776b(0x1d8)]=_0x4b4283['loadSystem'](_0x25e084[_0x1ec0a4]);}else{if(this['_graphicEnemy']!==_0x58e157[_0x19776b(0x2d3)]())return this[_0x19776b(0x285)]();}break;case _0x19776b(0x20b):if(_0x58e157[_0x19776b(0x148)]()){if(this[_0x19776b(0x337)]!==_0x58e157[_0x19776b(0x2d3)]())return this[_0x19776b(0x285)]();}else{if(this[_0x19776b(0x138)]!==_0x58e157[_0x19776b(0x2d3)]())return this[_0x19776b(0x285)]();}break;}},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['processUpdateGraphic']=function(){const _0x3ce028=_0x4b87bd,_0x3eba93=this[_0x3ce028(0x20a)]();if(!_0x3eba93)return;this[_0x3ce028(0x2ef)]=_0x3eba93[_0x3ce028(0x1c1)]();if(_0x3eba93[_0x3ce028(0x148)]()&&this[_0x3ce028(0x2ef)]===_0x3ce028(0x14b))this[_0x3ce028(0x2ef)]=_0x3ce028(0x1cd);else _0x3eba93[_0x3ce028(0x168)]()&&this[_0x3ce028(0x2ef)]===_0x3ce028(0x20b)&&(this[_0x3ce028(0x2ef)]=_0x3ce028(0x14b));let _0x46a807;switch(this[_0x3ce028(0x2ef)]){case _0x3ce028(0x1cd):this[_0x3ce028(0x376)]=_0x3eba93[_0x3ce028(0x35f)](),this[_0x3ce028(0x2d2)]=_0x3eba93[_0x3ce028(0x374)](),_0x46a807=ImageManager[_0x3ce028(0x37a)](this[_0x3ce028(0x376)]),_0x46a807['addLoadListener'](this['changeFaceGraphicBitmap'][_0x3ce028(0x1bb)](this,_0x46a807));break;case _0x3ce028(0x139):this[_0x3ce028(0x14d)]=_0x3eba93[_0x3ce028(0x306)](),_0x46a807=ImageManager[_0x3ce028(0x360)](_0x3ce028(0x195)),_0x46a807[_0x3ce028(0x25f)](this[_0x3ce028(0x153)][_0x3ce028(0x1bb)](this,_0x46a807));break;case _0x3ce028(0x14b):if(_0x3eba93[_0x3ce028(0x220)]())this['_graphicSv']=_0x3eba93[_0x3ce028(0x288)](),_0x46a807=ImageManager[_0x3ce028(0xf0)](this[_0x3ce028(0x337)]),_0x46a807[_0x3ce028(0x25f)](this[_0x3ce028(0x252)]['bind'](this,_0x46a807));else{if($gameSystem[_0x3ce028(0x198)]()){if(_0x3ce028(0x24d)!==_0x3ce028(0x24d)){if(!_0x16d760)return![];if(!_0x7f1f70[_0x3ce028(0x176)]())return![];if(!this[_0x3ce028(0x25a)])return![];if(_0x1dd496['hideBraveTrait']())return![];const _0x2f5088=_0x11f6d3[_0x3ce028(0x21e)]['Settings']['Window'],_0x519915=this[_0x3ce028(0x25a)]();return _0x2f5088['%1_display'[_0x3ce028(0x12c)](_0x519915)];}else this[_0x3ce028(0x138)]=_0x3eba93[_0x3ce028(0x2d3)](),_0x46a807=ImageManager['loadSvEnemy'](this[_0x3ce028(0x138)]),_0x46a807[_0x3ce028(0x25f)](this[_0x3ce028(0x29c)][_0x3ce028(0x1bb)](this,_0x46a807));}else'wZAnP'==='wZAnP'?(this[_0x3ce028(0x138)]=_0x3eba93[_0x3ce028(0x2d3)](),_0x46a807=ImageManager[_0x3ce028(0x283)](this[_0x3ce028(0x138)]),_0x46a807[_0x3ce028(0x25f)](this[_0x3ce028(0x29c)][_0x3ce028(0x1bb)](this,_0x46a807))):this[_0x3ce028(0x364)](-_0x3d834a);}break;case'svactor':this['_graphicSv']=_0x3eba93[_0x3ce028(0x2d3)](),_0x46a807=ImageManager[_0x3ce028(0xf0)](this['_graphicSv']),_0x46a807[_0x3ce028(0x25f)](this['changeSvActorGraphicBitmap'][_0x3ce028(0x1bb)](this,_0x46a807));break;}},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['changeFaceGraphicBitmap']=function(_0x5ccb08){const _0x28a52b=_0x4b87bd,_0x7cfab2=this[_0x28a52b(0x2d2)],_0x4076b4=this[_0x28a52b(0xe2)](),_0xa05399=this['bitmapHeight'](),_0x1e9b31=Math['max'](_0x4076b4,_0xa05399);this['_graphicSprite']['bitmap']=new Bitmap(_0x4076b4,_0xa05399);const _0x4412c4=this[_0x28a52b(0x179)][_0x28a52b(0x1d8)],_0x12c9df=ImageManager[_0x28a52b(0xcd)],_0x1ef691=ImageManager[_0x28a52b(0x2b3)],_0x1385f3=_0x1e9b31/Math[_0x28a52b(0x2d9)](_0x12c9df,_0x1ef691),_0x14f2bf=ImageManager[_0x28a52b(0xcd)],_0x5e4091=ImageManager['faceHeight'],_0x2a638d=_0x7cfab2%0x4*_0x12c9df+(_0x12c9df-_0x14f2bf)/0x2,_0x7ee70a=Math[_0x28a52b(0x114)](_0x7cfab2/0x4)*_0x1ef691+(_0x1ef691-_0x5e4091)/0x2,_0x218582=(_0x4076b4-_0x12c9df*_0x1385f3)/0x2,_0x39d4f2=(_0xa05399-_0x1ef691*_0x1385f3)/0x2;_0x4412c4[_0x28a52b(0x10a)](_0x5ccb08,_0x2a638d,_0x7ee70a,_0x14f2bf,_0x5e4091,_0x218582,_0x39d4f2,_0x1e9b31,_0x1e9b31);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x153)]=function(_0x221b8a){const _0x1f3caf=_0x4b87bd,_0x3bdff4=this['_graphicIconIndex'],_0x775cf=this[_0x1f3caf(0xe2)](),_0x4ed8cd=this[_0x1f3caf(0x240)]();this['_graphicSprite']['bitmap']=new Bitmap(_0x775cf,_0x4ed8cd);const _0x1180eb=this[_0x1f3caf(0x179)][_0x1f3caf(0x1d8)],_0x424dd9=ImageManager[_0x1f3caf(0x132)],_0x5980c5=ImageManager[_0x1f3caf(0x17c)],_0x848d26=Math[_0x1f3caf(0x1c4)](_0x424dd9,_0x5980c5,_0x775cf,_0x4ed8cd),_0x4792e0=_0x3bdff4%0x10*_0x424dd9,_0x58131e=Math[_0x1f3caf(0x114)](_0x3bdff4/0x10)*_0x5980c5,_0x381a48=Math[_0x1f3caf(0x114)](Math[_0x1f3caf(0x2d9)](_0x775cf-_0x848d26,0x0)/0x2),_0x40b46b=Math[_0x1f3caf(0x114)](Math[_0x1f3caf(0x2d9)](_0x4ed8cd-_0x848d26,0x0)/0x2);_0x1180eb[_0x1f3caf(0x10a)](_0x221b8a,_0x4792e0,_0x58131e,_0x424dd9,_0x5980c5,_0x381a48,_0x40b46b,_0x848d26,_0x848d26);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x252)]=function(_0x3bd3cc){const _0x725ea8=_0x4b87bd,_0x1e4016=this['bitmapWidth'](),_0x1a788b=this['bitmapHeight'](),_0x2398dc=Math[_0x725ea8(0x1c4)](_0x1e4016,_0x1a788b);this['_graphicSprite']['bitmap']=new Bitmap(_0x1e4016,_0x1a788b);const _0x1b5c37=this[_0x725ea8(0x179)][_0x725ea8(0x1d8)],_0x380bf3=this[_0x725ea8(0x337)]['match'](/\$/i),_0x46c1fe=_0x380bf3?0x1:ImageManager[_0x725ea8(0x14e)],_0x28753f=_0x380bf3?0x1:ImageManager[_0x725ea8(0x1f4)],_0x29d7ef=_0x3bd3cc[_0x725ea8(0x113)]/_0x46c1fe,_0x4c7a68=_0x3bd3cc[_0x725ea8(0x35e)]/_0x28753f,_0xe969e5=Math['min'](0x1,_0x2398dc/_0x29d7ef,_0x2398dc/_0x4c7a68),_0x1ccc8e=_0x29d7ef*_0xe969e5,_0x5cf9fc=_0x4c7a68*_0xe969e5,_0x147fa7=Math[_0x725ea8(0x1d7)]((_0x1e4016-_0x1ccc8e)/0x2),_0x1e8591=Math[_0x725ea8(0x1d7)]((_0x1a788b-_0x5cf9fc)/0x2);_0x1b5c37[_0x725ea8(0x10a)](_0x3bd3cc,0x0,0x0,_0x29d7ef,_0x4c7a68,_0x147fa7,_0x1e8591,_0x1ccc8e,_0x5cf9fc);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x29c)]=function(_0xc14bb5){const _0xcf2d7c=_0x4b87bd,_0x1b56ba=Window_BTB_TurnOrder[_0xcf2d7c(0x197)],_0x15b98b=this[_0xcf2d7c(0xe2)](),_0x41eee8=this[_0xcf2d7c(0x240)](),_0x3ce3cf=Math[_0xcf2d7c(0x1c4)](_0x15b98b,_0x41eee8);this[_0xcf2d7c(0x179)]['bitmap']=new Bitmap(_0x15b98b,_0x41eee8);const _0x5705ec=this['_graphicSprite'][_0xcf2d7c(0x1d8)],_0x5e9444=Math[_0xcf2d7c(0x1c4)](0x1,_0x3ce3cf/_0xc14bb5[_0xcf2d7c(0x113)],_0x3ce3cf/_0xc14bb5[_0xcf2d7c(0x35e)]),_0x2a4b6e=_0xc14bb5[_0xcf2d7c(0x113)]*_0x5e9444,_0x2515b5=_0xc14bb5[_0xcf2d7c(0x35e)]*_0x5e9444,_0x6cdabc=Math['round']((_0x15b98b-_0x2a4b6e)/0x2),_0x33c3b1=Math['round']((_0x41eee8-_0x2515b5)/0x2);_0x5705ec[_0xcf2d7c(0x10a)](_0xc14bb5,0x0,0x0,_0xc14bb5[_0xcf2d7c(0x113)],_0xc14bb5[_0xcf2d7c(0x35e)],_0x6cdabc,_0x33c3b1,_0x2a4b6e,_0x2515b5);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)][_0x4b87bd(0x348)]=function(){const _0x58d501=_0x4b87bd,_0x33c8b8=this[_0x58d501(0x20a)]();if(!_0x33c8b8)return;if(!_0x33c8b8[_0x58d501(0x168)]())return;if(this[_0x58d501(0x367)]===_0x33c8b8[_0x58d501(0x212)]())return;this[_0x58d501(0x367)]=_0x33c8b8[_0x58d501(0x212)](),this[_0x58d501(0x179)]['setHue'](_0x33c8b8[_0x58d501(0x220)]()?0x0:this[_0x58d501(0x367)]);},Sprite_BTB_TurnOrder_Battler[_0x4b87bd(0x1ca)]['updateLetter']=function(){const _0x4a769f=_0x4b87bd;if(!this[_0x4a769f(0x330)])return;const _0x530407=this[_0x4a769f(0x20a)]();if(!_0x530407)return;if(this['_letter']===_0x530407[_0x4a769f(0x19a)]&&this['_plural']===_0x530407['_plural'])return;this['_letter']=_0x530407[_0x4a769f(0x19a)],this[_0x4a769f(0x1d5)]=_0x530407[_0x4a769f(0x1d5)];const _0x316bfb=Window_BTB_TurnOrder[_0x4a769f(0x197)],_0x76f254=this[_0x4a769f(0x173)](),_0x35f0e8=this[_0x4a769f(0xe2)](),_0x138f89=this['bitmapHeight'](),_0x5fce14=this[_0x4a769f(0x330)][_0x4a769f(0x1d8)];_0x5fce14[_0x4a769f(0x15d)]();if(!this[_0x4a769f(0x1d5)])return;_0x5fce14[_0x4a769f(0x1d6)]=_0x316bfb['EnemyBattlerFontFace']||$gameSystem[_0x4a769f(0x246)](),_0x5fce14[_0x4a769f(0xc8)]=_0x316bfb['EnemyBattlerFontSize']||0x10;if(_0x76f254){if(_0x4a769f(0x13f)===_0x4a769f(0x13f))_0x5fce14[_0x4a769f(0x1e5)](this[_0x4a769f(0x19a)][_0x4a769f(0x219)](),0x0,_0x138f89/0x2,_0x35f0e8,_0x138f89/0x2,'center');else return _0x258498[_0x4a769f(0x21e)]['Settings'][_0x4a769f(0x1a2)][_0x4a769f(0x317)][_0x4a769f(0x284)](this);}else _0x5fce14[_0x4a769f(0x1e5)](this[_0x4a769f(0x19a)][_0x4a769f(0x219)](),0x0,0x2,_0x35f0e8-0x8,_0x138f89-0x4,_0x4a769f(0x2f4));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x4b87bd(0x104)]=function(){const _0x16aa36=_0x4b87bd,_0x47a67b=this['battler']();if(!_0x47a67b)return;const _0x50d489=_0x47a67b['battler']();if(!_0x50d489)return;const _0x2d3420=_0x50d489[_0x16aa36(0xd5)]();if(!_0x2d3420)return;this[_0x16aa36(0xc9)](_0x2d3420['_blendColor']);},Sprite_BTB_TurnOrder_Battler['prototype']['getStateTooltipBattler']=function(){const _0x3ad263=_0x4b87bd;return this[_0x3ad263(0x20a)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x255)]=Window_Base[_0x4b87bd(0x1ca)]['makeAdditionalSkillCostText'],Window_Base[_0x4b87bd(0x1ca)][_0x4b87bd(0x194)]=function(_0x1e21cc,_0xff1729,_0x554f03){const _0x25d9a1=_0x4b87bd;return _0x554f03=VisuMZ[_0x25d9a1(0x21e)][_0x25d9a1(0x255)][_0x25d9a1(0x284)](this,_0x1e21cc,_0xff1729,_0x554f03),_0x554f03=this['makeAdditionalCostTextBTB'](_0x1e21cc,_0xff1729,_0x554f03),_0x554f03;},VisuMZ['BattleSystemBTB']['Window_Base_drawItemNumber']=Window_Base[_0x4b87bd(0x1ca)][_0x4b87bd(0x1dd)],Window_Base[_0x4b87bd(0x1ca)]['drawItemNumber']=function(_0x49ce75,_0x4ed214,_0x403dc7,_0x40958d){const _0x33a094=_0x4b87bd;BattleManager[_0x33a094(0x176)]()&&this['constructor']===Window_BattleItem?this['drawItemNumberBTB'](_0x49ce75,_0x4ed214,_0x403dc7,_0x40958d):VisuMZ[_0x33a094(0x21e)][_0x33a094(0xf8)][_0x33a094(0x284)](this,_0x49ce75,_0x4ed214,_0x403dc7,_0x40958d),this[_0x33a094(0x2ad)]();},Window_Base['prototype']['drawItemNumberBTB']=function(_0x21969d,_0x52e7e2,_0x5a4fe8,_0x4f94f6){const _0x22d2bf=_0x4b87bd,_0x10901f=VisuMZ[_0x22d2bf(0x21e)][_0x22d2bf(0x197)][_0x22d2bf(0x234)],_0x472e60=BattleManager['_actor']||$gameParty[_0x22d2bf(0x2d0)]()[0x0],_0x156ac1=this[_0x22d2bf(0x155)](_0x472e60,_0x21969d,''),_0x5879a9=this[_0x22d2bf(0x1b4)](_0x156ac1)[_0x22d2bf(0x113)],_0x37b4bd=_0x10901f[_0x22d2bf(0x23e)];let _0x323033=_0x52e7e2+_0x4f94f6-_0x5879a9;if(_0x156ac1==='')VisuMZ['BattleSystemBTB']['Window_Base_drawItemNumber'][_0x22d2bf(0x284)](this,_0x21969d,_0x52e7e2,_0x5a4fe8,_0x4f94f6);else{if(this[_0x22d2bf(0x2da)](_0x21969d)){this[_0x22d2bf(0x2ad)]();const _0xcf2860=VisuMZ[_0x22d2bf(0x27b)]['Settings'][_0x22d2bf(0x2f7)];this[_0x22d2bf(0x2aa)][_0x22d2bf(0xc8)]=_0xcf2860[_0x22d2bf(0x33d)];if(_0x37b4bd){const _0x1aed75=_0xcf2860[_0x22d2bf(0xc2)],_0x2300c3=_0x1aed75['format']($gameParty[_0x22d2bf(0x2c4)](_0x21969d)),_0x59a840=this[_0x22d2bf(0x290)](_0x2300c3+this[_0x22d2bf(0xd1)]());_0x323033-=_0x59a840;}else _0x4f94f6-=this[_0x22d2bf(0x290)](this[_0x22d2bf(0xd1)]())+_0x5879a9;VisuMZ['BattleSystemBTB'][_0x22d2bf(0xf8)][_0x22d2bf(0x284)](this,_0x21969d,_0x52e7e2,_0x5a4fe8,_0x4f94f6);}}this[_0x22d2bf(0x329)](_0x156ac1,_0x323033,_0x5a4fe8);},Window_Base[_0x4b87bd(0x1ca)][_0x4b87bd(0x155)]=function(_0x2c732f,_0x54c25a,_0x462433){const _0x5f50d0=_0x4b87bd;if(!BattleManager[_0x5f50d0(0x176)]())return _0x462433;if(!_0x2c732f)return _0x462433;if(!_0x54c25a)return _0x462433;if(_0x54c25a[_0x5f50d0(0xe1)][_0x5f50d0(0x149)](VisuMZ[_0x5f50d0(0x21e)][_0x5f50d0(0xf9)][_0x5f50d0(0x244)]))return _0x462433;let _0x67cc7e=_0x2c732f['bravePointsCost'](_0x54c25a);const _0x63d533=VisuMZ[_0x5f50d0(0x21e)][_0x5f50d0(0x197)][_0x5f50d0(0x234)],_0x3f5f2b=_0x63d533[_0x5f50d0(0x23e)],_0xa0d489=_0x63d533[_0x5f50d0(0x185)],_0x4f7909=_0x63d533['ShowCostForGuard'],_0x30329a=_0x63d533[_0x5f50d0(0x1ad)]||0x0,_0x1ba7bd=_0x63d533[_0x5f50d0(0x332)],_0x2b6d56=_0x63d533[_0x5f50d0(0x15a)];if(DataManager['isSkill'](_0x54c25a)&&this[_0x5f50d0(0x17b)]===Window_ActorCommand){if(!_0xa0d489&&_0x54c25a['id']===_0x2c732f[_0x5f50d0(0x1a4)]())return _0x462433;if(!_0x4f7909&&_0x54c25a['id']===_0x2c732f['guardSkillId']())return _0x462433;}_0x67cc7e-=_0x30329a;if(_0x67cc7e<0x0)return _0x462433;if(!_0x1ba7bd&&_0x67cc7e===0x0)return _0x462433;if(!_0x2b6d56&&_0x67cc7e===0x1)return _0x462433;const _0x6c4559=_0x5f50d0(0x1fc)['format'](ImageManager[_0x5f50d0(0x2b7)]),_0x1e21ad=TextManager[_0x5f50d0(0x28a)];let _0x2d4aae=TextManager['btbCostFormat']['format'](_0x67cc7e,_0x1e21ad,_0x6c4559);if(_0x462433==='')_0x5f50d0(0x366)===_0x5f50d0(0x11b)?_0x22b169-=_0x24fd5f*_0x481f05['SpriteThin']:_0x462433+=_0x2d4aae;else _0x3f5f2b?_0x462433=_0x2d4aae+this['skillCostSeparator']()+_0x462433:'hEipo'!==_0x5f50d0(0x178)?this[_0x5f50d0(0x14a)]()[_0x5f50d0(0xce)](_0x4258d0):_0x462433=_0x462433+this[_0x5f50d0(0xd1)]()+_0x2d4aae;return _0x462433;},Window_Selectable[_0x4b87bd(0x1ca)][_0x4b87bd(0x253)]=function(){return![];},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x37e)]=Window_Selectable[_0x4b87bd(0x1ca)][_0x4b87bd(0x249)],Window_Selectable['prototype']['select']=function(_0x247088){const _0x36bc97=_0x4b87bd;VisuMZ[_0x36bc97(0x21e)][_0x36bc97(0x37e)]['call'](this,_0x247088),this[_0x36bc97(0x253)]()&&this[_0x36bc97(0x1f9)]&&('wsnSz'==='wsnSz'?this[_0x36bc97(0x289)]():(_0x189c45['BattleSystemBTB'][_0x36bc97(0x359)][_0x36bc97(0x284)](this),this[_0x36bc97(0x241)]()));},Window_Selectable[_0x4b87bd(0x1ca)]['applyBattleItemWindowBTB']=function(){const _0x2ebd76=_0x4b87bd;BattleManager[_0x2ebd76(0xed)]();},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x331)]=Window_Help[_0x4b87bd(0x1ca)][_0x4b87bd(0x11a)],Window_Help[_0x4b87bd(0x1ca)][_0x4b87bd(0x11a)]=function(_0x1e69b8){const _0x3b78f5=_0x4b87bd;if(BattleManager[_0x3b78f5(0x176)]()&&_0x1e69b8&&_0x1e69b8[_0x3b78f5(0xe1)]&&_0x1e69b8[_0x3b78f5(0xe1)][_0x3b78f5(0x149)](VisuMZ['BattleSystemBTB'][_0x3b78f5(0xf9)][_0x3b78f5(0x1f7)]))'ypZdk'!==_0x3b78f5(0x110)?this[_0x3b78f5(0x35a)](String(RegExp['$1'])):this[_0x3b78f5(0x35a)](_0x5567c2(_0x11f2d5['$1']));else{if(_0x3b78f5(0x26d)!=='AXJdl')return _0x37087b[_0x3b78f5(0x176)]()?_0x4a6848[_0x3b78f5(0x21e)][_0x3b78f5(0x197)]['Mechanics']['CalcActionSpeedJS'][_0x3b78f5(0x284)](this):_0x5f0156[_0x3b78f5(0x21e)][_0x3b78f5(0x180)]['call'](this);else VisuMZ[_0x3b78f5(0x21e)][_0x3b78f5(0x331)][_0x3b78f5(0x284)](this,_0x1e69b8);}},VisuMZ['BattleSystemBTB'][_0x4b87bd(0x161)]=Window_BattleLog['prototype'][_0x4b87bd(0xd8)],Window_BattleLog[_0x4b87bd(0x1ca)][_0x4b87bd(0xd8)]=function(_0x1a8fe7,_0x1fa15e,_0x2549fe){const _0x20a7ac=_0x4b87bd;this[_0x20a7ac(0x223)](_0x1a8fe7)?this[_0x20a7ac(0x1ea)](_0x1a8fe7,_0x1fa15e,_0x2549fe):'lEkOI'==='ZNDnJ'?_0x1f6f8e[_0x20a7ac(0x167)](_0x1ca2a4[_0x20a7ac(0x2ea)](_0x5bbfad)):VisuMZ['BattleSystemBTB'][_0x20a7ac(0x161)][_0x20a7ac(0x284)](this,_0x1a8fe7,_0x1fa15e,_0x2549fe);},Window_BattleLog[_0x4b87bd(0x1ca)][_0x4b87bd(0x141)]=function(_0x5369ca,_0x56c279,_0x2e4dd4){const _0x1c645d=_0x4b87bd;VisuMZ['BattleSystemBTB'][_0x1c645d(0x161)][_0x1c645d(0x284)](this,_0x5369ca,_0x56c279,_0x2e4dd4);},Window_BattleLog[_0x4b87bd(0x1ca)][_0x4b87bd(0x223)]=function(_0x320078){const _0x2e14be=_0x4b87bd;if(!BattleManager['isBTB']())return![];if(!_0x320078)return![];if(!_0x320078[_0x2e14be(0x168)]())return![];if(_0x320078[_0x2e14be(0x102)])return![];const _0x57cee2=VisuMZ[_0x2e14be(0x21e)]['Settings'][_0x2e14be(0x275)];if(!_0x57cee2[_0x2e14be(0x257)])return![];if(_0x57cee2[_0x2e14be(0x2b9)]<=0x0)return![];return VisuMZ['BattleSystemBTB'][_0x2e14be(0x197)][_0x2e14be(0x275)][_0x2e14be(0x257)];},Window_BattleLog[_0x4b87bd(0x1ca)][_0x4b87bd(0x1ea)]=function(_0x462b14,_0x1e0e8c,_0x89264d){const _0x1fc208=_0x4b87bd;_0x462b14['_braveStartupAnimation']=!![];let _0x2b6f0c=_0x462b14[_0x1fc208(0x2be)]();const _0x2d7077=VisuMZ[_0x1fc208(0x21e)][_0x1fc208(0x197)]['BraveAnimation'],_0x307e84=_0x2d7077[_0x1fc208(0x2b9)],_0x5aefcd=_0x2d7077[_0x1fc208(0x121)];while(_0x2b6f0c--){if(_0x1fc208(0x200)===_0x1fc208(0xfe)){if(!_0x3085b8[_0x1fc208(0x176)]())return![];if(!_0x48260b)return![];if(!_0x1dde14[_0x1fc208(0x168)]())return![];if(_0xd0842d['_braveStartupAnimation'])return![];const _0x185d88=_0x14aff2[_0x1fc208(0x21e)][_0x1fc208(0x197)]['BraveAnimation'];if(!_0x185d88[_0x1fc208(0x257)])return![];if(_0x185d88['BraveAnimationID']<=0x0)return![];return _0x4a2ee1[_0x1fc208(0x21e)][_0x1fc208(0x197)][_0x1fc208(0x275)][_0x1fc208(0x257)];}else{this[_0x1fc208(0x167)]('showNormalAnimation',[_0x462b14],_0x307e84);if(_0x2b6f0c>0x0){if('Gdfhq'===_0x1fc208(0x115))this['push'](_0x1fc208(0x26a),_0x5aefcd);else{const _0x4e30d2=this[_0x1fc208(0x2a0)]();if(!_0x4e30d2)return;let _0x723efe=![];if(this['_containerWidth']!==_0x4e30d2[_0x1fc208(0x113)])_0x723efe=!![];else this['_containerHeight']!==_0x4e30d2[_0x1fc208(0x35e)]&&(_0x723efe=!![]);_0x723efe&&this[_0x1fc208(0xee)]();}}else this[_0x1fc208(0x167)]('waitForAnimation');}}this[_0x1fc208(0x167)](_0x1fc208(0x141),_0x462b14,_0x1e0e8c,_0x89264d);},VisuMZ[_0x4b87bd(0x21e)]['Window_ActorCommand_addGuardCommand']=Window_ActorCommand[_0x4b87bd(0x1ca)]['addGuardCommand'],Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0x18e)]=function(){const _0x10243f=_0x4b87bd;this[_0x10243f(0x365)](),VisuMZ[_0x10243f(0x21e)][_0x10243f(0x21a)]['call'](this);},Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0x365)]=function(){const _0x4d0cd5=_0x4b87bd;if(!this[_0x4d0cd5(0x1a8)]())return;const _0x32aad7=this[_0x4d0cd5(0xdf)](),_0x437acb=TextManager[_0x4d0cd5(0x11e)],_0x1003d1=ImageManager[_0x4d0cd5(0x2b7)],_0x5a7679=_0x32aad7==='text'?_0x437acb:_0x4d0cd5(0x243)[_0x4d0cd5(0x12c)](_0x1003d1,_0x437acb);this[_0x4d0cd5(0x1de)](_0x5a7679,_0x4d0cd5(0x2c9),this[_0x4d0cd5(0x12f)][_0x4d0cd5(0x1be)]()),BattleManager[_0x4d0cd5(0x2fc)]();},Window_ActorCommand['prototype'][_0x4b87bd(0x1a8)]=function(){const _0x54b8a1=_0x4b87bd;if(!BattleManager['isBTB']())return![];if(!VisuMZ[_0x54b8a1(0x21e)]['Settings'][_0x54b8a1(0x131)]['ShowCommand'])return![];if(this['_actor']&&this[_0x54b8a1(0x12f)]['hideBraveTrait']())return![];return!![];},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x143)]=Window_Selectable[_0x4b87bd(0x1ca)][_0x4b87bd(0x108)],Window_Selectable[_0x4b87bd(0x1ca)]['cursorPagedown']=function(){const _0x55598a=_0x4b87bd;if(this['isUsePageUpDnShortcutBTB']()){if(_0x55598a(0x27c)===_0x55598a(0x27c)){if(this['_actor']&&!this[_0x55598a(0x12f)][_0x55598a(0x1fa)]()&&this[_0x55598a(0x12f)][_0x55598a(0x1be)]()){if(_0x55598a(0x123)!==_0x55598a(0x2ee))SceneManager[_0x55598a(0x15e)]['performBrave']();else{const _0x454320=_0x5a854a[_0x55598a(0x196)]();if(!_0x454320)return;_0x454320['cancelBrave']();const _0x8f1d39=this[_0x55598a(0x325)][_0x55598a(0x2f5)],_0x3a95e4=this[_0x55598a(0x325)][_0x55598a(0x281)],_0x65cb8=this[_0x55598a(0x325)]['index']();this[_0x55598a(0x325)][_0x55598a(0x375)](_0x454320),this['_actorCommandWindow'][_0x55598a(0x249)](_0x65cb8),this[_0x55598a(0x325)]['_scrollX']=_0x8f1d39,this[_0x55598a(0x325)][_0x55598a(0x281)]=_0x3a95e4;}}}else this[_0x55598a(0x262)]();}else VisuMZ[_0x55598a(0x21e)][_0x55598a(0x143)][_0x55598a(0x284)](this);},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x103)]=Window_Selectable['prototype']['cursorPageup'],Window_Selectable['prototype'][_0x4b87bd(0x172)]=function(){const _0x346321=_0x4b87bd;this['isUsePageUpDnShortcutBTB']()?this[_0x346321(0x12f)]&&!this[_0x346321(0x12f)][_0x346321(0x1fa)]()&&this[_0x346321(0x12f)][_0x346321(0x31c)]()>0x1&&SceneManager['_scene'][_0x346321(0x205)]():VisuMZ[_0x346321(0x21e)][_0x346321(0x103)]['call'](this);},Window_Selectable['prototype']['isUsePageUpDnShortcutBTB']=function(){const _0x8ec80f=_0x4b87bd;if(this['constructor']!==Window_ActorCommand)return![];if(!SceneManager[_0x8ec80f(0x29e)]())return![];if(!BattleManager[_0x8ec80f(0x176)]())return![];return VisuMZ[_0x8ec80f(0x21e)][_0x8ec80f(0x197)][_0x8ec80f(0x131)][_0x8ec80f(0x13b)];},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x359)]=Window_ActorCommand['prototype'][_0x4b87bd(0xef)],Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0xef)]=function(){const _0x3578c0=_0x4b87bd;VisuMZ[_0x3578c0(0x21e)][_0x3578c0(0x359)][_0x3578c0(0x284)](this),this[_0x3578c0(0x241)]();},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x24a)]=Window_Base[_0x4b87bd(0x1ca)][_0x4b87bd(0x27a)],Window_Base['prototype'][_0x4b87bd(0x27a)]=function(){const _0xafec95=_0x4b87bd;VisuMZ['BattleSystemBTB']['Window_Base_close']['call'](this),SceneManager[_0xafec95(0x29e)]()&&this['destroyBTBActionCounters']&&this['destroyBTBActionCounters']();},Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0x2b4)]=function(){const _0x2fb66c=_0x4b87bd;if(!this['_btbActionSprite'])return;this[_0x2fb66c(0x13a)][_0x2fb66c(0x1d8)]&&this[_0x2fb66c(0x13a)]['bitmap']['destroy'](),this[_0x2fb66c(0xde)](this[_0x2fb66c(0x13a)]),delete this[_0x2fb66c(0x13a)];},Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0x241)]=function(){const _0x51c511=_0x4b87bd;if(!BattleManager[_0x51c511(0x176)]())return;if(!this[_0x51c511(0x12f)])return;this[_0x51c511(0x2b4)]();if(this[_0x51c511(0x12f)]['hideBraveTrait']())return;this['_btbActionSprite']=new Sprite(),this['addChild'](this[_0x51c511(0x13a)]),this[_0x51c511(0x2f0)]();},Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0x2f0)]=function(){const _0x3c3cb0=_0x4b87bd,_0x1dcf9c=VisuMZ[_0x3c3cb0(0x21e)][_0x3c3cb0(0x197)]['Window'][_0x3c3cb0(0x340)];_0x1dcf9c?'HPZgk'!=='FfwTT'?_0x1dcf9c['call'](this,this['_btbActionSprite'],this,this[_0x3c3cb0(0x12f)]):(this[_0x3c3cb0(0x138)]=_0x4e5dc1[_0x3c3cb0(0x2d3)](),_0x57e965=_0x3a7f4e['loadSvEnemy'](this[_0x3c3cb0(0x138)]),_0x130128[_0x3c3cb0(0x25f)](this['changeEnemyGraphicBitmap'][_0x3c3cb0(0x1bb)](this,_0x2bc98e))):this[_0x3c3cb0(0x368)][_0x3c3cb0(0x284)](this,this[_0x3c3cb0(0x13a)],this,this[_0x3c3cb0(0x12f)]);},Window_ActorCommand[_0x4b87bd(0x1ca)][_0x4b87bd(0x368)]=function(){const _0x9d297a=_0x4b87bd,_0x58cb71=arguments[0x0],_0x247701=arguments[0x1],_0x187600=arguments[0x2];_0x58cb71['x']=Math[_0x9d297a(0x1d7)](_0x247701['width']/0x2),_0x58cb71['y']=0x0,_0x58cb71[_0x9d297a(0x260)]['x']=0.5,_0x58cb71[_0x9d297a(0x260)]['y']=0.5;const _0x2f28dd=TextManager[_0x9d297a(0x182)],_0x142f23=TextManager[_0x9d297a(0xda)];let _0x1a586f=_0x2f28dd[_0x9d297a(0x154)](_0x187600['numActions']());const _0x180d23=_0x187600[_0x9d297a(0x2db)];_0x1a586f=_0x1a586f[_0x9d297a(0xe6)](0x0,_0x180d23)+_0x142f23+_0x1a586f['substring'](_0x180d23+0x1);const _0x5d2db9=new Bitmap(_0x247701[_0x9d297a(0x113)],_0x247701[_0x9d297a(0x11d)]());_0x5d2db9['fontSize']=0x24,_0x5d2db9[_0x9d297a(0x1e5)](_0x1a586f,0x0,0x0,_0x5d2db9['width'],_0x5d2db9['height'],_0x9d297a(0x105)),_0x58cb71[_0x9d297a(0x1d8)]=_0x5d2db9;},Window_ActorCommand[_0x4b87bd(0x1ca)]['isBattleItemWindowBTB']=function(){const _0x494424=_0x4b87bd;return BattleManager[_0x494424(0x176)]();},Window_ActorCommand['prototype'][_0x4b87bd(0x289)]=function(){const _0x37efd9=_0x4b87bd,_0x9f682=BattleManager[_0x37efd9(0x1b2)]();if(_0x9f682){const _0x596b77=this[_0x37efd9(0x307)]();switch(_0x596b77){case _0x37efd9(0x344):_0x9f682[_0x37efd9(0x2f3)]();break;case _0x37efd9(0x1ce):_0x9f682['setGuard']();break;case _0x37efd9(0x136):_0x9f682['setSkill'](this[_0x37efd9(0x17f)]());break;default:_0x9f682[_0x37efd9(0xce)](null);break;}}Window_Command[_0x37efd9(0x1ca)][_0x37efd9(0x289)][_0x37efd9(0x284)](this);},Window_Base[_0x4b87bd(0x1ca)]['drawActorBravePoints']=function(_0x59815c,_0x207f5f,_0x2119ba,_0x52d001,_0x90239d){const _0x5e303c=_0x4b87bd;if(!_0x59815c)return;if(!BattleManager['isBTB']())return;const _0x2b1c65=VisuMZ[_0x5e303c(0x21e)][_0x5e303c(0x197)][_0x5e303c(0x131)],_0x22709a=BattleManager[_0x5e303c(0x2e5)]()?_0x2b1c65['StatusPredictFmt']:_0x2b1c65[_0x5e303c(0x1d3)],_0x2dd3fb=_0x2b1c65['NeutralColor'],_0x5ebf91=_0x2b1c65[_0x5e303c(0x24b)],_0x3e2277=_0x2b1c65[_0x5e303c(0x1a7)];let _0x3035f4=0x0,_0x3af850=0x0;_0x3af850=_0x59815c[_0x5e303c(0x201)]();if(_0x3af850>0x0)_0x3035f4=_0x5ebf91;if(_0x3af850===0x0)_0x3035f4=_0x2dd3fb;if(_0x3af850<0x0)_0x3035f4=_0x3e2277;const _0x4b6dcc=_0x5e303c(0x165)['format'](_0x3035f4,_0x3af850),_0x15a6f5='\x5cI[%1]'['format'](ImageManager['btbBravePointsIcon']);_0x3af850=_0x59815c[_0x5e303c(0xdb)]();if(_0x3af850>0x0)_0x3035f4=_0x5ebf91;if(_0x3af850===0x0)_0x3035f4=_0x2dd3fb;if(_0x3af850<0x0){if(_0x5e303c(0x373)!=='mfNiE')return _0x100d7a[_0x5e303c(0xd9)]()===_0x5e303c(0xe4);else _0x3035f4=_0x3e2277;}const _0x5bc80e=_0x5e303c(0x165)['format'](_0x3035f4,_0x3af850);let _0x581e16=_0x22709a[_0x5e303c(0x12c)](_0x4b6dcc,TextManager['btbBravePointsAbbr'],_0x15a6f5,_0x5bc80e);const _0x17281d=this['textSizeEx'](_0x581e16)[_0x5e303c(0x113)];if(_0x90239d===_0x5e303c(0x105))_0x207f5f+=Math[_0x5e303c(0x1d7)]((_0x52d001-_0x17281d)/0x2);else _0x90239d==='right'&&(_0x207f5f+=Math[_0x5e303c(0x1d7)](_0x52d001-_0x17281d));this[_0x5e303c(0x329)](_0x581e16,_0x207f5f,_0x2119ba,_0x52d001);},Window_StatusBase[_0x4b87bd(0x1ca)][_0x4b87bd(0x2ff)]=function(_0x5e1476){const _0x43ed6f=_0x4b87bd;if(!_0x5e1476)return![];if(!BattleManager[_0x43ed6f(0x176)]())return![];if(!this[_0x43ed6f(0x25a)])return![];if(_0x5e1476[_0x43ed6f(0x1fa)]())return![];const _0x5bcf6e=VisuMZ[_0x43ed6f(0x21e)][_0x43ed6f(0x197)][_0x43ed6f(0x131)],_0x5335af=this[_0x43ed6f(0x25a)]();return _0x5bcf6e[_0x43ed6f(0x209)[_0x43ed6f(0x12c)](_0x5335af)];},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x2ac)]=Window_BattleStatus[_0x4b87bd(0x1ca)]['drawItemStatusListStyle'],Window_BattleStatus[_0x4b87bd(0x1ca)][_0x4b87bd(0xf3)]=function(_0x2b7c5c){const _0x356196=_0x4b87bd;VisuMZ[_0x356196(0x21e)]['Window_BattleStatus_drawItemStatusListStyle'][_0x356196(0x284)](this,_0x2b7c5c);const _0x2bfab8=this[_0x356196(0x196)](_0x2b7c5c);if(this[_0x356196(0x2ff)](_0x2bfab8)){const _0xa4a8c=this[_0x356196(0x342)](_0x2b7c5c),_0x1faab5=$dataSystem[_0x356196(0x301)]?0x4:0x3,_0xb2b4f0=_0x1faab5*0x80+(_0x1faab5-0x1)*0x8+0x4;let _0x36e158=_0xa4a8c['x']+this[_0x356196(0x36d)];if(VisuMZ['BattleCore'][_0x356196(0x197)][_0x356196(0x10b)]['ShowFacesListStyle']){if(_0x356196(0x247)===_0x356196(0x247))_0x36e158=_0xa4a8c['x']+ImageManager[_0x356196(0xcd)]+0x8;else{if(this[_0x356196(0x1a1)]===_0x1473c8)return[];return this['_actionFusionRecipe'][_0x356196(0x1c8)]('-')[_0x356196(0x32f)](_0x18ec68=>_0x1de71e[_0x2cefbb(_0x18ec68)]);}}else _0x36e158+=ImageManager[_0x356196(0x132)];const _0x3a3cb9=Math[_0x356196(0x1d7)](Math['min'](_0xa4a8c['x']+_0xa4a8c[_0x356196(0x113)]-_0xb2b4f0,_0x36e158));let _0x3e6488=_0x3a3cb9+0x88,_0x4a9f96=_0xa4a8c['y'];_0x3e6488+=0x88*($dataSystem[_0x356196(0x301)]?0x3:0x2),_0x3e6488+=this[_0x356196(0x31a)](),_0x4a9f96+=this[_0x356196(0xe8)]();const _0x22e91d=this['getAlignmentBTB']();if(_0x3e6488>_0xa4a8c['x']+_0xa4a8c[_0x356196(0x113)])return;this['drawActorBravePoints'](_0x2bfab8,_0x3e6488,_0x4a9f96,_0xa4a8c[_0x356196(0x113)],_0x22e91d);}},VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0xe9)]=Window_BattleStatus['prototype']['drawItemStatusXPStyle'],Window_BattleStatus['prototype'][_0x4b87bd(0x363)]=function(_0x19065f){const _0x46b239=_0x4b87bd;VisuMZ[_0x46b239(0x21e)]['Window_BattleStatus_drawItemStatusXPStyle']['call'](this,_0x19065f);const _0x2a2918=this['actor'](_0x19065f);if(this[_0x46b239(0x2ff)](_0x2a2918)){if(_0x46b239(0x20f)!==_0x46b239(0x1e3)){const _0x7f972b=this[_0x46b239(0x20e)](_0x19065f);let _0x235cda=_0x7f972b['x'],_0x654912=_0x7f972b['y'];_0x235cda+=this[_0x46b239(0x31a)](),_0x654912+=this[_0x46b239(0xe8)]();const _0x47735c=this[_0x46b239(0xf4)]();this[_0x46b239(0x282)](_0x2a2918,_0x235cda,_0x654912,_0x7f972b['width'],_0x47735c);}else{const _0x3aa4d7=this['enemy']()[_0x46b239(0xe1)];if(_0x3aa4d7[_0x46b239(0x149)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5324f0(_0x169e0c['$2']);return _0x2037b4[_0x46b239(0x197)][_0x46b239(0x20c)];}}},Window_BattleStatus[_0x4b87bd(0x1ca)]['itemRectPortraitBTB']=function(_0x22967e){const _0xd9b79d=_0x4b87bd,_0x8828dd=this[_0xd9b79d(0x1fb)](_0x22967e);if(_0x8828dd['width']<ImageManager[_0xd9b79d(0xcd)])return _0x8828dd;let _0x3ffe93=Math[_0xd9b79d(0x1d7)]((_0x8828dd['width']-ImageManager[_0xd9b79d(0xcd)])/0x2);return _0x8828dd['width']=ImageManager['faceWidth'],_0x8828dd['x']+=_0x3ffe93,_0x8828dd;},Window_BattleStatus[_0x4b87bd(0x1ca)][_0x4b87bd(0xf4)]=function(){const _0xa2eee0=_0x4b87bd,_0x3d84e7=VisuMZ[_0xa2eee0(0x21e)][_0xa2eee0(0x197)][_0xa2eee0(0x131)],_0x231a38=this['battleLayoutStyle']();return _0x3d84e7[_0xa2eee0(0x34d)[_0xa2eee0(0x12c)](_0x231a38)]||0x0;},Window_BattleStatus[_0x4b87bd(0x1ca)][_0x4b87bd(0x31a)]=function(){const _0x5027da=_0x4b87bd,_0x16291d=VisuMZ[_0x5027da(0x21e)][_0x5027da(0x197)]['Window'],_0x1326e9=this[_0x5027da(0x25a)]();return _0x16291d[_0x5027da(0x30d)[_0x5027da(0x12c)](_0x1326e9)]||0x0;},Window_BattleStatus[_0x4b87bd(0x1ca)][_0x4b87bd(0xe8)]=function(){const _0x4a3943=_0x4b87bd,_0x30bf3a=VisuMZ['BattleSystemBTB'][_0x4a3943(0x197)][_0x4a3943(0x131)],_0x8c9f80=this['battleLayoutStyle']();return _0x30bf3a[_0x4a3943(0x2f9)[_0x4a3943(0x12c)](_0x8c9f80)]||0x0;},Window_BattleSkill['prototype'][_0x4b87bd(0x253)]=function(){const _0x42b898=_0x4b87bd;return BattleManager[_0x42b898(0x176)]();},Window_BattleSkill[_0x4b87bd(0x1ca)][_0x4b87bd(0x289)]=function(){const _0x1f5220=_0x4b87bd,_0x23b03e=this[_0x1f5220(0x2c2)](),_0x5e9e89=BattleManager[_0x1f5220(0x1b2)]();if(_0x5e9e89)_0x5e9e89[_0x1f5220(0xce)](_0x23b03e?_0x23b03e['id']:null);Window_SkillList[_0x1f5220(0x1ca)][_0x1f5220(0x289)]['call'](this);},Window_BattleItem[_0x4b87bd(0x1ca)][_0x4b87bd(0x253)]=function(){const _0x2bf3bc=_0x4b87bd;return BattleManager[_0x2bf3bc(0x176)]();},Window_BattleItem['prototype'][_0x4b87bd(0x289)]=function(){const _0xc71abf=_0x4b87bd,_0x4b6b76=this[_0xc71abf(0x2c2)](),_0x3ea7d4=BattleManager[_0xc71abf(0x1b2)]();if(_0x3ea7d4)_0x3ea7d4[_0xc71abf(0x11a)](_0x4b6b76?_0x4b6b76['id']:null);Window_ItemList[_0xc71abf(0x1ca)][_0xc71abf(0x289)][_0xc71abf(0x284)](this);};function Window_BTB_TurnOrder(){this['initialize'](...arguments);}Window_BTB_TurnOrder[_0x4b87bd(0x1ca)]=Object[_0x4b87bd(0x272)](Window_Base[_0x4b87bd(0x1ca)]),Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x17b)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder['Settings']=VisuMZ[_0x4b87bd(0x21e)][_0x4b87bd(0x197)]['TurnOrder'],Window_BTB_TurnOrder['prototype'][_0x4b87bd(0x278)]=function(){const _0x23e875=_0x4b87bd,_0x55aa81=this[_0x23e875(0x33c)]();this[_0x23e875(0x2a1)](_0x55aa81),Window_Base['prototype'][_0x23e875(0x278)][_0x23e875(0x284)](this,_0x55aa81),this[_0x23e875(0x27e)](),this[_0x23e875(0x1b3)](),this['opacity']=0x0;},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x33c)]=function(){return this['createBattlerRect']($gameParty['maxBattleMembers'](),0x9,!![]);},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x2a1)]=function(_0x540fab){const _0x28b1ad=_0x4b87bd;this['_targetHomeX']=this[_0x28b1ad(0x35b)]=_0x540fab['x'],this[_0x28b1ad(0xfc)]=this['_homeY']=_0x540fab['y'],this[_0x28b1ad(0x2a3)]=_0x540fab[_0x28b1ad(0x113)],this[_0x28b1ad(0x1f1)]=_0x540fab['height'],this[_0x28b1ad(0xcc)]=0x0;},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x184)]=function(_0x4732fc,_0x5b8592,_0x18e625){const _0x9c0363=_0x4b87bd,_0x4e96c5=Window_BTB_TurnOrder[_0x9c0363(0x197)],_0x41f6a3=this[_0x9c0363(0x173)]()?_0x4e96c5[_0x9c0363(0x215)]:_0x4e96c5[_0x9c0363(0x2ed)],_0x2dab09=Math[_0x9c0363(0x1c4)](_0x41f6a3,_0x4732fc+_0x5b8592),_0xe85d1=SceneManager[_0x9c0363(0x15e)][_0x9c0363(0x26b)]['height'],_0x1bdb71=SceneManager[_0x9c0363(0x15e)][_0x9c0363(0x16e)][_0x9c0363(0x35e)],_0x4658b1=_0x4e96c5[_0x9c0363(0x311)],_0x3f25b4=Graphics[_0x9c0363(0x35e)]-_0xe85d1-_0x1bdb71;let _0x2784be=0x0,_0xfdc3c3=0x0,_0x4081ba=0x0,_0x2647e4=0x0;switch(_0x4e96c5[_0x9c0363(0x2e9)]){case _0x9c0363(0x19c):_0x2784be=_0x4e96c5['SpriteThin']*_0x2dab09+_0x4658b1,_0xfdc3c3=_0x4e96c5[_0x9c0363(0x127)],_0x4081ba=Math[_0x9c0363(0xe3)]((Graphics['width']-_0x2784be)/0x2),_0x2647e4=_0x4e96c5['ScreenBuffer'];break;case'bottom':_0x2784be=_0x4e96c5['SpriteThin']*_0x2dab09+_0x4658b1,_0xfdc3c3=_0x4e96c5['SpriteLength'],_0x4081ba=Math[_0x9c0363(0xe3)]((Graphics[_0x9c0363(0x113)]-_0x2784be)/0x2),_0x2647e4=Graphics[_0x9c0363(0x35e)]-_0xe85d1-_0xfdc3c3-_0x4e96c5['ScreenBuffer'];break;case _0x9c0363(0x31d):_0x2784be=_0x4e96c5[_0x9c0363(0x127)],_0xfdc3c3=_0x4e96c5[_0x9c0363(0x354)]*_0x2dab09+_0x4658b1,_0x4081ba=_0x4e96c5['ScreenBuffer'],_0x2647e4=Math[_0x9c0363(0xe3)]((_0x3f25b4-_0xfdc3c3)/0x2),_0x2647e4+=_0x1bdb71;break;case _0x9c0363(0x2f4):_0x2784be=_0x4e96c5[_0x9c0363(0x127)],_0xfdc3c3=_0x4e96c5[_0x9c0363(0x354)]*_0x2dab09+_0x4658b1,_0x4081ba=Graphics[_0x9c0363(0x113)]-_0x2784be-_0x4e96c5[_0x9c0363(0x2b5)],_0x2647e4=Math[_0x9c0363(0xe3)]((_0x3f25b4-_0xfdc3c3)/0x2),_0x2647e4+=_0x1bdb71;break;}if(!_0x18e625){if(_0x9c0363(0x112)!==_0x9c0363(0x112))this[_0x9c0363(0x23b)]=this['_actionBattlers'][_0x9c0363(0x294)](_0x4cb7d1=>_0x4cb7d1&&_0x4cb7d1[_0x9c0363(0x192)][_0x9c0363(0x2bc)]>0x0),this[_0x9c0363(0x2cd)]();else{const _0x5d18e6=Window_BTB_TurnOrder[_0x9c0363(0x197)]['OrderDirection'];let _0x1af750=Math[_0x9c0363(0x1c4)](_0x41f6a3,Math[_0x9c0363(0x1c4)]($gameParty[_0x9c0363(0x30c)]()+0x8)-_0x2dab09);switch(_0x4e96c5[_0x9c0363(0x2e9)]){case _0x9c0363(0x19c):case _0x9c0363(0x22d):_0x5d18e6&&(_0x4081ba-=_0x1af750*_0x4e96c5[_0x9c0363(0x354)]);break;}}}return _0x4081ba+=_0x4e96c5[_0x9c0363(0x269)],_0x2647e4+=_0x4e96c5[_0x9c0363(0x158)],new Rectangle(_0x4081ba,_0x2647e4,_0x2784be,_0xfdc3c3);},Window_BTB_TurnOrder['prototype'][_0x4b87bd(0x2ae)]=function(){const _0x3fa115=_0x4b87bd;this[_0x3fa115(0x36d)]=0x0;},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)]['isHorz']=function(){const _0x29bc40=_0x4b87bd,_0xbf8192=Window_BTB_TurnOrder[_0x29bc40(0x197)],_0x40ebb7=[_0x29bc40(0x19c),'bottom']['includes'](_0xbf8192['DisplayPosition']);return _0x40ebb7;},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x27e)]=function(){const _0x4f8249=_0x4b87bd;this[_0x4f8249(0x321)]=new Sprite(),this[_0x4f8249(0x24e)](this[_0x4f8249(0x321)]),this['_turnOrderContainer']=[];for(let _0x75e7bd=0x0;_0x75e7bd<$gameParty['maxBattleMembers']();_0x75e7bd++){const _0x17c22c=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x75e7bd);this[_0x4f8249(0x321)]['addChild'](_0x17c22c),this[_0x4f8249(0x1f5)]['push'](_0x17c22c);}for(let _0x4a1b0b=0x0;_0x4a1b0b<$gameTroop['members']()[_0x4f8249(0x2bc)];_0x4a1b0b++){const _0x2c5ed8=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x4a1b0b);this[_0x4f8249(0x321)]['addChild'](_0x2c5ed8),this[_0x4f8249(0x1f5)][_0x4f8249(0x167)](_0x2c5ed8);}},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x24f)]=function(){const _0xa434f3=_0x4b87bd;Window_Base[_0xa434f3(0x1ca)][_0xa434f3(0x24f)][_0xa434f3(0x284)](this),this['updateHomePosition'](),this[_0xa434f3(0x187)](),this['updateSidePosition'](),this[_0xa434f3(0x309)](),this[_0xa434f3(0x1b3)]();},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0xff)]=function(){const _0x4bdd03=_0x4b87bd;if(this[_0x4bdd03(0xcc)]>0x0){const _0x62e286=this['_homeDuration'];this[_0x4bdd03(0x35b)]=(this[_0x4bdd03(0x35b)]*(_0x62e286-0x1)+this[_0x4bdd03(0xf5)])/_0x62e286,this[_0x4bdd03(0x251)]=(this[_0x4bdd03(0x251)]*(_0x62e286-0x1)+this[_0x4bdd03(0xfc)])/_0x62e286,this[_0x4bdd03(0xcc)]--,this['_homeDuration']<=0x0&&(this[_0x4bdd03(0x35b)]=this[_0x4bdd03(0xf5)],this['_homeY']=this[_0x4bdd03(0xfc)]);}},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x187)]=function(){const _0x57cbe4=_0x4b87bd,_0x80e56b=Window_BTB_TurnOrder[_0x57cbe4(0x197)];if(_0x80e56b[_0x57cbe4(0x2e9)]!==_0x57cbe4(0x19c))return;if(!_0x80e56b[_0x57cbe4(0x34e)])return;const _0x45c721=SceneManager[_0x57cbe4(0x15e)][_0x57cbe4(0x16e)];if(!_0x45c721)return;_0x45c721[_0x57cbe4(0x1ee)]?(this['x']=this[_0x57cbe4(0x35b)]+(_0x80e56b[_0x57cbe4(0x2c6)]||0x0),this['y']=this[_0x57cbe4(0x251)]+(_0x80e56b['RepositionTopHelpY']||0x0)):(this['x']=this[_0x57cbe4(0x35b)],this['y']=this[_0x57cbe4(0x251)]);const _0x500a85=SceneManager[_0x57cbe4(0x15e)]['_windowLayer'];this[_0x57cbe4(0x1bf)]===undefined&&(_0x57cbe4(0x36b)!=='clrYb'?(this[_0x57cbe4(0x1bf)]=Math[_0x57cbe4(0x1d7)]((Graphics[_0x57cbe4(0x113)]-Math['min'](Graphics[_0x57cbe4(0x1ef)],_0x500a85[_0x57cbe4(0x113)]))/0x2),this['_ogWindowLayerY']=Math[_0x57cbe4(0x1d7)]((Graphics[_0x57cbe4(0x35e)]-Math[_0x57cbe4(0x1c4)](Graphics[_0x57cbe4(0x2c7)],_0x500a85[_0x57cbe4(0x35e)]))/0x2)):this[_0x57cbe4(0xcc)]=_0x181505[_0x57cbe4(0x21d)]),this['x']+=_0x500a85['x']-this['_ogWindowLayerX'],this['y']+=_0x500a85['y']-this['_ogWindowLayerY'];},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)]['updateSidePosition']=function(){const _0x2336be=_0x4b87bd,_0xdf2125=Window_BTB_TurnOrder[_0x2336be(0x197)];if([_0x2336be(0x19c)][_0x2336be(0x380)](_0xdf2125[_0x2336be(0x2e9)]))return;this['x']=this[_0x2336be(0x35b)],this['y']=this['_homeY'];const _0x5f4373=SceneManager[_0x2336be(0x15e)][_0x2336be(0x347)];this['x']+=_0x5f4373['x'],this['y']+=_0x5f4373['y'];},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)]['updateBattleContainerOrder']=function(){const _0xa589ff=_0x4b87bd;if(!this[_0xa589ff(0x321)])return;const _0x40239f=this[_0xa589ff(0x321)][_0xa589ff(0x221)];if(!_0x40239f)return;_0x40239f[_0xa589ff(0x1e8)](this[_0xa589ff(0x11f)][_0xa589ff(0x1bb)](this));},Window_BTB_TurnOrder['prototype']['compareBattlerSprites']=function(_0x559387,_0x396e6f){const _0x3d0805=_0x4b87bd,_0x184fe5=this['isHorz'](),_0xf3262a=Window_BTB_TurnOrder[_0x3d0805(0x197)][_0x3d0805(0x2cf)];if(_0x184fe5&&!_0xf3262a){if(_0x3d0805(0x370)!==_0x3d0805(0x28d))return _0x559387['x']-_0x396e6f['x'];else{const _0x4c35cf=_0x31ae51['Settings'];return this['isHorz']()?_0x4c35cf['SpriteLength']:_0x4c35cf[_0x3d0805(0x354)];}}else{if(_0x184fe5&&_0xf3262a)return _0x396e6f['x']-_0x559387['x'];else{if(!_0x184fe5&&_0xf3262a)return _0x559387['y']-_0x396e6f['y'];else{if(!_0x184fe5&&!_0xf3262a)return _0x396e6f['y']-_0x559387['y'];}}}},Window_BTB_TurnOrder['prototype'][_0x4b87bd(0x1b3)]=function(){const _0x3e8400=_0x4b87bd;this[_0x3e8400(0x1ee)]=$gameSystem[_0x3e8400(0x2dc)]();},Window_BTB_TurnOrder['prototype']['updateTurnOrder']=function(_0x83a05d){const _0xac3b07=_0x4b87bd;this[_0xac3b07(0x1f5)][_0xac3b07(0x1e8)]((_0xff1980,_0x583ab9)=>{const _0x103f3c=_0xac3b07;return _0xff1980[_0x103f3c(0x242)]()-_0x583ab9[_0x103f3c(0x242)]();}),this['recalculateHome']();if(!_0x83a05d)return;for(const _0x7617b9 of this[_0xac3b07(0x1f5)]){if(!_0x7617b9)continue;_0x7617b9[_0xac3b07(0x24f)](),_0x7617b9['_positionDuration']=0x0;}},Window_BTB_TurnOrder[_0x4b87bd(0x1ca)][_0x4b87bd(0x228)]=function(){const _0x588c21=_0x4b87bd;if(!this['isHorz']())return;const _0x568551=VisuMZ['BattleSystemBTB'][_0x588c21(0x197)]['TurnOrder'];if(!_0x568551['CenterHorz'])return;const _0x5a97f1=$gameParty['members']()[_0x588c21(0x294)](_0x42aa44=>_0x42aa44&&_0x42aa44['isAlive']()&&_0x42aa44[_0x588c21(0x18d)]())['length'],_0x190df0=$gameTroop['members']()[_0x588c21(0x294)](_0x542a89=>_0x542a89&&_0x542a89[_0x588c21(0x1f3)]()&&_0x542a89[_0x588c21(0x18d)]())[_0x588c21(0x2bc)],_0x47ffc0=this[_0x588c21(0x184)](_0x5a97f1,_0x190df0);this[_0x588c21(0xf5)]=_0x47ffc0['x'],this[_0x588c21(0xfc)]=_0x47ffc0['y'],(this['_targetHomeX']!==this[_0x588c21(0x35b)]||this[_0x588c21(0xfc)]!==this[_0x588c21(0x251)])&&(_0x588c21(0x265)===_0x588c21(0x1fe)?this[_0x588c21(0x2ef)]=_0x588c21(0x1cd):this[_0x588c21(0xcc)]=_0x568551[_0x588c21(0x21d)]);};