//=============================================================================
// VisuStella MZ - Skill Containers
// VisuMZ_4_SkillContainers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_SkillContainers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillContainers = VisuMZ.SkillContainers || {};
VisuMZ.SkillContainers.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [SkillContainers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Containers_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Containers let you transform skills in-game to contain an inner list
 * of skills, accessible to players. These container skills will draw from a
 * list of skills that either require the player to already have them or allow
 * them to even use skills they don't normally have access to.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill Containers let you condense skills to become containers for lists of
 *   other skills accessible to the player.
 * * Reduce the size of a skill library by grouping them together.
 * * Skill Containers can contain skills that require the actor to already know
 *   them (either through learning or traits) or forcefully allow them to be
 *   accessible regardless.
 * * These container skills don't appear unless the container itself has access
 *   to at least one skill.
 * * These container skills are usable from the skill menu or in-battle!
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Skill Container-Related Notetags ===
 * 
 * ---
 *
 * <Known Skill List: id>
 * <Known Skills List: id, id, id>
 *
 * <Known Skill List: name>
 * <Known Skills List: name, name, name>
 * 
 * <Known Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills require the actor to have learned the skill or to have access
 *   to the skill 
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * 
 *   Examples:
 * 
 *   <Known Skills List: 51, 52, 53>
 *   <Known Skills List: Heal I, Heal II, Heal III>
 *   <Known Skills List: 51 To 53>
 *
 * ---
 *
 * <Force Skill List: id>
 * <Force Skills List: id, id, id>
 *
 * <Force Skill List: name>
 * <Force Skills List: name, name, name>
 * 
 * <Force Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills do NOT require the actor to have learned the skill. These
 *   listed skills will always be accessible.
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * 
 *   Examples:
 * 
 *   <Force Skills List: 51, 52, 53>
 *   <Force Skills List: Heal I, Heal II, Heal III>
 *   <Force Skills List: 51 To 53>
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The Plugin Parameters allow you to adjust how the text for Skill Containers
 * appear in-game. This way, you can help your players differentiate them from
 * regular skills.
 *
 * ---
 *
 * General
 * 
 *   Skill Container Text:
 *   - Determines the text that appears where the skill costs normally would
 *     appear instead.
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
 * Version 1.04: September 8, 2022
 * * Feature Update!
 * ** Removed function dependency on Skills & States Core to prevent crash.
 *    Update made by Irina.
 * 
 * Version 1.03: December 9, 2021
 * * Bug Fixes!
 * ** Plugin Parameter for Skill Container Text should now work properly.
 * 
 * Version 1.02: June 4, 2021
 * * Compatibility Update!
 * ** Skill containers should now work with Auto Battle. This does not apply
 *    to enemies, however. Enemies will still require the actual skills to be
 *    used properly. Update made by Olivia.
 * 
 * Version 1.01: April 30, 2021
 * * Compatibility Update!
 * ** Skills displayed inside the containers are now affected by the visibility
 *    notetags such as <Show Switch: x> and <Hide Switch :x> as well as the
 *    <JS Skill Visible> notetags. Update made by Arisu.
 * * Feature Update!
 * ** When using the VisuMZ_3_SideviewBattleUI plugin, resize the window
 *    according to the title items inside of the container window instead of
 *    basing it off the skill window's size. Update made by Olivia.
 *
 * Version 1.00 Official Release Date: May 7, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableSkillContainersMenu
 * @text System: Enable SkillContainers in Menu?
 * @desc Enables/disables SkillContainers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables SkillContainers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillContainersMenu
 * @text System: Show SkillContainers in Menu?
 * @desc Shows/hides SkillContainers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides SkillContainers menu inside the main menu.
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
 * @param SkillContainers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ContainerText:str
 * @text Skill Container Text
 * @desc Determines the text that appears where the skill costs
 * normally would appear instead.
 * @default \FS[22]...
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

const _0x1d21bd=_0x2de1;(function(_0x448a9f,_0x3667af){const _0x4f7d1c=_0x2de1,_0x2e79d3=_0x448a9f();while(!![]){try{const _0x58f257=parseInt(_0x4f7d1c(0x190))/0x1*(-parseInt(_0x4f7d1c(0x10c))/0x2)+parseInt(_0x4f7d1c(0x147))/0x3*(parseInt(_0x4f7d1c(0x139))/0x4)+-parseInt(_0x4f7d1c(0x148))/0x5*(-parseInt(_0x4f7d1c(0x174))/0x6)+parseInt(_0x4f7d1c(0x15c))/0x7*(-parseInt(_0x4f7d1c(0x14a))/0x8)+-parseInt(_0x4f7d1c(0x172))/0x9+parseInt(_0x4f7d1c(0x129))/0xa*(parseInt(_0x4f7d1c(0x122))/0xb)+-parseInt(_0x4f7d1c(0x166))/0xc;if(_0x58f257===_0x3667af)break;else _0x2e79d3['push'](_0x2e79d3['shift']());}catch(_0x30d3b5){_0x2e79d3['push'](_0x2e79d3['shift']());}}}(_0x534d,0x539a7));var label=_0x1d21bd(0x15f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d21bd(0x12e)](function(_0x5e44eb){const _0x3bcae5=_0x1d21bd;return _0x5e44eb['status']&&_0x5e44eb[_0x3bcae5(0x18a)][_0x3bcae5(0x176)]('['+label+']');})[0x0];VisuMZ[label][_0x1d21bd(0x15e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1d21bd(0x11f)]=function(_0xa47d18,_0x58ed60){const _0x596496=_0x1d21bd;for(const _0x4bbba6 in _0x58ed60){if(_0x596496(0x164)!==_0x596496(0x164))this[_0x596496(0x11b)][_0x596496(0x112)]()?this[_0x596496(0x16c)]():_0x37d2ea['SkillContainers'][_0x596496(0x134)]['call'](this);else{if(_0x4bbba6[_0x596496(0x160)](/(.*):(.*)/i)){if(_0x596496(0x14b)===_0x596496(0x116)){_0x10388a['match'](_0x25113c[_0x596496(0x17c)]);const _0x1cbc32=_0xbcc0f9(_0x29a00d['$1']),_0x31348d=_0x428290(_0x556813['$2']);let _0xb7f409=[];for(let _0x2e1cd2=_0x1cbc32;_0x2e1cd2<=_0x31348d;_0x2e1cd2++){_0xb7f409[_0x596496(0x11a)](_0x2e1cd2);}_0xb7f409=_0xb7f409[_0x596496(0x12e)](_0x4a6117=>_0x147a62['hasSkill'](_0x4a6117)),_0x11c618=_0x4e5dcc['concat'](_0xb7f409);}else{const _0xdeed1c=String(RegExp['$1']),_0x39584f=String(RegExp['$2'])[_0x596496(0x14d)]()[_0x596496(0x16d)]();let _0x2edd63,_0x145f40,_0x23969d;switch(_0x39584f){case'NUM':_0x2edd63=_0x58ed60[_0x4bbba6]!==''?Number(_0x58ed60[_0x4bbba6]):0x0;break;case _0x596496(0x182):_0x145f40=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):[],_0x2edd63=_0x145f40[_0x596496(0x158)](_0x4caa37=>Number(_0x4caa37));break;case _0x596496(0x16a):_0x2edd63=_0x58ed60[_0x4bbba6]!==''?eval(_0x58ed60[_0x4bbba6]):null;break;case'ARRAYEVAL':_0x145f40=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):[],_0x2edd63=_0x145f40[_0x596496(0x158)](_0x42fe46=>eval(_0x42fe46));break;case _0x596496(0x151):_0x2edd63=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):'';break;case _0x596496(0x181):_0x145f40=_0x58ed60[_0x4bbba6]!==''?JSON['parse'](_0x58ed60[_0x4bbba6]):[],_0x2edd63=_0x145f40[_0x596496(0x158)](_0x5539f2=>JSON['parse'](_0x5539f2));break;case'FUNC':_0x2edd63=_0x58ed60[_0x4bbba6]!==''?new Function(JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6])):new Function(_0x596496(0x13c));break;case'ARRAYFUNC':_0x145f40=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):[],_0x2edd63=_0x145f40[_0x596496(0x158)](_0x953c61=>new Function(JSON[_0x596496(0x154)](_0x953c61)));break;case'STR':_0x2edd63=_0x58ed60[_0x4bbba6]!==''?String(_0x58ed60[_0x4bbba6]):'';break;case _0x596496(0x119):_0x145f40=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):[],_0x2edd63=_0x145f40['map'](_0x4bf83f=>String(_0x4bf83f));break;case'STRUCT':_0x23969d=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):{},_0x2edd63=VisuMZ[_0x596496(0x11f)]({},_0x23969d);break;case _0x596496(0x114):_0x145f40=_0x58ed60[_0x4bbba6]!==''?JSON[_0x596496(0x154)](_0x58ed60[_0x4bbba6]):[],_0x2edd63=_0x145f40[_0x596496(0x158)](_0x553fc0=>VisuMZ[_0x596496(0x11f)]({},JSON[_0x596496(0x154)](_0x553fc0)));break;default:continue;}_0xa47d18[_0xdeed1c]=_0x2edd63;}}}}return _0xa47d18;},(_0x8d5d1=>{const _0x4bbce4=_0x1d21bd,_0x14013b=_0x8d5d1[_0x4bbce4(0x18e)];for(const _0x101c7c of dependencies){if(!Imported[_0x101c7c]){alert(_0x4bbce4(0x115)[_0x4bbce4(0x10f)](_0x14013b,_0x101c7c)),SceneManager[_0x4bbce4(0x187)]();break;}}const _0x4a0a57=_0x8d5d1[_0x4bbce4(0x18a)];if(_0x4a0a57[_0x4bbce4(0x160)](/\[Version[ ](.*?)\]/i)){if('cfyXp'===_0x4bbce4(0x135))this[_0x4bbce4(0x16c)]();else{const _0x3e264c=Number(RegExp['$1']);_0x3e264c!==VisuMZ[label]['version']&&(alert(_0x4bbce4(0x14e)[_0x4bbce4(0x10f)](_0x14013b,_0x3e264c)),SceneManager[_0x4bbce4(0x187)]());}}if(_0x4a0a57[_0x4bbce4(0x160)](/\[Tier[ ](\d+)\]/i)){if('XPjsU'===_0x4bbce4(0x15d)){const _0x488c5f=_0x4d38d9[_0x4bbce4(0x17a)](this[_0x4bbce4(0x169)],_0x57df4a);if(_0x488c5f['length']<=0x0)return![];}else{const _0x3f8601=Number(RegExp['$1']);_0x3f8601<tier?(alert(_0x4bbce4(0x157)['format'](_0x14013b,_0x3f8601,tier)),SceneManager['exit']()):_0x4bbce4(0x12a)!==_0x4bbce4(0x12a)?_0x1643f4['push'](_0x5a6e29):tier=Math[_0x4bbce4(0x125)](_0x3f8601,tier);}}VisuMZ[_0x4bbce4(0x11f)](VisuMZ[label]['Settings'],_0x8d5d1[_0x4bbce4(0x12c)]);})(pluginData),VisuMZ[_0x1d21bd(0x15f)]['RegExp']={'KnownList':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'KnownListRange':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'ForceList':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'ForceListRange':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},DataManager['isSkillContainer']=function(_0x43065f){const _0x33d71a=_0x1d21bd;if(!_0x43065f)return![];if(typeof _0x43065f===Number){if(_0x33d71a(0x170)===_0x33d71a(0x170))console[_0x33d71a(0x118)]('test'),_0x43065f=$dataSkills[_0x43065f];else{if(this[_0x33d71a(0x171)][_0x33d71a(0x183)]<=0x0)return;const _0x51df28=this['_skillContainerStack'][0x0],_0xf780ed=_0x51df28[_0x33d71a(0x185)]||0x0;this[_0x33d71a(0x171)]=[],_0x449e11&&(this[_0x33d71a(0x155)](),this[_0x33d71a(0x11d)](_0xf780ed));}}const _0x7e0735=VisuMZ[_0x33d71a(0x15f)][_0x33d71a(0x12b)],_0x37b1ab=_0x43065f[_0x33d71a(0x14f)];return _0x37b1ab[_0x33d71a(0x160)](_0x7e0735[_0x33d71a(0x13a)])||_0x37b1ab['match'](_0x7e0735['ForceList']);},DataManager[_0x1d21bd(0x17a)]=function(_0x19f41c,_0x56dcd2){const _0xf55fa2=_0x1d21bd;if(!_0x56dcd2)return[];const _0x5475e6=VisuMZ['SkillContainers'][_0xf55fa2(0x12b)],_0x583619=_0x56dcd2['note'];let _0x37efae=[];if(_0x19f41c){if(!![]){const _0x3d1936=_0x583619[_0xf55fa2(0x160)](_0x5475e6[_0xf55fa2(0x13a)]);if(_0x3d1936)for(const _0x11324f of _0x3d1936){if(_0xf55fa2(0x15a)===_0xf55fa2(0x15a)){_0x11324f['match'](_0x5475e6[_0xf55fa2(0x13a)]);let _0x11d990=DataManager[_0xf55fa2(0x127)](RegExp['$1']);_0x11d990=_0x11d990[_0xf55fa2(0x12e)](_0x12faf6=>_0x19f41c[_0xf55fa2(0x131)](_0x12faf6)),_0x37efae=_0x37efae[_0xf55fa2(0x177)](_0x11d990);}else{_0x3757ad[_0xf55fa2(0x160)](_0x141e73[_0xf55fa2(0x13a)]);let _0x3c51d=_0x15533d[_0xf55fa2(0x127)](_0x5c1835['$1']);_0x3c51d=_0x3c51d[_0xf55fa2(0x12e)](_0x37dd64=>_0x540252[_0xf55fa2(0x131)](_0x37dd64)),_0x12e168=_0x401f2b[_0xf55fa2(0x177)](_0x3c51d);}}}if(!![]){const _0x4d1311=_0x583619[_0xf55fa2(0x160)](_0x5475e6[_0xf55fa2(0x17c)]);if(_0x4d1311)for(const _0x183154 of _0x4d1311){_0x183154[_0xf55fa2(0x160)](_0x5475e6[_0xf55fa2(0x17c)]);const _0x4e67d3=Number(RegExp['$1']),_0x302e0d=Number(RegExp['$2']);let _0x27aa10=[];for(let _0x4747b2=_0x4e67d3;_0x4747b2<=_0x302e0d;_0x4747b2++){if(_0xf55fa2(0x110)===_0xf55fa2(0x17e))return _0x382c84[_0xf55fa2(0x107)]&&_0xb0e01f['description'][_0xf55fa2(0x176)]('['+_0x3c3e56+']');else _0x27aa10[_0xf55fa2(0x11a)](_0x4747b2);}_0x27aa10=_0x27aa10[_0xf55fa2(0x12e)](_0xeef58=>_0x19f41c[_0xf55fa2(0x131)](_0xeef58)),_0x37efae=_0x37efae[_0xf55fa2(0x177)](_0x27aa10);}}}if(!![]){if('xfigj'===_0xf55fa2(0x10d)){if(!![]){const _0x119008=_0x583619['match'](_0x5475e6['ForceList']);if(_0x119008){if(_0xf55fa2(0x136)===_0xf55fa2(0x136))for(const _0x2e831c of _0x119008){if(_0xf55fa2(0x149)==='aTJou')_0x2a1a5c[_0xf55fa2(0x11a)](_0x578f51);else{_0x2e831c['match'](_0x5475e6[_0xf55fa2(0x173)]);let _0x4ffedb=DataManager[_0xf55fa2(0x127)](RegExp['$1']);_0x37efae=_0x37efae[_0xf55fa2(0x177)](_0x4ffedb);}}else{const _0x1cf0ba=_0x4c9130(_0x29e15a['$1']);_0x1cf0ba!==_0x390d11[_0x3fd303][_0xf55fa2(0x117)]&&(_0x40a13b('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xf55fa2(0x10f)](_0x49357,_0x1cf0ba)),_0xae6bd1[_0xf55fa2(0x187)]());}}}if(!![]){if('IQTKc'===_0xf55fa2(0x18c)){const _0x3affec=_0x583619['match'](_0x5475e6[_0xf55fa2(0x16b)]);if(_0x3affec)for(const _0x46e064 of _0x3affec){if('CzpcF'!==_0xf55fa2(0x124))_0x3e02f7=_0x1cf0da[_0xf55fa2(0x125)](_0x5c2b72,_0x1c99bf);else{_0x46e064['match'](_0x5475e6['ForceListRange']);const _0x452b2d=Number(RegExp['$1']),_0x54ecbc=Number(RegExp['$2']);let _0x4d4b5a=[];for(let _0x2389c3=_0x452b2d;_0x2389c3<=_0x54ecbc;_0x2389c3++){_0x4d4b5a[_0xf55fa2(0x11a)](_0x2389c3);}_0x37efae=_0x37efae[_0xf55fa2(0x177)](_0x4d4b5a);}}}else this['_skillWindow']['removeSkillContainerStack'](),this[_0xf55fa2(0x16f)][_0xf55fa2(0x184)]();}}else _0x4525a2('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xf55fa2(0x10f)](_0x43c4e1,_0x32e849)),_0x4abbd0[_0xf55fa2(0x187)]();}return _0x37efae=_0x37efae[_0xf55fa2(0x12e)](_0x52d92b=>!!$dataSkills[_0x52d92b]),_0x37efae=_0x37efae[_0xf55fa2(0x12e)](_0x5a3ce2=>_0x5a3ce2!==_0x56dcd2['id']),_0x37efae=_0x37efae[_0xf55fa2(0x12e)](_0x22577f=>$dataSkills[_0x22577f][_0xf55fa2(0x18e)][_0xf55fa2(0x16d)]()!==''),_0x37efae=_0x37efae[_0xf55fa2(0x12e)](_0x1afad5=>!$dataSkills[_0x1afad5][_0xf55fa2(0x18e)][_0xf55fa2(0x160)](/-----/i)),_0x37efae=_0x37efae[_0xf55fa2(0x12e)]((_0xb92542,_0x1f6b75,_0x5603b1)=>_0x5603b1['indexOf'](_0xb92542)===_0x1f6b75),_0x37efae[_0xf55fa2(0x13b)]((_0x341ead,_0x54b17c)=>_0x341ead-_0x54b17c),_0x37efae;},DataManager[_0x1d21bd(0x127)]=function(_0x193f99){const _0x1d3a6a=_0x1d21bd;_0x193f99=_0x193f99[_0x1d3a6a(0x108)](',')[_0x1d3a6a(0x158)](_0x5114c3=>_0x5114c3[_0x1d3a6a(0x16d)]());let _0x61de38=[];for(let _0x2ba5bf of _0x193f99){_0x2ba5bf=(String(_0x2ba5bf)||'')[_0x1d3a6a(0x16d)]();const _0x493f27=/^\d+$/['test'](_0x2ba5bf);_0x493f27?_0x61de38[_0x1d3a6a(0x11a)](Number(_0x2ba5bf)):_0x61de38[_0x1d3a6a(0x11a)](DataManager['getSkillIdWithName'](_0x2ba5bf));}return _0x61de38;},DataManager[_0x1d21bd(0x143)]=function(_0x32cf3f){const _0xf181ff=_0x1d21bd;_0x32cf3f=_0x32cf3f[_0xf181ff(0x14d)]()[_0xf181ff(0x16d)](),this[_0xf181ff(0x13f)]=this[_0xf181ff(0x13f)]||{};if(this[_0xf181ff(0x13f)][_0x32cf3f])return this['_skillIDs'][_0x32cf3f];for(const _0x1f1d64 of $dataSkills){if('WMybE'!==_0xf181ff(0x11e)){if(!_0x1f1d64)continue;this['_skillIDs'][_0x1f1d64[_0xf181ff(0x18e)][_0xf181ff(0x14d)]()[_0xf181ff(0x16d)]()]=_0x1f1d64['id'];}else{let _0x3325cd=_0x435e0d['SkillContainers'][_0xf181ff(0x17d)][_0xf181ff(0x11c)](this);return this[_0xf181ff(0x145)]=0x0,_0x3325cd=this['addSkillContainerSkills'](_0x3325cd),_0x3325cd;}}return this[_0xf181ff(0x13f)][_0x32cf3f]||0x0;},TextManager[_0x1d21bd(0x13d)]=VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x15e)][_0x1d21bd(0x14c)],VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x12f)]=Scene_Skill[_0x1d21bd(0x18b)][_0x1d21bd(0x113)],Scene_Skill[_0x1d21bd(0x18b)][_0x1d21bd(0x113)]=function(){const _0x2cd1b4=_0x1d21bd,_0x1aa6f0=this[_0x2cd1b4(0x152)]();if(DataManager[_0x2cd1b4(0x126)](_0x1aa6f0)){if('fMcxw'!==_0x2cd1b4(0x168))this[_0x2cd1b4(0x109)]();else{if(!_0xe2ce53)return![];typeof _0x44956b===_0xe9e62d&&(_0x1d644e['log'](_0x2cd1b4(0x175)),_0x6186d2=_0x1f0fc7[_0x33ab2e]);const _0x358f74=_0x1b8b74['SkillContainers'][_0x2cd1b4(0x12b)],_0x14d254=_0x4e731f['note'];return _0x14d254[_0x2cd1b4(0x160)](_0x358f74[_0x2cd1b4(0x13a)])||_0x14d254['match'](_0x358f74[_0x2cd1b4(0x173)]);}}else{if(_0x2cd1b4(0x10a)!==_0x2cd1b4(0x140))VisuMZ['SkillContainers'][_0x2cd1b4(0x12f)][_0x2cd1b4(0x11c)](this);else{const _0x12edd8=_0x15796d['match'](_0x2db665['KnownListRange']);if(_0x12edd8)for(const _0xf10b73 of _0x12edd8){_0xf10b73[_0x2cd1b4(0x160)](_0x53e5b4['KnownListRange']);const _0x441e46=_0x401b99(_0x4f3d8c['$1']),_0xee8ebb=_0x305c90(_0x1c723c['$2']);let _0x303e11=[];for(let _0x266931=_0x441e46;_0x266931<=_0xee8ebb;_0x266931++){_0x303e11[_0x2cd1b4(0x11a)](_0x266931);}_0x303e11=_0x303e11[_0x2cd1b4(0x12e)](_0x3da839=>_0x3158e[_0x2cd1b4(0x131)](_0x3da839)),_0x26a082=_0x1ce462[_0x2cd1b4(0x177)](_0x303e11);}}}},Scene_Skill[_0x1d21bd(0x18b)]['processSkillContainerOk']=function(){const _0x113443=_0x1d21bd,_0xf70fad={'skill':this[_0x113443(0x11b)][_0x113443(0x152)](),'index':this[_0x113443(0x11b)]['index']()};this[_0x113443(0x11b)][_0x113443(0x133)](_0xf70fad),this[_0x113443(0x11b)][_0x113443(0x184)]();},VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x134)]=Scene_Skill[_0x1d21bd(0x18b)][_0x1d21bd(0x142)],Scene_Skill[_0x1d21bd(0x18b)][_0x1d21bd(0x142)]=function(){const _0xa1c49f=_0x1d21bd;if(this['_itemWindow'][_0xa1c49f(0x112)]()){if(_0xa1c49f(0x15b)!==_0xa1c49f(0x137))this[_0xa1c49f(0x16c)]();else{let _0x56e1a2=_0x28023d[_0xa1c49f(0x17a)](this,_0x4e24d3);_0x56e1a2=_0x56e1a2[_0xa1c49f(0x158)](_0x5b14ed=>_0x1e21fd[_0x5b14ed]),_0x56e1a2=_0x56e1a2[_0xa1c49f(0x12e)](_0x1cd8e1=>!!_0x1cd8e1),_0x56e1a2=this[_0xa1c49f(0x17b)](_0x56e1a2),_0x2fe189=_0x58cb51['concat'](_0x56e1a2);}}else _0xa1c49f(0x186)!==_0xa1c49f(0x123)?VisuMZ['SkillContainers'][_0xa1c49f(0x134)][_0xa1c49f(0x11c)](this):(this['_skillWindow']&&this[_0xa1c49f(0x16f)]['clearSkillContainerStacks'](![]),_0x7fed60[_0xa1c49f(0x15f)][_0xa1c49f(0x153)][_0xa1c49f(0x11c)](this));},Scene_Skill[_0x1d21bd(0x18b)]['processSkillContainerCancel']=function(){const _0x474281=_0x1d21bd;this[_0x474281(0x11b)][_0x474281(0x16e)](),this['_itemWindow']['activate']();},VisuMZ[_0x1d21bd(0x15f)]['Scene_Battle_onSkillOk']=Scene_Battle[_0x1d21bd(0x18b)][_0x1d21bd(0x189)],Scene_Battle['prototype'][_0x1d21bd(0x189)]=function(){const _0xceef01=_0x1d21bd,_0x1c8bd4=this[_0xceef01(0x16f)][_0xceef01(0x152)]();DataManager[_0xceef01(0x126)](_0x1c8bd4)?this[_0xceef01(0x109)]():VisuMZ['SkillContainers']['Scene_Battle_onSkillOk'][_0xceef01(0x11c)](this);},Scene_Battle['prototype']['processSkillContainerOk']=function(){const _0x3af265=_0x1d21bd,_0x12b06f={'skill':this[_0x3af265(0x16f)][_0x3af265(0x152)](),'index':this['_skillWindow'][_0x3af265(0x185)]()};this['_skillWindow']['addSkillContainerStack'](_0x12b06f),this[_0x3af265(0x16f)][_0x3af265(0x184)]();},VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x128)]=Scene_Battle[_0x1d21bd(0x18b)][_0x1d21bd(0x13e)],Scene_Battle[_0x1d21bd(0x18b)]['onSkillCancel']=function(){const _0x3b44ff=_0x1d21bd;this[_0x3b44ff(0x16f)][_0x3b44ff(0x112)]()?this['processSkillContainerCancel']():VisuMZ[_0x3b44ff(0x15f)][_0x3b44ff(0x128)]['call'](this);},Scene_Battle[_0x1d21bd(0x18b)]['processSkillContainerCancel']=function(){const _0xeb421f=_0x1d21bd;this['_skillWindow'][_0xeb421f(0x16e)](),this['_skillWindow']['activate']();},VisuMZ['SkillContainers'][_0x1d21bd(0x153)]=Scene_Battle['prototype'][_0x1d21bd(0x167)],Scene_Battle[_0x1d21bd(0x18b)][_0x1d21bd(0x167)]=function(){const _0x22f297=_0x1d21bd;if(this[_0x22f297(0x16f)]){if(_0x22f297(0x180)==='kaBPu'){const _0x48e340=this[_0x22f297(0x152)]();_0x4d9dbb[_0x22f297(0x126)](_0x48e340)?this['processSkillContainerOk']():_0x302a21['SkillContainers']['Scene_Skill_onItemOk'][_0x22f297(0x11c)](this);}else this['_skillWindow'][_0x22f297(0x18f)](![]);}VisuMZ[_0x22f297(0x15f)][_0x22f297(0x153)][_0x22f297(0x11c)](this);},VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x17d)]=Game_Actor['prototype']['usableSkills'],Game_Actor['prototype'][_0x1d21bd(0x163)]=function(){const _0x393dfe=_0x1d21bd;let _0x3716fd=VisuMZ['SkillContainers']['Game_Actor_usableSkills'][_0x393dfe(0x11c)](this);return this['_skillContainerLoops']=0x0,_0x3716fd=this[_0x393dfe(0x17b)](_0x3716fd),_0x3716fd;},Game_Actor['prototype']['addSkillContainerSkills']=function(_0x2a6abf){const _0x30f2a0=_0x1d21bd;if(this[_0x30f2a0(0x145)]>=0x64)return _0x2a6abf;for(const _0x34cb0e of _0x2a6abf){if(!_0x34cb0e)continue;if(DataManager[_0x30f2a0(0x126)](_0x34cb0e)){let _0x197044=DataManager[_0x30f2a0(0x17a)](this,_0x34cb0e);_0x197044=_0x197044[_0x30f2a0(0x158)](_0x4f0862=>$dataSkills[_0x4f0862]),_0x197044=_0x197044['filter'](_0x244485=>!!_0x244485),_0x197044=this[_0x30f2a0(0x17b)](_0x197044),_0x2a6abf=_0x2a6abf[_0x30f2a0(0x177)](_0x197044);}}return _0x2a6abf;},VisuMZ['SkillContainers']['Window_SkillList_initialize']=Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x138)],Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x138)]=function(_0x3d3ccd){const _0x490968=_0x1d21bd;VisuMZ[_0x490968(0x15f)][_0x490968(0x150)]['call'](this,_0x3d3ccd),this['_skillContainerStack']=[];},Window_SkillList[_0x1d21bd(0x18b)]['addSkillContainerStack']=function(_0x12a859){const _0xfcf5f3=_0x1d21bd;this[_0xfcf5f3(0x171)][_0xfcf5f3(0x11a)](_0x12a859),this['refresh'](),this['forceSelect'](0x0);},Window_SkillList[_0x1d21bd(0x18b)]['removeSkillContainerStack']=function(){const _0x373d03=_0x1d21bd;if(this[_0x373d03(0x171)][_0x373d03(0x183)]<=0x0)return;const _0x4d84fe=this[_0x373d03(0x171)][this['_skillContainerStack'][_0x373d03(0x183)]-0x1],_0xa9b336=_0x4d84fe[_0x373d03(0x185)]||0x0;this[_0x373d03(0x171)][_0x373d03(0x130)](),this[_0x373d03(0x155)](),this[_0x373d03(0x11d)](_0xa9b336);},Window_SkillList[_0x1d21bd(0x18b)]['clearSkillContainerStacks']=function(_0x9773fb){const _0x5327a7=_0x1d21bd;if(this[_0x5327a7(0x171)]['length']<=0x0)return;const _0xa86a24=this[_0x5327a7(0x171)][0x0],_0x547308=_0xa86a24[_0x5327a7(0x185)]||0x0;this[_0x5327a7(0x171)]=[],_0x9773fb&&(this[_0x5327a7(0x155)](),this[_0x5327a7(0x11d)](_0x547308));},Window_SkillList[_0x1d21bd(0x18b)]['isShowingSkillContainerList']=function(){const _0x18ed52=_0x1d21bd;return this[_0x18ed52(0x171)][_0x18ed52(0x183)]>0x0;},VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x144)]=Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x178)],Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x178)]=function(){const _0xeec62c=_0x1d21bd;this[_0xeec62c(0x112)]()?this[_0xeec62c(0x188)]():VisuMZ['SkillContainers']['Window_SkillList_makeItemList']['call'](this);},VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x146)]=Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x176)],Window_SkillList[_0x1d21bd(0x18b)]['includes']=function(_0xbfe5e0){const _0x4c0c9e=_0x1d21bd;if(_0xbfe5e0&&DataManager[_0x4c0c9e(0x126)](_0xbfe5e0)){const _0x27e737=DataManager['getSkillContainerList'](this['_actor'],_0xbfe5e0);if(_0x27e737[_0x4c0c9e(0x183)]<=0x0)return![];}return VisuMZ['SkillContainers']['Window_SkillList_includes']['call'](this,_0xbfe5e0);},Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x188)]=function(){const _0x3c215f=_0x1d21bd,_0x318905=this[_0x3c215f(0x171)][this[_0x3c215f(0x171)][_0x3c215f(0x183)]-0x1],_0x11ff41=_0x318905[_0x3c215f(0x12d)],_0x566343=DataManager[_0x3c215f(0x17a)](this[_0x3c215f(0x169)],_0x11ff41);this['_data']=_0x566343['map'](_0x1ba7f9=>$dataSkills[_0x1ba7f9])[_0x3c215f(0x12e)](_0x5b31c3=>!!_0x5b31c3&&this['containerIncludes'](_0x5b31c3)),Imported[_0x3c215f(0x121)]&&(this[_0x3c215f(0x161)](),this[_0x3c215f(0x179)](),this[_0x3c215f(0x17f)]());},Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x111)]=function(_0x43ab60){const _0x3bbb53=_0x1d21bd;if(Imported[_0x3bbb53(0x165)]){if(_0x3bbb53(0x162)===_0x3bbb53(0x162)){if(!this['checkShowHideNotetags'](_0x43ab60))return![];if(!this[_0x3bbb53(0x156)](_0x43ab60))return![];}else this[_0x3bbb53(0x155)](),this[_0x3bbb53(0x11d)](_0x3dca3a);}return!![];},VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x141)]=Window_SkillList[_0x1d21bd(0x18b)][_0x1d21bd(0x159)],Window_SkillList['prototype'][_0x1d21bd(0x159)]=function(_0x53607c,_0x54be36,_0x440d69,_0x33f926){const _0x3f2454=_0x1d21bd;DataManager[_0x3f2454(0x126)](_0x53607c)?this[_0x3f2454(0x10e)](_0x53607c,_0x54be36,_0x440d69,_0x33f926):VisuMZ[_0x3f2454(0x15f)][_0x3f2454(0x141)]['call'](this,_0x53607c,_0x54be36,_0x440d69,_0x33f926);},Window_SkillList['prototype'][_0x1d21bd(0x10e)]=function(_0x241b17,_0x2a3214,_0x2e11a7,_0x5754e3){const _0x5d4a5f=_0x1d21bd;if(!_0x241b17)return;this['resetFontSettings']();const _0x4feef8=TextManager[_0x5d4a5f(0x13d)],_0x2aa766=this[_0x5d4a5f(0x132)](_0x4feef8)['width'];_0x2a3214+=_0x5754e3-_0x2aa766,this['drawTextEx'](_0x4feef8,_0x2a3214,_0x2e11a7,_0x2aa766),this[_0x5d4a5f(0x10b)]();};function _0x534d(){const _0x16f2f9=['%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','map','drawSkillCost','iGGss','QcOGS','7MujLvJ','HJtss','Settings','SkillContainers','match','adjustSideviewUiWidth','mVznr','usableSkills','doPxQ','VisuMZ_1_SkillsStatesCore','3857424DviZjC','selectNextCommand','RNWhN','_actor','EVAL','ForceListRange','processSkillContainerCancel','trim','removeSkillContainerStack','_skillWindow','jvFKv','_skillContainerStack','3096495UsbRYP','ForceList','769326SQUXbN','test','includes','concat','makeItemList','adjustSideviewUiHeight','getSkillContainerList','addSkillContainerSkills','KnownListRange','Game_Actor_usableSkills','xRbsj','updateSideviewUiPosition','hUsKt','ARRAYJSON','ARRAYNUM','length','activate','index','PYzif','exit','makeSkillContainerList','onSkillOk','description','prototype','IQTKc','Window_ActorCommand_canAddSkillCommand','name','clearSkillContainerStacks','14813xUgklr','status','split','processSkillContainerOk','BbBxN','resetFontSettings','20TVQCpQ','xfigj','drawSkillContainerText','format','fFMeE','containerIncludes','isShowingSkillContainerList','onItemOk','ARRAYSTRUCT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','LwTHw','version','log','ARRAYSTR','push','_itemWindow','call','forceSelect','JhDSd','ConvertParams','VisuMZ_1_BattleCore','VisuMZ_3_SideviewBattleUI','6427333HHoFJO','wUeCW','CzpcF','max','isSkillContainer','parseSkillContainerList','Scene_Battle_onSkillCancel','10Htuqgh','tXqkd','RegExp','parameters','skill','filter','Scene_Skill_onItemOk','pop','hasSkill','textSizeEx','addSkillContainerStack','Scene_Skill_onItemCancel','aHlOq','leRvh','QdpGM','initialize','64004ObPKxE','KnownList','sort','return\x200','skillContainerText','onSkillCancel','_skillIDs','uLSJz','Window_SkillList_drawSkillCost','onItemCancel','getSkillIdWithName','Window_SkillList_makeItemList','_skillContainerLoops','Window_SkillList_includes','87PIcvHN','15AzZvVu','ePMyS','2215352jTPHnw','hUSTJ','ContainerText','toUpperCase','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','note','Window_SkillList_initialize','JSON','item','Scene_Battle_selectNextCommand','parse','refresh','checkShowHideJS'];_0x534d=function(){return _0x16f2f9;};return _0x534d();}Imported[_0x1d21bd(0x120)]&&(VisuMZ[_0x1d21bd(0x15f)][_0x1d21bd(0x18d)]=Window_ActorCommand['prototype']['canAddSkillCommand'],Window_ActorCommand['prototype']['canAddSkillCommand']=function(_0x5cc1e2){const _0xf16c33=_0x1d21bd;return DataManager[_0xf16c33(0x126)](_0x5cc1e2)?![]:VisuMZ[_0xf16c33(0x15f)][_0xf16c33(0x18d)]['call'](this,_0x5cc1e2);});function _0x2de1(_0x8bd908,_0x3fca5f){const _0x534de=_0x534d();return _0x2de1=function(_0x2de1e6,_0x947a37){_0x2de1e6=_0x2de1e6-0x107;let _0x4a836e=_0x534de[_0x2de1e6];return _0x4a836e;},_0x2de1(_0x8bd908,_0x3fca5f);};