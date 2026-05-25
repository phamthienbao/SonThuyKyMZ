//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.89;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.89] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
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
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
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
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x17e81a=_0x1250;(function(_0x3a419f,_0x969893){const _0x5ad5a9=_0x1250,_0x1cf358=_0x3a419f();while(!![]){try{const _0x4b996c=parseInt(_0x5ad5a9(0x463))/0x1+parseInt(_0x5ad5a9(0x583))/0x2+parseInt(_0x5ad5a9(0x1a3))/0x3*(parseInt(_0x5ad5a9(0x5db))/0x4)+parseInt(_0x5ad5a9(0x32d))/0x5+-parseInt(_0x5ad5a9(0x73d))/0x6*(-parseInt(_0x5ad5a9(0x544))/0x7)+parseInt(_0x5ad5a9(0x3cb))/0x8*(parseInt(_0x5ad5a9(0x3e6))/0x9)+-parseInt(_0x5ad5a9(0x3e7))/0xa;if(_0x4b996c===_0x969893)break;else _0x1cf358['push'](_0x1cf358['shift']());}catch(_0x4cfed6){_0x1cf358['push'](_0x1cf358['shift']());}}}(_0x1a61,0x91a9d));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x41634a){const _0x13172d=_0x1250;return _0x41634a[_0x13172d(0x866)]&&_0x41634a[_0x13172d(0x2e3)][_0x13172d(0x2b0)]('['+label+']');})[0x0];VisuMZ[label][_0x17e81a(0x26d)]=VisuMZ[label][_0x17e81a(0x26d)]||{},VisuMZ[_0x17e81a(0x717)]=function(_0xdd48ac,_0x312fdc){const _0x1da514=_0x17e81a;for(const _0x5e2f94 in _0x312fdc){if(_0x5e2f94[_0x1da514(0x6b6)](/(.*):(.*)/i)){const _0x412e3d=String(RegExp['$1']),_0x337609=String(RegExp['$2'])[_0x1da514(0x413)]()[_0x1da514(0x1b5)]();let _0x48ff63,_0x2a2442,_0x40ff23;switch(_0x337609){case _0x1da514(0x108):_0x48ff63=_0x312fdc[_0x5e2f94]!==''?Number(_0x312fdc[_0x5e2f94]):0x0;break;case _0x1da514(0x434):_0x2a2442=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):[],_0x48ff63=_0x2a2442[_0x1da514(0x752)](_0x525706=>Number(_0x525706));break;case _0x1da514(0x589):_0x48ff63=_0x312fdc[_0x5e2f94]!==''?eval(_0x312fdc[_0x5e2f94]):null;break;case _0x1da514(0x1dd):_0x2a2442=_0x312fdc[_0x5e2f94]!==''?JSON['parse'](_0x312fdc[_0x5e2f94]):[],_0x48ff63=_0x2a2442[_0x1da514(0x752)](_0x1ed816=>eval(_0x1ed816));break;case _0x1da514(0x164):_0x48ff63=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):'';break;case _0x1da514(0x613):_0x2a2442=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):[],_0x48ff63=_0x2a2442[_0x1da514(0x752)](_0x10738d=>JSON[_0x1da514(0x4cf)](_0x10738d));break;case'FUNC':_0x48ff63=_0x312fdc[_0x5e2f94]!==''?new Function(JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94])):new Function(_0x1da514(0x383));break;case'ARRAYFUNC':_0x2a2442=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):[],_0x48ff63=_0x2a2442['map'](_0xefaca8=>new Function(JSON[_0x1da514(0x4cf)](_0xefaca8)));break;case _0x1da514(0x18d):_0x48ff63=_0x312fdc[_0x5e2f94]!==''?String(_0x312fdc[_0x5e2f94]):'';break;case'ARRAYSTR':_0x2a2442=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):[],_0x48ff63=_0x2a2442[_0x1da514(0x752)](_0x40b8b9=>String(_0x40b8b9));break;case _0x1da514(0x111):_0x40ff23=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):{},_0xdd48ac[_0x412e3d]={},VisuMZ[_0x1da514(0x717)](_0xdd48ac[_0x412e3d],_0x40ff23);continue;case'ARRAYSTRUCT':_0x2a2442=_0x312fdc[_0x5e2f94]!==''?JSON[_0x1da514(0x4cf)](_0x312fdc[_0x5e2f94]):[],_0x48ff63=_0x2a2442[_0x1da514(0x752)](_0x594413=>VisuMZ[_0x1da514(0x717)]({},JSON[_0x1da514(0x4cf)](_0x594413)));break;default:continue;}_0xdd48ac[_0x412e3d]=_0x48ff63;}}return _0xdd48ac;},VisuMZ['CoreEngine']['SceneManager_exit']=SceneManager['exit'],SceneManager[_0x17e81a(0x46a)]=function(){const _0x4786c5=_0x17e81a;VisuMZ[_0x4786c5(0x1a7)]['SceneManager_exit'][_0x4786c5(0x65e)](this);if(Utils[_0x4786c5(0x471)]>=_0x4786c5(0x181)){if(typeof nw==='object')nw['App'][_0x4786c5(0x3cd)]();}},(_0x3b74eb=>{const _0x35f63f=_0x17e81a,_0x3a0c5c=_0x3b74eb[_0x35f63f(0x320)];for(const _0x2fbfe1 of dependencies){if(!Imported[_0x2fbfe1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x35f63f(0x51e)](_0x3a0c5c,_0x2fbfe1)),SceneManager['exit']();break;}}const _0x15306c=_0x3b74eb[_0x35f63f(0x2e3)];if(_0x15306c[_0x35f63f(0x6b6)](/\[Version[ ](.*?)\]/i)){const _0x420b19=Number(RegExp['$1']);_0x420b19!==VisuMZ[label]['version']&&(alert(_0x35f63f(0x7d3)['format'](_0x3a0c5c,_0x420b19)),SceneManager[_0x35f63f(0x46a)]());}if(_0x15306c[_0x35f63f(0x6b6)](/\[Tier[ ](\d+)\]/i)){const _0x398783=Number(RegExp['$1']);_0x398783<tier?(alert(_0x35f63f(0x79c)[_0x35f63f(0x51e)](_0x3a0c5c,_0x398783,tier)),SceneManager[_0x35f63f(0x46a)]()):tier=Math[_0x35f63f(0x744)](_0x398783,tier);}VisuMZ[_0x35f63f(0x717)](VisuMZ[label][_0x35f63f(0x26d)],_0x3b74eb[_0x35f63f(0x146)]);})(pluginData),((()=>{const _0x3ca066=_0x17e81a;if(VisuMZ[_0x3ca066(0x1a7)][_0x3ca066(0x26d)][_0x3ca066(0x51f)]['SubfolderParse']??!![])for(const _0x237160 in $plugins){const _0x470921=$plugins[_0x237160];_0x470921[_0x3ca066(0x320)][_0x3ca066(0x6b6)](/(.*)\/(.*)/i)&&(_0x470921[_0x3ca066(0x320)]=String(RegExp['$2'][_0x3ca066(0x1b5)]()));}})()),PluginManager['registerCommand'](pluginData['name'],_0x17e81a(0x375),_0x47488b=>{const _0x19531d=_0x17e81a;if(!SceneManager[_0x19531d(0x116)])return;if(!SceneManager[_0x19531d(0x116)][_0x19531d(0x552)])return;VisuMZ[_0x19531d(0x717)](_0x47488b,_0x47488b);const _0x3e9e6f=Math[_0x19531d(0x397)](_0x47488b['pointX']),_0x17067b=Math[_0x19531d(0x397)](_0x47488b[_0x19531d(0x1c7)]);$gameTemp[_0x19531d(0x445)](_0x3e9e6f,_0x17067b,_0x47488b[_0x19531d(0x1fd)],_0x47488b[_0x19531d(0x491)],_0x47488b[_0x19531d(0x6cb)]);}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],'AudioChangeBgmVolume',_0x44acf3=>{const _0x228853=_0x17e81a;VisuMZ['ConvertParams'](_0x44acf3,_0x44acf3);const _0x16966d=Math[_0x228853(0x397)](_0x44acf3['volume'])[_0x228853(0xb7)](0x0,0x64),_0x22716c=AudioManager['_currentBgm'];_0x22716c&&(_0x22716c[_0x228853(0x720)]=_0x16966d,_0x22716c[_0x228853(0x7b3)]=AudioManager[_0x228853(0xa8)][_0x228853(0x66f)](),AudioManager[_0x228853(0x4b5)](_0x22716c),AudioManager[_0x228853(0x1c8)](_0x22716c,_0x22716c[_0x228853(0x7b3)]),AudioManager[_0x228853(0xa8)]['_startPlaying'](_0x22716c[_0x228853(0x7b3)]));}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x60a),_0x209af9=>{const _0x3b8319=_0x17e81a;VisuMZ[_0x3b8319(0x717)](_0x209af9,_0x209af9);const _0x5a326c=Math[_0x3b8319(0x397)](_0x209af9['pitch'])['clamp'](0x32,0x96),_0x1d2dd3=AudioManager[_0x3b8319(0x5b3)];_0x1d2dd3&&(_0x1d2dd3['pitch']=_0x5a326c,_0x1d2dd3[_0x3b8319(0x7b3)]=AudioManager[_0x3b8319(0xa8)]['seek'](),AudioManager['updateBgmParameters'](_0x1d2dd3),AudioManager[_0x3b8319(0x1c8)](_0x1d2dd3,_0x1d2dd3[_0x3b8319(0x7b3)]),AudioManager['_bgmBuffer']['_startPlaying'](_0x1d2dd3['pos']));}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],'AudioChangeBgmPan',_0x5e32eb=>{const _0x575c1d=_0x17e81a;VisuMZ[_0x575c1d(0x717)](_0x5e32eb,_0x5e32eb);const _0x192e2f=Math[_0x575c1d(0x397)](_0x5e32eb[_0x575c1d(0x87b)])[_0x575c1d(0xb7)](-0x64,0x64),_0x4df3c3=AudioManager['_currentBgm'];_0x4df3c3&&(_0x4df3c3['pan']=_0x192e2f,_0x4df3c3['pos']=AudioManager[_0x575c1d(0xa8)][_0x575c1d(0x66f)](),AudioManager[_0x575c1d(0x4b5)](_0x4df3c3),AudioManager[_0x575c1d(0x1c8)](_0x4df3c3,_0x4df3c3[_0x575c1d(0x7b3)]),AudioManager[_0x575c1d(0xa8)][_0x575c1d(0x10d)](_0x4df3c3[_0x575c1d(0x7b3)]));}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x494),_0x250602=>{const _0x1a48eb=_0x17e81a;VisuMZ[_0x1a48eb(0x717)](_0x250602,_0x250602);const _0x2648d6=Math[_0x1a48eb(0x397)](_0x250602[_0x1a48eb(0x720)])['clamp'](0x0,0x64),_0x560d19=AudioManager[_0x1a48eb(0x2bd)];_0x560d19&&(_0x560d19[_0x1a48eb(0x720)]=_0x2648d6,_0x560d19[_0x1a48eb(0x7b3)]=AudioManager[_0x1a48eb(0xef)][_0x1a48eb(0x66f)](),AudioManager[_0x1a48eb(0x564)](_0x560d19),AudioManager[_0x1a48eb(0x5d1)](_0x560d19,_0x560d19[_0x1a48eb(0x7b3)]),AudioManager[_0x1a48eb(0xef)][_0x1a48eb(0x10d)](_0x560d19[_0x1a48eb(0x7b3)]));}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x36f),_0x2c190d=>{const _0x1add90=_0x17e81a;VisuMZ[_0x1add90(0x717)](_0x2c190d,_0x2c190d);const _0x4db7b6=Math[_0x1add90(0x397)](_0x2c190d[_0x1add90(0xb1)])[_0x1add90(0xb7)](0x32,0x96),_0x39b7f8=AudioManager[_0x1add90(0x2bd)];_0x39b7f8&&(_0x39b7f8[_0x1add90(0xb1)]=_0x4db7b6,_0x39b7f8[_0x1add90(0x7b3)]=AudioManager['_bgsBuffer'][_0x1add90(0x66f)](),AudioManager[_0x1add90(0x564)](_0x39b7f8),AudioManager['playBgs'](_0x39b7f8,_0x39b7f8['pos']),AudioManager[_0x1add90(0xef)][_0x1add90(0x10d)](_0x39b7f8[_0x1add90(0x7b3)]));}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],'AudioChangeBgsPan',_0x100092=>{const _0x4d475d=_0x17e81a;VisuMZ[_0x4d475d(0x717)](_0x100092,_0x100092);const _0x333766=Math[_0x4d475d(0x397)](_0x100092[_0x4d475d(0x87b)])[_0x4d475d(0xb7)](-0x64,0x64),_0x9ce5f3=AudioManager[_0x4d475d(0x2bd)];_0x9ce5f3&&(_0x9ce5f3[_0x4d475d(0x87b)]=_0x333766,_0x9ce5f3[_0x4d475d(0x7b3)]=AudioManager[_0x4d475d(0xef)][_0x4d475d(0x66f)](),AudioManager['updateBgsParameters'](_0x9ce5f3),AudioManager[_0x4d475d(0x5d1)](_0x9ce5f3,_0x9ce5f3['pos']),AudioManager['_bgsBuffer'][_0x4d475d(0x10d)](_0x9ce5f3[_0x4d475d(0x7b3)]));}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x82e),_0x5d3f3a=>{const _0x42b8f0=_0x17e81a;if(!$gameTemp[_0x42b8f0(0x6d5)]())return;const _0x342be2=Input['getLastUsedGamepadType']();console['log'](_0x342be2);}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],'ExportAllMapText',_0x58451e=>{const _0x286cf0=_0x17e81a;if(!$gameTemp[_0x286cf0(0x6d5)]())return;if(!Utils[_0x286cf0(0x76b)]())return;SceneManager[_0x286cf0(0x116)][_0x286cf0(0x743)]=![],VisuMZ[_0x286cf0(0x1a7)]['ExportStrFromAllMaps']();}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],'ExportAllTroopText',_0x9eac50=>{const _0x56e106=_0x17e81a;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x56e106(0x116)]['_active']=![],VisuMZ[_0x56e106(0x1a7)][_0x56e106(0x6c7)]();}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x5fb),_0x3370fa=>{const _0x44f353=_0x17e81a;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x44f353(0x76b)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x44f353(0x717)](_0x3370fa,_0x3370fa);const _0xb51df7=_0x44f353(0x145)[_0x44f353(0x51e)]($gameMap['mapId']()[_0x44f353(0x152)](0x3)),_0x281a19=VisuMZ[_0x44f353(0x1a7)][_0x44f353(0x48a)]($gameMap['mapId']());VisuMZ[_0x44f353(0x1a7)]['ExportString'](_0x281a19,_0xb51df7,!![]);}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x1be),_0x270cf4=>{const _0x42f7c6=_0x17e81a;if(!$gameTemp[_0x42f7c6(0x6d5)]())return;if(!Utils[_0x42f7c6(0x76b)]())return;if(!$gameParty[_0x42f7c6(0x180)]())return;VisuMZ[_0x42f7c6(0x717)](_0x270cf4,_0x270cf4);const _0x57fa98=_0x42f7c6(0x4c0)[_0x42f7c6(0x51e)]($gameTroop[_0x42f7c6(0x27f)][_0x42f7c6(0x152)](0x4)),_0x25793f=VisuMZ['CoreEngine'][_0x42f7c6(0x870)]($gameTroop[_0x42f7c6(0x27f)]);VisuMZ[_0x42f7c6(0x1a7)][_0x42f7c6(0x5f0)](_0x25793f,_0x57fa98,!![]);}),VisuMZ[_0x17e81a(0x1a7)]['ExportString']=function(_0x34e095,_0x5bbf04,_0xe2ff15){const _0x3ef172=_0x17e81a,_0x1d4b28=require('fs');let _0x20e52f='Exported_Script_%1.txt'['format'](_0x5bbf04||'0');_0x1d4b28[_0x3ef172(0x160)](_0x20e52f,_0x34e095,_0x19276e=>{const _0x3097eb=_0x3ef172;if(_0x19276e)throw err;else _0xe2ff15&&alert(_0x3097eb(0x4e5)['format'](_0x20e52f));});},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x38b)]=function(){const _0x42fd12=_0x17e81a,_0x40d2c2=[];for(const _0x46b179 of $dataMapInfos){if(!_0x46b179)continue;_0x40d2c2[_0x42fd12(0x189)](_0x46b179['id']);}const _0x1bc4f5=_0x40d2c2[_0x42fd12(0x4b4)]*0x64+Math[_0x42fd12(0x50e)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x42fd12(0x51e)](_0x1bc4f5)),this[_0x42fd12(0x482)]=[],this[_0x42fd12(0x302)]=$dataMap;for(const _0x56f34b of _0x40d2c2){VisuMZ['CoreEngine'][_0x42fd12(0x481)](_0x56f34b);}setTimeout(VisuMZ[_0x42fd12(0x1a7)]['exportAllMapStrings'][_0x42fd12(0x309)](this),_0x1bc4f5);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x481)]=function(_0x221826){const _0x577de3=_0x17e81a,_0x24c8b2=_0x577de3(0x293)['format'](_0x221826[_0x577de3(0x152)](0x3)),_0x30866d=new XMLHttpRequest(),_0x29f600=_0x577de3(0x6c4)+_0x24c8b2;_0x30866d[_0x577de3(0x6a2)](_0x577de3(0xf0),_0x29f600),_0x30866d[_0x577de3(0x5af)](_0x577de3(0x841)),_0x30866d['onload']=()=>this[_0x577de3(0x38a)](_0x30866d,_0x221826,_0x24c8b2,_0x29f600),_0x30866d[_0x577de3(0x5ec)]=()=>DataManager['onXhrError'](_0x577de3(0x469),_0x24c8b2,_0x29f600),_0x30866d['send']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x38a)]=function(_0x4a53f4,_0x1c81c1,_0x4dbfd3,_0xa1e11f){const _0x222d37=_0x17e81a;$dataMap=JSON[_0x222d37(0x4cf)](_0x4a53f4[_0x222d37(0x13d)]),DataManager[_0x222d37(0x408)]($dataMap),this[_0x222d37(0x482)][_0x1c81c1]=VisuMZ['CoreEngine'][_0x222d37(0x48a)](_0x1c81c1),$dataMap=this[_0x222d37(0x302)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x430)]=function(){const _0x4a1845=_0x17e81a,_0x1d59a8=_0x4a1845(0x48b);this[_0x4a1845(0x482)][_0x4a1845(0x723)](undefined)['remove']('')[_0x4a1845(0x723)](null);const _0x26be13=this[_0x4a1845(0x482)][_0x4a1845(0x3e0)](_0x4a1845(0x749))[_0x4a1845(0x1b5)]();VisuMZ['CoreEngine']['ExportString'](_0x26be13,_0x1d59a8,!![]),SceneManager[_0x4a1845(0x116)][_0x4a1845(0x743)]=!![];},VisuMZ[_0x17e81a(0x1a7)]['ExtractStrFromMap']=function(_0x120908){const _0xec2d0f=_0x17e81a;if(!$dataMap)return'';let _0x3a280c='█'[_0xec2d0f(0x830)](0x46)+'\x0a\x0a',_0x28b5e0='═'['repeat'](0x46)+'\x0a\x0a',_0x4007ed='';this['_commonEventLayers']=0x0;for(const _0x1a7c17 of $dataMap[_0xec2d0f(0x804)]){if(!_0x1a7c17)continue;let _0x45bdad=_0x1a7c17['id'],_0x360acb=_0x1a7c17[_0xec2d0f(0x320)],_0x44ad62=_0x1a7c17[_0xec2d0f(0x5d2)];for(const _0x260ee4 of _0x44ad62){const _0x5c8bf8=_0x44ad62[_0xec2d0f(0x2fa)](_0x260ee4)+0x1;let _0x453d96=_0x28b5e0+_0xec2d0f(0x14a),_0x324fff=VisuMZ['CoreEngine'][_0xec2d0f(0x14b)](_0x260ee4[_0xec2d0f(0x195)]);if(_0x324fff[_0xec2d0f(0x4b4)]>0x0){if(_0x4007ed[_0xec2d0f(0x4b4)]>0x0)_0x4007ed+=_0x28b5e0+_0xec2d0f(0x749);else{const _0x18f6ee=$dataMapInfos[_0x120908][_0xec2d0f(0x320)];_0x4007ed+=_0x3a280c+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0xec2d0f(0x51e)](_0x120908,_0x18f6ee||_0xec2d0f(0x50c))+_0x3a280c;}_0x4007ed+=_0x453d96['format'](_0x45bdad,_0x360acb,_0x5c8bf8,_0x324fff);}}}return _0x4007ed[_0xec2d0f(0x4b4)]>0x0&&(_0x4007ed+=_0x28b5e0),_0x4007ed;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x6c7)]=function(){const _0x477c32=_0x17e81a,_0x4660=$dataTroops[_0x477c32(0x4b4)]*0xa+Math[_0x477c32(0x50e)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x477c32(0x51e)](_0x4660));const _0x28cf46=[];for(const _0x1d346b of $dataTroops){if(!_0x1d346b)continue;const _0x286a2f=_0x1d346b['id'];_0x28cf46[_0x286a2f]=VisuMZ[_0x477c32(0x1a7)]['ExtractStrFromTroop'](_0x286a2f);}setTimeout(VisuMZ[_0x477c32(0x1a7)]['exportAllTroopStrings'][_0x477c32(0x309)](this,_0x28cf46),_0x4660);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x870)]=function(_0x393123){const _0x4bba77=_0x17e81a;if(!$dataTroops[_0x393123])return'';let _0x5110f8='█'[_0x4bba77(0x830)](0x46)+'\x0a\x0a',_0x25ec31='═'['repeat'](0x46)+'\x0a\x0a',_0x484429='';this[_0x4bba77(0xa3)]=0x0;const _0x50c1c3=$dataTroops[_0x393123];let _0x1b9556=_0x50c1c3[_0x4bba77(0x5d2)];for(const _0x477791 of _0x1b9556){const _0x288cad=_0x1b9556[_0x4bba77(0x2fa)](_0x477791)+0x1;let _0x3e520a=_0x25ec31+_0x4bba77(0x33e),_0x4b02c7=VisuMZ[_0x4bba77(0x1a7)][_0x4bba77(0x14b)](_0x477791[_0x4bba77(0x195)]);_0x4b02c7[_0x4bba77(0x4b4)]>0x0&&(_0x484429[_0x4bba77(0x4b4)]>0x0?_0x484429+=_0x25ec31+_0x4bba77(0x749):_0x484429+=_0x5110f8+_0x4bba77(0x490)[_0x4bba77(0x51e)](_0x393123,_0x50c1c3[_0x4bba77(0x320)]||_0x4bba77(0x50c))+_0x5110f8,_0x484429+=_0x3e520a['format'](_0x288cad,_0x4b02c7));}return _0x484429[_0x4bba77(0x4b4)]>0x0&&(_0x484429+=_0x25ec31),_0x484429;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x7a7)]=function(_0x1d4d85){const _0x32c671=_0x17e81a,_0x62e594=_0x32c671(0x237);_0x1d4d85[_0x32c671(0x723)](undefined)[_0x32c671(0x723)]('')['remove'](null);const _0x5c1280=_0x1d4d85[_0x32c671(0x3e0)](_0x32c671(0x749))[_0x32c671(0x1b5)]();VisuMZ[_0x32c671(0x1a7)]['ExportString'](_0x5c1280,_0x62e594,!![]),SceneManager[_0x32c671(0x116)]['_active']=!![];},VisuMZ['CoreEngine'][_0x17e81a(0x14b)]=function(_0x38d400){const _0x2789c3=_0x17e81a;let _0x8ad615='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x44156a='\x0a'+'┄'[_0x2789c3(0x830)](0x46)+'\x0a',_0x36fdee='';for(const _0xc04712 of _0x38d400){if(!_0xc04712)continue;if(_0xc04712['code']===0x65)_0x36fdee+=_0x8ad615+'\x0a',_0x36fdee+=_0x2789c3(0x448),_0xc04712[_0x2789c3(0x146)][0x4]!==''&&_0xc04712[_0x2789c3(0x146)][0x4]!==undefined&&(_0x36fdee+='【%1】\x0a'['format'](_0xc04712[_0x2789c3(0x146)][0x4]));else{if(_0xc04712['code']===0x191)_0x36fdee+='%1\x0a'[_0x2789c3(0x51e)](_0xc04712['parameters'][0x0]);else{if(_0xc04712[_0x2789c3(0x52f)]===0x192)_0x36fdee+=_0x8ad615,_0x36fdee+=_0x2789c3(0x6bf)[_0x2789c3(0x51e)](_0x44156a,_0xc04712['parameters'][0x0]+0x1,_0xc04712[_0x2789c3(0x146)][0x1]);else{if(_0xc04712[_0x2789c3(0x52f)]===0x193)_0x36fdee+=_0x8ad615,_0x36fdee+=_0x2789c3(0x2c8)[_0x2789c3(0x51e)](_0x44156a);else{if(_0xc04712[_0x2789c3(0x52f)]===0x194)_0x36fdee+=_0x8ad615,_0x36fdee+='%1〘End\x20Choice\x20Selection〙%1'[_0x2789c3(0x51e)](_0x44156a);else{if(_0xc04712[_0x2789c3(0x52f)]===0x69)_0x36fdee+=_0x8ad615+'\x0a',_0x36fdee+=_0x2789c3(0x1d1);else{if(_0xc04712[_0x2789c3(0x52f)]===0x6c)_0x36fdee+=_0x8ad615+'\x0a',_0x36fdee+=_0x2789c3(0x836)[_0x2789c3(0x51e)](_0xc04712['parameters'][0x0]);else{if(_0xc04712['code']===0x198)_0x36fdee+='%1\x0a'['format'](_0xc04712['parameters'][0x0]);else{if(_0xc04712[_0x2789c3(0x52f)]===0x75){const _0x14556d=$dataCommonEvents[_0xc04712[_0x2789c3(0x146)][0x0]];if(_0x14556d&&this[_0x2789c3(0xa3)]<=0xa){this[_0x2789c3(0xa3)]++;let _0x7e5dc6=VisuMZ[_0x2789c3(0x1a7)][_0x2789c3(0x14b)](_0x14556d[_0x2789c3(0x195)]);_0x7e5dc6[_0x2789c3(0x4b4)]>0x0&&(_0x36fdee+=_0x8ad615,_0x36fdee+=_0x44156a,_0x36fdee+=_0x2789c3(0x61d)[_0x2789c3(0x51e)](_0x14556d['id'],_0x14556d['name']),_0x36fdee+=_0x44156a,_0x36fdee+=_0x7e5dc6,_0x36fdee+=_0x44156a,_0x36fdee+=_0x2789c3(0x770)[_0x2789c3(0x51e)](_0x14556d['id'],_0x14556d['name']),_0x36fdee+=_0x44156a),this[_0x2789c3(0xa3)]--;}}}}}}}}}}}return _0x36fdee[_0x2789c3(0x4b4)]>0x0&&(_0x36fdee+=_0x8ad615),_0x36fdee;},PluginManager[_0x17e81a(0x4cd)](pluginData['name'],'OpenURL',_0x343d5a=>{const _0x5c89db=_0x17e81a;VisuMZ[_0x5c89db(0x717)](_0x343d5a,_0x343d5a);const _0x328f88=_0x343d5a[_0x5c89db(0x6dd)];VisuMZ['openURL'](_0x328f88);}),PluginManager[_0x17e81a(0x4cd)](pluginData['name'],_0x17e81a(0x6ad),_0x54484a=>{const _0x12a879=_0x17e81a;VisuMZ[_0x12a879(0x717)](_0x54484a,_0x54484a);const _0x1d6d96=_0x54484a[_0x12a879(0x33c)]||0x0;$gameParty[_0x12a879(0x1f2)](_0x1d6d96);}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x336),_0x131698=>{const _0x526241=_0x17e81a;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x526241(0x717)](_0x131698,_0x131698);const _0x24e72b=_0x131698['CommonEventID'];SceneManager[_0x526241(0x116)]['playOnceParallelInterpreter'](_0x24e72b);}),PluginManager[_0x17e81a(0x4cd)](pluginData['name'],_0x17e81a(0x1d2),_0x7284aa=>{const _0x5b1ce8=_0x17e81a;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5b1ce8(0x76b)]())return;VisuMZ[_0x5b1ce8(0x717)](_0x7284aa,_0x7284aa);const _0x1d6ecb=_0x7284aa[_0x5b1ce8(0x43d)]||0x1;$gameTemp[_0x5b1ce8(0x48c)]=_0x1d6ecb;}),PluginManager[_0x17e81a(0x4cd)](pluginData['name'],_0x17e81a(0x624),_0x2360c3=>{const _0x5e0132=_0x17e81a;VisuMZ[_0x5e0132(0x717)](_0x2360c3,_0x2360c3);const _0x3a7704=_0x2360c3[_0x5e0132(0x315)]||0x1,_0x44ee0c=_0x2360c3['easingType']||'Linear',_0x286b3f=$gameScreen['picture'](_0x3a7704);_0x286b3f&&_0x286b3f[_0x5e0132(0x377)](_0x44ee0c);}),PluginManager[_0x17e81a(0x4cd)](pluginData['name'],_0x17e81a(0x341),_0x20d192=>{const _0x8fae69=_0x17e81a;for(let _0xdb825b=0x1;_0xdb825b<=$gameScreen[_0x8fae69(0x5a4)]();_0xdb825b++){$gameScreen[_0x8fae69(0xaf)](_0xdb825b);}}),PluginManager[_0x17e81a(0x4cd)](pluginData['name'],'PictureEraseRange',_0x2ef2ac=>{const _0xb1293e=_0x17e81a;VisuMZ['ConvertParams'](_0x2ef2ac,_0x2ef2ac);const _0x434017=Math[_0xb1293e(0x444)](_0x2ef2ac[_0xb1293e(0x5ac)],_0x2ef2ac[_0xb1293e(0x38c)]),_0xc926ab=Math[_0xb1293e(0x744)](_0x2ef2ac['StartID'],_0x2ef2ac['EndingID']);for(let _0x53fabd=_0x434017;_0x53fabd<=_0xc926ab;_0x53fabd++){$gameScreen[_0xb1293e(0xaf)](_0x53fabd);}}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x5a5),_0x17ca67=>{const _0x500e16=_0x17e81a;VisuMZ['ConvertParams'](_0x17ca67,_0x17ca67);const _0x373a21=Math[_0x500e16(0x397)](_0x17ca67['PictureID'])[_0x500e16(0xb7)](0x1,0x64),_0x962b5d=-Number(_0x17ca67['AdjustAngle']||0x0),_0x1891ef=Math[_0x500e16(0x744)](_0x17ca67[_0x500e16(0x338)]||0x0,0x0),_0x4ef451=_0x17ca67[_0x500e16(0x28f)]||_0x500e16(0x347),_0xff207c=_0x17ca67[_0x500e16(0x679)],_0x5973d3=$gameScreen[_0x500e16(0x5b7)](_0x373a21);if(!_0x5973d3)return;_0x5973d3[_0x500e16(0x877)](_0x962b5d,_0x1891ef,_0x4ef451);if(_0xff207c){const _0x7018a8=$gameTemp['getLastPluginCommandInterpreter']();if(_0x7018a8)_0x7018a8[_0x500e16(0x289)](_0x1891ef);}}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x29a),_0x102ceb=>{const _0x47ebfd=_0x17e81a;VisuMZ[_0x47ebfd(0x717)](_0x102ceb,_0x102ceb);const _0x3bf664=Math[_0x47ebfd(0x397)](_0x102ceb[_0x47ebfd(0x43d)])['clamp'](0x1,0x64),_0x4264e0=-Number(_0x102ceb[_0x47ebfd(0x41f)]||0x0),_0x40023a=Math[_0x47ebfd(0x744)](_0x102ceb[_0x47ebfd(0x338)]||0x0,0x0),_0x45e86a=_0x102ceb[_0x47ebfd(0x28f)]||_0x47ebfd(0x347),_0x4a824b=_0x102ceb[_0x47ebfd(0x679)],_0x567712=$gameScreen[_0x47ebfd(0x5b7)](_0x3bf664);if(!_0x567712)return;_0x567712[_0x47ebfd(0x279)](_0x4264e0,_0x40023a,_0x45e86a);if(_0x4a824b){const _0x5a36e2=$gameTemp['getLastPluginCommandInterpreter']();if(_0x5a36e2)_0x5a36e2[_0x47ebfd(0x289)](_0x40023a);}}),PluginManager['registerCommand'](pluginData['name'],'PictureShowIcon',_0x39fffb=>{const _0x4a0de1=_0x17e81a;VisuMZ[_0x4a0de1(0x717)](_0x39fffb,_0x39fffb);const _0x1558cc=Math[_0x4a0de1(0x397)](_0x39fffb[_0x4a0de1(0x43d)])[_0x4a0de1(0xb7)](0x1,0x64),_0x204ef9=_0x39fffb[_0x4a0de1(0x26d)],_0x273ac9=_0x204ef9['Origin'][_0x4a0de1(0xb7)](0x0,0x1),_0x17b343=Math[_0x4a0de1(0x397)](_0x204ef9[_0x4a0de1(0x5a1)]||0x0),_0x490f07=Math[_0x4a0de1(0x397)](_0x204ef9[_0x4a0de1(0x5f3)]||0x0),_0x5422c9=Math[_0x4a0de1(0x397)](_0x204ef9[_0x4a0de1(0x385)]||0x0),_0x33faef=Math[_0x4a0de1(0x397)](_0x204ef9[_0x4a0de1(0x834)]||0x0),_0x570c45=Math[_0x4a0de1(0x397)](_0x204ef9[_0x4a0de1(0x441)])['clamp'](0x0,0xff),_0x56688b=_0x204ef9[_0x4a0de1(0x6b7)],_0x160630=_0x4a0de1(0x4be),_0x39c7e6=_0x39fffb[_0x4a0de1(0x733)]?'Smooth':_0x4a0de1(0x394),_0x2f60b4=_0x160630['format'](_0x39fffb[_0x4a0de1(0x456)],_0x39c7e6);$gameScreen[_0x4a0de1(0x5f7)](_0x1558cc,_0x2f60b4,_0x273ac9,_0x17b343,_0x490f07,_0x5422c9,_0x33faef,_0x570c45,_0x56688b);}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x612),_0x30cf68=>{const _0x4b12f8=_0x17e81a;VisuMZ['ConvertParams'](_0x30cf68,_0x30cf68);const _0x312b5e=_0x30cf68['Type']||'random',_0x54fcf6=_0x30cf68['Power'][_0x4b12f8(0xb7)](0x1,0x9),_0x4db711=_0x30cf68[_0x4b12f8(0x5c7)][_0x4b12f8(0xb7)](0x1,0x9),_0x4a3308=_0x30cf68[_0x4b12f8(0x338)]||0x1,_0x310b13=_0x30cf68['Wait'];$gameScreen[_0x4b12f8(0x516)](_0x312b5e),$gameScreen[_0x4b12f8(0x53e)](_0x54fcf6,_0x4db711,_0x4a3308);if(_0x310b13){const _0x4322c4=$gameTemp[_0x4b12f8(0x6f7)]();if(_0x4322c4)_0x4322c4[_0x4b12f8(0x289)](_0x4a3308);}}),PluginManager['registerCommand'](pluginData['name'],_0x17e81a(0x79b),_0x1540d5=>{const _0x36b027=_0x17e81a;if($gameParty[_0x36b027(0x180)]())return;VisuMZ['ConvertParams'](_0x1540d5,_0x1540d5);const _0x21c217=_0x1540d5[_0x36b027(0x6d0)],_0x2e0d5a=(_0x1540d5[_0x36b027(0x29c)]||0x0)/0x64;for(const _0x18f7be of _0x21c217){const _0x28abe6=Math[_0x36b027(0x59d)]()<=_0x2e0d5a;$gameSwitches['setValue'](_0x18f7be,_0x28abe6);}}),PluginManager[_0x17e81a(0x4cd)](pluginData['name'],_0x17e81a(0x55d),_0x3e637d=>{const _0x16dfbe=_0x17e81a;if($gameParty['inBattle']())return;VisuMZ[_0x16dfbe(0x717)](_0x3e637d,_0x3e637d);const _0x15cfd8=Math[_0x16dfbe(0x444)](_0x3e637d['StartID'],_0x3e637d['EndingID']),_0x4c98c3=Math[_0x16dfbe(0x744)](_0x3e637d['StartID'],_0x3e637d[_0x16dfbe(0x38c)]),_0x263e37=(_0x3e637d[_0x16dfbe(0x29c)]||0x0)/0x64;for(let _0x303f65=_0x15cfd8;_0x303f65<=_0x4c98c3;_0x303f65++){const _0x224835=Math[_0x16dfbe(0x59d)]()<=_0x263e37;$gameSwitches[_0x16dfbe(0x6be)](_0x303f65,_0x224835);}}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x51b),_0x4355ca=>{const _0x1142ac=_0x17e81a;if($gameParty[_0x1142ac(0x180)]())return;VisuMZ['ConvertParams'](_0x4355ca,_0x4355ca);const _0x164bf9=_0x4355ca[_0x1142ac(0x6d0)];for(const _0x244b22 of _0x164bf9){const _0x295628=$gameSwitches[_0x1142ac(0x33c)](_0x244b22);$gameSwitches[_0x1142ac(0x6be)](_0x244b22,!_0x295628);}}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x35b),_0xa820d6=>{const _0x50c11f=_0x17e81a;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0xa820d6,_0xa820d6);const _0x31d92c=Math[_0x50c11f(0x444)](_0xa820d6[_0x50c11f(0x5ac)],_0xa820d6['EndingID']),_0x272013=Math[_0x50c11f(0x744)](_0xa820d6[_0x50c11f(0x5ac)],_0xa820d6['EndingID']);for(let _0x13b4fb=_0x31d92c;_0x13b4fb<=_0x272013;_0x13b4fb++){const _0x200368=$gameSwitches[_0x50c11f(0x33c)](_0x13b4fb);$gameSwitches[_0x50c11f(0x6be)](_0x13b4fb,!_0x200368);}}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],'SystemSetFontSize',_0x1bbfc2=>{const _0x19b468=_0x17e81a;VisuMZ[_0x19b468(0x717)](_0x1bbfc2,_0x1bbfc2);const _0x1e4c83=_0x1bbfc2[_0x19b468(0x50f)]||0x1;$gameSystem[_0x19b468(0x101)](_0x1e4c83);}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x369),_0x5a8a12=>{const _0x2005c1=_0x17e81a;if($gameParty[_0x2005c1(0x180)]())return;VisuMZ[_0x2005c1(0x717)](_0x5a8a12,_0x5a8a12);const _0x3c1868=_0x5a8a12['option'];if(_0x3c1868[_0x2005c1(0x6b6)](/Front/i))$gameSystem['setSideView'](![]);else _0x3c1868[_0x2005c1(0x6b6)](/Side/i)?$gameSystem[_0x2005c1(0x643)](!![]):$gameSystem[_0x2005c1(0x643)](!$gameSystem[_0x2005c1(0x216)]());}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x37f),_0x501871=>{const _0x143bef=_0x17e81a;if($gameParty[_0x143bef(0x180)]())return;VisuMZ[_0x143bef(0x717)](_0x501871,_0x501871);const _0x1335d4=[_0x143bef(0x3a8),_0x143bef(0x4a3),'me','se'];for(const _0x1e1d44 of _0x1335d4){const _0x383c88=_0x501871[_0x1e1d44],_0x1a3ec0=_0x143bef(0x783)[_0x143bef(0x51e)](_0x1e1d44);for(const _0x59c358 of _0x383c88){AudioManager[_0x143bef(0x721)](_0x1a3ec0,_0x59c358);}}}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x3da),_0x24d32e=>{const _0x4db678=_0x17e81a;if($gameParty[_0x4db678(0x180)]())return;VisuMZ[_0x4db678(0x717)](_0x24d32e,_0x24d32e);const _0x5d9379=['animations',_0x4db678(0x475),_0x4db678(0xb9),'characters',_0x4db678(0x62b),_0x4db678(0x4e2),_0x4db678(0xd3),_0x4db678(0x39f),'sv_actors','sv_enemies',_0x4db678(0x815),_0x4db678(0x395),_0x4db678(0x17f),_0x4db678(0xd8)];for(const _0x1fe8d6 of _0x5d9379){const _0x12a8e6=_0x24d32e[_0x1fe8d6],_0x49f504=_0x4db678(0x787)[_0x4db678(0x51e)](_0x1fe8d6);for(const _0x42ff67 of _0x12a8e6){ImageManager[_0x4db678(0x1ef)](_0x49f504,_0x42ff67);}}}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x7ef),_0x32ceb8=>{const _0x23e89d=_0x17e81a;if($gameParty[_0x23e89d(0x180)]())return;VisuMZ[_0x23e89d(0x717)](_0x32ceb8,_0x32ceb8);const _0x14db62=_0x32ceb8[_0x23e89d(0x50f)][_0x23e89d(0x413)]()[_0x23e89d(0x1b5)](),_0xbb9b24=VisuMZ['CoreEngine'][_0x23e89d(0x715)](_0x14db62);$gameSystem[_0x23e89d(0x13e)](_0xbb9b24);}),VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x715)]=function(_0x43c847){const _0x504775=_0x17e81a;_0x43c847=_0x43c847||_0x504775(0x820),_0x43c847=String(_0x43c847)[_0x504775(0x413)]()[_0x504775(0x1b5)]();switch(_0x43c847){case _0x504775(0x17e):return 0x0;case _0x504775(0x75b):Imported[_0x504775(0x4b2)]&&(ConfigManager[_0x504775(0x17b)]=!![]);return 0x1;case _0x504775(0x462):Imported[_0x504775(0x4b2)]&&(ConfigManager[_0x504775(0x17b)]=![]);return 0x2;case _0x504775(0x2e0):if(Imported[_0x504775(0x813)])return _0x504775(0x2e0);break;case _0x504775(0x657):if(Imported['VisuMZ_2_BattleSystemSTB'])return'STB';break;case _0x504775(0x7f5):if(Imported[_0x504775(0x7a2)])return _0x504775(0x7f5);break;case _0x504775(0x1c3):if(Imported[_0x504775(0x5b6)])return _0x504775(0x1c3);break;case _0x504775(0x662):if(Imported[_0x504775(0x65a)])return _0x504775(0x662);break;case _0x504775(0x772):if(Imported[_0x504775(0x577)])return _0x504775(0x772);break;case _0x504775(0x7fa):if(Imported[_0x504775(0x531)])return _0x504775(0x7fa);break;}return $dataSystem[_0x504775(0x6f2)];},PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x51d),_0x49af81=>{VisuMZ['ConvertParams'](_0x49af81,_0x49af81);const _0x9dba59=_0x49af81['option']||0x1;$gameSystem['setWindowPadding'](_0x9dba59);}),PluginManager['registerCommand'](pluginData[_0x17e81a(0x320)],_0x17e81a(0x254),_0xf75d54=>{const _0x59ae44=_0x17e81a;VisuMZ[_0x59ae44(0x717)](_0xf75d54,_0xf75d54);const _0x10533b=_0xf75d54[_0x59ae44(0x443)]||'';$textPopup(_0x10533b);}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x35e),_0x241950=>{const _0x3465c0=_0x17e81a;VisuMZ[_0x3465c0(0x717)](_0x241950,_0x241950);const _0x151aa2=_0x241950['id']||0x1,_0x172cd7=_0x241950[_0x3465c0(0x5d8)],_0x17ecf3=_0x241950['operand']||0x0;let _0x253db7=$gameVariables['value'](_0x151aa2)||0x0;switch(_0x172cd7){case'=':_0x253db7=_0x17ecf3;break;case'+':_0x253db7+=_0x17ecf3;break;case'-':_0x253db7-=_0x17ecf3;break;case'*':_0x253db7*=_0x17ecf3;break;case'/':_0x253db7/=_0x17ecf3;break;case'%':_0x253db7%=_0x17ecf3;break;}_0x253db7=_0x253db7||0x0,$gameVariables[_0x3465c0(0x6be)](_0x151aa2,_0x253db7);}),PluginManager[_0x17e81a(0x4cd)](pluginData[_0x17e81a(0x320)],_0x17e81a(0x6bc),_0xa55957=>{const _0x524b04=_0x17e81a;VisuMZ['ConvertParams'](_0xa55957,_0xa55957);const _0x3da244=_0xa55957['id']()||0x1,_0x579fba=_0xa55957[_0x524b04(0x5d8)],_0x37e00b=_0xa55957[_0x524b04(0xd1)]()||0x0;let _0xae70a3=$gameVariables[_0x524b04(0x33c)](_0x3da244)||0x0;switch(_0x579fba){case'=':_0xae70a3=_0x37e00b;break;case'+':_0xae70a3+=_0x37e00b;break;case'-':_0xae70a3-=_0x37e00b;break;case'*':_0xae70a3*=_0x37e00b;break;case'/':_0xae70a3/=_0x37e00b;break;case'%':_0xae70a3%=_0x37e00b;break;}_0xae70a3=_0xae70a3||0x0,$gameVariables[_0x524b04(0x6be)](_0x3da244,_0xae70a3);}),VisuMZ[_0x17e81a(0x1a7)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x17e81a(0x44d)]['onDatabaseLoaded'],Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x387)]=function(){const _0x5e1b98=_0x17e81a;VisuMZ[_0x5e1b98(0x1a7)]['Scene_Boot_onDatabaseLoaded'][_0x5e1b98(0x65e)](this),this[_0x5e1b98(0x4fa)](),this[_0x5e1b98(0x4e1)](),this[_0x5e1b98(0xd6)](),this[_0x5e1b98(0x1d7)](),this[_0x5e1b98(0x703)](),this[_0x5e1b98(0x1bf)](),VisuMZ[_0x5e1b98(0x25a)]();},VisuMZ['CoreEngine'][_0x17e81a(0x604)]={},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x4fa)]=function(){const _0xf93c5=_0x17e81a,_0x403bb1=[_0xf93c5(0x677),_0xf93c5(0x427),_0xf93c5(0x56a),_0xf93c5(0x3db),'MAT',_0xf93c5(0x5a7),_0xf93c5(0x2c9),_0xf93c5(0x528)],_0x376009=[_0xf93c5(0x82d),'EVA',_0xf93c5(0x651),_0xf93c5(0x57e),_0xf93c5(0x644),_0xf93c5(0x683),_0xf93c5(0x56d),_0xf93c5(0x7c8),_0xf93c5(0x68f),_0xf93c5(0x467)],_0x5d7665=['TGR',_0xf93c5(0x4d3),_0xf93c5(0x39b),_0xf93c5(0x86a),'MCR',_0xf93c5(0x557),_0xf93c5(0x1d9),'MDR','FDR',_0xf93c5(0x22f)],_0x45ee8f=[_0x403bb1,_0x376009,_0x5d7665],_0x161226=[_0xf93c5(0x1ec),_0xf93c5(0x1d4),_0xf93c5(0x7e4),_0xf93c5(0x7e2),_0xf93c5(0x5e3),_0xf93c5(0x22b),_0xf93c5(0x3d0),_0xf93c5(0x173),_0xf93c5(0x194),_0xf93c5(0x5a2)];for(const _0x1117a3 of _0x45ee8f){let _0x4ada93='';if(_0x1117a3===_0x403bb1)_0x4ada93=_0xf93c5(0x4bb);if(_0x1117a3===_0x376009)_0x4ada93='xparam';if(_0x1117a3===_0x5d7665)_0x4ada93=_0xf93c5(0x7fc);for(const _0x860199 of _0x161226){let _0x7454a7=_0xf93c5(0x66a)[_0xf93c5(0x51e)](_0x4ada93,_0x860199);VisuMZ[_0xf93c5(0x1a7)][_0xf93c5(0x604)][_0x7454a7]=[],VisuMZ[_0xf93c5(0x1a7)][_0xf93c5(0x604)][_0x7454a7+'JS']=[];let _0x5cafaf=_0xf93c5(0x4a4);if(['Plus',_0xf93c5(0x173)][_0xf93c5(0x2b0)](_0x860199))_0x5cafaf+=_0xf93c5(0x45e);else{if([_0xf93c5(0x1d4),'Flat1'][_0xf93c5(0x2b0)](_0x860199))_0x5cafaf+=_0xf93c5(0x2ac);else{if([_0xf93c5(0x7e4),_0xf93c5(0x5a2)][_0xf93c5(0x2b0)](_0x860199))_0x5cafaf+=_0xf93c5(0x5ed);else{if(_0x860199===_0xf93c5(0x7e2))_0x5cafaf+='(\x5cd+)>';else{if(_0x860199===_0xf93c5(0x22b))_0x5cafaf+=_0xf93c5(0x44a);else _0x860199==='Rate2'&&(_0x5cafaf+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x30a124 of _0x1117a3){let _0x3243b0=_0x860199[_0xf93c5(0x7b7)](/[\d+]/g,'')[_0xf93c5(0x413)]();const _0x306db0=_0x5cafaf[_0xf93c5(0x51e)](_0x30a124,_0x3243b0);VisuMZ[_0xf93c5(0x1a7)]['RegExp'][_0x7454a7][_0xf93c5(0x189)](new RegExp(_0x306db0,'i'));const _0x47ece0=_0xf93c5(0xb4)[_0xf93c5(0x51e)](_0x30a124,_0x3243b0);VisuMZ[_0xf93c5(0x1a7)][_0xf93c5(0x604)][_0x7454a7+'JS'][_0xf93c5(0x189)](new RegExp(_0x47ece0,'i'));}}}},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x4e1)]=function(){const _0xa7f9ec=_0x17e81a;if(VisuMZ[_0xa7f9ec(0x25a)])return;},Scene_Boot[_0x17e81a(0x44d)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x10af45=_0x17e81a,_0x5ef5e7=VisuMZ['CoreEngine'][_0x10af45(0x26d)];_0x5ef5e7['QoL']['OpenConsole']&&VisuMZ['ShowDevTools'](!![]);_0x5ef5e7['QoL'][_0x10af45(0x344)]&&(Input[_0x10af45(0x7ac)][0x23]=_0x10af45(0x6aa),Input[_0x10af45(0x7ac)][0x24]=_0x10af45(0x4e3));if(_0x5ef5e7[_0x10af45(0xd5)]){const _0xe8b424=_0x5ef5e7[_0x10af45(0xd5)];_0xe8b424['KeySHIFT']=_0xe8b424[_0x10af45(0xe9)]||'\x5c}❪SHIFT❫\x5c{',_0xe8b424['KeyTAB']=_0xe8b424[_0x10af45(0x355)]||'\x5c}❪TAB❫\x5c{';}_0x5ef5e7['KeyboardInput']['WASD']&&(Input[_0x10af45(0x7ac)][0x57]='up',Input[_0x10af45(0x7ac)][0x41]=_0x10af45(0x7d8),Input[_0x10af45(0x7ac)][0x53]=_0x10af45(0x2f0),Input[_0x10af45(0x7ac)][0x44]=_0x10af45(0x669),Input['keyMapper'][0x45]=_0x10af45(0x1b0)),_0x5ef5e7[_0x10af45(0x766)]['DashToggleR']&&(Input['keyMapper'][0x52]=_0x10af45(0x24c)),_0x5ef5e7['Param'][_0x10af45(0xfc)]=_0x5ef5e7[_0x10af45(0x324)][_0x10af45(0xfc)][_0x10af45(0x752)](_0xe79346=>_0xe79346['toUpperCase']()[_0x10af45(0x1b5)]()),_0x5ef5e7[_0x10af45(0x324)][_0x10af45(0x829)]=_0x5ef5e7[_0x10af45(0x324)]['ExtDisplayedParams'][_0x10af45(0x752)](_0x2d349f=>_0x2d349f[_0x10af45(0x413)]()[_0x10af45(0x1b5)]()),_0x5ef5e7['QoL'][_0x10af45(0x773)]=_0x5ef5e7['QoL']['ShiftR_Toggle']??!![],_0x5ef5e7[_0x10af45(0x51f)][_0x10af45(0x11f)]=_0x5ef5e7['QoL']['ShiftT_Toggle']??!![],_0x5ef5e7[_0x10af45(0xd5)][_0x10af45(0x582)]&&VisuMZ[_0x10af45(0x1a7)][_0x10af45(0x822)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x822)]=function(){const _0x4f3c1b=_0x17e81a;let _0x4b0d7e=![],_0x34a0e0=![];for(let _0x47150f in Input['keyMapper']){const _0x4b1fd0=Input[_0x4f3c1b(0x7ac)][_0x47150f];if(_0x4b1fd0===_0x4f3c1b(0x37d))_0x4b0d7e=!![];if(_0x4b1fd0===_0x4f3c1b(0x42f))_0x34a0e0=!![];if(_0x4b0d7e&&_0x34a0e0)return;}let _0x7899a6=_0x4f3c1b(0x501);_0x7899a6+=_0x4f3c1b(0x7dc),_0x7899a6+=_0x4f3c1b(0x46f),_0x7899a6+=_0x4f3c1b(0x10e),_0x7899a6+=_0x4f3c1b(0x42e),alert(_0x7899a6),SceneManager[_0x4f3c1b(0x46a)]();},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x1d7)]=function(){const _0x1d5781=_0x17e81a;this[_0x1d5781(0x271)]();},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x240816=_0x17e81a,_0xd355b2=VisuMZ['CoreEngine'][_0x240816(0x26d)][_0x240816(0x2f9)];for(const _0x37f52f of _0xd355b2){const _0x329313=_0x37f52f['FunctionName'][_0x240816(0x7b7)](/[ ]/g,''),_0x4bee0f=_0x37f52f[_0x240816(0x1bc)];VisuMZ['CoreEngine'][_0x240816(0x30e)](_0x329313,_0x4bee0f);}},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x30e)]=function(_0x41aa5f,_0x4053c3){const _0x3958d9=_0x17e81a;if(!!window[_0x41aa5f]){if($gameTemp[_0x3958d9(0x6d5)]())console[_0x3958d9(0x7dd)](_0x3958d9(0x100)[_0x3958d9(0x51e)](_0x41aa5f));}const _0x24f74e='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x3958d9(0x51e)](_0x41aa5f,_0x4053c3);window[_0x41aa5f]=new Function(_0x24f74e);},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x703)]=function(){const _0xb3a719=_0x17e81a,_0x57af22=VisuMZ['CoreEngine']['Settings'][_0xb3a719(0x54a)];if(!_0x57af22)return;for(const _0x4e85ef of _0x57af22){if(!_0x4e85ef)continue;VisuMZ['CoreEngine'][_0xb3a719(0x317)](_0x4e85ef);}},VisuMZ[_0x17e81a(0x1a7)]['CustomParamNames']={},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x6a5)]={},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x247)]={},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x192)]={},VisuMZ[_0x17e81a(0x1a7)]['createCustomParameter']=function(_0x33a032){const _0x259e8b=_0x17e81a,_0x241ba7=_0x33a032[_0x259e8b(0x19a)],_0x31d36d=_0x33a032['ParamName'],_0x468e29=_0x33a032[_0x259e8b(0x1df)],_0x26f54e=_0x33a032[_0x259e8b(0x64c)],_0x2c5505=new Function(_0x33a032['ValueJS']);VisuMZ[_0x259e8b(0x1a7)][_0x259e8b(0x2ec)][_0x241ba7['toUpperCase']()[_0x259e8b(0x1b5)]()]=_0x31d36d,VisuMZ[_0x259e8b(0x1a7)][_0x259e8b(0x6a5)][_0x241ba7[_0x259e8b(0x413)]()['trim']()]=_0x468e29,VisuMZ[_0x259e8b(0x1a7)]['CustomParamType'][_0x241ba7[_0x259e8b(0x413)]()['trim']()]=_0x26f54e,VisuMZ[_0x259e8b(0x1a7)]['CustomParamAbb'][_0x241ba7[_0x259e8b(0x413)]()['trim']()]=_0x241ba7,Object[_0x259e8b(0x386)](Game_BattlerBase[_0x259e8b(0x44d)],_0x241ba7,{'get'(){const _0x5d6a3d=_0x259e8b,_0x12353c=_0x2c5505['call'](this);return _0x26f54e==='integer'?Math[_0x5d6a3d(0x397)](_0x12353c):_0x12353c;}});},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x83c)]={},VisuMZ['CoreEngine'][_0x17e81a(0x7f4)]={},Scene_Boot['prototype'][_0x17e81a(0x1bf)]=function(){const _0xc6691f=_0x17e81a,_0x52248e=VisuMZ['CoreEngine']['Settings'][_0xc6691f(0x83c)];for(const _0x3a0790 of _0x52248e){const _0x517e56=(_0x3a0790[_0xc6691f(0x724)]||'')[_0xc6691f(0x565)]()[_0xc6691f(0x1b5)](),_0x244cc0=(_0x3a0790['Match']||'')[_0xc6691f(0x565)]()['trim']();VisuMZ['CoreEngine'][_0xc6691f(0x83c)][_0x517e56]=_0x3a0790,VisuMZ['CoreEngine']['ControllerMatches'][_0x244cc0]=_0x517e56;}},VisuMZ['ParseAllNotetags']=function(){const _0x51938a=_0x17e81a;for(const _0xcbd47f of $dataActors){if(_0xcbd47f)VisuMZ[_0x51938a(0x574)](_0xcbd47f);}for(const _0x2ff54d of $dataClasses){if(_0x2ff54d)VisuMZ[_0x51938a(0x274)](_0x2ff54d);}for(const _0x532c1d of $dataSkills){if(_0x532c1d)VisuMZ[_0x51938a(0x3ca)](_0x532c1d);}for(const _0x3f47ec of $dataItems){if(_0x3f47ec)VisuMZ[_0x51938a(0x232)](_0x3f47ec);}for(const _0x22b667 of $dataWeapons){if(_0x22b667)VisuMZ[_0x51938a(0x660)](_0x22b667);}for(const _0x53e848 of $dataArmors){if(_0x53e848)VisuMZ[_0x51938a(0xc8)](_0x53e848);}for(const _0xde6950 of $dataEnemies){if(_0xde6950)VisuMZ['ParseEnemyNotetags'](_0xde6950);}for(const _0x1479c1 of $dataStates){if(_0x1479c1)VisuMZ['ParseStateNotetags'](_0x1479c1);}for(const _0x513dd1 of $dataTilesets){if(_0x513dd1)VisuMZ[_0x51938a(0x87d)](_0x513dd1);}},VisuMZ[_0x17e81a(0x574)]=function(_0x4d23ca){},VisuMZ['ParseClassNotetags']=function(_0x3e920d){},VisuMZ[_0x17e81a(0x3ca)]=function(_0x459ceb){},VisuMZ[_0x17e81a(0x232)]=function(_0x174661){},VisuMZ[_0x17e81a(0x660)]=function(_0x4155a8){},VisuMZ['ParseArmorNotetags']=function(_0x4f0f51){},VisuMZ[_0x17e81a(0x349)]=function(_0x549c9e){},VisuMZ[_0x17e81a(0x3b7)]=function(_0x95528c){},VisuMZ['ParseTilesetNotetags']=function(_0x170e7f){},VisuMZ[_0x17e81a(0x1a7)]['ParseActorNotetags']=VisuMZ[_0x17e81a(0x574)],VisuMZ['ParseActorNotetags']=function(_0x1c1f98){const _0x40dc55=_0x17e81a;VisuMZ['CoreEngine'][_0x40dc55(0x574)][_0x40dc55(0x65e)](this,_0x1c1f98);const _0x1606e0=_0x1c1f98['note'];if(_0x1606e0[_0x40dc55(0x6b6)](/<MAX LEVEL:[ ](\d+)>/i)){_0x1c1f98['maxLevel']=Number(RegExp['$1']);if(_0x1c1f98[_0x40dc55(0x44c)]===0x0)_0x1c1f98[_0x40dc55(0x44c)]=Number[_0x40dc55(0x3ce)];}_0x1606e0[_0x40dc55(0x6b6)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x1c1f98[_0x40dc55(0x39c)]=Math[_0x40dc55(0x444)](Number(RegExp['$1']),_0x1c1f98[_0x40dc55(0x44c)]));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x274)]=VisuMZ[_0x17e81a(0x274)],VisuMZ['ParseClassNotetags']=function(_0x301812){const _0x1d988d=_0x17e81a;VisuMZ[_0x1d988d(0x1a7)]['ParseClassNotetags'][_0x1d988d(0x65e)](this,_0x301812);if(_0x301812[_0x1d988d(0x1ad)])for(const _0x15b071 of _0x301812[_0x1d988d(0x1ad)]){_0x15b071['note'][_0x1d988d(0x6b6)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x15b071[_0x1d988d(0x7fb)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x349)]=VisuMZ[_0x17e81a(0x349)],VisuMZ['ParseEnemyNotetags']=function(_0x46987b){const _0x277591=_0x17e81a;VisuMZ[_0x277591(0x1a7)]['ParseEnemyNotetags']['call'](this,_0x46987b),_0x46987b[_0x277591(0x7fb)]=0x1;const _0x5a9ad6=_0x46987b[_0x277591(0x176)];if(_0x5a9ad6[_0x277591(0x6b6)](/<LEVEL:[ ](\d+)>/i))_0x46987b[_0x277591(0x7fb)]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<MAXHP:[ ](\d+)>/i))_0x46987b['params'][0x0]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<MAXMP:[ ](\d+)>/i))_0x46987b[_0x277591(0x4ff)][0x1]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<ATK:[ ](\d+)>/i))_0x46987b[_0x277591(0x4ff)][0x2]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<DEF:[ ](\d+)>/i))_0x46987b['params'][0x3]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<MAT:[ ](\d+)>/i))_0x46987b[_0x277591(0x4ff)][0x4]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<MDF:[ ](\d+)>/i))_0x46987b[_0x277591(0x4ff)][0x5]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<AGI:[ ](\d+)>/i))_0x46987b[_0x277591(0x4ff)][0x6]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<LUK:[ ](\d+)>/i))_0x46987b['params'][0x7]=Number(RegExp['$1']);if(_0x5a9ad6['match'](/<EXP:[ ](\d+)>/i))_0x46987b[_0x277591(0x547)]=Number(RegExp['$1']);if(_0x5a9ad6[_0x277591(0x6b6)](/<GOLD:[ ](\d+)>/i))_0x46987b['gold']=Number(RegExp['$1']);},VisuMZ[_0x17e81a(0x1a7)]['Graphics_defaultStretchMode']=Graphics[_0x17e81a(0x853)],Graphics['_defaultStretchMode']=function(){const _0x36a7ed=_0x17e81a;switch(VisuMZ[_0x36a7ed(0x1a7)][_0x36a7ed(0x26d)][_0x36a7ed(0x51f)][_0x36a7ed(0x42b)]){case'stretch':return!![];case _0x36a7ed(0x617):return![];default:return VisuMZ[_0x36a7ed(0x1a7)][_0x36a7ed(0x80e)][_0x36a7ed(0x65e)](this);}},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x610)]=Graphics['printError'],Graphics[_0x17e81a(0xb2)]=function(_0x3ab628,_0x58e11c,_0x508bbe=null){const _0x193d16=_0x17e81a;VisuMZ[_0x193d16(0x1a7)][_0x193d16(0x610)][_0x193d16(0x65e)](this,_0x3ab628,_0x58e11c,_0x508bbe),VisuMZ[_0x193d16(0x54d)](![]);},VisuMZ[_0x17e81a(0x1a7)]['Graphics_centerElement']=Graphics['_centerElement'],Graphics[_0x17e81a(0x76f)]=function(_0x281f59){const _0x38dd6d=_0x17e81a;VisuMZ['CoreEngine']['Graphics_centerElement'][_0x38dd6d(0x65e)](this,_0x281f59),this[_0x38dd6d(0x11e)](_0x281f59);},Graphics[_0x17e81a(0x11e)]=function(_0x274eb2){const _0x4579ea=_0x17e81a;VisuMZ[_0x4579ea(0x1a7)][_0x4579ea(0x26d)][_0x4579ea(0x51f)][_0x4579ea(0x86b)]&&(_0x274eb2[_0x4579ea(0x121)][_0x4579ea(0x1e0)]='none');VisuMZ[_0x4579ea(0x1a7)]['Settings'][_0x4579ea(0x51f)][_0x4579ea(0x24f)]&&(_0x274eb2[_0x4579ea(0x121)][_0x4579ea(0x27a)]=_0x4579ea(0x193));const _0xd6c94e=Math[_0x4579ea(0x744)](0x0,Math[_0x4579ea(0x2b3)](_0x274eb2[_0x4579ea(0x107)]*this[_0x4579ea(0x2cd)])),_0x45de2d=Math[_0x4579ea(0x744)](0x0,Math[_0x4579ea(0x2b3)](_0x274eb2['height']*this['_realScale']));_0x274eb2[_0x4579ea(0x121)][_0x4579ea(0x107)]=_0xd6c94e+'px',_0x274eb2[_0x4579ea(0x121)][_0x4579ea(0x4a1)]=_0x45de2d+'px';},VisuMZ['CoreEngine'][_0x17e81a(0x661)]=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x103)],Bitmap['prototype'][_0x17e81a(0x103)]=function(_0x113e16,_0x2ef3f5){const _0x5bfc7a=_0x17e81a;VisuMZ[_0x5bfc7a(0x1a7)][_0x5bfc7a(0x661)][_0x5bfc7a(0x65e)](this,_0x113e16,_0x2ef3f5),this[_0x5bfc7a(0x510)]=!(VisuMZ['CoreEngine'][_0x5bfc7a(0x26d)][_0x5bfc7a(0x51f)][_0x5bfc7a(0x24f)]??!![]);},Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x6cf)]=function(){const _0x40ecd2=_0x17e81a;this[_0x40ecd2(0x5e7)]=!![];},VisuMZ['CoreEngine'][_0x17e81a(0x82b)]=Sprite[_0x17e81a(0x44d)][_0x17e81a(0x2c7)],Sprite['prototype'][_0x17e81a(0x2c7)]=function(){const _0x27530e=_0x17e81a;if(this[_0x27530e(0x3a0)])VisuMZ['CoreEngine'][_0x27530e(0x82b)][_0x27530e(0x65e)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x17e81a(0x44d)][_0x17e81a(0x248)]=function(){const _0x56e003=_0x17e81a;if(!this[_0x56e003(0x313)])return;if(!this[_0x56e003(0x313)][_0x56e003(0x5e7)])return;this['bitmap']['_baseTexture']&&!this[_0x56e003(0x3e9)]['_baseTexture'][_0x56e003(0x419)]&&this[_0x56e003(0x313)][_0x56e003(0x2c7)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x12f)]=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x7bb)],Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x7bb)]=function(_0x4b4669,_0x52d4ea){const _0x48fcac=_0x17e81a;VisuMZ[_0x48fcac(0x1a7)][_0x48fcac(0x12f)]['call'](this,_0x4b4669,_0x52d4ea),this[_0x48fcac(0x6cf)]();},VisuMZ['CoreEngine'][_0x17e81a(0x224)]=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x548)],Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x548)]=function(_0x523d7d,_0x3214de,_0x5917ec,_0x50c3ea,_0x131deb,_0x3ec959,_0x44ae82,_0x3b5791,_0x242947){const _0x2a0f00=_0x17e81a;_0x3214de=Math[_0x2a0f00(0x397)](_0x3214de),_0x5917ec=Math[_0x2a0f00(0x397)](_0x5917ec),_0x50c3ea=Math[_0x2a0f00(0x397)](_0x50c3ea),_0x131deb=Math[_0x2a0f00(0x397)](_0x131deb),_0x3ec959=Math[_0x2a0f00(0x397)](_0x3ec959),_0x44ae82=Math['round'](_0x44ae82),VisuMZ[_0x2a0f00(0x1a7)]['Bitmap_blt'][_0x2a0f00(0x65e)](this,_0x523d7d,_0x3214de,_0x5917ec,_0x50c3ea,_0x131deb,_0x3ec959,_0x44ae82,_0x3b5791,_0x242947),this['markCoreEngineModified']();},VisuMZ[_0x17e81a(0x1a7)]['Bitmap_clearRect']=Bitmap['prototype'][_0x17e81a(0x81f)],Bitmap['prototype'][_0x17e81a(0x81f)]=function(_0x2c7c0f,_0x50dd14,_0x4008d0,_0x177289){const _0x24c9f5=_0x17e81a;VisuMZ['CoreEngine'][_0x24c9f5(0x5ee)][_0x24c9f5(0x65e)](this,_0x2c7c0f,_0x50dd14,_0x4008d0,_0x177289),this[_0x24c9f5(0x6cf)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x7da)]=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x2b2)],Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x2b2)]=function(_0x31194d,_0x2b4642,_0x40a6d5,_0x1ba08a,_0x41fda6){const _0x8c91c8=_0x17e81a;VisuMZ[_0x8c91c8(0x1a7)][_0x8c91c8(0x7da)][_0x8c91c8(0x65e)](this,_0x31194d,_0x2b4642,_0x40a6d5,_0x1ba08a,_0x41fda6),this[_0x8c91c8(0x6cf)]();},VisuMZ['CoreEngine'][_0x17e81a(0x400)]=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x4af)],Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x4af)]=function(_0x454f47,_0x121cf4,_0x49400b,_0x2be6d5,_0x4eff68){const _0x14ece2=_0x17e81a;VisuMZ[_0x14ece2(0x1a7)][_0x14ece2(0x400)]['call'](this,_0x454f47,_0x121cf4,_0x49400b,_0x2be6d5,_0x4eff68),this[_0x14ece2(0x6cf)]();},VisuMZ['CoreEngine']['Bitmap_gradientFillRect']=Bitmap['prototype'][_0x17e81a(0x255)],Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x255)]=function(_0x18aa81,_0x132919,_0x43448a,_0x4626ce,_0x375425,_0x5b7562,_0x4d3558){const _0x11bda7=_0x17e81a;VisuMZ[_0x11bda7(0x1a7)]['Bitmap_gradientFillRect']['call'](this,_0x18aa81,_0x132919,_0x43448a,_0x4626ce,_0x375425,_0x5b7562,_0x4d3558),this[_0x11bda7(0x6cf)]();},VisuMZ[_0x17e81a(0x1a7)]['Bitmap_drawCircle']=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x1a8)],Bitmap[_0x17e81a(0x44d)]['drawCircle']=function(_0x33e1ab,_0x30c687,_0x3686b4,_0x383c17){const _0x49d454=_0x17e81a;_0x33e1ab=Math['round'](_0x33e1ab),_0x30c687=Math['round'](_0x30c687),_0x3686b4=Math[_0x49d454(0x397)](_0x3686b4),VisuMZ[_0x49d454(0x1a7)][_0x49d454(0x63b)]['call'](this,_0x33e1ab,_0x30c687,_0x3686b4,_0x383c17),this[_0x49d454(0x6cf)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x4d2)]=Bitmap['prototype'][_0x17e81a(0x857)],Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x857)]=function(_0x2a75b4){const _0x7e7c89=_0x17e81a;return Math[_0x7e7c89(0x2a2)](VisuMZ[_0x7e7c89(0x1a7)]['Bitmap_measureTextWidth']['call'](this,_0x2a75b4));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x25e)]=Bitmap['prototype'][_0x17e81a(0x821)],Bitmap[_0x17e81a(0x44d)]['drawText']=function(_0x3f9215,_0x3b033b,_0xbdc5b9,_0x2b22e6,_0x43d34b,_0x46645b){const _0x424c2e=_0x17e81a;_0x3b033b=Math[_0x424c2e(0x397)](_0x3b033b),_0xbdc5b9=Math[_0x424c2e(0x397)](_0xbdc5b9),_0x2b22e6=Math[_0x424c2e(0x2a2)](_0x2b22e6),_0x43d34b=Math[_0x424c2e(0x2a2)](_0x43d34b),VisuMZ[_0x424c2e(0x1a7)][_0x424c2e(0x25e)]['call'](this,_0x3f9215,_0x3b033b,_0xbdc5b9,_0x2b22e6,_0x43d34b,_0x46645b),this['markCoreEngineModified']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x1e8)]=Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x61c)],Bitmap[_0x17e81a(0x44d)]['_drawTextOutline']=function(_0xd6368,_0xfd90a1,_0x3c88c1,_0x347dac){const _0x23822b=_0x17e81a;VisuMZ[_0x23822b(0x1a7)][_0x23822b(0x26d)][_0x23822b(0x51f)][_0x23822b(0x57c)]?this['_drawTextShadow'](_0xd6368,_0xfd90a1,_0x3c88c1,_0x347dac):VisuMZ['CoreEngine'][_0x23822b(0x1e8)][_0x23822b(0x65e)](this,_0xd6368,_0xfd90a1,_0x3c88c1,_0x347dac);},Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x11c)]=function(_0x5c6308,_0x51f2ee,_0x137478,_0x3f3a7e){const _0x4a377c=_0x17e81a,_0x34c4f4=this[_0x4a377c(0x718)];_0x34c4f4['fillStyle']=this[_0x4a377c(0x840)],_0x34c4f4[_0x4a377c(0x7a3)](_0x5c6308,_0x51f2ee+0x2,_0x137478+0x2,_0x3f3a7e);},VisuMZ['CoreEngine'][_0x17e81a(0x61a)]=Input[_0x17e81a(0x5e6)],Input[_0x17e81a(0x5e6)]=function(){const _0x4d2be7=_0x17e81a;VisuMZ[_0x4d2be7(0x1a7)][_0x4d2be7(0x61a)][_0x4d2be7(0x65e)](this),this[_0x4d2be7(0x478)]=undefined,this[_0x4d2be7(0x257)]=undefined,this[_0x4d2be7(0x282)]=Input[_0x4d2be7(0x529)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x44f)]=Input[_0x17e81a(0x2a6)],Input[_0x17e81a(0x2a6)]=function(){const _0x41dd66=_0x17e81a;VisuMZ[_0x41dd66(0x1a7)][_0x41dd66(0x44f)]['call'](this);if(this[_0x41dd66(0x282)])this['_gamepadWait']--;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x29f)]=Input[_0x17e81a(0x889)],Input[_0x17e81a(0x889)]=function(){const _0x55781c=_0x17e81a;if(this['_gamepadWait'])return;VisuMZ['CoreEngine'][_0x55781c(0x29f)][_0x55781c(0x65e)](this);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x281)]=Input[_0x17e81a(0x1e9)],Input[_0x17e81a(0x1e9)]=function(){const _0x1a38aa=_0x17e81a;VisuMZ[_0x1a38aa(0x1a7)][_0x1a38aa(0x281)][_0x1a38aa(0x65e)](this),document[_0x1a38aa(0x6fe)]('keypress',this[_0x1a38aa(0x78a)]['bind'](this));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x18e)]=Input['_onKeyDown'],Input[_0x17e81a(0x4a6)]=function(_0x3245da){const _0x4f4dab=_0x17e81a;this[_0x4f4dab(0x257)]=_0x3245da['keyCode'],VisuMZ[_0x4f4dab(0x1a7)][_0x4f4dab(0x18e)]['call'](this,_0x3245da),this[_0x4f4dab(0x43b)](null);},Input[_0x17e81a(0x78a)]=function(_0x5cf363){this['_registerKeyInput'](_0x5cf363);},Input[_0x17e81a(0x376)]=function(_0x4e2554){const _0x183fa7=_0x17e81a;this[_0x183fa7(0x257)]=_0x4e2554['keyCode'];let _0x2a3e76=String[_0x183fa7(0x16d)](_0x4e2554[_0x183fa7(0x876)]);this[_0x183fa7(0x478)]===undefined?this[_0x183fa7(0x478)]=_0x2a3e76:this[_0x183fa7(0x478)]+=_0x2a3e76;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3f3)]=Input[_0x17e81a(0x6af)],Input[_0x17e81a(0x6af)]=function(_0x1a28a5){const _0x25cc8f=_0x17e81a;if(_0x1a28a5===0x8)return![];return VisuMZ['CoreEngine'][_0x25cc8f(0x3f3)][_0x25cc8f(0x65e)](this,_0x1a28a5);},Input[_0x17e81a(0x698)]=function(_0x3cd672){const _0x3547a5=_0x17e81a;if(_0x3cd672[_0x3547a5(0x6b6)](/backspace/i))return this[_0x3547a5(0x257)]===0x8;if(_0x3cd672[_0x3547a5(0x6b6)](/enter/i))return this[_0x3547a5(0x257)]===0xd;if(_0x3cd672['match'](/escape/i))return this[_0x3547a5(0x257)]===0x1b;},Input[_0x17e81a(0x342)]=function(){const _0x1946a7=_0x17e81a;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x1946a7(0x257)]);},Input[_0x17e81a(0x174)]=function(){const _0x3bac75=_0x17e81a;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3bac75(0x257)]);},Input[_0x17e81a(0xf4)]=function(){const _0x4ab2f6=_0x17e81a;if(navigator[_0x4ab2f6(0x117)]){const _0x96e8d0=navigator[_0x4ab2f6(0x117)]();if(_0x96e8d0)for(const _0x122e24 of _0x96e8d0){if(_0x122e24&&_0x122e24['connected'])return!![];}}return![];},Input[_0x17e81a(0x446)]=function(){const _0x5894af=_0x17e81a;if(navigator[_0x5894af(0x117)]){const _0x4006b4=navigator[_0x5894af(0x117)]();if(_0x4006b4)for(const _0x411589 of _0x4006b4){if(_0x411589&&_0x411589[_0x5894af(0x2d8)]){if(this[_0x5894af(0x314)](_0x411589))return!![];if(this[_0x5894af(0x6e4)](_0x411589))return!![];}}}return![];},Input[_0x17e81a(0x314)]=function(_0xad095b){const _0x263c0d=_0x17e81a,_0x3f7c34=_0xad095b[_0x263c0d(0x5cc)];for(let _0x1e9385=0x0;_0x1e9385<_0x3f7c34[_0x263c0d(0x4b4)];_0x1e9385++){if(_0x3f7c34[_0x1e9385]['pressed'])return!![];}return![];},Input[_0x17e81a(0x6e4)]=function(_0x5aa987){const _0xe7709b=_0x5aa987['axes'],_0x157737=0.5;if(_0xe7709b[0x0]<-_0x157737)return!![];if(_0xe7709b[0x0]>_0x157737)return!![];if(_0xe7709b[0x1]<-_0x157737)return!![];if(_0xe7709b[0x1]>_0x157737)return!![];return![];},Input[_0x17e81a(0x162)]=function(){return this['_lastGamepad']||null;},Input[_0x17e81a(0x43b)]=function(_0x5aa627){const _0xd1d501=_0x17e81a;this[_0xd1d501(0x757)]=_0x5aa627;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x737)]=Input[_0x17e81a(0x4a5)],Input['_updateGamepadState']=function(_0x41674f){const _0x4fcc95=_0x17e81a;VisuMZ[_0x4fcc95(0x1a7)][_0x4fcc95(0x737)][_0x4fcc95(0x65e)](this,_0x41674f),(this[_0x4fcc95(0x314)](_0x41674f)||this[_0x4fcc95(0x6e4)](_0x41674f))&&this[_0x4fcc95(0x43b)](_0x41674f);},Input[_0x17e81a(0x638)]=function(){const _0x2e4115=_0x17e81a;return this[_0x2e4115(0x757)]?this[_0x2e4115(0x757)]['id']:_0x2e4115(0x767);},VisuMZ['CoreEngine'][_0x17e81a(0x299)]=Tilemap[_0x17e81a(0x44d)]['_addShadow'],Tilemap[_0x17e81a(0x44d)][_0x17e81a(0x6ec)]=function(_0x16b586,_0x52b347,_0x5473fe,_0x33d3f3){const _0x18be6e=_0x17e81a;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x18be6e(0x1a7)][_0x18be6e(0x299)]['call'](this,_0x16b586,_0x52b347,_0x5473fe,_0x33d3f3);},Tilemap[_0x17e81a(0x708)][_0x17e81a(0x44d)][_0x17e81a(0x707)]=function(){const _0x19f3a4=_0x17e81a;this[_0x19f3a4(0x764)]();for(let _0x300140=0x0;_0x300140<Tilemap[_0x19f3a4(0x7f1)]['MAX_GL_TEXTURES'];_0x300140++){const _0x50c263=new PIXI[(_0x19f3a4(0x503))]();_0x50c263[_0x19f3a4(0x66c)](0x800,0x800),VisuMZ['CoreEngine']['Settings']['QoL']['PixelateImageRendering']&&(_0x50c263[_0x19f3a4(0x447)]=PIXI[_0x19f3a4(0x4a7)][_0x19f3a4(0x3c4)]),this[_0x19f3a4(0x3a2)][_0x19f3a4(0x189)](_0x50c263);}},WindowLayer[_0x17e81a(0x44d)][_0x17e81a(0x48e)]=function(){const _0x2e907f=_0x17e81a;return SceneManager&&SceneManager['_scene']?SceneManager[_0x2e907f(0x116)]['isWindowMaskingEnabled']():!![];},VisuMZ[_0x17e81a(0x1a7)]['WindowLayer_render']=WindowLayer['prototype'][_0x17e81a(0x46e)],WindowLayer[_0x17e81a(0x44d)]['render']=function render(_0x44b69c){const _0x48fbab=_0x17e81a;this[_0x48fbab(0x48e)]()?VisuMZ[_0x48fbab(0x1a7)][_0x48fbab(0x2be)]['call'](this,_0x44b69c):this['renderNoMask'](_0x44b69c);},WindowLayer[_0x17e81a(0x44d)][_0x17e81a(0x758)]=function render(_0xadd4cc){const _0x176bf4=_0x17e81a;if(!this[_0x176bf4(0x366)])return;const _0x4ccd88=new PIXI[(_0x176bf4(0x513))](),_0x32e2f2=_0xadd4cc['gl'],_0xd3ca3b=this[_0x176bf4(0x1a9)]['clone']();_0xadd4cc['framebuffer'][_0x176bf4(0x858)](),_0x4ccd88[_0x176bf4(0x2dc)]=this[_0x176bf4(0x2dc)],_0xadd4cc['batch'][_0x176bf4(0xdb)](),_0x32e2f2[_0x176bf4(0x161)](_0x32e2f2[_0x176bf4(0x50a)]);while(_0xd3ca3b[_0x176bf4(0x4b4)]>0x0){const _0x5217ee=_0xd3ca3b[_0x176bf4(0x1bb)]();_0x5217ee[_0x176bf4(0x7a6)]&&_0x5217ee['visible']&&_0x5217ee[_0x176bf4(0x5a3)]>0x0&&(_0x32e2f2['stencilFunc'](_0x32e2f2[_0x176bf4(0x36c)],0x0,~0x0),_0x32e2f2[_0x176bf4(0x411)](_0x32e2f2[_0x176bf4(0x3b2)],_0x32e2f2[_0x176bf4(0x3b2)],_0x32e2f2[_0x176bf4(0x3b2)]),_0x5217ee['render'](_0xadd4cc),_0xadd4cc[_0x176bf4(0x7c1)][_0x176bf4(0xdb)](),_0x4ccd88[_0x176bf4(0x5e6)](),_0x32e2f2[_0x176bf4(0x3eb)](_0x32e2f2[_0x176bf4(0x695)],0x1,~0x0),_0x32e2f2[_0x176bf4(0x411)](_0x32e2f2['REPLACE'],_0x32e2f2[_0x176bf4(0x4f9)],_0x32e2f2[_0x176bf4(0x4f9)]),_0x32e2f2[_0x176bf4(0x760)](_0x32e2f2[_0x176bf4(0x664)],_0x32e2f2[_0x176bf4(0x1ce)]),_0x4ccd88[_0x176bf4(0x46e)](_0xadd4cc),_0xadd4cc[_0x176bf4(0x7c1)][_0x176bf4(0xdb)](),_0x32e2f2[_0x176bf4(0x760)](_0x32e2f2[_0x176bf4(0x1ce)],_0x32e2f2[_0x176bf4(0x184)]));}_0x32e2f2[_0x176bf4(0x844)](_0x32e2f2['STENCIL_TEST']),_0x32e2f2['clear'](_0x32e2f2[_0x176bf4(0x4e7)]),_0x32e2f2[_0x176bf4(0x5a6)](0x0),_0xadd4cc[_0x176bf4(0x7c1)][_0x176bf4(0xdb)]();for(const _0x44d0bc of this[_0x176bf4(0x1a9)]){!_0x44d0bc[_0x176bf4(0x7a6)]&&_0x44d0bc[_0x176bf4(0x366)]&&_0x44d0bc[_0x176bf4(0x46e)](_0xadd4cc);}_0xadd4cc[_0x176bf4(0x7c1)][_0x176bf4(0xdb)]();},DataManager[_0x17e81a(0x53a)]=function(_0x59e35f){const _0x1d76ab=_0x17e81a;return this[_0x1d76ab(0x4ee)](_0x59e35f)&&_0x59e35f[_0x1d76ab(0x16a)]===0x2;},VisuMZ[_0x17e81a(0x1a7)]['DataManager_setupNewGame']=DataManager[_0x17e81a(0x275)],DataManager[_0x17e81a(0x275)]=function(){const _0x2a9db1=_0x17e81a;VisuMZ[_0x2a9db1(0x1a7)][_0x2a9db1(0x646)][_0x2a9db1(0x65e)](this),this[_0x2a9db1(0x46d)](),this[_0x2a9db1(0x762)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x450875=_0x17e81a;if($gameTemp[_0x450875(0x6d5)]()){const _0x3e54db=VisuMZ[_0x450875(0x1a7)][_0x450875(0x26d)][_0x450875(0x51f)][_0x450875(0x223)];if(_0x3e54db>0x0)$gameTemp[_0x450875(0x550)](_0x3e54db);}},DataManager['reserveNewGameCommonEvent']=function(){const _0x3e2106=_0x17e81a,_0x133b14=VisuMZ['CoreEngine']['Settings'][_0x3e2106(0x51f)][_0x3e2106(0x154)]||0x0;if(_0x133b14>0x0)$gameTemp[_0x3e2106(0x550)](_0x133b14);},DataManager[_0x17e81a(0x2f2)]=function(_0xbc75a2){const _0x543bce=_0x17e81a,_0x470aa3=$dataTroops[_0xbc75a2];if(!_0x470aa3)return'';let _0x2f8b7a='';_0x2f8b7a+=_0x470aa3[_0x543bce(0x320)];for(const _0x14d44d of _0x470aa3['pages']){for(const _0x8edcc2 of _0x14d44d[_0x543bce(0x195)]){[0x6c,0x198]['includes'](_0x8edcc2[_0x543bce(0x52f)])&&(_0x2f8b7a+='\x0a',_0x2f8b7a+=_0x8edcc2[_0x543bce(0x146)][0x0]);}}return _0x2f8b7a;};(VisuMZ['CoreEngine']['Settings'][_0x17e81a(0x51f)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x17e81a(0x1a7)]['Scene_Base_create']=Scene_Base[_0x17e81a(0x44d)]['create'],Scene_Base['prototype'][_0x17e81a(0x6e1)]=function(){const _0x33069d=_0x17e81a;VisuMZ[_0x33069d(0x1a7)]['Scene_Base_create']['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x305)]=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x6d7)],Scene_Map['prototype'][_0x17e81a(0x6d7)]=function(){const _0x7815e6=_0x17e81a;VisuMZ[_0x7815e6(0x1a7)][_0x7815e6(0x305)][_0x7815e6(0x65e)](this),$spriteset=this[_0x7815e6(0x552)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x47d)]=Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x6d7)],Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x6d7)]=function(){const _0x39937d=_0x17e81a;VisuMZ[_0x39937d(0x1a7)][_0x39937d(0x47d)][_0x39937d(0x65e)](this),$spriteset=this[_0x39937d(0x552)];},VisuMZ[_0x17e81a(0x1a7)]['Scene_Base_terminate']=Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x2f8)],Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x2f8)]=function(){const _0xeda4fa=_0x17e81a;VisuMZ['CoreEngine']['Scene_Base_terminate'][_0xeda4fa(0x65e)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x70d)]=BattleManager[_0x17e81a(0x2a6)],BattleManager[_0x17e81a(0x2a6)]=function(_0x1d2b27){const _0x467f34=_0x17e81a;VisuMZ['CoreEngine'][_0x467f34(0x70d)][_0x467f34(0x65e)](this,_0x1d2b27),this['updateBattleVariables']();},BattleManager['updateBattleVariables']=function(){const _0x2d106b=_0x17e81a;$subject=this[_0x2d106b(0x53b)],$targets=this[_0x2d106b(0x83a)],$target=this[_0x2d106b(0xa7)]||this['_targets'][0x0];},$event=null,VisuMZ['CoreEngine'][_0x17e81a(0x585)]=Game_Event[_0x17e81a(0x44d)][_0x17e81a(0x3c9)],Game_Event[_0x17e81a(0x44d)]['start']=function(){const _0x514e7f=_0x17e81a;VisuMZ['CoreEngine'][_0x514e7f(0x585)][_0x514e7f(0x65e)](this),$event=this;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x566)]=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x2a6)],Scene_Map['prototype'][_0x17e81a(0x2a6)]=function(){const _0x5d02d7=_0x17e81a;VisuMZ[_0x5d02d7(0x1a7)][_0x5d02d7(0x566)]['call'](this),$gameMap[_0x5d02d7(0x587)]();},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x587)]=function(){const _0x5e6b47=_0x17e81a;!this[_0x5e6b47(0x3ef)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x532462){const _0x176f5a=_0x17e81a;if($gameTemp)$gameTemp[_0x176f5a(0x550)](_0x532462);});;$onceParallel=function(_0x6724b5,_0x91ca6b){const _0x4bf2c3=_0x17e81a;if(SceneManager['isSceneMap']())SceneManager[_0x4bf2c3(0x116)][_0x4bf2c3(0x318)](_0x6724b5,_0x91ca6b);else{if(SceneManager[_0x4bf2c3(0x732)]()){if(Imported[_0x4bf2c3(0x393)])SceneManager[_0x4bf2c3(0x116)][_0x4bf2c3(0x318)](_0x6724b5);else $gameTemp&&$gameTemp[_0x4bf2c3(0x6d5)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x4bf2c3(0x6d5)]()&&alert(_0x4bf2c3(0x747));}},StorageManager['jsonToZip']=function(_0x3e559c){return new Promise((_0x2b8a76,_0x12d172)=>{try{const _0xfee2dd=pako['deflate'](_0x3e559c,{'to':'string','level':0x1});if(_0xfee2dd['length']>=0xc350){}_0x2b8a76(_0xfee2dd);}catch(_0x554b69){_0x12d172(_0x554b69);}});},TextManager[_0x17e81a(0x20d)]=['','','',_0x17e81a(0x3d4),'','',_0x17e81a(0x58f),'','BACKSPACE',_0x17e81a(0x17a),'','','CLEAR','ENTER',_0x17e81a(0x148),'','SHIFT',_0x17e81a(0x61b),'ALT',_0x17e81a(0x6fb),_0x17e81a(0x6cd),_0x17e81a(0x159),'EISU',_0x17e81a(0x60b),_0x17e81a(0xdc),_0x17e81a(0x1db),'','ESC',_0x17e81a(0x52c),_0x17e81a(0x31a),_0x17e81a(0x553),_0x17e81a(0x5e4),'SPACE',_0x17e81a(0x1b3),_0x17e81a(0x82f),_0x17e81a(0x6e3),_0x17e81a(0x2e1),_0x17e81a(0x327),'UP',_0x17e81a(0x779),_0x17e81a(0x358),_0x17e81a(0x5df),_0x17e81a(0x106),_0x17e81a(0x6d3),'PRINTSCREEN',_0x17e81a(0x69a),_0x17e81a(0x3aa),'','0','1','2','3','4','5','6','7','8','9',_0x17e81a(0x81e),_0x17e81a(0x809),'LESS_THAN','EQUALS','GREATER_THAN',_0x17e81a(0x6ed),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x17e81a(0x182),'',_0x17e81a(0x330),'NUMPAD0',_0x17e81a(0x6bb),'NUMPAD2',_0x17e81a(0x356),_0x17e81a(0x76a),_0x17e81a(0x22e),'NUMPAD6','NUMPAD7',_0x17e81a(0x13b),'NUMPAD9',_0x17e81a(0x158),'ADD','SEPARATOR',_0x17e81a(0x22c),_0x17e81a(0x350),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x17e81a(0x23a),'F11','F12',_0x17e81a(0x129),_0x17e81a(0x23d),_0x17e81a(0x656),_0x17e81a(0x670),_0x17e81a(0xf8),_0x17e81a(0x3f2),_0x17e81a(0x42c),'F20',_0x17e81a(0x461),_0x17e81a(0x705),_0x17e81a(0x235),_0x17e81a(0x4e8),'','','','','','','','',_0x17e81a(0x3cf),_0x17e81a(0x6ac),_0x17e81a(0x7bc),_0x17e81a(0x85d),'WIN_OEM_FJ_TOUROKU',_0x17e81a(0x286),_0x17e81a(0x4d4),'','','','','','','','','',_0x17e81a(0x432),'EXCLAMATION',_0x17e81a(0x47a),_0x17e81a(0x207),_0x17e81a(0x87c),_0x17e81a(0x364),_0x17e81a(0x731),'UNDERSCORE',_0x17e81a(0x3ec),_0x17e81a(0x20e),'ASTERISK',_0x17e81a(0x4dd),_0x17e81a(0x6b2),'HYPHEN_MINUS',_0x17e81a(0x84f),_0x17e81a(0xa6),_0x17e81a(0xab),'','','','',_0x17e81a(0x7d9),_0x17e81a(0x6c6),_0x17e81a(0x753),'','','SEMICOLON','EQUALS',_0x17e81a(0x689),_0x17e81a(0x83d),_0x17e81a(0x1b2),_0x17e81a(0x614),_0x17e81a(0x556),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x17e81a(0x12b),_0x17e81a(0x6a1),_0x17e81a(0x353),_0x17e81a(0x339),'',_0x17e81a(0x285),_0x17e81a(0x678),'',_0x17e81a(0x6a9),_0x17e81a(0x304),'',_0x17e81a(0x4f3),'','',_0x17e81a(0x873),_0x17e81a(0x379),_0x17e81a(0xb8),_0x17e81a(0x573),_0x17e81a(0x391),_0x17e81a(0x1d8),'WIN_OEM_CUSEL',_0x17e81a(0x63d),'WIN_OEM_FINISH',_0x17e81a(0x32f),_0x17e81a(0x34c),'WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x17e81a(0x776),_0x17e81a(0x260),_0x17e81a(0x700),'EREOF','PLAY','ZOOM','',_0x17e81a(0x124),_0x17e81a(0x435),''],TextManager[_0x17e81a(0x7b9)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0xd5)]['OkText'],TextManager[_0x17e81a(0x78c)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0xd5)][_0x17e81a(0x6fa)],TextManager[_0x17e81a(0x7cd)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0xd5)][_0x17e81a(0x567)],VisuMZ[_0x17e81a(0x1a7)]['TextManager_param']=TextManager[_0x17e81a(0x4bb)],TextManager[_0x17e81a(0x4bb)]=function(_0x34b35e){const _0x3a52ac=_0x17e81a;return typeof _0x34b35e===_0x3a52ac(0x44b)?VisuMZ[_0x3a52ac(0x1a7)][_0x3a52ac(0x84a)][_0x3a52ac(0x65e)](this,_0x34b35e):this['paramName'](_0x34b35e);},TextManager['paramName']=function(_0x4284f3){const _0x4672e6=_0x17e81a;_0x4284f3=String(_0x4284f3||'')[_0x4672e6(0x413)]();const _0x10c9a1=VisuMZ[_0x4672e6(0x1a7)][_0x4672e6(0x26d)][_0x4672e6(0x324)];if(_0x4284f3===_0x4672e6(0x677))return $dataSystem[_0x4672e6(0x701)][_0x4672e6(0x4ff)][0x0];if(_0x4284f3===_0x4672e6(0x427))return $dataSystem[_0x4672e6(0x701)]['params'][0x1];if(_0x4284f3===_0x4672e6(0x56a))return $dataSystem['terms']['params'][0x2];if(_0x4284f3===_0x4672e6(0x3db))return $dataSystem[_0x4672e6(0x701)][_0x4672e6(0x4ff)][0x3];if(_0x4284f3===_0x4672e6(0x31f))return $dataSystem[_0x4672e6(0x701)][_0x4672e6(0x4ff)][0x4];if(_0x4284f3==='MDF')return $dataSystem[_0x4672e6(0x701)][_0x4672e6(0x4ff)][0x5];if(_0x4284f3==='AGI')return $dataSystem[_0x4672e6(0x701)]['params'][0x6];if(_0x4284f3===_0x4672e6(0x528))return $dataSystem[_0x4672e6(0x701)]['params'][0x7];if(_0x4284f3===_0x4672e6(0x82d))return _0x10c9a1[_0x4672e6(0x2eb)];if(_0x4284f3===_0x4672e6(0x5b8))return _0x10c9a1[_0x4672e6(0x49d)];if(_0x4284f3===_0x4672e6(0x651))return _0x10c9a1[_0x4672e6(0x2a3)];if(_0x4284f3===_0x4672e6(0x57e))return _0x10c9a1[_0x4672e6(0x1a6)];if(_0x4284f3===_0x4672e6(0x644))return _0x10c9a1[_0x4672e6(0x51c)];if(_0x4284f3===_0x4672e6(0x683))return _0x10c9a1[_0x4672e6(0x6ef)];if(_0x4284f3===_0x4672e6(0x56d))return _0x10c9a1['XParamVocab6'];if(_0x4284f3===_0x4672e6(0x7c8))return _0x10c9a1['XParamVocab7'];if(_0x4284f3===_0x4672e6(0x68f))return _0x10c9a1[_0x4672e6(0x485)];if(_0x4284f3===_0x4672e6(0x467))return _0x10c9a1['XParamVocab9'];if(_0x4284f3==='TGR')return _0x10c9a1['SParamVocab0'];if(_0x4284f3===_0x4672e6(0x4d3))return _0x10c9a1[_0x4672e6(0x86e)];if(_0x4284f3===_0x4672e6(0x39b))return _0x10c9a1[_0x4672e6(0x4a0)];if(_0x4284f3===_0x4672e6(0x86a))return _0x10c9a1[_0x4672e6(0x3fe)];if(_0x4284f3===_0x4672e6(0x878))return _0x10c9a1[_0x4672e6(0x2a0)];if(_0x4284f3===_0x4672e6(0x557))return _0x10c9a1['SParamVocab5'];if(_0x4284f3===_0x4672e6(0x1d9))return _0x10c9a1[_0x4672e6(0x218)];if(_0x4284f3===_0x4672e6(0x134))return _0x10c9a1[_0x4672e6(0x3df)];if(_0x4284f3===_0x4672e6(0x6cc))return _0x10c9a1[_0x4672e6(0x1cf)];if(_0x4284f3===_0x4672e6(0x22f))return _0x10c9a1['SParamVocab9'];if(VisuMZ[_0x4672e6(0x1a7)][_0x4672e6(0x2ec)][_0x4284f3])return VisuMZ['CoreEngine'][_0x4672e6(0x2ec)][_0x4284f3];return'';},TextManager[_0x17e81a(0x777)]=function(_0x529d18){const _0x1baa91=_0x17e81a,_0x3af7e6=Input[_0x1baa91(0x638)]();return _0x3af7e6==='Keyboard'?this[_0x1baa91(0x5fc)](_0x529d18):this['getControllerInputButtonString'](_0x3af7e6,_0x529d18);},TextManager[_0x17e81a(0x5fc)]=function(_0x5581d6){const _0x2998a4=_0x17e81a;let _0x2f2f50=VisuMZ[_0x2998a4(0x1a7)]['Settings']['ButtonAssist']['SplitEscape'];if(!_0x2f2f50){if(_0x5581d6===_0x2998a4(0x42f))_0x5581d6='escape';if(_0x5581d6==='menu')_0x5581d6='escape';}let _0x20b410=[];for(let _0x1d1b34 in Input[_0x2998a4(0x7ac)]){_0x1d1b34=Number(_0x1d1b34);if(_0x1d1b34>=0x60&&_0x1d1b34<=0x69)continue;if([0x12,0x20][_0x2998a4(0x2b0)](_0x1d1b34))continue;_0x5581d6===Input[_0x2998a4(0x7ac)][_0x1d1b34]&&_0x20b410[_0x2998a4(0x189)](_0x1d1b34);}for(let _0x1cd16b=0x0;_0x1cd16b<_0x20b410[_0x2998a4(0x4b4)];_0x1cd16b++){_0x20b410[_0x1cd16b]=TextManager[_0x2998a4(0x20d)][_0x20b410[_0x1cd16b]];}return this[_0x2998a4(0x209)](_0x20b410);},TextManager[_0x17e81a(0x209)]=function(_0x568b46){const _0x41f637=_0x17e81a,_0x29d14c=VisuMZ[_0x41f637(0x1a7)][_0x41f637(0x26d)][_0x41f637(0xd5)],_0x41c7d5=_0x29d14c[_0x41f637(0x371)];let _0x42aec7='';if(_0x568b46[_0x41f637(0x2b0)]('UP'))_0x42aec7='UP';else{if(_0x568b46[_0x41f637(0x2b0)](_0x41f637(0x358)))_0x42aec7=_0x41f637(0x358);else{if(_0x568b46[_0x41f637(0x2b0)](_0x41f637(0x327)))_0x42aec7=_0x41f637(0x327);else _0x568b46[_0x41f637(0x2b0)]('RIGHT')?_0x42aec7='RIGHT':_0x42aec7=_0x568b46['pop']();}}const _0xcac844='Key%1'[_0x41f637(0x51e)](_0x42aec7);return _0x29d14c[_0xcac844]?_0x29d14c[_0xcac844]:_0x41c7d5[_0x41f637(0x51e)](_0x42aec7);},TextManager['getInputMultiButtonStrings']=function(_0x59f8e9,_0xdc97ca){const _0x566a56=_0x17e81a,_0x2b5a29=VisuMZ[_0x566a56(0x1a7)][_0x566a56(0x26d)][_0x566a56(0xd5)],_0xc5c9b1=_0x2b5a29[_0x566a56(0x436)],_0x1e69d9=this[_0x566a56(0x777)](_0x59f8e9),_0x36759d=this[_0x566a56(0x777)](_0xdc97ca);return _0xc5c9b1['format'](_0x1e69d9,_0x36759d);},TextManager[_0x17e81a(0x132)]=function(_0x139842,_0x362cba){const _0x29f391=_0x17e81a,_0xc7b564=_0x139842[_0x29f391(0x565)]()[_0x29f391(0x1b5)](),_0x24d7a6=VisuMZ[_0x29f391(0x1a7)]['ControllerButtons'][_0xc7b564];if(!_0x24d7a6)return this[_0x29f391(0x2e9)](_0x139842,_0x362cba);return _0x24d7a6[_0x362cba]||this['getKeyboardInputButtonString'](_0x139842,_0x362cba);},TextManager[_0x17e81a(0x2e9)]=function(_0xa2e62c,_0x295de5){const _0x43cd58=_0x17e81a,_0x3a832a=_0xa2e62c['toLowerCase']()[_0x43cd58(0x1b5)]();for(const _0x1ebf3b in VisuMZ['CoreEngine']['ControllerMatches']){if(_0x3a832a[_0x43cd58(0x2b0)](_0x1ebf3b)){const _0x4c9806=VisuMZ[_0x43cd58(0x1a7)][_0x43cd58(0x7f4)][_0x1ebf3b],_0x326ec1=VisuMZ[_0x43cd58(0x1a7)]['ControllerButtons'][_0x4c9806];return _0x326ec1[_0x295de5]||this[_0x43cd58(0x5fc)](_0x295de5);}}return this[_0x43cd58(0x5fc)](_0x295de5);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x2d9)]=ColorManager[_0x17e81a(0xcd)],ColorManager[_0x17e81a(0xcd)]=function(){const _0x4d31f5=_0x17e81a;VisuMZ['CoreEngine'][_0x4d31f5(0x2d9)][_0x4d31f5(0x65e)](this),this[_0x4d31f5(0x663)]=this[_0x4d31f5(0x663)]||{};},ColorManager[_0x17e81a(0x6b0)]=function(_0x2a966c,_0x4e1673){const _0x47a691=_0x17e81a;return _0x4e1673=String(_0x4e1673),this[_0x47a691(0x663)]=this[_0x47a691(0x663)]||{},_0x4e1673[_0x47a691(0x6b6)](/#(.*)/i)?this['_colorCache'][_0x2a966c]=_0x47a691(0x21f)[_0x47a691(0x51e)](String(RegExp['$1'])):this[_0x47a691(0x663)][_0x2a966c]=this['textColor'](Number(_0x4e1673)),this[_0x47a691(0x663)][_0x2a966c];},ColorManager[_0x17e81a(0x5cd)]=function(_0xfce70f){const _0x376d03=_0x17e81a;return _0xfce70f=String(_0xfce70f),_0xfce70f[_0x376d03(0x6b6)](/#(.*)/i)?'#%1'[_0x376d03(0x51e)](String(RegExp['$1'])):this[_0x376d03(0x56c)](Number(_0xfce70f));},ColorManager[_0x17e81a(0x6e9)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x523057=_0x17e81a,_0x67e8c9=_0x523057(0x792);this[_0x523057(0x663)]=this[_0x523057(0x663)]||{};if(this[_0x523057(0x663)][_0x67e8c9])return this['_colorCache'][_0x67e8c9];const _0x100cae=VisuMZ[_0x523057(0x1a7)][_0x523057(0x26d)][_0x523057(0x3de)][_0x523057(0x171)];return this[_0x523057(0x6b0)](_0x67e8c9,_0x100cae);},ColorManager[_0x17e81a(0x3ad)]=function(){const _0x2b60f7=_0x17e81a,_0x6dac01=_0x2b60f7(0x807);this[_0x2b60f7(0x663)]=this['_colorCache']||{};if(this[_0x2b60f7(0x663)][_0x6dac01])return this['_colorCache'][_0x6dac01];const _0x3278f2=VisuMZ[_0x2b60f7(0x1a7)][_0x2b60f7(0x26d)]['Color'][_0x2b60f7(0x2bc)];return this[_0x2b60f7(0x6b0)](_0x6dac01,_0x3278f2);},ColorManager[_0x17e81a(0x4f8)]=function(){const _0xb4fc6=_0x17e81a,_0x5dfb6e=_0xb4fc6(0x751);this[_0xb4fc6(0x663)]=this[_0xb4fc6(0x663)]||{};if(this[_0xb4fc6(0x663)][_0x5dfb6e])return this[_0xb4fc6(0x663)][_0x5dfb6e];const _0x50a9ca=VisuMZ['CoreEngine'][_0xb4fc6(0x26d)][_0xb4fc6(0x3de)][_0xb4fc6(0x5bb)];return this['getColorDataFromPluginParameters'](_0x5dfb6e,_0x50a9ca);},ColorManager[_0x17e81a(0x5c0)]=function(){const _0x2f48e3=_0x17e81a,_0x495544=_0x2f48e3(0x1ba);this[_0x2f48e3(0x663)]=this[_0x2f48e3(0x663)]||{};if(this[_0x2f48e3(0x663)][_0x495544])return this[_0x2f48e3(0x663)][_0x495544];const _0x917c11=VisuMZ[_0x2f48e3(0x1a7)][_0x2f48e3(0x26d)]['Color'][_0x2f48e3(0x175)];return this[_0x2f48e3(0x6b0)](_0x495544,_0x917c11);},ColorManager[_0x17e81a(0x756)]=function(){const _0x3df5d4=_0x17e81a,_0x2b13a0=_0x3df5d4(0x311);this[_0x3df5d4(0x663)]=this[_0x3df5d4(0x663)]||{};if(this[_0x3df5d4(0x663)][_0x2b13a0])return this[_0x3df5d4(0x663)][_0x2b13a0];const _0x3018a3=VisuMZ[_0x3df5d4(0x1a7)]['Settings'][_0x3df5d4(0x3de)][_0x3df5d4(0x310)];return this['getColorDataFromPluginParameters'](_0x2b13a0,_0x3018a3);},ColorManager[_0x17e81a(0x534)]=function(){const _0x53542d=_0x17e81a,_0x4c241e=_0x53542d(0x572);this[_0x53542d(0x663)]=this[_0x53542d(0x663)]||{};if(this[_0x53542d(0x663)][_0x4c241e])return this[_0x53542d(0x663)][_0x4c241e];const _0x1b71f6=VisuMZ[_0x53542d(0x1a7)][_0x53542d(0x26d)]['Color'][_0x53542d(0x674)];return this[_0x53542d(0x6b0)](_0x4c241e,_0x1b71f6);},ColorManager[_0x17e81a(0x4dc)]=function(){const _0x25a71c=_0x17e81a,_0x2504a9=_0x25a71c(0x888);this[_0x25a71c(0x663)]=this[_0x25a71c(0x663)]||{};if(this[_0x25a71c(0x663)][_0x2504a9])return this[_0x25a71c(0x663)][_0x2504a9];const _0x397564=VisuMZ[_0x25a71c(0x1a7)][_0x25a71c(0x26d)][_0x25a71c(0x3de)]['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x2504a9,_0x397564);},ColorManager[_0x17e81a(0xad)]=function(){const _0x7de513=_0x17e81a,_0x42361e=_0x7de513(0x5bf);this[_0x7de513(0x663)]=this['_colorCache']||{};if(this['_colorCache'][_0x42361e])return this[_0x7de513(0x663)][_0x42361e];const _0x578181=VisuMZ['CoreEngine']['Settings'][_0x7de513(0x3de)]['ColorMPGauge1'];return this['getColorDataFromPluginParameters'](_0x42361e,_0x578181);},ColorManager['mpGaugeColor2']=function(){const _0x1a4be0=_0x17e81a,_0x1edc72='_stored_mpGaugeColor2';this[_0x1a4be0(0x663)]=this[_0x1a4be0(0x663)]||{};if(this[_0x1a4be0(0x663)][_0x1edc72])return this[_0x1a4be0(0x663)][_0x1edc72];const _0x22228c=VisuMZ['CoreEngine'][_0x1a4be0(0x26d)][_0x1a4be0(0x3de)][_0x1a4be0(0x5f9)];return this[_0x1a4be0(0x6b0)](_0x1edc72,_0x22228c);},ColorManager[_0x17e81a(0x58e)]=function(){const _0xc3dcfe=_0x17e81a,_0x705514=_0xc3dcfe(0x7e5);this[_0xc3dcfe(0x663)]=this[_0xc3dcfe(0x663)]||{};if(this['_colorCache'][_0x705514])return this[_0xc3dcfe(0x663)][_0x705514];const _0x104af6=VisuMZ[_0xc3dcfe(0x1a7)][_0xc3dcfe(0x26d)]['Color']['ColorMPCost'];return this[_0xc3dcfe(0x6b0)](_0x705514,_0x104af6);},ColorManager['powerUpColor']=function(){const _0xef66b6=_0x17e81a,_0x400398='_stored_powerUpColor';this[_0xef66b6(0x663)]=this['_colorCache']||{};if(this[_0xef66b6(0x663)][_0x400398])return this[_0xef66b6(0x663)][_0x400398];const _0x43fb54=VisuMZ['CoreEngine'][_0xef66b6(0x26d)][_0xef66b6(0x3de)][_0xef66b6(0x23e)];return this[_0xef66b6(0x6b0)](_0x400398,_0x43fb54);},ColorManager[_0x17e81a(0x4c8)]=function(){const _0x1f6c74=_0x17e81a,_0x259556='_stored_powerDownColor';this[_0x1f6c74(0x663)]=this[_0x1f6c74(0x663)]||{};if(this['_colorCache'][_0x259556])return this[_0x1f6c74(0x663)][_0x259556];const _0x8db833=VisuMZ['CoreEngine']['Settings']['Color']['ColorPowerDown'];return this[_0x1f6c74(0x6b0)](_0x259556,_0x8db833);},ColorManager[_0x17e81a(0x605)]=function(){const _0x58aab8=_0x17e81a,_0x292d99=_0x58aab8(0x1ff);this[_0x58aab8(0x663)]=this[_0x58aab8(0x663)]||{};if(this[_0x58aab8(0x663)][_0x292d99])return this['_colorCache'][_0x292d99];const _0x476eab=VisuMZ['CoreEngine']['Settings'][_0x58aab8(0x3de)][_0x58aab8(0x6c9)];return this[_0x58aab8(0x6b0)](_0x292d99,_0x476eab);},ColorManager[_0x17e81a(0x45c)]=function(){const _0x4d3dad=_0x17e81a,_0x35a1b2='_stored_ctGaugeColor2';this[_0x4d3dad(0x663)]=this[_0x4d3dad(0x663)]||{};if(this['_colorCache'][_0x35a1b2])return this['_colorCache'][_0x35a1b2];const _0x4997df=VisuMZ['CoreEngine'][_0x4d3dad(0x26d)]['Color']['ColorCTGauge2'];return this[_0x4d3dad(0x6b0)](_0x35a1b2,_0x4997df);},ColorManager[_0x17e81a(0x4c2)]=function(){const _0x19b4e2=_0x17e81a,_0x432f4f='_stored_tpGaugeColor1';this[_0x19b4e2(0x663)]=this['_colorCache']||{};if(this['_colorCache'][_0x432f4f])return this[_0x19b4e2(0x663)][_0x432f4f];const _0x3b5b1b=VisuMZ['CoreEngine'][_0x19b4e2(0x26d)][_0x19b4e2(0x3de)][_0x19b4e2(0x692)];return this['getColorDataFromPluginParameters'](_0x432f4f,_0x3b5b1b);},ColorManager[_0x17e81a(0x874)]=function(){const _0x41b328=_0x17e81a,_0x4ff436=_0x41b328(0x7fe);this['_colorCache']=this[_0x41b328(0x663)]||{};if(this['_colorCache'][_0x4ff436])return this['_colorCache'][_0x4ff436];const _0x3f0f16=VisuMZ[_0x41b328(0x1a7)]['Settings']['Color'][_0x41b328(0x78f)];return this[_0x41b328(0x6b0)](_0x4ff436,_0x3f0f16);},ColorManager['tpCostColor']=function(){const _0x55dc95=_0x17e81a,_0x59db38=_0x55dc95(0x4ec);this[_0x55dc95(0x663)]=this['_colorCache']||{};if(this[_0x55dc95(0x663)][_0x59db38])return this[_0x55dc95(0x663)][_0x59db38];const _0xc79f2e=VisuMZ[_0x55dc95(0x1a7)]['Settings'][_0x55dc95(0x3de)][_0x55dc95(0x596)];return this['getColorDataFromPluginParameters'](_0x59db38,_0xc79f2e);},ColorManager[_0x17e81a(0x68c)]=function(){const _0x1cf62d=_0x17e81a,_0x809eda=_0x1cf62d(0x76d);this['_colorCache']=this['_colorCache']||{};if(this[_0x1cf62d(0x663)][_0x809eda])return this[_0x1cf62d(0x663)][_0x809eda];const _0x537489=VisuMZ[_0x1cf62d(0x1a7)][_0x1cf62d(0x26d)]['Color']['ColorTPCost'];return this[_0x1cf62d(0x6b0)](_0x809eda,_0x537489);},ColorManager['expGaugeColor1']=function(){const _0x28c405=_0x17e81a,_0x3b5bb7=_0x28c405(0x45a);this['_colorCache']=this['_colorCache']||{};if(this[_0x28c405(0x663)][_0x3b5bb7])return this[_0x28c405(0x663)][_0x3b5bb7];const _0x41123b=VisuMZ[_0x28c405(0x1a7)][_0x28c405(0x26d)][_0x28c405(0x3de)][_0x28c405(0x4fc)];return this[_0x28c405(0x6b0)](_0x3b5bb7,_0x41123b);},ColorManager[_0x17e81a(0x75e)]=function(){const _0x1842bf=_0x17e81a,_0x24b7fa=_0x1842bf(0x151);this['_colorCache']=this[_0x1842bf(0x663)]||{};if(this['_colorCache'][_0x24b7fa])return this[_0x1842bf(0x663)][_0x24b7fa];const _0x247bc7=VisuMZ[_0x1842bf(0x1a7)]['Settings']['Color']['ColorExpGauge2'];return this['getColorDataFromPluginParameters'](_0x24b7fa,_0x247bc7);},ColorManager[_0x17e81a(0x301)]=function(){const _0x15b4a2=_0x17e81a,_0x2aabbe=_0x15b4a2(0x3b8);this[_0x15b4a2(0x663)]=this[_0x15b4a2(0x663)]||{};if(this[_0x15b4a2(0x663)][_0x2aabbe])return this[_0x15b4a2(0x663)][_0x2aabbe];const _0xefb25d=VisuMZ[_0x15b4a2(0x1a7)]['Settings'][_0x15b4a2(0x3de)][_0x15b4a2(0x1a5)];return this['getColorDataFromPluginParameters'](_0x2aabbe,_0xefb25d);},ColorManager[_0x17e81a(0x259)]=function(){const _0x4540a1=_0x17e81a,_0x382ff7=_0x4540a1(0x126);this[_0x4540a1(0x663)]=this[_0x4540a1(0x663)]||{};if(this[_0x4540a1(0x663)][_0x382ff7])return this[_0x4540a1(0x663)][_0x382ff7];const _0x5007fc=VisuMZ[_0x4540a1(0x1a7)][_0x4540a1(0x26d)]['Color'][_0x4540a1(0x62f)];return this['getColorDataFromPluginParameters'](_0x382ff7,_0x5007fc);},ColorManager[_0x17e81a(0x3d7)]=function(_0x5b2cc5){const _0x108bac=_0x17e81a;return VisuMZ[_0x108bac(0x1a7)][_0x108bac(0x26d)][_0x108bac(0x3de)][_0x108bac(0x1e4)][_0x108bac(0x65e)](this,_0x5b2cc5);},ColorManager[_0x17e81a(0x80f)]=function(_0x4bddb3){const _0x30a690=_0x17e81a;return VisuMZ[_0x30a690(0x1a7)][_0x30a690(0x26d)][_0x30a690(0x3de)][_0x30a690(0x294)][_0x30a690(0x65e)](this,_0x4bddb3);},ColorManager[_0x17e81a(0x37a)]=function(_0x2bc457){const _0x5158d4=_0x17e81a;return VisuMZ[_0x5158d4(0x1a7)][_0x5158d4(0x26d)][_0x5158d4(0x3de)][_0x5158d4(0x409)][_0x5158d4(0x65e)](this,_0x2bc457);},ColorManager[_0x17e81a(0x464)]=function(_0x5072a6){const _0xdd91f4=_0x17e81a;return VisuMZ['CoreEngine'][_0xdd91f4(0x26d)][_0xdd91f4(0x3de)][_0xdd91f4(0x7d4)][_0xdd91f4(0x65e)](this,_0x5072a6);},ColorManager[_0x17e81a(0x524)]=function(_0x4099c4){const _0x439595=_0x17e81a;return VisuMZ['CoreEngine'][_0x439595(0x26d)][_0x439595(0x3de)][_0x439595(0x483)][_0x439595(0x65e)](this,_0x4099c4);},ColorManager['outlineColor']=function(){const _0x2f72c4=_0x17e81a;return VisuMZ[_0x2f72c4(0x1a7)][_0x2f72c4(0x26d)][_0x2f72c4(0x3de)]['OutlineColor'];},ColorManager['outlineColorDmg']=function(){const _0x52f20=_0x17e81a;return VisuMZ[_0x52f20(0x1a7)][_0x52f20(0x26d)][_0x52f20(0x3de)][_0x52f20(0x641)]||_0x52f20(0x86f);},ColorManager[_0x17e81a(0x80b)]=function(){const _0x5719b0=_0x17e81a;return VisuMZ[_0x5719b0(0x1a7)][_0x5719b0(0x26d)][_0x5719b0(0x3de)][_0x5719b0(0x2c4)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x17e81a(0x633)]=function(){const _0x508079=_0x17e81a;return VisuMZ[_0x508079(0x1a7)][_0x508079(0x26d)][_0x508079(0x3de)][_0x508079(0x58c)];},ColorManager[_0x17e81a(0x81c)]=function(){const _0x4586fc=_0x17e81a;return VisuMZ[_0x4586fc(0x1a7)][_0x4586fc(0x26d)][_0x4586fc(0x3de)]['DimColor2'];},ColorManager[_0x17e81a(0x706)]=function(){const _0x48182d=_0x17e81a;return VisuMZ['CoreEngine'][_0x48182d(0x26d)][_0x48182d(0x3de)][_0x48182d(0x7e8)];},ColorManager[_0x17e81a(0x1e3)]=function(){const _0x47b130=_0x17e81a;return VisuMZ[_0x47b130(0x1a7)][_0x47b130(0x26d)]['Color'][_0x47b130(0x571)];},SceneManager[_0x17e81a(0x64a)]=[],SceneManager['isSceneBattle']=function(){const _0x433813=_0x17e81a;return this[_0x433813(0x116)]&&this[_0x433813(0x116)][_0x433813(0x666)]===Scene_Battle;},SceneManager[_0x17e81a(0x26e)]=function(){const _0x54d323=_0x17e81a;return this[_0x54d323(0x116)]&&this[_0x54d323(0x116)]['constructor']===Scene_Map;},SceneManager[_0x17e81a(0x835)]=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x17e81a(0x83e)]=SceneManager[_0x17e81a(0x103)],SceneManager['initialize']=function(){const _0x246613=_0x17e81a;VisuMZ[_0x246613(0x1a7)][_0x246613(0x83e)]['call'](this),this[_0x246613(0x47e)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x20c)]=SceneManager[_0x17e81a(0x5aa)],SceneManager[_0x17e81a(0x5aa)]=function(_0x61c4a4){const _0x4ceab6=_0x17e81a;if($gameTemp)this[_0x4ceab6(0x520)](_0x61c4a4);VisuMZ['CoreEngine'][_0x4ceab6(0x20c)][_0x4ceab6(0x65e)](this,_0x61c4a4);},SceneManager[_0x17e81a(0x520)]=function(_0x318148){const _0x57fa76=_0x17e81a;if(!_0x318148[_0x57fa76(0x7f6)]&&!_0x318148[_0x57fa76(0x6fc)])switch(_0x318148['keyCode']){case 0x52:this[_0x57fa76(0x600)]();break;case 0x54:this[_0x57fa76(0x515)]();break;case 0x75:this[_0x57fa76(0x785)]();break;case 0x76:if(Input[_0x57fa76(0x197)](_0x57fa76(0x1bb))||Input[_0x57fa76(0x197)]('ctrl'))return;this[_0x57fa76(0x15f)]();break;}else{if(_0x318148[_0x57fa76(0x7f6)]){let _0x37383f=_0x318148[_0x57fa76(0x3c5)];if(_0x37383f>=0x31&&_0x37383f<=0x39){const _0x561343=_0x37383f-0x30;return SceneManager['playtestQuickLoad'](_0x561343);}else{if(_0x37383f>=0x61&&_0x37383f<=0x69){const _0x28ff07=_0x37383f-0x60;return SceneManager[_0x57fa76(0x34e)](_0x28ff07);}}}}},SceneManager['playTestF6']=function(){const _0x174dca=_0x17e81a;if($gameTemp[_0x174dca(0x6d5)]()&&VisuMZ[_0x174dca(0x1a7)][_0x174dca(0x26d)][_0x174dca(0x51f)][_0x174dca(0xaa)]){ConfigManager[_0x174dca(0x682)]!==0x0?(ConfigManager[_0x174dca(0x1f4)]=0x0,ConfigManager[_0x174dca(0x389)]=0x0,ConfigManager[_0x174dca(0x6c3)]=0x0,ConfigManager[_0x174dca(0x682)]=0x0):(ConfigManager[_0x174dca(0x1f4)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x174dca(0x6c3)]=0x64,ConfigManager[_0x174dca(0x682)]=0x64);ConfigManager['save']();if(this[_0x174dca(0x116)]['constructor']===Scene_Options){if(this['_scene'][_0x174dca(0x526)])this[_0x174dca(0x116)][_0x174dca(0x526)][_0x174dca(0x208)]();if(this[_0x174dca(0x116)]['_listWindow'])this[_0x174dca(0x116)][_0x174dca(0x9f)][_0x174dca(0x208)]();}}},SceneManager[_0x17e81a(0x15f)]=function(){const _0x12a661=_0x17e81a;$gameTemp[_0x12a661(0x6d5)]()&&VisuMZ[_0x12a661(0x1a7)][_0x12a661(0x26d)][_0x12a661(0x51f)][_0x12a661(0x3f6)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x12a661(0x6f3)]);},SceneManager[_0x17e81a(0x600)]=function(){const _0x11f739=_0x17e81a;if(!VisuMZ[_0x11f739(0x1a7)][_0x11f739(0x26d)]['QoL'][_0x11f739(0x773)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x11f739(0x732)]())return;if(!Input['isPressed'](_0x11f739(0x1bb)))return;for(const _0x3ae0ac of $gameParty[_0x11f739(0x424)]()){if(!_0x3ae0ac)continue;_0x3ae0ac[_0x11f739(0x694)]();}},SceneManager[_0x17e81a(0x515)]=function(){const _0x2a5c91=_0x17e81a;if(!VisuMZ[_0x2a5c91(0x1a7)]['Settings'][_0x2a5c91(0x51f)][_0x2a5c91(0x11f)])return;if(!$gameTemp[_0x2a5c91(0x6d5)]())return;if(!SceneManager[_0x2a5c91(0x732)]())return;if(!Input[_0x2a5c91(0x197)]('shift'))return;for(const _0x5934c6 of $gameParty[_0x2a5c91(0x424)]()){if(!_0x5934c6)continue;_0x5934c6[_0x2a5c91(0x10f)](_0x5934c6[_0x2a5c91(0x82a)]());}},SceneManager[_0x17e81a(0x34e)]=function(_0x4e777a){const _0x46cbaf=_0x17e81a;if(!$gameTemp[_0x46cbaf(0x6d5)]())return;if(!DataManager[_0x46cbaf(0xdf)](_0x4e777a))return;if(!(VisuMZ[_0x46cbaf(0x1a7)][_0x46cbaf(0x26d)][_0x46cbaf(0x51f)]['CtrlQuickLoad']??!![]))return;this[_0x46cbaf(0x189)](Scene_QuickLoad),this['prepareNextScene'](_0x4e777a);},SceneManager['initVisuMZCoreEngine']=function(){const _0x54c940=_0x17e81a;this['_sideButtonLayout']=![],this[_0x54c940(0x824)]=!VisuMZ[_0x54c940(0x1a7)]['Settings']['UI'][_0x54c940(0x35a)];},SceneManager[_0x17e81a(0x40f)]=function(_0x49055c){const _0x15f36d=_0x17e81a;VisuMZ['CoreEngine'][_0x15f36d(0x26d)]['UI'][_0x15f36d(0x123)]&&(this['_sideButtonLayout']=_0x49055c);},SceneManager['isSideButtonLayout']=function(){const _0x3f9c47=_0x17e81a;return this[_0x3f9c47(0x6e2)];},SceneManager[_0x17e81a(0x1ea)]=function(){const _0x5d5193=_0x17e81a;return this[_0x5d5193(0x824)];},SceneManager[_0x17e81a(0x7c9)]=function(){const _0x2701a1=_0x17e81a;return this[_0x2701a1(0x1ea)]()||this[_0x2701a1(0x440)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x198)]=SceneManager['isGameActive'],SceneManager[_0x17e81a(0x5a9)]=function(){const _0x35ddc3=_0x17e81a;return VisuMZ[_0x35ddc3(0x1a7)]['Settings'][_0x35ddc3(0x51f)][_0x35ddc3(0x365)]?VisuMZ[_0x35ddc3(0x1a7)]['SceneManager_isGameActive'][_0x35ddc3(0x65e)](this):!![];},SceneManager[_0x17e81a(0x7c7)]=function(_0x54d61f){const _0x27af53=_0x17e81a;if(_0x54d61f instanceof Error)this[_0x27af53(0x32c)](_0x54d61f);else _0x54d61f instanceof Array&&_0x54d61f[0x0]===_0x27af53(0x59b)?this[_0x27af53(0x7a1)](_0x54d61f):this[_0x27af53(0x746)](_0x54d61f);this[_0x27af53(0x4d0)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x43f)]=BattleManager['processEscape'],BattleManager['processEscape']=function(){const _0x308c75=_0x17e81a;return VisuMZ[_0x308c75(0x1a7)][_0x308c75(0x26d)][_0x308c75(0x51f)][_0x308c75(0xb6)]?this[_0x308c75(0x833)]():VisuMZ[_0x308c75(0x1a7)][_0x308c75(0x43f)][_0x308c75(0x65e)](this);},BattleManager['processAlwaysEscape']=function(){const _0x6cdf7b=_0x17e81a;return $gameParty['performEscape'](),SoundManager[_0x6cdf7b(0x1b4)](),this[_0x6cdf7b(0x532)](),!![];},BattleManager['isTpb']=function(){const _0x440717=_0x17e81a;return $gameSystem[_0x440717(0x5dd)]()>=0x1;},BattleManager[_0x17e81a(0xbf)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x268)]=Game_Temp[_0x17e81a(0x44d)][_0x17e81a(0x103)],Game_Temp['prototype'][_0x17e81a(0x103)]=function(){const _0x43daea=_0x17e81a;VisuMZ[_0x43daea(0x1a7)][_0x43daea(0x268)][_0x43daea(0x65e)](this),this[_0x43daea(0x265)](),this[_0x43daea(0x7ee)](),this[_0x43daea(0x6ff)]();},Game_Temp[_0x17e81a(0x44d)]['forceOutOfPlaytest']=function(){const _0x20f896=_0x17e81a;VisuMZ[_0x20f896(0x1a7)][_0x20f896(0x26d)][_0x20f896(0x51f)][_0x20f896(0x597)]&&(this[_0x20f896(0x555)]=![]);},Game_Temp[_0x17e81a(0x44d)]['setLastPluginCommandInterpreter']=function(_0x24aedd){const _0x229926=_0x17e81a;this[_0x229926(0x249)]=_0x24aedd;},Game_Temp[_0x17e81a(0x44d)]['getLastPluginCommandInterpreter']=function(){const _0x12f8f4=_0x17e81a;return this[_0x12f8f4(0x249)];},Game_Temp[_0x17e81a(0x44d)][_0x17e81a(0x200)]=function(){const _0x49278e=_0x17e81a;this[_0x49278e(0x29d)]=undefined,this[_0x49278e(0x2e2)]=undefined,this[_0x49278e(0x78e)]=undefined;},Game_Temp['prototype'][_0x17e81a(0x5ef)]=function(_0x32bbf7){const _0x27a450=_0x17e81a;$gameMap&&$dataMap&&$dataMap[_0x27a450(0x176)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x27a450(0x176)]);const _0x238ab3=$dataTroops[_0x32bbf7];if(_0x238ab3){let _0x206734=DataManager[_0x27a450(0x2f2)](_0x238ab3['id']);this[_0x27a450(0xe3)](_0x206734);}},Game_Temp[_0x17e81a(0x44d)][_0x17e81a(0xe3)]=function(_0x376f4a){const _0x14f9aa=_0x17e81a;if(!_0x376f4a)return;if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x14f9aa(0x29d)]='FV';else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x14f9aa(0x29d)]='SV';else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2dde5a=String(RegExp['$1']);if(_0x2dde5a[_0x14f9aa(0x6b6)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x14f9aa(0x29d)]='FV';else _0x2dde5a[_0x14f9aa(0x6b6)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x14f9aa(0x29d)]='SV');}}}if(_0x376f4a['match'](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x14f9aa(0x2e2)]=0x1;else{if(_0x376f4a['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x14f9aa(0x2e2)]=0x2;else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:TPB|ATB)>/i))this[_0x14f9aa(0x2e2)]=0x2;else{if(_0x376f4a['match'](/<(?:CTB)>/i))Imported[_0x14f9aa(0x813)]&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x2e0));else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x14f9aa(0x2e2)]='STB');else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:BTB)>/i))Imported[_0x14f9aa(0x7a2)]&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x7f5));else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:FTB)>/i))Imported[_0x14f9aa(0x5b6)]&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x1c3));else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:OTB)>/i))Imported[_0x14f9aa(0x65a)]&&(this[_0x14f9aa(0x2e2)]='OTB');else{if(_0x376f4a['match'](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x772));else{if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this['_forcedBattleSys']=_0x14f9aa(0x7fa));else{if(_0x376f4a['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x596e0e=String(RegExp['$1']);if(_0x596e0e[_0x14f9aa(0x6b6)](/DTB/i))this[_0x14f9aa(0x2e2)]=0x0;else{if(_0x596e0e[_0x14f9aa(0x6b6)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x14f9aa(0x2e2)]=0x1;else{if(_0x596e0e[_0x14f9aa(0x6b6)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x14f9aa(0x2e2)]=0x2;else{if(_0x596e0e['match'](/CTB/i))Imported[_0x14f9aa(0x813)]&&(this['_forcedBattleSys']=_0x14f9aa(0x2e0));else{if(_0x596e0e['match'](/STB/i))Imported[_0x14f9aa(0x2e4)]&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x657));else{if(_0x596e0e[_0x14f9aa(0x6b6)](/BTB/i))Imported[_0x14f9aa(0x7a2)]&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x7f5));else{if(_0x596e0e['match'](/FTB/i))Imported[_0x14f9aa(0x5b6)]&&(this[_0x14f9aa(0x2e2)]='FTB');else{if(_0x596e0e[_0x14f9aa(0x6b6)](/OTB/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x662));else{if(_0x596e0e[_0x14f9aa(0x6b6)](/ETB/i))Imported[_0x14f9aa(0x577)]&&(this[_0x14f9aa(0x2e2)]=_0x14f9aa(0x772));else _0x596e0e['match'](/PTB/i)&&(Imported[_0x14f9aa(0x531)]&&(this['_forcedBattleSys']=_0x14f9aa(0x7fa)));}}}}}}}}}}}}}}}}}}}}if(_0x376f4a[_0x14f9aa(0x6b6)](/<(?:|BATTLE )GRID>/i))this['_forcedBattleGridSystem']=!![];else _0x376f4a[_0x14f9aa(0x6b6)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x14f9aa(0x78e)]=![]);},Game_Temp[_0x17e81a(0x44d)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp['prototype'][_0x17e81a(0x864)]=function(_0x2a831d,_0x2079b8,_0x5aa002,_0xd5eb28){const _0x24458a=_0x17e81a;if(!this[_0x24458a(0x149)]())return;_0x5aa002=_0x5aa002||![],_0xd5eb28=_0xd5eb28||![];if($dataAnimations[_0x2079b8]){const _0xaa8cf1={'targets':_0x2a831d,'animationId':_0x2079b8,'mirror':_0x5aa002,'mute':_0xd5eb28};this[_0x24458a(0x2ff)][_0x24458a(0x189)](_0xaa8cf1);for(const _0x3e3c8c of _0x2a831d){_0x3e3c8c[_0x24458a(0x1d3)]&&_0x3e3c8c['startAnimation']();}}},Game_Temp['prototype'][_0x17e81a(0x149)]=function(){return!![];},Game_Temp['prototype'][_0x17e81a(0x49e)]=function(){const _0x2ca083=_0x17e81a;return this[_0x2ca083(0x2ff)][_0x2ca083(0x1bb)]();},Game_Temp['prototype'][_0x17e81a(0x6ff)]=function(){const _0x5e10e1=_0x17e81a;this[_0x5e10e1(0x78b)]=[];},Game_Temp[_0x17e81a(0x44d)][_0x17e81a(0x445)]=function(_0xf20dc7,_0x3fbee8,_0x2a4c6d,_0x359e14,_0x52534c){const _0x136038=_0x17e81a;if(!this[_0x136038(0x7b8)]())return;_0x359e14=_0x359e14||![],_0x52534c=_0x52534c||![];if($dataAnimations[_0x2a4c6d]){const _0x2702d7={'x':_0xf20dc7,'y':_0x3fbee8,'animationId':_0x2a4c6d,'mirror':_0x359e14,'mute':_0x52534c};this['_pointAnimationQueue'][_0x136038(0x189)](_0x2702d7);}},Game_Temp[_0x17e81a(0x44d)][_0x17e81a(0x7b8)]=function(){return!![];},Game_Temp[_0x17e81a(0x44d)]['retrievePointAnimation']=function(){const _0xbac096=_0x17e81a;return this['_pointAnimationQueue'][_0xbac096(0x1bb)]();},VisuMZ[_0x17e81a(0x1a7)]['Game_System_initialize']=Game_System[_0x17e81a(0x44d)][_0x17e81a(0x103)],Game_System[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(){const _0x2571bf=_0x17e81a;VisuMZ[_0x2571bf(0x1a7)][_0x2571bf(0x4b6)]['call'](this),this[_0x2571bf(0xc7)]();},Game_System[_0x17e81a(0x44d)][_0x17e81a(0xc7)]=function(){const _0x35a63e=_0x17e81a;this[_0x35a63e(0x246)]={'SideView':$dataSystem[_0x35a63e(0x402)],'BattleSystem':this[_0x35a63e(0x26f)](),'FontSize':$dataSystem[_0x35a63e(0x611)][_0x35a63e(0x296)],'Padding':0xc};},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x216)]=function(){const _0x45891a=_0x17e81a;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x45891a(0x246)]===undefined)this['initCoreEngine']();if(this[_0x45891a(0x246)][_0x45891a(0x6f8)]===undefined)this[_0x45891a(0xc7)]();return this[_0x45891a(0x246)][_0x45891a(0x6f8)];},Game_System[_0x17e81a(0x44d)]['setSideView']=function(_0x2c16bf){const _0x8f69e4=_0x17e81a;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x8f69e4(0x246)][_0x8f69e4(0x6f8)]===undefined)this[_0x8f69e4(0xc7)]();this[_0x8f69e4(0x246)][_0x8f69e4(0x6f8)]=_0x2c16bf;},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x576)]=function(){const _0x23a9d5=_0x17e81a;if(this[_0x23a9d5(0x246)]===undefined)this[_0x23a9d5(0xc7)]();this[_0x23a9d5(0x246)][_0x23a9d5(0x31d)]=this[_0x23a9d5(0x26f)]();},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x26f)]=function(){const _0x53308a=_0x17e81a,_0x31c1da=(VisuMZ[_0x53308a(0x1a7)][_0x53308a(0x26d)][_0x53308a(0x31d)]||'DATABASE')[_0x53308a(0x413)]()[_0x53308a(0x1b5)]();return VisuMZ['CoreEngine'][_0x53308a(0x715)](_0x31c1da);},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x5dd)]=function(){const _0x1b81f6=_0x17e81a;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x1b81f6(0x246)]===undefined)this[_0x1b81f6(0xc7)]();if(this[_0x1b81f6(0x246)][_0x1b81f6(0x31d)]===undefined)this[_0x1b81f6(0x576)]();return this[_0x1b81f6(0x246)][_0x1b81f6(0x31d)];},Game_System['prototype']['setBattleSystem']=function(_0x1234f8){const _0x12cbc8=_0x17e81a;if(this[_0x12cbc8(0x246)]===undefined)this[_0x12cbc8(0xc7)]();if(this['_CoreEngineSettings'][_0x12cbc8(0x31d)]===undefined)this[_0x12cbc8(0x576)]();this[_0x12cbc8(0x246)][_0x12cbc8(0x31d)]=_0x1234f8;},Game_System[_0x17e81a(0x44d)]['mainFontSize']=function(){const _0x3935bb=_0x17e81a;if(this[_0x3935bb(0x246)]===undefined)this[_0x3935bb(0xc7)]();if(this[_0x3935bb(0x246)][_0x3935bb(0x790)]===undefined)this[_0x3935bb(0xc7)]();return this['_CoreEngineSettings'][_0x3935bb(0x790)];},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x101)]=function(_0x4ce81f){const _0x3ce9c6=_0x17e81a;if(this[_0x3ce9c6(0x246)]===undefined)this[_0x3ce9c6(0xc7)]();if(this[_0x3ce9c6(0x246)]['TimeProgress']===undefined)this[_0x3ce9c6(0xc7)]();this[_0x3ce9c6(0x246)][_0x3ce9c6(0x790)]=_0x4ce81f;},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x73e)]=function(){const _0xe7a10d=_0x17e81a;if(this[_0xe7a10d(0x246)]===undefined)this[_0xe7a10d(0xc7)]();if(this[_0xe7a10d(0x246)][_0xe7a10d(0x56e)]===undefined)this[_0xe7a10d(0xc7)]();return this[_0xe7a10d(0x246)]['Padding'];},Game_System[_0x17e81a(0x44d)][_0x17e81a(0x328)]=function(_0x8a4afd){const _0x488064=_0x17e81a;if(this[_0x488064(0x246)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x488064(0x363)]===undefined)this[_0x488064(0xc7)]();this[_0x488064(0x246)][_0x488064(0x56e)]=_0x8a4afd;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x688)]=Game_Screen['prototype'][_0x17e81a(0x103)],Game_Screen[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(){const _0x2f334d=_0x17e81a;VisuMZ[_0x2f334d(0x1a7)][_0x2f334d(0x688)][_0x2f334d(0x65e)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x17e81a(0x44d)]['initCoreEngineScreenShake']=function(){const _0x5b9647=_0x17e81a,_0xed88dd=VisuMZ['CoreEngine'][_0x5b9647(0x26d)][_0x5b9647(0x612)];this[_0x5b9647(0x4d1)]=_0xed88dd?.[_0x5b9647(0x73c)]||_0x5b9647(0x59d);},Game_Screen[_0x17e81a(0x44d)]['getCoreEngineScreenShakeStyle']=function(){const _0x539785=_0x17e81a;if(this['_coreEngineShakeStyle']===undefined)this[_0x539785(0x6c5)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x17e81a(0x44d)][_0x17e81a(0x516)]=function(_0x4e56e6){const _0x2b267e=_0x17e81a;if(this[_0x2b267e(0x4d1)]===undefined)this[_0x2b267e(0x6c5)]();this[_0x2b267e(0x4d1)]=_0x4e56e6[_0x2b267e(0x565)]()[_0x2b267e(0x1b5)]();},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x76c)]=function(){const _0x5a6778=_0x17e81a;if($gameParty['inBattle']())return![];return this[_0x5a6778(0x575)]()&&this[_0x5a6778(0x575)]()[_0x5a6778(0x578)](0x0)==='!';},Game_Picture['prototype'][_0x17e81a(0x575)]=function(){const _0x1df57a=_0x17e81a;return this[_0x1df57a(0x5ff)][_0x1df57a(0x34b)]('/')[_0x1df57a(0x273)]();},VisuMZ['CoreEngine'][_0x17e81a(0x414)]=Game_Picture[_0x17e81a(0x44d)]['x'],Game_Picture[_0x17e81a(0x44d)]['x']=function(){const _0x36675e=_0x17e81a;return this[_0x36675e(0x76c)]()?this[_0x36675e(0x360)]():VisuMZ[_0x36675e(0x1a7)][_0x36675e(0x414)][_0x36675e(0x65e)](this);},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x360)]=function(){const _0x10e33e=_0x17e81a,_0x354f1f=$gameMap[_0x10e33e(0x825)]()*$gameMap[_0x10e33e(0x7b6)]();return(this['_x']-_0x354f1f)*$gameScreen['zoomScale']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x1c5)]=Game_Picture[_0x17e81a(0x44d)]['y'],Game_Picture[_0x17e81a(0x44d)]['y']=function(){const _0x240539=_0x17e81a;return this[_0x240539(0x76c)]()?this[_0x240539(0x863)]():VisuMZ['CoreEngine'][_0x240539(0x1c5)][_0x240539(0x65e)](this);},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x863)]=function(){const _0x36d008=_0x17e81a,_0x1c2d0e=$gameMap[_0x36d008(0x83b)]()*$gameMap[_0x36d008(0x57b)]();return(this['_y']-_0x1c2d0e)*$gameScreen[_0x36d008(0x156)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3ac)]=Game_Picture[_0x17e81a(0x44d)]['scaleX'],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x7df)]=function(){const _0x13f077=_0x17e81a;let _0x4a4975=VisuMZ['CoreEngine'][_0x13f077(0x3ac)][_0x13f077(0x65e)](this);return this['isMapScrollLinked']()&&(_0x4a4975*=$gameScreen[_0x13f077(0x156)]()),_0x4a4975;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x15d)]=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x26c)],Game_Picture['prototype'][_0x17e81a(0x26c)]=function(){const _0x3645e9=_0x17e81a;let _0x432781=VisuMZ[_0x3645e9(0x1a7)][_0x3645e9(0x15d)][_0x3645e9(0x65e)](this);return this[_0x3645e9(0x76c)]()&&(_0x432781*=$gameScreen['zoomScale']()),_0x432781;},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x377)]=function(_0x1ed7d1){const _0x3ad772=_0x17e81a;this[_0x3ad772(0x5b4)]=_0x1ed7d1;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3fd)]=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x348)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x348)]=function(_0x4222c6){const _0x3f507a=_0x17e81a;return this[_0x3f507a(0x5b4)]=this[_0x3f507a(0x5b4)]||0x0,[0x0,0x1,0x2,0x3][_0x3f507a(0x2b0)](this[_0x3f507a(0x5b4)])?VisuMZ[_0x3f507a(0x1a7)]['Game_Picture_calcEasing'][_0x3f507a(0x65e)](this,_0x4222c6):VisuMZ[_0x3f507a(0x5be)](_0x4222c6,this[_0x3f507a(0x5b4)]);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x855)]=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x470)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x470)]=function(){const _0x2793c8=_0x17e81a;VisuMZ[_0x2793c8(0x1a7)][_0x2793c8(0x855)][_0x2793c8(0x65e)](this),this['initRotationCoreEngine']();},Game_Picture['prototype']['initRotationCoreEngine']=function(){const _0x2ed31e=_0x17e81a;this[_0x2ed31e(0x5e0)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x2ed31e(0x347)};},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x65b)]=Game_Picture['prototype'][_0x17e81a(0x41a)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x41a)]=function(){const _0x427aa2=_0x17e81a;let _0x412765=VisuMZ[_0x427aa2(0x1a7)][_0x427aa2(0x65b)]['call'](this);return _0x412765+=this['anglePlus'](),_0x412765;},Game_Picture[_0x17e81a(0x44d)]['anglePlus']=function(){const _0x238c55=_0x17e81a;if(this[_0x238c55(0x5e0)]===undefined)this[_0x238c55(0x7a4)]();return this['_anglePlus'][_0x238c55(0x64f)]||0x0;},Game_Picture[_0x17e81a(0x44d)]['setAnglePlusData']=function(_0x7a116a,_0x3dacde,_0x59fb80){const _0x1e719f=_0x17e81a;if(this[_0x1e719f(0x5e0)]===undefined)this[_0x1e719f(0x7a4)]();this[_0x1e719f(0x5e0)][_0x1e719f(0x730)]=_0x7a116a||0x0,this['_anglePlus'][_0x1e719f(0x7b5)]=_0x3dacde||0x0,this['_anglePlus']['wholeDuration']=_0x3dacde||0x0,this['_anglePlus'][_0x1e719f(0x28f)]=_0x59fb80||_0x1e719f(0x347),_0x3dacde<=0x0&&(this[_0x1e719f(0x5e0)][_0x1e719f(0x64f)]=this[_0x1e719f(0x5e0)][_0x1e719f(0x730)]);},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x877)]=function(_0xab41fa,_0xc1dcce,_0x508c1d){const _0x441479=_0x17e81a;if(this[_0x441479(0x5e0)]===undefined)this[_0x441479(0x7a4)]();this[_0x441479(0x5e0)][_0x441479(0x730)]+=_0xab41fa||0x0,this['_anglePlus'][_0x441479(0x7b5)]=_0xc1dcce||0x0,this[_0x441479(0x5e0)][_0x441479(0x59e)]=_0xc1dcce||0x0,this[_0x441479(0x5e0)][_0x441479(0x28f)]=_0x508c1d||_0x441479(0x347),_0xc1dcce<=0x0&&(this[_0x441479(0x5e0)][_0x441479(0x64f)]=this[_0x441479(0x5e0)][_0x441479(0x730)]);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x5f8)]=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x239)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x239)]=function(){const _0x3acea0=_0x17e81a;VisuMZ[_0x3acea0(0x1a7)][_0x3acea0(0x5f8)]['call'](this),this[_0x3acea0(0x1f0)]();},Game_Picture[_0x17e81a(0x44d)]['updateAnglePlus']=function(){const _0x401fff=_0x17e81a;if(this['_anglePlus']===undefined)this[_0x401fff(0x7a4)]();const _0x24bb24=this[_0x401fff(0x5e0)];if(_0x24bb24[_0x401fff(0x7b5)]<=0x0)return;_0x24bb24[_0x401fff(0x64f)]=this[_0x401fff(0x59c)](_0x24bb24[_0x401fff(0x64f)],_0x24bb24[_0x401fff(0x730)]),_0x24bb24['duration']--,_0x24bb24[_0x401fff(0x7b5)]<=0x0&&(_0x24bb24[_0x401fff(0x64f)]=_0x24bb24[_0x401fff(0x730)]);},Game_Picture['prototype'][_0x17e81a(0x59c)]=function(_0x357cc3,_0x21bef3){const _0x4125a7=_0x17e81a,_0x42142b=this[_0x4125a7(0x5e0)],_0x21b595=_0x42142b[_0x4125a7(0x28f)],_0x5899f4=_0x42142b[_0x4125a7(0x7b5)],_0xf0e034=_0x42142b[_0x4125a7(0x59e)],_0x59390d=VisuMZ['ApplyEasing']((_0xf0e034-_0x5899f4)/_0xf0e034,_0x21b595),_0x415b2d=VisuMZ[_0x4125a7(0x5be)]((_0xf0e034-_0x5899f4+0x1)/_0xf0e034,_0x21b595),_0x19e4e7=(_0x357cc3-_0x21bef3*_0x59390d)/(0x1-_0x59390d);return _0x19e4e7+(_0x21bef3-_0x19e4e7)*_0x415b2d;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x72e)]=Game_Action[_0x17e81a(0x44d)]['itemHit'],Game_Action[_0x17e81a(0x44d)][_0x17e81a(0xe7)]=function(_0x35bd39){const _0x24a492=_0x17e81a;return VisuMZ[_0x24a492(0x1a7)][_0x24a492(0x26d)][_0x24a492(0x51f)][_0x24a492(0x609)]?this['itemHitImprovedAccuracy'](_0x35bd39):VisuMZ[_0x24a492(0x1a7)][_0x24a492(0x72e)]['call'](this,_0x35bd39);},Game_Action['prototype'][_0x17e81a(0x49b)]=function(_0x329f69){const _0x1c6695=_0x17e81a,_0x16edd2=this['itemSuccessRate'](_0x329f69),_0x4888b0=this[_0x1c6695(0x502)](_0x329f69),_0x222142=this[_0x1c6695(0x300)](_0x329f69);return _0x16edd2*(_0x4888b0-_0x222142);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x667)]=Game_Action[_0x17e81a(0x44d)][_0x17e81a(0x41c)],Game_Action[_0x17e81a(0x44d)][_0x17e81a(0x41c)]=function(_0x29bf25){const _0x267a9c=_0x17e81a;return VisuMZ[_0x267a9c(0x1a7)][_0x267a9c(0x26d)][_0x267a9c(0x51f)][_0x267a9c(0x609)]?0x0:VisuMZ['CoreEngine'][_0x267a9c(0x667)][_0x267a9c(0x65e)](this,_0x29bf25);},Game_Action['prototype'][_0x17e81a(0x3d6)]=function(_0x409ddb){const _0x12e22a=_0x17e81a;return this['item']()[_0x12e22a(0x7cb)]*0.01;},Game_Action['prototype']['subjectHitRate']=function(_0x2cbfaf){const _0x1db551=_0x17e81a;if(VisuMZ[_0x1db551(0x1a7)][_0x1db551(0x26d)][_0x1db551(0x51f)]['AccuracyBoost']&&this[_0x1db551(0x4ee)]())return 0x1;return this[_0x1db551(0x1fc)]()?VisuMZ['CoreEngine'][_0x1db551(0x26d)][_0x1db551(0x51f)]['AccuracyBoost']&&this[_0x1db551(0x675)]()[_0x1db551(0x3e8)]()?this[_0x1db551(0x675)]()[_0x1db551(0x43c)]+0.05:this[_0x1db551(0x675)]()[_0x1db551(0x43c)]:0x1;},Game_Action[_0x17e81a(0x44d)]['targetEvaRate']=function(_0x443914){const _0x4c94a3=_0x17e81a;if(this[_0x4c94a3(0x675)]()[_0x4c94a3(0x3e8)]()===_0x443914[_0x4c94a3(0x3e8)]())return 0x0;if(this[_0x4c94a3(0x1fc)]())return VisuMZ['CoreEngine'][_0x4c94a3(0x26d)]['QoL']['AccuracyBoost']&&_0x443914['isEnemy']()?_0x443914[_0x4c94a3(0x729)]-0.05:_0x443914[_0x4c94a3(0x729)];else return this[_0x4c94a3(0x84c)]()?_0x443914[_0x4c94a3(0x680)]:0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x307)]=Game_Action['prototype'][_0x17e81a(0x1eb)],Game_Action[_0x17e81a(0x44d)]['updateLastTarget']=function(_0x5cc93d){const _0x36135c=_0x17e81a;VisuMZ[_0x36135c(0x1a7)][_0x36135c(0x307)]['call'](this,_0x5cc93d);if(VisuMZ[_0x36135c(0x1a7)][_0x36135c(0x26d)][_0x36135c(0x51f)][_0x36135c(0x609)])return;const _0x48ac05=_0x5cc93d[_0x36135c(0x49c)]();_0x48ac05[_0x36135c(0x5d5)]&&(0x1-this[_0x36135c(0x41c)](_0x5cc93d)>this[_0x36135c(0xe7)](_0x5cc93d)&&(_0x48ac05[_0x36135c(0x5d5)]=![],_0x48ac05[_0x36135c(0x828)]=!![]));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x46b)]=Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x690)],Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x690)]=function(){const _0x2022d0=_0x17e81a;this[_0x2022d0(0x234)]={},VisuMZ[_0x2022d0(0x1a7)]['Game_BattlerBase_initMembers']['call'](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0x17e81a(0x208)],Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x208)]=function(){const _0x5e3148=_0x17e81a;this[_0x5e3148(0x234)]={},VisuMZ['CoreEngine'][_0x5e3148(0x4d6)][_0x5e3148(0x65e)](this);},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x2d2)]=function(_0x34d4bf){const _0x41e5ba=_0x17e81a;return this['_cache']=this[_0x41e5ba(0x234)]||{},this[_0x41e5ba(0x234)][_0x34d4bf]!==undefined;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0xe5)]=function(_0x2767a8){const _0xff970e=_0x17e81a;return _0x2767a8=_0x2767a8||'',_0x2767a8='\x20'+_0x2767a8,(VisuMZ[_0xff970e(0x1a7)]['Settings'][_0xff970e(0x324)][_0xff970e(0x725)]??!![])&&(_0x2767a8=_0x2767a8[_0xff970e(0x7b7)](/\s(?:USER|THIS)\.mhp\b/gi,_0xff970e(0x620)),_0x2767a8=_0x2767a8['replace'](/\s(?:USER|THIS)\.mmp\b/gi,'this.paramBase(1)'),_0x2767a8=_0x2767a8['replace'](/\s(?:USER|THIS)\.atk\b/gi,'this.paramBase(2)'),_0x2767a8=_0x2767a8[_0xff970e(0x7b7)](/\s(?:USER|THIS)\.def\b/gi,_0xff970e(0x808)),_0x2767a8=_0x2767a8[_0xff970e(0x7b7)](/\s(?:USER|THIS)\.mat\b/gi,'this.paramBase(4)'),_0x2767a8=_0x2767a8['replace'](/\s(?:USER|THIS)\.mdf\b/gi,_0xff970e(0x716)),_0x2767a8=_0x2767a8[_0xff970e(0x7b7)](/\s(?:USER|THIS)\.agi\b/gi,_0xff970e(0x2c6)),_0x2767a8=_0x2767a8['replace'](/\s(?:USER|THIS)\.luk\b/gi,_0xff970e(0x5ab)),_0x2767a8=_0x2767a8[_0xff970e(0x7b7)](/\s(?:USER|THIS)\.param\(/gi,'this.paramBase(')),_0x2767a8=_0x2767a8[_0xff970e(0x7b7)](/\suser\./gi,_0xff970e(0x686)),_0x2767a8;},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x3e3)]=function(_0x5bae40){const _0x391a0a=_0x17e81a,_0xb43650=(_0x5e5240,_0x53c04c)=>{const _0x5aa28f=_0x1250;if(!_0x53c04c)return _0x5e5240;if(_0x53c04c[_0x5aa28f(0x176)][_0x5aa28f(0x6b6)](VisuMZ[_0x5aa28f(0x1a7)][_0x5aa28f(0x604)][_0x5aa28f(0x3e3)][_0x5bae40])){var _0x244af0=Number(RegExp['$1']);_0x5e5240+=_0x244af0;}if(_0x53c04c[_0x5aa28f(0x176)][_0x5aa28f(0x6b6)](VisuMZ[_0x5aa28f(0x1a7)][_0x5aa28f(0x604)][_0x5aa28f(0x6f0)][_0x5bae40])){var _0x4d23d4=String(RegExp['$1']);_0x4d23d4=VisuMZ[_0x5aa28f(0x1a7)][_0x5aa28f(0xe5)](_0x4d23d4);try{_0x5e5240+=eval(_0x4d23d4);}catch(_0x3904af){if($gameTemp[_0x5aa28f(0x6d5)]())console['log'](_0x3904af);}}return _0x5e5240;};return this[_0x391a0a(0x885)]()[_0x391a0a(0x62e)](_0xb43650,this[_0x391a0a(0x3d1)][_0x5bae40]);},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x40b)]=function(_0x5da886){const _0x473fc8=_0x17e81a;var _0x2dcd19=_0x473fc8(0x57f)+(this[_0x473fc8(0x3e8)]()?'Actor':_0x473fc8(0x128))+'ParamMax'+_0x5da886;if(this[_0x473fc8(0x2d2)](_0x2dcd19))return this[_0x473fc8(0x234)][_0x2dcd19];this[_0x473fc8(0x234)][_0x2dcd19]=eval(VisuMZ['CoreEngine'][_0x473fc8(0x26d)][_0x473fc8(0x324)][_0x2dcd19]);const _0x1ca752=(_0x3a45ea,_0x44cf80)=>{const _0x326158=_0x473fc8;if(!_0x44cf80)return _0x3a45ea;if(_0x44cf80[_0x326158(0x176)][_0x326158(0x6b6)](VisuMZ[_0x326158(0x1a7)][_0x326158(0x604)][_0x326158(0x40b)][_0x5da886])){var _0x19551d=Number(RegExp['$1']);if(_0x19551d===0x0)_0x19551d=Number[_0x326158(0x3ce)];_0x3a45ea=Math['max'](_0x3a45ea,_0x19551d);}if(_0x44cf80['note'][_0x326158(0x6b6)](VisuMZ[_0x326158(0x1a7)]['RegExp'][_0x326158(0x539)][_0x5da886])){var _0x318760=String(RegExp['$1']);_0x318760=VisuMZ[_0x326158(0x1a7)][_0x326158(0xe5)](_0x318760);try{_0x3a45ea=Math[_0x326158(0x744)](_0x3a45ea,Number(eval(_0x318760)));}catch(_0x539893){if($gameTemp['isPlaytest']())console['log'](_0x539893);}}return _0x3a45ea;};if(this[_0x473fc8(0x234)][_0x2dcd19]===0x0)this[_0x473fc8(0x234)][_0x2dcd19]=Number[_0x473fc8(0x3ce)];return this[_0x473fc8(0x234)][_0x2dcd19]=this[_0x473fc8(0x885)]()['reduce'](_0x1ca752,this['_cache'][_0x2dcd19]),this[_0x473fc8(0x234)][_0x2dcd19];},Game_BattlerBase['prototype'][_0x17e81a(0x6a3)]=function(_0x43d4ff){const _0x488ce0=_0x17e81a,_0x4ef492=this[_0x488ce0(0x87f)](Game_BattlerBase['TRAIT_PARAM'],_0x43d4ff),_0x5829bd=(_0x5cd494,_0xaaac14)=>{const _0x1fa889=_0x488ce0;if(!_0xaaac14)return _0x5cd494;if(_0xaaac14[_0x1fa889(0x176)][_0x1fa889(0x6b6)](VisuMZ[_0x1fa889(0x1a7)][_0x1fa889(0x604)][_0x1fa889(0x12e)][_0x43d4ff])){var _0x433e39=Number(RegExp['$1'])/0x64;_0x5cd494*=_0x433e39;}if(_0xaaac14[_0x1fa889(0x176)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x1fa889(0x86c)][_0x43d4ff])){var _0x433e39=Number(RegExp['$1']);_0x5cd494*=_0x433e39;}if(_0xaaac14[_0x1fa889(0x176)][_0x1fa889(0x6b6)](VisuMZ[_0x1fa889(0x1a7)][_0x1fa889(0x604)][_0x1fa889(0x517)][_0x43d4ff])){var _0x929982=String(RegExp['$1']);_0x929982=VisuMZ[_0x1fa889(0x1a7)][_0x1fa889(0xe5)](_0x929982);try{_0x5cd494*=eval(_0x929982);}catch(_0x2a50d5){if($gameTemp[_0x1fa889(0x6d5)]())console[_0x1fa889(0x7dd)](_0x2a50d5);}}return _0x5cd494;};return this['traitObjects']()['reduce'](_0x5829bd,_0x4ef492);},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x5a8)]=function(_0x19eb53){const _0x49fd89=_0x17e81a,_0x48019d=(_0x446f0e,_0xf0079)=>{const _0x4bd927=_0x1250;if(!_0xf0079)return _0x446f0e;if(_0xf0079[_0x4bd927(0x176)]['match'](VisuMZ[_0x4bd927(0x1a7)][_0x4bd927(0x604)]['paramFlat'][_0x19eb53])){var _0xbc1f3a=Number(RegExp['$1']);_0x446f0e+=_0xbc1f3a;}if(_0xf0079[_0x4bd927(0x176)][_0x4bd927(0x6b6)](VisuMZ[_0x4bd927(0x1a7)][_0x4bd927(0x604)][_0x4bd927(0x4da)][_0x19eb53])){var _0x16e759=String(RegExp['$1']);_0x16e759=VisuMZ[_0x4bd927(0x1a7)]['JsReplaceUserVar'](_0x16e759);try{_0x446f0e+=eval(_0x16e759);}catch(_0x5a35cf){if($gameTemp['isPlaytest']())console[_0x4bd927(0x7dd)](_0x5a35cf);}}return _0x446f0e;};return this[_0x49fd89(0x885)]()['reduce'](_0x48019d,0x0);},Game_BattlerBase[_0x17e81a(0x44d)]['param']=function(_0x1e33ae){const _0x15391f=_0x17e81a;let _0x4cf9f8=_0x15391f(0x4bb)+_0x1e33ae+_0x15391f(0x4f2);if(this[_0x15391f(0x2d2)](_0x4cf9f8))return this[_0x15391f(0x234)][_0x4cf9f8];return this[_0x15391f(0x234)][_0x4cf9f8]=Math[_0x15391f(0x397)](VisuMZ['CoreEngine'][_0x15391f(0x26d)][_0x15391f(0x324)][_0x15391f(0x4db)][_0x15391f(0x65e)](this,_0x1e33ae)),this[_0x15391f(0x234)][_0x4cf9f8];},Game_BattlerBase[_0x17e81a(0x44d)]['xparamPlus']=function(_0x4600c9){const _0x59509c=_0x17e81a,_0x57c952=(_0x3b8f9d,_0xa3743e)=>{const _0x3c7c6c=_0x1250;if(!_0xa3743e)return _0x3b8f9d;if(_0xa3743e[_0x3c7c6c(0x176)]['match'](VisuMZ[_0x3c7c6c(0x1a7)][_0x3c7c6c(0x604)]['xparamPlus1'][_0x4600c9])){var _0x3b5c15=Number(RegExp['$1'])/0x64;_0x3b8f9d+=_0x3b5c15;}if(_0xa3743e[_0x3c7c6c(0x176)]['match'](VisuMZ[_0x3c7c6c(0x1a7)][_0x3c7c6c(0x604)][_0x3c7c6c(0x648)][_0x4600c9])){var _0x3b5c15=Number(RegExp['$1']);_0x3b8f9d+=_0x3b5c15;}if(_0xa3743e[_0x3c7c6c(0x176)][_0x3c7c6c(0x6b6)](VisuMZ[_0x3c7c6c(0x1a7)][_0x3c7c6c(0x604)]['xparamPlusJS'][_0x4600c9])){var _0x4eb4da=String(RegExp['$1']);_0x4eb4da=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x4eb4da);try{_0x3b8f9d+=eval(_0x4eb4da);}catch(_0x244920){if($gameTemp[_0x3c7c6c(0x6d5)]())console[_0x3c7c6c(0x7dd)](_0x244920);}}return _0x3b8f9d;};return this[_0x59509c(0x885)]()[_0x59509c(0x62e)](_0x57c952,0x0);},Game_BattlerBase['prototype'][_0x17e81a(0x2b6)]=function(_0x2e7605){const _0x41a35c=_0x17e81a,_0x19b84f=(_0x737a8a,_0x1c5bb0)=>{const _0xab1c1=_0x1250;if(!_0x1c5bb0)return _0x737a8a;if(_0x1c5bb0['note']['match'](VisuMZ[_0xab1c1(0x1a7)][_0xab1c1(0x604)]['xparamRate1'][_0x2e7605])){var _0x3d7896=Number(RegExp['$1'])/0x64;_0x737a8a*=_0x3d7896;}if(_0x1c5bb0[_0xab1c1(0x176)]['match'](VisuMZ[_0xab1c1(0x1a7)][_0xab1c1(0x604)][_0xab1c1(0xca)][_0x2e7605])){var _0x3d7896=Number(RegExp['$1']);_0x737a8a*=_0x3d7896;}if(_0x1c5bb0[_0xab1c1(0x176)][_0xab1c1(0x6b6)](VisuMZ[_0xab1c1(0x1a7)][_0xab1c1(0x604)][_0xab1c1(0xea)][_0x2e7605])){var _0x407274=String(RegExp['$1']);_0x407274=VisuMZ[_0xab1c1(0x1a7)][_0xab1c1(0xe5)](_0x407274);try{_0x737a8a*=eval(_0x407274);}catch(_0x260b8a){if($gameTemp['isPlaytest']())console[_0xab1c1(0x7dd)](_0x260b8a);}}return _0x737a8a;};return this[_0x41a35c(0x885)]()[_0x41a35c(0x62e)](_0x19b84f,0x1);},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x4ca)]=function(_0x13f3e7){const _0x8311ef=_0x17e81a,_0x2a83e9=(_0xa2f734,_0x4ed863)=>{const _0x10e031=_0x1250;if(!_0x4ed863)return _0xa2f734;if(_0x4ed863[_0x10e031(0x176)][_0x10e031(0x6b6)](VisuMZ[_0x10e031(0x1a7)][_0x10e031(0x604)][_0x10e031(0x606)][_0x13f3e7])){var _0x67514a=Number(RegExp['$1'])/0x64;_0xa2f734+=_0x67514a;}if(_0x4ed863[_0x10e031(0x176)]['match'](VisuMZ[_0x10e031(0x1a7)]['RegExp']['xparamFlat2'][_0x13f3e7])){var _0x67514a=Number(RegExp['$1']);_0xa2f734+=_0x67514a;}if(_0x4ed863[_0x10e031(0x176)][_0x10e031(0x6b6)](VisuMZ['CoreEngine'][_0x10e031(0x604)][_0x10e031(0x4fe)][_0x13f3e7])){var _0x36e584=String(RegExp['$1']);_0x36e584=VisuMZ[_0x10e031(0x1a7)][_0x10e031(0xe5)](_0x36e584);try{_0xa2f734+=eval(_0x36e584);}catch(_0x4eab16){if($gameTemp[_0x10e031(0x6d5)]())console['log'](_0x4eab16);}}return _0xa2f734;};return this[_0x8311ef(0x885)]()['reduce'](_0x2a83e9,0x0);},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x131)]=function(_0x5d3824){const _0x352222=_0x17e81a;let _0x5d239d=_0x352222(0x131)+_0x5d3824+_0x352222(0x4f2);if(this[_0x352222(0x2d2)](_0x5d239d))return this[_0x352222(0x234)][_0x5d239d];return this['_cache'][_0x5d239d]=VisuMZ[_0x352222(0x1a7)][_0x352222(0x26d)][_0x352222(0x324)][_0x352222(0x7be)][_0x352222(0x65e)](this,_0x5d3824),this[_0x352222(0x234)][_0x5d239d];},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x691)]=function(_0x4640dd){const _0xf93170=_0x17e81a,_0x29ad35=(_0x357c74,_0x334bbe)=>{const _0x2160ed=_0x1250;if(!_0x334bbe)return _0x357c74;if(_0x334bbe[_0x2160ed(0x176)][_0x2160ed(0x6b6)](VisuMZ[_0x2160ed(0x1a7)]['RegExp']['sparamPlus1'][_0x4640dd])){var _0x56c0d5=Number(RegExp['$1'])/0x64;_0x357c74+=_0x56c0d5;}if(_0x334bbe[_0x2160ed(0x176)][_0x2160ed(0x6b6)](VisuMZ[_0x2160ed(0x1a7)][_0x2160ed(0x604)]['sparamPlus2'][_0x4640dd])){var _0x56c0d5=Number(RegExp['$1']);_0x357c74+=_0x56c0d5;}if(_0x334bbe[_0x2160ed(0x176)][_0x2160ed(0x6b6)](VisuMZ[_0x2160ed(0x1a7)][_0x2160ed(0x604)]['sparamPlusJS'][_0x4640dd])){var _0x12a00a=String(RegExp['$1']);_0x12a00a=VisuMZ[_0x2160ed(0x1a7)][_0x2160ed(0xe5)](_0x12a00a);try{_0x357c74+=eval(_0x12a00a);}catch(_0x3d2d9b){if($gameTemp['isPlaytest']())console[_0x2160ed(0x7dd)](_0x3d2d9b);}}return _0x357c74;};return this[_0xf93170(0x885)]()[_0xf93170(0x62e)](_0x29ad35,0x0);},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x7e1)]=function(_0x3eb366){const _0x4ac299=_0x17e81a,_0x547f59=(_0x45eaef,_0x2b6369)=>{const _0x4bb97a=_0x1250;if(!_0x2b6369)return _0x45eaef;if(_0x2b6369['note'][_0x4bb97a(0x6b6)](VisuMZ[_0x4bb97a(0x1a7)][_0x4bb97a(0x604)]['sparamRate1'][_0x3eb366])){var _0x3704cd=Number(RegExp['$1'])/0x64;_0x45eaef*=_0x3704cd;}if(_0x2b6369['note'][_0x4bb97a(0x6b6)](VisuMZ['CoreEngine']['RegExp'][_0x4bb97a(0x802)][_0x3eb366])){var _0x3704cd=Number(RegExp['$1']);_0x45eaef*=_0x3704cd;}if(_0x2b6369[_0x4bb97a(0x176)][_0x4bb97a(0x6b6)](VisuMZ[_0x4bb97a(0x1a7)][_0x4bb97a(0x604)]['sparamRateJS'][_0x3eb366])){var _0x2ebc6d=String(RegExp['$1']);_0x2ebc6d=VisuMZ[_0x4bb97a(0x1a7)]['JsReplaceUserVar'](_0x2ebc6d);try{_0x45eaef*=eval(_0x2ebc6d);}catch(_0x2bd456){if($gameTemp[_0x4bb97a(0x6d5)]())console['log'](_0x2bd456);}}return _0x45eaef;};return this[_0x4ac299(0x885)]()[_0x4ac299(0x62e)](_0x547f59,0x1);},Game_BattlerBase[_0x17e81a(0x44d)]['sparamFlatBonus']=function(_0x9263c3){const _0x42a396=_0x17e81a,_0x4bfb0a=(_0x36051d,_0x7672a)=>{const _0x558f60=_0x1250;if(!_0x7672a)return _0x36051d;if(_0x7672a[_0x558f60(0x176)][_0x558f60(0x6b6)](VisuMZ[_0x558f60(0x1a7)]['RegExp'][_0x558f60(0x243)][_0x9263c3])){var _0x2331db=Number(RegExp['$1'])/0x64;_0x36051d+=_0x2331db;}if(_0x7672a[_0x558f60(0x176)][_0x558f60(0x6b6)](VisuMZ[_0x558f60(0x1a7)]['RegExp'][_0x558f60(0xf6)][_0x9263c3])){var _0x2331db=Number(RegExp['$1']);_0x36051d+=_0x2331db;}if(_0x7672a[_0x558f60(0x176)]['match'](VisuMZ[_0x558f60(0x1a7)]['RegExp']['sparamFlatJS'][_0x9263c3])){var _0x15c330=String(RegExp['$1']);_0x15c330=VisuMZ[_0x558f60(0x1a7)][_0x558f60(0xe5)](_0x15c330);try{_0x36051d+=eval(_0x15c330);}catch(_0x4b966b){if($gameTemp[_0x558f60(0x6d5)]())console[_0x558f60(0x7dd)](_0x4b966b);}}return _0x36051d;};return this[_0x42a396(0x885)]()[_0x42a396(0x62e)](_0x4bfb0a,0x0);},Game_BattlerBase['prototype'][_0x17e81a(0x7fc)]=function(_0x30e0af){const _0x5721de=_0x17e81a;let _0x353632=_0x5721de(0x7fc)+_0x30e0af+_0x5721de(0x4f2);if(this[_0x5721de(0x2d2)](_0x353632))return this[_0x5721de(0x234)][_0x353632];return this['_cache'][_0x353632]=VisuMZ[_0x5721de(0x1a7)]['Settings'][_0x5721de(0x324)]['SParameterFormula'][_0x5721de(0x65e)](this,_0x30e0af),this[_0x5721de(0x234)][_0x353632];},Game_BattlerBase[_0x17e81a(0x44d)][_0x17e81a(0x561)]=function(_0x188dba,_0x500c29){const _0x44d4ce=_0x17e81a;if(typeof paramId==='number')return this['param'](_0x188dba);_0x188dba=String(_0x188dba||'')[_0x44d4ce(0x413)]();if(_0x188dba===_0x44d4ce(0x677))return this[_0x44d4ce(0x4bb)](0x0);if(_0x188dba===_0x44d4ce(0x427))return this['param'](0x1);if(_0x188dba==='ATK')return this['param'](0x2);if(_0x188dba===_0x44d4ce(0x3db))return this['param'](0x3);if(_0x188dba===_0x44d4ce(0x31f))return this['param'](0x4);if(_0x188dba===_0x44d4ce(0x5a7))return this[_0x44d4ce(0x4bb)](0x5);if(_0x188dba===_0x44d4ce(0x2c9))return this['param'](0x6);if(_0x188dba===_0x44d4ce(0x528))return this['param'](0x7);if(_0x188dba==='HIT')return _0x500c29?String(Math['round'](this[_0x44d4ce(0x131)](0x0)*0x64))+'%':this[_0x44d4ce(0x131)](0x0);if(_0x188dba===_0x44d4ce(0x5b8))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x131)](0x1)*0x64))+'%':this[_0x44d4ce(0x131)](0x1);if(_0x188dba===_0x44d4ce(0x651))return _0x500c29?String(Math['round'](this[_0x44d4ce(0x131)](0x2)*0x64))+'%':this[_0x44d4ce(0x131)](0x2);if(_0x188dba==='CEV')return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x131)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x188dba==='MEV')return _0x500c29?String(Math['round'](this[_0x44d4ce(0x131)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x188dba==='MRF')return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x131)](0x5)*0x64))+'%':this[_0x44d4ce(0x131)](0x5);if(_0x188dba===_0x44d4ce(0x56d))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x131)](0x6)*0x64))+'%':this[_0x44d4ce(0x131)](0x6);if(_0x188dba==='HRG')return _0x500c29?String(Math[_0x44d4ce(0x397)](this['xparam'](0x7)*0x64))+'%':this[_0x44d4ce(0x131)](0x7);if(_0x188dba==='MRG')return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x131)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x188dba===_0x44d4ce(0x467))return _0x500c29?String(Math['round'](this[_0x44d4ce(0x131)](0x9)*0x64))+'%':this[_0x44d4ce(0x131)](0x9);if(_0x188dba===_0x44d4ce(0x45d))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x0)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x0);if(_0x188dba==='GRD')return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x1)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x1);if(_0x188dba===_0x44d4ce(0x39b))return _0x500c29?String(Math[_0x44d4ce(0x397)](this['sparam'](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x188dba===_0x44d4ce(0x86a))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x188dba===_0x44d4ce(0x878))return _0x500c29?String(Math['round'](this[_0x44d4ce(0x7fc)](0x4)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x4);if(_0x188dba==='TCR')return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x5)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x5);if(_0x188dba===_0x44d4ce(0x1d9))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x6)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x6);if(_0x188dba===_0x44d4ce(0x134))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x7)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x7);if(_0x188dba===_0x44d4ce(0x6cc))return _0x500c29?String(Math[_0x44d4ce(0x397)](this[_0x44d4ce(0x7fc)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x188dba===_0x44d4ce(0x22f))return _0x500c29?String(Math['round'](this[_0x44d4ce(0x7fc)](0x9)*0x64))+'%':this[_0x44d4ce(0x7fc)](0x9);if(VisuMZ[_0x44d4ce(0x1a7)]['CustomParamAbb'][_0x188dba]){const _0x40a74d=VisuMZ[_0x44d4ce(0x1a7)]['CustomParamAbb'][_0x188dba],_0xa56a71=this[_0x40a74d];return VisuMZ[_0x44d4ce(0x1a7)]['CustomParamType'][_0x188dba]===_0x44d4ce(0x227)?_0xa56a71:_0x500c29?String(Math[_0x44d4ce(0x397)](_0xa56a71*0x64))+'%':_0xa56a71;}return'';},Game_BattlerBase[_0x17e81a(0x44d)]['isDying']=function(){const _0x75311a=_0x17e81a;return this[_0x75311a(0x1a2)]()&&this[_0x75311a(0x6d6)]<this[_0x75311a(0x4f6)]*VisuMZ[_0x75311a(0x1a7)][_0x75311a(0x26d)][_0x75311a(0x324)]['CrisisRate'];},Game_Battler['prototype'][_0x17e81a(0x704)]=function(){const _0x3b8735=_0x17e81a;SoundManager[_0x3b8735(0x869)](),this[_0x3b8735(0x10c)](_0x3b8735(0xa9));},VisuMZ['CoreEngine'][_0x17e81a(0x7b2)]=Game_Actor[_0x17e81a(0x44d)]['paramBase'],Game_Actor['prototype'][_0x17e81a(0x540)]=function(_0x44eeb1){const _0x4e8c75=_0x17e81a;if(this[_0x4e8c75(0x7fb)]>0x63)return this['paramBaseAboveLevel99'](_0x44eeb1);return VisuMZ['CoreEngine'][_0x4e8c75(0x7b2)][_0x4e8c75(0x65e)](this,_0x44eeb1);},Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x5b9)]=function(_0x58b238){const _0x7da46c=_0x17e81a,_0x1a8ed3=this[_0x7da46c(0x105)]()[_0x7da46c(0x4ff)][_0x58b238][0x63],_0x252a90=this[_0x7da46c(0x105)]()[_0x7da46c(0x4ff)][_0x58b238][0x62];return _0x1a8ed3+(_0x1a8ed3-_0x252a90)*(this[_0x7da46c(0x7fb)]-0x63);},VisuMZ[_0x17e81a(0x1a7)]['Game_Actor_changeClass']=Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x334)],Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x334)]=function(_0x5a271a,_0x2c4070){const _0x14db90=_0x17e81a;$gameTemp[_0x14db90(0x370)]=!![],VisuMZ[_0x14db90(0x1a7)]['Game_Actor_changeClass']['call'](this,_0x5a271a,_0x2c4070),$gameTemp['_changingClass']=undefined;},VisuMZ['CoreEngine'][_0x17e81a(0x323)]=Game_Actor['prototype'][_0x17e81a(0x242)],Game_Actor[_0x17e81a(0x44d)]['levelUp']=function(){const _0x4ede99=_0x17e81a;VisuMZ[_0x4ede99(0x1a7)][_0x4ede99(0x323)][_0x4ede99(0x65e)](this);if(!$gameTemp[_0x4ede99(0x370)])this[_0x4ede99(0x3dd)]();},Game_Actor['prototype'][_0x17e81a(0x3dd)]=function(){const _0x354b30=_0x17e81a;this[_0x354b30(0x234)]={};if(VisuMZ[_0x354b30(0x1a7)]['Settings'][_0x354b30(0x51f)][_0x354b30(0x3c0)])this[_0x354b30(0x6d6)]=this['mhp'];if(VisuMZ[_0x354b30(0x1a7)][_0x354b30(0x26d)][_0x354b30(0x51f)][_0x354b30(0x879)])this[_0x354b30(0x263)]=this['mmp'];},Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x361)]=function(){const _0x473935=_0x17e81a;if(this[_0x473935(0x1cd)]())return 0x1;const _0x42827a=this[_0x473935(0x270)]()-this[_0x473935(0x42d)](),_0x8f7731=this[_0x473935(0x217)]()-this['currentLevelExp']();return(_0x8f7731/_0x42827a)['clamp'](0x0,0x1);},Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x885)]=function(){const _0x428680=_0x17e81a,_0x4a0e68=Game_Battler[_0x428680(0x44d)][_0x428680(0x885)][_0x428680(0x65e)](this);for(const _0x23e746 of this['equips']()){_0x23e746&&_0x4a0e68[_0x428680(0x189)](_0x23e746);}return _0x4a0e68[_0x428680(0x189)](this[_0x428680(0x105)](),this[_0x428680(0x178)]()),_0x4a0e68;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x168)]=Game_Actor['prototype']['isPreserveTp'],Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x6b5)]=function(){const _0x53dc26=_0x17e81a;if(!$gameParty[_0x53dc26(0x180)]())return!![];return VisuMZ[_0x53dc26(0x1a7)][_0x53dc26(0x168)][_0x53dc26(0x65e)](this);},VisuMZ['CoreEngine'][_0x17e81a(0x1cc)]=Game_Unit[_0x17e81a(0x44d)][_0x17e81a(0x5c5)],Game_Unit['prototype'][_0x17e81a(0x5c5)]=function(_0x5110a7){const _0x50946c=_0x17e81a;this['_inBattle']=!![],VisuMZ[_0x50946c(0x1a7)]['Game_Unit_onBattleStart'][_0x50946c(0x65e)](this,_0x5110a7);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x202)]=Game_Unit[_0x17e81a(0x44d)]['onBattleEnd'],Game_Unit[_0x17e81a(0x44d)]['onBattleEnd']=function(){const _0x1ca31c=_0x17e81a;for(const _0x4da0f4 of this[_0x1ca31c(0x424)]()){_0x4da0f4&&!_0x4da0f4[_0x1ca31c(0x6b5)]()&&_0x4da0f4['clearTp']();}VisuMZ[_0x1ca31c(0x1a7)]['Game_Unit_onBattleEnd'][_0x1ca31c(0x65e)](this);},Object[_0x17e81a(0x386)](Game_Enemy[_0x17e81a(0x44d)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x17e81a(0x44d)][_0x17e81a(0x827)]=function(){return this['enemy']()['level'];},Game_Enemy['prototype'][_0x17e81a(0x740)]=function(){const _0x4baf58=_0x17e81a;!this[_0x4baf58(0x26a)]&&(this[_0x4baf58(0x514)]+=Math[_0x4baf58(0x397)]((Graphics[_0x4baf58(0x4a1)]-0x270)/0x2),this[_0x4baf58(0x514)]-=Math[_0x4baf58(0x2b3)]((Graphics[_0x4baf58(0x4a1)]-Graphics['boxHeight'])/0x2),$gameSystem[_0x4baf58(0x216)]()?this[_0x4baf58(0x346)]-=Math[_0x4baf58(0x2b3)]((Graphics[_0x4baf58(0x107)]-Graphics['boxWidth'])/0x2):this[_0x4baf58(0x346)]+=Math[_0x4baf58(0x397)]((Graphics['boxWidth']-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x17e81a(0x44d)]['maxGold']=function(){const _0xb9bd30=_0x17e81a;return VisuMZ[_0xb9bd30(0x1a7)][_0xb9bd30(0x26d)][_0xb9bd30(0x37c)][_0xb9bd30(0x308)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x60d)]=Game_Party[_0x17e81a(0x44d)]['consumeItem'],Game_Party['prototype'][_0x17e81a(0x38f)]=function(_0x35a7de){const _0x4f0a2e=_0x17e81a;if(VisuMZ['CoreEngine'][_0x4f0a2e(0x26d)]['QoL'][_0x4f0a2e(0x584)]&&DataManager[_0x4f0a2e(0x53a)](_0x35a7de))return;VisuMZ['CoreEngine'][_0x4f0a2e(0x60d)][_0x4f0a2e(0x65e)](this,_0x35a7de);},Game_Party['prototype'][_0x17e81a(0x7f2)]=function(){const _0x3cc04d=_0x17e81a,_0x48c906=VisuMZ[_0x3cc04d(0x1a7)]['Settings']['QoL'],_0x10772e=_0x48c906[_0x3cc04d(0x581)]??0x63;let _0x3670ab=[];(_0x48c906[_0x3cc04d(0x780)]??!![])&&(_0x3670ab=_0x3670ab[_0x3cc04d(0x244)]($dataItems));(_0x48c906['BTestWeapons']??!![])&&(_0x3670ab=_0x3670ab['concat']($dataWeapons));(_0x48c906[_0x3cc04d(0x2ad)]??!![])&&(_0x3670ab=_0x3670ab[_0x3cc04d(0x244)]($dataArmors));for(const _0x4df202 of _0x3670ab){if(!_0x4df202)continue;if(_0x4df202[_0x3cc04d(0x320)][_0x3cc04d(0x1b5)]()<=0x0)continue;if(_0x4df202[_0x3cc04d(0x320)][_0x3cc04d(0x6b6)](/-----/i))continue;this[_0x3cc04d(0x33f)](_0x4df202,_0x10772e);}},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x74d)]=Game_Troop['prototype'][_0x17e81a(0x2f3)],Game_Troop[_0x17e81a(0x44d)][_0x17e81a(0x2f3)]=function(_0x2edfca){const _0x3d3499=_0x17e81a;$gameTemp[_0x3d3499(0x200)](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x2edfca),VisuMZ['CoreEngine'][_0x3d3499(0x74d)][_0x3d3499(0x65e)](this,_0x2edfca);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x13c)]=Game_Map['prototype'][_0x17e81a(0x2f3)],Game_Map['prototype']['setup']=function(_0x54c048){const _0x3bba34=_0x17e81a;VisuMZ['CoreEngine'][_0x3bba34(0x13c)][_0x3bba34(0x65e)](this,_0x54c048),this['checkCoreEngineDisplayCenter'](),this[_0x3bba34(0x298)](_0x54c048),this[_0x3bba34(0x55a)]();},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x298)]=function(){const _0x4afe19=_0x17e81a;this['_hideTileShadows']=VisuMZ[_0x4afe19(0x1a7)][_0x4afe19(0x26d)][_0x4afe19(0x51f)][_0x4afe19(0x629)]||![];const _0x3de507=VisuMZ['CoreEngine'][_0x4afe19(0x26d)][_0x4afe19(0x63a)],_0x230cbf=$dataMap?$dataMap[_0x4afe19(0x176)]||'':'';if(_0x230cbf['match'](/<SHOW TILE SHADOWS>/i))this[_0x4afe19(0x55e)]=![];else _0x230cbf[_0x4afe19(0x6b6)](/<HIDE TILE SHADOWS>/i)&&(this[_0x4afe19(0x55e)]=!![]);if(_0x230cbf['match'](/<SCROLL LOCK X>/i))this[_0x4afe19(0x75f)]()[_0x4afe19(0x13a)]=!![],this[_0x4afe19(0x75f)]()[_0x4afe19(0x825)]=_0x3de507[_0x4afe19(0x5b2)];else _0x230cbf[_0x4afe19(0x6b6)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x4afe19(0x75f)]()[_0x4afe19(0x13a)]=!![],this[_0x4afe19(0x75f)]()[_0x4afe19(0x825)]=Number(RegExp['$1']));if(_0x230cbf[_0x4afe19(0x6b6)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()[_0x4afe19(0x488)]=!![],this[_0x4afe19(0x75f)]()[_0x4afe19(0x83b)]=_0x3de507[_0x4afe19(0x518)];else _0x230cbf[_0x4afe19(0x6b6)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x4afe19(0x75f)]()[_0x4afe19(0x488)]=!![],this['centerCameraCheckData']()[_0x4afe19(0x83b)]=Number(RegExp['$1']));},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x4cc)]=function(){const _0x2a67e2=_0x17e81a;if(this['_hideTileShadows']===undefined)this[_0x2a67e2(0x298)]();return this[_0x2a67e2(0x55e)];},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x778)]=function(){const _0x5c26e8=_0x17e81a,_0x26f3b7=VisuMZ[_0x5c26e8(0x1a7)][_0x5c26e8(0x26d)][_0x5c26e8(0x63a)];this[_0x5c26e8(0x1c1)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x26f3b7['AutoScrollLockX']){const _0x460923=Graphics['width']/this[_0x5c26e8(0x7b6)]();_0x460923%0x1!==0x0&&Math[_0x5c26e8(0x2a2)](_0x460923)===this[_0x5c26e8(0x107)]()&&!this[_0x5c26e8(0x38d)]()&&(this[_0x5c26e8(0x1c1)][_0x5c26e8(0x13a)]=!![],this[_0x5c26e8(0x1c1)][_0x5c26e8(0x825)]=_0x26f3b7['DisplayLockX']||0x0);}if(_0x26f3b7['AutoScrollLockY']){const _0x28b89d=Graphics['height']/this[_0x5c26e8(0x57b)]();_0x28b89d%0x1!==0x0&&Math[_0x5c26e8(0x2a2)](_0x28b89d)===this[_0x5c26e8(0x4a1)]()&&!this['isLoopVertical']()&&(this[_0x5c26e8(0x1c1)][_0x5c26e8(0x488)]=!![],this[_0x5c26e8(0x1c1)][_0x5c26e8(0x83b)]=_0x26f3b7['DisplayLockY']||0x0);}$gameScreen[_0x5c26e8(0x156)]()===0x1&&(this[_0x5c26e8(0x75f)]()[_0x5c26e8(0x13a)]&&(this[_0x5c26e8(0x702)]=this[_0x5c26e8(0x75f)]()[_0x5c26e8(0x825)]),this['centerCameraCheckData']()['centerY']&&(this[_0x5c26e8(0x439)]=this[_0x5c26e8(0x75f)]()[_0x5c26e8(0x83b)]));},VisuMZ[_0x17e81a(0x1a7)]['Game_Map_setDisplayPos']=Game_Map['prototype'][_0x17e81a(0x5ae)],Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x5ae)]=function(_0x235265,_0x4cc723){const _0x48421a=_0x17e81a;VisuMZ[_0x48421a(0x1a7)][_0x48421a(0x637)][_0x48421a(0x65e)](this,_0x235265,_0x4cc723),$gameScreen[_0x48421a(0x156)]()===0x1&&(!this[_0x48421a(0x38d)]()&&this[_0x48421a(0x75f)]()[_0x48421a(0x13a)]&&(this[_0x48421a(0x702)]=this[_0x48421a(0x75f)]()[_0x48421a(0x825)]),!this['isLoopVertical']()&&this[_0x48421a(0x75f)]()[_0x48421a(0x488)]&&(this['_displayY']=this[_0x48421a(0x75f)]()[_0x48421a(0x83b)]));},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x75f)]=function(){const _0x571751=_0x17e81a;if(this['_centerCameraCheck']===undefined)this[_0x571751(0x778)]();return this[_0x571751(0x1c1)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x6d9)]=Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x4ce)],Game_Map[_0x17e81a(0x44d)]['scrollDown']=function(_0x34e728){const _0x438433=_0x17e81a;if(this[_0x438433(0x75f)]()[_0x438433(0x488)]&&$gameScreen[_0x438433(0x156)]()===0x1){this[_0x438433(0x439)]=this['centerCameraCheckData']()[_0x438433(0x83b)];return;}VisuMZ[_0x438433(0x1a7)]['Game_Map_scrollDown']['call'](this,_0x34e728);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x562)]=Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x636)],Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x636)]=function(_0x325429){const _0x4c29cf=_0x17e81a;if(this[_0x4c29cf(0x75f)]()[_0x4c29cf(0x13a)]&&$gameScreen[_0x4c29cf(0x156)]()===0x1){this['_displayX']=this['centerCameraCheckData']()['displayX'];return;}VisuMZ[_0x4c29cf(0x1a7)][_0x4c29cf(0x562)][_0x4c29cf(0x65e)](this,_0x325429);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x2bf)]=Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x7ab)],Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x7ab)]=function(_0x3270c1){const _0x345aa5=_0x17e81a;if(this['centerCameraCheckData']()['centerX']&&$gameScreen[_0x345aa5(0x156)]()===0x1){this[_0x345aa5(0x702)]=this[_0x345aa5(0x75f)]()[_0x345aa5(0x825)];return;}VisuMZ['CoreEngine'][_0x345aa5(0x2bf)][_0x345aa5(0x65e)](this,_0x3270c1);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x71d)]=Game_Map['prototype'][_0x17e81a(0x1cb)],Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x1cb)]=function(_0x19f52c){const _0x89927f=_0x17e81a;if(this['centerCameraCheckData']()[_0x89927f(0x488)]&&$gameScreen[_0x89927f(0x156)]()===0x1){this[_0x89927f(0x439)]=this[_0x89927f(0x75f)]()['displayY'];return;}VisuMZ[_0x89927f(0x1a7)][_0x89927f(0x71d)][_0x89927f(0x65e)](this,_0x19f52c);},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x55a)]=function(){const _0x49314a=_0x17e81a;this['_tileExtendTerrainTags']={};const _0x2d3576=this['tileset']();if(!_0x2d3576)return{};const _0x1d9748=_0x2d3576[_0x49314a(0x176)]||'',_0x7fb910=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x81d5a8={};const _0x1d4691=_0x1d9748[_0x49314a(0x6b6)](_0x7fb910);if(_0x1d4691)for(const _0x3c1fed of _0x1d4691){_0x3c1fed[_0x49314a(0x6b6)](_0x7fb910);const _0x4bf683=Number(RegExp['$1'])['clamp'](0x1,0x10),_0x5121e6=String(RegExp['$2'])[_0x49314a(0x34b)](',')[_0x49314a(0x752)](_0x40fe4e=>Number(_0x40fe4e)[_0x49314a(0xb7)](0x1,0x7));for(const _0x165c8f of _0x5121e6){_0x81d5a8[_0x165c8f]=_0x4bf683;}}this[_0x49314a(0xff)]=_0x81d5a8;},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0xae)]=function(){const _0x1c7011=_0x17e81a;if(this[_0x1c7011(0xff)]===undefined)this[_0x1c7011(0x55a)]();return this['_tileExtendTerrainTags'];},Game_Map[_0x17e81a(0x44d)]['isTileExtended']=function(_0x1e3047){const _0x2d4622=_0x17e81a;if(_0x1e3047>=0x400)return![];const _0x1ce5ac=$gameMap['getTileExtendTerrainTags']();if(Object[_0x2d4622(0x4b9)](_0x1ce5ac)[_0x2d4622(0x4b4)]<=0x0)return![];const _0x404bcb=this[_0x2d4622(0x343)](),_0x1f8606=_0x404bcb[_0x1e3047]>>0xc,_0x3c5de1=_0x1ce5ac[_0x1f8606]||0x0;return _0x3c5de1>0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x806)]=Game_Map['prototype'][_0x17e81a(0x2ed)],Game_Map['prototype'][_0x17e81a(0x2ed)]=function(_0x1e1dbc){const _0xba918b=_0x17e81a;VisuMZ[_0xba918b(0x1a7)]['Game_Map_changeTileset'][_0xba918b(0x65e)](this,_0x1e1dbc),this[_0xba918b(0x6d4)](),SceneManager[_0xba918b(0x116)][_0xba918b(0x552)]['update']();},Game_Map[_0x17e81a(0x44d)]['refreshSpritesetForExtendedTiles']=function(){const _0x2e71db=_0x17e81a,_0x12bc07=this['getTileExtendTerrainTags']();if(Object[_0x2e71db(0x4b9)](_0x12bc07)[_0x2e71db(0x4b4)]<=0x0)return;const _0x3b012c=SceneManager[_0x2e71db(0x116)][_0x2e71db(0x552)];_0x3b012c&&(_0x3b012c['removeTileExtendSprites']&&_0x3b012c[_0x2e71db(0x784)](),_0x3b012c[_0x2e71db(0x3a5)]&&_0x3b012c[_0x2e71db(0x3a5)]());},VisuMZ['CoreEngine'][_0x17e81a(0x12a)]=Game_Character['prototype'][_0x17e81a(0x4b8)],Game_Character[_0x17e81a(0x44d)][_0x17e81a(0x4b8)]=function(_0x3d3e40){const _0x339697=_0x17e81a;try{VisuMZ['CoreEngine'][_0x339697(0x12a)][_0x339697(0x65e)](this,_0x3d3e40);}catch(_0x35bdec){if($gameTemp[_0x339697(0x6d5)]())console[_0x339697(0x7dd)](_0x35bdec);}},Game_Player[_0x17e81a(0x44d)][_0x17e81a(0x579)]=function(){const _0x4c4b48=_0x17e81a,_0xcd586b=$gameMap[_0x4c4b48(0x29e)]();this[_0x4c4b48(0x7fd)]=Math['randomInt'](_0xcd586b)+Math[_0x4c4b48(0x50e)](_0xcd586b)+this[_0x4c4b48(0x127)]();},Game_Player[_0x17e81a(0x44d)][_0x17e81a(0x127)]=function(){const _0x3fec66=_0x17e81a;return $dataMap&&$dataMap['note']&&$dataMap['note'][_0x3fec66(0x6b6)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x3fec66(0x1a7)][_0x3fec66(0x26d)]['QoL'][_0x3fec66(0x4a8)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x351)]=Game_Event[_0x17e81a(0x44d)][_0x17e81a(0x635)],Game_Event['prototype'][_0x17e81a(0x635)]=function(_0x3c5b05,_0x2e4f1c){const _0x168158=_0x17e81a;return this[_0x168158(0xd9)]()?this[_0x168158(0x500)](_0x3c5b05,_0x2e4f1c):VisuMZ[_0x168158(0x1a7)][_0x168158(0x351)][_0x168158(0x65e)](this,_0x3c5b05,_0x2e4f1c);},Game_Event[_0x17e81a(0x44d)][_0x17e81a(0xd9)]=function(){const _0x5de95b=_0x17e81a;return VisuMZ[_0x5de95b(0x1a7)]['Settings']['QoL'][_0x5de95b(0x58d)];},Game_Event['prototype']['checkSmartEventCollision']=function(_0x1e337b,_0x187eb0){const _0x220356=_0x17e81a;if(!this['isNormalPriority']())return![];else{const _0x4fc2f2=$gameMap[_0x220356(0x2cf)](_0x1e337b,_0x187eb0)[_0x220356(0x23b)](_0x38176f=>_0x38176f['isNormalPriority']());return _0x4fc2f2[_0x220356(0x4b4)]>0x0;}},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x523)]=Game_Interpreter[_0x17e81a(0x44d)][_0x17e81a(0x805)],Game_Interpreter['prototype'][_0x17e81a(0x805)]=function(_0x92545d){const _0x357c32=_0x17e81a,_0x171f74=this[_0x357c32(0x693)]();return _0x171f74['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x357c32(0x17d)](_0x171f74):VisuMZ['CoreEngine'][_0x357c32(0x523)][_0x357c32(0x65e)](this,_0x92545d);},Game_Interpreter[_0x17e81a(0x44d)][_0x17e81a(0x693)]=function(){const _0x268a81=_0x17e81a;let _0x7c860c='',_0x3af93e=this['_index']+0x1;while(this[_0x268a81(0x60e)][_0x3af93e]&&this[_0x268a81(0x60e)][_0x3af93e][_0x268a81(0x52f)]===0x195){_0x7c860c+=this[_0x268a81(0x60e)][_0x3af93e]['parameters'][0x0]+'\x0a',_0x3af93e++;}return _0x7c860c;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x16d155){const _0xf52b09=_0x17e81a;try{eval(_0x16d155);}catch(_0x303c72){$gameTemp[_0xf52b09(0x6d5)]()&&(console[_0xf52b09(0x7dd)](_0xf52b09(0x266)),console[_0xf52b09(0x7dd)](_0x303c72));}return!![];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x85c)]=Game_Interpreter[_0x17e81a(0x44d)]['command111'],Game_Interpreter['prototype'][_0x17e81a(0x230)]=function(_0x8a7643){const _0x13eeed=_0x17e81a;try{VisuMZ[_0x13eeed(0x1a7)][_0x13eeed(0x85c)][_0x13eeed(0x65e)](this,_0x8a7643);}catch(_0x2294a0){$gameTemp['isPlaytest']()&&(console[_0x13eeed(0x7dd)](_0x13eeed(0x7ec)),console['log'](_0x2294a0)),this[_0x13eeed(0x522)]();}return!![];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x525)]=Game_Interpreter[_0x17e81a(0x44d)][_0x17e81a(0x2d3)],Game_Interpreter['prototype'][_0x17e81a(0x2d3)]=function(_0x3c29c0){const _0x1aee16=_0x17e81a;try{VisuMZ[_0x1aee16(0x1a7)]['Game_Interpreter_command122'][_0x1aee16(0x65e)](this,_0x3c29c0);}catch(_0x291a6c){$gameTemp[_0x1aee16(0x6d5)]()&&(console[_0x1aee16(0x7dd)](_0x1aee16(0x287)),console[_0x1aee16(0x7dd)](_0x291a6c));}return!![];},VisuMZ['CoreEngine'][_0x17e81a(0x122)]=Game_Interpreter[_0x17e81a(0x44d)][_0x17e81a(0x33b)],Game_Interpreter['prototype'][_0x17e81a(0x33b)]=function(){const _0x54e54e=_0x17e81a;try{VisuMZ[_0x54e54e(0x1a7)]['Game_Interpreter_command355']['call'](this);}catch(_0x28cf39){$gameTemp[_0x54e54e(0x6d5)]()&&(console['log'](_0x54e54e(0xc0)),console['log'](_0x28cf39));}return!![];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x2ce)]=Game_Interpreter[_0x17e81a(0x44d)][_0x17e81a(0x4ed)],Game_Interpreter[_0x17e81a(0x44d)]['command357']=function(_0x14c4f0){const _0x20624a=_0x17e81a;return $gameTemp[_0x20624a(0x616)](this),VisuMZ[_0x20624a(0x1a7)][_0x20624a(0x2ce)][_0x20624a(0x65e)](this,_0x14c4f0);},Scene_Base['prototype'][_0x17e81a(0x79a)]=function(){const _0x4bd8c4=_0x17e81a;return VisuMZ[_0x4bd8c4(0x1a7)]['Settings']['UI']['FadeSpeed'];},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x55f)]=function(){const _0x48a39f=_0x17e81a;return VisuMZ[_0x48a39f(0x1a7)][_0x48a39f(0x26d)]['UI']['BottomHelp'];},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x64b)]=function(){const _0x5460bc=_0x17e81a;return VisuMZ[_0x5460bc(0x1a7)][_0x5460bc(0x26d)]['UI'][_0x5460bc(0x5a0)];},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x5d6)]=function(){const _0x3f670d=_0x17e81a;return VisuMZ[_0x3f670d(0x1a7)]['Settings']['UI'][_0x3f670d(0xc4)];},Scene_Base['prototype'][_0x17e81a(0x18f)]=function(){const _0x509bf6=_0x17e81a;return VisuMZ[_0x509bf6(0x1a7)][_0x509bf6(0x26d)]['UI'][_0x509bf6(0x1ee)];},Scene_Base[_0x17e81a(0x44d)]['buttonAreaHeight']=function(){const _0x4929a8=_0x17e81a;return VisuMZ[_0x4929a8(0x1a7)]['Settings']['UI'][_0x4929a8(0x865)];},Scene_Base[_0x17e81a(0x44d)]['isWindowMaskingEnabled']=function(){const _0x45c6e0=_0x17e81a;return VisuMZ[_0x45c6e0(0x1a7)][_0x45c6e0(0x26d)]['Window'][_0x45c6e0(0x741)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x52a)]=Scene_Base['prototype'][_0x17e81a(0x7e0)],Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x7e0)]=function(){const _0x589eea=_0x17e81a;VisuMZ['CoreEngine'][_0x589eea(0x52a)][_0x589eea(0x65e)](this),this[_0x589eea(0x796)](),this['createTextPopupWindow'](),this[_0x589eea(0x3b6)]['x']=Math[_0x589eea(0x397)](this['_windowLayer']['x']),this['_windowLayer']['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base['prototype']['createButtonAssistWindow']=function(){},Scene_Base[_0x17e81a(0x44d)]['createTextPopupWindow']=function(){const _0x4892bd=_0x17e81a;this[_0x4892bd(0x681)]=new Window_TextPopup(),this['addChild'](this[_0x4892bd(0x681)]);},$textPopup=function(_0x4d7ec6){const _0x23558d=_0x17e81a,_0x27689c=SceneManager[_0x23558d(0x116)]['_textPopupWindow'];_0x27689c&&_0x27689c[_0x23558d(0x18a)](_0x4d7ec6);},Scene_Base[_0x17e81a(0x44d)]['buttonAssistKey1']=function(){const _0x137e53=_0x17e81a;return TextManager[_0x137e53(0x4ae)](_0x137e53(0x5d4),_0x137e53(0x1b0));},Scene_Base['prototype'][_0x17e81a(0x3f7)]=function(){const _0x3e8adb=_0x17e81a;return TextManager['getInputButtonString'](_0x3e8adb(0x588));},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x452)]=function(){const _0x492b88=_0x17e81a;return TextManager[_0x492b88(0x777)](_0x492b88(0x1bb));},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x2b9)]=function(){const _0x230e59=_0x17e81a;return TextManager[_0x230e59(0x777)]('ok');},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x37b)]=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x429)]=function(){const _0x5cfe8d=_0x17e81a;return this['_pageupButton']&&this['_pageupButton'][_0x5cfe8d(0x366)]?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x66e)]=function(){return'';},Scene_Base[_0x17e81a(0x44d)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x759)]=function(){return TextManager['buttonAssistOk'];},Scene_Base['prototype']['buttonAssistText5']=function(){const _0x30c9a3=_0x17e81a;return TextManager[_0x30c9a3(0x78c)];},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x3d2)]=function(){return 0x0;},Scene_Base['prototype'][_0x17e81a(0x284)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x70f)]=function(){return 0x0;},Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x4eb)]=function(){return 0x0;},VisuMZ[_0x17e81a(0x1a7)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x7cc)],Scene_Boot[_0x17e81a(0x44d)]['loadSystemImages']=function(){const _0x2eb3a5=_0x17e81a;VisuMZ[_0x2eb3a5(0x1a7)][_0x2eb3a5(0x64e)]['call'](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x2db)]=function(){const _0x3fa201=_0x17e81a,_0x20971b=[_0x3fa201(0x7a5),_0x3fa201(0x475),'battlebacks2',_0x3fa201(0xe8),'enemies',_0x3fa201(0x4e2),_0x3fa201(0xd3),_0x3fa201(0x39f),_0x3fa201(0x455),_0x3fa201(0x6ce),_0x3fa201(0x815),'tilesets',_0x3fa201(0x17f),_0x3fa201(0xd8)];for(const _0x42873a of _0x20971b){const _0x5cd575=VisuMZ[_0x3fa201(0x1a7)][_0x3fa201(0x26d)][_0x3fa201(0x65f)][_0x42873a],_0x5af710=_0x3fa201(0x787)['format'](_0x42873a);for(const _0x4413e5 of _0x5cd575){ImageManager[_0x3fa201(0x1ef)](_0x5af710,_0x4413e5);}}},VisuMZ[_0x17e81a(0x1a7)]['Scene_Boot_startNormalGame']=Scene_Boot['prototype'][_0x17e81a(0x838)],Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x838)]=function(){const _0x58915c=_0x17e81a;Utils[_0x58915c(0x3b0)](_0x58915c(0x5fd))&&VisuMZ[_0x58915c(0x1a7)][_0x58915c(0x26d)][_0x58915c(0x51f)][_0x58915c(0x312)]?this[_0x58915c(0x653)]():VisuMZ['CoreEngine'][_0x58915c(0x803)][_0x58915c(0x65e)](this);},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x653)]=function(){const _0x45aeb2=_0x17e81a;this['checkPlayerLocation'](),DataManager[_0x45aeb2(0x275)](),SceneManager[_0x45aeb2(0x4e4)](Scene_Map);},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x4aa)]=function(){const _0x4ae663=_0x17e81a,_0x482199=$dataSystem['advanced'][_0x4ae663(0x18b)],_0x37a820=$dataSystem[_0x4ae663(0x611)][_0x4ae663(0x684)],_0x1e214e=VisuMZ[_0x4ae663(0x1a7)][_0x4ae663(0x26d)]['UI'][_0x4ae663(0x5ba)];Graphics[_0x4ae663(0x404)]=_0x482199-_0x1e214e*0x2,Graphics['boxHeight']=_0x37a820-_0x1e214e*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x4d5)]=Scene_Boot['prototype'][_0x17e81a(0x21e)],Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x21e)]=function(){const _0x3ad5a9=_0x17e81a;this[_0x3ad5a9(0x72b)]()?this[_0x3ad5a9(0x665)]():VisuMZ[_0x3ad5a9(0x1a7)][_0x3ad5a9(0x4d5)]['call'](this);},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x72b)]=function(){const _0x5bd527=_0x17e81a;if(Scene_Title[_0x5bd527(0x236)]==='')return![];if(Scene_Title['subtitle']===_0x5bd527(0x4d8))return![];if(Scene_Title[_0x5bd527(0x53c)]==='')return![];if(Scene_Title['version']===_0x5bd527(0x774))return![];return!![];},Scene_Boot['prototype'][_0x17e81a(0x665)]=function(){const _0x4d1f66=_0x17e81a,_0x1dfbc8=$dataSystem[_0x4d1f66(0x4ad)],_0xbe136=Scene_Title[_0x4d1f66(0x236)]||'',_0x524c6e=Scene_Title[_0x4d1f66(0x53c)]||'',_0x2752c1=VisuMZ[_0x4d1f66(0x1a7)][_0x4d1f66(0x26d)][_0x4d1f66(0x642)][_0x4d1f66(0x1f9)][_0x4d1f66(0x607)],_0x10621e=_0x2752c1[_0x4d1f66(0x51e)](_0x1dfbc8,_0xbe136,_0x524c6e);document[_0x4d1f66(0x74f)]=_0x10621e;},Scene_Boot[_0x17e81a(0x44d)][_0x17e81a(0x3be)]=function(){const _0x4a9f92=_0x17e81a;if(VisuMZ[_0x4a9f92(0x1a7)][_0x4a9f92(0x26d)]['UI'][_0x4a9f92(0x123)]){const _0x61ffe3=Graphics[_0x4a9f92(0x107)]-Graphics[_0x4a9f92(0x404)]-VisuMZ[_0x4a9f92(0x1a7)][_0x4a9f92(0x26d)]['UI'][_0x4a9f92(0x5ba)]*0x2,_0x464854=Sprite_Button[_0x4a9f92(0x44d)][_0x4a9f92(0x736)][_0x4a9f92(0x65e)](this)*0x4;if(_0x61ffe3>=_0x464854)SceneManager[_0x4a9f92(0x40f)](!![]);}},Scene_Title[_0x17e81a(0x236)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x642)][_0x17e81a(0x1f9)][_0x17e81a(0x4d8)],Scene_Title[_0x17e81a(0x53c)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)]['MenuLayout'][_0x17e81a(0x1f9)][_0x17e81a(0x199)],Scene_Title[_0x17e81a(0x810)]=VisuMZ[_0x17e81a(0x1a7)]['Settings'][_0x17e81a(0x35f)],VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x280)]=Scene_Title[_0x17e81a(0x44d)]['drawGameTitle'],Scene_Title[_0x17e81a(0x44d)][_0x17e81a(0x6f6)]=function(){const _0x298fd5=_0x17e81a;VisuMZ[_0x298fd5(0x1a7)]['Settings']['MenuLayout'][_0x298fd5(0x1f9)][_0x298fd5(0x6f6)][_0x298fd5(0x65e)](this);if(Scene_Title[_0x298fd5(0x236)]!==''&&Scene_Title[_0x298fd5(0x236)]!==_0x298fd5(0x4d8))this[_0x298fd5(0x422)]();if(Scene_Title['version']!==''&&Scene_Title[_0x298fd5(0x53c)]!==_0x298fd5(0x774))this[_0x298fd5(0x6a0)]();},Scene_Title['prototype'][_0x17e81a(0x422)]=function(){const _0x2ed5e4=_0x17e81a;VisuMZ[_0x2ed5e4(0x1a7)][_0x2ed5e4(0x26d)][_0x2ed5e4(0x642)][_0x2ed5e4(0x1f9)][_0x2ed5e4(0x422)][_0x2ed5e4(0x65e)](this);},Scene_Title['prototype'][_0x17e81a(0x6a0)]=function(){const _0x23792b=_0x17e81a;VisuMZ['CoreEngine'][_0x23792b(0x26d)][_0x23792b(0x642)]['Title'][_0x23792b(0x6a0)][_0x23792b(0x65e)](this);},Scene_Title['prototype'][_0x17e81a(0x2b7)]=function(){const _0x3bfca2=_0x17e81a;this[_0x3bfca2(0x7ff)]();const _0x51998b=$dataSystem[_0x3bfca2(0x73b)]['background'],_0x5b5ab9=this['commandWindowRect']();this[_0x3bfca2(0x29b)]=new Window_TitleCommand(_0x5b5ab9),this[_0x3bfca2(0x29b)]['setBackgroundType'](_0x51998b);const _0x5a180c=this[_0x3bfca2(0x71a)]();this['_commandWindow'][_0x3bfca2(0x527)](_0x5a180c['x'],_0x5a180c['y'],_0x5a180c['width'],_0x5a180c[_0x3bfca2(0x4a1)]),this[_0x3bfca2(0x29b)]['createContents'](),this[_0x3bfca2(0x29b)][_0x3bfca2(0x208)](),this[_0x3bfca2(0x29b)][_0x3bfca2(0x6e7)](),this['addWindow'](this[_0x3bfca2(0x29b)]);},Scene_Title[_0x17e81a(0x44d)][_0x17e81a(0x68d)]=function(){const _0x410bd0=_0x17e81a;return this[_0x410bd0(0x29b)]?this[_0x410bd0(0x29b)][_0x410bd0(0x1ed)]():VisuMZ[_0x410bd0(0x1a7)][_0x410bd0(0x26d)][_0x410bd0(0x66d)]['length'];},Scene_Title[_0x17e81a(0x44d)][_0x17e81a(0x71a)]=function(){const _0x28e741=_0x17e81a;return VisuMZ['CoreEngine']['Settings']['MenuLayout']['Title'][_0x28e741(0x782)][_0x28e741(0x65e)](this);},Scene_Title['prototype'][_0x17e81a(0x7ff)]=function(){for(const _0x3dc325 of Scene_Title['pictureButtons']){const _0x4e8dce=new Sprite_TitlePictureButton(_0x3dc325);this['addChild'](_0x4e8dce);}},VisuMZ['CoreEngine'][_0x17e81a(0x51a)]=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x103)],Scene_Map['prototype'][_0x17e81a(0x103)]=function(){const _0x2e095a=_0x17e81a;VisuMZ[_0x2e095a(0x1a7)][_0x2e095a(0x51a)][_0x2e095a(0x65e)](this),$gameTemp[_0x2e095a(0x200)](),this[_0x2e095a(0x229)]();},VisuMZ[_0x17e81a(0x1a7)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x206)],Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x206)]=function(){const _0x1c3379=_0x17e81a;VisuMZ[_0x1c3379(0x1a7)][_0x1c3379(0x768)][_0x1c3379(0x65e)](this),$gameTemp[_0x1c3379(0x6f3)]&&!$gameMessage['isBusy']()&&(this['updateMain'](),SceneManager['updateEffekseer']());},Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x2f8)]=function(){const _0x936097=_0x17e81a;Scene_Message[_0x936097(0x44d)]['terminate'][_0x936097(0x65e)](this),!SceneManager[_0x936097(0x79f)](Scene_Battle)&&(this[_0x936097(0x552)]['update'](),this[_0x936097(0xc5)][_0x936097(0x63c)](),this[_0x936097(0x3b6)]['visible']=![],SceneManager[_0x936097(0x2c3)]()),$gameScreen[_0x936097(0x5c2)](),this[_0x936097(0x229)]();},VisuMZ['CoreEngine'][_0x17e81a(0x7f9)]=Scene_Map[_0x17e81a(0x44d)]['createMenuButton'],Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x4bd)]=function(){const _0xcef950=_0x17e81a;VisuMZ['CoreEngine'][_0xcef950(0x7f9)][_0xcef950(0x65e)](this),SceneManager[_0xcef950(0x440)]()&&this[_0xcef950(0x5cf)]();},Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x5cf)]=function(){const _0x1d1941=_0x17e81a;this['_menuButton']['x']=Graphics[_0x1d1941(0x404)]+0x4;},VisuMZ[_0x17e81a(0x1a7)]['Scene_Map_updateScene']=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x4ac)],Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x4ac)]=function(){const _0x197ee2=_0x17e81a;VisuMZ[_0x197ee2(0x1a7)][_0x197ee2(0x67f)][_0x197ee2(0x65e)](this),this[_0x197ee2(0x5ea)]();},Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x5ea)]=function(){const _0x4de38b=_0x17e81a;Input[_0x4de38b(0x492)]('dashToggle')&&(ConfigManager[_0x4de38b(0x5c8)]=!ConfigManager[_0x4de38b(0x5c8)],ConfigManager[_0x4de38b(0x137)]());},VisuMZ[_0x17e81a(0x1a7)]['Scene_Map_updateMain']=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x3e5)],Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x3e5)]=function(){const _0x43b94c=_0x17e81a;VisuMZ[_0x43b94c(0x1a7)]['Scene_Map_updateMain'][_0x43b94c(0x65e)](this),this[_0x43b94c(0x80d)]();},Scene_Map['prototype'][_0x17e81a(0x229)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map['prototype'][_0x17e81a(0x80d)]=function(){const _0x21441e=_0x17e81a;if(!this['_onceParallelInterpreters'])return;for(const _0x53f484 of this[_0x21441e(0x652)]){_0x53f484&&_0x53f484['update']();}},Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x318)]=function(_0x173b57,_0x552ff7){const _0x198a18=_0x17e81a,_0x47c94e=$dataCommonEvents[_0x173b57];if(!_0x47c94e)return;const _0x3e46c6=new Game_OnceParallelInterpreter();this[_0x198a18(0x7a9)](_0x3e46c6),_0x3e46c6[_0x198a18(0xd2)](_0x173b57),_0x3e46c6[_0x198a18(0x739)](_0x552ff7);},Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x7a9)]=function(_0x9ff54){const _0x1b64ae=_0x17e81a;this[_0x1b64ae(0x652)]=this['_onceParallelInterpreters']||[],this[_0x1b64ae(0x652)][_0x1b64ae(0x189)](_0x9ff54);},Scene_Map[_0x17e81a(0x44d)]['removeOnceParallelInterpreter']=function(_0x798dea){const _0x2cc996=_0x17e81a;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0x2cc996(0x652)][_0x2cc996(0x723)](_0x798dea);};function Game_OnceParallelInterpreter(){const _0x4ed3a6=_0x17e81a;this[_0x4ed3a6(0x103)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x17e81a(0x6e1)](Game_Interpreter[_0x17e81a(0x44d)]),Game_OnceParallelInterpreter[_0x17e81a(0x44d)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x17e81a(0x44d)]['setCommonEvent']=function(_0x442fba){const _0x16df15=_0x17e81a,_0x36fb65=$dataCommonEvents[_0x442fba];_0x36fb65?this['setup'](_0x36fb65[_0x16df15(0x195)],0x0):this[_0x16df15(0x2f8)]();},Game_OnceParallelInterpreter[_0x17e81a(0x44d)][_0x17e81a(0x739)]=function(_0x2be990){const _0x5721f6=_0x17e81a;this[_0x5721f6(0x7ea)]=_0x2be990||0x0;},Game_OnceParallelInterpreter[_0x17e81a(0x44d)][_0x17e81a(0x2f8)]=function(){const _0x67149e=_0x17e81a;if(!SceneManager[_0x67149e(0x26e)]())return;SceneManager[_0x67149e(0x116)][_0x67149e(0x6a6)](this),Game_Interpreter[_0x67149e(0x44d)][_0x67149e(0x2f8)][_0x67149e(0x65e)](this);},VisuMZ[_0x17e81a(0x1a7)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x649)],Scene_MenuBase['prototype'][_0x17e81a(0x649)]=function(){const _0x5665f4=_0x17e81a;let _0x5e52ea=0x0;return SceneManager[_0x5665f4(0x7c9)]()?_0x5e52ea=this[_0x5665f4(0x742)]():_0x5e52ea=VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop'][_0x5665f4(0x65e)](this),_0x5e52ea;},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x742)]=function(){const _0x1e6a71=_0x17e81a;return this[_0x1e6a71(0x55f)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x4a2)]=Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x521)],Scene_MenuBase['prototype']['mainAreaTop']=function(){const _0x33a78d=_0x17e81a;return SceneManager[_0x33a78d(0x7c9)]()?this[_0x33a78d(0x2aa)]():VisuMZ[_0x33a78d(0x1a7)][_0x33a78d(0x4a2)][_0x33a78d(0x65e)](this);},Scene_MenuBase['prototype'][_0x17e81a(0x2aa)]=function(){const _0x2febe5=_0x17e81a;if(!this[_0x2febe5(0x55f)]())return this[_0x2febe5(0x1f8)]();else return this[_0x2febe5(0x79d)]()&&this[_0x2febe5(0x14f)]()===_0x2febe5(0x1c4)?Window_ButtonAssist[_0x2febe5(0x44d)]['lineHeight']():0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3b9)]=Scene_MenuBase['prototype'][_0x17e81a(0x7d5)],Scene_MenuBase['prototype']['mainAreaHeight']=function(){const _0x2494e7=_0x17e81a;let _0x3ab1af=0x0;return SceneManager[_0x2494e7(0x7c9)]()?_0x3ab1af=this[_0x2494e7(0x290)]():_0x3ab1af=VisuMZ[_0x2494e7(0x1a7)]['Scene_MenuBase_mainAreaHeight'][_0x2494e7(0x65e)](this),this['isMenuButtonAssistEnabled']()&&this[_0x2494e7(0x14f)]()!==_0x2494e7(0x537)&&(_0x3ab1af-=Window_ButtonAssist['prototype'][_0x2494e7(0x28c)]()),_0x3ab1af;},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x290)]=function(){const _0x2694cd=_0x17e81a;return Graphics[_0x2694cd(0x5e8)]-this[_0x2694cd(0x4fb)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x6dc)]=Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x3b1)],Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x3b1)]=function(){const _0x1084b9=_0x17e81a,_0x30e8d3=VisuMZ[_0x1084b9(0x1a7)][_0x1084b9(0x26d)]['MenuBg']['BlurStrength']??0x8;this[_0x1084b9(0x215)]=new PIXI[(_0x1084b9(0x4f5))]['BlurFilter'](_0x30e8d3),this[_0x1084b9(0x77d)]=new Sprite(),this[_0x1084b9(0x77d)]['bitmap']=SceneManager['backgroundBitmap'](),this[_0x1084b9(0x77d)][_0x1084b9(0x4f5)]=[this[_0x1084b9(0x215)]],this['addChild'](this[_0x1084b9(0x77d)]),this[_0x1084b9(0x204)](0xc0),this[_0x1084b9(0x204)](this[_0x1084b9(0x113)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x113)]=function(){const _0x58dd22=_0x17e81a,_0x54f274=String(this[_0x58dd22(0x666)][_0x58dd22(0x320)]),_0x3db0ef=this[_0x58dd22(0x748)](_0x54f274);return _0x3db0ef?_0x3db0ef['SnapshotOpacity']:0xc0;},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0xc1)]=function(){const _0x1c3a70=_0x17e81a,_0x140fbd=String(this[_0x1c3a70(0x666)][_0x1c3a70(0x320)]),_0x14a146=this[_0x1c3a70(0x748)](_0x140fbd);_0x14a146&&(_0x14a146[_0x1c3a70(0x25d)]!==''||_0x14a146[_0x1c3a70(0x5fa)]!=='')&&(this[_0x1c3a70(0x7ae)]=new Sprite(ImageManager[_0x1c3a70(0x57a)](_0x14a146[_0x1c3a70(0x25d)])),this[_0x1c3a70(0x221)]=new Sprite(ImageManager[_0x1c3a70(0x19c)](_0x14a146['BgFilename2'])),this[_0x1c3a70(0x487)](this[_0x1c3a70(0x7ae)]),this[_0x1c3a70(0x487)](this[_0x1c3a70(0x221)]),this[_0x1c3a70(0x7ae)][_0x1c3a70(0x313)][_0x1c3a70(0x7ba)](this[_0x1c3a70(0x2a1)][_0x1c3a70(0x309)](this,this['_backSprite1'])),this[_0x1c3a70(0x221)][_0x1c3a70(0x313)]['addLoadListener'](this[_0x1c3a70(0x2a1)][_0x1c3a70(0x309)](this,this[_0x1c3a70(0x221)])));},Scene_MenuBase['prototype']['getCustomBackgroundSettings']=function(_0x26bad7){const _0x25605f=_0x17e81a;return VisuMZ[_0x25605f(0x1a7)][_0x25605f(0x26d)][_0x25605f(0x61f)][_0x26bad7]||VisuMZ[_0x25605f(0x1a7)][_0x25605f(0x26d)][_0x25605f(0x61f)][_0x25605f(0x685)];},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x2a1)]=function(_0x2c5f63){const _0x13a10f=_0x17e81a;this[_0x13a10f(0x3b3)](_0x2c5f63),this[_0x13a10f(0x7f0)](_0x2c5f63);},VisuMZ['CoreEngine'][_0x17e81a(0x24d)]=Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x1b9)],Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x1b9)]=function(){const _0x3d0715=_0x17e81a;VisuMZ['CoreEngine'][_0x3d0715(0x24d)][_0x3d0715(0x65e)](this),SceneManager['isSideButtonLayout']()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x64d)]=function(){const _0x4fc6df=_0x17e81a;this[_0x4fc6df(0x185)]['x']=Graphics[_0x4fc6df(0x404)]+0x4;},VisuMZ[_0x17e81a(0x1a7)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x40e)],Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x40e)]=function(){const _0x536bf9=_0x17e81a;VisuMZ[_0x536bf9(0x1a7)]['Scene_MenuBase_createPageButtons'][_0x536bf9(0x65e)](this),SceneManager[_0x536bf9(0x440)]()&&this[_0x536bf9(0x2ee)]();},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x2ee)]=function(){const _0x30a838=_0x17e81a;this[_0x30a838(0x407)]['x']=-0x1*(this[_0x30a838(0x407)]['width']+this[_0x30a838(0x603)][_0x30a838(0x107)]+0x8),this[_0x30a838(0x603)]['x']=-0x1*(this[_0x30a838(0x603)]['width']+0x4);},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x79d)]=function(){const _0x43c936=_0x17e81a;return VisuMZ['CoreEngine'][_0x43c936(0x26d)][_0x43c936(0xd5)][_0x43c936(0x647)];},Scene_MenuBase['prototype'][_0x17e81a(0x14f)]=function(){const _0x578fe6=_0x17e81a;return SceneManager[_0x578fe6(0x440)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x578fe6(0x1a7)][_0x578fe6(0x26d)][_0x578fe6(0xd5)][_0x578fe6(0x84e)]:'button';},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x796)]=function(){const _0x5b6da4=_0x17e81a;if(!this[_0x5b6da4(0x79d)]())return;const _0x42c291=this[_0x5b6da4(0x659)]();this[_0x5b6da4(0x3ab)]=new Window_ButtonAssist(_0x42c291),this[_0x5b6da4(0x1b7)](this[_0x5b6da4(0x3ab)]);},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x659)]=function(){const _0x42ffc0=_0x17e81a;return this['getButtonAssistLocation']()===_0x42ffc0(0x537)?this[_0x42ffc0(0x781)]():this[_0x42ffc0(0x87e)]();},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x781)]=function(){const _0x2c883e=_0x17e81a,_0x187aab=ConfigManager[_0x2c883e(0x288)]?(Sprite_Button[_0x2c883e(0x44d)][_0x2c883e(0x736)]()+0x6)*0x2:0x0,_0x2e9a14=this['buttonY'](),_0x3bc36f=Graphics['boxWidth']-_0x187aab*0x2,_0x9da75f=this['buttonAreaHeight']();return new Rectangle(_0x187aab,_0x2e9a14,_0x3bc36f,_0x9da75f);},Scene_MenuBase[_0x17e81a(0x44d)][_0x17e81a(0x87e)]=function(){const _0x4b9e87=_0x17e81a,_0x40581d=Graphics[_0x4b9e87(0x404)],_0x18f1d8=Window_ButtonAssist['prototype']['lineHeight'](),_0x1f5d07=0x0;let _0x43ef65=0x0;return this[_0x4b9e87(0x14f)]()===_0x4b9e87(0x1c4)?_0x43ef65=0x0:_0x43ef65=Graphics['boxHeight']-_0x18f1d8,new Rectangle(_0x1f5d07,_0x43ef65,_0x40581d,_0x18f1d8);},Scene_Menu[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)]['MenuLayout']['MainMenu'],VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x6bd)]=Scene_Menu[_0x17e81a(0x44d)][_0x17e81a(0x6e1)],Scene_Menu[_0x17e81a(0x44d)]['create']=function(){const _0x9f82f3=_0x17e81a;VisuMZ[_0x9f82f3(0x1a7)][_0x9f82f3(0x6bd)][_0x9f82f3(0x65e)](this),this[_0x9f82f3(0x4c1)]();},Scene_Menu[_0x17e81a(0x44d)][_0x17e81a(0x4c1)]=function(){const _0x384cff=_0x17e81a;this['_commandWindow']&&this[_0x384cff(0x29b)][_0x384cff(0x1d6)](Scene_Menu[_0x384cff(0x1e1)][_0x384cff(0x1c9)]),this[_0x384cff(0x861)]&&this[_0x384cff(0x861)][_0x384cff(0x1d6)](Scene_Menu['layoutSettings'][_0x384cff(0x73a)]),this[_0x384cff(0x634)]&&this['_statusWindow'][_0x384cff(0x1d6)](Scene_Menu[_0x384cff(0x1e1)]['StatusBgType']);},Scene_Menu['prototype'][_0x17e81a(0x71a)]=function(){const _0x4bb466=_0x17e81a;return Scene_Menu[_0x4bb466(0x1e1)][_0x4bb466(0x782)][_0x4bb466(0x65e)](this);},Scene_Menu['prototype']['goldWindowRect']=function(){const _0x33b4d6=_0x17e81a;return Scene_Menu[_0x33b4d6(0x1e1)][_0x33b4d6(0x3ea)][_0x33b4d6(0x65e)](this);},Scene_Menu['prototype'][_0x17e81a(0x31b)]=function(){const _0x4baf39=_0x17e81a;return Scene_Menu['layoutSettings'][_0x4baf39(0x2f4)]['call'](this);},Scene_Item[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x642)][_0x17e81a(0x431)],VisuMZ['CoreEngine']['Scene_Item_create']=Scene_Item[_0x17e81a(0x44d)]['create'],Scene_Item['prototype'][_0x17e81a(0x6e1)]=function(){const _0x3c1a60=_0x17e81a;VisuMZ[_0x3c1a60(0x1a7)][_0x3c1a60(0xa1)]['call'](this),this[_0x3c1a60(0x4c1)]();},Scene_Item['prototype'][_0x17e81a(0x4c1)]=function(){const _0x58e116=_0x17e81a;this[_0x58e116(0x27c)]&&this[_0x58e116(0x27c)]['setBackgroundType'](Scene_Item[_0x58e116(0x1e1)][_0x58e116(0x84d)]),this[_0x58e116(0x66b)]&&this[_0x58e116(0x66b)][_0x58e116(0x1d6)](Scene_Item['layoutSettings'][_0x58e116(0x6ab)]),this[_0x58e116(0x258)]&&this[_0x58e116(0x258)][_0x58e116(0x1d6)](Scene_Item[_0x58e116(0x1e1)][_0x58e116(0x45b)]),this['_actorWindow']&&this['_actorWindow'][_0x58e116(0x1d6)](Scene_Item[_0x58e116(0x1e1)][_0x58e116(0x560)]);},Scene_Item[_0x17e81a(0x44d)][_0x17e81a(0x24a)]=function(){const _0x5b5b99=_0x17e81a;return Scene_Item[_0x5b5b99(0x1e1)][_0x5b5b99(0x672)][_0x5b5b99(0x65e)](this);},Scene_Item[_0x17e81a(0x44d)][_0x17e81a(0x5e1)]=function(){const _0x55b29f=_0x17e81a;return Scene_Item[_0x55b29f(0x1e1)][_0x55b29f(0x3bb)][_0x55b29f(0x65e)](this);},Scene_Item[_0x17e81a(0x44d)][_0x17e81a(0xc2)]=function(){const _0x4f2a7a=_0x17e81a;return Scene_Item[_0x4f2a7a(0x1e1)][_0x4f2a7a(0x714)][_0x4f2a7a(0x65e)](this);},Scene_Item[_0x17e81a(0x44d)]['actorWindowRect']=function(){const _0x141167=_0x17e81a;return Scene_Item[_0x141167(0x1e1)][_0x141167(0x67d)][_0x141167(0x65e)](this);},Scene_Skill[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x642)]['SkillMenu'],VisuMZ[_0x17e81a(0x1a7)]['Scene_Skill_create']=Scene_Skill[_0x17e81a(0x44d)][_0x17e81a(0x6e1)],Scene_Skill[_0x17e81a(0x44d)][_0x17e81a(0x6e1)]=function(){const _0x38967c=_0x17e81a;VisuMZ[_0x38967c(0x1a7)][_0x38967c(0x53d)][_0x38967c(0x65e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2f0b48=_0x17e81a;this[_0x2f0b48(0x27c)]&&this['_helpWindow'][_0x2f0b48(0x1d6)](Scene_Skill[_0x2f0b48(0x1e1)][_0x2f0b48(0x84d)]),this[_0x2f0b48(0x438)]&&this['_skillTypeWindow'][_0x2f0b48(0x1d6)](Scene_Skill['layoutSettings'][_0x2f0b48(0x2fd)]),this[_0x2f0b48(0x634)]&&this[_0x2f0b48(0x634)][_0x2f0b48(0x1d6)](Scene_Skill['layoutSettings'][_0x2f0b48(0x5e5)]),this[_0x2f0b48(0x258)]&&this[_0x2f0b48(0x258)]['setBackgroundType'](Scene_Skill[_0x2f0b48(0x1e1)][_0x2f0b48(0x45b)]),this[_0x2f0b48(0x405)]&&this[_0x2f0b48(0x405)][_0x2f0b48(0x1d6)](Scene_Skill[_0x2f0b48(0x1e1)]['ActorBgType']);},Scene_Skill['prototype'][_0x17e81a(0x24a)]=function(){const _0x132c37=_0x17e81a;return Scene_Skill[_0x132c37(0x1e1)][_0x132c37(0x672)][_0x132c37(0x65e)](this);},Scene_Skill[_0x17e81a(0x44d)][_0x17e81a(0x62a)]=function(){const _0x199967=_0x17e81a;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0x199967(0x65e)](this);},Scene_Skill[_0x17e81a(0x44d)][_0x17e81a(0x31b)]=function(){const _0x466efe=_0x17e81a;return Scene_Skill['layoutSettings'][_0x466efe(0x2f4)][_0x466efe(0x65e)](this);},Scene_Skill[_0x17e81a(0x44d)][_0x17e81a(0xc2)]=function(){const _0x2ea910=_0x17e81a;return Scene_Skill[_0x2ea910(0x1e1)]['ItemRect']['call'](this);},Scene_Skill[_0x17e81a(0x44d)]['actorWindowRect']=function(){const _0x5042cd=_0x17e81a;return Scene_Skill[_0x5042cd(0x1e1)][_0x5042cd(0x67d)]['call'](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x642)][_0x17e81a(0xd0)],VisuMZ['CoreEngine'][_0x17e81a(0x6b9)]=Scene_Equip[_0x17e81a(0x44d)][_0x17e81a(0x6e1)],Scene_Equip['prototype'][_0x17e81a(0x6e1)]=function(){const _0x3ef43b=_0x17e81a;VisuMZ[_0x3ef43b(0x1a7)][_0x3ef43b(0x6b9)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x17e81a(0x44d)][_0x17e81a(0x4c1)]=function(){const _0x240122=_0x17e81a;this[_0x240122(0x27c)]&&this[_0x240122(0x27c)][_0x240122(0x1d6)](Scene_Equip[_0x240122(0x1e1)][_0x240122(0x84d)]),this[_0x240122(0x634)]&&this['_statusWindow'][_0x240122(0x1d6)](Scene_Equip['layoutSettings'][_0x240122(0x5e5)]),this[_0x240122(0x29b)]&&this[_0x240122(0x29b)][_0x240122(0x1d6)](Scene_Equip[_0x240122(0x1e1)]['CommandBgType']),this[_0x240122(0x4c9)]&&this[_0x240122(0x4c9)][_0x240122(0x1d6)](Scene_Equip[_0x240122(0x1e1)][_0x240122(0x14d)]),this[_0x240122(0x258)]&&this[_0x240122(0x258)][_0x240122(0x1d6)](Scene_Equip[_0x240122(0x1e1)]['ItemBgType']);},Scene_Equip[_0x17e81a(0x44d)]['helpWindowRect']=function(){const _0xa82381=_0x17e81a;return Scene_Equip[_0xa82381(0x1e1)][_0xa82381(0x672)][_0xa82381(0x65e)](this);},Scene_Equip[_0x17e81a(0x44d)][_0x17e81a(0x31b)]=function(){const _0x5f3c8a=_0x17e81a;return Scene_Equip[_0x5f3c8a(0x1e1)][_0x5f3c8a(0x2f4)][_0x5f3c8a(0x65e)](this);},Scene_Equip[_0x17e81a(0x44d)][_0x17e81a(0x71a)]=function(){const _0x155827=_0x17e81a;return Scene_Equip[_0x155827(0x1e1)][_0x155827(0x782)][_0x155827(0x65e)](this);},Scene_Equip['prototype']['slotWindowRect']=function(){const _0x449203=_0x17e81a;return Scene_Equip['layoutSettings'][_0x449203(0x3c8)][_0x449203(0x65e)](this);},Scene_Equip[_0x17e81a(0x44d)][_0x17e81a(0xc2)]=function(){const _0x39c28a=_0x17e81a;return Scene_Equip['layoutSettings'][_0x39c28a(0x714)][_0x39c28a(0x65e)](this);},Scene_Status[_0x17e81a(0x1e1)]=VisuMZ['CoreEngine'][_0x17e81a(0x26d)][_0x17e81a(0x642)]['StatusMenu'],VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x1e2)]=Scene_Status[_0x17e81a(0x44d)][_0x17e81a(0x6e1)],Scene_Status[_0x17e81a(0x44d)][_0x17e81a(0x6e1)]=function(){const _0x1a48e8=_0x17e81a;VisuMZ[_0x1a48e8(0x1a7)][_0x1a48e8(0x1e2)][_0x1a48e8(0x65e)](this),this[_0x1a48e8(0x4c1)]();},Scene_Status[_0x17e81a(0x44d)][_0x17e81a(0x4c1)]=function(){const _0xf55556=_0x17e81a;this[_0xf55556(0x591)]&&this['_profileWindow'][_0xf55556(0x1d6)](Scene_Status['layoutSettings'][_0xf55556(0xb0)]),this[_0xf55556(0x634)]&&this[_0xf55556(0x634)][_0xf55556(0x1d6)](Scene_Status[_0xf55556(0x1e1)][_0xf55556(0x5e5)]),this[_0xf55556(0xb5)]&&this['_statusParamsWindow'][_0xf55556(0x1d6)](Scene_Status[_0xf55556(0x1e1)][_0xf55556(0x474)]),this[_0xf55556(0x5b5)]&&this[_0xf55556(0x5b5)][_0xf55556(0x1d6)](Scene_Status[_0xf55556(0x1e1)][_0xf55556(0x329)]);},Scene_Status[_0x17e81a(0x44d)]['profileWindowRect']=function(){const _0x4aa0ea=_0x17e81a;return Scene_Status[_0x4aa0ea(0x1e1)][_0x4aa0ea(0x1c2)][_0x4aa0ea(0x65e)](this);},Scene_Status['prototype']['statusWindowRect']=function(){const _0x515143=_0x17e81a;return Scene_Status['layoutSettings'][_0x515143(0x2f4)][_0x515143(0x65e)](this);},Scene_Status[_0x17e81a(0x44d)][_0x17e81a(0x30d)]=function(){const _0x4da1ab=_0x17e81a;return Scene_Status[_0x4da1ab(0x1e1)][_0x4da1ab(0x6ca)]['call'](this);},Scene_Status[_0x17e81a(0x44d)]['statusEquipWindowRect']=function(){const _0x1f2746=_0x17e81a;return Scene_Status['layoutSettings'][_0x1f2746(0x138)][_0x1f2746(0x65e)](this);},Scene_Options[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x642)][_0x17e81a(0x771)],VisuMZ['CoreEngine'][_0x17e81a(0x608)]=Scene_Options[_0x17e81a(0x44d)][_0x17e81a(0x6e1)],Scene_Options[_0x17e81a(0x44d)][_0x17e81a(0x6e1)]=function(){const _0x184da1=_0x17e81a;VisuMZ[_0x184da1(0x1a7)]['Scene_Options_create'][_0x184da1(0x65e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x17e81a(0x44d)]['setCoreEngineUpdateWindowBg']=function(){const _0x5d92a8=_0x17e81a;this[_0x5d92a8(0x526)]&&this['_optionsWindow'][_0x5d92a8(0x1d6)](Scene_Options[_0x5d92a8(0x1e1)]['OptionsBgType']);},Scene_Options[_0x17e81a(0x44d)][_0x17e81a(0x2a9)]=function(){const _0x1b187f=_0x17e81a;return Scene_Options[_0x1b187f(0x1e1)]['OptionsRect']['call'](this);},Scene_Save[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x642)][_0x17e81a(0x4fd)],Scene_Save[_0x17e81a(0x44d)][_0x17e81a(0x6e1)]=function(){const _0x28ce02=_0x17e81a;Scene_File[_0x28ce02(0x44d)][_0x28ce02(0x6e1)][_0x28ce02(0x65e)](this),this[_0x28ce02(0x4c1)]();},Scene_Save[_0x17e81a(0x44d)][_0x17e81a(0x4c1)]=function(){const _0x5c5f0a=_0x17e81a;this[_0x5c5f0a(0x27c)]&&this[_0x5c5f0a(0x27c)][_0x5c5f0a(0x1d6)](Scene_Save['layoutSettings'][_0x5c5f0a(0x84d)]),this[_0x5c5f0a(0x9f)]&&this[_0x5c5f0a(0x9f)][_0x5c5f0a(0x1d6)](Scene_Save['layoutSettings'][_0x5c5f0a(0x3f0)]);},Scene_Save[_0x17e81a(0x44d)][_0x17e81a(0x24a)]=function(){const _0xeee2f1=_0x17e81a;return Scene_Save['layoutSettings'][_0xeee2f1(0x672)][_0xeee2f1(0x65e)](this);},Scene_Save[_0x17e81a(0x44d)]['listWindowRect']=function(){const _0x4afc84=_0x17e81a;return Scene_Save[_0x4afc84(0x1e1)][_0x4afc84(0x136)][_0x4afc84(0x65e)](this);},Scene_Load[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)]['Settings']['MenuLayout'][_0x17e81a(0x1b1)],Scene_Load[_0x17e81a(0x44d)][_0x17e81a(0x6e1)]=function(){Scene_File['prototype']['create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x17e81a(0x44d)][_0x17e81a(0x4c1)]=function(){const _0x2fb92d=_0x17e81a;this['_helpWindow']&&this[_0x2fb92d(0x27c)][_0x2fb92d(0x1d6)](Scene_Load[_0x2fb92d(0x1e1)][_0x2fb92d(0x84d)]),this['_listWindow']&&this['_listWindow'][_0x2fb92d(0x1d6)](Scene_Load[_0x2fb92d(0x1e1)][_0x2fb92d(0x3f0)]);},Scene_Load['prototype'][_0x17e81a(0x24a)]=function(){const _0x5b97d0=_0x17e81a;return Scene_Load[_0x5b97d0(0x1e1)][_0x5b97d0(0x672)][_0x5b97d0(0x65e)](this);},Scene_Load[_0x17e81a(0x44d)][_0x17e81a(0x7c5)]=function(){const _0x248e60=_0x17e81a;return Scene_Load[_0x248e60(0x1e1)][_0x248e60(0x136)]['call'](this);};function Scene_QuickLoad(){const _0x261d60=_0x17e81a;this[_0x261d60(0x103)](...arguments);}Scene_QuickLoad['prototype']=Object[_0x17e81a(0x6e1)](Scene_Load['prototype']),Scene_QuickLoad['prototype'][_0x17e81a(0x666)]=Scene_QuickLoad,Scene_QuickLoad[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(){const _0x1d4db0=_0x17e81a;Scene_Load['prototype'][_0x1d4db0(0x103)][_0x1d4db0(0x65e)](this);},Scene_QuickLoad[_0x17e81a(0x44d)][_0x17e81a(0x6e1)]=function(){const _0x367653=_0x17e81a;this['executeLoad'](this[_0x367653(0x78d)]);},Scene_QuickLoad[_0x17e81a(0x44d)]['prepare']=function(_0x1a7ae9){const _0x4acc2d=_0x17e81a;this[_0x4acc2d(0x78d)]=_0x1a7ae9;},Scene_QuickLoad['prototype'][_0x17e81a(0x3c9)]=function(){const _0x56d698=_0x17e81a;Scene_MenuBase[_0x56d698(0x44d)][_0x56d698(0x3c9)]['call'](this);},Scene_GameEnd[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)]['Settings'][_0x17e81a(0x642)][_0x17e81a(0x112)],VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x75d)]=Scene_GameEnd['prototype'][_0x17e81a(0x3b1)],Scene_GameEnd[_0x17e81a(0x44d)][_0x17e81a(0x3b1)]=function(){const _0x10b971=_0x17e81a;Scene_MenuBase[_0x10b971(0x44d)]['createBackground']['call'](this);},Scene_GameEnd[_0x17e81a(0x44d)]['createCommandWindow']=function(){const _0x18fb07=_0x17e81a,_0x45d592=this[_0x18fb07(0x71a)]();this[_0x18fb07(0x29b)]=new Window_GameEnd(_0x45d592),this['_commandWindow']['setHandler'](_0x18fb07(0x42f),this['popScene'][_0x18fb07(0x309)](this)),this[_0x18fb07(0x1b7)](this[_0x18fb07(0x29b)]),this[_0x18fb07(0x29b)][_0x18fb07(0x1d6)](Scene_GameEnd[_0x18fb07(0x1e1)][_0x18fb07(0x1c9)]);},Scene_GameEnd[_0x17e81a(0x44d)][_0x17e81a(0x71a)]=function(){const _0x4348b3=_0x17e81a;return Scene_GameEnd['layoutSettings'][_0x4348b3(0x782)][_0x4348b3(0x65e)](this);},Scene_Shop[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)]['Settings']['MenuLayout']['ShopMenu'],VisuMZ[_0x17e81a(0x1a7)]['Scene_Shop_create']=Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x6e1)],Scene_Shop['prototype'][_0x17e81a(0x6e1)]=function(){const _0x6f35e=_0x17e81a;VisuMZ[_0x6f35e(0x1a7)]['Scene_Shop_create'][_0x6f35e(0x65e)](this),this[_0x6f35e(0x4c1)]();},Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x4c1)]=function(){const _0x3c3e40=_0x17e81a;this['_helpWindow']&&this[_0x3c3e40(0x27c)][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)]['HelpBgType']),this[_0x3c3e40(0x861)]&&this['_goldWindow'][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)]['GoldBgType']),this[_0x3c3e40(0x29b)]&&this[_0x3c3e40(0x29b)][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)]['CommandBgType']),this[_0x3c3e40(0x133)]&&this[_0x3c3e40(0x133)][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)][_0x3c3e40(0x570)]),this[_0x3c3e40(0x1ca)]&&this[_0x3c3e40(0x1ca)][_0x3c3e40(0x1d6)](Scene_Shop['layoutSettings'][_0x3c3e40(0x3f9)]),this['_statusWindow']&&this['_statusWindow'][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)]['StatusBgType']),this[_0x3c3e40(0x30b)]&&this['_buyWindow'][_0x3c3e40(0x1d6)](Scene_Shop['layoutSettings'][_0x3c3e40(0x437)]),this[_0x3c3e40(0x66b)]&&this[_0x3c3e40(0x66b)][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)][_0x3c3e40(0x6ab)]),this['_sellWindow']&&this[_0x3c3e40(0x5e9)][_0x3c3e40(0x1d6)](Scene_Shop[_0x3c3e40(0x1e1)]['SellBgType']);},Scene_Shop[_0x17e81a(0x44d)]['helpWindowRect']=function(){const _0x55d470=_0x17e81a;return Scene_Shop[_0x55d470(0x1e1)][_0x55d470(0x672)][_0x55d470(0x65e)](this);},Scene_Shop['prototype'][_0x17e81a(0x3bd)]=function(){const _0x2b7002=_0x17e81a;return Scene_Shop[_0x2b7002(0x1e1)][_0x2b7002(0x3ea)][_0x2b7002(0x65e)](this);},Scene_Shop[_0x17e81a(0x44d)]['commandWindowRect']=function(){const _0x24fcec=_0x17e81a;return Scene_Shop[_0x24fcec(0x1e1)]['CommandRect']['call'](this);},Scene_Shop['prototype'][_0x17e81a(0x650)]=function(){const _0x2d53a5=_0x17e81a;return Scene_Shop[_0x2d53a5(0x1e1)][_0x2d53a5(0x15a)][_0x2d53a5(0x65e)](this);},Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x9a)]=function(){const _0x334e8b=_0x17e81a;return Scene_Shop[_0x334e8b(0x1e1)][_0x334e8b(0x392)][_0x334e8b(0x65e)](this);},Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x31b)]=function(){const _0x11644a=_0x17e81a;return Scene_Shop[_0x11644a(0x1e1)][_0x11644a(0x2f4)][_0x11644a(0x65e)](this);},Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x1f7)]=function(){const _0x527806=_0x17e81a;return Scene_Shop['layoutSettings'][_0x527806(0x2e8)][_0x527806(0x65e)](this);},Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x5e1)]=function(){const _0x252606=_0x17e81a;return Scene_Shop[_0x252606(0x1e1)]['CategoryRect']['call'](this);},Scene_Shop[_0x17e81a(0x44d)][_0x17e81a(0x6c1)]=function(){const _0x2e6cc5=_0x17e81a;return Scene_Shop['layoutSettings'][_0x2e6cc5(0x381)][_0x2e6cc5(0x65e)](this);},Scene_Name[_0x17e81a(0x1e1)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)]['MenuLayout'][_0x17e81a(0x2f6)],VisuMZ[_0x17e81a(0x1a7)]['Scene_Name_create']=Scene_Name[_0x17e81a(0x44d)]['create'],Scene_Name['prototype'][_0x17e81a(0x6e1)]=function(){const _0xa9c2b3=_0x17e81a;VisuMZ[_0xa9c2b3(0x1a7)][_0xa9c2b3(0x536)]['call'](this),this[_0xa9c2b3(0x4c1)]();},Scene_Name[_0x17e81a(0x44d)]['setCoreEngineUpdateWindowBg']=function(){const _0x36c8ec=_0x17e81a;this[_0x36c8ec(0x7bf)]&&this[_0x36c8ec(0x7bf)][_0x36c8ec(0x1d6)](Scene_Name[_0x36c8ec(0x1e1)]['EditBgType']),this[_0x36c8ec(0xda)]&&this['_inputWindow'][_0x36c8ec(0x1d6)](Scene_Name['layoutSettings'][_0x36c8ec(0x81d)]);},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name['prototype'][_0x17e81a(0x2ae)]=function(){const _0x12e563=_0x17e81a;return Scene_Name[_0x12e563(0x1e1)][_0x12e563(0x39d)]['call'](this);},Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x592)]=function(){const _0x2809b6=_0x17e81a;return Scene_Name[_0x2809b6(0x1e1)][_0x2809b6(0x21a)][_0x2809b6(0x65e)](this);},Scene_Name['prototype'][_0x17e81a(0x559)]=function(){const _0x39dd95=_0x17e81a;if(!this[_0x39dd95(0xda)])return![];return VisuMZ['CoreEngine'][_0x39dd95(0x26d)][_0x39dd95(0x766)]['EnableNameInput'];},Scene_Name['prototype'][_0x17e81a(0x4c6)]=function(){const _0x3cd5af=_0x17e81a;if(this[_0x3cd5af(0x559)]()&&this[_0x3cd5af(0xda)][_0x3cd5af(0x135)]!==_0x3cd5af(0x769))return TextManager['getInputMultiButtonStrings']('pageup',_0x3cd5af(0x1b0));return Scene_MenuBase['prototype']['buttonAssistKey1'][_0x3cd5af(0x65e)](this);},Scene_Name['prototype'][_0x17e81a(0x452)]=function(){const _0x400ded=_0x17e81a;return this[_0x400ded(0x559)]()?TextManager[_0x400ded(0x777)](_0x400ded(0x588)):Scene_MenuBase[_0x400ded(0x44d)][_0x400ded(0x452)]['call'](this);},Scene_Name[_0x17e81a(0x44d)]['buttonAssistKey4']=function(){const _0x3dbb70=_0x17e81a;if(this[_0x3dbb70(0x559)]()&&this[_0x3dbb70(0xda)]['_mode']===_0x3dbb70(0x769))return TextManager[_0x3dbb70(0x209)]([_0x3dbb70(0x881)]);return Scene_MenuBase['prototype'][_0x3dbb70(0x2b9)][_0x3dbb70(0x65e)](this);},Scene_Name['prototype'][_0x17e81a(0x37b)]=function(){const _0x2666b2=_0x17e81a;if(this[_0x2666b2(0x559)]()&&this[_0x2666b2(0xda)][_0x2666b2(0x135)]===_0x2666b2(0x769))return TextManager[_0x2666b2(0x209)](['BKSP']);return Scene_MenuBase[_0x2666b2(0x44d)]['buttonAssistKey5']['call'](this);},Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x429)]=function(){const _0x2ccd16=_0x17e81a;if(this[_0x2ccd16(0x559)]()&&this[_0x2ccd16(0xda)]['_mode']!==_0x2ccd16(0x769)){const _0x1726a9=VisuMZ[_0x2ccd16(0x1a7)][_0x2ccd16(0x26d)][_0x2ccd16(0x766)];return _0x1726a9['PageChange']||_0x2ccd16(0xe1);}return Scene_MenuBase['prototype'][_0x2ccd16(0x429)][_0x2ccd16(0x65e)](this);},Scene_Name['prototype'][_0x17e81a(0x354)]=function(){const _0x3d9c33=_0x17e81a;if(this[_0x3d9c33(0x559)]()){const _0x3768a2=VisuMZ[_0x3d9c33(0x1a7)][_0x3d9c33(0x26d)][_0x3d9c33(0x766)];return this[_0x3d9c33(0xda)][_0x3d9c33(0x135)]===_0x3d9c33(0x769)?_0x3768a2[_0x3d9c33(0x767)]||_0x3d9c33(0x767):_0x3768a2[_0x3d9c33(0x155)]||_0x3d9c33(0x155);}else return Scene_MenuBase[_0x3d9c33(0x44d)][_0x3d9c33(0x354)][_0x3d9c33(0x65e)](this);},Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x759)]=function(){const _0x37fa2b=_0x17e81a;if(this['EnableNameInput']()){const _0x3ff073=VisuMZ[_0x37fa2b(0x1a7)]['Settings']['KeyboardInput'];if(this[_0x37fa2b(0xda)][_0x37fa2b(0x135)]===_0x37fa2b(0x769))return _0x3ff073['Finish']||_0x37fa2b(0x69f);}return Scene_MenuBase[_0x37fa2b(0x44d)][_0x37fa2b(0x759)][_0x37fa2b(0x65e)](this);},VisuMZ[_0x17e81a(0x1a7)]['Scene_Name_onInputOk']=Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x593)],Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x593)]=function(){const _0x152aed=_0x17e81a;this['doesNameContainBannedWords']()?this[_0x152aed(0x7a0)]():VisuMZ[_0x152aed(0x1a7)][_0x152aed(0x7af)][_0x152aed(0x65e)](this);},Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x5c4)]=function(){const _0x334019=_0x17e81a,_0xc5fd3=VisuMZ[_0x334019(0x1a7)][_0x334019(0x26d)][_0x334019(0x766)];if(!_0xc5fd3)return![];const _0x4510d1=_0xc5fd3['BannedWords'];if(!_0x4510d1)return![];const _0x166ea2=this[_0x334019(0x7bf)]['name']()[_0x334019(0x565)]();for(const _0x34220d of _0x4510d1){if(_0x166ea2[_0x334019(0x2b0)](_0x34220d[_0x334019(0x565)]()))return!![];}return![];},Scene_Name[_0x17e81a(0x44d)][_0x17e81a(0x7a0)]=function(){const _0x3ff7c4=_0x17e81a;SoundManager[_0x3ff7c4(0x23f)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x10a)]=Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x2a6)],Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x55bd4e=_0x17e81a;VisuMZ[_0x55bd4e(0x1a7)][_0x55bd4e(0x10a)][_0x55bd4e(0x65e)](this);if($gameTemp[_0x55bd4e(0x6f3)])this[_0x55bd4e(0x745)]();},Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x745)]=function(){const _0x3295b9=_0x17e81a;!BattleManager[_0x3295b9(0x21d)]()&&!this[_0x3295b9(0x53f)]&&!$gameMessage[_0x3295b9(0x24e)]()&&(this['_playtestF7Looping']=!![],this['update'](),SceneManager[_0x3295b9(0x671)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x5c1)]=Scene_Battle['prototype'][_0x17e81a(0x1b9)],Scene_Battle['prototype']['createCancelButton']=function(){const _0x3854cd=_0x17e81a;VisuMZ[_0x3854cd(0x1a7)]['Scene_Battle_createCancelButton']['call'](this),SceneManager[_0x3854cd(0x440)]()&&this[_0x3854cd(0x7d1)]();},Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x7d1)]=function(){const _0x4ebd4f=_0x17e81a;this[_0x4ebd4f(0x185)]['x']=Graphics[_0x4ebd4f(0x404)]+0x4,this[_0x4ebd4f(0x64b)]()?this[_0x4ebd4f(0x185)]['y']=Graphics[_0x4ebd4f(0x5e8)]-this[_0x4ebd4f(0x75c)]():this[_0x4ebd4f(0x185)]['y']=0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x1c6)]=Sprite_Button['prototype']['initialize'],Sprite_Button['prototype'][_0x17e81a(0x103)]=function(_0x17e5ca){const _0x29105d=_0x17e81a;VisuMZ[_0x29105d(0x1a7)]['Sprite_Button_initialize'][_0x29105d(0x65e)](this,_0x17e5ca),this[_0x29105d(0x509)]();},Sprite_Button[_0x17e81a(0x44d)][_0x17e81a(0x509)]=function(){const _0x2c891f=_0x17e81a,_0xced1ba=VisuMZ[_0x2c891f(0x1a7)][_0x2c891f(0x26d)]['UI'];this[_0x2c891f(0x871)]=![];switch(this['_buttonType']){case _0x2c891f(0x42f):this[_0x2c891f(0x871)]=!_0xced1ba[_0x2c891f(0x546)];break;case _0x2c891f(0x5d4):case _0x2c891f(0x1b0):this['_isButtonHidden']=!_0xced1ba[_0x2c891f(0x755)];break;case _0x2c891f(0x2f0):case'up':case _0x2c891f(0x362):case _0x2c891f(0x415):case'ok':this[_0x2c891f(0x871)]=!_0xced1ba[_0x2c891f(0x495)];break;case _0x2c891f(0x37d):this[_0x2c891f(0x871)]=!_0xced1ba[_0x2c891f(0x337)];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button[_0x17e81a(0x44d)][_0x17e81a(0x1c0)],Sprite_Button[_0x17e81a(0x44d)]['updateOpacity']=function(){const _0x38cac0=_0x17e81a;SceneManager[_0x38cac0(0x1ea)]()||this[_0x38cac0(0x871)]?this['hideButtonFromView']():VisuMZ[_0x38cac0(0x1a7)][_0x38cac0(0x28e)][_0x38cac0(0x65e)](this);},Sprite_Button['prototype']['hideButtonFromView']=function(){const _0x3d9edf=_0x17e81a;this['visible']=![],this['opacity']=0x0,this['x']=Graphics[_0x3d9edf(0x107)]*0xa,this['y']=Graphics[_0x3d9edf(0x4a1)]*0xa;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0xe6)]=Sprite_Battler[_0x17e81a(0x44d)]['startMove'],Sprite_Battler[_0x17e81a(0x44d)]['startMove']=function(_0x3dbebc,_0x4a694d,_0x2ec9fd){const _0x21fa3e=_0x17e81a;(this['_targetOffsetX']!==_0x3dbebc||this['_targetOffsetY']!==_0x4a694d)&&(this[_0x21fa3e(0x848)]('Linear'),this[_0x21fa3e(0x3d9)]=_0x2ec9fd),VisuMZ[_0x21fa3e(0x1a7)]['Sprite_Battler_startMove'][_0x21fa3e(0x65e)](this,_0x3dbebc,_0x4a694d,_0x2ec9fd);},Sprite_Battler[_0x17e81a(0x44d)]['setMoveEasingType']=function(_0x2989e6){const _0x59e489=_0x17e81a;this[_0x59e489(0xbe)]=_0x2989e6;},Sprite_Battler['prototype']['updateMove']=function(){const _0x216810=_0x17e81a;if(this[_0x216810(0x85f)]<=0x0)return;const _0x268801=this[_0x216810(0x85f)],_0x3767e7=this['_movementWholeDuration'],_0x4548a9=this[_0x216810(0xbe)];this[_0x216810(0x4ea)]=this[_0x216810(0x70a)](this[_0x216810(0x4ea)],this[_0x216810(0x506)],_0x268801,_0x3767e7,_0x4548a9),this[_0x216810(0x35c)]=this[_0x216810(0x70a)](this['_offsetY'],this[_0x216810(0x4c5)],_0x268801,_0x3767e7,_0x4548a9),this[_0x216810(0x85f)]--;if(this[_0x216810(0x85f)]<=0x0)this[_0x216810(0x114)]();},Sprite_Battler[_0x17e81a(0x44d)]['applyEasing']=function(_0x2a2858,_0x3d6abd,_0x3978dd,_0x375170,_0x61bdee){const _0x117f1f=_0x17e81a,_0x2e0bd1=VisuMZ['ApplyEasing']((_0x375170-_0x3978dd)/_0x375170,_0x61bdee||'Linear'),_0x39ca53=VisuMZ[_0x117f1f(0x5be)]((_0x375170-_0x3978dd+0x1)/_0x375170,_0x61bdee||_0x117f1f(0x347)),_0x511d2f=(_0x2a2858-_0x3d6abd*_0x2e0bd1)/(0x1-_0x2e0bd1);return _0x511d2f+(_0x3d6abd-_0x511d2f)*_0x39ca53;},VisuMZ['CoreEngine'][_0x17e81a(0x384)]=Sprite_Actor[_0x17e81a(0x44d)][_0x17e81a(0x658)],Sprite_Actor[_0x17e81a(0x44d)]['setActorHome']=function(_0x5e69ba){const _0x12224e=_0x17e81a;VisuMZ['CoreEngine'][_0x12224e(0x26d)]['UI'][_0x12224e(0x77e)]?this[_0x12224e(0x60c)](_0x5e69ba):VisuMZ['CoreEngine'][_0x12224e(0x384)]['call'](this,_0x5e69ba);},Sprite_Actor[_0x17e81a(0x44d)][_0x17e81a(0x60c)]=function(_0x412554){const _0x52406d=_0x17e81a;let _0x593c75=Math[_0x52406d(0x397)](Graphics[_0x52406d(0x107)]/0x2+0xc0);_0x593c75-=Math[_0x52406d(0x2b3)]((Graphics[_0x52406d(0x107)]-Graphics['boxWidth'])/0x2),_0x593c75+=_0x412554*0x20;let _0x35e409=Graphics[_0x52406d(0x4a1)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x35e409-=Math[_0x52406d(0x2b3)]((Graphics['height']-Graphics[_0x52406d(0x5e8)])/0x2),_0x35e409+=_0x412554*0x30,this[_0x52406d(0x71f)](_0x593c75,_0x35e409);},Sprite_Actor[_0x17e81a(0x44d)][_0x17e81a(0x80a)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x17e81a(0x27b)]=function(_0x408bd7){const _0x2c9871=_0x17e81a;this[_0x2c9871(0x3a1)]=_0x408bd7;},VisuMZ['CoreEngine'][_0x17e81a(0x76e)]=Sprite_Animation[_0x17e81a(0x44d)][_0x17e81a(0x7e7)],Sprite_Animation[_0x17e81a(0x44d)][_0x17e81a(0x7e7)]=function(){const _0x26108a=_0x17e81a;if(this[_0x26108a(0x3a1)])return;VisuMZ[_0x26108a(0x1a7)][_0x26108a(0x76e)][_0x26108a(0x65e)](this);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x68a)]=Sprite_Animation['prototype'][_0x17e81a(0x472)],Sprite_Animation[_0x17e81a(0x44d)][_0x17e81a(0x472)]=function(_0x19a693){const _0x38b629=_0x17e81a;this[_0x38b629(0x6ee)]()?this[_0x38b629(0x1a0)](_0x19a693):VisuMZ[_0x38b629(0x1a7)][_0x38b629(0x68a)]['call'](this,_0x19a693);},Sprite_Animation[_0x17e81a(0x44d)][_0x17e81a(0x6ee)]=function(){const _0x280b75=_0x17e81a;if(!this[_0x280b75(0x188)])return![];const _0x162402=this[_0x280b75(0x188)][_0x280b75(0x320)]||'';if(_0x162402[_0x280b75(0x6b6)](/<MIRROR OFFSET X>/i))return!![];if(_0x162402[_0x280b75(0x6b6)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x280b75(0x1a7)][_0x280b75(0x26d)][_0x280b75(0x51f)][_0x280b75(0x1fb)];},Sprite_Animation[_0x17e81a(0x44d)][_0x17e81a(0x1a0)]=function(_0x42bc3f){const _0x5ce4d2=_0x17e81a,_0x2695b1=this[_0x5ce4d2(0x615)],_0x595075=this[_0x5ce4d2(0x615)],_0x150c27=this[_0x5ce4d2(0x188)][_0x5ce4d2(0x190)]*(this[_0x5ce4d2(0x39a)]?-0x1:0x1)-_0x2695b1/0x2,_0xd37470=this['_animation']['offsetY']-_0x595075/0x2,_0x3f306f=this[_0x5ce4d2(0x831)](_0x42bc3f);_0x42bc3f['gl'][_0x5ce4d2(0x378)](_0x150c27+_0x3f306f['x'],_0xd37470+_0x3f306f['y'],_0x2695b1,_0x595075);},Sprite_Animation['prototype'][_0x17e81a(0x4b0)]=function(_0x3f7125){const _0x4835ed=_0x17e81a;if(_0x3f7125['_mainSprite']){}const _0x3e8f1b=this[_0x4835ed(0x188)][_0x4835ed(0x320)];let _0x56c97c=_0x3f7125[_0x4835ed(0x4a1)]*_0x3f7125['scale']['y'],_0x3b48c2=0x0,_0x33821e=-_0x56c97c/0x2;if(_0x3e8f1b[_0x4835ed(0x6b6)](/<(?:HEAD|HEADER|TOP)>/i))_0x33821e=-_0x56c97c;if(_0x3e8f1b[_0x4835ed(0x6b6)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x33821e=0x0;if(this['_animation'][_0x4835ed(0x738)])_0x33821e=0x0;if(_0x3e8f1b['match'](/<(?:LEFT)>/i))_0x3b48c2=-_0x3f7125[_0x4835ed(0x107)]/0x2;if(_0x3e8f1b[_0x4835ed(0x6b6)](/<(?:RIGHT)>/i))_0x3b48c2=_0x3f7125[_0x4835ed(0x107)]/0x2;_0x3e8f1b[_0x4835ed(0x6b6)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x3b48c2=Number(RegExp['$1'])*_0x3f7125[_0x4835ed(0x107)]);_0x3e8f1b['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x33821e=(0x1-Number(RegExp['$1']))*-_0x56c97c);_0x3e8f1b[_0x4835ed(0x6b6)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3b48c2=Number(RegExp['$1'])*_0x3f7125['width'],_0x33821e=(0x1-Number(RegExp['$2']))*-_0x56c97c);if(_0x3e8f1b[_0x4835ed(0x6b6)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3b48c2+=Number(RegExp['$1']);if(_0x3e8f1b[_0x4835ed(0x6b6)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x33821e+=Number(RegExp['$1']);_0x3e8f1b[_0x4835ed(0x6b6)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3b48c2+=Number(RegExp['$1']),_0x33821e+=Number(RegExp['$2']));const _0x534788=new Point(_0x3b48c2,_0x33821e);return _0x3f7125[_0x4835ed(0x2e5)](),_0x3f7125[_0x4835ed(0x3bf)][_0x4835ed(0x655)](_0x534788);},Sprite_AnimationMV[_0x17e81a(0x44d)][_0x17e81a(0x1aa)]=function(){const _0x1dac3b=_0x17e81a;this[_0x1dac3b(0x48d)]=VisuMZ[_0x1dac3b(0x1a7)][_0x1dac3b(0x26d)][_0x1dac3b(0x51f)][_0x1dac3b(0x735)]??0x4,this[_0x1dac3b(0x466)](),this[_0x1dac3b(0x48d)]=this[_0x1dac3b(0x48d)][_0x1dac3b(0xb7)](0x1,0xa);},Sprite_AnimationMV[_0x17e81a(0x44d)]['setupCustomRateCoreEngine']=function(){const _0x4250ea=_0x17e81a;if(!this['_animation']);const _0x1a9764=this['_animation'][_0x4250ea(0x320)]||'';_0x1a9764[_0x4250ea(0x6b6)](/<RATE:[ ](\d+)>/i)&&(this[_0x4250ea(0x48d)]=(Number(RegExp['$1'])||0x1)[_0x4250ea(0xb7)](0x1,0xa));},Sprite_AnimationMV[_0x17e81a(0x44d)]['setMute']=function(_0x4b85cd){this['_muteSound']=_0x4b85cd;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0xf2)]=Sprite_AnimationMV[_0x17e81a(0x44d)][_0x17e81a(0x795)],Sprite_AnimationMV[_0x17e81a(0x44d)][_0x17e81a(0x795)]=function(_0x283366){const _0x227df0=_0x17e81a;this[_0x227df0(0x3a1)]&&(_0x283366=JsonEx[_0x227df0(0x2b5)](_0x283366),_0x283366['se']&&(_0x283366['se']['volume']=0x0)),VisuMZ[_0x227df0(0x1a7)][_0x227df0(0xf2)]['call'](this,_0x283366);},VisuMZ[_0x17e81a(0x1a7)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x17e81a(0x44d)]['updatePosition'],Sprite_AnimationMV[_0x17e81a(0x44d)][_0x17e81a(0x499)]=function(){const _0x13585e=_0x17e81a;VisuMZ['CoreEngine'][_0x13585e(0x2a5)]['call'](this);if(this[_0x13585e(0x188)][_0x13585e(0x278)]===0x3){if(this['x']===0x0)this['x']=Math[_0x13585e(0x397)](Graphics[_0x13585e(0x107)]/0x2);if(this['y']===0x0)this['y']=Math[_0x13585e(0x397)](Graphics[_0x13585e(0x4a1)]/0x2);}},Sprite_Damage[_0x17e81a(0x44d)][_0x17e81a(0x595)]=function(_0x30007e){const _0x52d86c=_0x17e81a;let _0x3bcb96=Math[_0x52d86c(0x48f)](_0x30007e)[_0x52d86c(0x187)]();this[_0x52d86c(0x83f)]()&&(_0x3bcb96=VisuMZ[_0x52d86c(0x6c8)](_0x3bcb96));const _0x5d7ca5=this[_0x52d86c(0x296)](),_0x589c47=Math['floor'](_0x5d7ca5*0.75);for(let _0x190169=0x0;_0x190169<_0x3bcb96['length'];_0x190169++){const _0x5062b7=this[_0x52d86c(0x251)](_0x589c47,_0x5d7ca5);_0x5062b7['bitmap']['drawText'](_0x3bcb96[_0x190169],0x0,0x0,_0x589c47,_0x5d7ca5,'center'),_0x5062b7['x']=(_0x190169-(_0x3bcb96[_0x52d86c(0x4b4)]-0x1)/0x2)*_0x589c47,_0x5062b7['dy']=-_0x190169;}},Sprite_Damage[_0x17e81a(0x44d)]['useDigitGrouping']=function(){const _0x54da2b=_0x17e81a;return VisuMZ[_0x54da2b(0x1a7)][_0x54da2b(0x26d)][_0x54da2b(0x51f)][_0x54da2b(0x65d)];},Sprite_Damage[_0x17e81a(0x44d)][_0x17e81a(0x416)]=function(){const _0x3c7b7e=_0x17e81a;return ColorManager[_0x3c7b7e(0x1ae)]();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x479)]=Sprite_Gauge[_0x17e81a(0x44d)][_0x17e81a(0x710)],Sprite_Gauge[_0x17e81a(0x44d)][_0x17e81a(0x710)]=function(){const _0x29c531=_0x17e81a;return VisuMZ['CoreEngine'][_0x29c531(0x479)][_0x29c531(0x65e)](this)[_0x29c531(0xb7)](0x0,0x1);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x50b)]=Sprite_Gauge[_0x17e81a(0x44d)][_0x17e81a(0x340)],Sprite_Gauge[_0x17e81a(0x44d)]['currentValue']=function(){const _0x1412c2=_0x17e81a;let _0x21933a=VisuMZ[_0x1412c2(0x1a7)][_0x1412c2(0x50b)][_0x1412c2(0x65e)](this);return _0x21933a;},Sprite_Gauge[_0x17e81a(0x44d)][_0x17e81a(0x212)]=function(){const _0x4a74d7=_0x17e81a;let _0x47de9c=this['currentValue']();this[_0x4a74d7(0x83f)]()&&(_0x47de9c=VisuMZ[_0x4a74d7(0x6c8)](_0x47de9c));const _0x3e822b=this[_0x4a74d7(0x2da)]()-0x1,_0xc96180=this[_0x4a74d7(0x2ab)]?this[_0x4a74d7(0x2ab)]():this[_0x4a74d7(0x6ae)]();this[_0x4a74d7(0x1a4)](),this['bitmap']['drawText'](_0x47de9c,0x0,0x0,_0x3e822b,_0xc96180,'right');},Sprite_Gauge[_0x17e81a(0x44d)][_0x17e81a(0x36e)]=function(){return 0x3;},Sprite_Gauge[_0x17e81a(0x44d)]['useDigitGrouping']=function(){const _0xe62f78=_0x17e81a;return VisuMZ['CoreEngine'][_0xe62f78(0x26d)]['QoL'][_0xe62f78(0x6d1)];},Sprite_Gauge['prototype'][_0x17e81a(0x416)]=function(){const _0x536180=_0x17e81a;return ColorManager[_0x536180(0x80b)]();},Sprite_StateIcon[_0x17e81a(0x30c)]=VisuMZ[_0x17e81a(0x1a7)]['Settings']['UI']['StateIconsNonFrame']??!![],VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x36b)]=Sprite_StateIcon[_0x17e81a(0x44d)][_0x17e81a(0x1ef)],Sprite_StateIcon[_0x17e81a(0x44d)][_0x17e81a(0x1ef)]=function(){const _0x464b73=_0x17e81a;Sprite_StateIcon[_0x464b73(0x30c)]?this[_0x464b73(0x401)]():VisuMZ[_0x464b73(0x1a7)][_0x464b73(0x36b)]['call'](this);},Sprite_StateIcon[_0x17e81a(0x44d)][_0x17e81a(0x401)]=function(){const _0x571af7=_0x17e81a;this[_0x571af7(0x313)]=new Bitmap(ImageManager[_0x571af7(0x54b)],ImageManager[_0x571af7(0x800)]),this['_srcBitmap']=ImageManager[_0x571af7(0x3d8)](_0x571af7(0x1b8));},VisuMZ[_0x17e81a(0x1a7)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x17e81a(0x44d)]['updateFrame'],Sprite_StateIcon[_0x17e81a(0x44d)][_0x17e81a(0x52d)]=function(){const _0x3375a1=_0x17e81a;Sprite_StateIcon[_0x3375a1(0x30c)]?this[_0x3375a1(0x5c9)]():VisuMZ['CoreEngine'][_0x3375a1(0x406)][_0x3375a1(0x65e)](this);},Sprite_StateIcon[_0x17e81a(0x44d)][_0x17e81a(0x5c9)]=function(){const _0x422428=_0x17e81a;if(this[_0x422428(0x818)]===this[_0x422428(0x2ea)])return;this[_0x422428(0x818)]=this['_iconIndex'];const _0x40d845=ImageManager['iconWidth'],_0x4337f0=ImageManager['iconHeight'],_0x4313f9=this['_iconIndex']%0x10*_0x40d845,_0x50c6fe=Math[_0x422428(0x2b3)](this[_0x422428(0x2ea)]/0x10)*_0x4337f0,_0x183a89=this['_srcBitmap'],_0x20d3a1=this['bitmap'];_0x20d3a1['clear'](),_0x20d3a1[_0x422428(0x548)](_0x183a89,_0x4313f9,_0x50c6fe,_0x40d845,_0x4337f0,0x0,0x0,_0x20d3a1[_0x422428(0x107)],_0x20d3a1[_0x422428(0x4a1)]);},VisuMZ['CoreEngine'][_0x17e81a(0x5d3)]=Sprite_Picture['prototype']['loadBitmap'],Sprite_Picture[_0x17e81a(0x44d)][_0x17e81a(0x1ef)]=function(){const _0x404c51=_0x17e81a;this[_0x404c51(0x5b0)]&&this[_0x404c51(0x5b0)][_0x404c51(0x6b6)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x404c51(0x50d)](Number(RegExp['$1'])):VisuMZ[_0x404c51(0x1a7)][_0x404c51(0x5d3)][_0x404c51(0x65e)](this);},Sprite_Picture['prototype'][_0x17e81a(0x50d)]=function(_0x518b22){const _0x2dec9e=_0x17e81a,_0x44f871=ImageManager[_0x2dec9e(0x54b)],_0x4c9b3e=ImageManager[_0x2dec9e(0x800)],_0x9bdab1=this[_0x2dec9e(0x5b0)]['match'](/SMOOTH/i);this[_0x2dec9e(0x313)]=new Bitmap(_0x44f871,_0x4c9b3e);const _0x332866=ImageManager[_0x2dec9e(0x3d8)]('IconSet'),_0x3452d3=_0x518b22%0x10*_0x44f871,_0x43e08f=Math[_0x2dec9e(0x2b3)](_0x518b22/0x10)*_0x4c9b3e;this[_0x2dec9e(0x313)]['smooth']=_0x9bdab1,this[_0x2dec9e(0x313)][_0x2dec9e(0x548)](_0x332866,_0x3452d3,_0x43e08f,_0x44f871,_0x4c9b3e,0x0,0x0,_0x44f871,_0x4c9b3e);};function Sprite_TitlePictureButton(){const _0x9ae001=_0x17e81a;this[_0x9ae001(0x103)](...arguments);}Sprite_TitlePictureButton['prototype']=Object['create'](Sprite_Clickable[_0x17e81a(0x44d)]),Sprite_TitlePictureButton[_0x17e81a(0x44d)][_0x17e81a(0x666)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x17e81a(0x103)]=function(_0x897b19){const _0x496538=_0x17e81a;Sprite_Clickable[_0x496538(0x44d)]['initialize'][_0x496538(0x65e)](this),this[_0x496538(0x630)]=_0x897b19,this[_0x496538(0x505)]=null,this['setup']();},Sprite_TitlePictureButton[_0x17e81a(0x44d)]['setup']=function(){const _0x4443a7=_0x17e81a;this['x']=Graphics['width'],this['y']=Graphics[_0x4443a7(0x4a1)],this[_0x4443a7(0x366)]=![],this[_0x4443a7(0x115)]();},Sprite_TitlePictureButton['prototype']['setupButtonImage']=function(){const _0x43bd50=_0x17e81a;this[_0x43bd50(0x313)]=ImageManager[_0x43bd50(0x13f)](this['_data'][_0x43bd50(0x549)]),this[_0x43bd50(0x313)][_0x43bd50(0x7ba)](this[_0x43bd50(0x210)][_0x43bd50(0x309)](this));},Sprite_TitlePictureButton['prototype'][_0x17e81a(0x210)]=function(){const _0x35e763=_0x17e81a;this[_0x35e763(0x630)][_0x35e763(0x887)]['call'](this),this[_0x35e763(0x630)][_0x35e763(0x4cb)][_0x35e763(0x65e)](this),this[_0x35e763(0x130)](this[_0x35e763(0x630)][_0x35e763(0x58a)][_0x35e763(0x309)](this));},Sprite_TitlePictureButton[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x40e33d=_0x17e81a;Sprite_Clickable[_0x40e33d(0x44d)][_0x40e33d(0x2a6)]['call'](this),this[_0x40e33d(0x1c0)](),this[_0x40e33d(0xf7)]();},Sprite_TitlePictureButton[_0x17e81a(0x44d)][_0x17e81a(0x79a)]=function(){const _0x137464=_0x17e81a;return VisuMZ[_0x137464(0x1a7)][_0x137464(0x26d)][_0x137464(0x642)]['Title'][_0x137464(0x862)];},Sprite_TitlePictureButton['prototype'][_0x17e81a(0x1c0)]=function(){const _0x3a5fa9=_0x17e81a;this['_pressed']||this[_0x3a5fa9(0x872)]?this[_0x3a5fa9(0x233)]=0xff:(this[_0x3a5fa9(0x233)]+=this[_0x3a5fa9(0x366)]?this['fadeSpeed']():-0x1*this[_0x3a5fa9(0x79a)](),this[_0x3a5fa9(0x233)]=Math[_0x3a5fa9(0x444)](0xc0,this[_0x3a5fa9(0x233)]));},Sprite_TitlePictureButton[_0x17e81a(0x44d)][_0x17e81a(0x130)]=function(_0x15fe89){this['_clickHandler']=_0x15fe89;},Sprite_TitlePictureButton['prototype']['onClick']=function(){const _0xb22b54=_0x17e81a;this[_0xb22b54(0x505)]&&this[_0xb22b54(0x505)]();};function Sprite_ExtendedTile(){const _0x15d632=_0x17e81a;this[_0x15d632(0x103)](...arguments);}Sprite_ExtendedTile[_0x17e81a(0x44d)]=Object['create'](Sprite['prototype']),Sprite_ExtendedTile[_0x17e81a(0x44d)][_0x17e81a(0x666)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(_0x53de2b,_0x2a158d,_0x5b2599,_0x104f17){const _0x440255=_0x17e81a;this[_0x440255(0x882)]=Game_CharacterBase[_0x440255(0x699)]||-0x6,this[_0x440255(0x2e6)]=_0x53de2b,this[_0x440255(0x40d)]=_0x2a158d,this['_tile']=_0x5b2599,this['_patternHeight']=_0x104f17,Sprite['prototype'][_0x440255(0x103)][_0x440255(0x65e)](this),this['createSubSprite'](),this[_0x440255(0x54e)](),this['setTileFrame'](),this[_0x440255(0x2a6)]();},Sprite_ExtendedTile['prototype']['createSubSprite']=function(){const _0x5a7e46=_0x17e81a;this[_0x5a7e46(0x3c2)]=new Sprite(),this[_0x5a7e46(0x3c2)][_0x5a7e46(0x799)]['x']=0.5,this[_0x5a7e46(0x3c2)]['anchor']['y']=0x1,this['_tileSprite']['y']=-this[_0x5a7e46(0x882)]+0x1,this['addChild'](this[_0x5a7e46(0x3c2)]);},Sprite_ExtendedTile['prototype'][_0x17e81a(0x54e)]=function(){const _0x556a66=_0x17e81a,_0x39197f=$gameMap[_0x556a66(0x640)](),_0x4303df=0x5+Math[_0x556a66(0x2b3)](this['_tile']/0x100);this[_0x556a66(0x3c2)][_0x556a66(0x313)]=ImageManager[_0x556a66(0x332)](_0x39197f[_0x556a66(0x20a)][_0x4303df]);},Sprite_ExtendedTile[_0x17e81a(0x44d)][_0x17e81a(0x84b)]=function(){const _0x33a2b1=_0x17e81a,_0x43e4f5=this[_0x33a2b1(0x453)],_0x166285=$gameMap[_0x33a2b1(0x7b6)](),_0x92c5b5=$gameMap[_0x33a2b1(0x57b)](),_0x2f962b=(Math[_0x33a2b1(0x2b3)](_0x43e4f5/0x80)%0x2*0x8+_0x43e4f5%0x8)*_0x166285,_0x4b820d=Math['floor'](_0x43e4f5%0x100/0x8)%0x10*_0x92c5b5,_0x314ab5=this[_0x33a2b1(0x788)]*_0x92c5b5;this[_0x33a2b1(0x3c2)]['setFrame'](_0x2f962b,_0x4b820d-_0x314ab5,_0x166285,_0x92c5b5+_0x314ab5);},Sprite_ExtendedTile[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x854c6=_0x17e81a;Sprite['prototype']['update']['call'](this),this[_0x854c6(0x499)]();},Sprite_ExtendedTile[_0x17e81a(0x44d)][_0x17e81a(0x499)]=function(){const _0x173645=_0x17e81a,_0x1c5089=$gameMap[_0x173645(0x7b6)](),_0x830bbd=$gameMap['tileHeight'](),_0x2c581b=this[_0x173645(0x2e6)],_0x3e9bb5=this[_0x173645(0x40d)];this['x']=Math[_0x173645(0x2b3)](($gameMap[_0x173645(0x16c)](_0x2c581b)+0.5)*_0x1c5089),this['y']=Math[_0x173645(0x2b3)](($gameMap[_0x173645(0x498)](_0x3e9bb5)+0x1)*_0x830bbd)+this[_0x173645(0x882)]-0x1;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x590)]=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(){const _0x3828ad=_0x17e81a;VisuMZ[_0x3828ad(0x1a7)][_0x3828ad(0x590)][_0x3828ad(0x65e)](this),this[_0x3828ad(0x426)]();},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x426)]=function(){const _0x2c88bf=_0x17e81a;this['_fauxAnimationSprites']=[],this[_0x2c88bf(0x4f1)]=[],this[_0x2c88bf(0x86d)]=this['scale']['x'],this['_cacheScaleY']=this[_0x2c88bf(0x5d7)]['y'];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x875)]=Spriteset_Base[_0x17e81a(0x44d)]['destroy'],Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x2c7)]=function(_0x3797e5){const _0x4bb897=_0x17e81a;this[_0x4bb897(0x5ca)](),this[_0x4bb897(0x16f)](),VisuMZ[_0x4bb897(0x1a7)][_0x4bb897(0x875)][_0x4bb897(0x65e)](this,_0x3797e5);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x69b)]=Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x2a6)],Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x2ea6bb=_0x17e81a;VisuMZ[_0x2ea6bb(0x1a7)][_0x2ea6bb(0x69b)]['call'](this),this['updatePictureSettings'](),this[_0x2ea6bb(0x412)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base['prototype']['updatePictureSettings']=function(){},Spriteset_Base[_0x17e81a(0x44d)]['updatePictureAntiZoom']=function(){const _0x4f5e3f=_0x17e81a;if(!VisuMZ['CoreEngine'][_0x4f5e3f(0x26d)][_0x4f5e3f(0x51f)][_0x4f5e3f(0x7ca)])return;if(this[_0x4f5e3f(0x86d)]===this['scale']['x']&&this['_cacheScaleY']===this[_0x4f5e3f(0x5d7)]['y'])return;this['adjustPictureAntiZoom'](),this['_cacheScaleX']=this[_0x4f5e3f(0x5d7)]['x'],this['_cacheScaleY']=this[_0x4f5e3f(0x5d7)]['y'];},Spriteset_Base['prototype']['adjustPictureAntiZoom']=function(){const _0x5b6159=_0x17e81a;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x5b6159(0x77b)])return;else{if(SceneManager[_0x5b6159(0x732)]()&&Spriteset_Battle[_0x5b6159(0x77b)])return;}this['scale']['x']!==0x0&&(this[_0x5b6159(0x507)][_0x5b6159(0x5d7)]['x']=0x1/this[_0x5b6159(0x5d7)]['x'],this[_0x5b6159(0x507)]['x']=-(this['x']/this[_0x5b6159(0x5d7)]['x'])),this[_0x5b6159(0x5d7)]['y']!==0x0&&(this['_pictureContainer'][_0x5b6159(0x5d7)]['y']=0x1/this[_0x5b6159(0x5d7)]['y'],this[_0x5b6159(0x507)]['y']=-(this['y']/this[_0x5b6159(0x5d7)]['y']));},VisuMZ[_0x17e81a(0x1a7)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x499)],Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x499)]=function(){const _0x3da9e4=_0x17e81a;VisuMZ[_0x3da9e4(0x1a7)][_0x3da9e4(0x118)][_0x3da9e4(0x65e)](this),this[_0x3da9e4(0x842)]();},Spriteset_Base[_0x17e81a(0x44d)]['updatePositionCoreEngine']=function(){const _0x430330=_0x17e81a;if(!$gameScreen)return;if($gameScreen[_0x430330(0x535)]<=0x0)return;this['x']-=Math['round']($gameScreen['shake']());const _0x14b2a8=$gameScreen[_0x430330(0x99)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x430330(0x102):this[_0x430330(0x250)]();break;case _0x430330(0x852):this[_0x430330(0x3f8)]();break;case _0x430330(0x569):this[_0x430330(0x403)]();break;default:this[_0x430330(0x157)]();break;}},Spriteset_Base[_0x17e81a(0x44d)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x402fa6=_0x17e81a,_0x5ae64c=VisuMZ[_0x402fa6(0x1a7)][_0x402fa6(0x26d)][_0x402fa6(0x612)];if(_0x5ae64c&&_0x5ae64c[_0x402fa6(0x1a1)])return _0x5ae64c[_0x402fa6(0x1a1)][_0x402fa6(0x65e)](this);this['x']+=Math[_0x402fa6(0x397)]($gameScreen[_0x402fa6(0x2f5)]());},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x157)]=function(){const _0x5a2f5f=_0x17e81a,_0x4fa375=VisuMZ[_0x5a2f5f(0x1a7)][_0x5a2f5f(0x26d)]['ScreenShake'];if(_0x4fa375&&_0x4fa375[_0x5a2f5f(0x797)])return _0x4fa375['randomJS']['call'](this);const _0x211603=$gameScreen[_0x5a2f5f(0xc6)]*0.75,_0x1aeca5=$gameScreen[_0x5a2f5f(0x2cc)]*0.6,_0x8e0db8=$gameScreen[_0x5a2f5f(0x535)];this['x']+=Math[_0x5a2f5f(0x397)](Math[_0x5a2f5f(0x50e)](_0x211603)-Math['randomInt'](_0x1aeca5))*(Math[_0x5a2f5f(0x444)](_0x8e0db8,0x1e)*0.5),this['y']+=Math[_0x5a2f5f(0x397)](Math[_0x5a2f5f(0x50e)](_0x211603)-Math[_0x5a2f5f(0x50e)](_0x1aeca5))*(Math[_0x5a2f5f(0x444)](_0x8e0db8,0x1e)*0.5);},Spriteset_Base[_0x17e81a(0x44d)]['updatePositionCoreEngineShakeHorz']=function(){const _0x16b5c8=_0x17e81a,_0x12221e=VisuMZ['CoreEngine'][_0x16b5c8(0x26d)][_0x16b5c8(0x612)];if(_0x12221e&&_0x12221e['horzJS'])return _0x12221e[_0x16b5c8(0xf1)][_0x16b5c8(0x65e)](this);const _0x50ab7c=$gameScreen[_0x16b5c8(0xc6)]*0.75,_0x105c3a=$gameScreen[_0x16b5c8(0x2cc)]*0.6,_0x3c0da3=$gameScreen[_0x16b5c8(0x535)];this['x']+=Math[_0x16b5c8(0x397)](Math[_0x16b5c8(0x50e)](_0x50ab7c)-Math[_0x16b5c8(0x50e)](_0x105c3a))*(Math[_0x16b5c8(0x444)](_0x3c0da3,0x1e)*0.5);},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x403)]=function(){const _0x4029c0=_0x17e81a,_0x53f449=VisuMZ[_0x4029c0(0x1a7)][_0x4029c0(0x26d)]['ScreenShake'];if(_0x53f449&&_0x53f449[_0x4029c0(0x668)])return _0x53f449[_0x4029c0(0x668)][_0x4029c0(0x65e)](this);const _0x110576=$gameScreen['_shakePower']*0.75,_0x508a0c=$gameScreen[_0x4029c0(0x2cc)]*0.6,_0xf9ae75=$gameScreen['_shakeDuration'];this['y']+=Math[_0x4029c0(0x397)](Math[_0x4029c0(0x50e)](_0x110576)-Math[_0x4029c0(0x50e)](_0x508a0c))*(Math['min'](_0xf9ae75,0x1e)*0.5);},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x2c0)]=function(){const _0xf87a0b=_0x17e81a;for(const _0x2411b0 of this['_fauxAnimationSprites']){!_0x2411b0[_0xf87a0b(0x493)]()&&this['removeFauxAnimation'](_0x2411b0);}this[_0xf87a0b(0x6e0)]();},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x6e0)]=function(){const _0x33b849=_0x17e81a;for(;;){const _0x4bb9b6=$gameTemp[_0x33b849(0x49e)]();if(_0x4bb9b6)this[_0x33b849(0xa5)](_0x4bb9b6);else break;}},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0xa5)]=function(_0x3bea8d){const _0x23e0d6=_0x17e81a,_0x3fe349=$dataAnimations[_0x3bea8d[_0x23e0d6(0x793)]],_0x16cb01=_0x3bea8d[_0x23e0d6(0x125)],_0x5b9ece=_0x3bea8d['mirror'],_0x7f4b7=_0x3bea8d[_0x23e0d6(0x884)];let _0x225895=this[_0x23e0d6(0x1b6)]();const _0x36a586=this[_0x23e0d6(0x619)]();if(this[_0x23e0d6(0x1ab)](_0x3fe349))for(const _0x4aed7a of _0x16cb01){this[_0x23e0d6(0x213)]([_0x4aed7a],_0x3fe349,_0x5b9ece,_0x225895,_0x7f4b7),_0x225895+=_0x36a586;}else this[_0x23e0d6(0x213)](_0x16cb01,_0x3fe349,_0x5b9ece,_0x225895,_0x7f4b7);},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x6b4)]=function(_0x12981e,_0x21f7f8,_0x57eb8f,_0x122c0c){const _0x4576da=_0x17e81a,_0x552cbe=this['isMVAnimation'](_0x21f7f8),_0x4c1eb7=new(_0x552cbe?Sprite_AnimationMV:Sprite_Animation)(),_0x4f2f06=this[_0x4576da(0x240)](_0x12981e),_0x16de9a=this[_0x4576da(0x1b6)](),_0xd57fc1=_0x122c0c>_0x16de9a?this[_0x4576da(0x20b)]():null;this[_0x4576da(0x2df)](_0x12981e[0x0])&&(_0x57eb8f=!_0x57eb8f),_0x4c1eb7[_0x4576da(0x886)]=_0x12981e,_0x4c1eb7[_0x4576da(0x2f3)](_0x4f2f06,_0x21f7f8,_0x57eb8f,_0x122c0c,_0xd57fc1),this[_0x4576da(0x49a)](_0x4c1eb7),this['_animationSprites'][_0x4576da(0x189)](_0x4c1eb7);},Spriteset_Base['prototype'][_0x17e81a(0x213)]=function(_0x55b550,_0x4cb380,_0x4c8ae2,_0x1719ca,_0x4e03a2){const _0x178223=_0x17e81a,_0x4d4df8=this['isMVAnimation'](_0x4cb380),_0x519324=new(_0x4d4df8?Sprite_AnimationMV:Sprite_Animation)(),_0x301ab3=this[_0x178223(0x240)](_0x55b550);this[_0x178223(0x2df)](_0x55b550[0x0])&&(_0x4c8ae2=!_0x4c8ae2);_0x519324[_0x178223(0x886)]=_0x55b550,_0x519324[_0x178223(0x2f3)](_0x301ab3,_0x4cb380,_0x4c8ae2,_0x1719ca),_0x519324['setMute'](_0x4e03a2),this[_0x178223(0x49a)](_0x519324);if(this[_0x178223(0x819)])this['_animationSprites'][_0x178223(0x723)](_0x519324);this['_fauxAnimationSprites'][_0x178223(0x189)](_0x519324);},Spriteset_Base['prototype'][_0x17e81a(0x49a)]=function(_0x2b6d7d){const _0x16543e=_0x17e81a;this[_0x16543e(0x6b3)][_0x16543e(0x487)](_0x2b6d7d);},Spriteset_Base['prototype']['removeAnimation']=function(_0x37f297){const _0x22c1bb=_0x17e81a;this[_0x22c1bb(0x819)]['remove'](_0x37f297),this['removeAnimationFromContainer'](_0x37f297);for(const _0x2a00a7 of _0x37f297[_0x22c1bb(0x886)]){_0x2a00a7[_0x22c1bb(0x794)]&&_0x2a00a7[_0x22c1bb(0x794)]();}_0x37f297[_0x22c1bb(0x2c7)]();},Spriteset_Base[_0x17e81a(0x44d)]['removeFauxAnimation']=function(_0x1f6664){const _0x2ec6d4=_0x17e81a;this[_0x2ec6d4(0x722)][_0x2ec6d4(0x723)](_0x1f6664),this['removeAnimationFromContainer'](_0x1f6664);for(const _0x2d1100 of _0x1f6664[_0x2ec6d4(0x886)]){_0x2d1100[_0x2ec6d4(0x794)]&&_0x2d1100['endAnimation']();}_0x1f6664[_0x2ec6d4(0x2c7)]();},Spriteset_Base[_0x17e81a(0x44d)]['removeAnimationFromContainer']=function(_0x1b738d){const _0x5843b4=_0x17e81a;this['_effectsContainer'][_0x5843b4(0x2d1)](_0x1b738d);},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x5ca)]=function(){const _0xc25088=_0x17e81a;for(const _0x2e63e6 of this[_0xc25088(0x722)]){this[_0xc25088(0x73f)](_0x2e63e6);}},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x26b)]=function(){const _0x27dee1=_0x17e81a;return this['_fauxAnimationSprites'][_0x27dee1(0x4b4)]>0x0;},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0xd7)]=function(){const _0x1c2657=_0x17e81a;for(const _0x672416 of this[_0x1c2657(0x4f1)]){!_0x672416[_0x1c2657(0x493)]()&&this[_0x1c2657(0x1de)](_0x672416);}this['processPointAnimationRequests']();},Spriteset_Base[_0x17e81a(0x44d)]['processPointAnimationRequests']=function(){const _0x159ed5=_0x17e81a;for(;;){const _0x4fe5ef=$gameTemp[_0x159ed5(0x1fe)]();if(_0x4fe5ef)this[_0x159ed5(0x4d9)](_0x4fe5ef);else break;}},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x4d9)]=function(_0xb99473){const _0x3c34d1=_0x17e81a,_0x2f8baa=$dataAnimations[_0xb99473[_0x3c34d1(0x793)]],_0x2f306b=this[_0x3c34d1(0x71c)](_0xb99473),_0x202018=_0xb99473['mirror'],_0x4eaa93=_0xb99473[_0x3c34d1(0x884)];let _0x31d57b=this['animationBaseDelay']();const _0x3a198f=this[_0x3c34d1(0x619)]();if(this[_0x3c34d1(0x1ab)](_0x2f8baa))for(const _0x31c0b3 of _0x2f306b){this['createPointAnimationSprite']([_0x31c0b3],_0x2f8baa,_0x202018,_0x31d57b,_0x4eaa93),_0x31d57b+=_0x3a198f;}else this[_0x3c34d1(0x214)](_0x2f306b,_0x2f8baa,_0x202018,_0x31d57b,_0x4eaa93);},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x71c)]=function(_0x5c1f74){const _0x3f2250=_0x17e81a,_0x15a169=new Sprite_Clickable(),_0x1d882a=this[_0x3f2250(0x6da)]();_0x15a169['x']=_0x5c1f74['x']-_0x1d882a['x'],_0x15a169['y']=_0x5c1f74['y']-_0x1d882a['y'],_0x15a169['z']=0x64;const _0x4be275=this[_0x3f2250(0x6da)]();return _0x4be275['addChild'](_0x15a169),[_0x15a169];},Spriteset_Base['prototype']['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x17e81a(0x44d)][_0x17e81a(0x6da)]=function(){const _0x34ea3b=_0x17e81a;return this[_0x34ea3b(0x16b)]||this;},Spriteset_Battle[_0x17e81a(0x44d)]['getPointAnimationLayer']=function(){const _0x6d41a5=_0x17e81a;return this[_0x6d41a5(0x6a8)]||this;},Spriteset_Base['prototype'][_0x17e81a(0x214)]=function(_0x9fafc1,_0x47740c,_0x248660,_0x46d404,_0x546fc8){const _0x17a059=_0x17e81a,_0x1ffa62=this[_0x17a059(0x7b4)](_0x47740c),_0x39427d=new(_0x1ffa62?Sprite_AnimationMV:Sprite_Animation)();_0x39427d['targetObjects']=_0x9fafc1,_0x39427d[_0x17a059(0x2f3)](_0x9fafc1,_0x47740c,_0x248660,_0x46d404),_0x39427d[_0x17a059(0x27b)](_0x546fc8),this['addAnimationSpriteToContainer'](_0x39427d),this[_0x17a059(0x4f1)][_0x17a059(0x189)](_0x39427d);},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x1de)]=function(_0x4da03d){const _0x134aa7=_0x17e81a;this[_0x134aa7(0x4f1)][_0x134aa7(0x723)](_0x4da03d),this['_effectsContainer'][_0x134aa7(0x2d1)](_0x4da03d);for(const _0x322cac of _0x4da03d[_0x134aa7(0x886)]){_0x322cac[_0x134aa7(0x794)]&&_0x322cac['endAnimation']();const _0x372394=this[_0x134aa7(0x6da)]();if(_0x372394)_0x372394[_0x134aa7(0x2d1)](_0x322cac);}_0x4da03d[_0x134aa7(0x2c7)]();},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x16f)]=function(){const _0x2a5ae9=_0x17e81a;for(const _0x48779c of this[_0x2a5ae9(0x4f1)]){this[_0x2a5ae9(0x1de)](_0x48779c);}},Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x697)]=function(){const _0x5bc262=_0x17e81a;return this[_0x5bc262(0x4f1)]['length']>0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x486)]=Spriteset_Base[_0x17e81a(0x44d)]['isAnimationPlaying'],Spriteset_Base[_0x17e81a(0x44d)][_0x17e81a(0x4bf)]=function(){const _0x1c5130=_0x17e81a;return VisuMZ[_0x1c5130(0x1a7)][_0x1c5130(0x486)][_0x1c5130(0x65e)](this)||this[_0x1c5130(0x697)]();},Spriteset_Map[_0x17e81a(0x77b)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x51f)]['DetachMapPictureContainer']||![],VisuMZ['CoreEngine']['Scene_Map_createSpriteset_detach']=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x6d7)],Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x6d7)]=function(){const _0xa207bc=_0x17e81a;VisuMZ['CoreEngine'][_0xa207bc(0x74b)][_0xa207bc(0x65e)](this);if(!Spriteset_Map[_0xa207bc(0x77b)])return;const _0x534715=this[_0xa207bc(0x552)];if(!_0x534715)return;this['_pictureContainer']=_0x534715['_pictureContainer'];if(!this['_pictureContainer'])return;this['addChild'](this[_0xa207bc(0x507)]);},VisuMZ[_0x17e81a(0x1a7)]['Spriteset_Map_createTilemap']=Spriteset_Map[_0x17e81a(0x44d)]['createTilemap'],Spriteset_Map[_0x17e81a(0x44d)][_0x17e81a(0x54c)]=function(){const _0x2062da=_0x17e81a;VisuMZ[_0x2062da(0x1a7)]['Spriteset_Map_createTilemap'][_0x2062da(0x65e)](this),this[_0x2062da(0x3a5)]();},Spriteset_Map[_0x17e81a(0x44d)][_0x17e81a(0x3a5)]=function(){const _0xe56f32=_0x17e81a,_0x5d420c=$gameMap['tileset']();if(!_0x5d420c)return;const _0x4a7353=$gameMap['getTileExtendTerrainTags']();if(Object[_0xe56f32(0x4b9)](_0x4a7353)[_0xe56f32(0x4b4)]<=0x0)return;const _0xe8e950=$gameMap[_0xe56f32(0x343)]();this[_0xe56f32(0x165)]=this[_0xe56f32(0x165)]||[];for(let _0x3c6ab2=0x0;_0x3c6ab2<$gameMap[_0xe56f32(0x4a1)]();_0x3c6ab2++){for(let _0x1cd03c=0x0;_0x1cd03c<$gameMap['width']();_0x1cd03c++){for(const _0x4b13bd of $gameMap[_0xe56f32(0x2c1)](_0x1cd03c,_0x3c6ab2)){const _0x50c6f0=_0xe8e950[_0x4b13bd]>>0xc,_0xea50f4=_0x4a7353[_0x50c6f0]||0x0;if(_0xea50f4<=0x0)continue;this['createExtendedTileSprite'](_0x1cd03c,_0x3c6ab2,_0x4b13bd,_0xea50f4);}}}},Spriteset_Map[_0x17e81a(0x44d)][_0x17e81a(0x784)]=function(){const _0x351898=_0x17e81a;this[_0x351898(0x165)]=this[_0x351898(0x165)]||[];for(const _0x40655a of this[_0x351898(0x165)]){this[_0x351898(0x16b)][_0x351898(0x2d1)](_0x40655a);}this[_0x351898(0x165)]=[];},Spriteset_Map['prototype'][_0x17e81a(0x3dc)]=function(_0x4de7ec,_0x15cbd6,_0x4e3d6a,_0x369765){const _0x10112c=_0x17e81a,_0x11abe0=new Sprite_ExtendedTile(_0x4de7ec,_0x15cbd6,_0x4e3d6a,_0x369765),_0x32c5fb=$gameMap['tilesetFlags']();_0x32c5fb[_0x4e3d6a]&0x10?_0x11abe0['z']=0x4:_0x11abe0['z']=0x3,this[_0x10112c(0x16b)][_0x10112c(0x487)](_0x11abe0),this[_0x10112c(0x165)][_0x10112c(0x189)](_0x11abe0);},VisuMZ[_0x17e81a(0x1a7)]['Tilemap_addSpotTile']=Tilemap[_0x17e81a(0x44d)][_0x17e81a(0x533)],Tilemap[_0x17e81a(0x44d)][_0x17e81a(0x533)]=function(_0x34bcbb,_0x502822,_0x40ee3b){const _0x775bf4=_0x17e81a;if($gameMap['isTileExtended'](_0x34bcbb))return;VisuMZ[_0x775bf4(0x1a7)][_0x775bf4(0x2a8)][_0x775bf4(0x65e)](this,_0x34bcbb,_0x502822,_0x40ee3b);},Spriteset_Battle[_0x17e81a(0x77b)]=VisuMZ['CoreEngine']['Settings'][_0x17e81a(0x51f)]['DetachBattlePictureContainer']||![],VisuMZ[_0x17e81a(0x1a7)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x17e81a(0x44d)]['createSpriteset'],Scene_Battle[_0x17e81a(0x44d)][_0x17e81a(0x6d7)]=function(){const _0x270613=_0x17e81a;VisuMZ[_0x270613(0x1a7)][_0x270613(0xa0)][_0x270613(0x65e)](this);if(!Spriteset_Battle[_0x270613(0x77b)])return;const _0x303016=this[_0x270613(0x552)];if(!_0x303016)return;this[_0x270613(0x507)]=_0x303016[_0x270613(0x507)];if(!this[_0x270613(0x507)])return;this[_0x270613(0x487)](this[_0x270613(0x507)]);},Spriteset_Battle[_0x17e81a(0x44d)][_0x17e81a(0x3b1)]=function(){const _0x3073b5=_0x17e81a;this[_0x3073b5(0x215)]=new PIXI['filters'][(_0x3073b5(0x5d9))](clamp=!![]),this[_0x3073b5(0x77d)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager['backgroundBitmap'](),this[_0x3073b5(0x77d)][_0x3073b5(0x4f5)]=[this[_0x3073b5(0x215)]],this['_baseSprite'][_0x3073b5(0x487)](this[_0x3073b5(0x77d)]);},VisuMZ[_0x17e81a(0x1a7)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x17e81a(0x44d)][_0x17e81a(0x28d)],Spriteset_Battle[_0x17e81a(0x44d)][_0x17e81a(0x28d)]=function(){const _0x3ba854=_0x17e81a;this['coreEngineRepositionEnemies']()&&this['repositionEnemiesByResolution'](),VisuMZ[_0x3ba854(0x1a7)][_0x3ba854(0x6db)]['call'](this);},Spriteset_Battle[_0x17e81a(0x44d)]['coreEngineRepositionEnemies']=function(){const _0x475210=_0x17e81a,_0x2c0630=VisuMZ[_0x475210(0x1a7)][_0x475210(0x26d)]['ScreenResolution'];if(!_0x2c0630)return![];if(Utils['RPGMAKER_VERSION']>='1.3.0'&&!_0x2c0630[_0x475210(0x30f)])return![];return _0x2c0630[_0x475210(0x458)];},Spriteset_Battle[_0x17e81a(0x44d)][_0x17e81a(0x673)]=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x17e81a(0x44d)]['initialize'],Window_Base[_0x17e81a(0x44d)]['initialize']=function(_0x1080d1){const _0x2c6e92=_0x17e81a;_0x1080d1['x']=Math[_0x2c6e92(0x397)](_0x1080d1['x']),_0x1080d1['y']=Math['round'](_0x1080d1['y']),_0x1080d1[_0x2c6e92(0x107)]=Math[_0x2c6e92(0x397)](_0x1080d1[_0x2c6e92(0x107)]),_0x1080d1['height']=Math['round'](_0x1080d1[_0x2c6e92(0x4a1)]),this['initDigitGrouping'](),VisuMZ[_0x2c6e92(0x1a7)][_0x2c6e92(0x325)][_0x2c6e92(0x65e)](this,_0x1080d1),this[_0x2c6e92(0xcc)]();},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x1e7)]=function(){const _0x2e13a6=_0x17e81a;this[_0x2e13a6(0x196)]=VisuMZ[_0x2e13a6(0x1a7)][_0x2e13a6(0x26d)]['QoL'][_0x2e13a6(0x140)],this[_0x2e13a6(0x7e3)]=VisuMZ[_0x2e13a6(0x1a7)][_0x2e13a6(0x26d)][_0x2e13a6(0x51f)][_0x2e13a6(0x71b)];},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x28c)]=function(){const _0x42edd8=_0x17e81a;return VisuMZ[_0x42edd8(0x1a7)][_0x42edd8(0x26d)][_0x42edd8(0x264)][_0x42edd8(0x7ed)];},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x150)]=function(){const _0x3e3b8d=_0x17e81a;return VisuMZ['CoreEngine'][_0x3e3b8d(0x26d)][_0x3e3b8d(0x264)][_0x3e3b8d(0x7f8)];},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x74e)]=function(){const _0x6fc85b=_0x17e81a;$gameSystem['windowOpacity']?this[_0x6fc85b(0x433)]=$gameSystem[_0x6fc85b(0x7eb)]():this[_0x6fc85b(0x433)]=VisuMZ[_0x6fc85b(0x1a7)][_0x6fc85b(0x26d)]['Window'][_0x6fc85b(0x21b)];},Window_Base[_0x17e81a(0x44d)]['translucentOpacity']=function(){const _0x1ec053=_0x17e81a;return VisuMZ[_0x1ec053(0x1a7)][_0x1ec053(0x26d)][_0x1ec053(0x264)][_0x1ec053(0x7d2)];},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x262)]=function(){const _0x485586=_0x17e81a;return VisuMZ[_0x485586(0x1a7)][_0x485586(0x26d)][_0x485586(0x264)][_0x485586(0x36a)];},VisuMZ[_0x17e81a(0x1a7)]['Window_Base_update']=Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x2a6)],Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x183aa6=_0x17e81a;VisuMZ[_0x183aa6(0x1a7)][_0x183aa6(0x457)]['call'](this),this[_0x183aa6(0x7f3)]();},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x2dd)]=function(){const _0x59253a=_0x17e81a;this[_0x59253a(0xba)]&&(this[_0x59253a(0x5a3)]+=this[_0x59253a(0x262)](),this[_0x59253a(0x468)]()&&(this['_opening']=![]));},Window_Base['prototype'][_0x17e81a(0x7db)]=function(){const _0xa77234=_0x17e81a;this[_0xa77234(0x77f)]&&(this['openness']-=this[_0xa77234(0x262)](),this[_0xa77234(0x139)]()&&(this[_0xa77234(0x77f)]=![]));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x7e6)]=Window_Base['prototype'][_0x17e81a(0x821)],Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x821)]=function(_0x1cc060,_0x265e6e,_0x44aeae,_0x36bd7d,_0x3e6d9a){const _0x2c7601=_0x17e81a;if(this[_0x2c7601(0x83f)]())_0x1cc060=VisuMZ[_0x2c7601(0x6c8)](_0x1cc060);VisuMZ[_0x2c7601(0x1a7)][_0x2c7601(0x7e6)]['call'](this,_0x1cc060,_0x265e6e,_0x44aeae,_0x36bd7d,_0x3e6d9a);},Window_Base['prototype']['useDigitGrouping']=function(){const _0x715e6d=_0x17e81a;return this[_0x715e6d(0x196)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x69c)]=Window_Base[_0x17e81a(0x44d)]['createTextState'],Window_Base[_0x17e81a(0x44d)]['createTextState']=function(_0x41c51d,_0x1051f1,_0x9f51e5,_0x5c6e5f){const _0x2dabe1=_0x17e81a;var _0x160a8d=VisuMZ['CoreEngine'][_0x2dabe1(0x69c)][_0x2dabe1(0x65e)](this,_0x41c51d,_0x1051f1,_0x9f51e5,_0x5c6e5f);if(this['useDigitGroupingEx']())_0x160a8d[_0x2dabe1(0x443)]=String(VisuMZ['GroupDigits'](_0x160a8d['text']))||'';return _0x160a8d;},Window_Base['prototype'][_0x17e81a(0x205)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x46c)]=function(_0x1af015){const _0x27c141=_0x17e81a;this[_0x27c141(0x196)]=_0x1af015;},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x696)]=function(_0x2a6ee7){this['_digitGroupingEx']=_0x2a6ee7;},VisuMZ['CoreEngine'][_0x17e81a(0x14e)]=Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x31e)],Window_Base[_0x17e81a(0x44d)]['drawIcon']=function(_0x1d89a5,_0x3171d9,_0x3e91bf){const _0x5cce03=_0x17e81a;_0x3171d9=Math[_0x5cce03(0x397)](_0x3171d9),_0x3e91bf=Math[_0x5cce03(0x397)](_0x3e91bf),VisuMZ[_0x5cce03(0x1a7)][_0x5cce03(0x14e)][_0x5cce03(0x65e)](this,_0x1d89a5,_0x3171d9,_0x3e91bf);},VisuMZ[_0x17e81a(0x1a7)]['Window_Base_drawFace']=Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x167)],Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x167)]=function(_0x1fbf73,_0x439b00,_0x43c7b1,_0x3ead45,_0x548de5,_0x45a3e5){const _0xcc06ed=_0x17e81a;_0x548de5=_0x548de5||ImageManager[_0xcc06ed(0x390)],_0x45a3e5=_0x45a3e5||ImageManager[_0xcc06ed(0x39e)],_0x43c7b1=Math[_0xcc06ed(0x397)](_0x43c7b1),_0x3ead45=Math[_0xcc06ed(0x397)](_0x3ead45),_0x548de5=Math[_0xcc06ed(0x397)](_0x548de5),_0x45a3e5=Math[_0xcc06ed(0x397)](_0x45a3e5),VisuMZ['CoreEngine']['Window_Base_drawFace'][_0xcc06ed(0x65e)](this,_0x1fbf73,_0x439b00,_0x43c7b1,_0x3ead45,_0x548de5,_0x45a3e5);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x32a)]=Window_Base[_0x17e81a(0x44d)]['drawCharacter'],Window_Base[_0x17e81a(0x44d)]['drawCharacter']=function(_0x4d4b42,_0x57d255,_0x1a4860,_0x3ec32f){const _0x20554a=_0x17e81a;_0x1a4860=Math['round'](_0x1a4860),_0x3ec32f=Math['round'](_0x3ec32f),VisuMZ[_0x20554a(0x1a7)][_0x20554a(0x32a)][_0x20554a(0x65e)](this,_0x4d4b42,_0x57d255,_0x1a4860,_0x3ec32f);},VisuMZ['CoreEngine'][_0x17e81a(0x372)]=Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x798)],Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x798)]=function(_0x2068a6){const _0x171179=_0x17e81a;let _0x538a02=VisuMZ[_0x171179(0x1a7)][_0x171179(0x372)][_0x171179(0x65e)](this,_0x2068a6);return _0x538a02['x']=Math['round'](_0x538a02['x']),_0x538a02['y']=Math[_0x171179(0x397)](_0x538a02['y']),_0x538a02[_0x171179(0x107)]=Math['round'](_0x538a02['width']),_0x538a02[_0x171179(0x4a1)]=Math['round'](_0x538a02['height']),_0x538a02;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x1d0)]=Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x602)],Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x602)]=function(_0x85a607,_0x225648,_0x3913cc){const _0x4927b9=_0x17e81a;_0x225648=Math[_0x4927b9(0x397)](_0x225648),_0x3913cc=Math['round'](_0x3913cc),VisuMZ[_0x4927b9(0x1a7)][_0x4927b9(0x1d0)][_0x4927b9(0x65e)](this,_0x85a607,_0x225648,_0x3913cc);},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0xcc)]=function(){const _0x3fa989=_0x17e81a;this[_0x3fa989(0x6a7)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x3fa989(0x5d7)]['x'],'targetScaleY':this[_0x3fa989(0x5d7)]['y'],'targetOpacity':this[_0x3fa989(0x233)],'targetBackOpacity':this[_0x3fa989(0x433)],'targetContentsOpacity':this[_0x3fa989(0x628)]};},Window_Base['prototype'][_0x17e81a(0x7f3)]=function(){const _0x186970=_0x17e81a;if(!this[_0x186970(0x6a7)])return;if(this[_0x186970(0x6a7)][_0x186970(0x7b5)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x186970(0x6a7)][_0x186970(0x49f)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x186970(0x6a7)]['targetY']),this[_0x186970(0x5d7)]['x']=this[_0x186970(0x814)](this['scale']['x'],this[_0x186970(0x6a7)][_0x186970(0x238)]),this[_0x186970(0x5d7)]['y']=this[_0x186970(0x814)](this['scale']['y'],this[_0x186970(0x6a7)]['targetScaleY']),this[_0x186970(0x233)]=this[_0x186970(0x814)](this['opacity'],this['_coreEasing'][_0x186970(0x812)]),this[_0x186970(0x433)]=this[_0x186970(0x814)](this['backOpacity'],this['_coreEasing'][_0x186970(0x423)]),this['contentsOpacity']=this[_0x186970(0x814)](this[_0x186970(0x628)],this['_coreEasing']['targetContentsOpacity']),this[_0x186970(0x6a7)][_0x186970(0x7b5)]--;},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x814)]=function(_0x4a7f2f,_0x317c6a){const _0x5e5eb5=_0x17e81a;if(!this[_0x5e5eb5(0x6a7)])return _0x317c6a;const _0x274dc9=this[_0x5e5eb5(0x6a7)][_0x5e5eb5(0x7b5)],_0x3ce29b=this[_0x5e5eb5(0x6a7)]['wholeDuration'],_0x104a2f=this[_0x5e5eb5(0x1f1)]((_0x3ce29b-_0x274dc9)/_0x3ce29b),_0x5abd55=this[_0x5e5eb5(0x1f1)]((_0x3ce29b-_0x274dc9+0x1)/_0x3ce29b),_0x47224c=(_0x4a7f2f-_0x317c6a*_0x104a2f)/(0x1-_0x104a2f);return _0x47224c+(_0x317c6a-_0x47224c)*_0x5abd55;},Window_Base['prototype'][_0x17e81a(0x1f1)]=function(_0x38e419){const _0x260da1=_0x17e81a;if(!this[_0x260da1(0x6a7)])return _0x38e419;return VisuMZ[_0x260da1(0x5be)](_0x38e419,this[_0x260da1(0x6a7)][_0x260da1(0x789)]||_0x260da1(0x4f0));},Window_Base['prototype'][_0x17e81a(0x6df)]=function(_0x227812,_0x338be3){const _0x37febd=_0x17e81a;if(!this[_0x37febd(0x6a7)])return;this['x']=this['_coreEasing'][_0x37febd(0x49f)],this['y']=this['_coreEasing']['targetY'],this['scale']['x']=this[_0x37febd(0x6a7)][_0x37febd(0x238)],this[_0x37febd(0x5d7)]['y']=this[_0x37febd(0x6a7)][_0x37febd(0x74a)],this[_0x37febd(0x233)]=this[_0x37febd(0x6a7)][_0x37febd(0x812)],this[_0x37febd(0x433)]=this['_coreEasing'][_0x37febd(0x423)],this[_0x37febd(0x628)]=this['_coreEasing'][_0x37febd(0x5f1)],this[_0x37febd(0x7c6)](_0x227812,_0x338be3,this['x'],this['y'],this['scale']['x'],this[_0x37febd(0x5d7)]['y'],this[_0x37febd(0x233)],this[_0x37febd(0x433)],this[_0x37febd(0x628)]);},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x7c6)]=function(_0xa71c49,_0x10658a,_0x3a78f2,_0x1579f1,_0x1315f8,_0x2a964c,_0x3dbbd9,_0x2d9a6d,_0xcf5220){this['_coreEasing']={'duration':_0xa71c49,'wholeDuration':_0xa71c49,'type':_0x10658a,'targetX':_0x3a78f2,'targetY':_0x1579f1,'targetScaleX':_0x1315f8,'targetScaleY':_0x2a964c,'targetOpacity':_0x3dbbd9,'targetBackOpacity':_0x2d9a6d,'targetContentsOpacity':_0xcf5220};},Window_Base[_0x17e81a(0x44d)]['drawCurrencyValue']=function(_0x20e4d1,_0x542f4b,_0x2de994,_0x112b27,_0x299294){const _0x11e4c5=_0x17e81a;this[_0x11e4c5(0x3a4)](),this[_0x11e4c5(0x166)]['fontSize']=VisuMZ[_0x11e4c5(0x1a7)][_0x11e4c5(0x26d)]['Gold'][_0x11e4c5(0x32b)];const _0x279ce7=VisuMZ[_0x11e4c5(0x1a7)][_0x11e4c5(0x26d)][_0x11e4c5(0x37c)][_0x11e4c5(0x3fc)];if(_0x279ce7>0x0&&_0x542f4b===TextManager[_0x11e4c5(0xe2)]){const _0x47a010=_0x112b27+(this[_0x11e4c5(0x28c)]()-ImageManager['iconHeight'])/0x2;this[_0x11e4c5(0x31e)](_0x279ce7,_0x2de994+(_0x299294-ImageManager[_0x11e4c5(0x54b)]),_0x47a010),_0x299294-=ImageManager['iconWidth']+0x4;}else this[_0x11e4c5(0x77a)](ColorManager['systemColor']()),this[_0x11e4c5(0x821)](_0x542f4b,_0x2de994,_0x112b27,_0x299294,'right'),_0x299294-=this['textWidth'](_0x542f4b)+0x6;this[_0x11e4c5(0x823)]();const _0x20cb09=this[_0x11e4c5(0x321)](this['_digitGrouping']?VisuMZ[_0x11e4c5(0x6c8)](_0x20e4d1):_0x20e4d1);_0x20cb09>_0x299294?this[_0x11e4c5(0x821)](VisuMZ[_0x11e4c5(0x1a7)][_0x11e4c5(0x26d)][_0x11e4c5(0x37c)][_0x11e4c5(0x5ce)],_0x2de994,_0x112b27,_0x299294,_0x11e4c5(0x669)):this[_0x11e4c5(0x821)](_0x20e4d1,_0x2de994,_0x112b27,_0x299294,_0x11e4c5(0x669)),this['resetFontSettings']();},Window_Base['prototype']['drawIconBySize']=function(_0x5afb36,_0x71474d,_0x361555,_0x5f1a48,_0x38e184){const _0x24aaf3=_0x17e81a,_0x581f29=ImageManager[_0x24aaf3(0x3d8)](_0x24aaf3(0x1b8)),_0x3dae01=ImageManager[_0x24aaf3(0x54b)],_0x6a0eb9=ImageManager[_0x24aaf3(0x800)],_0x4fe486=_0x5afb36%0x10*_0x3dae01,_0x3f25c9=Math['floor'](_0x5afb36/0x10)*_0x6a0eb9,_0x50516d=_0x5f1a48,_0x486982=_0x5f1a48;this[_0x24aaf3(0x166)][_0x24aaf3(0x417)][_0x24aaf3(0x558)]=_0x38e184,this[_0x24aaf3(0x166)]['blt'](_0x581f29,_0x4fe486,_0x3f25c9,_0x3dae01,_0x6a0eb9,_0x71474d,_0x361555,_0x50516d,_0x486982),this[_0x24aaf3(0x166)][_0x24aaf3(0x417)][_0x24aaf3(0x558)]=!![];},Window_Base['prototype'][_0x17e81a(0x399)]=function(_0x23e09a,_0x920ea8,_0x3b28fd,_0x5b0270,_0x5ab071,_0x1aaf07){const _0x7526ef=_0x17e81a,_0x40d164=Math[_0x7526ef(0x2b3)]((_0x3b28fd-0x2)*_0x5b0270),_0x5a2e01=Sprite_Gauge[_0x7526ef(0x44d)][_0x7526ef(0x3c7)]['call'](this),_0x10adee=_0x920ea8+this[_0x7526ef(0x28c)]()-_0x5a2e01-0x2;this[_0x7526ef(0x166)][_0x7526ef(0x2b2)](_0x23e09a,_0x10adee,_0x3b28fd,_0x5a2e01,ColorManager[_0x7526ef(0x756)]()),this[_0x7526ef(0x166)][_0x7526ef(0x255)](_0x23e09a+0x1,_0x10adee+0x1,_0x40d164,_0x5a2e01-0x2,_0x5ab071,_0x1aaf07);},Window_Scrollable[_0x17e81a(0x1e6)]={'enabled':VisuMZ[_0x17e81a(0x1a7)]['Settings'][_0x17e81a(0x264)][_0x17e81a(0x36d)]??!![],'thickness':VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)]['Window'][_0x17e81a(0x3c6)]??0x2,'offset':VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x264)][_0x17e81a(0x7ce)]??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x17e81a(0x26d)]['Window']['BarBodyColor']??0x0,'offColor':VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x264)][_0x17e81a(0xec)]??0x7,'offOpacity':VisuMZ['CoreEngine']['Settings'][_0x17e81a(0x264)][_0x17e81a(0xbb)]??0x80},Window_Base[_0x17e81a(0x44d)]['isScrollBarVisible']=function(){const _0x152f80=_0x17e81a;return Window_Scrollable[_0x152f80(0x1e6)]['enabled']&&Window_Scrollable[_0x152f80(0x1e6)]['thickness']>0x0;},VisuMZ[_0x17e81a(0x1a7)]['Window_Base_createContents']=Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x331)],Window_Base['prototype'][_0x17e81a(0x331)]=function(){const _0x35e6bb=_0x17e81a;VisuMZ[_0x35e6bb(0x1a7)]['Window_Base_createContents'][_0x35e6bb(0x65e)](this),this[_0x35e6bb(0x9d)](),this[_0x35e6bb(0x6f9)](!![]),this[_0x35e6bb(0x6f9)](![]);},Window_Base[_0x17e81a(0x44d)]['createScrollBarSprites']=function(){const _0x31f47b=_0x17e81a;if(!this[_0x31f47b(0x67e)]())return;if(this[_0x31f47b(0x859)]||this[_0x31f47b(0x538)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x31f47b(0x859)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this['addChild'](this[_0x31f47b(0x859)]),this[_0x31f47b(0x487)](this[_0x31f47b(0x538)]);},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x6f9)]=function(_0x1df8cf){const _0x5da309=_0x17e81a,_0x2716f2=_0x1df8cf?this[_0x5da309(0x859)]:this['_scrollBarVert'];if(!_0x2716f2)return;const _0x4bf831=Window_Scrollable[_0x5da309(0x1e6)],_0x2c3098=_0x4bf831[_0x5da309(0x55b)],_0x5eca11=_0x1df8cf?this[_0x5da309(0x2f1)]-_0x2c3098*0x2:_0x2c3098,_0x542551=_0x1df8cf?_0x2c3098:this[_0x5da309(0x177)]-_0x2c3098*0x2;_0x2716f2['bitmap']=new Bitmap(_0x5eca11,_0x542551),_0x2716f2['setFrame'](0x0,0x0,_0x5eca11,_0x542551),this[_0x5da309(0x428)](_0x1df8cf);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3ff)]=Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x269)],Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x269)]=function(){const _0x5d0c56=_0x17e81a;VisuMZ[_0x5d0c56(0x1a7)][_0x5d0c56(0x3ff)][_0x5d0c56(0x65e)](this),this[_0x5d0c56(0x7d6)]();},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x7d6)]=function(){const _0xa9151b=_0x17e81a,_0x102cf3=[this['_scrollBarHorz'],this[_0xa9151b(0x538)]];for(const _0x159071 of _0x102cf3){if(_0x159071&&_0x159071[_0xa9151b(0x313)])_0x159071[_0xa9151b(0x313)]['destroy']();}},VisuMZ['CoreEngine'][_0x17e81a(0x144)]=Window_Scrollable['prototype']['update'],Window_Scrollable[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x45a73c=_0x17e81a;VisuMZ['CoreEngine']['Window_Scrollable_update'][_0x45a73c(0x65e)](this),this[_0x45a73c(0x72f)]();},Window_Scrollable[_0x17e81a(0x44d)][_0x17e81a(0x72f)]=function(){const _0x16a69d=_0x17e81a;this['updateScrollBarVisibility'](),this[_0x16a69d(0x319)](!![]),this[_0x16a69d(0x319)](![]),this[_0x16a69d(0x428)](!![]),this[_0x16a69d(0x428)](![]);},Window_Scrollable['prototype']['updateScrollBarVisibility']=function(){const _0x3a6921=_0x17e81a,_0xcdcb7a=[this['_scrollBarHorz'],this[_0x3a6921(0x538)]];for(const _0x207bd6 of _0xcdcb7a){_0x207bd6&&(_0x207bd6['visible']=this[_0x3a6921(0x67e)]()&&this[_0x3a6921(0x468)]());}},Window_Scrollable[_0x17e81a(0x44d)]['checkScrollBarBitmap']=function(_0x1a62f6){const _0x48e360=_0x17e81a;if(!this[_0x48e360(0x846)])return;const _0x26be11=this[_0x48e360(0x791)](_0x1a62f6),_0x152aca=this[_0x48e360(0x4b3)](_0x1a62f6),_0x5580b3=_0x1a62f6?_0x48e360(0x4e0):'vert',_0x36b2c5=_0x1a62f6?_0x48e360(0x352):_0x48e360(0x3ae);(this[_0x48e360(0x846)][_0x5580b3]!==_0x26be11||this[_0x48e360(0x846)][_0x36b2c5]!==_0x152aca)&&(this[_0x48e360(0x846)][_0x5580b3]=_0x26be11,this[_0x48e360(0x846)][_0x36b2c5]=_0x152aca,this[_0x48e360(0x1dc)](_0x1a62f6,_0x26be11,_0x152aca));},Window_Scrollable[_0x17e81a(0x44d)][_0x17e81a(0x791)]=function(_0x24d923){const _0x3585b7=_0x17e81a;if(this[_0x3585b7(0x832)]!==undefined)return _0x24d923?this[_0x3585b7(0x16e)]():this[_0x3585b7(0xeb)]['y'];return _0x24d923?this[_0x3585b7(0x16e)]():this[_0x3585b7(0x11a)]();},Window_Scrollable[_0x17e81a(0x44d)][_0x17e81a(0x4b3)]=function(_0x1f9e02){const _0x19ec05=_0x17e81a;if(this[_0x19ec05(0x832)]!==undefined)return _0x1f9e02?this[_0x19ec05(0x18c)]():Math['max'](0x0,this[_0x19ec05(0x832)]-this[_0x19ec05(0x177)]);return _0x1f9e02?this[_0x19ec05(0x18c)]():this[_0x19ec05(0x847)]();},Window_Scrollable[_0x17e81a(0x44d)][_0x17e81a(0x14c)]=function(){const _0x393569=_0x17e81a;if(this[_0x393569(0x832)]!==undefined)return Math['max'](0x0,this[_0x393569(0x832)]);return this[_0x393569(0x7bd)]();},Window_Scrollable[_0x17e81a(0x44d)][_0x17e81a(0x1dc)]=function(_0x3e8b82,_0x5d1dde,_0xe94db7){const _0x363fb7=_0x17e81a,_0x3b4ece=_0x3e8b82?this[_0x363fb7(0x859)]:this[_0x363fb7(0x538)];if(!_0x3b4ece)return;if(!_0x3b4ece['bitmap'])return;const _0xad8e9b=_0x3b4ece[_0x363fb7(0x313)];_0xad8e9b['clear']();if(_0xe94db7<=0x0)return;const _0x15155a=_0x3e8b82?this[_0x363fb7(0x2f1)]/this[_0x363fb7(0x252)]():this[_0x363fb7(0x177)]/this[_0x363fb7(0x14c)](),_0x5cff14=_0x3e8b82?Math['round'](_0x5d1dde*_0x15155a):0x0,_0x1732a0=_0x3e8b82?0x0:Math[_0x363fb7(0x397)](_0x5d1dde*_0x15155a),_0x3936a8=_0x3e8b82?Math['round'](_0xad8e9b[_0x363fb7(0x107)]*_0x15155a):_0xad8e9b[_0x363fb7(0x107)],_0x357c4c=_0x3e8b82?_0xad8e9b[_0x363fb7(0x4a1)]:Math[_0x363fb7(0x397)](_0xad8e9b['height']*_0x15155a),_0x4c8cea=Window_Scrollable[_0x363fb7(0x1e6)],_0x3d6a29=ColorManager[_0x363fb7(0x5cd)](_0x4c8cea[_0x363fb7(0x3e2)]),_0x319cd1=ColorManager['getColor'](_0x4c8cea[_0x363fb7(0x357)]),_0x56c3c7=_0x4c8cea['offOpacity'];_0xad8e9b[_0x363fb7(0xcf)]=_0x56c3c7,_0xad8e9b[_0x363fb7(0x511)](_0x3d6a29),_0xad8e9b[_0x363fb7(0xcf)]=0xff,_0xad8e9b[_0x363fb7(0x2b2)](_0x5cff14,_0x1732a0,_0x3936a8,_0x357c4c,_0x319cd1);},Window_Base['prototype'][_0x17e81a(0x428)]=function(_0xaa2be3){const _0x4d0810=_0x17e81a,_0x448fb1=_0xaa2be3?this[_0x4d0810(0x859)]:this['_scrollBarVert'];if(!_0x448fb1)return;const _0x1c8219=Window_Scrollable[_0x4d0810(0x1e6)],_0x4a764a=_0x1c8219[_0x4d0810(0x55b)],_0x593479=_0x1c8219[_0x4d0810(0x109)];if(!_0x448fb1[_0x4d0810(0x2dc)])return;_0x448fb1['x']=this[_0x4d0810(0x3a7)]+(_0xaa2be3?_0x4a764a:this[_0x4d0810(0x2f1)]+_0x593479),_0x448fb1['y']=this['padding']+(_0xaa2be3?this['innerHeight']+_0x593479:_0x4a764a);},Window_Selectable[_0x17e81a(0x44d)]['cursorDown']=function(_0x56ee10){const _0x354d93=_0x17e81a;let _0x53bddc=this[_0x354d93(0x41d)]();const _0x3e18e9=this[_0x354d93(0x1ed)](),_0x11ae0d=this[_0x354d93(0x4a9)]();if(this[_0x354d93(0x2b4)]()&&(_0x53bddc<_0x3e18e9||_0x56ee10&&_0x11ae0d===0x1)){_0x53bddc+=_0x11ae0d;if(_0x53bddc>=_0x3e18e9)_0x53bddc=_0x3e18e9-0x1;this[_0x354d93(0x6ea)](_0x53bddc);}else!this[_0x354d93(0x2b4)]()&&((_0x53bddc<_0x3e18e9-_0x11ae0d||_0x56ee10&&_0x11ae0d===0x1)&&this[_0x354d93(0x6ea)]((_0x53bddc+_0x11ae0d)%_0x3e18e9));},VisuMZ[_0x17e81a(0x1a7)]['Window_Selectable_cursorDown']=Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x72d)],Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x72d)]=function(_0x1b737c){const _0x50f5a0=_0x17e81a;this[_0x50f5a0(0x2b4)]()&&_0x1b737c&&this[_0x50f5a0(0x4a9)]()===0x1&&this['index']()===this['maxItems']()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x50f5a0(0x1a7)][_0x50f5a0(0x45f)]['call'](this,_0x1b737c);},Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x68b)]=function(_0x5ace30){const _0x1a2b41=_0x17e81a;let _0x21a751=Math[_0x1a2b41(0x744)](0x0,this[_0x1a2b41(0x41d)]());const _0x453eed=this[_0x1a2b41(0x1ed)](),_0x4ba3c8=this['maxCols']();if(this[_0x1a2b41(0x2b4)]()&&_0x21a751>0x0||_0x5ace30&&_0x4ba3c8===0x1){_0x21a751-=_0x4ba3c8;if(_0x21a751<=0x0)_0x21a751=0x0;this[_0x1a2b41(0x6ea)](_0x21a751);}else!this[_0x1a2b41(0x2b4)]()&&((_0x21a751>=_0x4ba3c8||_0x5ace30&&_0x4ba3c8===0x1)&&this[_0x1a2b41(0x6ea)]((_0x21a751-_0x4ba3c8+_0x453eed)%_0x453eed));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x880)]=Window_Selectable['prototype']['cursorUp'],Window_Selectable[_0x17e81a(0x44d)]['cursorUp']=function(_0x2779b1){const _0x21e18b=_0x17e81a;this['isUseModernControls']()&&_0x2779b1&&this[_0x21e18b(0x4a9)]()===0x1&&this[_0x21e18b(0x41d)]()===0x0?this[_0x21e18b(0x6ea)](this[_0x21e18b(0x1ed)]()-0x1):VisuMZ[_0x21e18b(0x1a7)][_0x21e18b(0x880)]['call'](this,_0x2779b1);},Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x2b4)]=function(){const _0x5bf67d=_0x17e81a;return VisuMZ[_0x5bf67d(0x1a7)][_0x5bf67d(0x26d)][_0x5bf67d(0x51f)]['ModernControls'];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x450)]=Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x40a)],Window_Selectable[_0x17e81a(0x44d)]['processCursorMove']=function(){const _0x35224e=_0x17e81a;this[_0x35224e(0x2b4)]()?(this[_0x35224e(0x5f4)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x35224e(0x1a7)]['Window_Selectable_processCursorMove'][_0x35224e(0x65e)](this);},Window_Selectable[_0x17e81a(0x44d)]['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x17e81a(0x44d)]['processCursorMoveModernControls']=function(){const _0x2a9b00=_0x17e81a;if(this[_0x2a9b00(0x477)]()){const _0x1406b0=this[_0x2a9b00(0x41d)]();Input['isRepeated'](_0x2a9b00(0x2f0))&&(Input[_0x2a9b00(0x197)](_0x2a9b00(0x1bb))&&this['allowShiftScrolling']()?this['cursorPagedown']():this[_0x2a9b00(0x72d)](Input[_0x2a9b00(0x492)]('down'))),Input[_0x2a9b00(0x761)]('up')&&(Input[_0x2a9b00(0x197)](_0x2a9b00(0x1bb))&&this[_0x2a9b00(0x38e)]()?this['cursorPageup']():this[_0x2a9b00(0x68b)](Input[_0x2a9b00(0x492)]('up'))),Input[_0x2a9b00(0x761)](_0x2a9b00(0x669))&&this['cursorRight'](Input['isTriggered']('right')),Input[_0x2a9b00(0x761)](_0x2a9b00(0x7d8))&&this[_0x2a9b00(0x54f)](Input[_0x2a9b00(0x492)](_0x2a9b00(0x7d8))),!this[_0x2a9b00(0x631)](_0x2a9b00(0x1b0))&&Input[_0x2a9b00(0x761)](_0x2a9b00(0x1b0))&&this[_0x2a9b00(0x449)](),!this['isHandled'](_0x2a9b00(0x5d4))&&Input[_0x2a9b00(0x761)](_0x2a9b00(0x5d4))&&this[_0x2a9b00(0x1da)](),this[_0x2a9b00(0x41d)]()!==_0x1406b0&&this[_0x2a9b00(0x2d6)]();}},Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x57d)]=function(){const _0x3bd4eb=_0x17e81a;if(this[_0x3bd4eb(0x477)]()){const _0x46e7c9=this['index']();Input[_0x3bd4eb(0x492)]('home')&&this[_0x3bd4eb(0x6ea)](Math[_0x3bd4eb(0x444)](this['index'](),0x0)),Input[_0x3bd4eb(0x492)]('end')&&this[_0x3bd4eb(0x6ea)](Math[_0x3bd4eb(0x744)](this['index'](),this[_0x3bd4eb(0x1ed)]()-0x1)),this['index']()!==_0x46e7c9&&this[_0x3bd4eb(0x2d6)]();}},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x5f6)]=Window_Selectable['prototype']['processTouch'],Window_Selectable['prototype']['processTouch']=function(){const _0x29a187=_0x17e81a;this[_0x29a187(0x2b4)]()?this[_0x29a187(0x4ab)]():VisuMZ[_0x29a187(0x1a7)][_0x29a187(0x5f6)]['call'](this);},Window_Selectable[_0x17e81a(0x44d)]['processTouchModernControls']=function(){const _0x2a0bca=_0x17e81a;VisuMZ[_0x2a0bca(0x1a7)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0xe4)]=function(){const _0x44d808=_0x17e81a;return VisuMZ[_0x44d808(0x1a7)][_0x44d808(0x26d)][_0x44d808(0x264)][_0x44d808(0x272)];},Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x480)]=function(){const _0x4fca8d=_0x17e81a;return VisuMZ[_0x4fca8d(0x1a7)][_0x4fca8d(0x26d)]['Window'][_0x4fca8d(0x110)];},Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x460)]=function(){const _0x477a91=_0x17e81a;return Window_Scrollable[_0x477a91(0x44d)]['itemHeight'][_0x477a91(0x65e)](this)+VisuMZ[_0x477a91(0x1a7)][_0x477a91(0x26d)][_0x477a91(0x264)][_0x477a91(0x1f6)];;},VisuMZ[_0x17e81a(0x1a7)]['Window_Selectable_drawBackgroundRect']=Window_Selectable['prototype'][_0x17e81a(0x335)],Window_Selectable[_0x17e81a(0x44d)][_0x17e81a(0x335)]=function(_0x4ab791){const _0x3dc838=_0x17e81a,_0x30943b=VisuMZ[_0x3dc838(0x1a7)][_0x3dc838(0x26d)]['Window'];if(_0x30943b[_0x3dc838(0x5c3)]===![])return;_0x30943b[_0x3dc838(0x69e)]?_0x30943b[_0x3dc838(0x69e)][_0x3dc838(0x65e)](this,_0x4ab791):VisuMZ[_0x3dc838(0x1a7)]['Window_Selectable_drawBackgroundRect'][_0x3dc838(0x65e)](this,_0x4ab791);},VisuMZ[_0x17e81a(0x1a7)]['Window_Gold_refresh']=Window_Gold[_0x17e81a(0x44d)][_0x17e81a(0x208)],Window_Gold[_0x17e81a(0x44d)][_0x17e81a(0x208)]=function(){const _0x257058=_0x17e81a;this[_0x257058(0x256)]()?this['drawGoldItemStyle']():VisuMZ[_0x257058(0x1a7)][_0x257058(0x75a)][_0x257058(0x65e)](this);},Window_Gold[_0x17e81a(0x44d)][_0x17e81a(0x256)]=function(){const _0x16d7f8=_0x17e81a;if(TextManager['currencyUnit']!==this[_0x16d7f8(0xe2)]())return![];return VisuMZ[_0x16d7f8(0x1a7)]['Settings'][_0x16d7f8(0x37c)][_0x16d7f8(0x52b)];},Window_Gold['prototype']['drawGoldItemStyle']=function(){const _0x2a4ab4=_0x17e81a;this['resetFontSettings'](),this[_0x2a4ab4(0x166)]['clear'](),this['contents'][_0x2a4ab4(0x296)]=VisuMZ['CoreEngine'][_0x2a4ab4(0x26d)][_0x2a4ab4(0x37c)][_0x2a4ab4(0x32b)];const _0x49f178=VisuMZ['CoreEngine'][_0x2a4ab4(0x26d)][_0x2a4ab4(0x37c)][_0x2a4ab4(0x3fc)],_0x2a0fde=this[_0x2a4ab4(0x47b)](0x0);if(_0x49f178>0x0){const _0x5c3607=ImageManager['standardIconWidth']||0x20,_0x2d0502=_0x5c3607-ImageManager[_0x2a4ab4(0x54b)],_0x19fedf=_0x2a0fde['y']+(this[_0x2a4ab4(0x28c)]()-ImageManager[_0x2a4ab4(0x800)])/0x2;this[_0x2a4ab4(0x31e)](_0x49f178,_0x2a0fde['x']+Math[_0x2a4ab4(0x2a2)](_0x2d0502/0x2),_0x19fedf);const _0x5b63ac=_0x5c3607+0x4;_0x2a0fde['x']+=_0x5b63ac,_0x2a0fde[_0x2a4ab4(0x107)]-=_0x5b63ac;}this['changeTextColor'](ColorManager[_0x2a4ab4(0x3ad)]()),this[_0x2a4ab4(0x821)](this[_0x2a4ab4(0xe2)](),_0x2a0fde['x'],_0x2a0fde['y'],_0x2a0fde[_0x2a4ab4(0x107)],_0x2a4ab4(0x7d8));const _0x59509a=this[_0x2a4ab4(0x321)](this[_0x2a4ab4(0xe2)]())+0x6;;_0x2a0fde['x']+=_0x59509a,_0x2a0fde['width']-=_0x59509a,this[_0x2a4ab4(0x823)]();const _0x34f895=this[_0x2a4ab4(0x33c)](),_0x1ee69c=this[_0x2a4ab4(0x321)](this[_0x2a4ab4(0x196)]?VisuMZ['GroupDigits'](this[_0x2a4ab4(0x33c)]()):this[_0x2a4ab4(0x33c)]());_0x1ee69c>_0x2a0fde[_0x2a4ab4(0x107)]?this['drawText'](VisuMZ[_0x2a4ab4(0x1a7)]['Settings'][_0x2a4ab4(0x37c)][_0x2a4ab4(0x5ce)],_0x2a0fde['x'],_0x2a0fde['y'],_0x2a0fde[_0x2a4ab4(0x107)],'right'):this[_0x2a4ab4(0x821)](this[_0x2a4ab4(0x33c)](),_0x2a0fde['x'],_0x2a0fde['y'],_0x2a0fde[_0x2a4ab4(0x107)],_0x2a4ab4(0x669)),this[_0x2a4ab4(0x3a4)]();},Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x542)]=function(_0x2b2181,_0x3c1050,_0x192f4f,_0x1d0862,_0x1542ae){const _0xeb58f9=_0x17e81a;_0x1d0862=String(_0x1d0862||'')[_0xeb58f9(0x413)]();if(VisuMZ[_0xeb58f9(0x1a7)][_0xeb58f9(0x26d)]['Param'][_0xeb58f9(0x826)]){const _0x523ad9=VisuMZ['GetParamIcon'](_0x1d0862);if(_0x1542ae)this[_0xeb58f9(0x3cc)](_0x523ad9,_0x2b2181,_0x3c1050,this[_0xeb58f9(0x359)]()),_0x192f4f-=this[_0xeb58f9(0x359)]()+0x2,_0x2b2181+=this[_0xeb58f9(0x359)]()+0x2;else{const _0x59d71b=ImageManager[_0xeb58f9(0x6b8)]||0x20,_0x1ebec0=ImageManager['standardIconHeight']||0x20,_0x227592=_0x59d71b-ImageManager[_0xeb58f9(0x54b)],_0x15d86a=_0x1ebec0-ImageManager['iconHeight'];let _0x203a06=0x2,_0x143193=0x2;this[_0xeb58f9(0x28c)]()!==0x24&&(_0x143193=Math[_0xeb58f9(0x2b3)]((this['lineHeight']()-_0x1ebec0)/0x2));const _0x34de46=_0x2b2181+Math[_0xeb58f9(0x2b3)](_0x227592/0x2)+_0x203a06,_0xd29feb=_0x3c1050+Math[_0xeb58f9(0x2b3)](_0x15d86a/0x2)+_0x143193;this[_0xeb58f9(0x31e)](_0x523ad9,_0x34de46,_0xd29feb),_0x192f4f-=_0x59d71b+0x4,_0x2b2181+=_0x59d71b+0x4;}}const _0x27e404=TextManager[_0xeb58f9(0x4bb)](_0x1d0862);this[_0xeb58f9(0x3a4)](),this[_0xeb58f9(0x77a)](ColorManager[_0xeb58f9(0x3ad)]()),_0x1542ae?(this[_0xeb58f9(0x166)]['fontSize']=this['smallParamFontSize'](),this['contents']['drawText'](_0x27e404,_0x2b2181,_0x3c1050,_0x192f4f,this[_0xeb58f9(0x359)](),_0xeb58f9(0x7d8))):this[_0xeb58f9(0x821)](_0x27e404,_0x2b2181,_0x3c1050,_0x192f4f),this[_0xeb58f9(0x3a4)]();},Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x6ba)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x17e81a(0x44d)]['drawActorClass']=function(_0x3092fd,_0x5d9eed,_0x2962ea,_0x132aa6){const _0x19d7e5=_0x17e81a;_0x132aa6=_0x132aa6||0xa8,this[_0x19d7e5(0x823)]();if(VisuMZ[_0x19d7e5(0x1a7)][_0x19d7e5(0x26d)]['UI']['TextCodeClassNames'])this[_0x19d7e5(0x867)](_0x3092fd[_0x19d7e5(0x105)]()[_0x19d7e5(0x320)],_0x5d9eed,_0x2962ea,_0x132aa6);else{const _0x10c3ea=_0x3092fd[_0x19d7e5(0x105)]()[_0x19d7e5(0x320)][_0x19d7e5(0x7b7)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x10c3ea,_0x5d9eed,_0x2962ea,_0x132aa6);}},Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x231)]=function(_0x30500a,_0x31e4b0,_0x49e809,_0x5afba7){const _0x6bbe09=_0x17e81a;_0x5afba7=_0x5afba7||0x10e,this[_0x6bbe09(0x823)]();if(VisuMZ[_0x6bbe09(0x1a7)]['Settings']['UI'][_0x6bbe09(0x622)])this[_0x6bbe09(0x867)](_0x30500a[_0x6bbe09(0xee)](),_0x31e4b0,_0x49e809,_0x5afba7);else{const _0x6f16de=_0x30500a[_0x6bbe09(0xee)]()[_0x6bbe09(0x7b7)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x30500a[_0x6bbe09(0xee)](),_0x31e4b0,_0x49e809,_0x5afba7);}},VisuMZ['CoreEngine'][_0x17e81a(0x5f2)]=Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x3a6)],Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x3a6)]=function(_0x3b033d,_0x500281,_0x134a96){const _0x1f75dd=_0x17e81a;if(VisuMZ[_0x1f75dd(0x1a7)][_0x1f75dd(0x26d)][_0x1f75dd(0x324)]['ShowActorLevel']===![])return;if(this[_0x1f75dd(0x15b)]())this[_0x1f75dd(0x119)](_0x3b033d,_0x500281,_0x134a96);VisuMZ[_0x1f75dd(0x1a7)]['Window_StatusBase_drawActorLevel'][_0x1f75dd(0x65e)](this,_0x3b033d,_0x500281,_0x134a96);},Window_StatusBase[_0x17e81a(0x44d)]['isExpGaugeDrawn']=function(){const _0x4c9766=_0x17e81a;return VisuMZ[_0x4c9766(0x1a7)][_0x4c9766(0x26d)]['UI'][_0x4c9766(0xdd)];},Window_StatusBase[_0x17e81a(0x44d)]['drawActorExpGauge']=function(_0x57e515,_0x46a82,_0x2d4c28){const _0x1a04e0=_0x17e81a;if(!_0x57e515)return;if(!_0x57e515['isActor']())return;const _0x32fe8b=0x80,_0x21b1bd=_0x57e515[_0x1a04e0(0x361)]();let _0x40e618=ColorManager[_0x1a04e0(0x292)](),_0x1bae43=ColorManager['expGaugeColor2']();_0x21b1bd>=0x1&&(_0x40e618=ColorManager[_0x1a04e0(0x301)](),_0x1bae43=ColorManager[_0x1a04e0(0x259)]()),this['drawGauge'](_0x46a82,_0x2d4c28,_0x32fe8b,_0x21b1bd,_0x40e618,_0x1bae43);},Window_EquipStatus[_0x17e81a(0x44d)][_0x17e81a(0x3f5)]=function(){const _0x163e9d=_0x17e81a;let _0x399669=0x0;for(const _0x27c7da of VisuMZ[_0x163e9d(0x1a7)]['Settings'][_0x163e9d(0x324)]['DisplayedParams']){const _0x538f4c=this[_0x163e9d(0x150)](),_0x19b102=this['paramY'](_0x399669);this[_0x163e9d(0x7de)](_0x538f4c,_0x19b102,_0x27c7da),_0x399669++;}},Window_EquipStatus[_0x17e81a(0x44d)][_0x17e81a(0x169)]=function(_0x2a7c6e,_0x7c2cef,_0x5f4287){const _0xb627c6=_0x17e81a,_0x362468=this['paramX']()-this[_0xb627c6(0x150)]()*0x2;this[_0xb627c6(0x542)](_0x2a7c6e,_0x7c2cef,_0x362468,_0x5f4287,![]);},Window_EquipStatus[_0x17e81a(0x44d)][_0x17e81a(0xa2)]=function(_0x29fab5,_0x5a206c,_0x47a981){const _0x2e375b=_0x17e81a,_0x51c826=this['paramWidth']();this[_0x2e375b(0x823)](),this['drawText'](this[_0x2e375b(0x845)][_0x2e375b(0x561)](_0x47a981,!![]),_0x29fab5,_0x5a206c,_0x51c826,_0x2e375b(0x669));},Window_EquipStatus[_0x17e81a(0x44d)][_0x17e81a(0x5dc)]=function(_0x54d448,_0x6b0085){const _0x4d4da9=_0x17e81a,_0x416914=this[_0x4d4da9(0x2b1)]();this[_0x4d4da9(0x77a)](ColorManager[_0x4d4da9(0x3ad)]());const _0x27fde6=VisuMZ[_0x4d4da9(0x1a7)]['Settings']['UI']['ParamArrow'];this[_0x4d4da9(0x821)](_0x27fde6,_0x54d448,_0x6b0085,_0x416914,'center');},Window_EquipStatus[_0x17e81a(0x44d)][_0x17e81a(0x63e)]=function(_0x5ed90a,_0x54e00d,_0x391764){const _0x1329b8=_0x17e81a,_0x5d2ba8=this[_0x1329b8(0x580)](),_0x386fe3=this['_tempActor'][_0x1329b8(0x561)](_0x391764),_0xb65ca1=_0x386fe3-this['_actor']['paramValueByName'](_0x391764);this[_0x1329b8(0x77a)](ColorManager[_0x1329b8(0x464)](_0xb65ca1)),this['drawText'](this[_0x1329b8(0x120)][_0x1329b8(0x561)](_0x391764,!![]),_0x5ed90a,_0x54e00d,_0x5d2ba8,_0x1329b8(0x669));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x170)]=Window_EquipItem[_0x17e81a(0x44d)][_0x17e81a(0x15c)],Window_EquipItem[_0x17e81a(0x44d)][_0x17e81a(0x15c)]=function(_0x1769fd){const _0x2c121f=_0x17e81a;return _0x1769fd&&this[_0x2c121f(0x845)]?this[_0x2c121f(0x845)][_0x2c121f(0x7d7)](_0x1769fd):VisuMZ[_0x2c121f(0x1a7)][_0x2c121f(0x170)][_0x2c121f(0x65e)](this,_0x1769fd);},Window_StatusParams[_0x17e81a(0x44d)][_0x17e81a(0x1ed)]=function(){const _0x3f60ae=_0x17e81a;return VisuMZ[_0x3f60ae(0x1a7)][_0x3f60ae(0x26d)][_0x3f60ae(0x324)]['DisplayedParams'][_0x3f60ae(0x4b4)];},Window_StatusParams['prototype']['drawItem']=function(_0x388525){const _0x4029a5=_0x17e81a,_0x2f977e=this[_0x4029a5(0x47b)](_0x388525),_0x26de98=VisuMZ[_0x4029a5(0x1a7)]['Settings'][_0x4029a5(0x324)][_0x4029a5(0xfc)][_0x388525],_0x21fdd7=TextManager[_0x4029a5(0x4bb)](_0x26de98),_0x402b6c=this['_actor']['paramValueByName'](_0x26de98,!![]);this['drawParamText'](_0x2f977e['x'],_0x2f977e['y'],0xa0,_0x26de98,![]),this[_0x4029a5(0x823)](),this[_0x4029a5(0x821)](_0x402b6c,_0x2f977e['x']+0xa0,_0x2f977e['y'],0x3c,'right');};if(VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x766)][_0x17e81a(0x559)]){VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x766)]['QwertyLayout']&&(Window_NameInput[_0x17e81a(0x11b)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x17e81a(0xe1),'OK']);;VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x849)]=Window_NameInput['prototype'][_0x17e81a(0x103)],Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(_0x21d848){const _0x3f693d=_0x17e81a;this[_0x3f693d(0x135)]=this[_0x3f693d(0x2d5)](),VisuMZ[_0x3f693d(0x1a7)]['Window_NameInput_initialize'][_0x3f693d(0x65e)](this,_0x21d848),this['_mode']===_0x3f693d(0x4c3)?this[_0x3f693d(0x72a)](0x0):(Input['clear'](),this[_0x3f693d(0x28b)]());},Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x2d5)]=function(){const _0x28dcc8=_0x17e81a;if(Input['isGamepadConnected']())return _0x28dcc8(0x4c3);return VisuMZ[_0x28dcc8(0x1a7)]['Settings'][_0x28dcc8(0x766)][_0x28dcc8(0x639)]||_0x28dcc8(0x769);},VisuMZ['CoreEngine'][_0x17e81a(0x22a)]=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x191)],Window_NameInput['prototype'][_0x17e81a(0x191)]=function(){const _0xd7c273=_0x17e81a;if(!this[_0xd7c273(0x468)]())return;if(!this[_0xd7c273(0x3fa)])return;if(this[_0xd7c273(0x135)]===_0xd7c273(0x769)&&Input[_0xd7c273(0x446)]())this[_0xd7c273(0x811)](_0xd7c273(0x4c3));else{if(Input[_0xd7c273(0x698)]('backspace'))Input[_0xd7c273(0x5e6)](),this[_0xd7c273(0x7ad)]();else{if(Input['isTriggered'](_0xd7c273(0x588)))Input['clear'](),this[_0xd7c273(0x135)]===_0xd7c273(0x769)?this[_0xd7c273(0x811)](_0xd7c273(0x4c3)):this[_0xd7c273(0x811)](_0xd7c273(0x769));else{if(this[_0xd7c273(0x135)]===_0xd7c273(0x769))this['processKeyboardHandling']();else Input[_0xd7c273(0x698)](_0xd7c273(0x4ba))?(Input[_0xd7c273(0x5e6)](),this['switchModes'](_0xd7c273(0x769))):VisuMZ[_0xd7c273(0x1a7)][_0xd7c273(0x22a)]['call'](this);}}}},VisuMZ['CoreEngine'][_0x17e81a(0x9b)]=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0xf7)],Window_NameInput['prototype'][_0x17e81a(0xf7)]=function(){const _0x5076a4=_0x17e81a;if(!this[_0x5076a4(0x765)]())return;if(this[_0x5076a4(0x135)]===_0x5076a4(0x769)){if(TouchInput[_0x5076a4(0x492)]()&&this[_0x5076a4(0x316)]())this[_0x5076a4(0x811)](_0x5076a4(0x4c3));else TouchInput[_0x5076a4(0xde)]()&&this[_0x5076a4(0x811)](_0x5076a4(0x4c3));}else VisuMZ[_0x5076a4(0x1a7)][_0x5076a4(0x9b)][_0x5076a4(0x65e)](this);},Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x645)]=function(){const _0x5105b1=_0x17e81a;if(Input['isSpecialCode'](_0x5105b1(0x183)))Input[_0x5105b1(0x5e6)](),this[_0x5105b1(0x34f)]();else{if(Input[_0x5105b1(0x478)]!==undefined){let _0x31fbe3=Input['_inputString'],_0x3a415d=_0x31fbe3[_0x5105b1(0x4b4)];for(let _0x2034c6=0x0;_0x2034c6<_0x3a415d;++_0x2034c6){this[_0x5105b1(0x7bf)]['add'](_0x31fbe3[_0x2034c6])?SoundManager['playOk']():SoundManager['playBuzzer']();}Input['clear']();}}},Window_NameInput['prototype'][_0x17e81a(0x811)]=function(_0x167a66){const _0x596329=_0x17e81a;let _0x203e7c=this[_0x596329(0x135)];this['_mode']=_0x167a66,_0x203e7c!==this['_mode']&&(this[_0x596329(0x208)](),SoundManager[_0x596329(0x70c)](),this[_0x596329(0x135)]===_0x596329(0x4c3)?this[_0x596329(0x72a)](0x0):this[_0x596329(0x72a)](-0x1));},VisuMZ['CoreEngine'][_0x17e81a(0x6f1)]=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x72d)],Window_NameInput['prototype']['cursorDown']=function(_0x544a6f){const _0x4ca8a3=_0x17e81a;if(this[_0x4ca8a3(0x135)]==='keyboard'&&!Input[_0x4ca8a3(0x174)]())return;if(Input[_0x4ca8a3(0x342)]())return;VisuMZ[_0x4ca8a3(0x1a7)][_0x4ca8a3(0x6f1)]['call'](this,_0x544a6f),this[_0x4ca8a3(0x811)](_0x4ca8a3(0x4c3));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x6c0)]=Window_NameInput[_0x17e81a(0x44d)]['cursorUp'],Window_NameInput['prototype']['cursorUp']=function(_0x4d63c7){const _0xdace29=_0x17e81a;if(this[_0xdace29(0x135)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0xdace29(0x342)]())return;VisuMZ[_0xdace29(0x1a7)][_0xdace29(0x6c0)][_0xdace29(0x65e)](this,_0x4d63c7),this['switchModes'](_0xdace29(0x4c3));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3f1)]=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0xfd)],Window_NameInput[_0x17e81a(0x44d)]['cursorRight']=function(_0x51ac19){const _0x284f67=_0x17e81a;if(this['_mode']===_0x284f67(0x769)&&!Input[_0x284f67(0x174)]())return;if(Input[_0x284f67(0x342)]())return;VisuMZ[_0x284f67(0x1a7)][_0x284f67(0x3f1)][_0x284f67(0x65e)](this,_0x51ac19),this[_0x284f67(0x811)]('default');},VisuMZ[_0x17e81a(0x1a7)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x17e81a(0x44d)]['cursorLeft'],Window_NameInput['prototype']['cursorLeft']=function(_0xd5fba9){const _0x36a7f4=_0x17e81a;if(this['_mode']===_0x36a7f4(0x769)&&!Input[_0x36a7f4(0x174)]())return;if(Input[_0x36a7f4(0x342)]())return;VisuMZ[_0x36a7f4(0x1a7)][_0x36a7f4(0x22d)]['call'](this,_0xd5fba9),this[_0x36a7f4(0x811)](_0x36a7f4(0x4c3));},VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x449)],Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x449)]=function(){const _0x7603d2=_0x17e81a;if(this[_0x7603d2(0x135)]===_0x7603d2(0x769))return;if(Input[_0x7603d2(0x342)]())return;VisuMZ[_0x7603d2(0x1a7)]['Window_NameInput_cursorPagedown']['call'](this),this[_0x7603d2(0x811)](_0x7603d2(0x4c3));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x3d3)]=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x1da)],Window_NameInput[_0x17e81a(0x44d)]['cursorPageup']=function(){const _0x542bca=_0x17e81a;if(this['_mode']===_0x542bca(0x769))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x542bca(0x1a7)][_0x542bca(0x3d3)][_0x542bca(0x65e)](this),this[_0x542bca(0x811)](_0x542bca(0x4c3));},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x30a)]=Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x208)],Window_NameInput[_0x17e81a(0x44d)][_0x17e81a(0x208)]=function(){const _0x30ebb4=_0x17e81a;if(this[_0x30ebb4(0x135)]==='keyboard'){this['contents']['clear'](),this[_0x30ebb4(0x727)][_0x30ebb4(0x5e6)](),this[_0x30ebb4(0x823)]();let _0x24d0ee=VisuMZ[_0x30ebb4(0x1a7)][_0x30ebb4(0x26d)][_0x30ebb4(0x766)][_0x30ebb4(0x3b4)][_0x30ebb4(0x34b)]('\x0a'),_0x53847b=_0x24d0ee[_0x30ebb4(0x4b4)],_0x2d40b9=(this['innerHeight']-_0x53847b*this[_0x30ebb4(0x28c)]())/0x2;for(let _0x5bd9dc=0x0;_0x5bd9dc<_0x53847b;++_0x5bd9dc){let _0x5a6996=_0x24d0ee[_0x5bd9dc],_0x510a49=this[_0x30ebb4(0x19f)](_0x5a6996)[_0x30ebb4(0x107)],_0x346560=Math[_0x30ebb4(0x2b3)]((this[_0x30ebb4(0x166)][_0x30ebb4(0x107)]-_0x510a49)/0x2);this[_0x30ebb4(0x867)](_0x5a6996,_0x346560,_0x2d40b9),_0x2d40b9+=this[_0x30ebb4(0x28c)]();}}else VisuMZ['CoreEngine']['Window_NameInput_refresh'][_0x30ebb4(0x65e)](this);};};VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x82c)]=Window_ShopSell[_0x17e81a(0x44d)][_0x17e81a(0x15c)],Window_ShopSell[_0x17e81a(0x44d)]['isEnabled']=function(_0x4a3ff9){const _0x18145e=_0x17e81a;return VisuMZ[_0x18145e(0x1a7)][_0x18145e(0x26d)][_0x18145e(0x51f)]['KeyItemProtect']&&DataManager[_0x18145e(0x53a)](_0x4a3ff9)?![]:VisuMZ[_0x18145e(0x1a7)][_0x18145e(0x82c)][_0x18145e(0x65e)](this,_0x4a3ff9);},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x2b4)]=function(){return![];};VisuMZ[_0x17e81a(0x1a7)]['Settings'][_0x17e81a(0x766)]['EnableNumberInput']&&(VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x7cf)]=Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x3c9)],Window_NumberInput['prototype']['start']=function(){const _0x2ffc3e=_0x17e81a;VisuMZ[_0x2ffc3e(0x1a7)][_0x2ffc3e(0x7cf)]['call'](this),this[_0x2ffc3e(0x72a)](this[_0x2ffc3e(0x374)]-0x1),Input['clear']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x12c)]=Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x41b)],Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x41b)]=function(){const _0x3a4ed9=_0x17e81a;if(!this['isOpenAndActive']())return;if(Input[_0x3a4ed9(0x342)]())this['processKeyboardDigitChange']();else{if(Input[_0x3a4ed9(0x698)](_0x3a4ed9(0x222)))this[_0x3a4ed9(0x476)]();else{if(Input[_0x3a4ed9(0x257)]===0x2e)this['processKeyboardDelete']();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x3a4ed9(0x211)]();else Input[_0x3a4ed9(0x257)]===0x23?this[_0x3a4ed9(0x219)]():VisuMZ[_0x3a4ed9(0x1a7)][_0x3a4ed9(0x12c)][_0x3a4ed9(0x65e)](this);}}}},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x40a)]=function(){const _0x35d446=_0x17e81a;if(!this[_0x35d446(0x477)]())return;Input['isNumpadPressed']()?this['processKeyboardDigitChange']():Window_Selectable[_0x35d446(0x44d)]['processCursorMove'][_0x35d446(0x65e)](this);},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x57d)]=function(){},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x33d)]=function(){const _0x371526=_0x17e81a;if(String(this[_0x371526(0x623)])[_0x371526(0x4b4)]>=this['_maxDigits'])return;const _0x4161ec=Number(String(this[_0x371526(0x623)])+Input[_0x371526(0x478)]);if(isNaN(_0x4161ec))return;this[_0x371526(0x623)]=_0x4161ec;const _0x2eb015='9'[_0x371526(0x830)](this['_maxDigits']);this[_0x371526(0x623)]=this[_0x371526(0x623)][_0x371526(0xb7)](0x0,_0x2eb015),Input[_0x371526(0x5e6)](),this[_0x371526(0x208)](),SoundManager[_0x371526(0x627)](),this[_0x371526(0x72a)](this[_0x371526(0x374)]-0x1);},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x476)]=function(){const _0x35419b=_0x17e81a;this['_number']=Number(String(this[_0x35419b(0x623)])[_0x35419b(0x3b5)](0x0,-0x1)),this[_0x35419b(0x623)]=Math['max'](0x0,this['_number']),Input[_0x35419b(0x5e6)](),this['refresh'](),SoundManager[_0x35419b(0x627)](),this[_0x35419b(0x72a)](this[_0x35419b(0x374)]-0x1);},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x59f)]=function(){const _0x29a18d=_0x17e81a;this[_0x29a18d(0x623)]=Number(String(this['_number'])['substring'](0x1)),this[_0x29a18d(0x623)]=Math[_0x29a18d(0x744)](0x0,this['_number']),Input['clear'](),this[_0x29a18d(0x208)](),SoundManager[_0x29a18d(0x627)](),this[_0x29a18d(0x72a)](this['_maxDigits']-0x1);},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x211)]=function(){const _0x3c1dbe=_0x17e81a;if(this[_0x3c1dbe(0x41d)]()===0x0)return;Input['clear'](),this['refresh'](),SoundManager['playCursor'](),this['select'](0x0);},Window_NumberInput[_0x17e81a(0x44d)][_0x17e81a(0x219)]=function(){const _0x438c27=_0x17e81a;if(this['index']()===this[_0x438c27(0x374)]-0x1)return;Input[_0x438c27(0x5e6)](),this['refresh'](),SoundManager[_0x438c27(0x627)](),this[_0x438c27(0x72a)](this[_0x438c27(0x374)]-0x1);});;function _0x1250(_0x5a72c4,_0xa6fa95){const _0x1a61b8=_0x1a61();return _0x1250=function(_0x12504f,_0x830090){_0x12504f=_0x12504f-0x99;let _0x27baf3=_0x1a61b8[_0x12504f];return _0x27baf3;},_0x1250(_0x5a72c4,_0xa6fa95);}VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x5f5)]=Window_MapName['prototype'][_0x17e81a(0x208)],Window_MapName[_0x17e81a(0x44d)][_0x17e81a(0x208)]=function(){const _0x20bfe9=_0x17e81a;VisuMZ[_0x20bfe9(0x1a7)][_0x20bfe9(0x26d)][_0x20bfe9(0x51f)][_0x20bfe9(0x420)]?this[_0x20bfe9(0x261)]():VisuMZ[_0x20bfe9(0x1a7)][_0x20bfe9(0x5f5)][_0x20bfe9(0x65e)](this);},Window_MapName[_0x17e81a(0x44d)]['refreshWithTextCodeSupport']=function(){const _0x5e68a5=_0x17e81a;this[_0x5e68a5(0x166)][_0x5e68a5(0x5e6)]();if($gameMap[_0x5e68a5(0x621)]()){const _0x479976=this['innerWidth'];this[_0x5e68a5(0x5cb)](0x0,0x0,_0x479976,this[_0x5e68a5(0x28c)]());const _0x365a20=this[_0x5e68a5(0x19f)]($gameMap[_0x5e68a5(0x621)]())['width'];this['drawTextEx']($gameMap[_0x5e68a5(0x621)](),Math['floor']((_0x479976-_0x365a20)/0x2),0x0);}},Window_TitleCommand[_0x17e81a(0x291)]=VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x66d)],Window_TitleCommand[_0x17e81a(0x44d)]['makeCommandList']=function(){const _0x26f29d=_0x17e81a;this[_0x26f29d(0x52e)]();},Window_TitleCommand['prototype'][_0x17e81a(0x52e)]=function(){const _0x465b12=_0x17e81a;for(const _0x28a280 of Window_TitleCommand[_0x465b12(0x291)]){if(_0x28a280[_0x465b12(0x3fb)][_0x465b12(0x65e)](this)){const _0x3c1b6d=_0x28a280[_0x465b12(0x6fd)];let _0x9fbeb2=_0x28a280[_0x465b12(0x626)];if(['',_0x465b12(0x23c)][_0x465b12(0x2b0)](_0x9fbeb2))_0x9fbeb2=_0x28a280['TextJS'][_0x465b12(0x65e)](this);const _0x4e03be=_0x28a280[_0x465b12(0x104)]['call'](this),_0x9a35c9=_0x28a280[_0x465b12(0x5eb)]['call'](this);this['addCommand'](_0x9fbeb2,_0x3c1b6d,_0x4e03be,_0x9a35c9),this[_0x465b12(0x47f)](_0x3c1b6d,_0x28a280[_0x465b12(0x58a)]['bind'](this,_0x9a35c9));}}},VisuMZ['CoreEngine'][_0x17e81a(0x79e)]=Window_TitleCommand[_0x17e81a(0x44d)][_0x17e81a(0x6e7)],Window_TitleCommand[_0x17e81a(0x44d)][_0x17e81a(0x6e7)]=function(){const _0xc520a=_0x17e81a;VisuMZ[_0xc520a(0x1a7)][_0xc520a(0x79e)]['call'](this);if(!Window_TitleCommand['_lastCommandSymbol'])return;const _0x266e96=this[_0xc520a(0x2d4)](Window_TitleCommand[_0xc520a(0x59a)]),_0x45776f=Math['floor'](this[_0xc520a(0x19b)]()/0x2)-0x1;this[_0xc520a(0x6ea)](_0x266e96),this['_scrollDuration']>0x1&&(this['_scrollDuration']=0x1,this[_0xc520a(0x2fb)]()),this['setTopRow'](_0x266e96-_0x45776f);},Window_GameEnd[_0x17e81a(0x291)]=VisuMZ[_0x17e81a(0x1a7)]['Settings'][_0x17e81a(0x642)][_0x17e81a(0x112)][_0x17e81a(0x711)],Window_GameEnd[_0x17e81a(0x44d)]['makeCommandList']=function(){const _0x2d0893=_0x17e81a;this[_0x2d0893(0x52e)]();},Window_GameEnd[_0x17e81a(0x44d)][_0x17e81a(0x52e)]=function(){const _0xfe013a=_0x17e81a;for(const _0x286a3f of Window_GameEnd[_0xfe013a(0x291)]){if(_0x286a3f[_0xfe013a(0x3fb)][_0xfe013a(0x65e)](this)){const _0x4fe021=_0x286a3f[_0xfe013a(0x6fd)];let _0x1fbb6a=_0x286a3f[_0xfe013a(0x626)];if(['',_0xfe013a(0x23c)]['includes'](_0x1fbb6a))_0x1fbb6a=_0x286a3f['TextJS'][_0xfe013a(0x65e)](this);const _0x551dd5=_0x286a3f[_0xfe013a(0x104)][_0xfe013a(0x65e)](this),_0x51f7e5=_0x286a3f[_0xfe013a(0x5eb)]['call'](this);this[_0xfe013a(0x6a4)](_0x1fbb6a,_0x4fe021,_0x551dd5,_0x51f7e5),this[_0xfe013a(0x47f)](_0x4fe021,_0x286a3f[_0xfe013a(0x58a)][_0xfe013a(0x309)](this,_0x51f7e5));}}};function Window_ButtonAssist(){const _0x562f36=_0x17e81a;this[_0x562f36(0x103)](...arguments);}Window_ButtonAssist[_0x17e81a(0x44d)]=Object[_0x17e81a(0x6e1)](Window_Base['prototype']),Window_ButtonAssist['prototype']['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(_0x37bf51){const _0xd46e1=_0x17e81a;this[_0xd46e1(0x630)]={},Window_Base['prototype'][_0xd46e1(0x103)][_0xd46e1(0x65e)](this,_0x37bf51),this[_0xd46e1(0x1d6)](VisuMZ['CoreEngine'][_0xd46e1(0x26d)][_0xd46e1(0xd5)]['BgType']||0x0),this['refresh']();},Window_ButtonAssist[_0x17e81a(0x44d)][_0x17e81a(0x28c)]=function(){const _0x347cd9=_0x17e81a;return this[_0x347cd9(0x177)]||Window_Base[_0x347cd9(0x44d)]['lineHeight']['call'](this);},Window_ButtonAssist['prototype'][_0x17e81a(0x545)]=function(){const _0x3076ef=_0x17e81a;this['contents'][_0x3076ef(0x296)]<=0x60&&(this[_0x3076ef(0x166)]['fontSize']+=0x6);},Window_ButtonAssist[_0x17e81a(0x44d)][_0x17e81a(0x4de)]=function(){const _0x319783=_0x17e81a;this[_0x319783(0x166)][_0x319783(0x296)]>=0x18&&(this['contents'][_0x319783(0x296)]-=0x6);},Window_ButtonAssist[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x3c7366=_0x17e81a;Window_Base[_0x3c7366(0x44d)][_0x3c7366(0x2a6)]['call'](this),this[_0x3c7366(0x3a9)]();},Window_ButtonAssist[_0x17e81a(0x44d)]['updatePadding']=function(){const _0x175f5a=_0x17e81a;this[_0x175f5a(0x3a7)]=SceneManager[_0x175f5a(0x116)]['getButtonAssistLocation']()!==_0x175f5a(0x537)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x17e81a(0x3a9)]=function(){const _0x16bc28=_0x17e81a,_0x5180aa=SceneManager['_scene'];for(let _0x581f58=0x1;_0x581f58<=0x5;_0x581f58++){if(this[_0x16bc28(0x630)][_0x16bc28(0x388)['format'](_0x581f58)]!==_0x5180aa[_0x16bc28(0x817)[_0x16bc28(0x51e)](_0x581f58)]())return this['refresh']();if(this[_0x16bc28(0x630)]['text%1'[_0x16bc28(0x51e)](_0x581f58)]!==_0x5180aa[_0x16bc28(0x763)[_0x16bc28(0x51e)](_0x581f58)]())return this[_0x16bc28(0x208)]();}},Window_ButtonAssist[_0x17e81a(0x44d)]['refresh']=function(){const _0x54a0bb=_0x17e81a;this[_0x54a0bb(0x166)][_0x54a0bb(0x5e6)]();for(let _0x8ff0a9=0x1;_0x8ff0a9<=0x5;_0x8ff0a9++){this[_0x54a0bb(0x373)](_0x8ff0a9);}},Window_ButtonAssist[_0x17e81a(0x44d)]['drawSegment']=function(_0x21a328){const _0x4792ad=_0x17e81a,_0x3e3ffb=this[_0x4792ad(0x2f1)]/0x5,_0x2ee2c8=SceneManager['_scene'],_0x3af422=_0x2ee2c8['buttonAssistKey%1'[_0x4792ad(0x51e)](_0x21a328)](),_0x395f74=_0x2ee2c8[_0x4792ad(0x763)['format'](_0x21a328)]();this['_data'][_0x4792ad(0x388)['format'](_0x21a328)]=_0x3af422,this[_0x4792ad(0x630)][_0x4792ad(0x74c)[_0x4792ad(0x51e)](_0x21a328)]=_0x395f74;if(_0x3af422==='')return;if(_0x395f74==='')return;const _0x5bf852=_0x2ee2c8[_0x4792ad(0x786)['format'](_0x21a328)](),_0x44a234=this[_0x4792ad(0x150)](),_0x56f3b6=_0x3e3ffb*(_0x21a328-0x1)+_0x44a234+_0x5bf852,_0x58e43a=VisuMZ[_0x4792ad(0x1a7)][_0x4792ad(0x26d)][_0x4792ad(0xd5)][_0x4792ad(0x4c7)];this[_0x4792ad(0x867)](_0x58e43a['format'](_0x3af422,_0x395f74),_0x56f3b6,0x0,_0x3e3ffb-_0x44a234*0x2);},VisuMZ['CoreEngine'][_0x17e81a(0x17c)]=Game_Interpreter[_0x17e81a(0x44d)][_0x17e81a(0x65c)],Game_Interpreter['prototype']['updateWaitMode']=function(){const _0x2d286b=_0x17e81a;if($gameTemp[_0x2d286b(0x48c)]!==undefined)return VisuMZ['CoreEngine'][_0x2d286b(0x62d)]();return VisuMZ[_0x2d286b(0x1a7)]['Game_Interpreter_updateWaitMode'][_0x2d286b(0x65e)](this);},VisuMZ[_0x17e81a(0x1a7)]['UpdatePictureCoordinates']=function(){const _0x12f540=_0x17e81a,_0x2c716c=$gameTemp[_0x12f540(0x48c)]||0x0;(_0x2c716c<0x0||_0x2c716c>0x64||TouchInput['isCancelled']()||Input['isTriggered'](_0x12f540(0x42f)))&&($gameTemp[_0x12f540(0x48c)]=undefined,Input[_0x12f540(0x5e6)](),TouchInput[_0x12f540(0x5e6)]());const _0x4d03a9=$gameScreen[_0x12f540(0x5b7)](_0x2c716c);return _0x4d03a9&&(_0x4d03a9['_x']=TouchInput['_x'],_0x4d03a9['_y']=TouchInput['_y']),VisuMZ[_0x12f540(0x1a7)][_0x12f540(0x7c4)](),$gameTemp[_0x12f540(0x48c)]!==undefined;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x7c4)]=function(){const _0x50de02=_0x17e81a,_0x2769c5=SceneManager[_0x50de02(0x116)];if(!_0x2769c5)return;!_0x2769c5[_0x50de02(0x4df)]&&(SoundManager[_0x50de02(0x6d8)](),_0x2769c5['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x2769c5[_0x50de02(0x487)](_0x2769c5[_0x50de02(0x4df)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x50de02(0x67c)](),_0x2769c5[_0x50de02(0x2d1)](_0x2769c5[_0x50de02(0x4df)]),_0x2769c5[_0x50de02(0x4df)]=undefined);};function Window_PictureCoordinates(){const _0x3a5b9c=_0x17e81a;this[_0x3a5b9c(0x103)](...arguments);}Window_PictureCoordinates[_0x17e81a(0x44d)]=Object['create'](Window_Base[_0x17e81a(0x44d)]),Window_PictureCoordinates[_0x17e81a(0x44d)][_0x17e81a(0x666)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x17e81a(0x44d)][_0x17e81a(0x103)]=function(){const _0x36900d=_0x17e81a;this[_0x36900d(0xf5)]=_0x36900d(0x868),this[_0x36900d(0xfa)]=_0x36900d(0x868),this[_0x36900d(0x172)]='nah';const _0x27c8e=this[_0x36900d(0x295)]();Window_Base[_0x36900d(0x44d)][_0x36900d(0x103)]['call'](this,_0x27c8e),this[_0x36900d(0x1d6)](0x2);},Window_PictureCoordinates[_0x17e81a(0x44d)][_0x17e81a(0x295)]=function(){const _0x3d144c=_0x17e81a;let _0x1188df=0x0,_0x24b4fa=Graphics[_0x3d144c(0x4a1)]-this[_0x3d144c(0x28c)](),_0x3573b6=Graphics['width'],_0x31efd1=this[_0x3d144c(0x28c)]();return new Rectangle(_0x1188df,_0x24b4fa,_0x3573b6,_0x31efd1);},Window_PictureCoordinates[_0x17e81a(0x44d)]['updatePadding']=function(){const _0x41ef19=_0x17e81a;this[_0x41ef19(0x3a7)]=0x0;},Window_PictureCoordinates[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x3e8679=_0x17e81a;Window_Base['prototype'][_0x3e8679(0x2a6)]['call'](this),this[_0x3e8679(0x504)]();},Window_PictureCoordinates[_0x17e81a(0x44d)]['updateData']=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates['prototype'][_0x17e81a(0xb3)]=function(){const _0x507a91=_0x17e81a,_0x545ccf=$gameTemp[_0x507a91(0x48c)],_0x24f6f1=$gameScreen[_0x507a91(0x5b7)](_0x545ccf);return _0x24f6f1?this[_0x507a91(0xf5)]!==_0x24f6f1[_0x507a91(0x712)]||this[_0x507a91(0xfa)]!==_0x24f6f1['_x']||this[_0x507a91(0x172)]!==_0x24f6f1['_y']:![];},Window_PictureCoordinates[_0x17e81a(0x44d)]['refresh']=function(){const _0x5c6f6a=_0x17e81a;this[_0x5c6f6a(0x166)][_0x5c6f6a(0x5e6)]();const _0x110553=$gameTemp['_pictureCoordinatesMode'],_0x51d9f4=$gameScreen[_0x5c6f6a(0x5b7)](_0x110553);if(!_0x51d9f4)return;this[_0x5c6f6a(0xf5)]=_0x51d9f4[_0x5c6f6a(0x712)],this[_0x5c6f6a(0xfa)]=_0x51d9f4['_x'],this['_lastY']=_0x51d9f4['_y'];const _0x1bc7c2=ColorManager['itemBackColor1']();this[_0x5c6f6a(0x166)][_0x5c6f6a(0x2b2)](0x0,0x0,this[_0x5c6f6a(0x2f1)],this[_0x5c6f6a(0x177)],_0x1bc7c2);const _0x13fe47=_0x5c6f6a(0x7b1)[_0x5c6f6a(0x51e)](_0x51d9f4[_0x5c6f6a(0x712)]===0x0?_0x5c6f6a(0x5c6):_0x5c6f6a(0x398)),_0x432e41=_0x5c6f6a(0x530)[_0x5c6f6a(0x51e)](_0x51d9f4['_x']),_0x19cb55=_0x5c6f6a(0x70e)[_0x5c6f6a(0x51e)](_0x51d9f4['_y']),_0x5292fa='%1:\x20Exit\x20'[_0x5c6f6a(0x51e)](TextManager[_0x5c6f6a(0x777)](_0x5c6f6a(0x42f)));let _0x8393ac=Math[_0x5c6f6a(0x2b3)](this[_0x5c6f6a(0x2f1)]/0x4);this[_0x5c6f6a(0x821)](_0x13fe47,_0x8393ac*0x0,0x0,_0x8393ac),this[_0x5c6f6a(0x821)](_0x432e41,_0x8393ac*0x1,0x0,_0x8393ac,_0x5c6f6a(0x6f5)),this['drawText'](_0x19cb55,_0x8393ac*0x2,0x0,_0x8393ac,_0x5c6f6a(0x6f5));const _0x7e27ca=this[_0x5c6f6a(0x19f)](_0x5292fa)[_0x5c6f6a(0x107)],_0xb23eff=this[_0x5c6f6a(0x2f1)]-_0x7e27ca;this[_0x5c6f6a(0x867)](_0x5292fa,_0xb23eff,0x0,_0x7e27ca);};function Window_TextPopup(){const _0x2fe1f6=_0x17e81a;this[_0x2fe1f6(0x103)](...arguments);}Window_TextPopup[_0x17e81a(0x44d)]=Object['create'](Window_Base[_0x17e81a(0x44d)]),Window_TextPopup[_0x17e81a(0x44d)][_0x17e81a(0x666)]=Window_TextPopup,Window_TextPopup[_0x17e81a(0x632)]={'framesPerChar':VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x264)][_0x17e81a(0x35d)]??1.5,'framesMin':VisuMZ[_0x17e81a(0x1a7)]['Settings']['Window'][_0x17e81a(0x19e)]??0x5a,'framesMax':VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x26d)][_0x17e81a(0x264)][_0x17e81a(0x2f7)]??0x12c},Window_TextPopup[_0x17e81a(0x44d)]['initialize']=function(){const _0x26a2b5=_0x17e81a,_0x3aa446=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x26a2b5(0x44d)][_0x26a2b5(0x103)][_0x26a2b5(0x65e)](this,_0x3aa446),this[_0x26a2b5(0x5a3)]=0x0,this[_0x26a2b5(0x7a8)]='',this[_0x26a2b5(0x851)]=[],this['_timeDuration']=0x0;},Window_TextPopup[_0x17e81a(0x44d)][_0x17e81a(0x563)]=function(){return!![];},Window_TextPopup[_0x17e81a(0x44d)]['addQueue']=function(_0x853179){const _0x54f180=_0x17e81a;if(this['_textQueue'][this[_0x54f180(0x851)][_0x54f180(0x4b4)]-0x1]===_0x853179)return;this[_0x54f180(0x851)][_0x54f180(0x189)](_0x853179),SceneManager['_scene']['addChild'](this);},Window_TextPopup['prototype'][_0x17e81a(0x2a6)]=function(){const _0x237fef=_0x17e81a;Window_Base[_0x237fef(0x44d)]['update'][_0x237fef(0x65e)](this),this['updateText'](),this['updateDuration']();},Window_TextPopup[_0x17e81a(0x44d)]['updateText']=function(){const _0x265f63=_0x17e81a;if(this[_0x265f63(0x7a8)]!=='')return;if(this[_0x265f63(0x851)]['length']<=0x0)return;if(!this[_0x265f63(0x139)]())return;this[_0x265f63(0x7a8)]=this['_textQueue'][_0x265f63(0x1bb)]();const _0x1f5c9c=Window_TextPopup[_0x265f63(0x632)],_0x1111a7=Math[_0x265f63(0x2a2)](this[_0x265f63(0x7a8)][_0x265f63(0x4b4)]*_0x1f5c9c[_0x265f63(0x70b)]);this[_0x265f63(0x6eb)]=_0x1111a7[_0x265f63(0xb7)](_0x1f5c9c['framesMin'],_0x1f5c9c[_0x265f63(0x163)]);const _0x220a41=this[_0x265f63(0x19f)](this[_0x265f63(0x7a8)]);let _0x482afd=_0x220a41[_0x265f63(0x107)]+this[_0x265f63(0x150)]()*0x2;_0x482afd+=$gameSystem[_0x265f63(0x73e)]()*0x2;let _0x1a60a0=Math[_0x265f63(0x744)](_0x220a41['height'],this[_0x265f63(0x28c)]());_0x1a60a0+=$gameSystem[_0x265f63(0x73e)]()*0x2;const _0x31f4d3=Math[_0x265f63(0x397)]((Graphics[_0x265f63(0x107)]-_0x482afd)/0x2),_0x4080b1=Math[_0x265f63(0x397)]((Graphics[_0x265f63(0x4a1)]-_0x1a60a0)/0x2),_0x26d617=new Rectangle(_0x31f4d3,_0x4080b1,_0x482afd,_0x1a60a0);this[_0x265f63(0x527)](_0x26d617['x'],_0x26d617['y'],_0x26d617['width'],_0x26d617['height']),this[_0x265f63(0x331)](),this[_0x265f63(0x208)](),this[_0x265f63(0x6a2)](),SceneManager[_0x265f63(0x116)]['addChild'](this);},Window_TextPopup['prototype']['refresh']=function(){const _0xb5c41d=_0x17e81a,_0x47d191=this['baseTextRect']();this[_0xb5c41d(0x166)][_0xb5c41d(0x5e6)](),this['drawTextEx'](this[_0xb5c41d(0x7a8)],_0x47d191['x'],_0x47d191['y'],_0x47d191[_0xb5c41d(0x107)]);},Window_TextPopup[_0x17e81a(0x44d)][_0x17e81a(0x854)]=function(){const _0x303266=_0x17e81a;if(this[_0x303266(0x3ba)]()||this[_0x303266(0xc3)]())return;if(this['_timeDuration']<=0x0)return;this[_0x303266(0x6eb)]--,this['_timeDuration']<=0x0&&(this[_0x303266(0x454)](),this[_0x303266(0x7a8)]='');},VisuMZ[_0x17e81a(0x54d)]=function(_0xa97556){const _0x548f8c=_0x17e81a;if(Utils[_0x548f8c(0x3b0)](_0x548f8c(0x5fd))){var _0xf74f6e=require('nw.gui')['Window'][_0x548f8c(0x850)]();SceneManager[_0x548f8c(0x1ac)]();if(_0xa97556)setTimeout(_0xf74f6e[_0x548f8c(0x40c)][_0x548f8c(0x309)](_0xf74f6e),0x190);}},VisuMZ[_0x17e81a(0x5be)]=function(_0x4b5fe6,_0xd0104a){const _0xb05835=_0x17e81a;_0xd0104a=_0xd0104a['toUpperCase']();var _0x4c30b2=1.70158,_0xd22aa8=0.7;switch(_0xd0104a){case _0xb05835(0x4f0):return _0x4b5fe6;case _0xb05835(0x459):return-0x1*Math['cos'](_0x4b5fe6*(Math['PI']/0x2))+0x1;case _0xb05835(0x245):return Math[_0xb05835(0x56f)](_0x4b5fe6*(Math['PI']/0x2));case _0xb05835(0x860):return-0.5*(Math[_0xb05835(0xbc)](Math['PI']*_0x4b5fe6)-0x1);case _0xb05835(0x186):return _0x4b5fe6*_0x4b5fe6;case'OUTQUAD':return _0x4b5fe6*(0x2-_0x4b5fe6);case _0xb05835(0x4e6):return _0x4b5fe6<0.5?0x2*_0x4b5fe6*_0x4b5fe6:-0x1+(0x4-0x2*_0x4b5fe6)*_0x4b5fe6;case _0xb05835(0x179):return _0x4b5fe6*_0x4b5fe6*_0x4b5fe6;case'OUTCUBIC':var _0x2de471=_0x4b5fe6-0x1;return _0x2de471*_0x2de471*_0x2de471+0x1;case _0xb05835(0x2ca):return _0x4b5fe6<0.5?0x4*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6:(_0x4b5fe6-0x1)*(0x2*_0x4b5fe6-0x2)*(0x2*_0x4b5fe6-0x2)+0x1;case _0xb05835(0x253):return _0x4b5fe6*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6;case _0xb05835(0x7d0):var _0x2de471=_0x4b5fe6-0x1;return 0x1-_0x2de471*_0x2de471*_0x2de471*_0x2de471;case _0xb05835(0x618):var _0x2de471=_0x4b5fe6-0x1;return _0x4b5fe6<0.5?0x8*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6:0x1-0x8*_0x2de471*_0x2de471*_0x2de471*_0x2de471;case'INQUINT':return _0x4b5fe6*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6;case _0xb05835(0x856):var _0x2de471=_0x4b5fe6-0x1;return 0x1+_0x2de471*_0x2de471*_0x2de471*_0x2de471*_0x2de471;case _0xb05835(0x2fc):var _0x2de471=_0x4b5fe6-0x1;return _0x4b5fe6<0.5?0x10*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6*_0x4b5fe6:0x1+0x10*_0x2de471*_0x2de471*_0x2de471*_0x2de471*_0x2de471;case _0xb05835(0x267):if(_0x4b5fe6===0x0)return 0x0;return Math[_0xb05835(0x9c)](0x2,0xa*(_0x4b5fe6-0x1));case _0xb05835(0x775):if(_0x4b5fe6===0x1)return 0x1;return-Math[_0xb05835(0x9c)](0x2,-0xa*_0x4b5fe6)+0x1;case _0xb05835(0x5ad):if(_0x4b5fe6===0x0||_0x4b5fe6===0x1)return _0x4b5fe6;var _0x5e4a55=_0x4b5fe6*0x2,_0x3ee56e=_0x5e4a55-0x1;if(_0x5e4a55<0x1)return 0.5*Math[_0xb05835(0x9c)](0x2,0xa*_0x3ee56e);return 0.5*(-Math[_0xb05835(0x9c)](0x2,-0xa*_0x3ee56e)+0x2);case _0xb05835(0x241):var _0x5e4a55=_0x4b5fe6/0x1;return-0x1*(Math[_0xb05835(0x5da)](0x1-_0x5e4a55*_0x4b5fe6)-0x1);case _0xb05835(0x750):var _0x2de471=_0x4b5fe6-0x1;return Math[_0xb05835(0x5da)](0x1-_0x2de471*_0x2de471);case _0xb05835(0x625):var _0x5e4a55=_0x4b5fe6*0x2,_0x3ee56e=_0x5e4a55-0x2;if(_0x5e4a55<0x1)return-0.5*(Math['sqrt'](0x1-_0x5e4a55*_0x5e4a55)-0x1);return 0.5*(Math[_0xb05835(0x5da)](0x1-_0x3ee56e*_0x3ee56e)+0x1);case'INBACK':return _0x4b5fe6*_0x4b5fe6*((_0x4c30b2+0x1)*_0x4b5fe6-_0x4c30b2);case _0xb05835(0x41e):var _0x5e4a55=_0x4b5fe6/0x1-0x1;return _0x5e4a55*_0x5e4a55*((_0x4c30b2+0x1)*_0x5e4a55+_0x4c30b2)+0x1;break;case _0xb05835(0x220):var _0x5e4a55=_0x4b5fe6*0x2,_0x5f2e47=_0x5e4a55-0x2,_0x344c0f=_0x4c30b2*1.525;if(_0x5e4a55<0x1)return 0.5*_0x5e4a55*_0x5e4a55*((_0x344c0f+0x1)*_0x5e4a55-_0x344c0f);return 0.5*(_0x5f2e47*_0x5f2e47*((_0x344c0f+0x1)*_0x5f2e47+_0x344c0f)+0x2);case _0xb05835(0x153):if(_0x4b5fe6===0x0||_0x4b5fe6===0x1)return _0x4b5fe6;var _0x5e4a55=_0x4b5fe6/0x1,_0x3ee56e=_0x5e4a55-0x1,_0x534d4b=0x1-_0xd22aa8,_0x344c0f=_0x534d4b/(0x2*Math['PI'])*Math[_0xb05835(0xed)](0x1);return-(Math['pow'](0x2,0xa*_0x3ee56e)*Math['sin']((_0x3ee56e-_0x344c0f)*(0x2*Math['PI'])/_0x534d4b));case'OUTELASTIC':var _0x534d4b=0x1-_0xd22aa8,_0x5e4a55=_0x4b5fe6*0x2;if(_0x4b5fe6===0x0||_0x4b5fe6===0x1)return _0x4b5fe6;var _0x344c0f=_0x534d4b/(0x2*Math['PI'])*Math[_0xb05835(0xed)](0x1);return Math[_0xb05835(0x9c)](0x2,-0xa*_0x5e4a55)*Math[_0xb05835(0x56f)]((_0x5e4a55-_0x344c0f)*(0x2*Math['PI'])/_0x534d4b)+0x1;case'INOUTELASTIC':var _0x534d4b=0x1-_0xd22aa8;if(_0x4b5fe6===0x0||_0x4b5fe6===0x1)return _0x4b5fe6;var _0x5e4a55=_0x4b5fe6*0x2,_0x3ee56e=_0x5e4a55-0x1,_0x344c0f=_0x534d4b/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x5e4a55<0x1)return-0.5*(Math[_0xb05835(0x9c)](0x2,0xa*_0x3ee56e)*Math[_0xb05835(0x56f)]((_0x3ee56e-_0x344c0f)*(0x2*Math['PI'])/_0x534d4b));return Math[_0xb05835(0x9c)](0x2,-0xa*_0x3ee56e)*Math[_0xb05835(0x56f)]((_0x3ee56e-_0x344c0f)*(0x2*Math['PI'])/_0x534d4b)*0.5+0x1;case _0xb05835(0x3ed):var _0x5e4a55=_0x4b5fe6/0x1;if(_0x5e4a55<0x1/2.75)return 7.5625*_0x5e4a55*_0x5e4a55;else{if(_0x5e4a55<0x2/2.75){var _0x5f2e47=_0x5e4a55-1.5/2.75;return 7.5625*_0x5f2e47*_0x5f2e47+0.75;}else{if(_0x5e4a55<2.5/2.75){var _0x5f2e47=_0x5e4a55-2.25/2.75;return 7.5625*_0x5f2e47*_0x5f2e47+0.9375;}else{var _0x5f2e47=_0x5e4a55-2.625/2.75;return 7.5625*_0x5f2e47*_0x5f2e47+0.984375;}}}case _0xb05835(0x1af):var _0x5852eb=0x1-VisuMZ[_0xb05835(0x5be)](0x1-_0x4b5fe6,_0xb05835(0x15e));return _0x5852eb;case _0xb05835(0x425):if(_0x4b5fe6<0.5)var _0x5852eb=VisuMZ[_0xb05835(0x5be)](_0x4b5fe6*0x2,'inbounce')*0.5;else var _0x5852eb=VisuMZ[_0xb05835(0x5be)](_0x4b5fe6*0x2-0x1,_0xb05835(0x15e))*0.5+0.5;return _0x5852eb;default:return _0x4b5fe6;}},VisuMZ['GetParamIcon']=function(_0xa44876){const _0x318c6b=_0x17e81a;_0xa44876=String(_0xa44876)[_0x318c6b(0x413)]();const _0x3a14b8=VisuMZ[_0x318c6b(0x1a7)][_0x318c6b(0x26d)][_0x318c6b(0x324)];if(_0xa44876===_0x318c6b(0x677))return _0x3a14b8['IconParam0'];if(_0xa44876===_0x318c6b(0x427))return _0x3a14b8['IconParam1'];if(_0xa44876===_0x318c6b(0x56a))return _0x3a14b8[_0x318c6b(0x713)];if(_0xa44876==='DEF')return _0x3a14b8[_0x318c6b(0x512)];if(_0xa44876===_0x318c6b(0x31f))return _0x3a14b8[_0x318c6b(0x2fe)];if(_0xa44876===_0x318c6b(0x5a7))return _0x3a14b8[_0x318c6b(0x2b8)];if(_0xa44876==='AGI')return _0x3a14b8[_0x318c6b(0x10b)];if(_0xa44876===_0x318c6b(0x528))return _0x3a14b8[_0x318c6b(0x837)];if(_0xa44876===_0x318c6b(0x82d))return _0x3a14b8['IconXParam0'];if(_0xa44876===_0x318c6b(0x5b8))return _0x3a14b8[_0x318c6b(0x143)];if(_0xa44876===_0x318c6b(0x651))return _0x3a14b8[_0x318c6b(0x3e1)];if(_0xa44876===_0x318c6b(0x57e))return _0x3a14b8[_0x318c6b(0x62c)];if(_0xa44876==='MEV')return _0x3a14b8[_0x318c6b(0x333)];if(_0xa44876==='MRF')return _0x3a14b8[_0x318c6b(0x2d0)];if(_0xa44876===_0x318c6b(0x56d))return _0x3a14b8[_0x318c6b(0x2cb)];if(_0xa44876==='HRG')return _0x3a14b8[_0x318c6b(0x451)];if(_0xa44876==='MRG')return _0x3a14b8[_0x318c6b(0x473)];if(_0xa44876===_0x318c6b(0x467))return _0x3a14b8['IconXParam9'];if(_0xa44876===_0x318c6b(0x45d))return _0x3a14b8['IconSParam0'];if(_0xa44876==='GRD')return _0x3a14b8[_0x318c6b(0x21c)];if(_0xa44876===_0x318c6b(0x39b))return _0x3a14b8[_0x318c6b(0x382)];if(_0xa44876===_0x318c6b(0x86a))return _0x3a14b8[_0x318c6b(0x3a3)];if(_0xa44876===_0x318c6b(0x878))return _0x3a14b8[_0x318c6b(0x67b)];if(_0xa44876==='TCR')return _0x3a14b8[_0x318c6b(0x77c)];if(_0xa44876===_0x318c6b(0x1d9))return _0x3a14b8['IconSParam6'];if(_0xa44876===_0x318c6b(0x134))return _0x3a14b8[_0x318c6b(0x203)];if(_0xa44876===_0x318c6b(0x6cc))return _0x3a14b8['IconSParam8'];if(_0xa44876===_0x318c6b(0x22f))return _0x3a14b8[_0x318c6b(0x3ee)];if(VisuMZ[_0x318c6b(0x1a7)][_0x318c6b(0x6a5)][_0xa44876])return VisuMZ['CoreEngine'][_0x318c6b(0x6a5)][_0xa44876]||0x0;return 0x0;},VisuMZ[_0x17e81a(0x508)]=function(_0x107e53,_0x540ff4,_0x4bfb9f){const _0x14fdda=_0x17e81a;if(_0x4bfb9f===undefined&&_0x107e53%0x1===0x0)return _0x107e53;if(_0x4bfb9f!==undefined&&['MAXHP',_0x14fdda(0x427),_0x14fdda(0x56a),_0x14fdda(0x3db),_0x14fdda(0x31f),'MDF','AGI',_0x14fdda(0x528)]['includes'](String(_0x4bfb9f)[_0x14fdda(0x413)]()[_0x14fdda(0x1b5)]()))return _0x107e53;_0x540ff4=_0x540ff4||0x0;if(VisuMZ['CoreEngine'][_0x14fdda(0x192)][_0x4bfb9f])return VisuMZ[_0x14fdda(0x1a7)][_0x14fdda(0x247)][_0x4bfb9f]==='integer'?_0x107e53:String((_0x107e53*0x64)['toFixed'](_0x540ff4))+'%';return String((_0x107e53*0x64)['toFixed'](_0x540ff4))+'%';},VisuMZ[_0x17e81a(0x6c8)]=function(_0x4dc77f){const _0x4b28d8=_0x17e81a;_0x4dc77f=String(_0x4dc77f);if(!_0x4dc77f)return _0x4dc77f;if(typeof _0x4dc77f!=='string')return _0x4dc77f;const _0x175258=VisuMZ['CoreEngine']['Settings'][_0x4b28d8(0x51f)][_0x4b28d8(0x4f7)]||_0x4b28d8(0x3af),_0x5ab086={'maximumFractionDigits':0x6};_0x4dc77f=_0x4dc77f[_0x4b28d8(0x7b7)](/\[(.*?)\]/g,(_0x36ac80,_0x20fac2)=>{const _0x5dc094=_0x4b28d8;return VisuMZ[_0x5dc094(0x4d7)](_0x20fac2,'[',']');}),_0x4dc77f=_0x4dc77f[_0x4b28d8(0x7b7)](/<(.*?)>/g,(_0x453bd9,_0x54ea95)=>{const _0x4fe215=_0x4b28d8;return VisuMZ[_0x4fe215(0x4d7)](_0x54ea95,'<','>');}),_0x4dc77f=_0x4dc77f[_0x4b28d8(0x7b7)](/\{\{(.*?)\}\}/g,(_0x465cb6,_0x395826)=>{const _0x5219a7=_0x4b28d8;return VisuMZ[_0x5219a7(0x4d7)](_0x395826,'','');}),_0x4dc77f=_0x4dc77f[_0x4b28d8(0x7b7)](/(\d+\.?\d*)/g,(_0x5217dd,_0x55f7cd)=>{const _0x1e12df=_0x4b28d8;let _0x4f2840=_0x55f7cd;if(_0x4f2840[0x0]==='0')return _0x4f2840;if(_0x4f2840[_0x4f2840['length']-0x1]==='.')return Number(_0x4f2840)[_0x1e12df(0x63f)](_0x175258,_0x5ab086)+'.';else return _0x4f2840[_0x4f2840[_0x1e12df(0x4b4)]-0x1]===','?Number(_0x4f2840)[_0x1e12df(0x63f)](_0x175258,_0x5ab086)+',':Number(_0x4f2840)[_0x1e12df(0x63f)](_0x175258,_0x5ab086);});let _0x5cbb6e=0x3;while(_0x5cbb6e--){_0x4dc77f=VisuMZ[_0x4b28d8(0x5bc)](_0x4dc77f);}return _0x4dc77f;},VisuMZ[_0x17e81a(0x4d7)]=function(_0x1cf8de,_0x2a3037,_0x590844){const _0x58ca17=_0x17e81a;return _0x1cf8de=_0x1cf8de[_0x58ca17(0x7b7)](/(\d)/gi,(_0x23f15e,_0x5e3d72)=>_0x58ca17(0x58b)['format'](Number(_0x5e3d72))),'%2%1%3'[_0x58ca17(0x51e)](_0x1cf8de,_0x2a3037,_0x590844);},VisuMZ[_0x17e81a(0x5bc)]=function(_0x28ca5c){const _0x47af25=_0x17e81a;return _0x28ca5c=_0x28ca5c[_0x47af25(0x7b7)](/PRESERVCONVERSION\((\d+)\)/gi,(_0xfba18b,_0x136343)=>Number(parseInt(_0x136343))),_0x28ca5c;},VisuMZ[_0x17e81a(0x598)]=function(_0x145d63){const _0x15f033=_0x17e81a;SoundManager[_0x15f033(0x70c)]();if(!Utils[_0x15f033(0x76b)]()){const _0x300a27=window[_0x15f033(0x6a2)](_0x145d63,_0x15f033(0x25b));}else{const _0xa47e7e=process[_0x15f033(0x345)]==_0x15f033(0xd4)?'open':process[_0x15f033(0x345)]==_0x15f033(0x489)?_0x15f033(0x3c9):'xdg-open';require(_0x15f033(0xa4))[_0x15f033(0x421)](_0xa47e7e+'\x20'+_0x145d63);}},VisuMZ[_0x17e81a(0x4b7)]=function(_0x45fd53,_0x5dcef6){const _0x363725=_0x17e81a;if(!_0x45fd53)return'';const _0x160c45=_0x45fd53[_0x363725(0x4f4)]||_0x45fd53['id'];let _0x3bdd03='';return _0x45fd53[_0x363725(0x39c)]!==undefined&&_0x45fd53[_0x363725(0xee)]!==undefined&&(_0x3bdd03='Actor-%1-%2'[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x277)]!==undefined&&_0x45fd53[_0x363725(0x1ad)]!==undefined&&(_0x3bdd03='Class-%1-%2'[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x47c)]!==undefined&&_0x45fd53['requiredWtypeId1']!==undefined&&(_0x3bdd03=_0x363725(0x4c4)[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x16a)]!==undefined&&_0x45fd53['consumable']!==undefined&&(_0x3bdd03=_0x363725(0x12d)[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x55c)]!==undefined&&_0x45fd53['etypeId']===0x1&&(_0x3bdd03='Weapon-%1-%2'[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x465)]!==undefined&&_0x45fd53[_0x363725(0x418)]>0x1&&(_0x3bdd03=_0x363725(0x6de)[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x2af)]!==undefined&&_0x45fd53[_0x363725(0x44e)]!==undefined&&(_0x3bdd03=_0x363725(0x25f)['format'](_0x160c45,_0x5dcef6)),_0x45fd53[_0x363725(0x497)]!==undefined&&_0x45fd53['maxTurns']!==undefined&&(_0x3bdd03='State-%1-%2'[_0x363725(0x51e)](_0x160c45,_0x5dcef6)),_0x3bdd03;},Window_Base[_0x17e81a(0x44d)][_0x17e81a(0x2c5)]=function(_0x16adac,_0x393ba4){const _0x543870=_0x17e81a,_0x56e28e=ImageManager[_0x543870(0x6b8)]||0x20,_0x1cc3d7=ImageManager[_0x543870(0x141)]||0x20;if(_0x393ba4[_0x543870(0x27e)]){const _0x3fcf1d=_0x56e28e-ImageManager[_0x543870(0x54b)],_0x4dc34c=_0x1cc3d7-ImageManager[_0x543870(0x800)];let _0x537272=0x2,_0x138de8=0x2;this[_0x543870(0x28c)]()!==0x24&&(_0x138de8=Math[_0x543870(0x2b3)]((this[_0x543870(0x28c)]()-_0x1cc3d7)/0x2));const _0x5ed643=_0x393ba4['x']+Math[_0x543870(0x2b3)](_0x3fcf1d/0x2)+_0x537272,_0x5c6ec2=_0x393ba4['y']+Math[_0x543870(0x2b3)](_0x4dc34c/0x2)+_0x138de8;this[_0x543870(0x31e)](_0x16adac,_0x5ed643,_0x5c6ec2);}_0x393ba4['x']+=_0x56e28e+0x4;},Window_StatusBase[_0x17e81a(0x44d)][_0x17e81a(0x5b1)]=function(_0xe5b2ba,_0xddc8dc,_0xd4dfbd,_0x2d3f27){const _0xd883e2=_0x17e81a;_0x2d3f27=_0x2d3f27||0x90;const _0x1bde24=ImageManager[_0xd883e2(0x6b8)]||0x20,_0x6a68bf=ImageManager[_0xd883e2(0x141)]||0x20,_0x209f75=_0x1bde24-ImageManager[_0xd883e2(0x54b)],_0x389ef9=_0x6a68bf-ImageManager[_0xd883e2(0x800)],_0x5a8c81=_0x1bde24,_0x38abad=_0xe5b2ba[_0xd883e2(0x6f4)]()[_0xd883e2(0x3b5)](0x0,Math[_0xd883e2(0x2b3)](_0x2d3f27/_0x5a8c81));let _0x5c33d3=_0xddc8dc+Math['ceil'](_0x209f75/0x2),_0x110a2e=_0xd4dfbd+Math[_0xd883e2(0x2a2)](_0x389ef9/0x2);for(const _0x27d6bf of _0x38abad){this[_0xd883e2(0x31e)](_0x27d6bf,_0x5c33d3,_0x110a2e),_0x5c33d3+=_0x5a8c81;}},Game_Picture['prototype']['anchor']=function(){const _0x4d1be7=_0x17e81a;return this[_0x4d1be7(0x2ba)];},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x726)]=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x719)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x719)]=function(){const _0x7e1866=_0x17e81a;VisuMZ[_0x7e1866(0x1a7)][_0x7e1866(0x726)]['call'](this),this[_0x7e1866(0x2ba)]={'x':0x0,'y':0x0},this[_0x7e1866(0x1fa)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine']['Game_Picture_updateMove']=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x816)],Game_Picture[_0x17e81a(0x44d)]['updateMove']=function(){const _0x8346bb=_0x17e81a;this['updateAnchor']();const _0x5eaa30=this[_0x8346bb(0x67a)];VisuMZ[_0x8346bb(0x1a7)][_0x8346bb(0x728)][_0x8346bb(0x65e)](this),_0x5eaa30>0x0&&this[_0x8346bb(0x67a)]<=0x0&&(this['_x']=this[_0x8346bb(0x69d)],this['_y']=this[_0x8346bb(0x1bd)],this[_0x8346bb(0x37e)]=this['_targetScaleX'],this['_scaleY']=this[_0x8346bb(0x883)],this[_0x8346bb(0x1e5)]=this[_0x8346bb(0x42a)],this[_0x8346bb(0x2ba)]&&(this[_0x8346bb(0x2ba)]['x']=this['_targetAnchor']['x'],this[_0x8346bb(0x2ba)]['y']=this[_0x8346bb(0x1fa)]['y']));},VisuMZ[_0x17e81a(0x1a7)]['Game_Picture_show']=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x225)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x225)]=function(_0x10b49a,_0x68a578,_0x55cd36,_0x3b0674,_0x4d7b8a,_0x1b6f81,_0xea927f,_0x5a54e2){const _0x21bf0b=_0x17e81a;VisuMZ[_0x21bf0b(0x1a7)][_0x21bf0b(0x24b)]['call'](this,_0x10b49a,_0x68a578,_0x55cd36,_0x3b0674,_0x4d7b8a,_0x1b6f81,_0xea927f,_0x5a54e2),this[_0x21bf0b(0x322)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x68a578]||{'x':0x0,'y':0x0});},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x5bd)]=Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x527)],Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x527)]=function(_0x707f65,_0x32221a,_0x159a3e,_0x3f6e0d,_0x4b1360,_0x4833d5,_0x5b9d6c,_0x8abf62,_0x566cb2){const _0x2cdd33=_0x17e81a;VisuMZ[_0x2cdd33(0x1a7)][_0x2cdd33(0x5bd)]['call'](this,_0x707f65,_0x32221a,_0x159a3e,_0x3f6e0d,_0x4b1360,_0x4833d5,_0x5b9d6c,_0x8abf62,_0x566cb2),this[_0x2cdd33(0x81a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x707f65]||{'x':0x0,'y':0x0});},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x551)]=function(){const _0x155274=_0x17e81a;this[_0x155274(0x67a)]>0x0&&(this[_0x155274(0x2ba)]['x']=this['applyEasing'](this[_0x155274(0x2ba)]['x'],this[_0x155274(0x1fa)]['x']),this['_anchor']['y']=this[_0x155274(0x70a)](this[_0x155274(0x2ba)]['y'],this[_0x155274(0x1fa)]['y']));},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x322)]=function(_0x23654e){const _0x36aa46=_0x17e81a;this['_anchor']=_0x23654e,this[_0x36aa46(0x1fa)]=JsonEx[_0x36aa46(0x2b5)](this[_0x36aa46(0x2ba)]);},Game_Picture[_0x17e81a(0x44d)][_0x17e81a(0x81a)]=function(_0x553ff6){const _0xfa58d4=_0x17e81a;this[_0xfa58d4(0x1fa)]=_0x553ff6;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x839)]=Sprite_Picture[_0x17e81a(0x44d)]['updateOrigin'],Sprite_Picture['prototype'][_0x17e81a(0x754)]=function(){const _0x3f78bf=_0x17e81a,_0x363f78=this[_0x3f78bf(0x5b7)]();!_0x363f78[_0x3f78bf(0x799)]()?VisuMZ['CoreEngine'][_0x3f78bf(0x839)]['call'](this):(this['anchor']['x']=_0x363f78[_0x3f78bf(0x799)]()['x'],this['anchor']['y']=_0x363f78['anchor']()['y']);},Game_Action['prototype'][_0x17e81a(0x1f5)]=function(_0x512c55){const _0x55565c=_0x17e81a;if(_0x512c55){const _0x5deb7f=_0x512c55[_0x55565c(0x687)];if(_0x5deb7f===0x1&&this[_0x55565c(0x675)]()[_0x55565c(0x27d)]()!==0x1)this[_0x55565c(0x7e9)]();else _0x5deb7f===0x2&&this['subject']()[_0x55565c(0x87a)]()!==0x2?this[_0x55565c(0x541)]():this[_0x55565c(0x6d2)](_0x5deb7f);}else this['clear']();},Game_Actor[_0x17e81a(0x44d)]['usableSkills']=function(){const _0x3e315a=_0x17e81a;return this[_0x3e315a(0x43a)]()[_0x3e315a(0x23b)](_0xba3ce2=>this['canUse'](_0xba3ce2)&&this[_0x3e315a(0x2d7)]()[_0x3e315a(0x2b0)](_0xba3ce2['stypeId']));},Window_Base[_0x17e81a(0x44d)]['createDimmerSprite']=function(){const _0x10859d=_0x17e81a;this[_0x10859d(0x554)]=new Sprite(),this['_dimmerSprite'][_0x10859d(0x313)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x10859d(0x367)](this[_0x10859d(0x554)]);},Window_Base[_0x17e81a(0x44d)]['refreshDimmerBitmap']=function(){const _0x10d9a2=_0x17e81a;if(this[_0x10d9a2(0x554)]){const _0x386c4d=this['_dimmerSprite'][_0x10d9a2(0x313)],_0x3af581=this[_0x10d9a2(0x107)],_0x2edf75=this['height'],_0x5b480e=this[_0x10d9a2(0x3a7)],_0x3461d4=ColorManager[_0x10d9a2(0x633)](),_0x29fba5=ColorManager[_0x10d9a2(0x81c)]();_0x386c4d['resize'](_0x3af581,_0x2edf75),_0x386c4d[_0x10d9a2(0x255)](0x0,0x0,_0x3af581,_0x5b480e,_0x29fba5,_0x3461d4,!![]),_0x386c4d['fillRect'](0x0,_0x5b480e,_0x3af581,_0x2edf75-_0x5b480e*0x2,_0x3461d4),_0x386c4d[_0x10d9a2(0x255)](0x0,_0x2edf75-_0x5b480e,_0x3af581,_0x5b480e,_0x3461d4,_0x29fba5,!![]),this[_0x10d9a2(0x554)][_0x10d9a2(0x33a)](0x0,0x0,_0x3af581,_0x2edf75);}},Game_Actor[_0x17e81a(0x44d)][_0x17e81a(0x20f)]=function(){const _0x52bee2=_0x17e81a;for(let _0x120299=0x0;_0x120299<this['numActions']();_0x120299++){const _0xf8ddc5=this['makeActionList']();let _0x12f064=Number[_0x52bee2(0x1d5)];this[_0x52bee2(0x484)](_0x120299,_0xf8ddc5[0x0]);for(const _0x31a6ca of _0xf8ddc5){const _0x26b286=_0x31a6ca[_0x52bee2(0x3c3)]();_0x26b286>_0x12f064&&(_0x12f064=_0x26b286,this['setAction'](_0x120299,_0x31a6ca));}}this[_0x52bee2(0x4bc)]('waiting');},Window_BattleItem['prototype']['isEnabled']=function(_0x16c996){const _0x597422=_0x17e81a;return BattleManager[_0x597422(0x178)]()?BattleManager[_0x597422(0x178)]()[_0x597422(0x25c)](_0x16c996):Window_ItemList['prototype'][_0x597422(0x15c)]['call'](this,_0x16c996);},VisuMZ['CoreEngine'][_0x17e81a(0x6c2)]=Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x6d7)],Scene_Map[_0x17e81a(0x44d)]['createSpriteset']=function(){const _0x43da5d=_0x17e81a;VisuMZ['CoreEngine'][_0x43da5d(0x6c2)][_0x43da5d(0x65e)](this);const _0x4e7a24=this[_0x43da5d(0x552)]['_timerSprite'];if(_0x4e7a24)this['addChild'](_0x4e7a24);},VisuMZ[_0x17e81a(0x1a7)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x17e81a(0x44d)]['createSpriteset'],Scene_Battle['prototype'][_0x17e81a(0x6d7)]=function(){const _0x11a98b=_0x17e81a;VisuMZ[_0x11a98b(0x1a7)][_0x11a98b(0x519)][_0x11a98b(0x65e)](this);const _0x4828aa=this[_0x11a98b(0x552)][_0x11a98b(0x2ef)];if(_0x4828aa)this[_0x11a98b(0x487)](_0x4828aa);},Sprite_Actor[_0x17e81a(0x44d)][_0x17e81a(0x2a6)]=function(){const _0x3ab19a=_0x17e81a;Sprite_Battler['prototype']['update'][_0x3ab19a(0x65e)](this),this['updateShadow']();if(this[_0x3ab19a(0x845)])this[_0x3ab19a(0x586)]();else this['_battlerName']!==''&&(this[_0x3ab19a(0x32e)]='');},Window[_0x17e81a(0x44d)]['_refreshArrows']=function(){const _0x4c72da=_0x17e81a,_0x480948=this[_0x4c72da(0x4ef)],_0x491af7=this[_0x4c72da(0x71e)],_0x4079bd=0x18,_0xea0cb0=_0x4079bd/0x2,_0x282cf0=0x60+_0x4079bd,_0x42406a=0x0+_0x4079bd;this[_0x4c72da(0x3c1)][_0x4c72da(0x313)]=this[_0x4c72da(0x3f4)],this[_0x4c72da(0x3c1)]['anchor']['x']=0.5,this[_0x4c72da(0x3c1)][_0x4c72da(0x799)]['y']=0.5,this[_0x4c72da(0x3c1)][_0x4c72da(0x33a)](_0x282cf0+_0xea0cb0,_0x42406a+_0xea0cb0+_0x4079bd,_0x4079bd,_0xea0cb0),this[_0x4c72da(0x3c1)]['move'](Math['round'](_0x480948/0x2),Math[_0x4c72da(0x397)](_0x491af7-_0xea0cb0)),this[_0x4c72da(0x3bc)]['bitmap']=this[_0x4c72da(0x3f4)],this['_upArrowSprite'][_0x4c72da(0x799)]['x']=0.5,this['_upArrowSprite'][_0x4c72da(0x799)]['y']=0.5,this[_0x4c72da(0x3bc)][_0x4c72da(0x33a)](_0x282cf0+_0xea0cb0,_0x42406a,_0x4079bd,_0xea0cb0),this[_0x4c72da(0x3bc)][_0x4c72da(0x527)](Math[_0x4c72da(0x397)](_0x480948/0x2),Math[_0x4c72da(0x397)](_0xea0cb0));},Window[_0x17e81a(0x44d)][_0x17e81a(0x7c2)]=function(){const _0x328bdc=_0x17e81a,_0x4b80d1=0x90,_0xeb60f=0x60,_0x28882d=0x18;this[_0x328bdc(0xc9)][_0x328bdc(0x313)]=this[_0x328bdc(0x3f4)],this[_0x328bdc(0xc9)]['anchor']['x']=0.5,this[_0x328bdc(0xc9)]['anchor']['y']=0x1,this['_pauseSignSprite'][_0x328bdc(0x527)](Math['round'](this[_0x328bdc(0x4ef)]/0x2),this[_0x328bdc(0x71e)]),this[_0x328bdc(0xc9)][_0x328bdc(0x33a)](_0x4b80d1,_0xeb60f,_0x28882d,_0x28882d),this[_0x328bdc(0xc9)][_0x328bdc(0x7c0)]=0xff;},Window['prototype'][_0x17e81a(0x60f)]=function(){const _0x5a518e=_0x17e81a,_0x566284=this[_0x5a518e(0x3e4)]['worldTransform']['apply'](new Point(0x0,0x0)),_0x41fcfb=this[_0x5a518e(0x3e4)][_0x5a518e(0x85a)];_0x41fcfb['x']=_0x566284['x']+this[_0x5a518e(0xeb)]['x'],_0x41fcfb['y']=_0x566284['y']+this['origin']['y'],_0x41fcfb[_0x5a518e(0x107)]=Math[_0x5a518e(0x2a2)](this[_0x5a518e(0x2f1)]*this[_0x5a518e(0x5d7)]['x']),_0x41fcfb[_0x5a518e(0x4a1)]=Math['ceil'](this[_0x5a518e(0x177)]*this['scale']['y']);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x599)]=Window[_0x17e81a(0x44d)][_0x17e81a(0x61e)],Window[_0x17e81a(0x44d)][_0x17e81a(0x61e)]=function(){const _0x2819e2=_0x17e81a,_0x3d4815=VisuMZ[_0x2819e2(0x1a7)][_0x2819e2(0x26d)]['Window'][_0x2819e2(0x594)]??!![];if(!_0x3d4815)return VisuMZ[_0x2819e2(0x1a7)][_0x2819e2(0x599)]['call'](this);const _0xbd8e83=this[_0x2819e2(0x410)],_0x45635f=Math[_0x2819e2(0x744)](0x0,this['_width']-_0xbd8e83*0x2),_0x201678=Math[_0x2819e2(0x744)](0x0,this[_0x2819e2(0x71e)]-_0xbd8e83*0x2),_0x36ba58=this[_0x2819e2(0x2bb)],_0x38b3cf=_0x36ba58['children'][0x0];_0x36ba58[_0x2819e2(0x313)]=this[_0x2819e2(0x3f4)],_0x36ba58['setFrame'](0x0,0x0,0x60,0x60),_0x36ba58[_0x2819e2(0x527)](_0xbd8e83,_0xbd8e83),_0x36ba58[_0x2819e2(0x5d7)]['x']=_0x45635f/0x60,_0x36ba58[_0x2819e2(0x5d7)]['y']=_0x201678/0x60,_0x38b3cf['bitmap']=this[_0x2819e2(0x3f4)],_0x38b3cf['setFrame'](0x0,0x60,0x60,0x60),_0x38b3cf[_0x2819e2(0x527)](0x0,0x0,_0x45635f,_0x201678),_0x38b3cf[_0x2819e2(0x5d7)]['x']=0x1/_0x36ba58[_0x2819e2(0x5d7)]['x'],_0x38b3cf[_0x2819e2(0x5d7)]['y']=0x1/_0x36ba58['scale']['y'],_0x36ba58[_0x2819e2(0x654)](this['_colorTone']);},Game_Temp[_0x17e81a(0x44d)]['sceneTerminationClearEffects']=function(){const _0x43fcbd=_0x17e81a;this[_0x43fcbd(0x7aa)]=[],this[_0x43fcbd(0x2ff)]=[],this[_0x43fcbd(0x78b)]=[],this['_balloonQueue']=[];},VisuMZ[_0x17e81a(0x1a7)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x17e81a(0x44d)][_0x17e81a(0x2f8)],Scene_Base['prototype']['terminate']=function(){const _0xb28fe7=_0x17e81a;if($gameTemp)$gameTemp[_0xb28fe7(0xcb)]();VisuMZ['CoreEngine'][_0xb28fe7(0x2de)][_0xb28fe7(0x65e)](this);},Bitmap[_0x17e81a(0x44d)][_0x17e81a(0x5d0)]=function(_0x5d0e1d){const _0x4e2a4a=_0x17e81a,_0x1b3c49=this[_0x4e2a4a(0x718)];_0x1b3c49['save'](),_0x1b3c49[_0x4e2a4a(0x4b1)]=this['_makeFontNameText']();const _0x374f47=_0x1b3c49[_0x4e2a4a(0x147)](_0x5d0e1d)['width'];return _0x1b3c49[_0x4e2a4a(0x601)](),_0x374f47;},Window_Message['prototype'][_0x17e81a(0x321)]=function(_0x3e0494){const _0xd3a7fa=_0x17e81a;return this['useFontWidthFix']()?this[_0xd3a7fa(0x166)][_0xd3a7fa(0x5d0)](_0x3e0494):Window_Base['prototype']['textWidth'][_0xd3a7fa(0x65e)](this,_0x3e0494);},Window_Message[_0x17e81a(0x44d)][_0x17e81a(0x201)]=function(){const _0x31a98b=_0x17e81a;return VisuMZ[_0x31a98b(0x1a7)][_0x31a98b(0x26d)]['QoL']['FontWidthFix']??!![];},VisuMZ[_0x17e81a(0x1a7)]['Game_Action_numRepeats']=Game_Action[_0x17e81a(0x44d)][_0x17e81a(0x85e)],Game_Action[_0x17e81a(0x44d)]['numRepeats']=function(){const _0x39dacf=_0x17e81a;return this['item']()?VisuMZ[_0x39dacf(0x1a7)][_0x39dacf(0x380)][_0x39dacf(0x65e)](this):0x0;},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x7c3)]=Game_Action[_0x17e81a(0x44d)][_0x17e81a(0x7e9)],Game_Action[_0x17e81a(0x44d)][_0x17e81a(0x7e9)]=function(){const _0x7f8d22=_0x17e81a;if(this[_0x7f8d22(0x675)]()&&this['subject']()[_0x7f8d22(0x6e6)]())VisuMZ['CoreEngine'][_0x7f8d22(0x7c3)][_0x7f8d22(0x65e)](this);else BattleManager[_0x7f8d22(0x9e)]?VisuMZ[_0x7f8d22(0x1a7)][_0x7f8d22(0x7c3)]['call'](this):this['clear']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x676)]=BattleManager[_0x17e81a(0x11d)],BattleManager[_0x17e81a(0x11d)]=function(_0x3202cf,_0x49c5b8){const _0x5afd38=_0x17e81a;this[_0x5afd38(0x9e)]=!![],VisuMZ[_0x5afd38(0x1a7)]['BattleManager_invokeCounterAttack'][_0x5afd38(0x65e)](this,_0x3202cf,_0x49c5b8),this[_0x5afd38(0x9e)]=undefined;},Sprite_Name[_0x17e81a(0x44d)][_0x17e81a(0x6ae)]=function(){return 0x24;},Sprite_Name[_0x17e81a(0x44d)][_0x17e81a(0xfb)]=function(){const _0x3a2773=_0x17e81a,_0x1b047d=this[_0x3a2773(0x320)](),_0x3af303=this[_0x3a2773(0x2da)](),_0x1d09c7=this[_0x3a2773(0x6ae)]();this['setupFont'](),this[_0x3a2773(0x313)]['clear'](),this[_0x3a2773(0x313)][_0x3a2773(0xf9)](_0x1b047d,0x4,0x0,_0x3af303-0xa,_0x1d09c7,'left');},Bitmap[_0x17e81a(0x44d)][_0x17e81a(0xf9)]=function(_0x2b0567,_0x5aaa5e,_0x106c85,_0x142d3d,_0x29a4eb,_0x126c9a){const _0x4e9f30=_0x17e81a,_0x95956a=this[_0x4e9f30(0x718)],_0x271018=_0x95956a[_0x4e9f30(0x72c)];_0x142d3d=_0x142d3d||0xffffffff;let _0x34db29=_0x5aaa5e,_0x32e038=Math[_0x4e9f30(0x397)](_0x106c85+0x18/0x2+this[_0x4e9f30(0x296)]*0.35);_0x126c9a===_0x4e9f30(0x6f5)&&(_0x34db29+=_0x142d3d/0x2),_0x126c9a==='right'&&(_0x34db29+=_0x142d3d),_0x95956a[_0x4e9f30(0x137)](),_0x95956a[_0x4e9f30(0x4b1)]=this['_makeFontNameText'](),_0x95956a[_0x4e9f30(0x276)]=_0x126c9a,_0x95956a['textBaseline']='alphabetic',_0x95956a[_0x4e9f30(0x72c)]=0x1,this[_0x4e9f30(0x61c)](_0x2b0567,_0x34db29,_0x32e038,_0x142d3d),_0x95956a[_0x4e9f30(0x72c)]=_0x271018,this[_0x4e9f30(0x5de)](_0x2b0567,_0x34db29,_0x32e038,_0x142d3d),_0x95956a[_0x4e9f30(0x601)](),this[_0x4e9f30(0x68e)]['update']();},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x2a4)]=BattleManager[_0x17e81a(0x3d5)],BattleManager[_0x17e81a(0x3d5)]=function(_0x1bc36a){const _0x509886=_0x17e81a;if(this[_0x509886(0x734)][_0x509886(0xce)]())return![];return VisuMZ[_0x509886(0x1a7)][_0x509886(0x2a4)][_0x509886(0x65e)](this,_0x1bc36a);},BattleManager['endAction']=function(){const _0x4e4c64=_0x17e81a;if(this['_subject'])this[_0x4e4c64(0x709)][_0x4e4c64(0x326)](this[_0x4e4c64(0x53b)]);this[_0x4e4c64(0x85b)]='turn',this[_0x4e4c64(0x53b)]&&this[_0x4e4c64(0x53b)]['numActions']()===0x0&&(this[_0x4e4c64(0x142)](this['_subject']),this[_0x4e4c64(0x53b)]=null);},Bitmap[_0x17e81a(0x44d)]['_startLoading']=function(){const _0x23ca01=_0x17e81a;this[_0x23ca01(0x801)]=new Image(),this[_0x23ca01(0x801)]['onload']=this[_0x23ca01(0x5e2)][_0x23ca01(0x309)](this),this['_image'][_0x23ca01(0x5ec)]=this[_0x23ca01(0x2e7)][_0x23ca01(0x309)](this),this[_0x23ca01(0x543)](),this[_0x23ca01(0x34a)]=_0x23ca01(0x843),Utils[_0x23ca01(0x442)]()?this['_startDecrypting']():(this[_0x23ca01(0x801)][_0x23ca01(0x81b)]=this[_0x23ca01(0x19d)],![]&&this[_0x23ca01(0x801)][_0x23ca01(0x107)]>0x0&&(this[_0x23ca01(0x801)][_0x23ca01(0x43e)]=null,this[_0x23ca01(0x5e2)]()));},Scene_Skill['prototype'][_0x17e81a(0x297)]=function(){const _0x295fd5=_0x17e81a;Scene_MenuBase[_0x295fd5(0x44d)]['onActorChange'][_0x295fd5(0x65e)](this),this[_0x295fd5(0x1f3)](),this['_itemWindow'][_0x295fd5(0x80c)](),this[_0x295fd5(0x258)]['deselect'](),this[_0x295fd5(0x438)][_0x295fd5(0x34d)]();},Scene_Skill[_0x17e81a(0x44d)]['arePageButtonsEnabled']=function(){const _0x4e3746=_0x17e81a;return this[_0x4e3746(0x438)]&&this[_0x4e3746(0x438)][_0x4e3746(0x3fa)];},Game_Map['prototype']['checkPassage']=function(_0x46fcc1,_0x42d924,_0x579168){const _0x110ce3=_0x17e81a,_0x13da8b=this[_0x110ce3(0x343)](),_0x26f034=this[_0x110ce3(0x6e5)](_0x46fcc1,_0x42d924);for(const _0x38e639 of _0x26f034){const _0x17b11c=_0x13da8b[_0x38e639];if(_0x17b11c===undefined||_0x17b11c===null){if($gameTemp[_0x110ce3(0x6d5)]()&&!DataManager['isEventTest']()){let _0x3a7d68=_0x110ce3(0x6b1)+'\x0a';_0x3a7d68+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x3a7d68+=_0x110ce3(0x7f7);if(this[_0x110ce3(0x4e9)]())alert(_0x3a7d68),SceneManager[_0x110ce3(0x46a)]();else{if(!this[_0x110ce3(0x5fe)])console[_0x110ce3(0x7dd)](_0x3a7d68);this[_0x110ce3(0x5fe)]=!![];}}}if((_0x17b11c&0x10)!==0x0)continue;if((_0x17b11c&_0x579168)===0x0)return!![];if((_0x17b11c&_0x579168)===_0x579168)return![];}return![];},Game_Map[_0x17e81a(0x44d)][_0x17e81a(0x4e9)]=function(){const _0x99ff5c=_0x17e81a;if(Imported[_0x99ff5c(0x306)])return!![];if(Imported[_0x99ff5c(0x396)])return!![];return![];},Sprite_Animation['prototype'][_0x17e81a(0x496)]=function(_0x40a30e){const _0x471c80=_0x17e81a;!this[_0x471c80(0x226)]&&(this[_0x471c80(0x226)]=_0x40a30e['gl']['getParameter'](_0x40a30e['gl'][_0x471c80(0x568)]));},VisuMZ['CoreEngine'][_0x17e81a(0x31c)]=Scene_Map[_0x17e81a(0x44d)]['shouldAutosave'],Scene_Map[_0x17e81a(0x44d)][_0x17e81a(0x283)]=function(){const _0x411b6e=_0x17e81a,_0x2f9227=SceneManager[_0x411b6e(0xbd)][_0x411b6e(0x320)];if([_0x411b6e(0x2a7),_0x411b6e(0x56b),_0x411b6e(0x368),_0x411b6e(0xf3)][_0x411b6e(0x2b0)](_0x2f9227))return![];return VisuMZ[_0x411b6e(0x1a7)]['Scene_Map_shouldAutosave']['call'](this);},VisuMZ[_0x17e81a(0x1a7)][_0x17e81a(0x2c2)]=Window_SkillList[_0x17e81a(0x44d)][_0x17e81a(0x2b0)],Window_SkillList[_0x17e81a(0x44d)][_0x17e81a(0x2b0)]=function(_0x4d95b2){const _0x26d3e8=_0x17e81a;if(this[_0x26d3e8(0xac)]<=0x0)return![];return VisuMZ[_0x26d3e8(0x1a7)][_0x26d3e8(0x2c2)][_0x26d3e8(0x65e)](this,_0x4d95b2);},VisuMZ['CoreEngine'][_0x17e81a(0x303)]=Game_Battler[_0x17e81a(0x44d)][_0x17e81a(0x228)],Game_Battler['prototype'][_0x17e81a(0x228)]=function(_0x4d003b){const _0x46e6ca=_0x17e81a;VisuMZ[_0x46e6ca(0x1a7)]['Game_Battler_initTpbChargeTime']['call'](this,_0x4d003b),isNaN(this[_0x46e6ca(0x6e8)])&&(VisuMZ[_0x46e6ca(0x1a7)]['Game_Battler_initTpbChargeTime']['call'](this,_0x4d003b),isNaN(this[_0x46e6ca(0x6e8)])&&(this['_tpbChargeTime']=0x0));},Game_Battler['prototype']['updateTpbChargeTime']=function(){const _0x511a94=_0x17e81a;this[_0x511a94(0x28a)]===_0x511a94(0xe0)&&(this[_0x511a94(0x6e8)]+=this[_0x511a94(0x7b0)](),isNaN(this[_0x511a94(0x6e8)])&&(this[_0x511a94(0x6e8)]=this['tpbAcceleration'](),isNaN(this[_0x511a94(0x6e8)])&&(this[_0x511a94(0x6e8)]=0x0)),this[_0x511a94(0x6e8)]>=0x1&&(this[_0x511a94(0x6e8)]=0x1,this[_0x511a94(0xfe)]()));};function _0x1a61(){const _0x22667f=['%1/','removeTileExtendSprites','playTestF6','buttonAssistOffset%1','img/%1/','_patternHeight','type','_onKeyPress','_pointAnimationQueue','buttonAssistCancel','_saveFileID','_forcedBattleGridSystem','ColorTPGauge2','FontSize','scrollbar','_stored_normalColor','animationId','endAnimation','processTimingData','createButtonAssistWindow','randomJS','itemRect','anchor','fadeSpeed','SwitchRandomizeOne','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isMenuButtonAssistEnabled','Window_TitleCommand_selectLast','isNextScene','onInputBannedWords','catchLoadError','VisuMZ_2_BattleSystemBTB','fillText','initRotationCoreEngine','animations','_isWindow','exportAllTroopStrings','_text','addOnceParallelInterpreter','_animationQueue','scrollRight','keyMapper','processBack','_backSprite1','Scene_Name_onInputOk','tpbAcceleration','\x20Origin:\x20%1','Game_Actor_paramBase','pos','isMVAnimation','duration','tileWidth','replace','showPointAnimations','buttonAssistOk','addLoadListener','resize','WIN_OEM_FJ_JISHO','overallHeight','XParameterFormula','_editWindow','alpha','batch','_refreshPauseSign','Game_Action_setAttack','updatePictureCoordinates','listWindowRect','setupCoreEasing','catchException','HRG','areButtonsOutsideMainUI','AntiZoomPictures','successRate','loadSystemImages','buttonAssistSwitch','BarOffset','Window_NumberInput_start','OUTQUART','repositionCancelButtonSideButtonLayout','TranslucentOpacity','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ParamChange','mainAreaHeight','destroyScrollBarBitmaps','canEquip','left','VOLUME_MUTE','Bitmap_fillRect','updateClose','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','log','drawItem','scaleX','createWindowLayer','sparamRate','Max','_digitGroupingEx','Plus2','_stored_mpCostColor','Window_Base_drawText','processSoundTimings','ItemBackColor1','setAttack','_eventId','windowOpacity','Conditional\x20Branch\x20Script\x20Error','LineHeight','createFauxAnimationQueue','SystemSetBattleSystem','centerSprite','Layer','setupBattleTestItems','updateCoreEasing','ControllerMatches','BTB','ctrlKey','and\x20add\x20it\x20onto\x20this\x20one.','ItemPadding','Scene_Map_createMenuButton','PTB','level','sparam','_encounterCount','_stored_tpGaugeColor2','createTitleButtons','iconHeight','_image','sparamRate2','Scene_Boot_startNormalGame','events','command105','Game_Map_changeTileset','_stored_systemColor','this.paramBase(3)','SEMICOLON','retreat','outlineColorGauge','deactivate','updateOnceParallelInterpreters','Graphics_defaultStretchMode','mpColor','pictureButtons','switchModes','targetOpacity','VisuMZ_2_BattleSystemCTB','applyCoreEasing','system','updateMove','buttonAssistKey%1','_lastIconIndex','_animationSprites','setTargetAnchor','src','dimColor2','InputBgType','COLON','clearRect','DATABASE','drawText','CheckSplitEscape','resetTextColor','_hideButtons','displayX','DrawIcons','getLevel','evaded','ExtDisplayedParams','maxTp','Sprite_destroy','Window_ShopSell_isEnabled','HIT','DebugConsoleLastControllerID','PGDN','repeat','targetPosition','_allTextHeight','processAlwaysEscape','ScaleY','isInstanceOfSceneMap','》Comment《\x0a%1\x0a','IconParam7','startNormalGame','Sprite_Picture_updateOrigin','_targets','displayY','ControllerButtons','MINUS','SceneManager_initialize','useDigitGrouping','outlineColor','application/json','updatePositionCoreEngine','loading','disable','_actor','_lastScrollBarValues','maxScrollY','setMoveEasingType','Window_NameInput_initialize','TextManager_param','setTileFrame','isMagical','HelpBgType','Location','OPEN_CURLY_BRACKET','get','_textQueue','horizontal','_defaultStretchMode','updateDuration','Game_Picture_initRotation','OUTQUINT','measureTextWidth','forceStencil','_scrollBarHorz','filterArea','_phase','Game_Interpreter_command111','WIN_OEM_FJ_MASSHOU','numRepeats','_movementDuration','INOUTSINE','_goldWindow','ButtonFadeSpeed','yScrollLinkedOffset','requestFauxAnimation','ButtonHeight','status','drawTextEx','nah','playMiss','PHA','FontSmoothing','paramRate2','_cacheScaleX','SParamVocab1','rgba(0,\x200,\x200,\x200.7)','ExtractStrFromTroop','_isButtonHidden','_hovered','WIN_OEM_RESET','tpGaugeColor2','Spriteset_Base_destroy','charCode','changeAnglePlusData','MCR','LevelUpFullMp','guardSkillId','pan','DOLLAR','ParseTilesetNotetags','buttonAssistWindowSideRect','traitsPi','Window_Selectable_cursorUp','ENTER','_shiftY','_targetScaleY','mute','traitObjects','targetObjects','OnLoadJS','_stored_hpGaugeColor2','_pollGamepads','getCoreEngineScreenShakeStyle','numberWindowRect','Window_NameInput_processTouch','pow','createScrollBarSprites','_bypassCanCounterCheck','_listWindow','Scene_Battle_createSpriteset_detach','Scene_Item_create','drawCurrentParam','_commonEventLayers','child_process','createFauxAnimation','CLOSE_CURLY_BRACKET','_target','_bgmBuffer','evade','F6key','TILDE','_stypeId','mpGaugeColor1','getTileExtendTerrainTags','erasePicture','ProfileBgType','pitch','printError','needsUpdate','<JS\x20%1\x20%2:[\x20](.*)>','_statusParamsWindow','EscapeAlways','clamp','WIN_OEM_PA1','battlebacks2','_opening','OffBarOpacity','cos','_previousClass','_moveEasingType','isActiveTpb','Script\x20Call\x20Error','createCustomBackgroundImages','itemWindowRect','isClosing','RightMenus','_mapNameWindow','_shakePower','initCoreEngine','ParseArmorNotetags','_pauseSignSprite','xparamRate2','sceneTerminationClearEffects','initCoreEasing','loadWindowskin','isForFriend','paintOpacity','EquipMenu','operand','setCommonEvent','parallaxes','darwin','ButtonAssist','process_VisuMZ_CoreEngine_Settings','updatePointAnimations','titles2','isSmartEventCollisionOn','_inputWindow','flush','FINAL','LvExpGauge','isCancelled','savefileInfo','charging','Page','currencyUnit','parseForcedGameTroopSettingsCoreEngine','colSpacing','JsReplaceUserVar','Sprite_Battler_startMove','itemHit','characters','KeySHIFT','xparamRateJS','origin','OffBarColor','asin','nickname','_bgsBuffer','GET','horzJS','Sprite_AnimationMV_processTimingData','Scene_SingleLoadTransition','isGamepadConnected','_lastOrigin','sparamFlat2','processTouch','F17','drawTextTopAligned','_lastX','redraw','DisplayedParams','cursorRight','onTpbCharged','_tileExtendTerrainTags','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','setMainFontSize','original','initialize','EnableJS','currentClass','PRINT','width','NUM','offset','Scene_Battle_update','IconParam6','requestMotion','_startPlaying','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','gainSilentTp','RowSpacing','STRUCT','GameEnd','getBackgroundOpacity','onMoveEnd','setupButtonImage','_scene','getGamepads','Spriteset_Base_updatePosition','drawActorExpGauge','scrollY','LATIN1','_drawTextShadow','invokeCounterAttack','_centerElementCoreEngine','ShiftT_Toggle','_tempActor','style','Game_Interpreter_command355','SideButtons','PA1','targets','_stored_maxLvGaugeColor2','encounterStepsMinimum','Enemy','F13','Game_Character_processMoveCommand','OPEN_BRACKET','Window_NumberInput_processDigitChange','Item-%1-%2','paramRate1','Bitmap_resize','setClickHandler','xparam','getControllerInputButtonString','_dummyWindow','MDR','_mode','ListRect','save','StatusEquipRect','isClosed','centerX','NUMPAD8','Game_Map_setup','responseText','setBattleSystem','loadPicture','DigitGroupingStandardText','standardIconHeight','endBattlerActions','IconXParam1','Window_Scrollable_update','Map%1','parameters','measureText','ENTER_SPECIAL','showFauxAnimations','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','ExtractStrFromList','scrollbarHeight','SlotBgType','Window_Base_drawIcon','getButtonAssistLocation','itemPadding','_stored_expGaugeColor2','padZero','INELASTIC','NewGameCommonEventAll','Manual','zoomScale','updatePositionCoreEngineShakeRand','MULTIPLY','KANA','DummyRect','isExpGaugeDrawn','isEnabled','Game_Picture_scaleY','outbounce','playTestF7','writeFile','enable','getLastGamepadUsed','framesMax','JSON','_tileExtendSprites','contents','drawFace','Game_Actor_isPreserveTp','drawParamName','itypeId','_tilemap','adjustX','fromCharCode','scrollX','removeAllPointAnimations','Window_EquipItem_isEnabled','ColorNormal','_lastY','Flat','isArrowPressed','ColorDeath','note','innerHeight','actor','INCUBIC','TAB','atbActive','Game_Interpreter_updateWaitMode','runCombinedScrollingTextAsCode','DTB','titles1','inBattle','1.4.4','CONTEXT_MENU','enter','ONE_MINUS_SRC_ALPHA','_cancelButton','INQUAD','toString','_animation','push','addQueue','uiAreaWidth','maxScrollX','STR','Input_onKeyDown','mainCommandWidth','offsetX','processHandling','CustomParamAbb','pixelated','Flat1','list','_digitGrouping','isPressed','SceneManager_isGameActive','Version','Abbreviation','maxVisibleItems','loadTitle2','_url','MinDuration','textSizeEx','setViewportCoreEngineFix','originalJS','isAlive','153oSRpzT','setupValueFont','ColorMaxLvGauge1','XParamVocab3','CoreEngine','drawCircle','children','setupRate','isAnimationForEach','showDevTools','learnings','outlineColorDmg','INBOUNCE','pagedown','LoadMenu','PERIOD','PGUP','playEscape','trim','animationBaseDelay','addWindow','IconSet','createCancelButton','_stored_deathColor','shift','CodeJS','_targetY','ExportCurTroopText','process_VisuMZ_CoreEngine_ControllerButtons','updateOpacity','_centerCameraCheck','ProfileRect','FTB','top','Game_Picture_y','Sprite_Button_initialize','pointY','playBgm','CommandBgType','_numberWindow','scrollUp','Game_Unit_onBattleStart','isMaxLevel','ONE','SParamVocab8','Window_StatusBase_drawActorSimpleStatus','〘Scrolling\x20Text〙\x0a','PictureCoordinatesMode','startAnimation','Plus1','MIN_SAFE_INTEGER','setBackgroundType','process_VisuMZ_CoreEngine_Functions','WIN_OEM_WSCTRL','PDR','cursorPageup','HANJA','refreshScrollBarBitmap','ARRAYEVAL','removePointAnimation','Icon','font-smooth','layoutSettings','Scene_Status_create','itemBackColor2','ActorHPColor','_opacity','SCROLLBAR','initDigitGrouping','Bitmap_drawTextOutline','_setupEventHandlers','areButtonsHidden','updateLastTarget','Plus','maxItems','CommandWidth','loadBitmap','updateAnglePlus','calcCoreEasing','gainGold','refreshActor','bgmVolume','setEnemyAction','ItemHeight','buyWindowRect','helpAreaBottom','Title','_targetAnchor','AnimationMirrorOffset','isPhysical','AnimationID','retrievePointAnimation','_stored_ctGaugeColor1','clearForcedGameTroopSettingsCoreEngine','useFontWidthFix','Game_Unit_onBattleEnd','IconSParam7','setBackgroundOpacity','useDigitGroupingEx','updateMainMultiply','HASH','refresh','makeInputButtonString','tilesetNames','lastAnimationSprite','SceneManager_onKeyDown','stringKeyMap','CLOSE_PAREN','makeAutoBattleActions','onButtonImageLoad','processKeyboardHome','drawValue','createFauxAnimationSprite','createPointAnimationSprite','_backgroundFilter','isSideView','currentExp','SParamVocab6','processKeyboardEnd','InputRect','BackOpacity','IconSParam1','isInputting','updateDocumentTitle','#%1','INOUTBACK','_backSprite2','backspace','NewGameCommonEvent','Bitmap_blt','show','_originalViewport','integer','initTpbChargeTime','clearOnceParallelInterpreters','Window_NameInput_processHandling','Rate1','SUBTRACT','Window_NameInput_cursorLeft','NUMPAD5','EXR','command111','drawActorNickname','ParseItemNotetags','opacity','_cache','F23','subtitle','AllTroops','targetScaleX','updateRotation','F10','filter','Untitled','F14','ColorPowerUp','playBuzzer','makeTargetSprites','INCIRC','levelUp','sparamFlat1','concat','OUTSINE','_CoreEngineSettings','CustomParamType','destroyCoreEngineMarkedBitmaps','_lastPluginCommandInterpreter','helpWindowRect','Game_Picture_show','dashToggle','Scene_MenuBase_createCancelButton','isBusy','PixelateImageRendering','updatePositionCoreEngineShakeOriginal','createChildSprite','overallWidth','INQUART','TextPopupShow','gradientFillRect','isItemStyle','_inputSpecialKeyCode','_itemWindow','maxLvGaugeColor2','ParseAllNotetags','_blank','canUse','BgFilename1','Bitmap_drawText','Enemy-%1-%2','CRSEL','refreshWithTextCodeSupport','openingSpeed','_mp','Window','forceOutOfPlaytest','Show\x20Scrolling\x20Text\x20Script\x20Error','INEXPO','Game_Temp_initialize','destroyContents','_repositioned','isFauxAnimationPlaying','scaleY','Settings','isSceneMap','initialBattleSystem','nextLevelExp','process_VisuMZ_CoreEngine_jsQuickFunctions','ColSpacing','pop','ParseClassNotetags','setupNewGame','textAlign','expParams','position','setAnglePlusData','image-rendering','setMute','_helpWindow','attackSkillId','drawing','_troopId','Scene_Title_drawGameTitle','Input_setupEventHandlers','_gamepadWait','shouldAutosave','buttonAssistOffset2','META','WIN_OEM_FJ_LOYA','Control\x20Variables\x20Script\x20Error','touchUI','wait','_tpbState','deselect','lineHeight','createEnemies','Sprite_Button_updateOpacity','easingType','mainAreaHeightSideButtonLayout','_commandList','expGaugeColor1','Map%1.json','ActorMPColor','windowRect','fontSize','onActorChange','setupCoreEngine','Tilemap_addShadow','PictureRotate','_commandWindow','Chance','_forcedTroopView','encounterStep','Input_pollGamepads','SParamVocab4','adjustSprite','ceil','XParamVocab2','BattleManager_checkSubstitute','Sprite_AnimationMV_updatePosition','update','Scene_Title','Tilemap_addSpotTile','optionsWindowRect','mainAreaTopSideButtonLayout','textHeight','([\x5c+\x5c-]\x5cd+)([%％])>','BTestArmors','editWindowRect','dropItems','includes','rightArrowWidth','fillRect','floor','isUseModernControls','makeDeepCopy','xparamRate','createCommandWindow','IconParam5','buttonAssistKey4','_anchor','_backSprite','ColorSystem','_currentBgs','WindowLayer_render','Game_Map_scrollRight','updateFauxAnimations','layeredTiles','Window_SkillList_includes','snapForBackground','OutlineColorGauge','processDrawIcon','this.paramBase(6)','destroy','%1〘Choice\x20Cancel〙%1','AGI','INOUTCUBIC','IconXParam6','_shakeSpeed','_realScale','Game_Interpreter_PluginCommand','eventsXyNt','IconXParam5','removeChild','checkCacheKey','command122','findSymbol','defaultInputMode','playCursorSound','skillTypes','connected','ColorManager_loadWindowskin','bitmapWidth','loadGameImagesCoreEngine','transform','updateOpen','Scene_Base_terminateAnimationClearBugFix','animationShouldMirror','CTB','HOME','_forcedBattleSys','description','VisuMZ_2_BattleSystemSTB','updateTransform','_mapX','_onError','BuyRect','getControllerInputButtonMatch','_iconIndex','XParamVocab0','CustomParamNames','changeTileset','movePageButtonSideButtonLayout','_timerSprite','down','innerWidth','createTroopNote','setup','StatusRect','shake','NameMenu','MaxDuration','terminate','jsQuickFunc','indexOf','updateSmoothScroll','INOUTQUINT','SkillTypeBgType','IconParam4','_fauxAnimationQueue','targetEvaRate','maxLvGaugeColor1','_currentMap','Game_Battler_initTpbChargeTime','WIN_ICO_00','Scene_Map_createSpriteset','VisuMZ_3_EventChainReact','Game_Action_updateLastTarget','GoldMax','bind','Window_NameInput_refresh','_buyWindow','NON_FRAME','statusParamsWindowRect','createJsQuickFunction','RepositionEnemies130','ColorGaugeBack','_stored_gaugeBackColor','NewGameBoot','bitmap','isGamepadButtonPressed','pictureId','isTouchedInsideFrame','createCustomParameter','playOnceParallelInterpreter','checkScrollBarBitmap','NONCONVERT','statusWindowRect','Scene_Map_shouldAutosave','BattleSystem','drawIcon','MAT','name','textWidth','setAnchor','Game_Actor_levelUp','Param','Window_Base_initialize','endAction','LEFT','setWindowPadding','StatusEquipBgType','Window_Base_drawCharacter','GoldFontSize','catchNormalError','5931940JPCjLd','_battlerName','WIN_OEM_COPY','SLEEP','createContents','loadTileset','IconXParam4','changeClass','drawBackgroundRect','MapOnceParallel','menuShowButton','Duration','QUOTE','setFrame','command355','value','processKeyboardDigitChange','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','gainItem','currentValue','PictureEraseAll','isNumpadPressed','tilesetFlags','ModernControls','platform','_screenX','Linear','calcEasing','ParseEnemyNotetags','_loadingState','split','WIN_OEM_AUTO','activate','playtestQuickLoad','onNameOk','DECIMAL','Game_Event_isCollidedWithEvents','maxHorz','CLOSE_BRACKET','buttonAssistText3','KeyTAB','NUMPAD3','bodyColor','DOWN','gaugeLineHeight','ShowButtons','SwitchToggleRange','_offsetY','DurationPerChat','VariableEvalReference','TitlePicButtons','xScrollLinkedOffset','expRate','down2','TimeProgress','PERCENT','RequireFocus','visible','addChildToBack','Scene_TitleTransition','SystemSetSideView','OpenSpeed','Sprite_StateIcon_loadBitmap','EQUAL','ShowScrollBar','valueOutlineWidth','AudioChangeBgsPitch','_changingClass','KeyUnlisted','Window_Selectable_itemRect','drawSegment','_maxDigits','AnimationPoint','_registerKeyInput','setEasingType','viewport','WIN_OEM_JUMP','tpColor','buttonAssistKey5','Gold','menu','_scaleX','SystemLoadAudio','Game_Action_numRepeats','SellRect','IconSParam2','return\x200','Sprite_Actor_setActorHome','ScaleX','defineProperty','onDatabaseLoaded','key%1','bgsVolume','storeMapData','ExportStrFromAllMaps','EndingID','isLoopHorizontal','allowShiftScrolling','consumeItem','faceWidth','WIN_OEM_PA3','NumberRect','VisuMZ_1_BattleCore','Pixelated','tilesets','VisuMZ_4_UniqueTileEffects','round','Center','drawGauge','_mirror','REC','initialLevel','EditRect','faceHeight','pictures','_texture','_muteSound','_internalTextures','IconSParam3','resetFontSettings','createTileExtendSprites','drawActorLevel','padding','bgm','updateKeyText','DELETE','_buttonAssistWindow','Game_Picture_scaleX','systemColor','maxVert','en-US','isOptionValid','createBackground','KEEP','scaleSprite','NameInputMessage','slice','_windowLayer','ParseStateNotetags','_stored_maxLvGaugeColor1','Scene_MenuBase_mainAreaHeight','isOpening','CategoryRect','_upArrowSprite','goldWindowRect','determineSideButtonLayoutValid','worldTransform','LevelUpFullHp','_downArrowSprite','_tileSprite','evaluate','NEAREST','keyCode','BarThickness','gaugeHeight','SlotRect','start','ParseSkillNotetags','144cEveUm','drawIconBySize','quit','MAX_SAFE_INTEGER','NUM_LOCK','Rate2','_paramPlus','buttonAssistOffset1','Window_NameInput_cursorPageup','CANCEL','checkSubstitute','itemSuccessRate','hpColor','loadSystem','_movementWholeDuration','SystemLoadImages','DEF','createExtendedTileSprite','levelUpRecovery','Color','SParamVocab7','join','IconXParam2','offColor','paramPlus','_clientArea','updateMain','540846nduGaQ','47931440CSQMKq','isActor','_bitmap','GoldRect','stencilFunc','OPEN_PAREN','OUTBOUNCE','IconSParam9','isEventRunning','ListBgType','Window_NameInput_cursorRight','F18','Input_shouldPreventDefault','_windowskin','drawAllParams','F7key','buttonAssistKey2','updatePositionCoreEngineShakeHorz','NumberBgType','active','ShowJS','GoldIcon','Game_Picture_calcEasing','SParamVocab3','Window_Base_destroyContents','Bitmap_strokeRect','loadBitmapCoreEngine','optSideView','updatePositionCoreEngineShakeVert','boxWidth','_actorWindow','Sprite_StateIcon_updateFrame','_pageupButton','onLoad','ActorTPColor','processCursorMove','paramMax','focus','_mapY','createPageButtons','setSideButtonLayout','_margin','stencilOp','updatePictureAntiZoom','toUpperCase','Game_Picture_x','up2','valueOutlineColor','_context','etypeId','destroyed','angle','processDigitChange','itemEva','index','OUTBACK','TargetAngle','MapNameTextCode','exec','drawGameSubtitle','targetBackOpacity','members','INOUTBOUNCE','initMembersCoreEngine','MAXMP','updateScrollBarPosition','buttonAssistText1','_targetOpacity','AutoStretch','F19','currentLevelExp','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','cancel','exportAllMapStrings','ItemMenu','CIRCUMFLEX','backOpacity','ARRAYNUM','WIN_OEM_CLEAR','MultiKeyFmt','BuyBgType','_skillTypeWindow','_displayY','skills','setLastGamepadUsed','hit','PictureID','onload','BattleManager_processEscape','isSideButtonLayout','Opacity','hasEncryptedImages','text','min','requestPointAnimation','isGamepadTriggered','scaleMode','〘Show\x20Text〙\x0a','cursorPagedown','(\x5cd+)([%％])>','number','maxLevel','prototype','battlerHue','Input_update','Window_Selectable_processCursorMove','IconXParam7','buttonAssistKey3','_tile','close','sv_actors','IconIndex','Window_Base_update','RepositionEnemies','INSINE','_stored_expGaugeColor1','ItemBgType','ctGaugeColor2','TGR','([\x5c+\x5c-]\x5cd+)>','Window_Selectable_cursorDown','itemHeight','F21','TPB\x20WAIT','221332eHRVjh','paramchangeTextColor','atypeId','setupCustomRateCoreEngine','TRG','isOpen','$dataMap','exit','Game_BattlerBase_initMembers','enableDigitGrouping','reservePlayTestNewGameCommonEvent','render','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','initRotation','RPGMAKER_VERSION','setViewport','IconXParam8','StatusParamsBgType','battlebacks1','processKeyboardBackspace','isCursorMovable','_inputString','Sprite_Gauge_gaugeRate','DOUBLE_QUOTE','itemLineRect','stypeId','Scene_Battle_createSpriteset','initVisuMZCoreEngine','setHandler','rowSpacing','loadMapData','_storedMapText','DamageColor','setAction','XParamVocab8','Spriteset_Base_isAnimationPlaying','addChild','centerY','win32','ExtractStrFromMap','AllMaps','_pictureCoordinatesMode','_rate','isMaskingEnabled','abs','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Mirror','isTriggered','isPlaying','AudioChangeBgsVolume','numberShowButton','saveViewport','autoRemovalTiming','adjustY','updatePosition','addAnimationSpriteToContainer','itemHitImprovedAccuracy','result','XParamVocab1','retrieveFauxAnimation','targetX','SParamVocab2','height','Scene_MenuBase_mainAreaTop','bgs','<%1\x20%2:[\x20]','_updateGamepadState','_onKeyDown','SCALE_MODES','EncounterRateMinimum','maxCols','adjustBoxSize','processTouchModernControls','updateScene','gameTitle','getInputMultiButtonStrings','strokeRect','targetSpritePosition','font','VisuMZ_1_OptionsCore','maxScrollbar','length','updateBgmParameters','Game_System_initialize','createKeyJS','processMoveCommand','keys','escape','param','setActionState','createMenuButton','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','isAnimationPlaying','Troop%1','setCoreEngineUpdateWindowBg','tpGaugeColor1','default','Skill-%1-%2','_targetOffsetY','buttonAssistKey1','TextFmt','powerDownColor','_slotWindow','xparamFlatBonus','PositionJS','areTileShadowsHidden','registerCommand','scrollDown','parse','stop','_coreEngineShakeStyle','Bitmap_measureTextWidth','GRD','WIN_OEM_FJ_ROYA','Scene_Boot_updateDocumentTitle','Game_BattlerBase_refresh','PreserveNumbers','Subtitle','createPointAnimation','paramFlatJS','BasicParameterFormula','hpGaugeColor2','PLUS','makeFontSmaller','_pictureCoordinatesWindow','horz','process_VisuMZ_CoreEngine_Notetags','faces','home','goto','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','INOUTQUAD','STENCIL_BUFFER_BIT','F24','showIncompleteTilesetError','_offsetX','buttonAssistOffset5','_stored_tpCostColor','command357','isItem','_width','LINEAR','_pointAnimationSprites','Total','WIN_ICO_CLEAR','baseId','filters','mhp','DigitGroupingLocale','crisisColor','REPLACE','process_VisuMZ_CoreEngine_RegExp','helpAreaHeight','ColorExpGauge1','SaveMenu','xparamFlatJS','params','checkSmartEventCollision','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','subjectHitRate','BaseTexture','updateData','_clickHandler','_targetOffsetX','_pictureContainer','ConvertNumberToString','initButtonHidden','STENCIL_TEST','Sprite_Gauge_currentValue','Unnamed','loadIconBitmap','randomInt','option','_smooth','fillAll','IconParam3','Graphics','_screenY','playTestShiftT','setCoreEngineScreenShakeStyle','paramRateJS','DisplayLockY','Scene_Battle_createSpritesetFix','Scene_Map_initialize','SwitchToggleOne','XParamVocab4','SystemSetWindowPadding','format','QoL','onKeyDownKeysF6F7','mainAreaTop','skipBranch','Game_Interpreter_command105','damageColor','Game_Interpreter_command122','_optionsWindow','move','LUK','keyRepeatWait','Scene_Base_createWindowLayer','ItemStyle','CONVERT','updateFrame','makeCoreEngineCommandList','code','X:\x20%1','VisuMZ_2_BattleSystemPTB','onEscapeSuccess','_addSpotTile','hpGaugeColor1','_shakeDuration','Scene_Name_create','button','_scrollBarVert','paramMaxJS','isKeyItem','_subject','version','Scene_Skill_create','startShake','_playtestF7Looping','paramBase','setGuard','drawParamText','_destroyCanvas','5273142RCFNUp','makeFontBigger','cancelShowButton','exp','blt','PictureFilename','CustomParam','iconWidth','createTilemap','ShowDevTools','loadTileBitmap','cursorLeft','reserveCommonEvent','updateAnchor','_spriteset','ACCEPT','_dimmerSprite','_isPlaytest','BACK_QUOTE','TCR','imageSmoothingEnabled','EnableNameInput','setupTileExtendTerrainTags','thickness','wtypeId','SwitchRandomizeRange','_hideTileShadows','isBottomHelpMode','ActorBgType','paramValueByName','Game_Map_scrollLeft','isAutoColorAffected','updateBgsParameters','toLowerCase','Scene_Map_update','SwitchActorText','VIEWPORT','vertical','ATK','Scene_Load','textColor','CNT','Padding','sin','DummyBgType','ItemBackColor2','_stored_hpGaugeColor1','WIN_OEM_PA2','ParseActorNotetags','onlyfilename','resetBattleSystem','VisuMZ_2_BattleSystemETB','charAt','makeEncounterCount','loadTitle1','tileHeight','FontShadows','processCursorHomeEndTrigger','CEV','Basic','paramWidth','BTestAddedQuantity','SplitEscape','2065222NzbErT','KeyItemProtect','Game_Event_start','updateMotion','updateCurrentEvent','tab','EVAL','CallHandlerJS','PRESERVCONVERSION(%1)','DimColor1','SmartEventCollisionPriority','mpCostColor','HELP','Spriteset_Base_initialize','_profileWindow','inputWindowRect','onInputOk','CorrectSkinBleeding','createDigits','ColorTPCost','ForceNoPlayTest','openURL','Window_refreshBack','_lastCommandSymbol','LoadError','applyEasingAnglePlus','random','wholeDuration','processKeyboardDelete','BottomButtons','PositionX','Flat2','openness','maxPictures','PictureRotateBy','clearStencil','MDF','paramFlatBonus','isGameActive','onKeyDown','this.paramBase(7)','StartID','INOUTEXPO','setDisplayPos','overrideMimeType','_pictureName','drawActorIcons','DisplayLockX','_currentBgm','_coreEasingType','_statusEquipWindow','VisuMZ_2_BattleSystemFTB','picture','EVA','paramBaseAboveLevel99','BoxMargin','ColorCrisis','RevertPreserveNumbers','Game_Picture_move','ApplyEasing','_stored_mpGaugeColor1','deathColor','Scene_Battle_createCancelButton','clearZoom','ShowItemBackground','doesNameContainBannedWords','onBattleStart','Upper\x20Left','Speed','alwaysDash','updateFrameCoreEngine','removeAllFauxAnimations','drawBackground','buttons','getColor','GoldOverlap','moveMenuButtonSideButtonLayout','measureTextWidthNoRounding','playBgs','pages','Sprite_Picture_loadBitmap','pageup','missed','isRightInputMode','scale','operation','BlurFilter','sqrt','87408WbaYhH','drawRightArrow','getBattleSystem','_drawTextBody','SELECT','_anglePlus','categoryWindowRect','_onLoad','Rate','MODECHANGE','StatusBgType','clear','_customModified','boxHeight','_sellWindow','updateDashToggle','ExtJS','onerror','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Bitmap_clearRect','applyForcedGameTroopSettingsCoreEngine','ExportString','targetContentsOpacity','Window_StatusBase_drawActorLevel','PositionY','processCursorMoveModernControls','Window_MapName_refresh','Window_Selectable_processTouch','showPicture','Game_Picture_updateRotation','ColorMPGauge2','BgFilename2','ExportCurMapText','getKeyboardInputButtonString','test','_displayedPassageError','_name','playTestShiftR','restore','drawActorSimpleStatus','_pagedownButton','RegExp','ctGaugeColor1','xparamFlat1','DocumentTitleFmt','Scene_Options_create','ImprovedAccuracySystem','AudioChangeBgmPitch','JUNJA','setActorHomeRepositioned','Game_Party_consumeItem','_list','_updateFilterArea','Graphics_printError','advanced','ScreenShake','ARRAYJSON','SLASH','_viewportSize','setLastPluginCommandInterpreter','normal','INOUTQUART','animationNextDelay','Input_clear','CTRL','_drawTextOutline','〘Common\x20Event\x20%1:\x20%2〙\x20Start','_refreshBack','MenuBg','this.paramBase(0)','displayName','TextCodeNicknames','_number','PictureEasingType','INOUTCIRC','TextStr','playCursor','contentsOpacity','NoTileShadows','skillTypeWindowRect','enemies','IconXParam3','UpdatePictureCoordinates','reduce','ColorMaxLvGauge2','_data','isHandled','SETTINGS','dimColor1','_statusWindow','isCollidedWithEvents','scrollLeft','Game_Map_setDisplayPos','getLastUsedGamepadType','DefaultMode','ScreenResolution','Bitmap_drawCircle','hide','WIN_OEM_ATTN','drawNewParam','toLocaleString','tileset','OutlineColorDmg','MenuLayout','setSideView','MEV','processKeyboardHandling','DataManager_setupNewGame','Enable','xparamPlus2','helpAreaTop','_storedStack','isBottomButtonMode','Type','moveCancelButtonSideButtonLayout','Scene_Boot_loadSystemImages','current','dummyWindowRect','CRI','_onceParallelInterpreters','startAutoNewGame','setColorTone','apply','F15','STB','setActorHome','buttonAssistWindowRect','VisuMZ_2_BattleSystemOTB','Game_Picture_angle','updateWaitMode','DigitGroupingDamageSprites','call','ImgLoad','ParseWeaponNotetags','Bitmap_initialize','OTB','_colorCache','ZERO','makeDocumentTitle','constructor','Game_Action_itemEva','vertJS','right','%1%2','_categoryWindow','setSize','TitleCommandList','buttonAssistText2','seek','F16','updateEffekseer','HelpRect','repositionEnemiesByResolution','ColorHPGauge1','subject','BattleManager_invokeCounterAttack','MAXHP','ALTGR','Wait','_duration','IconSParam4','playCancel','ActorRect','isScrollBarVisible','Scene_Map_updateScene','mev','_textPopupWindow','seVolume','MRF','uiAreaHeight','Scene_Unlisted','\x20this.','skillId','Game_Screen_initialize','COMMA','Sprite_Animation_setViewport','cursorUp','pendingColor','commandWindowRows','_baseTexture','MRG','initMembers','sparamPlus','ColorTPGauge1','getCombinedScrollingText','recoverAll','ALWAYS','enableDigitGroupingEx','isPointAnimationPlaying','isSpecialCode','DEFAULT_SHIFT_Y','INSERT','Spriteset_Base_update','Window_Base_createTextState','_targetX','DrawItemBackgroundJS','Finish','drawGameVersion','BACK_SLASH','open','paramRate','addCommand','CustomParamIcons','removeOnceParallelInterpreter','_coreEasing','_battleField','WIN_ICO_HELP','end','CategoryBgType','SCROLL_LOCK','GoldChange','bitmapHeight','_shouldPreventDefault','getColorDataFromPluginParameters','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','PIPE','_effectsContainer','createAnimationSprite','isPreserveTp','match','BlendMode','standardIconWidth','Scene_Equip_create','smallParamFontSize','NUMPAD1','VariableJsBlock','Scene_Menu_create','setValue','%1〘Choice\x20%2〙\x20%3%1','Window_NameInput_cursorUp','sellWindowRect','Scene_Map_createSpritesetFix','meVolume','data/','initCoreEngineScreenShake','VOLUME_DOWN','ExportStrFromAllTroops','GroupDigits','ColorCTGauge1','StatusParamsRect','Mute','FDR','CAPSLOCK','sv_enemies','markCoreEngineModified','IDs','DigitGroupingGaugeSprites','setSkill','EXECUTE','refreshSpritesetForExtendedTiles','isPlaytest','_hp','createSpriteset','playLoad','Game_Map_scrollDown','getPointAnimationLayer','Spriteset_Battle_createEnemies','Scene_MenuBase_createBackground','URL','Armor-%1-%2','anchorCoreEasing','processFauxAnimationRequests','create','_sideButtonLayout','END','isGamepadAxisMoved','allTiles','canAttack','selectLast','_tpbChargeTime','clearCachedKeys','smoothSelect','_timeDuration','_addShadow','QUESTION_MARK','isAnimationOffsetXMirrored','XParamVocab5','paramPlusJS','Window_NameInput_cursorDown','battleSystem','_playTestFastMode','allIcons','center','drawGameTitle','getLastPluginCommandInterpreter','SideView','setupScrollBarBitmap','CancelText','PAUSE','altKey','Symbol','addEventListener','createPointAnimationQueue','EXSEL','terms','_displayX','process_VisuMZ_CoreEngine_CustomParameters','performMiss','F22','itemBackColor1','_createInternalTextures','Renderer','_logWindow','applyEasing','framesPerChar','playOk','BattleManager_update','Y:\x20%1','buttonAssistOffset4','gaugeRate','CommandList','_origin','IconParam2','ItemRect','CreateBattleSystemID','this.paramBase(5)','ConvertParams','context','initBasic','commandWindowRect','DigitGroupingExText','createPointAnimationTargets','Game_Map_scrollUp','_height','setHome','volume','createBuffer','_fauxAnimationSprites','remove','Name','ConvertToBase','Game_Picture_initBasic','contentsBack','Game_Picture_updateMove','eva','select','isFullDocumentTitle','globalAlpha','cursorDown','Game_Action_itemHit','updateScrollBars','target','AMPERSAND','isSceneBattle','Smooth','_action','MvAnimationRate','blockWidth','Input_updateGamepadState','alignBottom','setEvent','GoldBgType','titleCommandWindow','DefaultStyle','6WKhVdz','windowPadding','removeFauxAnimation','moveRelativeToResolutionChange','EnableMasking','helpAreaTopSideButtonLayout','_active','max','updatePlayTestF7','catchUnknownError','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','getCustomBackgroundSettings','\x0a\x0a\x0a\x0a\x0a','targetScaleY','Scene_Map_createSpriteset_detach','text%1','Game_Troop_setup','updateBackOpacity','title','OUTCIRC','_stored_crisisColor','map','VOLUME_UP','updateOrigin','pagedownShowButton','gaugeBackColor','_lastGamepad','renderNoMask','buttonAssistText4','Window_Gold_refresh','TPB\x20ACTIVE','buttonAreaHeight','Scene_GameEnd_createBackground','expGaugeColor2','centerCameraCheckData','blendFunc','isRepeated','reserveNewGameCommonEvent','buttonAssistText%1','_destroyInternalTextures','isOpenAndActive','KeyboardInput','Keyboard','Scene_Map_updateMainMultiply','keyboard','NUMPAD4','isNwjs','isMapScrollLinked','_stored_pendingColor','Sprite_Animation_processSoundTimings','_centerElement','〘Common\x20Event\x20%1:\x20%2〙\x20End','OptionsMenu','ETB','ShiftR_Toggle','0.00','OUTEXPO','ATTN','getInputButtonString','checkCoreEngineDisplayCenter','RIGHT','changeTextColor','DETACH_PICTURE_CONTAINER','IconSParam5','_backgroundSprite','RepositionActors','_closing','BTestItems','buttonAssistWindowButtonRect','CommandRect'];_0x1a61=function(){return _0x22667f;};return _0x1a61();}