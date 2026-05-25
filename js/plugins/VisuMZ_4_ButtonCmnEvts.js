//=============================================================================
// VisuStella MZ - Button Common Events
// VisuMZ_4_ButtonCmnEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ButtonCmnEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ButtonCommonEvents = VisuMZ.ButtonCommonEvents || {};
VisuMZ.ButtonCommonEvents.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.11] [ButtonCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Button_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, there's only a few keys on your keyboard that perform any kind
 * of action when pressed on the map screen. This plugin allows you to bind
 * Common Events to various other keys to expand the keyboard's functionality.
 * Plugin Commands can be used during the middle of a playthrough to change up
 * which Common Events are bound to each key as well, allowing you, the game
 * dev, to have full control over which keys can be used during the map screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to the number keys, alphabet keys,
 *   symbols, numpad, and more.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from keys to remove any bindings.
 * * Show visible buttons on the screen to indicate which buttons can be
 *   pressed on the keyboard (or with the mouse on the screen).
 * * Apply icons to the visible buttons and change them over time.
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
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * alters keystrokes or makes use of them through a different manner. If you
 * are using another plugin that does something with keystrokes on the map
 * screen, the likelihood of clashing can occur if these plugins utilize the
 * same keystrokes and we will not be held accountable for that as it is
 * something within your power to change by simply picking different keys.
 * 
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * As of Options Core's version 1.26 update, which allows for key rebindings.
 * If key rebindings are enabled, then the A through Z and symbol keys will be
 * disabled from having common events being able to be bound to them in order
 * to ensure the key bindings will follow through.
 * 
 * The number keys for 1 through 9/0 can still bind common events to them. In
 * return, these keys CANNOT be rebinded in the Options Core scene for both the
 * keyboard and gamepad options. Keep this in mind if you wish to use Button
 * Common Events and Options Core with the rebinding option together in the
 * same RPG Maker MZ project.
 * 
 * ---
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the keys that you can
 * bind to a Common Event. If that number is something other than 0, then the
 * number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 *
 * You may also notice that some of the keys have in parenthesis a word like
 * (OK) or (Cancel) next to them. What this means is that those keys already
 * have a function assigned to them by the game. If you assign a Common Event
 * to these keys and the 'Forbid Default Bound Keys?' Plugin Parameter is set
 * to 'false', then the native function of the key will be removed in favor of
 * the Common Event you've assigned.
 *
 * Here is a list of the keys that already have a command assigned:
 *
 * Key - What they're assigned to
 *   - Q         - Assigned to PageUp
 *   - W         - Assigned to PageDown
 *   - Shift     - Assigned to Dash
 *   - Z         - Assigned to OK
 *   - X         - Assigned to Cancel
 *   - Space     - Assigned to OK
 *   - Left      - Assigned to moving left
 *   - Up        - Assigned to moving up
 *   - Right     - Assigned to moving right
 *   - Down      - Assigned to moving down
 *   - Insert    - Assigned to Cancel
 *   - Page Up   - Assigned to PageUp
 *   - Page Down - Assigned to PageDown
 *   - Numpad 0  - Assigned to Cancel
 *   - Numpad 2  - Assigned to moving down
 *   - Numpad 4  - Assigned to moving left
 *   - Numpad 6  - Assigned to moving right
 *   - Numpad 8  - Assigned to moving up
 *
 * Once again, if you assign Common Events to these keys, the Common Event will
 * removing the binding the key had natively. However, this will only apply
 * while the player is in the field map and if the 'Forbid Default Bound Keys?'
 * Plugin Parameter is set to 'false'. Being inside of a menu or battle system
 * will restore the previously native functions.
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
 * === Assign Button-Related Notetags ===
 * 
 * ---
 *
 * <Assign Button Common Event: id>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Makes this object selectable in the Item scene or Skill scene and have it
 *   become assignable to a button slot.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'id' with a number representing the ID of the Common Event you
 *   wish to assign to a button.
 * - This needs to be used together with the <Assign Button Slots: x, x, x>
 *   notetag in order to have any effect.
 *
 * ---
 *
 * <Assign Button Slot: x>
 * <Assign Button Slot: x, x, x>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Lists the keyboard keys that can be assigned a Common Event when pressed.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'x' with a number or letter representing the button you wish to
 *   assign a Common Event to.
 * - This needs to be used together with the <Assign Button Common Event: id>
 *   notetag in order to have any effect.
 * - The choices that become available will be listed in the order found in
 *   this notetag.
 * - Forbidden, non-existent, and non-valid keys will be filtered out of this
 *   list and cannot be assigned a Common Event.
 * 
 *   Example:
 * 
 *   <Assign Button Slot: A, S, D, F>
 *   <Assign Button Slot: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0>
 *
 * ---
 * 
 * <Assign Button Show Cost>
 * 
 * - Used for: Skill Notetags
 * - If a skill can be assigned, show the cost of the skill if it has one.
 * - Using this assigned button will not pay the cost. If you want to the pay
 *   the cost, use the following notetag.
 * 
 * ---
 * 
 * <Assign Button Pay Cost>
 * 
 * - Used for: Skill Notetags
 * - If a skill can be assigned, show the cost of the skill if it has one and
 *   pays the cost when pressed and activated.
 *   - If the cost cannot be paid, due to lacking resources or other reasons,
 *     then the button will be disabled.
 * - The actor that will pay the cost will be the actor that the button was
 *   assigned from in the first place.
 *   - As such, if the actor is not in the party, this will also be disabled.
 * 
 * ---
 * 
 * <Assign Button Show Quantity>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - If an item, weapon, or armor can be assigned, show the quantity of the
 *   party has of that item, weapon, or armor.
 * - Using this assigned button will not consume the item, weapon, or armor.
 *   If you want to consume the quantity, use the following notetag.
 * 
 * ---
 * 
 * <Assign Button Consume Quantity>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - If an item, weapon, or armor can be assigned, show the quantity of the
 *   party has of that item, weapon, or armor. This will also consume one of
 *   the item, weapon, or armor when pressed.
 *   - This also applies to Key Items. If you don't want Key Items to be
 *     consumed but have their quantity displayed, use the previous notetag.
 *   - If the cost cannot be paid, due to lacking resources or other reasons,
 *     then the button will be disabled.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Change Button Common Event
 * - Change the Common Event bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific key(s).
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 *
 * ---
 * 
 * System: Change Visibility
 * - Determines whether or not buttons are shown on screen.
 * 
 *   Visible?
 *   - Show or hide the visible Button Common Events on the screen?
 * 
 * ---
 *
 * System: Clear All Button Common Events
 * - Clears Common Events from all keys.
 *
 * ---
 *
 * System: Clear Button Common Event
 * - Clears any Common Events bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to clear.
 *
 * ---
 *
 * System: Clear Common Event ID(s)
 * - Clears any keys with the marked Common Event ID(s).
 * 
 *   Common Event ID(s):
 *   - Clears any keys with the marked Common Event ID(s).
 *
 * ---
 * 
 * System: Run Stored Button Common Event
 * - Run the Common Event stored on a specific key.
 * 
 *   Target Key:
 *   - Run the Common Event stored in this key.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the Plugin Parameters for this plugin. They manage all the key
 * bindings and which Common Events are linked by default to which keys. These
 * links are not permanent as they can be changed/cleared with Plugin Commands.
 *
 * ---
 *
 * Restriction
 * 
 *   Forbid Default Bound Keys?:
 *   - Forbid already bound input keys?
 *   - Allowing them may cause clashes.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show On Screen?:
 *   - Show buttons on screen by default?
 * 
 *   Change Tone on Hover?:
 *   - Change the tone of the button on hover?
 * 
 *   Hover Tone:
 *   - Tone settings upon hovering.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Button Width:
 *   - The width of the visible button on screen.
 * 
 *   Button Height:
 *   - The height of the visible button on screen.
 * 
 *   Picture Filename:
 *   - Picture used as a button background.
 *   - If left empty, ignore drawing a picture.
 * 
 *   Undeclared Icons:
 *   - If a Button Common Event doesn't have an assigned icon,
 *     use one of these instead.
 * 
 *   JS: Draw Data:
 *   - JavaScript code that determines how to draw the visible button.
 *
 * ---
 * 
 * Button Positions
 * 
 *   JS: Bottom Point:
 *   JS: Above Point:
 *   JS: Left Point:
 *   JS: Right Point:
 *   - The X and Y coordinates for where the specific side buttons start.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Assignment Settings
 * ============================================================================
 *
 * The Assignment Settings Plugin Parameters apply to whenever you use the
 * Assign Button-Related Notetags in-game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Instructions:
 *   - The instruction text that appears when assigning a Common Event to
 *     a button.
 *
 * ---
 *
 * Window
 * 
 *   Key Align:
 *   - Text alignment for the button assignment window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the button assignment window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cost Settings
 * ============================================================================
 *
 * Adjust the settings involving button press costs.
 *
 * ---
 *
 * Item Cost Offsets:
 * 
 *   Offset X:
 *   - Offsets the cost x position.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offsets the cost y position.
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Skill Cost Offsets:
 * 
 *   Offset X:
 *   - Offsets the cost x position.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offsets the cost y position.
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Misc Settings:
 * 
 *   Disabled Opacity:
 *   - Opacity used for buttons that are unable to meet cost requirements.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Key Settings
 * ============================================================================
 *
 * The Key Settings allow you to adjust the Common Event you want to bind to
 * each keyboard key along with whether or not you want the said key to appear
 * visibly on the screen.
 *
 * ---
 *
 * Key Settings
 * 
 *   Common Event ID:
 *   - The default common event tied to this key.
 *   - Leave it at 0 for no common event.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show Button?:
 *   - Show the button visibly on the screen?
 * 
 *   Requires Bind?:
 *   - If the button is shown, does it require a Common Event to be shown?
 * 
 *   Button Label:
 *   - What text do you want to display as the button label?
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 * 
 *   JS: Position:
 *   - The X and Y coordinates for where this button is positioned.
 *
 * ---
 * 
 * Custom Settings
 * 
 *   Custom Width:
 *   Custom Height:
 *   - Change the width/height of this button specifically.
 *   - Use 0 for the default size.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.11: August 14, 2025
 * * Bug Fixes!
 * ** When "Forbid Default Bound Keys" is enabled, walking over below/above
 *    priority events with Player Touch or Event Touch can enable them over and
 *    over again if they do not have any kind of stop measure until the player
 *    fully steps on the tile. This should no longer happen. Fix made by Arisu.
 * 
 * Version 1.10: May 15, 2025
 * * Bug Fixes!
 * ** When a common event is launched while the player is moving onto a below
 *    or above priority event with Player Touch or Event Touch, the event
 *    action would be skipped. This should no longer happen. Fix made by Arisu.
 * 
 * Version 1.09: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with Options Core's new key rebindings. This will
 *    impose some restrictions if you allow for key rebindings.
 * *** As of Options Core's version 1.26 update, which allows for key
 *     rebindings. If key rebindings are enabled, then the A through Z and
 *     symbol keys will be disabled from having common events being able to be
 *     bound to them in order to ensure the key bindings will follow through.
 * *** The number keys for 1 through 9/0 can still bind common events to them.
 *     In return, these keys CANNOT be rebinded in the Options Core scene for
 *     both the keyboard and gamepad options. Keep this in mind if you wish to
 *     use Button Common Events and Options Core with the rebinding option
 *     together in the same RPG Maker MZ project.
 * 
 * Version 1.08: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where certain buttons would not register properly. Fix made
 *    by Arisu.
 * 
 * Version 1.07: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon mouse click. Fix made by Arisu.
 * 
 * Version 1.06: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** Skill: <Assign Button Show Cost>
 * *** Skill: <Assign Button Pay Cost>
 * *** Items, Weapon, Armor: <Assign Button Show Quantity>
 * *** Items, Weapon, Armor: <Assign Button Consume Quantity>
 * **** Read the helpfile for more information.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Cost Settings
 * **** Adjust how costs are displayed for the plugin.
 * *** Parameters > Key Settings > Custom Settings > Custom Width
 * *** Parameters > Key Settings > Custom Settings > Custom Height
 * **** Allows buttons to have custom width and height.
 * 
 * Version 1.05: September 1, 2022
 * * Bug Fixes!
 * ** System: Run Stored Button Common Event plugin command should now be
 *    working properly. Fix made by Irina.
 * 
 * Version 1.04: January 20, 2022
 * * Feature Update!
 * ** Button Common Event key presses on top of below priority touch events
 *    will only be forbidden in the context of a common event assigned to the
 *    usual OK buttons instead. Update made by Arisu.
 * 
 * Version 1.03: February 12, 2021
 * * Bug Fixes!
 * ** Pressing a Button Common Event key while stepping onto a below priority
 *    touch event will no longer give priority to the Button Common Event. Fix
 *    made by Arisu.
 * 
 * Version 1.02: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When pressing Button Common Events with the keyboard, any visible buttons
 *    on the screen will also flash their color tone briefly to show that they
 *    are being pressed. This is only if the Hover Tone Plugin Parameter is
 *    enabled. Update made by Yanfly.
 * * New Features!
 * ** New Notetags Added by Yanfly!
 * *** <Assign Button Common Event: id>
 * *** <Assign Button Slot: x, x, x>
 * ** New Plugin Command added by Yanfly!
 * *** System: Clear Common Event ID(s)
 * **** Clears any keys with the marked Common Event ID(s).
 * *** System: Run Stored Button Common Event
 * **** Run the Common Event stored on a specific key.
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Assignment Settings
 * 
 * Version 1.01: December 4, 2020
 * * Feature Update!
 * ** Plugin Command "System: Change Button Common Event" can now use code for
 *    icons. You can insert $gameVariables.value(50) in it and it will use
 *    whichever number is stored inside it as an icon. Update made by Irina.
 *
 * Version 1.00: August 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeButtonCommonEvent
 * @text System: Change Button Common Event
 * @desc Change the Common Event bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to change.
 * @default []
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific key(s).
 * @default 0
 *
 * @arg Icon:eval
 * @text Button Icon
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ButtonCommonEventsVisibility
 * @text System: Change Visibility
 * @desc Determines whether or not buttons are shown on screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the visible Button Common Events on the screen?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllButtonCommonEvents
 * @text System: Clear All Button Common Events
 * @desc Clears Common Events from all keys.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEvent
 * @text System: Clear Button Common Event
 * @desc Clears any Common Events bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to clear.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEventID
 * @text System: Clear Common Event ID(s)
 * @desc Clears any keys with the marked Common Event ID(s).
 *
 * @arg CommonEventID:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Clears any keys with the marked Common Event ID(s).
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RunButtonCommonEvent
 * @text System: Run Stored Button Common Event
 * @desc Run the Common Event stored on a specific key.
 *
 * @arg Key:str
 * @text Target Key
 * @type combo
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Run the Common Event stored in this key.
 * @default 1
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
 * @param ButtonCommonEvents
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
 * @desc Adjust the general settings for this plugin.
 * @default {"ForbidInputKeys:eval":"true","Buttons":"","ShowButtonsOnScreen:eval":"true","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","ButtonWidth:num":"60","ButtonHeight:num":"60","ButtonFilename:str":"","IconsUsed:arraynum":"[\"160\",\"161\",\"162\",\"163\",\"164\",\"165\"]","DrawJS:func":"\"// Declare Constants\\nconst w = this.width;\\nconst h = this.height;\\n\\n// Draw Background\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\\n\\n// Draw Picture\\nif (this.pictureBitmap()) {\\n    const picBitmap = this.pictureBitmap();\\n    const pw = picBitmap.width;\\n    const ph = picBitmap.height;\\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\\n}\\n\\n// Draw Icon\\nconst iconIndex = this.buttonIcon();\\nconst iconBitmap = ImageManager.loadSystem(\\\"IconSet\\\");\\nconst iw = ImageManager.iconWidth;\\nconst ih = ImageManager.iconHeight;\\nconst ix = (iconIndex % 16) * iw;\\nconst iy = Math.floor(iconIndex / 16) * ih;\\nconst jw = Math.floor(this.width / iw) * iw;\\nconst jh = Math.floor(this.height / ih) * ih;\\nconst jx = Math.floor((this.width - jw) / 2);\\nconst jy = Math.floor((this.height - jh) / 2);\\nthis.bitmap._context.imageSmoothingEnabled = false;\\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\\nthis.bitmap._context.imageSmoothingEnabled = true;\\n\\n// Draw Button Label\\nconst text = this.buttonLabel();\\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');\"","Positions":"","BottomPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\\nlet y = container.height - buttonHeight;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","AbovePointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\\nlet y = container.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","LeftPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","RightPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.width;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param Assign:struct
 * @text Assignment Settings
 * @type struct<Assign>
 * @desc Adjust the assignment settings for this plugin.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Cost:struct
 * @text Cost Settings
 * @type struct<Cost>
 * @desc Adjust the settings involving button press costs.
 * @default {"ItemOffsets":"","ItemOffsetX:num":"+0","ItemOffsetY:num":"+0","SkillOffsets":"","SkillOffsetX:num":"+0","SkillOffsetY:num":"+0","Misc":"","DisabledOpacity:num":"160"}
 *
 * @param NumberKeys
 * @text Number Keys
 *
 * @param KeyCode49:struct
 * @text Key: 1
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 0;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode50:struct
 * @text Key: 2
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode51:struct
 * @text Key: 3
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 2;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode52:struct
 * @text Key: 4
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 3;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode53:struct
 * @text Key: 5
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 4;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode54:struct
 * @text Key: 6
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 5;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode55:struct
 * @text Key: 7
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 6;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode56:struct
 * @text Key: 8
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 7;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode57:struct
 * @text Key: 9
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 8;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode48:struct
 * @text Key: 0
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 9;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param LetterKeys
 * @text Letter Keys
 *
 * @param KeyCode65:struct
 * @text Key: A
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"A","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode66:struct
 * @text Key: B
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"B","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode67:struct
 * @text Key: C
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"C","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode68:struct
 * @text Key: D
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"D","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode69:struct
 * @text Key: E
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"E","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode70:struct
 * @text Key: F
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"F","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode71:struct
 * @text Key: G
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"G","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode72:struct
 * @text Key: H
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"H","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode73:struct
 * @text Key: I
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"I","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode74:struct
 * @text Key: J
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"J","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode75:struct
 * @text Key: K
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"K","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode76:struct
 * @text Key: L
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"L","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode77:struct
 * @text Key: M
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"M","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode78:struct
 * @text Key: N
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"N","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode79:struct
 * @text Key: O
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"O","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode80:struct
 * @text Key: P
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"P","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode81:struct
 * @text Key: Q (PgUp)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Q","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode82:struct
 * @text Key: R
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"R","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode83:struct
 * @text Key: S
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"S","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode84:struct
 * @text Key: T
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"T","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode85:struct
 * @text Key: U
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"U","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode86:struct
 * @text Key: V
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"V","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode87:struct
 * @text Key: W (PgDn)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"W","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode88:struct
 * @text Key: X (Cancel)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"X","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode89:struct
 * @text Key: Y
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Y","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode90:struct
 * @text Key: Z (OK)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Z","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param SymbolKeys
 * @text Symbol Keys
 *
 * @param KeyCode192:struct
 * @text Key: ` ~
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"~","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x - buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode189:struct
 * @text Key: - _
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 10;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode187:struct
 * @text Key: = +
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 11;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode219:struct
 * @text Key: [ {
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"[","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode221:struct
 * @text Key: ] }
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"]","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 11;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode220:struct
 * @text Key: \ |
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\\","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 12;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode186:struct
 * @text Key: ; :
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":";","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode222:struct
 * @text Key: ' "
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\"","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode188:struct
 * @text Key: , <
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode190:struct
 * @text Key: . >
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode191:struct
 * @text Key: / ?
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"?","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param MiscKeys
 * @text Misc Keys
 *
 * @param KeyCode32:struct
 * @text Key: Space (OK)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Space","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode37:struct
 * @text Key: Left (Left)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 3;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode38:struct
 * @text Key: Up (Up)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"^","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode39:struct
 * @text Key: Right (Right)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">>","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 1;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode40:struct
 * @text Key: Down (Down)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"v","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode45:struct
 * @text Key: Insert
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Ins","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode46:struct
 * @text Key: Delete
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Del","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode36:struct
 * @text Key: Home
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Home","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode35:struct
 * @text Key: End
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"End","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode33:struct
 * @text Key: Page Up (PgUp)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgUp","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode34:struct
 * @text Key: Page Down (PgDn)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgDn","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param NumPadKeys
 * @text NumPad Keys
 *
 * @param KeyCode96:struct
 * @text Key: NumPad 0 (Cancel)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode97:struct
 * @text Key: NumPad 1
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode98:struct
 * @text Key: NumPad 2 (Down)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode99:struct
 * @text Key: NumPad 3
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode100:struct
 * @text Key: NumPad 4 (Left)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode101:struct
 * @text Key: NumPad 5
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode102:struct
 * @text Key: NumPad 6 (Right)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode103:struct
 * @text Key: NumPad 7
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode104:struct
 * @text Key: NumPad 8 (Up)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode105:struct
 * @text Key: NumPad 9
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode110:struct
 * @text Key: NumPad .
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":".","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode107:struct
 * @text Key: NumPad +
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode109:struct
 * @text Key: NumPad -
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode106:struct
 * @text Key: NumPad *
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"*","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode111:struct
 * @text Key: NumPad /
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"/","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
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
 * @param ForbidInputKeys:eval
 * @text Forbid Default Keys?
 * @parent Forbidden
 * @type boolean
 * @on Forbid
 * @off Allow
 * @desc Forbid already bound input keys?
 * Allowing them may cause clashes.
 * @default true
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButtonsOnScreen:eval
 * @text Show On Screen?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show buttons on screen by default?
 * @default true
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Buttons
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the button on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param ButtonWidth:num
 * @text Button Width
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The width of the visible button on screen.
 * @default 80
 *
 * @param ButtonHeight:num
 * @text Button Height
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The height of the visible button on screen.
 * @default 80
 *
 * @param ButtonFilename:str
 * @text Picture Filename
 * @parent Buttons
 * @type file
 * @dir img/pictures/
 * @desc Picture used as a button background.
 * If left empty, ignore drawing a picture.
 * @default 
 *
 * @param IconsUsed:arraynum
 * @text Undeclared Icons
 * @parent Buttons
 * @type string[]
 * @desc If a Button Common Event doesn't have an assigned icon, use one of these instead.
 * @default ["160","161","162","163","164","165"]
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @parent Buttons
 * @type note
 * @desc JavaScript code that determines how to draw the visible button.
 * @default "// Declare Constants\nconst w = this.width;\nconst h = this.height;\n\n// Draw Background\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\n\n// Draw Picture\nif (this.pictureBitmap()) {\n    const picBitmap = this.pictureBitmap();\n    const pw = picBitmap.width;\n    const ph = picBitmap.height;\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\n}\n\n// Draw Icon\nconst iconIndex = this.buttonIcon();\nconst iconBitmap = ImageManager.loadSystem(\"IconSet\");\nconst iw = ImageManager.iconWidth;\nconst ih = ImageManager.iconHeight;\nconst ix = (iconIndex % 16) * iw;\nconst iy = Math.floor(iconIndex / 16) * ih;\nconst jw = Math.floor(this.width / iw) * iw;\nconst jh = Math.floor(this.height / ih) * ih;\nconst jx = Math.floor((this.width - jw) / 2);\nconst jy = Math.floor((this.height - jh) / 2);\nthis.bitmap._context.imageSmoothingEnabled = false;\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\nthis.bitmap._context.imageSmoothingEnabled = true;\n\n// Draw Button Label\nconst text = this.buttonLabel();\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');"
 * 
 * @param Positions
 * @text Button Positions
 *
 * @param BottomPointJS:func
 * @text JS: Bottom Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the bottom buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\nlet y = container.height - buttonHeight;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param AbovePointJS:func
 * @text JS: Above Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the upper buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\nlet y = container.y;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param LeftPointJS:func
 * @text JS: Left Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the left-side buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.x;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param RightPointJS:func
 * @text JS: Right Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the right-side buttons end.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.width;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Assign Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Assign:
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param Instruction:str
 * @text Instructions
 * @parent Vocab
 * @desc The instruction text that appears when assigning a Common Event to a button.
 * @default Assign to which button slot?
 * 
 * @param Window
 *
 * @param AssignWindow_KeyAlign:str
 * @text Key Align
 * @parent Window
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the button assignment window?
 * @default center
 *
 * @param AssignWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window
 * @type note
 * @desc Code used to determine the dimensions for the button assignment window.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param ItemOffsets
 * @text Item Cost Offsets
 *
 * @param ItemOffsetX:num
 * @text Offset X
 * @parent ItemOffsets
 * @desc Offsets the cost x position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param ItemOffsetY:num
 * @text Offset Y
 * @parent ItemOffsets
 * @desc Offsets the cost y position.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param SkillOffsets
 * @text Skill Cost Offsets
 *
 * @param SkillOffsetX:num
 * @text Offset X
 * @parent SkillOffsets
 * @desc Offsets the cost x position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param SkillOffsetY:num
 * @text Offset Y
 * @parent SkillOffsets
 * @desc Offsets the cost y position.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Misc
 * @text Misc Settings
 *
 * @param DisabledOpacity:num
 * @text Disabled Opacity
 * @parent Misc
 * @desc Opacity used for buttons that are unable to meet cost requirements.
 * @default 160
 *
 */
/* ----------------------------------------------------------------------------
 * Key Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeySettings:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The default common event tied to this key.
 * Leave it at 0 for no common event.
 * @default 0
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButton:eval
 * @text Show Button?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the button visibly on the screen?
 * @default false
 *
 * @param ShowOnlyIfCePresent:eval
 * @text Requires Bind?
 * @parent ShowButton:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If the button is shown, does it require a Common Event to be shown?
 * @default true
 *
 * @param ButtonText:str
 * @text Button Label
 * @parent Buttons
 * @desc What text do you want to display as the button label?
 * @default Untitled
 *
 * @param ButtonIcon:num
 * @text Button Icon
 * @parent Buttons
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @param PositionJS:func
 * @text JS: Position
 * @parent Buttons
 * @type note
 * @desc The X and Y coordinates for where this button is positioned.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\nconst bottomPoint = this.bottomPoint();\nconst abovePoint = this.abovePoint();\nconst leftPoint = this.leftPoint();\nconst rightPoint = this.rightPoint();\n\n// Calculate Coordinates\nlet x = 0;\nlet y = 0;\n\n// Return Coordinates\nreturn new Point(x, y);"
 * 
 * @param Custom
 * @text Custom Settings
 *
 * @param CustomWidth:num
 * @text Custom Width
 * @parent Custom
 * @desc Change the width of this button specifically.
 * Use 0 for the default size.
 * @default 0
 *
 * @param CustomHeight:num
 * @text Custom Height
 * @parent Custom
 * @desc Change the height of this button specifically.
 * Use 0 for the default size.
 * @default 0
 *
 */
//=============================================================================

function _0x4156(_0x147e45,_0x100ddf){const _0x5348d1=_0x5348();return _0x4156=function(_0x41562c,_0x2db27b){_0x41562c=_0x41562c-0x185;let _0x9d6980=_0x5348d1[_0x41562c];return _0x9d6980;},_0x4156(_0x147e45,_0x100ddf);}const _0x2260cd=_0x4156;(function(_0x3ed343,_0x2d14b4){const _0x478fe0=_0x4156,_0x25e34a=_0x3ed343();while(!![]){try{const _0x37e78e=parseInt(_0x478fe0(0x1a5))/0x1*(parseInt(_0x478fe0(0x2af))/0x2)+parseInt(_0x478fe0(0x19a))/0x3*(-parseInt(_0x478fe0(0x2c1))/0x4)+-parseInt(_0x478fe0(0x191))/0x5*(parseInt(_0x478fe0(0x2e6))/0x6)+-parseInt(_0x478fe0(0x1b2))/0x7*(-parseInt(_0x478fe0(0x2b4))/0x8)+parseInt(_0x478fe0(0x2d2))/0x9+-parseInt(_0x478fe0(0x303))/0xa+parseInt(_0x478fe0(0x311))/0xb;if(_0x37e78e===_0x2d14b4)break;else _0x25e34a['push'](_0x25e34a['shift']());}catch(_0x158016){_0x25e34a['push'](_0x25e34a['shift']());}}}(_0x5348,0xe725c));var label=_0x2260cd(0x2a1),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x18bec5){const _0x22aee4=_0x2260cd;return _0x18bec5[_0x22aee4(0x1a6)]&&_0x18bec5[_0x22aee4(0x272)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x2260cd(0x1b3)]||{},VisuMZ[_0x2260cd(0x2ca)]=function(_0x3eff84,_0x3b0b4d){const _0x22251b=_0x2260cd;for(const _0x464c64 in _0x3b0b4d){if(_0x464c64['match'](/(.*):(.*)/i)){const _0x32bfa2=String(RegExp['$1']),_0x52d977=String(RegExp['$2'])[_0x22251b(0x31a)]()[_0x22251b(0x210)]();let _0x3c04e5,_0x53e7f1,_0x1f0a85;switch(_0x52d977){case _0x22251b(0x277):_0x3c04e5=_0x3b0b4d[_0x464c64]!==''?Number(_0x3b0b4d[_0x464c64]):0x0;break;case _0x22251b(0x24f):_0x53e7f1=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):[],_0x3c04e5=_0x53e7f1[_0x22251b(0x22f)](_0x1b41e8=>Number(_0x1b41e8));break;case _0x22251b(0x18f):_0x3c04e5=_0x3b0b4d[_0x464c64]!==''?eval(_0x3b0b4d[_0x464c64]):null;break;case _0x22251b(0x1f0):_0x53e7f1=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):[],_0x3c04e5=_0x53e7f1[_0x22251b(0x22f)](_0x40285c=>eval(_0x40285c));break;case'JSON':_0x3c04e5=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):'';break;case _0x22251b(0x26b):_0x53e7f1=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):[],_0x3c04e5=_0x53e7f1[_0x22251b(0x22f)](_0x393f65=>JSON['parse'](_0x393f65));break;case _0x22251b(0x30a):_0x3c04e5=_0x3b0b4d[_0x464c64]!==''?new Function(JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64])):new Function(_0x22251b(0x2d5));break;case _0x22251b(0x1d6):_0x53e7f1=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):[],_0x3c04e5=_0x53e7f1[_0x22251b(0x22f)](_0x1b1043=>new Function(JSON[_0x22251b(0x29a)](_0x1b1043)));break;case'STR':_0x3c04e5=_0x3b0b4d[_0x464c64]!==''?String(_0x3b0b4d[_0x464c64]):'';break;case'ARRAYSTR':_0x53e7f1=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):[],_0x3c04e5=_0x53e7f1[_0x22251b(0x22f)](_0x297b86=>String(_0x297b86));break;case'STRUCT':_0x1f0a85=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):{},_0x3c04e5=VisuMZ[_0x22251b(0x2ca)]({},_0x1f0a85);break;case _0x22251b(0x22e):_0x53e7f1=_0x3b0b4d[_0x464c64]!==''?JSON[_0x22251b(0x29a)](_0x3b0b4d[_0x464c64]):[],_0x3c04e5=_0x53e7f1['map'](_0x3ba43e=>VisuMZ['ConvertParams']({},JSON[_0x22251b(0x29a)](_0x3ba43e)));break;default:continue;}_0x3eff84[_0x32bfa2]=_0x3c04e5;}}return _0x3eff84;},(_0x3c9983=>{const _0x4a0e73=_0x2260cd,_0x190224=_0x3c9983[_0x4a0e73(0x2a8)];for(const _0x1f0506 of dependencies){if(!Imported[_0x1f0506]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4a0e73(0x306)](_0x190224,_0x1f0506)),SceneManager[_0x4a0e73(0x24e)]();break;}}const _0x328a22=_0x3c9983[_0x4a0e73(0x272)];if(_0x328a22[_0x4a0e73(0x25c)](/\[Version[ ](.*?)\]/i)){const _0x29851e=Number(RegExp['$1']);_0x29851e!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4a0e73(0x306)](_0x190224,_0x29851e)),SceneManager[_0x4a0e73(0x24e)]());}if(_0x328a22[_0x4a0e73(0x25c)](/\[Tier[ ](\d+)\]/i)){const _0x4da2b6=Number(RegExp['$1']);_0x4da2b6<tier?(alert(_0x4a0e73(0x196)[_0x4a0e73(0x306)](_0x190224,_0x4da2b6,tier)),SceneManager[_0x4a0e73(0x24e)]()):tier=Math[_0x4a0e73(0x23f)](_0x4da2b6,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x4a0e73(0x1b3)],_0x3c9983[_0x4a0e73(0x2a6)]);})(pluginData),PluginManager[_0x2260cd(0x192)](pluginData[_0x2260cd(0x2a8)],_0x2260cd(0x18e),_0x14b49e=>{const _0xeb9159=_0x2260cd;VisuMZ[_0xeb9159(0x2ca)](_0x14b49e,_0x14b49e);const _0x55d774=_0x14b49e[_0xeb9159(0x1ba)],_0x546ad5=_0x14b49e[_0xeb9159(0x1bb)],_0x38ff8c=_0x14b49e[_0xeb9159(0x22d)];for(let _0x494954 of _0x55d774){_0x494954=_0x494954[_0xeb9159(0x2b6)](/\s*\(.*?\)\s*/g,'')[_0xeb9159(0x31a)]()[_0xeb9159(0x210)]();const _0x3b9238=TextManager[_0xeb9159(0x209)][_0xeb9159(0x1b4)](_0x494954);_0x3b9238>0x0&&($gameSystem['setButtonCommonEvent'](_0x3b9238,_0x546ad5),$gameSystem[_0xeb9159(0x1e9)](_0x3b9238,_0x38ff8c));}}),PluginManager[_0x2260cd(0x192)](pluginData[_0x2260cd(0x2a8)],_0x2260cd(0x2b2),_0x225dcd=>{const _0x55a639=_0x2260cd;VisuMZ[_0x55a639(0x2ca)](_0x225dcd,_0x225dcd);const _0x3e7701=_0x225dcd['Visible'];$gameSystem['setShowButtonCommonEventButtons'](_0x3e7701);}),PluginManager[_0x2260cd(0x192)](pluginData['name'],'ClearButtonCommonEvent',_0x31fd98=>{const _0x51ffbc=_0x2260cd;VisuMZ['ConvertParams'](_0x31fd98,_0x31fd98);const _0x1e095d=_0x31fd98[_0x51ffbc(0x1ba)];for(let _0x5347db of _0x1e095d){_0x5347db=_0x5347db[_0x51ffbc(0x2b6)](/\s*\(.*?\)\s*/g,'')[_0x51ffbc(0x31a)]()[_0x51ffbc(0x210)]();const _0x1742c2=TextManager[_0x51ffbc(0x209)][_0x51ffbc(0x1b4)](_0x5347db);if(_0x1742c2>0x0)$gameSystem['setButtonCommonEvent'](_0x1742c2,0x0);}}),PluginManager['registerCommand'](pluginData[_0x2260cd(0x2a8)],'ClearAllButtonCommonEvents',_0x4c8bac=>{const _0x200f46=_0x2260cd;$gameSystem[_0x200f46(0x258)]={};}),PluginManager[_0x2260cd(0x192)](pluginData['name'],_0x2260cd(0x205),_0x35605d=>{const _0x1d7432=_0x2260cd;VisuMZ[_0x1d7432(0x2ca)](_0x35605d,_0x35605d);const _0x17329a=_0x35605d[_0x1d7432(0x1bb)];for(const _0x4372e9 of _0x17329a){$gameSystem['clearButtonCommonEventID'](_0x4372e9);}}),PluginManager[_0x2260cd(0x192)](pluginData['name'],_0x2260cd(0x1cd),_0x20cf22=>{const _0x88f460=_0x2260cd;VisuMZ[_0x88f460(0x2ca)](_0x20cf22,_0x20cf22);let _0x34323a=_0x20cf22[_0x88f460(0x19c)][_0x88f460(0x31a)]()['trim']();_0x34323a=_0x34323a[_0x88f460(0x2b6)](/\s*\(.*?\)\s*/g,'')[_0x88f460(0x31a)]()[_0x88f460(0x210)]();const _0x18c812=TextManager[_0x88f460(0x209)]['indexOf'](_0x34323a),_0x5c307d=$gameSystem[_0x88f460(0x188)](_0x18c812);_0x5c307d>0x0&&$gameTemp[_0x88f460(0x319)](_0x5c307d);}),VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x2f7)]={'AssignCommonEvent':/<ASSIGN BUTTON COMMON EVENT:[ ](.*)>/i,'AssignButtonSlots':/<ASSIGN BUTTON (?:SLOT|SLOTS):[ ](.*)>/i,'AssignSkillShowQuantity':/<ASSIGN BUTTON SHOW COST>/i,'AssignSkillPayCost':/<ASSIGN BUTTON PAY COST>/i,'AssignItemShowQuantity':/<ASSIGN BUTTON SHOW (?:COST|QUANTITY)>/i,'AssignItemPayCost':/<ASSIGN BUTTON (?:CONSUME QUANTITY|PAY COST)>/i},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x2ec)]=Scene_Boot[_0x2260cd(0x1b6)]['onDatabaseLoaded'],Scene_Boot[_0x2260cd(0x1b6)][_0x2260cd(0x1ad)]=function(){const _0x21fea9=_0x2260cd;VisuMZ[_0x21fea9(0x2a1)]['Scene_Boot_onDatabaseLoaded'][_0x21fea9(0x1f2)](this),this[_0x21fea9(0x1c2)](),ImageManager[_0x21fea9(0x2d3)]();},Scene_Boot[_0x2260cd(0x1b6)]['process_VisuMZ_ButtonCommonEvents_Parameters']=function(){const _0x48f2f5=_0x2260cd,_0x4098aa=[];for(let _0x15367f=0x30;_0x15367f<=0x39;_0x15367f++){_0x4098aa[_0x48f2f5(0x1bf)](_0x15367f);}for(let _0x118c83=0x41;_0x118c83<=0x5a;_0x118c83++){_0x4098aa[_0x48f2f5(0x1bf)](_0x118c83);}for(let _0x49fdb6=0xba;_0x49fdb6<=0xc0;_0x49fdb6++){_0x4098aa[_0x48f2f5(0x1bf)](_0x49fdb6);}for(let _0x7b6cb2=0xdb;_0x7b6cb2<=0xde;_0x7b6cb2++){_0x4098aa[_0x48f2f5(0x1bf)](_0x7b6cb2);}for(let _0x5cc857=0x20;_0x5cc857<=0x28;_0x5cc857++){_0x4098aa[_0x48f2f5(0x1bf)](_0x5cc857);}for(let _0x3ffda2=0x2d;_0x3ffda2<=0x2e;_0x3ffda2++){_0x4098aa[_0x48f2f5(0x1bf)](_0x3ffda2);}for(let _0x11ce25=0x60;_0x11ce25<=0x6f;_0x11ce25++){_0x4098aa[_0x48f2f5(0x1bf)](_0x11ce25);}VisuMZ['ButtonCommonEvents']['KeysArray']=_0x4098aa;},Input['isButtonCommonEventForbidden']=function(_0x656c37){const _0x37d925=_0x2260cd;if(!VisuMZ['ButtonCommonEvents'][_0x37d925(0x1b3)][_0x37d925(0x314)][_0x37d925(0x20e)])return![];return!!Input[_0x37d925(0x291)][_0x656c37];},ImageManager[_0x2260cd(0x2d3)]=function(){const _0x685bb4=_0x2260cd,_0x1eade3=VisuMZ[_0x685bb4(0x2a1)]['Settings'][_0x685bb4(0x314)][_0x685bb4(0x2bc)];this[_0x685bb4(0x285)]=_0x1eade3?ImageManager[_0x685bb4(0x189)](_0x1eade3):new Bitmap(0x1,0x1);},TextManager[_0x2260cd(0x209)]=['','','',_0x2260cd(0x223),'','','HELP','',_0x2260cd(0x281),_0x2260cd(0x2b0),'','',_0x2260cd(0x280),'ENTER',_0x2260cd(0x2f5),'',_0x2260cd(0x289),_0x2260cd(0x2c7),'ALT','PAUSE','CAPSLOCK',_0x2260cd(0x2a9),_0x2260cd(0x1fb),_0x2260cd(0x1e8),'FINAL',_0x2260cd(0x30c),'','ESC',_0x2260cd(0x254),_0x2260cd(0x2fa),_0x2260cd(0x215),_0x2260cd(0x1e4),_0x2260cd(0x2c8),'PGUP',_0x2260cd(0x1d2),_0x2260cd(0x22a),_0x2260cd(0x2ea),_0x2260cd(0x1ac),'UP','RIGHT',_0x2260cd(0x29d),'SELECT','PRINT',_0x2260cd(0x269),'PRINTSCREEN',_0x2260cd(0x317),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x2260cd(0x2de),'SEMICOLON',_0x2260cd(0x315),_0x2260cd(0x2fb),_0x2260cd(0x2c2),_0x2260cd(0x207),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x2260cd(0x1e3),'','CONTEXT_MENU','',_0x2260cd(0x25d),_0x2260cd(0x310),_0x2260cd(0x233),_0x2260cd(0x1eb),_0x2260cd(0x2cc),_0x2260cd(0x1ea),'NUMPAD5','NUMPAD6',_0x2260cd(0x186),_0x2260cd(0x1a3),'NUMPAD9',_0x2260cd(0x2fe),'ADD','SEPARATOR',_0x2260cd(0x2fc),'DECIMAL','DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x2260cd(0x1f7),_0x2260cd(0x27a),_0x2260cd(0x222),_0x2260cd(0x1a0),'F14',_0x2260cd(0x30d),_0x2260cd(0x1ce),'F17',_0x2260cd(0x2f4),_0x2260cd(0x298),_0x2260cd(0x29e),_0x2260cd(0x26e),_0x2260cd(0x313),'F23','F24','','','','','','','','','NUM_LOCK',_0x2260cd(0x2db),_0x2260cd(0x31d),_0x2260cd(0x2e2),'WIN_OEM_FJ_TOUROKU',_0x2260cd(0x1cc),_0x2260cd(0x318),'','','','','','','','','','CIRCUMFLEX',_0x2260cd(0x20f),_0x2260cd(0x2bb),_0x2260cd(0x21c),_0x2260cd(0x1f4),_0x2260cd(0x21a),_0x2260cd(0x252),_0x2260cd(0x321),'OPEN_PAREN',_0x2260cd(0x242),_0x2260cd(0x266),_0x2260cd(0x2d7),_0x2260cd(0x21f),_0x2260cd(0x1fa),_0x2260cd(0x25e),_0x2260cd(0x240),_0x2260cd(0x320),'','','','',_0x2260cd(0x199),_0x2260cd(0x1d7),_0x2260cd(0x1df),'','',_0x2260cd(0x187),_0x2260cd(0x2fb),_0x2260cd(0x1c5),_0x2260cd(0x185),_0x2260cd(0x1dd),'SLASH',_0x2260cd(0x261),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x2260cd(0x29b),_0x2260cd(0x198),_0x2260cd(0x28f),_0x2260cd(0x2ad),'',_0x2260cd(0x1d8),_0x2260cd(0x1c8),'',_0x2260cd(0x214),_0x2260cd(0x28d),'',_0x2260cd(0x267),'','','WIN_OEM_RESET','WIN_OEM_JUMP',_0x2260cd(0x24a),_0x2260cd(0x2ba),_0x2260cd(0x22c),_0x2260cd(0x1bd),_0x2260cd(0x268),_0x2260cd(0x1a8),'WIN_OEM_FINISH',_0x2260cd(0x1b9),_0x2260cd(0x195),_0x2260cd(0x28a),_0x2260cd(0x270),_0x2260cd(0x2aa),_0x2260cd(0x309),_0x2260cd(0x2b5),_0x2260cd(0x246),_0x2260cd(0x230),'ZOOM','',_0x2260cd(0x2cb),_0x2260cd(0x322),''],VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x25f)]=SceneManager['onKeyDown'],SceneManager[_0x2260cd(0x225)]=function(_0xb00f37){const _0x467e8e=_0x2260cd;this['isSceneMap']()&&this[_0x467e8e(0x282)](_0xb00f37)&&this[_0x467e8e(0x26d)][_0x467e8e(0x22b)](_0xb00f37[_0x467e8e(0x2d6)]),VisuMZ[_0x467e8e(0x2a1)][_0x467e8e(0x25f)][_0x467e8e(0x1f2)](this,_0xb00f37);},SceneManager[_0x2260cd(0x2dc)]=function(){const _0x1f4677=_0x2260cd;return this[_0x1f4677(0x26d)]&&this['_scene'][_0x1f4677(0x1cf)]===Scene_Map;},SceneManager[_0x2260cd(0x282)]=function(_0xb472c4){const _0x3a4ac2=_0x2260cd;return!Input[_0x3a4ac2(0x21d)](_0xb472c4[_0x3a4ac2(0x2d6)]);},VisuMZ['ButtonCommonEvents']['Game_System_initialize']=Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x241)],Game_System['prototype'][_0x2260cd(0x241)]=function(){const _0x1eff9c=_0x2260cd;VisuMZ[_0x1eff9c(0x2a1)][_0x1eff9c(0x1fc)]['call'](this),this['initButtonCommonEvents']();},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x2ce)]=function(){const _0x2b50f9=_0x2260cd;this[_0x2b50f9(0x258)]={},this['_buttonCommonEventIcons']={},this[_0x2b50f9(0x28c)]=VisuMZ['ButtonCommonEvents'][_0x2b50f9(0x1b3)]['General'][_0x2b50f9(0x302)],this[_0x2b50f9(0x1c0)]();},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x1c0)]=function(){const _0x57df8e=_0x2260cd,_0x46607a=VisuMZ[_0x57df8e(0x2a1)][_0x57df8e(0x1b3)],_0x5c88e9=_0x57df8e(0x2f3);for(const _0x3be6ed of VisuMZ['ButtonCommonEvents'][_0x57df8e(0x26a)]){const _0x44b9c4=_0x5c88e9[_0x57df8e(0x306)](_0x3be6ed);!!_0x46607a[_0x44b9c4]&&(this[_0x57df8e(0x2ed)](_0x3be6ed,_0x46607a[_0x44b9c4][_0x57df8e(0x1bb)]),this[_0x57df8e(0x1e9)](_0x3be6ed,_0x46607a[_0x44b9c4][_0x57df8e(0x28b)]));}},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x188)]=function(_0x15ba55){const _0x491ef7=_0x2260cd;if(this[_0x491ef7(0x258)]===undefined)this[_0x491ef7(0x2ce)]();return this['_buttonCommonEventKeyCodes'][_0x15ba55]||0x0;},Game_System[_0x2260cd(0x1b6)]['setButtonCommonEvent']=function(_0x5dd2e1,_0x29e6b5){const _0xbf5e7b=_0x2260cd;if(this[_0xbf5e7b(0x258)]===undefined)this[_0xbf5e7b(0x2ce)]();if($gameTemp[_0xbf5e7b(0x2d4)]()&&Input[_0xbf5e7b(0x21d)](_0x5dd2e1)&&_0x29e6b5!==0x0){console[_0xbf5e7b(0x2ae)](_0x5dd2e1);const _0x3aaec9=_0xbf5e7b(0x236)[_0xbf5e7b(0x306)](TextManager[_0xbf5e7b(0x209)][_0x5dd2e1]);alert(_0x3aaec9);return;}this[_0xbf5e7b(0x258)][_0x5dd2e1]=_0x29e6b5;},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x1aa)]=function(_0x129892){const _0x9d1783=_0x2260cd;if(this[_0x9d1783(0x258)]===undefined)this[_0x9d1783(0x2ce)]();delete this[_0x9d1783(0x258)][_0x129892],this['clearButtonCommonEventDisplayFor'](_0x129892);},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x2e0)]=function(_0x3d5862){const _0x574bdf=_0x2260cd;if(this['_buttonCommonEventIcons']===undefined)this[_0x574bdf(0x2ce)]();return this[_0x574bdf(0x235)][_0x3d5862]||0x0;},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x1e9)]=function(_0x20df2f,_0x4fecb8){const _0x45bead=_0x2260cd;if(this[_0x45bead(0x235)]===undefined)this[_0x45bead(0x2ce)]();this[_0x45bead(0x235)][_0x20df2f]=_0x4fecb8;},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x201)]=function(_0x41a85d){const _0x4c0ca3=_0x2260cd;if(this[_0x4c0ca3(0x235)]===undefined)this['initButtonCommonEvents']();delete this[_0x4c0ca3(0x235)][_0x41a85d];},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x31b)]=function(){const _0x27f6f1=_0x2260cd;if(this[_0x27f6f1(0x28c)]===undefined)this[_0x27f6f1(0x2ce)]();return this[_0x27f6f1(0x28c)];},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x224)]=function(_0x6c384c){const _0x29867d=_0x2260cd;if(this[_0x29867d(0x28c)]===undefined)this[_0x29867d(0x2ce)]();this[_0x29867d(0x28c)]=_0x6c384c;},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x221)]=function(_0x5a9886,_0x5c494e){const _0x36c1d0=_0x2260cd;for(const _0x30c674 of VisuMZ[_0x36c1d0(0x2a1)]['KeysArray']){if(!this[_0x36c1d0(0x23c)](_0x5c494e,_0x30c674))continue;this[_0x36c1d0(0x188)](_0x30c674)===_0x5a9886&&(this[_0x36c1d0(0x1aa)](_0x30c674),this[_0x36c1d0(0x201)](_0x30c674),this[_0x36c1d0(0x23b)](_0x30c674));}},Game_System['prototype'][_0x2260cd(0x23c)]=function(_0x57e1a6,_0x55d3ed){const _0x54c0bb=_0x2260cd;if(!_0x57e1a6)return!![];const _0x4cfacb=this[_0x54c0bb(0x2cf)](_0x55d3ed);if(!_0x4cfacb)return!![];for(const _0x4fd9cc in _0x4cfacb){if(_0x4cfacb[_0x4fd9cc]!==_0x57e1a6[_0x4fd9cc])return![];}return!![];},Game_System['prototype'][_0x2260cd(0x257)]=function(_0x25cc72,_0x4d64a2){const _0x31ec57=_0x2260cd;if(!_0x4d64a2)return;this[_0x31ec57(0x2dd)]=this[_0x31ec57(0x2dd)]||{},this['_buttonCommonEventDisplay'][_0x25cc72]=undefined;const _0x4d1f84=VisuMZ['ButtonCommonEvents'][_0x31ec57(0x2f7)],_0x2f7aa3=_0x4d64a2[_0x31ec57(0x304)]||'';let _0x35dcb3='';if(DataManager['isSkill'](_0x4d64a2))_0x35dcb3=_0x31ec57(0x1ca);else{if(DataManager[_0x31ec57(0x2a7)](_0x4d64a2))_0x35dcb3=_0x31ec57(0x208);else{if(DataManager[_0x31ec57(0x216)](_0x4d64a2))_0x35dcb3=_0x31ec57(0x26c);else DataManager['isArmor'](_0x4d64a2)&&(_0x35dcb3=_0x31ec57(0x1e5));}}if(!_0x35dcb3)return;if(_0x35dcb3===_0x31ec57(0x1ca)){const _0x4e5c50=SceneManager[_0x31ec57(0x26d)][_0x31ec57(0x197)];_0x2f7aa3[_0x31ec57(0x25c)](_0x4d1f84['AssignSkillShowQuantity'])&&(this[_0x31ec57(0x2dd)][_0x25cc72]={'type':_0x35dcb3,'id':_0x4d64a2['id'],'actorID':_0x4e5c50?_0x4e5c50[_0x31ec57(0x1a4)]():0x0}),_0x2f7aa3[_0x31ec57(0x25c)](_0x4d1f84[_0x31ec57(0x300)])&&(this[_0x31ec57(0x2dd)][_0x25cc72]={'type':_0x35dcb3,'id':_0x4d64a2['id'],'actorID':_0x4e5c50?_0x4e5c50[_0x31ec57(0x1a4)]():0x0,'payCost':!![]});}else _0x2f7aa3[_0x31ec57(0x25c)](_0x4d1f84[_0x31ec57(0x273)])&&(this['_buttonCommonEventDisplay'][_0x25cc72]={'type':_0x35dcb3,'id':_0x4d64a2['id']}),_0x2f7aa3[_0x31ec57(0x25c)](_0x4d1f84[_0x31ec57(0x2c0)])&&_0x4d64a2['consumable']!==![]&&(this[_0x31ec57(0x2dd)][_0x25cc72]={'type':_0x35dcb3,'id':_0x4d64a2['id'],'payCost':!![]});},Game_System[_0x2260cd(0x1b6)]['getButtonCommonEventDisplayData']=function(_0x30c2bc){const _0x4da294=_0x2260cd;return this[_0x4da294(0x2dd)]=this[_0x4da294(0x2dd)]||{},this[_0x4da294(0x2dd)][_0x30c2bc];},Game_System[_0x2260cd(0x1b6)]['clearButtonCommonEventDisplayFor']=function(_0x27e808){const _0x27923f=_0x2260cd;this[_0x27923f(0x2dd)]=this[_0x27923f(0x2dd)]||{},delete this['_buttonCommonEventDisplay'][_0x27e808];},Game_System['prototype'][_0x2260cd(0x2be)]=function(_0x3c8574){const _0x43567f=_0x2260cd,_0x33763b=this[_0x43567f(0x2cf)](_0x3c8574);if(!_0x33763b)return![];if(_0x33763b[_0x43567f(0x211)])return!![];return![];},Game_System[_0x2260cd(0x1b6)][_0x2260cd(0x2a3)]=function(_0x3466c6){const _0x587934=_0x2260cd;if(!this[_0x587934(0x2be)](_0x3466c6))return!![];const _0x21515a=this[_0x587934(0x2cf)](_0x3466c6);if(!_0x21515a)return!![];const _0x1b94f1=_0x21515a[_0x587934(0x2e7)],_0xe94b48=_0x21515a['id'],_0x2a74fb=VisuMZ['ButtonCommonEvents']['GetObject'](_0x1b94f1,_0xe94b48);if(!_0x2a74fb)return![];if(_0x1b94f1===_0x587934(0x1ca)){const _0x197a97=$gameActors[_0x587934(0x202)](_0x21515a[_0x587934(0x27b)]);if(!_0x197a97)return![];if(!_0x197a97['canPaySkillCost'](_0x2a74fb))return![];if(!$gameParty[_0x587934(0x262)]()[_0x587934(0x2c9)](_0x197a97))return![];}else{const _0x2d07ab=$gameParty[_0x587934(0x212)](_0x2a74fb);if(_0x2d07ab<=0x0)return![];}return!![];},Game_System[_0x2260cd(0x1b6)]['buttonCommonEventPayCost']=function(_0x3aaa1e){const _0x15bf12=_0x2260cd;if(!this['buttonCommonEventRequiresCost'](_0x3aaa1e))return;const _0x40b721=this[_0x15bf12(0x2cf)](_0x3aaa1e);if(!_0x40b721)return;const _0x4b9af5=_0x40b721['type'],_0x466fb1=_0x40b721['id'],_0x554a10=VisuMZ[_0x15bf12(0x2a1)][_0x15bf12(0x21e)](_0x4b9af5,_0x466fb1);if(!_0x554a10)return;if(_0x4b9af5===_0x15bf12(0x1ca)){const _0x59374c=$gameActors[_0x15bf12(0x202)](_0x40b721[_0x15bf12(0x27b)]);if(_0x59374c)_0x59374c[_0x15bf12(0x2a0)](_0x554a10);}else $gameParty['loseItem'](_0x554a10,0x1);return!![];},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x29c)]=Scene_Map[_0x2260cd(0x1b6)]['createSpriteset'],Scene_Map[_0x2260cd(0x1b6)][_0x2260cd(0x20c)]=function(){const _0x5cb9de=_0x2260cd;VisuMZ[_0x5cb9de(0x2a1)][_0x5cb9de(0x29c)][_0x5cb9de(0x1f2)](this),this['createButtonCommonEventsSpriteContainer']();},Scene_Map[_0x2260cd(0x1b6)]['createButtonCommonEventsSpriteContainer']=function(){const _0x1a73b0=_0x2260cd;if(this['constructor']!==Scene_Map)return;this[_0x1a73b0(0x301)]=new Sprite_ButtonCommonEventsContainer(),this[_0x1a73b0(0x18b)](this[_0x1a73b0(0x301)]);},Scene_Map[_0x2260cd(0x1b6)][_0x2260cd(0x22b)]=function(_0x5c7033){const _0x417d85=_0x2260cd;if(!this[_0x417d85(0x238)](_0x5c7033))return;if($gameMap&&$gameMap[_0x417d85(0x256)]())return;const _0xe785fe=$gameSystem[_0x417d85(0x188)](_0x5c7033)||0x0;_0xe785fe>0x0&&$dataCommonEvents[_0xe785fe]&&($gameSystem['buttonCommonEventCanPayCost'](_0x5c7033)&&($gameSystem[_0x417d85(0x2c3)](_0x5c7033),$gameTemp['reserveCommonEvent'](_0xe785fe)),this[_0x417d85(0x301)][_0x417d85(0x1ec)](_0x5c7033));if(!![]){if($gamePlayer[_0x417d85(0x1c3)]()&&!$gamePlayer[_0x417d85(0x1e2)]()&&$gameMap){const _0x5691a7=$gamePlayer['x'],_0x11771d=$gamePlayer['y'],_0x466dc9=$gameMap[_0x417d85(0x2c4)](_0x5691a7,_0x11771d);if(_0x466dc9[_0x417d85(0x1ed)]>0x0&&_0x466dc9[_0x417d85(0x255)](_0x4f438=>_0x4f438[_0x417d85(0x27f)]()))for(const _0x562879 of _0x466dc9){_0x562879[_0x417d85(0x217)]();}}}},Game_Event['prototype'][_0x2260cd(0x27f)]=function(){const _0x56ff54=_0x2260cd;return[0x0,0x2][_0x56ff54(0x2c9)](this[_0x56ff54(0x200)])&&[0x1,0x2][_0x56ff54(0x2c9)](this[_0x56ff54(0x213)]);},VisuMZ['ButtonCommonEvents']['Game_Event_start']=Game_Event[_0x2260cd(0x1b6)]['start'],Game_Event[_0x2260cd(0x1b6)][_0x2260cd(0x217)]=function(){const _0x579416=_0x2260cd;if(this[_0x579416(0x2a5)])return;if(this['isNonSamePriorityTouchTrigger']()){this['_queueNonSamePriorityTouchTriggerStart']=!![];return;}VisuMZ[_0x579416(0x2a1)][_0x579416(0x2f9)][_0x579416(0x1f2)](this);},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x1a2)]=Game_Event[_0x2260cd(0x1b6)][_0x2260cd(0x279)],Game_Event['prototype'][_0x2260cd(0x279)]=function(){const _0x25fa3e=_0x2260cd;VisuMZ[_0x25fa3e(0x2a1)][_0x25fa3e(0x1a2)][_0x25fa3e(0x1f2)](this),this[_0x25fa3e(0x2a5)]&&!$gamePlayer['isMoving']()&&(this['_queueNonSamePriorityTouchTriggerStart']=undefined,VisuMZ['ButtonCommonEvents']['Game_Event_start'][_0x25fa3e(0x1f2)](this));},Scene_Map[_0x2260cd(0x1b6)][_0x2260cd(0x238)]=function(_0x3213b3){const _0x2189b0=_0x2260cd;if(!this[_0x2189b0(0x2e5)]())return![];if($gameMessage[_0x2189b0(0x28e)]())return![];if(SceneManager[_0x2189b0(0x20d)]())return![];if(Input[_0x2189b0(0x291)][_0x3213b3]==='ok'){if($gamePlayer['checkEventTriggerTouchInForwardLocation']())return![];}return!![];},VisuMZ[_0x2260cd(0x2a1)]['Scene_Map_isAnyButtonPressed']=Scene_Map[_0x2260cd(0x1b6)][_0x2260cd(0x260)],Scene_Map[_0x2260cd(0x1b6)][_0x2260cd(0x260)]=function(){const _0x144319=_0x2260cd,_0x159a9e=this['_buttonCommonEventsSpriteContainer'];if(_0x159a9e){if(_0x159a9e[_0x144319(0x260)]())return!![];}return VisuMZ[_0x144319(0x2a1)][_0x144319(0x2ff)]['call'](this);},Game_Player['prototype']['checkEventTriggerTouchInForwardLocation']=function(){const _0xfdd29f=_0x2260cd;let _0x45341c=this['x'],_0x1c196d=this['y'];for(const _0x2f6672 of $gameMap['eventsXy'](_0x45341c,_0x1c196d)){if(!_0x2f6672)continue;if(_0x2f6672[_0xfdd29f(0x18a)]([0x1,0x2]))return!![];}return![];};function Sprite_ButtonCommonEventsContainer(){const _0x5e085d=_0x2260cd;this[_0x5e085d(0x241)](...arguments);}function _0x5348(){const _0x2ead5d=['_currentKey','_priorityType','clearButtonCommonEventIcon','actor','ButtonText','CanAssignButtonCommonEvent','ClearButtonCommonEventID','DrawJS','QUESTION_MARK','item','stringKeyMap','windowPadding','Scene_Skill','createSpriteset','isSceneChanging','ForbidInputKeys','EXCLAMATION','trim','payCost','numItems','_trigger','WIN_ICO_HELP','ACCEPT','isWeapon','start','isCommonEventPressed','addCommand','PERCENT','createAssignButtonCommonEventsWindow','HASH','isButtonCommonEventForbidden','GetObject','PIPE','currentExt','clearButtonCommonEventID','F12','CANCEL','setShowButtonCommonEventButtons','onKeyDown','CustomHeight','height','ItemQuantityFmt','refreshCursor','END','processButtonCommonEvent','WIN_OEM_PA3','Icon','ARRAYSTRUCT','map','PLAY','callCommonEvent','CustomWidth','NUMPAD1','setupPaintOpacity','_buttonCommonEventIcons','!!\x20ERROR\x20VisuMZ_4_ButtonCmnEvts\x20ERROR\x20!!\x0aKey\x20%1\x20cannot\x20be\x20bound!\x0aIt\x20is\x20a\x20forbidden\x20keybased\x20on\x0ayour\x20Plugin\x20Parameter\x20settings!','clear','isButtonCommonEventOk','Scene_RebindKeyboard_isForbiddenKeycode','_icon','clearButtonCommonEventDisplayFor','checkMatchingButtonCommonEventDisplayTypeClear','_itemWindow','VisuMZ_1_ItemsEquipsCore','max','CLOSE_CURLY_BRACKET','initialize','CLOSE_PAREN','refresh','buttonHeight','buttonIcon','EREOF','drawText','targetOpacity','center','WIN_OEM_PA1','ChangeTone','Scene_Item_onItemOk','VisuMZ_1_OptionsCore','exit','ARRAYNUM','update','setHandler','AMPERSAND','paintOpacity','CONVERT','some','isEventRunning','setupButtonCommonEventDisplays','_buttonCommonEventKeyCodes','callUpdateHelp','updateIcon','HoverTone','match','SLEEP','OPEN_CURLY_BRACKET','SceneManager_onKeyDown','isAnyButtonPressed','BACK_QUOTE','allMembers','itemBackColor1','requiresCost','createAllSkillCostText','ASTERISK','WIN_ICO_CLEAR','WIN_OEM_CUSEL','EXECUTE','KeysArray','ARRAYJSON','weapon','_scene','F21','AbovePointJS','WIN_OEM_BACKTAB','makeCommandList','description','AssignItemShowQuantity','itemRect','activate','DisabledOpacity','NUM','ItemScene','checkEventTriggerAuto','F11','actorID','Window_SkillList_isEnabled','drawTextEx','split','isNonSamePriorityTouchTrigger','CLEAR','BACKSPACE','isKeyButtonCommonEventValid','onItemOk','buttonWidth','_buttomCommonEventImage','bottomPoint','resetFontSettings','strokeRect','SHIFT','WIN_OEM_ENLW','ButtonIcon','_buttonCommonEventShowButtons','WIN_ICO_00','isBusy','CLOSE_BRACKET','bitmap','keyMapper','mainFontFace','contents','ButtonWidth','buttonLabel','blt','drawDisplaySkillCost','F19','keySettings','parse','OPEN_BRACKET','Scene_Map_createSpriteset','DOWN','F20','cancel','paySkillCost','ButtonCommonEvents','flashColorTone','buttonCommonEventCanPayCost','itemRectWithPadding','_queueNonSamePriorityTouchTriggerStart','parameters','isItem','name','KANA','ATTN','setColorTone','colSpacing','QUOTE','log','1277926TtIigw','TAB','assign','ButtonCommonEventsVisibility','removeChild','9640eFOoWn','EXSEL','replace','onMouseEnter','Instruction','onMouseExit','WIN_OEM_PA2','DOUBLE_QUOTE','ButtonFilename','floor','buttonCommonEventRequiresCost','ButtonHeight','AssignItemPayCost','144EIgIut','GREATER_THAN','buttonCommonEventPayCost','eventsXy','settings','onButtonAssistAssign','CTRL','SPACE','includes','ConvertParams','PA1','NUMPAD3','numberFontFace','initButtonCommonEvents','getButtonCommonEventDisplayData','_assignButtonCommonEventsWindow','abovePoint','4931622FdaGnZ','loadButtomCommonEventImage','isPlaytest','return\x200','keyCode','PLUS','iconHeight','updateRefreshCache','rowSpacing','SCROLL_LOCK','isSceneMap','_buttonCommonEventDisplay','COLON','onClick','getButtonCommonEventIcon','createButtonSprites','WIN_OEM_FJ_MASSHOU','fontFace','PositionJS','isActive','66wdKYpz','type','bind','textSizeEx','HOME','calcWindowHeight','Scene_Boot_onDatabaseLoaded','setButtonCommonEvent','drawData','Input_isButtonCommonEventForbidden_Rebind','boxHeight','isClickEnabled','lineHeight','KeyCode%1','F18','ENTER_SPECIAL','VisuMZ_1_SkillsStatesCore','RegExp','SkillOffsetY','Game_Event_start','NONCONVERT','EQUALS','SUBTRACT','round','MULTIPLY','Scene_Map_isAnyButtonPressed','AssignSkillPayCost','_buttonCommonEventsSpriteContainer','ShowButtonsOnScreen','15953520njDaiO','note','createBitmap','format','SkillOffsetX','drawDisplayItemQuantity','CRSEL','FUNC','assignButtonCommonEventWindowTitle','HANJA','F15','Window_ItemList_isEnabled','ADD_REBIND_OPTIONS','NUMPAD0','42206461qfqKkZ','mainFontSize','F22','General','LESS_THAN','_lastDisplayQuantity','INSERT','WIN_OEM_FJ_ROYA','reserveCommonEvent','toUpperCase','isShowButtonCommonEventButtons','changePaintOpacity','WIN_OEM_FJ_JISHO','isEnabled','playOkSound','TILDE','UNDERSCORE','WIN_OEM_CLEAR','opacity','MINUS','NUMPAD7','SEMICOLON','getButtonCommonEvent','loadPicture','isTriggerIn','addChild','_key','onPress','ChangeButtonCommonEvent','EVAL','fontSize','661855VqnWqT','registerCommand','ItemOffsetX','imageSmoothingEnabled','WIN_OEM_AUTO','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_actor','BACK_SLASH','VOLUME_MUTE','140526qkxnGw','pictureBitmap','Key','create','_commonEventID','assignButtonCommonEventsWindowRect','F13','Cost','Game_Event_checkEventTriggerAuto','NUMPAD8','actorId','2mtgpfN','status','scrollBaseY','WIN_OEM_ATTN','onButtonAssistCancel','clearButtonCommonEvent','commonEventID','LEFT','onDatabaseLoaded','Scene_Item','Assign','ShowButton','BottomPointJS','126mJyHhI','Settings','indexOf','_slots','prototype','isForbiddenKeycode','isCommandEnabled','WIN_OEM_COPY','Keys','CommonEventID','leftPoint','WIN_OEM_WSCTRL','loadSystem','push','makeDefaultButtonCommonEvents','AssignWindow_RectJS','process_VisuMZ_ButtonCommonEvents_Parameters','isMoving','drawBaseJS','COMMA','Scene_Skill_onItemOk','AssignButtonSlots','ALTGR','_lastDisplayCanPay','skill','width','WIN_OEM_FJ_LOYA','RunButtonCommonEvent','F16','constructor','initMembers','BUTTON_LABEL_ALIGN','PGDN','LeftPointJS','itemHeight','canPayCost','ARRAYFUNC','VOLUME_DOWN','META','setData','filter','needsRefresh','_list','PERIOD','onColorTone','VOLUME_UP','gradientFillRect','drawTitle','isJumping','OS_KEY','MODECHANGE','armor','boxWidth','AssignCommonEvent','JUNJA','setButtonCommonEventIcon','NUMPAD4','NUMPAD2','flashButtonPress','length','clearColorTone','iconWidth','ARRAYEVAL','_context','call','rightPoint','DOLLAR','children','destroy','F10','ext','drawDisplayType','HYPHEN_MINUS','EISU','Game_System_initialize','AssignWindow_KeyAlign','IconSet'];_0x5348=function(){return _0x2ead5d;};return _0x5348();}Sprite_ButtonCommonEventsContainer['prototype']=Object[_0x2260cd(0x19d)](Sprite[_0x2260cd(0x1b6)]),Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x1cf)]=Sprite_ButtonCommonEventsContainer,Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)]['initialize']=function(){const _0x38a577=_0x2260cd;Sprite[_0x38a577(0x1b6)]['initialize']['call'](this),this['initMembers'](),this[_0x38a577(0x2e1)]();},Sprite_ButtonCommonEventsContainer['prototype'][_0x2260cd(0x1d0)]=function(){const _0x51eebc=_0x2260cd;this[_0x51eebc(0x1cb)]=Graphics[_0x51eebc(0x1cb)],this[_0x51eebc(0x227)]=Graphics[_0x51eebc(0x227)];},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x299)]=function(){const _0x47d8ac=_0x2260cd;if(!this['_currentKey'])return{};return VisuMZ['ButtonCommonEvents'][_0x47d8ac(0x1b3)][this[_0x47d8ac(0x1ff)]||'']||{};},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x284)]=function(){const _0x4865f7=_0x2260cd;return this['keySettings']()[_0x4865f7(0x232)]||VisuMZ['ButtonCommonEvents'][_0x4865f7(0x1b3)]['General'][_0x4865f7(0x294)];},Sprite_ButtonCommonEventsContainer['prototype'][_0x2260cd(0x244)]=function(){const _0x56ba54=_0x2260cd;return this['keySettings']()[_0x56ba54(0x226)]||VisuMZ[_0x56ba54(0x2a1)][_0x56ba54(0x1b3)][_0x56ba54(0x314)][_0x56ba54(0x2bf)];},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x286)]=function(){const _0x570dbc=_0x2260cd;try{return VisuMZ[_0x570dbc(0x2a1)][_0x570dbc(0x1b3)][_0x570dbc(0x314)][_0x570dbc(0x1b1)][_0x570dbc(0x1f2)](this);}catch(_0x3f21f3){if($gameTemp[_0x570dbc(0x2d4)]())console[_0x570dbc(0x2ae)](_0x3f21f3);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x1bc)]=function(){const _0x5f281d=_0x2260cd;try{return VisuMZ[_0x5f281d(0x2a1)]['Settings'][_0x5f281d(0x314)][_0x5f281d(0x1d3)][_0x5f281d(0x1f2)](this);}catch(_0x6c2fb2){if($gameTemp[_0x5f281d(0x2d4)]())console['log'](_0x6c2fb2);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x1f3)]=function(){const _0x3f73e7=_0x2260cd;try{return VisuMZ[_0x3f73e7(0x2a1)][_0x3f73e7(0x1b3)]['General']['RightPointJS'][_0x3f73e7(0x1f2)](this);}catch(_0x2b3a7a){if($gameTemp['isPlaytest']())console[_0x3f73e7(0x2ae)](_0x2b3a7a);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x2d1)]=function(){const _0x3cf7ca=_0x2260cd;try{return VisuMZ[_0x3cf7ca(0x2a1)][_0x3cf7ca(0x1b3)][_0x3cf7ca(0x314)][_0x3cf7ca(0x26f)][_0x3cf7ca(0x1f2)](this);}catch(_0x3fbec8){if($gameTemp[_0x3cf7ca(0x2d4)]())console['log'](_0x3fbec8);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x2e1)]=function(){const _0x4dff83=_0x2260cd,_0x10182a=VisuMZ[_0x4dff83(0x2a1)][_0x4dff83(0x1b3)],_0x4fcc78=_0x4dff83(0x2f3);for(const _0x55c987 of VisuMZ['ButtonCommonEvents']['KeysArray']){const _0x26e4c3=_0x4fcc78['format'](_0x55c987);if(!_0x10182a[_0x26e4c3])continue;if(!_0x10182a[_0x26e4c3][_0x4dff83(0x1b0)])continue;const _0x24cc77=new Sprite_ButtonCommonEvent(_0x55c987);this[_0x4dff83(0x18b)](_0x24cc77),this[_0x4dff83(0x1ff)]=_0x26e4c3;const _0x1e40ad=_0x24cc77['settings']()[_0x4dff83(0x2e4)][_0x4dff83(0x1f2)](this)||new Point(0x0,0x0);_0x24cc77['x']=_0x1e40ad['x'],_0x24cc77['y']=_0x1e40ad['y'];}},Sprite_ButtonCommonEventsContainer[_0x2260cd(0x1b6)][_0x2260cd(0x260)]=function(){const _0x2db24a=_0x2260cd;return this[_0x2db24a(0x1f5)][_0x2db24a(0x255)](_0x231f5a=>_0x231f5a[_0x2db24a(0x218)]());},Sprite_ButtonCommonEventsContainer['prototype'][_0x2260cd(0x1ec)]=function(_0xfc1a3b){const _0x4549d6=_0x2260cd,_0x5f3882=this['children']['filter'](_0x165c84=>_0x165c84&&_0x165c84[_0x4549d6(0x18c)]===_0xfc1a3b);for(const _0x30bc73 of _0x5f3882){if(!_0x30bc73)continue;_0x30bc73[_0x4549d6(0x2a2)]();}};function Sprite_ButtonCommonEvent(){this['initialize'](...arguments);}Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)]=Object[_0x2260cd(0x19d)](Sprite_Clickable[_0x2260cd(0x1b6)]),Sprite_ButtonCommonEvent['prototype'][_0x2260cd(0x1cf)]=Sprite_ButtonCommonEvent,Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x241)]=function(_0x2f41db){const _0x3ed40b=_0x2260cd;this[_0x3ed40b(0x18c)]=_0x2f41db,Sprite_Clickable['prototype'][_0x3ed40b(0x241)][_0x3ed40b(0x1f2)](this),this[_0x3ed40b(0x305)](),this[_0x3ed40b(0x323)]=this[_0x3ed40b(0x248)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x2c5)]=function(){const _0x3ee097=_0x2260cd,_0x19c14d=_0x3ee097(0x2f3)[_0x3ee097(0x306)](this[_0x3ee097(0x18c)]);return VisuMZ[_0x3ee097(0x2a1)]['Settings'][_0x19c14d]||{};},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x305)]=function(){const _0x11e11d=_0x2260cd,_0x5117d9=VisuMZ[_0x11e11d(0x2a1)][_0x11e11d(0x1b3)]['General'],_0x4dba2d=this[_0x11e11d(0x2c5)](),_0x21c87c=_0x4dba2d[_0x11e11d(0x232)]||_0x5117d9['ButtonWidth'],_0x5de1b1=_0x4dba2d[_0x11e11d(0x226)]||_0x5117d9[_0x11e11d(0x2bf)];this[_0x11e11d(0x290)]=new Bitmap(_0x21c87c,_0x5de1b1),this[_0x11e11d(0x23a)]=this[_0x11e11d(0x245)](),this[_0x11e11d(0x243)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)]['pictureBitmap']=function(){const _0x5cce3c=_0x2260cd;return ImageManager[_0x5cce3c(0x285)];},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x1ab)]=function(){const _0x4788fd=_0x2260cd;return $gameSystem['getButtonCommonEvent'](this[_0x4788fd(0x18c)]);},Sprite_ButtonCommonEvent['prototype']['buttonLabel']=function(){const _0x59d50c=_0x2260cd;if(!this['settings']())return'';return this[_0x59d50c(0x2c5)]()[_0x59d50c(0x203)];},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x245)]=function(){const _0x3ef52f=_0x2260cd;if(!this[_0x3ef52f(0x1ab)]())return 0x0;const _0x47f05d=$gameSystem[_0x3ef52f(0x2e0)](this['_key']);if(_0x47f05d!==0x0)return _0x47f05d;const _0x57257a=VisuMZ[_0x3ef52f(0x2a1)]['Settings'][_0x3ef52f(0x314)],_0x4ac913=_0x57257a['IconsUsed'],_0x192d77=Math[_0x3ef52f(0x23f)](_0x4ac913['length'],0x1);let _0x26e2fb=_0x4ac913[this['_key']%_0x192d77]||0x0;return _0x26e2fb;},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x243)]=function(){const _0x5b3fdb=_0x2260cd;this[_0x5b3fdb(0x290)][_0x5b3fdb(0x237)](),this[_0x5b3fdb(0x234)](),this[_0x5b3fdb(0x1c4)](),this[_0x5b3fdb(0x1f9)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x234)]=function(){const _0x250b57=_0x2260cd;let _0x11e1f6=0xff;if(this[_0x250b57(0x264)]()){if(!this[_0x250b57(0x1d5)]()){const _0x52886f=VisuMZ['ButtonCommonEvents'][_0x250b57(0x1b3)][_0x250b57(0x1a1)]||{};_0x11e1f6=_0x52886f[_0x250b57(0x276)]??0xa0;}}this['bitmap'][_0x250b57(0x253)]=_0x11e1f6;},Sprite_ButtonCommonEvent['prototype'][_0x2260cd(0x1c4)]=function(){const _0x5245b7=_0x2260cd,_0x575c38=VisuMZ[_0x5245b7(0x2a1)][_0x5245b7(0x1b3)][_0x5245b7(0x314)];_0x575c38[_0x5245b7(0x206)][_0x5245b7(0x1f2)](this);},Sprite_ButtonCommonEvent['prototype'][_0x2260cd(0x1f9)]=function(){const _0xfae381=_0x2260cd,_0x2627cf=$gameSystem[_0xfae381(0x2cf)](this[_0xfae381(0x18c)]);if(!_0x2627cf)return;const _0x304026=_0x2627cf['id']||0x0,_0x18bfcf=_0x2627cf[_0xfae381(0x2e7)];let _0x5b4481=VisuMZ['ButtonCommonEvents']['GetObject'](_0x18bfcf,_0x304026);if(!_0x5b4481)return;if(DataManager['isSkill'](_0x5b4481)&&Imported[_0xfae381(0x2f6)])this[_0xfae381(0x297)](_0x5b4481,_0x2627cf['actorID']);else!DataManager['isSkill'](_0x5b4481)&&Imported[_0xfae381(0x23e)]&&this['drawDisplayItemQuantity'](_0x5b4481);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x297)]=function(_0x2537c6,_0x17b15b){const _0x5cf66c=_0x2260cd;if(!_0x2537c6)return;if(!Imported[_0x5cf66c(0x2f6)])return;const _0x15fc23=$gameActors[_0x5cf66c(0x202)](_0x17b15b);if(!_0x15fc23)return;const _0xe8c7f7=this[_0x5cf66c(0x290)][_0x5cf66c(0x1cb)],_0x4c35b3=this['bitmap'][_0x5cf66c(0x227)],_0x13c288=$gameSystem['windowPadding'](),_0xa59d48=new Rectangle(0x0,0x0,_0xe8c7f7+_0x13c288*0x2,_0x4c35b3+_0x13c288*0x2),_0x11f097=new Window_Base(_0xa59d48);if(!_0x11f097[_0x5cf66c(0x265)])return;let _0x2f1805=_0x11f097[_0x5cf66c(0x265)](_0x15fc23,_0x2537c6);if(!_0x2f1805)return;const _0x238ba9=_0x11f097[_0x5cf66c(0x2e9)](_0x2f1805),_0x44b52d=Math[_0x5cf66c(0x2bd)]((_0xe8c7f7-_0x238ba9[_0x5cf66c(0x1cb)])/0x2),_0x40f5a0=_0x4c35b3-_0x238ba9[_0x5cf66c(0x227)];_0x11f097[_0x5cf66c(0x27d)](_0x2f1805,_0x44b52d,_0x40f5a0);const _0x19ad96=VisuMZ[_0x5cf66c(0x2a1)][_0x5cf66c(0x1b3)][_0x5cf66c(0x1a1)]||{};let _0x16128d=_0x19ad96[_0x5cf66c(0x307)]||0x0,_0x573a34=_0x19ad96[_0x5cf66c(0x2f8)]||0x0;this[_0x5cf66c(0x290)][_0x5cf66c(0x296)](_0x11f097['contents'],0x0,0x0,_0xe8c7f7,_0x4c35b3,_0x16128d,_0x573a34);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x308)]=function(_0x4149ca){const _0x1c0a1b=_0x2260cd;if(!_0x4149ca)return;if(!Imported[_0x1c0a1b(0x23e)])return;const _0x111403=this[_0x1c0a1b(0x290)]['width'],_0x164478=this[_0x1c0a1b(0x290)][_0x1c0a1b(0x227)],_0x4999ff=VisuMZ['ItemsEquipsCore'][_0x1c0a1b(0x1b3)][_0x1c0a1b(0x278)],_0x568d76=_0x4999ff[_0x1c0a1b(0x228)],_0x25da3e=_0x568d76['format']($gameParty['numItems'](_0x4149ca)),_0x319bec=VisuMZ[_0x1c0a1b(0x2a1)][_0x1c0a1b(0x1b3)][_0x1c0a1b(0x1a1)]||{};let _0x558a22=_0x319bec[_0x1c0a1b(0x193)]||0x0,_0x585716=(_0x319bec['ItemOffsetY']||0x0)+Math[_0x1c0a1b(0x2bd)](_0x164478/0x2);this['bitmap'][_0x1c0a1b(0x2e3)]=$gameSystem[_0x1c0a1b(0x292)](),this['bitmap'][_0x1c0a1b(0x190)]=_0x4999ff['ItemQuantityFontSize'],this[_0x1c0a1b(0x290)][_0x1c0a1b(0x247)](_0x25da3e,_0x558a22,_0x585716,_0x111403,Math[_0x1c0a1b(0x2bd)](_0x164478/0x2),_0x1c0a1b(0x249)),this[_0x1c0a1b(0x290)]['fontFace']=$gameSystem[_0x1c0a1b(0x2cd)](),this[_0x1c0a1b(0x290)][_0x1c0a1b(0x190)]=$gameSystem[_0x1c0a1b(0x312)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x2f1)]=function(){const _0x2e221b=_0x2260cd;if(this['opacity']<0xff)return![];if(this[_0x2e221b(0x1ab)]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x264)]=function(){const _0x4329fa=_0x2260cd;return $gameSystem[_0x4329fa(0x2be)](this[_0x4329fa(0x18c)]);},Sprite_ButtonCommonEvent['prototype'][_0x2260cd(0x1d5)]=function(){const _0x593e6b=_0x2260cd;return $gameSystem[_0x593e6b(0x2a3)](this['_key']);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)]['payCost']=function(){const _0x593ee5=_0x2260cd;return $gameSystem['buttonCommonEventPayCost'](this[_0x593ee5(0x18c)]);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)]['onMouseEnter']=function(){const _0x51afab=_0x2260cd;Sprite_Clickable['prototype'][_0x51afab(0x2b7)][_0x51afab(0x1f2)](this),this[_0x51afab(0x1de)]();},Sprite_ButtonCommonEvent['prototype'][_0x2260cd(0x2b9)]=function(){const _0x5e1c67=_0x2260cd;Sprite_Clickable['prototype'][_0x5e1c67(0x2b9)][_0x5e1c67(0x1f2)](this),this[_0x5e1c67(0x1ee)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x18d)]=function(){const _0x9e1492=_0x2260cd;Sprite_Clickable[_0x9e1492(0x1b6)]['onPress'][_0x9e1492(0x1f2)](this),this[_0x9e1492(0x1de)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x2df)]=function(){const _0x587b53=_0x2260cd;Sprite_Clickable['prototype'][_0x587b53(0x2df)]['call'](this),this['canPayCost']()&&(this['payCost'](),this['callCommonEvent']()),TouchInput[_0x587b53(0x237)](),this[_0x587b53(0x2b9)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x1de)]=function(){const _0x4c8511=_0x2260cd,_0x489bf6=VisuMZ['ButtonCommonEvents']['Settings']['General'];_0x489bf6[_0x4c8511(0x24b)]&&this[_0x4c8511(0x2ab)](_0x489bf6[_0x4c8511(0x25b)]);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)]['clearColorTone']=function(){this['setColorTone']([0x0,0x0,0x0,0x0]);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x2a2)]=function(){const _0x402ad2=_0x2260cd;this[_0x402ad2(0x1de)](),setTimeout(this[_0x402ad2(0x1ee)][_0x402ad2(0x2e8)](this),0x64);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x231)]=function(){const _0x151563=_0x2260cd;if(!SceneManager['_scene']['isButtonCommonEventOk']())return;if($gameMap&&$gameMap[_0x151563(0x256)]())return;const _0x40055a=this[_0x151563(0x1ab)]();$gameTemp[_0x151563(0x319)](_0x40055a),this[_0x151563(0x2b9)](),this['flashColorTone']();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x218)]=function(){const _0x15fff6=_0x2260cd;if(!this['isPressed']())return![];if(this[_0x15fff6(0x1ab)]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent['prototype'][_0x2260cd(0x250)]=function(){const _0xb928df=_0x2260cd;Sprite_Clickable[_0xb928df(0x1b6)][_0xb928df(0x250)][_0xb928df(0x1f2)](this),this['needsRefresh']()&&(this[_0xb928df(0x2d9)](),this['refresh']()),this['updateOpacity'](),this[_0xb928df(0x25a)]();},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x1db)]=function(){const _0x1ca2ef=_0x2260cd,_0x5a616a=$gameSystem[_0x1ca2ef(0x2cf)](this[_0x1ca2ef(0x18c)]);if(_0x5a616a){const _0x2921e1=_0x5a616a['id']||0x0,_0x2d471c=_0x5a616a['type']||'';if([_0x1ca2ef(0x208),_0x1ca2ef(0x26c),_0x1ca2ef(0x1e5)][_0x1ca2ef(0x2c9)](_0x5a616a['type'])){const _0xeb3689=VisuMZ[_0x1ca2ef(0x2a1)][_0x1ca2ef(0x21e)](_0x2d471c,_0x2921e1);if(_0xeb3689){const _0x310d3f=$gameParty[_0x1ca2ef(0x212)](_0xeb3689);if(this['_lastDisplayQuantity']!==_0x310d3f)return!![];}}if(this[_0x1ca2ef(0x264)]()){if(this[_0x1ca2ef(0x1c9)]!==this['canPayCost']())return!![];}}return![];},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x2d9)]=function(){const _0x30722c=_0x2260cd,_0xa4db7f=$gameSystem[_0x30722c(0x2cf)](this[_0x30722c(0x18c)]);if(!_0xa4db7f)return;const _0x497c74=_0xa4db7f['id']||0x0,_0x355d6f=_0xa4db7f[_0x30722c(0x2e7)]||'';if([_0x30722c(0x208),'weapon',_0x30722c(0x1e5)][_0x30722c(0x2c9)](_0xa4db7f[_0x30722c(0x2e7)])){const _0x2e541e=VisuMZ['ButtonCommonEvents'][_0x30722c(0x21e)](_0x355d6f,_0x497c74);if(_0x2e541e){const _0x28b315=$gameParty[_0x30722c(0x212)](_0x2e541e);this[_0x30722c(0x316)]=_0x28b315;}}this[_0x30722c(0x264)]()&&(this[_0x30722c(0x1c9)]=this[_0x30722c(0x1d5)]());},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)]['updateOpacity']=function(){const _0x29d442=_0x2260cd,_0xa0187c=this[_0x29d442(0x248)]();if(this['opacity']>_0xa0187c)this[_0x29d442(0x323)]-=0x10;else this['opacity']<_0xa0187c&&(this[_0x29d442(0x323)]+=0x10);},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x248)]=function(){const _0x4aeeeb=_0x2260cd;if($gameMessage&&$gameMessage[_0x4aeeeb(0x28e)]())return 0x0;if(!$gameSystem['isShowButtonCommonEventButtons']())return 0x0;if(this[_0x4aeeeb(0x2c5)]()['ShowOnlyIfCePresent']){const _0x24ed67=this[_0x4aeeeb(0x1ab)]();if(!$dataCommonEvents[_0x24ed67])return 0x0;}return 0xff;},Sprite_ButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x25a)]=function(){const _0x15d2bc=_0x2260cd;if(this[_0x15d2bc(0x23a)]===this[_0x15d2bc(0x245)]())return;this[_0x15d2bc(0x23a)]=this[_0x15d2bc(0x245)](),this[_0x15d2bc(0x243)]();},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x2ee)]=function(){const _0x27ab88=_0x2260cd,_0x47c671=this[_0x27ab88(0x1cb)],_0x20ca8e=this[_0x27ab88(0x227)],_0x8d47f6=ColorManager[_0x27ab88(0x263)](),_0x5e29e5=ColorManager['itemBackColor2']();this['bitmap'][_0x27ab88(0x1e0)](0x1,0x1,_0x47c671-0x2,_0x20ca8e-0x2,_0x8d47f6,_0x5e29e5,!![]),this[_0x27ab88(0x290)][_0x27ab88(0x288)](0x1,0x1,_0x47c671-0x2,_0x20ca8e-0x2,_0x8d47f6);if(this[_0x27ab88(0x19b)]()){const _0x4ea2ad=this[_0x27ab88(0x19b)](),_0x3a7132=_0x4ea2ad[_0x27ab88(0x1cb)],_0x2c9c16=_0x4ea2ad[_0x27ab88(0x227)];this['bitmap']['blt'](_0x4ea2ad,0x0,0x0,_0x3a7132,_0x2c9c16,0x0,0x0,_0x47c671,_0x20ca8e);}const _0x24d71f=this[_0x27ab88(0x245)](),_0x2b18be=ImageManager[_0x27ab88(0x1be)](_0x27ab88(0x1fe)),_0x564572=ImageManager[_0x27ab88(0x1ef)],_0x21f971=ImageManager['iconHeight'],_0x35cb28=_0x24d71f%0x10*_0x564572,_0x2a139d=Math[_0x27ab88(0x2bd)](_0x24d71f/0x10)*_0x21f971,_0xfb1d0c=Math['floor'](this[_0x27ab88(0x1cb)]/_0x564572)*_0x564572,_0x37c31b=Math[_0x27ab88(0x2bd)](this['height']/_0x21f971)*_0x21f971,_0x5c5831=Math[_0x27ab88(0x2bd)]((this['width']-_0xfb1d0c)/0x2),_0x42a1b7=Math['floor']((this[_0x27ab88(0x227)]-_0x37c31b)/0x2);this['bitmap'][_0x27ab88(0x1f1)][_0x27ab88(0x194)]=![],this[_0x27ab88(0x290)]['blt'](_0x2b18be,_0x35cb28,_0x2a139d,_0x564572,_0x21f971,_0x5c5831,_0x42a1b7,_0xfb1d0c,_0x37c31b),this[_0x27ab88(0x290)][_0x27ab88(0x1f1)]['imageSmoothingEnabled']=!![];const _0x2627b4=this[_0x27ab88(0x295)]();this[_0x27ab88(0x290)][_0x27ab88(0x2e3)]=$gameSystem[_0x27ab88(0x2cd)](),this[_0x27ab88(0x290)][_0x27ab88(0x190)]=$gameSystem[_0x27ab88(0x312)](),this['bitmap'][_0x27ab88(0x247)](_0x2627b4,0x0,0x0,_0x47c671,this[_0x27ab88(0x290)][_0x27ab88(0x190)]+0x4,'center');},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x204)]=function(_0xf4e900){const _0xbd3e73=_0x2260cd;if(!_0xf4e900)return![];if(![_0xbd3e73(0x1ae),_0xbd3e73(0x20b)]['includes'](SceneManager[_0xbd3e73(0x26d)][_0xbd3e73(0x1cf)][_0xbd3e73(0x2a8)]))return![];const _0x380ccf=VisuMZ[_0xbd3e73(0x2a1)][_0xbd3e73(0x2f7)],_0x3828e6=_0xf4e900['note'];return _0x3828e6[_0xbd3e73(0x25c)](_0x380ccf['AssignCommonEvent'])&&_0x3828e6['match'](_0x380ccf[_0xbd3e73(0x1c7)]);},TextManager[_0x2260cd(0x30b)]=VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x1b3)]['Assign'][_0x2260cd(0x2b8)],Scene_ItemBase[_0x2260cd(0x1b6)][_0x2260cd(0x21b)]=function(){const _0x4c595d=_0x2260cd,_0xb7ae9c=VisuMZ['ButtonCommonEvents']['RegExp'],_0x2849e0=this[_0x4c595d(0x208)]()[_0x4c595d(0x304)];_0x2849e0['match'](_0xb7ae9c['AssignButtonSlots']);const _0x3cd6a7=String(RegExp['$1'])[_0x4c595d(0x27e)](',')[_0x4c595d(0x22f)](_0x193bcd=>String(_0x193bcd)[_0x4c595d(0x31a)]()[_0x4c595d(0x210)]())[_0x4c595d(0x1da)](_0x69b084=>TextManager[_0x4c595d(0x209)][_0x4c595d(0x2c9)](_0x69b084))[_0x4c595d(0x1da)](_0x2c866a=>VisuMZ[_0x4c595d(0x2a1)][_0x4c595d(0x26a)]['includes'](TextManager[_0x4c595d(0x209)][_0x4c595d(0x1b4)](_0x2c866a)))[_0x4c595d(0x1da)](_0x353d62=>!Input[_0x4c595d(0x21d)](TextManager[_0x4c595d(0x209)][_0x4c595d(0x1b4)](_0x353d62)));_0x2849e0[_0x4c595d(0x25c)](_0xb7ae9c[_0x4c595d(0x1e7)]);const _0x5cf972=eval(RegExp['$1']),_0x36d603=this[_0x4c595d(0x19f)](_0x3cd6a7),_0x2fbbb7=new Window_AssignButtonCommonEvent(_0x36d603);_0x2fbbb7[_0x4c595d(0x1d9)](_0x5cf972,_0x3cd6a7),this[_0x4c595d(0x18b)](_0x2fbbb7),this['_assignButtonCommonEventsWindow']=_0x2fbbb7,_0x2fbbb7['setHandler']('assign',this[_0x4c595d(0x2c6)][_0x4c595d(0x2e8)](this)),_0x2fbbb7[_0x4c595d(0x251)](_0x4c595d(0x29f),this['onButtonAssistCancel'][_0x4c595d(0x2e8)](this));},Scene_ItemBase[_0x2260cd(0x1b6)]['assignButtonCommonEventsWindowRect']=function(_0x337cf4){const _0x484d7d=_0x2260cd,_0xbc2d5f=VisuMZ[_0x484d7d(0x2a1)][_0x484d7d(0x1b3)][_0x484d7d(0x1af)];if(_0xbc2d5f&&_0xbc2d5f['AssignWindow_RectJS'])return _0xbc2d5f[_0x484d7d(0x1c1)]['call'](this,_0x337cf4);const _0xd25920=Window_Base[_0x484d7d(0x1b6)][_0x484d7d(0x2f2)]()*0x2+0x8;let _0x366aab=$gameSystem[_0x484d7d(0x20a)]()*0x2+_0x337cf4[_0x484d7d(0x1ed)]*_0xd25920;_0x366aab=_0x366aab['clamp'](Graphics[_0x484d7d(0x1e6)]/0x3,Graphics['boxWidth']);let _0x1a609d=this[_0x484d7d(0x2eb)](0x3,!![]),_0xef557e=Math[_0x484d7d(0x2fd)]((Graphics['boxWidth']-_0x366aab)/0x2),_0x32c7e4=Math[_0x484d7d(0x2fd)]((Graphics[_0x484d7d(0x2f0)]-_0x1a609d)/0x2);return new Rectangle(_0xef557e,_0x32c7e4,_0x366aab,_0x1a609d);},Scene_ItemBase[_0x2260cd(0x1b6)][_0x2260cd(0x2c6)]=function(){const _0x5e200a=_0x2260cd,_0x2f959b=this['_assignButtonCommonEventsWindow'][_0x5e200a(0x220)](),_0x41e644=this['_assignButtonCommonEventsWindow'][_0x5e200a(0x19e)],_0x4e4e07=this['item']()['iconIndex'];$gameSystem[_0x5e200a(0x257)](_0x2f959b,this[_0x5e200a(0x208)]());const _0x5b22bf=$gameSystem[_0x5e200a(0x2cf)](_0x2f959b);_0x5b22bf&&_0x5b22bf[_0x5e200a(0x2e7)]?$gameSystem['clearButtonCommonEventID'](_0x41e644,_0x5b22bf):$gameSystem['clearButtonCommonEventID'](_0x41e644),$gameSystem[_0x5e200a(0x2ed)](_0x2f959b,_0x41e644),$gameSystem['setButtonCommonEventIcon'](_0x2f959b,_0x4e4e07),this[_0x5e200a(0x2d0)][_0x5e200a(0x243)](),setTimeout(this['onButtonAssistCancel'][_0x5e200a(0x2e8)](this),0x1f4);},Scene_ItemBase[_0x2260cd(0x1b6)][_0x2260cd(0x1a9)]=function(){const _0x352c7b=_0x2260cd;this['_windowLayer'][_0x352c7b(0x2b3)](this[_0x352c7b(0x2d0)]),this[_0x352c7b(0x2d0)][_0x352c7b(0x1f6)](),this[_0x352c7b(0x2d0)]=undefined,this[_0x352c7b(0x23d)][_0x352c7b(0x275)](),this[_0x352c7b(0x23d)][_0x352c7b(0x259)]();},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x24c)]=Scene_Item[_0x2260cd(0x1b6)][_0x2260cd(0x283)],Scene_Item['prototype'][_0x2260cd(0x283)]=function(){const _0x4e3d57=_0x2260cd;VisuMZ[_0x4e3d57(0x2a1)][_0x4e3d57(0x204)](this[_0x4e3d57(0x208)]())?this[_0x4e3d57(0x21b)]():VisuMZ['ButtonCommonEvents'][_0x4e3d57(0x24c)][_0x4e3d57(0x1f2)](this);},VisuMZ['ButtonCommonEvents'][_0x2260cd(0x1c6)]=Scene_Skill[_0x2260cd(0x1b6)][_0x2260cd(0x283)],Scene_Skill[_0x2260cd(0x1b6)]['onItemOk']=function(){const _0x4db7ef=_0x2260cd;VisuMZ[_0x4db7ef(0x2a1)][_0x4db7ef(0x204)](this[_0x4db7ef(0x208)]())?this[_0x4db7ef(0x21b)]():VisuMZ[_0x4db7ef(0x2a1)][_0x4db7ef(0x1c6)][_0x4db7ef(0x1f2)](this);},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x30e)]=Window_ItemList[_0x2260cd(0x1b6)][_0x2260cd(0x31e)],Window_ItemList['prototype'][_0x2260cd(0x31e)]=function(_0x515713){const _0x244e8b=_0x2260cd;return VisuMZ[_0x244e8b(0x2a1)]['CanAssignButtonCommonEvent'](_0x515713)?!![]:VisuMZ['ButtonCommonEvents']['Window_ItemList_isEnabled'][_0x244e8b(0x1f2)](this,_0x515713);},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x27c)]=Window_SkillList['prototype'][_0x2260cd(0x31e)],Window_SkillList['prototype'][_0x2260cd(0x31e)]=function(_0x4ae2e5){const _0x20ddb1=_0x2260cd;return VisuMZ['ButtonCommonEvents'][_0x20ddb1(0x204)](_0x4ae2e5)?!![]:VisuMZ['ButtonCommonEvents']['Window_SkillList_isEnabled']['call'](this,_0x4ae2e5);};function Window_AssignButtonCommonEvent(){const _0xeb0e3a=_0x2260cd;this[_0xeb0e3a(0x241)](...arguments);}Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)]=Object[_0x2260cd(0x19d)](Window_HorzCommand[_0x2260cd(0x1b6)]),Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x1cf)]=Window_AssignButtonCommonEvent,Window_AssignButtonCommonEvent['BUTTON_LABEL_ALIGN']=VisuMZ['ButtonCommonEvents'][_0x2260cd(0x1b3)][_0x2260cd(0x1af)][_0x2260cd(0x1fd)],Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)]['initialize']=function(_0x7b759d){const _0x558118=_0x2260cd;this[_0x558118(0x19e)]=0x0,this[_0x558118(0x1b5)]=[],Window_HorzCommand['prototype']['initialize'][_0x558118(0x1f2)](this,_0x7b759d);},Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)]['maxCols']=function(){const _0x493329=_0x2260cd;return this['_slots'][_0x493329(0x1ed)]||0x1;},Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x2ac)]=function(){return 0x0;},Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x1d4)]=function(){const _0x7b56a4=_0x2260cd;return Window_Scrollable[_0x7b56a4(0x1b6)]['itemHeight'][_0x7b56a4(0x1f2)](this)*0x2+0x8;},Window_AssignButtonCommonEvent['prototype'][_0x2260cd(0x1d9)]=function(_0x1fc2d3,_0x355065){const _0x17212d=_0x2260cd;this[_0x17212d(0x19e)]=_0x1fc2d3,this[_0x17212d(0x1b5)]=_0x355065,this[_0x17212d(0x243)]();let _0x1ce1a8=0x0;for(const _0x306f87 of this[_0x17212d(0x1b5)]){const _0x4de601=TextManager['stringKeyMap']['indexOf'](_0x306f87);$gameSystem[_0x17212d(0x188)](_0x4de601)===this['_commonEventID']&&(_0x1ce1a8=this['_slots']['indexOf'](_0x306f87));}this['forceSelect'](_0x1ce1a8),this[_0x17212d(0x229)]();},Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x271)]=function(){const _0x970f28=_0x2260cd;if(!this[_0x970f28(0x1b5)])return;for(const _0x2e3ea1 of this['_slots']){const _0x2f818a=TextManager[_0x970f28(0x209)][_0x970f28(0x1b4)](_0x2e3ea1),_0xa62b7=VisuMZ[_0x970f28(0x2a1)][_0x970f28(0x1b3)][_0x970f28(0x2f3)[_0x970f28(0x306)](_0x2f818a)],_0x4e5133=_0xa62b7[_0x970f28(0x203)];this[_0x970f28(0x219)](_0x4e5133,_0x970f28(0x2b1),!![],_0x2f818a);}},Window_AssignButtonCommonEvent['prototype'][_0x2260cd(0x274)]=function(_0x5d345e){const _0x315f41=_0x2260cd,_0x9525db=Window_HorzCommand['prototype']['itemRect'][_0x315f41(0x1f2)](this,_0x5d345e);return _0x9525db['y']+=this[_0x315f41(0x2f2)]()+0x8-this[_0x315f41(0x2da)]()/0x2-this[_0x315f41(0x1a7)](),_0x9525db;},Window_AssignButtonCommonEvent['prototype'][_0x2260cd(0x243)]=function(){const _0x40b8b7=_0x2260cd;Window_HorzCommand[_0x40b8b7(0x1b6)][_0x40b8b7(0x243)][_0x40b8b7(0x1f2)](this);if(!this[_0x40b8b7(0x1b5)])return;this[_0x40b8b7(0x1e1)]();},Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x1e1)]=function(){const _0x98c2e0=_0x2260cd;this[_0x98c2e0(0x287)](),this[_0x98c2e0(0x31c)](!![]);const _0x467dd8=TextManager[_0x98c2e0(0x30b)];this['drawText'](_0x467dd8,0x0,0x0,this['innerWidth'],_0x98c2e0(0x249));},Window_AssignButtonCommonEvent['prototype']['drawItem']=function(_0x11b94b){const _0x490eaa=_0x2260cd,_0x9a6eb2=this[_0x490eaa(0x2a4)](_0x11b94b),_0x5f3cab=this[_0x490eaa(0x1dc)][_0x11b94b][_0x490eaa(0x1f8)],_0x2612ad=$gameSystem[_0x490eaa(0x2e0)](_0x5f3cab),_0x314c94=_0x9a6eb2['x']+Math[_0x490eaa(0x2fd)]((_0x9a6eb2[_0x490eaa(0x1cb)]-ImageManager[_0x490eaa(0x1ef)])/0x2),_0x35dfa0=_0x9a6eb2['y']+Math[_0x490eaa(0x2fd)]((_0x9a6eb2[_0x490eaa(0x227)]-ImageManager[_0x490eaa(0x2d8)]/0x2)/0x2);this['drawIcon'](_0x2612ad,_0x314c94,_0x35dfa0),this[_0x490eaa(0x287)](),this[_0x490eaa(0x293)]['fontFace']=$gameSystem[_0x490eaa(0x2cd)](),this[_0x490eaa(0x293)]['fontSize']=$gameSystem[_0x490eaa(0x312)](),this[_0x490eaa(0x31c)](this[_0x490eaa(0x1b8)](_0x11b94b));const _0x28fe07=Window_AssignButtonCommonEvent[_0x490eaa(0x1d1)];this[_0x490eaa(0x247)](this['commandName'](_0x11b94b),_0x9a6eb2['x'],_0x9a6eb2['y'],_0x9a6eb2['width'],_0x28fe07);},Window_AssignButtonCommonEvent[_0x2260cd(0x1b6)][_0x2260cd(0x31f)]=function(){SoundManager['playEquip']();},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x21e)]=function(_0x578c96,_0x35f3ec){const _0x471ab7=_0x2260cd;if(_0x578c96===_0x471ab7(0x1ca))return $dataSkills[_0x35f3ec];if(_0x578c96===_0x471ab7(0x208))return $dataItems[_0x35f3ec];if(_0x578c96===_0x471ab7(0x26c))return $dataWeapons[_0x35f3ec];if(_0x578c96===_0x471ab7(0x1e5))return $dataArmors[_0x35f3ec];return null;};Imported[_0x2260cd(0x24d)]&&Scene_Options[_0x2260cd(0x30f)]&&(VisuMZ[_0x2260cd(0x2a1)]['Scene_RebindKeyboard_isForbiddenKeycode']=Scene_RebindKeyboard[_0x2260cd(0x1b6)][_0x2260cd(0x1b7)],Scene_RebindKeyboard[_0x2260cd(0x1b6)]['isForbiddenKeycode']=function(_0x121c75){const _0xfc2217=_0x2260cd;if(_0x121c75>=0x30&&_0x121c75<=0x39)return!![];return VisuMZ[_0xfc2217(0x2a1)][_0xfc2217(0x239)][_0xfc2217(0x1f2)](this,_0x121c75);},VisuMZ[_0x2260cd(0x2a1)][_0x2260cd(0x2ef)]=Input[_0x2260cd(0x21d)],Input[_0x2260cd(0x21d)]=function(_0x41e9f5){const _0x18d156=_0x2260cd;if(_0x41e9f5>=0x41&&_0x41e9f5<=0x5a)return!![];if(_0x41e9f5>=0xba&&_0x41e9f5<=0xc0)return!![];if(_0x41e9f5>=0xdb&&_0x41e9f5<=0xde)return!![];return VisuMZ[_0x18d156(0x2a1)][_0x18d156(0x2ef)][_0x18d156(0x1f2)](this,_0x41e9f5);});