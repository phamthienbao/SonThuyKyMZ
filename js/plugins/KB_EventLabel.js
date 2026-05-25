//=============================================================================
// RPG Maker MZ - KB_EventLabel
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (V1.0.5) Allows to show the names and icons/signs above any event. Displays Event Names by default. (Standalone)
 * @author KB (Adapted from MewglesShowNames)
 * @url 
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
 * ## Commands (Passive) ##
 *------------------------------------------------------------------------------
 * @command Configure Name (Passive)
 * @text Configure Name (Passive)
 * @desc Set a name to display for the event (Passive command - runs on page load!)
 *
 * @arg Name_Content
 * @text Name Content
 * @type text
 * @desc The name for the NPC. Leave blank to clear the label.
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
 * @command Configure Sign (Passive)
 * @text Configure Sign (Passive)
 * @desc Set up a sign to display above the event (Passive command - runs on page load!)
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
 * ## Commands (Active) ##
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
 *
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
 *
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
 * @default 0
 * @desc Set the horizontal offset for the sign (in pixel)
 *
 * @arg Vertical_Offset
 * @text Vertical Offset
 * @type number
 * @min -200
 * @default 0
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
 * KB Event Label (Names & Icons)
 *------------------------------------------------------------------------------
 * ## Terms of Use ##
 *
 * This plugin is an adaptation of MewglesShowNames, modified to run as a
 * standalone plugin.
 *
 * Non-commercial use:
 * This Plugin may be used for non-commercial projects as long as you give
 * credit to "KB" and "Mewgles".
 *
 * Commercial use:
 * This Plugin may be used for commercial projects as long as you give credit
 * to "KB" and "Mewgles".
 *
 * You are not allowed to redistribute or alter this work without permission.
 *
 *------------------------------------------------------------------------------
 * ## Features ##
 *
 * - **Automatic Labeling**: Automatically uses the event's name from the 
 * database as the displayed label if no plugin command sets a custom name.
 * - Display names for any event that uses a sprite
 * - Display icons/signs on any event that uses a sprite
 * - Active and passive event commands suitable for any situation
 * - Remotely change icons and names, even from a different map
 * - Adjustable proximity setting for icon/name display
 * - Mass change event names and signs
 *
 *------------------------------------------------------------------------------
 * ## Passive Commands ##
 *
 * Passive commands are registered merely by being present in an event page's
 * content list. They are read every time the event page is loaded and
 * override any active settings.
 *
 * The commands are:
 * - Configure Name (Passive)
 * - Configure Sign (Passive)
 *
 * **QUAN TRỌNG VỀ GHI ĐÈ TÊN**: Lệnh Passive Command luôn có ưu tiên cao nhất 
 * đối với tên. Nếu bạn để trống trường "Name Content" trong lệnh Passive, 
 * plugin sẽ ghi đè tên hiện tại bằng chuỗi rỗng và label sẽ bị ẩn.
 *
 *------------------------------------------------------------------------------
 */


// Structures
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


function KB_EventLabel() {
    this.initialize(...arguments);
};


// Variables
KB_EventLabel.pluginName = "KB_EventLabel";
KB_EventLabel.version = 1.05;


// --- DATA STRUCTURES (Replacing MewglesCore.vars.*) ---
// SỬA: Đặt Name mặc định là Token để kiểm tra sự ghi đè của Command
const KB_DEFAULT_NAME_TOKEN = 'KB_DEFAULT_NAME_TOKEN';

KB_EventLabel.vars = {
    // Registered Data (MapID -> EventID -> Data Object)
    registeredEventNames: {}, 
    registeredEventSigns: {},

    // Fallback/Default Structures
    NameStructure: {Name : KB_DEFAULT_NAME_TOKEN, Font: '', FontSize : 20, Color : '#ffffff', Opacity : 255, VerticalOffset : 0, Display : true},
    SignStructure: {Image : '', Opacity: 255, AnimationType : 'OFF', AnimationState : {DelayC : 0, BounceY : 0, BounceFin : false, SwayX : 0, SwayFin : false, SwayState : 0, PulseM : 255, PulseFin : false}, AnimationMovement: 5, AnimationSpeed : 1, Delay : 0, HorizontalOffset : 0, VerticalOffset : 0, Display : false, NoProximity : 'OFF'}
};


KB_EventLabel.errorHandlers = {
    JSON : 'KB_EventLabel: JSON ERROR found. Please check the console for further info (F12)',
    Event_ID_Name : 'KB_EventLabel: Event IDs are missing on mass change for map',
};


// --- UTILITIES (Replacing MewglesCore utilities) ---
KB_EventLabel.safeJSONParse = function(json, name, extra_data) {
    if (json != '') {
        try {
            return JSON.parse(json);
        } catch (e) {
            alert(KB_EventLabel.errorHandlers.JSON + ` (Plugin: ${KB_EventLabel.pluginName}, Command: ${name}, Data: ${extra_data})`);
            console.error(KB_EventLabel.errorHandlers.JSON, e);
        }
    }
    return {};
};


KB_EventLabel.getParams = function() {
    KB_EventLabel.params = PluginManager.parameters("KB_EventLabel");
    KB_EventLabel.globalVars = {
        //Global Settings
        name_proximity : Number(KB_EventLabel.params['Name_Proximity'] || 0),
        name_proximity_fade : (KB_EventLabel.params['Name_Proximity_Fade'] === 'ON'),
        sign_proximity : Number(KB_EventLabel.params['Sign_Proximity'] || 0),
        sign_proximity_fade : (KB_EventLabel.params['Sign_Proximity_Fade'] === 'ON'),

        //Base Name Settings
        name_font_size : Number(KB_EventLabel.params['Name_Font_Size'] || 20),
        name_font_type : String(KB_EventLabel.params['Name_Font_Type'] || 'GameFont'),
        name_font_color : String(KB_EventLabel.params['Name_Font_Color'] || '#ffffff'),
        name_opacity : Number(KB_EventLabel.params['Name_Opacity'] || 255),
        max_name_width : Number(KB_EventLabel.params['Max_Name_Width'] || 180),
        max_name_height : Number(KB_EventLabel.params['Max_Name_Height'] || 80),
        vertical_name_offset : Number(KB_EventLabel.params['Vertical_Name_Offset'] || 0),

        //Sign Settings
        sign_top : (KB_EventLabel.params['Sign_Top'] === 'ON'),
        sign_opacity : Number(KB_EventLabel.params['Sign_Opacity'] || 255),
        horizontal_sign_offset : Number(KB_EventLabel.params['Horizontal_Sign_Offset'] || 0),
        vertical_sign_offset : Number(KB_EventLabel.params['Vertical_Sign_Offset'] || 0),
    };
};


// --- DATA INITIALIZATION (Local replacement for Core's data structure builder) ---
KB_EventLabel.initEventData = function(mapid, eventid) {
    // Map Name Data Init
    if (!KB_EventLabel.vars.registeredEventNames[mapid]) {
        KB_EventLabel.vars.registeredEventNames[mapid] = [];
    }
    if (!KB_EventLabel.vars.registeredEventNames[mapid][eventid - 1]) {
        // Use a deep copy of the structure object
        KB_EventLabel.vars.registeredEventNames[mapid][eventid - 1] = JSON.parse(JSON.stringify(KB_EventLabel.vars.NameStructure));
    }

    // Map Sign Data Init
    if (!KB_EventLabel.vars.registeredEventSigns[mapid]) {
        KB_EventLabel.vars.registeredEventSigns[mapid] = [];
    }
    if (!KB_EventLabel.vars.registeredEventSigns[mapid][eventid - 1]) {
        // Use a deep copy of the structure object
        KB_EventLabel.vars.registeredEventSigns[mapid][eventid - 1] = JSON.parse(JSON.stringify(KB_EventLabel.vars.SignStructure));
    }
};


// --- PASSIVE COMMAND PROCESSING (Replacing Core's event parsing loop) ---

// Alias Game_Map.prototype.setup để reset dữ liệu tên và dấu hiệu khi Map tải
const _KBEL_Game_Map_prototype_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _KBEL_Game_Map_prototype_setup.apply(this, arguments);
    
    // Reset dữ liệu cho Map ID hiện tại khi Map tải
    KB_EventLabel.vars.registeredEventNames[mapId] = [];
    KB_EventLabel.vars.registeredEventSigns[mapId] = [];
};


// Alias Game_Event.prototype.setupPage để quét Passive Commands
const _KBEL_Game_Event_prototype_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    _KBEL_Game_Event_prototype_setupPage.apply(this, arguments);

    // Only proceed if the event page is valid and on a map
    if (this.page() && $gameMap && $gameMap.mapId()) {
        KB_EventLabel.scanEventPageForPassiveCommands(this);
    }
};


KB_EventLabel.scanEventPageForPassiveCommands = function(gameEvent) {
    const list = gameEvent.list();
    const mapid = $gameMap.mapId();
    const eventid = gameEvent._eventId;

    for (const command of list) {
        if (command.code === 357) { // Plugin Command
            const pluginName = command.parameters[2];
            const commandName = command.parameters[3];
            const args = command.parameters[4];
            
            // Check if the command is for this plugin
            if (pluginName === KB_EventLabel.pluginName) {
                // Initialize the data structure first
                KB_EventLabel.initEventData(mapid, eventid);

                const eventData = { ID: eventid, Command: args };
                
                if (commandName === 'Configure Name (Passive)') {
                    // Lệnh Passive command gửi Name_Content, ta alias nó thành Name cho hàm setEventNames
                    if (eventData.Command.Name_Content !== undefined) {
                        eventData.Command.Name = eventData.Command.Name_Content; 
                    }
                    KB_EventLabel.setEventNames(eventData, mapid);
                } else if (commandName === 'Configure Sign (Passive)') {
                    KB_EventLabel.setEventSigns(eventData, mapid);
                }
            }
        }
    }
};


// --- INTERNAL FUNCTIONS (Modified to use local data) ---

KB_EventLabel.setEventNames = function(event, mapid) {
    const commands = event.Command;
    const id = Number(event.ID) - 1;
    KB_EventLabel.initEventData(mapid, event.ID); // Ensure data is initialized

    const eventNameData = KB_EventLabel.vars.registeredEventNames[mapid][id];

    if (commands) {
        // Sửa đổi: Kiểm tra !== undefined để chấp nhận cả chuỗi rỗng khi ghi đè bằng lệnh
        if (commands.Name !== undefined) { 
            eventNameData.Name = commands.Name;
        }
        
        // Cập nhật các thuộc tính khác
        if (commands.Font_Type) {
            eventNameData.Font = commands.Font_Type;
        }
        if (commands.Font_Size) {
            eventNameData.FontSize = Number(commands.Font_Size);
        }
        if (commands.Font_Color) {
            eventNameData.Color = commands.Font_Color;
        }
        if (commands.Opacity) {
            eventNameData.Opacity = Number(commands.Opacity);
        }
        if (commands.Vertical_Offset) {
            eventNameData.VerticalOffset = Number(commands.Vertical_Offset);
        }
        if (commands.Display_Status === 'Display') {
            eventNameData.Display = true;
        } else if (commands.Display_Status === 'Hide') { // Sử dụng else if để bao quát
            eventNameData.Display = false;
        }
    }
};


KB_EventLabel.setMassEventAction = function(events, mapid, func) {
    const commands = events.Command;
    const eventIDs = KB_EventLabel.safeJSONParse(events.ID, 'Event_ID_Name', String(mapid));

    if (commands.Select_Mode === 'Range') {
        let ranges = [];
        for (let i = 0; i < eventIDs.length; i += 2) {
            if (eventIDs[i] !== undefined && eventIDs[i+1] !== undefined) {
                ranges.push({start: Number(eventIDs[i]), end: Number(eventIDs[i+1])});
            }
        }
        try {
            for (const range of ranges) {
                for (let n = range.start; n <= range.end; n++) {
                    const event = {ID : n, Command : commands};
                    this[func](event, mapid);
                }
            }
        } catch (e) {
            console.log('KB_EventLabel: Could not execute mass change action.', e);
        }

    }
    if (commands.Select_Mode === 'Individual Events') {
        for (let i = 0; i < eventIDs.length; i++) {
            const event = {ID : Number(eventIDs[i]), Command : commands};
            this[func](event, mapid);
        }
    }
};


KB_EventLabel.setEventSigns = function(event, mapid) {
    const commands = event.Command;
    const id = Number(event.ID) - 1;
    KB_EventLabel.initEventData(mapid, event.ID); // Ensure data is initialized

    const eventSignData = KB_EventLabel.vars.registeredEventSigns[mapid][id];

    if (commands.Image) {
        eventSignData.Image = commands.Image;
    }
    if (commands.Opacity) {
        eventSignData.Opacity = Number(commands.Opacity);
        eventSignData.AnimationState.PulseM = Number(commands.Opacity);
    }
    if (commands.Animation) {
        const animation = KB_EventLabel.safeJSONParse(commands.Animation, 'Animation', String(event.ID));
        if (animation.Delay) {
            eventSignData.Delay = Number(animation.Delay);
        }
        if (animation.Animation_Type) {
            eventSignData.AnimationType = animation.Animation_Type;
        }
        if (animation.Max_Movement) {
            eventSignData.AnimationMovement = Number(animation.Max_Movement);
        }
        if (animation.Speed) {
            eventSignData.AnimationSpeed = Number(animation.Speed);
        }
    }
    if (commands.Horizontal_Offset) {
        eventSignData.HorizontalOffset = Number(commands.Horizontal_Offset);
    }
    if (commands.Vertical_Offset) {
        eventSignData.VerticalOffset = Number(commands.Vertical_Offset);
    }
    if (commands.Display_Status === 'Display') {
        eventSignData.Display = true;
    } else if (commands.Display_Status === 'Hide') {
        eventSignData.Display = false;
    }
    if (commands.No_Proximity) {
        eventSignData.NoProximity = commands.No_Proximity;
    }
};


KB_EventLabel.updateAnimation = function(sprite, event_id, name) {
    this._vars = KB_EventLabel.vars.registeredEventSigns[$gameMap._mapId][event_id - 1];
    this._nvars = KB_EventLabel.vars.registeredEventNames[$gameMap._mapId][event_id - 1];
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


KB_EventLabel.updateBounceAnimation = function(vars, nvars) {
    this._vars = vars;
    this._sprite.x = this._vars.HorizontalOffset || KB_EventLabel.globalVars.horizontal_sign_offset;
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
    if (this._name && this._name.visible && KB_EventLabel.globalVars.sign_top) {
        this._sprite.y = -((nvars.VerticalOffset || KB_EventLabel.globalVars.vertical_name_offset) + 56 + (this._vars.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + this._name.bitmap.fontSize + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    } else {
        this._sprite.y = -((this._vars.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + 56 + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    }
};


KB_EventLabel.updateSwayAnimation = function(vars, nvars) {
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
        if (this._sprite.x === (this._vars.HorizontalOffset || KB_EventLabel.globalVars.horizontal_sign_offset) && this._vars.AnimationState.SwayState === 2) {
            this._vars.AnimationState.DelayC = 0;
            this._vars.AnimationState.SwayState = 0;
        }
    } else {
        this._vars.AnimationState.DelayC++;
    }
    this._sprite.x = (this._vars.HorizontalOffset || KB_EventLabel.globalVars.horizontal_sign_offset) + (this._vars.AnimationState.SwayX / this._vars.AnimationSpeed);
    if (this._name && this._name.visible && KB_EventLabel.globalVars.sign_top) {
        this._sprite.y = -((nvars.VerticalOffset || KB_EventLabel.globalVars.vertical_name_offset) + 56 + (this._vars.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + this._name.bitmap.fontSize + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    } else {
        this._sprite.y = -((this._vars.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + 56 + (this._vars.AnimationState.BounceY / this._vars.AnimationSpeed));
    }
};


KB_EventLabel.updatePulseAnimation = function(vars, nvars) {
    this._vars = vars;
    this._sprite.x = this._vars.HorizontalOffset || KB_EventLabel.globalVars.horizontal_sign_offset;
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
    if (this._name && this._name.visible && KB_EventLabel.globalVars.sign_top) {
        this._sprite.y = -((nvars.VerticalOffset || KB_EventLabel.globalVars.vertical_name_offset) + 56 + (this._vars.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + this._name.bitmap.fontSize);
    } else {
        this._sprite.y = -((this._vars.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + 56);
    }
};


// --- COMMAND REGISTRATION (using new plugin name) ---

PluginManager.registerCommand(KB_EventLabel.pluginName, 'Set_Event_Name_A', args => {
    const event = {ID : Number(args.Event_ID), Command : args};
    const mapid = Number(args.Map_ID);
    KB_EventLabel.setEventNames(event, mapid);
});


PluginManager.registerCommand(KB_EventLabel.pluginName, 'Set_Event_Sign_A', args => {
    const event = {ID : Number(args.Event_ID), Command : args};
    const mapid = Number(args.Map_ID);
    KB_EventLabel.setEventSigns(event, mapid);
});


PluginManager.registerCommand(KB_EventLabel.pluginName, 'Mass_Event_Name_A', args => {
    const events = {ID : args.Event_ID, Command : args};
    const mapid = Number(args.Map_ID);
    KB_EventLabel.setMassEventAction(events, mapid, 'setEventNames');
});


PluginManager.registerCommand(KB_EventLabel.pluginName, 'Mass_Event_Sign_A', args => {
    const events = {ID : args.Event_ID, Command : args};
    const mapid = Number(args.Map_ID);
    KB_EventLabel.setMassEventAction(events, mapid, 'setEventSigns');
});


PluginManager.registerCommand(KB_EventLabel.pluginName, 'Change_Proximity_A', args => {
    if (args.Name_Proximity != '') {
        KB_EventLabel.globalVars.name_proximity = Number(args.Name_Proximity);
    }
    if (args.Sign_Proximity != '') {
        KB_EventLabel.globalVars.sign_proximity = Number(args.Sign_Proximity);
    }
});


// --- SPRITE ALIACES (Modified to use new data access path) ---

const _KBEL_Sprite_Character_prototype_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    _KBEL_Sprite_Character_prototype_initialize.apply(this, arguments);
    if (this._character instanceof Game_Follower === false && this._character instanceof Game_Player === false) {
        this.createKBELName();
        this.createKBELSign();
    }
};


const _KBEL_Sprite_Character_prototype_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    _KBEL_Sprite_Character_prototype_update.apply(this, arguments);
    if (this._character instanceof Game_Follower === false && this._character instanceof Game_Player === false) {
        this.updateKBELNPCName();
        this.updateKBELSign();
        if (this._spriteKBELSign) {
            KB_EventLabel.updateAnimation(this._spriteKBELSign, this._character._eventId, this._spriteKBELName ? this._spriteKBELName : null);
        }
    }
};


Sprite_Character.prototype.createKBELName = function() {
    if (this._character) {
        this._spriteKBELName = new Sprite();
        this._spriteKBELName.bitmap = new Bitmap(KB_EventLabel.globalVars.max_name_width, KB_EventLabel.globalVars.max_name_height);
        this._spriteKBELName.x = -(KB_EventLabel.globalVars.max_name_width / 2);
        if (KB_EventLabel.globalVars.name_proximity_fade) {
            this._spriteKBELName.opacity = 0;
        }
        this.addChild(this._spriteKBELName);
    }
};


Sprite_Character.prototype.createKBELSign = function() {
    if (this._character) {
        this._spriteKBELSign = new Sprite();
        this._spriteKBELSign.bitmap = new Bitmap();
        if (KB_EventLabel.globalVars.sign_proximity_fade) {
            this._spriteKBELSign.opacity = 0;
        }
        this.addChild(this._spriteKBELSign);
    }
};


// Hàm cập nhật tên NPC đã được sửa đổi
Sprite_Character.prototype.updateKBELNPCName = function() {
    const eventId = this._character._eventId;
    const mapId = $gameMap._mapId;

    KB_EventLabel.initEventData(mapId, eventId); // Ensure data is initialized

    const settings = KB_EventLabel.vars.registeredEventNames[mapId][eventId - 1];
    
    if ($gameMap._events[eventId] && settings) {
        this._sprite = this._spriteKBELName;
        this._sprite.y = -Math.abs((settings.VerticalOffset || KB_EventLabel.globalVars.vertical_name_offset) + 56 + settings.FontSize);
        this._sprite.bitmap.clearRect(0, 0, KB_EventLabel.globalVars.max_name_width, KB_EventLabel.globalVars.max_name_height);
        this._sprite.bitmap.fontFace = settings.Font != '' ? settings.Font : KB_EventLabel.globalVars.name_font_type;
        this._sprite.bitmap.fontSize = settings.FontSize > 0 ? settings.FontSize : KB_EventLabel.globalVars.name_font_size;
        this._sprite.bitmap.textColor = settings.Color != '' ? settings.Color : KB_EventLabel.globalVars.name_font_color;
        
        // --- LOGIC XỬ LÝ ƯU TIÊN TÊN SỬ DỤNG TOKEN ---
        let displayName = '';
        const defaultEventName = ($dataMap.events[eventId] && $dataMap.events[eventId].name) 
                                 ? $dataMap.events[eventId].name.replace(/^(\d+):/, '').trim() 
                                 : '';

        // 1. Kiểm tra: Nếu tên trong plugin KHÔNG PHẢI là token mặc định, 
        // nghĩa là nó đã bị ghi đè bởi lệnh Passive/Active.
        if (settings.Name !== KB_DEFAULT_NAME_TOKEN) {
             displayName = settings.Name; 
        } 
        // 2. Nếu tên vẫn là token mặc định, sử dụng tên mặc định từ database
        else {
             displayName = defaultEventName;
        }
        
        this._sprite.bitmap.drawText(displayName, 0, 0, KB_EventLabel.globalVars.max_name_width, 38, 'center');
        
        // Chỉ hiển thị nếu settings.Display là true VÀ displayName không rỗng hoặc không chỉ chứa khoảng trắng
        const shouldDisplay = settings.Display && displayName.trim().length > 0;

        // Cập nhật proximity/fade, sử dụng shouldDisplay
        this.updateKBELNPCNameProximity(settings, shouldDisplay);
    }
};

// Hàm cập nhật Proximity đã được sửa đổi để sử dụng shouldDisplay
Sprite_Character.prototype.updateKBELNPCNameProximity = function(settings, shouldDisplay) {
    if (KB_EventLabel.globalVars.name_proximity > 0) {
        const x_dist = Math.abs(this._character._x - $gamePlayer.x);
        const y_dist = Math.abs(this._character._y - $gamePlayer.y);
        if (x_dist <= KB_EventLabel.globalVars.name_proximity && y_dist <= KB_EventLabel.globalVars.name_proximity) {
            // Chỉ hiển thị nếu shouldDisplay là true
            this._sprite.visible = shouldDisplay; 
            if (this._sprite.opacity < settings.Opacity && KB_EventLabel.globalVars.name_proximity_fade) {
                this._sprite.opacity += 10;
            }
        } else {
            if (this._sprite.opacity >= 10 && KB_EventLabel.globalVars.name_proximity_fade) {
                this._sprite.opacity -= 10;
            } else {
                this._sprite.visible = false;
            }
        }
    } else {
        // Chỉ hiển thị nếu shouldDisplay là true
        this._sprite.opacity = settings.Opacity;
        this._sprite.visible = shouldDisplay;
    }
};


Sprite_Character.prototype.updateKBELSign = function() {
    const eventId = this._character._eventId;
    const mapId = $gameMap._mapId;

    KB_EventLabel.initEventData(mapId, eventId); // Ensure data is initialized before reading

    const settings = KB_EventLabel.vars.registeredEventSigns[mapId][eventId - 1];
    const name_settings = KB_EventLabel.vars.registeredEventNames[mapId][eventId - 1];

    if ($gameMap._events[eventId] && settings) {
        this._sprite = this._spriteKBELSign;
        if (settings.AnimationType === 'OFF' || settings.AnimationType === '') {
            this._sprite.x = settings.HorizontalOffset || KB_EventLabel.globalVars.horizontal_sign_offset;
            if (this._spriteKBELName.visible && KB_EventLabel.globalVars.sign_top) {
                this._sprite.y = -((name_settings.VerticalOffset || KB_EventLabel.globalVars.vertical_name_offset) + 56 + (settings.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + this._spriteKBELName.bitmap.fontSize);
            } else {
                this._sprite.y = -((settings.VerticalOffset || KB_EventLabel.globalVars.vertical_sign_offset) + 56);
            }
        }
        if (this._sprite.bitmap._url === '' || this._sprite.bitmap._url.includes(settings.Image) === false) {
            this._sprite.bitmap = ImageManager.loadBitmap('img/shownames_icons/', settings.Image);
        }
        this.updateKBELSignProximity(settings);
    }
};


Sprite_Character.prototype.updateKBELSignProximity = function(settings) {
    if (KB_EventLabel.globalVars.sign_proximity > 0 && settings.NoProximity === 'OFF') {
        const x_dist = Math.abs(this._character._x - $gamePlayer.x);
        const y_dist = Math.abs(this._character._y - $gamePlayer.y);
        if (x_dist <= KB_EventLabel.globalVars.sign_proximity && y_dist <= KB_EventLabel.globalVars.sign_proximity) {
            this._sprite.visible = settings.Display;
            if (this._sprite.opacity < settings.Opacity && KB_EventLabel.globalVars.sign_proximity_fade) {
                this._sprite.opacity += 10;
            }
        } else {
            if (this._sprite.opacity >= 10 && KB_EventLabel.globalVars.sign_proximity_fade) {
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


// --- INITIALIZATION ---
KB_EventLabel.getParams();