//=============================================================================
// RPG Maker MZ - MewglesShowNamesAndIcons
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V1.10) Allows to show the names of any event and create icons/signs
 * @author Mewgles
 * @url https://mewgles.itch.io/event-names-and-icons-mz-com
 *
 * @param ---- Global Settings ----
 * @desc Global Settings
 *
 * @param Name_Proximity
 * @text Name Proximity
 * @type number
 * @min 0
 * @default 0
 * @desc Set the proximity range of names being visible (Set in tiles. 0 = always visible)
 *
 * @param Name_Proximity_Fade
 * @text Name Proximity Fade
 * @type select
 * @option ON
 * @option OFF
 * @default ON
 * @desc Set the fade animation for name proximity display
 *
 * @param Sign_Proximity
 * @text Sign Proximity
 * @type number
 * @min 0
 * @default 0
 * @desc Set the proximity range of signs being visible (Set in tiles. 0 = always visible)
 *
 * @param Sign_Proximity_Fade
 * @text Sign Proximity Fade
 * @type select
 * @option ON
 * @option OFF
 * @default ON
 * @desc Set the fade animation for sign proximity display
 *
 * @param ---- Base Name Settings ----
 * @desc Base Name Settings
 *
 * @param Name_Font_Type
 * @text Default Font Type
 * @type text
 * @default GameFont
 * @desc Set the font type for the name display
 *
 * @param Name_Font_Size
 * @text Default Font Size
 * @type number
 * @default 20
 * @desc Set the font size for the name display
 *
 * @param Name_Font_Color
 * @text Default Font Color
 * @type text
 * @default #ffffff
 * @desc Set default hex color for the name display (HEX value)
 *
 * @param Name_Opacity
 * @text Default Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Set the default opacity of the name display (0 = invisible, 255 = maximum visibility)
 *
 * @param Max_Name_Width
 * @text Max Name Width
 * @type number
 * @min 1
 * @default 180
 * @desc Set the maximum width of the names (in px). Names will be comprimated if too long
 *
 * @param Max_Name_Height
 * @text Max Name Height
 * @type number
 * @min 1
 * @default 80
 * @desc Set the maximum height of the names (in px). Names will be comprimated if too tall
 *
 * @param Vertical_Name_Offset
 * @text Vertical Name Offset
 * @type number
 * @min -200
 * @default 0
 * @desc Set the vertical offset for the character name display (in pixel)
 *
 * @param ---- Sign Settings ----
 * @desc Settings for signs
 *
 * @param Sign_Top
 * @text Signs over Names
 * @type select
 * @option ON
 * @option OFF
 * @default ON
 * @desc Always places signs above names (Allows to go below names when disabled)
 *
 * @param Sign_Opacity
 * @text Default Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Set the default opacity of the sign display (0 = invisible, 255 = maximum visibility)
 *
 * @param Horizontal_Sign_Offset
 * @text Horizontal Sign Offset
 * @type number
 * @min -200
 * @default 0
 * @desc Set the default horizontal offset for the signs display (in pixel)
 *
 * @param Vertical_Sign_Offset
 * @text Vertical Sign Offset
 * @type number
 * @min -200
 * @default 0
 * @desc Set the default vertical offset for the signs display (in pixel)
 *
 *------------------------------------------------------------------------------
 *  ## Commands ##
 *------------------------------------------------------------------------------
 * @command Set_Event_Name_P
 * @text Set Event Name (Passive)
 * @desc Set a name to display for the event (Passive command!)
 *
 * @arg Name
 * @text Name
 * @type text
 * @desc The name for the NPC
 *
 * @arg Font_Type
 * @text Font Type
 * @type text
 * @desc Set the NPC name font type
 *
 * @arg Font_Size
 * @text Font Size
 * @type number
 * @desc Set the NPC name font size
 *
 * @arg Font_Color
 * @text Font Color
 * @type text
 * @desc Set the NPC name font color (HEX value)
 *
 * @arg Opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Set the NPC name opacity (0 = invisible, 255 = max visibility)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @desc Set the vertcal offset for the sign (in pixel)
 *
 * @arg Display_Status
 * @text Display Status
 * @type select
 * @option Display
 * @option Hide
 * @default Display
 * @desc Set the display status of the event name (Can be changed anytime)
 *
 *------------------------------------------------------------------------------
 * @command Set_Event_Sign_P
 * @text Set Event Sign (Passive)
 * @desc Set up a sign to display above the event (Passive command!)
 *
 * @arg Image
 * @text Image
 * @type file
 * @dir img/shownames_icons
 * @require 1
 * @desc Select an image from the system folder
 *
 * @arg Opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Set the sign opacity (0 = invisible, 255 = max visibility)
 *
 * @arg Animation
 * @text Animation Style
 * @type struct<AnimationStyle>
 * @desc Set an animation style for the sign
 *
 * @arg Horizontal_Offset
 * @text Horizontal Offset
 * @type number
 * @min -200
 * @desc Set the horizontal offset for the sign (in pixel)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @desc Set the vertcal offset for the sign (in pixel)
 *
 * @arg Display_Status
 * @text Display Status
 * @type select
 * @option Display
 * @option Hide
 * @default Display
 * @desc Set the display status of the sign (Can be changed anytime)
 *
 * @arg No_Proximity
 * @text No Proximity
 * @type select
 * @option ON
 * @option OFF
 * @default OFF
 * @desc Ignore proximity settings for this sign when enabled
 *
 *------------------------------------------------------------------------------
 * @command Set_Event_Name_A
 * @text Set Event Name (Active)
 * @desc Set a name to display for the event (Active command!)
 *
 * @arg Map_ID
 * @text Map ID
 * @type number
 * @min 1
 * @desc Set the ID of the map you wan to target
 *
 * @arg Event_ID
 * @text Event ID
 * @type number
 * @min 1
 * @desc Set the ID of the event you want to target
 *
 * @arg Name
 * @text Name
 * @type text
 * @desc The name for the NPC
 *
 * @arg Font_Type
 * @text Font Type
 * @type text
 * @desc Set the NPC name font type
 *
 * @arg Font_Size
 * @text Font Size
 * @type number
 * @desc Set the NPC name font size
 *
 * @arg Font_Color
 * @text Font Color
 * @type text
 * @desc Set the NPC name font color (HEX value)
 *
 * @arg Opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Set the NPC name opacity (0 = invisible, 255 = max visibility)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @desc Set the vertcal offset for the sign (in pixel)
 *
 * @arg Display_Status
 * @text Display Status
 * @type select
 * @option Display
 * @option Hide
 * @default Display
 * @desc Set the display status of the event name (Can be changed anytime)
 *
 *------------------------------------------------------------------------------
 * @command Set_Event_Sign_A
 * @text Set Event Sign (Active)
 * @desc Set up a sign to display above the event (Active command!)
 *
 * @arg Map_ID
 * @text Map ID
 * @type number
 * @min 1
 * @desc Set the ID of the map you wan to target
 *
 * @arg Event_ID
 * @text Event ID
 * @type number
 * @min 1
 * @desc Set the ID of the event you want to target
 *
 * @arg Image
 * @text Image
 * @type file
 * @dir img/shownames_icons
 * @require 1
 * @desc Select an image from the system folder
 *
 * @arg Opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Set the sign opacity (0 = invisible, 255 = max visibility)
 *
 * @arg Animation
 * @text Animation Style
 * @type struct<AnimationStyle>
 * @desc Set an animation style for the sign
 *
 * @arg Horizontal_Offset
 * @text Horizontal Offset
 * @type number
 * @min -200
 * @desc Set the horizontal offset for the sign (in pixel)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @desc Set the vertcal offset for the sign (in pixel)
 *
 * @arg Display_Status
 * @text Display Status
 * @type select
 * @option Display
 * @option Hide
 * @default Display
 * @desc Set the display status of the sign (Can be changed anytime)
 *
 * @arg No_Proximity
 * @text No Proximity
 * @type select
 * @option ON
 * @option OFF
 * @default OFF
 * @desc Ignore proximity settings for this sign when enabled
 *------------------------------------------------------------------------------
 * @command Mass_Event_Name_A
 * @text Set Mass Event Name (Active)
 * @desc Set/change the names of multiple events (Active Command!)
 *
 * @arg Map_ID
 * @text Map ID
 * @type number
 * @min 1
 * @desc Set the ID of the map you wan to target
 *
 * @arg Select_Mode
 * @text Select Mode
 * @type select
 * @option Individual Events
 * @option Range
 * @default Individual Events
 * @desc Set whether the following command will adjust a range of events or individual ones (See help section for info)
 *
 * @arg Event_ID
 * @text Event ID
 * @type number[]
 * @min 1
 * @desc Range -> Set starting ID and end ID of the events. Individual Events -> Set all IDs you want to change
 *
 * @arg Name
 * @text Name
 * @type text
 * @desc The name for the NPC
 *
 * @arg Font_Type
 * @text Font Type
 * @type text
 * @desc Set the NPC name font type
 *
 * @arg Font_Size
 * @text Font Size
 * @type number
 * @desc Set the NPC name font size
 *
 * @arg Font_Color
 * @text Font Color
 * @type text
 * @desc Set the NPC name font color (HEX value)
 *
 * @arg Opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Set the NPC name opacity (0 = invisible, 255 = max visibility)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @desc Set the vertcal offset for the sign (in pixel)
 *
 * @arg Display_Status
 * @text Display Status
 * @type select
 * @option Display
 * @option Hide
 * @default Display
 * @desc Set the display status of the event name (Can be changed anytime)
 *------------------------------------------------------------------------------
 * @command Mass_Event_Sign_A
 * @text Set Mass Event Sign (Active)
 * @desc Set/change the signs of multiple events (Active Command!)
 *
 * @arg Map_ID
 * @text Map ID
 * @type number
 * @min 1
 * @desc Set the ID of the map you wan to target
 *
 * @arg Select_Mode
 * @text Select Mode
 * @type select
 * @option Individual Events
 * @option Range
 * @default Individual Events
 * @desc Set whether the following command will adjust a range of events or individual ones (See help section for info)
 *
 * @arg Event_ID
 * @text Event ID
 * @type number[]
 * @min 1
 * @desc Set the ID of the event you want to target
 *
 * @arg Image
 * @text Image
 * @type file
 * @dir img/shownames_icons
 * @require 1
 * @desc Select an image from the system folder
 *
 * @arg Opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Set the sign opacity (0 = invisible, 255 = max visibility)
 *
 * @arg Animation
 * @text Animation Style
 * @type struct<AnimationStyle>
 * @desc Set an animation style for the sign
 *
 * @arg Horizontal_Offset
 * @text Horizontal Offset
 * @type number
 * @min -200
 * @desc Set the horizontal offset for the sign (in pixel)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @desc Set the vertcal offset for the sign (in pixel)
 *
 * @arg Display_Status
 * @text Display Status
 * @type select
 * @option Display
 * @option Hide
 * @default Display
 * @desc Set the display status of the sign (Can be changed anytime)
 *
 * @arg No_Proximity
 * @text No Proximity
 * @type select
 * @option ON
 * @option OFF
 * @default OFF
 * @desc Ignore proximity settings for this sign when enabled
 *------------------------------------------------------------------------------
 * @command Change_Proximity_A
 * @text Change Proximity (Active)
 * @desc Change the Proximity setting (Active command!)
 *
 * @arg Name_Proximity
 * @text Name Proximity
 * @type number
 * @min 0
 * @desc Set the proximity range of names being visible (Set in tiles. 0 = always visible)
 *
 * @arg Sign_Proximity
 * @text Sign Proximity
 * @type number
 * @min 0
 * @desc Set the proximity range of signs being visible (Set in tiles. 0 = always visible)
 *
 *------------------------------------------------------------------------------
 * @help
 * Mewgles Show NPC Names & Icons
 *------------------------------------------------------------------------------
 * ## Terms of Use ##
 *
 * Important!:
 * This plugin requires Mewgles Core Plugin in order to run. Please make
 * sure to have it installed and set above all Mewgles plugins in the
 * plugin manager.
 *
 * Non-commercial use:
 * This Plugin version may be used for non-commercial projects as long as you give
 * credit "Mewgles".
 *
 * Commercial use:
 * This Plugin version may be used for commercial purposes. Please ensure to credit
 * "Mewgles".
 *
 * You are not allowed to redistribute or alter my work in any way. 
 *
 *------------------------------------------------------------------------------
 * ## Important Note##
 *
 * The demo of this plugin uses a font called "Quikhand". Make sure to read its
 * terms of use in case you want to use it.
 *
 *------------------------------------------------------------------------------
 * ## Features ##
 *
 * - Display names for any event that uses a sprite
 *      - Adjust font type, size, opacity and color freely
 *      - Change event names on the fly
 *      - Adjust the x and y positions of the global name display
 * - Display icons on any event that uses a sprite
 *      - 3 different and adjustable animation types for icons
 *      - Option to exclude icons from the proximity feature
 *      - X and y position settings for each icon
 * - Remotely change icons and names, even from a different map
 * - Adjustable proximity setting for icon/name display
 * - Active and passive event commands suitable for any situation
 * - Mass change event names and signs
 *
 *------------------------------------------------------------------------------
 * ## Manual ##
 *------------------------------------------------------------------------------
 * ## Adding Fonts ##
 *
 * If you want to add fonts to the name display you can use the "Fonts" setting
 * in the core plugin. Make sure that the name is the name of the
 * file including its extention! Example: "samplefont.ttf"
 * The font name to call it will be the file name WITHOUT its extention!
 * Example: "samplefont"
 *
 * If a font is set up incorrectly or not found, the plugin will default to
 * the engine standard.
 *
 *------------------------------------------------------------------------------
 * ## Adding Icons ##
 *
 * All pictures used by this plugin are being selected from the project folder
 * img/shownames_icons. You can either create that folder on your own or simply run
 * run a testplay with the plugin enabled and it will automatically create the
 * folder in the right directory.
 * Make sure to put all pictures you want to use for your npc icons in there.
 *
 *------------------------------------------------------------------------------
 * ## General Information ##
 *
 * Using proximity settings:
 * The proximity settings can be adjusted for names and signs individually.
 * The fade is at a set animation pace and allows the names/icons to fade instead
 * of just popping up or instantly disappearing. While the name proximity is global
 * for all names, sign proximity can be disabled individually when setting up any sign.
 * This can also be adjusted by just overriding the values.
 *
 * Regarding names and signs:
 * Names and signs will only work if the event has a sprite. If the event doesn't
 * have a sprite, the display won't work. The names and sign sprites are tied
 * to the event sprite display to avoid lag.
 *
 *------------------------------------------------------------------------------
 * ## Using the Plugin Commands ##
 *
 * Active and passive commands:
 * All commands have a label to show whether they are active or passive. Active
 * commands need to be triggered by an event interaction (The trigger
 * you set in the event creation process). Passive commands get registered
 * by just sitting inside the event contents. You don't need to trigger
 * the event itself to register those.
 *
 * Caution!: Active and passive describes only the way the commands are handled.
 * Passive commands overwrite active commands. So it's not wise to mix them up
 * for one event unless you're aware of the outcome. Check the demo project to
 * see how it works.
 *
 *
 * Setting up event names:
 * To set up an event name you can either use the passive event which will
 * override the events name everytime the player moves to the respective map,
 * or with the active command which can be placed on any map and is handled
 * via regular event triggers. Please node that longer names may collide with
 * your set maximum name display width, so they may appear squeezed if you don't
 * set a proper value.
 *
 *
 * Setting up signs:
 * Generally setting up event signs works the same way as names, but there are
 * a few more settings. If you wish to set up an animation for the sign,
 * you need to fill out the whole option set in "Animation Style". Currently
 * there is three different animations:
 *    -  Bounce: Bounces the icon up and down
 *    -  Sway: Moves the icon from left to right and back
 *    -  Pulse: Makes the icon slowly disappear and reappear
 *
 * You can set the animation speed (take note that a bigger value means a
 * slower speed!), movement distance (for types 1 and 2) and a delay in frames
 * which will be used before each animation cycle. To remove the delay simply
 * set it to 0.
 *
 * Mass changing names and signs:
 * When using the mass event commands you can chose between "Individual Events"
 * and "Range" in the "Select Mode". When using "Individual Events" all event
 * IDs in the setting below will be adjusted (Example: Put 2 and 4, events 2
 * and 4 will be changed). If you use "Range" you can give start and stop
 * positions. All events between will be changed. (Example: Put 2, 4, 6 and 10.
 * Events 2 to 4 will be changed aswell as 6 to 10).
 *
 *
 * Hints:
 * Any setting that has a standard value due to the Plugin settings can be left
 * blank if you want to go by the standard value. However if the value has been
 * adjusted it overrides the standard value for that particular event and becomes
 * its new standard value.
 *
 *------------------------------------------------------------------------------
 * ## Troubleshooting ##
 *------------------------------------------------------------------------------
 * ## JSON Errors ##
 *
 * If you're receiving any JSON errors make sure to check all struct settings. This
 * plugin uses a lot of nested settings which create JSON objects in order to handle
 * the data.
 * A fully empty struct might throw an error even though there are fall back methods
 * implemented. In most cases it's enough to just open the struct once and then
 * save it if none of the settings is needed. This will generate a proper JSON
 * and the errors will be gone.
 * Please make sure to check all structs even if you don't use the corresponding
 * settings.
 *
 *------------------------------------------------------------------------------
 *  ## Minifying the Plugin ##
 *
 * If you're planning to minify this plugin, keep in mind that it is intertwined
 * with the core plugin, so you have to minify them together (still separate files!)
 * If you don't do that, you might run into issues where certain functionalities
 * do not work. Some of them you might not notice right away.
 *
 * However, I do not recommend minifying this or any other of my plugins.
 *
 *------------------------------------------------------------------------------
 * ## Class References ##
 *
 * Overrides:
 * This plugin does not override any classes/functions
 *
 * Aliases:
 * Sprite_Character.prototype.initialize -> Initializing name and icons prites
 *
 * Sprite_Character.prototpye.update -> Updates for name and sign display
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
 * June 6, 2021
 * V 1.10
 * - Fixed a bug that didn't apply default name settings
 * - Fixed a bug that might crash the game when a map got deleted
 * - Enabled core plugin support. Mewgles Core is now required to run this plugin
 * - Names can now have a unique vertical offset for each event
 * - Moved the fonts setup to the core plugin.
 * - Moved the icon location into the img/shownames_icons folder to avoid inflating
 *   the img/system folder too much. Please make sure to move your icon files
 *   to the new folder after the update.
 * - Added a function to mass change event names and signs
 *
 * April 27, 2021
 * V 1.02
 * - Fixed a bug that crashed the game when an event used a self switch on the
 *   first page
 *
 * April 9, 2021
 * V 1.01
 * - Fixed a bug that crashed the game when an event id was missing on the map
 * - Minor code optimization
 *------------------------------------------------------------------------------
 */


//Structures
/*~struct~AnimationStyle:
 * @param Animation_Type
 * @text Animation Type
 * @type select
 * @option OFF
 * @option Bounce
 * @option Sway
 * @option Pulse
 * @default OFF
 * @desc Set the animation Type
 *
 * @param Max_Movement
 * @text Max Movement
 * @type number
 * @min 1
 * @default 5
 * @desc Set the maximal movement in pixel (Only for Bounce and Sway)
 *
 * @param Speed
 * @text Animation Speed
 * @type number
 * @min 1
 * @default 1
 * @desc Set the animation speed (Reversed! Higher = slower!)
 *
 * @param Delay
 * @text Animation Delay
 * @type number
 * @min 0
 * @default 0
 * @desc Set the animation delay before each cycle (In frames)
 */


function MewglesShowNames() {
    this.initialize(...arguments);
};


//Variables
MewglesShowNames.pluginName = "MewglesShowNames";
MewglesShowNames.version = 1.10;
MewglesShowNames.build = "A";


MewglesShowNames.errorHandlers = {
    Animation : 'MewglesShowNames: Sign Animation setting is missing in event',
    Event_ID_Name : 'MewglesShowNames: Event IDs are missing on mass change for map',
    Folder_Path: 'MewglesShowNames: Warning! could not find or create shownames_icons folder in /img/!',
};


MewglesShowNames.getParams = function() {
    MewglesShowNames.params = PluginManager.parameters("MewglesShowNames");
    MewglesShowNames.vars = {
        core : false,
        icon_folder_path : './img/shownames_icons',
        plugin_data : {
            version : this.version,
            array_names : ['registered_event_names', 'registered_event_signs'],
            array_modes : ['event', 'event'],
            array_structures : [{Name : '', Font: '', FontSize : 20, Color : '#ffffff', Opacity : 255, VerticalOffset : 0, Display : false}, {Image : '', Opacity: 255, AnimationType : 'OFF', AnimationState : {DelayC : 0, BounceY : 0, BounceFin : false, SwayX : 0, SwayFin : false, SwayState : 0, PulseM : 255, PulseFin : false},AnimationMovement: 5, AnimationSpeed : 1, Delay : 0, HorizontalOffset : 0, VerticalOffset : 0, Display : false, NoProximity : 'OFF'}],
            functions : [['Set Event Name (Passive)', 'setEventNames'], ['Set Event Sign (Passive)', 'setEventSigns'],],
        },

        //Global Settings
        name_proximity : Number(this.params['Name_Proximity'] || 0),
        name_proximity_fade : (this.params ['Name_Proximity_Fade'] === 'ON') ? true : false,
        sign_proximity : Number(this.params['Sign_Proximity'] || 0),
        sign_proximity_fade : (this.params['Sign_Proximity_Fade'] === 'ON') ? true : false,

        //Base Name Settings
        name_font_size : Number(this.params['Name_Font_Size'] || 20),
        name_font_type : String(this.params['Name_Font_Type'] || 'GameFont'),
        name_font_color : String(this.params['Name_Font_Color'] || '#ffffff'),
        name_opacity : Number(this.params['Name_Opacity'] || 255),
        max_name_width : Number(this.params['Max_Name_Width'] || 180),
        max_name_height : Number(this.params['Max_Name_Height'] || 80),
        vertical_name_offset : Number(this.params['Vertical_Name_Offset'] || 0),

        //Sign Settings
        sign_top : (this.params['Sign_Top'] === 'ON') ? true : false,
        sign_opacity : Number(this.params['Sign_Opacity'] || 255),
        horizontal_sign_offset : Number(this.params['Horizontal_Sign_Offset'] || 0),
        vertical_sign_offset : Number(this.params['Vertical_Sign_Offset'] || 0),
    };
};


MewglesShowNames.checkCore = function() {
    for (let i = 0; i < PluginManager._scripts.length; i++) {
        if (PluginManager._scripts[i].startsWith('MewglesCore')) {
            if (MewglesCore.version >= 0.5) {
                this.vars.core = true;
            } else {
                alert("MewglesShowNames: MewglesCore found, but version does not match. Please install the latest version of the core.");
                console.log("MewglesShowNames: MewglesCore found, but version does not match. Please install the latest version of the core.");
            }
        }
    }
    if (!this.vars.core) {
        alert("MewglesShowNames: MewglesCore not found. Please install the core plugin in order to use MewglesShowNames.");
        console.log("MewglesShowNames: MewglesCore not found. Please install the core plugin in order to use MewglesShowNames.");
    }
};


MewglesShowNames.pushData = function() {
    MewglesCore.vars.plugin_config[this.pluginName] = this.vars.plugin_data;
};


MewglesShowNames.checkDir = function() {
    MewglesCore.setDir(this.vars.icon_folder_path, this.errorHandlers.Folder_Path);
};


MewglesShowNames.getParams();
MewglesShowNames.checkCore();
MewglesShowNames.checkDir();


//Internal Functions
MewglesShowNames.setEventNames = function(event, mapid) {
    const commands = event.Command;
    const id = Number(event.ID) - 1;
    if (commands) {
        if (commands.Name != '') {
            MewglesCore.vars.registered_event_names[mapid][id].Name = commands.Name;
        }
        if (commands.Font_Type) {
            MewglesCore.vars.registered_event_names[mapid][id].Font = commands.Font_Type;
        }
        if (commands.Font_Size) {
            MewglesCore.vars.registered_event_names[mapid][id].FontSize = Number(commands.Font_Size);
        }
        if (commands.Font_Color) {
            MewglesCore.vars.registered_event_names[mapid][id].Color = commands.Font_Color;
        }
        if (commands.Opacity) {
            MewglesCore.vars.registered_event_names[mapid][id].Opacity = Number(commands.Opacity);
        }
        if (commands.Vertical_Offset) {
            MewglesCore.vars.registered_event_names[mapid][id].VerticalOffset = Number(commands.Vertical_Offset);
        }
        if (commands.Display_Status === 'Display') {
            MewglesCore.vars.registered_event_names[mapid][id].Display = true;
        }
        if (commands.Display_Status === 'Hide') {
            MewglesCore.vars.registered_event_names[mapid][id].Display = false;
        }
    }

};


MewglesShowNames.setMassEventAction = function(events, mapid, func) {
    const commands = events.Command;
    if (commands.Select_Mode === 'Range') {
        let start = [];
        let stop = [];
        for (let i = 0; i < events.ID.length; i++) {
            if (i % 2 == 1) {
                stop.push(Number(events.ID[i]));
            } else {

                start.push(Number(events.ID[i]));
            }
        }
        try {
            for (let i = 0; i < start.length; i++) {
                for (let n = start[i]; n <= stop[i]; n++) {
                    const event = {ID : n, Command : commands};
                    this[func](event, mapid);
                }
            }
        } catch (e) {
            if (MewglesCore.vars.base_mode) {
                alert('MewglesShowNames: Could not execute change action. Please make sure all events you want to change exist.');
                console.log('MewglesShowNames: Could not execute change action. Please make sure all events you want to change exist.');
                console.log(e);
            }
        }

    }
    if (commands.Select_Mode === 'Individual Events') {
        for (let i = 0; i < events.ID.length; i++) {
            const event = {ID : Number(events.ID[i]), Command : commands};
            this[func](event, mapid);
        }
    }
};


MewglesShowNames.setEventSigns = function(event, mapid) {
    const commands = event.Command;
    const id = Number(event.ID) - 1;
    if (commands.Image) {
        MewglesCore.vars.registered_event_signs[mapid][id].Image = commands.Image;
    }
    if (commands.Opacity) {
        MewglesCore.vars.registered_event_signs[mapid][id].Opacity = Number(commands.Opacity);
        MewglesCore.vars.registered_event_signs[mapid][id].AnimationState.PulseM = Number(commands.Opacity);
    }
    if (commands.Animation) {
        const animation = MewglesCore.JSONParse(commands.Animation, 'Animation', String(event.ID), this.pluginName, false);
        if (animation.Delay) {
            MewglesCore.vars.registered_event_signs[mapid][id].Delay = Number(animation.Delay);
        }
        if (animation.Animation_Type) {
            MewglesCore.vars.registered_event_signs[mapid][id].AnimationType = animation.Animation_Type;
        }
        if (animation.Max_Movement) {
            MewglesCore.vars.registered_event_signs[mapid][id].AnimationMovement = Number(animation.Max_Movement);
        }
        if (animation.Speed) {
            MewglesCore.vars.registered_event_signs[mapid][id].AnimationSpeed = Number(animation.Speed);
        }
    }
    if (commands.Horizontal_Offset) {
        MewglesCore.vars.registered_event_signs[mapid][id].HorizontalOffset = Number(commands.Horizontal_Offset);
    }
    if (commands.Vertical_Offset) {
        MewglesCore.vars.registered_event_signs[mapid][id].VerticalOffset = Number(commands.Vertical_Offset);
    }
    if (commands.Display_Status === 'Display') {
        MewglesCore.vars.registered_event_signs[mapid][id].Display = true;
    }
    if (commands.Display_Status === 'Hide') {
        MewglesCore.vars.registered_event_signs[mapid][id].Display = false;
    }
    if (commands.No_Proximity) {
        MewglesCore.vars.registered_event_signs[mapid][id].NoProximity = commands.No_Proximity;
    }
};


MewglesShowNames.updateAnimation = function(sprite, event_id, name) {
    this._vars = MewglesCore.vars.registered_event_signs[$gameMap._mapId][event_id - 1];
    this._nvars = MewglesCore.vars.registered_event_names[$gameMap._mapId][event_id - 1];
    this._sprite = sprite;
    if (name) {
        this._name = name;
    }
    if (this._vars && this._nvars) {
        switch (this._vars.AnimationType) {
            case 'Bounce':
                this.updateBounceAnimation(this._vars, this._nvars);
                break;
            case 'Sway':
                this.updateSwayAnimation(this._vars, this._nvars);
                break;
            case 'Pulse':
                this.updatePulseAnimation(this._vars, this._nvars);
                break;
            default:
                break;
        }
    }
};


MewglesShowNames.updateBounceAnimation = function(vars, nvars) {
    this._vars = vars;
    this._sprite.x = this._vars.HorizontalOffset || this.vars.horizontal_sign_offset;
    if (this._vars.AnimationState.DelayC === this._vars.Delay) {
        if (this._vars.AnimationState.BounceFin === false) {
            this._vars.AnimationState.BounceY++;
        } else {
            this._vars.AnimationState.BounceY--;
        }
        if (this._vars.AnimationState.BounceY === this._vars.AnimationMovement) {
            this._vars.AnimationState.BounceFin = true;
        }
        if (this._vars.AnimationState.BounceY  === 0 && this._vars.AnimationState.BounceFin === true) {
            this._vars.AnimationState.BounceFin = false;
            this._vars.AnimationState.DelayC = 0;
        }
    } else {
        this._vars.AnimationState.DelayC++;
    }
    if (this._name && this._name.visible && this.vars.sign_top) {
        this._sprite.y = -((nvars.VerticalOffset || this.vars.vertical_name_offset) + 56 + (this._vars.VerticalOffset || this.vars.vertical_sign_offset) + this._name.bitmap.fontSize + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    } else {
        this._sprite.y = -((this._vars.VerticalOffset || this.vars.vertical_sign_offset) + 56 + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    }
};


MewglesShowNames.updateSwayAnimation = function(vars, nvars) {
    this._vars = vars;
    if (this._vars.AnimationState.DelayC === this._vars.Delay) {
        if (this._vars.AnimationState.SwayFin === false) {
            this._vars.AnimationState.SwayX++;
        } else {
            this._vars.AnimationState.SwayX--;
        }
        if (this._vars.AnimationState.SwayX === this._vars.AnimationMovement) {
            this._vars.AnimationState.SwayFin = true;
            this._vars.AnimationState.SwayState++;
        }
        if (this._vars.AnimationState.SwayX === -(this._vars.AnimationMovement) && this._vars.AnimationState.SwayFin === true) {
            this._vars.AnimationState.SwayFin = false;
            this._vars.AnimationState.SwayState++;
        }
        if (this._sprite.x === (this._vars.HorizontalOffset || this.vars.horizontal_sign_offset) && this._vars.AnimationState.SwayState === 2) {
            this._vars.AnimationState.DelayC = 0;
            this._vars.AnimationState.SwayState = 0;
        }
    } else {
        this._vars.AnimationState.DelayC++;
    }
    this._sprite.x = (this._vars.HorizontalOffset || this.vars.horizontal_sign_offset) + (this._vars.AnimationState.SwayX / this._vars.AnimationSpeed);
    if (this._name && this._name.visible && this.vars.sign_top) {
        this._sprite.y = -((nvars.VerticalOffset || this.vars.vertical_name_offset) + 56 + (this._vars.VerticalOffset || this.vars.vertical_sign_offset) + this._name.bitmap.fontSize + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    } else {
        this._sprite.y = -((this._vars.VerticalOffset || this.vars.vertical_sign_offset) + 56 + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    }
};


MewglesShowNames.updatePulseAnimation = function(vars, nvars) {
    this._vars = vars;
    this._sprite.x = this._vars.HorizontalOffset || this.vars.horizontal_sign_offset;
    if (this._vars.AnimationState.DelayC === this._vars.Delay) {
        if (this._vars.AnimationState.PulseFin === false) {
            this._vars.AnimationState.PulseM -= 20 / this._vars.AnimationSpeed;
        } else {
            this._vars.AnimationState.PulseM += 20 / this._vars.AnimationSpeed;
        }
        this._sprite.opacity = this._vars.AnimationState.PulseM;
        if (this._vars.AnimationState.PulseM >= this._vars.Opacity) {
            this._vars.AnimationState.PulseFin  = false;
            this._vars.AnimationState.DelayC = 0;
        }
        if ((this._vars.AnimationState.PulseM < 20 ) && this._vars.AnimationState.PulseFin === false) {
            this._vars.AnimationState.PulseFin = true;
        }
    } else {
        this._vars.AnimationState.DelayC++;
    }
    if (this._name && this._name.visible && this.vars.sign_top) {
        this._sprite.y = -((nvars.VerticalOffset || this.vars.vertical_name_offset) + 56 + (this._vars.VerticalOffset || this.vars.vertical_sign_offset) + this._name.bitmap.fontSize);
    } else {
        this._sprite.y = -((this._vars.VerticalOffset || this.vars.vertical_sign_offset) + 56);
    }
};


//########### Commands #######################################

PluginManager.registerCommand(MewglesShowNames.pluginName, 'Set_Event_Name_A', args => {
    const event = {ID : Number(args.Event_ID), Command : args};
    const mapid = Number(args.Map_ID);
    MewglesShowNames.setEventNames(event, mapid);
});


PluginManager.registerCommand(MewglesShowNames.pluginName, 'Set_Event_Sign_A', args => {
    const event = {ID : Number(args.Event_ID), Command : args};
    const mapid = Number(args.Map_ID);
    MewglesShowNames.setEventSigns(event, mapid);
});


PluginManager.registerCommand(MewglesShowNames.pluginName, 'Mass_Event_Name_A', args => {
    const events = {ID : MewglesCore.JSONParse(args.Event_ID, 'Event_ID_Name', String(args.Map_ID), MewglesShowNames.pluginName, false), Command : args};
    const mapid = Number(args.Map_ID);
    MewglesShowNames.setMassEventAction(events, mapid, 'setEventNames');
});


PluginManager.registerCommand(MewglesShowNames.pluginName, 'Mass_Event_Sign_A', args => {
    const events = {ID : MewglesCore.JSONParse(args.Event_ID, 'Event_ID_Name', String(args.Map_ID), MewglesShowNames.pluginName, false), Command : args};
    const mapid = Number(args.Map_ID);
    MewglesShowNames.setMassEventAction(events, mapid, 'setEventSigns');
});


PluginManager.registerCommand(MewglesShowNames.pluginName, 'Change_Proximity_A', args => {
    if (args.Name_Proximity != '') {
        MewglesShowNames.vars.name_proximity = Number(args.Name_Proximity);
    }
    if (args.Sign_Proximity != '') {
        MewglesShowNames.vars.sign_proximity = Number(args.Sign_Proximity);
    }
});


//########### Sprite_Character changes - alias & custom #######################################

const _MewglesSN_Sprite_Character_prototype_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    _MewglesSN_Sprite_Character_prototype_initialize.apply(this, arguments);
    if (this._character instanceof Game_Follower === false && this._character instanceof Game_Player === false) {
        this.createMewglesSNName();
        this.createMewglesSNSign();
    }
};


const _MewglesSN_Sprite_Character_prototype_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    _MewglesSN_Sprite_Character_prototype_update.apply(this, arguments);
    if (this._character instanceof Game_Follower === false && this._character instanceof Game_Player === false) {
        this.updateMewglesSNNPCName();
        this.updateMewglesSNSign();
        if (this._spriteMewglesSNSign) {
            MewglesShowNames.updateAnimation(this._spriteMewglesSNSign, this._character._eventId, this._spriteMewglesSNName ? this._spriteMewglesSNName : null);
        }
    }
};


Sprite_Character.prototype.createMewglesSNName = function() {
    if (this._character) {
        this._spriteMewglesSNName = new Sprite();
        this._spriteMewglesSNName.bitmap = new Bitmap(MewglesShowNames.vars.max_name_width, MewglesShowNames.vars.max_name_height);
        this._spriteMewglesSNName.x = -(MewglesShowNames.vars.max_name_width / 2);
        if (MewglesShowNames.vars.name_proximity_fade) {
            this._spriteMewglesSNName.opacity = 0;
        }
        this.addChild(this._spriteMewglesSNName);
    }
};


Sprite_Character.prototype.createMewglesSNSign = function() {
    if (this._character) {
        this._spriteMewglesSNSign = new Sprite();
        this._spriteMewglesSNSign.bitmap = new Bitmap();
        if (MewglesShowNames.vars.sign_proximity_fade) {
            this._spriteMewglesSNSign.opacity = 0;
        }
        this.addChild(this._spriteMewglesSNSign);
    }
};


Sprite_Character.prototype.updateMewglesSNNPCName = function() {
    const settings = MewglesCore.vars.registered_event_names[$gameMap._mapId][this._character._eventId - 1];
    if ($gameMap._events[this._character._eventId] && settings) {
        this._sprite = this._spriteMewglesSNName;
        this._sprite.y = -Math.abs((settings.VerticalOffset || MewglesShowNames.vars.vertical_name_offset) + 56 + settings.FontSize);
        this._sprite.bitmap.clearRect(0, 0, MewglesShowNames.vars.max_name_width, MewglesShowNames.vars.max_name_height);
        this._sprite.bitmap.fontFace = settings.Font != '' ? settings.Font : MewglesShowNames.vars.name_font_type;
        this._sprite.bitmap.fontSize = settings.FontSize > 0 ? settings.FontSize : MewglesShowNames.vars.name_font_size;
        this._sprite.bitmap.textColor = settings.Color != '' ? settings.Color : MewglesShowNames.vars.name_font_color;
        this._sprite.bitmap.drawText(settings.Name, 0, 0, MewglesShowNames.vars.max_name_width, 38, 'center');
        this.updateMewglesSNNPCNameProximity(settings);
    }
};


Sprite_Character.prototype.updateMewglesSNNPCNameProximity = function(settings) {
    if (MewglesShowNames.vars.name_proximity > 0) {
        const x_dist = Math.abs(this._character._x - $gamePlayer.x);
        const y_dist = Math.abs(this._character._y - $gamePlayer.y);
        if (x_dist <= MewglesShowNames.vars.name_proximity && y_dist <= MewglesShowNames.vars.name_proximity) {
            this._sprite.visible = settings.Display;
            if (this._sprite.opacity < settings.Opacity && MewglesShowNames.vars.name_proximity_fade) {
                this._sprite.opacity += 10;
            }
        } else {
            if (this._sprite.opacity >= 10 && MewglesShowNames.vars.name_proximity_fade) {
                this._sprite.opacity -= 10;
            } else {
                this._sprite.visible = false;
            }
        }
    } else {
        this._sprite.opacity = settings.Opacity;
        this._sprite.visible = settings.Display;
    }
};


Sprite_Character.prototype.updateMewglesSNSign = function() {
    const settings = MewglesCore.vars.registered_event_signs[$gameMap._mapId][this._character._eventId - 1];
    const name_settings = MewglesCore.vars.registered_event_names[$gameMap._mapId][this._character._eventId - 1];
    if ($gameMap._events[this._character._eventId] && settings) {
        this._sprite = this._spriteMewglesSNSign;
        if (settings.AnimationType === 'OFF' || settings.AnimationType === '') {
            this._sprite.x = settings.HorizontalOffset || MewglesShowNames.vars.horizontal_sign_offset;
            if (this._spriteMewglesSNName.visible && MewglesShowNames.vars.sign_top) {
                this._sprite.y = -((name_settings.VerticalOffset || MewglesShowNames.vars.vertical_name_offset) + 56 + (settings.VerticalOffset || MewglesShowNames.vars.vertical_sign_offset) + this._spriteMewglesSNName.bitmap.fontSize);
            } else {
                this._sprite.y = -((settings.VerticalOffset || MewglesShowNames.vars.vertical_sign_offset) + 56);
            }
        }
        if (this._sprite.bitmap._url === '' || this._sprite.bitmap._url.includes(settings.Image) === false) {
            this._sprite.bitmap = ImageManager.loadBitmap('img/shownames_icons/', settings.Image);
        }
        this.updateMewglesSNSignProximity(settings);
    }
};


Sprite_Character.prototype.updateMewglesSNSignProximity = function(settings) {
    if (MewglesShowNames.vars.sign_proximity > 0 && settings.NoProximity === 'OFF') {
        const x_dist = Math.abs(this._character._x - $gamePlayer.x);
        const y_dist = Math.abs(this._character._y - $gamePlayer.y);
        if (x_dist <= MewglesShowNames.vars.sign_proximity && y_dist <= MewglesShowNames.vars.sign_proximity) {
            this._sprite.visible = settings.Display;
            if (this._sprite.opacity < settings.Opacity && MewglesShowNames.vars.sign_proximity_fade) {
                this._sprite.opacity += 10;
            }
        } else {
            if (this._sprite.opacity >= 10 && MewglesShowNames.vars.sign_proximity_fade) {
                this._sprite.opacity -= 10;
            } else {
                this._sprite.visible = false;
            }
            if (settings.AnimationType === 'Pulse') {
                this._sprite.visible = false;
            }
        }
    } else {
        if (settings.AnimationType !== 'Pulse') {
            this._sprite.opacity = settings.Opacity;
        }
        this._sprite.visible = settings.Display;
    }
};