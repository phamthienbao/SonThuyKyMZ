//=============================================================================
// VisuStella MZ - Patch Notes
// VisuMZ_4_PatchNotes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_PatchNotes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PatchNotes = VisuMZ.PatchNotes || {};
VisuMZ.PatchNotes.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [PatchNotes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Patch_Notes_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin grants your players the ability to access Patch Notes from the
 * game itself. Being able to tell your players what you've changed from inside
 * the game can make all the difference in the player experience. This plugin
 * lets players access Patch Notes from the title screen, the main menu, or
 * from a Plugin Command ran inside the game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds "Patch Notes" to the Title and/or Main Menu command windows.
 * * Create any number of patch notes listings to display various patches in.
 * * Patch Note listings can use text codes to allow for lots of customization.
 * * Normal scrolling and fast scrolling can be done with the keyboard.
 * * Mouse scrolling is also possible via touch controls.
 * * Access the "Patch Notes" page from the game via Plugin Command.
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Scene Plugin Commands ===
 * 
 * ---
 *
 * Scene: Open Patch Notes
 * - Opens Patch Notes.
 * - CANNOT be used inside of battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Patch Notes in Menu?
 * - Enables/disables Patch Notes inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Patch Notes inside the main menu.
 *
 * ---
 *
 * System: Show Patch Notes in Menu?
 * - Shows/hides Patch Notes inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Patch Notes inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Patch notes displayed in the menu.
 *
 * ---
 *
 * Patch Notes
 * 
 *   Title:
 *   - The name of this patch note listed.
 *   - Text codes allowed.
 * 
 *   Credits Text:
 *   - Text displayed for this patch note listing.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Patch Notes' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Patch Notes' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Patch Notes' option to the Main Menu by default?
 * 
 *   Show in Title Command?:
 *   - Add 'Patch Notes' the Title Command Window?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_PatchNotes.
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
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * Button Assist Window
 * 
 *   Slow Scroll:
 *   - Text used for slow scrolling.
 * 
 *   Fast Scroll:
 *   - Text used for fast scrolling.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you adjust the windows displayed for this plugin.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Display Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *     Buffers > Top Buffer:
 *     Buffers > Bottom Buffer:
 *     - How many lines should the top/bottom be buffered from?
 * 
 *   Center Width:
 *   - What's the center width for the text?
 *   - Use 0 for the full window width.
 * 
 *     Scrolling > Slow > Scroll Speed:
 *     - What speed will Up/Down scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Scrolling > Slow > Sound Frequency:
 *     - How frequent will Up/Down scrolling make sounds?
 *     - Lower is quicker. Higher is later.
 * 
 *     Scrolling > Fast > Scroll Speed:
 *     - What speed will PageUp/PageDn scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Scrolling > Fast > Sound Frequency:
 *     - How frequent will PageUp/PageDn scrolling make sounds?
 *     - Lower is quicker. Higher is later.
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
 * Version 1.01: February 16, 2023
 * * Feature Update!
 * ** Added arrows to the windows to indicate scrollability. Update by Irina.
 *
 * Version 1.00 Official Release Date: December 21, 2022
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
 * @command SceneOpenPatchNotes
 * @text Scene: Open Patch Notes
 * @desc Opens Patch Notes.
 * CANNOT be used inside of battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnablePatchNotesMenu
 * @text System: Enable PatchNotes in Menu?
 * @desc Enables/disables PatchNotes menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables PatchNotes menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowPatchNotesMenu
 * @text System: Show PatchNotes in Menu?
 * @desc Shows/hides PatchNotes menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides PatchNotes menu inside the main menu.
 * @default true
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
 * @param PatchNotes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param PatchNotes:arraystruct
 * @text Patch Notes
 * @type struct<PatchNote>[]
 * @desc Patch notes displayed in the menu.
 * @default ["{\"Title:str\":\"\\\\I[164]【2023.01.01】 Happy New Year\",\"Text:json\":\"\\\"\\\\\\\\{Happy New Year Update\\\\\\\\}\\\\n\\\\n\\\\\\\\c[5]Gameplay Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[6]Balance Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[24]Buffs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[2]Nerfs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[27]Bug Fixes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[4]Additional Notes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\"\"}","{\"Title:str\":\"\\\\I[163]【2022.12.31】 New Year's Eve\",\"Text:json\":\"\\\"\\\\\\\\{New Year's Eve Update\\\\\\\\}\\\\n\\\\n\\\\\\\\c[5]Gameplay Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[6]Balance Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[24]Buffs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[2]Nerfs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[27]Bug Fixes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[4]Additional Notes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\"\"}","{\"Title:str\":\"\\\\I[162]【2022.12.01】 Sample Patch Notes\",\"Text:json\":\"\\\"\\\\\\\\{Sample Patch Notes Update\\\\\\\\}\\\\n\\\\n\\\\\\\\c[5]Gameplay Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[6]Balance Changes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[24]Buffs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[2]Nerfs\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[27]Bug Fixes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n\\\\n\\\\\\\\c[4]Additional Notes\\\\\\\\c[0]\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\\n•Insert text here\\\"\"}"]
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Patch Notes.
 * @default {"Name:str":"Patch Notes","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true","ShowTitleCommand:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Patch Notes.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"ButtonAssist":"","SlowScroll:str":"Scroll","FastScroll:str":"Fast Scroll"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"CommandWindow":"","CommandWindow_BgType:num":"0","CommandWindow_RectJS:func":"\"const fw = Math.max(720, Math.floor(Graphics.boxWidth * 0.75));\\n\\nconst ww = Math.max(fw - 300, 480);\\nconst wh = this.calcWindowHeight(10, true);\\nconst wx = Math.floor((Graphics.boxWidth - ww) / 2);\\nconst wy = Math.floor((Graphics.boxHeight - wh) / 2);\\n\\nreturn new Rectangle(wx, wy, ww, wh);\"","DisplayWindow":"","DisplayWindow_BgType:num":"0","DisplayWindow_Buffers":"","DisplayWindow_BufferTop:num":"1","DisplayWindow_BufferBottom:num":"1","DisplayWindow_CenterWidth:num":"816","Scrolling":"","Slow":"","SlowScrollSpeed:num":"8","SlowSoundFreq:num":"8","Fast":"","FastScrollSpeed:num":"32","FastSoundFreq:num":"4","DisplayWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight();\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\n\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * PatchNote Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PatchNote:
 *
 * @param Title:str
 * @text Patch Note Title
 * @desc The name of this patch note listed.
 * Text codes allowed.
 * @default \I[83]【YYYY.MM.DD】 Patch Notes
 *
 * @param Text:json
 * @text Credits Text
 * @type note
 * @desc Text displayed for this patch note listing.
 * Text codes allowed.
 * @default "\\c[5]Gameplay Changes\\c[0]\n\n\\c[5]Gameplay Changes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[6]Balance Changes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[24]Buffs\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[2]Nerfs\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[27]Bug Fixes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here\n\n\\c[4]Additional Notes\\c[0]\n•Insert text here\n•Insert text here\n•Insert text here\n•Insert text here"
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Patch Notes' option in the Main Menu.
 * @default Patch Notes
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Patch Notes' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Patch Notes' option to the Main Menu by default?
 * @default true
 *
 * @param ShowTitleCommand:eval
 * @text Show in Title Command?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Patch Notes' the Title Command Window?
 * @default true
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
 * @require 1
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @require 1
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param SlowScroll:str
 * @text Slow Scroll
 * @parent ButtonAssist
 * @desc Text used for slow scrolling.
 * @default Scroll
 *
 * @param FastScroll:str
 * @text Fast Scroll
 * @parent ButtonAssist
 * @desc Text used for fast scrolling.
 * @default Fast Scroll
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CommandWindow
 * @text List Window
 *
 * @param CommandWindow_BgType:num
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
 * @param CommandWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const fw = Math.max(720, Math.floor(Graphics.boxWidth * 0.75));\n\nconst ww = Math.max(fw - 300, 480);\nconst wh = this.calcWindowHeight(10, true);\nconst wx = Math.floor((Graphics.boxWidth - ww) / 2);\nconst wy = Math.floor((Graphics.boxHeight - wh) / 2);\n\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DisplayWindow
 * @text Display Window
 *
 * @param DisplayWindow_BgType:num
 * @text Background Type
 * @parent DisplayWindow
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
 * @param DisplayWindow_Buffers
 * @text Buffers
 * @parent DisplayWindow
 *
 * @param DisplayWindow_BufferTop:num
 * @text Top Buffer
 * @parent DisplayWindow_Buffers
 * @type number
 * @desc How many lines should the top be buffered from?
 * @default 1
 *
 * @param DisplayWindow_BufferBottom:num
 * @text Bottom Buffer
 * @parent DisplayWindow_Buffers
 * @type number
 * @desc How many lines should the bottom be buffered from?
 * @default 1
 *
 * @param DisplayWindow_CenterWidth:num
 * @text Center Width
 * @parent DisplayWindow
 * @type number
 * @desc What's the center width for the text?
 * Use 0 for the full window width.
 * @default 816
 *
 * @param Scrolling
 * @parent DisplayWindow
 *
 * @param Slow
 * @parent Scrolling
 *
 * @param SlowScrollSpeed:num
 * @text Scroll Speed
 * @parent Slow
 * @type number
 * @min 1
 * @desc What speed will Up/Down scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 8
 *
 * @param SlowSoundFreq:num
 * @text Sound Frequency
 * @parent Slow
 * @type number
 * @min 1
 * @desc How frequent will Up/Down scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 8
 *
 * @param Fast
 * @parent Scrolling
 *
 * @param FastScrollSpeed:num
 * @text Scroll Speed
 * @parent Fast
 * @type number
 * @min 1
 * @desc What speed will PageUp/PageDn scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 32
 *
 * @param FastSoundFreq:num
 * @text Sound Frequency
 * @parent Fast
 * @type number
 * @min 1
 * @desc How frequent will PageUp/PageDn scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 4
 *
 * @param DisplayWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DisplayWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight();\nconst wx = 0;\nconst wy = this.mainAreaTop();\n\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

function _0x1843(){const _0x2e6057=['_scene','useDigitGroupingEx','bitmap','buYdE','Scene_Title_createCommandWindow','processSlowScroll','dgKLS','91198eYXEIP','initialize','createCommandWindow','DisplayWindow_BufferTop','createCustomBackgroundImages','isPressed','downArrowVisible','FUNC','commandName','Text','height','splice','getBackgroundOpacity','addPatchNotesCommandAutomatically','OVUTc','show','includes','calcWindowHeight','CENTER_WIDTH','addPatchNotesCommand','prototype','patchNotes','origin','pagedown','FCDQu','options','_text','createContents','playCursorSound','Settings','addChild','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','HnYtJ','PATCHNOTES_ADD_COMMAND','vTxQa','onCommandPatchNotes','6297316yEPXfb','CqZPc','PatchNotesScroll','SceneOpenPatchNotes','popScene','_allTextHeight','setBackgroundType','processFastScroll','xWXhX','frameCount','active','updateOrigin','ShowMainMenu','isPatchNotesCommandEnabled','match','floor','ShowTitleCommand','buttonAssistKey4','ARRAYJSON','down','_backSprite2','MainMenu','ARRAYFUNC','TOP_LINE_BUFFER','wsDmH','name','commandWindowRect','parse','displayWindowRect','Show','close','drawMessageText','Window','createBackground','create','adjustSprite','useDigitGrouping','lineHeight','DisplayWindow_BufferBottom','pop','resetFontSettings','filter','SLOW_SCROLL_SPEED','shown','isAutoColorAffected','boxHeight','zrrWJ','48087FTyHCp','trim','ARRAYSTR','DisplayWindow_RectJS','updateArrows','push','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','XMHvS','upArrowVisible','registerCommand','NUM','drawTextEx','Enable','lmEiF','setHandler','isMainMenuPatchNotesEnabled','processCursorMove','clamp','FAST_SOUND_FREQUENCY','zVUJY','mainAreaHeight','Window_MenuCommand_addOriginalCommands','_commandWindow','isSceneBattle','Window_TitleCommand_makeCommandList','1440900LIjSLE','setScrollAccel','ARRAYSTRUCT','makeCommandList','constructor','mWYYi','drawAllText','STR','buttonAssistKey1','findSymbol','toUpperCase','format','smoothScrollBy','addWindow','call','createDisplayWindow','bind','Cjxrm','34lPMrgl','map','textSizeEx','cancel','5780fANfwu','sXTwu','max','BG_TYPE','CommandWindow_BgType','SlowScroll','ConvertParams','setMainMenuPatchNotesVisible','Name','CMNeZ','calculateTextHeight','buttonAssistText1','8Nkahtb','STRUCT','addCommand','thRqX','scrollToTop','enabled','Game_System_initialize','Vocab','Scene_Menu_createCommandWindow','contentsHeight','buttonAssistKey3','loadTitle1','JSON','2562889YenGDB','BgFilename1','commandPatchNotes','refresh','innerHeight','getInputMultiButtonStrings','_displayWindow','Title','4824756XCnTjO','innerWidth','width','FastSoundFreq','EVAL','PatchNotesFastScroll','exit','LIST','onDisplayCancel','_PatchNotes_MainMenu','_list','deactivate','FAST_SCROLL_SPEED','boxWidth','473160rDyuGt','setText','PatchNotesMenuCommand','BgSettings','_backSprite1','parameters','changePaintOpacity','resetTextColor','isCommandEnabled','activate','hide','VisuMZ_1_MainMenuCore','SLOW_SOUND_FREQUENCY','resetWordWrap','initPatchNotesMainMenu','DisplayWindow_BgType','SlowSoundFreq','addLoadListener','version','addOriginalCommands','isMainMenuPatchNotesVisible','VisuMZ_1_MessageCore','BOTTOM_LINE_BUFFER','PatchNotes','sdQbI','CommandWindow_RectJS'];_0x1843=function(){return _0x2e6057;};return _0x1843();}const _0x1bb6bc=_0x4b65;(function(_0x452da9,_0x1d28bb){const _0x4b57fe=_0x4b65,_0x3a548e=_0x452da9();while(!![]){try{const _0x5c1b5b=-parseInt(_0x4b57fe(0x202))/0x1*(-parseInt(_0x4b57fe(0x1ae))/0x2)+parseInt(_0x4b57fe(0x1d3))/0x3+parseInt(_0x4b57fe(0x226))/0x4+-parseInt(_0x4b57fe(0x1e1))/0x5+-parseInt(_0x4b57fe(0x19c))/0x6+parseInt(_0x4b57fe(0x1cb))/0x7*(-parseInt(_0x4b57fe(0x1be))/0x8)+parseInt(_0x4b57fe(0x255))/0x9*(-parseInt(_0x4b57fe(0x1b2))/0xa);if(_0x5c1b5b===_0x1d28bb)break;else _0x3a548e['push'](_0x3a548e['shift']());}catch(_0x576d54){_0x3a548e['push'](_0x3a548e['shift']());}}}(_0x1843,0xe66a8));var label=_0x1bb6bc(0x1f8),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1bb6bc(0x24f)](function(_0x3f005a){const _0xce331d=_0x1bb6bc;return _0x3f005a['status']&&_0x3f005a['description'][_0xce331d(0x212)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1bb6bc(0x21f)]||{},VisuMZ[_0x1bb6bc(0x1b8)]=function(_0x252686,_0x1a4ef9){const _0x13e0d2=_0x1bb6bc;for(const _0x42a470 in _0x1a4ef9){if('HNbSN'!=='USvKN'){if(_0x42a470[_0x13e0d2(0x234)](/(.*):(.*)/i)){const _0x2faabd=String(RegExp['$1']),_0x2caa4b=String(RegExp['$2'])[_0x13e0d2(0x1a6)]()[_0x13e0d2(0x256)]();let _0x477482,_0x5e112c,_0x4bf434;switch(_0x2caa4b){case _0x13e0d2(0x18d):_0x477482=_0x1a4ef9[_0x42a470]!==''?Number(_0x1a4ef9[_0x42a470]):0x0;break;case'ARRAYNUM':_0x5e112c=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):[],_0x477482=_0x5e112c[_0x13e0d2(0x1af)](_0x422c7a=>Number(_0x422c7a));break;case _0x13e0d2(0x1d7):_0x477482=_0x1a4ef9[_0x42a470]!==''?eval(_0x1a4ef9[_0x42a470]):null;break;case'ARRAYEVAL':_0x5e112c=_0x1a4ef9[_0x42a470]!==''?JSON['parse'](_0x1a4ef9[_0x42a470]):[],_0x477482=_0x5e112c['map'](_0x1731f1=>eval(_0x1731f1));break;case _0x13e0d2(0x1ca):_0x477482=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):'';break;case _0x13e0d2(0x238):_0x5e112c=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):[],_0x477482=_0x5e112c[_0x13e0d2(0x1af)](_0x38026d=>JSON[_0x13e0d2(0x241)](_0x38026d));break;case _0x13e0d2(0x209):_0x477482=_0x1a4ef9[_0x42a470]!==''?new Function(JSON['parse'](_0x1a4ef9[_0x42a470])):new Function('return\x200');break;case _0x13e0d2(0x23c):_0x5e112c=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):[],_0x477482=_0x5e112c[_0x13e0d2(0x1af)](_0x1c1151=>new Function(JSON['parse'](_0x1c1151)));break;case _0x13e0d2(0x1a3):_0x477482=_0x1a4ef9[_0x42a470]!==''?String(_0x1a4ef9[_0x42a470]):'';break;case _0x13e0d2(0x257):_0x5e112c=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):[],_0x477482=_0x5e112c[_0x13e0d2(0x1af)](_0x3ea410=>String(_0x3ea410));break;case _0x13e0d2(0x1bf):_0x4bf434=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):{},_0x477482=VisuMZ[_0x13e0d2(0x1b8)]({},_0x4bf434);break;case _0x13e0d2(0x19e):_0x5e112c=_0x1a4ef9[_0x42a470]!==''?JSON[_0x13e0d2(0x241)](_0x1a4ef9[_0x42a470]):[],_0x477482=_0x5e112c['map'](_0x22882e=>VisuMZ[_0x13e0d2(0x1b8)]({},JSON[_0x13e0d2(0x241)](_0x22882e)));break;default:continue;}_0x252686[_0x2faabd]=_0x477482;}}else this['_commandWindow'][_0x13e0d2(0x211)](),this[_0x13e0d2(0x199)]['activate'](),this[_0x13e0d2(0x1d1)][_0x13e0d2(0x1eb)](),this[_0x13e0d2(0x1d1)][_0x13e0d2(0x1de)]();}return _0x252686;},(_0xab086b=>{const _0x49b101=_0x1bb6bc,_0x752e4d=_0xab086b[_0x49b101(0x23f)];for(const _0x243bc4 of dependencies){if(_0x49b101(0x224)===_0x49b101(0x224)){if(!Imported[_0x243bc4]){alert(_0x49b101(0x221)['format'](_0x752e4d,_0x243bc4)),SceneManager[_0x49b101(0x1d9)]();break;}}else{if(this[_0x49b101(0x1dc)]===_0x21bb4d)this[_0x49b101(0x1ef)]();return this[_0x49b101(0x1dc)][_0x49b101(0x1c3)];}}const _0x1194f1=_0xab086b['description'];if(_0x1194f1[_0x49b101(0x234)](/\[Version[ ](.*?)\]/i)){if(_0x49b101(0x1b3)!==_0x49b101(0x1b3)){const _0x180836=this[_0x49b101(0x242)](),_0x4f5c54=new _0x58e1c3(_0x180836);_0x4f5c54[_0x49b101(0x1eb)](),_0x4f5c54[_0x49b101(0x1de)](),_0x4f5c54[_0x49b101(0x191)]('cancel',this[_0x49b101(0x1db)][_0x49b101(0x1ac)](this)),this['addWindow'](_0x4f5c54),this[_0x49b101(0x1d1)]=_0x4f5c54,_0x4f5c54[_0x49b101(0x22c)](_0x2b2622[_0x49b101(0x1b5)]);}else{const _0x3d4feb=Number(RegExp['$1']);if(_0x3d4feb!==VisuMZ[label][_0x49b101(0x1f3)]){if(_0x49b101(0x222)!==_0x49b101(0x227))alert(_0x49b101(0x25b)[_0x49b101(0x1a7)](_0x752e4d,_0x3d4feb)),SceneManager[_0x49b101(0x1d9)]();else return _0x173916[_0x49b101(0x192)]();}}}if(_0x1194f1[_0x49b101(0x234)](/\[Tier[ ](\d+)\]/i)){const _0x51758e=Number(RegExp['$1']);if(_0x51758e<tier){if('ZmkXw'!==_0x49b101(0x25c))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x49b101(0x1a7)](_0x752e4d,_0x51758e,tier)),SceneManager[_0x49b101(0x1d9)]();else{const _0x25b69a=this['_text'];this[_0x49b101(0x24e)](),this[_0x49b101(0x245)](_0x25b69a);if(_0x27c000[_0x49b101(0x1f6)])this[_0x49b101(0x1ee)]();this['scrollToTop']();}}else{if(_0x49b101(0x1bb)!==_0x49b101(0x201))tier=Math[_0x49b101(0x1b4)](_0x51758e,tier);else{if(_0x368e06===this['_text'])return;this[_0x49b101(0x21c)]=_0x16a96e,this['refresh']();}}}VisuMZ[_0x49b101(0x1b8)](VisuMZ[label][_0x49b101(0x21f)],_0xab086b[_0x49b101(0x1e6)]);})(pluginData),PluginManager[_0x1bb6bc(0x25e)](pluginData[_0x1bb6bc(0x23f)],_0x1bb6bc(0x229),_0x48d9bd=>{const _0x208dec=_0x1bb6bc;if(SceneManager['isSceneBattle']())return;SceneManager[_0x208dec(0x25a)](Scene_PatchNotes);}),PluginManager[_0x1bb6bc(0x25e)](pluginData[_0x1bb6bc(0x23f)],'SystemEnablePatchNotesMenu',_0x595cb4=>{const _0x2c93a3=_0x1bb6bc;VisuMZ[_0x2c93a3(0x1b8)](_0x595cb4,_0x595cb4),$gameSystem['setMainMenuPatchNotesEnabled'](_0x595cb4[_0x2c93a3(0x18f)]);}),PluginManager[_0x1bb6bc(0x25e)](pluginData[_0x1bb6bc(0x23f)],'SystemShowPatchNotesMenu',_0x285394=>{const _0x34e495=_0x1bb6bc;VisuMZ['ConvertParams'](_0x285394,_0x285394),$gameSystem['setMainMenuPatchNotesVisible'](_0x285394[_0x34e495(0x243)]);}),TextManager['PatchNotesMenuCommand']=VisuMZ[_0x1bb6bc(0x1f8)]['Settings'][_0x1bb6bc(0x23b)][_0x1bb6bc(0x1ba)],TextManager[_0x1bb6bc(0x228)]=VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x21f)][_0x1bb6bc(0x1c5)][_0x1bb6bc(0x1b7)],TextManager[_0x1bb6bc(0x1d8)]=VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x21f)][_0x1bb6bc(0x1c5)]['FastScroll'],SceneManager[_0x1bb6bc(0x19a)]=function(){const _0x1347ca=_0x1bb6bc;return this[_0x1347ca(0x1fb)]&&this[_0x1347ca(0x1fb)][_0x1347ca(0x1a0)]===Scene_Battle;},VisuMZ['PatchNotes'][_0x1bb6bc(0x1c4)]=Game_System[_0x1bb6bc(0x216)][_0x1bb6bc(0x203)],Game_System['prototype']['initialize']=function(){const _0x31d84d=_0x1bb6bc;VisuMZ[_0x31d84d(0x1f8)][_0x31d84d(0x1c4)][_0x31d84d(0x1aa)](this),this[_0x31d84d(0x1ef)]();},Game_System[_0x1bb6bc(0x216)][_0x1bb6bc(0x1ef)]=function(){const _0x478e04=_0x1bb6bc;this[_0x478e04(0x1dc)]={'shown':VisuMZ[_0x478e04(0x1f8)][_0x478e04(0x21f)][_0x478e04(0x23b)][_0x478e04(0x232)],'enabled':VisuMZ[_0x478e04(0x1f8)][_0x478e04(0x21f)][_0x478e04(0x23b)]['EnableMainMenu']};},Game_System[_0x1bb6bc(0x216)][_0x1bb6bc(0x1f5)]=function(){const _0x38915b=_0x1bb6bc;if(this['_PatchNotes_MainMenu']===undefined)this[_0x38915b(0x1ef)]();return this['_PatchNotes_MainMenu'][_0x38915b(0x251)];},Game_System[_0x1bb6bc(0x216)][_0x1bb6bc(0x1b9)]=function(_0x19d774){const _0xc31988=_0x1bb6bc;if(this['_PatchNotes_MainMenu']===undefined)this[_0xc31988(0x1ef)]();this[_0xc31988(0x1dc)]['shown']=_0x19d774;},Game_System[_0x1bb6bc(0x216)][_0x1bb6bc(0x192)]=function(){const _0x30efef=_0x1bb6bc;if(this[_0x30efef(0x1dc)]===undefined)this[_0x30efef(0x1ef)]();return this[_0x30efef(0x1dc)][_0x30efef(0x1c3)];},Game_System[_0x1bb6bc(0x216)]['setMainMenuPatchNotesEnabled']=function(_0x2b0705){const _0x404d81=_0x1bb6bc;if(this[_0x404d81(0x1dc)]===undefined)this['initPatchNotesMainMenu']();this[_0x404d81(0x1dc)][_0x404d81(0x1c3)]=_0x2b0705;},VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x1ff)]=Scene_Title[_0x1bb6bc(0x216)][_0x1bb6bc(0x204)],Scene_Title[_0x1bb6bc(0x216)][_0x1bb6bc(0x204)]=function(){const _0x491671=_0x1bb6bc;VisuMZ['PatchNotes'][_0x491671(0x1ff)][_0x491671(0x1aa)](this),this['_commandWindow'][_0x491671(0x191)](_0x491671(0x217),this[_0x491671(0x1cd)][_0x491671(0x1ac)](this));},Scene_Title[_0x1bb6bc(0x216)][_0x1bb6bc(0x1cd)]=function(){const _0x3ff8fc=_0x1bb6bc;this[_0x3ff8fc(0x199)][_0x3ff8fc(0x244)](),SceneManager['push'](Scene_PatchNotes);},VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x1c6)]=Scene_Menu[_0x1bb6bc(0x216)][_0x1bb6bc(0x204)],Scene_Menu[_0x1bb6bc(0x216)]['createCommandWindow']=function(){const _0x50151e=_0x1bb6bc;VisuMZ[_0x50151e(0x1f8)][_0x50151e(0x1c6)][_0x50151e(0x1aa)](this);const _0x3b430f=this[_0x50151e(0x199)];_0x3b430f[_0x50151e(0x191)](_0x50151e(0x217),this['commandPatchNotes'][_0x50151e(0x1ac)](this));},Scene_Menu['prototype'][_0x1bb6bc(0x1cd)]=function(){const _0x48db05=_0x1bb6bc;SceneManager[_0x48db05(0x25a)](Scene_PatchNotes);};function Scene_PatchNotes(){const _0x422b4b=_0x1bb6bc;this[_0x422b4b(0x203)](...arguments);}Scene_PatchNotes[_0x1bb6bc(0x216)]=Object[_0x1bb6bc(0x248)](Scene_MenuBase[_0x1bb6bc(0x216)]),Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x1a0)]=Scene_PatchNotes,Scene_PatchNotes['prototype']['initialize']=function(){const _0x5c4e94=_0x1bb6bc;Scene_MenuBase[_0x5c4e94(0x216)][_0x5c4e94(0x203)][_0x5c4e94(0x1aa)](this);},Scene_PatchNotes[_0x1bb6bc(0x216)]['helpAreaHeight']=function(){return 0x0;},Scene_PatchNotes['prototype'][_0x1bb6bc(0x248)]=function(){const _0x33baae=_0x1bb6bc;Scene_MenuBase[_0x33baae(0x216)][_0x33baae(0x248)][_0x33baae(0x1aa)](this),this['createCommandWindow'](),this[_0x33baae(0x1ab)]();},Scene_PatchNotes[_0x1bb6bc(0x216)]['createCommandWindow']=function(){const _0x4b2f92=_0x1bb6bc,_0x4060a8=this[_0x4b2f92(0x240)](),_0x39ff18=new Window_PatchNotesList(_0x4060a8);_0x39ff18[_0x4b2f92(0x191)]('patchNotes',this[_0x4b2f92(0x225)]['bind'](this)),_0x39ff18[_0x4b2f92(0x191)](_0x4b2f92(0x1b1),this[_0x4b2f92(0x22a)][_0x4b2f92(0x1ac)](this)),this[_0x4b2f92(0x1a9)](_0x39ff18),this['_commandWindow']=_0x39ff18,_0x39ff18[_0x4b2f92(0x22c)](Window_PatchNotesList['BG_TYPE']);},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x240)]=function(){const _0x221e22=_0x1bb6bc;if(VisuMZ[_0x221e22(0x1f8)][_0x221e22(0x21f)]['Window']['CommandWindow_RectJS'])return VisuMZ[_0x221e22(0x1f8)]['Settings'][_0x221e22(0x246)][_0x221e22(0x1fa)][_0x221e22(0x1aa)](this);const _0x5b5ce2=Math[_0x221e22(0x1b4)](0x2d0,Math[_0x221e22(0x235)](Graphics['boxWidth']*0.75)),_0x35c91d=Math['max'](_0x5b5ce2-0x12c,0x1e0),_0x100565=this[_0x221e22(0x213)](0xa,!![]),_0x55f3e7=Math[_0x221e22(0x235)]((Graphics[_0x221e22(0x1e0)]-_0x35c91d)/0x2),_0x8117d5=Math[_0x221e22(0x235)]((Graphics[_0x221e22(0x253)]-_0x100565)/0x2);return new Rectangle(_0x55f3e7,_0x8117d5,_0x35c91d,_0x100565);},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x1ab)]=function(){const _0x6b2ad=_0x1bb6bc,_0x4f581a=this[_0x6b2ad(0x242)](),_0x2c4429=new Window_PatchNotesDisplay(_0x4f581a);_0x2c4429[_0x6b2ad(0x1eb)](),_0x2c4429[_0x6b2ad(0x1de)](),_0x2c4429[_0x6b2ad(0x191)](_0x6b2ad(0x1b1),this['onDisplayCancel']['bind'](this)),this[_0x6b2ad(0x1a9)](_0x2c4429),this[_0x6b2ad(0x1d1)]=_0x2c4429,_0x2c4429[_0x6b2ad(0x22c)](Window_PatchNotesDisplay[_0x6b2ad(0x1b5)]);},Scene_PatchNotes['prototype'][_0x1bb6bc(0x242)]=function(){const _0x5d1df6=_0x1bb6bc;if(VisuMZ[_0x5d1df6(0x1f8)][_0x5d1df6(0x21f)][_0x5d1df6(0x246)][_0x5d1df6(0x258)]){if(_0x5d1df6(0x210)===_0x5d1df6(0x21a)){const _0x151311=this['itemLineRect'](_0x3ed988);this[_0x5d1df6(0x1e8)](),this[_0x5d1df6(0x1e7)](this[_0x5d1df6(0x1e9)](_0x188e4a)),this[_0x5d1df6(0x18e)](this[_0x5d1df6(0x20a)](_0x12a887),_0x151311['x'],_0x151311['y'],_0x151311[_0x5d1df6(0x1d5)]);}else return VisuMZ[_0x5d1df6(0x1f8)][_0x5d1df6(0x21f)][_0x5d1df6(0x246)][_0x5d1df6(0x258)][_0x5d1df6(0x1aa)](this);}const _0x77a8aa=Graphics['boxWidth'],_0x3906fc=this[_0x5d1df6(0x197)](),_0x31bd31=0x0,_0x53fa26=this['mainAreaTop']();return new Rectangle(_0x31bd31,_0x53fa26,_0x77a8aa,_0x3906fc);},Scene_PatchNotes[_0x1bb6bc(0x216)]['onCommandPatchNotes']=function(){const _0x3052e0=_0x1bb6bc,_0x511f13=this[_0x3052e0(0x199)]['currentExt']();this['_displayWindow']['setText'](_0x511f13),this[_0x3052e0(0x199)][_0x3052e0(0x1eb)](),this[_0x3052e0(0x199)]['deactivate'](),this[_0x3052e0(0x1d1)]['show'](),this[_0x3052e0(0x1d1)][_0x3052e0(0x1ea)]();},Scene_PatchNotes['prototype'][_0x1bb6bc(0x1db)]=function(){const _0xaf1951=_0x1bb6bc;this[_0xaf1951(0x199)][_0xaf1951(0x211)](),this['_commandWindow']['activate'](),this[_0xaf1951(0x1d1)][_0xaf1951(0x1eb)](),this[_0xaf1951(0x1d1)][_0xaf1951(0x1de)]();},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x1a4)]=function(){const _0x4ab380=_0x1bb6bc;if(this[_0x4ab380(0x1d1)]&&this[_0x4ab380(0x1d1)][_0x4ab380(0x230)]){if(_0x4ab380(0x1f9)!==_0x4ab380(0x1c1))return TextManager[_0x4ab380(0x1d0)]('pageup',_0x4ab380(0x219));else this[_0x4ab380(0x22d)](![]);}else return'';},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x1c8)]=function(){const _0x2c131f=_0x1bb6bc;if(this[_0x2c131f(0x1d1)]&&this[_0x2c131f(0x1d1)][_0x2c131f(0x230)]){if(_0x2c131f(0x254)!==_0x2c131f(0x254))_0x2c9efd[_0x2c131f(0x1f8)][_0x2c131f(0x198)][_0x2c131f(0x1aa)](this),this[_0x2c131f(0x215)]();else return TextManager['getInputMultiButtonStrings']('up',_0x2c131f(0x239));}else{if(_0x2c131f(0x23e)!=='wsDmH')this['processFastScroll'](!![]);else return'';}},Scene_PatchNotes[_0x1bb6bc(0x216)]['buttonAssistKey4']=function(){const _0x406dda=_0x1bb6bc;if(this['_displayWindow']&&this['_displayWindow'][_0x406dda(0x230)])return'';else{if(_0x406dda(0x1fe)===_0x406dda(0x1ad)){_0x1d16a0[_0x406dda(0x1f8)]['Scene_Menu_createCommandWindow'][_0x406dda(0x1aa)](this);const _0x16aef7=this[_0x406dda(0x199)];_0x16aef7['setHandler'](_0x406dda(0x217),this[_0x406dda(0x1cd)]['bind'](this));}else return Scene_MenuBase[_0x406dda(0x216)][_0x406dda(0x237)]['call'](this);}},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x1bd)]=function(){const _0x5e4abc=_0x1bb6bc;return TextManager[_0x5e4abc(0x1d8)];},Scene_PatchNotes[_0x1bb6bc(0x216)]['buttonAssistText3']=function(){const _0x45c423=_0x1bb6bc;return TextManager[_0x45c423(0x228)];},Scene_PatchNotes['prototype'][_0x1bb6bc(0x247)]=function(){const _0x1cb959=_0x1bb6bc;Scene_MenuBase['prototype'][_0x1cb959(0x247)][_0x1cb959(0x1aa)](this),this['setBackgroundOpacity'](this[_0x1cb959(0x20e)]()),this[_0x1cb959(0x206)]();},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x20e)]=function(){const _0x3caa4c=_0x1bb6bc;return VisuMZ[_0x3caa4c(0x1f8)][_0x3caa4c(0x21f)]['BgSettings']['SnapshotOpacity'];},Scene_PatchNotes[_0x1bb6bc(0x216)][_0x1bb6bc(0x206)]=function(){const _0x1b25e0=_0x1bb6bc,_0xeb90e0=VisuMZ['PatchNotes'][_0x1b25e0(0x21f)][_0x1b25e0(0x1e4)];_0xeb90e0&&(_0xeb90e0[_0x1b25e0(0x1cc)]!==''||_0xeb90e0['BgFilename2']!=='')&&(this[_0x1b25e0(0x1e5)]=new Sprite(ImageManager[_0x1b25e0(0x1c9)](_0xeb90e0[_0x1b25e0(0x1cc)])),this[_0x1b25e0(0x23a)]=new Sprite(ImageManager['loadTitle2'](_0xeb90e0['BgFilename2'])),this[_0x1b25e0(0x220)](this[_0x1b25e0(0x1e5)]),this['addChild'](this[_0x1b25e0(0x23a)]),this[_0x1b25e0(0x1e5)]['bitmap']['addLoadListener'](this[_0x1b25e0(0x249)][_0x1b25e0(0x1ac)](this,this[_0x1b25e0(0x1e5)])),this['_backSprite2'][_0x1b25e0(0x1fd)][_0x1b25e0(0x1f2)](this['adjustSprite'][_0x1b25e0(0x1ac)](this,this[_0x1b25e0(0x23a)])));},Scene_PatchNotes[_0x1bb6bc(0x216)]['adjustSprite']=function(_0x5b83c4){this['scaleSprite'](_0x5b83c4),this['centerSprite'](_0x5b83c4);},VisuMZ[_0x1bb6bc(0x1f8)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x1bb6bc(0x216)][_0x1bb6bc(0x1f4)],Window_MenuCommand[_0x1bb6bc(0x216)][_0x1bb6bc(0x1f4)]=function(){const _0x3c3286=_0x1bb6bc;VisuMZ[_0x3c3286(0x1f8)][_0x3c3286(0x198)][_0x3c3286(0x1aa)](this),this[_0x3c3286(0x215)]();},Window_MenuCommand['prototype'][_0x1bb6bc(0x215)]=function(){const _0x2df19a=_0x1bb6bc;if(!this['addPatchNotesCommandAutomatically']())return;if(!this['isPatchNotesCommandVisible']())return;const _0x5c170b=TextManager[_0x2df19a(0x1e3)],_0xab6a87=this[_0x2df19a(0x233)]();this[_0x2df19a(0x1c0)](_0x5c170b,_0x2df19a(0x217),_0xab6a87);},Window_MenuCommand[_0x1bb6bc(0x216)][_0x1bb6bc(0x20f)]=function(){const _0x38cf84=_0x1bb6bc;return Imported[_0x38cf84(0x1ec)]?![]:!![];},Window_MenuCommand['prototype']['isPatchNotesCommandVisible']=function(){const _0x5f09df=_0x1bb6bc;return $gameSystem[_0x5f09df(0x1f5)]();},Window_MenuCommand['prototype'][_0x1bb6bc(0x233)]=function(){const _0x313ab2=_0x1bb6bc;return $gameSystem[_0x313ab2(0x192)]();},Window_TitleCommand[_0x1bb6bc(0x223)]=VisuMZ[_0x1bb6bc(0x1f8)]['Settings'][_0x1bb6bc(0x23b)][_0x1bb6bc(0x236)],VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x19b)]=Window_TitleCommand[_0x1bb6bc(0x216)][_0x1bb6bc(0x19f)],Window_TitleCommand[_0x1bb6bc(0x216)][_0x1bb6bc(0x19f)]=function(){const _0x449fbe=_0x1bb6bc;VisuMZ[_0x449fbe(0x1f8)][_0x449fbe(0x19b)][_0x449fbe(0x1aa)](this),this[_0x449fbe(0x215)]();},Window_TitleCommand[_0x1bb6bc(0x216)][_0x1bb6bc(0x215)]=function(){const _0x482c0c=_0x1bb6bc;if(!Window_TitleCommand[_0x482c0c(0x223)])return;if(this[_0x482c0c(0x1a5)](_0x482c0c(0x217))>=0x0)return;const _0x4060eb=TextManager[_0x482c0c(0x1e3)],_0x111e7c=!![];this[_0x482c0c(0x1c0)](_0x4060eb,_0x482c0c(0x217),_0x111e7c);const _0x5edea1=this[_0x482c0c(0x1a5)](_0x482c0c(0x21b));if(_0x5edea1>0x0){if('xWXhX'!==_0x482c0c(0x22e))return this[_0x482c0c(0x1d1)]&&this[_0x482c0c(0x1d1)][_0x482c0c(0x230)]?_0x360008['getInputMultiButtonStrings']('up','down'):'';else{const _0x120a6e=this[_0x482c0c(0x1dd)][_0x482c0c(0x24d)]();this[_0x482c0c(0x1dd)][_0x482c0c(0x20d)](_0x5edea1,0x0,_0x120a6e);}}};function _0x4b65(_0x1cffd1,_0xced092){const _0x184336=_0x1843();return _0x4b65=function(_0x4b65be,_0x51289b){_0x4b65be=_0x4b65be-0x18d;let _0x367bc9=_0x184336[_0x4b65be];return _0x367bc9;},_0x4b65(_0x1cffd1,_0xced092);}function Window_PatchNotesList(){const _0x77d9d3=_0x1bb6bc;this[_0x77d9d3(0x203)](...arguments);}Window_PatchNotesList[_0x1bb6bc(0x216)]=Object[_0x1bb6bc(0x248)](Window_Command[_0x1bb6bc(0x216)]),Window_PatchNotesList[_0x1bb6bc(0x216)]['constructor']=Window_PatchNotesList,Window_PatchNotesList[_0x1bb6bc(0x1b5)]=VisuMZ[_0x1bb6bc(0x1f8)]['Settings'][_0x1bb6bc(0x246)][_0x1bb6bc(0x1b6)],Window_PatchNotesList[_0x1bb6bc(0x1da)]=VisuMZ['PatchNotes'][_0x1bb6bc(0x21f)]['PatchNotes'],Window_PatchNotesList[_0x1bb6bc(0x216)]['initialize']=function(_0x24719d){const _0x480739=_0x1bb6bc;Window_Command[_0x480739(0x216)][_0x480739(0x203)]['call'](this,_0x24719d);},Window_PatchNotesList['prototype'][_0x1bb6bc(0x24a)]=function(){return![];},Window_PatchNotesList['prototype'][_0x1bb6bc(0x1fc)]=function(){return![];},Window_PatchNotesList[_0x1bb6bc(0x216)][_0x1bb6bc(0x19f)]=function(){const _0x2198db=_0x1bb6bc;for(const _0x373890 of Window_PatchNotesList[_0x2198db(0x1da)]){if(_0x2198db(0x190)===_0x2198db(0x190)){const _0x211d27=_0x373890[_0x2198db(0x1d2)]||'',_0x3da0c3=_0x373890[_0x2198db(0x20b)]||'';this['addCommand'](_0x211d27,'patchNotes',!![],_0x3da0c3);}else{const _0x2023b4=_0xd4263d(_0x246d9a['$1']);_0x2023b4!==_0x25258b[_0x169adc]['version']&&(_0x32547c('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x508122,_0x2023b4)),_0x4d1d36[_0x2198db(0x1d9)]());}}},Window_PatchNotesList[_0x1bb6bc(0x216)]['drawItem']=function(_0x56bea6){const _0x626d91=_0x1bb6bc,_0x5b9176=this['itemLineRect'](_0x56bea6);this[_0x626d91(0x1e8)](),this['changePaintOpacity'](this['isCommandEnabled'](_0x56bea6)),this[_0x626d91(0x18e)](this['commandName'](_0x56bea6),_0x5b9176['x'],_0x5b9176['y'],_0x5b9176['width']);};function Window_PatchNotesDisplay(){const _0x17fe61=_0x1bb6bc;this[_0x17fe61(0x203)](...arguments);}Window_PatchNotesDisplay['prototype']=Object[_0x1bb6bc(0x248)](Window_Selectable[_0x1bb6bc(0x216)]),Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x1a0)]=Window_PatchNotesDisplay,Window_PatchNotesDisplay['BG_TYPE']=VisuMZ[_0x1bb6bc(0x1f8)]['Settings'][_0x1bb6bc(0x246)][_0x1bb6bc(0x1f0)],Window_PatchNotesDisplay['TOP_LINE_BUFFER']=VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x21f)][_0x1bb6bc(0x246)][_0x1bb6bc(0x205)]??0x1,Window_PatchNotesDisplay[_0x1bb6bc(0x1f7)]=VisuMZ[_0x1bb6bc(0x1f8)]['Settings']['Window'][_0x1bb6bc(0x24c)]??0x1,Window_PatchNotesDisplay[_0x1bb6bc(0x214)]=VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x21f)][_0x1bb6bc(0x246)]['DisplayWindow_CenterWidth']??0x1,Window_PatchNotesDisplay[_0x1bb6bc(0x250)]=VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x21f)][_0x1bb6bc(0x246)]['SlowScrollSpeed']||0x1,Window_PatchNotesDisplay[_0x1bb6bc(0x1df)]=VisuMZ['PatchNotes'][_0x1bb6bc(0x21f)][_0x1bb6bc(0x246)]['FastScrollSpeed']||0x1,Window_PatchNotesDisplay[_0x1bb6bc(0x1ed)]=VisuMZ[_0x1bb6bc(0x1f8)][_0x1bb6bc(0x21f)]['Window'][_0x1bb6bc(0x1f1)]||0x1,Window_PatchNotesDisplay['FAST_SOUND_FREQUENCY']=VisuMZ[_0x1bb6bc(0x1f8)]['Settings'][_0x1bb6bc(0x246)][_0x1bb6bc(0x1d6)]||0x1,Window_PatchNotesDisplay['prototype'][_0x1bb6bc(0x203)]=function(_0x5af657){const _0x898462=_0x1bb6bc;this[_0x898462(0x21c)]='',Window_Selectable['prototype'][_0x898462(0x203)][_0x898462(0x1aa)](this,_0x5af657),this['_allTextHeight']=0x0,this[_0x898462(0x1ce)](),this[_0x898462(0x1ea)]();},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x252)]=function(){return!![];},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x1ce)]=function(){const _0x123fa0=_0x1bb6bc;this[_0x123fa0(0x1bc)](),this[_0x123fa0(0x21d)](),this[_0x123fa0(0x1a2)]();},Window_PatchNotesDisplay[_0x1bb6bc(0x216)]['calculateTextHeight']=function(){const _0x25618b=_0x1bb6bc,_0x57f3c0=this['_text'];this['_allTextHeight']=0x0,this['_allTextHeight']=this[_0x25618b(0x1b0)](_0x57f3c0)[_0x25618b(0x20c)];const _0x300419=this[_0x25618b(0x24b)](),_0x58fc3e=Window_PatchNotesDisplay[_0x25618b(0x23d)]*_0x300419,_0x39f38f=Window_PatchNotesDisplay[_0x25618b(0x1f7)]*_0x300419;this[_0x25618b(0x22b)]+=_0x58fc3e+_0x39f38f;},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x1c7)]=function(){const _0x1fd2a7=_0x1bb6bc;return Math[_0x1fd2a7(0x1b4)](this[_0x1fd2a7(0x22b)],0x1);},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x1e2)]=function(_0xae7864){const _0x4468f7=_0x1bb6bc;if(_0xae7864===this[_0x4468f7(0x21c)])return;this[_0x4468f7(0x21c)]=_0xae7864,this[_0x4468f7(0x1ce)]();},Window_PatchNotesDisplay['prototype'][_0x1bb6bc(0x1a2)]=function(){const _0x4b70c6=_0x1bb6bc,_0x345d86=this[_0x4b70c6(0x21c)];this[_0x4b70c6(0x24e)](),this[_0x4b70c6(0x245)](_0x345d86);if(Imported[_0x4b70c6(0x1f6)])this['resetWordWrap']();this[_0x4b70c6(0x1c2)]();},Window_PatchNotesDisplay['prototype']['drawMessageText']=function(_0x5947d6){const _0x5c6037=_0x1bb6bc,_0xecc297=Math['min'](this[_0x5c6037(0x1d4)],Window_PatchNotesDisplay[_0x5c6037(0x214)]||this[_0x5c6037(0x1d4)]),_0x4172f5=Math['floor']((this[_0x5c6037(0x1d4)]-_0xecc297)/0x2),_0x1e47a0=this[_0x5c6037(0x24b)]()*Window_PatchNotesDisplay[_0x5c6037(0x23d)];this[_0x5c6037(0x18e)](_0x5947d6,_0x4172f5,_0x1e47a0,_0xecc297);},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x231)]=function(){},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x193)]=function(){const _0x135e0d=_0x1bb6bc;if(!this[_0x135e0d(0x230)])return;if(Input[_0x135e0d(0x207)](_0x135e0d(0x239))){if(_0x135e0d(0x196)==='zVUJY')this[_0x135e0d(0x200)](!![]);else return this[_0x135e0d(0x1d1)]&&this[_0x135e0d(0x1d1)]['active']?'':_0xe286c[_0x135e0d(0x216)]['buttonAssistKey4']['call'](this);}else{if(Input[_0x135e0d(0x207)]('up'))this['processSlowScroll'](![]);else{if(Input[_0x135e0d(0x207)](_0x135e0d(0x219)))this[_0x135e0d(0x22d)](!![]);else{if(Input[_0x135e0d(0x207)]('pageup'))this['processFastScroll'](![]);else{if(Input['isTriggered']('home'))_0x135e0d(0x1a1)!==_0x135e0d(0x1a1)?(this[_0x135e0d(0x199)]['close'](),_0x3cdce9['push'](_0x5cdfc6)):this['scrollToTop'](!![]);else Input['isTriggered']('end')&&this['scrollToBottom'](!![]);}}}}},Window_PatchNotesDisplay[_0x1bb6bc(0x216)]['processSlowScroll']=function(_0x5ac7c3){const _0x454d3d=_0x1bb6bc;let _0x32bd8c=this[_0x454d3d(0x218)]['y'];this[_0x454d3d(0x218)]['y']+=(_0x5ac7c3?0x1:-0x1)*Window_PatchNotesDisplay[_0x454d3d(0x250)];let _0x4e9586=Math['max'](0x0,this[_0x454d3d(0x22b)]-this[_0x454d3d(0x1cf)]);this[_0x454d3d(0x218)]['y']=this['origin']['y'][_0x454d3d(0x194)](0x0,_0x4e9586);if(_0x32bd8c!==this[_0x454d3d(0x218)]['y']&&Graphics['frameCount']%Window_PatchNotesDisplay[_0x454d3d(0x1ed)]===0x0)this[_0x454d3d(0x21e)]();},Window_PatchNotesDisplay[_0x1bb6bc(0x216)]['processFastScroll']=function(_0x669b95){const _0x3da6a5=_0x1bb6bc;let _0x5bc82f=this['origin']['y'];this[_0x3da6a5(0x218)]['y']+=(_0x669b95?0x1:-0x1)*Window_PatchNotesDisplay['FAST_SCROLL_SPEED'];let _0x3d27bf=Math[_0x3da6a5(0x1b4)](0x0,this[_0x3da6a5(0x22b)]-this[_0x3da6a5(0x1cf)]);this[_0x3da6a5(0x218)]['y']=this[_0x3da6a5(0x218)]['y'][_0x3da6a5(0x194)](0x0,_0x3d27bf);if(_0x5bc82f!==this[_0x3da6a5(0x218)]['y']&&Graphics[_0x3da6a5(0x22f)]%Window_PatchNotesDisplay[_0x3da6a5(0x195)]===0x0)this[_0x3da6a5(0x21e)]();},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x1c2)]=function(_0x4984c6){const _0x37029f=_0x1bb6bc;let _0x3b7abf=this['origin']['y'];this[_0x37029f(0x218)]['y']=0x0;if(_0x4984c6&&_0x3b7abf!==this['origin']['y'])this[_0x37029f(0x21e)]();},Window_PatchNotesDisplay[_0x1bb6bc(0x216)]['scrollToBottom']=function(_0x3562de){const _0x23d257=_0x1bb6bc;let _0x3aec90=this[_0x23d257(0x218)]['y'],_0x51574a=Math['max'](0x0,this[_0x23d257(0x22b)]-this[_0x23d257(0x1cf)]);this[_0x23d257(0x218)]['y']=_0x51574a;if(_0x3562de&&_0x3aec90!==this[_0x23d257(0x218)]['y'])this[_0x23d257(0x21e)]();},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x259)]=function(){const _0xa1bd01=_0x1bb6bc;this[_0xa1bd01(0x208)]=this['origin']['y']<this['_allTextHeight']-this[_0xa1bd01(0x1cf)],this[_0xa1bd01(0x25d)]=this[_0xa1bd01(0x218)]['y']>0x0;},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x1a8)]=function(_0xc7e5e6,_0x1129c5){const _0x4d1931=_0x1bb6bc;this[_0x4d1931(0x218)]['y']+=_0x1129c5;let _0x333c7a=Math[_0x4d1931(0x1b4)](0x0,this[_0x4d1931(0x22b)]-this['innerHeight']);this[_0x4d1931(0x218)]['y']=this[_0x4d1931(0x218)]['y'][_0x4d1931(0x194)](0x0,_0x333c7a);},Window_PatchNotesDisplay[_0x1bb6bc(0x216)][_0x1bb6bc(0x19d)]=function(_0x4779e4,_0x422660){const _0x50af2c=_0x1bb6bc;this[_0x50af2c(0x218)]['y']+=_0x422660;let _0x2cabcd=Math[_0x50af2c(0x1b4)](0x0,this['_allTextHeight']-this[_0x50af2c(0x1cf)]);this[_0x50af2c(0x218)]['y']=this[_0x50af2c(0x218)]['y'][_0x50af2c(0x194)](0x0,_0x2cabcd);};