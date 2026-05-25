/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/unlimitedeventconditions/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Unlimited event conditions on each event page
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.1.1
 * ----------------------------------------------------------------------------
 * Description: This plugin allows unlimited event conditions on each page.
 * By default, you are limited to only two switches, one variable, and some
 * other conditions. This removes those limitations.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To use extra conditions, create a Comment event command and set the first
 * line in the comment to be:
 * CGMZ Event Conditions
 *
 * Afterwards, each line in that comment command will be one extra condition.
 * This plugin supports the following conditions:
 * 
 * Switch: [id] [ON|OFF]
 * - This will check if the provided switch with id is ON or OFF.
 * - Example: Switch: 1 OFF
 * 
 * Selfswitch: [mapId] [eventId] [A|B|C|D] [ON|OFF]
 * - This will check if the provided self switch with map and event id is
 *   ON or OFF.
 * - Example: Selfswitch: 10 8 A OFF
 * 
 * Variable: [id] [>|>=|=|<|<=] [amount]
 * - This will use the provided operation to compare a variable with the
 *   given amount
 * - Example: Variable: 5 >= 100
 * 
 * Item: [id] [>|>=|=|<|<=] [amount]
 * - This will check if the party has the provided amount of the item
 * - Example: Item: 2 > 9
 * 
 * Weapon: [id] [>|>=|=|<|<=|equipped] [amount]
 * - This will check if the party has the provided amount of a weapon
 *   in their inventory or equipped. If using Equipped parameter, the
 *   amount will be ignored.
 * - Example: Weapon: 5 > 1
 * - Example: Weapon: 5 equipped
 * 
 * Armor: [id] [>|>=|=|<|<=|equipped] [amount]
 * - This will check if the party has the provided amount of an armor
 *   in their inventory or equipped. If using Equipped parameter, the
 *   amount will be ignored.
 * - Example: Armor: 2 = 1
 * - Example: Armor: 2 equipped
 * 
 * Gold: [>|>=|=|<|<=] [amount]
 * - This will check if the party has >, <, or = the provided amount of gold.
 * - Example: Gold: >= 100
 * 
 * Actor: [id] [in|out]
 * - This will check if the given actor is in or out of the party.
 * - Example: Actor: 4 out
 *
 * You can also chain these comments together, just make sure that the first
 * line in each comment is "CGMZ Event Conditions" with one condition per
 * line.
 *
 * IMPORTANT:
 * This plugin reports errors! Press F8 in-game and open the console
 * to see if any events with additional conditions have incorrect formatting!
*/
var Imported = Imported || {};
Imported.CGMZ_UnlimitedEventConditions = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Unlimited Event Conditions"] = "Alpha";
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Check for additional conditions before allowing the page to activate
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Additional condition checks for event comments
//-----------------------------------------------------------------------------
const alias_CGMZ_EventConditions_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function(page) {
    if(!alias_CGMZ_EventConditions_meetsConditions.call(this, page)) {
		return false;
	}
	let hasExtraConditions = false;
	for(const command of page.list) {
		if(hasExtraConditions) {
			if(command.code !== 408) {
				if(command.code === 108 && command.parameters[0].trim() === "CGMZ Event Conditions") {
					continue;
				} else {
					break;
				}
			}
			if(!this.CGMZ_EventConditions_meetsExtraCondition(command.parameters[0].trim())) {
				return false;
			}
		} else {
			hasExtraConditions = (command.code === 108 && command.parameters[0].trim() === "CGMZ Event Conditions");
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Route extra condition to correct method for check and return result of condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_meetsExtraCondition = function(condition) {
	const params = condition.toLowerCase().split(" ")
    switch(params[0]) {
		case "switch:": return this.CGMZ_EventConditions_checkSwitch(params);
		case "selfswitch:": return this.CGMZ_EventConditions_checkSelfSwitch(params);
		case "variable:": return this.CGMZ_EventConditions_checkVariable(params);
		case "item:": return this.CGMZ_EventConditions_checkItem(params);
		case "weapon:": return this.CGMZ_EventConditions_checkWeapon(params);
		case "armor:": return this.CGMZ_EventConditions_checkArmor(params);
		case "gold:": return this.CGMZ_EventConditions_checkGold(params);
		case "actor:": return this.CGMZ_EventConditions_checkActor(params);
	}
	return this.CGMZ_EventConditions_checkOtherCondition(params);
};
//-----------------------------------------------------------------------------
// Check switch extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkSwitch = function(params) {
	// Expected Format: Switch: [id] [ON|OFF]
	if(params.length === 3 && !isNaN(params[1])) {
		const expectedResult = (params[2] === 'on');
		return $gameSwitches.value(Number(params[1])) === expectedResult;
	}
	const script = "CGMZ Event Conditions";
	const error = "Switch Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Switch: [id] [ON|OFF]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check self switch extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkSelfSwitch = function(params) {
	// Expected Format: Selfswitch: [mapId] [eventId] [A|B|C|D] [ON|OFF]
	if(params.length === 5) {
		const expectedResult = (params[4] === 'on');
		const key = [Number(params[1]), Number(params[2]), params[3].toUpperCase()]
		return $gameSelfSwitches.value(key) === expectedResult;
	}
	const script = "CGMZ Event Conditions";
	const error = "Self Switch Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Selfswitch: [mapId] [eventId] [A|B|C|D] [ON|OFF]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check variable extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkVariable = function(params) {
	// Expected Format: Variable: [id] [>|>=|=|<|<=] [amount]
	if(params.length === 4 && !isNaN(params[1]) && !isNaN(params[3])) {
		const value = $gameVariables.value(Number(params[1]));
		const amount = Number(params[3]);
		switch(params[2]) {
			case '=': return value === amount;
			case '>': return value > amount;
			case '>=': return value >= amount;
			case '<': return value < amount;
			case '<=': return value <= amount;
		}
	}
	const script = "CGMZ Event Conditions";
	const error = "Variable Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Variable: [id] [>|>=|=|<|<=] [amount]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check item extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkItem = function(params) {
	// Expected Format: Item: [id] [>|>=|=|<|<=] [amount]
	if(params.length === 4 && !isNaN(params[1]) && !isNaN(params[3])) {
		const item = $dataItems[Number(params[1])];
		const value = $gameParty.numItems(item);
		const amount = Number(params[3]);
		switch(params[2]) {
			case '=': return value === amount;
			case '>': return value > amount;
			case '>=': return value >= amount;
			case '<': return value < amount;
			case '<=': return value <= amount;
		}
	}
	const script = "CGMZ Event Conditions";
	const error = "Item Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Item: [id] [>|>=|=|<|<=] [amount]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check weapon extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkWeapon = function(params) {
	// Expected Format: Weapon: [id] [>|>=|=|<|<=|equipped] [amount]
	if(!isNaN(params[1])) {
		const weapon = $dataWeapons[Number(params[1])];
		const value = $gameParty.numItems(weapon);
		const amount = Number(params[3]);
		switch(params[2]) {
			case '=': return value === amount;
			case '>': return value > amount;
			case '>=': return value >= amount;
			case '<': return value < amount;
			case '<=': return value <= amount;
			case 'equipped': return $gameParty.isAnyMemberEquipped(weapon);
		}
	}
	const script = "CGMZ Event Conditions";
	const error = "Weapon Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Weapon: [id] [>|>=|=|<|<=|equipped] [amount]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check armor extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkArmor = function(params) {
	// Expected Format: Armor: [id] [>|>=|=|<|<=|equipped] [amount]
	if(params.length >= 3 && !isNaN(params[1])) {
		const armor = $dataArmors[Number(params[1])];
		const value = $gameParty.numItems(armor);
		const amount = Number(params[3]);
		switch(params[2]) {
			case '=': return value === amount;
			case '>': return value > amount;
			case '>=': return value >= amount;
			case '<': return value < amount;
			case '<=': return value <= amount;
			case 'equipped': return $gameParty.isAnyMemberEquipped(armor);
		}
	}
	const script = "CGMZ Event Conditions";
	const error = "Armor Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Armor: [id] [>|>=|=|<|<=|equipped] [amount]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check gold extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkGold = function(params) {
	// Expected Format: Gold: [>|>=|=|<|<=] [amount]
	const value = $gameParty.gold();
	const amount = Number(params[2]);
	switch(params[1]) {
		case '=': return value === amount;
		case '>': return value > amount;
		case '>=': return value >= amount;
		case '<': return value < amount;
		case '<=': return value <= amount;
	}
	const script = "CGMZ Event Conditions";
	const error = "Gold Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Gold: [>|>=|=|<|<=] [amount]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check actor extra condition
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkActor = function(params) {
	// Expected Format: Actor: [id] [in|out]
	if(params.length === 3 && !isNaN(params[1])) {
		const actor = $gameActors.actor(Number(params[1]));
        if (params[2] === 'in') {
            return $gameParty.members().includes(actor);
        } else {
			return !$gameParty.members().includes(actor);
		}
	}
	const script = "CGMZ Event Conditions";
	const error = "Actor Condition formatted incorrectly in event id = " + this._eventId + ". Skipping condition.";
	const solution = 'Change condition formatting to match: {Actor: [id] [in|out]}';
	$cgmzTemp.reportError(error, script, solution);
	return true;
};
//-----------------------------------------------------------------------------
// Check unknown extra condition (modify this if expanding plugin functionality)
// This should return true if the condition is satisfied, and false if not.
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventConditions_checkOtherCondition = function(params) {
	return true;
};