//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.54;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.54] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * - If used with Battle Core's <Command Text: x>, the Command Text notetag
 *   will take priority in the command window, but the List Name notetag will
 *   appear in the skill list.
 * - This does not change the display text. If you'd like to change that, use
 *   the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * - If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *   <Passive State: x> will always have the passive state be available no
 *   matter if the skill is equipped or not, as long as the skill is learned.
 *   - If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 * 
 * === Skill Toggle Notetags ===
 * 
 * Skill Toggles are skills that can be toggled ON or OFF. If ON, then any
 * passive states on that skill will become enabled (assuming all other passive
 * conditions are met) and if toggled OFF, then that passive state will not
 * appear (even if all other conditions are met).
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 * 
 * Otherwise, you can use JavaScript calls like the following for script call
 * checks, and the like:
 * 
 *   $gameActors.actor(2).isSkillToggled($dataSkills[3])
 * 
 * ---
 * 
 * <Toggle>
 * 
 * - Used for: Skill Notetags
 * - Turns the skill into a toggle skill.
 * - Best used with a passive state.
 * - Toggle skills cannot be used with certain skill effects:
 *   - Active Chain Skills, Evolution Matrix Skills, Input Combo Skills
 *   - Field Skills
 *   - Item Amplify Skills, Item Concoct Skills, Item Throw Skills
 *   - Toggle skills cannot be Skill Containers
 * 
 * ---
 * 
 * <Initial Toggle: On>
 * <Initial Toggle: Off>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - Sets the initial toggle for this skill to be ON/OFF.
 *   - aka when an actor learns the skill for the first time and this
 *     determines what toggle it will have
 * - If this notetag is not used, refer to the setting found in the
 *   Plugin Parameters
 * 
 * ---
 * 
 * <Toggle Exclusion Group: key>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When this skill is toggled, all other toggle skills with a matching 'key'
 *   will be turned off.
 *   - For example, the skills Fire Force, Ice Force, and Thunder Force have
 *     the <Toggle Exclusion Group: Force> notetag.
 *   - When Fire Force is toggled ON, then Ice Force and Thunder Force will
 *     automatically turn OFF.
 * - Replace 'key' with a toggle exclusion group name for this skill to use.
 * 
 * ---
 * 
 * <Toggle On Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the skill's animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled on.
 * 
 * ---
 * 
 * <Toggle Off Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the Plugin Parameters' animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled off.
 * 
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Toggle Settings
 * ============================================================================
 *
 * Skill toggles are a new type of skill. They do not perform any actions but
 * instead, will switch on/off any passive effects the skill has.
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 *
 * ---
 *
 * Default
 * 
 *   Default Toggle:
 *   - What is the default toggle setting for toggle skills?
 * 
 *   Toggle Off Animation:
 *   - Play this animation when a skill is toggled off.
 *   - Requires VisuMZ_0_CoreEngine.
 *   - Toggle On animation by default is whatever the skill animation is set to
 * 
 * ---
 * 
 * Appearance
 * 
 *   Toggle On Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Applies for skill name, not the skill cost
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Toggle Type:
 *   - Skill toggle displayed in the status window.
 * 
 *   Toggle On:
 *   - Text displayed for a skill that's toggled on
 * 
 *   Toggle Off:
 *   - Text displayed for a skill that's toggled off
 * 
 *     Off Text Location:
 *     - Where is the [OFF] text located in the skill cost?
 *       - front
 *       - back
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * Version 1.54: December 15, 2025
 * * Documentation Update!
 * ** Added extra clarity for <List Name: name> notetag:
 * *** If used with Battle Core's <Command Text: x>, the Command Text notetag
 *     will take priority in the command window, but the List Name notetag will
 *     appear in the skill list.
 * *** This does not change the display text. If you'd like to change that, use
 *     the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * Version 1.53: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the "Preset: Gauge Color" Plugin Parameter was not
 *    accepting #rrggbb values. Fix made by Arisu.
 * * Documentation Update!
 * ** Added extra clarity for <Passive State: x>:
 * *** If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *     <Passive State: x> will always have the passive state be available no
 *     matter if the skill is equipped or not, as long as the skill is learned.
 * *** If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 * 
 * Version 1.52: August 14, 2025
 * * Feature Update!
 * ** Passive States with custom JS conditions should be less prone to infinite
 *    loops. Update made by Irina.
 * 
 * Version 1.51: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Skill Toggle Settings
 * **** Skill toggles are a new type of skill. They do not perform any actions
 *      but instead, will switch on/off any passive effects the skill has.
 * **** Enemies are unable to switch Toggle Skills and the passive effects on a
 *      Toggle Skill for an enemy will always be considered ON.
 * **** See the help file for more information.
 * ** New Notetags added by Olivia:
 * *** Skill Toggle Notetags:
 * **** <Toggle>
 * **** <Initial Toggle: On/Off>
 * **** <Toggle Exclusion Group: key>
 * **** <Toggle On Animation: x>
 * **** <Toggle Off Animation: x>
 * ***** See the help file for more information.
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Toggles:struct
 * @text Skill Toggle Settings
 * @parent Skills:struct
 * @type struct<Toggles>
 * @desc Settings in regards to how skill toggles function.
 * @default {"Default":"","DefaultToggle:eval":"true","ToggleOffAnimationID:num":"62","Appear":"","ToggleOnTextColor:str":"24","Vocab":"","ToggleType:str":"Toggle","ToggleOn:str":"\\FS[22]\\C[0][ON]","ToggleOff:str":"\\FS[22]\\C[8][OFF]","ToggleOffLocation:str":"back"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Toggle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Toggles:
 *
 * @param Default
 *
 * @param DefaultToggle:eval
 * @text Default Toggle
 * @parent Default
 * @type boolean
 * @on ON
 * @off OFF
 * @desc What is the default toggle setting for toggle skills?
 * @default true
 *
 * @param ToggleOffAnimationID:num
 * @text Toggle Off Animation
 * @parent Default
 * @type animation
 * @desc Play this animation when a skill is toggled off.
 * Requires VisuMZ_0_CoreEngine.
 * @default 62
 *
 * @param Appear
 * @text Appearance
 *
 * @param ToggleOnTextColor:str
 * @text Toggle On Text Color
 * @parent Appear
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param ToggleType:str
 * @text Toggle Type
 * @parent Vocab
 * @desc Skill toggle displayed in the status window.
 * @default Toggle
 *
 * @param ToggleOn:str
 * @text Toggle On
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled on
 * @default \FS[22]\C[0][ON]
 *
 * @param ToggleOff:str
 * @text Toggle Off
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled off
 * @default \FS[22]\C[8][OFF]
 *
 * @param ToggleOffLocation:str
 * @text Off Text Location
 * @parent ToggleOff:str
 * @type select
 * @option front
 * @option back
 * @desc Where is the [OFF] text located in the skill cost?
 * @default back
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:str
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x3addb4=_0x1729;(function(_0x5e7ddd,_0x357331){const _0x582223=_0x1729,_0x58ece9=_0x5e7ddd();while(!![]){try{const _0x68b25b=parseInt(_0x582223(0x2ce))/0x1+parseInt(_0x582223(0x408))/0x2+-parseInt(_0x582223(0x379))/0x3+-parseInt(_0x582223(0x3be))/0x4*(parseInt(_0x582223(0x37d))/0x5)+-parseInt(_0x582223(0xff))/0x6+parseInt(_0x582223(0x15a))/0x7*(-parseInt(_0x582223(0x327))/0x8)+parseInt(_0x582223(0x29b))/0x9;if(_0x68b25b===_0x357331)break;else _0x58ece9['push'](_0x58ece9['shift']());}catch(_0x982c96){_0x58ece9['push'](_0x58ece9['shift']());}}}(_0x5bc4,0x419af));var label=_0x3addb4(0x34e),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3addb4(0x2af)](function(_0x3c0bd3){const _0x10bc5e=_0x3addb4;return _0x3c0bd3[_0x10bc5e(0x173)]&&_0x3c0bd3[_0x10bc5e(0x139)][_0x10bc5e(0x1b1)]('['+label+']');})[0x0];function _0x1729(_0x41c74a,_0x4d3850){const _0x5bc479=_0x5bc4();return _0x1729=function(_0x1729ce,_0x3be1db){_0x1729ce=_0x1729ce-0xfe;let _0x56192f=_0x5bc479[_0x1729ce];return _0x56192f;},_0x1729(_0x41c74a,_0x4d3850);}function _0x5bc4(){const _0x23fe9c=['drawItemStyleIconText','_cache_CheckBypassRemoveStatesByDamage','1218948SihARx','currentValue','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','statePassiveConditionJS','95ONhldU','requestFauxAnimation','drawExtendedParameter','ColorBuff','makeAdditionalSkillCostText','ForceListRange','getStateIdWithName','createPassiveStatesCache','stateColor','Game_BattlerBase_isStateResist','mainAreaTop','randomInt','Item-%1-%2','clearStateData','addDebuff','MeetsAuraStateConditions','Parse_Notetags_Skill_JS','ANY','standardIconHeight','isUseSkillsStatesCoreUpdatedLayout','onAddDebuffGlobalJS','text','multiclasses','onExpireStateGlobalJS','test','removeStatesByCategoryAll','ParseAllNotetags','isToggleSkill','_bypassRemoveStateDamage_user','scrollTo','toggleOn','changeOutlineColor','Window_SkillList_makeItemList','state','onAddStateGlobalJS','_cache_getPassiveStateConditionSwitchData','reset','_skillTypeWindow','recalculateSlipDamageJS','updateHelp','adjustSkillCost','LabelOutlineSolid','Game_BattlerBase_states','colSpacing','SortSkillTypesAbc','applyStateCategoryRemovalEffects','getPassiveStatesFromObj','maxTurns','drawItem','gaugeRate','itemWindowRect','Enemy','isSkillToggled','Game_BattlerBase_eraseBuff','changeTextColor','Param','ToggleOffLocation','skill','Name','indexOf','resetTextColor','ShowShopStatus','Game_BattlerBase_recoverAll','_cache_toggleExclusionGroups','index','27548ONAnhd','%1\x20%2\x20%3','useDigitGrouping','splice','ColorNegative','allBattleMembers','_stateTurns','onAddBuff','success','canChangeSkillsThroughStateEffects','anySwitchOn','createShopStatusWindow','greater','updateStateTurns','drawActorBuffTurns','isUserBypassRemoveStatesByDamage','process_VisuMZ_SkillsStatesCore_Skill_Notetags','testSkillStatesCoreNotetags','slipMp','ActionEndUpdate','auto','shopStatusWindowRect','addStateTurns','DEF','Scene_Skill_statusWindowRect','canPaySkillCost','onEraseDebuffGlobalJS','decreaseBuff','#%1','opponentsUnit','Game_BattlerBase_refresh','multiClass','ListWindowCols','VisuMZ_3_InputComboSkills','stateHpSlipDamageJS','isEnemy','setupSkillsStatesCore','isBuffAffected','Game_Action_executeHpDamage_bypassStateDmgRemoval','isAllDead','<enemy-%1>','gaugeColor1','endAction','ValueFontMainType','_turnDisplaySprite','setStateData','Parse_Notetags_State_PassiveJS','getClassIdWithName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','clear','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_Action_applyItemUserEffect','Window_SkillList_setActor','TurnFontSize','Game_Troop_setup','_skillIDs','resetStateCounts','gradientFillRect','isSkill','applyStateTurnManipulationEffects','onExpireStateJS','LayoutStyle','clearAllStateOrigins','Costs','Game_BattlerBase_resetStateCounts','CanPayJS','toggleOffLocation','setStateRetainType','Scene_Skill_createItemWindow','isPlaytest','meetsSkillConditionsEnableJS','normalColor','onExpireBuffGlobalJS','LabelOutlineWidth','944684ylrIhX','_stateDisplay','debuffTurns','stateEraseJS','Sprite_StateIcon_loadBitmap','isCommandEnabled','MeetsAuraNoteConditions','friendsUnit','Scene_Skill_skillTypeWindowRect','passiveStates','buttonAssistText1','Game_Battler_onBattleEnd','meetsPassiveStateConditionJS','enemy','846042cyVoBf','process_VisuMZ_SkillsStatesCore_Notetags','Toggles','Sprite_Gauge_currentMaxValue','height','_bypassRemoveStateDamage_value','MaxTurns','Game_Actor_skillTypes','recoverAll','_actor','changeSkillsThroughStateEffects','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onAddStateCustomJS','Parse_Notetags_Skill_Sorting','StackBuffMax','InputComboSkills','restriction','min','Parse_Notetags_State_Category','playEquip','paySkillCost','stateMpSlipDamageJS','fillRect','stateMpSlipHealJS','canClearState','onExpireBuffJS','center','drawActorBuffRates','hasState','shopStatusWindowRectSkillsStatesCore','_buffs','removeBuff','drawActorIconsAllTurnCounters','innerHeight','itemLineRect','makeCommandName','VisuMZ_2_ClassChangeSystem','removeState','_currentActor','convertPassiveStates','Game_Player_refresh','deadMembers','action','Window_SkillList_maxCols','toUpperCase','ParseSkillNotetags','target','magicSkills','alterSkillName','skillTypeWindowRect','setActor','width','createCommandNameWindow','Game_BattlerBase_traitsSet','isSkillUsableForAutoBattle','onAddStateJS','DefaultToggle','onChange','description','%1-%2-%3','isPassiveStateStackable','skillTypeWindowRectSkillsStatesCore','concat','ParseClassIDs','Game_BattlerBase_decreaseBuff','gaugeColor2','_skillWindow','Sprite_Gauge_currentValue','placeExactGauge','iconWidth','paramValueByName','StateID','getStateOriginByKey','Scene_Battle_onSkillOk_Toggle','\x5cFS[22]\x5cC[0][ON]','getAuraPassiveStateIDs','members','loadBitmap','AvailableChainSkill','addPassiveStatesByNotetag','JSON','_battler','iconText','drawSkillCost','ARRAYSTR','allSwitchOn','clearStateOrigin','applyItemUserEffect','AmplifyWith','PassiveConditionJS','_hidden','3307507OLOYau','actions','ARRAYFUNC','ActorIDs','createTurnDisplaySprite','_cache_getPassiveStatesFromObj','_cache_getAuraPassiveStatesFromObj','checkShowHideNotetags','onExpireStateCustomJS','labelFontFace','onRegenerateCustomStateDamageOverTime','name','MeetsAuraObjConditions','StateTurnsActorChangeBy','currentDisplayedValue','TurnOffsetY','MatchLabelColor','_animationIndex','POSITIVE','SkillSceneAdjustSkillList','MatchLabelGaugeColor','statesByCategory','ARRAYSTRUCT','exit','death','status','Toggle','CheckVisibleSwitchNotetags','Game_Unit_isAllDead','Parse_Notetags_State_SlipEffectJS','eraseBuff','getColorDataFromPluginParameters','drawText','drawIcon','onAddDebuffJS','recover\x20all','StateTurnsEnemyChangeBy','PayJS','hide','SkillMenuStatusRect','stateAddJS','passiveStateObjects','StateTurnsActorChangeTo','getStateRetainType','ActiveChainSkills','outlineColor','AutoAddState','_costSettings','ItemAmplifySkills','checkShowHideJS','Armor-%1-%2','isStateRestrict','standardIconWidth','getStateDisplay','shift','toggleType','skillVisibleJS','SkillActorPaySkillCost','_currentTroopUniqueID','isRightInputMode','uiMenuStyle','gainSilentTp','_checkingTraitsSetSkillsStatesCore','currentMaxValue','Parse_Notetags_State_ApplyRemoveLeaveJS','currentMaxValueSkillsStatesCore','VisuMZ_1_ItemsEquipsCore','itemWindowRectSkillsStatesCore','SkillSceneStatusBgType','clearStatesWithStateRetain','MAT','format','_categoryWindow','helpWindowRectSkillsStatesCore','getCurrentTroopUniqueID','onAddBuffGlobalJS','mpDamage','_colorCache','value','EnemyIndex','addBuff','onAddDebuff','drawExtendedSkillsStatesCoreStatus','Game_Variables_onChange','meetsSkillConditions','mpCost','addChild','includes','autoRemovalTiming','mainFontSize','parse','map','buffIconIndex','KnownListRange','getStateOrigin','setSkillToggle','setup','process_VisuMZ_SkillsStatesCore_State_Notetags','createAllSkillCostText','Turns','Sprite_StateIcon_updateFrame','getColor','Window_SkillList_includes','parameters','executeHpDamage','setStatusWindow','_cache_isToggleSkill','Window_SkillStatus_refresh','meetsPassiveStateConditionSwitches','isDebuffAffected','retrieveStateColor','user','labelOutlineWidth','onExpireDebuffGlobalJS','placeGauge','Game_BattlerBase_increaseBuff','LabelFontMainType','Sprite_Gauge_setup','hpDamage','length','IconStypeMagic','adjustItemWidthByShopStatus','note','ItemThrowSkills','getAuraPassiveStatesFromObj','regenerateAll','call','makeCurrentTroopUniqueID','ignore','isActor','_stateSteps','max','redraw','commandNameWindowDrawText','bitmap','drawTextEx','_skillChangesFromState','stateExpireJS','checkCacheKey','isGroupDefeatStateAffected','Sprite_Gauge_redraw','isConfused','changePaintOpacity','onExpireDebuff','actor','removeStatesByDamage','Game_Unit_deadMembers','applySkillsStatesCoreEffects','activate','addBuffTurns','commandNameWindowCenter','PresetLabelGaugeColor','setDebuffTurns','stateHpSlipHealJS','SkillContainers','die','stateId','GaugeCurrentJS','buttonAssistSwitch','Game_Switches_onChange','addNewState','StackDebuffMax','opacity','uiHelpPosition','toggleExclusionGroups','allowCreateShopStatusWindow','ForceList','VisuMZ_3_FieldSkills','Game_BattlerBase_die','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','damage','setStateTurns','isSkillCostShown','meetsSkillConditionsGlobalJS','ToggleType','increaseBuff','isStateCategoryAffected','Buffs','Scene_Skill_onItemOk_Toggle','toggleOff','groupDefeat','MAXHP','TurnOffsetX','labelOutlineColor','DataOffsetY','NEGATIVE','makeCommandList','<troop-%1>','replace','_prevPassiveJsFrameCount','_stateMaxTurns','localeCompare','contents','isSkillTypeMatchForUse','valueOutlineWidth','onEraseStateCustomJS','textSizeEx','match','CalcJS','Settings','Window_SkillList_drawItem','_stateOrigin','canSortSkillTypeList','Game_Battler_addDebuff','gainHp','sort','_stored_buffColor','Window_StatusBase_placeGauge','AURA_SYSTEM_ENABLED','_cache','ATK','removeStatesByCategory','helpWindowRect','add','_itemWindow','calcWindowHeight','ARRAYEVAL','isStateAffected','passiveStateIDs','_lastStatesActionEndFrameCount','ShowData','textColor','callUpdateHelp','onEraseBuff','onAddStateMakeCustomSlipValues','convertGaugeTypeSkillsStatesCore','prepareResetStateCounts','FieldSkill','boxWidth','addState','initMembersSkillsStatesCore','drawActorStateTurns','getStateReapplyRulings','skills','learnSkill','_statusWindow','itemAt','initMembers','TextJS','_stateRetainType','CheckBypassRemoveStatesByDamage','commandStyle','makeSuccess','slice','AGI','ParseSkillChangessIntoData','mainFontFace','Window_SkillList_updateHelp','getSkillChangesFromState','trim','resetFontSettings','isStateAddable','LearnedChainSkill','onItemOk','gaugeBackColor','isStateCategoryResisted','ReapplyRules','_bypassRemoveStateDamage_action','_shopStatusWindow','isSkillHidden','isStateResist','isUseModernControls','onSkillToggle','process_VisuMZ_SkillsStatesCore_CheckForAuras','valueFontSize','_stypeIDs','updateCommandNameWindow','initialize','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Window_Base_changeTextColor','_phase','statusWindowRect','Game_BattlerBase_meetsSkillConditions','heal','onEraseDebuffJS','_states','checkSkillConditionsNotetags','toLowerCase','CmdWidth','clearStateDisplay','bypassRemoveStatesByDamage','_checkingVisuMzPassiveStateObjects','Enemy-%1-%2','inBattle','updateVisibility','redrawSkillsStatesCore','VisuMZ_0_CoreEngine','debuffColor','VisuMZ_3_ActiveChainSkills','[OFF]','getPassiveStateConditionClassesData','_stateIDs','Game_BattlerBase_overwriteBuffTurns','Game_Battler_addBuff','onEraseBuffGlobalJS','Game_BattlerBase_eraseState','skillLearn','removeStatesAuto','refreshAllMembers','uiInputPosition','_tempActor','CheckIncompatibleStates','stateTpSlipHealJS','getSkillTypes','ToggleOff','_passiveStateResults','EvoMatrixSkills','usableSkills','meetsPassiveStateConditions','untitled','Skills','DataFontSize','mainCommandWidth','gainMp','iconIndex','maxItems','onDatabaseLoaded','GaugeMaxJS','isStateExpired','categories','prototype','3697677lXrRYh','Window_Base_drawText','floor','stateTurns','some','sortPriority','meetsPassiveStateGlobalConditionJS','menuActor','Game_Action_testApply','addPassiveStatesTraitSets','_result','Game_BattlerBase_skillMpCost','Game_BattlerBase_meetsSkillConditions_Toggle','addAuraPassiveStateIDs','Game_Action_isValid','commandNameWindowDrawBackground','VisuMZ_3_ItemThrowSkills','stateCategoriesResisted','skillMpCost','Scene_Skill_helpWindowRect','filter','ShowTurns','onSkillOk','<actor-%1>','numberFontFace','isMaxDebuffAffected','isPartyAllAffectedByGroupDefeatStates','addDebuffTurns','fontBold','_skills','ForcedChainSkill','CheckVisibleBattleNotetags','slipTp','FUNC','isDead','paramBuffRate','currentClass','VisuMZ_3_ItemAmplifySkills','gaugeLineHeight','\x5cFS[22]\x5cC[8][OFF]','clearStates','_checkingPassiveStates','getPassiveStateConditionSwitchData','InputKey','_cache_getPassiveStateConditionClassesData','allSwitchOff','getCurrentStateActiveUser','ParseStateNotetags','helpAreaHeight','AvailableMatrix','Sprite_Gauge_gaugeRate','536201GoxYwq','_buffTurns','includesSkillsStatesCore','Parse_Notetags_Skill_Cost','setItem','deathStateId','ARRAYJSON','traitsSet','Scene_Skill_itemWindowRect','lineHeight','equips','_commandNameWindow','right','totalStateCategory','updatedLayoutStyle','_prevPassiveJsCounter','VisuMZ_3_EvoMatrixSkills','isBuffOrDebuffAffected','mainAreaHeight','skillEnableJS','isValid','currentValueSkillsStatesCore','stateData','Game_Actor_learnSkill','clearStateRetainType','RefreshCacheSwitch','drawItemStyleIcon','stateMaximumTurns','drawActorStateData','Scene_Boot_onDatabaseLoaded','NUM','convertTargetToStateOriginKey','Global','Game_Battler_regenerateAll','_endingBattle','allIcons','SortByIDandPriority','stateTpSlipDamageJS','BattleManager_endAction','addPassiveStatesFromOtherPlugins','push','_stateData','STR','CmdTextAlign','priority','_stored_state-%1-color','anchor','onRemoveState','LUK','_classIDs','Game_BattlerBase_buffIconIndex','checkSkillConditionsSwitchNotetags','commandName','setStateOrigin','CanThrowType','isAlive','Gauge','MultiplierJS','ValueOutlineWidth','animationId','skillTypes','ceil','removeBuffsAuto','canUse','hasStateCategory','ConvertParams','VisuMZ_1_ElementStatusCore','enemyId','setBackgroundType','setPassiveStateSlipDamageJS','frameCount','setBuffTurns','buffColor','icon','PassiveStates','_scene','[ON]','skillTpCost','_stypeId','addPassiveStatesByPluginParameters','getSkillIdWithName','Weapon-%1-%2','innerWidth','Game_BattlerBase_initMembers','createSkillCostText','_prevPassiveJsResults','EVAL','MAXMP','Window_SkillType_initialize','8jpBBaH','hasSkill','isBottomHelpMode','overwriteBuffTurns','log','constructor','isSceneBattle','ColorDebuff','onEraseDebuff','fontSize','shopStatusWidth','onAddState','isTargetBypassRemoveStatesByDamage','StateTurnsEnemyChangeTo','CheckVisibleSkillNotetags','tpCost','Window_Base_createAllSkillCostText_Toggle','forgetSkill','States','hasToggleSkillAntiCheck','onEraseStateGlobalJS','SortByIDandPriorityUsingIDs','eraseState','registerCommand','Game_BattlerBase_clearStates','Game_BattlerBase_skillTpCost','auraStateIDs','slipHp','skillCostSeparator','createKeyJS','VisuMZ_1_MainMenuCore','MDF','regenerateAllSkillsStatesCore','isBuffPrevented','stepsForTurn','Game_Battler_addState','onEraseBuffJS','Game_Actor_forgetSkill','RegExp','SkillsStatesCore','_skillToggle','meetsPassiveStateConditionClasses','item','addPassiveStates','onEraseStateJS','number','_toggleSkillColor','refresh','makeItemList','buffTurns','GaugeDrawJS','commandStyleCheck','Sprite_Gauge_initMembers','statusWindowRectSkillsStatesCore','clamp','_subject','buff','_data','updateFrame','onExpireDebuffJS','rgba(0,\x200,\x200,\x201)','version','getCurrentStateOriginKey','makeResistedStateCategories','Window_StatusBase_drawActorIcons','addWindow','states','isLearnedSkill','split','traitObjects','equipBattleSkills','drawActorIcons','DisplayedParams','updateStatesActionEnd','_tempBattler','getStateData','Skill-%1-%2','sortSkillList','anySwitchOff','isBuffExpired'];_0x5bc4=function(){return _0x23fe9c;};return _0x5bc4();}VisuMZ[label][_0x3addb4(0x221)]=VisuMZ[label][_0x3addb4(0x221)]||{},VisuMZ['ConvertParams']=function(_0x3bd1c2,_0x1279df){const _0x3c0159=_0x3addb4;for(const _0x436ba7 in _0x1279df){if(_0x436ba7[_0x3c0159(0x21f)](/(.*):(.*)/i)){const _0x555bbd=String(RegExp['$1']),_0xe80fe2=String(RegExp['$2'])[_0x3c0159(0x12b)]()[_0x3c0159(0x253)]();let _0xbe8f19,_0xf4da23,_0x5682fe;switch(_0xe80fe2){case _0x3c0159(0x2ec):_0xbe8f19=_0x1279df[_0x436ba7]!==''?Number(_0x1279df[_0x436ba7]):0x0;break;case'ARRAYNUM':_0xf4da23=_0x1279df[_0x436ba7]!==''?JSON[_0x3c0159(0x1b4)](_0x1279df[_0x436ba7]):[],_0xbe8f19=_0xf4da23[_0x3c0159(0x1b5)](_0x158d66=>Number(_0x158d66));break;case _0x3c0159(0x324):_0xbe8f19=_0x1279df[_0x436ba7]!==''?eval(_0x1279df[_0x436ba7]):null;break;case _0x3c0159(0x232):_0xf4da23=_0x1279df[_0x436ba7]!==''?JSON['parse'](_0x1279df[_0x436ba7]):[],_0xbe8f19=_0xf4da23[_0x3c0159(0x1b5)](_0x25e8f0=>eval(_0x25e8f0));break;case _0x3c0159(0x14f):_0xbe8f19=_0x1279df[_0x436ba7]!==''?JSON['parse'](_0x1279df[_0x436ba7]):'';break;case _0x3c0159(0x2d4):_0xf4da23=_0x1279df[_0x436ba7]!==''?JSON[_0x3c0159(0x1b4)](_0x1279df[_0x436ba7]):[],_0xbe8f19=_0xf4da23[_0x3c0159(0x1b5)](_0x1f2cfb=>JSON[_0x3c0159(0x1b4)](_0x1f2cfb));break;case _0x3c0159(0x2bc):_0xbe8f19=_0x1279df[_0x436ba7]!==''?new Function(JSON[_0x3c0159(0x1b4)](_0x1279df[_0x436ba7])):new Function('return\x200');break;case _0x3c0159(0x15c):_0xf4da23=_0x1279df[_0x436ba7]!==''?JSON[_0x3c0159(0x1b4)](_0x1279df[_0x436ba7]):[],_0xbe8f19=_0xf4da23[_0x3c0159(0x1b5)](_0x48a9fd=>new Function(JSON[_0x3c0159(0x1b4)](_0x48a9fd)));break;case _0x3c0159(0x2f8):_0xbe8f19=_0x1279df[_0x436ba7]!==''?String(_0x1279df[_0x436ba7]):'';break;case _0x3c0159(0x153):_0xf4da23=_0x1279df[_0x436ba7]!==''?JSON['parse'](_0x1279df[_0x436ba7]):[],_0xbe8f19=_0xf4da23['map'](_0x1588ba=>String(_0x1588ba));break;case'STRUCT':_0x5682fe=_0x1279df[_0x436ba7]!==''?JSON[_0x3c0159(0x1b4)](_0x1279df[_0x436ba7]):{},_0x3bd1c2[_0x555bbd]={},VisuMZ['ConvertParams'](_0x3bd1c2[_0x555bbd],_0x5682fe);continue;case _0x3c0159(0x170):_0xf4da23=_0x1279df[_0x436ba7]!==''?JSON[_0x3c0159(0x1b4)](_0x1279df[_0x436ba7]):[],_0xbe8f19=_0xf4da23[_0x3c0159(0x1b5)](_0x555a00=>VisuMZ[_0x3c0159(0x30f)]({},JSON[_0x3c0159(0x1b4)](_0x555a00)));break;default:continue;}_0x3bd1c2[_0x555bbd]=_0xbe8f19;}}return _0x3bd1c2;},(_0xde3c31=>{const _0x2188e2=_0x3addb4,_0x1e9e74=_0xde3c31['name'];for(const _0x394c80 of dependencies){if(!Imported[_0x394c80]){alert(_0x2188e2(0x37b)[_0x2188e2(0x1a1)](_0x1e9e74,_0x394c80)),SceneManager[_0x2188e2(0x171)]();break;}}const _0x56915f=_0xde3c31[_0x2188e2(0x139)];if(_0x56915f[_0x2188e2(0x21f)](/\[Version[ ](.*?)\]/i)){const _0x22b06d=Number(RegExp['$1']);_0x22b06d!==VisuMZ[label][_0x2188e2(0x364)]&&(alert(_0x2188e2(0x203)[_0x2188e2(0x1a1)](_0x1e9e74,_0x22b06d)),SceneManager[_0x2188e2(0x171)]());}if(_0x56915f[_0x2188e2(0x21f)](/\[Tier[ ](\d+)\]/i)){const _0x37b7ef=Number(RegExp['$1']);_0x37b7ef<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2188e2(0x1a1)](_0x1e9e74,_0x37b7ef,tier)),SceneManager['exit']()):tier=Math[_0x2188e2(0x1dd)](_0x37b7ef,tier);}VisuMZ[_0x2188e2(0x30f)](VisuMZ[label][_0x2188e2(0x221)],_0xde3c31[_0x2188e2(0x1c1)]);})(pluginData),PluginManager[_0x3addb4(0x33e)](pluginData[_0x3addb4(0x165)],_0x3addb4(0x193),_0x256dde=>{const _0xb6d3aa=_0x3addb4;VisuMZ['ConvertParams'](_0x256dde,_0x256dde);const _0x321283=_0x256dde['ActorIDs']||[],_0x1a765c=Number(_0x256dde['SkillID']),_0x4a2866=$dataSkills[_0x1a765c];if(!_0x4a2866)return;for(const _0x210444 of _0x321283){const _0x45df2b=$gameActors[_0xb6d3aa(0x1ea)](_0x210444);if(!_0x45df2b)continue;_0x45df2b[_0xb6d3aa(0x113)](_0x4a2866);}}),PluginManager['registerCommand'](pluginData[_0x3addb4(0x165)],'SkillEnemyPaySkillCost',_0x5d08d2=>{const _0x1316f9=_0x3addb4;VisuMZ['ConvertParams'](_0x5d08d2,_0x5d08d2);const _0x564b87=_0x5d08d2[_0x1316f9(0x1a9)]||[],_0x11348a=Number(_0x5d08d2['SkillID']),_0x1a9372=$dataSkills[_0x11348a];if(!_0x1a9372)return;for(const _0x505781 of _0x564b87){const _0x499828=$gameTroop['members']()[_0x505781];if(!_0x499828)continue;_0x499828[_0x1316f9(0x113)](_0x1a9372);}}),PluginManager['registerCommand'](pluginData[_0x3addb4(0x165)],_0x3addb4(0x167),_0x548185=>{const _0x1e3b6b=_0x3addb4;VisuMZ[_0x1e3b6b(0x30f)](_0x548185,_0x548185);const _0x3606a9=_0x548185[_0x1e3b6b(0x15d)]||[],_0x310a0c=Number(_0x548185[_0x1e3b6b(0x146)]),_0xaf2ec2=Number(_0x548185[_0x1e3b6b(0x1bd)]),_0x14a2be=_0x548185[_0x1e3b6b(0x188)];for(const _0x1e71ca of _0x3606a9){const _0x4fc80c=$gameActors[_0x1e3b6b(0x1ea)](_0x1e71ca);if(!_0x4fc80c)continue;_0x14a2be&&!_0x4fc80c['isStateAffected'](_0x310a0c)?(_0x4fc80c[_0x1e3b6b(0x23f)](_0x310a0c),_0x4fc80c['setStateTurns'](_0x310a0c,_0xaf2ec2)):_0x4fc80c['addStateTurns'](_0x310a0c,_0xaf2ec2);}}),PluginManager[_0x3addb4(0x33e)](pluginData['name'],_0x3addb4(0x184),_0xa50ad=>{const _0x3754b2=_0x3addb4;VisuMZ[_0x3754b2(0x30f)](_0xa50ad,_0xa50ad);const _0x363f87=_0xa50ad[_0x3754b2(0x15d)]||[],_0x58f397=Number(_0xa50ad[_0x3754b2(0x146)]),_0x439629=Math[_0x3754b2(0x1dd)](Number(_0xa50ad['Turns']),0x0),_0x1a77d5=_0xa50ad[_0x3754b2(0x188)];for(const _0x504db5 of _0x363f87){const _0x289cbb=$gameActors[_0x3754b2(0x1ea)](_0x504db5);if(!_0x289cbb)continue;_0x1a77d5&&!_0x289cbb[_0x3754b2(0x233)](_0x58f397)&&_0x289cbb['addState'](_0x58f397),_0x289cbb[_0x3754b2(0x205)](_0x58f397,_0x439629);}}),PluginManager[_0x3addb4(0x33e)](pluginData[_0x3addb4(0x165)],_0x3addb4(0x17e),_0xee2a5f=>{const _0x363764=_0x3addb4;if(!$gameParty[_0x363764(0x275)]())return;VisuMZ['ConvertParams'](_0xee2a5f,_0xee2a5f);const _0xf44674=_0xee2a5f[_0x363764(0x1a9)]||[],_0x130d8b=Number(_0xee2a5f['StateID']),_0x58a5ec=Number(_0xee2a5f[_0x363764(0x1bd)]),_0x57d64e=_0xee2a5f[_0x363764(0x188)];for(const _0x1891d1 of _0xf44674){const _0xdbed99=$gameTroop[_0x363764(0x14b)]()[_0x1891d1];if(!_0xdbed99)continue;_0x57d64e&&!_0xdbed99[_0x363764(0x233)](_0x130d8b)?(_0xdbed99['addState'](_0x130d8b),_0xdbed99['setStateTurns'](_0x130d8b,_0x58a5ec)):_0xdbed99[_0x363764(0x3d4)](_0x130d8b,_0x58a5ec);}}),PluginManager[_0x3addb4(0x33e)](pluginData[_0x3addb4(0x165)],_0x3addb4(0x334),_0x503e9d=>{const _0x1a9876=_0x3addb4;if(!$gameParty[_0x1a9876(0x275)]())return;VisuMZ['ConvertParams'](_0x503e9d,_0x503e9d);const _0x4b74dc=_0x503e9d['EnemyIndex']||[],_0x10cf1d=Number(_0x503e9d[_0x1a9876(0x146)]),_0x440d9c=Math[_0x1a9876(0x1dd)](Number(_0x503e9d[_0x1a9876(0x1bd)]),0x0),_0x24644a=_0x503e9d[_0x1a9876(0x188)];for(const _0x2f815a of _0x4b74dc){const _0x33324c=$gameTroop[_0x1a9876(0x14b)]()[_0x2f815a];if(!_0x33324c)continue;_0x24644a&&!_0x33324c[_0x1a9876(0x233)](_0x10cf1d)&&_0x33324c[_0x1a9876(0x23f)](_0x10cf1d),_0x33324c[_0x1a9876(0x205)](_0x10cf1d,_0x440d9c);}}),VisuMZ['SkillsStatesCore'][_0x3addb4(0x2eb)]=Scene_Boot[_0x3addb4(0x29a)][_0x3addb4(0x296)],Scene_Boot[_0x3addb4(0x29a)][_0x3addb4(0x296)]=function(){const _0x15ef63=_0x3addb4;VisuMZ[_0x15ef63(0x34e)][_0x15ef63(0x2eb)][_0x15ef63(0x1d8)](this),this[_0x15ef63(0x100)](),VisuMZ[_0x15ef63(0x34e)][_0x15ef63(0x287)]();},Scene_Boot[_0x3addb4(0x29a)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x310ed8=_0x3addb4;this[_0x310ed8(0x261)]();if(VisuMZ[_0x310ed8(0x397)])return;this[_0x310ed8(0x3ce)](),this[_0x310ed8(0x1bb)]();},Scene_Boot[_0x3addb4(0x29a)][_0x3addb4(0x3ce)]=function(){const _0x294033=_0x3addb4;for(const _0x27eb31 of $dataSkills){if(!_0x27eb31)continue;VisuMZ[_0x294033(0x34e)][_0x294033(0x2d1)](_0x27eb31),VisuMZ[_0x294033(0x34e)][_0x294033(0x10c)](_0x27eb31),VisuMZ[_0x294033(0x34e)][_0x294033(0x38d)](_0x27eb31);}},Scene_Boot['prototype'][_0x3addb4(0x1bb)]=function(){const _0x1c04dd=_0x3addb4;for(const _0x4406bc of $dataStates){if(!_0x4406bc)continue;VisuMZ[_0x1c04dd(0x34e)][_0x1c04dd(0x111)](_0x4406bc),VisuMZ['SkillsStatesCore'][_0x1c04dd(0x3ec)](_0x4406bc),VisuMZ[_0x1c04dd(0x34e)][_0x1c04dd(0x177)](_0x4406bc),VisuMZ[_0x1c04dd(0x34e)][_0x1c04dd(0x19a)](_0x4406bc);}},VisuMZ[_0x3addb4(0x34e)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x3addb4(0x12c)]=function(_0x3a8cfb){const _0x2f2cf8=_0x3addb4;VisuMZ[_0x2f2cf8(0x34e)]['ParseSkillNotetags'][_0x2f2cf8(0x1d8)](this,_0x3a8cfb),VisuMZ[_0x2f2cf8(0x34e)][_0x2f2cf8(0x2d1)](_0x3a8cfb),VisuMZ[_0x2f2cf8(0x34e)]['Parse_Notetags_Skill_Sorting'](_0x3a8cfb),VisuMZ[_0x2f2cf8(0x34e)][_0x2f2cf8(0x38d)](_0x3a8cfb);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2ca)]=VisuMZ[_0x3addb4(0x2ca)],VisuMZ[_0x3addb4(0x2ca)]=function(_0x503d3d){const _0x1e5b6b=_0x3addb4;VisuMZ['SkillsStatesCore']['ParseStateNotetags'][_0x1e5b6b(0x1d8)](this,_0x503d3d),VisuMZ[_0x1e5b6b(0x34e)][_0x1e5b6b(0x111)](_0x503d3d),VisuMZ[_0x1e5b6b(0x34e)][_0x1e5b6b(0x3ec)](_0x503d3d),VisuMZ[_0x1e5b6b(0x34e)][_0x1e5b6b(0x177)](_0x503d3d),VisuMZ[_0x1e5b6b(0x34e)][_0x1e5b6b(0x19a)](_0x503d3d);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2d1)]=function(_0x425d03){const _0x48696f=_0x3addb4,_0x42f9bd=_0x425d03[_0x48696f(0x1d4)];_0x42f9bd[_0x48696f(0x21f)](/<MP COST:[ ](\d+)>/i)&&(_0x425d03[_0x48696f(0x1af)]=Number(RegExp['$1'])),_0x42f9bd[_0x48696f(0x21f)](/<TP COST:[ ](\d+)>/i)&&(_0x425d03[_0x48696f(0x336)]=Number(RegExp['$1']));},VisuMZ[_0x3addb4(0x34e)]['Parse_Notetags_Skill_Sorting']=function(_0x27dedf){const _0x4bef30=_0x3addb4;if(!_0x27dedf)return;_0x27dedf[_0x4bef30(0x2a0)]=0x32;const _0x1ec69c=_0x27dedf[_0x4bef30(0x1d4)]||'';_0x1ec69c[_0x4bef30(0x21f)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x27dedf[_0x4bef30(0x2a0)]=Number(RegExp['$1']));},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2e1)]={},VisuMZ['SkillsStatesCore']['skillVisibleJS']={},VisuMZ[_0x3addb4(0x34e)]['Parse_Notetags_Skill_JS']=function(_0x37ea30){const _0x7b7377=_0x3addb4,_0x4450b8=_0x37ea30[_0x7b7377(0x1d4)];if(_0x4450b8[_0x7b7377(0x21f)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1e07c=String(RegExp['$1']),_0x54779c=_0x7b7377(0x266)['format'](_0x1e07c);VisuMZ[_0x7b7377(0x34e)][_0x7b7377(0x2e1)][_0x37ea30['id']]=new Function(_0x7b7377(0x3b6),_0x54779c);}if(_0x4450b8[_0x7b7377(0x21f)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0xf005f1=String(RegExp['$1']),_0x32a31d=_0x7b7377(0x10a)[_0x7b7377(0x1a1)](_0xf005f1);VisuMZ[_0x7b7377(0x34e)][_0x7b7377(0x192)][_0x37ea30['id']]=new Function(_0x7b7377(0x3b6),_0x32a31d);}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x111)]=function(_0x4bb155){const _0x49a978=_0x3addb4;_0x4bb155['categories']=['ALL',_0x49a978(0x38e)];const _0x1ccdff=_0x4bb155[_0x49a978(0x1d4)],_0x39ed70=_0x1ccdff['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x39ed70)for(const _0x55049c of _0x39ed70){_0x55049c[_0x49a978(0x21f)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x154c27=String(RegExp['$1'])[_0x49a978(0x12b)]()[_0x49a978(0x253)]()[_0x49a978(0x36b)](',');for(const _0x55e90b of _0x154c27){_0x4bb155['categories'][_0x49a978(0x2f6)](_0x55e90b[_0x49a978(0x253)]());}}if(_0x1ccdff['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x218646=RegExp['$1'][_0x49a978(0x36b)](/[\r\n]+/);for(const _0x4c4caf of _0x218646){_0x4bb155[_0x49a978(0x299)][_0x49a978(0x2f6)](_0x4c4caf[_0x49a978(0x12b)]()[_0x49a978(0x253)]());}}_0x1ccdff[_0x49a978(0x21f)](/<POSITIVE STATE>/i)&&_0x4bb155[_0x49a978(0x299)][_0x49a978(0x2f6)](_0x49a978(0x16c)),_0x1ccdff[_0x49a978(0x21f)](/<NEGATIVE STATE>/i)&&_0x4bb155[_0x49a978(0x299)][_0x49a978(0x2f6)](_0x49a978(0x213));},VisuMZ['SkillsStatesCore'][_0x3addb4(0x37c)]={},VisuMZ[_0x3addb4(0x34e)]['Parse_Notetags_State_PassiveJS']=function(_0x3e25e5){const _0x17deec=_0x3addb4,_0x34ba93=_0x3e25e5['note'];if(_0x34ba93[_0x17deec(0x21f)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x5f25bb=String(RegExp['$1']),_0x2db718=_0x17deec(0x3f0)['format'](_0x5f25bb);VisuMZ[_0x17deec(0x34e)][_0x17deec(0x37c)][_0x3e25e5['id']]=new Function(_0x17deec(0x39e),_0x2db718);}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3e0)]={},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1f3)]={},VisuMZ['SkillsStatesCore'][_0x3addb4(0x114)]={},VisuMZ['SkillsStatesCore'][_0x3addb4(0x116)]={},VisuMZ[_0x3addb4(0x34e)]['stateTpSlipDamageJS']={},VisuMZ[_0x3addb4(0x34e)]['stateTpSlipHealJS']={},VisuMZ[_0x3addb4(0x34e)]['Parse_Notetags_State_SlipEffectJS']=function(_0x4568fa){const _0x513385=_0x3addb4,_0x2427c6=_0x4568fa[_0x513385(0x1d4)],_0x414fa8=_0x513385(0x3ee);if(_0x2427c6[_0x513385(0x21f)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x2a8718=String(RegExp['$1']),_0x19d3e9=_0x414fa8['format'](_0x2a8718,_0x513385(0x204),-0x1,_0x513385(0x342));VisuMZ['SkillsStatesCore'][_0x513385(0x3e0)][_0x4568fa['id']]=new Function(_0x513385(0x1f6),_0x19d3e9);}else{if(_0x2427c6['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x49c75f=String(RegExp['$1']),_0x4902e8=_0x414fa8[_0x513385(0x1a1)](_0x49c75f,_0x513385(0x26b),0x1,_0x513385(0x342));VisuMZ[_0x513385(0x34e)][_0x513385(0x1f3)][_0x4568fa['id']]=new Function(_0x513385(0x1f6),_0x4902e8);}}if(_0x2427c6[_0x513385(0x21f)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x361f2c=String(RegExp['$1']),_0x123c2f=_0x414fa8[_0x513385(0x1a1)](_0x361f2c,_0x513385(0x204),-0x1,_0x513385(0x3d0));VisuMZ[_0x513385(0x34e)][_0x513385(0x114)][_0x4568fa['id']]=new Function(_0x513385(0x1f6),_0x123c2f);}else{if(_0x2427c6[_0x513385(0x21f)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x2498f6=String(RegExp['$1']),_0x2c0377=_0x414fa8[_0x513385(0x1a1)](_0x2498f6,_0x513385(0x26b),0x1,_0x513385(0x3d0));VisuMZ[_0x513385(0x34e)][_0x513385(0x116)][_0x4568fa['id']]=new Function(_0x513385(0x1f6),_0x2c0377);}}if(_0x2427c6['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x462c87=String(RegExp['$1']),_0x4620f8=_0x414fa8[_0x513385(0x1a1)](_0x462c87,_0x513385(0x204),-0x1,_0x513385(0x2bb));VisuMZ[_0x513385(0x34e)][_0x513385(0x2f3)][_0x4568fa['id']]=new Function(_0x513385(0x1f6),_0x4620f8);}else{if(_0x2427c6[_0x513385(0x21f)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x14892e=String(RegExp['$1']),_0x19a336=_0x414fa8[_0x513385(0x1a1)](_0x14892e,_0x513385(0x26b),0x1,_0x513385(0x2bb));VisuMZ[_0x513385(0x34e)][_0x513385(0x288)][_0x4568fa['id']]=new Function(_0x513385(0x1f6),_0x19a336);}}},VisuMZ['SkillsStatesCore'][_0x3addb4(0x182)]={},VisuMZ[_0x3addb4(0x34e)]['stateEraseJS']={},VisuMZ['SkillsStatesCore'][_0x3addb4(0x1e3)]={},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x19a)]=function(_0x538826){const _0x2db5ce=_0x3addb4,_0x200f51=_0x538826['note'],_0x51023b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x200f51['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x53d2ab=String(RegExp['$1']),_0x22a0c2=_0x51023b[_0x2db5ce(0x1a1)](_0x53d2ab);VisuMZ[_0x2db5ce(0x34e)][_0x2db5ce(0x182)][_0x538826['id']]=new Function(_0x2db5ce(0x1f6),_0x22a0c2);}if(_0x200f51[_0x2db5ce(0x21f)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x25db46=String(RegExp['$1']),_0x2296bd=_0x51023b[_0x2db5ce(0x1a1)](_0x25db46);VisuMZ[_0x2db5ce(0x34e)][_0x2db5ce(0x40b)][_0x538826['id']]=new Function(_0x2db5ce(0x1f6),_0x2296bd);}if(_0x200f51[_0x2db5ce(0x21f)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x518fba=String(RegExp['$1']),_0x399199=_0x51023b[_0x2db5ce(0x1a1)](_0x518fba);VisuMZ[_0x2db5ce(0x34e)]['stateExpireJS'][_0x538826['id']]=new Function(_0x2db5ce(0x1f6),_0x399199);}},VisuMZ['SkillsStatesCore'][_0x3addb4(0x287)]=function(){const _0x3a5ac9=_0x3addb4;if(!VisuMZ['SkillsStatesCore']['Settings']['States']['ActionEndUpdate'])return;for(const _0xdf916 of $dataStates){if(!_0xdf916)continue;_0xdf916[_0x3a5ac9(0x10f)]===0x4&&_0xdf916[_0x3a5ac9(0x1b2)]===0x1&&(_0xdf916[_0x3a5ac9(0x1b2)]=0x2);}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x344)]=function(_0x107682,_0x382162){const _0x4ee256=_0x3addb4;if(VisuMZ[_0x4ee256(0x344)])return VisuMZ[_0x4ee256(0x344)](_0x107682,_0x382162);let _0x41ea0a='';if($dataActors[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a='Actor-%1-%2'[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataClasses[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a='Class-%1-%2'[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataSkills[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a=_0x4ee256(0x373)[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataItems[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a=_0x4ee256(0x389)[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataWeapons['includes'](_0x107682))_0x41ea0a=_0x4ee256(0x31f)[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataArmors[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a=_0x4ee256(0x18c)[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataEnemies[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a=_0x4ee256(0x274)[_0x4ee256(0x1a1)](_0x107682['id'],_0x382162);if($dataStates[_0x4ee256(0x1b1)](_0x107682))_0x41ea0a='State-%1-%2'['format'](_0x107682['id'],_0x382162);return _0x41ea0a;},DataManager[_0x3addb4(0x3ed)]=function(_0xf19a01){const _0x4d3382=_0x3addb4;_0xf19a01=_0xf19a01['toUpperCase']()['trim'](),this[_0x4d3382(0x2ff)]=this[_0x4d3382(0x2ff)]||{};if(this[_0x4d3382(0x2ff)][_0xf19a01])return this[_0x4d3382(0x2ff)][_0xf19a01];for(const _0x21ee42 of $dataClasses){if(!_0x21ee42)continue;let _0x124427=_0x21ee42[_0x4d3382(0x165)];_0x124427=_0x124427['replace'](/\x1I\[(\d+)\]/gi,''),_0x124427=_0x124427['replace'](/\\I\[(\d+)\]/gi,''),this[_0x4d3382(0x2ff)][_0x124427[_0x4d3382(0x12b)]()['trim']()]=_0x21ee42['id'];}return this['_classIDs'][_0xf19a01]||0x0;},DataManager[_0x3addb4(0x289)]=function(_0x4a6fa3){const _0x561522=_0x3addb4;this[_0x561522(0x263)]=this[_0x561522(0x263)]||{};if(this[_0x561522(0x263)][_0x4a6fa3['id']])return this[_0x561522(0x263)][_0x4a6fa3['id']];this[_0x561522(0x263)][_0x4a6fa3['id']]=[_0x4a6fa3['stypeId']];if(_0x4a6fa3[_0x561522(0x1d4)][_0x561522(0x21f)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4195e8=JSON['parse']('['+RegExp['$1'][_0x561522(0x21f)](/\d+/g)+']');this[_0x561522(0x263)][_0x4a6fa3['id']]=this[_0x561522(0x263)][_0x4a6fa3['id']][_0x561522(0x13d)](_0x4195e8);}else{if(_0x4a6fa3[_0x561522(0x1d4)][_0x561522(0x21f)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x5df7c7=RegExp['$1'][_0x561522(0x36b)](',');for(const _0x48412b of _0x5df7c7){const _0x5731ee=DataManager['getStypeIdWithName'](_0x48412b);if(_0x5731ee)this[_0x561522(0x263)][_0x4a6fa3['id']][_0x561522(0x2f6)](_0x5731ee);}}}return this[_0x561522(0x263)][_0x4a6fa3['id']];},DataManager['getStypeIdWithName']=function(_0x25ac86){const _0x581ccf=_0x3addb4;_0x25ac86=_0x25ac86[_0x581ccf(0x12b)]()['trim'](),this[_0x581ccf(0x263)]=this[_0x581ccf(0x263)]||{};if(this[_0x581ccf(0x263)][_0x25ac86])return this['_stypeIDs'][_0x25ac86];for(let _0x47c9eb=0x1;_0x47c9eb<0x64;_0x47c9eb++){if(!$dataSystem[_0x581ccf(0x30a)][_0x47c9eb])continue;let _0x1b3adf=$dataSystem[_0x581ccf(0x30a)][_0x47c9eb][_0x581ccf(0x12b)]()['trim']();_0x1b3adf=_0x1b3adf[_0x581ccf(0x216)](/\x1I\[(\d+)\]/gi,''),_0x1b3adf=_0x1b3adf['replace'](/\\I\[(\d+)\]/gi,''),this[_0x581ccf(0x263)][_0x1b3adf]=_0x47c9eb;}return this[_0x581ccf(0x263)][_0x25ac86]||0x0;},DataManager['getSkillIdWithName']=function(_0x7a6925){const _0x517d13=_0x3addb4;_0x7a6925=_0x7a6925[_0x517d13(0x12b)]()['trim'](),this[_0x517d13(0x3f5)]=this[_0x517d13(0x3f5)]||{};if(this[_0x517d13(0x3f5)][_0x7a6925])return this[_0x517d13(0x3f5)][_0x7a6925];for(const _0x100b1a of $dataSkills){if(!_0x100b1a)continue;this[_0x517d13(0x3f5)][_0x100b1a[_0x517d13(0x165)]['toUpperCase']()[_0x517d13(0x253)]()]=_0x100b1a['id'];}return this['_skillIDs'][_0x7a6925]||0x0;},DataManager[_0x3addb4(0x383)]=function(_0x2e9582){const _0x59be6a=_0x3addb4;_0x2e9582=_0x2e9582[_0x59be6a(0x12b)]()[_0x59be6a(0x253)](),this['_stateIDs']=this[_0x59be6a(0x27d)]||{};if(this[_0x59be6a(0x27d)][_0x2e9582])return this[_0x59be6a(0x27d)][_0x2e9582];for(const _0x1e532a of $dataStates){if(!_0x1e532a)continue;this['_stateIDs'][_0x1e532a[_0x59be6a(0x165)][_0x59be6a(0x12b)]()[_0x59be6a(0x253)]()]=_0x1e532a['id'];}return this[_0x59be6a(0x27d)][_0x2e9582]||0x0;},DataManager[_0x3addb4(0x2e9)]=function(_0x4f11c4){const _0x5134d8=_0x3addb4;this[_0x5134d8(0x218)]=this['_stateMaxTurns']||{};if(this[_0x5134d8(0x218)][_0x4f11c4])return this['_stateMaxTurns'][_0x4f11c4];return $dataStates[_0x4f11c4][_0x5134d8(0x1d4)][_0x5134d8(0x21f)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x5134d8(0x218)][_0x4f11c4]=Number(RegExp['$1']):this[_0x5134d8(0x218)][_0x4f11c4]=VisuMZ['SkillsStatesCore'][_0x5134d8(0x221)][_0x5134d8(0x339)][_0x5134d8(0x105)],this[_0x5134d8(0x218)][_0x4f11c4];},DataManager[_0x3addb4(0x252)]=function(_0x449afa){const _0x4bf503=_0x3addb4;if(!_0x449afa)return{};this[_0x4bf503(0x1e2)]=this[_0x4bf503(0x1e2)]||{};if(this[_0x4bf503(0x1e2)][_0x449afa['id']]!==undefined)return this[_0x4bf503(0x1e2)][_0x449afa['id']];const _0x3ba6ee=_0x449afa[_0x4bf503(0x1d4)]||'',_0x534bcc={};{const _0x119726=_0x3ba6ee[_0x4bf503(0x21f)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x119726)for(const _0xa523c7 of _0x119726){_0xa523c7[_0x4bf503(0x21f)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x2ded5c=String(RegExp['$1']),_0x6b4dfe=String(RegExp['$2']);VisuMZ[_0x4bf503(0x34e)][_0x4bf503(0x24f)](_0x534bcc,_0x2ded5c,_0x6b4dfe);}}if(_0x3ba6ee[_0x4bf503(0x21f)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x439b04=String(RegExp['$1'])['split'](/[\r\n]+/)['remove']('');for(const _0x4183ed of _0x439b04){if(_0x4183ed[_0x4bf503(0x21f)](/(.*)[ ]>>>[ ](.*)/i)){let _0x36ad2c=String(RegExp['$1']),_0x4d753e=String(RegExp['$2']);VisuMZ[_0x4bf503(0x34e)][_0x4bf503(0x24f)](_0x534bcc,_0x36ad2c,_0x4d753e);}}}return this[_0x4bf503(0x1e2)][_0x449afa['id']]=_0x534bcc,this[_0x4bf503(0x1e2)][_0x449afa['id']];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x24f)]=function(_0x2f27ae,_0xf2c9ce,_0x8a1f0b){const _0x30167a=_0x3addb4;/^\d+$/[_0x30167a(0x395)](_0xf2c9ce)?_0xf2c9ce=Number(_0xf2c9ce):_0xf2c9ce=DataManager['getSkillIdWithName'](_0xf2c9ce),/^\d+$/['test'](_0x8a1f0b)?_0x8a1f0b=Number(_0x8a1f0b):_0x8a1f0b=DataManager[_0x30167a(0x31e)](_0x8a1f0b),_0x2f27ae[_0xf2c9ce]=_0x8a1f0b;},DataManager[_0x3addb4(0x398)]=function(_0x552d01){const _0x48eb6b=_0x3addb4;if(!DataManager[_0x48eb6b(0x3f8)](_0x552d01))return![];this[_0x48eb6b(0x1c4)]=this[_0x48eb6b(0x1c4)]||{};if(this[_0x48eb6b(0x1c4)][_0x552d01['id']]!==undefined)return this[_0x48eb6b(0x1c4)][_0x552d01['id']];this['_cache_isToggleSkill'][_0x552d01['id']]=![];const _0x2d7e20=_0x552d01[_0x48eb6b(0x1d4)]||'';if(_0x2d7e20[_0x48eb6b(0x21f)](/<TOGGLE>/i))this[_0x48eb6b(0x1c4)][_0x552d01['id']]=!![];else{if(_0x2d7e20[_0x48eb6b(0x21f)](/<INITIAL TOGGLE: ON>/i))this[_0x48eb6b(0x1c4)][_0x552d01['id']]=!![];else{if(_0x2d7e20[_0x48eb6b(0x21f)](/<INITIAL TOGGLE: OFF>/i))this[_0x48eb6b(0x1c4)][_0x552d01['id']]=!![];else _0x2d7e20[_0x48eb6b(0x21f)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(this[_0x48eb6b(0x1c4)][_0x552d01['id']]=!![]);}}return this[_0x48eb6b(0x33a)](_0x2d7e20)&&(this['_cache_isToggleSkill'][_0x552d01['id']]=![]),this[_0x48eb6b(0x1c4)][_0x552d01['id']];},DataManager[_0x3addb4(0x33a)]=function(_0x3d1593){const _0x56ca67=_0x3addb4;if(Imported[_0x56ca67(0x27a)]){const _0x3b733a=VisuMZ[_0x56ca67(0x186)][_0x56ca67(0x34d)];if(_0x3d1593[_0x56ca67(0x21f)](_0x3b733a[_0x56ca67(0x14d)]))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x3b733a[_0x56ca67(0x2b9)]))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x3b733a[_0x56ca67(0x256)]))return!![];}if(Imported[_0x56ca67(0x2de)]){const _0x5aa9f5=VisuMZ[_0x56ca67(0x28c)]['RegExp'];if(_0x3d1593['match'](_0x5aa9f5[_0x56ca67(0x2cc)]))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x5aa9f5['ForcedMatrix']))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x5aa9f5['LearnedMatrix']))return!![];}if(Imported[_0x56ca67(0x3df)]){const _0x4226e1=VisuMZ[_0x56ca67(0x10e)][_0x56ca67(0x34d)];if(_0x3d1593[_0x56ca67(0x21f)](_0x4226e1[_0x56ca67(0x2c6)]))return!![];}if(Imported[_0x56ca67(0x201)]){const _0x578525=VisuMZ['FieldSkills'][_0x56ca67(0x34d)];if(_0x3d1593[_0x56ca67(0x21f)](_0x578525[_0x56ca67(0x23d)]))return!![];}if(Imported[_0x56ca67(0x2c0)]){const _0x3f9d86=VisuMZ[_0x56ca67(0x18a)][_0x56ca67(0x34d)];if(_0x3d1593[_0x56ca67(0x21f)](_0x3f9d86[_0x56ca67(0x157)]))return!![];}if(Imported['VisuMZ_3_ItemConcoctSkills']){const _0x20cb89=VisuMZ['ItemConcoctSkills'][_0x56ca67(0x34d)];if(_0x3d1593[_0x56ca67(0x21f)](_0x20cb89['CanConcoct']))return!![];}if(Imported[_0x56ca67(0x2ab)]){const _0x531c41=VisuMZ[_0x56ca67(0x1d5)][_0x56ca67(0x34d)];if(_0x3d1593[_0x56ca67(0x21f)](_0x531c41[_0x56ca67(0x304)]))return!![];}if(Imported['VisuMZ_4_SkillContainers']){const _0x1cf52f=VisuMZ[_0x56ca67(0x1f4)]['RegExp'];if(_0x3d1593['match'](_0x1cf52f['KnownList']))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x1cf52f[_0x56ca67(0x1b7)]))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x1cf52f[_0x56ca67(0x200)]))return!![];if(_0x3d1593[_0x56ca67(0x21f)](_0x1cf52f[_0x56ca67(0x382)]))return!![];}return![];},DataManager['defaultToggleSkillSetting']=function(_0x43a8c9){const _0x2604a4=_0x3addb4,_0x3c1efa=_0x43a8c9?_0x43a8c9['note']||'':'';if(_0x3c1efa['match'](/<INITIAL TOGGLE: ON>/i))return!![];else{if(_0x3c1efa[_0x2604a4(0x21f)](/<INITIAL TOGGLE: OFF>/i))return![];}return VisuMZ['SkillsStatesCore'][_0x2604a4(0x221)][_0x2604a4(0x101)][_0x2604a4(0x137)];},DataManager['toggleExclusionGroups']=function(_0x591a78){const _0x40a297=_0x3addb4;if(!this[_0x40a297(0x3f8)](_0x591a78))return[];this['_cache_toggleExclusionGroups']=this[_0x40a297(0x3bc)]||{};if(this['_cache_toggleExclusionGroups'][_0x591a78['id']]!==undefined)return this[_0x40a297(0x3bc)][_0x591a78['id']];let _0x48c7be=[];const _0x542a96=_0x591a78[_0x40a297(0x1d4)]||'';return _0x542a96[_0x40a297(0x21f)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(_0x48c7be=String(RegExp['$1'])[_0x40a297(0x36b)](',')[_0x40a297(0x1b5)](_0x2c0320=>_0x2c0320[_0x40a297(0x12b)]()['trim']())),this[_0x40a297(0x3bc)][_0x591a78['id']]=_0x48c7be,this['_cache_toggleExclusionGroups'][_0x591a78['id']];},TextManager[_0x3addb4(0x191)]=VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x221)]['Toggles'][_0x3addb4(0x208)]??_0x3addb4(0x174),TextManager[_0x3addb4(0x39b)]=VisuMZ['SkillsStatesCore'][_0x3addb4(0x221)][_0x3addb4(0x101)]['ToggleOn']??_0x3addb4(0x149),TextManager[_0x3addb4(0x20d)]=VisuMZ[_0x3addb4(0x34e)]['Settings'][_0x3addb4(0x101)][_0x3addb4(0x28a)]??_0x3addb4(0x2c2),TextManager[_0x3addb4(0x400)]=VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x221)][_0x3addb4(0x101)][_0x3addb4(0x3b5)]??'back',ColorManager['getColorDataFromPluginParameters']=function(_0x235527,_0x310a3f){const _0x2b58e8=_0x3addb4;return _0x310a3f=String(_0x310a3f),this['_colorCache']=this[_0x2b58e8(0x1a7)]||{},_0x310a3f[_0x2b58e8(0x21f)](/#(.*)/i)?this[_0x2b58e8(0x1a7)][_0x235527]=_0x2b58e8(0x3da)[_0x2b58e8(0x1a1)](String(RegExp['$1'])):this[_0x2b58e8(0x1a7)][_0x235527]=this[_0x2b58e8(0x237)](Number(_0x310a3f)),this['_colorCache'][_0x235527];},ColorManager[_0x3addb4(0x1bf)]=function(_0x13a38e){const _0x148767=_0x3addb4;return _0x13a38e=String(_0x13a38e),_0x13a38e[_0x148767(0x21f)](/#(.*)/i)?_0x148767(0x3da)[_0x148767(0x1a1)](String(RegExp['$1'])):this[_0x148767(0x237)](Number(_0x13a38e));},ColorManager[_0x3addb4(0x385)]=function(_0x865134){const _0x4d14cc=_0x3addb4;if(typeof _0x865134===_0x4d14cc(0x354))_0x865134=$dataStates[_0x865134];const _0x5b32f8=_0x4d14cc(0x2fb)[_0x4d14cc(0x1a1)](_0x865134['id']);this[_0x4d14cc(0x1a7)]=this[_0x4d14cc(0x1a7)]||{};if(this[_0x4d14cc(0x1a7)][_0x5b32f8])return this['_colorCache'][_0x5b32f8];const _0x341bab=this[_0x4d14cc(0x1c8)](_0x865134);return this['getColorDataFromPluginParameters'](_0x5b32f8,_0x341bab);},ColorManager['retrieveStateColor']=function(_0x562b48){const _0x3cf301=_0x3addb4,_0x24b7fd=_0x562b48[_0x3cf301(0x1d4)];if(_0x24b7fd['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x24b7fd['match'](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x3cf301(0x221)][_0x3cf301(0x339)]['ColorPositive'];else return _0x24b7fd[_0x3cf301(0x21f)](/<NEGATIVE STATE>/i)?VisuMZ[_0x3cf301(0x34e)][_0x3cf301(0x221)]['States'][_0x3cf301(0x3c2)]:VisuMZ[_0x3cf301(0x34e)][_0x3cf301(0x221)][_0x3cf301(0x339)]['ColorNeutral'];}},ColorManager[_0x3addb4(0x316)]=function(){const _0x1dc27d=_0x3addb4,_0x5b890c=_0x1dc27d(0x228);this[_0x1dc27d(0x1a7)]=this[_0x1dc27d(0x1a7)]||{};if(this[_0x1dc27d(0x1a7)][_0x5b890c])return this['_colorCache'][_0x5b890c];const _0x404b24=VisuMZ[_0x1dc27d(0x34e)][_0x1dc27d(0x221)][_0x1dc27d(0x20b)][_0x1dc27d(0x380)];return this[_0x1dc27d(0x179)](_0x5b890c,_0x404b24);},ColorManager[_0x3addb4(0x279)]=function(){const _0x370c7d=_0x3addb4,_0x34a116='_stored_debuffColor';this[_0x370c7d(0x1a7)]=this[_0x370c7d(0x1a7)]||{};if(this[_0x370c7d(0x1a7)][_0x34a116])return this[_0x370c7d(0x1a7)][_0x34a116];const _0x20d666=VisuMZ[_0x370c7d(0x34e)][_0x370c7d(0x221)]['Buffs'][_0x370c7d(0x32e)];return this[_0x370c7d(0x179)](_0x34a116,_0x20d666);},SceneManager[_0x3addb4(0x32d)]=function(){const _0x52d3c0=_0x3addb4;return this[_0x52d3c0(0x319)]&&this['_scene'][_0x52d3c0(0x32c)]===Scene_Battle;},VisuMZ['SkillsStatesCore']['BattleManager_endAction']=BattleManager[_0x3addb4(0x3e8)],BattleManager[_0x3addb4(0x3e8)]=function(){const _0x92b8cc=_0x3addb4;this['updateStatesActionEnd'](),VisuMZ[_0x92b8cc(0x34e)][_0x92b8cc(0x2f4)]['call'](this);},BattleManager['updateStatesActionEnd']=function(){const _0x1335ba=_0x3addb4,_0x29e9fe=VisuMZ[_0x1335ba(0x34e)]['Settings'][_0x1335ba(0x339)];if(!_0x29e9fe)return;if(_0x29e9fe[_0x1335ba(0x3d1)]===![])return;if(!this[_0x1335ba(0x35e)])return;this['_subject'][_0x1335ba(0x370)]();},Game_Battler[_0x3addb4(0x29a)]['updateStatesActionEnd']=function(){const _0x1fce5a=_0x3addb4;if(BattleManager[_0x1fce5a(0x268)]!==_0x1fce5a(0x129))return;if(this[_0x1fce5a(0x235)]===Graphics[_0x1fce5a(0x314)])return;this[_0x1fce5a(0x235)]=Graphics['frameCount'];for(const _0x54cf75 of this['_states']){const _0x153f44=$dataStates[_0x54cf75];if(!_0x153f44)continue;if(_0x153f44[_0x1fce5a(0x1b2)]!==0x1)continue;this[_0x1fce5a(0x3c4)][_0x54cf75]>0x0&&this[_0x1fce5a(0x3c4)][_0x54cf75]--;}this[_0x1fce5a(0x283)](0x1);},Game_BattlerBase['prototype'][_0x3addb4(0x3cb)]=function(){const _0xa5d329=_0x3addb4,_0x2bfd7d=VisuMZ[_0xa5d329(0x34e)]['Settings'][_0xa5d329(0x339)];for(const _0x1209ed of this['_states']){const _0x173526=$dataStates[_0x1209ed];if(_0x2bfd7d&&_0x2bfd7d[_0xa5d329(0x3d1)]!==![]){if(_0x173526&&_0x173526[_0xa5d329(0x1b2)]===0x1)continue;}this[_0xa5d329(0x3c4)][_0x1209ed]>0x0&&this[_0xa5d329(0x3c4)][_0x1209ed]--;}},VisuMZ[_0x3addb4(0x34e)]['Game_Switches_onChange']=Game_Switches[_0x3addb4(0x29a)][_0x3addb4(0x138)],Game_Switches['prototype'][_0x3addb4(0x138)]=function(){const _0x321fe3=_0x3addb4;VisuMZ[_0x321fe3(0x34e)][_0x321fe3(0x1f9)][_0x321fe3(0x1d8)](this);const _0xbbb86=VisuMZ[_0x321fe3(0x34e)][_0x321fe3(0x221)]['PassiveStates'][_0x321fe3(0x2e7)]??!![];if(!_0xbbb86)return;if(SceneManager['isSceneBattle']())for(const _0x2858ae of BattleManager[_0x321fe3(0x3c3)]()){if(_0x2858ae)_0x2858ae[_0x321fe3(0x356)]();}},VisuMZ['SkillsStatesCore']['Game_Variables_onChange']=Game_Variables[_0x3addb4(0x29a)]['onChange'],Game_Variables[_0x3addb4(0x29a)]['onChange']=function(){const _0x5d9ae2=_0x3addb4;VisuMZ[_0x5d9ae2(0x34e)][_0x5d9ae2(0x1ad)][_0x5d9ae2(0x1d8)](this);const _0x2f0e45=VisuMZ['SkillsStatesCore'][_0x5d9ae2(0x221)][_0x5d9ae2(0x318)]['RefreshCacheVar']??!![];if(!_0x2f0e45)return;if(SceneManager[_0x5d9ae2(0x32d)]())for(const _0x1acb79 of BattleManager['allBattleMembers']()){if(_0x1acb79)_0x1acb79[_0x5d9ae2(0x356)]();}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3f1)]=Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x156)],Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x156)]=function(_0x1206cd){const _0x435260=_0x3addb4;VisuMZ[_0x435260(0x34e)]['Game_Action_applyItemUserEffect'][_0x435260(0x1d8)](this,_0x1206cd),this['applySkillsStatesCoreEffects'](_0x1206cd);},Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x1ed)]=function(_0xba0d63){const _0x5e3f90=_0x3addb4;this['applyStateCategoryRemovalEffects'](_0xba0d63),this[_0x5e3f90(0x3f9)](_0xba0d63),this['applyBuffTurnManipulationEffects'](_0xba0d63),this['applyDebuffTurnManipulationEffects'](_0xba0d63);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x2a3)]=Game_Action[_0x3addb4(0x29a)]['testApply'],Game_Action[_0x3addb4(0x29a)]['testApply']=function(_0x1a6cdf){const _0x5586fe=_0x3addb4;if(this[_0x5586fe(0x3cf)](_0x1a6cdf))return!![];return VisuMZ[_0x5586fe(0x34e)][_0x5586fe(0x2a3)][_0x5586fe(0x1d8)](this,_0x1a6cdf);},Game_Action[_0x3addb4(0x29a)]['testSkillStatesCoreNotetags']=function(_0x3ac82d){const _0x42c494=_0x3addb4;if(!this['item']())return;const _0xf5342b=this[_0x42c494(0x351)]()[_0x42c494(0x1d4)];if(_0xf5342b['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x1b30f6=String(RegExp['$1']);if(_0x3ac82d[_0x42c494(0x20a)](_0x1b30f6))return!![];}if(_0xf5342b[_0x42c494(0x21f)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x28a16c=Number(RegExp['$1']);if(_0x3ac82d[_0x42c494(0x233)](_0x28a16c))return!![];}else{if(_0xf5342b[_0x42c494(0x21f)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x52838d=DataManager[_0x42c494(0x383)](RegExp['$1']);if(_0x3ac82d[_0x42c494(0x233)](_0x52838d))return!![];}}return![];},Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x3aa)]=function(_0x1ab203){const _0x2fade8=_0x3addb4;if(_0x1ab203[_0x2fade8(0x369)]()[_0x2fade8(0x1d1)]<=0x0)return;const _0x5c8890=this[_0x2fade8(0x351)]()['note'];{const _0x3d95b0=_0x5c8890[_0x2fade8(0x21f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x3d95b0)for(const _0x531a25 of _0x3d95b0){_0x531a25[_0x2fade8(0x21f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x5c6cc1=String(RegExp['$1']);_0x1ab203[_0x2fade8(0x396)](_0x5c6cc1);}}{const _0x4ce9b3=_0x5c8890[_0x2fade8(0x21f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x4ce9b3)for(const _0x250607 of _0x4ce9b3){_0x250607[_0x2fade8(0x21f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x46f92f=String(RegExp['$1']),_0x4c2a3a=Number(RegExp['$2']);_0x1ab203['removeStatesByCategory'](_0x46f92f,_0x4c2a3a);}}},Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x3f9)]=function(_0x43ed2d){const _0x2db312=_0x3addb4,_0x26a783=this[_0x2db312(0x351)]()[_0x2db312(0x1d4)],_0xa0f8bb=_0x26a783[_0x2db312(0x21f)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0xa0f8bb)for(const _0x3311c5 of _0xa0f8bb){let _0x7d7705=0x0,_0x5a253f=0x0;if(_0x3311c5[_0x2db312(0x21f)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x7d7705=Number(RegExp['$1']),_0x5a253f=Number(RegExp['$2']);else _0x3311c5[_0x2db312(0x21f)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x7d7705=DataManager[_0x2db312(0x383)](RegExp['$1']),_0x5a253f=Number(RegExp['$2']));_0x43ed2d[_0x2db312(0x205)](_0x7d7705,_0x5a253f),this[_0x2db312(0x24c)](_0x43ed2d);}const _0x44113f=_0x26a783[_0x2db312(0x21f)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x44113f)for(const _0x213cdd of _0x44113f){let _0x26e55e=0x0,_0x3c2d17=0x0;if(_0x213cdd[_0x2db312(0x21f)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x26e55e=Number(RegExp['$1']),_0x3c2d17=Number(RegExp['$2']);else _0x213cdd[_0x2db312(0x21f)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x26e55e=DataManager['getStateIdWithName'](RegExp['$1']),_0x3c2d17=Number(RegExp['$2']));_0x43ed2d[_0x2db312(0x3d4)](_0x26e55e,_0x3c2d17),this[_0x2db312(0x24c)](_0x43ed2d);}},Game_Action[_0x3addb4(0x29a)]['applyBuffTurnManipulationEffects']=function(_0x33ee4c){const _0x4aa3e1=_0x3addb4,_0x314b0d=[_0x4aa3e1(0x20f),_0x4aa3e1(0x325),_0x4aa3e1(0x22c),_0x4aa3e1(0x3d5),_0x4aa3e1(0x1a0),_0x4aa3e1(0x346),_0x4aa3e1(0x24e),'LUK'],_0x2365aa=this[_0x4aa3e1(0x351)]()[_0x4aa3e1(0x1d4)],_0x2f2773=_0x2365aa[_0x4aa3e1(0x21f)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2f2773)for(const _0x38ca9f of _0x2f2773){_0x38ca9f['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x288d32=_0x314b0d['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x405841=Number(RegExp['$2']);_0x288d32>=0x0&&(_0x33ee4c[_0x4aa3e1(0x315)](_0x288d32,_0x405841),this[_0x4aa3e1(0x24c)](_0x33ee4c));}const _0xf77c3c=_0x2365aa[_0x4aa3e1(0x21f)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xf77c3c)for(const _0x430fe7 of _0x2f2773){_0x430fe7[_0x4aa3e1(0x21f)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1049e1=_0x314b0d[_0x4aa3e1(0x3b8)](String(RegExp['$1'])['toUpperCase']()),_0x14cf51=Number(RegExp['$2']);_0x1049e1>=0x0&&(_0x33ee4c[_0x4aa3e1(0x1ef)](_0x1049e1,_0x14cf51),this[_0x4aa3e1(0x24c)](_0x33ee4c));}},Game_Action[_0x3addb4(0x29a)]['applyDebuffTurnManipulationEffects']=function(_0x2f3b5e){const _0x1c2503=_0x3addb4,_0x44a553=[_0x1c2503(0x20f),_0x1c2503(0x325),_0x1c2503(0x22c),_0x1c2503(0x3d5),_0x1c2503(0x1a0),_0x1c2503(0x346),'AGI',_0x1c2503(0x2fe)],_0x5d829c=this[_0x1c2503(0x351)]()[_0x1c2503(0x1d4)],_0x5a08df=_0x5d829c[_0x1c2503(0x21f)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x5a08df)for(const _0x5c6081 of _0x5a08df){_0x5c6081[_0x1c2503(0x21f)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0xa026e1=_0x44a553[_0x1c2503(0x3b8)](String(RegExp['$1'])[_0x1c2503(0x12b)]()),_0x9f8501=Number(RegExp['$2']);_0xa026e1>=0x0&&(_0x2f3b5e[_0x1c2503(0x1f2)](_0xa026e1,_0x9f8501),this[_0x1c2503(0x24c)](_0x2f3b5e));}const _0x4ed935=_0x5d829c[_0x1c2503(0x21f)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4ed935)for(const _0x3323a6 of _0x5a08df){_0x3323a6['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x53d38b=_0x44a553['indexOf'](String(RegExp['$1'])[_0x1c2503(0x12b)]()),_0x5a1901=Number(RegExp['$2']);_0x53d38b>=0x0&&(_0x2f3b5e[_0x1c2503(0x2b6)](_0x53d38b,_0x5a1901),this[_0x1c2503(0x24c)](_0x2f3b5e));}},VisuMZ[_0x3addb4(0x34e)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x247)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x10213f=_0x3addb4;this['_cache']={},this[_0x10213f(0x240)](),VisuMZ[_0x10213f(0x34e)][_0x10213f(0x321)][_0x10213f(0x1d8)](this);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x240)]=function(){const _0x2352e0=_0x3addb4;this['_stateRetainType']='',this['_stateData']={},this[_0x2352e0(0x409)]={},this[_0x2352e0(0x223)]={},this[_0x2352e0(0x34f)]={};},Game_BattlerBase['prototype'][_0x3addb4(0x1e4)]=function(_0x59ba2e){const _0x5a5e75=_0x3addb4;return this[_0x5a5e75(0x22b)]=this[_0x5a5e75(0x22b)]||{},this[_0x5a5e75(0x22b)][_0x59ba2e]!==undefined;},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3dc)]=Game_BattlerBase['prototype'][_0x3addb4(0x356)],Game_BattlerBase[_0x3addb4(0x29a)]['refresh']=function(){const _0x6840ea=_0x3addb4;this[_0x6840ea(0x22b)]={},VisuMZ[_0x6840ea(0x34e)][_0x6840ea(0x3dc)][_0x6840ea(0x1d8)](this);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x281)]=Game_BattlerBase[_0x3addb4(0x29a)]['eraseState'],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x33d)]=function(_0x9d7c66){const _0x197130=_0x3addb4;let _0x36f2b1=this[_0x197130(0x233)](_0x9d7c66);VisuMZ[_0x197130(0x34e)]['Game_BattlerBase_eraseState'][_0x197130(0x1d8)](this,_0x9d7c66);if(_0x36f2b1&&!this[_0x197130(0x233)](_0x9d7c66))this[_0x197130(0x2fd)](_0x9d7c66);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2fd)]=function(_0x270c3f){const _0x385c74=_0x3addb4;this[_0x385c74(0x38a)](_0x270c3f),this[_0x385c74(0x271)](_0x270c3f);},VisuMZ[_0x3addb4(0x34e)]['Game_Battler_onBattleEnd']=Game_Battler[_0x3addb4(0x29a)]['onBattleEnd'],Game_Battler[_0x3addb4(0x29a)]['onBattleEnd']=function(){const _0x5df132=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x5df132(0x413)][_0x5df132(0x1d8)](this),this[_0x5df132(0x3fc)](),this[_0x5df132(0x217)]=0x0,this[_0x5df132(0x2dd)]=0x0;},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3fe)]=Game_BattlerBase[_0x3addb4(0x29a)]['resetStateCounts'],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3f6)]=function(_0x2e71c7){const _0x25fd89=_0x3addb4,_0x3f5a23=$dataStates[_0x2e71c7],_0x1ad782=this['stateTurns'](_0x2e71c7),_0x30f3a4=this[_0x25fd89(0x242)](_0x3f5a23)['toLowerCase']()['trim']();switch(_0x30f3a4){case'ignore':if(_0x1ad782<=0x0)this[_0x25fd89(0x23c)](_0x2e71c7);break;case _0x25fd89(0x3a1):this[_0x25fd89(0x23c)](_0x2e71c7);break;case _0x25fd89(0x3ca):this[_0x25fd89(0x23c)](_0x2e71c7),this['_stateTurns'][_0x2e71c7]=Math[_0x25fd89(0x1dd)](this[_0x25fd89(0x3c4)][_0x2e71c7],_0x1ad782);break;case _0x25fd89(0x22f):this['prepareResetStateCounts'](_0x2e71c7),this[_0x25fd89(0x3c4)][_0x2e71c7]+=_0x1ad782;break;default:this[_0x25fd89(0x23c)](_0x2e71c7);break;}if(this[_0x25fd89(0x233)](_0x2e71c7)){const _0x382e46=DataManager['stateMaximumTurns'](_0x2e71c7);this[_0x25fd89(0x3c4)][_0x2e71c7]=this[_0x25fd89(0x3c4)][_0x2e71c7][_0x25fd89(0x35d)](0x0,_0x382e46);}},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x23c)]=function(_0x5191c3){const _0x222867=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x222867(0x3fe)][_0x222867(0x1d8)](this,_0x5191c3);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x242)]=function(_0x33e4fa){const _0x158381=_0x3addb4,_0x1321a8=_0x33e4fa['note'];return _0x1321a8[_0x158381(0x21f)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x158381(0x221)][_0x158381(0x339)]['ReapplyRules'];},VisuMZ[_0x3addb4(0x34e)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x32a)],Game_BattlerBase[_0x3addb4(0x29a)]['overwriteBuffTurns']=function(_0x1415d7,_0x4d87a2){const _0x435d4b=_0x3addb4,_0x781e38=VisuMZ[_0x435d4b(0x34e)][_0x435d4b(0x221)][_0x435d4b(0x20b)][_0x435d4b(0x25a)],_0xfc5fe0=this[_0x435d4b(0x358)](_0x1415d7);switch(_0x781e38){case _0x435d4b(0x1da):if(_0xfc5fe0<=0x0)this['_buffTurns'][_0x1415d7]=_0x4d87a2;break;case _0x435d4b(0x3a1):this[_0x435d4b(0x2cf)][_0x1415d7]=_0x4d87a2;break;case _0x435d4b(0x3ca):this['_buffTurns'][_0x1415d7]=Math[_0x435d4b(0x1dd)](_0xfc5fe0,_0x4d87a2);break;case _0x435d4b(0x22f):this[_0x435d4b(0x2cf)][_0x1415d7]+=_0x4d87a2;break;default:VisuMZ[_0x435d4b(0x34e)][_0x435d4b(0x27e)][_0x435d4b(0x1d8)](this,_0x1415d7,_0x4d87a2);break;}const _0x26c957=VisuMZ[_0x435d4b(0x34e)][_0x435d4b(0x221)][_0x435d4b(0x20b)][_0x435d4b(0x105)];this[_0x435d4b(0x2cf)][_0x1415d7]=this['_buffTurns'][_0x1415d7][_0x435d4b(0x35d)](0x0,_0x26c957);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1e5)]=function(){const _0x568f1f=_0x3addb4;if(this[_0x568f1f(0x22b)][_0x568f1f(0x20e)]!==undefined)return this[_0x568f1f(0x22b)]['groupDefeat'];this[_0x568f1f(0x22b)][_0x568f1f(0x20e)]=![];const _0x1ab83a=this[_0x568f1f(0x369)]();for(const _0x1d7c31 of _0x1ab83a){if(!_0x1d7c31)continue;if(_0x1d7c31[_0x568f1f(0x1d4)][_0x568f1f(0x21f)](/<GROUP DEFEAT>/i)){this['_cache'][_0x568f1f(0x20e)]=!![];break;}}return this['_cache'][_0x568f1f(0x20e)];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1ec)]=Game_Unit['prototype'][_0x3addb4(0x128)],Game_Unit[_0x3addb4(0x29a)]['deadMembers']=function(){const _0x36524a=_0x3addb4;let _0x4323cc=VisuMZ['SkillsStatesCore'][_0x36524a(0x1ec)]['call'](this);return BattleManager[_0x36524a(0x2f0)]&&(_0x4323cc=_0x4323cc[_0x36524a(0x13d)](this[_0x36524a(0x14b)]()[_0x36524a(0x2af)](_0x4ede20=>_0x4ede20[_0x36524a(0x1e5)]()))),_0x4323cc;},VisuMZ[_0x3addb4(0x34e)]['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2c3)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2c3)]=function(){const _0x49e6a5=_0x3addb4;this[_0x49e6a5(0x185)]()!==''?this[_0x49e6a5(0x19f)]():(VisuMZ['SkillsStatesCore'][_0x49e6a5(0x33f)]['call'](this),this[_0x49e6a5(0x240)]());},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x2c3)]=function(){const _0x4eb26d=_0x3addb4;this[_0x4eb26d(0x1dc)]=this[_0x4eb26d(0x1dc)]||{},Game_Battler[_0x4eb26d(0x29a)][_0x4eb26d(0x2c3)]['call'](this);},Game_BattlerBase['prototype']['clearStatesWithStateRetain']=function(){const _0x221ecc=_0x3addb4,_0x49597a=this[_0x221ecc(0x369)]();for(const _0x28c6a7 of _0x49597a){if(_0x28c6a7&&this[_0x221ecc(0x117)](_0x28c6a7))this[_0x221ecc(0x33d)](_0x28c6a7['id']);}this['_cache']={};},Game_BattlerBase[_0x3addb4(0x29a)]['canClearState']=function(_0x2ed673){const _0x3011ef=_0x3addb4,_0x4c1379=this['getStateRetainType']();if(_0x4c1379!==''){const _0x52e8b6=_0x2ed673[_0x3011ef(0x1d4)];if(_0x4c1379===_0x3011ef(0x172)&&_0x52e8b6['match'](/<NO DEATH CLEAR>/i))return![];if(_0x4c1379===_0x3011ef(0x17d)&&_0x52e8b6[_0x3011ef(0x21f)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x3011ef(0x233)](_0x2ed673['id']);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x185)]=function(){return this['_stateRetainType'];},Game_BattlerBase['prototype']['setStateRetainType']=function(_0x2df3f7){const _0x439ea4=_0x3addb4;this[_0x439ea4(0x249)]=_0x2df3f7;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2e6)]=function(){const _0x5efe5b=_0x3addb4;this[_0x5efe5b(0x249)]='';},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x202)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1f5)],Game_BattlerBase[_0x3addb4(0x29a)]['die']=function(){const _0xc0e6d0=_0x3addb4;this[_0xc0e6d0(0x401)](_0xc0e6d0(0x172)),VisuMZ['SkillsStatesCore'][_0xc0e6d0(0x202)][_0xc0e6d0(0x1d8)](this),this['clearStateRetainType']();},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3bb)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x107)],Game_BattlerBase['prototype']['recoverAll']=function(){const _0x27ca65=_0x3addb4;this[_0x27ca65(0x401)](_0x27ca65(0x17d)),VisuMZ['SkillsStatesCore'][_0x27ca65(0x3bb)]['call'](this),this[_0x27ca65(0x2e6)]();},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3a5)]=function(_0x216ba6,_0x4c8846,_0x1dbd1d){return _0x4c8846;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3d7)]=function(_0x3d7b23){const _0x33a7c0=_0x3addb4;for(settings of VisuMZ[_0x33a7c0(0x34e)]['Settings'][_0x33a7c0(0x3fd)]){let _0x59a8b1=settings['CalcJS'][_0x33a7c0(0x1d8)](this,_0x3d7b23);_0x59a8b1=this[_0x33a7c0(0x3a5)](_0x3d7b23,_0x59a8b1,settings);if(!settings[_0x33a7c0(0x3ff)][_0x33a7c0(0x1d8)](this,_0x3d7b23,_0x59a8b1))return![];}return!![];},Game_BattlerBase[_0x3addb4(0x29a)]['paySkillCost']=function(_0x2e555f){const _0x113d4d=_0x3addb4;for(settings of VisuMZ[_0x113d4d(0x34e)][_0x113d4d(0x221)]['Costs']){let _0x5e7a86=settings[_0x113d4d(0x220)][_0x113d4d(0x1d8)](this,_0x2e555f);_0x5e7a86=this['adjustSkillCost'](_0x2e555f,_0x5e7a86,settings),settings[_0x113d4d(0x17f)][_0x113d4d(0x1d8)](this,_0x2e555f,_0x5e7a86);}},VisuMZ[_0x3addb4(0x34e)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x3addb4(0x29a)]['meetsSkillConditions'],Game_BattlerBase[_0x3addb4(0x29a)]['meetsSkillConditions']=function(_0x21fb0d){const _0x7cdf2=_0x3addb4;if(!_0x21fb0d)return![];if(!VisuMZ[_0x7cdf2(0x34e)][_0x7cdf2(0x26a)][_0x7cdf2(0x1d8)](this,_0x21fb0d))return![];if(!this[_0x7cdf2(0x26e)](_0x21fb0d))return![];if(!this[_0x7cdf2(0x404)](_0x21fb0d))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x21fb0d))return![];return!![];},Game_BattlerBase['prototype'][_0x3addb4(0x26e)]=function(_0x57f801){const _0x635e73=_0x3addb4;if(!this[_0x635e73(0x301)](_0x57f801))return![];return!![];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x301)]=function(_0x524330){const _0x5bd25f=_0x3addb4,_0x2f3be5=_0x524330[_0x5bd25f(0x1d4)];if(_0x2f3be5[_0x5bd25f(0x21f)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x413880=JSON[_0x5bd25f(0x1b4)]('['+RegExp['$1'][_0x5bd25f(0x21f)](/\d+/g)+']');for(const _0x2ad580 of _0x413880){if(!$gameSwitches[_0x5bd25f(0x1a8)](_0x2ad580))return![];}return!![];}if(_0x2f3be5[_0x5bd25f(0x21f)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53d3d4=JSON['parse']('['+RegExp['$1'][_0x5bd25f(0x21f)](/\d+/g)+']');for(const _0x525698 of _0x53d3d4){if(!$gameSwitches['value'](_0x525698))return![];}return!![];}if(_0x2f3be5[_0x5bd25f(0x21f)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34acc5=JSON[_0x5bd25f(0x1b4)]('['+RegExp['$1'][_0x5bd25f(0x21f)](/\d+/g)+']');for(const _0x18803c of _0x34acc5){if($gameSwitches[_0x5bd25f(0x1a8)](_0x18803c))return!![];}return![];}if(_0x2f3be5[_0x5bd25f(0x21f)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x279ee8=JSON[_0x5bd25f(0x1b4)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x42ac9f of _0x279ee8){if(!$gameSwitches[_0x5bd25f(0x1a8)](_0x42ac9f))return!![];}return![];}if(_0x2f3be5[_0x5bd25f(0x21f)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd2540d=JSON['parse']('['+RegExp['$1'][_0x5bd25f(0x21f)](/\d+/g)+']');for(const _0x137ce2 of _0xd2540d){if(!$gameSwitches[_0x5bd25f(0x1a8)](_0x137ce2))return!![];}return![];}if(_0x2f3be5[_0x5bd25f(0x21f)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4c63ce=JSON[_0x5bd25f(0x1b4)]('['+RegExp['$1'][_0x5bd25f(0x21f)](/\d+/g)+']');for(const _0x480929 of _0x4c63ce){if($gameSwitches['value'](_0x480929))return![];}return!![];}return!![];},Game_BattlerBase[_0x3addb4(0x29a)]['meetsSkillConditionsEnableJS']=function(_0x30f4f1){const _0x70d94b=_0x3addb4,_0x563255=_0x30f4f1[_0x70d94b(0x1d4)],_0x30fbc5=VisuMZ['SkillsStatesCore'][_0x70d94b(0x2e1)];return _0x30fbc5[_0x30f4f1['id']]?_0x30fbc5[_0x30f4f1['id']][_0x70d94b(0x1d8)](this,_0x30f4f1):!![];},Game_BattlerBase['prototype'][_0x3addb4(0x207)]=function(_0x4d06bb){const _0x1d33fb=_0x3addb4;return VisuMZ[_0x1d33fb(0x34e)][_0x1d33fb(0x221)]['Skills']['SkillConditionJS'][_0x1d33fb(0x1d8)](this,_0x4d06bb);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x2a6)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2ad)],Game_BattlerBase['prototype'][_0x3addb4(0x2ad)]=function(_0x2892cd){const _0xb5bca6=_0x3addb4;for(settings of VisuMZ[_0xb5bca6(0x34e)][_0xb5bca6(0x221)]['Costs']){if(settings[_0xb5bca6(0x3b7)][_0xb5bca6(0x12b)]()==='MP'){let _0x356314=settings[_0xb5bca6(0x220)][_0xb5bca6(0x1d8)](this,_0x2892cd);return _0x356314=this[_0xb5bca6(0x3a5)](_0x2892cd,_0x356314,settings),_0x356314;}}return VisuMZ[_0xb5bca6(0x34e)][_0xb5bca6(0x2a6)][_0xb5bca6(0x1d8)](this,_0x2892cd);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x340)]=Game_BattlerBase['prototype'][_0x3addb4(0x31b)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x31b)]=function(_0x5bc990){const _0x3ef93f=_0x3addb4;for(settings of VisuMZ[_0x3ef93f(0x34e)]['Settings'][_0x3ef93f(0x3fd)]){if(settings[_0x3ef93f(0x3b7)]['toUpperCase']()==='TP'){let _0x281f5b=settings[_0x3ef93f(0x220)][_0x3ef93f(0x1d8)](this,_0x5bc990);return _0x281f5b=this[_0x3ef93f(0x3a5)](_0x5bc990,_0x281f5b,settings),_0x281f5b;}}return VisuMZ[_0x3ef93f(0x34e)][_0x3ef93f(0x340)]['call'](this,_0x5bc990);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x11b)]=function(_0x3c0448){const _0x1f2778=_0x3addb4;if(typeof _0x3c0448===_0x1f2778(0x354))_0x3c0448=$dataStates[_0x3c0448];return this[_0x1f2778(0x369)]()['includes'](_0x3c0448);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x3a7)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x369)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x369)]=function(){const _0x3b83d6=_0x3addb4;let _0x5b6d1c=VisuMZ[_0x3b83d6(0x34e)][_0x3b83d6(0x3a7)][_0x3b83d6(0x1d8)](this);if($gameTemp[_0x3b83d6(0x2c4)])return _0x5b6d1c;return $gameTemp['_checkingPassiveStates']=!![],this[_0x3b83d6(0x352)](_0x5b6d1c),$gameTemp[_0x3b83d6(0x2c4)]=undefined,_0x5b6d1c;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x352)]=function(_0x2c7663){const _0x15760d=_0x3addb4,_0x58f2ee=this[_0x15760d(0x411)]();for(state of _0x58f2ee){if(!state)continue;if(!this[_0x15760d(0x13b)](state)&&_0x2c7663[_0x15760d(0x1b1)](state))continue;_0x2c7663[_0x15760d(0x2f6)](state);}_0x58f2ee['length']>0x0&&_0x2c7663[_0x15760d(0x227)]((_0x584ca1,_0x181af1)=>{const _0x2ae6e7=_0x15760d,_0x228b94=_0x584ca1['priority'],_0x2a75ee=_0x181af1[_0x2ae6e7(0x2fa)];if(_0x228b94!==_0x2a75ee)return _0x2a75ee-_0x228b94;return _0x584ca1-_0x181af1;});},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x13b)]=function(_0x5391de){const _0x29966a=_0x3addb4;return _0x5391de[_0x29966a(0x1d4)][_0x29966a(0x21f)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x3addb4(0x34e)]['Game_BattlerBase_traitsSet']=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2d5)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2d5)]=function(_0x768a5){const _0x4b4c73=_0x3addb4;this[_0x4b4c73(0x198)]=!![];let _0x502d06=VisuMZ[_0x4b4c73(0x34e)][_0x4b4c73(0x134)][_0x4b4c73(0x1d8)](this,_0x768a5);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x502d06;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x126)]=function(){const _0x4e9347=_0x3addb4;let _0x5ca3ba=[];this[_0x4e9347(0x28b)]=this[_0x4e9347(0x28b)]||{};for(;;){_0x5ca3ba=[];let _0xe854e0=!![];for(const _0x2e4243 of this['_cache'][_0x4e9347(0x411)]){const _0x120204=$dataStates[_0x2e4243];if(!_0x120204)continue;let _0x1c2ddd=this[_0x4e9347(0x28e)](_0x120204);this[_0x4e9347(0x28b)][_0x2e4243]!==_0x1c2ddd&&(_0xe854e0=![],this[_0x4e9347(0x28b)][_0x2e4243]=_0x1c2ddd);if(!_0x1c2ddd)continue;_0x5ca3ba[_0x4e9347(0x2f6)](_0x120204);}if(_0xe854e0)break;else{if(!this[_0x4e9347(0x198)])this[_0x4e9347(0x356)]();this[_0x4e9347(0x384)]();}}return _0x5ca3ba;},Game_BattlerBase['prototype']['meetsPassiveStateConditions']=function(_0x290739){const _0x1058d8=_0x3addb4;if(!this[_0x1058d8(0x350)](_0x290739))return![];if(!this[_0x1058d8(0x1c6)](_0x290739))return![];if(!this[_0x1058d8(0x414)](_0x290739))return![];if(!this[_0x1058d8(0x2a1)](_0x290739))return![];return!![];},Game_BattlerBase[_0x3addb4(0x29a)]['meetsPassiveStateConditionClasses']=function(_0xed7381){return!![];},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x350)]=function(_0x1a3a60){const _0x36c44c=_0x3addb4,_0x1cec0c=DataManager['getPassiveStateConditionClassesData'](_0x1a3a60);if(_0x1cec0c[_0x36c44c(0x2bf)]['length']>0x0){const _0x58283e=_0x1cec0c[_0x36c44c(0x2bf)];if(!_0x58283e['includes'](this[_0x36c44c(0x2bf)]()))return![];}if(_0x1cec0c[_0x36c44c(0x3dd)][_0x36c44c(0x1d1)]>0x0){const _0x544e20=_0x1cec0c[_0x36c44c(0x3dd)];let _0x11d388=[this[_0x36c44c(0x2bf)]()];Imported[_0x36c44c(0x123)]&&this[_0x36c44c(0x393)]&&(_0x11d388=this[_0x36c44c(0x393)]());if(_0x544e20['filter'](_0x4c729b=>_0x11d388[_0x36c44c(0x1b1)](_0x4c729b))[_0x36c44c(0x1d1)]<=0x0)return![];}return Game_BattlerBase[_0x36c44c(0x29a)][_0x36c44c(0x350)][_0x36c44c(0x1d8)](this,_0x1a3a60);},DataManager[_0x3addb4(0x27c)]=function(_0x4c8c7a){const _0xa6262b=_0x3addb4,_0x29fd94={'currentClass':[],'multiClass':[]};if(!_0x4c8c7a)return _0x29fd94;this[_0xa6262b(0x2c7)]=this[_0xa6262b(0x2c7)]||{};if(this[_0xa6262b(0x2c7)][_0x4c8c7a['id']]!==undefined)return this[_0xa6262b(0x2c7)][_0x4c8c7a['id']];const _0x3ac7fe=_0x4c8c7a[_0xa6262b(0x1d4)]||'';if(_0x3ac7fe[_0xa6262b(0x21f)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x1ed756=String(RegExp['$1'])[_0xa6262b(0x36b)](',')['map'](_0x2e8ea6=>_0x2e8ea6[_0xa6262b(0x253)]());_0x29fd94[_0xa6262b(0x2bf)]=VisuMZ['SkillsStatesCore']['ParseClassIDs'](_0x1ed756);}if(_0x3ac7fe[_0xa6262b(0x21f)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x59aae8=String(RegExp['$1'])[_0xa6262b(0x36b)](',')[_0xa6262b(0x1b5)](_0x3ab169=>_0x3ab169[_0xa6262b(0x253)]());_0x29fd94[_0xa6262b(0x3dd)]=VisuMZ[_0xa6262b(0x34e)][_0xa6262b(0x13e)](_0x59aae8);}return this[_0xa6262b(0x2c7)][_0x4c8c7a['id']]=_0x29fd94,this[_0xa6262b(0x2c7)][_0x4c8c7a['id']];},VisuMZ['SkillsStatesCore'][_0x3addb4(0x13e)]=function(_0x507cad){const _0x1d1f85=_0x3addb4,_0x23aae8=[];for(let _0xb8fb41 of _0x507cad){_0xb8fb41=(String(_0xb8fb41)||'')[_0x1d1f85(0x253)]();const _0xf4193f=/^\d+$/[_0x1d1f85(0x395)](_0xb8fb41);_0xf4193f?_0x23aae8['push'](Number(_0xb8fb41)):_0x23aae8[_0x1d1f85(0x2f6)](DataManager[_0x1d1f85(0x3ed)](_0xb8fb41));}return _0x23aae8[_0x1d1f85(0x1b5)](_0x1093f9=>$dataClasses[Number(_0x1093f9)])['remove'](null);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1c6)]=function(_0xc07194){const _0x2581f1=_0x3addb4,_0x304235=DataManager[_0x2581f1(0x2c5)](_0xc07194);if(_0x304235[_0x2581f1(0x154)]&&_0x304235[_0x2581f1(0x154)]['length']>0x0){const _0x44e167=_0x304235['allSwitchOn'];for(const _0x4e95f of _0x44e167){if(!$gameSwitches[_0x2581f1(0x1a8)](_0x4e95f))return![];}}if(_0x304235[_0x2581f1(0x3c8)]&&_0x304235[_0x2581f1(0x3c8)][_0x2581f1(0x1d1)]>0x0){const _0x3fb482=_0x304235[_0x2581f1(0x3c8)];let _0x465c32=!![];for(const _0x4367fe of _0x3fb482){if($gameSwitches['value'](_0x4367fe)){_0x465c32=![];break;}}if(_0x465c32)return![];}if(_0x304235[_0x2581f1(0x2c8)]&&_0x304235['allSwitchOff'][_0x2581f1(0x1d1)]>0x0){const _0x43124d=_0x304235[_0x2581f1(0x2c8)];for(const _0x181071 of _0x43124d){if($gameSwitches['value'](_0x181071))return![];}}if(_0x304235[_0x2581f1(0x375)]&&_0x304235[_0x2581f1(0x375)]['length']>0x0){const _0x593602=_0x304235[_0x2581f1(0x375)];let _0x25298b=!![];for(const _0x43503c of _0x593602){if(!$gameSwitches['value'](_0x43503c)){_0x25298b=![];break;}}if(_0x25298b)return![];}return!![];},DataManager[_0x3addb4(0x2c5)]=function(_0x481418){const _0x46c891=_0x3addb4;let _0x761453={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x481418)return _0x761453;const _0xe22f98=_0x481418['id'];this['_cache_getPassiveStateConditionSwitchData']=this[_0x46c891(0x3a0)]||{};if(this[_0x46c891(0x3a0)][_0xe22f98]!==undefined)return this['_cache_getPassiveStateConditionSwitchData'][_0xe22f98];const _0x3c1370=_0x481418[_0x46c891(0x1d4)]||'';return _0x3c1370['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x761453[_0x46c891(0x154)]=String(RegExp['$1'])['split'](',')['map'](_0x1da6c2=>Number(_0x1da6c2))),_0x3c1370[_0x46c891(0x21f)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x761453[_0x46c891(0x3c8)]=String(RegExp['$1'])['split'](',')[_0x46c891(0x1b5)](_0x1fcd36=>Number(_0x1fcd36))),_0x3c1370[_0x46c891(0x21f)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x761453[_0x46c891(0x2c8)]=String(RegExp['$1'])[_0x46c891(0x36b)](',')['map'](_0x409ae6=>Number(_0x409ae6))),_0x3c1370[_0x46c891(0x21f)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x761453[_0x46c891(0x375)]=String(RegExp['$1'])['split'](',')[_0x46c891(0x1b5)](_0x22031e=>Number(_0x22031e))),this['_cache_getPassiveStateConditionSwitchData'][_0xe22f98]=_0x761453,this[_0x46c891(0x3a0)][_0xe22f98];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x414)]=function(_0xba4341){const _0x1f7619=_0x3addb4,_0x446184=VisuMZ[_0x1f7619(0x34e)]['statePassiveConditionJS'];if(_0x446184[_0xba4341['id']]){this['_prevPassiveJsFrameCount']=this[_0x1f7619(0x217)]||0x0,this[_0x1f7619(0x2dd)]=this[_0x1f7619(0x2dd)]||0x0;this[_0x1f7619(0x217)]!==Graphics[_0x1f7619(0x314)]&&(this[_0x1f7619(0x217)]=Graphics[_0x1f7619(0x314)],this[_0x1f7619(0x323)]={},this[_0x1f7619(0x2dd)]=0x0);this['_prevPassiveJsCounter']++;if(this[_0x1f7619(0x2dd)]>=0x1e)return this[_0x1f7619(0x323)][_0xba4341['id']]??!![];else{const _0x51547c=_0x446184[_0xba4341['id']][_0x1f7619(0x1d8)](this,_0xba4341);return this['_prevPassiveJsResults'][_0xba4341['id']]=_0x51547c,_0x51547c;}}else return!![];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2a1)]=function(_0x4daa7d){const _0x41cd4e=_0x3addb4;return VisuMZ[_0x41cd4e(0x34e)][_0x41cd4e(0x221)][_0x41cd4e(0x318)][_0x41cd4e(0x158)][_0x41cd4e(0x1d8)](this,_0x4daa7d);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x411)]=function(){const _0x407951=_0x3addb4;if(this[_0x407951(0x1e4)](_0x407951(0x411)))return this[_0x407951(0x126)]();if(this[_0x407951(0x273)])return[];return this[_0x407951(0x273)]=!![],this[_0x407951(0x384)](),this[_0x407951(0x273)]=undefined,this[_0x407951(0x126)]();},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x384)]=function(){const _0x2101ae=_0x3addb4;this[_0x2101ae(0x273)]=!![],this[_0x2101ae(0x22b)]['passiveStates']=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x2101ae(0x14e)](),this[_0x2101ae(0x31d)](),Game_BattlerBase[_0x2101ae(0x22a)]&&this[_0x2101ae(0x2a8)](),this[_0x2101ae(0x22b)][_0x2101ae(0x411)]=this['_cache'][_0x2101ae(0x411)][_0x2101ae(0x227)]((_0x50ae6d,_0x5028b8)=>_0x50ae6d-_0x5028b8),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase['prototype'][_0x3addb4(0x2f5)]=function(){const _0x5d7e39=_0x3addb4;if(Imported[_0x5d7e39(0x310)])this[_0x5d7e39(0x2a4)]();},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x183)]=function(){return[];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x14e)]=function(){const _0x3474e1=_0x3addb4,_0x3759d3=this[_0x3474e1(0x22b)][_0x3474e1(0x411)]||[],_0x5445d0=this[_0x3474e1(0x183)]();this[_0x3474e1(0x22b)][_0x3474e1(0x411)]=_0x3759d3||[];for(const _0x1de455 of _0x5445d0){if(!_0x1de455)continue;const _0x1b8039=DataManager[_0x3474e1(0x3ab)](_0x1de455);for(const _0x1c4226 of _0x1b8039){this[_0x3474e1(0x22b)]['passiveStates'][_0x3474e1(0x2f6)](_0x1c4226);}}},DataManager[_0x3addb4(0x3ab)]=function(_0x44ef2f){const _0x308667=_0x3addb4;if(!_0x44ef2f)return[];const _0x3798df=VisuMZ['SkillsStatesCore'][_0x308667(0x344)](_0x44ef2f,_0x308667(0x234));this[_0x308667(0x15f)]=this[_0x308667(0x15f)]||{};if(this[_0x308667(0x15f)][_0x3798df]!==undefined)return this['_cache_getPassiveStatesFromObj'][_0x3798df];const _0x104fce=[],_0xda5908=_0x44ef2f[_0x308667(0x1d4)]||'',_0x419a2a=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x105aa5=_0xda5908[_0x308667(0x21f)](_0x419a2a);if(_0x105aa5)for(const _0x11682b of _0x105aa5){_0x11682b[_0x308667(0x21f)](_0x419a2a);const _0x5e3d38=String(RegExp['$1'])[_0x308667(0x36b)](',')[_0x308667(0x1b5)](_0x5e2de8=>_0x5e2de8['trim']());for(const _0x2f9332 of _0x5e3d38){const _0x5a391c=/^\d+$/[_0x308667(0x395)](_0x2f9332);let _0x34f13c=0x0;_0x5a391c?_0x34f13c=Number(_0x2f9332):_0x34f13c=DataManager[_0x308667(0x383)](_0x2f9332),_0x34f13c&&_0x104fce[_0x308667(0x2f6)](_0x34f13c);}}return this['_cache_getPassiveStatesFromObj'][_0x3798df]=_0x104fce,this[_0x308667(0x15f)][_0x3798df];},Game_BattlerBase['prototype'][_0x3addb4(0x31d)]=function(){const _0x3c80a3=_0x3addb4,_0x1f60dc=VisuMZ['SkillsStatesCore'][_0x3c80a3(0x221)][_0x3c80a3(0x318)][_0x3c80a3(0x2ee)];this['_cache']['passiveStates']=this[_0x3c80a3(0x22b)]['passiveStates'][_0x3c80a3(0x13d)](_0x1f60dc);},Game_BattlerBase[_0x3addb4(0x22a)]=![],Scene_Boot[_0x3addb4(0x29a)][_0x3addb4(0x261)]=function(){const _0x335fa0=_0x3addb4,_0x19f5ed=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x352a13 of _0x19f5ed){for(const _0x23b74 of _0x352a13){if(!_0x23b74)continue;const _0x5bb12b=_0x23b74[_0x335fa0(0x1d4)]||'';if(_0x5bb12b[_0x335fa0(0x21f)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase['AURA_SYSTEM_ENABLED']=!![];break;}}}},Game_BattlerBase['prototype'][_0x3addb4(0x2a8)]=function(){const _0x2f6193=_0x3addb4;if(this[_0x2f6193(0x2bd)]())return;if(!this['isAppeared']())return;const _0x43529d=this[_0x2f6193(0x22b)][_0x2f6193(0x411)]||[],_0x2565fd=this,_0x463acd=this[_0x2f6193(0x40f)]()[_0x2f6193(0x14a)](!![],_0x2565fd),_0x25fb7a=$gameParty['inBattle']()?this[_0x2f6193(0x3db)]()[_0x2f6193(0x14a)](![],_0x2565fd):[];this['_cache']['passiveStates']=_0x43529d||[],this[_0x2f6193(0x22b)][_0x2f6193(0x411)]=this[_0x2f6193(0x22b)][_0x2f6193(0x411)][_0x2f6193(0x13d)](_0x463acd)[_0x2f6193(0x13d)](_0x25fb7a);},Game_Unit[_0x3addb4(0x29a)][_0x3addb4(0x14a)]=function(_0x21411b,_0x3b4845){const _0x4c42a9=_0x3addb4;let _0x363bb7=[];const _0x5a72c3=this===$gameParty?this['battleMembers']():this[_0x4c42a9(0x14b)]();for(const _0xbd90ec of _0x5a72c3){if(!_0xbd90ec)continue;if(!_0xbd90ec['isAppeared']())continue;const _0x40ef76=_0xbd90ec[_0x4c42a9(0x183)]();for(const _0x3a750e of _0x40ef76){if(!_0x3a750e)continue;if(!VisuMZ['SkillsStatesCore'][_0x4c42a9(0x166)](_0x3a750e,_0x21411b,_0xbd90ec,_0x3b4845))continue;let _0x4f843e=DataManager[_0x4c42a9(0x1d6)](_0x3a750e,_0x21411b);for(const _0x41d460 of _0x4f843e){if(!VisuMZ[_0x4c42a9(0x34e)][_0x4c42a9(0x38c)](_0x41d460,_0x21411b,_0xbd90ec,_0x3b4845))continue;_0x363bb7[_0x4c42a9(0x2f6)](_0x41d460),!_0x3b4845[_0x4c42a9(0x233)](_0x41d460)&&_0x3b4845['setStateOrigin'](_0x41d460,_0xbd90ec);}}}return _0x363bb7;},DataManager[_0x3addb4(0x1d6)]=function(_0x2a0a47,_0x1007a5){const _0x328ba4=_0x3addb4;if(!_0x2a0a47)return[];const _0x2d4e94=_0x1007a5?_0x328ba4(0x341):'miasmaStateIDs',_0x4cc3ae=VisuMZ[_0x328ba4(0x34e)][_0x328ba4(0x344)](_0x2a0a47,_0x2d4e94);this[_0x328ba4(0x160)]=this['_cache_getAuraPassiveStatesFromObj']||{};if(this['_cache_getAuraPassiveStatesFromObj'][_0x4cc3ae]!==undefined)return this[_0x328ba4(0x160)][_0x4cc3ae];const _0x2c50b5=[],_0x529fe9=_0x2a0a47[_0x328ba4(0x1d4)]||'',_0x3902c5=_0x1007a5?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x2027d1=_0x529fe9[_0x328ba4(0x21f)](_0x3902c5);if(_0x2027d1)for(const _0x5b22be of _0x2027d1){_0x5b22be[_0x328ba4(0x21f)](_0x3902c5);const _0x3c9b38=String(RegExp['$1'])[_0x328ba4(0x36b)](',')['map'](_0x60e39b=>_0x60e39b[_0x328ba4(0x253)]());for(const _0x471632 of _0x3c9b38){const _0x58afc9=/^\d+$/[_0x328ba4(0x395)](_0x471632);let _0x2704a7=0x0;_0x58afc9?_0x2704a7=Number(_0x471632):_0x2704a7=DataManager[_0x328ba4(0x383)](_0x471632),_0x2704a7&&_0x2c50b5[_0x328ba4(0x2f6)](_0x2704a7);}}return this[_0x328ba4(0x160)][_0x4cc3ae]=_0x2c50b5,this[_0x328ba4(0x160)][_0x4cc3ae];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x166)]=function(_0x545ece,_0x4c5e9c,_0x454c63,_0x2b2d4c){const _0x43aeb7=_0x3addb4;if(!_0x545ece)return![];if(_0x545ece['autoRemovalTiming']!==undefined&&_0x545ece[_0x43aeb7(0x3ac)]!==undefined)return![];const _0x3b2320=_0x545ece['note']||'';if(!VisuMZ[_0x43aeb7(0x34e)][_0x43aeb7(0x40e)](_0x3b2320,_0x4c5e9c,_0x454c63,_0x2b2d4c))return![];return!![];},VisuMZ[_0x3addb4(0x34e)]['MeetsAuraStateConditions']=function(_0x50e1f5,_0xbf6892,_0x29f4d9,_0x4a9595){const _0x58a0ca=_0x3addb4,_0x32aaba=$dataStates[_0x50e1f5];if(!_0x32aaba)return![];const _0xf9de11=_0x32aaba['note']||'';if(!VisuMZ[_0x58a0ca(0x34e)][_0x58a0ca(0x40e)](_0xf9de11,_0xbf6892,_0x29f4d9,_0x4a9595))return![];return!![];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x40e)]=function(_0x42c325,_0x42c679,_0x39d163,_0x2abfc7){const _0x15d3cc=_0x3addb4;_0x42c325=_0x42c325||'';if(_0x39d163['isDead']()){if(_0x42c679&&_0x42c325[_0x15d3cc(0x21f)](/<ALLOW DEAD AURA>/i)){}else{if(!_0x42c679&&_0x42c325[_0x15d3cc(0x21f)](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x42c679&&_0x42c325['match'](/<DEAD AURA ONLY>/i)){}else{if(!_0x42c679&&_0x42c325['match'](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x42c679&&_0x42c325[_0x15d3cc(0x21f)](/<DEAD AURA ONLY>/i))return![];else{if(!_0x42c679&&_0x42c325[_0x15d3cc(0x21f)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x42c679){if(_0x42c325['match'](/<AURA NOT FOR USER>/i)){if(_0x39d163===_0x2abfc7)return![];}else{if(_0x42c325[_0x15d3cc(0x21f)](/<NOT USER AURA>/i)){if(_0x39d163===_0x2abfc7)return![];}}}return!![];},Game_BattlerBase[_0x3addb4(0x29a)]['stateTurns']=function(_0x28a2cf){const _0x457478=_0x3addb4;if(typeof _0x28a2cf!==_0x457478(0x354))_0x28a2cf=_0x28a2cf['id'];return this[_0x457478(0x3c4)][_0x28a2cf]||0x0;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x205)]=function(_0x587909,_0x4dc199){const _0x1d7c0b=_0x3addb4;if(typeof _0x587909!==_0x1d7c0b(0x354))_0x587909=_0x587909['id'];if(this['isStateAffected'](_0x587909)){const _0x1c66a9=DataManager['stateMaximumTurns'](_0x587909);this[_0x1d7c0b(0x3c4)][_0x587909]=_0x4dc199['clamp'](0x0,_0x1c66a9);if(this[_0x1d7c0b(0x3c4)][_0x587909]<=0x0)this[_0x1d7c0b(0x124)](_0x587909);}},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3d4)]=function(_0x588339,_0x3a5b40){const _0xe02572=_0x3addb4;if(typeof _0x588339!==_0xe02572(0x354))_0x588339=_0x588339['id'];this[_0xe02572(0x233)](_0x588339)&&(_0x3a5b40+=this[_0xe02572(0x29e)](_0x588339),this[_0xe02572(0x205)](_0x588339,_0x3a5b40));},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3b2)]=Game_BattlerBase['prototype'][_0x3addb4(0x178)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x178)]=function(_0x3d33b0){const _0x59f597=_0x3addb4,_0x4f7a15=this[_0x59f597(0x11d)][_0x3d33b0];VisuMZ[_0x59f597(0x34e)]['Game_BattlerBase_eraseBuff'][_0x59f597(0x1d8)](this,_0x3d33b0);if(_0x4f7a15>0x0)this['onEraseBuff'](_0x3d33b0);if(_0x4f7a15<0x0)this[_0x59f597(0x32f)](_0x3d33b0);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1cd)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x209)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x209)]=function(_0x3316cb){const _0x18788e=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x18788e(0x1cd)][_0x18788e(0x1d8)](this,_0x3316cb);if(!this[_0x18788e(0x2df)](_0x3316cb))this['eraseBuff'](_0x3316cb);},VisuMZ[_0x3addb4(0x34e)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3d9)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3d9)]=function(_0x186efc){const _0x446ac1=_0x3addb4;VisuMZ[_0x446ac1(0x34e)][_0x446ac1(0x13f)][_0x446ac1(0x1d8)](this,_0x186efc);if(!this[_0x446ac1(0x2df)](_0x186efc))this[_0x446ac1(0x178)](_0x186efc);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x239)]=function(_0x52e3e3){},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x32f)]=function(_0x521d7f){},Game_BattlerBase[_0x3addb4(0x29a)]['isMaxBuffAffected']=function(_0x2b2098){const _0x2c0750=_0x3addb4;return this['_buffs'][_0x2b2098]===VisuMZ[_0x2c0750(0x34e)][_0x2c0750(0x221)]['Buffs'][_0x2c0750(0x10d)];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2b4)]=function(_0x1cd284){const _0xc1ab32=_0x3addb4;return this[_0xc1ab32(0x11d)][_0x1cd284]===-VisuMZ[_0xc1ab32(0x34e)][_0xc1ab32(0x221)]['Buffs'][_0xc1ab32(0x1fb)];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x300)]=Game_BattlerBase['prototype'][_0x3addb4(0x1b6)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1b6)]=function(_0x50cd61,_0x10760b){const _0x453778=_0x3addb4;return _0x50cd61=_0x50cd61[_0x453778(0x35d)](-0x2,0x2),VisuMZ[_0x453778(0x34e)]['Game_BattlerBase_buffIconIndex'][_0x453778(0x1d8)](this,_0x50cd61,_0x10760b);},Game_BattlerBase['prototype'][_0x3addb4(0x2be)]=function(_0x1cb886){const _0x5bbd33=_0x3addb4,_0x58ed20=this[_0x5bbd33(0x11d)][_0x1cb886];return VisuMZ['SkillsStatesCore']['Settings'][_0x5bbd33(0x20b)][_0x5bbd33(0x307)][_0x5bbd33(0x1d8)](this,_0x1cb886,_0x58ed20);},Game_BattlerBase[_0x3addb4(0x29a)]['buffTurns']=function(_0x298a55){const _0x4d2e61=_0x3addb4;return this[_0x4d2e61(0x2cf)][_0x298a55]||0x0;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x40a)]=function(_0x26b362){return this['buffTurns'](_0x26b362);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x315)]=function(_0x59ff9c,_0x5d9707){const _0x18b423=_0x3addb4;if(this['isBuffAffected'](_0x59ff9c)){const _0xbc54bb=VisuMZ[_0x18b423(0x34e)][_0x18b423(0x221)][_0x18b423(0x20b)]['MaxTurns'];this[_0x18b423(0x2cf)][_0x59ff9c]=_0x5d9707[_0x18b423(0x35d)](0x0,_0xbc54bb);}},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1ef)]=function(_0x2a8426,_0x25052a){const _0x2d5a40=_0x3addb4;this['isBuffAffected'](_0x2a8426)&&(_0x25052a+=this[_0x2d5a40(0x358)](stateId),this[_0x2d5a40(0x315)](_0x2a8426,_0x25052a));},Game_BattlerBase['prototype'][_0x3addb4(0x1f2)]=function(_0x50a519,_0x565efd){const _0x1747ad=_0x3addb4;if(this[_0x1747ad(0x1c7)](_0x50a519)){const _0x3a4102=VisuMZ[_0x1747ad(0x34e)][_0x1747ad(0x221)][_0x1747ad(0x20b)][_0x1747ad(0x105)];this[_0x1747ad(0x2cf)][_0x50a519]=_0x565efd['clamp'](0x0,_0x3a4102);}},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2b6)]=function(_0x340869,_0x800ac1){const _0x348e01=_0x3addb4;this[_0x348e01(0x1c7)](_0x340869)&&(_0x800ac1+=this[_0x348e01(0x358)](stateId),this[_0x348e01(0x1f2)](_0x340869,_0x800ac1));},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2e4)]=function(_0x21c4b5){const _0x8c195d=_0x3addb4;if(typeof _0x21c4b5!==_0x8c195d(0x354))_0x21c4b5=_0x21c4b5['id'];return this[_0x8c195d(0x2f7)]=this[_0x8c195d(0x2f7)]||{},this[_0x8c195d(0x2f7)][_0x21c4b5]=this[_0x8c195d(0x2f7)][_0x21c4b5]||{},this[_0x8c195d(0x2f7)][_0x21c4b5];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x372)]=function(_0x1a40a6,_0x18d8b0){const _0x1c996a=_0x3addb4;if(typeof _0x1a40a6!==_0x1c996a(0x354))_0x1a40a6=_0x1a40a6['id'];const _0x260984=this[_0x1c996a(0x2e4)](_0x1a40a6);return _0x260984[_0x18d8b0];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3eb)]=function(_0x204c52,_0x4733b4,_0x1b92c0){const _0x2fd515=_0x3addb4;if(typeof _0x204c52!==_0x2fd515(0x354))_0x204c52=_0x204c52['id'];const _0x1114b4=this[_0x2fd515(0x2e4)](_0x204c52);_0x1114b4[_0x4733b4]=_0x1b92c0;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x38a)]=function(_0x48d120){const _0x3651ba=_0x3addb4;if(typeof _0x48d120!==_0x3651ba(0x354))_0x48d120=_0x48d120['id'];this[_0x3651ba(0x2f7)]=this[_0x3651ba(0x2f7)]||{},this['_stateData'][_0x48d120]={};},Game_BattlerBase['prototype'][_0x3addb4(0x18f)]=function(_0x571928){const _0x2a1893=_0x3addb4;if(typeof _0x571928!=='number')_0x571928=_0x571928['id'];return this[_0x2a1893(0x409)]=this['_stateDisplay']||{},this[_0x2a1893(0x409)][_0x571928]===undefined&&(this[_0x2a1893(0x409)][_0x571928]=''),this[_0x2a1893(0x409)][_0x571928];},Game_BattlerBase[_0x3addb4(0x29a)]['setStateDisplay']=function(_0x21894c,_0x36d1d8){const _0x5996bf=_0x3addb4;if(typeof _0x21894c!==_0x5996bf(0x354))_0x21894c=_0x21894c['id'];this['_stateDisplay']=this[_0x5996bf(0x409)]||{},this['_stateDisplay'][_0x21894c]=_0x36d1d8;},Game_BattlerBase[_0x3addb4(0x29a)]['clearStateDisplay']=function(_0x52adef){const _0x528191=_0x3addb4;if(typeof _0x52adef!=='number')_0x52adef=_0x52adef['id'];this[_0x528191(0x409)]=this[_0x528191(0x409)]||{},this[_0x528191(0x409)][_0x52adef]='';},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1b8)]=function(_0x465802){const _0x4d1ede=_0x3addb4;if(typeof _0x465802!==_0x4d1ede(0x354))_0x465802=_0x465802['id'];this['_stateOrigin']=this['_stateOrigin']||{},this[_0x4d1ede(0x223)][_0x465802]=this[_0x4d1ede(0x223)][_0x465802]||'user';const _0x50e63f=this[_0x4d1ede(0x223)][_0x465802];return this[_0x4d1ede(0x147)](_0x50e63f);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x303)]=function(_0x307f5a,_0x233e8d){const _0x31ad6e=_0x3addb4;this[_0x31ad6e(0x223)]=this['_stateOrigin']||{};const _0x3a34a1=_0x233e8d?this[_0x31ad6e(0x2ed)](_0x233e8d):this[_0x31ad6e(0x365)]();this[_0x31ad6e(0x223)][_0x307f5a]=_0x3a34a1;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x155)]=function(_0x6e5f24){const _0x2b85b4=_0x3addb4;this[_0x2b85b4(0x223)]=this[_0x2b85b4(0x223)]||{},delete this['_stateOrigin'][_0x6e5f24];},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3fc)]=function(){const _0x5eb002=_0x3addb4;this[_0x5eb002(0x223)]={};},Game_BattlerBase['prototype'][_0x3addb4(0x365)]=function(){const _0x380d29=_0x3addb4,_0x5cd176=this[_0x380d29(0x2c9)]();return this[_0x380d29(0x2ed)](_0x5cd176);},Game_BattlerBase[_0x3addb4(0x29a)]['getCurrentStateActiveUser']=function(){const _0x238c8d=_0x3addb4;if($gameParty[_0x238c8d(0x275)]()){if(BattleManager[_0x238c8d(0x35e)])return BattleManager[_0x238c8d(0x35e)];else{if(BattleManager[_0x238c8d(0x125)])return BattleManager[_0x238c8d(0x125)];}}else{const _0x37e3cf=SceneManager[_0x238c8d(0x319)];if(![Scene_Map,Scene_Item][_0x238c8d(0x1b1)](_0x37e3cf[_0x238c8d(0x32c)]))return $gameParty[_0x238c8d(0x2a2)]();}return this;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x2ed)]=function(_0x4ccbc1){const _0xda70ee=_0x3addb4;if(!_0x4ccbc1)return _0xda70ee(0x1c9);if(_0x4ccbc1['isActor']())return _0xda70ee(0x2b2)[_0xda70ee(0x1a1)](_0x4ccbc1['actorId']());else{const _0x26ecd5=_0xda70ee(0x3e6)[_0xda70ee(0x1a1)](_0x4ccbc1[_0xda70ee(0x311)]()),_0x75b8d9='<member-%1>'[_0xda70ee(0x1a1)](_0x4ccbc1[_0xda70ee(0x3bd)]()),_0xf57e74=_0xda70ee(0x215)[_0xda70ee(0x1a1)]($gameTroop[_0xda70ee(0x1a4)]());return _0xda70ee(0x3bf)[_0xda70ee(0x1a1)](_0x26ecd5,_0x75b8d9,_0xf57e74);}return _0xda70ee(0x1c9);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x147)]=function(_0x2d9889){const _0x4c2e0b=_0x3addb4;if(_0x2d9889===_0x4c2e0b(0x1c9))return this;else{if(_0x2d9889[_0x4c2e0b(0x21f)](/<actor-(\d+)>/i))return $gameActors[_0x4c2e0b(0x1ea)](Number(RegExp['$1']));else{if($gameParty[_0x4c2e0b(0x275)]()&&_0x2d9889[_0x4c2e0b(0x21f)](/<troop-(\d+)>/i)){const _0x39c28f=Number(RegExp['$1']);if(_0x39c28f===$gameTroop['getCurrentTroopUniqueID']()){if(_0x2d9889[_0x4c2e0b(0x21f)](/<member-(\d+)>/i))return $gameTroop[_0x4c2e0b(0x14b)]()[Number(RegExp['$1'])];}}if(_0x2d9889[_0x4c2e0b(0x21f)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3b1)]=function(_0x5878c2){const _0xbafd72=_0x3addb4;if(!_0x5878c2)return![];if(this['isEnemy']())return!![];this[_0xbafd72(0x34f)]=this['_skillToggle']||{};if(this['_skillToggle'][_0x5878c2['id']]===undefined){this[_0xbafd72(0x1db)]()?this[_0xbafd72(0x34f)][_0x5878c2['id']]=DataManager['defaultToggleSkillSetting'](_0x5878c2):this[_0xbafd72(0x34f)][_0x5878c2['id']]=!![];if(this['_skillToggle'][_0x5878c2['id']]&&DataManager[_0xbafd72(0x1fe)](_0x5878c2)[_0xbafd72(0x1d1)]>0x0){const _0x4769ee=DataManager[_0xbafd72(0x1fe)](_0x5878c2),_0x360e58=this['skills']()[_0xbafd72(0x2af)](_0x20c253=>_0x20c253!==_0x5878c2)[_0xbafd72(0x2af)](_0x347f1e=>DataManager[_0xbafd72(0x398)](_0x347f1e))[_0xbafd72(0x2af)](_0x4eb14b=>DataManager[_0xbafd72(0x1fe)](_0x4eb14b)[_0xbafd72(0x29f)](_0x1dd9d2=>_0x4769ee[_0xbafd72(0x1b1)](_0x1dd9d2)));_0x360e58[_0xbafd72(0x1d1)]>0x0&&(this[_0xbafd72(0x34f)][_0x5878c2['id']]=![]);}if(this['_skillToggle'][_0x5878c2['id']]){this[_0xbafd72(0x356)](),$gameParty[_0xbafd72(0x284)]();if($gameParty[_0xbafd72(0x275)]())$gameTroop['refreshAllMembers']();}}return this[_0xbafd72(0x34f)][_0x5878c2['id']];},Game_BattlerBase[_0x3addb4(0x29a)]['setSkillToggle']=function(_0x3ad250,_0x4e0f78){const _0x534564=_0x3addb4;if(!DataManager['isToggleSkill'](_0x3ad250))return;if(this[_0x534564(0x3e1)]())return;this['_skillToggle']=this[_0x534564(0x34f)]||{};if(_0x4e0f78&&DataManager[_0x534564(0x1fe)](_0x3ad250)['length']>0x0){const _0x38c412=DataManager[_0x534564(0x1fe)](_0x3ad250),_0x414081=this[_0x534564(0x243)]()[_0x534564(0x2af)](_0x4189c4=>DataManager[_0x534564(0x398)](_0x4189c4))[_0x534564(0x2af)](_0xea0f79=>DataManager[_0x534564(0x1fe)](_0xea0f79)[_0x534564(0x29f)](_0x10af6a=>_0x38c412[_0x534564(0x1b1)](_0x10af6a)));for(const _0x1d2fbd of _0x414081){if(!_0x1d2fbd)continue;this[_0x534564(0x34f)][_0x1d2fbd['id']]=![];}}this['_skillToggle'][_0x3ad250['id']]=_0x4e0f78,this['refresh'](),$gameParty[_0x534564(0x284)]();if($gameParty[_0x534564(0x275)]())$gameTroop[_0x534564(0x284)]();},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2a7)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1ae)],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x5da2f0){const _0x3bbb2f=_0x3addb4;if(DataManager[_0x3bbb2f(0x398)](_0x5da2f0)){if(this['isActor']()){if($gameParty[_0x3bbb2f(0x275)]()){if(this['isAutoBattle']())return![];if(this[_0x3bbb2f(0x1e7)]())return![];}if(this[_0x3bbb2f(0x3b1)](_0x5da2f0))return!![];}else return![];}return VisuMZ[_0x3bbb2f(0x34e)][_0x3bbb2f(0x2a7)][_0x3bbb2f(0x1d8)](this,_0x5da2f0);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2a9)]=Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x2e2)],Game_Action['prototype'][_0x3addb4(0x2e2)]=function(){const _0x9f6ef0=_0x3addb4;if(DataManager[_0x9f6ef0(0x398)](this[_0x9f6ef0(0x351)]()))return![];return VisuMZ[_0x9f6ef0(0x34e)][_0x9f6ef0(0x2a9)]['call'](this);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x34a)]=Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x23f)],Game_Battler['prototype']['addState']=function(_0x103ca9){const _0x476d80=_0x3addb4,_0x4d86aa=this[_0x476d80(0x255)](_0x103ca9);VisuMZ[_0x476d80(0x34e)][_0x476d80(0x34a)][_0x476d80(0x1d8)](this,_0x103ca9);if(_0x4d86aa&&this[_0x476d80(0x11b)]($dataStates[_0x103ca9])){this[_0x476d80(0x332)](_0x103ca9);;}},VisuMZ['SkillsStatesCore']['Game_Battler_isStateAddable']=Game_Battler[_0x3addb4(0x29a)]['isStateAddable'],Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x255)]=function(_0x4b5135){const _0x36e29d=_0x3addb4,_0x589f86=$dataStates[_0x4b5135];if(_0x589f86&&_0x589f86[_0x36e29d(0x1d4)]['match'](/<NO DEATH CLEAR>/i))return!this[_0x36e29d(0x25e)](_0x4b5135)&&!this[_0x36e29d(0x18d)](_0x4b5135)&&!this[_0x36e29d(0x2a5)]['isStateRemoved'](_0x4b5135);return VisuMZ[_0x36e29d(0x34e)]['Game_Battler_isStateAddable'][_0x36e29d(0x1d8)](this,_0x4b5135);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x1fa)],Game_BattlerBase[_0x3addb4(0x29a)]['addNewState']=function(_0x1d0621){const _0x539850=_0x3addb4;VisuMZ[_0x539850(0x34e)]['Game_BattlerBase_addNewState'][_0x539850(0x1d8)](this,_0x1d0621);if(_0x1d0621===this[_0x539850(0x2d3)]())while(this[_0x539850(0x26d)][_0x539850(0x2af)](_0x4c6bc5=>_0x4c6bc5===this[_0x539850(0x2d3)]())['length']>0x1){const _0x5e2cb2=this[_0x539850(0x26d)][_0x539850(0x3b8)](this[_0x539850(0x2d3)]());this[_0x539850(0x26d)][_0x539850(0x3c1)](_0x5e2cb2,0x1);}},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x332)]=function(_0xc9e2a5){const _0x5f2d83=_0x3addb4;this[_0x5f2d83(0x303)](_0xc9e2a5),this['removeOtherStatesOfSameCategory'](_0xc9e2a5),this[_0x5f2d83(0x23a)](_0xc9e2a5),this[_0x5f2d83(0x10b)](_0xc9e2a5),this[_0x5f2d83(0x39f)](_0xc9e2a5);},Game_Battler['prototype'][_0x3addb4(0x2fd)]=function(_0xbbe20a){const _0x1e6ad1=_0x3addb4;this['onEraseStateCustomJS'](_0xbbe20a),this[_0x1e6ad1(0x33b)](_0xbbe20a),Game_BattlerBase[_0x1e6ad1(0x29a)][_0x1e6ad1(0x2fd)][_0x1e6ad1(0x1d8)](this,_0xbbe20a);},Game_Battler[_0x3addb4(0x29a)]['removeStatesAuto']=function(_0x313011){const _0x83eaeb=_0x3addb4;for(const _0xd6b252 of this['states']()){this[_0x83eaeb(0x298)](_0xd6b252['id'])&&_0xd6b252[_0x83eaeb(0x1b2)]===_0x313011&&(this[_0x83eaeb(0x124)](_0xd6b252['id']),this['onExpireState'](_0xd6b252['id']),this[_0x83eaeb(0x394)](_0xd6b252['id']));}},Game_Battler[_0x3addb4(0x29a)]['onExpireState']=function(_0x34d052){const _0x48fb17=_0x3addb4;this[_0x48fb17(0x162)](_0x34d052);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x10b)]=function(_0x3bac6d){const _0x27d7fa=_0x3addb4;if(this[_0x27d7fa(0x286)]||this[_0x27d7fa(0x371)])return;const _0x576923=VisuMZ['SkillsStatesCore'][_0x27d7fa(0x182)];if(_0x576923[_0x3bac6d])_0x576923[_0x3bac6d][_0x27d7fa(0x1d8)](this,_0x3bac6d);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x21d)]=function(_0x420b15){const _0x2205ab=_0x3addb4;if(this[_0x2205ab(0x286)]||this['_tempBattler'])return;const _0x5aa684=VisuMZ[_0x2205ab(0x34e)][_0x2205ab(0x40b)];if(_0x5aa684[_0x420b15])_0x5aa684[_0x420b15]['call'](this,_0x420b15);},Game_Battler[_0x3addb4(0x29a)]['onExpireStateCustomJS']=function(_0x24c467){const _0x84941b=_0x3addb4;if(this[_0x84941b(0x286)]||this['_tempBattler'])return;const _0x311078=VisuMZ['SkillsStatesCore']['stateExpireJS'];if(_0x311078[_0x24c467])_0x311078[_0x24c467][_0x84941b(0x1d8)](this,_0x24c467);},Game_Battler[_0x3addb4(0x29a)]['onAddStateGlobalJS']=function(_0x3f216d){const _0xae8bee=_0x3addb4;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ['SkillsStatesCore'][_0xae8bee(0x221)]['States'][_0xae8bee(0x136)]['call'](this,_0x3f216d);}catch(_0xc55428){if($gameTemp[_0xae8bee(0x403)]())console[_0xae8bee(0x32b)](_0xc55428);}},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x33b)]=function(_0x151787){const _0xab3cef=_0x3addb4;if(this['_tempActor']||this[_0xab3cef(0x371)])return;try{VisuMZ[_0xab3cef(0x34e)]['Settings'][_0xab3cef(0x339)][_0xab3cef(0x353)][_0xab3cef(0x1d8)](this,_0x151787);}catch(_0xb86d80){if($gameTemp['isPlaytest']())console[_0xab3cef(0x32b)](_0xb86d80);}},Game_Battler[_0x3addb4(0x29a)]['onExpireStateGlobalJS']=function(_0x3065c6){const _0x5206cd=_0x3addb4;if(this['_tempActor']||this[_0x5206cd(0x371)])return;try{VisuMZ[_0x5206cd(0x34e)][_0x5206cd(0x221)][_0x5206cd(0x339)][_0x5206cd(0x3fa)][_0x5206cd(0x1d8)](this,_0x3065c6);}catch(_0x263f24){if($gameTemp[_0x5206cd(0x403)]())console[_0x5206cd(0x32b)](_0x263f24);}},Game_Battler[_0x3addb4(0x29a)]['statesByCategory']=function(_0x69fe9d){const _0x46bbc1=_0x3addb4;return _0x69fe9d=_0x69fe9d['toUpperCase']()[_0x46bbc1(0x253)](),this[_0x46bbc1(0x369)]()[_0x46bbc1(0x2af)](_0x36848f=>_0x36848f['categories'][_0x46bbc1(0x1b1)](_0x69fe9d));},Game_Battler['prototype'][_0x3addb4(0x22d)]=function(_0x441ea2,_0x49479c){const _0x4c3d45=_0x3addb4;_0x441ea2=_0x441ea2[_0x4c3d45(0x12b)]()[_0x4c3d45(0x253)](),_0x49479c=_0x49479c||0x0;const _0x56982a=this['statesByCategory'](_0x441ea2),_0x3600a7=[];for(const _0x14fba7 of _0x56982a){if(!_0x14fba7)continue;if(_0x49479c<=0x0)break;_0x3600a7[_0x4c3d45(0x2f6)](_0x14fba7['id']),this[_0x4c3d45(0x2a5)][_0x4c3d45(0x3c6)]=!![],_0x49479c--;}while(_0x3600a7[_0x4c3d45(0x1d1)]>0x0){this[_0x4c3d45(0x124)](_0x3600a7[_0x4c3d45(0x190)]());}},Game_Battler['prototype'][_0x3addb4(0x396)]=function(_0x166162,_0x5737ec){const _0x2c6e04=_0x3addb4;_0x166162=_0x166162['toUpperCase']()[_0x2c6e04(0x253)](),_0x5737ec=_0x5737ec||[];const _0x295a95=this[_0x2c6e04(0x16f)](_0x166162),_0x14e5ee=[];for(const _0x3d845e of _0x295a95){if(!_0x3d845e)continue;if(_0x5737ec['includes'](_0x3d845e))continue;_0x14e5ee[_0x2c6e04(0x2f6)](_0x3d845e['id']),this['_result'][_0x2c6e04(0x3c6)]=!![];}while(_0x14e5ee['length']>0x0){this[_0x2c6e04(0x124)](_0x14e5ee[_0x2c6e04(0x190)]());}},Game_Battler[_0x3addb4(0x29a)]['isStateCategoryAffected']=function(_0x1c9de7){return this['totalStateCategoryAffected'](_0x1c9de7)>0x0;},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x30e)]=function(_0xed52e3){const _0x9dc912=_0x3addb4;return this[_0x9dc912(0x2db)](_0xed52e3)>0x0;},Game_Battler[_0x3addb4(0x29a)]['totalStateCategoryAffected']=function(_0x2100ad){const _0x2b845f=_0x3addb4,_0x12a0f3=this['statesByCategory'](_0x2100ad)[_0x2b845f(0x2af)](_0x170518=>this[_0x2b845f(0x233)](_0x170518['id']));return _0x12a0f3['length'];},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x2db)]=function(_0xe147da){const _0x599a4e=_0x3addb4,_0x28fc22=this['statesByCategory'](_0xe147da);return _0x28fc22[_0x599a4e(0x1d1)];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x386)]=Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x25e)],Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x25e)]=function(_0x46665a){const _0x12a881=_0x3addb4,_0x40950f=$dataStates[_0x46665a];if(_0x40950f&&_0x40950f['categories']['length']>0x0)for(const _0x3da5be of _0x40950f[_0x12a881(0x299)]){if(this[_0x12a881(0x259)](_0x3da5be))return!![];}return VisuMZ[_0x12a881(0x34e)][_0x12a881(0x386)][_0x12a881(0x1d8)](this,_0x46665a);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x259)]=function(_0x41c018){const _0x3a39c6=_0x3addb4;let _0x130001=_0x3a39c6(0x2ac);if(this[_0x3a39c6(0x1e4)](_0x130001))return this[_0x3a39c6(0x22b)][_0x130001][_0x3a39c6(0x1b1)](_0x41c018);return this[_0x3a39c6(0x22b)][_0x130001]=this['makeResistedStateCategories'](),this[_0x3a39c6(0x22b)][_0x130001][_0x3a39c6(0x1b1)](_0x41c018);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x366)]=function(){const _0x5946bb=_0x3addb4,_0x11c3f0=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x4c0238=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x344930=[];for(const _0x7db2f8 of this[_0x5946bb(0x36c)]()){if(!_0x7db2f8)continue;const _0x1b3a26=_0x7db2f8[_0x5946bb(0x1d4)],_0x365434=_0x1b3a26['match'](_0x11c3f0);if(_0x365434)for(const _0x16f4f7 of _0x365434){_0x16f4f7[_0x5946bb(0x21f)](_0x11c3f0);const _0x192d66=String(RegExp['$1'])['split'](',')[_0x5946bb(0x1b5)](_0x2adc13=>String(_0x2adc13)['toUpperCase']()[_0x5946bb(0x253)]());_0x344930=_0x344930['concat'](_0x192d66);}if(_0x1b3a26['match'](_0x4c0238)){const _0x1b9d00=String(RegExp['$1'])[_0x5946bb(0x36b)](/[\r\n]+/)[_0x5946bb(0x1b5)](_0x2dd04e=>String(_0x2dd04e)[_0x5946bb(0x12b)]()[_0x5946bb(0x253)]());_0x344930=_0x344930[_0x5946bb(0x13d)](_0x1b9d00);}}return _0x344930;},Game_BattlerBase[_0x3addb4(0x29a)]['removeOtherStatesOfSameCategory']=function(_0x15f9cf){const _0x143dc3=_0x3addb4,_0x2004a8=$dataStates[_0x15f9cf];if(!_0x2004a8)return;const _0x21d678=_0x2004a8[_0x143dc3(0x1d4)]||'',_0x1e1850=_0x21d678[_0x143dc3(0x21f)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x1e1850){const _0x4c3bbe=[_0x2004a8];for(const _0x31648c of _0x1e1850){_0x31648c[_0x143dc3(0x21f)](/<REMOVE OTHER (.*) STATES>/i);const _0x5e554f=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x5e554f,_0x4c3bbe);}}},Game_Battler['prototype'][_0x3addb4(0x1eb)]=function(){const _0x3c7465=_0x3addb4;for(const _0x55b6fe of this[_0x3c7465(0x369)]()){if(!_0x55b6fe)continue;if(!this['isStateAffected'](_0x55b6fe['id']))continue;if(!_0x55b6fe['removeByDamage'])continue;if(this[_0x3c7465(0x272)](_0x55b6fe))continue;Math[_0x3c7465(0x388)](0x64)<_0x55b6fe['chanceByDamage']&&this[_0x3c7465(0x124)](_0x55b6fe['id']);}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3e4)]=Game_Action[_0x3addb4(0x29a)][_0x3addb4(0x1c2)],Game_Action[_0x3addb4(0x29a)]['executeHpDamage']=function(_0x4ef6c5,_0x371050){const _0xe9faae=_0x3addb4;$gameTemp[_0xe9faae(0x25b)]=this[_0xe9faae(0x351)](),$gameTemp['_bypassRemoveStateDamage_user']=this['subject'](),$gameTemp[_0xe9faae(0x104)]=_0x371050,VisuMZ[_0xe9faae(0x34e)]['Game_Action_executeHpDamage_bypassStateDmgRemoval']['call'](this,_0x4ef6c5,_0x371050),$gameTemp[_0xe9faae(0x25b)]=undefined,$gameTemp['_bypassRemoveStateDamage_user']=undefined,$gameTemp[_0xe9faae(0x104)]=undefined;},Game_Battler[_0x3addb4(0x29a)]['bypassRemoveStatesByDamage']=function(_0x56646a){const _0x414800=_0x3addb4;if($gameTemp[_0x414800(0x25b)]){const _0x515c78=$gameTemp['_bypassRemoveStateDamage_action'],_0x4fc1f5=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager[_0x414800(0x24a)](_0x56646a,_0x515c78,_0x4fc1f5,'action'))return!![];}if($gameTemp[_0x414800(0x399)]){const _0x47b4ae=$gameTemp['_bypassRemoveStateDamage_user'];if(_0x47b4ae[_0x414800(0x3cd)](_0x56646a))return!![];}if(this[_0x414800(0x333)](_0x56646a))return!![];return![];},Game_Battler['prototype'][_0x3addb4(0x3cd)]=function(_0x29e0ba){const _0x45dfa1=_0x3addb4,_0x3ea9bd=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x37a2d6 of this[_0x45dfa1(0x36c)]()){if(!_0x37a2d6)continue;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x29e0ba,_0x37a2d6,_0x3ea9bd,'attacker'))return!![];}return![];},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x333)]=function(_0x2f891d){const _0x385429=_0x3addb4,_0x459a44=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x6bcc02 of this[_0x385429(0x36c)]()){if(!_0x6bcc02)continue;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x2f891d,_0x6bcc02,_0x459a44,_0x385429(0x12d)))return!![];}return![];},DataManager[_0x3addb4(0x24a)]=function(_0xda9f1b,_0x4e5adf,_0x1eb56e,_0x6d1011){const _0x5b1e02=_0x3addb4,_0x1dd8fa=_0x5b1e02(0x13a)[_0x5b1e02(0x1a1)](_0x4e5adf['name'],_0x4e5adf['id'],_0x6d1011);this['_cache_CheckBypassRemoveStatesByDamage']=this[_0x5b1e02(0x378)]||{};if(this[_0x5b1e02(0x378)][_0x1dd8fa]!==undefined)return this['_cache_CheckBypassRemoveStatesByDamage'][_0x1dd8fa][_0x5b1e02(0x1b1)](_0xda9f1b['id']);const _0x476b1=[],_0x333221=_0x4e5adf[_0x5b1e02(0x1d4)]['match'](_0x1eb56e);if(_0x333221)for(const _0x390ed6 of _0x333221){_0x390ed6[_0x5b1e02(0x21f)](_0x1eb56e);const _0xc9d3e7=String(RegExp['$1'])[_0x5b1e02(0x36b)](',')[_0x5b1e02(0x1b5)](_0x1c236d=>_0x1c236d['trim']());for(let _0x4965ae of _0xc9d3e7){_0x4965ae=(String(_0x4965ae)||'')[_0x5b1e02(0x253)]();if(_0x4965ae[_0x5b1e02(0x21f)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x1d5a65=Math[_0x5b1e02(0x110)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x2a8ae1=Math[_0x5b1e02(0x1dd)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x46180c=_0x1d5a65;_0x46180c<=_0x2a8ae1;_0x46180c++)elements[_0x5b1e02(0x2f6)](_0x46180c);continue;}const _0x27ddd6=/^\d+$/[_0x5b1e02(0x395)](_0x4965ae);_0x27ddd6?entryID=Number(_0x4965ae):entryID=DataManager[_0x5b1e02(0x383)](_0x4965ae),entryID&&_0x476b1[_0x5b1e02(0x2f6)](entryID);}}return this[_0x5b1e02(0x378)][_0x1dd8fa]=_0x476b1,this[_0x5b1e02(0x378)][_0x1dd8fa][_0x5b1e02(0x1b1)](_0xda9f1b['id']);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x27f)]=Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x1aa)],Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x1aa)]=function(_0x3d02e5,_0x493c25){const _0x2d3b8c=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x2d3b8c(0x27f)]['call'](this,_0x3d02e5,_0x493c25),this[_0x2d3b8c(0x3e3)](_0x3d02e5)&&this[_0x2d3b8c(0x3c5)](_0x3d02e5,_0x493c25);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x348)]=function(_0x4020e7){},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x225)]=Game_Battler['prototype']['addDebuff'],Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x38b)]=function(_0x1f2420,_0x181f87){const _0x36e93e=_0x3addb4;VisuMZ[_0x36e93e(0x34e)][_0x36e93e(0x225)][_0x36e93e(0x1d8)](this,_0x1f2420,_0x181f87),this[_0x36e93e(0x1c7)](_0x1f2420)&&this[_0x36e93e(0x1ab)](_0x1f2420,_0x181f87);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x30c)]=function(){const _0x3940d0=_0x3addb4;for(let _0x1fc028=0x0;_0x1fc028<this['buffLength']();_0x1fc028++){if(this[_0x3940d0(0x376)](_0x1fc028)){const _0x22f3d5=this['_buffs'][_0x1fc028];this[_0x3940d0(0x11e)](_0x1fc028);if(_0x22f3d5>0x0)this['onExpireBuff'](_0x1fc028);if(_0x22f3d5<0x0)this[_0x3940d0(0x1e9)](_0x1fc028);}}},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x3c5)]=function(_0x5c48ee,_0x32c810){this['onAddBuffGlobalJS'](_0x5c48ee,_0x32c810);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x1ab)]=function(_0x3c9735,_0x41542d){const _0x2fb8da=_0x3addb4;this[_0x2fb8da(0x391)](_0x3c9735,_0x41542d);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x239)]=function(_0x1b9310){const _0x273d87=_0x3addb4;Game_BattlerBase['prototype'][_0x273d87(0x239)]['call'](this,_0x1b9310),this[_0x273d87(0x280)](_0x1b9310);},Game_Battler['prototype'][_0x3addb4(0x32f)]=function(_0x6cac30){const _0x1a5fce=_0x3addb4;Game_BattlerBase[_0x1a5fce(0x29a)][_0x1a5fce(0x32f)][_0x1a5fce(0x1d8)](this,_0x6cac30),this[_0x1a5fce(0x3d8)](_0x6cac30);},Game_Battler[_0x3addb4(0x29a)]['onExpireBuff']=function(_0x40db96){const _0x31d232=_0x3addb4;this[_0x31d232(0x406)](_0x40db96);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x1e9)]=function(_0x397e45){const _0x1acb90=_0x3addb4;this[_0x1acb90(0x1cb)](_0x397e45);},Game_Battler['prototype'][_0x3addb4(0x1a5)]=function(_0x489a64,_0x29fa8b){const _0x1ed771=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x1ed771(0x221)]['Buffs']['onAddBuffJS'][_0x1ed771(0x1d8)](this,_0x489a64,_0x29fa8b);},Game_Battler['prototype']['onAddDebuffGlobalJS']=function(_0x40a9f8,_0x262e85){const _0x3e43d2=_0x3addb4;VisuMZ[_0x3e43d2(0x34e)][_0x3e43d2(0x221)][_0x3e43d2(0x20b)][_0x3e43d2(0x17c)][_0x3e43d2(0x1d8)](this,_0x40a9f8,_0x262e85);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x280)]=function(_0x408b8e){const _0x29eff8=_0x3addb4;VisuMZ[_0x29eff8(0x34e)][_0x29eff8(0x221)][_0x29eff8(0x20b)][_0x29eff8(0x34b)][_0x29eff8(0x1d8)](this,_0x408b8e);},Game_BattlerBase[_0x3addb4(0x29a)][_0x3addb4(0x3d8)]=function(_0x3b0842){const _0x1156b4=_0x3addb4;VisuMZ[_0x1156b4(0x34e)][_0x1156b4(0x221)][_0x1156b4(0x20b)][_0x1156b4(0x26c)]['call'](this,_0x3b0842);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x406)]=function(_0x18beb4){const _0x8448fa=_0x3addb4;VisuMZ[_0x8448fa(0x34e)]['Settings'][_0x8448fa(0x20b)][_0x8448fa(0x118)][_0x8448fa(0x1d8)](this,_0x18beb4);},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x1cb)]=function(_0x4bed98){const _0x1e182c=_0x3addb4;VisuMZ[_0x1e182c(0x34e)]['Settings'][_0x1e182c(0x20b)][_0x1e182c(0x362)]['call'](this,_0x4bed98);},Game_Battler['prototype'][_0x3addb4(0x23a)]=function(_0x1f0c30){const _0x40517b=_0x3addb4,_0x359ecf=VisuMZ[_0x40517b(0x34e)],_0x49b84a=['stateHpSlipDamageJS','stateHpSlipHealJS',_0x40517b(0x114),'stateMpSlipHealJS',_0x40517b(0x2f3),'stateTpSlipHealJS'];for(const _0x117047 of _0x49b84a){_0x359ecf[_0x117047][_0x1f0c30]&&_0x359ecf[_0x117047][_0x1f0c30][_0x40517b(0x1d8)](this,_0x1f0c30);}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2ef)]=Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x1d7)],Game_Battler['prototype'][_0x3addb4(0x1d7)]=function(){const _0x2d3241=_0x3addb4;this[_0x2d3241(0x3a3)](),VisuMZ[_0x2d3241(0x34e)][_0x2d3241(0x2ef)][_0x2d3241(0x1d8)](this),this[_0x2d3241(0x313)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x313)]=function(){for(const _0x272cc3 of this['passiveStates']()){if(!_0x272cc3)continue;this['onAddStateMakeCustomSlipValues'](_0x272cc3['id']);}},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x3a3)]=function(){const _0x2bff60=_0x3addb4;for(const _0x1c7771 of this[_0x2bff60(0x369)]()){if(!_0x1c7771)continue;_0x1c7771['note']['match'](/<JS SLIP REFRESH>/i)&&this[_0x2bff60(0x23a)](_0x1c7771['id']);}},Game_Battler[_0x3addb4(0x29a)][_0x3addb4(0x347)]=function(){const _0x18e463=_0x3addb4;if(!this[_0x18e463(0x305)]())return;const _0x52debc=this[_0x18e463(0x369)]();for(const _0x1a350d of _0x52debc){if(!_0x1a350d)continue;this[_0x18e463(0x164)](_0x1a350d);}},Game_Battler['prototype'][_0x3addb4(0x164)]=function(_0x5bbfb9){const _0x440c78=_0x3addb4,_0xd17aea=this[_0x440c78(0x372)](_0x5bbfb9['id'],_0x440c78(0x342))||0x0,_0x30875f=-this['maxSlipDamage'](),_0x1541c9=Math[_0x440c78(0x1dd)](_0xd17aea,_0x30875f);if(_0x1541c9!==0x0){const _0x871ca9=this['_result'][_0x440c78(0x1d0)]||0x0;this[_0x440c78(0x226)](_0x1541c9),this['_result']['hpDamage']+=_0x871ca9;}const _0x4e2e27=this[_0x440c78(0x372)](_0x5bbfb9['id'],'slipMp')||0x0;if(_0x4e2e27!==0x0){const _0x415ba1=this[_0x440c78(0x2a5)][_0x440c78(0x1a6)]||0x0;this[_0x440c78(0x293)](_0x4e2e27),this[_0x440c78(0x2a5)]['mpDamage']+=_0x415ba1;}const _0x58533d=this['getStateData'](_0x5bbfb9['id'],'slipTp')||0x0;_0x58533d!==0x0&&this[_0x440c78(0x197)](_0x58533d);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x106)]=Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x30a)],Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x30a)]=function(){const _0x344bfc=_0x3addb4,_0x64ee15=VisuMZ[_0x344bfc(0x34e)][_0x344bfc(0x106)][_0x344bfc(0x1d8)](this),_0x3702b5=VisuMZ['SkillsStatesCore'][_0x344bfc(0x221)][_0x344bfc(0x290)];let _0x5908c3=_0x3702b5['HiddenSkillTypes'];return $gameParty[_0x344bfc(0x275)]()&&(_0x5908c3=_0x5908c3[_0x344bfc(0x13d)](_0x3702b5['BattleHiddenSkillTypes'])),_0x64ee15['filter'](_0x15c3a3=>!_0x5908c3[_0x344bfc(0x1b1)](_0x15c3a3));},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x28d)]=function(){const _0x556ad6=_0x3addb4;return this[_0x556ad6(0x243)]()['filter'](_0x3fa725=>this[_0x556ad6(0x135)](_0x3fa725));},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x135)]=function(_0x285910){const _0x569328=_0x3addb4;if(!this[_0x569328(0x30d)](_0x285910))return![];if(!_0x285910)return![];if(!this[_0x569328(0x21b)](_0x285910))return![];if(this[_0x569328(0x25d)](_0x285910))return![];return!![];},Game_Actor[_0x3addb4(0x29a)]['isSkillTypeMatchForUse']=function(_0x13eb02){const _0x41abe0=_0x3addb4,_0x501696=this[_0x41abe0(0x30a)](),_0x4baaaa=DataManager[_0x41abe0(0x289)](_0x13eb02),_0x284170=_0x501696[_0x41abe0(0x2af)](_0x49d435=>_0x4baaaa[_0x41abe0(0x1b1)](_0x49d435));return _0x284170[_0x41abe0(0x1d1)]>0x0;},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x25d)]=function(_0x247afe){const _0x35b62a=_0x3addb4;if(!VisuMZ['SkillsStatesCore']['CheckVisibleBattleNotetags'](this,_0x247afe))return!![];if(!VisuMZ[_0x35b62a(0x34e)][_0x35b62a(0x175)](this,_0x247afe))return!![];if(!VisuMZ[_0x35b62a(0x34e)]['CheckVisibleSkillNotetags'](this,_0x247afe))return!![];return![];},Game_Actor[_0x3addb4(0x29a)]['passiveStateObjects']=function(){const _0x4b1edc=_0x3addb4;let _0x5c04c7=[this[_0x4b1edc(0x1ea)](),this[_0x4b1edc(0x2bf)]()];_0x5c04c7=_0x5c04c7[_0x4b1edc(0x13d)](this[_0x4b1edc(0x2d8)]()['filter'](_0x400c0c=>_0x400c0c));for(const _0x170907 of this[_0x4b1edc(0x2b8)]){const _0x1db055=$dataSkills[_0x170907];if(!_0x1db055)continue;if(DataManager[_0x4b1edc(0x398)](_0x1db055)){if(!this[_0x4b1edc(0x3b1)](_0x1db055))continue;}_0x5c04c7[_0x4b1edc(0x2f6)](_0x1db055);}return _0x5c04c7;},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x31d)]=function(){const _0x1d4d07=_0x3addb4;Game_Battler[_0x1d4d07(0x29a)][_0x1d4d07(0x31d)][_0x1d4d07(0x1d8)](this);const _0x845226=VisuMZ[_0x1d4d07(0x34e)][_0x1d4d07(0x221)][_0x1d4d07(0x318)]['Actor'];this[_0x1d4d07(0x22b)][_0x1d4d07(0x411)]=this['_cache'][_0x1d4d07(0x411)]['concat'](_0x845226);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x2e5)]=Game_Actor[_0x3addb4(0x29a)]['learnSkill'],Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x244)]=function(_0xb22290){const _0x408676=_0x3addb4;VisuMZ['SkillsStatesCore']['Game_Actor_learnSkill'][_0x408676(0x1d8)](this,_0xb22290),this[_0x408676(0x22b)]={},this[_0x408676(0x411)]();},VisuMZ[_0x3addb4(0x34e)]['Game_Actor_forgetSkill']=Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x338)],Game_Actor['prototype'][_0x3addb4(0x338)]=function(_0x11719d){const _0xccfa87=_0x3addb4;VisuMZ[_0xccfa87(0x34e)][_0xccfa87(0x34c)][_0xccfa87(0x1d8)](this,_0x11719d),this['_cache']={},this[_0xccfa87(0x411)]();},Game_Actor[_0x3addb4(0x29a)][_0x3addb4(0x349)]=function(){const _0x147f83=_0x3addb4;return VisuMZ[_0x147f83(0x34e)]['Settings'][_0x147f83(0x339)]['TurnEndOnMap']??0x14;},Game_Enemy['prototype'][_0x3addb4(0x183)]=function(){const _0x10283c=_0x3addb4;let _0x195c46=[this[_0x10283c(0xfe)]()];return _0x195c46['concat'](this[_0x10283c(0x243)]());},Game_Enemy[_0x3addb4(0x29a)][_0x3addb4(0x31d)]=function(){const _0x17dff5=_0x3addb4;Game_Battler[_0x17dff5(0x29a)][_0x17dff5(0x31d)][_0x17dff5(0x1d8)](this);const _0x29cc3c=VisuMZ[_0x17dff5(0x34e)][_0x17dff5(0x221)][_0x17dff5(0x318)][_0x17dff5(0x3b0)];this[_0x17dff5(0x22b)]['passiveStates']=this['_cache']['passiveStates']['concat'](_0x29cc3c);},Game_Enemy[_0x3addb4(0x29a)][_0x3addb4(0x243)]=function(){const _0x24f8e6=_0x3addb4,_0x19da16=[];for(const _0x329454 of this['enemy']()[_0x24f8e6(0x15b)]){const _0xa1d7c3=$dataSkills[_0x329454['skillId']];if(_0xa1d7c3&&!_0x19da16['includes'](_0xa1d7c3))_0x19da16[_0x24f8e6(0x2f6)](_0xa1d7c3);}return _0x19da16;},Game_Enemy[_0x3addb4(0x29a)]['meetsStateCondition']=function(_0x41fe2c){return this['hasState']($dataStates[_0x41fe2c]);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x176)]=Game_Unit['prototype']['isAllDead'],Game_Unit[_0x3addb4(0x29a)][_0x3addb4(0x3e5)]=function(){const _0x285365=_0x3addb4;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x285365(0x34e)][_0x285365(0x176)][_0x285365(0x1d8)](this);},Game_Unit[_0x3addb4(0x29a)][_0x3addb4(0x2b5)]=function(){const _0x3123d8=this['aliveMembers']();for(const _0x1193e8 of _0x3123d8){if(!_0x1193e8['isGroupDefeatStateAffected']())return![];}return!![];},Game_Unit[_0x3addb4(0x29a)][_0x3addb4(0x284)]=function(){const _0x492b99=_0x3addb4;for(const _0x30380d of this[_0x492b99(0x14b)]()){if(!_0x30380d)continue;_0x30380d[_0x492b99(0x356)]();}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x127)]=Game_Player[_0x3addb4(0x29a)][_0x3addb4(0x356)],Game_Player['prototype'][_0x3addb4(0x356)]=function(){const _0x4b4b17=_0x3addb4;VisuMZ[_0x4b4b17(0x34e)][_0x4b4b17(0x127)][_0x4b4b17(0x1d8)](this),$gameParty[_0x4b4b17(0x284)](),$gameParty[_0x4b4b17(0x275)]()&&$gameTroop[_0x4b4b17(0x284)]();},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3f4)]=Game_Troop[_0x3addb4(0x29a)][_0x3addb4(0x1ba)],Game_Troop[_0x3addb4(0x29a)][_0x3addb4(0x1ba)]=function(_0x2e3382){const _0x14093f=_0x3addb4;VisuMZ[_0x14093f(0x34e)][_0x14093f(0x3f4)][_0x14093f(0x1d8)](this,_0x2e3382),this[_0x14093f(0x1d9)]();},Game_Troop[_0x3addb4(0x29a)][_0x3addb4(0x1d9)]=function(){const _0x4b9a14=_0x3addb4;this[_0x4b9a14(0x194)]=Graphics['frameCount'];},Game_Troop['prototype'][_0x3addb4(0x1a4)]=function(){const _0x29f231=_0x3addb4;return this[_0x29f231(0x194)]=this['_currentTroopUniqueID']||Graphics['frameCount'],this[_0x29f231(0x194)];},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x329)]=function(){const _0x3fe72d=_0x3addb4;if(ConfigManager[_0x3fe72d(0x196)]&&ConfigManager[_0x3fe72d(0x1fd)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x3fe72d(0x21f)](/LOWER/i);else Scene_ItemBase[_0x3fe72d(0x29a)]['isRightInputMode'][_0x3fe72d(0x1d8)](this);}},Scene_Skill[_0x3addb4(0x29a)]['isRightInputMode']=function(){const _0xf514ae=_0x3addb4;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0xf514ae(0x285)]!==undefined)return ConfigManager['uiInputPosition'];else return this[_0xf514ae(0x390)]()?this[_0xf514ae(0x2dc)]()[_0xf514ae(0x21f)](/RIGHT/i):Scene_ItemBase[_0xf514ae(0x29a)][_0xf514ae(0x195)][_0xf514ae(0x1d8)](this);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x2dc)]=function(){const _0x4ce5a1=_0x3addb4;return VisuMZ['SkillsStatesCore']['Settings'][_0x4ce5a1(0x290)][_0x4ce5a1(0x3fb)];},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x25f)]=function(){const _0x3d98bc=_0x3addb4;return this[_0x3d98bc(0x1a2)]&&this[_0x3d98bc(0x1a2)][_0x3d98bc(0x25f)]();},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x390)]=function(){const _0x529287=_0x3addb4;return VisuMZ[_0x529287(0x34e)][_0x529287(0x221)][_0x529287(0x290)]['EnableLayout'];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2ae)]=Scene_Skill['prototype']['helpWindowRect'],Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x22e)]=function(){return this['isUseSkillsStatesCoreUpdatedLayout']()?this['helpWindowRectSkillsStatesCore']():VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect']['call'](this);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x1a3)]=function(){const _0x1d6232=_0x3addb4,_0x3b0596=0x0,_0x4fd398=this['helpAreaTop'](),_0x5da9a9=Graphics[_0x1d6232(0x23e)],_0x45cc23=this[_0x1d6232(0x2cb)]();return new Rectangle(_0x3b0596,_0x4fd398,_0x5da9a9,_0x45cc23);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x410)]=Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x130)],Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x130)]=function(){const _0x17f4dd=_0x3addb4;return this[_0x17f4dd(0x390)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x17f4dd(0x34e)]['Scene_Skill_skillTypeWindowRect'][_0x17f4dd(0x1d8)](this);},Scene_Skill['prototype']['mainCommandWidth']=function(){const _0x37d863=_0x3addb4;return VisuMZ[_0x37d863(0x34e)][_0x37d863(0x221)]['Skills'][_0x37d863(0x270)]??Scene_MenuBase['prototype']['mainCommandWidth'][_0x37d863(0x1d8)](this);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x13c)]=function(){const _0x264acc=_0x3addb4,_0xf6cd0a=this['mainCommandWidth'](),_0x3f05bb=this[_0x264acc(0x231)](0x3,!![]),_0x16c005=this['isRightInputMode']()?Graphics['boxWidth']-_0xf6cd0a:0x0,_0x5212f7=this[_0x264acc(0x387)]();return new Rectangle(_0x16c005,_0x5212f7,_0xf6cd0a,_0x3f05bb);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3d6)]=Scene_Skill[_0x3addb4(0x29a)]['statusWindowRect'],Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x269)]=function(){const _0xbbd2=_0x3addb4;return this[_0xbbd2(0x390)]()?this['statusWindowRectSkillsStatesCore']():VisuMZ[_0xbbd2(0x34e)][_0xbbd2(0x3d6)][_0xbbd2(0x1d8)](this);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x35c)]=function(){const _0x1de23f=_0x3addb4,_0x3351cd=Graphics[_0x1de23f(0x23e)]-this[_0x1de23f(0x292)](),_0xbe9bca=this['_skillTypeWindow'][_0x1de23f(0x103)],_0xd75587=this['isRightInputMode']()?0x0:Graphics[_0x1de23f(0x23e)]-_0x3351cd,_0xd9f198=this[_0x1de23f(0x387)]();return new Rectangle(_0xd75587,_0xd9f198,_0x3351cd,_0xbe9bca);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x402)]=Scene_Skill[_0x3addb4(0x29a)]['createItemWindow'],Scene_Skill['prototype']['createItemWindow']=function(){const _0x3dbfc1=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x3dbfc1(0x402)]['call'](this),this[_0x3dbfc1(0x1ff)]()&&this[_0x3dbfc1(0x3c9)]();},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2d6)]=Scene_Skill[_0x3addb4(0x29a)]['itemWindowRect'],Scene_Skill['prototype'][_0x3addb4(0x3af)]=function(){const _0x1ad713=_0x3addb4;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x1ad713(0x19d)]();else{const _0x245924=VisuMZ[_0x1ad713(0x34e)][_0x1ad713(0x2d6)][_0x1ad713(0x1d8)](this);return this[_0x1ad713(0x1ff)]()&&this[_0x1ad713(0x1d3)]()&&(_0x245924['width']-=this[_0x1ad713(0x331)]()),_0x245924;}},Scene_Skill['prototype'][_0x3addb4(0x19d)]=function(){const _0x57b2d0=_0x3addb4,_0x770c6b=Graphics[_0x57b2d0(0x23e)]-this[_0x57b2d0(0x331)](),_0x481230=this[_0x57b2d0(0x2e0)]()-this['_statusWindow'][_0x57b2d0(0x103)],_0x39b209=this[_0x57b2d0(0x195)]()?Graphics[_0x57b2d0(0x23e)]-_0x770c6b:0x0,_0x346b9d=this['_statusWindow']['y']+this[_0x57b2d0(0x245)][_0x57b2d0(0x103)];return new Rectangle(_0x39b209,_0x346b9d,_0x770c6b,_0x481230);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x1ff)]=function(){const _0xc93b82=_0x3addb4;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ[_0xc93b82(0x34e)][_0xc93b82(0x221)][_0xc93b82(0x290)][_0xc93b82(0x3ba)];},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x1d3)]=function(){const _0x2e99dc=_0x3addb4;return VisuMZ['SkillsStatesCore'][_0x2e99dc(0x221)][_0x2e99dc(0x290)][_0x2e99dc(0x16d)];},Scene_Skill[_0x3addb4(0x29a)]['createShopStatusWindow']=function(){const _0x7dc4c9=_0x3addb4,_0x2e82c8=this[_0x7dc4c9(0x3d3)]();this[_0x7dc4c9(0x25c)]=new Window_ShopStatus(_0x2e82c8),this[_0x7dc4c9(0x368)](this[_0x7dc4c9(0x25c)]),this['_itemWindow'][_0x7dc4c9(0x1c3)](this[_0x7dc4c9(0x25c)]);const _0x27cd42=VisuMZ[_0x7dc4c9(0x34e)][_0x7dc4c9(0x221)][_0x7dc4c9(0x290)][_0x7dc4c9(0x19e)];this[_0x7dc4c9(0x25c)][_0x7dc4c9(0x312)](_0x27cd42||0x0);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x3d3)]=function(){const _0x224d12=_0x3addb4;return this[_0x224d12(0x390)]()?this[_0x224d12(0x11c)]():VisuMZ[_0x224d12(0x34e)][_0x224d12(0x221)][_0x224d12(0x290)][_0x224d12(0x181)][_0x224d12(0x1d8)](this);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x11c)]=function(){const _0x651f31=_0x3addb4,_0x18673a=this[_0x651f31(0x331)](),_0x5eba04=this['_itemWindow'][_0x651f31(0x103)],_0x2086e7=this[_0x651f31(0x195)]()?0x0:Graphics[_0x651f31(0x23e)]-this[_0x651f31(0x331)](),_0xd5fb78=this['_itemWindow']['y'];return new Rectangle(_0x2086e7,_0xd5fb78,_0x18673a,_0x5eba04);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x331)]=function(){const _0xdf225e=_0x3addb4;return Imported[_0xdf225e(0x19c)]?Scene_Shop[_0xdf225e(0x29a)]['statusWidth']():0x0;},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x412)]=function(){const _0x4d420e=_0x3addb4;return this['_skillTypeWindow']&&this[_0x4d420e(0x3a2)]['active']?TextManager[_0x4d420e(0x1f8)]:'';},VisuMZ['SkillsStatesCore'][_0x3addb4(0x20c)]=Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x257)],Scene_Skill['prototype'][_0x3addb4(0x257)]=function(){const _0x210a9b=_0x3addb4,_0x1afe9e=this[_0x210a9b(0x351)]();DataManager[_0x210a9b(0x398)](_0x1afe9e)?this[_0x210a9b(0x260)]():VisuMZ[_0x210a9b(0x34e)][_0x210a9b(0x20c)][_0x210a9b(0x1d8)](this);},Scene_Skill[_0x3addb4(0x29a)][_0x3addb4(0x260)]=function(){const _0x37fdd8=_0x3addb4;SoundManager[_0x37fdd8(0x112)]();const _0x5cc4f9=this['item'](),_0x5e361f=this['actor']()['isSkillToggled'](_0x5cc4f9);if(!_0x5e361f)this[_0x37fdd8(0x1ea)]()[_0x37fdd8(0x113)](_0x5cc4f9);this[_0x37fdd8(0x1ea)]()[_0x37fdd8(0x1b9)](_0x5cc4f9,!_0x5e361f),this['_itemWindow'][_0x37fdd8(0x356)](),this[_0x37fdd8(0x230)][_0x37fdd8(0x1ee)]();if(this[_0x37fdd8(0x245)])this[_0x37fdd8(0x245)][_0x37fdd8(0x356)]();},VisuMZ['SkillsStatesCore']['Scene_Battle_onSkillOk_Toggle']=Scene_Battle[_0x3addb4(0x29a)][_0x3addb4(0x2b1)],Scene_Battle[_0x3addb4(0x29a)][_0x3addb4(0x2b1)]=function(){const _0x5ca9e3=_0x3addb4,_0x52ee5a=this[_0x5ca9e3(0x141)]['item']();DataManager['isToggleSkill'](_0x52ee5a)?this['onSkillToggle']():VisuMZ['SkillsStatesCore'][_0x5ca9e3(0x148)][_0x5ca9e3(0x1d8)](this);},Scene_Battle[_0x3addb4(0x29a)][_0x3addb4(0x260)]=function(){const _0xb14054=_0x3addb4;SoundManager[_0xb14054(0x112)]();const _0x19f661=this[_0xb14054(0x141)][_0xb14054(0x351)](),_0x59fd2a=BattleManager[_0xb14054(0x1ea)](),_0xf7160e=_0x59fd2a[_0xb14054(0x3b1)](_0x19f661);if(!_0xf7160e)_0x59fd2a[_0xb14054(0x113)](_0x19f661);_0x59fd2a[_0xb14054(0x1b9)](_0x19f661,!_0xf7160e);if(Imported[_0xb14054(0x278)]){let _0x4804e2=0x0;_0x59fd2a[_0xb14054(0x3b1)](_0x19f661)?_0x19f661['note'][_0xb14054(0x21f)](/<TOGGLE ON (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x4804e2=Number(RegExp['$1']):_0x4804e2=_0x19f661[_0xb14054(0x309)]||0x0:_0x19f661[_0xb14054(0x1d4)]['match'](/<TOGGLE OFF (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x4804e2=Number(RegExp['$1']):_0x4804e2=VisuMZ[_0xb14054(0x34e)]['Settings']['Toggles']['ToggleOffAnimationID']??0x0,_0x4804e2>0x0&&$gameTemp[_0xb14054(0x37e)]([_0x59fd2a],_0x4804e2,![],![]);}this[_0xb14054(0x141)][_0xb14054(0x356)](),this[_0xb14054(0x141)]['activate']();if(this['_statusWindow'])this['_statusWindow'][_0xb14054(0x356)]();},VisuMZ['SkillsStatesCore'][_0x3addb4(0x35b)]=Sprite_Gauge['prototype']['initMembers'],Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x247)]=function(){const _0x36cffa=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x36cffa(0x35b)]['call'](this),this[_0x36cffa(0x189)]=null;},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1cf)]=Sprite_Gauge[_0x3addb4(0x29a)]['setup'],Sprite_Gauge[_0x3addb4(0x29a)]['setup']=function(_0x12bc0c,_0x274518){const _0x5afd11=_0x3addb4;this[_0x5afd11(0x3e2)](_0x12bc0c,_0x274518),_0x274518=_0x274518[_0x5afd11(0x26f)](),VisuMZ['SkillsStatesCore'][_0x5afd11(0x1cf)][_0x5afd11(0x1d8)](this,_0x12bc0c,_0x274518);},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x3e2)]=function(_0x1645ab,_0x1c6b9b){const _0xb3deb0=_0x3addb4,_0x26a36e=VisuMZ[_0xb3deb0(0x34e)][_0xb3deb0(0x221)][_0xb3deb0(0x3fd)]['filter'](_0x2e3e70=>_0x2e3e70[_0xb3deb0(0x3b7)][_0xb3deb0(0x12b)]()===_0x1c6b9b[_0xb3deb0(0x12b)]());_0x26a36e['length']>=0x1?this['_costSettings']=_0x26a36e[0x0]:this[_0xb3deb0(0x189)]=null;},VisuMZ[_0x3addb4(0x34e)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x3addb4(0x29a)]['currentValue'],Sprite_Gauge['prototype'][_0x3addb4(0x37a)]=function(){const _0x3f7267=_0x3addb4;return this['_battler']&&this[_0x3f7267(0x189)]?this[_0x3f7267(0x2e3)]():VisuMZ[_0x3f7267(0x34e)][_0x3f7267(0x142)]['call'](this);},Sprite_Gauge[_0x3addb4(0x29a)]['currentValueSkillsStatesCore']=function(){const _0x371d2b=_0x3addb4;return this['_costSettings'][_0x371d2b(0x1f7)][_0x371d2b(0x1d8)](this[_0x371d2b(0x150)]);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x102)]=Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x199)],Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x199)]=function(){const _0xcd006d=_0x3addb4;return this['_battler']&&this['_costSettings']?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0xcd006d(0x34e)][_0xcd006d(0x102)][_0xcd006d(0x1d8)](this);},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x19b)]=function(){const _0x44f9a3=_0x3addb4;return this[_0x44f9a3(0x189)][_0x44f9a3(0x297)][_0x44f9a3(0x1d8)](this[_0x44f9a3(0x150)]);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2cd)]=Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x3ae)],Sprite_Gauge[_0x3addb4(0x29a)]['gaugeRate']=function(){const _0x4a9276=_0x3addb4,_0x4bc403=VisuMZ[_0x4a9276(0x34e)][_0x4a9276(0x2cd)][_0x4a9276(0x1d8)](this);return _0x4bc403[_0x4a9276(0x35d)](0x0,0x1);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1e6)]=Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x1de)],Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x1de)]=function(){const _0x1a6d57=_0x3addb4;this[_0x1a6d57(0x150)]&&this[_0x1a6d57(0x189)]?(this['bitmap'][_0x1a6d57(0x3ef)](),this[_0x1a6d57(0x277)]()):VisuMZ[_0x1a6d57(0x34e)]['Sprite_Gauge_redraw']['call'](this);},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x168)]=function(){const _0x7602ef=_0x3addb4;let _0x278719=this[_0x7602ef(0x37a)]();return Imported[_0x7602ef(0x278)]&&this[_0x7602ef(0x3c0)]()&&(_0x278719=VisuMZ['GroupDigits'](_0x278719)),_0x278719;},Sprite_Gauge['prototype']['redrawSkillsStatesCore']=function(){const _0x209967=_0x3addb4;this[_0x209967(0x1e0)][_0x209967(0x3ef)](),this[_0x209967(0x189)][_0x209967(0x359)][_0x209967(0x1d8)](this);},Sprite_Gauge[_0x3addb4(0x29a)]['drawFullGauge']=function(_0x311904,_0x12e823,_0x5e0f14,_0x2444bb,_0x70fdc3,_0x5d8e6c){const _0x4b38e8=_0x3addb4,_0x1c4f95=this[_0x4b38e8(0x3ae)](),_0x343257=Math[_0x4b38e8(0x29d)]((_0x70fdc3-0x2)*_0x1c4f95),_0x3ec15d=_0x5d8e6c-0x2,_0x5eedda=this[_0x4b38e8(0x258)]();this[_0x4b38e8(0x1e0)][_0x4b38e8(0x115)](_0x5e0f14,_0x2444bb,_0x70fdc3,_0x5d8e6c,_0x5eedda),this[_0x4b38e8(0x1e0)][_0x4b38e8(0x3f7)](_0x5e0f14+0x1,_0x2444bb+0x1,_0x343257,_0x3ec15d,_0x311904,_0x12e823);},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x163)]=function(){const _0x2c5915=_0x3addb4,_0x18cdcd=VisuMZ[_0x2c5915(0x34e)]['Settings'][_0x2c5915(0x306)];return _0x18cdcd['LabelFontMainType']===_0x2c5915(0x354)?$gameSystem[_0x2c5915(0x2b3)]():$gameSystem[_0x2c5915(0x250)]();},Sprite_Gauge[_0x3addb4(0x29a)]['labelFontSize']=function(){const _0x46cab3=_0x3addb4,_0x10d781=VisuMZ['SkillsStatesCore']['Settings'][_0x46cab3(0x306)];return _0x10d781[_0x46cab3(0x1ce)]===_0x46cab3(0x354)?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x46cab3(0x1b3)]()-0x2;},Sprite_Gauge[_0x3addb4(0x29a)]['valueFontFace']=function(){const _0x43421e=_0x3addb4,_0x1ee486=VisuMZ[_0x43421e(0x34e)]['Settings'][_0x43421e(0x306)];return _0x1ee486[_0x43421e(0x3e9)]===_0x43421e(0x354)?$gameSystem[_0x43421e(0x2b3)]():$gameSystem[_0x43421e(0x250)]();},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x262)]=function(){const _0x36e8a7=_0x3addb4,_0x5a4501=VisuMZ[_0x36e8a7(0x34e)][_0x36e8a7(0x221)][_0x36e8a7(0x306)];return _0x5a4501[_0x36e8a7(0x3e9)]==='number'?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x36e8a7(0x1b3)]()-0x2;},Sprite_Gauge[_0x3addb4(0x29a)]['labelColor']=function(){const _0xb5bd94=_0x3addb4,_0x1cee2b=VisuMZ[_0xb5bd94(0x34e)][_0xb5bd94(0x221)][_0xb5bd94(0x306)];if(_0x1cee2b[_0xb5bd94(0x16a)]){if(_0x1cee2b[_0xb5bd94(0x16e)]===0x1)return this[_0xb5bd94(0x3e7)]();else{if(_0x1cee2b[_0xb5bd94(0x16e)]===0x2)return this[_0xb5bd94(0x140)]();}}const _0x4420ed=_0x1cee2b[_0xb5bd94(0x1f1)];return ColorManager['getColor'](_0x4420ed);},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x211)]=function(){const _0x545882=_0x3addb4,_0x477e12=VisuMZ['SkillsStatesCore'][_0x545882(0x221)][_0x545882(0x306)];if(this[_0x545882(0x1ca)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x477e12[_0x545882(0x3a6)]?'rgba(0,\x200,\x200,\x201)':ColorManager[_0x545882(0x187)]();},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x1ca)]=function(){const _0x81c47c=_0x3addb4;return VisuMZ[_0x81c47c(0x34e)][_0x81c47c(0x221)][_0x81c47c(0x306)][_0x81c47c(0x407)]||0x0;},Sprite_Gauge['prototype']['valueOutlineColor']=function(){const _0x4ba128=_0x3addb4,_0x35219f=VisuMZ[_0x4ba128(0x34e)][_0x4ba128(0x221)]['Gauge'];if(this[_0x4ba128(0x21c)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x35219f['ValueOutlineSolid']?_0x4ba128(0x363):ColorManager['outlineColor']();},Sprite_Gauge[_0x3addb4(0x29a)][_0x3addb4(0x21c)]=function(){const _0x358782=_0x3addb4;return VisuMZ[_0x358782(0x34e)]['Settings']['Gauge'][_0x358782(0x308)]||0x0;},VisuMZ['SkillsStatesCore'][_0x3addb4(0x40c)]=Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x14c)],Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x14c)]=function(){const _0x38f674=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x38f674(0x40c)][_0x38f674(0x1d8)](this),this[_0x38f674(0x15e)]();},Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x15e)]=function(){const _0x16457e=_0x3addb4,_0xdd7bb=Window_Base[_0x16457e(0x29a)][_0x16457e(0x2d7)]();this[_0x16457e(0x3ea)]=new Sprite(),this[_0x16457e(0x3ea)][_0x16457e(0x1e0)]=new Bitmap(ImageManager[_0x16457e(0x144)],_0xdd7bb),this[_0x16457e(0x3ea)]['anchor']['x']=this[_0x16457e(0x2fc)]['x'],this['_turnDisplaySprite'][_0x16457e(0x2fc)]['y']=this[_0x16457e(0x2fc)]['y'],this['addChild'](this['_turnDisplaySprite']),this[_0x16457e(0x21a)]=this[_0x16457e(0x3ea)][_0x16457e(0x1e0)];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1be)]=Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x361)],Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x361)]=function(){const _0x2473ac=_0x3addb4;VisuMZ[_0x2473ac(0x34e)]['Sprite_StateIcon_updateFrame']['call'](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x3addb4(0x29a)]['drawText']=function(_0x211982,_0x4df118,_0x42be29,_0x2c4901,_0x48d7b1){const _0x1b1565=_0x3addb4;this['contents']['drawText'](_0x211982,_0x4df118,_0x42be29,_0x2c4901,this[_0x1b1565(0x21a)]['height'],_0x48d7b1);},Sprite_StateIcon[_0x3addb4(0x29a)]['updateTurnDisplaySprite']=function(){const _0x17ec78=_0x3addb4;this[_0x17ec78(0x254)](),this[_0x17ec78(0x21a)]['clear']();const _0x57b77e=this[_0x17ec78(0x150)];if(!_0x57b77e)return;const _0x543780=_0x57b77e[_0x17ec78(0x369)]()[_0x17ec78(0x2af)](_0x192d28=>_0x192d28[_0x17ec78(0x294)]>0x0),_0xe96e0d=[...Array(0x8)['keys']()][_0x17ec78(0x2af)](_0x784c66=>_0x57b77e['buff'](_0x784c66)!==0x0),_0x24de94=this[_0x17ec78(0x16b)],_0x135543=_0x543780[_0x24de94];if(_0x135543)Window_Base[_0x17ec78(0x29a)]['drawActorStateTurns'][_0x17ec78(0x1d8)](this,_0x57b77e,_0x135543,0x0,0x0),Window_Base[_0x17ec78(0x29a)][_0x17ec78(0x2ea)]['call'](this,_0x57b77e,_0x135543,0x0,0x0);else{const _0x1aeff1=_0xe96e0d[_0x24de94-_0x543780[_0x17ec78(0x1d1)]];if(_0x1aeff1===undefined)return;Window_Base['prototype'][_0x17ec78(0x3cc)]['call'](this,_0x57b77e,_0x1aeff1,0x0,0x0),Window_Base[_0x17ec78(0x29a)][_0x17ec78(0x11a)][_0x17ec78(0x1d8)](this,_0x57b77e,_0x1aeff1,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x3addb4(0x254)]=function(){const _0xab18bd=_0x3addb4;this[_0xab18bd(0x21a)]['fontFace']=$gameSystem[_0xab18bd(0x250)](),this[_0xab18bd(0x21a)]['fontSize']=$gameSystem[_0xab18bd(0x1b3)](),this[_0xab18bd(0x3b9)]();},Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x3b9)]=function(){const _0x258af4=_0x3addb4;this[_0x258af4(0x3b3)](ColorManager[_0x258af4(0x405)]()),this[_0x258af4(0x39c)](ColorManager['outlineColor']());},Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x3b3)]=function(_0x18c43f){const _0x3c0c28=_0x3addb4;this['contents'][_0x3c0c28(0x237)]=_0x18c43f;},Sprite_StateIcon['prototype'][_0x3addb4(0x39c)]=function(_0x11315b){const _0x415bdf=_0x3addb4;this[_0x415bdf(0x21a)][_0x415bdf(0x187)]=_0x11315b;},Sprite_StateIcon[_0x3addb4(0x29a)][_0x3addb4(0x180)]=function(){const _0x4a1198=_0x3addb4;this[_0x4a1198(0x159)]=!![],this[_0x4a1198(0x276)]();},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x152)]=function(_0x17b9ed,_0xd3d299,_0x4e629f,_0x5a1edc,_0x2aad88){const _0x1e4318=_0x3addb4,_0x298547=this[_0x1e4318(0x1bc)](_0x17b9ed,_0xd3d299),_0x55c0d2=this[_0x1e4318(0x21e)](_0x298547,_0x4e629f,_0x5a1edc,_0x2aad88),_0xfbe918=_0x4e629f+_0x2aad88-_0x55c0d2['width'];this[_0x1e4318(0x1e1)](_0x298547,_0xfbe918,_0x5a1edc,_0x2aad88),this[_0x1e4318(0x254)]();},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x1bc)]=function(_0x416fc4,_0x4b1496){const _0x4d1da9=_0x3addb4;let _0x152f7c='';for(settings of VisuMZ[_0x4d1da9(0x34e)]['Settings']['Costs']){if(!this[_0x4d1da9(0x206)](_0x416fc4,_0x4b1496,settings))continue;if(_0x152f7c[_0x4d1da9(0x1d1)]>0x0)_0x152f7c+=this['skillCostSeparator']();_0x152f7c+=this[_0x4d1da9(0x322)](_0x416fc4,_0x4b1496,settings);}_0x152f7c=this['makeAdditionalSkillCostText'](_0x416fc4,_0x4b1496,_0x152f7c);if(_0x4b1496[_0x4d1da9(0x1d4)][_0x4d1da9(0x21f)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x152f7c[_0x4d1da9(0x1d1)]>0x0)_0x152f7c+=this['skillCostSeparator']();_0x152f7c+=String(RegExp['$1']);}return _0x152f7c;},Window_Base['prototype'][_0x3addb4(0x381)]=function(_0x5dbc84,_0x300154,_0x402795){return _0x402795;},Window_Base['prototype'][_0x3addb4(0x206)]=function(_0x2eda01,_0x5de808,_0x57c494){const _0x37a6c6=_0x3addb4;let _0x263d72=_0x57c494[_0x37a6c6(0x220)][_0x37a6c6(0x1d8)](_0x2eda01,_0x5de808);return _0x263d72=_0x2eda01['adjustSkillCost'](_0x5de808,_0x263d72,_0x57c494),_0x57c494['ShowJS'][_0x37a6c6(0x1d8)](_0x2eda01,_0x5de808,_0x263d72,_0x57c494);},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x322)]=function(_0x1f76ce,_0x1483f4,_0x32c73d){const _0x463a4f=_0x3addb4;let _0x1bf5e3=_0x32c73d[_0x463a4f(0x220)]['call'](_0x1f76ce,_0x1483f4);return _0x1bf5e3=_0x1f76ce[_0x463a4f(0x3a5)](_0x1483f4,_0x1bf5e3,_0x32c73d),_0x32c73d[_0x463a4f(0x248)][_0x463a4f(0x1d8)](_0x1f76ce,_0x1483f4,_0x1bf5e3,_0x32c73d);},Window_Base[_0x3addb4(0x29a)]['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x3addb4(0x29a)]['drawActorIcons']=function(_0x5e703d,_0x3246d9,_0x5c7915,_0xf076e5){const _0x505d14=_0x3addb4;if(!_0x5e703d)return;VisuMZ[_0x505d14(0x34e)][_0x505d14(0x367)]['call'](this,_0x5e703d,_0x3246d9,_0x5c7915,_0xf076e5),this[_0x505d14(0x11f)](_0x5e703d,_0x3246d9,_0x5c7915,_0xf076e5);},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x11f)]=function(_0x38b9b3,_0xac632e,_0x134ada,_0x312285){const _0x2197d1=_0x3addb4;_0x312285=_0x312285||0x90;const _0x3794a3=ImageManager[_0x2197d1(0x18e)]||0x20,_0x243bc3=ImageManager[_0x2197d1(0x38f)]||0x20,_0x1cc9c2=_0x3794a3,_0x2c50f6=_0x38b9b3[_0x2197d1(0x2f1)]()[_0x2197d1(0x24d)](0x0,Math[_0x2197d1(0x29d)](_0x312285/_0x1cc9c2)),_0xad5aab=_0x38b9b3[_0x2197d1(0x369)]()[_0x2197d1(0x2af)](_0x504caf=>_0x504caf[_0x2197d1(0x294)]>0x0),_0x310e46=[...Array(0x8)['keys']()][_0x2197d1(0x2af)](_0x4f31ca=>_0x38b9b3[_0x2197d1(0x35f)](_0x4f31ca)!==0x0),_0x1da8c6=[];let _0x3094e8=_0xac632e;for(let _0x3774cb=0x0;_0x3774cb<_0x2c50f6['length'];_0x3774cb++){this[_0x2197d1(0x254)]();const _0x1c5041=_0xad5aab[_0x3774cb];if(_0x1c5041)!_0x1da8c6[_0x2197d1(0x1b1)](_0x1c5041)&&this[_0x2197d1(0x241)](_0x38b9b3,_0x1c5041,_0x3094e8,_0x134ada),this['drawActorStateData'](_0x38b9b3,_0x1c5041,_0x3094e8,_0x134ada),_0x1da8c6[_0x2197d1(0x2f6)](_0x1c5041);else{const _0x476386=_0x310e46[_0x3774cb-_0xad5aab[_0x2197d1(0x1d1)]];this[_0x2197d1(0x3cc)](_0x38b9b3,_0x476386,_0x3094e8,_0x134ada),this[_0x2197d1(0x11a)](_0x38b9b3,_0x476386,_0x3094e8,_0x134ada);}_0x3094e8+=_0x1cc9c2;}},Window_Base[_0x3addb4(0x29a)]['drawActorStateTurns']=function(_0xe06767,_0x4c5f97,_0x4f933e,_0x521030){const _0xb2c6f8=_0x3addb4;if(!VisuMZ[_0xb2c6f8(0x34e)][_0xb2c6f8(0x221)][_0xb2c6f8(0x339)][_0xb2c6f8(0x2b0)])return;if(!_0xe06767[_0xb2c6f8(0x233)](_0x4c5f97['id']))return;if(_0x4c5f97[_0xb2c6f8(0x1b2)]===0x0)return;if(_0x4c5f97[_0xb2c6f8(0x1d4)][_0xb2c6f8(0x21f)](/<HIDE STATE TURNS>/i))return;const _0x32d993=ImageManager[_0xb2c6f8(0x18e)]||0x20,_0x4b78d1=_0x32d993,_0x55cec8=_0xe06767[_0xb2c6f8(0x29e)](_0x4c5f97['id']),_0x26ffe4=ColorManager[_0xb2c6f8(0x385)](_0x4c5f97);this[_0xb2c6f8(0x3b3)](_0x26ffe4),this[_0xb2c6f8(0x39c)](_0xb2c6f8(0x363)),this['contents']['fontBold']=!![],this['contents'][_0xb2c6f8(0x330)]=VisuMZ[_0xb2c6f8(0x34e)][_0xb2c6f8(0x221)][_0xb2c6f8(0x339)][_0xb2c6f8(0x3f3)],_0x4f933e+=VisuMZ[_0xb2c6f8(0x34e)][_0xb2c6f8(0x221)][_0xb2c6f8(0x339)]['TurnOffsetX'],_0x521030+=VisuMZ[_0xb2c6f8(0x34e)]['Settings']['States'][_0xb2c6f8(0x169)],this['drawText'](_0x55cec8,_0x4f933e,_0x521030,_0x4b78d1,_0xb2c6f8(0x2da)),this[_0xb2c6f8(0x21a)]['fontBold']=![],this[_0xb2c6f8(0x254)]();},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x2ea)]=function(_0x411972,_0x5393f0,_0x44a578,_0x21d535){const _0x5707b4=_0x3addb4;if(!VisuMZ['SkillsStatesCore'][_0x5707b4(0x221)]['States'][_0x5707b4(0x236)])return;const _0x514137=ImageManager[_0x5707b4(0x18e)]||0x20,_0x4bf939=ImageManager['standardIconHeight']||0x20,_0x36d0b4=_0x514137,_0x485ea4=_0x4bf939/0x2,_0x4a4cd1=ColorManager[_0x5707b4(0x405)]();this['changeTextColor'](_0x4a4cd1),this[_0x5707b4(0x39c)](_0x5707b4(0x363)),this['contents'][_0x5707b4(0x2b7)]=!![],this[_0x5707b4(0x21a)][_0x5707b4(0x330)]=VisuMZ[_0x5707b4(0x34e)]['Settings'][_0x5707b4(0x339)][_0x5707b4(0x291)],_0x44a578+=VisuMZ[_0x5707b4(0x34e)][_0x5707b4(0x221)]['States']['DataOffsetX'],_0x21d535+=VisuMZ[_0x5707b4(0x34e)][_0x5707b4(0x221)][_0x5707b4(0x339)][_0x5707b4(0x212)];const _0x29f893=String(_0x411972['getStateDisplay'](_0x5393f0['id']));this[_0x5707b4(0x17a)](_0x29f893,_0x44a578,_0x21d535,_0x36d0b4,_0x5707b4(0x119)),this[_0x5707b4(0x21a)][_0x5707b4(0x2b7)]=![],this['resetFontSettings']();},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x3cc)]=function(_0x351496,_0x28b305,_0x578eb5,_0x2833ab){const _0x24647c=_0x3addb4;if(!VisuMZ[_0x24647c(0x34e)][_0x24647c(0x221)][_0x24647c(0x20b)][_0x24647c(0x2b0)])return;const _0x4a66f4=_0x351496['buff'](_0x28b305);if(_0x4a66f4===0x0)return;const _0x14408f=_0x351496['buffTurns'](_0x28b305),_0x2e809f=ImageManager[_0x24647c(0x144)],_0x25c50d=_0x4a66f4>0x0?ColorManager[_0x24647c(0x316)]():ColorManager[_0x24647c(0x279)]();this[_0x24647c(0x3b3)](_0x25c50d),this[_0x24647c(0x39c)]('rgba(0,\x200,\x200,\x201)'),this[_0x24647c(0x21a)][_0x24647c(0x2b7)]=!![],this[_0x24647c(0x21a)][_0x24647c(0x330)]=VisuMZ[_0x24647c(0x34e)]['Settings'][_0x24647c(0x20b)]['TurnFontSize'],_0x578eb5+=VisuMZ[_0x24647c(0x34e)][_0x24647c(0x221)][_0x24647c(0x20b)][_0x24647c(0x210)],_0x2833ab+=VisuMZ[_0x24647c(0x34e)]['Settings'][_0x24647c(0x20b)][_0x24647c(0x169)],this[_0x24647c(0x17a)](_0x14408f,_0x578eb5,_0x2833ab,_0x2e809f,_0x24647c(0x2da)),this[_0x24647c(0x21a)]['fontBold']=![],this[_0x24647c(0x254)]();},Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x11a)]=function(_0x51ffad,_0x19f61b,_0x4faf32,_0x52dbf7){const _0x3b461b=_0x3addb4;if(!VisuMZ[_0x3b461b(0x34e)][_0x3b461b(0x221)][_0x3b461b(0x20b)][_0x3b461b(0x236)])return;const _0x26f23a=_0x51ffad['paramBuffRate'](_0x19f61b),_0x1f7391=_0x51ffad[_0x3b461b(0x35f)](_0x19f61b),_0x5df119=ImageManager['standardIconWidth']||0x20,_0x578045=ImageManager[_0x3b461b(0x38f)]||0x20,_0x50d73d=_0x5df119,_0x1b3e80=_0x578045/0x2,_0x1901b0=_0x1f7391>0x0?ColorManager['buffColor']():ColorManager[_0x3b461b(0x279)]();this['changeTextColor'](_0x1901b0),this[_0x3b461b(0x39c)](_0x3b461b(0x363)),this[_0x3b461b(0x21a)][_0x3b461b(0x2b7)]=!![],this[_0x3b461b(0x21a)][_0x3b461b(0x330)]=VisuMZ['SkillsStatesCore'][_0x3b461b(0x221)][_0x3b461b(0x20b)]['DataFontSize'],_0x4faf32+=VisuMZ[_0x3b461b(0x34e)][_0x3b461b(0x221)][_0x3b461b(0x20b)]['DataOffsetX'],_0x52dbf7+=VisuMZ['SkillsStatesCore'][_0x3b461b(0x221)]['Buffs'][_0x3b461b(0x212)];const _0x2fd834='%1%'[_0x3b461b(0x1a1)](Math['round'](_0x26f23a*0x64));this['drawText'](_0x2fd834,_0x4faf32,_0x52dbf7,_0x50d73d,'center'),this['contents']['fontBold']=![],this['resetFontSettings']();},VisuMZ[_0x3addb4(0x34e)]['Window_Base_changeTextColor']=Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x3b3)],Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x3b3)]=function(_0x1e7d3a){const _0x452a84=_0x3addb4;this['_toggleSkillColor']&&(_0x1e7d3a=ColorManager[_0x452a84(0x1bf)](VisuMZ['SkillsStatesCore'][_0x452a84(0x221)][_0x452a84(0x101)]['ToggleOnTextColor']??0x0)),VisuMZ[_0x452a84(0x34e)][_0x452a84(0x267)][_0x452a84(0x1d8)](this,_0x1e7d3a);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x29c)]=Window_Base[_0x3addb4(0x29a)]['drawText'],Window_Base[_0x3addb4(0x29a)][_0x3addb4(0x17a)]=function(_0x47c148,_0x526c2c,_0x4bde50,_0x444e74,_0xe1a122){const _0x4ccc24=_0x3addb4;VisuMZ[_0x4ccc24(0x34e)][_0x4ccc24(0x29c)][_0x4ccc24(0x1d8)](this,_0x47c148,_0x526c2c,_0x4bde50,_0x444e74,_0xe1a122),this[_0x4ccc24(0x355)]=undefined;},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x337)]=Window_Base['prototype'][_0x3addb4(0x1bc)],Window_Base['prototype'][_0x3addb4(0x1bc)]=function(_0x27f361,_0x22ef04){const _0x26ea0a=_0x3addb4;let _0x54221b=VisuMZ[_0x26ea0a(0x34e)][_0x26ea0a(0x337)]['call'](this,_0x27f361,_0x22ef04);;return DataManager[_0x26ea0a(0x398)](_0x22ef04)&&_0x27f361&&(_0x27f361[_0x26ea0a(0x3b1)](_0x22ef04)?_0x54221b=TextManager[_0x26ea0a(0x39b)]??_0x26ea0a(0x31a):(TextManager['toggleOffLocation']==='front'?_0x54221b=(TextManager[_0x26ea0a(0x20d)]??'[OFF]')+this[_0x26ea0a(0x343)]()+_0x54221b:_0x54221b=_0x54221b+this[_0x26ea0a(0x343)]()+(TextManager['toggleOff']??_0x26ea0a(0x27b)),_0x54221b=_0x54221b[_0x26ea0a(0x253)]())),_0x54221b;},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x229)]=Window_StatusBase[_0x3addb4(0x29a)][_0x3addb4(0x1cc)],Window_StatusBase[_0x3addb4(0x29a)][_0x3addb4(0x1cc)]=function(_0x28d48f,_0x9bb5d8,_0x253f0f,_0x1471d8){const _0x1f30ee=_0x3addb4;if(_0x28d48f[_0x1f30ee(0x1db)]())_0x9bb5d8=this[_0x1f30ee(0x23b)](_0x28d48f,_0x9bb5d8);this[_0x1f30ee(0x143)](_0x28d48f,_0x9bb5d8,_0x253f0f,_0x1471d8);},Window_StatusBase[_0x3addb4(0x29a)][_0x3addb4(0x143)]=function(_0x228fb,_0x30d208,_0x32053f,_0x1b9bb2){const _0x5a2fc1=_0x3addb4;if(['none',_0x5a2fc1(0x28f)][_0x5a2fc1(0x1b1)](_0x30d208[_0x5a2fc1(0x26f)]()))return;VisuMZ[_0x5a2fc1(0x34e)][_0x5a2fc1(0x229)][_0x5a2fc1(0x1d8)](this,_0x228fb,_0x30d208,_0x32053f,_0x1b9bb2);},Window_StatusBase[_0x3addb4(0x29a)]['convertGaugeTypeSkillsStatesCore']=function(_0xd3d2d4,_0x254c75){const _0xce74a2=_0x3addb4,_0x918e25=_0xd3d2d4[_0xce74a2(0x2bf)]()[_0xce74a2(0x1d4)];if(_0x254c75==='hp'&&_0x918e25['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x254c75==='mp'&&_0x918e25['match'](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x254c75==='tp'&&_0x918e25[_0xce74a2(0x21f)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x254c75;}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x367)]=Window_StatusBase['prototype']['drawActorIcons'],Window_StatusBase[_0x3addb4(0x29a)][_0x3addb4(0x36e)]=function(_0x1cded5,_0xd77d3,_0x172806,_0x2f0026){const _0x45c343=_0x3addb4;if(!_0x1cded5)return;Window_Base[_0x45c343(0x29a)][_0x45c343(0x36e)][_0x45c343(0x1d8)](this,_0x1cded5,_0xd77d3,_0x172806,_0x2f0026);},VisuMZ[_0x3addb4(0x34e)]['Window_SkillType_initialize']=Window_SkillType[_0x3addb4(0x29a)]['initialize'],Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x265)]=function(_0x5debe0){const _0x27d91b=_0x3addb4;VisuMZ[_0x27d91b(0x34e)][_0x27d91b(0x326)][_0x27d91b(0x1d8)](this,_0x5debe0),this[_0x27d91b(0x133)](_0x5debe0);},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x133)]=function(_0x3cfecd){const _0x2d06f4=_0x3addb4,_0xbb7455=new Rectangle(0x0,0x0,_0x3cfecd[_0x2d06f4(0x132)],_0x3cfecd[_0x2d06f4(0x103)]);this[_0x2d06f4(0x2d9)]=new Window_Base(_0xbb7455),this[_0x2d06f4(0x2d9)][_0x2d06f4(0x1fc)]=0x0,this[_0x2d06f4(0x1b0)](this[_0x2d06f4(0x2d9)]),this['updateCommandNameWindow']();},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x238)]=function(){const _0x50a5c1=_0x3addb4;Window_Command[_0x50a5c1(0x29a)][_0x50a5c1(0x238)][_0x50a5c1(0x1d8)](this);if(this[_0x50a5c1(0x2d9)])this[_0x50a5c1(0x264)]();},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x264)]=function(){const _0x10f05c=_0x3addb4,_0x1c9f8a=this[_0x10f05c(0x2d9)];_0x1c9f8a[_0x10f05c(0x21a)][_0x10f05c(0x3ef)]();const _0x59f751=this[_0x10f05c(0x35a)](this[_0x10f05c(0x3bd)]());if(_0x59f751===_0x10f05c(0x317)&&this[_0x10f05c(0x295)]()>0x0){const _0x547dbb=this['itemLineRect'](this['index']());let _0x346cb5=this[_0x10f05c(0x302)](this['index']());_0x346cb5=_0x346cb5[_0x10f05c(0x216)](/\\I\[(\d+)\]/gi,''),_0x1c9f8a[_0x10f05c(0x254)](),this[_0x10f05c(0x2aa)](_0x346cb5,_0x547dbb),this[_0x10f05c(0x1df)](_0x346cb5,_0x547dbb),this['commandNameWindowCenter'](_0x346cb5,_0x547dbb);}},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x2aa)]=function(_0x1401b6,_0x325766){},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x1df)]=function(_0x27700e,_0x588977){const _0x506a97=_0x3addb4,_0x437bf7=this[_0x506a97(0x2d9)];_0x437bf7['drawText'](_0x27700e,0x0,_0x588977['y'],_0x437bf7[_0x506a97(0x320)],_0x506a97(0x119));},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x1f0)]=function(_0x33dd92,_0x12e5d5){const _0x27cd20=_0x3addb4,_0x3f06de=this['_commandNameWindow'],_0x2c521f=$gameSystem['windowPadding'](),_0x5dd2ae=_0x12e5d5['x']+Math[_0x27cd20(0x29d)](_0x12e5d5[_0x27cd20(0x132)]/0x2)+_0x2c521f;_0x3f06de['x']=_0x3f06de[_0x27cd20(0x132)]/-0x2+_0x5dd2ae,_0x3f06de['y']=Math[_0x27cd20(0x29d)](_0x12e5d5[_0x27cd20(0x103)]/0x2);},Window_SkillType[_0x3addb4(0x29a)]['isUseModernControls']=function(){const _0x5a9a16=_0x3addb4;return Imported[_0x5a9a16(0x278)]&&Window_Command[_0x5a9a16(0x29a)]['isUseModernControls'][_0x5a9a16(0x1d8)](this);},Window_SkillType['prototype'][_0x3addb4(0x214)]=function(){const _0x3d1812=_0x3addb4;if(!this['_actor'])return;const _0x59006b=this['_actor'][_0x3d1812(0x30a)]();for(const _0x5d6a4e of _0x59006b){const _0x44a685=this[_0x3d1812(0x122)](_0x5d6a4e);this['addCommand'](_0x44a685,_0x3d1812(0x3b6),!![],_0x5d6a4e);}},Window_SkillType[_0x3addb4(0x29a)]['makeCommandName']=function(_0x5d3ab5){const _0x18c7a2=_0x3addb4;let _0x352547=$dataSystem[_0x18c7a2(0x30a)][_0x5d3ab5];if(_0x352547['match'](/\\I\[(\d+)\]/i))return _0x352547;if(this[_0x18c7a2(0x24b)]()===_0x18c7a2(0x392))return _0x352547;const _0x5622c3=VisuMZ['SkillsStatesCore'][_0x18c7a2(0x221)]['Skills'],_0x4d4e01=$dataSystem[_0x18c7a2(0x12e)]['includes'](_0x5d3ab5),_0x2f3560=_0x4d4e01?_0x5622c3[_0x18c7a2(0x1d2)]:_0x5622c3['IconStypeNorm'];return'\x5cI[%1]%2'[_0x18c7a2(0x1a1)](_0x2f3560,_0x352547);},Window_SkillType[_0x3addb4(0x29a)]['itemTextAlign']=function(){const _0x10d312=_0x3addb4;return VisuMZ[_0x10d312(0x34e)][_0x10d312(0x221)]['Skills'][_0x10d312(0x2f9)];},Window_SkillType[_0x3addb4(0x29a)][_0x3addb4(0x3ad)]=function(_0x42c12b){const _0x5b6d10=_0x3addb4,_0x26860e=this[_0x5b6d10(0x35a)](_0x42c12b);if(_0x26860e===_0x5b6d10(0x151))this[_0x5b6d10(0x377)](_0x42c12b);else _0x26860e===_0x5b6d10(0x317)?this[_0x5b6d10(0x2e8)](_0x42c12b):Window_Command[_0x5b6d10(0x29a)]['drawItem'][_0x5b6d10(0x1d8)](this,_0x42c12b);},Window_SkillType['prototype'][_0x3addb4(0x24b)]=function(){const _0x4932bc=_0x3addb4;return VisuMZ['SkillsStatesCore']['Settings'][_0x4932bc(0x290)]['CmdStyle'];},Window_SkillType['prototype'][_0x3addb4(0x35a)]=function(_0x278955){const _0x1f14ed=_0x3addb4;if(_0x278955<0x0)return _0x1f14ed(0x392);const _0x476da5=this[_0x1f14ed(0x24b)]();if(_0x476da5!==_0x1f14ed(0x3d2))return _0x476da5;else{if(this[_0x1f14ed(0x295)]()>0x0){const _0x53d97e=this[_0x1f14ed(0x302)](_0x278955);if(_0x53d97e[_0x1f14ed(0x21f)](/\\I\[(\d+)\]/i)){const _0x2aaa89=this[_0x1f14ed(0x121)](_0x278955),_0x3c0be8=this[_0x1f14ed(0x21e)](_0x53d97e)[_0x1f14ed(0x132)];return _0x3c0be8<=_0x2aaa89[_0x1f14ed(0x132)]?_0x1f14ed(0x151):'icon';}}}return _0x1f14ed(0x392);},Window_SkillType[_0x3addb4(0x29a)]['drawItemStyleIconText']=function(_0x3be8e4){const _0x108535=_0x3addb4,_0x1f6d35=this[_0x108535(0x121)](_0x3be8e4),_0x15f2b0=this[_0x108535(0x302)](_0x3be8e4),_0x5f15f0=this['textSizeEx'](_0x15f2b0)[_0x108535(0x132)];this[_0x108535(0x1e8)](this[_0x108535(0x40d)](_0x3be8e4));const _0x23a5cb=this['itemTextAlign']();if(_0x23a5cb===_0x108535(0x2da))this[_0x108535(0x1e1)](_0x15f2b0,_0x1f6d35['x']+_0x1f6d35[_0x108535(0x132)]-_0x5f15f0,_0x1f6d35['y'],_0x5f15f0);else{if(_0x23a5cb===_0x108535(0x119)){const _0x29f1bc=_0x1f6d35['x']+Math[_0x108535(0x29d)]((_0x1f6d35[_0x108535(0x132)]-_0x5f15f0)/0x2);this['drawTextEx'](_0x15f2b0,_0x29f1bc,_0x1f6d35['y'],_0x5f15f0);}else this['drawTextEx'](_0x15f2b0,_0x1f6d35['x'],_0x1f6d35['y'],_0x5f15f0);}},Window_SkillType['prototype']['drawItemStyleIcon']=function(_0x4752c5){const _0x10d7e9=_0x3addb4;this[_0x10d7e9(0x302)](_0x4752c5)[_0x10d7e9(0x21f)](/\\I\[(\d+)\]/i);const _0x58c5cf=Number(RegExp['$1'])||0x0,_0x1a7e63=this['itemLineRect'](_0x4752c5),_0x1df2ed=_0x1a7e63['x']+Math[_0x10d7e9(0x29d)]((_0x1a7e63[_0x10d7e9(0x132)]-ImageManager['iconWidth'])/0x2),_0x152fb1=_0x1a7e63['y']+(_0x1a7e63['height']-ImageManager['iconHeight'])/0x2;this[_0x10d7e9(0x17b)](_0x58c5cf,_0x1df2ed,_0x152fb1);},VisuMZ['SkillsStatesCore'][_0x3addb4(0x1c5)]=Window_SkillStatus[_0x3addb4(0x29a)][_0x3addb4(0x356)],Window_SkillStatus['prototype'][_0x3addb4(0x356)]=function(){const _0x5c2690=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x5c2690(0x1c5)][_0x5c2690(0x1d8)](this);if(this[_0x5c2690(0x108)])this[_0x5c2690(0x1ac)]();},Window_SkillStatus[_0x3addb4(0x29a)][_0x3addb4(0x1ac)]=function(){const _0x40f033=_0x3addb4;if(!Imported[_0x40f033(0x278)])return;if(!Imported[_0x40f033(0x345)])return;const _0x416606=this['gaugeLineHeight']();let _0x135067=this[_0x40f033(0x3a8)]()/0x2+0xb4+0xb4+0xb4,_0x319c54=this[_0x40f033(0x320)]-_0x135067-0x2;if(_0x319c54>=0x12c){const _0x14985e=VisuMZ['CoreEngine'][_0x40f033(0x221)][_0x40f033(0x3b4)][_0x40f033(0x36f)],_0x16ea7f=Math[_0x40f033(0x29d)](_0x319c54/0x2)-0x18;let _0xac2e25=_0x135067,_0x31e598=Math[_0x40f033(0x29d)]((this[_0x40f033(0x120)]-Math[_0x40f033(0x30b)](_0x14985e[_0x40f033(0x1d1)]/0x2)*_0x416606)/0x2),_0x5e9ff8=0x0;for(const _0x50fe1e of _0x14985e){this[_0x40f033(0x37f)](_0xac2e25,_0x31e598,_0x16ea7f,_0x50fe1e),_0x5e9ff8++,_0x5e9ff8%0x2===0x0?(_0xac2e25=_0x135067,_0x31e598+=_0x416606):_0xac2e25+=_0x16ea7f+0x18;}}this[_0x40f033(0x254)]();},Window_SkillStatus[_0x3addb4(0x29a)][_0x3addb4(0x37f)]=function(_0xf18bda,_0x21861a,_0x451a1a,_0xbec656){const _0x4f329a=_0x3addb4,_0x552cf2=this[_0x4f329a(0x2c1)]();this['resetFontSettings'](),this['drawParamText'](_0xf18bda,_0x21861a,_0x451a1a,_0xbec656,!![]),this[_0x4f329a(0x3b9)](),this[_0x4f329a(0x21a)]['fontSize']-=0x8;const _0x361aa2=this[_0x4f329a(0x108)][_0x4f329a(0x145)](_0xbec656,!![]);this[_0x4f329a(0x21a)][_0x4f329a(0x17a)](_0x361aa2,_0xf18bda,_0x21861a,_0x451a1a,_0x552cf2,_0x4f329a(0x2da));},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x1c0)]=Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x1b1)],Window_SkillList[_0x3addb4(0x29a)]['includes']=function(_0x1f39da){const _0x2b107a=_0x3addb4;if(this[_0x2b107a(0x31c)]<=0x0)return![];return this[_0x2b107a(0x2d0)](_0x1f39da);},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x12a)]=Window_SkillList[_0x3addb4(0x29a)]['maxCols'],Window_SkillList[_0x3addb4(0x29a)]['maxCols']=function(){const _0xab4c2b=_0x3addb4;return SceneManager[_0xab4c2b(0x319)][_0xab4c2b(0x32c)]===Scene_Battle?VisuMZ[_0xab4c2b(0x34e)][_0xab4c2b(0x12a)][_0xab4c2b(0x1d8)](this):VisuMZ[_0xab4c2b(0x34e)][_0xab4c2b(0x221)]['Skills'][_0xab4c2b(0x3de)];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x3f2)]=Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x131)],Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x131)]=function(_0x219966){const _0x4d8f1f=_0x3addb4,_0x22fd9d=this['_actor']!==_0x219966;VisuMZ[_0x4d8f1f(0x34e)][_0x4d8f1f(0x3f2)]['call'](this,_0x219966),_0x22fd9d&&(this[_0x4d8f1f(0x245)]&&this[_0x4d8f1f(0x245)][_0x4d8f1f(0x32c)]===Window_ShopStatus&&this['_statusWindow'][_0x4d8f1f(0x2d2)](this[_0x4d8f1f(0x246)](0x0)));},Window_SkillList['prototype']['setStypeId']=function(_0x34d6f7){const _0x2f94f6=_0x3addb4;if(this['_stypeId']===_0x34d6f7)return;if(!_0x34d6f7)return;this[_0x2f94f6(0x31c)]=_0x34d6f7,this[_0x2f94f6(0x356)](),this[_0x2f94f6(0x39a)](0x0,0x0),this[_0x2f94f6(0x245)]&&this[_0x2f94f6(0x245)][_0x2f94f6(0x32c)]===Window_ShopStatus&&this['_statusWindow'][_0x2f94f6(0x2d2)](this['itemAt'](0x0));},Window_SkillList[_0x3addb4(0x29a)]['includesSkillsStatesCore']=function(_0x51dda5){const _0x1486f5=_0x3addb4;if(!_0x51dda5)return VisuMZ['SkillsStatesCore'][_0x1486f5(0x1c0)][_0x1486f5(0x1d8)](this,_0x51dda5);if(!this['checkSkillTypeMatch'](_0x51dda5))return![];if(!this[_0x1486f5(0x161)](_0x51dda5))return![];if(!this[_0x1486f5(0x18b)](_0x51dda5))return![];return!![];},Window_SkillList['prototype']['checkSkillTypeMatch']=function(_0x3fbd4e){const _0x2e6c3f=_0x3addb4;return DataManager[_0x2e6c3f(0x289)](_0x3fbd4e)[_0x2e6c3f(0x1b1)](this[_0x2e6c3f(0x31c)]);},Window_SkillList[_0x3addb4(0x29a)]['checkShowHideNotetags']=function(_0x9516d1){const _0x159fd4=_0x3addb4;if(!VisuMZ[_0x159fd4(0x34e)][_0x159fd4(0x2ba)](this[_0x159fd4(0x108)],_0x9516d1))return![];if(!VisuMZ[_0x159fd4(0x34e)]['CheckVisibleSwitchNotetags'](this[_0x159fd4(0x108)],_0x9516d1))return![];if(!VisuMZ[_0x159fd4(0x34e)]['CheckVisibleSkillNotetags'](this[_0x159fd4(0x108)],_0x9516d1))return![];return!![];},VisuMZ[_0x3addb4(0x34e)]['CheckVisibleBattleNotetags']=function(_0x38e2ce,_0x1e615b){const _0x1d1ab5=_0x3addb4,_0x35529e=_0x1e615b['note'];if(_0x35529e['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1d1ab5(0x275)]())return![];else return _0x35529e['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x1d1ab5(0x275)]()?![]:!![];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x175)]=function(_0x137d29,_0x5d339a){const _0x1872e2=_0x3addb4,_0x2ec185=_0x5d339a[_0x1872e2(0x1d4)];if(_0x2ec185[_0x1872e2(0x21f)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe41fc4=JSON[_0x1872e2(0x1b4)]('['+RegExp['$1'][_0x1872e2(0x21f)](/\d+/g)+']');for(const _0x35874f of _0xe41fc4){if(!$gameSwitches[_0x1872e2(0x1a8)](_0x35874f))return![];}return!![];}if(_0x2ec185[_0x1872e2(0x21f)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13f1f5=JSON[_0x1872e2(0x1b4)]('['+RegExp['$1'][_0x1872e2(0x21f)](/\d+/g)+']');for(const _0x443066 of _0x13f1f5){if(!$gameSwitches[_0x1872e2(0x1a8)](_0x443066))return![];}return!![];}if(_0x2ec185[_0x1872e2(0x21f)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2dd93b=JSON[_0x1872e2(0x1b4)]('['+RegExp['$1'][_0x1872e2(0x21f)](/\d+/g)+']');for(const _0x58e16b of _0x2dd93b){if($gameSwitches[_0x1872e2(0x1a8)](_0x58e16b))return!![];}return![];}if(_0x2ec185['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf046fe=JSON[_0x1872e2(0x1b4)]('['+RegExp['$1'][_0x1872e2(0x21f)](/\d+/g)+']');for(const _0x4728d4 of _0xf046fe){if(!$gameSwitches[_0x1872e2(0x1a8)](_0x4728d4))return!![];}return![];}if(_0x2ec185['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38fd6b=JSON[_0x1872e2(0x1b4)]('['+RegExp['$1'][_0x1872e2(0x21f)](/\d+/g)+']');for(const _0x1f0324 of _0x38fd6b){if(!$gameSwitches['value'](_0x1f0324))return!![];}return![];}if(_0x2ec185[_0x1872e2(0x21f)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21c46a=JSON[_0x1872e2(0x1b4)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3daa91 of _0x21c46a){if($gameSwitches['value'](_0x3daa91))return![];}return!![];}return!![];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x335)]=function(_0x225a81,_0x1e0965){const _0x34ec25=_0x3addb4,_0x3da222=_0x1e0965[_0x34ec25(0x1d4)];if(_0x3da222['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e16ee=JSON['parse']('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x3cb3e4 of _0x1e16ee){if(!_0x225a81[_0x34ec25(0x36a)](_0x3cb3e4))return![];}return!![];}else{if(_0x3da222['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x21effb=RegExp['$1']['split'](',');for(const _0x1343a0 of _0x21effb){const _0x36c113=DataManager[_0x34ec25(0x31e)](_0x1343a0);if(!_0x36c113)continue;if(!_0x225a81[_0x34ec25(0x36a)](_0x36c113))return![];}return!![];}}if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x198421=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x28e736 of _0x198421){if(!_0x225a81[_0x34ec25(0x36a)](_0x28e736))return![];}return!![];}else{if(_0x3da222['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4e9222=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x8fea71 of _0x4e9222){const _0x9efff6=DataManager['getSkillIdWithName'](_0x8fea71);if(!_0x9efff6)continue;if(!_0x225a81[_0x34ec25(0x36a)](_0x9efff6))return![];}return!![];}}if(_0x3da222['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3aee8b=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5ab61b of _0x3aee8b){if(_0x225a81[_0x34ec25(0x36a)](_0x5ab61b))return!![];}return![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xbe41c5=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x4ca66f of _0xbe41c5){const _0x4a2277=DataManager[_0x34ec25(0x31e)](_0x4ca66f);if(!_0x4a2277)continue;if(_0x225a81['isLearnedSkill'](_0x4a2277))return!![];}return![];}}if(_0x3da222['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30be79=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x29bb16 of _0x30be79){if(!_0x225a81['isLearnedSkill'](_0x29bb16))return!![];}return![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x360d98=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x44ae45 of _0x360d98){const _0x171b95=DataManager['getSkillIdWithName'](_0x44ae45);if(!_0x171b95)continue;if(!_0x225a81['isLearnedSkill'](_0x171b95))return!![];}return![];}}if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x8c8aab=JSON['parse']('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x36d819 of _0x8c8aab){if(!_0x225a81['isLearnedSkill'](_0x36d819))return!![];}return![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1c1acf=RegExp['$1']['split'](',');for(const _0xcf45e2 of _0x1c1acf){const _0x5b029e=DataManager[_0x34ec25(0x31e)](_0xcf45e2);if(!_0x5b029e)continue;if(!_0x225a81[_0x34ec25(0x36a)](_0x5b029e))return!![];}return![];}}if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4fc5b2=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x116547 of _0x4fc5b2){if(_0x225a81[_0x34ec25(0x36a)](_0x116547))return![];}return!![];}else{if(_0x3da222['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1bff15=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x47f31b of _0x1bff15){const _0x5cf5dc=DataManager[_0x34ec25(0x31e)](_0x47f31b);if(!_0x5cf5dc)continue;if(_0x225a81[_0x34ec25(0x36a)](_0x5cf5dc))return![];}return!![];}}if(_0x3da222['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10b0b4=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x357fef of _0x10b0b4){if(!_0x225a81['hasSkill'](_0x357fef))return![];}return!![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x519877=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0xb5916f of _0x519877){const _0x4498d9=DataManager[_0x34ec25(0x31e)](_0xb5916f);if(!_0x4498d9)continue;if(!_0x225a81[_0x34ec25(0x328)](_0x4498d9))return![];}return!![];}}if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a315b=JSON['parse']('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x3c3262 of _0x5a315b){if(!_0x225a81[_0x34ec25(0x328)](_0x3c3262))return![];}return!![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1a7204=RegExp['$1']['split'](',');for(const _0x54c7e8 of _0x1a7204){const _0x4140b0=DataManager[_0x34ec25(0x31e)](_0x54c7e8);if(!_0x4140b0)continue;if(!_0x225a81[_0x34ec25(0x328)](_0x4140b0))return![];}return!![];}}if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45ef12=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x1db58c of _0x45ef12){if(_0x225a81['hasSkill'](_0x1db58c))return!![];}return![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2ceded=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x4ee116 of _0x2ceded){const _0xd5b932=DataManager[_0x34ec25(0x31e)](_0x4ee116);if(!_0xd5b932)continue;if(_0x225a81['hasSkill'](_0xd5b932))return!![];}return![];}}if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44527b=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x2d859c of _0x44527b){if(!_0x225a81[_0x34ec25(0x328)](_0x2d859c))return!![];}return![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x59ebb3=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x5e98eb of _0x59ebb3){const _0x49c3a1=DataManager[_0x34ec25(0x31e)](_0x5e98eb);if(!_0x49c3a1)continue;if(!_0x225a81['hasSkill'](_0x49c3a1))return!![];}return![];}}if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ccf95=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x13255d of _0x4ccf95){if(!_0x225a81['hasSkill'](_0x13255d))return!![];}return![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x43b980=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x661f6f of _0x43b980){const _0x4cde6c=DataManager[_0x34ec25(0x31e)](_0x661f6f);if(!_0x4cde6c)continue;if(!_0x225a81['hasSkill'](_0x4cde6c))return!![];}return![];}}if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d09cc=JSON[_0x34ec25(0x1b4)]('['+RegExp['$1'][_0x34ec25(0x21f)](/\d+/g)+']');for(const _0x43ce3b of _0x4d09cc){if(_0x225a81['hasSkill'](_0x43ce3b))return![];}return!![];}else{if(_0x3da222[_0x34ec25(0x21f)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x7622c1=RegExp['$1'][_0x34ec25(0x36b)](',');for(const _0x2df0c9 of _0x7622c1){const _0x1f6339=DataManager[_0x34ec25(0x31e)](_0x2df0c9);if(!_0x1f6339)continue;if(_0x225a81['hasSkill'](_0x1f6339))return![];}return!![];}}return!![];},Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x18b)]=function(_0x4d9f45){const _0x43677d=_0x3addb4,_0xdc6188=_0x4d9f45[_0x43677d(0x1d4)],_0x46e4a6=VisuMZ[_0x43677d(0x34e)][_0x43677d(0x192)];return _0x46e4a6[_0x4d9f45['id']]?_0x46e4a6[_0x4d9f45['id']][_0x43677d(0x1d8)](this,_0x4d9f45):!![];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x39d)]=Window_SkillList['prototype'][_0x3addb4(0x357)],Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x357)]=function(){const _0x17d526=_0x3addb4;VisuMZ['SkillsStatesCore'][_0x17d526(0x39d)]['call'](this),this['canSortSkillTypeList']()&&this[_0x17d526(0x374)](),this[_0x17d526(0x3c7)]()&&this[_0x17d526(0x109)]();},Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x224)]=function(){return!![];},Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x374)]=function(){const _0x257cb4=_0x3addb4,_0x29cd72=VisuMZ[_0x257cb4(0x34e)][_0x257cb4(0x221)][_0x257cb4(0x290)][_0x257cb4(0x3a9)]||[];return _0x29cd72&&_0x29cd72[_0x257cb4(0x1b1)](this[_0x257cb4(0x31c)])?this[_0x257cb4(0x360)][_0x257cb4(0x227)]((_0x581a0b,_0xdde004)=>{const _0x12c020=_0x257cb4;if(!!_0x581a0b&&!!_0xdde004)return _0x581a0b['name'][_0x12c020(0x219)](_0xdde004[_0x12c020(0x165)]);return 0x0;}):VisuMZ[_0x257cb4(0x34e)]['SortByIDandPriority'](this['_data']),this[_0x257cb4(0x360)];},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x2f2)]=function(_0x589560){const _0x26c412=_0x3addb4;return _0x589560[_0x26c412(0x227)]((_0x19c027,_0x52c652)=>{const _0xa9c67d=_0x26c412;if(!!_0x19c027&&!!_0x52c652){if(_0x19c027['sortPriority']===undefined)VisuMZ[_0xa9c67d(0x34e)][_0xa9c67d(0x10c)](_0x19c027);if(_0x52c652[_0xa9c67d(0x2a0)]===undefined)VisuMZ['SkillsStatesCore'][_0xa9c67d(0x10c)](_0x52c652);const _0x1857e2=_0x19c027[_0xa9c67d(0x2a0)],_0x4dc2f2=_0x52c652[_0xa9c67d(0x2a0)];if(_0x1857e2!==_0x4dc2f2)return _0x4dc2f2-_0x1857e2;return _0x19c027['id']-_0x52c652['id'];}return 0x0;}),_0x589560;},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x33c)]=function(_0x11795c){const _0x465966=_0x3addb4;return _0x11795c[_0x465966(0x227)]((_0x22246c,_0x306970)=>{const _0x38ca11=_0x465966,_0x180cf2=$dataSkills[_0x22246c],_0x242b5f=$dataSkills[_0x306970];if(!!_0x180cf2&&!!_0x242b5f){if(_0x180cf2[_0x38ca11(0x2a0)]===undefined)VisuMZ[_0x38ca11(0x34e)]['Parse_Notetags_Skill_Sorting'](_0x180cf2);if(_0x242b5f[_0x38ca11(0x2a0)]===undefined)VisuMZ[_0x38ca11(0x34e)][_0x38ca11(0x10c)](_0x242b5f);const _0x52acb7=_0x180cf2['sortPriority'],_0x8c3b55=_0x242b5f['sortPriority'];if(_0x52acb7!==_0x8c3b55)return _0x8c3b55-_0x52acb7;return _0x22246c-_0x306970;}return 0x0;}),_0x11795c;},Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x3c7)]=function(){const _0xd86b31=_0x3addb4;if(!this['_actor'])return![];if([_0xd86b31(0x282),_0xd86b31(0x36d),'equipPassives'][_0xd86b31(0x1b1)](this[_0xd86b31(0x31c)]))return![];return!![];},Window_SkillList['prototype'][_0x3addb4(0x109)]=function(){const _0x5bd845=_0x3addb4,_0x39aa68=this[_0x5bd845(0x108)][_0x5bd845(0x369)]();for(const _0x73d103 of _0x39aa68){const _0x47f53b=DataManager[_0x5bd845(0x252)](_0x73d103);for(const _0x45dbfd in _0x47f53b){const _0x3194fd=$dataSkills[Number(_0x45dbfd)]||null,_0x326928=$dataSkills[Number(_0x47f53b[_0x45dbfd])]||null;while(this['_data'][_0x5bd845(0x1b1)](_0x3194fd)){const _0x4f4057=this[_0x5bd845(0x360)][_0x5bd845(0x3b8)](_0x3194fd);this[_0x5bd845(0x360)][_0x4f4057]=_0x326928;}}}},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x222)]=Window_SkillList['prototype'][_0x3addb4(0x3ad)],Window_SkillList['prototype'][_0x3addb4(0x3ad)]=function(_0x22aff6){const _0x37e0df=_0x3addb4,_0x2843eb=this[_0x37e0df(0x246)](_0x22aff6),_0xd575c1=_0x2843eb?_0x2843eb[_0x37e0df(0x165)]:'';if(_0x2843eb)this['alterSkillName'](_0x2843eb);DataManager[_0x37e0df(0x398)](_0x2843eb)&&this[_0x37e0df(0x108)]&&this['_actor'][_0x37e0df(0x3b1)](_0x2843eb)&&(this[_0x37e0df(0x355)]=!![]);VisuMZ[_0x37e0df(0x34e)]['Window_SkillList_drawItem']['call'](this,_0x22aff6),this[_0x37e0df(0x355)]=undefined;if(_0x2843eb)_0x2843eb[_0x37e0df(0x165)]=_0xd575c1;},Window_SkillList['prototype'][_0x3addb4(0x12f)]=function(_0x184abc){const _0x84a4d1=_0x3addb4;if(_0x184abc&&_0x184abc[_0x84a4d1(0x1d4)]['match'](/<LIST NAME:[ ](.*)>/i)){_0x184abc['name']=String(RegExp['$1'])[_0x84a4d1(0x253)]();for(;;){if(_0x184abc[_0x84a4d1(0x165)][_0x84a4d1(0x21f)](/\\V\[(\d+)\]/gi))_0x184abc[_0x84a4d1(0x165)]=_0x184abc[_0x84a4d1(0x165)][_0x84a4d1(0x216)](/\\V\[(\d+)\]/gi,(_0x48a133,_0x3273e0)=>$gameVariables[_0x84a4d1(0x1a8)](parseInt(_0x3273e0)));else break;}}},Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x152)]=function(_0x1d8a48,_0x5487e5,_0x5be4b8,_0x1d422e){const _0x1288f6=_0x3addb4;Window_Base['prototype'][_0x1288f6(0x152)][_0x1288f6(0x1d8)](this,this[_0x1288f6(0x108)],_0x1d8a48,_0x5487e5,_0x5be4b8,_0x1d422e);},Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x1c3)]=function(_0x549fd9){const _0x2b0dae=_0x3addb4;this[_0x2b0dae(0x245)]=_0x549fd9,this[_0x2b0dae(0x238)]();},VisuMZ[_0x3addb4(0x34e)][_0x3addb4(0x251)]=Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x3a4)],Window_SkillList[_0x3addb4(0x29a)][_0x3addb4(0x3a4)]=function(){const _0x125d7b=_0x3addb4;VisuMZ[_0x125d7b(0x34e)]['Window_SkillList_updateHelp']['call'](this),this[_0x125d7b(0x245)]&&this['_statusWindow'][_0x125d7b(0x32c)]===Window_ShopStatus&&this[_0x125d7b(0x245)]['setItem'](this[_0x125d7b(0x351)]());};