//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
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
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.17: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where TP was not properly preserved. Fix made by Arisu.
 * 
 * Version 1.16: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.15: August 29, 2024
 * * Feature Update!
 * ** Added failsafes for Bad JavaScript TP Formulas to prevent them from
 *    becoming NaN values, undefined values, or null values. Bad values will
 *    default to 0 and an error message will appear telling which actor, mode,
 *    and key's formula has bad code. Update made by Arisu.
 * 
 * Version 1.14: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the icon of the TP Modes command in the Skill Scene
 *    would still appear even if command types are set to text only through the
 *    VisuStella MZ Skills & States Core plugin. Fixed by Olivia.
 * 
 * Version 1.13: September 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: August 18, 2022
 * * Feature Update!
 * ** Regenerate TP functions no longer occur outside of battle. Update made
 *    by Olivia.
 * 
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
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
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

const _0x23fe64=_0x4cbc;(function(_0x1d7625,_0x5464ee){const _0x4911d6=_0x4cbc,_0x20863e=_0x1d7625();while(!![]){try{const _0x10e801=-parseInt(_0x4911d6(0x1fb))/0x1*(parseInt(_0x4911d6(0x15a))/0x2)+-parseInt(_0x4911d6(0x175))/0x3*(-parseInt(_0x4911d6(0x15d))/0x4)+-parseInt(_0x4911d6(0xed))/0x5*(parseInt(_0x4911d6(0x1db))/0x6)+parseInt(_0x4911d6(0x113))/0x7+parseInt(_0x4911d6(0x1f3))/0x8+-parseInt(_0x4911d6(0x1d9))/0x9+parseInt(_0x4911d6(0x16e))/0xa*(parseInt(_0x4911d6(0x190))/0xb);if(_0x10e801===_0x5464ee)break;else _0x20863e['push'](_0x20863e['shift']());}catch(_0x127b7f){_0x20863e['push'](_0x20863e['shift']());}}}(_0x585e,0xd366d));var label=_0x23fe64(0x100),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x23fe64(0x1f4)](function(_0x428b92){const _0x2e692d=_0x23fe64;return _0x428b92[_0x2e692d(0x164)]&&_0x428b92[_0x2e692d(0x127)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x23fe64(0x17e)]||{},VisuMZ['ConvertParams']=function(_0x238a4b,_0x463731){const _0x43dcdd=_0x23fe64;for(const _0x65d1b6 in _0x463731){if(_0x65d1b6['match'](/(.*):(.*)/i)){const _0x1562d0=String(RegExp['$1']),_0x41f013=String(RegExp['$2'])[_0x43dcdd(0xd9)]()[_0x43dcdd(0x1e0)]();let _0x25f0d8,_0x413815,_0x128591;switch(_0x41f013){case _0x43dcdd(0x116):_0x25f0d8=_0x463731[_0x65d1b6]!==''?Number(_0x463731[_0x65d1b6]):0x0;break;case _0x43dcdd(0x11e):_0x413815=_0x463731[_0x65d1b6]!==''?JSON[_0x43dcdd(0x114)](_0x463731[_0x65d1b6]):[],_0x25f0d8=_0x413815[_0x43dcdd(0x1ed)](_0x2551e7=>Number(_0x2551e7));break;case _0x43dcdd(0x1b1):_0x25f0d8=_0x463731[_0x65d1b6]!==''?eval(_0x463731[_0x65d1b6]):null;break;case _0x43dcdd(0x12b):_0x413815=_0x463731[_0x65d1b6]!==''?JSON[_0x43dcdd(0x114)](_0x463731[_0x65d1b6]):[],_0x25f0d8=_0x413815[_0x43dcdd(0x1ed)](_0x42475f=>eval(_0x42475f));break;case _0x43dcdd(0x1cf):_0x25f0d8=_0x463731[_0x65d1b6]!==''?JSON['parse'](_0x463731[_0x65d1b6]):'';break;case _0x43dcdd(0x205):_0x413815=_0x463731[_0x65d1b6]!==''?JSON[_0x43dcdd(0x114)](_0x463731[_0x65d1b6]):[],_0x25f0d8=_0x413815[_0x43dcdd(0x1ed)](_0x5f9ecb=>JSON['parse'](_0x5f9ecb));break;case _0x43dcdd(0x1a1):_0x25f0d8=_0x463731[_0x65d1b6]!==''?new Function(JSON['parse'](_0x463731[_0x65d1b6])):new Function('return\x200');break;case _0x43dcdd(0x157):_0x413815=_0x463731[_0x65d1b6]!==''?JSON[_0x43dcdd(0x114)](_0x463731[_0x65d1b6]):[],_0x25f0d8=_0x413815[_0x43dcdd(0x1ed)](_0x414bf8=>new Function(JSON[_0x43dcdd(0x114)](_0x414bf8)));break;case _0x43dcdd(0x1a2):_0x25f0d8=_0x463731[_0x65d1b6]!==''?String(_0x463731[_0x65d1b6]):'';break;case _0x43dcdd(0x12e):_0x413815=_0x463731[_0x65d1b6]!==''?JSON[_0x43dcdd(0x114)](_0x463731[_0x65d1b6]):[],_0x25f0d8=_0x413815[_0x43dcdd(0x1ed)](_0xae3ceb=>String(_0xae3ceb));break;case _0x43dcdd(0x115):_0x128591=_0x463731[_0x65d1b6]!==''?JSON['parse'](_0x463731[_0x65d1b6]):{},_0x25f0d8=VisuMZ[_0x43dcdd(0x17f)]({},_0x128591);break;case _0x43dcdd(0xf5):_0x413815=_0x463731[_0x65d1b6]!==''?JSON[_0x43dcdd(0x114)](_0x463731[_0x65d1b6]):[],_0x25f0d8=_0x413815['map'](_0x4ffe18=>VisuMZ[_0x43dcdd(0x17f)]({},JSON[_0x43dcdd(0x114)](_0x4ffe18)));break;default:continue;}_0x238a4b[_0x1562d0]=_0x25f0d8;}}return _0x238a4b;},(_0x2557d4=>{const _0x228cd7=_0x23fe64,_0x13f289=_0x2557d4[_0x228cd7(0x120)];for(const _0x51cf2b of dependencies){if(!Imported[_0x51cf2b]){alert(_0x228cd7(0x10c)[_0x228cd7(0xe9)](_0x13f289,_0x51cf2b)),SceneManager[_0x228cd7(0x17c)]();break;}}const _0x4214fe=_0x2557d4[_0x228cd7(0x127)];if(_0x4214fe[_0x228cd7(0x188)](/\[Version[ ](.*?)\]/i)){const _0x101b96=Number(RegExp['$1']);_0x101b96!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x13f289,_0x101b96)),SceneManager[_0x228cd7(0x17c)]());}if(_0x4214fe[_0x228cd7(0x188)](/\[Tier[ ](\d+)\]/i)){const _0xbcc1b5=Number(RegExp['$1']);_0xbcc1b5<tier?(alert(_0x228cd7(0x135)[_0x228cd7(0xe9)](_0x13f289,_0xbcc1b5,tier)),SceneManager[_0x228cd7(0x17c)]()):tier=Math[_0x228cd7(0x220)](_0xbcc1b5,tier);}VisuMZ[_0x228cd7(0x17f)](VisuMZ[label][_0x228cd7(0x17e)],_0x2557d4[_0x228cd7(0x1a9)]);})(pluginData),PluginManager[_0x23fe64(0x1ea)](pluginData['name'],_0x23fe64(0x16b),_0x16961c=>{const _0x6d297d=_0x23fe64;VisuMZ[_0x6d297d(0x17f)](_0x16961c,_0x16961c);const _0x180ddf=_0x16961c[_0x6d297d(0x209)][_0x6d297d(0x1ed)](_0x5c2057=>$gameActors['actor'](_0x5c2057))[_0x6d297d(0x131)](null),_0x48301e=_0x16961c[_0x6d297d(0x103)];for(const _0x4f8d3a of _0x180ddf){if(!_0x4f8d3a)continue;_0x4f8d3a[_0x6d297d(0x10e)](_0x48301e);}}),PluginManager[_0x23fe64(0x1ea)](pluginData['name'],'ActorUnlockTPMode',_0x57e969=>{const _0x3e5b25=_0x23fe64;VisuMZ['ConvertParams'](_0x57e969,_0x57e969);const _0x342a99=_0x57e969[_0x3e5b25(0x209)]['map'](_0x103e8f=>$gameActors[_0x3e5b25(0x137)](_0x103e8f))[_0x3e5b25(0x131)](null),_0x56c42=_0x57e969['TPModes'];for(const _0x14e5cc of _0x342a99){if(!_0x14e5cc)continue;for(const _0x436ca6 of _0x56c42){_0x14e5cc['learnTpMode'](_0x436ca6);}}}),PluginManager[_0x23fe64(0x1ea)](pluginData[_0x23fe64(0x120)],'ActorUnlockAllTPModes',_0x1d1fa3=>{const _0x4ec293=_0x23fe64;VisuMZ['ConvertParams'](_0x1d1fa3,_0x1d1fa3);const _0x42bf00=_0x1d1fa3['Actors'][_0x4ec293(0x1ed)](_0x36e19b=>$gameActors[_0x4ec293(0x137)](_0x36e19b))[_0x4ec293(0x131)](null),_0x1d30a9=VisuMZ[_0x4ec293(0x100)][_0x4ec293(0x193)];for(const _0x131cae of _0x42bf00){if(!_0x131cae)continue;for(const _0x461272 of _0x1d30a9){_0x131cae['learnTpMode'](_0x461272);}}}),PluginManager[_0x23fe64(0x1ea)](pluginData[_0x23fe64(0x120)],'EnemyChangeTPMode',_0x3ef5a6=>{const _0x33feac=_0x23fe64;VisuMZ[_0x33feac(0x17f)](_0x3ef5a6,_0x3ef5a6);const _0x4cdad9=_0x3ef5a6[_0x33feac(0x109)][_0x33feac(0x1ed)](_0x412dfd=>$gameTroop[_0x33feac(0x1ba)]()[_0x412dfd])[_0x33feac(0x131)](null),_0x12c080=_0x3ef5a6[_0x33feac(0x103)];for(const _0x214a6c of _0x4cdad9){if(!_0x214a6c)continue;_0x214a6c[_0x33feac(0x10e)](_0x12c080);}}),PluginManager[_0x23fe64(0x1ea)](pluginData['name'],_0x23fe64(0x1df),_0x473569=>{const _0x5ad4f9=_0x23fe64;VisuMZ['ConvertParams'](_0x473569,_0x473569),$gameSystem['setTpModeInSceneSkill'](_0x473569[_0x5ad4f9(0x1f5)]);}),VisuMZ['EnhancedTP'][_0x23fe64(0xf1)]=Scene_Boot[_0x23fe64(0x17a)][_0x23fe64(0x126)],Scene_Boot['prototype'][_0x23fe64(0x126)]=function(){const _0xe25c98=_0x23fe64;VisuMZ[_0xe25c98(0x100)]['Scene_Boot_onDatabaseLoaded'][_0xe25c98(0x1c7)](this),this['process_VisuMZ_EnhancedTP_Settings']();},Scene_Boot['prototype'][_0x23fe64(0x1e9)]=function(){const _0x6a4c52=_0x23fe64;VisuMZ[_0x6a4c52(0x100)][_0x6a4c52(0x21a)]={},VisuMZ[_0x6a4c52(0x100)]['TpModeOrder']=[];for(const _0x21667f of VisuMZ['EnhancedTP'][_0x6a4c52(0x17e)][_0x6a4c52(0x12a)]){if(!_0x21667f)continue;_0x21667f['description']=_0x21667f[_0x6a4c52(0x1a3)]['format'](TextManager['tp']),this[_0x6a4c52(0x20c)](_0x21667f);const _0x30a3a3=_0x21667f['Name'][_0x6a4c52(0xd9)]()[_0x6a4c52(0x1e0)]();VisuMZ[_0x6a4c52(0x100)][_0x6a4c52(0x21a)][_0x30a3a3]=_0x21667f,VisuMZ['EnhancedTP'][_0x6a4c52(0x193)][_0x6a4c52(0x11c)](_0x30a3a3);}},Scene_Boot[_0x23fe64(0x17a)]['convertEnhancedTpFunctions']=function(_0x588f93){const _0x1c364e=_0x23fe64,_0x5f1739=[_0x1c364e(0xdd),_0x1c364e(0x1b0),_0x1c364e(0x1b9),_0x1c364e(0x1bd),_0x1c364e(0x185),_0x1c364e(0x147),'TpRegen','CriticalHp',_0x1c364e(0x122),'CriticalMp',_0x1c364e(0x204),'OnlyMember',_0x1c364e(0x1c8),'DealHpDmg',_0x1c364e(0x186),_0x1c364e(0x15e),'DealHpHeal',_0x1c364e(0x199),_0x1c364e(0x117),_0x1c364e(0x151),'AllyMpDmg',_0x1c364e(0x1f2),'DealMpHeal','AllyMpHeal',_0x1c364e(0x12f),_0x1c364e(0xf4),_0x1c364e(0x171),'GainEnemyBuff','DealAllyDebuff',_0x1c364e(0x160),_0x1c364e(0x212),_0x1c364e(0x174),'DealAllyState','DealEnemyState',_0x1c364e(0x107),_0x1c364e(0x15c),'KillAlly',_0x1c364e(0x1ec),_0x1c364e(0x16f),'FleeBattle',_0x1c364e(0x16d)];for(const _0x2fac26 of _0x5f1739){const _0x1fe7ba=_0x1c364e(0x133)[_0x1c364e(0xe9)](_0x588f93[_0x2fac26]);_0x588f93['%1Func'['format'](_0x2fac26)]=new Function(_0x1c364e(0x18a),_0x1c364e(0xec),_0x1c364e(0x208),_0x1fe7ba);}},TextManager[_0x23fe64(0x222)]=VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x17e)][_0x23fe64(0x1da)][_0x23fe64(0x153)],ColorManager[_0x23fe64(0x20f)]=function(_0x1bc6e8){const _0x25ed9a=_0x23fe64;return _0x1bc6e8=String(_0x1bc6e8),_0x1bc6e8['match'](/#(.*)/i)?'#%1'[_0x25ed9a(0xe9)](String(RegExp['$1'])):this[_0x25ed9a(0x1ae)](Number(_0x1bc6e8));},ImageManager[_0x23fe64(0x1d7)]=VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x17e)][_0x23fe64(0x1da)][_0x23fe64(0x16c)],VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x15f)]=BattleManager[_0x23fe64(0x1cc)],BattleManager[_0x23fe64(0x1cc)]=function(){const _0x420d76=_0x23fe64;VisuMZ[_0x420d76(0x100)][_0x420d76(0x15f)]['call'](this),$gameParty[_0x420d76(0x20a)](_0x420d76(0x16f),$gameParty[_0x420d76(0x150)](),0x0);},VisuMZ['EnhancedTP'][_0x23fe64(0x1eb)]=BattleManager[_0x23fe64(0x1a8)],BattleManager['onEscapeSuccess']=function(){const _0x45618f=_0x23fe64;VisuMZ[_0x45618f(0x100)]['BattleManager_onEscapeSuccess']['call'](this),$gameParty[_0x45618f(0x20a)](_0x45618f(0x118),$gameParty['leader'](),0x0);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1e8)]=BattleManager[_0x23fe64(0x20e)],BattleManager[_0x23fe64(0x20e)]=function(){const _0x6bbc21=_0x23fe64;VisuMZ['EnhancedTP'][_0x6bbc21(0x1e8)][_0x6bbc21(0x1c7)](this),$gameParty['gainTpFromTpMode'](_0x6bbc21(0x16d),$gameParty['leader'](),0x0);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x112)]=Game_System['prototype'][_0x23fe64(0x191)],Game_System[_0x23fe64(0x17a)][_0x23fe64(0x191)]=function(){const _0x3f58e=_0x23fe64;VisuMZ[_0x3f58e(0x100)][_0x3f58e(0x112)][_0x3f58e(0x1c7)](this),this['initEnhancedTP']();},Game_System['prototype'][_0x23fe64(0x206)]=function(){const _0x45486d=_0x23fe64;this[_0x45486d(0xe2)]=VisuMZ[_0x45486d(0x100)]['Settings'][_0x45486d(0x1da)]['ShowTpMode'];},Game_System[_0x23fe64(0x17a)][_0x23fe64(0x134)]=function(){const _0x30c36e=_0x23fe64;if(this[_0x30c36e(0xe2)]===undefined)this[_0x30c36e(0x206)]();return this[_0x30c36e(0xe2)];},Game_System[_0x23fe64(0x17a)][_0x23fe64(0x121)]=function(_0x2a28a6){const _0xa5eca2=_0x23fe64;if(this[_0xa5eca2(0xe2)]===undefined)this[_0xa5eca2(0x206)]();this[_0xa5eca2(0xe2)]=_0x2a28a6;},VisuMZ['EnhancedTP'][_0x23fe64(0x130)]=Game_Action[_0x23fe64(0x17a)]['apply'],Game_Action[_0x23fe64(0x17a)][_0x23fe64(0xf0)]=function(_0x574a35){const _0x45dc12=_0x23fe64;VisuMZ[_0x45dc12(0x100)][_0x45dc12(0x130)][_0x45dc12(0x1c7)](this,_0x574a35),this[_0x45dc12(0x203)](_0x574a35);},Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x203)]=function(_0x671d44){const _0x481353=_0x23fe64,_0x29470e=_0x671d44[_0x481353(0x139)]();_0x29470e['critical']&&this[_0x481353(0x168)]()['gainTpFromTpMode'](_0x481353(0x1b9),_0x671d44,0x0),(_0x29470e[_0x481353(0x19c)]||_0x29470e[_0x481353(0x1af)])&&_0x671d44[_0x481353(0x20a)](_0x481353(0x1bd),_0x671d44,0x0);},VisuMZ['EnhancedTP'][_0x23fe64(0x213)]=Game_Action['prototype']['executeHpDamage'],Game_Action['prototype'][_0x23fe64(0x163)]=function(_0x5ddcbc,_0x2a0836){const _0x3a4de1=_0x23fe64;VisuMZ[_0x3a4de1(0x100)]['Game_Action_executeHpDamage'][_0x3a4de1(0x1c7)](this,_0x5ddcbc,_0x2a0836);const _0x1f26e1=this[_0x3a4de1(0x168)]();_0x2a0836>0x0?(_0x5ddcbc[_0x3a4de1(0x20a)]('TakeHpDmg',_0x5ddcbc,_0x2a0836),_0x1f26e1[_0x3a4de1(0x20a)](_0x3a4de1(0x1b3),_0x5ddcbc,_0x2a0836),_0x5ddcbc[_0x3a4de1(0x184)]()[_0x3a4de1(0x20a)]('AllyHpDmg',_0x5ddcbc,_0x2a0836)):(_0x2a0836=Math[_0x3a4de1(0x195)](_0x2a0836),_0x5ddcbc['gainTpFromTpMode'](_0x3a4de1(0x15e),_0x5ddcbc,_0x2a0836),_0x1f26e1[_0x3a4de1(0x20a)](_0x3a4de1(0x1c3),_0x5ddcbc,_0x2a0836),_0x5ddcbc['friendsUnit']()[_0x3a4de1(0x20a)](_0x3a4de1(0x199),_0x5ddcbc,_0x2a0836));},VisuMZ['EnhancedTP'][_0x23fe64(0x1b8)]=Game_Action['prototype']['executeMpDamage'],Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x1c2)]=function(_0x580795,_0x981405){const _0x591326=_0x23fe64;VisuMZ[_0x591326(0x100)][_0x591326(0x1b8)]['call'](this,_0x580795,_0x981405);const _0x43ceed=this[_0x591326(0x168)]();_0x981405>0x0?(_0x580795['gainTpFromTpMode'](_0x591326(0x117),_0x580795,_0x981405),_0x43ceed[_0x591326(0x20a)](_0x591326(0x151),_0x580795,_0x981405),_0x580795[_0x591326(0x184)]()[_0x591326(0x20a)]('AllyMpDmg',_0x580795,_0x981405)):(_0x981405=Math[_0x591326(0x195)](_0x981405),_0x580795[_0x591326(0x20a)]('TakeMpHeal',_0x580795,_0x981405),_0x43ceed['gainTpFromTpMode'](_0x591326(0x183),_0x580795,_0x981405),_0x580795[_0x591326(0x184)]()[_0x591326(0x20a)]('AllyMpHeal',_0x580795,_0x981405));},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x201)]=Game_Action['prototype'][_0x23fe64(0x14f)],Game_Action[_0x23fe64(0x17a)]['itemEffectAddBuff']=function(_0x5540c3,_0x512ad8){const _0x1d1b2c=_0x23fe64;VisuMZ[_0x1d1b2c(0x100)]['Game_Action_itemEffectAddBuff'][_0x1d1b2c(0x1c7)](this,_0x5540c3,_0x512ad8);if(!_0x5540c3['result']()['success'])return;const _0x1c8457=this['subject']();_0x1c8457[_0x1d1b2c(0x1f9)]()===_0x5540c3['isActor']()?(_0x1c8457[_0x1d1b2c(0x20a)](_0x1d1b2c(0x12f),_0x5540c3,0x0),_0x5540c3[_0x1d1b2c(0x20a)](_0x1d1b2c(0x171),_0x5540c3,0x0)):(_0x1c8457[_0x1d1b2c(0x20a)](_0x1d1b2c(0xf4),_0x5540c3,0x0),_0x5540c3['gainTpFromTpMode']('GainEnemyBuff',_0x5540c3,0x0));},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x18c)]=Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x1fa)],Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x1fa)]=function(_0x35558a,_0x114992){const _0x70f38b=_0x23fe64;VisuMZ[_0x70f38b(0x100)][_0x70f38b(0x18c)]['call'](this,_0x35558a,_0x114992);if(!_0x35558a[_0x70f38b(0x139)]()[_0x70f38b(0x10a)])return;const _0x54c5a6=this[_0x70f38b(0x168)]();_0x54c5a6[_0x70f38b(0x1f9)]()===_0x35558a[_0x70f38b(0x1f9)]()?(_0x54c5a6[_0x70f38b(0x20a)]('DealAllyDebuff',_0x35558a,0x0),_0x35558a[_0x70f38b(0x20a)]('GainAllyDebuff',_0x35558a,0x0)):(_0x54c5a6['gainTpFromTpMode'](_0x70f38b(0x160),_0x35558a,0x0),_0x35558a[_0x70f38b(0x20a)](_0x70f38b(0x174),_0x35558a,0x0));},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x144)]=Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x1cb)],Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x1cb)]=function(_0x5a36bc,_0xa7f812){const _0x2182b1=_0x23fe64,_0x41fb7d=_0x5a36bc[_0x2182b1(0x139)]()['success'];_0x5a36bc[_0x2182b1(0x139)]()[_0x2182b1(0x10a)]=![],VisuMZ[_0x2182b1(0x100)][_0x2182b1(0x144)][_0x2182b1(0x1c7)](this,_0x5a36bc,_0xa7f812);if(!_0x5a36bc[_0x2182b1(0x139)]()['success']){_0x5a36bc[_0x2182b1(0x139)]()[_0x2182b1(0x10a)]=_0x41fb7d;return;}const _0x52f08f=this[_0x2182b1(0x168)]();_0x52f08f[_0x2182b1(0x1f9)]()===_0x5a36bc['isActor']()?(_0x52f08f[_0x2182b1(0x20a)](_0x2182b1(0x1ef),_0x5a36bc,0x0),_0x5a36bc[_0x2182b1(0x20a)](_0x2182b1(0x107),_0x5a36bc,0x0)):(_0x52f08f[_0x2182b1(0x20a)](_0x2182b1(0x1ce),_0x5a36bc,0x0),_0x5a36bc[_0x2182b1(0x20a)](_0x2182b1(0x15c),_0x5a36bc,0x0));},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x152)]=Game_Action['prototype'][_0x23fe64(0x142)],Game_Action['prototype'][_0x23fe64(0x142)]=function(_0x4017e5){const _0x3fc446=_0x23fe64;VisuMZ[_0x3fc446(0x100)]['Game_Action_applyItemUserEffect'][_0x3fc446(0x1c7)](this,_0x4017e5),this[_0x3fc446(0x129)](_0x4017e5);},Game_Action['prototype']['applyItemEnhancedTPEffect']=function(_0x39cb19){const _0x4eb3e5=_0x23fe64;if(!_0x39cb19)return;const _0x24e62b=this[_0x4eb3e5(0x13d)]()[_0x4eb3e5(0x20b)],_0x10a7c4=this[_0x4eb3e5(0x168)]();_0x24e62b[_0x4eb3e5(0x188)](/<CHANGE TARGET TP MODE: (.*)>/i)&&_0x39cb19['changeTpMode'](String(RegExp['$1']));if(!_0x39cb19[_0x4eb3e5(0x1f9)]())return;const _0x26c0a2=_0x24e62b['match'](/<UNLOCK TP MODE: (.*)>/gi);if(_0x26c0a2)for(const _0x1f27b8 of _0x26c0a2){_0x1f27b8[_0x4eb3e5(0x188)](/<UNLOCK TP MODE: (.*)>/i),_0x39cb19['learnTpMode'](String(RegExp['$1']));}if(_0x24e62b['match'](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0xcf3750=String(RegExp['$1'])[_0x4eb3e5(0x217)](/[\r\n]+/);for(const _0x8a040d of _0xcf3750){_0x39cb19['learnTpMode'](_0x8a040d);}}},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1e4)]=Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x161)],Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x161)]=function(){const _0x45de60=_0x23fe64;VisuMZ['EnhancedTP'][_0x45de60(0x1e4)]['call'](this),this[_0x45de60(0x155)]();},Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x155)]=function(){const _0xda1394=_0x23fe64,_0x4c9480=this['item']()['note'],_0x161218=this[_0xda1394(0x168)]();_0x4c9480['match'](/<CHANGE USER TP MODE: (.*)>/i)&&_0x161218[_0xda1394(0x10e)](String(RegExp['$1']));},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1a5)]=Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x211)],Game_Action[_0x23fe64(0x17a)][_0x23fe64(0x211)]=function(_0x2ebe57){const _0x35c0dd=_0x23fe64;if(this[_0x35c0dd(0xfd)](_0x2ebe57))return!![];return VisuMZ[_0x35c0dd(0x100)][_0x35c0dd(0x1a5)][_0x35c0dd(0x1c7)](this,_0x2ebe57);},Game_Action[_0x23fe64(0x17a)][_0x23fe64(0xfd)]=function(_0x17efe3){const _0x26d0cf=_0x23fe64;if(!this[_0x26d0cf(0x13d)]())return![];const _0x15b15f=this['item']()[_0x26d0cf(0x20b)],_0x1046f7=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x24691e of _0x1046f7){if(_0x15b15f[_0x26d0cf(0x188)](_0x24691e))return!![];}return![];},Game_BattlerBase['prototype'][_0x23fe64(0x206)]=function(){const _0x3896b6=_0x23fe64;this[_0x3896b6(0x10e)](this[_0x3896b6(0x169)]());},Game_BattlerBase['prototype']['changeTpMode']=function(_0x2ff687){const _0x162228=_0x23fe64;_0x2ff687=_0x2ff687[_0x162228(0xd9)]()[_0x162228(0x1e0)]();if(!VisuMZ[_0x162228(0x100)][_0x162228(0x21a)][_0x2ff687])return;this[_0x162228(0x140)]=_0x2ff687,this[_0x162228(0x14d)](_0x2ff687);},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x169)]=function(){const _0x29e6ae=_0x23fe64;return VisuMZ[_0x29e6ae(0x100)]['Settings'][_0x29e6ae(0x1da)][_0x29e6ae(0x1d8)][_0x29e6ae(0xd9)]()[_0x29e6ae(0x1e0)]();},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x106)]=function(){const _0x534c88=_0x23fe64;if(this[_0x534c88(0x140)]===undefined)this['initEnhancedTP']();let _0x1f00b0=this[_0x534c88(0x140)];for(const _0x5458fa of this[_0x534c88(0x1a4)]()){if(!_0x5458fa)continue;if(_0x5458fa['note'][_0x534c88(0x188)](/<FORCE TP MODE: (.*)>/i)){const _0x580c5d=String(RegExp['$1'])[_0x534c88(0xd9)]()['trim']();if(!VisuMZ[_0x534c88(0x100)][_0x534c88(0x21a)][_0x580c5d])continue;_0x1f00b0=_0x580c5d;break;}}return VisuMZ[_0x534c88(0x100)][_0x534c88(0x21a)][_0x1f00b0[_0x534c88(0xd9)]()[_0x534c88(0x1e0)]()];},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x197)]=function(_0x43516f,_0x11c2a9,_0x4bb12e){const _0x1c9947=_0x23fe64,_0x593549=this['tpMode']();if(!_0x593549)return 0x0;_0x43516f=_0x1c9947(0x1f8)[_0x1c9947(0xe9)](_0x43516f);if(!_0x593549[_0x43516f])return 0x0;try{let _0x1823db=_0x593549[_0x43516f](this,_0x11c2a9,_0x4bb12e);if(isNaN(_0x1823db)||_0x1823db===undefined||_0x1823db===null){if($gameTemp[_0x1c9947(0x1ee)]()){const _0x318345=_0x11c2a9[_0x1c9947(0x140)]||_0x1c9947(0x1d0);console[_0x1c9947(0x180)]('ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3'[_0x1c9947(0xe9)](_0x11c2a9['name'](),_0x318345,_0x43516f));}_0x1823db=0x0;}return _0x1823db;}catch(_0x3acfd8){if($gameTemp[_0x1c9947(0x1ee)]()){const _0x566ad8=_0x11c2a9['_tpMode']||_0x1c9947(0x1d0);console[_0x1c9947(0x180)](_0x1c9947(0x10d)[_0x1c9947(0xe9)](_0x11c2a9[_0x1c9947(0x120)](),_0x566ad8,_0x43516f));}return 0x0;}},VisuMZ['EnhancedTP']['Game_Battler_gainSilentTp']=Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x192)],Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x192)]=function(_0x331cbd){const _0x561e22=_0x23fe64;this[_0x561e22(0xe8)]?this[_0x561e22(0x1b6)]=(this[_0x561e22(0x1b6)]+_0x331cbd)['clamp'](0x0,this['maxTp']()):VisuMZ[_0x561e22(0x100)]['Game_Battler_gainSilentTp'][_0x561e22(0x1c7)](this,_0x331cbd);},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x20a)]=function(_0x3003df,_0x2665ac,_0x587d33){const _0x3a71cf=_0x23fe64,_0x56ff8e=Math[_0x3a71cf(0x11d)](this[_0x3a71cf(0x197)](_0x3003df,_0x2665ac,_0x587d33));this[_0x3a71cf(0x192)](_0x56ff8e);},VisuMZ['EnhancedTP'][_0x23fe64(0x136)]=Game_BattlerBase['prototype'][_0x23fe64(0x1f0)],Game_BattlerBase['prototype']['maxTp']=function(){const _0x5a9a07=_0x23fe64;if(this[_0x5a9a07(0x106)]())return Math[_0x5a9a07(0x11d)](this[_0x5a9a07(0x106)]()['MaxFormulaFunc'](this,this,0x0));return VisuMZ[_0x5a9a07(0x100)][_0x5a9a07(0x136)]['call'](this);},VisuMZ['EnhancedTP'][_0x23fe64(0xfb)]=Game_BattlerBase['prototype'][_0x23fe64(0x16a)],Game_BattlerBase[_0x23fe64(0x17a)]['isPreserveTp']=function(){const _0x71ce0e=_0x23fe64;if(!$gameParty['inBattle']())return!![];if(this[_0x71ce0e(0x106)]())return this['tpMode']()['Preserve'];return VisuMZ['EnhancedTP'][_0x71ce0e(0xfb)][_0x71ce0e(0x1c7)](this);},VisuMZ[_0x23fe64(0x100)]['Game_Actor_isPreserveTp']=Game_Actor['prototype'][_0x23fe64(0x16a)],Game_Actor[_0x23fe64(0x17a)]['isPreserveTp']=function(){const _0x1a7f83=_0x23fe64;if(!$gameParty[_0x1a7f83(0x1e3)]())return!![];if(this[_0x1a7f83(0x106)]())return this[_0x1a7f83(0x106)]()[_0x1a7f83(0x148)];return VisuMZ[_0x1a7f83(0x100)]['Game_Actor_isPreserveTp'][_0x1a7f83(0x1c7)](this);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1c9)]=Game_Unit[_0x23fe64(0x17a)]['onBattleStart'],Game_Unit[_0x23fe64(0x17a)]['onBattleStart']=function(_0x57aa13){const _0x1d42a2=_0x23fe64;this[_0x1d42a2(0x219)]=!![],VisuMZ[_0x1d42a2(0x100)][_0x1d42a2(0x1c9)][_0x1d42a2(0x1c7)](this,_0x57aa13);},VisuMZ['EnhancedTP']['Game_Unit_onBattleEnd']=Game_Unit[_0x23fe64(0x17a)][_0x23fe64(0xe1)],Game_Unit[_0x23fe64(0x17a)][_0x23fe64(0xe1)]=function(){const _0x556a1c=_0x23fe64;if(this===$gameParty)for(const _0x57ab0c of this[_0x556a1c(0x1ba)]()){if(!_0x57ab0c)continue;if(_0x57ab0c[_0x556a1c(0x16a)]())continue;_0x57ab0c[_0x556a1c(0xee)]();}VisuMZ[_0x556a1c(0x100)][_0x556a1c(0x1b5)]['call'](this);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1bc)]=Game_BattlerBase['prototype'][_0x23fe64(0xfa)],Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0xfa)]=function(_0x50ad3e){const _0x434300=_0x23fe64;let _0x2dde52=VisuMZ['EnhancedTP'][_0x434300(0x1bc)][_0x434300(0x1c7)](this,_0x50ad3e);return _0x50ad3e===0x5&&this[_0x434300(0x106)]()&&(_0x2dde52*=this[_0x434300(0x106)]()['MultiplierTCR']),_0x2dde52;},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x11a)]=function(){const _0x5a4592=_0x23fe64;if(!Imported[_0x5a4592(0x178)])return![];const _0x3ae6b2=this[_0x5a4592(0x106)]();if(!_0x3ae6b2)return![];if(!_0x3ae6b2[_0x5a4592(0x13e)])return![];const _0x27693f=_0x3ae6b2['FlashRequirement']||0x0;return this['tpRate']()>=_0x27693f;},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x19b)]=function(){const _0x423735=_0x23fe64,_0x1b950b=this[_0x423735(0x106)]();if(!_0x1b950b)return![];return(_0x1b950b[_0x423735(0x1e6)]||0x1)['clamp'](0x1,0xff);},Game_BattlerBase[_0x23fe64(0x17a)][_0x23fe64(0x1d5)]=function(){const _0x4b6ee7=_0x23fe64,_0x2086f1=this['tpMode']();if(!_0x2086f1)return![];return(_0x2086f1['FlashLightness']||0x0)[_0x4b6ee7(0x101)](0x0,0xff);},Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x1dc)]=function(){},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x13f)]=Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x17b)],Game_Battler['prototype'][_0x23fe64(0x17b)]=function(_0x23af18){const _0x26db79=_0x23fe64;VisuMZ[_0x26db79(0x100)][_0x26db79(0x13f)][_0x26db79(0x1c7)](this,_0x23af18),this[_0x26db79(0x20a)](_0x26db79(0x1b0),this,0x0);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0xdb)]=Game_Battler[_0x23fe64(0x17a)]['useItem'],Game_Battler['prototype']['useItem']=function(_0x2260b9){const _0x28fd51=_0x23fe64;VisuMZ['EnhancedTP'][_0x28fd51(0xdb)][_0x28fd51(0x1c7)](this,_0x2260b9),this[_0x28fd51(0x11b)](_0x2260b9)&&this[_0x28fd51(0x20a)](_0x28fd51(0x147),this,0x0),DataManager[_0x28fd51(0xf2)](_0x2260b9)&&this[_0x28fd51(0x20a)](_0x28fd51(0x185),this,0x0);},Game_Battler['prototype'][_0x23fe64(0x11b)]=function(_0x25f185){const _0x384266=_0x23fe64;if(!_0x25f185)return![];if(!DataManager[_0x384266(0x1f1)](_0x25f185))return![];if(_0x25f185['id']===this[_0x384266(0x194)]())return![];if(_0x25f185['id']===this[_0x384266(0x202)]())return![];return!![];},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x215)]=Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x1c5)],Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x1c5)]=function(){const _0x1d0bde=_0x23fe64;if(!$gameParty[_0x1d0bde(0x1e3)]())return![];;this['_regeneratingTp']=!![];const _0x29745c=Math['floor'](this['maxTp']()*this[_0x1d0bde(0xda)]);this[_0x1d0bde(0x192)](_0x29745c),this[_0x1d0bde(0x20a)](_0x1d0bde(0x18b),this,0x0),this[_0x1d0bde(0x179)]<this[_0x1d0bde(0xf8)]/0x4&&this['gainTpFromTpMode'](_0x1d0bde(0x1e7),this,0x0),this['_hp']>=this[_0x1d0bde(0xf8)]&&this[_0x1d0bde(0x20a)](_0x1d0bde(0x122),this,0x0),this[_0x1d0bde(0x18e)]<this['mmp']/0x4&&this['gainTpFromTpMode'](_0x1d0bde(0x165),this,0x0),this[_0x1d0bde(0x18e)]>=this['mmp']&&this['gainTpFromTpMode'](_0x1d0bde(0x204),this,0x0),this[_0x1d0bde(0x184)]()['aliveMembers']()[_0x1d0bde(0x104)]<=0x1&&this['gainTpFromTpMode'](_0x1d0bde(0x198),this,0x0),this['_regeneratingTp']=undefined,this[_0x1d0bde(0x1a0)]();},Game_Battler[_0x23fe64(0x17a)]['chargeTpByDamage']=function(_0x9d321a){},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1e2)]=Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x14c)],Game_Battler[_0x23fe64(0x17a)][_0x23fe64(0x14c)]=function(_0x1f0cc2){const _0x33ae15=_0x23fe64,_0x6812e6=this[_0x33ae15(0x146)]();VisuMZ[_0x33ae15(0x100)][_0x33ae15(0x1e2)]['call'](this,_0x1f0cc2),_0x1f0cc2===this[_0x33ae15(0x1ff)]()&&this[_0x33ae15(0x167)]()&&_0x6812e6&&(this[_0x33ae15(0x184)]()[_0x33ae15(0x20a)](_0x33ae15(0x1ab),this,0x0),this['opponentsUnit']()['gainTpFromTpMode'](_0x33ae15(0x1ec),this,0x0));},Game_Battler['prototype'][_0x23fe64(0x14d)]=function(_0x1e21ae){const _0x4e16f5=_0x23fe64;this['_cache']={},this[_0x4e16f5(0x1b6)]=Math[_0x4e16f5(0xff)](this[_0x4e16f5(0x1b6)],this[_0x4e16f5(0x1f0)]());},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x14b)]=Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0x170)],Game_Actor['prototype'][_0x23fe64(0x170)]=function(_0x43926b){const _0x14dd0d=_0x23fe64;VisuMZ['EnhancedTP'][_0x14dd0d(0x14b)][_0x14dd0d(0x1c7)](this,_0x43926b),this[_0x14dd0d(0x206)]();},Game_Actor[_0x23fe64(0x17a)]['initEnhancedTP']=function(){const _0x431868=_0x23fe64;this[_0x431868(0x172)]=[],Game_Battler[_0x431868(0x17a)][_0x431868(0x206)]['call'](this),this[_0x431868(0xde)](),this[_0x431868(0x1bb)]();},Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0x169)]=function(){const _0x5b23aa=_0x23fe64;return this[_0x5b23aa(0x137)]()&&this[_0x5b23aa(0x137)]()[_0x5b23aa(0x20b)]['match'](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x5b23aa(0xd9)]()['trim']():Game_Battler[_0x5b23aa(0x17a)]['defaultTpMode'][_0x5b23aa(0x1c7)](this);},Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0x14d)]=function(_0x2f0811){const _0x4a0a3f=_0x23fe64;_0x2f0811=_0x2f0811[_0x4a0a3f(0xd9)]()[_0x4a0a3f(0x1e0)](),Game_Battler[_0x4a0a3f(0x17a)][_0x4a0a3f(0x14d)]['call'](this,_0x2f0811),this[_0x4a0a3f(0x1bf)](_0x2f0811);},Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0x1bf)]=function(_0x4864f4){const _0x360059=_0x23fe64;_0x4864f4=_0x4864f4[_0x360059(0xd9)]()[_0x360059(0x1e0)]();if(!VisuMZ['EnhancedTP'][_0x360059(0x21a)][_0x4864f4])return;this['_availableTpModes']=this[_0x360059(0x172)]||[],!this[_0x360059(0x172)][_0x360059(0x1b2)](_0x4864f4)&&(this[_0x360059(0x172)][_0x360059(0x11c)](_0x4864f4),this['sortTpModes']());},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x20d)]=function(_0x631dac){const _0x10dd70=_0x23fe64,_0x5ef0f9=[];for(const _0x4c1bc9 of VisuMZ[_0x10dd70(0x100)][_0x10dd70(0x193)]){if(_0x631dac[_0x10dd70(0x1b2)](_0x4c1bc9))_0x5ef0f9[_0x10dd70(0x11c)](_0x4c1bc9);}return _0x5ef0f9;},Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0x20d)]=function(){const _0xa9533b=_0x23fe64;if(this[_0xa9533b(0x172)]===undefined)this[_0xa9533b(0x206)]();this[_0xa9533b(0x172)]=VisuMZ['EnhancedTP']['sortTpModes'](this[_0xa9533b(0x172)]);},Game_Actor['prototype'][_0x23fe64(0xf6)]=function(){const _0x5dbe29=_0x23fe64;if(this[_0x5dbe29(0x172)]===undefined)this[_0x5dbe29(0x206)]();this['learnAvailablePartyTpModes']();let _0x10c25b=this[_0x5dbe29(0x172)][_0x5dbe29(0x1ed)](_0x2b96ae=>VisuMZ[_0x5dbe29(0x100)][_0x5dbe29(0x21a)][_0x2b96ae]);return _0x10c25b[_0x5dbe29(0x131)](null);},Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0xde)]=function(){const _0x253dd4=_0x23fe64;for(const _0x436d91 of $gameParty[_0x253dd4(0x124)]()){this[_0x253dd4(0x1bf)](_0x436d91[_0x253dd4(0xd9)]()[_0x253dd4(0x1e0)]());}},Game_Actor[_0x23fe64(0x17a)][_0x23fe64(0x1bb)]=function(){const _0x1b7c6a=_0x23fe64;if(this[_0x1b7c6a(0x137)]()&&this[_0x1b7c6a(0x137)]()[_0x1b7c6a(0x20b)][_0x1b7c6a(0x188)](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x32f9b1=String(RegExp['$1'])[_0x1b7c6a(0x217)](/[\r\n]+/);for(const _0x8c17d1 of _0x32f9b1){this[_0x1b7c6a(0x1bf)](_0x8c17d1[_0x1b7c6a(0xd9)]()[_0x1b7c6a(0x1e0)]());}}},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1fe)]=Game_Actor['prototype'][_0x23fe64(0x189)],Game_Actor[_0x23fe64(0x17a)]['learnSkill']=function(_0x3cfee4){const _0x6764f3=_0x23fe64;VisuMZ[_0x6764f3(0x100)][_0x6764f3(0x1fe)][_0x6764f3(0x1c7)](this,_0x3cfee4),this['learnSkillEnhancedTP'](_0x3cfee4);},Game_Actor[_0x23fe64(0x17a)]['learnSkillEnhancedTP']=function(_0x119f0c){const _0x2be9e9=_0x23fe64;if(!$dataSkills[_0x119f0c])return;const _0x1ae3f4=$dataSkills[_0x119f0c][_0x2be9e9(0x20b)],_0x71ce82=_0x1ae3f4[_0x2be9e9(0x188)](/<LEARN TP MODE: (.*)>/gi);if(_0x71ce82)for(const _0x242504 of _0x71ce82){_0x242504[_0x2be9e9(0x188)](/<LEARN TP MODE: (.*)>/i),this[_0x2be9e9(0x1bf)](String(RegExp['$1']));}if(_0x1ae3f4['match'](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x41a35c=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x523401 of _0x41a35c){this['learnTpMode'](_0x523401);}}},Game_Enemy[_0x23fe64(0x17a)]['defaultTpMode']=function(){const _0x48266e=_0x23fe64;return this[_0x48266e(0x123)]()[_0x48266e(0x20b)][_0x48266e(0x188)](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x48266e(0xd9)]()[_0x48266e(0x1e0)]():Game_Battler[_0x48266e(0x17a)][_0x48266e(0x169)][_0x48266e(0x1c7)](this);},Game_Unit[_0x23fe64(0x17a)][_0x23fe64(0x20a)]=function(_0x596669,_0xdcd2ad,_0x17f756){const _0xa4a8ee=_0x23fe64;for(const _0x3d270f of this[_0xa4a8ee(0x181)]()){if(!_0x3d270f)continue;_0x3d270f[_0xa4a8ee(0x20a)](_0x596669,_0xdcd2ad,_0x17f756);}},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x18d)]=Game_Party[_0x23fe64(0x17a)]['initialize'],Game_Party['prototype'][_0x23fe64(0x191)]=function(){const _0x58c3de=_0x23fe64;VisuMZ[_0x58c3de(0x100)][_0x58c3de(0x18d)][_0x58c3de(0x1c7)](this),this[_0x58c3de(0x1a6)]();},Game_Party[_0x23fe64(0x17a)][_0x23fe64(0x1a6)]=function(){const _0x4a950f=_0x23fe64;this[_0x4a950f(0x196)]=[];for(const _0x4d63d3 of VisuMZ['EnhancedTP'][_0x4a950f(0x17e)][_0x4a950f(0x1da)]['GlobalTPModes']){this[_0x4a950f(0x196)][_0x4a950f(0x11c)](_0x4d63d3[_0x4a950f(0xd9)]()[_0x4a950f(0x1e0)]());}},Game_Party['prototype'][_0x23fe64(0x124)]=function(){const _0x5a6578=_0x23fe64;if(this[_0x5a6578(0x196)]===undefined)this['initTpModes']();return this[_0x5a6578(0x196)];},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x154)]=Scene_Skill[_0x23fe64(0x17a)][_0x23fe64(0x14a)],Scene_Skill[_0x23fe64(0x17a)]['create']=function(){const _0x4b99df=_0x23fe64;VisuMZ['EnhancedTP'][_0x4b99df(0x154)][_0x4b99df(0x1c7)](this),this[_0x4b99df(0xdc)]();},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x214)]=Scene_Skill['prototype']['createSkillTypeWindow'],Scene_Skill[_0x23fe64(0x17a)]['createSkillTypeWindow']=function(){const _0x535faa=_0x23fe64;VisuMZ[_0x535faa(0x100)][_0x535faa(0x214)][_0x535faa(0x1c7)](this),this[_0x535faa(0xf3)][_0x535faa(0x21b)](_0x535faa(0x106),this['commandTpMode'][_0x535faa(0x218)](this));},Scene_Skill[_0x23fe64(0x17a)][_0x23fe64(0xdc)]=function(){const _0x5d6f48=_0x23fe64,_0x373c38=this[_0x5d6f48(0x1f6)]();this[_0x5d6f48(0x149)]=new Window_TpModes(_0x373c38),this['_tpModeWindow']['setHelpWindow'](this[_0x5d6f48(0x1ac)]),this[_0x5d6f48(0x149)][_0x5d6f48(0x21b)]('ok',this[_0x5d6f48(0x177)][_0x5d6f48(0x218)](this)),this['_tpModeWindow'][_0x5d6f48(0x21b)](_0x5d6f48(0xfe),this['onTpModeCancel'][_0x5d6f48(0x218)](this)),this['addWindow'](this[_0x5d6f48(0x149)]);const _0x42d413=VisuMZ[_0x5d6f48(0x100)]['Settings'][_0x5d6f48(0x1da)][_0x5d6f48(0x1ca)];this['_tpModeWindow'][_0x5d6f48(0xf9)](_0x42d413||0x0);},Scene_Skill[_0x23fe64(0x17a)][_0x23fe64(0x1f6)]=function(){const _0xbf6060=_0x23fe64,_0x492cd9=0x0,_0x36160f=this[_0xbf6060(0x13b)]['y']+this['_statusWindow']['height'],_0x27f93b=Graphics[_0xbf6060(0x182)],_0x3de4da=this[_0xbf6060(0x207)]()-this[_0xbf6060(0x13b)]['height'];return new Rectangle(_0x492cd9,_0x36160f,_0x27f93b,_0x3de4da);},Scene_Skill[_0x23fe64(0x17a)][_0x23fe64(0x1d6)]=function(){const _0x200b9f=_0x23fe64;this['_tpModeWindow']['activate'](),this['_tpModeWindow'][_0x200b9f(0x12c)]();},Scene_Skill[_0x23fe64(0x17a)]['onTpModeOk']=function(){const _0x57073c=_0x23fe64;this['_tpModeWindow'][_0x57073c(0xdf)]();const _0x2b2e4a=this[_0x57073c(0x149)][_0x57073c(0x13d)]();if(!_0x2b2e4a)return;this[_0x57073c(0x137)]()[_0x57073c(0x10e)](_0x2b2e4a[_0x57073c(0x13a)]),this[_0x57073c(0x149)][_0x57073c(0x1a0)](),this[_0x57073c(0x13b)][_0x57073c(0x1a0)]();},Scene_Skill['prototype']['onTpModeCancel']=function(){const _0x217d10=_0x23fe64;this[_0x217d10(0x149)][_0x217d10(0xf7)](),this['_skillTypeWindow'][_0x217d10(0xdf)]();},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x1fd)]=Scene_Skill[_0x23fe64(0x17a)][_0x23fe64(0x14e)],Scene_Skill[_0x23fe64(0x17a)][_0x23fe64(0x14e)]=function(){const _0x585e48=_0x23fe64;VisuMZ[_0x585e48(0x100)][_0x585e48(0x1fd)][_0x585e48(0x1c7)](this);if(this[_0x585e48(0x149)])this[_0x585e48(0x149)][_0x585e48(0x1c6)](this[_0x585e48(0x137)]());},VisuMZ['EnhancedTP'][_0x23fe64(0x210)]=Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x170)],Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x170)]=function(_0x41a2c7,_0x3ddfea){const _0x13c968=_0x23fe64;VisuMZ[_0x13c968(0x100)][_0x13c968(0x210)][_0x13c968(0x1c7)](this,_0x41a2c7,_0x3ddfea),this[_0x13c968(0x1cd)]==='tp'&&(this['createEnhancedTpChildSprites'](),this[_0x13c968(0x1d3)]());},Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0xe3)]=function(){const _0x3643b7=_0x23fe64;!this[_0x3643b7(0x176)]&&(this[_0x3643b7(0x176)]=new Sprite(),this[_0x3643b7(0x102)](this[_0x3643b7(0x176)])),!this['_tpGaugeSprite']&&(this['_tpGaugeSprite']=new Sprite(),this[_0x3643b7(0x102)](this[_0x3643b7(0x1d1)])),!this[_0x3643b7(0x1d2)]&&(this[_0x3643b7(0x1d2)]=new Sprite(),this['addChild'](this[_0x3643b7(0x1d2)]));},VisuMZ['EnhancedTP'][_0x23fe64(0x110)]=Sprite_Gauge['prototype']['redraw'],Sprite_Gauge[_0x23fe64(0x17a)]['redraw']=function(){const _0x1eaab6=_0x23fe64;let _0x248413=$dataSystem[_0x1eaab6(0x200)]['basic'][0x7];this[_0x1eaab6(0x1cd)]==='tp'&&this[_0x1eaab6(0x108)](),VisuMZ['EnhancedTP'][_0x1eaab6(0x110)][_0x1eaab6(0x1c7)](this),this['_statusType']==='tp'&&this[_0x1eaab6(0x10f)](),this['_statusType']==='tp'&&($dataSystem[_0x1eaab6(0x200)][_0x1eaab6(0x10b)][0x7]=_0x248413);},Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x10f)]=function(){const _0x414afb=_0x23fe64;this[_0x414afb(0x1d2)]&&(this[_0x414afb(0x1d2)][_0x414afb(0x1aa)]=this[_0x414afb(0x1aa)]),this['setFrame'](0x0,0x0,0x0,0x0);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x21d)]=Sprite_Gauge[_0x23fe64(0x17a)]['drawFullGauge'],Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x11f)]=function(_0x2e8708,_0x45fcfe,_0x7ec88f,_0x2e843e,_0x3cb80b,_0x32837b){const _0x5da8bd=_0x23fe64;this[_0x5da8bd(0x1cd)]==='tp'&&this[_0x5da8bd(0x1d1)]?this[_0x5da8bd(0x1a7)](_0x2e8708,_0x45fcfe,_0x7ec88f,_0x2e843e,_0x3cb80b,_0x32837b):VisuMZ['EnhancedTP']['Sprite_Gauge_drawFullGauge'][_0x5da8bd(0x1c7)](this,_0x2e8708,_0x45fcfe,_0x7ec88f,_0x2e843e,_0x3cb80b,_0x32837b);},Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x1dd)]=function(_0xe4b3de){const _0x45b6d0=_0x23fe64;!this[_0x45b6d0(0x176)][_0x45b6d0(0x1aa)]&&(this[_0x45b6d0(0x176)]['bitmap']=new Bitmap(this[_0x45b6d0(0x1aa)]['width'],this[_0x45b6d0(0x1aa)]['height'])),!this[_0x45b6d0(0x1d1)][_0x45b6d0(0x1aa)]&&(this[_0x45b6d0(0x1d1)][_0x45b6d0(0x1aa)]=new Bitmap(this[_0x45b6d0(0x1aa)][_0x45b6d0(0x1c4)],this[_0x45b6d0(0x1aa)][_0x45b6d0(0x1b7)])),_0xe4b3de&&(this[_0x45b6d0(0x176)]['bitmap'][_0x45b6d0(0x1f7)](),this[_0x45b6d0(0x1d1)][_0x45b6d0(0x1aa)]['clear']());},Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x1a7)]=function(_0x32ad14,_0x272ec9,_0x50e5a7,_0x567738,_0x49c10f,_0x5e9204){const _0x5d979d=_0x23fe64;this[_0x5d979d(0x1dd)](!![]);const _0x4e0882=this[_0x5d979d(0x156)](),_0x182fb9=Math['floor']((_0x49c10f-0x2)*_0x4e0882),_0x79c4d5=_0x5e9204-0x2,_0x352c66=this[_0x5d979d(0x21f)]();this[_0x5d979d(0x176)][_0x5d979d(0x1aa)]['fillRect'](_0x50e5a7,_0x567738,_0x49c10f,_0x5e9204,_0x352c66),_0x32ad14=this['changeTpCustomColor'](_0x32ad14,0x1),_0x272ec9=this[_0x5d979d(0x19f)](_0x272ec9,0x2),this[_0x5d979d(0x1d1)][_0x5d979d(0x1aa)]['gradientFillRect'](_0x50e5a7+0x1,_0x567738+0x1,_0x182fb9,_0x79c4d5,_0x32ad14,_0x272ec9);},VisuMZ['EnhancedTP']['Sprite_Gauge_drawGaugeRect']=Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x173)],Sprite_Gauge['prototype'][_0x23fe64(0x173)]=function(_0x3ce844,_0x39ad15,_0x532a19,_0x2d4882){const _0x412dca=_0x23fe64;this[_0x412dca(0x1cd)]==='tp'&&this[_0x412dca(0x1d1)]?this[_0x412dca(0x128)](_0x3ce844,_0x39ad15,_0x532a19,_0x2d4882):VisuMZ['EnhancedTP'][_0x412dca(0x143)][_0x412dca(0x1c7)](this,_0x3ce844,_0x39ad15,_0x532a19,_0x2d4882);},Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x128)]=function(_0x442beb,_0x2bd95d,_0x1f36ec,_0x27ca4e){const _0x342fb7=_0x23fe64;this[_0x342fb7(0x1dd)](!![]);const _0x3ba3df=this['gaugeRate'](),_0x1c10ba=Math['floor']((_0x1f36ec-0x2)*_0x3ba3df),_0x14e139=_0x27ca4e-0x2,_0x336140=this[_0x342fb7(0x21f)](),_0x1d1249=this[_0x342fb7(0x19f)](this['gaugeColor1'](),0x1),_0xa4cf61=this['changeTpCustomColor'](this[_0x342fb7(0x13c)](),0x2);this['_tpGaugeBack'][_0x342fb7(0x1aa)]['fillRect'](_0x442beb,_0x2bd95d,_0x1f36ec,_0x27ca4e,_0x336140),this['_tpGaugeSprite']['bitmap'][_0x342fb7(0x105)](_0x442beb+0x1,_0x2bd95d+0x1,_0x1c10ba,_0x14e139,_0x1d1249,_0xa4cf61);},VisuMZ[_0x23fe64(0x100)]['Sprite_Gauge_update']=Sprite_Gauge[_0x23fe64(0x17a)]['update'],Sprite_Gauge['prototype'][_0x23fe64(0x1d3)]=function(){const _0xa7023=_0x23fe64;VisuMZ['EnhancedTP'][_0xa7023(0x21e)][_0xa7023(0x1c7)](this),this[_0xa7023(0x1fc)]();},Sprite_Gauge[_0x23fe64(0x17a)][_0x23fe64(0x1fc)]=function(){const _0x25a995=_0x23fe64;if(this[_0x25a995(0x1cd)]!=='tp')return;if(!this[_0x25a995(0x1d1)])return;if(!this[_0x25a995(0x1b4)])return;const _0x9f37c8=this[_0x25a995(0x1b4)][_0x25a995(0x106)]();this[_0x25a995(0xe7)]!==_0x9f37c8&&(this[_0x25a995(0xe7)]=_0x9f37c8,this['redraw']());if(this[_0x25a995(0x1b4)][_0x25a995(0x11a)]()){const _0x3eecaf=this[_0x25a995(0x1b4)][_0x25a995(0x19b)]();this[_0x25a995(0x1d1)][_0x25a995(0x19d)](this['_tpGaugeSprite']['_hue']+_0x3eecaf);const _0xb86734=this[_0x25a995(0x1b4)]['tpGaugeFlashLightness']();this['_tpGaugeSprite'][_0x25a995(0xfc)]([0xff,0xff,0xff,_0xb86734]);}else this[_0x25a995(0x1d1)][_0x25a995(0xfc)]([0xff,0xff,0xff,0x0]),this['_tpGaugeSprite'][_0x25a995(0x19d)](0x0);},Sprite_Gauge['prototype']['changeBattlerTpLabel']=function(){const _0x6bd6b0=_0x23fe64;if(!this[_0x6bd6b0(0x1b4)])return;const _0x5d0410=this[_0x6bd6b0(0x1b4)][_0x6bd6b0(0x106)]();_0x5d0410[_0x6bd6b0(0x221)]&&($dataSystem['terms']['basic'][0x7]=_0x5d0410[_0x6bd6b0(0x221)][_0x6bd6b0(0x1e0)]());},Sprite_Gauge[_0x23fe64(0x17a)]['changeTpCustomColor']=function(_0x299c29,_0x3c59ec){const _0x3f42d7=_0x23fe64;if(!this[_0x3f42d7(0x1b4)])return _0x299c29;const _0x1d9d35=this['_battler']['tpMode'](),_0x1be44a=_0x3f42d7(0xe4)[_0x3f42d7(0xe9)](_0x3c59ec);return _0x1d9d35[_0x1be44a]?ColorManager[_0x3f42d7(0x20f)](_0x1d9d35[_0x1be44a]):_0x299c29;},Window_Base[_0x23fe64(0x17a)][_0x23fe64(0x159)]=function(_0x3ef56c,_0x3167ef,_0x361911,_0x1b397d,_0x4d3574){const _0x221731=_0x23fe64;if(!_0x3ef56c)return;const _0x441196=ImageManager[_0x221731(0x1e1)]||0x20,_0xea7402=_0x441196-ImageManager[_0x221731(0x17d)],_0x34243f=_0x441196+0x4,_0x2a7750=_0x361911+(this[_0x221731(0x1c0)]()-ImageManager['iconHeight'])/0x2,_0x204551=Math[_0x221731(0x220)](0x0,_0x1b397d-_0x34243f);this[_0x221731(0x138)](),_0x4d3574&&_0x4d3574[_0x221731(0x106)]()===_0x3ef56c&&this['changeTextColor'](ColorManager[_0x221731(0x162)]()),this[_0x221731(0x12d)](_0x3ef56c[_0x221731(0xe0)],_0x3167ef+Math[_0x221731(0x166)](_0xea7402/0x2),_0x2a7750),this['drawText'](_0x3ef56c[_0x221731(0x13a)],_0x3167ef+_0x34243f,_0x361911,_0x204551);},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0x21c)]=Window_SkillType[_0x23fe64(0x17a)]['makeCommandList'],Window_SkillType[_0x23fe64(0x17a)]['makeCommandList']=function(){const _0x5b9bad=_0x23fe64;VisuMZ[_0x5b9bad(0x100)][_0x5b9bad(0x21c)][_0x5b9bad(0x1c7)](this),this[_0x5b9bad(0x187)]();},Window_SkillType[_0x23fe64(0x17a)][_0x23fe64(0x187)]=function(){const _0x1e642c=_0x23fe64;if(!this[_0x1e642c(0x132)]())return;let _0x52a8f7=TextManager[_0x1e642c(0x222)][_0x1e642c(0xe9)](TextManager['tp']);Imported[_0x1e642c(0x178)]&&(this['commandStyle']()!==_0x1e642c(0x15b)&&(_0x52a8f7=_0x1e642c(0x158)[_0x1e642c(0xe9)](ImageManager[_0x1e642c(0x1d7)],_0x52a8f7))),this[_0x1e642c(0xe5)](_0x52a8f7,_0x1e642c(0x106),!![],_0x1e642c(0x106));},Window_SkillType['prototype'][_0x23fe64(0x132)]=function(){const _0x1d9083=_0x23fe64;return $gameSystem[_0x1d9083(0x134)]();},VisuMZ[_0x23fe64(0x100)][_0x23fe64(0xea)]=Window_SkillList[_0x23fe64(0x17a)][_0x23fe64(0x1d4)],Window_SkillList[_0x23fe64(0x17a)]['setStypeId']=function(_0x33b3f5){const _0x1ebb47=_0x23fe64,_0x6d2c3=this[_0x1ebb47(0x141)]!==_0x33b3f5;if(!_0x6d2c3)return;this['show']();const _0x4a8849=SceneManager[_0x1ebb47(0x145)][_0x1ebb47(0x149)];if(_0x4a8849)_0x4a8849[_0x1ebb47(0x1c1)]();const _0x4b154e=this[_0x1ebb47(0x13b)];if(_0x4b154e)_0x4b154e[_0x1ebb47(0x19a)]();VisuMZ[_0x1ebb47(0x100)][_0x1ebb47(0xea)][_0x1ebb47(0x1c7)](this,_0x33b3f5);if(_0x6d2c3&&_0x4a8849&&_0x33b3f5==='tpMode'){if(_0x4b154e)_0x4b154e['hide']();this[_0x1ebb47(0x1c1)](),_0x4a8849[_0x1ebb47(0x19a)]();}};function _0x585e(){const _0x4fe3e9=['NUM','TakeMpDmg','FleeBattle','setHelpWindowItem','isTpGaugeFlashing','skillIsNotAttackGuard','push','floor','ARRAYNUM','drawFullGauge','name','setTpModeInSceneSkill','FullHp','enemy','tpModes','maxItems','onDatabaseLoaded','description','drawGaugeRectEnhancedTp','applyItemEnhancedTPEffect','TpMode','ARRAYEVAL','selectLast','drawIcon','ARRAYSTR','DealAllyBuff','Game_Action_apply','remove','isTpModeCommandVisible','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','showTpModeInSceneSkill','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_BattlerBase_maxTp','actor','resetTextColor','result','Name','_statusWindow','gaugeColor2','item','FlashGauge','Game_Battler_onBattleStart','_tpMode','_stypeId','applyItemUserEffect','Sprite_Gauge_drawGaugeRect','Game_Action_itemEffectAddState','_scene','isAlive','UseSkill','Preserve','_tpModeWindow','create','Game_Actor_setup','addState','onChangeTpMode','refreshActor','itemEffectAddBuff','leader','DealMpDmg','Game_Action_applyItemUserEffect','TpModeCmdName','Scene_Skill_create','applyGlobalEnhancedTP','gaugeRate','ARRAYFUNC','\x5cI[%1]%2','drawTpMode','1498708OEqBgv','text','GainEnemyState','3048164LHZaeL','TakeHpHeal','BattleManager_processVictory','DealEnemyDebuff','applyGlobal','tpCostColor','executeHpDamage','status','CriticalMp','ceil','isDead','subject','defaultTpMode','isPreserveTp','ActorChangeTPMode','TpModeIcon','LoseBattle','13715830ZormFw','WinBattle','setup','GainAllyBuff','_availableTpModes','drawGaugeRect','GainEnemyDebuff','3gOSUGQ','_tpGaugeBack','onTpModeOk','VisuMZ_1_SkillsStatesCore','_hp','prototype','onBattleStart','exit','iconWidth','Settings','ConvertParams','log','aliveMembers','boxWidth','DealMpHeal','friendsUnit','UseItem','AllyHpDmg','addTpModeCommand','match','learnSkill','user','TpRegen','Game_Action_itemEffectAddDebuff','Game_Party_initialize','_mp','_data','11XxQPSK','initialize','gainSilentTp','TpModeOrder','attackSkillId','abs','_tpModes','tpModeValue','OnlyMember','AllyHpHeal','show','tpGaugeFlashSpeed','evaded','setHue','colSpacing','changeTpCustomColor','refresh','FUNC','STR','Help','traitObjects','Game_Action_testApply','initTpModes','drawFullGaugeEnhancedTp','onEscapeSuccess','parameters','bitmap','KillAlly','_helpWindow','itemLineRect','textColor','missed','Initial','EVAL','includes','DealHpDmg','_battler','Game_Unit_onBattleEnd','_tp','height','Game_Action_executeMpDamage','CriticalHit','members','learnAvailableActorTpModes','Game_BattlerBase_sparam','Evasion','_actor','learnTpMode','lineHeight','hide','executeMpDamage','DealHpHeal','width','regenerateTp','setActor','call','TakeHpDmg','Game_Unit_onBattleStart','TpWindowBgType','itemEffectAddState','processVictory','_statusType','DealEnemyState','JSON','Unnamed\x20Mode','_tpGaugeSprite','_tpTextSprite','update','setStypeId','tpGaugeFlashLightness','commandTpMode','tpModesCommandIcon','DefaultTpMode','10345257WFGBaa','General','3149994AQaDrb','initTp','createTpGaugeBitmaps','makeItemList','SceneSkillTpMode','trim','standardIconWidth','Game_Battler_addState','inBattle','Game_Action_applyGlobal','playEquip','FlashSpeed','CriticalHp','BattleManager_processDefeat','process_VisuMZ_EnhancedTP_Settings','registerCommand','BattleManager_onEscapeSuccess','KillEnemy','map','isPlaytest','DealAllyState','maxTp','isSkill','TakeMpHeal','4713424mFJlog','filter','Show','tpModeWindowRect','clear','%1Func','isActor','itemEffectAddDebuff','1GqGJRi','updateEnhancedTp','Scene_Skill_refreshActor','Game_Actor_learnSkill','deathStateId','terms','Game_Action_itemEffectAddBuff','guardSkillId','applyEnhancedTP','FullMp','ARRAYJSON','initEnhancedTP','mainAreaHeight','value','Actors','gainTpFromTpMode','note','convertEnhancedTpFunctions','sortTpModes','processDefeat','getColor','Sprite_Gauge_setup','testApply','GainAllyDebuff','Game_Action_executeHpDamage','Scene_Skill_createSkillTypeWindow','Game_Battler_regenerateTp','forceSelect','split','bind','_inBattle','TpModes','setHandler','Window_SkillType_makeCommandList','Sprite_Gauge_drawFullGauge','Sprite_Gauge_update','gaugeBackColor','max','CustomLabel','tpModesCommandText','toUpperCase','trg','Game_Battler_useItem','createTpModeWindow','MaxFormula','learnAvailablePartyTpModes','activate','Icon','onBattleEnd','_tpMode_SceneSkill','createEnhancedTpChildSprites','CustomColor%1','addCommand','drawItem','_tpModeCache','_regeneratingTp','format','Window_SkillList_setStypeId','updateHelp','target','5kzHxFv','clearTp','itemAt','apply','Scene_Boot_onDatabaseLoaded','isItem','_skillTypeWindow','DealEnemyBuff','ARRAYSTRUCT','availableTpModes','deselect','mhp','setBackgroundType','sparam','Game_BattlerBase_isPreserveTp','setBlendColor','testApplyEnhancedTP','cancel','min','EnhancedTP','clamp','addChild','TPModeName','length','gradientFillRect','tpMode','GainAllyState','changeBattlerTpLabel','Enemies','success','basic','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3','changeTpMode','redrawEnhancedTp','Sprite_Gauge_redraw','maxCols','Game_System_initialize','3968475OLymFH','parse','STRUCT'];_0x585e=function(){return _0x4fe3e9;};return _0x585e();}function Window_TpModes(){const _0x3c6e70=_0x23fe64;this[_0x3c6e70(0x191)](...arguments);}function _0x4cbc(_0x28e0ce,_0x23dbc8){const _0x585e7b=_0x585e();return _0x4cbc=function(_0x4cbc46,_0x20dab6){_0x4cbc46=_0x4cbc46-0xd9;let _0x3b2dc3=_0x585e7b[_0x4cbc46];return _0x3b2dc3;},_0x4cbc(_0x28e0ce,_0x23dbc8);}Window_TpModes[_0x23fe64(0x17a)]=Object[_0x23fe64(0x14a)](Window_Selectable[_0x23fe64(0x17a)]),Window_TpModes[_0x23fe64(0x17a)]['constructor']=Window_TpModes,Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x191)]=function(_0x350907){const _0x4383e4=_0x23fe64;Window_Selectable[_0x4383e4(0x17a)][_0x4383e4(0x191)][_0x4383e4(0x1c7)](this,_0x350907),this['_actor']=null,this[_0x4383e4(0x18f)]=[],this[_0x4383e4(0x1c1)]();},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x1c6)]=function(_0x50a726){const _0x5b0cfe=_0x23fe64;this['_actor']!==_0x50a726&&(this[_0x5b0cfe(0x1be)]=_0x50a726,this[_0x5b0cfe(0x1a0)](),this['scrollTo'](0x0,0x0));},Window_TpModes['prototype'][_0x23fe64(0x111)]=function(){return 0x2;},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x19e)]=function(){return 0x10;},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x125)]=function(){const _0x4b8353=_0x23fe64;return this[_0x4b8353(0x18f)]?this[_0x4b8353(0x18f)][_0x4b8353(0x104)]:0x1;},Window_TpModes['prototype'][_0x23fe64(0x13d)]=function(){const _0xc914aa=_0x23fe64;return this[_0xc914aa(0xef)](this['index']());},Window_TpModes['prototype'][_0x23fe64(0xef)]=function(_0x51fe2d){const _0x1e8633=_0x23fe64;return this[_0x1e8633(0x18f)]&&_0x51fe2d>=0x0?this[_0x1e8633(0x18f)][_0x51fe2d]:null;},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x1de)]=function(){const _0x25b8f2=_0x23fe64;this[_0x25b8f2(0x1be)]?this[_0x25b8f2(0x18f)]=this[_0x25b8f2(0x1be)]['availableTpModes']():this[_0x25b8f2(0x18f)]=[];},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x12c)]=function(){const _0xb7d7b6=_0x23fe64;this[_0xb7d7b6(0x216)](0x0);},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0xe6)]=function(_0x5d6b22){const _0x25d019=_0x23fe64,_0x3e727c=this['itemAt'](_0x5d6b22);if(!_0x3e727c)return;const _0x4671a5=this[_0x25d019(0x1ad)](_0x5d6b22);this[_0x25d019(0x159)](_0x3e727c,_0x4671a5['x'],_0x4671a5['y'],_0x4671a5[_0x25d019(0x1c4)],this[_0x25d019(0x1be)]);},Window_TpModes['prototype'][_0x23fe64(0xeb)]=function(){const _0x46955e=_0x23fe64;this[_0x46955e(0x119)](this[_0x46955e(0x13d)]());},Window_TpModes[_0x23fe64(0x17a)][_0x23fe64(0x1a0)]=function(){const _0x3bd21c=_0x23fe64;this['makeItemList'](),Window_Selectable['prototype'][_0x3bd21c(0x1a0)][_0x3bd21c(0x1c7)](this);},Window_TpModes['prototype']['playOkSound']=function(){const _0x1444b2=_0x23fe64;SoundManager[_0x1444b2(0x1e5)]();};