//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.24] [VisualStateEffects]
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
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
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
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <Custom Overlay: filename>
 * 
 * - Used for: State Notetags
 * - For those who don't want to use the img/system/ folder's "States" image
 *   file and want something custom, this notetag will do exactly that.
 * - Custom state overlays will follow similar dimensions to the original
 *   States image:
 *   - Pixel Width: 768
 *   - Pixel Height: 96
 *   - Total Frames: 8
 *   - If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a state overlay found in the game project's img/system/ folder.
 *   - Do not include the file extension.
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
 *     Allow Duplicates?:
 *     - Allow duplicate state popups to appear with the same graphical frame?
 * 
 *     Battle End Popups?:
 *     - Show State Popup removal on battle end for battle state removal?
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
 * Plugin Parameters: Response Popup Settings
 * ============================================================================
 *
 * Popup settings for response-type state effects. These include counterattack,
 * magic reflection, and substitute.
 *
 * ---
 *
 * Counter Popup
 * 
 * Reflect Popup
 * 
 * Substitute Popup
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Icon Index:
 *   - What icon is used for this popup?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.24: March 20, 2025
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon state removal regarding hovering.
 *    Fix made by Irina. 
 * 
 * Version 1.23: December 19, 2024
 * * Documentation Update!
 * ** Updated targets <Repeat Animation: x> and <Repeat Animation Cycle: x>.
 * * Feature Update!
 * ** Expanded database targets for notetags: <Repeat Animation: x> and
 *    <Repeat Animation Cycle: x>.
 * *** From State Notetags only to Actor, Class, Skill, Weapon, Armor, Enemy,
 *     State Notetags
 * 
 * Version 1.22: October 17, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Response Popup Settings
 * **** Popup settings for response-type state effects (ie Counter, Reflect,
 *      Substitute).
 * **** See help file for more information.
 * 
 * Version 1.21: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > State Settings > Battle End Popups?
 * **** Show State Popup removal on battle end for battle state removal?
 * 
 * Version 1.20: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > State Settings > State Popups > Allow Duplicates?
 * **** Allow duplicate state popups to appear with the same graphical frame?
 * 
 * Version 1.19: March 16, 2023
 * * Compatibility Update!
 * ** Plugin is now updated for the recent changes made with the
 *    VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_2_DragonbonesUnion.
 * 
 * Version 1.17: September 29, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_3_VisualStateEffects.js to
 *    VisuMZ_3_VisualStateEffect.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_3_VisualStateEffects.js
 *    causes problems, but VisuMZ_3_VisualStateEffect.js is fine. Take note of
 *    this while you are updating.
 * 
 * Version 1.16: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state notetag added by Irina: <Custom Overlay: filename>
 * *** For those who don't want to use the img/system/ folder's "States" image
 *     file and want something custom, this notetag will do exactly that.
 * *** Custom state overlays will follow similar dimensions to the original
 *     States image: Pixel Width of 768, Pixel Height of 96, Total Frames of 8.
 * *** If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
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
 * @param CounterPopup:struct
 * @text Response Popup Settings
 * @parent State:struct
 * @type struct<CounterPopup>
 * @desc Popup settings for response-type state effects.
 * @default {"Counter":"","CounterPopupText:str":"COUNTER!","CounterIcon:num":"0","CounterTextColor:str":"0","CounterTextColorID:num":"0","CounterFlashColor:eval":"[255, 255, 255, 160]","CounterFlashDuration:num":"60","Reflect":"","ReflectPopupText:str":"REFLECT!","ReflectIcon:num":"0","ReflectTextColor:str":"0","ReflectTextColorID:num":"0","ReflectFlashColor:eval":"[255, 255, 255, 160]","ReflectFlashDuration:num":"60","Sub":"","SubPopupText:str":"COVER!","SubIcon:num":"0","SubTextColor:str":"0","SubTextColorID:num":"0","SubFlashColor:eval":"[255, 255, 255, 160]","SubFlashDuration:num":"60"}
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
 * @param AllowDupes:eval
 * @text Allow Duplicates?
 * @parent ShowPopups:eval
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow duplicate state popups to appear with the same graphical frame?
 * @default false
 *
 * @param BattleEndPopup:eval
 * @text Battle End Popups?
 * @parent ShowPopups:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show State Popup removal on battle end for battle state removal?
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
/* ----------------------------------------------------------------------------
 * Counter Popups Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CounterPopup:
 *
 * @param Counter
 * @text Counter Popup
 *
 * @param CounterPopupText:str
 * @text Text
 * @parent Counter
 * @desc Text displayed upon the effect activating.
 * @default COUNTER!
 *
 * @param CounterIcon:num
 * @text Icon Index
 * @parent Counter
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param CounterTextColor:str
 * @text Text Color
 * @parent Counter
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param CounterFlashColor:eval
 * @text Flash Color
 * @parent Counter
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param CounterFlashDuration:num
 * @text Flash Duration
 * @parent Counter
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Reflect
 * @text Reflect Popup
 *
 * @param ReflectPopupText:str
 * @text Text
 * @parent Reflect
 * @desc Text displayed upon the effect activating.
 * @default REFLECT!
 *
 * @param ReflectIcon:num
 * @text Icon Index
 * @parent Reflect
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param ReflectTextColor:str
 * @text Text Color
 * @parent Reflect
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ReflectFlashColor:eval
 * @text Flash Color
 * @parent Reflect
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param ReflectFlashDuration:num
 * @text Flash Duration
 * @parent Reflect
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Sub
 * @text Substitute Popup
 *
 * @param SubPopupText:str
 * @text Text
 * @parent Sub
 * @desc Text displayed upon the effect activating.
 * @default COVER!
 *
 * @param SubIcon:num
 * @text Icon Index
 * @parent Sub
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param SubTextColor:str
 * @text Text Color
 * @parent Sub
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SubFlashColor:eval
 * @text Flash Color
 * @parent Sub
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param SubFlashDuration:num
 * @text Flash Duration
 * @parent Sub
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x4a599a=_0x9e8b;function _0x31a3(){const _0x156ade=['motion','rate','Sprite_Battler_updateDragonbonesTimeScale','createVisualStateTone','updateVisualStateEffects','States','prototype','deathHover','setColorTone','updateFrame','randomInt','ICON_BUFF_START','visualRepeatingStateAniCycle','Sprite_StateOverlay_updateFrame','min','Sub','update','12rduKhH','createStateIconSprite','_customStateMotion','Sprite_Actor_updateFrame','clamp','Game_Battler_onRemoveState','_noDoublePopups','EVAL','string','Sprite_Enemy_update','state-%1-%2-%3','loadBitmap','IconSet','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Sprite_Battler_extraPositionY','BuffDebuff','_mainSprite','ConvertParams','visualStateTone','SetupResponsePopup','ARRAYNUM','breathingData','battleUIOffsetY','isAlive','format','die','bind','states','Settings','traitObjects','isActor','FlashColor','visualBattlerOpacity','Sprite_Actor_refreshMotion','applyBreathingScaleY','displayReflection','Sprite_Battler_playDragonbonesMotion','hoverHeight','getVisualRepeatingStateAnimation','createVisualHoveringData','11JTFWZG','ActorOverlay','AllowDupes','stateMotionLock','Sprite_Battler_initMembers','flashDuration','updateCustomOverlayFrame','_cache','isDead','Sprite_SvEnemy_refreshMotion','length','JSON','_battler','call','status','isBattlerGrounded','Debuff','visible','refreshMotion','Game_Battler_removeBattleStates','setupVisualStateEffect','Sprite_Battler_mainSpriteScaleY','visualRepeatingStateAnimation','toLowerCase','match','flashColor','ARRAYSTR','mainSpriteScaleY','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','cos','createStateSprite','scale','displayCounter','VisualStateEffects','setFrame','addLoadListener','_distortionSprite','initMembers','Game_BattlerBase_initMembers','582vKXwEP','textColor','BattleEndPopup','createVisualRepeatingStateAnimationCycle','setBattler','getStateMotionIndex','Sprite_Actor_createStateSprite','round','hpLinked','map','onRemoveState','_frame','isInputting','stateOverlayIndex','setupVisualStateEffectsPopup','parse','CycleTime','_stateIconSprite','updateVisualStateTone','applyBreathingScaleX','startMotion','push','filter','stateMotionIndex','createVisualBattlerOpacity','noBreathing','battler','bitmap','createVisualStateRainbow','mainSpriteScaleX','Game_Battler_onAddState','NUM','getStateMotionLock','trim','_visualStateAnimationIndex','_pattern','697173OshVaq','visualStateRainbow','_stateMotionLocked','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYJSON','stateColor','param','Sprite_StateOverlay_loadBitmap','State','timeScale','updateVisualStateRainbow','name','frameCount','hover','opacity','_hoverRand','%1TextColor','breathing','hoverData','random','idle','FlashDuration','ShowPopups','Game_BattlerBase_refresh','description','onAddState','AnimationMute','CounterPopup','isSceneBattle','exit','Game_BattlerBase_decreaseBuff','getStateOverlayIndex','Sprite_Battler_mainSpriteScaleX','iconIndex','return\x200','updateVisualStateEffectsOverlay','setupBuffDebuffPopup','_bitmapName','note','some','Sprite_Actor_update','%1FlashDuration','playDragonbonesMotion','updateVisualStateEffectsIcons','setupTextPopup','_die_bypass_visualStateEffects','constructor','parameters','General','3577420TwgzKD','battleUIOffsetX','setupStateAnimation','initVisualHoverEffect','updateRepeatingVisualStateAnimation','split','17362190SQrYNG','rateY','_loadingCustomOverlay','visualStateToneTargetSprite','856bdqCUT','setupVisualBuffDebuffEffect','width','speedY','createVisualRepeatingStateAnimation','_hoverMinimum','isActing','ActorStateIcon','_hue','rateX','extraPositionY','Sprite_Enemy_setBattler','671105NiGAHs','toUpperCase','onLoadDefaultOverlayBitmap','setupIconTextPopup','Window_BattleLog_displaySubstitute','AnimationMirror','Sprite_SvEnemy','speedX','38115EFukjB','Game_BattlerBase_increaseBuff','%1FlashColor','getVisualStateTone','base','overlay','getVisualRepeatingStateAnimationCycle','isRepeatingVisualStateAnimationShown','decreaseBuff','applyBreathingCalculations','_svBattlerSprite','displaySubstitute','Window_BattleLog_displayCounter','Buff','createVisualBreathingData','setup','max','%1CounterIcon','floor','concat','Sprite_Battler_updateOpacity','onLoadCustomOverlayBitmap','updateOpacity','Add','_show_battleRemovalStates','loadSystem','Window_BattleLog_displayReflection','Sprite_Actor_setBattler','4843120uzpRaR','_dragonbones','_stateSprite','_dragonbonesSpriteContainer','isStateAffected','ARRAYSTRUCT','14959oSfavp','FUNC','checkCacheKey','height','hasDragonbonesBattler','smooth','deathStateId','isAppeared','addChild','_overlayIndex','customizeStatePopup','Erase','_breathingRand','ARRAYFUNC','MatchTurnCountColor','%1PopupFmt','Sprite_Enemy_createStateIconSprite','setHue','version','VisuMZ_1_SkillsStatesCore','requestFauxAnimation','_actor','passiveStateObjects','includes','speed','updateDistortionOpacity','_visualStateAnimationRepeatDuration'];_0x31a3=function(){return _0x156ade;};return _0x31a3();}(function(_0x160e73,_0x44410a){const _0x10c68d=_0x9e8b,_0x43c782=_0x160e73();while(!![]){try{const _0x3d9241=-parseInt(_0x10c68d(0x226))/0x1+parseInt(_0x10c68d(0x27c))/0x2*(parseInt(_0x10c68d(0x1df))/0x3)+-parseInt(_0x10c68d(0x210))/0x4+-parseInt(_0x10c68d(0x24a))/0x5+parseInt(_0x10c68d(0x2cb))/0x6*(-parseInt(_0x10c68d(0x250))/0x7)+-parseInt(_0x10c68d(0x21a))/0x8*(-parseInt(_0x10c68d(0x22e))/0x9)+-parseInt(_0x10c68d(0x216))/0xa*(-parseInt(_0x10c68d(0x2a4))/0xb);if(_0x3d9241===_0x44410a)break;else _0x43c782['push'](_0x43c782['shift']());}catch(_0x17a411){_0x43c782['push'](_0x43c782['shift']());}}}(_0x31a3,0xcda61));function _0x9e8b(_0x3ac645,_0x5a0952){const _0x31a311=_0x31a3();return _0x9e8b=function(_0x9e8bdc,_0x22a139){_0x9e8bdc=_0x9e8bdc-0x1d3;let _0x5085ff=_0x31a311[_0x9e8bdc];return _0x5085ff;},_0x9e8b(_0x3ac645,_0x5a0952);}var label='VisualStateEffects',tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine','VisuMZ_1_BattleCore',_0x4a599a(0x263)],pluginData=$plugins[_0x4a599a(0x2e1)](function(_0x518d6b){const _0x1d12f0=_0x4a599a;return _0x518d6b[_0x1d12f0(0x2b2)]&&_0x518d6b[_0x1d12f0(0x1f7)][_0x1d12f0(0x267)]('['+label+']');})[0x0];VisuMZ[label][_0x4a599a(0x298)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x4a599a(0x28d)]=function(_0x39b0ff,_0x5959bf){const _0x14faa4=_0x4a599a;for(const _0x13636b in _0x5959bf){if(_0x13636b[_0x14faa4(0x2bc)](/(.*):(.*)/i)){const _0x4993a1=String(RegExp['$1']),_0x2d7c28=String(RegExp['$2'])[_0x14faa4(0x227)]()[_0x14faa4(0x1dc)]();let _0x1015ae,_0x395ec5,_0x344a45;switch(_0x2d7c28){case _0x14faa4(0x1da):_0x1015ae=_0x5959bf[_0x13636b]!==''?Number(_0x5959bf[_0x13636b]):0x0;break;case _0x14faa4(0x290):_0x395ec5=_0x5959bf[_0x13636b]!==''?JSON[_0x14faa4(0x2da)](_0x5959bf[_0x13636b]):[],_0x1015ae=_0x395ec5[_0x14faa4(0x2d4)](_0x3087ab=>Number(_0x3087ab));break;case _0x14faa4(0x283):_0x1015ae=_0x5959bf[_0x13636b]!==''?eval(_0x5959bf[_0x13636b]):null;break;case'ARRAYEVAL':_0x395ec5=_0x5959bf[_0x13636b]!==''?JSON[_0x14faa4(0x2da)](_0x5959bf[_0x13636b]):[],_0x1015ae=_0x395ec5[_0x14faa4(0x2d4)](_0x560ef5=>eval(_0x560ef5));break;case _0x14faa4(0x2af):_0x1015ae=_0x5959bf[_0x13636b]!==''?JSON[_0x14faa4(0x2da)](_0x5959bf[_0x13636b]):'';break;case _0x14faa4(0x1e3):_0x395ec5=_0x5959bf[_0x13636b]!==''?JSON['parse'](_0x5959bf[_0x13636b]):[],_0x1015ae=_0x395ec5[_0x14faa4(0x2d4)](_0x17fa81=>JSON[_0x14faa4(0x2da)](_0x17fa81));break;case _0x14faa4(0x251):_0x1015ae=_0x5959bf[_0x13636b]!==''?new Function(JSON[_0x14faa4(0x2da)](_0x5959bf[_0x13636b])):new Function(_0x14faa4(0x201));break;case _0x14faa4(0x25d):_0x395ec5=_0x5959bf[_0x13636b]!==''?JSON[_0x14faa4(0x2da)](_0x5959bf[_0x13636b]):[],_0x1015ae=_0x395ec5[_0x14faa4(0x2d4)](_0x1b25f6=>new Function(JSON['parse'](_0x1b25f6)));break;case'STR':_0x1015ae=_0x5959bf[_0x13636b]!==''?String(_0x5959bf[_0x13636b]):'';break;case _0x14faa4(0x2be):_0x395ec5=_0x5959bf[_0x13636b]!==''?JSON['parse'](_0x5959bf[_0x13636b]):[],_0x1015ae=_0x395ec5[_0x14faa4(0x2d4)](_0x12419a=>String(_0x12419a));break;case'STRUCT':_0x344a45=_0x5959bf[_0x13636b]!==''?JSON[_0x14faa4(0x2da)](_0x5959bf[_0x13636b]):{},_0x1015ae=VisuMZ[_0x14faa4(0x28d)]({},_0x344a45);break;case _0x14faa4(0x24f):_0x395ec5=_0x5959bf[_0x13636b]!==''?JSON['parse'](_0x5959bf[_0x13636b]):[],_0x1015ae=_0x395ec5[_0x14faa4(0x2d4)](_0x1bf9b0=>VisuMZ[_0x14faa4(0x28d)]({},JSON['parse'](_0x1bf9b0)));break;default:continue;}_0x39b0ff[_0x4993a1]=_0x1015ae;}}return _0x39b0ff;},(_0x420486=>{const _0x281453=_0x4a599a,_0x28d30d=_0x420486[_0x281453(0x1ea)];for(const _0x4e6747 of dependencies){if(!Imported[_0x4e6747]){alert(_0x281453(0x2c0)['format'](_0x28d30d,_0x4e6747)),SceneManager['exit']();break;}}const _0x198ffb=_0x420486[_0x281453(0x1f7)];if(_0x198ffb[_0x281453(0x2bc)](/\[Version[ ](.*?)\]/i)){const _0x3bf348=Number(RegExp['$1']);_0x3bf348!==VisuMZ[label][_0x281453(0x262)]&&(alert(_0x281453(0x289)[_0x281453(0x294)](_0x28d30d,_0x3bf348)),SceneManager[_0x281453(0x1fc)]());}if(_0x198ffb['match'](/\[Tier[ ](\d+)\]/i)){const _0x7904f=Number(RegExp['$1']);_0x7904f<tier?(alert(_0x281453(0x1e2)['format'](_0x28d30d,_0x7904f,tier)),SceneManager[_0x281453(0x1fc)]()):tier=Math[_0x281453(0x23e)](_0x7904f,tier);}VisuMZ[_0x281453(0x28d)](VisuMZ[label][_0x281453(0x298)],_0x420486[_0x281453(0x20e)]);})(pluginData),VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x2ca)]=Game_BattlerBase[_0x4a599a(0x271)]['initMembers'],Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x2c9)]=function(){const _0x29c15f=_0x4a599a;this[_0x29c15f(0x2ab)]={},VisuMZ[_0x29c15f(0x2c5)]['Game_BattlerBase_initMembers'][_0x29c15f(0x2b1)](this);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x1f6)]=Game_BattlerBase[_0x4a599a(0x271)]['refresh'],Game_BattlerBase[_0x4a599a(0x271)]['refresh']=function(){const _0x2570d5=_0x4a599a;this['_cache']={},VisuMZ[_0x2570d5(0x2c5)]['Game_BattlerBase_refresh'][_0x2570d5(0x2b1)](this);},Game_BattlerBase['prototype'][_0x4a599a(0x252)]=function(_0x3e7402){const _0x5b830c=_0x4a599a;return this[_0x5b830c(0x2ab)]=this['_cache']||{},this[_0x5b830c(0x2ab)][_0x3e7402]!==undefined;},VisuMZ['VisualStateEffects'][_0x4a599a(0x22f)]=Game_BattlerBase[_0x4a599a(0x271)]['increaseBuff'],Game_BattlerBase[_0x4a599a(0x271)]['increaseBuff']=function(_0x284778){const _0x4f5957=_0x4a599a;VisuMZ['VisualStateEffects'][_0x4f5957(0x22f)][_0x4f5957(0x2b1)](this,_0x284778),this['setupVisualBuffDebuffEffect'](_0x284778,!![]);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x1fd)]=Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x236)],Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x236)]=function(_0x5c8d22){const _0x46272e=_0x4a599a;VisuMZ[_0x46272e(0x2c5)][_0x46272e(0x1fd)][_0x46272e(0x2b1)](this,_0x5c8d22),this[_0x46272e(0x21b)](_0x5c8d22,![]);},Game_BattlerBase[_0x4a599a(0x271)]['setupVisualBuffDebuffEffect']=function(_0x37e2db,_0x5bfd1d){const _0x1ba4d0=_0x4a599a;if(!SceneManager[_0x1ba4d0(0x1fb)]())return;if(!this['battler']())return;const _0x5a0356=VisuMZ['VisualStateEffects'][_0x1ba4d0(0x298)][_0x1ba4d0(0x28b)],_0x162482=_0x5bfd1d?'Buff':_0x1ba4d0(0x2b4);_0x5a0356[_0x1ba4d0(0x1f5)]&&this[_0x1ba4d0(0x1d5)]()[_0x1ba4d0(0x203)](_0x37e2db,_0x5bfd1d);if(_0x5a0356['ShowAnimations']){const _0x1f1266=[this],_0x1646fe=_0x5a0356['%1%2Animation'[_0x1ba4d0(0x294)](_0x162482,_0x37e2db)]||0x0,_0x587804=_0x5a0356[_0x1ba4d0(0x22b)],_0xe90c79=_0x5a0356[_0x1ba4d0(0x1f9)];$gameTemp['requestFauxAnimation'](_0x1f1266,_0x1646fe,_0x587804,_0xe90c79);}},Game_BattlerBase[_0x4a599a(0x271)]['setupVisualStateEffect']=function(_0x3785f3,_0x509f4a){const _0xdc762a=_0x4a599a;if(!SceneManager[_0xdc762a(0x1fb)]())return;if(_0x3785f3===this[_0xdc762a(0x256)]())return;if(_0x509f4a&&!this[_0xdc762a(0x24e)](_0x3785f3))return;if(!_0x509f4a&&this[_0xdc762a(0x24e)](_0x3785f3))return;if(!this['battler']())return;const _0x3f5350=VisuMZ[_0xdc762a(0x2c5)][_0xdc762a(0x298)][_0xdc762a(0x1e7)],_0x38e814=$dataStates[_0x3785f3];if(!_0x38e814)return;_0x3f5350[_0xdc762a(0x1f5)]&&!_0x38e814[_0xdc762a(0x205)][_0xdc762a(0x2bc)](/<HIDE STATE POPUP>/i)&&this[_0xdc762a(0x1d5)]()[_0xdc762a(0x2d9)](_0x3785f3,_0x509f4a),VisuMZ[_0xdc762a(0x2c5)]['setupStateAnimation'](this,_0x38e814,_0x509f4a);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x212)]=function(_0x5114d8,_0x3d57f1,_0xa8336e){const _0x5ed4e6=_0x4a599a,_0x1120ca=VisuMZ['VisualStateEffects'][_0x5ed4e6(0x298)][_0x5ed4e6(0x1e7)],_0x4b4083=_0x1120ca[_0x5ed4e6(0x22b)],_0x14139f=_0x1120ca['AnimationMute'],_0x363945=_0x3d57f1[_0x5ed4e6(0x205)];if(_0xa8336e&&_0x363945[_0x5ed4e6(0x2bc)](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x4b93c0=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0x5114d8],_0x4b93c0,_0x4b4083,_0x14139f);}if(!_0xa8336e&&_0x363945[_0x5ed4e6(0x2bc)](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x412abe=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0x5114d8],_0x412abe,_0x4b4083,_0x14139f);}},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x2a2)]=function(){const _0x2798dc=_0x4a599a,_0x3327ce=_0x2798dc(0x2ba);if(this[_0x2798dc(0x252)](_0x3327ce))return this[_0x2798dc(0x2ab)][_0x3327ce];return this[_0x2798dc(0x2ab)][_0x3327ce]=this[_0x2798dc(0x21e)](),this[_0x2798dc(0x2ab)][_0x3327ce];},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x21e)]=function(){const _0x1279e1=_0x4a599a;let _0x1bfa85=[];const _0xa1914c=this[_0x1279e1(0x266)]?this['passiveStateObjects']()[_0x1279e1(0x241)](this[_0x1279e1(0x297)]()):this[_0x1279e1(0x299)]();for(const _0x2adb1b of _0xa1914c){if(!_0x2adb1b)continue;_0x2adb1b[_0x1279e1(0x205)][_0x1279e1(0x2bc)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0x1bfa85[_0x1279e1(0x2e0)](Number(RegExp['$1'])||0x0);}return _0x1bfa85;},Game_BattlerBase['prototype'][_0x4a599a(0x234)]=function(){const _0xea9ca=_0x4a599a,_0x12b25f=_0xea9ca(0x277);if(this[_0xea9ca(0x252)](_0x12b25f))return this[_0xea9ca(0x2ab)][_0x12b25f];return this[_0xea9ca(0x2ab)][_0x12b25f]=this[_0xea9ca(0x2ce)](),this[_0xea9ca(0x2ab)][_0x12b25f];},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x2ce)]=function(){const _0x2a04e0=_0x4a599a;let _0x4b3051=[];const _0x571041=this[_0x2a04e0(0x266)]?this['passiveStateObjects']()[_0x2a04e0(0x241)](this['states']()):this['traitObjects']();for(const _0x27971e of _0x571041){if(!_0x27971e)continue;_0x27971e[_0x2a04e0(0x205)][_0x2a04e0(0x2bc)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&(_0x27971e[_0x2a04e0(0x205)][_0x2a04e0(0x2bc)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)?_0x4b3051['push'](Number(RegExp['$1'])||0x0):_0x4b3051['push'](VisuMZ[_0x2a04e0(0x2c5)]['Settings'][_0x2a04e0(0x1e7)][_0x2a04e0(0x2db)]));}return _0x4b3051;},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x2e2)]=function(){const _0x3cc20d=_0x4a599a,_0x577126='stateMotionIndex';if(this[_0x3cc20d(0x252)](_0x577126))return this['_cache'][_0x577126];return this['_cache'][_0x577126]=this[_0x3cc20d(0x2d0)](),this[_0x3cc20d(0x2ab)][_0x577126];},Game_BattlerBase['prototype'][_0x4a599a(0x2d0)]=function(){const _0x402239=_0x4a599a,_0x537c2a=this['states']();for(const _0x598abc of _0x537c2a){if(!_0x598abc)continue;if(_0x598abc[_0x402239(0x205)][_0x402239(0x2bc)](/<STATE MOTION:[ ](.*)>/i))return this[_0x402239(0x27e)]=String(RegExp['$1'])[_0x402239(0x2bb)]()[_0x402239(0x1dc)](),0x4;else{if(_0x598abc[_0x402239(0x26b)]!==0x0)return _0x598abc['motion'];}}return 0x0;},Game_BattlerBase['prototype'][_0x4a599a(0x2a7)]=function(){const _0x23348f=_0x4a599a,_0x286f74=_0x23348f(0x2a7);if(this[_0x23348f(0x252)](_0x286f74))return this[_0x23348f(0x2ab)][_0x286f74];return this['_cache'][_0x286f74]=this[_0x23348f(0x1db)](),this[_0x23348f(0x2ab)][_0x286f74];},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x1db)]=function(){const _0x3e7627=_0x4a599a,_0x4f5965=this[_0x3e7627(0x297)]();for(const _0x20098c of _0x4f5965){if(!_0x20098c)continue;if(_0x20098c[_0x3e7627(0x205)][_0x3e7627(0x2bc)](/<STATE MOTION (?:LOCK|LOCKED)>/i))return!![];}return![];},Game_BattlerBase['prototype'][_0x4a599a(0x2d8)]=function(){const _0x255378=_0x4a599a,_0x379c61=_0x255378(0x2d8);if(this[_0x255378(0x252)](_0x379c61))return this[_0x255378(0x2ab)][_0x379c61];return this[_0x255378(0x2ab)][_0x379c61]=this['getStateOverlayIndex'](),this[_0x255378(0x2ab)][_0x379c61];},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x1fe)]=function(){const _0x69c07=_0x4a599a,_0x41f7b0=this[_0x69c07(0x297)]();for(const _0x1ee7cb of _0x41f7b0){if(!_0x1ee7cb)continue;if(_0x1ee7cb[_0x69c07(0x205)]['match'](/<CUSTOM OVERLAY:[ ](.*)>/i))return String(RegExp['$1']);if(_0x1ee7cb[_0x69c07(0x233)]!==0x0)return _0x1ee7cb[_0x69c07(0x233)];}return 0x0;},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x231)]=function(){const _0x144445=_0x4a599a,_0x20666e=_0x144445(0x28e);if(this[_0x144445(0x252)](_0x20666e))return this[_0x144445(0x2ab)][_0x20666e];return this[_0x144445(0x2ab)][_0x20666e]=this['createVisualStateTone'](),this[_0x144445(0x2ab)][_0x20666e];},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x26e)]=function(){const _0x1d5928=_0x4a599a;for(const _0x357c2c of this['states']()){if(!_0x357c2c)continue;if(_0x357c2c[_0x1d5928(0x205)][_0x1d5928(0x2bc)](/<STATE TONE:[ ](.*)>/i)){let _0x4923ca=String(RegExp['$1'])[_0x1d5928(0x1dc)]()[_0x1d5928(0x215)](',')[_0x1d5928(0x2d4)](_0x150c59=>Number(_0x150c59)||0x0);while(_0x4923ca[_0x1d5928(0x2ae)]<0x4)_0x4923ca[_0x1d5928(0x2e0)](0x0);return _0x4923ca[0x0]=_0x4923ca[0x0]['clamp'](-0xff,0xff),_0x4923ca[0x1]=_0x4923ca[0x1]['clamp'](-0xff,0xff),_0x4923ca[0x2]=_0x4923ca[0x2][_0x1d5928(0x280)](-0xff,0xff),_0x4923ca[0x3]=_0x4923ca[0x3][_0x1d5928(0x280)](0x0,0xff),_0x4923ca;}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x4a599a(0x271)]['hoverData']=function(){const _0x3bd7d2=_0x4a599a,_0xd30c4d=_0x3bd7d2(0x1f1);if(this['checkCacheKey'](_0xd30c4d))return this[_0x3bd7d2(0x2ab)][_0xd30c4d];return this[_0x3bd7d2(0x2ab)][_0xd30c4d]=this[_0x3bd7d2(0x2a3)](),this[_0x3bd7d2(0x2ab)][_0xd30c4d];},Game_BattlerBase['prototype'][_0x4a599a(0x2a3)]=function(){const _0x1bc368=_0x4a599a,_0x2d5a62=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x27a5c5={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0xf3676a of this[_0x1bc368(0x299)]()){if(!_0xf3676a)continue;if(_0xf3676a[_0x1bc368(0x205)][_0x1bc368(0x2bc)](_0x2d5a62)){_0x27a5c5['hover']=!![];const _0x510ef8=String(RegExp['$1']);_0x510ef8[_0x1bc368(0x2bc)](/BASE:[ ](.*)/i)&&(_0x27a5c5[_0x1bc368(0x232)]=Number(RegExp['$1'])||0x0);_0x510ef8[_0x1bc368(0x2bc)](/SPEED:[ ](.*)/i)&&(_0x27a5c5[_0x1bc368(0x268)]=Number(RegExp['$1'])||0x0);_0x510ef8[_0x1bc368(0x2bc)](/RATE:[ ](.*)/i)&&(_0x27a5c5[_0x1bc368(0x26c)]=Number(RegExp['$1'])||0x0);if(_0x510ef8[_0x1bc368(0x2bc)](/DEATH: HOVER/i))_0x27a5c5[_0x1bc368(0x272)]=!![];else _0x510ef8[_0x1bc368(0x2bc)](/DEATH: FLOOR/i)&&(_0x27a5c5[_0x1bc368(0x272)]=![]);break;}}return _0x27a5c5;},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x1d4)]=function(){const _0x16c27f=_0x4a599a,_0x815c52=_0x16c27f(0x1d4);if(this[_0x16c27f(0x252)](_0x815c52))return this[_0x16c27f(0x2ab)][_0x815c52];const _0x185bd9=this[_0x16c27f(0x299)]();return this[_0x16c27f(0x2ab)][_0x815c52]=_0x185bd9[_0x16c27f(0x206)](_0x591896=>_0x591896&&_0x591896[_0x16c27f(0x205)][_0x16c27f(0x2bc)](/<NO (?:BREATH|BREATHING)>/i)),this[_0x16c27f(0x2ab)][_0x815c52];},Game_BattlerBase['prototype']['breathingData']=function(){const _0x58d512=_0x4a599a,_0x29b4fc=_0x58d512(0x291);if(this[_0x58d512(0x252)](_0x29b4fc))return this[_0x58d512(0x2ab)][_0x29b4fc];return this[_0x58d512(0x2ab)][_0x29b4fc]=this[_0x58d512(0x23c)](),this[_0x58d512(0x2ab)][_0x29b4fc];},Game_BattlerBase[_0x4a599a(0x271)]['createVisualBreathingData']=function(){const _0x3556dc=_0x4a599a,_0x16c90f=/<VISUAL (?:BREATH|BREATHING) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:BREATH|BREATHING) EFFECT>/i,_0x5732ad={'breathing':![],'speedX':0xa,'speedY':0xa,'rateX':0x0,'rateY':0.02,'hpLinked':![]};for(const _0x366aee of this[_0x3556dc(0x299)]()){if(!_0x366aee)continue;if(_0x366aee[_0x3556dc(0x205)][_0x3556dc(0x2bc)](_0x16c90f)){_0x5732ad['breathing']=!![];const _0x5cb667=String(RegExp['$1']);_0x5cb667[_0x3556dc(0x2bc)](/SPEED:[ ](.*)/i)&&(_0x5732ad['speedX']=Number(RegExp['$1'])||0x0,_0x5732ad['speedY']=Number(RegExp['$1'])||0x0);_0x5cb667['match'](/(?:SPEEDX|SPEED X):[ ](.*)/i)&&(_0x5732ad[_0x3556dc(0x22d)]=Number(RegExp['$1'])||0x0);_0x5cb667['match'](/(?:SPEEDY|SPEED Y):[ ](.*)/i)&&(_0x5732ad['speedY']=Number(RegExp['$1'])||0x0);_0x5cb667[_0x3556dc(0x2bc)](/RATE:[ ](.*)/i)&&(_0x5732ad[_0x3556dc(0x223)]=Number(RegExp['$1'])||0x0,_0x5732ad[_0x3556dc(0x217)]=Number(RegExp['$1'])||0x0);_0x5cb667[_0x3556dc(0x2bc)](/(?:RATEX|RATE X):[ ](.*)/i)&&(_0x5732ad[_0x3556dc(0x223)]=Number(RegExp['$1'])||0x0);_0x5cb667[_0x3556dc(0x2bc)](/(?:RATEY|RATE Y):[ ](.*)/i)&&(_0x5732ad[_0x3556dc(0x217)]=Number(RegExp['$1'])||0x0);if(_0x5cb667[_0x3556dc(0x2bc)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): ON/i))_0x5732ad['hpLinked']=!![];else _0x5cb667[_0x3556dc(0x2bc)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): OFF/i)&&(_0x5732ad[_0x3556dc(0x2d3)]=![]);break;}}return _0x5732ad;},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x1d9)]=Game_Battler[_0x4a599a(0x271)][_0x4a599a(0x1f8)],Game_Battler[_0x4a599a(0x271)][_0x4a599a(0x1f8)]=function(_0x54f992){const _0x18d0ad=_0x4a599a;VisuMZ[_0x18d0ad(0x2c5)][_0x18d0ad(0x1d9)][_0x18d0ad(0x2b1)](this,_0x54f992),this[_0x18d0ad(0x2b8)](_0x54f992,!![]);},VisuMZ['VisualStateEffects']['Game_BattlerBase_die']=Game_BattlerBase['prototype'][_0x4a599a(0x295)],Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x295)]=function(){const _0x34e08a=_0x4a599a;this['_die_bypass_visualStateEffects']=!![],VisuMZ[_0x34e08a(0x2c5)]['Game_BattlerBase_die'][_0x34e08a(0x2b1)](this),this[_0x34e08a(0x20c)]=undefined;},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x281)]=Game_Battler[_0x4a599a(0x271)][_0x4a599a(0x2d5)],Game_Battler[_0x4a599a(0x271)][_0x4a599a(0x2d5)]=function(_0xa04fec){const _0x2b2fc6=_0x4a599a;!this[_0x2b2fc6(0x20c)]&&this['_show_battleRemovalStates']!==![]&&this[_0x2b2fc6(0x2b8)](_0xa04fec,![]),VisuMZ[_0x2b2fc6(0x2c5)][_0x2b2fc6(0x281)][_0x2b2fc6(0x2b1)](this,_0xa04fec);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x2b7)]=Game_Battler['prototype']['removeBattleStates'],Game_Battler[_0x4a599a(0x271)]['removeBattleStates']=function(){const _0x3b0ce2=_0x4a599a;this[_0x3b0ce2(0x246)]=VisuMZ[_0x3b0ce2(0x2c5)][_0x3b0ce2(0x298)][_0x3b0ce2(0x1e7)][_0x3b0ce2(0x2cd)]??!![],VisuMZ[_0x3b0ce2(0x2c5)][_0x3b0ce2(0x2b7)]['call'](this),this[_0x3b0ce2(0x246)]=undefined;},VisuMZ[_0x4a599a(0x2c5)]['Sprite_Battler_initMembers']=Sprite_Battler[_0x4a599a(0x271)]['initMembers'],Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x2c9)]=function(){const _0x565703=_0x4a599a;VisuMZ[_0x565703(0x2c5)][_0x565703(0x2a8)][_0x565703(0x2b1)](this),this['initVisualStateEffects'](),this[_0x565703(0x213)]();},Sprite_Battler[_0x4a599a(0x271)]['initVisualStateEffects']=function(){const _0x19d891=_0x4a599a;this[_0x19d891(0x26a)]=0x0,this['_visualStateAnimationIndex']=0x0;},Sprite_Battler[_0x4a599a(0x271)]['setupBuffDebuffPopup']=function(_0x3bd054,_0x23df02){const _0x446200=_0x4a599a,_0x474bd8=VisuMZ[_0x446200(0x2c5)]['Settings'][_0x446200(0x28b)],_0x437bce=_0x23df02?_0x446200(0x23b):_0x446200(0x2b4),_0x193002=_0x23df02?Game_BattlerBase[_0x446200(0x276)]:Game_BattlerBase['ICON_DEBUFF_START'],_0x4d949b=_0x193002+_0x3bd054,_0x30e94e=TextManager[_0x446200(0x1e5)](_0x3bd054),_0x102933=_0x474bd8[_0x446200(0x25f)[_0x446200(0x294)](_0x437bce)];if(_0x102933[_0x446200(0x2ae)]<=0x0)return;let _0x506d6b=_0x102933[_0x446200(0x294)](_0x30e94e);const _0x44372c={'textColor':_0x474bd8[_0x446200(0x1ef)[_0x446200(0x294)](_0x437bce)]||0x0,'flashColor':_0x474bd8[_0x446200(0x230)[_0x446200(0x294)](_0x437bce)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x474bd8[_0x446200(0x208)[_0x446200(0x294)](_0x437bce)]||0x0},_0x24233c=ImageManager['loadSystem'](_0x446200(0x288));_0x24233c['addLoadListener'](this[_0x446200(0x229)][_0x446200(0x296)](this,_0x4d949b,_0x506d6b,_0x44372c));},Sprite_Battler['prototype'][_0x4a599a(0x2d9)]=function(_0x1174cc,_0x48533a){const _0x3317d4=_0x4a599a,_0x522302=VisuMZ[_0x3317d4(0x2c5)][_0x3317d4(0x298)][_0x3317d4(0x1e7)],_0x54b02c=$dataStates[_0x1174cc];if(!_0x54b02c)return;const _0x40c09d=_0x48533a?_0x3317d4(0x245):_0x3317d4(0x25b);this[_0x3317d4(0x282)]=this[_0x3317d4(0x282)]||{};if(!VisuMZ[_0x3317d4(0x2c5)][_0x3317d4(0x298)]['State'][_0x3317d4(0x2a6)]){const _0x34b2ef=_0x3317d4(0x286)['format'](_0x1174cc,_0x40c09d,Graphics[_0x3317d4(0x1eb)]);if(this[_0x3317d4(0x282)][_0x34b2ef])return;this[_0x3317d4(0x282)][_0x34b2ef]=!![];}const _0x2ffa7a=_0x54b02c[_0x3317d4(0x200)];if(_0x2ffa7a<=0x0)return;const _0x39537c=_0x522302[_0x3317d4(0x25f)[_0x3317d4(0x294)](_0x40c09d)];if(_0x39537c[_0x3317d4(0x2ae)]<=0x0)return;let _0x3c011f=_0x39537c['format'](_0x54b02c[_0x3317d4(0x1ea)]);const _0x43c961={'textColor':_0x522302['TextColor']||0x0,'flashColor':_0x522302[_0x3317d4(0x29b)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x522302[_0x3317d4(0x1f4)]||0x0};_0x522302[_0x3317d4(0x25e)]&&(_0x43c961[_0x3317d4(0x2cc)]=ColorManager[_0x3317d4(0x1e4)](_0x54b02c));VisuMZ['VisualStateEffects'][_0x3317d4(0x25a)](_0x54b02c,_0x43c961);const _0x6e7cbb=ImageManager['loadSystem'](_0x3317d4(0x288));_0x6e7cbb[_0x3317d4(0x2c7)](this[_0x3317d4(0x229)][_0x3317d4(0x296)](this,_0x2ffa7a,_0x3c011f,_0x43c961));},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x25a)]=function(_0x5c4902,_0x555b76){const _0x1a8f6e=_0x4a599a,_0xc9bbe8=_0x5c4902[_0x1a8f6e(0x205)];if(_0xc9bbe8[_0x1a8f6e(0x2bc)](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x5534d0=String(RegExp['$1'])[_0x1a8f6e(0x1dc)]()[_0x1a8f6e(0x215)](/[\r\n]+/);for(const _0x370040 of _0x5534d0){_0x370040[_0x1a8f6e(0x2bc)](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x555b76[_0x1a8f6e(0x2cc)]=String(RegExp['$1'])[_0x1a8f6e(0x1dc)]());if(_0x370040['match'](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){_0x555b76[_0x1a8f6e(0x2bd)]=String(RegExp['$1'])[_0x1a8f6e(0x1dc)]()['split'](',')[_0x1a8f6e(0x2d4)](_0x19ac72=>Number(_0x19ac72));while(_0x555b76[_0x1a8f6e(0x2bd)]['length']<=0x4){_0x555b76[_0x1a8f6e(0x2bd)][_0x1a8f6e(0x2e0)](0x0);};_0x555b76[_0x1a8f6e(0x2a9)]=_0x555b76[_0x1a8f6e(0x2a9)]||0x1;}_0x370040['match'](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x555b76[_0x1a8f6e(0x2a9)]=Number(RegExp['$1']));}}},Sprite_Battler[_0x4a599a(0x271)]['updateRepeatingVisualStateAnimation']=function(){const _0x3c357d=_0x4a599a;if(!this[_0x3c357d(0x235)]())return;if(this['_visualStateAnimationRepeatDuration']>0x0){this[_0x3c357d(0x26a)]--;return;}const _0x138585=this[_0x3c357d(0x2b0)]['getVisualRepeatingStateAnimation'](),_0x41d01e=this[_0x3c357d(0x2b0)][_0x3c357d(0x234)]();if(_0x138585[_0x3c357d(0x2ae)]<=0x0)return;this[_0x3c357d(0x1dd)]>=_0x138585['length']&&(this[_0x3c357d(0x1dd)]=0x0);const _0xd02b7c=_0x138585[this[_0x3c357d(0x1dd)]],_0x35ed1e=VisuMZ[_0x3c357d(0x2c5)][_0x3c357d(0x298)][_0x3c357d(0x1e7)],_0x36f803=[this[_0x3c357d(0x2b0)]],_0x18e41f=_0x35ed1e['RepeatMirror'],_0x5da81c=_0x35ed1e['RepeatMute'];$gameTemp[_0x3c357d(0x264)](_0x36f803,_0xd02b7c,_0x18e41f,_0x5da81c);const _0x487b8b=_0x41d01e[this[_0x3c357d(0x1dd)]]||_0x35ed1e[_0x3c357d(0x2db)];this[_0x3c357d(0x26a)]=_0x487b8b,this[_0x3c357d(0x1dd)]++;},Sprite_Battler['prototype']['isRepeatingVisualStateAnimationShown']=function(){const _0x57b552=_0x4a599a;if(!this[_0x57b552(0x2b0)])return![];if(!this[_0x57b552(0x2b0)]['isSpriteVisible']())return![];if(!this[_0x57b552(0x2b0)][_0x57b552(0x257)]())return![];if(!this[_0x57b552(0x2b0)][_0x57b552(0x293)]())return![];if(this[_0x57b552(0x20d)]['name']===_0x57b552(0x22c))return![];if(this[_0x57b552(0x1ed)]<=0x0)return![];return!![];},Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x26f)]=function(){const _0x526e2b=_0x4a599a;this[_0x526e2b(0x2dc)]&&this[_0x526e2b(0x20a)](),this[_0x526e2b(0x24c)]&&this[_0x526e2b(0x202)](),this[_0x526e2b(0x214)](),this[_0x526e2b(0x2dd)](),this[_0x526e2b(0x1e9)]();},Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x20a)]=function(){const _0x1cd45b=_0x4a599a;if(!this[_0x1cd45b(0x2b0)])return;const _0x14e5c4=VisuMZ['VisualStateEffects'][_0x1cd45b(0x298)][_0x1cd45b(0x20f)],_0x43b646=this[_0x1cd45b(0x2dc)];_0x43b646[_0x1cd45b(0x2b5)]=this[_0x1cd45b(0x2b0)]['isActor']()?_0x14e5c4[_0x1cd45b(0x221)]:_0x14e5c4['EnemyStateIcon'],this[_0x1cd45b(0x2b0)][_0x1cd45b(0x29a)]()&&(_0x43b646['x']=0x0,this[_0x1cd45b(0x2b0)][_0x1cd45b(0x211)]&&(_0x43b646['x']+=this['_battler'][_0x1cd45b(0x211)]()),_0x43b646['y']=-Math[_0x1cd45b(0x2d2)]((this[_0x1cd45b(0x253)]+0x28)*0.9),_0x43b646['y']<0x14-this['y']&&(_0x43b646['y']=0x14-this['y']),this[_0x1cd45b(0x2b0)][_0x1cd45b(0x292)]&&(_0x43b646['y']+=this['_battler'][_0x1cd45b(0x292)]()-0x4));},Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x202)]=function(){const _0x57ef63=_0x4a599a;if(!this[_0x57ef63(0x2b0)])return;const _0xdfca31=VisuMZ['VisualStateEffects'][_0x57ef63(0x298)]['General'],_0x29fbb8=this[_0x57ef63(0x24c)];_0x29fbb8[_0x57ef63(0x2b5)]=this[_0x57ef63(0x2b0)][_0x57ef63(0x29a)]()?_0xdfca31[_0x57ef63(0x2a5)]:_0xdfca31['EnemyOverlay'];this[_0x57ef63(0x238)]&&(this[_0x57ef63(0x238)]['_stateSprite'][_0x57ef63(0x2b5)]=![]);this['_battler']['isEnemy']()&&!this[_0x57ef63(0x2b0)]['hasSvBattler']()&&(this[_0x57ef63(0x2dc)]?_0x29fbb8['y']=this[_0x57ef63(0x2dc)]['y']+_0x29fbb8[_0x57ef63(0x253)]:_0x29fbb8['y']=-this[_0x57ef63(0x253)]+_0x29fbb8[_0x57ef63(0x253)]);;},Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x2dd)]=function(){const _0x54eed6=_0x4a599a;if(!this['_battler'])return;const _0x1d5d3e=this[_0x54eed6(0x219)](),_0x580918=this['_battler'][_0x54eed6(0x231)]();_0x1d5d3e&&_0x1d5d3e[_0x54eed6(0x273)](_0x580918),this[_0x54eed6(0x24d)]&&this[_0x54eed6(0x24d)][_0x54eed6(0x273)](_0x580918);},Sprite_Battler[_0x4a599a(0x271)]['visualStateToneTargetSprite']=function(){const _0xa078bf=_0x4a599a;return this[_0xa078bf(0x28c)]||this;},VisuMZ['VisualStateEffects'][_0x4a599a(0x26d)]=Sprite_Battler['prototype']['updateDragonbonesTimeScale'],Sprite_Battler[_0x4a599a(0x271)]['updateDragonbonesTimeScale']=function(){const _0x5ec0d1=_0x4a599a;if(!this[_0x5ec0d1(0x24b)])return;this[_0x5ec0d1(0x2b0)][_0x5ec0d1(0x2a7)]()?this['_dragonbones']['animation'][_0x5ec0d1(0x1e8)]=0x0:VisuMZ[_0x5ec0d1(0x2c5)][_0x5ec0d1(0x26d)]['call'](this);},Sprite_Battler['prototype'][_0x4a599a(0x213)]=function(){const _0x441537=_0x4a599a;this[_0x441537(0x21f)]=-0x1;},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x28a)]=Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x224)],Sprite_Battler['prototype'][_0x4a599a(0x224)]=function(){const _0x5e3e78=_0x4a599a;let _0x14455=VisuMZ[_0x5e3e78(0x2c5)][_0x5e3e78(0x28a)]['call'](this);return _0x14455-=Math[_0x5e3e78(0x240)](this[_0x5e3e78(0x2a1)]()),_0x14455;},Sprite_Battler['prototype']['hoverHeight']=function(){const _0x24f239=_0x4a599a;if(this[_0x24f239(0x20d)]===Sprite_SvEnemy)return 0x0;if(!this['_battler'])return 0x0;if(this['_battler'][_0x24f239(0x2b3)]&&this['_battler'][_0x24f239(0x2b3)]())return 0x0;const _0x4790a5=this[_0x24f239(0x2b0)][_0x24f239(0x1f1)]();if(!_0x4790a5)return;let _0x36998a=0x0;this['_hoverRand']=this[_0x24f239(0x1ee)]||Math[_0x24f239(0x240)](Math[_0x24f239(0x1f2)]()*0x2710);const _0x16dc1c=Graphics[_0x24f239(0x1eb)]+this['_hoverRand'],_0x1197bf=_0x4790a5[_0x24f239(0x268)],_0x13aad7=_0x4790a5[_0x24f239(0x26c)];let _0x36854a=_0x4790a5[_0x24f239(0x1ec)];if(_0x36854a&&this[_0x24f239(0x2b0)][_0x24f239(0x2ac)]())_0x36854a=_0x4790a5[_0x24f239(0x272)];if(_0x36854a){_0x36998a+=Math[_0x24f239(0x2c1)](_0x16dc1c/(_0x1197bf||0x1))*_0x13aad7,_0x36998a+=_0x4790a5[_0x24f239(0x232)];if(this[_0x24f239(0x21f)]<0x0)this[_0x24f239(0x21f)]=_0x36998a;const _0x264407=this[_0x24f239(0x21f)]+_0x1197bf/Math[_0x24f239(0x23e)](0x1,_0x13aad7**1.5);this['_hoverMinimum']=Math['min'](_0x264407,_0x36998a);}else{const _0x5236fd=this[_0x24f239(0x21f)]-_0x1197bf/Math['max'](0x1,_0x13aad7/0x2);this['_hoverMinimum']=Math[_0x24f239(0x23e)](_0x5236fd,0x0);}return Math['max'](0x0,this[_0x24f239(0x21f)]);},VisuMZ[_0x4a599a(0x2c5)]['Sprite_Battler_updateOpacity']=Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x244)],Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x244)]=function(){const _0xc55930=_0x4a599a;VisuMZ[_0xc55930(0x2c5)][_0xc55930(0x242)][_0xc55930(0x2b1)](this),this[_0xc55930(0x269)]();},Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x269)]=function(){const _0x5cdbb4=_0x4a599a;if(!this[_0x5cdbb4(0x2c8)])return;if(!this['_battler'])return;if(this['constructor']===Sprite_SvEnemy)return;const _0x379916=this[_0x5cdbb4(0x2b0)][_0x5cdbb4(0x29c)]();if(this[_0x5cdbb4(0x2c8)][_0x5cdbb4(0x1ed)]!==_0x379916){const _0x38a9a0=0x8;this[_0x5cdbb4(0x2c8)]['opacity']>_0x379916?this[_0x5cdbb4(0x2c8)][_0x5cdbb4(0x1ed)]=Math[_0x5cdbb4(0x23e)](this['_distortionSprite']['opacity']-_0x38a9a0,_0x379916):this[_0x5cdbb4(0x2c8)][_0x5cdbb4(0x1ed)]=Math[_0x5cdbb4(0x279)](this[_0x5cdbb4(0x2c8)][_0x5cdbb4(0x1ed)]+_0x38a9a0,_0x379916);}},Game_BattlerBase[_0x4a599a(0x271)]['visualBattlerOpacity']=function(){const _0x189e2=_0x4a599a,_0x29ed47=_0x189e2(0x29c);if(this[_0x189e2(0x252)](_0x29ed47))return this[_0x189e2(0x2ab)][_0x29ed47];return this[_0x189e2(0x2ab)][_0x29ed47]=this[_0x189e2(0x1d3)](),this[_0x189e2(0x2ab)][_0x29ed47];},Game_BattlerBase[_0x4a599a(0x271)]['createVisualBattlerOpacity']=function(){const _0x3ecfea=_0x4a599a;for(const _0x117d8a of this['states']()){if(!_0x117d8a)continue;if(_0x117d8a['note'][_0x3ecfea(0x2bc)](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x5ef774=Number(RegExp['$1'])*0.01;return Math['round'](_0x5ef774*0xff)[_0x3ecfea(0x280)](0x0,0xff);}if(_0x117d8a['note'][_0x3ecfea(0x2bc)](/<VISUAL OPACITY:[ ](\d+)>/i))return Number(RegExp['$1'])[_0x3ecfea(0x280)](0x0,0xff);}return 0xff;},Sprite_Battler['prototype'][_0x4a599a(0x1e9)]=function(){const _0x23c1e7=_0x4a599a;if(!this[_0x23c1e7(0x2b0)])return;const _0x37c70f=this[_0x23c1e7(0x2b0)][_0x23c1e7(0x1e0)]();if(_0x37c70f===0x0&&this[_0x23c1e7(0x2c8)]['_hue']!==0x0)this[_0x23c1e7(0x2c8)][_0x23c1e7(0x261)](0x0);else{let _0x19eab5=this['_distortionSprite'][_0x23c1e7(0x222)]+_0x37c70f;_0x19eab5%=0x168,this[_0x23c1e7(0x2c8)][_0x23c1e7(0x261)](_0x19eab5);}},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x1e0)]=function(){const _0x53e609=_0x4a599a,_0x925380=_0x53e609(0x1e0);if(this[_0x53e609(0x252)](_0x925380))return this[_0x53e609(0x2ab)][_0x925380];return this[_0x53e609(0x2ab)][_0x925380]=this[_0x53e609(0x1d7)](),this[_0x53e609(0x2ab)][_0x925380];},Game_BattlerBase[_0x4a599a(0x271)][_0x4a599a(0x1d7)]=function(){const _0x50f8bb=_0x4a599a;for(const _0x88b7ab of this[_0x50f8bb(0x297)]()){if(!_0x88b7ab)continue;if(_0x88b7ab[_0x50f8bb(0x205)][_0x50f8bb(0x2bc)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},VisuMZ[_0x4a599a(0x2c5)]['Sprite_Battler_mainSpriteScaleX']=Sprite_Battler['prototype']['mainSpriteScaleX'],Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x1d8)]=function(){const _0x4d5e0f=_0x4a599a;let _0x9825d1=VisuMZ['VisualStateEffects'][_0x4d5e0f(0x1ff)][_0x4d5e0f(0x2b1)](this);return _0x9825d1+=this[_0x4d5e0f(0x2de)](),_0x9825d1;},VisuMZ['VisualStateEffects']['Sprite_Battler_mainSpriteScaleY']=Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x2bf)],Sprite_Battler['prototype'][_0x4a599a(0x2bf)]=function(){const _0x299f20=_0x4a599a;let _0x145621=VisuMZ[_0x299f20(0x2c5)][_0x299f20(0x2b9)][_0x299f20(0x2b1)](this);return _0x145621+=this[_0x299f20(0x29e)](),_0x145621;},Sprite_Battler[_0x4a599a(0x271)]['applyBreathingScaleX']=function(){const _0x287577=_0x4a599a;if(!this[_0x287577(0x2b0)])return 0x0;if(this[_0x287577(0x2b0)][_0x287577(0x1d4)]())return 0x0;const _0x1e6bbf=this[_0x287577(0x2b0)][_0x287577(0x291)]();if(!_0x1e6bbf)return 0x0;if(!_0x1e6bbf[_0x287577(0x1f0)])return 0x0;let _0x3a6bfe=this[_0x287577(0x237)](_0x1e6bbf,_0x1e6bbf['speedX'],_0x1e6bbf[_0x287577(0x223)]);const _0x243680=this[_0x287577(0x2c8)][_0x287577(0x2c3)]['x']>0x0?0x1:-0x1;return _0x3a6bfe*_0x243680;},Sprite_Battler['prototype'][_0x4a599a(0x29e)]=function(){const _0x265cd7=_0x4a599a;if(!this['_battler'])return 0x0;if(this[_0x265cd7(0x2b0)][_0x265cd7(0x1d4)]())return 0x0;const _0x261b76=this[_0x265cd7(0x2b0)][_0x265cd7(0x291)]();if(!_0x261b76)return 0x0;if(!_0x261b76[_0x265cd7(0x1f0)])return 0x0;let _0x109d8f=this[_0x265cd7(0x237)](_0x261b76,_0x261b76[_0x265cd7(0x21d)],_0x261b76[_0x265cd7(0x217)]);return _0x109d8f;},Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x237)]=function(_0x2c1c75,_0x1d8363,_0x19bd97){const _0x49973f=_0x4a599a;this['_breathingRand']=this[_0x49973f(0x25c)]??Math[_0x49973f(0x275)](0x2710);let _0x53bdef=Graphics[_0x49973f(0x1eb)]+this['_breathingRand'];return _0x2c1c75[_0x49973f(0x2d3)]&&(_0x1d8363/=this['_battler']['hpRate']()),Math[_0x49973f(0x2c1)](_0x53bdef/_0x1d8363)*_0x19bd97;},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x2d1)]=Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x2c2)],Sprite_Actor['prototype']['createStateSprite']=function(){const _0x56c790=_0x4a599a;VisuMZ[_0x56c790(0x2c5)]['Sprite_Actor_createStateSprite'][_0x56c790(0x2b1)](this),this[_0x56c790(0x27d)]();},Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x27d)]=function(){const _0x4c4e8b=_0x4a599a;if(this[_0x4c4e8b(0x20d)]!==Sprite_Actor)return;this[_0x4c4e8b(0x2dc)]=new Sprite_StateIcon(),this['addChild'](this[_0x4c4e8b(0x2dc)]),this[_0x4c4e8b(0x2dc)][_0x4c4e8b(0x1d6)][_0x4c4e8b(0x255)]=![];},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x29d)]=Sprite_Actor['prototype'][_0x4a599a(0x2b6)],Sprite_Actor['prototype'][_0x4a599a(0x2b6)]=function(){const _0x4f7dd2=_0x4a599a,_0x40968b=this[_0x4f7dd2(0x265)];if(!_0x40968b)return;const _0x3e4e81=_0x40968b[_0x4f7dd2(0x2e2)]();if(_0x3e4e81>=0x4){if(!_0x40968b[_0x4f7dd2(0x2d7)]()&&!_0x40968b[_0x4f7dd2(0x220)]())return this[_0x4f7dd2(0x2df)](_0x40968b[_0x4f7dd2(0x27e)]);}VisuMZ[_0x4f7dd2(0x2c5)][_0x4f7dd2(0x29d)]['call'](this);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x2ad)]=Sprite_SvEnemy[_0x4a599a(0x271)][_0x4a599a(0x2b6)],Sprite_SvEnemy[_0x4a599a(0x271)]['refreshMotion']=function(){const _0x2ec7c4=_0x4a599a,_0x53c98b=this[_0x2ec7c4(0x265)];if(!_0x53c98b)return;if(Imported['VisuMZ_2_DragonbonesUnion']&&_0x53c98b[_0x2ec7c4(0x254)]())return;const _0x24787b=_0x53c98b[_0x2ec7c4(0x2e2)]();if(_0x24787b>=0x4){if(!_0x53c98b[_0x2ec7c4(0x2d7)]()&&!_0x53c98b['isActing']())return this[_0x2ec7c4(0x2df)](_0x53c98b[_0x2ec7c4(0x27e)]);}VisuMZ[_0x2ec7c4(0x2c5)][_0x2ec7c4(0x2ad)][_0x2ec7c4(0x2b1)](this);},VisuMZ['VisualStateEffects'][_0x4a599a(0x2a0)]=Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x209)],Sprite_Battler[_0x4a599a(0x271)][_0x4a599a(0x209)]=function(_0x63f4c2){const _0x1ac07c=_0x4a599a;if(this['_dragonbones']&&_0x63f4c2===_0x1ac07c(0x1f3)){const _0x3bc177=this[_0x1ac07c(0x2b0)][_0x1ac07c(0x2e2)]();_0x3bc177>=0x4&&(_0x63f4c2=this[_0x1ac07c(0x2b0)][_0x1ac07c(0x27e)]||_0x63f4c2);}VisuMZ[_0x1ac07c(0x2c5)][_0x1ac07c(0x2a0)][_0x1ac07c(0x2b1)](this,_0x63f4c2);},VisuMZ['VisualStateEffects'][_0x4a599a(0x249)]=Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x2cf)],Sprite_Actor['prototype'][_0x4a599a(0x2cf)]=function(_0x1f53c5){const _0x4e1052=_0x4a599a;VisuMZ['VisualStateEffects'][_0x4e1052(0x249)]['call'](this,_0x1f53c5);if(this[_0x4e1052(0x2dc)])this['_stateIconSprite']['setup'](_0x1f53c5);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x207)]=Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x27b)],Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x27b)]=function(){const _0x11ba33=_0x4a599a;VisuMZ[_0x11ba33(0x2c5)]['Sprite_Actor_update'][_0x11ba33(0x2b1)](this),this[_0x11ba33(0x26f)]();},VisuMZ['VisualStateEffects']['Sprite_Actor_updateFrame']=Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x274)],Sprite_Actor[_0x4a599a(0x271)][_0x4a599a(0x274)]=function(){const _0x23c2d3=_0x4a599a;if(this[_0x23c2d3(0x2b0)]['stateMotionLock']()&&this[_0x23c2d3(0x28c)]&&this[_0x23c2d3(0x28c)][_0x23c2d3(0x1d6)]){if(this['_stateMotionLocked'])return;this[_0x23c2d3(0x1e1)]=this[_0x23c2d3(0x28c)][_0x23c2d3(0x2d6)][_0x23c2d3(0x21c)]>0x0;}else this[_0x23c2d3(0x1e1)]=![];VisuMZ[_0x23c2d3(0x2c5)][_0x23c2d3(0x27f)][_0x23c2d3(0x2b1)](this);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x260)]=Sprite_Enemy[_0x4a599a(0x271)]['createStateIconSprite'],Sprite_Enemy[_0x4a599a(0x271)][_0x4a599a(0x27d)]=function(){const _0x2c15f9=_0x4a599a;this[_0x2c15f9(0x2c2)](),VisuMZ[_0x2c15f9(0x2c5)][_0x2c15f9(0x260)][_0x2c15f9(0x2b1)](this);},Sprite_Enemy['prototype'][_0x4a599a(0x2c2)]=function(){const _0xd87fa6=_0x4a599a;this[_0xd87fa6(0x24c)]=new Sprite_StateOverlay(),this[_0xd87fa6(0x258)](this[_0xd87fa6(0x24c)]);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x225)]=Sprite_Enemy[_0x4a599a(0x271)][_0x4a599a(0x2cf)],Sprite_Enemy[_0x4a599a(0x271)][_0x4a599a(0x2cf)]=function(_0x503666){const _0x53e5de=_0x4a599a;VisuMZ[_0x53e5de(0x2c5)][_0x53e5de(0x225)][_0x53e5de(0x2b1)](this,_0x503666);if(this[_0x53e5de(0x24c)])this[_0x53e5de(0x24c)][_0x53e5de(0x23d)](_0x503666);},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x285)]=Sprite_Enemy[_0x4a599a(0x271)][_0x4a599a(0x27b)],Sprite_Enemy[_0x4a599a(0x271)]['update']=function(){const _0x586970=_0x4a599a;VisuMZ['VisualStateEffects'][_0x586970(0x285)]['call'](this),this[_0x586970(0x26f)]();},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x1e6)]=Sprite_StateOverlay[_0x4a599a(0x271)][_0x4a599a(0x287)],Sprite_StateOverlay['prototype'][_0x4a599a(0x287)]=function(){const _0x1ba1d3=_0x4a599a;VisuMZ[_0x1ba1d3(0x2c5)][_0x1ba1d3(0x1e6)][_0x1ba1d3(0x2b1)](this),this[_0x1ba1d3(0x204)]='States';},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x278)]=Sprite_StateOverlay[_0x4a599a(0x271)][_0x4a599a(0x274)],Sprite_StateOverlay['prototype'][_0x4a599a(0x274)]=function(){const _0x3f4edd=_0x4a599a;if(typeof this[_0x3f4edd(0x259)]===_0x3f4edd(0x284))return this[_0x3f4edd(0x2aa)]();else{if(this[_0x3f4edd(0x204)]!==_0x3f4edd(0x270)){this['_loadingCustomOverlay']=!![];const _0x4e593f=ImageManager[_0x3f4edd(0x247)](_0x3f4edd(0x270));_0x4e593f[_0x3f4edd(0x2c7)](this[_0x3f4edd(0x228)][_0x3f4edd(0x296)](this,_0x4e593f));}else this[_0x3f4edd(0x204)]===_0x3f4edd(0x270)&&VisuMZ[_0x3f4edd(0x2c5)][_0x3f4edd(0x278)][_0x3f4edd(0x2b1)](this);}},Sprite_StateOverlay[_0x4a599a(0x271)][_0x4a599a(0x228)]=function(_0x29cdca){const _0x12dc00=_0x4a599a;this[_0x12dc00(0x1d6)]=_0x29cdca,this[_0x12dc00(0x218)]=![],this[_0x12dc00(0x204)]='States',VisuMZ[_0x12dc00(0x2c5)][_0x12dc00(0x278)][_0x12dc00(0x2b1)](this);},Sprite_StateOverlay[_0x4a599a(0x271)][_0x4a599a(0x2aa)]=function(){const _0x246f64=_0x4a599a;if(!this[_0x246f64(0x218)]&&this[_0x246f64(0x204)]!==this['_overlayIndex']){this['_loadingCustomOverlay']=!![];const _0x4e3909=ImageManager[_0x246f64(0x247)](this['_overlayIndex']);_0x4e3909[_0x246f64(0x2c7)](this[_0x246f64(0x243)][_0x246f64(0x296)](this,_0x4e3909));}if(this['_bitmapName']===this[_0x246f64(0x259)]){const _0x38e059=0x60,_0x1f00bf=0x60,_0x5407f4=this[_0x246f64(0x1de)]*_0x38e059,_0x4db1fd=0x0;this[_0x246f64(0x2c6)](_0x5407f4,_0x4db1fd,_0x38e059,_0x1f00bf);}},Sprite_StateOverlay[_0x4a599a(0x271)][_0x4a599a(0x243)]=function(_0x272f92){const _0x44d711=_0x4a599a;this[_0x44d711(0x1d6)]=_0x272f92,this[_0x44d711(0x218)]=![],this[_0x44d711(0x204)]=this[_0x44d711(0x259)],this[_0x44d711(0x2aa)]();},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x23a)]=Window_BattleLog['prototype'][_0x4a599a(0x2c4)],Window_BattleLog['prototype'][_0x4a599a(0x2c4)]=function(_0x562180){const _0x4ebc6a=_0x4a599a;VisuMZ[_0x4ebc6a(0x2c5)][_0x4ebc6a(0x23a)][_0x4ebc6a(0x2b1)](this,_0x562180);if(_0x562180&&_0x562180[_0x4ebc6a(0x1d5)]())_0x562180[_0x4ebc6a(0x1d5)]()[_0x4ebc6a(0x28f)](_0x562180,'Counter');},VisuMZ[_0x4a599a(0x2c5)][_0x4a599a(0x248)]=Window_BattleLog[_0x4a599a(0x271)][_0x4a599a(0x29f)],Window_BattleLog[_0x4a599a(0x271)]['displayReflection']=function(_0xf369fb){const _0x35549f=_0x4a599a;VisuMZ[_0x35549f(0x2c5)][_0x35549f(0x248)][_0x35549f(0x2b1)](this,_0xf369fb);if(_0xf369fb&&_0xf369fb[_0x35549f(0x1d5)]())_0xf369fb[_0x35549f(0x1d5)]()[_0x35549f(0x28f)](_0xf369fb,'Reflect');},VisuMZ[_0x4a599a(0x2c5)]['Window_BattleLog_displaySubstitute']=Window_BattleLog[_0x4a599a(0x271)][_0x4a599a(0x239)],Window_BattleLog[_0x4a599a(0x271)][_0x4a599a(0x239)]=function(_0x56e450,_0x24652a){const _0x429c8c=_0x4a599a;VisuMZ[_0x429c8c(0x2c5)][_0x429c8c(0x22a)][_0x429c8c(0x2b1)](this,_0x56e450,_0x24652a);if(_0x24652a&&_0x24652a['battler']())_0x24652a[_0x429c8c(0x1d5)]()[_0x429c8c(0x28f)](_0x24652a,_0x429c8c(0x27a));},Sprite_Battler[_0x4a599a(0x271)]['SetupResponsePopup']=function(_0x4d31d2,_0x4e4ae2){const _0x87d882=_0x4a599a;if(!_0x4d31d2)return;const _0x47ce2b=VisuMZ[_0x87d882(0x2c5)][_0x87d882(0x298)][_0x87d882(0x1fa)]||{},_0x2ab59e='%1PopupText'[_0x87d882(0x294)](_0x4e4ae2),_0x2fe87a=_0x87d882(0x23f)[_0x87d882(0x294)](_0x4e4ae2),_0xc56d9c={'textColor':_0x47ce2b[_0x87d882(0x1ef)['format'](_0x4e4ae2)]||0x0,'flashColor':_0x47ce2b['%1FlashColor'[_0x87d882(0x294)](_0x4e4ae2)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x47ce2b['%1FlashDuration'[_0x87d882(0x294)](_0x4e4ae2)]||0x0},_0x36bb3e=_0x47ce2b[_0x2ab59e]||'';if(_0x36bb3e['length']<=0x0)return;const _0xf7a640=_0x47ce2b[_0x2fe87a]||0x0,_0x1a4821=ImageManager[_0x87d882(0x247)](_0x87d882(0x288));_0xf7a640>0x0?_0x1a4821[_0x87d882(0x2c7)](this[_0x87d882(0x229)][_0x87d882(0x296)](this,_0xf7a640,_0x36bb3e,_0xc56d9c)):_0x1a4821[_0x87d882(0x2c7)](this[_0x87d882(0x20b)]['bind'](this,_0x36bb3e,_0xc56d9c));};