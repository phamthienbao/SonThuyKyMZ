//=============================================================================
// VisuStella MZ - Visual Item Inventory
// VisuMZ_4_VisualItemInv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualItemInv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualItemInv = VisuMZ.VisualItemInv || {};
VisuMZ.VisualItemInv.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [VisualItemInv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Item_Inventory_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the item list displayed in-game to become more visual
 * and show bigger images, either as icons or pictures. The enlarged item,
 * weapon, and armor images will show their item quantities next to them while
 * a tooltip window appears above their selected cell to show the item's name.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Changes the item inventory windows to become more visual.
 * * Enlarged item images can be either icons or picture images.
 * * Alter how large you want the images to appear with the Plugin Parameters.
 * * Add different color backgrounds for different items.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Window Columns and Spacing
 * 
 * It should come off as no surprise that these windows will have their usual
 * column counts changed to adjust for the item images shown. The columns will
 * be based on how many of the item icons can fit inside of the window.
 *
 * ---
 * 
 * Item Quantity Positioning
 * 
 * The item quantity will now be positioned to show in the lower right of any
 * window cell with an enlarged icon. Due to this being a much smaller area
 * than what is usually provided, some plugins may have incredibly squished
 * appearances when it comes to displaying item quantity in some areas.
 * 
 * This needs to be adjusted in those plugins individually.
 * 
 * ---
 * 
 * Items and Equips Core
 * 
 * For the Equip Menu, the remove item entry has been changed to show only the
 * enlarged icon. This is to keep consistency with the rest of the plugin.
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
 * === Picture-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Item Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item's icon inside the item windows instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of this plugin, too.
 * - The size used for the image will vary based on the icon size settings.
 * 
 * ---
 * 
 * === Background Colors-Related Notetags ===
 * 
 * ---
 *
 * <Visual Item BG Color 1: x>
 * <Visual Item BG Color 2: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to text color 'x'.
 * - Replace 'x' with a number from 0 to 31 to represent a text color.
 *
 * ---
 *
 * <Visual Item BG Color 1: #rrggbb>
 * <Visual Item BG Color 2: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to a hex color.
 * - Use #rrggbb for custom colors.
 * - You can find out what hex codes belong to which color from this website:
 *   https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Visual Item Inventory Settings
 * ============================================================================
 *
 * These settings allow you to adjust how the Visual Item Inventory windows
 * appear and which ones they appear in.
 *
 * ---
 *
 * General
 * 
 *   Applied Windows:
 *   - Insert the name of their constructors here to apply them.
 *   - Only works with windows made from Window_ItemList.
 * 
 *   Icon Size:
 *   - The icon size used for the Visual Item windows.
 * 
 *   Icon Smoothing?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Item Quantity Outline
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 *   Outline Size:
 *   - How thick are the outlines for the item quantity?
 *
 * ---
 *
 * Tooltip Window
 * 
 *   Show Tooltip Window?:
 *   - Show the tooltip window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Buffer Width:
 *   - How much to buffer this window's width by?
 * 
 *   Font Size:
 *   - What should this window's font size be?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset this window's X/Y position by?
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
 * Version 1.07: May 15, 2025
 * * Compatibility Update!
 * ** Tooltip window now accounts for target window's scaling (ie Frontview
 *    Battle UI). Update made by Arisu.
 * 
 * Version 1.06: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a visual overlapping error. Fix made by Olivia.
 * 
 * Version 1.05: March 14, 2024
 * * Compatibility Update!
 * ** Added better compatibility with VisuMZ_3_ItemAmplifySkills! The confirm
 *    icon should now be displayed properly. Update made by Irina.
 * 
 * Version 1.04: July 13, 2023
 * * Compatibility Update!
 * ** Added compatibility with Quest Journal System's newest Quest Label update
 *    in order for the Quest Label to show up in the visual inventory. Update
 *    made by Irina.
 * 
 * Version 1.03: August 25, 2022
 * * Feature Update!
 * ** Updated the boundaries for visual item name display positions to always
 *    fit within the verticality of the game screen. Fix made by Irina.
 * 
 * Version 1.02: July 16, 2021
 * * Bug Fixes!
 * ** Visual glitch fixed that would make item quantity not appear. Fix made
 *    by Arisu.
 * 
 * Version 1.01: February 19, 2021
 * * Feature Update!
 * ** No longer requires VisuStella MZ Items and Equips Core dependency.
 *
 * Version 1.00 Official Release Date: February 26, 2021
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
 * @param VisualItemInv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param General
 *
 * @param Constructors:arraystr
 * @text Applied Windows
 * @parent General
 * @type string[]
 * @desc Insert the name of their constructors here to apply them.
 * Only works with windows made from Window_ItemList.
 * @default ["Window_ItemList","Window_EquipItem","Window_ShopSell","Window_EventItem","Window_BattleItem"]
 *
 * @param IconSize:num
 * @text Icon Size
 * @parent General
 * @desc The icon size used for the Visual Item windows.
 * @default 64
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default false
 * 
 * @param Outline
 * @text Item Quantity Outline
 *
 * @param OutlineColor:num
 * @text Outline Color
 * @parent Outline
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param OutlineSize:num
 * @text Outline Size
 * @parent Outline
 * @desc How thick are the outlines for the item quantity?
 * @default 4
 * 
 * @param Tooltip
 * @text Tooltip Window
 *
 * @param ShowTooltip:eval
 * @text Show Tooltip Window?
 * @parent Tooltip
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the tooltip window?
 * @default true
 *
 * @param TooltipBgType:num
 * @text Background Type
 * @parent Tooltip
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
 * @param TooltipBufferWidth:num
 * @text Buffer Width
 * @parent Tooltip
 * @desc How much to buffer this window's width by?
 * @default 16
 *
 * @param TooltipFontSize:num
 * @text Font Size
 * @parent Tooltip
 * @desc What should this window's font size be?
 * @default 22
 *
 * @param TooltipOffsetX:num
 * @text Offset X
 * @parent Tooltip
 * @desc How much to offset this window's X position by?
 * @default 0
 *
 * @param TooltipOffsetY:num
 * @text Offset Y
 * @parent Tooltip
 * @desc How much to offset this window's Y position by?
 * @default 8
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
//=============================================================================

const _0x4b5858=_0x55ad;(function(_0x21e389,_0xbf676c){const _0x461cd7=_0x55ad,_0x2c6d77=_0x21e389();while(!![]){try{const _0x15bc8f=parseInt(_0x461cd7(0x1af))/0x1+parseInt(_0x461cd7(0x1a2))/0x2+-parseInt(_0x461cd7(0x18e))/0x3*(parseInt(_0x461cd7(0x1f1))/0x4)+-parseInt(_0x461cd7(0x1eb))/0x5+parseInt(_0x461cd7(0x1c3))/0x6*(-parseInt(_0x461cd7(0x1e3))/0x7)+-parseInt(_0x461cd7(0x1a7))/0x8*(-parseInt(_0x461cd7(0x1bc))/0x9)+parseInt(_0x461cd7(0x183))/0xa*(parseInt(_0x461cd7(0x20a))/0xb);if(_0x15bc8f===_0xbf676c)break;else _0x2c6d77['push'](_0x2c6d77['shift']());}catch(_0x20ff71){_0x2c6d77['push'](_0x2c6d77['shift']());}}}(_0x41a7,0x42734));var label='VisualItemInv',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4b5858(0x1fd)](function(_0xead88d){const _0x1761f9=_0x4b5858;return _0xead88d[_0x1761f9(0x188)]&&_0xead88d[_0x1761f9(0x18f)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4b5858(0x215)]||{},VisuMZ['ConvertParams']=function(_0xed10ab,_0x538ffc){const _0x168055=_0x4b5858;for(const _0x1a9011 in _0x538ffc){if(_0x1a9011['match'](/(.*):(.*)/i)){const _0x507bda=String(RegExp['$1']),_0x59492a=String(RegExp['$2'])['toUpperCase']()[_0x168055(0x16b)]();let _0x3e7e36,_0x40ef41,_0x5e89f3;switch(_0x59492a){case'NUM':_0x3e7e36=_0x538ffc[_0x1a9011]!==''?Number(_0x538ffc[_0x1a9011]):0x0;break;case _0x168055(0x1aa):_0x40ef41=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):[],_0x3e7e36=_0x40ef41[_0x168055(0x1f8)](_0x56bc45=>Number(_0x56bc45));break;case _0x168055(0x1ba):_0x3e7e36=_0x538ffc[_0x1a9011]!==''?eval(_0x538ffc[_0x1a9011]):null;break;case'ARRAYEVAL':_0x40ef41=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):[],_0x3e7e36=_0x40ef41[_0x168055(0x1f8)](_0x10a250=>eval(_0x10a250));break;case _0x168055(0x210):_0x3e7e36=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):'';break;case _0x168055(0x1cc):_0x40ef41=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):[],_0x3e7e36=_0x40ef41['map'](_0x43b6e2=>JSON[_0x168055(0x1e5)](_0x43b6e2));break;case _0x168055(0x1ad):_0x3e7e36=_0x538ffc[_0x1a9011]!==''?new Function(JSON['parse'](_0x538ffc[_0x1a9011])):new Function(_0x168055(0x1b7));break;case _0x168055(0x198):_0x40ef41=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):[],_0x3e7e36=_0x40ef41[_0x168055(0x1f8)](_0x4f16cb=>new Function(JSON[_0x168055(0x1e5)](_0x4f16cb)));break;case _0x168055(0x177):_0x3e7e36=_0x538ffc[_0x1a9011]!==''?String(_0x538ffc[_0x1a9011]):'';break;case _0x168055(0x1ca):_0x40ef41=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):[],_0x3e7e36=_0x40ef41[_0x168055(0x1f8)](_0x4c16e2=>String(_0x4c16e2));break;case _0x168055(0x205):_0x5e89f3=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):{},_0x3e7e36=VisuMZ['ConvertParams']({},_0x5e89f3);break;case _0x168055(0x199):_0x40ef41=_0x538ffc[_0x1a9011]!==''?JSON[_0x168055(0x1e5)](_0x538ffc[_0x1a9011]):[],_0x3e7e36=_0x40ef41[_0x168055(0x1f8)](_0x32d0d3=>VisuMZ[_0x168055(0x175)]({},JSON[_0x168055(0x1e5)](_0x32d0d3)));break;default:continue;}_0xed10ab[_0x507bda]=_0x3e7e36;}}return _0xed10ab;},(_0x20228b=>{const _0x45d6a8=_0x4b5858,_0x252e60=_0x20228b[_0x45d6a8(0x1bb)];for(const _0x53b46d of dependencies){if(!Imported[_0x53b46d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x45d6a8(0x1b0)](_0x252e60,_0x53b46d)),SceneManager['exit']();break;}}const _0x422c25=_0x20228b[_0x45d6a8(0x18f)];if(_0x422c25[_0x45d6a8(0x1f5)](/\[Version[ ](.*?)\]/i)){const _0x4036c8=Number(RegExp['$1']);_0x4036c8!==VisuMZ[label]['version']&&(alert(_0x45d6a8(0x1dc)[_0x45d6a8(0x1b0)](_0x252e60,_0x4036c8)),SceneManager['exit']());}if(_0x422c25[_0x45d6a8(0x1f5)](/\[Tier[ ](\d+)\]/i)){const _0x2ea392=Number(RegExp['$1']);_0x2ea392<tier?(alert(_0x45d6a8(0x1e6)[_0x45d6a8(0x1b0)](_0x252e60,_0x2ea392,tier)),SceneManager[_0x45d6a8(0x1f6)]()):tier=Math[_0x45d6a8(0x1a8)](_0x2ea392,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x45d6a8(0x215)],_0x20228b[_0x45d6a8(0x225)]);})(pluginData),VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x20f)]={'visualPicture':/<(?:VISUAL|VISUAL ITEM) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'bgColorNum1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ](\d+)>/i,'bgColorNum2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ](\d+)>/i,'bgColorHex1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ]#(.*)>/i,'bgColorHex2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ]#(.*)>/i},Window_ItemList[_0x4b5858(0x1c1)]=VisuMZ['VisualItemInv'][_0x4b5858(0x215)][_0x4b5858(0x1cf)]||0x40,Window_ItemList[_0x4b5858(0x1ed)]=VisuMZ[_0x4b5858(0x1c6)]['Settings'][_0x4b5858(0x192)]||![],Window_ItemList[_0x4b5858(0x1df)]=VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x215)][_0x4b5858(0x1fa)]||'rgba(0,\x200,\x200,\x201.0)',Window_ItemList[_0x4b5858(0x1ab)]=VisuMZ['VisualItemInv']['Settings'][_0x4b5858(0x214)]||0x0,Window_ItemList[_0x4b5858(0x1c7)]=VisuMZ['VisualItemInv']['Settings'][_0x4b5858(0x19a)]||0x0,Window_ItemList['prototype'][_0x4b5858(0x219)]=function(){const _0x5a65eb=_0x4b5858;return Window_ItemList['VISUAL_ITEM_CONSTRUCTORS'][_0x5a65eb(0x19d)](this[_0x5a65eb(0x1ec)][_0x5a65eb(0x1bb)]);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x1e4)]=Window_Selectable[_0x4b5858(0x21f)]['itemHeight'],Window_ItemList[_0x4b5858(0x21f)]['itemHeight']=function(){const _0x5123d8=_0x4b5858;if(this[_0x5123d8(0x219)]()){if(this['_visualItemHeight']!==undefined)return this[_0x5123d8(0x1bf)];const _0x94f646=Math[_0x5123d8(0x1e7)](Window_ItemList['VISUAL_ITEM_ICON_SIZE']/this[_0x5123d8(0x217)]());return this[_0x5123d8(0x1bf)]=Math[_0x5123d8(0x1d3)](_0x94f646*this['lineHeight']())+0x8,this['_visualItemHeight'];}else return VisuMZ[_0x5123d8(0x1c6)][_0x5123d8(0x1e4)][_0x5123d8(0x196)](this);},VisuMZ['VisualItemInv']['Window_ItemList_maxCols']=Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1f9)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1f9)]=function(){const _0x29d87d=_0x4b5858;return this[_0x29d87d(0x219)]()?Math[_0x29d87d(0x1e7)](this[_0x29d87d(0x1c2)]/this['itemHeight']()):VisuMZ[_0x29d87d(0x1c6)][_0x29d87d(0x1cb)][_0x29d87d(0x196)](this);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x1f4)]=Window_ItemList['prototype'][_0x4b5858(0x212)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x212)]=function(){const _0x3e194f=_0x4b5858;return this[_0x3e194f(0x219)]()?0x0:VisuMZ[_0x3e194f(0x1c6)]['Window_ItemList_colSpacing'][_0x3e194f(0x196)](this);},VisuMZ['VisualItemInv'][_0x4b5858(0x222)]=Window_ItemList['prototype']['rowSpacing'],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1bd)]=function(){const _0x95b25=_0x4b5858;return this[_0x95b25(0x219)]()?0x0:VisuMZ[_0x95b25(0x1c6)][_0x95b25(0x222)][_0x95b25(0x196)](this);},VisuMZ['VisualItemInv'][_0x4b5858(0x18c)]=Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1a3)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1a3)]=function(_0x3e6a03){const _0x5208ea=_0x4b5858;this[_0x5208ea(0x219)]()?this['drawItemVisualItemInventory'](_0x3e6a03):VisuMZ[_0x5208ea(0x1c6)][_0x5208ea(0x18c)][_0x5208ea(0x196)](this,_0x3e6a03);},Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1ea)]=function(_0x55ac61){const _0x213c43=_0x4b5858,_0x1986c1=this[_0x213c43(0x220)](_0x55ac61);if(this[_0x213c43(0x1d0)]&&_0x1986c1===null)return this[_0x213c43(0x17c)](_0x55ac61);if(!_0x1986c1)return;const _0x4e56ef=VisuMZ[_0x213c43(0x1c6)][_0x213c43(0x20f)],_0x4598a9=_0x1986c1[_0x213c43(0x19b)],_0x464ba0=this[_0x213c43(0x1b4)](_0x55ac61);if(_0x4598a9[_0x213c43(0x1f5)](_0x4e56ef[_0x213c43(0x189)])||_0x4598a9[_0x213c43(0x1f5)](_0x4e56ef['bigPicture'])){const _0x110b74=String(RegExp['$1'])[_0x213c43(0x16b)](),_0x512bfb=ImageManager['loadPicture'](_0x110b74);_0x512bfb['addLoadListener'](this[_0x213c43(0x17e)][_0x213c43(0x1d2)](this,_0x1986c1,_0x512bfb,_0x464ba0));}else this[_0x213c43(0x1e2)](this[_0x213c43(0x1fb)](_0x1986c1)),this[_0x213c43(0x17d)](_0x1986c1,_0x464ba0),this[_0x213c43(0x221)](_0x1986c1,_0x464ba0['x'],_0x464ba0['y']+_0x464ba0[_0x213c43(0x1b5)]-this[_0x213c43(0x217)](),_0x464ba0[_0x213c43(0x1c8)]),this['resetFontSettings'](),this[_0x213c43(0x1e2)](!![]);this[_0x213c43(0x19e)](_0x55ac61),this[_0x213c43(0x1e9)](_0x55ac61);},Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x17e)]=function(_0x389598,_0x42f501,_0x32875c){const _0x33daa0=_0x4b5858;this['changePaintOpacity'](this[_0x33daa0(0x1fb)](_0x389598));let _0x1e2e84=_0x32875c['x']+0x2,_0x58a1f2=_0x32875c['y']+0x2,_0x1255d6=_0x32875c['width']-0x4,_0x30e9d2=_0x32875c[_0x33daa0(0x1b5)]-0x4,_0x3414fe=Math['min'](_0x1255d6,_0x30e9d2);const _0x18eaed=_0x3414fe/_0x42f501['width'],_0x42a4ab=_0x3414fe/_0x42f501[_0x33daa0(0x1b5)],_0x436d90=Math[_0x33daa0(0x1a4)](_0x18eaed,_0x42a4ab,0x1);let _0x513256=Math[_0x33daa0(0x1d3)](_0x42f501[_0x33daa0(0x1c8)]*_0x436d90),_0x32ebd4=Math[_0x33daa0(0x1d3)](_0x42f501['height']*_0x436d90);_0x1e2e84+=Math[_0x33daa0(0x1d3)]((_0x1255d6-_0x513256)/0x2),_0x58a1f2+=Math[_0x33daa0(0x1d3)]((_0x30e9d2-_0x32ebd4)/0x2);const _0x24f20e=_0x42f501['width'],_0x13647a=_0x42f501['height'],_0x28e93b=this['contents']['_context'][_0x33daa0(0x1c5)];this[_0x33daa0(0x1f7)][_0x33daa0(0x191)]['imageSmoothingEnabled']=!![],this[_0x33daa0(0x1f7)][_0x33daa0(0x224)](_0x42f501,0x0,0x0,_0x24f20e,_0x13647a,_0x1e2e84,_0x58a1f2,_0x513256,_0x32ebd4),this['contents'][_0x33daa0(0x191)][_0x33daa0(0x1c5)]=_0x28e93b,this['drawItemNumber'](_0x389598,_0x32875c['x'],_0x32875c['y']+_0x32875c[_0x33daa0(0x1b5)]-this[_0x33daa0(0x217)](),_0x32875c['width']),this['resetFontSettings'](),this[_0x33daa0(0x1e2)](!![]);},Window_ItemList['prototype'][_0x4b5858(0x17d)]=function(_0x35ef3a,_0x164914){const _0x51860d=_0x4b5858,_0x5bb3e2=_0x35ef3a['iconIndex'];this[_0x51860d(0x1c4)](_0x5bb3e2,_0x164914);},Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1c4)]=function(_0x27bf74,_0x5c5435){const _0x6bf720=_0x4b5858;let _0x5d96b6=_0x5c5435['x'],_0x291a63=_0x5c5435['y'],_0x558474=Window_ItemList[_0x6bf720(0x1c1)];_0x5d96b6+=Math[_0x6bf720(0x1d3)]((_0x5c5435[_0x6bf720(0x1c8)]-_0x558474)/0x2),_0x291a63+=Math['round']((_0x5c5435['height']-_0x558474)/0x2);const _0x314834=ImageManager['loadSystem'](_0x6bf720(0x1a1)),_0x23d965=ImageManager['iconWidth'],_0x133c36=ImageManager[_0x6bf720(0x201)],_0x1c42f8=_0x27bf74%0x10*_0x23d965,_0x28f7e3=Math[_0x6bf720(0x17f)](_0x27bf74/0x10)*_0x133c36;this[_0x6bf720(0x1f7)][_0x6bf720(0x191)]['imageSmoothingEnabled']=Window_ItemList['VISUAL_ITEM_ICON_SMOOTHING'],this[_0x6bf720(0x1f7)][_0x6bf720(0x224)](_0x314834,_0x1c42f8,_0x28f7e3,_0x23d965,_0x133c36,_0x5d96b6,_0x291a63,_0x558474,_0x558474),this['contents'][_0x6bf720(0x191)][_0x6bf720(0x1c5)]=!![];},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x174)]=Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x221)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x221)]=function(_0x4892be,_0x2a5e03,_0x21e5ae,_0x3181df){const _0x16f445=_0x4b5858;this[_0x16f445(0x219)]()?(this[_0x16f445(0x216)](),VisuMZ[_0x16f445(0x1c6)][_0x16f445(0x174)][_0x16f445(0x196)](this,_0x4892be,_0x2a5e03,_0x21e5ae,_0x3181df),this['resetFontSettings']()):VisuMZ[_0x16f445(0x1c6)][_0x16f445(0x174)][_0x16f445(0x196)](this,_0x4892be,_0x2a5e03,_0x21e5ae,_0x3181df);},Window_Base[_0x4b5858(0x21f)]['setupVisualItemInvFontSettings']=function(){const _0xfa7d8d=_0x4b5858;this['resetFontSettings'](),this[_0xfa7d8d(0x1f7)]['outlineColor']=Window_ItemList['VISUAL_ITEM_OUTLINE_COLOR'],this[_0xfa7d8d(0x1f7)][_0xfa7d8d(0x226)]=Window_ItemList[_0xfa7d8d(0x1ab)];},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x1b2)]=Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x223)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x223)]=function(_0x3f8f04){const _0x3b3044=_0x4b5858;VisuMZ[_0x3b3044(0x1c6)][_0x3b3044(0x1b2)][_0x3b3044(0x196)](this,_0x3f8f04),this[_0x3b3044(0x181)]();},Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x181)]=function(){const _0x482f7a=_0x4b5858;if(!this[_0x482f7a(0x219)]())return;if(!VisuMZ[_0x482f7a(0x1c6)][_0x482f7a(0x215)]['ShowTooltip'])return;this[_0x482f7a(0x1b6)]=new Window_VisualItemTooltip(this),SceneManager['_scene'][_0x482f7a(0x1cd)](this[_0x482f7a(0x1b6)]);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x16c)]=Window_ItemList['prototype'][_0x4b5858(0x16a)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x16a)]=function(){const _0x154ff5=_0x4b5858;VisuMZ[_0x154ff5(0x1c6)][_0x154ff5(0x16c)][_0x154ff5(0x196)](this),this[_0x154ff5(0x1b6)]&&(this[_0x154ff5(0x1b6)][_0x154ff5(0x16d)](this['item']()),this[_0x154ff5(0x1d0)]&&this[_0x154ff5(0x1b6)][_0x154ff5(0x1b3)]());},VisuMZ['VisualItemInv'][_0x4b5858(0x203)]=Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1ce)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1ce)]=function(_0xe9b3f0){const _0x4289f2=_0x4b5858;this[_0x4289f2(0x219)]()?this[_0x4289f2(0x1b9)](_0xe9b3f0):VisuMZ[_0x4289f2(0x1c6)][_0x4289f2(0x203)][_0x4289f2(0x196)](this,_0xe9b3f0);const _0x4a5765=this[_0x4289f2(0x1de)](_0xe9b3f0);this[_0x4289f2(0x207)](_0x4a5765);},Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x1b9)]=function(_0x9bfb4f){const _0x26e174=_0x4b5858,_0x1ec6ef=this['itemAt'](_0x9bfb4f);if(!_0x1ec6ef){VisuMZ[_0x26e174(0x1c6)][_0x26e174(0x203)][_0x26e174(0x196)](this,_0x9bfb4f);return;}const _0x1eb8ff=VisuMZ[_0x26e174(0x1c6)][_0x26e174(0x20f)],_0x24eaa=_0x1ec6ef[_0x26e174(0x19b)];let _0x589421=ColorManager['itemBackColor1'](),_0x476587=ColorManager[_0x26e174(0x1be)]();_0x24eaa[_0x26e174(0x1f5)](_0x1eb8ff[_0x26e174(0x190)])&&(_0x589421=ColorManager[_0x26e174(0x187)](Number(RegExp['$1'])));_0x24eaa['match'](_0x1eb8ff[_0x26e174(0x1fe)])&&(_0x476587=ColorManager[_0x26e174(0x187)](Number(RegExp['$1'])));_0x24eaa[_0x26e174(0x1f5)](_0x1eb8ff[_0x26e174(0x1e1)])&&(_0x589421='#'+String(RegExp['$1']));_0x24eaa[_0x26e174(0x1f5)](_0x1eb8ff[_0x26e174(0x200)])&&(_0x476587='#'+String(RegExp['$1']));const _0x2d42dc=this[_0x26e174(0x1de)](_0x9bfb4f),_0xd636ac=_0x2d42dc['x'],_0x16c004=_0x2d42dc['y'],_0xf175c=_0x2d42dc['width'],_0x58a400=_0x2d42dc['height'];this[_0x26e174(0x21e)][_0x26e174(0x178)]=0xff,this['contentsBack']['gradientFillRect'](_0xd636ac,_0x16c004,_0xf175c,_0x58a400,_0x589421,_0x476587,!![]),this[_0x26e174(0x21e)][_0x26e174(0x1ef)](_0xd636ac,_0x16c004,_0xf175c,_0x58a400,_0x589421);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x1ac)]=function(_0x343b4b){const _0x565eec=_0x4b5858;_0x343b4b=_0x343b4b[_0x565eec(0x1d7)]('#','');_0x343b4b[_0x565eec(0x170)]===0x3&&(_0x343b4b=_0x343b4b[0x0]+_0x343b4b[0x0]+_0x343b4b[0x1]+_0x343b4b[0x1]+_0x343b4b[0x2]+_0x343b4b[0x2]);var _0x29713d=parseInt(_0x343b4b['substring'](0x0,0x2),0x10),_0xb745e=parseInt(_0x343b4b[_0x565eec(0x20d)](0x2,0x4),0x10),_0x554c82=parseInt(_0x343b4b[_0x565eec(0x20d)](0x4,0x6),0x10);return'rgba('+_0x29713d+','+_0xb745e+','+_0x554c82+','+'0.5'+')';},VisuMZ['VisualItemInv']['Window_Base_drawItemNumber']=Window_Base[_0x4b5858(0x21f)][_0x4b5858(0x221)],Window_Base[_0x4b5858(0x21f)][_0x4b5858(0x221)]=function(_0x8c5189,_0x455462,_0x4627b6,_0x16ce0a){const _0x54c3ae=_0x4b5858;this[_0x54c3ae(0x219)]&&this['usesVisualItemInventory']()?this[_0x54c3ae(0x21a)](_0x8c5189,_0x455462,_0x4627b6,_0x16ce0a):VisuMZ[_0x54c3ae(0x1c6)]['Window_Base_drawItemNumber'][_0x54c3ae(0x196)](this,_0x8c5189,_0x455462,_0x4627b6,_0x16ce0a);},Window_Base['prototype']['drawItemNumberVisualItemInventory']=function(_0x292656,_0xdd5f8e,_0x3a1f84,_0x15e93b){const _0x3688b6=_0x4b5858;if(this[_0x3688b6(0x185)](_0x292656)){this['setupVisualItemInvFontSettings']();const _0x3fd4c4=VisuMZ['ItemsEquipsCore'][_0x3688b6(0x215)][_0x3688b6(0x16f)],_0x837d30=_0x3fd4c4[_0x3688b6(0x197)],_0x5f445e=_0x837d30[_0x3688b6(0x1b0)]($gameParty[_0x3688b6(0x17a)](_0x292656));this[_0x3688b6(0x1f7)]['fontSize']=_0x3fd4c4[_0x3688b6(0x211)],this[_0x3688b6(0x202)](_0x5f445e,_0xdd5f8e,_0x3a1f84,_0x15e93b,_0x3688b6(0x1a0)),this[_0x3688b6(0x1d4)]();}},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x204)]=Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x19e)],Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x19e)]=function(_0x58f103){const _0x513d57=_0x4b5858;this[_0x513d57(0x219)]()?this[_0x513d57(0x1f0)](_0x58f103):VisuMZ[_0x513d57(0x1c6)][_0x513d57(0x204)][_0x513d57(0x196)](this,_0x58f103);},Window_ItemList['prototype'][_0x4b5858(0x1f0)]=function(_0x38a652){const _0x1fa2bb=_0x4b5858;if(!Imported[_0x1fa2bb(0x213)])return;const _0x55e9fc=this[_0x1fa2bb(0x220)](_0x38a652);if(!_0x55e9fc||!this['isShowNew']())return;if(!$gameParty[_0x1fa2bb(0x208)](_0x55e9fc))return;const _0x509cd2=this[_0x1fa2bb(0x1b4)](_0x38a652),_0x3f3c88=_0x509cd2['x'],_0x1fef23=_0x509cd2['y'],_0x4cb3d3=VisuMZ[_0x1fa2bb(0x209)][_0x1fa2bb(0x215)]['New'][_0x1fa2bb(0x1fc)],_0x22ff83=VisuMZ[_0x1fa2bb(0x209)]['Settings'][_0x1fa2bb(0x180)][_0x1fa2bb(0x1d5)];this[_0x1fa2bb(0x17b)](_0x55e9fc,_0x3f3c88+_0x4cb3d3,_0x1fef23+_0x22ff83);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x176)]=Window_ItemList[_0x4b5858(0x21f)]['placeItemQuestLabel'],Window_ItemList['prototype'][_0x4b5858(0x1e9)]=function(_0x5176d1){const _0x95d6d4=_0x4b5858;this[_0x95d6d4(0x219)]()?this[_0x95d6d4(0x21d)](_0x5176d1):VisuMZ[_0x95d6d4(0x1c6)]['Window_ItemList_placeItemQuestLabel']['call'](this,_0x5176d1);},Window_ItemList[_0x4b5858(0x21f)][_0x4b5858(0x21d)]=function(_0xa087c3){const _0x18051c=_0x4b5858;if(!Imported[_0x18051c(0x1a6)])return;const _0x256027=this[_0x18051c(0x220)](_0xa087c3);if(!_0x256027||!this[_0x18051c(0x186)]())return;if(!$gameParty[_0x18051c(0x1a5)](_0x256027))return;const _0x79ab20=this[_0x18051c(0x1b4)](_0xa087c3),_0x5854b4=_0x79ab20['x'],_0x332b4d=_0x79ab20['y'],_0xbce95=VisuMZ['QuestSystem']['Settings'][_0x18051c(0x1f3)][_0x18051c(0x1fc)],_0x3489e3=VisuMZ['QuestSystem']['Settings']['Label'][_0x18051c(0x1d5)];this[_0x18051c(0x18a)](_0x256027,_0x5854b4+_0xbce95,_0x332b4d+_0x3489e3);},Window_ItemList['prototype'][_0x4b5858(0x17c)]=function(_0x540fae){const _0x1af20c=_0x4b5858,_0x106760=this[_0x1af20c(0x1b4)](_0x540fae);this[_0x1af20c(0x1e2)](this[_0x1af20c(0x1fb)](null)),this[_0x1af20c(0x1d4)]();const _0x3516f9=Window_BattleItem['ITEM_AMPLIFY_SETTINGS'][_0x1af20c(0x1db)];this[_0x1af20c(0x1c4)](_0x3516f9,_0x106760);},VisuMZ[_0x4b5858(0x1c6)]['Window_EquipItem_maxCols']=Window_EquipItem[_0x4b5858(0x21f)][_0x4b5858(0x1f9)],Window_EquipItem[_0x4b5858(0x21f)][_0x4b5858(0x1f9)]=function(){const _0x18dd6e=_0x4b5858;return this['usesVisualItemInventory']()?Window_ItemList[_0x18dd6e(0x21f)]['maxCols']['call'](this):VisuMZ[_0x18dd6e(0x1c6)]['Window_EquipItem_maxCols'][_0x18dd6e(0x196)](this);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x195)]=Window_EquipItem['prototype'][_0x4b5858(0x212)],Window_EquipItem['prototype'][_0x4b5858(0x212)]=function(){const _0x17e2e0=_0x4b5858;return this[_0x17e2e0(0x219)]()?Window_ItemList[_0x17e2e0(0x21f)][_0x17e2e0(0x212)][_0x17e2e0(0x196)](this):VisuMZ['VisualItemInv'][_0x17e2e0(0x195)][_0x17e2e0(0x196)](this);},Window_EquipItem[_0x4b5858(0x21f)][_0x4b5858(0x21b)]=function(_0x36d5ce){const _0x2997c4=_0x4b5858,_0xcbbbc6=this[_0x2997c4(0x1b4)](_0x36d5ce),_0x990c76=VisuMZ[_0x2997c4(0x209)]['Settings'][_0x2997c4(0x16e)],_0x38d01e=_0x990c76[_0x2997c4(0x173)];this[_0x2997c4(0x1e2)](![]),this[_0x2997c4(0x1c4)](_0x38d01e,_0xcbbbc6),this[_0x2997c4(0x1e2)](!![]);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x179)]=Window_ShopSell['prototype'][_0x4b5858(0x1f9)],Window_ShopSell[_0x4b5858(0x21f)][_0x4b5858(0x1f9)]=function(){const _0x2dac73=_0x4b5858;return this['usesVisualItemInventory']()?Window_ItemList[_0x2dac73(0x21f)]['maxCols'][_0x2dac73(0x196)](this):VisuMZ[_0x2dac73(0x1c6)][_0x2dac73(0x179)][_0x2dac73(0x196)](this);},VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x184)]=Window_ShopSell[_0x4b5858(0x21f)][_0x4b5858(0x212)],Window_ShopSell['prototype'][_0x4b5858(0x212)]=function(){const _0x294f31=_0x4b5858;return this['usesVisualItemInventory']()?Window_ItemList['prototype'][_0x294f31(0x212)][_0x294f31(0x196)](this):VisuMZ[_0x294f31(0x1c6)]['Window_ShopSell_colSpacing'][_0x294f31(0x196)](this);};function _0x55ad(_0x36ac65,_0x363e63){const _0x41a7e6=_0x41a7();return _0x55ad=function(_0x55ad8f,_0x58fdf1){_0x55ad8f=_0x55ad8f-0x16a;let _0x5e92a4=_0x41a7e6[_0x55ad8f];return _0x5e92a4;},_0x55ad(_0x36ac65,_0x363e63);}function _0x41a7(){const _0x56b049=['OffsetX','filter','bgColorNum2','active','bgColorHex2','iconHeight','drawText','Window_ItemList_drawItemBackground','Window_ItemList_placeItemNewLabel','STRUCT','_item','drawBackgroundRect','isNewItem','ItemsEquipsCore','74701NitbXe','padding','TooltipBgType','substring','updateVisibility','RegExp','JSON','ItemQuantityFontSize','colSpacing','VisuMZ_1_ItemsEquipsCore','OutlineSize','Settings','setupVisualItemInvFontSettings','lineHeight','_windowLayer','usesVisualItemInventory','drawItemNumberVisualItemInventory','drawRemoveItem','TooltipFontSize','placeItemQuestLabelVisualItemInventory','contentsBack','prototype','itemAt','drawItemNumber','Window_ItemList_rowSpacing','initialize','blt','parameters','outlineWidth','updatePadding','callUpdateHelp','trim','Window_ItemList_callUpdateHelp','setItem','EquipScene','ItemScene','length','resetTextColor','getItemColor','RemoveEquipIcon','Window_ItemList_drawItemNumber','ConvertParams','Window_ItemList_placeItemQuestLabel','STR','paintOpacity','Window_ShopSell_maxCols','numItems','placeNewLabel','drawItemAmplifyConfirm','drawBigItemIcon','drawBigItemPicture','floor','New','createVisualItemInventoryTooltipWindow','center','1210covEkE','Window_ShopSell_colSpacing','isDrawItemNumber','isShowQuest','textColor','status','visualPicture','placeQuestLabel','visible','Window_ItemList_drawItem','FONT_SIZE','192iGTpYV','description','bgColorNum1','_context','IconSmoothing','refreshReturnCheck','updatePosition','Window_EquipItem_colSpacing','call','ItemQuantityFmt','ARRAYFUNC','ARRAYSTRUCT','Constructors','note','fontSize','includes','placeItemNewLabel','clear','right','IconSet','402614hybPam','drawItem','min','isQuestItem','VisuMZ_2_QuestSystem','630944WMyrVB','max','createContents','ARRAYNUM','VISUAL_ITEM_OUTLINE_SIZE','ConvertHexToRgba','FUNC','_scene','41347CFOxIa','format','BUFFER_WIDTH','Window_ItemList_initialize','refresh','itemRectWithPadding','height','_visualItemInventoryTooltipWindow','return\x200','scale','drawItemBackgroundVisualItemInventory','EVAL','name','54sZjGNQ','rowSpacing','itemBackColor2','_visualItemHeight','TooltipBufferWidth','VISUAL_ITEM_ICON_SIZE','innerWidth','3108rMdkMI','drawBigIcon','imageSmoothingEnabled','VisualItemInv','VISUAL_ITEM_CONSTRUCTORS','width','create','ARRAYSTR','Window_ItemList_maxCols','ARRAYJSON','addChild','drawItemBackground','IconSize','_amplifySkill','setBackgroundType','bind','round','resetFontSettings','OffsetY','update','replace','clamp','textWidth','getItemName','confirmIcon','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_parentWindow','itemRect','VISUAL_ITEM_OUTLINE_COLOR','TooltipOffsetX','bgColorHex1','changePaintOpacity','3451nbmuBA','Window_Selectable_itemHeight','parse','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ceil','OFFSET_Y','placeItemQuestLabel','drawItemVisualItemInventory','2386415RYqagH','constructor','VISUAL_ITEM_ICON_SMOOTHING','ITEM_AMPLIFY_CONFIRM','strokeRect','placeItemNewLabelVisualItemInventory','33296mJpHvo','backOpacity','Label','Window_ItemList_colSpacing','match','exit','contents','map','maxCols','OutlineColor','isEnabled'];_0x41a7=function(){return _0x56b049;};return _0x41a7();}function Window_VisualItemTooltip(){const _0xecbf3b=_0x4b5858;this[_0xecbf3b(0x223)](...arguments);}Window_VisualItemTooltip['prototype']=Object[_0x4b5858(0x1c9)](Window_Base[_0x4b5858(0x21f)]),Window_VisualItemTooltip[_0x4b5858(0x21f)][_0x4b5858(0x1ec)]=Window_VisualItemTooltip,Window_VisualItemTooltip['BG_TYPE']=VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x215)][_0x4b5858(0x20c)],Window_VisualItemTooltip[_0x4b5858(0x1b1)]=VisuMZ[_0x4b5858(0x1c6)]['Settings'][_0x4b5858(0x1c0)],Window_VisualItemTooltip[_0x4b5858(0x18d)]=VisuMZ[_0x4b5858(0x1c6)][_0x4b5858(0x215)][_0x4b5858(0x21c)],Window_VisualItemTooltip['OFFSET_X']=VisuMZ['VisualItemInv'][_0x4b5858(0x215)][_0x4b5858(0x1e0)],Window_VisualItemTooltip[_0x4b5858(0x1e8)]=VisuMZ['VisualItemInv'][_0x4b5858(0x215)]['TooltipOffsetY'],Window_VisualItemTooltip[_0x4b5858(0x21f)][_0x4b5858(0x223)]=function(_0x97db27){const _0x23dc88=_0x4b5858;this[_0x23dc88(0x1dd)]=_0x97db27;const _0x1b173f=new Rectangle(0x0,0x0,0x0,this[_0x23dc88(0x217)]());Window_Base[_0x23dc88(0x21f)][_0x23dc88(0x223)][_0x23dc88(0x196)](this,_0x1b173f),this[_0x23dc88(0x18b)]=![],this[_0x23dc88(0x1f2)]=0xff,this['opacity']=0xff,this[_0x23dc88(0x206)]=null;},Window_VisualItemTooltip['prototype'][_0x4b5858(0x227)]=function(){this['padding']=0x0;},Window_VisualItemTooltip[_0x4b5858(0x21f)][_0x4b5858(0x16d)]=function(_0x1c8084){const _0x175092=_0x4b5858;if(this[_0x175092(0x206)]===_0x1c8084&&!this[_0x175092(0x1d0)])return;this[_0x175092(0x206)]=_0x1c8084,this[_0x175092(0x1b3)]();},Window_VisualItemTooltip[_0x4b5858(0x21f)][_0x4b5858(0x193)]=function(){const _0x4ec45b=_0x4b5858;if(this[_0x4ec45b(0x1dd)]&&this['_parentWindow'][_0x4ec45b(0x1d0)]){if(!this['_item'])return!![];}return!!this[_0x4ec45b(0x206)];},Window_VisualItemTooltip[_0x4b5858(0x21f)]['getItemName']=function(){const _0x344e7b=_0x4b5858;if(this[_0x344e7b(0x1dd)]&&this['_parentWindow'][_0x344e7b(0x1d0)]&&!this[_0x344e7b(0x206)])return TextManager[_0x344e7b(0x1ee)];return this['_item']?this['_item']['name']:'';},Window_VisualItemTooltip[_0x4b5858(0x21f)][_0x4b5858(0x1b3)]=function(){const _0x5e1b15=_0x4b5858;this['contents'][_0x5e1b15(0x19f)]();if(!this[_0x5e1b15(0x193)]())return;this[_0x5e1b15(0x1d4)](),this[_0x5e1b15(0x1f7)][_0x5e1b15(0x19c)]=Window_VisualItemTooltip[_0x5e1b15(0x18d)];const _0x400122=this[_0x5e1b15(0x1da)](),_0x2495ff=this[_0x5e1b15(0x1d9)](_0x400122)+Window_VisualItemTooltip[_0x5e1b15(0x1b1)];this[_0x5e1b15(0x1c8)]=Math[_0x5e1b15(0x1e7)](_0x2495ff),this[_0x5e1b15(0x1a9)](),this['contents'][_0x5e1b15(0x19c)]=Window_VisualItemTooltip[_0x5e1b15(0x18d)];if(Imported['VisuMZ_1_ItemsEquipsCore']){const _0x3478a2=ColorManager[_0x5e1b15(0x172)](this[_0x5e1b15(0x206)]);this['changeTextColor'](_0x3478a2);}this[_0x5e1b15(0x202)](_0x400122,0x0,0x0,this[_0x5e1b15(0x1c2)],_0x5e1b15(0x182)),this[_0x5e1b15(0x171)](),this[_0x5e1b15(0x1d1)](Window_VisualItemTooltip['BG_TYPE']);},Window_VisualItemTooltip['prototype']['update']=function(){const _0x436833=_0x4b5858;Window_Base['prototype'][_0x436833(0x1d6)][_0x436833(0x196)](this),this[_0x436833(0x20e)](),this['updatePosition']();},Window_VisualItemTooltip[_0x4b5858(0x21f)]['updateVisibility']=function(){const _0x464803=_0x4b5858,_0x16b639=this[_0x464803(0x18b)];this['visible']=this['_item']&&this[_0x464803(0x1dd)][_0x464803(0x1ff)]&&this['_parentWindow']['isOpen'](),this['_parentWindow']&&this[_0x464803(0x1dd)][_0x464803(0x1d0)]&&!this[_0x464803(0x206)]&&(this[_0x464803(0x18b)]=!![]),_0x16b639!==this[_0x464803(0x18b)]&&SceneManager[_0x464803(0x1ae)]['addChild'](this);},Window_VisualItemTooltip[_0x4b5858(0x21f)][_0x4b5858(0x194)]=function(){const _0x480c46=_0x4b5858;if(!this[_0x480c46(0x18b)])return;const _0x538f9b=SceneManager[_0x480c46(0x1ae)][_0x480c46(0x218)],_0x166a83=this[_0x480c46(0x1dd)];let _0xd6485e=_0x166a83['x']+_0x538f9b['x'],_0x293b99=_0x166a83['y']+_0x538f9b['y'];const _0xc806f4=_0x166a83['_cursorRect'],_0x54d319=_0x166a83['_clientArea'],_0x54fc14=_0x166a83[_0x480c46(0x1b8)]['x'],_0x21395a=_0x166a83['scale']['y'];_0xd6485e+=_0xc806f4['x']*_0x54fc14+_0xc806f4[_0x480c46(0x1c8)]*_0x54fc14/0x2-this[_0x480c46(0x1c8)]/0x2+_0x54d319['x']*_0x54fc14,_0x293b99+=_0xc806f4['y']*_0x21395a-this[_0x480c46(0x1b5)]+_0x54d319['y']*_0x21395a;let _0xebdce3=_0x166a83['y']+_0x538f9b['y']-this['height']+_0x166a83[_0x480c46(0x20b)]*_0x21395a;_0xebdce3+=Window_VisualItemTooltip[_0x480c46(0x1e8)],_0xd6485e+=Window_VisualItemTooltip['OFFSET_X'],_0x293b99+=Window_VisualItemTooltip[_0x480c46(0x1e8)],this['x']=Math['round'](_0xd6485e)['clamp'](0x0,Graphics[_0x480c46(0x1c8)]-this['width']),this['y']=Math[_0x480c46(0x1d3)](_0x293b99)[_0x480c46(0x1d8)](0x0,Graphics[_0x480c46(0x1b5)]-this[_0x480c46(0x1b5)]);};