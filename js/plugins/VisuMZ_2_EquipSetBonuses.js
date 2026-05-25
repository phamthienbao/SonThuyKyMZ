//=============================================================================
// VisuStella MZ - Equipment Set Bonuses
// VisuMZ_2_EquipSetBonuses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipSetBonuses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipSetBonuses = VisuMZ.EquipSetBonuses || {};
VisuMZ.EquipSetBonuses.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.04] [EquipSetBonuses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Equipment_Set_Bonuses_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that allows you to set equipment to be a part
 * of various sets. When multiple pieces of the set are equipped, (for example:
 * Warrior Shield, Warrior Helm, Warrior Armor), then bonuses are applied.
 * Bonuses can be applied at different stages, too, depending on how many set
 * pieces are being currently equipped. The art (faces, map sprites, battler,
 * and various portraits for other plugins) for an actor can also change based
 * on the number of equipment sets worn.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create an unlimited amount of Equipment Sets to apply to actors when
 *   wearing matching sets of weapons and/or armor.
 * * Each equipment set can apply bonuses at various stages depending on the
 *   number of set pieces equipped up to a total of 20 per Equipment Set.
 * * A tooltip window to show extra data to show the player what bonuses are
 *   applied when different numbers of set pieces are equipped.
 * * Apply different appearances to actor graphics (face, map sprites, battler,
 *   and portraits) depending on the number of equipment pieces equipped for
 *   certain sets.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Equipment Set Graphics
 * 
 * If an actor has equipment set graphics defined, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The equipment set
 * graphics will take priority over the default graphics.
 * 
 * If an actor has multiple equipment sets on at the same time, each with their
 * own set graphics, the set with the highest number of pieces that has defined
 * graphics will be given priority.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Equipment Set Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Equipment
 * Set Graphics also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever Equipment Sets are equipped.
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
 * === Equipment Set Declaration-Related Notetags ===
 * 
 * ---
 *
 * <Equip Set: name>
 *
 * - Used for: Weapon, Armor Notetags
 * - This assigns this item to an equipment set.
 * - Replace 'name' with the set name you're going to associate this equip
 *   with. Names must equal the Equipment Set names declared in the Plugin
 *   Parameters or else they will not have any effect.
 * - If you want to make a piece of equipment be a part of two different
 *   equipment sets, use multiple copies of this notetag.
 *
 * ---
 * 
 * === Equipment Set Graphics-Related Notetags ===
 * 
 * ---
 *
 * <name Set, x Pieces Face: filename, index>
 * <name Set, x+ Pieces Face: filename, index>
 * <name Set, x to y Pieces Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Character: filename, index>
 * <name Set, x+ Pieces Character: filename, index>
 * <name Set, x to y Pieces Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battler: filename>
 * <name Set, x+ Pieces Battler: filename>
 * <name Set, x to y Pieces Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Menu Portrait: filename>
 * <name Set, x+ Pieces Menu Portrait: filename>
 * <name Set, x to y Pieces Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battle Portrait: filename>
 * <name Set, x+ Pieces Battle Portrait: filename>
 * <name Set, x to y Pieces Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equipment Sets Settings
 * ============================================================================
 *
 * This is where you put all your equipment sets used in the game.
 * Adjust their settings here.
 *
 * ---
 *
 * Equipment Set
 * 
 *   Equipment Set Name:
 *   - This set's name used for databasing and in-game.
 *   - Register equips to sets using <Equip Set: x> notetag.
 * 
 *   Icon:
 *   - This is the icon used to repesent the set name.
 *   - Use 0 to not show an icon.
 * 
 *   Bonuses:
 * 
 *   1 Piece Bonus:
 *   2 Pieces Bonus:
 *   3 Pieces Bonus:
 *   4 Pieces Bonus:
 *   5 Pieces Bonus:
 *   6 Pieces Bonus:
 *   7 Pieces Bonus:
 *   8 Pieces Bonus:
 *   9 Pieces Bonus:
 *   10 Pieces Bonus:
 *   11 Pieces Bonus:
 *   12 Pieces Bonus:
 *   13 Pieces Bonus:
 *   14 Pieces Bonus:
 *   15 Pieces Bonus:
 *   16 Pieces Bonus:
 *   17 Pieces Bonus:
 *   18 Pieces Bonus:
 *   19 Pieces Bonus:
 *   20 Pieces Bonus:
 *   - Bonuses applied for having this number of pieces equipped.
 *   - These settings stack with later bonuses in the same set.
 *
 * ---
 *
 * 1-20 Piece(s) Bonus
 * 
 *   Text:
 *   - Text that appears next to each piece in the tooltip window.
 *   - Use 'auto' if you want this to be done automatically.
 * 
 *     Show in Tooltip?:
 *     - Show this in the tooltip?
 * 
 *   Bonuses:
 * 
 *     Passive States:
 *     - States that will be given out as passives when the required piece
 *       count is equipped.
 * 
 *     Basic Parameters:
 *     - Bonuses applied to the Basic Parameters when the required piece count
 *       is equipped.
 * 
 *     X Parameters:
 *     - Bonuses applied to the X Parameters when the required piece count is
 *       equipped.
 * 
 *     S Parameters:
 *     - Bonuses applied to the S Parameters when the required piece count is
 *       equipped.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0 is +0.
 *
 * ---
 *
 * X Parameters
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
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * S Parameters
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
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings for Equipment Set Bonuses.
 *
 * ---
 *
 * Settings
 * 
 *   Base Parameter Add:
 *   X Parameter Add:
 *   S Parameter Add:
 *   - When do you wish to apply the "Add" bonus parameters?
 *   - Typical Formula: (base + plus) * rate + flat
 *     - Plus - Apply Before Rate
 *     - Flat - Apply After Rate
 *   - For the purpose of keeping the bonuses consistent without confusing any
 *     players, there will be no notetags to shift between the two settings as
 *     an exception for an equip bonus.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Tooltip settings for Equipment Set Bonuses. The tooltip window will appear
 * when selecting equipment with the <Equip Set: name> notetag.
 * 
 * By default, it will by anchored towards the upper left. However, if the
 * position of the tooltip would extend past the bottom of the screen, then the
 * tooltip window will change its anchor towards the bottom left as to not
 * cover the name of the item it is displaying information for.
 *
 * ---
 *
 * Appearance
 * 
 *   Show Tooltip?:
 *   - Show tooltips for Equipment Set Bonuses?
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down. 
 *   - Inversed when low on screen.
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
 * Version 1.04: August 17, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented character map sprites from being updated.
 *    Fix made by Irina.
 * 
 * Version 1.02: November 3, 2022
 * * Bug Fixes!
 * ** Fixed a problem with Custom text parameter that caused certain lines to
 *    not show up properly. Fix made by Irina.
 * 
 * Version 1.01: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.00 Official Release Date: March 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
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
 * @param EquipSetBonuses
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSets:arraystruct
 * @text Equipment Sets
 * @type struct<EquipSet>[]
 * @desc This is where you put all your equipment sets used in the
 * game. Adjust their settings here.
 * @default ["{\"SetName:str\":\"Hearty\",\"Icon:num\":\"84\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+50\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+25\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Sorcery\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Power\",\"Icon:num\":\"77\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+15\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.20\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Guardian\",\"Icon:num\":\"81\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+40\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Wizard\",\"Icon:num\":\"78\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Alchemist\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.10\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Speedy\",\"Icon:num\":\"82\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Fortuna\",\"Icon:num\":\"87\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.25\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.50\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}"]
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for Equipment Set Bonuses.
 * @default {"BaseParamAdd:str":"flat","XParamAdd:str":"flat","SParamAdd:str":"flat"}
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Tooltip settings for Equipment Set Bonuses.
 * @default {"Appearance":"","Show:eval":"true","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+24","OffsetY:num":"+40","Vocabulary":"","SetTitleFmt:str":"%2\\C[5]%1 Set Bonuses\\C[0]","SetPieceFmt:str":"\\C[5]∙%1 Set Effect:\\C[0] %2","SeparatorFmt:str":"%1, %2","StateFmt:str":"%2%1","RateFmt:str":"%1:%2","AddPosFmt:str":"%1+%2","AddNegFmt:str":"%1-%2"}
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
/*~struct~EquipSet:
 *
 * @param SetName:str
 * @text Equipment Set Name
 * @desc This set's name used for databasing and in-game.
 * Register equips to sets using <Equip Set: x> notetag.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent SetName:str
 * @desc This is the icon used to repesent the set name.
 * Use 0 to not show an icon.
 * @default 160
 *
 * @param Bonuses
 *
 * @param Piece1:struct
 * @text 1 Piece Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece2:struct
 * @text 2 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece3:struct
 * @text 3 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece4:struct
 * @text 4 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece5:struct
 * @text 5 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece6:struct
 * @text 6 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece7:struct
 * @text 7 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece8:struct
 * @text 8 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece9:struct
 * @text 9 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece10:struct
 * @text 10 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece11:struct
 * @text 11 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece12:struct
 * @text 12 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece13:struct
 * @text 13 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece14:struct
 * @text 14 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece15:struct
 * @text 15 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece16:struct
 * @text 16 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece17:struct
 * @text 17 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece18:struct
 * @text 18 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece19:struct
 * @text 19 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece20:struct
 * @text 20 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Set Pieces Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipSetPieces:
 *
 * @param Text:str
 * @text Text
 * @desc Text that appears next to each piece in the tooltip window.
 * Use 'auto' if you want this to be done automatically.
 * @default auto
 *
 * @param ShowText:eval
 * @text Show in Tooltip?
 * @parent Text
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this in the tooltip?
 * @default true
 * 
 * @param Bonuses
 * 
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Bonuses
 * @type state[]
 * @desc States that will be given out as passives when the
 * required piece count is equipped.
 * @default []
 *
 * @param Param:struct
 * @text Basic Parameters
 * @parent Bonuses
 * @type struct<Param>
 * @desc Bonuses applied to the Basic Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param XParam:struct
 * @text X Parameters
 * @parent Bonuses
 * @type struct<XParam>
 * @desc Bonuses applied to the X Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param SParam:struct
 * @text S Parameters
 * @parent Bonuses
 * @type struct<SParam>
 * @desc Bonuses applied to the S Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Param Bonuses Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 * @default Maximum Hit Points
 *
 * @param Rate0:num
 * @text Rate
 * @parent MaxHP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent MaxHP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MaxMP
 * @default Maximum Magic Points
 *
 * @param Rate1:num
 * @text Rate
 * @parent MaxMP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent MaxMP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param ATK
 * @default Attack
 *
 * @param Rate2:num
 * @text Rate
 * @parent ATK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent ATK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param DEF
 * @default Defense
 *
 * @param Rate3:num
 * @text Rate
 * @parent DEF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent DEF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MAT
 * @default Magic Attack
 *
 * @param Rate4:num
 * @text Rate
 * @parent MAT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MAT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MDF
 * @default Magic Defense
 *
 * @param Rate5:num
 * @text Rate
 * @parent MDF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MDF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param AGI
 * @default Agility
 *
 * @param Rate6:num
 * @text Rate
 * @parent AGI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent AGI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param LUK
 * @default Luck
 *
 * @param Rate7:num
 * @text Rate
 * @parent LUK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent LUK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * X Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~XParam:
 *
 * @param HIT
 * @default Hit Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent HIT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent HIT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EVA
 * @default Evasion Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent EVA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent EVA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CRI
 * @default Critical Hit
 *
 * @param Rate2:num
 * @text Rate
 * @parent CRI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent CRI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CEV
 * @default Critical Evasion
 *
 * @param Rate3:num
 * @text Rate
 * @parent CEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent CEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MEV
 * @default Magic Evasion
 *
 * @param Rate4:num
 * @text Rate
 * @parent MEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRF
 * @default Magic Reflect
 *
 * @param Rate5:num
 * @text Rate
 * @parent MRF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MRF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CNT
 * @default Counter Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent CNT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent CNT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param HRG
 * @default HP Regen Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent HRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent HRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRG
 * @default Magic Regen Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent MRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent MRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TRG
 * @default TP Regen Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent TRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent TRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * S Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SParam:
 *
 * @param TGR
 * @default Target Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent TGR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent TGR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param GRD
 * @default Guard Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent GRD
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent GRD
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param REC
 * @default Recovery Rate
 *
 * @param Rate2:num
 * @text Rate
 * @parent REC
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent REC
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PHA
 * @default Pharmacology Rate
 *
 * @param Rate3:num
 * @text Rate
 * @parent PHA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent PHA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MCR
 * @default MP Cost Rate
 *
 * @param Rate4:num
 * @text Rate
 * @parent MCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TCR
 * @default TP Charge Rate
 *
 * @param Rate5:num
 * @text Rate
 * @parent TCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent TCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PDR
 * @default Physical Damage Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent PDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent PDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MDR
 * @default Magical Damage Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent MDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent MDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param FDR
 * @default Floor Damage Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent FDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent FDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EXR
 * @default Experience Gain Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent EXR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent EXR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BaseParamAdd:str
 * @text Base Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param XParamAdd:str
 * @text X Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param SParamAdd:str
 * @text S Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Show:eval
 * @text Show Tooltip?
 * @parent Appearance
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips for Equipment Set Bonuses?
 * @default true
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +24
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down. Inversed when low on screen.
 * @default +40
 *
 * @param Vocabulary
 *
 * @param SetTitleFmt:str
 * @text Set Title Format
 * @parent Vocabulary
 * @desc How does the set title appear?
 * %1 - Set Name, %2 - Icon
 * @default %2\C[5]%1 Set Bonuses\C[0]
 *
 * @param SetPieceFmt:str
 * @text Set Piece Format
 * @parent Vocabulary
 * @desc How do the set pieces appear?
 * %1 - Set Name, %2 - Effects
 * @default \C[5]∙%1 Set Effect:\C[0] %2
 *
 * @param SeparatorFmt:str
 * @text Separator Format
 * @parent Vocabulary
 * @desc How do you wish to separate effects?
 * %1 - Previous Effect, %2 - Next Effect
 * @default %1, %2
 *
 * @param StateFmt:str
 * @text Passive State Format
 * @parent Vocabulary
 * @desc How are passive state effects displayed?
 * %1 - State Name, %2 - Icon
 * @default %2%1
 *
 * @param RateFmt:str
 * @text Param Rate Format
 * @parent Vocabulary
 * @desc How are Parameter Rate effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1:%2
 *
 * @param AddPosFmt:str
 * @text Add(+) Format
 * @parent Vocabulary
 * @desc How are positive Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1+%2
 *
 * @param AddNegFmt:str
 * @text Add(-) Format
 * @parent Vocabulary
 * @desc How are negative Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1-%2
 *
 */
//=============================================================================

const _0x4c7f15=_0x4f58;function _0x2615(){const _0x3c461b=['iconIndex','releaseUnequippableItems','cxGgh','createEquipSetBonusTooltipWindow','SetBattlerName','hUKzO','round','battlerName','PDR','_priorityBattlerName','EQUIP_SET_S_PARAM_PLUS_FLAT','onBuyOk','getEquipSetPieces','Game_BattlerBase_addPassiveStatesFromOtherPlugins','HChNX','rBnWL','AGI','Game_BattlerBase_xparamRate','LNXHV','Scene_Shop_onBuyOk','CItVJ','version','SetMenuPortrait','equipSetPieceFmt','equipSetTitleFmt','hChJt','update','_requestRefresh','visible','actorEquipSetCharacterName','VisuMZ_1_SkillsStatesCore','checkRefreshEquipSetBonuses','Game_BattlerBase_paramPlus','ParseActorNotetags','refreshEquipSetTooltip','ipWaF','createAutoPieceText','FqeZm','getMenuImage','SetBattlePortrait','registerActorEquipSetImages','Game_Actor_faceIndex','lkWDK','equipSetBonusParamRate','RegExp','length','Scale','pushLineOpacity','ParseAllNotetags','uXpRR','Ncgst','Scene_Base_createWindowLayer','SetBattlerNameRange','show','UrKOX','SetFaceName','height','paramName','actorId','_priorityCharacterIndex','xparamFlatBonus','eyUnI','_priorityFaceIndex','isSceneBattle','xparamRate','SetTitleFmt','Game_Actor_changeEquip','ARRAYSTR','note','WindowSkin','shift','Game_BattlerBase_paramFlatBonus','Icon','SParamAdd','description','VisuMZ_0_CoreEngine','Game_BattlerBase_xparamFlatBonus','EVAL','aICJJ','UOqLk','resizeWindow','Text','index','clone','XParam','hasEquipSetBonusTooltipWindow','trim','actor','JNIVd','130020JrxJxw','hideEquipSetBonusTooltipWindow','_lineOpacity','PassiveStates','getActorEquipSetBattlePortrait','setActiveWindow','status','VisuMZ_1_ItemsEquipsCore','getActorEquipSetMenuPortrait','createAutoParamText','auto','LUK','setBattlerImage','ARRAYSTRUCT','equips','addPassiveStatesFromEquipSetBonuses','ConvertParams','UNTITLED','MAXMP','prototype','Mechanics','map','requestRefresh','Game_BattlerBase_sparamFlatBonus','SetCharaNamePlus','ShowText','ctsvj','addSetDataText','Scene_Shop_onSellOk','TGR','characterIndex','_item','padding','initialize','SetName','getEquipSetData','MEV','call','Tooltip','createWindowLayer','Game_BattlerBase_xparamPlus','StateFmt','Scene_Boot_onDatabaseLoaded','IemSB','Game_BattlerBase_sparamPlus','equipSetPlusPos','SneVt','faceIndex','SetCharaName','2286252TqpzIg','createContents','registerEquipSetBonusTooltipWindow','actorEquipSetFaceName','ifZHE','EquipSetBonuses','Window_BattleItem','Window_Selectable_callUpdateHelp','itemRect','UIHdV','clamp','onSellOk','clampPosition','toLowerCase','ykGum','setMenuImage','Window_Selectable_initialize','RateFmt','_priorityBattlePortrait','EQUIP_SET_BASE_PARAM_PLUS_FLAT','name','max','equipSetPieceSeparator','_weaponEquipSets','gmiUq','XParamAdd','ARRAYNUM','item','sparamFlatBonus','_equipSetBonusCount','AddPosFmt','RzXAF','getEquipSetsSortedByMostPieces','actorEquipSetFaceIndex','NUM','OffsetY','Scene_Shop_onNumberCancel','Window_ShopBuy','aFkts','drawing','AddNegFmt','_equipSetBonusSets','Game_Actor_setFaceImage','JksZz','onNumberOk','hide','Game_BattlerBase_sparamRate','47686ljYlXY','Broep','hHXpT','actorEquipSetCharacterIndex','MAXHP','_statusWindow','addChild','onDatabaseLoaded','TlbcQ','vpCot','setBattlePortrait','mHFFm','mdEes','exit','_activeWindow','kUdmH','Show','avCqP','equipSetState','sparamPlus','WINDOW_SCALE','924894hLqcSX','dqaQX','showEquipSetBonusTooltipWindow','getActorEquipSetFaceIndex','resetFontSettings','Actor-%1-SetName-%2-Pieces-%3','contents','EVA','Game_Actor_getMenuImage','Rate%1','toUpperCase','getActorEquipSetCharacterName','push','equipSetPlusNeg','updateBackOpacity','Scene_Shop_onNumberOk','15pjkPVx','callUpdateHelp','_scene','vJPdp','14QwfLzR','changeEquip','\x5cI[%1]','format','abs','getActorEquipSetFaceName','TbVfx','TCR','Game_Actor_setup','Game_Actor_faceName','SetFaceNamePlus','ldVHg','CNT','TRG','EQUIP_SET_X_PARAM_PLUS_FLAT','MDR','MRF','passiveStates','actorEquipSetMenuPortrait','WINDOW_SKIN_OPACITY','setItem','oIywj','_equipSets','MAT','scale','_armorEquipSets','SeparatorFmt','MOUSE_OFFSET_Y','active','actorEquipSetBattlerName','Game_Actor_getBattlePortraitFilename','HxbQg','Set','ARRAYJSON','mBNmn','updateEquipSetBonusTooltip','Game_Actor_releaseUnequippableItems','_equipSetBonusTooltipWindow','Game_Actor_characterIndex','parse','return\x200','setFaceImage','SetMenuPortraitPlus','getActiveWindow','OYIzE','Scene_Equip','kLnBB','sparamRate','Game_Actor_characterName','Game_Actor_battlerName','clearEquipSetBonusCache','onNumberCancel','pqtIa','equipSetRate','VmpXe','_cache','Param','flat','characterName','RZJda','refreshActorPortrait','EQUIP_SET_BONUS_WINDOWS','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','actorEquipSetBattlePortrait','JfObu','MOUSE_OFFSET_X','equipSetBonusParamPlus','HIT','_priorityCharacterName','SetBattlerNamePlus','plus','KWMBa','3274624UefqUw','_priorityMenuImage','xFpSm','435164nxytSe','_priorityFaceName','updatePosition','Piece%1','SParam','Window_EquipSlot','FDR','3743568YzITnJ','HRG','_tempActor','getActorEquipSetBattlerName','ARRAYEVAL','SetBattlePortraitRange','WINDOW_SKIN_FILENAME','51QRmWbs','REC','Settings','PSihI','adLgk','constructor','syDyB','uEHDO','parameters','nfanA','Game_Actor_setMenuImage','drawTextEx','processNewLine','itnVQ','changePaintOpacity','Game_Actor_setCharacterImage','Game_Actor_setBattlerImage','floor','loadSystem','ParseEquipSets','getEquipSets','MCR','STR','jliAU','MRG','setCharacterImage','2620lAcmYb','paramPlus','refreshEquipSetBonuses','SHOW_TOOLTIP','Window_EquipItem','_windowLayer','addPieceDataText','CZRzR','STRUCT','Plus%1','ZCmfB','MDF','SetFaceNameRange','filter','NLTzo','EwVks','includes','CEV','match','applyEquipSetBonuses','paramRate','_text','refresh','SetCharaNameRange','width','EXR'];_0x2615=function(){return _0x3c461b;};return _0x2615();}function _0x4f58(_0x45225a,_0x4f85d5){const _0x261553=_0x2615();return _0x4f58=function(_0x4f581c,_0x1c9b1e){_0x4f581c=_0x4f581c-0x104;let _0x6ce45a=_0x261553[_0x4f581c];return _0x6ce45a;},_0x4f58(_0x45225a,_0x4f85d5);}(function(_0x47265b,_0x53d80c){const _0x2ea185=_0x4f58,_0xf6dcf7=_0x47265b();while(!![]){try{const _0x4e323a=-parseInt(_0x2ea185(0x1ab))/0x1+parseInt(_0x2ea185(0x196))/0x2*(-parseInt(_0x2ea185(0x218))/0x3)+parseInt(_0x2ea185(0x20a))/0x4*(parseInt(_0x2ea185(0x1bb))/0x5)+parseInt(_0x2ea185(0x167))/0x6*(-parseInt(_0x2ea185(0x1bf))/0x7)+-parseInt(_0x2ea185(0x207))/0x8+-parseInt(_0x2ea185(0x211))/0x9+parseInt(_0x2ea185(0x232))/0xa*(parseInt(_0x2ea185(0x136))/0xb);if(_0x4e323a===_0x53d80c)break;else _0xf6dcf7['push'](_0xf6dcf7['shift']());}catch(_0x5be10a){_0xf6dcf7['push'](_0xf6dcf7['shift']());}}}(_0x2615,0x7b718));var label=_0x4c7f15(0x16c),tier=tier||0x0,dependencies=[_0x4c7f15(0x128),_0x4c7f15(0x13d),_0x4c7f15(0x26a)],pluginData=$plugins[_0x4c7f15(0x23f)](function(_0x1afdc8){const _0x154b24=_0x4c7f15;return _0x1afdc8['status']&&_0x1afdc8[_0x154b24(0x127)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4c7f15(0x21a)]||{},VisuMZ[_0x4c7f15(0x146)]=function(_0x1b5b15,_0x50d4ba){const _0x4b81b7=_0x4c7f15;for(const _0xecb70 in _0x50d4ba){if(_0xecb70[_0x4b81b7(0x244)](/(.*):(.*)/i)){const _0xb169c8=String(RegExp['$1']),_0x18a1d4=String(RegExp['$2'])[_0x4b81b7(0x1b5)]()['trim']();let _0x224792,_0x5068e4,_0x4de2df;switch(_0x18a1d4){case _0x4b81b7(0x189):_0x224792=_0x50d4ba[_0xecb70]!==''?Number(_0x50d4ba[_0xecb70]):0x0;break;case _0x4b81b7(0x181):_0x5068e4=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):[],_0x224792=_0x5068e4[_0x4b81b7(0x14b)](_0x49406c=>Number(_0x49406c));break;case _0x4b81b7(0x12a):_0x224792=_0x50d4ba[_0xecb70]!==''?eval(_0x50d4ba[_0xecb70]):null;break;case _0x4b81b7(0x215):_0x5068e4=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):[],_0x224792=_0x5068e4['map'](_0x5b8d0=>eval(_0x5b8d0));break;case'JSON':_0x224792=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):'';break;case _0x4b81b7(0x1e0):_0x5068e4=_0x50d4ba[_0xecb70]!==''?JSON['parse'](_0x50d4ba[_0xecb70]):[],_0x224792=_0x5068e4[_0x4b81b7(0x14b)](_0x2fb9ee=>JSON['parse'](_0x2fb9ee));break;case'FUNC':_0x224792=_0x50d4ba[_0xecb70]!==''?new Function(JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70])):new Function(_0x4b81b7(0x1e7));break;case'ARRAYFUNC':_0x5068e4=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):[],_0x224792=_0x5068e4[_0x4b81b7(0x14b)](_0x1932a2=>new Function(JSON['parse'](_0x1932a2)));break;case _0x4b81b7(0x22e):_0x224792=_0x50d4ba[_0xecb70]!==''?String(_0x50d4ba[_0xecb70]):'';break;case _0x4b81b7(0x120):_0x5068e4=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):[],_0x224792=_0x5068e4[_0x4b81b7(0x14b)](_0x37750d=>String(_0x37750d));break;case _0x4b81b7(0x23a):_0x4de2df=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):{},_0x224792=VisuMZ[_0x4b81b7(0x146)]({},_0x4de2df);break;case _0x4b81b7(0x143):_0x5068e4=_0x50d4ba[_0xecb70]!==''?JSON[_0x4b81b7(0x1e6)](_0x50d4ba[_0xecb70]):[],_0x224792=_0x5068e4[_0x4b81b7(0x14b)](_0xc01f51=>VisuMZ['ConvertParams']({},JSON[_0x4b81b7(0x1e6)](_0xc01f51)));break;default:continue;}_0x1b5b15[_0xb169c8]=_0x224792;}}return _0x1b5b15;},(_0x177503=>{const _0x8a817f=_0x4c7f15,_0x7b066f=_0x177503['name'];for(const _0x4615fc of dependencies){if(!Imported[_0x4615fc]){alert(_0x8a817f(0x1fd)[_0x8a817f(0x1c2)](_0x7b066f,_0x4615fc)),SceneManager[_0x8a817f(0x1a3)]();break;}}const _0x54f09b=_0x177503[_0x8a817f(0x127)];if(_0x54f09b[_0x8a817f(0x244)](/\[Version[ ](.*?)\]/i)){if(_0x8a817f(0x25e)===_0x8a817f(0x25e)){const _0x43fdc6=Number(RegExp['$1']);if(_0x43fdc6!==VisuMZ[label][_0x8a817f(0x261)]){if(_0x8a817f(0x10f)!==_0x8a817f(0x10f)){let _0x1e2210=_0x50070d[_0x8a817f(0x16c)][_0x8a817f(0x129)]['call'](this,_0x633429);return _0x9387bf['EQUIP_SET_X_PARAM_PLUS_FLAT']===_0x8a817f(0x1f8)&&(_0x1e2210+=this[_0x8a817f(0x201)](_0x8a817f(0x131),_0x4ac0de)),_0x1e2210;}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x8a817f(0x1c2)](_0x7b066f,_0x43fdc6)),SceneManager['exit']();}}else{let _0x232abf=_0x332fee['EquipSetBonuses'][_0x8a817f(0x195)][_0x8a817f(0x15b)](this,_0x22f7b0);return _0x232abf*this[_0x8a817f(0x108)](_0x8a817f(0x20e),_0xc9349a);}}if(_0x54f09b[_0x8a817f(0x244)](/\[Tier[ ](\d+)\]/i)){if('jjzkC'===_0x8a817f(0x18d)){if(!_0x44d2bb||!_0x2c8bcb||!_0x236b45)return'';const _0x4aaf17='Actor-%1-SetName-%2-Pieces-%3'[_0x8a817f(0x1c2)](_0x462123['actorId'](),_0x280bbd[_0x8a817f(0x1b5)]()[_0x8a817f(0x133)](),_0x189111);return _0xe2529b[_0x8a817f(0x1dc)][_0x4aaf17]||'';}else{const _0x1ed7c4=Number(RegExp['$1']);_0x1ed7c4<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x8a817f(0x1c2)](_0x7b066f,_0x1ed7c4,tier)),SceneManager[_0x8a817f(0x1a3)]()):tier=Math['max'](_0x1ed7c4,tier);}}VisuMZ[_0x8a817f(0x146)](VisuMZ[label]['Settings'],_0x177503[_0x8a817f(0x220)]);})(pluginData),VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x109)]={'Set':/<(?:EQUIP|EQUIPMENT) SET:[ ](.*)>/gi,'SetFaceName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetCharaName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetBattlerName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetMenuPortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi},VisuMZ[_0x4c7f15(0x16c)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x4c7f15(0x19d)],Scene_Boot[_0x4c7f15(0x149)][_0x4c7f15(0x19d)]=function(){const _0x3ce9f7=_0x4c7f15;VisuMZ[_0x3ce9f7(0x16c)][_0x3ce9f7(0x160)][_0x3ce9f7(0x15b)](this),this['process_VisuMZ_Template_Notetags']();},Scene_Boot[_0x4c7f15(0x149)]['process_VisuMZ_Template_Notetags']=function(){const _0x21eaa2=_0x4c7f15;if(VisuMZ[_0x21eaa2(0x10d)])return;for(const _0x38860e of $dataActors){if(!_0x38860e)continue;ImageManager[_0x21eaa2(0x105)](_0x38860e);}},VisuMZ[_0x4c7f15(0x16c)]['ParseActorNotetags']=VisuMZ[_0x4c7f15(0x26d)],VisuMZ[_0x4c7f15(0x26d)]=function(_0x227566){const _0x3ac268=_0x4c7f15;VisuMZ['EquipSetBonuses'][_0x3ac268(0x26d)]['call'](this,_0x227566),ImageManager[_0x3ac268(0x105)](_0x227566);},DataManager[_0x4c7f15(0x22c)]=function(_0x10b55e){const _0x1ab558=_0x4c7f15;if(this['isWeapon'](_0x10b55e)){if(_0x1ab558(0x206)!==_0x1ab558(0x206))this['_priorityBattlePortrait']=_0x4e1ed6;else return this['_weaponEquipSets']=this[_0x1ab558(0x17e)]||{},!this[_0x1ab558(0x17e)][_0x10b55e['id']]&&(this[_0x1ab558(0x17e)][_0x10b55e['id']]=VisuMZ['EquipSetBonuses'][_0x1ab558(0x22b)](_0x10b55e)),this['_weaponEquipSets'][_0x10b55e['id']];}else return this['isArmor'](_0x10b55e)?(this['_armorEquipSets']=this[_0x1ab558(0x1d8)]||{},!this[_0x1ab558(0x1d8)][_0x10b55e['id']]&&(this[_0x1ab558(0x1d8)][_0x10b55e['id']]=VisuMZ[_0x1ab558(0x16c)]['ParseEquipSets'](_0x10b55e)),this[_0x1ab558(0x1d8)][_0x10b55e['id']]):[];},VisuMZ[_0x4c7f15(0x16c)]['ParseEquipSets']=function(_0x33939d){const _0x383e55=_0x4c7f15,_0x4b1987=VisuMZ[_0x383e55(0x16c)][_0x383e55(0x109)],_0x236599=_0x33939d[_0x383e55(0x121)],_0x4caf05=[],_0x3beda2=_0x236599[_0x383e55(0x244)](_0x4b1987['Set']);if(_0x3beda2)for(const _0xb80e16 of _0x3beda2){_0xb80e16[_0x383e55(0x244)](_0x4b1987[_0x383e55(0x1df)]);const _0x200d2c=String(RegExp['$1'])['toUpperCase']()[_0x383e55(0x133)]();!!DataManager[_0x383e55(0x159)](_0x200d2c)&&(_0x383e55(0x271)==='FqeZm'?_0x4caf05[_0x383e55(0x1b7)](_0x200d2c):this[_0x383e55(0x157)](...arguments));}return _0x4caf05;},DataManager[_0x4c7f15(0x159)]=function(_0x2837cf){const _0x2fde29=_0x4c7f15;_0x2837cf=_0x2837cf[_0x2fde29(0x1b5)]()[_0x2fde29(0x133)]();if(this['_equipSets']===undefined){if(_0x2fde29(0x16b)!==_0x2fde29(0x16b)){if(this[_0x2fde29(0x155)]===_0x57dd01)return;this[_0x2fde29(0x155)]=_0x5025b0,this[_0x2fde29(0x155)]?this['requestRefresh']():this['hide']();}else{this[_0x2fde29(0x1d5)]={};const _0x82601a=VisuMZ[_0x2fde29(0x16c)][_0x2fde29(0x21a)]['EquipSets'];for(const _0x516328 of _0x82601a){if(_0x2fde29(0x19e)!==_0x2fde29(0x19e)){const _0x2a405d=this['getEquipSetPieces'](_0x103c6a),_0x432d20=_0x28d2e5[_0x2fde29(0x1b6)](this,_0x41734d,_0x2a405d);if(_0x432d20)return _0x432d20;}else{const _0x17c948=_0x516328[_0x2fde29(0x158)][_0x2fde29(0x1b5)]()[_0x2fde29(0x133)]();if(_0x17c948==='')continue;if(_0x17c948===_0x2fde29(0x147))continue;this[_0x2fde29(0x1d5)][_0x17c948]=_0x516328;}}}}return this[_0x2fde29(0x1d5)][_0x2837cf]||null;},ImageManager[_0x4c7f15(0x16a)]={},ImageManager[_0x4c7f15(0x188)]={},ImageManager[_0x4c7f15(0x269)]={},ImageManager[_0x4c7f15(0x199)]={},ImageManager[_0x4c7f15(0x1dc)]={},ImageManager[_0x4c7f15(0x1d1)]={},ImageManager[_0x4c7f15(0x1fe)]={},ImageManager[_0x4c7f15(0x105)]=function(_0x16189a){const _0xf41573=_0x4c7f15;if(!_0x16189a)return;const _0x56602e=VisuMZ[_0xf41573(0x16c)][_0xf41573(0x109)],_0x3e7504=_0x16189a[_0xf41573(0x121)],_0x40c6a9=_0x16189a['id'],_0x2d1de8=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x114)]);if(_0x2d1de8){if(_0xf41573(0x12b)!=='uWsUJ')for(const _0x1d4577 of _0x2d1de8){if('FsGWk'!==_0xf41573(0x21e)){if(!_0x1d4577)continue;_0x1d4577[_0xf41573(0x244)](_0x56602e['SetFaceName']);const _0x5b2925=String(RegExp['$1'])[_0xf41573(0x1b5)]()['trim'](),_0x51a283=Number(RegExp['$2'])||0x1,_0x113df7=String(RegExp['$3'])[_0xf41573(0x133)](),_0x56fc0a=Number(RegExp['$4']);if(!DataManager[_0xf41573(0x159)](_0x5b2925))continue;const _0x506e38=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x5b2925,_0x51a283);ImageManager[_0xf41573(0x16a)][_0x506e38]=_0x113df7,ImageManager[_0xf41573(0x188)][_0x506e38]=_0x56fc0a;}else return _0xe26f3[_0xf41573(0x13c)]&&_0x36ca92[_0xf41573(0x127)][_0xf41573(0x242)]('['+_0x5800cd+']');}else{const _0x249c9a=this[_0xf41573(0x1e4)];if(_0x249c9a&&this[_0xf41573(0x182)]){_0x249c9a[_0xf41573(0x13b)](this);const _0x99d389=_0x249c9a[_0xf41573(0x1ea)]();_0x99d389===this&&_0x249c9a[_0xf41573(0x1d3)](this[_0xf41573(0x182)]());}}}const _0x3561f5=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x1c9)]);if(_0x3561f5){if(_0xf41573(0x170)!==_0xf41573(0x170)){const _0xcb279b='Actor-%1-SetName-%2-Pieces-%3'[_0xf41573(0x1c2)](_0x107496,_0x3a1646,_0x3df5ba);_0x1036e0['actorEquipSetCharacterName'][_0xcb279b]=_0x3329c7,_0x47e946[_0xf41573(0x199)][_0xcb279b]=_0x427133;}else for(const _0x539513 of _0x3561f5){if(!_0x539513)continue;_0x539513['match'](_0x56602e['SetFaceNamePlus']);const _0x3c640a=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x44c16e=Number(RegExp['$2'])||0x1,_0x2f15d4=0x14,_0x29ada0=String(RegExp['$3'])['trim'](),_0x2f7e78=Number(RegExp['$4']);if(!DataManager[_0xf41573(0x159)](_0x3c640a))continue;for(let _0xe01367=_0x44c16e;_0xe01367<=_0x2f15d4;_0xe01367++){const _0x3f9014=_0xf41573(0x1b0)['format'](_0x40c6a9,_0x3c640a,_0xe01367);ImageManager[_0xf41573(0x16a)][_0x3f9014]=_0x29ada0,ImageManager[_0xf41573(0x188)][_0x3f9014]=_0x2f7e78;}}}const _0x17013a=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x23e)]);if(_0x17013a)for(const _0x2e7ca3 of _0x17013a){if(!_0x2e7ca3)continue;_0x2e7ca3[_0xf41573(0x244)](_0x56602e[_0xf41573(0x23e)]);const _0x38b322=String(RegExp['$1'])[_0xf41573(0x1b5)]()[_0xf41573(0x133)](),_0x3e6193=Number(RegExp['$2'])||0x1,_0x3ce8be=Number(RegExp['$3'])||0x1,_0x53789c=String(RegExp['$4'])[_0xf41573(0x133)](),_0x46accb=Number(RegExp['$5']);if(!DataManager[_0xf41573(0x159)](_0x38b322))continue;for(let _0x3d879f=_0x3e6193;_0x3d879f<=_0x3ce8be;_0x3d879f++){const _0x1a9508='Actor-%1-SetName-%2-Pieces-%3'[_0xf41573(0x1c2)](_0x40c6a9,_0x38b322,_0x3d879f);ImageManager[_0xf41573(0x16a)][_0x1a9508]=_0x53789c,ImageManager[_0xf41573(0x188)][_0x1a9508]=_0x46accb;}}const _0x4e30bd=_0x3e7504['match'](_0x56602e[_0xf41573(0x166)]);if(_0x4e30bd)for(const _0x2b4c7b of _0x4e30bd){if(!_0x2b4c7b)continue;_0x2b4c7b[_0xf41573(0x244)](_0x56602e['SetCharaName']);const _0x75edb3=String(RegExp['$1'])[_0xf41573(0x1b5)]()[_0xf41573(0x133)](),_0x39996c=Number(RegExp['$2'])||0x1,_0xcc6e46=String(RegExp['$3'])[_0xf41573(0x133)](),_0x12fd18=Number(RegExp['$4']);if(!DataManager[_0xf41573(0x159)](_0x75edb3))continue;const _0x22d1ab='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x40c6a9,_0x75edb3,_0x39996c);ImageManager[_0xf41573(0x269)][_0x22d1ab]=_0xcc6e46,ImageManager['actorEquipSetCharacterIndex'][_0x22d1ab]=_0x12fd18;}const _0x13d55c=_0x3e7504[_0xf41573(0x244)](_0x56602e['SetCharaNamePlus']);if(_0x13d55c){if(_0xf41573(0x10e)!==_0xf41573(0x1ac))for(const _0x277a26 of _0x13d55c){if('jylcd'!==_0xf41573(0x186)){if(!_0x277a26)continue;_0x277a26[_0xf41573(0x244)](_0x56602e[_0xf41573(0x14e)]);const _0x305454=String(RegExp['$1'])[_0xf41573(0x1b5)]()[_0xf41573(0x133)](),_0x5c3779=Number(RegExp['$2'])||0x1,_0x4a7017=0x14,_0x143b40=String(RegExp['$3'])['trim'](),_0x3a7451=Number(RegExp['$4']);if(!DataManager[_0xf41573(0x159)](_0x305454))continue;for(let _0x268ef6=_0x5c3779;_0x268ef6<=_0x4a7017;_0x268ef6++){const _0x3bffad=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x305454,_0x268ef6);ImageManager[_0xf41573(0x269)][_0x3bffad]=_0x143b40,ImageManager[_0xf41573(0x199)][_0x3bffad]=_0x3a7451;}}else _0x20e2de=this[_0xf41573(0x270)](_0x159dc2);}else _0x1249a2=_0x1d3726[_0xf41573(0x17c)](_0x5dacae,_0x3e9496);}const _0x565a2f=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x249)]);if(_0x565a2f)for(const _0xb91315 of _0x565a2f){if(!_0xb91315)continue;_0xb91315['match'](_0x56602e['SetCharaNameRange']);const _0x1933b0=String(RegExp['$1'])[_0xf41573(0x1b5)]()['trim'](),_0x4cd392=Number(RegExp['$2'])||0x1,_0x83cfd=Number(RegExp['$3'])||0x1,_0x16e59a=String(RegExp['$4'])['trim'](),_0x4481b2=Number(RegExp['$5']);if(!DataManager['getEquipSetData'](_0x1933b0))continue;for(let _0x474f74=_0x4cd392;_0x474f74<=_0x83cfd;_0x474f74++){if(_0xf41573(0x1de)==='HxbQg'){const _0x2de5e4=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x1933b0,_0x474f74);ImageManager[_0xf41573(0x269)][_0x2de5e4]=_0x16e59a,ImageManager[_0xf41573(0x199)][_0x2de5e4]=_0x4481b2;}else this[_0xf41573(0x179)]=_0x2667a0;}}const _0x164fc0=_0x3e7504['match'](_0x56602e[_0xf41573(0x250)]);if(_0x164fc0)for(const _0xeece74 of _0x164fc0){if(!_0xeece74)continue;_0xeece74[_0xf41573(0x244)](_0x56602e['SetBattlerName']);const _0x446771=String(RegExp['$1'])[_0xf41573(0x1b5)]()[_0xf41573(0x133)](),_0x1e41ca=Number(RegExp['$2'])||0x1,_0x3c752d=String(RegExp['$3'])[_0xf41573(0x133)]();if(!DataManager['getEquipSetData'](_0x446771))continue;const _0x35cae3='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x40c6a9,_0x446771,_0x1e41ca);ImageManager[_0xf41573(0x1dc)][_0x35cae3]=_0x3c752d;}const _0x6057b3=_0x3e7504['match'](_0x56602e['SetBattlerNamePlus']);if(_0x6057b3){if(_0xf41573(0x23c)!=='ZCmfB'){this[_0xf41573(0x12d)]();const _0x3393e5=this['baseTextRect']();this['resetFontSettings'](),this[_0xf41573(0x226)](this[_0xf41573(0x138)][_0xf41573(0x123)]()),this[_0xf41573(0x223)](this[_0xf41573(0x247)],_0x3393e5['x'],_0x3393e5['y'],_0x3393e5[_0xf41573(0x24a)]),this[_0xf41573(0x112)]();}else for(const _0x41c86f of _0x6057b3){if(!_0x41c86f)continue;_0x41c86f['match'](_0x56602e[_0xf41573(0x204)]);const _0x58cfbd=String(RegExp['$1'])[_0xf41573(0x1b5)]()['trim'](),_0x246442=Number(RegExp['$2'])||0x1,_0x590c3a=0x14,_0x4a9331=String(RegExp['$3'])[_0xf41573(0x133)]();if(!DataManager[_0xf41573(0x159)](_0x58cfbd))continue;for(let _0x407a3a=_0x246442;_0x407a3a<=_0x590c3a;_0x407a3a++){const _0x3fb55d=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x58cfbd,_0x407a3a);ImageManager[_0xf41573(0x1dc)][_0x3fb55d]=_0x4a9331;}}}const _0x57c85c=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x111)]);if(_0x57c85c)for(const _0x5a8f48 of _0x57c85c){if(!_0x5a8f48)continue;_0x5a8f48['match'](_0x56602e['SetBattlerNameRange']);const _0x52b206=String(RegExp['$1'])['toUpperCase']()[_0xf41573(0x133)](),_0x33cf29=Number(RegExp['$2'])||0x1,_0x2bdb4e=Number(RegExp['$3'])||0x1,_0x461384=String(RegExp['$4'])[_0xf41573(0x133)]();if(!DataManager[_0xf41573(0x159)](_0x52b206))continue;for(let _0x48e888=_0x33cf29;_0x48e888<=_0x2bdb4e;_0x48e888++){if('rDEvz'!==_0xf41573(0x1be)){const _0x2d6cf5='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x40c6a9,_0x52b206,_0x48e888);ImageManager[_0xf41573(0x1dc)][_0x2d6cf5]=_0x461384;}else _0x3d17f9('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xf41573(0x1c2)](_0x30c5cc,_0x33d038,_0x1f252b)),_0x2a5529['exit']();}}const _0x497e84=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x262)]);if(_0x497e84)for(const _0x3d6e10 of _0x497e84){if(_0xf41573(0x1ff)==='QGJuu')for(const _0x33f5f9 of _0x3ed090[_0x220a88][_0xf41573(0x139)]){_0x5ee439[_0xf41573(0x1b7)](_0x33f5f9);}else{if(!_0x3d6e10)continue;_0x3d6e10[_0xf41573(0x244)](_0x56602e[_0xf41573(0x262)]);const _0x53e46c=String(RegExp['$1'])[_0xf41573(0x1b5)]()[_0xf41573(0x133)](),_0x4e561b=Number(RegExp['$2'])||0x1,_0x10ad7f=String(RegExp['$3'])[_0xf41573(0x133)]();if(!DataManager[_0xf41573(0x159)](_0x53e46c))continue;const _0x2d8089=_0xf41573(0x1b0)['format'](_0x40c6a9,_0x53e46c,_0x4e561b);ImageManager[_0xf41573(0x1d1)][_0x2d8089]=_0x10ad7f;}}const _0x30b5ff=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x1e9)]);if(_0x30b5ff)for(const _0x41e1d2 of _0x30b5ff){if(!_0x41e1d2)continue;_0x41e1d2['match'](_0x56602e[_0xf41573(0x1e9)]);const _0x1e4b06=String(RegExp['$1'])[_0xf41573(0x1b5)]()['trim'](),_0x257f0e=Number(RegExp['$2'])||0x1,_0x18cd92=0x14,_0x259fde=String(RegExp['$3'])[_0xf41573(0x133)]();if(!DataManager[_0xf41573(0x159)](_0x1e4b06))continue;for(let _0x3ab9f3=_0x257f0e;_0x3ab9f3<=_0x18cd92;_0x3ab9f3++){if(_0xf41573(0x113)!==_0xf41573(0x113)){_0x31028c[_0xf41573(0x13b)](this);const _0x1c8476=_0x2dd95c[_0xf41573(0x1ea)]();_0x1c8476===this&&_0x26b7b4['setItem'](this['item']());}else{const _0x6470fa=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x1e4b06,_0x3ab9f3);ImageManager['actorEquipSetMenuPortrait'][_0x6470fa]=_0x259fde;}}}const _0xc2a5a2=_0x3e7504[_0xf41573(0x244)](_0x56602e['SetMenuPortraitRange']);if(_0xc2a5a2){if(_0xf41573(0x21c)!==_0xf41573(0x1e1))for(const _0x32b3de of _0xc2a5a2){if(!_0x32b3de)continue;_0x32b3de[_0xf41573(0x244)](_0x56602e['SetMenuPortraitRange']);const _0x1fa786=String(RegExp['$1'])[_0xf41573(0x1b5)]()['trim'](),_0xdc191b=Number(RegExp['$2'])||0x1,_0x6b1f11=Number(RegExp['$3'])||0x1,_0x190255=String(RegExp['$4'])['trim']();if(!DataManager['getEquipSetData'](_0x1fa786))continue;for(let _0x15d310=_0xdc191b;_0x15d310<=_0x6b1f11;_0x15d310++){const _0x2a3ccd=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x1fa786,_0x15d310);ImageManager[_0xf41573(0x1d1)][_0x2a3ccd]=_0x190255;}}else this[_0xf41573(0x1e4)][_0xf41573(0x194)]();}const _0x598250=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x104)]);if(_0x598250){if(_0xf41573(0x1fa)!==_0xf41573(0x1fa))this[_0xf41573(0x203)]=_0x237132,this[_0xf41573(0x118)]=_0x570ef6;else for(const _0x3cf09c of _0x598250){if(_0xf41573(0x135)===_0xf41573(0x192)){const _0x46c769=_0x2c2f87[_0xf41573(0x116)](_0x2b5399[_0x46f5f5]),_0x35c046=_0x10fedd(_0x2a7b47[_0x45a6d6][_0xf41573(0x1b4)['format'](_0x2d705c)]||0x1),_0x298e47=_0x1a2f91(_0x95651[_0x24fc59][_0xf41573(0x23b)[_0xf41573(0x1c2)](_0x3f7ebd)]||0x0);if(_0x35c046!==0x1){const _0x290a91=_0x52a7c4[_0xf41573(0x1f4)],_0x13d883=_0x250af4['floor'](_0x35c046*0x64)+'%',_0x85530e=_0x290a91[_0xf41573(0x1c2)](_0x46c769,_0x13d883);_0x5c7de4[_0xf41573(0x1b7)](_0x85530e);}if(_0x298e47!==0x0){const _0x25737d=_0x298e47>0x0?_0xa70e55[_0xf41573(0x163)]:_0x11f7b6[_0xf41573(0x1b8)];let _0xec2c67=_0x4997aa[_0xf41573(0x1c3)](_0x298e47);_0x42ff20!==_0xf41573(0x1f7)&&(_0xec2c67=_0xe7d6d8[_0xf41573(0x229)](_0xec2c67*0x64)+'%');const _0x440732=_0x25737d[_0xf41573(0x1c2)](_0x46c769,_0xec2c67);_0x490a6e[_0xf41573(0x1b7)](_0x440732);}}else{if(!_0x3cf09c)continue;_0x3cf09c[_0xf41573(0x244)](_0x56602e[_0xf41573(0x104)]);const _0x543c5a=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x798e92=Number(RegExp['$2'])||0x1,_0x1f37a8=String(RegExp['$3'])[_0xf41573(0x133)]();if(!DataManager[_0xf41573(0x159)](_0x543c5a))continue;const _0x54c312=_0xf41573(0x1b0)[_0xf41573(0x1c2)](_0x40c6a9,_0x543c5a,_0x798e92);ImageManager[_0xf41573(0x1fe)][_0x54c312]=_0x1f37a8;}}}const _0x37bfd6=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x104)]);if(_0x37bfd6){if(_0xf41573(0x1d4)!=='oIywj')_0x1a3c5b[_0xf41573(0x16c)][_0xf41573(0x11f)][_0xf41573(0x15b)](this,_0x36f14b,_0x2bca4b),_0x53797e[_0xf41573(0x248)]();else for(const _0x3c7fc8 of _0x37bfd6){if(_0xf41573(0x26f)===_0xf41573(0x1ed)){const _0xac11ff=this[_0xf41573(0x24a)]*(_0x5be496[_0xf41573(0x1aa)]||0.01),_0x126e92=this[_0xf41573(0x115)]*(_0x3a207f[_0xf41573(0x1aa)]||0.01);this['x']=_0x391c31[_0xf41573(0x252)](this['x'][_0xf41573(0x171)](0x0,_0x1847fc['width']-_0xac11ff)),this['y']=_0x5e8c5a['round'](this['y'][_0xf41573(0x171)](0x0,_0x30ae47['height']-_0x126e92));}else{if(!_0x3c7fc8)continue;_0x3c7fc8[_0xf41573(0x244)](_0x56602e['SetBattlePortrait']);const _0x4fecf=String(RegExp['$1'])[_0xf41573(0x1b5)]()['trim'](),_0xfec87d=Number(RegExp['$2'])||0x1,_0x104009=0x14,_0x10119f=String(RegExp['$3'])['trim']();if(!DataManager[_0xf41573(0x159)](_0x4fecf))continue;for(let _0x1b2779=_0xfec87d;_0x1b2779<=_0x104009;_0x1b2779++){const _0x5c52e3=_0xf41573(0x1b0)['format'](_0x40c6a9,_0x4fecf,_0x1b2779);ImageManager[_0xf41573(0x1fe)][_0x5c52e3]=_0x10119f;}}}}const _0x55e24b=_0x3e7504[_0xf41573(0x244)](_0x56602e[_0xf41573(0x216)]);if(_0x55e24b)for(const _0x1bb69f of _0x55e24b){if(!_0x1bb69f)continue;_0x1bb69f[_0xf41573(0x244)](_0x56602e['SetBattlePortraitRange']);const _0x420e4f=String(RegExp['$1'])[_0xf41573(0x1b5)]()[_0xf41573(0x133)](),_0x352982=Number(RegExp['$2'])||0x1,_0x111cff=Number(RegExp['$3'])||0x1,_0xb18796=String(RegExp['$4'])['trim']();if(!DataManager[_0xf41573(0x159)](_0x420e4f))continue;for(let _0x7b7201=_0x352982;_0x7b7201<=_0x111cff;_0x7b7201++){if('Broep'!==_0xf41573(0x197)){_0x4593e2!==''?this[_0xf41573(0x179)]=_0x59a5d6:this['_priorityBattlePortrait']=_0x29dce1;if(_0x3f80b8[_0xf41573(0x11c)]()&&_0x4104a['battleMembers']()[_0xf41573(0x242)](this)){const _0x1b78e4=_0x1522aa[_0xf41573(0x1bd)][_0xf41573(0x19b)];if(_0x1b78e4)_0x1b78e4[_0xf41573(0x1fb)](this);}}else{const _0x280eec=_0xf41573(0x1b0)['format'](_0x40c6a9,_0x420e4f,_0x7b7201);ImageManager[_0xf41573(0x1fe)][_0x280eec]=_0xb18796;}}}},ImageManager[_0x4c7f15(0x1c4)]=function(_0x344929,_0x4d5661,_0x12b749){const _0x140c79=_0x4c7f15;if(!_0x344929||!_0x4d5661||!_0x12b749)return'';const _0x5085ac=_0x140c79(0x1b0)[_0x140c79(0x1c2)](_0x344929[_0x140c79(0x117)](),_0x4d5661[_0x140c79(0x1b5)]()[_0x140c79(0x133)](),_0x12b749);return ImageManager[_0x140c79(0x16a)][_0x5085ac]||'';},ImageManager[_0x4c7f15(0x1ae)]=function(_0x2cf760,_0x5dfac9,_0x28f7a3){const _0x28c5c1=_0x4c7f15;if(!_0x2cf760||!_0x5dfac9||!_0x28f7a3)return undefined;const _0x1a7ac9='Actor-%1-SetName-%2-Pieces-%3'[_0x28c5c1(0x1c2)](_0x2cf760['actorId'](),_0x5dfac9[_0x28c5c1(0x1b5)]()['trim'](),_0x28f7a3);return ImageManager[_0x28c5c1(0x188)][_0x1a7ac9]||undefined;},ImageManager[_0x4c7f15(0x1b6)]=function(_0x385841,_0x3cfcb4,_0xd377e4){const _0x19ecfd=_0x4c7f15;if(!_0x385841||!_0x3cfcb4||!_0xd377e4)return'';const _0xf9c0ba=_0x19ecfd(0x1b0)[_0x19ecfd(0x1c2)](_0x385841[_0x19ecfd(0x117)](),_0x3cfcb4[_0x19ecfd(0x1b5)]()[_0x19ecfd(0x133)](),_0xd377e4);return ImageManager[_0x19ecfd(0x269)][_0xf9c0ba]||'';},ImageManager['getActorEquipSetCharacterIndex']=function(_0x548253,_0x177fd1,_0x2960f1){const _0x197149=_0x4c7f15;if(!_0x548253||!_0x177fd1||!_0x2960f1)return undefined;const _0x36367e=_0x197149(0x1b0)['format'](_0x548253[_0x197149(0x117)](),_0x177fd1['toUpperCase']()[_0x197149(0x133)](),_0x2960f1);return ImageManager[_0x197149(0x199)][_0x36367e]||undefined;},ImageManager[_0x4c7f15(0x214)]=function(_0x57cb2c,_0x402e9f,_0x5e6a9f){const _0xf8496=_0x4c7f15;if(!_0x57cb2c||!_0x402e9f||!_0x5e6a9f)return'';const _0x533cf6=_0xf8496(0x1b0)[_0xf8496(0x1c2)](_0x57cb2c['actorId'](),_0x402e9f[_0xf8496(0x1b5)]()['trim'](),_0x5e6a9f);return ImageManager[_0xf8496(0x1dc)][_0x533cf6]||'';},ImageManager[_0x4c7f15(0x13e)]=function(_0xd100a0,_0x279432,_0x3f325a){const _0x44c735=_0x4c7f15;if(!_0xd100a0||!_0x279432||!_0x3f325a)return'';const _0x2a8e0d=_0x44c735(0x1b0)['format'](_0xd100a0[_0x44c735(0x117)](),_0x279432[_0x44c735(0x1b5)]()['trim'](),_0x3f325a);return ImageManager[_0x44c735(0x1d1)][_0x2a8e0d]||'';},ImageManager[_0x4c7f15(0x13a)]=function(_0xa01c57,_0x480bd2,_0x408a55){const _0x202967=_0x4c7f15;if(!_0xa01c57||!_0x480bd2||!_0x408a55)return'';const _0x565bb2=_0x202967(0x1b0)[_0x202967(0x1c2)](_0xa01c57[_0x202967(0x117)](),_0x480bd2[_0x202967(0x1b5)]()[_0x202967(0x133)](),_0x408a55);return ImageManager[_0x202967(0x1fe)][_0x565bb2]||'';},TextManager[_0x4c7f15(0x264)]=VisuMZ[_0x4c7f15(0x16c)]['Settings']['Tooltip'][_0x4c7f15(0x11e)],TextManager[_0x4c7f15(0x263)]=VisuMZ['EquipSetBonuses'][_0x4c7f15(0x21a)]['Tooltip']['SetPieceFmt'],TextManager[_0x4c7f15(0x17d)]=VisuMZ['EquipSetBonuses'][_0x4c7f15(0x21a)][_0x4c7f15(0x15c)][_0x4c7f15(0x1d9)],TextManager[_0x4c7f15(0x1a8)]=VisuMZ['EquipSetBonuses'][_0x4c7f15(0x21a)][_0x4c7f15(0x15c)][_0x4c7f15(0x15f)],TextManager[_0x4c7f15(0x1f4)]=VisuMZ['EquipSetBonuses'][_0x4c7f15(0x21a)]['Tooltip'][_0x4c7f15(0x178)],TextManager[_0x4c7f15(0x163)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)]['Tooltip'][_0x4c7f15(0x185)],TextManager[_0x4c7f15(0x1b8)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)][_0x4c7f15(0x15c)][_0x4c7f15(0x18f)],SceneManager[_0x4c7f15(0x26e)]=function(){const _0x2a15e5=_0x4c7f15,_0x17bb6e=this[_0x2a15e5(0x1bd)];if(!_0x17bb6e)return;const _0x3a3399=_0x17bb6e[_0x2a15e5(0x1e4)];if(_0x3a3399)_0x3a3399[_0x2a15e5(0x14c)]();},Game_BattlerBase[_0x4c7f15(0x17a)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)]['Mechanics']['BaseParamAdd'],Game_BattlerBase[_0x4c7f15(0x1cd)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)][_0x4c7f15(0x14a)][_0x4c7f15(0x180)],Game_BattlerBase[_0x4c7f15(0x256)]=VisuMZ[_0x4c7f15(0x16c)]['Settings'][_0x4c7f15(0x14a)][_0x4c7f15(0x126)],Game_BattlerBase['prototype'][_0x4c7f15(0x201)]=function(_0x481b66,_0x4f686b){return 0x0;},Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x108)]=function(_0x4e6ed7,_0x57205f){return 0x1;},VisuMZ[_0x4c7f15(0x16c)]['Game_BattlerBase_paramPlus']=Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x233)],Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x233)]=function(_0x5e7033){const _0x10dece=_0x4c7f15;let _0x1264ce=VisuMZ[_0x10dece(0x16c)][_0x10dece(0x26c)][_0x10dece(0x15b)](this,_0x5e7033);return Game_BattlerBase[_0x10dece(0x17a)]==='plus'&&(_0x1264ce+=this[_0x10dece(0x201)](_0x10dece(0x1f7),_0x5e7033)),_0x1264ce;},VisuMZ['EquipSetBonuses']['Game_BattlerBase_paramRate']=Game_BattlerBase['prototype'][_0x4c7f15(0x246)],Game_BattlerBase['prototype'][_0x4c7f15(0x246)]=function(_0xe3ca74){const _0x575f4e=_0x4c7f15;let _0x28e35f=VisuMZ['EquipSetBonuses']['Game_BattlerBase_paramRate']['call'](this,_0xe3ca74);return _0x28e35f*this[_0x575f4e(0x108)](_0x575f4e(0x1f7),_0xe3ca74);},VisuMZ[_0x4c7f15(0x16c)]['Game_BattlerBase_paramFlatBonus']=Game_BattlerBase[_0x4c7f15(0x149)]['paramFlatBonus'],Game_BattlerBase['prototype']['paramFlatBonus']=function(_0x1df219){const _0x307c80=_0x4c7f15;let _0x2c3715=VisuMZ[_0x307c80(0x16c)][_0x307c80(0x124)][_0x307c80(0x15b)](this,_0x1df219);return Game_BattlerBase[_0x307c80(0x17a)]==='flat'&&(_0x2c3715+=this[_0x307c80(0x201)](_0x307c80(0x1f7),_0x1df219)),_0x2c3715;},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x15e)]=Game_BattlerBase[_0x4c7f15(0x149)]['xparamPlus'],Game_BattlerBase[_0x4c7f15(0x149)]['xparamPlus']=function(_0x52ca99){const _0x40e5db=_0x4c7f15;let _0x2634e3=VisuMZ[_0x40e5db(0x16c)]['Game_BattlerBase_xparamPlus']['call'](this,_0x52ca99);return Game_BattlerBase[_0x40e5db(0x1cd)]==='plus'&&(_0x40e5db(0x241)===_0x40e5db(0x161)?(_0x19ce12['EquipSetBonuses'][_0x40e5db(0x110)][_0x40e5db(0x15b)](this),this[_0x40e5db(0x24f)]()):_0x2634e3+=this['equipSetBonusParamPlus'](_0x40e5db(0x131),_0x52ca99)),_0x2634e3;},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x25d)]=Game_BattlerBase['prototype']['xparamRate'],Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x11d)]=function(_0x2307c4){const _0x193e56=_0x4c7f15;let _0xd2621a=VisuMZ[_0x193e56(0x16c)][_0x193e56(0x25d)][_0x193e56(0x15b)](this,_0x2307c4);return _0xd2621a*this[_0x193e56(0x108)](_0x193e56(0x131),_0x2307c4);},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x129)]=Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x119)],Game_BattlerBase['prototype'][_0x4c7f15(0x119)]=function(_0x39b27f){const _0x573fbf=_0x4c7f15;let _0x31b581=VisuMZ['EquipSetBonuses'][_0x573fbf(0x129)][_0x573fbf(0x15b)](this,_0x39b27f);if(Game_BattlerBase['EQUIP_SET_X_PARAM_PLUS_FLAT']===_0x573fbf(0x1f8)){if(_0x573fbf(0x260)===_0x573fbf(0x1f5)){const _0x579b1a=_0x573fbf(0x1b4)[_0x573fbf(0x1c2)](_0x549c2b);_0x39de88*=_0x4d0a46[_0x573fbf(0x1c3)](_0x3c3e28[_0x39fe8a][_0x4dd226][_0x579b1a]||0x1);}else _0x31b581+=this[_0x573fbf(0x201)]('XParam',_0x39b27f);}return _0x31b581;},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x162)]=Game_BattlerBase['prototype'][_0x4c7f15(0x1a9)],Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x1a9)]=function(_0x58a006){const _0x40857f=_0x4c7f15;let _0x53b1fa=VisuMZ['EquipSetBonuses'][_0x40857f(0x162)][_0x40857f(0x15b)](this,_0x58a006);return Game_BattlerBase[_0x40857f(0x256)]===_0x40857f(0x205)&&(_0x53b1fa+=this[_0x40857f(0x201)]('SParam',_0x58a006)),_0x53b1fa;},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x195)]=Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x1ee)],Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x1ee)]=function(_0x1a76cf){const _0x5c59e9=_0x4c7f15;let _0x3aaf6a=VisuMZ[_0x5c59e9(0x16c)][_0x5c59e9(0x195)]['call'](this,_0x1a76cf);return _0x3aaf6a*this['equipSetBonusParamRate']('SParam',_0x1a76cf);},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x14d)]=Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x183)],Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x2a84c1){const _0x4eb621=_0x4c7f15;let _0x319aa4=VisuMZ[_0x4eb621(0x16c)][_0x4eb621(0x14d)]['call'](this,_0x2a84c1);return Game_BattlerBase['EQUIP_SET_S_PARAM_PLUS_FLAT']===_0x4eb621(0x1f8)&&('hRDIl'==='XZvJx'?this[_0x4eb621(0x208)]=_0x12f80e:_0x319aa4+=this[_0x4eb621(0x201)]('SParam',_0x2a84c1)),_0x319aa4;},VisuMZ[_0x4c7f15(0x16c)]['Game_BattlerBase_addPassiveStatesFromOtherPlugins']=Game_BattlerBase[_0x4c7f15(0x149)]['addPassiveStatesFromOtherPlugins'],Game_BattlerBase['prototype']['addPassiveStatesFromOtherPlugins']=function(){const _0x5720e8=_0x4c7f15;VisuMZ[_0x5720e8(0x16c)][_0x5720e8(0x259)][_0x5720e8(0x15b)](this),this[_0x5720e8(0x145)]();},Game_BattlerBase[_0x4c7f15(0x149)][_0x4c7f15(0x145)]=function(){},VisuMZ[_0x4c7f15(0x16c)]['Game_Actor_setup']=Game_Actor['prototype']['setup'],Game_Actor['prototype']['setup']=function(_0xaacd77){const _0x75b4d8=_0x4c7f15;VisuMZ[_0x75b4d8(0x16c)][_0x75b4d8(0x1c7)][_0x75b4d8(0x15b)](this,_0xaacd77),this['refreshEquipSetBonuses']();},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x1e3)]=Game_Actor['prototype'][_0x4c7f15(0x24d)],Game_Actor[_0x4c7f15(0x149)]['releaseUnequippableItems']=function(_0x4b35e7){const _0x59c533=_0x4c7f15;VisuMZ['EquipSetBonuses'][_0x59c533(0x1e3)][_0x59c533(0x15b)](this,_0x4b35e7),this[_0x59c533(0x234)]();},Game_Actor['prototype'][_0x4c7f15(0x26b)]=function(_0x36db09){const _0x20ef09=_0x4c7f15;(this[_0x20ef09(0x190)]===undefined||this[_0x20ef09(0x184)]===undefined)&&this[_0x20ef09(0x234)]();},Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x234)]=function(){const _0x2bc7fd=_0x4c7f15;this[_0x2bc7fd(0x1f1)](),this['applyEquipSetBonuses']();if(this[_0x2bc7fd(0x213)])return;SceneManager['refreshEquipSetTooltip']();},Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x1f1)]=function(){const _0x5edaa6=_0x4c7f15;this[_0x5edaa6(0x190)]=[],this[_0x5edaa6(0x184)]={};},Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x245)]=function(){const _0x198822=_0x4c7f15;for(const _0x11bbf8 of this[_0x198822(0x144)]()){if(!_0x11bbf8)continue;const _0x54b31e=DataManager[_0x198822(0x22c)](_0x11bbf8);for(const _0x3f8f4f of _0x54b31e){!this[_0x198822(0x190)][_0x198822(0x242)](_0x3f8f4f)&&this[_0x198822(0x190)]['push'](_0x3f8f4f),this['_equipSetBonusCount'][_0x3f8f4f]=this[_0x198822(0x184)][_0x3f8f4f]||0x0,this[_0x198822(0x184)][_0x3f8f4f]++;}}},Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x22c)]=function(){const _0x3f3179=_0x4c7f15;return this['checkRefreshEquipSetBonuses'](),this[_0x3f3179(0x190)];},Game_Actor[_0x4c7f15(0x149)]['getEquipSetPieces']=function(_0x4ec5f4){const _0x26b0f2=_0x4c7f15;return this[_0x26b0f2(0x26b)](),_0x4ec5f4=_0x4ec5f4[_0x26b0f2(0x1b5)]()[_0x26b0f2(0x133)](),(this[_0x26b0f2(0x184)][_0x4ec5f4]||0x0)[_0x26b0f2(0x171)](0x0,0x14);},Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x187)]=function(){const _0x65e8c5=_0x4c7f15;let _0x34c07b=this[_0x65e8c5(0x22c)]()[_0x65e8c5(0x130)]();return _0x34c07b['sort']((_0x312f5c,_0x1aa720)=>{const _0x4715dc=_0x65e8c5,_0x33af3a=this[_0x4715dc(0x258)](_0x312f5c),_0x35d77d=this[_0x4715dc(0x258)](_0x1aa720);if(_0x33af3a!==_0x35d77d)return _0x35d77d-_0x33af3a;return 0x0;}),_0x34c07b;},Game_Actor[_0x4c7f15(0x149)]['equipSetBonusParamPlus']=function(_0x27641a,_0x1d6be2){const _0x63d95f=_0x4c7f15;this['checkRefreshEquipSetBonuses']();let _0x1ebff2=0x0;for(const _0x57b088 of this['getEquipSets']()){const _0x17919b=DataManager['getEquipSetData'](_0x57b088);if(!_0x17919b)continue;const _0x50cfcf=this[_0x63d95f(0x258)](_0x57b088);for(let _0x30ce24=0x1;_0x30ce24<=_0x50cfcf;_0x30ce24++){if('kidPd'==='kidPd'){const _0x41b831='Piece%1'[_0x63d95f(0x1c2)](_0x30ce24);if(_0x17919b[_0x41b831]&&_0x17919b[_0x41b831][_0x27641a]){const _0x3e5ded=_0x63d95f(0x23b)[_0x63d95f(0x1c2)](_0x1d6be2);_0x1ebff2+=_0x17919b[_0x41b831][_0x27641a][_0x3e5ded]||0x0;}}else this['y']=this[_0x63d95f(0x1a4)]['y']+_0x5e3c49['y']+(_0x1c4db2['y']+_0x460814)+_0x185b96[_0x63d95f(0x252)](_0x20ec1[_0x63d95f(0x115)]/0x2*_0x5cb6fd)-_0x21ab50-_0x441d8f[_0x63d95f(0x1da)]*_0x310fbe**0x4;}}return _0x1ebff2;},Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x108)]=function(_0x4e69e8,_0x3a9242){const _0xfe6b78=_0x4c7f15;this[_0xfe6b78(0x26b)]();let _0x394467=0x1;for(const _0x20c5ca of this[_0xfe6b78(0x22c)]()){const _0x1c022b=DataManager[_0xfe6b78(0x159)](_0x20c5ca);if(!_0x1c022b)continue;const _0x19c7e7=this[_0xfe6b78(0x258)](_0x20c5ca);for(let _0x56dd9e=0x1;_0x56dd9e<=_0x19c7e7;_0x56dd9e++){const _0x4496a8=_0xfe6b78(0x20d)[_0xfe6b78(0x1c2)](_0x56dd9e);if(_0x1c022b[_0x4496a8]&&_0x1c022b[_0x4496a8][_0x4e69e8]){const _0x5045ae=_0xfe6b78(0x1b4)['format'](_0x3a9242);_0x394467*=Math['abs'](_0x1c022b[_0x4496a8][_0x4e69e8][_0x5045ae]||0x1);}}}return _0x394467;},Game_Actor['prototype'][_0x4c7f15(0x145)]=function(){const _0x131044=_0x4c7f15;this[_0x131044(0x26b)]();const _0x109d66=this[_0x131044(0x1f6)][_0x131044(0x1d0)];for(const _0x553639 of this[_0x131044(0x22c)]()){const _0x5427a0=DataManager[_0x131044(0x159)](_0x553639);if(!_0x5427a0)continue;const _0x3fbe8f=this[_0x131044(0x258)](_0x553639);for(let _0x37f658=0x1;_0x37f658<=_0x3fbe8f;_0x37f658++){if(_0x131044(0x265)===_0x131044(0x1a7))return this[_0x131044(0x26b)](),_0x192a91=_0xab59df[_0x131044(0x1b5)]()[_0x131044(0x133)](),(this[_0x131044(0x184)][_0x5eb12b]||0x0)[_0x131044(0x171)](0x0,0x14);else{const _0x1c28d9='Piece%1'[_0x131044(0x1c2)](_0x37f658);if(_0x5427a0[_0x1c28d9]&&_0x5427a0[_0x1c28d9][_0x131044(0x139)])for(const _0x1a8f9f of _0x5427a0[_0x1c28d9]['PassiveStates']){if(_0x131044(0x22f)===_0x131044(0x251)){const _0x45ada4='Actor-%1-SetName-%2-Pieces-%3'[_0x131044(0x1c2)](_0x156b58,_0x873d,_0x3f6935);_0x1fe8ec[_0x131044(0x1d1)][_0x45ada4]=_0x3d7545;}else _0x109d66[_0x131044(0x1b7)](_0x1a8f9f);}}}}},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x191)]=Game_Actor[_0x4c7f15(0x149)]['setFaceImage'],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x1e8)]=function(_0x28d126,_0x466c48){const _0x4d99ff=_0x4c7f15;_0x28d126!==''?(this[_0x4d99ff(0x20b)]=_0x28d126,this['_priorityFaceIndex']=_0x466c48):(this[_0x4d99ff(0x20b)]=undefined,this['_priorityFaceIndex']=undefined);},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x1c8)]=Game_Actor['prototype']['faceName'],Game_Actor[_0x4c7f15(0x149)]['faceName']=function(){const _0x3b32fa=_0x4c7f15;if(this[_0x3b32fa(0x20b)]!==undefined)return this[_0x3b32fa(0x20b)];const _0x49ca7a=this[_0x3b32fa(0x187)]();for(const _0x571c54 of _0x49ca7a){if(_0x3b32fa(0x1a1)===_0x3b32fa(0x11a)){const _0x4d6aa0='Actor-%1-SetName-%2-Pieces-%3'[_0x3b32fa(0x1c2)](_0x5e34a4,_0x28257c,_0x2e0bd6);_0x571f91[_0x3b32fa(0x1dc)][_0x4d6aa0]=_0x2ea881;}else{const _0x9c5fd1=this[_0x3b32fa(0x258)](_0x571c54),_0x2d890c=ImageManager[_0x3b32fa(0x1c4)](this,_0x571c54,_0x9c5fd1);if(_0x2d890c)return _0x2d890c;}}return VisuMZ['EquipSetBonuses']['Game_Actor_faceName']['call'](this);},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x106)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x165)],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x165)]=function(){const _0x3ac475=_0x4c7f15;if(this[_0x3ac475(0x11b)]!==undefined)return this['_priorityFaceIndex'];const _0x2fc67d=this[_0x3ac475(0x187)]();for(const _0x10d7c3 of _0x2fc67d){const _0x4dfdaf=this[_0x3ac475(0x258)](_0x10d7c3),_0x5d5c26=ImageManager[_0x3ac475(0x1ae)](this,_0x10d7c3,_0x4dfdaf);if(_0x5d5c26!==undefined)return _0x5d5c26;}return VisuMZ['EquipSetBonuses'][_0x3ac475(0x106)]['call'](this);},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x227)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x231)],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x231)]=function(_0x3cd845,_0x4970aa){const _0xb927e7=_0x4c7f15;if(_0x3cd845!==''){if(_0xb927e7(0x198)!=='rlHWz')this[_0xb927e7(0x203)]=_0x3cd845,this[_0xb927e7(0x118)]=_0x4970aa;else{this['clearEquipSetBonusCache'](),this[_0xb927e7(0x245)]();if(this[_0xb927e7(0x213)])return;_0x29ebb8[_0xb927e7(0x26e)]();}}else'lkWDK'!==_0xb927e7(0x107)?_0x412a4b+=_0x126fa9:(this[_0xb927e7(0x203)]=undefined,this['_priorityCharacterIndex']=undefined);},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x1ef)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x1f9)],Game_Actor[_0x4c7f15(0x149)]['characterName']=function(){const _0x3cc97b=_0x4c7f15;if(this[_0x3cc97b(0x203)]!==undefined)return this[_0x3cc97b(0x203)];const _0x3700d3=this[_0x3cc97b(0x187)]();for(const _0x2d89f0 of _0x3700d3){const _0x43e589=this['getEquipSetPieces'](_0x2d89f0),_0x15af69=ImageManager[_0x3cc97b(0x1b6)](this,_0x2d89f0,_0x43e589);if(_0x15af69)return _0x15af69;}return VisuMZ[_0x3cc97b(0x16c)]['Game_Actor_characterName'][_0x3cc97b(0x15b)](this);},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x1e5)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x154)],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x154)]=function(){const _0x1a2238=_0x4c7f15;if(this[_0x1a2238(0x118)]!==undefined)return this['_priorityCharacterIndex'];const _0x1bb46c=this[_0x1a2238(0x187)]();for(const _0x1ed4bf of _0x1bb46c){const _0x92944c=this[_0x1a2238(0x258)](_0x1ed4bf),_0x2938b3=ImageManager['getActorEquipSetCharacterIndex'](this,_0x1ed4bf,_0x92944c);if(_0x2938b3!==undefined)return _0x2938b3;}return VisuMZ['EquipSetBonuses']['Game_Actor_characterIndex'][_0x1a2238(0x15b)](this);},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x228)]=Game_Actor['prototype'][_0x4c7f15(0x142)],Game_Actor[_0x4c7f15(0x149)]['setBattlerImage']=function(_0x500fee){const _0x1755d2=_0x4c7f15;_0x500fee!==''?'cxGgh'===_0x1755d2(0x24e)?this[_0x1755d2(0x255)]=_0x500fee:_0x48e7b5!==''?(this['_priorityFaceName']=_0x11389a,this[_0x1755d2(0x11b)]=_0x576974):(this[_0x1755d2(0x20b)]=_0x5c3217,this[_0x1755d2(0x11b)]=_0x4b9d6e):this[_0x1755d2(0x255)]=undefined;},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x1f0)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x253)],Game_Actor['prototype']['battlerName']=function(){const _0x4f26f6=_0x4c7f15;if(this[_0x4f26f6(0x255)]!==undefined)return this[_0x4f26f6(0x255)];const _0x4bb412=this['getEquipSetsSortedByMostPieces']();for(const _0x18e6d6 of _0x4bb412){if(_0x4f26f6(0x239)===_0x4f26f6(0x239)){const _0x1aa4c6=this['getEquipSetPieces'](_0x18e6d6),_0x19499e=ImageManager[_0x4f26f6(0x214)](this,_0x18e6d6,_0x1aa4c6);if(_0x19499e)return _0x19499e;}else for(const _0x4df0e2 of _0xf2c48f){_0x4df0e2[_0x4f26f6(0x244)](_0x391bcf[_0x4f26f6(0x1df)]);const _0x238512=_0xf77302(_0x56ac1d['$1'])[_0x4f26f6(0x1b5)]()[_0x4f26f6(0x133)]();!!_0x335098[_0x4f26f6(0x159)](_0x238512)&&_0x2f8db7[_0x4f26f6(0x1b7)](_0x238512);}}return VisuMZ[_0x4f26f6(0x16c)][_0x4f26f6(0x1f0)][_0x4f26f6(0x15b)](this);;},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x222)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x176)],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x176)]=function(_0x4ef80b){const _0x32ae57=_0x4c7f15;_0x4ef80b!==''?_0x32ae57(0x1a5)===_0x32ae57(0x1a5)?this['_priorityMenuImage']=_0x4ef80b:this[_0x32ae57(0x17e)][_0x2287b3['id']]=_0x20c4d3[_0x32ae57(0x16c)][_0x32ae57(0x22b)](_0x43e505):this['_priorityMenuImage']=undefined;},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x1b3)]=Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x272)],Game_Actor['prototype'][_0x4c7f15(0x272)]=function(){const _0xa7300f=_0x4c7f15;if(this[_0xa7300f(0x208)]!==undefined)return this['_priorityMenuImage'];const _0x3ac8d7=this['getEquipSetsSortedByMostPieces']();for(const _0x325c74 of _0x3ac8d7){if(_0xa7300f(0x150)!==_0xa7300f(0x150)){const _0x48db0b=this['_scene'];if(!_0x48db0b)return;const _0x3f8d30=_0x48db0b[_0xa7300f(0x1e4)];if(_0x3f8d30)_0x3f8d30[_0xa7300f(0x14c)]();}else{const _0x227acb=this[_0xa7300f(0x258)](_0x325c74),_0x4d7a51=ImageManager['getActorEquipSetMenuPortrait'](this,_0x325c74,_0x227acb);if(_0x4d7a51)return _0x4d7a51;}}return VisuMZ[_0xa7300f(0x16c)][_0xa7300f(0x1b3)]['call'](this);;},VisuMZ[_0x4c7f15(0x16c)]['Game_Actor_setBattlePortrait']=Game_Actor[_0x4c7f15(0x149)]['setBattlePortrait'],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x1a0)]=function(_0xc78116){const _0x524908=_0x4c7f15;if(_0xc78116!=='')'qgOEH'!==_0x524908(0x17f)?this['_priorityBattlePortrait']=_0xc78116:(this[_0x524908(0x267)]=![],this[_0x524908(0x248)]());else{if(_0x524908(0x164)!=='SneVt')return[];else this[_0x524908(0x179)]=undefined;}if(SceneManager['isSceneBattle']()&&$gameParty['battleMembers']()[_0x524908(0x242)](this)){if(_0x524908(0x21f)!=='uEHDO'){if(this[_0x524908(0x20b)]!==_0x1d886d)return this[_0x524908(0x20b)];const _0x51030b=this['getEquipSetsSortedByMostPieces']();for(const _0x15d019 of _0x51030b){const _0x3d0a3c=this[_0x524908(0x258)](_0x15d019),_0x240862=_0x470d5a[_0x524908(0x1c4)](this,_0x15d019,_0x3d0a3c);if(_0x240862)return _0x240862;}return _0x3f5f7b[_0x524908(0x16c)]['Game_Actor_faceName'][_0x524908(0x15b)](this);}else{const _0xababb6=SceneManager[_0x524908(0x1bd)][_0x524908(0x19b)];if(_0xababb6)_0xababb6[_0x524908(0x1fb)](this);}}},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x1dd)]=Game_Actor[_0x4c7f15(0x149)]['getBattlePortraitFilename'],Game_Actor['prototype']['getBattlePortraitFilename']=function(){const _0x309f34=_0x4c7f15;if(this['_priorityBattlePortrait']!==undefined)return this[_0x309f34(0x179)];const _0x31e30a=this['getEquipSetsSortedByMostPieces']();for(const _0x253956 of _0x31e30a){const _0x523793=this['getEquipSetPieces'](_0x253956),_0x55527d=ImageManager[_0x309f34(0x13a)](this,_0x253956,_0x523793);if(_0x55527d)return _0x55527d;}return VisuMZ[_0x309f34(0x16c)][_0x309f34(0x1dd)][_0x309f34(0x15b)](this);;},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x11f)]=Game_Actor['prototype'][_0x4c7f15(0x1c0)],Game_Actor[_0x4c7f15(0x149)][_0x4c7f15(0x1c0)]=function(_0x2f68a0,_0x3a21cb){const _0xe2ca21=_0x4c7f15;VisuMZ['EquipSetBonuses'][_0xe2ca21(0x11f)][_0xe2ca21(0x15b)](this,_0x2f68a0,_0x3a21cb),$gamePlayer['refresh']();},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x110)]=Scene_Base[_0x4c7f15(0x149)][_0x4c7f15(0x15d)],Scene_Base[_0x4c7f15(0x149)][_0x4c7f15(0x15d)]=function(){const _0x4570c1=_0x4c7f15;VisuMZ[_0x4570c1(0x16c)][_0x4570c1(0x110)]['call'](this),this[_0x4570c1(0x24f)]();},Scene_Base['prototype']['createEquipSetBonusTooltipWindow']=function(){const _0x533e62=_0x4c7f15;if(!Window_EquipSetBonusTooltip['SHOW_TOOLTIP'])return;this[_0x533e62(0x1e4)]=new Window_EquipSetBonusTooltip(),this[_0x533e62(0x19c)](this['_equipSetBonusTooltipWindow']);},Scene_Base[_0x4c7f15(0x149)][_0x4c7f15(0x137)]=function(){const _0x55520c=_0x4c7f15;this['_equipSetBonusTooltipWindow']&&this[_0x55520c(0x1e4)][_0x55520c(0x194)]();},Scene_Base[_0x4c7f15(0x149)][_0x4c7f15(0x1ad)]=function(){const _0x2dbac8=_0x4c7f15;this[_0x2dbac8(0x1e4)]&&this[_0x2dbac8(0x1e4)]['refresh']();},VisuMZ[_0x4c7f15(0x16c)]['Scene_Shop_onBuyOk']=Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x257)],Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x257)]=function(){const _0x336cf1=_0x4c7f15;VisuMZ[_0x336cf1(0x16c)][_0x336cf1(0x25f)][_0x336cf1(0x15b)](this),this['hideEquipSetBonusTooltipWindow']();},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x152)]=Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x172)],Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x172)]=function(){const _0x2f944c=_0x4c7f15;VisuMZ[_0x2f944c(0x16c)][_0x2f944c(0x152)]['call'](this),this['hideEquipSetBonusTooltipWindow']();},VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x1ba)]=Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x193)],Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x193)]=function(){const _0x149c26=_0x4c7f15;VisuMZ[_0x149c26(0x16c)][_0x149c26(0x1ba)][_0x149c26(0x15b)](this),this[_0x149c26(0x1ad)]();},VisuMZ['EquipSetBonuses'][_0x4c7f15(0x18b)]=Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x1f2)],Scene_Shop[_0x4c7f15(0x149)][_0x4c7f15(0x1f2)]=function(){const _0x5c1261=_0x4c7f15;VisuMZ['EquipSetBonuses'][_0x5c1261(0x18b)][_0x5c1261(0x15b)](this),this[_0x5c1261(0x1ad)]();},Window_Selectable['EQUIP_SET_BONUS_WINDOWS']=[_0x4c7f15(0x16d),'Window_ItemList',_0x4c7f15(0x236),_0x4c7f15(0x20f),_0x4c7f15(0x18c),'Window_ShopSell'],VisuMZ['EquipSetBonuses'][_0x4c7f15(0x177)]=Window_Selectable[_0x4c7f15(0x149)][_0x4c7f15(0x157)],Window_Selectable[_0x4c7f15(0x149)][_0x4c7f15(0x157)]=function(_0x4068cd){const _0x38f35b=_0x4c7f15;VisuMZ['EquipSetBonuses'][_0x38f35b(0x177)][_0x38f35b(0x15b)](this,_0x4068cd),this['registerEquipSetBonusTooltipWindow']();},Window_Selectable['prototype'][_0x4c7f15(0x169)]=function(){const _0x2e1903=_0x4c7f15;if(!this[_0x2e1903(0x132)]())return;const _0x2fe8ab=SceneManager[_0x2e1903(0x1bd)];if(!_0x2fe8ab)return;this[_0x2e1903(0x1e4)]=_0x2fe8ab[_0x2e1903(0x1e4)]||null,this['callUpdateHelp']();},Window_Selectable[_0x4c7f15(0x149)][_0x4c7f15(0x132)]=function(){const _0x5908b0=_0x4c7f15;if(!Window_EquipSetBonusTooltip[_0x5908b0(0x235)])return![];return Window_Selectable[_0x5908b0(0x1fc)][_0x5908b0(0x242)](this['constructor'][_0x5908b0(0x17b)]);},VisuMZ[_0x4c7f15(0x16c)]['Window_Selectable_callUpdateHelp']=Window_Selectable[_0x4c7f15(0x149)][_0x4c7f15(0x1bc)],Window_Selectable['prototype'][_0x4c7f15(0x1bc)]=function(){const _0x52e37d=_0x4c7f15;VisuMZ[_0x52e37d(0x16c)][_0x52e37d(0x16e)][_0x52e37d(0x15b)](this),this[_0x52e37d(0x1e2)]();},Window_Selectable[_0x4c7f15(0x149)][_0x4c7f15(0x1e2)]=function(){const _0x331c89=_0x4c7f15,_0x44d48a=this['_equipSetBonusTooltipWindow'];if(_0x44d48a&&this[_0x331c89(0x182)]){_0x44d48a[_0x331c89(0x13b)](this);const _0x1ba653=_0x44d48a[_0x331c89(0x1ea)]();if(_0x1ba653===this){if(_0x331c89(0x240)!==_0x331c89(0x240)){let _0x256cdf=_0x5daf04[_0x331c89(0x16c)]['Game_BattlerBase_sparamFlatBonus']['call'](this,_0x2a7b55);return _0x4ae858[_0x331c89(0x256)]===_0x331c89(0x1f8)&&(_0x256cdf+=this[_0x331c89(0x201)](_0x331c89(0x20e),_0x589ffd)),_0x256cdf;}else _0x44d48a[_0x331c89(0x1d3)](this['item']());}}};function Window_EquipSetBonusTooltip(){const _0x2e01f0=_0x4c7f15;this[_0x2e01f0(0x157)](...arguments);}Window_EquipSetBonusTooltip[_0x4c7f15(0x149)]=Object['create'](Window_Base[_0x4c7f15(0x149)]),Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x21d)]=Window_EquipSetBonusTooltip,Window_EquipSetBonusTooltip['SHOW_TOOLTIP']=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)][_0x4c7f15(0x15c)][_0x4c7f15(0x1a6)],Window_EquipSetBonusTooltip[_0x4c7f15(0x1aa)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)]['Tooltip'][_0x4c7f15(0x10b)],Window_EquipSetBonusTooltip[_0x4c7f15(0x217)]=VisuMZ[_0x4c7f15(0x16c)]['Settings'][_0x4c7f15(0x15c)][_0x4c7f15(0x122)],Window_EquipSetBonusTooltip[_0x4c7f15(0x1d2)]=VisuMZ['EquipSetBonuses'][_0x4c7f15(0x21a)]['Tooltip']['WindowOpacity'],Window_EquipSetBonusTooltip[_0x4c7f15(0x200)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)][_0x4c7f15(0x15c)]['OffsetX'],Window_EquipSetBonusTooltip[_0x4c7f15(0x1da)]=VisuMZ[_0x4c7f15(0x16c)][_0x4c7f15(0x21a)][_0x4c7f15(0x15c)][_0x4c7f15(0x18a)],Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x157)]=function(){const _0x2a9209=_0x4c7f15,_0x35e694=new Rectangle(0x0,0x0,Graphics[_0x2a9209(0x24a)],Graphics[_0x2a9209(0x115)]);Window_Base['prototype'][_0x2a9209(0x157)][_0x2a9209(0x15b)](this,_0x35e694),this[_0x2a9209(0x1d7)]['x']=this[_0x2a9209(0x1d7)]['y']=Window_EquipSetBonusTooltip[_0x2a9209(0x1aa)],this[_0x2a9209(0x194)](),this[_0x2a9209(0x155)]=null,this[_0x2a9209(0x1a4)]=null;},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)]['loadWindowskin']=function(){const _0x4716cc=_0x4c7f15;this['windowskin']=ImageManager[_0x4716cc(0x22a)](Window_EquipSetBonusTooltip[_0x4716cc(0x217)]);},Window_EquipSetBonusTooltip['prototype'][_0x4c7f15(0x1b9)]=function(){const _0x5ece2b=_0x4c7f15;this['backOpacity']=Window_EquipSetBonusTooltip[_0x5ece2b(0x1d2)];},Window_EquipSetBonusTooltip['prototype']['setItem']=function(_0x1d46ed){const _0x148b98=_0x4c7f15;if(this[_0x148b98(0x155)]===_0x1d46ed)return;this[_0x148b98(0x155)]=_0x1d46ed;if(this[_0x148b98(0x155)])this[_0x148b98(0x14c)]();else{if(_0x148b98(0x221)!==_0x148b98(0x221)){if(!this[_0x148b98(0x268)])return;if(!this['_activeWindow'])return;if(!this[_0x148b98(0x1a4)][_0x148b98(0x1db)])return;const _0x446e65=_0x7ab857[_0x148b98(0x1bd)][_0x148b98(0x237)],_0x4e8c4b=this[_0x148b98(0x1a4)][_0x148b98(0x16f)](this[_0x148b98(0x1a4)][_0x148b98(0x12f)]()),_0xe9984b=this[_0x148b98(0x1a4)][_0x148b98(0x1d7)]['x']||0x1,_0x2f35e9=_0x52aa8c[_0x148b98(0x252)](this[_0x148b98(0x1a4)]['padding']*_0xe9984b),_0x5d2e3f=this[_0x148b98(0x115)]*(_0x176020['WINDOW_SCALE']||0.01);this['x']=this[_0x148b98(0x1a4)]['x']+_0x446e65['x']+_0x4e8c4b['x']+_0x2f35e9+_0x590f17[_0x148b98(0x200)],this['y']=this[_0x148b98(0x1a4)]['y']+_0x446e65['y']+_0x4e8c4b['y']*_0xe9984b+_0x105125[_0x148b98(0x252)](_0x4e8c4b['height']/0x2*_0xe9984b)+_0x2f35e9+_0xd211ca[_0x148b98(0x1da)]*_0xe9984b**0x4,this['y']+_0x5d2e3f>_0x1168b8['height']&&(this['y']=this[_0x148b98(0x1a4)]['y']+_0x446e65['y']+(_0x4e8c4b['y']+_0xe9984b)+_0x2e1757[_0x148b98(0x252)](_0x4e8c4b['height']/0x2*_0xe9984b)-_0x5d2e3f-_0x4c59ee[_0x148b98(0x1da)]*_0xe9984b**0x4),this['clampPosition']();}else this[_0x148b98(0x194)]();}},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x1ea)]=function(){const _0x77f289=_0x4c7f15;return this[_0x77f289(0x1a4)]||null;},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x13b)]=function(_0x2170fb){const _0x453e0f=_0x4c7f15;if(!_0x2170fb['active'])return;this[_0x453e0f(0x1a4)]=_0x2170fb,this[_0x453e0f(0x20c)]();},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x248)]=function(){const _0x2149a3=_0x4c7f15;this[_0x2149a3(0x1b1)]['clear'](),this['setupText']();if(this[_0x2149a3(0x247)][_0x2149a3(0x10a)]>0x0){this['resizeWindow']();const _0x1faf72=this['baseTextRect']();this[_0x2149a3(0x1af)](),this['changePaintOpacity'](this['_lineOpacity'][_0x2149a3(0x123)]()),this[_0x2149a3(0x223)](this[_0x2149a3(0x247)],_0x1faf72['x'],_0x1faf72['y'],_0x1faf72[_0x2149a3(0x24a)]),this[_0x2149a3(0x112)]();}else _0x2149a3(0x225)==='itnVQ'?this[_0x2149a3(0x194)]():(this[_0x2149a3(0x190)]===_0x5d2029||this['_equipSetBonusCount']===_0x2371f4)&&this[_0x2149a3(0x234)]();},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x224)]=function(_0x4d4311){const _0x2e3347=_0x4c7f15;Window_Base[_0x2e3347(0x149)][_0x2e3347(0x224)][_0x2e3347(0x15b)](this,_0x4d4311),_0x4d4311[_0x2e3347(0x18e)]&&this['changePaintOpacity'](this[_0x2e3347(0x138)][_0x2e3347(0x123)]());},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)]['convertMessageKeywords']=function(_0x165d4e){return _0x165d4e;},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)]['isSupportMessageKeywords']=function(){return![];},Window_EquipSetBonusTooltip['prototype']['setupText']=function(){const _0x417707=_0x4c7f15;this['_text']='',this[_0x417707(0x138)]=[];if(!this[_0x417707(0x155)])return;for(const _0x651cd5 of DataManager[_0x417707(0x22c)](this[_0x417707(0x155)])){const _0x4d8db9=DataManager[_0x417707(0x159)](_0x651cd5);if(!_0x4d8db9)continue;this['addSetDataText'](_0x4d8db9);}this[_0x417707(0x247)]=this[_0x417707(0x247)]['trim']();},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x151)]=function(_0x2c997d){const _0x237b59=_0x4c7f15;if(!_0x2c997d)return;const _0x43a27c=_0x2c997d[_0x237b59(0x158)],_0x77758e=_0x2c997d[_0x237b59(0x125)]?'\x5cI[%1]'[_0x237b59(0x1c2)](_0x2c997d[_0x237b59(0x125)]):'';this[_0x237b59(0x247)]+=TextManager[_0x237b59(0x264)][_0x237b59(0x1c2)](_0x43a27c,_0x77758e)+'\x0a',this[_0x237b59(0x138)][_0x237b59(0x1b7)](!![]);for(let _0x4c126a=0x1;_0x4c126a<=0x14;_0x4c126a++){const _0x5f5a51=_0x2c997d['Piece%1'['format'](_0x4c126a)];this['addPieceDataText'](_0x2c997d,_0x5f5a51,_0x4c126a);}},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x238)]=function(_0x558680,_0x3ecbf1,_0x379798){const _0x509402=_0x4c7f15;if(!_0x3ecbf1)return;if(_0x3ecbf1[_0x509402(0x12e)]===undefined)return;if(!_0x3ecbf1[_0x509402(0x14f)])return;let _0x5783d1='';if(_0x3ecbf1['Text'][_0x509402(0x174)]()['trim']()!==_0x509402(0x140))_0x5783d1=_0x3ecbf1[_0x509402(0x12e)];else{if(_0x509402(0x25b)===_0x509402(0x25b))_0x5783d1=this['createAutoPieceText'](_0x3ecbf1);else{const _0x448fe8=_0x509402(0x20d)[_0x509402(0x1c2)](_0x246741);if(_0x106675[_0x448fe8]&&_0x4dbf9b[_0x448fe8][_0x50f92c]){const _0x2493e0=_0x509402(0x23b)[_0x509402(0x1c2)](_0xf8c1a4);_0x221b62+=_0x313549[_0x448fe8][_0x1b98c0][_0x2493e0]||0x0;}}}_0x5783d1[_0x509402(0x133)]()!==''&&(this['_text']+=TextManager[_0x509402(0x263)][_0x509402(0x1c2)](_0x379798,_0x5783d1)+'\x0a',this[_0x509402(0x10c)](_0x558680,_0x379798));},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)]['createAutoPieceText']=function(_0x2d2d14){const _0x27d29e=_0x4c7f15;let _0x2a4067='';const _0x2ec0a1=[];if(_0x2d2d14[_0x27d29e(0x139)])for(const _0x3fdc94 of _0x2d2d14[_0x27d29e(0x139)]){if('CMcca'===_0x27d29e(0x175))return this['_activeWindow']||null;else{const _0x193961=$dataStates[_0x3fdc94];if(!_0x193961)continue;if(_0x193961[_0x27d29e(0x24c)]<=0x0)continue;if(_0x193961[_0x27d29e(0x17b)][_0x27d29e(0x133)]()==='')continue;if(_0x193961[_0x27d29e(0x17b)][_0x27d29e(0x244)](/-----/i))continue;const _0x30c0db=_0x27d29e(0x1c1)[_0x27d29e(0x1c2)](_0x193961[_0x27d29e(0x24c)]),_0x5d3c2d=TextManager[_0x27d29e(0x1a8)][_0x27d29e(0x1c2)](_0x193961[_0x27d29e(0x17b)],_0x30c0db);_0x2ec0a1[_0x27d29e(0x1b7)](_0x5d3c2d);}}if(_0x2d2d14[_0x27d29e(0x1f7)]){if(_0x27d29e(0x209)!==_0x27d29e(0x1eb)){const _0x465c18=[_0x27d29e(0x19a),_0x27d29e(0x148),'ATK','DEF',_0x27d29e(0x1d6),_0x27d29e(0x23d),_0x27d29e(0x25c),_0x27d29e(0x141)],_0x44bcf1=this[_0x27d29e(0x13f)](_0x2d2d14,'Param',_0x465c18);while(_0x44bcf1[_0x27d29e(0x10a)]>0x0)_0x2ec0a1[_0x27d29e(0x1b7)](_0x44bcf1[_0x27d29e(0x123)]());}else{if(this[_0x27d29e(0x203)]!==_0x32bf43)return this[_0x27d29e(0x203)];const _0x4f4419=this[_0x27d29e(0x187)]();for(const _0x5635ab of _0x4f4419){const _0x2d6275=this[_0x27d29e(0x258)](_0x5635ab),_0x3431fb=_0x3e7a42[_0x27d29e(0x1b6)](this,_0x5635ab,_0x2d6275);if(_0x3431fb)return _0x3431fb;}return _0x319e70[_0x27d29e(0x16c)][_0x27d29e(0x1ef)]['call'](this);}}if(_0x2d2d14[_0x27d29e(0x131)]){const _0x358336=[_0x27d29e(0x202),_0x27d29e(0x1b2),'CRI',_0x27d29e(0x243),_0x27d29e(0x15a),_0x27d29e(0x1cf),_0x27d29e(0x1cb),_0x27d29e(0x212),_0x27d29e(0x230),_0x27d29e(0x1cc)],_0x471796=this[_0x27d29e(0x13f)](_0x2d2d14,_0x27d29e(0x131),_0x358336);while(_0x471796[_0x27d29e(0x10a)]>0x0)_0x2ec0a1[_0x27d29e(0x1b7)](_0x471796['shift']());}if(_0x2d2d14['SParam']){if(_0x27d29e(0x12c)!=='UOqLk'){const _0x9a0b87=_0x27d29e(0x1b0)[_0x27d29e(0x1c2)](_0x5c3992,_0x154107,_0xe7aff3);_0xa759c[_0x27d29e(0x1fe)][_0x9a0b87]=_0xdc2ec7;}else{const _0xbefc10=[_0x27d29e(0x153),'GRD',_0x27d29e(0x219),'PHA',_0x27d29e(0x22d),_0x27d29e(0x1c6),_0x27d29e(0x254),_0x27d29e(0x1ce),_0x27d29e(0x210),_0x27d29e(0x24b)],_0xe9a2c8=this['createAutoParamText'](_0x2d2d14,_0x27d29e(0x20e),_0xbefc10);while(_0xe9a2c8['length']>0x0)_0x2ec0a1[_0x27d29e(0x1b7)](_0xe9a2c8['shift']());}}for(const _0x456304 of _0x2ec0a1){if(_0x456304[_0x27d29e(0x10a)]<=0x0)continue;if(_0x2a4067[_0x27d29e(0x10a)]<=0x0){if(_0x27d29e(0x1a2)!==_0x27d29e(0x19f))_0x2a4067+=_0x456304;else{const _0x2bae47=_0x22d41d['equipSetRate'],_0x28d03b=_0x13fb14[_0x27d29e(0x229)](_0x4f32ac*0x64)+'%',_0x1d6e2b=_0x2bae47[_0x27d29e(0x1c2)](_0x146793,_0x28d03b);_0x3d341f[_0x27d29e(0x1b7)](_0x1d6e2b);}}else'ldVHg'!==_0x27d29e(0x1ca)?(_0x294dfb[_0x27d29e(0x16c)][_0x27d29e(0x152)][_0x27d29e(0x15b)](this),this[_0x27d29e(0x137)]()):_0x2a4067=TextManager[_0x27d29e(0x17d)][_0x27d29e(0x1c2)](_0x2a4067,_0x456304);}return _0x2a4067[_0x27d29e(0x133)]();},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x13f)]=function(_0x5a7143,_0x5f18d9,_0x1b4093){const _0x3b6c45=_0x4c7f15,_0x4102dd=[],_0x4e1bd8=_0x1b4093['length'];for(let _0x380156=0x0;_0x380156<_0x4e1bd8;_0x380156++){const _0x5219a0=TextManager[_0x3b6c45(0x116)](_0x1b4093[_0x380156]),_0xec458b=Number(_0x5a7143[_0x5f18d9][_0x3b6c45(0x1b4)[_0x3b6c45(0x1c2)](_0x380156)]||0x1),_0x1e19a9=Number(_0x5a7143[_0x5f18d9][_0x3b6c45(0x23b)[_0x3b6c45(0x1c2)](_0x380156)]||0x0);if(_0xec458b!==0x1){if('SIDAR'==='SIDAR'){const _0x294a7d=TextManager[_0x3b6c45(0x1f4)],_0xa82f74=Math['floor'](_0xec458b*0x64)+'%',_0x1bc6e8=_0x294a7d['format'](_0x5219a0,_0xa82f74);_0x4102dd[_0x3b6c45(0x1b7)](_0x1bc6e8);}else{const _0x6edd76='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x4a3e9b,_0x2ff34f,_0x3a9c12);_0x5d4f62[_0x3b6c45(0x1d1)][_0x6edd76]=_0x1ee1a7;}}if(_0x1e19a9!==0x0){if(_0x3b6c45(0x1f3)!=='pqtIa'){const _0x3a5f12=_0x3b6c45(0x1b0)[_0x3b6c45(0x1c2)](_0x57740c,_0x114110,_0x3eb9c2);_0x1932fd[_0x3b6c45(0x269)][_0x3a5f12]=_0x27367f,_0x5c1080[_0x3b6c45(0x199)][_0x3a5f12]=_0x5ec08b;}else{const _0x3517e2=_0x1e19a9>0x0?TextManager[_0x3b6c45(0x163)]:TextManager[_0x3b6c45(0x1b8)];let _0x3a7225=Math['abs'](_0x1e19a9);_0x5f18d9!==_0x3b6c45(0x1f7)&&(_0x3a7225=Math[_0x3b6c45(0x229)](_0x3a7225*0x64)+'%');const _0x360ebb=_0x3517e2[_0x3b6c45(0x1c2)](_0x5219a0,_0x3a7225);_0x4102dd[_0x3b6c45(0x1b7)](_0x360ebb);}}}return _0x4102dd;},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x10c)]=function(_0x482dfe,_0x14c134){const _0x4633e2=_0x4c7f15,_0x3d95c8=SceneManager[_0x4633e2(0x1bd)];if([_0x4633e2(0x1ec)][_0x4633e2(0x242)](_0x3d95c8[_0x4633e2(0x21d)]['name'])){if('HChNX'===_0x4633e2(0x25a)){const _0x1f3424=_0x3d95c8[_0x4633e2(0x134)](),_0x3aa72a=_0x482dfe['SetName']['toUpperCase']()[_0x4633e2(0x133)](),_0x5667ef=_0x1f3424['getEquipSetPieces'](_0x3aa72a);this[_0x4633e2(0x138)][_0x4633e2(0x1b7)](_0x5667ef>=_0x14c134);}else{_0x1de9f4[_0x4633e2(0x244)](_0x33efac['Set']);const _0x9f66a9=_0x1afbc6(_0x133e62['$1'])[_0x4633e2(0x1b5)]()['trim']();!!_0x3ffbbf[_0x4633e2(0x159)](_0x9f66a9)&&_0x5b2a94['push'](_0x9f66a9);}}else this[_0x4633e2(0x138)]['push'](!![]);},Window_EquipSetBonusTooltip['prototype'][_0x4c7f15(0x12d)]=function(){const _0x366adc=_0x4c7f15,_0x39c6d8=this['textSizeEx'](this[_0x366adc(0x247)]);this[_0x366adc(0x24a)]=_0x39c6d8[_0x366adc(0x24a)]+(this['itemPadding']()+this[_0x366adc(0x156)])*0x2,this['height']=_0x39c6d8[_0x366adc(0x115)]+this[_0x366adc(0x156)]*0x2,this[_0x366adc(0x168)](),this[_0x366adc(0x1af)]();},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x266)]=function(){const _0x5254ab=_0x4c7f15;Window_Base[_0x5254ab(0x149)][_0x5254ab(0x266)][_0x5254ab(0x15b)](this);if(this[_0x5254ab(0x267)]){if(_0x5254ab(0x1c5)!==_0x5254ab(0x21b))this[_0x5254ab(0x267)]=![],this['refresh']();else{if(this['_priorityMenuImage']!==_0x1823fc)return this['_priorityMenuImage'];const _0xb778b4=this[_0x5254ab(0x187)]();for(const _0x166891 of _0xb778b4){const _0x5587e2=this['getEquipSetPieces'](_0x166891),_0x5b5768=_0x2da40b['getActorEquipSetMenuPortrait'](this,_0x166891,_0x5587e2);if(_0x5b5768)return _0x5b5768;}return _0x68f1c[_0x5254ab(0x16c)][_0x5254ab(0x1b3)][_0x5254ab(0x15b)](this);;}}this[_0x5254ab(0x20c)]();},Window_EquipSetBonusTooltip['prototype'][_0x4c7f15(0x14c)]=function(){const _0x2abe9c=_0x4c7f15;this[_0x2abe9c(0x267)]=!![];},Window_EquipSetBonusTooltip[_0x4c7f15(0x149)][_0x4c7f15(0x20c)]=function(){const _0x1cf372=_0x4c7f15;if(!this['visible'])return;if(!this['_activeWindow'])return;if(!this[_0x1cf372(0x1a4)][_0x1cf372(0x1db)])return;const _0x24804b=SceneManager[_0x1cf372(0x1bd)][_0x1cf372(0x237)],_0x436684=this[_0x1cf372(0x1a4)][_0x1cf372(0x16f)](this[_0x1cf372(0x1a4)]['index']()),_0x1bbab4=this['_activeWindow'][_0x1cf372(0x1d7)]['x']||0x1,_0x4a6913=Math[_0x1cf372(0x252)](this['_activeWindow'][_0x1cf372(0x156)]*_0x1bbab4),_0x219063=this[_0x1cf372(0x115)]*(Window_EquipSetBonusTooltip[_0x1cf372(0x1aa)]||0.01);this['x']=this['_activeWindow']['x']+_0x24804b['x']+_0x436684['x']+_0x4a6913+Window_EquipSetBonusTooltip[_0x1cf372(0x200)],this['y']=this[_0x1cf372(0x1a4)]['y']+_0x24804b['y']+_0x436684['y']*_0x1bbab4+Math[_0x1cf372(0x252)](_0x436684[_0x1cf372(0x115)]/0x2*_0x1bbab4)+_0x4a6913+Window_EquipSetBonusTooltip['MOUSE_OFFSET_Y']*_0x1bbab4**0x4,this['y']+_0x219063>Graphics['height']&&(this['y']=this[_0x1cf372(0x1a4)]['y']+_0x24804b['y']+(_0x436684['y']+_0x1bbab4)+Math[_0x1cf372(0x252)](_0x436684[_0x1cf372(0x115)]/0x2*_0x1bbab4)-_0x219063-Window_EquipSetBonusTooltip[_0x1cf372(0x1da)]*_0x1bbab4**0x4),this[_0x1cf372(0x173)]();},Window_EquipSetBonusTooltip['prototype'][_0x4c7f15(0x173)]=function(){const _0x106ae0=_0x4c7f15,_0x29987e=this[_0x106ae0(0x24a)]*(Window_EquipSetBonusTooltip['WINDOW_SCALE']||0.01),_0x4c1eb1=this['height']*(Window_EquipSetBonusTooltip[_0x106ae0(0x1aa)]||0.01);this['x']=Math[_0x106ae0(0x252)](this['x'][_0x106ae0(0x171)](0x0,Graphics[_0x106ae0(0x24a)]-_0x29987e)),this['y']=Math['round'](this['y'][_0x106ae0(0x171)](0x0,Graphics['height']-_0x4c1eb1));};