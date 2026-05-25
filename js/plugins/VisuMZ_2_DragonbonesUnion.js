//=============================================================================
// VisuStella MZ - Dragonbones Union
// VisuMZ_2_DragonbonesUnion.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DragonbonesUnion = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DragonbonesUnion = VisuMZ.DragonbonesUnion || {};
VisuMZ.DragonbonesUnion.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.32] [DragonbonesUnion]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Dragonbones_Union_VisuStella_MZ
 * @base Public_0_Dragonbones
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Public_0_Dragonbones
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * DragonBones allows your games to use skeletal animation, a type of computer
 * animation in which a character (or object) is represented by skins/textures
 * and a digital set of interconnected bones (called the skeleton). Using a set
 * of instructions, the game will create animations based off these skins,
 * skeletons, and instructions to create beautifully smooth and light-weight
 * movements.
 *
 * This plugin gives you such control over various facets of your game: the
 * battle system, event pictures, and map sprites for characters. Various
 * plugin commands, notetags, and comment tags are added through this plugin to
 * give you as much control as you need over Dragonbones from the RPG Maker MZ
 * editor itself.
 *
 * The version of Dragonbones used for this plugin is 5.7.002b.
 * More information can be found at http://dragonbones.com/
 *
 * Features include all (but not limited to) the following:
 * 
 * - Adds Dragonbones support to RPG Maker MZ.
 * - Dragonbones armatures can be used as battler sprites.
 * - Dragonbones armatures can be attached to event pictures.
 * - Dragonbones armatures can be inserted into the map as character sprites.
 * - A variety of Plugin Parameters, Notetags, and Plugin Commands to control
 *   the Dragonbones armatures and their animations.
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
 * - Dragonbones*
 *
 * *Note* You can download this library from the below URL or from the
 * Dragonbones Union product page. Install it as a Tier 0 plugin.
 *
 * URL: https://www.npmjs.com/package/pixi5-dragonbones/v/5.7.0-2b
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Dragonbones Naming
 * ============================================================================
 *
 * If you are trying to set up a Dragonbones armature through notetags, Plugin
 * Commands, etc., and are getting the error message "Cannot Read property
 * 'parent' of null", then most likely, the incorrect Dragonbones armature name
 * is being used.
 *
 * ---
 * 
 * To find the Proper Name:
 * 
 * 1. Open up the Dragonbones armature in the Dragonbones editor.
 * 
 * ---
 * 
 * 2. Open the armature's Properties.
 * 
 * ---
 * 
 * 3. Look at what the "Name:" field lists. This is the name to use with the
 *    Dragonbones Union plugin.
 * 
 * ---
 *
 * ============================================================================
 * Dragonbones Armature Behaviors
 * ============================================================================
 *
 * Dragonbones armatures have certain behaviors when used with battlers,
 * pictures, and/or map sprites.
 *
 * ---
 *
 * 1. When a Dragonbones armature is loaded, it will play the 'idle' animation
 *    or whatever is set inside the Plugin Parameters => General Settings =>
 *    Loaded Animation field upon loading. Make your Dragonbones armatures with
 *    this in mind. At other times, the 'idle' animation will be used as a base
 *    defaulting animation.
 *
 * ---
 *
 * 2. The Dragonbones armature will always be anchored at the X, Y coordinates
 *    of the target. This X, Y coordinate point will be where the root/pivot
 *    point of the Dragonbones armature will be located.
 *
 * ---
 *
 * 3. The properties used by a sprite (ie the opacity, scale, rotation, and
 *    tint) will also be shared and/or amplified with the Dragonbones armature.
 *    The exception to this will be Blend Modes aren't supported.
 *
 * ---
 *
 * ============================================================================
 * Common Armature Problems and Solutions
 * ============================================================================
 * 
 * Here are some common problems and solutions involving armatures.
 *
 * ---
 * 
 * Armature FPS Desynchs
 * 
 * If multiple entities have Dragonbones armatures and they can perform
 * animations one after the other and then return to idle, they can desynch
 * with each other. There's a couple of reasons for this:
 * 
 *  1. Armature Animation FPS does not divide into 60 cleanly. RPG Maker MZ
 *     issues animation requests on the frame, which means the ordering issue
 *     can be on a non-divisible number for the armature for the Armature.
 * 
 *  2. Animation Timelines do not end on divisible by 60 numbers. We know that
 *     not all animations should end on divisible values, but this is still the
 *     cause for desynchronization between two Armatures playing the same
 *     animation one after the other.
 * 
 *  3. Sometimes RPG Maker MZ needs to take some time to work out other parts
 *     of the game before continuing. This can be seen when loading new images
 *     and/or textures to display and/or animate. Unfortunately, loading times
 *     are very random and unpredictable to work with, through no fault of the
 *     plugin's, the Armature's, or Dragonbones'. This is just how computers
 *     work. So if you need to ensure entities are synchronized, avoid the
 *     situations where loading pictures or animations are needed.*
 * 
 *  '''Note''': Naturally, this isn't going to be something that works in
 *     battle with all the battle animations being constantly flying about.
 * 
 * ---
 * 
 * Particles Not Appearing
 * 
 * If your armatures use particles, they may or may not appear in-game
 * depending on how they're rooted for the Armature and use normal blend modes.
 * Make sure the particles are rooted to the body rather than the anchor. The
 * supported JavaScript library provided by http://dragonbones.com/ clashes
 * with Pixi's at times when it comes to handling anchors and blend modes so
 * they may or may not appear depending on the settings used.
 * 
 * ---
 * 
 * "Unwanted" Animation Frames
 * 
 * If you're creating an Action Sequence and you have your Armature perform a
 * Dragonbones Animation linked to a motion, you may get "unwanted" animation
 * frames from the "idle" pose now and then. This is because after the played
 * Dragonbones animation finishes, a "Motion Refresh" occurs as per RPG Maker
 * MZ's corescript instructions. This brings the Armature back to "idle". You
 * can adjust this via the "Idle Bypass" Plugin Parameter.
 * 
 * ---
 *
 * ============================================================================
 * IMPORTANT!! Dragonbones Armatures as Map Sprites
 * ============================================================================
 *
 * If you plan on using Dragonbones armatures as map sprites, please keep in
 * mind that there will be certain limitations and properties regarding them,
 * which will be listed below:
 *
 * ---
 *
 * 1. Try not to use more than 99 vertices for meshes. The reason behind this
 *    is because the Dragonbones armature is added as a sprite to the game's
 *    Tilemap. Any and all sprites added to the Tilemap have some restrictions
 *    placed on them as per Pixi JS's design. The Dragonbones armatures are no
 *    exception to this.
 *
 *    If the number of vertices exceeds 99, strange things will occur to the
 *    Dragonbones armature that are outside of this plugin's control. While it
 *    won't stop the plugin from functioning properly, expected behaviors may
 *    happen due to the threshold.
 *
 * ---
 *
 * 2. When using Dragonbones armatures that are too tall or wide, they may clip
 *    into the tile layer above or to the side due to how the Tilemap works.
 *    Things that you would see happen would include clipping into the tops of
 *    trees and structures.
 *
 * ---
 *
 * 3. Certain motions will request specific animations from the Dragonbones
 *    armature. If the animations exist, it will play those motions. If they
 *    don't, the motions may request a different animation down the line. The
 *    request orders are as follows:
 *
 *    Jumping:
 *    - jump, walk, idle
 *
 *    Rope (Climbing) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle
 *
 *    Rope (Idle) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeidle, ladderidle, idle
 *
 *    Ladder (Climbing):
 *    - ladderclimb, walk, ladderidle, idle
 *
 *    Ladder (Idle):
 *    - ladderidle, idle
 *
 *    Dashing:
 *    - dash, walk, idle
 *
 *    Walking:
 *    - walk, idle
 *
 *    Idle:
 *    - idle
 *
 *    Name the animations for the Dragonbones armature as such to make the most
 *    out of the motion priority lists.
 *
 * ---
 *
 * 4. You can add directional animations for your Dragonbones armature motion
 *    animations. To do so, add a number after the animation's name like such:
 *    walk2, walk4, walk6, walk8. These numbers are based off the NumPad
 *    directions to determine which way to face:
 *
 *    7 8 9
 *    4   6
 *    1 2 3
 *
 *    These numbers are added onto the priority system listed in #3 above, too.
 *    Diagonal directions also become split and added multiple times for better
 *    streamlining, with a priority given to the horizontal direction before
 *    the vertical direction. For example, dashing becomes the following:
 *
 *    Dashing (Upper Left):
 *    - dash7, dash4, dash8, dash,
 *      walk7, walk4, walk8, walk,
 *      idle7, idle4, idle8, idle
 *
 *    Dashing (Right):
 *    - dash6, dash,
 *      walk6, walk,
 *      idle6, idle
 *
 * ---
 *
 * 5. When a Dragonbones armature is moving, it will animate slower or faster
 *    depending on the character's current movement speed. At speed
 *    '4: Normal', it will animation 4x faster than what's seen in Dragonbones.
 *    At speed '6: x4 Faster', it will animate 6x faster while '1: x8 Slower'
 *    will be at x1 speed seen in Dragonbones. In other words, the speed
 *    animated is equal to the number written on the left of the
 *    movement speed.
 *
 *    When dashing, that multiplier increases by 1 in order to match movement
 *    speeds and the Dragonbones armature will do the same to follow.
 *
 * ---
 *
 * You will need to create your Dragonbones armatures with these 5 key rules in
 * mind in order to make the armatures animate smoothly within your game.
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
 * VisuMZ_3_StateTooltips
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
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
 * === Dragonbones Battler Notetags ===
 *
 * The following notetags are to be assigned to either actors and/or enemies.
 * An assigned actor/enemy will have their original sprite hidden from view in
 * favor of the Dragonbones armature to be displayed. Use these notetags to
 * declare various settings for your Dragonbones armatures.
 *
 * ---
 *
 * <Dragonbones Battler: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the DragonBones associated with this actor/enemy to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Battler: Demon>
 * <Dragonbones Battler: DragonBoy>
 * <Dragonbones Battler: Swordsman>
 * <Dragonbones Battler: Ubbie>
 *
 * ---
 *
 * <Dragonbones Battler Scale: x, y>
 *
 * <Dragonbones Battler Scale X: x>
 * <Dragonbones Battler Scale Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the base scale for the Dragonbones associated with this actor/enemy.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the actor/enemy's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Battler Scale: -0.3, 0.3>
 *
 * <Dragonbones Battler Scale X: -0.3>
 * <Dragonbones Battler Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Battler Offset: x, y>
 *
 * <Dragonbones Battler Offset X: x>
 * <Dragonbones Battler Offset Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - When a Dragonbones armature is attached to an actor/enemy's sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Battler Offset: -10, 5>
 *
 * <Dragonbones Battler Offset X: -10>
 * <Dragonbones Battler Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Battler Size: width, height>
 *
 * <Dragonbones Battler Width: x>
 * <Dragonbones Battler Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for Action
 *   Sequences and the like. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   Plugin Parameters => Battler Settings => Default => Width/Height.
 *
 * Examples:
 *
 * <Dragonbones Battler Size: 50, 100>
 *
 * <Dragonbones Battler Width: 50>
 * <Dragonbones Battler Height: 100>
 *
 * ---
 *
 * <Dragonbones Battler Time Scale: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Battler Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Battler Motion Walk: animation>
 * <Dragonbones Battler Motion Wait: animation>
 * <Dragonbones Battler Motion Chant: animation>
 * <Dragonbones Battler Motion Guard: animation>
 * <Dragonbones Battler Motion Damage: animation>
 * <Dragonbones Battler Motion Evade: animation>
 * <Dragonbones Battler Motion Thrust: animation>
 * <Dragonbones Battler Motion Swing: animation>
 * <Dragonbones Battler Motion Missile: animation>
 * <Dragonbones Battler Motion Skill: animation>
 * <Dragonbones Battler Motion Spell: animation>
 * <Dragonbones Battler Motion Item: animation>
 * <Dragonbones Battler Motion Escape: animation>
 * <Dragonbones Battler Motion Victory: animation>
 * <Dragonbones Battler Motion Dying: animation>
 * <Dragonbones Battler Motion Abnormal: animation>
 * <Dragonbones Battler Motion Sleep: animation>
 * <Dragonbones Battler Motion Dead: animation>
 *
 * - Used for: Actor, Enemy Notetags
 * - Use these notetags to assign Dragonbones animations to play when the
 *   actor/enemy sprite is supposed to play such a motion.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Examples:
 *
 * <Dragonbones Battler Motion Wait: idle>
 * <Dragonbones Battler Motion Swing: attack>
 * <Dragonbones Battler Motion Thrust: attack>
 * <Dragonbones Battler Motion Missle: attack>
 * <Dragonbones Battler Motion Skill: special>
 * <Dragonbones Battler Motion Spell: special>
 * <Dragonbones Battler Motion Dead: defeated>
 *
 * ---
 *
 * <Dragonbones Battler Settings>
 *  Battler: filename
 *  
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Size: width, height
 *
 *  Width: x
 *  Height: x
 *
 *  Time Scale: x
 *
 *  Motion Walk: animation
 *  Motion Wait: animation
 *  Motion Chant: animation
 *  Motion Guard: animation
 *  Motion Damage: animation
 *  Motion Evade: animation
 *  Motion Thrust: animation
 *  Motion Swing: animation
 *  Motion Missile: animation
 *  Motion Skill: animation
 *  Motion Spell: animation
 *  Motion Item: animation
 *  Motion Escape: animation
 *  Motion Victory: animation
 *  Motion Dying: animation
 *  Motion Abnormal: animation
 *  Motion Sleep: animation
 *  Motion Dead: animation
 * </Dragonbones Battler Settings>
 *
 * - Used for: Actor, Enemy Notetags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Battler: filename' line.
 *
 * Example:
 *
 * <Dragonbones Battler Settings>
 *  Battler: Demon
 *  
 *  Scale: 0.3, 0.3
 *
 *  Size: 80, 80
 *
 *  Motion Wait: idle
 *  Motion Damage: hit
 *  Motion Swing: attack
 *  Motion Thrust: attack
 *  Motion Missile: attack
 *  Motion Skill: special
 *  Motion spell: special
 *  Motion Dead: defeated
 * </Dragonbones Battler Settings>
 *
 * ---
 * 
 * <Dragonbones Hue Affected>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag enables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 * 
 * <Dragonbones No Hue>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag disables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 *
 * === Dragonbones Map Sprite Notetags & Comment Tags ===
 *
 * You can also use Dragonbones armatures as map sprites. When used, any of the
 * original sprites before will become invisible and will be replaced with the
 * Dragonbones armature.
 *
 * These notetags can be used for actors and events. In the case of events,
 * both notetags and comment tags can be used to determine what settings to use
 * for the Dragonbones armatures.
 *
 * Be cautious when using Comment Tags for event pages since comments contain a
 * maximum line count of 6.
 *
 * ---
 *
 * <Dragonbones Sprite: filename>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the DragonBones associated with this map sprite to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Sprite: Demon>
 * <Dragonbones Sprite: DragonBoy>
 * <Dragonbones Sprite: Swordsman>
 * <Dragonbones Sprite: Ubbie>
 *
 * ---
 *
 * <Dragonbones Sprite Scale: x, y>
 *
 * <Dragonbones Sprite Scale X: x>
 * <Dragonbones Sprite Scale Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the base scale for the Dragonbones associated with this map sprite.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the character's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Sprite Scale: -0.3, 0.3>
 *
 * <Dragonbones Sprite Scale X: -0.3>
 * <Dragonbones Sprite Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Sprite Offset: x, y>
 *
 * <Dragonbones Sprite Offset X: x>
 * <Dragonbones Sprite Offset Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - When a Dragonbones armature is attached to an character's map sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Sprite Offset: -10, 5>
 *
 * <Dragonbones Sprite Offset X: -10>
 * <Dragonbones Sprite Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Sprite Time Scale: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Sprite Time Scale: 1.5>
 *
 * ---
 * 
 * <Dragonbones Sprite Walk Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is walking.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Walk Rate: 1.5>
 * 
 * ---
 * 
 * <Dragonbones Sprite Dash Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is dashing.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Dash Rate: 1.5>
 * 
 * ---
 *
 * <Dragonbones Sprite Size: width, height>
 *
 * <Dragonbones Sprite Width: x>
 * <Dragonbones Sprite Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for various
 *   plugins that use it. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   the Plugin Parameters.
 *
 * Examples:
 *
 * <Dragonbones Sprite Size: 48, 64>
 *
 * <Dragonbones Sprite Width: 48>
 * <Dragonbones Sprite Height: 64>
 *
 * ---
 *
 * <Dragonbones Sprite Flip Left>
 * <Dragonbones Sprite Flip Right>
 *
 * <Dragonbones Sprite No Flip Left>
 * <Dragonbones Sprite No Flip Right>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets the map sprite know to flip itself when facing either the left/right
 *   directions in order to reuse animations.
 * - The 'No' variants will prevent flipping from occuring.
 * - These notetags will override settings applied in the Plugin Parameters.
 *
 * ---
 *
 * <Dragonbones Sprite Motion Idle: animation>
 * <Dragonbones Sprite Motion Walk: animation>
 * <Dragonbones Sprite Motion Dash: animation>
 * <Dragonbones Sprite Motion Jump: animation>
 * <Dragonbones Sprite Motion LadderIdle: animation>
 * <Dragonbones Sprite Motion LadderClimb: animation>
 * <Dragonbones Sprite Motion RopeIdle: animation>
 * <Dragonbones Sprite Motion RopeClimb: animation>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you set specific animations different from the ones listed in the
 *   Plugin Parameters for specific motions.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Example:
 *
 * <Dragonbones Sprite Motion Idle: stand>
 * <Dragonbones Sprite Motion Walk: move>
 * <Dragonbones Sprite Motion Dash: run>
 * <Dragonbones Sprite Motion Jump: hop>
 *
 * ---
 *
 * <Dragonbones Sprite Settings>
 *  Filename: filename
 *
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Time Scale: x
 * 
 *  Walk Rate: x
 *  Dash Rate: x
 *
 *  Width: x
 *  Height: x
 *
 *  Flip Left
 *  Flip Right
 *
 *  No Flip Left
 *  No Flip Right
 *
 *  Motion Idle: animation
 *  Motion Walk: animation
 *  Motion Dash: animation
 *  Motion Jump: animation
 *  Motion LadderIdle: animation
 *  Motion LadderClimb: animation
 *  Motion RopeIdle: animation
 *  Motion RopeClimb: animation
 * </Dragonbones Sprite Settings>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Filename: filename' line.
 *
 * Example:
 *
 * <Dragonbones Sprite Settings>
 *  Filename: Ubbie
 *
 *  Scale: 0.1, 0.1
 *
 *  Flip Right
 *
 *  Motion Idle: stand
 *  Motion Walk: walk
 * </Dragonbones Sprite Settings>
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
 * === Battler Plugin Commands ===
 * 
 * ---
 *
 * Battler: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for battle.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Motion Settings:
 * 
 *     Anti-Loop Revert:
 *     - Prevent reverting non-looping animations with playtimes of 1.
 *     - This was added because some users prefer the prevention while others
 *       do not want it.
 *     - This only affects non-looping animations when they have playtime
 *       durations of 1.
 *     - Choose the style you want.
 *     - This will affect all map sprites that use Dragonbones.
 *
 *     Walk:
 *     Wait:
 *     Chant:
 *     Guard:
 *     Damage:
 *     Evade:
 *     Thrust:
 *     Swing:
 *     Missile:
 *     Skill:
 *     Spell:
 *     Item:
 *     Escape:
 *     Victory:
 *     Dying:
 *     Abnormal:
 *     Sleep:
 *     Dead:
 *     - Change the animation used for this motion.
 *
 * ---
 * 
 * === Map Sprite Plugin Commands ===
 * 
 * ---
 *
 * Map Sprite: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for map sprites.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 * 
 *       Walk Rate:
 *       - Change the armature's walk animation rate.
 * 
 *       Dash Rate:
 *       - Change the armature's dash animation rate.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Flip Settings:
 *
 *     Flip Left?:
 *     Flip Right:
 *     - Flip the scale x value when facing left/right-ward directions?
 *
 *   Motion Settings:
 *
 *     Idle:
 *     Walk:
 *     Dash:
 *     Jump:
 *     Ladder (Idle):
 *     Ladder (Climb):
 *     Rope (Idle):
 *     Rope (Climb):
 *     - Base rope climbing animation name used.
 *
 * ---
 *
 * Map Sprite: Actor Play Animation
 * - Target actor plays a custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * NOTE: An alternative to this is to put the following code inside of a
 *       Movement Route's script call:
 *
 *       this.dragonbonesAnimation = "AnimationName";
 *
 *       Replace 'AnimationName' (keep the quotes) with the name of the
 *       Dragonbones animation.
 *
 * ---
 *
 * Map Sprite: Actor Stop Animation
 * - Stops a target actor's custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 * ---
 *
 * Map Sprite: Event Play Animation
 * - Target event plays a custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Event Stop Animation
 * - Stops a target event's custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 * ---
 *
 * Map Sprite: Follower Play Animation
 * - Target follower plays a custom Dragonbones animation.
 *
 *   Follower Index:
 *   - Select which Follower Index to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Follower Stop Animation
 * - Stops a target follower's custom Dragonbones animation.
 *
 *   Follower ID:
 *   - Select which Follower Index to affect.
 *
 * ---
 *
 * Map Sprite: Player Play Animation
 * - Player plays a custom Dragonbones animation.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Player Stop Animation
 * - Stops player's custom Dragonbones animation.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Dragonbones Setup
 * - Setup a Dragonbones armature for a picture.
 *
 *   Picture ID:
 *   - Select which Picture ID(s) to give a Dragonbones armature.
 *
 *   Armature Filename:
 *   - What is the armature's filename?
 *
 *   Play Animation:
 *   - Play this animation once it starts.
 *
 *   Offset: X:
 *   - Default X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Default Y offset value for this Dragonbones armature.
 *
 *   Scale: X:
 *   - Default X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Default Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Time Scale:
 *   - Default time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * Picture: Play Dragonbones Animation
 * - Make an existing Dragonbones armature attached to a picture play
 *   an animation.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Play Animation:
 *   - Play this animation.
 * 
 *   Finish: Revert Idle:
 *   - Revert animation to 'idle' animation after finishing?
 *
 * ---
 *
 * Picture: Offset Dragonbones
 * - Offset the X, Y attachment point of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Offset: X:
 *   - X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Y offset value for this Dragonbones armature.
 *
 * ---
 *
 * Picture: Scale Dragonbones
 * - Change the scaling values of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Scale: X:
 *   - X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 * ---
 *
 * Picture: Time Scale Dragonbones
 * - Change the speed at which Dragonbones animations play.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Time Scale:
 *   - Time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that apply to all uses of Dragonbones through
 * this plugin. While the majority of these can remain unchanged, for those who
 * wish to customize the nature of the plugin to their liking can do so through
 * these Plugin Parameters.
 *
 * ---
 *
 * Assets Path
 * - The filepath to the directory that houses all the Dragonbone files.
 *
 * ---
 *
 * Defaults
 * 
 *   Loaded Animation:
 *   - The default animation to play once a Dragonbones armature is loaded.
 * 
 *   Looping Animations:
 *   - Force these animations to become looping animations even if they don't
 *     loop in Dragonbones.
 *
 * ---
 *
 * Skeletal Data
 * Texture Data
 * Texture Asset
 * 
 *   Key:
 *   - Key used to determine where needed data is stored.
 * 
 *   Extension:
 *   - Extension used to determine which files contain needed data.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Settings
 * ============================================================================
 *
 * Actor and Enemy sprites can have Dragonbones armatures attached to them as
 * sprites. Use these settings to make the Dragonbones armatures fit your needs
 * in battle.
 *
 * ---
 *
 * Default Settings
 * 
 *   Enemy Hue Affected?:
 *   - Affect hues for enemies with Dragonbones battlers?
 * 
 *   Offset: X:
 *   - Default X offset for battler sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for battler sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones battlers.
 * 
 *     Flip for Actors?:
 *     Flip for Enemies?:
 *     - Flip the scale x value into negative automatically for all actors
 *       or enemies?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones battlers.
 * 
 *   Width:
 *   - Treat battler sprites as if they have this width.
 *   - Used for Action Sequences.
 * 
 *   Height:
 *   - Treat battler sprites as if they have this height.
 *   - Used for Action Sequences.
 *
 * ---
 * 
 * Idle Bypass
 * 
 *   List:
 *   - This is a list of animations that will not return back to the idle
 *     animation after completion.
 *   - Remove them if you want them to revert back to the idle animation
 *     after completion.
 *   - Add to the list if you want animations to stay in their final frame.
 * 
 * ---
 *
 * Default Motions
 * 
 *   Walk:
 *   Wait:
 *   Chant:
 *   Guard:
 *   Damage:
 *   Evade:
 *   Thrust:
 *   Swing:
 *   Missile:
 *   Skill:
 *   Spell:
 *   Item:
 *   Escape:
 *   Victory:
 *   Dying:
 *   Abnormal:
 *   Sleep:
 *   Dead:
 *   - Play this Dragonbones animation whenever this motion is requested
 *     by default.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Sprite Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust the default configurations for any
 * map sprite that's using a Dragonbones armature. These settings can be
 * overwritten on per a sprite basis using notetags and comment tags, too.
 *
 * ---
 *
 * Defaults
 * 
 *   Offset: X:
 *   - Default X offset for map sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for map sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones map sprites.
 * 
 *     Flip Left?:
 *     Flip Right?:
 *     - Flip the scale x value when facing left/right-ward directions?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones map sprites.
 * 
 *   Time Scale:
 *   - The rate at which animations play.
 *   - Higher numbers go faster.
 * 
 *   Width:
 *   - Treat map sprites as if they have this width.
 *   - Used for various plugins.
 * 
 *   Height:
 *   - Treat map sprites as if they have this height.
 *   - Used for various plugins.
 *
 * ---
 *
 * Motion Settings
 * 
 *   Idle:
 *   Walk:
 *   Dash:
 *   Jump:
 *   Ladder (Idle):
 *   Ladder (Climb):
 *   Rope (Idle):
 *   Rope (Climb):
 *   - Base walk animation name used.
 * 
 *   Walk Timer:
 *   - Number of frames to count as walking so that an idle animation isn't
 *     immediately forced upon stopping.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Experimental Settings
 * ============================================================================
 *
 * These settings are experimental and have not been tested extensively yet.
 *
 * ---
 *
 * Experimental Settings
 * 
 *   Enemy Stances:
 *   - Enemies can use stance motions for idling such as chanting,
 *     guarding, etc.
 *   - Requires VisuMZ_1_BattleCore!
 *   - This is not available normally since animations are not available for
 *     enemies with the base RPG Maker MZ core scripts.
 *   - Disable this to use the default animation flow for enemies.
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
 *
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * Special Thanks To
 * 
 * * Green Kel
 * * Ækashics
 * * Swift Illusion
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.32: August 29, 2024
 * * Documentation Update!
 * ** Added section: Common Armature Problems and Solutions
 * *** Armature FPS Desynchs
 * *** Particles Not Appearing
 * *** "Unwanted" Animation Frames
 * **** Read these sections for more information.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.31: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Added new plugin parameter:
 * *** Plugin Parameters > Map Sprites > Motion Settings > Anti-Loop Revert
 * **** Prevent reverting non-looping animations with playtimes of 1.
 * **** This was added because some users prefer the prevention while others
 *      don't. This only affects non-looping animations when they have playtime
 *      durations of 1. Choose the style you want. This will affect all map
 *      sprites that use Dragonbones.
 * 
 * Version 1.30: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause an after effect color blend flash. Fix made
 *    by Irina.
 * 
 * Version 1.29: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem with TPB Active causing the input animation for
 *    Dragonbones armatures to be frozen in place. Fix made by Irina.
 * * Feature Update!
 * ** Added a feature to separate Dragonbones armature blend modes from being
 *    suppressed by PixiJS's filters. Update made by Irina.
 * 
 * Version 1.28: August 17, 2023
 * * Feature Update!
 * ** If a Dragonbones battler has an "idle" animation, it will no longer
 *    utilize the "walk" motion and instead, refer to its own "idle" motion.
 *    Update made by Irina.
 * ** If a Dragonbones map sprite has a non-looping animation with a playtime
 *    value of 1, the animation will halt at the last frame instead of looping
 *    or reverting to the first neutral frame. Update made by Irina.
 * 
 * Version 1.27: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that made dragonbones armatures persist after removing party
 *    members from the team. Fix made by Irina.
 * 
 * Version 1.26: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused scene changes back into the battle scene would
 *    cause collapsed Dragonbones Battlers to reappear. Fix made by Arisu.
 * 
 * Version 1.25: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused some Dragonbones animations to be unable to play
 *    on map sprites if they are facing specific directions. Fix made by Irina.
 * 
 * Version 1.24: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that the "Flip Actors" and "Flip Enemies" parameters did not
 *    work properly after using a scale X notetag. Fix made by Olivia.
 * 
 * Version 1.23: January 20, 2023
 * * Feature Update!
 * ** Guard animations should no longer temporarily default to idle stances if
 *    an unnamed animation does not exist if the battler is guarding. Update
 *    made by Irina.
 * 
 * Version 1.22: December 15, 2022
 * * Compatibility Update!
 * ** Should now work with RPG Maker MZ version 1.6.1's updated Pixi JS version
 *    of 5.3.12 from 5.2.4. If ya don't have this plugin updated and you are
 *    using 5.3.12 onward, your battlers won't be loading.
 * 
 * Version 1.21: November 24, 2022
 * * Bug Fixes!
 * ** Custom motions now work better with non-actor participants during actions
 *    involving dragonbones battlers. Fix made by Arisu.
 * 
 * Version 1.20: November 17, 2022
 * * Bug Fixes!
 * ** "Damage" motion wasn't working properly for actors. This should now be
 *    fixed and working properly.
 * * Bug Fixes!
 * ** "Escape" motion should now work properly with Dragonbones actors. Idle
 *    motions will no longer take priority over them.
 * 
 * Version 1.19: November 10, 2022
 * * Bug Fixes!
 * ** Fixed a bug from the v1.18 update that prevented custom motions from
 *    being displayed properly with actors. Fix made by Irina.
 * 
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_3_VisualStateEffect.
 * 
 * Version 1.17: January 27, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Added Plugin Command Parameter for "Picture: Play Dragonbones Animation":
 * *** Finish: Revert Idle?
 * **** Revert animation to 'idle' animation after finishing?
 * **** Added by Irina
 *
 * Version 1.16: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: June 18, 2021
 * * Compatibility Update
 * ** Compatibility update with Elements and Status Menu Core's trait hues.
 *    These will be affected by the notetags and/or Plugin Parameters applied.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Ækashics:
 * *** <Dragonbones Hue Affected>
 * *** <Dragonbones No Hue>
 * **** Determines if this enemy's Dragonbones battler is affected by hues
 *      or not. This will bypass the Plugin Parameter's default value.
 * ** New Plugin Parameter added by Irina and sponsored by Ækashics:
 * *** Plugin Parameters > Battler Settings > Default > Enemy Hue Affected?
 * **** Affect hues for enemies with Dragonbones battlers?
 * **** This will be disabled by default. Enable it or set it to true to make
 *      it work properly.
 * 
 * Version 1.14: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_StateTooltips plugin.
 * 
 * Version 1.13: March 19, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Experimental: Enemy Stances
 * **** Allows enemies to utilize stance motions for idling such as chanting,
 *      guarding, etc.
 * **** Requires VisuMZ_1_BattleCore!
 * **** This is not available normally since animations are not available for
 *      enemies with the base RPG Maker MZ core scripts.
 * **** Disable this to use the default animation flow for enemies.
 * 
 * Version 1.12: February 19, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon teleporting with an altering
 *    Dragonbones armature load without a base sprite. Fix made by Irina.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug involving the changing of a Dragonbones battler in-battle to
 *    prevent multiple instances being added at once. Fix made by Irina.
 * 
 * Version 1.10: January 22, 2021
 * * Bug Fixes!
 * ** Upon changing map sprites, Dragonbones characters would become skewed.
 *    This should no longer happen.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Map Sprite: Actor Change Settings new Plugin Command parameters
 * *** "Walk Rate" and "Dash Rate" modifiers added.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixes!
 * ** Dragonbones height for actors is no longer affected by frame divisibility
 *    for SV Actors to skew the positions of height data. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Two new notetags have been added for map sprites by Irina.
 * *** <Dragonbones Sprite Walk Rate: x>
 * *** <Dragonbones Sprite Dash Rate: x>
 * **** These two new notetags allow you to animate specific Dragonbones
 *      animations at a different speed when walking or dashing. These speed
 *      multipliers will stack multiplicatively with the time scale.
 * 
 * Version 1.07: October 25, 2020
 * * Bug Fixes!
 * ** Dead animations for actors no longer keep looping upon motion refreshes.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** New plugin parameter added by Irina.
 * *** Plugin Parameters > Battler Settings > Idle Bypass > List
 * **** This is a list of animations that will not return back to the idle
 *      animation after completion. Remove them if you want them to revert back
 *      to the idle animation after completion. Add to the list if you want
 *      animations to stay in their final frame.
 * 
 * Version 1.06: October 18, 2020
 * * Bug Fixes!
 * ** Enemies with Dragonbones battlers transforming into other enemies with
 *    Dragonbones battlers will now attach the sprites properly. Fix by Yanfly.
 * ** Enemies with Dragonbones battlers transforming into enemies without them
 *    will now remove the non-transformed bitmap.
 * * Documentation Update!
 * ** Added the 'Dragonbones Naming' section.
 * 
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Selected Dragonbones battlers will no longer leave behind a residual
 *    blink effect. Fix made by Irina.
 * ** There should be no more crashes from map events that have been previously
 *    deleted but not cleared from the map event list. Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** Hidden enemies with Dragonbones should be invisible at the start of
 *    battle. Fix made by Yanfly.
 * 
 * Version 1.03: September 13, 2020
 * * Compatibility Update!
 * ** Added compatibility with the new Battle Core v1.04 features!
 * 
 * Version 1.02: September 6, 2020
 * * Bug Fixes!
 * ** Previously, a Dragonbones battler does not show the blinking indicator if
 *    the battler is a selected target. This is now fixed. Fix made by Yanfly.
 * ** Prevents a crash now if no bitmap is detected for the main sprite.
 * 
 * Version 1.01: August 30, 2020
 * * Bug Fixes!
 * ** Erasing a picture no longer causes a crash when changing scenes. Fix made
 *    by Yanfly.
 * * Compatibility Update
 * ** Added compatibility for VisuStella MZ's Visual State Effects.
 *
 * Version 1.00: August 24, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Battler_ActorChange
 * @text Battler: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for battle.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the battler width size.
 * @default 64
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the battler height size.
 * @default 64
 *
 * @arg DefaultMotions
 * @text Motion Settings
 *
 * @arg MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default walk
 *
 * @arg MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default wait
 *
 * @arg MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default chant
 *
 * @arg MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default guard
 *
 * @arg MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default damage
 *
 * @arg MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default evade
 *
 * @arg MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default thrust
 *
 * @arg MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default swing
 *
 * @arg MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default missile
 *
 * @arg MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default skill
 *
 * @arg MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default spell
 *
 * @arg MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default item
 *
 * @arg MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default escape
 *
 * @arg MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default victory
 *
 * @arg MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dying
 *
 * @arg MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default abnormal
 *
 * @arg MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default sleep
 *
 * @arg MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dead
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorChange
 * @text Map Sprite: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for map sprites.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 0.5
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 0.5
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg WalkRate:eval
 * @text Walk Rate
 * @parent TimeScale:eval
 * @desc Change the armature's walk animation rate.
 * @default 1.0
 *
 * @arg DashRate:eval
 * @text Dash Rate
 * @parent TimeScale:eval
 * @desc Change the armature's dash animation rate.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the armature's width value.
 * @default 48
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the armature's height.
 * @default 48
 *
 * @arg FlipSettings
 * @text Flip Settings
 *
 * @arg FlipLeft:eval
 * @text Flip Left?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @arg FlipRight:eval
 * @text Flip Right?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @arg Animations
 * @text Motion Settings
 *
 * @arg Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @arg Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @arg Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @arg Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @arg LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @arg LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @arg RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @arg RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationPlay
 * @text Map Sprite: Actor Play Animation
 * @desc Target actor plays a custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationStop
 * @text Map Sprite: Actor Stop Animation
 * @desc Stops a target actor's custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationPlay
 * @text Map Sprite: Event Play Animation
 * @desc Target event plays a custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationStop
 * @text Map Sprite: Event Stop Animation
 * @desc Stops a target event's custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationPlay
 * @text Map Sprite: Follower Play Animation
 * @desc Target follower plays a custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationStop
 * @text Map Sprite: Follower Stop Animation
 * @desc Stops a target follower's custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower ID
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationPlay
 * @text Map Sprite: Player Play Animation
 * @desc Player plays a custom Dragonbones animation.
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationStop
 * @text Map Sprite: Player Stop Animation
 * @desc Stops player's custom Dragonbones animation.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_SetupDragonbones
 * @text Picture: Dragonbones Setup
 * @desc Setup a Dragonbones armature for a picture.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to give a Dragonbones armature.
 * @default 1
 *
 * @arg Filename:str
 * @text Armature Filename
 * @desc What is the armature's filename?
 * @default Untitled
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation once it starts.
 * @default Idle
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc Default X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Default Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc Default X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Default Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesAnimation
 * @text Picture: Play Dragonbones Animation
 * @desc Make an existing Dragonbones armature attached to a picture play an animation.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @arg IdleFinish:eval
 * @text Finish: Revert Idle?
 * @parent FlipSettings
 * @type boolean
 * @on Revert
 * @off Freeze
 * @desc Revert animation to 'idle' animation after finishing?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesOffset
 * @text Picture: Offset Dragonbones
 * @desc Offset the X, Y attachment point of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_ScaleDragonbones
 * @text Picture: Scale Dragonbones
 * @desc Change the scaling values of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_TimeScaleDragonbones
 * @text Picture: Time Scale Dragonbones
 * @desc Change the speed at which Dragonbones animations play.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
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
 * @param DragonbonesUnion
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Main
 * @text Main Settings
 *
 * @param AssetsPath:str
 * @text Assets Path
 * @parent Main
 * @desc The filepath to the directory that houses all the Dragonbone files.
 * @default ./dragonbones_assets/
 *
 * @param General:struct
 * @text General Settings
 * @parent Main
 * @type struct<General>
 * @desc A set of general settings pertaining to all uses of Dragonbones.
 * @default {"Defaults":"","LoadAnimation:str":"idle","LoopingAnimations:arraystr":"[\"idle\",\"walk\",\"wait\",\"chant\",\"guard\",\"dying\",\"abnormal\",\"sleep\",\"dash\",\"ladderidle\",\"ladderclimb\",\"ropeidle\",\"ropeclimb\"]","SkeletalData":"","SkeKey:str":"dbData","SkeExt:str":"_ske.json","TextureData":"","TexKey:str":"texData","TexExt:str":"_tex.json","TextureAsset":"","TxaKey:str":"texAsset","TxaExt:str":"_tex.png"}
 *
 * @param Battler:struct
 * @text Battler Settings
 * @parent Main
 * @type struct<Battler>
 * @desc A set of general settings pertaining to Dragonbones battlers.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"1.0","FlipActors:eval":"false","FlipEnemies:eval":"false","ScaleY:num":"1.0","TimeScale:num":"1.0","Width:num":"64","Height:num":"64","IdleBypass":"","IdleBypassList:arraystr":"[\"dead\",\"escape\",\"victory\"]","DefaultMotions":"","MotionWalk:str":"walk","MotionWait:str":"wait","MotionChant:str":"chant","MotionGuard:str":"guard","MotionDamage:str":"damage","MotionEvade:str":"evade","MotionThrust:str":"thrust","MotionSwing:str":"swing","MotionMissile:str":"missile","MotionSkill:str":"skill","MotionSpell:str":"spell","MotionItem:str":"item","MotionEscape:str":"escape","MotionVictory:str":"victory","MotionDying:str":"dying","MotionAbnormal:str":"abnormal","MotionSleep:str":"sleep","MotionDead:str":"dead"}
 *
 * @param MapSprite:struct
 * @text Map Sprite Settings
 * @parent Main
 * @type struct<MapSprite>
 * @desc A set of general settings pertaining to Dragonbones map sprites.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"0.5","FlipLeft:eval":"false","FlipRight:eval":"false","ScaleY:num":"0.5","TimeScale:num":"1.0","Width:num":"48","Height:num":"48","Animations":"","Idle:str":"idle","Walk:str":"walk","WalkTimer:num":"2","Dash:str":"dash","Jump:str":"jump","LadderIdle:str":"ladderidle","LadderClimb:str":"ladderclimb","RopeIdle:str":"ropeidle","RopeClimb:str":"ropecllmb"}
 * 
 * @param Experimental
 * 
 * @param EnemyStances:eval
 * @text Enemy Stances
 * @parent Experimental
 * @type boolean
 * @on Enable Stances
 * @off No Stances
 * @desc Enemies can use stance motions for idling such as
 * chanting, guarding, etc. Requires VisuMZ_1_BattleCore!
 * @default false
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
 * @param LoadAnimation:str
 * @text Loaded Animation
 * @parent Defaults
 * @desc The default animation to play once a Dragonbones armature is loaded.
 * @default idle
 *
 * @param LoopingAnimations:arraystr
 * @text Looping Animations
 * @parent Defaults
 * @type string[]
 * @desc Force these animations to become looping animations even if they don't loop in Dragonbones.
 * @default ["idle","walk","wait","chant","guard","dying","abnormal","sleep","dash","ladderidle","ladderclimb","ropeidle","ropeclimb"]
 *
 * @param SkeletalData
 * @text Skeletal Data
 *
 * @param SkeKey:str
 * @text Key
 * @parent SkeletalData
 * @desc Key used to determine where skeletal data is stored.
 * @default dbData
 *
 * @param SkeExt:str
 * @text Extension
 * @parent SkeletalData
 * @desc Extension used to determine which files contain skeletal data.
 * @default _ske.json
 *
 * @param TextureData
 * @text Texture Data
 *
 * @param TexKey:str
 * @text Key
 * @parent TextureData
 * @desc Key used to determine where texture data is stored.
 * @default texData
 *
 * @param TexExt:str
 * @text Extension
 * @parent TextureData
 * @desc Extension used to determine which files contain texture data.
 * @default _tex.json
 *
 * @param TextureAsset
 * @text Texture Asset
 *
 * @param TxaKey:str
 * @text Key
 * @parent TextureAsset
 * @desc Key used to determine where texture assets are stored.
 * @default texAsset
 *
 * @param TxaExt:str
 * @text Extension
 * @parent TextureAsset
 * @desc Extension used to determine which files contain texture assets.
 * @default _tex.png
 *
 */
/* ----------------------------------------------------------------------------
 * Battler Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param HueAffected:eval
 * @text Enemy Hue Affected?
 * @parent Defaults
 * @type boolean
 * @on Affect Hues
 * @off No Hues
 * @desc Affect hues for enemies with Dragonbones battlers?
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for battler sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for battler sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones battlers.
 * @default 1.0
 *
 * @param FlipActors:eval
 * @text Flip for Actors?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all actors?
 * @default false
 *
 * @param FlipEnemies:eval
 * @text Flip for Enemies?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all enemies?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones battlers.
 * @default 1.0
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat battler sprites as if they have this width.
 * Used for Action Sequences.
 * @default 64
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat battler sprites as if they have this height.
 * Used for Action Sequences.
 * @default 64
 *
 * @param IdleBypass
 * @text Idle Bypass
 *
 * @param IdleBypassList:arraystr
 * @text List
 * @parent IdleBypass
 * @type combo[]
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This is a list of animations that will not return back to the idle animation after completion.
 * @default ["dead","escape","victory"]
 *
 * @param DefaultMotions
 * @text Default Motions
 *
 * @param MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default walk
 *
 * @param MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default wait
 *
 * @param MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default chant
 *
 * @param MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default guard
 *
 * @param MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default damage
 *
 * @param MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default evade
 *
 * @param MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default thrust
 *
 * @param MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default swing
 *
 * @param MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default missile
 *
 * @param MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default skill
 *
 * @param MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default spell
 *
 * @param MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default item
 *
 * @param MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default escape
 *
 * @param MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default victory
 *
 * @param MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dying
 *
 * @param MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default abnormal
 *
 * @param MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default sleep
 *
 * @param MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dead
 *
 */
/* ----------------------------------------------------------------------------
 * Map Sprite Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MapSprite:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for map sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for map sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param FlipLeft:eval
 * @text Flip Left?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @param FlipRight:eval
 * @text Flip Right?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat map sprites as if they have this width.
 * Used for various plugins.
 * @default 48
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat map sprites as if they have this height.
 * Used for various plugins.
 * @default 48
 *
 * @param Animations
 * @text Motion Settings
 *
 * @param antiLoopRevert:eval
 * @text Anti-Loop Revert
 * @parent Animations
 * @type boolean
 * @on Prevent Revert
 * @off Don't Change
 * @desc Prevent reverting non-looping animations with playtimes of 1.
 * @default false
 *
 * @param Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @param Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @param WalkTimer:num
 * @text Walk Timer
 * @parent Walk:str
 * @desc Number of frames to count as walking so that an idle animation isn't immediately forced upon stopping.
 * @default 2
 *
 * @param Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @param Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @param LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @param LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @param RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @param RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 */
//=============================================================================

function _0x20d2(_0x4d45d3,_0x39db89){const _0x467e39=_0x467e();return _0x20d2=function(_0x20d2a4,_0x50fbcf){_0x20d2a4=_0x20d2a4-0x1bc;let _0x56dc0c=_0x467e39[_0x20d2a4];return _0x56dc0c;},_0x20d2(_0x4d45d3,_0x39db89);}const _0x3a836d=_0x20d2;function _0x467e(){const _0x31316a=['Game_Enemy_setup','OffsetY','width','animationNames','MotionDamage','motion','Width','updateFrame','Sprite_Actor_updateFrame','_playtestF7Looping','ropeclimb','chant','status','description','checkDragonbonesStringTags','setLastPluginCommandInterpreter','offsetX','max','Sprite_Actor_update','attack','flipLeft','Game_Battler_requestMotion','removeChild','Sprite_Picture_initialize','_baseDragonbonesSprite','getLastPluginCommandInterpreter','_dragonbonesData','DragonbonesUnion','battleAniSpeed','MotionDying','setupPageSettings','isDying','clearTryEscaping','STRUCT','addChildAt','isEnemy','constructor','loadNextArmature','picture','FUNC','escape','length','walkRate','FollowerIndex','updateCharacterFrame','WalkTimer','initialize','dragonbonesSpriteData','canActorPlayDragonbonesMotion','load','requestMotion','MotionSleep','_dragonbonesSpriteContainer','transform','stateMotionIndex','ConvertParams','Loader','LoadQueue','spell','setFrame','findPictureSprite','isHidden','playDragonbonesMotion','play','IdleBypassList','update','LoadedFilenames','_updateColorFilter','isMoving','Height','Sprite_Enemy_updateBitmap','RopeClimb','DefaultAnimation','Walk','add','isUndecided','LadderClimb','isPlaying','VisuMZ_1_BattleCore','filters','MotionEscape','Sprite_Actor_initMembers','MotionWait','event','isChanting','performAction','Picture_TimeScaleDragonbones','type','name','test','performActionMotions','FlipRight','updateShadowDragonbonesUnion','MotionChant','Game_Player_refresh','loading','ladderclimb','503126wShOAv','40bLnOLm','ARRAYNUM','MapSprite_ActorAnimationPlay','index','addDragonbonesChild','battler','note','Settings','isActing','updateDragonbonesAnimation','Game_Enemy_performDamage','lastAnimationName','concat','MapSprite','isGuardWaiting','EventID','eventId','format','page','factory','MotionSkill','lastAnimationState','BattleManager_onEscapeFailure','_battleAniSpeedLooping','testArmature','Sprite_Character_updateCharacterFrame','DashRate','playDragonbonesAnimation','dragonbonesFlip','TxaKey','complete','Game_Actor_performDamage','isAlive','MotionItem','updateDragonbones','MotionSpell','createBaseDragonbonesSprite','_battler','bitmap','OffsetX','leader','TimeScale','setupDragonbonesDataCommentTags','isGuard','Sprite_Actor_updateBitmap','setup','isTryingToEscape','item','setColorTone','JSON','initMembersDragonbonesUnion','Game_Actor_performAttack','updateDragonbonesSelection','This\x20is\x20a\x20static\x20class','scaleX','_playTestFastMode','Picture_DragonbonesAnimation','PixiFactory','testLoaded','registerCommand','performDamageDragonbonesUnion','PictureID','BattleManager_endBattle','scale','parent','shift','Sprite_Actor_updateShadow','_enemyId','isJumping','MotionVictory','_lastPluginCommandInterpreter','bind','MotionGuard','isDead','sleep','addChild','Scene_Battle_terminate','_colorTone','prepareNextLoadArmature','isInputting','Sprite_Picture_update','_scene','updateDragonbonesArmature','refresh','_escaping','_enemy','Game_Actor_setup','getDragonbones','requestMotionRefresh','135351eGrrID','EVAL','ladderidle','Game_Event_setupPageSettings','TexKey','Game_Follower_refresh','timeScale','MotionSwing','updateDragonbonesUnion','Game_CharacterBase_update','currentDragonbonesAnimation','FlipLeft','STR','hasDragonbones','isActor','damage','MotionDead','terminate','children','updateDragonbonesProperties','antiLoopRevert','startMotion','actor','victory','Game_Enemy_transform','initDragonbonesData','updateDragonbonesTimeScale','push','once','ARRAYEVAL','_target','MapSprite_ActorChange','animation','height','216qhlVwf','includes','processEscape','_dragonbonesName','onEscapeFailure','FlipEnemies','LoopingAnimations','setDragonbonesHue','dash','AssetsPath','call','runQueuedCallbacks','ARRAYJSON','ScaleX','scaleY','_character','Sprite_Character_updateBitmap','showPicture','MotionThrust','playDragonbonesIdleAnimation','VERSION','find','updateBitmap','onLoadDragonbones','Filename','performCollapseDragonbonesUnion','FlipActors','round','Battler_ActorChange','_dragonbonesFilename','1590qdMIFG','idle','initMembers','_dragonbonesAnimation','Game_Picture_initialize','endBattle','prototype','_lastMotionType','Sprite_updateColorFilter','createArmature','46785mQtuYt','data','resources','Game_Actor_performCollapse','disposeDragonbones','2355172ShAaED','erasePicture','flipRight','Game_Battler_requestMotionRefresh','ARRAYFUNC','isCompleted','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_Enemy_performCollapse','lastFileName','animations','playTimes','MapSprite_PlayerAnimationPlay','isAttack','Game_Actor_performAction','updateShadow','performDamage','_hue','Sprite_Enemy_setHue','exit','addDragonbonesAnimationDirections','realMoveSpeed','_dragonbonesFlipDirection','performCollapse','clearPageSettings','performActionEndMembers','Animation','LadderIdle','7203kfvuwE','Battler','_stateSprite','EnemyStances','ActorID','refreshMotion','_distortionSprite','parseDragonBonesData','ARRAYSTR','visible','_dragonbonesSpriteData','direction','Sprite_Enemy_refreshMotion','walk','isMagicSkill','parse','5.3.12','Jump','guard','erasePictureDragonbonesUnion','attachSpritesToDistortionSprite','MotionMissile','RopeIdle','dead','Sprite_Character_initialize','dying','_weaponSprite','_dragonbones','makeDeepCopy','updateDragonbonesBattler','hasDragonbonesBattler','setupDragonbonesDataNotetags','filter','command357','_targets','shared','MapSprite_FollowerAnimationStop','Game_Battler_performActionEndMembers','Picture_ScaleDragonbones','VisuMZ_0_CoreEngine','setupDragonbonesData','MotionWalk','40kfiTlt','wait','WalkRate','findTargetSprite','blendMode','Game_Screen_erasePicture','match','_dragonbonesBattlerData','Picture_DragonbonesOffset','toLowerCase','loadArmature','_colorFilter','isOnLadder','_spriteset','offsetY','list','_mainSprite','SkeKey','createDefaultPicture','MotionAbnormal','battlerSprites','toUpperCase','loadComplete','VisuMZ_1_EventsMoveCore','IdleFinish','jump','isDashing','Sprite_Actor','dispose','isOnRope','_subject','filename','realPictureId','dragonbonesData','abnormal','requestDragonbonesAnimation','trim','shouldRevertNonLoop','Sprite_Enemy_initMembers','Sprite_Enemy_setBattler','MapSprite_FollowerAnimationPlay','performActionDragonbonesUnion','map','updateCharacterFrameDragonbonesUnion','isSceneMap','LoadAnimation','performAttack','Dash','parameters','setHue','_requestedDragonbonesAnimation','1573275tBDzOr','Picture_SetupDragonbones','ScaleY','dragonbonesAnimation','isDragonbonesHueAffected','General','_dragonbonesMoveTimer','ropeidle','followers','MotionEvade','BattleManager_processEscape','isItem','Game_Event_clearPageSettings','follower','Game_Enemy_performAction','CallbackQueue','2021185qcfIxA','isSceneBattle','updateFrameDragonbonesUnion'];_0x467e=function(){return _0x31316a;};return _0x467e();}(function(_0x4e8e47,_0x1ca34f){const _0x34c366=_0x20d2,_0x3dae8f=_0x4e8e47();while(!![]){try{const _0x8624b2=parseInt(_0x34c366(0x1f6))/0x1+-parseInt(_0x34c366(0x1f7))/0x2*(-parseInt(_0x34c366(0x29a))/0x3)+-parseInt(_0x34c366(0x29f))/0x4+-parseInt(_0x34c366(0x327))/0x5+-parseInt(_0x34c366(0x290))/0x6*(parseInt(_0x34c366(0x2ba))/0x7)+-parseInt(_0x34c366(0x272))/0x8*(-parseInt(_0x34c366(0x250))/0x9)+-parseInt(_0x34c366(0x2e4))/0xa*(-parseInt(_0x34c366(0x317))/0xb);if(_0x8624b2===_0x1ca34f)break;else _0x3dae8f['push'](_0x3dae8f['shift']());}catch(_0x2b8aee){_0x3dae8f['push'](_0x3dae8f['shift']());}}}(_0x467e,0x80c68));var label=_0x3a836d(0x345),tier=tier||0x0,dependencies=['Dragonbones'],pluginData=$plugins[_0x3a836d(0x2da)](function(_0x373e40){const _0x2953c=_0x3a836d;return _0x373e40[_0x2953c(0x336)]&&_0x373e40[_0x2953c(0x337)][_0x2953c(0x273)]('['+label+']');})[0x0];VisuMZ[label][_0x3a836d(0x1fe)]=VisuMZ[label][_0x3a836d(0x1fe)]||{},VisuMZ[_0x3a836d(0x1cc)]=function(_0x4ff46b,_0x10d82e){const _0x400e5e=_0x3a836d;for(const _0x420111 in _0x10d82e){if(_0x420111[_0x400e5e(0x2ea)](/(.*):(.*)/i)){const _0x3156d6=String(RegExp['$1']),_0x4c4cff=String(RegExp['$2'])[_0x400e5e(0x2f9)]()[_0x400e5e(0x308)]();let _0x155548,_0x4a23d0,_0x552a97;switch(_0x4c4cff){case'NUM':_0x155548=_0x10d82e[_0x420111]!==''?Number(_0x10d82e[_0x420111]):0x0;break;case _0x400e5e(0x1f8):_0x4a23d0=_0x10d82e[_0x420111]!==''?JSON[_0x400e5e(0x2c9)](_0x10d82e[_0x420111]):[],_0x155548=_0x4a23d0[_0x400e5e(0x30e)](_0x41ef36=>Number(_0x41ef36));break;case _0x400e5e(0x251):_0x155548=_0x10d82e[_0x420111]!==''?eval(_0x10d82e[_0x420111]):null;break;case _0x400e5e(0x26d):_0x4a23d0=_0x10d82e[_0x420111]!==''?JSON[_0x400e5e(0x2c9)](_0x10d82e[_0x420111]):[],_0x155548=_0x4a23d0[_0x400e5e(0x30e)](_0x569201=>eval(_0x569201));break;case _0x400e5e(0x228):_0x155548=_0x10d82e[_0x420111]!==''?JSON['parse'](_0x10d82e[_0x420111]):'';break;case _0x400e5e(0x27e):_0x4a23d0=_0x10d82e[_0x420111]!==''?JSON['parse'](_0x10d82e[_0x420111]):[],_0x155548=_0x4a23d0[_0x400e5e(0x30e)](_0x3aac53=>JSON[_0x400e5e(0x2c9)](_0x3aac53));break;case _0x400e5e(0x1bc):_0x155548=_0x10d82e[_0x420111]!==''?new Function(JSON[_0x400e5e(0x2c9)](_0x10d82e[_0x420111])):new Function('return\x200');break;case _0x400e5e(0x2a3):_0x4a23d0=_0x10d82e[_0x420111]!==''?JSON['parse'](_0x10d82e[_0x420111]):[],_0x155548=_0x4a23d0['map'](_0x4a36b4=>new Function(JSON['parse'](_0x4a36b4)));break;case _0x400e5e(0x25c):_0x155548=_0x10d82e[_0x420111]!==''?String(_0x10d82e[_0x420111]):'';break;case _0x400e5e(0x2c2):_0x4a23d0=_0x10d82e[_0x420111]!==''?JSON[_0x400e5e(0x2c9)](_0x10d82e[_0x420111]):[],_0x155548=_0x4a23d0['map'](_0xdc3937=>String(_0xdc3937));break;case _0x400e5e(0x34b):_0x552a97=_0x10d82e[_0x420111]!==''?JSON['parse'](_0x10d82e[_0x420111]):{},_0x155548=VisuMZ[_0x400e5e(0x1cc)]({},_0x552a97);break;case'ARRAYSTRUCT':_0x4a23d0=_0x10d82e[_0x420111]!==''?JSON[_0x400e5e(0x2c9)](_0x10d82e[_0x420111]):[],_0x155548=_0x4a23d0[_0x400e5e(0x30e)](_0x5b085f=>VisuMZ['ConvertParams']({},JSON[_0x400e5e(0x2c9)](_0x5b085f)));break;default:continue;}_0x4ff46b[_0x3156d6]=_0x155548;}}return _0x4ff46b;},(_0x3e728b=>{const _0x7890d3=_0x3a836d,_0x5ef865=_0x3e728b[_0x7890d3(0x1ed)];for(const _0x2acb41 of dependencies){if(!Imported[_0x2acb41]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x7890d3(0x208)](_0x5ef865,_0x2acb41)),SceneManager[_0x7890d3(0x2b1)]();break;}}const _0x145d6d=_0x3e728b[_0x7890d3(0x337)];if(_0x145d6d[_0x7890d3(0x2ea)](/\[Version[ ](.*?)\]/i)){const _0x1c9699=Number(RegExp['$1']);_0x1c9699!==VisuMZ[label]['version']&&(alert(_0x7890d3(0x2a5)[_0x7890d3(0x208)](_0x5ef865,_0x1c9699)),SceneManager['exit']());}if(_0x145d6d['match'](/\[Tier[ ](\d+)\]/i)){const _0x40f2d9=Number(RegExp['$1']);_0x40f2d9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x7890d3(0x208)](_0x5ef865,_0x40f2d9,tier)),SceneManager['exit']()):tier=Math[_0x7890d3(0x33b)](_0x40f2d9,tier);}VisuMZ[_0x7890d3(0x1cc)](VisuMZ[label][_0x7890d3(0x1fe)],_0x3e728b['parameters']);})(pluginData);function DragonbonesManager(){const _0x4964a9=_0x3a836d;throw new Error(_0x4964a9(0x22c));}DragonbonesManager[_0x3a836d(0x27b)]=VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x1fe)]['AssetsPath'],DragonbonesManager['DefaultAnimation']=VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x1fe)]['General'][_0x3a836d(0x311)],DragonbonesManager['LoadedFilenames']=[],DragonbonesManager[_0x3a836d(0x1ce)]=[],DragonbonesManager[_0x3a836d(0x326)]=[],DragonbonesManager[_0x3a836d(0x1ee)]=function(_0xb9c28f,_0x1255a0,_0x326d4e,_0x5600b1){const _0x4cf1b5=_0x3a836d;if(!_0x326d4e)_0x326d4e=SceneManager[_0x4cf1b5(0x248)];if(!_0x5600b1)_0x5600b1=_0x4cf1b5(0x20f);if(_0x326d4e[_0x5600b1]){const _0x4aca8c=_0x326d4e[_0x5600b1];_0x4aca8c&&(_0x326d4e[_0x4cf1b5(0x340)](_0x4aca8c),_0x4aca8c[_0x4cf1b5(0x300)]());}this[_0x4cf1b5(0x2ee)](_0xb9c28f,DragonbonesManager[_0x4cf1b5(0x231)][_0x4cf1b5(0x23e)](this,_0xb9c28f,_0x1255a0,_0x326d4e,_0x5600b1));},DragonbonesManager[_0x3a836d(0x231)]=function(_0xad76af,_0x171233,_0x5b58c2,_0x178a2c){const _0x1e3b39=_0x3a836d,_0x26cb70=this['createArmature'](_0xad76af);_0x26cb70&&(_0x5b58c2[_0x1e3b39(0x242)](_0x26cb70),_0x26cb70['x']=Graphics[_0x1e3b39(0x32c)]/0x2,_0x26cb70['y']=Graphics[_0x1e3b39(0x271)]*0x3/0x4,_0x171233=_0x171233||DragonbonesManager[_0x1e3b39(0x1dd)],_0x171233=_0x171233[_0x1e3b39(0x2ed)](),_0x26cb70['animation'][_0x1e3b39(0x2a8)][_0x171233]&&_0x26cb70[_0x1e3b39(0x270)][_0x1e3b39(0x1d4)](_0x171233)),_0x5b58c2[_0x178a2c]=_0x26cb70;},DragonbonesManager[_0x3a836d(0x299)]=function(_0xddfc31){const _0x54024c=_0x3a836d,_0x326523=dragonBones[_0x54024c(0x230)][_0x54024c(0x20a)]['buildArmatureDisplay'](_0xddfc31);if(!_0x326523)return null;for(const _0x36cf3f in _0x326523[_0x54024c(0x270)]['animations']){if(_0x36cf3f['toLowerCase']()===_0x36cf3f)continue;_0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][_0x36cf3f[_0x54024c(0x2ed)]()]=_0x326523[_0x54024c(0x270)]['animations'][_0x36cf3f],delete _0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][_0x36cf3f];}for(let _0x538f74=0x0;_0x538f74<_0x326523['animation']['animationNames'][_0x54024c(0x1be)];_0x538f74++){_0x326523[_0x54024c(0x270)][_0x54024c(0x32d)][_0x538f74]=_0x326523[_0x54024c(0x270)]['animationNames'][_0x538f74][_0x54024c(0x2ed)]();}const _0x18d5b0=VisuMZ['DragonbonesUnion']['Settings'][_0x54024c(0x31c)][_0x54024c(0x278)];for(let _0x2844a3 of _0x18d5b0){_0x2844a3=_0x2844a3[_0x54024c(0x2ed)]()['trim']();_0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][_0x2844a3]&&(_0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][_0x2844a3][_0x54024c(0x2a9)]=0x0);for(let _0x514eaa=0x1;_0x514eaa<=0x9;_0x514eaa++){const _0x4dc65b=_0x2844a3+_0x514eaa;_0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][_0x4dc65b]&&(_0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][_0x4dc65b][_0x54024c(0x2a9)]=0x0);}}return _0x326523[_0x54024c(0x270)][_0x54024c(0x2a8)][DragonbonesManager[_0x54024c(0x1dd)]]&&_0x326523[_0x54024c(0x270)]['play'](DragonbonesManager[_0x54024c(0x1dd)]),_0x326523;},DragonbonesManager['loadArmature']=function(_0x918c6b,_0x4a965a){const _0x22e98d=_0x3a836d;_0x918c6b=_0x918c6b['trim'](),DragonbonesManager['LoadQueue'][_0x22e98d(0x26b)](_0x918c6b),DragonbonesManager['CallbackQueue'][_0x22e98d(0x26b)](_0x4a965a);const _0x221175=PIXI['Loader'][_0x22e98d(0x2dd)];!_0x221175[_0x22e98d(0x1f4)]&&this[_0x22e98d(0x34f)]();},DragonbonesManager[_0x3a836d(0x34f)]=function(){const _0x50628e=_0x3a836d;DragonbonesManager[_0x50628e(0x1ce)][_0x50628e(0x1be)]>0x0?this['prepareNextLoadArmature']():this['runQueuedCallbacks']();},DragonbonesManager[_0x3a836d(0x245)]=function(){const _0x4a3713=_0x3a836d,_0x2f5b9d=DragonbonesManager[_0x4a3713(0x1ce)][_0x4a3713(0x238)]();if(this[_0x4a3713(0x1d7)][_0x4a3713(0x273)](_0x2f5b9d))this[_0x4a3713(0x34f)]();else!this[_0x4a3713(0x1d7)][_0x4a3713(0x273)](_0x2f5b9d)&&this['processLoad'](_0x2f5b9d);},DragonbonesManager['processLoad']=function(_0x37ddc9){const _0x50a11c=_0x3a836d,_0xc3896c=PIXI[_0x50a11c(0x286)]>=_0x50a11c(0x2ca);this[_0x50a11c(0x1d7)][_0x50a11c(0x26b)](_0x37ddc9),this[_0x50a11c(0x2a7)]=_0x37ddc9;const _0x29c68d=VisuMZ[_0x50a11c(0x345)][_0x50a11c(0x1fe)]['General'],_0x598e6e=DragonbonesManager[_0x50a11c(0x27b)],_0xfe0cd=PIXI[_0x50a11c(0x1cd)]['shared'];_0xfe0cd[_0x50a11c(0x1df)](_0x37ddc9+_0x29c68d[_0x50a11c(0x2f5)],_0x598e6e+_0x37ddc9+_0x29c68d['SkeExt']),_0xfe0cd['add'](_0x37ddc9+_0x29c68d[_0x50a11c(0x254)],_0x598e6e+_0x37ddc9+_0x29c68d['TexExt']),_0xfe0cd[_0x50a11c(0x1df)](_0x37ddc9+_0x29c68d[_0x50a11c(0x214)],_0x598e6e+_0x37ddc9+_0x29c68d['TxaExt']),_0xc3896c?(_0xfe0cd['load'](_0xfe0cd),_0xfe0cd['onComplete']['once'](()=>DragonbonesManager[_0x50a11c(0x2fa)](_0xfe0cd,_0xfe0cd[_0x50a11c(0x29c)]))):(_0xfe0cd[_0x50a11c(0x26c)](_0x50a11c(0x215),DragonbonesManager['loadComplete'],this),_0xfe0cd[_0x50a11c(0x1c6)]());},DragonbonesManager[_0x3a836d(0x2fa)]=function(_0x58f2a1,_0x5837c2){const _0x2a1504=_0x3a836d,_0x4f5a72=VisuMZ[_0x2a1504(0x345)][_0x2a1504(0x1fe)][_0x2a1504(0x31c)],_0x201db2=this[_0x2a1504(0x2a7)],_0x4fd00f=dragonBones[_0x2a1504(0x230)][_0x2a1504(0x20a)];_0x4fd00f[_0x2a1504(0x2c1)](_0x5837c2[_0x201db2+_0x4f5a72[_0x2a1504(0x2f5)]]['data']),_0x4fd00f['parseTextureAtlasData'](_0x5837c2[_0x201db2+_0x4f5a72[_0x2a1504(0x254)]][_0x2a1504(0x29b)],_0x5837c2[_0x201db2+_0x4f5a72[_0x2a1504(0x214)]]['texture']),this[_0x2a1504(0x34f)]();},DragonbonesManager[_0x3a836d(0x27d)]=function(){const _0x43e140=_0x3a836d;while(DragonbonesManager[_0x43e140(0x326)][_0x43e140(0x1be)]>0x0){const _0x191d1c=DragonbonesManager['CallbackQueue']['shift']();if(_0x191d1c)_0x191d1c(this);}},PluginManager[_0x3a836d(0x232)](pluginData['name'],_0x3a836d(0x28e),_0x90a5b7=>{const _0x5bee94=_0x3a836d;if(!$gameMap)return;VisuMZ[_0x5bee94(0x1cc)](_0x90a5b7,_0x90a5b7);const _0x566a0a=$gameActors[_0x5bee94(0x266)](_0x90a5b7['ActorID']);if(!_0x566a0a)return;_0x566a0a[_0x5bee94(0x2eb)]={'battler':_0x90a5b7[_0x5bee94(0x28a)],'scaleX':_0x90a5b7[_0x5bee94(0x27f)],'scaleY':_0x90a5b7[_0x5bee94(0x319)],'offsetX':_0x90a5b7[_0x5bee94(0x21e)],'offsetY':_0x90a5b7[_0x5bee94(0x32b)],'timeScale':_0x90a5b7[_0x5bee94(0x220)],'width':_0x90a5b7[_0x5bee94(0x330)],'height':_0x90a5b7[_0x5bee94(0x1da)],'motion':{'walk':_0x90a5b7['MotionWalk'],'wait':_0x90a5b7[_0x5bee94(0x1e7)],'chant':_0x90a5b7[_0x5bee94(0x1f2)],'guard':_0x90a5b7[_0x5bee94(0x23f)],'damage':_0x90a5b7[_0x5bee94(0x32e)],'evade':_0x90a5b7[_0x5bee94(0x320)],'thrust':_0x90a5b7[_0x5bee94(0x284)],'swing':_0x90a5b7['MotionSwing'],'missile':_0x90a5b7[_0x5bee94(0x2cf)],'skill':_0x90a5b7[_0x5bee94(0x20b)],'spell':_0x90a5b7[_0x5bee94(0x21a)],'item':_0x90a5b7[_0x5bee94(0x218)],'escape':_0x90a5b7[_0x5bee94(0x1e5)],'victory':_0x90a5b7[_0x5bee94(0x23c)],'dying':_0x90a5b7[_0x5bee94(0x347)],'abnormal':_0x90a5b7[_0x5bee94(0x2f7)],'sleep':_0x90a5b7[_0x5bee94(0x1c8)],'dead':_0x90a5b7[_0x5bee94(0x260)]}};}),SceneManager[_0x3a836d(0x328)]=function(){const _0x2ff879=_0x3a836d;return this[_0x2ff879(0x248)]&&this['_scene'][_0x2ff879(0x34e)]===Scene_Battle;},SceneManager[_0x3a836d(0x310)]=function(){const _0xd72aa1=_0x3a836d;return this[_0xd72aa1(0x248)]&&this[_0xd72aa1(0x248)][_0xd72aa1(0x34e)]===Scene_Map;},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x321)]=BattleManager['processEscape'],BattleManager[_0x3a836d(0x274)]=function(){const _0x29caef=_0x3a836d;return this[_0x29caef(0x24b)]=!![],VisuMZ['DragonbonesUnion'][_0x29caef(0x321)][_0x29caef(0x27c)](this);},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x20d)]=BattleManager[_0x3a836d(0x276)],BattleManager[_0x3a836d(0x276)]=function(){const _0x1dd45c=_0x3a836d;VisuMZ[_0x1dd45c(0x345)][_0x1dd45c(0x20d)][_0x1dd45c(0x27c)](this),setTimeout(this[_0x1dd45c(0x34a)][_0x1dd45c(0x23e)](this),0x1f4);},BattleManager[_0x3a836d(0x34a)]=function(){this['_escaping']=![];},VisuMZ[_0x3a836d(0x345)]['BattleManager_endBattle']=BattleManager[_0x3a836d(0x295)],BattleManager[_0x3a836d(0x295)]=function(_0x4c7933){const _0x5dccef=_0x3a836d;this[_0x5dccef(0x24b)]=![],VisuMZ['DragonbonesUnion'][_0x5dccef(0x235)][_0x5dccef(0x27c)](this,_0x4c7933);},BattleManager[_0x3a836d(0x225)]=function(){const _0xb954bc=_0x3a836d;return this[_0xb954bc(0x24b)]||this['_escaped'];},Game_BattlerBase[_0x3a836d(0x296)][_0x3a836d(0x1fc)]=function(){const _0x45c3bb=_0x3a836d;if(!SceneManager[_0x45c3bb(0x328)]())return null;if(!SceneManager[_0x45c3bb(0x248)][_0x45c3bb(0x2f1)])return null;return SceneManager[_0x45c3bb(0x248)][_0x45c3bb(0x2f1)][_0x45c3bb(0x2e7)](this);},Game_BattlerBase[_0x3a836d(0x296)][_0x3a836d(0x269)]=function(){const _0x3d58ba=_0x3a836d,_0x36a654=VisuMZ[_0x3d58ba(0x345)][_0x3d58ba(0x1fe)]['Battler'];this[_0x3d58ba(0x2eb)]={'battler':'','scaleX':_0x36a654[_0x3d58ba(0x27f)],'scaleY':_0x36a654[_0x3d58ba(0x319)],'width':_0x36a654[_0x3d58ba(0x330)],'height':_0x36a654[_0x3d58ba(0x1da)],'offsetX':_0x36a654[_0x3d58ba(0x21e)],'offsetY':_0x36a654[_0x3d58ba(0x32b)],'timeScale':_0x36a654[_0x3d58ba(0x220)],'motion':{'walk':_0x36a654[_0x3d58ba(0x2e3)],'wait':_0x36a654['MotionWait'],'chant':_0x36a654['MotionChant'],'guard':_0x36a654[_0x3d58ba(0x23f)],'damage':_0x36a654[_0x3d58ba(0x32e)],'evade':_0x36a654[_0x3d58ba(0x320)],'thrust':_0x36a654[_0x3d58ba(0x284)],'swing':_0x36a654[_0x3d58ba(0x257)],'missile':_0x36a654[_0x3d58ba(0x2cf)],'skill':_0x36a654[_0x3d58ba(0x20b)],'spell':_0x36a654[_0x3d58ba(0x21a)],'item':_0x36a654[_0x3d58ba(0x218)],'escape':_0x36a654[_0x3d58ba(0x1e5)],'victory':_0x36a654['MotionVictory'],'dying':_0x36a654['MotionDying'],'abnormal':_0x36a654['MotionAbnormal'],'sleep':_0x36a654[_0x3d58ba(0x1c8)],'dead':_0x36a654[_0x3d58ba(0x260)]}};if(_0x36a654[_0x3d58ba(0x28c)]&&this[_0x3d58ba(0x25e)]())this['_dragonbonesBattlerData']['scaleX']*=-0x1;if(_0x36a654[_0x3d58ba(0x277)]&&this[_0x3d58ba(0x34d)]())this[_0x3d58ba(0x2eb)][_0x3d58ba(0x22d)]*=-0x1;},Game_BattlerBase['prototype']['setupDragonbonesData']=function(){const _0x4b3833=_0x3a836d,_0x20a8da=VisuMZ[_0x4b3833(0x345)][_0x4b3833(0x1fe)]['Battler'],_0x5d4948=(this[_0x4b3833(0x25e)]()?this[_0x4b3833(0x266)]():this['enemy']())[_0x4b3833(0x1fd)],_0x3059c0=this['dragonbonesData']();_0x5d4948['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:BATTLER|SKIN|NAME):[ ]*(.*)>/i)&&(_0x3059c0[_0x4b3833(0x1fc)]=String(RegExp['$1'])[_0x4b3833(0x308)]());_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER):[ ]*(.*)>/i)&&(_0x3059c0['battler']=String(RegExp['$1'])['trim']());if(_0x5d4948['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALE:[ ](.*),[ ](.*)>/i)){_0x3059c0[_0x4b3833(0x22d)]=Number(RegExp['$1']),_0x3059c0[_0x4b3833(0x280)]=Number(RegExp['$2']);if(_0x20a8da['FlipActors']&&this[_0x4b3833(0x25e)]())_0x3059c0[_0x4b3833(0x22d)]*=-0x1;if(_0x20a8da[_0x4b3833(0x277)]&&this[_0x4b3833(0x34d)]())_0x3059c0['scaleX']*=-0x1;}if(_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:SCALEX|SCALE X):[ ](.*)>/i)){_0x3059c0[_0x4b3833(0x22d)]=Number(RegExp['$1']);if(_0x20a8da['FlipActors']&&this[_0x4b3833(0x25e)]())_0x3059c0['scaleX']*=-0x1;if(_0x20a8da[_0x4b3833(0x277)]&&this['isEnemy']())_0x3059c0[_0x4b3833(0x22d)]*=-0x1;}_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALEY:[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x280)]=Number(RegExp['$1']));_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x33a)]=Number(RegExp['$1']),_0x3059c0['offsetY']=Number(RegExp['$2']));_0x5d4948['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x33a)]=Number(RegExp['$1']));_0x5d4948['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x2f2)]=Number(RegExp['$1']));_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x3059c0['timeScale']=Number(RegExp['$1']));_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x32c)]=Number(RegExp['$1']),_0x3059c0[_0x4b3833(0x271)]=Number(RegExp['$2']));_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]WIDTH:[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x32c)]=Number(RegExp['$1']));_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]HEIGHT:[ ](.*)>/i)&&(_0x3059c0[_0x4b3833(0x271)]=Number(RegExp['$1']));const _0x43dfbd=_0x5d4948['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/gi);if(_0x43dfbd)for(const _0x9fdefc of _0x43dfbd){_0x9fdefc[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/i);const _0x33b636=String(RegExp['$1'])['toLowerCase']()[_0x4b3833(0x308)](),_0x3c4746=String(RegExp['$2'])[_0x4b3833(0x308)]();_0x3059c0[_0x4b3833(0x32f)][_0x33b636]=_0x3c4746;}if(_0x5d4948[_0x4b3833(0x2ea)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/(?:DB|DRAGONBONE|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>/i)){const _0x4da6df=String(RegExp['$1']);_0x4da6df[_0x4b3833(0x2ea)](/(?:BATTLER|SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x3059c0[_0x4b3833(0x1fc)]=String(RegExp['$1'])['trim']());if(_0x4da6df[_0x4b3833(0x2ea)](/SCALE:[ ](.*),[ ](.*)/i)){_0x3059c0[_0x4b3833(0x22d)]=Number(RegExp['$1']),_0x3059c0[_0x4b3833(0x280)]=Number(RegExp['$2']);if(_0x20a8da['FlipActors']&&this[_0x4b3833(0x25e)]())_0x3059c0['scaleX']*=-0x1;if(_0x20a8da[_0x4b3833(0x277)]&&this[_0x4b3833(0x34d)]())_0x3059c0[_0x4b3833(0x22d)]*=-0x1;}if(_0x4da6df[_0x4b3833(0x2ea)](/(?:SCALEX|SCALE X):[ ](.*)/i)){_0x3059c0[_0x4b3833(0x22d)]=Number(RegExp['$1']);if(_0x20a8da[_0x4b3833(0x28c)]&&this[_0x4b3833(0x25e)]())_0x3059c0[_0x4b3833(0x22d)]*=-0x1;if(_0x20a8da[_0x4b3833(0x277)]&&this['isEnemy']())_0x3059c0[_0x4b3833(0x22d)]*=-0x1;}_0x4da6df[_0x4b3833(0x2ea)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x3059c0[_0x4b3833(0x280)]=Number(RegExp['$1']));_0x4da6df[_0x4b3833(0x2ea)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x3059c0[_0x4b3833(0x33a)]=Number(RegExp['$1']),_0x3059c0[_0x4b3833(0x2f2)]=Number(RegExp['$2']));_0x4da6df[_0x4b3833(0x2ea)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x3059c0[_0x4b3833(0x33a)]=Number(RegExp['$1']));_0x4da6df[_0x4b3833(0x2ea)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x3059c0[_0x4b3833(0x2f2)]=Number(RegExp['$1']));_0x4da6df['match'](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x3059c0['timeScale']=Number(RegExp['$1']));_0x4da6df[_0x4b3833(0x2ea)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x3059c0['width']=Number(RegExp['$1']),_0x3059c0[_0x4b3833(0x271)]=Number(RegExp['$2']));_0x4da6df[_0x4b3833(0x2ea)](/WIDTH:[ ](.*)/i)&&(_0x3059c0[_0x4b3833(0x32c)]=Number(RegExp['$1']));_0x4da6df[_0x4b3833(0x2ea)](/HEIGHT:[ ](.*)/i)&&(_0x3059c0['height']=Number(RegExp['$1']));const _0x1123f8=_0x4da6df[_0x4b3833(0x2ea)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/gi);if(_0x1123f8)for(const _0x4faebe of _0x1123f8){_0x4faebe[_0x4b3833(0x2ea)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x38fcfb=String(RegExp['$1'])[_0x4b3833(0x2ed)]()[_0x4b3833(0x308)](),_0x355aee=String(RegExp['$2'])[_0x4b3833(0x308)]();_0x3059c0[_0x4b3833(0x32f)][_0x38fcfb]=_0x355aee;}}},Game_BattlerBase[_0x3a836d(0x296)][_0x3a836d(0x305)]=function(){const _0x23e666=_0x3a836d;if(this['_dragonbonesBattlerData']!==undefined)return this[_0x23e666(0x2eb)];return this[_0x23e666(0x269)](),this[_0x23e666(0x2e2)](),this['_dragonbonesBattlerData'];},Game_BattlerBase[_0x3a836d(0x296)]['hasDragonbonesBattler']=function(){const _0x56e5a1=_0x3a836d;return this[_0x56e5a1(0x1fc)]()&&this[_0x56e5a1(0x305)]()['battler']!=='';},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x33f)]=Game_Battler[_0x3a836d(0x296)][_0x3a836d(0x1c7)],Game_Battler[_0x3a836d(0x296)]['requestMotion']=function(_0x20eb86){const _0x78ed25=_0x3a836d;VisuMZ[_0x78ed25(0x345)][_0x78ed25(0x33f)][_0x78ed25(0x27c)](this,_0x20eb86),this[_0x78ed25(0x2d8)]()&&this[_0x78ed25(0x1fc)]()[_0x78ed25(0x1d3)](_0x20eb86);},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x2a2)]=Game_Battler[_0x3a836d(0x296)][_0x3a836d(0x24f)],Game_Battler[_0x3a836d(0x296)]['requestMotionRefresh']=function(){const _0x168ac3=_0x3a836d;VisuMZ[_0x168ac3(0x345)][_0x168ac3(0x2a2)]['call'](this),this[_0x168ac3(0x2d8)]()&&this[_0x168ac3(0x1fc)]()['playDragonbonesIdleAnimation']();},Game_Battler[_0x3a836d(0x296)][_0x3a836d(0x307)]=function(_0xe66bac){const _0x47b55f=_0x3a836d;if(!this[_0x47b55f(0x2d8)]())return;this[_0x47b55f(0x1fc)]()[_0x47b55f(0x212)](_0xe66bac),['walk',_0x47b55f(0x291)][_0x47b55f(0x273)](_0xe66bac)?this[_0x47b55f(0x316)]=![]:this[_0x47b55f(0x316)]=!![];},VisuMZ['DragonbonesUnion'][_0x3a836d(0x2df)]=Game_Battler['prototype'][_0x3a836d(0x2b7)],Game_Battler[_0x3a836d(0x296)][_0x3a836d(0x2b7)]=function(){const _0x35863d=_0x3a836d;this[_0x35863d(0x2d8)]()&&(this[_0x35863d(0x316)]=![]),VisuMZ[_0x35863d(0x345)][_0x35863d(0x2df)][_0x35863d(0x27c)](this);},Game_Battler[_0x3a836d(0x296)][_0x3a836d(0x233)]=function(){const _0x48e420=_0x3a836d;if(!this[_0x48e420(0x2d8)]())return;this[_0x48e420(0x1c7)](_0x48e420(0x25f));},Game_Battler[_0x3a836d(0x296)]['performCollapseDragonbonesUnion']=function(){const _0x1996e9=_0x3a836d;if(!this[_0x1996e9(0x2d8)]())return;this[_0x1996e9(0x1c7)](_0x1996e9(0x2d1));},VisuMZ[_0x3a836d(0x345)]['Game_Actor_setup']=Game_Actor[_0x3a836d(0x296)][_0x3a836d(0x224)],Game_Actor[_0x3a836d(0x296)][_0x3a836d(0x224)]=function(_0x4d9994){const _0x3592aa=_0x3a836d;VisuMZ[_0x3592aa(0x345)][_0x3592aa(0x24d)][_0x3592aa(0x27c)](this,_0x4d9994),this['initDragonbonesData'](),this['setupDragonbonesData']();},VisuMZ['DragonbonesUnion']['Game_Actor_performAction']=Game_Actor[_0x3a836d(0x296)]['performAction'],Game_Actor['prototype'][_0x3a836d(0x1ea)]=function(_0x42e2cd){const _0x4c1481=_0x3a836d;this[_0x4c1481(0x307)](_0x4c1481(0x33d)),VisuMZ['DragonbonesUnion'][_0x4c1481(0x2ac)]['call'](this,_0x42e2cd);},VisuMZ['DragonbonesUnion'][_0x3a836d(0x22a)]=Game_Actor[_0x3a836d(0x296)][_0x3a836d(0x312)],Game_Actor[_0x3a836d(0x296)]['performAttack']=function(){const _0x49b56f=_0x3a836d;this['requestDragonbonesAnimation']('attack'),VisuMZ[_0x49b56f(0x345)][_0x49b56f(0x22a)][_0x49b56f(0x27c)](this);},VisuMZ[_0x3a836d(0x345)]['Game_Actor_performDamage']=Game_Actor[_0x3a836d(0x296)]['performDamage'],Game_Actor['prototype']['performDamage']=function(){const _0x243e9d=_0x3a836d;VisuMZ[_0x243e9d(0x345)][_0x243e9d(0x216)][_0x243e9d(0x27c)](this),this[_0x243e9d(0x233)]();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x29d)]=Game_Actor['prototype']['performCollapse'],Game_Actor[_0x3a836d(0x296)][_0x3a836d(0x2b5)]=function(){const _0x281379=_0x3a836d;VisuMZ[_0x281379(0x345)][_0x281379(0x29d)][_0x281379(0x27c)](this),this['performCollapseDragonbonesUnion']();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x32a)]=Game_Enemy[_0x3a836d(0x296)][_0x3a836d(0x224)],Game_Enemy['prototype'][_0x3a836d(0x224)]=function(_0x5107ad,_0x1d2de1,_0x5655b2){const _0x24c167=_0x3a836d;VisuMZ['DragonbonesUnion'][_0x24c167(0x32a)][_0x24c167(0x27c)](this,_0x5107ad,_0x1d2de1,_0x5655b2),this[_0x24c167(0x269)](),this[_0x24c167(0x2e2)]();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x268)]=Game_Enemy['prototype'][_0x3a836d(0x1ca)],Game_Enemy[_0x3a836d(0x296)][_0x3a836d(0x1ca)]=function(_0x14a9bc){const _0xec95c8=_0x3a836d,_0x1568b5=this[_0xec95c8(0x23a)];VisuMZ[_0xec95c8(0x345)]['Game_Enemy_transform'][_0xec95c8(0x27c)](this,_0x14a9bc),this[_0xec95c8(0x23a)]!==_0x1568b5&&(this[_0xec95c8(0x269)](),this['setupDragonbonesData']());},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x325)]=Game_Enemy[_0x3a836d(0x296)][_0x3a836d(0x1ea)],Game_Enemy[_0x3a836d(0x296)][_0x3a836d(0x1ea)]=function(_0x1b5e32){const _0xc702d1=_0x3a836d;VisuMZ[_0xc702d1(0x345)]['Game_Enemy_performAction'][_0xc702d1(0x27c)](this,_0x1b5e32),this[_0xc702d1(0x30d)](_0x1b5e32);},Game_Enemy['prototype'][_0x3a836d(0x30d)]=function(_0x53978b){const _0x420886=_0x3a836d;if(!this[_0x420886(0x2d8)]())return;this[_0x420886(0x307)](_0x420886(0x33d));if(Imported[_0x420886(0x1e3)])return this[_0x420886(0x1ef)](_0x53978b);if(_0x53978b[_0x420886(0x2ab)]())this[_0x420886(0x307)](_0x420886(0x33d));else{if(_0x53978b[_0x420886(0x222)]())this[_0x420886(0x1c7)]('guard');else{if(_0x53978b[_0x420886(0x2c8)]())this[_0x420886(0x1c7)](_0x420886(0x1cf));else{if(_0x53978b['isSkill']())_0x53978b['item']()[_0x420886(0x25f)][_0x420886(0x1ec)]>0x0?this['requestDragonbonesAnimation']('attack'):this[_0x420886(0x1c7)]('skill');else _0x53978b[_0x420886(0x322)]()&&this[_0x420886(0x1c7)](_0x420886(0x226));}}}},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x201)]=Game_Enemy['prototype'][_0x3a836d(0x2ae)],Game_Enemy[_0x3a836d(0x296)][_0x3a836d(0x2ae)]=function(){const _0x376ad1=_0x3a836d;VisuMZ[_0x376ad1(0x345)]['Game_Enemy_performDamage'][_0x376ad1(0x27c)](this),this[_0x376ad1(0x233)]();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x2a6)]=Game_Enemy['prototype'][_0x3a836d(0x2b5)],Game_Enemy[_0x3a836d(0x296)]['performCollapse']=function(){const _0x3f318a=_0x3a836d;VisuMZ['DragonbonesUnion'][_0x3f318a(0x2a6)][_0x3f318a(0x27c)](this),this[_0x3f318a(0x28b)]();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x243)]=Scene_Battle[_0x3a836d(0x296)][_0x3a836d(0x261)],Scene_Battle[_0x3a836d(0x296)][_0x3a836d(0x261)]=function(){const _0x204ae8=_0x3a836d;this[_0x204ae8(0x2f1)][_0x204ae8(0x29e)](),VisuMZ['DragonbonesUnion']['Scene_Battle_terminate']['call'](this);},Sprite_Battler['prototype'][_0x3a836d(0x229)]=function(){const _0x1238e3=_0x3a836d;this[_0x1238e3(0x2d5)]=null,this[_0x1238e3(0x275)]='';},Sprite_Battler[_0x3a836d(0x296)]['setupDragonbones']=function(){const _0x18ac5b=_0x3a836d;this['disposeDragonbones']();const _0x5078d2=this[_0x18ac5b(0x21c)]['dragonbonesData']();this['_dragonbonesName']=_0x5078d2[_0x18ac5b(0x1fc)],armatureName=_0x5078d2['battler'],DragonbonesManager[_0x18ac5b(0x2ee)](armatureName,this[_0x18ac5b(0x289)][_0x18ac5b(0x23e)](this)),this[_0x18ac5b(0x21d)]=new Bitmap(_0x5078d2[_0x18ac5b(0x32c)],_0x5078d2[_0x18ac5b(0x271)]),this[_0x18ac5b(0x2f4)]&&(this[_0x18ac5b(0x2f4)][_0x18ac5b(0x21d)]=new Bitmap(_0x5078d2[_0x18ac5b(0x32c)],_0x5078d2[_0x18ac5b(0x271)]));},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x29e)]=function(){const _0x348a17=_0x3a836d;this['_dragonbones']&&(this['_dragonbonesSpriteContainer']&&this[_0x348a17(0x1c9)][_0x348a17(0x340)](this[_0x348a17(0x2d5)]),this[_0x348a17(0x340)](this[_0x348a17(0x2d5)]),this['_dragonbones'][_0x348a17(0x300)](),delete this[_0x348a17(0x2d5)],delete this[_0x348a17(0x275)]);},Sprite_Battler[_0x3a836d(0x296)]['onLoadDragonbones']=function(){const _0x4b88c1=_0x3a836d;if(!this[_0x4b88c1(0x21c)])return;const _0x18446d=this[_0x4b88c1(0x21c)][_0x4b88c1(0x305)]();this[_0x4b88c1(0x2d5)]=DragonbonesManager['createArmature'](_0x18446d[_0x4b88c1(0x1fc)]),!this[_0x4b88c1(0x1c9)]&&(this[_0x4b88c1(0x1c9)]=new Sprite(),this[_0x4b88c1(0x1c9)][_0x4b88c1(0x242)](this[_0x4b88c1(0x2d5)])),this[_0x4b88c1(0x34c)](this[_0x4b88c1(0x1c9)],0x0),this['attachSpritesToDistortionSprite']&&(this[_0x4b88c1(0x2ce)](),this['_dragonbonesSpriteContainer'][_0x4b88c1(0x242)](this[_0x4b88c1(0x2d5)])),this['playDragonbonesIdleAnimation'](),this['_dragonbones']['x']=_0x18446d['offsetX'],this[_0x4b88c1(0x2d5)]['y']=_0x18446d['offsetY'],this[_0x4b88c1(0x2d5)][_0x4b88c1(0x236)]['x']=_0x18446d[_0x4b88c1(0x22d)],this[_0x4b88c1(0x2d5)][_0x4b88c1(0x236)]['y']=_0x18446d[_0x4b88c1(0x280)],this[_0x4b88c1(0x21c)]&&this['_battler'][_0x4b88c1(0x1d2)]()&&(this['opacity']=0x0),this[_0x4b88c1(0x21c)]&&this['_battler'][_0x4b88c1(0x240)]()&&(this[_0x4b88c1(0x1d3)](_0x4b88c1(0x2d1)),this[_0x4b88c1(0x219)](),this[_0x4b88c1(0x21c)]['collapseType']()<0x3&&(this['opacity']=0x0));},Sprite[_0x3a836d(0x296)][_0x3a836d(0x24e)]=function(){const _0x65d3c0=_0x3a836d;if(!this['parent'])return null;if(this['_dragonbones'])return this[_0x65d3c0(0x2d5)];if(this[_0x65d3c0(0x237)][_0x65d3c0(0x2c0)]){if(this!==this[_0x65d3c0(0x237)][_0x65d3c0(0x2c0)])return null;return this['parent'][_0x65d3c0(0x2d5)];}return null;},VisuMZ['DragonbonesUnion']['Sprite_updateColorFilter']=Sprite[_0x3a836d(0x296)]['_updateColorFilter'],Sprite[_0x3a836d(0x296)][_0x3a836d(0x1d8)]=function(){const _0x551a51=_0x3a836d;VisuMZ['DragonbonesUnion'][_0x551a51(0x298)][_0x551a51(0x27c)](this),this['getDragonbones']()&&this['_updateDragonbonesChildrenColorFilter']();},Sprite[_0x3a836d(0x296)]['_updateDragonbonesChildrenColorFilter']=function(){const _0x300867=_0x3a836d,_0x237114=this[_0x300867(0x24e)]();if(!_0x237114)return;for(const _0x1e00ca of _0x237114[_0x300867(0x262)]){if(_0x1e00ca[_0x300867(0x2e8)]!==0x0){_0x1e00ca[_0x300867(0x2ef)]&&(_0x1e00ca[_0x300867(0x1e4)]=_0x1e00ca['filters']||[],_0x1e00ca[_0x300867(0x1e4)]['remove'](_0x1e00ca[_0x300867(0x2ef)]));continue;}_0x1e00ca['filters']=_0x1e00ca['filters']||[],!_0x1e00ca[_0x300867(0x2ef)]&&(_0x1e00ca[_0x300867(0x2ef)]=new ColorFilter(),_0x1e00ca[_0x300867(0x2ef)]['blendMode']=_0x1e00ca['blendMode'],_0x1e00ca[_0x300867(0x1e4)][_0x300867(0x26b)](_0x1e00ca[_0x300867(0x2ef)])),_0x1e00ca[_0x300867(0x2ef)][_0x300867(0x315)](this[_0x300867(0x2af)]),_0x1e00ca['_colorFilter'][_0x300867(0x227)](this[_0x300867(0x244)]);}},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x1d3)]=function(_0x503bd4){const _0x1856fc=_0x3a836d;if(!this['_dragonbones'])return;if(_0x503bd4===this[_0x1856fc(0x297)]&&_0x503bd4===_0x1856fc(0x2c7))return;this[_0x1856fc(0x297)]=_0x503bd4;if(_0x503bd4===_0x1856fc(0x291)){if(this[_0x1856fc(0x21c)][_0x1856fc(0x349)]())_0x503bd4=_0x1856fc(0x2d3);else{if(this[_0x1856fc(0x21c)][_0x1856fc(0x222)]()||this[_0x1856fc(0x21c)]['isGuardWaiting']())_0x503bd4=_0x1856fc(0x2cc);else{}}}const _0x246e59=this[_0x1856fc(0x21c)][_0x1856fc(0x305)]();if(_0x246e59['motion'][_0x503bd4]){const _0x4dcaae=_0x246e59[_0x1856fc(0x32f)][_0x503bd4];this[_0x1856fc(0x212)](_0x4dcaae);}this[_0x1856fc(0x1d8)]();},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x212)]=function(_0x1f2aa1){const _0x166270=_0x3a836d;_0x1f2aa1=_0x1f2aa1[_0x166270(0x2ed)]();if(!this[_0x166270(0x2d5)])return;['idle',_0x166270(0x2e5)][_0x166270(0x273)](_0x1f2aa1)&&this[_0x166270(0x21c)]['isGuard']()&&(_0x1f2aa1=_0x166270(0x2cc));const _0x5d0c3c=this[_0x166270(0x2d5)][_0x166270(0x270)];if(_0x5d0c3c[_0x166270(0x2a8)][_0x1f2aa1]){const _0x1aba7f=_0x5d0c3c[_0x166270(0x202)],_0x63eb04=[_0x166270(0x291),_0x166270(0x2c7),'wait','chant',_0x166270(0x2cc),'dying',_0x166270(0x306),_0x166270(0x241),_0x166270(0x2d1)];if(_0x1aba7f===_0x1f2aa1&&_0x63eb04[_0x166270(0x273)](_0x1f2aa1))return;_0x5d0c3c[_0x166270(0x1d4)](_0x1f2aa1);}},Sprite_Battler[_0x3a836d(0x296)]['updateDragonbones']=function(){const _0x10a332=_0x3a836d;this[_0x10a332(0x2d7)](),this[_0x10a332(0x26a)](),this[_0x10a332(0x200)](),this[_0x10a332(0x22b)]();},Sprite_Battler['prototype'][_0x3a836d(0x2d7)]=function(){const _0x3c0a8d=_0x3a836d;if(!this['_battler'])return;const _0x13ba58=this[_0x3c0a8d(0x21c)][_0x3c0a8d(0x305)]();this[_0x3c0a8d(0x275)]=_0x13ba58[_0x3c0a8d(0x1fc)];},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x26a)]=function(){const _0x105a71=_0x3a836d;if(!this[_0x105a71(0x2d5)])return;let _0x33bd8b=this[_0x105a71(0x21c)][_0x105a71(0x305)]()[_0x105a71(0x256)];const _0x38d0ed=SceneManager[_0x105a71(0x248)];Imported[_0x105a71(0x2e1)]&&_0x38d0ed[_0x105a71(0x333)]&&$gameTemp[_0x105a71(0x22e)]&&(_0x33bd8b*=0x2),Imported['VisuMZ_1_OptionsCore']&&_0x38d0ed[_0x105a71(0x20e)]&&(_0x33bd8b*=(ConfigManager[_0x105a71(0x346)]||0x0)+0x1),this[_0x105a71(0x2d5)][_0x105a71(0x270)][_0x105a71(0x256)]=_0x33bd8b;},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x200)]=function(){const _0x403fd7=_0x3a836d;if(!this[_0x403fd7(0x2d5)])return;const _0x57a9ec=this[_0x403fd7(0x2d5)][_0x403fd7(0x270)];if(_0x57a9ec[_0x403fd7(0x2a4)]){const _0x1557bc=_0x57a9ec[_0x403fd7(0x202)];let _0xbd6a52=VisuMZ[_0x403fd7(0x345)][_0x403fd7(0x1fe)][_0x403fd7(0x2bb)][_0x403fd7(0x1d5)];_0xbd6a52===undefined&&(_0xbd6a52=[_0x403fd7(0x2d1),_0x403fd7(0x1bd),_0x403fd7(0x267)]),!_0xbd6a52[_0x403fd7(0x273)](_0x1557bc)&&this[_0x403fd7(0x285)]();}},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x22b)]=function(){return;},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x285)]=function(){const _0x4588a4=_0x3a836d;if(!this['_dragonbones'])return;const _0x36f456=this[_0x4588a4(0x21c)];if(!_0x36f456)return;if(_0x36f456[_0x4588a4(0x34d)]()){const _0x2d0640=this[_0x4588a4(0x2d5)][_0x4588a4(0x270)];if(_0x2d0640&&!_0x2d0640['isCompleted'])return;}if(this[_0x4588a4(0x1c5)]()){const _0x5251fc=this[_0x4588a4(0x2d5)]['animation'];if(_0x5251fc&&!_0x5251fc[_0x4588a4(0x2a4)])return;}_0x36f456[_0x4588a4(0x217)]()&&this[_0x4588a4(0x212)]('idle');const _0x313ef1=_0x36f456[_0x4588a4(0x1cb)]();if(_0x36f456[_0x4588a4(0x246)]()||_0x36f456['isActing']())this['playDragonbonesMotion'](_0x4588a4(0x291));else{if(_0x313ef1===0x3)this[_0x4588a4(0x1d3)]('dead');else{if(_0x313ef1===0x2)this[_0x4588a4(0x1d3)]('sleep');else{if(_0x36f456[_0x4588a4(0x25e)]()&&BattleManager[_0x4588a4(0x225)]())this[_0x4588a4(0x1d3)](_0x4588a4(0x1bd));else{if(_0x36f456[_0x4588a4(0x1e9)]())this[_0x4588a4(0x1d3)](_0x4588a4(0x335));else{if(_0x36f456[_0x4588a4(0x222)]()||_0x36f456[_0x4588a4(0x205)]())this[_0x4588a4(0x1d3)]('guard');else{if(_0x313ef1===0x1)this['playDragonbonesMotion'](_0x4588a4(0x306));else{if(_0x36f456[_0x4588a4(0x349)]())this[_0x4588a4(0x1d3)](_0x4588a4(0x291));else _0x36f456[_0x4588a4(0x1e0)]()?this['playDragonbonesMotion'](_0x4588a4(0x291)):this[_0x4588a4(0x1d3)](_0x4588a4(0x291));}}}}}}}},Sprite_Battler[_0x3a836d(0x296)][_0x3a836d(0x1c5)]=function(){const _0x4f1e24=_0x3a836d;if(!this[_0x4f1e24(0x21c)][_0x4f1e24(0x25e)]())return![];if(this[_0x4f1e24(0x21c)]===BattleManager[_0x4f1e24(0x302)])return!![];if(this['_battler']===BattleManager[_0x4f1e24(0x266)]()&&this[_0x4f1e24(0x21c)][_0x4f1e24(0x246)]())return!![];if(this[_0x4f1e24(0x21c)][_0x4f1e24(0x316)])return!![];if(BattleManager[_0x4f1e24(0x26e)]===this[_0x4f1e24(0x21c)])return!![];if(BattleManager[_0x4f1e24(0x2dc)]['includes'](this[_0x4f1e24(0x21c)]))return!![];return![];},VisuMZ[_0x3a836d(0x345)]['Sprite_Enemy_setHue']=Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x315)],Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x315)]=function(_0x372181){const _0x100ff9=_0x3a836d;this[_0x100ff9(0x31b)]()?this[_0x100ff9(0x279)](_0x372181):VisuMZ[_0x100ff9(0x345)][_0x100ff9(0x2b0)][_0x100ff9(0x27c)](this,_0x372181);},Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x31b)]=function(){const _0x4386ce=_0x3a836d;if(!this[_0x4386ce(0x21c)])return![];if(!this[_0x4386ce(0x2d5)])return![];const _0x55d917=this['_battler']['enemy']()['note']||'';if(_0x55d917['match'](/<DRAGONBONES HUE AFFECTED>/i))return!![];else{if(_0x55d917[_0x4386ce(0x2ea)](/<DRAGONBONES NO HUE>/i))return![];}return VisuMZ[_0x4386ce(0x345)]['Settings'][_0x4386ce(0x2bb)]['HueAffected'];},Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x279)]=function(_0x556502){const _0x45f186=_0x3a836d;this['_dragonbonesSpriteContainer'][_0x45f186(0x2af)]!==_0x556502&&this[_0x45f186(0x1c9)][_0x45f186(0x315)](_0x556502);},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x1e6)]=Sprite_Actor['prototype'][_0x3a836d(0x292)],Sprite_Actor['prototype'][_0x3a836d(0x292)]=function(){const _0x32d277=_0x3a836d;VisuMZ[_0x32d277(0x345)][_0x32d277(0x1e6)][_0x32d277(0x27c)](this),this['initMembersDragonbonesUnion']();},VisuMZ['DragonbonesUnion'][_0x3a836d(0x33c)]=Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x1d6)],Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x1d6)]=function(){const _0x190aed=_0x3a836d;VisuMZ[_0x190aed(0x345)][_0x190aed(0x33c)][_0x190aed(0x27c)](this),!this['_battler']&&this[_0x190aed(0x2d5)]&&this['disposeDragonbones']();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x223)]=Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x288)],Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x288)]=function(){const _0x4a6e58=_0x3a836d,_0x16c015=this[_0x4a6e58(0x21c)];_0x16c015['hasDragonbonesBattler']()?(Sprite_Battler[_0x4a6e58(0x296)]['updateBitmap'][_0x4a6e58(0x27c)](this),this['_dragonbonesName']!==_0x16c015[_0x4a6e58(0x305)]()['battler']&&this['setupDragonbones'](),this[_0x4a6e58(0x219)]()):(VisuMZ[_0x4a6e58(0x345)][_0x4a6e58(0x223)][_0x4a6e58(0x27c)](this),this['_dragonbones']&&this['disposeDragonbones']());},VisuMZ[_0x3a836d(0x345)]['Sprite_Actor_startMotion']=Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x265)],Sprite_Actor['prototype']['startMotion']=function(_0x5c2511){const _0x5520a2=_0x3a836d;VisuMZ['DragonbonesUnion']['Sprite_Actor_startMotion'][_0x5520a2(0x27c)](this,_0x5c2511),this[_0x5520a2(0x34e)][_0x5520a2(0x1ed)]===_0x5520a2(0x2ff)&&this[_0x5520a2(0x1d3)](_0x5c2511);},VisuMZ[_0x3a836d(0x345)]['Sprite_Actor_updateShadow']=Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x2ad)],Sprite_Actor['prototype']['updateShadow']=function(){const _0x335979=_0x3a836d;this[_0x335979(0x1f1)](),VisuMZ[_0x335979(0x345)][_0x335979(0x239)][_0x335979(0x27c)](this),this[_0x335979(0x21c)]&&this[_0x335979(0x21c)][_0x335979(0x2d8)]()&&(this['_shadowSprite'][_0x335979(0x2c3)]=![]);},Sprite_Actor[_0x3a836d(0x296)]['updateShadowDragonbonesUnion']=function(){const _0x4e38f4=_0x3a836d;if(this[_0x4e38f4(0x34e)]!==Sprite_Actor)return;let _0x208ccb=!![];if(this['_battler']&&this[_0x4e38f4(0x21c)][_0x4e38f4(0x2d8)]())_0x208ccb=![];this[_0x4e38f4(0x2f4)][_0x4e38f4(0x2c3)]=_0x208ccb,this[_0x4e38f4(0x2d4)][_0x4e38f4(0x2c3)]=_0x208ccb,this[_0x4e38f4(0x2bc)][_0x4e38f4(0x2c3)]=_0x208ccb;},VisuMZ[_0x3a836d(0x345)]['Sprite_Actor_updateFrame']=Sprite_Actor[_0x3a836d(0x296)]['updateFrame'],Sprite_Actor['prototype'][_0x3a836d(0x331)]=function(){const _0x54ac8f=_0x3a836d;this[_0x54ac8f(0x21c)]&&this[_0x54ac8f(0x21c)][_0x54ac8f(0x2d8)]()?this[_0x54ac8f(0x329)]():VisuMZ['DragonbonesUnion'][_0x54ac8f(0x332)][_0x54ac8f(0x27c)](this);},Sprite_Actor[_0x3a836d(0x296)][_0x3a836d(0x329)]=function(){const _0x38ec2b=_0x3a836d,_0x5b26d0=this[_0x38ec2b(0x2f4)][_0x38ec2b(0x21d)];if(_0x5b26d0){const _0xa7574d=_0x5b26d0[_0x38ec2b(0x32c)],_0x69e8dc=_0x5b26d0[_0x38ec2b(0x271)];this[_0x38ec2b(0x2f4)][_0x38ec2b(0x1d0)](0x0,0x0,_0xa7574d,_0x69e8dc),this[_0x38ec2b(0x1d0)](0x0,0x0,_0xa7574d,_0x69e8dc);}},VisuMZ[_0x3a836d(0x345)]['Sprite_Enemy_initMembers']=Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x292)],Sprite_Enemy['prototype'][_0x3a836d(0x292)]=function(){const _0xba33ad=_0x3a836d;VisuMZ[_0xba33ad(0x345)][_0xba33ad(0x30a)]['call'](this),this[_0xba33ad(0x229)]();},VisuMZ['DragonbonesUnion'][_0x3a836d(0x30b)]=Sprite_Enemy[_0x3a836d(0x296)]['setBattler'],Sprite_Enemy[_0x3a836d(0x296)]['setBattler']=function(_0xff85db){const _0x3a3f3b=_0x3a836d;this[_0x3a3f3b(0x29e)](),VisuMZ[_0x3a3f3b(0x345)][_0x3a3f3b(0x30b)][_0x3a3f3b(0x27c)](this,_0xff85db);if(_0xff85db['isHidden']())this['opacity']=0x0;},VisuMZ['DragonbonesUnion'][_0x3a836d(0x1db)]=Sprite_Enemy['prototype'][_0x3a836d(0x288)],Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x288)]=function(){const _0x120d74=_0x3a836d,_0x3a679e=this[_0x120d74(0x21c)];_0x3a679e[_0x120d74(0x2d8)]()?(Sprite_Battler[_0x120d74(0x296)][_0x120d74(0x288)][_0x120d74(0x27c)](this),this[_0x120d74(0x275)]!==_0x3a679e[_0x120d74(0x305)]()[_0x120d74(0x1fc)]&&this['setupDragonbones'](),this[_0x120d74(0x219)](),this[_0x120d74(0x315)](this[_0x120d74(0x24c)]['battlerHue']())):(VisuMZ['DragonbonesUnion'][_0x120d74(0x1db)][_0x120d74(0x27c)](this),this[_0x120d74(0x340)](this[_0x120d74(0x2d5)]));},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x2c6)]=Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x2bf)],Sprite_Enemy[_0x3a836d(0x296)][_0x3a836d(0x2bf)]=function(){const _0x2b5dd7=_0x3a836d;VisuMZ[_0x2b5dd7(0x345)]['Sprite_Enemy_refreshMotion'][_0x2b5dd7(0x27c)](this);if(!VisuMZ[_0x2b5dd7(0x345)][_0x2b5dd7(0x1fe)][_0x2b5dd7(0x2bd)])return;const _0x3122a9=this[_0x2b5dd7(0x21c)];_0x3122a9&&_0x3122a9['hasDragonbonesBattler']()&&this['refreshMotionDragonbones']();},Sprite_Enemy[_0x3a836d(0x296)]['refreshMotionDragonbones']=function(){const _0x437d16=_0x3a836d,_0x1a2015=this['_battler'];if(_0x1a2015){const _0x33da8f=_0x1a2015[_0x437d16(0x1cb)]();if(_0x1a2015['isInputting']()||_0x1a2015[_0x437d16(0x1ff)]())this[_0x437d16(0x1d3)](_0x437d16(0x2c7));else{if(_0x33da8f===0x3)this['playDragonbonesMotion'](_0x437d16(0x2d1));else{if(_0x33da8f===0x2)this[_0x437d16(0x1d3)](_0x437d16(0x241));else{if(_0x1a2015[_0x437d16(0x1e9)]())this[_0x437d16(0x1d3)](_0x437d16(0x335));else{if(_0x1a2015[_0x437d16(0x222)]()||_0x1a2015['isGuardWaiting']())this[_0x437d16(0x1d3)](_0x437d16(0x2cc));else{if(_0x33da8f===0x1)this[_0x437d16(0x1d3)](_0x437d16(0x306));else{if(_0x1a2015[_0x437d16(0x349)]())this[_0x437d16(0x1d3)](_0x437d16(0x291));else _0x1a2015['isUndecided']()?this[_0x437d16(0x1d3)]('idle'):this[_0x437d16(0x1d3)](_0x437d16(0x291));}}}}}}}},Spriteset_Battle[_0x3a836d(0x296)][_0x3a836d(0x29e)]=function(){const _0x420f3f=_0x3a836d;for(const _0x48d10f of this[_0x420f3f(0x2f8)]()){if(!_0x48d10f)continue;_0x48d10f[_0x420f3f(0x29e)]();}},PluginManager[_0x3a836d(0x232)](pluginData['name'],_0x3a836d(0x318),_0x52d8b9=>{const _0x1696b6=_0x3a836d;if(!$gameScreen)return;VisuMZ[_0x1696b6(0x1cc)](_0x52d8b9,_0x52d8b9),$gameScreen[_0x1696b6(0x2f6)](_0x52d8b9[_0x1696b6(0x234)]);const _0x314c0d=$gameScreen[_0x1696b6(0x350)](_0x52d8b9['PictureID']),_0x4e9d54=_0x314c0d['dragonbonesData']();_0x4e9d54[_0x1696b6(0x303)]=_0x52d8b9[_0x1696b6(0x28a)],_0x4e9d54[_0x1696b6(0x270)]=_0x52d8b9[_0x1696b6(0x2b8)],_0x4e9d54[_0x1696b6(0x33a)]=_0x52d8b9[_0x1696b6(0x21e)],_0x4e9d54[_0x1696b6(0x2f2)]=_0x52d8b9['OffsetY'],_0x4e9d54['scaleX']=_0x52d8b9[_0x1696b6(0x27f)],_0x4e9d54[_0x1696b6(0x280)]=_0x52d8b9['ScaleY'],_0x4e9d54['timeScale']=_0x52d8b9[_0x1696b6(0x220)];}),PluginManager['registerCommand'](pluginData[_0x3a836d(0x1ed)],_0x3a836d(0x22f),_0x4747f8=>{const _0x50176d=_0x3a836d;if(!$gameScreen)return;VisuMZ[_0x50176d(0x1cc)](_0x4747f8,_0x4747f8),$gameScreen[_0x50176d(0x2f6)](_0x4747f8['PictureID']);const _0x535dac=$gameScreen[_0x50176d(0x350)](_0x4747f8[_0x50176d(0x234)]),_0x1f3a36=_0x535dac['dragonbonesData'](),_0x5ab8f4=_0x4747f8[_0x50176d(0x2fc)]||![];_0x1f3a36[_0x50176d(0x270)]=_0x4747f8[_0x50176d(0x2b8)],_0x1f3a36['revertToIdle']=_0x5ab8f4;}),PluginManager[_0x3a836d(0x232)](pluginData['name'],_0x3a836d(0x2ec),_0x585469=>{const _0x1dfd13=_0x3a836d;if(!$gameScreen)return;VisuMZ[_0x1dfd13(0x1cc)](_0x585469,_0x585469),$gameScreen[_0x1dfd13(0x2f6)](_0x585469[_0x1dfd13(0x234)]);const _0x3b6f98=$gameScreen[_0x1dfd13(0x350)](_0x585469[_0x1dfd13(0x234)]),_0x1424c3=_0x3b6f98[_0x1dfd13(0x305)]();_0x1424c3[_0x1dfd13(0x33a)]=_0x585469[_0x1dfd13(0x21e)],_0x1424c3[_0x1dfd13(0x2f2)]=_0x585469[_0x1dfd13(0x32b)];}),PluginManager[_0x3a836d(0x232)](pluginData[_0x3a836d(0x1ed)],_0x3a836d(0x2e0),_0x1cdf92=>{const _0x22ebdf=_0x3a836d;if(!$gameScreen)return;VisuMZ[_0x22ebdf(0x1cc)](_0x1cdf92,_0x1cdf92),$gameScreen[_0x22ebdf(0x2f6)](_0x1cdf92['PictureID']);const _0x2eaa84=$gameScreen[_0x22ebdf(0x350)](_0x1cdf92['PictureID']),_0x30bed6=_0x2eaa84[_0x22ebdf(0x305)]();_0x30bed6[_0x22ebdf(0x22d)]=_0x1cdf92['ScaleX'],_0x30bed6[_0x22ebdf(0x280)]=_0x1cdf92[_0x22ebdf(0x319)];}),PluginManager[_0x3a836d(0x232)](pluginData['name'],_0x3a836d(0x1eb),_0x101eac=>{const _0x2dcf8e=_0x3a836d;if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x101eac,_0x101eac),$gameScreen[_0x2dcf8e(0x2f6)](_0x101eac[_0x2dcf8e(0x234)]);const _0x41896a=$gameScreen[_0x2dcf8e(0x350)](_0x101eac[_0x2dcf8e(0x234)]),_0x23acb8=_0x41896a[_0x2dcf8e(0x305)]();_0x23acb8[_0x2dcf8e(0x256)]=_0x101eac[_0x2dcf8e(0x220)];}),Game_Screen[_0x3a836d(0x296)][_0x3a836d(0x2f6)]=function(_0x23c692){const _0x413a58=_0x3a836d;if(this[_0x413a58(0x350)](_0x23c692))return;this[_0x413a58(0x283)](_0x23c692,'',0x0,Math[_0x413a58(0x28d)](Graphics[_0x413a58(0x32c)]/0x2),Math[_0x413a58(0x28d)](Graphics[_0x413a58(0x271)]/0x2),0x64,0x64,0xff,0x0);},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x2e9)]=Game_Screen['prototype'][_0x3a836d(0x2a0)],Game_Screen[_0x3a836d(0x296)]['erasePicture']=function(_0x3047fc){const _0x1f9cca=_0x3a836d;this[_0x1f9cca(0x2cd)](_0x3047fc),VisuMZ[_0x1f9cca(0x345)]['Game_Screen_erasePicture'][_0x1f9cca(0x27c)](this,_0x3047fc);},Game_Screen[_0x3a836d(0x296)][_0x3a836d(0x2cd)]=function(_0x55463c){const _0x4a2de6=_0x3a836d,_0x3a2df7=this[_0x4a2de6(0x304)](_0x55463c),_0x5a12f8=this['_pictures'][_0x3a2df7];if(!_0x5a12f8)return;_0x5a12f8['initDragonbonesData'](),_0x5a12f8[_0x4a2de6(0x29e)]();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x294)]=Game_Picture['prototype'][_0x3a836d(0x1c3)],Game_Picture[_0x3a836d(0x296)][_0x3a836d(0x1c3)]=function(){const _0x59eb81=_0x3a836d;VisuMZ[_0x59eb81(0x345)][_0x59eb81(0x294)][_0x59eb81(0x27c)](this),this[_0x59eb81(0x269)]();},Game_Picture['prototype'][_0x3a836d(0x269)]=function(){const _0x43da54=_0x3a836d;this[_0x43da54(0x344)]={'filename':'','animation':DragonbonesManager[_0x43da54(0x1dd)],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1,'revertToIdle':![]};},Game_Picture['prototype'][_0x3a836d(0x305)]=function(){const _0xe712f4=_0x3a836d;if(this[_0xe712f4(0x344)]!==undefined)return this[_0xe712f4(0x344)];return this[_0xe712f4(0x269)](),this[_0xe712f4(0x344)];},Game_Picture[_0x3a836d(0x296)][_0x3a836d(0x25d)]=function(){const _0x4f6c49=_0x3a836d;return this[_0x4f6c49(0x305)]()[_0x4f6c49(0x303)]!=='';},Game_Picture['prototype'][_0x3a836d(0x29e)]=function(){const _0x8df400=_0x3a836d;if(!SceneManager[_0x8df400(0x248)])return;if(!SceneManager[_0x8df400(0x248)][_0x8df400(0x2f1)])return;const _0x4326a7=SceneManager['_scene'][_0x8df400(0x2f1)][_0x8df400(0x1d1)](this);if(_0x4326a7)_0x4326a7[_0x8df400(0x29e)]();},Spriteset_Base['prototype'][_0x3a836d(0x1d1)]=function(_0x8de040){const _0x2816a5=_0x3a836d;return this['_pictureContainer'][_0x2816a5(0x262)][_0x2816a5(0x287)](_0x5b93e8=>_0x5b93e8&&_0x5b93e8[_0x2816a5(0x350)]()===_0x8de040);},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x341)]=Sprite_Picture[_0x3a836d(0x296)]['initialize'],Sprite_Picture['prototype'][_0x3a836d(0x1c3)]=function(_0x2bfb77){const _0x45f21d=_0x3a836d;this[_0x45f21d(0x269)](),VisuMZ['DragonbonesUnion'][_0x45f21d(0x341)]['call'](this,_0x2bfb77);},Sprite_Picture[_0x3a836d(0x296)]['initDragonbonesData']=function(_0x37c69b){const _0x156f55=_0x3a836d;this[_0x156f55(0x2d5)]=null,this[_0x156f55(0x28f)]='',this[_0x156f55(0x293)]='';},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x247)]=Sprite_Picture[_0x3a836d(0x296)]['update'],Sprite_Picture['prototype'][_0x3a836d(0x1d6)]=function(){const _0x5ae76d=_0x3a836d;VisuMZ[_0x5ae76d(0x345)][_0x5ae76d(0x247)][_0x5ae76d(0x27c)](this),this[_0x5ae76d(0x219)]();},Sprite_Picture[_0x3a836d(0x296)][_0x3a836d(0x29e)]=function(){const _0x61b6bd=_0x3a836d;this['_dragonbones']&&(this[_0x61b6bd(0x340)](this[_0x61b6bd(0x2d5)]),this[_0x61b6bd(0x2d5)][_0x61b6bd(0x300)](),this[_0x61b6bd(0x2d5)]=null,this[_0x61b6bd(0x28f)]='',this[_0x61b6bd(0x293)]='');},Sprite_Picture['prototype']['updateDragonbones']=function(){const _0x57beda=_0x3a836d,_0x33691f=this[_0x57beda(0x350)]();if(!_0x33691f)return this[_0x57beda(0x29e)]();if(!_0x33691f[_0x57beda(0x25d)]())return this[_0x57beda(0x29e)]();this[_0x57beda(0x249)]();if(!this[_0x57beda(0x2d5)])return;this[_0x57beda(0x200)](),this['updateDragonbonesProperties'](),this[_0x57beda(0x26a)]();},Sprite_Picture[_0x3a836d(0x296)][_0x3a836d(0x249)]=function(){const _0x3a2088=_0x3a836d,_0x4fd739=this[_0x3a2088(0x350)]()[_0x3a2088(0x305)]();if(this[_0x3a2088(0x28f)]===_0x4fd739['filename'])return;this[_0x3a2088(0x29e)](),this[_0x3a2088(0x28f)]=_0x4fd739[_0x3a2088(0x303)],DragonbonesManager[_0x3a2088(0x2ee)](_0x4fd739['filename'],this[_0x3a2088(0x289)][_0x3a2088(0x23e)](this));},Sprite_Picture['prototype'][_0x3a836d(0x289)]=function(){const _0x39c5dc=_0x3a836d,_0x3a44dc=this[_0x39c5dc(0x350)]()[_0x39c5dc(0x305)]();this[_0x39c5dc(0x2d5)]=DragonbonesManager[_0x39c5dc(0x299)](_0x3a44dc[_0x39c5dc(0x303)]),this['addChildAt'](this['_dragonbones'],0x0),this[_0x39c5dc(0x200)]();},Sprite_Picture[_0x3a836d(0x296)]['updateDragonbonesAnimation']=function(){const _0xfbf7e5=_0x3a836d;if(!this['_dragonbones'])return;const _0x1a2709=this[_0xfbf7e5(0x350)]()[_0xfbf7e5(0x305)]();this['_dragonbonesAnimation']!==_0x1a2709[_0xfbf7e5(0x270)]&&(this[_0xfbf7e5(0x293)]=_0x1a2709[_0xfbf7e5(0x270)],this[_0xfbf7e5(0x212)]());},Sprite_Picture['prototype'][_0x3a836d(0x212)]=function(){const _0x842df7=_0x3a836d;if(!this[_0x842df7(0x2d5)])return;const _0x2fe03c=this[_0x842df7(0x2d5)][_0x842df7(0x270)],_0x49cf70=this['_dragonbonesAnimation'][_0x842df7(0x2ed)]()['trim']();_0x2fe03c[_0x842df7(0x2a8)][_0x49cf70]&&_0x2fe03c['play'](_0x49cf70);},Sprite_Picture['prototype'][_0x3a836d(0x263)]=function(){const _0x33d692=_0x3a836d;if(!this[_0x33d692(0x2d5)])return;const _0xef4d29=this['picture']()[_0x33d692(0x305)]();this[_0x33d692(0x2d5)]['x']=_0xef4d29[_0x33d692(0x33a)],this[_0x33d692(0x2d5)]['y']=_0xef4d29[_0x33d692(0x2f2)],this[_0x33d692(0x2d5)]['scale']['x']=_0xef4d29[_0x33d692(0x22d)],this['_dragonbones'][_0x33d692(0x236)]['y']=_0xef4d29[_0x33d692(0x280)],this['_dragonbones'][_0x33d692(0x270)][_0x33d692(0x1e2)]===![]&&_0xef4d29['revertToIdle']&&(_0xef4d29[_0x33d692(0x270)]=_0x33d692(0x291));},Sprite_Picture[_0x3a836d(0x296)][_0x3a836d(0x26a)]=function(){const _0x2bd251=_0x3a836d;if(!this[_0x2bd251(0x2d5)])return;const _0x1e705b=this[_0x2bd251(0x350)]()[_0x2bd251(0x305)]();let _0x638d4d=_0x1e705b['timeScale'];this['_dragonbones']['animation'][_0x2bd251(0x256)]=_0x638d4d;},PluginManager[_0x3a836d(0x232)](pluginData[_0x3a836d(0x1ed)],_0x3a836d(0x26f),_0x1ac7c8=>{const _0x3bcb27=_0x3a836d;if(!$gameMap)return;VisuMZ[_0x3bcb27(0x1cc)](_0x1ac7c8,_0x1ac7c8);const _0x3f8a0c=$gameActors['actor'](_0x1ac7c8[_0x3bcb27(0x2be)]);if(!_0x3f8a0c)return;const _0x599cba=JsonEx[_0x3bcb27(0x2d6)](_0x3f8a0c[_0x3bcb27(0x2c4)]);_0x3f8a0c[_0x3bcb27(0x2c4)]={'filename':_0x1ac7c8[_0x3bcb27(0x28a)],'animation':'','scaleX':_0x1ac7c8[_0x3bcb27(0x27f)],'scaleY':_0x1ac7c8[_0x3bcb27(0x319)],'offsetX':_0x1ac7c8[_0x3bcb27(0x21e)],'offsetY':_0x1ac7c8[_0x3bcb27(0x32b)],'timeScale':_0x1ac7c8[_0x3bcb27(0x220)],'walkRate':_0x1ac7c8[_0x3bcb27(0x2e6)]??0x1,'dashRate':_0x1ac7c8[_0x3bcb27(0x211)]??0x1,'width':_0x1ac7c8['Width'],'height':_0x1ac7c8['Height'],'flipLeft':_0x1ac7c8[_0x3bcb27(0x25b)],'flipRight':_0x1ac7c8[_0x3bcb27(0x1f0)],'animationNames':{'idle':_0x1ac7c8['Idle'],'walk':_0x1ac7c8[_0x3bcb27(0x1de)],'dash':_0x1ac7c8[_0x3bcb27(0x313)],'jump':_0x1ac7c8[_0x3bcb27(0x2cb)],'ladderidle':_0x1ac7c8[_0x3bcb27(0x2b9)],'ladderclimb':_0x1ac7c8[_0x3bcb27(0x1e1)],'ropeidle':_0x1ac7c8[_0x3bcb27(0x2d0)],'ropeclimb':_0x1ac7c8[_0x3bcb27(0x1dc)]}},$gamePlayer[_0x3bcb27(0x24a)]();}),PluginManager[_0x3a836d(0x232)](pluginData[_0x3a836d(0x1ed)],_0x3a836d(0x1f9),_0x262820=>{const _0x54a4b8=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0x54a4b8(0x248)][_0x54a4b8(0x34e)]!==Scene_Map)return;VisuMZ[_0x54a4b8(0x1cc)](_0x262820,_0x262820);const _0x54af17=$gameActors[_0x54a4b8(0x266)](_0x262820[_0x54a4b8(0x2be)]),_0x14d7a9=_0x54af17['index'](),_0x6ebba5=_0x14d7a9===0x0?$gamePlayer:$gamePlayer['followers']()['follower'](_0x14d7a9-0x1);if(!_0x6ebba5)return;_0x6ebba5[_0x54a4b8(0x31a)]=_0x262820[_0x54a4b8(0x2b8)];}),PluginManager[_0x3a836d(0x232)](pluginData['name'],'MapSprite_ActorAnimationStop',_0x3791d3=>{const _0xb819c=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0xb819c(0x248)][_0xb819c(0x34e)]!==Scene_Map)return;VisuMZ[_0xb819c(0x1cc)](_0x3791d3,_0x3791d3);const _0x417c4b=$gameActors[_0xb819c(0x266)](_0x3791d3[_0xb819c(0x2be)]),_0x624bde=_0x417c4b[_0xb819c(0x1fa)](),_0x90f816=_0x624bde===0x0?$gamePlayer:$gamePlayer['followers']()[_0xb819c(0x324)](_0x624bde-0x1);if(!_0x90f816)return;_0x90f816[_0xb819c(0x31a)]='';}),PluginManager[_0x3a836d(0x232)](pluginData[_0x3a836d(0x1ed)],'MapSprite_EventAnimationPlay',_0x3f6b6c=>{const _0x20310d=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0x20310d(0x248)]['constructor']!==Scene_Map)return;VisuMZ['ConvertParams'](_0x3f6b6c,_0x3f6b6c);const _0x3c9d7b=$gameTemp['getLastPluginCommandInterpreter'](),_0x3f5379=$gameMap[_0x20310d(0x1e8)](_0x3f6b6c[_0x20310d(0x206)]||_0x3c9d7b['eventId']());if(!_0x3f5379)return;_0x3f5379['dragonbonesAnimation']=_0x3f6b6c[_0x20310d(0x2b8)];}),PluginManager[_0x3a836d(0x232)](pluginData['name'],'MapSprite_EventAnimationStop',_0x493b59=>{const _0x4701d3=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0x4701d3(0x248)][_0x4701d3(0x34e)]!==Scene_Map)return;VisuMZ[_0x4701d3(0x1cc)](_0x493b59,_0x493b59);const _0x3991b2=$gameTemp[_0x4701d3(0x343)](),_0x4594a9=$gameMap[_0x4701d3(0x1e8)](_0x493b59[_0x4701d3(0x206)]||_0x3991b2[_0x4701d3(0x207)]());if(!_0x4594a9)return;_0x4594a9[_0x4701d3(0x31a)]='';}),PluginManager[_0x3a836d(0x232)](pluginData['name'],_0x3a836d(0x30c),_0x4768c6=>{const _0x45afc9=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0x45afc9(0x248)]['constructor']!==Scene_Map)return;VisuMZ['ConvertParams'](_0x4768c6,_0x4768c6);const _0x1206f1=$gamePlayer[_0x45afc9(0x31f)]()[_0x45afc9(0x324)](_0x4768c6[_0x45afc9(0x1c0)]);if(!_0x1206f1)return;_0x1206f1[_0x45afc9(0x31a)]=_0x4768c6[_0x45afc9(0x2b8)];}),PluginManager[_0x3a836d(0x232)](pluginData[_0x3a836d(0x1ed)],_0x3a836d(0x2de),_0x3d2bd1=>{const _0x164c56=_0x3a836d;if(!$gameMap)return;if(SceneManager['_scene'][_0x164c56(0x34e)]!==Scene_Map)return;VisuMZ[_0x164c56(0x1cc)](_0x3d2bd1,_0x3d2bd1);const _0x13b079=$gamePlayer['followers']()[_0x164c56(0x324)](_0x3d2bd1[_0x164c56(0x1c0)]);if(!_0x13b079)return;_0x13b079[_0x164c56(0x31a)]='';}),PluginManager['registerCommand'](pluginData[_0x3a836d(0x1ed)],_0x3a836d(0x2aa),_0xec1b6e=>{const _0x5d76f4=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0x5d76f4(0x248)][_0x5d76f4(0x34e)]!==Scene_Map)return;VisuMZ[_0x5d76f4(0x1cc)](_0xec1b6e,_0xec1b6e),$gamePlayer[_0x5d76f4(0x31a)]=_0xec1b6e[_0x5d76f4(0x2b8)];}),PluginManager['registerCommand'](pluginData[_0x3a836d(0x1ed)],'MapSprite_PlayerAnimationStop',_0x8d6d3f=>{const _0x1c53c5=_0x3a836d;if(!$gameMap)return;if(SceneManager[_0x1c53c5(0x248)][_0x1c53c5(0x34e)]!==Scene_Map)return;$gamePlayer['dragonbonesAnimation']='';}),Game_Temp[_0x3a836d(0x296)][_0x3a836d(0x339)]=function(_0x5105d5){const _0x28c8af=_0x3a836d;this[_0x28c8af(0x23d)]=_0x5105d5;},Game_Temp[_0x3a836d(0x296)][_0x3a836d(0x343)]=function(){return this['_lastPluginCommandInterpreter'];},Object['defineProperty'](Game_CharacterBase[_0x3a836d(0x296)],'dragonbonesAnimation',{'get':function(){const _0x414ff4=_0x3a836d;return this[_0x414ff4(0x1c4)]()[_0x414ff4(0x270)];},'set':function(_0x497a7a){const _0x4c8dc0=_0x3a836d;this[_0x4c8dc0(0x1c4)]()[_0x4c8dc0(0x270)]=_0x497a7a;},'configurable':!![]}),Game_CharacterBase[_0x3a836d(0x296)]['initDragonbonesData']=function(){const _0x5a37af=_0x3a836d,_0x249769=VisuMZ[_0x5a37af(0x345)][_0x5a37af(0x1fe)][_0x5a37af(0x204)];this[_0x5a37af(0x2c4)]={'filename':'','animation':'','scaleX':_0x249769[_0x5a37af(0x27f)],'scaleY':_0x249769[_0x5a37af(0x319)],'offsetX':_0x249769[_0x5a37af(0x21e)],'offsetY':_0x249769['OffsetY'],'timeScale':_0x249769[_0x5a37af(0x220)],'walkRate':0x1,'dashRate':0x1,'width':_0x249769['Width'],'height':_0x249769['Height'],'flipLeft':_0x249769[_0x5a37af(0x25b)],'flipRight':_0x249769[_0x5a37af(0x1f0)],'animationNames':{'idle':_0x249769['Idle'],'walk':_0x249769[_0x5a37af(0x1de)],'dash':_0x249769['Dash'],'jump':_0x249769[_0x5a37af(0x2cb)],'ladderidle':_0x249769[_0x5a37af(0x2b9)],'ladderclimb':_0x249769[_0x5a37af(0x1e1)],'ropeidle':_0x249769[_0x5a37af(0x2d0)],'ropeclimb':_0x249769[_0x5a37af(0x1dc)]}},this['_dragonbonesMoveTimer']===undefined&&(this['_dragonbonesMoveTimer']=0x0);},Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x2e2)]=function(){},Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x338)]=function(_0x12379a){const _0x2067f9=_0x3a836d,_0x2f4271=this[_0x2067f9(0x1c4)]();_0x12379a['match'](/<DRAGONBONES SPRITE:[ ]*(.*)>/i)&&(_0x2f4271[_0x2067f9(0x303)]=String(RegExp['$1'])[_0x2067f9(0x308)]());_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE (?:SKIN|NAME|FILENAME):[ ]*(.*)>/i)&&(_0x2f4271[_0x2067f9(0x303)]=String(RegExp['$1'])[_0x2067f9(0x308)]());_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x2f4271['scaleX']=Number(RegExp['$1']),_0x2f4271[_0x2067f9(0x280)]=Number(RegExp['$2']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x22d)]=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ](?:SCALEY|SCALE Y):[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x280)]=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x33a)]=Number(RegExp['$1']),_0x2f4271[_0x2067f9(0x2f2)]=Number(RegExp['$2']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x33a)]=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x2f2)]=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x2f4271['width']=Number(RegExp['$1']),_0x2f4271[_0x2067f9(0x271)]=Number(RegExp['$2']));_0x12379a['match'](/<DRAGONBONES SPRITE[ ]WIDTH:[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x32c)]=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ]HEIGHT:[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x271)]=Number(RegExp['$1']));_0x12379a['match'](/<DRAGONBONES SPRITE[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x2f4271['timeScale']=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ](?:WALK RATE|WALKING RATE):[ ](.*)>/i)&&(_0x2f4271[_0x2067f9(0x1bf)]=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE[ ](?:DASH RATE|DASHING RATE):[ ](.*)>/i)&&(_0x2f4271['dashRate']=Number(RegExp['$1']));_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE FLIP LEFT>/i)&&(_0x2f4271[_0x2067f9(0x33e)]=!![]);_0x12379a['match'](/<DRAGONBONES SPRITE NO FLIP LEFT>/i)&&(_0x2f4271['flipLeft']=![]);_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE FLIP RIGHT>/i)&&(_0x2f4271[_0x2067f9(0x2a1)]=!![]);_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE NO FLIP RIGHT>/i)&&(_0x2f4271[_0x2067f9(0x2a1)]=![]);const _0x55499a=_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/gi);if(_0x55499a)for(const _0x305839 of _0x55499a){_0x305839[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/i);const _0x2aa534=String(RegExp['$1'])[_0x2067f9(0x2ed)]()[_0x2067f9(0x308)](),_0x10421c=String(RegExp['$2'])[_0x2067f9(0x2ed)]()[_0x2067f9(0x308)]();_0x2f4271['animationNames'][_0x2aa534]=_0x10421c;}if(_0x12379a[_0x2067f9(0x2ea)](/<DRAGONBONES SPRITE (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/DRAGONBONES SPRITE (?:SETTINGS|SETTING)>/i)){const _0x3ba6ef=String(RegExp['$1']);_0x3ba6ef[_0x2067f9(0x2ea)](/(?:SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x2f4271[_0x2067f9(0x303)]=String(RegExp['$1'])[_0x2067f9(0x308)]());_0x3ba6ef[_0x2067f9(0x2ea)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x22d)]=Number(RegExp['$1']),_0x2f4271[_0x2067f9(0x280)]=Number(RegExp['$2']));_0x3ba6ef[_0x2067f9(0x2ea)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x22d)]=Number(RegExp['$1']));_0x3ba6ef[_0x2067f9(0x2ea)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x280)]=Number(RegExp['$1']));_0x3ba6ef['match'](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x2f4271['offsetX']=Number(RegExp['$1']),_0x2f4271[_0x2067f9(0x2f2)]=Number(RegExp['$2']));_0x3ba6ef[_0x2067f9(0x2ea)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x2f4271['offsetX']=Number(RegExp['$1']));_0x3ba6ef['match'](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x2f2)]=Number(RegExp['$1']));_0x3ba6ef[_0x2067f9(0x2ea)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x256)]=Number(RegExp['$1']));_0x3ba6ef[_0x2067f9(0x2ea)](/(?:WALK RATE|WALKING RATE):[ ](.*)/i)&&(_0x2f4271['walkRate']=Number(RegExp['$1']));_0x3ba6ef[_0x2067f9(0x2ea)](/(?:DASH RATE|DASHING RATE):[ ](.*)/i)&&(_0x2f4271['dashRate']=Number(RegExp['$1']));_0x3ba6ef[_0x2067f9(0x2ea)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x32c)]=Number(RegExp['$1']),_0x2f4271['height']=Number(RegExp['$2']));_0x3ba6ef[_0x2067f9(0x2ea)](/WIDTH:[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x32c)]=Number(RegExp['$1']));_0x3ba6ef['match'](/HEIGHT:[ ](.*)/i)&&(_0x2f4271[_0x2067f9(0x271)]=Number(RegExp['$1']));_0x3ba6ef['match'](/NO FLIP LEFT/i)&&(_0x2f4271[_0x2067f9(0x33e)]=![]);_0x3ba6ef[_0x2067f9(0x2ea)](/FLIP LEFT/i)&&(_0x2f4271['flipLeft']=!![]);_0x3ba6ef[_0x2067f9(0x2ea)](/NO FLIP RIGHT/i)&&(_0x2f4271['flipRight']=![]);_0x3ba6ef['match'](/FLIP RIGHT/i)&&(_0x2f4271['flipRight']=!![]);const _0x55d8ca=_0x12379a['match'](/(?:ANI|MOTION) (.*):[ ](.*)/gi);if(_0x55d8ca)for(const _0x2a9b26 of _0x55d8ca){_0x2a9b26[_0x2067f9(0x2ea)](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x46dad9=String(RegExp['$1'])[_0x2067f9(0x2ed)]()[_0x2067f9(0x308)](),_0x1be004=String(RegExp['$2'])[_0x2067f9(0x2ed)]()[_0x2067f9(0x308)]();_0x2f4271[_0x2067f9(0x32d)][_0x46dad9]=_0x1be004;}}},Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x1c4)]=function(){const _0x34eda9=_0x3a836d;if(this[_0x34eda9(0x2c4)]!==undefined)return this[_0x34eda9(0x2c4)];return this[_0x34eda9(0x269)](),this[_0x34eda9(0x2e2)](),this[_0x34eda9(0x2c4)];},Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x25d)]=function(){const _0x1de840=_0x3a836d;return this[_0x1de840(0x1c4)]()[_0x1de840(0x303)]!=='';},Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x25a)]=function(_0x2a7f69){const _0x5697d7=_0x3a836d,_0x345d92=this[_0x5697d7(0x1c4)]();if(!_0x2a7f69)return _0x345d92[_0x5697d7(0x32d)][_0x5697d7(0x291)];_0x345d92[_0x5697d7(0x270)]=_0x345d92['animation'][_0x5697d7(0x2ed)]()[_0x5697d7(0x308)]();if(_0x345d92[_0x5697d7(0x270)]!==''&&_0x2a7f69['animation'][_0x5697d7(0x2a8)][_0x345d92['animation']])return _0x345d92[_0x5697d7(0x270)];let _0x218025=[];if(this[_0x5697d7(0x23b)]())_0x218025=_0x218025[_0x5697d7(0x203)](this['addDragonbonesAnimationDirections'](_0x345d92['animationNames'][_0x5697d7(0x2fd)])),_0x218025=_0x218025[_0x5697d7(0x203)](this[_0x5697d7(0x2b2)](_0x345d92[_0x5697d7(0x32d)]['walk']));else{if(this[_0x5697d7(0x2f0)]()&&!this[_0x5697d7(0x23b)]())Imported[_0x5697d7(0x2fb)]&&this[_0x5697d7(0x301)]()?(this['_dragonbonesMoveTimer']>0x0&&(_0x218025['push'](_0x345d92['animationNames'][_0x5697d7(0x334)]),_0x218025[_0x5697d7(0x26b)](_0x345d92[_0x5697d7(0x32d)][_0x5697d7(0x1f5)]),_0x218025=_0x218025[_0x5697d7(0x203)](this[_0x5697d7(0x2b2)](_0x345d92[_0x5697d7(0x32d)]['walk']))),_0x218025[_0x5697d7(0x26b)](_0x345d92['animationNames'][_0x5697d7(0x31e)]),_0x218025['push'](_0x345d92[_0x5697d7(0x32d)]['ladderidle'])):(this[_0x5697d7(0x31d)]>0x0&&(_0x218025['push'](_0x345d92[_0x5697d7(0x32d)][_0x5697d7(0x1f5)]),_0x218025=_0x218025[_0x5697d7(0x203)](this[_0x5697d7(0x2b2)](_0x345d92['animationNames']['walk']))),_0x218025[_0x5697d7(0x26b)](_0x345d92[_0x5697d7(0x32d)][_0x5697d7(0x252)]));else this[_0x5697d7(0x31d)]>0x0&&(this[_0x5697d7(0x2fe)]()&&(_0x218025=_0x218025[_0x5697d7(0x203)](this['addDragonbonesAnimationDirections'](_0x345d92[_0x5697d7(0x32d)][_0x5697d7(0x27a)]))),_0x218025=_0x218025[_0x5697d7(0x203)](this['addDragonbonesAnimationDirections'](_0x345d92[_0x5697d7(0x32d)]['walk'])));}_0x218025=_0x218025[_0x5697d7(0x203)](this[_0x5697d7(0x2b2)](_0x345d92[_0x5697d7(0x32d)][_0x5697d7(0x291)]));for(const _0x5dee94 of _0x218025){if(_0x2a7f69['animation'][_0x5697d7(0x2a8)][_0x5dee94])return _0x5dee94;}return _0x345d92['animationNames'][_0x5697d7(0x291)];},Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x2b2)]=function(_0x5b5a64){const _0x2bd507=_0x3a836d,_0x3db8fc=this[_0x2bd507(0x1c4)](),_0x1d7cdd=this[_0x2bd507(0x2c5)]();let _0x35a543=[];_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+_0x1d7cdd);if(_0x1d7cdd===0x1){_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x4);if(_0x3db8fc['flipLeft'])_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x6);_0x35a543['push'](_0x5b5a64+0x2);}if(_0x1d7cdd===0x3){_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x6);if(_0x3db8fc['flipRight'])_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x4);_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x2);}if(_0x1d7cdd===0x7){_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x4);if(_0x3db8fc[_0x2bd507(0x33e)])_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x6);_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x8);}if(_0x1d7cdd===0x9){_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x6);if(_0x3db8fc[_0x2bd507(0x2a1)])_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x4);_0x35a543[_0x2bd507(0x26b)](_0x5b5a64+0x8);}return _0x35a543['push'](_0x5b5a64),_0x35a543;},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x259)]=Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x1d6)],Game_CharacterBase[_0x3a836d(0x296)][_0x3a836d(0x1d6)]=function(){const _0x4efa9d=_0x3a836d;VisuMZ[_0x4efa9d(0x345)][_0x4efa9d(0x259)]['call'](this),this[_0x4efa9d(0x258)]();},Game_CharacterBase['prototype'][_0x3a836d(0x258)]=function(){const _0xc7c963=_0x3a836d;if(!this[_0xc7c963(0x25d)]())return;this[_0xc7c963(0x1d9)]()?this[_0xc7c963(0x31d)]=VisuMZ[_0xc7c963(0x345)]['Settings'][_0xc7c963(0x204)][_0xc7c963(0x1c2)]:this['_dragonbonesMoveTimer']--;},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x1f3)]=Game_Player[_0x3a836d(0x296)][_0x3a836d(0x24a)],Game_Player[_0x3a836d(0x296)]['refresh']=function(){const _0x3f7f06=_0x3a836d;VisuMZ['DragonbonesUnion']['Game_Player_refresh'][_0x3f7f06(0x27c)](this),this[_0x3f7f06(0x2e2)]();},Game_Player[_0x3a836d(0x296)][_0x3a836d(0x2e2)]=function(){const _0x305851=_0x3a836d,_0x15f0a9=$gameParty[_0x305851(0x21f)]();!_0x15f0a9?this[_0x305851(0x269)]():this[_0x305851(0x2c4)]=_0x15f0a9[_0x305851(0x1c4)]();},VisuMZ['DragonbonesUnion']['Game_Follower_refresh']=Game_Follower[_0x3a836d(0x296)]['refresh'],Game_Follower[_0x3a836d(0x296)][_0x3a836d(0x24a)]=function(){const _0x13fb78=_0x3a836d;VisuMZ['DragonbonesUnion'][_0x13fb78(0x255)][_0x13fb78(0x27c)](this),this[_0x13fb78(0x2e2)]();},Game_Follower[_0x3a836d(0x296)][_0x3a836d(0x2e2)]=function(){const _0x59783d=_0x3a836d,_0x52c199=this[_0x59783d(0x266)]();!_0x52c199?this[_0x59783d(0x269)]():this[_0x59783d(0x2c4)]=_0x52c199['dragonbonesSpriteData']();},Game_Actor['prototype'][_0x3a836d(0x269)]=function(){const _0x6814b1=_0x3a836d;Game_BattlerBase[_0x6814b1(0x296)][_0x6814b1(0x269)][_0x6814b1(0x27c)](this),Game_CharacterBase['prototype']['initDragonbonesData'][_0x6814b1(0x27c)](this);},Game_Actor['prototype'][_0x3a836d(0x2e2)]=function(){const _0x48a5fc=_0x3a836d;Game_BattlerBase[_0x48a5fc(0x296)]['setupDragonbonesData'][_0x48a5fc(0x27c)](this);const _0x6aab1f=this[_0x48a5fc(0x266)]()[_0x48a5fc(0x1fd)];Game_CharacterBase[_0x48a5fc(0x296)]['checkDragonbonesStringTags'][_0x48a5fc(0x27c)](this,_0x6aab1f);},Game_Actor[_0x3a836d(0x296)][_0x3a836d(0x1c4)]=function(){const _0xa021ec=_0x3a836d;if(this[_0xa021ec(0x2c4)]!==undefined)return this['_dragonbonesSpriteData'];return this['initDragonbonesData'](),this['setupDragonbonesData'](),this['_dragonbonesSpriteData'];},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x323)]=Game_Event[_0x3a836d(0x296)][_0x3a836d(0x2b6)],Game_Event[_0x3a836d(0x296)][_0x3a836d(0x2b6)]=function(){const _0x2bb296=_0x3a836d;VisuMZ[_0x2bb296(0x345)][_0x2bb296(0x323)][_0x2bb296(0x27c)](this),this[_0x2bb296(0x269)]();},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x253)]=Game_Event[_0x3a836d(0x296)][_0x3a836d(0x348)],Game_Event[_0x3a836d(0x296)][_0x3a836d(0x348)]=function(){const _0x4ae5cd=_0x3a836d;VisuMZ[_0x4ae5cd(0x345)][_0x4ae5cd(0x253)][_0x4ae5cd(0x27c)](this),this[_0x4ae5cd(0x269)](),this[_0x4ae5cd(0x2e2)]();},Game_Event['prototype'][_0x3a836d(0x2e2)]=function(){const _0x36b2b5=_0x3a836d;this[_0x36b2b5(0x2d9)](),this[_0x36b2b5(0x221)]();},Game_Event[_0x3a836d(0x296)]['setupDragonbonesDataNotetags']=function(){const _0x52ac96=_0x3a836d;if(!this[_0x52ac96(0x1e8)]())return;const _0x4701e6=this[_0x52ac96(0x1e8)]()[_0x52ac96(0x1fd)];if(_0x4701e6==='')return;this[_0x52ac96(0x338)](_0x4701e6);},Game_Event['prototype'][_0x3a836d(0x221)]=function(){const _0xd740d=_0x3a836d;if(!this[_0xd740d(0x1e8)]())return;if(!this[_0xd740d(0x209)]())return;const _0x5170cf=this[_0xd740d(0x2f3)]();let _0x3b52bb='';for(const _0x52721f of _0x5170cf){if([0x6c,0x198]['includes'](_0x52721f['code'])){if(_0x3b52bb!=='')_0x3b52bb+='\x0a';_0x3b52bb+=_0x52721f[_0xd740d(0x314)][0x0];}}this[_0xd740d(0x338)](_0x3b52bb);},VisuMZ['DragonbonesUnion']['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3a836d(0x296)][_0x3a836d(0x2db)],Game_Interpreter['prototype']['command357']=function(_0x294538){const _0x3222e1=_0x3a836d;return $gameTemp[_0x3222e1(0x339)](this),VisuMZ['DragonbonesUnion']['Game_Interpreter_PluginCommand'][_0x3222e1(0x27c)](this,_0x294538);},VisuMZ[_0x3a836d(0x345)][_0x3a836d(0x2d2)]=Sprite_Character[_0x3a836d(0x296)]['initialize'],Sprite_Character['prototype'][_0x3a836d(0x1c3)]=function(_0x13ab3a){const _0x77227c=_0x3a836d;this[_0x77227c(0x269)](),VisuMZ[_0x77227c(0x345)][_0x77227c(0x2d2)][_0x77227c(0x27c)](this,_0x13ab3a),this[_0x77227c(0x21b)]();},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x269)]=function(){const _0x83339f=_0x3a836d;this[_0x83339f(0x2d5)]=null,this[_0x83339f(0x28f)]='',this[_0x83339f(0x293)]='';},Sprite_Character[_0x3a836d(0x296)]['createBaseDragonbonesSprite']=function(){const _0x646670=_0x3a836d;this[_0x646670(0x342)]=new Sprite(),this[_0x646670(0x242)](this['_baseDragonbonesSprite']);},VisuMZ[_0x3a836d(0x345)]['Sprite_Character_updateBitmap']=Sprite_Character[_0x3a836d(0x296)]['updateBitmap'],Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x288)]=function(){const _0x2e2caf=_0x3a836d;VisuMZ[_0x2e2caf(0x345)][_0x2e2caf(0x282)][_0x2e2caf(0x27c)](this),this[_0x2e2caf(0x219)]();},Sprite_Character[_0x3a836d(0x296)]['disposeDragonbones']=function(){const _0x3fea92=_0x3a836d;this[_0x3fea92(0x2d5)]&&(this['_baseDragonbonesSprite'][_0x3fea92(0x340)](this['_dragonbones']),this[_0x3fea92(0x2d5)][_0x3fea92(0x300)](),this[_0x3fea92(0x2d5)]=null,this[_0x3fea92(0x28f)]='',this['_dragonbonesAnimation']='');},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x219)]=function(){const _0x261bc0=_0x3a836d;if(!this['_character'])return this[_0x261bc0(0x29e)]();if(!this['_character'][_0x261bc0(0x25d)]())return this[_0x261bc0(0x29e)]();this['updateDragonbonesArmature']();if(!this['_dragonbones'])return;this[_0x261bc0(0x200)](),this[_0x261bc0(0x263)](),this['updateDragonbonesTimeScale']();},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x249)]=function(){const _0x59255e=_0x3a836d,_0x5b29d1=this[_0x59255e(0x281)][_0x59255e(0x1c4)]();if(this[_0x59255e(0x28f)]===_0x5b29d1[_0x59255e(0x303)])return;this['disposeDragonbones'](),this[_0x59255e(0x28f)]=_0x5b29d1[_0x59255e(0x303)],DragonbonesManager[_0x59255e(0x2ee)](_0x5b29d1['filename'],this[_0x59255e(0x289)][_0x59255e(0x23e)](this));},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x289)]=function(){const _0x3a18e8=_0x3a836d,_0x2f69e5=this['_character'][_0x3a18e8(0x1c4)]();this[_0x3a18e8(0x2d5)]=DragonbonesManager[_0x3a18e8(0x299)](_0x2f69e5[_0x3a18e8(0x303)]),this[_0x3a18e8(0x200)](),setTimeout(this[_0x3a18e8(0x1fb)][_0x3a18e8(0x23e)](this),0x0);},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x1fb)]=function(){const _0x1e43a1=_0x3a836d;if(!this[_0x1e43a1(0x2d5)])return;if(!this[_0x1e43a1(0x342)])return;this[_0x1e43a1(0x342)][_0x1e43a1(0x34c)](this['_dragonbones'],0x0);},Sprite_Character[_0x3a836d(0x296)]['updateDragonbonesAnimation']=function(){const _0x5d0597=_0x3a836d;if(!this['_dragonbones'])return;const _0xcdcbbe=this['_character'][_0x5d0597(0x1c4)](),_0x4a37ce=this[_0x5d0597(0x2d5)][_0x5d0597(0x270)],_0x2b4e28=this[_0x5d0597(0x281)][_0x5d0597(0x25a)](this[_0x5d0597(0x2d5)]);if(_0x4a37ce[_0x5d0597(0x2a4)]){if(_0x2b4e28&&_0x2b4e28['match'](/(?:IDLE|WALK|DASH)(\d+)/i))this[_0x5d0597(0x281)][_0x5d0597(0x31a)]='';else{if(this[_0x5d0597(0x309)]())return;}this[_0x5d0597(0x293)]='',_0x4a37ce[_0x5d0597(0x202)]='';}this[_0x5d0597(0x293)]!==_0x2b4e28&&(this[_0x5d0597(0x293)]=_0x2b4e28,this[_0x5d0597(0x212)]());},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x309)]=function(){const _0x125cbf=_0x3a836d;if(!VisuMZ[_0x125cbf(0x345)][_0x125cbf(0x1fe)][_0x125cbf(0x204)][_0x125cbf(0x264)])return;const _0x5d95ee=this['_dragonbones'][_0x125cbf(0x270)];return _0x5d95ee[_0x125cbf(0x20c)][_0x125cbf(0x2a9)]===0x1;},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x212)]=function(){const _0x5bb2df=_0x3a836d;if(!this[_0x5bb2df(0x2d5)])return;const _0x5ac11a=this[_0x5bb2df(0x2d5)][_0x5bb2df(0x270)],_0x5b353c=this[_0x5bb2df(0x293)][_0x5bb2df(0x2ed)]()['trim']();if(_0x5ac11a[_0x5bb2df(0x2a8)][_0x5b353c]){if(_0x5ac11a[_0x5bb2df(0x202)]===_0x5b353c&&_0x5ac11a[_0x5bb2df(0x2a8)][_0x5b353c][_0x5bb2df(0x2a9)]<=0x0)return;_0x5ac11a[_0x5bb2df(0x1d4)](_0x5b353c);}},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x263)]=function(){const _0x29a830=_0x3a836d;if(!this['_dragonbones'])return;const _0x24ebcb=this[_0x29a830(0x281)][_0x29a830(0x1c4)]();this[_0x29a830(0x2d5)]['x']=_0x24ebcb[_0x29a830(0x33a)],this[_0x29a830(0x2d5)]['y']=_0x24ebcb[_0x29a830(0x2f2)],this[_0x29a830(0x2d5)][_0x29a830(0x236)]['x']=_0x24ebcb['scaleX']*this['dragonbonesFlip'](),this['_dragonbones'][_0x29a830(0x236)]['y']=_0x24ebcb[_0x29a830(0x280)];},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x213)]=function(){const _0x20763d=_0x3a836d,_0x415500=this[_0x20763d(0x281)][_0x20763d(0x1c4)]();this[_0x20763d(0x2b4)]=this[_0x20763d(0x2b4)]||0x1;if(_0x415500[_0x20763d(0x33e)]&&[0x1,0x4,0x7][_0x20763d(0x273)](this[_0x20763d(0x281)][_0x20763d(0x2c5)]()))this[_0x20763d(0x2b4)]=-0x1;else{if(_0x415500[_0x20763d(0x2a1)]&&[0x9,0x6,0x3][_0x20763d(0x273)](this[_0x20763d(0x281)]['direction']()))this[_0x20763d(0x2b4)]=-0x1;else![0x8,0x2][_0x20763d(0x273)](this[_0x20763d(0x281)][_0x20763d(0x2c5)]())&&(this['_dragonbonesFlipDirection']=0x1);}return this[_0x20763d(0x2b4)];},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x26a)]=function(){const _0x4d6afd=_0x3a836d;if(!this[_0x4d6afd(0x2d5)])return;const _0x30ad9a=this['_character']['dragonbonesSpriteData']();let _0x4db7a0=_0x30ad9a[_0x4d6afd(0x256)];this[_0x4d6afd(0x281)][_0x4d6afd(0x1d9)]()&&(_0x4db7a0*=this[_0x4d6afd(0x281)][_0x4d6afd(0x2b3)](),this[_0x4d6afd(0x281)]['isDashing']()?_0x4db7a0*=_0x30ad9a['dashRate']:_0x4db7a0*=_0x30ad9a[_0x4d6afd(0x1bf)]),this[_0x4d6afd(0x2d5)][_0x4d6afd(0x270)][_0x4d6afd(0x256)]=_0x4db7a0;},VisuMZ['DragonbonesUnion'][_0x3a836d(0x210)]=Sprite_Character[_0x3a836d(0x296)]['updateCharacterFrame'],Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x1c1)]=function(){const _0x120710=_0x3a836d;this['_character']&&this[_0x120710(0x281)]['hasDragonbones']()?this[_0x120710(0x30f)]():VisuMZ[_0x120710(0x345)][_0x120710(0x210)][_0x120710(0x27c)](this);},Sprite_Character[_0x3a836d(0x296)][_0x3a836d(0x30f)]=function(){const _0x375100=_0x3a836d,_0x2cc156=this['_character']['dragonbonesSpriteData'](),_0x1fe0e4=_0x2cc156[_0x375100(0x271)];this[_0x375100(0x1d0)](0x0,0x0,0x0,_0x1fe0e4);};