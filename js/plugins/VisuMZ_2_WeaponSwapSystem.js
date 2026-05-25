//=============================================================================
// VisuStella MZ - Weapon Swap System
// VisuMZ_2_WeaponSwapSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_WeaponSwapSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponSwapSystem = VisuMZ.WeaponSwapSystem || {};
VisuMZ.WeaponSwapSystem.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [WeaponSwapSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Swap_System_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds in a Weapon Swap System. Actors can equip a different
 * weapon for each weapon type available for use. These weapons can be swapped
 * to and from during the middle of a battle. Swapping weapons can let the
 * player's team adapt to certain situations better or giving them the ability
 * to hit certain weapon weaknesses in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can equip multiple weapons, one for each weapon type.
 * * These weapons can be switched during the middle of battle.
 * * Choose to display only equippable weapon types in the Equip Menu or all
 *   of the possible weapon types.
 * * Have certain skills switch over to different equipped weapons when
 *   performing them.
 * * Shortcut keys to allow switching between weapon types easily when
 *   selecting commands.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
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
 * Dual Wielding
 * 
 * Dual Wielding properties have been disabled to allow for the Weapon Swap
 * System. There are too many conflicts between it and the Weapon Swap System.
 * There is simply no way around it.
 *
 * ---
 * 
 * Required Weapons
 * 
 * RPG Maker MZ's skills allowed for Required Weapons and needed the actor to
 * have any of the said weapon type(s) equipped upon usage. This function has
 * now been changed. Now, as long as the actor has any of the weapon types
 * available and a weapon attached to it, the actor will be able to use the
 * skill without needing to switch to that weapon first.
 * 
 * When using the skill, the actor will switch to the first available weapon
 * type if needed as long as it is a requirement.
 * 
 * ---
 * 
 * Locked Weapons and Sealed Weapons
 * 
 * Actors that can weapon swap are now immune to Lock Weapon and Seal Weapon
 * traits as they go against the nature of this plugin.
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
 * VisuMZ_1_ItemsEquipsCore
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === Skill Usage-Related Notetags ===
 * 
 * ---
 *
 * <Require Any Weapon>
 *
 * - Used for: Skill Notetags
 * - Requires the actor to have any weapon equipped in order to use the skill,
 *   regardless of the weapon's type.
 * - This does not affect enemies.
 *
 * ---
 *
 * <Switch to Weapon Type: id>
 * <Switch to Weapon Type: name>
 *
 * - Used for: Skill Notetags
 * - When using the skill, the actor will switch to the equipped weapon of the
 *   matching type.
 * - Replace 'id' with a number representing the weapon type's ID.
 * - Replace 'name' with the name of the weapon type.
 * - Weapon types are not the same as weapons. Weapon types are found in the
 *   Database > Types tab.
 * - This does not affect enemies.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * There's not too many mechanics that can be modified through the Plugin
 * Parameters, but the setting here will at least let you ease up on testing
 * battles from the database.
 *
 * ---
 *
 * Battle Test
 * 
 *   Equip All Weapons?:
 *   - Do you want to equip one of each weapon type during battle tests for
 *     all actors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * The following Plugin Parameters are dedicated towards modifying the UI
 * elements added through this plugin.
 *
 * ---
 *
 * Attack Command
 * 
 *   Change Attack Icon?:
 *   - Change the Attack command to show the weapon?
 *   - Or have it represent the Attack skill?
 * 
 *   Swap Shortcut?:
 *   - Allow shortcut to switch weapons while selecting the Attack command?
 * 
 *     Show Arrows?:
 *     - Show arrows to the left and right of the Attack command for an easy
 *       reminder of the shortcut?
 *
 * ---
 *
 * Swap Command
 * 
 *   Show Command?:
 *   - Show the Swap weapon command in the Actor Command Window?
 *   - The Swap weapon command will be listed by default after the Attack
 *     command.
 *     - If you do not have the Attack command, it will not be shown unless you
 *       add "Weapon Swap" to the battle command list.
 * 
 * 
 *   Swap Icon:
 *   - What icon do you wish to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Swap Name:
 *   - What text do you want to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Help: Swap:
 *   - Help text for Swap command.
 *
 * ---
 *
 * Equip Scene
 * 
 *   Show Unequippable?:
 *   - Show all weapon types in the equip scene?
 *   - Or only just the equippable ones?
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
 * Version 1.11: March 14, 2024
 * * Documentation Update!
 * ** Added "Locked Weapons and Sealed Weapons" to Major Changes.
 * * Feature Update!
 * ** Actors that can weapon swap are now immune to Lock Weapon and Seal Weapon
 *    traits as they go against the nature of this plugin.
 * 
 * Version 1.10: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused item duplication with the "Clear Equipment"
 *    command found in the equip scene. Fix made by Irina.
 * ** Fixed a bug that caused the optimize command to not factor in the weapons
 *    held by the current actor. Fix made by Irina.
 * 
 * Version 1.09: December 9, 2021
 * * Compatibility Update!
 * ** Changing classes via the Class Change System plugin should no longer dupe
 *    weapons under specific circumstances. Update made by Olivia.
 * * Feature Update!
 * ** Upon an actor's turn to input a command, if the actor is barefisted while
 *    having available swap weapons, it will default the choice to the first
 *    available slot. Update made by Olivia.
 * ** The barefisted equip would occur before because when navigating the equip
 *    menu, the switched weapon type would change to whatever is selected. If
 *    you go to a slot without any weapons equipped, it would be as having a
 *    barehanded setup.
 * 
 * Version 1.08: July 9, 2021
 * * Bug Fixes!
 * ** Removed a potential equipment duplication exploit with changing classes.
 *    Fix made by Olivia.
 * 
 * Version 1.07: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: June 25, 2021
 * * Bug Fixes!
 * ** Have the "Shortcut" plugin parameter off will no longer cause crashes.
 *    Fix made by Olivia.
 * 
 * Version 1.05: June 4, 2021
 * * Bug Fixes!
 * ** Fixed weapon swap notetags to have them occur naturally. Fix by Arisu.
 * 
 * Version 1.04: May 28, 2021
 * * Bug Fixes!
 * ** Cache clear will now occur when using automatic switching to update any
 *    cached stats for actors. Fix made by Olivia.
 * 
 * Version 1.03: May 21, 2021
 * * Bug Fixes!
 * ** Weapon type requirements for skills will the weapon type to be equipped
 *    as one of the available slots. Fix made by Olivia.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Shortcut arrows should no longer be visible when an actor has only one
 *    weapon to swap to and from. Fix made by Olivia.
 * * Compatibility Update!
 * ** Weapon Swap System should now be compatible with the Item and Equip
 *    Core's non-removable types setting. Update made by Irina.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Shortcut arrow now accounts for changes in the actor command window size
 *    when updated post-initialization. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Documentation updated for the "UI Settings Plugin Parameters":
 * *** The Swap weapon command will be listed by default after the Attack
 *     command.
 * **** If you do not have the Attack command, it will not be shown unless you
 *      add "Weapon Swap" to the battle command list.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > UI Settings > Help: Swap
 * **** Help text for Swap command.
 *
 * Version 1.00 Official Release Date: May 3, 2021
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
 * @param WeaponSwapSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for the Weapon Swap System.
 * @default {"Testing":"","BattleTestAllWeapons:eval":"true"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc UI settings for the Weapon Swap System.
 * @default {"AttackCommand":"","ChangeAttackIcon:eval":"true","SwapShortcut:eval":"true","ShowShortcutArrows:eval":"true","SwapCommand":"","ShowSwapCommand:eval":"false","SwapCommandIcon:num":"76","SwapCommandName:str":"Swap","EquipScene":"","ShowUnequippable:eval":"false"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Testing
 * @text Battle Test
 *
 * @param BattleTestAllWeapons:eval
 * @text Equip All Weapons?
 * @parent Testing
 * @type boolean
 * @on All Weapons
 * @off Just Settings
 * @desc Do you want to equip one of each weapon type during
 * battle tests for all actors?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param AttackCommand
 * @text Attack Command
 *
 * @param ChangeAttackIcon:eval
 * @text Change Attack Icon?
 * @parent AttackCommand
 * @type boolean
 * @on Represent Weapon
 * @off Represent Skill Icon
 * @desc Change the Attack command to show the weapon?
 * Or have it represent the Attack skill?
 * @default true
 *
 * @param SwapShortcut:eval
 * @text Swap Shortcut?
 * @parent AttackCommand
 * @type boolean
 * @on Allow Shortcut
 * @off Don't Use
 * @desc Allow shortcut to switch weapons while selecting
 * the Attack command?
 * @default true
 *
 * @param ShowShortcutArrows:eval
 * @text Show Arrows?
 * @parent SwapShortcut:eval
 * @type boolean
 * @on Show Arrows
 * @off Hide Arrows
 * @desc Show arrows to the left and right of the Attack
 * command for an easy reminder of the shortcut?
 * @default true
 *
 * @param SwapCommand
 * @text Swap Command
 *
 * @param ShowSwapCommand:eval
 * @text Show Command?
 * @parent SwapCommand
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show the Swap weapon command in the
 * Actor Command Window?
 * @default true
 *
 * @param SwapCommandIcon:num
 * @text Swap Icon
 * @parent SwapCommand
 * @desc What icon do you wish to use to represent the
 * Swap command for the Actor Command Window?
 * @default 76
 *
 * @param SwapCommandName:str
 * @text Swap Name
 * @parent SwapCommand
 * @desc What text do you want to use to represent the
 * Swap command for the Actor Command Window?
 * @default Swap
 *
 * @param BattleHelpSwap:json
 * @text Help: Swap
 * @parent SwapCommand
 * @type note
 * @desc Help text for Swap command.
 * @default "Switch out the current weapon."
 *
 * @param EquipScene
 * @text Equip Scene
 *
 * @param ShowUnequippable:eval
 * @text Show Unequippable?
 * @parent EquipScene
 * @type boolean
 * @on All Weapons
 * @off Equippable Weapons
 * @desc Show all weapon types in the equip scene?
 * Or only just the equippable ones?
 * @default false
 *
 */
//=============================================================================

const _0xc72bd2=_0x1313;(function(_0x36dc00,_0x5e587a){const _0x2b47c8=_0x1313,_0x22661d=_0x36dc00();while(!![]){try{const _0x4283d3=-parseInt(_0x2b47c8(0x294))/0x1*(-parseInt(_0x2b47c8(0x1ff))/0x2)+-parseInt(_0x2b47c8(0x289))/0x3*(parseInt(_0x2b47c8(0x1b5))/0x4)+parseInt(_0x2b47c8(0x295))/0x5+-parseInt(_0x2b47c8(0x1c4))/0x6*(parseInt(_0x2b47c8(0x28a))/0x7)+-parseInt(_0x2b47c8(0x29a))/0x8+parseInt(_0x2b47c8(0x1bd))/0x9+parseInt(_0x2b47c8(0x1fb))/0xa;if(_0x4283d3===_0x5e587a)break;else _0x22661d['push'](_0x22661d['shift']());}catch(_0x5978c9){_0x22661d['push'](_0x22661d['shift']());}}}(_0xf850,0xa0e07));var label=_0xc72bd2(0x1e5),tier=tier||0x0,dependencies=[_0xc72bd2(0x229),_0xc72bd2(0x2a6)],pluginData=$plugins[_0xc72bd2(0x2ba)](function(_0x46bda5){const _0x310fea=_0xc72bd2;return _0x46bda5[_0x310fea(0x1fc)]&&_0x46bda5[_0x310fea(0x28f)][_0x310fea(0x2b3)]('['+label+']');})[0x0];VisuMZ[label][_0xc72bd2(0x25d)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x45b1fa,_0x171011){const _0x4080dc=_0xc72bd2;for(const _0x4f94f7 in _0x171011){if(_0x4080dc(0x28d)===_0x4080dc(0x1ee)){let _0x3d89f3=this[_0x4080dc(0x270)][_0x4080dc(0x26d)]()['length']-0x1;return _0x5542b0[_0x4080dc(0x1ad)]?_0x3d89f3+=_0x1a2577['weaponTypes'][_0x4080dc(0x2c2)]-0x1:_0x3d89f3+=this['_actor'][_0x4080dc(0x241)]()[_0x4080dc(0x2c2)],_0x3d89f3;}else{if(_0x4f94f7[_0x4080dc(0x25c)](/(.*):(.*)/i)){if(_0x4080dc(0x293)!==_0x4080dc(0x2c1)){const _0x4cfa0f=String(RegExp['$1']),_0x5e4c6f=String(RegExp['$2'])[_0x4080dc(0x243)]()['trim']();let _0x49461a,_0xa56097,_0xf33930;switch(_0x5e4c6f){case _0x4080dc(0x19c):_0x49461a=_0x171011[_0x4f94f7]!==''?Number(_0x171011[_0x4f94f7]):0x0;break;case'ARRAYNUM':_0xa56097=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):[],_0x49461a=_0xa56097['map'](_0x71c38c=>Number(_0x71c38c));break;case'EVAL':_0x49461a=_0x171011[_0x4f94f7]!==''?eval(_0x171011[_0x4f94f7]):null;break;case _0x4080dc(0x2bb):_0xa56097=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):[],_0x49461a=_0xa56097[_0x4080dc(0x21a)](_0x1bf4ee=>eval(_0x1bf4ee));break;case'JSON':_0x49461a=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):'';break;case _0x4080dc(0x1c5):_0xa56097=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):[],_0x49461a=_0xa56097[_0x4080dc(0x21a)](_0x16a58e=>JSON[_0x4080dc(0x2b6)](_0x16a58e));break;case'FUNC':_0x49461a=_0x171011[_0x4f94f7]!==''?new Function(JSON['parse'](_0x171011[_0x4f94f7])):new Function(_0x4080dc(0x234));break;case _0x4080dc(0x271):_0xa56097=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):[],_0x49461a=_0xa56097[_0x4080dc(0x21a)](_0x5760ca=>new Function(JSON[_0x4080dc(0x2b6)](_0x5760ca)));break;case'STR':_0x49461a=_0x171011[_0x4f94f7]!==''?String(_0x171011[_0x4f94f7]):'';break;case _0x4080dc(0x21b):_0xa56097=_0x171011[_0x4f94f7]!==''?JSON['parse'](_0x171011[_0x4f94f7]):[],_0x49461a=_0xa56097[_0x4080dc(0x21a)](_0x35d54d=>String(_0x35d54d));break;case'STRUCT':_0xf33930=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):{},_0x49461a=VisuMZ['ConvertParams']({},_0xf33930);break;case _0x4080dc(0x221):_0xa56097=_0x171011[_0x4f94f7]!==''?JSON[_0x4080dc(0x2b6)](_0x171011[_0x4f94f7]):[],_0x49461a=_0xa56097['map'](_0x42025b=>VisuMZ['ConvertParams']({},JSON['parse'](_0x42025b)));break;default:continue;}_0x45b1fa[_0x4cfa0f]=_0x49461a;}else _0x3a3457=_0x43820e,_0x3530d8=_0x33a3d0[_0x32ef40];}}}return _0x45b1fa;},(_0x614d9c=>{const _0x59e504=_0xc72bd2,_0x3be1a2=_0x614d9c[_0x59e504(0x203)];for(const _0x12cf19 of dependencies){if(!Imported[_0x12cf19]){if(_0x59e504(0x219)!==_0x59e504(0x219))return!this['nonRemovableEtypes']()[_0x59e504(0x2b3)](this[_0x59e504(0x24d)]());else{alert(_0x59e504(0x236)[_0x59e504(0x249)](_0x3be1a2,_0x12cf19)),SceneManager[_0x59e504(0x26e)]();break;}}}const _0x3a3ddc=_0x614d9c[_0x59e504(0x28f)];if(_0x3a3ddc['match'](/\[Version[ ](.*?)\]/i)){const _0x5d9232=Number(RegExp['$1']);_0x5d9232!==VisuMZ[label]['version']&&(_0x59e504(0x238)===_0x59e504(0x238)?(alert(_0x59e504(0x23d)[_0x59e504(0x249)](_0x3be1a2,_0x5d9232)),SceneManager[_0x59e504(0x26e)]()):(_0x1ba9cc['WeaponSwapSystem'][_0x59e504(0x1e1)][_0x59e504(0x264)](this),this[_0x59e504(0x21e)]()));}if(_0x3a3ddc['match'](/\[Tier[ ](\d+)\]/i)){const _0x53c348=Number(RegExp['$1']);_0x53c348<tier?(alert(_0x59e504(0x22d)['format'](_0x3be1a2,_0x53c348,tier)),SceneManager[_0x59e504(0x26e)]()):tier=Math[_0x59e504(0x26b)](_0x53c348,tier);}VisuMZ[_0x59e504(0x297)](VisuMZ[label][_0x59e504(0x25d)],_0x614d9c[_0x59e504(0x244)]);})(pluginData),VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x29f)]={'RequireAnyWpn':/<(?:REQUIRE|REQUIRES) ANY (?:WEAPON|WEAPONS)>/i,'SwitchWpnTypeNum':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i,'SwitchWpnTypeStr':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i},DataManager['getFirstOfEachWeaponType']=function(){const _0x2076e1=_0xc72bd2;if(this[_0x2076e1(0x272)])return this['_firstOfEachWeaponType'];this[_0x2076e1(0x272)]=[];for(let _0x4d4213=0x1;_0x4d4213<$dataSystem[_0x2076e1(0x2ab)][_0x2076e1(0x2c2)];_0x4d4213++){if(_0x2076e1(0x1f5)!==_0x2076e1(0x2a2)){const _0x2fe7c4=$dataWeapons['filter'](_0x328632=>_0x328632&&_0x328632[_0x2076e1(0x268)]===_0x4d4213),_0x5c0b0e=_0x2fe7c4[0x0]||null;if(!_0x5c0b0e){if(_0x2076e1(0x1e8)===_0x2076e1(0x28e)){if(this[_0x2076e1(0x24f)]()&&this[_0x2076e1(0x298)])return;else _0x442c3a[_0x2076e1(0x1e5)][_0x2076e1(0x279)][_0x2076e1(0x264)](this);}else console[_0x2076e1(0x1dc)](_0x2076e1(0x1ef)[_0x2076e1(0x249)]($dataSystem[_0x2076e1(0x2ab)][_0x4d4213][_0x2076e1(0x235)](/\\I\[(\d+)\]/gi,'')));}this[_0x2076e1(0x272)]['push'](_0x5c0b0e);}else this['_actor']&&this[_0x2076e1(0x270)][_0x2076e1(0x298)]&&(this[_0x2076e1(0x270)][_0x2076e1(0x298)]=_0x3acad3),_0x31178c[_0x2076e1(0x1e5)][_0x2076e1(0x225)][_0x2076e1(0x264)](this);}return this[_0x2076e1(0x272)][_0x2076e1(0x1dd)](null)[_0x2076e1(0x1dd)](undefined),this['_firstOfEachWeaponType'];},DataManager['getWtypeIdWithName']=function(_0x1223e3){const _0x3cf289=_0xc72bd2;_0x1223e3=_0x1223e3[_0x3cf289(0x243)]()[_0x3cf289(0x2bd)](),this[_0x3cf289(0x1cf)]=this['_wtypeIDs']||{};if(this[_0x3cf289(0x1cf)][_0x1223e3])return this[_0x3cf289(0x1cf)][_0x1223e3];for(let _0x4cbd44=0x1;_0x4cbd44<0x64;_0x4cbd44++){if(!$dataSystem['weaponTypes'][_0x4cbd44])continue;let _0x2b8324=$dataSystem[_0x3cf289(0x2ab)][_0x4cbd44][_0x3cf289(0x243)]()['trim']();_0x2b8324=_0x2b8324['replace'](/\x1I\[(\d+)\]/gi,''),_0x2b8324=_0x2b8324['replace'](/\\I\[(\d+)\]/gi,''),this[_0x3cf289(0x1cf)][_0x2b8324]=_0x4cbd44;}return this[_0x3cf289(0x1cf)][_0x3cf289(0x2bc)]=0x0,this['_wtypeIDs'][_0x1223e3]||0x0;},ImageManager[_0xc72bd2(0x1ea)]=VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x25d)]['UI'][_0xc72bd2(0x224)],TextManager[_0xc72bd2(0x1a6)]=VisuMZ[_0xc72bd2(0x1e5)]['Settings']['UI'][_0xc72bd2(0x1fa)],TextManager[_0xc72bd2(0x237)]=VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x25d)]['UI'][_0xc72bd2(0x1a3)]??_0xc72bd2(0x26c),VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x252)]=Game_Action[_0xc72bd2(0x251)][_0xc72bd2(0x1a2)],Game_Action[_0xc72bd2(0x251)][_0xc72bd2(0x1a2)]=function(){const _0x51520c=_0xc72bd2;VisuMZ[_0x51520c(0x1e5)][_0x51520c(0x252)][_0x51520c(0x264)](this),this[_0x51520c(0x1b0)]()&&this[_0x51520c(0x1b0)]()[_0x51520c(0x246)]()&&this[_0x51520c(0x267)]()&&this[_0x51520c(0x1b0)]()[_0x51520c(0x19d)](this[_0x51520c(0x213)]());},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x2a1)]=Game_BattlerBase[_0xc72bd2(0x251)][_0xc72bd2(0x1bc)],Game_BattlerBase[_0xc72bd2(0x251)][_0xc72bd2(0x1bc)]=function(_0x3cbaad){const _0x311099=_0xc72bd2;return VisuMZ[_0x311099(0x1e5)][_0x311099(0x2a1)]['call'](this,_0x3cbaad)&&this[_0x311099(0x240)](_0x3cbaad);},Game_BattlerBase[_0xc72bd2(0x251)][_0xc72bd2(0x240)]=function(_0x5ae497){return!![];},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x279)]=Game_Battler['prototype'][_0xc72bd2(0x21d)],Game_Battler[_0xc72bd2(0x251)]['requestMotionRefresh']=function(){const _0x50aa33=_0xc72bd2;if(this[_0x50aa33(0x24f)]()&&this['_swappingWeapon']){if(_0x50aa33(0x23b)!==_0x50aa33(0x23b))_0x474bc9[_0x50aa33(0x1ad)]?this[_0x50aa33(0x22c)]=_0x32e015+0x1:this['_wtypeID']=this[_0x50aa33(0x270)][_0x50aa33(0x241)]()[_0x3ab202],_0x45898f=0x0,_0x56bf50['WeaponSwapSystem']['Window_EquipItem_setSlotId'][_0x50aa33(0x264)](this,_0x3018fa),this['_actor'][_0x50aa33(0x22b)](this[_0x50aa33(0x22c)]),this[_0x50aa33(0x1c8)]&&this['_statusWindow'][_0x50aa33(0x230)]();else return;}else VisuMZ[_0x50aa33(0x1e5)][_0x50aa33(0x279)][_0x50aa33(0x264)](this);},Game_Actor['WEAPON_SWAP_BATTLE_TEST_ALL_WEAPONS']=VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x25d)][_0xc72bd2(0x29b)][_0xc72bd2(0x1d9)],VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x283)]=Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x27b)],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x27b)]=function(_0x2c9400){const _0x2f0fe2=_0xc72bd2;VisuMZ[_0x2f0fe2(0x1e5)]['Game_Actor_initEquips'][_0x2f0fe2(0x264)](this,_0x2c9400),this[_0x2f0fe2(0x288)]();},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x288)]=function(){const _0x4dcfca=_0xc72bd2;this['_swapWeapons']={};for(let _0x562814=0x1;_0x562814<$dataSystem[_0x4dcfca(0x2ab)][_0x4dcfca(0x2c2)];_0x562814++){this[_0x4dcfca(0x1bf)][_0x562814]=0x0;}this['_currentWeaponType']=0x0;for(const _0x33b101 of this[_0x4dcfca(0x1b8)]()){if(!_0x33b101)continue;const _0x22f727=_0x33b101[_0x4dcfca(0x268)];this[_0x4dcfca(0x1bf)][_0x22f727]=_0x33b101['id'],this[_0x4dcfca(0x255)]=this[_0x4dcfca(0x255)]||_0x22f727;}},Game_Actor[_0xc72bd2(0x251)]['canWeaponSwap']=function(){const _0x55f425=_0xc72bd2;return this[_0x55f425(0x26d)]()['includes'](0x1);},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x222)]=Game_Actor[_0xc72bd2(0x251)]['isDualWield'],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x257)]=function(){return![];},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x27e)]=Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x26d)],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x26d)]=function(){const _0x24bae3=_0xc72bd2;let _0x1fe790=VisuMZ[_0x24bae3(0x1e5)][_0x24bae3(0x27e)][_0x24bae3(0x264)](this);return _0x1fe790['includes'](0x1)&&(_0x1fe790['remove'](0x1),_0x1fe790['unshift'](0x1)),_0x1fe790;},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x241)]=function(){const _0xd70857=_0xc72bd2;let _0x4b0ecc=_0xd70857(0x241);if(this[_0xd70857(0x239)](_0x4b0ecc))return this[_0xd70857(0x208)][_0x4b0ecc];return this['_cache'][_0x4b0ecc]=this[_0xd70857(0x28b)](),this[_0xd70857(0x208)][_0x4b0ecc];},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x28b)]=function(){const _0x811ff4=_0xc72bd2,_0x559446=[],_0x40b84c=$dataSystem[_0x811ff4(0x2ab)]['length'];for(let _0x1d0cbe=0x1;_0x1d0cbe<_0x40b84c;_0x1d0cbe++){if('iUBQC'==='xmoOp')return this[_0x811ff4(0x26d)]()[_0x811ff4(0x2b3)](0x1);else{if(this[_0x811ff4(0x250)](_0x1d0cbe))_0x559446['push'](_0x1d0cbe);}}return _0x559446;},Game_Actor['prototype']['getSwapWeapon']=function(_0x58f00c){const _0x483742=_0xc72bd2;if(this[_0x483742(0x1bf)]===undefined){if(_0x483742(0x24e)===_0x483742(0x1af)){if(this[_0x483742(0x272)])return this['_firstOfEachWeaponType'];this[_0x483742(0x272)]=[];for(let _0xa53990=0x1;_0xa53990<_0x2ce84d[_0x483742(0x2ab)][_0x483742(0x2c2)];_0xa53990++){const _0x849640=_0xec94e8[_0x483742(0x2ba)](_0x4084fe=>_0x4084fe&&_0x4084fe['wtypeId']===_0xa53990),_0x24478e=_0x849640[0x0]||null;!_0x24478e&&_0x29fe73[_0x483742(0x1dc)]('MISSING\x20WEAPON\x20TYPE:\x20%1'[_0x483742(0x249)](_0x2ac1bb[_0x483742(0x2ab)][_0xa53990][_0x483742(0x235)](/\\I\[(\d+)\]/gi,''))),this[_0x483742(0x272)][_0x483742(0x1b7)](_0x24478e);}return this[_0x483742(0x272)][_0x483742(0x1dd)](null)[_0x483742(0x1dd)](_0x5ad350),this[_0x483742(0x272)];}else this['initWeaponSwapSystem']();}return this[_0x483742(0x1bf)][_0x58f00c]=this[_0x483742(0x1bf)][_0x58f00c]||0x0,$dataWeapons[this[_0x483742(0x1bf)][_0x58f00c]]||null;},Game_Actor['prototype']['getAllEquippedSwapWeapons']=function(){const _0xb874be=_0xc72bd2;return this[_0xb874be(0x241)]()['map'](_0x16c229=>this[_0xb874be(0x1ed)](_0x16c229))['remove'](null)['remove'](undefined);},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x231)]=function(_0x1df4f5,_0x35e052){const _0x24a6ae=_0xc72bd2;this['_swapWeapons']===undefined&&this[_0x24a6ae(0x288)](),this[_0x24a6ae(0x1bf)][_0x1df4f5]=_0x35e052,this[_0x24a6ae(0x230)]();},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x20e)]=function(){const _0x308a0c=_0xc72bd2;if(this[_0x308a0c(0x1bf)]===undefined){if(_0x308a0c(0x1ae)!=='OwmWa')this[_0x308a0c(0x288)]();else return _0x528a30[_0x308a0c(0x1e5)][_0x308a0c(0x220)]['call'](this,_0x447d2e,_0x2897c3);}const _0x42e85c=this['_currentWeaponType'],_0x572f0b=this[_0x308a0c(0x241)]();let _0x5b8142=_0x572f0b[_0x308a0c(0x1f6)](this['_currentWeaponType']);for(;;){_0x5b8142++;if(_0x5b8142>=_0x572f0b[_0x308a0c(0x2c2)])_0x5b8142=0x0;if(this[_0x308a0c(0x1ed)](_0x572f0b[_0x5b8142]))break;}const _0x4b4345=_0x572f0b[_0x5b8142];this['switchToWeaponType'](_0x4b4345),_0x4b4345!==_0x42e85c&&('lQMBH'===_0x308a0c(0x1f0)?(_0x22b269['WeaponSwapSystem'][_0x308a0c(0x207)]['call'](this),this['clearSwappableWeapons']()):this[_0x308a0c(0x1d3)](!![]));},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x202)]=function(){const _0x126fee=_0xc72bd2;this[_0x126fee(0x1bf)]===undefined&&(_0x126fee(0x1a0)===_0x126fee(0x21c)?this[_0x126fee(0x231)](_0x349233,_0x5ad889['id']):this[_0x126fee(0x288)]());const _0x78079c=this['_currentWeaponType'],_0x38f64f=this[_0x126fee(0x241)]();let _0x423075=_0x38f64f[_0x126fee(0x1f6)](this[_0x126fee(0x255)]);for(;;){_0x423075--;if(_0x423075<0x0)_0x423075=_0x38f64f['length']-0x1;if(this['getSwapWeapon'](_0x38f64f[_0x423075]))break;}const _0x32adac=_0x38f64f[_0x423075];this['switchToWeaponType'](_0x32adac),_0x32adac!==_0x78079c&&this[_0x126fee(0x1d3)](!![]);},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x1d3)]=function(_0x1f7285){const _0x3259dc=_0xc72bd2,_0x5c31fe=this[_0x3259dc(0x1b8)]()[0x0];if(_0x5c31fe&&_0x1f7285){if(_0x3259dc(0x1aa)!==_0x3259dc(0x1aa))return!this[_0x3259dc(0x286)]()[_0x3259dc(0x2b3)](this['etypeId']());else this[_0x3259dc(0x298)]=!![],this['performAttack']();}},Game_Actor[_0xc72bd2(0x251)]['switchToWeaponType']=function(_0x5d449e){const _0x55c871=_0xc72bd2;this['_swapWeapons']===undefined&&this['initWeaponSwapSystem']();_0x5d449e=_0x5d449e||0x0;if(!this[_0x55c871(0x277)]())return;if(!this['isEquipWtypeOk'](_0x5d449e))return;this[_0x55c871(0x255)]=_0x5d449e,this[_0x55c871(0x1bf)][_0x5d449e]=this[_0x55c871(0x1bf)][_0x5d449e]||0x0;const _0x14661a=$dataWeapons[this['_swapWeapons'][_0x5d449e]]||null;this[_0x55c871(0x260)][0x0][_0x55c871(0x216)](_0x14661a),this[_0x55c871(0x208)]={};},VisuMZ[_0xc72bd2(0x1e5)]['Game_Actor_changeEquip']=Game_Actor['prototype']['changeEquip'],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x28c)]=function(_0xa00a14,_0x5b6b19){const _0x37607f=_0xc72bd2;DataManager[_0x37607f(0x1e6)](_0x5b6b19)||_0xa00a14===0x0&&this[_0x37607f(0x277)]()?this[_0x37607f(0x1fe)](_0x5b6b19):VisuMZ[_0x37607f(0x1e5)][_0x37607f(0x269)][_0x37607f(0x264)](this,_0xa00a14,_0x5b6b19);},Game_Actor[_0xc72bd2(0x251)]['changeWeapon']=function(_0x32eb47){const _0x1711a6=_0xc72bd2;if(!!_0x32eb47){const _0x191ac0=_0x32eb47['wtypeId'];this[_0x1711a6(0x22b)](_0x191ac0);const _0xd81f07=this[_0x1711a6(0x1b8)]()[0x0];!!_0xd81f07?this[_0x1711a6(0x227)](_0x32eb47,_0xd81f07):this[_0x1711a6(0x227)](_0x32eb47,null),this[_0x1711a6(0x231)](_0x191ac0,_0x32eb47['id']),this[_0x1711a6(0x22b)](_0x191ac0);}else{if(!!this[_0x1711a6(0x1b8)]()[0x0]){const _0x4b2aee=this[_0x1711a6(0x1b8)]()[0x0],_0xe3288d=_0x4b2aee[_0x1711a6(0x268)];this[_0x1711a6(0x22b)](_0xe3288d),this['tradeItemWithParty'](null,_0x4b2aee),this[_0x1711a6(0x231)](_0xe3288d,0x0),this[_0x1711a6(0x1f9)]();}}this[_0x1711a6(0x230)]();},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x1f9)]=function(){const _0x520eca=_0xc72bd2;if(this['weapons']()[_0x520eca(0x2c2)]>0x0)return;const _0x46d206=this[_0x520eca(0x2a3)](),_0x4275d8=_0x46d206[0x0]||null,_0x667f63=_0x4275d8?_0x4275d8[_0x520eca(0x268)]:0x0;this[_0x520eca(0x22b)](_0x667f63);},Game_Actor[_0xc72bd2(0x251)]['processWeaponSwapRelease']=function(_0x35d539){const _0x190fa9=_0xc72bd2;if(this[_0x190fa9(0x2c3)]||_0x35d539||this[_0x190fa9(0x25f)])return;this[_0x190fa9(0x2c3)]=!![];let _0xe400e0=![];for(let _0x4c22a4=0x1;_0x4c22a4<$dataSystem[_0x190fa9(0x2ab)][_0x190fa9(0x2c2)];_0x4c22a4++){if(_0x190fa9(0x1ec)===_0x190fa9(0x1b1))return this[_0x190fa9(0x19e)](_0x3b9105);else{if(this[_0x190fa9(0x250)](_0x4c22a4))continue;const _0x2104be=this['getSwapWeapon'](_0x4c22a4);if(!_0x2104be)continue;this[_0x190fa9(0x1bf)][_0x4c22a4]=0x0,$gameParty['gainItem'](_0x2104be,0x1),_0xe400e0=!![],this['_equips'][0x0][_0x190fa9(0x1e9)]()===_0x2104be&&this[_0x190fa9(0x260)][0x0]['setObject'](null);}}if(_0xe400e0){if(_0x190fa9(0x1b9)!==_0x190fa9(0x23a)){const _0x24e932=this[_0x190fa9(0x1b8)]()[0x0]||null;this[_0x190fa9(0x255)]=_0x24e932?_0x24e932[_0x190fa9(0x268)]:0x0,this['refresh']();}else _0x208c7c('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x234f6d,_0x5f9506,_0x50fb57)),_0x4d487a[_0x190fa9(0x26e)]();}this[_0x190fa9(0x2c3)]=undefined;},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x2a8)]=Game_Actor[_0xc72bd2(0x251)]['releaseUnequippableItems'],Game_Actor['prototype'][_0xc72bd2(0x292)]=function(_0x23c111){const _0x407815=_0xc72bd2;this['processWeaponSwapRelease'](_0x23c111),VisuMZ[_0x407815(0x1e5)]['Game_Actor_releaseUnequippableItems'][_0x407815(0x264)](this,_0x23c111);},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x1d0)]=function(){const _0x443eeb=_0xc72bd2,_0x29d599=this[_0x443eeb(0x255)],_0x4a4126=DataManager[_0x443eeb(0x2b5)]();for(const _0x3c1c51 of this['weaponSwapTypes']()){if(this['getSwapWeapon'](_0x3c1c51))continue;const _0x33204d=_0x4a4126[_0x3c1c51-0x1];if(_0x33204d){if('gHFmZ'!=='Zhxse')this[_0x443eeb(0x231)](_0x3c1c51,_0x33204d['id']);else while(this['findSymbol'](_0x443eeb(0x1cc))>=0x0){const _0x4ed739=this[_0x443eeb(0x29d)](_0x443eeb(0x1cc));this[_0x443eeb(0x1b3)]['splice'](_0x4ed739,0x1);}}}this[_0x443eeb(0x22b)](_0x29d599);},Game_Actor['prototype']['meetsAnyWeaponEquippedCondition']=function(_0x451a0d){const _0x4a1272=_0xc72bd2;return _0x451a0d&&_0x451a0d[_0x4a1272(0x290)]['match'](VisuMZ['WeaponSwapSystem'][_0x4a1272(0x29f)][_0x4a1272(0x1d4)])?!!this[_0x4a1272(0x1b8)]()[0x0]:!![];},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x1f3)]=function(_0x33e67f){const _0x56b8f5=_0xc72bd2,_0x5d1f35=_0x33e67f['requiredWtypeId1'],_0x50a0d7=_0x33e67f['requiredWtypeId2'];if(_0x5d1f35===0x0&&_0x50a0d7===0x0)return!![];if(_0x5d1f35>0x0&&!this[_0x56b8f5(0x1ed)](_0x5d1f35))return![];if(_0x50a0d7>0x0&&!this[_0x56b8f5(0x1ed)](_0x50a0d7))return![];return!![];},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x19d)]=function(_0x315276){const _0x3f155b=_0xc72bd2;if(!DataManager[_0x3f155b(0x267)](_0x315276))return;const _0x55fb6f=VisuMZ[_0x3f155b(0x1e5)][_0x3f155b(0x29f)];if(_0x315276[_0x3f155b(0x290)][_0x3f155b(0x25c)](_0x55fb6f['SwitchWpnTypeNum'])){if(_0x3f155b(0x281)===_0x3f155b(0x281)){this['switchToWeaponType'](Number(RegExp['$1']));return;}else this['tradeItemWithParty'](_0x40f95a,null);}else{if(_0x315276['note'][_0x3f155b(0x25c)](_0x55fb6f[_0x3f155b(0x1d6)])){const _0x4be273=DataManager[_0x3f155b(0x1df)](RegExp['$1']);this[_0x3f155b(0x22b)](_0x4be273);return;}}if(this[_0x3f155b(0x1da)]===_0x315276[_0x3f155b(0x1fd)]||this['_currentweapontype']===_0x315276['requiredWtypeId2']){if(_0x3f155b(0x205)===_0x3f155b(0x275))this[_0x3f155b(0x227)](_0x25334c,_0x22af9e);else return;}if(_0x315276[_0x3f155b(0x1fd)]>0x0){if('udAKT'!==_0x3f155b(0x2b1))this[_0x3f155b(0x22b)](_0x315276['requiredWtypeId1']);else{const _0x5017e7=_0x4f18b6(_0x1c1da3['$1']);_0x5017e7!==_0x147bea[_0x48a35b][_0x3f155b(0x23f)]&&(_0x553dc9(_0x3f155b(0x23d)[_0x3f155b(0x249)](_0x2f9ca9,_0x5017e7)),_0x2a900e[_0x3f155b(0x26e)]());}}else{if(_0x315276[_0x3f155b(0x1b2)]>0x0){if('hMsTo'!==_0x3f155b(0x1e3))this[_0x3f155b(0x22b)](_0x315276[_0x3f155b(0x1b2)]);else{const _0x4cd4b6=_0x4515e2['weaponSwapTypes']()[_0x2a6c49];_0x549c36=_0x4ec90a[_0x3f155b(0x2ab)][_0x4cd4b6]||'';}}}},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x1e1)]=Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x211)],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x211)]=function(){const _0x53df43=_0xc72bd2;VisuMZ[_0x53df43(0x1e5)][_0x53df43(0x1e1)][_0x53df43(0x264)](this),this[_0x53df43(0x21e)]();},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x20b)]=Game_Actor['prototype'][_0xc72bd2(0x2be)],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x2be)]=function(_0x116e14){const _0x2b883f=_0xc72bd2;if(this[_0x2b883f(0x277)]()&&_0x116e14===0x0)return![];return VisuMZ[_0x2b883f(0x1e5)]['Game_Actor_isOptimizeEquipOk'][_0x2b883f(0x264)](this,_0x116e14);},Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x21e)]=function(){const _0x2d7b8c=_0xc72bd2;if(!this[_0x2d7b8c(0x277)]())return;if(!VisuMZ[_0x2d7b8c(0x1e5)][_0x2d7b8c(0x20b)][_0x2d7b8c(0x264)](this,0x0))return;const _0x10b0fc=this[_0x2d7b8c(0x255)];for(const _0x5efc62 of this['weaponSwapTypes']()){this[_0x2d7b8c(0x22b)](_0x5efc62),this[_0x2d7b8c(0x1fe)](this[_0x2d7b8c(0x19b)](_0x5efc62));}this['switchToWeaponType'](_0x10b0fc),this['refresh']();},Game_Actor['prototype'][_0xc72bd2(0x19b)]=function(_0x1bdf81){const _0x3cac59=_0xc72bd2,_0x27b594=$gameParty[_0x3cac59(0x1b8)]()['concat'](this['weapons']()),_0x3399a4=_0x27b594[_0x3cac59(0x2ba)](_0x42a84a=>_0x42a84a[_0x3cac59(0x268)]===_0x1bdf81);let _0xd5c535=null,_0x3537d6=-0x3e8;for(let _0x406ab0=0x0;_0x406ab0<_0x3399a4[_0x3cac59(0x2c2)];_0x406ab0++){const _0x4b48e8=this['calcEquipItemPerformance'](_0x3399a4[_0x406ab0]);_0x4b48e8>_0x3537d6&&(_0x3537d6=_0x4b48e8,_0xd5c535=_0x3399a4[_0x406ab0]);}return _0xd5c535;},VisuMZ[_0xc72bd2(0x1e5)]['Game_Actor_clearEquipments']=Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x23e)],Game_Actor[_0xc72bd2(0x251)]['clearEquipments']=function(){const _0x6f4842=_0xc72bd2;VisuMZ['WeaponSwapSystem'][_0x6f4842(0x207)][_0x6f4842(0x264)](this),this[_0x6f4842(0x1c2)]();},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x201)]=Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x1e4)],Game_Actor['prototype'][_0xc72bd2(0x1e4)]=function(_0x12f98b){const _0x101206=_0xc72bd2;if(this[_0x101206(0x277)]()&&_0x12f98b===0x0)return![];return VisuMZ[_0x101206(0x1e5)][_0x101206(0x201)][_0x101206(0x264)](this,_0x12f98b);},Game_Actor['prototype'][_0xc72bd2(0x1c2)]=function(){const _0x52c470=_0xc72bd2;if(!this['canWeaponSwap']())return;if(!VisuMZ['WeaponSwapSystem'][_0x52c470(0x201)][_0x52c470(0x264)](this,0x0))return;for(let _0x3f10c4=0x1;_0x3f10c4<$dataSystem[_0x52c470(0x2ab)]['length'];_0x3f10c4++){const _0x4ad561=this[_0x52c470(0x1ed)](_0x3f10c4);if(_0x4ad561){if('qaGLD'===_0x52c470(0x200))this[_0x52c470(0x22b)](_0x3f10c4),this[_0x52c470(0x1fe)](null);else{const _0x59e97b=[],_0x1ea8d9=_0x5116f1[_0x52c470(0x2ab)][_0x52c470(0x2c2)];for(let _0x522877=0x1;_0x522877<_0x1ea8d9;_0x522877++){if(this[_0x52c470(0x250)](_0x522877))_0x59e97b[_0x52c470(0x1b7)](_0x522877);}return _0x59e97b;}}}this['refresh']();},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x2b0)]=Game_Party['prototype'][_0xc72bd2(0x1f8)],Game_Party[_0xc72bd2(0x251)][_0xc72bd2(0x1f8)]=function(){const _0x29dc2a=_0xc72bd2;VisuMZ[_0x29dc2a(0x1e5)][_0x29dc2a(0x2b0)][_0x29dc2a(0x264)](this);for(const _0x22e205 of this[_0x29dc2a(0x206)]()){if(!_0x22e205)continue;_0x22e205[_0x29dc2a(0x1d0)]();}this[_0x29dc2a(0x2a4)]=!![];},Scene_Equip['prototype']['executeEquipChange']=function(){const _0x480a32=_0xc72bd2,_0x504414=this['actor'](),_0x4b339a=this[_0x480a32(0x2b9)]['_slotId'],_0x49faa6=this[_0x480a32(0x2b9)]['item']();_0x504414[_0x480a32(0x28c)](_0x4b339a,_0x49faa6);},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x256)]=Scene_Battle[_0xc72bd2(0x251)][_0xc72bd2(0x299)],Scene_Battle[_0xc72bd2(0x251)][_0xc72bd2(0x299)]=function(){const _0x112316=_0xc72bd2;VisuMZ[_0x112316(0x1e5)][_0x112316(0x256)]['call'](this);const _0x3bb633=this['_actorCommandWindow'];_0x3bb633[_0x112316(0x24c)](_0x112316(0x1cc),this[_0x112316(0x215)][_0x112316(0x23c)](this));},Scene_Battle[_0xc72bd2(0x251)]['commandWeaponSwap']=function(){const _0xfe371e=_0xc72bd2,_0x2ff6d5=BattleManager[_0xfe371e(0x2a0)]();_0x2ff6d5[_0xfe371e(0x20e)](),this[_0xfe371e(0x24a)][_0xfe371e(0x22e)](),this[_0xfe371e(0x24a)]['refresh']();},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x225)]=Sprite_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x2b2)],Sprite_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x2b2)]=function(){const _0x1bb228=_0xc72bd2;this[_0x1bb228(0x270)]&&this['_actor'][_0x1bb228(0x298)]&&(this[_0x1bb228(0x270)][_0x1bb228(0x298)]=undefined),VisuMZ[_0x1bb228(0x1e5)][_0x1bb228(0x225)][_0x1bb228(0x264)](this);},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x247)]=Window_Base[_0xc72bd2(0x251)][_0xc72bd2(0x263)],Window_Base[_0xc72bd2(0x251)][_0xc72bd2(0x263)]=function(){const _0x38db5b=_0xc72bd2;if(this[_0x38db5b(0x261)]['name']===_0x38db5b(0x1bb)&&this[_0x38db5b(0x2bf)]()==='weaponSwap')SoundManager[_0x38db5b(0x1a7)]();else{if(_0x38db5b(0x1cb)==='KeaKH')return![];else VisuMZ[_0x38db5b(0x1e5)]['Window_Base_playOkSound']['call'](this);}},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x220)]=Window_StatusBase[_0xc72bd2(0x251)]['actorSlotName'],Window_StatusBase[_0xc72bd2(0x251)]['actorSlotName']=function(_0x4b6b61,_0x7f12e0){const _0x276754=_0xc72bd2;return _0x4b6b61&&_0x4b6b61[_0x276754(0x277)]()?this['actorSlotNameWeaponSwap'](_0x4b6b61,_0x7f12e0):VisuMZ[_0x276754(0x1e5)][_0x276754(0x220)][_0x276754(0x264)](this,_0x4b6b61,_0x7f12e0);},Window_StatusBase['prototype'][_0xc72bd2(0x27c)]=function(_0xcccca5,_0x619a76){const _0x8810ad=_0xc72bd2;let _0x75bd96=_0xcccca5[_0x8810ad(0x241)]()[_0x8810ad(0x2c2)]-0x1;Window_EquipSlot[_0x8810ad(0x1ad)]&&(_0x75bd96=$dataSystem['weaponTypes'][_0x8810ad(0x2c2)]-0x2);if(_0x619a76>_0x75bd96)return _0x619a76-=_0x75bd96,VisuMZ['WeaponSwapSystem'][_0x8810ad(0x220)][_0x8810ad(0x264)](this,_0xcccca5,_0x619a76);else{let _0x5a4e64='';if(Window_EquipSlot[_0x8810ad(0x1ad)])_0x5a4e64=$dataSystem[_0x8810ad(0x2ab)][_0x619a76+0x1]||'';else{const _0x9f92c1=_0xcccca5[_0x8810ad(0x241)]()[_0x619a76];_0x5a4e64=$dataSystem['weaponTypes'][_0x9f92c1]||'';}return _0x5a4e64=_0x5a4e64[_0x8810ad(0x235)](/\\I\[(\d+)\]/gi,''),_0x5a4e64;}},Window_EquipSlot[_0xc72bd2(0x1ad)]=VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x25d)]['UI'][_0xc72bd2(0x248)],VisuMZ[_0xc72bd2(0x1e5)]['Window_EquipSlot_maxItems']=Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x266)],Window_EquipSlot['prototype'][_0xc72bd2(0x266)]=function(){const _0x326ea7=_0xc72bd2;return this[_0x326ea7(0x270)]&&this[_0x326ea7(0x270)][_0x326ea7(0x277)]()?this[_0x326ea7(0x1b6)]():VisuMZ[_0x326ea7(0x1e5)][_0x326ea7(0x27d)][_0x326ea7(0x264)](this);},Window_EquipSlot['prototype']['maxItemsWeaponSwap']=function(){const _0x1eca10=_0xc72bd2;let _0x5e3bf7=this['_actor'][_0x1eca10(0x26d)]()[_0x1eca10(0x2c2)]-0x1;if(Window_EquipSlot[_0x1eca10(0x1ad)])_0x5e3bf7+=$dataSystem[_0x1eca10(0x2ab)][_0x1eca10(0x2c2)]-0x1;else{if('kaMMQ'!==_0x1eca10(0x25a))return this['_swapWeapons']===_0x12295b&&this[_0x1eca10(0x288)](),this[_0x1eca10(0x1bf)][_0x5320be]=this['_swapWeapons'][_0x5b4a84]||0x0,_0x2073de[this['_swapWeapons'][_0x5cdf57]]||null;else _0x5e3bf7+=this['_actor'][_0x1eca10(0x241)]()[_0x1eca10(0x2c2)];}return _0x5e3bf7;},VisuMZ[_0xc72bd2(0x1e5)]['Window_EquipSlot_itemAt']=Window_EquipSlot['prototype']['itemAt'],Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x19a)]=function(_0x1d307f){const _0x4863fd=_0xc72bd2;if(this[_0x4863fd(0x270)]&&this[_0x4863fd(0x270)][_0x4863fd(0x277)]())return this[_0x4863fd(0x19e)](_0x1d307f);else{if(_0x4863fd(0x232)!==_0x4863fd(0x1a4))return VisuMZ[_0x4863fd(0x1e5)]['Window_EquipSlot_itemAt'][_0x4863fd(0x264)](this,_0x1d307f);else _0x45ce70[_0x4863fd(0x1dd)](0x1),_0x29ec01[_0x4863fd(0x1c0)](0x1);}},Window_EquipSlot[_0xc72bd2(0x251)]['itemAtWeaponSwap']=function(_0x65e94c){const _0x1fae3c=_0xc72bd2;let _0x36ab0e=this['_actor'][_0x1fae3c(0x241)]()[_0x1fae3c(0x2c2)]-0x1;Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x36ab0e=$dataSystem['weaponTypes'][_0x1fae3c(0x2c2)]-0x2);if(_0x65e94c>_0x36ab0e)return _0x1fae3c(0x204)!==_0x1fae3c(0x20f)?(_0x65e94c-=_0x36ab0e,VisuMZ[_0x1fae3c(0x1e5)][_0x1fae3c(0x1ac)][_0x1fae3c(0x264)](this,_0x65e94c)):this[_0x1fae3c(0x27c)](_0x59d17e,_0x6cd322);else{if(_0x1fae3c(0x1a9)!==_0x1fae3c(0x22a)){let _0x526365=this[_0x1fae3c(0x270)]['weaponSwapTypes']()[_0x65e94c];if(Window_EquipSlot[_0x1fae3c(0x1ad)]){if(_0x1fae3c(0x2a5)!==_0x1fae3c(0x2a5)){if(_0x9036dd<=0x0&&this['canWeaponSwap']())return![];return _0x3bc9e7['WeaponSwapSystem'][_0x1fae3c(0x22f)][_0x1fae3c(0x264)](this,_0x49f8c9);}else _0x526365=_0x65e94c+0x1;}return this[_0x1fae3c(0x270)][_0x1fae3c(0x1ed)](_0x526365);}else _0x56d04f[_0x1fae3c(0x1e5)][_0x1fae3c(0x254)][_0x1fae3c(0x264)](this,_0xb456b7),this[_0x1fae3c(0x2c0)]();}},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x217)]=Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x2ae)],Window_EquipSlot[_0xc72bd2(0x251)]['isEnabled']=function(_0x2e5ac3){const _0x510302=_0xc72bd2;if(this[_0x510302(0x270)]&&this['_actor'][_0x510302(0x277)]()){if(_0x510302(0x1de)===_0x510302(0x1de))return this[_0x510302(0x265)](_0x2e5ac3);else{const _0x2882f8=_0x4d095e(_0x116804['$1']);_0x2882f8<_0x2666e7?(_0x2abc3e(_0x510302(0x22d)[_0x510302(0x249)](_0x44638c,_0x2882f8,_0xd15403)),_0x585c63[_0x510302(0x26e)]()):_0x46c3f7=_0x4f9c88[_0x510302(0x26b)](_0x2882f8,_0x291317);}}else{if('RVdtW'!==_0x510302(0x253))_0x29e956=_0x20b63e+0x1;else return VisuMZ[_0x510302(0x1e5)][_0x510302(0x217)][_0x510302(0x264)](this,_0x2e5ac3);}},Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x265)]=function(_0x55b276){const _0x1185b6=_0xc72bd2;let _0x3720bf=this[_0x1185b6(0x270)]['weaponSwapTypes']()[_0x1185b6(0x2c2)]-0x1;Window_EquipSlot[_0x1185b6(0x1ad)]&&(_0x3720bf=$dataSystem[_0x1185b6(0x2ab)][_0x1185b6(0x2c2)]-0x2);if(_0x55b276>_0x3720bf)return _0x55b276-=_0x3720bf,VisuMZ[_0x1185b6(0x1e5)]['Window_EquipSlot_isEnabled']['call'](this,_0x55b276);else{if(!this[_0x1185b6(0x270)]['isEquipChangeOk'](0x0))return![];else return Window_EquipSlot[_0x1185b6(0x1ad)]?this[_0x1185b6(0x270)]['weaponSwapTypes']()[_0x1185b6(0x2b3)](_0x55b276+0x1):!![];}},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x20c)]=Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x2a7)],Game_Actor[_0xc72bd2(0x251)][_0xc72bd2(0x2a7)]=function(_0x1722dd){const _0x10ecbf=_0xc72bd2;if(_0x1722dd<=0x0&&this[_0x10ecbf(0x277)]())return!![];return VisuMZ['WeaponSwapSystem'][_0x10ecbf(0x20c)]['call'](this,_0x1722dd);},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x22f)]=Game_BattlerBase[_0xc72bd2(0x251)][_0xc72bd2(0x1f4)],Game_BattlerBase['prototype'][_0xc72bd2(0x1f4)]=function(_0x3b848c){const _0x3e670c=_0xc72bd2;if(_0x3b848c<=0x0&&this[_0x3e670c(0x277)]())return![];return VisuMZ[_0x3e670c(0x1e5)][_0x3e670c(0x22f)]['call'](this,_0x3b848c);},Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x242)]=function(){const _0x1af1f7=_0xc72bd2;SoundManager[_0x1af1f7(0x1a7)]();const _0x2bc3f3=SceneManager[_0x1af1f7(0x1c6)][_0x1af1f7(0x270)];this['_itemWindow'][_0x1af1f7(0x1a5)]>0x0?_0x2bc3f3['changeEquip'](this['_itemWindow']['_slotId'],null):(_0x2bc3f3[_0x1af1f7(0x22b)](this[_0x1af1f7(0x2b9)][_0x1af1f7(0x22c)]),_0x2bc3f3['changeWeapon'](null));this[_0x1af1f7(0x230)](),this['_itemWindow'][_0x1af1f7(0x230)](),this[_0x1af1f7(0x25b)]();const _0x2da759=SceneManager['_scene'][_0x1af1f7(0x1c8)];if(_0x2da759)_0x2da759['refresh']();},VisuMZ[_0xc72bd2(0x1e5)]['Window_EquipSlot_equipSlotIndex']=Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x296)],Window_EquipSlot[_0xc72bd2(0x251)][_0xc72bd2(0x296)]=function(){const _0x4849dc=_0xc72bd2;let _0x526884=VisuMZ[_0x4849dc(0x1e5)][_0x4849dc(0x212)],_0x5f231f=this['_actor'][_0x4849dc(0x241)]()[_0x4849dc(0x2c2)]-0x1;return Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']&&(_0x5f231f=$dataSystem[_0x4849dc(0x2ab)][_0x4849dc(0x2c2)]-0x2),Math[_0x4849dc(0x26b)](0x0,_0x526884-_0x5f231f);},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x1c3)]=Window_EquipItem['prototype'][_0xc72bd2(0x20a)],Window_EquipItem[_0xc72bd2(0x251)][_0xc72bd2(0x20a)]=function(_0xd8a4fc){const _0x444365=_0xc72bd2;VisuMZ['WeaponSwapSystem'][_0x444365(0x1c3)]['call'](this,_0xd8a4fc),this['_wtypeID']=0x0;},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x285)]=Window_EquipItem[_0xc72bd2(0x251)][_0xc72bd2(0x280)],Window_EquipItem[_0xc72bd2(0x251)][_0xc72bd2(0x280)]=function(_0x200184){const _0x2d36af=_0xc72bd2;if(!this[_0x2d36af(0x270)]){if(_0x2d36af(0x223)!==_0x2d36af(0x209))return VisuMZ['WeaponSwapSystem'][_0x2d36af(0x285)][_0x2d36af(0x264)](this,_0x200184);else _0x1f0888-=_0x1598e4,this[_0x2d36af(0x22c)]=0x0,_0x4b07d1[_0x2d36af(0x1e5)][_0x2d36af(0x285)][_0x2d36af(0x264)](this,_0x21b25d);}let _0x1c5746=this[_0x2d36af(0x270)][_0x2d36af(0x241)]()['length']-0x1;Window_EquipSlot[_0x2d36af(0x1ad)]&&(_0x1c5746=$dataSystem[_0x2d36af(0x2ab)][_0x2d36af(0x2c2)]-0x2),_0x200184>_0x1c5746?(_0x200184-=_0x1c5746,this[_0x2d36af(0x22c)]=0x0,VisuMZ[_0x2d36af(0x1e5)][_0x2d36af(0x285)]['call'](this,_0x200184)):_0x2d36af(0x262)===_0x2d36af(0x2aa)?this[_0x2d36af(0x2ad)]()?this[_0x2d36af(0x1d5)](![]):_0x495c59['prototype']['cursorLeft']['call'](this,_0x2971c5):(Window_EquipSlot['WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS']?this['_wtypeID']=_0x200184+0x1:_0x2d36af(0x1be)===_0x2d36af(0x1e0)?_0x10abb6=_0x138731['weaponTypes']['length']-0x2:this['_wtypeID']=this['_actor'][_0x2d36af(0x241)]()[_0x200184],_0x200184=0x0,VisuMZ[_0x2d36af(0x1e5)][_0x2d36af(0x285)][_0x2d36af(0x264)](this,_0x200184),this[_0x2d36af(0x270)]['switchToWeaponType'](this[_0x2d36af(0x22c)]),this[_0x2d36af(0x1c8)]&&this[_0x2d36af(0x1c8)]['refresh']());},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x258)]=Window_EquipItem['prototype']['includes'],Window_EquipItem[_0xc72bd2(0x251)][_0xc72bd2(0x2b3)]=function(_0xfee974){const _0x6f0451=_0xc72bd2;if(_0xfee974===null)return!this[_0x6f0451(0x286)]()[_0x6f0451(0x2b3)](this[_0x6f0451(0x24d)]());else{if(this[_0x6f0451(0x1a5)]===0x0&&this['_wtypeID']!==0x0)return _0xfee974[_0x6f0451(0x268)]===this[_0x6f0451(0x22c)];else{if(_0x6f0451(0x228)===_0x6f0451(0x228))return VisuMZ['WeaponSwapSystem']['Window_EquipItem_includes'][_0x6f0451(0x264)](this,_0xfee974);else{const _0x4ee11c=_0x339478[_0x6f0451(0x268)];this[_0x6f0451(0x22b)](_0x4ee11c);const _0x3e586a=this[_0x6f0451(0x1b8)]()[0x0];!!_0x3e586a?this[_0x6f0451(0x227)](_0x51815a,_0x3e586a):this[_0x6f0451(0x227)](_0x132818,null),this[_0x6f0451(0x231)](_0x4ee11c,_0x425b39['id']),this['switchToWeaponType'](_0x4ee11c);}}}},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x1db)]=Window_EquipItem['prototype']['isEnabled'],Window_EquipItem[_0xc72bd2(0x251)][_0xc72bd2(0x2ae)]=function(_0x3b9031){const _0x2bc9e1=_0xc72bd2;if(!_0x3b9031)return!this[_0x2bc9e1(0x286)]()['includes'](this['etypeId']());return VisuMZ[_0x2bc9e1(0x1e5)][_0x2bc9e1(0x1db)][_0x2bc9e1(0x264)](this,_0x3b9031);},Window_ActorCommand['WEAPON_SWAP_CHANGE_ATTACK_ICON']=VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x25d)]['UI'][_0xc72bd2(0x1ca)],Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE']=VisuMZ['WeaponSwapSystem']['Settings']['UI']['SwapShortcut'],Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ARROWS']=VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x25d)]['UI'][_0xc72bd2(0x2a9)],Window_ActorCommand[_0xc72bd2(0x226)]=VisuMZ[_0xc72bd2(0x1e5)]['Settings']['UI'][_0xc72bd2(0x1b4)],VisuMZ['WeaponSwapSystem']['Window_ActorCommand_initialize']=Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x20a)],Window_ActorCommand['prototype']['initialize']=function(_0x49ae33){const _0x150983=_0xc72bd2;VisuMZ[_0x150983(0x1e5)][_0x150983(0x254)][_0x150983(0x264)](this,_0x49ae33),this[_0x150983(0x2c0)]();},VisuMZ[_0xc72bd2(0x1e5)]['Window_ActorCommand_addAttackCommand']=Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x1eb)],Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x1eb)]=function(){const _0x1b7615=_0xc72bd2;if(this[_0x1b7615(0x270)])this[_0x1b7615(0x270)]['updateSwapToNextAvailableWeapon']();VisuMZ[_0x1b7615(0x1e5)][_0x1b7615(0x25e)][_0x1b7615(0x264)](this);if(!this[_0x1b7615(0x270)][_0x1b7615(0x277)]())return;this['alterAttackCommand']();if(this[_0x1b7615(0x29d)](_0x1b7615(0x1cc))>=0x0)return;this[_0x1b7615(0x1ba)]();},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x274)]=function(){const _0x4e7d3b=_0xc72bd2,_0x1b4b7c=$dataSkills[this[_0x4e7d3b(0x270)][_0x4e7d3b(0x27a)]()];if(!_0x1b4b7c)return;if(!this[_0x4e7d3b(0x2af)](_0x1b4b7c))return;if(!Window_ActorCommand[_0x4e7d3b(0x1c7)])return;const _0x3bfa32=this['_actor']['weapons']()[0x0];if(!_0x3bfa32)return;const _0x384484=this[_0x4e7d3b(0x2b7)](),_0x567cad=DataManager[_0x4e7d3b(0x26f)](_0x1b4b7c),_0xb14d4e=_0x3bfa32[_0x4e7d3b(0x2c4)],_0x177f1e=_0x384484===_0x4e7d3b(0x1d1)?_0x567cad:_0x4e7d3b(0x1d8)[_0x4e7d3b(0x249)](_0xb14d4e,_0x567cad),_0x22fb0c=this['findSymbol']('attack');if(_0x22fb0c>=0x0){const _0x15825a=this[_0x4e7d3b(0x1b3)][_0x22fb0c];_0x15825a[_0x4e7d3b(0x203)]=_0x177f1e;}},Window_ActorCommand[_0xc72bd2(0x251)]['addWeaponSwapCommand']=function(_0x4c58a2){const _0x499786=_0xc72bd2;if(!Window_ActorCommand['WEAPON_SWAP_SHOW_COMMAND']&&!_0x4c58a2)return;if(this[_0x499786(0x270)][_0x499786(0x241)]()[_0x499786(0x2c2)]<=0x1)return;if(this[_0x499786(0x29d)]('weaponSwap')>=0x0){if(_0x499786(0x26a)!==_0x499786(0x26a)){const _0x233b69=this[_0x499786(0x259)](_0x4024b1[_0x508595]);_0x233b69>_0x1e0f98&&(_0x3d43bc=_0x233b69,_0x9326c5=_0x330e60[_0x338a5f]);}else this[_0x499786(0x245)]();}const _0x6107c5=this[_0x499786(0x2b7)](),_0x130d64=TextManager[_0x499786(0x1a6)],_0x4c08d1=ImageManager[_0x499786(0x1ea)],_0x1e1f89=_0x6107c5===_0x499786(0x1d1)?_0x130d64:'\x5cI[%1]%2'[_0x499786(0x249)](_0x4c08d1,_0x130d64);this['addCommand'](_0x1e1f89,_0x499786(0x1cc));},Window_ActorCommand['prototype'][_0xc72bd2(0x245)]=function(){const _0xd012e1=_0xc72bd2;while(this[_0xd012e1(0x29d)](_0xd012e1(0x1cc))>=0x0){const _0x563e2c=this['findSymbol'](_0xd012e1(0x1cc));this['_list'][_0xd012e1(0x276)](_0x563e2c,0x1);}},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x2ad)]=function(){const _0x4a1be6=_0xc72bd2;return Window_ActorCommand[_0x4a1be6(0x24b)]&&this[_0x4a1be6(0x2bf)]()===_0x4a1be6(0x210)&&this[_0x4a1be6(0x270)]&&this[_0x4a1be6(0x270)]['canWeaponSwap']()&&this[_0x4a1be6(0x270)]['getAllEquippedSwapWeapons']()[_0x4a1be6(0x2c2)]>0x1;},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x282)]=function(_0x58e455){const _0x2a435c=_0xc72bd2;this[_0x2a435c(0x2ad)]()?this['performWeaponSwap'](!![]):Window_Command[_0x2a435c(0x251)]['cursorRight'][_0x2a435c(0x264)](this,_0x58e455);},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x1a8)]=function(_0xc9148b){const _0x588195=_0xc72bd2;this[_0x588195(0x2ad)]()?this['performWeaponSwap'](![]):Window_Command[_0x588195(0x251)]['cursorLeft'][_0x588195(0x264)](this,_0xc9148b);},Window_ActorCommand[_0xc72bd2(0x251)]['performWeaponSwap']=function(_0x166848){const _0xfa31c=_0xc72bd2;_0x166848?this[_0xfa31c(0x270)][_0xfa31c(0x20e)]():this[_0xfa31c(0x270)][_0xfa31c(0x202)](),SoundManager[_0xfa31c(0x1a7)](),this[_0xfa31c(0x230)]();},Window_ActorCommand['prototype'][_0xc72bd2(0x2c0)]=function(){const _0xd558ea=_0xc72bd2;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE'])return;if(!Window_ActorCommand[_0xd558ea(0x1e2)])return;const _0x6c8151=[new Sprite(),new Sprite()];for(const _0x101499 of _0x6c8151){if(_0xd558ea(0x1f7)===_0xd558ea(0x2b4))return this[_0xd558ea(0x270)]&&this['_actor'][_0xd558ea(0x277)]()?this['maxItemsWeaponSwap']():_0x48d853[_0xd558ea(0x1e5)][_0xd558ea(0x27d)][_0xd558ea(0x264)](this);else this[_0xd558ea(0x278)](_0x101499),_0x101499['opacity']=0x0,_0x101499['anchor']['y']=0.5,_0x101499[_0xd558ea(0x214)]=ImageManager[_0xd558ea(0x29e)](_0xd558ea(0x233));}_0x6c8151[0x0][_0xd558ea(0x1d2)]['x']=0x0,_0x6c8151[0x0][_0xd558ea(0x1e7)](0x78,0x24,0x18,0x18),_0x6c8151[0x0]['x']=0x0,this['_weaponSwapShortcutSprite_Left']=_0x6c8151[0x0],_0x6c8151[0x1][_0xd558ea(0x1d2)]['x']=0x1,_0x6c8151[0x1][_0xd558ea(0x1e7)](0x90,0x24,0x18,0x18),_0x6c8151[0x1]['x']=this['width'],this[_0xd558ea(0x2ac)]=_0x6c8151[0x1];},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x1cd)]=function(){const _0x450057=_0xc72bd2;Window_Scrollable[_0x450057(0x251)][_0x450057(0x1cd)]['call'](this),this[_0x450057(0x29c)]();},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x29c)]=function(){const _0x2ff822=_0xc72bd2;if(!Window_ActorCommand[_0x2ff822(0x24b)])return;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ARROWS'])return;VisuMZ['WeaponSwapSystem']['updateShortcutOpacity'][_0x2ff822(0x264)](this[_0x2ff822(0x1d7)]),VisuMZ['WeaponSwapSystem']['updateShortcutOpacity'][_0x2ff822(0x264)](this['_weaponSwapShortcutSprite_Right']);},Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x1a1)]=function(){const _0x47493a=_0xc72bd2;if(!this['_actor'])return![];if(this['currentSymbol']()!==_0x47493a(0x210))return![];if(this['_actor'][_0x47493a(0x241)]()[_0x47493a(0x2c2)]<=0x1)return![];return this[_0x47493a(0x270)]['getAllEquippedSwapWeapons']()['length']>0x1;},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x21f)]=function(){const _0x321e78=_0xc72bd2;if(!this[_0x321e78(0x1f1)]['visible']||this[_0x321e78(0x1f1)][_0x321e78(0x273)]<0xff||this[_0x321e78(0x1f1)][_0x321e78(0x1c9)]<0xff){if(_0x321e78(0x284)!==_0x321e78(0x284))return;else this[_0x321e78(0x2b8)]=0x0;}else{if(this[_0x321e78(0x1f1)][_0x321e78(0x1a1)]()){var _0x24b8a9=this[_0x321e78(0x1f1)][_0x321e78(0x19f)](this['parent'][_0x321e78(0x29d)](_0x321e78(0x210))),_0x104dfe=_0x24b8a9['y']+this[_0x321e78(0x1f1)]['padding'];_0x104dfe>0x0&&_0x104dfe<this['parent'][_0x321e78(0x20d)]-this[_0x321e78(0x1f1)][_0x321e78(0x291)]*0x2&&(_0x104dfe+=Math['round'](this[_0x321e78(0x1f1)][_0x321e78(0x1f2)]()/0x2),this[_0x321e78(0x2b8)]=0xff,this['y']=_0x104dfe);}else this[_0x321e78(0x2b8)]-=0x20;}},VisuMZ['WeaponSwapSystem'][_0xc72bd2(0x287)]=Window_ActorCommand['prototype'][_0xc72bd2(0x218)],Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x218)]=function(_0x1e833b){const _0x569756=_0xc72bd2;VisuMZ[_0x569756(0x1e5)][_0x569756(0x287)][_0x569756(0x264)](this,_0x1e833b),this[_0x569756(0x2ac)]&&(this[_0x569756(0x2ac)]['x']=this[_0x569756(0x1ab)]);},VisuMZ[_0xc72bd2(0x1e5)][_0xc72bd2(0x25d)]['Window_ActorCommand_updateHelp']=Window_ActorCommand['prototype'][_0xc72bd2(0x1c1)],Window_ActorCommand[_0xc72bd2(0x251)][_0xc72bd2(0x1c1)]=function(){const _0x460198=_0xc72bd2,_0x569a2a=this[_0x460198(0x2bf)]();switch(_0x569a2a){case _0x460198(0x1cc):this[_0x460198(0x27f)][_0x460198(0x1ce)](TextManager[_0x460198(0x237)]);break;default:VisuMZ[_0x460198(0x1e5)][_0x460198(0x25d)]['Window_ActorCommand_updateHelp'][_0x460198(0x264)](this);break;}};function _0x1313(_0x4a56f4,_0x3f5799){const _0xf8509f=_0xf850();return _0x1313=function(_0x1313de,_0x4e59b4){_0x1313de=_0x1313de-0x19a;let _0x54e5fa=_0xf8509f[_0x1313de];return _0x54e5fa;},_0x1313(_0x4a56f4,_0x3f5799);}function _0xf850(){const _0x5b8af3=['isWeaponSwapShortcutEnabled','isEnabled','canAddSkillCommand','Game_Party_setupBattleTestMembers','KVeTz','refreshMotion','includes','hYTgq','getFirstOfEachWeaponType','parse','commandStyle','opacity','_itemWindow','filter','ARRAYEVAL','BARE\x20HANDS','trim','isOptimizeEquipOk','currentSymbol','createWeaponSwapShortcutSprites','faqVS','length','_checkingWeaponSwaps','iconIndex','itemAt','bestEquipWeapon','NUM','applyWeaponSwapAction','itemAtWeaponSwap','itemRect','epTEo','isWeaponSwapShortcutVisible','applyGlobal','BattleHelpSwap','SylWX','_slotId','swapWeaponCmd','playEquip','cursorLeft','EIPza','FSJYl','width','Window_EquipSlot_itemAt','WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS','VwpEa','EghUs','subject','Rebdr','requiredWtypeId2','_list','ShowSwapCommand','1348aqAyjg','maxItemsWeaponSwap','push','weapons','Qjckm','addWeaponSwapCommand','Window_ActorCommand','meetsSkillConditions','2471265GHoZML','vWKfU','_swapWeapons','unshift','updateHelp','clearSwappableWeapons','Window_EquipItem_initialize','6378SKqtHh','ARRAYJSON','_scene','WEAPON_SWAP_CHANGE_ATTACK_ICON','_statusWindow','openness','ChangeAttackIcon','OnPZF','weaponSwap','updateArrows','setText','_wtypeIDs','setupBattleTestWeapons','text','anchor','onWeaponSwap','RequireAnyWpn','performWeaponSwap','SwitchWpnTypeStr','_weaponSwapShortcutSprite_Left','\x5cI[%1]%2','BattleTestAllWeapons','_currentweapontype','Window_EquipItem_isEnabled','log','remove','cCTWq','getWtypeIdWithName','igaif','Game_Actor_optimizeEquipments','WEAPON_SWAP_SHORTCUT_ARROWS','rHbEE','isClearEquipOk','WeaponSwapSystem','isWeapon','setFrame','wchKr','object','swapWeaponIcon','addAttackCommand','CvQMn','getSwapWeapon','crkGF','MISSING\x20WEAPON\x20TYPE:\x20%1','eJsdr','parent','lineHeight','isSkillWtypeOk','isEquipTypeSealed','umEKL','indexOf','hKYwL','setupBattleTestMembers','updateSwapToNextAvailableWeapon','SwapCommandName','19470930SKXEFd','status','requiredWtypeId1','changeWeapon','20KAJBKS','qaGLD','Game_Actor_isClearEquipOk','swapWeaponPrevious','name','zoZPL','vmCiw','allMembers','Game_Actor_clearEquipments','_cache','ClvWH','initialize','Game_Actor_isOptimizeEquipOk','Game_Actor_isEquipChangeOk','height','swapWeaponNext','wMzUY','attack','optimizeEquipments','Window_EquipSlot_equipSlotIndex','item','bitmap','commandWeaponSwap','setObject','Window_EquipSlot_isEnabled','setup','zLCXP','map','ARRAYSTR','ufzuM','requestMotionRefresh','optimizeSwappableWeapons','updateShortcutOpacity','Window_StatusBase_actorSlotName','ARRAYSTRUCT','Game_Actor_isDualWield','OoeuF','SwapCommandIcon','Sprite_Actor_refreshMotion','WEAPON_SWAP_SHOW_COMMAND','tradeItemWithParty','fliTD','VisuMZ_1_BattleCore','Feepq','switchToWeaponType','_wtypeID','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','activate','Game_BattlerBase_isEquipTypeSealed','refresh','setSwapWeapon','qMdTf','Window','return\x200','replace','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','swapWeaponHelp','MkCmJ','checkCacheKey','fPWaT','mwaUk','bind','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','clearEquipments','version','meetsAnyWeaponEquippedCondition','weaponSwapTypes','processShiftRemoveShortcut','toUpperCase','parameters','removeWeaponSwapCommand','isActor','Window_Base_playOkSound','ShowUnequippable','format','_actorCommandWindow','WEAPON_SWAP_SHORTCUT_ENABLE','setHandler','etypeId','ADXde','battler','isEquipWtypeOk','prototype','Game_Action_applyGlobal','RVdtW','Window_ActorCommand_initialize','_currentWeaponType','Scene_Battle_createActorCommandWindow','isDualWield','Window_EquipItem_includes','calcEquipItemPerformance','kaMMQ','callUpdateHelp','match','Settings','Window_ActorCommand_addAttackCommand','_tempActor','_equips','constructor','VoNix','playOkSound','call','isEnabledWeaponSwap','maxItems','isSkill','wtypeId','Game_Actor_changeEquip','ecfjC','max','Switch\x20out\x20the\x20current\x20weapon.','equipSlots','exit','battleCommandName','_actor','ARRAYFUNC','_firstOfEachWeaponType','contentsOpacity','alterAttackCommand','ywHgR','splice','canWeaponSwap','addChild','Game_Battler_requestMotionRefresh','attackSkillId','initEquips','actorSlotNameWeaponSwap','Window_EquipSlot_maxItems','Game_Actor_equipSlots','_helpWindow','setSlotId','adBTc','cursorRight','Game_Actor_initEquips','AhKlP','Window_EquipItem_setSlotId','nonRemovableEtypes','Window_ActorCommand_setup','initWeaponSwapSystem','6420FPiRHT','3927aBsfso','createWeaponSwapTypes','changeEquip','zMYrr','crkuc','description','note','padding','releaseUnequippableItems','XiOAf','58490XdBqfp','746315DqzWQu','equipSlotIndex','ConvertParams','_swappingWeapon','createActorCommandWindow','7834936xIJJrJ','Mechanics','updateWeaponSwapShortcutSprites','findSymbol','loadSystem','RegExp','actor','Game_BattlerBase_meetsSkillConditions','WNaiz','getAllEquippedSwapWeapons','_inBattle','ybllF','VisuMZ_1_ItemsEquipsCore','isEquipChangeOk','Game_Actor_releaseUnequippableItems','ShowShortcutArrows','SODle','weaponTypes','_weaponSwapShortcutSprite_Right'];_0xf850=function(){return _0x5b8af3;};return _0xf850();}