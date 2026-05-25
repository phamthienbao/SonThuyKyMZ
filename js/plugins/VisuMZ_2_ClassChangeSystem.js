//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.19;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.19] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
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
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How come the <Passive State: x> notetag doesn't work with subclasses?
 * 
 * A. This is intentional. We didn't want passive state notetags read while the
 * class is equipped as a subclass. This is to prevent things like having
 * a primary class Healer with a Double Healing passive state to carry that
 * over for their subclass.
 * 
 * However, the effect is still achievable. Instead of putting the notetag
 * <Passive State: x> on the class itself, put it on a skill that the class
 * learns. Then, insert into the passive this notetag from  Skills & States
 * Core: <Passive Condition Multiclass: id, id, id>
 * 
 * As long as any of those ID's match with a main class or subclass, then
 * the passive state will have its condition be met and become available.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 * depending on the primary class and how they're set up. To avoid
 * conflicting with subclass resources and requirements, the Skill Learn
 * System only makes it available for the primary class to learn skills from
 * at a time. To learn skills from a subclass through the Skill Learn System
 * the player would have to change to the subclass' class as the primary and
 * then learn from it.
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
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <CP Plus: +x%>
 * <CP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <CP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <CP Flat: +x%>
 * <CP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <JP Plus: +x%>
 * <JP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <JP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <JP Flat: +x%>
 * <JP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
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
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * 
 *   Select Same Subclass?:
 *   - Allow selecting the same subclass that's already equipped in that slot?
 *   - Mostly an aesthetic thing to allow/prevent the same subclass from being
 *     selected if that's what you want to control.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
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
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 * 
 *     Play for Unassign?:
 *     - Play animation for unassigning a subclass?
 *     - Mostly an aesthetic thing to play/not play animations when unassigning
 *       a subclass if that's what you want to control.
 * 
 *   Show Class Level?
 *   - Show the class level when displaying classes?
 *   - Used for the windows in the Class Change menu.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 *   - For extra clarity:
 *     - Shows up if there is enough room on the screen. Make sure your game's
 *       screen resolution is large enough (ie. 1280x720).
 *     - Shows up in the Skill menu if 'Learn' is selected.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
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
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
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
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 *   - For extra clarity:
 *     - Shows up if there is enough room on the screen. Make sure your game's
 *       screen resolution is large enough (ie. 1280x720).
 *     - Shows up in the Skill menu if 'Learn' is selected.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
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
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
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
 * Version 1.19: December 15, 2025
 * * Documentation Update!
 * ** Added extra notes for clarity for the "Show in Menus?" plugin parameter
 *    for CP and JP.
 * *** For extra clarity:
 * **** Shows up if there is enough room on the screen. Make sure your game's
 *      screen resolution is large enough (ie. 1280x720).
 * **** Shows up in the Skill menu if 'Learn' is selected.
 * * Compatibility Update!
 * ** Added better preloading functionality for Main Menu Core's options to
 *    utilize Map Sprites and SV Battlers for the visual actor graphic.
 * 
 * Version 1.18: June 12, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new line for <CP Rate: x%>
 * *** CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * ** Added new line for <JP Rate: x%>
 * *** JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <CP Plus: +x%>
 * *** <CP Plus: -x%>
 * *** <CP Flat: +x%>
 * *** <CP Flat: -x%>
 * *** <JP Plus: +x%>
 * *** <JP Plus: -x%>
 * *** <JP Flat: +x%>
 * *** <JP Flat: -x%>
 * **** These are the additive versions of <CP Rate: x%> and <JP Rate: x%>
 * **** See help file for more information.
 * 
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon loading a save game that was made
 *    before Class Change System was installed. Fix made by Olivia.
 * 
 * Version 1.16: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameters added by Irina:
 * *** Parameters > General Settings > Select Same Subclass?
 * **** Allow selecting the same subclass that's already equipped in that slot?
 * **** Mostly an aesthetic thing to allow/prevent the same subclass from being
 *      selected if that's what you want to control.
 * *** Parameters > Window Settings > Confirm Animation ID > Play for Unassign?
 * **** Play animation for unassigning a subclass?
 * **** Mostly an aesthetic thing to play/not play animations when unassigning
 *      a subclass if that's what you want to control.
 * 
 * Version 1.15: December 14, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with the \Class[x] textcode from the VisuStella
 *    MZ message core. Fix made by Irina.
 * 
 * Version 1.14: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Window Settings > Show Class Level?
 * **** Show the class level when displaying classes?
 * **** Used for the windows in the Class Change menu.
 * 
 * Version 1.13: May 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the element rate traits of subclasses did not apply.
 *    Fix made by Olivia.
 * 
 * Version 1.12: April 14, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain face index values not registering properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Added a better bitmap loading system for face graphics. Update by Irina.
 * 
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
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
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
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
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 *
 * @param AllowSameSubclassSelect:eval
 * @text Select Same Subclass?
 * @parent Basics
 * @type boolean
 * @on Allow Selection
 * @off Disallow Selection
 * @desc Allow selecting the same subclass that's already equipped in that slot?
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
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
 * @default Equip2
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
 * @max 100
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
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
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
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param AllowClearClassAni:eval
 * @text Play for Unassign?
 * @parent ConfirmAnimationID:num
 * @type boolean
 * @on Play Animation
 * @off Don't Play
 * @desc Play animation for unassigning a subclass?
 * @default true
 *
 * @param ShowClassLevel:eval
 * @text Show Class Level?
 * @parent Scene
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the class level when displaying classes?
 * Used for the windows in the Class Change menu.
 * @default true
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
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
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
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
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
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
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
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
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
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
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
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
 * @desc Show how much CP an actor has earned in battle during the
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
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
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
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
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
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
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
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
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
 * @desc Show how much JP an actor has earned in battle during the
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
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
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
//=============================================================================

const _0x46f615=_0x16e6;(function(_0x58dc4,_0x18c99f){const _0x2d57dd=_0x16e6,_0x47bd5c=_0x58dc4();while(!![]){try{const _0x333cff=parseInt(_0x2d57dd(0x21f))/0x1+parseInt(_0x2d57dd(0x2b2))/0x2*(-parseInt(_0x2d57dd(0xf2))/0x3)+parseInt(_0x2d57dd(0x327))/0x4+-parseInt(_0x2d57dd(0x1f0))/0x5+-parseInt(_0x2d57dd(0x312))/0x6*(-parseInt(_0x2d57dd(0x324))/0x7)+-parseInt(_0x2d57dd(0x264))/0x8+-parseInt(_0x2d57dd(0x28b))/0x9*(parseInt(_0x2d57dd(0x309))/0xa);if(_0x333cff===_0x18c99f)break;else _0x47bd5c['push'](_0x47bd5c['shift']());}catch(_0x38b231){_0x47bd5c['push'](_0x47bd5c['shift']());}}}(_0x20f0,0xbde8d));var label=_0x46f615(0x29f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x46f615(0x1ce)](function(_0x41293b){const _0x450a76=_0x46f615;return _0x41293b[_0x450a76(0x1f7)]&&_0x41293b[_0x450a76(0x183)][_0x450a76(0x158)]('['+label+']');})[0x0];VisuMZ[label][_0x46f615(0xd6)]=VisuMZ[label][_0x46f615(0xd6)]||{},VisuMZ[_0x46f615(0x124)]=function(_0x5115fe,_0x27e35f){const _0x18bafc=_0x46f615;for(const _0x3b26b3 in _0x27e35f){if(_0x3b26b3[_0x18bafc(0xfc)](/(.*):(.*)/i)){const _0x4f53af=String(RegExp['$1']),_0x59f64f=String(RegExp['$2'])[_0x18bafc(0x19d)]()[_0x18bafc(0x27b)]();let _0xbcf69b,_0x59b59f,_0x536ef0;switch(_0x59f64f){case _0x18bafc(0x219):_0xbcf69b=_0x27e35f[_0x3b26b3]!==''?Number(_0x27e35f[_0x3b26b3]):0x0;break;case'ARRAYNUM':_0x59b59f=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):[],_0xbcf69b=_0x59b59f['map'](_0x55e983=>Number(_0x55e983));break;case _0x18bafc(0xae):_0xbcf69b=_0x27e35f[_0x3b26b3]!==''?eval(_0x27e35f[_0x3b26b3]):null;break;case _0x18bafc(0x1fe):_0x59b59f=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):[],_0xbcf69b=_0x59b59f[_0x18bafc(0x8d)](_0x5ba3a6=>eval(_0x5ba3a6));break;case _0x18bafc(0x2fc):_0xbcf69b=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):'';break;case _0x18bafc(0x13d):_0x59b59f=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):[],_0xbcf69b=_0x59b59f[_0x18bafc(0x8d)](_0x2bd254=>JSON[_0x18bafc(0x227)](_0x2bd254));break;case _0x18bafc(0x20c):_0xbcf69b=_0x27e35f[_0x3b26b3]!==''?new Function(JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3])):new Function(_0x18bafc(0x27f));break;case _0x18bafc(0x240):_0x59b59f=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):[],_0xbcf69b=_0x59b59f[_0x18bafc(0x8d)](_0x2365df=>new Function(JSON[_0x18bafc(0x227)](_0x2365df)));break;case _0x18bafc(0xd9):_0xbcf69b=_0x27e35f[_0x3b26b3]!==''?String(_0x27e35f[_0x3b26b3]):'';break;case'ARRAYSTR':_0x59b59f=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):[],_0xbcf69b=_0x59b59f['map'](_0x32db34=>String(_0x32db34));break;case _0x18bafc(0x128):_0x536ef0=_0x27e35f[_0x3b26b3]!==''?JSON[_0x18bafc(0x227)](_0x27e35f[_0x3b26b3]):{},_0xbcf69b=VisuMZ[_0x18bafc(0x124)]({},_0x536ef0);break;case'ARRAYSTRUCT':_0x59b59f=_0x27e35f[_0x3b26b3]!==''?JSON['parse'](_0x27e35f[_0x3b26b3]):[],_0xbcf69b=_0x59b59f[_0x18bafc(0x8d)](_0x2598b0=>VisuMZ[_0x18bafc(0x124)]({},JSON['parse'](_0x2598b0)));break;default:continue;}_0x5115fe[_0x4f53af]=_0xbcf69b;}}return _0x5115fe;},(_0x156a63=>{const _0x2a9b3b=_0x46f615,_0x4ba6f3=_0x156a63[_0x2a9b3b(0x91)];for(const _0x1e3027 of dependencies){if(!Imported[_0x1e3027]){alert(_0x2a9b3b(0x101)[_0x2a9b3b(0x181)](_0x4ba6f3,_0x1e3027)),SceneManager['exit']();break;}}const _0x5d7a68=_0x156a63['description'];if(_0x5d7a68[_0x2a9b3b(0xfc)](/\[Version[ ](.*?)\]/i)){const _0x1d53f0=Number(RegExp['$1']);_0x1d53f0!==VisuMZ[label][_0x2a9b3b(0x154)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2a9b3b(0x181)](_0x4ba6f3,_0x1d53f0)),SceneManager['exit']());}if(_0x5d7a68['match'](/\[Tier[ ](\d+)\]/i)){const _0x4f5b20=Number(RegExp['$1']);_0x4f5b20<tier?(alert(_0x2a9b3b(0x1e7)['format'](_0x4ba6f3,_0x4f5b20,tier)),SceneManager[_0x2a9b3b(0x251)]()):tier=Math[_0x2a9b3b(0x244)](_0x4f5b20,tier);}VisuMZ[_0x2a9b3b(0x124)](VisuMZ[label]['Settings'],_0x156a63['parameters']);})(pluginData),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x1ee),_0x286bd2=>{const _0x418048=_0x46f615;VisuMZ[_0x418048(0x124)](_0x286bd2,_0x286bd2);const _0x2b061e=_0x286bd2[_0x418048(0x112)][_0x418048(0x8d)](_0x221267=>$gameActors['actor'](_0x221267)),_0x46c800=_0x286bd2['Classes'];for(const _0x283cf0 of _0x2b061e){if(!_0x283cf0)continue;for(const _0x5238ae of _0x46c800){_0x283cf0[_0x418048(0x137)](_0x5238ae);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x79),_0x280587=>{const _0x26bcf4=_0x46f615;VisuMZ['ConvertParams'](_0x280587,_0x280587);const _0x1fa9e5=_0x280587[_0x26bcf4(0xca)];for(const _0x328c30 of _0x1fa9e5){$gameParty[_0x26bcf4(0x137)](_0x328c30);}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x217),_0x19d1cc=>{const _0x476c2e=_0x46f615;VisuMZ['ConvertParams'](_0x19d1cc,_0x19d1cc);const _0x307c40=_0x19d1cc[_0x476c2e(0x112)][_0x476c2e(0x8d)](_0x4a3bcc=>$gameActors[_0x476c2e(0x1f5)](_0x4a3bcc)),_0x2524f8=_0x19d1cc['Classes'];for(const _0x4dc837 of _0x307c40){if(!_0x4dc837)continue;for(const _0x21a842 of _0x2524f8){_0x4dc837[_0x476c2e(0x2e2)](_0x21a842);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0xd7),_0x3cb713=>{const _0x3c2c2b=_0x46f615;VisuMZ[_0x3c2c2b(0x124)](_0x3cb713,_0x3cb713);const _0x2cfe24=_0x3cb713[_0x3c2c2b(0xca)];for(const _0x4ea3dc of _0x2cfe24){$gameParty['removeUnlockedClass'](_0x4ea3dc);}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x1d2),_0x243bd3=>{const _0x42e3dc=_0x46f615;VisuMZ[_0x42e3dc(0x124)](_0x243bd3,_0x243bd3);const _0x275b55=_0x243bd3[_0x42e3dc(0x112)]['map'](_0x5a22f7=>$gameActors[_0x42e3dc(0x1f5)](_0x5a22f7)),_0x5f05be=_0x243bd3['Tiers'];for(const _0x4a2a3d of _0x275b55){if(!_0x4a2a3d)continue;for(const _0x247b73 of _0x5f05be){_0x4a2a3d[_0x42e3dc(0x1cc)](_0x247b73);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x2ed),_0x3ed7d0=>{const _0x4f4bd7=_0x46f615;VisuMZ['ConvertParams'](_0x3ed7d0,_0x3ed7d0);const _0x8b1763=_0x3ed7d0['Actors'][_0x4f4bd7(0x8d)](_0x51534a=>$gameActors[_0x4f4bd7(0x1f5)](_0x51534a)),_0x469c1c=_0x3ed7d0['Tiers'];for(const _0x25e776 of _0x8b1763){if(!_0x25e776)continue;for(const _0x3b4d76 of _0x469c1c){_0x25e776['removeClassChangeTierRestriction'](_0x3b4d76);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x94),_0x557ca7=>{const _0x1b2c9c=_0x46f615;VisuMZ[_0x1b2c9c(0x124)](_0x557ca7,_0x557ca7);const _0xda58b8=_0x557ca7['Actors']['map'](_0x555b74=>$gameActors['actor'](_0x555b74)),_0x358e33=_0x557ca7[_0x1b2c9c(0x323)],_0x263fdc=_0x557ca7[_0x1b2c9c(0xde)];for(const _0x2732c7 of _0xda58b8){if(!_0x2732c7)continue;_0x2732c7[_0x1b2c9c(0x9c)](_0x263fdc,_0x358e33);}}),PluginManager['registerCommand'](pluginData[_0x46f615(0x91)],_0x46f615(0x262),_0x1984a7=>{const _0x100896=_0x46f615;VisuMZ[_0x100896(0x124)](_0x1984a7,_0x1984a7);const _0x6e7bdf=_0x1984a7[_0x100896(0x112)][_0x100896(0x8d)](_0x3d8f58=>$gameActors['actor'](_0x3d8f58)),_0x907a62=_0x1984a7[_0x100896(0x258)];for(const _0x37d3bf of _0x6e7bdf){if(!_0x37d3bf)continue;_0x37d3bf[_0x100896(0x1ea)](_0x907a62);}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],'MulticlassLowerLimit',_0x3de0d0=>{const _0xa9b4d0=_0x46f615;VisuMZ[_0xa9b4d0(0x124)](_0x3de0d0,_0x3de0d0);const _0x8dcef3=_0x3de0d0[_0xa9b4d0(0x112)]['map'](_0xd1f7cb=>$gameActors[_0xa9b4d0(0x1f5)](_0xd1f7cb)),_0x3b5908=_0x3de0d0[_0xa9b4d0(0x258)];for(const _0x577830 of _0x8dcef3){if(!_0x577830)continue;_0x577830[_0xa9b4d0(0x2f3)](_0x3b5908);}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],'MulticlassSetLimit',_0xd90225=>{const _0x5120f4=_0x46f615;VisuMZ['ConvertParams'](_0xd90225,_0xd90225);const _0x256f3a=_0xd90225[_0x5120f4(0x112)][_0x5120f4(0x8d)](_0x4431eb=>$gameActors[_0x5120f4(0x1f5)](_0x4431eb)),_0x9dd739=_0xd90225[_0x5120f4(0x258)];for(const _0x3e9d7e of _0x256f3a){if(!_0x3e9d7e)continue;_0x3e9d7e[_0x5120f4(0x13a)](_0x9dd739);}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x284),_0x37f9e8=>{const _0x497076=_0x46f615;VisuMZ[_0x497076(0x124)](_0x37f9e8,_0x37f9e8);const _0x202a6e=_0x37f9e8[_0x497076(0x112)][_0x497076(0x8d)](_0x3b9fdb=>$gameActors[_0x497076(0x1f5)](_0x3b9fdb)),_0x226aa8=_0x37f9e8[_0x497076(0xca)],_0x4b4a33=_0x37f9e8['Points'];for(const _0x3526e9 of _0x202a6e){if(!_0x3526e9)continue;for(const _0x30ba3f of _0x226aa8){_0x3526e9[_0x497076(0xed)](_0x4b4a33,_0x30ba3f);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x275),_0x1c0eb4=>{const _0x149148=_0x46f615;VisuMZ[_0x149148(0x124)](_0x1c0eb4,_0x1c0eb4);const _0x5231ee=_0x1c0eb4[_0x149148(0x112)][_0x149148(0x8d)](_0x34f67a=>$gameActors[_0x149148(0x1f5)](_0x34f67a)),_0x4130fd=_0x1c0eb4[_0x149148(0xca)],_0x235e22=_0x1c0eb4[_0x149148(0x2d3)];for(const _0x86d082 of _0x5231ee){if(!_0x86d082)continue;for(const _0x49bdac of _0x4130fd){_0x86d082['addClassPoints'](_0x235e22,_0x49bdac);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x225),_0x3bb7ef=>{const _0x21f6c1=_0x46f615;VisuMZ[_0x21f6c1(0x124)](_0x3bb7ef,_0x3bb7ef);const _0x1b8ed4=_0x3bb7ef[_0x21f6c1(0x112)][_0x21f6c1(0x8d)](_0x2d3af6=>$gameActors['actor'](_0x2d3af6)),_0x542fda=_0x3bb7ef[_0x21f6c1(0xca)],_0x5dd76f=_0x3bb7ef[_0x21f6c1(0x2d3)];for(const _0x49340b of _0x1b8ed4){if(!_0x49340b)continue;for(const _0x3c9df8 of _0x542fda){_0x49340b[_0x21f6c1(0x16a)](_0x5dd76f,_0x3c9df8);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0xdc),_0x25163b=>{const _0x25402a=_0x46f615;VisuMZ[_0x25402a(0x124)](_0x25163b,_0x25163b);const _0x51e37b=_0x25163b[_0x25402a(0x112)][_0x25402a(0x8d)](_0x8e64b6=>$gameActors['actor'](_0x8e64b6)),_0x449ba5=_0x25163b[_0x25402a(0xca)],_0x1f5c62=_0x25163b[_0x25402a(0x2d3)];for(const _0x750dda of _0x51e37b){if(!_0x750dda)continue;for(const _0x1cb582 of _0x449ba5){_0x750dda[_0x25402a(0x20e)](_0x1f5c62,_0x1cb582);}}}),PluginManager[_0x46f615(0x277)](pluginData['name'],_0x46f615(0x28c),_0xee2212=>{const _0x2eabc3=_0x46f615;VisuMZ[_0x2eabc3(0x124)](_0xee2212,_0xee2212);const _0x166d80=_0xee2212[_0x2eabc3(0x112)]['map'](_0x337c7d=>$gameActors['actor'](_0x337c7d)),_0x3c4d97=_0xee2212[_0x2eabc3(0xca)],_0x4f83e1=_0xee2212[_0x2eabc3(0x2d3)];for(const _0x1484f1 of _0x166d80){if(!_0x1484f1)continue;for(const _0x1fa1e3 of _0x3c4d97){_0x1484f1[_0x2eabc3(0xa1)](_0x4f83e1,_0x1fa1e3);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],'JobPointsAdd',_0x42b3cc=>{const _0x137042=_0x46f615;VisuMZ[_0x137042(0x124)](_0x42b3cc,_0x42b3cc);const _0x2003f6=_0x42b3cc[_0x137042(0x112)]['map'](_0x5f47bb=>$gameActors['actor'](_0x5f47bb)),_0x139a01=_0x42b3cc[_0x137042(0xca)],_0x34291f=_0x42b3cc[_0x137042(0x2d3)];for(const _0x1f16ac of _0x2003f6){if(!_0x1f16ac)continue;for(const _0x52be49 of _0x139a01){_0x1f16ac[_0x137042(0xc0)](_0x34291f,_0x52be49);}}}),PluginManager['registerCommand'](pluginData[_0x46f615(0x91)],_0x46f615(0x185),_0x5538e0=>{const _0x460c2b=_0x46f615;VisuMZ[_0x460c2b(0x124)](_0x5538e0,_0x5538e0);const _0x1c372c=_0x5538e0[_0x460c2b(0x112)]['map'](_0x537649=>$gameActors[_0x460c2b(0x1f5)](_0x537649)),_0x283202=_0x5538e0[_0x460c2b(0xca)],_0x34f932=_0x5538e0[_0x460c2b(0x2d3)];for(const _0x3ddf55 of _0x1c372c){if(!_0x3ddf55)continue;for(const _0x6bdcb of _0x283202){_0x3ddf55['loseJobPoints'](_0x34f932,_0x6bdcb);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x305),_0x1fc0d3=>{const _0x47cff4=_0x46f615;VisuMZ[_0x47cff4(0x124)](_0x1fc0d3,_0x1fc0d3);const _0x44ff8f=_0x1fc0d3[_0x47cff4(0x112)][_0x47cff4(0x8d)](_0x5a28de=>$gameActors['actor'](_0x5a28de)),_0x44e130=_0x1fc0d3[_0x47cff4(0xca)],_0x5bc30e=_0x1fc0d3[_0x47cff4(0x2d3)];for(const _0x3e6cff of _0x44ff8f){if(!_0x3e6cff)continue;for(const _0x19ead9 of _0x44e130){_0x3e6cff['setJobPoints'](_0x5bc30e,_0x19ead9);}}}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x8c),_0x58e730=>{const _0x3c23e9=_0x46f615;VisuMZ[_0x3c23e9(0x124)](_0x58e730,_0x58e730),$gameSystem[_0x3c23e9(0x76)](_0x58e730[_0x3c23e9(0x2c5)]);}),PluginManager[_0x46f615(0x277)](pluginData[_0x46f615(0x91)],_0x46f615(0x1e4),_0x32fdd3=>{const _0x5d8bc5=_0x46f615;VisuMZ[_0x5d8bc5(0x124)](_0x32fdd3,_0x32fdd3),$gameSystem[_0x5d8bc5(0xdf)](_0x32fdd3[_0x5d8bc5(0x2ad)]);}),VisuMZ[_0x46f615(0x29f)][_0x46f615(0x2eb)]=function(){try{}catch(_0x1a3b68){if($gameTemp['isPlaytest']())console['log'](_0x1a3b68);}},VisuMZ[_0x46f615(0x29f)]['RegExp']={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsPlus':/<(?:CLASS POINTS|CP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'ClassPointsFlat':/<(?:CLASS POINTS|CP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsPlus':/<(?:CLASS POINTS|CP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'JobPointsFlat':/<(?:CLASS POINTS|CP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x13e)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x46f615(0x13c)][_0x46f615(0x25b)]=function(){const _0x3aab14=_0x46f615;VisuMZ['ClassChangeSystem'][_0x3aab14(0x13e)][_0x3aab14(0x115)](this),this[_0x3aab14(0x2b8)]();},Scene_Boot['prototype'][_0x46f615(0x2b8)]=function(){const _0x59d631=_0x46f615;this[_0x59d631(0x212)]();},Scene_Boot[_0x46f615(0x13c)]['process_VisuMZ_ClassChangeSystem_Notetags']=function(){const _0x51b7cc=_0x46f615;if(VisuMZ[_0x51b7cc(0xa5)])return;for(const _0x5696ed of $dataActors){if(!_0x5696ed)continue;ImageManager[_0x51b7cc(0x314)](_0x5696ed);}for(const _0x2b976 of $dataClasses){if(!_0x2b976)continue;VisuMZ['ClassChangeSystem'][_0x51b7cc(0x7f)](_0x2b976);}},VisuMZ[_0x46f615(0x29f)]['JS']={},VisuMZ[_0x46f615(0x29f)]['createJS']=function(_0x31e5a5,_0x5be446,_0xf7cd2b){const _0x33cff5=_0x46f615,_0x4b9664=_0x31e5a5['note'];if(_0x4b9664[_0x33cff5(0xfc)](_0xf7cd2b)){const _0x1a0c97=String(RegExp['$1']),_0x5ac67e=_0x33cff5(0x32b)[_0x33cff5(0x181)](_0x1a0c97),_0x41744d=VisuMZ['ClassChangeSystem'][_0x33cff5(0x12b)](_0x31e5a5,_0x5be446);VisuMZ[_0x33cff5(0x29f)]['JS'][_0x41744d]=new Function(_0x5ac67e);}},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x12b)]=function(_0x4ce8ce,_0x52de26){const _0x4d1e8e=_0x46f615;let _0x2fbd85='';if($dataActors[_0x4d1e8e(0x158)](_0x4ce8ce))_0x2fbd85=_0x4d1e8e(0x29d)[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);if($dataClasses[_0x4d1e8e(0x158)](_0x4ce8ce))_0x2fbd85='Class-%1-%2'[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);if($dataSkills[_0x4d1e8e(0x158)](_0x4ce8ce))_0x2fbd85=_0x4d1e8e(0xe8)[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);if($dataItems[_0x4d1e8e(0x158)](_0x4ce8ce))_0x2fbd85='Item-%1-%2'[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);if($dataWeapons['includes'](_0x4ce8ce))_0x2fbd85=_0x4d1e8e(0x28d)[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);if($dataArmors['includes'](_0x4ce8ce))_0x2fbd85=_0x4d1e8e(0x23e)[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);if($dataEnemies[_0x4d1e8e(0x158)](_0x4ce8ce))_0x2fbd85=_0x4d1e8e(0x1e2)['format'](_0x4ce8ce['id'],_0x52de26);if($dataStates[_0x4d1e8e(0x158)](_0x4ce8ce))_0x2fbd85=_0x4d1e8e(0x1b9)[_0x4d1e8e(0x181)](_0x4ce8ce['id'],_0x52de26);return _0x2fbd85;},VisuMZ[_0x46f615(0x29f)]['ParseActorNotetags']=VisuMZ[_0x46f615(0x2e0)],VisuMZ[_0x46f615(0x2e0)]=function(_0xda061f){const _0x2d290b=_0x46f615;VisuMZ[_0x2d290b(0x29f)][_0x2d290b(0x2e0)][_0x2d290b(0x115)](this,_0xda061f),ImageManager[_0x2d290b(0x314)](_0xda061f);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0xc8)]=VisuMZ[_0x46f615(0xc8)],VisuMZ[_0x46f615(0xc8)]=function(_0x5d2a52){const _0x429b1b=_0x46f615;VisuMZ[_0x429b1b(0x29f)]['ParseClassNotetags'][_0x429b1b(0x115)](this,_0x5d2a52),VisuMZ[_0x429b1b(0x29f)][_0x429b1b(0x7f)](_0x5d2a52),VisuMZ[_0x429b1b(0x29f)]['Parse_ClassIcons'](_0x5d2a52);},VisuMZ[_0x46f615(0x29f)]['Parse_Notetags_Basic']=function(_0x5d0369){const _0x33724e=_0x46f615;_0x5d0369[_0x33724e(0x2df)]=ImageManager['classIcon']||0x0,_0x5d0369[_0x33724e(0x183)]=TextManager[_0x33724e(0x2ca)][_0x33724e(0x181)](_0x5d0369[_0x33724e(0x91)]||'');const _0x3b9f68=VisuMZ[_0x33724e(0x29f)]['RegExp'],_0x54c0ce=_0x5d0369[_0x33724e(0x10c)];_0x54c0ce[_0x33724e(0xfc)](_0x3b9f68[_0x33724e(0x31a)])&&(_0x5d0369['iconIndex']=Number(RegExp['$1'])),_0x54c0ce[_0x33724e(0xfc)](_0x3b9f68[_0x33724e(0x266)])&&(_0x5d0369['description']=String(RegExp['$1']));},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x30e)]=function(_0x11dfb1){const _0xd2ea2d=_0x46f615;_0x11dfb1[_0xd2ea2d(0x91)][_0xd2ea2d(0xfc)](/\\I\[(\d+)\]/i)&&(_0x11dfb1[_0xd2ea2d(0x2df)]=Number(RegExp['$1']));if(Imported[_0xd2ea2d(0xb0)]){if(VisuMZ[_0xd2ea2d(0x2cc)][_0xd2ea2d(0xd6)]['UI'][_0xd2ea2d(0x14a)]){const _0x151dc9=_0xd2ea2d(0x143);_0x11dfb1[_0xd2ea2d(0x91)]=_0x151dc9[_0xd2ea2d(0x181)](_0x11dfb1[_0xd2ea2d(0x2df)],_0x11dfb1[_0xd2ea2d(0x91)]);}else _0x11dfb1[_0xd2ea2d(0x91)]=_0x11dfb1['name'][_0xd2ea2d(0x2a9)](/\x1bI\[(\d+)\]/gi,''),_0x11dfb1[_0xd2ea2d(0x91)]=_0x11dfb1[_0xd2ea2d(0x91)][_0xd2ea2d(0x2a9)](/\\I\[(\d+)\]/gi,'');}},DataManager['getActorUnlockedClasses']=function(_0x52a118){const _0x21e8e1=_0x46f615;if(!_0x52a118)return[];let _0x219a36=[];return _0x219a36=_0x219a36['concat'](_0x52a118[_0x21e8e1(0x163)]()[_0x21e8e1(0x8d)](_0x5bda04=>_0x5bda04['id'])),_0x219a36=_0x219a36[_0x21e8e1(0x156)](_0x52a118[_0x21e8e1(0x2e1)]()),_0x219a36=_0x219a36[_0x21e8e1(0x156)]($gameParty[_0x21e8e1(0x2e1)]()),_0x219a36=_0x219a36[_0x21e8e1(0x156)](VisuMZ[_0x21e8e1(0x29f)]['Settings']['General'][_0x21e8e1(0x293)]),_0x219a36=_0x219a36[_0x21e8e1(0x1ce)]((_0xe63e22,_0x3ef33c,_0x2e9c93)=>_0x2e9c93['indexOf'](_0xe63e22)===_0x3ef33c),_0x219a36['sort'](function(_0x8de842,_0x93d8e8){return _0x8de842-_0x93d8e8;}),_0x219a36['map'](_0xb2b90d=>$dataClasses[_0xb2b90d])[_0x21e8e1(0x7d)](null);},DataManager[_0x46f615(0x199)]=function(_0x2244c0){const _0x2bb9f0=_0x46f615,_0x52513b=[],_0x4ac4c9=DataManager[_0x2bb9f0(0x73)](_0x2244c0);for(const _0x10dc00 of $dataClasses){if(!_0x10dc00)continue;if(_0x4ac4c9[_0x2bb9f0(0x158)](_0x10dc00))continue;this[_0x2bb9f0(0x308)](_0x2244c0,_0x10dc00)&&_0x52513b[_0x2bb9f0(0x215)](_0x10dc00['id']);}return _0x52513b;},DataManager[_0x46f615(0x308)]=function(_0x3fccc4,_0x2074c6){const _0x8d14ef=_0x46f615;if(!_0x3fccc4)return![];if(!_0x2074c6)return![];const _0x567c73=VisuMZ[_0x8d14ef(0x29f)][_0x8d14ef(0xd2)],_0x5983cd=_0x2074c6[_0x8d14ef(0x10c)];if(_0x5983cd[_0x8d14ef(0xfc)](_0x567c73['AutoUnlockRequirements'])){const _0x1dcf64=String(RegExp['$1'])[_0x8d14ef(0x178)](/[\r\n]+/);for(const _0x23c456 of _0x1dcf64){let _0x515717=0x0;if(_0x23c456[_0x8d14ef(0xfc)](/(.*):[ ](.*)/i)){const _0x43e8c5=String(RegExp['$1']),_0x4e7f09=String(RegExp['$2']);if(_0x43e8c5['match'](/CLASS[ ](\d+)/i))_0x515717=Number(RegExp['$1']);else{if(_0x43e8c5[_0x8d14ef(0xfc)](/CLASS[ ](.*)/i))_0x515717=this[_0x8d14ef(0x2e9)](RegExp['$1']);else{if(_0x43e8c5[_0x8d14ef(0xfc)](/\b(?:AP|CP|JP|SP)\b/i)){const _0x3e3d18=_0x43e8c5[_0x8d14ef(0x19d)]()[_0x8d14ef(0x27b)](),_0x2e51c4=Number(_0x4e7f09)||0x0;if(Imported['VisuMZ_2_SkillLearnSystem']){if(_0x3e3d18==='AP'){const _0x26d090=_0x3fccc4['getAbilityPoints']();if(_0x26d090<_0x2e51c4)return![];}else{if(_0x3e3d18==='SP'){const _0x39ed84=_0x3fccc4['getSkillPoints']();if(_0x39ed84<_0x2e51c4)return![];}}}if(Imported['VisuMZ_2_ClassChangeSystem']){if(_0x3e3d18==='CP'){const _0x35ed2c=_0x3fccc4[_0x8d14ef(0x7b)]();if(_0x35ed2c<_0x2e51c4)return![];}else{if(_0x3e3d18==='JP'){const _0x325eec=_0x3fccc4[_0x8d14ef(0x1ac)]();if(_0x325eec<_0x2e51c4)return![];}}}}}}if(_0x4e7f09[_0x8d14ef(0xfc)](/LEVEL[ ](\d+)/i)){const _0xf1aa45=Number(RegExp['$1']);if(_0x3fccc4[_0x8d14ef(0x320)](_0x515717)<_0xf1aa45)return![];}else{if(_0x4e7f09[_0x8d14ef(0xfc)](/(\d+)[ ]CP/i)){const _0x1a07ef=Number(RegExp['$1']);if(_0x3fccc4[_0x8d14ef(0x7b)](_0x515717)<_0x1a07ef)return![];}else{if(_0x4e7f09[_0x8d14ef(0xfc)](/(\d+)[ ]JP/i)){const _0x229dc6=Number(RegExp['$1']);if(_0x3fccc4[_0x8d14ef(0x1ac)](_0x515717)<_0x229dc6)return![];}else{if(_0x4e7f09[_0x8d14ef(0xfc)](/(\d+)[ ]AP/i)){if(!Imported[_0x8d14ef(0x17e)])continue;const _0xd33a18=Number(RegExp['$1']);if(_0x3fccc4[_0x8d14ef(0x1e3)](_0x515717)<_0xd33a18)return![];}else{if(_0x4e7f09[_0x8d14ef(0xfc)](/(\d+)[ ]SP/i)){const _0x591204=Number(RegExp['$1']);if(_0x3fccc4['getSkillPoints'](_0x515717)<_0x591204)return![];}}}}}}}return!![];}return![];},DataManager['getClassChangeTiersOnly']=function(_0x2bb700){const _0x336eed=_0x46f615;if(!_0x2bb700)return[];const _0x43d0ab=VisuMZ[_0x336eed(0x29f)][_0x336eed(0xd2)],_0x436156=_0x2bb700[_0x336eed(0x10c)];let _0xfd4210=[];const _0x21fb68=_0x436156['match'](_0x43d0ab[_0x336eed(0x102)]);if(_0x21fb68){for(const _0x46e1f6 of _0x21fb68){if(!_0x46e1f6)continue;_0x46e1f6['match'](_0x43d0ab['TierOnlyClass']);const _0x550bd4=String(RegExp['$1'])[_0x336eed(0x178)](',')[_0x336eed(0x8d)](_0x2d4661=>Number(_0x2d4661))['remove'](null)['remove'](undefined)['remove'](NaN);_0xfd4210=_0xfd4210[_0x336eed(0x156)](_0x550bd4);}return _0xfd4210;}else{const _0x530810=VisuMZ[_0x336eed(0x29f)][_0x336eed(0xd6)][_0x336eed(0x2b7)]['length'];return Array['from']({'length':_0x530810},(_0x4ddcba,_0x128926)=>_0x128926+0x1);}},DataManager[_0x46f615(0x2e9)]=function(_0x1253d5){const _0x244caf=_0x46f615;_0x1253d5=_0x1253d5[_0x244caf(0x19d)]()[_0x244caf(0x27b)](),this['_classIDs']=this[_0x244caf(0xb4)]||{};if(this[_0x244caf(0xb4)][_0x1253d5])return this[_0x244caf(0xb4)][_0x1253d5];for(const _0x16adeb of $dataClasses){if(!_0x16adeb)continue;let _0x173180=_0x16adeb[_0x244caf(0x91)];_0x173180=_0x173180[_0x244caf(0x2a9)](/\x1I\[(\d+)\]/gi,''),_0x173180=_0x173180[_0x244caf(0x2a9)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x173180[_0x244caf(0x19d)]()[_0x244caf(0x27b)]()]=_0x16adeb['id'];}return this[_0x244caf(0xb4)][_0x1253d5]||0x0;},ImageManager[_0x46f615(0x28e)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)]['ClassPoints'][_0x46f615(0x241)],ImageManager[_0x46f615(0x1d3)]=VisuMZ[_0x46f615(0x29f)]['Settings'][_0x46f615(0x205)][_0x46f615(0x241)],ImageManager[_0x46f615(0x2ae)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)]['General']['Icon'],ImageManager['actorClassFaceName']={},ImageManager[_0x46f615(0x2d2)]={},ImageManager[_0x46f615(0x2bb)]={},ImageManager[_0x46f615(0x1f4)]={},ImageManager[_0x46f615(0x29c)]={},ImageManager['actorClassMenuPortrait']={},ImageManager[_0x46f615(0x17b)]={},ImageManager['registerActorClassImages']=function(_0x2f1f5a){const _0x25cb07=_0x46f615;if(!_0x2f1f5a)return;const _0x1d2ec8=VisuMZ['ClassChangeSystem'][_0x25cb07(0xd2)],_0x58e47e=_0x2f1f5a[_0x25cb07(0x10c)],_0x2ea37b=_0x2f1f5a['id'],_0xc49f24=_0x58e47e[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0x2a6)]);if(_0xc49f24)for(const _0x36dbd8 of _0xc49f24){if(!_0x36dbd8)continue;_0x36dbd8[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0x2a6)]);const _0x599a6c=String(RegExp['$1']),_0x1e4929=String(RegExp['$2'])[_0x25cb07(0x27b)](),_0x5eda12=Number(RegExp['$3']);let _0x53e457=0x0;if(_0x599a6c[_0x25cb07(0xfc)](/CLASS[ ](\d+)/i))_0x53e457=Number(RegExp['$1']);else _0x599a6c[_0x25cb07(0xfc)](/CLASS[ ](.*)/i)?_0x53e457=DataManager[_0x25cb07(0x2e9)](RegExp['$1']):_0x53e457=DataManager[_0x25cb07(0x2e9)](_0x599a6c);if(_0x53e457>0x0){const _0x718f0a=_0x25cb07(0x2b9)[_0x25cb07(0x181)](_0x2ea37b,_0x53e457);ImageManager[_0x25cb07(0x1a9)][_0x718f0a]=_0x1e4929,ImageManager['actorClassFaceIndex'][_0x718f0a]=_0x5eda12;}}const _0x174e8e=_0x58e47e[_0x25cb07(0xfc)](_0x1d2ec8['ClassCharaName']);if(_0x174e8e)for(const _0x2acc6a of _0x174e8e){if(!_0x2acc6a)continue;_0x2acc6a[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0x22e)]);const _0x515f0a=String(RegExp['$1']),_0x1dff43=String(RegExp['$2'])[_0x25cb07(0x27b)](),_0x2cc29d=Number(RegExp['$3']);let _0x2ba80f=0x0;if(_0x515f0a[_0x25cb07(0xfc)](/CLASS[ ](\d+)/i))_0x2ba80f=Number(RegExp['$1']);else _0x515f0a[_0x25cb07(0xfc)](/CLASS[ ](.*)/i)?_0x2ba80f=DataManager[_0x25cb07(0x2e9)](RegExp['$1']):_0x2ba80f=DataManager[_0x25cb07(0x2e9)](_0x515f0a);if(_0x2ba80f>0x0){const _0x2dd4ab=_0x25cb07(0x2b9)[_0x25cb07(0x181)](_0x2ea37b,_0x2ba80f);ImageManager[_0x25cb07(0x2bb)][_0x2dd4ab]=_0x1dff43,ImageManager['actorClassCharacterIndex'][_0x2dd4ab]=_0x2cc29d;}}const _0x5049da=_0x58e47e[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0x26e)]);if(_0x5049da)for(const _0x1bb06c of _0x5049da){if(!_0x1bb06c)continue;_0x1bb06c[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0x26e)]);const _0x5a0013=String(RegExp['$1']),_0x100639=String(RegExp['$2'])[_0x25cb07(0x27b)]();let _0x2a0d61=0x0;if(_0x5a0013['match'](/CLASS[ ](\d+)/i))_0x2a0d61=Number(RegExp['$1']);else _0x5a0013[_0x25cb07(0xfc)](/CLASS[ ](.*)/i)?_0x2a0d61=DataManager[_0x25cb07(0x2e9)](RegExp['$1']):_0x2a0d61=DataManager[_0x25cb07(0x2e9)](_0x5a0013);if(_0x2a0d61>0x0){const _0x4b6f91=_0x25cb07(0x2b9)['format'](_0x2ea37b,_0x2a0d61);ImageManager[_0x25cb07(0x29c)][_0x4b6f91]=_0x100639;}}const _0x4be65d=_0x58e47e['match'](_0x1d2ec8[_0x25cb07(0xb6)]);if(_0x4be65d)for(const _0x4c9e2a of _0x4be65d){if(!_0x4c9e2a)continue;_0x4c9e2a[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0xb6)]);const _0x108471=String(RegExp['$1']),_0xdc32a=String(RegExp['$2'])[_0x25cb07(0x27b)]();let _0x1e5ed4=0x0;if(_0x108471[_0x25cb07(0xfc)](/CLASS[ ](\d+)/i))_0x1e5ed4=Number(RegExp['$1']);else _0x108471['match'](/CLASS[ ](.*)/i)?_0x1e5ed4=DataManager[_0x25cb07(0x2e9)](RegExp['$1']):_0x1e5ed4=DataManager[_0x25cb07(0x2e9)](_0x108471);if(_0x1e5ed4>0x0){const _0x1e353b=_0x25cb07(0x2b9)[_0x25cb07(0x181)](_0x2ea37b,_0x1e5ed4);ImageManager[_0x25cb07(0xcb)][_0x1e353b]=_0xdc32a;}}const _0x1a99dd=_0x58e47e[_0x25cb07(0xfc)](_0x1d2ec8[_0x25cb07(0x1bc)]);if(_0x1a99dd)for(const _0x1a28a7 of _0x1a99dd){if(!_0x1a28a7)continue;_0x1a28a7[_0x25cb07(0xfc)](_0x1d2ec8['ClassBattlePortrait']);const _0x309a34=String(RegExp['$1']),_0x38f25b=String(RegExp['$2'])[_0x25cb07(0x27b)]();let _0x44cc31=0x0;if(_0x309a34['match'](/CLASS[ ](\d+)/i))_0x44cc31=Number(RegExp['$1']);else _0x309a34['match'](/CLASS[ ](.*)/i)?_0x44cc31=DataManager[_0x25cb07(0x2e9)](RegExp['$1']):_0x44cc31=DataManager[_0x25cb07(0x2e9)](_0x309a34);if(_0x44cc31>0x0){const _0x4882f8=_0x25cb07(0x2b9)[_0x25cb07(0x181)](_0x2ea37b,_0x44cc31);ImageManager[_0x25cb07(0x17b)][_0x4882f8]=_0x38f25b;}}},ImageManager[_0x46f615(0x220)]=function(_0x468b2f){const _0x559c64=_0x46f615;if(!_0x468b2f)return'';const _0x43f031=_0x559c64(0x2b9)[_0x559c64(0x181)](_0x468b2f[_0x559c64(0x1c4)](),_0x468b2f[_0x559c64(0x2e4)]()['id']);return ImageManager[_0x559c64(0x1a9)][_0x43f031]??'';},ImageManager[_0x46f615(0x1c3)]=function(_0x3aa27e){const _0x537449=_0x46f615;if(!_0x3aa27e)return undefined;const _0x550426='Actor-%1-Class-%2'[_0x537449(0x181)](_0x3aa27e[_0x537449(0x1c4)](),_0x3aa27e[_0x537449(0x2e4)]()['id']);return ImageManager[_0x537449(0x2d2)][_0x550426]??undefined;},ImageManager[_0x46f615(0x171)]=function(_0x5d9eb0){const _0x572bb6=_0x46f615;if(!_0x5d9eb0)return'';const _0x500063=_0x572bb6(0x2b9)[_0x572bb6(0x181)](_0x5d9eb0[_0x572bb6(0x1c4)](),_0x5d9eb0[_0x572bb6(0x2e4)]()['id']);return ImageManager['actorClassCharacterName'][_0x500063]??'';},ImageManager['getActorClassCharacterIndex']=function(_0x416ec5){const _0x37c9cb=_0x46f615;if(!_0x416ec5)return undefined;const _0x352387=_0x37c9cb(0x2b9)['format'](_0x416ec5[_0x37c9cb(0x1c4)](),_0x416ec5['currentClass']()['id']);return ImageManager['actorClassCharacterIndex'][_0x352387]??undefined;},ImageManager[_0x46f615(0x6e)]=function(_0x19c694){const _0x2b514b=_0x46f615;if(!_0x19c694)return'';const _0x3c9452=_0x2b514b(0x2b9)['format'](_0x19c694[_0x2b514b(0x1c4)](),_0x19c694[_0x2b514b(0x2e4)]()['id']);return ImageManager['actorClassBattlerName'][_0x3c9452]??'';},ImageManager['getActorClassMenuPortrait']=function(_0xa5ffc9){const _0x17317e=_0x46f615;if(!_0xa5ffc9)return'';const _0x463135=_0x17317e(0x2b9)['format'](_0xa5ffc9[_0x17317e(0x1c4)](),_0xa5ffc9['currentClass']()['id']);return ImageManager[_0x17317e(0xcb)][_0x463135]??'';},ImageManager['getActorClassBattlePortrait']=function(_0x14a3f9){const _0x84912f=_0x46f615;if(!_0x14a3f9)return'';const _0x45b18c=_0x84912f(0x2b9)[_0x84912f(0x181)](_0x14a3f9[_0x84912f(0x1c4)](),_0x14a3f9[_0x84912f(0x2e4)]()['id']);return ImageManager[_0x84912f(0x17b)][_0x45b18c]??'';},SoundManager[_0x46f615(0x1e5)]=function(_0x146330){const _0x22ed19=_0x46f615;AudioManager[_0x22ed19(0x285)](VisuMZ['ClassChangeSystem'][_0x22ed19(0xd6)][_0x22ed19(0x2f0)]);},TextManager[_0x46f615(0x7e)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0xbe)][_0x46f615(0xaa)],TextManager['classPointsFull']=VisuMZ[_0x46f615(0x29f)]['Settings']['ClassPoints'][_0x46f615(0x74)],TextManager[_0x46f615(0x1b1)]=VisuMZ['ClassChangeSystem'][_0x46f615(0xd6)][_0x46f615(0xdb)]['AbbrText'],TextManager['classPointsFmt']=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0xdb)][_0x46f615(0x16c)],TextManager[_0x46f615(0x2b1)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)]['JobPoints'][_0x46f615(0x74)],TextManager[_0x46f615(0x8b)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0x205)][_0x46f615(0x1f3)],TextManager[_0x46f615(0x2d4)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0x205)]['TextFmt'],TextManager[_0x46f615(0x2ca)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)]['General'][_0x46f615(0xbf)],TextManager[_0x46f615(0x256)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0x27a)]['VocabNoClassAssigned'],TextManager[_0x46f615(0xfe)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0x27a)][_0x46f615(0x1d8)],TextManager[_0x46f615(0x133)]=VisuMZ['ClassChangeSystem']['Settings'][_0x46f615(0x27a)][_0x46f615(0x21c)],TextManager[_0x46f615(0xc4)]=VisuMZ['ClassChangeSystem'][_0x46f615(0xd6)]['Window'][_0x46f615(0x188)],ColorManager['getColor']=function(_0x570bb0){const _0x7d2ddc=_0x46f615;return _0x570bb0=String(_0x570bb0),_0x570bb0[_0x7d2ddc(0xfc)](/#(.*)/i)?_0x7d2ddc(0x100)['format'](String(RegExp['$1'])):this[_0x7d2ddc(0x200)](Number(_0x570bb0));},VisuMZ['ClassChangeSystem']['BattleManager_makeRewards']=BattleManager['makeRewards'],BattleManager[_0x46f615(0x268)]=function(){const _0x4814ba=_0x46f615;VisuMZ[_0x4814ba(0x29f)][_0x4814ba(0x30f)][_0x4814ba(0x115)](this),this['makeRewardsClassPoints'](),this['gainRewardsClassPoints'](),this['makeRewardsJobPoints'](),this[_0x4814ba(0x25d)]();},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x1d9)]=BattleManager[_0x46f615(0x208)],BattleManager[_0x46f615(0x208)]=function(){const _0x55a4c4=_0x46f615;VisuMZ[_0x55a4c4(0x29f)][_0x55a4c4(0x1d9)][_0x55a4c4(0x115)](this),this['displayRewardsClassPoints'](),this[_0x55a4c4(0x15e)]();},VisuMZ[_0x46f615(0x29f)]['BattleManager_gainExp']=BattleManager[_0x46f615(0x168)],BattleManager[_0x46f615(0x168)]=function(){const _0x12c573=_0x46f615;VisuMZ[_0x12c573(0x29f)]['BattleManager_gainExp'][_0x12c573(0x115)](this);const _0x1e2af9=this[_0x12c573(0x2ce)]['exp'];for(const _0x17006a of $gameParty[_0x12c573(0x6b)]()){_0x17006a[_0x12c573(0x72)](_0x1e2af9);}},VisuMZ['ClassChangeSystem'][_0x46f615(0x31b)]=BattleManager[_0x46f615(0x1cd)],BattleManager['endBattle']=function(_0x22904b){const _0x295d5c=_0x46f615;VisuMZ['ClassChangeSystem'][_0x295d5c(0x31b)][_0x295d5c(0x115)](this,_0x22904b);for(const _0x1026c3 of $gameParty[_0x295d5c(0x6b)]()){_0x1026c3[_0x295d5c(0xb2)]();}},BattleManager[_0x46f615(0xb8)]=function(){const _0x55062c=_0x46f615;this[_0x55062c(0x2ce)][_0x55062c(0xb3)]=$gameTroop[_0x55062c(0x209)]();},BattleManager[_0x46f615(0x88)]=function(){const _0x31a35c=_0x46f615;if(!this[_0x31a35c(0x11e)]())return;$gameMessage[_0x31a35c(0xbb)]();const _0x537342=$gameParty['members'](),_0x2a08dc=VisuMZ['ClassChangeSystem'][_0x31a35c(0xd6)][_0x31a35c(0xdb)],_0x547439=_0x2a08dc['VictoryText'];for(const _0x2317be of _0x537342){if(!_0x2317be)continue;const _0x141792=_0x547439[_0x31a35c(0x181)](_0x2317be[_0x31a35c(0x91)](),_0x2317be[_0x31a35c(0x1cf)](),TextManager[_0x31a35c(0x1b1)],TextManager[_0x31a35c(0xee)]);$gameMessage[_0x31a35c(0x1ff)]('\x5c.'+_0x141792);}},BattleManager[_0x46f615(0x24f)]=function(){const _0x3f236a=_0x46f615;this[_0x3f236a(0x2ce)][_0x3f236a(0xb3)]=this[_0x3f236a(0x2ce)][_0x3f236a(0xb3)]||0x0;let _0x5a4c85=$gameParty[_0x3f236a(0x6b)]();VisuMZ[_0x3f236a(0x29f)]['Settings'][_0x3f236a(0xdb)][_0x3f236a(0x66)]&&(_0x5a4c85=_0x5a4c85[_0x3f236a(0x1ce)](_0x24dd71=>_0x24dd71[_0x3f236a(0x6f)]()));for(const _0x3515f2 of _0x5a4c85){if(!_0x3515f2)continue;if(!$dataSystem['optExtraExp']&&!_0x3515f2[_0x3f236a(0x254)]())continue;_0x3515f2[_0x3f236a(0xed)](this[_0x3f236a(0x2ce)][_0x3f236a(0xb3)]),_0x3515f2[_0x3f236a(0x177)](this[_0x3f236a(0x2ce)][_0x3f236a(0xb3)]);}},BattleManager[_0x46f615(0x11e)]=function(){const _0x38ecb6=_0x46f615;return VisuMZ[_0x38ecb6(0x29f)][_0x38ecb6(0xd6)]['ClassPoints']['ShowVictory'];},BattleManager[_0x46f615(0x1d4)]=function(){const _0x30840=_0x46f615;this[_0x30840(0x2ce)][_0x30840(0xb9)]=$gameTroop['jobPointsTotal']();},BattleManager['displayRewardsJobPoints']=function(){const _0x27b0dc=_0x46f615;if(!this[_0x27b0dc(0x23a)]())return;$gameMessage[_0x27b0dc(0xbb)]();const _0x639d13=$gameParty[_0x27b0dc(0x2b6)](),_0x28c126=VisuMZ[_0x27b0dc(0x29f)][_0x27b0dc(0xd6)]['JobPoints'],_0x599df8=_0x28c126[_0x27b0dc(0xf6)];for(const _0x14257e of _0x639d13){if(!_0x14257e)continue;const _0xe71b54=_0x599df8[_0x27b0dc(0x181)](_0x14257e[_0x27b0dc(0x91)](),_0x14257e[_0x27b0dc(0x2da)](),TextManager[_0x27b0dc(0x8b)],TextManager[_0x27b0dc(0x2d4)]);$gameMessage['add']('\x5c.'+_0xe71b54);}},BattleManager[_0x46f615(0x25d)]=function(){const _0x3b73ba=_0x46f615;this['_rewards']['jobPoints']=this[_0x3b73ba(0x2ce)][_0x3b73ba(0xb9)]||0x0;let _0x369d2d=$gameParty[_0x3b73ba(0x6b)]();VisuMZ[_0x3b73ba(0x29f)][_0x3b73ba(0xd6)]['JobPoints']['AliveActors']&&(_0x369d2d=_0x369d2d['filter'](_0x225283=>_0x225283[_0x3b73ba(0x6f)]()));for(const _0x2d4bb1 of _0x369d2d){if(!_0x2d4bb1)continue;if(!$dataSystem[_0x3b73ba(0xac)]&&!_0x2d4bb1[_0x3b73ba(0x254)]())continue;_0x2d4bb1[_0x3b73ba(0xa1)](this['_rewards'][_0x3b73ba(0xb9)]),_0x2d4bb1['gainJobPointsForMulticlasses'](this[_0x3b73ba(0x2ce)][_0x3b73ba(0xb9)]);}},BattleManager[_0x46f615(0x23a)]=function(){const _0xe1bfc4=_0x46f615;return VisuMZ[_0xe1bfc4(0x29f)]['Settings'][_0xe1bfc4(0x205)][_0xe1bfc4(0x78)];},VisuMZ[_0x46f615(0x29f)]['Game_System_initialize']=Game_System[_0x46f615(0x13c)][_0x46f615(0x2d1)],Game_System[_0x46f615(0x13c)][_0x46f615(0x2d1)]=function(){const _0x44d62b=_0x46f615;VisuMZ['ClassChangeSystem']['Game_System_initialize'][_0x44d62b(0x115)](this),this[_0x44d62b(0x191)]();},Game_System[_0x46f615(0x13c)]['initClassChangeSystemMainMenu']=function(){const _0xdff4=_0x46f615;this[_0xdff4(0x300)]={'shown':VisuMZ[_0xdff4(0x29f)][_0xdff4(0xd6)][_0xdff4(0xbe)][_0xdff4(0x1be)],'enabled':VisuMZ[_0xdff4(0x29f)][_0xdff4(0xd6)][_0xdff4(0xbe)]['EnableMainMenu']};},Game_System[_0x46f615(0x13c)]['isMainMenuClassChangeSystemVisible']=function(){const _0x23e3b3=_0x46f615;if(this[_0x23e3b3(0x300)]===undefined)this[_0x23e3b3(0x191)]();return this[_0x23e3b3(0x300)][_0x23e3b3(0x68)];},Game_System[_0x46f615(0x13c)][_0x46f615(0xdf)]=function(_0x1b7a95){const _0xa30b20=_0x46f615;if(this[_0xa30b20(0x300)]===undefined)this[_0xa30b20(0x191)]();this[_0xa30b20(0x300)][_0xa30b20(0x68)]=_0x1b7a95;},Game_System[_0x46f615(0x13c)][_0x46f615(0x197)]=function(){const _0x2da506=_0x46f615;if(this[_0x2da506(0x300)]===undefined)this[_0x2da506(0x191)]();return this[_0x2da506(0x300)][_0x2da506(0x230)];},Game_System[_0x46f615(0x13c)][_0x46f615(0x76)]=function(_0x13218a){const _0x1e3635=_0x46f615;if(this[_0x1e3635(0x300)]===undefined)this[_0x1e3635(0x191)]();this[_0x1e3635(0x300)][_0x1e3635(0x230)]=_0x13218a;},VisuMZ[_0x46f615(0x29f)]['Game_Action_applyItemUserEffect']=Game_Action[_0x46f615(0x13c)][_0x46f615(0x301)],Game_Action['prototype'][_0x46f615(0x301)]=function(_0x1aee1d){const _0x367228=_0x46f615;VisuMZ[_0x367228(0x29f)][_0x367228(0x31d)][_0x367228(0x115)](this,_0x1aee1d),this[_0x367228(0x9a)](_0x1aee1d);},Game_Action[_0x46f615(0x13c)][_0x46f615(0x9a)]=function(_0x2ff65c){const _0x31eea4=_0x46f615;if(this['item']())this[_0x31eea4(0x122)](_0x2ff65c);},Game_Action[_0x46f615(0x13c)]['applyItemClassChangeSystemUserEffect']=function(_0x524cf5){const _0x57c8c4=_0x46f615,_0x202adf=VisuMZ['ClassChangeSystem'][_0x57c8c4(0xd2)],_0x33b9bd=this[_0x57c8c4(0x289)]()[_0x57c8c4(0x10c)];if($gameParty[_0x57c8c4(0x175)]()){if(this['subject']()['isActor']()&&_0x33b9bd['match'](_0x202adf[_0x57c8c4(0x30d)])){const _0x1a4853=eval(RegExp['$1']);this[_0x57c8c4(0x1d5)]()[_0x57c8c4(0xed)](_0x1a4853);}else this['applyClassPoints']();if(_0x524cf5[_0x57c8c4(0x125)]()&&_0x33b9bd[_0x57c8c4(0xfc)](_0x202adf[_0x57c8c4(0x1b2)])){const _0x48f8cc=eval(RegExp['$1']);_0x524cf5['gainClassPoints'](_0x48f8cc);}}if($gameParty['inBattle']()){if(this[_0x57c8c4(0x1d5)]()[_0x57c8c4(0x125)]()&&_0x33b9bd[_0x57c8c4(0xfc)](_0x202adf[_0x57c8c4(0xe7)])){const _0x358eae=eval(RegExp['$1']);this['subject']()[_0x57c8c4(0xa1)](_0x358eae);}else this['applyJobPoints']();if(_0x524cf5['isActor']()&&_0x33b9bd[_0x57c8c4(0xfc)](_0x202adf[_0x57c8c4(0x82)])){const _0x29914c=eval(RegExp['$1']);_0x524cf5[_0x57c8c4(0xa1)](_0x29914c);}}if(_0x33b9bd[_0x57c8c4(0xfc)](/<NOTETAG>/i)){}},Game_Action['prototype'][_0x46f615(0x31f)]=function(){const _0x1f11ca=_0x46f615;if(!$gameParty[_0x1f11ca(0x175)]())return;if(!this[_0x1f11ca(0x1d5)]()['isActor']())return;const _0x3f4fff=VisuMZ['ClassChangeSystem'][_0x1f11ca(0xd6)][_0x1f11ca(0xdb)];let _0x3293e9=0x0;try{_0x3293e9=eval(_0x3f4fff[_0x1f11ca(0x21d)]);}catch(_0x1e366c){if($gameTemp[_0x1f11ca(0xf4)]())console['log'](_0x1e366c);}this[_0x1f11ca(0x1d5)]()['gainClassPoints'](_0x3293e9);},Game_Action['prototype'][_0x46f615(0x31c)]=function(){const _0x5976d1=_0x46f615;if(!$gameParty[_0x5976d1(0x175)]())return;if(!this[_0x5976d1(0x1d5)]()[_0x5976d1(0x125)]())return;const _0x4a028b=VisuMZ[_0x5976d1(0x29f)][_0x5976d1(0xd6)][_0x5976d1(0x205)];let _0x397b5e=0x0;try{_0x397b5e=eval(_0x4a028b[_0x5976d1(0x21d)]);}catch(_0x32e74b){if($gameTemp[_0x5976d1(0xf4)]())console['log'](_0x32e74b);}this[_0x5976d1(0x1d5)]()[_0x5976d1(0xa1)](_0x397b5e);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x10f)]=Game_Battler[_0x46f615(0x13c)][_0x46f615(0x1c2)],Game_Battler['prototype'][_0x46f615(0x1c2)]=function(_0x599e3e){const _0x82a5f3=_0x46f615;this[_0x82a5f3(0x32e)]&&this[_0x82a5f3(0x125)]()&&$gameParty[_0x82a5f3(0x175)]()?this['_tp']=(this['_tp']+_0x599e3e)[_0x82a5f3(0x2f5)](0x0,this[_0x82a5f3(0x83)]()):VisuMZ[_0x82a5f3(0x29f)][_0x82a5f3(0x10f)][_0x82a5f3(0x115)](this,_0x599e3e);},VisuMZ[_0x46f615(0x29f)]['Game_Actor_equips']=Game_Actor[_0x46f615(0x13c)]['equips'],Game_Actor['prototype'][_0x46f615(0x152)]=function(){const _0x4496ed=_0x46f615;return VisuMZ[_0x4496ed(0x29f)][_0x4496ed(0xf3)](this)?VisuMZ[_0x4496ed(0x2cb)][_0x4496ed(0x7c)][_0x4496ed(0x115)](this):VisuMZ['ClassChangeSystem'][_0x4496ed(0x7c)][_0x4496ed(0x115)](this);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0xf3)]=function(_0x6b7a87){const _0xd28ae8=_0x46f615;return Imported['VisuMZ_1_BattleCore']&&_0x6b7a87['isActor']()&&_0x6b7a87[_0xd28ae8(0xb7)]!==undefined&&_0x6b7a87===BattleManager['_subject']&&$gameParty[_0xd28ae8(0x175)]();},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x24d)]=Game_Battler['prototype'][_0x46f615(0x2f1)],Game_Battler[_0x46f615(0x13c)][_0x46f615(0x2f1)]=function(_0x4f3476){const _0x36055a=_0x46f615;VisuMZ['ClassChangeSystem'][_0x36055a(0x24d)][_0x36055a(0x115)](this,_0x4f3476),this[_0x36055a(0x125)]()&&(this['_earnedClassPoints']=this[_0x36055a(0x7b)](),this['_earnedJobPoints']=this[_0x36055a(0x1ac)]());},Game_Actor[_0x46f615(0x67)]=VisuMZ['ClassChangeSystem']['Settings'][_0x46f615(0x1a4)][_0x46f615(0x222)],VisuMZ['ClassChangeSystem'][_0x46f615(0x273)]=Game_Actor['prototype'][_0x46f615(0x1fb)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1fb)]=function(_0x3ebfd9){const _0x33ca1d=_0x46f615;VisuMZ['ClassChangeSystem']['Game_Actor_setup']['call'](this,_0x3ebfd9),this['initClassPoints'](),this[_0x33ca1d(0x20f)](),this[_0x33ca1d(0x2ac)](),this[_0x33ca1d(0x11a)](),this['setupClassChangeSystem']();},Game_Actor['prototype'][_0x46f615(0x2ff)]=function(){const _0x231117=_0x46f615;this[_0x231117(0x294)](),this[_0x231117(0x10a)](),this['initClassLevels'](),this['initClassChangeRestrictions'](),this['updateClassLearnedSkills'](),this[_0x231117(0x109)](),this['clearParamPlus'](),this[_0x231117(0xcf)]();},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x30a)]=Game_Actor[_0x46f615(0x13c)]['changeClass'],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2be)]=function(_0x58a714,_0x12af59){const _0x599058=_0x46f615;_0x12af59=this[_0x599058(0x313)]();_0x12af59&&(this[_0x599058(0x333)]=this['_exp']||{},this[_0x599058(0x333)][_0x58a714]=this[_0x599058(0x333)][this['_classId']]||0x0,_0x12af59=![]);this[_0x599058(0x116)]=!![];const _0x931bb6=JsonEx[_0x599058(0xc5)](this);_0x931bb6[_0x599058(0x13b)]=!![],VisuMZ[_0x599058(0x29f)][_0x599058(0x30a)][_0x599058(0x115)](this,_0x58a714,_0x12af59),this['classAdjustHpMp'](_0x931bb6),this[_0x599058(0xa8)](),this[_0x599058(0x187)](_0x58a714),this[_0x599058(0x116)]=undefined;if($gamePlayer)$gamePlayer[_0x599058(0x109)]();},VisuMZ['ClassChangeSystem'][_0x46f615(0x111)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0xd1)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0xd1)]=function(_0x3a91db,_0x297b8e){const _0x473255=_0x46f615;if(this[_0x473255(0x13b)])return![];return VisuMZ[_0x473255(0x29f)][_0x473255(0x111)][_0x473255(0x115)](this,_0x3a91db,_0x297b8e);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x201)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2f2)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2f2)]=function(_0x375dec){const _0x299252=_0x46f615;if($gameParty[_0x299252(0x175)]())return;VisuMZ[_0x299252(0x29f)]['Game_Actor_releaseUnequippableItems']['call'](this,_0x375dec);},VisuMZ[_0x46f615(0x29f)]['Game_Actor_levelUp']=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1b8)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1b8)]=function(){const _0x29cafe=_0x46f615;VisuMZ[_0x29cafe(0x29f)][_0x29cafe(0x146)][_0x29cafe(0x115)](this);const _0x8dfec8=this[_0x29cafe(0x2e4)]()['id'];this[_0x29cafe(0xa9)](_0x8dfec8),this[_0x29cafe(0x135)](_0x8dfec8),this[_0x29cafe(0x1e0)]=this['_classLevel']||{},this['_classLevel'][_0x8dfec8]=this[_0x29cafe(0x10e)],this[_0x29cafe(0x313)]()&&this[_0x29cafe(0x304)]();},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa0)]=function(_0x4d4e87){const _0xa5f8b4=_0x46f615;if(!Game_Actor[_0xa5f8b4(0x67)])return;const _0x2ae1fb=Math[_0xa5f8b4(0x25a)](_0x4d4e87['hpRate']()*this[_0xa5f8b4(0x1af)]),_0x5c9060=Math[_0xa5f8b4(0x25a)](_0x4d4e87[_0xa5f8b4(0x1f9)]()*this['mmp']);if(this['hp']>0x0)this['setHp'](_0x2ae1fb);if(this['mp']>0x0)this[_0xa5f8b4(0x145)](_0x5c9060);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x14c)]=function(){this['_classPoints']={};},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x20f)]=function(){const _0x485612=_0x46f615,_0x5a76ad=VisuMZ[_0x485612(0x29f)][_0x485612(0xd2)],_0x40da26=this['actor']()['note'];if(_0x40da26[_0x485612(0xfc)](_0x5a76ad[_0x485612(0x2de)])){const _0x312e2f=eval(RegExp['$1']);this[_0x485612(0xed)](_0x312e2f);}const _0x57bcb4=VisuMZ[_0x485612(0x29f)][_0x485612(0xd6)]['ClassPoints'];if(!_0x57bcb4[_0x485612(0x322)])return;const _0x126067=_0x40da26['match'](_0x5a76ad['StartClassClassPoints']);if(_0x126067)for(const _0x2bcc49 of _0x126067){if(!_0x2bcc49)continue;_0x2bcc49[_0x485612(0xfc)](_0x5a76ad[_0x485612(0x2a5)]);const _0x4ee3a6=String(RegExp['$1']),_0x32b4e4=eval(RegExp['$2']),_0x237c85=/^\d+$/[_0x485612(0xc2)](_0x4ee3a6);let _0x4d7654=0x0;_0x237c85?_0x4d7654=Number(_0x4ee3a6):_0x4d7654=DataManager[_0x485612(0x2e9)](_0x4ee3a6),this[_0x485612(0xed)](_0x32b4e4,_0x4d7654);}},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x7b)]=function(_0x39d180){const _0x177f80=_0x46f615;this[_0x177f80(0x1b5)]===undefined&&this[_0x177f80(0x14c)]();const _0x23ffcb=VisuMZ[_0x177f80(0x29f)][_0x177f80(0xd6)][_0x177f80(0xdb)];return _0x23ffcb[_0x177f80(0x322)]?_0x39d180=0x0:_0x39d180=_0x39d180||this[_0x177f80(0x2e4)]()['id'],this[_0x177f80(0x1b5)][_0x39d180]=this[_0x177f80(0x1b5)][_0x39d180]||0x0,Math[_0x177f80(0x25a)](this[_0x177f80(0x1b5)][_0x39d180]);},Game_Actor[_0x46f615(0x13c)]['setClassPoints']=function(_0x10a5a8,_0x33d4af){const _0x3ec83d=_0x46f615;this[_0x3ec83d(0x1b5)]===undefined&&this['initClassPoints']();const _0x4092b3=VisuMZ['ClassChangeSystem'][_0x3ec83d(0xd6)]['ClassPoints'];_0x4092b3[_0x3ec83d(0x322)]?_0x33d4af=0x0:_0x33d4af=_0x33d4af||this[_0x3ec83d(0x2e4)]()['id'];this[_0x3ec83d(0x1b5)][_0x33d4af]=this[_0x3ec83d(0x1b5)][_0x33d4af]||0x0,this['_classPoints'][_0x33d4af]=Math[_0x3ec83d(0x25a)](_0x10a5a8||0x0);const _0xc23a82=_0x4092b3[_0x3ec83d(0x1fa)]||Number[_0x3ec83d(0x172)];this[_0x3ec83d(0x1b5)][_0x33d4af]=this[_0x3ec83d(0x1b5)][_0x33d4af][_0x3ec83d(0x2f5)](0x0,_0xc23a82);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xed)]=function(_0x1b203b,_0x13dade){const _0x4828aa=_0x46f615;_0x1b203b>0x0&&(_0x1b203b*=this['classPointsRate']()),this[_0x4828aa(0x11d)](_0x1b203b,_0x13dade);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x177)]=function(_0x3697fe){const _0x4f5a4a=_0x46f615;if(!Imported[_0x4f5a4a(0x19a)])return;_0x3697fe>0x0&&(_0x3697fe*=this[_0x4f5a4a(0x2ec)]()),this['gainMulticlassRewardPoints'](_0x3697fe,_0x4f5a4a(0x65));},Game_Actor[_0x46f615(0x13c)]['addClassPoints']=function(_0x3bae5b,_0x148b1e){const _0x4f8a6b=_0x46f615,_0x4f2683=VisuMZ[_0x4f8a6b(0x29f)][_0x4f8a6b(0xd6)][_0x4f8a6b(0xdb)];_0x4f2683[_0x4f8a6b(0x322)]?_0x148b1e=0x0:_0x148b1e=_0x148b1e||this[_0x4f8a6b(0x2e4)]()['id'],_0x3bae5b+=this['getClassPoints'](_0x148b1e),this[_0x4f8a6b(0x20e)](_0x3bae5b,_0x148b1e);},Game_Actor[_0x46f615(0x13c)]['loseClassPoints']=function(_0x10a7c4,_0xe0c8ad){const _0x537623=_0x46f615;this[_0x537623(0x11d)](-_0x10a7c4,_0xe0c8ad);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2ec)]=function(){const _0x5ac600=_0x46f615,_0x5519e0=VisuMZ[_0x5ac600(0x29f)]['RegExp'],_0x47ac98=this[_0x5ac600(0x14d)]()[_0x5ac600(0x7d)](null)[_0x5ac600(0x7d)](undefined);let _0x15fc5c=0x1;return _0x15fc5c=_0x47ac98[_0x5ac600(0x267)]((_0x259f5e,_0x2302c5)=>{const _0x128955=_0x5ac600;return _0x2302c5&&_0x2302c5[_0x128955(0x10c)][_0x128955(0xfc)](_0x5519e0[_0x128955(0x261)])?_0x259f5e+Number(RegExp['$1'])*0.01:_0x259f5e;},_0x15fc5c),_0x15fc5c=_0x47ac98[_0x5ac600(0x267)]((_0x13dc01,_0x41c061)=>{const _0x46f990=_0x5ac600;return _0x41c061&&_0x41c061[_0x46f990(0x10c)][_0x46f990(0xfc)](_0x5519e0[_0x46f990(0x26a)])?_0x13dc01*(Number(RegExp['$1'])*0.01):_0x13dc01;},_0x15fc5c),_0x15fc5c=_0x47ac98[_0x5ac600(0x267)]((_0x56ac2c,_0x43b179)=>{const _0x135571=_0x5ac600;return _0x43b179&&_0x43b179[_0x135571(0x10c)]['match'](_0x5519e0[_0x135571(0x255)])?_0x56ac2c+Number(RegExp['$1'])*0.01:_0x56ac2c;},_0x15fc5c),_0x15fc5c;},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa9)]=function(_0x191fd3){const _0x14ceb7=_0x46f615;if(this[_0x14ceb7(0x116)])return;const _0x4ae8e7=VisuMZ[_0x14ceb7(0x29f)][_0x14ceb7(0xd6)][_0x14ceb7(0xdb)];let _0x360911=0x0;try{_0x360911=eval(_0x4ae8e7[_0x14ceb7(0x20d)]);}catch(_0x5a383f){if($gameTemp[_0x14ceb7(0xf4)]())console[_0x14ceb7(0x189)](_0x5a383f);}this[_0x14ceb7(0xed)](_0x360911,_0x191fd3);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1cf)]=function(){const _0x22277b=_0x46f615;return this[_0x22277b(0x9e)]=this['_earnedClassPoints']||0x0,this[_0x22277b(0x7b)]()-this[_0x22277b(0x9e)];},Game_Actor['prototype'][_0x46f615(0x2ac)]=function(){const _0x343848=_0x46f615;this[_0x343848(0x92)]={};},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x11a)]=function(){const _0x413664=_0x46f615,_0x5df08b=VisuMZ[_0x413664(0x29f)]['RegExp'],_0x19a390=this[_0x413664(0x1f5)]()[_0x413664(0x10c)];if(_0x19a390[_0x413664(0xfc)](_0x5df08b[_0x413664(0x1e9)])){const _0x4282e3=eval(RegExp['$1']);this[_0x413664(0xa1)](_0x4282e3);}const _0x46797d=VisuMZ[_0x413664(0x29f)][_0x413664(0xd6)][_0x413664(0x205)];if(!_0x46797d[_0x413664(0x322)])return;const _0x35853e=_0x19a390[_0x413664(0xfc)](_0x5df08b['StartClassJobPoints']);if(_0x35853e)for(const _0xb66f5a of _0x35853e){if(!_0xb66f5a)continue;_0xb66f5a[_0x413664(0xfc)](_0x5df08b[_0x413664(0x2ea)]);const _0x2c8dcc=String(RegExp['$1']),_0x817334=eval(RegExp['$2']),_0x5bead5=/^\d+$/['test'](_0x2c8dcc);let _0x3b7d57=0x0;_0x5bead5?_0x3b7d57=Number(_0x2c8dcc):_0x3b7d57=DataManager[_0x413664(0x2e9)](_0x2c8dcc),this[_0x413664(0xa1)](_0x817334,_0x3b7d57);}},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1ac)]=function(_0xd3241a){const _0x2cde19=_0x46f615;this[_0x2cde19(0x92)]===undefined&&this[_0x2cde19(0x2ac)]();const _0x8714f3=VisuMZ[_0x2cde19(0x29f)][_0x2cde19(0xd6)][_0x2cde19(0x205)];return _0x8714f3[_0x2cde19(0x322)]?_0xd3241a=0x0:_0xd3241a=_0xd3241a||this['currentClass']()['id'],this[_0x2cde19(0x92)][_0xd3241a]=this[_0x2cde19(0x92)][_0xd3241a]||0x0,Math['round'](this[_0x2cde19(0x92)][_0xd3241a]);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2a7)]=function(_0x4baeb5,_0x54fc0b){const _0x161924=_0x46f615;this[_0x161924(0x92)]===undefined&&this['initJobPoints']();const _0x1ec35d=VisuMZ[_0x161924(0x29f)][_0x161924(0xd6)]['JobPoints'];_0x1ec35d[_0x161924(0x322)]?_0x54fc0b=0x0:_0x54fc0b=_0x54fc0b||this[_0x161924(0x2e4)]()['id'];this['_jobPoints'][_0x54fc0b]=this[_0x161924(0x92)][_0x54fc0b]||0x0,this[_0x161924(0x92)][_0x54fc0b]=Math[_0x161924(0x25a)](_0x4baeb5||0x0);const _0x3b029f=_0x1ec35d['MaxResource']||Number[_0x161924(0x172)];this[_0x161924(0x92)][_0x54fc0b]=this['_jobPoints'][_0x54fc0b][_0x161924(0x2f5)](0x0,_0x3b029f);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa1)]=function(_0x244030,_0x2902ae){_0x244030>0x0&&(_0x244030*=this['jobPointsRate']()),this['addJobPoints'](_0x244030,_0x2902ae);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1c0)]=function(_0x36ed5c){const _0x570097=_0x46f615;if(!Imported[_0x570097(0x19a)])return;_0x36ed5c>0x0&&(_0x36ed5c*=this[_0x570097(0xc3)]()),this[_0x570097(0x2e3)](_0x36ed5c,_0x570097(0x1fc));},Game_Actor['prototype'][_0x46f615(0xc0)]=function(_0x27c8c2,_0x536fcc){const _0x1ab7ed=_0x46f615,_0x25aad9=VisuMZ[_0x1ab7ed(0x29f)]['Settings'][_0x1ab7ed(0x205)];_0x25aad9[_0x1ab7ed(0x322)]?_0x536fcc=0x0:_0x536fcc=_0x536fcc||this[_0x1ab7ed(0x2e4)]()['id'],_0x27c8c2+=this[_0x1ab7ed(0x1ac)](_0x536fcc),this[_0x1ab7ed(0x2a7)](_0x27c8c2,_0x536fcc);},Game_Actor['prototype'][_0x46f615(0x2ef)]=function(_0x23d127,_0x3aeea0){const _0x4da720=_0x46f615;this[_0x4da720(0xc0)](-_0x23d127,_0x3aeea0);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xc3)]=function(){const _0x1e945d=_0x46f615,_0x126bfc=VisuMZ[_0x1e945d(0x29f)][_0x1e945d(0xd2)],_0x489049=this[_0x1e945d(0x14d)]()['remove'](null)['remove'](undefined);let _0x4ec126=0x1;return _0x4ec126=_0x489049[_0x1e945d(0x267)]((_0x638a3f,_0x1b0597)=>{const _0x12599d=_0x1e945d;return _0x1b0597&&_0x1b0597[_0x12599d(0x10c)]['match'](_0x126bfc[_0x12599d(0x18a)])?_0x638a3f+Number(RegExp['$1'])*0.01:_0x638a3f;},_0x4ec126),_0x4ec126=_0x489049['reduce']((_0x3d16b3,_0x101b4d)=>{const _0x4e422b=_0x1e945d;return _0x101b4d&&_0x101b4d[_0x4e422b(0x10c)][_0x4e422b(0xfc)](_0x126bfc[_0x4e422b(0xab)])?_0x3d16b3*(Number(RegExp['$1'])*0.01):_0x3d16b3;},_0x4ec126),_0x4ec126=_0x489049[_0x1e945d(0x267)]((_0x537a42,_0x150efe)=>{const _0x5c0285=_0x1e945d;return _0x150efe&&_0x150efe['note']['match'](_0x126bfc[_0x5c0285(0x321)])?_0x537a42+Number(RegExp['$1'])*0.01:_0x537a42;},_0x4ec126),_0x4ec126;},Game_Actor['prototype'][_0x46f615(0x135)]=function(_0x551434){const _0x16113d=_0x46f615;if(this[_0x16113d(0x116)])return;const _0x2abcff=VisuMZ[_0x16113d(0x29f)]['Settings'][_0x16113d(0x205)];let _0x3a62c3=0x0;try{_0x3a62c3=eval(_0x2abcff[_0x16113d(0x20d)]);}catch(_0x3b7e4e){if($gameTemp[_0x16113d(0xf4)]())console[_0x16113d(0x189)](_0x3b7e4e);}this[_0x16113d(0xa1)](_0x3a62c3,_0x551434);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2da)]=function(){const _0x3ecf06=_0x46f615;return this[_0x3ecf06(0x193)]=this['_earnedJobPoints']||0x0,this['getJobPoints']()-this['_earnedJobPoints'];},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x2c6)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa7)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa7)]=function(_0x4e7e87,_0x3b782d){const _0x312689=_0x46f615;_0x4e7e87!==''?(this[_0x312689(0xe6)]=_0x4e7e87,this[_0x312689(0x332)]=_0x3b782d):(this['_priorityFaceName']=undefined,this[_0x312689(0x332)]=undefined);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x1c1)]=Game_Actor['prototype'][_0x46f615(0xa3)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa3)]=function(){const _0x2df0b4=_0x46f615;if(this[_0x2df0b4(0xe6)]!==undefined)return this[_0x2df0b4(0xe6)];return ImageManager[_0x2df0b4(0x220)](this)||VisuMZ[_0x2df0b4(0x29f)][_0x2df0b4(0x1c1)][_0x2df0b4(0x115)](this);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x24e)]=Game_Actor[_0x46f615(0x13c)]['faceIndex'],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x17f)]=function(){const _0x33dc3a=_0x46f615;if(this[_0x33dc3a(0x332)]!==undefined)return this[_0x33dc3a(0x332)];const _0x1109ba=ImageManager['getActorClassFaceIndex'](this);if(_0x1109ba!==undefined)return _0x1109ba;return VisuMZ[_0x33dc3a(0x29f)][_0x33dc3a(0x24e)][_0x33dc3a(0x115)](this);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x131)]=Game_Actor['prototype'][_0x46f615(0x17d)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x17d)]=function(_0x50c11b,_0x43feae){const _0x507ac0=_0x46f615;_0x50c11b!==''?(this[_0x507ac0(0x18d)]=_0x50c11b,this[_0x507ac0(0x306)]=_0x43feae):(this[_0x507ac0(0x18d)]=undefined,this[_0x507ac0(0x306)]=undefined);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x235)]=Game_Actor['prototype']['characterName'],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1ed)]=function(){const _0x1445f6=_0x46f615;if(this['_priorityCharacterName']!==undefined)return this[_0x1445f6(0x18d)];return ImageManager[_0x1445f6(0x171)](this)||VisuMZ[_0x1445f6(0x29f)][_0x1445f6(0x235)][_0x1445f6(0x115)](this);},VisuMZ['ClassChangeSystem'][_0x46f615(0x331)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x238)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x238)]=function(){const _0x354b0e=_0x46f615;if(this[_0x354b0e(0x306)]!==undefined)return this['_priorityCharacterIndex'];const _0x539d9b=ImageManager[_0x354b0e(0x1d6)](this);if(_0x539d9b!==undefined)return _0x539d9b;return VisuMZ[_0x354b0e(0x29f)][_0x354b0e(0x331)]['call'](this);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x186)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x119)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x119)]=function(_0x431131){const _0x4215ea=_0x46f615;_0x431131!==''?this[_0x4215ea(0xcc)]=_0x431131:this['_priorityBattlerName']=undefined;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x223)]=Game_Actor[_0x46f615(0x13c)]['battlerName'],Game_Actor[_0x46f615(0x13c)]['battlerName']=function(){const _0x3337cb=_0x46f615;if(this[_0x3337cb(0xcc)]!==undefined)return this['_priorityBattlerName'];return ImageManager[_0x3337cb(0x6e)](this)||VisuMZ[_0x3337cb(0x29f)][_0x3337cb(0x223)][_0x3337cb(0x115)](this);;},VisuMZ['ClassChangeSystem'][_0x46f615(0x169)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x14e)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x14e)]=function(_0x5527dc){_0x5527dc!==''?this['_priorityMenuImage']=_0x5527dc:this['_priorityMenuImage']=undefined;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x6a)]=Game_Actor[_0x46f615(0x13c)]['getMenuImage'],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2ee)]=function(){const _0x14a8a4=_0x46f615;if(this[_0x14a8a4(0xf1)]!==undefined)return this[_0x14a8a4(0xf1)];if(!Imported[_0x14a8a4(0x110)])return'';return ImageManager[_0x14a8a4(0x129)](this)||VisuMZ[_0x14a8a4(0x29f)][_0x14a8a4(0x6a)]['call'](this);;},VisuMZ['ClassChangeSystem'][_0x46f615(0x295)]=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x315)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x315)]=function(_0xd03336){const _0x1bcc85=_0x46f615;_0xd03336!==''?this['_priorityBattlePortrait']=_0xd03336:this['_priorityBattlePortrait']=undefined;if(SceneManager['isSceneBattle']()&&$gameParty['battleMembers']()['includes'](this)){const _0x52c563=SceneManager[_0x1bcc85(0x1e8)][_0x1bcc85(0x2a2)];if(_0x52c563)_0x52c563[_0x1bcc85(0x1bf)](this);}},VisuMZ[_0x46f615(0x29f)]['Game_Actor_getBattlePortraitFilename']=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x151)],Game_Actor['prototype'][_0x46f615(0x151)]=function(){const _0xff1fe2=_0x46f615;if(this['_priorityBattlePortrait']!==undefined)return this['_priorityBattlePortrait'];return ImageManager[_0xff1fe2(0xdd)](this)||VisuMZ[_0xff1fe2(0x29f)][_0xff1fe2(0x329)][_0xff1fe2(0x115)](this);;},Game_Actor['prototype']['initClassChangeUnlocks']=function(){const _0x939662=_0x46f615;this['_unlockedClasses']=[this[_0x939662(0x2e4)]()['id']];const _0x186886=VisuMZ[_0x939662(0x29f)][_0x939662(0xd2)],_0x2eee9a=this[_0x939662(0x1f5)]()[_0x939662(0x10c)],_0x124fef=_0x2eee9a[_0x939662(0xfc)](_0x186886[_0x939662(0x2e6)]);if(_0x124fef)for(const _0x31f982 of _0x124fef){if(!_0x31f982)continue;_0x31f982[_0x939662(0xfc)](_0x186886[_0x939662(0x2e6)]);const _0x574666=String(RegExp['$1'])[_0x939662(0x178)](',');for(let _0x2946f4 of _0x574666){_0x2946f4=(String(_0x2946f4)||'')[_0x939662(0x27b)]();const _0x550f37=/^\d+$/[_0x939662(0xc2)](_0x2946f4);_0x550f37?this[_0x939662(0x214)][_0x939662(0x215)](Number(_0x2946f4)):this[_0x939662(0x214)]['push'](DataManager['getClassIdWithName'](_0x2946f4));}}},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2e1)]=function(){const _0xcf13bf=_0x46f615;if(this[_0xcf13bf(0x214)]===undefined)this[_0xcf13bf(0x294)]();return this[_0xcf13bf(0x214)];},Game_Actor[_0x46f615(0x13c)]['unlockClass']=function(_0x43510c){const _0x2c1030=_0x46f615;if(this[_0x2c1030(0x214)]===undefined)this[_0x2c1030(0x294)]();if(this[_0x2c1030(0x214)][_0x2c1030(0x158)](_0x43510c))return;this[_0x2c1030(0x214)][_0x2c1030(0x215)](_0x43510c),this[_0x2c1030(0x214)]['remove'](0x0),this[_0x2c1030(0x214)][_0x2c1030(0x140)](function(_0x51cc51,_0xd69180){return _0x51cc51-_0xd69180;});},Game_Actor[_0x46f615(0x13c)]['removeUnlockedClass']=function(_0x1ae379){const _0x5ce583=_0x46f615;if(this[_0x5ce583(0x214)]===undefined)this['initClassChangeUnlocks']();if(!this[_0x5ce583(0x214)][_0x5ce583(0x158)](_0x1ae379))return;this[_0x5ce583(0x214)]['remove'](_0x1ae379)[_0x5ce583(0x7d)](null),this['_unlockedClasses'][_0x5ce583(0x140)](function(_0x27799f,_0x3f618e){return _0x27799f-_0x3f618e;});},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x187)]=function(_0x46391a){const _0x368338=_0x46f615;this[_0x368338(0x137)](_0x46391a);},Game_Actor['prototype'][_0x46f615(0x10a)]=function(){const _0x37714b=_0x46f615;this['_multiclassTiers']=VisuMZ[_0x37714b(0x29f)][_0x37714b(0xd6)][_0x37714b(0x1a4)][_0x37714b(0x1a8)],this['_multiclasses']=[this['_classId']];const _0x547cd8=this['actor']()[_0x37714b(0x10c)],_0x416340=VisuMZ[_0x37714b(0x29f)][_0x37714b(0xd2)];_0x547cd8[_0x37714b(0xfc)](_0x416340[_0x37714b(0x1a8)])&&(this[_0x37714b(0x12a)]=Number(RegExp['$1']));const _0x5c29e0=_0x547cd8[_0x37714b(0xfc)](_0x416340['StartingClassTier']);if(_0x5c29e0)for(const _0x21665a of _0x5c29e0){if(!_0x21665a)continue;_0x21665a[_0x37714b(0xfc)](_0x416340[_0x37714b(0x2dd)]);const _0x227dc0=Number(RegExp['$1'])-0x1;if(_0x227dc0+0x1>this[_0x37714b(0x12a)])continue;let _0x1a5748=(String(RegExp['$2'])||'')['trim']();const _0x218898=/^\d+$/[_0x37714b(0xc2)](_0x1a5748);_0x218898?this[_0x37714b(0x8f)][_0x227dc0]=Number(_0x1a5748):this['_multiclasses'][_0x227dc0]=DataManager['getClassIdWithName'](_0x1a5748);}this['checkMulticlasses'](),this[_0x37714b(0x12a)]=this['_multiclassTiers'][_0x37714b(0x2f5)](0x1,VisuMZ[_0x37714b(0x29f)]['Settings']['Multiclass'][_0x37714b(0x18f)]||0x1);for(const _0x210feb of this[_0x37714b(0x8f)]){this[_0x37714b(0x137)](_0x210feb);}},Game_Actor[_0x46f615(0x13c)]['getMulticlasses']=function(){const _0x3d1d97=_0x46f615;if(this[_0x3d1d97(0x8f)]===undefined)this[_0x3d1d97(0x10a)]();return this[_0x3d1d97(0x8f)][0x0]=this[_0x3d1d97(0x1b7)],this[_0x3d1d97(0x8f)][_0x3d1d97(0x1ce)](_0x26f1fa=>!!$dataClasses[_0x26f1fa])[_0x3d1d97(0x8d)](_0x438d20=>$dataClasses[_0x438d20]);},Game_Actor['prototype'][_0x46f615(0x24a)]=function(){return this['getMulticlasses']();},Game_Actor['prototype'][_0x46f615(0x2c9)]=function(_0x3674c3){const _0x2070b5=_0x46f615;if(this['_multiclasses']===undefined)this[_0x2070b5(0x10a)]();return _0x3674c3-=0x1,$dataClasses[this[_0x2070b5(0x8f)][_0x3674c3]]||null;},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x1ae)]=function(_0x5b5b8a){const _0x568001=_0x46f615;return this[_0x568001(0x2c9)](_0x5b5b8a);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x272)]=function(_0x48bdd6){const _0x358602=_0x46f615,_0x28c385=this[_0x358602(0x2c9)](_0x48bdd6);return _0x28c385?_0x28c385['id']:0x0;},Game_Actor[_0x46f615(0x13c)]['totalMulticlass']=function(){const _0xd1f24f=_0x46f615;if(this[_0xd1f24f(0x12a)]===undefined)this['initMulticlass']();return this[_0xd1f24f(0x12a)]=this[_0xd1f24f(0x12a)][_0xd1f24f(0x2f5)](0x1,VisuMZ[_0xd1f24f(0x29f)][_0xd1f24f(0xd6)][_0xd1f24f(0x2b7)][_0xd1f24f(0x18f)]||0x1),this[_0xd1f24f(0x12a)];},Game_Actor['prototype'][_0x46f615(0x13a)]=function(_0x44b24d){const _0xdb70d9=_0x46f615;if(this[_0xdb70d9(0x12a)]===undefined)this[_0xdb70d9(0x10a)]();this[_0xdb70d9(0x12a)]=_0x44b24d[_0xdb70d9(0x2f5)](0x1,VisuMZ['ClassChangeSystem']['Settings']['Multiclass'][_0xdb70d9(0x18f)]||0x1);},Game_Actor['prototype'][_0x46f615(0x1ea)]=function(_0xec920a){const _0x12de4c=_0x46f615;_0xec920a+=this[_0x12de4c(0x107)](),this['setMulticlassTiers'](_0xec920a);},Game_Actor[_0x46f615(0x13c)]['loseMulticlassTiers']=function(_0x311496){const _0x4cf8df=_0x46f615;_0x311496=this['totalMulticlass']()-_0x311496,this[_0x4cf8df(0x13a)](_0x311496);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xa8)]=function(){const _0x15f471=_0x46f615;if(this[_0x15f471(0x8f)]===undefined)this[_0x15f471(0x10a)]();let _0x41a47c=![];const _0x3ceb6b=this[_0x15f471(0x107)]();while(this[_0x15f471(0x8f)][_0x15f471(0x18f)]>_0x3ceb6b){_0x41a47c=!![],this['_multiclasses']['pop']();}this[_0x15f471(0x8f)][0x0]=this[_0x15f471(0x2e4)]()['id'];const _0x5789fc=this['_multiclasses'][_0x15f471(0x18f)];for(let _0x452690=0x1;_0x452690<_0x5789fc;_0x452690++){this[_0x15f471(0x8f)][_0x452690]===this[_0x15f471(0x2e4)]()['id']&&(this[_0x15f471(0x8f)][_0x452690]=0x0,_0x41a47c=!![]);}if(_0x41a47c)this[_0x15f471(0x109)]();},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x232)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x26d)],Game_BattlerBase['prototype'][_0x46f615(0x26d)]=function(_0x5c5d7b){const _0x3ebbeb=_0x46f615;if(this['isActor']())this['_multiclassCheck']=_0x3ebbeb(0xad);let _0x4adee7=VisuMZ[_0x3ebbeb(0x29f)]['Game_BattlerBase_elementRate'][_0x3ebbeb(0x115)](this,_0x5c5d7b);if(this[_0x3ebbeb(0x125)]())this[_0x3ebbeb(0xb7)]=undefined;return _0x4adee7;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x2c2)]=Game_BattlerBase['prototype'][_0x46f615(0x28f)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x28f)]=function(_0x13b517){const _0x586e8c=_0x46f615;if(this[_0x586e8c(0x125)]())this[_0x586e8c(0xb7)]=_0x586e8c(0x278);let _0x204209=VisuMZ[_0x586e8c(0x29f)]['Game_BattlerBase_debuffRate'][_0x586e8c(0x115)](this,_0x13b517);if(this[_0x586e8c(0x125)]())this[_0x586e8c(0xb7)]=undefined;return _0x204209;},VisuMZ['ClassChangeSystem'][_0x46f615(0x325)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0xe3)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0xe3)]=function(_0x520f92){const _0x5aa43f=_0x46f615;if(this[_0x5aa43f(0x125)]())this[_0x5aa43f(0xb7)]=_0x5aa43f(0x149);let _0xe5a94b=VisuMZ[_0x5aa43f(0x29f)][_0x5aa43f(0x325)]['call'](this,_0x520f92);if(this['isActor']())this[_0x5aa43f(0xb7)]=undefined;return _0xe5a94b;},VisuMZ[_0x46f615(0x29f)]['Game_BattlerBase_stateResistSet']=Game_BattlerBase['prototype'][_0x46f615(0xaf)],Game_BattlerBase[_0x46f615(0x13c)]['stateResistSet']=function(){const _0x504527=_0x46f615;if(this[_0x504527(0x125)]())this[_0x504527(0xb7)]=_0x504527(0x27c);let _0x16f5fa=VisuMZ[_0x504527(0x29f)]['Game_BattlerBase_stateResistSet']['call'](this);if(this[_0x504527(0x125)]())this[_0x504527(0xb7)]=undefined;return _0x16f5fa;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x2f8)]=Game_BattlerBase['prototype'][_0x46f615(0x8a)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x8a)]=function(_0x1f9fd1){const _0x277753=_0x46f615;if(this['isActor']())this[_0x277753(0xb7)]=_0x277753(0x2b3);let _0x135723=VisuMZ['ClassChangeSystem']['Game_BattlerBase_paramRate'][_0x277753(0x115)](this,_0x1f9fd1);if(this['isActor']())this[_0x277753(0xb7)]=undefined;return _0x135723;},VisuMZ['ClassChangeSystem']['Game_BattlerBase_xparam']=Game_BattlerBase['prototype']['xparam'],Game_BattlerBase[_0x46f615(0x13c)]['xparam']=function(_0x295478){const _0x1903f7=_0x46f615;if(this['isActor']())this[_0x1903f7(0xb7)]=_0x1903f7(0x207);let _0x3717a7=VisuMZ['ClassChangeSystem'][_0x1903f7(0x162)][_0x1903f7(0x115)](this,_0x295478);if(this[_0x1903f7(0x125)]())this[_0x1903f7(0xb7)]=undefined;return _0x3717a7;},VisuMZ['ClassChangeSystem'][_0x46f615(0x247)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0xd3)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0xd3)]=function(_0x5232fd){const _0x1bc9bb=_0x46f615;if(this['isActor']())this[_0x1bc9bb(0xb7)]=_0x1bc9bb(0x2a3);let _0x39b57d=VisuMZ[_0x1bc9bb(0x29f)][_0x1bc9bb(0x247)][_0x1bc9bb(0x115)](this,_0x5232fd);if(this['isActor']())this['_multiclassCheck']=undefined;return _0x39b57d;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x144)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x126)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x126)]=function(){const _0x1bc66d=_0x46f615;if(this[_0x1bc66d(0x125)]())this['_multiclassCheck']=_0x1bc66d(0x2bd);let _0x4fd5d2=VisuMZ[_0x1bc66d(0x29f)][_0x1bc66d(0x144)][_0x1bc66d(0x115)](this);if(this['isActor']())this[_0x1bc66d(0xb7)]=undefined;return _0x4fd5d2;},VisuMZ[_0x46f615(0x29f)]['Game_BattlerBase_attackStates']=Game_BattlerBase[_0x46f615(0x13c)]['attackStates'],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x271)]=function(){const _0x3f810d=_0x46f615;if(this[_0x3f810d(0x125)]())this[_0x3f810d(0xb7)]='AttackStates';let _0x5daccd=VisuMZ[_0x3f810d(0x29f)][_0x3f810d(0x279)][_0x3f810d(0x115)](this);if(this[_0x3f810d(0x125)]())this[_0x3f810d(0xb7)]=undefined;return _0x5daccd;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0xea)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x93)],Game_BattlerBase['prototype'][_0x46f615(0x93)]=function(_0x19dbf3){const _0x3eacf0=_0x46f615;if(this[_0x3eacf0(0x125)]())this['_multiclassCheck']=_0x3eacf0(0x297);let _0x4cbdee=VisuMZ[_0x3eacf0(0x29f)][_0x3eacf0(0xea)][_0x3eacf0(0x115)](this,_0x19dbf3);if(this[_0x3eacf0(0x125)]())this[_0x3eacf0(0xb7)]=undefined;return _0x4cbdee;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x6d)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x2ba)],Game_BattlerBase['prototype'][_0x46f615(0x2ba)]=function(){const _0x6084c6=_0x46f615;if(this[_0x6084c6(0x125)]())this['_multiclassCheck']='AddedStypes';let _0x358ea8=VisuMZ['ClassChangeSystem']['Game_BattlerBase_addedSkillTypes']['call'](this);if(this[_0x6084c6(0x125)]())this[_0x6084c6(0xb7)]=undefined;return _0x358ea8;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x22c)]=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x32c)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x32c)]=function(){const _0x4e1ee9=_0x46f615;if(this[_0x4e1ee9(0x125)]())this[_0x4e1ee9(0xb7)]=_0x4e1ee9(0xb1);let _0x1a9344=VisuMZ[_0x4e1ee9(0x29f)][_0x4e1ee9(0x22c)][_0x4e1ee9(0x115)](this);if(this[_0x4e1ee9(0x125)]())this[_0x4e1ee9(0xb7)]=undefined;return _0x1a9344;},VisuMZ[_0x46f615(0x29f)]['Game_BattlerBase_isEquipWtypeOk']=Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x139)],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x139)]=function(_0x193abd){const _0x521b49=_0x46f615;if(this['isActor']())this[_0x521b49(0xb7)]=_0x521b49(0x17a);let _0x34da06=VisuMZ[_0x521b49(0x29f)][_0x521b49(0x1c5)][_0x521b49(0x115)](this,_0x193abd);if(this['isActor']())this['_multiclassCheck']=undefined;return _0x34da06;},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x328)]=Game_BattlerBase[_0x46f615(0x13c)]['isEquipAtypeOk'],Game_BattlerBase[_0x46f615(0x13c)][_0x46f615(0x203)]=function(_0x2e4565){const _0x5dd81a=_0x46f615;if(this[_0x5dd81a(0x125)]())this[_0x5dd81a(0xb7)]=_0x5dd81a(0x174);let _0x378c07=VisuMZ[_0x5dd81a(0x29f)][_0x5dd81a(0x328)][_0x5dd81a(0x115)](this,_0x2e4565);if(this[_0x5dd81a(0x125)]())this[_0x5dd81a(0xb7)]=undefined;return _0x378c07;},VisuMZ[_0x46f615(0x29f)]['Game_Actor_traitObjects']=Game_Actor[_0x46f615(0x13c)][_0x46f615(0x14d)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x14d)]=function(){const _0x42ec61=_0x46f615;let _0x256e6f=VisuMZ[_0x42ec61(0x29f)][_0x42ec61(0x153)]['call'](this);return this[_0x42ec61(0xb7)]&&(_0x256e6f=this['applyMulticlassObjects'](_0x256e6f)),_0x256e6f;},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2fe)]=function(_0x160ecb){const _0x2dabfb=_0x46f615;if(this[_0x2dabfb(0x8f)]===undefined)this[_0x2dabfb(0x10a)]();const _0x2892f8=this[_0x2dabfb(0xb7)];let _0x11ec43=_0x160ecb[_0x2dabfb(0x2a1)](this[_0x2dabfb(0x2e4)]());const _0x26fa2e=VisuMZ[_0x2dabfb(0x29f)][_0x2dabfb(0xd6)][_0x2dabfb(0x2b7)],_0x13a804=_0x26fa2e[_0x2dabfb(0x18f)];for(let _0x3ec7b0=0x1;_0x3ec7b0<_0x13a804;_0x3ec7b0++){let _0x1b565a=$dataClasses[this[_0x2dabfb(0x8f)][_0x3ec7b0]||0x0];if(!_0x1b565a)continue;if(_0x1b565a===this[_0x2dabfb(0x2e4)]())continue;const _0x3fbb83=_0x26fa2e[_0x3ec7b0];if(!_0x3fbb83)continue;_0x3fbb83[this[_0x2dabfb(0xb7)]]&&_0x160ecb['splice'](++_0x11ec43,0x0,_0x1b565a);}return _0x160ecb;},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2e3)]=function(_0x4ea7b1,_0x11d1af){const _0x4700b1=_0x46f615;if(_0x4ea7b1<=0x0)return;if(!_0x11d1af)return;if(!$dataSystem[_0x4700b1(0xac)]&&!this[_0x4700b1(0x254)]())return;this['getMulticlasses']();const _0x39f871=VisuMZ[_0x4700b1(0x29f)][_0x4700b1(0xd6)]['Multiclass'],_0x45e52b=_0x39f871['length'];for(let _0xec93d7=0x1;_0xec93d7<_0x45e52b;_0xec93d7++){let _0x5f4032=$dataClasses[this[_0x4700b1(0x8f)][_0xec93d7]||0x0];if(!_0x5f4032)continue;if(_0x5f4032===this[_0x4700b1(0x2e4)]())continue;const _0x1a2765=_0x39f871[_0xec93d7];if(!_0x1a2765)continue;if(this[_0x4700b1(0xfa)[_0x4700b1(0x181)](_0x11d1af)]){const _0x2f6405=_0x1a2765['resourceRate'],_0x5ed171=_0x2f6405*_0x4ea7b1;this[_0x4700b1(0xfa)[_0x4700b1(0x181)](_0x11d1af)](_0x5ed171,this[_0x4700b1(0x8f)][_0xec93d7]);}}},Game_Actor[_0x46f615(0x13c)]['gainMulticlassExp']=function(_0x28b3c9){const _0x1e80f1=_0x46f615;if(!_0x28b3c9)return;if(this[_0x1e80f1(0x313)]())return;this[_0x1e80f1(0x163)]();const _0x5f159a=VisuMZ[_0x1e80f1(0x29f)]['Settings'][_0x1e80f1(0x2b7)],_0x4f0cbb=_0x5f159a['length'];for(let _0x40b6f3=0x1;_0x40b6f3<_0x4f0cbb;_0x40b6f3++){let _0x3e6f9c=$dataClasses[this[_0x1e80f1(0x8f)][_0x40b6f3]||0x0];if(!_0x3e6f9c)continue;if(_0x3e6f9c===this[_0x1e80f1(0x2e4)]())continue;const _0x522b0a=_0x5f159a[_0x40b6f3];if(!_0x522b0a)continue;const _0x34edb3=_0x522b0a[_0x1e80f1(0x173)],_0x827750=Math['round'](_0x28b3c9*_0x34edb3*this[_0x1e80f1(0x276)]()),_0x5ded96=this['_multiclasses'][_0x40b6f3];this[_0x1e80f1(0x333)][_0x5ded96]=this['_exp'][_0x5ded96]||0x0;const _0x137ca8=this[_0x1e80f1(0x333)][_0x5ded96]+_0x827750;this[_0x1e80f1(0x6c)](_0x137ca8,_0x5ded96);}},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x9c)]=function(_0x98200d,_0x1b1a32){const _0x454edd=_0x46f615;if(this['_multiclasses']===undefined)this['initMulticlass']();_0x1b1a32-=0x1;if(_0x98200d<=0x0&&_0x1b1a32<=0x0)return;this[_0x454edd(0x137)](_0x98200d);const _0x1b7630=this[_0x454edd(0x8f)]['length'];for(let _0x5bc519=0x0;_0x5bc519<_0x1b7630;_0x5bc519++){this[_0x454edd(0x8f)][_0x5bc519]===_0x98200d&&(this[_0x454edd(0x8f)][_0x5bc519]=0x0);}this[_0x454edd(0x8f)][0x0]=this[_0x454edd(0x2e4)]()['id'];if(_0x1b1a32<=0x0){this[_0x454edd(0x2be)](_0x98200d);return;}const _0x50eaab=JsonEx[_0x454edd(0xc5)](this);_0x50eaab[_0x454edd(0x13b)]=!![],this[_0x454edd(0x8f)][_0x1b1a32]=_0x98200d,this[_0x454edd(0xa8)](),this[_0x454edd(0x109)](),this[_0x454edd(0xa0)](_0x50eaab),this[_0x454edd(0xa8)]();},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2c8)]=function(_0x116ec6){const _0x157cd1=_0x46f615;if(this[_0x157cd1(0x8f)]===undefined)this[_0x157cd1(0x10a)]();return this['_multiclasses'][0x0]=this[_0x157cd1(0x2e4)]()['id'],this[_0x157cd1(0x8f)][_0x157cd1(0x2a1)](_0x116ec6)+0x1;},Game_Actor[_0x46f615(0x13c)]['initClassLevels']=function(){const _0x27d23d=_0x46f615;this[_0x27d23d(0x1e0)]={},this[_0x27d23d(0x1e0)][this[_0x27d23d(0x2e4)]()['id']]=this['level'];},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x313)]=function(){const _0x309dd9=_0x46f615;return VisuMZ[_0x309dd9(0x29f)][_0x309dd9(0xd6)][_0x309dd9(0x1a4)][_0x309dd9(0x182)];},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x320)]=function(_0x3342cf){const _0x190a83=_0x46f615;if(this['maintainLevels']())return this[_0x190a83(0x10e)];return this[_0x190a83(0x2fa)](_0x3342cf),this[_0x190a83(0x1e0)][_0x3342cf];},Game_Actor[_0x46f615(0x13c)]['changeClassExp']=function(_0x607761,_0x5e6eb1){const _0x30b5b9=_0x46f615;if(this['maintainLevels']())return this[_0x30b5b9(0x2c4)](_0x607761);this[_0x30b5b9(0x333)][_0x5e6eb1]=Math[_0x30b5b9(0x244)](_0x607761,0x0),this[_0x30b5b9(0x2fa)](_0x5e6eb1);if(_0x5e6eb1===this['currentClass']()['id'])this[_0x30b5b9(0x109)]();},Game_Actor[_0x46f615(0x13c)]['updateClassLevel']=function(_0x4f1e8f){const _0x224913=_0x46f615;if(this[_0x224913(0x313)]())return;this[_0x224913(0x333)][_0x4f1e8f]=this['_exp'][_0x4f1e8f]||0x0,this[_0x224913(0x1e0)]=this[_0x224913(0x1e0)]||{},this[_0x224913(0x1e0)][_0x4f1e8f]=this['_classLevel'][_0x4f1e8f]||0x1;while(!(this[_0x224913(0x1e0)][_0x4f1e8f]>=this[_0x224913(0x1ab)]())&&this[_0x224913(0x333)][_0x4f1e8f]>=this[_0x224913(0x2fb)](_0x4f1e8f,this[_0x224913(0x1e0)][_0x4f1e8f])){this[_0x224913(0x1e0)][_0x4f1e8f]+=0x1,this[_0x224913(0x9d)](_0x4f1e8f);}while(this[_0x224913(0x333)][_0x4f1e8f]<this[_0x224913(0x204)](_0x4f1e8f,this[_0x224913(0x1e0)][_0x4f1e8f])){this[_0x224913(0x1e0)][_0x4f1e8f]-=0x1;}this[_0x224913(0x304)]();},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x18b)]=function(_0x502f01,_0x313954){const _0x54c618=_0x46f615,_0x3a1327=$dataClasses[_0x502f01],_0x3f41b0=_0x3a1327['expParams'][0x0],_0x3cc5b5=_0x3a1327[_0x54c618(0x1d0)][0x1],_0x1fd506=_0x3a1327[_0x54c618(0x1d0)][0x2],_0x832de6=_0x3a1327[_0x54c618(0x1d0)][0x3];return Math['round'](_0x3f41b0*Math[_0x54c618(0x260)](_0x313954-0x1,0.9+_0x1fd506/0xfa)*_0x313954*(_0x313954+0x1)/(0x6+Math[_0x54c618(0x260)](_0x313954,0x2)/0x32/_0x832de6)+(_0x313954-0x1)*_0x3cc5b5);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0x2fb)]=function(_0x357fe0,_0x400395){const _0x2a1c47=_0x46f615;return this[_0x2a1c47(0x18b)](_0x357fe0,_0x400395+0x1);},Game_Actor[_0x46f615(0x13c)]['currentClassLevelExp']=function(_0x3a748e,_0x5c7ea1){const _0x2b8a60=_0x46f615;return this[_0x2b8a60(0x18b)](_0x3a748e,_0x5c7ea1);},Game_Actor['prototype'][_0x46f615(0x9d)]=function(_0x264960){const _0x38bb9d=_0x46f615;this[_0x38bb9d(0xa9)](_0x264960),this[_0x38bb9d(0x135)](_0x264960),Imported[_0x38bb9d(0x17e)]&&(this['levelUpGainAbilityPoints'](_0x264960),this['levelUpGainSkillPoints'](_0x264960));},Game_Actor['prototype'][_0x46f615(0x304)]=function(){const _0x239a26=_0x46f615;if(this[_0x239a26(0x1b6)])return;this['_updateClassLearnedSkills']=!![];const _0x46c24c=DataManager[_0x239a26(0x73)](this);for(const _0x2adb88 of _0x46c24c){if(!_0x2adb88)continue;const _0xaf15d=_0x2adb88[_0x239a26(0x26b)];if(!_0xaf15d)continue;for(const _0x283647 of _0xaf15d){if(this[_0x239a26(0x179)](_0x283647[_0x239a26(0x1bd)]))continue;if(this[_0x239a26(0x320)](_0x2adb88['id'])>=_0x283647['level']){const _0x119dfb=this[_0x239a26(0x32e)]||{};this[_0x239a26(0x21b)](_0x283647['skillId']),this[_0x239a26(0x32e)]=_0x119dfb;}}}this['_updateClassLearnedSkills']=![];},VisuMZ[_0x46f615(0x29f)]['Game_Actor_paramBase']=Game_Actor['prototype'][_0x46f615(0x282)],Game_Actor[_0x46f615(0x13c)][_0x46f615(0x282)]=function(_0x53b67c){const _0x128b8a=_0x46f615;let _0x2f4cb7=VisuMZ['ClassChangeSystem']['Game_Actor_paramBase'][_0x128b8a(0x115)](this,_0x53b67c);this[_0x128b8a(0x163)]();const _0x8827f=VisuMZ[_0x128b8a(0x29f)][_0x128b8a(0xd6)][_0x128b8a(0x2b7)],_0x5ed08c='paramRate%1'['format'](_0x53b67c),_0x13f3fb=_0x8827f[_0x128b8a(0x18f)];for(let _0x337e37=0x1;_0x337e37<_0x13f3fb;_0x337e37++){let _0x19c912=$dataClasses[this['_multiclasses'][_0x337e37]||0x0];if(!_0x19c912)continue;if(_0x19c912===this[_0x128b8a(0x2e4)]())continue;const _0x335cb3=_0x8827f[_0x337e37];if(!_0x335cb3)continue;const _0x5f512f=_0x335cb3[_0x5ed08c];_0x2f4cb7+=_0x5f512f*this['paramBaseForClass'](this[_0x128b8a(0x8f)][_0x337e37],_0x53b67c);}return _0x2f4cb7;},Game_Actor[_0x46f615(0x13c)]['paramBaseForClass']=function(_0x39619f,_0x4dc2a6){const _0x37c1c9=_0x46f615,_0x162844=$dataClasses[_0x39619f],_0xea9b79=this[_0x37c1c9(0x320)](_0x39619f);if(_0xea9b79>0x63){const _0x475966=_0x162844[_0x37c1c9(0x70)][_0x4dc2a6][0x63],_0x4cf66a=_0x162844[_0x37c1c9(0x70)][_0x4dc2a6][0x62];return _0x475966+(_0x475966-_0x4cf66a)*(_0xea9b79-0x63);}else return _0x162844[_0x37c1c9(0x70)][_0x4dc2a6][_0xea9b79];},Game_Actor['prototype']['classExpRate']=function(_0x49bdd7){const _0x2f304c=_0x46f615;if(this[_0x2f304c(0x1e0)][_0x49bdd7]>=this['maxLevel']())return 0x1;const _0xae81c1=this['classLevel'](_0x49bdd7),_0x2c0e26=this[_0x2f304c(0x2fb)](_0x49bdd7,_0xae81c1)-this[_0x2f304c(0x204)](_0x49bdd7,_0xae81c1);this['_exp'][_0x49bdd7]=this['_exp'][_0x49bdd7]||0x0;const _0x50fde6=this[_0x2f304c(0x333)][_0x49bdd7]-this['currentClassLevelExp'](_0x49bdd7,_0xae81c1);return(_0x50fde6/_0x2c0e26)[_0x2f304c(0x2f5)](0x0,0x1);},Game_Actor[_0x46f615(0x13c)][_0x46f615(0xb2)]=function(){const _0xed6fe3=_0x46f615;for(;;){const _0x4900dc=DataManager[_0xed6fe3(0x199)](this);if(_0x4900dc[_0xed6fe3(0x18f)]>0x0)for(const _0x322a3c of _0x4900dc){this[_0xed6fe3(0x137)](_0x322a3c);}else break;}},Game_Actor[_0x46f615(0x13c)]['initClassChangeRestrictions']=function(){const _0x1186c4=_0x46f615;let _0x362326=[];const _0xd97412=VisuMZ[_0x1186c4(0x29f)][_0x1186c4(0xd2)],_0x2df0b2=this['actor']()[_0x1186c4(0x10c)],_0x48fc9a=_0x2df0b2[_0x1186c4(0xfc)](_0xd97412[_0x1186c4(0x21a)]);if(_0x48fc9a)for(const _0x21b791 of _0x48fc9a){if(!_0x21b791)continue;_0x21b791['match'](_0xd97412[_0x1186c4(0x21a)]);const _0x4db778=String(RegExp['$1'])[_0x1186c4(0x178)](',')[_0x1186c4(0x8d)](_0x5b2d0a=>Number(_0x5b2d0a));_0x362326=_0x362326[_0x1186c4(0x156)](_0x4db778);}_0x362326=_0x362326[_0x1186c4(0x1ce)]((_0x700767,_0x39de50,_0x2c8dad)=>_0x2c8dad[_0x1186c4(0x2a1)](_0x700767)===_0x39de50),_0x362326[_0x1186c4(0x7d)](null)['remove'](undefined),_0x362326[_0x1186c4(0x140)]((_0x796869,_0x164e06)=>_0x796869-_0x164e06),this[_0x1186c4(0x307)]=_0x362326;},Game_Actor['prototype'][_0x46f615(0xa4)]=function(_0xdb6065){const _0x240088=_0x46f615;return this['_classChangeTierRestrictions']===undefined&&this[_0x240088(0x150)](),this[_0x240088(0x307)][_0x240088(0x158)](_0xdb6065);},Game_Actor[_0x46f615(0x13c)]['addClassChangeTierRestriction']=function(_0x45e931){const _0x31d5c0=_0x46f615;this['_classChangeTierRestrictions']===undefined&&this[_0x31d5c0(0x150)]();if(this[_0x31d5c0(0x307)][_0x31d5c0(0x158)](_0x45e931))return;this['_classChangeTierRestrictions']['push'](_0x45e931),this[_0x31d5c0(0x307)][_0x31d5c0(0x140)]((_0x5ca329,_0xa467f2)=>_0x5ca329-_0xa467f2);},Game_Actor['prototype']['removeClassChangeTierRestriction']=function(_0x31cbc5){const _0x6a17c8=_0x46f615;this['_classChangeTierRestrictions']===undefined&&this[_0x6a17c8(0x150)]();if(!this['_classChangeTierRestrictions'][_0x6a17c8(0x158)](_0x31cbc5))return;this[_0x6a17c8(0x307)][_0x6a17c8(0x7d)](_0x31cbc5),this[_0x6a17c8(0x307)][_0x6a17c8(0x140)]((_0x28ffba,_0x2974f4)=>_0x28ffba-_0x2974f4);},Game_Enemy[_0x46f615(0x13c)]['classPoints']=function(){const _0x104476=_0x46f615,_0x83797f=VisuMZ[_0x104476(0x29f)][_0x104476(0xd6)][_0x104476(0xdb)],_0x209558=VisuMZ[_0x104476(0x29f)][_0x104476(0xd2)],_0x1dc46f=this['enemy']()[_0x104476(0x10c)];if(_0x1dc46f['match'](_0x209558['EnemyClassPoints']))try{return eval(RegExp['$1']);}catch(_0x39c6d0){if($gameTemp[_0x104476(0xf4)]())console[_0x104476(0x189)](_0x39c6d0);return 0x0;}try{return eval(_0x83797f['PerEnemy']);}catch(_0x5eb5f8){if($gameTemp[_0x104476(0xf4)]())console['log'](_0x5eb5f8);return 0x0;}},Game_Enemy[_0x46f615(0x13c)][_0x46f615(0xb9)]=function(){const _0x4a0b0a=_0x46f615,_0x2b4bba=VisuMZ[_0x4a0b0a(0x29f)][_0x4a0b0a(0xd6)]['JobPoints'],_0x1d9091=VisuMZ['ClassChangeSystem']['RegExp'],_0x4c13dd=this['enemy']()[_0x4a0b0a(0x10c)];if(_0x4c13dd['match'](_0x1d9091[_0x4a0b0a(0x29b)]))try{return eval(RegExp['$1']);}catch(_0x2c7b08){if($gameTemp['isPlaytest']())console[_0x4a0b0a(0x189)](_0x2c7b08);return 0x0;}try{return eval(_0x2b4bba[_0x4a0b0a(0x12f)]);}catch(_0x3addb4){if($gameTemp['isPlaytest']())console[_0x4a0b0a(0x189)](_0x3addb4);return 0x0;}},VisuMZ['ClassChangeSystem']['Game_Party_initialize']=Game_Party[_0x46f615(0x13c)][_0x46f615(0x2d1)],Game_Party[_0x46f615(0x13c)][_0x46f615(0x2d1)]=function(){const _0x22206c=_0x46f615;VisuMZ[_0x22206c(0x29f)][_0x22206c(0x1ad)][_0x22206c(0x115)](this),this['initClassChangeUnlocks']();},Game_Party[_0x46f615(0x13c)][_0x46f615(0x294)]=function(){const _0x3e83f5=_0x46f615;this[_0x3e83f5(0x214)]=[];},Game_Party['prototype'][_0x46f615(0x2e1)]=function(){const _0x46d40f=_0x46f615;if(this[_0x46d40f(0x214)]===undefined)this[_0x46d40f(0x294)]();return this[_0x46d40f(0x214)];},Game_Party['prototype'][_0x46f615(0x137)]=function(_0x1f083a){const _0x47939a=_0x46f615;for(const _0xaacc83 of this[_0x47939a(0x6b)]()){if(!_0xaacc83)continue;_0xaacc83['unlockClass'](_0x1f083a);}if(this[_0x47939a(0x214)]===undefined)this[_0x47939a(0x294)]();if(this['_unlockedClasses'][_0x47939a(0x158)](_0x1f083a))return;this['_unlockedClasses'][_0x47939a(0x215)](_0x1f083a),this['_unlockedClasses']['sort'](function(_0x54b6ff,_0x4122b9){return _0x54b6ff-_0x4122b9;});},Game_Party[_0x46f615(0x13c)]['removeUnlockedClass']=function(_0x2a0bdd){const _0x347d49=_0x46f615;for(const _0x5eede1 of this[_0x347d49(0x6b)]()){if(!_0x5eede1)continue;_0x5eede1[_0x347d49(0x2e2)](_0x2a0bdd);}if(this[_0x347d49(0x214)]===undefined)this['initClassChangeUnlocks']();if(!this['_unlockedClasses'][_0x347d49(0x158)](_0x2a0bdd))return;this['_unlockedClasses'][_0x347d49(0x7d)](_0x2a0bdd)[_0x347d49(0x7d)](null),this[_0x347d49(0x214)][_0x347d49(0x140)](function(_0x4586e2,_0x59b2f4){return _0x4586e2-_0x59b2f4;});},Game_Party['prototype'][_0x46f615(0x15a)]=function(){const _0x2ade0f=_0x46f615,_0xd01fda=this[_0x2ade0f(0x6b)]();return Math[_0x2ade0f(0x244)](...this['members']()[_0x2ade0f(0x8d)](_0x35c68e=>_0x35c68e[_0x2ade0f(0x107)]()));},Game_Troop[_0x46f615(0x13c)]['classPointsTotal']=function(){const _0x2a9024=_0x46f615;return this[_0x2a9024(0x12e)]()[_0x2a9024(0x267)]((_0x7fffed,_0x9aa0f3)=>_0x7fffed+_0x9aa0f3[_0x2a9024(0xb3)](),0x0);},Game_Troop[_0x46f615(0x13c)][_0x46f615(0x138)]=function(){const _0x3fcf07=_0x46f615;return this[_0x3fcf07(0x12e)]()[_0x3fcf07(0x267)]((_0x10ddfd,_0x45de2c)=>_0x10ddfd+_0x45de2c[_0x3fcf07(0xb9)](),0x0);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x2e7)]=Scene_Menu[_0x46f615(0x13c)][_0x46f615(0x281)],Scene_Menu[_0x46f615(0x13c)]['createCommandWindow']=function(){const _0x1ba14b=_0x46f615;VisuMZ[_0x1ba14b(0x29f)][_0x1ba14b(0x2e7)][_0x1ba14b(0x115)](this);const _0x4c70ec=this[_0x1ba14b(0x236)];_0x4c70ec[_0x1ba14b(0xbd)](_0x1ba14b(0x29f),this[_0x1ba14b(0x245)][_0x1ba14b(0x1f8)](this));},VisuMZ[_0x46f615(0x29f)][_0x46f615(0xe5)]=Scene_Menu[_0x46f615(0x13c)][_0x46f615(0x2fd)],Scene_Menu[_0x46f615(0x13c)][_0x46f615(0x2fd)]=function(){const _0x5078c1=_0x46f615;this[_0x5078c1(0x236)][_0x5078c1(0xf8)]()===_0x5078c1(0x29f)?SceneManager[_0x5078c1(0x215)](Scene_ClassChange):VisuMZ[_0x5078c1(0x29f)][_0x5078c1(0xe5)][_0x5078c1(0x115)](this);};function Scene_ClassChange(){this['initialize'](...arguments);}Scene_ClassChange[_0x46f615(0x13c)]=Object[_0x46f615(0x1a3)](Scene_MenuBase['prototype']),Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x136)]=Scene_ClassChange,Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x2d1)]=function(){const _0x4114af=_0x46f615;Scene_MenuBase[_0x4114af(0x13c)][_0x4114af(0x2d1)][_0x4114af(0x115)](this),this[_0x4114af(0x32d)]=this[_0x4114af(0x32d)]||[];},Scene_ClassChange[_0x46f615(0x13c)]['needsPageButtons']=function(){return!![];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x1e1)]=function(){const _0x54e4b0=_0x46f615;return this[_0x54e4b0(0x316)]()>0x1?this[_0x54e4b0(0x216)]&&this[_0x54e4b0(0x216)][_0x54e4b0(0xa6)]:this[_0x54e4b0(0x234)]&&this['_classListWindow'][_0x54e4b0(0xa6)];},Scene_ClassChange['prototype'][_0x46f615(0x26c)]=function(){const _0x4acfe8=_0x46f615;Scene_MenuBase[_0x4acfe8(0x13c)]['update'][_0x4acfe8(0x115)](this),this[_0x4acfe8(0x85)]();},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x1a1)]=function(){return!![];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0xba)]=function(){const _0x2bce7b=_0x46f615;if(ConfigManager[_0x2bce7b(0x1dd)]&&ConfigManager[_0x2bce7b(0x1f6)]!==undefined)return ConfigManager[_0x2bce7b(0x1f6)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x2bce7b(0xf5)]()[_0x2bce7b(0xfc)](/LOWER/i);else Scene_MenuBase[_0x2bce7b(0x13c)][_0x2bce7b(0x2d9)][_0x2bce7b(0x115)](this);}},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x2d9)]=function(){const _0x58e2fb=_0x46f615;if(ConfigManager[_0x58e2fb(0x1dd)]&&ConfigManager[_0x58e2fb(0x2f6)]!==undefined)return ConfigManager[_0x58e2fb(0x2f6)];else{if(this[_0x58e2fb(0x202)]())return this['updatedLayoutStyle']()['match'](/RIGHT/i);else Scene_MenuBase[_0x58e2fb(0x13c)][_0x58e2fb(0x2d9)][_0x58e2fb(0x115)](this);}},Scene_ClassChange[_0x46f615(0x13c)]['updatedLayoutStyle']=function(){const _0x19d09d=_0x46f615;return VisuMZ[_0x19d09d(0x29f)][_0x19d09d(0xd6)][_0x19d09d(0x27a)][_0x19d09d(0x180)];},Scene_ClassChange['prototype'][_0x46f615(0x202)]=function(){const _0x5308ac=_0x46f615;return VisuMZ[_0x5308ac(0x29f)][_0x5308ac(0xd6)][_0x5308ac(0x27a)][_0x5308ac(0x1b3)];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x1a3)]=function(){const _0x36715d=_0x46f615;Scene_MenuBase[_0x36715d(0x13c)]['create'][_0x36715d(0x115)](this),this[_0x36715d(0x159)](),this[_0x36715d(0x2b0)](),this[_0x36715d(0x231)](),this['createClassListWindow'](),this[_0x36715d(0x16b)](),this['refreshActor']();},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x2b0)]=function(){const _0x2ddff7=_0x46f615,_0x4dcaf4=this[_0x2ddff7(0x2bc)]();this[_0x2ddff7(0x2a2)]=new Window_ClassStatus(_0x4dcaf4),this['addWindow'](this['_statusWindow']),this['_statusWindow']['setBackgroundType'](VisuMZ[_0x2ddff7(0x29f)]['Settings'][_0x2ddff7(0x27a)][_0x2ddff7(0xc1)]);},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x2bc)]=function(){const _0x2f3d5a=_0x46f615,_0x42bd07=VisuMZ[_0x2f3d5a(0x29f)][_0x2f3d5a(0xd6)][_0x2f3d5a(0x27a)];if(_0x42bd07['Window_ClassStatus_RectJS'])return _0x42bd07['Window_ClassStatus_RectJS'][_0x2f3d5a(0x115)](this);const _0x2aa2df=Math[_0x2f3d5a(0x14f)](Graphics[_0x2f3d5a(0x1d1)]/0x2),_0x6325e5=this[_0x2f3d5a(0xf9)](),_0x280bc3=this[_0x2f3d5a(0x2d9)]()?0x0:_0x2aa2df,_0xb4ef02=this[_0x2f3d5a(0x1ec)]();return new Rectangle(_0x280bc3,_0xb4ef02,_0x2aa2df,_0x6325e5);},Scene_ClassChange[_0x46f615(0x13c)]['createClassTierWindow']=function(){const _0x17d17c=_0x46f615,_0xd38e34=this[_0x17d17c(0x248)](),_0x1f5767=new Window_ClassTier(_0xd38e34);_0x1f5767[_0x17d17c(0x108)](this[_0x17d17c(0x17c)]),_0x1f5767[_0x17d17c(0x86)](VisuMZ[_0x17d17c(0x29f)][_0x17d17c(0xd6)][_0x17d17c(0x27a)]['Window_ClassTier_BgType']),this[_0x17d17c(0x192)](_0x1f5767),this[_0x17d17c(0x216)]=_0x1f5767,_0x1f5767[_0x17d17c(0xbd)](_0x17d17c(0x1f1),this[_0x17d17c(0x123)][_0x17d17c(0x1f8)](this)),this[_0x17d17c(0x316)]()>0x1&&(_0x1f5767['setHandler'](_0x17d17c(0x2d5),this[_0x17d17c(0x274)][_0x17d17c(0x1f8)](this)),_0x1f5767[_0x17d17c(0xbd)](_0x17d17c(0x2e5),this['previousActor'][_0x17d17c(0x1f8)](this))),_0x1f5767[_0x17d17c(0xbd)](_0x17d17c(0x95),this[_0x17d17c(0x2f9)][_0x17d17c(0x1f8)](this));},Scene_ClassChange['prototype'][_0x46f615(0x248)]=function(){const _0x2669de=_0x46f615,_0x190d5c=VisuMZ['ClassChangeSystem'][_0x2669de(0xd6)][_0x2669de(0x27a)];if(_0x190d5c[_0x2669de(0x10d)])return _0x190d5c['Window_ClassTier_RectJS']['call'](this);const _0x6b5ebf=Graphics[_0x2669de(0x1d1)]-this['_statusWindow'][_0x2669de(0x32a)],_0x40c348=this[_0x2669de(0xf9)](),_0x32de8f=this[_0x2669de(0x2d9)]()?_0x6b5ebf:0x0,_0xfcc278=this['mainAreaTop']();return new Rectangle(_0x32de8f,_0xfcc278,_0x6b5ebf,_0x40c348);},Scene_ClassChange['prototype'][_0x46f615(0x1aa)]=function(){const _0x3753b9=_0x46f615,_0x3b2eeb=this[_0x3753b9(0x239)](),_0x11cfb8=new Window_ClassList(_0x3b2eeb);_0x11cfb8[_0x3753b9(0x108)](this['_helpWindow']),_0x11cfb8[_0x3753b9(0x280)](this[_0x3753b9(0x2a2)]),_0x11cfb8['setBackgroundType'](VisuMZ[_0x3753b9(0x29f)][_0x3753b9(0xd6)][_0x3753b9(0x27a)][_0x3753b9(0x104)]),this[_0x3753b9(0x192)](_0x11cfb8),this[_0x3753b9(0x234)]=_0x11cfb8,_0x11cfb8[_0x3753b9(0xbd)](_0x3753b9(0x1f1),this[_0x3753b9(0x118)][_0x3753b9(0x1f8)](this)),this[_0x3753b9(0x316)]()<=0x1&&(_0x11cfb8['setHandler']('pagedown',this[_0x3753b9(0x274)][_0x3753b9(0x1f8)](this)),_0x11cfb8[_0x3753b9(0xbd)](_0x3753b9(0x2e5),this[_0x3753b9(0x1bb)][_0x3753b9(0x1f8)](this))),_0x11cfb8[_0x3753b9(0xbd)](_0x3753b9(0x319),this[_0x3753b9(0x1c7)]['bind'](this));},Scene_ClassChange[_0x46f615(0x13c)]['classListWindowRect']=function(){const _0x224d29=_0x46f615,_0x1d6e07=VisuMZ[_0x224d29(0x29f)]['Settings'][_0x224d29(0x27a)];if(_0x1d6e07[_0x224d29(0xbc)])return _0x1d6e07[_0x224d29(0xbc)][_0x224d29(0x115)](this);const _0x3020e0=Graphics[_0x224d29(0x1d1)]-this[_0x224d29(0x2a2)][_0x224d29(0x32a)],_0x531692=this[_0x224d29(0xf9)](),_0x434348=this[_0x224d29(0x2d9)]()?_0x3020e0:0x0,_0xfc094c=this[_0x224d29(0x1ec)]();return new Rectangle(_0x434348,_0xfc094c,_0x3020e0,_0x531692);},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x316)]=function(){const _0x387dc7=_0x46f615;if(this[_0x387dc7(0x243)]!==undefined)return this[_0x387dc7(0x243)];return this['_highestTier']=$gameParty[_0x387dc7(0x15a)](),this[_0x387dc7(0x243)];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x16b)]=function(){const _0x401200=_0x46f615;this[_0x401200(0x316)]()>0x1?(this[_0x401200(0x216)][_0x401200(0x2b5)](0x0),this[_0x401200(0x216)][_0x401200(0x23d)](),this[_0x401200(0x216)][_0x401200(0x290)](),this[_0x401200(0x234)][_0x401200(0x1dc)](),this[_0x401200(0x234)][_0x401200(0xd0)]()):(this[_0x401200(0x234)]['forceSelect'](0x0),this[_0x401200(0x234)][_0x401200(0x211)](0x1),this[_0x401200(0x234)][_0x401200(0x23d)](),this['_classListWindow'][_0x401200(0x290)](),this[_0x401200(0x216)][_0x401200(0x1dc)](),this[_0x401200(0x216)]['deactivate']());},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x24b)]=function(){const _0x34729e=_0x46f615,_0x39b5e5=this[_0x34729e(0x1f5)]();_0x39b5e5['checkForAutoClassUnlocks'](),this[_0x34729e(0x2a2)][_0x34729e(0x190)](_0x39b5e5),this[_0x34729e(0x216)]['setActor'](_0x39b5e5),this[_0x34729e(0x234)]['setActor'](_0x39b5e5);},Scene_ClassChange['prototype'][_0x46f615(0xfd)]=function(){const _0x330053=_0x46f615;Scene_MenuBase[_0x330053(0x13c)][_0x330053(0xfd)]['call'](this),this[_0x330053(0x24b)](),this['determineActiveWindow']();},Scene_ClassChange['prototype']['onMulticlassOk']=function(){const _0x1bec16=_0x46f615,_0x514f13=this['_classTierWindow'][_0x1bec16(0x292)]();this[_0x1bec16(0x234)][_0x1bec16(0x211)](_0x514f13),this[_0x1bec16(0x234)][_0x1bec16(0x23d)](),this[_0x1bec16(0x234)][_0x1bec16(0x290)](),this[_0x1bec16(0x234)]['forceSelect'](0x0),this['_classTierWindow']['hide'](),this[_0x1bec16(0x216)]['deactivate'](),this[_0x1bec16(0x141)]();},Scene_ClassChange[_0x46f615(0x13c)]['onClassListCancel']=function(){const _0x28ad6f=_0x46f615;this[_0x28ad6f(0x316)]()>0x1?(this['_classTierWindow'][_0x28ad6f(0x23d)](),this[_0x28ad6f(0x216)][_0x28ad6f(0x290)](),this[_0x28ad6f(0x234)][_0x28ad6f(0x1dc)](),this[_0x28ad6f(0x234)][_0x28ad6f(0xd0)](),this[_0x28ad6f(0x2a2)][_0x28ad6f(0x2aa)](null)):this[_0x28ad6f(0x123)]();},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x1c7)]=function(){const _0x3dfad8=_0x46f615,_0xc56459=this[_0x3dfad8(0x234)][_0x3dfad8(0x20a)],_0x2196d9=this[_0x3dfad8(0x234)][_0x3dfad8(0x292)](),_0x92589e=this['_classListWindow']['index'](),_0x1028e3=_0x2196d9?_0x2196d9['id']:0x0;this['_actor'][_0x3dfad8(0x9c)](_0x1028e3,_0xc56459),this[_0x3dfad8(0x216)][_0x3dfad8(0x109)](),this[_0x3dfad8(0x234)][_0x3dfad8(0x109)](),this[_0x3dfad8(0x2a2)][_0x3dfad8(0x2aa)](null),this[_0x3dfad8(0x263)](_0x1028e3,_0xc56459),this[_0x3dfad8(0x16b)]();if(this[_0x3dfad8(0x216)][_0x3dfad8(0xa6)])this[_0x3dfad8(0x216)][_0x3dfad8(0x16e)](_0xc56459-0x1);else this[_0x3dfad8(0x234)][_0x3dfad8(0xa6)]&&this['_classListWindow'][_0x3dfad8(0x16e)](_0x92589e);},Scene_ClassChange['prototype'][_0x46f615(0x263)]=function(_0x281412,_0x27f077){const _0x31b588=_0x46f615,_0x133b6f=this[_0x31b588(0x148)](_0x27f077);this[_0x31b588(0x25e)](_0x281412,_0x27f077,_0x133b6f);},Scene_ClassChange['prototype'][_0x46f615(0x148)]=function(_0x52f8de){const _0x52ed01=_0x46f615,_0x2723d9=new Sprite(),_0x130e41=VisuMZ[_0x52ed01(0x29f)]['Settings']['Window'];if(_0x52f8de<=0x1){const _0x51c6d4=this[_0x52ed01(0x2a2)];_0x2723d9['x']=_0x51c6d4['x']+Math['round'](_0x51c6d4['width']/0x2),_0x2723d9['y']=_0x51c6d4['y']+Math[_0x52ed01(0x25a)](_0x51c6d4['height']/0x2),_0x2723d9['x']+=_0x130e41[_0x52ed01(0x296)]||0x0,_0x2723d9['y']+=_0x130e41[_0x52ed01(0x21e)]||0x0;}else{const _0x42dd8a=this[_0x52ed01(0x216)],_0x656e0=_0x42dd8a[_0x52ed01(0x32f)](_0x42dd8a['index']()),_0x5d55f8=_0x42dd8a[_0x52ed01(0x252)]||0x0;_0x2723d9['x']=_0x42dd8a['x']+_0x656e0['x']+Math[_0x52ed01(0x25a)](_0x656e0['width']/0x2)+_0x5d55f8,_0x2723d9['y']=_0x42dd8a['y']+_0x656e0['y']+Math[_0x52ed01(0x25a)](_0x656e0[_0x52ed01(0x195)]/0x2)+_0x5d55f8,_0x2723d9['x']+=_0x130e41[_0x52ed01(0xe2)]||0x0,_0x2723d9['y']+=_0x130e41[_0x52ed01(0x229)]||0x0;}return _0x2723d9['x']+=this[_0x52ed01(0xda)]['x'],_0x2723d9['y']+=this[_0x52ed01(0xda)]['y'],_0x2723d9;},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x25e)]=function(_0x4d891e,_0x1d4fef,_0x3f1446){const _0x4f43a5=_0x46f615,_0x3c5cfd=this[_0x4f43a5(0xa2)](_0x4d891e),_0x557247=$dataAnimations[_0x3c5cfd];if(!_0x557247)return;const _0x2df492=this[_0x4f43a5(0x97)](_0x557247),_0x2738f2=new(_0x2df492?Sprite_AnimationMV:Sprite_Animation)(),_0x205102=[_0x3f1446],_0x3ca089=0x0;_0x2738f2['setup'](_0x205102,_0x557247,![],_0x3ca089,null),_0x2738f2[_0x4f43a5(0x127)]=_0x1d4fef,this[_0x4f43a5(0x1de)](_0x3f1446),this[_0x4f43a5(0x1de)](_0x2738f2),this[_0x4f43a5(0x32d)]['push'](_0x2738f2);},Scene_ClassChange[_0x46f615(0x99)]=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)]['Window'][_0x46f615(0x18e)]??!![],Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0xa2)]=function(_0x35f0f9){const _0x2cbd3d=_0x46f615,_0x1c1d29=$dataClasses[_0x35f0f9];if(_0x1c1d29){const _0x5c774b=VisuMZ['ClassChangeSystem'][_0x2cbd3d(0xd2)],_0x1f221e=_0x1c1d29['note'];if(_0x1f221e[_0x2cbd3d(0xfc)](_0x5c774b['ClassChangeAnimation']))return Number(RegExp['$1']);}else{if(!Scene_ClassChange['PLAY_ANI_FOR_UNASSIGN'])return 0x0;}return VisuMZ['ClassChangeSystem'][_0x2cbd3d(0xd6)][_0x2cbd3d(0x27a)][_0x2cbd3d(0x1a5)];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x97)]=function(_0x5c830d){return!!_0x5c830d['frames'];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x85)]=function(){const _0x1e7bfd=_0x46f615,_0x41c253=[];for(const _0x5b86c1 of this[_0x1e7bfd(0x32d)]){if(!_0x5b86c1)continue;if(_0x5b86c1[_0x1e7bfd(0x233)]())continue;_0x41c253['push'](_0x5b86c1);}for(const _0x108126 of _0x41c253){if(!_0x108126)continue;for(const _0x275bc1 of _0x108126[_0x1e7bfd(0x80)]){this[_0x1e7bfd(0x246)](_0x275bc1);}this['_animations'][_0x1e7bfd(0x7d)](_0x108126),this['removeChild'](_0x108126);};},Scene_ClassChange['prototype']['forceRemoveClassChangeAnimations']=function(){const _0x30ef38=_0x46f615,_0x20320c=[];for(const _0x38a3ac of this[_0x30ef38(0x32d)]){if(!_0x38a3ac)continue;if(_0x38a3ac['_classChangeTier']<=0x1)continue;_0x20320c['push'](_0x38a3ac);}for(const _0x2ee36a of _0x20320c){if(!_0x2ee36a)continue;for(const _0x3128ed of _0x2ee36a[_0x30ef38(0x80)]){this['removeChild'](_0x3128ed);}this[_0x30ef38(0x32d)][_0x30ef38(0x7d)](_0x2ee36a),this[_0x30ef38(0x246)](_0x2ee36a);};},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x224)]=function(){const _0x155242=_0x46f615;if(!this[_0x155242(0x216)])return![];if(!this['_classTierWindow'][_0x155242(0xa6)])return![];return this[_0x155242(0x216)][_0x155242(0x96)]();},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x19f)]=function(){const _0x1b342b=_0x46f615;if(this[_0x1b342b(0x224)]())return TextManager[_0x1b342b(0x132)](_0x1b342b(0x130));return Scene_MenuBase[_0x1b342b(0x13c)]['buttonAssistKey3']['call'](this);},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x157)]=function(){const _0xcc2d8e=_0x46f615;if(this[_0xcc2d8e(0x224)]())return TextManager['classChange_multiclass_ShiftHelp'];return Scene_MenuBase[_0xcc2d8e(0x13c)]['buttonAssistText3'][_0xcc2d8e(0x115)](this);},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0xe0)]=function(){const _0x17a6c3=_0x46f615;if(this[_0x17a6c3(0x224)]())return this[_0x17a6c3(0x87)][_0x17a6c3(0x32a)]/0x5/-0x3;return Scene_MenuBase['prototype'][_0x17a6c3(0xe0)][_0x17a6c3(0x115)](this);},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x113)]=function(){const _0x1ea9d0=_0x46f615;Scene_MenuBase[_0x1ea9d0(0x13c)][_0x1ea9d0(0x113)]['call'](this),this[_0x1ea9d0(0x299)](this['getBackgroundOpacity']()),this[_0x1ea9d0(0xd5)]();},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x2db)]=function(){const _0x1966ed=_0x46f615;return VisuMZ[_0x1966ed(0x29f)]['Settings'][_0x1966ed(0x288)][_0x1966ed(0x1eb)];},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0xd5)]=function(){const _0x4da84c=_0x46f615,_0xd4f06e=VisuMZ['ClassChangeSystem'][_0x4da84c(0xd6)]['BgSettings'];_0xd4f06e&&(_0xd4f06e[_0x4da84c(0x1da)]!==''||_0xd4f06e[_0x4da84c(0x218)]!=='')&&(this[_0x4da84c(0x98)]=new Sprite(ImageManager[_0x4da84c(0xc7)](_0xd4f06e[_0x4da84c(0x1da)]||'')),this[_0x4da84c(0x2bf)]=new Sprite(ImageManager['loadTitle2'](_0xd4f06e[_0x4da84c(0x218)]||'')),this[_0x4da84c(0x1de)](this[_0x4da84c(0x98)]),this['addChild'](this[_0x4da84c(0x2bf)]),this[_0x4da84c(0x98)][_0x4da84c(0x22d)][_0x4da84c(0x287)](this[_0x4da84c(0x2e8)][_0x4da84c(0x1f8)](this,this[_0x4da84c(0x98)])),this[_0x4da84c(0x2bf)][_0x4da84c(0x22d)][_0x4da84c(0x287)](this[_0x4da84c(0x2e8)][_0x4da84c(0x1f8)](this,this['_backSprite2'])));},Scene_ClassChange[_0x46f615(0x13c)][_0x46f615(0x2e8)]=function(_0x38f6ad){const _0x398e71=_0x46f615;this[_0x398e71(0x165)](_0x38f6ad),this[_0x398e71(0x228)](_0x38f6ad);},Window_Base[_0x46f615(0x2cf)]=VisuMZ['ClassChangeSystem'][_0x46f615(0xd6)]['Window'][_0x46f615(0xf0)]??!![],Window_Base[_0x46f615(0x13c)]['drawClassPoints']=function(_0x152c02,_0x5cffcc,_0x4ef593,_0x578b45,_0x376813){const _0xf401c=_0x46f615;_0x376813=_0x376813||'left';const _0x5cce05=_0xf401c(0x1db)[_0xf401c(0x181)](ImageManager[_0xf401c(0x28e)]),_0x2c7990=TextManager[_0xf401c(0xee)],_0x29ce31=_0x2c7990['format'](_0x152c02,TextManager['classPointsAbbr'],_0x5cce05,TextManager['classPointsFull']),_0x357612=this[_0xf401c(0x28a)](_0x29ce31)[_0xf401c(0x32a)];if(_0x376813===_0xf401c(0x269))_0x5cffcc+=0x0;else _0x376813===_0xf401c(0x1c9)?_0x5cffcc+=Math['round']((_0x578b45-_0x357612)/0x2):_0x5cffcc+=_0x578b45-_0x357612;this['drawTextEx'](_0x29ce31,_0x5cffcc,_0x4ef593);},Window_Base[_0x46f615(0x13c)]['drawActorClassPoints']=function(_0x4b1853,_0x540923,_0x4a4ad5,_0x2a5b1b,_0x3707c9,_0x4239e3){const _0x40d914=_0x46f615,_0xd7afdf=_0x4b1853[_0x40d914(0x7b)](_0x540923);this[_0x40d914(0x2c7)](_0xd7afdf,_0x4a4ad5,_0x2a5b1b,_0x3707c9,_0x4239e3);},Window_Base[_0x46f615(0x13c)][_0x46f615(0x1ef)]=function(_0x349eb9,_0x255147,_0x29d152,_0xf52192,_0x33f2cb){const _0x29af43=_0x46f615;_0x33f2cb=_0x33f2cb||_0x29af43(0x269);const _0x76007=_0x29af43(0x1db)[_0x29af43(0x181)](ImageManager[_0x29af43(0x1d3)]),_0x592a5a=TextManager[_0x29af43(0x2d4)],_0x561cf4=_0x592a5a[_0x29af43(0x181)](_0x349eb9,TextManager[_0x29af43(0x8b)],_0x76007,TextManager['jobPointsFull']),_0x1ebb43=this[_0x29af43(0x28a)](_0x561cf4)[_0x29af43(0x32a)];if(_0x33f2cb==='left')_0x255147+=0x0;else _0x33f2cb==='center'?_0x255147+=Math[_0x29af43(0x25a)]((_0xf52192-_0x1ebb43)/0x2):_0x255147+=_0xf52192-_0x1ebb43;this[_0x29af43(0x31e)](_0x561cf4,_0x255147,_0x29d152);},Window_Base[_0x46f615(0x13c)]['drawActorJobPoints']=function(_0x1ce482,_0x5a2f73,_0x585393,_0x232d83,_0x17191c,_0x5777e6){const _0x288f73=_0x46f615,_0x119629=_0x1ce482[_0x288f73(0x1ac)](_0x5a2f73);this['drawJobPoints'](_0x119629,_0x585393,_0x232d83,_0x17191c,_0x5777e6);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0xcd)]=Window_Base[_0x46f615(0x13c)]['databaseObjectName'],Window_Base[_0x46f615(0x13c)]['databaseObjectName']=function(_0x1ce54a,_0x1d61fc,_0x1377e5){const _0x24a46c=_0x46f615;if(_0x1ce54a===$dataClasses){const _0x1e01d2=_0x1ce54a[_0x1d61fc];let _0x5dfe9a='';if(_0x1e01d2&&_0x1377e5&&_0x1e01d2[_0x24a46c(0x2df)]){const _0x450401=_0x24a46c(0x24c);let _0x113348=_0x1e01d2[_0x24a46c(0x91)];_0x113348=_0x113348['replace'](/\\I\[(\d+)\]/gi,''),_0x5dfe9a=_0x450401['format'](_0x1e01d2['iconIndex'],_0x113348);}else{if(_0x1e01d2){let _0x1e39ad=_0x1e01d2[_0x24a46c(0x91)];_0x1e39ad=_0x1e39ad['replace'](/\\I\[(\d+)\]/gi,''),_0x5dfe9a=_0x1e39ad;}else _0x5dfe9a='';}return this[_0x24a46c(0x23b)]()&&(_0x5dfe9a=this[_0x24a46c(0x15b)](_0x5dfe9a,_0x1ce54a)),_0x5dfe9a;}return VisuMZ[_0x24a46c(0x29f)][_0x24a46c(0xcd)][_0x24a46c(0x115)](this,_0x1ce54a,_0x1d61fc,_0x1377e5);},Window_Base[_0x46f615(0x13c)][_0x46f615(0x330)]=function(_0x5de0d4,_0x5ac62a,_0x2f4c87,_0x15b035){const _0x170c96=_0x46f615;if(!Window_Base[_0x170c96(0x2cf)])return;if(!$dataClasses[_0x5ac62a])return;this[_0x170c96(0x176)]()&&this['drawClassExpGauge'](_0x5de0d4,_0x5ac62a,_0x2f4c87,_0x15b035),this['changeTextColor'](ColorManager[_0x170c96(0x29e)]()),this[_0x170c96(0x242)](TextManager[_0x170c96(0x15d)],_0x2f4c87,_0x15b035,0x30),this[_0x170c96(0x14b)](),this[_0x170c96(0x242)](_0x5de0d4['classLevel'](_0x5ac62a),_0x2f4c87+0x54,_0x15b035,0x24,_0x170c96(0x18c));},Window_Base[_0x46f615(0x13c)][_0x46f615(0x176)]=function(){const _0x2eb63b=_0x46f615;return Imported[_0x2eb63b(0xb0)]&&VisuMZ[_0x2eb63b(0x2cc)]['Settings']['UI'][_0x2eb63b(0x2af)];},Window_Base['prototype']['drawClassExpGauge']=function(_0x24b3de,_0xd7061d,_0x3d3ea7,_0x157e42){const _0x3969a0=_0x46f615;if(!_0x24b3de)return;if(!_0x24b3de[_0x3969a0(0x125)]())return;const _0xbf036a=0x80,_0x43d19f=_0x24b3de[_0x3969a0(0x25c)](_0xd7061d);let _0x531cec=ColorManager[_0x3969a0(0x9f)](),_0x5d5992=ColorManager['expGaugeColor2']();_0x43d19f>=0x1&&(_0x531cec=ColorManager['maxLvGaugeColor1'](),_0x5d5992=ColorManager[_0x3969a0(0x30c)]()),this[_0x3969a0(0x160)](_0x3d3ea7,_0x157e42,_0xbf036a,_0x43d19f,_0x531cec,_0x5d5992);},VisuMZ[_0x46f615(0x29f)][_0x46f615(0x1b4)]=Window_MenuCommand['prototype'][_0x46f615(0x90)],Window_MenuCommand[_0x46f615(0x13c)]['addOriginalCommands']=function(){const _0x29e87e=_0x46f615;VisuMZ[_0x29e87e(0x29f)][_0x29e87e(0x1b4)][_0x29e87e(0x115)](this),this[_0x29e87e(0x10b)]();},Window_MenuCommand[_0x46f615(0x13c)][_0x46f615(0x10b)]=function(){const _0x5dba82=_0x46f615;if(!this[_0x5dba82(0x22b)]())return;if(!this[_0x5dba82(0x29a)]())return;const _0x9b048f=TextManager['classChangeMenuCommand'],_0x148958=this[_0x5dba82(0x237)]();this[_0x5dba82(0x302)](_0x9b048f,_0x5dba82(0x29f),_0x148958);},Window_MenuCommand[_0x46f615(0x13c)]['addClassChangeSystemCommandAutomatically']=function(){const _0x21693d=_0x46f615;return Imported[_0x21693d(0x110)]?![]:!![];},Window_MenuCommand[_0x46f615(0x13c)][_0x46f615(0x29a)]=function(){const _0x2e47dd=_0x46f615;return $gameSystem[_0x2e47dd(0xb5)]();},Window_MenuCommand[_0x46f615(0x13c)][_0x46f615(0x237)]=function(){const _0x5b76d1=_0x46f615;return $gameSystem[_0x5b76d1(0x197)]();};function Window_ClassStatus(){const _0x1a1261=_0x46f615;this[_0x1a1261(0x2d1)](...arguments);}Window_ClassStatus[_0x46f615(0x13c)]=Object[_0x46f615(0x1a3)](Window_StatusBase[_0x46f615(0x13c)]),Window_ClassStatus[_0x46f615(0x13c)]['constructor']=Window_ClassStatus,Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x2d1)]=function(_0x3bd21a){const _0x3ddd67=_0x46f615;Window_StatusBase[_0x3ddd67(0x13c)][_0x3ddd67(0x2d1)][_0x3ddd67(0x115)](this,_0x3bd21a),this[_0x3ddd67(0x114)]=null,this[_0x3ddd67(0x13b)]=null,this[_0x3ddd67(0x109)]();},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x190)]=function(_0x1b0b87){const _0x45313a=_0x46f615;this[_0x45313a(0x114)]!==_0x1b0b87&&(this[_0x45313a(0x114)]=_0x1b0b87,this[_0x45313a(0x109)]());},Window_ClassStatus['prototype'][_0x46f615(0xfb)]=function(){return 0x0;},Window_ClassStatus[_0x46f615(0x13c)]['setTempActor']=function(_0x23d565){const _0x3b046b=_0x46f615;this[_0x3b046b(0x13b)]!==_0x23d565&&(this[_0x3b046b(0x13b)]=_0x23d565,this[_0x3b046b(0x109)]());},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x109)]=function(){const _0x2fb500=_0x46f615;this['hideAdditionalSprites'](),this[_0x2fb500(0x27d)]();if(this[_0x2fb500(0x114)])this[_0x2fb500(0x114)][_0x2fb500(0x109)]();this[_0x2fb500(0x16f)]();},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x16f)]=function(){const _0x273f28=_0x46f615;this[_0x273f28(0x194)]['clear']();if(!this[_0x273f28(0x114)])return;if(this[_0x273f28(0x196)]()){const _0x33f316=ImageManager['loadPicture'](this[_0x273f28(0x114)][_0x273f28(0x2ee)]());_0x33f316['addLoadListener'](this[_0x273f28(0x106)][_0x273f28(0x1f8)](this));}else this[_0x273f28(0x20b)]();},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x196)]=function(){const _0x326a74=_0x46f615;return Imported[_0x326a74(0x110)]&&this['_actor'][_0x326a74(0x2ee)]()!==''&&VisuMZ[_0x326a74(0x29f)]['Settings'][_0x326a74(0x27a)][_0x326a74(0xeb)];},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x106)]=function(){const _0x368933=_0x46f615;VisuMZ[_0x368933(0x29f)][_0x368933(0xd6)][_0x368933(0x27a)]['DrawPortraitJS'][_0x368933(0x115)](this),this[_0x368933(0x1ca)]();},Window_ClassStatus['prototype']['drawItemActorMenuImage']=function(_0x3378f7,_0x15b762,_0x463657,_0x4fe1b0,_0x228a9a){const _0x3e2e4f=_0x46f615,_0x8de6d9=ImageManager[_0x3e2e4f(0x11c)](_0x3378f7[_0x3e2e4f(0x2ee)]()),_0x1e560c=this[_0x3e2e4f(0x2d0)]-_0x8de6d9[_0x3e2e4f(0x32a)];_0x15b762+=_0x1e560c/0x2;if(_0x1e560c<0x0)_0x4fe1b0-=_0x1e560c;Window_StatusBase['prototype'][_0x3e2e4f(0x11b)][_0x3e2e4f(0x115)](this,_0x3378f7,_0x15b762,_0x463657,_0x4fe1b0,_0x228a9a);},Window_ClassStatus[_0x46f615(0x13c)]['refreshNoMenuImage']=function(){const _0x16c960=_0x46f615;VisuMZ['ClassChangeSystem']['Settings']['Window'][_0x16c960(0xe4)][_0x16c960(0x115)](this),this[_0x16c960(0x1ca)]();},Window_ClassStatus[_0x46f615(0x13c)]['drawParameterList']=function(){const _0x1d6c95=_0x46f615;this[_0x1d6c95(0x27d)](),VisuMZ[_0x1d6c95(0x29f)][_0x1d6c95(0xd6)]['Window']['DrawParamJS']['call'](this);},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x142)]=function(){const _0x29720f=_0x46f615;return Imported[_0x29720f(0xb0)]?VisuMZ[_0x29720f(0x2cc)][_0x29720f(0xd6)][_0x29720f(0x1f2)][_0x29720f(0x298)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus[_0x46f615(0x13c)]['paramValueFontSize']=function(){const _0x5ae50c=_0x46f615;return VisuMZ[_0x5ae50c(0x29f)][_0x5ae50c(0xd6)][_0x5ae50c(0x27a)][_0x5ae50c(0x23c)];},Window_ClassStatus['prototype'][_0x46f615(0x1a0)]=function(){const _0x2d4526=_0x46f615;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x2d4526(0x2cc)][_0x2d4526(0xd6)][_0x2d4526(0x1f2)]['DrawIcons'];},Window_ClassStatus['prototype'][_0x46f615(0x1df)]=function(_0x54f5d4,_0x1b9fdd,_0xcdcf0f,_0x3e2882,_0x550cab){const _0x53b20b=_0x46f615;if(Imported[_0x53b20b(0x110)])switch(this[_0x53b20b(0x1c6)]()){case'none':break;case _0x53b20b(0x12d):this[_0x53b20b(0x318)](_0x54f5d4,_0x1b9fdd,_0xcdcf0f,_0x3e2882,_0x550cab);break;case'svbattler':this[_0x53b20b(0x164)](_0x54f5d4,_0x1b9fdd,_0xcdcf0f,_0x3e2882,_0x550cab);break;default:this[_0x53b20b(0x147)](_0x54f5d4,_0x1b9fdd,_0xcdcf0f,_0x3e2882,_0x550cab);break;}else this[_0x53b20b(0x147)](_0x54f5d4,_0x1b9fdd,_0xcdcf0f,_0x3e2882,_0x550cab);},Window_ClassStatus['prototype'][_0x46f615(0x147)]=function(_0x3ad3b5,_0x22677f,_0x7b46f8,_0x2cb216,_0x18876a){const _0x47bcf6=_0x46f615,_0x8a9168=ImageManager['loadFace'](_0x3ad3b5[_0x47bcf6(0xa3)]());_0x8a9168[_0x47bcf6(0x287)](Window_StatusBase[_0x47bcf6(0x13c)]['drawActorFace']['bind'](this,_0x3ad3b5,_0x22677f,_0x7b46f8,_0x2cb216,_0x18876a));},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x318)]=function(_0x854891,_0xa46aac,_0xc64662,_0x1337f5,_0x245e76){const _0x454d35=_0x46f615,_0x60f3f7=ImageManager['loadCharacter'](_0x854891[_0x454d35(0x1ed)]());_0x60f3f7['addLoadListener'](Window_StatusBase['prototype'][_0x454d35(0xff)][_0x454d35(0x1f8)](this,_0x854891,_0xa46aac,_0xc64662,_0x1337f5,_0x245e76));},Window_ClassStatus[_0x46f615(0x13c)]['prepareDrawActorSvBattler']=function(_0x12c24a,_0x464ba8,_0x2f658e,_0x298d95,_0x1498a7){const _0x32cde6=_0x46f615,_0x5f53aa=ImageManager['loadSvActor'](_0x12c24a[_0x32cde6(0x2a4)]());_0x5f53aa[_0x32cde6(0x287)](Window_StatusBase[_0x32cde6(0x13c)][_0x32cde6(0x134)][_0x32cde6(0x1f8)](this,_0x12c24a,_0x464ba8,_0x2f658e,_0x298d95,_0x1498a7));},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0xd4)]=function(_0x2ba4fa,_0x27ee73){const _0x5152d1=_0x46f615,_0x4e4f25=this[_0x5152d1(0x317)]();this[_0x5152d1(0x2b4)](ColorManager[_0x5152d1(0x29e)]());if(Imported[_0x5152d1(0xb0)]){const _0x51921b=VisuMZ['CoreEngine'][_0x5152d1(0xd6)]['UI'][_0x5152d1(0x1d7)];this['drawText'](_0x51921b,_0x2ba4fa,_0x27ee73,_0x4e4f25,'center');}else this[_0x5152d1(0x242)]('→',_0x2ba4fa,_0x27ee73,_0x4e4f25,_0x5152d1(0x1c9));},Window_ClassStatus['prototype']['rightArrowWidth']=function(){return 0x20;},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0xf7)]=function(_0x284d1f,_0x5ccc98,_0x30bbee,_0x4468b3){const _0x38d076=_0x46f615,_0x5c1279=this[_0x38d076(0x1e6)]();Imported['VisuMZ_0_CoreEngine']?this[_0x38d076(0x84)](_0x5ccc98+_0x5c1279,_0x30bbee,_0x4468b3,_0x284d1f,![]):(this[_0x38d076(0x2b4)](ColorManager['systemColor']()),this[_0x38d076(0x242)](TextManager[_0x38d076(0xc6)](_0x284d1f),_0x5ccc98+_0x5c1279,_0x30bbee,_0x4468b3),this[_0x38d076(0x14b)]());},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x2d7)]=function(_0x1f40c2,_0x2608ab,_0x2d70cd,_0x251655){const _0x5e742a=_0x46f615,_0x315a91=this[_0x5e742a(0x1e6)]();let _0x7fd815=0x0;Imported[_0x5e742a(0xb0)]?_0x7fd815=this[_0x5e742a(0x114)]['paramValueByName'](_0x1f40c2,!![]):_0x7fd815=this['_actor'][_0x5e742a(0xc6)](_0x1f40c2);const _0x390e7d=_0x7fd815;this[_0x5e742a(0x242)](_0x7fd815,_0x2608ab,_0x2d70cd,_0x251655-_0x315a91,'right'),this['resetTextColor']();},Window_ClassStatus[_0x46f615(0x13c)][_0x46f615(0x250)]=function(_0x24b352,_0x1c7beb,_0x1d1b1c,_0x40bfe9){const _0x327e96=_0x46f615,_0x57bc53=this['itemPadding']();let _0x1a285c=0x0,_0x380517=0x0,_0x31be28='';if(this[_0x327e96(0x13b)]){Imported[_0x327e96(0xb0)]?(_0x1a285c=this['_actor'][_0x327e96(0x12c)](_0x24b352,![]),_0x380517=this[_0x327e96(0x13b)]['paramValueByName'](_0x24b352,![]),_0x31be28=this[_0x327e96(0x13b)]['paramValueByName'](_0x24b352,!![])):(_0x1a285c=this[_0x327e96(0x114)]['param'](_0x24b352),_0x380517=this['_tempActor'][_0x327e96(0xc6)](_0x24b352),_0x31be28=this[_0x327e96(0x13b)]['param'](_0x24b352));const _0x51f539=_0x1a285c,_0x3b3801=_0x380517;diffValue=_0x3b3801-_0x51f539,this[_0x327e96(0x2b4)](ColorManager['paramchangeTextColor'](diffValue)),this['drawText'](_0x31be28,_0x1c7beb,_0x1d1b1c,_0x40bfe9-_0x57bc53,_0x327e96(0x18c));}this[_0x327e96(0x14b)]();},Window_ClassStatus['prototype'][_0x46f615(0x19e)]=function(_0x39b3c2,_0x153b9c,_0x3127ed,_0x83b43f){const _0x57acc3=_0x46f615,_0x2a24dc=this['itemPadding']();let _0x224cef=0x0,_0x7bb753=0x0,_0x1cd15c=![];if(this[_0x57acc3(0x13b)]){Imported[_0x57acc3(0xb0)]?(_0x224cef=this[_0x57acc3(0x114)][_0x57acc3(0x12c)](_0x39b3c2,![]),_0x7bb753=this['_tempActor'][_0x57acc3(0x12c)](_0x39b3c2,![]),_0x1cd15c=String(this['_actor']['paramValueByName'](_0x39b3c2,!![]))[_0x57acc3(0xfc)](/([%％])/i)):(_0x224cef=this[_0x57acc3(0x114)][_0x57acc3(0xc6)](_0x39b3c2),_0x7bb753=this['_tempActor'][_0x57acc3(0xc6)](_0x39b3c2),_0x1cd15c=_0x224cef%0x1!==0x0||_0x7bb753%0x1!==0x0);const _0x188054=_0x224cef,_0x1f2fef=_0x7bb753,_0x3221ac=_0x1f2fef-_0x188054;let _0x703de=_0x3221ac;if(_0x1cd15c)_0x703de=Math[_0x57acc3(0x25a)](_0x3221ac*0x64)+'%';_0x3221ac!==0x0&&(this[_0x57acc3(0x2b4)](ColorManager[_0x57acc3(0x27e)](_0x3221ac)),_0x703de=(_0x3221ac>0x0?_0x57acc3(0x286):_0x57acc3(0x22f))[_0x57acc3(0x181)](_0x703de),this['drawText'](_0x703de,_0x153b9c+_0x2a24dc,_0x3127ed,_0x83b43f,_0x57acc3(0x269)));}this[_0x57acc3(0x14b)]();},Window_ClassStatus[_0x46f615(0x13c)]['drawItemDarkRect']=function(_0x3f9a89,_0x12e549,_0x197783,_0x4471b9,_0x1653e7){const _0x3c3efb=_0x46f615;if(VisuMZ[_0x3c3efb(0x29f)]['Settings'][_0x3c3efb(0x27a)][_0x3c3efb(0x2cd)]===![])return;_0x1653e7=Math[_0x3c3efb(0x244)](_0x1653e7||0x1,0x1);while(_0x1653e7--){_0x4471b9=_0x4471b9||this[_0x3c3efb(0xc9)](),this[_0x3c3efb(0x194)][_0x3c3efb(0x22a)]=0xa0;const _0x2876ba=ColorManager[_0x3c3efb(0x16d)]();this[_0x3c3efb(0x194)]['fillRect'](_0x3f9a89+0x1,_0x12e549+0x1,_0x197783-0x2,_0x4471b9-0x2,_0x2876ba),this[_0x3c3efb(0x194)][_0x3c3efb(0x22a)]=0xff;}},ColorManager[_0x46f615(0x16d)]=function(){const _0x4db0c2=_0x46f615,_0x360667=VisuMZ['ClassChangeSystem'][_0x4db0c2(0xd6)]['Window'];let _0x48f4bd=_0x360667['BackRectColor']!==undefined?_0x360667[_0x4db0c2(0x259)]:0x13;return ColorManager[_0x4db0c2(0xec)](_0x48f4bd);},Window_ClassStatus['prototype'][_0x46f615(0x81)]=function(_0x3c28a6,_0x53f402,_0x4095bb){const _0x5c1367=_0x46f615,_0x4838fc=VisuMZ[_0x5c1367(0x29f)][_0x5c1367(0xd6)][_0x5c1367(0x27a)]['DisplayedResources'],_0x15e4b4=this[_0x5c1367(0x114)]['currentClass']()['id'];for(const _0x3ca0c5 of _0x4838fc){switch(_0x3ca0c5[_0x5c1367(0x19d)]()[_0x5c1367(0x27b)]()){case'AP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;this[_0x5c1367(0x117)](this[_0x5c1367(0x114)],_0x15e4b4,_0x3c28a6,_0x53f402,_0x4095bb,_0x5c1367(0x18c)),_0x53f402+=this[_0x5c1367(0xc9)]();break;case'CP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;this['drawActorClassPoints'](this[_0x5c1367(0x114)],_0x15e4b4,_0x3c28a6,_0x53f402,_0x4095bb,_0x5c1367(0x18c)),_0x53f402+=this[_0x5c1367(0xc9)]();break;case'JP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;this[_0x5c1367(0x206)](this['_actor'],_0x15e4b4,_0x3c28a6,_0x53f402,_0x4095bb,_0x5c1367(0x18c)),_0x53f402+=this[_0x5c1367(0xc9)]();break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;this[_0x5c1367(0x13f)](this[_0x5c1367(0x114)],_0x15e4b4,_0x3c28a6,_0x53f402,_0x4095bb,'right'),_0x53f402+=this[_0x5c1367(0xc9)]();break;}}};function Window_ClassCommand(){this['initialize'](...arguments);}function _0x16e6(_0x1d12b1,_0x3b754b){const _0x20f01d=_0x20f0();return _0x16e6=function(_0x16e604,_0x351640){_0x16e604=_0x16e604-0x65;let _0x4df169=_0x20f01d[_0x16e604];return _0x4df169;},_0x16e6(_0x1d12b1,_0x3b754b);}Window_ClassCommand[_0x46f615(0x13c)]=Object['create'](Window_Command[_0x46f615(0x13c)]),Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0x136)]=Window_ClassCommand,Window_ClassCommand['prototype'][_0x46f615(0x2d1)]=function(_0x414c18){const _0x5b6212=_0x46f615;Window_Command[_0x5b6212(0x13c)][_0x5b6212(0x2d1)]['call'](this,_0x414c18),this[_0x5b6212(0xef)](),this['deactivate']();},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0x77)]=function(){const _0xbd378a=_0x46f615;return this[_0xbd378a(0xc9)]()*0x3+0x8;},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0x190)]=function(_0x8a2d68){const _0x5790a7=_0x46f615;this[_0x5790a7(0x114)]!==_0x8a2d68&&(this[_0x5790a7(0x114)]=_0x8a2d68,this[_0x5790a7(0x109)]());},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0x109)]=function(){const _0x15a58a=_0x46f615;Window_Command[_0x15a58a(0x13c)]['refresh'][_0x15a58a(0x115)](this),this['refreshCursor']();if(this[_0x15a58a(0xa6)])this[_0x15a58a(0x1a7)]();},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0x1a2)]=function(_0xfea1df,_0x496f63){const _0x1a522f=_0x46f615;_0x496f63=_0x496f63||0x1,this[_0x1a522f(0x2d6)](![]);const _0xac60ef=ColorManager[_0x1a522f(0x2c3)](),_0x205446=ColorManager[_0x1a522f(0x155)](),_0x5ad1dd=_0xfea1df[_0x1a522f(0x32a)]/0x2,_0x2816e0=this['lineHeight']();while(_0x496f63--){this[_0x1a522f(0x194)][_0x1a522f(0x71)](_0xfea1df['x'],_0xfea1df['y'],_0x5ad1dd,_0x2816e0,_0x205446,_0xac60ef),this[_0x1a522f(0x194)][_0x1a522f(0x71)](_0xfea1df['x']+_0x5ad1dd,_0xfea1df['y'],_0x5ad1dd,_0x2816e0,_0xac60ef,_0x205446);}this[_0x1a522f(0x2d6)](!![]);},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0xe1)]=function(_0x1c96f4,_0x28fb73,_0x4c98aa){const _0x5b4b1b=_0x46f615;if(!_0x28fb73)return;const _0x37a5bc=VisuMZ['ClassChangeSystem'][_0x5b4b1b(0xd2)],_0x526844=_0x28fb73[_0x5b4b1b(0x10c)];let _0x55d17c='';if(_0x526844['match'](_0x37a5bc[_0x5b4b1b(0x283)]))_0x55d17c=String(RegExp['$1']);else _0x526844[_0x5b4b1b(0xfc)](_0x37a5bc[_0x5b4b1b(0x2d8)])&&(_0x55d17c=String(RegExp['$1']));if(_0x55d17c){const _0x4a060e=ImageManager[_0x5b4b1b(0x11c)](_0x55d17c);_0x4a060e['addLoadListener'](this[_0x5b4b1b(0x210)][_0x5b4b1b(0x1f8)](this,_0x1c96f4,_0x4a060e));}else this[_0x5b4b1b(0x8e)](_0x28fb73,_0x4c98aa);},Window_ClassCommand['prototype']['drawPicture']=function(_0x431e13,_0x2a918f){const _0x1b625f=_0x46f615,_0x21dcfb=this[_0x1b625f(0x15f)](_0x431e13);let _0x46682b=_0x21dcfb['x']+this['itemPadding'](),_0x491170=_0x21dcfb['y']+0x4,_0x5e772f=_0x21dcfb[_0x1b625f(0x32a)]-this[_0x1b625f(0x1e6)]()*0x2,_0x1df9f0=Math[_0x1b625f(0x221)](this[_0x1b625f(0xc9)]()*0x3,_0x21dcfb[_0x1b625f(0x195)])-0x4,_0x5a6d79=Math[_0x1b625f(0x221)](_0x5e772f,_0x1df9f0);const _0x504aa9=_0x5a6d79/_0x2a918f['width'],_0x12d5a7=_0x5a6d79/_0x2a918f[_0x1b625f(0x195)],_0x54cac3=Math[_0x1b625f(0x221)](_0x504aa9,_0x12d5a7,0x1);let _0x1622dc=Math[_0x1b625f(0x25a)](_0x2a918f['width']*_0x54cac3),_0x5aafae=Math[_0x1b625f(0x25a)](_0x2a918f[_0x1b625f(0x195)]*_0x54cac3);_0x46682b+=Math[_0x1b625f(0x25a)]((_0x5a6d79-_0x1622dc)/0x2),_0x491170+=Math['round']((_0x5a6d79-_0x5aafae)/0x2);const _0x1efb59=_0x2a918f['width'],_0x3c0458=_0x2a918f[_0x1b625f(0x195)];this[_0x1b625f(0x194)][_0x1b625f(0x226)][_0x1b625f(0x2dc)]=!![],this['contents'][_0x1b625f(0x310)](_0x2a918f,0x0,0x0,_0x1efb59,_0x3c0458,_0x46682b,_0x491170,_0x1622dc,_0x5aafae),this['contents'][_0x1b625f(0x226)][_0x1b625f(0x2dc)]=!![];},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0x8e)]=function(_0x352e7c,_0x55370a){const _0x4bf438=_0x46f615;if(!_0x352e7c)return;const _0x19f106=_0x352e7c['iconIndex'];let _0x5746c3=_0x55370a['x']+this[_0x4bf438(0x1e6)](),_0x2d7f10=_0x55370a['y']+0x4,_0x503938=_0x55370a[_0x4bf438(0x32a)]-this[_0x4bf438(0x1e6)]()*0x2,_0x34a1e7=Math[_0x4bf438(0x221)](this[_0x4bf438(0xc9)]()*0x3,_0x55370a[_0x4bf438(0x195)]),_0x3f4f31=Math['min'](_0x503938,_0x34a1e7);_0x3f4f31=Math['floor'](_0x3f4f31/ImageManager[_0x4bf438(0x265)])*ImageManager[_0x4bf438(0x265)],_0x2d7f10+=(_0x34a1e7-_0x3f4f31)/0x2;const _0x209b3a=ImageManager[_0x4bf438(0x198)](_0x4bf438(0x1b0)),_0x53db29=ImageManager[_0x4bf438(0x265)],_0x1f3b16=ImageManager[_0x4bf438(0xce)],_0x3b27d0=_0x19f106%0x10*_0x53db29,_0x1101f5=Math[_0x4bf438(0x14f)](_0x19f106/0x10)*_0x1f3b16;this[_0x4bf438(0x194)][_0x4bf438(0x226)][_0x4bf438(0x2dc)]=![],this[_0x4bf438(0x194)][_0x4bf438(0x310)](_0x209b3a,_0x3b27d0,_0x1101f5,_0x53db29,_0x1f3b16,_0x5746c3,_0x2d7f10,_0x3f4f31,_0x3f4f31),this['contents'][_0x4bf438(0x226)]['imageSmoothingEnabled']=!![];},Window_ClassCommand[_0x46f615(0x13c)][_0x46f615(0xd8)]=function(){const _0x54dec5=_0x46f615;return VisuMZ[_0x54dec5(0x29f)][_0x54dec5(0xd6)]['Window'][_0x54dec5(0x121)]||[];},Window_ClassCommand['prototype'][_0x46f615(0x2f4)]=function(_0x2714c5,_0x266d4e){const _0x2ca1f0=_0x46f615,_0x3ab3f2=this[_0x2ca1f0(0xd8)]();let _0x3ff483=_0x266d4e['y']+this['lineHeight'](),_0x2264d3=0x0;const _0x377574=_0x266d4e[_0x2ca1f0(0x32a)]-this[_0x2ca1f0(0x1e6)]()*0x2;for(const _0x42e697 of _0x3ab3f2){if(_0x2264d3>=0x2)return;switch(_0x42e697){case'AP':if(!Imported[_0x2ca1f0(0x17e)])continue;let _0x17170c=VisuMZ[_0x2ca1f0(0x89)][_0x2ca1f0(0xd6)]['AbilityPoints'];if(!_0x17170c)continue;if(_0x17170c[_0x2ca1f0(0x322)])continue;this[_0x2ca1f0(0x117)](this[_0x2ca1f0(0x114)],_0x2714c5,_0x266d4e['x'],_0x3ff483,_0x377574,_0x2ca1f0(0x18c)),_0x3ff483+=this[_0x2ca1f0(0xc9)](),_0x2264d3++;break;case'CP':if(!Imported[_0x2ca1f0(0x19a)])continue;let _0xf85137=VisuMZ[_0x2ca1f0(0x29f)][_0x2ca1f0(0xd6)][_0x2ca1f0(0xdb)];if(!_0xf85137)continue;if(_0xf85137[_0x2ca1f0(0x322)])continue;this['drawActorClassPoints'](this[_0x2ca1f0(0x114)],_0x2714c5,_0x266d4e['x'],_0x3ff483,_0x377574,_0x2ca1f0(0x18c)),_0x3ff483+=this[_0x2ca1f0(0xc9)](),_0x2264d3++;break;case'JP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;let _0x22770c=VisuMZ[_0x2ca1f0(0x29f)]['Settings'][_0x2ca1f0(0x205)];if(!_0x22770c)continue;if(_0x22770c[_0x2ca1f0(0x322)])continue;this[_0x2ca1f0(0x206)](this[_0x2ca1f0(0x114)],_0x2714c5,_0x266d4e['x'],_0x3ff483,_0x377574,'right'),_0x3ff483+=this[_0x2ca1f0(0xc9)](),_0x2264d3++;break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;let _0x161ff8=VisuMZ[_0x2ca1f0(0x89)][_0x2ca1f0(0xd6)][_0x2ca1f0(0x69)];if(!_0x161ff8)continue;if(_0x161ff8[_0x2ca1f0(0x322)])continue;this[_0x2ca1f0(0x13f)](this[_0x2ca1f0(0x114)],_0x2714c5,_0x266d4e['x'],_0x3ff483,_0x377574,'right'),_0x3ff483+=this[_0x2ca1f0(0xc9)](),_0x2264d3++;break;}}};function Window_ClassTier(){const _0x32de6e=_0x46f615;this[_0x32de6e(0x2d1)](...arguments);}Window_ClassTier[_0x46f615(0x13c)]=Object[_0x46f615(0x1a3)](Window_ClassCommand['prototype']),Window_ClassTier[_0x46f615(0x13c)][_0x46f615(0x136)]=Window_ClassTier,Window_ClassTier['prototype'][_0x46f615(0x2d1)]=function(_0x21b97b){const _0x3662ee=_0x46f615;Window_ClassCommand['prototype'][_0x3662ee(0x2d1)][_0x3662ee(0x115)](this,_0x21b97b);},Window_ClassTier[_0x46f615(0x13c)][_0x46f615(0x1ba)]=function(){const _0x1bd610=_0x46f615;return this[_0x1bd610(0x105)];},Window_ClassTier[_0x46f615(0x13c)][_0x46f615(0x77)]=function(){const _0x4542f2=_0x46f615;let _0x15ce0c=Window_ClassCommand[_0x4542f2(0x13c)][_0x4542f2(0x77)]['call'](this);if(this[_0x4542f2(0x114)]){const _0x19b4a1=this[_0x4542f2(0x114)][_0x4542f2(0x107)]()||0x1;_0x15ce0c=Math[_0x4542f2(0x244)](_0x15ce0c,this[_0x4542f2(0x311)]/_0x19b4a1);}return _0x15ce0c;},Window_ClassTier['prototype']['updateHelp']=function(){const _0x24fbb8=_0x46f615;if(this[_0x24fbb8(0x17c)]){if(this[_0x24fbb8(0x292)]()){const _0x583206=VisuMZ['ClassChangeSystem']['Settings'][_0x24fbb8(0x2b7)];if(!_0x583206)return;const _0x5591d7=_0x583206[this[_0x24fbb8(0x292)]()-0x1];if(!_0x5591d7)return;this[_0x24fbb8(0x17c)][_0x24fbb8(0x2f7)](_0x5591d7['HelpDescription']);}else this['_helpWindow'][_0x24fbb8(0x2f7)]('');}},Window_ClassTier['prototype'][_0x46f615(0x161)]=function(){const _0x39fd90=_0x46f615;if(!this['_actor'])return;const _0x1dbbc7=this['_actor'][_0x39fd90(0x107)](),_0xcf2fd8=VisuMZ[_0x39fd90(0x29f)][_0x39fd90(0xd6)]['Multiclass'];for(let _0x50c79e=0x0;_0x50c79e<_0x1dbbc7;_0x50c79e++){const _0x19f80a=_0xcf2fd8[_0x50c79e];if(!_0x19f80a)continue;const _0x2c360b=_0x19f80a['Name'],_0x6b9bb8=_0x50c79e+0x1,_0x126713=this[_0x39fd90(0x2c0)](_0x6b9bb8);this['addCommand'](_0x2c360b,_0x39fd90(0x95),_0x126713,_0x6b9bb8);}},Window_ClassTier['prototype']['isEnabled']=function(_0x243203){const _0x2de5c8=_0x46f615;if(this[_0x2de5c8(0x114)][_0x2de5c8(0xa4)](_0x243203))return![];return _0x243203>0x0;},Window_ClassTier['prototype']['drawItem']=function(_0x229984){const _0x1e8e77=_0x46f615;if(!this['_actor'])return;const _0x5bb909=this['itemRectWithPadding'](_0x229984),_0x53c7c2=this[_0x1e8e77(0x2ab)][_0x229984][_0x1e8e77(0x253)]||0x1,_0x21a052=this[_0x1e8e77(0x114)][_0x1e8e77(0x2c9)](_0x53c7c2),_0x2284e9=_0x21a052?_0x21a052['id']:0x0,_0x20bbba=VisuMZ[_0x1e8e77(0x29f)][_0x1e8e77(0xd6)][_0x1e8e77(0x2b7)];if(!_0x20bbba)return;const _0x457701=_0x20bbba[_0x53c7c2-0x1];if(!_0x457701)return;let _0x537a5e=_0x5bb909['x'],_0x1a2c5b=_0x5bb909['y'],_0x3b0702=_0x5bb909[_0x1e8e77(0x32a)]-this[_0x1e8e77(0x1e6)]()*0x2,_0x237825=_0x5bb909[_0x1e8e77(0x195)],_0x3c363d=Math[_0x1e8e77(0x221)](_0x3b0702,_0x237825,this[_0x1e8e77(0xc9)]()*0x3);_0x3c363d=Math[_0x1e8e77(0x14f)](_0x3c363d/ImageManager[_0x1e8e77(0x265)])*ImageManager[_0x1e8e77(0x265)],_0x537a5e+=_0x3c363d+this[_0x1e8e77(0x1e6)]()*0x4,this['resetFontSettings'](),this['resetTextColor'](),this[_0x1e8e77(0x1a2)](_0x5bb909),this['changePaintOpacity'](this[_0x1e8e77(0x2c0)](_0x53c7c2)),this[_0x1e8e77(0xe1)](_0x229984,_0x21a052,_0x5bb909),this[_0x1e8e77(0x2b4)](ColorManager[_0x1e8e77(0xec)](_0x457701[_0x1e8e77(0x1fd)])),this[_0x1e8e77(0x242)](_0x457701[_0x1e8e77(0xaa)],_0x5bb909['x'],_0x5bb909['y'],_0x5bb909[_0x1e8e77(0x32a)],_0x1e8e77(0x1c9)),this[_0x1e8e77(0x14b)]();if(!_0x21a052){this[_0x1e8e77(0x2d6)](![]);const _0x3cd87f=Math[_0x1e8e77(0x25a)](_0x5bb909['y']+this[_0x1e8e77(0xc9)]()+(_0x5bb909[_0x1e8e77(0x195)]-this['lineHeight']()*0x2)/0x2);this[_0x1e8e77(0x242)](TextManager[_0x1e8e77(0x256)],_0x5bb909['x'],_0x3cd87f,_0x5bb909['width'],_0x1e8e77(0x1c9));return;}_0x1a2c5b+=this[_0x1e8e77(0xc9)]();let _0x5459ec=_0x21a052[_0x1e8e77(0x91)];_0x5459ec=_0x5459ec[_0x1e8e77(0x2a9)](/\x1I\[(\d+)\]/gi,''),_0x5459ec=_0x5459ec['replace'](/\\I\[(\d+)\]/gi,''),this[_0x1e8e77(0x242)](_0x5459ec,_0x537a5e,_0x1a2c5b,_0x5bb909['width']-_0x537a5e),_0x1a2c5b+=this[_0x1e8e77(0xc9)](),this[_0x1e8e77(0x330)](this[_0x1e8e77(0x114)],_0x2284e9,_0x537a5e,_0x1a2c5b-0x4),_0x1a2c5b+=this['lineHeight'](),this[_0x1e8e77(0x2f4)](_0x2284e9,_0x5bb909),this[_0x1e8e77(0x19b)](_0x2284e9,_0x53c7c2,_0x457701,_0x5bb909);},Window_ClassTier[_0x46f615(0x13c)]['drawExtraContents']=function(){const _0x52bee5=_0x46f615,_0x32d628=VisuMZ[_0x52bee5(0x29f)][_0x52bee5(0xd6)][_0x52bee5(0x27a)][_0x52bee5(0x19c)];if(_0x32d628){_0x32d628[_0x52bee5(0x166)](this,arguments);return;}const _0x42894f=arguments[0x0],_0x37619d=arguments[0x1],_0x3f94ad=arguments[0x2],_0x36069a=arguments[0x3],_0x3b1191=$dataClasses[_0x42894f],_0x47c053=Imported['VisuMZ_1_MessageCore'],_0x40d19d=!![],_0x41d49d=0x16;let _0x4b01f9=_0x36069a['x']+this[_0x52bee5(0x1e6)]()*0x4,_0x13eda2=_0x36069a['y']+this[_0x52bee5(0xc9)]()*3.25,_0x49cbf6=_0x36069a[_0x52bee5(0x32a)]-this[_0x52bee5(0x1e6)]()*0x8;if(_0x3f94ad[_0x52bee5(0x291)]&&_0x13eda2+this[_0x52bee5(0xc9)]()<=_0x36069a['y']+_0x36069a[_0x52bee5(0x195)]){let _0x28cb51=_0x3b1191['traits'][_0x52bee5(0x1ce)](_0xcab15b=>_0xcab15b['code']===Game_BattlerBase[_0x52bee5(0x303)])[_0x52bee5(0x8d)](_0x4883f8=>$dataSystem['skillTypes'][_0x4883f8[_0x52bee5(0x75)]])[_0x52bee5(0x184)](',\x20'),_0x459861=_0x52bee5(0x213)['format'](TextManager[_0x52bee5(0x1a6)],_0x28cb51,_0x41d49d||0x16);if(_0x40d19d)_0x459861=_0x459861[_0x52bee5(0x2a9)](/\\I\[(\d+)\]/gi,'');if(_0x47c053)_0x459861='<WordWrap>'+_0x459861;this['drawTextEx'](_0x459861,_0x4b01f9,_0x13eda2,_0x49cbf6),_0x13eda2+=this['lineHeight']();}if(_0x3f94ad[_0x52bee5(0x17a)]&&_0x13eda2+this['lineHeight']()<=_0x36069a['y']+_0x36069a['height']){let _0x50a669=_0x3b1191[_0x52bee5(0x2a8)][_0x52bee5(0x1ce)](_0x1814ba=>_0x1814ba[_0x52bee5(0x2c1)]===Game_BattlerBase['TRAIT_EQUIP_WTYPE'])['map'](_0x134ab3=>$dataSystem['weaponTypes'][_0x134ab3['dataId']])[_0x52bee5(0x184)](',\x20'),_0x32a375='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x52bee5(0x181)](TextManager[_0x52bee5(0x1c8)],_0x50a669,_0x41d49d||0x16);if(_0x40d19d)_0x32a375=_0x32a375[_0x52bee5(0x2a9)](/\\I\[(\d+)\]/gi,'');if(_0x47c053)_0x32a375=_0x52bee5(0x167)+_0x32a375;this['drawTextEx'](_0x32a375,_0x4b01f9,_0x13eda2,_0x49cbf6),_0x13eda2+=this['lineHeight']();}if(_0x3f94ad[_0x52bee5(0x174)]&&_0x13eda2+this[_0x52bee5(0xc9)]()<=_0x36069a['y']+_0x36069a['height']){let _0x56c85a=_0x3b1191[_0x52bee5(0x2a8)]['filter'](_0x5f1522=>_0x5f1522[_0x52bee5(0x2c1)]===Game_BattlerBase[_0x52bee5(0x26f)])['map'](_0x3d283b=>$dataSystem[_0x52bee5(0xe9)][_0x3d283b['dataId']])[_0x52bee5(0x184)](',\x20'),_0x12564f=_0x52bee5(0x213)[_0x52bee5(0x181)](TextManager[_0x52bee5(0x30b)],_0x56c85a,_0x41d49d||0x16);if(_0x40d19d)_0x12564f=_0x12564f[_0x52bee5(0x2a9)](/\\I\[(\d+)\]/gi,'');if(_0x47c053)_0x12564f=_0x52bee5(0x167)+_0x12564f;this[_0x52bee5(0x31e)](_0x12564f,_0x4b01f9,_0x13eda2,_0x49cbf6),_0x13eda2+=this[_0x52bee5(0xc9)]();}},Window_ClassTier[_0x46f615(0x13c)]['processCursorMove']=function(){const _0x483c5c=_0x46f615;Window_ClassCommand[_0x483c5c(0x13c)][_0x483c5c(0x2a0)][_0x483c5c(0x115)](this),this[_0x483c5c(0x270)]();},Window_ClassTier[_0x46f615(0x13c)][_0x46f615(0x270)]=function(){const _0x35d73b=_0x46f615;if(!this[_0x35d73b(0x96)]())return;if(!this[_0x35d73b(0x114)])return;Input[_0x35d73b(0x170)](_0x35d73b(0x130))&&(this[_0x35d73b(0x114)]&&(this[_0x35d73b(0x326)](this[_0x35d73b(0x257)]())?(this[_0x35d73b(0x1cb)](),this['updateHelp']()):this[_0x35d73b(0x25f)]()));},Window_ClassTier['prototype'][_0x46f615(0x96)]=function(){const _0x14a41e=_0x46f615;if(!this[_0x14a41e(0xa6)])return![];if(!VisuMZ[_0x14a41e(0x29f)][_0x14a41e(0xd6)]['Window'][_0x14a41e(0x23f)])return![];return!![];},Window_ClassTier[_0x46f615(0x13c)][_0x46f615(0x326)]=function(_0x273e5e){const _0x16f6cf=_0x46f615;if(!this[_0x16f6cf(0x114)])return;const _0xd55669=this['index']()+0x1;if(_0xd55669<=0x1)return![];if(this[_0x16f6cf(0x114)][_0x16f6cf(0xa4)](_0xd55669))return![];if(!this[_0x16f6cf(0x114)]['getMulticlassAtTier'](_0xd55669))return![];return!![];;},Window_ClassTier[_0x46f615(0x13c)][_0x46f615(0x1cb)]=function(){const _0x5011d6=_0x46f615;SoundManager[_0x5011d6(0x1e5)](),this[_0x5011d6(0x114)][_0x5011d6(0x9c)](0x0,this[_0x5011d6(0x257)]()+0x1),this[_0x5011d6(0x109)](),SceneManager['_scene'][_0x5011d6(0x2a2)]['refresh']();};function _0x20f0(){const _0x237332=['height','isMainMenuCoreMenuImageOptionAvailable','isMainMenuClassChangeSystemEnabled','loadSystem','checkForNewUnlockedClasses','VisuMZ_2_ClassChangeSystem','drawExtraContents','Window_ClassTier_ExtraJS','toUpperCase','drawUpdatedParamValueDiff','buttonAssistKey3','isUseParamNamesWithIcons','isRecommendedLayout','drawFadedItemBackground','create','General','ConfirmAnimationID','skill','updateHelp','StartingMulticlasses','actorClassFaceName','createClassListWindow','maxLevel','getJobPoints','Game_Party_initialize','multiclass','mhp','IconSet','classPointsAbbr','TargetGainClassPoints','EnableLayout','Window_MenuCommand_addOriginalCommands','_classPoints','_updateClassLearnedSkills','_classId','levelUp','State-%1-%2','isWordWrapEnabled','previousActor','ClassBattlePortrait','skillId','ShowMainMenu','refreshActorPortrait','gainJobPointsForMulticlasses','Game_Actor_faceName','gainSilentTp','getActorClassFaceIndex','actorId','Game_BattlerBase_isEquipWtypeOk','graphicType','onClassListOk','weapon','center','drawParameterList','processShiftRemoveShortcut','addClassChangeTierRestriction','endBattle','filter','earnedClassPoints','expParams','boxWidth','ClassChangeAddRestrictTier','jobPointsIcon','makeRewardsJobPoints','subject','getActorClassCharacterIndex','ParamArrow','ShiftButtonAssistText','BattleManager_displayRewards','BgFilename1','\x5cI[%1]','hide','uiMenuStyle','addChild','drawActorFace','_classLevel','arePageButtonsEnabled','Enemy-%1-%2','getAbilityPoints','SystemShowClassChangeSystemMenu','playClassChange','itemPadding','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_scene','StartingJobPoints','addMulticlassTiers','SnapshotOpacity','mainAreaTop','characterName','ClassUnlockForActor','drawJobPoints','1171580xqPkTT','cancel','Param','AbbrText','actorClassCharacterIndex','actor','uiHelpPosition','status','bind','mpRate','MaxResource','setup','Job','TextColor','ARRAYEVAL','add','textColor','Game_Actor_releaseUnequippableItems','isUseSkillsStatesCoreUpdatedLayout','isEquipAtypeOk','currentClassLevelExp','JobPoints','drawActorJobPoints','XParamRates','displayRewards','classPointsTotal','_tier','refreshNoMenuImage','FUNC','PerLevelUp','setClassPoints','gainStartingClassPoints','drawPicture','setTier','process_VisuMZ_ClassChangeSystem_Notetags','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','_unlockedClasses','push','_classTierWindow','ClassUnlockRemoveActor','BgFilename2','NUM','RestrictClassChangeTier','learnSkill','VocabUnassignClass','PerAction','ConfirmAniPrimaryOffsetY','759798ifDKni','getActorClassFaceName','min','ChangeAdjusHpMp','Game_Actor_battlerName','buttonAssistSlotWindowShift','ClassPointsLose','_context','parse','centerSprite','ConfirmAniSubclassOffsetY','paintOpacity','addClassChangeSystemCommandAutomatically','Game_BattlerBase_addedSkills','bitmap','ClassCharaName','(%1)','enabled','createClassTierWindow','Game_BattlerBase_elementRate','isPlaying','_classListWindow','Game_Actor_characterName','_commandWindow','isClassChangeCommandEnabled','characterIndex','classListWindowRect','jobPointsVisible','isAutoColorAffected','ParamValueFontSize','show','Armor-%1-%2','ShiftShortcutKey','ARRAYFUNC','Icon','drawText','_highestTier','max','commandPersonal','removeChild','Game_BattlerBase_sparam','classTierWindowRect','AllowSameSubclassSelect','multiclasses','refreshActor','\x1bi[%1]%2','Game_Battler_onBattleStart','Game_Actor_faceIndex','gainRewardsClassPoints','drawUpdatedAfterParamValue','exit','padding','ext','isBattleMember','ClassPointsFlat','classChange_multiclass_noClass','index','Limit','BackRectColor','round','onDatabaseLoaded','classExpRate','gainRewardsJobPoints','createClassChangeAnimation','playBuzzerSound','pow','ClassPointsPlus','MulticlassRaiseLimit','startClassChangeAnimation','2122368uKrshd','iconWidth','ClassDescription','reduce','makeRewards','left','ClassPointsRate','learnings','update','elementRate','ClassBattlerName','TRAIT_EQUIP_ATYPE','checkShiftRemoveShortcut','attackStates','multiclassId','Game_Actor_setup','nextActor','ClassPointsAdd','finalExpRate','registerCommand','DebuffRates','Game_BattlerBase_attackStates','Window','trim','StateResistance','resetFontSettings','paramchangeTextColor','return\x200','setStatusWindow','createCommandWindow','paramBase','classPicture','ClassPointsGain','playStaticSe','(+%1)','addLoadListener','BgSettings','item','textSizeEx','423531umuQXX','JobPointsGain','Weapon-%1-%2','classPointsIcon','debuffRate','activate','AddedStypes','currentExt','AlwaysUnlocked','initClassChangeUnlocks','Game_Actor_setBattlePortrait','ConfirmAniPrimaryOffsetX','AttackStates','ExtDisplayedParams','setBackgroundOpacity','isClassChangeCommandVisible','EnemyJobPoints','actorClassBattlerName','Actor-%1-%2','systemColor','ClassChangeSystem','processCursorMove','indexOf','_statusWindow','SParamRates','battlerName','StartClassClassPoints','ClassFaceName','setJobPoints','traits','replace','setTempActor','_list','initJobPoints','Show','classIcon','LvExpGauge','createStatusWindow','jobPointsFull','112dhZYDe','ParamRates','changeTextColor','forceSelect','members','Multiclass','process_VisuMZ_ClassChangeSystem','Actor-%1-Class-%2','addedSkillTypes','actorClassCharacterName','statusWindowRect','AttackElements','changeClass','_backSprite2','isEnabled','code','Game_BattlerBase_debuffRate','dimColor1','changeExp','Enable','Game_Actor_setFaceImage','drawClassPoints','findMulticlassTier','getMulticlassAtTier','classDescription','BattleCore','CoreEngine','DrawBackRect','_rewards','CLASS_CHANGE_SHOW_CLASS_LEVEL','innerWidth','initialize','actorClassFaceIndex','Points','jobPointsFmt','pagedown','changePaintOpacity','drawUpdatedBeforeParamValue','bigPicture','isRightInputMode','earnedJobPoints','getBackgroundOpacity','imageSmoothingEnabled','StartingClassTier','StartingClassPoints','iconIndex','ParseActorNotetags','getUnlockedClasses','removeUnlockedClass','gainMulticlassRewardPoints','currentClass','pageup','ActorUnlockedClasses','Scene_Menu_createCommandWindow','adjustSprite','getClassIdWithName','StartClassJobPoints','functionName','classPointsRate','ClassChangeRemoveRestrictTier','getMenuImage','loseJobPoints','ChangeClassSound','onBattleStart','releaseUnequippableItems','loseMulticlassTiers','drawClassResources','clamp','uiInputPosition','setText','Game_BattlerBase_paramRate','onMulticlassOk','updateClassLevel','nextClassLevelExp','JSON','onPersonalOk','applyMulticlassObjects','setupClassChangeSystem','_ClassChangeSystem_MainMenu','applyItemUserEffect','addCommand','TRAIT_STYPE_ADD','updateClassLearnedSkills','JobPointsSet','_priorityCharacterIndex','_classChangeTierRestrictions','isClassAutoUnlockRequirementsMet','170KqqGkF','Game_Actor_changeClass','armor','maxLvGaugeColor2','UserGainClassPoints','Parse_ClassIcons','BattleManager_makeRewards','blt','innerHeight','129636bslaTk','maintainLevels','registerActorClassImages','setBattlePortrait','highestTier','rightArrowWidth','prepareDrawActorSprite','classChange','ClassIcon','BattleManager_endBattle','applyJobPoints','Game_Action_applyItemUserEffect','drawTextEx','applyClassPoints','classLevel','JobPointsFlat','SharedResource','Tier','476tgfbfR','Game_BattlerBase_stateRate','canShiftRemoveClass','3687096hxesuk','Game_BattlerBase_isEquipAtypeOk','Game_Actor_getBattlePortraitFilename','width','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addedSkills','_animations','_cache','itemRect','drawClassLevel','Game_Actor_characterIndex','_priorityFaceIndex','_exp','Class','AliveActors','CLASS_CHANGE_ADJUST_HP_MP','shown','SkillPoints','Game_Actor_getMenuImage','allMembers','changeClassExp','Game_BattlerBase_addedSkillTypes','getActorClassBattlerName','isAlive','params','gradientFillRect','gainMulticlassExp','getActorUnlockedClasses','FullText','dataId','setMainMenuClassChangeSystemEnabled','itemHeight','ShowVictory','ClassUnlockForGlobal','callUpdateHelp','getClassPoints','Game_Actor_equips','remove','classChangeMenuCommand','Parse_Notetags_Basic','_targets','drawActorResources','TargetGainJobPoints','maxTp','drawParamText','updateClassChangeAnimations','setBackgroundType','_buttonAssistWindow','displayRewardsClassPoints','SkillLearnSystem','paramRate','jobPointsAbbr','SystemEnableClassChangeSystemMenu','map','drawBigItemIcon','_multiclasses','addOriginalCommands','name','_jobPoints','attackStatesRate','MulticlassChangeActorClass','tier','isShiftRemoveShortcutEnabled','isMVAnimation','_backSprite1','PLAY_ANI_FOR_UNASSIGN','applyClassChangeSystemUserEffect','getClassChangeTiersOnly','changeMulticlass','classLevelUp','_earnedClassPoints','expGaugeColor1','classAdjustHpMp','gainJobPoints','getClassChangeAnimationID','faceName','isClassChangeTierRestricted','ParseAllNotetags','active','setFaceImage','checkMulticlasses','levelUpGainClassPoints','Name','JobPointsRate','optExtraExp','ElementRates','EVAL','stateResistSet','VisuMZ_0_CoreEngine','AddedSkills','checkForAutoClassUnlocks','classPoints','_classIDs','isMainMenuClassChangeSystemVisible','ClassMenuPortrait','_multiclassCheck','makeRewardsClassPoints','jobPoints','isBottomHelpMode','newPage','Window_ClassList_RectJS','setHandler','MainMenu','HelpDescription','addJobPoints','Window_ClassStatus_BgType','test','jobPointsRate','classChange_multiclass_remove_help','makeDeepCopy','param','loadTitle1','ParseClassNotetags','lineHeight','Classes','actorClassMenuPortrait','_priorityBattlerName','Window_Base_databaseObjectName','iconHeight','recoverAll','deactivate','tradeItemWithParty','RegExp','sparam','drawRightArrow','createCustomBackgroundImages','Settings','ClassUnlockRemoveGlobal','visibleResources','STR','_windowLayer','ClassPoints','ClassPointsSet','getActorClassBattlePortrait','ClassID','setMainMenuClassChangeSystemVisible','buttonAssistOffset3','drawBigItemImage','ConfirmAniSubclassOffsetX','stateRate','DrawFaceJS','Scene_Menu_onPersonalOk','_priorityFaceName','UserGainJobPoints','Skill-%1-%2','armorTypes','Game_BattlerBase_attackStatesRate','MenuPortraits','getColor','gainClassPoints','classPointsFmt','deselect','ShowClassLevel','_priorityMenuImage','57498RGcLcP','antiEquipsCacheClear_BattleCore_ClassChangeSystem','isPlaytest','updatedLayoutStyle','VictoryText','drawUpdatedParamName','currentSymbol','mainAreaHeight','gain%1Points','colSpacing','match','onActorChange','classChange_multiclass_ShiftHelp','drawItemActorSprite','#%1','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','TierOnlyClass','playOkSound','Window_ClassList_BgType','_wordWrap','onMenuImageLoad','totalMulticlass','setHelpWindow','refresh','initMulticlass','addClassChangeSystemCommand','note','Window_ClassTier_RectJS','level','Game_Battler_gainSilentTp','VisuMZ_1_MainMenuCore','Game_Actor_tradeItemWithParty','Actors','createBackground','_actor','call','_ClassChangeSystem_preventLevelUpGain','drawActorAbilityPoints','onClassListCancel','setBattlerImage','gainStartingJobPoints','drawItemActorMenuImage','loadPicture','addClassPoints','classPointsVisible','ALLOW_SELECT_SAME_SUBCLASS','updateStatusWindow','DisplayedResources','applyItemClassChangeSystemUserEffect','popScene','ConvertParams','isActor','attackElements','_classChangeTier','STRUCT','getActorClassMenuPortrait','_multiclassTiers','createKeyJS','paramValueByName','sprite','deadMembers','PerEnemy','shift','Game_Actor_setCharacterImage','getInputButtonString','classChange_multiclass_remove','drawItemActorSvBattler','levelUpGainJobPoints','constructor','unlockClass','jobPointsTotal','isEquipWtypeOk','setMulticlassTiers','_tempActor','prototype','ARRAYJSON','Scene_Boot_onDatabaseLoaded','drawActorSkillPoints','sort','forceRemoveClassChangeAnimations','actorParams','\x5cI[%1]%2','Game_BattlerBase_attackElements','setMp','Game_Actor_levelUp','prepareDrawActorFace','createAnimationDummySprite','StateRates','TextCodeClassNames','resetTextColor','initClassPoints','traitObjects','setMenuImage','floor','initClassChangeRestrictions','getBattlePortraitFilename','equips','Game_Actor_traitObjects','version','dimColor2','concat','buttonAssistText3','includes','createHelpWindow','highestMulticlassTier','applyDatabaseAutoColor','drawItem','levelA','displayRewardsJobPoints','itemRectWithPadding','drawGauge','makeCommandList','Game_BattlerBase_xparam','getMulticlasses','prepareDrawActorSvBattler','scaleSprite','apply','<WordWrap>','gainExp','Game_Actor_setMenuImage','loseClassPoints','determineActiveWindow','TextFmt','getClassChangeBackColor2','smoothSelect','prepareRefreshItemsEquipsCoreLayout','isTriggered','getActorClassCharacterName','MAX_SAFE_INTEGER','expRate','EquipArmors','inBattle','isClassExpGaugeDrawn','gainClassPointsForMulticlasses','split','isLearnedSkill','EquipWeapons','actorClassBattlePortrait','_helpWindow','setCharacterImage','VisuMZ_2_SkillLearnSystem','faceIndex','LayoutStyle','format','MaintainLevels','description','join','JobPointsLose','Game_Actor_setBattlerImage','naturalUnlockClass','UnassignHelpDescription','log','JobPointsPlus','expForClassLevel','right','_priorityCharacterName','AllowClearClassAni','length','setActor','initClassChangeSystemMainMenu','addWindow','_earnedJobPoints','contents'];_0x20f0=function(){return _0x237332;};return _0x20f0();}function Window_ClassList(){const _0x55427f=_0x46f615;this[_0x55427f(0x2d1)](...arguments);}Window_ClassList[_0x46f615(0x13c)]=Object[_0x46f615(0x1a3)](Window_ClassCommand[_0x46f615(0x13c)]),Window_ClassList['prototype'][_0x46f615(0x136)]=Window_ClassList,Window_ClassList['prototype'][_0x46f615(0x2d1)]=function(_0x20cc12){const _0x20de34=_0x46f615;this[_0x20de34(0x20a)]=0x1,Window_ClassCommand[_0x20de34(0x13c)]['initialize'][_0x20de34(0x115)](this,_0x20cc12);},Window_ClassList[_0x46f615(0x13c)][_0x46f615(0x103)]=function(){const _0x2f7c27=_0x46f615;SoundManager[_0x2f7c27(0x1e5)]();},Window_ClassList[_0x46f615(0x13c)][_0x46f615(0x280)]=function(_0x30186a){const _0x5595ee=_0x46f615;this[_0x5595ee(0x2a2)]=_0x30186a,this[_0x5595ee(0x7a)]();},Window_ClassList[_0x46f615(0x13c)]['updateHelp']=function(){const _0x588c55=_0x46f615;this[_0x588c55(0x17c)]&&(this[_0x588c55(0x292)]()?this[_0x588c55(0x17c)]['setItem'](this[_0x588c55(0x292)]()):this['_helpWindow']['setText'](TextManager['classChange_multiclass_remove_help'])),this[_0x588c55(0x114)]&&this[_0x588c55(0x2a2)]&&this['updateStatusWindow']();},Window_ClassList['prototype'][_0x46f615(0x120)]=function(){const _0x2bf6be=_0x46f615,_0x49bbc7=this[_0x2bf6be(0x292)](),_0xda6e99=JsonEx[_0x2bf6be(0xc5)](this[_0x2bf6be(0x114)]);_0xda6e99['_tempActor']=!![],_0x49bbc7!==this[_0x2bf6be(0x114)]['currentClass']()&&(_0x49bbc7?_0xda6e99[_0x2bf6be(0x9c)](_0x49bbc7['id'],this[_0x2bf6be(0x20a)]):_0xda6e99['changeMulticlass'](0x0,this[_0x2bf6be(0x20a)])),this[_0x2bf6be(0x2a2)][_0x2bf6be(0x2aa)](_0xda6e99);},Window_ClassList[_0x46f615(0x13c)][_0x46f615(0x211)]=function(_0x21ef39){const _0x4e4d1c=_0x46f615;this[_0x4e4d1c(0x20a)]!==_0x21ef39&&(this[_0x4e4d1c(0x20a)]=_0x21ef39,this[_0x4e4d1c(0x109)]());},Window_ClassList[_0x46f615(0x13c)][_0x46f615(0x161)]=function(){const _0x476a12=_0x46f615;if(!this['_actor'])return;if(this[_0x476a12(0x20a)]<=0x0)return;const _0x1b9e14=DataManager[_0x476a12(0x73)](this[_0x476a12(0x114)]);for(const _0x4959f5 of _0x1b9e14){if(!_0x4959f5)continue;let _0x55b967=_0x4959f5[_0x476a12(0x91)];_0x55b967=_0x55b967[_0x476a12(0x2a9)](/\x1I\[(\d+)\]/gi,''),_0x55b967=_0x55b967[_0x476a12(0x2a9)](/\\I\[(\d+)\]/gi,'');const _0x5d8518=this[_0x476a12(0x2c0)](_0x4959f5);this[_0x476a12(0x302)](_0x55b967,_0x476a12(0x319),_0x5d8518,_0x4959f5);}this[_0x476a12(0x20a)]>0x1&&this[_0x476a12(0x302)]('','classChange',!![],null);},Window_ClassList['ALLOW_SELECT_SAME_SUBCLASS']=VisuMZ[_0x46f615(0x29f)][_0x46f615(0xd6)][_0x46f615(0x1a4)][_0x46f615(0x249)]??!![],Window_ClassList[_0x46f615(0x13c)][_0x46f615(0x2c0)]=function(_0x1a164e){const _0x4b913d=_0x46f615;if(this[_0x4b913d(0x114)][_0x4b913d(0xa4)](this['_tier']))return![];if(this['_tier']>0x1&&_0x1a164e===this[_0x4b913d(0x114)][_0x4b913d(0x2e4)]())return![];if(_0x1a164e){const _0x18ac86=this[_0x4b913d(0x114)][_0x4b913d(0x2c8)](_0x1a164e['id']);if(_0x18ac86>0x0&&this[_0x4b913d(0x114)][_0x4b913d(0xa4)](_0x18ac86))return![];const _0x1c1855=DataManager[_0x4b913d(0x9b)](_0x1a164e);if(!_0x1c1855[_0x4b913d(0x158)](this['_tier']))return![];if(!Window_ClassList[_0x4b913d(0x11f)]){const _0x3d3081=this[_0x4b913d(0x114)]['getMulticlassAtTier'](this['_tier']);if(_0x3d3081===_0x1a164e)return![];}}return this[_0x4b913d(0x20a)]>0x0;},Window_ClassList[_0x46f615(0x13c)][_0x46f615(0x15c)]=function(_0x4d4e3c){const _0x5965a8=_0x46f615;if(!this[_0x5965a8(0x114)])return;const _0x49ec86=this[_0x5965a8(0x15f)](_0x4d4e3c),_0x18d5e9=this[_0x5965a8(0x20a)],_0x49f50d=this[_0x5965a8(0x2ab)][_0x4d4e3c][_0x5965a8(0x253)],_0x5cca89=_0x49f50d?_0x49f50d['id']:0x0,_0x53d8e7=VisuMZ[_0x5965a8(0x29f)]['Settings'][_0x5965a8(0x2b7)];if(!_0x53d8e7)return;const _0x313b87=_0x53d8e7[_0x18d5e9-0x1];if(!_0x313b87)return;let _0x58dea5=_0x49ec86['x'],_0xe68c6=_0x49ec86['y'],_0x53f75b=_0x49ec86[_0x5965a8(0x32a)]-this[_0x5965a8(0x1e6)]()*0x2,_0xea3173=_0x49ec86['height'],_0x37ef40=Math[_0x5965a8(0x221)](_0x53f75b,_0xea3173,this[_0x5965a8(0xc9)]()*0x3);_0x37ef40=Math[_0x5965a8(0x14f)](_0x37ef40/ImageManager[_0x5965a8(0x265)])*ImageManager[_0x5965a8(0x265)],_0x58dea5+=_0x37ef40+this[_0x5965a8(0x1e6)]()*0x4,this[_0x5965a8(0x27d)](),this[_0x5965a8(0x14b)](),this[_0x5965a8(0x1a2)](_0x49ec86),this[_0x5965a8(0x2d6)](this[_0x5965a8(0x2c0)](_0x49f50d));if(!_0x49f50d){this[_0x5965a8(0x2d6)](![]);const _0x15e0e7=Math[_0x5965a8(0x25a)](_0x49ec86['y']+this[_0x5965a8(0xc9)]()+(_0x49ec86[_0x5965a8(0x195)]-this[_0x5965a8(0xc9)]()*0x2)/0x2);this[_0x5965a8(0x242)](TextManager['classChange_multiclass_remove'],_0x49ec86['x'],_0x15e0e7,_0x49ec86[_0x5965a8(0x32a)],_0x5965a8(0x1c9));return;}this[_0x5965a8(0xe1)](_0x4d4e3c,_0x49f50d,_0x49ec86);const _0x12e24c=this[_0x5965a8(0x114)]['findMulticlassTier'](_0x5cca89);if(_0x12e24c>0x0){const _0x1b625=_0x53d8e7[_0x12e24c-0x1];_0x1b625&&(this[_0x5965a8(0x2b4)](ColorManager[_0x5965a8(0xec)](_0x1b625['TextColor'])),this[_0x5965a8(0x242)](_0x1b625['Name'],_0x49ec86['x'],_0x49ec86['y'],_0x49ec86[_0x5965a8(0x32a)],_0x5965a8(0x1c9)),this[_0x5965a8(0x14b)]());}this['changePaintOpacity'](this[_0x5965a8(0x2c0)](_0x49f50d)),_0xe68c6+=this[_0x5965a8(0xc9)]();let _0x580ab3=_0x49f50d[_0x5965a8(0x91)];_0x580ab3=_0x580ab3['replace'](/\x1I\[(\d+)\]/gi,''),_0x580ab3=_0x580ab3[_0x5965a8(0x2a9)](/\\I\[(\d+)\]/gi,''),this[_0x5965a8(0x242)](_0x580ab3,_0x58dea5,_0xe68c6,_0x49ec86[_0x5965a8(0x32a)]-_0x58dea5),_0xe68c6+=this[_0x5965a8(0xc9)](),this[_0x5965a8(0x330)](this['_actor'],_0x5cca89,_0x58dea5,_0xe68c6-0x4),_0xe68c6+=this[_0x5965a8(0xc9)](),this[_0x5965a8(0x2f4)](_0x5cca89,_0x49ec86);};