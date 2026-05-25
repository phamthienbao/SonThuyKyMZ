/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/menucommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Manage the menu command window
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: Use this plugin to easily manage the command window in the
 * menu scene. It allows you to re-arrange commands or use JavaScript to 
 * add custom commands which are capable of calling custom plugin scenes or
 * functions.
 * ----------------------------------------------------------------------------
 * Documentation:
 * The command symbol should be unique and not blank for every command. This
 * symbol is how the plugin knows internally which JS code to run.
 *
 * Some Command Symbols can have special meanings, mainly
 * when they represent the original 8 commands.
 * The following symbols represent the original 8 commands (case sensitive):
 * item - Will handle like the original item command
 * skill - Will handle like the original skill command
 * equip - Will handle like the original equip command
 * status - Will handle like the original status command
 * formation - Will handle like the original formation command
 * options - Will handle like the original options command
 * save - Will handle like the original save command
 * gameEnd - will handle like the original game end command
 * 
 * It is important that you do not use these strings as the Command Symbol
 * property unless you mean to refer to the original commands.
 * 
 * If you set the parameter "Keep Original Commands" to true, the 8 original
 * commands will be untouched and custom commands will go where the makers of
 * RPG Maker MZ intended them to go in the list of menu items. This is the
 * beginner-friendly option.
 *
 * If you set the parameter "Keep Original Commands" to false, no commands will
 * be added by default and you will need to add any menu item you wish to use
 * even if it is one of the ones that come with the maker (such as the Item
 * command). However, with this option you have more control over where in the
 * list each entry appears and you can also easily hide or disable menu entries
 * with the switches associated with them.
 * 
 * Below you can find the default 8 commands which you can copy+paste into the
 * text part of the parameter setup if using this option. You can still change
 * the order, the command name, and modify switches to enable/disable and
 * hide/show the option.
 *
 * Item command:
 * {"Command Name":"Item","Command Symbol":"item","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Skill command:
 * {"Command Name":"Skill","Command Symbol":"skill","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Equip command:
 * {"Command Name":"Equip","Command Symbol":"equip","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Status command:
 * {"Command Name":"Status","Command Symbol":"status","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Formation command:
 * {"Command Name":"Formation","Command Symbol":"formation","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Options command:
 * {"Command Name":"Options","Command Symbol":"options","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Save command:
 * {"Command Name":"Save","Command Symbol":"save","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Game End command:
 * {"Command Name":"Game End","Command Symbol":"gameEnd","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not have any plugin commands.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_MenuCommandWindow.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * 1.0.0 - Initial release
 *
 * 1.0.1:
 * - Added ability to choose alignment of command text
 *
 * 1.1.0:
 * - Added option to use text codes in commands
 *
 * 1.2.0:
 * - Added option to disable commands if party doesn't have item
 *
 * 1.2.1:
 * - Added Spanish language help documentation
 * - This plugin now warns instead of crashes when detecting invalid JSON
 *
 * @param Commands
 * @type struct<Handler>[]
 * @desc Command Name and associated js commands
 * @default []
 *
 * @param Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc The alignment of the command text in the window
 *
 * @param Keep Original Commands
 * @type boolean
 * @default true
 * @desc Determine whether to show the original commands in their original order.
 *
 * @param Enable Text Codes
 * @type boolean
 * @default true
 * @desc Allow the use of text codes (such as colors) ?
*/
/*~struct~Handler:
 * @param Command Name
 * @type text
 * @desc Name of the command to display in the command window.
 *
 * @param Command Symbol
 * @type text
 * @desc This symbol is used internally to recognize the command.
 * Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @type note
 * @desc JavaScript to run when command is selected.
 * @default ""
 *
 * @param Enable Switch
 * @type switch
 * @default 0
 * @desc Turning this switch on will enable the command.
 *
 * @param Show Switch
 * @type switch
 * @default 0
 * @desc Turning this switch on will show the command.
 *
 * @param Required Item
 * @type item
 * @default 0
 * @desc Item that must be in the inventory
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/menucommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Administrar la ventana de comandos del menú
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.2.1
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Descripción: Usa este complemento para administrar fácilmente la ventana de 
 * comandos en la escena del menú. Le permite reorganizar los comandos o usar 
 * JavaScript para agregar comandos personalizados que son capaces de llamar a 
 * escenas o funciones de complementos personalizados.
 * ----------------------------------------------------------------------------
 * Documentación:
 * El símbolo de comando debe ser único y no estar en blanco para cada
 * comando. Este símbolo es cómo el complemento sabe internamente qué código
 * JS ejecutar.
 *
 * Algunos Símbolos de Comando pueden tener significados especiales,
 * principalmente cuando representan los 8 comandos originales.
 * Los siguientes símbolos representan los 8 comandos originales (se distingue 
 * entre mayúsculas y minúsculas):
 * item - Se manejará como el comando del elemento original
 * skill - Se manejará como el comando de habilidad original
 * equip - Se manejará como el comando de equipo original
 * status - Se manejará como el comando de estado original
 * formation - Se manejará como el comando de formación original
 * options - Se manejará como el comando de opciones original
 * save - Se manejará como el comando de guardado original
 * gameEnd - Se manejará como el comando de finalización del juego original
 * 
 * Es importante que no utilices estas cadenas como la propiedad de Símbolo de 
 * comando a menos que desee hacer referencia a los comandos originales.
 *
 * Si establece el parámetro "Mantener los comandos originales" en verdadero, 
 * los 8 comandos originales no se modificarán y los comandos personalizados irán
 * donde los creadores de RPG Maker MZ pretendía que estuvieran en la lista de 
 * elementos del menú. Esta es la opción para principiantes.
 *
 * Si configura el parámetro "Mantener los comandos originales" en falso, no se
 * agregarán comandos de forma predeterminada y deberá agregar cualquier elemento 
 * de menú que desee usar, incluso si es uno de los que vienen con el fabricante 
 * (como el comando Elemento). Sin embargo, con esta opción tiene más control sobre 
 * dónde aparece cada entrada en la lista y también puede ocultar o deshabilitar 
 * fácilmente las entradas del menú con los interruptores asociados a ellas.
 *
 * A continuación puede encontrar los 8 comandos predeterminados que puede copiar 
 * y pegar en la parte de texto de la configuración de parámetros si usa esta opción. 
 * Todavía puede cambiar el orden, el nombre del comando y modificar los 
 * interruptores para habilitar/deshabilitar y ocultar/mostrar la opción.
 *
 * Comando de artículo:
 * {"Command Name":"Item","Command Symbol":"item","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Comando de habilidad:
 * {"Command Name":"Skill","Command Symbol":"skill","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Comando Equipar:
 * {"Command Name":"Equip","Command Symbol":"equip","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Comando de Estado:
 * {"Command Name":"Status","Command Symbol":"status","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Comando de formación:
 * {"Command Name":"Formation","Command Symbol":"formation","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Comando de opciones:
 * {"Command Name":"Options","Command Symbol":"options","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Guardar comando:
 * {"Command Name":"Save","Command Symbol":"save","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Comando Fin del juego:
 * {"Command Name":"Game End","Command Symbol":"gameEnd","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 * ----------------------- Comandos de Plugin----------------------------------
 * Este plugin no tiene ningún comando de plugin.
 * --------------------------Juegos guardados----------------------------------
 * Este plugin es totalmente compatible con los juegos guardados.
 * -------------------------Nombre del archivo---------------------------------
 * El nombre de archivo de este complemento DEBE seguir siendo
 * CGMZ_MenuCommandWindow.js. Esto es lo que se obtiene cuando se descarga. El
 * nombre de archivo se usa para cargar parámetros y ejecutar comandos de
 * complemento. Si lo cambias, las cosas comenzarán a comportarse
 * incorrectamente y tu juego probablemente fallará. No cambies el nombre del
 * archivo js.
 * -------------------------Historial de Versiones-----------------------------
 * 1.0.0 - Versión Inicial
 *
 * 1.0.1:
 * - Se agregó la capacidad de elegir la alineación del texto del comando.
 *
 * 1.1.0:
 * - Opción agregada para usar códigos de texto en los comandos.
 *
 * 1.2.0:
 * - Opción agregada para deshabilitar comandos si el grupo no tiene un elemento
 *
 * 1.2.1:
 * - Added Spanish language help documentation
 * - This plugin now warns instead of crashes when detecting invalid JSON
 *
 * @param Commands
 * @text Comandos
 * @type struct<Handler>[]
 * @desc Nombre del comando y comandos js asociados.
 * @default []
 *
 * @param Alignment
 * @text Alineación
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc La alineación del texto del comando en la ventana.
 *
 * @param Keep Original Commands
 * @text Mantener los comandos originales
 * @type boolean
 * @default true
 * @desc Determina si desea mostrar los comandos originales en su orden original.
 *
 * @param Enable Text Codes
 * @text Habilitar códigos de texto
 * @type boolean
 * @default true
 * @desc ¿Permitir el uso de códigos de texto (como colores)?
*/
/*~struct~Handler:es
 * @param Command Name
 * @text Nombre de Comando
 * @type text
 * @desc Nombre del comando que se mostrará en la ventana de comandos.
 *
 * @param Command Symbol
 * @text Símbolo de Comando
 * @type text
 * @desc Este símbolo se usa internamente para reconocer el comando.
 * Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @text Comando JS
 * @type note
 * @desc JavaScript para ejecutar cuando se selecciona el comando.
 * @default ""
 *
 * @param Enable Switch
 * @text Habilitar interruptor
 * @type switch
 * @default 0
 * @desc Encender este interruptor habilitará el comando.
 *
 * @param Show Switch
 * @text Mostrar interruptor
 * @type switch
 * @default 0
 * @desc Al encender este interruptor se mostrará el comando.
 *
 * @param Required Item
 * @text Elemento requerido
 * @type item
 * @default 0
 * @desc Artículo que debe estar en el inventario.
*/
Imported.CGMZ_Menu_CommandWindow = true;
CGMZ.Versions["Menu Command Window"] = "1.2.1";
CGMZ.Menu_CommandWindow = {};
CGMZ.Menu_CommandWindow.parameters = PluginManager.parameters('CGMZ_MenuCommandWindow');
CGMZ.Menu_CommandWindow.Alignment = CGMZ.Menu_CommandWindow.parameters["Alignment"];
CGMZ.Menu_CommandWindow.KeepOriginals = (CGMZ.Menu_CommandWindow.parameters["Keep Original Commands"] === "true");
CGMZ.Menu_CommandWindow.EnableTextCodes = (CGMZ.Menu_CommandWindow.parameters["Enable Text Codes"] === "true");
CGMZ.Menu_CommandWindow.CommandsArray = CGMZ_Utils.parseJSON(CGMZ.Menu_CommandWindow.parameters["Commands"], [], "CGMZ Menu Command Window", "Your Commands parameter had invalid JSON and could not be read");
CGMZ.Menu_CommandWindow.Commands = [];
for(const commandJSON of CGMZ.Menu_CommandWindow.CommandsArray) {
	const command = CGMZ_Utils.parseJSON(commandJSON, null, "CGMZ Menu Command Window", "One of your commands had invalid JSON and could not be parsed");
	if(!command) continue;
	command["Enable Switch"] = Number(command["Enable Switch"]);
	command["Show Switch"] = Number(command["Show Switch"]);
	CGMZ.Menu_CommandWindow.Commands.push(command);
}
//=============================================================================
// Scene Menu
//-----------------------------------------------------------------------------
// Handling for command window entries
//=============================================================================
//-----------------------------------------------------------------------------
// Handling for custom Commands added through the plugin
//-----------------------------------------------------------------------------
Scene_Menu.prototype.CGMZ_MenuCommand_commandCustom = function() {
	for(let i = 0; i < CGMZ.Menu_CommandWindow.Commands.length; i++) {
		if(this._commandWindow.currentSymbol() === CGMZ.Menu_CommandWindow.Commands[i]["Command Symbol"]) {
			try {
				eval(JSON.parse(CGMZ.Menu_CommandWindow.Commands[i]["JS Command"]));
			}
			catch (e) {
				const origin = "CGMZ Menu Command Window";
				const suggestion = "Check your JavaScript command";
				$cgmzTemp.reportError(e.message, origin, suggestion);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Add additional commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	alias_CGMZ_MenuCommandWindow_createCommandWindow.call(this);
	for(let i = 0; i < CGMZ.Menu_CommandWindow.Commands.length; i++) {
		if(this.CGMZ_MenuCommandWindow_isCustomCommand(CGMZ.Menu_CommandWindow.Commands[i]["Command Symbol"])) {
			this._commandWindow.setHandler(CGMZ.Menu_CommandWindow.Commands[i]["Command Symbol"], this.CGMZ_MenuCommand_commandCustom.bind(this));
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if command is a custom command in need of custom handler
//-----------------------------------------------------------------------------
Scene_Menu.prototype.CGMZ_MenuCommandWindow_isCustomCommand = function(symbol) {
	if(symbol === 'item' || symbol === 'skill' || symbol === 'equip' || symbol === 'status' ||
	symbol === 'formation' || symbol === 'options' || symbol === 'save' || symbol === 'gameEnd') {
		return false;
	}
	return true;
};
//=============================================================================
// Window MenuCommand
//-----------------------------------------------------------------------------
// Change amount of commands displayed at once and add new original commands
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Add original commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	alias_CGMZ_MenuCommandWindow_addOriginalCommands.call(this);
	for(const cmd of CGMZ.Menu_CommandWindow.Commands) {
		if(this.CGMZ_MenuCommandWindow_needsCommand(cmd)) {
			const enabled = this.CGMZ_MenuCommandWindow_getEnabledStatus(cmd);
			this.addCommand(cmd["Command Name"], cmd["Command Symbol"], enabled);
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if Command should show
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.CGMZ_MenuCommandWindow_needsCommand = function(cmd) {
	if(cmd["Show Switch"] > 0 && !$gameSwitches.value(cmd["Show Switch"])) {
		return false;
	}
	return this.needsCommand(cmd["Command Symbol"]);
};
//-----------------------------------------------------------------------------
// Determine if Command should show
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.CGMZ_MenuCommandWindow_getEnabledStatus = function(cmd) {
	const switchId = Number(cmd["Enable Switch"]);
	if(switchId > 0 && !$gameSwitches.value(switchId)) return false;
	const itemId = Number(cmd["Required Item"]);
	if(itemId > 0 && !$gameParty.hasItem($dataItems[itemId], false)) return false;
	switch(cmd["Command Symbol"]) {
		case 'item':
		case 'skill':
		case 'equip':
		case 'status':
			return this.areMainCommandsEnabled();
		case 'formation':
			return this.isFormationEnabled();
		case 'options':
			return this.isOptionsEnabled();
		case 'save':
			return this.isSaveEnabled();
		case 'gameEnd':
			return this.isGameEndEnabled();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Alias. Add main commands only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addMainCommands.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add formation command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addFormationCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add options command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addOptionsCommand = Window_MenuCommand.prototype.addOptionsCommand;
Window_MenuCommand.prototype.addOptionsCommand = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addOptionsCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add save command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
Window_MenuCommand.prototype.addSaveCommand = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addSaveCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add game end command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addGameEndCommand = Window_MenuCommand.prototype.addGameEndCommand;
Window_MenuCommand.prototype.addGameEndCommand = function() {
	if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addGameEndCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Change alignment of command text
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.itemTextAlign = function() {
    return CGMZ.Menu_CommandWindow.Alignment;
};
//-----------------------------------------------------------------------------
// Allow use of text codes in command
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.drawItem = function(index) {
	if(CGMZ.Menu_CommandWindow.EnableTextCodes) {
		const rect = this.itemLineRect(index);
		const align = this.itemTextAlign();
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, align);
	} else {
		Window_Command.prototype.drawItem.call(this, index);
	}
};