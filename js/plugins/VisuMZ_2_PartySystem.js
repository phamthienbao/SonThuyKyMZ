//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.35] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 * 
 * Temporary Parties
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 * 
 * VisuMZ_2_BattleSystemSTB
 * 
 * With Battle System - STB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Standard Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 * 
 * === Temporary Parties Plugin Commands ===
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (Normal)
 * - Creates a temporary party with specific actors.
 * - Can't be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to be added to the temporary party until the
 *     temporary party is disbanded.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (JS)
 * - Creates a temporary party selected with JavaScript.
 * - Can't be used in battle.
 * 
 *   JS: Actor ID(s):
 *   - Use JavaScript to determine which actor(s) are added to the temporary
 *     party until disbanded.
 * 
 * ---
 * 
 * Temp: Disband Temporary Party
 * - Clears temporary party.
 * - Can't be used in battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.35: August 14, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if the battle had no battle back setting and is using a
 *    map snapshot, the snapshot would be overwritten if the player enters the
 *    party change menu from battle. This should no longer occur and the map
 *    snapshot will be preserved. Fix made by Olivia.
 * 
 * Version 1.34: July 17, 2025
 * * Compatibility Update!
 * ** Added better compatibility with TPB when using the in-battle Party switch
 *    command from the Party Command Window. Update made by Irina.
 * 
 * Version 1.33: May 15, 2025
 * * Compatibility Update!
 * ** Added better compatibility for $gameParty.swapOrder function to allow it
 *    to work on the map. Update made by Irina.
 * 
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon adding new members if the
 *    VisuStella Core Engine wasn't installed. Fix made by Arisu.
 * 
 * Version 1.31: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added to "Major Changes":
 * *** Temporary Parties
 * **** Temporary parties are very specific parties that will overwrite
 *      whatever the player has set as a party. These can include current party
 *      members or even actors that haven't joined. The temporary party cannot
 *      be changed nor can the positions of said party members can be changed.
 * **** When a temporary party is present, menu and battle commands involving
 *      changing party members will be disabled.
 * **** Once the temporary party is disbanded, the player's selected party will
 *      be available once again as well as all of the functions to change party
 *      members and their positions.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Temp: Create Temporary Party (Normal)
 * **** Creates a temporary party with specific actors.
 * *** Temp: Create Temporary Party (JS)
 * **** Creates a temporary party selected with JavaScript.
 * *** Temp: Disband Temporary Party
 * **** Clears temporary party.
 * 
 * Version 1.30: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with FTB, ETB, and PTB did not replace
 *    the newely added party member on the turn order timeline. Fix by Olivia.
 * 
 * Version 1.29: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with PTB did not register correctly.
 *    Fix made by Olivia.
 * 
 * Version 1.28: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: February 16, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * Feature Update!
 * ** When holding the "up" keyboard button with the reserve window active, the
 *    return to the active party window will no longer happen unless the "up"
 *    key is released and then pressed again. Update made by Olivia.
 * 
 * Version 1.26: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
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
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Temp
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyNormal
 * @text Temp: Create Temporary Party (Normal)
 * @desc Creates a temporary party with specific actors.
 * Can't be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to be added to the temporary party
 * until the temporary party is disbanded.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyJS
 * @text Temp: Create Temporary Party (JS)
 * @desc Creates a temporary party selected with JavaScript.
 * Can't be used in battle.
 *
 * @arg ActorsJS:func
 * @text JS: Actor ID(s)
 * @type note
 * @desc Use JavaScript to determine which actor(s) are added to
 * the temporary party until disbanded.
 * @default "// Declare Actor ID's\nconst actorIDs = [];\n\n// Add Actor ID's\nactorIDs.push(1);\nactorIDs.push(2);\nactorIDs.push(3);\nactorIDs.push(4);\n\n// Return Actor IDs\nreturn actorIDs;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempDisbandTempParty
 * @text Temp: Disband Temporary Party
 * @desc Clears temporary party.
 * Can't be used in battle.
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
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
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
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
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
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
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
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
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
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
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
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
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
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
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
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
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x29f489=_0x35e2;(function(_0xfc2b4a,_0x2e2984){const _0x228e9e=_0x35e2,_0x9873c9=_0xfc2b4a();while(!![]){try{const _0x40ab2f=-parseInt(_0x228e9e(0x109))/0x1*(parseInt(_0x228e9e(0x120))/0x2)+-parseInt(_0x228e9e(0x285))/0x3+parseInt(_0x228e9e(0x27e))/0x4*(parseInt(_0x228e9e(0xf5))/0x5)+parseInt(_0x228e9e(0x1d4))/0x6*(parseInt(_0x228e9e(0x29b))/0x7)+parseInt(_0x228e9e(0x16c))/0x8*(parseInt(_0x228e9e(0xea))/0x9)+parseInt(_0x228e9e(0x1b4))/0xa+-parseInt(_0x228e9e(0x1ab))/0xb*(parseInt(_0x228e9e(0x22d))/0xc);if(_0x40ab2f===_0x2e2984)break;else _0x9873c9['push'](_0x9873c9['shift']());}catch(_0x25b9f5){_0x9873c9['push'](_0x9873c9['shift']());}}}(_0x4db3,0x54129));var label=_0x29f489(0xff),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x29f489(0x1f5)](function(_0x56ee21){const _0x21b922=_0x29f489;return _0x56ee21[_0x21b922(0x24e)]&&_0x56ee21['description'][_0x21b922(0x14c)]('['+label+']');})[0x0];VisuMZ[label][_0x29f489(0x233)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x4abeb1,_0x33edee){const _0x1c51bc=_0x29f489;for(const _0x4e764e in _0x33edee){if(_0x4e764e[_0x1c51bc(0xe6)](/(.*):(.*)/i)){const _0x9ce61a=String(RegExp['$1']),_0x28a7d8=String(RegExp['$2'])['toUpperCase']()[_0x1c51bc(0xef)]();let _0x2dc20c,_0x5a7837,_0x34570e;switch(_0x28a7d8){case _0x1c51bc(0x289):_0x2dc20c=_0x33edee[_0x4e764e]!==''?Number(_0x33edee[_0x4e764e]):0x0;break;case _0x1c51bc(0x2e3):_0x5a7837=_0x33edee[_0x4e764e]!==''?JSON['parse'](_0x33edee[_0x4e764e]):[],_0x2dc20c=_0x5a7837['map'](_0x27c1e6=>Number(_0x27c1e6));break;case'EVAL':_0x2dc20c=_0x33edee[_0x4e764e]!==''?eval(_0x33edee[_0x4e764e]):null;break;case _0x1c51bc(0x1c0):_0x5a7837=_0x33edee[_0x4e764e]!==''?JSON[_0x1c51bc(0x2c8)](_0x33edee[_0x4e764e]):[],_0x2dc20c=_0x5a7837[_0x1c51bc(0x200)](_0x3640cf=>eval(_0x3640cf));break;case _0x1c51bc(0x1b3):_0x2dc20c=_0x33edee[_0x4e764e]!==''?JSON[_0x1c51bc(0x2c8)](_0x33edee[_0x4e764e]):'';break;case _0x1c51bc(0xf2):_0x5a7837=_0x33edee[_0x4e764e]!==''?JSON['parse'](_0x33edee[_0x4e764e]):[],_0x2dc20c=_0x5a7837['map'](_0x370f80=>JSON[_0x1c51bc(0x2c8)](_0x370f80));break;case _0x1c51bc(0x302):_0x2dc20c=_0x33edee[_0x4e764e]!==''?new Function(JSON[_0x1c51bc(0x2c8)](_0x33edee[_0x4e764e])):new Function(_0x1c51bc(0x168));break;case'ARRAYFUNC':_0x5a7837=_0x33edee[_0x4e764e]!==''?JSON[_0x1c51bc(0x2c8)](_0x33edee[_0x4e764e]):[],_0x2dc20c=_0x5a7837[_0x1c51bc(0x200)](_0x143de1=>new Function(JSON[_0x1c51bc(0x2c8)](_0x143de1)));break;case _0x1c51bc(0x2ec):_0x2dc20c=_0x33edee[_0x4e764e]!==''?String(_0x33edee[_0x4e764e]):'';break;case _0x1c51bc(0x2aa):_0x5a7837=_0x33edee[_0x4e764e]!==''?JSON['parse'](_0x33edee[_0x4e764e]):[],_0x2dc20c=_0x5a7837['map'](_0x566b20=>String(_0x566b20));break;case _0x1c51bc(0x2b2):_0x34570e=_0x33edee[_0x4e764e]!==''?JSON[_0x1c51bc(0x2c8)](_0x33edee[_0x4e764e]):{},_0x2dc20c=VisuMZ[_0x1c51bc(0x288)]({},_0x34570e);break;case _0x1c51bc(0x18d):_0x5a7837=_0x33edee[_0x4e764e]!==''?JSON['parse'](_0x33edee[_0x4e764e]):[],_0x2dc20c=_0x5a7837[_0x1c51bc(0x200)](_0xa78f71=>VisuMZ['ConvertParams']({},JSON[_0x1c51bc(0x2c8)](_0xa78f71)));break;default:continue;}_0x4abeb1[_0x9ce61a]=_0x2dc20c;}}return _0x4abeb1;},(_0x3b88bb=>{const _0x3c4d40=_0x29f489,_0x5d2611=_0x3b88bb[_0x3c4d40(0x1ee)];for(const _0x167253 of dependencies){if(!Imported[_0x167253]){alert(_0x3c4d40(0x262)[_0x3c4d40(0x2ba)](_0x5d2611,_0x167253)),SceneManager[_0x3c4d40(0x14f)]();break;}}const _0x1dfd05=_0x3b88bb[_0x3c4d40(0x29d)];if(_0x1dfd05['match'](/\[Version[ ](.*?)\]/i)){const _0x286a0e=Number(RegExp['$1']);_0x286a0e!==VisuMZ[label][_0x3c4d40(0x1c3)]&&(alert(_0x3c4d40(0x25b)[_0x3c4d40(0x2ba)](_0x5d2611,_0x286a0e)),SceneManager[_0x3c4d40(0x14f)]());}if(_0x1dfd05[_0x3c4d40(0xe6)](/\[Tier[ ](\d+)\]/i)){const _0x2778e5=Number(RegExp['$1']);_0x2778e5<tier?(alert(_0x3c4d40(0x118)[_0x3c4d40(0x2ba)](_0x5d2611,_0x2778e5,tier)),SceneManager[_0x3c4d40(0x14f)]()):tier=Math[_0x3c4d40(0x277)](_0x2778e5,tier);}VisuMZ[_0x3c4d40(0x288)](VisuMZ[label][_0x3c4d40(0x233)],_0x3b88bb[_0x3c4d40(0x1c9)]);})(pluginData),PluginManager[_0x29f489(0x2d9)](pluginData['name'],_0x29f489(0x259),_0x3e89aa=>{const _0x282cae=_0x29f489;SceneManager[_0x282cae(0x17c)](Scene_Party);}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],'ChangeMaxBattleMembers',_0x46e1b3=>{const _0x2c1097=_0x29f489;if($gameParty[_0x2c1097(0x12d)]())return;VisuMZ[_0x2c1097(0x288)](_0x46e1b3,_0x46e1b3);const _0xf67fdd=_0x46e1b3[_0x2c1097(0x250)];$gameParty[_0x2c1097(0x2b6)](_0xf67fdd);}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],_0x29f489(0x1f4),_0x3d8faa=>{const _0x26220a=_0x29f489;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x3d8faa,_0x3d8faa);const _0x2f096b=_0x3d8faa[_0x26220a(0x2dd)];for(const _0x19fdaa of _0x2f096b){$gameParty[_0x26220a(0x124)](_0x19fdaa);}$gamePlayer[_0x26220a(0x20f)]();}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],_0x29f489(0x2f9),_0x4b25b3=>{const _0x7a84c6=_0x29f489;if(!SceneManager[_0x7a84c6(0x256)]())return;VisuMZ[_0x7a84c6(0x288)](_0x4b25b3,_0x4b25b3);const _0x30a1b8=_0x4b25b3[_0x7a84c6(0x2dd)];for(const _0x500a8b of _0x30a1b8){if($gameParty['battleMembers']()[_0x7a84c6(0x255)]<=0x1)break;$gameParty[_0x7a84c6(0x103)](_0x500a8b);}$gamePlayer[_0x7a84c6(0x20f)]();}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],'MovePartyIndexToReserve',_0x223e0d=>{const _0x2521fc=_0x29f489;if(!SceneManager[_0x2521fc(0x256)]())return;if($gameParty[_0x2521fc(0x177)]()[_0x2521fc(0x255)]<=0x1)return;if(!$gameParty['_battleMembers'])return;if($gameParty[_0x2521fc(0x2ad)]['length']<=0x0)return;VisuMZ[_0x2521fc(0x288)](_0x223e0d,_0x223e0d);const _0x2f7306=_0x223e0d[_0x2521fc(0x138)],_0x161ddb=$gameParty[_0x2521fc(0x2ad)][_0x2f7306];$gameParty[_0x2521fc(0x103)](_0x161ddb),$gamePlayer[_0x2521fc(0x20f)]();}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],_0x29f489(0x2a8),_0x131270=>{const _0x4b26b3=_0x29f489;if(!SceneManager['isSceneMap']())return;if($gameParty[_0x4b26b3(0x177)]()['length']>=$gameParty[_0x4b26b3(0x1d2)]())return;if($gameParty[_0x4b26b3(0x222)]()['length']<=0x0)return;const _0xff603d=$gameParty[_0x4b26b3(0x222)](),_0x3c2e37=_0xff603d[Math[_0x4b26b3(0x1f7)](Math[_0x4b26b3(0x29c)]()*_0xff603d['length'])],_0x24bb21=_0x3c2e37['actorId']();$gameParty[_0x4b26b3(0x124)](_0x24bb21),$gamePlayer['refresh']();}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],'LockPartyMembers',_0x20dd78=>{const _0x459777=_0x29f489;VisuMZ[_0x459777(0x288)](_0x20dd78,_0x20dd78);const _0x475f82=_0x20dd78[_0x459777(0x2dd)][_0x459777(0x200)](_0x253273=>$gameActors[_0x459777(0x1a3)](_0x253273))[_0x459777(0x257)](null),_0x686ad6=_0x20dd78['Lock'];for(const _0x5318e3 of _0x475f82){if(!_0x5318e3)continue;_0x5318e3[_0x459777(0x273)](_0x686ad6);}}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],_0x29f489(0x229),_0x868eb3=>{const _0x25069e=_0x29f489;VisuMZ[_0x25069e(0x288)](_0x868eb3,_0x868eb3);const _0x3ed2a7=_0x868eb3[_0x25069e(0x2dd)][_0x25069e(0x200)](_0x25cf78=>$gameActors[_0x25069e(0x1a3)](_0x25cf78))[_0x25069e(0x257)](null),_0x164f01=_0x868eb3[_0x25069e(0x1a8)];for(const _0x4ddbb1 of _0x3ed2a7){if(!_0x4ddbb1)continue;_0x4ddbb1[_0x25069e(0x1cd)](_0x164f01);}}),PluginManager['registerCommand'](pluginData[_0x29f489(0x1ee)],_0x29f489(0x2be),_0x1c7dd3=>{const _0x1e5d42=_0x29f489;if($gameParty[_0x1e5d42(0x12d)]())return;VisuMZ[_0x1e5d42(0x288)](_0x1c7dd3,_0x1c7dd3);const _0x2092f9=_0x1c7dd3[_0x1e5d42(0x2dd)]||[];if(_0x2092f9[_0x1e5d42(0x255)]<=0x0)return;$gameParty['createForcedParty'](_0x2092f9);}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],'TempCreatePartyJS',_0x2e3477=>{const _0x5e57bd=_0x29f489;if($gameParty[_0x5e57bd(0x12d)]())return;VisuMZ[_0x5e57bd(0x288)](_0x2e3477,_0x2e3477);let _0x691b4c=[];try{_0x691b4c=_0x2e3477[_0x5e57bd(0x24a)]()||[];}catch(_0x261ad3){console[_0x5e57bd(0x10f)](_0x5e57bd(0xe3)),console[_0x5e57bd(0x10f)](_0x261ad3);return;}if(_0x691b4c['length']<=0x0)return;$gameParty[_0x5e57bd(0x101)](_0x691b4c);}),PluginManager[_0x29f489(0x2d9)](pluginData[_0x29f489(0x1ee)],_0x29f489(0x261),_0x292ed2=>{const _0x3a078b=_0x29f489;if($gameParty['inBattle']())return;VisuMZ[_0x3a078b(0x288)](_0x292ed2,_0x292ed2),$gameParty[_0x3a078b(0x185)]();}),ImageManager['lockPartyMemberIcon']=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)]['General']['LockIcon'],ImageManager[_0x29f489(0xf7)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x1e4)][_0x29f489(0x1a6)],TextManager[_0x29f489(0x24b)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)][_0x29f489(0x25c)],TextManager['reserveParty']=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)]['ReserveParty'],TextManager['statusParty']=VisuMZ[_0x29f489(0xff)]['Settings'][_0x29f489(0x27b)][_0x29f489(0x2b0)],TextManager['emptyPartyMember']=VisuMZ['PartySystem'][_0x29f489(0x233)]['Vocab'][_0x29f489(0x20c)],TextManager[_0x29f489(0x251)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)]['Remove'],TextManager[_0x29f489(0x21e)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)][_0x29f489(0x23e)],TextManager['assistRemovePartyMember']=VisuMZ['PartySystem'][_0x29f489(0x233)][_0x29f489(0x27b)][_0x29f489(0x20b)],TextManager['assistSortPartyMembers']=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)][_0x29f489(0x1de)],TextManager[_0x29f489(0x246)]=VisuMZ[_0x29f489(0xff)]['Settings'][_0x29f489(0x27b)]['AssistSwapIn'],TextManager['assistSwapOutPartyMember']=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)]['AssistSwapOut'],ColorManager[_0x29f489(0x249)]=function(_0x3b64e7){const _0x279cd5=_0x29f489;return _0x3b64e7=String(_0x3b64e7),_0x3b64e7['match'](/#(.*)/i)?_0x279cd5(0x238)['format'](String(RegExp['$1'])):this['textColor'](Number(_0x3b64e7));},SceneManager['isSceneBattle']=function(){const _0x52ffb4=_0x29f489;return this[_0x52ffb4(0x271)]&&this[_0x52ffb4(0x271)]['constructor']===Scene_Battle;},SceneManager['isSceneParty']=function(){const _0x1e90c0=_0x29f489;return this[_0x1e90c0(0x271)]&&this[_0x1e90c0(0x271)][_0x1e90c0(0x306)]===Scene_Party;},SceneManager['isSceneMap']=function(){const _0x48d35f=_0x29f489;return this['_scene']&&this[_0x48d35f(0x271)]['constructor']===Scene_Map;},VisuMZ[_0x29f489(0xff)]['BattleManager_setup']=BattleManager[_0x29f489(0x19d)],BattleManager[_0x29f489(0x19d)]=function(_0x194a7e,_0x1082d6,_0x586dff){const _0x341357=_0x29f489;VisuMZ[_0x341357(0xff)][_0x341357(0x270)][_0x341357(0x26a)](this,_0x194a7e,_0x1082d6,_0x586dff),$gameParty[_0x341357(0x1e0)]();},BattleManager[_0x29f489(0x1e5)]=function(_0x31439c,_0x184b53){const _0x212fa6=_0x29f489;if(_0x31439c===_0x184b53)return;if(!_0x31439c)return;if(!_0x184b53)return;if(this[_0x212fa6(0x2ed)]===_0x31439c)this['_target']=_0x184b53;while(this['_targets'][_0x212fa6(0x14c)](_0x31439c)){const _0x57b030=this[_0x212fa6(0xf4)][_0x212fa6(0x295)](_0x31439c);this[_0x212fa6(0xf4)][_0x57b030]=_0x184b53;}},VisuMZ[_0x29f489(0xff)][_0x29f489(0x1dc)]=Game_Battler['prototype']['onBattleStart'],Game_Battler[_0x29f489(0x26d)]['onBattleStart']=function(_0x583c86){const _0xca85ea=_0x29f489;VisuMZ[_0xca85ea(0xff)][_0xca85ea(0x1dc)][_0xca85ea(0x26a)](this,_0x583c86);if(this[_0xca85ea(0x188)]())this['clearPartySwitchCommandCooldown']();this['clearDamagePopup']();},VisuMZ[_0x29f489(0xff)][_0x29f489(0x1e2)]=Game_Battler[_0x29f489(0x26d)][_0x29f489(0xf0)],Game_Battler['prototype'][_0x29f489(0xf0)]=function(){const _0x49b270=_0x29f489;VisuMZ[_0x49b270(0xff)][_0x49b270(0x1e2)][_0x49b270(0x26a)](this);if(this[_0x49b270(0x188)]()&&$gameParty[_0x49b270(0x12d)]())this['updateBattlePartySwitchCooldown']();},VisuMZ['PartySystem'][_0x29f489(0x304)]=Game_Actor[_0x29f489(0x26d)][_0x29f489(0x19d)],Game_Actor[_0x29f489(0x26d)][_0x29f489(0x19d)]=function(_0x5ebef4){const _0x57490f=_0x29f489;VisuMZ[_0x57490f(0xff)]['Game_Actor_setup']['call'](this,_0x5ebef4),this[_0x57490f(0x2c0)](),this['clearPartySwitchCommandCooldown']();},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x2c0)]=function(){const _0xc07862=_0x29f489;this['_partyLocked']=![],this[_0xc07862(0x14b)]=![];},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x267)]=function(){const _0x1e4e61=_0x29f489;if(this[_0x1e4e61(0x1aa)]===undefined)this[_0x1e4e61(0x2c0)]();return!this[_0x1e4e61(0x1aa)];},Game_Actor['prototype'][_0x29f489(0x273)]=function(_0x305ab7){const _0x34880e=_0x29f489;if(this['_partyLocked']===undefined)this[_0x34880e(0x2c0)]();this[_0x34880e(0x1aa)]=_0x305ab7;},Game_Actor['prototype']['isRequiredInParty']=function(){const _0x5620f1=_0x29f489;if(this[_0x5620f1(0x14b)]===undefined)this[_0x5620f1(0x2c0)]();return this[_0x5620f1(0x14b)];},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x1cd)]=function(_0x579ca9){const _0x422271=_0x29f489;if(this['_partyRequired']===undefined)this[_0x422271(0x2c0)]();this[_0x422271(0x14b)]=_0x579ca9;},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x21b)]=function(){const _0x95da84=_0x29f489;this[_0x95da84(0x2a9)]=0x0;},Game_Actor['prototype'][_0x29f489(0x19e)]=function(){const _0x237db6=_0x29f489;if(this[_0x237db6(0x2a9)]===undefined)this['clearPartySwitchCommandCooldown']();if(!this['isFormationChangeOk']())return![];if(this[_0x237db6(0x292)]())return![];return this[_0x237db6(0x2a9)]<=0x0;},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x2a2)]=function(){const _0x1c3f14=_0x29f489;if(this[_0x1c3f14(0x2a9)]===undefined)this['clearPartySwitchCommandCooldown']();return this[_0x1c3f14(0x2a9)];},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x165)]=function(_0x3875ea){const _0x5dfc64=_0x29f489;if(this[_0x5dfc64(0x2a9)]===undefined)this[_0x5dfc64(0x21b)]();this['_partySwitchBattleCommandCooldown']=_0x3875ea||0x0;},Game_Actor[_0x29f489(0x26d)][_0x29f489(0xfb)]=function(){const _0x36be24=_0x29f489;if(this[_0x36be24(0x2a9)]===undefined)this[_0x36be24(0x21b)]();const _0x147b45=VisuMZ[_0x36be24(0xff)][_0x36be24(0x233)][_0x36be24(0x1e4)][_0x36be24(0x10b)];this[_0x36be24(0x165)](_0x147b45);},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x243)]=function(){const _0x1e9019=_0x29f489;if(this[_0x1e9019(0x2a9)]===undefined)this[_0x1e9019(0x21b)]();this[_0x1e9019(0x2a9)]--;},Game_Actor[_0x29f489(0x26d)][_0x29f489(0x107)]=function(_0x2a9eb9){const _0x38ab6d=_0x29f489;Imported[_0x38ab6d(0x2c2)]&&BattleManager[_0x38ab6d(0x1b2)]()&&BattleManager[_0x38ab6d(0x2d4)]();Imported[_0x38ab6d(0x2ee)]&&BattleManager[_0x38ab6d(0x28a)]()&&(BattleManager[_0x38ab6d(0x220)](),BattleManager[_0x38ab6d(0x286)]=this,BattleManager[_0x38ab6d(0x129)]=this);if(Imported[_0x38ab6d(0x26f)]&&BattleManager[_0x38ab6d(0xe4)]()){BattleManager[_0x38ab6d(0x286)]=undefined,BattleManager[_0x38ab6d(0x129)]=this;const _0x49866f=BattleManager['_actionBattlers'][_0x38ab6d(0x295)](_0x2a9eb9);BattleManager[_0x38ab6d(0x18b)][_0x49866f]=this,BattleManager[_0x38ab6d(0x28d)]();}Imported['VisuMZ_2_BattleSystemFTB']&&BattleManager[_0x38ab6d(0x181)]()&&(BattleManager[_0x38ab6d(0x286)]=this,BattleManager[_0x38ab6d(0x129)]=this,BattleManager[_0x38ab6d(0x194)](_0x2a9eb9,this));Imported[_0x38ab6d(0x152)]&&BattleManager[_0x38ab6d(0x2a0)]()&&(BattleManager[_0x38ab6d(0x286)]=this,BattleManager[_0x38ab6d(0x129)]=this,BattleManager['replaceActionBattlersPartySwitch'](_0x2a9eb9,this));Imported[_0x38ab6d(0x164)]&&BattleManager[_0x38ab6d(0x2e5)]()&&(BattleManager[_0x38ab6d(0x286)]=this,BattleManager[_0x38ab6d(0x129)]=this,BattleManager[_0x38ab6d(0x194)](_0x2a9eb9,this));if(Imported[_0x38ab6d(0x29a)]&&BattleManager[_0x38ab6d(0xfd)]()){BattleManager['_subject']=this,BattleManager[_0x38ab6d(0x129)]=this;for(let _0x2c56db=0x0;_0x2c56db<BattleManager['_actionBattlers'][_0x38ab6d(0x255)];_0x2c56db++){const _0x28e30e=BattleManager['_actionBattlers'][_0x2c56db];_0x28e30e===_0x2a9eb9&&(BattleManager[_0x38ab6d(0x18b)][_0x2c56db]=this);}for(let _0x455a06=0x0;_0x455a06<BattleManager[_0x38ab6d(0x1d9)]['length'];_0x455a06++){const _0x551962=BattleManager[_0x38ab6d(0x1d9)][_0x455a06];_0x551962===_0x2a9eb9&&(BattleManager[_0x38ab6d(0x1d9)][_0x455a06]=this);}}if(Imported[_0x38ab6d(0x275)]&&BattleManager[_0x38ab6d(0x19a)]()){const _0x41dca9=_0x2a9eb9[_0x38ab6d(0x241)](),_0x20d91f=_0x2a9eb9[_0x38ab6d(0xed)]();this[_0x38ab6d(0x106)](_0x41dca9,_0x20d91f);}},BattleManager['replaceActionBattlersPartySwitch']=function(_0x2661bd,_0x23ecc5){const _0x4c535a=_0x29f489;this[_0x4c535a(0x18b)]=this[_0x4c535a(0x18b)]['map'](_0x2ce799=>_0x2ce799===_0x2661bd?_0x23ecc5:_0x2ce799);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x13f)]=Game_Unit[_0x29f489(0x26d)][_0x29f489(0x12d)],Game_Unit['prototype'][_0x29f489(0x12d)]=function(){const _0x213cd9=_0x29f489;if(SceneManager['isSceneParty']())return![];return VisuMZ[_0x213cd9(0xff)][_0x213cd9(0x13f)]['call'](this);},Game_Party[_0x29f489(0x2b5)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x1e4)][_0x29f489(0x178)],VisuMZ[_0x29f489(0xff)][_0x29f489(0xf6)]=Game_Party[_0x29f489(0x26d)][_0x29f489(0x122)],Game_Party[_0x29f489(0x26d)][_0x29f489(0x122)]=function(){const _0x2fbc86=_0x29f489;VisuMZ[_0x2fbc86(0xff)]['Game_Party_initialize'][_0x2fbc86(0x26a)](this),this[_0x2fbc86(0x1e0)](),this[_0x2fbc86(0x119)](),this['initBattleMembers']();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x1e0)]=function(){const _0x34d5ab=_0x29f489;this[_0x34d5ab(0x236)]=0x0;},Game_Party[_0x29f489(0x26d)][_0x29f489(0x19e)]=function(){const _0x322724=_0x29f489;if(this[_0x322724(0x236)]===undefined)this[_0x322724(0x1e0)]();return this[_0x322724(0x236)]<=0x0;},Game_Party[_0x29f489(0x26d)][_0x29f489(0x2a2)]=function(){const _0xd257e8=_0x29f489;if(this[_0xd257e8(0x236)]===undefined)this[_0xd257e8(0x1e0)]();return this[_0xd257e8(0x236)];},Game_Party[_0x29f489(0x26d)][_0x29f489(0x165)]=function(_0x44e59a){const _0x3acba8=_0x29f489;if(this[_0x3acba8(0x236)]===undefined)this[_0x3acba8(0x1e0)]();this['_partySystemBattleCommandCooldown']=_0x44e59a;},Game_Party[_0x29f489(0x26d)][_0x29f489(0xfb)]=function(){const _0x55c01f=_0x29f489;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x55c01f(0x1e0)]();this[_0x55c01f(0x236)]=VisuMZ[_0x55c01f(0xff)]['Settings']['General'][_0x55c01f(0x2cb)]||0x0;},Game_Party[_0x29f489(0x26d)]['updateBattlePartySwitchCooldown']=function(){const _0x487995=_0x29f489;if(this[_0x487995(0x236)]===undefined)this[_0x487995(0x1e0)]();this[_0x487995(0x236)]--;},Game_Party[_0x29f489(0x26d)][_0x29f489(0x119)]=function(){const _0x364549=_0x29f489;this[_0x364549(0x25e)]=0x0;},Game_Party[_0x29f489(0x26d)][_0x29f489(0x2b6)]=function(_0xe0c8f3){const _0x573b9e=_0x29f489;this[_0x573b9e(0x25e)]=_0xe0c8f3,this[_0x573b9e(0x2c5)](!![]),$gamePlayer&&$gamePlayer[_0x573b9e(0x20a)]()&&$gamePlayer[_0x573b9e(0x20a)]()[_0x573b9e(0x2b6)]();},Game_Followers[_0x29f489(0x26d)]['changeMaxBattleMembers']=function(){const _0x252827=_0x29f489;if(!SceneManager[_0x252827(0x256)]())return;this[_0x252827(0x19d)]();const _0x1ed6eb=$gameMap[_0x252827(0x1f3)](),_0x423084=$gamePlayer['x'],_0x3608ac=$gamePlayer['y'],_0x365e94=$gamePlayer['direction']();$gameTemp[_0x252827(0x189)]=!![],$gamePlayer[_0x252827(0x154)](_0x1ed6eb,_0x423084,_0x3608ac,_0x365e94,0x2),setTimeout(this['clearBypassAutoSave'][_0x252827(0x1d6)](this),0x7d0);},Game_Followers[_0x29f489(0x26d)][_0x29f489(0x27c)]=function(){const _0x595c0f=_0x29f489;$gameTemp[_0x595c0f(0x189)]=![];},VisuMZ[_0x29f489(0xff)][_0x29f489(0x133)]=Scene_Base[_0x29f489(0x26d)][_0x29f489(0x1ac)],Scene_Base[_0x29f489(0x26d)][_0x29f489(0x1ac)]=function(){const _0x3480a7=_0x29f489;if($gameTemp[_0x3480a7(0x189)])return![];return VisuMZ[_0x3480a7(0xff)][_0x3480a7(0x133)][_0x3480a7(0x26a)](this);},Game_Party[_0x29f489(0x26d)][_0x29f489(0x1d2)]=function(){const _0x20b63a=_0x29f489;if(this[_0x20b63a(0x25e)]===undefined)this[_0x20b63a(0x2c5)]();let _0x3cf263=this[_0x20b63a(0x25e)]||Game_Party[_0x20b63a(0x2b5)];return Imported['VisuMZ_2_BattleGridSystem']&&BattleManager[_0x20b63a(0x1cc)]()&&(_0x3cf263=_0x3cf263[_0x20b63a(0x23f)](0x1,0x14)),_0x3cf263;},Game_Party[_0x29f489(0x26d)]['checkInitBattleMembers']=function(){const _0x5d6007=_0x29f489;if(this[_0x5d6007(0x25e)]===undefined)this[_0x5d6007(0x2c5)]();if(!this[_0x5d6007(0x2ad)])this[_0x5d6007(0x2c5)]();while(this[_0x5d6007(0x2ad)][_0x5d6007(0x255)]<this[_0x5d6007(0x25e)]){this[_0x5d6007(0x2ad)][_0x5d6007(0x17c)](0x0);}},Game_Party[_0x29f489(0x26d)][_0x29f489(0x2c5)]=function(_0x56a634){const _0x5234f5=_0x29f489;!_0x56a634&&(this[_0x5234f5(0x25e)]=Game_Party[_0x5234f5(0x2b5)]);this[_0x5234f5(0x2ad)]=this[_0x5234f5(0x145)][_0x5234f5(0x2c4)](0x0,this[_0x5234f5(0x25e)]);while(this[_0x5234f5(0x2ad)][_0x5234f5(0x255)]<this['_battleMaxSize']){this[_0x5234f5(0x2ad)][_0x5234f5(0x17c)](0x0);}},Game_Party[_0x29f489(0x26d)][_0x29f489(0x177)]=function(){const _0xe695d8=_0x29f489;if(Imported[_0xe695d8(0x275)]&&SceneManager[_0xe695d8(0x126)]())return this['rawBattleMembers'](!![]);return this['rawBattleMembers']()[_0xe695d8(0x1f5)](_0x32f226=>!!_0x32f226);},Game_Party[_0x29f489(0x26d)][_0x29f489(0x1e8)]=function(_0x104a28){const _0x3184e3=_0x29f489;this[_0x3184e3(0x112)]();const _0x27795e=this[_0x3184e3(0x2ad)][_0x3184e3(0x200)](_0x16f3c7=>$gameActors['actor'](_0x16f3c7));if(_0x104a28)return _0x27795e;return SceneManager[_0x3184e3(0x12b)]()?_0x27795e:_0x27795e[_0x3184e3(0x1f5)](_0x2e9358=>_0x2e9358&&_0x2e9358[_0x3184e3(0x1bf)]());},Game_Party[_0x29f489(0x26d)][_0x29f489(0x222)]=function(){const _0x52cd99=_0x29f489,_0x1e4e08=this[_0x52cd99(0x177)]();return this[_0x52cd99(0x175)]()[_0x52cd99(0x1f5)](_0x35f750=>!_0x1e4e08[_0x52cd99(0x14c)](_0x35f750));},VisuMZ[_0x29f489(0xff)][_0x29f489(0xe1)]=Game_Party[_0x29f489(0x26d)][_0x29f489(0x208)],Game_Party[_0x29f489(0x26d)][_0x29f489(0x208)]=function(){const _0x4ac19e=_0x29f489;VisuMZ[_0x4ac19e(0xff)]['Game_Party_setupStartingMembers'][_0x4ac19e(0x26a)](this),this['initBattleMembers']();},VisuMZ['PartySystem']['Game_Party_setupBattleTest']=Game_Party['prototype']['setupBattleTest'],Game_Party[_0x29f489(0x26d)]['setupBattleTest']=function(){const _0xef54a2=_0x29f489;VisuMZ[_0xef54a2(0xff)]['Game_Party_setupBattleTest'][_0xef54a2(0x26a)](this),this[_0xef54a2(0x156)]();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x1ed)]=function(){const _0x5ab873=_0x29f489;this[_0x5ab873(0x25e)]=Game_Party['defaultMaxBattleMembers'],this[_0x5ab873(0x2ad)]=[],this['_actors']=[];for(const _0x3f2ec5 of $dataSystem[_0x5ab873(0x135)]){const _0x229d84=$gameActors['actor'](_0x3f2ec5[_0x5ab873(0x1b0)]);if(!_0x229d84)continue;_0x229d84['changeLevel'](_0x3f2ec5[_0x5ab873(0x213)],![]),_0x229d84[_0x5ab873(0x1ba)](_0x3f2ec5['equips']),_0x229d84[_0x5ab873(0x303)](),this[_0x5ab873(0x2ad)][_0x5ab873(0x17c)](_0x3f2ec5[_0x5ab873(0x1b0)]),this[_0x5ab873(0x145)][_0x5ab873(0x17c)](_0x3f2ec5[_0x5ab873(0x1b0)]);}this[_0x5ab873(0x2ad)][_0x5ab873(0x257)](0x0);while(this['_battleMembers'][_0x5ab873(0x255)]<this['_battleMaxSize']){this['_battleMembers']['push'](0x0);}while(this['_battleMembers']['length']>this[_0x5ab873(0x1d2)]()){this[_0x5ab873(0x2ad)][_0x5ab873(0x1a0)]();}if($gamePlayer)$gamePlayer[_0x5ab873(0x20f)]();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x156)]=function(){const _0x4d841a=_0x29f489,_0xbe95d=this[_0x4d841a(0x177)]();for(let _0x46bd30=0x1;_0x46bd30<$dataActors[_0x4d841a(0x255)];_0x46bd30++){const _0x15ea30=$gameActors[_0x4d841a(0x1a3)](_0x46bd30);if(!_0x15ea30)continue;if(_0x15ea30[_0x4d841a(0x1ee)]()[_0x4d841a(0x255)]<=0x0)continue;if(_0x15ea30[_0x4d841a(0x1ee)]()[_0x4d841a(0xe6)](/-----/i))continue;if(_0xbe95d['includes'](_0x15ea30))continue;this[_0x4d841a(0x145)][_0x4d841a(0x17c)](_0x15ea30[_0x4d841a(0x1b0)]());}},VisuMZ['PartySystem']['Game_Party_addActor']=Game_Party[_0x29f489(0x26d)][_0x29f489(0x2d8)],Game_Party[_0x29f489(0x26d)][_0x29f489(0x2d8)]=function(_0x18108a){const _0x5253d7=_0x29f489;VisuMZ[_0x5253d7(0xff)][_0x5253d7(0x202)]['call'](this,_0x18108a),this[_0x5253d7(0x124)](_0x18108a),SceneManager[_0x5253d7(0x2fd)]()&&(Imported[_0x5253d7(0x29a)]&&BattleManager['isOTB']()&&(BattleManager[_0x5253d7(0x281)](),BattleManager[_0x5253d7(0x2ca)]($gameActors[_0x5253d7(0x1a3)](_0x18108a))));},Game_Party['prototype'][_0x29f489(0x124)]=function(_0x5b2dad){const _0xd22679=_0x29f489;this[_0xd22679(0x112)]();if(this[_0xd22679(0x2ad)][_0xd22679(0x14c)](_0x5b2dad))return;if(!this['_actors'][_0xd22679(0x14c)](_0x5b2dad))return;if(!this[_0xd22679(0x2ad)][_0xd22679(0x14c)](0x0))return;const _0x2a52f3=$gameActors[_0xd22679(0x1a3)](_0x5b2dad);if(!_0x2a52f3)return;const _0x1f7eaf=this[_0xd22679(0x2ad)][_0xd22679(0x295)](0x0);if(_0x1f7eaf<0x0)return;this[_0xd22679(0x2ad)][_0x1f7eaf]=_0x5b2dad,SceneManager['isSceneBattle']()&&(_0x2a52f3[_0xd22679(0x11f)](),_0x2a52f3[_0xd22679(0x218)]()),this[_0xd22679(0x1c8)]();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x2e2)]=function(_0x147c3e,_0x4cf8dc){const _0x5c665f=_0x29f489;this[_0x5c665f(0x112)]();if(this[_0x5c665f(0x2ad)][_0x5c665f(0x14c)](_0x147c3e))return;if(!this[_0x5c665f(0x2ad)][_0x5c665f(0x14c)](0x0))return;const _0x3603f5=$gameActors[_0x5c665f(0x1a3)](_0x147c3e);if(!_0x3603f5)return;this['_battleMembers'][_0x4cf8dc]=_0x147c3e,_0x3603f5['makeActions'](),this[_0x5c665f(0x1c8)](),SceneManager[_0x5c665f(0x221)](Scene_Battle)&&BattleManager[_0x5c665f(0x11c)]()&&(_0x3603f5[_0x5c665f(0x1ec)](),_0x3603f5['_actionState']=_0x5c665f(0x242),_0x3603f5['_tpbState']='charging',_0x3603f5[_0x5c665f(0x144)]=0x0);},VisuMZ['PartySystem'][_0x29f489(0x276)]=Game_Party[_0x29f489(0x26d)]['removeActor'],Game_Party[_0x29f489(0x26d)][_0x29f489(0x2ff)]=function(_0x4670a1){const _0x1f7deb=_0x29f489;this[_0x1f7deb(0x103)](_0x4670a1),VisuMZ[_0x1f7deb(0xff)][_0x1f7deb(0x276)]['call'](this,_0x4670a1);},Game_Party[_0x29f489(0x26d)][_0x29f489(0x103)]=function(_0x4b7e5d){const _0x52f5f1=_0x29f489;this[_0x52f5f1(0x112)]();if(!this['_battleMembers'][_0x52f5f1(0x14c)](_0x4b7e5d))return;if(_0x4b7e5d<=0x0)return;const _0x5e0a63=this[_0x52f5f1(0x2ad)][_0x52f5f1(0x295)](_0x4b7e5d);this[_0x52f5f1(0x2ad)][_0x5e0a63]=0x0,this['_actors'][_0x52f5f1(0x257)](_0x4b7e5d),this[_0x52f5f1(0x145)][_0x52f5f1(0x17c)](_0x4b7e5d),this['partyChangeRefresh']();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x1c8)]=function(){const _0xf40c0c=_0x29f489;this['rearrangePartyActors'](),$gamePlayer[_0xf40c0c(0x20f)](),$gameMap[_0xf40c0c(0x21f)]();},Game_Party['prototype']['rearrangePartyActors']=function(){const _0x45d3d4=_0x29f489;this[_0x45d3d4(0x112)]();const _0x281557=this['battleMembers']()[_0x45d3d4(0x157)](this['reserveMembers']());this[_0x45d3d4(0x145)]=_0x281557[_0x45d3d4(0x200)](_0x58fbbf=>_0x58fbbf?_0x58fbbf[_0x45d3d4(0x1b0)]():0x0)['remove'](0x0);},Game_Party['prototype'][_0x29f489(0x2ea)]=function(){const _0x20bd68=_0x29f489;this[_0x20bd68(0x145)][_0x20bd68(0x1ae)]((_0x31b746,_0x1205b9)=>_0x31b746-_0x1205b9),this[_0x20bd68(0x2da)](),this[_0x20bd68(0x1c8)]();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x14a)]=function(){for(const _0x29bc48 of this['reserveMembers']()){if(!_0x29bc48)continue;if(_0x29bc48['isRequiredInParty']())return!![];}return![];},VisuMZ[_0x29f489(0xff)][_0x29f489(0x166)]=Game_Party[_0x29f489(0x26d)][_0x29f489(0x2e7)],Game_Party[_0x29f489(0x26d)]['swapOrder']=function(_0x2a6f30,_0x1a7183){const _0x1e9002=_0x29f489,_0x59e97c=this['battleMembers']()[_0x1e9002(0x257)](null)[_0x1e9002(0x257)](undefined)['length'];VisuMZ[_0x1e9002(0xff)]['Game_Party_swapOrder'][_0x1e9002(0x26a)](this,_0x2a6f30,_0x1a7183),this[_0x1e9002(0x28b)](_0x2a6f30,_0x1a7183,_0x59e97c);},Game_Party['prototype']['swapOrderPartySystemPlugin']=function(_0x5a585e,_0x412fc3,_0x4833a3){const _0x5781b0=_0x29f489;this[_0x5781b0(0x2ad)]=[];for(let _0x4a9477=0x0;_0x4a9477<this[_0x5781b0(0x145)][_0x5781b0(0x255)];_0x4a9477++){if(this[_0x5781b0(0x2ad)][_0x5781b0(0x255)]>=this[_0x5781b0(0x1d2)]())break;if(SceneManager[_0x5781b0(0x271)][_0x5781b0(0xe7)]&&SceneManager[_0x5781b0(0x271)][_0x5781b0(0xe7)]()){if(this[_0x5781b0(0x2ad)][_0x5781b0(0x255)]>=_0x4833a3)break;}this['_battleMembers'][_0x4a9477]=this[_0x5781b0(0x145)][_0x4a9477];}$gamePlayer[_0x5781b0(0x20f)]();},Scene_MenuBase['prototype'][_0x29f489(0xe7)]=function(){const _0x44ef2d=_0x29f489;if(this[_0x44ef2d(0x306)][_0x44ef2d(0x1ee)]===_0x44ef2d(0x2b9))return!![];return![];},Game_Party[_0x29f489(0x26d)][_0x29f489(0x101)]=function(_0xa44028){const _0x4ddaed=_0x29f489;if(this[_0x4ddaed(0x12d)]())return;if(!_0xa44028)return;if(_0xa44028[_0x4ddaed(0x255)]<=0x0)return;this['_forcedPartyActors']=_0xa44028['clone'](),this[_0x4ddaed(0x290)]=this[_0x4ddaed(0x290)]['filter'](_0x24f945=>!!$gameActors[_0x4ddaed(0x1a3)](_0x24f945));while(this['_forcedPartyActors'][_0x4ddaed(0x255)]>this[_0x4ddaed(0x1d2)]()){this[_0x4ddaed(0x290)][_0x4ddaed(0x1a0)]();}$gamePlayer[_0x4ddaed(0x20f)](),$gameMap[_0x4ddaed(0x21f)]();},Game_Party[_0x29f489(0x26d)][_0x29f489(0x185)]=function(){const _0x1033d4=_0x29f489;if(this[_0x1033d4(0x12d)]())return;this['_forcedPartyActors']=undefined,$gamePlayer[_0x1033d4(0x20f)](),$gameMap['requestRefresh']();},VisuMZ[_0x29f489(0xff)][_0x29f489(0x2d0)]=Game_Party[_0x29f489(0x26d)][_0x29f489(0x175)],Game_Party['prototype'][_0x29f489(0x175)]=function(){const _0x49b8a6=_0x29f489;if(this[_0x49b8a6(0x290)]!==undefined)return this['_forcedPartyActors']['map'](_0x375d70=>$gameActors[_0x49b8a6(0x1a3)](_0x375d70));return VisuMZ[_0x49b8a6(0xff)][_0x49b8a6(0x2d0)][_0x49b8a6(0x26a)](this);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x10d)]=Game_Party['prototype'][_0x29f489(0x1e8)],Game_Party[_0x29f489(0x26d)][_0x29f489(0x1e8)]=function(_0x216d84){const _0x3864c0=_0x29f489;if(this['_forcedPartyActors']!==undefined)return this[_0x3864c0(0x290)][_0x3864c0(0x200)](_0x46350d=>$gameActors[_0x3864c0(0x1a3)](_0x46350d));return VisuMZ['PartySystem'][_0x3864c0(0x10d)][_0x3864c0(0x26a)](this,_0x216d84);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x2c7)]=Game_Party[_0x29f489(0x26d)][_0x29f489(0x222)],Game_Party[_0x29f489(0x26d)][_0x29f489(0x222)]=function(){const _0x48974e=_0x29f489;if(this[_0x48974e(0x290)]!==undefined)return[];return VisuMZ['PartySystem'][_0x48974e(0x2c7)][_0x48974e(0x26a)](this);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x17a)]=Game_System['prototype'][_0x29f489(0x1d8)],Game_System[_0x29f489(0x26d)][_0x29f489(0x1d8)]=function(){const _0x55d110=_0x29f489;if($gameParty[_0x55d110(0x290)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x55d110(0xff)][_0x55d110(0x17a)]['call'](this);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x1db)]=Game_Actor[_0x29f489(0x26d)][_0x29f489(0x19e)],Game_Actor['prototype'][_0x29f489(0x19e)]=function(){const _0xc60184=_0x29f489;if($gameParty['_forcedPartyActors']!==undefined)return![];if($gameParty[_0xc60184(0x2af)]!==undefined)return![];return VisuMZ['PartySystem']['Game_Actor_canSwitchPartyInBattle_FP'][_0xc60184(0x26a)](this);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x179)]=Game_Party['prototype'][_0x29f489(0x19e)],Game_Party['prototype'][_0x29f489(0x19e)]=function(){const _0x236f55=_0x29f489;if($gameParty[_0x236f55(0x290)]!==undefined)return![];if($gameParty[_0x236f55(0x2af)]!==undefined)return![];return VisuMZ[_0x236f55(0xff)]['Game_Party_canSwitchPartyInBattle_FP']['call'](this);},VisuMZ['PartySystem'][_0x29f489(0x24d)]=Game_Troop[_0x29f489(0x26d)][_0x29f489(0x1c6)],Game_Troop[_0x29f489(0x26d)][_0x29f489(0x1c6)]=function(){const _0x4136a6=_0x29f489;VisuMZ[_0x4136a6(0xff)][_0x4136a6(0x24d)]['call'](this),$gameParty['updateBattlePartySwitchCooldown']();},Game_Troop[_0x29f489(0x26d)]['partyChangeRefresh']=function(){const _0x17a151=_0x29f489;if(Imported[_0x17a151(0x284)])for(const _0x13b43d of this[_0x17a151(0x2b4)]()){_0x13b43d[_0x17a151(0x20f)]();}},Scene_Menu[_0x29f489(0x26d)]['commandFormation']=function(){const _0x2b0120=_0x29f489;SceneManager[_0x2b0120(0x17c)](Scene_Party);};function Scene_Party(){const _0x1d8e88=_0x29f489;this[_0x1d8e88(0x122)](...arguments);}Scene_Party['prototype']=Object[_0x29f489(0x2e0)](Scene_MenuBase[_0x29f489(0x26d)]),Scene_Party[_0x29f489(0x26d)]['constructor']=Scene_Party,Scene_Party[_0x29f489(0x26d)][_0x29f489(0x122)]=function(){const _0x5a794f=_0x29f489;this['loadPartyImages'](),Scene_MenuBase[_0x5a794f(0x26d)][_0x5a794f(0x122)][_0x5a794f(0x26a)](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x1df)]=function(){const _0x1a8037=_0x29f489;if(ConfigManager[_0x1a8037(0x110)]&&ConfigManager[_0x1a8037(0xf3)]!==undefined)return ConfigManager['uiInputPosition'];else return ConfigManager['uiMenuStyle']===![]?![]:Scene_MenuBase[_0x1a8037(0x26d)][_0x1a8037(0x1df)]['call'](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2ef)]=function(){return 0x0;},Scene_Party['prototype'][_0x29f489(0x301)]=function(){return!![];},Scene_Party['prototype'][_0x29f489(0x266)]=function(){const _0x3c08c9=_0x29f489;Scene_MenuBase['prototype'][_0x3c08c9(0x266)][_0x3c08c9(0x26a)](this),this[_0x3c08c9(0x227)]['_clickHandler']=undefined,this[_0x3c08c9(0x245)]['_clickHandler']=undefined;},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x148)]=function(){const _0x1ccac7=_0x29f489;for(const _0x202cc2 of $gameParty[_0x1ccac7(0x2b4)]()){ImageManager['loadFace'](_0x202cc2[_0x1ccac7(0xfc)]()),ImageManager[_0x1ccac7(0x182)](_0x202cc2['characterName']()),ImageManager['loadSvActor'](_0x202cc2['battlerName']());}},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2e0)]=function(){const _0x164894=_0x29f489;Scene_MenuBase['prototype'][_0x164894(0x2e0)][_0x164894(0x26a)](this),this[_0x164894(0xfa)](),this[_0x164894(0x2c3)](),this[_0x164894(0x248)](),this['createReservePartyWindow'](),this['createStatusLabel'](),this[_0x164894(0x1e3)]();},Scene_Party['prototype']['createActivePartyLabel']=function(){const _0x5df4b5=_0x29f489,_0x5cd01a=this[_0x5df4b5(0x225)]();this[_0x5df4b5(0x121)]=new Window_PartyLabel(_0x5cd01a,TextManager['activeParty']),this['_activePartyLabel'][_0x5df4b5(0x14e)](VisuMZ[_0x5df4b5(0xff)]['Settings'][_0x5df4b5(0x16d)][_0x5df4b5(0x1e1)]),this[_0x5df4b5(0x224)](this['_activePartyLabel']);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x225)]=function(){const _0x2ba6f2=_0x29f489;return VisuMZ[_0x2ba6f2(0xff)][_0x2ba6f2(0x233)][_0x2ba6f2(0x16d)][_0x2ba6f2(0x2c9)][_0x2ba6f2(0x26a)](this);},Scene_Party[_0x29f489(0x26d)]['createActivePartyWindow']=function(){const _0x2b6f87=_0x29f489,_0xe31dc3=this['activePartyWindowRect']();this[_0x2b6f87(0x123)]=new Window_PartyActive(_0xe31dc3),this[_0x2b6f87(0x123)][_0x2b6f87(0x14e)](VisuMZ[_0x2b6f87(0xff)][_0x2b6f87(0x233)]['Window'][_0x2b6f87(0x298)]),this[_0x2b6f87(0x123)][_0x2b6f87(0x137)]('ok',this['onActiveOk']['bind'](this)),this[_0x2b6f87(0x123)][_0x2b6f87(0x137)](_0x2b6f87(0x18a),this['popScene'][_0x2b6f87(0x1d6)](this)),this[_0x2b6f87(0x224)](this[_0x2b6f87(0x123)]);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2d6)]=function(){const _0x453b75=_0x29f489;return VisuMZ[_0x453b75(0xff)][_0x453b75(0x233)][_0x453b75(0x16d)][_0x453b75(0x1be)][_0x453b75(0x26a)](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x170)]=function(){const _0x486cf4=_0x29f489;this['_reservePartyWindow'][_0x486cf4(0x2ab)](),this[_0x486cf4(0x192)]['reselect']();},Scene_Party['prototype']['createReservePartyLabel']=function(){const _0x23d2fb=_0x29f489,_0x1ae9ad=this[_0x23d2fb(0x205)]();this[_0x23d2fb(0x20d)]=new Window_PartyLabel(_0x1ae9ad,TextManager[_0x23d2fb(0x1f2)]),this[_0x23d2fb(0x20d)]['setBackgroundType'](VisuMZ[_0x23d2fb(0xff)]['Settings'][_0x23d2fb(0x16d)][_0x23d2fb(0x17b)]),this['addWindow'](this[_0x23d2fb(0x20d)]);},Scene_Party['prototype'][_0x29f489(0x205)]=function(){const _0x2b59b4=_0x29f489;return VisuMZ['PartySystem'][_0x2b59b4(0x233)][_0x2b59b4(0x16d)][_0x2b59b4(0x128)][_0x2b59b4(0x26a)](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0xe5)]=function(){const _0x347f98=_0x29f489,_0x58c874=this['reservePartyWindowRect']();this[_0x347f98(0x192)]=new Window_PartyReserve(_0x58c874),this[_0x347f98(0x192)][_0x347f98(0x14e)](VisuMZ[_0x347f98(0xff)][_0x347f98(0x233)][_0x347f98(0x16d)][_0x347f98(0x22c)]),this[_0x347f98(0x192)]['setHandler']('ok',this[_0x347f98(0x132)][_0x347f98(0x1d6)](this)),this[_0x347f98(0x192)][_0x347f98(0x137)](_0x347f98(0x18a),this[_0x347f98(0x2f0)][_0x347f98(0x1d6)](this)),this[_0x347f98(0x224)](this[_0x347f98(0x192)]);},Scene_Party[_0x29f489(0x26d)]['reservePartyWindowRect']=function(){const _0x232eea=_0x29f489;return VisuMZ[_0x232eea(0xff)]['Settings']['Window']['ReservePartyWindowRect']['call'](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x132)]=function(){const _0x43281c=_0x29f489,_0x606744=this[_0x43281c(0x192)][_0x43281c(0x2c1)](),_0x2c8c71=this[_0x43281c(0x123)][_0x43281c(0x25f)]();if(_0x606744<0x0){if(_0x2c8c71)$gameParty[_0x43281c(0x103)](_0x2c8c71[_0x43281c(0x1b0)]());}else{const _0x4034aa=this[_0x43281c(0x192)][_0x43281c(0x25f)]()['actorId'](),_0x32ba5c=this[_0x43281c(0x123)][_0x43281c(0x1f8)]();if(_0x2c8c71)$gameParty[_0x43281c(0x103)](_0x2c8c71[_0x43281c(0x1b0)]());$gameParty[_0x43281c(0x2e2)](_0x4034aa,_0x32ba5c);}this['refreshAllWindows'](),this[_0x43281c(0x2f0)]();},Scene_Party['prototype'][_0x29f489(0x12c)]=function(){const _0x253bd8=_0x29f489;this[_0x253bd8(0x123)][_0x253bd8(0x20f)](),this['_reservePartyWindow']['refresh']();},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2f0)]=function(){const _0x43ba79=_0x29f489;this['_reservePartyWindow'][_0x43ba79(0x171)](),this[_0x43ba79(0x192)]['deselect'](),this[_0x43ba79(0x123)][_0x43ba79(0x2ab)]();},Scene_Party['prototype'][_0x29f489(0x268)]=function(){const _0x255e59=_0x29f489,_0x148fa5=this[_0x255e59(0x197)]();this[_0x255e59(0x22b)]=new Window_PartyLabel(_0x148fa5,TextManager[_0x255e59(0x1c4)]),this[_0x255e59(0x22b)][_0x255e59(0x14e)](VisuMZ[_0x255e59(0xff)][_0x255e59(0x233)]['Window']['StatusLabelBgType']),this[_0x255e59(0x224)](this[_0x255e59(0x22b)]);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x197)]=function(){const _0x2780a9=_0x29f489;return VisuMZ[_0x2780a9(0xff)][_0x2780a9(0x233)][_0x2780a9(0x16d)][_0x2780a9(0x104)]['call'](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x1e3)]=function(){const _0x47fb75=_0x29f489,_0x3374f5=this[_0x47fb75(0x2a6)]();this[_0x47fb75(0x1e6)]=new Window_PartyStatus(_0x3374f5),this[_0x47fb75(0x1e6)][_0x47fb75(0x14e)](VisuMZ[_0x47fb75(0xff)]['Settings'][_0x47fb75(0x16d)][_0x47fb75(0x25d)]),this[_0x47fb75(0x224)](this[_0x47fb75(0x1e6)]),this[_0x47fb75(0x192)][_0x47fb75(0x26b)](this[_0x47fb75(0x1e6)]),this[_0x47fb75(0x123)][_0x47fb75(0x26b)](this['_statusPartyWindow']);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2a6)]=function(){const _0x3b5fb2=_0x29f489;return VisuMZ[_0x3b5fb2(0xff)]['Settings']['Window'][_0x3b5fb2(0x22a)][_0x3b5fb2(0x26a)](this);},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x26c)]=function(){const _0x3560dc=_0x29f489;return TextManager['getInputButtonString'](_0x3560dc(0x108));},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2f4)]=function(){const _0x474323=_0x29f489;return TextManager[_0x474323(0x21e)];},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x2db)]=function(){const _0x3a400d=_0x29f489,_0x324299=this[_0x3a400d(0x123)],_0x531995=this['_reservePartyWindow'];if(_0x324299&&_0x324299[_0x3a400d(0x2a4)]&&_0x324299['currentActor']()&&_0x324299[_0x3a400d(0x17d)]())return TextManager['assistRemovePartyMember'];else return _0x531995&&_0x531995[_0x3a400d(0x2a4)]&&$gameParty[_0x3a400d(0x222)]()[_0x3a400d(0x255)]>0x0?TextManager[_0x3a400d(0x1a1)]:'';},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x131)]=function(){const _0x5846a5=_0x29f489;if(this[_0x5846a5(0x123)]&&this[_0x5846a5(0x123)][_0x5846a5(0x2a4)])return TextManager[_0x5846a5(0x228)];else return this[_0x5846a5(0x192)]&&this['_reservePartyWindow'][_0x5846a5(0x2a4)]?TextManager['assistSwapInPartyMember']:Scene_MenuBase['prototype'][_0x5846a5(0x131)][_0x5846a5(0x26a)](this);},Scene_Party['prototype'][_0x29f489(0x11a)]=function(){const _0x48d00a=_0x29f489;Scene_MenuBase[_0x48d00a(0x26d)][_0x48d00a(0x11a)][_0x48d00a(0x26a)](this),this[_0x48d00a(0x21c)](this[_0x48d00a(0x299)]()),this['createCustomBackgroundImages']();},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x299)]=function(){const _0x23f326=_0x29f489;return VisuMZ['PartySystem'][_0x23f326(0x233)]['BgSettings'][_0x23f326(0x1ad)];},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x230)]=function(){const _0xa40b07=_0x29f489,_0x36d0c7={'BgFilename1':VisuMZ['PartySystem'][_0xa40b07(0x233)][_0xa40b07(0x2b3)][_0xa40b07(0x176)],'BgFilename2':VisuMZ['PartySystem'][_0xa40b07(0x233)][_0xa40b07(0x2b3)]['BgFilename2']};_0x36d0c7&&(_0x36d0c7[_0xa40b07(0x176)]!==''||_0x36d0c7[_0xa40b07(0x2de)]!=='')&&(this[_0xa40b07(0x134)]=new Sprite(ImageManager[_0xa40b07(0x23d)](_0x36d0c7['BgFilename1'])),this[_0xa40b07(0x1fc)]=new Sprite(ImageManager[_0xa40b07(0x2f1)](_0x36d0c7['BgFilename2'])),this[_0xa40b07(0x278)](this[_0xa40b07(0x134)]),this[_0xa40b07(0x278)](this[_0xa40b07(0x1fc)]),this[_0xa40b07(0x134)][_0xa40b07(0x21d)][_0xa40b07(0x217)](this[_0xa40b07(0x142)][_0xa40b07(0x1d6)](this,this[_0xa40b07(0x134)])),this[_0xa40b07(0x1fc)]['bitmap'][_0xa40b07(0x217)](this[_0xa40b07(0x142)][_0xa40b07(0x1d6)](this,this['_backSprite2'])));},Scene_Party[_0x29f489(0x26d)][_0x29f489(0x142)]=function(_0xb09f50){const _0x76236=_0x29f489;this['scaleSprite'](_0xb09f50),this[_0x76236(0x161)](_0xb09f50);},Scene_Party[_0x29f489(0x26d)]['terminate']=function(){const _0x191c87=_0x29f489;Scene_MenuBase['prototype'][_0x191c87(0xf1)][_0x191c87(0x26a)](this),$gameParty['partyChangeRefresh']();},Window_StatusBase['prototype']['drawActorPartyIcons']=function(_0x3b8506,_0x1537ce,_0x2951fe,_0x5690a6){const _0x1d65d3=_0x29f489;if(!_0x3b8506)return;_0x5690a6?this[_0x1d65d3(0x25a)](_0x3b8506,_0x1537ce,_0x2951fe):this[_0x1d65d3(0x293)](_0x3b8506,_0x1537ce,_0x2951fe);},Window_StatusBase[_0x29f489(0x26d)][_0x29f489(0x293)]=function(_0x5105df,_0x5a46dd,_0xb4a0c2){const _0xdbe5c3=_0x29f489;_0xb4a0c2+=Math['round']((this[_0xdbe5c3(0x100)]()-ImageManager['iconHeight'])/0x2),!_0x5105df[_0xdbe5c3(0x267)]()&&(this['drawIcon'](ImageManager[_0xdbe5c3(0x209)],_0x5a46dd,_0xb4a0c2),_0x5a46dd+=ImageManager['iconWidth']+0x4),_0x5105df['isRequiredInParty']()&&(this['drawIcon'](ImageManager[_0xdbe5c3(0xf7)],_0x5a46dd,_0xb4a0c2),_0x5a46dd+=ImageManager[_0xdbe5c3(0x16b)]+0x4);},Window_StatusBase['prototype'][_0x29f489(0x25a)]=function(_0x545c3d,_0x333fec,_0x4a2d73){const _0x4f4536=_0x29f489;let _0x588d6d=0x0;if(!_0x545c3d[_0x4f4536(0x267)]())_0x588d6d+=0x1;if(_0x545c3d['isRequiredInParty']())_0x588d6d+=0x1;if(_0x588d6d<=0x1)return this[_0x4f4536(0x293)](_0x545c3d,_0x333fec,_0x4a2d73);_0x4a2d73+=Math[_0x4f4536(0x234)]((this[_0x4f4536(0x100)]()-ImageManager[_0x4f4536(0x239)])/0x2),_0x4a2d73-=Math[_0x4f4536(0x234)](this[_0x4f4536(0x100)]()/0x2),this[_0x4f4536(0x15c)](ImageManager[_0x4f4536(0x209)],_0x333fec,_0x4a2d73),_0x4a2d73+=this[_0x4f4536(0x100)](),this[_0x4f4536(0x15c)](ImageManager[_0x4f4536(0xf7)],_0x333fec,_0x4a2d73);};function _0x4db3(){const _0x148560=['_reservePartyLabel','battleback2Name','refresh','_spriteset','updateBattleProcess','isFormationCommandEnabled','level','teamBasedFirstAvailableMember','drawItem','drawActorCharacter','addLoadListener','makeActions','ActorCmdWinAddParty','_debug','clearPartySwitchCommandCooldown','setBackgroundOpacity','bitmap','assistSwapPositions','requestRefresh','updateTurnOrderSTB','isPreviousScene','reserveMembers','emptyPartyMember','addWindow','activePartyLabelRect','getParamValue','_pageupButton','assistSwapOutPartyMember','RequirePartyMembers','StatusWindowRect','_statusPartyLabel','ReservePartyWindowBgType','36996rWSMDy','Scene_Battle_isTimeActive','BattleSwitchOut','createCustomBackgroundImages','ReserveSpriteOffsetY','paramValueByName','Settings','round','isPartyCommandEnabled','_partySystemBattleCommandCooldown','_helpWindow','#%1','iconHeight','NeedsBackgroundSnapshot','sprite','addRemoveCommand','loadTitle1','AssistSwapPosition','clamp','ReservePartyGraphic','gridRank','undecided','updateBattlePartySwitchCooldown','hasBattleSystemIncompatibilities','_pagedownButton','assistSwapInPartyMember','battlerName','createReservePartyLabel','getColor','ActorsJS','activeParty','processShiftSortShortcut','Game_Troop_increaseTurn','status','Scene_Battle_isAnyInputWindowActive','Value','removePartyMember','param','drawSvActor','paintOpacity','length','isSceneMap','remove','changeTextColor','CallPartyScene','drawActorPartyIconsVert','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ActiveParty','StatusWindowBgType','_battleMaxSize','currentActor','hpColor','TempDisbandTempParty','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','findSymbol','ActivePartyGraphic','playOkSound','createPageButtons','isFormationChangeOk','createStatusLabel','addCommand','call','setStatusWindow','buttonAssistKey3','prototype','addPartyCommand','VisuMZ_2_BattleSystemBTB','BattleManager_setup','_scene','quickSwap','setPartyLock','BackRectColor','VisuMZ_2_BattleGridSystem','Game_Party_removeActor','max','addChild','_tpbState','ReserveBattlerOffsetY','Vocab','clearBypassAutoSave','processDrawItem','92YKiwVJ','battler','ceil','removeActionBattlersOTB','drawItemDarkRect','isPlaytest','VisuMZ_2_AggroControlSystem','1063215AuGDjr','_subject','innerHeight','ConvertParams','NUM','isSTB','swapOrderPartySystemPlugin','isEnabled','sortActionOrdersBTB','commandStyle','callPartyMemberSwitch','_forcedPartyActors','_partyCommandWindow','isRequiredInParty','drawActorPartyIconsHorz','_callSceneParty','indexOf','drawParamText','partySwitchWindowRectStandard','ActivePartyWindowBgType','getBackgroundOpacity','VisuMZ_2_BattleSystemOTB','4494658LjzpFf','random','description','_actor','updatePartySwitch','isETB','ActiveBattlerOffsetX','battlePartySwitchCooldown','VisuMZ_2_BattleSystemFTB','active','_rowThickness','statusWindowRect','startOpacity','MoveRandomToActive','_partySwitchBattleCommandCooldown','ARRAYSTR','activate','close','_battleMembers','BattlePartyIcon','_forcedBattleGridTactics','Status','actor%1-stateIcon','STRUCT','BgSettings','members','defaultMaxBattleMembers','changeMaxBattleMembers','makeActionOrders','faceHeight','Scene_BattleGridTactics','format','drawItemImageFace','formation','reselect','TempCreatePartyNormal','_actorGraphic','initPartySystem','pendingIndex','VisuMZ_2_BattleSystemCTB','createActivePartyWindow','slice','initBattleMembers','_logWindow','Game_Party_reserveMembers_FP','parse','ActivePartyLabelRect','otbReturnBattlerToTurnOrders','PartyCmdCooldown','callUpdateHelp','drawParamName','StatusWindowDraw','SwitchOutAnimation','Game_Party_allMembers_FP','dimColor1','_tpbSceneChangeCacheActor','isTriggered','updateTurnOrderCTB','clear','activePartyWindowRect','Sprite_Actor_update','addActor','registerCommand','rearrangePartyActors','buttonAssistText3','charged','Actors','BgFilename2','playEquip','create','setBattler','addActorToBattleMembersAtIndex','ARRAYNUM','_partyMemberSwitchWindow','isPTB','resetFontSettings','swapOrder','_callPartyMemberSwitch','svbattler','sortActors','drawText','STR','_target','VisuMZ_2_BattleSystemSTB','helpAreaHeight','onReserveCancel','loadTitle2','onPartySwitchCancel','_inputting','buttonAssistText1','processPartySwitchMember','setActor','cursorDown','skillItemWindowRectBorderStyle','MoveActorsToReserve','ensureCursorVisible','tpbImmediateAction','itemRect','isSceneBattle','isCurrentItemEnabled','removeActor','_battleSystemIncompatibilityError','needsPageButtons','FUNC','recoverAll','Game_Actor_setup','createInnerSprite','constructor','Game_Party_setupStartingMembers','battlePartySwitchCmd','Temp:\x20Create\x20Temporary\x20Party\x20(JS)\x20Error','isBTB','createReservePartyWindow','match','allowEarlySwapOrderBreak','DrawBackRect','width','2287773YxSnfC','Scene_Battle_createPartyCommandWindowBattleCore','_lastIndex','gridFlank','maxCols','trim','regenerateAll','terminate','ARRAYJSON','uiInputPosition','_targets','50525HrRtgk','Game_Party_initialize','requiredPartyMemberIcon','systemColor','itemPadding','createActivePartyLabel','applyBattlePartySwitchCooldown','faceName','isOTB','AddRemoveCmd','PartySystem','lineHeight','createForcedParty','text','removeActorFromBattleMembers','StatusLabelRect','actorParams','gridMoveTo','onBattlePartySwitch','shift','1777QHveAF','VisuMZ_0_CoreEngine','ActorCmdCooldown','isPartyCommandAdded','Game_Party_rawBattleMembers_FP','ReserveBattlerOffsetX','log','uiMenuStyle','isQueueFormationMenu','checkInitBattleMembers','startSwitchInAnimation','drawActorPartyIcons','ReserveSpriteOffsetX','BattleHelpFormation','addText','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','initMaxBattleMembers','createBackground','processCancel','isTpb','clearTpbChargeTime','\x5cI[%1]%2','onBattleStart','770FoVJAV','_activePartyLabel','initialize','_activePartyWindow','addActorToBattleMembers','contents','isSceneGridTactics','drawParamValue','ReservePartyLabelRect','_currentActor','startMove','isSceneParty','refreshAllWindows','inBattle','playCursorSound','refreshOG','fillRect','buttonAssistText4','onReserveOk','Scene_Base_isAutosaveEnabled','_backSprite1','testBattlers','openness','setHandler','Index','_partySwitchTargetActor','drawRemoveCommand','drawItemImageSvActor','postPartySwitchMenuTurnBased','Param','processCursorMove','Game_Unit_inBattle','isActiveTpb','loadFace','adjustSprite','startSwitchOutAnimation','_tpbChargeTime','_actors','commandPartyMemberSwitch','createAllWindows','loadPartyImages','removePartyCommand','anyRequiredPartyMembersInReserve','_partyRequired','includes','Scene_Battle_createAllWindows','setBackgroundType','exit','battlePartyChangeIcon','_partySwitchDuration','VisuMZ_2_BattleSystemETB','min','reserveTransfer','VisuMZ_1_BattleCore','addNonBattleTestMembers','concat','center','isNextSceneBattleTransitionable','Scene_Battle_createActorCommandWindow','addFormationCommand','drawIcon','isAnyInputWindowActive','drawActorName','currentSymbol','switchStateIconActor','centerSprite','_statusWindow','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','VisuMZ_2_BattleSystemPTB','setBattlePartySwitchCooldown','Game_Party_swapOrder','face','return\x200','SceneManager_isPreviousSceneBattleTransitionable','Window_PartyCommand_updateHelp','iconWidth','8icQKMR','Window','drawActorFace','toLowerCase','onActiveOk','deactivate','partySwitchWindowRect','itemRectWithPadding','_back1Sprite','allMembers','BgFilename1','battleMembers','MaxBattleMembers','Game_Party_canSwitchPartyInBattle_FP','Game_System_isFormationEnabled_FP','ReservePartyLabelBgType','push','isShiftRemoveShortcutEnabled','VisuMZ_1_MainMenuCore','loadFaceImages','open','isFTB','loadCharacter','_actorCommandWindow','ActiveTpbFormationMessage','clearForcedParty','windowPadding','isAlive','isActor','_bypassAutoSavePartySystem','cancel','_actionBattlers','isImmediateTpb','ARRAYSTRUCT','visible','BattleSwitchWindowBgType','drawActorSimpleStatus','battleback1Name','_reservePartyWindow','right','replaceActionBattlersPartySwitch','cursorPagedown','postPartySwitchMenuTpb','statusLabelRect','QueuePartyScene','drawItemStatus','isUsingGridSystem','Scene_Battle_updateBattleProcess','ReserveCol','setup','canSwitchPartyInBattle','itemHeight','pop','assistSortPartyMembers','_partySystemSwitchOut','actor','placeBasicGauges','Window_ActorCommand_updateHelp','RequireIcon','onPartySwitchOk','Require','update','_partyLocked','1067IzGrNS','isAutosaveEnabled','SnapshotOpacity','sort','commandFormation','actorId','callFormation','isCTB','JSON','5532560HEhIWN','isCancelEnabled','addCustomCommands','splice','battlePartyChangeCmdHelp','_list','initEquips','selectActor','processShiftRemoveShortcut','drawItemImageSprite','ActivePartyWindowRect','isAppeared','ARRAYEVAL','faceWidth','battleLayoutStyle','version','statusParty','changePaintOpacity','increaseTurn','battlePartySwitchCmdHelp','partyChangeRefresh','parameters','isNextScene','isPreviousSceneBattleTransitionable','isUsingBattleGridTactics','setPartyRequirement','SceneManager_isNextSceneBattleTransitionable','gradientFillRect','ActiveBattlerOffsetY','battlePartyChangeCmd','maxBattleMembers','isOkEnabled','6KKMLsL','drawItemImage','bind','maxItems','isFormationEnabled','_otb_actionBattlersNext','BattleHelpSwitch','Game_Actor_canSwitchPartyInBattle_FP','Game_Battler_onBattleStart','ReserveItemThickness','AssistSort','isRightInputMode','clearPartyBattleCommandCooldown','ActivePartyLabelBgType','Game_Battler_regenerateAll','createStatusWindow','General','updateTargetsForPartySwitch','_statusPartyWindow','partySwitchWindowRectBorder','rawBattleMembers','getPartySystemBackColor','cursorUp','preparePartySwitchMember','initTpbChargeTime','setupBattleTestMembers','name','isFormationCommandAdded','checkShiftSortShortcut','height','reserveParty','mapId','MoveActorsToActive','filter','createPartySwitchWindow','floor','index','createPartyCommandWindowBattleCore','drawItemEmpty','updateHelp','_backSprite2','innerWidth','checkShiftRemoveShortcut','_windowLayer','map','setText','Game_Party_addActor','isShiftShortcutEnabled','smoothSelect','reservePartyLabelRect','drawDarkRect','isShowPartySwitchOutAnimation','setupStartingMembers','lockPartyMemberIcon','followers','AssistRemove','Empty'];_0x4db3=function(){return _0x148560;};return _0x4db3();}function Window_PartyLabel(){const _0x45a386=_0x29f489;this[_0x45a386(0x122)](...arguments);}Window_PartyLabel[_0x29f489(0x26d)]=Object[_0x29f489(0x2e0)](Window_Base['prototype']),Window_PartyLabel[_0x29f489(0x26d)]['constructor']=Window_PartyLabel,Window_PartyLabel[_0x29f489(0x26d)][_0x29f489(0x122)]=function(_0x592917,_0x5915c6){const _0x5dbb5c=_0x29f489;Window_Base[_0x5dbb5c(0x26d)][_0x5dbb5c(0x122)]['call'](this,_0x592917),this[_0x5dbb5c(0x201)](_0x5915c6);},Window_PartyLabel[_0x29f489(0x26d)]['updatePadding']=function(){this['padding']=0x0;},Window_PartyLabel[_0x29f489(0x26d)][_0x29f489(0x201)]=function(_0xe5aae8){const _0x3bd811=_0x29f489;this[_0x3bd811(0x125)][_0x3bd811(0x2d5)](),this[_0x3bd811(0x2eb)](_0xe5aae8,0x0,0x0,this[_0x3bd811(0x1fd)],_0x3bd811(0x158));};function Window_PartyActive(){const _0x427068=_0x29f489;this[_0x427068(0x122)](...arguments);}function _0x35e2(_0x203e7f,_0x4277a0){const _0x4db3ba=_0x4db3();return _0x35e2=function(_0x35e2b9,_0x169851){_0x35e2b9=_0x35e2b9-0xe1;let _0x4df84f=_0x4db3ba[_0x35e2b9];return _0x4df84f;},_0x35e2(_0x203e7f,_0x4277a0);}Window_PartyActive['prototype']=Object[_0x29f489(0x2e0)](Window_StatusBase[_0x29f489(0x26d)]),Window_PartyActive[_0x29f489(0x26d)]['constructor']=Window_PartyActive,Window_PartyActive[_0x29f489(0x2bf)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)]['Window'][_0x29f489(0x264)],Window_PartyActive[_0x29f489(0x26d)]['initialize']=function(_0x1a3bd4){const _0x5f2636=_0x29f489;Window_StatusBase['prototype'][_0x5f2636(0x122)][_0x5f2636(0x26a)](this,_0x1a3bd4),this[_0x5f2636(0x20f)](),this[_0x5f2636(0x2ab)](),this[_0x5f2636(0x204)](0x0);},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x23c)]=function(){const _0x4da9b9=_0x29f489;return VisuMZ[_0x4da9b9(0xff)][_0x4da9b9(0x233)][_0x4da9b9(0x1e4)][_0x4da9b9(0xfe)];},Window_PartyActive['prototype']['maxItems']=function(){const _0x407be7=_0x29f489;return $gameParty[_0x407be7(0x1d2)]();},Window_PartyActive[_0x29f489(0x26d)]['maxCols']=function(){return $gameParty['maxBattleMembers']();},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x19f)]=function(){const _0x4d7fd6=_0x29f489;return this[_0x4d7fd6(0x287)];},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x1a3)]=function(_0x2329eb){const _0x1a6dac=_0x29f489;return $gameParty[_0x1a6dac(0x1e8)]()[_0x2329eb];},Window_PartyActive['prototype'][_0x29f489(0x25f)]=function(){const _0x1e5e38=_0x29f489;return this[_0x1e5e38(0x1a3)](this[_0x1e5e38(0x1f8)]());},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x2fe)]=function(){const _0x43e31f=_0x29f489,_0x44fa68=this[_0x43e31f(0x1a3)](this[_0x43e31f(0x1f8)]());return _0x44fa68?_0x44fa68['isFormationChangeOk']():!![];},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x1b5)]=function(){const _0x38b049=_0x29f489;if($gameParty[_0x38b049(0x2b4)]()[_0x38b049(0x255)]<=0x0)return!![];if($gameParty[_0x38b049(0x14a)]())return![];return $gameParty['battleMembers']()['length']>0x0;},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x13e)]=function(){const _0x243bcd=_0x29f489;Window_StatusBase['prototype'][_0x243bcd(0x13e)][_0x243bcd(0x26a)](this),this['checkShiftRemoveShortcut']();},Window_PartyActive['prototype'][_0x29f489(0x2f7)]=function(_0x42fec0){const _0x598c1c=_0x29f489;this[_0x598c1c(0x1d3)]()&&this['processOk']();},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x195)]=function(){const _0x3a2e79=_0x29f489,_0x1417bc=this[_0x3a2e79(0x1f8)](),_0x3132dd=_0x1417bc+0x1>=this[_0x3a2e79(0x1d7)]()?0x0:_0x1417bc+0x1;this['quickSwap'](_0x1417bc,_0x3132dd);},Window_PartyActive[_0x29f489(0x26d)]['cursorPageup']=function(){const _0x5ee5ec=_0x29f489,_0x14bd70=this['index'](),_0x376e91=_0x14bd70-0x1<0x0?this[_0x5ee5ec(0x1d7)]()-0x1:_0x14bd70-0x1;this[_0x5ee5ec(0x272)](_0x14bd70,_0x376e91);},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x272)]=function(_0x496d73,_0x953447){const _0x16cae3=_0x29f489,_0xc06996=this[_0x16cae3(0x1a3)](_0x496d73),_0x1d230a=this[_0x16cae3(0x1a3)](_0x953447);if(_0xc06996&&!_0xc06996[_0x16cae3(0x267)]())return;if(_0x1d230a&&!_0x1d230a[_0x16cae3(0x267)]())return;const _0x1e13df=$gameParty['_battleMembers'];_0x1e13df[_0x496d73]=_0x1d230a?_0x1d230a[_0x16cae3(0x1b0)]():0x0,_0x1e13df[_0x953447]=_0xc06996?_0xc06996[_0x16cae3(0x1b0)]():0x0,this[_0x16cae3(0x20f)](),this[_0x16cae3(0x12e)](),this[_0x16cae3(0x204)](_0x953447);},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x1fe)]=function(){const _0x2bd5d9=_0x29f489;if(!this[_0x2bd5d9(0x17d)]())return;if(Input[_0x2bd5d9(0x2d3)]('shift')){const _0x5bc2ca=this[_0x2bd5d9(0x25f)]();this['processShiftRemoveShortcut']();}},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x1bc)]=function(){const _0x23fa7f=_0x29f489;SoundManager['playEquip']();const _0x542863=this[_0x23fa7f(0x25f)]();$gameParty[_0x23fa7f(0x103)](_0x542863[_0x23fa7f(0x1b0)]()),this['callUpdateHelp'](),SceneManager[_0x23fa7f(0x271)][_0x23fa7f(0x12c)]();},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x17d)]=function(){const _0x41f7b3=_0x29f489;if(!this[_0x41f7b3(0x23c)]())return![];const _0x18d415=this['currentActor']();return this[_0x41f7b3(0x2a4)]&&_0x18d415&&_0x18d415['isFormationChangeOk']();},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x215)]=function(_0xd14955){const _0x5eb4b3=_0x29f489,_0x365e54=this[_0x5eb4b3(0x1a3)](_0xd14955);if(!_0x365e54)return this[_0x5eb4b3(0x1fa)](_0xd14955);this[_0x5eb4b3(0x2e6)]();const _0x306516=this[_0x5eb4b3(0x2fc)](_0xd14955);this[_0x5eb4b3(0x1d5)](_0xd14955);const _0x3f4600=_0x306516['y']+_0x306516[_0x5eb4b3(0x1f1)]-this[_0x5eb4b3(0x100)]();this[_0x5eb4b3(0x206)](_0x306516['x'],_0x3f4600,_0x306516['width'],0x2),this[_0x5eb4b3(0x114)](_0x365e54,_0x306516['x']+0x2,_0x306516['y']),this['drawActorName'](_0x365e54,_0x306516['x'],_0x3f4600,_0x306516[_0x5eb4b3(0xe9)]);},Window_PartyActive['prototype'][_0x29f489(0x1fa)]=function(_0x129dec){const _0x2d03f5=_0x29f489;this[_0x2d03f5(0x2e6)]();const _0x23be02=this[_0x2d03f5(0x2fc)](_0x129dec);this[_0x2d03f5(0x282)](_0x23be02['x'],_0x23be02['y'],_0x23be02[_0x2d03f5(0xe9)],_0x23be02[_0x2d03f5(0x1f1)]);const _0x123ada=_0x23be02['y']+Math[_0x2d03f5(0x234)]((_0x23be02[_0x2d03f5(0x1f1)]-this[_0x2d03f5(0x100)]())/0x2);this[_0x2d03f5(0x258)](ColorManager[_0x2d03f5(0xf8)]()),this[_0x2d03f5(0x2eb)](TextManager[_0x2d03f5(0x223)],_0x23be02['x'],_0x123ada,_0x23be02[_0x2d03f5(0xe9)],_0x2d03f5(0x158));},Window_PartyActive['prototype']['drawItemDarkRect']=function(_0x2c6d79,_0x4b8e9f,_0x52626b,_0x3c9861,_0x1ec9ab){const _0x297197=_0x29f489;_0x1ec9ab=Math[_0x297197(0x277)](_0x1ec9ab||0x1,0x1);while(_0x1ec9ab--){_0x3c9861=_0x3c9861||this[_0x297197(0x100)](),this[_0x297197(0x125)]['paintOpacity']=0xa0;const _0x5b4551=ColorManager['gaugeBackColor']();this[_0x297197(0x125)][_0x297197(0x130)](_0x2c6d79+0x1,_0x4b8e9f+0x1,_0x52626b-0x2,_0x3c9861-0x2,_0x5b4551),this['contents'][_0x297197(0x254)]=0xff;}},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x1d5)]=function(_0x5e345d){const _0x595397=_0x29f489;switch(Window_PartyActive[_0x595397(0x2bf)][_0x595397(0x16f)]()['trim']()){case _0x595397(0x167):this['drawItemImageFace'](_0x5e345d);break;case _0x595397(0x23b):this[_0x595397(0x1bd)](_0x5e345d);break;case _0x595397(0x2e9):Imported[_0x595397(0x17e)]&&this[_0x595397(0x13b)](_0x5e345d);break;};},Window_PartyActive['prototype'][_0x29f489(0x2bb)]=function(_0x23a288){const _0x9a5baf=_0x29f489,_0x3db999=this[_0x9a5baf(0x1a3)](_0x23a288),_0x2cc9e8=this['itemRect'](_0x23a288),_0x1d14ad=Math[_0x9a5baf(0x153)](ImageManager[_0x9a5baf(0x1c1)],_0x2cc9e8[_0x9a5baf(0xe9)]-0x2),_0x50e47c=_0x2cc9e8[_0x9a5baf(0x1f1)]-0x2;this[_0x9a5baf(0x1c5)](_0x3db999[_0x9a5baf(0x267)]());const _0x302473=Math[_0x9a5baf(0x234)](_0x2cc9e8['x']+(_0x2cc9e8[_0x9a5baf(0xe9)]-_0x1d14ad)/0x2);this[_0x9a5baf(0x16e)](_0x3db999,_0x302473,_0x2cc9e8['y']+0x1,_0x1d14ad,_0x50e47c),this[_0x9a5baf(0x1c5)](!![]);},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x1bd)]=function(_0x42297d){const _0x3897cd=_0x29f489,_0x9ab9cc=this['actor'](_0x42297d),_0x3b7e0d=this['itemRect'](_0x42297d),_0x1dc6fb=VisuMZ[_0x3897cd(0xff)][_0x3897cd(0x233)][_0x3897cd(0x16d)],_0x4d5b08=_0x3b7e0d['x']+Math['round'](_0x3b7e0d['width']/0x2)+_0x1dc6fb['ActiveSpriteOffsetX'],_0x1ea5e9=_0x3b7e0d['y']+_0x3b7e0d[_0x3897cd(0x1f1)]-this[_0x3897cd(0x100)]()-_0x1dc6fb['ActiveSpriteOffsetY'];this[_0x3897cd(0x216)](_0x9ab9cc,_0x4d5b08,_0x1ea5e9);},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x13b)]=function(_0x594ff8){const _0x355eae=_0x29f489,_0x4cb6f0=this[_0x355eae(0x1a3)](_0x594ff8),_0x42e208=_0x4cb6f0[_0x355eae(0x247)](),_0x5e027e=this[_0x355eae(0x2fc)](_0x594ff8),_0x24087c=VisuMZ[_0x355eae(0xff)][_0x355eae(0x233)][_0x355eae(0x16d)],_0x46d30f=_0x5e027e['x']+Math[_0x355eae(0x234)](_0x5e027e['width']/0x2)+_0x24087c[_0x355eae(0x2a1)],_0x32fad9=_0x5e027e['y']+_0x5e027e[_0x355eae(0x1f1)]-this[_0x355eae(0x100)]()-_0x24087c[_0x355eae(0x1d0)];this[_0x355eae(0x253)](_0x42e208,_0x46d30f,_0x32fad9);},Window_PartyActive[_0x29f489(0x26d)]['drawDarkRect']=function(_0x2a34e2,_0x505cd9,_0x166cee,_0x2c64d4){const _0x417352=_0x29f489,_0x2f1817=ColorManager[_0x417352(0x2d1)](),_0x47bbfc=ColorManager['dimColor2'](),_0x28f30c=_0x166cee/0x2,_0x4bda92=this['lineHeight']();while(_0x2c64d4--){this[_0x417352(0x125)][_0x417352(0x1cf)](_0x2a34e2,_0x505cd9,_0x28f30c,_0x4bda92,_0x47bbfc,_0x2f1817),this[_0x417352(0x125)][_0x417352(0x1cf)](_0x2a34e2+_0x28f30c,_0x505cd9,_0x28f30c,_0x4bda92,_0x2f1817,_0x47bbfc);}},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x15e)]=function(_0x4692f7,_0x2c927b,_0x3fa72a,_0x1f57b9){const _0x2c152d=_0x29f489;_0x1f57b9=_0x1f57b9||0xa8,this[_0x2c152d(0x258)](ColorManager[_0x2c152d(0x260)](_0x4692f7)),this[_0x2c152d(0x2eb)](_0x4692f7[_0x2c152d(0x1ee)](),_0x2c927b,_0x3fa72a,_0x1f57b9,_0x2c152d(0x158));},Window_PartyActive[_0x29f489(0x26d)][_0x29f489(0x26b)]=function(_0xcb68c0){const _0x6c0d4=_0x29f489;this[_0x6c0d4(0x162)]=_0xcb68c0,this[_0x6c0d4(0x2cc)]();},Window_PartyActive['prototype']['callUpdateHelp']=function(){const _0x5f3b2e=_0x29f489;if(this[_0x5f3b2e(0x162)])this[_0x5f3b2e(0x162)]['setActor'](this[_0x5f3b2e(0x1a3)](this[_0x5f3b2e(0x1f8)]()));};function Window_PartyReserve(){this['initialize'](...arguments);}Window_PartyReserve['prototype']=Object[_0x29f489(0x2e0)](Window_StatusBase[_0x29f489(0x26d)]),Window_PartyReserve['prototype'][_0x29f489(0x306)]=Window_PartyReserve,Window_PartyReserve[_0x29f489(0x2bf)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x16d)][_0x29f489(0x240)],Window_PartyReserve['_rowThickness']=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x16d)][_0x29f489(0x1dd)],Window_PartyReserve[_0x29f489(0x26d)]['initialize']=function(_0x4279c1){const _0x42f87b=_0x29f489;Window_StatusBase[_0x42f87b(0x26d)][_0x42f87b(0x122)][_0x42f87b(0x26a)](this,_0x4279c1),this[_0x42f87b(0xec)]=0x0,this['refresh']();},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0xee)]=function(){const _0x9fb14=_0x29f489;return VisuMZ[_0x9fb14(0xff)]['Settings'][_0x9fb14(0x16d)][_0x9fb14(0x19c)]||0x1;},Window_PartyReserve['prototype'][_0x29f489(0x19f)]=function(){const _0x108ac3=_0x29f489;return this['lineHeight']()*Window_PartyReserve[_0x108ac3(0x2a5)]+0x6;},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x23c)]=function(){const _0x30d2b0=_0x29f489;return VisuMZ[_0x30d2b0(0xff)]['Settings']['General'][_0x30d2b0(0xfe)];},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x1d7)]=function(){const _0xe7b728=_0x29f489;let _0x270c72=$gameParty['reserveMembers']()[_0xe7b728(0x255)];if(this[_0xe7b728(0x23c)]())_0x270c72++;return _0x270c72;},Window_PartyReserve['prototype']['actor']=function(_0x4deb51){const _0x57d9c9=_0x29f489;return $gameParty[_0x57d9c9(0x222)]()[_0x4deb51];},Window_PartyReserve[_0x29f489(0x26d)]['currentActor']=function(){const _0x351c24=_0x29f489;return this[_0x351c24(0x1a3)](this['index']());},Window_PartyReserve['prototype'][_0x29f489(0x265)]=function(){const _0x32943b=_0x29f489;SoundManager[_0x32943b(0x2df)]();},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x2fe)]=function(){const _0xcfe39a=_0x29f489,_0x57d38f=this[_0xcfe39a(0x1a3)](this['index']());return _0x57d38f?_0x57d38f['isFormationChangeOk']():!![];},Window_PartyReserve['prototype'][_0x29f489(0x13e)]=function(){const _0x664626=_0x29f489;Window_StatusBase[_0x664626(0x26d)][_0x664626(0x13e)][_0x664626(0x26a)](this),this[_0x664626(0x1f0)]();},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x1ea)]=function(_0x181200){const _0x5d1398=_0x29f489;this[_0x5d1398(0x1f8)]()<=0x0&&Input[_0x5d1398(0x2d3)]('up')?this[_0x5d1398(0x11b)]():Window_StatusBase['prototype'][_0x5d1398(0x1ea)][_0x5d1398(0x26a)](this,_0x181200);},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x195)]=function(){const _0x3c3075=_0x29f489,_0x5e3d87=this[_0x3c3075(0x1f8)](),_0x490af7=_0x5e3d87+0x1>=this['maxItems']()-0x1?0x0:_0x5e3d87+0x1;this[_0x3c3075(0x272)](_0x5e3d87,_0x490af7);},Window_PartyReserve[_0x29f489(0x26d)]['cursorPageup']=function(){const _0x5c20d4=_0x29f489,_0x5c3236=this[_0x5c20d4(0x1f8)](),_0x67a006=_0x5c3236-0x1<0x0?this[_0x5c20d4(0x1d7)]()-0x2:_0x5c3236-0x1;this[_0x5c20d4(0x272)](_0x5c3236,_0x67a006);},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x272)]=function(_0x3fefb8,_0x1b58b7){const _0x2552f4=_0x29f489,_0x20ecae=this['actor'](_0x3fefb8),_0x4728f4=this[_0x2552f4(0x1a3)](_0x1b58b7);if(!_0x20ecae?.[_0x2552f4(0x267)]()||!_0x4728f4?.[_0x2552f4(0x267)]())return;else{if(!_0x20ecae||!_0x4728f4)return;}const _0x37337c=$gameParty[_0x2552f4(0x145)],_0x1a63d4=_0x37337c['indexOf'](_0x20ecae['actorId']()),_0x5b546d=_0x37337c['indexOf'](_0x4728f4[_0x2552f4(0x1b0)]());_0x37337c[_0x1a63d4]=_0x4728f4?_0x4728f4[_0x2552f4(0x1b0)]():0x0,_0x37337c[_0x5b546d]=_0x20ecae?_0x20ecae['actorId']():0x0,this[_0x2552f4(0x20f)](),this[_0x2552f4(0x12e)](),this['smoothSelect'](_0x1b58b7);},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x1f0)]=function(){const _0x2a255e=_0x29f489;if(!this['isShiftShortcutEnabled']())return;Input[_0x2a255e(0x2d3)](_0x2a255e(0x108))&&this[_0x2a255e(0x24c)]();},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x24c)]=function(){const _0x4806c8=_0x29f489;SoundManager['playEquip'](),$gameParty['sortActors'](),this[_0x4806c8(0x204)](0x0),SceneManager['_scene']['refreshAllWindows']();},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x203)]=function(){const _0x47163b=_0x29f489;return this[_0x47163b(0x2a4)];},Window_PartyReserve['prototype'][_0x29f489(0x2c1)]=function(){const _0x500263=_0x29f489,_0x59fb91=this[_0x500263(0x25f)]();return _0x59fb91?_0x59fb91[_0x500263(0x1f8)]():-0x1;},Window_PartyReserve[_0x29f489(0x26d)]['select']=function(_0xa730fc){const _0x5d4efb=_0x29f489;Window_StatusBase[_0x5d4efb(0x26d)]['select'][_0x5d4efb(0x26a)](this,_0xa730fc);if(_0xa730fc>=0x0)this[_0x5d4efb(0xec)]=_0xa730fc;},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x2bd)]=function(){const _0x5b6586=_0x29f489;this['_lastIndex']=Math['min'](this[_0x5b6586(0xec)],this[_0x5b6586(0x1d7)]()-0x1),this[_0x5b6586(0x204)](this[_0x5b6586(0xec)]),this[_0x5b6586(0x2fa)](!![]),this['cursorVisible']=!![];},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x215)]=function(_0x181f99){const _0x4fcef0=_0x29f489,_0x56530a=this[_0x4fcef0(0x1a3)](_0x181f99);if(!_0x56530a)return this['drawRemoveCommand'](_0x181f99);const _0x181a18=this['itemLineRect'](_0x181f99);this[_0x4fcef0(0x1d5)](_0x181f99);const _0x23e4be=0xa8,_0x3ca166=Window_PartyReserve[_0x4fcef0(0x2a5)]===0x1,_0x52e989=ImageManager[_0x4fcef0(0x16b)]*(_0x3ca166?0x2:0x1),_0x33907d=this['nameStartPosition']()+this[_0x4fcef0(0xf9)](),_0x241dbb=_0x181a18[_0x4fcef0(0xe9)]-_0x23e4be,_0x326695=_0x181a18['x']+_0x52e989+Math[_0x4fcef0(0x153)](_0x33907d,_0x241dbb),_0x5d0886=_0x3ca166?![]:!![];this[_0x4fcef0(0x1c5)](_0x56530a[_0x4fcef0(0x267)]()),this[_0x4fcef0(0x114)](_0x56530a,_0x181a18['x'],_0x181a18['y'],_0x5d0886),this[_0x4fcef0(0x15e)](_0x56530a,_0x326695,_0x181a18['y'],_0x23e4be),this['changePaintOpacity'](!![]);},Window_PartyReserve['prototype']['nameStartPosition']=function(){const _0x51a1b7=_0x29f489,_0x70920f=VisuMZ[_0x51a1b7(0xff)][_0x51a1b7(0x233)][_0x51a1b7(0x16d)];switch(Window_PartyReserve[_0x51a1b7(0x2bf)][_0x51a1b7(0x16f)]()[_0x51a1b7(0xef)]()){case _0x51a1b7(0x167):return ImageManager[_0x51a1b7(0x1c1)];case _0x51a1b7(0x23b):return _0x70920f[_0x51a1b7(0x115)]*0x2;case _0x51a1b7(0x2e9):return _0x70920f[_0x51a1b7(0x10e)]*0x2;};},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x13a)]=function(_0x1f6595){const _0xd02354=_0x29f489,_0x46b86e=this['itemLineRect'](_0x1f6595);this['changePaintOpacity'](!![]);const _0x9d6f7=TextManager['removePartyMember'];this[_0xd02354(0x2eb)](_0x9d6f7,_0x46b86e['x'],_0x46b86e['y'],_0x46b86e[_0xd02354(0xe9)],_0xd02354(0x158));},Window_PartyReserve['prototype']['drawItemImage']=function(_0x261aed){const _0x3c0150=_0x29f489;switch(Window_PartyReserve[_0x3c0150(0x2bf)]['toLowerCase']()[_0x3c0150(0xef)]()){case'face':this[_0x3c0150(0x2bb)](_0x261aed);break;case _0x3c0150(0x23b):this['drawItemImageSprite'](_0x261aed);break;case _0x3c0150(0x2e9):Imported[_0x3c0150(0x17e)]&&this[_0x3c0150(0x13b)](_0x261aed);break;};},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x2bb)]=function(_0x2112d9){const _0x41a61b=_0x29f489,_0x3062fd=this['actor'](_0x2112d9),_0x333caf=this['itemRect'](_0x2112d9),_0x3611b1=Window_PartyReserve[_0x41a61b(0x2a5)]===0x1;_0x333caf['x']+=ImageManager[_0x41a61b(0x16b)]*(_0x3611b1?0x2:0x1);const _0x49458f=ImageManager['faceWidth'],_0x2ef745=_0x333caf[_0x41a61b(0x1f1)]-0x2;this[_0x41a61b(0x1c5)](_0x3062fd[_0x41a61b(0x267)]()),this[_0x41a61b(0x16e)](_0x3062fd,_0x333caf['x']+0x1,_0x333caf['y']+0x1,_0x49458f,_0x2ef745),this['changePaintOpacity'](!![]);},Window_PartyReserve['prototype'][_0x29f489(0x1bd)]=function(_0x3cc458){const _0x17ad10=_0x29f489,_0x383e26=this[_0x17ad10(0x1a3)](_0x3cc458),_0x2728c8=this[_0x17ad10(0x2fc)](_0x3cc458),_0x36153d=Window_PartyReserve[_0x17ad10(0x2a5)]===0x1;_0x2728c8['x']+=ImageManager['iconWidth']*(_0x36153d?0x2:0x1);const _0xe6b0b4=VisuMZ[_0x17ad10(0xff)][_0x17ad10(0x233)][_0x17ad10(0x16d)],_0x5d3540=_0x2728c8['x']+_0xe6b0b4[_0x17ad10(0x115)]+this[_0x17ad10(0xf9)](),_0xf19481=_0x2728c8['y']+_0x2728c8['height']-_0xe6b0b4[_0x17ad10(0x231)];this[_0x17ad10(0x216)](_0x383e26,_0x5d3540,_0xf19481);},Window_PartyReserve[_0x29f489(0x26d)][_0x29f489(0x13b)]=function(_0x537a3c){const _0x5e2968=_0x29f489,_0x22cf4a=this[_0x5e2968(0x1a3)](_0x537a3c),_0x511669=_0x22cf4a[_0x5e2968(0x247)](),_0x5643ca=this[_0x5e2968(0x2fc)](_0x537a3c),_0x21b137=Window_PartyReserve[_0x5e2968(0x2a5)]===0x1;_0x5643ca['x']+=ImageManager[_0x5e2968(0x16b)]*(_0x21b137?0x2:0x1);const _0x11ff76=VisuMZ[_0x5e2968(0xff)]['Settings'][_0x5e2968(0x16d)],_0x31e9df=_0x5643ca['x']+_0x11ff76[_0x5e2968(0x10e)]+this[_0x5e2968(0xf9)](),_0x1f7578=_0x5643ca['y']+_0x5643ca[_0x5e2968(0x1f1)]-_0x11ff76[_0x5e2968(0x27a)];this[_0x5e2968(0x253)](_0x511669,_0x31e9df,_0x1f7578);},Window_PartyReserve['prototype']['setStatusWindow']=function(_0x293500){const _0x31847a=_0x29f489;this[_0x31847a(0x162)]=_0x293500,this['callUpdateHelp']();},Window_PartyReserve[_0x29f489(0x26d)]['callUpdateHelp']=function(){const _0x145c61=_0x29f489;this['_statusWindow']&&this['_statusWindow'][_0x145c61(0x2f6)](this[_0x145c61(0x1a3)](this[_0x145c61(0x1f8)]()));};function Window_PartyStatus(){const _0x2f989c=_0x29f489;this[_0x2f989c(0x122)](...arguments);}Window_PartyStatus[_0x29f489(0x26d)]=Object[_0x29f489(0x2e0)](Window_StatusBase[_0x29f489(0x26d)]),Window_PartyStatus[_0x29f489(0x26d)]['constructor']=Window_PartyStatus,Window_PartyStatus['prototype'][_0x29f489(0x122)]=function(_0x24c96e){const _0x310754=_0x29f489;this[_0x310754(0x29e)]=null,Window_StatusBase['prototype']['initialize']['call'](this,_0x24c96e);},Window_PartyStatus['prototype'][_0x29f489(0x282)]=function(_0x53ed7e,_0x33607f,_0x397a63,_0x356fa2,_0x760b2a){const _0x7bde2e=_0x29f489;if(VisuMZ[_0x7bde2e(0xff)][_0x7bde2e(0x233)]['General'][_0x7bde2e(0xe8)]===![])return;_0x760b2a=Math[_0x7bde2e(0x277)](_0x760b2a||0x1,0x1);while(_0x760b2a--){_0x356fa2=_0x356fa2||this[_0x7bde2e(0x100)](),this[_0x7bde2e(0x125)][_0x7bde2e(0x254)]=0xa0;const _0x5cf3a3=ColorManager['getPartySystemBackColor']();this[_0x7bde2e(0x125)][_0x7bde2e(0x130)](_0x53ed7e+0x1,_0x33607f+0x1,_0x397a63-0x2,_0x356fa2-0x2,_0x5cf3a3),this[_0x7bde2e(0x125)][_0x7bde2e(0x254)]=0xff;}},ColorManager[_0x29f489(0x1e9)]=function(){const _0x467018=_0x29f489,_0x253ce7=VisuMZ['PartySystem'][_0x467018(0x233)]['General'];let _0x12ec8d=_0x253ce7[_0x467018(0x274)]!==undefined?_0x253ce7[_0x467018(0x274)]:0x13;return ColorManager[_0x467018(0x249)](_0x12ec8d);},Window_PartyStatus[_0x29f489(0x26d)][_0x29f489(0x2f6)]=function(_0x264d98){const _0x1bf789=_0x29f489;if(this[_0x1bf789(0x29e)]===_0x264d98)return;this[_0x1bf789(0x29e)]=_0x264d98;if(_0x264d98){const _0x231ba9=ImageManager[_0x1bf789(0x141)](_0x264d98[_0x1bf789(0xfc)]());_0x231ba9[_0x1bf789(0x217)](this[_0x1bf789(0x20f)][_0x1bf789(0x1d6)](this));}else this[_0x1bf789(0x20f)]();},Window_PartyStatus[_0x29f489(0x26d)][_0x29f489(0x20f)]=function(){const _0xb12594=_0x29f489;Window_StatusBase[_0xb12594(0x26d)][_0xb12594(0x20f)][_0xb12594(0x26a)](this),this[_0xb12594(0x125)][_0xb12594(0x2d5)](),this[_0xb12594(0x2e6)](),VisuMZ[_0xb12594(0xff)][_0xb12594(0x233)]['Window'][_0xb12594(0x2ce)][_0xb12594(0x26a)](this);},Window_PartyStatus[_0x29f489(0x26d)][_0x29f489(0x12f)]=function(){const _0x32f7cf=_0x29f489;if(!this[_0x32f7cf(0x29e)]){this['drawItemDarkRect'](0x0,0x0,this[_0x32f7cf(0x1fd)],this['innerHeight']);const _0x474a75=Math['round']((this[_0x32f7cf(0x287)]-this['lineHeight']())/0x2);this[_0x32f7cf(0x258)](ColorManager[_0x32f7cf(0xf8)]()),this['drawText'](TextManager['emptyPartyMember'],0x0,_0x474a75,this[_0x32f7cf(0x1fd)],_0x32f7cf(0x158));return;}this[_0x32f7cf(0x16e)](this[_0x32f7cf(0x29e)],0x1,0x0,ImageManager[_0x32f7cf(0x1c1)],ImageManager['faceHeight']),this[_0x32f7cf(0x190)](this[_0x32f7cf(0x29e)],ImageManager[_0x32f7cf(0x1c1)]+0x24,0x0);const _0x3d4503=this[_0x32f7cf(0x100)](),_0x1be748=this[_0x32f7cf(0x105)](),_0x99bb7b=Math[_0x32f7cf(0x234)](this[_0x32f7cf(0x1fd)]/0x2),_0x2b33a4=Math[_0x32f7cf(0x280)](_0x1be748['length']/0x2)*_0x3d4503,_0x59c89e=0x0;let _0x2bf489=0x0,_0x3411d7=ImageManager[_0x32f7cf(0x2b8)]+_0x3d4503/0x2;for(const _0x3d8803 of _0x1be748){this[_0x32f7cf(0x282)](_0x2bf489,_0x3411d7,_0x99bb7b,_0x3d4503),this[_0x32f7cf(0x2cd)](_0x3d8803,_0x2bf489,_0x3411d7,_0x99bb7b),this[_0x32f7cf(0x127)](_0x3d8803,_0x2bf489,_0x3411d7,_0x99bb7b),_0x2bf489===_0x59c89e?_0x2bf489+=_0x99bb7b:(_0x2bf489=_0x59c89e,_0x3411d7+=_0x3d4503);}},Window_PartyStatus['prototype'][_0x29f489(0x105)]=function(){const _0x17bde9=_0x29f489;return Imported[_0x17bde9(0x10a)]?VisuMZ['CoreEngine'][_0x17bde9(0x233)][_0x17bde9(0x13d)]['DisplayedParams']:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus[_0x29f489(0x26d)][_0x29f489(0x2cd)]=function(_0xc41399,_0x490468,_0x2bc8f8,_0x5c2f87){const _0x749c8d=_0x29f489,_0x53ef9f=this['itemPadding']();_0x5c2f87-=_0x53ef9f*0x2;if(Imported[_0x749c8d(0x10a)])this[_0x749c8d(0x296)](_0x490468+_0x53ef9f,_0x2bc8f8,_0x5c2f87,_0xc41399,![]);else{const _0x183478=TextManager[_0x749c8d(0x252)](_0xc41399);this[_0x749c8d(0x258)](ColorManager[_0x749c8d(0xf8)]()),this[_0x749c8d(0x2eb)](_0x183478,_0x490468+_0x53ef9f,_0x2bc8f8,_0x5c2f87);}},Window_PartyStatus[_0x29f489(0x26d)]['drawParamValue']=function(_0x7d7083,_0x3547b3,_0xb949e2,_0x44dfb2){const _0x76b98b=_0x29f489;this[_0x76b98b(0x2e6)]();const _0x3e99a3=this[_0x76b98b(0xf9)](),_0x561e4c=this['getParamValue'](_0x7d7083);this[_0x76b98b(0x2eb)](_0x561e4c,_0x3547b3+_0x3e99a3,_0xb949e2,_0x44dfb2-_0x3e99a3*0x2,_0x76b98b(0x193));},Window_PartyStatus['prototype'][_0x29f489(0x226)]=function(_0x575478){const _0x3884b5=_0x29f489,_0x304bbd=this['_actor'];return Imported[_0x3884b5(0x10a)]?_0x304bbd[_0x3884b5(0x232)](_0x575478,!![]):_0x304bbd[_0x3884b5(0x252)](_0x575478);};function Window_PartyBattleSwitch(){const _0x33bb42=_0x29f489;this[_0x33bb42(0x122)](...arguments);}Window_PartyBattleSwitch['prototype']=Object[_0x29f489(0x2e0)](Window_StatusBase['prototype']),Window_PartyBattleSwitch['prototype'][_0x29f489(0x306)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x122)]=function(_0x156b57){const _0x5b1a08=_0x29f489;Window_StatusBase['prototype'][_0x5b1a08(0x122)][_0x5b1a08(0x26a)](this,_0x156b57),this[_0x5b1a08(0x14e)](VisuMZ[_0x5b1a08(0xff)][_0x5b1a08(0x233)]['Window'][_0x5b1a08(0x18f)]),this[_0x5b1a08(0x136)]=0x0;},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x17f)]=function(){const _0x5a72bc=_0x29f489;for(const _0x3c4843 of $gameParty['allMembers']()){ImageManager[_0x5a72bc(0x141)](_0x3c4843[_0x5a72bc(0xfc)]());}},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0xee)]=function(){return 0x1;},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x1a3)]=function(_0x40abac){const _0x45be3e=_0x29f489;return $gameParty[_0x45be3e(0x222)]()[_0x40abac];},Window_PartyBattleSwitch['prototype']['currentActor']=function(){return this['actor'](this['index']());},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x19f)]=function(){return this['lineHeight']()*0x2+0x8;},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x1d7)]=function(){const _0x13f2a2=_0x29f489;return $gameParty['reserveMembers']()[_0x13f2a2(0x255)];},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x2ab)]=function(){const _0xcd8dc6=_0x29f489;Window_StatusBase[_0xcd8dc6(0x26d)][_0xcd8dc6(0x2ab)]['call'](this),this[_0xcd8dc6(0x180)](),this[_0xcd8dc6(0x20f)](),this[_0xcd8dc6(0x204)](0x0);},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x171)]=function(){const _0x53ff6e=_0x29f489;Window_StatusBase['prototype'][_0x53ff6e(0x171)][_0x53ff6e(0x26a)](this),this[_0x53ff6e(0x2ac)]();},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x2fe)]=function(){return this['isEnabled'](this['currentActor']());},Window_PartyBattleSwitch[_0x29f489(0x26d)]['isEnabled']=function(_0x487042){const _0xa7438f=_0x29f489;if(!_0x487042)return![];return _0x487042[_0xa7438f(0x267)]()&&_0x487042[_0xa7438f(0x187)]();},Window_PartyBattleSwitch['prototype'][_0x29f489(0x215)]=function(_0x502ffc){const _0xefef54=_0x29f489,_0x54bff3=this[_0xefef54(0x1a3)](_0x502ffc);if(!_0x54bff3)return;const _0x2d3d3b=ImageManager[_0xefef54(0x141)](_0x54bff3[_0xefef54(0xfc)]());_0x2d3d3b[_0xefef54(0x217)](this['processDrawItem'][_0xefef54(0x1d6)](this,_0x502ffc));},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x27d)]=function(_0x480bbf){const _0x4a7e5b=_0x29f489;this[_0x4a7e5b(0x1d5)](_0x480bbf),this[_0x4a7e5b(0x199)](_0x480bbf);},Window_PartyBattleSwitch[_0x29f489(0x26d)]['drawItemImage']=function(_0x5e5687){const _0x260521=_0x29f489,_0xfa905f=this[_0x260521(0x1a3)](_0x5e5687),_0x1bbf3=this[_0x260521(0x2fc)](_0x5e5687);this[_0x260521(0x1c5)](this[_0x260521(0x28c)](_0xfa905f)),this[_0x260521(0x16e)](_0xfa905f,_0x1bbf3['x']+0x1,_0x1bbf3['y']+0x1,ImageManager[_0x260521(0x1c1)],_0x1bbf3['height']-0x2),this[_0x260521(0x1c5)](!![]);},Window_PartyBattleSwitch[_0x29f489(0x26d)][_0x29f489(0x199)]=function(_0x1256df){const _0x183304=_0x29f489,_0x3cac16=this['actor'](_0x1256df),_0x5465ee=this[_0x183304(0x173)](_0x1256df),_0x3a01d1=_0x5465ee['x']+ImageManager[_0x183304(0x1c1)]+0x24,_0x40b440=_0x3a01d1+0xb4;this[_0x183304(0x1c5)](this[_0x183304(0x28c)](_0x3cac16)),this[_0x183304(0x15e)](_0x3cac16,_0x3a01d1,_0x5465ee['y']),this['drawActorClass'](_0x3cac16,_0x3a01d1,_0x5465ee['y']+this[_0x183304(0x100)]()),this[_0x183304(0x1a4)](_0x3cac16,_0x40b440,_0x5465ee['y']),this[_0x183304(0x1c5)](!![]);};Imported[_0x29f489(0x155)]&&(ImageManager[_0x29f489(0x150)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)]['General'][_0x29f489(0x2ae)]??0x4b,TextManager[_0x29f489(0x1d1)]=VisuMZ['PartySystem'][_0x29f489(0x233)][_0x29f489(0x27b)]['BattlePartyCmd'],TextManager[_0x29f489(0x1b8)]=VisuMZ[_0x29f489(0xff)]['Settings']['Vocab'][_0x29f489(0x116)],TextManager[_0x29f489(0xe2)]=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)][_0x29f489(0x22f)],TextManager[_0x29f489(0x1c7)]=VisuMZ['PartySystem']['Settings']['Vocab'][_0x29f489(0x1da)],TextManager['ActiveTpbFormationMessage']=VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x27b)][_0x29f489(0x198)],VisuMZ[_0x29f489(0xff)][_0x29f489(0x169)]=SceneManager[_0x29f489(0x1cb)],SceneManager['isPreviousSceneBattleTransitionable']=function(){const _0x4d5cc8=_0x29f489;if(SceneManager[_0x4d5cc8(0x221)](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x4d5cc8(0x169)]['call'](this);},VisuMZ[_0x29f489(0xff)][_0x29f489(0x1ce)]=SceneManager[_0x29f489(0x159)],SceneManager[_0x29f489(0x159)]=function(){const _0x2a9ed2=_0x29f489;if(SceneManager[_0x2a9ed2(0x1ca)](Scene_Party))return!![];return VisuMZ[_0x2a9ed2(0xff)]['SceneManager_isNextSceneBattleTransitionable'][_0x2a9ed2(0x26a)](this);},SceneManager[_0x29f489(0x256)]=function(){const _0x13007e=_0x29f489;return this[_0x13007e(0x271)]&&this[_0x13007e(0x271)][_0x13007e(0x306)]===Scene_Map;},VisuMZ[_0x29f489(0xff)][_0x29f489(0x14d)]=Scene_Battle['prototype'][_0x29f489(0x147)],Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x147)]=function(){const _0x502c52=_0x29f489;VisuMZ['PartySystem'][_0x502c52(0x14d)][_0x502c52(0x26a)](this),this[_0x502c52(0x1f6)](),this[_0x502c52(0x196)](),this['postPartySwitchMenuTurnBased']();},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x1f6)]=function(){const _0x1ba8cb=_0x29f489,_0x1d6ea7=this[_0x1ba8cb(0x172)]();this[_0x1ba8cb(0x2e4)]=new Window_PartyBattleSwitch(_0x1d6ea7),this[_0x1ba8cb(0x224)](this[_0x1ba8cb(0x2e4)]),this[_0x1ba8cb(0x2e4)]['setHandler']('ok',this[_0x1ba8cb(0x1a7)][_0x1ba8cb(0x1d6)](this)),this[_0x1ba8cb(0x2e4)]['setHandler'](_0x1ba8cb(0x18a),this[_0x1ba8cb(0x2f2)]['bind'](this));},Scene_Battle['prototype'][_0x29f489(0x172)]=function(){const _0x6334a0=_0x29f489,_0x259329=this[_0x6334a0(0x1c2)]();return _0x259329==='border'?this[_0x6334a0(0x1e7)]():this[_0x6334a0(0x297)]();},Scene_Battle['prototype']['partySwitchWindowRectStandard']=function(){const _0x4b56b2=_0x29f489;return VisuMZ[_0x4b56b2(0xff)][_0x4b56b2(0x233)][_0x4b56b2(0x16d)]['BattleSwitchWindowRect'][_0x4b56b2(0x26a)](this);},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x1e7)]=function(){const _0x4a5d3e=_0x29f489,_0x2aff28=this[_0x4a5d3e(0x2f8)](),_0xa6b202=$gameSystem[_0x4a5d3e(0x186)]()*0x2;return _0x2aff28['width']=0x204+_0xa6b202,_0x2aff28;},VisuMZ['PartySystem'][_0x29f489(0x24f)]=Scene_Battle['prototype']['isAnyInputWindowActive'],Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x15d)]=function(){const _0x1df4dc=_0x29f489;if(this['_partyMemberSwitchWindow']&&this['_partyMemberSwitchWindow'][_0x1df4dc(0x2a4)])return!![];if(this[_0x1df4dc(0x1a2)])return!![];if(this['_callPartyMemberSwitch'])return!![];if(this['_callSceneParty'])return!![];return VisuMZ[_0x1df4dc(0xff)]['Scene_Battle_isAnyInputWindowActive'][_0x1df4dc(0x26a)](this);},VisuMZ[_0x29f489(0xff)][_0x29f489(0xeb)]=Scene_Battle['prototype']['createPartyCommandWindowBattleCore'],Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x1f9)]=function(){const _0x434e27=_0x29f489;VisuMZ['PartySystem']['Scene_Battle_createPartyCommandWindowBattleCore'][_0x434e27(0x26a)](this),this[_0x434e27(0x291)]['setHandler'](_0x434e27(0x2bc),this[_0x434e27(0x1af)][_0x434e27(0x1d6)](this));},Scene_Battle[_0x29f489(0x26d)]['commandFormation']=function(){const _0x524e3b=_0x29f489;this[_0x524e3b(0x111)]()?(this[_0x524e3b(0x294)]=!![],this[_0x524e3b(0x2c6)][_0x524e3b(0x117)](TextManager[_0x524e3b(0x184)][_0x524e3b(0x2ba)](TextManager['formation']))):this[_0x524e3b(0x1b1)]();},Scene_Battle[_0x29f489(0x26d)]['isQueueFormationMenu']=function(){const _0x567f6b=_0x29f489;return BattleManager[_0x567f6b(0x140)]();},Scene_Battle[_0x29f489(0x26d)]['callFormation']=function(){const _0x2550e7=_0x29f489;this[_0x2550e7(0x294)]=![],this['_spriteset'][_0x2550e7(0x1a9)](),this[_0x2550e7(0x1ff)][_0x2550e7(0x18e)]=![],VisuMZ[_0x2550e7(0xff)][_0x2550e7(0x23a)]()&&SceneManager['snapForBackground'](),SceneManager['push'](Scene_Party),$gameParty['applyBattlePartySwitchCooldown'](),BattleManager['isTpb']()&&(BattleManager[_0x2550e7(0x2d2)]=BattleManager[_0x2550e7(0x1a3)]());},VisuMZ['PartySystem'][_0x29f489(0x23a)]=function(){const _0x56a4c1=_0x29f489,_0x2ef0a3=SceneManager[_0x56a4c1(0x271)][_0x56a4c1(0x210)][_0x56a4c1(0x174)],_0x2a9e71=SceneManager[_0x56a4c1(0x271)][_0x56a4c1(0x210)][_0x56a4c1(0x174)];if(_0x2ef0a3&&_0x2ef0a3['battleback1Name']()!==''&&_0x2ef0a3[_0x56a4c1(0x191)]()!==null)return!![];if(_0x2a9e71&&_0x2a9e71[_0x56a4c1(0x20e)]()!==''&&_0x2a9e71[_0x56a4c1(0x20e)]()!==null)return!![];return![];},VisuMZ[_0x29f489(0xff)][_0x29f489(0x19b)]=Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x211)],Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x211)]=function(){const _0x583383=_0x29f489;VisuMZ[_0x583383(0xff)]['Scene_Battle_updateBattleProcess'][_0x583383(0x26a)](this),this[_0x583383(0x294)]&&!BattleManager['_subject']&&this[_0x583383(0x1b1)](),this[_0x583383(0x2e8)]&&!BattleManager[_0x583383(0x286)]&&this['callPartyMemberSwitch']();},VisuMZ[_0x29f489(0xff)][_0x29f489(0x22e)]=Scene_Battle['prototype']['isTimeActive'],Scene_Battle['prototype']['isTimeActive']=function(){const _0x4ffcba=_0x29f489;if(BattleManager[_0x4ffcba(0x140)]()){if(this[_0x4ffcba(0x2e4)]&&this[_0x4ffcba(0x2e4)]['active'])return![];}return VisuMZ['PartySystem'][_0x4ffcba(0x22e)][_0x4ffcba(0x26a)](this);},VisuMZ[_0x29f489(0xff)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x29f489(0x26d)]['createActorCommandWindow'],Scene_Battle[_0x29f489(0x26d)]['createActorCommandWindow']=function(){const _0x3f8ced=_0x29f489;VisuMZ[_0x3f8ced(0xff)][_0x3f8ced(0x15a)][_0x3f8ced(0x26a)](this),this['_actorCommandWindow'][_0x3f8ced(0x137)](_0x3f8ced(0x2bc),this['commandPartyMemberSwitch']['bind'](this));},Scene_Battle['prototype'][_0x29f489(0x146)]=function(){const _0x945c71=_0x29f489;this[_0x945c71(0x111)]()?(this[_0x945c71(0x2e8)]=!![],this[_0x945c71(0x2c6)][_0x945c71(0x117)](TextManager[_0x945c71(0x184)]['format'](TextManager[_0x945c71(0x2bc)]))):this['callPartyMemberSwitch']();},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x28f)]=function(){const _0x247d0f=_0x29f489;this['_callPartyMemberSwitch']=![],this['_logWindow'][_0x247d0f(0x2d5)](),BattleManager[_0x247d0f(0x1a3)]()&&this[_0x247d0f(0x2e4)][_0x247d0f(0x2ab)]();},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x1a7)]=function(){const _0x5ecad4=_0x29f489,_0x54afc=this['_partyMemberSwitchWindow'][_0x5ecad4(0x25f)]();_0x54afc?this[_0x5ecad4(0x1eb)](_0x54afc):(this[_0x5ecad4(0x2e4)]['deactivate'](),this[_0x5ecad4(0x183)][_0x5ecad4(0x2ab)]());},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x1eb)]=function(_0x26a997){const _0x366e8d=_0x29f489,_0x4e81a9=BattleManager[_0x366e8d(0x1a3)](),_0x27eddf=_0x4e81a9[_0x366e8d(0x27f)]();this[_0x366e8d(0x2e4)][_0x366e8d(0x171)](),this[_0x366e8d(0x207)]()&&_0x27eddf?(this['_partySystemSwitchOut']=!![],_0x27eddf[_0x366e8d(0x143)](_0x26a997)):this[_0x366e8d(0x2f5)](_0x26a997);},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x207)]=function(){const _0x25203c=_0x29f489;return VisuMZ[_0x25203c(0xff)][_0x25203c(0x233)][_0x25203c(0x1e4)][_0x25203c(0x2cf)];},Scene_Battle[_0x29f489(0x26d)]['processPartySwitchMember']=function(_0x108e49){const _0x331a4f=_0x29f489;this[_0x331a4f(0x1a2)]=![];const _0x353be9=BattleManager[_0x331a4f(0x1a3)](),_0x3274f0=_0x353be9['battler'](),_0x2b9a0a=$gameParty[_0x331a4f(0x2ad)]['indexOf'](_0x353be9[_0x331a4f(0x1b0)]());$gameParty[_0x331a4f(0x2ad)][_0x2b9a0a]=_0x108e49['actorId'](),$gameParty[_0x331a4f(0x1c8)](),$gameTroop['partyChangeRefresh']();if(this[_0x331a4f(0x18c)]())_0x108e49[_0x331a4f(0x144)]=_0x353be9[_0x331a4f(0x144)],_0x108e49[_0x331a4f(0x279)]=_0x331a4f(0x2dc);else BattleManager[_0x331a4f(0x11c)]()&&_0x108e49[_0x331a4f(0x11d)]();BattleManager[_0x331a4f(0x129)]=_0x108e49,BattleManager[_0x331a4f(0x1e5)](_0x353be9,_0x108e49),_0x108e49[_0x331a4f(0xfb)](),_0x108e49['makeActions'](),_0x108e49[_0x331a4f(0x107)](_0x353be9),_0x3274f0&&_0x3274f0[_0x331a4f(0x2e1)](_0x108e49),this[_0x331a4f(0x162)][_0x331a4f(0x160)](_0x353be9,_0x108e49),this[_0x331a4f(0x162)][_0x331a4f(0x20f)](),this[_0x331a4f(0x183)][_0x331a4f(0x19d)](_0x108e49),this['_actorCommandWindow'][_0x331a4f(0x204)](0x0),this['_actorCommandWindow'][_0x331a4f(0x2ab)](),this[_0x331a4f(0x183)][_0x331a4f(0x21a)]=!![];},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x18c)]=function(){const _0x5d0683=_0x29f489;if(!BattleManager[_0x5d0683(0x11c)]())return![];const _0x3fc8a1=VisuMZ[_0x5d0683(0xff)]['Settings'][_0x5d0683(0x1e4)];return _0x3fc8a1[_0x5d0683(0x2fb)]===undefined&&(_0x3fc8a1[_0x5d0683(0x2fb)]=!![]),_0x3fc8a1[_0x5d0683(0x2fb)];},Window_StatusBase[_0x29f489(0x26d)][_0x29f489(0x160)]=function(_0x273d70,_0x6f0b66){const _0xa2f84e=_0x29f489,_0x3a154b=_0xa2f84e(0x2b1)[_0xa2f84e(0x2ba)](_0x273d70[_0xa2f84e(0x1b0)]()),_0x4454d4=this[_0xa2f84e(0x305)](_0x3a154b,Sprite_StateIcon);_0x4454d4[_0xa2f84e(0x19d)](_0x6f0b66);},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x2f2)]=function(){const _0x2e7360=_0x29f489;this[_0x2e7360(0x2e4)][_0x2e7360(0x171)](),this['_actorCommandWindow']['activate'](),this[_0x2e7360(0x183)]['refresh']();},Scene_Battle[_0x29f489(0x26d)]['postPartySwitchMenuTpb']=function(){const _0x2dc168=_0x29f489;if(!BattleManager[_0x2dc168(0x11c)]())return;if(!SceneManager[_0x2dc168(0x221)](Scene_Party))return;this['_partyCommandWindow']['deactivate'](),this[_0x2dc168(0x291)][_0x2dc168(0x2ac)](),this['_actorCommandWindow'][_0x2dc168(0x171)](),this['_actorCommandWindow'][_0x2dc168(0x2ac)](),BattleManager[_0x2dc168(0x129)]=null,BattleManager[_0x2dc168(0x2f3)]=![];},Scene_Battle[_0x29f489(0x26d)][_0x29f489(0x13c)]=function(){const _0x2beef8=_0x29f489;if(BattleManager['isTpb']())return;if(!SceneManager[_0x2beef8(0x221)](Scene_Party))return;Imported[_0x2beef8(0x26f)]&&BattleManager[_0x2beef8(0xe4)]()&&BattleManager[_0x2beef8(0x2b7)](),Imported[_0x2beef8(0x2a3)]&&BattleManager[_0x2beef8(0x181)]()&&(BattleManager[_0x2beef8(0x2b7)](),BattleManager['_currentActor']=$gameParty[_0x2beef8(0x214)](),BattleManager['_subject']=BattleManager[_0x2beef8(0x1a3)](),BattleManager['_inputting']=!![],this['_actorCommandWindow'][_0x2beef8(0x19d)](BattleManager[_0x2beef8(0x1a3)]()),this['_statusWindow']['selectActor'](BattleManager[_0x2beef8(0x1a3)]())),Imported['VisuMZ_2_BattleSystemETB']&&BattleManager['isETB']()&&(BattleManager['makeActionOrders'](),BattleManager['_currentActor']=$gameParty[_0x2beef8(0x214)](),BattleManager[_0x2beef8(0x286)]=BattleManager[_0x2beef8(0x1a3)](),BattleManager['_inputting']=!![],this[_0x2beef8(0x183)][_0x2beef8(0x19d)](BattleManager[_0x2beef8(0x1a3)]()),this['_statusWindow'][_0x2beef8(0x1bb)](BattleManager['actor']())),Imported[_0x2beef8(0x164)]&&BattleManager[_0x2beef8(0x2e5)]()&&(BattleManager[_0x2beef8(0x2b7)](),BattleManager[_0x2beef8(0x129)]=$gameParty[_0x2beef8(0x214)](),BattleManager[_0x2beef8(0x286)]=BattleManager['actor'](),BattleManager[_0x2beef8(0x2f3)]=!![],this[_0x2beef8(0x183)]['setup'](BattleManager['actor']()),this['_statusWindow'][_0x2beef8(0x1bb)](BattleManager[_0x2beef8(0x1a3)]()));},Game_Party[_0x29f489(0x26d)][_0x29f489(0x214)]=function(){const _0x1f3d71=_0x29f489;let _0x1c8964=this[_0x1f3d71(0x177)]();return _0x1c8964[0x0];},Sprite_Actor['_partySwitchDuration']=0xc,Sprite_Actor[_0x29f489(0x26d)][_0x29f489(0x143)]=function(_0x4397f4){const _0x243fd2=_0x29f489;this[_0x243fd2(0x139)]=_0x4397f4;const _0x24cf68=Sprite_Actor['_partySwitchDuration'];this[_0x243fd2(0x12a)](0x12c,0x0,_0x24cf68),this[_0x243fd2(0x2a7)](0x0,_0x24cf68),this[_0x243fd2(0x151)]=_0x24cf68;},Sprite_Actor[_0x29f489(0x26d)][_0x29f489(0x113)]=function(_0x2f870e){const _0x21f21a=_0x29f489;if(SceneManager['isSceneBattle']()){SceneManager['_scene']['processPartySwitchMember'](_0x2f870e);const _0x42197a=Sprite_Actor[_0x21f21a(0x151)];this['stepForward'](),this['startOpacity'](0xff,_0x42197a);}this[_0x21f21a(0x139)]=null;},VisuMZ['PartySystem'][_0x29f489(0x2d7)]=Sprite_Actor[_0x29f489(0x26d)]['update'],Sprite_Actor[_0x29f489(0x26d)][_0x29f489(0x1a9)]=function(){const _0x171bd3=_0x29f489;VisuMZ[_0x171bd3(0xff)][_0x171bd3(0x2d7)]['call'](this);if(this['_partySwitchDuration'])this['updatePartySwitch']();},Sprite_Actor[_0x29f489(0x26d)][_0x29f489(0x29f)]=function(){const _0x14dbe5=_0x29f489;this[_0x14dbe5(0x151)]=this['_partySwitchDuration']||0x0,this[_0x14dbe5(0x151)]--,this[_0x14dbe5(0x151)]<=0x0&&this[_0x14dbe5(0x113)](this['_partySwitchTargetActor']);},Window_PartyCommand[_0x29f489(0x26d)][_0x29f489(0x1b6)]=function(){const _0xfbcd3f=_0x29f489;this[_0xfbcd3f(0x15b)]();},Window_PartyCommand[_0x29f489(0x26d)][_0x29f489(0x15b)]=function(){const _0x58b334=_0x29f489;if(!this[_0x58b334(0x1ef)]())return;if(this[_0x58b334(0x244)]()){$gameTemp[_0x58b334(0x283)]()&&!BattleManager[_0x58b334(0x300)]&&(console['log'](_0x58b334(0x163)),BattleManager[_0x58b334(0x300)]=!![]);return;}const _0x2fe4e3=this[_0x58b334(0x28e)](),_0x4dc00b=ImageManager['battlePartyChangeIcon'],_0x6b411f=_0x2fe4e3==='text'?TextManager[_0x58b334(0x1d1)]:_0x58b334(0x11e)['format'](_0x4dc00b,TextManager[_0x58b334(0x1d1)]),_0x457baf=this[_0x58b334(0x212)]();this[_0x58b334(0x269)](_0x6b411f,_0x58b334(0x2bc),_0x457baf);},Window_PartyCommand[_0x29f489(0x26d)][_0x29f489(0x1ef)]=function(){const _0x444ceb=_0x29f489;if(Imported[_0x444ceb(0x29a)]&&BattleManager[_0x444ceb(0xfd)]())return![];if(Imported[_0x444ceb(0x2ee)]&&BattleManager[_0x444ceb(0x28a)]())return![];if(Imported[_0x444ceb(0x275)]&&BattleManager[_0x444ceb(0x19a)]())return![];return VisuMZ[_0x444ceb(0xff)][_0x444ceb(0x233)]['General']['PartyCmdWinAddParty'];},Window_PartyCommand[_0x29f489(0x26d)][_0x29f489(0x244)]=function(){return![];},Window_PartyCommand['prototype'][_0x29f489(0x212)]=function(){const _0x368398=_0x29f489;if($gameParty[_0x368398(0x175)]()[_0x368398(0x255)]<=0x1)return![];if(!$gameParty['canSwitchPartyInBattle']())return![];return $gameSystem[_0x368398(0x1d8)]();},VisuMZ[_0x29f489(0xff)][_0x29f489(0x233)][_0x29f489(0x16a)]=Window_PartyCommand[_0x29f489(0x26d)][_0x29f489(0x1fb)],Window_PartyCommand[_0x29f489(0x26d)][_0x29f489(0x1fb)]=function(){const _0x5d6d7a=_0x29f489,_0x17fb3d=this[_0x5d6d7a(0x15f)]();switch(_0x17fb3d){case'formation':this[_0x5d6d7a(0x237)]['setText'](TextManager['battlePartyChangeCmdHelp']);break;default:VisuMZ[_0x5d6d7a(0xff)][_0x5d6d7a(0x233)][_0x5d6d7a(0x16a)][_0x5d6d7a(0x26a)](this);break;}},Window_ActorCommand[_0x29f489(0x26d)][_0x29f489(0x26e)]=function(){const _0x144798=_0x29f489;if(!this[_0x144798(0x10c)]())return;this[_0x144798(0x263)](_0x144798(0x2bc))>=0x0&&this[_0x144798(0x149)]();const _0x5f15ae=this[_0x144798(0x28e)](),_0x1111b1=ImageManager[_0x144798(0x150)],_0x2d9a65=_0x5f15ae===_0x144798(0x102)?TextManager[_0x144798(0xe2)]:_0x144798(0x11e)[_0x144798(0x2ba)](_0x1111b1,TextManager[_0x144798(0x1d1)]),_0x214159=this[_0x144798(0x235)]();this[_0x144798(0x269)](_0x2d9a65,_0x144798(0x2bc),_0x214159);},Window_ActorCommand['prototype']['isPartyCommandAdded']=function(){const _0x1fdedf=_0x29f489;if(!this[_0x1fdedf(0x29e)])return![];return VisuMZ['PartySystem'][_0x1fdedf(0x233)][_0x1fdedf(0x1e4)][_0x1fdedf(0x219)];},Window_ActorCommand[_0x29f489(0x26d)][_0x29f489(0x235)]=function(){const _0x4877a9=_0x29f489;if($gameParty[_0x4877a9(0x175)]()[_0x4877a9(0x255)]<=0x1)return![];if(!this['_actor'])return![];if(!this[_0x4877a9(0x29e)][_0x4877a9(0x19e)]())return![];return this[_0x4877a9(0x29e)][_0x4877a9(0x267)]();},VisuMZ[_0x29f489(0xff)]['Settings'][_0x29f489(0x1a5)]=Window_ActorCommand[_0x29f489(0x26d)][_0x29f489(0x1fb)],Window_ActorCommand[_0x29f489(0x26d)][_0x29f489(0x1fb)]=function(){const _0x1da423=_0x29f489,_0x2b962a=this[_0x1da423(0x15f)]();if(!_0x2b962a)return;switch(_0x2b962a[_0x1da423(0x16f)]()){case'formation':this[_0x1da423(0x237)]['setText'](TextManager[_0x1da423(0x1c7)]);break;default:VisuMZ['PartySystem']['Settings'][_0x1da423(0x1a5)]['call'](this);break;}},Window_ActorCommand[_0x29f489(0x26d)][_0x29f489(0x149)]=function(){const _0x1a871f=_0x29f489;while(this[_0x1a871f(0x263)](_0x1a871f(0x2bc))>=0x0){const _0x534a80=this[_0x1a871f(0x263)](_0x1a871f(0x2bc));this[_0x1a871f(0x1b9)][_0x1a871f(0x1b7)](_0x534a80,0x1);}});;