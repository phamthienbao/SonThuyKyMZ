//=============================================================================
// VisuStella MZ - Battle Cursor
// VisuMZ_4_BattleCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BattleCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCursor = VisuMZ.BattleCursor || {};
VisuMZ.BattleCursor.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [BattleCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set custom cursors when selecting allies and/or
 * enemies for targeting while in battle. This is to help with better visual
 * cues when picking a target if the flashing battler isn't enough.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as battle cursors for selected
 *   actors and enemies.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Customize the battle cursor to appear differently for various actors
 *   and/or enemies through notetags!
 * * Alter the battle cursor mid-battle through Plugin Commands, too!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Animated Battle Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated battle selection cursors.
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
 * === Cursor Appearance-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific icon.
 * - Replace 'x' with the icon index you wish to use.
 *
 * ---
 *
 * <Battle Cursor Picture: filename>
 * <Battle Cursor System: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific image.
 * - The 'Picture' variant loads images from img/pictures/.
 * - The 'System' variant loads images from img/system/.
 * - Replace 'filename' with the filename of the image found in the specific
 *   target folder.
 *   - Do not include the file extension.
 *
 * ---
 *
 * <Battle Cursor Frame Delay: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - If using a 'picture' or 'system' image that has the animated format, you
 *   can adjust how much delay there is between each animated frame.
 * - Replace 'x' with a number representing the delay between frames.
 *   Lower is faster. Higher is slower.
 *
 * ---
 * 
 * === Cursor Location-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Anchor X: Left>
 * <Battle Cursor Anchor X: Center>
 * <Battle Cursor Anchor X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor X location of the battle cursor sprite for
 *   this specific actor/enemy.
 * 
 * ---
 *
 * <Battle Cursor Anchor Y: Top>
 * <Battle Cursor Anchor Y: Middle>
 * <Battle Cursor Anchor Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor Y location of the battle cursor sprite for
 *   this specific actor/enemy.
 *
 * ---
 *
 * <Battle Cursor Position X: Left>
 * <Battle Cursor Position X: Center>
 * <Battle Cursor Position X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position X location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 * 
 * ---
 *
 * <Battle Cursor Position Y: Top>
 * <Battle Cursor Position Y: Middle>
 * <Battle Cursor Position Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position Y location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 *
 * ---
 *
 * <Battle Cursor Offset X: +x>
 * <Battle Cursor Offset X: -x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the X position of the battle cursor sprite by pixels.
 * - Replace 'x' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go left.
 *   - Positive numbers go right.
 *
 * ---
 *
 * <Battle Cursor Offset Y: +y>
 * <Battle Cursor Offset Y: -y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the Y position of the battle cursor sprite by pixels.
 * - Replace 'y' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go up.
 *   - Positive numbers go down.
 *
 * ---
 *
 * === Cursor Wave-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor No Wave>
 *
 * - Used for: Actor, Enemy Notetags
 * - Removes any oscillation from the battle cursor.
 *
 * ---
 *
 * <Battle Cursor Horizontal Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth horizontally from the
 *   left to the right.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Vertical Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth vertically from the
 *   top to the bottom.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Wave Speed: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Select how fast the cursor oscillates.
 * - Lower is slower. Higher is faster.
 * - Replace 'x' with a number representing the speed at which the cursor will
 *   oscillate at.
 * - Use decimal values between 0 and 1 for the best results.
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
 * === Battle Cursor Plugin Commands ===
 * 
 * ---
 *
 * Battle Cursor: Change Actor Cursor
 * - Change target actor's battle cursor settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Party Member Cursor
 * - Change target party member's battle cursor settings.
 *
 *   Party Index(es):
 *   - Select which party member index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Enemy Member Cursor
 * - Change target enemy's battle cursor settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy troop index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor and Enemy Cursor Settings
 * ============================================================================
 *
 * These are the default battle select cursor settings for actors and enemies.
 * All actors will have the same settings as one another unless notetags are
 * used to customize their settings. The same goes for enemies.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
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
 * Version 1.04: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the battle cursor position could appear on non-rounded
 *    numbers, causing pixel bleeding between frames. Fix made by Olivia.
 * 
 * Version 1.03: December 30, 2021
 * * Compatibility Update!
 * ** Updated better compatibility with Battle Core's most recent changes.
 *    Tints should no longer affect the Battle Cursor.
 * 
 * Version 1.02: June 11, 2021
 * * Bug Fixes!
 * ** Battle Cursor now properly aligns itself when target battlers are not
 *    scaled properly and/or hovering. Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Bug Fixes!
 * ** When using the Battle Cursor for front view actors, the cursor no longer
 *    appears out of synch from the sprite positions in the battle status
 *    window area. Fix made by Irina.
 *
 * Version 1.00: January 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeActorSettings
 * @text Battle Cursor: Change Actor Cursor
 * @desc Change target actor's battle cursor settings.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangePartySettings
 * @text Battle Cursor: Change Party Member Cursor
 * @desc Change target party member's battle cursor settings.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type number[]
 * @desc Select which party member index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeEnemySettings
 * @text Battle Cursor: Change Enemy Member Cursor
 * @desc Change target enemy's battle cursor settings.
 * In-battle only!
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy troop index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param BattleCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorCursor:struct
 * @text Actor Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for actors.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param EnemyCursor:struct
 * @text Enemy Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for enemies.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
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
 * BattleCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
//=============================================================================

function _0x314f(_0x5bc851,_0x22a871){const _0xa955e=_0xa955();return _0x314f=function(_0x314f97,_0x148e5a){_0x314f97=_0x314f97-0x1a8;let _0x53ec7b=_0xa955e[_0x314f97];return _0x53ec7b;},_0x314f(_0x5bc851,_0x22a871);}const _0x4966cf=_0x314f;(function(_0x4eee41,_0x45eb87){const _0x311c05=_0x314f,_0x112804=_0x4eee41();while(!![]){try{const _0x3bdb26=-parseInt(_0x311c05(0x234))/0x1*(parseInt(_0x311c05(0x204))/0x2)+-parseInt(_0x311c05(0x214))/0x3+-parseInt(_0x311c05(0x1d0))/0x4+-parseInt(_0x311c05(0x20a))/0x5*(-parseInt(_0x311c05(0x223))/0x6)+parseInt(_0x311c05(0x227))/0x7+parseInt(_0x311c05(0x22b))/0x8+parseInt(_0x311c05(0x210))/0x9;if(_0x3bdb26===_0x45eb87)break;else _0x112804['push'](_0x112804['shift']());}catch(_0x5b5e5e){_0x112804['push'](_0x112804['shift']());}}}(_0xa955,0x2e9ad));var label='BattleCursor',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4966cf(0x1c2)](function(_0x57fe19){const _0x5dd012=_0x4966cf;return _0x57fe19[_0x5dd012(0x212)]&&_0x57fe19[_0x5dd012(0x219)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4966cf(0x1e9)]||{},VisuMZ[_0x4966cf(0x21e)]=function(_0x167095,_0x5d7849){const _0xd1a8d5=_0x4966cf;for(const _0x8e15dd in _0x5d7849){if(_0x8e15dd[_0xd1a8d5(0x235)](/(.*):(.*)/i)){const _0x30d776=String(RegExp['$1']),_0x3079e8=String(RegExp['$2'])[_0xd1a8d5(0x1e4)]()['trim']();let _0x5b0c99,_0x404f1b,_0xb3227f;switch(_0x3079e8){case _0xd1a8d5(0x1b5):_0x5b0c99=_0x5d7849[_0x8e15dd]!==''?Number(_0x5d7849[_0x8e15dd]):0x0;break;case _0xd1a8d5(0x229):_0x404f1b=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):[],_0x5b0c99=_0x404f1b[_0xd1a8d5(0x1b8)](_0x254731=>Number(_0x254731));break;case'EVAL':_0x5b0c99=_0x5d7849[_0x8e15dd]!==''?eval(_0x5d7849[_0x8e15dd]):null;break;case _0xd1a8d5(0x1d5):_0x404f1b=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):[],_0x5b0c99=_0x404f1b[_0xd1a8d5(0x1b8)](_0x301c41=>eval(_0x301c41));break;case'JSON':_0x5b0c99=_0x5d7849[_0x8e15dd]!==''?JSON['parse'](_0x5d7849[_0x8e15dd]):'';break;case _0xd1a8d5(0x213):_0x404f1b=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):[],_0x5b0c99=_0x404f1b[_0xd1a8d5(0x1b8)](_0x14f1a6=>JSON['parse'](_0x14f1a6));break;case'FUNC':_0x5b0c99=_0x5d7849[_0x8e15dd]!==''?new Function(JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd])):new Function('return\x200');break;case _0xd1a8d5(0x1e0):_0x404f1b=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):[],_0x5b0c99=_0x404f1b[_0xd1a8d5(0x1b8)](_0x254f59=>new Function(JSON[_0xd1a8d5(0x1f8)](_0x254f59)));break;case _0xd1a8d5(0x20c):_0x5b0c99=_0x5d7849[_0x8e15dd]!==''?String(_0x5d7849[_0x8e15dd]):'';break;case _0xd1a8d5(0x23a):_0x404f1b=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):[],_0x5b0c99=_0x404f1b[_0xd1a8d5(0x1b8)](_0xfa9db9=>String(_0xfa9db9));break;case _0xd1a8d5(0x21d):_0xb3227f=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):{},_0x5b0c99=VisuMZ[_0xd1a8d5(0x21e)]({},_0xb3227f);break;case _0xd1a8d5(0x20d):_0x404f1b=_0x5d7849[_0x8e15dd]!==''?JSON[_0xd1a8d5(0x1f8)](_0x5d7849[_0x8e15dd]):[],_0x5b0c99=_0x404f1b[_0xd1a8d5(0x1b8)](_0x48316a=>VisuMZ['ConvertParams']({},JSON['parse'](_0x48316a)));break;default:continue;}_0x167095[_0x30d776]=_0x5b0c99;}}return _0x167095;},(_0x1d6c53=>{const _0x214df8=_0x4966cf,_0x759d42=_0x1d6c53[_0x214df8(0x221)];for(const _0x1cb493 of dependencies){if(!Imported[_0x1cb493]){alert(_0x214df8(0x1c3)['format'](_0x759d42,_0x1cb493)),SceneManager[_0x214df8(0x200)]();break;}}const _0xf5d67=_0x1d6c53[_0x214df8(0x219)];if(_0xf5d67[_0x214df8(0x235)](/\[Version[ ](.*?)\]/i)){const _0x48e5ca=Number(RegExp['$1']);_0x48e5ca!==VisuMZ[label]['version']&&(alert(_0x214df8(0x1bd)['format'](_0x759d42,_0x48e5ca)),SceneManager[_0x214df8(0x200)]());}if(_0xf5d67[_0x214df8(0x235)](/\[Tier[ ](\d+)\]/i)){const _0x9b12d5=Number(RegExp['$1']);_0x9b12d5<tier?(alert(_0x214df8(0x1bf)['format'](_0x759d42,_0x9b12d5,tier)),SceneManager[_0x214df8(0x200)]()):tier=Math[_0x214df8(0x236)](_0x9b12d5,tier);}VisuMZ[_0x214df8(0x21e)](VisuMZ[label][_0x214df8(0x1e9)],_0x1d6c53[_0x214df8(0x239)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'BattleCursorChangeActorSettings',_0x1110ec=>{const _0x572781=_0x4966cf;VisuMZ[_0x572781(0x21e)](_0x1110ec,_0x1110ec);const _0x353ac5=JsonEx['makeDeepCopy'](_0x1110ec);_0x353ac5[_0x572781(0x1ec)]=undefined;const _0x44c6cc=_0x1110ec['ActorIDs'][_0x572781(0x1b8)](_0x2713c9=>$gameActors[_0x572781(0x21f)](_0x2713c9));for(const _0x420756 of _0x44c6cc){if(!_0x420756)continue;_0x420756['setBattleCursor'](_0x353ac5);if(SceneManager[_0x572781(0x1d4)]()){const _0x2556d4=SceneManager['_scene'];if(!_0x2556d4)continue;const _0x341de7=_0x2556d4[_0x572781(0x237)];if(!_0x341de7)continue;const _0x55c7c7=_0x341de7[_0x572781(0x1f4)](_0x420756);if(_0x55c7c7)_0x55c7c7['updateBattleSelectCursor']();}}}),PluginManager[_0x4966cf(0x1f7)](pluginData[_0x4966cf(0x221)],'BattleCursorChangePartySettings',_0x29f762=>{const _0x2acb19=_0x4966cf;VisuMZ[_0x2acb19(0x21e)](_0x29f762,_0x29f762);const _0x2f8b7e=JsonEx[_0x2acb19(0x1e3)](_0x29f762);_0x2f8b7e['PartyIndex']=undefined;const _0x2a77c6=_0x29f762[_0x2acb19(0x1a8)][_0x2acb19(0x1b8)](_0x574a02=>$gameParty[_0x2acb19(0x1fb)]()[_0x574a02]);for(const _0x999a00 of _0x2a77c6){if(!_0x999a00)continue;_0x999a00[_0x2acb19(0x1d3)](_0x2f8b7e);if(SceneManager[_0x2acb19(0x1d4)]()){const _0x4c68a1=SceneManager['_scene'];if(!_0x4c68a1)continue;const _0x5cc87c=_0x4c68a1[_0x2acb19(0x237)];if(!_0x5cc87c)continue;const _0x49b694=_0x5cc87c['findTargetSprite'](_0x999a00);if(_0x49b694)_0x49b694[_0x2acb19(0x208)]();}}}),PluginManager[_0x4966cf(0x1f7)](pluginData[_0x4966cf(0x221)],'BattleCursorChangeEnemySettings',_0x1f8b57=>{const _0x34481a=_0x4966cf;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x34481a(0x21e)](_0x1f8b57,_0x1f8b57);const _0x39b0fe=JsonEx[_0x34481a(0x1e3)](_0x1f8b57);_0x39b0fe['EnemyIndex']=undefined;const _0xee5d3=_0x1f8b57[_0x34481a(0x224)][_0x34481a(0x1b8)](_0x39d98e=>$gameTroop['members']()[_0x39d98e]);for(const _0x33c173 of _0xee5d3){if(!_0x33c173)continue;_0x33c173[_0x34481a(0x1d3)](_0x39b0fe);if(SceneManager['isSceneBattle']()){const _0x4c0825=SceneManager[_0x34481a(0x1b7)];if(!_0x4c0825)continue;const _0x321502=_0x4c0825['_spriteset'];if(!_0x321502)continue;const _0x1fa6e8=_0x321502[_0x34481a(0x1f4)](_0x33c173);if(_0x1fa6e8)_0x1fa6e8['updateBattleSelectCursor']();}}}),SceneManager[_0x4966cf(0x1d4)]=function(){const _0x30b1e9=_0x4966cf;return this['_scene']&&this[_0x30b1e9(0x1b7)][_0x30b1e9(0x1cd)]===Scene_Battle;},Game_BattlerBase['prototype'][_0x4966cf(0x1f2)]=function(){const _0x2c11d0=_0x4966cf;return!this[_0x2c11d0(0x205)]&&this['createBattleCursorData'](),this[_0x2c11d0(0x205)];},Game_BattlerBase[_0x4966cf(0x232)][_0x4966cf(0x216)]=function(){const _0x2aa3e7=_0x4966cf;this[_0x2aa3e7(0x205)]={'type':'icon','iconIndex':0x70,'pictureFilename':'','systemFilename':'','frameDelay':0xf4240,'anchorX':_0x2aa3e7(0x1e1),'anchorY':'middle','positionX':_0x2aa3e7(0x23c),'positionY':_0x2aa3e7(0x1ca),'offsetX':0x0,'offsetY':0x0,'waveType':_0x2aa3e7(0x1b1),'waveSpeed':0.05,'waveDistance':0xa};},Game_BattlerBase[_0x4966cf(0x232)][_0x4966cf(0x1d3)]=function(_0x24fadf){const _0x42ba5d=_0x4966cf;this[_0x42ba5d(0x205)]=_0x24fadf;},Game_Battler[_0x4966cf(0x232)][_0x4966cf(0x21a)]=function(_0x260ee0){const _0xece850=_0x4966cf;if(!_0x260ee0)return;const _0x4a3f5b=this['_battleCursorData'];_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) ICON:[ ](.*)>/i)&&(this[_0xece850(0x205)][_0xece850(0x209)]=_0xece850(0x1b3),this[_0xece850(0x205)][_0xece850(0x1ff)]=Number(RegExp['$1']));_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) PICTURE:[ ](.*)>/i)&&(this[_0xece850(0x205)][_0xece850(0x209)]='picture',this[_0xece850(0x205)]['pictureFilename']=String(RegExp['$1'])[_0xece850(0x22f)]());_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) SYSTEM:[ ](.*)>/i)&&(this[_0xece850(0x205)]['type']=_0xece850(0x1d6),this['_battleCursorData']['systemFilename']=String(RegExp['$1'])[_0xece850(0x22f)]());_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) FRAME DELAY:[ ](.*)>/i)&&(this[_0xece850(0x205)][_0xece850(0x1cb)]=Number(RegExp['$1']));if(_0x260ee0['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR X:[ ](.*)>/i)){const _0x2f2729=String(RegExp['$1'])['toLowerCase']()[_0xece850(0x22f)]();['left',_0xece850(0x1be),_0xece850(0x1e1)][_0xece850(0x206)](_0x2f2729)&&(this[_0xece850(0x205)][_0xece850(0x1b6)]=_0x2f2729);}if(_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR Y:[ ](.*)>/i)){const _0x4e1450=String(RegExp['$1'])['toLowerCase']()[_0xece850(0x22f)]();[_0xece850(0x1c4),_0xece850(0x1ca),_0xece850(0x22e)]['includes'](_0x4e1450)&&(this[_0xece850(0x205)]['anchorY']=_0x4e1450);}if(_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION X:[ ](.*)>/i)){const _0x215458=String(RegExp['$1'])[_0xece850(0x1e2)]()[_0xece850(0x22f)]();[_0xece850(0x23c),_0xece850(0x1be),_0xece850(0x1e1)][_0xece850(0x206)](_0x215458)&&(this[_0xece850(0x205)][_0xece850(0x1bc)]=_0x215458);}if(_0x260ee0['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION Y:[ ](.*)>/i)){const _0x46e5ef=String(RegExp['$1'])[_0xece850(0x1e2)]()[_0xece850(0x22f)]();[_0xece850(0x1c4),'middle',_0xece850(0x22e)][_0xece850(0x206)](_0x46e5ef)&&(this[_0xece850(0x205)][_0xece850(0x1a9)]=_0x46e5ef);}_0x260ee0['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET X:[ ](.*)>/i)&&(this[_0xece850(0x205)][_0xece850(0x1e6)]=Number(RegExp['$1'])),_0x260ee0['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET Y:[ ](.*)>/i)&&(this[_0xece850(0x205)][_0xece850(0x1c8)]=Number(RegExp['$1'])),_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:NO|NONE) WAVE>/i)&&(this[_0xece850(0x205)][_0xece850(0x20e)]=_0xece850(0x1d1),this[_0xece850(0x205)]['waveDistance']=0x1),_0x260ee0['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:HORZ|HORIZONTAL) WAVE:[ ](.*)>/i)&&(this['_battleCursorData'][_0xece850(0x20e)]='horz',this[_0xece850(0x205)]['waveDistance']=Number(RegExp['$1'])),_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:VERT|VERTICAL) WAVE:[ ](.*)>/i)&&(this[_0xece850(0x205)][_0xece850(0x20e)]=_0xece850(0x1f6),this[_0xece850(0x205)][_0xece850(0x1ad)]=Number(RegExp['$1'])),_0x260ee0[_0xece850(0x235)](/<BATTLE (?:SELECT CURSOR|CURSOR) WAVE SPEED:[ ](.*)>/i)&&(this[_0xece850(0x205)]['waveSpeed']=Number(RegExp['$1'])),this[_0xece850(0x205)][_0xece850(0x1cb)]=Math[_0xece850(0x236)](0x1,this[_0xece850(0x205)][_0xece850(0x1cb)]),this[_0xece850(0x205)]['type']===_0xece850(0x1b3)&&(this['_battleCursorData'][_0xece850(0x1cb)]=0x186a0);},Game_Actor['prototype'][_0x4966cf(0x216)]=function(){const _0x4b983b=_0x4966cf;this[_0x4b983b(0x205)]=JsonEx['makeDeepCopy'](VisuMZ['BattleCursor']['Settings']['ActorCursor']),this[_0x4b983b(0x21a)](this[_0x4b983b(0x21f)]()['note']);},Game_Enemy[_0x4966cf(0x232)]['createBattleCursorData']=function(){const _0x57a9c9=_0x4966cf;this[_0x57a9c9(0x205)]=JsonEx['makeDeepCopy'](VisuMZ[_0x57a9c9(0x1bb)][_0x57a9c9(0x1e9)]['EnemyCursor']),this[_0x57a9c9(0x21a)](this[_0x57a9c9(0x1fe)]()[_0x57a9c9(0x1f1)]);},Sprite_Battler[_0x4966cf(0x232)][_0x4966cf(0x220)]=function(){const _0x22e626=_0x4966cf;this[_0x22e626(0x1c0)]=new Sprite_BattleSelectCursor(),this[_0x22e626(0x1c0)]['setBase'](this),Spriteset_Battle[_0x22e626(0x1b0)]?BattleManager[_0x22e626(0x1ce)](this[_0x22e626(0x1c0)]):this['addChild'](this[_0x22e626(0x1c0)]);},VisuMZ[_0x4966cf(0x1bb)]['Sprite_Battler_setBattler']=Sprite_Battler['prototype'][_0x4966cf(0x1db)],Sprite_Battler['prototype'][_0x4966cf(0x1db)]=function(_0x5e2f75){const _0x2e12f1=_0x4966cf;VisuMZ['BattleCursor'][_0x2e12f1(0x1ea)][_0x2e12f1(0x222)](this,_0x5e2f75),this[_0x2e12f1(0x1c0)]&&this[_0x2e12f1(0x1c0)][_0x2e12f1(0x1db)](_0x5e2f75);},Sprite_Battler['prototype'][_0x4966cf(0x208)]=function(){const _0x140801=_0x4966cf;if(!this[_0x140801(0x1c0)])return;this[_0x140801(0x1c0)][_0x140801(0x1ed)]();},VisuMZ['BattleCursor'][_0x4966cf(0x1c6)]=Sprite_Actor['prototype'][_0x4966cf(0x21c)],Sprite_Actor[_0x4966cf(0x232)][_0x4966cf(0x21c)]=function(){const _0x170b1b=_0x4966cf;VisuMZ[_0x170b1b(0x1bb)][_0x170b1b(0x1c6)]['call'](this);if(Imported[_0x170b1b(0x21b)]&&this['constructor']===Sprite_SvEnemy)return;this[_0x170b1b(0x220)]();},VisuMZ['BattleCursor']['Sprite_Enemy_initMembers']=Sprite_Enemy['prototype'][_0x4966cf(0x21c)],Sprite_Enemy[_0x4966cf(0x232)][_0x4966cf(0x21c)]=function(){const _0x36a74c=_0x4966cf;VisuMZ[_0x36a74c(0x1bb)]['Sprite_Enemy_initMembers'][_0x36a74c(0x222)](this),this[_0x36a74c(0x220)]();},VisuMZ[_0x4966cf(0x1bb)]['Spriteset_Battle_createBattleFieldContainer']=Spriteset_Battle[_0x4966cf(0x232)][_0x4966cf(0x1f0)],Spriteset_Battle['prototype'][_0x4966cf(0x1f0)]=function(){const _0x37862a=_0x4966cf;VisuMZ[_0x37862a(0x1bb)]['Spriteset_Battle_createBattleFieldContainer'][_0x37862a(0x222)](this),Spriteset_Battle[_0x37862a(0x1b0)]?this['_battleCursorContainer']=this[_0x37862a(0x1d8)]:(this['_battleCursorContainer']=new Sprite(),this['_battleField'][_0x37862a(0x1ee)](this[_0x37862a(0x207)]));},VisuMZ[_0x4966cf(0x1bb)]['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x4966cf(0x232)]['adjustFlippedBattlefield'],Spriteset_Battle[_0x4966cf(0x232)]['adjustFlippedBattlefield']=function(){const _0x44db6f=_0x4966cf;VisuMZ['BattleCursor'][_0x44db6f(0x1e5)][_0x44db6f(0x222)](this),this['_battleCursorContainer']&&this[_0x44db6f(0x202)]&&(this[_0x44db6f(0x207)][_0x44db6f(0x20b)]['x']=this[_0x44db6f(0x202)][_0x44db6f(0x20b)]['x'],this[_0x44db6f(0x207)][_0x44db6f(0x20b)]['y']=this['_battlerContainer']['scale']['y'],this[_0x44db6f(0x207)]['x']=this[_0x44db6f(0x202)]['x'],this['_battleCursorContainer']['y']=this['_battlerContainer']['y']);},VisuMZ[_0x4966cf(0x1bb)][_0x4966cf(0x1fd)]=Spriteset_Battle[_0x4966cf(0x232)][_0x4966cf(0x1c7)],Spriteset_Battle['prototype'][_0x4966cf(0x1c7)]=function(){const _0x12ffd1=_0x4966cf;VisuMZ[_0x12ffd1(0x1bb)]['Spriteset_Battle_update'][_0x12ffd1(0x222)](this),this[_0x12ffd1(0x1b9)]();},Spriteset_Battle[_0x4966cf(0x232)]['updateBattleCursorContainer']=function(){const _0x1945c1=_0x4966cf;if(!this['_battleCursorContainer'])return;let _0xe47b32=this[_0x1945c1(0x1b2)];$gameSystem['isSideView']()&&(_0xe47b32=_0xe47b32[_0x1945c1(0x22a)](this['_actorSprites']));for(const _0x4254bb of _0xe47b32){if(!_0x4254bb)continue;const _0x36b648=_0x4254bb[_0x1945c1(0x1c0)];_0x36b648&&this['_battleCursorContainer'][_0x1945c1(0x1ee)](_0x36b648);}};function Sprite_BattleSelectCursor(){const _0x1939a2=_0x4966cf;this[_0x1939a2(0x201)](...arguments);}Sprite_BattleSelectCursor[_0x4966cf(0x232)]=Object[_0x4966cf(0x1ef)](Sprite[_0x4966cf(0x232)]),Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1cd)]=Sprite_BattleSelectCursor,Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x201)]=function(){const _0x84d6d3=_0x4966cf;Sprite['prototype'][_0x84d6d3(0x201)]['call'](this),this[_0x84d6d3(0x21c)]();},Sprite_BattleSelectCursor[_0x4966cf(0x232)]['initMembers']=function(){const _0x5d0578=_0x4966cf;this['_battler']=null,this[_0x5d0578(0x1e7)]=null,this[_0x5d0578(0x1c5)]=0x0,this[_0x5d0578(0x1da)]=0x1,this[_0x5d0578(0x1b4)]=0x1,this[_0x5d0578(0x1f3)]=0x1,this['_cache']={'scale':{'x':0x1,'y':0x1}},this[_0x5d0578(0x231)]=0x0;},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1e8)]=function(_0x461dba){const _0x281020=_0x4966cf;this[_0x281020(0x226)]=_0x461dba;},Sprite_BattleSelectCursor['prototype']['setBattler']=function(_0x4a3c79){const _0x533d28=_0x4966cf;if(this[_0x533d28(0x1d9)]===_0x4a3c79)return;this['_battler']=_0x4a3c79,this[_0x533d28(0x1d9)]?this['updateBattler']():this[_0x533d28(0x1e7)]=null;},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1ed)]=function(){const _0x245242=_0x4966cf;this['_settings']=this[_0x245242(0x1d9)]['battleCursor'](),this[_0x245242(0x1c9)](),this['loadBitmap']();},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1c9)]=function(){const _0x542d38=_0x4966cf;switch(this[_0x542d38(0x1e7)][_0x542d38(0x1b6)]){case'left':this[_0x542d38(0x233)]['x']=0x0;break;case _0x542d38(0x1be):this[_0x542d38(0x233)]['x']=0.5;break;case _0x542d38(0x1e1):this['anchor']['x']=0x1;break;}switch(this['_settings'][_0x542d38(0x1dc)]){case _0x542d38(0x1c4):this[_0x542d38(0x233)]['y']=0x0;break;case _0x542d38(0x1ca):this[_0x542d38(0x233)]['y']=0.5;break;case _0x542d38(0x22e):this[_0x542d38(0x233)]['y']=0x1;break;}},Sprite_BattleSelectCursor['prototype'][_0x4966cf(0x218)]=function(){const _0x4a78c4=_0x4966cf;if(!this[_0x4a78c4(0x1e7)])return;switch(this[_0x4a78c4(0x1e7)][_0x4a78c4(0x209)]){case _0x4a78c4(0x1b3):this[_0x4a78c4(0x211)]=ImageManager[_0x4a78c4(0x1ac)](_0x4a78c4(0x1d2));break;case'picture':this[_0x4a78c4(0x211)]=ImageManager[_0x4a78c4(0x1eb)](this[_0x4a78c4(0x1e7)][_0x4a78c4(0x1df)]),this[_0x4a78c4(0x1ab)](this[_0x4a78c4(0x1e7)][_0x4a78c4(0x1df)]);break;case _0x4a78c4(0x1d6):this[_0x4a78c4(0x211)]=ImageManager['loadSystem'](this[_0x4a78c4(0x1e7)][_0x4a78c4(0x225)]),this[_0x4a78c4(0x1ab)](this['_settings'][_0x4a78c4(0x225)]);break;}this[_0x4a78c4(0x1c5)]=0x0,this[_0x4a78c4(0x211)][_0x4a78c4(0x1ae)](this[_0x4a78c4(0x1fa)][_0x4a78c4(0x1fc)](this,!![]));},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1ab)]=function(_0x4a25f3){const _0x49ac1b=_0x4966cf;_0x4a25f3[_0x49ac1b(0x235)](/\[(\d+)x(\d+)\]/i)?(this[_0x49ac1b(0x1da)]=Math[_0x49ac1b(0x236)](0x1,Number(RegExp['$1'])),this[_0x49ac1b(0x1b4)]=Math['max'](0x1,Number(RegExp['$2']))):(this[_0x49ac1b(0x1da)]=0x1,this[_0x49ac1b(0x1b4)]=0x1),this[_0x49ac1b(0x1f3)]=this[_0x49ac1b(0x1da)]*this[_0x49ac1b(0x1b4)];},Sprite_BattleSelectCursor[_0x4966cf(0x232)]['update']=function(){const _0x1b93a0=_0x4966cf;Sprite[_0x1b93a0(0x232)][_0x1b93a0(0x1c7)]['call'](this),this[_0x1b93a0(0x1d9)]&&this[_0x1b93a0(0x211)]&&this[_0x1b93a0(0x211)][_0x1b93a0(0x23b)]>0x0?(this['updateOpacity'](),this[_0x1b93a0(0x1c1)](),this[_0x1b93a0(0x1fa)](),this['updatePosition'](),this[_0x1b93a0(0x228)]()):this['opacity']=0x0;},Sprite_BattleSelectCursor[_0x4966cf(0x232)]['updateOpacity']=function(){const _0x300543=_0x4966cf;this[_0x300543(0x231)]=this['_battler'][_0x300543(0x1cc)]()?0xff:0x0;},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1c1)]=function(){const _0x222dc6=_0x4966cf;if(!this[_0x222dc6(0x1aa)])return;if(this[_0x222dc6(0x231)]<=0x0)return;if(this[_0x222dc6(0x203)][_0x222dc6(0x20b)]['x']===this['parent'][_0x222dc6(0x20b)]['x']&&this['_cache'][_0x222dc6(0x20b)]['y']===this['parent']['scale']['y'])return;this[_0x222dc6(0x20b)]['x']=0x1/this[_0x222dc6(0x1aa)][_0x222dc6(0x20b)]['x'],this[_0x222dc6(0x20b)]['y']=0x1/this[_0x222dc6(0x1aa)][_0x222dc6(0x20b)]['y'],this['_cache'][_0x222dc6(0x20b)]['x']=this[_0x222dc6(0x1aa)]['scale']['x'],this[_0x222dc6(0x203)][_0x222dc6(0x20b)]['y']=this['parent'][_0x222dc6(0x20b)]['y'];},Sprite_BattleSelectCursor['prototype']['updateFrame']=function(_0x4f30bf){const _0x569af7=_0x4966cf;if(!_0x4f30bf){if(Graphics[_0x569af7(0x1dd)]%this['_settings'][_0x569af7(0x1cb)]>0x0)return;}switch(this[_0x569af7(0x1e7)][_0x569af7(0x209)]){case _0x569af7(0x1b3):this[_0x569af7(0x215)]();break;case _0x569af7(0x22d):case'system':this['updateFrameColsRows']();break;};},Sprite_BattleSelectCursor['prototype']['updateFrameIcon']=function(){const _0x366f7a=_0x4966cf,_0xcf920a=this[_0x366f7a(0x1e7)]['iconIndex'],_0x932e0e=ImageManager['iconWidth'],_0x45d839=ImageManager['iconHeight'],_0x123756=_0xcf920a%0x10*_0x932e0e,_0xee883d=Math[_0x366f7a(0x230)](_0xcf920a/0x10)*_0x45d839;this[_0x366f7a(0x1cf)](_0x123756,_0xee883d,_0x932e0e,_0x45d839);},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x217)]=function(){const _0x3aa015=_0x4966cf;this[_0x3aa015(0x1c5)]++;if(this[_0x3aa015(0x1c5)]>=this[_0x3aa015(0x1f3)])this[_0x3aa015(0x1c5)]=0x0;var _0x714b7c=this[_0x3aa015(0x211)][_0x3aa015(0x23b)]/this[_0x3aa015(0x1da)],_0x3aa101=this['bitmap']['height']/this['_frameRows'],_0x57402d=this[_0x3aa015(0x1c5)]%this['_frameCols']*_0x714b7c,_0x3c8d5c=Math[_0x3aa015(0x230)](this[_0x3aa015(0x1c5)]/this['_frameCols'])*_0x3aa101;this[_0x3aa015(0x1cf)](_0x57402d,_0x3c8d5c,_0x714b7c,_0x3aa101);},Sprite_BattleSelectCursor[_0x4966cf(0x232)][_0x4966cf(0x1af)]=function(){const _0x14a7b9=_0x4966cf;if(!this[_0x14a7b9(0x1aa)])return;const _0x205628=this['_baseSprite']?this[_0x14a7b9(0x226)]:this[_0x14a7b9(0x1aa)];let _0xc71e2b=_0x205628['width'],_0x47e33c=_0x205628[_0x14a7b9(0x1f9)],_0x2e2715=_0x205628[_0x14a7b9(0x1de)]??_0x205628['x'],_0x1cd71c=_0x205628['_baseY']??_0x205628['y'];Imported['VisuMZ_1_BattleCore']&&_0x205628[_0x14a7b9(0x1ba)]&&(_0xc71e2b*=_0x205628[_0x14a7b9(0x1ba)][_0x14a7b9(0x20b)]['x'],_0x47e33c*=_0x205628['_distortionSprite'][_0x14a7b9(0x20b)]['y'],_0x1cd71c+=_0x205628[_0x14a7b9(0x20f)]());switch(this[_0x14a7b9(0x1e7)][_0x14a7b9(0x1bc)]){case _0x14a7b9(0x23c):this['x']=_0x2e2715+_0xc71e2b/-0x2;break;case _0x14a7b9(0x1be):this['x']=_0x2e2715+0x0;break;case _0x14a7b9(0x1e1):this['x']=_0x2e2715+_0xc71e2b/0x2;break;}switch(this[_0x14a7b9(0x1e7)][_0x14a7b9(0x1a9)]){case _0x14a7b9(0x1c4):this['y']=_0x1cd71c+_0x47e33c*-0x1;break;case _0x14a7b9(0x1ca):this['y']=_0x1cd71c+_0x47e33c/-0x2;break;case _0x14a7b9(0x22e):this['y']=_0x1cd71c+0x0;break;}_0x205628&&_0x205628[_0x14a7b9(0x1d9)]&&_0x205628[_0x14a7b9(0x1d9)][_0x14a7b9(0x22c)]()&&!$gameSystem[_0x14a7b9(0x1d7)]()&&(this['x']-=_0x205628['x'],this['y']-=_0x205628['y']),this['x']+=this['_settings'][_0x14a7b9(0x1e6)],this['y']+=this['_settings'][_0x14a7b9(0x1c8)],this['x']=Math[_0x14a7b9(0x238)](this['x']),this['y']=Math[_0x14a7b9(0x238)](this['y']);},Sprite_BattleSelectCursor['prototype']['updateWave']=function(){const _0x4a8f97=_0x4966cf,_0x2b0557=this[_0x4a8f97(0x1e7)][_0x4a8f97(0x20e)];if(_0x2b0557===_0x4a8f97(0x1d1))return;if(this['_settings'][_0x4a8f97(0x1ad)]<=0x0)return;const _0x5f0435=this[_0x4a8f97(0x1e7)][_0x4a8f97(0x1ad)],_0x40a6d7=this['_settings'][_0x4a8f97(0x1f5)],_0x433a57=Math['round'](Math['cos'](Graphics[_0x4a8f97(0x1dd)]*_0x40a6d7)*_0x5f0435);if(_0x2b0557==='horz')this['x']+=_0x433a57;else _0x2b0557==='vert'&&(this['y']+=_0x433a57);};function _0xa955(){const _0x327e29=['updateFrameIcon','createBattleCursorData','updateFrameColsRows','loadBitmap','description','applyBattleCursorNotetags','VisuMZ_1_BattleCore','initMembers','STRUCT','ConvertParams','actor','createBattleSelectCursor','name','call','871428epYUrR','EnemyIndex','systemFilename','_baseSprite','800919OmKOke','updateWave','ARRAYNUM','concat','673168mTeeDF','isActor','picture','bottom','trim','floor','opacity','prototype','anchor','95kQlnHG','match','max','_spriteset','round','parameters','ARRAYSTR','width','left','PartyIndex','positionY','parent','determineFrameColsRows','loadSystem','waveDistance','addLoadListener','updatePosition','ANTI_TINT_UI','horz','_enemySprites','icon','_frameRows','NUM','anchorX','_scene','map','updateBattleCursorContainer','_distortionSprite','BattleCursor','positionX','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','center','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_battleSelectCursorSprite','updateScale','filter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','top','_frameIndex','Sprite_Actor_initMembers','update','offsetY','updateAnchor','middle','frameDelay','isSelected','constructor','addChildToUiContainer','setFrame','511588Kgqcrn','none','IconSet','setBattleCursor','isSceneBattle','ARRAYEVAL','system','isSideView','_uiContainer','_battler','_frameCols','setBattler','anchorY','frameCount','_baseX','pictureFilename','ARRAYFUNC','right','toLowerCase','makeDeepCopy','toUpperCase','Spriteset_Battle_adjustFlippedBattlefield','offsetX','_settings','setBase','Settings','Sprite_Battler_setBattler','loadPicture','ActorIDs','updateBattler','addChild','create','createBattleFieldContainer','note','battleCursor','_frameMax','findTargetSprite','waveSpeed','vert','registerCommand','parse','height','updateFrame','members','bind','Spriteset_Battle_update','enemy','iconIndex','exit','initialize','_battlerContainer','_cache','6556rddhtc','_battleCursorData','includes','_battleCursorContainer','updateBattleSelectCursor','type','5xaKKxH','scale','STR','ARRAYSTRUCT','waveType','extraPositionY','4685958hJXWHy','bitmap','status','ARRAYJSON','702789UVIBPy'];_0xa955=function(){return _0x327e29;};return _0xa955();}