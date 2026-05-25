//=============================================================================
// RPG Maker MZ - MewglesCore
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V0.51) Core for plugins related to Mewgles
 * @author Mewgles
 * @url https://mewgles.itch.io/mewgles-core-mz
 *
 * @param Core
 * @text ---- Core ----
 * @desc Plugin modes, see help section for further info
 *
 * @param Base_Mode
 * @text Base Mode
 * @parent Core
 * @type select
 * @option Developer
 * @option Release
 * @default Developer
 * @desc Set whether you want to use the dev mode or the release mode (See help section for info)
 *
 * @param Update_Notification
 * @text Update Notification
 * @parent Core
 * @type select
 * @option ON
 * @option OFF
 * @default ON
 * @desc Set if you want to get notified when updates for installed plugins are available (Only in dev mode)
 *
 * @param Release_Mode
 * @text ---- Release Mode ----
 * @parent Core
 * @desc Release Mode settings
 *
 * @param Block_Console
 * @text Block Console
 * @parent Release_Mode
 * @type select
 * @option ON
 * @option OFF
 * @default OFF
 * @desc Set if you want to fully block the console when the game is in release mode (See help section for info)
 *
 * @param Console_Warning
 * @text Block Warning
 * @parent Release_Mode
 * @type text
 * @default Dev tools have been disabled. Restart and try without cheating!
 * @desc Set the warning message for the user for when he opens the console
 *
 * @param Global_Settings
 * @text ---- Global Settings ----
 * @desc Settings that are used by other plugins
 *
 * @param Fonts
 * @text Fonts
 * @parent Global_Settings
 * @type text[]
 * @desc Set the font types that can be used for the plugins (They have to be located in the fonts folder)
 *
 * @param Special_Hooks
 * @text ---- Special Hooks ----
 * @desc Set special hooks for other plugins to use
 *
 * @param Hooks
 * @text Hooks
 * @type text[]
 * @desc Set special hooks for other plugins to use (see help section for info)
 *
 *------------------------------------------------------------------------------
 * @help
 * Mewgles Core
 *------------------------------------------------------------------------------
 * ## Terms of Use ##
 *
 * Non-commercial use:
 * This Plugin may be used for non-commercial projects as long as you give
 * credit to "Mewgles"
 *
 * Commercial use:
 * This Plugin may be used for commercial projects as long as you give credit
 * to "Mewgles" and notify me on release. (Discord Mewgles#5913)
 *
 * You are not allowed to redistribute or alter my work in any way.
 *
 *------------------------------------------------------------------------------
 * ## Important Note ##
 *
 * This plugin requires an internet connection in order to use all functions.
 * Once you go into release mode it will however not need the connection anymore
 * as long as it has been established at least once while in developer mode.
 *
 * Why does it need an internet connection?
 * The plugin is going to not just check whether there are updates for any
 * of my plugins you might have installed available, but also allows to
 * include a few other features such as allowing the plugins to interact
 * with each other.
 *
 * Ther are going to be a lot of updates for this plugin in the future as it's
 * going to grow with the amount of other plugins I create.
 *
 *------------------------------------------------------------------------------
 * ## Features ##
 *
 * - Base functionalities for all of my plugins
 * - Developer and Relese modes that help with debugging and making things work
 *   on all platforms
 * - Special feature that allows plugins to interact with each other to some
 *   degree
 * - Optional update notifications for all my plugins
 * - Optional console blocking (cheat protection) upon using Release Mode
 *
 *------------------------------------------------------------------------------
 * ## Manual ##
 *------------------------------------------------------------------------------
 * ## Modes ##
 *
 * This Plugin is going to offer a few different options in the future. The
 * modes set how they are used.
 *
 * Base Mode:
 * The base mode defines whether the Core will throw any alerts/errors when
 * something is wrong. In Developer mode it will show alerts and errors
 * via console and in the game window.
 * The plugin will also build the needed arrays for eventual other plugins
 * you're using. This process might cause a few seconds of delay at the
 * start of each playtest before the title shows up. Once you're in
 * Release mode those delays are removed as the arrays will be read from
 * the files that were generated during testing.
 *
 * In Release mode all alerts are turned off. Make sure to set the mode to
 * Release mode before you deploy your game.
 *
 * IMPORTANT:
 * Run the playtest in developer mode at least once before you're deploying your
 * game. Otherwise some plugins might not work!
 *
 *------------------------------------------------------------------------------
 * ## Blocking the Console ##
 *
 * This plugin is able to optionally block the console when the plugin is in
 * "Release Mode". The console will throw a customizable warning and then close
 * the game. A restart of the game will of course work.
 *
 * While this feature works as sort of a light anticheat system as it prevents
 * users from tampering with ingame variables and functions, it does not
 * protect your game against direct file tampering.
 *
 *------------------------------------------------------------------------------
 * ## Special Hooks ##
 *
 * You can set up hooks which can be used by other plugins to interact with each
 * other. All you have to do to set up a hook is add a name to the hook list.
 * You can then target the name with the respective hook function of the plugins
 * you want to use to interact with it. (Not all plugins offer this feature).
 *
 * As of now, this feature only works for my plugins.
 *
 *------------------------------------------------------------------------------
 * ## Base MZ Engine Bugfixes ##
 *
 * Event Command Call:
 * Usually when an event is empty and it gets triggered by the action button
 * the event doesn't move at all. But if there is an plugin command inside
 * and nothing else, the event turns towards the player for a few frames.
 * I'm not 100% sure if this can really be considered a bug, but this plugin
 * disables the one frame turn around when there is just a plugin command
 * inside the event and nothing else.
 *
 * If you still want the even to trigger like that for some reason, simply put
 * an empty comment inside.
 *
 *------------------------------------------------------------------------------
 * ## Troubleshooting ##
 *------------------------------------------------------------------------------
 *  ## Minifying the Plugin ##
 *
 * If you're planning to minify this plugin, keep in mind that it is intertwined
 * with the other plugins, so you have to minify them together (still separate files!)
 * If you don't do that, you might run into issues where certain functionalities
 * do not work. Some of them you might not notice right away.
 *
 * However, I do not recommend minifying this or any other of my plugins.
 *
 *------------------------------------------------------------------------------
 * ## Web Browser Errors ##
 *
 * If you're running into browser errors for your deployed game it might be that
 * you didn't run a playtest in developer mode before deplyoing. Make sure to
 * run developer mode at least once so all the necessary files for proper
 * browser support are available.
 *
 *------------------------------------------------------------------------------
 * ## Class References ##
 *
 * Overrides:
 * Game_Event.prototype.start -> Override for custom event handling. Does not
 *                               affect other plugins/functions in a direct
 *                               way.
 *
 * Aliases:
 * Graphics._requestFullScreen -> Fullscreen check
 *
 * Graphics._cancelFullScreen -> Fullscreen check
 *
 * Game_Event.prototype.setupPage -> Hook for parsing custom event handlers
 *
 * Scene_Boot.prototype.onDatabaseLoaded -> Starts the Core setup
 *
 * Scene_Boot.prototype.loadGameFonts -> Internal font loading
 *
 * Scene_Title.prototype.start -> Internal hook
 *
 * Scene_Map.prototype.createDisplayObjects -> Hook for custom event handlers
 *
 *------------------------------------------------------------------------------
 * ## Support and Bug Reports ##
 *
 * If you have any issues feel free to contact me on Discord at Mewgles#5913
 * or you can join my server for special text channels, in-depth support
 * and news regarding my work at https://discord.gg/b4MwdG3
 *
 * You can always get the newest versions of my plugins at my website
 * (https://atelier-mew.com).
 *
 * If you want to support me further, feel free to check out my Patreon at
 * https://patreon.com/Mewgles
 *
 *------------------------------------------------------------------------------
 * ## To Do / Planned Udpates ##
 *
 * -
 *
 *------------------------------------------------------------------------------
 * ## Changelog ##
 *
 * July 5, 2021
 * Version 0.51
 * - Added some functionalities for plugins
 * - Added a feature that allows to block the console usage (F12) in Release
 *   Mode
 *
 *------------------------------------------------------------------------------
 */


function MewglesCore() {
    this.initialize(...arguments);
};


MewglesCore.pluginName = "MewglesCore";
MewglesCore.version = 0.51;

MewglesCore.errorHandlers = {
    Fonts : 'MewglesCore: Font setting is missing in global settings configuration',
    Hooks : 'MewglesCore: Hooks setting is missing in special hooks configuration',
    Folder_Path : 'MewglesCore: Warning! Could not find or create mewgles folder in /js/plugins/!'
};

MewglesCore.throwError = {};
MewglesCore.throwError.JSON = function(error, extra_data,  force) {
    if (force || MewglesCore.vars.base_mode) {
        alert('MewglesCore: Warning JSON ERROR found. Please check the console for further info (F12)');
        console.log(error + ' ' + extra_data);
    }
    return true;
};


MewglesCore.throwError.dir = function(error, log, force) {
    if (force || MewglesCore.vars.base_mode) {
        alert('MewglesCore: Warning directory ERROR. Please check the console for further info (F12)');
        console.log(error);
        console.log(log);
    }
};


MewglesCore.JSONParse = function(json, name, extra_data,  plugin_name, force) {
    if (json != '') {
        try {
            return JSON.parse(json);
        } catch (e) {
            this.throwError.JSON(window[plugin_name].errorHandlers[name], extra_data,  force);
            console.log(e);
        }
    } else {
        this.throwError.JSON(window[plugin_name].errorHandlers[name], extra_data,  force);
    }
};


MewglesCore.getParams = function() {
    MewglesCore.params = PluginManager.parameters('MewglesCore');
    MewglesCore.vars = {
        //Global Variables
        is_node : false,
        game_running : false,
        fullscreen : false,
        plugin_order : [],
        registered_plugins : {},
        registered_hooks : {},
        base_folder_path : './js/plugins/mewgles',
        config_file_path : './js/plugins/mewgles/core.json',
        plugin_config : {},

        block_events : false,
        block_player : false,

        //Data
        config : {},
        commands : [],
        functions : [],
        stored_event_info : [],

        //Core
        base_mode : (this.params['Base_Mode'] === 'Developer') ? true : false,
        update_notification : (this.params['Update_Notification'] === 'ON') ? true : false,
        block_console : (this.params['Block_Console'] === 'ON') ? true : false,
        console_warning : this.params['Console_Warning'],
        setup_finished : false,

        //Global Config
        font_families : [],
        font_files : [],
        game_font : '',
    };
};


MewglesCore.checkOrder = function() {
    for (let i = 0; i < PluginManager._scripts.length; i++) {
        if (PluginManager._scripts[i].startsWith('Mewgles')) {
            this.vars.plugin_order.push(PluginManager._scripts[i]);
            this.vars.registered_plugins[PluginManager._scripts[i]] = {};
        }
    }
    if (this.vars.plugin_order.indexOf('MewglesCore') != 0 && this.vars.base_mode) {
        alert('MewglesCore: Please set the Mewgles Core plugin above your other Mewgles plugins in the Plugin Manager.');
        console.log('MewglesCore: Please set the Mewgles Core plugin above your other Mewgles plugins in the Plugin Manager.');
    }
};


MewglesCore.pushData = function() {
    this.vars.plugin_config[this.pluginName] = {
        version : this.version,
        array_names : [],
        array_modes : [],
        array_structures : [],
        functions : [],
    };
};


MewglesCore.run = function() {
    const plugins = this.vars.plugin_order;
    try {
        for (let i = 0; i < plugins.length; i++) {
            if (plugins[i] != this.pluginName) {
                window[plugins[i]].pushData();
            }
        }
    } catch (e) {
        if (this.vars.base_mode) {
            console.log('MewglesCore: Warning! Could not read all plugin data. Some plugins might not be up to date.');
            console.log(e);
        }
    }
    if (this.vars.base_mode) {
        try {
            if (this.vars.update_notification) {
                this.checkPluginVersions();
            }
            this.buildAllConfig();
        } catch (e) {
            alert('MewglesCore: Warning! Could not read all plugin files. Please make sure to update your Mewgles plugins.');
            console.log('MewglesCore: Warning! Could not read all plugin files. Please make sure to update your Mewgles plugins.');
            console.log(e);
        }
    }
    this.getGameFont();
    this.readConfig();
};


MewglesCore.checkPluginVersions = function() {
    try {
        this.readFile('https://atelier-mew.com/wp-content/engine/plugin_versions.json', this.vars['plugin_versions'], 'version_check', false);
    } catch (e) {
        alert('MewglesCore: Warning! Could not read plugin version file from server. Please check your internet connection.');
        console.log('MewglesCore: Warning! Could not read version config file from server. Please check your internet connection.');
        console.log(e);
    }
};


MewglesCore.checkNode = function() {
    this.vars.is_node = Utils.isNwjs();
    if (this.vars.base_mode) {
            if (!Utils.isNwjs()) {
            alert('MewglesCore: Warning! Nodejs not found. Please make sure to run this application on nodejs or switch "Base Mode" to "Release".');
            console.log('MewglesCore: Warning! Nodejs not found. Please make sure to run this application on nodejs or switch "Base Mode" to "Release" if you are done testing.');
        }
    }
};


MewglesCore.checkDir = function(dir) {
    const fs = require('fs');
    if (fs.existsSync(dir)) {
        return true;
    }
    return false;
};


MewglesCore.mkDir = function(dir) {
    const fs = require('fs');
    fs.mkdirSync(dir);
};


MewglesCore.setDir = function(dir, error) {
    if (this.vars.base_mode) {
        try {
            if (!this.checkDir(dir)) {
                this.mkDir(dir);
            }
        } catch (e) {
            this.throwError.dir(error, e, false)
        }
    }
};


MewglesCore.writeFile = function(file, contents) {
    const fs = require('fs');
    fs.writeFileSync(file, contents, function(err) {
        if (err && MewglesCore.vars.base_mode) {
            alert('MewglesCore: ' + err);
            console.log('MewglesCore: ' + err);
        }
    });
};


MewglesCore.removeFile = function(file) {
    const fs = require('fs');
    fs.unlinkSync(file);
};


MewglesCore.removeFileFromForage = function(file) {
    const key = StorageManager.forageKey(file);
    return localforage.removeItem(key).then(() => StorageManager.updateForageKeys());
};


MewglesCore.readFile = async function(file, name, type, extra_data) {
    const header = new Headers();
    header.append('pragma', 'no-cache');
    header.append('cache-control', 'no-cache');
    const init = {
        method: 'GET',
        headers: header,
    };
    fetch(file, init)
        .then(response => {
            if (!response.ok && MewglesCore.vars.base_mode) {
                alert('MewglesCore: Warning! File could not be read. Please restart the game and try again.');
                console.log('MewglesCore: Warning! File could not be read. Please restart the game and try again.');
            }
            return response.json();
        })
        .then(data => {
            if (type === 'array') {
                MewglesCore.readAllconfig(name, data, extra_data);
            }
            if (type === 'version_check') {
                MewglesCore.checkAllPluginVersions(name, data)
            }
            if (type === 'get_config') {
                MewglesCore.returnConfig(name, data, extra_data);
            }
        });
};


MewglesCore.readAllconfig = function(name, data, extra_data) {
    this.vars[name] = data;
    this.runPlugins();
    if (extra_data) {
        this.setArrays();
    }
};


MewglesCore.checkAllPluginVersions = function(name, data) {
    try {
        for (const [key, value] of Object.entries(this.vars.registered_plugins)) {
            if (data[key].version > window[key].version) {
                alert('MewglesCore: New version of ' + key + ' available. New version: ' + String(data[key].version) + '. Release date: ' + data[key].release_date);
                console.log('MewglesCore: New version of ' + key + ' available. New version: ' + String(data[key].version) + '. Release date: ' + data[key].release_date);
            } else {
                console.log('MewglesCore: Version check for ' + key + ' complete. Version is up to date.');
            }
        }
    } catch (e) {
        console.log('MewglesCore: Failed to check all plugin versions. Please try again later.');
    }
};


MewglesCore.returnConfig = function(name, data, plugin_name) {
    window[plugin_name][name] = data;
};


MewglesCore.buildAllConfig = function() {
    try {
        this.setupConfigFolder();
        this.setConfig();
    } catch (e) {
        alert('MewglesCore: Warning! Could not build all necessary files. Please check the console for further info');
        console.log('MewglesCore: Warning! Could not build all necessary files. Please check the console for further info');
        console.log(e);
    }
};


MewglesCore.getEventData = function() {
    if (this.vars.base_mode) {
        const fs = require('fs');
        const files = fs.readdirSync('data');
        let real_map_count = Number;
        let events = [];
        for (let i = 0; i < files.length; i++) {
            if (!files[i].startsWith('MapInfos') && files[i].startsWith('Map')) {
                real_map_count = Number(files[i].split('p')[1].split('.')[0]);
                const data = require('data/' + files[i]);
                events.length = real_map_count + 1;
                events[real_map_count] = data.events.length;
            }
        }
        events = Array.from(events, (v, i) => i in events ? v : 0);
        this.vars.config['total_maps'] = real_map_count;
        this.vars.config['map_events'] = events;
    }
};


MewglesCore.setConfig = function(name, data) {
    if (this.vars.base_mode) {
        if (name) {
            data = JSON.stringify(data);
            this.writeFile(name, data);
        } else {
            const data = JSON.stringify(this.vars.config, null);
            this.writeFile(this.vars.config_file_path, data);
        }
    }
};


MewglesCore.setupConfigFolder = function() {
    this.setDir(this.vars.base_folder_path, this.errorHandlers.Folder_Path);
};


MewglesCore.readConfig = function() {
    this.readFile(this.vars.config_file_path, 'config', 'array', true);
};


MewglesCore.setHook = function(name) {
    const hooks = this.vars.registered_hooks;
    if (hooks[name]) {
    } else if (this.vars.base_mode) {
        alert('MewglesCore: Hook "' + name + '" not found! Please check the spelling. Hooks are case sensitive!');
        console.log('MewglesCore: Hook "' + name + '" not found! Please check the spelling. Hooks are case sensitive!');
    }
};


MewglesCore.setFonts = function() {
    if (this.params['Fonts'] != '') {
        this.vars.fonts = this.JSONParse(this.params['Fonts'], 'Fonts', '', this.pluginName, true);
        for (i = 0; i < this.vars.fonts.length; i++) {
            let split = '';
            split = this.vars.fonts[i].split('.');
            this.vars.font_families.push(split[0]);
            this.vars.font_files.push(this.vars.fonts[i]);
        }
    }
};


MewglesCore.getGameFont = function() {
    let font = FontManager._urls['rmmz-mainfont'];
    font = font.split('/')[1];
    this.vars.game_font = font.split('.')[0]
};


MewglesCore.setArrays = function() {
    if (!this.vars.setup_finished) {
        const config = this.vars.plugin_config;
        const events = this.vars.config.map_events;
        for (const [key, value] of Object.entries(this.vars.registered_plugins)) {
            if (config[key].array_names.length > 0) {
                for (let j = 0; j < config[key].array_names.length; j++) {
                    if (config[key].array_modes[j] === 'event' || config[key].array_modes[j] === 'map') {
                        this._temp = [];
                        this._temp.length = this.vars.config.total_maps + 1;
                        this._temp.fill([]);
                    }
                    for (let l = 0; l < events.length; l++) {
                        if (events[l] > 0 && config[key].array_modes[j] === 'event') {
                            const data_struct = config[key].array_structures[j];
                            const num = events[l] - 1;
                            const data = Array(num).fill(data_struct);
                            this._temp[l] = data;
                        }
                        this.vars[config[key].array_names[j]] = JSON.parse(JSON.stringify(this._temp));
                    }
                }
            }
        }
        this.vars.setup_finished = true;
    }
};


MewglesCore.getHooks = function() {
    if (this.params['Hooks'] != '') {
        this.vars.hooks = this.JSONParse(this.params['Hooks'], 'Hooks', '', this.pluginName, true);
        if (this.vars.hooks && this.vars.hooks.length > 0) {
            for (let i = 0; i < this.vars.hooks.length; i++) {
                this.vars.registered_hooks[this.vars.hooks[i]] = {Coordinates : [], Switch : 0, Variable : 0, Map_Id : 0, Event_Id : 0, Common_Event_Id : 0};
            }
        }
    }
};


MewglesCore.runPlugins = function() {
    const config = this.vars.plugin_config;
    for (const [key, value] of Object.entries(this.vars.registered_plugins)) {
        if (config[key].functions.length > 0) {
            for (let i = 0; i < config[key].functions.length; i++) {
                if (config[key].functions[i] === 'run') {
                    window[key].run();
                }
            }
        }
    }
};


MewglesCore.blockConsole = function() {
    if (!this.vars.base_mode && this.vars.block_console) {
        const disableDevtools = callback => {
            const original = Object.getPrototypeOf;
            Object.getPrototypeOf = (...args) => {
                if (Error().stack.includes("getCompletions")) callback();
                return original(...args);
            };
        };
        disableDevtools(() => {
            console.error(MewglesCore.vars.console_warning);
            setTimeout(function() {
                SceneManager.exit();
            }, 10000);
        });
    }
};


MewglesCore.getParams();
MewglesCore.checkNode();
MewglesCore.setFonts();
MewglesCore.checkOrder();
MewglesCore.getEventData();
MewglesCore.pushData();
MewglesCore.getHooks();
MewglesCore.blockConsole();


//Internal Functions

//Update
MewglesCore.updateAll = function() {
    this.updatePlayerCanMove();
};


MewglesCore.updatePlayerCanMove = function() {
    if (this.vars.block_player) {
        Input.clear();
        TouchInput.clear();
    }
};


//Animations
MewglesCore.updateAnimation = function(sprite, animation) {
    switch(animation.Animation_Type) {
        case 'Bounce':
            this.updateBounceAnimation(sprite, animation);
            break;
        case 'Sway':
            this.updateSwayAnimation(sprite, animation);
            break;
        case 'Pulse':
            this.updatePulseAnimation(sprite, animation);
            break;
        case 'Rotate':
            this.updateRotationAnimation(sprite, animation);
            break;
        case 'Boost':
            this.updateBoostAnimation(sprite, animation);
            break;
        case 'Linear':
            this.updateLinearAnimation(sprite, animation);
        default:
            break;
    }
};


MewglesCore.updateBounceAnimation = function(sprite, animation) {
    if (animation.Delay_C === animation.Animation_Delay) {
        if (!animation.Bounce_Fin) {
            animation.Bounce_Y++;
        } else {
            animation.Bounce_Y--;
        }
        if (animation.Bounce_Y === animation.Max_Movement) {
            animation.Bounce_Fin = true;
        }
        if (animation.Bounce_Y === 0 && animation.Bounce_Fin) {
            animation.Bounce_Fin = false;
            animation.Delay_C = 0;
        }
    } else {
        animation.Delay_C++;
    }
    sprite.y = (sprite.initial_y + ((animation.Bounce_Y / 2) * animation.Animation_Speed));
};


MewglesCore.updateSwayAnimation = function(sprite, animation) {
    if (animation.Delay_C === animation.Animation_Delay) {
        if (!animation.Sway_Fin) {
            animation.Sway_X++;
        } else {
            animation.Sway_X--;
        }
        if (animation.Sway_X === animation.Max_Movement) {
            animation.Sway_Fin = true;
            animation.Sway_State++;
        }
        if (animation.Sway_X === -animation.Max_Movement && animation.Sway_Fin) {
            animation.Sway_Fin = false;
            animation.Sway_State++;
        }
        if (animation.Sway_State === 2) {
            animation.Delay_C = 0;
            animation.Sway_State = 0;
        }
    } else {
        animation.Delay_C++;
    }
    sprite.x = (sprite.initial_x + ((animation.Sway_X / 2 ) * animation.Animation_Speed));
};


MewglesCore.updatePulseAnimation = function(sprite, animation) {
    if (animation.Delay_C === animation.Animation_Delay) {
        if (!animation.Pulse_Fin) {
            animation.Pulse_M -= 2 * animation.Animation_Speed;
        } else {
            animation.Pulse_M += 2 * animation.Animation_Speed;
        }
        sprite.opacity = animation.Pulse_M;
        if (animation.Pulse_M >= 255) {
            animation.Pulse_Fin = false;
            animation.Delay_C = 0;
        }
        if (animation.Pulse_M < 5 && !animation.Pulse_Fin) {
            animation.Pulse_Fin = true;
        }
    } else {
        animation.Delay_C++;
    }
};


MewglesCore.updateRotationAnimation = function(sprite, animation) {
    if (animation.Delay_C === animation.Animation_Delay) {
        if (animation.Rotation_Direction === 'Clockwise') {
            sprite.angle += 0.1 * animation.Animation_Speed;
        } else {
            sprite.angle -= 0.1 * animation.Animation_Speed;
        }
        sprite.rotation = (sprite.angle * Math.PI) / 180;
    } else {
        animation.Delay_C++;
    }
};


MewglesCore.updateBoostAnimation = function(sprite, animation) {
    if (animation.Delay_C === animation.Animation_Delay) {
        if (!animation.Boost_Fin) {
            sprite.scale.x += 0.01 * animation.Animation_Speed;
            sprite.scale.y += 0.01 * animation.Animation_Speed;
        } else {
            sprite.scale.x -= 0.01 * animation.Animation_Speed;
            sprite.scale.y -= 0.01 * animation.Animation_Speed;
        }
        if (sprite.scale.x >= animation.Boost_Scale_Max) {
            animation.Boost_Fin = true;
            animation.Boost_State++;
        }
        if (sprite.scale.x <=  animation.Boost_Scale_Min && animation.Boost_Fin) {
            animation.Boost_Fin = false;
            animation.Boost_State++;
        }
        if (animation.Boost_State === 2) {
            animation.Delay_C = 0;
            animation.Boost_State = 0;
        }
    } else {
        animation.Delay_C++;
    }
};


MewglesCore.updateLinearAnimation = function(sprite, animation) {
    sprite.x += animation.Movement.X;
    sprite.y += animation.Movement.Y;
};


//Helper Functions
MewglesCore.getRGBA = function(rgba) {
    rgba.R = String(rgba.R) || 0;
    rgba.G = String(rgba.G) || 0;
    rgba.B = String(rgba.B) || 0;
    rgba.full = "rgba(" + rgba.R + "," + rgba.G + "," + rgba.B + "," + rgba.A + ")";
    return rgba.full;
};


MewglesCore.getRGBG = function(rgbg) {
    rgbg.R = Number(rgbg.R) || 0;
    rgbg.G = Number(rgbg.G) || 0;
    rgbg.B = Number(rgbg.B) || 0;
    rgbg.Gr = Number(rgbg.Gr) || 0;
    return [rgbg.R, rgbg.G, rgbg.B, rgbg.Gr];
};


MewglesCore.getFontDecoration = function(decoration, name, extra_data, plugin_name) {
    if (decoration) {
        decoration.Bold = decoration.Bold === 'ON' ? true : false;
        decoration.Italic = decoration.Italic === 'ON' ? true : false;
        decoration.Outline_Color.Full = this.getRGBA(MewglesCore.JSONParse(decoration.Outline_Color, name, extra_data, plugin_name, false));
        decoration.Outline_Width = Number(decoration.Outline_Width);
        return decoration;
    }
};


MewglesCore.getAnimation = function(animation, name, extra_data, plugin_name) {
    if (animation) {
        animation.Animation_Delay = Number(animation.Animation_Delay) || 0;
        animation.Animation_Speed = Number(animation.Animation_Speed) || 1;
        animation.Max_Movement = Number(animation.Max_Movement) || 0;
        if (animation.Movement != '') {
            animation.Movement = MewglesCore.JSONParse(animation.Movement, name, extra_data, plugin_name, false);
            animation.Movement.X = Number(animation.Movement.X);
            animation.Movement.Y = Number(animation.Movement.Y);
        }
        animation.Boost_Scale_Min = animation.Boost_Scale_Min != '' ? parseFloat(animation.Boost_Scale_Min) : 1;
        animation.Boost_Scale_Max = animation.Boost_Scale_Max != '' ? parseFloat(animation.Boost_Scale_Max) : 1;
        animation.Delay_C = 0;
        animation.Bounce_Y = 0;
        animation.Bounce_Fin = false;
        animation.Sway_X = 0;
        animation.Sway_Fin = false;
        animation.Sway_State = 0;
        animation.Pulse_M = 255;
        animation.Pulse_Fin = false;
        animation.Boost_V = 1;
        animation.Boost_Fin = false;
        animation.Boost_State = 0;
        return animation;
    }
};


MewglesCore.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
};


MewglesCore.keyTable = {
    Backspace : ['8', 'backspace'], Tab : ['9', 'tab'], Enter : ['13', 'enter'], ShiftLeft : ['16', 'shift(left)'],
    ShiftRight : ['16', 'shift(right)'], ControlLeft : ['17', 'ctrl(left)'], ControlRight : ['17', 'ctrl(rightt)'], AltLeft : ['18', 'alt(left)'],
    AltRight : ['18', 'alt(right)'], Pause : ['19', 'pause'], CapsLock : ['20', 'capslock'], Escape : ['27', 'escape'],
    Space : ['32', 'space'], PageUp : ['33', 'pageup'], PageDown : ['34', 'pagedown'], End : ['35', 'end'],
    Home : ['36', 'home'], ArrowLeft : ['37', 'leftarrow'], ArrowUp : ['38', 'uparrow'], ArrowRight : ['39', 'rightarrow'],
    ArrowDown : ['40', 'downarrow'], PrintScreen : ['44', 'printscreen'], Insert : ['45', 'insert'], Delete : ['46', 'delete'],
    Digit0 : ['48', '0'], Digit1 : ['49', '1'], Digit2 : ['50', '2'], Digit3 : ['51', '3'],
    Digit4 : ['52', '4'], Digit5 : ['53', '5'], Digit6 : ['54', '6'], Digit7 : ['55', '7'],
    Digit8 : ['56', '8'], Digit9 : ['57', '9'], KeyA : ['65', 'a'], KeyB : ['66', 'b'],
    KeyC : ['67', 'c'], KeyD : ['68', 'd'], KeyE : ['69', 'e'], KeyF : ['70', 'f'],
    KeyG : ['71', 'g'], KeyH : ['72', 'h'], KeyI : ['73', 'i'], KeyJ : ['74', 'j'],
    KeyK : ['75', 'k'], KeyL : ['76', 'l'], KeyM : ['77', 'm'], KeyN : ['78', 'n'],
    KeyO : ['79', 'o'], KeyP : ['80', 'p'], KeyQ : ['81', 'q'], KeyR : ['82', 'r'],
    KeyS : ['83', 's'], KeyT : ['84', 't'], KeyU : ['85', 'u'], KeyV : ['86', 'v'],
    KeyW : ['87', 'w'], KeyX : ['88', 'x'], KeyY : ['89', 'y'], KeyZ : ['90', 'z'],
    MetaLeft : ['91', 'leftwindowkey'], MetaRight : ['92', 'rightwindowkey'], OSLeft : ['91', 'osleftkey'], OSRight : ['92', 'osrightkey'],
    ContextMenu : ['93', 'selectkey'], Numpad0 : ['96', 'numpad0'], Numpad1 : ['97', 'numpad1'], Numpad2 : ['98', 'numpad2'],
    Numpad3 : ['99', 'numpad3'], Numpad4 : ['100', 'numpad4'], Numpad5 : ['101', 'numpad5'], Numpad6 : ['102', 'numpad6'],
    Numpad7 : ['103', 'numpad7'], Numpad8 : ['104', 'numpad8'], Numpad9 : ['105', 'numpad9'], NumpadMultiply : ['106', 'multiply'],
    NumpadAdd : ['107', 'add'], NumpadSubtract : ['109', 'subtract'], NumpadDecimal : ['110', 'decimalpoint'], NumpadDivide : ['111', 'divide'],
    F1 : ['112', 'f1'], F2 : ['113', 'f2'],
    F3 : ['114', 'f3'], F4 : ['115', 'f4'], F5 : ['116', 'f5'], F6 : ['117', 'f6'],
    F7 : ['118', 'f7'], F8 : ['119', 'f8'], F9 : ['120', 'f9'], F10 : ['121', 'f10'],
    F11 : ['122', 'f11'], F12 : ['123', 'f12'], NumLock : ['144', 'numlock'], ScrollLock : ['145', 'scrolllock'],
    Semicolon : ['186', 'semicolon'], Equal : ['187', 'equalsign'], Comma : ['188', 'comma'], Minus : ['189', 'minus'],
    Period : ['190', 'period'], Slash : ['191', 'forardslash'], Backquote : ['192', 'backquote'], BracketLeft : ['219', 'openbracket'],
    Backslash : ['220', 'backslash'], BracketRight : ['221', 'closebracket'], Quote : ['222', 'singlequote']
};


MewglesCore.pushKeyMap = function(key) {
    Input.keyMapper[key[0]] = key[1];
};


//Events
MewglesCore.parseEvents = function(events, mapid) {
    let found_events = [];
    for (i = 1; i < events.length; i++) {
        if (typeof events[i] != 'undefined') {
            if (!events[i]._erased && events[i]._pageIndex > -1) {
                let eventcodes = events[i].page().list;
                for (n = 0; n < eventcodes.length; n++) {
                    if (eventcodes[n].code === 357) {
                        found_events.push({ID: events[i]._eventId, Name: eventcodes[n].parameters[2], Command: eventcodes[n].parameters[3]});
                    }
                }
            }
        }
    }
    this.setCommands(found_events, mapid);
};


MewglesCore.setCommands = function(found_events, mapid) {
    const config = this.vars.plugin_config;
    const events = this.vars.config.map_events;
    for (i = 0; i < found_events.length; i++) {
        for (const [key, value] of Object.entries(this.vars.registered_plugins)) {
            if (config[key].functions.length > 0) {
                for (let j = 0; j < config[key].functions.length; j++) {
                    if (found_events[i].Name === config[key].functions[j][0]) {
                        const name = config[key].functions[j][1];
                        window[key][name](found_events[i], mapid);
                    }
                }
            }
        }
    }
};


MewglesCore.checkEvent = function(list) {
    if (list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].code != 357 && list[i].code != 657 && list[i].code != 0) {
                return true;
            }
        }
        return false;
    }
};


//########### Graphics changes - alias #######################################

const _MewglesCore_Graphics_requestFullscreen = Graphics._requestFullScreen;
Graphics._requestFullScreen = function() {
    _MewglesCore_Graphics_requestFullscreen.apply(this, arguments);
    MewglesCore.vars.fullscreen = true;
};

const _MewglesCore_Graphics_cancelFullScreen = Graphics._cancelFullScreen;
Graphics._cancelFullScreen = function() {
    _MewglesCore_Graphics_cancelFullScreen.apply(this, arguments)
    MewglesCore.vars.fullscreen = false;
};


//########### Game_Event changes - alias & override & custom #######################################

const _MewglesCore_Game_Event_prototype_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    _MewglesCore_Game_Event_prototype_setupPage.apply(this, arguments);
    if ($gameMap._events[this._eventId]) {
        MewglesCore.parseEvents($gameMap._events, $gameMap._mapId);
    }
};


Game_Event.prototype.start = function(remote) {
    const list = this.list();
    if (list && list.length > 1 && this.eventEnabled()) {
        this._starting = true;
        if (remote || !MewglesCore.checkEvent(list)) {
        } else if (this.isTriggerIn([0, 1, 2])) {
            this.lock();
        }
    }
};


Game_Event.prototype.eventEnabled = function() {
    if (!MewglesCore.vars.block_events) {
        return true;
    }
    if (MewglesCore.vars.block_events && this._trigger === 3) {
        return true;
    }
    if (MewglesCore.vars.block_events) {
        return false;
    }
};


//########### Scene_Base changes - alias #######################################

const _MewglesCore_Scene_Base_prototype_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    _MewglesCore_Scene_Base_prototype_update.apply(this, arguments);
    MewglesCore.updateAll();
};


//########### Scene_Boot changes - alias #######################################

const _MewglesCore_Scene_Boot_prototype_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function() {
    _MewglesCore_Scene_Boot_prototype_onDatabaseLoaded.apply(this, arguments);
    MewglesCore.run();
};


const _MewglesCore_Scene_Boot_prototype_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
    _MewglesCore_Scene_Boot_prototype_loadGameFonts.apply(this, arguments);
    if (MewglesCore.vars.font_files.length > 0 && MewglesCore.vars.font_files.length > 0) {
        for (i = 0; i < MewglesCore.vars.font_files.length; i++) {
            FontManager.load(MewglesCore.vars.font_families[i], MewglesCore.vars.font_files[i]);
        }
    }
};


//########### Scene_Title changes - alias #######################################

const _MewglesCore_Scene_Title_prototype_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    _MewglesCore_Scene_Title_prototype_start.apply(this, arguments);
    MewglesCore.vars.game_running = true;
};


//########### Scene_Map changes - alias & custom #######################################

const _MewglesCore_Scene_Map_prototype_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _MewglesCore_Scene_Map_prototype_createDisplayObjects.apply(this, arguments);
    MewglesCore.parseEvents($gameMap._events, $gameMap._mapId);
};