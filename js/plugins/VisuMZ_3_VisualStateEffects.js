//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.15] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
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
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * States can adjust the opacity of a battler to make them semi-transparent.
 * * Hovering effects that can be visibly applied to trait objects.
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
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Opacity: x>
 * <Visual Opacity: x%>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, change the opacity of their main
 *   battler sprite to 'x' or 'x%'.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - To change the whole battler's opacity including everything from the UI
 *   elements, State Icons, etc., use the Action Sequence Plugin Command to
 *   visually alter the whole opacity level instead.
 * - The Visual Opacity level will compound with the opacity level adjusted by
 *   the Action Sequence Plugin Command. Keep this in mind when using both of
 *   them together.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Rainbow: +x>
 * <Visual Rainbow: -x>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, the battler has a colorful
 *   rainbow shifting effect.
 * - Replace 'x' with a number representing how fast the colors shift for the
 *   battler. Higher numbers are faster. Lower numbers are slower.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - The Visual Rainbow shift will be stacked on top of any battlers/enemies
 *   that already have a hue change.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 *
 * === Hover-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * === Breathing-Related Notetags ===
 * 
 * The following notetags are purely EXPERIMENTAL. There is a high likelihood
 * of unintended graphical glitches when using them. Use them at your own risk.
 * 
 * ---
 * 
 * <Visual Breathing Effect>
 *  Speed: x
 *  Speed X: x
 *  Speed Y: x
 *  
 *  Rate: x.y
 *  Rate X: x.y
 *  Rate Y: x.y
 * 
 *  HP Link: On
 *  HP Link: Off
 * </Visual Breathing Effect>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'speed' value determines how long each cycle is.
 *   - When using 'Speed', this will apply to both 'Speed X' and 'Speed Y'
 *   - 'Speed X' refers to the horizontal breathing cycle
 *   - 'Speed Y' refers to the vertical breathing cycle
 *   - If not declared, both will default to a value of '10'
 * - The 'rate' value determines how exaggerated the breathing distortion looks
 *   for the affected target.
 *   - When using 'Rate', this will apply to both 'Rate X' and 'Rate Y
 *   - 'Rate X' refers to horizontal breathing distortion effect
 *   - 'Rate Y' refers to vertical breathing distortion effect
 *   - If not declared, 'Rate X' will default to 0.000 and 'Rate Y' to 0.020.
 * - HP Link refers to the breathing speed relative to the target's HP rate
 *   where the lower the rate, the slower the speed becomes.
 *   - 'On' means it's enabled.
 *   - 'Off' means it's disabled.
 *   - If not declared, this will default to 'OFF'
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Examples:
 * 
 * <Visual Breathing Effect>
 *  Speed: 10
 *  Rate Y: 0.050
 *  HP Link: On
 * </Visual Breathing Effect>
 * 
 * <Visual Breathing Effect>
 *  Speed X: 15
 *  Speed Y: 10
 *  Rate X: 0.01
 *  Rate Y: 0.050
 * </Visual Breathing Effect>
 * 
 * ---
 * 
 * <No Breathing>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Removes any breathing effects for the affected target.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
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
 * Version 1.15: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: July 2, 2021
 * * Feature Updates!
 * ** When a battler's sprite opacity is zero, repeating animations are hidden
 *    along with them. Update made by Arisu.
 * 
 * Version 1.13: June 18, 2021
 * * Bug Fixes!
 * ** Repeating animations no longer play on invisible enemies or dead enemies
 *    through passive state effects. Fix made by Arisu.
 * 
 * Version 1.12: June 11, 2021
 * * Documentation Update!
 * ** Added warnings for the following notetags by Irina:
 * *** <Repeat Animation: x>
 * *** <State Motion: x>
 * *** <State Motion Lock>
 * *** <Visual Opacity: x>
 * *** <Visual Rainbow: +/-x>
 * *** <Visual Hover Effect>
 * *** <Visual Breathing Effect>
 * **** NOTE: Using this with Passive State Conditions will make this effect
 *      update at the next battler refresh cycle. This is due to the effect
 *      being cached in order to prevent lag and overloading the engine.
 * 
 * Version 1.11: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Visual Breathing Effect>
 * *** <No Breathing>
 * **** Enables/disables breathing effects for your actors and/or enemies.
 *      Refer to the documentation for more details on how to set it up.
 * **** These are EXPERIMENTAL notetags. This means that these effects have the
 *      possibility of creating graphical glitches when used. Use at your own
 *      risk as these are not perfected features.
 * 
 * Version 1.10: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Rainbow: +x> and <Visual Rainbow: -x>
 * 
 * Version 1.09: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Opacity: x> and <Visual Opacity: x%>
 * 
 * Version 1.08: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Requires updated Core Engine. Fix made by Yanfly.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** <State Motion: x> now works for sideview enemies. Keep in mind the state
 *    motion does not apply to the active battler during the Input phase. Fix
 *    made by Yanfly.
 * 
 * Version 1.06: November 8, 2020
 * * Bug Fixes!
 * ** <Add Animation: x> and <Erase Animation: x> notetags now work properly.
 *    Fix by Arisu.
 * 
 * Version 1.05: November 1, 2020
 * * Feature Update!
 * ** Upon dying, state removal popups are no longer shown to prevent massive
 *    clutter of the screen. Update by Irina.
 * 
 * Version 1.04: October 25, 2020
 * * Bug Fixes!
 * ** Zooming in should no longer display faint outlines around state sprites.
 *    Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility with the Battle Core's new <Battler Sprite Grounded>
 *    notetag. Added by Irina.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Motion Locked Battlers at the start of battle no longer show their entire
 *    sprite sheet. Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the new
 *    distortion effects.
 * 
 * Version 1.01: September 6, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
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
 * @param VisualStateEffects
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
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
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
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
//=============================================================================

function _0x55e8(_0x1979f0,_0x1deb5){const _0x5a98fb=_0x5a98();return _0x55e8=function(_0x55e806,_0x33892f){_0x55e806=_0x55e806-0x154;let _0x3d289a=_0x5a98fb[_0x55e806];return _0x3d289a;},_0x55e8(_0x1979f0,_0x1deb5);}const _0x92128=_0x55e8;(function(_0x5d536c,_0x385cbe){const _0x5ccbc1=_0x55e8,_0x1e4108=_0x5d536c();while(!![]){try{const _0xf06790=parseInt(_0x5ccbc1(0x1fd))/0x1*(parseInt(_0x5ccbc1(0x162))/0x2)+-parseInt(_0x5ccbc1(0x252))/0x3*(-parseInt(_0x5ccbc1(0x196))/0x4)+-parseInt(_0x5ccbc1(0x223))/0x5+-parseInt(_0x5ccbc1(0x235))/0x6*(parseInt(_0x5ccbc1(0x255))/0x7)+parseInt(_0x5ccbc1(0x203))/0x8+parseInt(_0x5ccbc1(0x23a))/0x9+parseInt(_0x5ccbc1(0x1f9))/0xa*(parseInt(_0x5ccbc1(0x234))/0xb);if(_0xf06790===_0x385cbe)break;else _0x1e4108['push'](_0x1e4108['shift']());}catch(_0xb9fedc){_0x1e4108['push'](_0x1e4108['shift']());}}}(_0x5a98,0xd763c));var label=_0x92128(0x1ae),tier=tier||0x0,dependencies=[_0x92128(0x24a),'VisuMZ_1_BattleCore',_0x92128(0x1e4)],pluginData=$plugins[_0x92128(0x26c)](function(_0x218903){const _0x226a0c=_0x92128;return _0x218903[_0x226a0c(0x1b6)]&&_0x218903[_0x226a0c(0x228)][_0x226a0c(0x1b9)]('['+label+']');})[0x0];VisuMZ[label][_0x92128(0x201)]=VisuMZ[label][_0x92128(0x201)]||{},VisuMZ[_0x92128(0x256)]=function(_0x54d5c9,_0x15dd87){const _0x4dc08e=_0x92128;for(const _0x121b0f in _0x15dd87){if(_0x121b0f[_0x4dc08e(0x240)](/(.*):(.*)/i)){const _0x3547f8=String(RegExp['$1']),_0x483b77=String(RegExp['$2'])[_0x4dc08e(0x1e2)]()[_0x4dc08e(0x23b)]();let _0x499ffb,_0x4ca46c,_0x52140d;switch(_0x483b77){case'NUM':_0x499ffb=_0x15dd87[_0x121b0f]!==''?Number(_0x15dd87[_0x121b0f]):0x0;break;case _0x4dc08e(0x1ef):_0x4ca46c=_0x15dd87[_0x121b0f]!==''?JSON['parse'](_0x15dd87[_0x121b0f]):[],_0x499ffb=_0x4ca46c['map'](_0x148cbb=>Number(_0x148cbb));break;case _0x4dc08e(0x1f5):_0x499ffb=_0x15dd87[_0x121b0f]!==''?eval(_0x15dd87[_0x121b0f]):null;break;case _0x4dc08e(0x1ab):_0x4ca46c=_0x15dd87[_0x121b0f]!==''?JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f]):[],_0x499ffb=_0x4ca46c[_0x4dc08e(0x1d3)](_0x32a937=>eval(_0x32a937));break;case _0x4dc08e(0x25d):_0x499ffb=_0x15dd87[_0x121b0f]!==''?JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f]):'';break;case _0x4dc08e(0x219):_0x4ca46c=_0x15dd87[_0x121b0f]!==''?JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f]):[],_0x499ffb=_0x4ca46c['map'](_0x34bc8c=>JSON['parse'](_0x34bc8c));break;case'FUNC':_0x499ffb=_0x15dd87[_0x121b0f]!==''?new Function(JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f])):new Function(_0x4dc08e(0x265));break;case _0x4dc08e(0x1b8):_0x4ca46c=_0x15dd87[_0x121b0f]!==''?JSON['parse'](_0x15dd87[_0x121b0f]):[],_0x499ffb=_0x4ca46c[_0x4dc08e(0x1d3)](_0x4aac5c=>new Function(JSON[_0x4dc08e(0x245)](_0x4aac5c)));break;case'STR':_0x499ffb=_0x15dd87[_0x121b0f]!==''?String(_0x15dd87[_0x121b0f]):'';break;case _0x4dc08e(0x1c2):_0x4ca46c=_0x15dd87[_0x121b0f]!==''?JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f]):[],_0x499ffb=_0x4ca46c['map'](_0x2adb3d=>String(_0x2adb3d));break;case'STRUCT':_0x52140d=_0x15dd87[_0x121b0f]!==''?JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f]):{},_0x499ffb=VisuMZ['ConvertParams']({},_0x52140d);break;case'ARRAYSTRUCT':_0x4ca46c=_0x15dd87[_0x121b0f]!==''?JSON[_0x4dc08e(0x245)](_0x15dd87[_0x121b0f]):[],_0x499ffb=_0x4ca46c[_0x4dc08e(0x1d3)](_0xdddeaf=>VisuMZ[_0x4dc08e(0x256)]({},JSON['parse'](_0xdddeaf)));break;default:continue;}_0x54d5c9[_0x3547f8]=_0x499ffb;}}return _0x54d5c9;},(_0x3a811e=>{const _0x1fa8fb=_0x92128,_0x45ced4=_0x3a811e['name'];for(const _0x108516 of dependencies){if(!Imported[_0x108516]){if(_0x1fa8fb(0x191)!==_0x1fa8fb(0x191)){let _0x1deac8=this[_0x1fa8fb(0x1c5)]['_hue']+_0x4f49af;_0x1deac8%=0x168,this[_0x1fa8fb(0x1c5)]['setHue'](_0x1deac8);}else{alert(_0x1fa8fb(0x200)[_0x1fa8fb(0x166)](_0x45ced4,_0x108516)),SceneManager[_0x1fa8fb(0x15e)]();break;}}}const _0x11dd0b=_0x3a811e[_0x1fa8fb(0x228)];if(_0x11dd0b[_0x1fa8fb(0x240)](/\[Version[ ](.*?)\]/i)){if(_0x1fa8fb(0x1b2)!==_0x1fa8fb(0x1b2))_0x117d4c[_0x1fa8fb(0x1ae)][_0x1fa8fb(0x1d5)][_0x1fa8fb(0x1a0)](this,_0xabb5ce),this[_0x1fa8fb(0x157)](_0x793a43,!![]);else{const _0x3715cf=Number(RegExp['$1']);if(_0x3715cf!==VisuMZ[label][_0x1fa8fb(0x21c)]){if(_0x1fa8fb(0x199)==='pQpTm'){if(!this[_0x1fa8fb(0x218)]())return;if(this['_visualStateAnimationRepeatDuration']>0x0){this[_0x1fa8fb(0x268)]--;return;}const _0x59f17b=this['_battler']['getVisualRepeatingStateAnimation'](),_0x1ae97b=this[_0x1fa8fb(0x1d8)][_0x1fa8fb(0x15d)]();if(_0x59f17b[_0x1fa8fb(0x1f3)]<=0x0)return;this['_visualStateAnimationIndex']>=_0x59f17b[_0x1fa8fb(0x1f3)]&&(this[_0x1fa8fb(0x1f0)]=0x0);const _0x5d04bd=_0x59f17b[this[_0x1fa8fb(0x1f0)]],_0x1160cb=_0xdf81c1[_0x1fa8fb(0x1ae)][_0x1fa8fb(0x201)]['State'],_0x18db50=[this[_0x1fa8fb(0x1d8)]],_0x21acf1=_0x1160cb[_0x1fa8fb(0x186)],_0xecd550=_0x1160cb[_0x1fa8fb(0x1f6)];_0x4b20a9[_0x1fa8fb(0x18d)](_0x18db50,_0x5d04bd,_0x21acf1,_0xecd550);const _0x1875d0=_0x1ae97b[this[_0x1fa8fb(0x1f0)]]||_0x1160cb[_0x1fa8fb(0x1a6)];this[_0x1fa8fb(0x268)]=_0x1875d0,this[_0x1fa8fb(0x1f0)]++;}else alert(_0x1fa8fb(0x22d)['format'](_0x45ced4,_0x3715cf)),SceneManager[_0x1fa8fb(0x15e)]();}}}if(_0x11dd0b['match'](/\[Tier[ ](\d+)\]/i)){const _0x46a635=Number(RegExp['$1']);if(_0x46a635<tier)alert(_0x1fa8fb(0x272)[_0x1fa8fb(0x166)](_0x45ced4,_0x46a635,tier)),SceneManager[_0x1fa8fb(0x15e)]();else{if(_0x1fa8fb(0x18a)!==_0x1fa8fb(0x18a))return this[_0x1fa8fb(0x207)]=_0x20dcfa(_0x14dbeb['$1'])[_0x1fa8fb(0x202)]()[_0x1fa8fb(0x23b)](),0x4;else tier=Math[_0x1fa8fb(0x22a)](_0x46a635,tier);}}VisuMZ[_0x1fa8fb(0x256)](VisuMZ[label][_0x1fa8fb(0x201)],_0x3a811e[_0x1fa8fb(0x20b)]);})(pluginData),VisuMZ[_0x92128(0x1ae)][_0x92128(0x262)]=Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x19e)],Game_BattlerBase['prototype'][_0x92128(0x19e)]=function(){const _0x4d9cbb=_0x92128;this[_0x4d9cbb(0x1ad)]={},VisuMZ[_0x4d9cbb(0x1ae)][_0x4d9cbb(0x262)][_0x4d9cbb(0x1a0)](this);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x198)]=Game_BattlerBase[_0x92128(0x21a)]['refresh'],Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x1ba)]=function(){const _0x35c689=_0x92128;this['_cache']={},VisuMZ[_0x35c689(0x1ae)][_0x35c689(0x198)][_0x35c689(0x1a0)](this);},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x206)]=function(_0x18980e){const _0x56e724=_0x92128;return this[_0x56e724(0x1ad)]=this[_0x56e724(0x1ad)]||{},this[_0x56e724(0x1ad)][_0x18980e]!==undefined;},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1d5)]=Game_BattlerBase[_0x92128(0x21a)]['increaseBuff'],Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x18c)]=function(_0x719a57){const _0xa2758=_0x92128;VisuMZ[_0xa2758(0x1ae)]['Game_BattlerBase_increaseBuff'][_0xa2758(0x1a0)](this,_0x719a57),this[_0xa2758(0x157)](_0x719a57,!![]);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x226)]=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase[_0x92128(0x21a)]['decreaseBuff']=function(_0x358987){const _0x288f6e=_0x92128;VisuMZ[_0x288f6e(0x1ae)][_0x288f6e(0x226)]['call'](this,_0x358987),this[_0x288f6e(0x157)](_0x358987,![]);},Game_BattlerBase[_0x92128(0x21a)]['setupVisualBuffDebuffEffect']=function(_0x9b8a99,_0x1a3d24){const _0x36eb26=_0x92128;if(!SceneManager[_0x36eb26(0x164)]())return;if(!this[_0x36eb26(0x23e)]())return;const _0x2f0ff2=VisuMZ['VisualStateEffects'][_0x36eb26(0x201)]['BuffDebuff'],_0x44e73b=_0x1a3d24?_0x36eb26(0x192):_0x36eb26(0x1e7);_0x2f0ff2[_0x36eb26(0x1a1)]&&this[_0x36eb26(0x23e)]()[_0x36eb26(0x25e)](_0x9b8a99,_0x1a3d24);if(_0x2f0ff2['ShowAnimations']){const _0x21839f=[this],_0x1d56c6=_0x2f0ff2['%1%2Animation'['format'](_0x44e73b,_0x9b8a99)]||0x0,_0x34ccdb=_0x2f0ff2[_0x36eb26(0x1a7)],_0x8e36ec=_0x2f0ff2['AnimationMute'];$gameTemp['requestFauxAnimation'](_0x21839f,_0x1d56c6,_0x34ccdb,_0x8e36ec);}},Game_BattlerBase['prototype'][_0x92128(0x194)]=function(_0x1f7f39,_0x116ba9){const _0x16d7ac=_0x92128;if(!SceneManager[_0x16d7ac(0x164)]())return;if(_0x1f7f39===this[_0x16d7ac(0x263)]())return;if(_0x116ba9&&!this[_0x16d7ac(0x249)](_0x1f7f39))return;if(!_0x116ba9&&this['isStateAffected'](_0x1f7f39))return;if(!this['battler']())return;const _0x1e1281=VisuMZ[_0x16d7ac(0x1ae)]['Settings']['State'],_0x1dfe4d=$dataStates[_0x1f7f39];if(!_0x1dfe4d)return;if(_0x1e1281[_0x16d7ac(0x1a1)]&&!_0x1dfe4d['note'][_0x16d7ac(0x240)](/<HIDE STATE POPUP>/i)){if(_0x16d7ac(0x23d)!=='GIrbb')this[_0x16d7ac(0x23e)]()[_0x16d7ac(0x165)](_0x1f7f39,_0x116ba9);else{if(!_0x27b28e[_0x16d7ac(0x181)]()&&!_0xa352e2[_0x16d7ac(0x1be)]())return this[_0x16d7ac(0x220)](_0x594054[_0x16d7ac(0x207)]);}}VisuMZ[_0x16d7ac(0x1ae)]['setupStateAnimation'](this,_0x1dfe4d,_0x116ba9);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x253)]=function(_0xb950b6,_0x162bbe,_0x4e69a4){const _0xd5c916=_0x92128,_0x510d43=VisuMZ['VisualStateEffects']['Settings'][_0xd5c916(0x1e6)],_0x919668=_0x510d43[_0xd5c916(0x1a7)],_0x1173ef=_0x510d43['AnimationMute'],_0x22c12d=_0x162bbe[_0xd5c916(0x180)];if(_0x4e69a4&&_0x22c12d['match'](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x137ee8=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0xb950b6],_0x137ee8,_0x919668,_0x1173ef);}if(!_0x4e69a4&&_0x22c12d[_0xd5c916(0x240)](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x122c05=Number(RegExp['$1']);$gameTemp[_0xd5c916(0x18d)]([_0xb950b6],_0x122c05,_0x919668,_0x1173ef);}},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x222)]=function(){const _0x563388=_0x92128,_0xdec8ee=_0x563388(0x1de);if(this[_0x563388(0x206)](_0xdec8ee))return this[_0x563388(0x1ad)][_0xdec8ee];return this['_cache'][_0xdec8ee]=this[_0x563388(0x270)](),this[_0x563388(0x1ad)][_0xdec8ee];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x270)]=function(){const _0x566d89=_0x92128;let _0x3f9cab=[];for(const _0x32f932 of this[_0x566d89(0x182)]()){if(_0x566d89(0x18e)!=='ighsp')_0x11a575[_0x566d89(0x1ae)][_0x566d89(0x26d)]['call'](this),this[_0x566d89(0x1cf)]();else{if(!_0x32f932)continue;_0x32f932[_0x566d89(0x180)][_0x566d89(0x240)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&(_0x566d89(0x15a)!==_0x566d89(0x1e8)?_0x3f9cab[_0x566d89(0x1ee)](Number(RegExp['$1'])||0x0):(_0x221c18[_0x566d89(0x1ae)]['Sprite_Actor_update'][_0x566d89(0x1a0)](this),this[_0x566d89(0x1c3)]()));}}return _0x3f9cab;},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x15d)]=function(){const _0x44fd89=_0x92128,_0x31c6f1=_0x44fd89(0x209);if(this[_0x44fd89(0x206)](_0x31c6f1))return this[_0x44fd89(0x1ad)][_0x31c6f1];return this[_0x44fd89(0x1ad)][_0x31c6f1]=this['createVisualRepeatingStateAnimationCycle'](),this[_0x44fd89(0x1ad)][_0x31c6f1];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x261)]=function(){const _0x2cd176=_0x92128;let _0x24008b=[];for(const _0x2eefb of this[_0x2cd176(0x182)]()){if(!_0x2eefb)continue;_0x2eefb[_0x2cd176(0x180)][_0x2cd176(0x240)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)?_0x24008b[_0x2cd176(0x1ee)](Number(RegExp['$1'])||0x0):_0x2cd176(0x19a)!==_0x2cd176(0x21b)?_0x24008b[_0x2cd176(0x1ee)](VisuMZ[_0x2cd176(0x1ae)][_0x2cd176(0x201)][_0x2cd176(0x1e6)][_0x2cd176(0x1a6)]):_0xd4c241[_0x2cd176(0x254)][_0x2cd176(0x1ee)](0x0);}return _0x24008b;},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x16f)]=function(){const _0x5664a2=_0x92128,_0x1016d2=_0x5664a2(0x16f);if(this['checkCacheKey'](_0x1016d2))return this[_0x5664a2(0x1ad)][_0x1016d2];return this[_0x5664a2(0x1ad)][_0x1016d2]=this['getStateMotionIndex'](),this[_0x5664a2(0x1ad)][_0x1016d2];},Game_BattlerBase['prototype']['getStateMotionIndex']=function(){const _0x4056b7=_0x92128,_0x23aa90=this[_0x4056b7(0x182)]();for(const _0x136b87 of _0x23aa90){if(!_0x136b87)continue;if(_0x136b87[_0x4056b7(0x180)][_0x4056b7(0x240)](/<STATE MOTION:[ ](.*)>/i)){if('SIYCV'==='SIYCV')return this['_customStateMotion']=String(RegExp['$1'])['toLowerCase']()['trim'](),0x4;else{if(!_0x3ef4eb[_0x4056b7(0x164)]())return;if(_0x523bfc===this['deathStateId']())return;if(_0x2e09b3&&!this[_0x4056b7(0x249)](_0x26d825))return;if(!_0x1bf432&&this[_0x4056b7(0x249)](_0x18fcae))return;if(!this[_0x4056b7(0x23e)]())return;const _0x570b4c=_0x1a7fcd[_0x4056b7(0x1ae)][_0x4056b7(0x201)][_0x4056b7(0x1e6)],_0x454cdb=_0xbad055[_0x2d04ca];if(!_0x454cdb)return;_0x570b4c[_0x4056b7(0x1a1)]&&!_0x454cdb[_0x4056b7(0x180)][_0x4056b7(0x240)](/<HIDE STATE POPUP>/i)&&this['battler']()[_0x4056b7(0x165)](_0x540ddf,_0x1f1d6),_0x33d469['VisualStateEffects'][_0x4056b7(0x253)](this,_0x454cdb,_0x1cfec8);}}else{if(_0x136b87[_0x4056b7(0x23c)]!==0x0){if(_0x4056b7(0x24b)!=='UZpRi'){if(this['constructor']!==_0x1e800c)return;this[_0x4056b7(0x1b1)]=new _0x32c1cd(),this[_0x4056b7(0x179)](this[_0x4056b7(0x1b1)]),this[_0x4056b7(0x1b1)]['bitmap'][_0x4056b7(0x1dc)]=![];}else return _0x136b87['motion'];}}}return 0x0;},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x25a)]=function(){const _0x1e2e2f=_0x92128,_0x18eacc='stateMotionLock';if(this[_0x1e2e2f(0x206)](_0x18eacc))return this[_0x1e2e2f(0x1ad)][_0x18eacc];return this['_cache'][_0x18eacc]=this[_0x1e2e2f(0x250)](),this[_0x1e2e2f(0x1ad)][_0x18eacc];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x250)]=function(){const _0x1802c5=_0x92128,_0x4da5ed=this['states']();for(const _0x4ce70d of _0x4da5ed){if('TUcgR'!==_0x1802c5(0x1b5))this[_0x1802c5(0x268)]=0x0,this['_visualStateAnimationIndex']=0x0;else{if(!_0x4ce70d)continue;if(_0x4ce70d[_0x1802c5(0x180)][_0x1802c5(0x240)](/<STATE MOTION (?:LOCK|LOCKED)>/i))return!![];}}return![];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x243)]=function(){const _0x53f90c=_0x92128,_0x5b9f6b='stateOverlayIndex';if(this['checkCacheKey'](_0x5b9f6b))return this[_0x53f90c(0x1ad)][_0x5b9f6b];return this[_0x53f90c(0x1ad)][_0x5b9f6b]=this[_0x53f90c(0x214)](),this[_0x53f90c(0x1ad)][_0x5b9f6b];},Game_BattlerBase[_0x92128(0x21a)]['getStateOverlayIndex']=function(){const _0x6c45ac=_0x92128,_0x1b2fb1=this['states']();for(const _0x4b3e23 of _0x1b2fb1){if(!_0x4b3e23)continue;if(_0x4b3e23['overlay']!==0x0)return _0x4b3e23[_0x6c45ac(0x1fc)];}return 0x0;},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x190)]=function(){const _0x3f494d=_0x92128,_0x289b6d=_0x3f494d(0x1bb);if(this['checkCacheKey'](_0x289b6d))return this['_cache'][_0x289b6d];return this['_cache'][_0x289b6d]=this[_0x3f494d(0x24c)](),this['_cache'][_0x289b6d];},Game_BattlerBase['prototype']['createVisualStateTone']=function(){const _0x5f5867=_0x92128;for(const _0x2f1f37 of this[_0x5f5867(0x182)]()){if(_0x5f5867(0x204)===_0x5f5867(0x204)){if(!_0x2f1f37)continue;if(_0x2f1f37[_0x5f5867(0x180)]['match'](/<STATE TONE:[ ](.*)>/i)){if(_0x5f5867(0x1cb)==='gPMUF'){let _0x7fd9e1=String(RegExp['$1'])[_0x5f5867(0x23b)]()['split'](',')[_0x5f5867(0x1d3)](_0x54a2cc=>Number(_0x54a2cc)||0x0);while(_0x7fd9e1[_0x5f5867(0x1f3)]<0x4)_0x7fd9e1[_0x5f5867(0x1ee)](0x0);return _0x7fd9e1[0x0]=_0x7fd9e1[0x0][_0x5f5867(0x17f)](-0xff,0xff),_0x7fd9e1[0x1]=_0x7fd9e1[0x1][_0x5f5867(0x17f)](-0xff,0xff),_0x7fd9e1[0x2]=_0x7fd9e1[0x2][_0x5f5867(0x17f)](-0xff,0xff),_0x7fd9e1[0x3]=_0x7fd9e1[0x3][_0x5f5867(0x17f)](0x0,0xff),_0x7fd9e1;}else _0xacee0e[_0x5f5867(0x156)]=![];}}else{const _0x17768e=_0x5a69d7(_0x110016['$1']);_0x43158f['requestFauxAnimation']([_0x1a9f5d],_0x17768e,_0x137077,_0x505deb);}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x21d)]=function(){const _0x5b5b2c=_0x92128,_0x3c8f0a=_0x5b5b2c(0x21d);if(this[_0x5b5b2c(0x206)](_0x3c8f0a))return this[_0x5b5b2c(0x1ad)][_0x3c8f0a];return this[_0x5b5b2c(0x1ad)][_0x3c8f0a]=this['createVisualHoveringData'](),this[_0x5b5b2c(0x1ad)][_0x3c8f0a];},Game_BattlerBase[_0x92128(0x21a)]['createVisualHoveringData']=function(){const _0x4da0f9=_0x92128,_0x5d301d=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x2d379b={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0x2a06b3 of this[_0x4da0f9(0x215)]()){if(_0x4da0f9(0x229)!==_0x4da0f9(0x229))_0x10b023[_0x4da0f9(0x1a2)]=_0x2abfcd(_0x311b79['$1'])||0x0;else{if(!_0x2a06b3)continue;if(_0x2a06b3[_0x4da0f9(0x180)][_0x4da0f9(0x240)](_0x5d301d)){_0x2d379b[_0x4da0f9(0x264)]=!![];const _0x13bd5e=String(RegExp['$1']);_0x13bd5e['match'](/BASE:[ ](.*)/i)&&(_0x4da0f9(0x1ec)!=='oySxd'?_0x2d379b[_0x4da0f9(0x16a)]=Number(RegExp['$1'])||0x0:(this[_0x4da0f9(0x1ad)]={},_0x1333e5[_0x4da0f9(0x1ae)]['Game_BattlerBase_initMembers'][_0x4da0f9(0x1a0)](this)));_0x13bd5e[_0x4da0f9(0x240)](/SPEED:[ ](.*)/i)&&(_0x2d379b[_0x4da0f9(0x1af)]=Number(RegExp['$1'])||0x0);_0x13bd5e[_0x4da0f9(0x240)](/RATE:[ ](.*)/i)&&(_0x2d379b['rate']=Number(RegExp['$1'])||0x0);if(_0x13bd5e[_0x4da0f9(0x240)](/DEATH: HOVER/i)){if(_0x4da0f9(0x24e)===_0x4da0f9(0x24e))_0x2d379b[_0x4da0f9(0x156)]=!![];else return this[_0x4da0f9(0x1d0)]||this;}else _0x13bd5e['match'](/DEATH: FLOOR/i)&&(_0x2d379b[_0x4da0f9(0x156)]=![]);break;}}}return _0x2d379b;},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x1a8)]=function(){const _0x43ce49=_0x92128,_0x274470=_0x43ce49(0x1a8);if(this[_0x43ce49(0x206)](_0x274470))return this['_cache'][_0x274470];const _0x77daef=this[_0x43ce49(0x215)]();return this[_0x43ce49(0x1ad)][_0x274470]=_0x77daef[_0x43ce49(0x1bf)](_0x2fd2d1=>_0x2fd2d1&&_0x2fd2d1[_0x43ce49(0x180)]['match'](/<NO (?:BREATH|BREATHING)>/i)),this[_0x43ce49(0x1ad)][_0x274470];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x246)]=function(){const _0x548df8=_0x92128,_0x48b89c=_0x548df8(0x246);if(this[_0x548df8(0x206)](_0x48b89c))return this[_0x548df8(0x1ad)][_0x48b89c];return this[_0x548df8(0x1ad)][_0x48b89c]=this[_0x548df8(0x1f7)](),this['_cache'][_0x48b89c];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x1f7)]=function(){const _0x28c22c=_0x92128,_0x1bdc63=/<VISUAL (?:BREATH|BREATHING) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:BREATH|BREATHING) EFFECT>/i,_0x2cdfc6={'breathing':![],'speedX':0xa,'speedY':0xa,'rateX':0x0,'rateY':0.02,'hpLinked':![]};for(const _0xc7f230 of this['traitObjects']()){if(_0x28c22c(0x1cd)===_0x28c22c(0x1eb))_0xa83bce[_0x28c22c(0x183)]=![];else{if(!_0xc7f230)continue;if(_0xc7f230[_0x28c22c(0x180)]['match'](_0x1bdc63)){_0x2cdfc6[_0x28c22c(0x231)]=!![];const _0x5798d5=String(RegExp['$1']);if(_0x5798d5[_0x28c22c(0x240)](/SPEED:[ ](.*)/i)){if(_0x28c22c(0x1b4)===_0x28c22c(0x195)){if(!_0x2ae7c1[_0x28c22c(0x181)]()&&!_0x1b68be[_0x28c22c(0x1be)]())return this['startMotion'](_0xf4fbec['_customStateMotion']);}else _0x2cdfc6[_0x28c22c(0x269)]=Number(RegExp['$1'])||0x0,_0x2cdfc6['speedY']=Number(RegExp['$1'])||0x0;}if(_0x5798d5[_0x28c22c(0x240)](/(?:SPEEDX|SPEED X):[ ](.*)/i)){if(_0x28c22c(0x174)==='SgMdW')_0x2cdfc6['speedX']=Number(RegExp['$1'])||0x0;else{if(this[_0x28c22c(0x1e9)]===_0x29b725)return 0x0;if(!this['_battler'])return 0x0;if(this['_battler'][_0x28c22c(0x19b)]&&this[_0x28c22c(0x1d8)][_0x28c22c(0x19b)]())return 0x0;const _0x34c674=this[_0x28c22c(0x1d8)][_0x28c22c(0x21d)]();let _0x4e4e3d=0x0;this['_hoverRand']=this['_hoverRand']||_0x156b8a[_0x28c22c(0x169)](_0x20aa48[_0x28c22c(0x16d)]()*0x2710);const _0x437118=_0x460de2[_0x28c22c(0x17a)]+this[_0x28c22c(0x236)],_0x541a06=_0x34c674[_0x28c22c(0x1af)],_0xf58b22=_0x34c674['rate'];let _0xb0c350=_0x34c674[_0x28c22c(0x264)];if(_0xb0c350&&this[_0x28c22c(0x1d8)][_0x28c22c(0x1f4)]())_0xb0c350=_0x34c674['deathHover'];if(_0xb0c350){_0x4e4e3d+=_0x5a9ac9[_0x28c22c(0x184)](_0x437118/(_0x541a06||0x1))*_0xf58b22,_0x4e4e3d+=_0x34c674[_0x28c22c(0x16a)];if(this[_0x28c22c(0x1e3)]<0x0)this[_0x28c22c(0x1e3)]=_0x4e4e3d;const _0x593f08=this[_0x28c22c(0x1e3)]+_0x541a06/_0x5afa7b[_0x28c22c(0x22a)](0x1,_0xf58b22**1.5);this[_0x28c22c(0x1e3)]=_0x5e449f['min'](_0x593f08,_0x4e4e3d);}else{const _0x250bed=this[_0x28c22c(0x1e3)]-_0x541a06/_0x2e8837[_0x28c22c(0x22a)](0x1,_0xf58b22/0x2);this[_0x28c22c(0x1e3)]=_0x1b59af[_0x28c22c(0x22a)](_0x250bed,0x0);}return _0xdda4cd[_0x28c22c(0x22a)](0x0,this['_hoverMinimum']);}}_0x5798d5[_0x28c22c(0x240)](/(?:SPEEDY|SPEED Y):[ ](.*)/i)&&(_0x2cdfc6[_0x28c22c(0x1a2)]=Number(RegExp['$1'])||0x0);_0x5798d5[_0x28c22c(0x240)](/RATE:[ ](.*)/i)&&(_0x2cdfc6['rateX']=Number(RegExp['$1'])||0x0,_0x2cdfc6['rateY']=Number(RegExp['$1'])||0x0);_0x5798d5[_0x28c22c(0x240)](/(?:RATEX|RATE X):[ ](.*)/i)&&(_0x28c22c(0x26f)!=='eMgdc'?this['_distortionSprite'][_0x28c22c(0x187)]=_0x5a3849[_0x28c22c(0x1ce)](this[_0x28c22c(0x1c5)][_0x28c22c(0x187)]+_0x1b6ae4,_0x372309):_0x2cdfc6[_0x28c22c(0x211)]=Number(RegExp['$1'])||0x0);if(_0x5798d5['match'](/(?:RATEY|RATE Y):[ ](.*)/i)){if(_0x28c22c(0x257)!=='uAUDi')_0x2cdfc6[_0x28c22c(0x248)]=Number(RegExp['$1'])||0x0;else{if(this[_0x28c22c(0x1d8)][_0x28c22c(0x25a)]()&&this[_0x28c22c(0x1d0)]&&this[_0x28c22c(0x1d0)][_0x28c22c(0x20f)]){if(this[_0x28c22c(0x1d4)])return;this[_0x28c22c(0x1d4)]=this[_0x28c22c(0x1d0)][_0x28c22c(0x1c8)]['width']>0x0;}else this['_stateMotionLocked']=![];_0x260a69[_0x28c22c(0x1ae)][_0x28c22c(0x20c)][_0x28c22c(0x1a0)](this);}}if(_0x5798d5[_0x28c22c(0x240)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): ON/i))_0x2cdfc6[_0x28c22c(0x183)]=!![];else _0x5798d5['match'](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): OFF/i)&&(_0x2cdfc6[_0x28c22c(0x183)]=![]);break;}}}return _0x2cdfc6;},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1df)]=Game_Battler[_0x92128(0x21a)][_0x92128(0x21e)],Game_Battler[_0x92128(0x21a)][_0x92128(0x21e)]=function(_0x4ec71f){const _0x23658e=_0x92128;VisuMZ[_0x23658e(0x1ae)]['Game_Battler_onAddState'][_0x23658e(0x1a0)](this,_0x4ec71f),this[_0x23658e(0x194)](_0x4ec71f,!![]);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x16b)]=Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x25c)],Game_BattlerBase[_0x92128(0x21a)]['die']=function(){const _0x416c92=_0x92128;this['_die_bypass_visualStateEffects']=!![],VisuMZ[_0x416c92(0x1ae)][_0x416c92(0x16b)]['call'](this),this[_0x416c92(0x20a)]=undefined;},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1fe)]=Game_Battler[_0x92128(0x21a)]['onRemoveState'],Game_Battler['prototype']['onRemoveState']=function(_0x3b33c5){const _0x1bc397=_0x92128;if(!this[_0x1bc397(0x20a)])this[_0x1bc397(0x194)](_0x3b33c5,![]);VisuMZ[_0x1bc397(0x1ae)][_0x1bc397(0x1fe)][_0x1bc397(0x1a0)](this,_0x3b33c5);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x23f)]=Sprite_Battler[_0x92128(0x21a)][_0x92128(0x19e)],Sprite_Battler['prototype'][_0x92128(0x19e)]=function(){const _0x477e5e=_0x92128;VisuMZ[_0x477e5e(0x1ae)]['Sprite_Battler_initMembers']['call'](this),this[_0x477e5e(0x1ac)](),this[_0x477e5e(0x1ff)]();},Sprite_Battler['prototype']['initVisualStateEffects']=function(){const _0x1c60c4=_0x92128;this[_0x1c60c4(0x268)]=0x0,this['_visualStateAnimationIndex']=0x0;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x25e)]=function(_0x2ffaad,_0x149a79){const _0x339409=_0x92128,_0x4506cc=VisuMZ[_0x339409(0x1ae)]['Settings'][_0x339409(0x1a5)],_0x2817eb=_0x149a79?_0x339409(0x192):_0x339409(0x1e7),_0x4622a4=_0x149a79?Game_BattlerBase[_0x339409(0x227)]:Game_BattlerBase[_0x339409(0x267)],_0x28a4d9=_0x4622a4+_0x2ffaad,_0x398a88=TextManager['param'](_0x2ffaad),_0x32fda8=_0x4506cc[_0x339409(0x22c)[_0x339409(0x166)](_0x2817eb)];if(_0x32fda8['length']<=0x0)return;let _0x9e856d=_0x32fda8['format'](_0x398a88);const _0x268a13={'textColor':_0x4506cc[_0x339409(0x177)['format'](_0x2817eb)]||0x0,'flashColor':_0x4506cc['%1FlashColor'[_0x339409(0x166)](_0x2817eb)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x4506cc[_0x339409(0x258)[_0x339409(0x166)](_0x2817eb)]||0x0},_0x349a26=ImageManager[_0x339409(0x20d)](_0x339409(0x1e5));_0x349a26[_0x339409(0x1ca)](this['setupIconTextPopup'][_0x339409(0x159)](this,_0x28a4d9,_0x9e856d,_0x268a13));},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x165)]=function(_0x1180a0,_0x17da20){const _0x46ee9a=_0x92128,_0x158f1a=VisuMZ[_0x46ee9a(0x1ae)]['Settings'][_0x46ee9a(0x1e6)],_0x5c1dcc=$dataStates[_0x1180a0];if(!_0x5c1dcc)return;const _0x2896ac=_0x17da20?_0x46ee9a(0x22f):_0x46ee9a(0x1e1),_0x1c24e1=_0x5c1dcc[_0x46ee9a(0x1db)];if(_0x1c24e1<=0x0)return;const _0x3ad031=_0x158f1a[_0x46ee9a(0x22c)[_0x46ee9a(0x166)](_0x2896ac)];if(_0x3ad031[_0x46ee9a(0x1f3)]<=0x0)return;let _0x156d71=_0x3ad031[_0x46ee9a(0x166)](_0x5c1dcc[_0x46ee9a(0x1a3)]);const _0x14883f={'textColor':_0x158f1a[_0x46ee9a(0x170)]||0x0,'flashColor':_0x158f1a['FlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x158f1a['FlashDuration']||0x0};_0x158f1a[_0x46ee9a(0x208)]&&(_0x46ee9a(0x17b)===_0x46ee9a(0x22e)?_0x57feb2['x']+=this['_battler']['battleUIOffsetX']():_0x14883f[_0x46ee9a(0x1da)]=ColorManager[_0x46ee9a(0x188)](_0x5c1dcc));VisuMZ[_0x46ee9a(0x1ae)]['customizeStatePopup'](_0x5c1dcc,_0x14883f);const _0x19e20c=ImageManager[_0x46ee9a(0x20d)](_0x46ee9a(0x1e5));_0x19e20c[_0x46ee9a(0x1ca)](this[_0x46ee9a(0x154)][_0x46ee9a(0x159)](this,_0x1c24e1,_0x156d71,_0x14883f));},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1cc)]=function(_0x46ab35,_0x28ce1e){const _0x3cf0fb=_0x92128,_0x462060=_0x46ab35[_0x3cf0fb(0x180)];if(_0x462060[_0x3cf0fb(0x240)](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x5b2e0e=String(RegExp['$1'])[_0x3cf0fb(0x23b)]()[_0x3cf0fb(0x244)](/[\r\n]+/);for(const _0x4e6040 of _0x5b2e0e){_0x4e6040[_0x3cf0fb(0x240)](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x28ce1e['textColor']=String(RegExp['$1'])['trim']());if(_0x4e6040[_0x3cf0fb(0x240)](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){if(_0x3cf0fb(0x1ed)===_0x3cf0fb(0x1ed)){_0x28ce1e['flashColor']=String(RegExp['$1'])[_0x3cf0fb(0x23b)]()[_0x3cf0fb(0x244)](',')['map'](_0x245f7a=>Number(_0x245f7a));while(_0x28ce1e[_0x3cf0fb(0x254)][_0x3cf0fb(0x1f3)]<=0x4){_0x28ce1e[_0x3cf0fb(0x254)][_0x3cf0fb(0x1ee)](0x0);};_0x28ce1e['flashDuration']=_0x28ce1e['flashDuration']||0x1;}else{const _0x419a8a=_0x318011[_0x3cf0fb(0x1ae)][_0x3cf0fb(0x201)]['State'],_0xc505a9=_0x419a8a['AnimationMirror'],_0x1a41c6=_0x419a8a['AnimationMute'],_0x186d3a=_0x4881f3[_0x3cf0fb(0x180)];if(_0x2f5666&&_0x186d3a[_0x3cf0fb(0x240)](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x4a55b7=_0x46ce8b(_0x513080['$1']);_0x44d3b5[_0x3cf0fb(0x18d)]([_0xcc4657],_0x4a55b7,_0xc505a9,_0x1a41c6);}if(!_0x1fced4&&_0x186d3a[_0x3cf0fb(0x240)](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x889461=_0x4e269a(_0x2b958b['$1']);_0x35cade[_0x3cf0fb(0x18d)]([_0x46374a],_0x889461,_0xc505a9,_0x1a41c6);}}}if(_0x4e6040[_0x3cf0fb(0x240)](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)){if(_0x3cf0fb(0x15c)!==_0x3cf0fb(0x15c)){const _0x15d692=[this],_0x29018=_0x1ed6cd[_0x3cf0fb(0x168)[_0x3cf0fb(0x166)](_0x4d795f,_0x280bb5)]||0x0,_0x515cd7=_0x41579a[_0x3cf0fb(0x1a7)],_0x27e77f=_0x1881e1['AnimationMute'];_0x1e63eb['requestFauxAnimation'](_0x15d692,_0x29018,_0x515cd7,_0x27e77f);}else _0x28ce1e[_0x3cf0fb(0x18b)]=Number(RegExp['$1']);}}}},Sprite_Battler[_0x92128(0x21a)]['updateRepeatingVisualStateAnimation']=function(){const _0x3416db=_0x92128;if(!this['isRepeatingVisualStateAnimationShown']())return;if(this['_visualStateAnimationRepeatDuration']>0x0){if(_0x3416db(0x205)!==_0x3416db(0x205))_0x3ad28f[_0x3416db(0x26b)]=_0x3503e8(_0x55a1a5['$1'])||0x0;else{this[_0x3416db(0x268)]--;return;}}const _0x54d0ee=this[_0x3416db(0x1d8)][_0x3416db(0x222)](),_0xa6b131=this[_0x3416db(0x1d8)][_0x3416db(0x15d)]();if(_0x54d0ee[_0x3416db(0x1f3)]<=0x0)return;this[_0x3416db(0x1f0)]>=_0x54d0ee[_0x3416db(0x1f3)]&&(this['_visualStateAnimationIndex']=0x0);const _0x403d89=_0x54d0ee[this[_0x3416db(0x1f0)]],_0x1649cc=VisuMZ[_0x3416db(0x1ae)][_0x3416db(0x201)][_0x3416db(0x1e6)],_0x22ff19=[this[_0x3416db(0x1d8)]],_0xdd5a32=_0x1649cc[_0x3416db(0x186)],_0x2cea9d=_0x1649cc[_0x3416db(0x1f6)];$gameTemp['requestFauxAnimation'](_0x22ff19,_0x403d89,_0xdd5a32,_0x2cea9d);const _0x1a23ff=_0xa6b131[this['_visualStateAnimationIndex']]||_0x1649cc[_0x3416db(0x1a6)];this[_0x3416db(0x268)]=_0x1a23ff,this[_0x3416db(0x1f0)]++;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x218)]=function(){const _0x5bdafc=_0x92128;if(!this[_0x5bdafc(0x1d8)])return![];if(!this['_battler'][_0x5bdafc(0x160)]())return![];if(!this['_battler'][_0x5bdafc(0x19f)]())return![];if(!this[_0x5bdafc(0x1d8)][_0x5bdafc(0x173)]())return![];if(this[_0x5bdafc(0x1e9)][_0x5bdafc(0x1a3)]===_0x5bdafc(0x189))return![];if(this[_0x5bdafc(0x187)]<=0x0)return![];return!![];},Sprite_Battler['prototype'][_0x92128(0x1c3)]=function(){const _0x44b04c=_0x92128;this[_0x44b04c(0x1b1)]&&this[_0x44b04c(0x230)]();if(this['_stateSprite']){if('OvdhJ'==='KlsOC'){_0x286f02[_0x44b04c(0x1ae)][_0x44b04c(0x1b3)][_0x44b04c(0x1a0)](this,_0x435ec3);if(this[_0x44b04c(0x1b1)])this[_0x44b04c(0x1b1)][_0x44b04c(0x25f)](_0x132ecc);}else this[_0x44b04c(0x15b)]();}this[_0x44b04c(0x172)](),this[_0x44b04c(0x21f)](),this[_0x44b04c(0x155)]();},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x230)]=function(){const _0x3d5482=_0x92128;if(!this[_0x3d5482(0x1d8)])return;const _0xdb646=VisuMZ['VisualStateEffects'][_0x3d5482(0x201)][_0x3d5482(0x210)],_0x1283d8=this['_stateIconSprite'];_0x1283d8[_0x3d5482(0x22b)]=this['_battler'][_0x3d5482(0x18f)]()?_0xdb646[_0x3d5482(0x178)]:_0xdb646[_0x3d5482(0x17e)];if(this[_0x3d5482(0x1d8)][_0x3d5482(0x18f)]()){_0x1283d8['x']=0x0;if(this['_battler']['battleUIOffsetX']){if(_0x3d5482(0x1d2)===_0x3d5482(0x1d2))_0x1283d8['x']+=this[_0x3d5482(0x1d8)][_0x3d5482(0x271)]();else{if(!this[_0x3d5482(0x1bd)])return;this[_0x3d5482(0x1d8)][_0x3d5482(0x25a)]()?this['_dragonbones'][_0x3d5482(0x1d7)][_0x3d5482(0x175)]=0x0:_0x51518b[_0x3d5482(0x1ae)]['Sprite_Battler_updateDragonbonesTimeScale'][_0x3d5482(0x1a0)](this);}}_0x1283d8['y']=-Math[_0x3d5482(0x221)]((this['height']+0x28)*0.9);_0x1283d8['y']<0x14-this['y']&&(_0x1283d8['y']=0x14-this['y']);if(this[_0x3d5482(0x1d8)][_0x3d5482(0x232)]){if(_0x3d5482(0x239)!==_0x3d5482(0x239)){if(!this[_0x3d5482(0x1d8)])return 0x0;if(this[_0x3d5482(0x1d8)][_0x3d5482(0x1a8)]())return 0x0;const _0x1f4d1e=this[_0x3d5482(0x1d8)][_0x3d5482(0x246)]();if(!_0x1f4d1e)return 0x0;if(!_0x1f4d1e[_0x3d5482(0x231)])return 0x0;let _0x19fb02=this['applyBreathingCalculations'](_0x1f4d1e,_0x1f4d1e['speedY'],_0x1f4d1e[_0x3d5482(0x248)]);return _0x19fb02;}else _0x1283d8['y']+=this[_0x3d5482(0x1d8)][_0x3d5482(0x232)]()-0x4;}}},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x15b)]=function(){const _0x4c520a=_0x92128;if(!this['_battler'])return;const _0x4343d2=VisuMZ[_0x4c520a(0x1ae)]['Settings'][_0x4c520a(0x210)],_0x4a128c=this[_0x4c520a(0x161)];_0x4a128c['visible']=this[_0x4c520a(0x1d8)][_0x4c520a(0x18f)]()?_0x4343d2['ActorOverlay']:_0x4343d2[_0x4c520a(0x1c4)];if(this[_0x4c520a(0x171)]){if(_0x4c520a(0x1b7)===_0x4c520a(0x158)){const _0x56676b=_0x4c520a(0x246);if(this[_0x4c520a(0x206)](_0x56676b))return this['_cache'][_0x56676b];return this[_0x4c520a(0x1ad)][_0x56676b]=this[_0x4c520a(0x1f7)](),this['_cache'][_0x56676b];}else this[_0x4c520a(0x171)][_0x4c520a(0x161)][_0x4c520a(0x22b)]=![];}this[_0x4c520a(0x1d8)][_0x4c520a(0x259)]()&&!this[_0x4c520a(0x1d8)][_0x4c520a(0x1aa)]()&&(this[_0x4c520a(0x1b1)]?_0x4a128c['y']=this[_0x4c520a(0x1b1)]['y']+_0x4a128c[_0x4c520a(0x224)]:_0x4c520a(0x167)==='WMmZI'?_0x138fcb[_0x4c520a(0x1ee)](_0x50dbc6(_0x27fa7f['$1'])||0x0):_0x4a128c['y']=-this[_0x4c520a(0x224)]+_0x4a128c[_0x4c520a(0x224)]);;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x21f)]=function(){const _0x68ce9c=_0x92128;if(!this[_0x68ce9c(0x1d8)])return;const _0x357a03=this[_0x68ce9c(0x247)](),_0x148333=this[_0x68ce9c(0x1d8)][_0x68ce9c(0x190)]();_0x357a03&&_0x357a03['setColorTone'](_0x148333),this[_0x68ce9c(0x1c0)]&&(_0x68ce9c(0x15f)===_0x68ce9c(0x1c6)?(_0x63e533[_0x68ce9c(0x1ae)][_0x68ce9c(0x1f8)][_0x68ce9c(0x1a0)](this),this['updateVisualStateEffects']()):this['_dragonbonesSpriteContainer'][_0x68ce9c(0x216)](_0x148333));},Sprite_Battler['prototype']['visualStateToneTargetSprite']=function(){const _0x260a15=_0x92128;return this[_0x260a15(0x1d0)]||this;},VisuMZ['VisualStateEffects']['Sprite_Battler_updateDragonbonesTimeScale']=Sprite_Battler[_0x92128(0x21a)][_0x92128(0x238)],Sprite_Battler[_0x92128(0x21a)][_0x92128(0x238)]=function(){const _0x10471c=_0x92128;if(!this[_0x10471c(0x1bd)])return;this[_0x10471c(0x1d8)][_0x10471c(0x25a)]()?this['_dragonbones'][_0x10471c(0x1d7)][_0x10471c(0x175)]=0x0:VisuMZ['VisualStateEffects']['Sprite_Battler_updateDragonbonesTimeScale'][_0x10471c(0x1a0)](this);},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x1ff)]=function(){const _0x1a176f=_0x92128;this[_0x1a176f(0x1e3)]=-0x1;},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1dd)]=Sprite_Battler['prototype'][_0x92128(0x1a4)],Sprite_Battler[_0x92128(0x21a)][_0x92128(0x1a4)]=function(){const _0x2cbccb=_0x92128;let _0x18a829=VisuMZ[_0x2cbccb(0x1ae)][_0x2cbccb(0x1dd)][_0x2cbccb(0x1a0)](this);return _0x18a829-=Math[_0x2cbccb(0x169)](this[_0x2cbccb(0x197)]()),_0x18a829;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x197)]=function(){const _0x1608f6=_0x92128;if(this[_0x1608f6(0x1e9)]===Sprite_SvEnemy)return 0x0;if(!this[_0x1608f6(0x1d8)])return 0x0;if(this['_battler'][_0x1608f6(0x19b)]&&this['_battler']['isBattlerGrounded']()){if(_0x1608f6(0x1fa)!==_0x1608f6(0x1fb))return 0x0;else{const _0x1d975c=_0x1608f6(0x212);if(this['checkCacheKey'](_0x1d975c))return this[_0x1608f6(0x1ad)][_0x1d975c];return this['_cache'][_0x1d975c]=this[_0x1608f6(0x1d1)](),this['_cache'][_0x1d975c];}}const _0x21fc9a=this[_0x1608f6(0x1d8)][_0x1608f6(0x21d)]();let _0x14cdc1=0x0;this[_0x1608f6(0x236)]=this['_hoverRand']||Math[_0x1608f6(0x169)](Math[_0x1608f6(0x16d)]()*0x2710);const _0x160012=Graphics['frameCount']+this[_0x1608f6(0x236)],_0x377b99=_0x21fc9a[_0x1608f6(0x1af)],_0x1d4a98=_0x21fc9a[_0x1608f6(0x26b)];let _0x1a9636=_0x21fc9a[_0x1608f6(0x264)];if(_0x1a9636&&this[_0x1608f6(0x1d8)][_0x1608f6(0x1f4)]())_0x1a9636=_0x21fc9a[_0x1608f6(0x156)];if(_0x1a9636){_0x14cdc1+=Math['cos'](_0x160012/(_0x377b99||0x1))*_0x1d4a98,_0x14cdc1+=_0x21fc9a[_0x1608f6(0x16a)];if(this[_0x1608f6(0x1e3)]<0x0)this['_hoverMinimum']=_0x14cdc1;const _0x41ce50=this[_0x1608f6(0x1e3)]+_0x377b99/Math[_0x1608f6(0x22a)](0x1,_0x1d4a98**1.5);this[_0x1608f6(0x1e3)]=Math[_0x1608f6(0x1ce)](_0x41ce50,_0x14cdc1);}else{const _0x8156df=this[_0x1608f6(0x1e3)]-_0x377b99/Math[_0x1608f6(0x22a)](0x1,_0x1d4a98/0x2);this[_0x1608f6(0x1e3)]=Math['max'](_0x8156df,0x0);}return Math['max'](0x0,this[_0x1608f6(0x1e3)]);},VisuMZ['VisualStateEffects']['Sprite_Battler_updateOpacity']=Sprite_Battler[_0x92128(0x21a)][_0x92128(0x19d)],Sprite_Battler[_0x92128(0x21a)]['updateOpacity']=function(){const _0x202a39=_0x92128;VisuMZ[_0x202a39(0x1ae)][_0x202a39(0x24f)][_0x202a39(0x1a0)](this),this[_0x202a39(0x217)]();},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x217)]=function(){const _0x34edb7=_0x92128;if(!this[_0x34edb7(0x1c5)])return;if(!this['_battler'])return;if(this[_0x34edb7(0x1e9)]===Sprite_SvEnemy)return;const _0x5eff54=this['_battler']['visualBattlerOpacity']();if(this[_0x34edb7(0x1c5)][_0x34edb7(0x187)]!==_0x5eff54){const _0x4f3f26=0x8;this[_0x34edb7(0x1c5)]['opacity']>_0x5eff54?this[_0x34edb7(0x1c5)]['opacity']=Math[_0x34edb7(0x22a)](this['_distortionSprite'][_0x34edb7(0x187)]-_0x4f3f26,_0x5eff54):'LIFuG'===_0x34edb7(0x1a9)?(_0x545cb5[_0x34edb7(0x1ae)]['Sprite_Battler_updateOpacity'][_0x34edb7(0x1a0)](this),this[_0x34edb7(0x217)]()):this['_distortionSprite']['opacity']=Math[_0x34edb7(0x1ce)](this[_0x34edb7(0x1c5)][_0x34edb7(0x187)]+_0x4f3f26,_0x5eff54);}},Game_BattlerBase['prototype']['visualBattlerOpacity']=function(){const _0x1c4389=_0x92128,_0x681e59=_0x1c4389(0x212);if(this[_0x1c4389(0x206)](_0x681e59))return this[_0x1c4389(0x1ad)][_0x681e59];return this[_0x1c4389(0x1ad)][_0x681e59]=this[_0x1c4389(0x1d1)](),this[_0x1c4389(0x1ad)][_0x681e59];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x1d1)]=function(){const _0x55b74d=_0x92128;for(const _0x577c1b of this['states']()){if(!_0x577c1b)continue;if(_0x577c1b['note']['match'](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x2b1957=Number(RegExp['$1'])*0.01;return Math[_0x55b74d(0x221)](_0x2b1957*0xff)['clamp'](0x0,0xff);}if(_0x577c1b[_0x55b74d(0x180)][_0x55b74d(0x240)](/<VISUAL OPACITY:[ ](\d+)>/i)){if(_0x55b74d(0x193)!=='otfVP')return Number(RegExp['$1'])[_0x55b74d(0x17f)](0x0,0xff);else _0x5480aa[_0x55b74d(0x1da)]=_0x3589f2[_0x55b74d(0x188)](_0x1f88e9);}}return 0xff;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x155)]=function(){const _0x32c68f=_0x92128;if(!this['_battler'])return;const _0x3f2e45=this[_0x32c68f(0x1d8)][_0x32c68f(0x17c)]();if(_0x3f2e45===0x0&&this['_distortionSprite'][_0x32c68f(0x24d)]!==0x0)this[_0x32c68f(0x1c5)][_0x32c68f(0x237)](0x0);else{if(_0x32c68f(0x225)===_0x32c68f(0x225)){let _0x5b763b=this[_0x32c68f(0x1c5)][_0x32c68f(0x24d)]+_0x3f2e45;_0x5b763b%=0x168,this[_0x32c68f(0x1c5)]['setHue'](_0x5b763b);}else{const _0x45b860=_0x321962(_0x33e53f['$1']);_0x387604[_0x32c68f(0x18d)]([_0x456d42],_0x45b860,_0x12d814,_0x35ef65);}}},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x17c)]=function(){const _0x4edc7a=_0x92128,_0x1796be='visualStateRainbow';if(this[_0x4edc7a(0x206)](_0x1796be))return this[_0x4edc7a(0x1ad)][_0x1796be];return this[_0x4edc7a(0x1ad)][_0x1796be]=this[_0x4edc7a(0x1c9)](),this['_cache'][_0x1796be];},Game_BattlerBase[_0x92128(0x21a)][_0x92128(0x1c9)]=function(){const _0x33fe19=_0x92128;for(const _0x58085f of this[_0x33fe19(0x182)]()){if('FjyvW'===_0x33fe19(0x1bc)){if(!_0x58085f)continue;if(_0x58085f[_0x33fe19(0x180)][_0x33fe19(0x240)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i)){if(_0x33fe19(0x1e0)!==_0x33fe19(0x1e0)){if(!this[_0x33fe19(0x20a)])this['setupVisualStateEffect'](_0x18085a,![]);_0x17c4e9[_0x33fe19(0x1ae)][_0x33fe19(0x1fe)][_0x33fe19(0x1a0)](this,_0x2a38c2);}else return Number(RegExp['$1']);}}else _0x33d091[_0x33fe19(0x1ae)][_0x33fe19(0x1c1)][_0x33fe19(0x1a0)](this);}return 0x0;},VisuMZ[_0x92128(0x1ae)]['Sprite_Battler_mainSpriteScaleX']=Sprite_Battler[_0x92128(0x21a)]['mainSpriteScaleX'],Sprite_Battler['prototype'][_0x92128(0x19c)]=function(){const _0x279d1=_0x92128;let _0xbaba8=VisuMZ[_0x279d1(0x1ae)][_0x279d1(0x1d6)][_0x279d1(0x1a0)](this);return _0xbaba8+=this[_0x279d1(0x251)](),_0xbaba8;},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1b0)]=Sprite_Battler['prototype'][_0x92128(0x176)],Sprite_Battler[_0x92128(0x21a)]['mainSpriteScaleY']=function(){const _0x5d33d0=_0x92128;let _0x46a721=VisuMZ['VisualStateEffects'][_0x5d33d0(0x1b0)]['call'](this);return _0x46a721+=this[_0x5d33d0(0x260)](),_0x46a721;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x251)]=function(){const _0x525fa1=_0x92128;if(!this[_0x525fa1(0x1d8)])return 0x0;if(this['_battler'][_0x525fa1(0x1a8)]())return 0x0;const _0x334981=this[_0x525fa1(0x1d8)]['breathingData']();if(!_0x334981)return 0x0;if(!_0x334981[_0x525fa1(0x231)])return 0x0;let _0xb8dac4=this[_0x525fa1(0x213)](_0x334981,_0x334981['speedX'],_0x334981['rateX']);const _0x35f048=this[_0x525fa1(0x1c5)]['scale']['x']>0x0?0x1:-0x1;return _0xb8dac4*_0x35f048;},Sprite_Battler[_0x92128(0x21a)][_0x92128(0x260)]=function(){const _0x3c594d=_0x92128;if(!this[_0x3c594d(0x1d8)])return 0x0;if(this[_0x3c594d(0x1d8)]['noBreathing']())return 0x0;const _0x9bdf54=this[_0x3c594d(0x1d8)][_0x3c594d(0x246)]();if(!_0x9bdf54)return 0x0;if(!_0x9bdf54['breathing'])return 0x0;let _0x5a6408=this['applyBreathingCalculations'](_0x9bdf54,_0x9bdf54[_0x3c594d(0x1a2)],_0x9bdf54['rateY']);return _0x5a6408;},Sprite_Battler['prototype']['applyBreathingCalculations']=function(_0x163ed3,_0x4e36dd,_0x26aa6f){const _0xc31769=_0x92128;this['_breathingRand']=this[_0xc31769(0x17d)]??Math[_0xc31769(0x241)](0x2710);let _0x2c4e48=Graphics[_0xc31769(0x17a)]+this[_0xc31769(0x17d)];return _0x163ed3[_0xc31769(0x183)]&&(_0xc31769(0x1c7)!==_0xc31769(0x25b)?_0x4e36dd/=this['_battler']['hpRate']():_0xeab81b['hpLinked']=!![]),Math[_0xc31769(0x184)](_0x2c4e48/_0x4e36dd)*_0x26aa6f;},VisuMZ['VisualStateEffects'][_0x92128(0x26d)]=Sprite_Actor[_0x92128(0x21a)][_0x92128(0x26e)],Sprite_Actor[_0x92128(0x21a)]['createStateSprite']=function(){const _0x3cba6e=_0x92128;VisuMZ['VisualStateEffects'][_0x3cba6e(0x26d)]['call'](this),this[_0x3cba6e(0x1cf)]();},Sprite_Actor[_0x92128(0x21a)][_0x92128(0x1cf)]=function(){const _0xa66b03=_0x92128;if(this[_0xa66b03(0x1e9)]!==Sprite_Actor)return;this[_0xa66b03(0x1b1)]=new Sprite_StateIcon(),this['addChild'](this[_0xa66b03(0x1b1)]),this[_0xa66b03(0x1b1)][_0xa66b03(0x20f)]['smooth']=![];},VisuMZ['VisualStateEffects'][_0x92128(0x233)]=Sprite_Actor[_0x92128(0x21a)]['refreshMotion'],Sprite_Actor[_0x92128(0x21a)][_0x92128(0x1ea)]=function(){const _0x25b96c=_0x92128,_0x59a4a0=this[_0x25b96c(0x163)];if(!_0x59a4a0)return;const _0x57c095=_0x59a4a0[_0x25b96c(0x16f)]();if(_0x57c095>=0x4){if(_0x25b96c(0x1f1)!==_0x25b96c(0x1f2)){if(!_0x59a4a0[_0x25b96c(0x181)]()&&!_0x59a4a0['isActing']()){if('dSSBC'!=='dSSBC')_0x5db636[_0x25b96c(0x269)]=_0x507e01(_0x3e4144['$1'])||0x0;else return this[_0x25b96c(0x220)](_0x59a4a0[_0x25b96c(0x207)]);}}else this[_0x25b96c(0x1b1)]?_0xc16a26['y']=this[_0x25b96c(0x1b1)]['y']+_0x42bb81[_0x25b96c(0x224)]:_0x5388a1['y']=-this['height']+_0x3e5e1e['height'];}VisuMZ[_0x25b96c(0x1ae)][_0x25b96c(0x233)]['call'](this);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x26a)]=Sprite_SvEnemy['prototype'][_0x92128(0x1ea)],Sprite_SvEnemy[_0x92128(0x21a)][_0x92128(0x1ea)]=function(){const _0x51ad66=_0x92128,_0x3d6b77=this[_0x51ad66(0x163)];if(!_0x3d6b77)return;const _0x582f22=_0x3d6b77['stateMotionIndex']();if(_0x582f22>=0x4){if(!_0x3d6b77['isInputting']()&&!_0x3d6b77[_0x51ad66(0x1be)]())return this[_0x51ad66(0x220)](_0x3d6b77[_0x51ad66(0x207)]);}VisuMZ['VisualStateEffects'][_0x51ad66(0x26a)]['call'](this);},VisuMZ[_0x92128(0x1ae)]['Sprite_Actor_setBattler']=Sprite_Actor[_0x92128(0x21a)][_0x92128(0x185)],Sprite_Actor[_0x92128(0x21a)]['setBattler']=function(_0x4dfeca){const _0x3a8010=_0x92128;VisuMZ[_0x3a8010(0x1ae)][_0x3a8010(0x1b3)]['call'](this,_0x4dfeca);if(this[_0x3a8010(0x1b1)])this['_stateIconSprite'][_0x3a8010(0x25f)](_0x4dfeca);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x242)]=Sprite_Actor['prototype']['update'],Sprite_Actor[_0x92128(0x21a)][_0x92128(0x16e)]=function(){const _0x2498d2=_0x92128;VisuMZ[_0x2498d2(0x1ae)]['Sprite_Actor_update'][_0x2498d2(0x1a0)](this),this[_0x2498d2(0x1c3)]();},VisuMZ[_0x92128(0x1ae)]['Sprite_Actor_updateFrame']=Sprite_Actor['prototype'][_0x92128(0x1d9)],Sprite_Actor[_0x92128(0x21a)]['updateFrame']=function(){const _0x12b19f=_0x92128;if(this[_0x12b19f(0x1d8)]['stateMotionLock']()&&this[_0x12b19f(0x1d0)]&&this[_0x12b19f(0x1d0)][_0x12b19f(0x20f)]){if(this[_0x12b19f(0x1d4)])return;this['_stateMotionLocked']=this[_0x12b19f(0x1d0)][_0x12b19f(0x1c8)][_0x12b19f(0x266)]>0x0;}else this[_0x12b19f(0x1d4)]=![];VisuMZ['VisualStateEffects'][_0x12b19f(0x20c)][_0x12b19f(0x1a0)](this);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x16c)]=Sprite_Enemy[_0x92128(0x21a)][_0x92128(0x1cf)],Sprite_Enemy[_0x92128(0x21a)][_0x92128(0x1cf)]=function(){const _0x5a0be4=_0x92128;this[_0x5a0be4(0x26e)](),VisuMZ[_0x5a0be4(0x1ae)]['Sprite_Enemy_createStateIconSprite']['call'](this);},Sprite_Enemy['prototype'][_0x92128(0x26e)]=function(){const _0x159294=_0x92128;this[_0x159294(0x161)]=new Sprite_StateOverlay(),this['addChild'](this['_stateSprite']);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x20e)]=Sprite_Enemy[_0x92128(0x21a)][_0x92128(0x185)],Sprite_Enemy[_0x92128(0x21a)][_0x92128(0x185)]=function(_0xbeccf7){const _0x3a3139=_0x92128;VisuMZ[_0x3a3139(0x1ae)]['Sprite_Enemy_setBattler']['call'](this,_0xbeccf7);if(this['_stateSprite'])this[_0x3a3139(0x161)][_0x3a3139(0x25f)](_0xbeccf7);},VisuMZ[_0x92128(0x1ae)][_0x92128(0x1f8)]=Sprite_Enemy[_0x92128(0x21a)]['update'],Sprite_Enemy[_0x92128(0x21a)]['update']=function(){const _0x294601=_0x92128;VisuMZ['VisualStateEffects'][_0x294601(0x1f8)][_0x294601(0x1a0)](this),this[_0x294601(0x1c3)]();};function _0x5a98(){const _0x343a6d=['TeXRr','visualStateRainbow','_breathingRand','EnemyStateIcon','clamp','note','isInputting','states','hpLinked','cos','setBattler','RepeatMirror','opacity','stateColor','Sprite_SvEnemy','UJKZo','flashDuration','increaseBuff','requestFauxAnimation','ighsp','isActor','getVisualStateTone','DmkCk','Buff','hEvkE','setupVisualStateEffect','hKnoJ','288312kIArPa','hoverHeight','Game_BattlerBase_refresh','tJJxk','aFMNw','isBattlerGrounded','mainSpriteScaleX','updateOpacity','initMembers','isAppeared','call','ShowPopups','speedY','name','extraPositionY','BuffDebuff','CycleTime','AnimationMirror','noBreathing','petqF','hasSvBattler','ARRAYEVAL','initVisualStateEffects','_cache','VisualStateEffects','speed','Sprite_Battler_mainSpriteScaleY','_stateIconSprite','DJSOq','Sprite_Actor_setBattler','TkfCr','TUcgR','status','YJrgK','ARRAYFUNC','includes','refresh','visualStateTone','FjyvW','_dragonbones','isActing','some','_dragonbonesSpriteContainer','Sprite_Battler_updateDragonbonesTimeScale','ARRAYSTR','updateVisualStateEffects','EnemyOverlay','_distortionSprite','hMzTL','WsomQ','_frame','createVisualStateRainbow','addLoadListener','gPMUF','customizeStatePopup','NkGaQ','min','createStateIconSprite','_mainSprite','createVisualBattlerOpacity','tzECJ','map','_stateMotionLocked','Game_BattlerBase_increaseBuff','Sprite_Battler_mainSpriteScaleX','animation','_battler','updateFrame','textColor','iconIndex','smooth','Sprite_Battler_extraPositionY','visualRepeatingStateAnimation','Game_Battler_onAddState','DBwNB','Erase','toUpperCase','_hoverMinimum','VisuMZ_1_SkillsStatesCore','IconSet','State','Debuff','dcJve','constructor','refreshMotion','nyOZx','QcqXG','VUUTR','push','ARRAYNUM','_visualStateAnimationIndex','LJRyR','KNNGQ','length','isDead','EVAL','RepeatMute','createVisualBreathingData','Sprite_Enemy_update','10wzWZci','yIGyW','Hbtvx','overlay','418274VledrB','Game_Battler_onRemoveState','initVisualHoverEffect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Settings','toLowerCase','3749912ZnOQno','njKKd','YJsnk','checkCacheKey','_customStateMotion','MatchTurnCountColor','visualRepeatingStateAniCycle','_die_bypass_visualStateEffects','parameters','Sprite_Actor_updateFrame','loadSystem','Sprite_Enemy_setBattler','bitmap','General','rateX','visualBattlerOpacity','applyBreathingCalculations','getStateOverlayIndex','traitObjects','setColorTone','updateDistortionOpacity','isRepeatingVisualStateAnimationShown','ARRAYJSON','prototype','mBVWG','version','hoverData','onAddState','updateVisualStateTone','startMotion','round','getVisualRepeatingStateAnimation','6199810uShbrY','height','jFbOf','Game_BattlerBase_decreaseBuff','ICON_BUFF_START','description','rvHAP','max','visible','%1PopupFmt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DlSZn','Add','updateVisualStateEffectsIcons','breathing','battleUIOffsetY','Sprite_Actor_refreshMotion','8598513UtRKLL','6KpzgRb','_hoverRand','setHue','updateDragonbonesTimeScale','lDpCK','6856038YuodCT','trim','motion','TBETo','battler','Sprite_Battler_initMembers','match','randomInt','Sprite_Actor_update','stateOverlayIndex','split','parse','breathingData','visualStateToneTargetSprite','rateY','isStateAffected','VisuMZ_0_CoreEngine','UZpRi','createVisualStateTone','_hue','sbRbD','Sprite_Battler_updateOpacity','getStateMotionLock','applyBreathingScaleX','33lTipjo','setupStateAnimation','flashColor','7707966HGqTWW','ConvertParams','pwYHt','%1FlashDuration','isEnemy','stateMotionLock','QAzCp','die','JSON','setupBuffDebuffPopup','setup','applyBreathingScaleY','createVisualRepeatingStateAnimationCycle','Game_BattlerBase_initMembers','deathStateId','hover','return\x200','width','ICON_DEBUFF_START','_visualStateAnimationRepeatDuration','speedX','Sprite_SvEnemy_refreshMotion','rate','filter','Sprite_Actor_createStateSprite','createStateSprite','eMgdc','createVisualRepeatingStateAnimation','battleUIOffsetX','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setupIconTextPopup','updateVisualStateRainbow','deathHover','setupVisualBuffDebuffEffect','czswC','bind','TgQUj','updateVisualStateEffectsOverlay','YKSQv','getVisualRepeatingStateAnimationCycle','exit','aTsAk','isSpriteVisible','_stateSprite','2lfEEZs','_actor','isSceneBattle','setupVisualStateEffectsPopup','format','IjUFr','%1%2Animation','floor','base','Game_BattlerBase_die','Sprite_Enemy_createStateIconSprite','random','update','stateMotionIndex','TextColor','_svBattlerSprite','updateRepeatingVisualStateAnimation','isAlive','SgMdW','timeScale','mainSpriteScaleY','%1TextColor','ActorStateIcon','addChild','frameCount'];_0x5a98=function(){return _0x343a6d;};return _0x5a98();}