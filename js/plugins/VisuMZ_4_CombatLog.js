//=============================================================================
// VisuStella MZ - Combat Log
// VisuMZ_4_CombatLog.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CombatLog = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CombatLog = VisuMZ.CombatLog || {};
VisuMZ.CombatLog.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.14] [CombatLog]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Combat_Log_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes text appears way too fast in the battle system or sometimes
 * players may miss what kind of information was delivered on-screen. For times
 * like that, being able to access the Combat Log would be important. The
 * Combat Log records all of the text that appears in the battle log window at
 * the top. The player can access the Combat Log display any time during action
 * selection phase or by holding down the designated Hot Key. Sometimes,
 * players can even review over the Combat Log to try and figure out any kinds
 * of patterns enemies may even have.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Record the events that happen in battle into an accessible Combat Log for
 *   players to go back and review.
 * * Access the Combat Log in-battle through the Party Command Window, Actor
 *   Command Window, or by holding down the Hot Key.
 * * Icons are added to help players quickly differentiate between different
 *   types of events.
 * * Combat Log can have its numbers color-coded to quickly determine their
 *   effects towards action targets.
 * * Players can review past Combat Logs from an option in the Main Menu.
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
 * The VisuStella MZ Battle Core's <Battle Commands> notetag can now add in
 * "Combat Log" to its list to have the Combat Log shown as an option to the
 * Actor Command Window. Do remember to have this option enabled in the Plugin
 * Parameters as well.
 * 
 * ---
 *
 * VisuMZ_1_MessageCore
 *
 * By having the VisuStella MZ Message Core installed, you can enable the
 * Auto Color functions for the Combat Log. Do remember to have this option
 * enabled in the Plugin Parameters as well.
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
 * === Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Bypass Combat Log>
 *
 * - Used for: State Notetags
 * - Insert this notetag inside a state to make its state messages ignored.
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
 * === Combat Log Plugin Commands ===
 * 
 * ---
 *
 * Combat Log: Add Text
 * - Adds custom text to the current Combat Log.
 *
 *   Text:
 *   - What text would you like to add to the Combat Log?
 *
 *   Icon:
 *   - What icon would you like to bind to this entry?
 *
 * ---
 *
 * Combat Log: Add Horizontal Line
 * - Adds a horizontal line to the current Combat Log.
 *
 * ---
 *
 * Combat Log: Bypass Text?
 * - Temporarily bypass adding any new text to the Combat Log until this
 *   is turned off?
 *
 *   Bypass?:
 *   - Bypass text from being added to the Combat Log temporarily?
 *
 * ---
 *
 * Combat Log: Hot Key Enable?
 * - Enables/disables the Combat Log hot key in battle?
 *
 *   Enable?:
 *   - Enables/disables the Combat Log hot key in battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show in Main Menu?
 * - Shows/hides CombatLog menu inside the Main Menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside the Main Menu.
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * System: Show in Party Command?
 * - Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_PartyCommand.
 *
 * ---
 *
 * System: Show in Actor Command?
 * - Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_ActorCommand.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Combat Log. Determine how the commands appear,
 * the hot key used, and accessibility through the Main Menu, Party Command
 * Window, and Actor Command Window.
 *
 * ---
 *
 * General
 * 
 *   Command Name:
 *   - Name of the 'Combat Log' option in the various menus.
 * 
 *   Icon:
 *   - Icon used for each of the 'Combat Log' options.
 * 
 *   Hot Key:
 *   - This is the key used for quickly opening the Combat Log in battle.
 * 
 *   Stored Logs:
 *   - How many combat logs are stored as a history?
 *   - This affects the Combat Log menu.
 *
 * ---
 *
 * Main Menu
 * 
 *   Show in Main Menu?:
 *   - Add the 'Combat Log' option to the Main Menu by default?
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * Window_PartyCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_PartyCommand by default?
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_ActorCommand by default?
 * 
 *   Help: Combat Log:
 *   - Help text for Combat Log command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Combat Log Settings
 * ============================================================================
 *
 * Settings regarding the Combat Log contents. Disable any unwanted information
 * you want from here to prevent them from being displayed.
 *
 * ---
 *
 * General
 * 
 *   Show Icons?:
 *   - Show icons in the Combat Log?
 * 
 *   Auto Color?:
 *   - Use auto colors for the Combat Log?
 *   - Requires VisuMZ_1_MessageCore
 * 
 *   Color Numbers?:
 *   - Color numbers for damage differences?
 *
 * ---
 *
 * Battle Start
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Enemy Emerge
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Advantages
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Preemptive Icon:
 *   Surprised Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * End Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * Battle Victory
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Escape
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Defeat
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Action Text
 * 
 *   Show Skill Message 1?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Skill Message 2?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Item Message?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings > HP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > No HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * MP Settings > MP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > No MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * TP Settings > TP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > No TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * State Settings
 * 
 *   Show State Add?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Remove?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Current?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Buff & Debuff Settings
 * 
 *   Show Add Buff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Add Debuff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Erase Buff?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Counterattack
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Reflection
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Substitute
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Effect Failure
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Critical Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Missed Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Evaded Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CombatLog. Pretty up the scene to fit the rest
 * of your game with these settings!
 *
 * ---
 *
 * Settings
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
 * Settings regarding this plugin's windows. These alter how the windows appear
 * in the battle and menu scenes.
 *
 * ---
 *
 * Combat Log (Battle)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat Log (Menu)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat History (Menu)
 * 
 *   Latest Command:
 *   - Text displayed for latest battle.
 *   - %1 - Battle Count
 * 
 *   Past Command:
 *   - Text displayed for past battles.
 *   - %1 - Battle Count
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * These settings are for creating compatibility with the other VisuStella MZ
 * plugins that can benefit from having their effects recorded inside of the
 * Combat Log.
 *
 * ---
 *
 * Battle System - ATB > Interrupt
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - CTB > Order Change
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - STB > Instant
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Anti-Damage Barriers > Cancel Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Nullify Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Reduction Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Absorption Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - Damage
 *
 * ---
 *
 * Anti-Damage Barriers > MP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - MP
 *
 * ---
 *
 * Anti-Damage Barriers > TP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - TP
 *
 * ---
 *
 * Life State Effects > Auto Life
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Curse
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Doom
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Fragile
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Guts
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Undead
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Steal Items > Steal Text
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
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
 * * Trihan
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.14: October 17, 2024 
 * * Compatibility Update!
 * ** Plugin should be more compatible with Battle System - OTB.
 * 
 * Version 1.13: November 17, 2022
 * * Documentation Update!
 * ** Added extra clarity for Plugin Parameter "Background Settings".
 * *** This does NOT apply to the battle Combat Log.
 * * Bug Fixes!
 * ** Access to Scene_CombatLog should now be possible without Main Menu Core.
 *    Fix made by Olivia.
 * 
 * Version 1.12: June 23, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.11: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 6, 2022
 * * Bug Fixes!
 * ** Incorrect text usage for enemy recovery is now fixed. Fix made by Arisu.
 * 
 * Version 1.09: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: April 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General Settings > Help: Combat Log
 * **** Help text for Combat Log command.
 * 
 * Version 1.07: March 19, 2021
 * * Bug Fixes!
 * ** Combat log should no longer mask some windows from appearing and is now
 *    instead placed as a non-window object. Fix made by Arisu.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Icons for counters, reflections, and substitutes should now display
 *    properly in the combat log. Fix made by Arisu.
 * ** Turn data should now display properly in TPB-base battle systems.
 *    Fix made by Arisu.
 * ** Switching out to the Options Scene or Party Scene should no longer clear
 *    the Combat Log in-battle. Fix made by Arisu.
 * 
 * Version 1.05: January 22, 2021
 * * Feature Update!
 * ** Dimmed background sprite now expands through the width of the screen
 *    while in battle to no longer display the jagged edges. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Feature Update!
 * ** Any entries added to the Combat Log with \V[x] will now have their exact
 *    variable data stored at the time instead of displaying their current
 *    variable value. Update made by Irina.
 * 
 * Version 1.03: January 8, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Irina.
 * *** Plugin Parameters > General Settings > Stored Logs
 * **** How many combat logs are stored as a history?
 * 
 * Version 1.02: January 1, 2021
 * * Bug Fixes!
 * ** Compatibility with the Absorption Barrier should be fixed. Fix made by
 *    Yanfly.
 * 
 * Version 1.01: December 25, 2020
 * * Feature Update!
 * ** Combat Log when opened with the hot key will automatically close itself
 *    if the Message Window is open. Update made by Yanfly.
 *
 * Version 1.00: January 15, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddText
 * @text Combat Log: Add Text
 * @desc Adds custom text to the current Combat Log.
 *
 * @arg Text:str
 * @text Text
 * @desc What text would you like to add to the Combat Log?
 * @default Custom
 *
 * @arg Icon:num
 * @text Icon
 * @desc What icon would you like to bind to this entry?
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddHorzLine
 * @text Combat Log: Add Horizontal Line
 * @desc Adds a horizontal line to the current Combat Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogBypass
 * @text Combat Log: Bypass Text?
 * @desc Temporarily bypass adding any new text to the Combat Log until this is turned off?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass Text
 * @off Add Normally
 * @desc Bypass text from being added to the Combat Log temporarily?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogEnableHotKey
 * @text Combat Log: Hot Key Enable?
 * @desc Enables/disables the Combat Log hot key in battle?
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Combat Log hot key in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogMenu
 * @text System: Show in Main Menu?
 * @desc Shows/hides CombatLog menu inside the Main Menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside the Main Menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogParty
 * @text System: Show in Party Command?
 * @desc Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_PartyCommand.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogActor
 * @text System: Show in Actor Command?
 * @desc Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_ActorCommand.
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
 * @param CombatLog
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
 * @desc General settings for the Combat Log.
 * @default {"General":"","Name:str":"Combat Log","Icon:num":"189","HotKey:str":"shift","MainMenu":"","ShowMainMenu:eval":"true","PartyCommand":"","ShowPartyCommand:eval":"true","ActorCommand":"","ShowActorCommand:eval":"true"}
 *
 * @param CombatLog:struct
 * @text Combat Log Settings
 * @type struct<CombatLog>
 * @desc Settings regarding the Combat Log contents.
 * @default {"General":"","ShowIcons:eval":"true","AutoColor:eval":"true","ColorNumbers:eval":"true","BattleStart":"","ShowBattleStart:eval":"true","IconBattleStart:num":"97","TextBattleStart:str":"\\C[4]Battle Start!\\C[0]","EnemyEmerge":"","ShowEnemyEmerge:eval":"true","IconEnemyEmerge:num":"5","Advantages":"","ShowAdvantages:eval":"true","IconPreemptive:num":"77","IconSurprise:num":"78","StartTurn":"","ShowStartTurn:eval":"true","IconStartTurn:num":"97","TextStartTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]Start!","EndTurn":"","ShowEndTurn:eval":"true","IconEndTurn:num":"97","TextEndTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]End!","Victory":"","ShowVictory:eval":"true","IconVictory:num":"87","Escape":"","ShowEscape:eval":"true","IconEscape:num":"82","Defeat":"","ShowDefeat:eval":"true","IconDefeat:num":"1","Actions":"","ShowSkillMessage1:eval":"true","ShowSkillMessage2:eval":"true","ShowItemMessage:eval":"true","HP":"","ShowHP:eval":"true","HealHP":"","IconHealHP:num":"72","TextColorHealHP:num":"24","DmgHP":"","IconDmgHP:num":"168","TextColorDmgHP:num":"2","NoDmgHP":"","IconNoDmgHP:num":"81","TextColorNoDmgHP:num":"6","MP":"","ShowMP:eval":"true","HealMP":"","IconHealMP:num":"72","TextColorHealMP:num":"4","DmgMP":"","IconDmgMP:num":"171","TextColorDmgMP:num":"5","NoDmgMP":"","IconNoDmgMP:num":"81","TextColorNoDmgMP:num":"6","TP":"","ShowTP:eval":"true","HealTP":"","IconHealTP:num":"164","TextColorHealTP:num":"24","DmgTP":"","IconDmgTP:num":"170","TextColorDmgTP:num":"28","NoDmgTP":"","IconNoDmgTP:num":"81","TextColorNoDmgTP:num":"6","States":"","ShowStateAdd:eval":"true","ShowStateRemove:eval":"true","ShowStateCurrent:eval":"true","Buffs":"","ShowAddBuff:eval":"true","ShowAddDebuff:eval":"true","ShowEraseBuff:eval":"true","Counter":"","ShowCounter:eval":"true","IconCounter:num":"77","Reflect":"","ShowReflect:eval":"true","IconReflect:num":"81","Subst":"","ShowSubst:eval":"true","IconSubst:num":"81","Fail":"","ShowFail:eval":"true","IconFail:num":"166","Critical":"","ShowCritical:eval":"true","IconCritical:num":"87","Miss":"","ShowMiss:eval":"true","IconMiss:num":"82","Evade":"","ShowEvade:eval":"true","IconEvade:num":"82"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for ONLY Scene_CombatLog.
 * This does NOT apply to the battle Combat Log.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding this plugin's windows.
 * @default {"CombatLogBattle":"","CombatLogBattle_BgType:num":"1","CombatLogBattle_RectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = Graphics.boxHeight;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatLogMenu":"","CombatLogMenu_BgType:num":"0","CombatLogMenu_RectJS:func":"\"const wx = 0;\\nconst wy = this._historyWindow.y + this._historyWindow.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatHistory":"","CombatHistoryLatest:str":"Latest","CombatHistoryPrevious:str":"Battle #%1","CombatHistory_BgType:num":"0","CombatHistory_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param -
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Compatibility settings with other VisuStella MZ plugins.
 * @default {"VisuMZ_2_BattleSystemATB":"","VisuMZ_2_BattleSystemATB_Interrupt":"","ShowBattleSysAtbInterrupt:eval":"true","IconBattleSysAtbInterrupt:num":"78","TextBattleSysAtbInterrupt:str":"%1 has been interrupted!","VisuMZ_2_BattleSystemCTB":"","VisuMZ_2_BattleSystemCTB_OrderChange":"","ShowBattleSysCtbOrderChange:eval":"true","IconBattleSysCtbOrderChange:num":"75","TextBattleSysCtbOrderChange:str":"%1's turn order has changed!","VisuMZ_2_BattleSystemSTB":"","VisuMZ_2_BattleSystemSTB_Instant":"","ShowBattleSysStbInstant:eval":"true","IconBattleSysStbInstant:num":"73","TextBattleSysStbInstant:str":"%1's gains an extra action!","VisuMZ_3_AntiDmgBarriers":"","VisuMZ_3_AntiDmgBarriers_Cancel":"","Show_AntiDmgBarrier_Cancel:eval":"true","Text_AntiDmgBarrier_Cancel:str":"%2 cancels damage for %1!","VisuMZ_3_AntiDmgBarriers_Nullify":"","Show_AntiDmgBarrier_Nullify:eval":"true","Text_AntiDmgBarrier_Nullify:str":"%2 nullifies damage for %1!","VisuMZ_3_AntiDmgBarriers_Reduce":"","Show_AntiDmgBarrier_Reduce:eval":"true","Text_AntiDmgBarrier_Reduce:str":"%2 reduces damage for %1!","VisuMZ_3_AntiDmgBarriers_Absorb":"","Show_AntiDmgBarrier_Absorb:eval":"true","Text_AntiDmgBarrier_Absorb:str":"%2 absorbs \\C[5]%2\\C[0] damage for %1!","VisuMZ_3_AntiDmgBarriers_MpDisperse":"","Show_AntiDmgBarrier_MpDisperse:eval":"true","Text_AntiDmgBarrier_MpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_AntiDmgBarriers_TpDisperse":"","Show_AntiDmgBarrier_TpDisperse:eval":"true","Text_AntiDmgBarrier_TpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_LifeStateEffects":"","VisuMZ_3_LifeStateEffects_AutoLife":"","Show_LifeStateEffects_AutoLife:eval":"true","Icon_LifeStateEffects_AutoLife:num":"70","Text_LifeStateEffects_AutoLife:str":"%1 is automatically revived!","VisuMZ_3_LifeStateEffects_Curse":"","Show_LifeStateEffects_Curse:eval":"true","Icon_LifeStateEffects_Curse:num":"71","Text_LifeStateEffects_Curse:str":"%1's curse takes hold...","VisuMZ_3_LifeStateEffects_Doom":"","Show_LifeStateEffects_Doom:eval":"true","Icon_LifeStateEffects_Doom:num":"1","Text_LifeStateEffects_Doom:str":"%1 has fallen to doom.","VisuMZ_3_LifeStateEffects_Fragile":"","Show_LifeStateEffects_Fragile:eval":"true","Icon_LifeStateEffects_Fragile:num":"166","Text_LifeStateEffects_Fragile:str":"%1 was too fragile!","VisuMZ_3_LifeStateEffects_Guts":"","Show_LifeStateEffects_Guts:eval":"true","Icon_LifeStateEffects_Guts:num":"77","Text_LifeStateEffects_Guts:str":"%1 powers through a fatal blow!","VisuMZ_3_LifeStateEffects_Undead":"","Show_LifeStateEffects_Undead:eval":"true","Icon_LifeStateEffects_Undead:num":"10","Text_LifeStateEffects_Undead:str":"%1 suffers from being undead!","VisuMZ_3_StealItems":"","VisuMZ_3_StealItems_Steal":"","Show_StealItems_Steal:eval":"true","Icon_StealItems_Steal:num":"142"}
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
 * @param Name:str
 * @text Command Name
 * @parent General
 * @desc Name of the 'Combat Log' option in the various menus.
 * @default Combat Log
 *
 * @param Icon:num
 * @text Icon
 * @parent General
 * @desc Icon used for each of the 'Combat Log' options.
 * @default 189
 *
 * @param HotKey:str
 * @text Hot Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quickly opening the Combat Log in battle.
 * @default shift
 *
 * @param StoredLogs:num
 * @text Stored Logs
 * @parent General
 * @desc How many combat logs are stored as a history?
 * This affects the Combat Log menu.
 * @default 5
 *
 * @param MainMenu
 * @text Main Menu
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @parent MainMenu
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to the Main Menu by default?
 * @default true
 *
 * @param PartyCommand
 * @text Window_PartyCommand
 *
 * @param ShowPartyCommand:eval
 * @text Show in Window?
 * @parent PartyCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_PartyCommand by default?
 * @default true
 *
 * @param ActorCommand
 * @text Window_ActorCommand
 *
 * @param ShowActorCommand:eval
 * @text Show in Window?
 * @parent ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_ActorCommand by default?
 * @default true
 *
 * @param BattleHelpCombatLog:json
 * @text Help: Combat Log
 * @parent ActorCommand
 * @type note
 * @desc Help text for Combat Log command.
 * Requires VisuMZ_1_BattleCore!
 * @default "View the combat log."
 *
 */
/* ----------------------------------------------------------------------------
 * Combat Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CombatLog:
 *
 * @param General
 *
 * @param ShowIcons:eval
 * @text Show Icons?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show icons in the Combat Log?
 * @default true
 *
 * @param AutoColor:eval
 * @text Auto Color?
 * @parent General
 * @type boolean
 * @on Use Auto Color
 * @off Don't Use
 * @desc Use auto colors for the Combat Log?
 * Requires VisuMZ_1_MessageCore
 * @default true
 *
 * @param ColorNumbers:eval
 * @text Color Numbers?
 * @parent General
 * @type boolean
 * @on Color Numbers
 * @off Don't Color
 * @desc Color numbers for damage differences?
 * @default true
 * 
 * @param BattleStart
 * @text Battle Start
 *
 * @param ShowBattleStart:eval
 * @text Show?
 * @parent BattleStart
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleStart:num
 * @text Icon
 * @parent BattleStart
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextBattleStart:str
 * @text Text
 * @parent BattleStart
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes.
 * @default \C[4]Battle Start!\C[0]
 * 
 * @param EnemyEmerge
 * @text Enemy Emerge
 *
 * @param ShowEnemyEmerge:eval
 * @text Show?
 * @parent EnemyEmerge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEnemyEmerge:num
 * @text Icon
 * @parent EnemyEmerge
 * @desc Icon used for this event in the Combat Log.
 * @default 5
 * 
 * @param Advantages
 * @text Battle Advantages
 *
 * @param ShowAdvantages:eval
 * @text Show?
 * @parent Advantages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconPreemptive:num
 * @text Preemptive Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param IconSurprise:num
 * @text Surprised Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 * 
 * @param StartTurn
 * @text Start Turn
 *
 * @param ShowStartTurn:eval
 * @text Show?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconStartTurn:num
 * @text Icon
 * @parent StartTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextStartTurn:str
 * @text Text
 * @parent StartTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]Start!
 * 
 * @param EndTurn
 * @text End Turn
 *
 * @param ShowEndTurn:eval
 * @text Show?
 * @parent EndTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEndTurn:num
 * @text Icon
 * @parent EndTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextEndTurn:str
 * @text Text
 * @parent EndTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]End!
 * 
 * @param Victory
 * @text Battle Victory
 *
 * @param ShowVictory:eval
 * @text Show?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconVictory:num
 * @text Icon
 * @parent Victory
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Escape
 * @text Battle Escape
 *
 * @param ShowEscape:eval
 * @text Show?
 * @parent Escape
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEscape:num
 * @text Icon
 * @parent Escape
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Defeat
 * @text Battle Defeat
 *
 * @param ShowDefeat:eval
 * @text Show?
 * @parent Defeat
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconDefeat:num
 * @text Icon
 * @parent Defeat
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 * 
 * @param Actions
 * @text Action Text
 *
 * @param ShowSkillMessage1:eval
 * @text Show Skill Message 1?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowSkillMessage2:eval
 * @text Show Skill Message 2?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowItemMessage:eval
 * @text Show Item Message?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HP
 * @text HP Settings
 *
 * @param ShowHP:eval
 * @text Show?
 * @parent HP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealHP
 * @text HP Heal
 * @parent HP
 *
 * @param IconHealHP:num
 * @text Icon
 * @parent HealHP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealHP:num
 * @text Text Color
 * @parent HealHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgHP
 * @text HP Damage
 * @parent HP
 *
 * @param IconDmgHP:num
 * @text Icon
 * @parent DmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 168
 *
 * @param TextColorDmgHP:num
 * @text Text Color
 * @parent DmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 2
 * 
 * @param NoDmgHP
 * @text No HP Damage
 * @parent HP
 *
 * @param IconNoDmgHP:num
 * @text Icon
 * @parent NoDmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgHP:num
 * @text Text Color
 * @parent NoDmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param MP
 * @text MP Settings
 *
 * @param ShowMP:eval
 * @text Show?
 * @parent MP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealMP
 * @text MP Heal
 * @parent MP
 *
 * @param IconHealMP:num
 * @text Icon
 * @parent HealMP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealMP:num
 * @text Text Color
 * @parent HealMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 4
 * 
 * @param DmgMP
 * @text MP Damage
 * @parent MP
 *
 * @param IconDmgMP:num
 * @text Icon
 * @parent DmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 171
 *
 * @param TextColorDmgMP:num
 * @text Text Color
 * @parent DmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 5
 * 
 * @param NoDmgMP
 * @text No MP Damage
 * @parent MP
 *
 * @param IconNoDmgMP:num
 * @text Icon
 * @parent NoDmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgMP:num
 * @text Text Color
 * @parent NoDmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param TP
 * @text TP Settings
 *
 * @param ShowTP:eval
 * @text Show?
 * @parent TP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealTP
 * @text TP Heal
 * @parent TP
 *
 * @param IconHealTP:num
 * @text Icon
 * @parent HealTP
 * @desc Icon used for this event in the Combat Log.
 * @default 164
 *
 * @param TextColorHealTP:num
 * @text Text Color
 * @parent HealTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgTP
 * @text TP Damage
 * @parent TP
 *
 * @param IconDmgTP:num
 * @text Icon
 * @parent DmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 170
 *
 * @param TextColorDmgTP:num
 * @text Text Color
 * @parent DmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 28
 * 
 * @param NoDmgTP
 * @text No TP Damage
 * @parent TP
 *
 * @param IconNoDmgTP:num
 * @text Icon
 * @parent NoDmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgTP:num
 * @text Text Color
 * @parent NoDmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param States
 * @text State Settings
 *
 * @param ShowStateAdd:eval
 * @text Show State Add?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateRemove:eval
 * @text Show State Remove?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateCurrent:eval
 * @text Show State Current?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Buffs
 * @text Buff & Debuff Settings
 *
 * @param ShowAddBuff:eval
 * @text Show Add Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowAddDebuff:eval
 * @text Show Add Debuff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowEraseBuff:eval
 * @text Show Erase Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Counter
 * @text Counterattack
 *
 * @param ShowCounter:eval
 * @text Show?
 * @parent Counter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCounter:num
 * @text Icon
 * @parent Counter
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 * 
 * @param Reflect
 * @text Reflection
 *
 * @param ShowReflect:eval
 * @text Show?
 * @parent Reflect
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconReflect:num
 * @text Icon
 * @parent Reflect
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Subst
 * @text Substitute
 *
 * @param ShowSubst:eval
 * @text Show?
 * @parent Subst
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconSubst:num
 * @text Icon
 * @parent Subst
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Fail
 * @text Effect Failure
 *
 * @param ShowFail:eval
 * @text Show?
 * @parent Fail
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconFail:num
 * @text Icon
 * @parent Fail
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 * 
 * @param Critical
 * @text Critical Hit
 *
 * @param ShowCritical:eval
 * @text Show?
 * @parent Critical
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCritical:num
 * @text Icon
 * @parent Critical
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Miss
 * @text Missed Hit
 *
 * @param ShowMiss:eval
 * @text Show?
 * @parent Miss
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconMiss:num
 * @text Icon
 * @parent Miss
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Evade
 * @text Evaded Hit
 *
 * @param ShowEvade:eval
 * @text Show?
 * @parent Evade
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEvade:num
 * @text Icon
 * @parent Evade
 * @desc Icon used for this event in the Combat Log.
 * @default 82
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
 * @param CombatLogBattle
 * @text Combat Log (Battle)
 *
 * @param CombatLogBattle_BgType:num
 * @text Background Type
 * @parent CombatLogBattle
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 1
 *
 * @param CombatLogBattle_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogBattle
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = Graphics.boxHeight;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatLogMenu
 * @text Combat Log (Menu)
 *
 * @param CombatLogMenu_BgType:num
 * @text Background Type
 * @parent CombatLogMenu
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
 * @param CombatLogMenu_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogMenu
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._historyWindow.y + this._historyWindow.height;\nconst ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatHistory
 * @text Combat History (Menu)
 *
 * @param CombatHistoryLatest:str
 * @text Latest Command
 * @parent CombatHistory
 * @desc Text displayed for latest battle.
 * %1 - Battle Count
 * @default Latest
 *
 * @param CombatHistoryPrevious:str
 * @text Past Command
 * @parent CombatHistory
 * @desc Text displayed for past battles.
 * %1 - Battle Count
 * @default Battle #%1
 *
 * @param CombatHistory_BgType:num
 * @text Background Type
 * @parent CombatHistory
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
 * @param CombatHistory_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatHistory
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param VisuMZ_2_BattleSystemATB
 * @text Battle System - ATB
 * 
 * @param VisuMZ_2_BattleSystemATB_Interrupt
 * @text Interrupt
 * @parent VisuMZ_2_BattleSystemATB
 *
 * @param ShowBattleSysAtbInterrupt:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysAtbInterrupt:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 *
 * @param TextBattleSysAtbInterrupt:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has been interrupted!
 *
 * @param VisuMZ_2_BattleSystemCTB
 * @text Battle System - CTB
 * 
 * @param VisuMZ_2_BattleSystemCTB_OrderChange
 * @text Order Change
 * @parent VisuMZ_2_BattleSystemCTB
 *
 * @param ShowBattleSysCtbOrderChange:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysCtbOrderChange:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Icon used for this event in the Combat Log.
 * @default 75
 *
 * @param TextBattleSysCtbOrderChange:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's turn order has changed!
 *
 * @param VisuMZ_2_BattleSystemSTB
 * @text Battle System - STB
 * 
 * @param VisuMZ_2_BattleSystemSTB_Instant
 * @text Instant
 * @parent VisuMZ_2_BattleSystemSTB
 *
 * @param ShowBattleSysStbInstant:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysStbInstant:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Icon used for this event in the Combat Log.
 * @default 73
 *
 * @param TextBattleSysStbInstant:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's gains an extra action!
 *
 * @param VisuMZ_3_AntiDmgBarriers
 * @text Anti-Damage Barriers
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Cancel
 * @text Cancel Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Cancel:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Cancel:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 cancels damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Nullify
 * @text Nullify Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Nullify:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Nullify:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 nullifies damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Absorb
 * @text Absorption Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Absorb:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Absorb:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - Damage
 * @default %2 absorbs \C[5]%2\C[0] damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @text MP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_MpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_MpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - MP
 * @default %2 dispersed damage to %1's %3!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @text TP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_TpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_TpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - TP
 * @default %2 dispersed damage to %1's %3!
 *
 * @param VisuMZ_3_LifeStateEffects
 * @text Life State Effects
 * 
 * @param VisuMZ_3_LifeStateEffects_AutoLife
 * @text Auto Life
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_AutoLife:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_AutoLife:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Icon used for this event in the Combat Log.
 * @default 70
 *
 * @param Text_LifeStateEffects_AutoLife:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 is automatically revived!
 * 
 * @param VisuMZ_3_LifeStateEffects_Curse
 * @text Curse
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Curse:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Curse:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Icon used for this event in the Combat Log.
 * @default 71
 *
 * @param Text_LifeStateEffects_Curse:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's curse takes hold...
 * 
 * @param VisuMZ_3_LifeStateEffects_Doom
 * @text Doom
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Doom:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Doom:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 *
 * @param Text_LifeStateEffects_Doom:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has fallen to doom.
 * 
 * @param VisuMZ_3_LifeStateEffects_Fragile
 * @text Fragile
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Fragile:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Fragile:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 *
 * @param Text_LifeStateEffects_Fragile:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 was too fragile!
 * 
 * @param VisuMZ_3_LifeStateEffects_Guts
 * @text Guts
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Guts:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Guts:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param Text_LifeStateEffects_Guts:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 powers through a fatal blow!
 * 
 * @param VisuMZ_3_LifeStateEffects_Undead
 * @text Undead
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Undead:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Undead:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Icon used for this event in the Combat Log.
 * @default 10
 *
 * @param Text_LifeStateEffects_Undead:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 suffers from being undead!
 *
 * @param VisuMZ_3_StealItems
 * @text Steal Items
 * 
 * @param VisuMZ_3_StealItems_Steal
 * @text Steal Text
 * @parent VisuMZ_3_StealItems
 *
 * @param Show_StealItems_Steal:eval
 * @text Show?
 * @parent VisuMZ_3_StealItems_Steal
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_StealItems_Steal:num
 * @text Icon
 * @parent VisuMZ_3_StealItems_Steal
 * @desc Icon used for this event in the Combat Log.
 * @default 142
 *
 */
//=============================================================================

const _0x3bec14=_0x133b;(function(_0x51566f,_0x45c70a){const _0x391140=_0x133b,_0x362816=_0x51566f();while(!![]){try{const _0x5fa384=-parseInt(_0x391140(0x205))/0x1*(-parseInt(_0x391140(0x3b7))/0x2)+parseInt(_0x391140(0x207))/0x3*(parseInt(_0x391140(0x322))/0x4)+-parseInt(_0x391140(0x28d))/0x5*(-parseInt(_0x391140(0x3c0))/0x6)+parseInt(_0x391140(0x2c9))/0x7+-parseInt(_0x391140(0x394))/0x8*(-parseInt(_0x391140(0x373))/0x9)+parseInt(_0x391140(0x3bb))/0xa*(-parseInt(_0x391140(0x381))/0xb)+-parseInt(_0x391140(0x1cc))/0xc*(parseInt(_0x391140(0x3b0))/0xd);if(_0x5fa384===_0x45c70a)break;else _0x362816['push'](_0x362816['shift']());}catch(_0xd4be14){_0x362816['push'](_0x362816['shift']());}}}(_0x5c18,0xb4e75));var label='CombatLog',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3bec14(0x2a3)](function(_0x46871d){const _0x4870cd=_0x3bec14;return _0x46871d['status']&&_0x46871d['description'][_0x4870cd(0x2f6)]('['+label+']');})[0x0];VisuMZ[label][_0x3bec14(0x2a8)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x530e23,_0x262a3e){const _0x38d590=_0x3bec14;for(const _0x517394 in _0x262a3e){if(_0x517394[_0x38d590(0x293)](/(.*):(.*)/i)){const _0x316ec4=String(RegExp['$1']),_0x5ddf63=String(RegExp['$2'])[_0x38d590(0x2ab)]()[_0x38d590(0x249)]();let _0x1fab08,_0x24fadc,_0x1611e0;switch(_0x5ddf63){case _0x38d590(0x310):_0x1fab08=_0x262a3e[_0x517394]!==''?Number(_0x262a3e[_0x517394]):0x0;break;case _0x38d590(0x25a):_0x24fadc=_0x262a3e[_0x517394]!==''?JSON['parse'](_0x262a3e[_0x517394]):[],_0x1fab08=_0x24fadc[_0x38d590(0x2f7)](_0xbdcb89=>Number(_0xbdcb89));break;case _0x38d590(0x2ba):_0x1fab08=_0x262a3e[_0x517394]!==''?eval(_0x262a3e[_0x517394]):null;break;case _0x38d590(0x32e):_0x24fadc=_0x262a3e[_0x517394]!==''?JSON[_0x38d590(0x1d5)](_0x262a3e[_0x517394]):[],_0x1fab08=_0x24fadc[_0x38d590(0x2f7)](_0x10eb21=>eval(_0x10eb21));break;case _0x38d590(0x217):_0x1fab08=_0x262a3e[_0x517394]!==''?JSON[_0x38d590(0x1d5)](_0x262a3e[_0x517394]):'';break;case _0x38d590(0x38a):_0x24fadc=_0x262a3e[_0x517394]!==''?JSON[_0x38d590(0x1d5)](_0x262a3e[_0x517394]):[],_0x1fab08=_0x24fadc['map'](_0x4cb65f=>JSON[_0x38d590(0x1d5)](_0x4cb65f));break;case _0x38d590(0x387):_0x1fab08=_0x262a3e[_0x517394]!==''?new Function(JSON[_0x38d590(0x1d5)](_0x262a3e[_0x517394])):new Function('return\x200');break;case _0x38d590(0x2c5):_0x24fadc=_0x262a3e[_0x517394]!==''?JSON['parse'](_0x262a3e[_0x517394]):[],_0x1fab08=_0x24fadc['map'](_0x210f0e=>new Function(JSON[_0x38d590(0x1d5)](_0x210f0e)));break;case _0x38d590(0x35a):_0x1fab08=_0x262a3e[_0x517394]!==''?String(_0x262a3e[_0x517394]):'';break;case _0x38d590(0x1e1):_0x24fadc=_0x262a3e[_0x517394]!==''?JSON[_0x38d590(0x1d5)](_0x262a3e[_0x517394]):[],_0x1fab08=_0x24fadc[_0x38d590(0x2f7)](_0xf112d5=>String(_0xf112d5));break;case'STRUCT':_0x1611e0=_0x262a3e[_0x517394]!==''?JSON['parse'](_0x262a3e[_0x517394]):{},_0x1fab08=VisuMZ['ConvertParams']({},_0x1611e0);break;case'ARRAYSTRUCT':_0x24fadc=_0x262a3e[_0x517394]!==''?JSON['parse'](_0x262a3e[_0x517394]):[],_0x1fab08=_0x24fadc[_0x38d590(0x2f7)](_0xed274d=>VisuMZ['ConvertParams']({},JSON[_0x38d590(0x1d5)](_0xed274d)));break;default:continue;}_0x530e23[_0x316ec4]=_0x1fab08;}}return _0x530e23;},(_0x1fd008=>{const _0x393353=_0x3bec14,_0x5aad98=_0x1fd008[_0x393353(0x2ce)];for(const _0xab2409 of dependencies){if(!Imported[_0xab2409]){alert(_0x393353(0x34e)[_0x393353(0x2ea)](_0x5aad98,_0xab2409)),SceneManager[_0x393353(0x213)]();break;}}const _0x38f1a5=_0x1fd008['description'];if(_0x38f1a5['match'](/\[Version[ ](.*?)\]/i)){const _0x364904=Number(RegExp['$1']);_0x364904!==VisuMZ[label][_0x393353(0x214)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x393353(0x2ea)](_0x5aad98,_0x364904)),SceneManager[_0x393353(0x213)]());}if(_0x38f1a5[_0x393353(0x293)](/\[Tier[ ](\d+)\]/i)){const _0x4ce63c=Number(RegExp['$1']);_0x4ce63c<tier?(alert(_0x393353(0x1f0)[_0x393353(0x2ea)](_0x5aad98,_0x4ce63c,tier)),SceneManager[_0x393353(0x213)]()):tier=Math['max'](_0x4ce63c,tier);}VisuMZ[_0x393353(0x269)](VisuMZ[label]['Settings'],_0x1fd008[_0x393353(0x2c8)]);})(pluginData),PluginManager[_0x3bec14(0x377)](pluginData[_0x3bec14(0x2ce)],_0x3bec14(0x2a7),_0x411ef1=>{const _0x59f2a4=_0x3bec14;VisuMZ[_0x59f2a4(0x269)](_0x411ef1,_0x411ef1);const _0x2b6e91=_0x411ef1[_0x59f2a4(0x3af)],_0x2a1b63=_0x411ef1[_0x59f2a4(0x259)];$gameSystem[_0x59f2a4(0x38b)](_0x2b6e91,_0x2a1b63);}),PluginManager[_0x3bec14(0x377)](pluginData[_0x3bec14(0x2ce)],'CombatLogAddHorzLine',_0x417e9e=>{const _0x18a68b=_0x3bec14;VisuMZ[_0x18a68b(0x269)](_0x417e9e,_0x417e9e),$gameSystem[_0x18a68b(0x244)]();}),PluginManager[_0x3bec14(0x377)](pluginData[_0x3bec14(0x2ce)],'CombatLogBypass',_0xafd8c8=>{const _0x520480=_0x3bec14;VisuMZ['ConvertParams'](_0xafd8c8,_0xafd8c8);const _0x269b1e=_0xafd8c8[_0x520480(0x343)];$gameSystem[_0x520480(0x2da)](_0x269b1e);}),PluginManager[_0x3bec14(0x377)](pluginData['name'],_0x3bec14(0x229),_0x45e6bb=>{const _0x1e3843=_0x3bec14;VisuMZ[_0x1e3843(0x269)](_0x45e6bb,_0x45e6bb);const _0x45a12c=_0x45e6bb[_0x1e3843(0x2f3)];$gameSystem['setCombatLogHotKeyActive'](_0x45a12c);}),PluginManager['registerCommand'](pluginData[_0x3bec14(0x2ce)],_0x3bec14(0x335),_0x43c041=>{const _0x23d310=_0x3bec14;VisuMZ[_0x23d310(0x269)](_0x43c041,_0x43c041);const _0x3898bc=_0x43c041[_0x23d310(0x369)];$gameSystem['setMainMenuCombatLogVisible'](_0x3898bc);}),PluginManager['registerCommand'](pluginData['name'],_0x3bec14(0x1cf),_0x576e0b=>{const _0x1b2639=_0x3bec14;VisuMZ['ConvertParams'](_0x576e0b,_0x576e0b);const _0x479b8b=_0x576e0b[_0x1b2639(0x369)];$gameSystem[_0x1b2639(0x274)](_0x479b8b);}),PluginManager['registerCommand'](pluginData[_0x3bec14(0x2ce)],_0x3bec14(0x36b),_0x50f3cc=>{const _0x2a9909=_0x3bec14;VisuMZ[_0x2a9909(0x269)](_0x50f3cc,_0x50f3cc);const _0x2334ca=_0x50f3cc[_0x2a9909(0x369)];$gameSystem[_0x2a9909(0x3b9)](_0x2334ca);}),VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x1f2)]={'BypassCombatLog':/<BYPASS COMBAT LOG>/i},ImageManager[_0x3bec14(0x399)]=VisuMZ['CombatLog']['Settings'][_0x3bec14(0x354)]['Icon'],ImageManager[_0x3bec14(0x1fa)]=VisuMZ[_0x3bec14(0x2e3)]['Settings'][_0x3bec14(0x2e3)][_0x3bec14(0x25d)],ImageManager[_0x3bec14(0x2d1)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x371)],ImageManager[_0x3bec14(0x28c)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x2e2)],ImageManager[_0x3bec14(0x1ff)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x1dd)],ImageManager['combatLog_StartTurn_Icon']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x300)],ImageManager[_0x3bec14(0x308)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)]['IconEndTurn'],ImageManager[_0x3bec14(0x1f3)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x32a)],ImageManager['combatLog_Result_Escape']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['CombatLog'][_0x3bec14(0x37f)],ImageManager['combatLog_Result_Defeat']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x2b3)],ImageManager[_0x3bec14(0x230)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)]['IconCounter'],ImageManager[_0x3bec14(0x218)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)]['CombatLog'][_0x3bec14(0x232)],ImageManager[_0x3bec14(0x29b)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x316)],ImageManager[_0x3bec14(0x31d)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x331)],ImageManager[_0x3bec14(0x30b)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x1db)],ImageManager[_0x3bec14(0x264)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)]['IconMiss'],ImageManager[_0x3bec14(0x1f1)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x27b)],ImageManager[_0x3bec14(0x353)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)]['IconHealHP'],ImageManager[_0x3bec14(0x340)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['CombatLog'][_0x3bec14(0x383)],ImageManager['combatLog_HP_NoDmg']=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x2aa)],ImageManager['combatLog_MP_Heal']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x254)],ImageManager[_0x3bec14(0x23f)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)]['IconDmgMP'],ImageManager[_0x3bec14(0x2cb)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['CombatLog']['IconNoDmgMP'],ImageManager[_0x3bec14(0x380)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x281)],ImageManager['combatLog_TP_Dmg']=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x268)],ImageManager[_0x3bec14(0x2a9)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x2e0)],TextManager[_0x3bec14(0x1f7)]=VisuMZ[_0x3bec14(0x2e3)]['Settings']['General']['Name'],TextManager[_0x3bec14(0x22a)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x235)],TextManager[_0x3bec14(0x2c7)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x32c)],TextManager[_0x3bec14(0x313)]=VisuMZ[_0x3bec14(0x2e3)]['Settings'][_0x3bec14(0x2e3)][_0x3bec14(0x1ee)],TextManager[_0x3bec14(0x2a2)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x354)]['BattleHelpCombatLog']??_0x3bec14(0x2f5),TextManager['_combatLog_Latest']=VisuMZ['CombatLog'][_0x3bec14(0x2a8)]['Window']['CombatHistoryLatest'],TextManager[_0x3bec14(0x2e4)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)][_0x3bec14(0x36c)][_0x3bec14(0x365)],ColorManager[_0x3bec14(0x353)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x2ac)],ColorManager['combatLog_HP_Dmg']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x1e5)],ColorManager[_0x3bec14(0x22f)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['CombatLog'][_0x3bec14(0x366)],ColorManager[_0x3bec14(0x288)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x25c)],ColorManager[_0x3bec14(0x23f)]=VisuMZ[_0x3bec14(0x2e3)]['Settings'][_0x3bec14(0x2e3)][_0x3bec14(0x35c)],ColorManager[_0x3bec14(0x2cb)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)][_0x3bec14(0x2e3)][_0x3bec14(0x2e8)],ColorManager['combatLog_TP_Heal']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['CombatLog'][_0x3bec14(0x28b)],ColorManager[_0x3bec14(0x392)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['CombatLog']['TextColorDmgTP'],ColorManager[_0x3bec14(0x2a9)]=VisuMZ['CombatLog'][_0x3bec14(0x2a8)]['CombatLog'][_0x3bec14(0x23e)],ColorManager[_0x3bec14(0x2a5)]=function(_0x4c21f4,_0x2aee5b){const _0x4e3f0a=_0x3bec14;if(!VisuMZ['CombatLog'][_0x4e3f0a(0x2a8)][_0x4e3f0a(0x2e3)]['ColorNumbers'])return Math[_0x4e3f0a(0x200)](_0x2aee5b);const _0x5fbd04=_0x4e3f0a(0x2fb);let _0x478a70;if(_0x2aee5b>0x0)_0x478a70=_0x5fbd04['format'](_0x4c21f4,_0x4e3f0a(0x2d2));else _0x2aee5b===0x0?_0x478a70=_0x5fbd04[_0x4e3f0a(0x2ea)](_0x4c21f4,_0x4e3f0a(0x2be)):_0x478a70=_0x5fbd04[_0x4e3f0a(0x2ea)](_0x4c21f4,'Dmg');return _0x2aee5b=Math[_0x4e3f0a(0x200)](_0x2aee5b),ColorManager[_0x478a70]?_0x4e3f0a(0x23c)[_0x4e3f0a(0x2ea)](ColorManager[_0x478a70],_0x2aee5b):_0x2aee5b;},SceneManager[_0x3bec14(0x24e)]=function(){const _0x91279=_0x3bec14;return this['_scene']&&this[_0x91279(0x2a4)][_0x91279(0x37a)]===Scene_Battle;},VisuMZ[_0x3bec14(0x2e3)]['BattleManager_startBattle']=BattleManager[_0x3bec14(0x3ad)],BattleManager[_0x3bec14(0x3ad)]=function(){const _0x5e201d=_0x3bec14;VisuMZ[_0x5e201d(0x2e3)][_0x5e201d(0x3a2)]['call'](this),this['startBattleCombatLog']();},BattleManager[_0x3bec14(0x372)]=function(){const _0x1700a3=_0x3bec14,_0x302392=VisuMZ[_0x1700a3(0x2e3)][_0x1700a3(0x2a8)][_0x1700a3(0x2e3)];if(_0x302392[_0x1700a3(0x311)]){$gameSystem[_0x1700a3(0x2dc)](),$gameSystem[_0x1700a3(0x2da)](![]),$gameSystem[_0x1700a3(0x244)]();let _0x5e7c8a=TextManager[_0x1700a3(0x22a)],_0xcfde0d=ImageManager[_0x1700a3(0x1fa)];$gameSystem['addTextToCombatLog'](_0x5e7c8a,_0xcfde0d),$gameSystem[_0x1700a3(0x244)]();}if(_0x302392[_0x1700a3(0x3ab)])for(const _0x5c5f4c of $gameTroop[_0x1700a3(0x221)]()){let _0x29a0c3=TextManager[_0x1700a3(0x2e1)]['format'](_0x5c5f4c['combatLogName']()),_0x56edf9=ImageManager[_0x1700a3(0x2d1)];$gameSystem[_0x1700a3(0x38b)](_0x29a0c3,_0x56edf9);}if(_0x302392[_0x1700a3(0x285)]){if(this['_preemptive']){let _0x4c98f0=TextManager[_0x1700a3(0x393)][_0x1700a3(0x2ea)]($gameParty[_0x1700a3(0x355)]()),_0x4daea3=ImageManager[_0x1700a3(0x28c)];$gameSystem[_0x1700a3(0x38b)](_0x4c98f0,_0x4daea3);}else{if(this[_0x1700a3(0x345)]){let _0x1496da=TextManager[_0x1700a3(0x2f4)][_0x1700a3(0x2ea)]($gameParty[_0x1700a3(0x355)]()),_0x56c188=ImageManager[_0x1700a3(0x1ff)];$gameSystem[_0x1700a3(0x38b)](_0x1496da,_0x56c188);}}}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x36e)]=BattleManager[_0x3bec14(0x1eb)],BattleManager[_0x3bec14(0x1eb)]=function(){const _0x3c5967=_0x3bec14;if($gameTroop['turnCount']()>0x0&&VisuMZ[_0x3c5967(0x2e3)]['Settings']['CombatLog']['ShowEndTurn']){$gameSystem[_0x3c5967(0x244)]();let _0x4157af=TextManager['combatLog_EndTurn']['format']($gameTroop['turnCount']()),_0x506bfe=ImageManager[_0x3c5967(0x308)];$gameSystem[_0x3c5967(0x38b)](_0x4157af,_0x506bfe),$gameSystem[_0x3c5967(0x244)]();}VisuMZ['CombatLog'][_0x3c5967(0x36e)][_0x3c5967(0x270)](this);},VisuMZ[_0x3bec14(0x2e3)]['BattleManager_updateTurnEnd']=BattleManager[_0x3bec14(0x1e6)],BattleManager[_0x3bec14(0x1e6)]=function(){const _0x195dbb=_0x3bec14;VisuMZ['CombatLog'][_0x195dbb(0x3a9)]['call'](this);if(this[_0x195dbb(0x2c6)]()&&VisuMZ['CombatLog']['Settings']['CombatLog'][_0x195dbb(0x2f9)]&&$gameTroop[_0x195dbb(0x2e5)]()>0x0){$gameSystem[_0x195dbb(0x244)]();let _0x446fc4=TextManager['combatLog_StartTurn'][_0x195dbb(0x2ea)]($gameTroop[_0x195dbb(0x2e5)]()),_0x196feb=ImageManager[_0x195dbb(0x32f)];$gameSystem['addTextToCombatLog'](_0x446fc4,_0x196feb);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x287)]=BattleManager[_0x3bec14(0x2bc)],BattleManager[_0x3bec14(0x2bc)]=function(){const _0x2d24b7=_0x3bec14;$gameSystem[_0x2d24b7(0x2da)](!![]),VisuMZ[_0x2d24b7(0x2e3)][_0x2d24b7(0x287)][_0x2d24b7(0x270)](this),$gameSystem[_0x2d24b7(0x2da)](![]);if(VisuMZ[_0x2d24b7(0x2e3)][_0x2d24b7(0x2a8)][_0x2d24b7(0x2e3)][_0x2d24b7(0x3c2)]){$gameSystem[_0x2d24b7(0x244)]();let _0x30c968=TextManager['victory'][_0x2d24b7(0x2ea)]($gameParty[_0x2d24b7(0x355)]()),_0x1bfbd7=ImageManager[_0x2d24b7(0x1f3)];$gameSystem[_0x2d24b7(0x38b)](_0x30c968,_0x1bfbd7),$gameSystem[_0x2d24b7(0x244)]();}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x29d)]=BattleManager[_0x3bec14(0x25b)],BattleManager[_0x3bec14(0x25b)]=function(){const _0x5a775f=_0x3bec14;$gameSystem[_0x5a775f(0x2da)](!![]),VisuMZ['CombatLog'][_0x5a775f(0x29d)][_0x5a775f(0x270)](this),$gameSystem[_0x5a775f(0x2da)](![]),$gameSystem[_0x5a775f(0x244)]();},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x27c)]=BattleManager[_0x3bec14(0x2b4)],BattleManager[_0x3bec14(0x2b4)]=function(){const _0x12a77b=_0x3bec14;VisuMZ[_0x12a77b(0x2e3)][_0x12a77b(0x27c)][_0x12a77b(0x270)](this);if(VisuMZ[_0x12a77b(0x2e3)][_0x12a77b(0x2a8)][_0x12a77b(0x2e3)][_0x12a77b(0x395)]){$gameSystem[_0x12a77b(0x244)]();let _0x307cf9=TextManager[_0x12a77b(0x247)]['format']($gameParty[_0x12a77b(0x355)]()),_0x58cf2e=ImageManager['combatLog_Result_Escape'];$gameSystem['addTextToCombatLog'](_0x307cf9,_0x58cf2e),$gameSystem[_0x12a77b(0x244)]();}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x378)]=BattleManager[_0x3bec14(0x260)],BattleManager[_0x3bec14(0x260)]=function(){const _0x2e6ebf=_0x3bec14;VisuMZ['CombatLog'][_0x2e6ebf(0x378)][_0x2e6ebf(0x270)](this);if(VisuMZ['CombatLog'][_0x2e6ebf(0x2a8)][_0x2e6ebf(0x2e3)][_0x2e6ebf(0x395)]){$gameSystem['addHorzLineToCombatLog']();let _0x59676a=TextManager[_0x2e6ebf(0x247)]['format']($gameParty[_0x2e6ebf(0x355)]()),_0x4e2c5a=ImageManager[_0x2e6ebf(0x3a0)];$gameSystem['addTextToCombatLog'](_0x59676a,_0x4e2c5a),$gameSystem[_0x2e6ebf(0x38b)](TextManager['escapeFailure'],_0x4e2c5a),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2eb)]=BattleManager[_0x3bec14(0x2ee)],BattleManager[_0x3bec14(0x2ee)]=function(){const _0x14dc4f=_0x3bec14;VisuMZ[_0x14dc4f(0x2e3)][_0x14dc4f(0x2eb)][_0x14dc4f(0x270)](this);if(VisuMZ['CombatLog'][_0x14dc4f(0x2a8)][_0x14dc4f(0x2e3)][_0x14dc4f(0x309)]){$gameSystem[_0x14dc4f(0x244)]();let _0x73535c=TextManager[_0x14dc4f(0x2bf)]['format']($gameParty[_0x14dc4f(0x355)]()),_0x23d0f4=ImageManager[_0x14dc4f(0x33b)];$gameSystem[_0x14dc4f(0x38b)](_0x73535c,_0x23d0f4),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x20a)]=Game_System['prototype'][_0x3bec14(0x2ec)],Game_System[_0x3bec14(0x328)][_0x3bec14(0x2ec)]=function(){const _0xedf99=_0x3bec14;VisuMZ[_0xedf99(0x2e3)]['Game_System_initialize']['call'](this),this['initCombatLogBase'](),this[_0xedf99(0x3a7)]();},Game_System[_0x3bec14(0x33c)]=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['General'][_0x3bec14(0x271)]??0x5,Game_System['prototype'][_0x3bec14(0x21c)]=function(){const _0x3f8c82=_0x3bec14;this['_combatLogs']=[],this[_0x3f8c82(0x20c)]=![];},Game_System[_0x3bec14(0x328)][_0x3bec14(0x202)]=function(_0x1f76f9){const _0x1688a7=_0x3bec14;if(this[_0x1688a7(0x3b8)]===undefined)this[_0x1688a7(0x21c)]();return _0x1f76f9=_0x1f76f9||0x0,this['_combatLogs'][_0x1f76f9]=this['_combatLogs'][_0x1f76f9]||[],this['_combatLogs'][_0x1f76f9];},Game_System[_0x3bec14(0x328)]['addTextToCombatLog']=function(_0x1a4ba6,_0x30dd60){const _0x63e80f=_0x3bec14;if(this[_0x63e80f(0x375)]())return;if(!_0x1a4ba6)return;_0x30dd60=_0x30dd60||0x0,_0x1a4ba6=VisuMZ[_0x63e80f(0x2e3)][_0x63e80f(0x1ef)](_0x1a4ba6);const _0x46f71b=this['getCombatLog'](),_0x30ca38=_0x1a4ba6[_0x63e80f(0x29c)]('\x0a');while(_0x30ca38[_0x63e80f(0x291)]>0x0){let _0xb25914=_0x30ca38['shift']();VisuMZ[_0x63e80f(0x2e3)][_0x63e80f(0x2a8)][_0x63e80f(0x2e3)]['ShowIcons']&&(_0xb25914=_0x63e80f(0x31b)[_0x63e80f(0x2ea)](_0x30dd60,_0xb25914)),_0x30dd60=0x0,_0x46f71b['push'](_0xb25914);}this[_0x63e80f(0x34b)]();},Game_System[_0x3bec14(0x328)][_0x3bec14(0x244)]=function(){const _0x12c5fe=_0x3bec14;if(this[_0x12c5fe(0x375)]())return;const _0x35ef7c=this[_0x12c5fe(0x202)](),_0x2e1aa2=_0x35ef7c[_0x35ef7c[_0x12c5fe(0x291)]-0x1];if(_0x2e1aa2===_0x12c5fe(0x3b5))return;_0x35ef7c['push'](_0x12c5fe(0x3b5)),this[_0x12c5fe(0x34b)]();},VisuMZ['CombatLog'][_0x3bec14(0x1ef)]=function(_0x40c147){const _0x2f4441=_0x3bec14;while(_0x40c147[_0x2f4441(0x293)](/\\V\[(\d+)\]/gi)){_0x40c147=_0x40c147[_0x2f4441(0x352)](/\\V\[(\d+)\]/gi,(_0x443d37,_0x27649e)=>$gameVariables[_0x2f4441(0x2bd)](parseInt(_0x27649e)));}return _0x40c147;},Game_System[_0x3bec14(0x328)][_0x3bec14(0x2dc)]=function(){const _0x2cf619=_0x3bec14;if(this[_0x2cf619(0x3b8)]===undefined)this[_0x2cf619(0x21c)]();this['_combatLogs']['unshift']([]);while(this[_0x2cf619(0x3b8)][_0x2cf619(0x291)]>Game_System['COMBATLOG_MAXIMUM_BATTLE_ENTRIES']){this[_0x2cf619(0x3b8)][_0x2cf619(0x2c0)]();}},Game_System[_0x3bec14(0x328)][_0x3bec14(0x267)]=function(){const _0x2f4499=_0x3bec14;if(this[_0x2f4499(0x3b8)]===undefined)this['initCombatLogBase']();return this[_0x2f4499(0x3b8)][_0x2f4499(0x291)];},Game_System[_0x3bec14(0x328)][_0x3bec14(0x375)]=function(){const _0x52b427=_0x3bec14;if(this[_0x52b427(0x20c)]===undefined)this['initCombatLogBase']();return this[_0x52b427(0x20c)];},Game_System['prototype'][_0x3bec14(0x2da)]=function(_0x12802f){const _0x2de6d1=_0x3bec14;if(this[_0x2de6d1(0x20c)]===undefined)this[_0x2de6d1(0x21c)]();this['_bypassAddToCombatLog']=_0x12802f;;},Game_System[_0x3bec14(0x328)][_0x3bec14(0x34b)]=function(){const _0x2dd567=_0x3bec14;if(!SceneManager[_0x2dd567(0x24e)]())return;const _0x149fe2=SceneManager[_0x2dd567(0x2a4)][_0x2dd567(0x398)];_0x149fe2&&_0x149fe2[_0x2dd567(0x21d)]();},Game_System[_0x3bec14(0x328)][_0x3bec14(0x3a7)]=function(){const _0x395d20=_0x3bec14,_0x55cb15=VisuMZ['CombatLog'][_0x395d20(0x2a8)][_0x395d20(0x354)];this[_0x395d20(0x35e)]={'mainMenu':_0x55cb15[_0x395d20(0x1df)],'partyCmd':_0x55cb15[_0x395d20(0x30a)],'actorCmd':_0x55cb15['ShowActorCommand'],'hotkeyOn':!![]};},Game_System[_0x3bec14(0x328)]['isMainMenuCombatLogVisible']=function(){const _0x4aed41=_0x3bec14;if(this[_0x4aed41(0x35e)]===undefined)this[_0x4aed41(0x3a7)]();return this[_0x4aed41(0x35e)][_0x4aed41(0x336)];},Game_System[_0x3bec14(0x328)][_0x3bec14(0x1ed)]=function(){const _0x235990=_0x3bec14;if(this[_0x235990(0x3b8)]===undefined)this[_0x235990(0x21c)]();return this[_0x235990(0x267)]()>0x0;},Game_System[_0x3bec14(0x328)][_0x3bec14(0x2b5)]=function(_0x2fb646){const _0x5b073a=_0x3bec14;if(this[_0x5b073a(0x35e)]===undefined)this[_0x5b073a(0x3a7)]();this['_combatLogAccess'][_0x5b073a(0x336)]=_0x2fb646;},Game_System['prototype'][_0x3bec14(0x243)]=function(){const _0x1c0150=_0x3bec14;if(this[_0x1c0150(0x35e)]===undefined)this[_0x1c0150(0x3a7)]();return this[_0x1c0150(0x35e)][_0x1c0150(0x1d0)];},Game_System[_0x3bec14(0x328)][_0x3bec14(0x274)]=function(_0x335cdf){const _0x296adc=_0x3bec14;if(this[_0x296adc(0x35e)]===undefined)this[_0x296adc(0x3a7)]();this[_0x296adc(0x35e)][_0x296adc(0x1d0)]=_0x335cdf;},Game_System['prototype']['isActorCmdCombatLogVisible']=function(){const _0x40445c=_0x3bec14;if(this['_combatLogAccess']===undefined)this[_0x40445c(0x3a7)]();return this['_combatLogAccess']['actorCmd'];},Game_System[_0x3bec14(0x328)][_0x3bec14(0x3b9)]=function(_0x293bee){const _0x5ecfa2=_0x3bec14;if(this[_0x5ecfa2(0x35e)]===undefined)this[_0x5ecfa2(0x3a7)]();this[_0x5ecfa2(0x35e)]['actorCmd']=_0x293bee;},Game_System[_0x3bec14(0x328)][_0x3bec14(0x307)]=function(){const _0x16aaa9=_0x3bec14;if(this['_combatLogAccess']===undefined)this[_0x16aaa9(0x3a7)]();return this[_0x16aaa9(0x35e)][_0x16aaa9(0x314)];},Game_System['prototype'][_0x3bec14(0x276)]=function(_0x580170){const _0x3ee832=_0x3bec14;if(this[_0x3ee832(0x35e)]===undefined)this['initCombatLogAccess']();this[_0x3ee832(0x35e)][_0x3ee832(0x314)]=_0x580170;},VisuMZ['CombatLog'][_0x3bec14(0x22b)]=Game_BattlerBase[_0x3bec14(0x328)]['setHp'],Game_BattlerBase[_0x3bec14(0x328)]['setHp']=function(_0x355a02){const _0x134bac=_0x3bec14,_0x1dc635=this[_0x134bac(0x29f)];VisuMZ[_0x134bac(0x2e3)][_0x134bac(0x22b)][_0x134bac(0x270)](this,_0x355a02);if(!SceneManager[_0x134bac(0x24e)]())return;if(this[_0x134bac(0x320)])return;if(!VisuMZ[_0x134bac(0x2e3)][_0x134bac(0x2a8)][_0x134bac(0x2e3)][_0x134bac(0x305)])return;if(this[_0x134bac(0x29a)])return;if(this[_0x134bac(0x2ad)])return;const _0x5bd617=_0x355a02;let _0x213474,_0x5df0e2,_0x535f49=_0x5bd617-_0x1dc635;if(_0x5bd617>_0x1dc635)_0x213474=this['isActor']()?TextManager[_0x134bac(0x2ae)]:TextManager[_0x134bac(0x28a)],_0x5df0e2=ImageManager[_0x134bac(0x353)];else _0x5bd617===_0x1dc635?(_0x213474=this[_0x134bac(0x2fe)]()?TextManager[_0x134bac(0x348)]:TextManager['enemyNoDamage'],_0x5df0e2=ImageManager[_0x134bac(0x22f)]):(_0x213474=this[_0x134bac(0x2fe)]()?TextManager[_0x134bac(0x1ea)]:TextManager[_0x134bac(0x39c)],_0x5df0e2=ImageManager['combatLog_HP_Dmg']);_0x535f49=ColorManager[_0x134bac(0x2a5)]('HP',_0x535f49);let _0x303728=_0x213474[_0x134bac(0x2ea)](this[_0x134bac(0x355)](),_0x535f49,TextManager['hp']);$gameSystem['addTextToCombatLog'](_0x303728,_0x5df0e2);},VisuMZ[_0x3bec14(0x2e3)]['Game_BattlerBase_setMp']=Game_BattlerBase[_0x3bec14(0x328)]['setMp'],Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x30f)]=function(_0x4abc47){const _0x442abe=_0x3bec14,_0x20f16a=this[_0x442abe(0x1e8)];VisuMZ[_0x442abe(0x2e3)][_0x442abe(0x2f0)][_0x442abe(0x270)](this,_0x4abc47);if(!SceneManager[_0x442abe(0x24e)]())return;if(this['_combatLogPayment'])return;if(!VisuMZ[_0x442abe(0x2e3)][_0x442abe(0x2a8)][_0x442abe(0x2e3)][_0x442abe(0x3ba)])return;if(this[_0x442abe(0x29a)])return;if(this[_0x442abe(0x2ad)])return;const _0x36139b=_0x4abc47;let _0x9c52b4,_0x5267e3,_0x94d169=_0x36139b-_0x20f16a;if(_0x36139b>_0x20f16a)_0x9c52b4=this[_0x442abe(0x2fe)]()?TextManager['actorRecovery']:TextManager['enemyRecovery'],_0x5267e3=ImageManager[_0x442abe(0x288)];else _0x36139b===_0x20f16a?(_0x9c52b4=this['isActor']()?TextManager[_0x442abe(0x33f)]:TextManager['enemyLoss'],_0x5267e3=ImageManager[_0x442abe(0x2cb)]):(_0x9c52b4=this[_0x442abe(0x2fe)]()?TextManager[_0x442abe(0x33f)]:TextManager[_0x442abe(0x1f4)],_0x5267e3=ImageManager[_0x442abe(0x23f)]);_0x94d169=ColorManager[_0x442abe(0x2a5)]('MP',_0x94d169);let _0x4073ca=_0x9c52b4['format'](this[_0x442abe(0x355)](),_0x94d169,TextManager['mp']);$gameSystem[_0x442abe(0x38b)](_0x4073ca,_0x5267e3);},VisuMZ['CombatLog'][_0x3bec14(0x385)]=Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x389)],Game_BattlerBase['prototype']['setTp']=function(_0x16e4db){const _0x40151c=_0x3bec14,_0x4bdaf0=this['_tp'];VisuMZ['CombatLog'][_0x40151c(0x385)][_0x40151c(0x270)](this,_0x16e4db);if(!SceneManager[_0x40151c(0x24e)]())return;if(this[_0x40151c(0x320)])return;if(this[_0x40151c(0x2a6)])return;if(!VisuMZ[_0x40151c(0x2e3)]['Settings'][_0x40151c(0x2e3)]['ShowTP'])return;if(this[_0x40151c(0x29a)])return;if(this[_0x40151c(0x2ad)])return;const _0x39fd7b=_0x16e4db;let _0x441508,_0x299fa3,_0x2b3c2f=_0x39fd7b-_0x4bdaf0;if(_0x39fd7b>_0x4bdaf0)_0x441508=this['isActor']()?TextManager[_0x40151c(0x2ae)]:TextManager['enemyRecovery'],_0x299fa3=ImageManager['combatLog_TP_Heal'];else _0x39fd7b===_0x4bdaf0?(_0x441508=this[_0x40151c(0x2fe)]()?TextManager['actorLoss']:TextManager['enemyLoss'],_0x299fa3=ImageManager[_0x40151c(0x2a9)]):(_0x441508=this['isActor']()?TextManager[_0x40151c(0x33f)]:TextManager[_0x40151c(0x1f4)],_0x299fa3=ImageManager[_0x40151c(0x392)]);_0x2b3c2f=ColorManager[_0x40151c(0x2a5)]('TP',_0x2b3c2f);let _0x3f56a7=_0x441508['format'](this[_0x40151c(0x355)](),_0x2b3c2f,TextManager['tp']);$gameSystem[_0x40151c(0x38b)](_0x3f56a7,_0x299fa3);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2f2)]=Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x261)],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x261)]=function(_0x384011){const _0x2c74a6=_0x3bec14;this['_combatLogSilentTp']=!![],VisuMZ[_0x2c74a6(0x2e3)][_0x2c74a6(0x2f2)][_0x2c74a6(0x270)](this,_0x384011),this['_combatLogSilentTp']=![];},VisuMZ['CombatLog'][_0x3bec14(0x1f5)]=Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x1dc)],Game_Battler[_0x3bec14(0x328)]['useItem']=function(_0x32fdbc){const _0x48f15d=_0x3bec14;this[_0x48f15d(0x320)]=!![],VisuMZ[_0x48f15d(0x2e3)][_0x48f15d(0x1f5)]['call'](this,_0x32fdbc),this[_0x48f15d(0x320)]=![];},VisuMZ['CombatLog'][_0x3bec14(0x251)]=Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x386)],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x386)]=function(_0x439b0f){const _0x1fca0e=_0x3bec14,_0x37a1dc=this[_0x1fca0e(0x38c)](_0x439b0f);VisuMZ['CombatLog'][_0x1fca0e(0x251)]['call'](this,_0x439b0f);const _0x2a4c58=this[_0x1fca0e(0x38c)](_0x439b0f);this[_0x1fca0e(0x2fa)](_0x439b0f,_0x37a1dc,_0x2a4c58);},VisuMZ[_0x3bec14(0x2e3)]['Game_Battler_removeState']=Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x265)],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x265)]=function(_0x21ae92){const _0x4dec75=_0x3bec14,_0x28b195=this[_0x4dec75(0x38c)](_0x21ae92);VisuMZ['CombatLog'][_0x4dec75(0x204)][_0x4dec75(0x270)](this,_0x21ae92);const _0x132c1d=this[_0x4dec75(0x38c)](_0x21ae92);this[_0x4dec75(0x2fa)](_0x21ae92,_0x28b195,_0x132c1d);},Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x2fa)]=function(_0x513190,_0x1f5231,_0x575893){const _0x29d9dd=_0x3bec14;if(!SceneManager[_0x29d9dd(0x24e)]())return;if(this['_tempActor'])return;if(this[_0x29d9dd(0x2ad)])return;const _0xfb6e77=$dataStates[_0x513190];if(!_0xfb6e77)return;if(_0xfb6e77[_0x29d9dd(0x20d)][_0x29d9dd(0x293)](VisuMZ[_0x29d9dd(0x2e3)][_0x29d9dd(0x1f2)][_0x29d9dd(0x359)]))return;const _0x1dd47f=VisuMZ[_0x29d9dd(0x2e3)]['Settings'][_0x29d9dd(0x2e3)];if(!_0x1f5231&&_0x575893){let _0x3d9e52=this['isActor']()?_0xfb6e77[_0x29d9dd(0x1d9)]:_0xfb6e77[_0x29d9dd(0x279)];if(_0x3d9e52&&_0x1dd47f['ShowStateAdd']){let _0x102de2=_0x3d9e52[_0x29d9dd(0x2ea)](this[_0x29d9dd(0x355)]()),_0x5b36d6=_0xfb6e77['iconIndex'];$gameSystem['addTextToCombatLog'](_0x102de2,_0x5b36d6);}}if(_0x1f5231&&_0x575893){let _0xbc9228=_0xfb6e77[_0x29d9dd(0x2c4)];if(_0xbc9228&&_0x1dd47f[_0x29d9dd(0x3b4)]){let _0x4f7019=_0xbc9228[_0x29d9dd(0x2ea)](this['combatLogName']()),_0x1ad2fa=_0xfb6e77['iconIndex'];$gameSystem[_0x29d9dd(0x38b)](_0x4f7019,_0x1ad2fa);}}if(_0x1f5231&&!_0x575893){let _0x463783=_0xfb6e77[_0x29d9dd(0x388)];if(_0x463783&&_0x1dd47f[_0x29d9dd(0x284)]){let _0x2e8def=_0x463783[_0x29d9dd(0x2ea)](this[_0x29d9dd(0x355)]()),_0x1be6af=_0xfb6e77[_0x29d9dd(0x298)];$gameSystem[_0x29d9dd(0x38b)](_0x2e8def,_0x1be6af);}}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x239)]=Game_BattlerBase['prototype']['increaseBuff'],Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x2d6)]=function(_0x5376ec){const _0x352c60=_0x3bec14;VisuMZ[_0x352c60(0x2e3)][_0x352c60(0x239)][_0x352c60(0x270)](this,_0x5376ec);if(!VisuMZ['CombatLog'][_0x352c60(0x2a8)][_0x352c60(0x2e3)][_0x352c60(0x2b6)])return;this[_0x352c60(0x292)](_0x5376ec,0x1,TextManager['buffAdd']);},VisuMZ['CombatLog'][_0x3bec14(0x317)]=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x39b)]=function(_0x2aee13){const _0x43d201=_0x3bec14;VisuMZ['CombatLog'][_0x43d201(0x317)]['call'](this,_0x2aee13);if(!VisuMZ[_0x43d201(0x2e3)][_0x43d201(0x2a8)][_0x43d201(0x2e3)][_0x43d201(0x2e6)])return;this[_0x43d201(0x292)](_0x2aee13,-0x1,TextManager[_0x43d201(0x223)]);},VisuMZ['CombatLog'][_0x3bec14(0x1d4)]=Game_BattlerBase['prototype'][_0x3bec14(0x304)],Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x304)]=function(_0x54247b){const _0x3b6cad=_0x3bec14,_0xd2f3ee=this[_0x3b6cad(0x23d)][_0x54247b]||0x0;VisuMZ[_0x3b6cad(0x2e3)][_0x3b6cad(0x1d4)]['call'](this,_0x54247b);const _0x39ca05=this['_buffs'][_0x54247b]||0x0,_0x46631b=_0x39ca05>_0xd2f3ee?0x1:-0x1;if(!VisuMZ[_0x3b6cad(0x2e3)]['Settings'][_0x3b6cad(0x2e3)][_0x3b6cad(0x224)])return;this['combatLogBuffChanges'](_0x54247b,_0x46631b,TextManager['buffRemove']);},Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x292)]=function(_0x13bdea,_0x52b72e,_0x471647){const _0x372109=_0x3bec14;if(!SceneManager[_0x372109(0x24e)]())return;if(!_0x471647)return;if(this[_0x372109(0x29a)])return;if(this[_0x372109(0x2ad)])return;const _0x513251=this[_0x372109(0x25e)](_0x52b72e||-0x1,_0x13bdea),_0x50b793=TextManager[_0x372109(0x349)](_0x13bdea),_0x40ef4a=_0x471647[_0x372109(0x2ea)](this['combatLogName'](),_0x50b793);$gameSystem['addTextToCombatLog'](_0x40ef4a,_0x513251);},Game_Actor['prototype']['combatLogName']=function(){const _0x1d62d3=_0x3bec14;return'\x5cN[%1]'[_0x1d62d3(0x2ea)](this['_actorId']);},Game_Enemy['prototype'][_0x3bec14(0x355)]=function(){const _0xcc20d0=_0x3bec14;return this[_0xcc20d0(0x2ce)]();},Game_Party['prototype'][_0x3bec14(0x355)]=function(){const _0x224df1=_0x3bec14,_0x142a12=this['battleMembers']()[_0x224df1(0x291)];if(_0x142a12===0x0)return'';else return _0x142a12===0x1?this[_0x224df1(0x2b0)]()[_0x224df1(0x355)]():TextManager['partyName'][_0x224df1(0x2ea)](this[_0x224df1(0x2b0)]()[_0x224df1(0x355)]());},VisuMZ['CombatLog'][_0x3bec14(0x391)]=Scene_Menu[_0x3bec14(0x328)][_0x3bec14(0x1ec)],Scene_Menu[_0x3bec14(0x328)]['createCommandWindow']=function(){const _0x2b960b=_0x3bec14;VisuMZ[_0x2b960b(0x2e3)][_0x2b960b(0x391)]['call'](this);const _0x27d772=this[_0x2b960b(0x258)];_0x27d772[_0x2b960b(0x20f)]('combatLog',this[_0x2b960b(0x24a)]['bind'](this));},Scene_Menu['prototype'][_0x3bec14(0x24a)]=function(){const _0x3d1f68=_0x3bec14;SceneManager[_0x3d1f68(0x262)](Scene_CombatLog);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x23b)]=Scene_Battle['prototype']['createDisplayObjects'],Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x211)]=function(){const _0x508496=_0x3bec14;VisuMZ[_0x508496(0x2e3)][_0x508496(0x23b)]['call'](this),this[_0x508496(0x31e)]();},Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x31e)]=function(){const _0x99d33c=_0x3bec14,_0x593c44=this[_0x99d33c(0x210)]();this['_combatLogWindow']=new Window_CombatLogDisplay(_0x593c44),this[_0x99d33c(0x398)]['setCombatLogIndex'](0x0),this[_0x99d33c(0x318)](this['_combatLogWindow']),this['_combatLogWindow']['x']=this[_0x99d33c(0x39f)]['x'],this['_combatLogWindow']['y']=this['_windowLayer']['y'],this[_0x99d33c(0x398)]['setBackgroundType'](VisuMZ['CombatLog'][_0x99d33c(0x2a8)]['Window'][_0x99d33c(0x351)]),this[_0x99d33c(0x398)][_0x99d33c(0x20f)]('combatLog',this[_0x99d33c(0x266)]['bind'](this)),this[_0x99d33c(0x398)]['setHandler'](_0x99d33c(0x2db),this[_0x99d33c(0x266)][_0x99d33c(0x338)](this)),this[_0x99d33c(0x374)][_0x99d33c(0x20f)](_0x99d33c(0x3bd),this[_0x99d33c(0x3c1)][_0x99d33c(0x338)](this,this[_0x99d33c(0x374)])),this['_actorCommandWindow'][_0x99d33c(0x20f)](_0x99d33c(0x3bd),this['openCombatLog']['bind'](this,this[_0x99d33c(0x34d)]));},Scene_Battle[_0x3bec14(0x328)]['combatLogWindowRect']=function(){const _0x205373=_0x3bec14,_0x4da965=VisuMZ[_0x205373(0x2e3)][_0x205373(0x2a8)]['Window']['CombatLogBattle_RectJS'];if(_0x4da965)return _0x4da965[_0x205373(0x270)](this);const _0x3ecaf6=0x0,_0x1f9a6b=0x0,_0xf7799d=Graphics[_0x205373(0x23a)],_0x50b808=Graphics[_0x205373(0x273)];return new Rectangle(_0x3ecaf6,_0x1f9a6b,_0xf7799d,_0x50b808);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x326)]=Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x384)],Scene_Battle['prototype'][_0x3bec14(0x384)]=function(){const _0xefe18d=_0x3bec14;if(this['_combatLogWindow']&&this[_0xefe18d(0x398)][_0xefe18d(0x250)])return!![];return VisuMZ['CombatLog'][_0xefe18d(0x326)][_0xefe18d(0x270)](this);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x26b)]=Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x283)],Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x283)]=function(){const _0x21e8ad=_0x3bec14;VisuMZ[_0x21e8ad(0x2e3)][_0x21e8ad(0x26b)][_0x21e8ad(0x270)](this),this[_0x21e8ad(0x398)]&&this[_0x21e8ad(0x398)][_0x21e8ad(0x2ca)]>0x0&&this[_0x21e8ad(0x39a)]&&(this[_0x21e8ad(0x39a)][_0x21e8ad(0x2b9)]=![]);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x22c)]=Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x209)],Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x209)]=function(){const _0x49c92c=_0x3bec14;return BattleManager['isActiveTpb']()&&this['_combatLogWindow']&&this['_combatLogWindow'][_0x49c92c(0x250)]?![]:VisuMZ[_0x49c92c(0x2e3)]['Scene_Battle_isTimeActive']['call'](this);},Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x3c1)]=function(_0x3f67c3){const _0x29d020=_0x3bec14;this[_0x29d020(0x398)]['open'](),this[_0x29d020(0x398)][_0x29d020(0x363)](),this[_0x29d020(0x398)][_0x29d020(0x33e)](),this[_0x29d020(0x398)][_0x29d020(0x1cd)](_0x3f67c3);},Scene_Battle[_0x3bec14(0x328)][_0x3bec14(0x266)]=function(){const _0x14c64a=_0x3bec14;this[_0x14c64a(0x398)][_0x14c64a(0x2ed)]();const _0x32cb29=this['_combatLogWindow'][_0x14c64a(0x31f)]();_0x32cb29[_0x14c64a(0x363)]();};function Scene_CombatLog(){const _0x4a88f5=_0x3bec14;this[_0x4a88f5(0x2ec)](...arguments);}Scene_CombatLog[_0x3bec14(0x328)]=Object[_0x3bec14(0x34a)](Scene_MenuBase[_0x3bec14(0x328)]),Scene_CombatLog[_0x3bec14(0x328)][_0x3bec14(0x37a)]=Scene_CombatLog,Scene_CombatLog['prototype'][_0x3bec14(0x2ec)]=function(){const _0x423185=_0x3bec14;Scene_MenuBase['prototype'][_0x423185(0x2ec)][_0x423185(0x270)](this);},Scene_CombatLog[_0x3bec14(0x328)]['helpAreaHeight']=function(){return 0x0;},Scene_CombatLog[_0x3bec14(0x328)][_0x3bec14(0x34a)]=function(){const _0x5990f4=_0x3bec14;Scene_MenuBase[_0x5990f4(0x328)][_0x5990f4(0x34a)][_0x5990f4(0x270)](this),this[_0x5990f4(0x33d)](),this['createCombatLogWindow']();},Scene_CombatLog[_0x3bec14(0x328)][_0x3bec14(0x33d)]=function(){const _0x55d766=_0x3bec14,_0x5340d0=this[_0x55d766(0x2b7)]();this[_0x55d766(0x27f)]=new Window_CombatLogHistory(_0x5340d0),this[_0x55d766(0x27f)][_0x55d766(0x20f)](_0x55d766(0x2db),this[_0x55d766(0x228)][_0x55d766(0x338)](this)),this['addWindow'](this[_0x55d766(0x27f)]),this[_0x55d766(0x27f)][_0x55d766(0x2d5)](VisuMZ[_0x55d766(0x2e3)][_0x55d766(0x2a8)][_0x55d766(0x36c)][_0x55d766(0x2c3)]);},Scene_CombatLog[_0x3bec14(0x328)][_0x3bec14(0x2b7)]=function(){const _0x12e600=_0x3bec14,_0x411f41=VisuMZ[_0x12e600(0x2e3)]['Settings'][_0x12e600(0x36c)][_0x12e600(0x35f)];if(_0x411f41)return _0x411f41[_0x12e600(0x270)](this);const _0x21bf2c=Graphics[_0x12e600(0x23a)],_0x417dfb=this[_0x12e600(0x242)](0x1,!![]),_0x43f81a=0x0,_0x142e64=this[_0x12e600(0x212)]();return new Rectangle(_0x43f81a,_0x142e64,_0x21bf2c,_0x417dfb);},Scene_CombatLog[_0x3bec14(0x328)][_0x3bec14(0x31e)]=function(){const _0x29d027=_0x3bec14,_0xdda070=this['combatLogWindowRect']();this['_combatLogWindow']=new Window_CombatLogDisplay(_0xdda070),this['addWindow'](this[_0x29d027(0x398)]),this[_0x29d027(0x27f)][_0x29d027(0x2a1)](this[_0x29d027(0x398)]),this['_combatLogWindow']['setBackgroundType'](VisuMZ[_0x29d027(0x2e3)]['Settings'][_0x29d027(0x36c)]['CombatLogMenu_BgType']);},Scene_CombatLog['prototype'][_0x3bec14(0x210)]=function(){const _0x42559e=_0x3bec14,_0x5e58d8=VisuMZ[_0x42559e(0x2e3)][_0x42559e(0x2a8)][_0x42559e(0x36c)][_0x42559e(0x208)];if(_0x5e58d8)return _0x5e58d8[_0x42559e(0x270)](this);const _0x1a672a=0x0,_0x45ff7a=this['_historyWindow']['y']+this[_0x42559e(0x27f)][_0x42559e(0x22e)],_0x227392=Graphics[_0x42559e(0x23a)],_0x3db8e5=this[_0x42559e(0x231)]()-this['_historyWindow'][_0x42559e(0x22e)];return new Rectangle(_0x1a672a,_0x45ff7a,_0x227392,_0x3db8e5);},Scene_CombatLog['prototype']['createBackground']=function(){const _0xbcc6fa=_0x3bec14;Scene_MenuBase[_0xbcc6fa(0x328)][_0xbcc6fa(0x24d)][_0xbcc6fa(0x270)](this),this[_0xbcc6fa(0x277)](this[_0xbcc6fa(0x263)]()),this[_0xbcc6fa(0x356)]();},Scene_CombatLog[_0x3bec14(0x328)]['getBackgroundOpacity']=function(){const _0x2109ac=_0x3bec14;return VisuMZ[_0x2109ac(0x2e3)][_0x2109ac(0x2a8)]['BgSettings']['SnapshotOpacity'];},Scene_CombatLog[_0x3bec14(0x328)][_0x3bec14(0x356)]=function(){const _0x1814a3=_0x3bec14,_0x35fe15=VisuMZ['CombatLog'][_0x1814a3(0x2a8)][_0x1814a3(0x3ac)];_0x35fe15&&(_0x35fe15[_0x1814a3(0x201)]!==''||_0x35fe15[_0x1814a3(0x2f1)]!=='')&&(this[_0x1814a3(0x3a6)]=new Sprite(ImageManager[_0x1814a3(0x362)](_0x35fe15[_0x1814a3(0x201)])),this[_0x1814a3(0x2fd)]=new Sprite(ImageManager[_0x1814a3(0x1e3)](_0x35fe15['BgFilename2'])),this[_0x1814a3(0x318)](this[_0x1814a3(0x3a6)]),this['addChild'](this[_0x1814a3(0x2fd)]),this['_backSprite1'][_0x1814a3(0x1e9)][_0x1814a3(0x2d9)](this['adjustSprite'][_0x1814a3(0x338)](this,this[_0x1814a3(0x3a6)])),this[_0x1814a3(0x2fd)][_0x1814a3(0x1e9)]['addLoadListener'](this[_0x1814a3(0x3aa)][_0x1814a3(0x338)](this,this[_0x1814a3(0x2fd)])));},Scene_CombatLog['prototype'][_0x3bec14(0x3aa)]=function(_0x5ad7ba){const _0x237c33=_0x3bec14;this['scaleSprite'](_0x5ad7ba),this[_0x237c33(0x2af)](_0x5ad7ba);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x3b1)]=Window_Selectable[_0x3bec14(0x328)]['allowShiftScrolling'],Window_Selectable['prototype'][_0x3bec14(0x27e)]=function(){const _0x260729=_0x3bec14;if(SceneManager[_0x260729(0x24e)]()){const _0x4a68e7=SceneManager['_scene'][_0x260729(0x398)];if(_0x4a68e7&&_0x4a68e7[_0x260729(0x350)]())return![];}return VisuMZ[_0x260729(0x2e3)][_0x260729(0x3b1)]['call'](this);},VisuMZ['CombatLog'][_0x3bec14(0x38e)]=Window_Selectable[_0x3bec14(0x328)][_0x3bec14(0x327)],Window_Selectable['prototype']['isCursorMovable']=function(){const _0x24643b=_0x3bec14;if(SceneManager[_0x24643b(0x24e)]()){const _0x1513f6=SceneManager['_scene'][_0x24643b(0x398)];if(_0x1513f6&&_0x1513f6[_0x24643b(0x350)]())return![];}return VisuMZ[_0x24643b(0x2e3)][_0x24643b(0x38e)][_0x24643b(0x270)](this);},VisuMZ[_0x3bec14(0x2e3)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x3bec14(0x328)][_0x3bec14(0x21a)],Window_MenuCommand[_0x3bec14(0x328)][_0x3bec14(0x21a)]=function(){const _0x2c795f=_0x3bec14;VisuMZ[_0x2c795f(0x2e3)][_0x2c795f(0x21f)][_0x2c795f(0x270)](this);if(Imported[_0x2c795f(0x376)])return;this[_0x2c795f(0x334)]();},Window_MenuCommand['prototype']['addCombatLogCommand']=function(){const _0x3cfad8=_0x3bec14;if(!this['isCombatLogCommandVisible']())return;const _0x3515cd=TextManager[_0x3cfad8(0x1f7)],_0x4a9180=this[_0x3cfad8(0x332)]();this[_0x3cfad8(0x34c)](_0x3515cd,'combatLog',_0x4a9180);},Window_MenuCommand[_0x3bec14(0x328)][_0x3bec14(0x35b)]=function(){const _0x18b611=_0x3bec14;return $gameSystem[_0x18b611(0x225)]();},Window_MenuCommand[_0x3bec14(0x328)][_0x3bec14(0x332)]=function(){return $gameSystem['isMainMenuCombatLogEnabled']();},VisuMZ[_0x3bec14(0x2e3)]['Window_BattleLog_startTurn']=Window_BattleLog[_0x3bec14(0x328)]['startTurn'],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x203)]=function(){const _0xb109d9=_0x3bec14;VisuMZ[_0xb109d9(0x2e3)][_0xb109d9(0x257)]['call'](this);if(!VisuMZ['CombatLog'][_0xb109d9(0x2a8)][_0xb109d9(0x2e3)][_0xb109d9(0x2f9)])return;$gameSystem[_0xb109d9(0x244)]();let _0x209cf2=TextManager['combatLog_StartTurn'][_0xb109d9(0x2ea)]($gameTroop[_0xb109d9(0x2e5)]()),_0x2dd9b4=ImageManager[_0xb109d9(0x32f)];$gameSystem[_0xb109d9(0x38b)](_0x209cf2,_0x2dd9b4);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2ef)]=Window_BattleLog[_0x3bec14(0x328)]['startAction'],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x37e)]=function(_0x4acd74,_0x3b744e,_0x208048){const _0x190542=_0x3bec14;$gameSystem['addHorzLineToCombatLog'](),VisuMZ[_0x190542(0x2e3)][_0x190542(0x2ef)][_0x190542(0x270)](this,_0x4acd74,_0x3b744e,_0x208048);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x1fe)]=Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x28f)],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x28f)]=function(_0x5d14d1){const _0x38648=_0x3bec14;VisuMZ[_0x38648(0x2e3)][_0x38648(0x1fe)]['call'](this,_0x5d14d1);if(!_0x5d14d1)return;if(!VisuMZ['CombatLog']['Settings']['CombatLog'][_0x38648(0x3b4)]);const _0xadec3e=_0x5d14d1['states']();for(const _0x1303b9 of _0xadec3e){if(!_0x1303b9)continue;if(!_0x1303b9[_0x38648(0x2c4)])continue;if(_0x1303b9[_0x38648(0x20d)][_0x38648(0x293)](VisuMZ[_0x38648(0x2e3)]['RegExp'][_0x38648(0x359)]))continue;let _0x25caaa=_0x1303b9[_0x38648(0x2c4)],_0x41a12d=_0x25caaa[_0x38648(0x2ea)](_0x5d14d1[_0x38648(0x355)]()),_0x22c190=_0x1303b9[_0x38648(0x298)];$gameSystem[_0x38648(0x38b)](_0x41a12d,_0x22c190);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x1d3)]=Window_BattleLog['prototype'][_0x3bec14(0x26c)],Window_BattleLog['prototype']['displayAction']=function(_0x5665ee,_0x2f7691){const _0x31e1d4=_0x3bec14;VisuMZ['CombatLog'][_0x31e1d4(0x1d3)]['call'](this,_0x5665ee,_0x2f7691);const _0x46dea5=VisuMZ[_0x31e1d4(0x2e3)][_0x31e1d4(0x2a8)]['CombatLog'];if(DataManager['isSkill'](_0x2f7691)){if(_0x2f7691[_0x31e1d4(0x1d9)]&&_0x46dea5[_0x31e1d4(0x3b6)]){let _0x32a232=_0x2f7691['message1'],_0x434ee1=_0x32a232[_0x31e1d4(0x2ea)](_0x5665ee[_0x31e1d4(0x355)](),_0x2f7691['name']),_0x46194b=_0x2f7691['iconIndex'];$gameSystem[_0x31e1d4(0x38b)](_0x434ee1,_0x46194b);}if(_0x2f7691[_0x31e1d4(0x279)]&&_0x46dea5['ShowSkillMessage2']){let _0x4f77bd=_0x2f7691['message2'],_0x22acc0=_0x4f77bd[_0x31e1d4(0x2ea)](_0x5665ee[_0x31e1d4(0x355)](),_0x2f7691[_0x31e1d4(0x2ce)]),_0x514d23=_0x2f7691['iconIndex'];$gameSystem[_0x31e1d4(0x38b)](_0x22acc0,_0x514d23);}}else{if(TextManager['useItem']&&_0x46dea5[_0x31e1d4(0x3bf)]){let _0x55606a=TextManager[_0x31e1d4(0x1dc)],_0x146280=_0x55606a[_0x31e1d4(0x2ea)](_0x5665ee[_0x31e1d4(0x355)](),_0x2f7691[_0x31e1d4(0x2ce)]),_0x4fd54e=_0x2f7691[_0x31e1d4(0x298)];$gameSystem[_0x31e1d4(0x38b)](_0x146280,_0x4fd54e);}}},VisuMZ['CombatLog'][_0x3bec14(0x337)]=Window_BattleLog[_0x3bec14(0x328)]['displayCounter'],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x321)]=function(_0x5ac77a){const _0x2f162d=_0x3bec14;VisuMZ[_0x2f162d(0x2e3)]['Window_BattleLog_displayCounter'][_0x2f162d(0x270)](this,_0x5ac77a);if(TextManager[_0x2f162d(0x37d)]&&VisuMZ['CombatLog']['Settings'][_0x2f162d(0x2e3)][_0x2f162d(0x253)]){let _0x6b5546=TextManager['counterAttack'],_0x1717f2=_0x6b5546[_0x2f162d(0x2ea)](_0x5ac77a[_0x2f162d(0x355)]()),_0x5a3d42=ImageManager[_0x2f162d(0x230)];$gameSystem[_0x2f162d(0x38b)](_0x1717f2,_0x5a3d42);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2d3)]=Window_BattleLog[_0x3bec14(0x328)]['displayReflection'],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x390)]=function(_0xfa834e){const _0x52dfb6=_0x3bec14;VisuMZ['CombatLog']['Window_BattleLog_displayReflection'][_0x52dfb6(0x270)](this,_0xfa834e);if(TextManager[_0x52dfb6(0x324)]&&VisuMZ[_0x52dfb6(0x2e3)]['Settings'][_0x52dfb6(0x2e3)]['ShowReflect']){let _0x36ebf3=TextManager[_0x52dfb6(0x324)],_0x2b56a3=_0x36ebf3[_0x52dfb6(0x2ea)](_0xfa834e[_0x52dfb6(0x355)]()),_0x380eb9=ImageManager[_0x52dfb6(0x218)];$gameSystem[_0x52dfb6(0x38b)](_0x2b56a3,_0x380eb9);}},VisuMZ['CombatLog'][_0x3bec14(0x1da)]=Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x26f)],Window_BattleLog[_0x3bec14(0x328)]['displaySubstitute']=function(_0x3c72a9,_0xa69466){const _0x197e01=_0x3bec14;VisuMZ['CombatLog'][_0x197e01(0x1da)][_0x197e01(0x270)](this,_0x3c72a9,_0xa69466);if(TextManager[_0x197e01(0x237)]&&VisuMZ['CombatLog'][_0x197e01(0x2a8)]['CombatLog'][_0x197e01(0x346)]){const _0x4c79b1=_0x3c72a9['combatLogName']();let _0x30a34c=TextManager[_0x197e01(0x237)],_0x540227=_0x30a34c['format'](_0x4c79b1,_0xa69466[_0x197e01(0x355)]()),_0x5a3dbd=ImageManager[_0x197e01(0x29b)];$gameSystem['addTextToCombatLog'](_0x540227,_0x5a3dbd);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x297)]=Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x306)],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x306)]=function(_0x1f5aed){const _0x2b9567=_0x3bec14;VisuMZ[_0x2b9567(0x2e3)][_0x2b9567(0x297)]['call'](this,_0x1f5aed);if(_0x1f5aed[_0x2b9567(0x39e)]()[_0x2b9567(0x357)]()&&!_0x1f5aed[_0x2b9567(0x39e)]()[_0x2b9567(0x364)]){if(TextManager['actionFailure']&&VisuMZ['CombatLog']['Settings'][_0x2b9567(0x2e3)]['ShowFail']){let _0x1cc0d8=TextManager[_0x2b9567(0x36a)],_0x4028de=_0x1cc0d8['format'](_0x1f5aed['combatLogName']()),_0xf7c9f4=ImageManager[_0x2b9567(0x31d)];$gameSystem[_0x2b9567(0x38b)](_0x4028de,_0xf7c9f4);}}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x368)]=Window_BattleLog[_0x3bec14(0x328)]['displayCritical'],Window_BattleLog['prototype'][_0x3bec14(0x30d)]=function(_0x1874b2){const _0x2fb33a=_0x3bec14;VisuMZ[_0x2fb33a(0x2e3)][_0x2fb33a(0x368)]['call'](this,_0x1874b2);if(_0x1874b2[_0x2fb33a(0x39e)]()['critical']&&VisuMZ[_0x2fb33a(0x2e3)]['Settings'][_0x2fb33a(0x2e3)]['ShowCritical']){if(_0x1874b2[_0x2fb33a(0x2fe)]()){if(TextManager[_0x2fb33a(0x206)]){let _0x2b3a3c=TextManager[_0x2fb33a(0x206)],_0x1e092a=ImageManager[_0x2fb33a(0x30b)];$gameSystem['addTextToCombatLog'](_0x2b3a3c,_0x1e092a);}}else{if(TextManager[_0x2fb33a(0x361)]){let _0x2f3db1=TextManager[_0x2fb33a(0x361)],_0x5debe5=ImageManager[_0x2fb33a(0x30b)];$gameSystem[_0x2fb33a(0x38b)](_0x2f3db1,_0x5debe5);}}}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x1f6)]=Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x32d)],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x32d)]=function(_0x595ddb){const _0x3794f8=_0x3bec14;VisuMZ['CombatLog'][_0x3794f8(0x1f6)][_0x3794f8(0x270)](this,_0x595ddb);if(_0x595ddb[_0x3794f8(0x39e)]()[_0x3794f8(0x379)]&&VisuMZ[_0x3794f8(0x2e3)][_0x3794f8(0x2a8)][_0x3794f8(0x2e3)]['ShowMiss']){const _0x1c7886=_0x595ddb[_0x3794f8(0x2fe)]();if(_0x1c7886&&TextManager[_0x3794f8(0x2d8)]){let _0x4183cb=TextManager['actorNoHit'],_0x35df10=_0x4183cb[_0x3794f8(0x2ea)](_0x595ddb['combatLogName']()),_0x148acc=ImageManager['combatLog_Miss_Icon'];$gameSystem['addTextToCombatLog'](_0x35df10,_0x148acc);}else{if(!_0x1c7886&&TextManager['enemyNoHit']){let _0xd5c10=TextManager[_0x3794f8(0x30e)],_0x20f47c=_0xd5c10[_0x3794f8(0x2ea)](_0x595ddb[_0x3794f8(0x355)]()),_0x12736c=ImageManager[_0x3794f8(0x264)];$gameSystem[_0x3794f8(0x38b)](_0x20f47c,_0x12736c);}}}else{if(TextManager['actionFailure']&&VisuMZ[_0x3794f8(0x2e3)][_0x3794f8(0x2a8)][_0x3794f8(0x2e3)][_0x3794f8(0x21b)]){let _0x2882ff=TextManager[_0x3794f8(0x36a)],_0x2e79da=_0x2882ff[_0x3794f8(0x2ea)](_0x595ddb['combatLogName']()),_0x2b4163=ImageManager['combatLog_Failure_Icon'];$gameSystem[_0x3794f8(0x38b)](_0x2e79da,_0x2b4163);}}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x319)]=Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x2e9)],Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x2e9)]=function(_0x10ad96){const _0x505e77=_0x3bec14;VisuMZ[_0x505e77(0x2e3)][_0x505e77(0x319)][_0x505e77(0x270)](this,_0x10ad96);if(VisuMZ[_0x505e77(0x2e3)][_0x505e77(0x2a8)][_0x505e77(0x2e3)][_0x505e77(0x31a)]){if(_0x10ad96[_0x505e77(0x39e)]()['physical']&&TextManager[_0x505e77(0x1d2)]){let _0x1d5cf5=TextManager['evasion'],_0x1f9cc8=_0x1d5cf5[_0x505e77(0x2ea)](_0x10ad96[_0x505e77(0x355)]()),_0x4a52b0=ImageManager[_0x505e77(0x1f1)];$gameSystem[_0x505e77(0x38b)](_0x1f9cc8,_0x4a52b0);}else{if(TextManager[_0x505e77(0x341)]){let _0x1de247=TextManager[_0x505e77(0x341)],_0xeb0913=_0x1de247['format'](_0x10ad96[_0x505e77(0x355)]()),_0x1e0e0=ImageManager[_0x505e77(0x1f1)];$gameSystem[_0x505e77(0x38b)](_0xeb0913,_0x1e0e0);}}}},VisuMZ['CombatLog'][_0x3bec14(0x3ae)]=Window_PartyCommand[_0x3bec14(0x328)][_0x3bec14(0x1ce)],Window_PartyCommand['prototype'][_0x3bec14(0x1ce)]=function(){const _0x355898=_0x3bec14;VisuMZ[_0x355898(0x2e3)][_0x355898(0x3ae)][_0x355898(0x270)](this);if(Imported[_0x355898(0x36d)])return;this[_0x355898(0x334)]();},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x1fc)]=Window_PartyCommand['prototype'][_0x3bec14(0x37b)],Window_PartyCommand[_0x3bec14(0x328)][_0x3bec14(0x37b)]=function(){const _0x1f8a5b=_0x3bec14;VisuMZ['CombatLog'][_0x1f8a5b(0x1fc)][_0x1f8a5b(0x270)](this),this[_0x1f8a5b(0x334)]();},Window_PartyCommand[_0x3bec14(0x328)]['addCombatLogCommand']=function(){const _0x1a3f94=_0x3bec14;if(!$gameSystem[_0x1a3f94(0x243)]())return;if(this[_0x1a3f94(0x1fb)](_0x1a3f94(0x3bd))>=0x0)return;const _0x21eabe=Imported[_0x1a3f94(0x36d)]?this[_0x1a3f94(0x245)]():_0x1a3f94(0x344),_0x497dae=TextManager[_0x1a3f94(0x1f7)],_0x396454=ImageManager[_0x1a3f94(0x399)]||0x0,_0x3a015d=_0x21eabe===_0x1a3f94(0x344)?_0x497dae:_0x1a3f94(0x31b)[_0x1a3f94(0x2ea)](_0x396454,_0x497dae);this['addCommand'](_0x3a015d,_0x1a3f94(0x3bd));},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x280)]=Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x1ce)],Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x1ce)]=function(){const _0x4db891=_0x3bec14;VisuMZ[_0x4db891(0x2e3)]['Window_ActorCommand_makeCommandList'][_0x4db891(0x270)](this);if(Imported[_0x4db891(0x36d)])return;if(this[_0x4db891(0x1fb)]('combatLog')>=0x0)return;this[_0x4db891(0x334)]();},VisuMZ[_0x3bec14(0x2e3)]['Window_ActorCommand_addCustomCommands']=Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x37b)],Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x37b)]=function(){const _0x2dc1f5=_0x3bec14;VisuMZ[_0x2dc1f5(0x2e3)][_0x2dc1f5(0x227)][_0x2dc1f5(0x270)](this),this[_0x2dc1f5(0x334)]();},Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x334)]=function(){const _0x4e7350=_0x3bec14;if(!$gameSystem['isActorCmdCombatLogVisible']())return;this['findSymbol'](_0x4e7350(0x3bd))>=0x0&&this[_0x4e7350(0x3a3)]();const _0x3c2290=Imported[_0x4e7350(0x36d)]?this[_0x4e7350(0x245)]():_0x4e7350(0x344),_0x5959a2=TextManager[_0x4e7350(0x1f7)],_0x47a92f=ImageManager[_0x4e7350(0x399)]||0x0,_0x5d2816=_0x3c2290==='text'?_0x5959a2:_0x4e7350(0x31b)[_0x4e7350(0x2ea)](_0x47a92f,_0x5959a2);this[_0x4e7350(0x34c)](_0x5d2816,'combatLog');},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['Window_ActorCommand_updateHelp']=Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x27d)],Window_ActorCommand[_0x3bec14(0x328)]['updateHelp']=function(){const _0x413eab=_0x3bec14,_0x2054e1=this[_0x413eab(0x37c)]();switch(_0x2054e1){case _0x413eab(0x3bd):this[_0x413eab(0x222)][_0x413eab(0x30c)](TextManager[_0x413eab(0x2a2)]);break;default:VisuMZ[_0x413eab(0x2e3)]['Settings'][_0x413eab(0x272)][_0x413eab(0x270)](this);break;}},Window_ActorCommand[_0x3bec14(0x328)][_0x3bec14(0x3a3)]=function(){const _0x270b39=_0x3bec14;while(this[_0x270b39(0x1fb)](_0x270b39(0x3bd))>=0x0){const _0x4fb660=this[_0x270b39(0x1fb)](_0x270b39(0x3bd));this[_0x270b39(0x3a8)][_0x270b39(0x358)](_0x4fb660,0x1);}};function _0x5c18(){const _0x5bbd19=['isTimeActive','Game_System_initialize','checkRefresh','_bypassAddToCombatLog','note','inBattle','setHandler','combatLogWindowRect','createDisplayObjects','mainAreaTop','exit','version','isAutoColorAffected','onAntiDamageTpBarrier','JSON','combatLog_Reflection_Icon','Game_Battler_stbGainInstant','addOriginalCommands','ShowFail','initCombatLogBase','requestRefresh','pagedown','Window_MenuCommand_addOriginalCommands','VisuMZ_3_InputComboSkills','aliveMembers','_helpWindow','debuffAdd','ShowEraseBuff','isMainMenuCombatLogVisible','refreshDimmerBitmap','Window_ActorCommand_addCustomCommands','popScene','CombatLogEnableHotKey','combatLog_BattleStart','Game_BattlerBase_setHp','Scene_Battle_isTimeActive','resetFontSettings','height','combatLog_HP_NoDmg','combatLog_Counter_Icon','mainAreaHeight','IconReflect','IconBattleSysAtbInterrupt','drawTextEx','TextBattleStart','width','substitute','isActiveChainSkillsUiVisible','Game_BattlerBase_increaseBuff','boxWidth','Scene_Battle_createDisplayObjects','\x5cC[%1]%2\x5cC[0]','_buffs','TextColorNoDmgTP','combatLog_MP_Dmg','onTouchOk','Game_Battler_onAtbInterrupt','calcWindowHeight','isPartyCmdCombatLogVisible','addHorzLineToCombatLog','commandStyle','addStealText','escapeStart','Window_BattleLog_addStealText','trim','commandCombatLog','HotKey','Game_Battler_onAntiDamageMpBarrier','createBackground','isSceneBattle','BIGGER_LINE_HEIGHT','active','Game_Battler_addState','Text_LifeStateEffects_%1','ShowCounter','IconHealMP','pageup','Show_AntiDmgBarrier_Absorb','Window_BattleLog_startTurn','_commandWindow','Icon','ARRAYNUM','processAbort','TextColorHealMP','IconBattleStart','buffIconIndex','onLifeStateEffect','onEscapeFailure','gainSilentTp','push','getBackgroundOpacity','combatLog_Miss_Icon','removeState','closeCombatLog','getTotalCombatLogs','IconDmgTP','ConvertParams','createDimmerSprite','Scene_Battle_updateCancelButton','displayAction','SCROLL_SPEED_CURSOR','ShowBattleSysAtbInterrupt','displaySubstitute','call','StoredLogs','Window_ActorCommand_updateHelp','boxHeight','setPartyCmdCombatLogVisible','Game_Battler_onAntiDamageCancelBarrier','setCombatLogHotKeyActive','setBackgroundOpacity','isAccessKeyPressed','message2','Show_LifeStateEffects_%1','IconEvade','BattleManager_onEscapeSuccess','updateHelp','allowShiftScrolling','_historyWindow','Window_ActorCommand_makeCommandList','IconHealTP','_dimmerSprite','updateCancelButton','ShowStateRemove','ShowAdvantages','isMenuCursorBlacklisted','BattleManager_processVictory','combatLog_MP_Heal','scrollTo','enemyRecovery','TextColorHealTP','combatLog_Preemptive_Icon','3482870RvOgkp','commandName','displayCurrentState','getAntiDamageBarrierReduction','length','combatLogBuffChanges','match','Text_AntiDmgBarrier_Absorb','Game_Battler_onAntiDamageNullificationBarrier','ShowBattleSysCtbOrderChange','Window_BattleLog_displayFailure','iconIndex','setFrame','_tempActor','combatLog_Substitute_Icon','split','BattleManager_processAbort','Game_BattlerBase_getAntiDamageBarrierReduction','_hp','ACCESS_BUTTON','setLogWindow','combatLogHelp','filter','_scene','applyCombatLogColor','_combatLogSilentTp','CombatLogAddText','Settings','combatLog_TP_NoDmg','IconNoDmgHP','toUpperCase','TextColorHealHP','_tempBattler','actorRecovery','centerSprite','leader','currentExt','smoothScrollDown','IconDefeat','onEscapeSuccess','setMainMenuCombatLogVisible','ShowAddBuff','historyWindowRect','onAntiDamageCancelBarrier','visible','EVAL','_lastWindow','processVictory','value','NoDmg','defeat','pop','drawBackgroundRect','stbGainInstant','CombatHistory_BgType','message3','ARRAYFUNC','isTpb','combatLog_StartTurn','parameters','124579MfDBCA','openness','combatLog_MP_NoDmg','IconBattleSysCtbOrderChange','Compatibility','name','Text_AntiDmgBarrier_Reduce','Game_Battler_onAntiDamageTpBarrier','combatLog_EnemyEmerge_Icon','Heal','Window_BattleLog_displayReflection','isTriggered','setBackgroundType','increaseBuff','Show_StealItems_Steal','actorNoHit','addLoadListener','setBypassCombatLog','cancel','finishCurrentCombatLog','drawItemBackground','padding','itemHeight','IconNoDmgTP','emerge','IconPreemptive','CombatLog','_combatLog_HistoryFmt','turnCount','ShowAddDebuff','home','IconNoDmgMP','displayEvasion','format','BattleManager_processDefeat','initialize','close','processDefeat','Window_BattleLog_startAction','Game_BattlerBase_setMp','BgFilename2','Game_Battler_gainSilentTp','Enable','surprise','View\x20the\x20combat\x20log.','includes','map','onAntiDamageMpBarrier','ShowStartTurn','combatLogStateChanges','combatLog_%1_%2','anchor','_backSprite2','isActor','setCombatLogIndex','IconStartTurn','onCtbOrderChange','processCancel','TextBattleSysAtbInterrupt','eraseBuff','ShowHP','displayFailure','isCombatLogHotKeyActive','combatLog_EndTurn_Icon','ShowDefeat','ShowPartyCommand','combatLog_CriticalHit_Icon','setText','displayCritical','enemyNoHit','setMp','NUM','ShowBattleStart','gradientFillRect','combatLog_EndTurn','hotkeyOn','Icon_StealItems_Steal','IconSubst','Game_BattlerBase_decreaseBuff','addChild','Window_BattleLog_displayEvasion','ShowEvade','\x5cI[%1]%2','history','combatLog_Failure_Icon','createCombatLogWindow','getLastWindow','_combatLogPayment','displayCounter','3515788WwPeey','canPerformInputComboSkills','magicReflection','Text_AntiDmgBarrier_Cancel','Scene_Battle_isAnyInputWindowActive','isCursorMovable','prototype','end','IconVictory','down','TextStartTurn','displayMiss','ARRAYEVAL','combatLog_StartTurn_Icon','Show_AntiDmgBarrier_Nullify','IconFail','isCombatLogCommandEnabled','VisuMZ_3_ActiveChainSkills','addCombatLogCommand','SystemShowCombatLogMenu','mainMenu','Window_BattleLog_displayCounter','bind','_requestRefresh','onAntiDamageNullificationBarrier','combatLog_Result_Defeat','COMBATLOG_MAXIMUM_BATTLE_ENTRIES','createHistoryWindow','battleRefresh','actorLoss','combatLog_HP_Dmg','magicEvasion','_logWindow','Bypass','text','_surprise','ShowSubst','Text_AntiDmgBarrier_TpDisperse','actorNoDamage','param','create','refreshCombatLog','addCommand','_actorCommandWindow','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onAtbInterrupt','isOpen','CombatLogBattle_BgType','replace','combatLog_HP_Heal','General','combatLogName','createCustomBackgroundImages','isHit','splice','BypassCombatLog','STR','isCombatLogCommandVisible','TextColorDmgMP','displayAbsorptionBarrierPopup','_combatLogAccess','CombatHistory_RectJS','processOk','criticalToEnemy','loadTitle1','activate','success','CombatHistoryPrevious','TextColorNoDmgHP','smoothScrollUp','Window_BattleLog_displayCritical','Show','actionFailure','SystemShowCombatLogActor','Window','VisuMZ_1_BattleCore','BattleManager_endTurn','Game_Battler_onCtbOrderChange','fillRect','IconEnemyEmerge','startBattleCombatLog','63xSCpDy','_partyCommandWindow','isBypassCombatLog','VisuMZ_1_MainMenuCore','registerCommand','BattleManager_onEscapeFailure','physical','constructor','addCustomCommands','currentSymbol','counterAttack','startAction','IconEscape','combatLog_TP_Heal','2672329dIOfKd','drawItem','IconDmgHP','isAnyInputWindowActive','Game_BattlerBase_setTp','addState','FUNC','message4','setTp','ARRAYJSON','addTextToCombatLog','isStateAffected','IconBattleSysStbInstant','Window_Selectable_isCursorMovable','maxCols','displayReflection','Scene_Menu_createCommandWindow','combatLog_TP_Dmg','preemptive','933584yOcLma','ShowEscape','Show_AntiDmgBarrier_Cancel','dimColor2','_combatLogWindow','combatLog_BattleCmd_Icon','_cancelButton','decreaseBuff','enemyDamage','maxScrollY','result','_windowLayer','combatLog_Result_Escape','isPressed','BattleManager_startBattle','removeCombatLogCommand','select','cursorUp','_backSprite1','initCombatLogAccess','_list','BattleManager_updateTurnEnd','adjustSprite','ShowEnemyEmerge','BgSettings','startBattle','Window_PartyCommand_makeCommandList','Text','16558230BtFKWf','Window_Selectable_allowShiftScrolling','SHOW_LINE_BACKGROUND','Show_AntiDmgBarrier_MpDisperse','ShowStateCurrent','=====HORZLINE=====','ShowSkillMessage1','2jnNLsU','_combatLogs','setActorCmdCombatLogVisible','ShowMP','10ilNdRz','_combatLogIndex','combatLog','TextBattleSysStbInstant','ShowItemMessage','12CqMqTT','openCombatLog','ShowVictory','24XuLyqq','setLastWindow','makeCommandList','SystemShowCombatLogParty','partyCmd','drawHorzLine','evasion','Window_BattleLog_displayAction','Game_BattlerBase_eraseBuff','parse','SCROLL_SPEED_PAGEDN','Show_AntiDmgBarrier_Reduce','smoothScrollTo','message1','Window_BattleLog_displaySubstitute','IconCritical','useItem','IconSurprise','AutoColor','ShowMainMenu','deactivate','ARRAYSTR','update','loadTitle2','_victoryPhase','TextColorDmgHP','updateTurnEnd','Game_Battler_displayAbsorptionBarrierPopup','_mp','bitmap','actorDamage','endTurn','createCommandWindow','isMainMenuCombatLogEnabled','TextEndTurn','RemoveUnwantedTextCodes','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','combatLog_Evasion_Icon','RegExp','combatLog_Result_Victory','enemyLoss','Game_Battler_useItem','Window_BattleLog_displayMiss','combatLog_BattleCmd_Name','Show_AntiDmgBarrier_TpDisperse','scale','combatLog_BattleStart_Icon','findSymbol','Window_PartyCommand_addCustomCommands','Game_Battler_onLifeStateEffect','Window_BattleLog_displayCurrentState','combatLog_Surprise_Icon','abs','BgFilename1','getCombatLog','startTurn','Game_Battler_removeState','424562zMsUxm','criticalToActor','3goizOp','CombatLogMenu_RectJS'];_0x5c18=function(){return _0x5bbd19;};return _0x5c18();}function Window_CombatLogHistory(){this['initialize'](...arguments);}Window_CombatLogHistory[_0x3bec14(0x328)]=Object['create'](Window_HorzCommand[_0x3bec14(0x328)]),Window_CombatLogHistory[_0x3bec14(0x328)][_0x3bec14(0x37a)]=Window_CombatLogHistory,Window_CombatLogHistory[_0x3bec14(0x328)][_0x3bec14(0x2ec)]=function(_0x3d0e52){const _0x13d116=_0x3bec14;Window_HorzCommand['prototype']['initialize'][_0x13d116(0x270)](this,_0x3d0e52);},Window_CombatLogHistory[_0x3bec14(0x328)][_0x3bec14(0x38f)]=function(){return $gameSystem['getTotalCombatLogs']();},Window_CombatLogHistory['prototype']['processCursorHomeEndTrigger']=function(){},Window_CombatLogHistory[_0x3bec14(0x328)]['cursorDown']=function(_0x22eefa){},Window_CombatLogHistory[_0x3bec14(0x328)][_0x3bec14(0x3a5)]=function(_0x19dbc0){},Window_CombatLogHistory[_0x3bec14(0x328)][_0x3bec14(0x1e2)]=function(){const _0x16c925=_0x3bec14;Window_HorzCommand[_0x16c925(0x328)]['update'][_0x16c925(0x270)](this),this['_logWindow']&&this[_0x16c925(0x342)]['setCombatLogIndex'](this[_0x16c925(0x2b1)]());},Window_CombatLogHistory['prototype'][_0x3bec14(0x2a1)]=function(_0x56987d){const _0x40c63a=_0x3bec14;this[_0x40c63a(0x342)]=_0x56987d;},Window_CombatLogHistory[_0x3bec14(0x328)][_0x3bec14(0x1ce)]=function(){const _0x2df752=_0x3bec14;let _0x32caa9=$gameSystem['getTotalCombatLogs']();for(let _0x3222f1=0x0;_0x3222f1<_0x32caa9;_0x3222f1++){let _0x31e218=_0x3222f1===0x0?TextManager['_combatLog_Latest']:TextManager[_0x2df752(0x2e4)],_0xb70c98=_0x31e218[_0x2df752(0x2ea)]($gameSystem['battleCount']()-_0x3222f1);this[_0x2df752(0x34c)](_0xb70c98,_0x2df752(0x31c),!![],_0x3222f1);}};function _0x133b(_0x3575e0,_0x51a65d){const _0x5c181d=_0x5c18();return _0x133b=function(_0x133bd9,_0x1ae8db){_0x133bd9=_0x133bd9-0x1cc;let _0x2bda33=_0x5c181d[_0x133bd9];return _0x2bda33;},_0x133b(_0x3575e0,_0x51a65d);}function Window_CombatLogDisplay(){const _0x4bbbad=_0x3bec14;this[_0x4bbbad(0x2ec)](...arguments);}Window_CombatLogDisplay[_0x3bec14(0x328)]=Object[_0x3bec14(0x34a)](Window_Command[_0x3bec14(0x328)]),Window_CombatLogDisplay[_0x3bec14(0x328)]['constructor']=Window_CombatLogDisplay,Window_CombatLogDisplay['BIGGER_LINE_HEIGHT']=![],Window_CombatLogDisplay[_0x3bec14(0x3b2)]=![],Window_CombatLogDisplay['HORZ_LINE_THICKNESS']=0x4,Window_CombatLogDisplay[_0x3bec14(0x26d)]=0.2,Window_CombatLogDisplay[_0x3bec14(0x1d6)]=1.5,Window_CombatLogDisplay['ACCESS_BUTTON']=VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2a8)]['General'][_0x3bec14(0x24b)]||'none',Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x2ec)]=function(_0x555498){const _0x196f94=_0x3bec14;Window_Command[_0x196f94(0x328)][_0x196f94(0x2ec)][_0x196f94(0x270)](this,_0x555498),this[_0x196f94(0x1e0)](),this['_requestRefresh']=![],SceneManager[_0x196f94(0x24e)]()&&(this[_0x196f94(0x2ca)]=0x0);},Window_CombatLogDisplay['prototype']['itemHeight']=function(){const _0x46cffb=_0x3bec14;let _0x3a6057=Window_Scrollable[_0x46cffb(0x328)][_0x46cffb(0x2df)][_0x46cffb(0x270)](this);return _0x3a6057+(Window_CombatLogDisplay[_0x46cffb(0x24f)]?0x8:0x0);},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x215)]=function(){const _0x51465a=_0x3bec14;return VisuMZ[_0x51465a(0x2e3)]['Settings'][_0x51465a(0x2e3)][_0x51465a(0x1de)];},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x286)]=function(){return!![];},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x3a4)]=function(_0xabab77){},Window_CombatLogDisplay['prototype'][_0x3bec14(0x360)]=function(){this['processCancel']();},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x240)]=function(){const _0x5200ad=_0x3bec14;this[_0x5200ad(0x302)]();},Window_CombatLogDisplay[_0x3bec14(0x328)]['processCursorMove']=function(){const _0xef9d95=_0x3bec14;SceneManager[_0xef9d95(0x24e)]()&&!this[_0xef9d95(0x250)]&&($gameSystem['isCombatLogHotKeyActive']()&&Window_CombatLogDisplay[_0xef9d95(0x2a0)]!==undefined&&(this[_0xef9d95(0x278)]()?(this['checkRefresh'](),this['open']()):this[_0xef9d95(0x2ed)]())),this['isOpen']()&&(Input[_0xef9d95(0x3a1)](_0xef9d95(0x32b))&&this[_0xef9d95(0x2b2)](Window_CombatLogDisplay[_0xef9d95(0x26d)]),Input['isPressed']('up')&&this['smoothScrollUp'](Window_CombatLogDisplay[_0xef9d95(0x26d)]),Input[_0xef9d95(0x3a1)](_0xef9d95(0x21e))&&this[_0xef9d95(0x2b2)](Window_CombatLogDisplay[_0xef9d95(0x1d6)]),Input[_0xef9d95(0x3a1)](_0xef9d95(0x255))&&this[_0xef9d95(0x367)](Window_CombatLogDisplay[_0xef9d95(0x1d6)]),Input['isTriggered'](_0xef9d95(0x2e7))&&this[_0xef9d95(0x1d8)](0x0,0x0),Input[_0xef9d95(0x2d4)](_0xef9d95(0x329))&&this[_0xef9d95(0x1d8)](0x0,this[_0xef9d95(0x39d)]()));},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x278)]=function(){const _0x2af88a=_0x3bec14;if($gameMessage['isBusy']())return![];if(BattleManager[_0x2af88a(0x1e4)])return![];if(Imported[_0x2af88a(0x333)]){if(SceneManager[_0x2af88a(0x2a4)][_0x2af88a(0x238)]())return![];}if(Imported[_0x2af88a(0x220)]){if(SceneManager[_0x2af88a(0x2a4)][_0x2af88a(0x323)]())return![];}return Input[_0x2af88a(0x3a1)](Window_CombatLogDisplay[_0x2af88a(0x2a0)]);},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x2ff)]=function(_0x44c2bb){const _0x2285e8=_0x3bec14;if(this['_combatLogIndex']===_0x44c2bb)return;this['_combatLogIndex']=_0x44c2bb,this['refresh'](),this[_0x2285e8(0x289)](0x0,0x0);},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x1ce)]=function(){const _0x41e1e8=_0x3bec14;if(this['_combatLogIndex']===undefined)return;const _0x44b07a=$gameSystem[_0x41e1e8(0x202)](this['_combatLogIndex']);for(const _0x450d3b of _0x44b07a){if(!_0x450d3b)continue;this[_0x41e1e8(0x34c)](_0x450d3b,'combatLog');}const _0x37d390=this[_0x41e1e8(0x3a8)][this['_list']['length']-0x1];_0x37d390&&_0x37d390['name']!=='=====HORZLINE====='&&this[_0x41e1e8(0x34c)](_0x41e1e8(0x3b5),_0x41e1e8(0x3bd));},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x2dd)]=function(_0x27a575){const _0x6c0b39=_0x3bec14;if(Window_CombatLogDisplay['SHOW_LINE_BACKGROUND']){const _0x2ae384=this['itemRect'](_0x27a575);this[_0x6c0b39(0x2c1)](_0x2ae384);}},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x382)]=function(_0x4a9e64){const _0x424d62=_0x3bec14,_0x2c34a9=this['itemLineRect'](_0x4a9e64),_0x1e45bb=this[_0x424d62(0x28e)](_0x4a9e64);_0x1e45bb===_0x424d62(0x3b5)?this['drawHorzLine'](_0x2c34a9):this[_0x424d62(0x234)](_0x1e45bb,_0x2c34a9['x'],_0x2c34a9['y'],_0x2c34a9[_0x424d62(0x236)]);},Window_CombatLogDisplay['prototype'][_0x3bec14(0x1d1)]=function(_0x286ba9){const _0x383bc3=_0x3bec14;this[_0x383bc3(0x22d)]();const _0x26755c=Window_CombatLogDisplay['HORZ_LINE_THICKNESS'],_0x139faf=_0x286ba9['y']+(_0x286ba9[_0x383bc3(0x22e)]-_0x26755c)/0x2;this['drawRect'](_0x286ba9['x'],_0x139faf,_0x286ba9[_0x383bc3(0x236)],_0x26755c);},Window_CombatLogDisplay['prototype'][_0x3bec14(0x21d)]=function(){this['_requestRefresh']=!![];},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x20b)]=function(){const _0x26df6e=_0x3bec14;this[_0x26df6e(0x339)]&&this[_0x26df6e(0x33e)]();},Window_CombatLogDisplay['prototype'][_0x3bec14(0x33e)]=function(){const _0x405470=_0x3bec14;this[_0x405470(0x339)]=![],this[_0x405470(0x3bc)]=0x0,this['refresh'](),this[_0x405470(0x289)](0x0,this['maxScrollY']());},Window_CombatLogDisplay['prototype'][_0x3bec14(0x1cd)]=function(_0x4e64e9){const _0x4c612e=_0x3bec14;this[_0x4c612e(0x2bb)]=_0x4e64e9;},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x31f)]=function(){const _0x1eeca5=_0x3bec14;return this[_0x1eeca5(0x2bb)];},Window_CombatLogDisplay[_0x3bec14(0x328)][_0x3bec14(0x26a)]=function(){const _0x5ce455=_0x3bec14;this[_0x5ce455(0x282)]=new Sprite(),this['_dimmerSprite'][_0x5ce455(0x1e9)]=new Bitmap(0x0,0x0),this[_0x5ce455(0x282)]['x']=-0x4,this['addChildToBack'](this[_0x5ce455(0x282)]);},Window_CombatLogDisplay['prototype'][_0x3bec14(0x226)]=function(){const _0x41fcf7=_0x3bec14;if(this[_0x41fcf7(0x282)]){const _0xba44ba=this['_dimmerSprite'][_0x41fcf7(0x1e9)],_0x4bcab4=this['width']>0x0?this[_0x41fcf7(0x236)]+0x8:0x0,_0x3d01b2=this[_0x41fcf7(0x22e)],_0x579fff=this[_0x41fcf7(0x2de)],_0x8db35b=ColorManager['dimColor1'](),_0x523d56=ColorManager[_0x41fcf7(0x397)]();_0xba44ba['resize'](_0x4bcab4,_0x3d01b2),_0xba44ba[_0x41fcf7(0x312)](0x0,0x0,_0x4bcab4,_0x579fff,_0x523d56,_0x8db35b,!![]),_0xba44ba[_0x41fcf7(0x370)](0x0,_0x579fff,_0x4bcab4,_0x3d01b2-_0x579fff*0x2,_0x8db35b),_0xba44ba[_0x41fcf7(0x312)](0x0,_0x3d01b2-_0x579fff,_0x4bcab4,_0x579fff,_0x8db35b,_0x523d56,!![]),this['_dimmerSprite'][_0x41fcf7(0x299)](0x0,0x0,_0x4bcab4,_0x3d01b2),$gameParty[_0x41fcf7(0x20e)]()&&(this[_0x41fcf7(0x282)][_0x41fcf7(0x1f9)]['x']=0x64,this[_0x41fcf7(0x282)][_0x41fcf7(0x2fc)]['x']=0.5);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x241)]=Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x34f)],Game_Battler['prototype'][_0x3bec14(0x34f)]=function(){const _0x1d92c5=_0x3bec14;VisuMZ[_0x1d92c5(0x2e3)][_0x1d92c5(0x241)][_0x1d92c5(0x270)](this);if(!SceneManager[_0x1d92c5(0x24e)]())return;const _0xefffbb=VisuMZ[_0x1d92c5(0x2e3)][_0x1d92c5(0x2a8)][_0x1d92c5(0x2cd)];if(!_0xefffbb)return;if(!_0xefffbb[_0x1d92c5(0x26e)])return;const _0x1d4540=_0xefffbb[_0x1d92c5(0x303)];if(_0x1d4540){let _0x35665b=_0x1d4540[_0x1d92c5(0x2ea)](this['combatLogName']()),_0x1824c6=_0xefffbb[_0x1d92c5(0x233)];$gameSystem[_0x1d92c5(0x38b)](_0x35665b,_0x1824c6);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x36f)]=Game_Battler[_0x3bec14(0x328)]['onCtbOrderChange'],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x301)]=function(_0x4a2f31){const _0x12a98c=_0x3bec14;VisuMZ[_0x12a98c(0x2e3)]['Game_Battler_onCtbOrderChange']['call'](this,_0x4a2f31);if(_0x4a2f31===0x0)return;if(!SceneManager[_0x12a98c(0x24e)]())return;const _0x15a5d=VisuMZ[_0x12a98c(0x2e3)]['Settings']['Compatibility'];if(!_0x15a5d)return;if(!_0x15a5d[_0x12a98c(0x296)])return;const _0x407c3d=_0x15a5d['TextBattleSysCtbOrderChange'];if(_0x407c3d){let _0x66bb1e=_0x407c3d[_0x12a98c(0x2ea)](this[_0x12a98c(0x355)]()),_0x3e33dc=_0x15a5d[_0x12a98c(0x2cc)];$gameSystem['addTextToCombatLog'](_0x66bb1e,_0x3e33dc);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x219)]=Game_Battler[_0x3bec14(0x328)]['stbGainInstant'],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x2c2)]=function(_0x480f24){const _0x52c366=_0x3bec14;VisuMZ['CombatLog'][_0x52c366(0x219)][_0x52c366(0x270)](this,_0x480f24);if(_0x480f24===0x0)return;if(!SceneManager[_0x52c366(0x24e)]())return;const _0x504b35=VisuMZ[_0x52c366(0x2e3)]['Settings']['Compatibility'];if(!_0x504b35)return;if(!_0x504b35['ShowBattleSysStbInstant'])return;const _0x180955=_0x504b35[_0x52c366(0x3be)];if(_0x180955){let _0x366ed3=_0x180955[_0x52c366(0x2ea)](this[_0x52c366(0x355)]()),_0x557c80=_0x504b35[_0x52c366(0x38d)];$gameSystem[_0x52c366(0x38b)](_0x366ed3,_0x557c80);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x295)]=Game_Battler['prototype'][_0x3bec14(0x33a)],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x33a)]=function(_0x14c4ed){const _0x44b866=_0x3bec14,_0x5ef496=VisuMZ['CombatLog'][_0x44b866(0x2a8)][_0x44b866(0x2cd)];if(_0x5ef496&&_0x5ef496[_0x44b866(0x330)]&&SceneManager[_0x44b866(0x24e)]()){let _0x19d13e=_0x5ef496['Text_AntiDmgBarrier_Nullify'];if(_0x19d13e){let _0x324244=_0x19d13e[_0x44b866(0x2ea)](this[_0x44b866(0x355)](),_0x14c4ed['name']),_0x3f633f=_0x14c4ed['iconIndex'];$gameSystem[_0x44b866(0x38b)](_0x324244,_0x3f633f);}}VisuMZ[_0x44b866(0x2e3)][_0x44b866(0x295)][_0x44b866(0x270)](this,_0x14c4ed);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x275)]=Game_Battler[_0x3bec14(0x328)]['onAntiDamageCancelBarrier'],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x2b8)]=function(_0xdbf2d7){const _0x4a5502=_0x3bec14,_0x151a8f=VisuMZ['CombatLog']['Settings'][_0x4a5502(0x2cd)];if(_0x151a8f&&_0x151a8f[_0x4a5502(0x396)]&&SceneManager[_0x4a5502(0x24e)]()){let _0x12d607=_0x151a8f[_0x4a5502(0x325)];if(_0x12d607){let _0x593246=_0x12d607[_0x4a5502(0x2ea)](this[_0x4a5502(0x355)](),_0xdbf2d7[_0x4a5502(0x2ce)]),_0x12fa4b=_0xdbf2d7['iconIndex'];$gameSystem[_0x4a5502(0x38b)](_0x593246,_0x12fa4b);}}VisuMZ[_0x4a5502(0x2e3)]['Game_Battler_onAntiDamageCancelBarrier']['call'](this,_0xdbf2d7);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x29e)]=Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x290)],Game_BattlerBase[_0x3bec14(0x328)][_0x3bec14(0x290)]=function(_0x4e5c2f){const _0x1543ed=_0x3bec14,_0x29450b=VisuMZ[_0x1543ed(0x2e3)][_0x1543ed(0x2a8)]['Compatibility'];if(_0x29450b&&_0x29450b[_0x1543ed(0x1d7)]&&SceneManager['isSceneBattle']()){let _0x32d45c=_0x29450b[_0x1543ed(0x2cf)];if(_0x32d45c){let _0x34a118=_0x32d45c['format'](this[_0x1543ed(0x355)](),$dataStates[_0x4e5c2f][_0x1543ed(0x2ce)]),_0x4a5b39=$dataStates[_0x4e5c2f][_0x1543ed(0x298)];$gameSystem[_0x1543ed(0x38b)](_0x34a118,_0x4a5b39);}}return VisuMZ[_0x1543ed(0x2e3)]['Game_BattlerBase_getAntiDamageBarrierReduction'][_0x1543ed(0x270)](this,_0x4e5c2f);},VisuMZ['CombatLog'][_0x3bec14(0x1e7)]=Game_Battler['prototype']['displayAbsorptionBarrierPopup'],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x35d)]=function(_0xfd7bb8,_0x2564a8){const _0x3ee823=_0x3bec14;VisuMZ[_0x3ee823(0x2e3)][_0x3ee823(0x1e7)]['call'](this,_0xfd7bb8,_0x2564a8);if(_0xfd7bb8===0x0)return;const _0x5441b4=VisuMZ[_0x3ee823(0x2e3)][_0x3ee823(0x2a8)][_0x3ee823(0x2cd)];if(_0x5441b4&&_0x5441b4[_0x3ee823(0x256)]&&SceneManager[_0x3ee823(0x24e)]()){let _0xe02c87=_0x5441b4[_0x3ee823(0x294)];if(_0xe02c87){let _0x3dd11f=_0xe02c87[_0x3ee823(0x2ea)](this['combatLogName'](),_0x2564a8[_0x3ee823(0x2ce)],_0xfd7bb8),_0x479a32=_0x2564a8[_0x3ee823(0x298)];$gameSystem[_0x3ee823(0x38b)](_0x3dd11f,_0x479a32);}}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x24c)]=Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x2f8)],Game_Battler[_0x3bec14(0x328)]['onAntiDamageMpBarrier']=function(_0x501627){const _0x502099=_0x3bec14,_0x228ec9=VisuMZ[_0x502099(0x2e3)][_0x502099(0x2a8)]['Compatibility'];if(_0x228ec9&&_0x228ec9[_0x502099(0x3b3)]&&SceneManager[_0x502099(0x24e)]()){let _0x29bcd0=_0x228ec9['Text_AntiDmgBarrier_MpDisperse'];if(_0x29bcd0){let _0x2baced=_0x29bcd0[_0x502099(0x2ea)](this[_0x502099(0x355)](),_0x501627[_0x502099(0x2ce)],TextManager['mp']),_0x50243a=_0x501627[_0x502099(0x298)];$gameSystem[_0x502099(0x38b)](_0x2baced,_0x50243a);}}VisuMZ['CombatLog'][_0x502099(0x24c)][_0x502099(0x270)](this,_0x501627);},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x2d0)]=Game_Battler[_0x3bec14(0x328)]['onAntiDamageTpBarrier'],Game_Battler[_0x3bec14(0x328)][_0x3bec14(0x216)]=function(_0x350740){const _0x1ffbaf=_0x3bec14,_0x42a4e8=VisuMZ[_0x1ffbaf(0x2e3)][_0x1ffbaf(0x2a8)][_0x1ffbaf(0x2cd)];if(_0x42a4e8&&_0x42a4e8[_0x1ffbaf(0x1f8)]&&SceneManager[_0x1ffbaf(0x24e)]()){let _0x5b167c=_0x42a4e8[_0x1ffbaf(0x347)];if(_0x5b167c){let _0x1a0ee7=_0x5b167c[_0x1ffbaf(0x2ea)](this[_0x1ffbaf(0x355)](),_0x350740[_0x1ffbaf(0x2ce)],TextManager['tp']),_0x366e2a=_0x350740[_0x1ffbaf(0x298)];$gameSystem[_0x1ffbaf(0x38b)](_0x1a0ee7,_0x366e2a);}}VisuMZ[_0x1ffbaf(0x2e3)][_0x1ffbaf(0x2d0)]['call'](this,_0x350740);},VisuMZ['CombatLog']['Game_Battler_onLifeStateEffect']=Game_Battler['prototype'][_0x3bec14(0x25f)],Game_Battler[_0x3bec14(0x328)]['onLifeStateEffect']=function(_0x58b3a8){const _0x246c35=_0x3bec14;VisuMZ[_0x246c35(0x2e3)][_0x246c35(0x1fd)][_0x246c35(0x270)](this,_0x58b3a8);if(!SceneManager[_0x246c35(0x24e)]())return;if(!_0x58b3a8)return;const _0x3eb180=VisuMZ[_0x246c35(0x2e3)]['Settings'][_0x246c35(0x2cd)];if(!_0x3eb180)return;if(!_0x3eb180[_0x246c35(0x27a)[_0x246c35(0x2ea)](_0x58b3a8)])return;let _0xee2fa3=_0x3eb180[_0x246c35(0x252)[_0x246c35(0x2ea)](_0x58b3a8)];if(_0xee2fa3){let _0x3e6aa2=_0xee2fa3[_0x246c35(0x2ea)](this[_0x246c35(0x355)]()),_0x494b85=_0x3eb180['Icon_LifeStateEffects_%1'[_0x246c35(0x2ea)](_0x58b3a8)];$gameSystem[_0x246c35(0x38b)](_0x3e6aa2,_0x494b85);}},VisuMZ[_0x3bec14(0x2e3)][_0x3bec14(0x248)]=Window_BattleLog[_0x3bec14(0x328)][_0x3bec14(0x246)],Window_BattleLog[_0x3bec14(0x328)]['addStealText']=function(_0x4864ea){const _0x2e8676=_0x3bec14;VisuMZ[_0x2e8676(0x2e3)][_0x2e8676(0x248)][_0x2e8676(0x270)](this,_0x4864ea);if(_0x4864ea==='')return;const _0x2595ca=VisuMZ[_0x2e8676(0x2e3)][_0x2e8676(0x2a8)]['Compatibility'];if(_0x2595ca&&_0x2595ca[_0x2e8676(0x2d7)]&&SceneManager[_0x2e8676(0x24e)]()){let _0x52bff5=_0x2595ca[_0x2e8676(0x315)];$gameSystem[_0x2e8676(0x38b)](_0x4864ea,_0x52bff5);}};