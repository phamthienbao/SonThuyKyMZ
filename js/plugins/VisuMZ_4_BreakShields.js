//=============================================================================
// VisuStella MZ - Break Shields
// VisuMZ_4_BreakShields.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BreakShields = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BreakShields = VisuMZ.BreakShields || {};
VisuMZ.BreakShields.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [BreakShields]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Break_Shields_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin introduces a new mechanic called Break Shields. Actors and/or
 * enemies can have them. Whenever a battler is struck with an elemental
 * weakness, their Break Shield is reduced by 1 (unless modified by a notetag).
 * Once the battler's Break Shield reaches a score of 0, a state is then
 * applied to the battler (usually a stun state). Once the Break state wears
 * off, the battler will regain their Break Shields again. This can be used to
 * create complex battle depth for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Control how Break Shields are calculated alongside how many hits are
 *   required for each actor and/or enemy to enter the Break Stun state.
 * * Display the Break Shields on the screen and relay the information to your
 *   players through icons.
 * * Play animations when hitting a weakness and reducing Break Shields.
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
 * VisuMZ_0_CoreEngine
 *
 * Two of the animation Plugin Parameters require the Core Engine to play them.
 * This is due to how the Core Engine allows playing animations without halting
 * the battle system to allow for a seamless flow despite relaying the Break
 * Shield reduction visual feedback.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_2_BattleSystemSTB
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === Break Shield Calculation-Related Notetags ===
 * 
 * ---
 *
 * <Break Shields: x>
 *
 * - Used for: Actor, Class, Enemy Notetags
 * - Declares the base amount of Break Shields this battler will have.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number representing the base amount of Break Shields to
 *   give this battler.
 * - If both the Actor and Class database object has this notetag, priority
 *   will be given to the Class before the Actor.
 *
 * ---
 *
 * <Break Shields: +x>
 * <Break Shields: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Allows trait objects to alter the amount of Break Shields battlers have
 *   whenever their Break Shields are reset.
 * - Replace 'x' with a number representing the Break Shields to increase or
 *   decrease the amount by.
 * - Total Break Shields cannot go under 1 and cannot go whatever the maximum
 *   is declared inside the Plugin Parameters.
 *
 * ---
 * 
 * === Break Shield Alteration-Related Notetags ===
 * 
 * ---
 *
 * <Break Reduce: x>
 *
 * - Used for: Skill, Item Notetags
 * - Reduces the target's Break Shield by x if this action hits a weakness.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number to determine how many Break Shields to reduce.
 * - If Break Shields reach 0, the target will enter a Stun state.
 *
 * ---
 *
 * <Change Break Shield: x>
 *
 * - Used for: Skill, Item Notetags
 * - This will change the target battler's Break Shield value to x if the
 *   battler isn't currently stunned.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value to change the target battler's Break
 *   Shield value to.
 *
 * ---
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 *
 * - Used for: Skill, Item Notetags
 * - This will either increase the target battler's break shield by x or
 *   decrease the target battler's break shield by x.
 * - Happens after the Change Break Shield notetag.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value representing the amount to alter the
 *   target's Break Shields by.
 *
 * ---
 * 
 * === Element-Related Notetags ===
 * 
 * ---
 *
 * <Protect Element: id>
 * <Protect Elements: id, id, id>
 * 
 * <Protect Element: name>
 * <Protect Elements: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Specified element(s) will be guarded and Break Shields cannot be reduced
 *   when struck with that element (as long as the requirement is above 100%).
 * - The element rate for those will cap at 100%, preventing extra damage from
 *   being dealt despite having weaknesses, although custom JS effects will
 *   bypass this.
 * - Replace 'id' with a number value representing the ID(s) of the element(s).
 * - Replace 'name' with the name(s) of the element(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Customize the mechanical settings for Break Shields.
 *
 * ---
 *
 * Break Shields
 * 
 *   Affect: Actors?:
 *   - Do Break Shields affect actors?
 * 
 *   Affect: Enemies?:
 *   - Do Break Shields affect actors?
 * 
 *   Base Shield Value:
 *   - The starting amount of shields a battler has.
 *   - Can be altered through notetags.
 * 
 *   Maximum Shields:
 *   - The maximum amount of shields a battler can have.
 *   - This is a hard cap.
 * 
 *   Stun State ID:
 *   - This is the state to be applied when all Break Shields are reduced to 0.
 *
 * ---
 *
 * Animation
 * 
 *   Reduce Animation ID:
 *   - Play this animation when Break Shields are reduced.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Stun Animation ID:
 *   - Play this animation when Break Stun is achieved.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Weaknesses
 * 
 *   Minimum Rate:
 *   - What is the minimum element rate for an attack to be considered striking
 *     a weakness?
 * 
 *   Default Reduction:
 *   - Default reduction amount for Break Shields when striking an elemental
 *     weakness.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * Customize the UI settings for Break Shields.
 *
 * ---
 *
 * Icons
 * 
 *   Break Shield Icon:
 *   - Icon used to represent Break Shields.
 * 
 *   Stun State Icon:
 *   - Icon used to represent Break Stun if the Break Stun state does NOT have
 *     an icon assigned to it.
 * 
 *     Show Turns?:
 *     - Show how many turns are remaining with the Break Stun?
 * 
 *   Protect Icon:
 *   - Icon used to represent Protected Elements.
 *   - Used for other plugins.
 * 
 *   Font Size:
 *   - What is the font size used to display the turns and Break Shields
 *     remaining?
 *
 * ---
 *
 * Battlers > Actors/Enemies
 * 
 *   Show Battler Icon?:
 *   - Show Break Shield icons on the SV_Actor/enemy battlers?
 * 
 *   Position:
 *   - Where on the battler would you like to place the icon?
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 * 
 *   Name: Attach Shields (Enemies Only)
 *   - Attach the Break Shield icon to the enemy name?
 *   - Overrides direct attachment.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *     Attach: Offset X:
 *     - How much to offset the attached icon's X position by?
 *     - Negative goes left. Positive goes right.
 * 
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's Y position by?
 *     - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the Battle Status?
 * 
 *   Auto-Position?:
 *   - Automatically position the Break Shield icon?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Menu Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the menu scenes?
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
 * Version 1.04: November 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug where a crash would occur if a non-actor type finds its way
 *    into the status window. Fix made by Olivia.
 * 
 * Version 1.03: March 16, 2023
 * * Bug Fixes!
 * ** Notetags from Elements and Status Menu Core for increasing Dealt Element
 *    damage will no longer force a Break Shield reduction when an attack has
 *    an attached element that the enemy is not weak to. Fix made by Arisu.
 * 
 * Version 1.02: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.01: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: April 30, 2021
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
 * @param BreakShields
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
 * @desc Customize the mechanical settings for Break Shields.
 * @default {"BreakShields":"","AffectActors:eval":"true","AffectEnemies:eval":"true","Base:num":"1","Max:num":"99","StunState:num":"13","Animation":"","ReduceAniID:num":"2","StunAniID:num":"15","Weaknesses":"","MinRate:num":"1.05","Reduction:num":"1"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Customize the UI settings for Break Shields.
 * @default {"Icons":"","ShieldIcon:num":"81","StunIcon:num":"6","ShowStunTurns:eval":"false","ProtectIcon:num":"128","FontSize:num":"22","Battlers":"","Actors":"","ActorDisplayIcon:eval":"false","ActorDisplayPosition:str":"bottom center","ActorOffsetX:num":"+0","ActorOffsetY:num":"+8","Enemies":"","EnemyDisplayIcon:eval":"true","EnemyDisplayPosition:str":"bottom center","EnemyOffsetX:num":"+0","EnemyOffsetY:num":"+8","NameAttachShieldIcon:eval":"true","AttachShieldOffsetX:num":"+0","AttachShieldOffsetY:num":"+0","BattleStatus":"","BattleStatusDisplayIcons:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0","MenuStatus":"","MenuStatusBreakShieldIcons:eval":"true"}
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
 * @param BreakShields
 * @text Break Shields
 *
 * @param AffectActors:eval
 * @text Affect: Actors?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param AffectEnemies:eval
 * @text Affect: Enemies?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param Base:num
 * @text Base Shield Value
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The starting amount of shields a battler has.
 * Can be altered through notetags.
 * @default 1
 *
 * @param Max:num
 * @text Maximum Shields
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have.
 * This is a hard cap.
 * @default 99
 *
 * @param StunState:num
 * @text Stun State ID
 * @parent BreakShields
 * @type state
 * @desc This is the state to be applied when all Break Shields
 * are reduced to 0.
 * @default 13
 *
 * @param Animation
 *
 * @param ReduceAniID:num
 * @text Reduce Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Shields are reduced.
 * Requires VisuMZ_0_CoreEngine.
 * @default 2
 *
 * @param StunAniID:num
 * @text Stun Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Stun is achieved.
 * Requires VisuMZ_0_CoreEngine.
 * @default 15
 *
 * @param Weaknesses
 *
 * @param MinRate:num
 * @text Minimum Rate
 * @parent Weaknesses
 * @desc What is the minimum element rate for an attack to be
 * considered striking a weakness?
 * @default 1.05
 *
 * @param Reduction:num
 * @text Default Reduction
 * @parent Weaknesses
 * @type number
 * @min 1
 * @desc Default reduction amount for Break Shields when striking
 * an elemental weakness.
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param ShieldIcon:num
 * @text Break Shield Icon
 * @parent Icons
 * @desc Icon used to represent Break Shields.
 * @default 81
 *
 * @param StunIcon:num
 * @text Stun State Icon
 * @parent Icons
 * @desc Icon used to represent Break Stun if the Break Stun state
 * does NOT have an icon assigned to it.
 * @default 6
 *
 * @param ShowStunTurns:eval
 * @text Show Turns?
 * @parent StunIcon:num
 * @type boolean
 * @on Show Turns
 * @off Hide Turns
 * @desc Show how many turns are remaining with the Break Stun?
 * @default false
 *
 * @param ProtectIcon:num
 * @text Protect Icon
 * @parent Icons
 * @desc Icon used to represent Protected Elements.
 * Used for other plugins.
 * @default 128
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Icons
 * @number
 * @min 1
 * @desc What is the font size used to display the turns and
 * Break Shields remaining?
 * @default 22
 *
 * @param Battlers
 * 
 * @param Actors
 * @parent Battlers
 *
 * @param ActorDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the SV_Actor battlers?
 * @default false
 *
 * @param ActorDisplayPosition:str
 * @text Position
 * @parent Actors
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param ActorOffsetX:num
 * @text Offset X
 * @parent Actors
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param ActorOffsetY:num
 * @text Offset Y
 * @parent Actors
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 * 
 * @param Enemies
 * @parent Battlers
 *
 * @param EnemyDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the enemy battlers?
 * @default true
 *
 * @param EnemyDisplayPosition:str
 * @text Position
 * @parent Enemies
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param EnemyOffsetX:num
 * @text Offset X
 * @parent Enemies
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param EnemyOffsetY:num
 * @text Offset Y
 * @parent Enemies
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 *
 * @param NameAttachShieldIcon:eval
 * @text Name: Attach Shields
 * @parent Enemies
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the Break Shield icon to the enemy name?
 * Overrides direct attachment. Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param AttachShieldOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachShieldOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusDisplayIcons:eval
 * @text Show Break Shields?
 * @parent BattleStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the Battle Status?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Break Shield icon?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param MenuStatus
 * @text Menu Status
 *
 * @param MenuStatusBreakShieldIcons:eval
 * @text Show Break Shields?
 * @parent MenuStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the menu scenes?
 * @default true
 *
 */
//=============================================================================

const _0xe1bb6=_0x254d;(function(_0x381337,_0x1dbfda){const _0x5d0bc3=_0x254d,_0x58638f=_0x381337();while(!![]){try{const _0x4af00a=-parseInt(_0x5d0bc3(0x18a))/0x1+parseInt(_0x5d0bc3(0x129))/0x2*(-parseInt(_0x5d0bc3(0x1ec))/0x3)+-parseInt(_0x5d0bc3(0x1fe))/0x4+parseInt(_0x5d0bc3(0x15c))/0x5+-parseInt(_0x5d0bc3(0x178))/0x6+parseInt(_0x5d0bc3(0x193))/0x7+parseInt(_0x5d0bc3(0x207))/0x8;if(_0x4af00a===_0x1dbfda)break;else _0x58638f['push'](_0x58638f['shift']());}catch(_0x8b4d8a){_0x58638f['push'](_0x58638f['shift']());}}}(_0x3d66,0xecb8e));var label=_0xe1bb6(0x118),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xe1bb6(0x14f)](function(_0x48f50c){const _0x1b8290=_0xe1bb6;return _0x48f50c[_0x1b8290(0x1ad)]&&_0x48f50c[_0x1b8290(0x1a6)]['includes']('['+label+']');})[0x0];function _0x254d(_0x53a313,_0x49d86e){const _0x3d6636=_0x3d66();return _0x254d=function(_0x254d66,_0x173e1d){_0x254d66=_0x254d66-0x10f;let _0x2ea714=_0x3d6636[_0x254d66];return _0x2ea714;},_0x254d(_0x53a313,_0x49d86e);}VisuMZ[label][_0xe1bb6(0x183)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x28867e,_0x2bb215){const _0x47f510=_0xe1bb6;for(const _0x176915 in _0x2bb215){if(_0x176915[_0x47f510(0x164)](/(.*):(.*)/i)){const _0x3e72b7=String(RegExp['$1']),_0x2e7c5b=String(RegExp['$2'])[_0x47f510(0x128)]()[_0x47f510(0x122)]();let _0x7f304b,_0xf65471,_0x2ac87a;switch(_0x2e7c5b){case _0x47f510(0x1f5):_0x7f304b=_0x2bb215[_0x176915]!==''?Number(_0x2bb215[_0x176915]):0x0;break;case _0x47f510(0x225):_0xf65471=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):[],_0x7f304b=_0xf65471[_0x47f510(0x17c)](_0x2972eb=>Number(_0x2972eb));break;case _0x47f510(0x1cc):_0x7f304b=_0x2bb215[_0x176915]!==''?eval(_0x2bb215[_0x176915]):null;break;case _0x47f510(0x17d):_0xf65471=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):[],_0x7f304b=_0xf65471['map'](_0x5e051d=>eval(_0x5e051d));break;case'JSON':_0x7f304b=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):'';break;case _0x47f510(0x221):_0xf65471=_0x2bb215[_0x176915]!==''?JSON['parse'](_0x2bb215[_0x176915]):[],_0x7f304b=_0xf65471[_0x47f510(0x17c)](_0x318924=>JSON[_0x47f510(0x1f6)](_0x318924));break;case _0x47f510(0x142):_0x7f304b=_0x2bb215[_0x176915]!==''?new Function(JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915])):new Function(_0x47f510(0x148));break;case _0x47f510(0x1f9):_0xf65471=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):[],_0x7f304b=_0xf65471['map'](_0x5d24fe=>new Function(JSON[_0x47f510(0x1f6)](_0x5d24fe)));break;case _0x47f510(0x218):_0x7f304b=_0x2bb215[_0x176915]!==''?String(_0x2bb215[_0x176915]):'';break;case _0x47f510(0x21e):_0xf65471=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):[],_0x7f304b=_0xf65471[_0x47f510(0x17c)](_0x2116c5=>String(_0x2116c5));break;case'STRUCT':_0x2ac87a=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):{},_0x7f304b=VisuMZ['ConvertParams']({},_0x2ac87a);break;case _0x47f510(0x229):_0xf65471=_0x2bb215[_0x176915]!==''?JSON[_0x47f510(0x1f6)](_0x2bb215[_0x176915]):[],_0x7f304b=_0xf65471['map'](_0x555b66=>VisuMZ[_0x47f510(0x11a)]({},JSON['parse'](_0x555b66)));break;default:continue;}_0x28867e[_0x3e72b7]=_0x7f304b;}}return _0x28867e;},(_0x4fed04=>{const _0x4857e9=_0xe1bb6,_0x492c66=_0x4fed04[_0x4857e9(0x160)];for(const _0x5cff21 of dependencies){if(!Imported[_0x5cff21]){alert(_0x4857e9(0x1a2)['format'](_0x492c66,_0x5cff21)),SceneManager[_0x4857e9(0x1ea)]();break;}}const _0x5ac9c7=_0x4fed04[_0x4857e9(0x1a6)];if(_0x5ac9c7[_0x4857e9(0x164)](/\[Version[ ](.*?)\]/i)){const _0x1f52d7=Number(RegExp['$1']);if(_0x1f52d7!==VisuMZ[label]['version']){if('JMkfU'!==_0x4857e9(0x17a))alert(_0x4857e9(0x11e)[_0x4857e9(0x143)](_0x492c66,_0x1f52d7)),SceneManager['exit']();else{var _0x1efce2=this[_0x4857e9(0x1c6)]();return _0x1efce2=this[_0x4857e9(0x223)](_0x1efce2),_0x1efce2[_0x4857e9(0x213)](0x1,_0x2a52aa[_0x4857e9(0x1c8)]);}}}if(_0x5ac9c7[_0x4857e9(0x164)](/\[Tier[ ](\d+)\]/i)){if(_0x4857e9(0x192)===_0x4857e9(0x173))this['_battler']=_0x11dde5;else{const _0x589860=Number(RegExp['$1']);if(_0x589860<tier)alert(_0x4857e9(0x1ff)[_0x4857e9(0x143)](_0x492c66,_0x589860,tier)),SceneManager[_0x4857e9(0x1ea)]();else{if('tekBN'!==_0x4857e9(0x1d3))return _0x2cd14f[_0x4857e9(0x1e0)];else tier=Math[_0x4857e9(0x123)](_0x589860,tier);}}}VisuMZ[_0x4857e9(0x11a)](VisuMZ[label][_0x4857e9(0x183)],_0x4fed04[_0x4857e9(0x120)]);})(pluginData),VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1cb)]={'BreakReduce':/<BREAK (?:REDUCE|REDUCTION):[ ](\d+)>/i,'SetBreakShield':/<(?:SET|CHANGE) BREAK (?:SHIELD|SHIELDS): (\d+)>/i,'AlterBreakShield':/<(?:INCREASE|DECREASE|ALTER) BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'ProtectedElements':/<PROTECT (?:ELEMENT|ELEMENTS):[ ](.*)>/i,'AddedBreakShields':/<BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'BaseBreakShields':/<BREAK (?:SHIELD|SHIELDS): (\d+)>/i},DataManager[_0xe1bb6(0x172)]=function(_0x4ff285){const _0x4a22ff=_0xe1bb6;_0x4ff285=_0x4ff285[_0x4a22ff(0x128)]()['trim'](),this[_0x4a22ff(0x13e)]=this[_0x4a22ff(0x13e)]||{};if(this['_elementIDs'][_0x4ff285])return this[_0x4a22ff(0x13e)][_0x4ff285];let _0x65d921=0x1;for(const _0x2db751 of $dataSystem[_0x4a22ff(0x1dd)]){if(!_0x2db751)continue;let _0x2efe77=_0x2db751['toUpperCase']();_0x2efe77=_0x2efe77['replace'](/\x1I\[(\d+)\]/gi,''),_0x2efe77=_0x2efe77[_0x4a22ff(0x228)](/\\I\[(\d+)\]/gi,''),this['_elementIDs'][_0x2efe77]=_0x65d921,_0x65d921++;}return this[_0x4a22ff(0x13e)][_0x4ff285]||0x0;},ImageManager[_0xe1bb6(0x1ca)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI']['ShieldIcon'],ImageManager[_0xe1bb6(0x191)]=VisuMZ['BreakShields']['Settings']['UI']['StunIcon'],ImageManager[_0xe1bb6(0x15f)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x1b4)],ImageManager[_0xe1bb6(0x18f)]=VisuMZ[_0xe1bb6(0x118)]['Settings']['UI'][_0xe1bb6(0x16c)],SceneManager['isSceneBattle']=function(){const _0x2645c2=_0xe1bb6;return this[_0x2645c2(0x159)]&&this[_0x2645c2(0x159)][_0x2645c2(0x188)]===Scene_Battle;},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x163)]=BattleManager[_0xe1bb6(0x1af)],BattleManager[_0xe1bb6(0x1af)]=function(_0x331cb5,_0x2f52f6,_0xab989e){const _0x37f80c=_0xe1bb6;VisuMZ['BreakShields']['BattleManager_setup']['call'](this,_0x331cb5,_0x2f52f6,_0xab989e),$gameParty[_0x37f80c(0x1c3)](),$gameTroop[_0x37f80c(0x1c3)]();},Game_Action[_0xe1bb6(0x1bd)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x21a)],Game_Action[_0xe1bb6(0x1e3)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x149)],VisuMZ[_0xe1bb6(0x118)]['Game_Action_executeDamage']=Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x1d4)],Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x1d4)]=function(_0x497bc5,_0x229d02){const _0x23313d=_0xe1bb6;VisuMZ[_0x23313d(0x118)][_0x23313d(0x1ab)][_0x23313d(0x200)](this,_0x497bc5,_0x229d02),!!_0x497bc5&&_0x229d02>0x0&&_0x497bc5[_0x23313d(0x227)]()&&this[_0x23313d(0x1f2)]()&&(_0x23313d(0x17b)!=='SeOFn'?this['_numberValue']='':this['executeBreakShieldReduction'](_0x497bc5,_0x229d02));},Game_Action['prototype'][_0xe1bb6(0x186)]=function(_0x51f9e1,_0x419f4a){const _0x29197a=_0xe1bb6;if(!_0x51f9e1['isBreakStunned']()){var _0x2fd37b=this[_0x29197a(0x1e2)](_0x51f9e1);if(_0x2fd37b>=Game_Action['BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE']){if(_0x29197a(0x1b0)!=='nGvXF'){var _0x419f4a=-0x1*this['itemBreakShieldReduction']();_0x51f9e1['startBreakShieldReduceAnimation'](),_0x51f9e1['alterBreakShield'](_0x419f4a);}else return _0x12a9ea-_0x3a022f;}}},Game_Action['prototype'][_0xe1bb6(0x1e2)]=function(_0x347932){const _0x532e37=_0xe1bb6;this[_0x532e37(0x162)]=!![];const _0x4260dd=this[_0x532e37(0x1fb)](_0x347932);return this[_0x532e37(0x162)]=undefined,_0x4260dd;},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1a8)]=Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x22c)],Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x22c)]=function(_0x372a27,_0x35db8c){const _0x4301fb=_0xe1bb6;if(this[_0x4301fb(0x162)])return 0x0;return VisuMZ[_0x4301fb(0x118)][_0x4301fb(0x1a8)]['call'](this,_0x372a27,_0x35db8c);},VisuMZ['BreakShields'][_0xe1bb6(0x1cf)]=Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x20a)],Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x20a)]=function(_0x361d7e,_0x450b21){const _0x1ded71=_0xe1bb6;if(this[_0x1ded71(0x162)])return 0x1;return VisuMZ[_0x1ded71(0x118)][_0x1ded71(0x1cf)]['call'](this,_0x361d7e,_0x450b21);},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x215)]=Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x1d1)],Game_Action['prototype'][_0xe1bb6(0x1d1)]=function(_0x33d7ef,_0x39fca8){const _0x3bda44=_0xe1bb6;if(this[_0x3bda44(0x162)])return 0x0;return VisuMZ[_0x3bda44(0x118)]['Game_Action_calcUserElementDamageFlat'][_0x3bda44(0x200)](this,_0x33d7ef,_0x39fca8);},Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x15e)]=function(){const _0x5e375a=_0xe1bb6,_0x53061d=VisuMZ[_0x5e375a(0x118)][_0x5e375a(0x1cb)];return this[_0x5e375a(0x16e)]()[_0x5e375a(0x226)][_0x5e375a(0x164)](_0x53061d[_0x5e375a(0x179)])?parseInt(RegExp['$1']):Game_Action[_0x5e375a(0x1e3)];},VisuMZ[_0xe1bb6(0x118)]['Game_Action_applyItemUserEffect']=Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x1e8)],Game_Action['prototype']['applyItemUserEffect']=function(_0x316558){const _0x236ef2=_0xe1bb6;VisuMZ['BreakShields'][_0x236ef2(0x165)][_0x236ef2(0x200)](this,_0x316558),!!_0x316558&&_0x316558[_0x236ef2(0x227)]()&&this[_0x236ef2(0x208)](_0x316558);},Game_Action[_0xe1bb6(0x216)][_0xe1bb6(0x208)]=function(_0x542d12){const _0x1196cf=_0xe1bb6;if(!_0x542d12[_0x1196cf(0x18b)]()){const _0x254c71=VisuMZ[_0x1196cf(0x118)]['RegExp'];this['item']()[_0x1196cf(0x226)][_0x1196cf(0x164)](_0x254c71['SetBreakShield'])&&(_0x542d12['setBreakShield'](parseInt(RegExp['$1'])),$gameTemp['_needRefreshAllEnemyWeaknessWindows']=!![]),this[_0x1196cf(0x16e)]()[_0x1196cf(0x226)][_0x1196cf(0x164)](_0x254c71[_0x1196cf(0x203)])&&(_0x542d12[_0x1196cf(0x194)](parseInt(RegExp['$1'])),$gameTemp[_0x1196cf(0x180)]=!![]);}},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x13d)]=Game_BattlerBase['prototype'][_0xe1bb6(0x18e)],Game_BattlerBase['prototype'][_0xe1bb6(0x18e)]=function(_0x40e143){const _0x1f6d6c=_0xe1bb6;var _0x28439b=VisuMZ['BreakShields']['Game_BattlerBase_elementRate'][_0x1f6d6c(0x200)](this,_0x40e143);if(this['getProtectedWeaknessElements']()[_0x1f6d6c(0x1e1)](_0x40e143)){if(_0x1f6d6c(0x1f8)===_0x1f6d6c(0x204))this[_0x1f6d6c(0x19c)]=_0x1a4599[_0x1f6d6c(0x174)](_0xe272af),this[_0x1f6d6c(0x19c)]=this['_currentBreakShield']['clamp'](0x0,_0x822dd4[_0x1f6d6c(0x1c8)]),this[_0x1f6d6c(0x19c)]<=0x0&&this[_0x1f6d6c(0x15a)](),this['refresh']();else return Math['min'](0x1,_0x28439b);}else{if(_0x1f6d6c(0x1d0)!==_0x1f6d6c(0x1d0)){this[_0x1f6d6c(0x1e5)]=this[_0x1f6d6c(0x119)][_0x1f6d6c(0x20f)][_0x3fb8b5['id']]||0x0;if(this[_0x1f6d6c(0x1e5)]<=0x0)this[_0x1f6d6c(0x1e5)]='';}else return _0x28439b;}},Game_BattlerBase[_0xe1bb6(0x216)][_0xe1bb6(0x219)]=function(_0x28bf27){const _0x45957=_0xe1bb6;return VisuMZ[_0x45957(0x118)][_0x45957(0x13d)][_0x45957(0x200)](this,_0x28bf27);},Game_Battler['BREAK_SHIELDS_BASE']=VisuMZ[_0xe1bb6(0x118)]['Settings'][_0xe1bb6(0x130)][_0xe1bb6(0x151)],Game_Battler[_0xe1bb6(0x1c8)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x132)],Game_Battler[_0xe1bb6(0x1db)]=VisuMZ['BreakShields'][_0xe1bb6(0x183)]['Mechanics'][_0xe1bb6(0x19e)],Game_Battler['BREAK_SHIELDS_REDUCE_ANIMATION']=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x110)],Game_Battler['BREAK_SHIELDS_STUN_ANIMATION']=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x14c)],Game_Battler[_0xe1bb6(0x1b7)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x1a4)],Game_Battler['BREAK_SHIELDS_ENEMIES']=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)][_0xe1bb6(0x130)][_0xe1bb6(0x18c)],VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x17f)]=Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x125)],Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x125)]=function(){const _0x4db59f=_0xe1bb6;VisuMZ['BreakShields'][_0x4db59f(0x17f)]['call'](this),this[_0x4db59f(0x141)]();},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x227)]=function(){return![];},Game_Battler['prototype'][_0xe1bb6(0x141)]=function(){const _0x4c6e4a=_0xe1bb6;this[_0x4c6e4a(0x227)]()&&(_0x4c6e4a(0x212)===_0x4c6e4a(0x18d)?(this[_0x4c6e4a(0x119)]=null,this[_0x4c6e4a(0x12f)]=![],this[_0x4c6e4a(0x1bc)]=0x0,this[_0x4c6e4a(0x1e5)]='',this[_0x4c6e4a(0x113)]='',this['anchor']['x']=0.5,this[_0x4c6e4a(0x1d6)]['y']=0.5):this['setBreakShield'](this[_0x4c6e4a(0x22b)]()));},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x1c6)]=function(){const _0xaeb982=_0xe1bb6;return Game_Battler[_0xaeb982(0x1bf)];},Game_Battler[_0xe1bb6(0x216)]['topBreakShield']=function(){const _0x3d7232=_0xe1bb6;var _0x160fca=this[_0x3d7232(0x1c6)]();return _0x160fca=this[_0x3d7232(0x223)](_0x160fca),_0x160fca['clamp'](0x1,Game_Battler[_0x3d7232(0x1c8)]);},Game_Battler['prototype'][_0xe1bb6(0x223)]=function(_0x46e2f1){const _0x3bb7d7=_0xe1bb6,_0x4758f8=VisuMZ[_0x3bb7d7(0x118)][_0x3bb7d7(0x1cb)];for(const _0x168a62 of this[_0x3bb7d7(0x116)]()){if(_0x3bb7d7(0x222)==='uKIOG'){if(!_0x168a62)continue;_0x168a62[_0x3bb7d7(0x226)][_0x3bb7d7(0x164)](_0x4758f8[_0x3bb7d7(0x1e9)])&&(_0x46e2f1+=Number(RegExp['$1'])||0x0);}else{var _0xadc353=_0xdcaf92[_0x3bb7d7(0x118)][_0x3bb7d7(0x13d)][_0x3bb7d7(0x200)](this,_0x5807fb);return this['getProtectedWeaknessElements']()['contains'](_0x494a52)?_0xcdab2f[_0x3bb7d7(0x135)](0x1,_0xadc353):_0xadc353;}}return _0x46e2f1;},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x181)]=function(){const _0x366258=_0xe1bb6;return this['_currentBreakShield']===undefined&&(_0x366258(0x146)===_0x366258(0x146)?this[_0x366258(0x17e)](this[_0x366258(0x22b)]()):this[_0x366258(0x1a3)]()),this[_0x366258(0x19c)];},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x17e)]=function(_0x4ea2e0){const _0x221d86=_0xe1bb6;this['isAffectedByBreakShield']()&&(this[_0x221d86(0x19c)]=Math[_0x221d86(0x174)](_0x4ea2e0),this[_0x221d86(0x19c)]=this[_0x221d86(0x19c)][_0x221d86(0x213)](0x0,Game_Battler[_0x221d86(0x1c8)]),this[_0x221d86(0x19c)]<=0x0&&(_0x221d86(0x13a)!=='XSDrr'?this[_0x221d86(0x1ac)](_0x18ce56):this[_0x221d86(0x15a)]()),this['refresh']());},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x194)]=function(_0x5ef10b){const _0x4c2abf=_0xe1bb6;this[_0x4c2abf(0x17e)](this[_0x4c2abf(0x181)]()+_0x5ef10b);},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x15a)]=function(){const _0x316dbb=_0xe1bb6;this[_0x316dbb(0x17e)](this[_0x316dbb(0x22b)]());var _0x546422=Game_Battler[_0x316dbb(0x1db)];this[_0x316dbb(0x196)](_0x546422),this[_0x316dbb(0x167)]();},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x18b)]=function(){const _0x279c92=_0xe1bb6;return this[_0x279c92(0x134)](Game_Battler[_0x279c92(0x1db)]);},Game_Battler['prototype']['startBreakShieldReduceAnimation']=function(){const _0xd05993=_0xe1bb6;if(Imported['VisuMZ_0_CoreEngine']&&Game_Battler[_0xd05993(0x1b5)]){var _0x455c02=Game_Battler[_0xd05993(0x1b5)];$gameTemp[_0xd05993(0x133)]([this],_0x455c02,![],![]);}},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x167)]=function(){const _0x35485e=_0xe1bb6;if(Imported[_0x35485e(0x144)]&&Game_Battler[_0x35485e(0x190)]){var _0x22a588=Game_Battler[_0x35485e(0x190)];$gameTemp[_0x35485e(0x133)]([this],_0x22a588,![],![]);}},Game_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x205)]=function(){const _0x5282af=_0xe1bb6,_0x2a0fbe=VisuMZ[_0x5282af(0x118)][_0x5282af(0x1cb)];let _0x4ee942=[];for(const _0x5742f5 of this['traitObjects']()){if(!_0x5742f5)continue;if(_0x5742f5[_0x5282af(0x226)]['match'](_0x2a0fbe[_0x5282af(0x1bb)])){if(_0x5282af(0x13f)==='FkPay')_0x42d10d[_0x5282af(0x11c)](_0x104488(_0x56679c));else{const _0x3665d1=RegExp['$1'][_0x5282af(0x20b)](',')[_0x5282af(0x17c)](_0x2b6a5b=>_0x2b6a5b[_0x5282af(0x122)]());for(const _0x4c6493 of _0x3665d1){if('kAWwx'===_0x5282af(0x20d))_0x309de7[_0x5282af(0x118)][_0x5282af(0x165)]['call'](this,_0x28fb58),!!_0xf9d623&&_0x4cd8f[_0x5282af(0x227)]()&&this[_0x5282af(0x208)](_0x33f8b2);else{const _0x122dcb=/^\d+$/['test'](_0x4c6493);if(_0x122dcb)_0x4ee942[_0x5282af(0x11c)](Number(_0x4c6493));else{if(_0x5282af(0x12d)!==_0x5282af(0x12d)){if(this['_displayValue']===this[_0x5282af(0x1e5)])return;this[_0x5282af(0x113)]=this[_0x5282af(0x1e5)];const _0xf88c89=this[_0x5282af(0x22d)][_0x5282af(0x112)];_0xf88c89[_0x5282af(0x1d7)]=_0x36b13c[_0x5282af(0x19b)](),_0xf88c89[_0x5282af(0x198)]=_0x3f82db[_0x5282af(0x118)][_0x5282af(0x183)]['UI'][_0x5282af(0x1ef)],_0xf88c89['clear'](),_0xf88c89[_0x5282af(0x12a)](this['_displayValue'],0x0,0x0,_0xf88c89['width'],_0xf88c89[_0x5282af(0x1e7)],'center');}else{const _0x119c85=DataManager[_0x5282af(0x172)](_0x4c6493);if(_0x119c85)_0x4ee942[_0x5282af(0x11c)](_0x119c85);}}}}}}}return _0x4ee942[_0x5282af(0x1b9)](function(_0x4e6796,_0x356dad){return _0x4e6796-_0x356dad;}),_0x4ee942;},Game_Actor[_0xe1bb6(0x216)][_0xe1bb6(0x227)]=function(){const _0x2bc83d=_0xe1bb6;if(Imported[_0x2bc83d(0x147)]&&BattleManager[_0x2bc83d(0x1ae)]()&&BattleManager[_0x2bc83d(0x199)]())return this['stbCannotBeExploited']()?!![]:![];return Game_Battler[_0x2bc83d(0x1b7)];},Game_Actor[_0xe1bb6(0x216)][_0xe1bb6(0x1c6)]=function(){const _0xa350a1=_0xe1bb6,_0x57f6ce=VisuMZ['BreakShields'][_0xa350a1(0x1cb)];let _0x24b55c=Game_Battler['prototype'][_0xa350a1(0x1c6)][_0xa350a1(0x200)](this);if(!!this[_0xa350a1(0x1a0)]()&&this[_0xa350a1(0x1a0)]()['note'][_0xa350a1(0x164)](_0x57f6ce[_0xa350a1(0x210)])){if(_0xa350a1(0x217)!=='vlkZJ')return this[_0xa350a1(0x169)]()?!![]:![];else _0x24b55c=parseInt(RegExp['$1']);}else this['actor']()&&this[_0xa350a1(0x11b)]()[_0xa350a1(0x226)]['match'](_0x57f6ce[_0xa350a1(0x210)])&&(_0xa350a1(0x182)===_0xa350a1(0x1d8)?_0x4e66f3[_0xa350a1(0x141)]():_0x24b55c=parseInt(RegExp['$1']));return Math[_0xa350a1(0x123)](0x1,_0x24b55c);},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1b1)]=Game_Actor[_0xe1bb6(0x216)]['refresh'],Game_Actor['prototype'][_0xe1bb6(0x1df)]=function(){const _0x1c423d=_0xe1bb6;VisuMZ[_0x1c423d(0x118)][_0x1c423d(0x1b1)][_0x1c423d(0x200)](this),!$gameParty[_0x1c423d(0x1f3)]()&&!this[_0x1c423d(0x126)]&&(_0x1c423d(0x1be)===_0x1c423d(0x1be)?(this[_0x1c423d(0x126)]=!![],this[_0x1c423d(0x141)](),this[_0x1c423d(0x126)]=undefined):this[_0x1c423d(0x1bc)]=_0x2b8c83[_0x1c423d(0x138)]);},Game_Enemy[_0xe1bb6(0x216)][_0xe1bb6(0x227)]=function(){const _0x4cf866=_0xe1bb6;if(Imported[_0x4cf866(0x147)]&&BattleManager[_0x4cf866(0x1ae)]()&&BattleManager[_0x4cf866(0x199)]())return this[_0x4cf866(0x169)]()?!![]:![];return Game_Battler[_0x4cf866(0x184)];},Game_Enemy['prototype']['baseBreakShield']=function(){const _0x26c284=_0xe1bb6,_0x4e851b=VisuMZ[_0x26c284(0x118)]['RegExp'];let _0x10132c=Game_Battler['prototype']['baseBreakShield']['call'](this);return this[_0x26c284(0x197)]()&&this[_0x26c284(0x197)]()[_0x26c284(0x226)][_0x26c284(0x164)](_0x4e851b['BaseBreakShields'])&&(_0x26c284(0x1e4)!==_0x26c284(0x1ed)?_0x10132c=parseInt(RegExp['$1']):(_0x1fd8cc[_0x26c284(0x118)][_0x26c284(0x1dc)]['call'](this),this[_0x26c284(0x1b2)]=new _0x183d57(),this[_0x26c284(0x14b)](this[_0x26c284(0x1b2)]))),Math[_0x26c284(0x123)](0x1,_0x10132c);},Game_Unit[_0xe1bb6(0x216)][_0xe1bb6(0x1c3)]=function(){const _0x2c48a1=_0xe1bb6;var _0x103fee=this[_0x2c48a1(0x1b6)];this[_0x2c48a1(0x1b6)]=![];for(const _0x5560e8 of this[_0x2c48a1(0x22e)]()){if(_0x2c48a1(0x11d)==='dRFXn'){if(!_0x406347)return![];if(!_0x408134[_0x2c48a1(0x1d9)])return![];if(_0x5ab6f7[_0x2c48a1(0x19f)]())return _0x122774[_0x2c48a1(0x1b7)];else return _0x2679a1['isEnemy']()?_0x20438c[_0x2c48a1(0x184)]:!![];}else _0x5560e8&&_0x5560e8[_0x2c48a1(0x141)]();}this[_0x2c48a1(0x1b6)]=_0x103fee;},Sprite_Battler[_0xe1bb6(0x216)][_0xe1bb6(0x1a3)]=function(){const _0x10e577=_0xe1bb6;this['_breakShieldSprite']=new Sprite_BreakShieldIcon(),this['addChild'](this[_0x10e577(0x1b2)]);},Sprite_Actor[_0xe1bb6(0x1e0)]=VisuMZ['BreakShields'][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x14d)],Sprite_Actor[_0xe1bb6(0x16b)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x1b3)],Sprite_Actor[_0xe1bb6(0x1f1)]=VisuMZ['BreakShields']['Settings']['UI']['ActorOffsetX'],Sprite_Actor[_0xe1bb6(0x1f7)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x1a7)],VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1eb)]=Sprite_Actor[_0xe1bb6(0x216)][_0xe1bb6(0x206)],Sprite_Actor[_0xe1bb6(0x216)][_0xe1bb6(0x206)]=function(){const _0x3744a3=_0xe1bb6;VisuMZ[_0x3744a3(0x118)][_0x3744a3(0x1eb)][_0x3744a3(0x200)](this),this[_0x3744a3(0x1d2)]()&&this[_0x3744a3(0x1a3)]();},Sprite_Actor[_0xe1bb6(0x216)][_0xe1bb6(0x1d2)]=function(){const _0x4c3e80=_0xe1bb6;return Sprite_Actor['BREAK_SHIELD_BATTLER_DISPLAY_ICON']&&this[_0x4c3e80(0x188)]===Sprite_Actor;},VisuMZ['BreakShields']['Sprite_Actor_setBattler']=Sprite_Actor['prototype'][_0xe1bb6(0x127)],Sprite_Actor[_0xe1bb6(0x216)][_0xe1bb6(0x127)]=function(_0x504007){const _0x32c654=_0xe1bb6;VisuMZ[_0x32c654(0x118)][_0x32c654(0x16f)][_0x32c654(0x200)](this,_0x504007),this['_breakShieldSprite']&&this[_0x32c654(0x1b2)][_0x32c654(0x1af)](this[_0x32c654(0x176)],!![]);},Sprite_Enemy['BREAK_SHIELD_BATTLER_DISPLAY_ICON']=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI']['EnemyDisplayIcon'],Sprite_Enemy[_0xe1bb6(0x16b)]=VisuMZ['BreakShields'][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x153)],Sprite_Enemy[_0xe1bb6(0x1f1)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x1de)],Sprite_Enemy[_0xe1bb6(0x1f7)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x1aa)],Sprite_Enemy[_0xe1bb6(0x157)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x22a)],Sprite_Enemy[_0xe1bb6(0x171)]=VisuMZ[_0xe1bb6(0x118)]['Settings']['UI'][_0xe1bb6(0x1a9)],Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y']=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x111)],VisuMZ['BreakShields'][_0xe1bb6(0x20e)]=Sprite_Enemy[_0xe1bb6(0x216)][_0xe1bb6(0x206)],Sprite_Enemy[_0xe1bb6(0x216)]['initMembers']=function(){const _0xea485b=_0xe1bb6;VisuMZ[_0xea485b(0x118)][_0xea485b(0x20e)][_0xea485b(0x200)](this),this[_0xea485b(0x1d2)]()&&this[_0xea485b(0x1a3)]();},Sprite_Enemy[_0xe1bb6(0x216)]['isBreakShieldIconDisplayed']=function(){const _0x3a0ca3=_0xe1bb6;if(Imported[_0x3a0ca3(0x139)]&&Sprite_Enemy[_0x3a0ca3(0x157)]){if(_0x3a0ca3(0x150)!==_0x3a0ca3(0x150))this[_0x3a0ca3(0x1b2)]=new _0x527f8a(),this[_0x3a0ca3(0x14b)](this['_breakShieldSprite']);else return![];}else return _0x3a0ca3(0x12b)===_0x3a0ca3(0x12b)?Sprite_Enemy[_0x3a0ca3(0x1e0)]:this[_0x3a0ca3(0x119)]&&this[_0x3a0ca3(0x119)][_0x3a0ca3(0x10f)]()&&this[_0x3a0ca3(0x119)][_0x3a0ca3(0x227)]();},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1c1)]=Sprite_Enemy[_0xe1bb6(0x216)]['setBattler'],Sprite_Enemy[_0xe1bb6(0x216)][_0xe1bb6(0x127)]=function(_0x33dac8){const _0x2eb073=_0xe1bb6;VisuMZ[_0x2eb073(0x118)][_0x2eb073(0x1c1)][_0x2eb073(0x200)](this,_0x33dac8),this[_0x2eb073(0x1b2)]&&this['_breakShieldSprite'][_0x2eb073(0x1af)](this['_enemy'],!![]);};function _0x3d66(){const _0x6a26b1=['Base','_lineHeight','EnemyDisplayPosition','round','createAttachedSprites','drawItemStatusBreakBattleCore','BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME','lineHeight','_scene','applyBreakStun','MultiLayerHpGauge','7260305LYTwVD','battleLayoutStyle','itemBreakShieldReduction','breakShield_StunTurns','name','BattleStatusOffsetY','_calcRawBreakShieldEleRate','BattleManager_setup','match','Game_Action_applyItemUserEffect','nameY','startBreakShieldBrokenAnimation','isSceneBattle','stbCannotBeExploited','loadBitmap','BREAK_SHIELD_BATTLER_DISPLAY_POSITION','ProtectIcon','breakShields','item','Sprite_Actor_setBattler','actorId','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_X','getElementIdWithName','WRujX','ceil','list','_actor','updateAttachedSprites','2316714isotUk','BreakReduce','BETQC','SeOFn','map','ARRAYEVAL','setBreakShield','Game_Battler_removeBattleStates','_needRefreshAllEnemyWeaknessWindows','currentBreakShield','ktSrE','Settings','BREAK_SHIELDS_ENEMIES','floor','executeBreakShieldReduction','iconWidth','constructor','Window_BattleStatus_drawItemStatus','1919439NPYeVO','isBreakStunned','AffectEnemies','PZDHQ','elementRate','breakShield_ProtectIcon','BREAK_SHIELDS_STUN_ANIMATION','breakShield_StunIcon','qACtd','8887942oEQZxa','alterBreakShield','deathStateId','addState','enemy','fontSize','isSTBExploitSystemEnabled','opacity','numberFontFace','_currentBreakShield','actor%1-breakShieldIcon','StunState','isActor','currentClass','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createBreakShieldIconSprite','AffectActors','setFrame','description','ActorOffsetY','Game_Action_calcUserElementDamagePlus','AttachShieldOffsetX','EnemyOffsetY','Game_Action_executeDamage','drawItemStatusBreakShieldsDefault','status','isSTB','setup','aFPne','Game_Actor_refresh','_breakShieldSprite','ActorDisplayPosition','ShowStunTurns','BREAK_SHIELDS_REDUCE_ANIMATION','_inBattle','BREAK_SHIELDS_ACTORS','createNumberDisplay','sort','Sprite_EnemyName_updateAttachedSprites','ProtectedElements','_iconIndex','BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE','gCGwp','BREAK_SHIELDS_BASE','updateBreakShieldMultiLayerHpGauge','Sprite_Enemy_setBattler','iATVI','resetBreakShields','BattleLayout','BREAK_SHIELDS_DISPLAY_AUTO','baseBreakShield','MenuStatusBreakShieldIcons','BREAK_SHIELDS_MAX','placeBreakShieldIcon','breakShield_ShieldIcon','RegExp','EVAL','width','initialize','Game_Action_calcUserElementDamageRate','DtiDW','calcUserElementDamageFlat','isBreakShieldIconDisplayed','tekBN','executeDamage','ShowFacesListStyle','anchor','fontFace','SWdMO','BREAK_SHIELDS_MENU_ICONS','BattleCore','BREAK_SHIELDS_STUN_STATE','Sprite_EnemyName_createAttachedSprites','elements','EnemyOffsetX','refresh','BREAK_SHIELD_BATTLER_DISPLAY_ICON','contains','calcRawBreakShieldElementRate','BREAK_SHIELDS_DEFAULT_REDUCTION','DFhvw','_numberValue','qXukX','height','applyItemUserEffect','AddedBreakShields','exit','Sprite_Actor_initMembers','2817CoJMjW','fEzpj','Compatibility','FontSize','findTargetSprite','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_X','isHpEffect','inBattle','BattleStatusOffsetX','NUM','parse','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_Y','AnPGQ','ARRAYFUNC','Window_StatusBase_drawActorIcons','calcElementRate','drawItemStatus','isDead','4946372nAzdba','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','call','SETTINGS','update','AlterBreakShield','bwxAK','getProtectedWeaknessElements','initMembers','27293208WTuxFK','applyChangeBreakShield','VJfjp','calcUserElementDamageRate','split','drawItemStatusBreakShields','wgosr','Sprite_Enemy_initMembers','_stateTurns','BaseBreakShields','showMultiLayerHpGauge','yufPp','clamp','move','Game_Action_calcUserElementDamageFlat','prototype','vlkZJ','STR','originalElementRate','MinRate','create','BeywB','BREAK_SHIELDS_DISPLAY_ICONS','ARRAYSTR','includes','BattleStatusAutoPosition','ARRAYJSON','uKIOG','addedBreakShields','VUygk','ARRAYNUM','note','isAffectedByBreakShield','replace','ARRAYSTRUCT','NameAttachShieldIcon','topBreakShield','calcUserElementDamagePlus','_numberSprite','members','isAppeared','ReduceAniID','AttachShieldOffsetY','bitmap','_displayValue','shouldDisplayBreakShields','updateIcon','traitObjects','updateFrame','BreakShields','_battler','ConvertParams','actor','push','sKNty','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','loadSystem','parameters','BREAK_SHIELDS_DISPLAY_OFFSET_X','trim','max','BREAK_SHIELDS_DISPLAY_OFFSET_Y','removeBattleStates','_resettingBreakShield','setBattler','toUpperCase','3454ZGToRR','drawText','rgdTe','reduceRedundancy','DBJjC','drawActorIcons','_autoPositioning','Mechanics','updateNumber','Max','requestFauxAnimation','isStateAffected','min','updateAutoPosition','show','iconIndex','VisuMZ_1_BattleCore','XSDrr','default','cYCFZ','Game_BattlerBase_elementRate','_elementIDs','WiCMQ','iconHeight','resetBreakShield','FUNC','format','VisuMZ_0_CoreEngine','clear','nbzpK','VisuMZ_2_BattleSystemSTB','return\x200','Reduction','battler','addChild','StunAniID','ActorDisplayIcon','IconSet','filter','UIpUP'];_0x3d66=function(){return _0x6a26b1;};return _0x3d66();}function Sprite_BreakShieldIcon(){this['initialize'](...arguments);}Sprite_BreakShieldIcon[_0xe1bb6(0x216)]=Object[_0xe1bb6(0x21b)](Sprite[_0xe1bb6(0x216)]),Sprite_BreakShieldIcon[_0xe1bb6(0x216)][_0xe1bb6(0x188)]=Sprite_BreakShieldIcon,Sprite_BreakShieldIcon['prototype'][_0xe1bb6(0x1ce)]=function(){const _0x1d8530=_0xe1bb6;Sprite[_0x1d8530(0x216)][_0x1d8530(0x1ce)][_0x1d8530(0x200)](this),this[_0x1d8530(0x206)](),this[_0x1d8530(0x16a)](),this[_0x1d8530(0x1b8)]();},Sprite_BreakShieldIcon[_0xe1bb6(0x216)][_0xe1bb6(0x206)]=function(){const _0x199599=_0xe1bb6;this[_0x199599(0x119)]=null,this[_0x199599(0x12f)]=![],this[_0x199599(0x1bc)]=0x0,this[_0x199599(0x1e5)]='',this[_0x199599(0x113)]='',this['anchor']['x']=0.5,this[_0x199599(0x1d6)]['y']=0.5;},Sprite_BreakShieldIcon[_0xe1bb6(0x216)][_0xe1bb6(0x16a)]=function(){const _0x4c1235=_0xe1bb6;this[_0x4c1235(0x112)]=ImageManager[_0x4c1235(0x11f)](_0x4c1235(0x14e)),this['setFrame'](0x0,0x0,0x0,0x0);},Sprite_BreakShieldIcon[_0xe1bb6(0x216)]['createNumberDisplay']=function(){const _0x3fefb4=_0xe1bb6;this[_0x3fefb4(0x22d)]=new Sprite(),this[_0x3fefb4(0x22d)][_0x3fefb4(0x112)]=new Bitmap(ImageManager[_0x3fefb4(0x187)],ImageManager[_0x3fefb4(0x140)]),this[_0x3fefb4(0x22d)][_0x3fefb4(0x1d6)]['x']=0.5,this[_0x3fefb4(0x22d)][_0x3fefb4(0x1d6)]['y']=0.5,this[_0x3fefb4(0x14b)](this[_0x3fefb4(0x22d)]);},Sprite_BreakShieldIcon[_0xe1bb6(0x216)]['setup']=function(_0x2a6490,_0x14ce1e){const _0x4cb9d4=_0xe1bb6;this[_0x4cb9d4(0x119)]!==_0x2a6490&&(this['_battler']=_0x2a6490),this[_0x4cb9d4(0x12f)]=_0x14ce1e;},Sprite_BreakShieldIcon[_0xe1bb6(0x216)][_0xe1bb6(0x202)]=function(){const _0x575e02=_0xe1bb6;Sprite[_0x575e02(0x216)][_0x575e02(0x202)]['call'](this);if(this['shouldDisplay']()){if(_0x575e02(0x224)===_0x575e02(0x1c2)){if(_0x440582['VisuMZ_0_CoreEngine']&&_0x497917['BREAK_SHIELDS_REDUCE_ANIMATION']){var _0x236c16=_0x2e63d9[_0x575e02(0x1b5)];_0x5b4714[_0x575e02(0x133)]([this],_0x236c16,![],![]);}}else this[_0x575e02(0x19a)]=0xff,this[_0x575e02(0x115)](),this[_0x575e02(0x117)](),this['updateNumber'](),this[_0x575e02(0x136)]();}else this[_0x575e02(0x19a)]=0x0;},Sprite_BreakShieldIcon['prototype']['shouldDisplay']=function(){const _0x1f038f=_0xe1bb6;return this['_battler']&&this[_0x1f038f(0x119)][_0x1f038f(0x10f)]()&&this[_0x1f038f(0x119)][_0x1f038f(0x227)]();},Sprite_BreakShieldIcon[_0xe1bb6(0x216)]['updateIcon']=function(){const _0x12e3b0=_0xe1bb6;if(this[_0x12e3b0(0x119)][_0x12e3b0(0x1fd)]()){const _0x48b5fd=$dataStates[this[_0x12e3b0(0x119)][_0x12e3b0(0x195)]()];_0x48b5fd&&_0x48b5fd[_0x12e3b0(0x138)]>0x0?this['_iconIndex']=_0x48b5fd['iconIndex']:this['_iconIndex']=0x0,this[_0x12e3b0(0x1e5)]='';}else{if(this[_0x12e3b0(0x119)][_0x12e3b0(0x18b)]()){const _0x569d6f=$dataStates[Game_Battler[_0x12e3b0(0x1db)]];_0x569d6f&&_0x569d6f[_0x12e3b0(0x138)]>0x0?this['_iconIndex']=_0x569d6f[_0x12e3b0(0x138)]:this[_0x12e3b0(0x1bc)]=ImageManager[_0x12e3b0(0x191)];if(ImageManager['breakShield_StunTurns']){this[_0x12e3b0(0x1e5)]=this[_0x12e3b0(0x119)][_0x12e3b0(0x20f)][_0x569d6f['id']]||0x0;if(this[_0x12e3b0(0x1e5)]<=0x0)this['_numberValue']='';}else'nadcK'==='lDkTf'?_0x93a2c1&&_0x434db3[_0x12e3b0(0x141)]():this[_0x12e3b0(0x1e5)]='';}else this['_iconIndex']=ImageManager[_0x12e3b0(0x1ca)],this[_0x12e3b0(0x1e5)]=this['_battler'][_0x12e3b0(0x181)]();}},Sprite_BreakShieldIcon[_0xe1bb6(0x216)]['updateFrame']=function(){const _0x3e7d9a=_0xe1bb6,_0x26bdfc=ImageManager[_0x3e7d9a(0x187)],_0x1bd7b6=ImageManager[_0x3e7d9a(0x140)],_0x6ccbbc=this[_0x3e7d9a(0x1bc)]%0x10*_0x26bdfc,_0x4b936d=Math['floor'](this[_0x3e7d9a(0x1bc)]/0x10)*_0x1bd7b6;this[_0x3e7d9a(0x1a5)](_0x6ccbbc,_0x4b936d,_0x26bdfc,_0x1bd7b6);},Sprite_BreakShieldIcon[_0xe1bb6(0x216)][_0xe1bb6(0x131)]=function(){const _0x3463da=_0xe1bb6;if(this['_displayValue']===this[_0x3463da(0x1e5)])return;this[_0x3463da(0x113)]=this[_0x3463da(0x1e5)];const _0x4e930d=this[_0x3463da(0x22d)][_0x3463da(0x112)];_0x4e930d['fontFace']=$gameSystem[_0x3463da(0x19b)](),_0x4e930d['fontSize']=VisuMZ[_0x3463da(0x118)][_0x3463da(0x183)]['UI'][_0x3463da(0x1ef)],_0x4e930d[_0x3463da(0x145)](),_0x4e930d[_0x3463da(0x12a)](this['_displayValue'],0x0,0x0,_0x4e930d['width'],_0x4e930d[_0x3463da(0x1e7)],'center');},Sprite_BreakShieldIcon['prototype'][_0xe1bb6(0x136)]=function(){const _0x3778e2=_0xe1bb6;if(!this[_0x3778e2(0x12f)])return;if(!SceneManager[_0x3778e2(0x168)]())return;if(!SceneManager[_0x3778e2(0x159)]['_spriteset'])return;const _0x2df911=SceneManager[_0x3778e2(0x159)]['_spriteset'][_0x3778e2(0x1f0)](this[_0x3778e2(0x119)]);if(!_0x2df911)return;const _0x1438be=this[_0x3778e2(0x119)][_0x3778e2(0x19f)]()?Sprite_Actor:Sprite_Enemy,_0x28ff06=_0x1438be[_0x3778e2(0x16b)];this['x']=0x0;if(_0x28ff06['match'](/left/i))this['x']=Math[_0x3778e2(0x185)](_0x2df911['width']/-0x2);else _0x28ff06[_0x3778e2(0x164)](/right/i)&&(this['x']=Math[_0x3778e2(0x174)](_0x2df911['width']/0x2));this['x']+=_0x1438be[_0x3778e2(0x1f1)],this['y']=0x0;if(_0x28ff06[_0x3778e2(0x164)](/top/i))this['y']=_0x2df911[_0x3778e2(0x1e7)]*-0x1;else{if(_0x28ff06['match'](/middle/i)){if(_0x3778e2(0x13c)===_0x3778e2(0x13c))this['y']=Math[_0x3778e2(0x154)](_0x2df911['height']*-0.5);else return _0x4ffa6b['status']&&_0x4301e9[_0x3778e2(0x1a6)][_0x3778e2(0x21f)]('['+_0x46b5c0+']');}}this['y']+=_0x1438be[_0x3778e2(0x1f7)];};Imported[_0xe1bb6(0x139)]&&Sprite_Enemy[_0xe1bb6(0x157)]&&(VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1dc)]=Sprite_EnemyName[_0xe1bb6(0x216)][_0xe1bb6(0x155)],Sprite_EnemyName[_0xe1bb6(0x216)][_0xe1bb6(0x155)]=function(){const _0x35e621=_0xe1bb6;VisuMZ[_0x35e621(0x118)][_0x35e621(0x1dc)][_0x35e621(0x200)](this),this[_0x35e621(0x1b2)]=new Sprite_BreakShieldIcon(),this[_0x35e621(0x14b)](this[_0x35e621(0x1b2)]);},VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1ba)]=Sprite_EnemyName[_0xe1bb6(0x216)]['updateAttachedSprites'],Sprite_EnemyName[_0xe1bb6(0x216)][_0xe1bb6(0x177)]=function(){const _0x4c05b2=_0xe1bb6;VisuMZ[_0x4c05b2(0x118)][_0x4c05b2(0x1ba)][_0x4c05b2(0x200)](this),this['updateBreakShieldIconSprite']();},Sprite_EnemyName['prototype']['updateBreakShieldIconSprite']=function(){const _0x96e8cd=_0xe1bb6;if(!this[_0x96e8cd(0x1b2)])return;this[_0x96e8cd(0x119)]!==this[_0x96e8cd(0x1b2)][_0x96e8cd(0x119)]&&this['_breakShieldSprite'][_0x96e8cd(0x1af)](this[_0x96e8cd(0x119)],![]);const _0x133ad4=this['textWidth']();this[_0x96e8cd(0x152)]=this[_0x96e8cd(0x152)]||Window_Base['prototype'][_0x96e8cd(0x158)](),this[_0x96e8cd(0x1b2)]['x']=Math['round']((_0x133ad4+ImageManager[_0x96e8cd(0x187)])/-0x2)-0x8,this['_breakShieldSprite']['y']=this[_0x96e8cd(0x152)]/0x2,this[_0x96e8cd(0x1b2)]['x']+=Sprite_Enemy[_0x96e8cd(0x171)]||0x0,this['_breakShieldSprite']['y']+=Sprite_Enemy[_0x96e8cd(0x1a1)]||0x0,this[_0x96e8cd(0x1c0)]();},Sprite_EnemyName[_0xe1bb6(0x216)][_0xe1bb6(0x1c0)]=function(){const _0x4bb7e3=_0xe1bb6;if(!Imported['VisuMZ_4_MultiLayerHpGauge'])return;if(!this['_battler'][_0x4bb7e3(0x211)]())return;if(!Sprite_MultiLayerHpStates[_0x4bb7e3(0x201)][_0x4bb7e3(0x16d)])return;const _0x411c89=VisuMZ[_0x4bb7e3(0x15b)][_0x4bb7e3(0x1ee)][_0x4bb7e3(0x14a)][_0x4bb7e3(0x12c)];if(_0x411c89[_0x4bb7e3(0x16d)]&&Sprite_MultiLayerHpStates[_0x4bb7e3(0x201)][_0x4bb7e3(0x137)]){if(_0x4bb7e3(0x21c)!==_0x4bb7e3(0x21c)){const _0x1b0269=_0x1df94b[_0x4bb7e3(0x118)][_0x4bb7e3(0x1cb)];let _0x867464=_0x5f62b1['prototype'][_0x4bb7e3(0x1c6)]['call'](this);if(!!this[_0x4bb7e3(0x1a0)]()&&this[_0x4bb7e3(0x1a0)]()[_0x4bb7e3(0x226)][_0x4bb7e3(0x164)](_0x1b0269[_0x4bb7e3(0x210)]))_0x867464=_0x34159f(_0x2440d7['$1']);else this[_0x4bb7e3(0x11b)]()&&this[_0x4bb7e3(0x11b)]()[_0x4bb7e3(0x226)][_0x4bb7e3(0x164)](_0x1b0269['BaseBreakShields'])&&(_0x867464=_0x11625a(_0x597668['$1']));return _0xc4d7d0[_0x4bb7e3(0x123)](0x1,_0x867464);}else this[_0x4bb7e3(0x1b2)]['y']+=Graphics[_0x4bb7e3(0x1e7)]*0xa;}});;Window_StatusBase[_0xe1bb6(0x1d9)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x1c7)],VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x1fa)]=Window_StatusBase[_0xe1bb6(0x216)][_0xe1bb6(0x12e)],Window_StatusBase[_0xe1bb6(0x216)][_0xe1bb6(0x12e)]=function(_0x205358,_0x1d9a0f,_0x432ffd,_0x244cff){const _0x8b98ab=_0xe1bb6;_0x244cff=_0x244cff||0x90;if(this[_0x8b98ab(0x114)](_0x205358)){const _0x1617a0=_0x1d9a0f+Math['round'](ImageManager['iconWidth']/0x2),_0x12b35b=_0x432ffd+Math[_0x8b98ab(0x154)](ImageManager[_0x8b98ab(0x140)]/0x2)+0x2;this[_0x8b98ab(0x1c9)](_0x205358,_0x1617a0,_0x12b35b),_0x1d9a0f+=ImageManager[_0x8b98ab(0x187)],_0x244cff-=ImageManager['iconWidth'];}VisuMZ[_0x8b98ab(0x118)][_0x8b98ab(0x1fa)][_0x8b98ab(0x200)](this,_0x205358,_0x1d9a0f,_0x432ffd,_0x244cff);},Window_StatusBase[_0xe1bb6(0x216)]['shouldDisplayBreakShields']=function(_0x33276b){const _0x422075=_0xe1bb6;if(!_0x33276b)return![];if(!Window_StatusBase[_0x422075(0x1d9)])return![];if(_0x33276b[_0x422075(0x19f)]())return Game_Battler[_0x422075(0x1b7)];else return _0x33276b['isEnemy']()?Game_Battler[_0x422075(0x184)]:!![];},Window_StatusBase[_0xe1bb6(0x216)][_0xe1bb6(0x1c9)]=function(_0x54bd61,_0x188328,_0x22f61f){const _0x4e5c5a=_0xe1bb6,_0x3151e3=(_0x54bd61[_0x4e5c5a(0x19f)]()?_0x54bd61[_0x4e5c5a(0x170)]():_0x54bd61['_enemyId'])||0x0,_0x219002=_0x4e5c5a(0x19d)['format'](_0x3151e3),_0x3138f5=this['createInnerSprite'](_0x219002,Sprite_BreakShieldIcon);_0x3138f5[_0x4e5c5a(0x1af)](_0x54bd61,![]),_0x3138f5[_0x4e5c5a(0x214)](_0x188328,_0x22f61f),_0x3138f5[_0x4e5c5a(0x137)]();},Window_BattleStatus[_0xe1bb6(0x21d)]=VisuMZ['BreakShields'][_0xe1bb6(0x183)]['UI']['BattleStatusDisplayIcons'],Window_BattleStatus[_0xe1bb6(0x1c5)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x220)],Window_BattleStatus[_0xe1bb6(0x121)]=VisuMZ[_0xe1bb6(0x118)]['Settings']['UI'][_0xe1bb6(0x1f4)],Window_BattleStatus[_0xe1bb6(0x124)]=VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x183)]['UI'][_0xe1bb6(0x161)],VisuMZ[_0xe1bb6(0x118)][_0xe1bb6(0x189)]=Window_BattleStatus[_0xe1bb6(0x216)][_0xe1bb6(0x1fc)],Window_BattleStatus[_0xe1bb6(0x216)][_0xe1bb6(0x1fc)]=function(_0x57d05b){const _0x36ef2f=_0xe1bb6;VisuMZ[_0x36ef2f(0x118)][_0x36ef2f(0x189)][_0x36ef2f(0x200)](this,_0x57d05b),this[_0x36ef2f(0x20c)](_0x57d05b);},Window_BattleStatus[_0xe1bb6(0x216)]['drawItemStatusBreakShields']=function(_0x219bfc){const _0x52038a=_0xe1bb6;if(!Window_BattleStatus[_0x52038a(0x21d)])return;if(!Game_Battler[_0x52038a(0x1b7)])return;const _0x25ef59=this[_0x52038a(0x11b)](_0x219bfc);if(!_0x25ef59[_0x52038a(0x227)]())return;if(!Window_BattleStatus[_0x52038a(0x1c5)])this[_0x52038a(0x1ac)](_0x219bfc);else!Imported[_0x52038a(0x139)]?this[_0x52038a(0x1ac)](_0x219bfc):_0x52038a(0x209)!=='VJfjp'?_0x39614d=_0xbcc2f6(_0x186b83['$1']):this[_0x52038a(0x156)](_0x219bfc);},Window_BattleStatus[_0xe1bb6(0x216)][_0xe1bb6(0x1ac)]=function(_0x520228){const _0x27bcb2=_0xe1bb6,_0xd0e50f=this['actor'](_0x520228),_0x6a718b=this['itemRectWithPadding'](_0x520228),_0x3ce81f=Math[_0x27bcb2(0x154)](ImageManager[_0x27bcb2(0x187)]/0x2);let _0x3ce420=_0x6a718b['x']+_0x3ce81f-0x4+Window_BattleStatus[_0x27bcb2(0x121)],_0x15c1a0=_0x6a718b['y']+_0x3ce81f+0x4+Window_BattleStatus['BREAK_SHIELDS_DISPLAY_OFFSET_Y'];this['placeBreakShieldIcon'](_0xd0e50f,_0x3ce420,_0x15c1a0);},Window_BattleStatus[_0xe1bb6(0x216)]['drawItemStatusBreakBattleCore']=function(_0x3c3ee3){const _0x119807=_0xe1bb6,_0x5ad037=this[_0x119807(0x11b)](_0x3c3ee3),_0x476b3f=this['itemRect'](_0x3c3ee3),_0xd60ec1=Math['round'](_0x476b3f['x']+(_0x476b3f[_0x119807(0x1cd)]-0x80)/0x2),_0x574bae=this[_0x119807(0x166)](_0x476b3f),_0x342c61=Math['round'](ImageManager[_0x119807(0x187)]/0x2);let _0x411be4=_0xd60ec1-_0x342c61-0x4,_0x3f92a3=_0x574bae+_0x342c61;if(_0x411be4-ImageManager[_0x119807(0x187)]/0x2<_0x476b3f['x']){if(_0x119807(0x1e6)===_0x119807(0x1e6))_0x411be4=_0xd60ec1+_0x342c61-0x4,_0x3f92a3=_0x574bae-_0x342c61;else return this['_currentBreakShield']===_0x52f995&&this['setBreakShield'](this[_0x119807(0x22b)]()),this[_0x119807(0x19c)];}let _0x2cbc4f=_0x476b3f['x']+_0x342c61+0x4,_0x1cbcfd=_0x476b3f['y']+_0x342c61+0x4;const _0x275e6f=this[_0x119807(0x15d)]();switch(_0x275e6f){case _0x119807(0x175):!VisuMZ[_0x119807(0x1da)][_0x119807(0x183)][_0x119807(0x1c4)][_0x119807(0x1d5)]&&(_0x2cbc4f=_0x476b3f['x']+_0x476b3f['width']-ImageManager['iconWidth']);break;case'xp':case'portrait':case _0x119807(0x13b):case'border':_0x2cbc4f=_0x411be4,_0x1cbcfd=_0x3f92a3+ImageManager[_0x119807(0x140)];break;}_0x2cbc4f+=Window_BattleStatus[_0x119807(0x121)],_0x1cbcfd+=Window_BattleStatus['BREAK_SHIELDS_DISPLAY_OFFSET_Y'],this[_0x119807(0x1c9)](_0x5ad037,_0x2cbc4f,_0x1cbcfd);};